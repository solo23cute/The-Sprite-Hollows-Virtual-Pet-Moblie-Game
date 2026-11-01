/* Studio: customize the whole game and every sprite's look. */

function openStudioSheet(opts = {}) {
  let targetId = opts.spriteId || state.activeId || grownSprites()[0]?.id || null;
  let unsub = null;

  const body = `
    <div data-preview-wrap></div>
    <div class="style-picker" data-sprite-picker style="margin-top:10px"></div>

    <div class="section-title"><h2>Body</h2><span>breed shape</span></div>
    <div class="style-picker" data-bodies></div>

    <div class="section-title"><h2>Colors</h2><span>dye job</span></div>
    <div class="style-picker" data-palettes></div>

    <div class="section-title"><h2>Pattern</h2></div>
    <div class="style-picker" data-patterns></div>

    <div class="section-title"><h2>Accessory</h2></div>
    <div class="style-picker" data-accessories></div>

    <div class="section-title"><h2>Custom clothes</h2><span>unlimited · saved on this device</span></div>
    <div class="card custom-maker">
      <div class="custom-maker-grid">
        <input id="cloth-name" maxlength="24" placeholder="Outfit name" aria-label="Outfit name">
        <select id="cloth-style" aria-label="Outfit style">
          ${CUSTOM_CLOTH_STYLE_KEYS.map((key) => `<option value="${key}">${CUSTOM_CLOTH_STYLES[key].icon} ${CUSTOM_CLOTH_STYLES[key].name}</option>`).join('')}
        </select>
      </div>
      <div class="custom-maker-row">
        <label class="color-field">Main <input type="color" id="cloth-primary" value="#8b7bff"></label>
        <label class="color-field">Trim <input type="color" id="cloth-secondary" value="#ffd166"></label>
        <button class="btn btn-sm btn-primary" data-add-cloth>${icon('plus')} Add clothes</button>
      </div>
    </div>
    <div class="custom-list" data-custom-clothes></div>

    <button class="btn btn-soft btn-block" data-randomize style="margin-top:10px">${icon('dice')} Surprise me</button>

    <div class="divider" style="margin:20px 0 14px"></div>
    <div class="section-title" style="margin-top:0"><h2>Your Hollow</h2></div>
    <div class="row" style="gap:8px">
      <input id="hollow-name" maxlength="22" value="${esc(state.hollowName)}" placeholder="Name your hollow" style="flex:1;min-width:0;padding:12px 14px;border-radius:13px;background:rgba(255,255,255,.06);border:1px solid var(--line);color:var(--text);outline:none;font-size:13px;font-weight:800">
      <button class="btn btn-sm btn-primary" data-save-name>Save</button>
    </div>

    <div class="section-title"><h2>UI theme</h2><span>colours & glow</span></div>
    <div class="theme-grid" data-themes></div>

    <div class="section-title"><h2>Core habitats</h2><span>starter &amp; gift scenes</span></div>
    <div class="scene-grid" data-scenes></div>
    <div class="section-title"><h2>Biomes &amp; habitats</h2><span>18 type biomes + 8 biome habitats · +50% XP for matches</span></div>
    <button class="btn btn-sm btn-soft btn-block" data-open-biome-atlas style="margin-bottom:8px">🧭 Open the Biome Atlas</button>
    <div class="biome-scene-grid" data-biome-scenes></div>
    <div class="habitat-info" data-habitat-info></div>

    <div class="section-title"><h2>Custom biomes</h2><span>unlimited habitats · no sprite cap</span></div>
    <div class="card custom-maker">
      <div class="custom-maker-grid custom-scene-fields">
        <input id="scene-name" maxlength="28" placeholder="Biome name" aria-label="Custom biome name">
        <input id="scene-habitat" maxlength="20" placeholder="Habitat label" aria-label="Custom habitat label">
        <input id="scene-emoji" maxlength="4" value="🌍" aria-label="Custom biome emoji">
        <select id="scene-bonus" aria-label="Custom biome XP bonus">
          <option value="0.5">+50% XP</option>
          <option value="0.45">+45% XP</option>
          <option value="0.4">+40% XP</option>
        </select>
      </div>
      <div class="custom-maker-row">
        <label class="color-field">Sky <input type="color" id="scene-sky" value="#3b2f6b"></label>
        <label class="color-field">Ground <input type="color" id="scene-ground" value="#35603d"></label>
        <label class="color-field">Glow <input type="color" id="scene-accent" value="#ffd166"></label>
      </div>
      <button class="btn btn-sm btn-primary btn-block" data-add-scene style="margin-top:8px">${icon('plus')} Create &amp; visit biomes</button>
      <p class="tiny muted" style="margin:7px 2px 0;line-height:1.5">Every custom biome welcomes every species, and all of your grown sprites can appear in it at once — there is no resident limit.</p>
    </div>
    <div class="custom-list" data-custom-scenes></div>

    <div class="section-title"><h2>Climate</h2><span>free to switch · season &amp; weather</span></div>
    <div class="style-picker" data-climates></div>
    <p class="tiny muted" data-world-note style="margin-top:8px"></p>

    <div class="section-title"><h2>Game feel</h2></div>
    <div>
      <div class="toggle-row"><div><h4>Sound effects</h4><p>Little synths for pets, coins and games.</p></div><button class="switch" data-toggle="sound" aria-label="Toggle sound"></button></div>
      <div class="toggle-row"><div><h4>Motion</h4><p>Idle bouncing, particles and pops.</p></div><button class="switch" data-toggle="motion" aria-label="Toggle motion"></button></div>
      <div class="toggle-row"><div><h4>Haptics</h4><p>Gentle vibration on touch, where supported.</p></div><button class="switch" data-toggle="haptics" aria-label="Toggle haptics"></button></div>
    </div>

    <div class="section-title"><h2>Voice</h2><span>spoken lines</span></div>
    <div class="style-picker" data-voice-picker></div>
    <p class="tiny muted" data-voice-note style="margin-top:6px"></p>

    <div class="section-title"><h2>${t('settings.language')}</h2><span>app, captions &amp; tour</span></div>
    <div class="style-picker" data-language-picker></div>
    <p class="tiny muted" data-language-note style="margin-top:6px"></p>

    <div class="section-title"><h2>Accessibility</h2><span>hearing support</span></div>
    <div class="toggle-row"><div><h4>${t('settings.captions')}</h4><p>${t('settings.captionsNote')}</p></div><button class="switch" data-toggle="captions" aria-label="Toggle closed captions"></button></div>

    <div class="divider" style="margin:18px 0"></div>
    <button class="btn btn-soft btn-block" data-tour-replay style="margin-bottom:10px">🧭 Replay induction tour</button>
    <button class="btn btn-ghost btn-block" data-reset style="color:var(--bad);border-color:color-mix(in srgb, var(--bad) 35%, transparent)">
      ${icon('trash')} Start a brand-new Hollow
    </button>
    <p class="tiny muted" style="text-align:center;margin-top:8px">This sends every sprite, egg and streak back to the start. Your coins stay with you.</p>
    <p class="tiny muted" style="text-align:center;margin-top:16px">Sprite Hollow v${APP_VERSION} · offline save on this device</p>
  `;

  const { overlay, close } = openSheet({
    title: 'Studio',
    sub: 'Paint a sprite, change the mood of the whole game, name your little world.',
    body,
    onMount: (root, close) => {
      const getTarget = () => (targetId ? findSprite(targetId) : activeSprite());
      const ownsGear = (k) => !ACCESSORIES[k].price || state.wardrobe.includes(k);
      const paintCustomSections = () => {
        const t = getTarget();
        const clothWrap = root.querySelector('[data-custom-clothes]');
        if (clothWrap) {
          const clothes = state.customClothes || [];
          clothWrap.innerHTML = `${t ? `<button class="custom-wear-none ${!t.outfit ? 'on' : ''}" data-outfit-none>No custom outfit</button>` : ''}
            ${clothes.length ? clothes.map((cloth) => `
              <div class="custom-item ${t?.outfit === cloth.id ? 'on' : ''}">
                <button class="custom-item-main" data-wear-cloth="${cloth.id}">
                  <span class="custom-swatch" style="background:linear-gradient(135deg, ${cloth.primary}, ${cloth.secondary})">${CUSTOM_CLOTH_STYLES[cloth.style].icon}</span>
                  <span class="custom-item-copy"><b>${esc(cloth.name)}</b><span>${CUSTOM_CLOTH_STYLES[cloth.style].name}</span></span>
                </button>
                <button class="icon-btn custom-delete" data-delete-cloth="${cloth.id}" aria-label="Delete ${esc(cloth.name)}">${icon('trash')}</button>
              </div>`).join('') : '<p class="tiny muted custom-empty">No custom clothes yet. Name an outfit above and add it to the unlimited wardrobe.</p>'}`;
          clothWrap.querySelectorAll('[data-wear-cloth]').forEach((btn) => {
            btn.addEventListener('click', () => {
              const target = getTarget();
              if (!target) { toast('Hatch a sprite first, then pick an outfit.', '🧵'); return; }
              Actions.wearCustomClothes(target.id, btn.dataset.wearCloth);
              paint();
              Sfx.pop();
            });
          });
          clothWrap.querySelector('[data-outfit-none]')?.addEventListener('click', () => {
            const target = getTarget();
            if (!target) return;
            Actions.wearCustomClothes(target.id, null);
            paint();
            Sfx.click();
          });
          clothWrap.querySelectorAll('[data-delete-cloth]').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              e.stopPropagation();
              const cloth = (state.customClothes || []).find((item) => item.id === btn.dataset.deleteCloth);
              if (!cloth) return;
              const yes = await confirmModal('Delete these clothes?', `“${cloth.name}” will be removed from every sprite wearing it.`, 'Delete clothes', { danger: true });
              if (!yes) return;
              Actions.deleteCustomClothes(cloth.id);
              paint();
            });
          });
        }
        const scenesWrap = root.querySelector('[data-custom-scenes]');
        if (scenesWrap) {
          const scenes = state.customScenes || [];
          scenesWrap.innerHTML = scenes.length ? scenes.map((scene) => `
            <div class="custom-scene-item ${state.theme.scene === scene.id ? 'on' : ''}">
              <button class="custom-scene-main" data-custom-scene="${scene.id}">
                <span class="custom-scene-art" style="background:linear-gradient(160deg, ${scene.sky}, ${scene.ground});color:${scene.accent}">${scene.emoji}</span>
                <span class="custom-item-copy"><b>${esc(scene.name)}</b><span>${esc(scene.habitat)} · +${Math.round((scene.bonus || 0.5) * 100)}% XP · ∞ sprites</span></span>
              </button>
              <button class="icon-btn custom-delete" data-delete-scene="${scene.id}" aria-label="Delete ${esc(scene.name)}">${icon('trash')}</button>
            </div>`).join('') : '<p class="tiny muted custom-empty">No custom biomes yet. Build one above and every sprite can move in.</p>';
          scenesWrap.querySelectorAll('[data-custom-scene]').forEach((btn) => {
            btn.addEventListener('click', () => {
              const scene = (state.customScenes || []).find((item) => item.id === btn.dataset.customScene);
              if (!scene) return;
              Actions.setTheme({ scene: scene.id });
              toast(`${scene.emoji} ${scene.name} · every sprite is welcome here.`, scene.emoji);
              paint();
              Sfx.click();
            });
          });
          scenesWrap.querySelectorAll('[data-delete-scene]').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              e.stopPropagation();
              const scene = (state.customScenes || []).find((item) => item.id === btn.dataset.deleteScene);
              if (!scene) return;
              const yes = await confirmModal('Delete this biome?', `“${scene.name}” and its colors will be removed. Your sprites stay safe in the Hollow.`, 'Delete biome', { danger: true });
              if (!yes) return;
              Actions.deleteCustomScene(scene.id);
              paint();
            });
          });
        }
      };
      const paint = () => {
        paintCustomSections();
        root.querySelectorAll('[data-climate]').forEach((b) => b.classList.toggle('on', b.dataset.climate === (state.world?.climate || 'temperate')));
        const voiceKey = state.theme.voice === false ? 'off' : (state.theme.voiceType === 'male' ? 'male' : 'female');
        root.querySelectorAll('[data-voice]').forEach((b) => b.classList.toggle('on', b.dataset.voice === voiceKey));
        root.querySelectorAll('[data-language]').forEach((b) => b.classList.toggle('on', b.dataset.language === uiLang()));
        const languageNote = root.querySelector('[data-language-note]');
        if (languageNote) languageNote.textContent = `${I18N_LANGUAGES[uiLang()].native} · ${I18N[uiLang()]['settings.languageNote']}`;
        const voiceNote = root.querySelector('[data-voice-note]');
        if (voiceNote) {
          voiceNote.textContent = voiceKey === 'off'
            ? 'Voice is off — no greetings, goodnights, return updates, or needs reminders.'
            : `Spoken greetings, goodnights, and needs reminders use a ${voiceKey} voice.`;
        }
        const note = root.querySelector('[data-world-note]');
        if (note) {
          const climate = CLIMATES[state.world?.climate] || CLIMATES.temperate;
          const season = seasonOf();
          const wx = currentWeather();
          note.textContent = `${season.icon} ${seasonLabel(season, climate.key)} · ${wx.icon} ${wx.name}. ${wx.blurb} ${climate.blurb} Switching climates is free.`;
        }
        const chosenScene = SCENES[state.theme.scene] || SCENES.grove;
        const chosenTarget = getTarget();
        const habitatInfo = root.querySelector('[data-habitat-info]');
        if (habitatInfo) {
          const names = chosenScene.custom
            ? 'Every species is welcome here — no resident limit.'
            : chosenScene.species.slice(0, 6).map((k) => ELEMENTS[k].name).join(' · ');
          const extra = chosenScene.custom ? 0 : chosenScene.species.length - 6;
          const targetHabitat = chosenTarget ? habitatFor(chosenTarget) : null;
          habitatInfo.innerHTML = `<div class="between"><b>${chosenScene.emoji} ${chosenScene.habitat} habitat</b><span class="chip habitat-bonus">+${Math.round((chosenScene.bonus || 0.4) * 100)}% XP</span></div>
            <p>${chosenScene.custom ? `${chosenScene.name} is your custom environment. Every sprite gets the full habitat bonus, and all grown sprites can share it at once.` : `${chosenScene.name} helps ${chosenScene.habitat.toLowerCase()} species grow faster. Visitors still get +10% XP.`}</p>
            <p class="tiny muted">${names}${extra > 0 ? ` · +${extra} more` : ''}</p>
            ${chosenTarget ? `<p class="tiny ${targetHabitat.match ? 'habitat-match' : 'muted'}">${targetHabitat.match ? `${esc(displayName(chosenTarget))} is thriving here.` : `${esc(displayName(chosenTarget))} gets the visitor bonus here.`}</p>` : ''}`;
        }
        const t = chosenTarget;
        const wrap = root.querySelector('[data-preview-wrap]');
        if (!t) {
          wrap.innerHTML = `<div class="card empty-state" style="padding:18px">Hatch a sprite to customize their look.</div>`;
          root.querySelector('[data-bodies]').innerHTML = '';
          root.querySelector('[data-palettes]').innerHTML = '';
          root.querySelector('[data-patterns]').innerHTML = '';
          root.querySelector('[data-accessories]').innerHTML = '';
          return;
        }
        wrap.innerHTML = `<div class="preview-box" style="position:relative">
          <div style="position:absolute;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle, ${resolvePalette(t).body}55, transparent 65%);filter:blur(12px)"></div>
          ${spriteSVG(t, { expr: 'happy' })}
          <div class="row" style="flex-wrap:wrap;justify-content:center;gap:4px">
            <span class="chip">${esc(displayName(t))}</span>
            <span class="chip">${typeName(t)}</span>
            <span class="chip">Lv ${t.level}${t.level >= MAX_LEVEL ? ' · MAX' : ''}</span>
            ${t.mutation ? `<span class="chip chip-mut">✦ ${esc(t.mutation)}</span>` : ''}
          </div>
        </div>`;

        const sprites = grownSprites();
        root.querySelector('[data-sprite-picker]').innerHTML = sprites.map((s) => `
          <button class="style-opt ${s.id === t.id ? 'on' : ''}" data-target="${s.id}">
            <span class="sw" style="background:${resolvePalette(s).body}"></span>${esc(displayName(s))}
          </button>`).join('');
        root.querySelectorAll('[data-target]').forEach((b) => {
          b.addEventListener('click', () => { targetId = b.dataset.target; paint(); });
        });

        root.querySelector('[data-bodies]').innerHTML = BREED_KEYS.map((k) => `
          <button class="style-opt ${t.breed === k ? 'on' : ''}" data-breed="${k}">
            <span class="sw acc">${({ puff: '●', sprig: '🌱', flit: '🪽', horn: '🌙', blob: '🫧', wisp: '✨' })[k]}</span>${BREEDS[k].name}
          </button>`).join('');
        root.querySelectorAll('[data-breed]').forEach((b) => {
          b.addEventListener('click', () => { Actions.customize(t.id, { breed: b.dataset.breed }); paint(); Sfx.pop(); });
        });

        root.querySelector('[data-palettes]').innerHTML = PALETTE_KEYS.map((k) => {
          const colors = k === 'native' ? ELEMENTS[t.element] : PALETTES[k];
          const bg = k === 'native'
            ? `linear-gradient(135deg, ${ELEMENTS[t.element].primary}, ${ELEMENTS[t.element].accent})`
            : `linear-gradient(135deg, ${PALETTES[k].body}, ${PALETTES[k].accent})`;
          return `<button class="style-opt ${t.palette === k ? 'on' : ''}" data-palette="${k}">
            <span class="sw" style="background:${bg}"></span>${k === 'native' ? 'Native' : PALETTES[k].name}
          </button>`;
        }).join('');
        root.querySelectorAll('[data-palette]').forEach((b) => {
          b.addEventListener('click', () => { Actions.customize(t.id, { palette: b.dataset.palette }); paint(); Sfx.pop(); });
        });

        root.querySelector('[data-patterns]').innerHTML = PATTERN_KEYS.map((k) => `
          <button class="style-opt ${t.pattern === k ? 'on' : ''}" data-pattern="${k}">
            <span class="sw acc">${PATTERNS[k].icon}</span>${PATTERNS[k].name}
          </button>`).join('');
        root.querySelectorAll('[data-pattern]').forEach((b) => {
          b.addEventListener('click', () => { Actions.customize(t.id, { pattern: b.dataset.pattern }); paint(); Sfx.pop(); });
        });

        root.querySelector('[data-accessories]').innerHTML = ACCESSORY_KEYS.map((k) => {
          const owned = ownsGear(k);
          return `<button class="style-opt ${t.accessory === k ? 'on' : ''} ${owned ? '' : 'locked-gear'}" data-acc="${k}">
            <span class="sw acc">${ACCESSORIES[k].icon}</span>${ACCESSORIES[k].name}${owned ? '' : ` · ${ACCESSORIES[k].price}🪙`}
          </button>`;
        }).join('');
        root.querySelectorAll('[data-acc]').forEach((b) => {
          b.addEventListener('click', () => {
            const key = b.dataset.acc;
            const bought = ownsGear(key) || Actions.buyGear(key).ok;
            if (bought) Actions.customize(t.id, { accessory: key });
            paint();
            Sfx.pop();
          });
        });

        root.querySelectorAll('[data-toggle]').forEach((b) => {
          const on = state.theme[b.dataset.toggle] !== false;
          b.classList.toggle('on', on);
        });
        root.querySelectorAll('[data-theme]').forEach((b) => b.classList.toggle('on', b.dataset.theme === state.theme.ui));
        root.querySelectorAll('[data-scene]').forEach((b) => b.classList.toggle('on', b.dataset.scene === state.theme.scene));
      };

      root.querySelector('[data-themes]').innerHTML = THEME_KEYS.map((k) => `
        <button class="theme-swatch ${state.theme.ui === k ? 'on' : ''}" data-theme="${k}" style="background:linear-gradient(135deg, ${THEMES[k].swatch[0]}, ${THEMES[k].swatch[1]})" aria-label="${THEMES[k].name} theme">
          <span>${THEMES[k].name}</span>
        </button>`).join('');

      const sceneLocked = (scene, k) => !(scene.unlocked || state.unlockedScenes.includes(k));
      const coreSceneButton = (k) => {
        const scene = SCENES[k];
        const locked = sceneLocked(scene, k);
        const boost = Math.round((scene.bonus || 0.4) * 100);
        const tint = sceneTint(k);
        const count = (scene.species || []).length;
        return `<button class="biome-scene-swatch ${state.theme.scene === k ? 'on' : ''} ${locked ? 'locked' : ''}" data-scene="${k}" title="${esc(scene.habitat)} habitat · +${boost}% XP · ${count} species" ${locked ? 'disabled' : ''} style="--b1:${tint.b1};--b2:${tint.b2};--b3:${tint.b3};background:linear-gradient(135deg, ${tint.b1}, ${tint.b2})">
          <span class="bs-icon">${scene.emoji}</span>
          <span class="bs-copy"><b>${esc(scene.name)}</b><span>${esc(scene.habitat)} · +${boost}% XP · ${count} species${locked ? ' · locked' : ''}</span></span>
        </button>`;
      };
      root.querySelector('[data-scenes]').innerHTML = SCENE_KEYS
        .filter((k) => !SCENES[k].custom && !SCENES[k].biome)
        .map(coreSceneButton)
        .join('');
      root.querySelector('[data-biome-scenes]').innerHTML = SCENE_KEYS
        .filter((k) => SCENES[k].biome)
        .map((k) => {
          const scene = SCENES[k];
          const tint = sceneTint(k);
          const count = (scene.species || []).length;
          const locked = sceneLocked(scene, k);
          const boost = Math.round((scene.bonus || 0.5) * 100);
          return `<button class="biome-scene-swatch ${state.theme.scene === k ? 'on' : ''} ${locked ? 'locked' : ''}" data-scene="${k}" title="${esc(scene.habitat)} biome · +${boost}% XP · ${count} species" ${locked ? 'disabled' : ''} style="--b1:${tint.b1};--b2:${tint.b2};--b3:${tint.b3};background:linear-gradient(135deg, ${tint.b1}, ${tint.b2})">
            <span class="bs-icon">${scene.emoji}</span>
            <span class="bs-copy"><b>${esc(scene.name)}</b><span>${esc(scene.habitat)} · +${boost}% XP · ${count} species</span></span>
          </button>`;
        }).join('');

      root.querySelector('[data-open-biome-atlas]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openBiomeAtlas(), 160);
      });
      root.querySelectorAll('[data-theme]').forEach((b) => {
        b.addEventListener('click', () => {
          Actions.setTheme({ ui: b.dataset.theme });
          applyTheme();
          paint();
          Sfx.click();
        });
      });
      root.querySelectorAll('[data-scene]').forEach((b) => {
        b.addEventListener('click', () => {
          if (b.disabled) {
            toast('That environment is a gift from your sprites. Keep an eye on their gift bubbles.', '🎁');
            return;
          }
          Actions.setTheme({ scene: b.dataset.scene });
          const scene = SCENES[b.dataset.scene];
          if (scene) toast(`${scene.emoji} ${scene.name} · +${Math.round((scene.bonus || 0.4) * 100)}% XP for ${scene.habitat.toLowerCase()} species.`, scene.emoji);
          paint();
          Sfx.click();
        });
      });
      root.querySelector('[data-add-cloth]').addEventListener('click', () => {
        const nameEl = root.querySelector('#cloth-name');
        const name = nameEl.value.trim();
        if (!name) {
          toast('Give the outfit a name first.', '🧵');
          nameEl.focus();
          return;
        }
        const result = Actions.addCustomClothes({
          name,
          style: root.querySelector('#cloth-style').value,
          primary: root.querySelector('#cloth-primary').value,
          secondary: root.querySelector('#cloth-secondary').value,
        });
        if (!result.ok) return;
        const target = getTarget();
        if (target) Actions.wearCustomClothes(target.id, result.cloth.id);
        nameEl.value = '';
        paint();
        toast(`${result.cloth.name} added to the unlimited wardrobe.`, '🧵');
      });
      root.querySelector('[data-add-scene]').addEventListener('click', () => {
        const nameEl = root.querySelector('#scene-name');
        const habitatEl = root.querySelector('#scene-habitat');
        const name = nameEl.value.trim();
        if (!name) {
          toast('Give your biome a name first.', '🌍');
          nameEl.focus();
          return;
        }
        const result = Actions.addCustomScene({
          name,
          habitat: habitatEl.value.trim() || 'Custom',
          emoji: root.querySelector('#scene-emoji').value || '🌍',
          sky: root.querySelector('#scene-sky').value,
          ground: root.querySelector('#scene-ground').value,
          accent: root.querySelector('#scene-accent').value,
          bonus: Number(root.querySelector('#scene-bonus').value),
          travel: true,
        });
        if (!result.ok) return;
        nameEl.value = '';
        habitatEl.value = '';
        paint();
        toast(`${result.scene.emoji} ${result.scene.name} created. Every sprite can live here.`, '🌍');
      });
      root.querySelector('[data-climates]').innerHTML = CLIMATE_KEYS.map((k) => `
        <button class="style-opt ${state.world?.climate === k ? 'on' : ''}" data-climate="${k}">
          <span class="sw acc">${CLIMATES[k].icon}</span>${CLIMATES[k].name}
        </button>`).join('');
      root.querySelectorAll('[data-climate]').forEach((b) => {
        b.addEventListener('click', () => {
          Actions.setClimate(b.dataset.climate);
          paint();
          Sfx.click();
          toast(`${CLIMATES[b.dataset.climate].name} climate. Free to switch. Weather will follow.`, CLIMATES[b.dataset.climate].icon);
        });
      });
      root.querySelector('[data-voice-picker]').innerHTML = [
        { key: 'off', icon: '🔇', label: 'Off' },
        { key: 'female', icon: '👩', label: 'Female' },
        { key: 'male', icon: '👨', label: 'Male' },
      ].map((o) => `<button class="style-opt" data-voice="${o.key}">
        <span class="sw acc">${o.icon}</span>${o.label}
      </button>`).join('');
      root.querySelector('[data-language-picker]').innerHTML = I18N_LANGUAGE_ORDER.map((code) => `
        <button class="style-opt" data-language="${code}">
          <span class="sw acc">🌐</span>${I18N_LANGUAGES[code].native}
        </button>`).join('');
      root.querySelectorAll('[data-language]').forEach((b) => {
        b.addEventListener('click', () => {
          Actions.setTheme({ language: b.dataset.language });
          applyLanguage();
          paint();
          Sfx.click();
          toast(`${I18N_LANGUAGES[uiLang()].native} · ${t('settings.languageNote')}`, '🌐');
        });
      });
      root.querySelectorAll('[data-voice]').forEach((b) => {
        b.addEventListener('click', () => {
          const key = b.dataset.voice;
          if (key === 'off') {
            Actions.setTheme({ voice: false });
            Voice.stop();
            toast('Voice off. The Hollow is quiet.', '🔇');
          } else {
            Actions.setTheme({ voice: true, voiceType: key });
            Voice.stop();
            Voice.init();
            const line = key === 'male'
              ? 'Voice set to male. I will keep you company in the Hollow.'
              : 'Voice set to female. I will keep you company in the Hollow.';
            Voice.speak(line, { force: true, type: key });
            toast(`${key === 'male' ? 'Male' : 'Female'} voice on.`, key === 'male' ? '👨' : '👩');
          }
          paint();
          Sfx.click();
        });
      });
      root.querySelectorAll('[data-toggle]').forEach((b) => {
        b.addEventListener('click', () => {
          const key = b.dataset.toggle;
          const next = !(state.theme[key] !== false);
          Actions.setTheme({ [key]: next });
          applyTheme();
          paint();
          if (key === 'captions' && typeof Captions !== 'undefined') {
            Captions.refresh();
            if (next) Captions.say('Captions are on. Sound effects and spoken lines will appear here.', { kind: 'speech', sticky: true });
          }
          if (key === 'sound' && next) { Sfx.init(); Sfx.coin(); }
        });
      });
      root.querySelector('[data-randomize]').addEventListener('click', () => {
        const t = getTarget();
        if (!t) return;
        const palettes = PALETTE_KEYS.filter((k) => k !== 'native');
        Actions.customize(t.id, {
          palette: chance(0.35) ? 'native' : pick(palettes),
          pattern: pick(PATTERN_KEYS),
          accessory: pick(FREE_ACCESSORY_KEYS),
          breed: pick(BREED_KEYS),
        });
        paint();
        burstOn(root.querySelector('[data-randomize]'), ['🎨', '✨', '💛'], 6);
        Sfx.pop();
        toast('Fresh look, who dis?', '🎨');
      });
      root.querySelector('[data-save-name]').addEventListener('click', () => {
        Actions.setHollowName(root.querySelector('#hollow-name').value);
        toast('Hollow renamed.', '🏡');
      });
      root.querySelector('[data-tour-replay]').addEventListener('click', () => {
        close();
        setTimeout(() => startTour({ fromStudio: true }), 180);
      });
      root.querySelector('[data-reset]').addEventListener('click', async () => {
        const banked = Math.max(0, Math.floor(Number(state.coins) || 0));
        const yes = await confirmModal('Start over?', `Every sprite, egg, unlock, streak and journal entry will be erased, and you will pick a new starter egg. Your ${banked.toLocaleString()} coins stay in your pocket. This cannot be undone.`, `Restart with ${banked.toLocaleString()} coins`, { danger: true });
        if (yes) Actions.reset();
      });

      unsub = subscribeState((d) => { if (d.type !== 'theme') paint(); });
      paint();
    },
    onClose: () => { if (unsub) unsub(); },
  });
  return { overlay, close };
}
