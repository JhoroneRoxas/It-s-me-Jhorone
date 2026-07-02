"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECTS, PROJECT_TABS } from "@/data/projects";
import { EASE } from "@/lib/motion";
import styles from "./Projects.module.css";

type FilterId = "all" | "opm" | "dev";

export function Projects() {
  const [activeTab, setActiveTab] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    if (activeTab === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.sectionMeta}>
            <span className={styles.index}>03</span>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.label}>Selected Projects</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className={styles.title}>Every project has a story</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={styles.subtitle}>
            Not just practice logs — experiments in sound, culture, and code.
          </p>
        </Reveal>

        <LayoutGroup>
          <div className={styles.tabs} role="tablist" aria-label="Project filters">
            {PROJECT_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={styles.tab}
                  data-active={isActive}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-tab"
                      className={styles.tabPill}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className={styles.tabLabel}>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            className={styles.list}
            layout
            transition={{ layout: { duration: 0.5, ease: EASE } }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  className={styles.card}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.45, delay: index * 0.04, ease: EASE }}
                >
                  <div className={styles.cardMeta}>
                    <span className={styles.year}>{project.year}</span>
                    <span className={styles.tag}>{project.tag}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.category}>
                      {project.category === "opm" ? "OPM" : "Development"}
                    </span>
                    <span className={styles.viewLink}>view project →</span>
                  </div>
                  <span className={styles.cardGlow} aria-hidden="true" />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
