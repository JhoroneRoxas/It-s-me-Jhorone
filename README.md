# It-s-me-Jhorone

My own version of portfolio for me.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **Framer Motion** — scroll and layout animations
- **CSS Modules** — no heavy frameworks

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js routes, layout, global styles
├── components/
│   ├── navigation/         # NavHeader
│   ├── overlays/           # NoiseOverlay, ScrollProgress
│   ├── sections/           # Hero, Projects, Contact, Placeholder
│   ├── shell/              # PortfolioShell, Preloader
│   └── ui/                 # DigitalClock, Marquee, Reveal
├── config/                 # Site config (nav, sections, assets)
├── data/                   # Content data (projects, contact links)
├── hooks/                  # useScrollSpy
├── lib/                    # Shared utilities (motion easing)
└── types/                  # Shared TypeScript types
public/                     # Static assets
```

## Customize

- Profile photos live in `public/` — paths are set in `src/config/assets.ts`
- Edit nav and section config in `src/config/site.ts`
- Edit projects in `src/data/projects.ts`
- Edit contact links in `src/data/contact.ts`
- Accent green: `--accent: #39ff88` in `src/app/globals.css`
