"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ASSETS } from "@/config/assets";
import styles from "./Placeholder.module.css";

interface PlaceholderProps {
  index: string;
  label: string;
  title: string;
  image?: string;
  imageAlt?: string;
}

export function Placeholder({
  index,
  label,
  title,
  image,
  imageAlt = "",
}: PlaceholderProps) {
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
          <div className={styles.block} data-has-image={Boolean(image)}>
            {image ? (
              <div className={styles.imageWrap}>
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className={styles.image}
                />
              </div>
            ) : null}
            <span className={styles.badge}>Placeholder</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>Content coming soon.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
