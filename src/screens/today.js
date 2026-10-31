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
      <br><br><b style="color:var(--text)">Growing up</b><br>
      XP comes from petting, feeding, baths, chats, tasks and games. Level 5 makes a Juvenile, 10 makes a Sprite, and 20 makes an Elder. At level 10, diet affinity can evolve a sprite into a Dragon, Fairy, Ghoul, or Titan.
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
      holidayCard.innerHTML = `<div class="card" style="padding:13px;margin-top:12px;border-color:${holiday.color}66">
        <div class="between"><div><div class="eyebrow">Holiday event</div><b style="font-size:13px">${holiday.icon} ${esc(holiday.name)}</b></div><span class="chip">${daysLeft} day${daysLeft === 1 ? '' : 's'} left</span></div>
        <p class="tiny muted" style="margin:6px 0 8px;line-height:1.55">${esc(holiday.blurb)}</p>
        <div class="row" style="gap:5px;flex-wrap:wrap"><span class="chip">🪙 +${Math.round((holiday.coinMult - 1) * 100)}% coins</span><span class="chip">🎁 +${Math.round((holiday.giftSpeed - 1) * 100)}% gifts</span>${treat ? `<span class="chip">🍬 daily treat: ${treat.emoji} ${esc(treat.name)}</span>` : ''}</div>
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
