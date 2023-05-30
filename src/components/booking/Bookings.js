import React, { useState } from "react";

// react calendar https://www.npmjs.com/package/react-calendar
// recipes for more specific details https://github.com/wojtekmaj/react-calendar/wiki/Recipes
import Calendar from "react-calendar";
// default React-Calendar styling
import "react-calendar/dist/Calendar.css";

export default function Bookings() {
  // for setting day
  const [value, setValue] = useState(new Date());

  function onChange(date) {
    setValue(date);
    console.log(date);
  }

  return (
    <>
      <div>
        <Calendar onChange={onChange} value={value} />
      </div>
    </>
  );
}
