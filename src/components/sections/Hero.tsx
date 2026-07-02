"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { DigitalClock } from "@/components/ui/DigitalClock";
import { Marquee } from "@/components/ui/Marquee";
import { HERO_MARQUEE, EASE } from "@/lib/constants";
import type { SectionId } from "@/lib/types";
import styles from "./Hero.module.css";

interface HeroProps {
  onNavigate: (section: SectionId) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.96]);

  return (
    <div className={styles.hero}>
      <motion.div className={styles.stage} style={{ y, opacity, scale }}>
        <div className={styles.metaRow}>
          <span className={styles.year}>Portfolio &apos;26</span>
          <DigitalClock />
        </div>

        <div className={styles.grid}>
          <div className={styles.primary}>
            <div className={styles.greetingBlock}>
              <motion.h1
                className={styles.greetingLarge}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: EASE }}
              >
                Kumusta
              </motion.h1>
              <motion.p
                className={styles.greetingSmall}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              >
                kumusta
              </motion.p>
            </div>

            <motion.div
              className={styles.statement}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            >
              <h2 className={styles.role}>
                music enthusiast
                <span className={styles.roleAccent}> & learner.</span>
              </h2>
              <p className={styles.tagline}>
                I practice with purpose, learn with patience, and let OPM guide
                every session. For me, music isn&apos;t just notes — it&apos;s
                culture, feeling, and growth.
              </p>
            </motion.div>
          </div>

          <div className={styles.secondary} aria-hidden="true">
            <span className={styles.watermark}>YNZER</span>
          </div>
        </div>

        <motion.button
          type="button"
          className={styles.scrollCta}
          onClick={() => onNavigate("projects")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span>Explore</span>
          <span className={styles.scrollLine} />
        </motion.button>

        <div className={styles.rule} aria-hidden="true" />
      </motion.div>

      <Marquee items={HERO_MARQUEE} />
    </div>
  );
}
