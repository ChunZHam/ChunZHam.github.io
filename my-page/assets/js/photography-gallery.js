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
  const previous = document.getElementById('photography-previous');
  const next = document.getElementById('photography-next');
  const visited = new Map();
  let opener = null;
  let current = 0;

  function showPhoto(index) {
    current = (index + files.length) % files.length;
    count.textContent = (current + 1) + ' / ' + files.length;
    loading.hidden = false;
    progress.textContent = 'Loading photograph…';
    track.replaceChildren();
    let item = visited.get(current);
    if (!item) {
      const img = new Image();
      img.alt = 'Fushun documentary photograph ' + (current + 1);
      img.decoding = 'async';
      item = { img, state: 'loading' };
      visited.set(current, item);
      img.onload = function () {
        item.state = 'ready';
        if (visited.get(current) === item) loading.hidden = true;
      };
      img.onerror = function () {
        item.state = 'error';
        if (visited.get(current) === item) {
          loading.hidden = false;
          progress.textContent = 'Unable to load this photo. Click to continue.';
        }
      };
      // Only the photograph being previewed receives a source. No preloading.
      img.src = 'assets/photography/' + files[current];
    }
    track.appendChild(item.img);
    loading.hidden = item.state === 'ready';
    if (item.state === 'error') {
      progress.textContent = 'Unable to load this photo. Click to continue.';
    }
  }

  function showGallery() {
    gallery.classList.add('is-open');
    gallery.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-open');
    close.focus();
    showPhoto(current);
  }

  function hideGallery() {
    gallery.classList.remove('is-open');
    gallery.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-open');
    if (window.location.hash === '#photography-gallery') {
      history.replaceState(null, '', window.location.pathname + window.location.search + '#experience');
    }
    if (opener) opener.focus();
  }

  document.querySelectorAll('.photography-open').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      opener = link;
      history.replaceState(null, '', '#photography-gallery');
      showGallery();
    });
  });
  track.addEventListener('click', () => showPhoto(current + 1));
  previous.addEventListener('click', () => showPhoto(current - 1));
  next.addEventListener('click', () => showPhoto(current + 1));
  close.addEventListener('click', hideGallery);
  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hideGallery();
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === close) {
        event.preventDefault();
        next.focus();
      } else if (!event.shiftKey && document.activeElement === next) {
        event.preventDefault();
        close.focus();
      }
    }
  });
  function openFromAddress() {
    if (window.location.hash === '#photography-gallery') {
      opener = document.querySelector('.photography-open');
      showGallery();
    } else if (gallery.classList.contains('is-open')) {
      hideGallery();
    }
  }
  window.addEventListener('hashchange', openFromAddress);
  openFromAddress();
})();
