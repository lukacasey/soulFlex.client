import { useState, useEffect } from "react";
import "../../styles/timePicker.css";

// Recieving date from calendar
export default function Timepicker({ selectedDate, time, setTime }) {
  // State variables
  const [value, setValue] = useState();
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");
  const [hoverColor, setHoverColor] = useState("");
  const [hoverBackgroundColor, setHoverBackgroundColor] = useState("");

  // Get the day of the selected date
  const dayOfWeek = selectedDate.getDay();

  // Define the time ranges based on the day of the week
  let timeRanges;
  if (dayOfWeek >= 1 && dayOfWeek <= 6) {
    // If the day is Monday to Thursday (dayOfWeek: 1-4)
    timeRanges = [
      { start: "6:00", end: "7:00" },
      { start: "7:00", end: "8:00" },
      { start: "8:00", end: "9:00" },
      { start: "9:00", end: "10:00" },
      { start: "10:00", end: "11:00" },
      { start: "11:00", end: "12:00" },
      { start: "12:00", end: "13:00" },
      { start: "13:00", end: "14:00" },
      { start: "14:00", end: "15:00" },
      { start: "15:00", end: "16:00" },
      { start: "16:00", end: "17:00" },
      { start: "17:00", end: "18:00" },
      { start: "18:00", end: "19:00" },
      { start: "19:00", end: "20:00" },
    ];
    // } else if (dayOfWeek === 5) {
    // If the day is Friday (dayOfWeek: 5)
    // timeRanges = [
    //   { start: "6:00", end: "7:00" },
    //   { start: "7:00", end: "8:00" },
    //   { start: "8:00", end: "9:00" },
    //   { start: "9:00", end: "10:00" },
    //   { start: "10:00", end: "11:00" },
    //   { start: "11:00", end: "12:00" },
    //   { start: "12:00", end: "13:00" },
    //   { start: "13:00", end: "14:00" },
    //   { start: "14:00", end: "15:00" },
    //   { start: "15:00", end: "16:00" },
    //   { start: "16:00", end: "17:00" },
    //   { start: "17:00", end: "18:00" },
    // ];
    // } else if (dayOfWeek === 6) {
    // If the day is Saturday (dayOfWeek: 6)
    // timeRanges = [
    //   { start: "6:00", end: "7:00" },
    //   { start: "7:00", end: "8:00" },
    //   { start: "8:00", end: "9:00" },
    //   { start: "9:00", end: "10:00" },
    //   { start: "10:00", end: "11:00" },
    //   { start: "11:00", end: "12:00" },
    //   { start: "12:00", end: "13:00" },
    //   { start: "13:00", end: "14:00" },
    // ];
  } else {
    // Handle other days of the week if needed
    timeRanges = [];
  }

  // Updating useStates
  function onClick(index) {
    const selectedRange = timeRanges[index];
    const selectedTime = JSON.stringify(selectedRange);
    setTime(selectedTime);
    setBgColor(index);
    setColor(index);
  }

  // Reset background color when changing date
  useEffect(() => {
    setBgColor("");
    setColor("");
  }, [selectedDate]);

  return (
    <>
      <div className="timePicker-container">
        {/* This code maps over the timeRanges array, generating a set of <div> elements for each time range. */}
        {timeRanges.map((range, index) => (
          // The class names of the <div> elements are dynamically generated based on the index value.
          <div
            key={index}
            className={`t${index}`}
            // Pass the index value to onClick function
            onClick={() => onClick(index)}
            // Hover effect
            onMouseEnter={() => {
              setHoverBackgroundColor(`t${index}`);
              setHoverColor(`t${index}`);
            }}
            onMouseLeave={() => {
              setHoverBackgroundColor("");
              setHoverColor("");
            }}
            // Apply the background color dynamically
            style={{
              backgroundColor: index === bgColor ? "#006edc" : "",
              color: index === color ? "white" : "",
            }}
            value={value}
          >
            {/* The start and end times are displayed as text content. */}
            {`${range.start} - ${range.end}`}
          </div>
        ))}
      </div>
    </>
  );
}
