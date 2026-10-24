# Trip with Joanna

Kasper & Joanna's personal travel-memory blog. Static site on GitHub Pages.

- Repo: `KasperChenGH/trip-with-joanna` (branch `main`, served from the repo root)
- Live: https://kasperchengh.github.io/trip-with-joanna/
- Local: `C:\Users\kasper\Desktop\Trip with Joanna` is the repo root

## Structure

```
index.html            Page shell only: header, <main id="main">, footer, phone day-list sheet, lightbox
trips.js              Trip content (window.TRIPS): names, dates, Australia itinerary per day
script.js             Hash router + page renderers, GitHub-API photo listing, carousel, lightbox
style.css             Design tokens on :root (Coastal Editorial), then components; mobile rules at ≤700px
files.local.json      Local-preview file list (gitignored, see "Previewing locally")
README.md             Short public description + how to add photos
CLAUDE.md             This file
.claude/agents/       Project subagents (see below)
Pictures/
  Australia/          澳洲 — 11 days (Day1–4 Melbourne, Day5–11 Sydney)
    cover-twelve-apostles.jpg  Home + Australia banner, 2560px wide (resized from Day4/twelve-apostles.jpg). Give a new banner a new file name so cached copies are not reused.
    Schedule/         Flight itinerary / fare screenshots (shown on the schedule page)
    Day1/ … Day11/    Photos, tickets and bookings for each day
    Unsorted/         Photos whose day is unknown — not shown on the site
  Okinawa/            沖繩 — 5 days, photos auto-loaded, just drop files in
    Schedule/         Itinerary from the user: images shown inline, PDFs as links
    Day1/ … Day5/
  Nagoya/             名古屋 — 6 days, same layout
    Schedule/
    Day1/ … Day6/
```

## How the site works

- **Design:** "Coastal Editorial" (ocean teal `--accent #0E7490`, sand-white `--bg #FAFAF7`; Manrope + Fraunces italic + Noto Sans TC). Chosen by the user from subagent mockups; the phone layout still needs a redesign (desktop was built first on purpose).
- **Routes** (all rendered into `<main>` by `render()` in `script.js`):
  - `#/` home — hero rotating through every trip every 6s (no controls, by user request; pauses on hover/focus, off with reduced motion), trip cards
  - `#/<trip>` trip overview — hero, schedule card, one card per day (grouped by city when days have one)
  - `#/<trip>/schedule` and `#/<trip>/day/<N>` — side-rail frame: trip band, left rail (overview, schedule, every day), one page in the right pane, prev/next pager. On phones the rail becomes a "Day N of M" button + bottom sheet and a sticky prev/next bar.
- **Every trip uses the same pages.** A trip in `trips.js` has `id`, `name`, `en`, `folder`, `country`, optional `dates`, `cover`, `route`, `links`, and `days`: either a count (`days: 5`, untitled days) or a list of `{ date, city, title, timeline: [{ time, text, photos: [{ src, alt, caption }] }] }`. Itinerary text supports `[label](https://link)`. Times use 12-hour format (8:30 AM).
- **Photos load from the repo:** `listRepoFiles()` makes one GitHub API call (`git/trees/main?recursive=1`), so files appear only after being pushed. A day page shows its timeline photos, then every other image in `Pictures/<Trip>/DayN/` (as "More photos" when there is a timeline). Sorted by file name; caption = file name without extension and leading number (`03 首里城.jpg` → "首里城"); camera/LINE names (`LINE_ALBUM_…`, `IMG_…`) get no caption. The schedule page shows images and PDFs from `Schedule/`. A trip without `cover` uses the first photo of `Day1/` (teal gradient until one exists). Supported images: jpg, jpeg, png, gif, webp, avif (not HEIC).
- **Day photos** use one grid (`photoGrid()` in script.js): 3 per row, 2 photos fill the row as halves, and the last row never holds a lone photo (13 → 3·3·3·2·2). Each photo is shown whole (`object-fit: contain`) in a 4:3 frame over a blurred copy of itself — the user does not want photos cropped.
- **Day content comes from each trip's schedule** in `Pictures/<Trip>/Schedule/`: Okinawa `schedule.txt` + `okinawa.png`, Nagoya the itinerary PDF (overview table: dates, highlights, meals), Australia the original itinerary. Day titles and timelines in trips.js follow these files; when a schedule changes, update trips.js to match.
- **Day covers:** a day's `cover` in trips.js is the photo of that day's main event *per the schedule* (overview card), chosen by looking at the photos — not just the first file. If the main event has no photos (Okinawa Day 2 paragliding, Day 4 Blue Cave), use the best photo of the day's other headline event. Trip `cover` (hero banner, full screen width) must be a landscape photo, ideally 2560px wide (resize larger originals to 2560px JPEG, no EXIF); smaller looks blurry. Current picks: Okinawa D1 暖暮拉麵 #12, D2 波上宮 #55, D3 瀨長島夕陽 #33, D4 古宇利島 #49, D5 A&W #11, trip hero D4 #20. Days without `cover` use the first photo in their folder.
- **Lightbox:** clicking any `figure img` or schedule image in `<main>` opens `<dialog class="lightbox">` with prev/next.

## Previewing locally

`files.local.json` stands in for the GitHub API on `localhost`, so unpushed photos show up:

```sh
python -c "import os,json;json.dump(sorted(os.path.join(r,f).replace(os.sep,'/') for r,_,fs in os.walk('Pictures') for f in fs),open('files.local.json','w',encoding='utf-8'),ensure_ascii=False)"
python -m http.server 8765    # then open http://localhost:8765/
```

## Conventions

- Plain HTML/CSS/vanilla JS. No build step, npm, or frameworks.
- Relative asset paths only (site lives under `/trip-with-joanna/`). GitHub Pages paths are case-sensitive.
- Every trip uses the same folders: `Pictures/<Trip>/Schedule/` + `Day1/ … DayN/`. Australia image names are lowercase-kebab-case; nothing loose in `Pictures/` root.
- Content mixes Traditional Chinese and English.
- Reuse CSS tokens (`--accent`, `--ink`, `--muted`, `--line`, …) instead of hard-coded colors.
- Files use CRLF line endings — preserve them when editing.
- Public repo: no GPS EXIF, booking numbers or frequent-flyer numbers in new images.

## Adding a trip

1. Create `Pictures/<Trip>/Schedule/` and `Pictures/<Trip>/Day1/ … DayN/`, each with a `.gitkeep`.
2. Add an entry to `trips.js` (copy the Okinawa entry: `days: N`).
3. Add a header nav link and a footer link in `index.html` (`href="#/<id>" data-nav="<id>"`).

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
grep -oE "Pictures/[^\"]+\.[a-z]+" trips.js | sort -u | while read -r f; do [ -e "$f" ] || echo "MISSING $f"; done
```
