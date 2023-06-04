import React, { useState } from "react";
import Calendar from "react-calendar";
import Timepicker from "./Timepicker";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendarStyles.css";

export default function Calender() {
  // state & function for selecting date
  const [value, setValue] = useState(new Date());
  // Add a state for timeString
  const [timeString, setTimeString] = useState();
  function onChange(date) {
    setValue(date);
    setTimeString(undefined);
    // console.log(date, timeString);
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

  function temp(date) {
    if (value.toDateString() === new Date().toDateString()) {
      console.log("Must pick a date");
    } else if (timeString === undefined) {
      console.log("Must pick a time");
    } else {
      console.log(value.toDateString(), timeString);
    }
  }

  return (
    <>
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          tileDisabled={tileDisabled}
        />
        {/* passing in date value to be used for timepicker */}
        <Timepicker
          selectedDate={value}
          timeString={timeString}
          setTimeString={setTimeString}
        />
        <div onClick={temp}>Button</div>
      </div>
    </>
  );
}
