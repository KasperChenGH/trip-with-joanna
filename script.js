// Views are switched with the URL hash: #/, #/australia/melbourne, #/australia/sydney, #/okinawa, #/nagoya
const VIEWS = ['home', 'australia', 'okinawa', 'nagoya'];

// Photo galleries list every image in their folder on GitHub,
// so new photos show up after they are pushed — no HTML edits needed.
const GITHUB_REPO = 'KasperChenGH/trip-with-joanna';
const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif)$/i;
const photoRequests = {};

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
  buildDayChips(document.getElementById(`city-${city}`));
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

function listPhotos(folder) {
  if (!photoRequests[folder]) {
    photoRequests[folder] = fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${folder}`)
      .then(response => {
        if (response.status === 404) return [];
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(files => files
        .filter(file => file.type === 'file' && IMAGE_EXTENSIONS.test(file.name))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
        .map(file => ({
          src: `${folder}/${encodeURIComponent(file.name)}`,
          // "03 Shurijo Castle.jpg" -> "Shurijo Castle"
          caption: file.name.replace(/\.[^.]+$/, '').replace(/^\d+[\s_.-]*/, ''),
        })))
      .catch(error => {
        delete photoRequests[folder];
        throw error;
      });
  }
  return photoRequests[folder];
}

function loadGallery(gallery) {
  if (gallery.dataset.loaded) return;
  gallery.dataset.loaded = 'true';

  listPhotos(gallery.dataset.folder)
    .then(photos => {
      if (photos.length === 0) {
        gallery.innerHTML = '<p class="gallery-empty">Photos coming soon 📷</p>';
        return;
      }
      photos.forEach(photo => {
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
        gallery.append(figure);
      });
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
