import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-10-15T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="container bg-primary text-white p-10 rounded-xl shadow-lg text-center max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6">
          Cuenta cada segundo antes que empiece
        </h1>
        <div className="flex justify-center gap-8 text-3xl font-extrabold">
          <div className="flex flex-col items-center bg-white text-primary p-4 rounded-lg shadow">
            <p className="text-5xl">{timeLeft.days}</p>
            <p className="text-lg font-medium">Días</p>
          </div>
          <div className="flex flex-col items-center bg-white text-primary p-4 rounded-lg shadow">
            <p className="text-5xl">{timeLeft.hours}</p>
            <p className="text-lg font-medium">Horas</p>
          </div>
          <div className="flex flex-col items-center bg-white text-primary p-4 rounded-lg shadow">
            <p className="text-5xl">{timeLeft.minutes}</p>
            <p className="text-lg font-medium">Minutos</p>
          </div>
          <div className="flex flex-col items-center bg-white text-primary p-4 rounded-lg shadow">
            <p className="text-5xl">{timeLeft.seconds}</p>
            <p className="text-lg font-medium">Segundos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
