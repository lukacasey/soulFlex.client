import React, { useState } from "react";
// react calendar https://www.npmjs.com/package/react-calendar
// recipes for more specific details https://github.com/wojtekmaj/react-calendar/wiki/Recipes
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Bookings() {
  // for setting day
  const [value, setValue] = useState(new Date());

  function onChange(date) {
    setValue(date);
    console.log(date);
  }

  function tileDisabled({ date, view }) {
    // Disable past dates
    if (view === "month" && date <= new Date()) {
      return true;
    }

    // disable dates over 3 months
    const futureLimit = new Date();
    futureLimit.setMonth(futureLimit.getMonth() + 3); // Set the future limit to three months from today
    if (date > futureLimit) {
      return true;
    }

    // Disable specific dates
    const disabledDates = [
      // Add your disabled dates here
      new Date("2023-06-06"),
      new Date("2023-06-07"),
    ];

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
