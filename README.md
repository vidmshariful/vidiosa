# Vidiosa

Marketing site for Vidiosa, the video team for B2B SaaS.

Currently serving an interim one-page home (header, hero with the showreel,
"what we make" strip, footer call to action) while the full site is built in
`vidiosa-web`.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens) plus page classes in `src/app/globals.css` |
| Fonts | Inter Tight (headings) and Inter (body) via `next/font` |
| Linting | ESLint (`eslint-config-next`) |

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Design system

This page follows the approved v4 direction: black, white and one orange
gradient. Tokens live in [`src/app/globals.css`](src/app/globals.css).

| Token | Value | Use |
|---|---|---|
| `ink` | `#0a0a0b` | Text, buttons, dark blocks |
| `paper` | `#ffffff` | Page background |
| `mist` | `#f3f3f1` | Soft fills (WhatsApp pill, button icons) |
| `line` | `#e3e3df` | Hairlines |
| `muted` | `#5e5e62` | Body text |
| `--grad` | `#ff9a4d` to `#ff5a1f` to `#f23d0f` | Logo mark, button dots, the last headline line |

## The page

- **Hero:** two-line headline, subhead, "Book a call" and "Watch the showreel".
- **Showreel:** [`src/components/showreel.tsx`](src/components/showreel.tsx).
  A silent 12-second preview loops until someone presses play; then the full
  reel plays with sound in the same frame. The hero's "Watch the showreel"
  button ([`watch-button.tsx`](src/components/watch-button.tsx)) fires an event
  the showreel listens for.
- **Footer:** "Let's plan your first month.", the booking calendar and the
  dotted "vidiosa studio" wordmark.
  - The calendar ([`booking-calendar.tsx`](src/components/booking-calendar.tsx))
    is the GrowxCRM booking widget in an iframe; its embed script resizes the
    frame to fit. Every "Book a call" link scrolls to it (`#book`).
  - The wordmark ([`dot-wordmark.tsx`](src/components/dot-wordmark.tsx)) is a
    canvas grid of small squares that swirl away from the cursor and turn
    orange, then settle back. It sits still for people who prefer reduced
    motion.

## Interactions

All of these switch off for people who prefer reduced motion. Cursor and hover
effects run only with a mouse or trackpad; phones keep the rest.

| Effect | Where |
|---|---|
| Custom cursor: a dot, a ring over links, a "Play reel" bubble over the showreel | [`cursor.tsx`](src/components/cursor.tsx) |
| Magnetic buttons (`data-magnetic`), header that hides on scroll down, gradient that follows the cursor | [`site-motion.tsx`](src/components/site-motion.tsx) |
| Faint dot field behind the hero | [`hero-field.tsx`](src/components/hero-field.tsx) |
| "What we make" strip that drifts and shows a clip on hover | [`marquee.tsx`](src/components/marquee.tsx), clips in `public/video/make/` |
| Showreel that widens as it scrolls through, looping gradient on "Videos every week." | CSS in [`globals.css`](src/app/globals.css) |

Contact details, the booking widget URL and the "Book a call" link live in
[`src/lib/contact.ts`](src/lib/contact.ts).

## Assets

| File | Used for |
|---|---|
| `public/brand/vidiosa-logo-black.png`, `-white.png` | Header logo (black wordmark, gradient play mark); the white one is unused for now |
| `public/brand/vidiosa-mark-black.png`, `-white.png` | Strip separators, call card |
| `public/brand/vidiosa-mark-gradient.png`, `vidiosa-wordmark-black.png` | Header logo, split so the mark can spin on hover |
| `public/video/make/*.mp4` | Silent hover previews for the strip, about 600 KB in all, loaded on hover |
| `public/video/showreel.mp4` | Full reel, 66 s, 1080p, about 14 MB |
| `public/video/showreel-preview.mp4` | Silent 12 s loop, about 1.5 MB |
| `public/video/showreel-poster.jpg` | Still shown before the videos load |
| `src/app/icon.png`, `apple-icon.png` | Browser tab and home screen icons, cut from the mark |

## Careers

- `/careers` lists open roles grouped by team; each role has its own page at
  `/careers/<slug>`.
- Roles live in [`src/content/careers.ts`](src/content/careers.ts): title,
  team, a one-line summary and, once it exists, the role's HighLevel form
  (`formUrl` plus `formId`). Without a form, Apply falls back to an email to
  hello@vidiosa.com with the role in the subject line.
- Add, remove or reorder roles there; the list, role pages and sitemap follow.

## Routes and metadata

- `/`: interim home
- `/careers`, `/careers/<slug>`: careers and role pages
- `/opengraph-image`: social card generated with `next/og`
- `/icon.png`, `/apple-icon.png`, `/robots.txt`, `/sitemap.xml`

The canonical URL, sitemap host and OG metadata are set to
`https://vidiosa.com` in [`src/app/layout.tsx`](src/app/layout.tsx),
[`src/app/robots.ts`](src/app/robots.ts) and
[`src/app/sitemap.ts`](src/app/sitemap.ts).
