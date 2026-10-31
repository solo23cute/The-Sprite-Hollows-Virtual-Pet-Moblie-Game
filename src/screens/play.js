/* Activities hub: classic games plus the arcade challenge track. */

function playScreen(root) {
  ensureArcadePeriods();
  const rarityChip = (s) => {
    const key = spriteRarityKey(s);
    const rarity = TYPE_EGG_RARITIES[key];
    const bonus = spriteRarityBonus(s);
    const gift = ['common', 'uncommon'].includes(key) ? ' · gifts +25%' : '';
    return `<span class="chip">${rarity.name}${bonus ? ` · +${bonus.toLocaleString()} / game` : ''}${gift}</span>`;
  };
  const rarityPayouts = RARITY_TIER_ORDER.map((key) => {
    const gift = ['common', 'uncommon'].includes(key) ? ' · gifts +25%' : '';
    return `<span class="chip">${TYPE_EGG_RARITIES[key].name} +${RARITY_COIN_BONUS[key].toLocaleString()}${gift}</span>`;
  }).join('');

  const cardFor = (key) => {
    const g = GAME_INFO[key];
    const trail = !!g.walkGame;
    const sport = !!g.sportGame;
    const need = trail ? (g.walkUnlock || 0) : sport ? 0 : (g.unlock || 0);
    const progress = trail ? (state.stats.walks || 0) : (state.stats.checkins || 0);
    const missing = Math.max(0, need - progress);
    const locked = !sport && missing > 0;
    const arcade = arcadeGameKind(key);
    const kindTag = sport ? 'sport' : trail ? 'trail' : arcade ? 'arcade' : '';
    const lockText = trail ? `Take ${missing} more walk${missing === 1 ? '' : 's'} to unlock this trail.` : `Check in ${missing} more time${missing === 1 ? '' : 's'} to unlock this game.`;
    return `<button class="game-card ${locked ? 'locked' : ''} ${arcade ? 'arcade-card' : ''}" data-game="${key}" ${locked ? 'disabled' : ''}>
      <span class="game-icon" style="--g1:${g.g1};--g2:${g.g2}">${locked ? '🔒' : g.icon}</span>
      <span style="flex:1;min-width:0">
        <h3>${g.title}${kindTag ? ` <span class="arcade-tag">${kindTag}</span>` : ''}</h3>
        <p>${locked ? lockText : g.desc}</p>
        <span class="g-meta"><span class="chip">${g.tag}</span><span class="chip">🪙 coins</span><span class="chip">⭐ XP</span>${sport ? '<span class="chip">🍲 food</span><span class="chip">🎁 sport gift</span>' : trail ? '<span class="chip">💗 extra bond</span><span class="chip">🎁 trail gift</span><span class="chip">🎲 tier · evolve · coins</span>' : ''}${arcade ? '<span class="chip">🎁 bonus track</span>' : ''}${locked ? `<span class="chip">🔒 ${need} ${trail ? 'walks' : 'check-ins'}</span>` : ''}</span>
      </span>
      <span class="go">${icon(locked ? 'lock' : 'chevron')}</span>
    </button>`;
  };

  const arcadeKeys = ARCADE_GAME_KEYS.filter((key) => GAME_INFO[key]);
  const walkKeys = typeof WALK_GAME_KEYS !== 'undefined' ? WALK_GAME_KEYS.filter((key) => GAME_INFO[key]) : [];
  const sportKeys = typeof SPORT_GAME_KEYS !== 'undefined' ? SPORT_GAME_KEYS.filter((key) => GAME_INFO[key]) : [];
  const classicKeys = Object.keys(GAME_INFO).filter((key) => !ARCADE_GAME_KEYS.includes(key) && !walkKeys.includes(key) && !sportKeys.includes(key));
  const walkTotal = typeof walkCount === 'function' ? walkCount() : 0;
  const walkGiftWait = typeof walkGiftIn === 'function' ? walkGiftIn() : 3;
  const sportTotal = typeof sportCount === 'function' ? sportCount() : 0;
  const sportGiftWait = typeof sportGiftIn === 'function' ? sportGiftIn() : 2;
  const careTotal = typeof CARE_BEAR_TOTAL === 'number' ? CARE_BEAR_TOTAL : 17;
  const careOwned = typeof careBearCount === 'function' ? careBearCount() : 0;
  const careEvery = typeof CARE_PACKAGE_EVERY === 'number' ? CARE_PACKAGE_EVERY : 3;
  const careTokens = Math.max(0, Number(state.care?.tokens) || 0);
  const careNext = typeof carePackageIn === 'function' ? carePackageIn() : careEvery;
  const careGifts = Math.max(0, Number(state.care?.gifts) || 0);
  const careActive = typeof isCareBearSprite === 'function' && isCareBearSprite(activeSprite());
  const arcade = ensureArcadePeriods();
  const nextAt = arcadeNextBonusAt(arcade);
  const bonusReady = arcade.coins >= nextAt;
  const bonusPct = Math.min(100, (arcade.coins / nextAt) * 100);
  const bonusIndex = (arcade.bonusClaims || 0) + 1;
  const nextBonusFeast = bonusIndex % ARCADE_BONUS_FEAST_EVERY === 0;
  const monthGiftsHTML = ARCADE_MONTH_GIFTS.map((gift) => {
    const claimed = arcade.monthClaims.includes(gift.id);
    const ready = !claimed && arcade.monthCoins >= gift.at;
    const pct = Math.min(100, (arcade.monthCoins / gift.at) * 100);
    const missing = Math.max(0, gift.at - arcade.monthCoins);
    return `<div class="arcade-gift ${ready ? 'ready' : ''} ${claimed ? 'claimed' : ''}">
      <span class="arcade-gift-icon">${claimed ? '✓' : gift.icon}</span>
      <span class="arcade-gift-main">
        <b>${gift.label}</b>
        <span>${claimed ? 'Claimed this month' : ready ? gift.blurb : `${missing.toLocaleString()} arcade coins to go`}</span>
        ${!claimed ? `<span class="arcade-mini-progress"><i style="width:${pct}%"></i></span>` : ''}
      </span>
      ${claimed
        ? '<span class="chip" style="color:var(--good)">✓</span>'
        : `<button class="btn ${ready ? 'btn-gold' : 'btn-ghost'}" data-month-gift="${gift.id}" ${ready ? '' : 'disabled'}>${ready ? 'Claim' : `+${gift.coins}`}</button>`}
    </div>`;
  }).join('');

  root.innerHTML = `
    <div class="screen-head">
      <div><div class="eyebrow">Play together</div><h1>Activities</h1><p>${Object.keys(GAME_INFO).length} games and trails. Coins, XP, bonds, and gifts.</p></div>
      <span class="chip">${icon('coin')} <span data-play-coins>${state.coins}</span></span>
    </div>
    <div data-play-pet></div>
    <div class="game-group-label"><b>Trail walks</b><span>${walkTotal} walk${walkTotal === 1 ? '' : 's'} · trail gift in ${walkGiftWait}</span></div>
    <div class="game-cards">${walkKeys.map(cardFor).join('')}</div>
    <div class="game-group-label"><b>Sports</b><span>${sportTotal} played · sport gift in ${sportGiftWait}</span></div>
    <div class="game-cards">${sportKeys.map(cardFor).join('')}</div>
    <div class="game-group-label"><b>Care Bears &amp; Cousins</b><span>${careOwned}/${careTotal} met · ${careGifts} care package${careGifts === 1 ? '' : 's'}</span></div>
    <div class="card" style="padding:14px;margin-bottom:16px;border-color:rgba(255,158,199,.34);background:linear-gradient(135deg,rgba(255,158,199,.10),rgba(139,123,255,.06))">
      <div class="between" style="align-items:flex-start;gap:8px">
        <div><div class="arcade-kicker">🌈 Care Bears &amp; Cousins</div><h3 style="margin:3px 0 5px">Care Packages for every activity</h3></div>
        <span class="chip">${careOwned}/${careTotal} met</span>
      </div>
      <p class="tiny muted" style="line-height:1.55;margin:0 0 9px">Activate a Care Bear or Cousin, then finish any game, trail, or sport. Every <b>${careEvery}</b> activities wraps coins, XP, pantry food, and a snack. Their genes also add game coins and speed up gifts.</p>
      <div class="between tiny muted" style="gap:8px;margin-bottom:5px">
        <span>${careActive ? `🌈 ${displayName(activeSprite())} is filling the package` : careOwned ? 'Activate a Care Bear or Cousin to fill the package' : 'Hatch a Care Bear or Cousin in the Nest to begin'}</span>
        <span>${careTokens % careEvery}/${careEvery} · next in ${careNext}</span>
      </div>
      <div class="arcade-bar"><i style="width:${Math.round(((careTokens % careEvery) / careEvery) * 100)}%"></i></div>
    </div>
    <div class="arcade-hub">
      <div class="between" style="align-items:flex-start">
        <div>
          <div class="arcade-kicker">🏟️ Arcade challenge</div>
          <h3>Coin-powered bonus gifts</h3>
          <p>Puzzle, Zombie, and Fight games earn double-duty coins: spend them anywhere, and every <b>${ARCADE_BONUS_STEP.toLocaleString()}</b> arcade coins fills a bonus gift.</p>
        </div>
        <span class="chip">🪙 ${arcade.coins.toLocaleString()}</span>
      </div>
      <div class="arcade-progress-row"><span>Bonus gift ${bonusIndex}</span><b>${Math.min(arcade.coins, nextAt).toLocaleString()} / ${nextAt.toLocaleString()}</b></div>
      <div class="arcade-bar"><i style="width:${bonusPct}%"></i></div>
      <div class="tiny muted" style="margin-top:5px;line-height:1.45">${bonusReady ? 'Your bonus gift is wrapped and ready.' : `${Math.max(0, nextAt - arcade.coins).toLocaleString()} more arcade coins to the next gift.`} ${nextBonusFeast ? '<b style="color:var(--gold)">This one contains a Starpath Feast.</b>' : 'Every third gift includes a Starpath Feast.'}</div>
      <button class="btn ${bonusReady ? 'btn-gold' : 'btn-ghost'} btn-block arcade-claim" data-arcade-claim ${bonusReady ? '' : 'disabled'}>${bonusReady ? '🎁 Claim bonus gift' : 'Keep playing to fill the gift'}</button>
      <div class="arcade-month">
        <div class="arcade-month-head"><b>Month gifts</b><span>${arcade.monthCoins.toLocaleString()} arcade coins this month</span></div>
        <div class="tiny muted" style="margin-top:3px;line-height:1.45">Monthly tiers reset on the first of each month. Higher tiers include Starpath Feasts, which feed one whole growth stage to the active sprite.</div>
        <div class="arcade-gift-list">${monthGiftsHTML}</div>
      </div>
    </div>
    <div class="game-group-label"><b>Arcade challenges</b><span>puzzle · zombie · fight</span></div>
    <div class="game-cards">${arcadeKeys.map(cardFor).join('')}</div>
    <div class="game-group-label"><b>Hollow classics</b><span>${classicKeys.length} games</span></div>
    <div class="game-cards">${classicKeys.map(cardFor).join('')}</div>
    <div class="section-title"><h2>Play smart</h2></div>
    <div class="card" style="padding:13px;font-size:11.5px;line-height:1.65;color:var(--muted)">
      <div class="row" style="gap:8px;margin-bottom:6px"><b style="color:var(--text)">Rewards scale with score — and rarity.</b></div>
      Every completed game pays its normal score coins and XP, then adds the active sprite's rarity bonus: <b>Common +1,500</b>, <b>Uncommon +1,500</b>, <b>Rare +2,700</b>, <b>Epic +4,000</b>, <b>Legendary +6,750</b>, <b>Mythic +10,000</b>, <b>Secret +13,500</b>, <b>Exotic +18,000</b>, or <b>Master +25,000</b>. Common and Uncommon sprites also make gifts arrive <b>25% sooner</b>. Special combos, mutations, and shinies earn the normal payout plus their species' rarity bonus. Feeding, bathing and naps keep their needs high so they stay in the mood to play.
      <div class="row" style="gap:5px;margin-top:9px;flex-wrap:wrap">${rarityPayouts}</div>
      <div class="row" style="gap:6px;margin-top:10px;flex-wrap:wrap">
        ${Object.entries(GAME_INFO).map(([, g]) => `<span class="chip">${g.icon} ${g.title} = ${g.tag.toLowerCase()}</span>`).join('')}
      </div>
    </div>`;

  function paintPet() {
    const s = activeSprite();
    const box = root.querySelector('[data-play-pet]');
    if (!s) {
      box.innerHTML = `<div class="card empty-state" style="padding:16px">Hatch a sprite to play together.</div>`;
      return;
    }
    box.innerHTML = `<div class="rowcard" style="padding:11px">
      <span class="rc-art">${spriteSVG(s, { expr: expressionFor(s) })}</span>
      <span style="flex:1;min-width:0">
        <div class="between"><b style="font-size:13px">${esc(displayName(s))}</b><span class="tiny muted">Lv ${s.level}${s.level >= MAX_LEVEL ? ' · MAX' : ''}</span></div>
        <div class="tiny muted" style="margin:1px 0 6px">${typeName(s)} · ${moodOf(s).icon} ${moodOf(s).label}</div>
        <div class="row" style="gap:5px;flex-wrap:wrap">
          <span class="chip">Energy ${Math.round(s.needs.energy)}</span>
          <span class="chip">Joy ${Math.round(s.needs.joy)}</span>
          <span class="chip">Bond ${Math.round(s.bond)}</span>
          ${rarityChip(s)}
        </div>
        ${s.needs.energy < 20 ? '<div class="tiny" style="color:var(--warn);margin-top:6px">Sleepy — a nap in the Hollow will perk them up.</div>' : ''}
      </span>
    </div>`;
  }

  root.querySelectorAll('[data-game]').forEach((btn) => {
    btn.addEventListener('click', () => App.startGame(btn.dataset.game));
  });

  root.querySelector('[data-arcade-claim]')?.addEventListener('click', (event) => {
    const res = Actions.claimArcadeBonus();
    if (!res.ok) {
      toast(`That gift needs ${Math.max(0, res.nextAt - res.progress).toLocaleString()} more arcade coins.`, '🎁');
      return;
    }
    Sfx.win();
    burstOn(event.currentTarget, ['🎁', '🪙', '✨'], 10);
    let message = `+${res.coins} coins · ${FOODS[res.foodKey].emoji} ${FOODS[res.foodKey].name} · ${SNACKS[res.snackKey].emoji} ${SNACKS[res.snackKey].name}`;
    if (res.feast) message += ` · 🌟 ${FOODS[STARPATH_FOOD_ID].name}`;
    toast(message, '🎁');
    App.refresh();
  });

  root.querySelectorAll('[data-month-gift]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const res = Actions.claimArcadeMonthGift(btn.dataset.monthGift);
      if (!res.ok) {
        toast(res.reason === 'claimed' ? 'That month gift is already yours.' : `You need ${(res.need || 0).toLocaleString()} more arcade coins this month.`, '📅');
        return;
      }
      Sfx.win();
      burstOn(event.currentTarget, ['🌟', '🎁', '✨'], 11);
      let message = `+${res.coins} coins · ${res.gift.label}`;
      if (res.feasts) message += ` · 🌟 ${res.feasts} Starpath Feast${res.feasts === 1 ? '' : 's'}`;
      toast(message, '📅');
      App.refresh();
    });
  });

  paintPet();
  const unsub = subscribeState((d) => {
    if (d.type === 'game' || d.type === 'arcadeBonus' || d.type === 'arcadeMonthGift') return;
    const coinsEl = root.querySelector('[data-play-coins]');
    if (coinsEl) coinsEl.textContent = state.coins;
    paintPet();
  });
  return () => unsub();
}
