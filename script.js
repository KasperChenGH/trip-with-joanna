// Pages are switched with the URL hash:
//   #/                     home
//   #/<trip>               trip overview (day cards)
//   #/<trip>/schedule      schedule page
//   #/<trip>/day/<N>       one page per day
// Trip content lives in trips.js; photos are listed from the repo so new files show up after a push.

const GITHUB_REPO = 'KasperChenGH/trip-with-joanna';
const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif)$/i;
const DOCUMENT_EXTENSIONS = /\.pdf$/i;
// Camera / chat-app file names ("LINE_ALBUM_…_3.jpg", "IMG_1234.jpg") make poor captions, so they get none.
const AUTO_NAME = /^(line_album|img|dsc|pxl|mvimg|photo|image|screenshot)[\s_-]|^[\d\s_.-]+$/i;
const LOCAL_HOST = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

const TRIPS = window.TRIPS.map(normalizeTrip);
const main = document.getElementById('main');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ICON = {
  arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  caret: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  waves: '<svg class="waves" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true"><path d="M0 260c150-60 300-60 450 0s300 60 450 0 200-40 300 0v140H0z" fill="rgba(255,255,255,.08)"/><path d="M0 310c150-50 300-50 450 0s300 50 450 0 200-30 300 0v90H0z" fill="rgba(255,255,255,.10)"/><path d="M0 350c150-40 300-40 450 0s300 40 450 0 200-20 300 0v50H0z" fill="rgba(255,255,255,.14)"/></svg>',
};

// ---------- data ----------

// `days` may be a count (Japan trips before titles are written) or a list of day objects.
function normalizeTrip(trip, index) {
  const list = typeof trip.days === 'number' ? Array.from({ length: trip.days }, () => ({})) : trip.days;
  const days = list.map((day, i) => ({ timeline: [], ...day, n: i + 1, folder: `${trip.folder}/Day${i + 1}` }));
  return {
    links: [],
    ...trip,
    no: index + 1,
    days,
    length: `${days.length} days`,
    cities: [...new Set(days.map(day => day.city).filter(Boolean))],
  };
}

function findTrip(id) {
  return TRIPS.find(trip => trip.id === id);
}

function timelinePhotos(day) {
  return day.timeline.flatMap(item => item.photos || []);
}

// ---------- helpers ----------

function esc(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function pad(n) {
  return String(n).padStart(2, '0');
}

// Itinerary text may contain [label](https://link).
function rich(text) {
  return esc(text).replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function dayTitle(day) {
  return day.title || `Day ${day.n}`;
}

function arrow(icon, size) {
  return icon.replace('<svg', `<svg width="${size}" height="${size}"`);
}

// ---------- repo file listing ----------

// One request for the whole repo's file list, shared by every gallery on the page.
// When previewing locally (python -m http.server), files.local.json stands in for the GitHub API.
let repoFiles;
function listRepoFiles() {
  if (!repoFiles) {
    const fromApi = () => fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/trees/main?recursive=1`)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => data.tree.filter(item => item.type === 'blob').map(item => item.path));
    const local = LOCAL_HOST
      ? fetch('files.local.json').then(response => (response.ok ? response.json() : fromApi()), fromApi)
      : fromApi();
    repoFiles = local.catch(error => {
      repoFiles = null;
      throw error;
    });
  }
  return repoFiles;
}

// Files directly inside `folder` matching `pattern`, sorted by name.
function listFiles(folder, pattern) {
  return listRepoFiles().then(paths => paths
    .filter(path => path.startsWith(`${folder}/`) && !path.slice(folder.length + 1).includes('/'))
    .map(path => path.slice(folder.length + 1))
    .filter(name => pattern.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(name => {
      const base = name.replace(/\.[^.]+$/, '');
      return {
        name,
        src: `${folder}/${encodeURIComponent(name)}`,
        // "03 Shurijo Castle.jpg" -> "Shurijo Castle", "maritime-museum.jpg" -> "maritime museum"
        caption: AUTO_NAME.test(base) ? '' : base.replace(/^\d+[\s_.-]*/, '').replace(/[-_]+/g, ' '),
      };
    }));
}

function listPhotos(folder) {
  return listFiles(folder, IMAGE_EXTENSIONS);
}

// ---------- shared pieces ----------

// The whole photo inside a fixed frame, over a blurred copy of itself (same file, so no extra download).
function framedPhoto(src, alt, attrs) {
  return `<div class="ph"><img class="ph-bg" src="${esc(src)}" alt="" aria-hidden="true" loading="lazy" decoding="async"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs || ''}></div>`;
}

// Rows of 3; the last row never holds a single photo: 1 → half, 2 → halves, 4 → 2 + 2, 7 → 3 + 2 + 2.
function halfWidth(count, i) {
  if (count <= 2 || count === 4) return true;
  if (count % 3 === 1) return i >= count - 4;
  if (count % 3 === 2) return i >= count - 2;
  return false;
}

function photoGrid(photos, alt) {
  return `<div class="photo-grid">${photos.map((photo, i) => {
    const label = photo.caption || '';
    return `<figure${halfWidth(photos.length, i) ? ' class="half"' : ''}>${framedPhoto(photo.src, photo.alt || label || alt, ' tabindex="0" role="button"')}${label ? `<figcaption>${esc(label)}</figcaption>` : ''}</figure>`;
  }).join('')}</div>`;
}

function renderTimeline(day) {
  return `<ol class="timeline">${day.timeline.map(item => {
    const photos = item.photos || [];
    // A lone photo looks lost under its stop, so it joins the day's photo grid below instead.
    return `<li><span class="time">${esc(item.time)}</span><p class="act">${rich(item.text)}</p>${photos.length > 1 ? photoGrid(photos) : ''}</li>`;
  }).join('')}</ol>`;
}

function emptyState(title, hint, path) {
  return `<div class="empty"><div class="empty-icon">${ICON.cam}</div><h3>${title}</h3><p>${hint}</p>${path ? `<p><code>${esc(path)}</code></p>` : ''}</div>`;
}

// A cover area that shows the trip photo, or a teal gradient until the first photo of Day 1 is pushed.
function coverBackground(trip) {
  if (trip.cover) return { cls: '', html: `<img src="${esc(trip.cover)}" alt="" fetchpriority="high">`, attr: '' };
  return { cls: ' gradient', html: ICON.waves + `<p class="ghost" aria-hidden="true">${esc(trip.en)}</p>`, attr: ` data-cover-folder="${esc(trip.days[0].folder)}"` };
}

// ---------- home ----------

function pageHome() {
  const slides = TRIPS.map((trip, k) => {
    const bg = coverBackground(trip);
    const meta = [trip.dates, trip.length, trip.country].filter(Boolean).map(m => `<li>${esc(m)}</li>`).join('');
    return `<div class="slide${bg.cls}${k === 0 ? ' is-active' : ''}"${bg.attr} role="group" aria-roledescription="slide" aria-label="${k + 1} of ${TRIPS.length}: ${esc(trip.en)}"${k === 0 ? '' : ' aria-hidden="true"'}>${bg.html}
      <div class="wrap slide-inner"><div><p class="eyebrow">Trip No. ${pad(trip.no)}</p><h2>${esc(trip.name)} <span class="latin">${esc(trip.en)}</span></h2></div>
      <div><ul class="hero-meta">${meta}</ul><a class="hero-cta" href="#/${trip.id}">Open ${esc(trip.name)} ${esc(trip.en)} <span aria-hidden="true">→</span></a></div></div></div>`;
  }).join('');
  const cards = TRIPS.map(trip => {
    const cover = trip.cover
      ? `<div class="trip-cover-wrap"><img src="${esc(trip.cover)}" alt="" loading="lazy"></div>`
      : `<div class="cover-soon" data-cover-folder="${esc(trip.days[0].folder)}" data-cover-kind="card">${ICON.waves}<p class="ghost" aria-hidden="true">${esc(trip.en)}</p><span class="soon-tag">Coming soon · 照片即將上傳</span></div>`;
    return `<a class="trip-card" href="#/${trip.id}">${cover}<div class="trip-card-body"><span class="trip-no">No. ${pad(trip.no)}</span>
      <p class="trip-meta">${esc([trip.dates, trip.length].filter(Boolean).join(' · '))}</p><h3>${esc(trip.name)}<span class="latin">${esc(trip.en)}</span></h3>
      <p class="where">${esc(trip.cities.length ? trip.cities.join(' · ') : trip.country)}</p><span class="go">${trip.days.length} days, one page each <span aria-hidden="true">→</span></span></div></a>`;
  }).join('');
  return `<h1 class="visually-hidden" id="page-h" tabindex="-1">我們的旅行回憶 — Trip with Joanna</h1>
    <section class="carousel on-dark" aria-roledescription="carousel" aria-label="Our trips" id="carousel"><div class="slides">${slides}</div>
    </section>
    <section class="wrap trips" aria-labelledby="trips-title"><div class="trips-head"><h2 id="trips-title">旅程<span class="display-it">Trips</span></h2><p>${TRIPS.length} trips · one page per day</p></div><div class="trip-grid">${cards}</div></section>`;
}

// Home hero: crossfade between trips every 6s; pauses while hovered or focused.
const carousel = { timer: null, index: 0 };

function showSlide(root, k) {
  const slides = root.querySelectorAll('.slide');
  carousel.index = (k + slides.length) % slides.length;
  slides.forEach((slide, j) => {
    slide.classList.toggle('is-active', j === carousel.index);
    if (j === carousel.index) slide.removeAttribute('aria-hidden');
    else slide.setAttribute('aria-hidden', 'true');
  });
}

function startCarousel() {
  const root = document.getElementById('carousel');
  if (!root || reduceMotion) return;
  carousel.index = 0;
  let hovered = false;
  root.addEventListener('mouseenter', () => { hovered = true; });
  root.addEventListener('mouseleave', () => { hovered = false; });
  root.addEventListener('focusin', () => { hovered = true; });
  root.addEventListener('focusout', () => { hovered = false; });
  carousel.timer = setInterval(() => {
    if (!hovered && !document.hidden) showSlide(root, carousel.index + 1);
  }, 6000);
}

function stopCarousel() {
  clearInterval(carousel.timer);
  carousel.timer = null;
}

// ---------- trip overview ----------

function pageOverview(trip) {
  const bg = coverBackground(trip);
  const meta = [trip.dates, trip.length, ...trip.cities].filter(Boolean).map(m => `<li>${esc(m)}</li>`).join('');
  const hero = `<section class="trip-hero on-dark${bg.cls}"${bg.attr}>${bg.html}<div class="wrap hero-inner">
    <div><p class="eyebrow">Trip No. ${pad(trip.no)} · ${esc(trip.country)}</p><h1 id="page-h" tabindex="-1">${esc(trip.name)} <span class="latin">${esc(trip.en)}</span></h1></div>
    <ul class="hero-meta">${meta}</ul></div></section>`;
  const schedule = `<a class="sched-card" href="#/${trip.id}/schedule"><span class="sc-ico" aria-hidden="true">${ICON.cal}</span>
    <div><h2>行程 <span class="display-it muted">Schedule</span></h2><p>${trip.route ? esc(trip.route) : 'Itinerary, tickets &amp; bookings'}</p></div>
    <span class="go">Open schedule ${arrow(ICON.arrowR, 16)}</span></a>`;
  let lastCity = null;
  const cards = trip.days.map((day, i) => {
    let group = '';
    if (day.city && day.city !== lastCity) {
      lastCity = day.city;
      let end = i;
      while (end + 1 < trip.days.length && trip.days[end + 1].city === day.city) end++;
      group = `<h3 class="grid-group">${esc(day.city)} <small>Day ${day.n}${end > i ? `–${trip.days[end].n}` : ''}</small></h3>`;
    }
    // The day's own cover (its main event); Japan days use the first photo in their folder.
    const cover = day.cover
      ? `<div class="dc-cover"><span class="dc-num">Day ${day.n}</span>${framedPhoto(day.cover, '')}</div>`
      : `<div class="dc-cover soon" data-cover-folder="${esc(day.folder)}" data-cover-kind="day"><span class="dc-num">Day ${day.n}</span><span class="big" aria-hidden="true">${pad(day.n)}</span></div>`;
    return `${group}<a class="day-card" href="#/${trip.id}/day/${day.n}">${cover}<div class="dc-body">
      <p class="dc-date">${esc(day.date || `Day ${day.n}`)}</p>
      ${day.title ? `<h3 class="dc-title">${esc(day.title)}</h3>` : `<h3 class="dc-title pending">第${day.n}天 Day ${day.n}</h3>`}
      ${day.city ? `<span class="city-tag">${esc(day.city)}</span>` : ''}
      <p class="dc-count" data-count-folder="${esc(day.folder)}"></p></div></a>`;
  }).join('');
  return `${hero}<div class="wrap overview">${schedule}
    <div class="days-head"><h2>每一天 <span class="display-it">Day by day</span></h2><p>Open a day to see its page.</p></div>
    <div class="day-grid">${cards}</div></div>`;
}

// ---------- schedule + day pages (side rail frame) ----------

function railHtml(trip, route) {
  const current = on => (on ? ' aria-current="page"' : '');
  let html = `<ul class="rail-list">
    <li><a href="#/${trip.id}"><span class="ico">${ICON.home}</span><span><span class="rt">Overview</span><span class="rd">${esc(trip.name)} ${esc(trip.en)}</span></span></a></li>
    <li><a href="#/${trip.id}/schedule"${current(route.view === 'schedule')}><span class="ico">${ICON.cal}</span><span><span class="rt">Schedule</span><span class="rd">Itinerary &amp; tickets</span></span></a></li>`;
  let lastCity = null;
  trip.days.forEach(day => {
    if (trip.cities.length && day.city !== lastCity) {
      lastCity = day.city;
      html += `<li class="rail-group" role="presentation">${esc(day.city)}</li>`;
    } else if (!trip.cities.length && day.n === 1) {
      html += '<li class="rail-group" role="presentation">Days</li>';
    }
    html += `<li><a href="#/${trip.id}/day/${day.n}"${current(route.view === 'day' && route.n === day.n)}><span class="rn" aria-hidden="true">${pad(day.n)}</span>
      <span><span class="rt">${esc(dayTitle(day))}</span>${day.date ? `<span class="rd">${esc(day.date)}</span>` : ''}</span></a></li>`;
  });
  return `${html}</ul>`;
}

// Order of pages inside a trip: overview → schedule → day 1 … N
function neighbours(trip, route) {
  const pages = [
    { href: `#/${trip.id}`, label: 'Overview', title: `${trip.name} ${trip.en}` },
    { href: `#/${trip.id}/schedule`, label: 'Schedule', title: 'Itinerary & tickets' },
    ...trip.days.map(day => ({ href: `#/${trip.id}/day/${day.n}`, label: `Day ${day.n}${day.date ? ` · ${day.date}` : ''}`, title: dayTitle(day) })),
  ];
  const k = route.view === 'schedule' ? 1 : route.n + 1;
  return { prev: pages[k - 1], next: pages[k + 1] };
}

function pager(trip, route) {
  const { prev, next } = neighbours(trip, route);
  return `<nav class="pager" aria-label="Previous and next">
    ${prev ? `<a class="prev" href="${prev.href}"><span class="nl-arrow">${ICON.arrowL}</span><span><span class="nl-label">Previous</span><span class="nl-title">${esc(prev.title)}</span></span></a>` : ''}
    ${next ? `<a class="next" href="${next.href}"><span class="nl-arrow">${ICON.arrowR}</span><span><span class="nl-label">Next · ${esc(next.label)}</span><span class="nl-title">${esc(next.title)}</span></span></a>` : ''}
    </nav><a class="back-link" href="#/${trip.id}">${arrow(ICON.arrowL, 16)} Back to ${esc(trip.name)} overview</a>`;
}

function bottomBar(trip, route) {
  const { prev, next } = neighbours(trip, route);
  const middle = route.view === 'day' ? `${route.n} / ${trip.days.length}` : 'Schedule';
  return `<nav class="bottom-bar" aria-label="Previous and next">
    ${prev ? `<a class="prev" href="${prev.href}">${ICON.arrowL}<span class="bb-txt">${esc(prev.label)}</span></a>` : '<span class="dis"></span>'}
    <span class="bb-mid">${esc(middle)}</span>
    ${next ? `<a class="next" href="${next.href}">${ICON.arrowR}<span class="bb-txt">${esc(next.label)}</span></a>` : '<span class="dis"></span>'}</nav>`;
}

function daySelect(trip, route) {
  const day = route.view === 'day' ? trip.days[route.n - 1] : null;
  const title = day ? `Day ${day.n} of ${trip.days.length}` : 'Schedule';
  const sub = day ? [day.date, day.city, day.title].filter(Boolean).join(' · ') : `${trip.name} ${trip.en}`;
  return `<button class="day-select" type="button" data-sheet-open aria-haspopup="dialog" aria-controls="sheet"><span><span class="ds-main">${esc(title)}</span><span class="ds-sub">${esc(sub)}</span></span><span class="ds-caret">${ICON.caret}</span></button>`;
}

function paneSchedule(trip) {
  const links = trip.links.length
    ? `<div class="section-kicker"><span class="no">§</span><h2 style="font-size:1.15rem">Bookings</h2></div><ul class="link-list">${trip.links.map(link => `<li><a href="${esc(link.href)}" target="_blank" rel="noopener">${esc(link.label)} ↗</a></li>`).join('')}</ul>`
    : '';
  return `<header class="pane-head plain"><p class="eyebrow">Schedule</p><h1 id="page-h" tabindex="-1">行程 <span class="display-it">Itinerary &amp; tickets</span></h1>
    ${trip.route ? `<p class="pane-sub">${esc(trip.route)}</p>` : ''}</header>
    <div data-schedule-folder="${esc(trip.folder)}/Schedule"><p class="muted">Loading…</p></div>${links}${pager(trip, { view: 'schedule' })}`;
}

function paneDay(trip, n) {
  const day = trip.days[n - 1];
  const inline = day.timeline.filter(item => (item.photos || []).length > 1).flatMap(item => item.photos);
  const singles = day.timeline.filter(item => (item.photos || []).length === 1).map(item => item.photos[0]);
  return `<header class="pane-head"><span class="day-num" aria-hidden="true">${pad(n)}</span>
    <p class="day-label">Day ${n} of ${trip.days.length}${day.date ? ` · ${esc(day.date)}` : ''}${day.city ? `<span class="city-tag">${esc(day.city)}</span>` : ''}</p>
    <h1 id="page-h" tabindex="-1">${esc(dayTitle(day))}</h1></header>
    ${day.timeline.length ? renderTimeline(day) : ''}
    <div data-gallery-folder="${esc(day.folder)}" data-gallery-label="${esc(`${trip.en} Day ${n} photo`)}"
      data-gallery-exclude="${esc(JSON.stringify(inline.map(photo => photo.src)))}" data-gallery-first="${esc(JSON.stringify(singles))}"
      ${day.timeline.length ? ' data-gallery-extra' : ''}></div>
    ${pager(trip, { view: 'day', n })}`;
}

function pageTripFrame(trip, route) {
  const bg = coverBackground(trip);
  const band = `<section class="trip-band on-dark${bg.cls}"${bg.attr}>${bg.html}<div class="wrap band-inner">
    <div><p class="eyebrow">Trip No. ${pad(trip.no)}${trip.dates ? ` · ${esc(trip.dates)}` : ''} · ${esc(trip.length)}</p><p class="band-title">${esc(trip.name)}<span class="latin">${esc(trip.en)}</span></p></div>
    <a class="band-crumb" href="#/${trip.id}">${arrow(ICON.arrowL, 16)}&nbsp; Back to overview</a></div></section>`;
  const pane = route.view === 'day' ? paneDay(trip, route.n) : paneSchedule(trip);
  document.getElementById('sheet-rail').innerHTML = railHtml(trip, route);
  return `${band}<div class="wrap trip-layout"><nav class="rail" aria-label="Trip pages">${railHtml(trip, route)}</nav>
    <div>${daySelect(trip, route)}<section class="pane">${pane}</section></div></div>${bottomBar(trip, route)}`;
}

// ---------- filling in photos from the repo ----------

function setCover(el, src) {
  if (el.dataset.coverKind === 'card') {
    el.outerHTML = `<div class="trip-cover-wrap"><img src="${esc(src)}" alt="" loading="lazy"></div>`;
    return;
  }
  el.classList.remove('gradient', 'soon');
  el.querySelectorAll('.waves, .ghost, .big').forEach(node => node.remove());
  el.insertAdjacentHTML('afterbegin', el.dataset.coverKind === 'day' ? framedPhoto(src, '') : `<img src="${esc(src)}" alt="" loading="lazy">`);
}

function fillPhotos(root) {
  root.querySelectorAll('[data-cover-folder]').forEach(el => {
    listPhotos(el.dataset.coverFolder)
      .then(photos => { if (photos.length) setCover(el, photos[0].src); })
      .catch(() => {});
  });

  root.querySelectorAll('[data-count-folder]').forEach(el => {
    listPhotos(el.dataset.countFolder)
      .then(photos => { el.textContent = photos.length ? `${photos.length} photo${photos.length === 1 ? '' : 's'}` : 'Photos coming soon'; })
      .catch(() => {});
  });

  // Day page grid: the itinerary's single photos first, then every other photo in the day's folder.
  // Japan days (no itinerary) simply show the whole folder.
  root.querySelectorAll('[data-gallery-folder]').forEach(el => {
    const folder = el.dataset.galleryFolder;
    const first = JSON.parse(el.dataset.galleryFirst || '[]');
    const shown = new Set([...JSON.parse(el.dataset.galleryExclude || '[]'), ...first.map(photo => photo.src)]);
    const extra = el.hasAttribute('data-gallery-extra');
    const show = photos => {
      if (photos.length) {
        el.innerHTML = (extra ? '<p class="state-label">Photos</p>' : '') + photoGrid(photos, el.dataset.galleryLabel);
      } else if (!extra) {
        el.innerHTML = emptyState('Photos coming soon <span class="display-it">· 照片即將上傳</span>', 'Push photos into this day’s folder and they appear here.', `${folder}/`);
      }
    };
    listPhotos(folder)
      .then(photos => show([...first, ...photos.filter(photo => !shown.has(decodeURIComponent(photo.src)))]))
      .catch(() => {
        if (first.length) show(first);
        else if (!extra) el.innerHTML = emptyState('Could not load photos', 'Try again in a moment.');
      });
  });

  // Schedule: images inline, PDFs as cards.
  root.querySelectorAll('[data-schedule-folder]').forEach(el => {
    const folder = el.dataset.scheduleFolder;
    Promise.all([listPhotos(folder), listFiles(folder, DOCUMENT_EXTENSIONS)])
      .then(([images, documents]) => {
        if (!images.length && !documents.length) {
          el.innerHTML = emptyState('Schedule coming soon <span class="display-it">· 行程整理中</span>', 'Drop itinerary screenshots or PDFs into the Schedule folder and they appear here.', `${folder}/`);
          return;
        }
        el.innerHTML = `<div class="sched-grid">${images.map(image => `<figure class="sched-img"><div class="sched-bar"><b>${esc(image.caption || '行程 Schedule')}</b><span>image</span></div>
          <div class="sched-stage"><img class="sched-shot" src="${esc(image.src)}" alt="${esc(image.caption || 'Schedule')}" loading="lazy" tabindex="0" role="button"></div></figure>`).join('')}
          ${documents.map(doc => `<a class="pdf-card" href="${esc(doc.src)}" target="_blank" rel="noopener"><span class="pdf-icon" aria-hidden="true">PDF</span>
          <span><span class="pdf-name">${esc(doc.caption || doc.name)}</span><span class="pdf-meta">PDF · opens in a new tab</span></span><span class="pdf-go">Open ↗</span></a>`).join('')}</div>`;
      })
      .catch(() => { el.innerHTML = emptyState('Could not load the schedule', 'Try again in a moment.'); });
  });
}

// ---------- router ----------

function parseRoute() {
  const [id, page, num] = location.hash.replace(/^#\/?/, '').split('/');
  const trip = findTrip(id);
  if (!trip) return { view: 'home' };
  if (page === 'schedule') return { view: 'schedule', trip };
  const n = Number(num);
  if (page === 'day' && n >= 1 && n <= trip.days.length) return { view: 'day', trip, n };
  return { view: 'overview', trip };
}

function render() {
  const route = parseRoute();
  const { trip } = route;
  const sheet = document.getElementById('sheet');
  if (sheet.open) sheet.close();
  stopCarousel();

  if (route.view === 'home') {
    main.innerHTML = pageHome();
    document.title = 'Trip with Joanna';
    startCarousel();
  } else if (route.view === 'overview') {
    main.innerHTML = pageOverview(trip);
    document.title = `${trip.name} ${trip.en} — Trip with Joanna`;
  } else {
    main.innerHTML = pageTripFrame(trip, route);
    const day = route.view === 'day' ? trip.days[route.n - 1] : null;
    const page = day ? `Day ${day.n}${day.title ? ` · ${day.title}` : ''}` : 'Schedule';
    document.title = `${page} — ${trip.name} ${trip.en} — Trip with Joanna`;
  }

  document.querySelectorAll('#site-nav a').forEach(link => {
    if (link.dataset.nav === (trip ? trip.id : 'home')) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  fillPhotos(main);
  window.scrollTo(0, 0);
  const heading = document.getElementById('page-h');
  if (heading) heading.focus({ preventScroll: true });
}

// ---------- phone day list ----------

document.addEventListener('click', event => {
  const sheet = document.getElementById('sheet');
  if (event.target.closest('[data-sheet-open]')) {
    sheet.showModal();
    const current = sheet.querySelector('[aria-current="page"]');
    if (current) current.focus();
  } else if (event.target.closest('[data-sheet-close]') || event.target === sheet) {
    sheet.close();
  }
});

// ---------- lightbox: click any photo to see it whole ----------

function setUpLightbox() {
  const lightbox = document.querySelector('dialog.lightbox');
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lb-caption');
  const count = lightbox.querySelector('.lb-count');
  let photos = [];
  let index = 0;

  const show = n => {
    index = (n + photos.length) % photos.length;
    const photo = photos[index];
    const figcaption = photo.closest('figure') && photo.closest('figure').querySelector('figcaption');
    image.src = photo.src;
    image.alt = photo.alt;
    caption.textContent = figcaption ? figcaption.textContent : '';
    count.textContent = `${index + 1} / ${photos.length}`;
  };
  const open = img => {
    photos = [...main.querySelectorAll('figure img:not(.ph-bg), .sched-shot')];
    show(photos.indexOf(img));
    lightbox.showModal();
  };

  main.addEventListener('click', event => {
    const img = event.target.closest('figure img:not(.ph-bg), .sched-shot');
    if (img) open(img);
  });
  main.addEventListener('keydown', event => {
    const img = event.target.closest('figure img:not(.ph-bg), .sched-shot');
    if (img && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      open(img);
    }
  });
  lightbox.addEventListener('click', event => {
    const button = event.target.closest('[data-lb]');
    if (button) {
      if (button.dataset.lb === 'close') lightbox.close();
      else show(index + (button.dataset.lb === 'next' ? 1 : -1));
    } else if (event.target === lightbox || event.target.classList.contains('lb-stage')) {
      lightbox.close();
    }
  });
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') show(index + 1);
    if (event.key === 'ArrowLeft') show(index - 1);
  });
}

window.addEventListener('hashchange', render);
setUpLightbox();
render();
