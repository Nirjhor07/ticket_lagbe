"use client";

import React, { useEffect, useState } from "react";

export const CountdownTimer = ({ departureDateTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isDeparted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(departureDateTime) - +new Date();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isDeparted: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isDeparted: false,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [departureDateTime]);

  if (timeLeft.isDeparted) {
    return (
      <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2 py-1 rounded">
        Departed
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded-md w-fit">
      <span>{timeLeft.days}d</span>:
      <span>{String(timeLeft.hours).padStart(2, "0")}h</span>:
      <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>:
      <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
    </div>
  );
};
