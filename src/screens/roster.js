/* Roster browser: discovery for the large pony, Care Bear, TV, and Kingdom Hearts collections. */

function rosterOrderedFilters(order, byGroup, meta) {
  return order
    .filter((group) => byGroup[group]?.length)
    .map((group) => ({
      key: group,
      label: meta[group]?.label || group,
      icon: meta[group]?.icon || '•',
      keys: byGroup[group],
    }));
}

function rosterValueFilters(keys, field, iconFor) {
  const seen = new Set();
  const filters = [];
  keys.forEach((key) => {
    const value = ELEMENTS[key]?.[field];
    if (!value || seen.has(value)) return;
    seen.add(value);
    filters.push({ key: value, label: value, icon: iconFor(key), keys: [] });
  });
  keys.forEach((key) => {
    const filter = filters.find((item) => item.key === ELEMENTS[key]?.[field]);
    if (filter) filter.keys.push(key);
  });
  return filters;
}

function netflixShowFilters(wing) {
  return NETFLIX_SHOW_ORDER
    .filter((show) => NETFLIX_SHOWS[show].wing === wing && NETFLIX_BY_SHOW[show].length)
    .map((show) => ({
      key: show,
      label: NETFLIX_SHOWS[show].label,
      icon: NETFLIX_SHOWS[show].icon,
      keys: NETFLIX_BY_SHOW[show],
    }));
}

function rosterTabs() {
  return [
    {
      id: 'ponies',
      label: 'Ponies',
      icon: '🦄',
      total: PONY_TOTAL,
      noun: 'ponies',
      singular: 'pony',
      filterNoun: 'family',
      allLabel: 'All pony families',
      hint: 'Search ponies, types, genes…',
      filters: rosterOrderedFilters(PONY_GROUP_ORDER, PONY_BY_GROUP, PONY_GROUPS),
      subtitle: (el) => `${PONY_GROUPS[el.ponyGroup]?.label || 'Pony'} · ${el.ponyType || 'Pony'}`,
      search: (el) => [el.name, el.ponyType, el.trait, el.blurb, PONY_GROUPS[el.ponyGroup]?.label].join(' '),
    },
    {
      id: 'carebears',
      label: 'Care Bears',
      icon: '🌈',
      total: CARE_BEAR_TOTAL,
      noun: 'Care Bears',
      singular: 'Care Bear',
      filterNoun: 'family',
      allLabel: 'All Care families',
      hint: 'Search bears, Cousins, genes…',
      filters: rosterOrderedFilters(CARE_BEAR_GROUP_ORDER, CARE_BEAR_BY_GROUP, CARE_BEAR_GROUPS),
      subtitle: (el) => `${CARE_BEAR_GROUPS[el.careBearGroup]?.label || 'Care family'}${el.careBearCousin ? ' · Cousin' : ''}`,
      search: (el) => [el.name, el.trait, el.blurb, CARE_BEAR_GROUPS[el.careBearGroup]?.label, el.careBearCousin ? 'Cousin' : ''].join(' '),
    },
    {
      id: 'tv',
      label: 'TV Legends',
      icon: '📺',
      total: TV_LEGACY_TOTAL,
      noun: 'characters',
      singular: 'character',
      filterNoun: 'show',
      allLabel: 'All TV shows',
      hint: 'Search characters, shows, eras…',
      filters: rosterValueFilters(TV_LEGACY_SPECIES, 'tvShow', (key) => TV_LEGACY_GROUPS[ELEMENTS[key].tvLegacyGroup]?.icon || '📺'),
      subtitle: (el) => `${el.tvShow} · ${TV_LEGACY_GROUPS[el.tvLegacyGroup]?.label || 'TV'}`,
      search: (el) => [el.name, el.tvShow, el.trait, el.blurb, TV_LEGACY_GROUPS[el.tvLegacyGroup]?.label].join(' '),
    },
    {
      id: 'kingdomhearts',
      label: 'Kingdom Hearts',
      icon: '🗝️',
      total: KH_TOTAL,
      noun: 'characters',
      singular: 'character',
      filterNoun: 'world',
      allLabel: 'All Keyblade worlds',
      hint: 'Search characters, worlds, genes…',
      filters: rosterValueFilters(KH_SPECIES, 'khWorld', () => '🗝️'),
      subtitle: (el) => {
        const group = KH_GROUPS[el.khGroup]?.label || 'Kingdom Hearts';
        return el.khWorld === group ? group : `${el.khWorld} · ${group}`;
      },
      search: (el) => [el.name, el.khWorld, el.trait, el.blurb, KH_GROUPS[el.khGroup]?.label].join(' '),
    },
    {
      id: 'gta',
      label: 'GTA',
      icon: '🚗',
      total: GTA_TOTAL,
      noun: 'characters',
      singular: 'character',
      filterNoun: 'game',
      allLabel: 'All GTA games',
      hint: 'Search GTA characters, games, genes…',
      filters: rosterOrderedFilters(GTA_GROUP_ORDER, GTA_BY_GROUP, GTA_GROUPS),
      subtitle: (el) => `${el.gtaGame} · ${GTA_GROUPS[el.gtaGroup]?.label || 'GTA'}`,
      search: (el) => [el.name, el.gtaGame, el.trait, el.blurb, GTA_GROUPS[el.gtaGroup]?.label, 'Grand Theft Auto'].join(' '),
    },
    {
      id: 'medical',
      label: 'Medical TV',
      icon: '🩺',
      total: MEDICAL_TOTAL,
      noun: 'characters',
      singular: 'character',
      filterNoun: 'show',
      allLabel: 'All medical shows',
      hint: 'Search Grey’s, Scrubs, seasons, roles…',
      filters: MEDICAL_SHOW_ORDER.map((show) => ({
        key: show,
        label: MEDICAL_SHOWS[show].label,
        icon: MEDICAL_SHOWS[show].icon,
        keys: MEDICAL_BY_SHOW[show],
      })),
      subtitle: (el) => `${el.medicalShow} · ${el.medicalRole} · S${el.medicalSeasons[0]}${el.medicalSeasons.length > 1 ? `–${el.medicalSeasons[el.medicalSeasons.length - 1]}` : ''}`,
      search: (el) => [el.name, el.medicalShow, el.medicalRole, el.medicalArticle, el.trait, el.blurb, 'Medical TV'].join(' '),
    },
    {
      id: 'netflixanime',
      label: 'Netflix Anime',
      icon: '🍥',
      total: NETFLIX_WING_COUNTS.anime,
      noun: 'characters',
      singular: 'character',
      filterNoun: 'show',
      allLabel: 'All Netflix Anime shows',
      hint: 'Search anime characters, shows, genes…',
      wing: 'anime',
      showOwned: true,
      progressRows: true,
      filters: netflixShowFilters('anime'),
      subtitle: (el) => `${el.netflixShow} · Netflix Anime`,
      search: (el) => [el.name, el.netflixShow, el.netflixArticle, el.trait, el.blurb, 'Netflix Anime'].join(' '),
    },
    {
      id: 'netflixtoons',
      label: 'Netflix Toons',
      icon: '🎨',
      total: NETFLIX_WING_COUNTS.toons,
      noun: 'characters',
      singular: 'character',
      filterNoun: 'show',
      allLabel: 'All Netflix Toons shows',
      hint: 'Search cartoon characters, shows, genes…',
      wing: 'toons',
      showOwned: true,
      progressRows: true,
      filters: netflixShowFilters('toons'),
      subtitle: (el) => `${el.netflixShow} · Netflix Toons`,
      search: (el) => [el.name, el.netflixShow, el.netflixArticle, el.trait, el.blurb, 'Netflix Toons'].join(' '),
    },
  ].map((tab) => ({
    ...tab,
    keys: tab.filters.flatMap((filter) => filter.keys),
  }));
}

function rosterScreen(root) {
  const tabs = rosterTabs();
  let activeTab = 0;
  let activeFilter = -1;
  let query = '';
  let limit = 24;

  root.innerHTML = `
    <div class="screen-head">
      <div><div class="eyebrow">Collection discovery</div><h1>Roster browser</h1><p>Find any pony, Care Bear, TV legend, Netflix character, medical-TV regular, or Keyblade wielder by family, show, or world.</p></div>
      <button class="icon-btn" data-roster-back aria-label="Back to the Wiki" title="Back to the Wiki">${icon('arrow')}</button>
    </div>
    <div class="roster-hero">
      <span class="rh-icon">🧭</span>
      <span class="rh-copy"><b>${tabs.reduce((sum, tab) => sum + tab.total, 0)} collectibles, ${tabs.length} ways in.</b><span>Owned species are marked, and every card opens its full Wiki file. The medical wing adds ${MEDICAL_TOTAL} characters across all 23 Grey’s Anatomy seasons and all nine Scrubs seasons.</span></span>
    </div>
    <div class="roster-tabs" data-roster-tabs role="tablist" aria-label="Collections"></div>
    <div class="type-tools">
      <input class="type-search" type="search" data-roster-search aria-label="Search the roster" autocomplete="off">
    </div>
    <div class="roster-filter-head">
      <span data-roster-filter-label>Filter by family</span>
      <span data-roster-filter-count></span>
    </div>
    <div class="type-rarities" data-roster-filters></div>
    <div class="roster-summary">
      <div class="rs-copy"><b data-roster-owned>0</b><span data-roster-owned-label>owned</span></div>
      <div class="bar"><i data-roster-progress></i></div>
      <span class="rs-total" data-roster-total></span>
    </div>
    <div class="roster-show-progress" data-roster-show-progress hidden></div>
    <div class="section-title"><h2 data-roster-title>Roster</h2><span data-roster-count></span></div>
    <div class="roster-grid" data-roster-grid></div>
    <div class="card empty-state roster-empty" data-roster-empty hidden></div>
    <button class="btn btn-soft btn-block" data-roster-more hidden style="margin-top:12px"></button>
    <p class="tiny muted" style="text-align:center;margin:14px 4px 0;line-height:1.5">Tap any card for its gene, Titan, habitats, hybrids, and species article.</p>`;

  const tabsBox = root.querySelector('[data-roster-tabs]');
  const search = root.querySelector('[data-roster-search]');
  const filterBox = root.querySelector('[data-roster-filters]');
  const filterLabel = root.querySelector('[data-roster-filter-label]');
  const filterCount = root.querySelector('[data-roster-filter-count]');
  const grid = root.querySelector('[data-roster-grid]');
  const empty = root.querySelector('[data-roster-empty]');
  const more = root.querySelector('[data-roster-more]');
  const title = root.querySelector('[data-roster-title]');
  const count = root.querySelector('[data-roster-count]');
  const ownedEl = root.querySelector('[data-roster-owned]');
  const ownedLabel = root.querySelector('[data-roster-owned-label]');
  const totalEl = root.querySelector('[data-roster-total]');
  const progress = root.querySelector('[data-roster-progress]');
  const showProgress = root.querySelector('[data-roster-show-progress]');

  function ownedSet() {
    return new Set(state.sprites.map((sprite) => sprite.element));
  }

  function currentTab() {
    return tabs[activeTab];
  }

  function currentBase() {
    const tab = currentTab();
    return activeFilter < 0 ? tab.keys : tab.filters[activeFilter].keys;
  }

  function cardHTML(tab, key, owned) {
    const el = ELEMENTS[key];
    const power = GENE_POWERS[key] || { icon: '✨', name: 'Classic gene' };
    const active = state.sprites.find((sprite) => sprite.id === state.activeId)?.element === key;
    const sample = {
      id: `roster-${key}`, element: key, breed: 'puff', stage: 'sprite',
      pattern: 'plain', palette: 'native', accessory: 'none', name: el.name, level: 3, size: 'standard',
    };
    return `<button class="roster-card ${owned ? 'is-owned' : ''} ${active ? 'is-active' : ''}" data-roster-key="${key}" style="--rc:${el.primary}" aria-label="${esc(el.name)}${owned ? ', owned' : ''}">
      <span class="rc-art">${spriteSVG(sample, { expr: 'happy' })}</span>
      <span class="rc-copy"><b>${esc(el.name)}</b><span class="rc-meta">${esc(tab.subtitle(el))}</span><span class="rc-gene">${power.icon} ${esc(power.name)}</span></span>
      ${owned ? '<span class="rc-state">✓ owned</span>' : ''}
    </button>`;
  }

  function paint() {
    const tab = currentTab();
    const base = currentBase();
    const owned = ownedSet();
    const ownedBase = base.filter((key) => owned.has(key)).length;
    const filter = activeFilter < 0 ? null : tab.filters[activeFilter];
    const q = query.trim().toLowerCase();
    const matches = (key) => {
      if (!q) return true;
      const el = ELEMENTS[key];
      const haystack = `${tab.search(el)} ${key} ${GENE_POWERS[key]?.name || ''}`.toLowerCase();
      return q.split(/\s+/).filter(Boolean).every((part) => haystack.includes(part));
    };
    const list = base.filter(matches);
    const shown = list.slice(0, limit);

    tabsBox.innerHTML = tabs.map((item, index) => {
      const itemOwned = item.keys.filter((key) => owned.has(key)).length;
      return `<button class="roster-tab ${index === activeTab ? 'on' : ''}" data-roster-tab="${index}" role="tab" aria-selected="${index === activeTab}">
        <span class="rt-icon">${item.icon}</span>
        <span class="rt-copy"><b>${item.label}</b><span>${itemOwned} / ${item.total} owned</span></span>
      </button>`;
    }).join('');

    search.placeholder = tab.hint;
    filterLabel.textContent = `Filter by ${tab.filterNoun}`;
    filterCount.textContent = `${tab.filters.length} ${tab.filterNoun === 'family' ? 'families' : `${tab.filterNoun}s`}`;
    filterBox.innerHTML = `<button class="chip roster-filter ${activeFilter < 0 ? 'on' : ''}" data-roster-filter="-1">${tab.allLabel} <b>${tab.showOwned ? `${tab.keys.filter((key) => owned.has(key)).length}/${tab.keys.length}` : tab.keys.length}</b></button>` +
      tab.filters.map((item, index) => {
        const filterOwned = item.keys.filter((key) => owned.has(key)).length;
        const shownCount = tab.showOwned ? `${filterOwned}/${item.keys.length}` : item.keys.length;
        return `<button class="chip roster-filter ${activeFilter === index ? 'on' : ''}" data-roster-filter="${index}">${item.icon} ${esc(item.label)} <b>${shownCount}</b></button>`;
      }).join('');

    if (showProgress) {
      showProgress.hidden = !tab.progressRows;
      if (tab.progressRows) {
        showProgress.innerHTML = `<div class="rsp-head"><b>${tab.label} show progress</b><span>${tab.keys.filter((key) => owned.has(key)).length} / ${tab.keys.length} owned</span></div>` +
          tab.filters.map((item, index) => {
            const filterOwned = item.keys.filter((key) => owned.has(key)).length;
            const pct = Math.round((filterOwned / Math.max(1, item.keys.length)) * 100);
            return `<button class="rsp-row ${activeFilter === index ? 'on' : ''}" data-roster-progress-filter="${index}">
              <span class="rsp-name">${item.icon} ${esc(item.label)}</span>
              <span class="rsp-bar"><i style="width:${pct}%"></i></span>
              <span class="rsp-count">${filterOwned}/${item.keys.length}</span>
            </button>`;
          }).join('');
        }
      }

    title.textContent = filter ? filter.label : tab.label;
    count.textContent = `${list.length} ${list.length === 1 ? tab.singular : tab.noun}`;
    ownedEl.textContent = ownedBase;
    ownedLabel.textContent = `of ${base.length} ${tab.noun} owned`;
    totalEl.textContent = `${Math.round((ownedBase / Math.max(1, base.length)) * 100)}%`;
    progress.style.width = `${(ownedBase / Math.max(1, base.length)) * 100}%`;

    grid.innerHTML = shown.map((key) => cardHTML(tab, key, owned.has(key))).join('');
    empty.hidden = list.length !== 0;
    empty.innerHTML = `<div style="font-size:30px">🫧</div><p>No ${tab.noun} match${q ? ` “${esc(query.trim())}”` : ' this filter'}.</p><button class="btn btn-soft btn-sm" data-roster-clear style="margin-top:10px">Clear search and filters</button>`;
    const left = list.length - shown.length;
    more.hidden = left <= 0;
    more.textContent = left > 0 ? `Show ${Math.min(24, left)} more · ${left} left` : '';

    tabsBox.querySelectorAll('[data-roster-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        activeTab = Number(button.dataset.rosterTab);
        activeFilter = -1;
        query = '';
        limit = 24;
        search.value = '';
        paint();
        Sfx.click();
      });
    });
    filterBox.querySelectorAll('[data-roster-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = Number(button.dataset.rosterFilter);
        limit = 24;
        paint();
        Sfx.click();
      });
    });
    showProgress.querySelectorAll('[data-roster-progress-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = Number(button.dataset.rosterProgressFilter);
        limit = 24;
        paint();
        Sfx.click();
      });
    });
    grid.querySelectorAll('[data-roster-key]').forEach((button) => {
      button.addEventListener('click', () => openWikiArticle(button.dataset.rosterKey));
    });
    empty.querySelector('[data-roster-clear]')?.addEventListener('click', () => {
      activeFilter = -1;
      query = '';
      search.value = '';
      limit = 24;
      paint();
    });
    more.onclick = () => {
      limit += 24;
      paint();
    };
  }

  root.querySelector('[data-roster-back]').addEventListener('click', () => App.go(App.rosterReturn || 'wiki'));
  search.addEventListener('input', () => {
    query = search.value;
    limit = 24;
    paint();
  });
  paint();
}
