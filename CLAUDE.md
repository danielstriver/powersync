# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (uses Turbopack)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite is configured.

## Stack

- **Next.js 16.2.3** with React 19 — check `node_modules/next/dist/docs/` before writing any Next.js code; this version has breaking changes from prior releases
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `globals.css`, not `tailwind.config.js`; custom theme tokens live in the `@theme {}` block in `globals.css`
- **Framer Motion** for animations
- **Lucide React** for icons
- **TypeScript** (strict mode via `tsconfig.json`)

## Architecture

This is a single-page marketing site for PowerSync, a smart microgrid product targeting Rwanda. There is one route: `src/app/page.tsx`, which composes all sections in order: `Navbar → Hero → Problem → Solution → HowItWorks → ValueProposition → Contact → Footer`.

**Theme system:** Dark/light mode is toggled client-side via `data-theme` on `<html>`. CSS custom properties for both themes are defined in `globals.css`. `ThemeToggle` persists the choice to `localStorage`. Default is dark.

**Reusable UI primitives** live in `src/components/ui/`:
- `AnimatedReveal` — scroll-triggered fade/slide/scale wrapper using Framer Motion (`whileInView`, `once: true`). Props: `delay` (seconds, default 0), `variant` (`'slide'` default | `'scale'`).
- `ThemeToggle` — sun/moon button that mutates `data-theme`

**CSS utilities** defined in `globals.css` (not Tailwind plugins):
- `.glass` / `.glass-dark` — glassmorphism with `backdrop-filter: blur`
- `.radial-gradient-bg` — subtle top-center blue radial gradient
- `.blur-orb` — `will-change: transform` for GPU-accelerated decorative blobs

**Brand tokens** (use as Tailwind classes or CSS vars):
- `energy-yellow` (`--energy-yellow`) — primary accent
- `energy-blue` (`--energy-blue`) — secondary accent
- `shadow-glow` / `shadow-glow-blue` — colored box-shadow utilities

**Theme-adaptive text tokens** (always prefer these over hardcoded `text-white/*`):
- `text-foreground` — full-strength body text
- `text-foreground-subtle` — 80% opacity
- `text-foreground-dim` — 70% opacity (nav links, labels)
- `text-foreground-muted` — 60% opacity (secondary copy)

**Theme-adaptive surface tokens:**
- `bg-background` — page/section background (replaces `bg-black`)
- `bg-card-bg` / `border-card-border` — subtle card surfaces
- `bg-input-bg` / `border-input-border` / `placeholder:text-input-placeholder` — form inputs

**Hero title:** use `.hero-gradient-text` CSS class (defined in `globals.css`) for the fading headline gradient — adapts foreground color to both themes via `color-mix()`.

**Section anchor IDs** used for in-page navigation: `#main-content`, `#problem`, `#solution`, `#how-it-works`, `#value`, `#contact`.

All interactive/animated components require `'use client'`. Server components are the default; only add the directive when needed.

**Contact form** submits via `mailto:` (opens the user's mail client) — there is no backend API. `suppressHydrationWarning` on `<html>` is intentional: `ThemeToggle` writes `data-theme` to the DOM before React hydrates, which would otherwise cause a mismatch warning.

**CSS variables not exposed as Tailwind tokens** (`--foreground-muted`, `--card-bg`, `--card-border`) are used directly via `var(--…)` in component styles or approximated with Tailwind opacity modifiers like `text-white/60`.
