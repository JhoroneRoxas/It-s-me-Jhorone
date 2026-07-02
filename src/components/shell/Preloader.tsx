"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  onComplete: () => void;
}

const LETTERS = "YNZER".split("");
const RIOT_EASE = [0.76, 0, 0.24, 1] as const;

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"load" | "exit" | "done">("load");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let frame = 0;
    const duration = 2400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);

      if (elapsed < duration) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("exit"), 400);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;

    const timer = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
      onComplete();
    }, 900);

    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <AnimatePresence>
        {phase === "load" && (
          <motion.div
            key="load"
            className={styles.overlay}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className={styles.slash}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.15, ease: RIOT_EASE }}
            />

            <div className={styles.logoWrap}>
              <h1 className={styles.logo} aria-label="YNZER">
                {LETTERS.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    className={styles.letter}
                    initial={{ y: "110%", opacity: 0, skewX: 12 }}
                    animate={{ y: "0%", opacity: 1, skewX: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.35 + index * 0.07,
                      ease: RIOT_EASE,
                    }}
                  >
                    <span className={styles.letterInner}>{letter}</span>
                  </motion.span>
                ))}
              </h1>

              <motion.span
                className={styles.logoGlow}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: RIOT_EASE }}
              />
            </div>

            <div className={styles.footer}>
              <motion.p
                className={styles.percent}
                key={progress}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {progress}
              </motion.p>
              <div className={styles.bar}>
                <motion.span
                  className={styles.barFill}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.12, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "exit" && (
          <>
            <motion.div
              key="panel-top"
              className={styles.panelTop}
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{ duration: 0.75, ease: RIOT_EASE }}
            >
              <span className={styles.panelLogo}>YNZER</span>
            </motion.div>
            <motion.div
              key="panel-bottom"
              className={styles.panelBottom}
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              transition={{ duration: 0.75, ease: RIOT_EASE }}
            />
            <motion.span
              key="exit-slash"
              className={styles.exitSlash}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1.2, opacity: 0 }}
              transition={{ duration: 0.5, ease: RIOT_EASE }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
