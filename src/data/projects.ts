import type { ProjectItem } from "@/types";

export const PROJECTS: ProjectItem[] = [
  {
    id: "opm-1",
    title: "OPM Top 10 Setlist",
    description:
      "Curated practice setlist of Filipino classics — from Eraserheads to Ben&Ben. Each track mapped to skill milestones across guitar, piano, and vocals.",
    category: "opm",
    tag: "Music",
    year: "2026",
    span: "wide",
  },
  {
    id: "opm-2",
    title: "Kundiman Sessions",
    description:
      "Slow-tempo vocal & guitar arrangements of timeless kundiman pieces — built for emotional phrasing and dynamic control.",
    category: "opm",
    tag: "OPM",
    year: "2026",
  },
  {
    id: "opm-3",
    title: "OPM Rhythm Lab",
    description:
      "Drum patterns mapped to popular OPM tracks for daily practice. Tempo drills synced to real song structures.",
    category: "opm",
    tag: "Practice",
    year: "2025",
    span: "tall",
  },
  {
    id: "dev-1",
    title: "Practice Tracker",
    description:
      "A minimal dashboard to log daily sessions, streaks, and instrument-specific progress over time.",
    category: "dev",
    tag: "Dev",
    year: "2026",
  },
  {
    id: "dev-2",
    title: "Chord Visualizer",
    description:
      "Interactive fretboard tool for learning guitar chord shapes with smooth transitions and OPM song presets.",
    category: "dev",
    tag: "Dev",
    year: "2025",
    span: "wide",
  },
  {
    id: "dev-3",
    title: "Metronome Pro",
    description:
      "Precision metronome with tap tempo, subdivision controls, and practice session logging.",
    category: "dev",
    tag: "Tool",
    year: "2025",
  },
];

export const PROJECT_TABS = [
  { id: "all" as const, label: "All" },
  { id: "opm" as const, label: "OPM" },
  { id: "dev" as const, label: "Dev Projects" },
];
