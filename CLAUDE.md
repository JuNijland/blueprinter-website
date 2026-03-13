# Blueprinter Website

## Overview
Marketing one-pager for Blueprinter — an AI-first web data extraction platform focused on e-commerce intelligence.

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Fonts:** Montserrat (body/headings), Orbitron Light (logo wordmark only — not loaded on web, logo uses SVG)
- **Deployment:** Static export compatible

## Brand Guidelines
- **Colors:** Strict black & white only. See `Brand Book BW/Blueprinter-Brand-Guide.md` in Google Drive.
- **Primary:** `#000000` (text, icons), `#FFFFFF` (backgrounds)
- **Grays:** `#1A1A1A`, `#808080`, `#E5E5E5`, `#F5F5F5`
- **Never** use the old Prussian Blue (`#021D40`)
- **Tone:** Professional, technical, confident, minimal

## Structure
```
src/
  app/
    layout.tsx          — Root layout, Montserrat font, metadata
    page.tsx            — Main page composing all sections
    globals.css         — Tailwind config, blueprint grid, animations
  components/
    Header.tsx          — Fixed nav with scroll links + login CTA
    Hero.tsx            — Hero with tagline + CTAs
    IsometricVisual.tsx — Animated isometric product card with data extraction highlights
    FeatureSection.tsx  — Reusable feature grid (used for E-commerce + Brands)
    CTA.tsx             — Newsletter signup form
    Footer.tsx          — Simple footer with logo + copyright
public/
  logos/                — SVG logos from brand book
  favicon.png           — 192x192 icon
```

## Key URLs
- **App login:** https://app.blueprinter.io
- **Brand assets:** Google Drive > Blueprinter > Brand Identity > Brand Book BW

## Dev
```bash
npm run dev    # starts on localhost:3000 (or next available port)
npm run build  # production build
```
