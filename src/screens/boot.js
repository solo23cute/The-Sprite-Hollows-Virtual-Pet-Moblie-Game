/* App boot loading screen: the first thing that plays when the app opens. */

const BOOT_LOAD_LINES = [
  'Waking the Hollow…',
  'Counting the eggs…',
  'Lighting the lanterns…',
  'Sorting the pantry…',
  'Calling the sprites…',
];

function showBootLoading(done) {
  const app = document.getElementById('app');
  if (!app || typeof document === 'undefined') {
    if (typeof done === 'function') done();
    return;
  }
  const reduce = document.body.classList.contains('reduce-motion');
  const duration = reduce ? 420 : 1500;
  const root = document.createElement('div');
  root.className = 'boot-screen';
  root.setAttribute('role', 'status');
  root.setAttribute('aria-live', 'polite');
  root.innerHTML = `<div class="boot-stars" aria-hidden="true">
      <span style="left:8%;top:14%">✦</span><span style="left:22%;top:38%;animation-delay:.4s">✧</span>
      <span style="left:74%;top:18%;animation-delay:.7s">✦</span><span style="left:88%;top:44%;animation-delay:1s">✧</span>
      <span style="left:36%;top:72%;animation-delay:.2s">✦</span><span style="left:66%;top:66%;animation-delay:.9s">✧</span>
    </div>
    <div class="boot-inner">
      <div class="boot-mark">${icon('sparkle')}</div>
      <h1 class="boot-title">Sprite <em>Hollow</em></h1>
      <p class="boot-tag">A tiny creature sanctuary</p>
      <div class="boot-bar"><i data-boot-fill></i></div>
      <div class="boot-line" data-boot-line>${esc(BOOT_LOAD_LINES[0])}</div>
      <div class="boot-version">v${typeof APP_VERSION !== 'undefined' ? APP_VERSION : '3'}</div>
    </div>`;
  app.innerHTML = '';
  app.appendChild(root);

  const fill = root.querySelector('[data-boot-fill]');
  const lineEl = root.querySelector('[data-boot-line]');
  const start = Date.now();
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    if (fill) fill.style.width = '100%';
    root.classList.add('boot-leaving');
    setTimeout(() => {
      root.remove();
      if (typeof done === 'function') done();
    }, reduce ? 80 : 320);
  };

  const step = () => {
    if (finished) return;
    const t = Math.min(1, (Date.now() - start) / duration);
    if (fill) fill.style.width = `${Math.round(t * 100)}%`;
    if (lineEl) {
      const index = Math.min(BOOT_LOAD_LINES.length - 1, Math.floor(t * BOOT_LOAD_LINES.length));
      lineEl.textContent = BOOT_LOAD_LINES[index];
    }
    if (t >= 1) return finish();
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  /* Hard safety net so the app can never be stuck behind the splash. */
  setTimeout(finish, duration + 900);
}
