/* First-run intro: pick a starter egg. */

const STARTERS = [
  { element: 'ember', breed: 'puff', tag: 'warm & cuddly' },
  { element: 'tide', breed: 'flit', tag: 'breezy & splashy' },
  { element: 'bloom', breed: 'sprig', tag: 'leafy & gentle' },
  { element: 'dusk', breed: 'wisp', tag: 'quietly magical' },
];

function introScreen(root, onStart) {
  root.innerHTML = `<div class="intro">
    <div class="eyebrow">A tiny creature sanctuary <span class="intro-version">v${APP_VERSION}</span></div>
    <div class="intro-art">
      <span class="ring r1"></span>
      <span class="ring r2"></span>
      <div class="hero-egg">${eggSVG({ id: 'intro-egg', element: 'dusk', palette: 'prism', pattern: 'star' }, { progress: 55, pattern: 'star' })}</div>
    </div>
    <h1>Sprite<br><em>Hollow</em></h1>
    <p class="tagline">Hatch a wild little friend. Feed them, talk to them,<br>fuse them into new breeds, and grow them up.</p>
    <div class="row" style="justify-content:center;gap:5px;flex-wrap:wrap;margin-top:12px">
      <span class="chip">🥚 Hatch</span><span class="chip">🍓 Care</span><span class="chip">🧬 Merge</span><span class="chip">💬 Talk</span><span class="chip">🎮 Play</span>
    </div>
    <div style="margin-top:auto;padding-top:18px">
      <div class="between" style="margin-bottom:8px"><span class="eyebrow">Pick your first egg</span><span class="tiny muted">4 to choose from</span></div>
      <div class="intro-picks">
        ${STARTERS.map((s, i) => {
          const preview = {
            id: `starter-${i}`,
            element: s.element,
            breed: s.breed,
            stage: 'baby',
            palette: 'native',
            pattern: i % 2 ? 'spots' : 'plain',
            accessory: 'none',
          };
          return `<button class="intro-pick" data-starter="${i}">
            ${spriteSVG(preview, { expr: 'happy' })}
            <b>${ELEMENTS[s.element].name} ${BREEDS[s.breed].name}</b>
            <span>${s.tag}</span>
          </button>`;
        }).join('')}
      </div>
      <button class="btn btn-soft btn-block" data-intro-restore style="margin-top:10px">💾 Restore a saved Hollow</button>
      <div class="intro-note">Works offline · auto-saves on this device · no account needed</div>
    </div>
  </div>`;

  root.querySelectorAll('[data-starter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const s = STARTERS[Number(btn.dataset.starter)];
      Sfx.init();
      Sfx.pop();
      tapHaptic(12);
      onStart(s.element, s.breed);
    });
  });

  /* Coming back from a reinstall: bring a Hollow in before picking a starter.
     Restoring reloads the page with state.started set, so the intro is skipped. */
  const restore = root.querySelector('[data-intro-restore]');
  if (restore) {
    restore.addEventListener('click', () => {
      if (typeof openSaveBackup !== 'function') return;
      Sfx.init();
      Sfx.pop();
      tapHaptic(12);
      openSaveBackup();
    });
  }
}
