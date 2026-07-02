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
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.96]);

  return (
    <div className={styles.hero}>
      <motion.div className={styles.stage} style={{ y, opacity, scale }}>
        <div className={styles.metaRow}>
          <span className={styles.year}>Portfolio &apos;26</span>
          <DigitalClock onActivate={onEnterIdle} />
        </div>

        <motion.div
          className={styles.heroImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
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

        <div className={styles.content}>
          <div className={styles.greetingBlock}>
            <motion.h1
              className={styles.greetingLarge}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
            >
              It&apos;s me, Jhorone!
            </motion.h1>
            <motion.p
              className={styles.greetingSmall}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            >
              get to know me.
            </motion.p>
          </div>

          <motion.div
            className={styles.statement}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          >
            <h2 className={styles.role}>
              Jack of all trades, master of none
              <span className={styles.roleAccent}> & learner.</span>
            </h2>
            <p className={styles.tagline}>
              I am eager to learn and grow, and I am open to new opportunities. 
              Each day is a new opportunity to learn something new. 
              I want to explore many things and see what I can do.
              Basically, I want to live a life of purpose and meaning.
              and do everything that makes me happy.
            </p>
          </motion.div>
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
