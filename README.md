# KyraQuest — Landing Page

> **Turn the real world into a quest.** The marketing site for KyraQuest, a Web3-powered platform for launching quests, token drops, and treasure hunts across real-world maps.

## Overview

This repository contains the landing page for **KyraQuest**, a mobile app that gamifies real-world exploration with blockchain rewards. The site pitches the product, showcases its core features, and drives sign-ups through a waitlist and app download flow (iOS & Android).

It is a modern, animated single-page marketing site built with Next.js and React, featuring a live WebGL shader background, a custom cursor, and scroll-triggered reveal animations. The interface is styled with Tailwind CSS and shadcn/ui components.

## Features

- **Animated shader hero** — a real-time WebGL background composed of `Swirl` and `ChromaFlow` layers (via the `shaders` library) with a graceful load-in fallback.
- **Section-based storytelling** — Hero, Work, Services, About, and Contact sections describing the product: map-based treasure chests, daily check-in & spin rewards, and QR-scan airdrop claims.
- **Web3 framing** — copy references on-chain rewards on the Mantle Network and account verification powered by Reclaim.
- **Dedicated download page** (`/download`) — per-platform cards for iOS & Android with versions, system requirements, and store links.
- **Interaction polish** — magnetic buttons, a custom cursor, a film-grain overlay, and `use-scroll-animation` / `use-reveal` hooks for scroll-driven reveals.
- **Waitlist / contact form** — built with React Hook Form + Zod validation and Sonner toast feedback.
- **Vercel Analytics** wired in at the layout level.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4, `tailwindcss-animate`, custom global CSS
- **UI components:** shadcn/ui (new-york style) on top of Radix UI primitives, `lucide-react` icons
- **Graphics:** `shaders/react` WebGL shaders
- **Forms & validation:** React Hook Form + Zod
- **Extras:** Sonner (toasts), Embla Carousel, Recharts, `next-themes`, Vercel Analytics

## Getting Started

```bash
# clone
git clone https://github.com/nickthelegend/kyra-landing-page.git
cd kyra-landing-page

# install dependencies
pnpm install

# start the dev server (http://localhost:3000)
pnpm dev

# build and run production
pnpm build
pnpm start

# lint
pnpm lint
```

## Project Structure

```
app/                # Next.js App Router
  layout.tsx        # Root layout, fonts, metadata, analytics
  page.tsx          # Landing page (hero + sections)
  download/page.tsx # iOS / Android download page
  globals.css       # Global styles
components/
  sections/         # Work, Services, About, Contact sections
  ui/               # shadcn/ui component library
  custom-cursor.tsx # Custom cursor, grain overlay, magnetic button
  ...
hooks/              # use-scroll-animation, use-reveal, use-toast, use-mobile
lib/                # utils
public/             # icons and static assets
styles/             # additional global styles
next.config.mjs
package.json
tsconfig.json
```

---

Built by [nickthelegend](https://github.com/nickthelegend) · [nickthelegend.tech](https://nickthelegend.tech)
