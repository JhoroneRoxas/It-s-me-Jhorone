"use client";

import { useEffect, useState } from "react";

export function formatClockTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function useClockTime(): string {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const tick = () => setTime(formatClockTime(new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
