import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // 15 de octubre de 2025 a las 09:00 (hora de Argentina = UTC-3)
    const targetDate = new Date("2025-10-15T12:00:00Z").getTime(); // Z = UTC

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
    <div className="flex items-center justify-center w-[98vw]">
      <div className="container bg-primary text-white py-6 rounded-md shadow-lg text-center">
        <div className="flex justify-center gap-10 md:gap-14 text-3xl font-bold flex-wrap">
          <div className="flex flex-col items-center">
            <p className="text-5xl">{timeLeft.days}</p>
            <p className="text-lg font-normal">Días</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-5xl">{timeLeft.hours}</p>
            <p className="text-lg font-normal">Horas</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-5xl">{timeLeft.minutes}</p>
            <p className="text-lg font-normal">Minutos</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-5xl">{timeLeft.seconds}</p>
            <p className="text-lg font-normal">Segundos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
