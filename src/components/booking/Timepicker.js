import { useState, useEffect } from "react";
import "../../styles/timePicker.css";

// Recieving date from calendar
export default function Timepicker({ selectedDate, time, setTime }) {
  // State variables
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  useEffect(() => {
    const HOST = process.env.REACT_APP_HOST;
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${HOST}/api/appointments`);
        const json = await response.json();

        if (response.ok) {
          setAppointments(json);
        } else {
          throw new Error(json.error);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    fetchAppointments();
  }, []);
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
    console.log(selectedTime); //time value
    console.log(selectedDate.toDateString()); //date value
    setColor(index);
    setBgColor(index);
  }

  // Reset background color when changing date
  useEffect(() => {
    setBgColor("");
    setColor("");
  }, [selectedDate]);

  return (
    <>
      {/* {appointments.map((appointment) => (
        <p key={appointment._id}>
          {appointment.date} {appointment.time}
        </p>
      ))} */}
      <div className="timePicker-container">
        {timeRanges.map((range, index) => {
          const isSelectedAppointment = appointments.find(
            (appointment) =>
              selectedDate.toDateString() === appointment.date &&
              JSON.stringify(range) === appointment.time
          );
          const isSelected =
            selectedDate.toDateString() === appointments[color]?.date &&
            JSON.stringify(timeRanges[color]) === appointments[color]?.time;

          return (
            <div
              key={index}
              className={`t${index}`}
              onClick={() => {
                if (!isSelectedAppointment) {
                  onClick(index);
                }
              }}
              style={{
                backgroundColor:
                  index === color
                    ? "#006edc"
                    : index === bgColor || isSelectedAppointment
                    ? "rgb(235, 235, 235)"
                    : "",
                color:
                  index === color || (isSelectedAppointment && index === color)
                    ? "white"
                    : isSelectedAppointment
                    ? "grey"
                    : "",
                cursor: isSelectedAppointment ? "not-allowed" : "pointer",
              }}
            >
              {`${range.start} - ${range.end}`}
            </div>
          );
        })}
      </div>
    </>
  );
}
