"use client";

import { Reveal } from "@/components/ui/Reveal";
import styles from "./Placeholder.module.css";

interface PlaceholderProps {
  index: string;
  label: string;
  title: string;
}

export function Placeholder({ index, label, title }: PlaceholderProps) {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.meta}>
            <span className={styles.index}>{index}</span>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.label}>{label}</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className={styles.block}>
            <span className={styles.badge}>Placeholder</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>Content coming soon.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
