// Views are switched with the URL hash: #/, #/australia/melbourne, #/australia/sydney, #/okinawa, #/nagoya
const VIEWS = ['home', 'australia', 'okinawa', 'nagoya'];

// Photo galleries list every image in their folder on GitHub,
// so new photos show up after they are pushed — no HTML edits needed.
const GITHUB_REPO = 'KasperChenGH/trip-with-joanna';
const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif)$/i;
const DOCUMENT_EXTENSIONS = /\.pdf$/i;
let repoFiles;

function route() {
  const [view, sub] = location.hash.replace(/^#\/?/, '').split('/');
  const current = VIEWS.includes(view) ? view : 'home';

  document.querySelectorAll('.view').forEach(section => {
    section.hidden = section.id !== current;
  });
  document.querySelectorAll('.site-nav a').forEach(link => {
    if (link.dataset.view === current) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  if (current === 'australia') {
    showCity(sub === 'sydney' ? 'sydney' : 'melbourne');
  }

  const section = document.getElementById(current);
  section.querySelectorAll('.trip-days').forEach(buildTripDays);
  section.querySelectorAll('.gallery').forEach(loadGallery);
  window.scrollTo(0, 0);
}

function showCity(city) {
  document.querySelectorAll('#australia .city').forEach(block => {
    block.hidden = block.dataset.city !== city;
  });
  document.querySelectorAll('.city-switch a').forEach(tab => {
    tab.setAttribute('aria-selected', tab.dataset.city === city);
  });
  const cityBlock = document.getElementById(`city-${city}`);
  buildDayChips(cityBlock);
  cityBlock.querySelectorAll('.day[data-folder]').forEach(loadMorePhotos);
}

// Photos dropped into a day's folder that the itinerary doesn't show yet
// appear under that day as "More photos".
function loadMorePhotos(day) {
  if (day.dataset.loaded) return;
  day.dataset.loaded = 'true';

  const shown = new Set([...day.querySelectorAll('img')].map(img => img.getAttribute('src')));
  listPhotos(day.dataset.folder)
    .then(photos => {
      const extra = photos.filter(photo => !shown.has(decodeURIComponent(photo.src)));
      if (extra.length === 0) return;
      const heading = document.createElement('p');
      heading.className = 'more-photos-label';
      heading.textContent = 'More photos';
      const row = document.createElement('div');
      row.className = 'photo-row';
      extra.forEach(photo => row.append(createFigure(photo)));
      day.append(heading, row);
    })
    .catch(() => {
      day.dataset.loaded = '';
    });
}

function createFigure(photo) {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = photo.src;
  img.alt = photo.caption;
  img.loading = 'lazy';
  figure.append(img);
  if (photo.caption) {
    const caption = document.createElement('figcaption');
    caption.textContent = photo.caption;
    figure.append(caption);
  }
  return figure;
}

// One chip per day; clicking scrolls to it, scrolling highlights it.
let dayObserver;

function buildDayChips(city) {
  const chips = document.querySelector('.day-chips');
  chips.innerHTML = '';
  if (dayObserver) dayObserver.disconnect();

  const days = city.querySelectorAll('.day');
  days.forEach(day => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.textContent = day.querySelector('.day-label').textContent.split(' · ')[0];
    chip.dataset.target = day.id;
    chip.addEventListener('click', () => day.scrollIntoView());
    chips.append(chip);
  });

  dayObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      chips.querySelectorAll('button').forEach(chip => {
        const active = chip.dataset.target === entry.target.id;
        chip.classList.toggle('active', active);
        if (active) chip.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  days.forEach(day => dayObserver.observe(day));
}

// One request for the whole repo's file list, shared by every gallery on the page.
function listRepoFiles() {
  if (!repoFiles) {
    repoFiles = fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/trees/main?recursive=1`)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => data.tree.filter(item => item.type === 'blob').map(item => item.path))
      .catch(error => {
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
    .map(name => ({
      src: `${folder}/${encodeURIComponent(name)}`,
      // "03 Shurijo Castle.jpg" -> "Shurijo Castle", "maritime-museum.jpg" -> "maritime museum"
      caption: name.replace(/\.[^.]+$/, '').replace(/^\d+[\s_.-]*/, '').replace(/[-_]+/g, ' '),
    })));
}

function listPhotos(folder) {
  return listFiles(folder, IMAGE_EXTENSIONS);
}

// Japan trips: a Schedule section, then one gallery per day folder (Day1, Day2, ...).
function buildTripDays(container) {
  if (container.dataset.built) return;
  container.dataset.built = 'true';

  const folder = container.dataset.folder;
  const sections = [{ id: 'Schedule', title: '🗓️ 行程 Schedule', schedule: true }];
  for (let day = 1; day <= Number(container.dataset.days); day++) {
    sections.push({ id: `Day${day}`, title: `Day ${day}` });
  }

  sections.forEach(({ id, title, schedule }) => {
    const section = document.createElement('section');
    section.className = 'trip-day';
    const heading = document.createElement('h2');
    heading.textContent = title;
    const gallery = document.createElement('div');
    gallery.className = 'gallery';
    gallery.dataset.folder = `${folder}/${id}`;
    if (schedule) gallery.dataset.schedule = 'true';
    section.append(heading, gallery);
    container.append(section);
  });
}

function loadGallery(gallery) {
  if (gallery.dataset.loaded) return;
  gallery.dataset.loaded = 'true';

  const isSchedule = gallery.dataset.schedule === 'true';
  Promise.all([
    listPhotos(gallery.dataset.folder),
    isSchedule ? listFiles(gallery.dataset.folder, DOCUMENT_EXTENSIONS) : [],
  ])
    .then(([photos, documents]) => {
      if (photos.length === 0 && documents.length === 0) {
        gallery.innerHTML = isSchedule
          ? '<p class="gallery-empty">Schedule coming soon 🗓️</p>'
          : '<p class="gallery-empty">Photos coming soon 📷</p>';
        return;
      }
      documents.forEach(doc => {
        const link = document.createElement('a');
        link.className = 'document-link';
        link.href = doc.src;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = `📄 ${doc.caption}`;
        gallery.append(link);
      });
      photos.forEach(photo => gallery.append(createFigure(photo)));
    })
    .catch(() => {
      gallery.dataset.loaded = '';
      gallery.innerHTML = '<p class="gallery-empty">Could not load photos right now — try again later.</p>';
    });
}

// Use the first photo in a trip's folder as its home-page cover.
function loadCovers() {
  document.querySelectorAll('[data-cover]').forEach(cover => {
    listPhotos(cover.dataset.cover)
      .then(photos => {
        if (photos.length === 0) return;
        cover.style.backgroundImage = `url("${photos[0].src}")`;
        cover.classList.add('has-photo');
      })
      .catch(() => {});
  });
}

// Click any photo to see it large.
function setUpLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox-caption');

  document.querySelector('main').addEventListener('click', event => {
    const img = event.target.closest('figure img');
    if (!img) return;
    image.src = img.src;
    image.alt = img.alt;
    caption.textContent = img.closest('figure').querySelector('figcaption')?.textContent || '';
    lightbox.showModal();
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
}

window.addEventListener('hashchange', route);
setUpLightbox();
loadCovers();
route();
