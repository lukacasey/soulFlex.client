import React, { useState } from "react";
import Calendar from "react-calendar";
import Timepicker from "./Timepicker";
import { useBooking } from "../../hooks/useBooking";
// styles
import "react-calendar/dist/Calendar.css";
import "../../styles/calendarStyles.css";

export default function Calender() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const { booking, error } = useBooking();
  // state & function for selecting date
  const [value, setValue] = useState(new Date());
  // Add a state for time
  const [time, setTime] = useState();
  function onChange(date) {
    setValue(date);
    setTime(undefined);
    // console.log(date, time);
  }

  function tileDisabled({ date, view }) {
    // disable past dates
    if (view === "month" && date <= new Date()) {
      return true;
    }

    // disable dates 3 months or more from current
    const futureLimit = new Date();
    futureLimit.setMonth(futureLimit.getMonth() + 3); // Set the future limit to three months from today
    if (date > futureLimit) {
      return true;
    }

    // disable sundays
    if (date.getDay() === 0) {
      return true;
    }

    // if you want to disabel specific date[s] uncomment the code below and add to the array
    // const disabledDates = [new Date("2023-06-13"), new Date("2023-06-14")];
    // return disabledDates.some(
    //   (disabledDate) => date.toDateString() === disabledDate.toDateString()
    // );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.toDateString() === new Date().toDateString()) {
      console.log("Must pick a date");
    } else if (time === undefined) {
      console.log("Must pick a time");
    } else {
      let date = value.toDateString();
      // two variables to be pushed to db
      console.log(email, fullName, date, time);
      await booking(email, fullName, date, time);
    }
  };

  return (
    <>
      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter Email"
        />
        <input
          type="text"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          placeholder="Enter Full Name"
        />
        <Calendar
          onChange={onChange}
          value={value}
          tileDisabled={tileDisabled}
        />
        <Timepicker selectedDate={value} time={time} setTime={setTime} />
        <button>Book appointment</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
}
