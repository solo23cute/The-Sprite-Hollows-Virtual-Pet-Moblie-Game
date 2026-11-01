/* First-run induction tour. Replayable from Studio. */

const TOUR_STEPS = [
  {
    icon: '🏡', kicker: 'YOUR HOLLOW',
    title: 'This is home base',
    text: 'This is your home base. Tap your active sprite to pet them, then use the care dock along the bottom to Feed, Play, Walk, Rub Belly, Throw Ball, Play Catch, Bathe, Nap, Bed, and Talk. Food, Rest, Joy, and Clean fade in real time, even while the app is closed.',
    points: [
      'A green “thriving here” message means the current habitat is boosting XP.',
      'When a need runs low, the sprite asks for the matching care action.',
    ],
    tip: 'Tap the sprite first. Petting is free, builds bond, and has a short cooldown.',
  },
  {
    icon: '🥾', kicker: 'CARE & TRAIL WALKS',
    title: 'Care first, then go wandering',
    text: 'Care is the daily loop: Feed, Play, Walk, Rub Belly, Throw Ball, Play Catch, Bathe, Nap, Bed, and Talk. Belly rubs build Joy and bond. Throw Ball and Play Catch open a five-catch fetch game that pays coins, XP, bond, and fills the Care Package meter. Bed opens the bedroom sheet for tuck-ins and the dream journal. Walk takes your active sprite outside to Jog, Run, and every route, while Activities has Hoop Shot and Goal Kick. Needs fade in real time, so check the four bars before a long activity.',
    points: [
      'Tap Walk, choose a trail, then tap glowing pawprints. Coins and gift tokens add extra steps; puddles trip you.',
      'Every walk, jog, or run pays coins and XP, restores Joy, and gives extra bond. Every third outing opens a Trail Gift with bonus coins and a snack.',
      'Hollow Stroll and Sunrise Jog are open immediately. Moonlit Stroll unlocks at 3 walks, Wind Sprint at 5, and Summit Scramble at 8.',
      'Hoop Shot and Goal Kick are in Activities: time the basketball meter or kick past the sliding keeper, and earn a guaranteed pantry food plus a sport gift every two games.',
      'Outings spend a little Food and Rest. Feed a snack and tuck in for a nap afterward; petting and talking are free.',
    ],
    tip: 'If a need is under 20, care for it before moving. Jog and Run are faster and pay more; both sports pay food and build toward gifts.',
  },
  {
    icon: '🥚', kicker: 'THE NEST',
    title: 'Warm, hatch, and merge',
    text: 'Open the Nest to hatch, merge, or visit the Secret Vault. Tap an egg to warm it until the shell cracks, then hatch the baby into your collection. Type eggs always hatch one chosen species, while wild eggs roll a random element. The Vault button shows every unlocked secret and its possible children.',
    points: [
      'Merge two level 3 or higher sprites to blend elements, colours, patterns, and personality into a new egg.',
      'Merging costs 70 coins plus 25 per parent generation, and both parents rest for 60 seconds.',
      'Retired sprites are valid parents, and any two types can merge. Open the Vault to see combinations and preview a child with any species.',
    ],
    tip: 'Start with a 45-coin Wild Egg, or save for a type egg when you want an exact species.',
  },
  {
    icon: '💛', kicker: 'SPRITES & GROWTH',
    title: 'Raise them to level 1,000',
    text: 'Everything you do together grants XP. Feeding, games, chats, baths, naps, trails, and petting all count, and matching the habitat multiplies the gain. Sprites grow through Baby, Juvenile, Sprite, and Elder at levels 1, 5, 10, and 20, then keep growing to the new cap of level 1,000.',
    points: [
      'Feeding builds the Hearty, Sweet, Eerie, and Wild diet affinities.',
      'Open a sprite to see a NEXT EVOLUTION card with its next stage, required level, XP left, and progress.',
      'At level 10, twelve points in one diet path unlocks a permanent Dragon, Fairy, Ghoul, or Titan form.',
      'The Bond Codex lists all six bond ranks, their passive bonuses, every stage, and every diet evolution.',
      'A sprite retires only at level 1,000. A Rebirth Meal returns them to an egg with permanent rebirth bonuses.',
    ],
    tip: 'Retired sprites still count for Vault progress and can merge. A Rebirth Meal starts their next life with permanent bonuses.',
  },
  {
    icon: '📚', kicker: 'COLLECTION & FOOD',
    title: 'Every species and every snack',
    text: 'Collection holds every species you have met, and Types is the full encyclopedia with type eggs, rarity, genes, and Titans. Food and Snacks lists the market, pantry, snacks, and every diet effect.',
    points: [
      'Buy food in the market, then feed it from the pantry to raise needs and build a diet path.',
      'The World Kitchen, Anime Kitchen, and Trainer pantry are all searchable guides.',
      'Ten candy items add Sugar. At three Sugar, the sprite transforms into a candy species.',
      `A ${DISNEY_TOTAL}-character Disney collection spans Mickey, classics, princesses, Pixar, villains, and modern favorites in the Wiki.`,
      `A ${CARE_BEAR_TOTAL}-character Care Bears & Cousins collection adds the classic bears, Cousins, and 15 extended-family favourites. Activate one and every 3 games, trails, or sports wraps a Care Package of coins, XP, pantry food, and a snack.`,
      `A ${FORTNITE_LEGACY_TOTAL}-sprite Fortnite Legacy roster adds multiple headliners from every past season, Chapter 1 through Chapter 5. A ${WWE_TOTAL}-superstar WWE locker room now spans the Golden, Attitude, Ruthless Aggression, PG, Women’s, Tag Team, and NXT eras.`,
      `A ${LEGEND_TOTAL}-character crossover legends pack adds curated families from FNAF, Mario, Spore, Tom and Jerry, Looney Tunes, Zelda, The Walking Dead, horror, and video games.`,
      `A ${NETFLIX_TOTAL}-character Netflix animation wing now sits under TV Legends: 10 Netflix Anime shows and 10 Netflix Toons shows with three characters each, show filters, and owned progress. A ${TV_FAMILY_TOTAL}-character TV family now spans both rosters.`,
      `A ${CATALOG_TOTAL}-sprite catalog adds PBS Kids, Monster Jam, Nickelodeon, Nick Jr., Nicktoons, Discovery, animated movies, comics, Disney Jr., Disney XD, and every video-game genre.`,
      'The Types Codex now shows the full 12-tier ladder: nine base ranks plus the trail-only Celestial, Divine, and Eternal apex ranks.',
      'Open the Bond Codex from Types or the Wiki to read all six bond ranks and the complete evolution path.',
      'Eighteen world type variants and the Shortcut pathfinder are in the Wiki, each with a live species file.',
    ],
    tip: 'Use the search on Types to find a species, then open its card for its egg, habitat, and hybrids.',
  },
  {
    icon: '🤲', kicker: 'CARE-DOCK GAMES',
    title: 'Rub, throw, and play catch',
    text: 'The care dock now has three more ways to connect. Rub Belly raises Joy and bond with a short cooldown. Throw Ball and Play Catch open a five-catch fetch game: tap the moving ball, watch the catch meter fill, and finish for coins, XP, bond, and credit toward games and Care Packages. Walk is still the trail button, and Play still opens the full Activities hub.',
    points: [
      'Rub Belly is free and has a short cooldown; it is perfect when Joy is low.',
      'Throw Ball and Play Catch both count as games for daily, weekly, and monthly tasks.',
      'The fetch game uses the active sprite, so a pony’s task and check-in bonuses stay active afterward.',
    ],
    tip: 'If the ball feels too fast, watch the yellow glow and tap anywhere on the ball. Every catch pauses it for a moment.',
  },
  {
    icon: '🦄', kicker: 'NEW COLLECTIONS',
    title: 'Ponies, TV, four realms, and Keyblades',
    text: `Four new collections live in the Nest. There are ${PONY_TOTAL} My Little Pony friends, ${TV_LEGACY_TOTAL} TV Legends, ${REALM_TOTAL} horror/light/darkness sprites, and ${KH_TOTAL} Kingdom Hearts characters. The widening wave adds 50 background ponies, 10 royal leaders, 15 extended Care Bears, full-show TV casts, and the Disney worlds of Kingdom Hearts. Every one has a gene, Titan, type egg, habitat, named hybrid, Wiki file, and original procedural art.`,
    points: [
      'Ponies add bonus coins to check-ins and completed tasks while active. Background ponies, royal leaders, and the expanded Care family all use the same care systems.',
      'TV Legends now build full-show casts across prestige drama, sitcoms, sci-fi, fantasy, and animated shows, each with a show label.',
      'Netflix Anime and Netflix Toons each have their own roster tab, a filter for all 10 shows, and owned counts for the wing and every show.',
      'Horror, Dark Horror, Light, and Darkness each have their own eight-sprite family and realm aura.',
      'Kingdom Hearts covers Destiny Islands, all of Organization XIII, the Wayfinders, Seekers, Keyblade legacy, and 50 Disney-world characters.',
    ],
    tip: 'Open the Wiki Roster browser to filter ponies by family, TV by show, and Keyblade characters by world. Every card opens its species file.',
  },
  {
    icon: '🧭', kicker: 'TYPE BIOMES',
    title: 'Eighteen homes for eighteen types',
    text: 'Every one of the eighteen standard types has a dedicated biome with its own sky, ground, weather, and guardian. Studio now separates Core habitats, Type biomes, and Custom biomes so all 18 are visible and selectable. Matching species earn 50% more XP there, and visitors still get a small bonus.',
    points: [
      'Open Studio, then use the Type biomes group or the Biome Atlas button.',
      'The Biome Atlas shows all 18 guardians, species counts, and visited progress.',
      'The Biome Studio builds unlimited custom habitats with your own colours, emoji, and XP bonus.',
      'Custom biomes welcome every grown sprite with no resident cap.',
    ],
    tip: 'Switching habitats and climates is free. Try a new home whenever you like.',
  },
  {
    icon: '🎮', kicker: 'CLASSIC GAMES',
    title: 'Nineteen games, five trails, and two sports',
    text: 'Play has nineteen touch games: nine Hollow classics, three Arcade challenges, five trail activities, and two sports — Hoop Shot basketball and Goal Kick soccer. Four classics are open from the start; Jog is open immediately, and the faster routes unlock as you walk. Every completed game pays coins and XP to your active sprite, plus joy and bond. Trails can pay pantry food, and both sports always do.',
    points: [
      'Treat Catch: tap falling treats and avoid pebbles for twenty seconds.',
      'Pulse Match: tap when the moving ring lines up with the target, and chase perfect hits.',
      'Sprite Says: watch the pads light up, then repeat the pattern.',
      'Coin Dig: tap buried coins and gems, but leave the bombs alone.',
      'Nectar Pop: tap blooming flowers and dodge grumpy bees. Unlocks at four check-ins.',
      'Green Toss: toss the ring when the marker crosses the green basket band. Unlocks at six check-ins.',
      'Moon Match: flip moon cards and find every pair. Unlocks at twelve check-ins.',
      'Candy Crunch: tap candies and avoid toothaches. Unlocks at fourteen check-ins.',
      'Holiday Lights: watch the ornament glow, then repeat it. Unlocks at twenty check-ins.',
      'Hollow Stroll: always open. Tap pawprints, coins, and gifts; puddles cost steps.',
      'Sunrise Jog: always open. A quicker trail with more coins and a higher food chance.',
      'Moonlit Stroll: unlocks after three walks, with richer coins, XP, and bond.',
      'Wind Sprint: unlocks after five walks. The fastest trail, with the best food and coin bonus.',
      'Summit Scramble: unlocks after eight walks, with the biggest trail payout.',
      'Hoop Shot: basketball. Time the shot meter; it always pays a pantry food and builds toward a sport gift every two games.',
      'Goal Kick: soccer. Time the kick while the keeper slides; open corners score three, close shots score two.',
    ],
    tip: 'Games pay more when the active sprite is rare. Trails add extra bond and a Trail Gift every three outings; both sports pay food and a Sport Gift every two games. Common or Uncommon sprites also make normal gifts arrive 25% sooner.',
  },
  {
    icon: '🏟️', kicker: 'ARCADE CHALLENGES',
    title: 'Three games with a bonus track',
    text: 'The other three games are Arcade challenges. They are always open, and their coins fill bonus gifts and the monthly prize track as well as your normal wallet.',
    points: [
      'Rune Slide: match the order strip and tap a rune beside the empty slot to slide it. Finish three boards in two minutes; green runes are already in place.',
      'Zombie Siege: tap zombies before they reach the lantern. You have three hearts and thirty seconds.',
      'Hollow Duel: press Strike when the marker is in the green centre for a perfect hit, and press Guard before the brute attacks.',
    ],
    tip: 'Every 5,000 Arcade coins fills a bonus gift. Every third gift and the higher month tiers include a Starpath Feast that advances one growth stage.',
  },
  {
    icon: '📅', kicker: 'TODAY & WEATHER',
    title: 'Check in, quest, and collect',
    text: 'Today runs the Hollow calendar. Check in during the morning, afternoon, evening, and night windows for coins, snacks, and streak progress. Quests and goals pay extra for things you already do.',
    points: [
      'The monthly crate pays coins, stocks food, and unlocks a new monthly dish.',
      'Weekly and monthly tracks add bigger milestones and a yearly mythic reward.',
      'Weather follows the real date. Cold or wet weather drains needs faster, so use the wardrobe.',
    ],
    tip: 'The first check-in of the day keeps the daily streak alive and stocks a pantry food.',
  },
  {
    icon: '🦸', kicker: 'HEROES & VILLAINS',
    title: 'Sixty-one signatures from both multiverses',
    text: 'A sixty-one-character hero wave lives in the Nest: twenty-eight heroes, twenty-one villains, and twelve anti-heroes, split into thirty-two Marvel, twenty-two DC, and seven Beyond Marvel and DC characters. Deadpool and Gwenpool are in the Marvel set, and classic Spider-Man is listed alongside them.',
    points: [
      'Every signature has its own gene, Titan, type egg, habitat, and named hybrid.',
      'Open the Wiki and search Marvel or DC to filter the roster.',
      'The Heroes, villains and anti-heroes guide groups everyone by publisher, with role labels.',
    ],
    tip: 'Species articles show Publisher and Role in the infobox, plus a button back to the wave guide.',
  },
  {
    icon: '🔐', kicker: 'SECRETS & EXOTICS',
    title: 'Some doors are not in the Nest',
    text: `${SECRET_SPECIES.length} secret sprites are not sold in the Nest. Open the Vault from the Nest to see every unlocked keeper, its parent types, named hybrids, and a possible-child preview. Milestone doors, twelve monthly keepers, and eight twice-weekly relays are tracked there. Exotic guardians are different: they can hatch from their type eggs.`,
    points: [
      'Finish this tour to earn the first secret, the Hollow Guide.',
      'Reach level 1,000, visit all eighteen biomes, reach 100 bond, hatch 25 eggs, and decode the Master name for the rest.',
      'Open the Vault during a monthly or Monday–Wednesday / Thursday–Sunday window, then claim the keeper before it rotates.',
      'Retired sprites still count for Vault progress and can be used as merge parents.',
      'Collect 8 Fortnite Legacy species for the Season Keeper, or 6 WWE species for the Ring Keeper. Reach 16 Legacy or 12 WWE to earn the exotic Rift Champion or Grand Slam.',
      'The Elder Keeper unlocks when a sprite retires at MAX; this tour awards the Hollow Guide.',
      'The Master Cheat answers to the word MASTER once the tour is complete.',
    ],
    tip: 'The vault tracks every clue, so open it whenever a milestone feels close.',
  },
  {
    icon: '🎨', kicker: 'STUDIO',
    title: 'Make the Hollow yours',
    text: 'Studio changes the UI theme, climate, scene, body, colours, patterns, accessories, voice, and your Hollow name. The Wardrobe saves unlimited named outfits, and the Biome Studio builds unlimited custom habitats.',
    points: [
      'Apply or remove an outfit at any time, then edit or delete it later.',
      'Studio separates Core habitats, Type biomes, and Custom biomes, so the 18 type environments no longer disappear in the picker.',
      'Custom biomes set their own colours, emoji, habitat label, and XP bonus.',
      'The Wiki Quick jump row reaches cartoons, comics, game genres, world variants, the Vault, and the breeder in one tap.',
      'Shortcut is a real pathfinder species with its own gene, habitats, and named hybrid.',
      'Replay this tour or start over from Studio whenever you want.',
    ],
    tip: 'Custom outfits and custom biomes are free to make, edit, and apply with no unlock cap.',
  },
  {
    icon: '🏁', kicker: 'READY',
    title: 'That is the whole Hollow',
    text: 'That is the whole Hollow. Hatch a sprite, keep their needs happy, take them walking or to the sports court, rub a belly or play fetch, play the games, visit the Vault, check in daily, and fill the encyclopedia. The Wiki holds every rule and every species file if you forget a detail.',
    points: [
      'Start with the care dock in the Hollow, a Wild Egg in the Nest, or a trail walk from the Walk button.',
      'The induction tour can be replayed from Studio at any time.',
    ],
    tip: 'Finishing this step awards the first secret and opens the rest of the Secret Vault clues.',
  },
];

/* The tour reads the live game data, so new age tiers, biomes, and sprite waves
   appear here automatically with no hand-maintained counts. */
function tourLiveStep() {
  const tiers = STAGE_ORDER.map((stage) => `${STAGE_LABELS[stage]} ${STAGE_LEVEL[stage]}`).join(' · ');
  const waves = collectionWaves();
  return {
    icon: '🥋',
    kicker: 'EVOLUTION & CODEX',
    title: `${STAGE_ORDER.length} age tiers, ${ELEMENT_KEYS.length.toLocaleString()} sprites`,
    text: `Every sprite grows through ${tiers}. Crossing an age tier opens an evolution screen with the new stage, its bonus, and the full ladder, and the same screen appears when a diet path unlocks a Dragon, Fairy, Ghoul, or Titan form. The final tier is Sensei, and a Sensei can retire at level 100.`,
    points: [
      `${waves.length} collection waves are live, and the Codex, Wiki, and this tour rebuild their counts from the same data whenever new sprites are added.`,
      ...waves.slice(0, 7).map((wave) => `${wave.icon} ${wave.label} · ${wave.count()}`),
      `The Type encyclopedia lists all ${ELEMENT_KEYS.length.toLocaleString()} species, ${BIOME_KEYS.length} biomes, and every evolution path.`,
      'Weekends run an Admin Event: bonus XP, bonus coins, and one free Admin or special event egg.',
    ],
    tip: 'Open Codex → Type encyclopedia for the full list, or Wiki → Collection waves for live counts per wave.',
  };
}

(function syncTourGrowth() {
  const step = TOUR_STEPS.find((item) => item.kicker === 'SPRITES & GROWTH');
  if (!step) return;
  step.title = `Raise them to level ${MAX_LEVEL.toLocaleString()}`;
  step.text = step.text.replace(/Sprites grow through[^.]*\./, `Sprites grow through ${STAGE_ORDER.map((stage) => `${STAGE_LABELS[stage]} at level ${STAGE_LEVEL[stage]}`).join(', ')}.`);
})();

TOUR_STEPS.splice(Math.max(0, TOUR_STEPS.length - 1), 0, tourLiveStep());

function tourSentenceParts(text) {
  return (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text])
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function startTour({ fromStudio = false } = {}) {
  let index = 0;
  let settled = false;
  let unlocked = null;
  let speaking = false;
  let voiceWanted = typeof Voice !== 'undefined' && Voice.enabled();
  let voiceOverride = false;
  let speakToken = 0;
  const speechTimers = new Set();

  const { overlay, close } = openSheet({
    title: t('tour.title'),
    sub: fromStudio ? t('tour.subReplay') : `${TOUR_STEPS.length} ${t('tour.sub')}`,
    body: '<div data-tour-body></div>',
    onClose: () => {
      stopSpeech();
      if (!settled) {
        settled = true;
        if (typeof Actions.markTourSeen === 'function') Actions.markTourSeen();
      }
    },
  });

  const body = overlay.querySelector('[data-tour-body]');

  function updateVoiceButton() {
    const btn = body.querySelector('[data-tour-voice]');
    const note = body.querySelector('[data-tour-voice-note]');
    if (!btn || !note) return;
    const supported = typeof Voice !== 'undefined' && Voice.supported();
    btn.disabled = !supported;
    btn.textContent = speaking ? t('tour.stop') : t('tour.read');
    btn.setAttribute('aria-pressed', speaking ? 'true' : 'false');
    if (!supported) note.textContent = t('tour.voiceUnavailable');
    else if (!Voice.enabled() && !voiceOverride) note.textContent = t('tour.voiceOff');
    else if (speaking) note.textContent = t('tour.reading');
    else note.textContent = t('tour.tap');
  }

  function stopSpeech() {
    speakToken += 1;
    speechTimers.forEach((id) => clearTimeout(id));
    speechTimers.clear();
    speaking = false;
    if (typeof Voice !== 'undefined') Voice.stop();
    body.querySelectorAll('.tour-speaking').forEach((node) => node.classList.remove('tour-speaking'));
    updateVoiceButton();
  }

  function say(element, token, done) {
    if (token !== speakToken) return;
    const text = (element.textContent || '').replace(/\s+/g, ' ').trim();
    if (!text) {
      done();
      return;
    }
    body.querySelectorAll('.tour-speaking').forEach((node) => node.classList.remove('tour-speaking'));
    element.classList.add('tour-speaking');
    element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    if (typeof Voice !== 'undefined') {
      Voice.speak(text, { force: true, allowMuted: voiceOverride, rate: 0.94 });
    }
    const delay = Math.max(1600, Math.round(text.split(/\s+/).length * 390 + 550));
    const id = setTimeout(() => {
      speechTimers.delete(id);
      if (token === speakToken) done();
    }, delay);
    speechTimers.add(id);
  }

  function narrateCurrent() {
    stopSpeech();
    if (!voiceWanted) return;
    if (typeof Voice === 'undefined' || !Voice.supported()) return;
    const segments = [...body.querySelectorAll('[data-tour-say]')];
    if (!segments.length) return;
    speaking = true;
    updateVoiceButton();
    const token = speakToken;
    let cursor = 0;
    const next = () => {
      if (token !== speakToken) return;
      if (cursor >= segments.length) {
        speaking = false;
        body.querySelectorAll('.tour-speaking').forEach((node) => node.classList.remove('tour-speaking'));
        updateVoiceButton();
        return;
      }
      say(segments[cursor++], token, next);
    };
    next();
  }

  function paint() {
    stopSpeech();
    const step = tourStepText(TOUR_STEPS[index], index);
    const last = index === TOUR_STEPS.length - 1;
    const sentences = tourSentenceParts(step.text);
    body.innerHTML = `<div class="tour-card">
      <div class="tour-top">
        <span class="tour-icon">${step.icon}</span>
        <span class="tour-kicker">${step.kicker}</span>
        <span class="tour-count">${index + 1} / ${TOUR_STEPS.length}</span>
      </div>
      <div class="tour-langs" role="group" aria-label="Tour language">
        <span>🌐 ${t('settings.language')}</span>
        ${I18N_LANGUAGE_ORDER.map((code) => `<button class="chip tour-lang ${uiLang() === code ? 'on' : ''}" data-tour-lang="${code}" aria-pressed="${uiLang() === code}">${I18N_LANGUAGES[code].native}</button>`).join('')}
      </div>
      <h3 data-tour-say>${step.title}</h3>
      <p class="tour-text">${sentences.map((sentence) => `<span class="tour-sentence" data-tour-say>${sentence}</span>`).join(' ')}</p>
      <div class="tour-points">${(step.points || []).map((point) => `<div class="tour-point"><span>✦</span><span data-tour-say>${point}</span></div>`).join('')}</div>
      <div class="tour-tip"><span>✦</span><span data-tour-say>${step.tip}</span></div>
      <div class="tour-voice">
        <button class="btn btn-soft btn-sm" type="button" data-tour-voice aria-pressed="false">${t('tour.read')}</button>
        <span class="tour-voice-note" data-tour-voice-note></span>
      </div>
      <div class="tour-dots">${TOUR_STEPS.map((_, i) => `<i class="${i === index ? 'on' : i < index ? 'done' : ''}"></i>`).join('')}</div>
      <div class="tour-actions">
        <button class="btn btn-ghost btn-sm" data-tour-skip>${last ? t('tour.close') : t('tour.skip')}</button>
        <div class="row" style="gap:8px">
          ${index > 0 ? `<button class="btn btn-soft btn-sm" data-tour-back>${t('tour.back')}</button>` : ''}
          <button class="btn btn-primary btn-sm" data-tour-next>${last ? t('tour.start') : t('tour.next')}</button>
        </div>
      </div>
      ${last ? `<p class="tiny muted" style="text-align:center;margin-top:10px">${t('tour.firstSecret')}</p>` : ''}
    </div>`;
    updateVoiceButton();
    body.querySelectorAll('[data-tour-lang]').forEach((button) => {
      button.addEventListener('click', () => {
        Actions.setTheme({ language: button.dataset.tourLang });
        applyLanguage();
        stopSpeech();
        paint();
        Sfx.click();
      });
    });
    body.querySelector('[data-tour-voice]')?.addEventListener('click', () => {
      Sfx.click();
      if (speaking) {
        stopSpeech();
        return;
      }
      voiceWanted = true;
      voiceOverride = true;
      narrateCurrent();
    });
    body.querySelector('[data-tour-next]').addEventListener('click', () => {
      Sfx.click();
      stopSpeech();
      if (last) {
        settled = true;
        if (typeof Actions.completeTour === 'function') unlocked = Actions.completeTour();
        close();
        if (unlocked) toast(`${unlocked.name} joined your Hollow. Check the Secret Vault in Types.`, '🔐');
        else toast('Tour complete. The Hollow is yours.', '🧭');
        return;
      }
      index += 1;
      paint();
    });
    body.querySelector('[data-tour-skip]').addEventListener('click', () => {
      Sfx.click();
      stopSpeech();
      settled = true;
      if (typeof Actions.markTourSeen === 'function') Actions.markTourSeen();
      close();
    });
    body.querySelector('[data-tour-back]')?.addEventListener('click', () => {
      Sfx.click();
      stopSpeech();
      index = Math.max(0, index - 1);
      paint();
    });
    if (voiceWanted) narrateCurrent();
  }

  paint();
  return { close };
}
