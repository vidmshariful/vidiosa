# Vidiosa

Marketing site for Vidiosa — a video studio making animated explainers, product
demos, and launch films for SaaS teams.

Currently serving a coming-soon home page.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) |
| Fonts | Archivo (display, variable width axis), Instrument Sans (body), DM Mono (timecode + labels) via `next/font` |
| Linting | ESLint (`eslint-config-next`) |

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Design system

Tokens live in [`src/app/globals.css`](src/app/globals.css) under `@theme`, so
every colour is available as a Tailwind utility (`bg-ink`, `text-flare`, …).

| Token | Value | Use |
|---|---|---|
| `ink` | `#0b0c0f` | Page background |
| `panel` | `#14161b` | Raised surfaces |
| `line` | `#23262e` | Hairlines, borders |
| `paper` | `#edebe6` | Primary text |
| `muted` | `#8b909b` | Secondary text |
| `flare` | `#fe681c` | Brand accent, one use at a time |
| `flare-lift` | `#ff7f3a` | Hover state for `flare` surfaces |

`flare` is sampled directly from the play mark in the logo art, so the accent and
the logo are the same orange. Re-sample if the logo is ever redrawn.

Three type roles are exposed as helper classes: `.display` (Archivo, set
expanded via its `wdth` axis), `.label` (mono, uppercase, tracked out), and
`.tc` (mono with tabular figures, for timecode).

## The home page

The page is built as a broadcast reference monitor. Vidiosa sells film by the
second, so the signature element is a live 30-second timeline —
[`src/components/timeline.tsx`](src/components/timeline.tsx) — whose playhead
scrubs in real time at 24fps and loops. The scrub writes straight to the DOM
rather than through React state, and it holds on a still frame when
`prefers-reduced-motion` is set.

The 6px strip across the top is a real SMPTE 75% colour-bar pattern.

## Brand assets

| File | Source | Used for |
|---|---|---|
| `public/vidiosa-logo.png` | `Vidiosa Logo_white_orange.png` | Header logo (300×100, white wordmark + orange mark, transparent) |
| `src/app/icon.png` | `FavIcon Vidiosa.png` | Favicon (32×32) |
| `src/app/apple-icon.png` | `WebClip.png` | Apple touch icon (256×256, white mark on orange) |

All three are the live production assets pulled from vidiosa.com. Next.js picks
up `icon.png` and `apple-icon.png` by filename — no metadata config needed.

The logo art carries roughly 25% padding on the top and bottom, so the header
sizes the box taller than the mark visually reads. The favicon is only 32×32
(that is the largest version currently on the site); re-export it larger if a
crisper tab icon matters.

## Routes and metadata

- `/` — coming soon
- `/opengraph-image` — social card generated at build time with `next/og`
- `/icon.png`, `/apple-icon.png`, `/robots.txt`, `/sitemap.xml`

The canonical URL, sitemap host, and OG metadata are hard-coded to
`https://vidiosa.com` in [`src/app/layout.tsx`](src/app/layout.tsx),
[`src/app/robots.ts`](src/app/robots.ts), and
[`src/app/sitemap.ts`](src/app/sitemap.ts). Change them there if the domain
moves.

## Notes for the next pass

- There is no email capture. The page routes people to `hello@vidiosa.com` and
  the studio phone number instead. Add a form once an ESP is chosen — a capture
  field that posts nowhere is worse than a mailto link.
- Contact details are inlined in the page. Lift them into a shared constant when
  a second page needs them.
