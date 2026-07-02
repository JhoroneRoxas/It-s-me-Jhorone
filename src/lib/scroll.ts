import type Lenis from "lenis";
import type { SectionId } from "@/types";

let lenisRef: Lenis | null = null;

const scrollEasing = (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t));

export function registerLenis(instance: Lenis | null) {
  lenisRef = instance;
}

export function getLenis() {
  return lenisRef;
}

function getNavOffset() {
  if (typeof window === "undefined") return 112;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-height")
    .trim();

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 112;
}

export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = -getNavOffset();

  if (lenisRef) {
    lenisRef.scrollTo(el, {
      offset,
      duration: 1.35,
      easing: scrollEasing,
    });
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
