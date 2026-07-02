"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ASSETS } from "@/config/assets";
import { DigitalClock } from "@/components/ui/DigitalClock";
import { Marquee } from "@/components/ui/Marquee";
import { HERO_MARQUEE } from "@/config/site";
import { EASE } from "@/lib/motion";
import type { SectionId } from "@/types";
import styles from "./Hero.module.css";

interface HeroProps {
  onNavigate: (section: SectionId) => void;
  onEnterIdle: () => void;
}

export function Hero({ onNavigate, onEnterIdle }: HeroProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className={styles.hero}>
      <motion.div className={styles.stage} style={{ y, opacity }}>
        <motion.div
          className={styles.heroImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          aria-hidden="true"
        >
          <Image
            src={ASSETS.profilePrimary}
            alt=""
            fill
            sizes="50vw"
            className={styles.image}
            priority
          />
          <div className={styles.imageBlend} />
        </motion.div>

        <motion.div
          className={styles.clock}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          <DigitalClock onActivate={onEnterIdle} size="hero" />
        </motion.div>

        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          <h1 className={styles.title}>It&apos;s me, Jhorone!</h1>
          <p className={styles.subtitle}>get to know me.</p>

          <div className={styles.divider} aria-hidden="true" />

          <h2 className={styles.role}>
            Jack of all trades, master of none
            <span className={styles.accent}> & learner.</span>
          </h2>
          <p className={styles.bio}>
            I am eager to learn and grow, and I am open to new opportunities.
            Each day is a new opportunity to learn something new. I want to
            explore many things and see what I can do — to live with purpose
            and do everything that makes me happy.
          </p>
        </motion.div>

        <button
          type="button"
          className={styles.explore}
          onClick={() => onNavigate("projects")}
        >
          Explore
        </button>
      </motion.div>

      <Marquee items={HERO_MARQUEE} />
    </div>
  );
}
