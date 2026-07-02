"use client";

import { useEffect, useState } from "react";
import styles from "./DigitalClock.module.css";

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function DigitalClock() {
  const [time, setTime] = useState<string>("00:00:00");

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.clock} aria-label={`Current time ${time}`}>
      <time className={styles.time} dateTime={time}>
        {time}
      </time>
    </div>
  );
}
