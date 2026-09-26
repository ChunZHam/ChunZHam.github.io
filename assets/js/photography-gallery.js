(function () {
  const files = [
    'IMG_0105.jpg', 'IMG_3103.jpg', 'IMG_3104.jpg', 'IMG_3117.jpg',
    'IMG_3118.jpg', 'IMG_3124.jpg', 'IMG_3126.jpg', 'IMG_3147.jpg',
    'IMG_3154.jpg', 'IMG_3160.jpg', 'IMG_3162.jpg', 'IMG_3167.jpg'
  ];
  const gallery = document.getElementById('photography-gallery');
  const track = document.getElementById('photography-track');
  const loading = document.getElementById('photography-loading');
  const progress = document.getElementById('photography-progress');
  const count = document.getElementById('photography-count');
  const close = document.getElementById('photography-close');
  let opener = null;
  let prepared = false;

  function showGallery() {
    gallery.classList.add('is-open');
    gallery.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-open');
    close.focus();
    if (prepared) return;
    let loaded = 0;
    Promise.all(files.map((file, index) => new Promise((resolve) => {
      const img = new Image();
      img.onload = img.onerror = function () {
        loaded += 1;
        progress.textContent = `Loading photographs ${loaded} / ${files.length}`;
        resolve(img.naturalWidth ? { img, index } : null);
      };
      img.src = '/assets/photography/' + file;
    }))).then((results) => {
      const valid = results.filter(Boolean);
      valid.forEach(({ img, index }) => {
        const slide = document.createElement('figure');
        slide.className = 'photography-slide';
        img.alt = `Fushun documentary photograph ${index + 1}`;
        slide.appendChild(img);
        const caption = document.createElement('figcaption');
        caption.textContent = `${index + 1} / ${files.length}`;
        slide.appendChild(caption);
        track.appendChild(slide);
      });
      count.textContent = `${valid.length} photographs`;
      loading.hidden = true;
      track.classList.add('is-ready');
      prepared = true;
    });
  }

  function hideGallery() {
    gallery.classList.remove('is-open');
    gallery.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-open');
    if (opener) opener.focus();
  }

  document.querySelectorAll('.photography-open').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      opener = link;
      showGallery();
    });
  });
  close.addEventListener('click', hideGallery);
  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hideGallery();
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      track.scrollBy({ left: (event.key === 'ArrowRight' ? 1 : -1) * track.clientWidth, behavior: 'smooth' });
    }
  });
})();
