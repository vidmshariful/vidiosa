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
- **Footer:** "Let's plan your first month." and the large wordmark.

Contact details and the "Book a call" link live in
[`src/lib/contact.ts`](src/lib/contact.ts). There is no booking calendar yet,
so "Book a call" opens an email to hello@vidiosa.com; swap `BOOK_CALL_URL` when
one exists.

## Assets

| File | Used for |
|---|---|
| `public/brand/vidiosa-logo-black.png`, `-white.png` | Header and footer logo (black wordmark, gradient play mark) |
| `public/brand/vidiosa-mark-black.png`, `-white.png` | Strip separators, call card |
| `public/video/showreel.mp4` | Full reel, 66 s, 1080p, about 14 MB |
| `public/video/showreel-preview.mp4` | Silent 12 s loop, about 1.5 MB |
| `public/video/showreel-poster.jpg` | Still shown before the videos load |
| `src/app/icon.png`, `apple-icon.png` | Browser tab and home screen icons, cut from the mark |

## Routes and metadata

- `/`: interim home
- `/opengraph-image`: social card generated with `next/og`
- `/icon.png`, `/apple-icon.png`, `/robots.txt`, `/sitemap.xml`

The canonical URL, sitemap host and OG metadata are set to
`https://vidiosa.com` in [`src/app/layout.tsx`](src/app/layout.tsx),
[`src/app/robots.ts`](src/app/robots.ts) and
[`src/app/sitemap.ts`](src/app/sitemap.ts).
