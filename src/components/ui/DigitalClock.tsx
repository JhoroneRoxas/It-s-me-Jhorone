"use client";

import { useClockTime } from "@/hooks/useClockTime";
import styles from "./DigitalClock.module.css";

interface DigitalClockProps {
  onActivate?: () => void;
  className?: string;
  size?: "default" | "hero";
}

export function DigitalClock({
  onActivate,
  className,
  size = "default",
}: DigitalClockProps) {
  const time = useClockTime();
  const timeClass =
    size === "hero" ? `${styles.time} ${styles.timeHero}` : styles.time;

  if (onActivate) {
    return (
      <button
        type="button"
        className={`${styles.clockButton} ${className ?? ""}`}
        onClick={onActivate}
        aria-label={`Current time ${time}. Click to enter idle screen`}
      >
        <time className={timeClass} dateTime={time}>
          {time}
        </time>
      </button>
    );
  }

  return (
    <div
      className={`${styles.clock} ${className ?? ""}`}
      aria-label={`Current time ${time}`}
    >
      <time className={timeClass} dateTime={time}>
        {time}
      </time>
    </div>
  );
}
