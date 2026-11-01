/* App shell, routing, and boot. */

const App = {
  tab: 'hollow',
  cleanup: null,
  go(tab) {
    if (!state.started) return;
    closeChat();
    closeAllOverlays();
    const from = this.tab;
    this.tab = tab;
    this.mount();
    if (tab === 'hollow' && from !== 'hollow' && typeof showHollowLoading === 'function') showHollowLoading();
    Sfx.click();
  },
  refresh() {
    if (!state.started) return;
    this.mount();
  },
  mount() {
    const screen = document.getElementById('screen');
    if (!screen) return;
    if (this.cleanup) {
      try { this.cleanup(); } catch (err) { console.error(err); }
      this.cleanup = null;
    }
    screen.innerHTML = '';
    screen.className = `screen${this.tab === 'hollow' ? ' is-hollow' : ''}`;
    screen.scrollTop = 0;
    const screens = {
      hollow: hollowScreen,
      collection: collectionScreen,
      foods: foodsScreen,
      codex: codexScreen,
      wiki: wikiScreen,
      roster: rosterScreen,
      nest: nestScreen,
      play: playScreen,
      senthome: sentHomeScreen,
      today: todayScreen,
    };
    const fn = screens[this.tab] || hollowScreen;
    this.cleanup = fn(screen) || null;
    if (typeof startBiomeAmbience === 'function') {
      if (this.tab === 'hollow') startBiomeAmbience(state.theme.scene);
      else if (typeof stopBiomeAmbience === 'function') stopBiomeAmbience();
    }
    document.querySelectorAll('.tab').forEach((t) => {
      t.classList.toggle('active', t.dataset.tab === (this.tab === 'wiki' || this.tab === 'roster' ? 'codex' : this.tab));
    });
    updateBadges();
  },
  startGame(kind) {
    openGame(kind);
  },
  openChat(id) {
    closeChat();
    openChatView(id);
  },
  openDetail(id) {
    closeAllOverlays();
    openSpriteDetail(id);
  },
  openStudio(opts) {
    closeAllOverlays();
    openStudioSheet(opts || {});
  },
  openHatch(id, opts) {
    openHatchFlow(id, opts || {});
  },
};

let previousCoins = state.coins;

function updateTopbar(detail = {}) {
  const coinsEl = document.querySelector('[data-coins]');
  if (coinsEl) coinsEl.textContent = state.coins;
  const sub = document.querySelector('[data-hollow-sub]');
  if (sub) sub.textContent = state.hollowName;
  const pill = document.querySelector('[data-coin-pill]');
  if (pill && previousCoins !== state.coins) {
    if (state.coins > previousCoins) {
      pill.classList.remove('bump');
      void pill.offsetWidth;
      pill.classList.add('bump');
    }
    previousCoins = state.coins;
  }
  updateBadges();
}

function updateBadges() {
  ensureQuests();
  const slot = currentCheckinSlot();
  const claimable = [
    ...(state.daily?.tasks || []).map((t) => ({ t, period: 'daily' })),
    ...(state.weekly?.tasks || []).map((t) => ({ t, period: 'weekly' })),
    ...(state.monthly?.tasks || []).map((t) => ({ t, period: 'monthly' })),
  ].some(({ t, period }) => !t.claimed && periodCounter(t, period) >= t.goal);
  const today = document.querySelector('[data-badge="today"]');
  if (today) today.hidden = !(!slot.claimed || claimable);
  const hollow = document.querySelector('[data-badge="hollow"]');
  if (hollow) hollow.hidden = !giftReady();
  const nest = document.querySelector('[data-badge="nest"]');
  if (nest) nest.hidden = !eggs().some((e) => e.hatch >= 100);
}

function renderShell() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">${icon('sparkle')}</div>
          <div class="brand-text">
            <div class="brand-name">Sprite Hollow <span class="brand-version">v${APP_VERSION}</span></div>
            <div class="brand-sub" data-hollow-sub>${esc(state.hollowName)}</div>
          </div>
        </div>
        <div class="top-actions">
          <div class="coin-pill" data-coin-pill>${icon('coin')}<span data-coins>${state.coins}</span></div>
          <button class="icon-btn" data-studio-btn aria-label="Open Studio">${icon('palette')}</button>
        </div>
      </header>
      <main class="screen is-hollow" id="screen"></main>
      <div class="cc-bar" data-cc-bar hidden aria-live="polite" aria-atomic="true"></div>
      <nav class="tabbar" aria-label="Main navigation">
        <button class="tab active" data-tab="hollow">${icon('hollow')}<span>${t('tab.hollow')}</span><span class="tab-badge" data-badge="hollow" hidden></span></button>
        <button class="tab" data-tab="collection">${icon('sprites')}<span>${t('tab.collection')}</span></button>
        <button class="tab" data-tab="codex">${icon('types')}<span>${t('tab.codex')}</span></button>
        <button class="tab" data-tab="nest">${icon('nest')}<span>${t('tab.nest')}</span><span class="tab-badge" data-badge="nest" hidden></span></button>
        <button class="tab" data-tab="play">${icon('play')}<span>${t('tab.play')}</span></button>
        <button class="tab" data-tab="today">${icon('today')}<span>${t('tab.today')}</span><span class="tab-badge" data-badge="today" hidden></span></button>
        <button class="tab" data-settings-btn aria-label="Open settings">${icon('settings')}<span>${t('tab.settings')}</span></button>
      </nav>
    </div>`;

  app.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => App.go(btn.dataset.tab));
  });
  app.querySelector('[data-studio-btn]').addEventListener('click', () => App.openStudio());
  app.querySelector('[data-settings-btn]').addEventListener('click', () => App.openStudio());
  applyLanguage();
  Captions.mount();
  previousCoins = state.coins;
  updateTopbar();
}

function startFromIntro(element, breed) {
  const egg = Actions.startGame(element, breed);
  renderShell();
  App.tab = 'hollow';
  App.mount();
  openHatchFlow(egg.id, {
    starter: true,
    onDone: () => {
      App.tab = 'hollow';
      App.mount();
      if (typeof showHollowLoading === 'function') showHollowLoading();
      toast('Your Hollow is alive. Tap your sprite to say hello.', '🌱');
      setTimeout(() => Voice.welcome(true), 500);
      setTimeout(() => { if (!state.seen.tour) startTour(); }, 1300);
    },
  });
}

/* Native touch momentum is device-controlled, so add a small passive boost to
   vertical swipes and a faster wheel step for trackpads/desktops. */
function bindFastScroll() {
  let touch = null;
  document.addEventListener('touchstart', (event) => {
    const scroller = event.target.closest?.('.screen');
    if (!scroller || event.touches.length !== 1 || event.target.closest('.stage, .game-board, input, textarea, select')) {
      touch = null;
      return;
    }
    const point = event.touches[0];
    touch = { scroller, x: point.clientX, y: point.clientY };
  }, { passive: true });
  document.addEventListener('touchmove', (event) => {
    if (!touch || event.touches.length !== 1) return;
    const point = event.touches[0];
    const dx = point.clientX - touch.x;
    const dy = touch.y - point.clientY;
    touch.x = point.clientX;
    touch.y = point.clientY;
    if (Math.abs(dx) > Math.abs(dy) || Math.abs(dy) < 1) return;
    const max = touch.scroller.scrollHeight - touch.scroller.clientHeight;
    if (max <= 0) return;
    touch.scroller.scrollTop = Math.max(0, Math.min(max, touch.scroller.scrollTop + dy * 0.55));
  }, { passive: true });
  const endTouch = () => { touch = null; };
  document.addEventListener('touchend', endTouch, { passive: true });
  document.addEventListener('touchcancel', endTouch, { passive: true });
  document.addEventListener('wheel', (event) => {
    if (event.ctrlKey) return;
    const scroller = event.target.closest?.('.screen, .sheet, .modal');
    if (!scroller) return;
    const max = scroller.scrollHeight - scroller.clientHeight;
    if (max <= 0) return;
    event.preventDefault();
    scroller.scrollTop = Math.max(0, Math.min(max, scroller.scrollTop + event.deltaY * 1.45));
  }, { passive: false });
}

function bindGlobal() {
  bindFastScroll();
  document.addEventListener('pointerdown', () => { Sfx.init(); Voice.init(); }, { once: true });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (typeof activeChatClose !== 'undefined' && activeChatClose) {
      closeChat();
      return;
    }
    if (overlayStack.length) closeTopOverlay();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      Voice.markHidden();
      tick();
      saveState(true);
      Voice.goodbye();
    } else {
      tick(true);
      Voice.returnSummary();
    }
  });
  window.addEventListener('pagehide', () => { Voice.goodbye(); saveState(true); });
  window.addEventListener('beforeunload', () => saveState(true));

  // Android WebView back button calls this.
  window.closeTopLayer = () => {
    if (typeof activeChatClose !== 'undefined' && activeChatClose) {
      closeChat();
      return true;
    }
    const gameQuit = document.querySelector('.game-overlay [data-quit]');
    if (gameQuit) {
      gameQuit.click();
      return true;
    }
    if (overlayStack.length) {
      closeTopOverlay();
      return true;
    }
    if (App.tab === 'roster') {
      App.go(App.rosterReturn || 'wiki');
      return true;
    }
    return false;
  };

  let last = Date.now();
  setInterval(() => {
    tick();
    const now = Date.now();
    if (now - last > 12000) {
      last = now;
      updateTopbar();
    }
    Voice.remind();
  }, 1000);
}

function boot() {
  Voice.init();
  applyTheme();
  ensureDaily();
  ensureQuests();
  ensureCheckinPeriods();
  ensureArcadePeriods();
  tick(true);
  saveState(true);
  bindGlobal();

  subscribeState((detail) => {
    updateTopbar(detail);
    if (detail.type === 'theme') {
      applyTheme();
    }
  });

  const enterApp = () => {
    if (!state.started) {
      introScreen(document.getElementById('app'), startFromIntro);
    } else {
      renderShell();
      App.mount();
      setTimeout(() => Voice.welcome(), 900);
      setTimeout(() => { if (!state.seen.tour) startTour(); }, 1200);
    }
    window.App = App;
  };

  if (typeof showBootLoading === 'function') showBootLoading(enterApp);
  else enterApp();
}

boot();
