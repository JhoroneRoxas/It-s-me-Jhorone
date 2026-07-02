"use client";

import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/config/site";
import type { SectionId } from "@/types";
import styles from "./NavHeader.module.css";

interface NavHeaderProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export function NavHeader({ activeSection, onNavigate }: NavHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <button
            type="button"
            className={styles.logo}
            onClick={() => onNavigate("home")}
            aria-label="Return to home"
          >
            YNZER
          </button>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={styles.link}
                data-active={isActive}
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "true" : undefined}
              >
                <span className={styles.linkText}>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className={styles.underline}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className={styles.contactBtn}
          onClick={() => onNavigate("contact")}
        >
          Contact
        </button>
      </div>
    </header>
  );
}
