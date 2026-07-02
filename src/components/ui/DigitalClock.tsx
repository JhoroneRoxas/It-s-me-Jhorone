"use client";

import { useClockTime } from "@/hooks/useClockTime";
import styles from "./DigitalClock.module.css";

interface DigitalClockProps {
  onActivate?: () => void;
  className?: string;
}

export function DigitalClock({ onActivate, className }: DigitalClockProps) {
  const time = useClockTime();

  if (onActivate) {
    return (
      <button
        type="button"
        className={`${styles.clockButton} ${className ?? ""}`}
        onClick={onActivate}
        aria-label={`Current time ${time}. Click to enter idle screen`}
      >
        <time className={styles.time} dateTime={time}>
          {time}
        </time>
      </button>
    );
  }

  return (
    <div className={`${styles.clock} ${className ?? ""}`} aria-label={`Current time ${time}`}>
      <time className={styles.time} dateTime={time}>
        {time}
      </time>
    </div>
  );
}
