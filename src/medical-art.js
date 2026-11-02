/* Original procedural medical-TV signatures: coats, scrubs, badges, charts,
   stethoscopes, and role props. No show frames or traced character art. */

const MEDICAL_AURAS = {
  greys: (c) => `<g opacity=".55">
    <path d="M20 34h9M27 34v8M23.5 38h7" stroke="${c.accent}" stroke-width="1.4" fill="none"/>
    <path d="M18 94h14M26 88v12" stroke="${c.light}" stroke-width="1.2" fill="none"/>
    <path d="M82 24h16v10H82Z" fill="none" stroke="${c.accent}" stroke-width="1"/>
    <path d="M85 29h10" stroke="${c.light}" stroke-width="1"/>
    <path d="M24 78c5 0 7-7 12-7s6 8 12 8 7-10 13-10" stroke="${c.accent}" stroke-width="1.1" fill="none" opacity=".7"/>
  </g>`,
  scrubs: (c) => `<g opacity=".6">
    <circle cx="24" cy="30" r="7" fill="none" stroke="${c.accent}" stroke-width="1.2"/>
    <path d="M24 23v14M17 30h14" stroke="${c.accent}" stroke-width="1.2"/>
    <path d="M91 30h12v15H91Z" fill="none" stroke="${c.light}" stroke-width="1"/>
    <path d="M94 34h6M94 38h6M94 42h3" stroke="${c.accent}" stroke-width="1"/>
    <path d="M18 82c6-3 11-3 16 0M84 82c6-3 11-3 16 0" stroke="${c.light}" stroke-width="1.2" fill="none"/>
  </g>`,
};

function medicalHair(c, style = 'short') {
  if (style === 'long') return `<path d="M34 37c-7 11-8 24-3 36 5-8 7-16 7-25 4 4 8 4 12 1 1 9 4 16 9 24 5-13 2-26-6-36-5-7-14-7-19 0Z" fill="${c.deep}" opacity=".9"/>`;
  if (style === 'curl') return `<path d="M34 36c-3-9 3-17 12-19 5-7 15-4 17 3 8 3 9 12 3 17-4-7-10-9-17-7-6-2-12 0-15 6Z" fill="${c.deep}" opacity=".92"/>`;
  if (style === 'bun') return `<path d="M35 34c-1-9 7-15 16-15 10 0 17 6 16 15-5-5-10-6-16-3-6-3-12-1-16 3Z" fill="${c.deep}" opacity=".9"/><circle cx="60" cy="15" r="7" fill="${c.deep}" opacity=".9"/>`;
  if (style === 'cap') return `<path d="M35 33c3-10 12-15 25-15s22 5 25 15Z" fill="${c.light}" opacity=".95" stroke="${c.accent}" stroke-width="1"/><path d="M35 33h50" stroke="${c.accent}" stroke-width="1.4"/>`;
  return `<path d="M35 36c0-10 9-17 25-17s25 7 25 17c-5-5-10-7-15-4-4-5-11-5-15-1-7-4-15-2-20 5Z" fill="${c.deep}" opacity=".9"/>`;
}

function medicalCoat(c) {
  return `<path d="M37 39c-12 12-15 31-13 62h12l5-29 4 29h30l4-29 5 29h12c2-31-1-50-13-62-11 7-35 7-46 0Z" fill="${c.light}" opacity=".95" stroke="${c.accent}" stroke-width="1.1"/>
    <path d="M49 47c3 8 7 13 11 15 5-2 8-7 11-15" fill="none" stroke="${c.deep}" stroke-width="1.2" opacity=".55"/>
    <path d="M45 79h9M66 79h9" stroke="${c.accent}" stroke-width="1" opacity=".55"/>`;
}

function medicalScrubs(c) {
  return `<path d="M38 38c-8 10-11 27-10 50h13l4-24 4 24h28l4-24 4 24h13c1-23-2-40-10-50-13 7-39 7-50 0Z" fill="${c.primary}" opacity=".95" stroke="${c.accent}" stroke-width="1.1"/>
    <path d="M51 41c4 9 14 9 18 0" fill="none" stroke="${c.light}" stroke-width="1.8" opacity=".8"/>
    <path d="M48 66h24" stroke="${c.light}" stroke-width="1" opacity=".45"/>`;
}

function medicalStethoscope(c) {
  return `<path d="M44 48c1 16 7 24 16 24s15-8 16-24" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
    <path d="M71 54c8 1 12 7 9 13-2 4-7 5-9 2" fill="none" stroke="${c.accent}" stroke-width="2"/>
    <circle cx="81" cy="68" r="4" fill="${c.light}" stroke="${c.accent}" stroke-width="1.3"/>
    <path d="M60 72v7" stroke="${c.accent}" stroke-width="1.6"/>`;
}

function medicalBadge(c) {
  return `<rect x="45" y="54" width="15" height="10" rx="2" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/>
    <path d="M48 57h9M48 60h6" stroke="${c.deep}" stroke-width="1" opacity=".75"/>
    <path d="M45 52c3-2 6-2 8 0" stroke="${c.accent}" stroke-width="1.2" fill="none"/>`;
}

function medicalClipboard(c) {
  return `<g transform="rotate(-6 88 76)">
    <rect x="80" y="63" width="18" height="23" rx="2" fill="${c.light}" stroke="${c.accent}" stroke-width="1.2"/>
    <rect x="84" y="61" width="10" height="4" rx="1" fill="${c.accent}"/>
    <path d="M84 70h10M84 74h10M84 78h6" stroke="${c.deep}" stroke-width="1" opacity=".7"/>
  </g>`;
}

function medicalHeart(c, x = 82, y = 80) {
  return `<path d="M${x} ${y + 3}c-6-7-12-2-10 3 1 5 10 10 10 10s9-5 10-10c2-5-4-10-10-3Z" fill="${c.accent}" opacity=".85" stroke="${c.light}" stroke-width=".9"/>`;
}

function medicalMoon(c) {
  return `<path d="M87 24c-8 2-12 10-9 17 2 6 9 9 15 7-7 5-16 1-19-6-4-9 3-18 13-18Z" fill="${c.accent}" opacity=".75"/>`;
}

function medicalScalpel(c) {
  return `<path d="M88 57 98 36" stroke="${c.light}" stroke-width="3" stroke-linecap="round"/><path d="M98 36l4-7 3 3-3 8Z" fill="${c.accent}"/><path d="M86 60l5 2" stroke="${c.accent}" stroke-width="2"/>`;
}

function medicalCross(c) {
  return `<path d="M84 42h9v6h6v9h-6v6h-9v-6h-6v-9h6Z" fill="${c.accent}" opacity=".8" stroke="${c.light}" stroke-width=".8"/>`;
}

function medicalCoffee(c) {
  return `<g transform="rotate(8 88 82)"><rect x="80" y="70" width="16" height="20" rx="5" fill="${c.light}" stroke="${c.accent}" stroke-width="1.2"/><path d="M96 75c6 0 6 9 0 9" fill="none" stroke="${c.accent}" stroke-width="1.5"/><path d="M85 65c-2-4 3-6 1-10M91 65c-2-4 3-6 1-10" stroke="${c.light}" stroke-width="1.1" fill="none" opacity=".7"/></g>`;
}

function medicalTablet(c) {
  return `<rect x="79" y="58" width="20" height="27" rx="3" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/><rect x="82" y="62" width="14" height="18" rx="1" fill="${c.light}" opacity=".55"/><path d="M85 67h8M85 71h8M85 75h5" stroke="${c.accent}" stroke-width="1"/>`;
}

function medicalGown(c) {
  return `<path d="M38 39c-10 11-13 30-11 60h15l6-30 6 30h12l6-30 6 30h15c2-30-1-49-11-60-13 7-41 7-54 0Z" fill="${c.light}" opacity=".55" stroke="${c.accent}" stroke-width="1.1"/><path d="M46 50c5 7 23 7 28 0" stroke="${c.accent}" stroke-width="1" fill="none"/>`;
}

function medicalSuit(c) {
  return `<path d="M38 38c-9 12-12 30-10 61h13l5-32 4 32h20l4-32 5 32h13c2-31-1-49-10-61-14 8-40 8-54 0Z" fill="${c.deep}" opacity=".9"/><path d="M52 41 60 57 68 41" fill="${c.light}" stroke="${c.accent}" stroke-width="1.2"/><path d="M60 57v22" stroke="${c.accent}" stroke-width="1.2"/>`;
}

function medicalCap(c) {
  return `<path d="M36 30c3-10 12-15 24-15s21 5 24 15Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1.2"/><path d="M36 30h48M43 30v-5M77 30v-5" stroke="${c.accent}" stroke-width="1.1"/>`;
}

function medicalMask(c) {
  return `<path d="M42 57c5-4 31-4 36 0l-3 14c-8 5-22 5-30 0Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1.1"/><path d="M44 60c9-3 23-3 32 0M44 64c9-2 23-2 32 0" stroke="${c.accent}" stroke-width=".9" opacity=".7"/>`;
}

function medicalHeadlamp(c) {
  return `<path d="M45 27c8-9 22-9 30 0" fill="none" stroke="${c.light}" stroke-width="3"/><circle cx="60" cy="25" r="5" fill="${c.accent}" stroke="${c.light}" stroke-width="1"/><path d="M54 30 45 44M66 30l9 14" stroke="${c.light}" stroke-width="1.3"/>`;
}

function medicalBalloon(c) {
  return `<path d="M87 61c-1-10 7-17 15-13 7 4 6 14-2 18-4 2-7 1-9-1" fill="${c.accent}" opacity=".8"/><path d="M92 67c-1 7 4 9 2 15" stroke="${c.light}" stroke-width="1.2" fill="none"/>`;
}

function medicalFlower(c) {
  return `<g transform="translate(88 80)" fill="${c.accent}"><circle cx="0" cy="-6" r="3"/><circle cx="6" cy="-1" r="3"/><circle cx="3" cy="6" r="3"/><circle cx="-4" cy="6" r="3"/><circle cx="-7" cy="-1" r="3"/></g><circle cx="88" cy="80" r="2.2" fill="${c.light}"/>`;
}

function medicalCast(c) {
  return `<path d="M79 74h15v22H79Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1.2"/><path d="M82 78h9M82 82h9M82 86h6" stroke="${c.accent}" stroke-width="1" opacity=".65"/>`;
}

function medicalBone(c) {
  return `<path d="M84 43c-4-4-2-8 3-8 3 0 4 2 5 5 1-3 2-5 5-5 5 0 7 4 3 8M87 57h12l-2 10h-8Z" fill="${c.light}" opacity=".8" stroke="${c.accent}" stroke-width="1"/>`;
}

function medicalMonitor(c) {
  return `<rect x="77" y="41" width="24" height="17" rx="2" fill="${c.deep}" stroke="${c.accent}" stroke-width="1"/><path d="M80 50h5l2-5 3 10 3-7h5" stroke="${c.light}" stroke-width="1.2" fill="none"/><path d="M84 58v8M76 68h18" stroke="${c.accent}" stroke-width="1.2"/>`;
}

function medicalMop(c) {
  return `<path d="M92 34 82 98" stroke="${c.light}" stroke-width="2.2"/><path d="M76 95c7-4 15-4 22 0l-3 8H78Z" fill="${c.accent}" opacity=".75"/><path d="M79 101v8M86 101v9M93 101v8" stroke="${c.light}" stroke-width="1.4"/><rect x="83" y="86" width="13" height="11" rx="2" fill="${c.light}" opacity=".55"/>`;
}

function medicalPaw(c) {
  return `<g fill="${c.accent}" opacity=".8"><circle cx="83" cy="80" r="3"/><circle cx="91" cy="79" r="3"/><circle cx="97" cy="84" r="3"/><circle cx="88" cy="89" r="4"/></g>`;
}

function medicalVest(c) {
  return `<path d="M39 41c-6 14-7 33-5 55h14l3-32 4 32h10l4-32 3 32h14c2-22 1-41-5-55-12 6-31 6-42 0Z" fill="${c.accent}" opacity=".32" stroke="${c.accent}" stroke-width="1.1"/><path d="M47 53h26M47 65h26M47 77h26" stroke="${c.light}" stroke-width="1" opacity=".55"/>`;
}

function medicalUniform(c) {
  return `<path d="M38 39c-9 12-12 29-10 59h13l5-29 4 29h20l4-29 5 29h13c2-30-1-47-10-59-14 8-40 8-54 0Z" fill="${c.deep}" opacity=".9"/><path d="M48 41 60 55 72 41" fill="none" stroke="${c.light}" stroke-width="1.2"/><path d="M45 60h30" stroke="${c.accent}" stroke-width="1.3"/>`;
}

const MEDICAL_ART = {
  lead: (c) => `${medicalHair(c, 'long')}${medicalCoat(c)}${medicalStethoscope(c)}${medicalBadge(c)}${medicalClipboard(c)}`,
  neuro: (c) => `${medicalCap(c)}${medicalHeadlamp(c)}${medicalCoat(c)}${medicalHeart(c, 83, 69)}${medicalCross(c)}`,
  cardio: (c) => `${medicalHair(c, 'short')}${medicalCoat(c)}${medicalStethoscope(c)}${medicalHeart(c)}${medicalCross(c)}`,
  pediatric: (c) => `${medicalHair(c, 'curl')}${medicalCoat(c)}${medicalStethoscope(c)}${medicalBalloon(c)}${medicalHeart(c, 86, 95)}`,
  surgeon: (c) => `${medicalCap(c)}${medicalMask(c)}${medicalScrubs(c)}${medicalScalpel(c)}${medicalBadge(c)}`,
  plastic: (c) => `${medicalHair(c, 'bun')}${medicalCoat(c)}${medicalStethoscope(c)}${medicalHeart(c)}${medicalFlower(c)}`,
  intern: (c) => `${medicalHair(c, 'short')}${medicalScrubs(c)}${medicalStethoscope(c)}${medicalBadge(c)}${medicalCoffee(c)}`,
  intern2: (c) => `${medicalHair(c, 'curl')}${medicalScrubs(c)}${medicalBadge(c)}${medicalTablet(c)}${medicalCoffee(c)}`,
  resident: (c) => `${medicalHair(c, 'bun')}${medicalScrubs(c)}${medicalStethoscope(c)}${medicalClipboard(c)}${medicalBadge(c)}`,
  chief: (c) => `${medicalHair(c, 'short')}${medicalCoat(c)}${medicalBadge(c)}${medicalClipboard(c)}${medicalCross(c)}${medicalCoffee(c)}`,
  mentor: (c) => `${medicalHair(c, 'short')}${medicalCoat(c)}${medicalStethoscope(c)}${medicalCoffee(c)}${medicalHeart(c)}`,
  ob: (c) => `${medicalHair(c, 'long')}${medicalCoat(c)}${medicalHeart(c)}${medicalFlower(c)}${medicalBadge(c)}`,
  ortho: (c) => `${medicalHair(c, 'short')}${medicalScrubs(c)}${medicalCast(c)}${medicalBone(c)}${medicalBadge(c)}`,
  patient: (c) => `${medicalHair(c, 'short')}${medicalGown(c)}${medicalMonitor(c)}${medicalHeart(c, 44, 75)}`,
  admin: (c) => `${medicalHair(c, 'bun')}${medicalSuit(c)}${medicalBadge(c)}${medicalClipboard(c)}${medicalCoffee(c)}`,
  trauma: (c) => `${medicalCap(c)}${medicalMask(c)}${medicalScrubs(c)}${medicalCross(c)}${medicalClipboard(c)}`,
  anesthesiologist: (c) => `${medicalHair(c, 'short')}${medicalScrubs(c)}${medicalCap(c)}${medicalMask(c)}${medicalMonitor(c)}`,
  nurse: (c) => `${medicalHair(c, 'bun')}${medicalScrubs(c)}${medicalCap(c)}${medicalHeart(c)}${medicalTablet(c)}`,
  scrubnurse: (c) => `${medicalHair(c, 'short')}${medicalScrubs(c)}${medicalCap(c)}${medicalTablet(c)}${medicalHeart(c, 83, 94)}`,
  vet: (c) => `${medicalHair(c, 'short')}${medicalCoat(c)}${medicalStethoscope(c)}${medicalPaw(c)}${medicalHeart(c, 83, 58)}`,
  bomb: (c) => `${medicalHair(c, 'short')}${medicalVest(c)}${medicalHeadlamp(c)}${medicalTablet(c)}`,
  military: (c) => `${medicalHair(c, 'short')}${medicalUniform(c)}${medicalBadge(c)}${medicalCross(c)}`,
  janitor: (c) => `${medicalHair(c, 'short')}${medicalScrubs(c)}${medicalMop(c)}${medicalBadge(c)}`,
  surgeon2: (c) => `${medicalCap(c)}${medicalMask(c)}${medicalCoat(c)}${medicalScalpel(c)}${medicalClipboard(c)}`,
  transplant: (c) => `${medicalHair(c, 'short')}${medicalCoat(c)}${medicalStethoscope(c)}${medicalClipboard(c)}${medicalMonitor(c)}`,
  nurse2: (c) => `${medicalHair(c, 'bun')}${medicalScrubs(c)}${medicalCap(c)}${medicalTablet(c)}${medicalHeart(c, 87, 94)}`,
  therapist: (c) => `${medicalHair(c, 'long')}${medicalCoat(c)}${medicalClipboard(c)}${medicalHeart(c, 84, 96)}`,
  tech: (c) => `${medicalHair(c, 'short')}${medicalScrubs(c)}${medicalTablet(c)}${medicalBadge(c)}`,
};

function signatureMedicalTV(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.medicalTV) return '';
  const show = MEDICAL_SHOWS[meta.medicalShowKey] || MEDICAL_SHOWS.greys;
  const art = MEDICAL_ART[meta.medicalArt] || MEDICAL_ART.resident;
  const aura = MEDICAL_AURAS[meta.medicalShowKey] || MEDICAL_AURAS.greys;
  return `<g class="medical-signature">
    ${aura(c)}
    <path d="M25 104h70" stroke="${c.accent}" stroke-width="1.2" opacity=".45"/>
    <path d="M25 104h18" stroke="${c.light}" stroke-width="2" opacity=".7"/>
    <path d="M69 15c5 0 9 3 11 7" fill="none" stroke="${show.accent}" stroke-width="1.2" opacity=".5"/>
    ${art(c)}
  </g>`;
}
