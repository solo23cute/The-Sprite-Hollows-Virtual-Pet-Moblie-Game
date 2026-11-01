/* Today: check-ins, streaks, period goals, and the weekly reward track. */

function todayScreen(root) {
  ensureDaily();
  ensureQuests();
  ensureCheckinPeriods();
  let newFriendId = null;
  let lastDay = dayKey();

  root.innerHTML = `
    <div class="screen-head">
      <div><div class="eyebrow">Small habits, big sprites</div><h1>Today</h1><p data-today-date></p></div>
      <span class="chip">${icon('star')} <span data-streak-chip>0</span> day streak</span>
    </div>
    <div data-new-friend></div>
    <div data-checkin></div>
    <div data-week-track></div>
    <div data-weekly-event></div>
    <div data-egg-gift></div>
    <div data-weekend-event></div>
    <div data-monthly-crate></div>
    <div data-holiday-card></div>
    <div class="section-title"><h2>Streaks</h2><span>daily · weekly · monthly · yearly</span></div>
    <div class="stat-tiles" data-streaks></div>
    <div data-long-game></div>
    <div class="section-title" style="margin-top:18px"><h2>Daily tasks</h2><span>resets at midnight</span></div>
    <div data-tasks-daily></div>
    <div class="section-title"><h2>Weekly goals</h2><span>resets Monday</span></div>
    <div data-tasks-weekly></div>
    <div class="section-title"><h2>Monthly quests</h2><span>slow and steady</span></div>
    <div data-tasks-monthly></div>
    <div class="section-title"><h2>Hollow stats</h2></div>
    <div class="stat-tiles" data-stats></div>
    <div class="card" style="padding:13px;margin-top:12px;font-size:11.5px;line-height:1.65;color:var(--muted)">
      <b style="color:var(--text)">How check-ins work</b><br>
      There are four check-in windows each day: morning, afternoon, evening, and night. Each one pays coins, and the first check-in of the day keeps your daily streak alive. Check in often enough in a week to earn snacks, a wild sprite, and a rare elder. Longer streaks unlock monthly and yearly rewards.
      <br><br><b style="color:var(--text)">Weekly events</b><br>
      Every day brings a different free event: Monday XP, Tuesday meals, Wednesday desserts, Thursday drinks, Friday missing Vault sprites, Saturday unclaimed crates, and Sunday a grand feast. Claim each event once per week.
      <br><br><b style="color:var(--text)">Growing up</b><br>
      XP comes from petting, feeding, baths, chats, tasks and games. The age tiers are ${STAGE_ORDER.map((stage) => `${STAGE_LABELS[stage]} ${STAGE_LEVEL[stage]}`).join(', ')} — crossing one opens an evolution screen. Sensei is the final tier at level 1,000; retirement unlocks at Elder level 100. At level 10, diet affinity can evolve a sprite into one of ${EVOLUTION_FORM_KEYS.length} permanent forms.
    </div>`;

  const dateEl = root.querySelector('[data-today-date]');
  dateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

  function milestoneRows(milestones, count, claims) {
    return milestones.map((m) => {
      const done = claims.includes(m.id);
      const near = !done && count >= m.n;
      return `<div class="milestone ${done ? 'done' : ''} ${near ? 'near' : ''}">
        <span class="ms-ico">${m.icon}</span>
        <span class="ms-main"><b>${m.label}</b><span>${m.n} check-ins</span></span>
        <span class="chip">${done ? '✓ claimed' : near ? 'auto next check-in' : `${count}/${m.n}`}</span>
      </div>`;
    }).join('');
  }

  function taskHTML(tasks, period) {
    return (tasks || []).map((t) => {
      const count = Math.min(periodCounter(t, period), t.goal);
      const complete = count >= t.goal;
      const claimed = t.claimed;
      return `<div class="task ${complete ? 'done' : ''} ${claimed ? 'claimed' : ''}">
        <span class="task-ico">${t.icon}</span>
        <span class="task-main">
          <h4>${taskLabel(t)}</h4>
          <span class="task-prog"><span class="bar"><i style="width:${(count / t.goal) * 100}%;background:${complete ? 'linear-gradient(90deg,#5ee0a0,#9affc4)' : 'linear-gradient(90deg,var(--accent),var(--accent-2))'}"></i></span><span>${count}/${t.goal}</span></span>
        </span>
        ${claimed
          ? '<span class="chip" style="color:var(--good)">✓ claimed</span>'
          : `<button class="btn btn-sm ${complete ? 'btn-gold' : 'btn-ghost'}" data-claim="${t.id}" data-period="${period}" ${complete ? '' : 'disabled'}>${icon('coin')} +${t.reward}</button>`}
      </div>`;
    }).join('');
  }

  function paint() {
    ensureDaily();
    ensureQuests();
    ensureCheckinPeriods();
    ensureWeeklyEvents();
    const c = state.checkin;
    const streak = c.streak || 0;
    const slots = c.slots || [];
    const win = currentCheckinSlot();
    const doneToday = slots.length >= CHECKIN_WINDOWS.length;
    const activePony = activeSprite();
    const ponyBonus = activePony ? (spriteEffects(activePony).checkinCoins || 0) : 0;
    const preview = (slots.length === 0 ? 20 + Math.min(streak, 7) * 5 : 8 + Math.min(streak, 7) * 2) + ponyBonus;
    const nextWin = CHECKIN_WINDOWS[(CHECKIN_WINDOWS.findIndex((w) => w.id === win.id) + 1) % CHECKIN_WINDOWS.length];
    const snackCountText = snackTotal() ? `${snackTotal()} snack${snackTotal() === 1 ? '' : 's'} in the pantry` : 'no pantry snacks yet';

    root.querySelector('[data-streak-chip]').textContent = streak;

    const friend = newFriendId ? findSprite(newFriendId) : null;
    root.querySelector('[data-new-friend]').innerHTML = friend ? `<button class="rowcard new-friend-card" data-meet-sprite="${friend.id}">
      <span class="rc-art">${spriteSVG(friend, { expr: 'happy' })}</span>
      <span style="flex:1;min-width:0;text-align:left">
        <b style="font-size:12.5px">New friend: ${esc(displayName(friend))}</b><br>
        <span class="tiny muted">${formName(friend) || typeName(friend)} · ${SIZES[friend.size]?.name || 'Standard'} · ${stageLabel(friend)}</span>
      </span>
      <span class="go">${icon('chevron')}</span>
    </button>` : '';

    root.querySelector('[data-checkin]').innerHTML = `
      <div class="checkin-card">
        <div class="between" style="align-items:flex-start">
          <div><h2>${doneToday ? 'All checked in ✓' : 'Check in'}</h2>
            <p>${doneToday ? 'Four windows claimed. The next set opens at midnight.' : `${win.label} window · ${win.claimed ? `come back in the ${nextWin.label.toLowerCase()} for another` : 'one check-in available now'}`}</p>
          </div>
          <span class="chip">${win.icon} ${win.label}</span>
        </div>
        <div class="checkin-slots">
          ${CHECKIN_WINDOWS.map((w) => `<span class="checkin-slot ${slots.includes(w.id) ? 'done' : ''} ${w.id === win.id && !slots.includes(w.id) ? 'current' : ''}">
            <i>${w.icon}</i><b>${w.label}</b><span>${slots.includes(w.id) ? '✓' : w.id === win.id ? 'open' : 'later'}</span>
          </span>`).join('')}
        </div>
        <div class="streak-dots">${Array.from({ length: 7 }, (_, i) => `<i class="${i < Math.min(streak, 7) ? 'on' : ''}"></i>`).join('')}</div>
        <button class="btn ${win.claimed ? 'btn-ghost' : 'btn-gold'} btn-block" data-checkin ${win.claimed ? 'disabled' : ''} style="margin-top:12px">
          ${win.claimed ? `Next window: ${nextWin.label} ${nextWin.icon}` : `Check in · +${preview} coins${ponyBonus ? ` · pony +${ponyBonus}` : ''}`}
        </button>
        <div class="tiny muted" style="text-align:center;margin-top:7px">${win.claimed ? `Streak ${streak} days · ${snackCountText}` : `45% chance of a pantry snack · ${snackCountText}`}</div>
      </div>`;

    const weekSlots = c.weekSlots || 0;
    root.querySelector('[data-week-track]').innerHTML = `
      <div class="card" style="padding:13px;margin-top:12px">
        <div class="between"><b style="font-size:12.5px">This week · ${weekSlots} check-ins</b><span class="tiny muted">resets Monday</span></div>
        <div class="bar" style="height:8px;margin:8px 0 10px"><i style="width:${Math.min(100, (weekSlots / 16) * 100)}%;background:linear-gradient(90deg,var(--accent),var(--accent-2))"></i></div>
        <div class="milestone-list">${milestoneRows(WEEK_MILESTONES, weekSlots, c.weekClaims || [])}</div>
      </div>`;

    const weekly = activeWeeklyEvent();
    const weeklyDone = weeklyEventClaimed(weekly);
    const weeklyFoodCount = weeklyEventFoodKeys(weekly).length;
    const weeklyVaultCount = weeklyEventMissingVaultKeys().length;
    const weeklyCrates = weeklyEventMissingCrates(weekly);
    const weeklyBits = [];
    if (weekly?.effects?.xp) weeklyBits.push(`⚡ +${Math.round((weekly.effects.xp - 1) * 100)}% XP`);
    if (weekly?.effects?.coins) weeklyBits.push(`🪙 +${Math.round((weekly.effects.coins - 1) * 100)}% coins`);
    if (weekly?.effects?.giftSpeed) weeklyBits.push(`🎁 gifts ${Math.round((weekly.effects.giftSpeed - 1) * 100)}% sooner`);
    if (weekly?.effects?.bond) weeklyBits.push(`💞 +${Math.round((weekly.effects.bond - 1) * 100)}% bond`);
    let weeklyReward = 'A small event crate.';
    if (weekly?.reward?.kind === 'vault') weeklyReward = weeklyVaultCount ? `${weeklyVaultCount} missing Vault sprite${weeklyVaultCount === 1 ? '' : 's'} come home.` : 'Vault already complete — take the coin crown instead.';
    else if (weekly?.reward?.kind === 'crates') weeklyReward = `${weeklyCrates} unclaimed crate${weeklyCrates === 1 ? '' : 's'} this week, including the monthly crate when sealed.`;
    else if (weekly?.reward?.foodCats?.length) weeklyReward = `${weeklyFoodCount} free ${weekly.reward.foodCats.includes('meal') && weekly.reward.foodCats.length === 1 ? 'meal' : weekly.reward.foodCats.includes('dessert') && weekly.reward.foodCats.length === 1 ? 'dessert' : weekly.reward.foodCats.includes('drink') && weekly.reward.foodCats.length === 1 ? 'drink' : 'meal, dessert, and drink'} item${weeklyFoodCount === 1 ? '' : 's'} for the pantry.`;
    const weeklyButton = weeklyDone ? '✓ Claimed this week' : weekly?.reward?.kind === 'vault' ? (weeklyVaultCount ? `Rescue ${weeklyVaultCount} Vault sprites` : 'Claim Vault crown') : weekly?.reward?.kind === 'crates' ? `Open ${weeklyCrates} catch-up crate${weeklyCrates === 1 ? '' : 's'}` : weekly?.reward?.foodCats?.length ? `Claim ${weeklyFoodCount} free food${weeklyFoodCount === 1 ? '' : 's'}` : 'Claim event crate';
    root.querySelector('[data-weekly-event]').innerHTML = `
      <div class="card weekly-event-card" style="border-color:${weekly?.color || '#ffd166'}55">
        <div class="between" style="align-items:flex-start">
          <div><div class="eyebrow">Weekly event · ${esc(weekly?.dayLabel || 'Today')}</div><b style="font-size:13px">${weekly?.icon || '🎉'} ${esc(weekly?.name || 'Hollow event')}</b></div>
          <span class="chip" style="color:${weekly?.color || '#ffd166'}">${weeklyDone ? '✓ claimed' : 'one claim'}</span>
        </div>
        <p class="tiny muted" style="margin:6px 0 8px;line-height:1.55">${esc(weekly?.blurb || 'A special Hollow day.')}</p>
        <div class="weekly-day-strip">${WEEKLY_EVENTS.map((event) => `<div class="weekly-day ${event.key === weekly?.key ? 'on' : ''} ${weeklyEventClaimed(event) ? 'done' : ''}"><span>${event.dayLabel.slice(0, 3)}</span><b>${event.icon}</b><i>${weeklyEventClaimed(event) ? '✓' : event.key === weekly?.key ? 'now' : ''}</i></div>`).join('')}</div>
        ${weeklyBits.length ? `<div class="row" style="gap:4px;flex-wrap:wrap;margin-top:8px">${weeklyBits.map((bit) => `<span class="chip">${bit}</span>`).join('')}</div>` : ''}
        <div class="weekly-event-reward"><b>${esc(weeklyReward)}</b>${weekly?.reward?.coins ? `<span>+${weekly.reward.coins} coins</span>` : ''}</div>
        <button class="btn ${weeklyDone ? 'btn-ghost' : 'btn-gold'} btn-block" data-weekly-claim ${weeklyDone ? 'disabled' : ''} style="margin-top:9px">${weeklyButton}</button>
        <p class="tiny muted" style="text-align:center;margin-top:6px">Events rotate every day. One claim per event, per week.</p>
      </div>`;

    const eggDone = dailyEggClaimed();
    const featuredKey = dailyEggFeatured();
    const featured = ELEMENTS[featuredKey] || ELEMENTS.bloom;
    const lastGiftKey = dailyEggClaimedKey();
    root.querySelector('[data-egg-gift]').innerHTML = `
      <div class="card egg-gift-card" style="padding:13px;margin-top:12px">
        <div class="between" style="align-items:flex-start">
          <div><div class="eyebrow">Daily event</div><b style="font-size:13px">🥚 Daily Egg Gift</b></div>
          <span class="chip">${eggDone ? '✓ claimed today' : 'one per day'}</span>
        </div>
        <p class="tiny muted" style="margin:6px 0 8px;line-height:1.55">Every day the Hollow leaves one wrapped egg on the doorstep, and you pick the sprite inside. Featured today: <b style="color:var(--text)">${esc(featured.name)}</b>.</p>
        <div class="row" style="gap:5px;flex-wrap:wrap;margin-bottom:9px"><span class="chip">${dailyEggPool().length.toLocaleString()} species</span><span class="chip">🎁 free egg</span><span class="chip">🔥 arrives 40% warmed</span></div>
        <div class="row" style="gap:7px">
          <button class="btn ${eggDone ? 'btn-ghost' : 'btn-gold'}" style="flex:1" data-egg-gift-claim ${eggDone ? 'disabled' : ''}>${eggDone ? 'Claimed — back tomorrow' : 'Claim today’s gift egg'}</button>
          <button class="btn btn-soft" style="flex:1" data-egg-gift-choose ${eggDone ? 'disabled' : ''}>Choose any sprite</button>
        </div>
        ${eggDone && lastGiftKey && ELEMENTS[lastGiftKey] ? `<p class="tiny muted" style="margin:7px 0 0;text-align:center">Today’s gift: <b style="color:var(--text)">${esc(ELEMENTS[lastGiftKey].name)}</b> egg, warming in the Nest.</p>` : ''}
      </div>`;

    const weekEvent = typeof weekendAdminEvent === 'function' ? weekendAdminEvent() : null;
    const weekendActive = typeof weekendAdminActive === 'function' && weekendAdminActive();
    const weekendDone = typeof weekendAdminClaimed === 'function' && weekendAdminClaimed();
    const weekendHint = weekendActive
      ? (weekendDone ? 'The Admin team has already handed over this weekend’s egg.' : 'The Admin Event is live all weekend. One claim per weekend.')
      : 'The Admin Event returns on Saturday. Special event sprites and Admin sprites only arrive during the weekend.';
    root.querySelector('[data-weekend-event]').innerHTML = `
      <div class="card weekly-event-card" style="padding:13px;margin-top:12px;border-color:${weekEvent?.color || '#8be9ff'}66">
        <div class="between" style="align-items:flex-start">
          <div><div class="eyebrow">Admin event · weekends</div><b style="font-size:13px">${weekEvent?.icon || '🛠️'} ${esc(weekEvent?.name || 'Admin Event')}</b></div>
          <span class="chip">${weekendDone ? '✓ claimed' : weekendActive ? 'live now' : 'Sat & Sun'}</span>
        </div>
        <p class="tiny muted" style="margin:6px 0 8px;line-height:1.55">${esc(weekEvent?.blurb || 'The admin team opens the console every weekend with bonus XP, coins, and an egg.')}</p>
        <div class="row" style="gap:5px;flex-wrap:wrap;margin-bottom:9px">
          <span class="chip">⚡ +${Math.round(((weekEvent?.xpMult || 1) - 1) * 100)}% XP</span>
          <span class="chip">🪙 +${weekEvent?.coins || 0} coins</span>
          <span class="chip">🥚 ${ELEMENTS[weekEvent?.egg]?.name || 'Admin'} egg</span>
          <span class="chip">🛠️ ${(typeof ADMIN_KEYS !== 'undefined' ? ADMIN_KEYS.length : 0) + (typeof EVENT_KEYS !== 'undefined' ? EVENT_KEYS.length : 0)} event &amp; admin sprites</span>
        </div>
        <button class="btn ${weekendDone ? 'btn-ghost' : weekendActive ? 'btn-gold' : 'btn-soft'} btn-block" data-weekend-claim ${weekendActive && !weekendDone ? '' : 'disabled'}>${weekendDone ? 'Claimed this weekend' : weekendActive ? 'Claim the weekend event gift' : 'Back on Saturday'}</button>
        <p class="tiny muted" style="text-align:center;margin-top:6px;line-height:1.45">${esc(weekendHint)}</p>
      </div>`;

    const monthNow = monthKey();
    const monthClaimed = c.monthCrateKey === monthNow;
    const nextMonthlyFood = MONTHLY_FOOD_KEYS.find((k) => !(state.foodUnlocks || []).includes(k));
    const monthlyCoins = 100 + Math.min(50, (c.monthDays || 0) * 5);
    root.querySelector('[data-monthly-crate]').innerHTML = `
      <div class="card" style="padding:13px;margin-top:12px;border-color:rgba(255,209,102,.3)">
        <div class="between"><div><div class="eyebrow">Monthly check-in</div><b style="font-size:13px">${monthClaimed ? 'Crate claimed' : 'Monthly pantry crate'}</b></div><span class="chip">📦 once a month</span></div>
        <p class="tiny muted" style="margin:6px 0 8px;line-height:1.55">Coins, pantry food, and a brand-new food type. ${nextMonthlyFood ? `Next unlock: <b style="color:var(--text)">${FOODS[nextMonthlyFood].emoji} ${esc(FOODS[nextMonthlyFood].name)}</b>.` : 'Every monthly food is already unlocked.'}</p>
        <div class="row" style="gap:5px;flex-wrap:wrap;margin-bottom:9px"><span class="chip">🪙 +${monthlyCoins}</span><span class="chip">🧺 3 pantry items</span><span class="chip">🆕 food unlock</span></div>
        <button class="btn ${monthClaimed ? 'btn-ghost' : 'btn-gold'} btn-block" data-monthly-checkin ${monthClaimed ? 'disabled' : ''}>${monthClaimed ? 'Claimed this month' : 'Claim monthly crate'}</button>
      </div>`;

    const holiday = typeof activeHoliday === 'function' ? activeHoliday() : null;
    const nextHol = !holiday && typeof nextHoliday === 'function' ? nextHoliday() : null;
    const holidayCard = root.querySelector('[data-holiday-card]');
    if (holiday) {
      const daysLeft = typeof holidayDaysLeft === 'function' ? holidayDaysLeft(holiday) : 0;
      const treat = FOODS[holiday.treat];
      const seasonEggs = holidayEggPool(holiday);
      const giftDone = holidayGiftClaimed(holiday);
      holidayCard.innerHTML = `<div class="card" style="padding:13px;margin-top:12px;border-color:${holiday.color}66">
        <div class="between"><div><div class="eyebrow">Holiday event</div><b style="font-size:13px">${holiday.icon} ${esc(holiday.name)}</b></div><span class="chip">${daysLeft} day${daysLeft === 1 ? '' : 's'} left</span></div>
        <p class="tiny muted" style="margin:6px 0 8px;line-height:1.55">${esc(holiday.blurb)}</p>
        <div class="row" style="gap:5px;flex-wrap:wrap"><span class="chip">🪙 +${Math.round((holiday.coinMult - 1) * 100)}% coins</span><span class="chip">🎁 +${Math.round((holiday.giftSpeed - 1) * 100)}% gifts</span><span class="chip">⚡ +${Math.round(((holiday.xpMult || 1) - 1) * 100)}% XP</span>${treat ? `<span class="chip">🍬 daily treat: ${treat.emoji} ${esc(treat.name)}</span>` : ''}</div>
        <div class="row" style="gap:4px;flex-wrap:wrap;margin-top:7px">${seasonEggs.slice(0, 5).map((key) => `<span class="chip" style="border-color:${ELEMENTS[key].primary}55">${esc(ELEMENTS[key].name)} egg</span>`).join('')}${seasonEggs.length > 5 ? `<span class="chip">+${seasonEggs.length - 5} more</span>` : ''}</div>
        <button class="btn ${giftDone ? 'btn-ghost' : 'btn-gold'} btn-block" data-holiday-gift ${giftDone ? 'disabled' : ''} style="margin-top:9px">${giftDone ? 'Season gift claimed today' : 'Claim season gift egg + bonus coins'}</button>
      </div>`;
    } else if (nextHol) {
      holidayCard.innerHTML = `<div class="card" style="padding:12px;margin-top:12px;border-color:${nextHol.color}44">
        <div class="between"><div><div class="eyebrow">Next holiday</div><b style="font-size:12.5px">${nextHol.icon} ${esc(nextHol.name)}</b></div><span class="chip">in ${nextHol.days} day${nextHol.days === 1 ? '' : 's'}</span></div>
        <p class="tiny muted" style="margin:5px 0 0;line-height:1.5">${esc(nextHol.blurb)}</p>
      </div>`;
    } else {
      holidayCard.innerHTML = '';
    }

    root.querySelector('[data-streaks]').innerHTML = `
      <div class="stat-tile"><b>${streak}</b><span>Day streak</span></div>
      <div class="stat-tile"><b>${c.weekStreak || 0}</b><span>Week streak</span></div>
      <div class="stat-tile"><b>${c.monthStreak || 0}</b><span>Month streak</span></div>
      <div class="stat-tile"><b>${c.yearStreak || 0}</b><span>Year streak</span></div>`;

    const monthCount = c.monthSlots || 0;
    const yearCount = c.yearSlots || 0;
    root.querySelector('[data-long-game]').innerHTML = `
      <div class="card" style="padding:13px;margin-top:10px">
        <div class="between"><b style="font-size:12.5px">This month · ${monthCount} check-ins</b><span class="tiny muted">${c.monthDays || 0} days</span></div>
        <div class="bar" style="height:7px;margin:8px 0 9px"><i style="width:${Math.min(100, (monthCount / 48) * 100)}%;background:linear-gradient(90deg,#8b7bff,#ff7ac8)"></i></div>
        <div class="milestone-list">${milestoneRows(MONTH_MILESTONES, monthCount, c.monthClaims || [])}</div>
        <div class="divider" style="margin:12px 0"></div>
        <div class="between"><b style="font-size:12.5px">This year · ${yearCount} check-ins</b><span class="tiny muted">${c.yearDays || 0} days</span></div>
        <div class="bar" style="height:7px;margin:8px 0 9px"><i style="width:${Math.min(100, (yearCount / YEAR_MILESTONE.n) * 100)}%;background:linear-gradient(90deg,#ffd166,#ff9f43)"></i></div>
        <div class="milestone-list">${milestoneRows([YEAR_MILESTONE], yearCount, c.yearClaims || [])}</div>
        <div class="tiny muted" style="margin-top:8px;line-height:1.55">A week streak counts weeks with 7+ check-ins. Month streaks need 12+ check-in days; year streaks need 120+ days. Period rewards claim automatically.</div>
      </div>`;

    root.querySelector('[data-tasks-daily]').innerHTML = taskHTML(state.daily?.tasks, 'daily');
    root.querySelector('[data-tasks-weekly]').innerHTML = taskHTML(state.weekly?.tasks, 'weekly');
    root.querySelector('[data-tasks-monthly]').innerHTML = taskHTML(state.monthly?.tasks, 'monthly');

    const st = state.stats;
    root.querySelector('[data-stats]').innerHTML = `
      <div class="stat-tile"><b>${grownSprites().length}</b><span>Sprites</span></div>
      <div class="stat-tile"><b>${st.checkins || 0}</b><span>Check-ins</span></div>
      <div class="stat-tile"><b>${st.hatches || 0}</b><span>Hatches</span></div>
      <div class="stat-tile"><b>${st.merges || 0}</b><span>Merges</span></div>
      <div class="stat-tile"><b>${st.evolves || 0}</b><span>Evolutions</span></div>
      <div class="stat-tile"><b>${Math.max(st.bestStreak || 0, streak)}</b><span>Best streak</span></div>`;
  }

  root.addEventListener('click', (e) => {
    const checkin = e.target.closest('[data-checkin]');
    if (checkin && !checkin.disabled) {
      const res = Actions.checkIn();
      if (!res.ok) {
        toast(res.reason === 'window' ? 'That window is already claimed. Come back later!' : 'Could not check in right now.', '📅');
        paint();
        return;
      }
      Sfx.coin();
      burstOn(checkin, ['🪙', '✨', '💛'], 9);
      let message = `+${res.reward} coins · ${res.weekSlots} check-ins this week`;
      if (res.snackKey) message += ` · ${SNACKS[res.snackKey].emoji} ${SNACKS[res.snackKey].name}`;
      if (res.foodKey) message += ` · ${FOODS[res.foodKey].emoji} ${FOODS[res.foodKey].name}`;
      if (res.holidayFood) message += ` · ${FOODS[res.holidayFood].emoji} ${FOODS[res.holidayFood].name}`;
      toast(message, '📅');
      if (res.snackKey) Sfx.pop();
      res.milestones.forEach((m, i) => {
        setTimeout(() => toast(`${m.title}: ${m.text}`, m.icon), 450 + i * 600);
        if (m.spriteId) newFriendId = m.spriteId;
      });
      paint();
      return;
    }

    const weeklyClaim = e.target.closest('[data-weekly-claim]');
    if (weeklyClaim && !weeklyClaim.disabled) {
      const res = Actions.claimWeeklyEvent();
      if (!res.ok) { toast(res.reason === 'claimed' ? 'That event is already claimed this week.' : 'No event is active right now.', '🎉'); paint(); return; }
      Sfx.win();
      burstOn(weeklyClaim, ['🎉', '✨', '🪙'], 9);
      let msg = `${res.event.icon} ${res.event.name}`;
      if (res.vault.length) msg += ` · +${res.vault.length} Vault sprites`;
      if (res.foods.length) msg += ` · +${res.foods.length} pantry foods`;
      if (res.crates) msg += ` · +${res.crates} catch-up crates`;
      if (res.monthly) msg += ' · monthly crate';
      if (res.coins) msg += ` · +${res.coins} coins`;
      toast(msg, res.event.icon);
      paint();
      return;
    }

    const eggGiftClaim = e.target.closest('[data-egg-gift-claim]');
    if (eggGiftClaim && !eggGiftClaim.disabled) {
      const res = Actions.claimDailyEgg();
      if (!res.ok) { toast('Today’s gift egg is already claimed. Come back tomorrow.', '🥚'); paint(); return; }
      burstOn(eggGiftClaim, ['🥚', '✨', '🎁'], 9);
      toast(`Daily gift egg: ${ELEMENTS[res.element].name} · warm in the Nest.`, '🥚');
      paint();
      return;
    }

    const eggGiftChoose = e.target.closest('[data-egg-gift-choose]');
    if (eggGiftChoose && !eggGiftChoose.disabled) {
      openDailyEggGift();
      return;
    }

    const holidayGift = e.target.closest('[data-holiday-gift]');
    if (holidayGift && !holidayGift.disabled) {
      const res = Actions.claimHolidayGift();
      if (!res.ok) {
        toast(res.reason === 'claimed' ? 'Today’s season gift is already claimed.' : 'No holiday is active right now.', '🎁');
        paint();
        return;
      }
      burstOn(holidayGift, ['🎁', '🥚', '🪙'], 9);
      toast(`${res.holiday.icon} ${res.holiday.name}: ${ELEMENTS[res.element].name} egg + ${res.coins} coins`, res.holiday.icon);
      paint();
      return;
    }

    const weekendClaim = e.target.closest('[data-weekend-claim]');
    if (weekendClaim && !weekendClaim.disabled) {
      const res = Actions.claimWeekendGift();
      if (!res.ok) {
        toast(res.reason === 'claimed' ? 'This weekend’s Admin gift is already claimed.' : 'The Admin Event runs on Saturday and Sunday only.', '🛠️');
        paint();
        return;
      }
      Sfx.win();
      burstOn(weekendClaim, ['🛠️', '🥚', '✨'], 9);
      toast(`${res.event.icon} ${res.event.name}: ${ELEMENTS[res.element].name} egg + ${res.coins} coins`, res.event.icon);
      paint();
      return;
    }

    const monthly = e.target.closest('[data-monthly-checkin]');
    if (monthly && !monthly.disabled) {
      const res = Actions.claimMonthly();
      if (!res.ok) { toast('This month’s crate is already claimed.', '📦'); paint(); return; }
      Sfx.win();
      burstOn(monthly, ['🪙', '🧺', '🆕'], 9);
      let msg = `+${res.coins} coins · 3 pantry items`;
      if (res.newFood) msg += ` · new food: ${FOODS[res.newFood].name}`;
      toast(msg, '📦');
      paint();
      return;
    }

    const claim = e.target.closest('[data-claim]');
    if (claim && !claim.disabled) {
      const res = Actions.claimTask(claim.dataset.claim, claim.dataset.period || 'daily');
      if (res.ok) {
        burstOn(claim, ['🪙', '✅', '✨'], 7);
        paint();
      }
      return;
    }

    const meet = e.target.closest('[data-meet-sprite]');
    if (meet) App.openDetail(meet.dataset.meetSprite);
  });

  const unsub = subscribeState(() => paint());
  const clock = setInterval(() => {
    if (lastDay !== dayKey()) {
      lastDay = dayKey();
      paint();
    }
  }, 60000);
  paint();
  return () => {
    unsub();
    clearInterval(clock);
  };
}
