function showDay(dayId) {
  // Hide main image
  const mainImage = document.querySelector('.picture');
  if (mainImage) {
    mainImage.style.display = 'none';
  }

  // Hide all day-content sections
  const sections = document.querySelectorAll('.day-content');
  sections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
  });

  // Show selected section
  const selected = document.getElementById(dayId);
  if (selected) {
    selected.classList.add('active');
    selected.style.display = 'block';
  }

  // Handle sidebars
  const sidebarMelbourne = document.getElementById('sidebar-melbourne');
  const sidebarSydney = document.getElementById('sidebar-sydney');

  if (sidebarMelbourne) {
    sidebarMelbourne.style.display = dayId === 'Melbourne' ? 'block' : 'none';
    sidebarMelbourne.classList.remove('show'); // Ensure hidden initially
  }

  if (sidebarSydney) {
    sidebarSydney.style.display = dayId === 'Sydney' ? 'block' : 'none';
    sidebarSydney.classList.remove('show'); // Ensure hidden initially
  }

  // Show sidebar toggle button on mobile (only for trips that have a sidebar)
  const toggleButton = document.getElementById('sidebar-toggle');
  const hasSidebar = dayId === 'Melbourne' || dayId === 'Sydney';
  if (toggleButton) {
    toggleButton.style.display = hasSidebar && window.innerWidth <= 768 ? 'block' : 'none';
  }

  // Load photo galleries in this section
  if (selected) {
    selected.querySelectorAll('.gallery').forEach(loadGallery);
  }
}

// Photo galleries: lists every image in the gallery's folder on GitHub,
// so new photos show up after they are pushed — no HTML edits needed.
const GITHUB_REPO = 'KasperChenGH/trip-with-joanna';
const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif)$/i;

function loadGallery(gallery) {
  if (gallery.dataset.loaded) return;
  gallery.dataset.loaded = 'true';

  const folder = gallery.dataset.folder;
  fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${folder}`)
    .then(response => response.ok ? response.json() : [])
    .then(files => {
      const photos = files
        .filter(file => file.type === 'file' && IMAGE_EXTENSIONS.test(file.name))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

      if (photos.length === 0) {
        gallery.innerHTML = '<p style="text-align: center; font-style: italic;">Photos coming soon 📷</p>';
        return;
      }

      photos.forEach(photo => {
        const caption = document.createElement('p');
        caption.style.textAlign = 'center';
        caption.style.fontStyle = 'italic';
        caption.textContent = photo.name.replace(/\.[^.]+$/, '');

        const img = document.createElement('img');
        img.className = 'image';
        img.loading = 'lazy';
        img.src = `${folder}/${encodeURIComponent(photo.name)}`;
        img.alt = caption.textContent;

        gallery.append(caption, img);
      });
    })
    .catch(() => {
      gallery.dataset.loaded = '';
      gallery.innerHTML = '<p style="text-align: center; font-style: italic;">Could not load photos right now.</p>';
    });
}

function goHome() {
  // Show main image
  const mainImage = document.querySelector('.picture');
  if (mainImage) {
    mainImage.style.display = 'block';
  }

  // Hide all day content
  const sections = document.querySelectorAll('.day-content');
  sections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
  });

  // Hide both sidebars
  const sidebarMelbourne = document.getElementById('sidebar-melbourne');
  const sidebarSydney = document.getElementById('sidebar-sydney');
  if (sidebarMelbourne) {
    sidebarMelbourne.style.display = 'none';
    sidebarMelbourne.classList.remove('show');
  }
  if (sidebarSydney) {
    sidebarSydney.style.display = 'none';
    sidebarSydney.classList.remove('show');
  }

  // Hide toggle button
  const toggleButton = document.getElementById('sidebar-toggle');
  if (toggleButton) toggleButton.style.display = 'none';
}

function toggleSidebar() {
  const sidebarMelbourne = document.getElementById('sidebar-melbourne');
  const sidebarSydney = document.getElementById('sidebar-sydney');

  [sidebarMelbourne, sidebarSydney].forEach(sidebar => {
    if (sidebar && sidebar.style.display === 'block') {
      sidebar.classList.toggle('show');
    } else if (sidebar) {
      sidebar.classList.remove('show');
    }
  });
}

// Set initial state when page loads
window.onload = () => {
  goHome();
};
