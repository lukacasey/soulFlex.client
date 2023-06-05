import { useState } from "react";

export const useBooking = () => {
  const [error, setError] = useState(null);

  const booking = async (email, fullName, date, time) => {
    const HOST = process.env.REACT_APP_HOST;
    setError(null);

    const response = await fetch(`${HOST}/api/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fullName, date, time }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
  };

  return { booking, error };
};
