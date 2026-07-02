"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./ScrollProgress.module.css";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const fillY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  const thumbTop = useSpring(
    useTransform(scrollYProgress, (value) => `calc(${value * 100}% - ${value * 8}px)`),
    {
      stiffness: 100,
      damping: 28,
      restDelta: 0.001,
    },
  );

  return (
    <>
      <motion.div
        className={styles.topBar}
        style={{ scaleX }}
        aria-hidden="true"
      />

      <div className={styles.rail} aria-hidden="true">
        <div className={styles.railTrack} />
        <motion.div className={styles.railFill} style={{ scaleY: fillY }} />
        <motion.div className={styles.thumb} style={{ top: thumbTop }} />
      </div>
    </>
  );
}
