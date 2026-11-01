/* Trick or Treat costume wave: Halloween costumes for 26 Hollow favourites.
   Each entry is its own collectible species so it gets a full type egg, tier,
   gene power, Titan name, habitat, and signature costume overlay. */

const TRICK_OR_TREAT_KINDS = {
  trickjonesy: {
    name: 'Trick or Treat Jonesy', base: 'jonesy',
    trait: 'Costumed — has a candy bucket and a plan for every porch.',
    blurb: 'Jonesy in a pumpkin-orange costume, carrying a bucket that is already half full.',
    greeting: 'Trick or treat! I brought a backup bucket. Just in case.',
  },
  trickadventure: {
    name: 'Trick or Treat Adventure', base: 'adventure',
    trait: 'Costumed — treats every doorstep like an uncharted ruin.',
    blurb: 'A tiny explorer in a candy-striped costume with a compass and a very full satchel.',
    greeting: 'The map says there is candy three houses down. Trust the map.',
  },
  trickbush: {
    name: 'Trick or Treat Bush', base: 'bushranger',
    trait: 'Costumed — the best hiding spot is a costume made of leaves.',
    blurb: 'A leafy ranger dressed as a walking hedge, with a candy bucket tucked in the branches.',
    greeting: 'You cannot see me. I am a bush. A very generous bush.',
  },
  tricksonic: {
    name: 'Trick or Treat Sonic', base: 'sonic',
    trait: 'Costumed — trick-or-treats at superspeed and still checks every porch.',
    blurb: 'A blue blur in a bat-wing costume, collecting candy before the porch light flickers.',
    greeting: 'Gotta go! But first, one more house. And one more. And one more.',
  },
  tricktails: {
    name: 'Trick or Treat Tails', base: 'tails',
    trait: 'Costumed — built a candy bucket with twin compartments and a lid.',
    blurb: 'A twin-tailed fox in a little inventor costume, with a bucket that opens on both sides.',
    greeting: 'I upgraded my bucket. It has a sorting system. Obviously.',
  },
  trickshadow: {
    name: 'Trick or Treat Shadow', base: 'shadow',
    trait: 'Costumed — only knocks on the spookiest doors.',
    blurb: 'A dark hedgehog in a vampire cape, pretending the whole street is beneath him.',
    greeting: 'I am not here for candy. I am here for the aesthetic. Also candy.',
  },
  trickeightbit: {
    name: 'Trick or Treat 8-Bit', base: 'blaster',
    trait: 'Costumed — every piece of candy is worth exactly ten points.',
    blurb: 'A pixel pal in a glowing arcade costume with a bucket shaped like a high score.',
    greeting: 'New high score: eleven pieces of candy. The night is young.',
  },
  trickjackrabbit: {
    name: 'Trick or Treat Jackrabbit', base: 'jazz',
    trait: 'Costumed — arrives with a soundtrack and leaves with the good candy.',
    blurb: 'A green hare in a jazzy vampire costume, ears poking through a tiny top hat.',
    greeting: 'Every porch is a stage. Every candy is an encore.',
  },
  trickcrown: {
    name: 'Trick or Treat Crown', base: 'crown',
    trait: 'Costumed — demands candy with royal etiquette.',
    blurb: 'A living crown in a tiny phantom sheet, floating from door to door with a jeweled bucket.',
    greeting: 'You may address the candy. It is the only royalty here tonight.',
  },
  trickkillswitch: {
    name: 'Trick or Treat Killswitch', base: 'killswitch',
    trait: 'Costumed — one knock and the porch light changes color.',
    blurb: 'A red reticle in a glitchy ghost costume, with a bucket that blinks when it is full.',
    greeting: 'One setting tonight: maximum candy. Do not touch the switch.',
  },
  trickklombo: {
    name: 'Trick or Treat Klombo', base: 'klombo',
    trait: 'Costumed — big feet, bigger bucket, gentlest knock.',
    blurb: 'A gentle dino in a friendly monster costume, with a candy bucket the size of a small pond.',
    greeting: 'I stomped a path to every porch. The candy is safe. Mostly.',
  },
  trickovershield: {
    name: 'Trick or Treat Overshield', base: 'overshield',
    trait: 'Costumed — protects the candy with a shimmering bubble.',
    blurb: 'A little guardian in a ghostly shield costume, carrying a bucket that nothing can spill.',
    greeting: 'Your candy is safe with me. I checked the perimeter. Twice.',
  },
  trickpond: {
    name: 'Trick or Treat Pond', base: 'pond',
    trait: 'Costumed — a lily-pad ghost with a very calm trick-or-treat route.',
    blurb: 'A still pond in a floating sheet, with candy bobbing gently on the surface.',
    greeting: 'Ripple if you want candy. I will wait. I am very good at waiting.',
  },
  trickxray: {
    name: 'Trick or Treat X-Ray', base: 'ghost',
    trait: 'Costumed — the costume shows exactly what is inside: candy.',
    blurb: 'A glowing ghost in an X-ray costume, with a skeleton of candy wrappers and a bright bucket.',
    greeting: 'Look closer. No, closer. See? All candy. Every bone is candy.',
  },
  trickonigiri: {
    name: 'Trick or Treat Onigiri', base: 'onigiri',
    trait: 'Costumed — dressed as a tiny nori ghost.',
    blurb: 'A warm rice ball in a seaweed ghost costume, carrying a bucket of sweet rice candy.',
    greeting: 'I am the snack and the costume. Please do not eat the costume.',
  },
  trickstormscout: {
    name: 'Trick or Treat Storm Scout', base: 'stormscout',
    trait: 'Costumed — brings a personal fog machine to every porch.',
    blurb: 'A hooded scout in a storm-cloud costume, with a candy bucket that rumbles softly.',
    greeting: 'Forecast says candy. I checked the radar. It is very accurate.',
  },
  trickblinky: {
    name: 'Trick or Treat Blinky', base: 'blinky',
    trait: 'Costumed — blinks out at exactly the wrong moment.',
    blurb: 'A pink ghost in a pixel-bat costume, flickering between porches with a bucket of candy.',
    greeting: 'Did you see me? I was there. Then I was at the next house.',
  },
  trickdumpster: {
    name: 'Trick or Treat Dumpster Dive', base: 'dumpster',
    trait: 'Costumed — finds the best candy in the last place anyone looks.',
    blurb: 'A raccoon in a trash-can ghost costume, with a bucket that has clearly been recycled.',
    greeting: 'One sprite’s discarded candy is my whole Halloween.',
  },
  trickbirthday: {
    name: 'Trick or Treat Birthday', base: 'birthday',
    trait: 'Costumed — every porch is a birthday party now.',
    blurb: 'A confetti-covered cake in a little party ghost costume, with a bucket full of candles.',
    greeting: 'Surprise! It is my birthday again. I checked. It is always my birthday.',
  },
  trickcrash: {
    name: 'Trick or Treat Crash Bandicoot', base: 'crash',
    trait: 'Costumed — spins through the candy route at top speed.',
    blurb: 'An orange bandicoot in a wild jungle costume, with a bucket that has survived three wipeouts.',
    greeting: 'I spun into a porch. The candy survived. I am a hero.',
  },
  trickmorgana: {
    name: 'Trick or Treat Morgana', base: 'morgana',
    trait: 'Costumed — a panther in a witch’s hat, judging every candy bowl.',
    blurb: 'A dusk-colored feline in a tiny witch costume, with a heart-tipped tail and a velvet bucket.',
    greeting: 'You may offer the candy. I may allow it. We will see.',
  },
  trickspookydash: {
    name: 'Trick or Treat Spooky Dash', base: 'spookydash',
    trait: 'Costumed — a ghost dressed as a ghost. Deeply meta.',
    blurb: 'A speedy specter in a second, slightly spookier sheet, leaving a trail of candy wrappers.',
    greeting: 'Boo! Sorry. Habit. Also, race you to the next porch.',
  },
  trickdeer: {
    name: 'Trick or Treat The Deer', base: 'deer',
    trait: 'Costumed — wears the forest itself as a costume.',
    blurb: 'A forest monarch in a moss-and-moonlight costume, with antlers full of tiny candy lights.',
    greeting: 'The forest says trick or treat. I translated. It wants candy.',
  },
  trickvampire: {
    name: 'Trick or Treat Vampire', base: 'vampire',
    trait: 'Costumed — dressed as a vampire, which is not much of a stretch.',
    blurb: 'A tiny count in an even higher collar, politely asking for candy instead of necks.',
    greeting: 'I don’t bite. Unless it is a candy. Then I might.',
  },
  trickhoney: {
    name: 'Trick or Treat Honey', base: 'honeypot',
    trait: 'Costumed — a honey pot dressed as a bee, which is confusing for everyone.',
    blurb: 'A golden honey pot in a bee costume, with a bucket that is somehow also sticky.',
    greeting: 'I am the bee. The honey is the costume. It is very method.',
  },
  trickonewish: {
    name: 'Trick or Treat One Wish Willow', base: 'onewish',
    trait: 'Costumed — grants one candy wish per porch.',
    blurb: 'A mythic willow in a starry ghost costume, with a single candy star glowing above its bucket.',
    greeting: 'Make it a good one. I have exactly one candy wish left.',
  },
};

const TRICK_OR_TREAT_KEYS = Object.keys(TRICK_OR_TREAT_KINDS);

Object.entries(TRICK_OR_TREAT_KINDS).forEach(([key, meta]) => {
  const base = meta.base;
  const baseEl = ELEMENTS[base] || ELEMENTS.bloom;
  const baseGene = GENE_POWERS[base] || { name: 'Treat', desc: 'A sweet little bonus.', effect: { xp: 1.05 } };
  const basePrice = TYPE_EGG_BASE_PRICE[base] || 110;
  const baseHomes = Object.keys(SCENES).filter((scene) => SCENES[scene].species?.includes(base)).slice(0, 2);

  ELEMENTS[key] = {
    name: meta.name,
    primary: baseEl.primary,
    light: baseEl.light,
    deep: baseEl.deep,
    accent: baseEl.accent,
    trait: meta.trait,
    blurb: meta.blurb,
    greeting: meta.greeting,
    likes: baseEl.likes || 'Star Candy',
    trickOrTreat: true,
    trickBase: base,
    catalogType: 'Trick or Treat costume',
  };

  GENE_POWERS[key] = {
    name: `Trick: ${baseGene.name || 'Treat'}`,
    icon: '🎃',
    desc: `${baseGene.desc || 'A sweet little bonus.'} The costume adds +10% XP.`,
    effect: { ...(baseGene.effect || {}), xp: (baseGene.effect?.xp || 1) * 1.1 },
  };

  TITAN_NAMES[key] = `Halloween ${baseEl.name || meta.name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = basePrice;
  TYPE_EGG_PRICE[key] = discountedEggPrice(basePrice);
  NAME_START[key] = ['Trick', 'Treat', 'Boo', 'Candy', 'Pumpkin', 'Hallow', 'Sweet', 'Spooky'];
  HYBRID_NAMES[`${key}+pumpkin`] = `Pumpkin ${baseEl.name || meta.name}`;

  [base, 'night', 'sugar'].filter(Boolean).concat(baseHomes).forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });

  ELEMENT_KEYS.push(key);
  if (typeof TYPE_EGG_SPECIES !== 'undefined' && !TYPE_EGG_SPECIES.includes(key)) TYPE_EGG_SPECIES.push(key);
  if (typeof HOLIDAYS !== 'undefined' && HOLIDAYS.halloween?.eggs && !HOLIDAYS.halloween.eggs.includes(key)) {
    HOLIDAYS.halloween.eggs.push(key);
  }
});

if (typeof registerCollectionWave === 'function') {
  registerCollectionWave({
    key: 'trickortreat',
    label: 'Trick or Treat costumes',
    icon: '🎃',
    group: 'Events',
    note: 'Twenty-six Halloween costume variants with their own type eggs, genes, and habitat homes.',
    count: () => TRICK_OR_TREAT_KEYS.length,
  });
}
