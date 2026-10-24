# Trip with Joanna

Kasper & Joanna's personal travel-memory blog. Static site on GitHub Pages.

- Repo: `KasperChenGH/trip-with-joanna` (branch `main`, served from the repo root)
- Live: https://kasperchengh.github.io/trip-with-joanna/
- Local: `C:\Users\kasper\Desktop\Trip with Joanna` is the repo root

## Structure

```
index.html            All views in one page (home, Australia, Okinawa, Nagoya)
style.css             Design tokens on :root, then layout/components; mobile rules at ≤600px
script.js             Hash routing, day chips, GitHub-API photo galleries, lightbox
README.md             Short public description + how to add photos
CLAUDE.md             This file
.claude/agents/       Project subagents (see below)
Pictures/
  Australia/
    cover.jpg         Home card + Australia hero image
    Melbourne/        Photos used in the Melbourne itinerary
    Sydney/           Photos used in the Sydney itinerary (+ a few not on the page yet)
    Tickets/          Flight tickets and booking screenshots
  Okinawa/            沖繩 gallery — auto-loaded, just drop photos in
  Nagoya/             名古屋 gallery — auto-loaded, just drop photos in
```

## How the site works

- **Routing:** URL hash selects the view: `#/`, `#/australia/melbourne`, `#/australia/sydney`, `#/okinawa`, `#/nagoya`. Valid views are listed in `VIEWS` in `script.js`; each is a `<section class="view" id="...">` in `index.html`.
- **Australia:** one trip with a Melbourne | Sydney switch. Content is hand-written in `index.html`: each day is `<article class="day">` with `.day-label` ("Day N · Mon DD"), `<h3>`, and an `<ol class="timeline">` of `<li><time>…</time> text <figure>…</figure></li>`. Day chips are generated from `.day-label` automatically. Images are referenced by path, so moving/renaming files in `Pictures/Australia/` requires updating `index.html`.
- **Japan galleries:** `.gallery[data-folder]` lists images via `https://api.github.com/repos/KasperChenGH/trip-with-joanna/contents/<folder>` — photos appear only after being pushed. Sorted by file name; the caption is the file name without extension and without a leading number (`03 首里城.jpg` → "首里城"). The first photo is the trip's home-page cover. Supported: jpg, jpeg, png, gif, webp, avif (not HEIC).
- **Lightbox:** clicking any `figure img` inside `<main>` opens the `<dialog class="lightbox">`.

## Conventions

- Plain HTML/CSS/vanilla JS. No build step, npm, or frameworks.
- Relative asset paths only (site lives under `/trip-with-joanna/`). GitHub Pages paths are case-sensitive.
- Australia image names are lowercase-kebab-case; nothing loose in `Pictures/` root.
- Content mixes Traditional Chinese and English; fonts are Noto Serif TC (headings) / Noto Sans TC (body).
- Itinerary times use 12-hour format (8:30 AM).
- Reuse CSS tokens (`--accent`, `--ink`, `--muted`, `--line`, …) instead of hard-coded colors.
- Files use CRLF line endings — preserve them when editing.
- Public repo: no GPS EXIF, booking numbers or frequent-flyer numbers in new images.

## Adding a trip

1. Create `Pictures/<Trip>/` with a `.gitkeep`.
2. In `index.html`: add a header nav link, a home `trip-card`, and a `<section class="view" id="<trip>">` (copy the Okinawa pattern).
3. Add the id to `VIEWS` in `script.js`.

## Subagents (`.claude/agents/`)

| Agent | Purpose |
|---|---|
| `ui-ux-designer` | Visual/UX design, mobile, accessibility |
| `frontend-developer` | Features and fixes in HTML/CSS/JS |
| `travel-writer` | Itineraries, memory write-ups, captions (中文/English) |
| `photo-curator` | Organize, rename, convert, compress photos; strip EXIF |
| `site-reviewer` | Pre-push QA: paths, routes, mobile, a11y, typos, privacy |

## Checks before pushing

```sh
node -e "new Function(require('fs').readFileSync('script.js','utf8'))"   # JS syntax
grep -oE "Pictures/[^\"')]+" index.html | sort -u | while read -r f; do [ -e "$f" ] || echo "MISSING $f"; done
```
