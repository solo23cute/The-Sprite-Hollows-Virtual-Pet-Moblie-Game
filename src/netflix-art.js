/* Original procedural art for the 3.4.2 Netflix animation wing.
   Every character is drawn from the Hollow's own body plan plus a unique
   hair / prop / crest combination. No frames, screenshots, or traced art. */

const NETFLIX_ART_HAIR = {
  shag: (c) => `<path d="M33 38c1-16 12-27 27-27s27 11 28 27c-5-4-8-9-9-14-5 7-13 10-20 10-9 0-15-2-20-7 0 5-2 8-6 11Z" fill="${c.deep}" opacity=".9"/>`,
  long: (c) => `<path d="M31 42c0-18 13-31 29-31s29 13 29 31c0 15-5 28-9 39-5-13-8-27-8-39-4 4-9 6-14 6-7 0-12-3-16-7-1 14-4 27-9 40-4-11-2-24-2-39Z" fill="${c.deep}" opacity=".88"/>`,
  bob: (c) => `<path d="M32 41c0-17 12-29 28-29s28 12 28 29c0 9-3 15-7 19-2-7-6-11-10-12H49c-5 2-8 6-10 12-5-4-7-10-7-19Z" fill="${c.deep}"/>`,
  pony: (c) => `<path d="M34 39c1-15 12-26 26-26s26 11 27 26c-6-5-10-11-10-16-6 6-15 9-23 7l-12-4c1 5-3 10-8 13Z" fill="${c.deep}"/><path d="M83 31c12 1 18 11 15 24-2 9-8 16-15 21 5-9 5-18 1-26-3-6-6-11-9-14Z" fill="${c.deep}" opacity=".9"/>`,
  spiky: (c) => `<path d="M34 39 30 17l12 7 4-16 9 12 10-14 3 17 15-7-8 23Z" fill="${c.deep}" stroke="${c.accent}" stroke-width=".8"/>`,
  hood: (c) => `<path d="M29 51c0-22 13-38 31-38s31 16 31 38c-4-7-9-12-14-15-3 10-9 16-17 16s-14-6-17-16c-5 3-10 8-14 15Z" fill="${c.deep}" opacity=".9"/><path d="M43 39c4-10 11-15 17-15s13 5 17 15" fill="none" stroke="${c.accent}" stroke-width="1.3"/>`,
  helm: (c) => `<path d="M35 48c0-21 9-34 25-34s25 13 25 34v6H35Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/><path d="M42 43h36" stroke="${c.accent}" stroke-width="2"/><circle cx="60" cy="52" r="2.4" fill="${c.light}"/>`,
  horns: (c) => `<path d="M38 38c-2-12-8-19-16-21 3 9 6 16 11 22ZM82 38c2-12 8-19 16-21-3 9-6 16-11 22Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M35 42c2-14 11-23 25-23s23 9 25 23Z" fill="${c.deep}"/>`,
  ears: (c) => `<path d="M37 26c-7-8-12-7-11 2 1 7 5 12 11 15ZM83 26c7-8 12-7 11 2-1 7-5 12-11 15Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1"/><path d="M35 41c2-13 10-21 25-21s23 8 25 21Z" fill="${c.deep}"/>`,
  cap: (c) => `<path d="M33 38c2-16 12-25 27-25 16 0 26 9 28 25Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M29 38h40" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/><circle cx="80" cy="30" r="3" fill="${c.light}"/>`,
  braid: (c) => `<path d="M33 41c1-17 12-29 27-29s26 12 27 29c-5-3-9-8-10-14-5 6-11 9-17 9s-12-3-17-9c-2 6-5 11-10 14Z" fill="${c.deep}"/><path d="M85 44c8 6 9 17 4 27-3 7-8 12-14 15 4-10 5-19 4-26-1-6-2-12-4-16Z" fill="${c.accent}" opacity=".7"/><circle cx="80" cy="85" r="3" fill="${c.light}"/>`,
  bald: (c) => `<path d="M38 39c3-12 11-20 22-20s19 8 22 20" fill="none" stroke="${c.accent}" stroke-width="2" opacity=".55"/>`,
};

const NETFLIX_ART_PROPS = {
  whip: (c) => `<path d="M92 36c14 10 6 25-4 35-10 11-18 21-14 33" stroke="${c.accent}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M92 36l8-8" stroke="${c.light}" stroke-width="3"/>`,
  frost: (c) => `<g stroke="${c.light}" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M94 30v32M80 38l28 16M108 38 80 54M88 33l12 26M100 33 88 59"/></g><circle cx="94" cy="45" r="3" fill="${c.accent}"/>`,
  claws: (c) => `<path d="M86 66c10 3 16 10 19 20M89 60c8 6 12 14 13 22M83 72c9 2 15 7 18 13" stroke="${c.light}" stroke-width="2.2" stroke-linecap="round" fill="none"/><circle cx="94" cy="57" r="6" fill="${c.accent}" opacity=".45"/>`,
  doves: (c) => `<path d="M86 38c9-8 16-4 13 5-2 6-8 8-13 5ZM99 56c9-6 15-1 11 6-2 5-8 6-12 3ZM80 64c7-4 12 0 9 6-2 4-7 4-10 1Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/>`,
  flame: (c) => `<path d="M93 82c-10 0-17-8-16-18 1-8 7-13 10-22 1 8 5 10 8 16 2-5 3-10 6-14 6 8 10 14 9 22-1 10-7 16-17 16Z" fill="${c.accent}" opacity=".85"/><path d="M93 78c-5 0-8-4-7-9 1-4 4-6 6-10 1 4 3 5 5 8 2 4 0 11-4 11Z" fill="${c.light}"/>`,
  chrome: (c) => `<path d="M85 44h22v34H85Z" fill="${c.light}" opacity=".35" stroke="${c.accent}" stroke-width="1.2"/><path d="M89 52h14M89 60h14M89 68h9" stroke="${c.accent}" stroke-width="1.6"/><circle cx="96" cy="78" r="2" fill="${c.accent}"/>`,
  netrunner: (c) => `<rect x="80" y="36" width="29" height="34" rx="3" fill="${c.deep}" opacity=".65" stroke="${c.accent}" stroke-width="1.2"/><path d="M85 44h19M85 51h13M85 58h17" stroke="${c.light}" stroke-width="1.5"/><path d="M94 70v10M86 80h16" stroke="${c.accent}" stroke-width="1.6"/>`,
  shotgun: (c) => `<path d="M78 58h32v9H78Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/><path d="M110 58h6v9h-6ZM78 62h-8v5h8Z" fill="${c.light}"/><path d="M84 70h10v9H84Z" fill="${c.accent}" opacity=".7"/>`,
  blade: (c) => `<path d="M101 24 78 92" stroke="${c.light}" stroke-width="3" stroke-linecap="round"/><path d="M101 24l5-9" stroke="${c.accent}" stroke-width="3"/><path d="M79 84h15" stroke="${c.accent}" stroke-width="2.4"/>`,
  ladle: (c) => `<path d="M99 30 88 74" stroke="${c.light}" stroke-width="2.4" stroke-linecap="round"/><path d="M86 74c-8 0-13 5-13 10s7 7 13 4c6-3 7-8 0-14Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>`,
  spear: (c) => `<path d="M103 22 76 100" stroke="${c.light}" stroke-width="2.2"/><path d="M103 22l2-12 6 11 9-2-6 10Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M84 70l10 4" stroke="${c.accent}" stroke-width="2"/>`,
  pot: (c) => `<path d="M79 62h30v18c0 6-6 10-15 10s-15-4-15-10Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/><path d="M76 62h36" stroke="${c.light}" stroke-width="2.4"/><path d="M86 56c2-6 12-6 14 0" fill="none" stroke="${c.light}" stroke-width="1.4"/><circle cx="89" cy="56" r="1.4" fill="${c.accent}"/><circle cx="99" cy="53" r="1.2" fill="${c.accent}"/>`,
  spellbook: (c) => `<path d="M80 66c9-4 18-4 27 0v22c-9-3-18-3-27 0Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/><path d="M93 66v22M84 73c3-1 6-1 9 0M97 73c3-1 6-1 9 0" stroke="${c.light}" stroke-width="1" opacity=".7"/><path d="M95 58l3-8 3 8" fill="none" stroke="${c.accent}" stroke-width="1.4"/>`,
  skillet: (c) => `<ellipse cx="92" cy="72" rx="17" ry="10" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.3"/><path d="M108 68h11" stroke="${c.light}" stroke-width="3"/><path d="M84 68c5-3 12-3 17 0" stroke="${c.light}" stroke-width="1.2" fill="none"/><circle cx="91" cy="64" r="1.4" fill="${c.accent}"/>`,
  detective: (c) => `<circle cx="96" cy="58" r="13" fill="none" stroke="${c.accent}" stroke-width="2.6"/><path d="M105 68l8 10" stroke="${c.light}" stroke-width="2.8" stroke-linecap="round"/><path d="M89 54c2-2 5-2 7 0" stroke="${c.light}" stroke-width="1.2" fill="none"/>`,
  core: (c) => `<circle cx="95" cy="56" r="14" fill="${c.accent}" opacity=".28"/><circle cx="95" cy="56" r="7" fill="${c.accent}"/><circle cx="95" cy="56" r="3" fill="${c.light}"/><path d="M95 38v6M95 68v6M77 56h6M107 56h6" stroke="${c.light}" stroke-width="1.6"/>`,
  sun: (c) => `<circle cx="95" cy="46" r="10" fill="${c.accent}" opacity=".8"/><path d="M95 28v-6M95 70v-6M77 46h-6M119 46h-6M82 33l-4-4M112 63l4 4M108 33l4-4M82 59l-4 4" stroke="${c.light}" stroke-width="1.6" stroke-linecap="round"/>`,
  skates: (c) => `<path d="M80 82h26l-3 9H82Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><circle cx="85" cy="94" r="4" fill="${c.light}"/><circle cx="101" cy="94" r="4" fill="${c.light}"/><path d="M84 76h18M88 70h12" stroke="${c.accent}" stroke-width="1.4"/>`,
  phone: (c) => `<rect x="90" y="40" width="18" height="30" rx="3" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/><rect x="93" y="46" width="12" height="16" rx="1" fill="${c.light}" opacity=".6"/><circle cx="99" cy="66" r="1.5" fill="${c.accent}"/>`,
  board: (c) => `<g transform="rotate(-18 94 72)"><rect x="76" y="66" width="36" height="9" rx="4" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><circle cx="84" cy="83" r="3.4" fill="${c.light}"/><circle cx="104" cy="83" r="3.4" fill="${c.light}"/></g>`,
  greatsword: (c) => `<path d="M102 20 86 90" stroke="${c.light}" stroke-width="5" stroke-linecap="round"/><path d="M102 20l5 10-8 3-3-9Z" fill="${c.accent}"/><path d="M86 82h15" stroke="${c.accent}" stroke-width="3"/><path d="M91 90v12" stroke="${c.light}" stroke-width="2.4"/>`,
  cannon: (c) => `<path d="M78 58h34v14H78Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.3"/><circle cx="114" cy="65" r="8" fill="${c.accent}" opacity=".7"/><path d="M84 72h18v9H84Z" fill="${c.accent}" opacity=".65"/><path d="M90 44c6 0 10 4 10 10" stroke="${c.light}" stroke-width="1.4" fill="none"/>`,
  katana: (c) => `<path d="M104 22 78 96" stroke="${c.light}" stroke-width="2.6"/><path d="M104 22l4-8 3 10-5 4Z" fill="${c.accent}"/><path d="M80 88h16" stroke="${c.accent}" stroke-width="2.2"/>`,
  apron: (c) => `<path d="M78 58h34v38H78Z" fill="${c.light}" opacity=".32" stroke="${c.accent}" stroke-width="1.1"/><path d="M86 54c0-5 11-5 11 0M91 70h9v10h-9Z" stroke="${c.accent}" stroke-width="1.4" fill="none"/><path d="M91 74h9" stroke="${c.accent}" stroke-width="1.2"/>`,
  cards: (c) => `<g transform="rotate(-12 92 66)"><rect x="84" y="48" width="15" height="22" rx="2" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M91.5 54l3 5 3-5" fill="${c.accent}"/><rect x="90" y="58" width="15" height="22" rx="2" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M97.5 64l3 5 3-5" fill="${c.accent}"/></g>`,
  uniform: (c) => `<path d="M42 58c5 12 31 12 36 0l6 34H36Z" fill="${c.deep}" opacity=".5"/><path d="M54 60h12l-2 18h-8Z" fill="${c.light}" opacity=".7"/><path d="M52 66h16M52 71h16" stroke="${c.accent}" stroke-width="1.2"/><path d="M60 60l-4-8h8Z" fill="${c.accent}"/>`,
  flower: (c) => `<path d="M92 88V64" stroke="${c.accent}" stroke-width="2"/><g fill="${c.accent}"><circle cx="92" cy="54" r="5"/><circle cx="100" cy="60" r="5"/><circle cx="99" cy="70" r="5"/><circle cx="85" cy="70" r="5"/><circle cx="84" cy="60" r="5"/></g><circle cx="92" cy="63" r="3" fill="${c.light}"/><path d="M92 78c-6-1-9-4-10-8 5 0 8 3 10 8Z" fill="${c.accent}" opacity=".7"/>`,
  antlers: (c) => `<path d="M44 36C34 28 35 16 44 12c1 8 5 13 11 16M36 18l-9-4M41 13l-4-9M76 36c10-8 9-20 0-24-1 8-5 13-11 16M84 18l9-4M79 13l4-9" fill="none" stroke="${c.accent}" stroke-width="2.2" stroke-linecap="round"/>`,
  gauntlets: (c) => `<path d="M28 58h14v22H28ZM78 58h14v22H78Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><path d="M31 64h8M31 71h8M81 64h8M81 71h8" stroke="${c.light}" stroke-width="1.4"/><path d="M24 54h22v6H24ZM74 54h22v6H74Z" fill="${c.light}" opacity=".6"/>`,
  bombs: (c) => `<circle cx="94" cy="66" r="14" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.4"/><path d="M94 52c2-8 7-12 12-13" stroke="${c.accent}" stroke-width="2" fill="none"/><circle cx="108" cy="37" r="4" fill="${c.accent}"/><path d="M84 60c2-2 4-3 6-4" stroke="${c.light}" stroke-width="1.4" opacity=".7"/>`,
  clock: (c) => `<circle cx="96" cy="52" r="15" fill="${c.light}" opacity=".25" stroke="${c.accent}" stroke-width="1.6"/><path d="M96 41v11l7 5" stroke="${c.light}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M96 30v4M96 70v4M74 52h4M114 52h4" stroke="${c.accent}" stroke-width="1.4"/>`,
  quill: (c) => `<path d="M108 28c-16 10-24 23-27 40 9-4 16-9 21-17 4-6 6-14 6-23Z" fill="${c.light}" opacity=".8" stroke="${c.accent}" stroke-width="1.1"/><path d="M84 88l16-25M88 78l9 3" stroke="${c.accent}" stroke-width="1.4"/>`,
  notebook: (c) => `<rect x="82" y="46" width="25" height="32" rx="3" fill="${c.light}" opacity=".8" stroke="${c.accent}" stroke-width="1.2"/><path d="M88 54h13M88 60h13M88 66h9" stroke="${c.deep}" stroke-width="1.2"/><path d="M82 52h-4M82 60h-4M82 68h-4" stroke="${c.accent}" stroke-width="2"/>`,
  scarf: (c) => `<path d="M42 52c7 6 29 6 36 0v9c-9 6-27 6-36 0Z" fill="${c.accent}"/><path d="M74 59c8 5 10 14 8 24l-9-3c2-8 1-14-4-18Z" fill="${c.accent}" opacity=".85"/><path d="M46 58h24" stroke="${c.light}" stroke-width="1.3" opacity=".6"/>`,
  song: (c) => `<path d="M88 54v28M88 54l18-4v28" stroke="${c.accent}" stroke-width="2.4" fill="none"/><circle cx="83" cy="84" r="6" fill="${c.light}"/><circle cx="101" cy="80" r="6" fill="${c.light}"/><path d="M78 42c5-4 10-4 15 0M75 34c8-7 19-7 27 0" stroke="${c.accent}" stroke-width="1.4" fill="none" opacity=".75"/>`,
  guitar: (c) => `<path d="M90 34h5v40h-5Z" fill="${c.light}"/><path d="M82 74c-8 0-13 7-12 14 0 7 6 11 14 10 9-1 13-8 12-14-1-6-6-10-14-10Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><circle cx="88" cy="86" r="4" fill="${c.deep}"/><path d="M92 34l8-5M92 44l8-5" stroke="${c.accent}" stroke-width="2"/>`,
  bug: (c) => `<ellipse cx="92" cy="62" rx="16" ry="10" fill="${c.light}" opacity=".4" stroke="${c.accent}" stroke-width="1.1"/><path d="M92 52v20M84 55l-6-8M100 55l6-8" stroke="${c.accent}" stroke-width="1.6"/><circle cx="78" cy="45" r="2" fill="${c.light}"/><circle cx="106" cy="45" r="2" fill="${c.light}"/>`,
  sword: (c) => `<path d="M103 22 88 82" stroke="${c.light}" stroke-width="3.6" stroke-linecap="round"/><path d="M103 22l5 8-7 4-4-8Z" fill="${c.accent}"/><path d="M86 78h13" stroke="${c.accent}" stroke-width="3"/><path d="M92 84v10" stroke="${c.light}" stroke-width="2.4"/><circle cx="92" cy="98" r="3" fill="${c.accent}"/>`,
  arrows: (c) => `<path d="M80 42c14 10 22 24 24 42" stroke="${c.light}" stroke-width="2.2" fill="none"/><path d="M104 84l3 10-9-4Z" fill="${c.accent}"/><path d="M88 56l-9 1M95 66l-9 2M99 76l-8 3" stroke="${c.accent}" stroke-width="1.4"/><path d="M76 38c8-6 16-6 24 0" stroke="${c.accent}" stroke-width="1.8" fill="none"/>`,
  rune: (c) => `<circle cx="95" cy="54" r="17" fill="none" stroke="${c.accent}" stroke-width="1.4" opacity=".8"/><path d="M95 34v40M82 44l26 20M108 44 82 64" stroke="${c.light}" stroke-width="1.2" opacity=".75"/><circle cx="95" cy="54" r="3" fill="${c.accent}"/>`,
  twinBlades: (c) => `<path d="M104 28 82 92M80 28l22 64" stroke="${c.light}" stroke-width="1.9"/><path d="M104 28l2-9M80 28l-2-9" stroke="${c.accent}" stroke-width="2.6"/><circle cx="92" cy="60" r="5" fill="none" stroke="${c.accent}" stroke-width="1.4"/>`,
  crown: (c) => `<path d="M82 34l4-16 10 8 8-13 8 13 10-8 4 16Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M82 37h40" stroke="${c.light}" stroke-width="2"/><circle cx="102" cy="30" r="2.2" fill="${c.light}"/>`,
  headset: (c) => `<path d="M84 54c-4-16 4-26 16-26s20 10 16 26" fill="none" stroke="${c.accent}" stroke-width="2.4"/><rect x="78" y="50" width="9" height="16" rx="3" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><rect x="108" y="50" width="9" height="16" rx="3" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M100 66c6 2 10 6 12 12" stroke="${c.accent}" stroke-width="1.8" fill="none"/><circle cx="113" cy="80" r="2.4" fill="${c.accent}"/>`,
  toolkit: (c) => `<rect x="82" y="54" width="28" height="22" rx="3" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><path d="M89 54c0-7 14-7 14 0" fill="none" stroke="${c.light}" stroke-width="2"/><path d="M92 62v8M100 62v8M88 66h16" stroke="${c.light}" stroke-width="1.2"/>`,
  ladder: (c) => `<path d="M88 24v70M108 24v70M88 36h20M88 50h20M88 64h20M88 78h20" stroke="${c.light}" stroke-width="2.2"/><path d="M90 24h16" stroke="${c.accent}" stroke-width="3"/>`,
  lion: (c) => `<circle cx="95" cy="52" r="14" fill="${c.accent}" opacity=".75"/><path d="M95 34c-10 0-17 8-17 18s7 18 17 18 17-8 17-18-7-18-17-18Z" fill="none" stroke="${c.light}" stroke-width="1.6"/><path d="M88 48c2-3 5-3 7 0M97 48c2-3 5-3 7 0M91 58c3 2 6 2 9 0" stroke="${c.deep}" stroke-width="1.3" fill="none"/>`,
  scanner: (c) => `<rect x="82" y="40" width="30" height="24" rx="3" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/><path d="M86 48h22M86 54h14" stroke="${c.light}" stroke-width="1.2"/><circle cx="97" cy="68" r="9" fill="none" stroke="${c.accent}" stroke-width="1.4" stroke-dasharray="2 3"/><path d="M97 59v18M88 68h18" stroke="${c.accent}" stroke-width=".9" opacity=".6"/>`,
  amulet: (c) => `<path d="M82 38c9 6 17 6 26 0" stroke="${c.accent}" stroke-width="1.8" fill="none"/><path d="M95 44l9 12-9 14-9-14Z" fill="${c.accent}" opacity=".7" stroke="${c.light}" stroke-width="1.2"/><circle cx="95" cy="56" r="4" fill="${c.light}"/>`,
  shadow: (c) => `<path d="M88 38c10 0 16 8 15 19-1 10-7 18-14 24 2-10 0-18-5-23-6-5-6-20 4-20Z" fill="${c.deep}" opacity=".8"/><circle cx="95" cy="47" r="1.8" fill="${c.accent}"/><circle cx="91" cy="55" r="1.4" fill="${c.accent}"/>`,
  hammer: (c) => `<path d="M92 42v48" stroke="${c.light}" stroke-width="4"/><path d="M78 40h30v17H78Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><path d="M78 47h30" stroke="${c.deep}" stroke-width="1.4" opacity=".6"/>`,
  straw: (c) => `<path d="M103 30c8 0 12 6 9 13-2 5-7 6-12 4" stroke="${c.accent}" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M62 33c3-10 10-15 18-15" stroke="${c.accent}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  shield: (c) => `<path d="M82 40h28c0 22-6 35-14 42-8-7-14-20-14-42Z" fill="${c.light}" opacity=".4" stroke="${c.accent}" stroke-width="1.4"/><path d="M96 46v26M88 54h16" stroke="${c.accent}" stroke-width="1.8"/>`,
  dice: (c) => `<rect x="84" y="46" width="22" height="22" rx="4" fill="${c.light}" stroke="${c.accent}" stroke-width="1.3" transform="rotate(12 95 57)"/><g fill="${c.deep}"><circle cx="91" cy="53" r="1.8"/><circle cx="98" cy="59" r="1.8"/><circle cx="93" cy="63" r="1.8"/><circle cx="100" cy="51" r="1.8"/></g>`,
  tails: (c) => `<path d="M80 64c-14 6-18 22-10 34 8-6 12-15 13-24ZM108 62c14 6 18 22 10 34-8-6-12-15-13-24Z" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/><path d="M76 70c6 8 8 17 8 24M104 68c-6 8-8 17-8 24" stroke="${c.light}" stroke-width="1.4" fill="none"/>`,
  arm: (c) => `<path d="M82 54h16v34H82Z" fill="${c.light}" opacity=".4" stroke="${c.accent}" stroke-width="1.3"/><path d="M86 60h8M86 68h8M86 76h5" stroke="${c.accent}" stroke-width="1.4"/><circle cx="90" cy="50" r="4" fill="${c.accent}"/>`,
  cutlass: (c) => `<path d="M78 92c18-2 30-16 34-40-14 4-26 16-34 28Z" fill="${c.light}" opacity=".8" stroke="${c.accent}" stroke-width="1.2"/><path d="M78 92l-5 7" stroke="${c.accent}" stroke-width="4"/><path d="M86 80c8-5 15-12 19-20" stroke="${c.deep}" stroke-width="1" opacity=".5"/>`,
};

const NETFLIX_ART_CRESTS = {
  cross: (c) => `<path d="M58 4v13M52 9h12" stroke="${c.light}" stroke-width="2.4" stroke-linecap="round"/><circle cx="58" cy="10" r="2" fill="${c.accent}"/>`,
  bat: (c) => `<path d="M35 22c6-9 15-12 24-8 3-4 8-4 11 0 9-4 18-1 24 8-9-2-14 1-18 6-4-5-9-6-14-2-5-4-10-3-14 2-4-5-9-8-13-6Z" fill="${c.deep}" stroke="${c.accent}" stroke-width=".9"/>`,
  moon: (c) => `<path d="M103 10c-11 2-16 14-11 23 3 6 10 9 17 7-8 5-19 1-22-8-3-10 3-20 16-22Z" fill="${c.accent}" opacity=".8"/><circle cx="84" cy="12" r="1.6" fill="${c.light}"/>`,
  star: (c) => `<path d="M60 1l2.6 7.4L70 11l-7.4 2.6L60 21l-2.6-7.4L50 11l7.4-2.6Z" fill="${c.accent}"/>`,
  circuit: (c) => `<path d="M84 12h12v8h10M88 22h8v8M104 4v10" stroke="${c.accent}" stroke-width="1.5" fill="none"/><circle cx="108" cy="20" r="2" fill="${c.light}"/>`,
  flame: (c) => `<path d="M60 3c5 5 7 9 5 13-1 3-4 4-6 4s-5-1-6-4c-2-4 1-8 7-13Z" fill="${c.accent}"/><path d="M60 8c2 2 3 5 2 7-1 2-3 2-4 0-1-2 0-5 2-7Z" fill="${c.light}"/>`,
  wave: (c) => `<path d="M30 18c7-6 14-6 21 0s14 6 21 0 14-6 21 0" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M30 26c7-6 14-6 21 0s14 6 21 0 14-6 21 0" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".6"/>`,
  leaf: (c) => `<path d="M42 8c16-5 26 4 24 17-11 4-23-2-24-17Z" fill="${c.accent}" opacity=".8"/><path d="M43 9c9 4 15 9 21 15" stroke="${c.light}" stroke-width="1.2" fill="none"/>`,
  crown: (c) => `<path d="M42 18l3-12 7 5 5-9 5 9 7-5 3 12Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/><path d="M43 21h25" stroke="${c.light}" stroke-width="1.6"/>`,
  diamond: (c) => `<path d="M61 2l9 9-9 14-9-14Z" fill="${c.accent}" opacity=".55" stroke="${c.light}" stroke-width="1"/><path d="M61 4v18M53 12h16" stroke="${c.light}" stroke-width=".7" opacity=".7"/>`,
  bolt: (c) => `<path d="M66 2 50 21h8l-4 12 17-19h-9Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".6"/>`,
  heart: (c) => `<path d="M61 23C45 14 42 4 52 4c3 0 6 2 7 5 1-3 4-5 8-4 9 2 8 11-6 18Z" fill="${c.accent}" opacity=".8"/>`,
  eye: (c) => `<path d="M28 18c10-10 24-10 34 0-10 10-24 10-34 0Z" fill="${c.light}" opacity=".35" stroke="${c.accent}" stroke-width="1.2"/><circle cx="45" cy="18" r="4" fill="${c.accent}"/>`,
  wing: (c) => `<path d="M30 24C18 15 14 4 24 4c9 0 16 8 19 18ZM100 24c12-9 16-20 6-20-9 0-16 8-19 18Z" fill="${c.accent}" opacity=".65" stroke="${c.deep}" stroke-width=".8"/>`,
  spiral: (c) => `<path d="M58 20c-8 0-13-6-10-11 3-6 14-3 14 5 0 10-12 15-19 7" fill="none" stroke="${c.accent}" stroke-width="1.8" stroke-linecap="round"/>`,
  fang: (c) => `<path d="M52 5c2 10 4 15 9 19 5-4 7-9 8-19-5 3-11 3-17 0Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M58 9v9M64 9v7" stroke="${c.deep}" stroke-width="1" opacity=".5"/>`,
  horn: (c) => `<path d="M90 25c-11 0-17-8-13-17 8-1 14 5 13 17Z" fill="${c.light}" opacity=".8" stroke="${c.accent}" stroke-width="1"/><path d="M82 13c3 3 5 7 6 11" stroke="${c.accent}" stroke-width="1"/>`,
  clock: (c) => `<circle cx="60" cy="14" r="12" fill="none" stroke="${c.accent}" stroke-width="1.6"/><path d="M60 7v8l5 3" stroke="${c.light}" stroke-width="1.5" fill="none"/><path d="M60 1v2M60 25v2" stroke="${c.accent}" stroke-width="1"/>`,
  note: (c) => `<path d="M53 20V7l13-3v13" stroke="${c.accent}" stroke-width="2" fill="none"/><circle cx="50" cy="22" r="4" fill="${c.light}"/><circle cx="64" cy="19" r="4" fill="${c.light}"/>`,
};

/* 60 unique looks: [species, hair, prop, crest, aura] */
const NETFLIX_ART_LOOKS = [
  ['nf_trevor', 'shag', 'whip', 'cross', 'ember'],
  ['nf_sypha', 'long', 'frost', 'wave', 'frost'],
  ['nf_carmilla', 'horns', 'claws', 'bat', 'ember'],
  ['nf_richter', 'spiky', 'whip', 'moon', 'ember'],
  ['nf_maria', 'pony', 'doves', 'heart', 'light'],
  ['nf_annette', 'braid', 'flame', 'flame', 'ember'],
  ['nf_david', 'cap', 'chrome', 'circuit', 'neon'],
  ['nf_lucy', 'bob', 'netrunner', 'diamond', 'neon'],
  ['nf_rebecca', 'ears', 'shotgun', 'bolt', 'neon'],
  ['nf_mizu', 'pony', 'blade', 'eye', 'frost'],
  ['nf_ringo', 'bald', 'ladle', 'leaf', 'light'],
  ['nf_taigen', 'helm', 'spear', 'diamond', 'ember'],
  ['nf_laios', 'shag', 'pot', 'leaf', 'light'],
  ['nf_marcille', 'long', 'spellbook', 'star', 'light'],
  ['nf_senshi', 'helm', 'skillet', 'diamond', 'ember'],
  ['nf_gesicht', 'bald', 'detective', 'eye', 'neon'],
  ['nf_atom', 'spiky', 'core', 'heart', 'neon'],
  ['nf_epsilon', 'hood', 'sun', 'star', 'light'],
  ['nf_knives', 'bob', 'skates', 'note', 'neon'],
  ['nf_wallace', 'long', 'phone', 'heart', 'neon'],
  ['nf_lucas', 'cap', 'board', 'star', 'neon'],
  ['nf_dante', 'shag', 'greatsword', 'flame', 'ember'],
  ['nf_lady', 'bob', 'cannon', 'eye', 'ember'],
  ['nf_vergil', 'long', 'katana', 'diamond', 'frost'],
  ['nf_sakamoto', 'bald', 'apron', 'heart', 'light'],
  ['nf_shin', 'shag', 'reading', 'eye', 'light'],
  ['nf_nagumo', 'cap', 'cards', 'diamond', 'neon'],
  ['nf_legoshi', 'ears', 'uniform', 'fang', 'light'],
  ['nf_haru', 'ears', 'flower', 'leaf', 'light'],
  ['nf_louis', 'horns', 'antlers', 'crown', 'light'],
  ['nf_vi', 'spiky', 'gauntlets', 'bolt', 'neon'],
  ['nf_jinx', 'braid', 'bombs', 'bolt', 'neon'],
  ['nf_ekko', 'hood', 'clock', 'clock', 'neon'],
  ['nf_frida', 'bob', 'quill', 'star', 'light'],
  ['nf_alfur', 'cap', 'notebook', 'leaf', 'light'],
  ['nf_hildadavid', 'shag', 'scarf', 'heart', 'light'],
  ['nf_kipo', 'long', 'song', 'note', 'light'],
  ['nf_benson', 'shag', 'guitar', 'note', 'light'],
  ['nf_dave', 'ears', 'bug', 'leaf', 'light'],
  ['nf_adora', 'pony', 'sword', 'crown', 'light'],
  ['nf_catra', 'ears', 'claws', 'moon', 'neon'],
  ['nf_bow', 'shag', 'arrows', 'heart', 'light'],
  ['nf_callum', 'shag', 'rune', 'star', 'frost'],
  ['nf_rayla', 'braid', 'twinBlades', 'moon', 'frost'],
  ['nf_ezran', 'ears', 'crown', 'crown', 'light'],
  ['nf_player', 'cap', 'headset', 'circuit', 'neon'],
  ['nf_ivy', 'pony', 'toolkit', 'bolt', 'neon'],
  ['nf_zack', 'spiky', 'ladder', 'star', 'light'],
  ['nf_shiro', 'shag', 'lion', 'star', 'neon'],
  ['nf_keith', 'shag', 'blade', 'bolt', 'ember'],
  ['nf_pidge', 'bob', 'scanner', 'circuit', 'light'],
  ['nf_jim', 'shag', 'amulet', 'star', 'light'],
  ['nf_claire', 'pony', 'shadow', 'moon', 'neon'],
  ['nf_toby', 'cap', 'hammer', 'diamond', 'light'],
  ['nf_cuphead', 'bald', 'straw', 'star', 'light'],
  ['nf_mugman', 'bald', 'shield', 'heart', 'light'],
  ['nf_chalice', 'bald', 'dice', 'star', 'light'],
  ['nf_nine', 'ears', 'tails', 'diamond', 'neon'],
  ['nf_rusty', 'spiky', 'arm', 'bolt', 'neon'],
  ['nf_dread', 'cap', 'cutlass', 'eye', 'ember'],
];
const NETFLIX_ART_BY_KEY = {};
NETFLIX_ART_LOOKS.forEach(([key, hair, prop, crest, aura]) => {
  NETFLIX_ART_BY_KEY[key] = { hair, prop, crest, aura };
});

const NETFLIX_AURAS = {
  ember: (c) => `<path d="M25 62c-5-8-3-16 1-23M94 96c5-5 6-11 4-17" stroke="${c.accent}" stroke-width="1.4" fill="none" opacity=".55"/><circle cx="20" cy="44" r="1.6" fill="${c.accent}"/><circle cx="102" cy="38" r="1.2" fill="${c.light}"/>`,
  frost: (c) => `<path d="M27 42 21 34M31 68l-8 4M89 30l6-8" stroke="${c.light}" stroke-width="1.4" opacity=".6"/><circle cx="24" cy="54" r="1.3" fill="${c.light}"/><circle cx="97" cy="82" r="1.4" fill="${c.accent}"/>`,
  neon: (c) => `<rect x="18" y="30" width="3" height="56" rx="1" fill="${c.accent}" opacity=".35"/><rect x="99" y="24" width="3" height="62" rx="1" fill="${c.accent}" opacity=".25"/><path d="M30 26h8M86 100h9" stroke="${c.light}" stroke-width="1.4" opacity=".5"/>`,
  light: (c) => `<circle cx="24" cy="34" r="2" fill="${c.light}"/><circle cx="98" cy="60" r="1.5" fill="${c.light}"/><path d="M30 94c6-3 12-3 18 0M72 22c4-2 8-2 12 0" stroke="${c.accent}" stroke-width="1.2" fill="none" opacity=".6"/>`,
};

function signatureNetflix(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.netflix) return '';
  const look = NETFLIX_ART_BY_KEY[el] || { hair: 'shag', prop: 'rune', crest: 'star', aura: 'light' };
  const hair = NETFLIX_ART_HAIR[look.hair] || NETFLIX_ART_HAIR.shag;
  const prop = NETFLIX_ART_PROPS[look.prop] || NETFLIX_ART_PROPS.rune;
  const crest = NETFLIX_ART_CRESTS[look.crest] || NETFLIX_ART_CRESTS.star;
  const aura = NETFLIX_AURAS[look.aura] || NETFLIX_AURAS.light;
  return `<g class="netflix-signature">
    ${aura(c)}
    ${hair(c)}
    <path d="M22 104h76" stroke="${c.accent}" stroke-width="1.2" opacity=".45"/>
    <path d="M26 104h20" stroke="${c.light}" stroke-width="2" opacity=".6"/>
    ${crest(c)}
    ${prop(c)}
  </g>`;
}
