/* Spritepedia: a searchable wiki for every species and every Hollow system. */

function wikiHabitats(key) {
  return SCENE_KEYS.filter((sceneKey) => !SCENES[sceneKey].custom && (SCENES[sceneKey].species || []).includes(key));
}

function wikiHabitatRows(key) {
  return wikiHabitats(key).map((sceneKey) => {
    const scene = SCENES[sceneKey];
    return `<div class="wiki-habitat-row">
      <span class="wh-emoji">${scene.emoji}</span>
      <span class="wh-copy"><b>${scene.name}</b><span>${scene.habitat} · +${Math.round((scene.bonus || 0.4) * 100)}% XP</span></span>
    </div>`;
  }).join('');
}

function wikiHabitatTable() {
  return SCENE_KEYS.filter((sceneKey) => !SCENES[sceneKey].custom).map((sceneKey) => {
    const scene = SCENES[sceneKey];
    return `<div class="wiki-habitat-row">
      <span class="wh-emoji">${scene.emoji}</span>
      <span class="wh-copy"><b>${scene.name}</b><span>${scene.habitat} · +${Math.round((scene.bonus || 0.4) * 100)}% XP · ${scene.species.length} species</span></span>
    </div>`;
  }).join('');
}

function wikiFinishList() {
  return FINISH_KEYS.map((key) => {
    const finish = FINISHES[key];
    return `<span class="chip">${finish.icon} ${finish.name}</span>`;
  }).join('');
}

function worldKitchenBody() {
  return `<p class="wiki-lede">The market now carries <b>${WORLD_FOOD_KEYS.length} World Kitchen dishes</b> from eight regions. Each one is a normal market food: it stocks in the pantry, raises needs, and builds a diet affinity.</p>` +
    Object.entries(WORLD_FOOD_REGIONS).map(([region, meta]) => {
      const dishes = WORLD_FOOD_KEYS.filter((key) => WORLD_FOODS[key].region === region);
      return `<h3>${meta.icon} ${meta.name}</h3>
        <p>${meta.blurb}</p>
        <div class="wiki-hybrid-list">${dishes.map((key) => `<button class="wiki-link" data-world-food="${key}"><b>${WORLD_FOODS[key].emoji} ${WORLD_FOODS[key].name}</b><span>${WORLD_FOODS[key].desc}</span></button>`).join('')}</div>`;
    }).join('') +
    `<p>Every dish is available from the market at its listed price. Tap any card to see its full effects and diet affinity, then buy it from the Hollow feed sheet.</p>`;
}

function animeKitchenBody() {
  const animeFoods = ANIME_KITCHEN_KEYS;
  const trainerFoods = TRAINER_KITCHEN_KEYS;
  const animeSnacks = SNACK_KEYS.filter((key) => SNACKS[key].anime);
  const trainerSnacks = SNACK_KEYS.filter((key) => SNACKS[key].trainer);
  const dish = (key) => `<button class="wiki-link" data-world-food="${key}"><b>${FOODS[key].emoji} ${esc(FOODS[key].name)}</b><span>${esc(FOODS[key].desc)}</span></button>`;
  const snack = (key) => `<button class="wiki-link" data-world-food="${key}"><b>${SNACKS[key].emoji} ${esc(SNACKS[key].name)}</b><span>${esc(SNACKS[key].desc)}</span></button>`;
  return `<p class="wiki-lede">Two new kitchens stocked the pantry: <b>${animeFoods.length} anime dishes</b> and <b>${trainerFoods.length} Trainer foods</b>, plus <b>${animeSnacks.length + trainerSnacks.length} free snacks</b>.</p>
    <p>Every item is a normal food or snack. Dishes are sold in the market and build a diet affinity; snacks are free and can drop from check-ins and gifts. Use the <b>🍥 Anime</b> and <b>⚡ Trainer</b> chips in the Food &amp; snacks guide to browse each kitchen.</p>
    <h3>🍥 Anime kitchen</h3>
    <p>Noodles, rice bowls, festival treats, cafés, and impossible desserts.</p>
    <div class="wiki-hybrid-list">${animeFoods.map(dish).join('')}</div>
    <h3>🍥 Anime snacks</h3>
    <div class="wiki-hybrid-list">${animeSnacks.map((key) => snack(key)).join('')}</div>
    <h3>⚡ Trainer pantry</h3>
    <p>Puffs, poffins, regional sweets, restoring drinks, and the classic Trainer staples.</p>
    <div class="wiki-hybrid-list">${trainerFoods.map(dish).join('')}</div>
    <h3>⚡ Trainer snacks</h3>
    <p>Berries, beans, blocks, and a couple of sweet finds for the road.</p>
    <div class="wiki-hybrid-list">${trainerSnacks.map((key) => snack(key)).join('')}</div>`;
}

function heroWaveBody() {
  const notes = {
    marvel: 'Street-level defenders, Avengers, cosmic guardians, and the villains who keep crashing the team-up.',
    dc: 'The Gotham night shift, the League, and the stranger corners of the DC roster.',
    other: 'Invincible, Hellboy, Zorro, and the rest of the capes outside the big two.',
  };
  const byPublisher = { marvel: [], dc: [], other: [] };
  HERO_SPECIES.forEach((key) => byPublisher[ELEMENTS[key].heroPublisher].push(key));
  const classicMarvel = ['spiderman'].filter((key) => ELEMENTS[key] && ELEMENTS[key].heroPublisher === 'marvel');
  const link = (key) => {
    const el = ELEMENTS[key];
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${HERO_ROLE_META[el.heroRole].label} · ${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`;
  };
  return `<p class="wiki-lede">A <b>${HERO_SPECIES.length}-character hero wave</b> landed in the Hollow: <b>${HERO_BY_ROLE.hero.length} heroes</b>, <b>${HERO_BY_ROLE.villain.length} villains</b>, and <b>${HERO_BY_ROLE.anti.length} anti-heroes</b>. Every one is a full collectible with a gene, Titan, type egg, home habitat, named hybrid, and original procedural silhouette.</p>
    <p>They are sorted by publisher: <b>${byPublisher.marvel.length} Marvel</b>, <b>${byPublisher.dc.length} DC</b>, and <b>${byPublisher.other.length} Beyond Marvel &amp; DC</b>. Each publisher section keeps the hero, villain, and anti-hero roles together, so you can browse a universe end to end.</p>
    <p>The art is original vector work rather than imported character sprites. Names are used for identification in this offline fan project; each silhouette is built from the Hollow's own body plans, palettes, symbols, and masks.</p>
    ${['marvel', 'dc', 'other'].map((publisher) => `<h3>${HERO_PUBLISHER_META[publisher].icon} ${HERO_PUBLISHER_META[publisher].label} · ${byPublisher[publisher].length}</h3><p>${notes[publisher]}</p><div class="wiki-hybrid-list">${byPublisher[publisher].map(link).join('')}</div>`).join('')}
    ${classicMarvel.length ? `<h3>🕸️ Classic Marvel</h3><p>Spider-Man was already in the Hollow before this wave. He keeps his Web Swing gene, Titan, type egg, and habitat, and now sits in the same Marvel roster as Deadpool and Gwenpool.</p><div class="wiki-hybrid-list">${classicMarvel.map(link).join('')}</div>` : ''}
    <h3>How they play</h3>
    <p>Hero genes lean toward day games, gifts, and team-ready bond. Villains favor night payouts, hunger control, and dramatic game coins. Anti-heroes split the difference with masks, chains, flames, and sturdy needs. Every character has at least one thriving habitat and a signature hybrid with a classic element.</p>
    <p>Type search understands the publisher too: type <b>Marvel</b> or <b>DC</b> into the Wiki search to filter the roster, and open any species file to see its publisher and role in the infobox.</p>`;
}

function disneyWaveBody() {
  const link = (key) => {
    const el = ELEMENTS[key];
    const classic = el.disneyClassic ? ' · classic' : '';
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}${classic}</span></button>`;
  };
  return `<p class="wiki-lede">A <b>${DISNEY_TOTAL}-character Disney collection</b> now lives in the Hollow: <b>${DISNEY_SPECIES.length} new arrivals</b> plus classic Mickey, Simba, and Stitch. Each one has a gene, Titan, type egg, habitat, named hybrid, and original procedural silhouette.</p>
    <p>The collection is grouped by story family rather than publisher: Mickey and friends, storybook classics, princesses and heroes, wild adventures, Pixar pals, villains, and modern favorites. Art is original vector work built from the Hollow's own body plans, palettes, and symbols.</p>
    ${DISNEY_GROUP_ORDER.map((group) => {
      const meta = DISNEY_GROUPS[group];
      return `<h3>${meta.icon} ${esc(meta.label)} · ${DISNEY_BY_GROUP[group].length}</h3><p>${meta.note}</p><div class="wiki-hybrid-list">${DISNEY_BY_GROUP[group].map(link).join('')}</div>`;
    }).join('')}
    <h3>How they play</h3>
    <p>Disney genes lean into gifts, songs, day games, bond, and cozy needs. Villains favor night payouts, while the Pixar set is the most gift-happy group in the collection. Every character has at least one thriving habitat and a signature hybrid with a classic element.</p>`;
}

function careBearWaveBody() {
  const link = (key) => {
    const el = ELEMENTS[key];
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}${el.careBearCousin ? ' · Cousin' : ''}</span></button>`;
  };
  return `<p class="wiki-lede">A <b>${CARE_BEAR_TOTAL}-character Care Bears &amp; Cousins collection</b> now brings together <b>${CARE_BEAR_BY_GROUP.bears.length} classic Care Bears</b>, <b>${CARE_BEAR_BY_GROUP.cousins.length} Care Bear Cousins</b>, and <b>${CARE_BEAR_BY_GROUP.extended.length} extended-family favourites</b>. Each one is a full collectible with a Care gene, Titan, type egg, habitats, a named hybrid, and original procedural badge art.</p>
    <p>Their genes all add <b>game coins</b> and make <b>gifts arrive sooner</b>, with a little extra care for joy, bond, snacks, or rest. They are built to play as generously as they look.</p>
    ${CARE_BEAR_GROUP_ORDER.map((group) => {
      const meta = CARE_BEAR_GROUPS[group];
      return `<h3>${meta.icon} ${esc(meta.label)} · ${CARE_BEAR_BY_GROUP[group].length}</h3><p>${meta.note}</p><div class="wiki-hybrid-list">${CARE_BEAR_BY_GROUP[group].map(link).join('')}</div>`;
    }).join('')}
    <h3>Care Packages</h3>
    <p>When a Care Bear or Cousin is active, every completed <b>game, Arcade challenge, trail walk, or sport</b> fills a shared Care Package meter. Every <b>${CARE_PACKAGE_EVERY} activities</b> wraps bonus coins, XP, a pantry food, and a snack. The meter is saved with your Hollow and does not reset when you switch friends.</p>
    <p>Care Bears and Cousins live in the Nest as type eggs, can appear in the wild, and can breed with any classic type for their signature hybrids. Their art is original vector work built from the Hollow's own body plans, palettes, and badge symbols.</p>`;
}

function wweWaveBody() {
  const link = (key) => {
    const el = ELEMENTS[key];
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)} · ${esc(el.wweNickname)}</span></button>`;
  };
  return `<p class="wiki-lede">A <b>${WWE_TOTAL}-superstar WWE collection</b> now fills a multi-era locker room, from the Golden and Attitude eras through Ruthless Aggression, the PG Era, Women’s Legends, Tag Teams, and NXT. Each one has a gene, Titan, type egg, habitats, a named hybrid, and original procedural ring gear.</p>
    <p>The collection is built around entrances, title belts, masks, and main-event swagger. No imported photos, renders, or WWE assets are used; every silhouette is drawn from the Hollow’s own body plans, palettes, and symbols.</p>
    ${WWE_GROUP_ORDER.map((group) => {
      const meta = WWE_GROUPS[group];
      return `<h3>${meta.icon} ${esc(meta.label)} · ${WWE_BY_GROUP[group].length}</h3><p>${esc(meta.note)}</p><div class="wiki-hybrid-list">${WWE_BY_GROUP[group].map(link).join('')}</div>`;
    }).join('')}
    <h3>Collection secrets</h3>
    <p>Collect <b>${SECRET_SPECIES_META.ringkeeper.collectionSecret.count} WWE species</b> to open the <b>Ring Keeper</b> secret. Collect <b>${SECRET_SPECIES_META.grandslam.collectionSecret.count}</b> to earn the exotic <b>Grand Slam</b>, a champion who carries every belt at once. Progress is counted from distinct hatched WWE species in your Hollow.</p>
    <h3>How they play</h3>
    <p>Legends lean into big game-coin payouts and fast gifts. Current superstars favor night games and XP. The women’s division stacks XP and gift speed, with a little extra bond for the whole locker room. Every superstar has at least one thriving habitat and a signature hybrid in the breeding codex.</p>`;
}

function ponyWaveBody() {
  const link = (key) => {
    const el = ELEMENTS[key];
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)} · ${esc(el.ponyType)}</span></button>`;
  };
  return `<p class="wiki-lede">A <b>${PONY_TOTAL}-pony My Little Pony collection</b> now spans the Mane Six, Cutie Mark Crusaders, royal alicorns and leaders, Ponyville friends, <b>50 background favourites</b>, sweethearts, and ponyvillains. Every pony has a gene, Titan, type egg, habitats, a cutie mark, a named hybrid, and original procedural art.</p>
    <p><b>Friendship pays.</b> While a pony is active, its gene adds <b>bonus coins to every check-in</b> and <b>bonus coins to every completed daily, weekly, or monthly task</b>. The bonuses stack with the pony’s XP, gift, joy, and chat effects. Open Today to see the check-in payout, then claim tasks with a pony beside you.</p>
    ${PONY_GROUP_ORDER.map((group) => {
      const meta = PONY_GROUPS[group];
      return `<h3>${meta.icon} ${esc(meta.label)} · ${PONY_BY_GROUP[group].length}</h3><p>${esc(meta.blurb)}</p><div class="wiki-hybrid-list">${PONY_BY_GROUP[group].map(link).join('')}</div>`;
    }).join('')}
    <h3>Care-dock play</h3>
    <p><b>Rub Belly</b>, <b>Throw Ball</b>, and <b>Play Catch</b> join Feed, Play, Walk, Bath, Nap, and Talk in the Hollow. Belly rubs raise Joy and bond; Throw Ball and Play Catch open a five-catch fetch game that pays coins, XP, bond, and counts toward games and Care Packages. Walk is still the trail button for Jog, Run, and every unlocked route.</p>`;
}

function tvLegacyWaveBody() {
  const link = (key) => {
    const el = ELEMENTS[key];
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)} · ${esc(el.tvShow)}</span></button>`;
  };
  return `<p class="wiki-lede">A <b>${TV_LEGACY_TOTAL}-character TV Legends collection</b> builds full-show casts across five television eras: prestige drama, sitcom ensembles, science fiction, fantasy sagas, and animated classics. Each character is a full collectible with a show label, gene, Titan, type egg, habitat, and named hybrid.</p>
    <p>The expanded rosters go deeper into <b>Breaking Bad</b>, <b>Better Call Saul</b>, <b>Stranger Things</b>, <b>The Walking Dead</b>, <b>Dexter</b>, <b>House</b>, <b>Sherlock</b>, <b>The Office</b>, <b>Friends</b>, <b>The Big Bang Theory</b>, <b>Star Trek</b>, <b>The X-Files</b>, <b>Battlestar Galactica</b>, <b>Game of Thrones</b>, <b>Wednesday</b>, <b>The Addams Family</b>, <b>Futurama</b>, and <b>Pokémon</b>. The focus is full-show ensembles and recurring favourites rather than every series ever aired.</p>
    ${TV_LEGACY_GROUP_ORDER.map((group) => {
      const meta = TV_LEGACY_GROUPS[group];
      return `<h3>${meta.icon} ${esc(meta.label)} · ${TV_LEGACY_BY_GROUP[group].length}</h3><p>${esc(meta.blurb)}</p><div class="wiki-hybrid-list">${TV_LEGACY_BY_GROUP[group].map(link).join('')}</div>`;
    }).join('')}
    <p>Prestige genes favor night play and slow needs; sitcoms add chat and pet coins; sci-fi raises game coins and XP; fantasy blends night payouts with XP; animated shows brighten day games and slow Joy decay.</p>
    <p><b>Netflix animation wing.</b> A further <b>${NETFLIX_TOTAL} characters</b> now sit under TV Legends in <b>Netflix Anime</b> and <b>Netflix Toons</b>, three per show across 20 shows. <button class="wiki-link" data-wiki-guide="netflix" style="display:inline-flex;margin:0 2px;padding:2px 6px;vertical-align:baseline"><b>Open the Netflix wing guide</b></button></p>`;
}

function netflixWaveBody() {
  const link = (key) => {
    const el = ELEMENTS[key];
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)} · ${esc(el.netflixShow)}</span></button>`;
  };
  const owned = typeof state !== 'undefined' ? new Set(state.sprites.map((sprite) => sprite.element)) : new Set();
  return `<p class="wiki-lede">The <b>${NETFLIX_TOTAL}-character Netflix animation wing</b> sits under TV Legends and is split into <b>${NETFLIX_WING_COUNTS.anime} Netflix Anime</b> and <b>${NETFLIX_WING_COUNTS.toons} Netflix Toons</b> signatures. There are <b>20 shows</b> and <b>three characters per show</b>, each with a show gene, Titan, type egg, habitat, named hybrid, and an original procedural silhouette.</p>
    <p>You own <b>${NETFLIX_SPECIES.filter((key) => owned.has(key)).length} of ${NETFLIX_TOTAL}</b> Netflix signatures. Open the <button class="wiki-link" data-wiki-guide="tvlegends" style="display:inline-flex;margin:0 2px;padding:2px 6px;vertical-align:baseline"><b>TV Legends guide</b></button> for the original 100-character television roster, or use the Roster browser to filter by wing and show.</p>
    <p>Every design is original vector work built from the Hollow’s own body plan, palettes, and motifs. The shows are inspiration only: no frames, screenshots, or traced character art are used.</p>
    ${NETFLIX_WING_ORDER.map((wing) => {
      const meta = NETFLIX_WINGS[wing];
      const showKeys = NETFLIX_SHOW_ORDER.filter((show) => NETFLIX_SHOWS[show].wing === wing);
      return `<h3>${meta.icon} ${esc(meta.label)} · ${NETFLIX_BY_WING[wing].length}</h3><p>${esc(meta.note)}</p>` +
        showKeys.map((show) => {
          const info = NETFLIX_SHOWS[show];
          return `<div class="wiki-show-block"><h4>${info.icon} ${esc(info.label)} · ${info.gene[1]} ${esc(info.gene[0])}</h4><p>${esc(info.note)}</p><div class="wiki-hybrid-list">${NETFLIX_BY_SHOW[show].map(link).join('')}</div></div>`;
        }).join('');
    }).join('')}
    <h3>How they play</h3>
    <p>Anime genes lean into night games, XP, and fast gifts. Toons favour day games, bond, and cozy needs. Every show has its own small bonus so a full cast still has a reason to rotate. All 60 are normal type eggs, can appear in the wild, and breed with any classic element for their named hybrids.</p>
    <p>Search the Wiki or the Roster browser for a show name — Castlevania, Arcane, Hilda, Pluto, Cuphead, Sonic Prime — to surface its three signatures.</p>`;
}

function realmWaveBody() {
  const link = (key) => {
    const el = ELEMENTS[key];
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)} · ${esc(el.realmRole)}</span></button>`;
  };
  return `<p class="wiki-lede">The Hollow now has <b>${REALM_TOTAL} realm sprites</b> across four aligned families: <b>${HORROR_SPECIES.length} Horror</b>, <b>${DARK_HORROR_SPECIES.length} Dark Horror</b>, <b>${LIGHT_SPECIES.length} Light</b>, and <b>${DARKNESS_SPECIES.length} Darkness</b>. Each has its own aura, gene, Titan, egg, habitat, and named hybrid.</p>
    ${REALM_WAVE_ORDER.map((group) => {
      const meta = REALM_WAVE_GROUPS[group];
      return `<h3>${meta.icon} ${esc(meta.label)} · ${REALM_BY_GROUP[group].length}</h3><p>${esc(meta.blurb)}</p><div class="wiki-hybrid-list">${REALM_BY_GROUP[group].map(link).join('')}</div>`;
    }).join('')}
    <h3>How the four realms play</h3>
    <p>Horror leans into night coins and faster gifts. Dark Horror is the high-risk night specialist with the biggest XP boost. Light favors day games, bond, and small check-in bonuses. Darkness slows every need while paying night coins. All four realms are normal type eggs and can breed with any species.</p>`;
}

function kingdomHeartsWaveBody() {
  const link = (key) => {
    const el = ELEMENTS[key];
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)} · ${esc(el.khWorld)}</span></button>`;
  };
  return `<p class="wiki-lede">A <b>${KH_TOTAL}-character Kingdom Hearts collection</b> opens the door: Destiny Islands, the full Organization XIII, the Sea-Salt trio, the Wayfinder trio, the Seekers of Darkness, the Keyblade legacy, and <b>${KH_BY_GROUP.disneyworlds.length} Disney-world characters</b>. Every character has a world label, Keyblade-era gene, Titan, type egg, habitat, and named hybrid.</p>
    ${KH_GROUP_ORDER.map((group) => {
      const meta = KH_GROUPS[group];
      return `<h3>${meta.icon} ${esc(meta.label)} · ${KH_BY_GROUP[group].length}</h3><p>${esc(meta.blurb)}</p><div class="wiki-hybrid-list">${KH_BY_GROUP[group].map(link).join('')}</div>`;
    }).join('')}
    <p>The collection covers Sora, Riku, Kairi, Donald, Goofy, King Mickey, Roxas, Xion, Axel, Naminé, Terra, Aqua, Ventus, every Organization XIII seat, Ansem, Xemnas, both Xehanorts, Maleficent, Pete, Ephemer, Skuld, Strelitzia, Chirithy, Yozora, the Master of Masters, and Luxu. The Disney-world wing adds Mickey’s castle, the princess worlds, Agrabah, Atlantica, Olympus, Wonderland, Neverland, Halloween Town, the Pride Lands, Hawaii, Andy’s room, Monstropolis, Arendelle, San Fransokyo, and the Grid. All art is original vector work using crowns, Keyblades, heart emblems, hoods, and realm symbols.</p>`;
}

function legendWaveBody() {
  const link = (key) => {
    const el = ELEMENTS[key];
    const classic = el.legendClassic ? ' · classic' : '';
    return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key]?.icon || '✨'} ${esc(GENE_POWERS[key]?.name || 'Classic gene')}${classic}</span></button>`;
  };
  return `<p class="wiki-lede">A <b>${LEGEND_TOTAL}-character crossover legends collection</b> brings <b>${LEGEND_SPECIES.length} new arrivals</b> and ${LEGEND_CLASSIC_KEYS.length} existing Hollow icons into nine family rosters. Each new character has a gene, Titan, type egg, habitat, named hybrid, and original procedural silhouette.</p>
    <p>The pack is curated rather than exhaustive: the biggest universes contain hundreds of characters, so each family focuses on its most recognizable heroes, villains, sidekicks, and mascots. The art is original vector work built from the Hollow's own body plans, palettes, and symbols; no imported character sprites, screenshots, or film assets are used.</p>
    ${LEGEND_GROUP_ORDER.map((group) => {
      const meta = LEGEND_GROUPS[group];
      return `<h3>${meta.icon} ${esc(meta.label)} · ${LEGEND_BY_GROUP[group].length}</h3><p>${meta.note}</p><div class="wiki-hybrid-list">${LEGEND_BY_GROUP[group].map(link).join('')}</div>`;
    }).join('')}
    <h3>How they play</h3>
    <p>The pack covers stage lights, power jumps, spore evolution, slapstick chases, cartoon chaos, Hyrulian courage, survival, late-night horror, and save-file heroics. Families lean into gifts, night games, hunger control, bond, XP, and day payouts. Every new character has at least one thriving habitat and a signature hybrid with a classic element.</p>
    <p>Search the Wiki by family name — Mario, Zelda, FNAF, Looney, Walking Dead, horror, or video game — to filter the roster. Classic entries keep their original genes and art and are marked <b>classic</b>.</p>`;
}

const VIDEO_GAME_LEGEND_GROUPS = ['fnaf', 'mario', 'spore', 'zelda', 'videogame'];

const WIKI_GUIDES = [
  {
    id: 'hollowexotics',
    icon: '✦',
    title: 'Hollow exotics',
    summary: 'Six exotic signatures: four type-egg legends and two collection-reward champions.',
    body: () => {
      const notes = {
        yeallingzebra81: 'The stage-ready original: neon-pink bob, purple headphones, green-lit cups, and a backstage pass in creature form.',
        supernora: 'The cosmic headliner: star crown, golden comet trail, and a cape lined with the night sky.',
        wildtrickyjokerwolf: 'The grinning wildcard: split purple-and-green ears, jester bells, a playing-card grin, and a bushy tail.',
        litladybear: 'The type-egg headliner: scarlet fur under black tiger stripes, glowing gold eyes, a white-and-pink hood, and a teal LIT-LADYBEAR plaque.',
        riftchampion: 'The Fortnite Legacy reward: a storm-lit crown, a victory-rift halo, and a cape made from sixteen old seasons.',
        grandslam: 'The WWE collection reward: two unified title belts, a gold crown, and the calm of someone who has main-evented everything.',
      };
      return `<p class="wiki-lede">The Hollow keeps <b>${HOLLOW_EXOTIC_SPECIES.length} one-of-one exotic signatures</b>: <b>${SPECIAL_EXOTIC_SPECIES.length} type-egg exotics</b> and <b>${SECRET_EXOTIC_SPECIES.length} collection-reward exotics</b>. Each is a standalone Mythic species with its own portrait, gene, Titan, and three homes.</p>
        <p>Search <b>exotic</b> in the Wiki or Sprites to surface all of them. The Biome Atlas keeps the type-egg cards above the guardian roster; the two collection exotics live in the Secret Vault until their milestones are met.</p>
        <h3>✦ LIT-LadyBear</h3>
        <p>${notes.litladybear} <b>LIT Roar</b> pays <b>+6 game coins</b> and makes gifts arrive <b>20% sooner</b>. Its <b>LadyBear Titan</b> grows from a <b>260-coin Mythic type egg</b>, or <b>170 coins</b> with the standard discount.</p>
        <p>LIT-LadyBear is the fourth type-egg Hollow exotic, added alongside the existing <b>ThatLadyBear</b> legend rather than replacing her. Find it in <b>Ember Forge, Moon Hollow, and Neon Den</b>, and breed with a Werewolf for the <b>LIT Ladywolf</b> hybrid.</p>
        <h3>✦ Collection-reward exotics</h3>
        <p><b>Rift Champion</b> opens after collecting <b>${SECRET_SPECIES_META.riftchampion.collectionSecret.count} Fortnite Legacy species</b>. <b>Grand Slam</b> opens after collecting <b>${SECRET_SPECIES_META.grandslam.collectionSecret.count} WWE species</b>. Both are claimed in the Secret Vault and arrive as fully grown exotics.</p>
        <div class="wiki-hybrid-list">${HOLLOW_EXOTIC_SPECIES.map((key) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)} · ${esc(notes[key] || ELEMENTS[key].trait)}</span></button>`).join('')}</div>
        <h3>What makes them exotic</h3>
        <ul class="wiki-list">
          <li>Every signature has original procedural art layered over the normal sprite body, not an imported image.</li>
          <li>They keep a permanent exotic class. The four classic signatures use the Mythic type-egg band; Rift Champion and Grand Slam are earned through collection milestones.</li>
          <li>Their genes, habitats, hybrids, and Titan names are live values shared with the Nest and Biome Atlas.</li>
        </ul>`;
    },
  },
  {
    id: 'videogames',
    icon: '🎮',
    title: 'Video games & FNAF',
    summary: 'All 103 video-game signatures, including every Five Nights at Freddy’s character.',
    body: () => {
      const groupKeys = VIDEO_GAME_LEGEND_GROUPS;
      const gameCount = groupKeys.reduce((total, group) => total + LEGEND_BY_GROUP[group].length, 0);
      const link = (key) => {
        const el = ELEMENTS[key];
        const classic = el.legendClassic ? ' · classic' : '';
        return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key]?.icon || '✨'} ${esc(GENE_POWERS[key]?.name || 'Classic gene')}${classic}</span></button>`;
      };
      return `<p class="wiki-lede">The Hollow now keeps <b>${gameCount} video-game signatures</b> in one place, including the complete <b>Five Nights at Freddy’s</b> crew. Every card below opens a live species file with its gene, Titan, type egg, habitats, and hybrids.</p>
        <p><b>16 FNAF</b> animatronics and rabbit-masked visitors, <b>20 Super Mario Bros.</b> characters, <b>12 Spore</b> creature archetypes, <b>24 Legend of Zelda</b> heroes and villains, and <b>31 Video game icons</b> — the last roster includes seven existing Hollow classics.</p>
        ${groupKeys.map((group) => {
          const meta = LEGEND_GROUPS[group];
          const keys = LEGEND_BY_GROUP[group];
          return `<h3>${meta.icon} ${esc(meta.label)} · ${keys.length}</h3><p>${meta.note}</p><div class="wiki-hybrid-list">${keys.map(link).join('')}</div>`;
        }).join('')}
        <h3>More game worlds</h3>
        <p>The video-game catalog continues beyond this crossover roster. All <b>${POKEDEX_SPECIES.length} Pokémon</b> have their own type-grouped guide, while the <b>Fortnite</b> pass roster and base Sprite family have dedicated field guides.</p>
        <div class="wiki-hybrid-list">
          <button class="wiki-link" data-wiki-guide="pokedex"><b>🔴 Pokédex · ${POKEDEX_SPECIES.length}</b><span>Every base Pokémon species across all 18 types.</span></button>
          <button class="wiki-link" data-wiki-guide="fortnite"><b>🎮 Fortnite current &amp; legacy · ${FORTNITE_TOTAL}</b><span>${FORTNITE_SPECIES.length} current pass sprites plus ${FORTNITE_LEGACY_TOTAL} past-season headliners.</span></button>
          <button class="wiki-link" data-wiki-guide="wwe"><b>🏆 WWE superstars · ${WWE_TOTAL}</b><span>Legends, current superstars, and the women’s division.</span></button>
          <button class="wiki-link" data-wiki-guide="spritevault"><b>🎨 Fortnite Sprite field guide</b><span>All base sprites and every finish variant.</span></button>
        </div>
        <p class="wiki-footnote">${gameCount} game signatures linked above · generated from the same live legend rosters as the species files</p>`;
    },
  },
  {
    id: 'recent',
    icon: '🆕',
    title: 'New & recent sprites',
    summary: 'Every recent family in one index, from Rift Champion and WWE to the full video-game roster.',
    body: () => {
      const gameCount = VIDEO_GAME_LEGEND_GROUPS.reduce((total, group) => total + LEGEND_BY_GROUP[group].length, 0);
      const seasonalCount = CANDY_SPECIES.length + HALLOWEEN_SPECIES.length + CHRISTMAS_SPECIES.length;
      const card = (id, icon, title, count, note) => `<button class="wiki-link" data-wiki-guide="${id}"><b>${icon} ${esc(title)} · ${count}</b><span>${esc(note)}</span></button>`;
      return `<p class="wiki-lede">Every recent sprite family now has a home in the Wiki. This index gathers <b>${ELEMENT_KEYS.length} species files</b> into their live waves, from the newest Hollow signatures to the complete video-game and FNAF roster.</p>
        <div class="wiki-hybrid-list">
          ${card('videogames', '🎮', 'Video games & FNAF', gameCount, 'All FNAF animatronics, Mario, Zelda, Spore, and Video game icons in one guide.')}
          ${card('hollowexotics', '✦', 'Hollow exotics', HOLLOW_EXOTIC_SPECIES.length, 'Four type-egg signatures plus Rift Champion and Grand Slam from collection milestones.')}
          ${card('heroes', '🦸', 'Heroes, villains & anti-heroes', HERO_SPECIES.length, 'Marvel, DC, and Beyond Marvel & DC signatures.')}
          ${card('disney', '🏰', 'Disney signature collection', DISNEY_TOTAL, 'Seven story families, including the classic Mickey, Simba, and Stitch.')}
          ${card('carebears', '🌈', 'Care Bears & Cousins', CARE_BEAR_TOTAL, 'Classic Care Bears, Cousins, and extended-family favourites, each with a Care Package gene.')}
          ${card('legends', '🌍', 'Crossover legends', LEGEND_TOTAL, 'Games, cartoons, survival, and horror across nine family rosters.')}
          ${card('pokedex', '🔴', 'Pokédex', POKEDEX_SPECIES.length, 'Every base Pokémon species across all 18 types.')}
          ${card('fortnite', '🎮', 'Fortnite current & legacy', FORTNITE_TOTAL, `${FORTNITE_SPECIES.length} current pass sprites plus ${FORTNITE_LEGACY_TOTAL} past-season headliners.`)}
          ${card('wwe', '🏆', 'WWE superstars', WWE_TOTAL, 'Legends, current superstars, and the women’s division in one ring.')}
          ${card('ponies', '🦄', 'My Little Pony', PONY_TOTAL, 'Mane Six, Cutie Mark Crusaders, royalty, Ponyville, sweethearts, and villains with check-in/task bonuses.')}
          ${card('tvlegends', '📺', 'TV Legends', TV_LEGACY_TOTAL, 'Prestige, sitcom, sci-fi, fantasy, and animated television across five eras.')}
          ${card('netflix', '🎬', 'Netflix animation wing', NETFLIX_TOTAL, '60 characters across 10 Netflix Anime and 10 Netflix Toons shows, three per show.')}
          ${card('fourrealms', '🌗', 'Horror, Light & Darkness', REALM_TOTAL, 'Eight Horror, eight Dark Horror, eight Light, and eight Darkness sprites.')}
          ${card('kingdomhearts', '🗝️', 'Kingdom Hearts', KH_TOTAL, 'Destiny Islands, Organization XIII, Wayfinders, Seekers, Disney worlds, and Keyblade legacy.')}
          ${card('holidays', '🍬', 'Candy, holidays & seasonal', seasonalCount, 'Candy, Halloween, and Christmas species plus the holiday calendar.')}
          ${card('animals', '🐾', 'Animal field notes', Object.keys(ANIMAL_SPECIES).length, 'Wolves, tamers, and the flying folk of the Hollow.')}
          ${card('crossovers', '🧩', 'Crossover sprites', CROSSOVER_SPECIES.length, 'Fall Guys, Among Us, pocket monsters, and brick builders.')}
          ${card('dc', '🦸', 'DC hero sprites', DC_SPECIES.length, 'The League, Bat-family, Titans, and street-level heroes.')}
        </div>
        <h3>Newest one-of-one signatures</h3>
        <p>The most recent arrivals are also the rarest Hollow exotics. Open any portrait for its full species file.</p>
        <div class="wiki-hybrid-list">${SPECIAL_EXOTIC_SPECIES.map((key) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)} · ${esc(ELEMENTS[key].trait.split('—')[0].trim())}</span></button>`).join('')}</div>
        <h3>Every species is searchable</h3>
        <p>The <b>${ELEMENT_KEYS.length} species files</b> below the guides are generated from the same live data as the Nest, collection, and Biome Atlas. Search a name, family, habitat, gene, <b>exotic</b>, or <b>FNAF</b> to jump straight to its article.</p>`;
    },
  },
  {
    id: 'mythic',
    icon: '🌌',
    title: 'The Mythic Egg',
    summary: 'A guaranteed legend, and the reveal that comes before the shell breaks.',
    body: () => `<p class="wiki-lede">The <b>Mythic Egg</b> is the most expensive egg in the Nest at <b>${EGG_TIERS.mythic.price} coins</b>, and the only egg that guarantees a high-rarity hatch.</p>
      <h3>What is inside?</h3>
      <p>It draws from a <b>${MYTHIC_EGG_POOL.length}-type pool</b> made of the Legendary and Mythic bands. Every roll is weighted <b>65% Mythic</b> and <b>35% Legendary</b>, so there is no chance of a Common, Uncommon, Rare, or Epic result. Dragon and Mother Earth are both in the pool. To be precise, that is <b>${MYTHIC_EGG_MYTHIC_POOL.length} Mythic</b> types and <b>${MYTHIC_EGG_LEGENDARY_POOL.length} Legendary</b> types.</p>
      <h3>The reveal</h3>
      <p>When the shell is ready, a sealed fate card appears. Choose <b>Reveal the mythic</b> to trigger an animated rarity reveal — the word MYTHIC or LEGENDARY slams into view inside a ring of light — followed by the species, gene power, and finish. Only then can you choose <b>Break the shell</b>.</p>
      <h3>Good to know</h3>
      <ul class="wiki-list">
        <li>The egg has a higher mutation chance than the three wild-egg tiers.</li>
        <li>The type is hidden until the reveal — the egg shows a fixed storm-wrapped shell either way.</li>
        <li>Every Mythic Egg is Generation 2, which slightly improves inherited XP.</li>
        <li>If you close the reveal, it waits for you in the Nest until you come back.</li>
      </ul>`,
  },
  {
    id: 'habitats',
    icon: '🗺️',
    title: 'Habitats & XP',
    summary: 'Core habitats, all 18 type biomes, custom environments, and the XP boost.',
    body: () => `<p class="wiki-lede">Habitats are the Hollow scenes. Core habitats give <b>+40–50% XP</b>, all <b>${BIOME_KEYS.length} type biomes</b> give <b>+50% XP</b> to matching types, and custom biomes accept every sprite.</p>
      <p>Studio now separates the picker into <b>Core habitats</b>, <b>Type biomes</b>, and <b>Custom biomes</b>, so no scene disappears into one long row. Every type biome is always available. Open the <b>Biome Atlas</b> from Studio or Types for the full map and guardian cards.</p>
      <p>Every action that grants XP uses the habitat bonus. That includes petting, feeding, games, baths, chatting, sleeping, and opening gifts. Species that do not call the habitat home still get a <b>+10% visitor bonus</b>, so no one is left out.</p>
      <div class="wiki-habitat-table">${wikiHabitatTable()}</div>
      <h3>How to read it</h3>
      <p>The Hollow chip shows the active sprite's current bonus. A green “thriving here” message in the Studio means the selected sprite is earning the full habitat rate. Switch habitats freely — there is no cooldown or cost.</p>
      <h3>Finding a home</h3>
      <p>Every Nest species has at least one habitat, and the 18 type biomes give every Pokémon a home by its standard type. Secret sprites keep their own hidden homes. A few species appear in more than one scene because they fit multiple themes — for example, Keke can thrive in both Sugar Kitchen and the Dream Conservatory.</p>
      <h3>All 18 type biomes</h3>
      <div class="wiki-hybrid-list">${BIOME_KEYS.map((type) => `<button class="wiki-link" data-biome-travel="${TYPE_BIOMES[type].key}"><b>${TYPE_BIOMES[type].emoji} ${esc(TYPE_BIOMES[type].name)}</b><span>${esc(TYPE_BIOMES[type].habitat)} · ${TYPE_BIOMES[type].speciesCount.toLocaleString()} species · guardian ${esc(ELEMENTS[TYPE_BIOMES[type].guardian].name)}</span></button>`).join('')}</div>`,
  },
  {
    id: 'types',
    icon: '📚',
    title: 'Types & rarity',
    summary: 'How the twelve rarity tiers, gene powers, and type eggs work.',
    body: () => `<p class="wiki-lede">Every sprite belongs to one of <b>${ELEMENT_KEYS.length} species</b>. A species is more than a colour: it carries a gene power, a Titan name, an egg price, a habitat family, and its own hybrid list.</p>
      <h3>Rarity bands</h3>
      <div class="wiki-rarity-list">
        ${RARITY_TIER_ORDER.map((key) => {
          const band = key === 'common' ? 'under 75 coins' : key === 'uncommon' ? '75–97 coins' : key === 'rare' ? '98–116 coins' : key === 'epic' ? '117–164 coins' : key === 'legendary' ? '165–209 coins' : key === 'mythic' ? '210+ coins' : key === 'secret' ? 'Secret Vault keepers · above Mythic' : key === 'exotic' ? 'Hollow exotics · above Secret' : key === 'master' ? 'The Master secret · above Exotic' : 'Trail-only apex rank · above Master';
          return `<div><span class="te-dot" style="background:${TYPE_EGG_RARITIES[key].color}"></span><b>${TYPE_EGG_RARITIES[key].name}</b><span>${band}</span></div>`;
        }).join('')}
      </div>
      <p class="tiny muted">The ladder has <b>${RARITY_TIER_ORDER.length} tiers</b>. The final three — <b>Celestial</b>, <b>Divine</b>, and <b>Eternal</b> — cannot hatch from eggs. Only Trail Upgrades can push a Master sprite into them.</p>
      <h3>Gene powers</h3>
      <p>Every species has one gene power. It is always active while that sprite lives in the Hollow, stacking with its breed habit, finish, combo, and evolution. A Fire sprite might add game coins; a Mother Earth adds slower need decay and a bigger XP gain.</p>
      <h3>Type eggs</h3>
      <p>Every non-Vault species can be bought directly as a type egg in the Nest. A Water Egg always hatches Water, a Demon Egg always hatches Demon. Prices are listed on each species card and in the field guide.</p>`,
  },
  {
    id: 'bonds',
    icon: '💞',
    title: 'Bonds & evolution',
    summary: 'All six bond ranks, their passive bonuses, the four life stages, and every diet form.',
    body: bondWikiBody,
  },
  {
    id: 'worldevolution',
    icon: '🧬',
    title: 'World evolution atlas',
    summary: 'Every type × four forms, all 18 biomes and Hollow scenes, parents, genes, personalities, and Vault paths — free.',
    body: worldEvolutionWikiBody,
  },
  {
    id: 'animals',
    icon: '🐾',
    title: 'Animal field notes',
    summary: 'Wolves, tamers, and the flying folk of the Hollow.',
    body: () => {
      const animals = typeof ANIMAL_SPECIES === 'undefined' ? {} : ANIMAL_SPECIES;
      return `<p class="wiki-lede">The Hollow's animal wave adds wolves, a tamer, and a sky full of flyers. Each has its own gene power, Titan name, type egg, and habitat.</p>
        <div class="wiki-hybrid-list">${Object.entries(animals).map(([key, el]) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(el.name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`).join('')}</div>
        <h3>Who lives where</h3>
        <p><b>Firefang Wolf</b> patrols Ember Forge and Golden Savanna. <b>Beast Tamer</b> settles in Sunny Grove and Golden Savanna. The flyers split between Aurora Ridge, Moon Hollow, Tidepool, and Ember Forge, while Moon Fox, River Otter, Stone Badger, Thistle Hare, and Aurora Elk spread across the remaining habitats.</p>
        <h3>Signature hybrids</h3>
        <p>Cinderfang, Stormwing, Lanternwing, Glasswing, Riverbank, Burrowstone, Thistlehop, Froststag, Storm Omen, Packbond, Glowflight, and Moonfox are recorded in the breeding codex.</p>`;
    },
  },
  {
    id: 'holidays',
    icon: '🍬',
    title: 'Candy, holidays & seasonal sprites',
    summary: 'Sugar transformations, the real-world holiday calendar, and 20 new species.',
    body: () => {
      const seasonal = [...CANDY_SPECIES, ...HALLOWEEN_SPECIES, ...CHRISTMAS_SPECIES];
      return `<p class="wiki-lede">The Hollow now has a sweet tooth and a calendar. Candy treats can reshape a sprite, and real-world holidays bring bonuses, visitors, and themed food.</p>
        <h3>Candy sugar</h3>
        <p>Every sprite has a <b>Sugar</b> meter, shown on its detail sheet and in the feed flow. Eating a candy-tagged item adds <b>1 sugar</b>. At <b>3 sugar</b>, the sprite transforms into a random <b>candy species</b>, sugar resets to 0, and the moment is recorded as a candy morph.</p>
        <p>There are <b>${CANDY_ITEMS.length} candy-tagged items</b> to feed, including candy, truffles, candy apples, gummies, chocolate, cotton candy, candy canes, gumballs, and toffee chews. Candy also builds the <b>Sweet</b> diet path, so a sweet tooth can still lead to a Fairy evolution.</p>
        <h3>Holiday events</h3>
        <p>Seven events follow the real calendar: <b>${Object.values(HOLIDAYS).map((h) => esc(h.name)).join(', ')}</b>. During an event, coins from check-ins and games are multiplied, gifts arrive faster, and the first daily check-in stocks a themed treat.</p>
        <div class="wiki-hybrid-list">${Object.values(HOLIDAYS).map((h) => {
          const treat = FOODS[h.treat];
          return `<div class="wiki-habitat-row"><span class="wh-emoji">${h.icon}</span><span class="wh-copy"><b>${esc(h.name)}</b><span>${Math.round((h.coinMult - 1) * 100)}% coins · ${Math.round((h.giftSpeed - 1) * 100)}% gifts${treat ? ` · ${treat.emoji} ${esc(treat.name)}` : ''}</span></span></div>`;
        }).join('')}</div>
        <p>The Today screen shows the active event, how many days remain, and its bonuses. When no event is running, the card counts down to the next one. Holiday treats are stocked directly in the pantry, so they work even if their normal market entry is locked.</p>
        <h3>Seasonal species</h3>
        <p>Twenty new species joined the encyclopedia: <b>8 candy</b>, <b>6 Halloween</b>, and <b>6 Christmas</b>. Each has a gene power, Titan name, type egg, habitat, and signature art. Tap any name to open its species file.</p>
        <div class="wiki-hybrid-list">${seasonal.map((key) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`).join('')}</div>
        <h3>Three new games</h3>
        <p><b>Green Toss</b> unlocks at <b>6 check-ins</b>, <b>Candy Crunch</b> at <b>14</b>, and <b>Holiday Lights</b> at <b>20</b>. All three pay coins and XP and appear in the Play screen as soon as they are earned.</p>`;
    },
  },
  {
    id: 'crossovers',
    icon: '🧩',
    title: 'Crossover sprites',
    summary: 'Fall Guys beans, Among Us crewmates, pocket monsters, and brick builders.',
    body: () => {
      const groups = [
        ['Fall Guys-inspired', ['fallbean', 'crownbean', 'hurdlebean'], 'Three wobbly beans with visors, crowns, and a serious case of the zoomies.'],
        ['Among Us-inspired', ['crewmate', 'impostor', 'ghostmate'], 'A helpful crew, one very suspicious crewmate, and a friendly ghost.'],
        ['Pocket monsters', ['voltling', 'emberling', 'bulblet', 'bubblet'], 'Four tiny elemental pals with ears, tails, bulbs, and shells.'],
        ['Brick builders', ['brickling', 'minipal', 'brickdragon', 'spacebuilder'], 'A stackable crew of studded builders, a minifigure, a brick dragon, and an astronaut.'],
      ];
      return `<p class="wiki-lede">Four crossover families landed in the Hollow: <b>${CROSSOVER_SPECIES.length} species</b> across <b>Fall Guys, Among Us, pocket monsters, and brick builders</b>. Each one is a full collectible with a gene, Titan, type egg, habitat, and signature silhouette.</p>
        ${groups.map(([title, keys, note]) => `<h3>${title}</h3><p>${note}</p><div class="wiki-hybrid-list">${keys.map((key) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`).join('')}</div>`).join('')}
        <h3>How they play</h3>
        <p>The beans lean into bounce and game coins, the crewmates split between helpful tasks and night tricks, the pocket monsters cover Volt, Ember, Bloom, and Tide, and the brick builders bring sturdy needs and gift bonuses. Every species has at least one thriving habitat and its own breeding pair.</p>`;
    },
  },
  {
    id: 'dc',
    icon: '🦸',
    title: 'DC hero sprites',
    summary: 'The Justice League, Bat-family, Titans, and street-level heroes.',
    body: () => {
      const groups = [
        ['Founding duo', ['batman', 'superman'], 'Batman and Superman were already in the Hollow. They anchor the new DC hero roster.'],
        ['Justice League', ['wonderwoman', 'flash', 'greenlantern', 'aquaman', 'cyborg', 'martian'], 'The rest of the founding League: Amazon, speedster, ring-bearer, sea king, cyber hero, and Martian.'],
        ['Bat-family & Krypton', ['batgirl', 'nightwing', 'supergirl'], 'Two Gotham protectors and a Kryptonian cousin with a brighter cape.'],
        ['Teen Titans', ['dcraven', 'starfire', 'beastboy', 'bluebeetle', 'static'], 'The next generation: empathic magic, starbolts, wild shapes, scarab armor, and static charge.'],
        ['Street-level & magic', ['greenarrow', 'blackcanary', 'shazam', 'zatanna', 'constantine', 'swampthing'], 'Archers, fighters, and the strange corners of the DC universe.'],
      ];
      return `<p class="wiki-lede">The DC hero wave adds <b>${DC_SPECIES.length} new species</b>, joining Batman and Superman for a <b>${DC_SPECIES.length + 2}-hero roster</b>. Each one is a full collectible with a gene, Titan, type egg, habitat, and signature silhouette.</p>
        ${groups.map(([title, keys, note]) => `<h3>${title}</h3><p>${note}</p><div class="wiki-hybrid-list">${keys.map((key) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`).join('')}</div>`).join('')}
        <h3>How they play</h3>
        <p>The League covers game coins, gifts, XP, and slower needs. The Bat-family leans into night play and energy, the Titans mix bond and elemental bursts, and the street-level heroes bring chat coins, day payouts, and sturdy late-game bonuses. Every hero has at least one thriving habitat.</p>
        <h3>Heroic hybrids</h3>
        <p>Every new hero has a named breeding pair, from Amazon Star and Speed Surge to Scarab Gem and Green Mire. Their type eggs are available in the Nest, and their species files are linked above.</p>`;
    },
  },
  {
    id: 'multiverse',
    icon: '🌌',
    title: 'Marvel, myths, anime & cartoons',
    summary: 'Marvel heroes, mythical creatures, anime legends, cartoons, and a Hollow legend.',
    body: () => {
      const groups = [
        ['marvel', 'Marvel heroes with signature powers, bright costumes, and a team-up waiting to happen.'],
        ['mythic', 'Creatures from old stories, with horns, wings, tails, and very strong opinions about naps.'],
        ['anime', 'Anime legends with big hair, bigger hearts, and a training arc in the Hollow.'],
        ['cartoon', 'Cartoon pals with squash-and-stretch energy and a sound effect for every mood.'],
      ];
      const heroCount = groups.reduce((total, [group]) => total + WAVE_BY_GROUP[group].length, 0);
      return `<p class="wiki-lede">Four new families landed at once: <b>${heroCount} species</b> across <b>Marvel heroes, mythical creatures, anime legends, and cartoons</b>. Every one has its own palette, gene, Titan, type egg, habitat, hybrid, and signature silhouette.</p>
        ${groups.map(([group, note]) => `<h3>${WAVE_GROUPS[group].label}</h3><p>${note}</p><div class="wiki-hybrid-list">${WAVE_BY_GROUP[group].map((key) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`).join('')}</div>`).join('')}
        <h3>Hollow legend</h3>
        <p>A fifth, rarer arrival anchors this wave: <b>ThatLadyBear</b>, the Hollow’s Mythic matriarch. She is species 329, with her own tiger-striped bear face, fangs, and teal wordmark plaque.</p>
        <div class="wiki-hybrid-list">${WAVE_BY_GROUP.legend.map((key) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`).join('')}</div>
        <h3>How they play</h3>
        <p>The Marvel set leans into game coins, gifts, and team-ready bond. The myths bring tides, wings, riddles, and sturdy needs. Anime legends cover speed, day and night payouts, and training-style XP. Cartoons are the cozy option: snacks, joy, pets, and a surprising amount of plot armor.</p>`;
    },
  },
  {
    id: 'villains',
    icon: '😈',
    title: 'Marvel & DC villains',
    summary: 'Ten Marvel villains and ten DC villains join the Hollow.',
    body: () => {
      const groups = [
        ['marvelvillain', 'Marvel villains with grand plans, dramatic capes, and a suspicious amount of confidence.'],
        ['dcvillain', 'DC villains who heard the heroes had all the fun and decided to crash the party.'],
      ];
      const villainCount = groups.reduce((total, [group]) => total + WAVE_BY_GROUP[group].length, 0);
      return `<p class="wiki-lede">The other side of the multiverse is here: <b>${villainCount} villains</b> across <b>Marvel and DC</b>. They are ordinary collectible species with their own genes, Titans, type eggs, habitats, hybrids, and signature art.</p>
        ${groups.map(([group, note]) => `<h3>${WAVE_GROUPS[group].label}</h3><p>${note}</p><div class="wiki-hybrid-list">${WAVE_BY_GROUP[group].map((key) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`).join('')}</div>`).join('')}
        <h3>How they play</h3>
        <p>Villain genes favor night payouts, game coins, gifts, and dramatic XP. Every villain has at least one home habitat and a named hybrid, and all twenty can be bought as type eggs in the Nest.</p>`;
    },
  },
  {
    id: 'heroes',
    icon: '🦸',
    title: 'Heroes, villains & anti-heroes',
    summary: `${HERO_SPECIES.length} new signatures across all three sides of the cape.`,
    body: heroWaveBody,
  },
  {
    id: 'disney',
    icon: '🏰',
    title: 'Disney signature collection',
    summary: `${DISNEY_TOTAL} Disney characters across seven groups.`,
    body: disneyWaveBody,
  },
  {
    id: 'carebears',
    icon: '🌈',
    title: 'Care Bears & Cousins',
    summary: `${CARE_BEAR_TOTAL} classic Care Bears, Cousins, and extended-family favourites with Care Packages.`,
    body: careBearWaveBody,
  },
  {
    id: 'wwe',
    icon: '🏆',
    title: 'WWE superstars',
    summary: `${WWE_TOTAL} legends, superstars, women’s champions, tag teams, and NXT stars with original ring gear.`,
    body: wweWaveBody,
  },
  {
    id: 'ponies',
    icon: '🦄',
    title: 'My Little Pony',
    summary: `${PONY_TOTAL} ponies, including 50 background favourites and 15 royal leaders, with check-in and task coin bonuses.`,
    body: ponyWaveBody,
  },
  {
    id: 'tvlegends',
    icon: '📺',
    title: 'TV Legends',
    summary: `${TV_LEGACY_TOTAL} characters in full-show casts across prestige, sitcom, sci-fi, fantasy, and animated TV.`,
    body: tvLegacyWaveBody,
  },
  {
    id: 'netflix',
    icon: '🎬',
    title: 'Netflix animation wing',
    summary: `${NETFLIX_TOTAL} characters across 10 Netflix Anime and 10 Netflix Toons shows, three per show.`,
    body: netflixWaveBody,
  },
  {
    id: 'fourrealms',
    icon: '🌗',
    title: 'Horror, Light & Darkness',
    summary: `${REALM_TOTAL} horror, dark horror, light, and darkness sprites.`,
    body: realmWaveBody,
  },
  {
    id: 'kingdomhearts',
    icon: '🗝️',
    title: 'Kingdom Hearts',
    summary: `${KH_TOTAL} Keyblade wielders, Nobodies, Wayfinders, Seekers, and Disney-world characters.`,
    body: kingdomHeartsWaveBody,
  },
  {
    id: 'legends',
    icon: '🌍',
    title: 'Crossover legends',
    summary: `${LEGEND_TOTAL} characters across games, cartoons, and horror.`,
    body: legendWaveBody,
  },
  {
    id: 'pokedex',
    icon: '🔴',
    title: 'Pokédex: 1,025 species',
    summary: 'Every base species from Bulbasaur to Pecharunt, across all 18 types.',
    body: () => {
      const typeCounts = {};
      POKEDEX_SPECIES.forEach((key) => (POKEDEX_META[key].types || []).forEach((type) => {
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      }));
      const samples = ['pdx001', 'pdx025', 'pdx658', 'pdx778', 'pdx959', 'pdx1007', 'pdx1025'];
      return `<p class="wiki-lede">The Hollow now holds all <b>${POKEDEX_SPECIES.length} base Pokémon species</b> across all 18 standard types, from Bulbasaur to Pecharunt.</p>
        <p>Each one is a full collectible with its own type egg, gene power, Titan name, habitats, greeting, and <b>Bond</b> hybrid. The art is original vector work shaped by each species' type and body plan — no official game sprites are imported.</p>
        <h3>Every type is represented</h3>
        <div class="wiki-hybrid-list">${Object.entries(PDX_TYPES).map(([type, meta]) => `<span class="chip">${meta.name} · ${typeCounts[type] || 0}</span>`).join('')}</div>
        <h3>Meet a few</h3>
        <div class="wiki-hybrid-list">${samples.map((key) => {
          const meta = POKEDEX_META[key];
          return `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${meta.types.map((type) => PDX_TYPES[type].name).join(' · ')} · ${PDX_REGIONS[meta.gen] || ''}</span></button>`;
        }).join('')}</div>
        <h3>How to find any species</h3>
        <p>Search a name in the species archive or use the type search above. In the Nest, every species belongs to a type egg; the type shop now shows 60 eggs at a time, with more on demand. The full archive can also be searched from the Wiki.</p>`;
    },
  },
  {
    id: 'fortnite',
    icon: '🎮',
    title: 'Fortnite roster: current & legacy',
    summary: `${FORTNITE_TOTAL} sprites covering the current pass and multiple headliners from every past season, Chapter 1 to Chapter 5.`,
    body: () => {
      const groups = [
        ['Chapter 7 Season 3 · Runners', ['guardian', 'voidblade'], 'The two original headliners from the sprite-extraction season.'],
        ['Chapter 6 Season 1 · Hunters', ['nyanja', 'jade', 'kendo', 'shadowbladehope', 'daigo', 'herobaymax', 'nightrose', 'godzilla'], 'Includes the Godzilla Evolved quest outfit.'],
        ['Chapter 6 Season 2 · Lawless', ['cassidy', 'joss', 'fletcher', 'valentina', 'bigdill', 'keisha', 'subzero', 'midas'], 'Includes the mid-season Outlaw Midas.'],
        ['Chapter 6 · Galactic Battle', ['evie', 'poe', 'wookiee', 'palpatine', 'grievous'], 'The Star Wars mini-season pass, including General Grievous.'],
        ['Chapter 6 Season 3 · Super', ['robin', 'haylee', 'ziggy', 'synthwave', 'lightrider', 'morganmyst'], 'Superman already has a species file, so he completes this pass without a duplicate.'],
        ['Chapter 6 Season 4 · Shock ’N Awesome', ['spartan', 'yoomi', 'agentpatch', 'mae', 'ripp', 'onyxwinter', 'greenranger', 'megazord'], 'Includes the mid-season Dino Megazord.'],
        ['Chapter 6 · The Simpsons', ['marge', 'blinkyfish', 'ned', 'homer', 'springfieldpeely'], 'The Springfield mini-season, including Springfielder Peely.'],
      ];
      const rosterCount = groups.reduce((total, [, keys]) => total + keys.length, 0);
      return `<p class="wiki-lede">The Hollow now holds <b>${FORTNITE_TOTAL} Fortnite sprites</b>: <b>${FORTNITE_SPECIES.length} current Chapter 6/7 pass species</b> and <b>${FORTNITE_LEGACY_TOTAL} Legacy headliners</b> spanning <b>every past season from Chapter 1 through Chapter 5</b>.</p>
        <p>The current roster covers Chapter 6 from Hunters through The Simpsons, including Godzilla Evolved, Outlaw Midas, Dino Megazord, and Springfielder Peely. The Legacy roster adds the old island eras: Chapter 1’s Renegade Raider, Black Knight, Drift, Peely, and Season X; Chapter 2’s agents and spies; Chapter 3’s chrome storm; Chapter 4’s wild pass; and Chapter 5’s mythic chapter.</p>
        ${groups.map(([title, keys, note]) => `<h3>${title}</h3><p>${note}</p><div class="wiki-hybrid-list">${keys.map((key) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`).join('')}</div>`).join('')}
        <h3>🪂 Fortnite Legacy · ${FORTNITE_LEGACY_TOTAL} past-season headliners</h3>
        <p>Every past season is represented, with at least one headliner per season from Chapter 1 Season 1 through Chapter 5 Remix. Each Legacy sprite is a normal type egg with its own season badge, gene, Titan, habitat, and named hybrid.</p>
        ${FORTNITE_LEGACY_CHAPTER_ORDER.map((chapter) => {
          const meta = FORTNITE_LEGACY_GROUPS[chapter];
          const keys = FORTNITE_LEGACY_BY_CHAPTER[chapter];
          return `<h3>${meta.icon} ${esc(meta.label)} · ${keys.length}</h3><p>${esc(meta.note)}</p><div class="wiki-hybrid-list">${keys.map((key) => `<button class="wiki-link" data-wiki-type="${key}"><b>${esc(ELEMENTS[key].name)}</b><span>${esc(ELEMENTS[key].fortniteSeason)} · ${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`).join('')}</div>`;
        }).join('')}
        <h3>How they play</h3>
        <p>Current genes lean into gifts, game coins, night bonuses, and bond. Legacy genes follow their chapter: Chapter 1 speeds gifts, Chapter 2 favors night games, Chapter 3 boosts game coins, Chapter 4 raises XP, and Chapter 5 mixes night payouts with XP. Every species is available as its own egg in the Nest, and each one has at least one thriving habitat. The new hybrid pairs are recorded in the breeding codex.</p>
        <p>Collect <b>${SECRET_SPECIES_META.seasonkeeper.collectionSecret.count} Legacy species</b> to open the <b>Season Keeper</b> secret, and <b>${SECRET_SPECIES_META.riftchampion.collectionSecret.count}</b> to earn the exotic <b>Rift Champion</b>.</p>`;
    },
  },
  {
    id: 'spritevault',
    icon: '🎨',
    title: 'Fortnite Sprite field guide',
    summary: 'All 27 base sprites and every Gold, Gummy, Galaxy, Holofoil, Cube, Quack, and Gem variant.',
    body: () => {
      const items = [
        ['water', 'Water Sprite'], ['air', 'Air Sprite'], ['earth', 'Earth Sprite'],
        ['dash', 'Dash Sprite'], ['superman', 'Superman Sprite'], ['fire', 'Fire Sprite'],
        ['fishy', 'Fishy Sprite'], ['duck', 'Duck Sprite'], ['ghost', 'Ghost Sprite'],
        ['demon', 'Demon Sprite'], ['king', 'King Sprite'], ['striker', 'Striker Sprite'],
        ['aura', 'Aura Sprite'], ['dream', 'Dream Sprite'], ['punk', 'Punk Sprite'],
        ['boss', 'Boss Sprite'], ['seven', 'Seven Sprite'], ['peely', 'Peeky Peely Sprite'],
        ['lootllama', 'Lootin’ Llama Sprite'], ['zeropoint', 'Zero Point Sprite'],
        ['burntpb', 'Burnt Peanut Sprite'], ['grim', 'Grim Sprite'], ['batman', 'Batman Sprite'],
        ['vini', 'Vini Jr. Sprite'], ['pollo', 'Pollo Sprite'], ['wick', 'John Wick Sprite'],
        ['ironmouse', 'Ironmouse Sprite'],
      ];
      const variantCount = items.length * FINISH_KEYS.length;
      return `<p class="wiki-lede">The Fortnite Sprite family is now catalogued end to end: <b>${items.length} base sprites</b> and <b>${variantCount} named finish variants</b>. Dash Sprite is the newest base species; the other 26 were already part of the Hollow.</p>
        <p>In Fortnite these are separate item names. In Sprite Hollow, the base name is a collectible species and the color adjective is one of the seven <b>finishes</b>. That means every variant below is possible on the same species — a Gold Water Sprite, a Galaxy Batman Sprite, a Quack Lootin’ Llama, and so on. Finishes tint the whole body, add an overlay, and grant their own bonus.</p>
        <h3>Base sprites</h3>
        <div class="wiki-hybrid-list">${items.map(([key, label]) => `<button class="wiki-link" data-wiki-type="${key}"><b>${label}</b><span>${GENE_POWERS[key].icon} ${esc(GENE_POWERS[key].name)}</span></button>`).join('')}</div>
        <h3>The seven finishes</h3>
        <div class="wiki-hybrid-list">${FINISH_KEYS.map((key) => `<div class="wiki-habitat-row"><span class="wh-emoji">${FINISHES[key].icon}</span><span class="wh-copy"><b>${FINISHES[key].name}</b><span>${esc(FINISHES[key].bonus)}</span></span></div>`).join('')}</div>
        <p>About 15% of eggs hatch with a finish. Merging can pass a parent’s finish to the child. A finish is separate from shiny and can stack with it, plus genes, combos, and evolutions.</p>
        <h3>All ${variantCount} variants</h3>
        <p>Every base sprite crossed with every finish. These are catalog names, not extra species files; the finish system applies them to the base species.</p>
        <div class="wiki-habitat-table">${items.map(([key, label]) => `<div class="wiki-habitat-row" style="align-items:flex-start"><span class="wh-emoji">${FINISHES[FINISH_KEYS[0]].icon}</span><span class="wh-copy"><b>${label}</b><span class="row" style="flex-wrap:wrap;gap:4px;margin-top:4px">${FINISH_KEYS.map((finishKey) => `<span class="chip" style="font-size:9.5px">${FINISHES[finishKey].icon} ${FINISHES[finishKey].name} ${label}</span>`).join('')}</span></span></div>`).join('')}</div>
        <p class="tiny muted">Dash Sprite is a normal type egg in the Nest. The other base sprites keep their existing genes, Titans, habitats, and hybrids.</p>`;
    },
  },
  {
    id: 'eggs',
    icon: '🥚',
    title: 'Eggs & hatching',
    summary: 'Wild eggs, type eggs, warming, and what happens when the shell breaks.',
    body: () => `<p class="wiki-lede">Eggs are the start of every sprite's story. There are three wild-egg tiers, a type egg for every species, and the Mythic Egg at the top of the Nest.</p>
      <h3>Wild eggs</h3>
      <p>The <b>Meadow Egg</b> costs ${EGG_TIERS.common.price} coins, the <b>Wild Egg</b> costs ${EGG_TIERS.wild.price}, and the <b>Prism Egg</b> costs ${EGG_TIERS.prism.price}. Higher tiers improve mutation odds and start at a higher generation. The element is random.</p>
      <h3>Type eggs</h3>
      <p>Type eggs are priced per species and always hatch that exact species. This is the reliable way to collect a specific look, habitat specialist, or hybrid parent.</p>
      <h3>Warming</h3>
      <p>Tap the egg to warm it. The shell cracks in stages, and when the bar reaches 100% the egg is ready. Hatching adds the baby to your collection and gives a small coin and XP bonus. The <b>Mythic Egg</b> adds an animated rarity reveal before the final break.</p>`,
  },
  {
    id: 'shine',
    icon: '✨',
    title: 'Shiny sprites & finishes',
    summary: 'Two different kinds of sparkle, and how to stack them.',
    body: () => `<p class="wiki-lede"><b>Shiny</b> and a <b>finish</b> are separate traits. A sprite can have neither, one, or both.</p>
      <h3>Shiny</h3>
      <p>Any egg can hatch shiny. The base hatch chance is 6%, with small bonuses from generation, hybrids, combos, mutations, and finishes. Merging starts at 16% and rises with every merge; shiny parents, hybrids, and mutations push it higher. A shiny sprite gets an extra sparkle overlay.</p>
      <h3>Finishes</h3>
      <p>A finish retints the whole body and adds an overlay and bonus. About 15% of eggs carry one; merges can pass a parent's finish to the child. The seven finishes are:</p>
      <div class="row" style="flex-wrap:wrap;gap:5px;justify-content:flex-start">${wikiFinishList()}</div>
      <p style="margin-top:9px">Finishes stack with gene powers, habits, combos, evolutions, and shiny. A Gummy Galaxy Dragon with a combo can carry a surprising number of bonuses at once.</p>`,
  },
  {
    id: 'merging',
    icon: '🧬',
    title: 'Merging & hybrids',
    summary: 'Parent requirements, costs, twins, combos, and the hybrid table.',
    body: () => `<p class="wiki-lede">Merging combines two grown sprites into a new egg. Both parents must be <b>level 3 or higher</b> and rested.</p>
      <h3>Cost & rest</h3>
      <p>A merge costs <b>70 coins plus 25 per parent generation</b>. After the egg appears, both parents rest for <b>60 seconds</b>. The child inherits an element, breed, colours, personality, and possibly a mutation from its parents.</p>
      <h3>Hybrids</h3>
      <p>Certain element pairs have a named hybrid, such as Steam, Eclipse, Twilight, Storm, Glacier, Solstice, and Prismheart. When an egg is a hybrid, its type name changes and it inherits the hybrid's palette, pattern, and accessory if a special combo is rolled.</p>
      <h3>Odds that improve</h3>
      <ul class="wiki-list">
        <li><b>Twins</b> start at 5% and rise with every merge.</li>
        <li><b>Special combos</b> start at 4% and rise with every merge.</li>
        <li><b>Shiny</b> starts at 16% for merges and is boosted by shiny parents and hybrid pairs.</li>
      </ul>
      <p>Higher-generation parents cost more but pass on a small XP bonus and can contain richer colour and mutation history.</p>`,
  },
  {
    id: 'breeding',
    icon: '🧬',
    title: 'Breeding codex',
    summary: 'Every hybrid pair, its signature child, and the genes it inherits.',
    body: () => breedingGuideBody(),
  },
  {
    id: 'growth',
    icon: '🌟',
    title: 'Growth, Titans & evolution',
    summary: 'Levels, stages, diet affinities, and the four evolution forms.',
    body: () => `<p class="wiki-lede">Sprites level up by doing things with you. Levels unlock new life stages and, eventually, a Titan name.</p>
      <h3>Stages</h3>
      <p><b>${['Egg', ...STAGE_ORDER.map((stage) => STAGE_LABELS[stage])].join(' → ')}</b> at levels 1 / ${STAGE_ORDER.map((stage) => STAGE_LEVEL[stage]).slice(1).join(' / ')}. Every level pays 12 coins and raises joy and bond. Elders are bigger, get a sparkle aura, and carry the species' Titan name.</p>
      <h3>Fast XP</h3>
      <p>The best XP comes from matching the sprite's habitat, then playing games, feeding, and sleeping. Petting is small but repeatable. Gene powers, finishes, combos, generation, and habitat bonuses all multiply the final amount.</p>
      <h3>Diet evolution</h3>
      <p>Feeding builds four diet affinities, shown on every sprite's detail sheet: <b>Hearty, Sweet, Eerie, and Wild</b>. At level 10, a sprite with 12 points in a path can evolve into a <b>Dragon</b>, <b>Fairy</b>, <b>Ghoul</b>, or elemental <b>Titan</b> form. The evolution is permanent and adds its own silhouette and power.</p>`,
  },
  {
    id: 'care',
    icon: '💛',
    title: 'Care, bond & sleep',
    summary: 'Needs, affection, bedroom cycles, and the dream journal.',
    body: () => `<p class="wiki-lede">A sprite has four needs: <b>Food, Rest, Joy, and Clean</b>. They decay in real time, even while the game is closed.</p>
      <h3>The care dock</h3>
      <p>Feed from the pantry or market, play a game, give a bubble bath, tuck in for a nap, open the bedroom with <b>Bed</b>, or talk. Each action raises bond and XP. Petting the active sprite is free and has a short cooldown.</p>
      <h3>Bond</h3>
      <p>Bond grows through petting, feeding, play, baths, chats, and bedtime. Higher bond unlocks warmer greetings and the <b>Inseparable</b> tier. Some gene powers add extra bond from petting.</p>
      <h3>Sleep</h3>
      <p>A tuck-in runs <b>two 90-second sleep cycles</b>. Waking restores energy and pays bond and XP based on completed cycles. Night tuck-ins pay extra. Every wake creates a dream that is saved to the sprite and to the bedroom's <b>Dream Journal</b>, which keeps the last 100 dreams.</p>`,
  },
  {
    id: 'checkins',
    icon: '📅',
    title: 'Check-ins, streaks & goals',
    summary: 'Four daily windows, weekly tracks, monthly milestones, and year streaks.',
    body: () => `<p class="wiki-lede">The Today screen runs the Hollow's calendar. There are four check-in windows each day: <b>morning, afternoon, evening, and night</b>.</p>
      <h3>Daily check-ins</h3>
      <p>Each window pays coins and can drop a pantry snack. The first check-in of the day always stocks one pantry food and keeps the daily streak alive. During a holiday event it also stocks that event's themed treat and pays the holiday coin bonus. Four windows means four chances to earn, and the streak is about showing up, not staying online.</p>
      <h3>Monthly crate</h3>
      <p>The Today screen also has a monthly check-in crate, once per calendar month. It pays <b>100 coins plus 5 per check-in day that month</b> (up to 150), stocks three pantry foods, and unlocks one new monthly food with two extra of it.</p>
      <h3>Weekly & monthly</h3>
      <p>Weekly check-ins unlock snack bundles, a wild sprite at 8, and a rare elder at 16. Monthly milestones and a yearly mythic elder reward longer consistency. Week, month, and year counters track streaks separately.</p>
      <h3>Daily goals</h3>
      <p>Four rotating tasks each day pay coins and XP. Weekly and monthly goals add bigger targets. They draw from the same actions you already do: pet, feed, chat, bathe, nap, game, warm eggs, hatch, and merge.</p>`,
  },
  {
    id: 'food',
    icon: '🍲',
    title: 'Food, pantry & wardrobe',
    summary: `${FOOD_KEYS.length - 1} market foods, the gift-only Starpath Feast, ${SNACK_KEYS.length} free snacks, and warm clothes.`,
    body: () => `<p class="wiki-lede">The feed sheet has two food sources: the <b>market</b>, where you spend coins, and the <b>pantry</b>, where bought food waits.</p>
      <h3>Market & pantry</h3>
      <p>The guide lists <b>${FOOD_KEYS.length} foods</b> across seven categories: <b>produce, meat, vegetables, drinks, desserts, meals, and treats</b>. ${FOOD_KEYS.length - 1} are market stock; the extra entry is the arcade-only <b>Starpath Feast</b>. Feeding from the pantry consumes the item and builds diet affinities toward evolution. The <b>World Kitchen</b> guide groups 96 of them by region, while the <b>Anime & Trainer Kitchen</b> covers the newest menu.</p>
      <p>The <b>Starpath Feast</b> comes from arcade bonus gifts and month gifts. It advances the active sprite to its next growth milestone (5, 10, 20, or 30) and is not sold in the market.</p>
      <p>The full <b>Food &amp; snacks</b> guide lives on the Sprites screen. It lists every item with its effects, diet affinity, source, pantry count, and monthly-crate lock status.</p>
      <h3>Snacks</h3>
      <p>Ten candy-tagged treats — including cotton candy, candy canes, gumballs, and toffee chews — also build a sprite's <b>Sugar</b>. At 3 sugar, the sprite transforms into a random candy species and sugar resets to 0.</p>
      <p>There are <b>${SNACK_KEYS.length} free snacks</b>, split between sweet, savory, fresh, and drink types. Check-ins and gifts can drop them, and they are useful for a quick hunger or joy bump.</p>
      <h3>Monthly foods</h3>
      <p>Eight premium foods are sealed inside the monthly crate: Honeycomb Cake, Moonberry Shake, Starfruit Pie, Dumpling Boat, Lagoon Stew, Aurora Bun, Solar Curry, and Cloud Sorbet. Claim the crate on Today to unlock the next one; locked monthly foods stay hidden from the market.</p>
      <h3>Warm clothes</h3>
      <p>Cold and wet weather drains energy, joy, and cleanliness faster. A scarf is free; a wool beanie, mittens, and a snow parka are bought once for the whole Hollow and can be worn by anyone. The Chilly/Cozy chip opens the wardrobe.</p>`,
  },
  {
    id: 'worldkitchen',
    icon: '🌍',
    title: 'World Kitchen',
    summary: '96 regional dishes across eight cuisines, linked to every pantry card.',
    body: worldKitchenBody,
  },
  {
    id: 'animekitchen',
    icon: '🍥',
    title: 'Anime & Trainer Kitchen',
    summary: `${ANIME_KITCHEN_KEYS.length} anime dishes, ${TRAINER_KITCHEN_KEYS.length} Trainer foods, and ${ANIME_TRAINER_SNACK_TOTAL} snacks.`,
    body: animeKitchenBody,
  },
  {
    id: 'weather',
    icon: '🌦️',
    title: 'Seasons, weather & climate',
    summary: 'The real calendar, every habitat, five climates, and cozy clothes.',
    body: () => `<p class="wiki-lede">The Hollow follows the real date and time. Dawn, day, dusk, and night tint the stage; spring, summer, autumn, and winter change its colours and weather pool.</p>
      <h3>Weather</h3>
      <p>Spring brings petals and rain, summer heat and storms, autumn leaves and fog, winter snow and frost. Weather changes every three hours and is drawn over the habitat.</p>
      <h3>Climate</h3>
      <p>Choose <b>Temperate, Tropical, Arid, Arctic, or Highland</b> in the Studio. Climate shifts the weather odds and even changes what a season is called — tropical winter becomes the wet season. <b>Switching climates is free.</b></p>
      <h3>Cozy checks</h3>
      <p>Cold and wet weather drains needs faster. Wear warm clothes, or keep an eye on the Chilly chip and bring the sprite inside for a bath and a nap.</p>`,
  },
  {
    id: 'games',
    icon: '🎮',
    title: 'Games, gifts & coins',
    summary: 'Twelve minigames, arcade bonus gifts, monthly prizes, and the fastest ways to earn.',
    body: () => `<p class="wiki-lede">Coins come from check-ins, games, gifts, petting, care, and level-ups. Games are the most active source.</p>
      <h3>Twelve games</h3>
      <p><b>Treat Catch, Pulse Match, Sprite Says, and Coin Dig</b> are always open. <b>Nectar Pop</b> unlocks at 4 check-ins, <b>Green Toss</b> at 6, <b>Moon Match</b> at 12, <b>Candy Crunch</b> at 14, and <b>Holiday Lights</b> at 20.</p>
      <p><b>Rune Slide, Zombie Siege, and Hollow Duel</b> are the three Arcade challenges. Rune Slide is a sliding puzzle with a visible order strip and green placement hints; you have two minutes to finish three boards. Zombie Siege is a three-lane horde defense, and Hollow Duel is a timed strike-and-guard fight. They are always open, and every game pays coins and XP to the active sprite, plus joy and bond, scaled by score.</p>
      <h3>Arcade bonus &amp; month gifts</h3>
      <p>Every <b>5,000 coins</b> earned in the three Arcade challenges fills a bonus gift. Gifts contain coins, a pantry food, and a snack; every third one also includes a <b>Starpath Feast</b>. The monthly track has three tiers at <b>5,000 / 12,000 / 25,000 arcade coins</b>, resetting on the first of the month. Higher tiers include one or two Starpath Feasts.</p>
      <p>A <b>Starpath Feast</b> is a gift-only food that advances the active sprite to its next growth milestone: level 5, 10, 20, 100, 250, 500, or 1,000. It cannot be bought in the market and is never consumed by a max-level sprite.</p>
      <h3>Rarity play payouts</h3>
      <p>Every completed game pays the normal score coins, then adds the active sprite's <b>rarity bonus</b>: <b>Common 1,500</b>, <b>Uncommon 1,500</b>, <b>Rare 2,700</b>, <b>Epic 4,000</b>, <b>Legendary 6,750</b>, <b>Mythic 10,000</b>, <b>Secret 13,500</b>, <b>Exotic 18,000</b>, and <b>Master 25,000</b>.</p>
      <p><b>Common and Uncommon</b> sprites also get a <b>25% gift-speed bonus</b>, so their gifts arrive sooner. <b>Special</b> combos, mutations, and shinies keep their normal payout and add the bonus for their species' rarity. Gene, habit, finish, phase, and holiday bonuses still apply.</p>
      <h3>Gifts</h3>
      <p>Your active sprite wraps a gift every few minutes. Open it in the Hollow for XP, coins, snacks, or a brand-new environment. Gale sprites and some combos speed the timer up.</p>
      <h3>Spending</h3>
      <p>Coins buy eggs, food, clothes, habitat scenes, and merges. Type eggs are the reliable species purchase; the Mythic Egg is the high-risk, high-rarity splurge.</p>`,
  },
];

function openWikiGuide(id) {
  const guide = WIKI_GUIDES.find((g) => g.id === id);
  if (!guide) return;
  openSheet({
    title: `${guide.icon} ${guide.title}`,
    sub: 'Spritepedia · Hollow systems',
    body: `<div class="wiki-article">${guide.body()}<div class="wiki-footnote">Last edited by the Hollow archivist · Sprite Hollow field notes</div></div>`,
    onMount: (sheet, close) => {
      sheet.querySelectorAll('[data-wiki-guide]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const next = btn.dataset.wikiGuide;
          close();
          setTimeout(() => openWikiGuide(next), 30);
        });
      });
      sheet.querySelectorAll('[data-wiki-type]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const next = btn.dataset.wikiType;
          close();
          setTimeout(() => openWikiArticle(next), 30);
        });
      });
      sheet.querySelectorAll('[data-wiki-action="bonds"]').forEach((btn) => {
        btn.addEventListener('click', () => { close(); setTimeout(() => openBondCodex(), 160); });
      });
      sheet.querySelectorAll('[data-world-evo-open]').forEach((btn) => {
        btn.addEventListener('click', () => { close(); setTimeout(() => openWorldEvolutionAtlas(), 160); });
      });
      sheet.querySelectorAll('[data-world-evo-env]').forEach((btn) => {
        btn.addEventListener('click', () => { close(); setTimeout(() => openWorldEvolutionAtlas({ environment: btn.dataset.worldEvoEnv }), 160); });
      });
      sheet.querySelectorAll('[data-biome-travel]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.biomeTravel;
          Actions.setTheme({ scene: key });
          close();
          App.refresh();
          toast(`${SCENES[key].emoji} ${SCENES[key].name} · type biome active.`, '🧭');
        });
      });
      sheet.querySelectorAll('[data-world-food]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.worldFood;
          close();
          setTimeout(() => openFoodDetail('food', key), 30);
        });
      });
      sheet.querySelector('[data-breeding-open]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openBreedingCodex(), 30);
      });
    },
  });
}

function openWikiArticle(key) {
  const el = ELEMENTS[key];
  if (!el) return;
  const tier = TYPE_EGG_RARITIES[typeEggRarity(key)];
  const power = GENE_POWERS[key];
  const price = TYPE_EGG_PRICE[key];
  const hybrids = hybridsFor(key);
  const habitats = wikiHabitats(key);
  const secret = isSecretSpecies(key);
  const master = key === MASTER_CHEAT_SPECIES;
  const parentTypes = typeof parentTypesForSpecies === 'function' ? parentTypesForSpecies(key) : [];
  const entry = ELEMENT_KEYS.slice().sort((a, b) => ELEMENTS[a].name.localeCompare(ELEMENTS[b].name)).indexOf(key) + 1;
  const sample = {
    id: `wiki-${key}`, element: key, breed: 'puff', stage: 'sprite',
    pattern: 'plain', palette: 'native', accessory: 'none', name: el.name, level: 3, size: 'standard',
  };
  const habitatNames = habitats.map((k) => SCENES[k].name).join(' · ');
  openSheet({
    title: el.name,
    sub: `Species article · ${tier.name} tier`,
    body: `<div class="wiki-article">
      <div class="wiki-infobox">
        <div class="wiki-portrait">${spriteSVG(sample, { expr: 'happy' })}</div>
        <div class="wiki-facts">
          <div><span>Rarity</span><b style="color:${tier.color}">${tier.name}</b></div>
          <div><span>Egg</span><b>${secret || master ? 'Vault only' : `${price || '—'} 🪙`}</b></div>
          <div><span>Gene</span><b>${power.icon} ${esc(power.name)}</b></div>
          ${el.heroPublisher ? `<div><span>Publisher</span><b>${HERO_PUBLISHER_META[el.heroPublisher].icon} ${esc(HERO_PUBLISHER_META[el.heroPublisher].label)}</b></div>` : ''}
          ${el.heroRole ? `<div><span>Role</span><b>${esc(HERO_ROLE_META[el.heroRole].label)}</b></div>` : ''}
          ${el.disneyGroup ? `<div><span>Disney</span><b>${DISNEY_GROUPS[el.disneyGroup].icon} ${esc(DISNEY_GROUPS[el.disneyGroup].label)}</b></div>` : ''}
          ${el.careBearGroup ? `<div><span>Care family</span><b>${CARE_BEAR_GROUPS[el.careBearGroup].icon} ${esc(CARE_BEAR_GROUPS[el.careBearGroup].label)}</b></div>` : ''}
          ${el.fortniteLegacy ? `<div><span>Fortnite</span><b>${esc(el.fortniteSeason)} · Legacy</b></div>` : ''}
          ${el.wwe ? `<div><span>WWE</span><b>${WWE_GROUPS[el.wweGroup].icon} ${esc(WWE_GROUPS[el.wweGroup].label)} · ${esc(el.wweNickname)}</b></div>` : ''}
          ${el.pony ? `<div><span>Pony</span><b>${PONY_GROUPS[el.ponyGroup].icon} ${esc(PONY_GROUPS[el.ponyGroup].label)} · ${esc(el.ponyType)}</b></div>` : ''}
          ${el.tvLegacy ? `<div><span>TV show</span><b>${TV_LEGACY_GROUPS[el.tvLegacyGroup].icon} ${esc(el.tvShow)}</b></div>` : ''}
          ${el.netflix ? `<div><span>Netflix</span><b>${NETFLIX_WINGS[el.netflixWing].icon} ${esc(el.netflixShow)} · ${esc(NETFLIX_WINGS[el.netflixWing].label)}</b></div>` : ''}
          ${el.realmWave ? `<div><span>Realm</span><b>${REALM_WAVE_GROUPS[el.realmGroup].icon} ${esc(REALM_WAVE_GROUPS[el.realmGroup].label)} · ${esc(el.realmRole)}</b></div>` : ''}
          ${el.kingdomHearts ? `<div><span>Kingdom Hearts</span><b>${KH_GROUPS[el.khGroup].icon} ${esc(el.khWorld)}</b></div>` : ''}
          ${el.legendGroup ? `<div><span>Family</span><b>${LEGEND_GROUPS[el.legendGroup].icon} ${esc(LEGEND_GROUPS[el.legendGroup].label)}${el.legendClassic ? ' · classic' : ''}</b></div>` : ''}
          ${el.catalogGroup ? `<div><span>Collection</span><b>${CATALOG_GROUPS[el.catalogGroup].icon} ${esc(CATALOG_GROUPS[el.catalogGroup].label)}</b></div>` : ''}
          ${el.worldVariant ? `<div><span>Region</span><b>${esc(el.worldRegion)} · ${esc(el.variantType)} variant</b></div>` : ''}
          ${el.gameGenre ? `<div><span>Genre</span><b>${esc(el.gameGenre)}</b></div>` : ''}
          ${parentTypes.length ? `<div><span>Parent types</span><b>${esc(parentTypes.join(' · '))}</b></div>` : ''}
          ${secret ? `<div><span>Vault</span><b>${master ? '🕹️ Master secret' : '🔐 Secret keeper'}</b></div>` : ''}
          ${isExoticSpecies(key) ? `<div><span>Class</span><b>✦ Exotic signature</b></div>` : ''}
          <div><span>Titan</span><b>${esc(TITAN_NAMES[key])}</b></div>
          <div><span>Habitat</span><b>${esc(habitatNames || 'Anywhere')}</b></div>
          <div><span>Likes</span><b>${esc(el.likes)}</b></div>
        </div>
      </div>
      <p class="wiki-lede">${esc(el.blurb)}</p>
      <h3>Behavior</h3>
      <p>${esc(el.trait)}</p>
      <blockquote class="wiki-quote">“${esc(el.greeting)}”</blockquote>
      ${el.netflix ? `<h3>Show notes</h3><p>${esc(el.netflixArticle)}</p><p class="tiny muted">Original character study. The ${esc(el.netflixShow)} palette and motifs are used as inspiration; no show frames or traced art are included.</p>` : ''}
      <h3>Where it thrives</h3>
      <div class="wiki-habitat-table">${wikiHabitatRows(key) || '<p>This sprite is comfortable anywhere in the Hollow.</p>'}</div>
      <h3>Gene power</h3>
      <div class="wiki-power">
        <span class="wp-icon">${power.icon}</span>
        <span><b>${esc(power.name)}</b><br><span>${esc(power.desc)}</span></span>
      </div>
      <h3>Growth</h3>
      <p>Hatches from a <b>${esc(el.name)} Egg</b> and grows through <b>${['Egg', ...STAGE_ORDER.map((stage) => STAGE_LABELS[stage])].join(' → ')}</b> at levels 1 / ${STAGE_ORDER.map((stage) => STAGE_LEVEL[stage]).slice(1).join(' / ')}. The level cap is <b>${MAX_LEVEL.toLocaleString()}</b>, and the next stage is previewed on every owned sprite. Its elder Titan name is <b>${esc(TITAN_NAMES[key])}</b>.</p>
      <button class="btn btn-soft btn-block" data-wiki-action="bonds" style="margin-top:9px">💞 Bond Codex &amp; evolution path</button>
      <h3>Genetics & hybrids</h3>
      ${hybrids.length
        ? `<div class="wiki-hybrid-list">${hybrids.map((h) => `<button class="wiki-link" data-wiki-breed="${pairKey(key, h.element)}"><b>${esc(h.name)}</b><span>× ${esc(ELEMENTS[h.element].name)}</span></button>`).join('')}</div>`
        : '<p>No signature hybrids are recorded yet. It still blends colours and traits like any parent.</p>'}
      <button class="btn btn-soft btn-block" data-breeding-open style="margin-top:9px">Open the breeding codex</button>
      ${el.heroPublisher ? `<button class="btn btn-soft btn-block" data-wiki-guide="heroes" style="margin-top:9px">Open the hero wave guide</button>` : ''}
      ${el.disneyGroup ? `<button class="btn btn-soft btn-block" data-wiki-guide="disney" style="margin-top:9px">Open the Disney collection</button>` : ''}
      ${el.careBearGroup ? `<button class="btn btn-soft btn-block" data-wiki-guide="carebears" style="margin-top:9px">Open the Care Bears &amp; Cousins collection</button>` : ''}
      ${el.fortniteLegacy ? `<button class="btn btn-soft btn-block" data-wiki-guide="fortnite" style="margin-top:9px">Open the Fortnite current &amp; legacy roster</button>` : ''}
      ${el.wwe ? `<button class="btn btn-soft btn-block" data-wiki-guide="wwe" style="margin-top:9px">Open the WWE superstars guide</button>` : ''}
      ${el.pony ? `<button class="btn btn-soft btn-block" data-wiki-guide="ponies" style="margin-top:9px">Open the My Little Pony guide</button>` : ''}
      ${el.tvLegacy ? `<button class="btn btn-soft btn-block" data-wiki-guide="tvlegends" style="margin-top:9px">Open the TV Legends guide</button>` : ''}
      ${el.netflix ? `<button class="btn btn-soft btn-block" data-wiki-guide="netflix" style="margin-top:9px">Open the Netflix animation wing</button>` : ''}
      ${el.realmWave ? `<button class="btn btn-soft btn-block" data-wiki-guide="fourrealms" style="margin-top:9px">Open the Horror, Light &amp; Darkness guide</button>` : ''}
      ${el.kingdomHearts ? `<button class="btn btn-soft btn-block" data-wiki-guide="kingdomhearts" style="margin-top:9px">Open the Kingdom Hearts guide</button>` : ''}
      ${el.legendGroup ? `<button class="btn btn-soft btn-block" data-wiki-guide="legends" style="margin-top:9px">Open the crossover legends guide</button>` : ''}
      ${VIDEO_GAME_LEGEND_GROUPS.includes(el.legendGroup) ? `<button class="btn btn-soft btn-block" data-wiki-guide="videogames" style="margin-top:9px">Open the video games &amp; FNAF guide</button>` : ''}
      ${el.catalogGroup ? `<button class="btn btn-soft btn-block" data-wiki-guide="${catalogGuideForGroup(el.catalogGroup)}" style="margin-top:9px">Open the ${esc(CATALOG_GROUPS[el.catalogGroup].label)} guide</button>` : ''}
      ${secret ? `<button class="btn btn-soft btn-block" data-wiki-vault style="margin-top:9px">Open the Secret Vault</button>` : ''}
      ${isExoticSpecies(key) ? `<button class="btn btn-soft btn-block" data-wiki-guide="hollowexotics" style="margin-top:9px">Open the Hollow exotics guide</button>` : ''}
      <h3>Care notes</h3>
      <ul class="wiki-list">
        <li>Keep its favourite food in the pantry: <b>${esc(el.likes)}</b>.</li>
        <li>Place it in a matching habitat for the full XP bonus.</li>
        <li>Its gene power is always active while it lives in your Hollow.</li>
      </ul>
      <div class="wiki-article-actions">
        ${secret || master ? '' : `<button class="btn btn-soft btn-block" data-wiki-nest>Find ${article(el.name)} ${esc(el.name)} egg in the Nest</button>`}
      </div>
      <div class="wiki-footnote">Species entry #${String(entry).padStart(3, '0')} of ${ELEMENT_KEYS.length} · Sprite Hollow field notes</div>
    </div>`,
    onMount: (sheet, close) => {
      sheet.querySelectorAll('[data-wiki-guide]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const next = btn.dataset.wikiGuide;
          close();
          setTimeout(() => openWikiGuide(next), 30);
        });
      });
      sheet.querySelectorAll('[data-wiki-type]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const next = btn.dataset.wikiType;
          close();
          setTimeout(() => openWikiArticle(next), 30);
        });
      });
      sheet.querySelectorAll('[data-wiki-action="bonds"]').forEach((btn) => {
        btn.addEventListener('click', () => { close(); setTimeout(() => openBondCodex(), 160); });
      });
      sheet.querySelectorAll('[data-world-evo-open]').forEach((btn) => {
        btn.addEventListener('click', () => { close(); setTimeout(() => openWorldEvolutionAtlas(), 160); });
      });
      sheet.querySelectorAll('[data-world-evo-env]').forEach((btn) => {
        btn.addEventListener('click', () => { close(); setTimeout(() => openWorldEvolutionAtlas({ environment: btn.dataset.worldEvoEnv }), 160); });
      });
      sheet.querySelectorAll('[data-biome-travel]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.biomeTravel;
          Actions.setTheme({ scene: key });
          close();
          App.refresh();
          toast(`${SCENES[key].emoji} ${SCENES[key].name} · type biome active.`, '🧭');
        });
      });
      sheet.querySelectorAll('[data-wiki-breed]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const next = btn.dataset.wikiBreed;
          close();
          setTimeout(() => openBreedingEntry(next), 30);
        });
      });
      sheet.querySelector('[data-breeding-open]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openBreedingCodex(key), 30);
      });
      sheet.querySelector('[data-wiki-nest]')?.addEventListener('click', () => {
        close();
        App.go('nest');
      });
      sheet.querySelector('[data-wiki-vault]')?.addEventListener('click', () => {
        close();
        setTimeout(() => openSecretVault(), 30);
      });
    },
  });
}

function wikiScreen(root) {
  let query = '';
  let limit = 18;
  const all = ELEMENT_KEYS.slice().sort((a, b) => ELEMENTS[a].name.localeCompare(ELEMENTS[b].name));
  const featuredLit = {
    id: 'wiki-featured-litladybear', element: 'litladybear', breed: 'puff', stage: 'sprite',
    pattern: 'plain', palette: 'native', accessory: 'none', name: 'LIT-LadyBear', level: 20, size: 'standard',
  };

  root.innerHTML = `
    <div class="screen-head">
      <div><div class="eyebrow">Spritepedia</div><h1>The Sprite Wiki</h1><p>Species files, habitats, and the rules of the Hollow.</p></div>
      <button class="icon-btn" data-wiki-back aria-label="Back to type encyclopedia" title="Back to type encyclopedia">${icon('arrow')}</button>
    </div>
    <div class="wiki-feature" data-wiki-feature>
      <div class="wf-copy">
        <div class="wiki-tag">New Hollow exotic</div>
        <h2>LIT-LadyBear</h2>
        <p>Tiger-striped, gold-eyed, and impossible to ignore. Meet the fourth one-of-one Hollow exotic.</p>
        <button class="btn btn-sm btn-gold" data-wiki-type="litladybear">Read the species file</button>
      </div>
      <div class="wf-art">${spriteSVG(featuredLit, { expr: 'angry' })}</div>
    </div>
    <button class="roster-launch" data-open-roster>
      <span class="rl-icon">🧭</span>
      <span class="rl-copy"><b>Roster browser · ${PONY_TOTAL + CARE_BEAR_TOTAL + TV_LEGACY_TOTAL + KH_TOTAL + NETFLIX_TOTAL}</b><span>Filter ponies, Care Bears, TV shows, Netflix shows, and Keyblade worlds by group, with owned progress.</span></span>
      <span class="rl-arrow">›</span>
    </button>
    <div class="section-title" style="margin-top:12px"><h2>Collection waves</h2><span data-wiki-waves-count></span></div>
    <div class="card" style="padding:10px;display:grid;gap:7px" data-wiki-waves></div>
    <p class="tiny muted" style="text-align:center;margin:6px 4px 0">Counts are read live from the game data, so every new sprite wave appears here automatically.</p>
    <div class="type-tools" style="margin-top:10px">
      <input class="type-search" type="search" data-wiki-search placeholder="Search species, traits, or guides…" aria-label="Search the Sprite Wiki" autocomplete="off">
    </div>
    <div class="wiki-shortcuts" aria-label="Wiki quick jumps">
      <button class="chip" data-wiki-guide="cartoonworlds">📺 Cartoons</button>
      <button class="chip" data-wiki-guide="comicworlds">💥 Comics &amp; Disney</button>
      <button class="chip" data-wiki-guide="gamegenres">🕹️ Game genres</button>
      <button class="chip" data-wiki-guide="worldtypes">🌍 World types</button>
      <button class="chip" data-wiki-guide="worldwave">🌏 Movies &amp; anime</button>
      <button class="chip" data-wiki-guide="bonds">💞 Bonds</button>
      <button class="chip" data-wiki-guide="worldevolution">🧬 World evolution</button>
      <button class="chip" data-wiki-guide="vault">🔐 Vault</button>
      <button class="chip" data-wiki-guide="rebirth">🌱 Rebirth</button>
      <button class="chip" data-wiki-guide="multiversewave">🌀 Multiverse</button>
      <button class="chip" data-wiki-action="breeder">🧬 Breeder</button>
      <button class="chip" data-wiki-type="shortcut">⚡ Shortcut</button>
    </div>
    <div data-wiki-guides-wrap>
      <div class="section-title" style="margin-top:4px"><h2>Guides</h2><span>how the Hollow works</span></div>
      <div class="wiki-guide-grid" data-wiki-guides></div>
    </div>
    <div class="section-title"><h2>Species files</h2><span data-wiki-count></span></div>
    <div class="wiki-species-grid" data-wiki-species></div>
    <p class="tiny muted" data-wiki-empty hidden style="text-align:center;margin:14px 4px">No species or guide matches that search.</p>
    <button class="btn btn-soft btn-block" data-wiki-more hidden style="margin-top:12px"></button>
    <div class="card" style="padding:12px;margin-top:14px;font-size:11px;line-height:1.6;color:var(--muted)">
      <b style="color:var(--text)">About the wiki</b><br>
      Species files are generated from the same live data as the field guide and type eggs. Habitat bonuses, gene powers, and hybrids here are the values used by the game.
    </div>`;

  const guidesWrap = root.querySelector('[data-wiki-guides-wrap]');
  const guideGrid = root.querySelector('[data-wiki-guides]');
  const speciesGrid = root.querySelector('[data-wiki-species]');
  const empty = root.querySelector('[data-wiki-empty]');
  const more = root.querySelector('[data-wiki-more]');
  const count = root.querySelector('[data-wiki-count]');
  const search = root.querySelector('[data-wiki-search]');
  const feature = root.querySelector('[data-wiki-feature]');
  const waveBox = root.querySelector('[data-wiki-waves]');
  const waveCount = root.querySelector('[data-wiki-waves-count]');
  if (waveBox) waveBox.innerHTML = collectionWaveRowsHTML();
  if (waveCount) waveCount.textContent = `${collectionWaves().length} waves · ${collectionWaveTotal().toLocaleString()} sprites`;

  const bind = (node) => {
    node.querySelectorAll('[data-wiki-guide]').forEach((btn) => {
      btn.addEventListener('click', () => openWikiGuide(btn.dataset.wikiGuide));
    });
    node.querySelectorAll('[data-wiki-type]').forEach((btn) => {
      btn.addEventListener('click', () => openWikiArticle(btn.dataset.wikiType));
    });
  };

  root.querySelector('[data-wiki-back]').addEventListener('click', () => App.go('codex'));
  root.querySelector('[data-open-roster]').addEventListener('click', () => {
    App.rosterReturn = 'wiki';
    App.go('roster');
  });
  root.querySelectorAll('[data-wiki-action]').forEach((btn) => btn.addEventListener('click', () => {
    if (btn.dataset.wikiAction === 'breeder') openBreedingCodex();
    else if (btn.dataset.wikiAction === 'vault') openSecretVault();
    else if (btn.dataset.wikiAction === 'bonds') openBondCodex();
    else if (btn.dataset.wikiAction === 'worldevolution') openWorldEvolutionAtlas();
  }));
  bind(root.querySelector('[data-wiki-feature]'));
  bind(root.querySelector('.wiki-shortcuts'));
  bind(guideGrid);

  function searchText(key) {
    const el = ELEMENTS[key];
    const publisher = el.heroPublisher ? HERO_PUBLISHER_META[el.heroPublisher].label : '';
    const role = el.heroRole ? HERO_ROLE_META[el.heroRole].label : '';
    const disney = el.disneyGroup ? `${DISNEY_GROUPS[el.disneyGroup]?.label || ''} Disney` : '';
    const careBears = el.careBearGroup ? `${CARE_BEAR_GROUPS[el.careBearGroup]?.label || ''} Care Bears Cousins` : '';
    const fortniteLegacy = el.fortniteLegacy ? `Fortnite legacy ${el.fortniteSeason || ''} ${el.fortniteLegacyGroup || ''}` : '';
    const wwe = el.wwe ? `WWE wrestling ${el.wweNickname || ''} ${el.wweGroup || ''}` : '';
    const pony = el.pony ? `My Little Pony pony ${el.ponyType || ''} ${el.ponyGroup || ''}` : '';
    const tv = el.tvLegacy ? `TV television ${el.tvShow || ''} ${el.tvLegacyGroup || ''}` : '';
    const netflix = el.netflix ? `Netflix animation ${NETFLIX_WINGS[el.netflixWing]?.label || ''} ${el.netflixShow || ''} ${el.netflixArticle || ''}` : '';
    const realm = el.realmWave ? `${el.realmGroup || ''} ${el.realmRole || ''} realm horror light darkness` : '';
    const kingdomHearts = el.kingdomHearts ? `Kingdom Hearts Keyblade ${el.khWorld || ''} ${el.khGroup || ''}` : '';
    const legend = el.legendGroup ? `${el.legendGroup} ${LEGEND_GROUPS[el.legendGroup]?.label || ''} crossover legends` : '';
    const catalog = el.catalogGroup && typeof CATALOG_GROUPS !== 'undefined' ? `${el.catalogGroup} ${CATALOG_GROUPS[el.catalogGroup]?.label || ''}` : '';
    const parentTypes = typeof parentTypesForSpecies === 'function' ? parentTypesForSpecies(key).join(' ') : '';
    const world = el.worldVariant ? `${el.worldRegion} ${el.variantType} world variant` : '';
    const genre = el.gameGenre ? `${el.gameGenre} video game genre` : '';
    const prismatic = el.alwaysShiny ? 'prismatic always shiny multiverse' : '';
    const exotic = isExoticSpecies(key) ? 'exotic signature' : '';
    const apex = RARITY_APEX_KEYS.join(' ');
    const special = el.ahs ? 'American Horror Story AHS horror anthology' : el.fairy ? 'fairy pixie hollow tinker bell disney fairies neverland dust periwinkle bell winter fairy snow frost tooth fairy' : el.neverland ? 'peter pan neverland wendy lost boys pirate hook mermaid crocodile' : el.adultswim ? 'adult swim cartoon network late night rick and morty aqua teen boondocks samurai jack metalocalypse smiling friends' : el.babyloons ? 'baby looney tunes nursery bugs bunny daffy tweety sylvester lola taz porky foghorn pepe toddler' : el.admin ? 'admin event staff weekend' : el.eventOnly ? 'special event weekend sprite' : '';
    return `${el.name} ${key} ${el.trait} ${el.blurb} ${publisher} ${role} ${disney} ${careBears} ${fortniteLegacy} ${wwe} ${pony} ${tv} ${netflix} ${realm} ${kingdomHearts} ${legend} ${catalog} ${parentTypes} ${world} ${genre} ${prismatic} ${exotic} ${apex} ${special} bond codex evolution ${GENE_POWERS[key]?.name || ''} ${wikiHabitats(key).map((k) => SCENES[k].name).join(' ')}`.toLowerCase();
  }

  function paint() {
    const q = query.trim().toLowerCase();
    const guides = WIKI_GUIDES.filter((g) => !q || `${g.title} ${g.summary}`.toLowerCase().includes(q));
    const species = all.filter((key) => !q || searchText(key).includes(q));
    const shown = species.slice(0, limit);

    feature.hidden = !!q;
    guidesWrap.hidden = guides.length === 0;
    guideGrid.innerHTML = guides.map((g) => `<button class="wiki-guide" data-wiki-guide="${g.id}">
      <span class="wg-icon">${g.icon}</span>
      <span class="wg-copy"><b>${g.title}</b><span>${g.summary}</span></span>
    </button>`).join('');
    bind(guideGrid);

    speciesGrid.innerHTML = shown.map((key) => {
      const el = ELEMENTS[key];
      const tier = TYPE_EGG_RARITIES[typeEggRarity(key)];
      const sample = {
        id: `wiki-card-${key}`, element: key, breed: 'puff', stage: 'sprite',
        pattern: 'plain', palette: 'native', accessory: 'none', name: el.name, level: 3, size: 'standard',
      };
      const badge = key === MASTER_CHEAT_SPECIES ? 'MASTER' : isSecretSpecies(key) ? 'SECRET' : el.alwaysShiny ? 'PRISMATIC' : isExoticSpecies(key) ? 'EXOTIC' : tier.name;
      return `<button class="wiki-species-card" data-wiki-type="${key}">
        <span class="ws-art">${spriteSVG(sample, { expr: 'happy' })}</span>
        <span class="ws-copy"><b>${esc(el.name)}</b><span class="ws-rarity" style="color:${tier.color}">${badge}</span><span class="ws-trait">${esc(el.catalogType || el.trait.split('—')[0].trim())}</span></span>
      </button>`;
    }).join('');
    bind(speciesGrid);

    count.textContent = q ? `${species.length} of ${all.length}` : `${all.length} species`;
    empty.hidden = species.length !== 0;
    empty.textContent = guides.length
      ? 'No species match — the guide results above do.'
      : 'No species or guide matches that search.';
    const left = species.length - shown.length;
    more.hidden = left <= 0;
    more.textContent = left > 0 ? `Show ${Math.min(18, left)} more species · ${left} left` : '';
  }

  search.addEventListener('input', () => {
    query = search.value;
    limit = 18;
    paint();
  });
  more.addEventListener('click', () => {
    limit += 18;
    paint();
  });

  paint();
}
