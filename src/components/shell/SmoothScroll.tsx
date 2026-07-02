"use client";

import { ReactLenis, useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { useEffect, useState, type ReactNode } from "react";
import { SECTION_IDS } from "@/config/site";
import { registerLenis } from "@/lib/scroll";

const LENIS_OPTIONS = {
  lerp: 0.09,
  duration: 1.3,
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 1.15,
  wheelMultiplier: 0.85,
  easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
} as const;

const SNAP_OPTIONS = {
  type: "proximity" as const,
  duration: 1.25,
  distanceThreshold: "18%" as const,
  debounce: 420,
  easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
};

interface SmoothScrollProps {
  children: ReactNode;
  enabled?: boolean;
}

function LenisController({ enabled }: { enabled: boolean }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    registerLenis(enabled ? lenis : null);

    if (enabled) {
      lenis.start();
    } else {
      lenis.stop();
    }

    return () => registerLenis(null);
  }, [lenis, enabled]);

  return null;
}

function SectionSnap({ enabled }: { enabled: boolean }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !enabled) return;

    const snap = new Snap(lenis, SNAP_OPTIONS);

    const removeSnaps = SECTION_IDS.map((id) => {
      const element = document.getElementById(id);
      if (!element) return () => undefined;
      return snap.addElement(element, { align: "start" });
    });

    return () => {
      removeSnaps.forEach((remove) => remove());
      snap.destroy();
    };
  }, [lenis, enabled]);

  return null;
}

export function SmoothScroll({ children, enabled = true }: SmoothScrollProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisController enabled={enabled} />
      <SectionSnap enabled={enabled} />
      {children}
    </ReactLenis>
  );
}
