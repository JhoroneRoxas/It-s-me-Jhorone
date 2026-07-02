"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { CONTACT_COMMANDS } from "@/data/contact";
import { EASE } from "@/lib/motion";
import styles from "./Contact.module.css";

const CTA_ITEMS = ["Let's Collaborate", "Get In Touch", "Say Hello"];

export function Contact() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.sectionMeta}>
            <span className={styles.index}>04</span>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.label}>Get In Touch</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className={styles.title}>Got an idea worth playing?</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={styles.subtitle}>
            Whether it&apos;s music, code, or collaboration — I&apos;d love to
            connect and build something meaningful together.
          </p>
        </Reveal>

        <Marquee items={CTA_ITEMS} speed="slow" />

        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className={styles.terminalBar}>
            <span className={styles.dot} data-color="red" />
            <span className={styles.dot} data-color="yellow" />
            <span className={styles.dot} data-color="green" />
            <span className={styles.terminalTitle}>ynzer — contact</span>
          </div>

          <div className={styles.terminalBody}>
            <p className={styles.prompt}>
              <span className={styles.user}>jhorone@ynzer</span>
              <span className={styles.sep}>:</span>
              <span className={styles.path}>~/contact</span>
              <span className={styles.sep}>$</span>
              <span className={styles.cursor}> ls --available</span>
            </p>

            <ul className={styles.commandList}>
              {CONTACT_COMMANDS.map((cmd, index) => (
                <motion.li
                  key={cmd.command}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + index * 0.06,
                    ease: EASE,
                  }}
                >
                  <a
                    href={cmd.href}
                    className={styles.commandLink}
                    target={cmd.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      cmd.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <span className={styles.commandPrefix}>$</span>
                    <span className={styles.commandText}>{cmd.command}</span>
                    <span className={styles.commandArrow}>→</span>
                    <span className={styles.commandLabel}>{cmd.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <p className={styles.footerLine}>
              <span className={styles.comment}>
                # Ready to collaborate? Pick a command above.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
