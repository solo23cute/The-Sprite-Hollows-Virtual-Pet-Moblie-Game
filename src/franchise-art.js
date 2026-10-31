/* Original procedural signatures for the 3.2 franchise waves. The shared
   sprite body supplies the face and silhouette; these layers add pony manes,
   cutie marks, TV styling, realm auras, and Keyblade regalia. */

function ponyMarkShape(mark, c) {
  switch (mark) {
    case 'heart':
      return `<path d="M0 6C-8 1-9-5-4-6c3-1 4 1 4 3 0-2 2-4 5-3 5 1 4 7-5 12Z" fill="${c.accent}"/>`;
    case 'apple':
      return `<path d="M0 7c-6 0-8-5-7-9 2 1 3 1 4 0 1 2 5 2 6 0 1 1 2 1 4 0 1 4-1 9-7 9Z" fill="${c.accent}"/><path d="M0-2c0-4 3-6 6-6" stroke="${c.light}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case 'bolt':
      return `<path d="M-1-8 6-2 1 0 3 8-6 1-1 0Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".7"/>`;
    case 'butterfly':
      return `<path d="M-1 0C-8-8-12 0-6 4-12 8-5 12 0 5 5 12 12 8 6 4 12 0 8-8 1 0Z" fill="${c.accent}" opacity=".95"/><path d="M0-1v7" stroke="${c.deep}" stroke-width="1.2"/>`;
    case 'diamond':
      return `<path d="M0-8 7-2 3 7-3 7-7-2Z" fill="${c.accent}" stroke="${c.light}" stroke-width="1"/><path d="M-7-2H7M-3 7 0-2 3 7" stroke="${c.light}" stroke-width=".7" opacity=".8"/>`;
    case 'balloon':
      return `<ellipse cx="0" cy="-2" rx="6" ry="7" fill="${c.accent}"/><path d="M0 5c2 4-2 5 0 8" stroke="${c.light}" stroke-width="1.2" fill="none"/>`;
    case 'sun':
      return `<circle cx="0" cy="0" r="5" fill="${c.accent}"/><path d="M0-9v3M0 6v3M-9 0h3M6 0h3M-6-6l2 2M4 4l2 2M6-6 4-4M-4 4-6 6" stroke="${c.accent}" stroke-width="1.5" stroke-linecap="round"/>`;
    case 'moon':
      return `<path d="M4-7C-3-6-6 0-4 5c1 2 3 3 6 2C-2 6-3 1 0-2c2-2 4-2 4-5Z" fill="${c.accent}"/>`;
    case 'shield':
      return `<path d="M0-7 7-4c0 6-3 9-7 11-4-2-7-5-7-11Z" fill="${c.accent}" stroke="${c.light}" stroke-width="1"/><path d="M0-3v6" stroke="${c.light}" stroke-width="1.2"/>`;
    case 'flower':
      return `<g fill="${c.accent}"><circle cx="0" cy="-5" r="3"/><circle cx="5" cy="-1" r="3"/><circle cx="3" cy="5" r="3"/><circle cx="-3" cy="5" r="3"/><circle cx="-5" cy="-1" r="3"/></g><circle cx="0" cy="1" r="2.4" fill="${c.light}"/>`;
    case 'leaf':
      return `<path d="M-5 7C-2-5 6-9 8-6c3 4-4 12-13 13Z" fill="${c.accent}"/><path d="M-4 6C0 2 4-2 7-3" stroke="${c.light}" stroke-width="1" fill="none"/>`;
    case 'bubble':
      return `<circle cx="-2" cy="1" r="5" fill="${c.accent}" opacity=".8"/><circle cx="5" cy="-4" r="2.4" fill="${c.light}" opacity=".8"/><circle cx="4" cy="4" r="1.5" fill="${c.light}" opacity=".6"/>`;
    case 'note':
      return `<path d="M-2 5V-6l8-2v10M6 4v-4" stroke="${c.accent}" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="-4" cy="6" r="3" fill="${c.accent}"/><circle cx="4" cy="5" r="3" fill="${c.accent}"/>`;
    case 'candy':
      return `<path d="M-2-3 3-5v10L-2 3Z" fill="${c.accent}"/><path d="M-6-2 2-3 2 3-6 2Z" fill="${c.light}" stroke="${c.deep}" stroke-width=".6"/><path d="M6-2-2-3-2 3 6 2Z" fill="${c.light}" stroke="${c.deep}" stroke-width=".6"/>`;
    case 'rock':
      return `<path d="M-7 4-4-5 1-7 7-3 5 6-2 8Z" fill="${c.accent}" stroke="${c.light}" stroke-width="1"/><path d="M-4-5 0 0 7-3M0 0-2 8" stroke="${c.light}" stroke-width=".7" opacity=".7"/>`;
    case 'crown':
      return `<path d="M-7 3-6-6-2-2 0-8 2-2 6-6 7 3Z" fill="${c.accent}" stroke="${c.light}" stroke-width=".8"/><path d="M-5 6H5" stroke="${c.light}" stroke-width="1.6" stroke-linecap="round"/>`;
    case 'chaos':
      return `<path d="M-6 5c2-6-4-7 0-11 3-3 7 0 5 3-2 4 6 2 7 6" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    default:
      return `<path d="M0-8 2-2 8-1 3 3 4 8 0 5-4 8-3 3-8-1-2-2Z" fill="${c.accent}"/>`;
  }
}

function signaturePony(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.pony) return '';
  const type = meta.ponyType || '';
  const wings = /Pegasus|Alicorn|Changeling/.test(type);
  const horn = /Unicorn|Alicorn|Changeling/.test(type);
  const dragon = /dragon/i.test(type);
  const draconequus = /Draconequus/i.test(type);
  return `<g class="pony-signature">
    <path d="M35 34c-9 8-10 18-7 29 5-5 9-10 11-17ZM85 34c9 8 10 18 7 29-5-5-9-10-11-17Z" fill="${c.accent}" opacity=".9"/>
    <path d="M37 38c9-10 37-13 46 0 5 8-1 14-7 12-5-2-7 5-14 4-7 1-10-4-16-2-7 2-13-6-9-14Z" fill="${c.deep}" opacity=".85"/>
    <path d="M41 39c7-6 29-8 37 0" stroke="${c.light}" stroke-width="1.8" fill="none" opacity=".55"/>
    ${horn ? `<path d="M60 8 66 29H54Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M57 23h7M58 18h5" stroke="${c.accent}" stroke-width="1"/>` : ''}
    ${wings ? `<path d="M30 61C13 52 5 58 8 69c8 4 16 3 23-1ZM90 61c17-9 25-3 22 8-8 4-16 3-23-1Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1" opacity=".9"/><path d="M15 63c5-2 10-1 14 2M105 63c-5-2-10-1-14 2" stroke="${c.accent}" stroke-width="1.4" fill="none"/>` : ''}
    ${dragon ? `<path d="M43 31 37 18l9 6 6-12 5 12 9-6-5 15Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M85 92c8-1 13 4 17 10-7 1-13-1-17-5Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>` : ''}
    ${draconequus ? `<path d="M40 32 34 16l9 4 5-12 4 12 8-5-3 17Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M86 61c13-12 23-8 23 2-6 5-14 5-21 2Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M41 36 30 28M79 36l11-8" stroke="${c.accent}" stroke-width="1.4" opacity=".7"/>` : ''}
    <circle cx="82" cy="76" r="8.5" fill="${c.light}" stroke="${c.accent}" stroke-width="1.2" opacity=".95"/>
    <g transform="translate(82 76) scale(.72)">${ponyMarkShape(meta.ponyMark, c)}</g>
    <path d="M92 97c5-2 8-6 8-11" stroke="${c.accent}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".65"/>
  </g>`;
}

function signatureTVLegacy(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.tvLegacy) return '';
  const art = meta.tvArt || 'toon';
  const base = `<g class="tv-signature">
    <rect x="16" y="105" width="88" height="7" rx="2" fill="#080710" opacity=".7"/>
    <rect x="20" y="107" width="38" height="3" rx="1" fill="${c.accent}" opacity=".9"/>
    <circle cx="98" cy="108.5" r="1.8" fill="${c.light}"/>`;
  const pieces = {
    antihero: `<path d="M35 28c8-10 20-12 30-6 8 5 12 14 10 22-5-5-13-7-22-5-9 2-15 0-18-3Z" fill="${c.deep}"/><path d="M44 58h31" stroke="${c.deep}" stroke-width="2" opacity=".5"/><path d="M42 82h36l-5 9H47Z" fill="${c.accent}"/>`,
    psychic: `<path d="M37 31c6-7 12-10 23-10s18 3 23 10" fill="${c.deep}" opacity=".55"/><path d="M43 45c4-3 8-3 11 0M66 45c3-3 7-3 11 0" stroke="${c.accent}" stroke-width="1.6" fill="none"/><path d="M46 90h28l4 14H42Z" fill="${c.accent}" opacity=".7"/><path d="M50 94h20" stroke="${c.light}" stroke-width="1.8"/>`,
    survivor: `<path d="M34 30c8-8 17-12 26-12s18 4 26 12Z" fill="${c.deep}"/><path d="M28 31h64l-5 7H33Z" fill="${c.accent}"/><path d="M44 26h32" stroke="${c.light}" stroke-width="1.5" opacity=".5"/><path d="M43 84h34" stroke="${c.accent}" stroke-width="2"/>`,
    hunter: `<path d="M38 30c7-7 14-10 23-10s16 3 23 10" fill="${c.deep}"/><path d="M36 82 26 66l8-5 11 13ZM84 82l10-16-8-5-11 13Z" fill="${c.accent}" opacity=".8"/><path d="M92 44c10 1 12 9 5 13l-9 3" stroke="${c.accent}" stroke-width="2" fill="none"/><path d="M94 46 99 52" stroke="${c.light}" stroke-width="1.2"/>`,
    blade: `<path d="M36 31c7-8 15-12 24-12s17 4 24 12" fill="${c.deep}"/><path d="M100 32 92 98" stroke="${c.light}" stroke-width="2.4"/><path d="M100 32l5-8" stroke="${c.accent}" stroke-width="3"/><path d="M40 87h34" stroke="${c.accent}" stroke-width="2"/>`,
    killer: `<path d="M35 29c8-9 18-13 28-10 8 2 13 9 12 16-8-3-16-2-23 3-7 4-15 1-17-9Z" fill="${c.deep}"/><path d="M44 57h28" stroke="${c.deep}" stroke-width="2" opacity=".55"/><rect x="88" y="75" width="16" height="9" rx="2" fill="${c.accent}" stroke="${c.light}" stroke-width="1"/><path d="M92 79h8" stroke="${c.light}" stroke-width="1"/>`,
    doctor: `<path d="M37 30c7-8 15-12 24-12s17 4 24 12" fill="${c.deep}" opacity=".65"/><path d="M40 82c5 8 15 12 20 12s15-4 20-12" stroke="${c.accent}" stroke-width="2" fill="none"/><path d="M83 82c10 0 12 9 5 12" stroke="${c.accent}" stroke-width="1.8" fill="none"/><path d="M45 46c4-3 9-3 13 0M65 46c4-3 9-3 11 0" stroke="${c.accent}" stroke-width="1.4" fill="none"/>`,
    detective: `<path d="M34 28c8-8 17-12 26-12s18 4 26 12Z" fill="${c.deep}"/><path d="M28 29h64l-7 8H35Z" fill="${c.accent}"/><path d="M41 62c6-4 12-4 18 0M64 62c5-4 11-4 16 0" stroke="${c.light}" stroke-width="1.6" fill="none"/><path d="M102 71l8-2M99 78l7 3" stroke="${c.accent}" stroke-width="1.5"/>`,
    office: `<path d="M38 30c7-6 14-9 22-9s15 3 22 9" fill="${c.deep}" opacity=".7"/><path d="M55 85h10l-2 18h-6Z" fill="${c.accent}"/><path d="M50 86h20" stroke="${c.light}" stroke-width="1.6"/><rect x="88" y="79" width="15" height="13" rx="3" fill="${c.accent}" opacity=".8"/><path d="M92 79c0-5 7-5 7 0" stroke="${c.light}" stroke-width="1.2" fill="none"/>`,
    friend: `<path d="M34 31c7-9 16-14 26-14s19 5 26 14c-8 4-17 5-26 5s-18-1-26-5Z" fill="${c.deep}"/><path d="M36 29c-7 9-6 18 1 25 5-8 8-15 8-23ZM84 29c7 9 6 18-1 25-5-8-8-15-8-23Z" fill="${c.accent}"/><path d="M47 89h26" stroke="${c.light}" stroke-width="2" opacity=".55"/>`,
    genius: `<path d="M38 29c7-7 14-10 22-10s15 3 22 10" fill="${c.deep}"/><path d="M48 82h24v10H48Z" fill="${c.accent}" opacity=".8"/><path d="M50 82l10-8 10 8" fill="${c.light}"/><circle cx="60" cy="86" r="2" fill="${c.deep}"/><path d="M34 48c-5 1-7 5-4 8M86 48c5 1 7 5 4 8" stroke="${c.accent}" stroke-width="1.3" fill="none"/>`,
    coach: `<path d="M35 29c8-7 16-10 25-10s17 3 25 10Z" fill="${c.deep}"/><path d="M29 30h62" stroke="${c.accent}" stroke-width="2.4"/><path d="M43 70c11 5 23 5 34 0" stroke="${c.deep}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M90 86 98 74l4 7-8 8Z" fill="${c.accent}"/>`,
    architect: `<path d="M36 30c7-7 15-10 24-10s17 3 24 10" fill="${c.deep}" opacity=".8"/><path d="M46 84h28l4 10H42Z" fill="${c.accent}"/><path d="M55 84h10" stroke="${c.light}" stroke-width="2"/><path d="M91 66h13v7H91Z" fill="${c.light}" opacity=".8"/>`,
    captain: `<path d="M34 28c8-7 17-10 26-10s18 3 26 10Z" fill="${c.deep}"/><path d="M32 30h56" stroke="${c.accent}" stroke-width="2.2"/><path d="M80 54 86 50l-1 7 6 1-6 4 2 7-7-4" fill="${c.accent}" opacity=".8"/><path d="M43 82h34" stroke="${c.light}" stroke-width="2" opacity=".6"/>`,
    vulcan: `<path d="M38 30c7-7 14-10 22-10s15 3 22 10" fill="${c.deep}"/><path d="M31 47c-5-8-3-12 3-10 4 1 5 6 5 10ZM89 47c5-8 3-12-3-10-4 1-5 6-5 10Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M43 78h34" stroke="${c.light}" stroke-width="1.8" opacity=".6"/>`,
    agent: `<path d="M36 30c7-7 15-10 24-10s17 3 24 10" fill="${c.deep}"/><path d="M54 84h12l-2 18h-8Z" fill="${c.accent}"/><rect x="85" y="57" width="12" height="8" rx="1" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M88 61h6" stroke="${c.deep}" stroke-width="1"/>`,
    admiral: `<path d="M35 29c7-7 15-11 25-11s18 4 25 11Z" fill="${c.deep}"/><path d="M37 72c10 6 36 6 46 0" stroke="${c.light}" stroke-width="2" fill="none"/><path d="M43 48c5-3 9-3 13 0M64 48c4-3 8-3 13 0" stroke="${c.accent}" stroke-width="1.4" fill="none"/><path d="M48 74c8 4 16 4 24 0" stroke="${c.light}" stroke-width="2.4" fill="none" opacity=".8"/>`,
    pilot: `<path d="M35 30c7-9 16-13 25-13s18 4 25 13Z" fill="${c.deep}"/><path d="M34 31h52" stroke="${c.accent}" stroke-width="2"/><path d="M44 84h32v8H44Z" fill="${c.accent}" opacity=".7"/><path d="M88 67c7-6 12-2 10 5-2 6-8 7-12 4" stroke="${c.light}" stroke-width="1.5" fill="none"/>`,
    time: `<path d="M36 30c7-8 15-12 24-12s17 4 24 12" fill="${c.deep}"/><path d="M92 45c8 0 14 6 14 14s-6 14-14 14-14-6-14-14 6-14 14-14Z" fill="${c.accent}" opacity=".35" stroke="${c.accent}" stroke-width="1.2"/><path d="M92 52v8l6 4" stroke="${c.light}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M101 84l8-12" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>`,
    royal: `<path d="M34 32c-7 10-8 20-3 30 5-9 9-16 12-25ZM86 32c7 10 8 20 3 30-5-9-9-16-12-25Z" fill="${c.accent}"/><path d="M42 30 38 12l10 6 5-10 5 10 10-6-4 18Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M45 86h30" stroke="${c.accent}" stroke-width="2"/>`,
    ranger: `<path d="M35 29c8-8 17-12 26-12s18 4 26 12" fill="${c.deep}"/><path d="M34 36c-8 4-11 13-8 21 6-5 10-11 13-17ZM86 36c8 4 11 13 8 21-6-5-10-11-13-17Z" fill="${c.accent}" opacity=".55"/><path d="M92 80 97 55" stroke="${c.light}" stroke-width="2.2"/><path d="M94 72l8-2" stroke="${c.accent}" stroke-width="2"/>`,
    assassin: `<path d="M36 31c7-8 15-12 24-12s17 4 24 12" fill="${c.deep}"/><path d="M98 42 90 104" stroke="${c.light}" stroke-width="1.8"/><path d="M98 42l6-10" stroke="${c.accent}" stroke-width="2.4"/><path d="M42 82h34" stroke="${c.accent}" stroke-width="2"/>`,
    strategist: `<path d="M37 30c7-7 15-10 23-10s16 3 23 10" fill="${c.deep}"/><path d="M43 82h24l-3 16H46Z" fill="${c.accent}" opacity=".7"/><path d="M90 47c7 0 12 5 12 10s-5 9-10 9" stroke="${c.light}" stroke-width="1.8" fill="none"/><path d="M32 60h13" stroke="${c.accent}" stroke-width="1.5" opacity=".7"/>`,
    goth: `<path d="M34 32c-8 12-7 23-2 33 6-6 9-16 10-26ZM86 32c8 12 7 23 2 33-6-6-9-16-10-26Z" fill="${c.deep}"/><path d="M39 45c8-8 34-8 42 0" stroke="${c.accent}" stroke-width="2" fill="none"/><path d="M42 86c8 6 28 6 36 0" stroke="${c.light}" stroke-width="1.8" fill="none"/><path d="M92 72l5 7-5 7-5-7Z" fill="${c.accent}" opacity=".7"/>`,
    toon: `<path d="M38 30c6-8 14-11 22-11s16 3 22 11" fill="${c.deep}"/><path d="M60 4v10M56 8h8" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/><circle cx="60" cy="4" r="2.4" fill="${c.light}"/><path d="M33 88c10-6 20-7 27-7s17 1 27 7" stroke="${c.accent}" stroke-width="1.8" fill="none"/><path d="M88 48l8-4M90 62l9 2" stroke="${c.accent}" stroke-width="1.4" opacity=".7"/>`,
    robot: `<path d="M38 28h44l-5-10H43Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M60 7v10" stroke="${c.light}" stroke-width="2"/><circle cx="60" cy="6" r="3" fill="${c.accent}"/><path d="M34 44h-8v18h8M86 44h8v18h-8" fill="${c.deep}" opacity=".7"/><path d="M90 79h13v9H90Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/>`,
    trainer: `<path d="M34 28c8-7 17-11 26-11s18 4 26 11Z" fill="${c.accent}"/><path d="M32 29h56" stroke="${c.light}" stroke-width="2"/><path d="M84 52c7-2 12 2 12 8" stroke="${c.accent}" stroke-width="2" fill="none"/><circle cx="95" cy="61" r="2" fill="${c.light}"/><path d="M44 86h32" stroke="${c.light}" stroke-width="2" opacity=".5"/>`,
    monk: `<path d="M37 30c7-8 15-12 24-12s17 4 24 12" fill="${c.deep}" opacity=".7"/><path d="M80 47c6-5 12-4 17 0-5 4-11 5-17 2Z" fill="${c.accent}"/><path d="M78 51c6 0 11 2 15 6" stroke="${c.accent}" stroke-width="1.2" fill="none"/><path d="M43 84h34" stroke="${c.light}" stroke-width="2" opacity=".5"/>`,
    fire: `<path d="M34 31c-9 9-10 20-5 30 5-8 10-14 14-21ZM86 31c9 9 10 20 5 30-5-8-10-14-14-21Z" fill="${c.accent}"/><path d="M46 44c2-7 4-10 7-13 1 6 5 7 8 12 2 4-1 7-6 7-4 0-7-2-9-6Z" fill="${c.light}" opacity=".9"/><path d="M88 79c5-2 9 1 9 5-3 2-7 1-9-1Z" fill="${c.accent}"/>`,
  };
  return base + (pieces[art] || pieces.toon) + '</g>';
}

function signatureRealmWave(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.realmWave) return '';
  const group = meta.realmGroup;
  const art = meta.realmArt || 'shade';
  const aura = {
    horror: `<path d="M26 54c-5-14 5-27 18-31M94 54c5-14-5-27-18-31M28 92c10 7 21 10 32 10s22-3 32-10" stroke="${c.accent}" stroke-width="1.5" fill="none" opacity=".55" stroke-dasharray="3 5"/>`,
    darkhorror: `<path d="M28 48 16 32l18 4 2-16 12 16 12-18 3 18 16-5-11 16Z" fill="${c.deep}" opacity=".7"/><path d="M29 72c-10 4-15 12-13 21 8-4 15-10 18-17M91 72c10 4 15 12 13 21-8-4-15-10-18-17Z" fill="${c.accent}" opacity=".35"/>`,
    light: `<g stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".7"><path d="M60 2v9M60 109v6M15 59h9M103 59h-7M28 28l6 6M86 86l6 6M92 28l-6 6M34 86l-6 6"/></g><circle cx="60" cy="60" r="48" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".45"/>`,
    darkness: `<circle cx="60" cy="60" r="49" fill="none" stroke="${c.accent}" stroke-width="1.3" opacity=".5" stroke-dasharray="2 7"/><circle cx="26" cy="28" r="1.4" fill="${c.light}"/><circle cx="94" cy="37" r="1" fill="${c.light}"/><circle cx="21" cy="80" r="1.2" fill="${c.light}"/><circle cx="87" cy="91" r="1.5" fill="${c.light}"/>`,
  }[group] || '';
  const pieces = {
    pale: `<path d="M37 28c-8-12-9-21-4-26 3 2 6 9 9 16 2-8 5-14 8-17 1 8 0 16-2 24ZM83 28c8-12 9-21 4-26-3 2-6 9-9 16-2-8-5-14-8-17-1 8 0 16 2 24Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><circle cx="39" cy="55" r="2" fill="${c.accent}"/><circle cx="81" cy="55" r="2" fill="${c.accent}"/>`,
    widow: `<path d="M31 56 12 44M30 65 8 61M31 75 11 84M89 56l19-12M90 65l22-4M89 75l20 9" stroke="${c.light}" stroke-width="2" stroke-linecap="round" opacity=".8"/><path d="M33 42c9-12 45-12 54 0" stroke="${c.accent}" stroke-width="1" fill="none"/><circle cx="83" cy="38" r="2" fill="${c.accent}"/>`,
    static: `<path d="M30 34h17l-5 9h16l-5 9h17l-4 9h16" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".8"/><rect x="34" y="80" width="52" height="13" fill="${c.deep}" opacity=".65"/><path d="M39 84h10M53 84h10M67 84h10M81 84h3" stroke="${c.light}" stroke-width="2"/>`,
    bride: `<path d="M37 24c6-8 14-12 23-12s17 4 23 12c-3 23-8 37-9 55-9 5-19 5-28 0-1-18-6-32-9-55Z" fill="${c.light}" opacity=".2" stroke="${c.light}" stroke-width="1"/><path d="M42 31c7 4 29 4 36 0" stroke="${c.accent}" stroke-width="1.2" fill="none"/><path d="M57 92l3 12 3-12" fill="${c.accent}" opacity=".8"/>`,
    mirror: `<path d="M28 35 19 22l15 2 5-12 6 12 12-2-8 13ZM92 35l9-13-15 2-5-12-6 12-12-2 8 13Z" fill="${c.light}" opacity=".55" stroke="${c.accent}" stroke-width=".8"/><path d="M87 73c10 1 15 8 13 17-8 1-15-5-16-13Z" fill="${c.accent}" opacity=".3"/>`,
    choir: `<path d="M42 22c-7 2-9 8-4 12-6 3-4 10 3 10M78 22c7 2 9 8 4 12 6 3 4 10-3 10" stroke="${c.accent}" stroke-width="1.4" fill="none"/><path d="M44 93c5-4 10-4 15 0M62 93c5-4 10-4 15 0" stroke="${c.light}" stroke-width="1.2" fill="none"/><circle cx="91" cy="49" r="2" fill="${c.light}"/><circle cx="24" cy="69" r="1.6" fill="${c.light}"/>`,
    scarecrow: `<path d="M37 29 30 13l10 3 5-10 8 8 7-8 3 11 12-3-7 16Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M44 82c5 3 10 4 16 4s11-1 16-4" stroke="${c.light}" stroke-width="1.4" fill="none" stroke-dasharray="2 3"/><path d="M30 41c-7-2-11-7-8-11 4-3 9 0 9 4" fill="${c.accent}" opacity=".8"/>`,
    bus: `<rect x="18" y="63" width="84" height="28" rx="6" fill="${c.deep}" opacity=".65" stroke="${c.accent}" stroke-width="1.2"/><path d="M30 70h19v9H30ZM55 70h19v9H55Z" fill="${c.light}" opacity=".45"/><circle cx="33" cy="94" r="4" fill="${c.light}"/><circle cx="87" cy="94" r="4" fill="${c.light}"/><path d="M80 64h14" stroke="${c.accent}" stroke-width="2"/>`,
    engine: `<circle cx="42" cy="48" r="11" fill="none" stroke="${c.accent}" stroke-width="2" stroke-dasharray="3 3"/><circle cx="77" cy="85" r="9" fill="none" stroke="${c.light}" stroke-width="1.5" stroke-dasharray="2 3"/><path d="M42 37v22M31 48h22M77 76v18M68 85h18" stroke="${c.accent}" stroke-width="1.4"/>`,
    abbot: `<path d="M36 31c6-12 15-18 24-18s18 6 24 18c-2 14-9 24-24 28-15-4-22-14-24-28Z" fill="${c.deep}" opacity=".75"/><circle cx="60" cy="28" r="3" fill="${c.accent}"/><path d="M40 88c7 2 13 2 20 0s13-2 20 0" stroke="${c.light}" stroke-width="1.2" fill="none"/>`,
    book: `<path d="M30 74c10-5 20-5 30 0 10-5 20-5 30 0v18c-10-4-20-4-30 0-10-4-20-4-30 0Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/><path d="M60 74v18M36 80c5-1 10-1 15 1M69 81c5-2 10-2 15-1" stroke="${c.light}" stroke-width="1" opacity=".7"/>`,
    room: `<rect x="24" y="18" width="72" height="82" rx="2" fill="none" stroke="${c.accent}" stroke-width="1.4" opacity=".65"/><path d="M34 98V30h22v68M86 98V30H64v68" stroke="${c.light}" stroke-width="1" opacity=".3"/><circle cx="60" cy="54" r="4" fill="${c.accent}" opacity=".7"/>`,
    bone: `<path d="M48 30c-5-6-2-12 5-12 4 0 6 3 7 7 1-4 3-7 7-7 7 0 10 6 5 12" stroke="${c.light}" stroke-width="2" fill="none"/><path d="M43 48h34l-4 17H47Z" fill="${c.light}" opacity=".7"/><circle cx="51" cy="55" r="3" fill="${c.deep}"/><circle cx="69" cy="55" r="3" fill="${c.deep}"/>`,
    wall: `<path d="M22 26 37 52 27 66l14 18-7 16M94 22 80 45l12 17-10 21 6 13" stroke="${c.accent}" stroke-width="1.6" fill="none" opacity=".75"/><path d="M39 72c4 4 8 4 12 0M63 78c4 4 8 4 12 0" stroke="${c.light}" stroke-width="1.4" fill="none"/>`,
    hound: `<path d="M34 35 24 20l12-2 7 9M86 35l10-15-12-2-7 9" fill="${c.deep}" stroke="${c.accent}" stroke-width="1"/><path d="M36 90h48" stroke="${c.accent}" stroke-width="2"/><path d="M42 91c2 8 10 12 18 12s16-4 18-12" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".6"/><path d="M88 34c8 4 8 12 0 16" stroke="${c.accent}" stroke-width="1.4" fill="none"/>`,
    dawn: `<circle cx="60" cy="20" r="11" fill="${c.light}" opacity=".45"/><circle cx="60" cy="20" r="6" fill="${c.accent}"/><path d="M60 2v5M46 8l4 4M74 8l-4 4M42 20h5M73 20h5" stroke="${c.accent}" stroke-width="1.6" stroke-linecap="round"/>`,
    halo: `<ellipse cx="60" cy="12" rx="23" ry="6" fill="none" stroke="${c.accent}" stroke-width="2"/><ellipse cx="60" cy="7" rx="17" ry="4" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".7"/><path d="M42 85c5 6 11 9 18 9s13-3 18-9" stroke="${c.accent}" stroke-width="1.4" fill="none"/>`,
    prism: `<path d="M60 4 96 47 60 96 24 47Z" fill="${c.light}" opacity=".13" stroke="${c.accent}" stroke-width="1.3"/><path d="M60 14v72M31 48h58M60 14 31 48M60 14l29 34M60 86 31 48M60 86l29-38" stroke="${c.accent}" stroke-width=".8" opacity=".7"/>`,
    sun: `<circle cx="60" cy="16" r="7" fill="${c.accent}"/><path d="M60 3v5M47 8l4 4M73 8l-4 4M44 19h5M71 19h5M49 28l4-4M71 28l-4-4" stroke="${c.light}" stroke-width="1.6" stroke-linecap="round"/><path d="M42 82c8 7 28 7 36 0" stroke="${c.accent}" stroke-width="1.4" fill="none"/>`,
    bird: `<path d="M34 58C15 43 8 50 13 61c5 9 14 10 22 6ZM86 58c19-15 26-8 21 3-5 9-14 10-22 6Z" fill="${c.light}" opacity=".8" stroke="${c.accent}" stroke-width="1"/><path d="M30 64c-5 4-7 9-4 13 4-2 7-5 8-9M90 64c5 4 7 9 4 13-4-2-7-5-8-9" fill="${c.accent}" opacity=".7"/>`,
    star: `<path d="M60 0 65 12 78 8 70 19 84 27 69 28 72 42 60 34 48 42 51 28 36 27 50 19 42 8 55 12Z" fill="${c.accent}" opacity=".65"/><circle cx="60" cy="20" r="3" fill="${c.light}"/>`,
    lumen: `<path d="M46 33h28l5 8H41Z" fill="${c.accent}" opacity=".7"/><path d="M45 41h30v13H45Z" fill="${c.light}" opacity=".35" stroke="${c.accent}" stroke-width="1"/><path d="M43 54h34l-4 8H47Z" fill="${c.accent}" opacity=".5"/><path d="M60 9v17M56 14h8" stroke="${c.accent}" stroke-width="1.4"/>`,
    candle: `<rect x="54" y="46" width="12" height="25" rx="3" fill="${c.light}" opacity=".8" stroke="${c.accent}" stroke-width="1"/><path d="M60 19c7 6 10 11 8 16-1 4-5 6-8 6s-7-2-8-6c-2-5 1-10 8-16Z" fill="${c.accent}"/><path d="M60 28c3 3 4 6 3 9-1 2-2 3-3 3s-3-1-3-3c-1-3 0-6 3-9Z" fill="${c.light}"/>`,
    umbra: `<path d="M28 78c-7 10-4 20 8 23 7-4 10-10 8-17ZM92 78c7 10 4 20-8 23-7-4-10-10-8-17Z" fill="${c.deep}" opacity=".7"/><circle cx="31" cy="47" r="2" fill="${c.accent}"/><circle cx="89" cy="60" r="1.5" fill="${c.light}"/>`,
    void: `<circle cx="60" cy="58" r="28" fill="${c.deep}" opacity=".6"/><circle cx="60" cy="58" r="20" fill="none" stroke="${c.accent}" stroke-width="1.2" stroke-dasharray="2 5"/><circle cx="48" cy="45" r="1.5" fill="${c.light}"/><circle cx="73" cy="68" r="1.2" fill="${c.light}"/>`,
    glass: `<path d="M30 30 21 17l15 3 7-12 5 13 13-2-8 13ZM90 30l9-13-15 3-7-12-5 13-13-2 8 13Z" fill="${c.light}" opacity=".35" stroke="${c.accent}" stroke-width=".8"/><path d="M88 77c10-1 15 6 12 14-8 1-14-4-14-11Z" fill="${c.accent}" opacity=".3"/>`,
    eclipse: `<circle cx="60" cy="20" r="15" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.4"/><circle cx="67" cy="16" r="12" fill="${c.light}" opacity=".35"/><path d="M60 1v5M42 8l4 4M78 8l-4 4" stroke="${c.light}" stroke-width="1.2" opacity=".7"/>`,
    shade: `<path d="M35 40c0-13 10-23 25-23s25 10 25 23c0 13-7 23-12 31-4 6-8 10-13 10s-9-4-13-10c-5-8-12-18-12-31Z" fill="${c.deep}" opacity=".55"/><circle cx="45" cy="50" r="2" fill="${c.accent}"/><circle cx="75" cy="50" r="2" fill="${c.accent}"/>`,
    moon: `<path d="M78 8C58 14 48 34 55 53c5 13 17 20 31 17C66 74 49 61 49 41 49 25 60 12 78 8Z" fill="${c.accent}" opacity=".75"/><circle cx="34" cy="30" r="2" fill="${c.light}"/><circle cx="88" cy="62" r="1.5" fill="${c.light}"/><circle cx="27" cy="72" r="1.2" fill="${c.light}"/>`,
    abyss: `<circle cx="60" cy="56" r="31" fill="none" stroke="${c.accent}" stroke-width="1.2" stroke-dasharray="3 6" opacity=".6"/><circle cx="42" cy="42" r="2" fill="${c.light}"/><circle cx="65" cy="35" r="1.6" fill="${c.light}"/><circle cx="80" cy="58" r="2.2" fill="${c.light}"/><circle cx="53" cy="70" r="1.4" fill="${c.light}"/><circle cx="72" cy="78" r="1.8" fill="${c.light}"/>`,
    star: `<path d="M60 2 66 20 84 14 74 30 94 38 76 45 86 64 67 58 60 78 53 58 34 64 44 45 26 38 46 30 36 14 54 20Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.1"/><circle cx="60" cy="37" r="4" fill="${c.light}" opacity=".7"/>`,
  };
  return `<g class="realm-signature">${aura}${pieces[art] || pieces.shade}</g>`;
}

function signatureKingdomHearts(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.kingdomHearts) return '';
  const art = meta.khArt || 'heart';
  const common = `<g class="kh-signature">
    <path d="M60 8 54 17h12Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/>
    <path d="M47 15c-4 0-6 3-4 6 2 2 6 1 6-2 0 3 4 4 6 2 2-3 0-6-4-6h-4Z" fill="${c.light}" opacity=".85"/>
    <path d="M93 82c6-6 12-4 12 2 0 5-5 8-10 8" fill="${c.accent}" opacity=".55"/>`;
  const pieces = {
    crown: `<path d="M94 24 90 8l10 6 5-9 5 10 9-5-5 16Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M94 28h24" stroke="${c.accent}" stroke-width="1.6"/>`,
    keyblade: `<path d="M99 20 90 88" stroke="${c.light}" stroke-width="3.2" stroke-linecap="round"/><path d="M99 20l6 10-7 3-4-9Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/><path d="M86 83h12" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/><path d="M91 88v10" stroke="${c.light}" stroke-width="2.2"/>`,
    heart: `<path d="M102 52c-10-12-20-3-18 7 2 8 18 18 18 18s16-10 18-18c2-10-8-19-18-7Z" fill="${c.accent}" opacity=".45" stroke="${c.accent}" stroke-width="1.2"/><path d="M102 61v8M98 65h8" stroke="${c.light}" stroke-width="1.4"/>`,
    king: `<path d="M39 27 33 8l11 6 8-10 8 10 11-6-6 19Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M35 31h50" stroke="${c.accent}" stroke-width="1.8"/><circle cx="60" cy="20" r="2.2" fill="${c.accent}"/>`,
    mage: `<path d="M35 29c-7-8-3-18 8-20 2-9 15-9 18 0 11 2 15 12 8 20Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1"/><path d="M33 30h54" stroke="${c.accent}" stroke-width="2.2"/><path d="M91 60c8-10 15-8 13 2-1 6-8 10-13 12" stroke="${c.light}" stroke-width="1.4" fill="none"/>`,
    guard: `<path d="M45 84h30l-4 17H49Z" fill="${c.accent}" opacity=".75"/><path d="M50 86h20" stroke="${c.light}" stroke-width="2"/><path d="M35 31c5-8 13-12 25-12s20 4 25 12" fill="${c.deep}" opacity=".55"/><path d="M86 72l9-4 9 4v9l-9 6-9-6Z" fill="${c.light}" opacity=".5" stroke="${c.accent}" stroke-width="1"/>`,
    nobody: `<path d="M37 30c6-11 14-17 23-17s18 6 23 17c-2 13-9 20-23 24-14-4-21-11-23-24Z" fill="${c.deep}" opacity=".75"/><circle cx="60" cy="28" r="3" fill="${c.accent}"/><path d="M42 91c8 3 28 3 36 0" stroke="${c.light}" stroke-width="1.3" fill="none"/>`,
    guns: `<path d="M22 50h20v10H22ZM78 50h20v10H78Z" fill="${c.light}" opacity=".7" stroke="${c.accent}" stroke-width="1"/><path d="M22 58h-7v7h7M98 58h7v7h-7" fill="${c.accent}" opacity=".7"/><path d="M31 54h3M86 54h3" stroke="${c.deep}" stroke-width="1.6"/>`,
    lance: `<path d="M98 20 78 98" stroke="${c.light}" stroke-width="2.6"/><path d="M98 20l7 7-8 6-5-8Z" fill="${c.accent}"/><path d="M83 76l12 5" stroke="${c.accent}" stroke-width="2.2"/>`,
    shield: `<path d="M28 44c10-4 19-5 29-5v31c-9 0-19 5-29 14-10-9-20-14-29-14V39c10 0 19 1 29 5Z" transform="translate(1 18) scale(.48)" fill="${c.light}" opacity=".45" stroke="${c.accent}" stroke-width="2"/><path d="M46 84h28" stroke="${c.accent}" stroke-width="2"/>`,
    axe: `<path d="M91 26 83 98" stroke="${c.light}" stroke-width="3"/><path d="M91 26c-10 2-17 9-17 19 8-1 14-5 18-12Z" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>`,
    book: `<path d="M27 74c10-5 20-5 30 0 10-5 20-5 30 0v18c-10-4-20-4-30 0-10-4-20-4-30 0Z" fill="${c.deep}" opacity=".7" stroke="${c.accent}" stroke-width="1.1"/><path d="M57 74v18M34 81c5-1 10 0 15 2M64 83c5-2 10-3 15-2" stroke="${c.light}" stroke-width="1" opacity=".7"/>`,
    scythe: `<path d="M91 98 99 16" stroke="${c.light}" stroke-width="2.6"/><path d="M99 16c-9 0-16 5-19 13 8-4 14-3 20-1Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/><path d="M94 78l10 7" stroke="${c.accent}" stroke-width="2"/>`,
    cards: `<g transform="rotate(-12 92 64)"><rect x="86" y="50" width="15" height="22" rx="2" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><rect x="89" y="47" width="15" height="22" rx="2" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/><path d="M96 54l3 4 3-4" fill="${c.accent}"/></g>`,
    claymore: `<path d="M99 18 86 82" stroke="${c.light}" stroke-width="4" stroke-linecap="round"/><path d="M99 18l5 9-7 3-3-9Z" fill="${c.accent}"/><path d="M84 79h12" stroke="${c.accent}" stroke-width="2.4"/>`,
    chakram: `<circle cx="98" cy="54" r="11" fill="none" stroke="${c.light}" stroke-width="2.2"/><circle cx="98" cy="54" r="5" fill="none" stroke="${c.accent}" stroke-width="1.6"/><path d="M98 43v5M98 60v5" stroke="${c.accent}" stroke-width="1.4"/>`,
    knives: `<path d="M94 36 89 65M100 48l-7 23M87 54l10 4" stroke="${c.light}" stroke-width="1.6" stroke-linecap="round"/><path d="M94 36l4-7" stroke="${c.accent}" stroke-width="2.4"/><path d="M100 48l5-4" stroke="${c.accent}" stroke-width="2.2"/>`,
    shell: `<path d="M88 68c0-12 8-20 18-20s18 8 18 20c-8 6-28 6-36 0Z" fill="${c.light}" opacity=".55" stroke="${c.accent}" stroke-width="1.2"/><path d="M92 68c4-8 20-8 28 0M96 60l2 8M106 58l-1 10" stroke="${c.accent}" stroke-width="1"/>`,
    sketch: `<path d="M95 30 89 80" stroke="${c.light}" stroke-width="2.4"/><path d="M95 30l5-8 3 10-5 4Z" fill="${c.accent}"/><path d="M84 86c8-4 18-4 28 0" stroke="${c.accent}" stroke-width="1.2" fill="none"/>`,
    earth: `<path d="M30 90c10-7 20-8 30-3 10-5 20-4 30 3" stroke="${c.accent}" stroke-width="2.2" fill="none"/><path d="M34 80c5-3 10-3 15 0M72 80c5-3 10-3 15 0" stroke="${c.light}" stroke-width="1.3" fill="none"/>`,
    water: `<path d="M90 48c7 8 12 13 12 20 0 8-5 13-12 13s-12-5-12-13c0-7 5-12 12-20Z" fill="${c.accent}" opacity=".35" stroke="${c.accent}" stroke-width="1.1"/><path d="M88 60c2 3 4 3 6 0" stroke="${c.light}" stroke-width="1.2" fill="none"/>`,
    wind: `<path d="M84 48c10-7 20-5 23 3 3 8-4 14-12 13M82 65c8-4 16-2 18 4 2 5-3 9-9 8M84 82c6-2 11 0 12 4" stroke="${c.light}" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    master: `<path d="M95 30 85 92" stroke="${c.light}" stroke-width="2.8"/><path d="M95 30l6 8-8 4-3-7Z" fill="${c.accent}"/><path d="M39 26 34 10l9 5 6-9 7 9 9-5-4 16Z" fill="${c.accent}" opacity=".8"/><circle cx="60" cy="17" r="2" fill="${c.light}"/>`,
    mask: `<path d="M38 31c5-11 13-16 22-16s17 5 22 16c0 12-8 20-22 24-14-4-22-12-22-24Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/><path d="M43 42c4-3 8-3 12 0M65 42c4-3 8-3 12 0" stroke="${c.light}" stroke-width="1.4" fill="none"/><path d="M49 56c7 3 15 3 22 0" stroke="${c.accent}" stroke-width="1.2" fill="none"/>`,
    time: `<circle cx="95" cy="48" r="14" fill="none" stroke="${c.accent}" stroke-width="1.6"/><path d="M95 39v10l7 4" stroke="${c.light}" stroke-width="1.6" fill="none"/><path d="M95 30v4M95 62v4M77 48h4M109 48h4" stroke="${c.accent}" stroke-width="1.2"/>`,
    darkness: `<circle cx="94" cy="58" r="18" fill="${c.deep}" opacity=".7"/><circle cx="94" cy="58" r="12" fill="none" stroke="${c.accent}" stroke-width="1.2" stroke-dasharray="2 4"/><path d="M85 69c5 5 13 5 18 0" stroke="${c.light}" stroke-width="1.2" fill="none"/>`,
    witch: `<path d="M38 31 30 10l13 6 6-12 7 11 10-7-4 22Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1"/><path d="M85 58c8-4 15 1 14 8-1 6-7 8-12 6" stroke="${c.light}" stroke-width="1.5" fill="none"/><circle cx="94" cy="66" r="2" fill="${c.accent}"/>`,
    brawler: `<path d="M93 54c8 0 11 6 8 11-3 4-7 3-9 0M84 68c7 3 14 2 18-2" stroke="${c.accent}" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M42 85h36" stroke="${c.light}" stroke-width="2" opacity=".5"/>`,
    star: `<path d="M60 0 65 12 78 8 70 19 84 27 69 28 72 42 60 34 48 42 51 28 36 27 50 19 42 8 55 12Z" fill="${c.accent}" opacity=".6"/>`,
    flower: `<g fill="${c.accent}" opacity=".7"><circle cx="90" cy="54" r="5"/><circle cx="99" cy="60" r="5"/><circle cx="97" cy="70" r="5"/><circle cx="87" cy="70" r="5"/><circle cx="84" cy="60" r="5"/></g><circle cx="92" cy="63" r="3" fill="${c.light}"/>`,
    dream: `<path d="M36 29c7-8 15-12 24-12s17 4 24 12" fill="${c.deep}" opacity=".55"/><path d="M90 83c5-7 14-7 18 0-4 7-13 7-18 0Z" fill="${c.accent}" opacity=".65"/><circle cx="99" cy="83" r="2" fill="${c.light}"/>`,
    blade: `<path d="M99 22 88 82" stroke="${c.light}" stroke-width="2.4"/><path d="M99 22l5 7-7 4-3-7Z" fill="${c.accent}"/><circle cx="92" cy="82" r="4" fill="${c.accent}" opacity=".7"/>`,
  };
  return common + (pieces[art] || pieces.heart) + '</g>';
}
