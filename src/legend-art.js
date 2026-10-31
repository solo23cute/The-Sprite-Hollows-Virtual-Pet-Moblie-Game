/* Original procedural accents for the crossover legends wave. No external character art. */

const LEGEND_ART_GOLD = '#ffd166';
const LEGEND_ART_INK = '#1d1734';
const LEGEND_ART_WHITE = '#fff8e8';
const LEGEND_ART_RED = '#e8574a';

function legendArtStar(cx, cy, r, fill, stroke = 'none') {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
}

function legendArtBolt(cx, cy, scale, fill) {
  return `<path d="M${cx} ${cy - 12 * scale}l-8 ${14 * scale}h7l-4 ${11 * scale} 12-16h-7l5-9Z" fill="${fill}" stroke="${LEGEND_ART_INK}" stroke-width=".8"/>`;
}

function legendGroupAura(group, c) {
  switch (group) {
    case 'fnaf':
      return `<g opacity=".45">
        <path d="M20 105 42 38M100 105 78 38" stroke="${c.accent}" stroke-width="1.1" opacity=".55"/>
        <ellipse cx="60" cy="106" rx="41" ry="3.5" fill="${c.accent}" opacity=".2"/>
        <circle cx="20" cy="20" r="2" fill="${c.accent}"/><circle cx="100" cy="20" r="1.5" fill="${c.light}"/>
      </g>`;
    case 'mario':
      return `<g opacity=".38">
        <rect x="8" y="12" width="9" height="9" rx="1" fill="none" stroke="${c.accent}"/>
        <rect x="103" y="94" width="8" height="8" rx="1" fill="none" stroke="${c.light}"/>
        <path d="M10 94h8v8h-8Z" fill="${c.accent}" opacity=".45"/>
        <circle cx="100" cy="20" r="1.7" fill="${c.light}"/>
      </g>`;
    case 'spore':
      return `<g opacity=".45">
        <circle cx="60" cy="61" r="51" fill="none" stroke="${c.accent}" stroke-width="1" stroke-dasharray="2 7"/>
        <circle cx="18" cy="42" r="2.2" fill="${c.light}"/><circle cx="101" cy="70" r="3" fill="${c.accent}"/>
        <circle cx="92" cy="26" r="1.6" fill="${c.light}"/><circle cx="28" cy="91" r="1.4" fill="${c.accent}"/>
      </g>`;
    case 'tomjerry':
      return `<g opacity=".42">
        <path d="M91 86l12-12 9 4-2 11-13 3Z" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="97" cy="82" r="2.1" fill="${c.deep}" opacity=".55"/><circle cx="104" cy="89" r="1.5" fill="${c.deep}" opacity=".55"/>
        <path d="M12 24c7 0 10 4 10 9s-4 8-10 8" fill="none" stroke="${c.light}" stroke-width="1.4" opacity=".7"/>
      </g>`;
    case 'looney':
      return `<g opacity=".38" fill="none">
        <circle cx="60" cy="60" r="49" stroke="${c.accent}" stroke-width="1.2"/>
        <circle cx="60" cy="60" r="42" stroke="${c.light}" stroke-width=".9" stroke-dasharray="4 6"/>
        <path d="M17 60h12M91 60h12M60 17v10M60 93v10" stroke="${c.accent}" stroke-width="1.4"/>
      </g>`;
    case 'zelda':
      return `<g opacity=".5">
        <path d="M60 8l8 14H52Z" fill="none" stroke="${c.accent}" stroke-width="1.4"/>
        <path d="M45 26l8 14H37Z" fill="none" stroke="${c.light}" stroke-width="1.2"/>
        <path d="M75 26l8 14H67Z" fill="none" stroke="${c.light}" stroke-width="1.2"/>
        <path d="M20 101h80" stroke="${c.accent}" stroke-width="1" stroke-dasharray="2 5"/>
      </g>`;
    case 'walkingdead':
      return `<g opacity=".42">
        <path d="M16 99c13-8 23 7 36-1s24 8 37-1 17 2 23-3" fill="none" stroke="${c.accent}" stroke-width="1.3"/>
        <path d="M25 94l-3 9M43 98l3 8M78 98l-3 8M101 95l4 8" stroke="${c.light}" stroke-width="1"/>
        <circle cx="93" cy="24" r="1.8" fill="${c.accent}" opacity=".8"/>
      </g>`;
    case 'slasher':
      return `<g opacity=".44">
        <path d="M18 22l18 79M28 18l12 84M96 20L82 98" stroke="${c.accent}" stroke-width="1.2"/>
        <path d="M22 101h76" stroke="${c.deep}" stroke-width="2" opacity=".4"/>
        <circle cx="98" cy="42" r="2" fill="${c.light}" opacity=".7"/>
      </g>`;
    case 'videogame':
      return `<g opacity=".45" fill="none" stroke="${c.accent}" stroke-width="1.3">
        <path d="M12 27V15h12M96 15h12v12M108 93v12H96M24 105H12V93"/>
        <path d="M50 12h8M100 50v8M50 108h8M12 50v8" stroke="${c.light}" stroke-width="1"/>
        <rect x="98" y="20" width="5" height="5" fill="${c.light}" opacity=".8"/>
      </g>`;
    default:
      return '';
  }
}

const LEGEND_ART_PROPS = {
  hat: (c) => `<path d="M45 31h30V18H45Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1.3"/><path d="M38 31h44v5H38Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M49 18h22" stroke="${c.accent}" stroke-width="2" opacity=".8"/>`,
  guitar: (c) => `<g transform="rotate(-18 90 72)"><path d="M82 61c10-2 15 8 8 15-5 5-14 4-17-3-2-6 3-11 9-12Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><path d="M88 62V38" stroke="${c.deep}" stroke-width="3"/><path d="M86 38h9v5h-9Z" fill="${c.light}" stroke="${c.deep}" stroke-width=".8"/><circle cx="86" cy="73" r="2.4" fill="${c.deep}"/></g>`,
  bib: (c) => `<path d="M48 82c7-7 17-7 24 0l-4 18H52Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/><path d="M51 88h18M53 93h14" stroke="${c.accent}" stroke-width="1.4" stroke-dasharray="2 3"/>`,
  hook: (c) => `<path d="M96 64v16c0 9-14 9-14 1" fill="none" stroke="${c.light}" stroke-width="3" stroke-linecap="round"/><path d="M78 80l-5 5 7 2" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><circle cx="96" cy="60" r="3.2" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>`,
  spring: (c) => `<path d="M93 36c-7 4-7 8 0 12s7 8 0 12 7 8 0 12" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/><circle cx="93" cy="35" r="2.2" fill="${c.light}"/>`,
  musicbox: (c) => `<path d="M76 88h25v15H76Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/><path d="M80 88V81h17v7" fill="none" stroke="${c.light}" stroke-width="1.3"/><circle cx="84" cy="96" r="2.5" fill="${c.deep}"/><path d="M96 74v-12M96 62l6 2" stroke="${c.light}" stroke-width="1.4"/><path d="M101 50l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5Z" fill="${c.light}" opacity=".9"/>`,
  bow: (c) => `<path d="M60 24c-9-8-18-6-18 2 0 8 9 10 18 2 9 8 18 6 18-2 0-8-9-10-18-2Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><circle cx="60" cy="26" r="3.2" fill="${c.light}" stroke="${c.deep}" stroke-width=".8"/>`,
  microphone: (c) => `<g transform="rotate(-16 94 66)"><rect x="88" y="40" width="12" height="21" rx="6" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/><path d="M94 61v20M87 81h14" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/><path d="M90 46h8M90 52h8" stroke="${c.accent}" stroke-width="1.2"/></g>`,
  wires: (c) => `<path d="M30 84c11 8 17-6 28 0s17 10 27 1M35 94c10-8 17 6 26-1s17-8 24 1" fill="none" stroke="${c.accent}" stroke-width="1.8" stroke-linecap="round"/><circle cx="32" cy="84" r="2.2" fill="${c.light}"/><circle cx="87" cy="94" r="1.8" fill="${c.light}"/>`,
  claw: (c) => `<path d="M92 62c10 5 11 16 6 24M96 56c12 7 14 20 9 30M100 50c14 9 16 25 11 37" fill="none" stroke="${c.light}" stroke-width="2" stroke-linecap="round"/><path d="M94 66l4 3M98 60l4 3M102 54l4 3" stroke="${c.accent}" stroke-width="2"/>`,
  mask: (c) => `<path d="M38 47c8-6 36-6 44 0v12c0 10-9 16-22 16S38 69 38 59Z" fill="${c.light}" opacity=".12" stroke="${c.light}" stroke-width="1.2" stroke-dasharray="3 3"/><ellipse cx="50" cy="57" rx="5" ry="3" fill="${c.light}" opacity=".45"/><ellipse cx="70" cy="57" rx="5" ry="3" fill="${c.light}" opacity=".45"/><path d="M53 69c4 3 10 3 14 0" stroke="${c.accent}" stroke-width="1.4" fill="none"/>`,
  cap: (c) => `<path d="M38 31c0-10 9-15 22-15s22 5 22 15Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><path d="M60 18h27c4 0 5 5 1 6H58Z" fill="${c.deep}" stroke="${c.light}" stroke-width=".7"/><circle cx="60" cy="23" r="4.2" fill="${c.light}" stroke="${c.deep}" stroke-width=".8"/>`,
  crown: (c) => `<path d="M43 31l4-19 8 8 5-12 5 12 8-8 4 19Z" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/><circle cx="60" cy="21" r="2.1" fill="${LEGEND_ART_RED}"/><circle cx="49" cy="24" r="1.5" fill="${c.light}"/><circle cx="71" cy="24" r="1.5" fill="${c.light}"/>`,
  shell: (c) => `<path d="M31 78c0-18 13-31 29-31s29 13 29 31c-9 8-49 8-58 0Z" fill="${c.accent}" opacity=".55" stroke="${c.deep}" stroke-width="1.4"/><path d="M38 75c7-8 14-5 22 0s15-8 22 0M42 64l5 7M60 57v12M78 64l-5 7" fill="none" stroke="${c.light}" stroke-width="1.1"/>`,
  mushroom: (c) => `<path d="M38 52c0-13 8-23 22-23s22 10 22 23Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.3"/><path d="M51 52h18v15H51Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/><circle cx="52" cy="42" r="3" fill="${c.light}" opacity=".9"/><circle cx="69" cy="37" r="2.2" fill="${c.light}" opacity=".9"/>`,
  egg: (c) => `<ellipse cx="91" cy="77" rx="12" ry="16" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/><path d="M85 75l3 4 5-7" fill="none" stroke="${c.accent}" stroke-width="1.6" stroke-linecap="round"/><circle cx="86" cy="68" r="1.4" fill="${c.accent}"/>`,
  tie: (c) => `<path d="M60 76l7 7-4 17-3 5-3-5-4-17Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M55 73h10" stroke="${c.deep}" stroke-width="2"/>`,
  star: (c) => legendArtStar(94, 38, 15, LEGEND_ART_GOLD, c.deep) + `<circle cx="94" cy="38" r="2.2" fill="${c.light}"/>`,
  coin: (c) => `<circle cx="94" cy="63" r="14" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width="1.4"/><path d="M94 53v20M88 58h9c5 0 5 7 0 7h-9M88 68h9" fill="none" stroke="${c.deep}" stroke-width="2" stroke-linecap="round"/>`,
  racket: (c) => `<ellipse cx="92" cy="54" rx="13" ry="17" fill="none" stroke="${c.light}" stroke-width="2.2" transform="rotate(25 92 54)"/><path d="M83 70l-8 14" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/><path d="M86 47l11 12M87 57l11-10" stroke="${c.accent}" stroke-width=".8" opacity=".7"/>`,
  brow: (c) => `<path d="M38 47l15 5M82 47l-15 5" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/><path d="M38 54c5-3 11-3 15 0M82 54c-5-3-11-3-15 0" stroke="${c.light}" stroke-width="1.2" fill="none"/>`,
  wand: (c) => `<path d="M93 84L78 57" stroke="${c.light}" stroke-width="2.4" stroke-linecap="round"/><path d="M77 57l1.5-10 4 8 9-5-3 10 9 3-9 2" fill="none" stroke="${c.accent}" stroke-width="1.5" stroke-linejoin="round"/><circle cx="78" cy="46" r="2.4" fill="${LEGEND_ART_GOLD}"/>`,
  fang: (c) => `<path d="M40 86l8-16 5 14 7-18 6 20 7-15 6 17" fill="none" stroke="${c.light}" stroke-width="2.3" stroke-linejoin="round"/><path d="M43 87c12 5 23 5 34 0" stroke="${c.accent}" stroke-width="1.2" fill="none"/>`,
  leaf: (c) => `<path d="M92 87c-12-2-18-13-11-23 11-4 20 6 17 18Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/><path d="M82 82c4-7 8-10 13-13" stroke="${c.light}" stroke-width="1.3" fill="none"/>`,
  wing: (c) => `<path d="M91 63c12-14 20-19 23-17-1 10-8 21-17 25Z" fill="${c.light}" opacity=".75" stroke="${c.deep}" stroke-width="1"/><path d="M94 65c6-5 12-9 17-13M91 72c5-4 10-6 16-8" stroke="${c.accent}" stroke-width="1" fill="none"/>`,
  spore: (c) => `<path d="M88 88c0-8 5-13 11-13s11 5 11 13Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M96 88v9" stroke="${c.light}" stroke-width="2"/><circle cx="84" cy="60" r="2" fill="${c.light}"/><circle cx="99" cy="48" r="1.5" fill="${c.accent}"/><circle cx="108" cy="68" r="1.8" fill="${c.light}"/>`,
  cell: (c) => `<circle cx="95" cy="61" r="17" fill="none" stroke="${c.light}" stroke-width="1.4"/><circle cx="95" cy="61" r="9" fill="${c.accent}" opacity=".45"/><circle cx="91" cy="57" r="3" fill="${c.light}"/><path d="M95 44c3-5 0-9-4-6" stroke="${c.accent}" stroke-width="1.3" fill="none"/><circle cx="79" cy="75" r="2" fill="${c.light}"/>`,
  spike: (c) => `<path d="M84 88l6-21 6 21M93 88l8-17 5 17M74 90l4-15 5 15" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/><path d="M72 92h38" stroke="${c.light}" stroke-width="1.3"/>`,
  cheese: (c) => `<path d="M76 84h33v16H76Z" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width="1.1"/><circle cx="84" cy="90" r="2.2" fill="${c.deep}" opacity=".55"/><circle cx="96" cy="95" r="2.8" fill="${c.deep}" opacity=".55"/><circle cx="103" cy="87" r="1.6" fill="${c.deep}" opacity=".55"/>`,
  collar: (c) => `<path d="M47 82c4 9 22 9 26 0" fill="none" stroke="${c.accent}" stroke-width="5"/><circle cx="60" cy="89" r="3.2" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width=".8"/>`,
  duck: (c) => `<ellipse cx="94" cy="74" rx="14" ry="9" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/><path d="M105 71l10 4-10 4Z" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width="1"/><circle cx="98" cy="69" r="1.7" fill="${c.deep}"/><path d="M83 83c8 3 16 3 24 0" stroke="${c.accent}" stroke-width="1.4" fill="none"/>`,
  bolt: (c) => legendArtBolt(94, 64, 2, LEGEND_ART_GOLD) + `<path d="M88 83l-5 9M101 82l5 10" stroke="${c.light}" stroke-width="1.4" stroke-linecap="round"/>`,
  dumbbell: (c) => `<path d="M80 66h28M83 59v14M105 59v14M76 62v8M112 62v8" stroke="${c.light}" stroke-width="3" stroke-linecap="round"/><circle cx="83" cy="66" r="2" fill="${c.accent}"/><circle cx="105" cy="66" r="2" fill="${c.accent}"/>`,
  ear: (c) => `<path d="M92 46c10-6 18 0 15 9-2 6-9 7-12 13" fill="${c.light}" opacity=".45" stroke="${c.deep}" stroke-width="1.3"/><path d="M96 51c4-2 7 2 5 5" stroke="${c.accent}" stroke-width="1.2" fill="none"/>`,
  beak: (c) => `<path d="M82 72h18l-6 8h-7Z" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width="1.1"/><path d="M84 76h14" stroke="${c.deep}" stroke-width=".9" opacity=".55"/>`,
  bowtie: (c) => `<path d="M60 84c-7-5-13-4-13 2s6 7 13 2c7 5 13 4 13-2s-6-7-13-2Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/><circle cx="60" cy="86" r="2.5" fill="${c.light}"/>`,
  feather: (c) => `<path d="M94 83c-2-18 7-28 17-30-1 13-7 25-17 30Z" fill="${c.light}" opacity=".8" stroke="${c.deep}" stroke-width="1"/><path d="M95 80c5-8 9-15 13-23" stroke="${c.accent}" stroke-width="1.2" fill="none"/>`,
  anvil: (c) => `<path d="M74 76h36l-5 10H99l-2 8H87l-2-8H79Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1.1" stroke-linejoin="round"/><path d="M80 72c8-5 15-5 24 0" fill="none" stroke="${c.accent}" stroke-width="1.4"/>`,
  tornado: (c) => `<path d="M74 52c15-4 30-4 38 0-8 5-22 6-31 7 8 3 17 4 23 3-5 4-12 6-17 7 5 1 9 3 11 5-5 2-10 2-14 1" fill="${c.accent}" opacity=".75" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>`,
  rooster: (c) => `<path d="M49 26c-5-8-2-14 4-16 1 5 1 9 4 12 1-8 6-12 11-11-3 5-4 10-3 15Z" fill="${LEGEND_ART_RED}" stroke="${c.deep}" stroke-width="1.1"/><path d="M56 31l3-7 4 7 4-7 3 8" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width=".8"/>`,
  helmet: (c) => `<path d="M36 50c0-16 10-26 24-26s24 10 24 26v7H36Z" fill="${c.light}" opacity=".38" stroke="${c.light}" stroke-width="1.5"/><path d="M44 50h32" stroke="${c.accent}" stroke-width="2"/><path d="M41 29l-5-9M79 29l5-9" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/><circle cx="60" cy="27" r="2" fill="${LEGEND_ART_GOLD}"/>`,
  flower: (c) => `<g transform="translate(94 57)"><circle cx="0" cy="0" r="4" fill="${LEGEND_ART_GOLD}"/><circle cx="0" cy="-9" r="6" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/><circle cx="8" cy="-3" r="6" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/><circle cx="5" cy="7" r="6" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/><circle cx="-5" cy="7" r="6" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/><circle cx="-8" cy="-3" r="6" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/></g>`,
  sombrero: (c) => `<path d="M37 33c8-13 38-13 46 0-9 6-37 6-46 0Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><path d="M49 30c1-10 21-10 22 0" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/><path d="M39 34c9 4 33 4 42 0" stroke="${c.deep}" stroke-width="1" fill="none" opacity=".5"/>`,
  fur: (c) => `<path d="M82 43c5-10 13-12 18-8s5 12-1 17c7 1 9 8 5 13s-13 4-17-2c-2 7-9 9-14 5s-5-12 0-16c-6-2-7-9-3-13s9-3 12 4Z" fill="${c.light}" opacity=".28" stroke="${c.light}" stroke-width="1.1"/><circle cx="94" cy="54" r="2" fill="${c.deep}"/>`,
  glasses: (c) => `<circle cx="50" cy="59" r="9" fill="none" stroke="${c.light}" stroke-width="2"/><circle cx="70" cy="59" r="9" fill="none" stroke="${c.light}" stroke-width="2"/><path d="M59 59h2M41 57l-6-1M79 57l6-1" stroke="${c.accent}" stroke-width="1.8"/>`,
  cane: (c) => `<path d="M94 88V64c0-7 10-8 11-1" fill="none" stroke="${c.light}" stroke-width="3" stroke-linecap="round"/><path d="M91 88h8" stroke="${c.accent}" stroke-width="2"/>`,
  sword: (c) => `<g transform="rotate(28 92 62)"><path d="M92 28v44" stroke="${c.light}" stroke-width="4"/><path d="M92 24l3 6-3 5-3-5Z" fill="${c.accent}"/><path d="M84 72h16" stroke="${LEGEND_ART_GOLD}" stroke-width="3"/><path d="M92 72v15" stroke="${c.deep}" stroke-width="3"/></g>`,
  triforce: (c) => `<g transform="translate(94 50)" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0-15l10 17H-10Z" stroke="${LEGEND_ART_GOLD}" stroke-width="2"/><path d="M-12 6l10 17H-22Z" stroke="${c.light}" stroke-width="1.5"/><path d="M12 6l10 17H2Z" stroke="${c.light}" stroke-width="1.5"/></g>`,
  trident: (c) => `<path d="M91 88V38M82 38v-10M91 38V26M100 38V28M82 38c0 7 5 10 9 10s9-3 9-10" fill="none" stroke="${c.light}" stroke-width="2.2" stroke-linecap="round"/><path d="M84 88h15" stroke="${c.accent}" stroke-width="2"/>`,
  horns: (c) => `<path d="M44 34c-9-7-13-16-10-23 8 2 14 9 16 19M76 34c9-7 13-16 10-23-8 2-14 9-16 19Z" fill="${c.light}" opacity=".8" stroke="${c.deep}" stroke-width="1.2"/><path d="M40 13l-2-7M80 13l2-7" stroke="${c.accent}" stroke-width="1.4"/>`,
  kunai: (c) => `<g transform="rotate(35 94 64)"><path d="M94 42l6 16-6 8-6-8Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/><path d="M94 66v14" stroke="${c.accent}" stroke-width="2.4"/><circle cx="94" cy="82" r="3" fill="none" stroke="${c.light}" stroke-width="1.3"/></g>`,
  horseshoe: (c) => `<path d="M79 70c0-12 7-20 15-20s15 8 15 20c0 7-4 12-9 12l-2-8c3 0 4-2 4-5 0-6-4-11-8-11s-8 5-8 11c0 3 1 5 4 5l-2 8c-5 0-9-5-9-12Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/><circle cx="82" cy="76" r="1.2" fill="${c.deep}"/><circle cx="106" cy="76" r="1.2" fill="${c.deep}"/>`,
  boat: (c) => `<path d="M72 85h45l-7 10H80Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/><path d="M94 84V48" stroke="${c.light}" stroke-width="2"/><path d="M96 52l17 11H96Z" fill="${c.light}" opacity=".85" stroke="${c.deep}" stroke-width=".8"/><path d="M92 56L77 66h15Z" fill="${c.accent}" opacity=".9"/>`,
  scimitar: (c) => `<path d="M79 84c13-2 24-12 29-27-15 5-26 12-34 22Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/><path d="M74 89l12-12" stroke="${LEGEND_ART_GOLD}" stroke-width="3"/><path d="M72 92l4-4" stroke="${c.accent}" stroke-width="3"/>`,
  spear: (c) => `<path d="M76 90L100 42" stroke="${c.light}" stroke-width="2.2" stroke-linecap="round"/><path d="M100 42l-2-11 7 6 7-3-4 9Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".9"/><path d="M84 78l-5 5" stroke="${LEGEND_ART_GOLD}" stroke-width="2"/>`,
  shield: (c) => `<path d="M102 47c-7 1-12-2-16-6v25c0 12 8 18 16 21 8-3 16-9 16-21V41c-4 4-9 7-16 6Z" fill="${c.accent}" opacity=".7" stroke="${c.light}" stroke-width="1.4"/><path d="M102 54v18M95 60h14" stroke="${c.light}" stroke-width="1.3"/>`,
  goggles: (c) => `<circle cx="44" cy="50" r="10" fill="none" stroke="${c.accent}" stroke-width="2.2"/><circle cx="72" cy="50" r="10" fill="none" stroke="${c.accent}" stroke-width="2.2"/><path d="M54 50h8M34 48l-6-2M82 48l6-2" stroke="${c.light}" stroke-width="1.8"/><path d="M41 46c3-3 6-3 9 0" stroke="${c.light}" stroke-width="1.1" fill="none"/>`,
  clock: (c) => `<circle cx="92" cy="57" r="19" fill="none" stroke="${c.accent}" stroke-width="2"/><circle cx="92" cy="57" r="2" fill="${c.light}"/><path d="M92 45v12l8 5M84 36l-3-4M100 36l3-4" stroke="${c.light}" stroke-width="1.8" stroke-linecap="round"/><circle cx="92" cy="57" r="24" fill="none" stroke="${c.light}" stroke-width=".7" stroke-dasharray="2 6" opacity=".7"/>`,
  sheriff: (c) => `<path d="M42 30h36v8H42Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><path d="M46 30c0-8 6-12 14-12s14 4 14 12Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1"/><path d="M94 48l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width="1"/>`,
  katana: (c) => `<path d="M76 90c16-9 24-23 26-38-12 3-23 13-32 26Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/><path d="M72 94l10-10" stroke="${c.accent}" stroke-width="3"/><path d="M68 97l5-5" stroke="${LEGEND_ART_GOLD}" stroke-width="2"/>`,
  crossbow: (c) => `<path d="M82 58c12-7 23-3 27 7-11 2-19 8-23 16" fill="none" stroke="${c.light}" stroke-width="2.4"/><path d="M84 77l15-15M73 86l14-14" stroke="${c.accent}" stroke-width="2.2"/><path d="M96 54l6-13" stroke="${c.deep}" stroke-width="2"/><circle cx="87" cy="73" r="2" fill="${c.accent}"/>`,
  knife: (c) => `<path d="M88 83l14-16 7 2-13 18Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/><path d="M84 87l7-7" stroke="${c.accent}" stroke-width="4"/><path d="M83 88l-3 5" stroke="${c.deep}" stroke-width="2"/>`,
  bat: (c) => `<g transform="rotate(-28 94 74)"><path d="M94 50l6 5-2 12-4 16-4-16-2-12Z" fill="${c.light}" opacity=".75" stroke="${c.deep}" stroke-width="1"/><path d="M94 83v12" stroke="${c.accent}" stroke-width="4"/><path d="M89 58h10M88 66h12M90 74h8" stroke="${c.accent}" stroke-width=".8" opacity=".7"/></g>`,
  shotgun: (c) => `<path d="M74 62h27v7H74ZM99 62l11-4v8l-11 3Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1.1"/><path d="M85 69l-4 15M92 69l3 15" stroke="${c.accent}" stroke-width="2.2"/><path d="M76 62v7" stroke="${c.light}" stroke-width="2"/>`,
  rifle: (c) => `<path d="M72 64h39v4H72Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1"/><path d="M88 68l-4 15M98 68l3 14" stroke="${c.accent}" stroke-width="2"/><path d="M104 60l8-2v4l-8 2Z" fill="${c.accent}"/><circle cx="86" cy="63" r="3.2" fill="none" stroke="${c.light}" stroke-width="1.2"/>`,
  hammer: (c) => `<path d="M92 88V61" stroke="${c.light}" stroke-width="4" stroke-linecap="round"/><path d="M78 51h30v13H78Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.3"/><path d="M83 54v7M93 54v7M103 54v7" stroke="${c.light}" stroke-width="1" opacity=".7"/>`,
  radio: (c) => `<rect x="78" y="64" width="28" height="22" rx="3" fill="${c.deep}" stroke="${c.light}" stroke-width="1.2"/><circle cx="87" cy="75" r="5" fill="none" stroke="${c.accent}" stroke-width="1.4"/><path d="M98 71h5M98 77h5" stroke="${c.light}" stroke-width="1.4"/><path d="M101 64V53" stroke="${c.accent}" stroke-width="2"/><circle cx="101" cy="52" r="2" fill="${c.light}"/>`,
  book: (c) => `<path d="M78 62c8-4 15-4 21 0v24c-6-4-13-4-21 0Z" fill="${c.light}" opacity=".8" stroke="${c.deep}" stroke-width="1.1"/><path d="M99 62c6-4 13-4 19 0v24c-6-4-13-4-19 0Z" fill="${c.accent}" opacity=".7" stroke="${c.deep}" stroke-width="1.1"/><path d="M84 68h9M84 73h9M105 68h8M105 73h8" stroke="${c.deep}" stroke-width="1" opacity=".5"/>`,
  staff: (c) => `<path d="M94 91V45" stroke="${c.light}" stroke-width="3" stroke-linecap="round"/><circle cx="94" cy="38" r="9" fill="none" stroke="${c.accent}" stroke-width="2"/><circle cx="94" cy="38" r="3" fill="${c.light}"/><path d="M82 28l7 5M106 28l-7 5" stroke="${c.accent}" stroke-width="1.4"/>`,
  tiger: (c) => `<path d="M78 86c4-7 12-8 18-3M96 83c7-4 14-2 18 4" fill="none" stroke="${c.accent}" stroke-width="2"/><path d="M85 79l-3-8M96 77v-8M106 79l3-8" stroke="${c.deep}" stroke-width="2" stroke-linecap="round"/><path d="M84 88c7 3 14 3 22 0" stroke="${c.light}" stroke-width="1.2" fill="none"/>`,
  baton: (c) => `<path d="M88 89L104 53" stroke="${c.light}" stroke-width="4" stroke-linecap="round"/><path d="M102 57l6-4M98 66l7-3M94 75l7-2" stroke="${c.accent}" stroke-width="1.5"/>`,
  armor: (c) => `<path d="M78 58c8-4 16-3 23 5l-4 13-14 7-12-7-4-12c4-3 8-5 11-6Z" fill="${c.accent}" opacity=".65" stroke="${c.light}" stroke-width="1.3"/><path d="M83 65h17M85 72h13" stroke="${c.deep}" stroke-width="1.2" opacity=".55"/><circle cx="90" cy="61" r="2" fill="${c.light}"/>`,
  puzzlebox: (c) => `<g transform="rotate(-18 96 67)"><rect x="85" y="54" width="22" height="22" rx="3" fill="${c.deep}" stroke="${c.light}" stroke-width="1.2"/><path d="M85 63h22M85 71h22M92 54v22M100 54v22" stroke="${c.accent}" stroke-width="1"/><circle cx="96" cy="65" r="2.2" fill="${c.light}"/></g>`,
  chainsaw: (c) => `<path d="M78 60h27v9H78Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1.2"/><path d="M79 62c8 0 8 5 16 5M95 62c8 0 8 5 16 5" fill="none" stroke="${c.accent}" stroke-width="1.2"/><path d="M89 69l-4 16M99 69l5 16M99 86h8" stroke="${c.light}" stroke-width="3" stroke-linecap="round"/>`,
  balloon: (c) => `<ellipse cx="98" cy="41" rx="10" ry="13" fill="${LEGEND_ART_RED}" stroke="${c.deep}" stroke-width="1.2"/><path d="M98 54c2 8 1 16-4 23" stroke="${c.light}" stroke-width="1.3" fill="none"/><path d="M94 41c2-2 5-2 7 0" stroke="${c.light}" stroke-width="1.2" fill="none"/><path d="M98 76l-4 5 6 2Z" fill="${c.accent}"/>`,
  cape: (c) => `<path d="M38 62c-8 14-10 29-7 42l16-7 13 7 13-7 16 7c3-13 1-28-7-42-13 8-31 8-44 0Z" fill="${c.deep}" opacity=".65" stroke="${c.accent}" stroke-width="1"/><path d="M47 65c8 5 18 5 26 0" stroke="${c.light}" stroke-width="1.1" fill="none"/>`,
  bandage: (c) => `<path d="M78 48c14-4 25 5 24 18M74 57c14-4 27 4 28 17M77 68c10-2 18 2 21 9" fill="none" stroke="${c.light}" stroke-width="6" opacity=".55"/><path d="M80 51l5 4M77 61l5 4M81 71l5 4" stroke="${c.accent}" stroke-width="1"/>`,
  visor: (c) => `<path d="M55 47c12-5 27-4 38 2l-2 10c-10 6-24 6-34 0Z" fill="${c.accent}" opacity=".6" stroke="${c.light}" stroke-width="1.3"/><path d="M62 51c8-2 17-1 24 2" stroke="${c.light}" stroke-width="1.5" fill="none" opacity=".8"/><circle cx="79" cy="55" r="2.2" fill="${c.light}"/>`,
  axe: (c) => `<path d="M88 89V55" stroke="${c.light}" stroke-width="4" stroke-linecap="round"/><path d="M89 50c-10 0-18 8-18 18 8 1 15-1 20-5l9 5c1-9-3-16-11-18Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><path d="M82 55c4 3 7 7 8 12" stroke="${c.light}" stroke-width="1" fill="none"/>`,
  torch: (c) => `<path d="M94 89V66" stroke="${c.deep}" stroke-width="3"/><path d="M94 67c-8-4-9-14-2-20 1 6 4 7 5 3 5 7 3 14-3 17Z" fill="${c.accent}" stroke="${LEGEND_ART_GOLD}" stroke-width="1"/><path d="M94 60c-2-4 0-7 2-9 1 4 1 6-2 9Z" fill="${c.light}"/>`,
  pellet: (c) => `<circle cx="92" cy="62" r="7" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width="1.2"/><circle cx="83" cy="46" r="2.6" fill="${c.light}"/><circle cx="105" cy="50" r="2" fill="${c.accent}"/><circle cx="104" cy="79" r="2.2" fill="${c.light}"/><path d="M77 68l-5 4M107 33l4-4" stroke="${c.accent}" stroke-width="1.4"/>`,
  armcannon: (c) => `<path d="M78 57h28v16H78Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.3"/><path d="M104 60h10v10h-10Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1.1"/><circle cx="109" cy="65" r="3.2" fill="${c.light}"/><path d="M82 62h18" stroke="${c.light}" stroke-width="1.2"/>`,
  buster: (c) => `<path d="M84 90L98 38" stroke="${c.light}" stroke-width="8" stroke-linecap="round"/><path d="M96 44l5 2M92 58l5 2M88 72l5 2" stroke="${c.deep}" stroke-width="2"/><path d="M81 88h10" stroke="${c.accent}" stroke-width="3"/>`,
  box: (c) => `<path d="M76 58h33v31H76Z" fill="${c.light}" opacity=".35" stroke="${c.deep}" stroke-width="1.2"/><path d="M76 58l12 10h21l-12-10M88 68v21" fill="none" stroke="${c.accent}" stroke-width="1.2"/><path d="M91 72h10v3H91Z" fill="${c.deep}" opacity=".5"/>`,
  fist: (c) => `<path d="M82 77c0-9 6-14 13-14s13 5 13 14v5c0 6-5 9-11 9h-5c-6 0-10-3-10-9Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><path d="M86 77h18M87 83h16M90 70v-5M96 68v-4" stroke="${c.light}" stroke-width="1.2" stroke-linecap="round"/>`,
  kick: (c) => `<path d="M78 76c10-9 17-3 23-14l8 7-8 12c-3 5-8 8-14 8h-8Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/><path d="M82 86l-4 13M91 87l2 13" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/><path d="M94 69l7-5" stroke="${c.accent}" stroke-width="1.5"/>`,
  chain: (c) => `<g fill="none" stroke="${c.light}" stroke-width="2"><ellipse cx="86" cy="48" rx="5" ry="8" transform="rotate(28 86 48)"/><ellipse cx="94" cy="60" rx="5" ry="8" transform="rotate(28 94 60)"/><ellipse cx="102" cy="72" rx="5" ry="8" transform="rotate(28 102 72)"/><ellipse cx="109" cy="85" rx="5" ry="8" transform="rotate(28 109 85)"/></g><path d="M78 92c7-3 13-3 20 0" stroke="${c.accent}" stroke-width="1.4" fill="none"/>`,
  ice: (c) => `<g transform="translate(94 54)" stroke="${c.light}" stroke-width="1.8" stroke-linecap="round"><path d="M0-18V18M-15-9L15 9M-15 9L15-9"/><path d="M0-18l-4 5M0-18l4 5M0 18l-4-5M0 18l4-5M-15-9l6 1M-15-9l-1-6M15 9l-6-1M15 9l1 6"/></g><circle cx="94" cy="54" r="3" fill="${c.accent}"/>`,
  block: (c) => `<path d="M83 55l12-7 13 7-13 7Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/><path d="M83 55v16l12 7V62ZM108 55v16l-13 7V62Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M88 55l8 4 8-4" stroke="${c.deep}" stroke-width=".8" fill="none"/>`,
  crowbar: (c) => `<path d="M78 89c12-4 18-16 21-28 2-7 6-9 10-8-1 5-5 9-5 16-1 13-10 23-24 27" fill="none" stroke="${c.light}" stroke-width="4" stroke-linecap="round"/><path d="M108 53l2 12-7-2Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/>`,
  portal: (c) => `<ellipse cx="96" cy="61" rx="10" ry="17" fill="none" stroke="${c.light}" stroke-width="3" transform="rotate(18 96 61)"/><ellipse cx="96" cy="61" rx="4.5" ry="11" fill="${c.accent}" opacity=".6" transform="rotate(18 96 61)"/><circle cx="80" cy="40" r="2" fill="${c.light}"/><circle cx="111" cy="80" r="2.2" fill="${c.accent}"/>`,
  backpack: (c) => `<path d="M80 62c0-9 7-15 15-15s15 6 15 15v23H80Z" fill="${c.accent}" opacity=".7" stroke="${c.deep}" stroke-width="1.2"/><path d="M87 62c0-5 3-8 8-8s8 3 8 8" fill="none" stroke="${c.light}" stroke-width="1.3"/><path d="M86 69h18v10H86Z" fill="${c.deep}" opacity=".35"/><path d="M86 75h18" stroke="${c.light}" stroke-width="1"/>`,
  rope: (c) => `<path d="M81 56c12-8 24-3 25 9 1 13-15 19-25 10-7-7-2-15 6-13 7 2 8 10 2 13" fill="none" stroke="${c.light}" stroke-width="2.2" stroke-linecap="round"/><path d="M82 76l-6 14M87 76l4 14" stroke="${c.accent}" stroke-width="1.5"/>`,
  keyblade: (c) => `<path d="M84 91L100 42" stroke="${c.light}" stroke-width="4" stroke-linecap="round"/><path d="M95 44l5-12 5 12 8 1-6 6 2 8-7-4-7 4 2-8-6-6Z" fill="${LEGEND_ART_GOLD}" stroke="${c.deep}" stroke-width="1"/><path d="M79 88h12" stroke="${c.accent}" stroke-width="3"/>`,
};

function signatureLegend(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.legendGroup || !LEGEND_GROUPS[meta.legendGroup]) return '';
  const drawProp = meta.legendArt ? LEGEND_ART_PROPS[meta.legendArt] : null;
  return `<g class="legend-signature">${legendGroupAura(meta.legendGroup, c)}${drawProp ? drawProp(c) : ''}</g>`;
}
