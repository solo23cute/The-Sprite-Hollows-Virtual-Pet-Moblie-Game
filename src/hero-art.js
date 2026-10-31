/* Original signature overlays for the hero, villain, and anti-hero wave. */

const HERO_ART_GOLD = '#ffd166';
const HERO_ART_WHITE = '#f7f5ff';
const HERO_ART_INK = '#1d1734';

function heroArtStar(cx, cy, r, fill) {
  return `<path d="M0-10 2.9-3.1 10-3.1 4.5 1.5 6.2 9 0 5-6.2 9-4.5 1.5-10-3.1-2.9-3.1Z" transform="translate(${cx} ${cy}) scale(${r / 10})" fill="${fill}"/>`;
}

function heroArtMask(c, fill) {
  return `<path d="M43 54c4-3 9-3 13 0l-2 4c-3-2-7-2-9 0ZM77 54c-4-3-9-3-13 0l2 4c3-2 7-2 9 0Z" fill="${fill}" opacity=".86"/>`;
}

function heroArtCape(c, role) {
  if (role === 'villain') {
    return `<path d="M31 55 8 104l25-7 8-27M89 55l23 49-25-7-8-27" fill="${c.deep}" opacity=".72" stroke="${c.accent}" stroke-width="1"/>
      <path d="M36 42 28 28l12 7M84 42l8-14-12 7" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>`;
  }
  if (role === 'anti') {
    return `<path d="M33 56 15 92l18-5 9-25M87 56l18 36-18-5-9-25" fill="${c.deep}" opacity=".82" stroke="${c.accent}" stroke-width="1" stroke-dasharray="4 3"/>
      <path d="M28 57 38 68M92 57 82 68" stroke="${c.accent}" stroke-width="2" opacity=".65"/>`;
  }
  return `<path d="M34 54 20 96l18-5 9-28M86 54l14 42-18-5-9-28" fill="${c.deep}" opacity=".75" stroke="${c.accent}" stroke-width="1"/>
    <path d="M39 49c6 4 36 4 42 0" fill="none" stroke="${c.accent}" stroke-width="2" opacity=".8"/>`;
}

function heroMotifArt(c) {
  return {
  arrow: `<path d="M94 43v42M86 51h17M93 43l-5-6M93 43l5-6M86 85l-3 4M103 85l3 4" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="2" stroke-linecap="round"/>
    <path d="M90 56 70 76" stroke="${HERO_ART_WHITE}" stroke-width="1.5" stroke-linecap="round" opacity=".85"/>
    <path d="M69 77l7-1-5-5Z" fill="${HERO_ART_GOLD}"/>`,
  star: `${heroArtStar(60, 27, 7, HERO_ART_GOLD)}<circle cx="60" cy="64" r="13" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="1.5" opacity=".55" stroke-dasharray="3 4"/>`,
  ant: `<path d="M50 31 42 20M70 31l8-11" stroke="${HERO_ART_INK}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="41" cy="18" r="3" fill="${HERO_ART_GOLD}"/><circle cx="79" cy="18" r="3" fill="${HERO_ART_GOLD}"/>
    <path d="M35 70h-9M35 78h-8M85 70h9M85 78h8" stroke="${c.deep}" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>`,
  wing: `<path d="M32 47C13 33 4 47 14 60c5 6 12 5 17-2M88 47c19-14 28 0 18 13-5 6-12 5-17-2" fill="${c.accent}" opacity=".48" stroke="${c.deep}" stroke-width="1"/>
    <path d="M29 50 17 46M30 57l-12-1M91 50l12-4M90 57l12-1" stroke="${HERO_ART_WHITE}" stroke-width="1.2" opacity=".7"/>`,
  metal: `<circle cx="60" cy="67" r="10" fill="${c.deep}" stroke="${c.accent}" stroke-width="2"/>
    <path d="M60 59l7 12H53Z" fill="${c.accent}"/>
    <path d="M43 80h34M46 84h28" stroke="${c.accent}" stroke-width="1.4" opacity=".6"/>`,
  cosmic: `<ellipse cx="60" cy="66" rx="26" ry="9" fill="none" stroke="${c.accent}" stroke-width="1.4" opacity=".75" transform="rotate(-18 60 66)"/>
    <circle cx="60" cy="66" r="4" fill="${HERO_ART_WHITE}"/>
    <circle cx="88" cy="57" r="2" fill="${HERO_ART_GOLD}"/><circle cx="32" cy="74" r="1.6" fill="${HERO_ART_GOLD}"/>`,
  blade: `<path d="M83 44 100 20l-4 23-9 9" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
    <path d="M80 47 66 61M76 50l5 5" stroke="${HERO_ART_WHITE}" stroke-width="2" stroke-linecap="round"/>
    <path d="M33 88 60 75" stroke="${c.deep}" stroke-width="2" opacity=".55"/>`,
  leaf: `<path d="M60 30c0-9 7-15 15-15-1 9-6 15-15 15ZM60 30c-6-8-15-8-20-3 5 7 13 8 20 3Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
    <path d="M60 31v9M50 84c-7-2-9-8-10-13 7 1 12 6 10 13ZM70 84c7-2 9-8 10-13-7 1-12 6-10 13Z" fill="${c.accent}" opacity=".8"/>`,
  storm: `<path d="M35 38c-8-1-12-9-5-14 2-7 12-9 17-3 8-3 16 3 14 11 7 4 4 12-3 13H35Z" fill="${c.light}" opacity=".55" stroke="${HERO_ART_WHITE}" stroke-width="1"/>
    <path d="M61 42 52 57h8l-5 13 15-18h-9l6-10Z" fill="${HERO_ART_GOLD}" stroke="${c.deep}" stroke-width="1"/>`,
  fist: `<path d="M77 71c8-5 17-2 19 5 2 7-4 13-12 13-7 0-12-4-13-10Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.4"/>
    <path d="M79 75h15M82 80h13M85 85h8" stroke="${c.deep}" stroke-width="1.3" opacity=".65"/>`,
  gem: `<path d="M60 29 70 41 60 53 50 41Z" fill="${c.accent}" stroke="${HERO_ART_WHITE}" stroke-width="1.6"/>
    <path d="M60 31v18M53 41h14" stroke="${HERO_ART_WHITE}" stroke-width="1" opacity=".7"/>
    <circle cx="60" cy="70" r="15" fill="none" stroke="${c.accent}" stroke-width="1" opacity=".45"/>`,
  bolt: `<path d="M53 52 44 68h8l-5 12 14-17h-8l7-11Z" fill="${HERO_ART_GOLD}" stroke="${c.deep}" stroke-width="1"/>
    <path d="M79 44h-8l3 7h-6M25 64h8l-2 6h6" stroke="${HERO_ART_GOLD}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
  bat: `<path d="M31 48C15 39 8 53 18 62c4 4 10 3 14-2M89 48c16-9 23 5 13 14-4 4-10 3-14-2" fill="${c.deep}" opacity=".82" stroke="${c.accent}" stroke-width="1"/>
    <path d="M60 61c-6 0-10 5-10 10 4-2 6 0 10 4 4-4 6-6 10-4 0-5-4-10-10-10Z" fill="${c.accent}" opacity=".85"/>`,
  crossbow: `<path d="M84 47h22M87 42l-6 5 6 6M103 42l6 5-6 6" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="2" stroke-linecap="round"/>
    <path d="M90 53 74 69" stroke="${HERO_ART_WHITE}" stroke-width="1.6"/>
    <circle cx="88" cy="55" r="5" fill="none" stroke="${c.accent}" stroke-width="1"/>`,
  magic: `<circle cx="60" cy="70" r="20" fill="none" stroke="${c.accent}" stroke-width="1.2" stroke-dasharray="4 5" opacity=".85"/>
    <path d="M60 55l4 10 10 5-10 5-4 10-4-10-10-5 10-5Z" fill="${HERO_ART_GOLD}" opacity=".8"/>
    <circle cx="60" cy="70" r="27" fill="none" stroke="${HERO_ART_WHITE}" stroke-width=".8" opacity=".35"/>`,
  claw: `<path d="M41 56 33 80M51 54 44 81M61 55 57 83" stroke="${HERO_ART_WHITE}" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
    <path d="M79 51c8 2 11 9 9 16" fill="none" stroke="${c.accent}" stroke-width="2" opacity=".7"/>`,
  shield: `<path d="M60 66c8-4 16-3 21 1 0 12-8 20-21 25-13-5-21-13-21-25 5-4 13-5 21-1Z" fill="${c.accent}" opacity=".28" stroke="${HERO_ART_GOLD}" stroke-width="1.8"/>
    <path d="M60 72l3 6 7 1-5 5 2 7-7-4-7 4 2-7-5-5 7-1Z" fill="${HERO_ART_GOLD}"/>`,
  mask: heroArtMask(c, HERO_ART_INK) + `<path d="M53 44c5-3 9-3 14 0" fill="none" stroke="${c.accent}" stroke-width="2" opacity=".8"/>`,
  rose: `<path d="M78 52c-7-2-13 2-14 8-1 5 3 9 8 9 6 0 10-5 8-11l-3 4-2-5-4 4-1-5-5 3c1-5 6-8 13-7Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
    <path d="M76 69c-2 8-8 12-14 16M76 72l8 2" stroke="${c.deep}" stroke-width="1.4" fill="none"/>`,
  shapeshift: `<path d="M60 66c-12-8-24 2-18 13 4 7 13 8 18 2 5 6 14 5 18-2 6-11-6-21-18-13Z" fill="${c.accent}" opacity=".38" stroke="${HERO_ART_WHITE}" stroke-width="1"/>
    <path d="M60 66c-5 6-5 12 0 18 5-6 5-12 0-18Z" fill="${c.deep}" opacity=".8"/>`,
  fang: `<path d="M50 78l4 8 4-8M62 78l4 8 4-8" fill="${HERO_ART_WHITE}" stroke="${c.deep}" stroke-width=".8"/>
    <path d="M34 62c-4 8-2 16 4 20M86 62c4 8 2 16-4 20" fill="none" stroke="${c.accent}" stroke-width="2" opacity=".65"/>`,
  armor: `<path d="M42 62h36l-4 24H46Z" fill="${c.deep}" opacity=".55" stroke="${c.accent}" stroke-width="1.4"/>
    <path d="M48 62v24M72 62v24M42 72h36" stroke="${c.accent}" stroke-width="1" opacity=".8"/>
    <path d="M34 54l-7 8 7 5M86 54l7 8-7 5" fill="${c.accent}" opacity=".65"/>`,
  time: `<circle cx="60" cy="37" r="12" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="1.6" stroke-dasharray="4 3"/>
    <path d="M60 31v7l5 3M43 77c8-5 26-5 34 0" fill="none" stroke="${c.accent}" stroke-width="1.4" opacity=".7"/>
    <path d="M50 68h20M60 60v16" stroke="${c.accent}" stroke-width="1" opacity=".5"/>`,
  sand: `<path d="M31 92c5-10 12-4 17-11 4-6 12-5 15 2 3 6 11 4 16 10" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".75"/>
    <circle cx="43" cy="77" r="1.6" fill="${c.accent}"/><circle cx="53" cy="70" r="1.2" fill="${c.accent}"/><circle cx="75" cy="74" r="1.5" fill="${c.accent}"/>`,
  mind: `<path d="M37 42c5-10 17-13 25-7 7-6 19-2 21 7 8 2 8 12 1 15-2 9-13 12-20 6-7 6-18 4-21-4-9-1-11-12-6-17Z" fill="${HERO_ART_WHITE}" opacity=".3" stroke="${c.accent}" stroke-width="1.2"/>
    <path d="M48 45c4 4 1 9 5 12M61 38c-4 5 2 8-1 14M73 45c-4 4-1 9-4 12" stroke="${c.accent}" stroke-width="1.3" fill="none"/>`,
  tech: `<path d="M43 57h34M38 62h44" stroke="${c.accent}" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
    <circle cx="80" cy="57" r="3" fill="${HERO_ART_GOLD}"/>
    <path d="M48 74h24M52 78h16M56 82h8" stroke="${c.accent}" stroke-width="1" opacity=".7"/>`,
  ice: `<path d="M60 34v18M51 39l18 8M69 39l-18 8M60 34l-3 5M60 34l3 5" stroke="${c.accent}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M36 77h10l-5-7 8 2M84 77H74l5-7-8 2" stroke="${HERO_ART_WHITE}" stroke-width="1.2" fill="none" opacity=".7"/>`,
  eye: `<path d="M42 66c12-14 24-14 36 0-12 14-24 14-36 0Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.4"/>
    <circle cx="60" cy="66" r="7" fill="${c.accent}"/><circle cx="60" cy="66" r="3" fill="${HERO_ART_INK}"/>
    <path d="M44 52l-6-4M76 52l6-4" stroke="${c.accent}" stroke-width="1.2" opacity=".7"/>`,
  riddle: `<path d="M52 42c0-7 5-12 12-12 8 0 12 6 10 12-1 5-6 6-8 10v3" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="66" cy="62" r="2" fill="${HERO_ART_GOLD}"/>
    <path d="M38 75c4-4 8-5 12-2M70 73c4-3 8-2 12 2" fill="none" stroke="${c.accent}" stroke-width="1.4" opacity=".6"/>`,
  coin: `<circle cx="60" cy="70" r="12" fill="${HERO_ART_GOLD}" stroke="${c.deep}" stroke-width="1.4"/>
    <path d="M60 63v14M56 66c5-3 9 0 8 4-4 2-7 1-7 4 0 3 5 4 8 1" fill="none" stroke="${c.deep}" stroke-width="1.4" stroke-linecap="round"/>`,
  skull: `<path d="M50 61c0-7 4-11 10-11s10 4 10 11c0 5-3 7-3 10H53c0-3-3-5-3-10Z" fill="${HERO_ART_WHITE}" stroke="${c.deep}" stroke-width="1"/>
    <circle cx="56" cy="64" r="2.2" fill="${c.deep}"/><circle cx="64" cy="64" r="2.2" fill="${c.deep}"/>
    <path d="M57 68h6M57 71v4M63 71v4" stroke="${c.deep}" stroke-width="1"/>`,
  flame: `<path d="M60 31c6-8 15-5 14 3 8-1 10 8 4 12 6 6 1 14-7 13 0 8-10 11-14 4-8 5-15-3-10-9-7-7 1-16 8-13-1-6 3-10 5-10Z" fill="${c.accent}" opacity=".8" stroke="${HERO_ART_GOLD}" stroke-width="1"/>
    <path d="M60 44c3-5 8-3 7 2 4 4-1 9-5 7-4 2-6-2-5-5-2-1-1-4 3-4Z" fill="${HERO_ART_GOLD}"/>`,
  moon: `<path d="M70 23c-16 2-25 17-19 30 5 11 19 16 30 9-12-1-18-12-15-22 2-8 8-14 15-16-4-2-8-3-11-1Z" fill="${HERO_ART_GOLD}" opacity=".9"/>
    <path d="M77 27l1.5 4 4 1-4 1.5-1.5 4-1.5-4-4-1.5 4-1Z" fill="${HERO_ART_WHITE}"/>`,
  chain: `<path d="M32 55c10-9 19-9 28 0 9 9 19 9 28 0" fill="none" stroke="${HERO_ART_WHITE}" stroke-width="3" stroke-linecap="round" opacity=".45"/>
    <path d="M35 67c9-8 18-8 25 0 7 8 16 8 25 0" fill="none" stroke="${c.accent}" stroke-width="2" stroke-dasharray="5 3" opacity=".8"/>`,
  ears: `<circle cx="43" cy="29" r="10" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.6"/><circle cx="77" cy="29" r="10" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.6"/><path d="M46 50c4-9 24-9 28 0" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="2" stroke-linecap="round"/>`,
  bow: `<path d="M45 31c-9-8-16 2-8 9 4 4 8 2 8-2 0 4 4 6 8 2 8-7 1-17-8-9Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/><circle cx="45" cy="36" r="3" fill="${HERO_ART_GOLD}"/>`,
  crown: `<path d="M39 44 45 24l10 9 8-13 8 13 10-9 6 20Z" fill="${HERO_ART_GOLD}" stroke="${c.deep}" stroke-width="1.4"/><circle cx="51" cy="39" r="2" fill="${c.accent}"/><circle cx="60" cy="37" r="2" fill="${c.accent}"/><circle cx="69" cy="39" r="2" fill="${c.accent}"/>`,
  snow: `<path d="M60 25v30M47 32l26 16M73 32 47 48" stroke="${HERO_ART_WHITE}" stroke-width="1.8" stroke-linecap="round"/><circle cx="60" cy="40" r="4" fill="none" stroke="${c.accent}" stroke-width="1.2"/><circle cx="60" cy="54" r="2" fill="${HERO_ART_GOLD}"/><circle cx="50" cy="46" r="1.6" fill="${HERO_ART_GOLD}"/><circle cx="70" cy="46" r="1.6" fill="${HERO_ART_GOLD}"/>`,
  shell: `<path d="M40 58c0-15 9-25 20-25s20 10 20 25c-7-4-13-4-20 0-7-4-13-4-20 0Z" fill="${c.accent}" opacity=".55" stroke="${HERO_ART_WHITE}" stroke-width="1.4"/><path d="M60 34v22M50 38l4 18M70 38l-4 18" stroke="${c.deep}" stroke-width="1.2" opacity=".7"/>`,
  apple: `<path d="M60 40c-10-6-20 2-17 13 2 9 10 15 17 15s15-6 17-15c3-11-7-19-17-13Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.4"/><path d="M60 41c0-7 3-11 8-13" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="2" stroke-linecap="round"/><path d="M67 31c5-4 10-2 11 1-4 3-8 3-11-1Z" fill="${c.accent}"/>`,
  lamp: `<path d="M38 62c4-8 12-12 22-12s18 4 22 12c-6 6-14 8-22 8s-16-2-22-8Z" fill="${HERO_ART_GOLD}" stroke="${c.deep}" stroke-width="1.4"/><path d="M78 57c8 0 12 4 12 9M38 63c-7 0-10 4-9 8" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="2" stroke-linecap="round"/><path d="M53 50c3-6 11-6 14 0" fill="none" stroke="${HERO_ART_WHITE}" stroke-width="2"/>`,
  balloon: `<ellipse cx="60" cy="43" rx="14" ry="17" fill="${c.accent}" opacity=".7" stroke="${HERO_ART_WHITE}" stroke-width="1.4"/><path d="M60 60c-5 8 5 12 0 20" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="1.6" stroke-linecap="round"/><path d="M56 66h8" stroke="${HERO_ART_GOLD}" stroke-width="1.4"/>`,
  paw: `<ellipse cx="60" cy="68" rx="14" ry="12" fill="${c.accent}" opacity=".65" stroke="${HERO_ART_WHITE}" stroke-width="1.2"/><circle cx="47" cy="55" r="5" fill="${c.accent}"/><circle cx="59" cy="50" r="5" fill="${c.accent}"/><circle cx="71" cy="55" r="5" fill="${c.accent}"/>`,
  rocket: `<path d="M60 25c8 8 11 18 8 29H52c-3-11 0-21 8-29Z" fill="${c.accent}" stroke="${HERO_ART_WHITE}" stroke-width="1.4"/><circle cx="60" cy="43" r="5" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/><path d="M52 49l-8 10 8-1M68 49l8 10-8-1" fill="${c.accent}"/><path d="M56 58 60 70l4-12" fill="${HERO_ART_GOLD}"/>`,
  fish: `<path d="M38 60c8-10 24-10 32 0-8 10-24 10-32 0Z" fill="${c.accent}" opacity=".65" stroke="${HERO_ART_WHITE}" stroke-width="1.4"/><path d="M70 60l12-8v16Z" fill="${c.accent}"/><circle cx="49" cy="57" r="2.2" fill="${c.deep}"/><circle cx="78" cy="43" r="2" fill="none" stroke="${HERO_ART_WHITE}" stroke-width="1.2"/>`,
  monster: `<path d="M39 64c0-17 9-27 21-27s21 10 21 27c0 8-8 12-21 12s-21-4-21-12Z" fill="${c.accent}" opacity=".55" stroke="${HERO_ART_WHITE}" stroke-width="1.4"/><path d="M45 40 38 28l12 6M75 40l7-12-12 6" fill="${c.accent}"/><circle cx="52" cy="58" r="4" fill="${c.deep}"/><circle cx="68" cy="58" r="4" fill="${c.deep}"/><path d="M53 72h14" stroke="${HERO_ART_WHITE}" stroke-width="2" stroke-linecap="round"/>`,
  key: `<circle cx="50" cy="45" r="9" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="3"/><path d="M57 52l16 16M66 64l7-7M72 70l6-6" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="3" stroke-linecap="round"/><circle cx="49" cy="44" r="2" fill="${HERO_ART_WHITE}"/>`,
  clock: `<circle cx="60" cy="58" r="17" fill="${c.light}" stroke="${HERO_ART_GOLD}" stroke-width="2"/><path d="M60 48v10l7 5" fill="none" stroke="${c.deep}" stroke-width="2.4" stroke-linecap="round"/><circle cx="60" cy="58" r="2.4" fill="${c.accent}"/>`,
  sparkle: `<path d="M60 27l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="${HERO_ART_GOLD}" stroke="${c.deep}" stroke-width=".8"/><path d="M41 48l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z" fill="${HERO_ART_WHITE}"/><path d="M80 62l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z" fill="${c.accent}"/>`,
  note: `<path d="M66 35v26M66 35l14-4v10" fill="none" stroke="${HERO_ART_WHITE}" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="59" cy="62" rx="9" ry="7" fill="${c.accent}" stroke="${HERO_ART_WHITE}" stroke-width="1"/><ellipse cx="81" cy="56" rx="7" ry="6" fill="${c.accent}" stroke="${HERO_ART_WHITE}" stroke-width="1"/>`,
  heart: `<path d="M60 78C40 64 34 52 42 44c6-6 14-4 18 4 4-8 12-10 18-4 8 8 2 20-18 34Z" fill="${c.accent}" opacity=".75" stroke="${HERO_ART_WHITE}" stroke-width="1.4"/><path d="M78 32l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z" fill="${HERO_ART_GOLD}"/>`,
  gear: `<circle cx="60" cy="58" r="14" fill="none" stroke="${HERO_ART_GOLD}" stroke-width="3"/><circle cx="60" cy="58" r="4" fill="${HERO_ART_GOLD}"/><path d="M60 38v-6M60 78v6M40 58h-6M80 58h6M46 44l-4-4M74 72l4 4M74 44l4-4M46 72l-4 4" stroke="${HERO_ART_GOLD}" stroke-width="3" stroke-linecap="round"/>`,
  };
}

function signatureHero(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  const artKey = meta && (meta.disneyArt || meta.heroMotif);
  if (!meta || !artKey) return '';
  const isDisney = !!meta.disneyGroup;
  const role = meta.heroRole || 'hero';
  const aura = isDisney
    ? `<ellipse cx="60" cy="91" rx="30" ry="4" fill="${HERO_ART_GOLD}" opacity=".18"/><circle cx="60" cy="29" r="2" fill="${HERO_ART_WHITE}" opacity=".7"/>`
    : role === 'villain'
      ? `<ellipse cx="60" cy="89" rx="39" ry="6" fill="${c.deep}" opacity=".32"/><path d="M40 34 34 24M80 34l6-10" stroke="${c.accent}" stroke-width="2" opacity=".55"/>`
      : role === 'anti'
        ? `<path d="M31 88c8-4 14-2 20 2 6 4 14 4 20 0 5-3 11-4 18-1" fill="none" stroke="${c.deep}" stroke-width="3" opacity=".35"/>`
        : `<ellipse cx="60" cy="91" rx="28" ry="4" fill="${HERO_ART_GOLD}" opacity=".16"/>`;
  const cape = isDisney ? '' : heroArtCape(c, role);
  const mask = !isDisney && role === 'anti' ? heroArtMask(c, c.deep) : '';
  const badge = !isDisney && role === 'hero'
    ? `<circle cx="47" cy="80" r="3.2" fill="${c.accent}" opacity=".9"/>`
    : '';
  return `<g class="hero-signature">${aura}${cape}${mask}${badge}${heroMotifArt(c)[artKey] || ''}</g>`;
}
