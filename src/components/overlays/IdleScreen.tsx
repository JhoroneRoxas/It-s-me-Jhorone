"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClockTime } from "@/hooks/useClockTime";
import { EASE } from "@/lib/motion";
import styles from "./IdleScreen.module.css";

interface IdleScreenProps {
  onExit: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function IdleScreen({ onExit }: IdleScreenProps) {
  const time = useClockTime();
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);
  const lastRipple = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y });

    const now = performance.now();
    if (now - lastRipple.current < 90) return;
    lastRipple.current = now;

    const id = rippleId.current++;
    setRipples((prev) => [...prev.slice(-12), { id, x, y }]);
  }, []);

  const handleLeave = useCallback(() => {
    setPointer({ x: 50, y: 50 });
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onExit();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onExit]);

  return (
    <motion.div
      ref={containerRef}
      className={styles.overlay}
      role="button"
      tabIndex={0}
      aria-label="Idle screen. Click to return to portfolio."
      onClick={onExit}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onExit();
        }
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      style={
        {
          "--mx": pointer.x,
          "--my": pointer.y,
        } as React.CSSProperties
      }
    >
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.scanline} aria-hidden="true" />

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className={styles.ripple}
            style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }}
            initial={{ opacity: 0.7, scale: 0 }}
            animate={{ opacity: 0, scale: 2.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            aria-hidden="true"
          />
        ))}
      </AnimatePresence>

      <div className={styles.content}>
        <p className={styles.brand}>YNZER</p>
        <time className={styles.clock} dateTime={time}>
          {time}
        </time>
        <p className={styles.hint}>Click anywhere to return</p>
      </div>

      <motion.div
        className={styles.cursorRing}
        aria-hidden="true"
        animate={{
          left: `${pointer.x}%`,
          top: `${pointer.y}%`,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.4 }}
      />
    </motion.div>
  );
}
