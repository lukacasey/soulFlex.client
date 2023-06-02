import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Bookings() {
  // for setting day
  const [value, setValue] = useState(new Date());

  function onChange(date) {
    setValue(date);
    console.log(date.toDateString());
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

    // dates to be disabled
    const disabledDates = [new Date("2023-06-13"), new Date("2023-06-14")];

    // convert to string and disable
    return disabledDates.some(
      (disabledDate) => date.toDateString() === disabledDate.toDateString()
    );
  }

  return (
    <>
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          tileDisabled={tileDisabled}
        />
      </div>
    </>
  );
}
