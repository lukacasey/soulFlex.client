import React, { useState } from "react";
import Calendar from "react-calendar";
import Timepicker from "./Timepicker";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendarStyles.css";

export default function Calender() {
  // state & function for selecting date
  const [value, setValue] = useState(new Date());
  function onChange(date) {
    setValue(date);
    console.log(date);
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

  return (
    <>
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          tileDisabled={tileDisabled}
        />
        {/* passing in date value to be used for timepicker */}
        <Timepicker selectedDate={value} />
      </div>
    </>
  );
}
