/* Loading screen: a short pixie-dust transition that plays while your sprite is
   loaded into the Hollow. */

const HOLLOW_LOAD_LINES = [
  'Sweeping the meadow…',
  'Warming the lanterns…',
  'Shaking out the pixie dust…',
  'Calling your sprite home…',
];

function showHollowLoading(opts = {}) {
  if (typeof buildOverlay !== 'function' || !document.getElementById('portal')) return null;
  if (document.body.classList.contains('reduce-motion')) return null;
  const s = opts.sprite || (typeof activeSprite === 'function' ? activeSprite() : null) || (typeof grownSprites === 'function' ? grownSprites()[0] : null);
  if (!s) return null;

  const name = displayName(s);
  const scene = SCENES[state.theme.scene] || SCENES.grove;
  const inner = `<div class="load-screen" role="status" aria-live="polite">
    <div class="load-art" style="--load-glow:${scene.accent || '#8b7bff'}">
      <span class="load-mote m1">✦</span><span class="load-mote m2">✧</span><span class="load-mote m3">✦</span>
      ${spriteSVG(s, { expr: 'happy' })}
    </div>
    <h2 class="load-title">Loading ${esc(name)}</h2>
    <div class="load-bar"><i data-load-fill></i></div>
    <div class="load-line" data-load-line>${esc(HOLLOW_LOAD_LINES[0])}</div>
    <div class="load-pct" data-load-pct>0%</div>
    <div class="load-tip">${scene.emoji || '🌿'} ${esc(scene.name || 'Your Hollow')} · ${esc(name)} is on the way</div>
  </div>`;

  const { overlay, close } = buildOverlay(inner, { center: true, dismissible: false });
  overlay.querySelector('.load-screen')?.addEventListener('click', () => finish());

  const fill = overlay.querySelector('[data-load-fill]');
  const lineEl = overlay.querySelector('[data-load-line]');
  const pctEl = overlay.querySelector('[data-load-pct]');
  const duration = opts.duration || 1250;
  const start = Date.now();
  let timer = null;
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    if (timer) clearTimeout(timer);
    if (fill) fill.style.width = '100%';
    if (pctEl) pctEl.textContent = '100%';
    if (lineEl) lineEl.textContent = 'Ready!';
    overlay.classList.add('is-leaving');
    setTimeout(close, 240);
  };

  const step = () => {
    if (done) return;
    const t = Math.min(1, (Date.now() - start) / duration);
    if (fill) fill.style.width = `${Math.round(t * 100)}%`;
    if (pctEl) pctEl.textContent = `${Math.round(t * 100)}%`;
    if (lineEl) lineEl.textContent = HOLLOW_LOAD_LINES[Math.min(HOLLOW_LOAD_LINES.length - 1, Math.floor(t * HOLLOW_LOAD_LINES.length))];
    if (t >= 1) return finish();
    timer = setTimeout(step, 40);
  };
  timer = setTimeout(step, 40);
  return close;
}
