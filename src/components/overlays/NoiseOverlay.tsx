"use client";

import styles from "./NoiseOverlay.module.css";

export function NoiseOverlay() {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <svg className={styles.noise} xmlns="http://www.w3.org/2000/svg">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          >
            <animate
              attributeName="seed"
              dur="1.2s"
              values="0;5;10;15;20;0"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </div>
  );
}
