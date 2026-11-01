/* Sent Home: a room of their own where a sprite relaxes, eats, recovers,
   earns coins, sleeps long, and can share a house with a friend. */

const HOME_COIN_BASE_CAP = 320;
const HOUSE_BOND_MAX = 600;
const HOUSE_PLAY_COOLDOWN = 45 * 1000;

/* Room upgrades: permanent buys that change how Sent Home works. */
const HOME_UPGRADES = {
  sunroom: {
    id: 'sunroom', name: 'Sunroom Bed', icon: '🛏️', price: 800,
    blurb: 'A proper bed by the window. Recovery and coin earning speed up for everyone at home.',
    cap: 160, recovery: 1.25, coins: 1.2,
  },
  pantry: {
    id: 'pantry', name: 'Hearth Pantry', icon: '🧺', price: 1600,
    blurb: 'A stocked pantry: sent-home sprites eat better, recover faster, and bank more coins.',
    cap: 220, recovery: 1.45, coins: 1.4,
  },
  playroom: {
    id: 'playroom', name: 'Playroom Rug', icon: '🧶', price: 1200,
    blurb: 'A soft rug and a toy basket. Shared-house hangouts pay more bond, joy, and coins.',
    recovery: 1.1, coins: 1.1, hangout: 1.4,
  },
  spareRoom: {
    id: 'spareRoom', name: 'Spare Bedroom', icon: '🚪', price: 2400,
    blurb: 'A third bed in every shared house, so three sprites can build one family bond.',
    slots: 3,
  },
  /* Tier two: bigger effects and visible decor in every room. */
  disco: {
    id: 'disco', name: 'Mirror Ball', icon: '🪩', price: 3200, requires: 'playroom',
    blurb: 'A mirror ball over the rug. Hangouts pay much more bond, and every room throws a little light.',
    hangout: 1.5, coins: 1.1,
  },
  aquarium: {
    id: 'aquarium', name: 'Glow Aquarium', icon: '🐠', price: 4200, requires: 'sunroom',
    blurb: 'A glowing tank beside the bed. Sent-home sprites recover faster and bank more coins.',
    cap: 90, recovery: 1.3,
  },
  garden: {
    id: 'garden', name: 'Rooftop Garden', icon: '🌿', price: 5000, requires: 'pantry',
    blurb: 'A little green rooftop. Home coins arrive faster and the cap rises again.',
    cap: 140, coins: 1.5,
  },
};

function homeUpgradeOwned(id) {
  return !!(state.homeUpgrades && state.homeUpgrades[id]);
}

function homeUpgradeOwnedList() {
  return Object.values(HOME_UPGRADES).filter((up) => homeUpgradeOwned(up.id));
}

function homeCoinCap() {
  return HOME_COIN_BASE_CAP + homeUpgradeOwnedList().reduce((sum, up) => sum + (up.cap || 0), 0);
}

function homeRecoveryMult() {
  return homeUpgradeOwnedList().reduce((mult, up) => mult * (up.recovery || 1), 1);
}

function homeCoinRateMult() {
  return homeUpgradeOwnedList().reduce((mult, up) => mult * (up.coins || 1), 1);
}

function homeHangoutMult() {
  return homeUpgradeOwnedList().reduce((mult, up) => mult * (up.hangout || 1), 1);
}

function houseMaxMembers() {
  return homeUpgradeOwned('spareRoom') ? 3 : 2;
}

const HOME_DECOR_PIECES = [
  { id: 'sunroom', cls: 'deco-bed', text: '' },
  { id: 'pantry', cls: 'deco-shelf', text: '' },
  { id: 'playroom', cls: 'deco-rug', text: '' },
  { id: 'spareRoom', cls: 'deco-bed3', text: '' },
  { id: 'disco', cls: 'deco-ball', text: '🪩' },
  { id: 'aquarium', cls: 'deco-tank', text: '🐠' },
  { id: 'garden', cls: 'deco-planter', text: '🌿' },
];
const ROOM_SPOT_X = [18, 50, 82];
const HOME_DECOR_DEFAULT_SPOT = { sunroom: 0, pantry: 0, playroom: 1, spareRoom: 2, disco: 1, aquarium: 2, garden: 2 };

function homeDecorSpot(id) {
  const layout = state.roomLayout && state.roomLayout[id];
  if (layout) {
    const spot = Number(layout.spot);
    return Math.max(0, Math.min(2, Number.isFinite(spot) ? Math.round(spot) : 1));
  }
  const free = typeof freeDecorPiece === 'function' ? freeDecorPiece(id) : null;
  const fallback = free ? free.spot : HOME_DECOR_DEFAULT_SPOT[id];
  return Math.max(0, Math.min(2, Number.isFinite(fallback) ? Math.round(fallback) : 1));
}

function homeDecorHidden(id) {
  return !!(state.roomLayout && state.roomLayout[id] && state.roomLayout[id].hidden);
}

/* Visible room decor: bought furniture plus the always-free pieces. */
function homeDecorLayer() {
  const bought = HOME_DECOR_PIECES
    .filter((piece) => homeUpgradeOwned(piece.id))
    .map((piece) => ({ id: piece.id, cls: piece.cls, text: piece.text, free: false }));
  const free = (typeof HOME_FREE_DECOR !== 'undefined' ? HOME_FREE_DECOR : [])
    .map((piece) => ({ id: piece.id, cls: piece.cls, text: piece.icon, free: true }));
  return [...bought, ...free].map((piece) => {
    if (homeDecorHidden(piece.id)) return '';
    return `<span class="room-deco ${piece.cls}${piece.free ? ' free-deco' : ''}" style="--x:${ROOM_SPOT_X[homeDecorSpot(piece.id)]}%" aria-hidden="true">${piece.text}</span>`;
  }).join('');
}

function sentHomeSprites() {
  return state.sprites
    .filter((s) => s.stage !== 'egg' && !s.retired && s.atHome)
    .sort((a, b) => (a.homeSince || 0) - (b.homeSince || 0));
}

function hollowSprites() {
  return state.sprites
    .filter((s) => s.stage !== 'egg' && !s.retired && !s.atHome)
    .sort((a, b) => (b.born || 0) - (a.born || 0));
}

function homeCoinsFor(s) {
  return Math.max(0, Math.floor(Number(s.homeCoins) || 0));
}

function housesList() {
  return Object.values(state.houses || {})
    .map((house) => ({
      ...house,
      members: (house.members || []).map((id) => findSprite(id)).filter((m) => m && m.stage !== 'egg'),
    }))
    .filter((house) => house.members.length > 1);
}

function houseForSprite(id) {
  return Object.values(state.houses || {}).find((house) => (house.members || []).includes(id)) || null;
}

function houseScene(house) {
  const key = house?.scene && SCENES[house.scene] ? house.scene : homeSceneFor(house?.members?.[0] || {});
  return SCENES[key] ? key : 'grove';
}

function houseBondTier(bond) {
  const value = Math.max(0, Number(bond) || 0);
  if (value >= 500) return { name: 'Family', icon: '💞' };
  if (value >= 300) return { name: 'Best friends', icon: '💖' };
  if (value >= 150) return { name: 'Close friends', icon: '💗' };
  if (value >= 60) return { name: 'Friends', icon: '💛' };
  return { name: 'Getting to know each other', icon: '🤝' };
}

function homeNeedBars(s) {
  return ['hunger', 'energy', 'joy', 'clean'].map((key) => {
    const value = Math.round(Number(s.needs?.[key]) || 0);
    const label = key === 'hunger' ? 'Food' : key === 'energy' ? 'Rest' : key === 'joy' ? 'Joy' : 'Clean';
    return `<span class="home-need ${key}" title="${label} ${value}/100"><i style="width:${value}%"></i></span>`;
  }).join('');
}

function sentHomeCard(s) {
  const key = homeSceneFor(s);
  const scene = SCENES[key] || SCENES.grove;
  const tint = sceneTint(key);
  const coins = homeCoinsFor(s);
  const house = houseForSprite(s.id);
  const bond = Math.round(Number(s.bond) || 0);
  const houseTag = house
    ? `<span class="sh-tag">🏠 Shares with ${esc(house.members.filter((id) => id !== s.id).map((id) => { const m = findSprite(id); return m ? displayName(m) : ''; }).filter(Boolean).join(' & ') || 'a friend')}</span>`
    : '';
  return `<article class="sh-card" style="--sh-a:${tint.b1};--sh-b:${tint.b2}">
    <div class="sh-art" style="background:linear-gradient(180deg, ${tint.b2}, ${tint.b1});${typeof homeRoomThemeStyle === 'function' ? homeRoomThemeStyle() : ''}">
      <span class="room-wash" aria-hidden="true"></span>
      <div class="scene-decor">${buildSceneDecor(key)}</div>
      ${homeDecorLayer()}
      <span class="sh-scene">${scene.emoji} ${esc(scene.name)}</span>
      ${s.asleep ? '<span class="sh-zzz">💤</span>' : ''}
      <span class="sh-sprite">${spriteSVG(s, { expr: s.asleep ? 'sleep' : expressionFor(s) })}</span>
    </div>
    <div class="sh-plate">
      <div class="sh-name"><b>${esc(displayName(s))}</b><span class="tiny muted">Lv ${s.level} · 💗 ${bond}</span></div>
      <div class="tiny muted sh-status">${s.asleep ? 'Sleeping long — recovering energy' : 'Relaxing, grazing, and earning coins'}${house ? ' · shared house' : ''}</div>
      <div class="home-needs">${homeNeedBars(s)}</div>
      ${houseTag}
      <div class="sh-coins"><span>🪙 ${coins} waiting</span><button class="btn btn-soft btn-sm" data-sh-collect="${s.id}" ${coins ? '' : 'disabled'}>Collect</button></div>
      <div class="home-care" role="group" aria-label="Care for ${esc(displayName(s))}">
        <button class="home-care-btn" data-sh-care="rub" data-sh-id="${s.id}" title="Belly rub">🤲</button>
        <button class="home-care-btn" data-sh-care="feed" data-sh-id="${s.id}" title="Feed">🍎</button>
        <button class="home-care-btn" data-sh-care="bath" data-sh-id="${s.id}" title="Bath">🛁</button>
        <button class="home-care-btn" data-sh-care="longsleep" data-sh-id="${s.id}" title="Long sleep">🛌</button>
      </div>
      <div class="sh-actions">
        <button class="btn btn-primary btn-sm" data-sh-one="${s.id}">💞 One on one</button>
        <button class="btn btn-soft btn-sm" data-sh-share="${s.id}">${house ? 'Change housemate' : 'Share house'}</button>
        <button class="btn btn-ghost btn-sm" data-sh-call="${s.id}">Back to the Hollow</button>
      </div>
    </div>
  </article>`;
}

function houseCard(house) {
  const key = houseScene(house);
  const scene = SCENES[key] || SCENES.grove;
  const tint = sceneTint(key);
  const bond = Math.round(Number(house.bond) || 0);
  const tier = houseBondTier(bond);
  const pct = Math.min(100, Math.round((bond / HOUSE_BOND_MAX) * 100));
  const ready = Date.now() - (Number(house.lastBondAt) || 0) > 30 * 60 * 1000;
  return `<article class="sh-house" style="--sh-a:${tint.b1};--sh-b:${tint.b2}">
    <div class="sh-house-head">
      <span>🏠</span>
      <b>${esc(house.name || `${house.members[0] ? displayName(house.members[0]) : 'A'} & ${house.members[1] ? displayName(house.members[1]) : 'friend'}`)}</b>
      <span class="chip">${scene.emoji} ${esc(scene.name)}</span>
    </div>
    <div class="sh-house-members">
      ${house.members.map((m) => `<span class="sh-house-member">${spriteSVG(m, { expr: 'happy' })}<b>${esc(displayName(m))}</b></span>`).join('')}
    </div>
    <div class="sh-house-room" style="${typeof homeRoomThemeStyle === 'function' ? homeRoomThemeStyle() : ''}"><span class="room-wash" aria-hidden="true"></span>${homeDecorLayer()}</div>
    <div class="sh-house-bond">
      <div class="between tiny"><span>${tier.icon} ${tier.name}</span><span>${bond} / ${HOUSE_BOND_MAX}</span></div>
      <div class="bar"><i style="width:${pct}%"></i></div>
    </div>
    <div class="tiny muted">${house.members.length} / ${houseMaxMembers()} beds filled${houseMaxMembers() > 2 ? ' · family house' : ' · upgrade for a third bed'}</div>
    <div class="sh-house-actions">
      <button class="btn btn-primary btn-sm" data-sh-hangout="${house.id}">🎮 Hang out together</button>
      <button class="btn btn-gold btn-sm" data-sh-bond="${house.id}" ${ready ? '' : 'disabled'}>${ready ? 'Snuggle together' : 'They are all snuggled out'}</button>
      <button class="btn btn-ghost btn-sm" data-sh-leave="${house.members[0]?.id || ''}">Split the house</button>
    </div>
    <p class="tiny muted sh-house-note">Sharing a house grows a bond every minute, even while you are away. Hangouts grow it faster.</p>
  </article>`;
}

function homeUpgradeCards() {
  return Object.values(HOME_UPGRADES).map((up) => {
    const owned = homeUpgradeOwned(up.id);
    const tier = up.requires ? 2 : 1;
    const req = up.requires ? HOME_UPGRADES[up.requires] : null;
    const reqMet = !req || homeUpgradeOwned(req.id);
    const can = state.coins >= up.price && reqMet;
    const effect = [
      up.cap ? `+${up.cap} coin cap` : '',
      up.recovery ? `×${up.recovery} recovery` : '',
      up.coins ? `×${up.coins} home coins` : '',
      up.slots ? `${up.slots} beds per house` : '',
      up.hangout ? `+${Math.round((up.hangout - 1) * 100)}% hangout bond` : '',
    ].filter(Boolean).join(' · ');
    return `<article class="sh-upgrade ${owned ? 'owned' : ''} ${tier === 2 ? 'tier2' : ''}">
      <span class="sh-upgrade-icon">${up.icon}</span>
      <span class="sh-upgrade-copy"><b>${esc(up.name)}</b><span class="tiny muted">${esc(up.blurb)}</span><span class="sh-upgrade-effect">${effect}${tier === 2 ? ' · adds decor' : ''}</span></span>
      ${owned
        ? '<span class="chip">✓ Owned</span>'
        : reqMet
          ? `<button class="btn ${can ? 'btn-gold' : 'btn-ghost'} btn-sm" data-sh-buy="${up.id}" ${can ? '' : 'disabled'}>🪙 ${up.price.toLocaleString()}</button>`
          : `<span class="chip locked">Needs ${esc(req.name)}</span>`}
    </article>`;
  }).join('');
}

/* Housemates play together on screen: a short scored round grows the bond. */
const HANGOUT_ROUND_MS = 12000;

function openHouseHangout(houseId, repaint) {
  const house = state.houses && state.houses[houseId];
  if (!house) { toast('That house is no longer together.', '🏠'); return; }
  const sceneKey = houseScene(house);
  const scene = SCENES[sceneKey] || SCENES.grove;
  const tint = sceneTint(sceneKey);
  const members = (house.members || []).map((id) => findSprite(id)).filter(Boolean);
  const tier = houseBondTier(house.bond);
  const ready = Date.now() - (Number(house.lastPlayAt) || 0) > HOUSE_PLAY_COOLDOWN;
  const games = [
    { id: 'chase', icon: '🍃', name: 'Leaf chase', toy: '🍃', line: 'They tear around the room after one very brave leaf.' },
    { id: 'picnic', icon: '🧺', name: 'Snack picnic', toy: '🍓', line: 'They split a snack and negotiate very hard over the last bite.' },
    { id: 'nap', icon: '😴', name: 'Nap pile', toy: '💤', line: 'They curl into one warm, snoring pile.' },
    { id: 'music', icon: '🎶', name: 'Kitchen dance', toy: '🎵', line: 'Someone starts a beat on a cupboard. It escalates quickly.' },
  ];

  let roundTimer = null;
  let countdown = null;
  let hopTimer = null;
  let refreshTimer = null;
  let running = false;
  let score = 0;
  let left = HANGOUT_ROUND_MS / 1000;

  const stopTimers = () => {
    if (countdown) clearInterval(countdown);
    if (hopTimer) clearTimeout(hopTimer);
    if (roundTimer) clearTimeout(roundTimer);
    if (refreshTimer) clearTimeout(refreshTimer);
    countdown = null; hopTimer = null; roundTimer = null; refreshTimer = null;
  };

  openSheet({
    title: `🏠 ${esc(house.name || 'Shared house')}`,
    sub: `${scene.emoji} ${esc(scene.name)} · ${members.length} housemates · ${tier.icon} ${tier.name}`,
    body: `<div class="hangout-stage" data-hangout-stage style="background:linear-gradient(180deg, ${tint.b2}, ${tint.b1});${typeof homeRoomThemeStyle === 'function' ? homeRoomThemeStyle() : ''}">
        <span class="room-wash" aria-hidden="true"></span>
        <div class="scene-decor">${buildSceneDecor(sceneKey)}</div>
        ${homeDecorLayer()}
        <div class="hangout-actors">${members.map((m) => `<span class="hangout-actor" data-hangout-actor="${m.id}">${spriteSVG(m, { expr: 'happy' })}<b>${esc(displayName(m))}</b></span>`).join('')}</div>
        <div class="hg-hud" data-hg-hud hidden><span>🫶 <b data-hg-score>0</b> catches</span><span>⏱ <b data-hg-time>${left}</b>s</span></div>
        <button class="hg-target" data-hg-target hidden aria-label="Tap the toy"></button>
        <div class="hangout-line" data-hangout-line>Pick a game, then tap the toy as it hops around the room.</div>
        <div class="hangout-hearts" data-hangout-hearts></div>
      </div>
      <div class="sh-house-bond" style="margin-top:10px">
        <div class="between tiny"><span>${tier.icon} ${tier.name}</span><span data-hangout-bond>${Math.round(Number(house.bond) || 0)} / ${HOUSE_BOND_MAX}</span></div>
        <div class="bar"><i data-hangout-bar style="width:${Math.min(100, Math.round(((Number(house.bond) || 0) / HOUSE_BOND_MAX) * 100))}%"></i></div>
      </div>
      <div class="hangout-grid" data-hangout-games>
        ${games.map((g) => `<button class="oo-btn hangout-btn" data-hangout-play="${g.id}" ${ready ? '' : 'disabled'}>${g.icon}<b>${g.name}</b><span>${ready ? 'tap the toy · 12s round' : 'catching their breath'}</span></button>`).join('')}
      </div>
      <div class="hg-result" data-hg-result hidden></div>
      <p class="tiny muted" style="margin-top:8px;line-height:1.5">Every catch grows house bond, lifts everyone’s joy, and pays a coin or two. Housemates who play together also bond faster every minute.</p>`,
    onClose: () => { running = false; stopTimers(); },
    onMount: (overlay) => {
      const root = overlay.querySelector('.sheet') || overlay;
      const stage = overlay.querySelector('[data-hangout-stage]');
      const target = overlay.querySelector('[data-hg-target]');
      const hud = overlay.querySelector('[data-hg-hud]');
      const scoreEl = overlay.querySelector('[data-hg-score]');
      const timeEl = overlay.querySelector('[data-hg-time]');
      const lineEl = overlay.querySelector('[data-hangout-line]');
      const hearts = overlay.querySelector('[data-hangout-hearts]');
      const bondEl = overlay.querySelector('[data-hangout-bond]');
      const barEl = overlay.querySelector('[data-hangout-bar]');
      const resultEl = overlay.querySelector('[data-hg-result]');
      const gameButtons = () => root.querySelectorAll('[data-hangout-play]');

      const setBond = () => {
        const fresh = state.houses[houseId];
        if (!fresh) return;
        if (bondEl) bondEl.textContent = `${Math.round(Number(fresh.bond) || 0)} / ${HOUSE_BOND_MAX}`;
        if (barEl) barEl.style.width = `${Math.min(100, Math.round(((Number(fresh.bond) || 0) / HOUSE_BOND_MAX) * 100))}%`;
      };

      const hop = () => {
        if (!running || !target) return;
        if (hopTimer) clearTimeout(hopTimer);
        target.style.left = `${rand(10, 76)}%`;
        target.style.top = `${rand(28, 62)}%`;
        hopTimer = setTimeout(hop, rand(620, 1000));
      };

      const finish = (game) => {
        if (!running) return;
        running = false;
        stopTimers();
        if (target) target.hidden = true;
        if (hud) hud.hidden = true;
        const res = Actions.housePlay(houseId, game.id, score);
        if (!res.ok) {
          if (lineEl) lineEl.textContent = res.reason === 'cooling' ? 'They need a moment to catch their breath.' : 'They need a housemate to play with.';
          return;
        }
        setBond();
        if (lineEl) lineEl.textContent = `${game.line} ${score} catch${score === 1 ? '' : 'es'}!`;
        if (resultEl) {
          resultEl.hidden = false;
          resultEl.innerHTML = `<b>+${res.bond} house bond</b><span>🪙 +${res.coins} coins · 💗 everyone’s joy up · ${score} catches</span>`;
        }
        if (hearts) {
          hearts.innerHTML = '<span>💗</span><span>💞</span><span>💗</span>';
          setTimeout(() => { if (hearts) hearts.innerHTML = ''; }, 2400);
        }
        overlay.querySelectorAll('.hangout-actor').forEach((actor) => {
          actor.classList.add('playing');
          setTimeout(() => actor.classList.remove('playing'), 1500);
        });
        burstOn(stage, ['💗', '💞', '✨'], 10);
        Sfx.win();
        toast(`${res.names}: ${score} catches · house bond +${res.bond} · +${res.coins} coins`, '💞');
        gameButtons().forEach((b) => { b.disabled = true; const sub = b.querySelector('span'); if (sub) sub.textContent = 'catching their breath'; });
        refreshTimer = setTimeout(() => {
          gameButtons().forEach((b) => { b.disabled = false; const sub = b.querySelector('span'); if (sub) sub.textContent = 'tap the toy · 12s round'; });
        }, HOUSE_PLAY_COOLDOWN + 1000);
        if (repaint) repaint();
      };

      const start = (game) => {
        if (running) return;
        if (Date.now() - (Number(state.houses[houseId]?.lastPlayAt) || 0) < HOUSE_PLAY_COOLDOWN) {
          toast('They just played. Give them a minute to catch their breath.', '🏠');
          return;
        }
        score = 0;
        left = HANGOUT_ROUND_MS / 1000;
        running = true;
        if (resultEl) { resultEl.hidden = true; resultEl.innerHTML = ''; }
        if (target) { target.hidden = false; target.textContent = game.toy; }
        if (hud) hud.hidden = false;
        if (scoreEl) scoreEl.textContent = '0';
        if (timeEl) timeEl.textContent = String(left);
        if (lineEl) lineEl.textContent = `${game.name} — tap the ${game.toy} before it hops away!`;
        gameButtons().forEach((b) => { b.disabled = true; });
        hop();
        countdown = setInterval(() => {
          left -= 1;
          if (timeEl) timeEl.textContent = String(Math.max(0, left));
          if (left <= 0) finish(game);
        }, 1000);
        roundTimer = setTimeout(() => finish(game), HANGOUT_ROUND_MS);
      };

      root.addEventListener('click', (event) => {
        const playBtn = event.target.closest('[data-hangout-play]');
        if (playBtn) {
          event.stopPropagation();
          if (playBtn.disabled) return;
          const game = games.find((g) => g.id === playBtn.dataset.hangoutPlay);
          if (game) start(game);
          return;
        }
        if (event.target.closest('[data-hg-target]')) {
          event.stopPropagation();
          if (!running) return;
          score += 1;
          if (scoreEl) scoreEl.textContent = String(score);
          if (score % 4 === 0) Sfx.coin(); else Sfx.pop();
          burstOn(target, ['✨'], 3);
          hop();
        }
      });
    },
  });
}

function roomDecorRows() {
  const owned = Object.values(HOME_UPGRADES).filter((up) => homeUpgradeOwned(up.id));
  const row = (id, icon, name, free) => {
    const spot = homeDecorSpot(id);
    const hidden = homeDecorHidden(id);
    return `<div class="decor-row">
      <span class="decor-row-icon">${icon}</span>
      <span class="decor-row-copy"><b>${esc(name)}</b><span class="tiny muted">${['Left wall', 'Centre', 'Right wall'][spot]}${hidden ? ' · tucked away' : ''}${free ? ' · free' : ''}</span></span>
      <button class="btn btn-ghost btn-sm" data-decor-move="${id}" aria-label="Move ${esc(name)}">↔️</button>
      <button class="btn btn-soft btn-sm" data-decor-hide="${id}">${hidden ? 'Show' : 'Hide'}</button>
    </div>`;
  };
  const boughtRows = owned.length
    ? owned.map((up) => row(up.id, up.icon, up.name, false)).join('')
    : '<p class="tiny muted">Buy a room upgrade and its furniture appears here. The free pieces below are always yours.</p>';
  const freeRows = (typeof HOME_FREE_DECOR !== 'undefined' ? HOME_FREE_DECOR : [])
    .map((piece) => row(piece.id, piece.icon, piece.name, true)).join('');
  const themes = (typeof HOME_ROOM_THEMES !== 'undefined' ? Object.entries(HOME_ROOM_THEMES) : [])
    .map(([key, theme]) => `<button class="theme-swatch ${state.roomTheme === key ? 'on' : ''}" type="button" data-room-theme="${key}" title="${esc(theme.name)} — free">
      <span class="theme-dot" style="background:${theme.glow};box-shadow:inset 0 0 0 6px ${theme.wall}"></span>
      <span class="tiny">${esc(theme.name)}</span>
    </button>`).join('');
  return `${boughtRows}
    <div class="decor-split">Free decor · always yours</div>
    ${freeRows}
    <div class="decor-split">Room colours · all free</div>
    <div class="theme-swatches">${themes}</div>`;
}

function roomDecorPreview() {
  const decor = homeDecorLayer();
  return `<div class="decor-preview room-themed" style="${typeof homeRoomThemeStyle === 'function' ? homeRoomThemeStyle() : ''}"><span class="room-wash" aria-hidden="true"></span>${decor}${decor ? '' : '<span class="decor-empty tiny muted">No furniture placed yet</span>'}</div>`;
}

function openRoomDecorator(repaint) {
  openSheet({
    title: '🛋️ Decorate the room',
    sub: 'Every upgrade you own is furniture, and the free pieces and room colours cost nothing. Move each piece between the left wall, the centre, and the right wall, or tuck it away.',
    body: `<div data-decor-preview>${roomDecorPreview()}</div>
      <div class="decor-list" data-decor-list>${roomDecorRows()}</div>
      <p class="tiny muted" style="margin-top:8px;line-height:1.5">Your arrangement shows in every room: home cards, shared-house strips, hangout stages, and one-on-one visits. It is saved with your Hollow.</p>`,
    onMount: (overlay) => {
      const root = overlay.querySelector('.sheet') || overlay;
      const preview = overlay.querySelector('[data-decor-preview]');
      const list = overlay.querySelector('[data-decor-list]');
      const paint = () => {
        if (preview) preview.innerHTML = roomDecorPreview();
        if (list) list.innerHTML = roomDecorRows();
      };
      root.addEventListener('click', (event) => {
        const move = event.target.closest('[data-decor-move]');
        const hide = event.target.closest('[data-decor-hide]');
        const theme = event.target.closest('[data-room-theme]');
        if (!move && !hide && !theme) return;
        event.stopPropagation();
        if (theme) {
          Actions.setRoomTheme(theme.dataset.roomTheme);
          Sfx.click();
          paint();
          if (repaint) repaint();
          return;
        }
        if (move) {
          const id = move.dataset.decorMove;
          Actions.setRoomPiece(id, { spot: (homeDecorSpot(id) + 1) % 3 });
          Sfx.click();
        } else {
          const id = hide.dataset.decorHide;
          Actions.setRoomPiece(id, { hidden: !homeDecorHidden(id) });
          Sfx.pop();
        }
        paint();
        if (repaint) repaint();
      });
    },
  });
}

function sentHomeBody() {
  const home = sentHomeSprites();
  const away = hollowSprites();
  const houses = housesList();
  const coins = home.reduce((sum, s) => sum + homeCoinsFor(s), 0);
  const chips = [
    `🏠 ${home.length} sent home`,
    `🪙 ${coins.toLocaleString()} waiting`,
    houses.length ? `💞 ${houses.length} shared house${houses.length === 1 ? '' : 's'}` : '',
    `🐾 ${away.length} in the Hollow`,
  ].filter(Boolean).map((label) => `<span class="chip">${label}</span>`).join('');

  if (!home.length && !away.length && !houses.length) {
    return `<div class="card empty-state">
      <div style="font-size:36px">🏠</div>
      <h3 style="font-size:15px;margin:8px 0 4px">No one home yet</h3>
      <p class="small muted">Hatch a sprite and send them home for a long rest, a warm meal, and a little pocket money.</p>
    </div>`;
  }

  return `<div class="sh-intro">${chips}</div>
    <div class="sh-section-head"><h2>🛠️ Room upgrades</h2><span>${homeCoinCap()} coin cap · ${houseMaxMembers()} beds per house</span><button class="btn btn-soft btn-sm" data-sh-decorate>🛋️ Decorate</button></div>
    <div class="sh-upgrades">${homeUpgradeCards()}</div>
    <div class="sh-section-head"><h2>🏠 At home</h2><span>${home.length ? 'Relaxing, eating, and earning coins' : 'Nobody is home right now'}</span></div>
    <div class="sh-grid">${home.length ? home.map(sentHomeCard).join('') : '<div class="card empty-state" style="grid-column:1/-1"><div style="font-size:30px">🌙</div><p class="small muted" style="margin:8px 0 0">Send a sprite home from the list below and they will start recovering right away.</p></div>'}</div>
    ${houses.length ? `<div class="sh-section-head"><h2>💞 Shared houses</h2><span>${houses.length} household${houses.length === 1 ? '' : 's'} building a bond</span></div>
      <div class="sh-house-grid">${houses.map(houseCard).join('')}</div>` : `<div class="card sh-bond-hint"><b>💞 Shared houses</b><p class="small muted" style="margin:4px 0 0;line-height:1.55">Send two sprites home, then tap <b>Share house</b> on one of them. Housemates build a bond every minute, hang out together, and grow closer while you are away. The <b>Spare Bedroom</b> upgrade opens a third bed in every house.</p></div>`}
    <div class="sh-section-head"><h2>🐾 In the Hollow</h2><span>${away.length} sprite${away.length === 1 ? '' : 's'} out and about</span></div>
    <div class="sh-list">
      ${away.length ? away.map((s) => `<div class="sh-row">
        <span class="sh-row-art">${spriteSVG(s, { expr: expressionFor(s) })}</span>
        <span class="sh-row-copy">
          <b>${esc(displayName(s))}</b>
          <span class="tiny muted">${moodOf(s).icon} ${moodOf(s).label} · Food ${Math.round(s.needs.hunger)} · Rest ${Math.round(s.needs.energy)} · 💗 ${Math.round(s.bond)}</span>
        </span>
        <button class="btn btn-primary btn-sm" data-sh-send="${s.id}">Send home</button>
      </div>`).join('') : '<p class="tiny muted" style="text-align:center">Everyone is home. The Hollow is quiet.</p>'}
    </div>
    <p class="tiny muted sh-foot">Sent-home sprites relax, eat, recover all four needs, sleep long, and earn up to ${homeCoinCap()} coins while you are away. Collect their coins any time, or bring them back to the Hollow to play.</p>`;
}

function sentHomeScreen(root) {
  root.innerHTML = `
    <div class="screen-head">
      <div><div class="eyebrow">Their own room</div><h1>Sent Home</h1><p>Set a sprite down at home to rest, eat, and earn. Visit for one-on-one time.</p></div>
      <button class="icon-btn" data-sh-goto-hollow aria-label="Back to the Hollow">${icon('hollow')}</button>
    </div>
    <div data-sh-body>${sentHomeBody()}</div>`;

  const body = root.querySelector('[data-sh-body]');
  const repaint = () => { body.innerHTML = sentHomeBody(); };

  root.querySelector('[data-sh-goto-hollow]')?.addEventListener('click', () => App.go('hollow'));

  const onClick = (event) => {
    const send = event.target.closest('[data-sh-send]');
    if (send) {
      const res = Actions.sendHome(send.dataset.shSend);
      if (res.ok) {
        Sfx.pop();
        toast('Sent home. They will rest, eat, and earn coins until you call them back.', '🏠');
      } else {
        toast('They are already home.', '🏠');
      }
      repaint();
      return;
    }
    const collect = event.target.closest('[data-sh-collect]');
    if (collect) {
      const res = Actions.collectHome(collect.dataset.shCollect);
      if (res.ok && res.coins) {
        Sfx.coin();
        toast(`+${res.coins.toLocaleString()} coins collected from home.`, '🪙');
      }
      repaint();
      return;
    }
    const buy = event.target.closest('[data-sh-buy]');
    if (buy) {
      const res = Actions.buyHomeUpgrade(buy.dataset.shBuy);
      if (!res.ok) {
        toast(res.reason === 'requires' ? `That needs ${HOME_UPGRADES[res.missing]?.name || 'another upgrade'} first.` : res.reason === 'coins' ? `You need ${(res.need || 0).toLocaleString()} more coins for that upgrade.` : 'That upgrade is already yours.', '🛠️');
        Sfx.error();
      } else {
        Sfx.level();
        burstOn(buy, ['🛠️', '✨', '🪙'], 9);
        toast(`${res.upgrade.name} installed in every room.`, '🛠️');
      }
      repaint();
      return;
    }
    const hangout = event.target.closest('[data-sh-hangout]');
    if (hangout) {
      Sfx.click();
      openHouseHangout(hangout.dataset.shHangout, repaint);
      return;
    }
    const decorate = event.target.closest('[data-sh-decorate]');
    if (decorate) {
      Sfx.click();
      openRoomDecorator(repaint);
      return;
    }
    const care = event.target.closest('[data-sh-care]');
    if (care) {
      sentHomeCare(care.dataset.shId, care.dataset.shCare, repaint);
      return;
    }
    const one = event.target.closest('[data-sh-one]');
    if (one) {
      Sfx.click();
      openOneOnOne(one.dataset.shOne, repaint);
      return;
    }
    const share = event.target.closest('[data-sh-share]');
    if (share) {
      Sfx.click();
      openShareHousePicker(share.dataset.shShare, repaint);
      return;
    }
    const call = event.target.closest('[data-sh-call]');
    if (call) {
      const res = Actions.callBack(call.dataset.shCall);
      if (res.ok) {
        Sfx.win();
        toast(`${res.coins ? `+${res.coins.toLocaleString()} coins, and ` : ''}they are back in the Hollow.`, '🐾');
      }
      repaint();
      return;
    }
    const bond = event.target.closest('[data-sh-bond]');
    if (bond) {
      const res = Actions.bondHouse(bond.dataset.shBond);
      if (res.ok) {
        Sfx.win();
        burstOn(bond, ['💞', '✨', '💗'], 8);
        toast(`${res.names} snuggle up. House bond +${res.bond}${res.coins ? ` · +${res.coins} coins` : ''}.`, '💞');
      } else {
        toast('They just had a cuddle. Give them a little while.', '💞');
      }
      repaint();
      return;
    }
    const leave = event.target.closest('[data-sh-leave]');
    if (leave) {
      const res = Actions.leaveHouse(leave.dataset.shLeave);
      if (res.ok) toast('The house is split. Both sprites keep their own rooms.', '🏠');
      repaint();
    }
  };
  root.addEventListener('click', onClick);

  return () => root.removeEventListener('click', onClick);
}

function sentHomeCare(spriteId, kind, repaint) {
  const s = findSprite(spriteId);
  if (!s) return;
  if (kind === 'feed') {
    openHomeFeedPicker(spriteId, repaint);
    return;
  }
  if (kind === 'rub') {
    const res = Actions.rubBelly(spriteId);
    toast(res && res.cooled ? `${displayName(s)} is still blissed out.` : `${displayName(s)} rolls over for a belly rub.`, '🤲');
  } else if (kind === 'bath') {
    Actions.bathe(spriteId);
    toast(`${displayName(s)} is squeaky clean.`, '🛁');
  } else if (kind === 'longsleep') {
    if (s.asleep) {
      Actions.wake(spriteId);
      toast(`${displayName(s)} blinks awake.`, '☀️');
    } else {
      Actions.homeLongSleep(spriteId);
      toast(`${displayName(s)} curls up for a long, long sleep.`, '🛌');
    }
  }
  Sfx.click();
  if (repaint) repaint();
}

function openOneOnOne(spriteId, repaint) {
  const s = findSprite(spriteId);
  if (!s) return;
  const sceneKey = homeSceneFor(s);
  const scene = SCENES[sceneKey] || SCENES.grove;
  const tint = sceneTint(sceneKey);
  const house = houseForSprite(s.id);
  const { close } = openSheet({
    title: `💞 ${esc(displayName(s))}`,
    sub: `One on one at home · ${scene.emoji} ${esc(scene.name)}${house ? ' · shared house' : ''}`,
    body: `<div class="oo-hero" style="background:linear-gradient(180deg, ${tint.b2}, ${tint.b1})">
        <div class="scene-decor">${buildSceneDecor(sceneKey)}</div>
        ${homeDecorLayer()}
        <span class="oo-art">${spriteSVG(s, { expr: s.asleep ? 'sleep' : expressionFor(s) })}</span>
        <span class="oo-status">${s.asleep ? '😴 Fast asleep' : `${moodOf(s).icon} ${moodOf(s).label}`} · 💗 ${Math.round(s.bond)} bond</span>
      </div>
      <div class="home-needs" style="margin-top:10px">${homeNeedBars(s)}</div>
      <div class="oo-grid">
        <button class="oo-btn" data-oo="rub">🤲<b>Belly rub</b><span>+joy, +bond</span></button>
        <button class="oo-btn" data-oo="feed">🍎<b>Feed</b><span>from the pantry</span></button>
        <button class="oo-btn" data-oo="bath">🛁<b>Bath</b><span>clean + joy</span></button>
        <button class="oo-btn" data-oo="fetch">🎾<b>Play fetch</b><span>coins + bond</span></button>
        <button class="oo-btn" data-oo="talk">💬<b>Talk</b><span>a quiet moment</span></button>
        <button class="oo-btn" data-oo="sleep">${s.asleep ? '☀️' : '🛌'}<b>${s.asleep ? 'Wake up' : 'Long sleep'}</b><span>${s.asleep ? 'start the day' : 'deep recovery'}</span></button>
        <button class="oo-btn" data-oo-game="catch">🍓<b>Treat Catch</b><span>one-on-one game</span></button>
        <button class="oo-btn" data-oo-game="pulse">🎯<b>Pulse Match</b><span>one-on-one game</span></button>
      </div>
      <div class="oo-house">${house
        ? `🏠 Sharing with ${esc(house.members.filter((m) => m.id !== s.id).map((m) => displayName(m)).join(' & ') || 'a friend')} · ${houseBondTier(house.bond).icon} ${houseBondTier(house.bond).name}`
        : 'Send a housemate home and share a house to start a bond.'}</div>
      <div class="row" style="gap:8px;margin-top:10px">
        <button class="btn btn-soft btn-block" data-oo-share>${house ? 'Change housemate' : '🏠 Share house'}</button>
        <button class="btn ${s.atHome ? 'btn-ghost' : 'btn-primary'} btn-block" data-oo-toggle>${s.atHome ? 'Back to the Hollow' : 'Send home'}</button>
      </div>`,
    onMount: (overlay) => {
      const sheet = overlay.querySelector('.sheet') || overlay;
      sheet.addEventListener('click', (event) => {
        const action = event.target.closest('[data-oo]');
        if (action) {
          event.stopPropagation();
          const kind = action.dataset.oo;
          const sprite = findSprite(spriteId);
          if (!sprite) return;
          if (kind === 'rub') {
            const res = Actions.rubBelly(spriteId);
            toast(res && res.cooled ? `${displayName(sprite)} is still blissed out.` : `${displayName(sprite)} melts into the floor.`, '🤲');
          } else if (kind === 'feed') {
            openHomeFeedPicker(spriteId, () => { close(); openOneOnOne(spriteId, repaint); if (repaint) repaint(); });
            return;
          } else if (kind === 'bath') {
            Actions.bathe(spriteId);
            toast(`${displayName(sprite)} is squeaky clean.`, '🛁');
          } else if (kind === 'fetch') {
            const res = Actions.playCatch(spriteId, 'throw', 4);
            if (res.ok) {
              toast(`+${res.coins} coins · +${res.xp} XP · a very good game of fetch.`, '🎾');
              Sfx.win();
              burstOn(action, ['🎾', '💗', '🪙'], 7);
            }
          } else if (kind === 'talk') {
            const res = Actions.chat(spriteId, 'hi');
            const greeting = (ELEMENTS[sprite.element] || ELEMENTS.bloom).greeting || 'They chirp happily at you.';
            toast(`${displayName(sprite)}: “${greeting}”${res.coins ? ` · +${res.coins} coins` : ''}`, '💬');
          } else if (kind === 'sleep') {
            if (sprite.asleep) {
              Actions.wake(spriteId);
              toast(`${displayName(sprite)} wakes up slowly.`, '☀️');
            } else {
              Actions.homeLongSleep(spriteId);
              toast(`${displayName(sprite)} curls up for a long sleep.`, '🛌');
            }
          }
          Sfx.click();
          close();
          setTimeout(() => openOneOnOne(spriteId, repaint), 40);
          if (repaint) repaint();
          return;
        }
        const game = event.target.closest('[data-oo-game]');
        if (game) {
          event.stopPropagation();
          const kind = game.dataset.ooGame;
          close();
          if (spriteId !== state.activeId) Actions.setActive(spriteId);
          setTimeout(() => App.startGame(kind), 60);
          return;
        }
        if (event.target.closest('[data-oo-share]')) {
          event.stopPropagation();
          close();
          setTimeout(() => openShareHousePicker(spriteId, repaint), 40);
          return;
        }
        if (event.target.closest('[data-oo-toggle]')) {
          event.stopPropagation();
          if (s.atHome) {
            const res = Actions.callBack(spriteId);
            if (res.ok) toast(`${res.coins ? `+${res.coins} coins, and ` : ''}back in the Hollow.`, '🐾');
          } else {
            Actions.sendHome(spriteId);
            toast('Sent home for a long rest.', '🏠');
          }
          close();
          if (repaint) repaint();
          if (App.tab === 'senthome') App.refresh();
        }
      });
    },
  });
}

function openShareHousePicker(spriteId, repaint) {
  const s = findSprite(spriteId);
  if (!s) return;
  if (!s.atHome) {
    toast('Send them home first, then pick a housemate.', '🏠');
    return;
  }
  const candidates = sentHomeSprites().filter((other) => other.id !== spriteId);
  const current = houseForSprite(spriteId);
  const rows = candidates.map((other) => `<button class="sh-share-row ${current && current.members.includes(other.id) ? 'on' : ''}" data-sh-pick="${other.id}">
      <span class="sh-share-art">${spriteSVG(other, { expr: 'happy' })}</span>
      <span class="sh-share-copy"><b>${esc(displayName(other))}</b><span class="tiny muted">${moodOf(other).icon} ${moodOf(other).label} · 💗 ${Math.round(other.bond)} · ${esc(SCENES[homeSceneFor(other)]?.name || 'Home')}</span></span>
      ${current && current.members.includes(other.id) ? '<span class="chip">Housemate</span>' : '<span class="chip">Pick</span>'}
    </button>`).join('');
  openSheet({
    title: '🏠 Share a house',
    sub: candidates.length
      ? `Pick who shares ${esc(displayName(s))}’s room. Housemates build a bond every minute, even while you are away.${houseMaxMembers() > 2 ? ' The Spare Bedroom upgrade allows a third housemate.' : ' Upgrade to the Spare Bedroom to add a third housemate.'}`
      : 'A shared house needs at least two sprites sent home.',
    body: rows
      ? `<div class="sh-share-list">${rows}</div>`
      : `<div class="card empty-state"><div style="font-size:30px">🛏️</div><p class="small muted" style="margin:8px 0 0">Send another sprite home first — the room is more fun with a friend.</p></div>`,
    onMount: (overlay, close) => {
      overlay.querySelectorAll('[data-sh-pick]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const res = Actions.shareHouse(spriteId, btn.dataset.shPick);
          if (res.ok) {
            Sfx.win();
            toast(`${displayName(s)} and ${displayName(findSprite(btn.dataset.shPick))} now share a house.`, '🏠');
          } else {
            toast('That pair already shares a house.', '🏠');
          }
          close();
          if (repaint) repaint();
          if (App.tab === 'senthome') App.refresh();
        });
      });
    },
  });
}

function openSentHomeSheet() {
  openSheet({
    title: '🏠 Sent Home',
    sub: 'Every sprite can go home to relax, eat, recover, sleep long, and earn coins — or share a house and grow a bond.',
    body: `<div data-sh-sheet-body>${sentHomeBody()}</div>`,
    onMount: (overlay, close) => {
      const sheet = overlay.querySelector('.sheet') || overlay;
      const body = overlay.querySelector('[data-sh-sheet-body]');
      const repaint = () => { if (body) body.innerHTML = sentHomeBody(); };
      sheet.addEventListener('click', (event) => {
        const send = event.target.closest('[data-sh-send]');
        if (send) {
          event.stopPropagation();
          Actions.sendHome(send.dataset.shSend);
          toast('Sent home for a long rest.', '🏠');
          repaint();
          return;
        }
        const one = event.target.closest('[data-sh-one]');
        if (one) {
          event.stopPropagation();
          close();
          setTimeout(() => openOneOnOne(one.dataset.shOne, null), 40);
          return;
        }
        const buy = event.target.closest('[data-sh-buy]');
        if (buy) {
          event.stopPropagation();
          const res = Actions.buyHomeUpgrade(buy.dataset.shBuy);
          if (res.ok) toast(`${res.upgrade.name} installed in every room.`, '🛠️');
          else toast(res.reason === 'requires' ? `That needs ${HOME_UPGRADES[res.missing]?.name || 'another upgrade'} first.` : res.reason === 'coins' ? `You need ${(res.need || 0).toLocaleString()} more coins.` : 'That upgrade is already yours.', '🛠️');
          repaint();
          return;
        }
        const hangout = event.target.closest('[data-sh-hangout]');
        if (hangout) {
          event.stopPropagation();
          close();
          setTimeout(() => openHouseHangout(hangout.dataset.shHangout, null), 40);
          return;
        }
        const decorate = event.target.closest('[data-sh-decorate]');
        if (decorate) {
          event.stopPropagation();
          close();
          setTimeout(() => openRoomDecorator(null), 40);
          return;
        }
        const call = event.target.closest('[data-sh-call]');
        if (call) {
          event.stopPropagation();
          const res = Actions.callBack(call.dataset.shCall);
          if (res.ok) toast(`${res.coins ? `+${res.coins} coins, and ` : ''}back in the Hollow.`, '🐾');
          repaint();
          return;
        }
      });
    },
  });
}
