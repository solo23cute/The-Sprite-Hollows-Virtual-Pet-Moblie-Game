/* Egg gift picker: search every sprite and choose the egg you want as a gift. */

function eggGiftTypeLabel(key) {
  const el = ELEMENTS[key] || {};
  if (el.biomeType) return `${PDX_TYPES[el.biomeType]?.name || el.biomeType} type · biome guardian`;
  if (typeof POKEDEX_META !== 'undefined' && POKEDEX_META[key]) return `${POKEDEX_META[key].types.map((t) => PDX_TYPES[t]?.name || t).join(' / ')} type`;
  if (el.secret) return 'Secret Vault keeper';
  if (el.exotic) return 'Exotic signature';
  if (el.meme) return 'Meme legend';
  return el.trait ? el.trait.split('—')[0].trim() : 'Hollow species';
}

function openEggGiftPicker(onPick, opts = {}) {
  const pool = dailyEggPool();
  const visible = pool.slice();
  const limit = 60;
  const row = (key) => {
    const el = ELEMENTS[key] || ELEMENTS.bloom;
    const type = eggGiftTypeLabel(key);
    return `<button class="egg-picker-row" data-egg-pick="${key}">
      <span class="ep-dot" style="background:${el.primary}"></span>
      <span style="flex:1;min-width:0"><b>${esc(el.name)}</b><br><span>${esc(type || el.trait.split('—')[0].trim())}</span></span>
      <span class="tiny muted">${TYPE_EGG_PRICE[key] ? `${TYPE_EGG_PRICE[key]}🪙 value` : ''}</span>
    </button>`;
  };
  const listHTML = (rows) => rows.slice(0, limit).map(row).join('') || '<p class="tiny muted">No sprite matches that search.</p>';
  const { close } = openSheet({
    title: '🥚 Choose any sprite egg',
    sub: opts.sub || 'Search all species. Your gift egg arrives warm and ready to hatch in the Nest.',
    body: `<input id="egg-gift-search" class="egg-picker-search" placeholder="Search name, meme, type, or habitat" aria-label="Search sprites">
      <div class="row" style="gap:5px;flex-wrap:wrap;margin:8px 0"><span class="chip">${pool.length.toLocaleString()} species</span><span class="chip" data-egg-gift-count>${Math.min(limit, pool.length)} shown</span></div>
      <div class="egg-picker-list" data-egg-picker-list>${listHTML(visible)}</div>`,
    onMount: (sheet, closeSheet) => {
      const search = sheet.querySelector('#egg-gift-search');
      const list = sheet.querySelector('[data-egg-picker-list]');
      const count = sheet.querySelector('[data-egg-gift-count]');
      const paint = () => {
        const q = String(search.value || '').trim().toLowerCase();
        const rows = !q ? visible : pool.filter((key) => {
          const el = ELEMENTS[key] || {};
          return `${el.name} ${el.trait} ${el.blurb}`.toLowerCase().includes(q)
            || eggGiftTypeLabel(key).toLowerCase().includes(q);
        });
        list.innerHTML = listHTML(rows);
        if (count) count.textContent = `${Math.min(limit, rows.length).toLocaleString()} shown`;
        list.querySelectorAll('[data-egg-pick]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const key = btn.dataset.eggPick;
            closeSheet();
            if (typeof onPick === 'function') onPick(key);
          });
        });
      };
      search.addEventListener('input', paint);
      paint();
    },
  });
  return { close };
}

function openDailyEggGift() {
  openEggGiftPicker((key) => {
    const res = Actions.claimDailyEgg(key);
    if (!res.ok) {
      toast(res.reason === 'claimed' ? 'Today’s gift egg is already claimed. Come back tomorrow.' : 'The gift egg could not be delivered.', '🥚');
      App.refresh();
      return;
    }
    Sfx.hatch();
    toast(`Gift egg: ${ELEMENTS[res.element].name} · warm and waiting in the Nest.`, '🥚');
    App.refresh();
  });
}
