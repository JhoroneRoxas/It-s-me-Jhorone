"use client";

import { useCallback, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { NavHeader } from "@/components/layout/NavHeader";
import { Placeholder } from "@/components/sections/Placeholder";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { scrollToSection, useScrollSpy } from "@/hooks/useScrollSpy";
import type { SectionId } from "@/lib/types";
import styles from "./PortfolioShell.module.css";

export function PortfolioShell() {
  const [loaded, setLoaded] = useState(false);
  const activeSection = useScrollSpy("home");
  const { scrollYProgress } = useScroll();
  const pageOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 1]);

  const handleNavigate = useCallback((section: SectionId) => {
    scrollToSection(section);
  }, []);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      {loaded && (
        <motion.div className={styles.shell} style={{ opacity: pageOpacity }}>
          <ScrollProgress />
          <NavHeader activeSection={activeSection} onNavigate={handleNavigate} />

          <main className={styles.main}>
            <section id="home" className={styles.section}>
              <Hero onNavigate={handleNavigate} />
            </section>

            <section id="about" className={styles.section}>
              <Placeholder index="01" label="About Me" title="About" />
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
    </>
  );
}
