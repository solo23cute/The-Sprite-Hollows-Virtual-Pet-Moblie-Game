/* Bedroom: a quiet room with a bed for everyone, tuck-ins, and sleep cycles. */

function bedroomBedHTML(s) {
  const info = sleepInfo(s);
  const asleep = !!s.asleep;
  const name = esc(displayName(s));
  const status = asleep && info
    ? `Cycle ${info.cycle} of ${info.cycles} · ${fmtTime(info.left)} left`
    : `${Math.round(s.needs.energy)}/100 energy`;
  const bar = asleep && info ? Math.round(info.progress * 100) : 0;
  const el = ELEMENTS[s.element] || ELEMENTS.bloom;
  return `<div class="bed ${asleep ? 'asleep' : 'awake'}" data-bed-card="${s.id}" style="--blanket:${el.primary};--blanket-accent:${el.accent}">
    <div class="bed-headboard"><span class="bed-name">${name}</span></div>
    <div class="bed-pillow"></div>
    <div class="bed-mattress"></div>
    <div class="bed-sprite">${spriteSVG(s, { expr: asleep ? 'sleep' : 'happy' })}</div>
    <div class="bed-blanket"></div>
    ${asleep ? '<span class="bed-zzz">💤</span>' : ''}
    <div class="bed-info">
      <div class="bed-status" data-bed-status>${status}</div>
      ${asleep ? `<div class="bed-cycle"><i data-cycle-bar style="width:${bar}%"></i></div>` : ''}
    </div>
    <button class="bed-action" data-bed-action="${s.id}">${asleep ? 'Wake' : 'Tuck in'}</button>
  </div>`;
}

function dreamWhen(ts) {
  const diff = Math.max(0, Date.now() - ts);
  if (diff < 60000) return 'just now';
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function openDreamJournalSheet() {
  let filter = 'all';
  let closeJournal = null;
  const entries = () => {
    const list = (Array.isArray(state.journal) ? state.journal : []).slice();
    const seen = new Set(list.map((e) => e.spriteId));
    state.sprites
      .filter((s) => s.stage !== 'egg' && s.lastDream?.text && !seen.has(s.id))
      .forEach((s) => {
        list.push({
          id: `last_${s.id}`,
          spriteId: s.id,
          spriteName: s.name || (ELEMENTS[s.element] || ELEMENTS.bloom).name,
          element: s.element || 'bloom',
          text: s.lastDream.text,
          at: s.lastDream.at || Date.now(),
          cycles: s.lastDream.cycles || 1,
        });
      });
    return list.sort((a, b) => b.at - a.at);
  };

  const filtersHTML = () => {
    const list = entries();
    const seen = new Map();
    list.forEach((e) => {
      const key = e.spriteId || e.spriteName;
      if (!seen.has(key)) seen.set(key, { key, name: e.spriteName, count: 0 });
      seen.get(key).count += 1;
    });
    const chips = [...seen.values()].map((f) => {
      const live = f.key && findSprite(f.key);
      const name = live ? displayName(live) : f.name;
      return `<button class="dream-filter ${filter === f.key ? 'on' : ''}" data-dream-filter="${esc(f.key)}">${esc(name)} <b>${f.count}</b></button>`;
    }).join('');
    return `<button class="dream-filter ${filter === 'all' ? 'on' : ''}" data-dream-filter="all">All dreams <b>${list.length}</b></button>${chips}`;
  };

  const cardHTML = (e) => {
    const el = ELEMENTS[e.element] || ELEMENTS.bloom;
    const live = e.spriteId ? findSprite(e.spriteId) : null;
    const name = live ? displayName(live) : e.spriteName;
    const art = live && live.stage !== 'egg'
      ? spriteSVG(live, { expr: 'sleep' })
      : `<span class="dream-orb" style="--orb:${el.primary};--orb-light:${el.light}"></span>`;
    return `<article class="dream-card" style="--dream-accent:${el.primary}">
      <div class="dream-art">${art}</div>
      <div class="dream-body">
        <div class="dream-meta"><b>${esc(name)}</b><span>${dreamWhen(e.at)}</span></div>
        <div class="dream-type">${el.name}${live ? ` · ${stageLabel(live)}` : ''}</div>
        <p class="dream-text">“${esc(e.text)}”</p>
        <div class="dream-tags">
          <span>💤 ${e.cycles} ${e.cycles === 1 ? 'cycle' : 'cycles'}</span>
          <span>${new Date(e.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </article>`;
  };

  const body = `<div class="dream-journal">
    <div class="dream-toolbar" data-dream-filters></div>
    <div class="dream-list" data-dream-list></div>
  </div>`;

  const { close } = openSheet({
    title: '💭 Dream journal',
    sub: `${(state.journal || []).length} dreams kept. Every tuck-in writes a new one when the sprite wakes.`,
    body,
    onMount: (root) => {
      const filterBar = root.querySelector('[data-dream-filters]');
      const list = root.querySelector('[data-dream-list]');

      const paint = () => {
        filterBar.innerHTML = filtersHTML();
        const shown = entries().filter((e) => filter === 'all' || (e.spriteId || e.spriteName) === filter);
        if (!shown.length) {
          const name = filter !== 'all'
            ? (findSprite(filter) ? displayName(findSprite(filter)) : entries().find((e) => (e.spriteId || e.spriteName) === filter)?.spriteName || 'this sprite')
            : null;
          list.innerHTML = `<div class="card empty-state dream-empty">
            <div style="font-size:36px">💭</div>
            <h3 style="font-size:15px;margin:6px 0 4px">${name ? `${esc(name)} hasn’t dreamed yet` : 'No dreams yet'}</h3>
            <p class="small muted">${name ? 'Tuck them in for two sleep cycles and their dream will appear here.' : 'Tuck a sprite in and let a sleep cycle finish. Their dream will be kept here to reread.'}</p>
            <button class="btn btn-primary" data-dream-sleep style="margin-top:12px">${name ? 'Go tuck them in' : 'Tuck someone in'}</button>
          </div>`;
          const nap = list.querySelector('[data-dream-sleep]');
          if (nap) nap.addEventListener('click', () => { if (closeJournal) closeJournal(); });
          return;
        }
        list.innerHTML = shown.map(cardHTML).join('');
      };

      filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-dream-filter]');
        if (!btn) return;
        filter = btn.dataset.dreamFilter;
        Sfx.pop();
        paint();
      });
      paint();
    },
  });
  closeJournal = close;
  return { close };
}

function openBedroomSheet() {
  let unsub = null;
  let timer = null;

  const body = `<div class="bedroom" data-bedroom-room>
    <div class="bedroom-window" data-bedroom-window>
      <span class="bw-orb" data-bw-orb>🌙</span>
      <span class="bw-weather" data-bw-weather>🌤️</span>
      <span class="bw-stars" aria-hidden="true">${Array.from({ length: 9 }, () => '<i></i>').join('')}</span>
      <span class="bw-sill"></span>
    </div>
    <div class="bedroom-top">
      <span class="chip" data-room-season>🌸 Spring</span>
      <span class="chip" data-room-weather>🌤️ Clear</span>
      <span class="chip" data-room-bedtime>🌙 Bedtime</span>
    </div>
    <div class="bed-grid" data-beds></div>
    <div class="bedroom-actions">
      <button class="btn btn-ghost btn-block dream-journal-btn" data-dream-journal>💭 Dream journal <span class="dj-count">${(state.journal || []).length}</span></button>
      <button class="btn btn-primary btn-block" data-tuck-all>🛏️ Tuck everyone in</button>
      <button class="btn btn-ghost btn-block" data-wake-all>☀️ Wake everyone</button>
      <p class="tiny muted" data-room-note style="text-align:center;margin:7px 0 0"></p>
    </div>
  </div>`;

  const { overlay, close } = openSheet({
    title: 'Bedroom',
    sub: 'Blankets, pillows, and two sleep cycles. Night tuck-ins build extra bond.',
    body,
    onMount: (root) => {
      const room = root.querySelector('[data-bedroom-room]');
      const bedGrid = root.querySelector('[data-beds]');
      const note = root.querySelector('[data-room-note]');

      const roster = () => {
        const sorted = grownSprites().slice().sort((a, b) => {
          if (a.id === state.activeId) return -1;
          if (b.id === state.activeId) return 1;
          return (a.born || 0) - (b.born || 0);
        });
        return sorted.slice(0, 8);
      };

      const paintHeader = () => {
        const phase = timePhase();
        const season = seasonOf();
        const wx = currentWeather();
        const climate = state.world?.climate || 'temperate';
        room.className = `bedroom room-${phase.key}`;
        const orb = root.querySelector('[data-bw-orb]');
        if (orb) orb.textContent = phase.icon;
        const weather = root.querySelector('[data-bw-weather]');
        if (weather) weather.textContent = wx.icon;
        const seasonChip = root.querySelector('[data-room-season]');
        if (seasonChip) seasonChip.textContent = `${season.icon} ${seasonLabel(season, climate)}`;
        const weatherChip = root.querySelector('[data-room-weather]');
        if (weatherChip) weatherChip.textContent = `${wx.icon} ${wx.name}`;
        const bedtimeChip = root.querySelector('[data-room-bedtime]');
        if (bedtimeChip) {
          bedtimeChip.textContent = isBedtime() ? '🌙 Bedtime · bonus bond' : '☀️ Daytime naps';
          bedtimeChip.classList.toggle('chip-night', isBedtime());
        }
      };

      const paint = () => {
        paintHeader();
        const list = roster();
        if (!list.length) {
          bedGrid.innerHTML = `<div class="card empty-state" style="grid-column:1/-1">
            <div style="font-size:34px">🛏️</div>
            <h3 style="font-size:15px;margin:6px 0 3px">The beds are made and empty</h3>
            <p class="small muted">Hatch a sprite in the Nest, then come back for tuck-ins.</p>
          </div>`;
          note.textContent = '';
          return;
        }
        bedGrid.innerHTML = list.map(bedroomBedHTML).join('');
        const journalCount = root.querySelector('.dj-count');
        if (journalCount) journalCount.textContent = (state.journal || []).length;
        const asleep = list.filter((s) => s.asleep).length;
        note.textContent = `${asleep} of ${list.length} tucked in. Two cycles is a full night; waking early still keeps the energy they made.`;
      };

      const tickRoom = () => {
        const list = roster();
        let stale = false;
        for (const s of list) {
          const card = bedGrid.querySelector(`[data-bed-card="${s.id}"]`);
          if (!card) { stale = true; break; }
          if (card.classList.contains('asleep') !== !!s.asleep) { stale = true; break; }
          if (!s.asleep) {
            const status = card.querySelector('[data-bed-status]');
            if (status) status.textContent = `${Math.round(s.needs.energy)}/100 energy`;
            continue;
          }
          const info = sleepInfo(s);
          if (!info) { stale = true; break; }
          const bar = card.querySelector('[data-cycle-bar]');
          if (bar) bar.style.width = `${Math.round(info.progress * 100)}%`;
          const status = card.querySelector('[data-bed-status]');
          if (status) status.textContent = `Cycle ${info.cycle} of ${info.cycles} · ${fmtTime(info.left)} left`;
        }
        if (stale) paint();
        else paintHeader();
      };

      const goodnight = (s) => {
        if (typeof Voice !== 'undefined') Voice.speak(`Goodnight, ${displayName(s)}. Sleep well.`);
      };
      const goodMorning = (s) => {
        if (typeof Voice !== 'undefined') Voice.speak(`Good morning, ${displayName(s)}.`);
      };

      bedGrid.addEventListener('click', (e) => {
        const button = e.target.closest('[data-bed-action]');
        if (!button) return;
        const s = findSprite(button.dataset.bedAction);
        if (!s) return;
        if (s.asleep) {
          const res = Actions.wake(s.id);
          goodMorning(s);
          toast(res.dream ? `${displayName(s)} woke from a dream about ${res.dream.text}.` : `${displayName(s)} stretches awake.`, '💭');
        } else {
          const res = Actions.tuckIn(s.id);
          if (res.ok) goodnight(s);
        }
        paint();
        Sfx.pop();
      });

      root.querySelector('[data-dream-journal]').addEventListener('click', () => {
        openDreamJournalSheet();
      });

      root.querySelector('[data-tuck-all]').addEventListener('click', () => {
        const res = Actions.tuckAllNight();
        if (!res.ok) {
          toast('Everyone is already dreaming.', '💤');
          return;
        }
        if (typeof Voice !== 'undefined') Voice.speak('Goodnight, everyone. Sleep well.');
        paint();
        burstOn(root.querySelector('[data-tuck-all]'), ['🌙', '💤', '✨'], 8);
      });

      root.querySelector('[data-wake-all]').addEventListener('click', () => {
        const list = roster().filter((s) => s.asleep);
        if (!list.length) {
          toast('Everyone is already awake.', '☀️');
          return;
        }
        list.forEach((s) => Actions.wake(s.id));
        if (typeof Voice !== 'undefined') Voice.speak('Good morning, sleepyheads.');
        paint();
        toast(`${list.length === 1 ? displayName(list[0]) + ' is' : list.length + ' sprites are'} up and stretching.`, '🌞');
      });

      unsub = subscribeState((detail) => {
        if (detail.type === 'ambient') return;
        paint();
      });
      paint();
      timer = setInterval(tickRoom, 1000);
    },
    onClose: () => {
      if (unsub) unsub();
      if (timer) clearInterval(timer);
    },
  });

  return { overlay, close };
}
