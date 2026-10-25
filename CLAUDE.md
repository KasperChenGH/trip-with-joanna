# Trip with Joanna

Kasper & Joanna's personal travel-memory blog. Static site on GitHub Pages.

- Repo: `KasperChenGH/trip-with-joanna` (branch `main`, served from the repo root)
- Live: https://kasperchengh.github.io/trip-with-joanna/
- Local: `C:\Users\kasper\Desktop\Trip with Joanna` is the repo root
- **Read `MEMORY.md` too** — decisions the user made, their preferences, and what's still open.

## Structure

```
index.html            Page shell only: header, <main id="main">, footer, phone day-list sheet, lightbox
trips.js              All trip content (window.TRIPS): dates, routes, day titles, itineraries, covers, captions
script.js             Hash router + page renderers, GitHub-API photo listing, carousel, lightbox (zoom/pan)
style.css             Design tokens on :root (Coastal Editorial), then components; mobile rules at ≤700px
logo.png, favicon.png, apple-touch-icon.png   Round logo cut from our photo (Okinawa Day4 #49)
tools/itinerary_poster.py   Draws each Schedule page's itinerary image from trips.js
files.local.json      Local-preview file list (gitignored, see "Previewing locally")
README.md             Short public description + how to add photos
MEMORY.md             Decision log, user preferences, open items
CLAUDE.md             This file
.claude/agents/       Project subagents (see below)
Pictures/
  Australia/          澳洲 — 12月23日 – 1月3日, 11 days (Day1–4 墨爾本, Day5–11 雪梨)
    cover-twelve-apostles.jpg   Banner (2560px, from Day4/twelve-apostles.jpg)
    Schedule/         australia-itinerary.jpg
    Day1/ … Day11/    Photos (lowercase-kebab-case names)
    Unsorted/         Photos whose day is unknown — not shown on the site
  Okinawa/            沖繩 — 4月7日 – 4月11日 2026, 5 days
    cover-kouri-bridge.jpg      Banner (Wikimedia Commons, CC BY 2.0)
    Schedule/         okinawa-itinerary.jpg, schedule.txt (the user's original notes)
    Day1/ … Day5/     LINE album photos
  Nagoya/             名古屋 — 9月25日 – 9月30日 2026, 6 days (self-drive: 美濃, 下呂, 飛驒高山, 上高地, 名古屋)
    cover-kamikochi.jpg         Banner (Wikimedia Commons, CC BY-SA 4.0)
    Schedule/         nagoya-itinerary.jpg + the full itinerary PDF (attachment)
    Day1/ … Day6/     LINE album photos
```

## How the site works

- **Design:** "Coastal Editorial" (ocean teal `--accent #0E7490`, sand-white `--bg #FAFAF7`; Manrope + Fraunces italic + Noto Sans TC). Desktop is finished; the phone layout still needs a redesign (user is unhappy with all phone mockups so far).
- **Routes** (rendered into `<main>` by `render()` in `script.js`):
  - `#/` home — compact masthead (title, trips/countries count), hero photo rotating through the trips every 4s (no arrows/dots/pause — user removed them; pauses on hover, off with reduced motion), trip cards, banner photo credits
  - `#/<trip>` overview — banner, schedule card, one card per day (grouped by city when days have one)
  - `#/<trip>/schedule`, `#/<trip>/day/<N>` — side-rail frame: trip band, left rail (overview, schedule, every day with date), one page on the right, prev/next. Phones: "第 N 天" button + bottom sheet, sticky prev/next bar.
- **trips.js shape:** a trip has `id`, `name`, `en`, `folder`, `country`, `dates`, `cover`, `coverPosition` (CSS object-position for the banner crop), `coverCredit` `{ text, href }` (required for photos that aren't ours), `route`, `links`, `captions` `{ path: 中文 caption }`, and `days`: a list of `{ date, city?, title, cover, coverPosition?, timeline: [{ time, text, photos? }] }` (or a number for untitled days). Text supports `[label](https://link)`.
- **Day pages (same for every trip):** itinerary list on top (time + where we went, no photos inside), then one photo grid: itinerary photos first, then every other image in `Pictures/<Trip>/DayN/`.
- **Photo grid:** square thumbnails cropped toward the top (`object-position: 50% 30%`), 3 per row, pairs as halves, the last row never holds a lone photo. Clicking opens the lightbox: whole photo fitted to the screen, pinch / double-tap / wheel to zoom up to 5×, drag to pan; swipe / drag sideways (or past the edge when zoomed) for the next or previous photo.
- **Photos load from the repo:** one GitHub API call (`git/trees/main?recursive=1`), so files appear only after a push. Sorted by file name; caption = file name minus extension and leading number, except camera/LINE names (`LINE_ALBUM_…`, `IMG_…`) which get none, and paths listed in `captions`. Images: jpg, jpeg, png, gif, webp, avif (not HEIC).
- **Day covers** (`cover` per day, shown on the overview cards) are the photo of that day's main event, picked by looking at the photos. It must show only Kasper & Joanna, food, or scenery — no other people or group shots. Optional `coverPosition` per day adjusts the card crop. The current picks are listed in `MEMORY.md`.
- **Banners** (`cover` per trip) are landscape, 2560px wide JPEG, no EXIF, with a new file name whenever they change (so caches don't keep the old one). Okinawa and Nagoya use free-licensed Wikimedia Commons photos of the trip's most scenic stop; the credit shows on the banner and under the home cards.
- **Schedule pages** lead with an itinerary image drawn by `tools/itinerary_poster.py` from trips.js (exact Chinese text, one card per day, icon per stop). Re-run it whenever a trip's days change:
  ```sh
  python tools/itinerary_poster.py <tmp_dir> <trip-id>
  # render <tmp_dir>/<trip-id>.html with headless Edge at 1600px wide, scale 1.5 (height = body data-h)
  # save as Pictures/<Trip>/Schedule/<trip-id>-itinerary.jpg (JPEG q90)
  ```
- **Itineraries follow what actually happened,** not the original plan. Places the user said they skipped are removed (see `MEMORY.md`); don't reintroduce them from the schedule files.

## Previewing locally

`files.local.json` stands in for the GitHub API on `localhost`, so unpushed photos show up:

```sh
python -c "import os,json;json.dump(sorted(os.path.join(r,f).replace(os.sep,'/') for r,_,fs in os.walk('Pictures') for f in fs),open('files.local.json','w',encoding='utf-8'),ensure_ascii=False)"
python -m http.server 8765    # then open http://localhost:8765/
```

## Conventions

- Plain HTML/CSS/vanilla JS. No build step, npm, or frameworks.
- Relative asset paths only (site lives under `/trip-with-joanna/`). GitHub Pages paths are case-sensitive.
- **All visible text is Traditional Chinese** (labels, titles, itinerary, captions, dates `12月23日`, times `上午 8:00` / `中午 12:05` / `下午 2:00` / `晚上 7:35`). Shop, restaurant and brand names keep their own spelling; "Trip with Joanna" and "Kasper & Joanna" stay.
- **At most 3 photos per location** (scenery, food, signs). Photos of us / our group are not limited, but near-duplicate burst shots are removed. Extras go to `C:\Users\kasper\Desktop\Trip with Joanna - removed duplicates\` — moved, never deleted.
- **No tickets or booking screenshots** on the site (they show booking / frequent-flyer numbers). Public repo: no GPS EXIF in new images.
- Reuse CSS tokens (`--accent`, `--ink`, `--muted`, `--line`, …) instead of hard-coded colors.
- Files use CRLF line endings — preserve them when editing (Git Bash `sed -i` strips them; use Python with `newline=''`, and always `encoding='utf-8'`).

## Adding a trip

1. Create `Pictures/<Trip>/Schedule/` and `Pictures/<Trip>/Day1/ … DayN/`.
2. Add an entry to `trips.js` (dates, route, days with titles and timelines, day covers, banner with credit if needed).
3. Add a header nav link in `index.html` (`href="#/<id>" data-nav="<id>"`).
4. Draw its itinerary image with `tools/itinerary_poster.py`.

## Subagents (`.claude/agents/`)

| Agent | Purpose |
|---|---|
| `ui-ux-designer` | Visual/UX design, mobile, accessibility |
| `frontend-developer` | Features and fixes in HTML/CSS/JS |
| `travel-writer` | Itineraries, memory write-ups, captions (中文/English) |
| `photo-curator` | Organize, rename, convert, compress photos; strip EXIF |
| `site-reviewer` | Pre-push QA: paths, routes, mobile, a11y, typos, privacy |

## Checks before pushing

- Bump `?v=N` on the style.css / trips.js / script.js links in `index.html` whenever any of them changes (GitHub Pages lets browsers cache for 10 minutes).
- Run:

```sh
node -e "new Function(require('fs').readFileSync('script.js','utf8'))"   # JS syntax
grep -oE "Pictures/[^\"]+\.[a-z]+" trips.js | sort -u | while read -r f; do [ -e "$f" ] || echo "MISSING $f"; done
```

- After pushing, wait for the Pages build: `gh api repos/KasperChenGH/trip-with-joanna/pages/builds/latest --jq .status`.
