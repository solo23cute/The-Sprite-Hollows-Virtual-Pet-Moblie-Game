/* Gender Codex: what each gender is, who in your Hollow has it, and exactly
   how gender (and doesn't) steer breeding. */

function genderCounts() {
  const counts = { female: 0, male: 0, neutral: 0 };
  state.sprites.forEach((s) => {
    if (counts[s.gender] !== undefined) counts[s.gender] += 1;
  });
  return counts;
}

function genderShare(key) {
  return key === 'neutral' ? 8 : 46;
}

function genderSampleSprite(key) {
  return {
    id: `gender-sample-${key}`, element: 'bloom', breed: 'puff', stage: 'sprite',
    palette: 'native', pattern: 'plain', accessory: 'none',
    name: GENDERS[key]?.name || 'Sprite', level: 3, size: 'standard',
  };
}

function genderCardHTML(key, total) {
  const g = GENDERS[key];
  const owned = state.sprites.filter((s) => s.gender === key);
  const grown = owned.filter((s) => s.stage !== 'egg');
  const eggs = owned.length - grown.length;
  const share = total ? Math.round((owned.length / total) * 100) : 0;
  const list = grown.slice(0, 6).map((s) => `<button class="gender-owned" type="button" data-gender-sprite="${s.id}" title="Open ${esc(displayName(s))}">
      <span>${esc(displayName(s))}</span><i>Lv ${s.level}</i>
    </button>`).join('');
  return `<article class="gender-card" style="--g:${g.color}">
    <div class="gender-card-art">
      ${spriteSVG(genderSampleSprite(key), { expr: 'happy' })}
      <span class="gender-symbol">${g.symbol}</span>
    </div>
    <div class="gender-card-copy">
      <div class="between"><b>${g.symbol} ${esc(g.name)}</b><span class="chip">${owned.length} of ${total}</span></div>
      <p class="tiny muted" style="margin:3px 0 0;line-height:1.5">${esc(g.blurb)}</p>
      <div class="gender-bar"><i style="width:${share}%"></i></div>
      <div class="tiny muted">Hatch share about ${genderShare(key)}%${eggs ? ` · ${eggs} still in an egg` : ''}${grown.length ? ` · ${grown.length} grown` : ''}</div>
      ${list ? `<div class="gender-owned-list">${list}</div>` : '<p class="tiny muted" style="margin:5px 0 0">Nobody here yet.</p>'}
    </div>
  </article>`;
}

function openGenderCodex() {
  const counts = genderCounts();
  const total = state.sprites.length;
  const grown = state.sprites.filter((s) => s.stage !== 'egg');
  const eggs = state.sprites.filter((s) => s.stage === 'egg');
  const ownedTypes = new Set(grown.map((s) => s.element));
  const readyPairs = typeof BREEDING_PAIRS !== 'undefined'
    ? BREEDING_PAIRS.filter((p) => ownedTypes.has(p.a) && ownedTypes.has(p.b))
    : [];
  const readyList = readyPairs.slice(0, 8).map((p) => `<span class="chip" style="font-size:9.5px">${esc(ELEMENTS[p.a]?.name || p.a)} + ${esc(ELEMENTS[p.b]?.name || p.b)}</span>`).join('');
  const eggsWithGender = eggs.filter((e) => GENDERS[e.gender]);
  const { close } = openSheet({
    title: '⚥ Gender Codex',
    sub: `${total} sprite${total === 1 ? '' : 's'} · ${counts.female} ♀ · ${counts.male} ♂ · ${counts.neutral} ⚲ — and how gender fits into breeding.`,
    body: `<div class="gender-intro">
        ${GENDER_KEYS.map((key) => `<span class="chip" style="color:${GENDERS[key].color};border-color:currentColor">${GENDERS[key].symbol} ${GENDERS[key].name} ${counts[key]}</span>`).join('')}
      </div>
      <div class="gender-list">${GENDER_KEYS.map((key) => genderCardHTML(key, total)).join('')}</div>
      <div class="section-title" style="margin-top:14px"><h2>Breeding with genders</h2><span>${readyPairs.length} hybrid pair${readyPairs.length === 1 ? '' : 's'} ready</span></div>
      <div class="card gender-rules" style="padding:12px">
        <ul class="wiki-list" style="margin:0">
          <li><b>Gender never blocks a merge.</b> Any two level-3+ sprites that are rested can breed, in any combination — ♀ + ♂, ♀ + ♀, ♂ + ♂, and anything with ⚲.</li>
          <li><b>The child's gender is a fresh roll:</b> about ${genderShare('female')}% ♀ female, ${genderShare('male')}% ♂ male, ${genderShare('neutral')}% ⚲ neutral — the parents' genders do not weight it.</li>
          <li><b>Parents keep their own gender.</b> Merging, retiring and rebirth never re-roll an existing sprite; a sprite that goes back to an egg after a Rebirth Meal keeps the gender it was born with.</li>
          <li><b>Eggs already know.</b> Every egg carries its gender from the moment it is laid, so you can check the ♀ / ♂ / ⚲ symbol before hatching${eggsWithGender.length ? ` — ${eggsWithGender.length} egg${eggsWithGender.length === 1 ? '' : 's'} waiting right now` : ''}.</li>
          <li><b>Picking parents:</b> choose for element, breed, palette and bond rather than gender. The Nest lists every eligible sprite with its symbol so you can compare before merging.</li>
        </ul>
      </div>
      ${readyList
        ? `<div class="section-title" style="margin-top:12px"><h2>Pairs your Hollow can form now</h2><span>both elements grown</span></div>
           <div class="row" style="flex-wrap:wrap;gap:5px">${readyList}</div>
           ${readyPairs.length > 8 ? `<p class="tiny muted" style="margin:6px 2px 0">+${readyPairs.length - 8} more hybrid pairs with the types you own.</p>` : ''}`
        : '<p class="tiny muted" style="margin-top:10px;line-height:1.5">Grow two different element types and the hybrid pairs you can form will be listed here.</p>'}
      <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:12px">
        <button class="btn btn-primary btn-sm" data-gender-nest>Open the Nest</button>
        <button class="btn btn-soft btn-sm" data-gender-breeding>Breeding codex</button>
        <button class="btn btn-soft btn-sm" data-gender-homes>Sprite Homes</button>
      </div>
      <p class="tiny muted" style="margin:10px 2px 0;line-height:1.55">Gender is the sprite's own identity, not a breeding requirement. Every rule above is cosmetic for stats: it changes no XP, bond, need, or gift value.</p>`,
    onMount: (root) => {
      root.querySelectorAll('[data-gender-sprite]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.genderSprite;
          close();
          setTimeout(() => App.openDetail(id), 40);
        });
      });
      root.querySelector('[data-gender-nest]')?.addEventListener('click', () => {
        close();
        App.go('nest');
      });
      root.querySelector('[data-gender-breeding]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openBreedingCodex(), 40);
      });
      root.querySelector('[data-gender-homes]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openHomesSheet(), 40);
      });
    },
  });
  return { close };
}
