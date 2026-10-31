/* Original vector signatures for the Care Bears & Cousins wave.
   The shared sprite body supplies the face; these layers add species ears,
   a belly badge, and a few soft sparkles. No imported character art is used. */

const CARE_BEAR_GOLD = '#ffd166';

function signatureCareBear(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.careBearGroup) return '';
  const art = meta.careBearArt || 'heart';
  return `<g class="carebear-signature">
    ${careBearEars(art, c)}
    <ellipse cx="60" cy="88" rx="14.5" ry="10.5" fill="${c.light}" stroke="${CARE_BEAR_GOLD}" stroke-width="1.4" opacity=".96"/>
    <ellipse cx="60" cy="88" rx="12.5" ry="8.7" fill="none" stroke="${c.deep}" stroke-width=".8" opacity=".2"/>
    ${careBearBadgeMark(art, c)}
    ${careBearSparkles(c)}
  </g>`;
}

function careBearEars(art, c) {
  if (art === 'rabbit') {
    return `
      <ellipse cx="43" cy="17" rx="7" ry="17" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" transform="rotate(-8 43 17)"/>
      <ellipse cx="43" cy="17" rx="3.2" ry="11" fill="${c.light}" opacity=".9" transform="rotate(-8 43 17)"/>
      <ellipse cx="77" cy="17" rx="7" ry="17" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" transform="rotate(8 77 17)"/>
      <ellipse cx="77" cy="17" rx="3.2" ry="11" fill="${c.light}" opacity=".9" transform="rotate(8 77 17)"/>`;
  }
  if (art === 'elephant') {
    return `
      <ellipse cx="29" cy="50" rx="17" ry="21" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2" opacity=".9"/>
      <ellipse cx="29" cy="50" rx="10" ry="13" fill="${c.accent}" opacity=".18"/>
      <ellipse cx="91" cy="50" rx="17" ry="21" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2" opacity=".9"/>
      <ellipse cx="91" cy="50" rx="10" ry="13" fill="${c.accent}" opacity=".18"/>`;
  }
  if (art === 'monkey') {
    return `
      <circle cx="28" cy="53" r="11" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
      <circle cx="28" cy="53" r="5.5" fill="${c.accent}" opacity=".3"/>
      <circle cx="92" cy="53" r="11" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
      <circle cx="92" cy="53" r="5.5" fill="${c.accent}" opacity=".3"/>`;
  }
  if (art === 'penguin') {
    return `
      <path d="M44 29c-1-8 3-13 8-15 2 6 1 11-2 16Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M76 29c1-8-3-13-8-15-2 6-1 11 2 16Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>`;
  }
  if (art === 'lion') {
    return `
      <circle cx="60" cy="52" r="42" fill="none" stroke="${c.accent}" stroke-width="5" opacity=".2"/>
      ${Array.from({ length: 10 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
        const x = 60 + Math.cos(angle) * 40;
        const y = 53 + Math.sin(angle) * 39;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${c.accent}" opacity=".2"/>`;
      }).join('')}
      <circle cx="39" cy="31" r="10" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
      <circle cx="81" cy="31" r="10" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>`;
  }
  if (art === 'raccoon' || art === 'pig') {
    return `
      <path d="M33 33 43 18l10 15Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M87 33 77 18 67 33Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M37 31 43 24l6 7Z" fill="${c.light}" opacity=".8"/>
      <path d="M83 31 77 24l-6 7Z" fill="${c.light}" opacity=".8"/>`;
  }
  return `
    <circle cx="39" cy="32" r="11" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
    <circle cx="39" cy="32" r="5" fill="${c.light}" opacity=".85"/>
    <circle cx="81" cy="32" r="11" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
    <circle cx="81" cy="32" r="5" fill="${c.light}" opacity=".85"/>`;
}

function careBearBadgeMark(art, c) {
  const gold = CARE_BEAR_GOLD;
  switch (art) {
    case 'rainbow':
      return `
        <path d="M49 92a11 11 0 0 1 22 0" fill="none" stroke="#ff6b8a" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M52 92a8 8 0 0 1 16 0" fill="none" stroke="${gold}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M55 92a5 5 0 0 1 10 0" fill="none" stroke="#5ad6ff" stroke-width="2.2" stroke-linecap="round"/>`;
    case 'storm':
      return `
        <path d="M50 88c0-4 3-7 7-7 1-4 5-6 9-5 4 0 7 3 8 7 4 0 6 3 6 6-1 3-4 5-8 5H55c-4 0-6-2-6-4Z" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="m61 93-4 7 5-2 3 6 5-9-5 1Z" fill="${gold}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>`;
    case 'heart':
      return `<path d="M60 97C51 91 46 86 49 81c2-4 7-3 11 2 4-5 9-6 11-2 3 5-2 10-11 16Z" fill="#ff6b8a" stroke="${c.deep}" stroke-width="1.2"/>`;
    case 'clover':
      return `
        <circle cx="55" cy="84" r="5" fill="#7ed37a" stroke="${c.deep}" stroke-width=".8"/>
        <circle cx="65" cy="84" r="5" fill="#7ed37a" stroke="${c.deep}" stroke-width=".8"/>
        <circle cx="55" cy="93" r="5" fill="#7ed37a" stroke="${c.deep}" stroke-width=".8"/>
        <circle cx="65" cy="93" r="5" fill="#7ed37a" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M60 97v-4" stroke="${c.deep}" stroke-width="1.5" stroke-linecap="round"/>`;
    case 'sun':
      return `
        <circle cx="60" cy="88" r="7" fill="${gold}" stroke="${c.deep}" stroke-width="1"/>
        ${Array.from({ length: 8 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 8;
          return `<path d="M${60 + Math.cos(a) * 9} ${88 + Math.sin(a) * 9}L${60 + Math.cos(a) * 12} ${88 + Math.sin(a) * 12}" stroke="${gold}" stroke-width="1.8" stroke-linecap="round"/>`;
        }).join('')}`;
    case 'doubleheart':
      return `
        <path d="M53 89C47 85 44 82 46 79c1-2 4-2 7 1 3-3 6-3 7-1 2 3-1 6-7 10Z" fill="#ff6b8a" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M67 95C61 91 58 88 60 85c1-2 4-2 7 1 3-3 6-3 7-1 2 3-1 6-7 10Z" fill="#ff9ec7" stroke="${c.deep}" stroke-width=".9"/>`;
    case 'shootingstar':
      return `
        <path d="m63 77 2.5 5.5 6 .7-4.5 4.2 1.3 6-5.3-3.1-5.3 3.1 1.3-6-4.5-4.2 6-.7Z" fill="${gold}" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M49 94 43 98M53 97 49 102M45 88 40 90" stroke="${c.light}" stroke-width="1.5" stroke-linecap="round" opacity=".9"/>`;
    case 'moon':
      return `
        <path d="M67 82a10 10 0 1 0 0 14 11 11 0 0 1 0-14Z" fill="${gold}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="54" cy="84" r="1.4" fill="${c.light}"/><circle cx="51" cy="93" r="1" fill="${c.light}"/>`;
    case 'cupcake':
      return `
        <path d="M54 88h12l-2 9H56Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M52 87c0-5 4-8 8-8s8 3 8 8Z" fill="#ff9ec7" stroke="${c.deep}" stroke-width="1"/>
        <path d="M60 78v-4" stroke="${gold}" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="60" cy="72" r="1.8" fill="${gold}"/>`;
    case 'flowers':
      return `
        <circle cx="55" cy="86" r="3" fill="#ffd166"/><circle cx="50" cy="83" r="2.2" fill="#ff9ec7"/><circle cx="60" cy="83" r="2.2" fill="#ff9ec7"/><circle cx="50" cy="90" r="2.2" fill="#ff9ec7"/><circle cx="60" cy="90" r="2.2" fill="#ff9ec7"/>
        <circle cx="69" cy="94" r="2.6" fill="#ffd166"/><circle cx="65" cy="91" r="2" fill="#ff9ec7"/><circle cx="73" cy="91" r="2" fill="#ff9ec7"/><circle cx="65" cy="97" r="2" fill="#ff9ec7"/><circle cx="73" cy="97" r="2" fill="#ff9ec7"/>`;
    case 'lion':
      return `
        <path d="M60 98C51 92 46 87 49 82c2-4 7-3 11 2 4-5 9-6 11-2 3 5-2 10-11 16Z" fill="${gold}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M47 88 42 86M60 79l-2-6M73 88l5-2" stroke="${gold}" stroke-width="1.8" stroke-linecap="round"/>`;
    case 'raccoon':
      return `
        <path d="M60 97C51 91 46 86 49 81c2-4 7-3 11 2 4-5 9-6 11-2 3 5-2 10-11 16Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M52 84h7M61 84h7" stroke="${c.deep}" stroke-width="3.5" stroke-linecap="round" opacity=".7"/>`;
    case 'penguin':
      return `
        <path d="M60 97C51 91 46 86 49 81c2-4 7-3 11 2 4-5 9-6 11-2 3 5-2 10-11 16Z" fill="#ffffff" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M48 88c-4 1-6 4-6 7M72 88c4 1 6 4 6 7" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case 'elephant':
      return `
        <path d="M60 97C51 91 46 86 49 81c2-4 7-3 11 2 4-5 9-6 11-2 3 5-2 10-11 16Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M69 88c6 1 8 4 7 8-1 3-4 4-6 2" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>`;
    case 'rabbit':
      return `
        <path d="M60 97C51 91 46 86 49 81c2-4 7-3 11 2 4-5 9-6 11-2 3 5-2 10-11 16Z" fill="#ffffff" stroke="${c.deep}" stroke-width="1.1"/>
        <ellipse cx="53" cy="80" rx="2.4" ry="5" fill="${c.light}" stroke="${c.deep}" stroke-width=".7"/>
        <ellipse cx="67" cy="80" rx="2.4" ry="5" fill="${c.light}" stroke="${c.deep}" stroke-width=".7"/>`;
    case 'pig':
      return `
        <path d="M60 97C51 91 46 86 49 81c2-4 7-3 11 2 4-5 9-6 11-2 3 5-2 10-11 16Z" fill="#ff9ec7" stroke="${c.deep}" stroke-width="1.1"/>
        <ellipse cx="60" cy="89" rx="5" ry="3.5" fill="${c.light}" stroke="${c.deep}" stroke-width=".8"/>
        <circle cx="58" cy="89" r=".8" fill="${c.deep}"/><circle cx="62" cy="89" r=".8" fill="${c.deep}"/>`;
    case 'monkey':
      return `
        <path d="M60 97C51 91 46 86 49 81c2-4 7-3 11 2 4-5 9-6 11-2 3 5-2 10-11 16Z" fill="${gold}" stroke="${c.deep}" stroke-width="1.1"/>
        <circle cx="49" cy="87" r="2.8" fill="${c.light}" stroke="${c.deep}" stroke-width=".7"/>
        <circle cx="71" cy="87" r="2.8" fill="${c.light}" stroke="${c.deep}" stroke-width=".7"/>`;
    default:
      return `<path d="M60 97C51 91 46 86 49 81c2-4 7-3 11 2 4-5 9-6 11-2 3 5-2 10-11 16Z" fill="#ff6b8a" stroke="${c.deep}" stroke-width="1.1"/>`;
  }
}

function careBearSparkles(c) {
  return `
    <path d="M31 39l1.3 3.5 3.5 1.3-3.5 1.3L31 48.6l-1.3-3.5-3.5-1.3 3.5-1.3Z" fill="${c.light}" opacity=".85"/>
    <path d="M90 69l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1Z" fill="${c.accent}" opacity=".7"/>`;
}
