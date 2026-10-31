/* The Nest: warm eggs, fuse sprites, and buy wild eggs. */

function nestScreen(root) {
  const picked = { a: null, b: null };
  let typeLimit = 60;

  root.innerHTML = `
    <div class="screen-head">
      <div><div class="eyebrow">Life finds a way</div><h1>The Nest</h1><p data-nest-sub>Eggs, merges, and new little legends.</p></div>
      <span class="chip">${icon('coin')} <span data-nest-coins>${state.coins}</span></span>
    </div>
    <button class="btn btn-soft btn-block" data-open-vault style="margin:8px 0 4px">🔐 Secret Vault · combinations, hybrids & possible children</button>
    <div id="nest-eggs"></div>
    <div class="section-title"><h2>Merge sprites</h2><span>play with genes & colors</span></div>
    <div id="nest-merge"></div>
    <div class="section-title"><h2>Wild eggs</h2><span>fresh bloodlines</span></div>
    <div id="nest-shop" class="list-gap"></div>
    <div class="section-title"><h2>Type eggs</h2><span data-type-count>${TYPE_EGG_SPECIES.length} type eggs · 60 shown</span></div>
    <div class="type-tools">
      <input class="type-search" type="search" data-type-search placeholder="Search types…" aria-label="Search type eggs" autocomplete="off">
      <div class="type-rarities">
        <button class="chip type-rarity on" data-rarity="all">All</button>
        ${Object.entries(TYPE_EGG_RARITIES).filter(([key]) => TYPE_EGG_SPECIES.some((k) => typeEggRarity(k) === key)).map(([key, r]) => `<button class="chip type-rarity" data-rarity="${key}"><span class="te-dot" style="background:${r.color}"></span>${r.name}</button>`).join('')}
      </div>
    </div>
    <div class="type-egg-scroll" id="nest-type-shop"></div>
    <button class="btn btn-soft btn-block" data-type-more hidden style="margin-top:8px"></button>
    <p class="tiny muted" data-type-empty hidden style="margin:2px 2px 0;text-align:center">No type matches that search.</p>
    <div class="card" style="padding:12px;margin-top:14px;font-size:11px;color:var(--muted);line-height:1.6">
      <b style="color:var(--text)">How merging works</b><br>
      Two level 3+ sprites can make an egg. The little one inherits an element (or a hybrid like Steam or Twilight), a breed, colors, a personality, and maybe a rare mutation. Higher generations cost more but inherit a small XP bonus. Parents rest for a minute after.
    </div>`;

  const typeFilter = { q: '', rarity: 'all' };
  const typeSearch = root.querySelector('[data-type-search]');
  root.querySelector('[data-open-vault]').addEventListener('click', () => openSecretVault());
  typeSearch.addEventListener('input', () => {
    typeFilter.q = typeSearch.value;
    typeLimit = 60;
    paintTypeShop();
  });
  root.querySelectorAll('[data-rarity]').forEach((btn) => {
    btn.addEventListener('click', () => {
      typeFilter.rarity = btn.dataset.rarity;
      root.querySelectorAll('[data-rarity]').forEach((b) => b.classList.toggle('on', b === btn));
      typeLimit = 60;
      paintTypeShop();
    });
  });

  function eggCard(e) {
    const ready = e.hatch >= 100;
    return `<button class="egg-card ${ready ? 'ready' : ''}" data-hatch="${e.id}">
      ${eggSVG(e, { progress: e.hatch })}
      <div class="ec-name">${esc(displayName(e))}</div>
      <div class="ec-sub">${ready ? 'Ready to hatch' : `Tap to warm · ${Math.round(e.hatch)}%`}</div>
      <div class="egg-progress"><i style="width:${e.hatch}%"></i></div>
    </button>`;
  }

  function slotHTML(key) {
    const s = picked[key] ? findSprite(picked[key]) : null;
    if (!s) {
      return `<button class="merge-slot" data-slot="${key}">
        <span style="font-size:26px;line-height:1">＋</span>
        <span>Pick a sprite</span>
      </button>`;
    }
    const resting = restLeft(s) > 0;
    return `<button class="merge-slot filled" data-slot="${key}">
      ${spriteSVG(s, { expr: resting ? 'sleep' : expressionFor(s) })}
      <b style="font-size:11px">${esc(displayName(s))}</b>
      <span class="tiny muted">Lv ${s.level} · Gen ${(s.gen || 0) + 1}${resting ? ' · resting' : ''}</span>
    </button>`;
  }

  function paint() {
    root.querySelector('[data-nest-coins]').textContent = state.coins;
    const eggBox = root.querySelector('#nest-eggs');
    const list = eggs();
    if (list.length) {
      eggBox.innerHTML = `<div class="section-title" style="margin-top:0"><h2>Waiting eggs</h2><span>${list.length} cozy</span></div>
        <div class="egg-row">${list.map(eggCard).join('')}</div>`;
      eggBox.querySelectorAll('[data-hatch]').forEach((b) => {
        b.addEventListener('click', () => App.openHatch(b.dataset.hatch));
      });
    } else {
      eggBox.innerHTML = `<div class="card empty-state" style="padding:20px 14px">
        <div style="font-size:30px">🪹</div>
        <p>No eggs right now. Merge two sprites or pick up a wild egg below.</p>
      </div>`;
    }

    const mergeEl = root.querySelector('#nest-merge');
    const a = picked.a ? findSprite(picked.a) : null;
    const b = picked.b ? findSprite(picked.b) : null;
    const cost = a && b ? mergeCost(a, b) : null;
    const canFuse = a && b;
    const lowLevel = (a && a.level < 3) || (b && b.level < 3);
    const odds = mergeOdds(a, b);
    mergeEl.innerHTML = `<div class="card" style="padding:13px">
      <div class="merge-slots">
        ${slotHTML('a')}
        <span class="merge-plus">＋</span>
        ${slotHTML('b')}
      </div>
      <div class="between" style="margin-top:11px">
        <div class="tiny muted">${canFuse ? (lowLevel ? 'Both need level 3+' : `Cost ${cost} coins · parents rest 60s`) : 'Merge to unlock hybrids, colors & mutations'}</div>
      </div>
      <div class="breeding-odds">
        <span class="chip">🐣 ${odds.twin}% twins</span>
        <span class="chip">✦ ${odds.combo}% special combo</span>
        <span class="chip chip-shine">✨ ${odds.shine}% shiny</span>
      </div>
      <div class="tiny muted" style="margin-top:5px">Gene play raises all three odds. Shiny parents, hybrids, mutations, and generations help most.</div>
      <button class="btn btn-primary btn-block" data-fuse style="margin-top:10px" ${canFuse ? '' : 'disabled'}>
        ${icon('dna')} ${canFuse ? `Fuse ${esc(displayName(a))} + ${esc(displayName(b))}` : 'Choose two sprites'}
      </button>
    </div>`;
    mergeEl.querySelectorAll('[data-slot]').forEach((btn) => {
      btn.addEventListener('click', () => openPicker(btn.dataset.slot));
    });
    mergeEl.querySelector('[data-fuse]').addEventListener('click', fuse);

    const shop = root.querySelector('#nest-shop');
    shop.innerHTML = EGG_KEYS.map((key, i) => {
      const t = EGG_TIERS[key];
      const mythic = key === 'mythic';
      const sample = mythic
        ? { id: `shop-${key}`, element: 'motherearth', stage: 'egg', palette: 'prism', pattern: 'spots' }
        : { id: `shop-${key}`, element: ['tide', 'bloom', 'dusk'][i % 3], stage: 'egg', palette: i === 2 ? 'prism' : 'native', pattern: 'spots' };
      const poolNames = mythic ? MYTHIC_EGG_POOL.slice(0, 3).map((k) => ELEMENTS[k].name).join(' · ') : '';
      const poolRest = mythic ? MYTHIC_EGG_POOL.length - 3 : 0;
      return `<div class="rowcard${mythic ? ' mythic-row' : ''}">
        <span class="rc-art">${eggSVG(sample, { progress: 20 })}</span>
        <span style="flex:1;min-width:0"><b style="font-size:12.5px">${t.name}${mythic ? ' <span class="mythic-badge">✦ MYTHIC POOL</span>' : ''}</b><br><span class="tiny muted">${t.desc}</span>${mythic ? `<span class="mythic-pool">${poolNames} + ${poolRest} more</span>` : ''}</span>
        <button class="btn btn-sm btn-gold" data-buy="${key}" ${state.coins < t.price ? 'disabled style="opacity:.5"' : ''}>${t.price} 🪙</button>
      </div>`;
    }).join('');
    shop.querySelectorAll('[data-buy]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const res = Actions.buyEgg(btn.dataset.buy);
        if (res.ok) {
          Sfx.coin();
          toast(btn.dataset.buy === 'mythic' ? 'A Mythic Egg joined the Nest — a legend is inside.' : 'A new egg joined the Nest!', '🥚');
          App.openHatch(res.egg.id);
        }
      });
    });

    paintTypeShop();
  }

  function typeMatches(key) {
    const q = typeFilter.q.trim().toLowerCase();
    return (!q || ELEMENTS[key].name.toLowerCase().includes(q) || key.includes(q))
      && (typeFilter.rarity === 'all' || typeEggRarity(key) === typeFilter.rarity);
  }

  function paintTypeShop() {
    const typeShop = root.querySelector('#nest-type-shop');
    if (!typeShop) return;
    const matches = TYPE_EGG_SPECIES.filter(typeMatches);
    const shown = matches.slice(0, typeLimit);
    typeShop.innerHTML = shown.map((key) => {
      const price = TYPE_EGG_PRICE[key] || 120;
      const rarity = TYPE_EGG_RARITIES[typeEggRarity(key)];
      return `<button class="type-egg" data-buy-type="${key}" title="${rarity.name} type" style="border-color:${ELEMENTS[key].primary}66">
        <span class="te-art" style="--egg:${ELEMENTS[key].primary}"><i></i></span>
        <b><span class="te-dot" style="background:${rarity.color}"></span>${ELEMENTS[key].name}</b>
        <span class="te-price">${price} 🪙</span>
      </button>`;
    }).join('');
    typeShop.querySelectorAll('[data-buy-type]').forEach((btn) => {
      const key = btn.dataset.buyType;
      btn.disabled = state.coins < (TYPE_EGG_PRICE[key] || 120);
      btn.addEventListener('click', () => {
        const res = Actions.buyTypeEgg(key);
        if (res.ok) {
          Sfx.coin();
          toast(`${ELEMENTS[key].name} egg joined the Nest!`, '🥚');
          App.openHatch(res.egg.id);
        }
      });
    });
    const more = root.querySelector('[data-type-more]');
    if (more) {
      const left = matches.length - shown.length;
      more.hidden = left <= 0;
      more.textContent = left > 0 ? `Show ${Math.min(60, left)} more type eggs · ${left} left` : '';
      more.onclick = () => { typeLimit += 60; paintTypeShop(); };
    }
    const count = root.querySelector('[data-type-count]');
    if (count) {
      count.textContent = matches.length === TYPE_EGG_SPECIES.length
        ? `${TYPE_EGG_SPECIES.length} type eggs · ${shown.length} shown`
        : `${matches.length} of ${TYPE_EGG_SPECIES.length} type eggs · ${shown.length} shown`;
    }
    const empty = root.querySelector('[data-type-empty]');
    if (empty) empty.hidden = matches.length !== 0;
  }

  function openPicker(key) {
    const options = grownSprites();
    if (!options.length) {
      toast('Hatch at least one sprite first.', '🐣');
      return;
    }
    const other = picked[key === 'a' ? 'b' : 'a'];
    const body = `<div class="list-gap" style="margin-top:12px">
      ${options.map((s) => {
        const blocked = restLeft(s) > 0 || s.level < 3 || s.id === other;
        return `<button class="rowcard selectable" data-pick="${s.id}" style="${blocked ? 'opacity:.45' : ''}" ${blocked ? 'disabled' : ''}>
          <span class="rc-art">${spriteSVG(s, { expr: expressionFor(s) })}</span>
          <span style="flex:1;min-width:0;text-align:left">
            <b style="font-size:12.5px">${esc(displayName(s))}</b><br>
            <span class="tiny muted">Lv ${s.level} · ${typeName(s)} · ${BREEDS[s.breed]?.name || ''}</span>
            ${restLeft(s) > 0 ? '<br><span class="tiny" style="color:var(--warn)">Resting — ready soon</span>' : s.level < 3 ? '<br><span class="tiny" style="color:var(--warn)">Needs level 3</span>' : ''}
          </span>
          ${state.activeId === s.id ? '<span class="chip" style="font-size:8px">active</span>' : ''}
        </button>`;
      }).join('')}
    </div>`;
    openSheet({
      title: 'Choose a parent',
      sub: 'Level 3+ and rested. Their colors, type, and personality can blend into the egg.',
      body,
      onMount: (root, close) => {
        root.querySelectorAll('[data-pick]').forEach((btn) => {
          btn.addEventListener('click', () => {
            picked[key] = btn.dataset.pick;
            Sfx.pop();
            close();
            paint();
          });
        });
      },
    });
  }

  function fuse() {
    const a = picked.a;
    const b = picked.b;
    if (!a || !b) return;
    const res = Actions.previewMerge(a, b);
    if (res.error) {
      toast(res.error, '🧬');
      Sfx.error();
      return;
    }
    const { child, child2, twins, cost } = res;
    const element = ELEMENTS[child.element];
    const typeText = child.hybrid ? child.hybrid : element.name;
    const hybridOf = child.hybridParents ? `${ELEMENTS[child.hybridParents[0]].name} × ${ELEMENTS[child.hybridParents[1]].name}` : null;
    const mutation = child.mutation ? MUTATIONS.find((m) => m.name === child.mutation) : null;
    const special = child.special ? COMBOS.find((c) => c.id === child.special) : null;
    const anyShiny = child.shiny || child2?.shiny;
    const previewPalette = resolvePalette(child);
    const modal = openModal({
      title: anyShiny ? (twins ? 'Twins! Two sparkling legends' : '✨ A shiny little legend') : twins ? 'Twins! Two little legends' : 'A new little legend',
      sub: twins ? `A double yolk of ${typeText} eggs, each with their own soul.` : `A ${typeText} egg with a whole personality of its own.`,
      body: `<div class="preview-box" style="margin-top:12px">
          <div class="glow" style="position:absolute;width:170px;height:170px;border-radius:50%;background:radial-gradient(circle, ${previewPalette.body}55, transparent 65%);filter:blur(12px)"></div>
          <div class="twin-art" style="${twins ? '' : 'display:block'}">
            ${spriteSVG({ ...child, stage: 'baby' }, { expr: 'happy' })}
            ${twins ? spriteSVG({ ...child2, stage: 'baby' }, { expr: 'happy' }) : ''}
          </div>
          <div class="row" style="flex-wrap:wrap;justify-content:center;gap:4px">
            <span class="chip">${typeText}${hybridOf ? ` · ${hybridOf}` : ''}</span>
            <span class="chip">${BREEDS[child.breed]?.name || 'Puff'} line</span>
            <span class="chip">${SIZES[child.size]?.name || 'Standard'} size</span>
            ${child.shiny ? '<span class="chip chip-shine">✨ shiny</span>' : ''}
            ${twins && child2?.shiny ? '<span class="chip chip-shine">✨ shiny twin</span>' : ''}
            ${special ? `<span class="chip chip-mut">✦ ${special.name}</span>` : mutation ? `<span class="chip chip-mut">✦ ${mutation.name}</span>` : ''}
            ${twins ? '<span class="chip" style="color:var(--gold)">🐣 twins</span>' : ''}
          </div>
        </div>
        <div class="card" style="padding:12px;margin-top:10px;text-align:left">
          <div class="between"><span class="tiny muted">Lineage</span><span class="small"><b>${esc(displayName(findSprite(a)))}</b> × <b>${esc(displayName(findSprite(b)))}</b></span></div>
          <div class="between" style="margin-top:6px"><span class="tiny muted">Generation</span><span class="small">${(child.gen || 0) + 1}</span></div>
          <div class="between" style="margin-top:6px"><span class="tiny muted">Personality</span><span class="small">${PERSONALITIES[child.personality]?.name}</span></div>
          <div class="between" style="margin-top:6px"><span class="tiny muted">Look</span><span class="small">${PATTERNS[child.pattern]?.name} · ${ACCESSORIES[child.accessory]?.name}</span></div>
          ${special ? `<div class="between" style="margin-top:6px"><span class="tiny muted">Combo power</span><span class="small">${special.power.icon} ${special.power.name}</span></div>` : ''}
          <div class="between" style="margin-top:6px"><span class="tiny muted">Nursery odds</span><span class="small">${res.odds.twin}% twins · ${res.odds.combo}% combo · ${res.odds.shine}% shiny</span></div>
          <div class="between" style="margin-top:6px"><span class="tiny muted">Merge cost</span><span class="small"><b>${cost} 🪙</b></span></div>
        </div>
        <div class="actions" style="display:flex;gap:8px;margin-top:12px">
          <button class="btn btn-ghost" data-close>Not yet</button>
          <button class="btn btn-primary" data-fuse-confirm>Fuse · ${cost} 🪙</button>
        </div>`,
      onMount: (root, close) => {
        root.querySelector('[data-fuse-confirm]').addEventListener('click', () => {
          const result = Actions.completeMerge(a, b, child, child2);
          if (!result.ok) {
            toast('Merge failed — coins or resting parents.', '😵');
            Sfx.error();
            return;
          }
          if (child.shiny || child2?.shiny) toast('A shiny egg joined the Nest!', '✨');
          picked.a = null;
          picked.b = null;
          close();
          Sfx.win();
          const art = article(typeText);
          toast(result.child2
            ? `Twins! Two ${typeText} eggs appeared. Warm them both.`
            : `${art[0].toUpperCase() + art.slice(1)} ${typeText} egg appeared! Warm it to meet them.`, '🥚');
          paint();
          App.openHatch(child.id);
        });
      },
    });
    return modal;
  }

  paint();
  const unsub = subscribeState(() => paint());
  return () => unsub();
}
