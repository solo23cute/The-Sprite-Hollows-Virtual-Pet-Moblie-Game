/* Original procedural art for the 1,025-species Pokédex wave.
   Shape, horns, tails, markings, and type jewelry come from the national dex seed. */

function pdxMark(type, fill, stroke) {
  switch (type) {
    case 'fire':
      return `<path d="M0 7C-7 3-5-4 0-8 2-3 7-1 5 4 4 6 2 7 0 7Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/><path d="M1 5C-2 3-1 0 1-2 3 0 4 2 2 4Z" fill="${stroke}" opacity=".45"/>`;
    case 'water':
      return `<path d="M0-8C4-3 7 1 7 4A7 7 0 0 1-7 4C-7 1-4-3 0-8Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/><path d="M-2 4c0-2 1-3 3-4" stroke="${stroke}" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".6"/>`;
    case 'electric':
      return `<path d="M1-8-6 1h5L-1 8 7-2H2Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`;
    case 'grass':
      return `<path d="M-6 6C-8-2 0-8 7-7 6 1 0 7-6 6Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/><path d="M-4 6C-1 2 2-1 6-4" stroke="${stroke}" stroke-width="1.1" fill="none" opacity=".65"/>`;
    case 'ice':
      return `<g stroke="${fill}" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M0-8V8M-7-4 7 4M7-4-7 4"/><path d="M-5-6 0-3 5-6M-5 6 0 3 5 6"/></g>`;
    case 'fighting':
      return `<path d="M0-8 2.2-2.2 8 0 2.2 2.2 0 8-2.2 2.2-8 0-2.2-2.2Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/><circle r="2" fill="${stroke}" opacity=".5"/>`;
    case 'poison':
      return `<g fill="${fill}" stroke="${stroke}" stroke-width=".7"><circle cx="-4" cy="2" r="3.5"/><circle cx="4" cy="-2" r="2.7"/><circle cx="4" cy="5" r="1.7"/></g>`;
    case 'ground':
      return `<path d="M-8 6-2-5 2 1 5-3 8 6Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/><path d="M-2-5v11M5-3v9" stroke="${stroke}" stroke-width="1" opacity=".45"/>`;
    case 'flying':
      return `<path d="M-8 5C-5-5 2-8 8-6 4-3 2-1 1 3 0 0-2-1-3 1-4-2-6-1-8 5Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`;
    case 'psychic':
      return `<path d="M0-7C6-7 8-2 6 2 4 6 0 7-3 5-6 3-5-1-2-2 1-3 3-1 2 1 1 2 0 1 0 0" fill="none" stroke="${fill}" stroke-width="1.7" stroke-linecap="round"/><circle cx="5" cy="-4" r="1.4" fill="${fill}"/>`;
    case 'bug':
      return `<g stroke="${fill}" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M0-5v11M-4-5 0-2 4-5M-5 1h10M-4 6 0 3 4 6"/></g><circle cy="1" r="2.2" fill="${fill}"/>`;
    case 'rock':
      return `<path d="M0-8 7-2 4 7H-4L-7-2Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/><path d="M0-8v6M-7-2 0-2l7 0" stroke="${stroke}" stroke-width=".9" opacity=".55"/>`;
    case 'ghost':
      return `<path d="M0-8C6-8 8-4 7 1 6 5 4 8 0 6 0 8-3 8-4 6-8 7-8-3-6-5-4-7-2-8 0-8Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/><circle cx="-2.5" cy="0" r="1.2" fill="${stroke}"/><circle cx="2.5" cy="0" r="1.2" fill="${stroke}"/>`;
    case 'dragon':
      return `<path d="M0-8 6-3 4 4 0 8-4 4-6-3Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/><path d="M-6-3 0-5l6 2M0-5v9" stroke="${stroke}" stroke-width="1" opacity=".55"/>`;
    case 'dark':
      return `<path d="M2-8A8 8 0 1 0 7 3 7 7 0 0 1 2-8Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/><circle cx="4" cy="-4" r="1.2" fill="${stroke}"/>`;
    case 'steel':
      return `<g stroke="${fill}" stroke-width="1.7" fill="none"><circle r="4.6"/><path d="M0-8v3M0 5v3M-8 0h3M5 0h3M-6-6l2 2M4 4l2 2M6-6 4-4M-4 4l-2 2"/></g>`;
    case 'fairy':
      return `<path d="M0-9 2.3-2.3 9 0 2.3 2.3 0 9-2.3 2.3-9 0-2.3-2.3Z" fill="${fill}" stroke="${stroke}" stroke-width=".7"/><circle r="1.8" fill="${stroke}" opacity=".5"/>`;
    default:
      return `<path d="M0-8 2.2-2.2 8 0 2.2 2.2 0 8-2.2 2.2-8 0-2.2-2.2Z" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`;
  }
}

function pdxEars(shape, seed, c) {
  if (['fish', 'wings', 'bug-wings', 'ghost', 'tentacles'].includes(shape)) return '';
  const variant = seed % 4;
  if (variant === 0) {
    return `<circle cx="35" cy="28" r="10" fill="${c.body}" stroke="${c.deep}" stroke-width="1.3"/><circle cx="85" cy="28" r="10" fill="${c.body}" stroke="${c.deep}" stroke-width="1.3"/><circle cx="35" cy="28" r="5" fill="${c.accent}" opacity=".45"/><circle cx="85" cy="28" r="5" fill="${c.accent}" opacity=".45"/>`;
  }
  if (variant === 1) {
    return `<path d="M35 36 26 16 44 27M85 36 94 16 76 27" fill="${c.body}" stroke="${c.deep}" stroke-width="1.3" stroke-linejoin="round"/><path d="M35 31 31 22l7 5M85 31l4-9-7 5" fill="${c.accent}" opacity=".4"/>`;
  }
  if (variant === 2) {
    return `<ellipse cx="31" cy="28" rx="8" ry="15" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" transform="rotate(-18 31 28)"/><ellipse cx="89" cy="28" rx="8" ry="15" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" transform="rotate(18 89 28)"/><ellipse cx="31" cy="28" rx="4" ry="8" fill="${c.accent}" opacity=".35" transform="rotate(-18 31 28)"/><ellipse cx="89" cy="28" rx="4" ry="8" fill="${c.accent}" opacity=".35" transform="rotate(18 89 28)"/>`;
  }
  return `<path d="M43 31C35 20 37 11 42 8c5 4 7 10 7 17M77 31c8-11 6-20 1-23-5 4-7 10-7 17" fill="${c.light}" stroke="${c.deep}" stroke-width="1.3" stroke-linejoin="round"/><path d="M44 23c-2-6-1-10 1-12 2 3 3 6 3 10M76 23c2-6 1-10-1-12-2 3-3 6-3 10" fill="${c.accent}" opacity=".55"/>`;
}

function pdxCrest(shape, seed, c) {
  if (seed % 3 === 0) {
    return `<path d="M60 25c-3-8-1-15 0-19 4 6 5 13 3 19Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/><path d="M56 24c-5-6-6-12-5-16M64 24c5-6 6-12 5-16" stroke="${c.accent}" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".7"/>`;
  }
  if (shape === 'wings') {
    return `<path d="M53 28c-4-9 1-15 7-18 1 6 0 13-2 18Z" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>`;
  }
  return '';
}

function pdxWings(shape, c) {
  if (shape === 'wings') {
    return `<path d="M34 58C15 38 5 48 12 65c3 7 12 8 18 2M86 58c19-20 29-10 22 7-3 7-12 8-18 2" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2" opacity=".9"/><path d="M29 59C19 49 13 53 17 62M91 59c10-10 16-6 12 3" stroke="${c.accent}" stroke-width="1.2" fill="none" opacity=".7"/><path d="M54 78l6 4 6-4" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>`;
  }
  if (shape === 'bug-wings') {
    return `<ellipse cx="27" cy="61" rx="16" ry="21" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2" opacity=".82" transform="rotate(24 27 61)"/><ellipse cx="93" cy="61" rx="16" ry="21" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2" opacity=".82" transform="rotate(-24 93 61)"/><circle cx="28" cy="59" r="4" fill="${c.accent}" opacity=".55"/><circle cx="92" cy="59" r="4" fill="${c.accent}" opacity=".55"/><path d="M48 29c-2-9 0-15 3-18M72 29c2-9 0-15-3-18" stroke="${c.deep}" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="50" cy="8" r="2.3" fill="${c.accent}"/><circle cx="70" cy="8" r="2.3" fill="${c.accent}"/>`;
  }
  return '';
}

function pdxTail(shape, seed, c) {
  if (shape === 'fish') {
    return `<path d="M89 82c9-11 17-12 19-8-1 7-6 12-13 16 7 2 11 6 12 12-5 2-14-2-20-10Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round" opacity=".9"/><path d="M90 88c8 1 13 5 16 10" stroke="${c.light}" stroke-width="1.1" fill="none" opacity=".7"/>`;
  }
  if (shape === 'wings') {
    return `<path d="M78 92c8 2 15 0 19-5-2 9-8 14-16 15Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" opacity=".85"/>`;
  }
  if (shape === 'ghost') {
    return `<path d="M48 94c8 12 16 12 24 0M34 83c-8 10-7 20 1 24 4-3 6-8 5-13" fill="${c.light}" opacity=".28" stroke="${c.light}" stroke-width="1" stroke-dasharray="3 4"/>`;
  }
  const variant = Math.floor(seed / 5) % 5;
  if (variant === 0) {
    return `<path d="M87 84c9-9 16-7 17 2 1 7-5 11-12 9 2 5-1 9-6 8-4-1-4-6-1-8Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1" opacity=".9"/>`;
  }
  if (variant === 1) {
    return `<path d="M88 84c7 1 12 6 11 12-7 1-12-3-15-9Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/><path d="M91 87c3 3 5 6 5 9" stroke="${c.accent}" stroke-width="1" fill="none" opacity=".7"/>`;
  }
  if (variant === 2) {
    return `<path d="M88 85l9-4-3 8 10 3-13 3-4 9-3-12-10-5 12-1Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>`;
  }
  if (variant === 3) {
    return `<path d="M86 84c10-5 18-2 22 5-8 5-16 5-24 0Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/><path d="M92 86c5 0 9 1 12 3" stroke="${c.accent}" stroke-width="1.1" fill="none"/>`;
  }
  return `<path d="M88 84c8 0 14 5 14 11l-7-2-2 7c-4-4-7-9-7-16Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" opacity=".9"/>`;
}

function pdxShapeExtras(shape, seed, c) {
  if (shape === 'quadruped') {
    return `<ellipse cx="40" cy="99" rx="9" ry="5" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/><ellipse cx="53" cy="102" rx="8" ry="4" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/><ellipse cx="68" cy="102" rx="8" ry="4" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/><ellipse cx="80" cy="99" rx="9" ry="5" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/><path d="M37 91c7-2 14-2 21 0" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".5"/>`;
  }
  if (shape === 'fish') {
    return `<path d="M52 30c4-12 12-17 20-17-1 9-4 15-9 19Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" opacity=".85"/><path d="M29 66c-11 3-14 9-10 14 5 2 10-2 13-7" fill="${c.light}" stroke="${c.deep}" stroke-width="1" opacity=".75"/><circle cx="27" cy="46" r="2.5" fill="${c.light}" opacity=".55"/><circle cx="20" cy="35" r="1.8" fill="${c.light}" opacity=".4"/>`;
  }
  if (shape === 'arms') {
    return `<path d="M34 66c-13 5-18 15-13 24 4 6 12 3 14-4 2-5 3-9 8-12M86 66c13 5 18 15 13 24-4 6-12 3-14-4-2-5-3-9-8-12" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/><circle cx="28" cy="91" r="9" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/><circle cx="92" cy="91" r="9" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>`;
  }
  if (shape === 'upright' || shape === 'humanoid') {
    return `<path d="M34 68c-7 10-8 19-4 27M86 68c7 10 8 19 4 27" fill="none" stroke="${c.deep}" stroke-width="4" stroke-linecap="round" opacity=".35"/><ellipse cx="44" cy="104" rx="9" ry="4" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/><ellipse cx="76" cy="104" rx="9" ry="4" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>${shape === 'humanoid' ? `<path d="M40 54c-5 5-5 12 0 16M80 54c5 5 5 12 0 16" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".55"/>` : ''}`;
  }
  if (shape === 'legs') {
    return `<ellipse cx="45" cy="98" rx="10" ry="13" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/><ellipse cx="75" cy="98" rx="10" ry="13" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/><ellipse cx="43" cy="108" rx="10" ry="4" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/><ellipse cx="77" cy="108" rx="10" ry="4" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>`;
  }
  if (shape === 'tentacles') {
    return `<path d="M35 89c-7 7-10 14-8 21 1 5 8 5 10 0 2-6 4-11 7-15M85 89c7 7 10 14 8 21-1 5-8 5-10 0-2-6-4-11-7-15M51 94c-3 7-3 12 0 17 2 3 7 1 7-3 0-4 0-8 2-12M69 94c3 7 3 12 0 17-2 3-7 1-7-3 0-4 0-8-2-12" fill="none" stroke="${c.accent}" stroke-width="5" stroke-linecap="round" opacity=".65"/>`;
  }
  if (shape === 'ball') {
    return `<ellipse cx="45" cy="103" rx="8" ry="4" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/><ellipse cx="75" cy="103" rx="8" ry="4" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/><path d="M34 77c-5 5-5 13-1 18M86 77c5 5 5 13 1 18" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".35"/>`;
  }
  if (shape === 'blob') {
    return `<path d="M36 92c-2 7 2 12 8 11 3-1 4-4 4-8M84 92c2 7-2 12-8 11-3-1-4-4-4-8" fill="${c.body}" stroke="${c.deep}" stroke-width="1" opacity=".9"/><path d="M38 70c-5 3-8 8-6 12M82 70c5 3 8 8 6 12" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".35"/>`;
  }
  if (shape === 'squiggle') {
    return `<path d="M82 76c12-3 16 5 11 12-4 5-11 2-10-4" fill="none" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/><path d="M40 96c4 4 8 6 14 6M66 102c5 0 10-2 14-6" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".35"/>`;
  }
  if (shape === 'heads') {
    return `<circle cx="32" cy="56" r="13" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/><circle cx="88" cy="56" r="13" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/><circle cx="28" cy="53" r="2.2" fill="${c.deep}"/><circle cx="36" cy="53" r="2.2" fill="${c.deep}"/><circle cx="84" cy="53" r="2.2" fill="${c.deep}"/><circle cx="92" cy="53" r="2.2" fill="${c.deep}"/><circle cx="32" cy="61" r="4" fill="${c.light}" opacity=".4"/><circle cx="88" cy="61" r="4" fill="${c.light}" opacity=".4"/>`;
  }
  if (shape === 'armor') {
    return `<path d="M31 49 40 42l8 8-8 8ZM89 49l-9-7-8 8 8 8Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/><path d="M44 87h32l4 8H40Z" fill="${c.light}" opacity=".3" stroke="${c.deep}" stroke-width="1"/><path d="M52 82h16M55 90h10" stroke="${c.accent}" stroke-width="1.4" opacity=".6"/>`;
  }
  return '';
}

function pdxPattern(seed, c) {
  const variant = seed % 8;
  if (variant === 0) {
    return `<path d="M35 64c4 1 7 4 8 8M85 64c-4 1-7 4-8 8M39 72c3 1 5 3 6 5M81 72c-3 1-5 3-6 5" stroke="${c.deep}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".4"/>`;
  }
  if (variant === 1) {
    return `<circle cx="51" cy="38" r="2.4" fill="${c.light}" opacity=".55"/><circle cx="60" cy="34" r="3.3" fill="${c.light}" opacity=".55"/><circle cx="69" cy="38" r="2.4" fill="${c.light}" opacity=".55"/><path d="M48 84c8-4 16-4 24 0" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".45"/>`;
  }
  if (variant === 2) {
    return `<ellipse cx="60" cy="86" rx="14" ry="8" fill="${c.light}" opacity=".35"/><path d="M54 85c4-2 8-2 12 0" stroke="${c.accent}" stroke-width="1.2" fill="none" opacity=".65"/><circle cx="38" cy="45" r="2" fill="${c.light}" opacity=".5"/>`;
  }
  if (variant === 3) {
    return `<path d="M60 29l6 6-6 6-6-6Z" fill="${c.accent}" opacity=".65" stroke="${c.deep}" stroke-width=".8"/><path d="M35 79c4-2 7-2 10 0M75 79c3-2 6-2 10 0" stroke="${c.light}" stroke-width="1.3" fill="none" opacity=".45"/>`;
  }
  if (variant === 4) {
    return `<path d="M44 57c3 2 5 2 8 0M68 57c3 2 5 2 8 0" stroke="${c.deep}" stroke-width="1.7" fill="none" stroke-linecap="round" opacity=".45"/><path d="M51 90c6-3 12-3 18 0" stroke="${c.light}" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".55"/><circle cx="35" cy="49" r="2" fill="${c.accent}" opacity=".6"/>`;
  }
  if (variant === 5) {
    return `<path d="M43 67h34M49 75h22" stroke="${c.light}" stroke-width="1.5" fill="none" opacity=".5"/><path d="M60 57l4.5 4.5-4.5 4.5-4.5-4.5Z" fill="${c.accent}" opacity=".6" stroke="${c.deep}" stroke-width=".7"/><circle cx="81" cy="45" r="2.3" fill="${c.light}" opacity=".6"/>`;
  }
  if (variant === 6) {
    return `<path d="M43 43l1.5 3.5 3.5 1.5-3.5 1.5L43 53l-1.5-3.5L38 48l3.5-1.5Z" fill="${c.accent}" opacity=".7"/><path d="M77 53l1.2 2.8 2.8 1.2-2.8 1.2L77 61l-1.2-2.8L73 57l2.8-1.2Z" fill="${c.light}" opacity=".7"/><circle cx="56" cy="89" r="1.8" fill="${c.light}" opacity=".55"/><circle cx="64" cy="89" r="1.8" fill="${c.light}" opacity=".55"/>`;
  }
  return `<path d="M42 84c6-5 12-5 18 0s12 5 18 0" stroke="${c.accent}" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".6"/><path d="M47 39c3-2 6-3 9-2" stroke="${c.light}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".55"/><circle cx="81" cy="72" r="2.1" fill="${c.deep}" opacity=".3"/>`;
}

function signaturePokedex(el, c) {
  if (typeof POKEDEX_META === 'undefined') return '';
  const meta = POKEDEX_META[el];
  if (!meta) return '';
  const seed = meta.dex;
  const second = meta.type2 ? PDX_TYPES[meta.type2] : null;
  const badge = `<g transform="translate(99 31)">
    <circle r="8" fill="${c.deep}" stroke="${c.light}" stroke-width="1.1"/>
    <g transform="scale(.62)">${pdxMark(meta.type1, c.light, c.accent)}</g>
    ${second ? `<circle cx="6" cy="6" r="2.8" fill="${second.primary}" stroke="${c.light}" stroke-width=".8"/>` : ''}
  </g>`;
  const aura = `<g opacity=".48"><g transform="translate(22 48) scale(.46)">${pdxMark(meta.type1, c.accent, c.deep)}</g><g transform="translate(101 74) scale(.32)">${pdxMark(meta.type1, c.accent, c.deep)}</g></g>`;
  const halo = (meta.legendary || meta.mythical)
    ? `<ellipse cx="60" cy="16" rx="24" ry="4.6" fill="none" stroke="#ffd166" stroke-width="1.2" opacity=".7"/><g fill="#ffe08a" opacity=".9"><path d="M22 29l1.3 3.7 3.7 1.3-3.7 1.3L22 39l-1.3-3.7L17 34l3.7-1.3Z"/><path d="M98 51l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1Z"/></g>`
    : '';
  return `${halo}${pdxEars(meta.shape, seed, c)}${pdxCrest(meta.shape, seed, c)}${pdxWings(meta.shape, c)}${pdxTail(meta.shape, seed, c)}${pdxShapeExtras(meta.shape, seed, c)}${pdxPattern(seed, c)}${badge}${aura}`;
}
