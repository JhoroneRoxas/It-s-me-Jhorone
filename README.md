# It-s-me-Jhorone

A premium, Vercel-inspired music portfolio for Jhorone (YNZER).

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **Framer Motion** — section transitions & layout animations
- **CSS Modules** — no heavy frameworks

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
├── app/              # Next.js app router
├── components/
│   ├── layout/       # Nav, noise overlay, page shell
│   ├── sections/     # Hero, Dashboard, Projects, Contact
│   └── ui/           # DigitalClock, shared UI
└── lib/              # Constants & types
```

## Customize

- Replace `public/profile.svg` with your photo (`profile.jpg` works — update `Hero.tsx`)
- Edit content in `src/lib/constants.ts`
- Accent green: `--accent: #39ff88` in `globals.css`

