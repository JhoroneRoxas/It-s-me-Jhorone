"use client";

import styles from "./Marquee.module.css";

interface MarqueeProps {
  items: string[];
  speed?: "slow" | "normal";
}

export function Marquee({ items, speed = "normal" }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track} data-speed={speed}>
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
