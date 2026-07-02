"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Preloader } from "@/components/shell/Preloader";
import { IdleScreen } from "@/components/overlays/IdleScreen";
import { ScrollProgress } from "@/components/overlays/ScrollProgress";
import { NavHeader } from "@/components/navigation/NavHeader";
import { ASSETS } from "@/config/assets";
import { Placeholder } from "@/components/sections/Placeholder";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { scrollToSection, useScrollSpy } from "@/hooks/useScrollSpy";
import type { SectionId } from "@/types";
import styles from "./PortfolioShell.module.css";

export function PortfolioShell() {
  const [loaded, setLoaded] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const activeSection = useScrollSpy("home");
  const { scrollYProgress } = useScroll();
  const pageOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 1]);

  const handleNavigate = useCallback((section: SectionId) => {
    scrollToSection(section);
  }, []);

  const handleEnterIdle = useCallback(() => {
    setIsIdle(true);
  }, []);

  const handleExitIdle = useCallback(() => {
    setIsIdle(false);
  }, []);

  useEffect(() => {
    if (!isIdle) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isIdle]);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      {loaded && (
        <motion.div
          className={styles.shell}
          style={{ opacity: pageOpacity }}
          aria-hidden={isIdle}
        >
          <ScrollProgress />
          <NavHeader activeSection={activeSection} onNavigate={handleNavigate} />

          <main className={styles.main}>
            <section id="home" className={styles.section}>
              <Hero
                onNavigate={handleNavigate}
                onEnterIdle={handleEnterIdle}
              />
            </section>

            <section id="about" className={styles.section}>
              <Placeholder
                index="01"
                label="About Me"
                title="About"
                image={ASSETS.profileSecondary}
                imageAlt="Jhorone with guitar"
              />
            </section>

            <section id="instruments" className={styles.section}>
              <Placeholder index="02" label="Instruments" title="Instruments" />
            </section>

            <section id="projects" className={styles.section}>
              <Projects />
            </section>

            <section id="contact" className={styles.section}>
              <Contact />
            </section>
          </main>

          <footer className={styles.footer}>
            <p className={styles.footerCredit}>
              Thank you for visiting. This website was made with care by
            </p>
            <p className={styles.footerName}>Jhorone</p>
            <button
              type="button"
              className={styles.returnTop}
              onClick={() => handleNavigate("home")}
            >
              Return to home
            </button>
          </footer>
        </motion.div>
      )}

      <AnimatePresence>
        {loaded && isIdle && <IdleScreen key="idle" onExit={handleExitIdle} />}
      </AnimatePresence>
    </>
  );
}
