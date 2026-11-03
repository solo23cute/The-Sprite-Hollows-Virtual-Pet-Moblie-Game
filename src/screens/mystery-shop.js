/* Mystery Shop: spend Hollow coins on completely unknown sprite eggs.
   The egg's element, breed, colours and possible mutation are rolled on
   purchase and only revealed when it hatches in the Nest. */

function openMysteryShop() {
  const body = `
    <p class="tiny muted" style="margin:0 2px 12px;line-height:1.6">Every egg hides an unknown sprite — a random element, breed, colorway and a chance at a mutation. You find out what you got when it hatches.</p>
    <div class="between" style="margin-bottom:10px">
      <span class="chip">${icon('coin')} <span data-shop-coins>${state.coins}</span> Hollow coins</span>
      <span class="tiny muted">Spent from your shop balance</span>
    </div>
    <div class="list-gap">
      ${EGG_KEYS.map((key) => {
        const t = EGG_TIERS[key];
        return `<div class="card" style="padding:12px;display:flex;gap:12px;align-items:center">
          <div style="width:54px;height:54px;flex:0 0 auto;display:grid;place-items:center;font-size:26px;border-radius:16px;background:rgba(255,255,255,.06);border:1px solid var(--line)">${t.emoji}</div>
          <div style="flex:1;min-width:0">
            <b style="font-size:13px">${esc(t.name)}</b>
            <div class="tiny muted" style="margin-top:3px;line-height:1.5">${esc(t.desc)}<br>Mutation chance ${Math.round(t.mutation * 100)}%</div>
          </div>
          <button class="btn btn-sm btn-primary" style="flex:0 0 auto" data-buy-tier="${key}" ${state.coins < t.price ? 'disabled style="opacity:.5"' : ''}>${t.price} 🪙</button>
        </div>`;
      }).join('')}
    </div>
    <p class="tiny muted" style="text-align:center;margin-top:12px">Every egg lands in the Nest. Warm it to hatch.</p>`;

  let close = () => {};

  const sheet = openSheet({
    title: 'Mystery Shop',
    sub: 'Buy an unknown sprite — the shell gives nothing away.',
    body,
    onMount: (root) => {
      const coinsEl = root.querySelector('[data-shop-coins]');
      const refresh = () => {
        if (coinsEl) coinsEl.textContent = state.coins;
        root.querySelectorAll('[data-buy-tier]').forEach((btn) => {
          const price = EGG_TIERS[btn.dataset.buyTier].price;
          const short = state.coins < price;
          btn.disabled = short;
          btn.style.opacity = short ? '.5' : '';
        });
        if (typeof updateTopbar === 'function') updateTopbar();
      };

      root.querySelectorAll('[data-buy-tier]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.buyTier;
          const tier = EGG_TIERS[key];
          const res = Actions.buyEgg(key);
          if (!res?.ok) return;
          Sfx.hatch?.();
          toast(`${tier.emoji} An unknown sprite is waiting in the Nest.`, '❓');
          refresh();
        });
      });
    },
  });

  close = sheet.close;
  return close;
}
