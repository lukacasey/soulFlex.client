import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Timepicker from "./Timepicker";
import { useBooking } from "../../hooks/useBooking";

// Styles
import "react-calendar/dist/Calendar.css";
import "../../styles/calendarStyles.css";

export default function Calender() {
  // State variables
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState();
  const [logicErr, setLogicErr] = useState("");
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  useEffect(() => {
    const HOST = process.env.REACT_APP_HOST;
    const fetchAppointments = async () => {
      const response = await fetch(`${HOST}/api/appointments`);
      const json = await response.json();

      if (response.ok) {
        setAppointments(json);
      }
    };
    fetchAppointments();
  }, []);

  // Imported from hooks - useBooking
  const { booking, error } = useBooking();

  // Function to handle date change
  function onChange(date) {
    setValue(date);
    setTime(undefined);
  }

  // Function to disable specific dates on the calendar
  function tileDisabled({ date, view }) {
    // Disable past dates
    if (view === "month" && date <= new Date()) {
      return true;
    }

    // Disable dates 3 months or more from current date
    const futureLimit = new Date();
    futureLimit.setMonth(futureLimit.getMonth() + 3);
    if (date > futureLimit) {
      return true;
    }

    // Disable Sundays
    if (date.getDay() === 0) {
      return true;
    }

    // If you want to disabel specific date[s] uncomment the code below and add to the array
    // const disabledDates = [new Date("2023-06-13"), new Date("2023-06-14")];
    // return disabledDates.some(
    //   (disabledDate) => date.toDateString() === disabledDate.toDateString()
    // );
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogicErr("");

    if (value.toDateString() === new Date().toDateString()) {
      console.log("Must pick a date");
      setLogicErr("Must pick a date");
    } else if (time === undefined) {
      console.log("Must pick a time");
      setLogicErr("Must pick a time");
    } else {
      let date = value.toDateString();
      console.log(email, fullName, date, time);
      await booking(email, fullName, date, time);
    }
  };

  return (
    <>
      {appointments.map((appointment) => (
        <p key={appointment._id}>
          {appointment.fullName}
          {appointment.date}
          {appointment.time}
        </p>
      ))}
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
        {/* Error handling from hooks */}
        {error && <div className="error">{error}</div>}
        {/* Custom error handling */}
        {logicErr && <div className="error">{logicErr}</div>}
      </form>
    </>
  );
}
