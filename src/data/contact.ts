import type { ContactCommand } from "@/types";

export const CONTACT_COMMANDS: ContactCommand[] = [
  {
    command: "mailto --to jhorone@email.com",
    label: "Send Email",
    href: "mailto:jhorone@email.com",
  },
  {
    command: "open --url github.com/jhorone",
    label: "GitHub",
    href: "https://github.com",
  },
  {
    command: "open --url linkedin.com/in/jhorone",
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    command: "open --url instagram.com/jhorone",
    label: "Instagram",
    href: "https://instagram.com",
  },
];
