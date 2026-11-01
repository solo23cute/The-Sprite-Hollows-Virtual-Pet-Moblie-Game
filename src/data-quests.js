/* District quests: a three-step story line for every GTA district and every
   Hollow exotic biome. Steps advance only while you are actually there, and
   each step pays coins, XP, and bond. Loaded after the biome data files. */

const BIOME_QUEST_DEFS = {
  'gta-libertycity': {
    title: 'Dockside Debts', icon: '🗽',
    steps: [
      ['Walk the rain-slick docks', 'travel', 1, 60, 0],
      ['Win 2 games under the neon', 'game', 2, 110, 40],
      ['Care for a sprite dockside twice', 'care', 2, 220, 80],
    ],
  },
  'gta-vicecity': {
    title: 'Sunset Radio', icon: '🌴',
    steps: [
      ['Watch the sun drop over Vice Beach', 'travel', 1, 60, 0],
      ['Win 2 games to that synth station', 'game', 2, 110, 40],
      ['Share a snack with a sprite twice', 'care', 2, 220, 80],
    ],
  },
  'gta-sanandreas': {
    title: 'Backroad Mile', icon: '🌵',
    steps: [
      ['Ride out to the backroads', 'travel', 1, 60, 0],
      ['Win 2 games in the dust', 'game', 2, 110, 40],
      ['Patch a sprite up twice', 'care', 2, 220, 80],
    ],
  },
  'gta-losantos': {
    title: 'Hillside Signal', icon: '🌇',
    steps: [
      ['Take the hillside overlook', 'travel', 1, 60, 0],
      ['Win 2 games above the city', 'game', 2, 110, 40],
      ['Bathe a sprite twice after the smog', 'care', 2, 220, 80],
    ],
  },
  'gta-london': {
    title: 'Fog on the Cobbles', icon: '☂️',
    steps: [
      ['Step out into the fog', 'travel', 1, 60, 0],
      ['Win 2 games in the wet', 'game', 2, 110, 40],
      ['Rub a sprite warm twice', 'care', 2, 220, 80],
    ],
  },
  'gta-chinatown': {
    title: 'Lantern Ledger', icon: '🏮',
    steps: [
      ['Slip into the lantern alleys', 'travel', 1, 60, 0],
      ['Win 2 games in the back rooms', 'game', 2, 110, 40],
      ['Feed a sprite twice from the market', 'care', 2, 220, 80],
    ],
  },
  'gta-anywhere': {
    title: 'Retro Grid Run', icon: '🚧',
    steps: [
      ['Ride the retro grid', 'travel', 1, 60, 0],
      ['Win 2 games in the future-past', 'game', 2, 110, 40],
      ['Clean up a sprite twice', 'care', 2, 220, 80],
    ],
  },
  'exotic-backstage': {
    title: 'Soundcheck', icon: '🎧',
    steps: [
      ['Get behind the stage', 'travel', 1, 60, 0],
      ['Win 2 games to the monitors', 'game', 2, 110, 40],
      ['Hype a sprite up twice', 'care', 2, 220, 80],
    ],
  },
  'exotic-supernova': {
    title: 'Red Carpet Comet', icon: '🌟',
    steps: [
      ['Walk the starlight carpet', 'travel', 1, 60, 0],
      ['Win 2 games on the comet', 'game', 2, 110, 40],
      ['Feed a sprite twice before the gala', 'care', 2, 220, 80],
    ],
  },
  'exotic-jester': {
    title: 'Card Trick', icon: '🃏',
    steps: [
      ['Follow the crooked lane', 'travel', 1, 60, 0],
      ['Win 2 games in the mirror maze', 'game', 2, 110, 40],
      ['Cheer a sprite up twice', 'care', 2, 220, 80],
    ],
  },
  'exotic-litlair': {
    title: 'Velvet Rope', icon: '🔥',
    steps: [
      ['Get past the velvet rope', 'travel', 1, 60, 0],
      ['Win 2 games in the lounge', 'game', 2, 110, 40],
      ['Bathe a sprite twice before the show', 'care', 2, 220, 80],
    ],
  },
  'exotic-rift': {
    title: 'Storm Ring', icon: '👑',
    steps: [
      ['Enter the storm ring', 'travel', 1, 60, 0],
      ['Win 2 games inside the arena', 'game', 2, 110, 40],
      ['Patch a sprite up twice', 'care', 2, 220, 80],
    ],
  },
  'exotic-grandslam': {
    title: 'Title Night', icon: '🏆',
    steps: [
      ['Walk into the coliseum', 'travel', 1, 60, 0],
      ['Win 2 games under the lights', 'game', 2, 110, 40],
      ['Rub a sprite down twice', 'care', 2, 220, 80],
    ],
  },
};

const BIOME_QUESTS = {};

Object.entries(BIOME_QUEST_DEFS).forEach(([sceneKey, def]) => {
  if (!SCENES[sceneKey]) return;
  BIOME_QUESTS[sceneKey] = {
    scene: sceneKey,
    title: def.title,
    icon: def.icon,
    steps: def.steps.map(([text, kind, need, coins, xp], index) => ({
      text, kind, need,
      reward: { coins, xp, bond: index === 2 ? 8 : 2 },
    })),
  };
});

const BIOME_QUEST_KEYS = Object.keys(BIOME_QUESTS);

function biomeQuestState(sceneKey) {
  const q = state.biomeQuests && state.biomeQuests[sceneKey];
  return q && typeof q === 'object' ? q : { step: 0, progress: 0, done: false };
}

function biomeQuestStep(sceneKey) {
  const def = BIOME_QUESTS[sceneKey];
  if (!def) return null;
  const q = biomeQuestState(sceneKey);
  if (q.done) return null;
  const step = def.steps[q.step];
  return step ? { def, q, step, index: q.step } : null;
}

function biomeQuestProgress(sceneKey) {
  const info = biomeQuestStep(sceneKey);
  if (!info) return { done: true, have: 0, need: 0 };
  return {
    done: false,
    have: Math.min(info.step.need, Math.max(0, Number(info.q.progress) || 0)),
    need: info.step.need,
  };
}
