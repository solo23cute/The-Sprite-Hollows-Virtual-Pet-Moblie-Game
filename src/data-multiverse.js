/* Multiverse wave: metahumans, robots, aliens, and the Multiversus roster.
   Every metahuman, robot, and alien is prismatic: shiny from birth. */

const MULTIVERSE_GROUPS = {
  metahumans: {
    label: 'Meta-humans', icon: '🧬', guide: 'multiversewave', parentType: 'Meta-humans',
    accent: '#ff7ac8', price: 225, likes: 'Nova Nectar', homes: ['neon', 'aurora', 'crystal'],
    blurb: 'A multiversal human with an impossible power and a very human heart.',
    greeting: 'The multiverse has a lot of versions of me. I am the one with snacks.',
    hybridPrefix: 'Meta', motifs: ['fist', 'bolt', 'mind', 'star', 'shapeshift', 'shield', 'wing', 'armor'],
    alwaysShiny: true,
  },
  robots: {
    label: 'Robots', icon: '🤖', guide: 'multiversewave', parentType: 'Robots',
    accent: '#8be9ff', price: 220, likes: 'Volt Fruit', homes: ['neon', 'crystal', 'ember'],
    blurb: 'A self-aware machine from a neighboring timeline, running on curiosity and charge.',
    greeting: 'I calculated every possible greeting. This one had the best chance of snacks.',
    hybridPrefix: 'Mech', motifs: ['metal', 'tech', 'bolt', 'shield', 'armor', 'star', 'eye', 'time'],
    alwaysShiny: true,
  },
  aliens: {
    label: 'Aliens', icon: '👽', guide: 'multiversewave', parentType: 'Aliens',
    accent: '#b69cff', price: 230, likes: 'Stardust Soup', homes: ['aurora', 'night', 'dream'],
    blurb: 'A visitor from another world with a strange language and a familiar wish to belong.',
    greeting: 'Your sky is on the wrong side. I love it here.',
    hybridPrefix: 'Xeno', motifs: ['cosmic', 'gem', 'eye', 'claw', 'ant', 'wing', 'storm', 'mind'],
    alwaysShiny: true,
  },
  multiversus: {
    label: 'Multiversus', icon: '🌀', guide: 'multiversewave', parentType: 'Multiversus',
    accent: '#ffd166', price: 240, likes: 'Portal Pop', homes: ['neon', 'aurora', 'grove'],
    blurb: 'A crossover fighter pulled through the portal, ready for a rematch and a snack.',
    greeting: 'Wrong universe, right attitude.',
    hybridPrefix: 'Portal', motifs: ['mask', 'star', 'shield', 'magic', 'fist', 'blade', 'tech', 'cosmic'],
  },
};

const MULTIVERSE_DEFS = {
  metahumans: [
    ['mh_titanbrute', 'Titan Brute', 'Strength · Vanguard'], ['mh_granitefist', 'Granite Fist', 'Strength · Colossus'], ['mh_atlasbrawler', 'Atlas Brawler', 'Strength · Guardian'],
    ['mh_quickstep', 'Quickstep', 'Speed · Scout'], ['mh_neondash', 'Neon Dash', 'Speed · Courier'], ['mh_velocityace', 'Velocity Ace', 'Speed · Champion'],
    ['mh_mindweaver', 'Mindweaver', 'Mind · Oracle'], ['mh_oraclepulse', 'Oracle Pulse', 'Mind · Seer'], ['mh_dreamwire', 'Dreamwire', 'Mind · Dreamer'],
    ['mh_solarflare', 'Solar Flare', 'Energy · Beacon'], ['mh_novaspark', 'Nova Spark', 'Energy · Blaster'], ['mh_prismbeam', 'Prism Beam', 'Energy · Prism'],
    ['mh_mimic', 'Mimic', 'Shift · Trickster'], ['mh_mirrorform', 'Mirrorform', 'Shift · Echo'], ['mh_chimerashift', 'Chimera Shift', 'Shift · Wildcard'],
    ['mh_secondwind', 'Second Wind', 'Regeneration · Healer'], ['mh_greenblood', 'Greenblood', 'Regeneration · Survivor'], ['mh_phoenixcell', 'Phoenix Cell', 'Regeneration · Phoenix'],
  ],
  robots: [
    ['rb_servoscout', 'Servo Scout', 'Utility · Scout'], ['rb_chromesentinel', 'Chrome Sentinel', 'Utility · Guard'], ['rb_gearheart', 'Gearheart', 'Utility · Mechanic'],
    ['rb_arcdrone', 'Arc Drone', 'Energy · Flier'], ['rb_pulseunit', 'Pulse Unit', 'Energy · Relay'], ['rb_circuitwing', 'Circuit Wing', 'Energy · Wing'],
    ['rb_mechagardener', 'Mecha Gardener', 'Nature · Cultivator'], ['rb_terrabot', 'Terra-Bot', 'Nature · Terraformer'], ['rb_bloomcore', 'Bloom Core', 'Nature · Bloom'],
    ['rb_quantumandroid', 'Quantum Android', 'Quantum · Observer'], ['rb_nullframe', 'Null Frame', 'Quantum · Ghost'], ['rb_echoshell', 'Echo Shell', 'Quantum · Echo'],
    ['rb_forgeunit', 'Forge Unit', 'Forge · Builder'], ['rb_ironwarden', 'Iron Warden', 'Forge · Warden'], ['rb_anvilai', 'Anvil AI', 'Forge · Smith'],
    ['rb_starprobe', 'Star Probe', 'Space · Explorer'], ['rb_orbitunit', 'Orbit Unit', 'Space · Satellite'], ['rb_cometrelay', 'Comet Relay', 'Space · Messenger'],
  ],
  aliens: [
    ['al_zetawanderer', 'Zeta Wanderer', 'Void · Traveler'], ['al_nebulanomad', 'Nebula Nomad', 'Void · Drifter'], ['al_orbitseeker', 'Orbit Seeker', 'Void · Seeker'],
    ['al_crystalxenite', 'Crystal Xenite', 'Crystal · Resonator'], ['al_prismbeing', 'Prism Being', 'Crystal · Refractor'], ['al_facetwalker', 'Facet Walker', 'Crystal · Geode'],
    ['al_tentacleoracle', 'Tentacle Oracle', 'Deep · Prophet'], ['al_deepsignal', 'Deep Signal', 'Deep · Listener'], ['al_abysscradle', 'Abyss Cradle', 'Deep · Keeper'],
    ['al_hiveherald', 'Hive Herald', 'Hive · Envoy'], ['al_dronemind', 'Drone Mind', 'Hive · Network'], ['al_chitinchoir', 'Chitin Choir', 'Hive · Singer'],
    ['al_plasmasprite', 'Plasma Sprite', 'Plasma · Spark'], ['al_solarwisp', 'Solar Wisp', 'Plasma · Sunling'], ['al_flarevisitor', 'Flare Visitor', 'Plasma · Flare'],
    ['al_voidlistener', 'Void Listener', 'Void · Watcher'], ['al_darkmatter', 'Dark Matter', 'Void · Shadow'], ['al_eventhorizon', 'Event Horizon', 'Void · Singularity'],
  ],
  multiversus: [
    ['mvs_batman', 'Batman', 'Bruiser'], ['mvs_superman', 'Superman', 'Tank'], ['mvs_wonderwoman', 'Wonder Woman', 'Bruiser'],
    ['mvs_harley', 'Harley Quinn', 'Assassin'], ['mvs_shaggy', 'Shaggy', 'Bruiser'], ['mvs_bugs', 'Bugs Bunny', 'Mage'],
    ['mvs_arya', 'Arya Stark', 'Assassin'], ['mvs_jake', 'Jake the Dog', 'Bruiser'], ['mvs_finn', 'Finn the Human', 'Assassin'],
    ['mvs_steven', 'Steven Universe', 'Support'], ['mvs_garnet', 'Garnet', 'Bruiser'], ['mvs_tomjerry', 'Tom & Jerry', 'Mage'],
    ['mvs_irongiant', 'Iron Giant', 'Tank'], ['mvs_lebron', 'LeBron James', 'Bruiser'], ['mvs_rick', 'Rick Sanchez', 'Mage'],
    ['mvs_morty', 'Morty Smith', 'Assassin'], ['mvs_gizmo', 'Gizmo', 'Support'], ['mvs_stripe', 'Stripe', 'Assassin'],
    ['mvs_blackadam', 'Black Adam', 'Tank'], ['mvs_joker', 'The Joker', 'Mage'], ['mvs_marceline', 'Marceline', 'Assassin'],
    ['mvs_powerpuff', 'Powerpuff Girls', 'Bruiser'], ['mvs_jack', 'Samurai Jack', 'Assassin'], ['mvs_beetlejuice', 'Beetlejuice', 'Mage'],
  ],
};

(function registerMultiverse() {
  const groupKeys = Object.keys(MULTIVERSE_GROUPS);
  const startIndex = Object.keys(CATALOG_GROUPS).length;
  groupKeys.forEach((groupKey, groupIndex) => {
    const group = MULTIVERSE_GROUPS[groupKey];
    const entries = MULTIVERSE_DEFS[groupKey] || [];
    const newKeys = [];
    CATALOG_GROUPS[groupKey] = group;
    CATALOG_BY_GROUP[groupKey] = [];
    CATALOG_GROUP_KEYS.push(groupKey);
    entries.forEach((row, index) => {
      const [key, name, tag] = row;
      if (!key || !name || ELEMENTS[key]) return;
      const palette = CATALOG_PALETTES[(startIndex + groupIndex * 4 + index) % CATALOG_PALETTES.length];
      const [primary, light, deep, accent] = palette;
      const gene = CATALOG_GENE_POOL[(startIndex + groupIndex * 3 + index) % CATALOG_GENE_POOL.length];
      ELEMENTS[key] = {
        name, primary, light, deep, accent,
        trait: `${tag} — ${group.alwaysShiny ? 'Prismatic — always shiny. ' : ''}${group.blurb.split('.')[0].toLowerCase()}.`,
        blurb: `${name} is a ${tag.toLowerCase()} signature from ${group.label}. ${group.blurb}`,
        greeting: group.greeting, likes: group.likes,
        catalogGroup: groupKey, catalogType: tag, catalogArt: group.motifs[index % group.motifs.length],
        parentTypes: [group.parentType],
        ...(group.alwaysShiny ? { alwaysShiny: true, prismatic: true } : {}),
      };
      GENE_POWERS[key] = gene;
      TITAN_NAMES[key] = `${name} Titan`;
      TYPE_EGG_BASE_PRICE[key] = group.price;
      TYPE_EGG_PRICE[key] = discountedEggPrice(group.price);
      NAME_START[key] = [name.split(' ')[0], ...name.split(' ').slice(1, 3), 'Ace', 'Nova'];
      group.homes.forEach((scene) => {
        if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
      });
      ELEMENT_KEYS.push(key);
      CATALOG_SPECIES.push(key);
      CATALOG_BY_GROUP[groupKey].push(key);
      newKeys.push(key);
    });
    newKeys.forEach((key, index) => {
      const next = newKeys[(index + 1) % newKeys.length];
      if (!next || next === key) return;
      const first = ELEMENTS[key].name.split(' ')[0];
      const second = ELEMENTS[next].name.split(' ')[0];
      HYBRID_NAMES[pairKey(key, next)] = `${group.hybridPrefix} ${first} & ${second}`;
    });
  });
  CATALOG_TOTAL = CATALOG_SPECIES.length;
  LONG_CATALOG_GUIDES.multiverse = groupKeys.slice();
})();
