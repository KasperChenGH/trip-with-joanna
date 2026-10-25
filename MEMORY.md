# Memory — Trip with Joanna

What the user decided, what they prefer, and what's still open. Read this with `CLAUDE.md` before changing the site.

## How the user likes to work

- Wants results fast: keep design/review rounds short (aim for ~15 minutes, at most 2 review rounds) and say plainly what is and isn't verified.
- Show options visually (a comparison page or artifact) rather than describing them; they pick, then it gets built.
- "commit push" means: commit, push, and wait for the GitHub Pages build to finish.
- Photos that are removed are moved to `C:\Users\kasper\Desktop\Trip with Joanna - removed duplicates\`, never deleted.

## Design decisions

- Style: **Coastal Editorial**, ocean teal palette (picked from 3 directions × 4 palettes).
- Page frames picked per page type: home = rotating hero ("Story Stepper" home), trip overview = **day cards**, schedule + day pages = **side rail** ("Itinerary Sidebar").
- Every trip uses the same pages; each day is its own page.
- Home hero: rotates every **4s**, no arrows / dots / pause button. Masthead with 「我們的旅行回憶」 and the trips/countries count stays, but compact.
- Day photos: **square thumbnails** (chosen over blurred fill, matte, polaroid, filmstrip, etc.). The blurred side fill was disliked.
- Lightbox opens the whole photo fitted to the screen; zoom + pan inside it; swipe / drag sideways to change photo (also when zoomed, by dragging past the edge).
- Day pages: itinerary list on top with no photos inside it, then one photo grid.
- Logo: round crop of the two of us (Okinawa Day4 #49) with a teal ring; also favicon and touch icon.
- Footer: signature and tagline only, no nav links.
- All text in Traditional Chinese; English trip subtitles removed.
- Schedule pages: an itinerary image per trip drawn from trips.js (the AI-made Okinawa card was replaced because AI images garble Chinese and it showed "DAY 5" twice).

## Content facts confirmed by the user

- Okinawa dates: **2026-04-07 – 04-11**. Not visited: **美國村** (incl. Blue Seal), **青之洞窟** (snorkel/dive). Day 4 morning was **萬座毛** (seen in the photos).
- Nagoya: Day 2 was **下呂溫泉合掌村**, not 白川鄉 (the PDF still says 白川鄉; it's the user's original file).
- Australia: **塔龍加動物園 Taronga Zoo** (Day 9) not visited. Other Australia stops may also not have happened — the user will say which.
- Australia shows 11 days (Dec 23 – Jan 3); the trip page says 11 天.

## Photo rules and picks

- Max 3 photos per location; photos of people unlimited (but near-duplicate bursts removed); no tickets/bookings.
- Banners: Australia = Twelve Apostles (cropped `center 25%` so the stacks show); Okinawa = 古宇利大橋 (Takuya ASADA, CC BY 2.0); Nagoya = 上高地 河童橋 (くろふね, CC BY-SA 4.0, `center 35%`). Earlier Nagoya banners (Shirakawa-go, Gero gassho-mura) were replaced.
- Day covers (main event of the day) and banners show **only the two of us, food, or scenery** — never other people or group shots (user rule, 2026-10-26).
  - Australia: D1 State Library Victoria, D2 St Kilda Beach, D3 Penguin Parade, D4 Twelve Apostles, D5 Opera House, D6 University of Sydney, D7 Three Sisters, D8 NYE fireworks, D9 Luna Park, D10 Bondi Beach, D11 none (only flights).
  - Okinawa: D1 暖暮拉麵 #12, D2 us at the 波上宮 torii #23, D3 瀨長島夕陽 #33, D4 古宇利島 #49, D5 A&W root beer + burgers #3.
  - Nagoya: D1 plane at sunset #2, D2 umbrella couple at 合掌村 #25, D3 us at 河童橋 #56 (#66 is another couple, not us), D4 鰻魚飯 #1, D5 sushi #1, D6 ramen #2.
- LINE strips photo dates and GPS, so dates can't be read from the photos — ask the user.

## Open items

- **Phone layout** needs a redesign (user disliked every phone mockup; desktop was built first on purpose).
- Australia: which other planned stops didn't happen; most Australia photos look like stock/online photos — swap in their own when provided.
- Nagoya photos are full-size (Day 2 ≈ 25 MB); offered to resize to ~1600px for speed — not done yet.
- Ticket screenshots are off the site but still in git history; rewriting history was offered, not done.
- Australia `Unsorted/` (oyster-experience.png, thai-curry.jpg): day unknown.
