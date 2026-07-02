"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ASSETS } from "@/config/assets";
import { DigitalClock } from "@/components/ui/DigitalClock";
import { Marquee } from "@/components/ui/Marquee";
import { HERO_MARQUEE } from "@/config/site";
import { EASE, fadeUp, staggerContainer } from "@/lib/motion";
import type { SectionId } from "@/types";
import styles from "./Hero.module.css";

interface HeroProps {
  onNavigate: (section: SectionId) => void;
  onEnterIdle: () => void;
}

const BIO_LINES = [
  "I am eager to learn and grow, and I am open to new opportunities.",
  "Each day is a new opportunity to learn something new.",
  "I want to explore many things and see what I can do — to live with purpose and do everything that makes me happy.",
];

export function Hero({ onNavigate, onEnterIdle }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const item = reduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4 } },
      }
    : fadeUp;

  return (
    <div className={styles.hero}>
      <motion.div className={styles.stage} style={{ y, opacity }}>
        <motion.div
          className={styles.heroImage}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
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
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          <DigitalClock onActivate={onEnterIdle} size="hero" />
        </motion.div>

        <motion.div
          className={styles.copy}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.span className={styles.eyebrow} variants={item}>
            Intro — 01
          </motion.span>

          <motion.h1 className={styles.title} variants={item}>
            It&apos;s me,{" "}
            <motion.span
              className={styles.name}
              whileHover={reduceMotion ? undefined : { color: "var(--accent)" }}
              transition={{ duration: 0.3 }}
            >
              Jhorone!
            </motion.span>
          </motion.h1>

          <motion.p className={styles.subtitle} variants={item}>
            get to know more about me.
          </motion.p>

          <motion.div
            className={styles.divider}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              delay: reduceMotion ? 0 : 0.48,
              duration: 0.85,
              ease: EASE,
            }}
            style={{ transformOrigin: "left center" }}
            aria-hidden="true"
          />

          <motion.h2 className={styles.role} variants={item}>
            <span className={styles.roleHighlight}>
              Jack of all trades, master of none
            </span>
            <motion.span
              className={styles.accent}
              whileHover={
                reduceMotion
                  ? undefined
                  : { scale: 1.03, textShadow: "0 0 20px rgba(57, 255, 136, 0.45)" }
              }
            >
              {" "}
              & learner.
            </motion.span>
          </motion.h2>

          <motion.div className={styles.bio} variants={item}>
            {BIO_LINES.map((line, index) => (
              <motion.p
                key={line}
                className={index === 0 ? styles.bioLead : styles.bioLine}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.55 + index * 0.1,
                  duration: 0.65,
                  ease: EASE,
                }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div className={styles.actions} variants={item}>
            <button
              type="button"
              className={styles.chip}
              onClick={() => onNavigate("about")}
            >
              About
            </button>
            <button
              type="button"
              className={styles.chip}
              onClick={() => onNavigate("projects")}
            >
              Projects
            </button>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          className={styles.explore}
          onClick={() => onNavigate("projects")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
          whileHover={
            reduceMotion
              ? undefined
              : { color: "var(--text)", y: -2 }
          }
          whileTap={{ scale: 0.97 }}
        >
          <span className={styles.exploreLabel}>Explore</span>
          <span className={styles.exploreLine} aria-hidden="true" />
        </motion.button>
      </motion.div>

      <Marquee items={HERO_MARQUEE} />
    </div>
  );
}
