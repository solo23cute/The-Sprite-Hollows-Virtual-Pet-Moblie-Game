/* Parametric creature art. Everything is drawn from the sprite's genetics. */

function resolvePalette(sprite) {
  const finish = finishOf(sprite);
  if (finish) {
    return { body: finish.body, light: finish.light, deep: finish.deep, accent: finish.accent, belly: finish.belly };
  }
  const el = ELEMENTS[sprite.element] || ELEMENTS.bloom;
  const base = {
    body: el.primary,
    light: el.light,
    deep: el.deep,
    accent: el.accent,
    belly: lighten(el.primary, 0.55),
  };
  if (sprite.palette === 'custom' && sprite.custom) {
    return {
      body: sprite.custom.body || base.body,
      light: sprite.custom.light || base.light,
      deep: sprite.custom.deep || base.deep,
      accent: sprite.custom.accent || base.accent,
      belly: sprite.custom.belly || lighten(sprite.custom.body || base.body, 0.55),
    };
  }
  if (sprite.palette && sprite.palette !== 'native' && PALETTES[sprite.palette]) {
    const p = PALETTES[sprite.palette];
    return { body: p.body, light: p.light, deep: p.deep, accent: p.accent, belly: p.belly };
  }
  return base;
}

function elementOf(sprite) {
  return ELEMENTS[sprite.element] || ELEMENTS.bloom;
}

function bodyPath(breed) {
  switch (breed) {
    case 'sprig':
      return 'M60 22c17 0 29 15 29 34 0 24-12 42-29 42S31 80 31 56c0-19 12-34 29-34Z';
    case 'flit':
      return 'M60 30c17 0 30 14 30 34s-13 33-30 33-30-13-30-33 13-34 30-34Z';
    case 'horn':
      return 'M60 28c18 0 31 15 31 35 0 21-13 35-31 35S29 84 29 63c0-20 13-35 31-35Z';
    case 'bun':
      return 'M60 31c16 0 27 12 27 30 0 15-4 22-8 29-4 7-11 10-19 10s-15-3-19-10c-4-7-8-14-8-29 0-18 11-30 27-30Z';
    case 'fin':
      return 'M60 28c19 0 32 15 32 35 0 21-13 35-32 35S28 84 28 63c0-20 13-35 32-35Z';
    case 'shell':
      return 'M60 28c19 0 33 15 33 35 0 15-5 23-10 29-5 6-14 9-23 9s-18-3-23-9c-5-6-10-14-10-29 0-20 14-35 33-35Z';
    case 'star':
      return 'M60 24l9 24 25 3-19 17 6 25-21-13-21 13 6-25-19-17 25-3Z';
    case 'blob':
      return 'M60 27c19 0 33 13 33 31 0 12-3 18-5 25-2 6-8 11-14 8-5-3-8 3-14 3s-10-6-14-3c-6 3-12-2-14-8-2-7-5-13-5-25 0-18 14-31 33-31Z';
    case 'wisp':
      return 'M60 25c18 0 31 13 31 30 0 10-4 16-7 23-3 6-3 12-10 12-5 0-6-5-10-5s-8 6-13 2c-4-3-1-9-3-14-3-8-8-12-8-18 0-17 13-30 30-30Z';
    default:
      return 'M60 26c19 0 33 15 33 37 0 22-14 36-33 36S27 85 27 63c0-22 14-37 33-37Z';
  }
}

const STAGE_SCALE = { baby: 0.78, juvenile: 0.9, sprite: 1, elder: 1.07, ancient: 1.13, sensei: 1.19 };

function eyeMarkup(expr, baby, delay) {
  const rx = baby ? 7.4 : 6.5;
  const ry = baby ? 9.2 : 8;
  const eye = (x) => `
    <g class="b-eye" style="animation-delay:${delay}s">
      <ellipse cx="${x}" cy="60" rx="${rx}" ry="${ry}" fill="#1d1734"/>
      <circle cx="${x + 2}" cy="56.6" r="${baby ? 2.9 : 2.4}" fill="#ffffff"/>
      <circle cx="${x - 2.2}" cy="63.4" r="1.25" fill="#ffffff" opacity=".5"/>
    </g>`;
  if (expr === 'sleep') {
    return `
      <path d="M40 59.5q7 6.5 14 0" stroke="#1d1734" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M66 59.5q7 6.5 14 0" stroke="#1d1734" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M42 55.5l-2.5-2M78 55.5l2.5-2" stroke="#1d1734" stroke-width="2" stroke-linecap="round" opacity=".7"/>`;
  }
  if (expr === 'happy' || expr === 'eat') {
    return `
      <path d="M40 61q7 -9 14 0" stroke="#1d1734" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M66 61q7 -9 14 0" stroke="#1d1734" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  }
  if (expr === 'love') {
    const heart = (x) => `
      <path d="M${x} 55c-3.4-4.6-9.4-2-9.4 2.7 0 4.6 9.4 9.3 9.4 9.3s9.4-4.7 9.4-9.3c0-4.7-6-7.3-9.4-2.7Z" fill="#ff5e8a" stroke="#1d1734" stroke-width="1.6"/>`;
    return heart(47) + heart(73);
  }
  if (expr === 'angry') {
    return `
      <path d="M39 52l13 4" stroke="#1d1734" stroke-width="3" stroke-linecap="round"/>
      <path d="M81 52l-13 4" stroke="#1d1734" stroke-width="3" stroke-linecap="round"/>
      ${eye(47)}${eye(73)}`;
  }
  if (expr === 'sad') {
    return `
      <path d="M39 51q6-4 12-1" stroke="#1d1734" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M81 51q-6-4-12-1" stroke="#1d1734" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      ${eye(47)}${eye(73)}`;
  }
  if (expr === 'grump') {
    return `
      <g class="b-eye" style="animation-delay:${delay}s">
        <rect x="40.5" y="55" width="13" height="10" rx="5.5" fill="#1d1734"/>
        <circle cx="49" cy="58" r="1.8" fill="#fff" opacity=".85"/>
      </g>
      <g class="b-eye" style="animation-delay:${delay}s">
        <rect x="66.5" y="55" width="13" height="10" rx="5.5" fill="#1d1734"/>
        <circle cx="75" cy="58" r="1.8" fill="#fff" opacity=".85"/>
      </g>`;
  }
  return eye(47) + eye(73);
}

function mouthMarkup(expr) {
  if (expr === 'sleep') return `<ellipse cx="60" cy="76" rx="2.6" ry="3" fill="#1d1734" opacity=".75"/>`;
  if (expr === 'eat') return `<path d="M51 73q9 13 18 0z" fill="#1d1734"/><path d="M56 79q4 4 8 0" fill="#ff8fa3"/>`;
  if (expr === 'happy' || expr === 'love') {
    return `<path d="M51 73q9 12 18 0z" fill="#1d1734"/><path d="M56 79.5q4 3.5 8 0" fill="#ff8fa3"/>`;
  }
  if (expr === 'sad') return `<path d="M53 80q7-6 14 0" stroke="#1d1734" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  if (expr === 'grump') return `<path d="M54 78h12" stroke="#1d1734" stroke-width="2.8" stroke-linecap="round"/>`;
  if (expr === 'dirty') return `<path d="M53 75q3.5 3 7 0 3.5 3 7 0" stroke="#1d1734" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  return `<path d="M54 74q6 6 12 0" stroke="#1d1734" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
}

/* Signature silhouettes for the named character sprites. */
function signatureFeature(el, c) {
  return (typeof signatureCollectionSecret === 'function' ? signatureCollectionSecret(el, c) : '') ||
    (typeof signaturePony === 'function' ? signaturePony(el, c) : '') ||
    (typeof signatureNetflix === 'function' ? signatureNetflix(el, c) : '') ||
    (typeof signatureTVLegacy === 'function' ? signatureTVLegacy(el, c) : '') ||
    (typeof signatureRealmWave === 'function' ? signatureRealmWave(el, c) : '') ||
    (typeof signatureKingdomHearts === 'function' ? signatureKingdomHearts(el, c) : '') ||
    (typeof signatureGTA === 'function' ? signatureGTA(el, c) : '') ||
    (typeof signatureFortniteLegacy === 'function' ? signatureFortniteLegacy(el, c) : '') ||
    (typeof signatureWWE === 'function' ? signatureWWE(el, c) : '') ||
    (typeof signatureBiome === 'function' ? signatureBiome(el, c) : '') || signatureAnimal(el, c) || signatureCrossover(el, c) || signatureDC(el, c) || signatureWave(el, c) || (typeof signatureCareBear === 'function' ? signatureCareBear(el, c) : '') ||    (typeof signatureHero === 'function' ? signatureHero(el, c) : '') || signaturePokedex(el, c) || signatureFortnite(el, c) || signatureSeasonal(el, c) || (typeof signatureTrick === 'function' ? signatureTrick(el, c) : '') || (typeof signatureBase === 'function' ? signatureBase(el, c) : '') || (typeof signatureVariant === 'function' ? signatureVariant(el, c) : '') || (typeof signatureLegend === 'function' ? signatureLegend(el, c) : '') || (typeof signatureCatalog === 'function' ? signatureCatalog(el, c) : '') || signatureA(el, c) || signatureB(el, c);
}

function signatureA(el, c) {
  switch (el) {
    case 'fishy':
      return `
        <path d="M48 28c-1-10 5-18 14-20 1 9-2 16-8 20Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M54 24c1-6 5-10 9-12-1 6-3 11-6 14Z" fill="${c.light}" opacity=".8"/>
        <path d="M31 62c-9-6-14 2-9 10 4 5 9 2 12-3Z" fill="${c.light}" opacity=".8"/>
        <path d="M86 78c11 2 17 9 16 19-8 0-14-6-17-13Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width="1"/>
        <path d="M94 88c4 1 7 4 8 8" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".6"/>
        <circle cx="94" cy="40" r="3.4" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".7"/>
        <circle cx="101" cy="31" r="2.2" fill="none" stroke="${c.light}" stroke-width="1" opacity=".55"/>
        <path d="M90 54a5 5 0 1 1-7-5 4 4 0 0 0 7 5Z" fill="${c.light}" opacity=".65"/>`;
    case 'striker':
      return `
        <path d="M39 38q21-8 42 0" stroke="${c.accent}" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="31" cy="95" r="9" fill="#ffffff" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M27 91l4 3-2 5 5 1" fill="none" stroke="${c.deep}" stroke-width="1.1"/>
        <circle cx="31" cy="95" r="2.2" fill="${c.deep}"/>
        <path d="M92 50l7-2M93 58l7 1M89 66l6 3" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
    case 'aura':
      return `
        <circle cx="60" cy="62" r="52" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity=".3"/>
        <circle cx="60" cy="62" r="45" fill="none" stroke="${c.light}" stroke-width="1" stroke-dasharray="3 8" opacity=".45"/>
        <path d="M60 2l2.2 6.4 6.4 2.2-6.4 2.2L60 19l-2.2-6.2-6.4-2.2 6.4-2.2Z" fill="${c.light}"/>
        <circle cx="26" cy="40" r="2" fill="${c.accent}" opacity=".8"/>
        <circle cx="96" cy="84" r="2.4" fill="${c.light}" opacity=".8"/>
        <path d="M95 26l1.2 3.4 3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4-3.4-1.2 3.4-1.2Z" fill="${c.accent}" opacity=".7"/>`;
    case 'six':
      return `
        <path d="M60 1l13 7.5v15L60 31l-13-7.5v-15Z" fill="none" stroke="${c.accent}" stroke-width="1.5" opacity=".85"/>
        <text x="60" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="${c.accent}">6</text>
        <circle cx="60" cy="33" r="1.8" fill="${c.accent}"/>`;
    case 'seven':
      return `
        <path d="M60 1l12 13-12 13-12-13Z" fill="none" stroke="${c.accent}" stroke-width="1.5" opacity=".85"/>
        <text x="60" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="${c.accent}">7</text>
        <path d="M60 31v4" stroke="${c.accent}" stroke-width="1.6" stroke-linecap="round"/>`;
    case 'king':
      return `
        <path d="M38 28l5-18 9 9 8-14 8 14 9-9 5 18Z" fill="#ffd166" stroke="#a86a00" stroke-width="1.4" stroke-linejoin="round"/>
        <circle cx="60" cy="20" r="2.4" fill="#ff5e8a"/>
        <circle cx="47" cy="23" r="1.8" fill="#8be9ff"/>
        <circle cx="73" cy="23" r="1.8" fill="#b69cff"/>
        <path d="M31 86c9 5 19 7 29 7s20-2 29-7l3 9c-10 5-20 8-32 8s-22-3-32-8Z" fill="${c.accent}" opacity=".9"/>
        <path d="M31 86c9 5 19 7 29 7s20-2 29-7" stroke="#ffd166" stroke-width="1.6" fill="none"/>`;
    case 'queen':
      return `
        <path d="M42 26l4-14 7 7 7-11 7 11 7-7 4 14Z" fill="#ffd166" stroke="#a86a00" stroke-width="1.2" stroke-linejoin="round"/>
        <circle cx="60" cy="15" r="2" fill="#ff5e8a"/>
        <circle cx="30" cy="80" r="2.6" fill="#ffd166"/><circle cx="90" cy="80" r="2.6" fill="#ffd166"/>
        <path d="M40 90q20 10 40 0" stroke="#ffd166" stroke-width="1.8" fill="none" stroke-dasharray="2 4"/>
        <path d="M88 34c6 2 8 8 5 12" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".7"/>`;
    case 'ghost':
      return `
        <path d="M30 52c0-16 13-27 30-27s30 11 30 27v42c0 5-6 6-9 3-3-3-7-3-10 0s-7 3-10 0-7-3-10 0-6 2-6-3Z" fill="${c.light}" opacity=".16" stroke="${c.light}" stroke-width="1" stroke-dasharray="4 5"/>
        <circle cx="27" cy="50" r="2.4" fill="${c.accent}" opacity=".8"/>
        <circle cx="95" cy="72" r="1.8" fill="${c.accent}" opacity=".7"/>
        <path d="M90 36l1.2 3.2 3.2 1.2-3.2 1.2L90 45l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".8"/>`;
    case 'skull':
      return `
        <path d="M39 80c-2 6 2 11 9 11h24c7 0 11-5 9-11" fill="${c.light}" opacity=".9" stroke="${c.deep}" stroke-width="1"/>
        <path d="M49 84v7M60 84v7M71 84v7" stroke="${c.deep}" stroke-width="1.3"/>
        <path d="M35 40c4-3 9-4 13-2M85 40c-4-3-9-4-13-2" stroke="${c.light}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".85"/>
        <path d="M60 30l-4 6 4 4M87 58l4 5-3 5" stroke="${c.deep}" stroke-width="1.3" fill="none" opacity=".5"/>
        <circle cx="28" cy="66" r="2" fill="${c.light}" opacity=".6"/>`;
    case 'death':
      return `
        <path d="M35 54c-5-20 5-34 17-38 2 10 3 22 1 32Z" fill="${c.deep}" opacity=".9"/>
        <path d="M85 54c5-20-5-34-17-38-2 10-3 22-1 32Z" fill="${c.deep}" opacity=".9"/>
        <path d="M96 20l8 82" stroke="#8a6a4a" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M96 20c-11 0-18 6-20 15 8-3 16-1 21 4Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>
        <circle cx="60" cy="13" r="2" fill="${c.accent}"/>`;
    case 'lootllama':
      return `
        <path d="M44 30c-6-12-6-22-1-26 5 2 8 11 9 22Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M76 30c6-12 6-22 1-26-5 2-8 11-9 22Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M46 24c-3-8-3-14-1-16 2 2 4 8 5 14Z" fill="${c.accent}" opacity=".7"/>
        <path d="M74 24c3-8 3-14 1-16-2 2-4 8-5 14Z" fill="${c.accent}" opacity=".7"/>
        <path d="M30 84h60l-5 11H35Z" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M37 95v6M49 95v6M71 95v6M83 95v6" stroke="${c.accent}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M92 42l1.6 4.4 4.4 1.6-4.4 1.6L92 54l-1.6-4.4-4.4-1.6 4.4-1.6Z" fill="${c.accent}" opacity=".9"/>`;
    case 'duck':
      return `
        <ellipse cx="60" cy="78" rx="16" ry="6.2" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="54" cy="76" r="1.1" fill="${c.deep}" opacity=".7"/><circle cx="66" cy="76" r="1.1" fill="${c.deep}" opacity=".7"/>
        <path d="M30 68c-8 5-7 15 2 18 5 2 9-1 10-6" fill="${c.light}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <path d="M20 96q20-7 40 0t40 0" stroke="${c.light}" stroke-width="1.8" fill="none" opacity=".55"/>
        <path d="M44 24c-4-5-2-10 3-10 3 0 5 3 4 6" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".55"/>`;
    case 'peely':
      return `
        <path d="M45 34c-9-12-9-25-2-30 6 4 8 15 9 25Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M60 32c-3-14 0-26 6-30 5 5 3 18 2 28Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M75 34c9-12 9-25 2-30-6 4-8 15-9 25Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="43" cy="6" r="2.2" fill="${c.accent}"/><circle cx="67" cy="3" r="2.2" fill="${c.accent}"/><circle cx="78" cy="6" r="2.2" fill="${c.accent}"/>
        <path d="M53 40c5 3 10 3 15 0" stroke="${c.deep}" stroke-width="1.2" fill="none" opacity=".5"/>`;
    case 'dream':
      return `
        <path d="M32 24c-6 0-8-6-4-9 3-3 7-1 8 2 1-5 7-7 10-3 3-3 8-1 8 4 4-1 6 4 3 7-2 2-5 2-7 1H34Z" fill="${c.light}" opacity=".9" stroke="${c.deep}" stroke-width=".9"/>
        <text x="88" y="24" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="${c.accent}">z</text>
        <text x="94" y="17" font-family="system-ui, sans-serif" font-size="7" font-weight="700" fill="${c.light}">z</text>
        <path d="M92 52l1.2 3.4 3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4-3.4-1.2 3.4-1.2Z" fill="${c.light}" opacity=".8"/>
        <circle cx="27" cy="48" r="1.8" fill="${c.accent}" opacity=".7"/>`;
    case 'zeropoint':
      return `
        <circle cx="60" cy="15" r="12" fill="${c.accent}" opacity=".22"/>
        <circle cx="60" cy="15" r="6" fill="${c.light}"/>
        <ellipse cx="60" cy="15" rx="19" ry="5" fill="none" stroke="${c.accent}" stroke-width="1.2" transform="rotate(-18 60 15)"/>
        <ellipse cx="60" cy="15" rx="15" ry="4" fill="none" stroke="${c.light}" stroke-width=".9" transform="rotate(24 60 15)" opacity=".7"/>
        <path d="M36 44l5 6-5 6M84 52l-5 6 5 6M44 94l4-5" stroke="${c.accent}" stroke-width="1.4" fill="none" opacity=".65"/>
        <circle cx="96" cy="80" r="1.8" fill="${c.light}" opacity=".8"/>`;
    case 'punk':
      return `
        <path d="M49 31l-3-15 9 8 5-16 5 16 9-8-3 15Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M33 88h54l3 9H30Z" fill="${c.deep}" opacity=".9"/>
        <circle cx="40" cy="92" r="1.5" fill="${c.light}"/><circle cx="52" cy="92" r="1.5" fill="${c.light}"/><circle cx="68" cy="92" r="1.5" fill="${c.light}"/><circle cx="80" cy="92" r="1.5" fill="${c.light}"/>
        <path d="M93 46l7 7-4 10" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".8"/>
        <circle cx="93" cy="46" r="1.4" fill="${c.light}"/>`;
    case 'batman':
      return `
        <path d="M38 40c0-14 10-22 22-22s22 8 22 22c-5-2-9-5-12-8-2 5-6 8-10 10-4-2-8-5-10-10-3 3-7 6-12 8Z" fill="#1d1734" opacity=".95"/>
        <path d="M39 32L34 6l13 9Z" fill="#1d1734"/>
        <path d="M81 32L86 6 73 15Z" fill="#1d1734"/>
        <path d="M33 66c-8 4-11 12-9 22l9-4Z" fill="#1d1734" opacity=".9"/>
        <path d="M87 66c8 4 11 12 9 22l-9-4Z" fill="#1d1734" opacity=".9"/>
        <ellipse cx="60" cy="89" rx="11" ry="6.5" fill="${c.accent}"/>
        <path d="M52 89c3-3 5-1 8 0 3-1 5-3 8 0-2 3-5 4-8 4s-6-1-8-4Z" fill="#1d1734"/>
        <ellipse cx="47" cy="60" rx="7.2" ry="4.6" fill="#e8f4ff" transform="rotate(-8 47 60)"/>
        <ellipse cx="73" cy="60" rx="7.2" ry="4.6" fill="#e8f4ff" transform="rotate(8 73 60)"/>
        <circle cx="47" cy="60" r="2.2" fill="#14141c"/><circle cx="73" cy="60" r="2.2" fill="#14141c"/>`;
    case 'superman':
      return `
        <path d="M61 31c-3-6 1-10 5-9-2 2-1 5 2 6" stroke="${c.deep}" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M32 64c-9 5-12 14-9 24l10-4Z" fill="${c.accent}"/>
        <path d="M88 64c9 5 12 14 9 24l-10-4Z" fill="${c.accent}"/>
        <path d="M60 78l9 4-2 10-7 5-7-5-2-10Z" fill="#ffd166" stroke="${c.deep}" stroke-width="1"/>
        <path d="M60 82c3 0 4 2 3 4 2 0 3 2 1 4-1 1-3 1-4 0-1 1-3 1-4 0-2-2-1-4 1-4-1-2 0-4 3-4Z" fill="${c.accent}"/>`;
    case 'ironmouse':
      return `
        <circle cx="37" cy="30" r="12" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="83" cy="30" r="12" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="37" cy="30" r="6" fill="${c.accent}" opacity=".85"/>
        <circle cx="83" cy="30" r="6" fill="${c.accent}" opacity=".85"/>
        <path d="M30 54c0-8 12-14 30-14s30 6 30 14" stroke="${c.accent}" stroke-width="2.6" fill="none"/>
        <path d="M32 54c-5 0-7 4-5 7 2 2 5 1 6-1" stroke="${c.deep}" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M87 58c5 2 7 8 3 12" stroke="${c.deep}" stroke-width="2" fill="none" stroke-linecap="round"/>
        <circle cx="89" cy="71" r="3" fill="${c.deep}" opacity=".85"/>
        <circle cx="91" cy="70" r="1" fill="${c.light}"/>
        <path d="M73 68c2-4 7-4 9 0 2 4-2 7-4.5 9-2.5-2-6.5-5-4.5-9Z" fill="${c.accent}" opacity=".9"/>`;
    case 'bullet':
      return `
        <path d="M42 33c0-15 8-25 18-25s18 10 18 25Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M42 33h36" stroke="${c.deep}" stroke-width="2"/>
        <path d="M36 40l-8-2M34 48l-8 1M38 56l-7 3" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
        <path d="M88 82c5 2 7 7 5 11-4-1-6-5-5-11Z" fill="${c.accent}" opacity=".85"/>
        <circle cx="93" cy="60" r="2" fill="${c.light}" opacity=".7"/>`;
    case 'burntpb':
      return `
        <path d="M37 32c0-9 7-15 16-15h14c9 0 16 6 16 15Z" fill="${c.light}" opacity=".5" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 30c2-5 7-8 13-8 3 0 5 1 7 3 3-3 8-2 10 2 4-1 7 1 8 4" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".7"/>
        <circle cx="42" cy="24" r="4" fill="${c.accent}" opacity=".75"/><circle cx="78" cy="23" r="5" fill="${c.accent}" opacity=".7"/>
        <path d="M43 14c-3-5 2-8 0-12M60 12c-3-5 2-8 0-12M75 14c-3-5 2-8 0-12" stroke="${c.light}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".4"/>
        <circle cx="60" cy="88" r="2" fill="${c.accent}" opacity=".5"/><circle cx="48" cy="72" r="1.4" fill="${c.accent}" opacity=".5"/>`;
    case 'headshot':
      return `
        <circle cx="60" cy="52" r="36" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity=".7"/>
        <path d="M60 12v8M60 84v8M20 52h8M92 52h8" stroke="${c.accent}" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>
        <circle cx="60" cy="52" r="2.4" fill="${c.accent}"/>
        <path d="M28 30l6 6M92 30l-6 6" stroke="${c.light}" stroke-width="1.4" opacity=".6"/>`;
    case 'cube':
      return `
        <path d="M60 2l12 7-12 7-12-7Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M48 9l12 7v15l-12-7Z" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
        <path d="M72 9l-12 7v15l12-7Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M25 55h6v6h-6Z" fill="${c.accent}" opacity=".5"/><path d="M92 74h5v5h-5Z" fill="${c.light}" opacity=".6"/>
        <path d="M31 82h4v4h-4Z" fill="${c.accent}" opacity=".4"/>`;
    case 'bombjr':
      return `
        <circle cx="60" cy="22" r="16" fill="${c.deep}" stroke="${c.light}" stroke-width="1.2"/>
        <path d="M46 27h28" stroke="${c.light}" stroke-width="2" opacity=".7"/>
        <path d="M68 9c5-6 12-5 14 1-4 3-9 2-11-1" stroke="${c.accent}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M85 5l2.4 5 5 2.4-5 2.4L85 20l-2.4-5.2-5-2.4 5-2.4Z" fill="${c.accent}"/>
        <path d="M88 40c5 2 7 7 4 11-4-1-6-5-4-11Z" fill="${c.light}" opacity=".35"/>`;
    case 'grim':
      return `
        <path d="M34 56c-6-22 6-38 19-42 1 12 2 24 0 36Z" fill="${c.deep}" opacity=".9"/>
        <path d="M86 56c6-22-6-38-19-42-1 12-2 24 0 36Z" fill="${c.deep}" opacity=".9"/>
        <path d="M96 20l8 82" stroke="#8a6a4a" stroke-width="3" stroke-linecap="round"/>
        <path d="M96 20c-11 0-18 6-20 15 8-3 16-1 21 4Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>
        <circle cx="60" cy="13" r="2" fill="${c.accent}"/>
        <path d="M84 16l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="${c.accent}" opacity=".7"/>`;
    case 'squibbly':
      return `
        <path d="M32 28c0-12 10-21 22-21 4-6 12-6 16 0 11 0 20 9 20 21 0 5-6 8-9 4-3-4-8-4-11 0-3 4-8 4-11 0-4-4-9-4-12 0-4 4-10 1-10-4Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="43" cy="15" r="7" fill="${c.light}" opacity=".55"/>
        <circle cx="66" cy="9" r="8" fill="${c.light}" opacity=".4"/>
        <circle cx="80" cy="18" r="6" fill="${c.light}" opacity=".45"/>
        <path d="M40 30c-3 12 0 24 4 32M80 30c3 12 0 24-4 32M53 32c-1 9 0 17 2 24M67 32c1 9 0 17-2 24" stroke="${c.deep}" stroke-width="1.5" fill="none" opacity=".55"/>
        <path d="M32 70c-5 2-7 8-4 12 3-1 6-5 7-8" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M89 66c5 2 7 8 3 11-3-1-5-4-5-7" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M44 20c3-3 7-3 9 0M64 16c3-3 7-2 8 1" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".8"/>`;
    case 'wrixel':
      return `
        <rect x="76" y="8" width="10" height="10" rx="2" fill="${c.accent}" opacity=".85"/>
        <rect x="90" y="22" width="6" height="6" rx="1" fill="${c.light}" opacity=".7"/>
        <rect x="30" y="16" width="8" height="8" rx="2" fill="${c.light}" opacity=".5"/>
        <path d="M44 26h32" stroke="${c.accent}" stroke-width="2" stroke-dasharray="3 3" opacity=".8"/>
        <path d="M38 44h10v10H38zM72 44h10v10H72z" fill="${c.deep}" opacity=".22"/>`;
    case 'phantom':
      return `
        <path d="M34 44c0-16 12-28 26-28s26 12 26 28c-6-4-13-6-26-6s-20 2-26 6Z" fill="${c.deep}" opacity=".5"/>
        <path d="M38 30c4-8 12-13 22-13s18 5 22 13" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".8"/>
        <path d="M42 42c-6 6-9 14-9 22M78 42c6 6 9 14 9 22" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".4"/>
        <circle cx="92" cy="34" r="3" fill="${c.accent}" opacity=".6"/>`;
    case 'mali':
      return `
        <path d="M34 32c7-9 16-14 26-14s19 5 26 14" stroke="${c.accent}" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="60" cy="12" r="5" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M92 46l6 10-6 10-6-10Z" fill="${c.accent}" opacity=".85"/>
        <path d="M28 74c8 5 16 7 24 7" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".5"/>`;
    case 'bastian':
      return `
        <path d="M60 2l6 12h-12Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M36 30c5-11 13-17 24-17s19 6 24 17" fill="${c.light}" opacity=".35"/>
        <path d="M94 58c8 3 12 10 12 18-6 0-11-3-14-8Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M96 66l4 6-4 6" stroke="${c.accent}" stroke-width="1.6" fill="none"/>`;
    case 'k1ttyw1ns':
      return `
        <path d="M42 30L38 8l18 13Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M78 30L82 8 64 21Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M45 25l-1-9 7 6Z" fill="${c.accent}" opacity=".7"/>
        <path d="M75 25l1-9-7 6Z" fill="${c.accent}" opacity=".7"/>
        <path d="M84 62c8 0 12 4 12 9" stroke="${c.deep}" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="96" cy="72" r="4" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>`;
    case 'gracecrowne':
      return `
        <path d="M38 26l6-18 10 10 6-14 6 14 10-10 6 18Z" fill="#ffd166" stroke="#a86a00" stroke-width="1.4" stroke-linejoin="round"/>
        <circle cx="60" cy="8" r="2.4" fill="#ff5e8a"/>
        <path d="M32 90c6 6 14 9 28 9s22-3 28-9" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".7"/>`;
    case 'geno':
      return `
        <path d="M32 30c8-10 18-15 28-15s20 5 28 15" fill="${c.deep}" opacity=".8"/>
        <path d="M38 34l8-6M82 34l-8-6" stroke="${c.accent}" stroke-width="2.4" stroke-linecap="round"/>
        <rect x="70" y="38" width="20" height="7" rx="3.5" fill="${c.accent}" opacity=".85"/>
        <path d="M20 92l10-10M100 92l-10-10" stroke="${c.deep}" stroke-width="2" opacity=".6"/>`;
    case 'nicorobin':
      return `
        <path d="M32 26h56l-8-14H40Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M28 26h64" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/>
        <path d="M44 30c-2 16 0 28 4 38M76 30c2 16 0 28-4 38" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".45"/>
        <path d="M84 60c8-2 13 2 14 8-6 3-12 2-16-2Z" fill="${c.body}" opacity=".7"/>`;
    case 'ace':
      return `
        <path d="M38 26h44l-5-14H43Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M32 26h56" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/>
        <path d="M60 4c2 4 5 6 8 6-2 3-5 4-8 4s-6-1-8-4c3 0 6-2 8-6Z" fill="${c.light}" opacity=".9"/>
        <path d="M30 70c6 8 14 13 24 15M90 62c5 7 7 14 6 22" stroke="${c.accent}" stroke-width="2.4" fill="none" opacity=".7"/>`;
    case 'cuddle':
      return `
        <circle cx="38" cy="22" r="11" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="82" cy="22" r="11" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="38" cy="22" r="5" fill="${c.accent}" opacity=".7"/>
        <circle cx="82" cy="22" r="5" fill="${c.accent}" opacity=".7"/>
        <path d="M60 84c-5-6-14-3-14 3 0 6 14 12 14 12s14-6 14-12c0-6-9-9-14-3Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>`;
    case 'charlotte':
      return `
        <path d="M84 16c6-6 14-4 14 2 0 6-8 10-14 6-6 4-14 0-14-6 0-6 8-8 14-2Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M30 34c8-6 18-7 27-4M90 34c-8-6-18-7-27-4" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".6"/>
        <circle cx="96" cy="82" r="3" fill="${c.light}" opacity=".8"/>`;
    case 'captainx':
      return `
        <path d="M26 28l10-16 24 10 24-10 10 16Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.3"/>
        <path d="M26 28h68" stroke="${c.accent}" stroke-width="2.4"/>
        <path d="M44 42h32" stroke="${c.deep}" stroke-width="2" opacity=".5"/>
        <path d="M88 50l10 4-10 4" fill="none" stroke="${c.accent}" stroke-width="2"/>`;
    case 'kirby':
      return `
        <path d="M60 2l3 8 8 1-6 6 2 8-7-4-7 4 2-8-6-6 8-1Z" fill="#ffe066" stroke="#a86a00" stroke-width="1"/>
        <circle cx="36" cy="70" r="6" fill="${c.accent}" opacity=".28"/>
        <circle cx="84" cy="70" r="6" fill="${c.accent}" opacity=".28"/>
        <path d="M40 96c5 4 11 6 20 6s15-2 20-6" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".4"/>`;
    default:
      return '';
  }
}

function signatureB(el, c) {
  switch (el) {
    case 'onewish':
      return `
        <path d="M30 30c0-15 13-27 30-27s30 12 30 27c0 5-6 7-9 3-3-4-8-4-11 0-3 4-8 4-11 0-4-4-9-4-12 0-3 4-9 2-9-3Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 13c4-5 10-7 17-7s13 2 17 7" stroke="${c.light}" stroke-width="2" fill="none" opacity=".6"/>
        <path d="M40 31c-3 14-1 27 3 39M80 31c3 14 1 27-3 39M53 34c-1 11 0 21 2 30M67 34c1 11 0 21-2 30" stroke="${c.deep}" stroke-width="1.3" fill="none" opacity=".5"/>
        <circle cx="60" cy="12" r="8" fill="${c.accent}" opacity=".25"/>
        <path d="M60 3l2.2 6L68 11l-5.8 2L60 19l-2.2-6L52 11l5.8-2Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M60 19v10" stroke="${c.accent}" stroke-width="1.4" opacity=".7"/>
        <path d="M44 92c10 5 22 5 32 0" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".8"/>`;
    case 'klombo':
      return `
        <path d="M36 38c-8-5-9-13-3-17 4 6 9 8 15 9Z" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M84 38c8-5 9-13 3-17-4 6-9 8-15 9Z" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M46 30c-3-8 0-14 3-17M74 30c3-8 0-14-3-17" stroke="${c.light}" stroke-width="3" stroke-linecap="round"/>
        <path d="M90 82c10 4 14 12 12 20-7-1-12-7-14-14Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <circle cx="39" cy="56" r="3" fill="${c.accent}" opacity=".55"/><circle cx="80" cy="70" r="2.4" fill="${c.accent}" opacity=".5"/>
        <path d="M48 30l3 4 4-4 3 4 4-4" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".7"/>`;
    case 'crown':
      return `
        <path d="M28 30l6-24 11 12 15-18 15 18 11-12 6 24Z" fill="#ffd166" stroke="#a86a00" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="60" cy="8" r="2.6" fill="#ff5e8a"/>
        <circle cx="39" cy="17" r="1.8" fill="#8be9ff"/><circle cx="81" cy="17" r="1.8" fill="#8be9ff"/>
        <path d="M28 30h64v6H28Z" fill="${c.accent}" opacity=".8"/>
        <path d="M22 44l1.4 3.8 3.8 1.4-3.8 1.4L22 54l-1.4-3.8-3.8-1.4 3.8-1.4Z" fill="${c.light}" opacity=".8"/>
        <path d="M98 52l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1Z" fill="${c.light}" opacity=".7"/>`;
    case 'spookydash':
      return `
        <path d="M24 60c-8 4-11 12-8 18 5-1 8-5 10-10" fill="${c.light}" opacity=".3"/>
        <path d="M28 74c-7 5-8 13-4 18 4-2 7-6 8-11" fill="${c.light}" opacity=".22"/>
        <path d="M34 86c-5 6-4 13 0 17 3-3 5-7 5-12" fill="${c.light}" opacity=".16"/>
        <path d="M92 42l8-2M94 50l8 1M90 58l7 3" stroke="${c.accent}" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
        <path d="M38 55c3-3 7-3 10 0M72 55c3-3 7-3 10 0" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".8"/>
        <path d="M60 2l1.6 4.4L66 8l-4.4 1.6L60 14l-1.6-4.4L54 8l4.4-1.6Z" fill="${c.light}" opacity=".9"/>`;
    case 'jazz':
      return `
        <path d="M44 32c-9-17-9-31-2-33 7 3 11 17 12 30Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M76 32c9-17 9-31 2-33-7 3-11 17-12 30Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M46 24c-5-11-5-19-2-21 4 2 6 10 7 18Z" fill="${c.accent}" opacity=".7"/>
        <path d="M74 24c5-11 5-19 2-21-4 2-6 10-7 18Z" fill="${c.accent}" opacity=".7"/>
        <path d="M38 40h44" stroke="${c.deep}" stroke-width="5" opacity=".75"/>
        <circle cx="48" cy="40" r="6" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="72" cy="40" r="6" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M54 40h12" stroke="${c.deep}" stroke-width="2"/>
        <path d="M91 82l4-8 2 7-5 4M95 62l2-6 1 5-3 3" fill="${c.accent}" opacity=".9"/>`;
    case 'crash':
      return `
        <path d="M42 30L38 4l15 12Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M78 30L82 4 67 16Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M43 25l-2-13 7 6Z" fill="${c.accent}" opacity=".7"/>
        <path d="M77 25l2-13-7 6Z" fill="${c.accent}" opacity=".7"/>
        <path d="M34 40c4-4 9-4 12 0M74 40c3-4 8-4 12 0" stroke="${c.deep}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M22 58a42 42 0 0 0 76 26M28 82a38 38 0 0 0 64 10" fill="none" stroke="${c.accent}" stroke-width="2.2" stroke-dasharray="4 6" opacity=".7"/>
        <path d="M52 20l4-6 4 6" fill="${c.accent}" opacity=".85"/>
        <path d="M90 54l8-3M92 62l8 2" stroke="${c.light}" stroke-width="2" stroke-linecap="round" opacity=".75"/>`;
    case 'blinky':
      return `
        <path d="M31 56c0-16 13-28 29-28s29 12 29 28v40c0 5-6 6-9 3-3-3-7-3-10 0s-7 3-10 0-7-3-10 0-6 2-6-3Z" fill="${c.light}" opacity=".18" stroke="${c.light}" stroke-width="1" stroke-dasharray="3 4"/>
        <path d="M18 48h7v7h-7ZM8 40h5v5H8ZM13 32h4v4h-4Z" fill="${c.accent}" opacity=".5"/>
        <circle cx="37" cy="70" r="2" fill="${c.accent}" opacity=".7"/><circle cx="83" cy="44" r="1.6" fill="${c.accent}" opacity=".6"/>`;
    case 'deer':
      return `
        <path d="M42 30c-6-10-7-19-3-23 3 2 5 8 7 14 2-6 4-11 6-13 1 6 0 13-2 20Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M78 30c6-10 7-19 3-23-3 2-5 8-7 14-2-6-4-11-6-13-1 6 0 13 2 20Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="39" cy="52" r="2" fill="${c.light}" opacity=".75"/><circle cx="81" cy="66" r="1.8" fill="${c.light}" opacity=".7"/><circle cx="47" cy="84" r="1.5" fill="${c.light}" opacity=".6"/>
        <path d="M32 88c8 5 18 7 28 7s20-2 28-7" stroke="${c.accent}" stroke-width="2" fill="none" stroke-dasharray="2 4" opacity=".8"/>
        <path d="M52 34l3-5 3 5M62 34l3-5 3 5" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".6"/>`;
    case 'sonic':
      return `
        <path d="M42 36L22 26l14 18ZM46 28L32 8l18 8ZM58 26L56 2l11 13ZM70 30L82 8l2 18Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M34 48l-9-4M33 55l-9 0M36 62l-8 4" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
        <path d="M24 96c3-6 10-9 17-6l-1 9c-5-1-10 0-13 3Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M24 99h18" stroke="#ffffff" stroke-width="2.2" opacity=".9"/>
        <path d="M79 96c3-4 9-5 13-2l-1 8c-4-1-8 0-11 2Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M79 99h14" stroke="#ffffff" stroke-width="2" opacity=".85"/>
        <path d="M36 44l10-3M72 40l8 2" stroke="${c.deep}" stroke-width="1.6" stroke-linecap="round" opacity=".45"/>`;
    case 'honeypot':
      return `
        <path d="M30 84h60l-4 13H34Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1"/>
        <path d="M35 91c5 8 16 10 25 4 9 6 20 4 25-4" stroke="${c.light}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/>
        <path d="M40 95c4 5 9 7 14 6M80 95c-4 5-9 7-14 6" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".7"/>
        <path d="M91 52c7 0 10 7 5 12" stroke="${c.deep}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>
        <path d="M88 42c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M84 44l-3-2 3-1M92 44l3-2-3-1" fill="${c.light}" opacity=".8"/>
        <path d="M79 38c-2-3 1-6 4-4" stroke="${c.deep}" stroke-width="1.2" fill="none" opacity=".6"/>`;
    case 'dumpster':
      return `
        <ellipse cx="60" cy="22" rx="26" ry="6" fill="${c.light}" opacity=".55" stroke="${c.deep}" stroke-width="1"/>
        <path d="M50 16c0-6 4-10 10-10s10 4 10 10" stroke="${c.deep}" stroke-width="2" fill="none"/>
        <path d="M34 56c4-4 9-4 12 0-3 3-9 3-12 0ZM74 56c3-4 8-4 12 0-3 3-9 3-12 0Z" fill="${c.deep}" opacity=".55"/>
        <path d="M28 92c4 2 8 2 12 0M80 92c4 2 8 2 12 0" stroke="${c.light}" stroke-width="2" fill="none" opacity=".5"/>
        <path d="M84 84l8 0M92 80v8M88 82l4 4M92 82l-4 4" stroke="${c.light}" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>`;
    case 'tails':
      return `
        <path d="M38 78C18 68 6 78 12 92c4 10 16 11 24 2 5-6 5-11 2-16Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M82 78c20-10 32 0 26 14-4 10-16 11-24 2-5-6-5-11-2-16Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M18 88c-3 3-3 7-1 10 3-1 5-4 5-7M102 88c3 3 3 7 1 10-3-1-5-4-5-7" fill="${c.light}" opacity=".95"/>
        <path d="M41 30l-4-14 10 8 4-10 4 12" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M81 30l4-14-10 8-4-10-4 12" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M46 28l-2-7 4 4M74 28l2-7-4 4" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".8"/>`;
    case 'shadow':
      return `
        <path d="M42 38L16 26l16 18ZM46 26L30 6l20 8ZM76 30L96 10l-4 20ZM80 40l22-8-18 18Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M28 30l10 8M88 22l-6 10" stroke="${c.accent}" stroke-width="2.2" stroke-linecap="round" opacity=".9"/>
        <path d="M40 52c-4 6-4 12 0 18M84 48c5 6 5 13 1 20" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".8"/>
        <path d="M32 94c4-4 10-4 14 0M74 94c4-4 10-4 14 0" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".6"/>
        <path d="M92 62l4 6-4 6-4-6Z" fill="#7affd8" stroke="${c.deep}" stroke-width="1"/>
        <path d="M89 80c5 1 7 5 4 8" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".7"/>`;
    case 'killswitch':
      return `
        <circle cx="60" cy="20" r="14" fill="none" stroke="${c.accent}" stroke-width="1.8"/>
        <path d="M60 2v8M60 30v8M38 20h8M74 20h8" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="60" cy="20" r="2.6" fill="${c.accent}"/>
        <path d="M92 52h12v9H92Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/>
        <circle cx="98" cy="56.5" r="2.8" fill="${c.accent}"/>
        <path d="M98 61v9" stroke="${c.deep}" stroke-width="2.4"/>
        <path d="M90 48l-4-4M104 48l4-4" stroke="${c.light}" stroke-width="1.4" opacity=".7"/>`;
    case 'morgana':
      return `
        <path d="M40 32L36 10l17 11Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/>
        <path d="M80 32L84 10 67 21Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2"/>
        <path d="M43 27l-1-9 7 5Z" fill="${c.accent}" opacity=".75"/>
        <path d="M77 27l1-9-7 5Z" fill="${c.accent}" opacity=".75"/>
        <path d="M38 56c4-4 10-4 14 0M68 56c4-4 10-4 14 0" stroke="${c.accent}" stroke-width="1.6" fill="none" opacity=".8"/>
        <path d="M92 82c8 1 11 7 8 13-5-1-8-6-9-10Z" fill="${c.accent}" opacity=".8"/>
        <path d="M96 88c3-2 6 0 5 3-1 2-4 2-5 1" fill="${c.accent}"/>`;
    case 'vampire':
      return `
        <path d="M40 32c2-8 0-14-4-18 7 0 12 4 15 10ZM80 32c-2-8 0-14 4-18-7 0-12 4-15 10Z" fill="${c.deep}" opacity=".9"/>
        <path d="M33 74l-7 24 12-6 6 8 5-22Z" fill="${c.deep}" opacity=".85"/>
        <path d="M87 74l7 24-12-6-6 8-5-22Z" fill="${c.deep}" opacity=".85"/>
        <path d="M55 82l3 7 3-7M63 82l3 7 3-7" fill="#ffffff" stroke="${c.deep}" stroke-width=".6"/>
        <circle cx="60" cy="90" r="3" fill="${c.accent}"/>
        <path d="M60 89l1 2 2 .4-1.6 1.4.4 2-1.8-1-1.8 1 .4-2L57 91.4l2-.4Z" fill="${c.light}" opacity=".9"/>`;
    case 'onigiri':
      return `
        <path d="M60 2L82 34H38Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M49 24h22v12H49Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="54" cy="16" r="1.3" fill="${c.deep}" opacity=".5"/><circle cx="66" cy="13" r="1.2" fill="${c.deep}" opacity=".5"/><circle cx="70" cy="20" r="1" fill="${c.deep}" opacity=".4"/>
        <path d="M89 42l1.2 3.2 3.2 1.2-3.2 1.2L89 51l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".6"/>`;
    case 'bushranger':
      return `
        <ellipse cx="60" cy="34" rx="30" ry="7" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 30c0-10 10-18 22-18s22 8 22 18Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M45 20c4-5 9-7 15-7s11 2 15 7" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".7"/>
        <path d="M50 86c4 5 8 6 12 3M58 86c3 4 7 5 11 2" stroke="${c.accent}" stroke-width="1.4" fill="none" opacity=".7"/>
        <path d="M32 78c-4 3-5 8-2 11 3 2 6-1 6-4" fill="${c.accent}" opacity=".55"/>
        <path d="M87 62l6-2M88 69l6 2" stroke="${c.light}" stroke-width="1.4" opacity=".6"/>`;
    case 'jonesy':
      return `
        <path d="M40 34c0-10 9-17 20-17s20 7 20 17Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M34 34h52l8 6H28Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M54 20h12v6H54Z" fill="${c.deep}" opacity=".2"/>
        <path d="M33 52c-7 1-11 7-9 14l9-2" fill="${c.body}" stroke="${c.deep}" stroke-width="1" opacity=".9"/>
        <path d="M36 64c14 5 34 5 48 0" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".35"/>
        <path d="M88 82l5-3" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>`;
    case 'blaster':
      return `
        <path d="M22 44h8v8h-8ZM16 56h6v6h-6ZM92 44h8v8h-8Z" fill="${c.accent}" opacity=".55"/>
        <path d="M96 64h14v9H96Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M110 66h4v5h-4Z" fill="${c.accent}"/>
        <path d="M60 4v8M56 8h8" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="60" cy="4" r="2" fill="${c.light}"/>
        <path d="M28 84h6v6h-6ZM90 78h5v5h-5Z" fill="${c.light}" opacity=".5"/>`;
    case 'adventure':
      return `
        <ellipse cx="60" cy="30" rx="30" ry="6" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 29c0-9 8-16 18-16s18 7 18 16Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="60" cy="88" r="11" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M60 80l4 10-4-3-4 3Z" fill="${c.accent}"/>
        <circle cx="60" cy="88" r="2" fill="${c.deep}"/>
        <path d="M90 70l8-4v14l-8 4Z" fill="${c.light}" opacity=".5" stroke="${c.deep}" stroke-width=".8"/>`;
    case 'stormscout':
      return `
        <path d="M32 56c-6-22 7-39 22-41 1 11 1 23-1 34Z" fill="${c.deep}" opacity=".9"/>
        <path d="M88 56c6-22-7-39-22-41-1 11-1 23 1 34Z" fill="${c.deep}" opacity=".9"/>
        <path d="M28 21c-8 0-11-7-5-11 4-3 9-1 10 3 1-6 8-8 11-3 4-3 9 0 8 5 5 0 7 6 2 8-3 1-6 1-8 0H30Z" fill="${c.light}" opacity=".9"/>
        <path d="M58 8l-5 9h6l-4 10" stroke="${c.accent}" stroke-width="2.4" fill="none" stroke-linejoin="round"/>
        <path d="M60 40l7-7 7 7-7 7Z" fill="${c.accent}" opacity=".9"/>
        <path d="M34 38c4-4 9-4 13 0M73 38c4-4 9-4 13 0" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".5"/>
        <path d="M34 68l-6 4M86 68l6 4" stroke="${c.accent}" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>`;
    case 'overshield':
      return `
        <circle cx="60" cy="62" r="54" fill="${c.accent}" opacity=".08" stroke="${c.accent}" stroke-width="1.4" stroke-dasharray="5 6"/>
        <path d="M95 72l7 4v7l-7 4-7-4v-7Z" fill="${c.accent}" opacity=".35" stroke="${c.accent}" stroke-width="1"/>
        <path d="M31 88l1 2.8 2.8 1-2.8 1L31 97l-1-2.8L27 93l3-1Z" fill="${c.light}" opacity=".7"/>
        <path d="M34 36l1.2 3.2 3.2 1.2-3.2 1.2L34 45l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".7"/>`;
    case 'megaman':
      return `
        <path d="M38 34c0-12 10-20 22-20s22 8 22 20Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M56 16h8v16h-8Z" fill="${c.light}" opacity=".8"/>
        <path d="M60 4l4 12h-8Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="34" cy="40" r="6" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="86" cy="40" r="6" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M92 74h16v12H92Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="108" cy="80" r="6" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M96 74v-6h8v6" fill="${c.light}" opacity=".8"/>`;
    case 'birthday':
      return `
        <path d="M52 30L60 2l8 28Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M54 22h12M55 14h10" stroke="${c.light}" stroke-width="2.4" opacity=".8"/>
        <circle cx="60" cy="3" r="3.4" fill="${c.light}"/>
        <circle cx="28" cy="46" r="1.8" fill="${c.accent}"/><circle cx="93" cy="58" r="1.6" fill="${c.light}"/><circle cx="32" cy="70" r="1.4" fill="${c.accent}"/>
        <path d="M82 86h20v12H82Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M82 92h20M88 98v-6M96 98v-6" stroke="${c.accent}" stroke-width="1.8"/>
        <circle cx="88" cy="84" r="1.6" fill="${c.accent}"/><circle cx="96" cy="84" r="1.6" fill="${c.accent}"/>`;
    case 'meowscles':
      return `
        <path d="M42 32L38 10l17 12Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M78 32L82 10 65 22Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M45 27l-1-9 7 6Z" fill="${c.accent}" opacity=".75"/>
        <path d="M75 27l1-9-7 6Z" fill="${c.accent}" opacity=".75"/>
        <path d="M38 43h44" stroke="${c.accent}" stroke-width="4" stroke-linecap="round"/>
        <path d="M26 78c-5-3-8-8-7-13 5 1 8 5 9 10M94 78c5-3 8-8 7-13-5 1-8 5-9 10" fill="${c.body}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M22 86h12M26 82v8M86 86h12M90 82v8" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/>
        <path d="M50 34l4-2M70 34l-4-2" stroke="${c.deep}" stroke-width="1.4" stroke-linecap="round" opacity=".5"/>`;
    case 'boss':
      return `
        <path d="M34 62l20 26H38l-8-20Z" fill="#4a4a5c" stroke="${c.light}" stroke-width=".8" opacity=".95"/>
        <path d="M86 62L66 88h16l8-20Z" fill="#4a4a5c" stroke="${c.light}" stroke-width=".8" opacity=".95"/>
        <path d="M52 58l8 14 8-14" fill="#f7f4ff" opacity=".96"/>
        <path d="M60 72l4 11-4 4-4-4Z" fill="${c.accent}"/>
        <path d="M44 82q16 10 32 0" stroke="${c.accent}" stroke-width="2.4" fill="none"/>
        <circle cx="60" cy="88" r="2.2" fill="${c.accent}"/>
        <rect x="88" y="86" width="18" height="14" rx="2" fill="#8a5a2b" stroke="${c.deep}" stroke-width="1"/>
        <path d="M94 86v-4h6v4" fill="none" stroke="${c.deep}" stroke-width="1.4"/>`;
    case 'vini':
      return `
        <path d="M43 32c5-5 11-7 17-7s12 2 17 7" stroke="${c.accent}" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M34 78h52v12H34Z" fill="${c.accent}" opacity=".9"/>
        <text x="60" y="88" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="${c.light}">7</text>
        <circle cx="30" cy="94" r="8" fill="#ffffff" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M26 90l4 3-2 5 5 1" fill="none" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="30" cy="94" r="2" fill="${c.deep}"/>
        <path d="M90 48l7-2M92 56l7 1M88 64l6 3" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".85"/>`;
    case 'pollo':
      return `
        <path d="M52 28c-3-8 1-13 5-14 1 5 3 7 5 4 3-4 8-2 8 3 0 3-2 5-4 7Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M52 76l8 7 8-7" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M30 68c-8 4-9 13-1 17 5 2 9 0 11-5" fill="${c.light}" opacity=".95" stroke="${c.deep}" stroke-width="1"/>
        <path d="M90 82c8 0 12 5 10 11-6 0-10-4-11-9Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M42 92l-3 7M52 94l-2 7M68 94l2 7M78 92l3 7" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>`;
    case 'wick':
      return `
        <path d="M34 62l20 26H38l-8-20Z" fill="${c.deep}" opacity=".95"/>
        <path d="M86 62L66 88h16l8-20Z" fill="${c.deep}" opacity=".95"/>
        <path d="M52 58l8 15 8-15" fill="#ffffff" opacity=".88"/>
        <path d="M60 71l3 10-3 4-3-4Z" fill="#14141c"/>
        <path d="M46 48c4-3 9-3 13 0M74 48c-4-3-9-3-13 0" stroke="${c.deep}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M50 74c2 6 5 9 10 9s8-3 10-9" fill="${c.deep}" opacity=".22"/>
        <path d="M50 84v4M70 84v4" stroke="${c.accent}" stroke-width="1.4"/>
        <circle cx="60" cy="88" r="2" fill="${c.accent}"/>`;
    case 'pumpkin':
      return `
        <path d="M56 28c-1-8 0-13 3-16 4 3 5 9 4 16Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M64 25c6-4 11-3 13 1-5 2-9 1-13-1Z" fill="${c.accent}"/>
        <path d="M38 56l10 3-3 9Z" fill="${c.deep}"/>
        <path d="M82 56l-10 3 3 9Z" fill="${c.deep}"/>
        <path d="M46 74l4 6 5-6 5 6 5-6 5 6" fill="none" stroke="${c.deep}" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M34 44c-4 10-2 22 4 30M86 44c4 10 2 22-4 30M48 38c-3 12-2 24 1 32M72 38c3 12 2 24-1 32" stroke="${c.deep}" stroke-width="1.4" fill="none" opacity=".35"/>
        <path d="M92 38c2-3 5-3 7 0 2-3 5-3 7 0-2 4-5 6-7 8-2-2-5-4-7-8Z" fill="${c.deep}" opacity=".5"/>`;
    case 'santa':
      return `
        <path d="M40 30c2-18 11-27 22-27 11 0 17 8 18 22Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M38 30h46" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
        <circle cx="86" cy="10" r="5" fill="#ffffff" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M38 60c2 18 10 28 22 28s20-10 22-28c-8 6-14 8-22 8s-14-2-22-8Z" fill="#ffffff" stroke="${c.deep}" stroke-width="1"/>
        <path d="M32 84h56l3 12H29Z" fill="#2f2a33"/>
        <path d="M52 84h16v12H52Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <rect x="57" y="87" width="6" height="7" rx="1" fill="none" stroke="${c.deep}" stroke-width="1"/>
        <path d="M92 76c9-2 15 4 14 12-1 7-9 10-16 6Z" fill="#8a5a2b" stroke="${c.deep}" stroke-width="1"/>
        <path d="M96 76c0-4 3-6 6-5" stroke="${c.accent}" stroke-width="2" fill="none"/>`;
    case 'cupid':
      return `
        <ellipse cx="60" cy="9" rx="15" ry="4" fill="none" stroke="${c.accent}" stroke-width="2.4"/>
        <path d="M32 54c-12-10-19 0-13 9 4 7 11 4 14-1ZM88 54c12-10 19 0 13 9-4 7-11 4-14-1Z" fill="#ffffff" opacity=".85" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M26 58c-10 8-10 18 0 22" fill="none" stroke="#8a5a2b" stroke-width="2.4"/>
        <path d="M26 58v22" stroke="#f2efe8" stroke-width="1.2"/>
        <path d="M26 69l26-9" stroke="#8a5a2b" stroke-width="2"/>
        <path d="M52 60l-3-6M52 60l5-5" stroke="${c.deep}" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M70 60l5-4 4 6-6 2Z" fill="${c.accent}" opacity=".9"/>
        <path d="M91 74c2-4 7-4 9 0 2 4-2 7-4.5 9-2.5-2-6.5-5-4.5-9Z" fill="${c.accent}" opacity=".9"/>`;
    case 'charm':
      return `
        <path d="M30 74q30 20 60 0" stroke="#ffd166" stroke-width="2.6" fill="none"/>
        <circle cx="38" cy="82" r="2" fill="#ffd166"/><circle cx="48" cy="87" r="1.8" fill="#ffd166"/><circle cx="60" cy="89" r="2" fill="#ffd166"/><circle cx="72" cy="87" r="1.8" fill="#ffd166"/><circle cx="82" cy="82" r="2" fill="#ffd166"/>
        <path d="M60 89l1.4 3.6 3.6 1.4-3.6 1.4L60 99l-1.4-3.6-3.6-1.4 3.6-1.4Z" fill="#ffd166"/>
        <path d="M76 88l4 6 6-2-3 6-5-1Z" fill="${c.accent}" opacity=".9"/>
        <path d="M42 88c2-3 6-3 8 0 2 3-2 6-4 8-2-2-6-5-4-8Z" fill="${c.accent}" opacity=".9"/>
        <path d="M90 38l1.4 3.6 3.6 1.4-3.6 1.4L90 48l-1.4-3.6-3.6-1.4 3.6-1.4Z" fill="${c.light}" opacity=".8"/>
        <path d="M26 48l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8L22 52l3-1Z" fill="${c.light}" opacity=".7"/>`;
    case 'snow':
      return `
        <path d="M39 31c2-10 9-16 21-16s19 6 21 16c-8-4-14-5-21-5s-13 1-21 5Z" fill="#ffffff" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M35 33c9 4 17 5 25 5s16-1 25-5" fill="none" stroke="${c.deep}" stroke-width="1" opacity=".32"/>
        <path d="M31 62c-9 0-13 5-11 12 6 0 10-3 12-7Z" fill="#8a5a2b" stroke="#5a3818" stroke-width="1.1"/>
        <path d="M89 62c9 0 13 5 11 12-6 0-10-3-12-7Z" fill="#8a5a2b" stroke="#5a3818" stroke-width="1.1"/>
        <path d="M22 65l-6-4M21 71l-7 2M98 65l6-4M99 71l7 2" stroke="#8a5a2b" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M60 17l1.3 3.4 3.4 1.3-3.4 1.3L60 26.4l-1.3-3.4-3.4-1.3 3.4-1.3Z" fill="${c.accent}" opacity=".9"/>
        <path d="M59 66l14 4-14 4-2-4Z" fill="#ff9a5a" stroke="#a63516" stroke-width=".8"/>
        <circle cx="60" cy="88" r="2.6" fill="${c.deep}"/>
        <circle cx="60" cy="97" r="2.2" fill="${c.deep}" opacity=".85"/>
        <path d="M22 36l1.4 3.6 3.6 1.4-3.6 1.4L22 46l-1.4-3.6L17 41l3.6-1.4Z" fill="${c.light}" opacity=".85"/>
        <path d="M99 66l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1Z" fill="${c.light}" opacity=".85"/>
        <circle cx="94" cy="38" r="1.8" fill="${c.accent}" opacity=".7"/>`;
    case 'zombie':
      return `
        <path d="M55 29c2-8 8-13 15-12-1 7-5 11-10 13Z" fill="#7fbf4a" stroke="${c.deep}" stroke-width="1"/>
        <path d="M35 35l-3-5M32 41l-5-2" stroke="${c.deep}" stroke-width="1.2" opacity=".55" stroke-linecap="round"/>
        <g transform="rotate(-16 44 42)">
          <rect x="32" y="37" width="25" height="9" rx="4.5" fill="#f4f0e2" stroke="${c.deep}" stroke-width="1"/>
          <path d="M38 38v7M45 38v7M52 38v7" stroke="${c.deep}" stroke-width=".8" opacity=".5"/>
        </g>
        <path d="M77 86h15M80 82v8M85 82v8M90 82v8" stroke="${c.deep}" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>
        <path d="M92 71c4-2 8 0 8 3 2 0 3 3 1 4-2 1-4 1-5-1-2 1-4 1-5-1-1-2 0-4 1-5Z" fill="#f4f0e2" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M26 78c-3 2-4 6-2 8 3 0 5-2 5-5Z" fill="${c.accent}" opacity=".8"/>
        <circle cx="94" cy="45" r="1.6" fill="${c.accent}" opacity=".75"/>`;
    case 'undead':
      return `
        <path d="M35 31c2 4 5 6 9 6M85 31c-2 4-5 6-9 6" stroke="${c.light}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
        <path d="M42 20c3-6 10-9 16-7M78 20c-3-6-10-9-16-7" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".85"/>
        <path d="M56 16c2-2 6-2 8 0" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".45"/>
        <path d="M41 93c-5 7-2 14 4 14 4 0 5-4 3-8M79 93c5 7 2 14-4 14-4 0-5-4-3-8" fill="${c.accent}" opacity=".35"/>
        <path d="M50 92c-2 8 1 14 10 14s12-6 10-14c-3 4-6 6-10 6s-7-2-10-6Z" fill="${c.accent}" opacity=".45"/>
        <path d="M40 68q7 4 14 0M66 68q7 4 14 0" stroke="${c.deep}" stroke-width="1" fill="none" opacity=".28"/>
        <circle cx="30" cy="54" r="2" fill="${c.light}" opacity=".7"/><circle cx="94" cy="66" r="1.6" fill="${c.accent}" opacity=".7"/>
        <path d="M90 38l1.2 3.2 3.2 1.2-3.2 1.2L90 47l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".8"/>`;
    case 'starfish':
      return `
        <path d="M34 54c-13-4-22 2-22 10 0 7 8 9 14 5 5-4 7-9 8-15Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M86 54c13-4 22 2 22 10 0 7-8 9-14 5-5-4-7-9-8-15Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M55 33c-3-12 0-21 6-24 6 5 7 14 3 24Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M43 90c-9 3-14 10-10 16 6 1 11-2 13-8M77 90c9 3 14 10 10 16-6 1-11-2-13-8" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="20" cy="62" r="1.5" fill="${c.light}"/><circle cx="25" cy="69" r="1.3" fill="${c.light}"/><circle cx="100" cy="62" r="1.5" fill="${c.light}"/><circle cx="95" cy="69" r="1.3" fill="${c.light}"/>
        <circle cx="57" cy="20" r="1.4" fill="${c.light}"/><circle cx="60" cy="14" r="1.2" fill="${c.light}"/>
        <circle cx="39" cy="99" r="1.2" fill="${c.light}"/><circle cx="81" cy="99" r="1.2" fill="${c.light}"/>
        <circle cx="94" cy="42" r="3" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".7"/>
        <circle cx="101" cy="34" r="1.9" fill="none" stroke="${c.light}" stroke-width="1" opacity=".55"/>
        <path d="M26 44l1.2 3.2 3.2 1.2-3.2 1.2L26 53l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.accent}" opacity=".8"/>`;
    case 'pika':
      return `
        <path d="M45 34C39 22 40 10 46 4c7 6 10 18 8 30Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M75 34c6-12 5-24-1-30-7 6-10 18-8 30Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M47 15c-3-4-2-8 1-9 3 3 4 6 3 9Z" fill="#2b2440"/>
        <path d="M73 15c3-4 2-8-1-9-3 3-4 6-3 9Z" fill="#2b2440"/>
        <path d="M47 25c0-6 1-11 3-15M73 25c0-6-1-11-3-15" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".55"/>
        <ellipse cx="37" cy="70" rx="6.4" ry="4.8" fill="${c.accent}" opacity=".6"/>
        <ellipse cx="83" cy="70" rx="6.4" ry="4.8" fill="${c.accent}" opacity=".6"/>
        <path d="M91 79l19-11-7 13 11 2-21 13 7-12Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M94 86l9-5-4 7 6 1-9 6 3-6Z" fill="${c.light}" opacity=".55"/>
        <path d="M27 44l2-6 2 5 5-1-3 4" stroke="${c.accent}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M96 30l1.2 3.2 3.2 1.2-3.2 1.2L96 39l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".8"/>`;
    case 'unicorn':
      return `
        <path d="M55 32c1-10 3-20 5-29 3 9 5 19 5 29Z" fill="#ffe9a8" stroke="#a87900" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M59 32c0-9 1-18 1-26M60 25c1-1 2-2 2-4M60 18c-1 0-2-1-2-2M60 11c1 0 1-1 1-2" fill="none" stroke="#a87900" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>
        <path d="M57 29c1-8 2-16 3-23" stroke="#fff7d6" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".85"/>
        <path d="M42 33c-9-2-14 3-12 8-5 2-5 7 0 9-3 4 1 8 6 7 0-8 3-16 6-24Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M78 33c9-2 14 3 12 8 5 2 5 7 0 9 3 4-1 8-6 7 0-8-3-16-6-24Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M45 31c-2-6 0-10 3-12 3 4 3 8 2 12M75 31c2-6 0-10-3-12-3 4-3 8-2 12" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M26 46l1.4 3.8 3.8 1.4-3.8 1.4L26 56l-1.4-3.8-3.8-1.4 3.8-1.4Z" fill="#ffe9a8" opacity=".9"/>
        <path d="M95 36l1.2 3.2 3.2 1.2-3.2 1.2L95 45l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".9"/>
        <circle cx="91" cy="60" r="1.8" fill="${c.accent}" opacity=".8"/>`;
    case 'devil':
      return `
        <path d="M43 33c-10-2-16-10-15-22 10 3 17 10 21 19Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M77 33c10-2 16-10 15-22-10 3-17 10-21 19Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M43 27c-4-4-7-9-7-14M77 27c4-4 7-9 7-14" stroke="${c.light}" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".5"/>
        <circle cx="33" cy="15" r="2.2" fill="${c.accent}"/><circle cx="87" cy="15" r="2.2" fill="${c.accent}"/>
        <path d="M30 62c-9-3-14 2-12 8 4-1 6 1 6 5 2-3 5-3 7-1 1-4 1-8-1-12Z" fill="${c.accent}" opacity=".85"/>
        <path d="M90 62c9-3 14 2 12 8-4-1-6 1-6 5-2-3-5-3-7-1-1-4-1-8 1-12Z" fill="${c.accent}" opacity=".85"/>
        <path d="M91 82c9 3 12 9 10 15" fill="none" stroke="${c.deep}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M100 94l7-1-4 8-2-3-4 1Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".9" stroke-linejoin="round"/>
        <path d="M60 82l-3 8 3-2 3 2Z" fill="${c.accent}" opacity=".95"/>
        <path d="M40 50l11-3M80 50l-11-3" stroke="${c.accent}" stroke-width="2.4" stroke-linecap="round" opacity=".9"/>
        <path d="M28 44l1.2 3.2 3.2 1.2-3.2 1.2L28 53l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".75"/>`;
    case 'yoga':
      return `
        <path d="M38 20a28 28 0 0 1 44 0" fill="none" stroke="${c.accent}" stroke-width="1.6" opacity=".45"/>
        <path d="M33 25a34 34 0 0 1 54 0" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity=".28"/>
        <path d="M42 89c-11 6-14 13-6 15 7 2 16-2 24-7 8 5 17 9 24 7 8-2 5-9-6-15" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M35 68c-4 9-1 17 7 20M85 68c4 9 1 17-7 20" fill="none" stroke="${c.deep}" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="42" cy="88" r="3.4" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="78" cy="88" r="3.4" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M55 42c2-3 8-3 10 0-2 4-8 4-10 0Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="60" cy="41" r="1.5" fill="${c.accent}"/>
        <path d="M91 80c2-4 6-5 8-2 2 2 0 5-3 5-3 0-5-1-7 2-3 4-8 3-10 0 3-1 6-1 8-3Z" fill="${c.accent}" opacity=".9"/>
        <path d="M27 48l1.2 3.2 3.2 1.2-3.2 1.2L27 57l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".8"/>`;
    case 'shark':
      return `
        <path d="M52 33c1-11 8-19 16-24-1 10-1 18 2 24Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M56 30c2-7 6-12 9-15" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".45"/>
        <path d="M30 73c-7 1-12 6-10 12 6 2 12-2 15-7Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M90 73c7 1 12 6 10 12-6 2-12-2-15-7Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M90 78c10-4 17 0 20 7-7 1-11-1-15-4 4 4 3 8-1 10-4-3-6-8-4-13Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M84 56c0 4 3 6 5 5M88 54c0 4 2 6 5 5M92 53c0 3 2 5 4 4" fill="none" stroke="${c.deep}" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>
        <path d="M58 30c2-5 5-8 8-9" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".5"/>
        <circle cx="94" cy="40" r="2.6" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity=".7"/>
        <circle cx="101" cy="32" r="1.7" fill="none" stroke="${c.accent}" stroke-width="1" opacity=".55"/>`;
    case 'whitewhale':
      return `
        <ellipse cx="60" cy="31" rx="8" ry="3" fill="${c.deep}" opacity=".35"/>
        <path d="M59 28c-3-8-1-15 3-21M63 28c1-7 4-12 8-15M62 20c-3-2-5-5-5-8M65 16c3-1 5-3 6-6" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="54" cy="7" r="2" fill="${c.accent}" opacity=".8"/><circle cx="72" cy="10" r="1.6" fill="${c.accent}" opacity=".7"/><circle cx="63" cy="3" r="1.4" fill="${c.light}" opacity=".9"/>
        <path d="M30 76c-7 2-10 8-7 13 6 1 11-3 13-8Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M90 78c9-5 17-1 20 6-7 2-12 0-16-3 3 4 2 8-2 10-4-3-6-8-2-13Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M40 89q20 8 40 0M45 95q15 6 30 0" fill="none" stroke="${c.accent}" stroke-width="1.3" opacity=".65"/>
        <path d="M88 52c0 4 3 6 5 5M92 50c0 4 2 6 5 5" fill="none" stroke="${c.deep}" stroke-width="1.2" stroke-linecap="round" opacity=".45"/>
        <path d="M27 46l1.4 3.8 3.8 1.4-3.8 1.4L27 56l-1.4-3.8-3.8-1.4 3.8-1.4Z" fill="${c.light}" opacity=".8"/>`;
    case 'dragon':
      return `
        <path d="M44 31c-6-9-4-18 2-23 4 6 6 15 6 23Z" fill="#ffd166" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M76 31c6-9 4-18-2-23-4 6-6 15-6 23Z" fill="#ffd166" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M34 52c-14-4-22 6-17 15 3 5 9 4 12 1-3 6 1 10 6 9-1-8 0-17-1-25Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width="1"/>
        <path d="M86 52c14-4 22 6 17 15-3 5-9 4-12 1 3 6-1 10-6 9 1-8 0-17 1-25Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width="1"/>
        <path d="M90 84c9-2 15 4 14 10-7 1-12-2-16-6Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M88 92c6 0 9 4 8 8-5 1-9-2-10-6Z" fill="${c.light}" opacity=".8"/>
        <path d="M52 19l4 8 4-4 4 4 4-8" fill="none" stroke="${c.light}" stroke-width="1.6" stroke-linejoin="round" opacity=".9"/>`;
    case 'darkjoker':
      return `
        <path d="M42 33 25 15l17 4 5-15 6 15 15-4-13 19Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <circle cx="25" cy="13" r="3" fill="#ffd166"/><circle cx="60" cy="3" r="3" fill="#ffd166"/><circle cx="86" cy="12" r="3" fill="#ffd166"/>
        <path d="M39 36q21 7 42 0" stroke="#ffd166" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M28 60l6-4 6 4-6 4Z" fill="${c.light}" opacity=".9"/>
        <path d="M92 62l10-4 2 5-8 6Z" fill="#f4f0e2" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M96 64l2 2-1 2-2-1Z" fill="${c.accent}"/>
        <path d="M88 78c4-2 7 0 8 3" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".6"/>`;
    case 'jackskull':
      return `
        <path d="M38 32l5-14 8 9 9-12 9 12 8-9 5 14Z" fill="#ff9f43" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <ellipse cx="47" cy="60" rx="10" ry="12" fill="${c.deep}" opacity=".16"/>
        <ellipse cx="73" cy="60" rx="10" ry="12" fill="${c.deep}" opacity=".16"/>
        <path d="M57 58l3 5h-6Z" fill="${c.deep}" opacity=".7"/>
        <path d="M42 84q18 11 36 0" stroke="${c.deep}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M48 88l3 4M55 90l3 4M62 90l3 4M69 88l3 4" stroke="${c.deep}" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>
        <path d="M52 95l8-4 8 4-8 5Z" fill="#ff9f43" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M90 58c5-2 8 2 6 6-1 3-4 3-5 0-2 2-4 1-4-1s1-4 3-5Z" fill="#ff9f43" opacity=".9"/>`;
    case 'sally':
      return `
        <path d="M42 34c-9-3-14 3-11 9-5 4-2 10 4 9-2 5 3 8 7 5" fill="${c.accent}" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M78 34c9-3 14 3 11 9 5 4 2 10-4 9 2 5-3 8-7 5" fill="${c.accent}" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M40 44c-3 8-2 16 2 22M80 44c3 8 2 16-2 22" fill="none" stroke="${c.accent}" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M34 86h11M32 91h9M76 88h13" stroke="${c.deep}" stroke-width="1.2" stroke-linecap="round" opacity=".65"/>
        <rect x="66" y="82" width="14" height="12" rx="2" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M68 84l10 8M78 84l-10 8" stroke="${c.deep}" stroke-width="1" opacity=".7"/>
        <path d="M26 66l5-3 5 3-5 3Z" fill="${c.accent}" opacity=".85"/>
        <path d="M60 94v10" stroke="${c.deep}" stroke-width="1.2" stroke-dasharray="3 2.5" opacity=".65"/>
        <path d="M40 99l8-3M72 96l8-3" stroke="${c.deep}" stroke-width="1.2" stroke-linecap="round" opacity=".65"/>`;
    case 'keke':
      return `
        <path d="M44 33c-4-9 0-16 7-18 2 6 2 12 0 18Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M76 33c4-9 0-16-7-18-2 6-2 12 0 18Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <circle cx="60" cy="27" r="6" fill="#ffd166" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M93 49l3-7 3 7 7 3-7 3-3 7-3-7-7-3Z" fill="#ffd166" stroke="${c.deep}" stroke-width=".9" stroke-linejoin="round"/>
        <path d="M92 62l-9 12" stroke="#ffd166" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M28 42l1.4 3.6 3.6 1.4-3.6 1.4L28 52l-1.4-3.6L23 47l3.6-1.4Z" fill="${c.light}" opacity=".85"/>
        <path d="M36 80l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2Z" fill="${c.light}" opacity=".7"/>`;
    case 'bestie':
      return `
        <path d="M88 44c8-6 17 0 15 8-1 6-8 10-15 15-7-5-14-9-15-15-2-8 7-14 15-8Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M88 68c0 9-4 16-9 21" stroke="${c.deep}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        <path d="M46 31c-4-6 4-10 8-6 4-4 12 0 8 6l-8 8Z" fill="#ffd166" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M33 88c7-4 13-4 20 0M33 93c7-4 13-4 20 0" stroke="${c.accent}" stroke-width="1.6" fill="none" opacity=".8"/>
        <path d="M76 84c5 0 8 3 7 7-5 1-8-2-9-5" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".7"/>`;
    case 'dog':
      return `
        <path d="M38 35c-8-1-13 6-12 15 1 7 6 10 11 6 2-6 2-14 1-21Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M82 35c8-1 13 6 12 15-1 7-6 10-11 6-2-6-2-14-1-21Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M85 84c9-5 15 0 14 8-7 2-12 0-16-4 4 4 3 8-1 10-4-3-5-8-2-12Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <rect x="36" y="84" width="48" height="7" rx="3.5" fill="${c.accent}"/>
        <circle cx="60" cy="88" r="4" fill="#ffd166" stroke="${c.deep}" stroke-width="1"/>
        <path d="M55 80q5 7 10 0" fill="#ff8fa3" opacity=".9"/>
        <path d="M42 38c2-4 4-6 7-7M78 38c-2-4-4-6-7-7" stroke="${c.light}" stroke-width="1.3" fill="none" opacity=".6"/>`;
    case 'karen':
      return `
        <path d="M39 34c0-11 9-18 21-18s21 7 21 18c-7-5-14-7-21-7s-14 2-21 7Z" fill="#e8c48a" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 35c-4 9-3 18 2 24M82 35c4 9 3 18-2 24" fill="none" stroke="#e8c48a" stroke-width="7" stroke-linecap="round"/>
        <path d="M39 45c4-3 8-3 12 0M69 45c4-3 8-3 12 0" stroke="#e8c48a" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
        <circle cx="29" cy="68" r="5.5" fill="none" stroke="#ffd166" stroke-width="2"/>
        <circle cx="91" cy="68" r="5.5" fill="none" stroke="#ffd166" stroke-width="2"/>
        <path d="M92 80h12v10H92Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M93 80c1-5 10-5 11 0" fill="none" stroke="${c.deep}" stroke-width="1.6"/>
        <path d="M94 88h8" stroke="#ffd166" stroke-width="1.2" opacity=".8"/>`;
    case 'motherearth':
      return `
        <path d="M38 33c0-11 9-19 22-19s22 8 22 19c-7-4-14-5-22-5s-15 1-22 5Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M45 28c-8-7-7-16-1-20 5 5 7 13 5 20M75 28c8-7 7-16 1-20-5 5-7 13-5 20" fill="#8fe07a" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <circle cx="60" cy="94" r="14" fill="#8be9ff" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M50 90c4-4 8-2 10 2 2 3 7 2 9 6-3 3-8 1-10 4-4 3-9 1-10-2-1-3 0-7 1-10Z" fill="#7fc9a3"/>
        <path d="M30 61c-6-3-9 2-5 6M90 61c6-3 9 2 5 6" stroke="${c.accent}" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".8"/>
        <circle cx="26" cy="79" r="3" fill="${c.accent}"/><circle cx="95" cy="84" r="2.5" fill="${c.accent}"/>`;
    case 'werewolf':
      return `
        <path d="M42 32 37 18l11 7Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M78 32 83 18 72 25Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M54 24l3-7 2 6 2-6 3 7" fill="none" stroke="${c.deep}" stroke-width="1.4" stroke-linejoin="round" opacity=".6"/>
        <path d="M60 24a7 7 0 1 0 0 14 5.5 5.5 0 1 1 0-14Z" fill="${c.accent}" opacity=".95"/>
        <path d="M34 66l-8 3 7 4-7 4 9 2M86 66l8 3-7 4 7 4-9 2" fill="none" stroke="${c.deep}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/>
        <path d="M49 78l4 6-4-1M71 78l-4 6 4-1" fill="#fff" stroke="${c.deep}" stroke-width=".8" stroke-linejoin="round"/>
        <path d="M60 70l-4 5h8Z" fill="${c.deep}" opacity=".85"/>
        <path d="M46 78q14 13 28 0" fill="none" stroke="${c.light}" stroke-width="2" opacity=".65"/>
        <path d="M57 74q3 3 6 0" stroke="${c.deep}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".7"/>
        <path d="M35 88q9 8 18 5M85 88q-9 8-18 5" stroke="${c.light}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".6"/>`;
    case 'normal':
      return `
        <path d="M52 18c0-5 4-8 9-8M61 10c-1 4-3 7-7 9" fill="none" stroke="${c.deep}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
        <circle cx="47" cy="60" r="10.5" fill="none" stroke="${c.deep}" stroke-width="1.4" opacity=".55"/>
        <circle cx="73" cy="60" r="10.5" fill="none" stroke="${c.deep}" stroke-width="1.4" opacity=".55"/>
        <path d="M57.5 60h5" stroke="${c.deep}" stroke-width="1.4" opacity=".55"/>
        <path d="M60 84v5M56 88h8" stroke="${c.deep}" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>
        <path d="M60 93l6-5-6-3-6 3Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <circle cx="94" cy="41" r="1.7" fill="${c.deep}" opacity=".35"/><circle cx="99" cy="41" r="1.7" fill="${c.deep}" opacity=".35"/><circle cx="104" cy="41" r="1.7" fill="${c.deep}" opacity=".35"/>`;
    case 'gummybear':
      return `
        <circle cx="37" cy="36" r="11.5" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="37" cy="36" r="5.5" fill="${c.light}" opacity=".65"/>
        <circle cx="83" cy="36" r="11.5" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="83" cy="36" r="5.5" fill="${c.light}" opacity=".65"/>
        <ellipse cx="60" cy="91" rx="17" ry="12" fill="${c.light}" opacity=".28"/>
        <path d="M43 84c4-5 10-4 12 1" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>
        <path d="M74 45l2-5 2 5 5 2-5 2-2 5-2-5-5-2Z" fill="#ffffff" opacity=".6"/>
        <path d="M35 82l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2Z" fill="#ffffff" opacity=".5"/>
        <path d="M84 89l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" fill="#ffffff" opacity=".55"/>`;
    case 'muddy':
      return `
        <path d="M48 32c-3-7 0-14 5-17 3 5 3 12 1 17M64 32c2-8 7-13 12-13 2 6 0 11-4 15" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
        <path d="M54 16c-4-5-1-10 4-10 3 0 5 3 4 6-1 3-4 4-8 4ZM76 20c-1-5 3-9 7-8 2 3 0 6-2 8-1 1-3 1-5 0Z" fill="#8fe07a" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M31 84c-5-1-8 2-7 6 2 4 6 3 8 0 2-2 2-4-1-6M90 80c5-1 8 2 7 6-2 4-6 3-8 0-2-2-2-4 1-6Z" fill="${c.accent}" opacity=".75"/>
        <path d="M33 58c2-4 5-6 8-4M79 54c3-2 6-1 8 2" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".4" stroke-linecap="round"/>
        <circle cx="41" cy="78" r="5" fill="${c.deep}" opacity=".22"/><circle cx="80" cy="82" r="6.5" fill="${c.deep}" opacity=".18"/><circle cx="66" cy="95" r="4" fill="${c.deep}" opacity=".2"/>
        <circle cx="88" cy="62" r="2" fill="${c.deep}" opacity=".35"/><circle cx="34" cy="68" r="1.6" fill="${c.deep}" opacity=".3"/><circle cx="74" cy="36" r="2.2" fill="${c.deep}" opacity=".25"/>
        <path d="M30 76c3 1 4 4 2 6M86 74c-3 1-4 4-2 6M54 88c2 1 3 3 2 5" stroke="${c.deep}" stroke-width="1.5" fill="none" opacity=".4" stroke-linecap="round"/>`;
    case 'spot':
      return `
        <path d="M38 37c-9-4-14 2-13 10 1 7 5 11 9 9 3-5 5-13 4-19Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <path d="M80 34l10-13 1 17Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M82 38c4-2 7-1 8 2" stroke="${c.light}" stroke-width="1.3" fill="none" opacity=".7"/>
        <ellipse cx="73" cy="59" rx="13" ry="11" fill="${c.accent}" opacity=".95"/>
        <circle cx="73" cy="59" r="3.6" fill="${c.deep}"/><circle cx="74" cy="58" r="1.2" fill="#fff" opacity=".85"/>
        <circle cx="45" cy="82" r="5.2" fill="${c.accent}" opacity=".75"/><circle cx="80" cy="88" r="4.2" fill="${c.accent}" opacity=".7"/><circle cx="56" cy="93" r="3" fill="${c.accent}" opacity=".65"/>
        <path d="M84 81c8-3 14 2 13 8-1 5-6 7-10 5 3-1 4-3 3-5-2 1-4 0-5-2 2-1 3-2 3-4-2 1-3 0-4-2Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M34 86h52" stroke="${c.accent}" stroke-width="5" opacity=".9"/>
        <circle cx="60" cy="88" r="4.2" fill="#ffd166" stroke="${c.deep}" stroke-width="1"/>
        <path d="M55 78q5 6 10 0" fill="#ff8fa3"/>
        <path d="M90 71l5-1M90 76l5 2" stroke="${c.light}" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>`;
    case 'frozen':
      return `
        <path d="M36 36 33 20l7 8 2-14 5 12 4-13 4 13 5-12 2 14 7-8-3 16Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M40 29v-6M60 25v-8M80 29v-6" stroke="#ffffff" stroke-width="1.2" opacity=".7" stroke-linecap="round"/>
        <path d="M29 58c-7 1-10 6-8 11 2 3 6 3 8 1 2-2 2-5 1-7M91 58c7 1 10 6 8 11-2 3-6 3-8 1-2-2-2-5-1-7Z" fill="${c.accent}" opacity=".35"/>
        <path d="M83 31l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5ZM31 41l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1Z" fill="#ffffff" opacity=".85"/>
        <path d="M37 83h46l3 5v10H34V88Z" fill="${c.light}" opacity=".38" stroke="#ffffff" stroke-width="1.2"/>
        <path d="M34 88h52M49 83l-6 15M66 83l4 15M79 83l-3 15" stroke="#ffffff" stroke-width="1" opacity=".55"/>
        <path d="M42 86l6 6-3 5M76 85l-4 7 3 5" fill="none" stroke="#ffffff" stroke-width="1.2" opacity=".7" stroke-linejoin="round"/>
        <path d="M47 79c3 2 6 2 9 0M64 79c3 2 6 2 9 0" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".7"/>
        <path d="M94 72l1.4 3.6 3.6 1.4-3.6 1.4L94 82l-1.4-3.6-3.6-1.4 3.6-1.4Z" fill="${c.accent}" opacity=".8"/>
        <circle cx="27" cy="78" r="1.8" fill="#ffffff" opacity=".65"/><circle cx="91" cy="48" r="1.5" fill="#ffffff" opacity=".55"/>`;
    case 'sixtyseven':
      return `
        <rect x="43" y="1" width="34" height="21" rx="6" fill="#1d1734" stroke="${c.accent}" stroke-width="1.5"/>
        <text x="60" y="17" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="${c.accent}">67</text>
        <path d="M60 22v8" stroke="${c.deep}" stroke-width="1.4" opacity=".55"/>
        <path d="M37 35c0-6 5-10 11-11M83 35c0-6-5-10-11-11" fill="none" stroke="${c.accent}" stroke-width="4" stroke-linecap="round"/>
        <path d="M38 37h44" stroke="${c.accent}" stroke-width="3.6" stroke-linecap="round" opacity=".9"/>
        <path d="M42 82h36v14H42Z" fill="#f6f2e9" stroke="${c.deep}" stroke-width="1"/>
        <text x="60" y="93" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="900" fill="${c.deep}">67</text>
        <path d="M37 85h5v10h-5M78 85h5v10h-5" fill="${c.accent}" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M28 64l-7-4M92 64l7-4" stroke="${c.accent}" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>
        <path d="M85 88c8-2 13 2 13 8-4 1-7-1-9-4 2 3 0 6-3 6-3-1-4-4-1-10Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1" opacity=".85"/>`;
    case 'creeper':
      return `
        <path d="M77 31l3-10 5 4-2 9" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M83 22c1-4 4-6 7-4 3 2 2 6-1 7" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round"/>
        <circle cx="91" cy="17" r="2.6" fill="#ffd166"/><circle cx="91" cy="17" r="1.2" fill="#fff6cc"/>
        <rect x="45" y="52" width="11" height="11" rx="1" fill="${c.deep}"/>
        <rect x="64" y="52" width="11" height="11" rx="1" fill="${c.deep}"/>
        <path d="M52 68h16v10h-5v7h-6v-7h-5Z" fill="${c.deep}"/>
        <path d="M44 74h5v5h-5M71 74h5v5h-5" fill="${c.deep}" opacity=".9"/>
        <rect x="30" y="42" width="5" height="5" fill="${c.accent}" opacity=".45"/><rect x="85" y="42" width="5" height="5" fill="${c.accent}" opacity=".45"/>
        <rect x="28" y="70" width="5" height="5" fill="${c.light}" opacity=".38"/><rect x="87" y="70" width="5" height="5" fill="${c.light}" opacity=".38"/>
        <path d="M34 92h8v6h-8ZM78 92h8v6h-8Z" fill="${c.deep}" opacity=".8"/>
        <path d="M39 38c8-4 15-4 22 0" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".45"/>`;
    case 'lion':
      return `
        <path fill-rule="evenodd" d="M60 21a39 39 0 1 0 0 78 39 39 0 1 0 0-78Zm0 10a29 29 0 1 1 0 58 29 29 0 1 1 0-58Z" fill="${c.accent}" opacity=".82" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M38 32l-2-10 9 5 4-8 3 9M82 32l2-10-9 5-4-8-3 9" fill="${c.body}" stroke="${c.deep}" stroke-width="1" stroke-linejoin="round"/>
        <ellipse cx="60" cy="78" rx="15" ry="11" fill="${c.light}" opacity=".6"/>
        <path d="M56 74l4-3 4 3-4 3Z" fill="${c.deep}"/>
        <path d="M60 77v4M54 81q6 5 12 0" stroke="${c.deep}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M32 84c6-3 11-1 14 3M88 84c-6-3-11-1-14 3" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>`;
    case 'panda':
      return `
        <circle cx="37" cy="31" r="11" fill="${c.deep}"/><circle cx="37" cy="31" r="5" fill="${c.deep}" opacity=".55"/>
        <circle cx="83" cy="31" r="11" fill="${c.deep}"/><circle cx="83" cy="31" r="5" fill="${c.deep}" opacity=".55"/>
        <ellipse cx="47" cy="59" rx="12.5" ry="14" fill="${c.deep}" opacity=".62" transform="rotate(-12 47 59)"/>
        <ellipse cx="73" cy="59" rx="12.5" ry="14" fill="${c.deep}" opacity=".62" transform="rotate(12 73 59)"/>
        <path d="M56 70l4-3 4 3-4 3Z" fill="${c.deep}"/>
        <path d="M60 73v4M53 78q7 6 14 0" stroke="${c.deep}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M88 44c8-9 15-11 20-8-4 6-9 11-16 15Z" fill="#8fe07a" stroke="${c.deep}" stroke-width="1"/>
        <path d="M90 49c5-3 9-6 12-9M92 44l1-6M97 41l3-5" stroke="#5f9e48" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        <path d="M34 84c5-2 9-1 12 2M80 88c4-2 7-1 9 1" stroke="${c.deep}" stroke-width="1.4" fill="none" opacity=".3" stroke-linecap="round"/>`;
    case 'penguin':
      return `
        <ellipse cx="60" cy="84" rx="24" ry="16" fill="${c.light}" opacity=".95"/>
        <path d="M29 66c-8 8-8 18-1 24 4 3 8 0 9-5l1-13Z" fill="${c.deep}" opacity=".85"/>
        <path d="M91 66c8 8 8 18 1 24-4 3-8 0-9-5l-1-13Z" fill="${c.deep}" opacity=".85"/>
        <ellipse cx="47" cy="56" rx="11.5" ry="14" fill="${c.light}" stroke="${c.deep}" stroke-width=".9"/>
        <ellipse cx="73" cy="56" rx="11.5" ry="14" fill="${c.light}" stroke="${c.deep}" stroke-width=".9"/>
        <circle cx="47" cy="56" r="3.4" fill="${c.deep}"/><circle cx="48" cy="55" r="1.2" fill="#ffffff"/>
        <circle cx="73" cy="56" r="3.4" fill="${c.deep}"/><circle cx="74" cy="55" r="1.2" fill="#ffffff"/>
        <path d="M60 63l11 8-11 5-11-5Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M49 96c3-3 8-3 11 0M60 96c3-3 8-3 11 0" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 44c4-3 8-4 12-2M70 42c4-2 8-1 12 2" stroke="${c.light}" stroke-width="1.5" fill="none" opacity=".5" stroke-linecap="round"/>`;
    case 'owl':
      return `
        <path d="M38 34L31 17l13 7 5-10 5 10 13-7-7 17Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <circle cx="47" cy="57" r="15" fill="${c.light}" stroke="${c.deep}" stroke-width="1.4"/>
        <circle cx="73" cy="57" r="15" fill="${c.light}" stroke="${c.deep}" stroke-width="1.4"/>
        <circle cx="47" cy="57" r="6.2" fill="${c.deep}"/><circle cx="49" cy="55" r="2" fill="#ffffff" opacity=".85"/>
        <circle cx="73" cy="57" r="6.2" fill="${c.deep}"/><circle cx="75" cy="55" r="2" fill="#ffffff" opacity=".85"/>
        <path d="M60 62l7 8-7 7-7-7Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M30 66c-4 9-2 20 5 26M90 66c4 9 2 20-5 26" fill="none" stroke="${c.deep}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
        <g fill="${c.accent}" opacity=".65"><circle cx="52" cy="84" r="1.2"/><circle cx="60" cy="88" r="1"/><circle cx="68" cy="84" r="1.2"/><circle cx="56" cy="92" r=".9"/><circle cx="64" cy="92" r=".9"/></g>
        <path d="M88 26l1.4 3.6 3.6 1.4-3.6 1.4L88 36l-1.4-3.6L83 31l3.6-1.4Z" fill="${c.accent}" opacity=".9"/>`;
    case 'snake':
      return `
        <path d="M84 90c10-1 16 4 18 10 2 7-4 10-9 6-4-3-3-8 1-9" fill="none" stroke="${c.body}" stroke-width="7" stroke-linecap="round"/>
        <path d="M84 90c10-1 16 4 18 10 2 7-4 10-9 6-4-3-3-8 1-9" fill="none" stroke="${c.deep}" stroke-width="1.2" stroke-linecap="round" opacity=".45"/>
        <path d="M34 44l8-8 8 8-8 8ZM70 44l8-8 8 8-8 8ZM52 32l8-8 8 8-8 8ZM42 72l8-8 8 8-8 8ZM66 72l8-8 8 8-8 8Z" fill="${c.deep}" opacity=".12"/>
        <ellipse cx="60" cy="87" rx="20" ry="11" fill="${c.light}" opacity=".55"/>
        <path d="M48 84q12 6 24 0M48 89q12 6 24 0M48 94q12 5 24 0" stroke="${c.deep}" stroke-width=".8" fill="none" opacity=".22"/>
        <path d="M54 78l4 5-4-1M66 78l-4 5 4-1" fill="#ffffff" stroke="${c.deep}" stroke-width=".7" stroke-linejoin="round"/>
        <path d="M60 83c0 6 1 10 4 13M64 96l-4 4M64 96l4 4" stroke="#ff5e8a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M47 58v5M73 58v5" stroke="${c.deep}" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>`;
    case 'spider':
      return `
        <path d="M28 52c-8-4-14-2-18 4M28 64c-10 0-16 3-19 9M30 76c-9 2-14 7-16 13M33 86c-7 4-10 9-10 14M92 52c8-4 14-2 18 4M92 64c10 0 16 3 19 9M90 76c9 2 14 7 16 13M87 86c7 4 10 9 10 14" fill="none" stroke="${c.deep}" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
        <path d="M18 20l12 8M14 32l16 2M26 14l4 14" stroke="${c.light}" stroke-width="1.1" opacity=".45"/>
        <circle cx="60" cy="60" r="34" fill="none" stroke="${c.light}" stroke-width="1.8" stroke-dasharray="2 4" opacity=".25"/>
        <g fill="${c.light}"><circle cx="43" cy="47" r="2.4"/><circle cx="53" cy="45" r="2.1"/><circle cx="67" cy="45" r="2.1"/><circle cx="77" cy="47" r="2.4"/></g>
        <g fill="${c.deep}"><circle cx="43" cy="47" r="1.1"/><circle cx="53" cy="45" r=".9"/><circle cx="67" cy="45" r=".9"/><circle cx="77" cy="47" r="1.1"/></g>
        <path d="M60 78l-8 8h16Z" fill="${c.accent}" opacity=".9"/>
        <path d="M88 28c4-3 8-3 11 0M91 34c4-2 7-1 9 2" stroke="${c.light}" stroke-width="1.1" fill="none" opacity=".5"/>`;
    case 'crab':
      return `
        <path d="M32 68c-10-3-18 3-19 12 0 8 8 12 14 8 4-3 4-8 1-10-3-2-7 0-7 4M88 68c10-3 18 3 19 12 0 8-8 12-14 8-4-3-4-8-1-10 3-2 7 0 7 4" fill="${c.body}" stroke="${c.deep}" stroke-width="1.3" stroke-linecap="round"/>
        <path d="M30 86c-8 2-13 6-14 12M36 92c-6 3-9 7-9 12M90 86c8 2 13 6 14 12M84 92c6 3 9 7 9 12" fill="none" stroke="${c.deep}" stroke-width="2" stroke-linecap="round" opacity=".75"/>
        <path d="M38 38c10-7 34-7 44 0" fill="none" stroke="${c.accent}" stroke-width="2.4" opacity=".7" stroke-linecap="round"/>
        <path d="M44 44c5-3 11-4 16-4s11 1 16 4" fill="none" stroke="${c.deep}" stroke-width="1" opacity=".25"/>
        <circle cx="25" cy="78" r="3" fill="${c.light}" opacity=".65"/><circle cx="21" cy="69" r="2" fill="${c.light}" opacity=".5"/><circle cx="95" cy="72" r="2.4" fill="${c.light}" opacity=".6"/>
        <path d="M46 90q14 7 28 0" stroke="${c.deep}" stroke-width="1.3" fill="none" opacity=".35" stroke-linecap="round"/>`;
    case 'sheep':
      return `
        <g fill="${c.light}" stroke="${c.deep}" stroke-width="1">
          <circle cx="38" cy="34" r="12"/><circle cx="52" cy="27" r="13"/><circle cx="68" cy="27" r="13"/><circle cx="82" cy="34" r="12"/>
          <circle cx="30" cy="46" r="9"/><circle cx="90" cy="46" r="9"/>
        </g>
        <ellipse cx="37" cy="48" rx="11" ry="5.5" fill="${c.body}" stroke="${c.deep}" stroke-width="1" transform="rotate(18 37 48)"/>
        <ellipse cx="83" cy="48" rx="11" ry="5.5" fill="${c.body}" stroke="${c.deep}" stroke-width="1" transform="rotate(-18 83 48)"/>
        <ellipse cx="60" cy="78" rx="15" ry="10" fill="${c.body}" stroke="${c.deep}" stroke-width=".9" opacity=".9"/>
        <path d="M56 76v2M64 76v2M58 82q2 2 4 0" stroke="${c.deep}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        <path d="M73 31c4-4 8-3 9 1" stroke="${c.accent}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <circle cx="84" cy="33" r="3.4" fill="${c.accent}"/>
        <path d="M28 74c2-5 6-8 11-9M92 74c-2-5-6-8-11-9" stroke="${c.light}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>`;
    case 'bull':
      return `
        <path d="M35 40C21 33 12 21 15 11c8 0 17 9 24 22" fill="${c.light}" stroke="${c.deep}" stroke-width="1.4" stroke-linejoin="round"/>
        <path d="M85 40c14-7 23-19 20-29-8 0-17 9-24 22" fill="${c.light}" stroke="${c.deep}" stroke-width="1.4" stroke-linejoin="round"/>
        <path d="M31 39c-6-6-9-12-8-18M89 39c6-6 9-12 8-18" stroke="${c.accent}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".65"/>
        <ellipse cx="60" cy="80" rx="18" ry="12" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>
        <ellipse cx="51" cy="78" rx="2.6" ry="2" fill="${c.deep}"/><ellipse cx="69" cy="78" rx="2.6" ry="2" fill="${c.deep}"/>
        <path d="M49 85q11 8 22 0" stroke="${c.deep}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <circle cx="60" cy="94" r="5.2" fill="none" stroke="#ffd166" stroke-width="2"/>
        <path d="M60 90v-4" stroke="#ffd166" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M29 70c-3 7-2 14 2 19M91 70c3 7 2 14-2 19" stroke="${c.deep}" stroke-width="2.2" fill="none" opacity=".35" stroke-linecap="round"/>`;
    case 'bossbaby':
      return `
        <path d="M37 30c5-12 20-17 32-13 9 3 14 10 13 15-2 6-7 5-12 2-10-5-22-3-29 2-5 3-7-1-4-6Z" fill="${c.deep}" opacity=".9"/>
        <path d="M42 47c-3 2-4 6-3 9M78 47c3 2 4 6 3 9" stroke="${c.deep}" stroke-width="1.4" fill="none" opacity=".35" stroke-linecap="round"/>
        <path d="M43 78l17 10 17-10 7 25H36Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M52 79l8-4 8 4-8 7Z" fill="${c.light}"/>
        <path d="M60 86l5 6-5 12-5-12Z" fill="${c.accent}"/>
        <path d="M45 94h7M68 94h7" stroke="${c.light}" stroke-width="1.3" opacity=".45" stroke-linecap="round"/>
        <rect x="86" y="82" width="18" height="13" rx="3" fill="#7a5a3a" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M95 82v-3a3 3 0 0 1 3-1" stroke="#ffd166" stroke-width="1.6" fill="none" stroke-linecap="round"/>
        <path d="M55 34c2-2 5-2 7 0" stroke="${c.light}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/>`;
    case 'hero6':
      return `
        <path d="M37 39c9-10 37-10 46 0 4 4 2 9-2 7-13-5-29-5-42 0-4 2-6-3-2-7Z" fill="${c.deep}"/>
        <path d="M35 38l-11-8 4 12ZM85 38l11-8-4 12Z" fill="${c.deep}"/>
        <path d="M87 74c11 6 13 20 9 28h-9Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width="1"/>
        <path d="M33 74c-11 6-13 20-9 28h9Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width="1"/>
        <path d="M47 82l13 7 13-7 4 19H43Z" fill="${c.accent}" opacity=".92" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M60 88v12M53 95h14" stroke="${c.deep}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
        <path d="M60 84l-2 5h4Z" fill="${c.light}"/>
        <path d="M29 60c-5 10-4 19 1 26M91 60c5 10 4 19-1 26" stroke="${c.light}" stroke-width="2.2" fill="none" opacity=".5" stroke-linecap="round"/>`;
    case 'dolphin':
      return `
        <path d="M52 33c0-12 6-20 14-23-1 10-4 18-9 24Z" fill="${c.deep}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M88 84c8-8 15-9 20-4-4 4-7 9-7 15-5-4-9-4-14-1Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M90 76c8-2 12 2 12 8-4 1-8-1-11-4" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width=".9"/>
        <ellipse cx="60" cy="86" rx="22" ry="12" fill="${c.light}" opacity=".75"/>
        <path d="M86 64c9-2 15 2 17 8-6 4-13 4-19 0Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M90 67c6 0 9 2 10 5" stroke="${c.deep}" stroke-width="1" fill="none" opacity=".35" stroke-linecap="round"/>
        <path d="M56 30c-2-8 0-15 4-20M62 28c0-7 3-12 7-15" stroke="${c.light}" stroke-width="2" fill="none" stroke-linecap="round"/>
        <circle cx="61" cy="7" r="1.8" fill="${c.light}"/><circle cx="70" cy="11" r="1.4" fill="${c.light}"/>
        <path d="M30 86q30 11 60 0" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".5"/>
        <path d="M34 52c-5 3-7 7-7 12" stroke="${c.accent}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".7"/>`;
    default:
      return '';
  }
}

function elementFeature(sprite, c) {
  const el = sprite.element;
  const signature = signatureFeature(el, c);
  if (signature) return signature;
  if (el === 'ember') {
    return `
      <path d="M60 27c7-11 15-7 11 3 5-3 8 4 1 9-5 4-14 4-18-1-3-5 2-9 6-11Z" fill="${c.accent}"/>
      <path d="M61 30c3-5 7-3 5 2 3-1 3 3 0 5-2 2-6 2-8 0-1-3 1-5 3-7Z" fill="${c.light}"/>
      <circle cx="35" cy="38" r="2.4" fill="${c.accent}" opacity=".8"/>
      <circle cx="88" cy="45" r="2" fill="${c.light}" opacity=".85"/>`;
  }
  if (el === 'tide') {
    return `
      <path d="M60 30c-2-12 8-19 15-17-1 8-4 14-9 18Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2" opacity=".95"/>
      <path d="M62 29c0-6 4-10 8-11" stroke="${c.deep}" stroke-width="1.4" fill="none" opacity=".5"/>
      <circle cx="91" cy="43" r="3.4" fill="none" stroke="${c.light}" stroke-width="1.6" opacity=".8"/>
      <circle cx="97" cy="34" r="2.1" fill="none" stroke="${c.light}" stroke-width="1.4" opacity=".65"/>
      <circle cx="30" cy="49" r="1.8" fill="${c.light}" opacity=".7"/>`;
  }
  if (el === 'gale') {
    return `
      <path d="M45 27c-2-8 6-12 11-8 3-6 12-4 12 3 6-1 8 6 3 9H47c-4 0-5-2-2-4Z" fill="${c.light}" opacity=".95"/>
      <path d="M42 41c-6 1-9 6-6 9" stroke="${c.light}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
      <path d="M90 50c4 0 6 3 5 5" stroke="${c.light}" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".6"/>`;
  }
  if (el === 'bloom') {
    return `
      <path d="M60 29c0-8 0-12 1-16" stroke="${c.deep}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M61 17c-7-6-14-2-12 4 2 4 8 5 12 2Z" fill="${c.accent}"/>
      <path d="M61 21c6-6 13-3 12 3-1 4-8 6-12 2Z" fill="${c.light}"/>
      <circle cx="61" cy="13" r="2.6" fill="#ffe066"/>`;
  }
  if (el === 'volt') {
    return `
      <path d="M60 30l-3-10 7 3-2-10" stroke="${c.deep}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="61" cy="9" r="4" fill="${c.accent}"/>
      <circle cx="61" cy="9" r="2" fill="${c.light}"/>
      <path d="M89 42l-4 7h4l-3 7" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  if (el === 'frost') {
    return `
      <path d="M60 27l-8-12 6-1 4 8 4-8 6 1z" fill="${c.light}" stroke="${c.accent}" stroke-width="1.2"/>
      <path d="M41 33l-5-9 5-1 3 8z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/>
      <path d="M79 33l5-9-5-1-3 8z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/>
      <path d="M91 55v6M88 58h6" stroke="${c.light}" stroke-width="1.4" opacity=".8"/>`;
  }
  if (el === 'dusk') {
    return `
      <path d="M47 30c-4-6-2-11 3-13 2 4 3 8 1 13Z" fill="${c.deep}"/>
      <path d="M85 24a9 9 0 1 0 6 16 8 8 0 1 1-6-16Z" fill="${c.light}" opacity=".9"/>
      <circle cx="35" cy="42" r="1.7" fill="${c.accent}"/>
      <circle cx="95" cy="46" r="1.4" fill="${c.light}"/>`;
  }
  if (el === 'radiant') {
    return `
      <ellipse cx="60" cy="17" rx="15" ry="4.4" fill="none" stroke="${c.accent}" stroke-width="2.4" opacity=".9"/>
      <path d="M60 7l1.6 4.2L66 13l-4.4 1.8L60 19l-1.6-4.2L54 13l4.4-1.8z" fill="${c.light}"/>
      <path d="M92 38l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" fill="${c.light}" opacity=".85"/>`;
  }
  if (el === 'demon') {
    return `
      <path d="M44 31c-6-9-6-16-1-19 5 2 8 9 7 17Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.1"/>
      <path d="M76 31c6-9 6-16 1-19-5 2-8 9-7 17Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.1"/>
      <path d="M92 84c10 2 14 10 10 18-3 6-10 5-11-1" stroke="${c.deep}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M92 84l8-3-4 9Z" fill="${c.accent}"/>`;
  }
  if (el === 'angel') {
    return `
      <ellipse cx="60" cy="14" rx="15" ry="4" fill="none" stroke="${c.accent}" stroke-width="2.6"/>
      <path d="M31 52c-12-9-19 0-14 8 4 7 11 5 15 0Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/>
      <path d="M89 52c12-9 19 0 14 8-4 7-11 5-15 0Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/>
      <circle cx="60" cy="7" r="2" fill="${c.accent}"/>`;
  }
  if (el === 'air') {
    return `
      <g stroke="${c.deep}" fill="none" stroke-linecap="round" opacity=".75">
        <path d="M41 24c-7-5-4-13 3-13 6 0 8 6 5 10" stroke-width="2.2"/>
        <path d="M78 21c8-4 14 1 11 7-2 4-8 4-11 1" stroke-width="2"/>
        <path d="M93 45c5 0 7 4 4 7M25 62c-5 0-7 4-4 7" stroke-width="1.6" opacity=".6"/>
      </g>`;
  }
  if (el === 'water') {
    return `
      <path d="M60 24c-6-8-9-12-9-16 0-4 4-7 9-7s9 3 9 7c0 4-3 8-9 16Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2" opacity=".95"/>
      <circle cx="30" cy="50" r="6" fill="none" stroke="${c.light}" stroke-width="1.6" opacity=".6"/>
      <circle cx="92" cy="74" r="4" fill="none" stroke="${c.light}" stroke-width="1.4" opacity=".5"/>`;
  }
  if (el === 'earth') {
    return `
      <circle cx="60" cy="14" r="11" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M52 10c3-3 7-2 9 2 2 3 6 2 8 5-3 3-7 1-9 4-3 3-8 2-10-1-2-3 0-7 2-10Z" fill="${c.body}" opacity=".9"/>
      <circle cx="91" cy="54" r="3" fill="${c.accent}" opacity=".8"/>
      <circle cx="28" cy="76" r="2.4" fill="${c.deep}" opacity=".45"/>`;
  }
  if (el === 'honey') {
    return `
      <path d="M60 5l7 5v9l-7 5-7-5v-9Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M60 11l3.4 2.4v5L60 21l-3.4-2.6v-5Z" fill="${c.light}" opacity=".8"/>
      <path d="M89 37c3 5 3 9 0 13-3-4-3-8 0-13Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <circle cx="30" cy="60" r="2" fill="${c.accent}" opacity=".7"/>`;
  }
  if (el === 'pond') {
    return `
      <ellipse cx="44" cy="23" rx="13" ry="5" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" transform="rotate(-8 44 23)"/>
      <path d="M37 23h14" stroke="${c.light}" stroke-width="1.2" opacity=".7"/>
      <path d="M68 17c0 6-4 11-9 13 8 1 14-4 15-10-2-1-4-2-6-3Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
      <circle cx="92" cy="66" r="5" fill="none" stroke="${c.light}" stroke-width="1.4" opacity=".65"/>
      <circle cx="92" cy="66" r="9" fill="none" stroke="${c.light}" stroke-width="1" opacity=".35"/>`;
  }
  if (el === 'hero') {
    return `
      <path d="M60 73l2.6 5.4 6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.3-4.2 6-.9Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
      <path d="M29 40l-7 3M30 50l-7 2M91 40l7 3M90 50l7 2" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".85"/>`;
  }
  if (el === 'ants') {
    return `
      <path d="M47 27c-3-9-7-13-11-14M73 27c3-9 7-13 11-14" stroke="${c.deep}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <circle cx="35" cy="12" r="2.6" fill="${c.accent}"/><circle cx="85" cy="12" r="2.6" fill="${c.accent}"/>
      <g fill="${c.deep}" opacity=".8">
        <circle cx="18" cy="106" r="2.4"/><circle cx="23" cy="107" r="1.8"/><circle cx="27" cy="107" r="1.3"/>
        <path d="M18 104l-3-3M18 108l-3 3M24 105l2-3M24 109l2 3" stroke="${c.deep}" stroke-width="1"/>
        <circle cx="96" cy="103" r="2"/><circle cx="101" cy="104" r="1.5"/>
        <path d="M96 102l2-3M96 104l-3 2" stroke="${c.deep}" stroke-width="1"/>
      </g>`;
  }
  if (el === 'fire') {
    return `
      <path d="M60 29c-3-9 2-15 6-19 1 7 6 8 8 4 4 7 2 13-2 16-3 2-9 2-12-1Z" fill="${c.accent}" opacity=".95"/>
      <path d="M61 28c-1-5 2-9 4-11 1 4 4 5 5 2 2 4 0 8-2 10-2 1-6 1-7-1Z" fill="${c.light}"/>
      <circle cx="29" cy="54" r="2.2" fill="${c.accent}" opacity=".8"/>
      <circle cx="93" cy="42" r="1.8" fill="${c.light}" opacity=".8"/>`;
  }
  if (el === 'splash') {
    return `
      <path d="M44 23c-3-7 0-12 4-14 1 5 4 6 6 3 2 5 1 9-2 11-2 2-6 2-8 0Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M76 19c-2-6 0-10 3-11 1 4 3 4 4 2 2 4 0 7-2 9-1 1-4 1-5 0Z" fill="${c.accent}" opacity=".9"/>
      <path d="M24 86q18-10 36 0t36 0" stroke="${c.light}" stroke-width="2.4" fill="none" opacity=".8" stroke-linecap="round"/>
      <circle cx="92" cy="58" r="2.2" fill="${c.light}" opacity=".8"/>`;
  }
  if (el === 'slime') {
    return `
      <path d="M90 77c5 2 8 6 6 12-3-1-5-3-6-6" fill="${c.accent}" opacity=".8"/>
      <path d="M30 81c-4 4-4 11-1 16 4-3 5-7 4-11" fill="${c.accent}" opacity=".7"/>
      <circle cx="95" cy="44" r="3" fill="${c.light}" opacity=".65"/>
      <circle cx="26" cy="56" r="2.4" fill="${c.light}" opacity=".6"/>
      <circle cx="60" cy="16" r="2" fill="${c.light}" opacity=".8"/>`;
  }
  if (el === 'rock') {
    return `
      <path d="M44 31l6-13 9 5 6-9 7 9 8-4 5 12Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M33 46l-7 6 3 8 7-4Z" fill="${c.deep}" opacity=".75"/>
      <path d="M94 63l8 3-2 8-7-3Z" fill="${c.deep}" opacity=".7"/>`;
  }
  if (el === 'stone') {
    return `
      <path d="M42 29h36v12H42Z" fill="${c.accent}" opacity=".5" stroke="${c.deep}" stroke-width="1"/>
      <path d="M57 29v12M72 29v12M42 35h36" stroke="${c.deep}" stroke-width="1" opacity=".65"/>
      <path d="M60 45l-4 7 4 4M60 13l3 6-3 3" stroke="${c.accent}" stroke-width="1.6" fill="none" opacity=".8"/>
      <circle cx="90" cy="72" r="2.2" fill="${c.accent}" opacity=".6"/>`;
  }
  if (el === 'bug') {
    return `
      <path d="M51 26c-4-8-8-12-13-13M69 26c4-8 8-12 13-13" stroke="${c.deep}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <circle cx="37" cy="12" r="2.2" fill="${c.accent}"/><circle cx="83" cy="12" r="2.2" fill="${c.accent}"/>
      <ellipse cx="31" cy="66" rx="8" ry="12" fill="${c.accent}" opacity=".35" transform="rotate(-18 31 66)"/>
      <ellipse cx="89" cy="66" rx="8" ry="12" fill="${c.accent}" opacity=".35" transform="rotate(18 89 66)"/>
      <circle cx="60" cy="21" r="2" fill="${c.accent}"/>`;
  }
  if (el === 'bunny') {
    return `
      <path d="M44 32c-5-12-7-23-3-28 5 2 9 11 11 22Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M76 32c5-12 7-23 3-28-5 2-9 11-11 22Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M45 27c-3-8-4-15-2-18 3 2 5 8 6 15Z" fill="${c.accent}" opacity=".7"/>
      <path d="M75 27c3-8 4-15 2-18-3 2-5 8-6 15Z" fill="${c.accent}" opacity=".7"/>
      <circle cx="96" cy="82" r="6" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>`;
  }
  if (el === 'cloud') {
    return `
      <path d="M36 25c-6 0-9-5-6-10 3-4 8-2 9 1 1-6 8-8 11-3 3-3 8-1 8 4 4-1 7 3 4 7-2 3-6 3-8 2H38Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1" opacity=".95"/>
      <path d="M47 32l-2 6M57 33l-2 7M67 32l-2 6" stroke="${c.accent}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
      <circle cx="94" cy="56" r="4" fill="${c.light}" opacity=".6"/>`;
  }
  if (el === 'crystal') {
    return `
      <path d="M60 4l7 12-7 14-7-14Z" fill="${c.light}" stroke="${c.accent}" stroke-width="1.1"/>
      <path d="M44 16l4 8-4 11-5-11Z" fill="${c.light}" opacity=".85" stroke="${c.accent}" stroke-width=".9"/>
      <path d="M76 16l5 8-5 11-4-11Z" fill="${c.light}" opacity=".85" stroke="${c.accent}" stroke-width=".9"/>
      <circle cx="61" cy="14" r="1.4" fill="#ffffff"/>
      <path d="M93 62l1.4 3.6L98 67l-3.6 1.4L93 72l-1.4-3.6L88 67l3.6-1.4Z" fill="${c.accent}" opacity=".8"/>`;
  }
  if (el === 'mushroom') {
    return `
      <path d="M42 22c0-8 8-14 18-14s18 6 18 14c0 3-4 4-8 3-3 2-7 2-10 0-4 2-8 1-11-1-3 1-7 0-7-2Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.3"/>
      <circle cx="51" cy="15" r="2.6" fill="${c.light}" opacity=".85"/>
      <circle cx="67" cy="12" r="2" fill="${c.light}" opacity=".8"/>
      <circle cx="72" cy="19" r="1.7" fill="${c.light}" opacity=".7"/>
      <circle cx="94" cy="48" r="1.6" fill="${c.accent}"/>
      <circle cx="26" cy="66" r="1.4" fill="${c.accent}"/>`;
  }
  if (el === 'candy') {
    return `
      <path d="M35 18l-9-6v17l9-5Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M85 18l9-6v17l-9-5Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <rect x="35" y="10" width="50" height="17" rx="8.5" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M50 10c-6 8-6 12 0 17M70 10c6 8 6 12 0 17" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".8"/>
      <circle cx="94" cy="72" r="1.8" fill="${c.accent}"/><circle cx="27" cy="50" r="1.5" fill="${c.accent}"/>`;
  }
  if (el === 'wolf') {
    return `
      <path d="M37 30L39 4l16 14Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1.2"/>
      <path d="M83 30L81 4 65 18Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1.2"/>
      <path d="M41 24l1-11 8 7Z" fill="${c.light}" opacity=".75"/>
      <path d="M79 24l-1-11-8 7Z" fill="${c.light}" opacity=".75"/>
      <ellipse cx="60" cy="79" rx="14" ry="10" fill="${c.light}" opacity=".9"/>
      <path d="M55 72h10l-5 5Z" fill="${c.deep}"/>
      <path d="M60 77v3M56 82q4 3 8 0" stroke="${c.deep}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M54 86l2 4 2-4M66 86l-2 4-2-4" fill="#ffffff" stroke="${c.light}" stroke-width=".5"/>
      <path d="M94 86c6 2 7 8 4 12-3-2-4-5-4-8" fill="${c.deep}" opacity=".8"/>`;
  }
  if (el === 'tiger') {
    return `
      <circle cx="38" cy="27" r="9" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
      <circle cx="82" cy="27" r="9" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
      <circle cx="38" cy="27" r="4.5" fill="${c.accent}" opacity=".45"/>
      <circle cx="82" cy="27" r="4.5" fill="${c.accent}" opacity=".45"/>
      <path d="M52 37l-3 7M60 35v8M68 37l3 7" stroke="${c.accent}" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>
      <path d="M30 68l-7 3M32 74l-7 1M90 68l7 3M88 74l7 1" stroke="${c.accent}" stroke-width="2.2" stroke-linecap="round"/>
      <ellipse cx="60" cy="79" rx="12" ry="9" fill="${c.light}" opacity=".85"/>
      <path d="M56 74h8l-4 4Z" fill="${c.deep}"/>
      <path d="M60 78v3M56 82q4 3 8 0" stroke="${c.deep}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
  }
  if (el === 'bear') {
    return `
      <circle cx="38" cy="24" r="9" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
      <circle cx="82" cy="24" r="9" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
      <circle cx="38" cy="24" r="4.6" fill="${c.light}" opacity=".8"/>
      <circle cx="82" cy="24" r="4.6" fill="${c.light}" opacity=".8"/>
      <ellipse cx="60" cy="78" rx="15" ry="11" fill="${c.light}" opacity=".9"/>
      <ellipse cx="60" cy="72" rx="4.5" ry="3.4" fill="${c.deep}"/>
      <path d="M60 76v3M56 81q4 3 8 0" stroke="${c.deep}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  }
  if (el === 'frog') {
    return `
      <path d="M51 38q-4-9 3-10M69 38q4-9-3-10" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".55" stroke-linecap="round"/>
      <circle cx="53" cy="65" r="1.2" fill="${c.deep}"/><circle cx="67" cy="65" r="1.2" fill="${c.deep}"/>
      <path d="M64 81q13 4 19-3" stroke="${c.accent}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <g transform="translate(86 34)">
        <ellipse cx="0" cy="0" rx="3.2" ry="2.2" fill="${c.deep}"/>
        <path d="M-2 -2l-2-3M2 -2l2-3" stroke="${c.deep}" stroke-width=".9"/>
        <path d="M4 -5q4-3 6 0" stroke="${c.deep}" stroke-width=".7" fill="none" opacity=".5"/>
      </g>`;
  }
  if (el === 'pig') {
    return `
      <path d="M38 30c-8 4-9 12-4 16 4 3 9-1 10-7" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
      <path d="M82 30c8 4 9 12 4 16-4 3-9-1-10-7" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
      <ellipse cx="60" cy="77" rx="13" ry="9.5" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
      <ellipse cx="60" cy="77" rx="13" ry="9.5" fill="${c.deep}" opacity=".16"/>
      <circle cx="55" cy="76" r="1.8" fill="${c.deep}"/><circle cx="65" cy="76" r="1.8" fill="${c.deep}"/>
      <path d="M95 84c5 1 5 6 1 7-2 0-3-2-1-3" stroke="${c.deep}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  }
  if (el === 'cat') {
    return `
      <path d="M39 31L36 7l19 12Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1.2"/>
      <path d="M81 31L84 7 65 19Z" fill="${c.deep}" stroke="${c.light}" stroke-width="1.2"/>
      <path d="M42 26l-1-11 8 6Z" fill="${c.accent}" opacity=".7"/>
      <path d="M78 26l1-11-8 6Z" fill="${c.accent}" opacity=".7"/>
      <ellipse cx="60" cy="79" rx="11" ry="8" fill="${c.light}" opacity=".9"/>
      <path d="M57 76h6l-3 3Z" fill="${c.deep}"/>
      <path d="M30 74l-9 2M30 80l-9 1M90 74l9 2M90 80l9 1" stroke="${c.deep}" stroke-width="1.2" opacity=".7" stroke-linecap="round"/>`;
  }
  if (el === 'cow') {
    return `
      <path d="M45 26c-5-7-3-12 2-12 3 3 3 7 2 11Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M75 26c5-7 3-12-2-12-3 3-3 7-2 11Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
      <ellipse cx="40" cy="44" rx="9" ry="7" fill="${c.deep}" opacity=".55"/>
      <ellipse cx="82" cy="55" rx="7" ry="6" fill="${c.deep}" opacity=".5"/>
      <ellipse cx="60" cy="78" rx="11" ry="8" fill="${c.accent}" opacity=".85"/>
      <circle cx="56" cy="77" r="1.4" fill="${c.deep}"/><circle cx="64" cy="77" r="1.4" fill="${c.deep}"/>
      <path d="M54 92h12l-2 5H56Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <circle cx="60" cy="96" r="1.4" fill="${c.deep}"/>`;
  }
  if (el === 'fish') {
    return `
      <path d="M60 26c-2-10 4-16 10-18-1 8-4 14-9 18Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width="1"/>
      <path d="M32 62c-10-6-14 2-9 9 4 5 9 2 12-3Z" fill="${c.light}" opacity=".8"/>
      <path d="M88 62c10-6 14 2 9 9-4 5-9 2-12-3Z" fill="${c.light}" opacity=".8"/>
      <path d="M91 76c9 1 14 7 13 14-7-1-11-6-13-10Z" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width=".9"/>
      <circle cx="93" cy="42" r="3.4" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".75"/>
      <circle cx="99" cy="31" r="2.2" fill="none" stroke="${c.light}" stroke-width="1" opacity=".6"/>
      <circle cx="42" cy="46" r="1.6" fill="${c.light}" opacity=".7"/><circle cx="52" cy="86" r="1.4" fill="${c.light}" opacity=".6"/>`;
  }
  if (el === 'bat') {
    return `
      <path d="M32 60C16 44 8 46 6 56c10-2 14 6 12 14 6-6 12-6 16-2Z" fill="${c.light}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
      <path d="M88 60c16-16 24-14 26-4-10-2-14 6-12 14-6-6-12-6-16-2Z" fill="${c.light}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>
      <path d="M46 30l-4-14 12 8Z" fill="${c.deep}"/>
      <path d="M74 30l4-14-12 8Z" fill="${c.deep}"/>
      <path d="M55 85l2 5 2-5M65 85l-2 5-2-5" fill="#ffffff" stroke="${c.light}" stroke-width=".5"/>`;
  }
  if (el === 'butterfly') {
    return `
      <path d="M32 56c-14-14-24-8-22 2 2 9 13 12 22 9 4-1 5-7 0-11Z" fill="${c.light}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
      <path d="M88 56c14-14 24-8 22 2-2 9-13 12-22 9-4-1-5-7 0-11Z" fill="${c.light}" opacity=".75" stroke="${c.deep}" stroke-width="1"/>
      <ellipse cx="30" cy="82" rx="10" ry="11" fill="${c.light}" opacity=".6" stroke="${c.deep}" stroke-width=".8" transform="rotate(-16 30 82)"/>
      <ellipse cx="90" cy="82" rx="10" ry="11" fill="${c.light}" opacity=".6" stroke="${c.deep}" stroke-width=".8" transform="rotate(16 90 82)"/>
      <circle cx="22" cy="58" r="3" fill="${c.accent}" opacity=".7"/><circle cx="98" cy="58" r="3" fill="${c.accent}" opacity=".7"/>
      <circle cx="30" cy="82" r="2.2" fill="${c.accent}" opacity=".7"/><circle cx="90" cy="82" r="2.2" fill="${c.accent}" opacity=".7"/>
      <path d="M52 28c-4-8-8-11-12-12M68 28c4-8 8-11 12-12" stroke="${c.deep}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <circle cx="39" cy="15" r="1.8" fill="${c.accent}"/><circle cx="81" cy="15" r="1.8" fill="${c.accent}"/>`;
  }
  if (el === 'pillow') {
    return `
      <path d="M26 42l-6-6M94 42l6-6M26 86l-6 6M94 86l6 6" stroke="${c.deep}" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>
      <path d="M88 28h3v3M84 34h3v3M80 40h3v3" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
      <path d="M35 96q10 5 20 1" stroke="${c.light}" stroke-width="2" fill="none" opacity=".7"/>
      <path d="M28 52q32-8 64 0" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".6"/>`;
  }
  if (el === 'dreameater') {
    return `
      <path d="M75 16a8 8 0 1 0 5 14 7 7 0 1 1-5-14Z" fill="${c.accent}" opacity=".9"/>
      <circle cx="34" cy="30" r="1.8" fill="${c.light}"/><circle cx="44" cy="18" r="1.2" fill="${c.light}"/>
      <path d="M97 54l1.4 3.6L102 59l-3.6 1.4L97 64l-1.4-3.6L92 59l3.6-1.4Z" fill="${c.light}" opacity=".8"/>
      <path d="M32 80c-7 6-9 16-4 20 3 2 6-1 5-5-1-4 1-8 4-10" fill="${c.accent}" opacity=".35"/>
      <path d="M88 80c7 6 9 16 4 20-3 2-6-1-5-5 1-4-1-8-4-10" fill="${c.accent}" opacity=".3"/>`;
  }
  if (el === 'lucky') {
    return `
      <g transform="translate(60 16)">
        <circle cx="-5" cy="-3" r="5.4" fill="${c.accent}"/><circle cx="5" cy="-3" r="5.4" fill="${c.accent}"/>
        <circle cx="-5" cy="6" r="5.4" fill="${c.accent}"/><circle cx="5" cy="6" r="5.4" fill="${c.accent}"/>
        <circle cx="0" cy="1.5" r="2" fill="${c.light}"/>
        <path d="M0 8v8" stroke="${c.deep}" stroke-width="2" stroke-linecap="round"/>
      </g>
      <path d="M88 44l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z" fill="${c.light}"/>
      <circle cx="31" cy="56" r="2.2" fill="${c.accent}"/>`;
  }
  if (el === 'banana') {
    return `
      <path d="M60 25c0-7 4-11 9-12-1 5-4 9-7 12" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M58 26c-3-5-2-10 2-12" stroke="${c.deep}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M29 90c-4 6-2 11 3 11 2-4 2-8 1-11M91 90c4 6 2 11-3 11-2-4-2-8-1-11" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M36 99c4 3 8 4 12 4M84 99c-4 3-8 4-12 4" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".7"/>`;
  }
  if (el === 'apple') {
    return `
      <path d="M60 25c0-6 1-9 3-12" stroke="${c.deep}" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M64 16c5-6 12-4 12 2-4 4-9 4-12 0Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M86 70a10 10 0 1 0 0 20 12 12 0 0 1 0-20Z" fill="${c.light}" opacity=".8"/>
      <circle cx="34" cy="46" r="3" fill="${c.light}" opacity=".4"/>`;
  }
  if (el === 'ice') {
    return `
      <path d="M39 30l4-16 5 16M55 27l4-13 5 13M71 29l4-15 5 15" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/>
      <path d="M32 68l8 7-8 7M88 62l-8 7 8 7" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".7"/>
      <path d="M44 90l4 11M58 93l3 10M74 90l-4 11" stroke="${c.light}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
      <circle cx="93" cy="42" r="2" fill="${c.light}" opacity=".8"/>`;
  }
  if (el === 'cherry') {
    return `
      <path d="M52 28c-2-9 4-15 12-17M68 28c2-9-4-15-12-17" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="47" cy="19" r="7" fill="${c.deep}" stroke="${c.light}" stroke-width="1"/>
      <circle cx="73" cy="16" r="6" fill="${c.deep}" stroke="${c.light}" stroke-width="1"/>
      <path d="M66 8c4-5 10-4 12 1-4 3-9 3-12-1Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/>
      <circle cx="45" cy="17" r="2" fill="${c.light}" opacity=".8"/>`;
  }
  if (el === 'cocoa') {
    return `
      <path d="M43 22c-4-6 4-9 0-15M60 19c-4-6 4-9 0-15M77 22c-4-6 4-9 0-15" stroke="${c.light}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".65"/>
      <rect x="44" y="22" width="12" height="9" rx="3" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/>
      <rect x="62" y="20" width="10" height="8" rx="3" fill="#ffffff" stroke="${c.deep}" stroke-width=".8"/>
      <path d="M93 62c8 0 10 7 4 11-2 2-5 1-7 0" stroke="${c.deep}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M40 90c3 4 7 6 12 6" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".5"/>`;
  }
  if (el === 'pizza') {
    return `
      <path d="M28 86c2 7 7 11 14 12" stroke="${c.deep}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".3"/>
      <circle cx="32" cy="50" r="5" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <circle cx="88" cy="58" r="4.4" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <circle cx="43" cy="90" r="4" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <circle cx="77" cy="92" r="3.6" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M46 33c8-3 16-2 22 2" stroke="${c.light}" stroke-width="2" fill="none" opacity=".7"/>`;
  }
  return '';
}

function breedMarkup(sprite, c) {
  const b = sprite.breed;
  if (b === 'sprig') {
    return `
      <path d="M33 47c-11-8-18 1-13 9 4 7 12 3 15-3Z" fill="${c.accent}" opacity=".9"/>
      <path d="M87 47c11-8 18 1 13 9-4 7-12 3-15-3Z" fill="${c.light}" opacity=".95"/>`;
  }
  if (b === 'flit') {
    return `
      <path d="M34 52c-14-13-24-4-18 8 5 9 14 8 20 2Z" fill="${c.light}" opacity=".75"/>
      <path d="M86 52c14-13 24-4 18 8-5 9-14 8-20 2Z" fill="${c.light}" opacity=".75"/>
      <path d="M23 57c4-3 8-2 10 1" stroke="${c.deep}" stroke-width="1.2" fill="none" opacity=".5"/>
      <path d="M97 57c-4-3-8-2-10 1" stroke="${c.deep}" stroke-width="1.2" fill="none" opacity=".5"/>`;
  }
  if (b === 'horn') {
    return `
      <path d="M43 33c-5-9-4-15 2-15 4 1 5 7 4 13Z" fill="${c.deep}"/>
      <path d="M77 33c5-9 4-15-2-15-4 1-5 7-4 13Z" fill="${c.deep}"/>`;
  }
  if (b === 'puff') {
    return `<path d="M60 27c-3-5 1-9 6-8 4 1 4 6 1 8" stroke="${c.light}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }
  if (b === 'wisp') {
    return `
      <circle cx="52" cy="96" r="6" fill="${c.body}" opacity=".55"/>
      <circle cx="65" cy="102" r="4.5" fill="${c.body}" opacity=".38"/>
      <circle cx="59" cy="107" r="3" fill="${c.body}" opacity=".22"/>`;
  }
  if (b === 'bun') {
    return `
      <path d="M43 35C36 20 38 8 45 8c7 0 9 11 8 27Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
      <path d="M77 35c7-15 5-27-2-27-7 0-9 11-8 27Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
      <path d="M46 17c0 5 1 9 3 12" stroke="${c.light}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
      <path d="M74 17c0 5-1 9-3 12" stroke="${c.light}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
  }
  if (b === 'fin') {
    return `
      <path d="M33 63C20 54 12 56 10 65c-2 10 7 16 22 15Z" fill="${c.accent}" opacity=".9"/>
      <path d="M87 63c13-9 21-7 23 2 2 10-7 16-22 15Z" fill="${c.accent}" opacity=".9"/>
      <path d="M78 92c11 4 18 10 22 18-10 0-18-3-24-9Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>`;
  }
  if (b === 'shell') {
    return `
      <path d="M31 67c2-18 14-31 29-31s27 13 29 31c-8 9-18 13-29 13S39 76 31 67Z" fill="${c.light}" opacity=".24" stroke="${c.deep}" stroke-width="1.1"/>
      <path d="M43 53c5-7 11-11 17-11s12 4 17 11" stroke="${c.accent}" stroke-width="1.4" fill="none" opacity=".65"/>
      <path d="M38 71c7 5 14 7 22 7s15-2 22-7" stroke="${c.deep}" stroke-width="1.2" fill="none" opacity=".45"/>`;
  }
  if (b === 'star') {
    return `
      <g fill="${c.light}" opacity=".85">
        <path d="M24 34l1.5 4 4 1.5-4 1.5L24 45l-1.5-4-4-1.5 4-1.5Z"/>
        <path d="M99 64l1.5 4 4 1.5-4 1.5L99 75l-1.5-4-4-1.5 4-1.5Z"/>
      </g>`;
  }
  return '';
}

function feetMarkup(breed, c) {
  if (breed === 'wisp' || breed === 'fin') return '';
  return `
    <ellipse cx="46" cy="96" rx="10" ry="5.4" fill="${c.deep}" opacity=".9"/>
    <ellipse cx="74" cy="96" rx="10" ry="5.4" fill="${c.deep}" opacity=".9"/>
    <ellipse cx="44" cy="95" rx="3.6" ry="2.2" fill="${c.light}" opacity=".45"/>
    <ellipse cx="72" cy="95" rx="3.6" ry="2.2" fill="${c.light}" opacity=".45"/>`;
}

function patternMarkup(sprite, c, clipId) {
  const p = sprite.pattern || 'plain';
  if (p === 'spots') {
    return `<g clip-path="url(#${clipId})" fill="${c.accent}" opacity=".4">
      <circle cx="36" cy="45" r="6"/><circle cx="87" cy="57" r="8"/><circle cx="47" cy="85" r="5"/>
      <circle cx="80" cy="82" r="4"/><circle cx="30" cy="66" r="3.4"/><circle cx="94" cy="42" r="3.6"/>
    </g>`;
  }
  if (p === 'stripes') {
    return `<g clip-path="url(#${clipId})" fill="${c.deep}" opacity=".16">
      <rect x="20" y="44" width="80" height="5" transform="rotate(-12 60 46)"/>
      <rect x="20" y="59" width="80" height="5" transform="rotate(-12 60 61)"/>
      <rect x="20" y="74" width="80" height="5" transform="rotate(-12 60 76)"/>
      <rect x="20" y="89" width="80" height="5" transform="rotate(-12 60 91)"/>
    </g>`;
  }
  if (p === 'freckles') {
    return `<g fill="${c.accent}" opacity=".65">
      <circle cx="39" cy="69" r="1.5"/><circle cx="44" cy="72" r="1.2"/><circle cx="34" cy="73" r="1.1"/>
      <circle cx="81" cy="69" r="1.5"/><circle cx="76" cy="72" r="1.2"/><circle cx="86" cy="73" r="1.1"/>
    </g>`;
  }
  if (p === 'star') {
    const star = (x, y, s) => `<path d="M${x} ${y - s}l${s * 0.3} ${s * 0.7} ${s * 0.8} 0-${s * 0.65} ${s * 0.5} ${s * 0.25} ${s * 0.8}-${s * 0.7}-${s * 0.45}-${s * 0.7} ${s * 0.45} ${s * 0.25}-${s * 0.8}-${s * 0.65}-${s * 0.5} ${s * 0.8} 0z" fill="${c.light}" opacity=".75"/>`;
    return `<g>${star(38, 42, 5)}${star(82, 51, 4)}${star(46, 86, 3.4)}${star(76, 84, 4.6)}</g>`;
  }
  if (p === 'hearts') {
    const heart = (x, y, s, turn) => `<path transform="translate(${x} ${y}) rotate(${turn}) scale(${s})" d="M0 4C-4-2-11 1-11 7c0 6 11 13 11 13s11-7 11-13c0-6-7-9-11-3Z" fill="${c.accent}"/>`;
    return `<g clip-path="url(#${clipId})" opacity=".55">${heart(38, 44, 0.8, -18)}${heart(82, 55, 0.95, 14)}${heart(46, 84, 0.7, 8)}${heart(77, 84, 0.8, -12)}</g>`;
  }
  if (p === 'clouds') {
    return `<g clip-path="url(#${clipId})" fill="${c.light}" opacity=".52">
      <ellipse cx="38" cy="47" rx="12" ry="6"/><ellipse cx="45" cy="43" rx="7" ry="5"/><ellipse cx="31" cy="43" rx="6" ry="4"/>
      <ellipse cx="83" cy="63" rx="10" ry="5"/><ellipse cx="88" cy="59" rx="6" ry="4"/><ellipse cx="77" cy="59" rx="5" ry="3.5"/>
      <ellipse cx="48" cy="86" rx="9" ry="4.5"/><ellipse cx="54" cy="83" rx="5" ry="3.5"/>
    </g>`;
  }
  if (p === 'swirls') {
    return `<g clip-path="url(#${clipId})" fill="none" stroke="${c.accent}" stroke-width="2.6" stroke-linecap="round" opacity=".5">
      <path d="M31 54c7-8 16-3 12 5s-15 3-13-6 17-12 25-4"/>
      <path d="M79 78c6-7 14-3 11 4s-13 3-11-5 15-10 21-3"/>
      <path d="M42 82c5-6 12-2 9 4s-11 2-9-4"/>
    </g>`;
  }
  if (p === 'flame') {
    return `<g clip-path="url(#${clipId})" opacity=".55">
      <path d="M22 100c2-12 8-15 7-23 6 4 7 9 7 13 2-6 5-9 8-11 0 9 5 13 6 21Z" fill="${c.accent}"/>
      <path d="M74 100c3-14 10-17 9-26 6 5 6 10 6 15 3-5 5-7 8-9 1 9 5 14 6 20Z" fill="${c.accent}"/>
      <path d="M45 101c2-8 6-10 6-16 4 3 5 7 5 10 2-4 4-6 6-7 0 7 3 9 4 13Z" fill="${c.light}" opacity=".8"/>
    </g>`;
  }
  if (p === 'patch') {
    return `<g clip-path="url(#${clipId})" opacity=".42">
      <rect x="24" y="38" width="16" height="14" rx="3" fill="${c.accent}" transform="rotate(-9 32 45)"/>
      <rect x="74" y="60" width="18" height="15" rx="3" fill="${c.deep}" transform="rotate(7 83 67)"/>
      <rect x="37" y="76" width="13" height="11" rx="2" fill="${c.light}" transform="rotate(-5 43 81)"/>
      <rect x="68" y="88" width="12" height="10" rx="2" fill="${c.accent}" transform="rotate(12 74 93)"/>
      <g stroke="${c.deep}" stroke-width="1" stroke-dasharray="2 2" opacity=".7"><path d="M25 38l15-2M75 62l16 1M38 77l12 1"/></g>
    </g>`;
  }
  if (p === 'sparkle') {
    const spark = (x, y, s) => `<path d="M${x} ${y - s}L${x + s * 0.28} ${y - s * 0.28}L${x + s} ${y}L${x + s * 0.28} ${y + s * 0.28}L${x} ${y + s}L${x - s * 0.28} ${y + s * 0.28}L${x - s} ${y}L${x - s * 0.28} ${y - s * 0.28}Z" fill="${c.light}"/>`;
    return `<g clip-path="url(#${clipId})" opacity=".78">${spark(35, 43, 5)}${spark(84, 56, 6)}${spark(46, 86, 4)}${spark(78, 88, 3.4)}${spark(55, 50, 2.4)}<circle cx="30" cy="70" r="1.4" fill="${c.accent}"/><circle cx="90" cy="76" r="1.6" fill="${c.accent}"/><circle cx="62" cy="95" r="1.3" fill="${c.accent}"/></g>`;
  }
  if (p === 'belly') {
    return `<ellipse cx="60" cy="79" rx="23" ry="19" fill="${c.belly}" opacity=".95"/>`;
  }
  return `<ellipse cx="60" cy="80" rx="19" ry="15.5" fill="${c.belly}" opacity=".8"/>`;
}

function accessoryMarkup(name, c) {
  if (name === 'crown') {
    return `<g>
      <path d="M44 26l4-12 7 7 5-10 5 10 7-7 4 12z" fill="#ffd166" stroke="#c98d1a" stroke-width="1.4" stroke-linejoin="round"/>
      <circle cx="60" cy="23" r="2" fill="#ff8fa3"/>
      <circle cx="48" cy="24" r="1.5" fill="#8be9ff"/>
      <circle cx="72" cy="24" r="1.5" fill="#b69cff"/>
    </g>`;
  }
  if (name === 'bow') {
    return `<g transform="translate(82 30) rotate(12)">
      <path d="M0 0c-9-8-16 0-9 7 4 4 8 1 9-2Z" fill="#ff8fb2"/>
      <path d="M0 0c9-8 16 0 9 7-4 4-8 1-9-2Z" fill="#ff8fb2"/>
      <circle cx="0" cy="3" r="3.6" fill="#ff5e8a"/>
    </g>`;
  }
  if (name === 'scarf') {
    return `<g>
      <path d="M33 82c14 9 40 9 54 0l2 10c-16 9-42 9-58 0z" fill="#ff8fa3"/>
      <path d="M81 89c6 1 9 5 8 12-4 1-8-3-9-7z" fill="#ff6b8f"/>
      <path d="M36 84c10 5 22 6 34 4" stroke="#ffd6e0" stroke-width="1.6" fill="none" opacity=".8"/>
    </g>`;
  }
  if (name === 'glasses') {
    return `<g fill="none" stroke="#2b2440" stroke-width="2.4">
      <circle cx="47" cy="60" r="11" fill="rgba(255,255,255,.14)"/>
      <circle cx="73" cy="60" r="11" fill="rgba(255,255,255,.14)"/>
      <path d="M58 60h4M36 58l-6-2M84 58l6-2"/>
    </g>`;
  }
  if (name === 'leaf') {
    return `<g transform="translate(39 27) rotate(-18)">
      <path d="M0 0c-9-7-16 2-12 9 3 6 11 4 14-2Z" fill="#7ed957" stroke="#357a2e" stroke-width="1.2"/>
      <path d="M-9 8c4-2 7-5 8-8" stroke="#357a2e" stroke-width="1" fill="none"/>
    </g>`;
  }
  if (name === 'flower') {
    return `<g transform="translate(82 27)">
      ${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-7" rx="4" ry="6.5" fill="#ffd1e8" transform="rotate(${a})"/>`).join('')}
      <circle r="3.6" fill="#ffd166"/>
    </g>`;
  }
  if (name === 'headphones') {
    return `<g>
      <path d="M32 58c0-24 12-34 28-34s28 10 28 34" stroke="#3a3358" stroke-width="4.6" fill="none" stroke-linecap="round"/>
      <rect x="25" y="54" width="13" height="19" rx="6" fill="#3a3358"/>
      <rect x="82" y="54" width="13" height="19" rx="6" fill="#3a3358"/>
      <rect x="28" y="58" width="7" height="11" rx="3" fill="${c.accent}"/>
      <rect x="85" y="58" width="7" height="11" rx="3" fill="${c.accent}"/>
    </g>`;
  }
  if (name === 'partyhat') {
    return `<g transform="translate(60 30) rotate(-9)">
      <path d="M0-32L-13 0h26Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M-8-10h16M-5-19h10M-2-27h4" stroke="${c.light}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
      <circle cx="0" cy="-34" r="4.2" fill="${c.light}" stroke="${c.deep}" stroke-width=".9"/>
    </g>`;
  }
  if (name === 'flowercrown') {
    const bloomAt = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-5" rx="3" ry="4.6" fill="#ffd1e8" transform="rotate(${a})"/>`).join('')}
      <circle r="2.6" fill="#ffd166"/></g>`;
    return `<g>${bloomAt(37, 31, 0.9)}${bloomAt(49, 27, 0.75)}${bloomAt(61, 27, 0.9)}${bloomAt(73, 27, 0.75)}${bloomAt(84, 32, 0.85)}
      <path d="M30 34c12-8 48-8 60 0" stroke="#7ed957" stroke-width="2.4" fill="none" opacity=".8"/>
      <path d="M41 29l-5-5M78 28l6-5" stroke="#5f9e48" stroke-width="1.6" stroke-linecap="round"/>
    </g>`;
  }
  if (name === 'beret') {
    return `<g transform="rotate(-8 58 30)">
      <path d="M32 32c1-11 11-18 24-17 12 1 20 8 21 17-14-3-31-3-45 0Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M30 33c16-3 38-3 54 0" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".35"/>
      <path d="M61 15c1-4 3-6 6-6" stroke="${c.deep}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    </g>`;
  }
  if (name === 'bellcollar') {
    return `<g>
      <path d="M34 83c15 8 37 8 52 0l2 8c-17 8-39 8-56 0Z" fill="#d94b6b" stroke="${c.deep}" stroke-width="1"/>
      <path d="M37 85c13 5 32 5 45 0" stroke="#ffd6e0" stroke-width="1.3" fill="none" opacity=".7"/>
      <circle cx="60" cy="92" r="5.2" fill="#ffd166" stroke="${c.deep}" stroke-width="1"/>
      <path d="M60 97v3" stroke="${c.deep}" stroke-width="1.2" stroke-linecap="round"/>
    </g>`;
  }
  if (name === 'sunglasses') {
    return `<g>
      <rect x="34" y="53" width="23" height="14" rx="6" fill="#241a3a" opacity=".94"/>
      <rect x="63" y="53" width="23" height="14" rx="6" fill="#241a3a" opacity=".94"/>
      <path d="M57 58h6M34 56l-8-2M86 56l8-2" stroke="#241a3a" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M38 56c4-2 8-2 12 0" stroke="#8be9ff" stroke-width="1.3" fill="none" opacity=".55"/>
      <path d="M67 56c4-2 8-2 12 0" stroke="#ffb3d1" stroke-width="1.3" fill="none" opacity=".45"/>
    </g>`;
  }
  if (name === 'overalls') {
    return `<g>
      <path d="M41 84h38v20H41Z" fill="#5b7fa8" stroke="${c.deep}" stroke-width="1.1"/>
      <path d="M44 85V63M76 85V63" stroke="#5b7fa8" stroke-width="5.4" stroke-linecap="round"/>
      <path d="M46 82l4 4M74 82l-4 4" stroke="#ffd166" stroke-width="2" stroke-linecap="round"/>
      <circle cx="46" cy="84" r="1.8" fill="#ffd166"/><circle cx="74" cy="84" r="1.8" fill="#ffd166"/>
      <rect x="53" y="89" width="14" height="10" rx="2" fill="#4a6b8f" stroke="#c9e2ff" stroke-width=".8" opacity=".85"/>
      <path d="M45 98h30" stroke="#c9e2ff" stroke-width="1" opacity=".35" stroke-dasharray="3 3"/>
    </g>`;
  }
  if (name === 'raincoat') {
    return `<g>
      <path d="M33 43c0-17 12-28 27-28s27 11 27 28" fill="none" stroke="#ffd166" stroke-width="7" stroke-linecap="round" opacity=".95"/>
      <path d="M37 78c14-6 32-6 46 0l5 27H32Z" fill="#ffd166" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M60 78v27M40 88l-4 17M80 88l4 17" stroke="${c.deep}" stroke-width="1.1" fill="none" opacity=".35"/>
      <circle cx="60" cy="86" r="2" fill="#8a5a2b"/><circle cx="60" cy="94" r="2" fill="#8a5a2b"/>
      <path d="M44 80c10 3 22 3 32 0" stroke="#fff3c4" stroke-width="1.6" fill="none" opacity=".7"/>
    </g>`;
  }
  if (name === 'boots') {
    return `<g>
      <path d="M32 90h16v12c0 4-3 6-8 6s-8-2-8-6ZM72 90h16v12c0 4-3 6-8 6s-8-2-8-6Z" fill="#4f89c9" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M30 92h20v5H30ZM70 92h20v5H70Z" fill="#7affd8" stroke="${c.deep}" stroke-width=".9"/>
      <path d="M34 98h12M74 98h12" stroke="#ffe066" stroke-width="1.4" stroke-linecap="round"/>
    </g>`;
  }
  if (name === 'cape') {
    return `<g>
      <path d="M38 77C20 84 15 101 22 112h14l5-26Z" fill="#d94b4b" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M82 77c18 7 23 24 16 35H84l-5-26Z" fill="#d94b4b" stroke="${c.deep}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M27 104c5-2 9-3 14-2M93 104c-5-2-9-3-14-2" stroke="#ffb3b3" stroke-width="1.4" fill="none" opacity=".55" stroke-linecap="round"/>
      <circle cx="60" cy="78" r="4.4" fill="#ffd166" stroke="${c.deep}" stroke-width="1"/>
    </g>`;
  }
  if (name === 'backpack') {
    return `<g>
      <path d="M42 62c-4 10-4 22 0 32M78 62c4 10 4 22 0 32" stroke="#7a5a3a" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="86" y="70" width="22" height="27" rx="7" fill="#7a8f5a" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M88 79c6 2 12 2 18 0" stroke="#c9e2a8" stroke-width="1.4" fill="none"/>
      <rect x="91" y="83" width="12" height="8" rx="2" fill="#5f7045" stroke="#c9e2a8" stroke-width=".7"/>
      <circle cx="63" cy="62" r="2" fill="#ffd166"/><circle cx="57" cy="64" r="1.4" fill="#ffd166" opacity=".7"/>
    </g>`;
  }
  if (name === 'wizardhat') {
    return `<g transform="translate(60 30) rotate(5)">
      <path d="M-27 2c18-5 36-5 54 0-4-10-8-17-11-27-2-7-7-10-12-13 3 7 2 13-1 20-2 6-4 12-3 20Z" fill="#3d2a6b" stroke="${c.deep}" stroke-width="1.2" stroke-linejoin="round"/>
      <ellipse cx="0" cy="2" rx="29" ry="7" fill="#3d2a6b" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M-4-26l1.4 3.6 3.6 1.4-3.6 1.4L-4-16l-1.4-3.6L-9-21l3.6-1.4ZM9-12l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2Z" fill="#ffd166"/>
      <path d="M-19 1c12-3 26-3 38 0" stroke="#b69cff" stroke-width="1.6" fill="none" opacity=".8"/>
    </g>`;
  }
  if (name === 'beanie') {
    return `<g>
      <path d="M36 33c0-14 10-23 24-23s24 9 24 23Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.3"/>
      <path d="M33 33h54l-2 9H35Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>
      <circle cx="60" cy="8" r="5.6" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M46 14v18M60 12v21M74 14v18" stroke="${c.deep}" stroke-width=".8" opacity=".35"/>
      <path d="M36 34c8 3 16 4 24 4s16-1 24-4" stroke="${c.deep}" stroke-width=".8" fill="none" opacity=".3"/>
    </g>`;
  }
  if (name === 'mittens') {
    return `<g stroke="${c.deep}" stroke-width="1.1">
      <path d="M25 76c-7 0-11 4-11 9 0 5 5 9 11 9 4 0 7-2 8-5l2-6c1-4-3-7-6-6Z" fill="#ff9a5a"/>
      <path d="M95 76c7 0 11 4 11 9 0 5-5 9-11 9-4 0-7-2-8-5l-2-6c-1-4 3-7 6-6Z" fill="#ff9a5a"/>
      <path d="M22 86c2 1 4 1 6 0M98 86c-2 1-4 1-6 0" fill="none" stroke="#ffe9d0" stroke-width="1.4"/>
      <path d="M16 89c-2 2-2 5 0 6M104 89c2 2 2 5 0 6" fill="none" stroke="#ffffff" stroke-width="1.2" opacity=".8"/>
    </g>`;
  }
  if (name === 'parka') {
    return `<g>
      <path d="M42 84c4-4 10-6 18-6s14 2 18 6c-3 5-10 7-18 7s-15-2-18-7Z" fill="#f2efe8" stroke="${c.deep}" stroke-width="1"/>
      <path d="M36 87c6 4 15 6 24 6s18-2 24-6c4 3 7 8 8 13 1 6-1 11-1 11-9 4-20 6-31 6s-22-2-31-6c0 0-2-5-1-11 1-5 4-10 8-13Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M36 88c-6 3-9 9-9 16 0 4 3 7 7 6 4-1 6-4 7-8l2-10Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
      <path d="M84 88c6 3 9 9 9 16 0 4-3 7-7 6-4-1-6-4-7-8l-2-10Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
      <path d="M32 102c3 1 6 1 9 0M88 102c-3 1-6 1-9 0" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".85"/>
      <path d="M60 93v26" stroke="${c.deep}" stroke-width="1.1" opacity=".45"/>
      <circle cx="60" cy="99" r="1.9" fill="#ffd166"/>
      <circle cx="60" cy="107" r="1.9" fill="#ffd166"/>
      <path d="M33 112c8 3 18 4 27 4s19-1 27-4" stroke="#ffffff" stroke-width="2" opacity=".6" fill="none"/>
      <path d="M36 88c5 3 14 5 24 5s19-2 24-5" fill="none" stroke="#ffffff" stroke-width="2.4" opacity=".5"/>
    </g>`;
  }
  return '';
}

/* Player-made garments. These are drawn separately from the fixed accessory list. */
function customOutfitMarkup(sprite, c, clipId) {
  if (!sprite || !sprite.outfit || typeof customClothFor !== 'function') return '';
  const outfit = customClothFor(sprite.outfit);
  if (!outfit) return '';
  const p = outfit.primary;
  const s = outfit.secondary;
  const deep = c.deep;
  const chest = `<circle cx="60" cy="82" r="3.2" fill="${s}" stroke="${deep}" stroke-width=".8"/>`;
  if (outfit.style === 'cape') {
    return `<g>
      <path d="M36 55 18 102l24-7 7-31M84 55l18 47-24-7-7-31" fill="${p}" opacity=".92" stroke="${s}" stroke-width="1.5"/>
      <path d="M38 58c8 5 36 5 44 0" fill="none" stroke="${s}" stroke-width="2.2" opacity=".8"/>
      ${chest}
    </g>`;
  }
  if (outfit.style === 'scarf') {
    return `<g>
      <path d="M33 79c15 8 39 8 54 0l2 9c-17 8-41 8-58 0Z" fill="${p}" stroke="${deep}" stroke-width="1"/>
      <path d="M82 86c7 2 10 8 7 16-5 0-9-5-10-10Z" fill="${s}" stroke="${deep}" stroke-width="1"/>
      <path d="M38 83c12 5 32 5 44 0" fill="none" stroke="${s}" stroke-width="1.8" opacity=".8"/>
    </g>`;
  }
  if (outfit.style === 'hoodie') {
    return `<g clip-path="url(#${clipId})">
      <path d="M26 68h68v36H26Z" fill="${p}" opacity=".9"/>
      <path d="M43 67c4 8 30 8 34 0" fill="none" stroke="${s}" stroke-width="4"/>
      <path d="M52 83h16v12H52Z" fill="none" stroke="${s}" stroke-width="1.3" opacity=".85"/>
      <path d="M60 70v12" stroke="${s}" stroke-width="1.4" stroke-dasharray="2 2" opacity=".8"/>
      <path d="M48 72l-3 13M72 72l3 13" stroke="${s}" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
    </g>`;
  }
  if (outfit.style === 'vest') {
    return `<g clip-path="url(#${clipId})">
      <path d="M25 66h20v38H25ZM75 66h20v38H75Z" fill="${p}" opacity=".92"/>
      <path d="M42 67l8 10M78 67l-8 10" stroke="${s}" stroke-width="2" fill="none" opacity=".9"/>
      ${chest}
    </g>`;
  }
  if (outfit.style === 'dress') {
    return `<g>
      <path d="M43 72h34l15 32H28Z" fill="${p}" opacity=".93" stroke="${deep}" stroke-width="1.1"/>
      <path d="M40 72c10 7 30 7 40 0" fill="none" stroke="${s}" stroke-width="3"/>
      <path d="M34 96c14 4 38 4 52 0" fill="none" stroke="${s}" stroke-width="1.5" opacity=".75"/>
      ${chest}
    </g>`;
  }
  if (outfit.style === 'armor') {
    return `<g clip-path="url(#${clipId})">
      <path d="M38 68h44l-5 28H43Z" fill="${p}" opacity=".9" stroke="${s}" stroke-width="1.5"/>
      <path d="M30 60l-6 16 15-4 3-13M90 60l6 16-15-4-3-13" fill="${p}" stroke="${s}" stroke-width="1.2"/>
      <path d="M52 76h16M60 69v23M47 88h26" stroke="${s}" stroke-width="1.2" opacity=".8"/>
    </g>`;
  }
  if (outfit.style === 'hat') {
    return `<g>
      <path d="M34 34c1-13 12-22 26-22s25 9 26 22c-15-4-37-4-52 0Z" fill="${p}" stroke="${deep}" stroke-width="1.2"/>
      <path d="M33 34c16-4 38-4 54 0" fill="none" stroke="${s}" stroke-width="4"/>
      <circle cx="60" cy="13" r="4" fill="${s}" stroke="${deep}" stroke-width=".9"/>
      <path d="M41 24c10-5 28-5 38 0" fill="none" stroke="${s}" stroke-width="1.2" opacity=".65"/>
    </g>`;
  }
  if (outfit.style === 'boots') {
    return `<g>
      <path d="M31 88c8-2 15 1 17 8l4 9H24c-2-6 0-12 7-17Z" fill="${p}" stroke="${deep}" stroke-width="1.1"/>
      <path d="M89 88c-8-2-15 1-17 8l-4 9h28c2-6 0-12-7-17Z" fill="${p}" stroke="${deep}" stroke-width="1.1"/>
      <path d="M25 102h26M69 102h26" stroke="${s}" stroke-width="3" stroke-linecap="round"/>
    </g>`;
  }
  return '';
}

function finishMarkup(sprite, c, clipId) {
  const f = finishOf(sprite);
  if (!f) return '';
  if (sprite.variant === 'gold') {
    return `
      <g clip-path="url(#${clipId})" opacity=".35">
        <path d="M8 52L72 112" stroke="#ffffff" stroke-width="12"/>
        <path d="M38 18L98 78" stroke="#fff6cc" stroke-width="5"/>
      </g>
      <path d="M25 35l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5ZM96 44l1.2 3.2 3.2 1.2-3.2 1.2L96 53l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="#fff6cc" opacity=".9"/>`;
  }
  if (sprite.variant === 'gummy') {
    return `
      <g clip-path="url(#${clipId})" opacity=".45">
        <ellipse cx="42" cy="46" rx="12" ry="7" fill="#ffffff" transform="rotate(-24 42 46)"/>
        <ellipse cx="77" cy="84" rx="8" ry="5" fill="#ffffff" transform="rotate(28 77 84)"/>
        <path d="M28 78c8 5 14 5 20 1" stroke="#ffffff" stroke-width="2" fill="none"/>
      </g>
      <path d="M94 38c4 0 6 3 4 6" stroke="#ffffff" stroke-width="1.4" fill="none" opacity=".7"/>`;
  }
  if (sprite.variant === 'galaxy') {
    return `
      <g clip-path="url(#${clipId})" fill="#ffffff">
        <circle cx="38" cy="40" r="1.6" opacity=".9"/><circle cx="73" cy="50" r="1.2" opacity=".8"/>
        <circle cx="52" cy="86" r="1.4" opacity=".7"/><circle cx="86" cy="72" r="1" opacity=".8"/>
        <circle cx="61" cy="34" r=".9" opacity=".7"/><circle cx="31" cy="65" r="1" opacity=".6"/>
      </g>
      <ellipse cx="60" cy="62" rx="46" ry="17" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".45" transform="rotate(-12 60 62)"/>
      <path d="M96 34l1.4 3.6 3.6 1.4-3.6 1.4L96 44l-1.4-3.6-3.6-1.4 3.6-1.4Z" fill="${c.accent}" opacity=".9"/>`;
  }
  if (sprite.variant === 'holofoil') {
    return `
      <g clip-path="url(#${clipId})" opacity=".3">
        <path d="M12 62L58 16h12L24 74Z" fill="#8be9ff"/>
        <path d="M34 86L80 40h10L44 96Z" fill="#ffb3d1"/>
        <path d="M58 104L104 58v10L68 104Z" fill="#ffe066"/>
      </g>
      <path d="M24 46l1.2 3.2 3.2 1.2-3.2 1.2L24 55l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".85"/>`;
  }
  if (sprite.variant === 'cube') {
    return `
      <g clip-path="url(#${clipId})" stroke="${c.light}" stroke-width="1" opacity=".28" fill="none">
        <path d="M20 40h80M20 60h80M20 80h80M40 20v90M60 20v90M80 20v90"/>
      </g>
      <path d="M21 40h7v7h-7ZM92 64h6v6h-6ZM28 84h5v5h-5Z" fill="${c.accent}" opacity=".8"/>
      <path d="M97 30l6 3-6 3Z" fill="${c.light}" opacity=".8"/>`;
  }
  if (sprite.variant === 'quack') {
    const bill = sprite.element === 'duck'
      ? `<path d="M52 26c-3-6 0-10 5-10 3 0 5 2 5 5M68 24c3-6 6-8 9-6" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".6"/>`
      : `<ellipse cx="60" cy="78" rx="15" ry="5.6" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/><circle cx="53" cy="76" r="1" fill="${c.deep}" opacity=".6"/><circle cx="67" cy="76" r="1" fill="${c.deep}" opacity=".6"/>`;
    return `${bill}
      <path d="M30 58c-5 3-6 9-2 12 3 2 7 0 8-4" fill="${c.light}" opacity=".55"/>
      <path d="M92 44c2-4 6-5 9-2" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".7"/>`;
  }
  if (sprite.variant === 'gem') {
    return `
      <g clip-path="url(#${clipId})" opacity=".5" stroke="${c.light}" stroke-width=".8" fill="none">
        <path d="M60 20L34 62l26 36 26-36Z"/>
        <path d="M60 20v78M34 62h52M44 42l16 20 16-20"/>
      </g>
      <path d="M25 32l1.4 3.6 3.6 1.4-3.6 1.4L25 42l-1.4-3.6-3.6-1.4 3.6-1.4ZM96 68l1.2 3.2 3.2 1.2-3.2 1.2L96 77l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.light}" opacity=".9"/>`;
  }
  return '';
}

function formMarkup(sprite, c, layer) {
  const form = sprite.form;
  if (!form) return '';
  if (layer === 'back') {
    if (form === 'dragon') {
      return `<g opacity=".95">
        <path d="M32 63C16 47 10 30 15 24c9 2 22 13 28 27Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.3"/>
        <path d="M88 63c16-16 22-33 17-39-9 2-22 13-28 27Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.3"/>
        <path d="M22 31c6 9 11 17 14 26M98 31c-6 9-11 17-14 26" stroke="${c.light}" stroke-width="1.5" fill="none" opacity=".65"/>
        <path d="M78 92c13 2 20 8 22 16-9 2-17-2-24-8Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
      </g>`;
    }
    if (form === 'fairy') {
      return `<g opacity=".8">
        <ellipse cx="29" cy="58" rx="19" ry="28" fill="${c.light}" opacity=".45" transform="rotate(-18 29 58)"/>
        <ellipse cx="91" cy="58" rx="19" ry="28" fill="${c.light}" opacity=".45" transform="rotate(18 91 58)"/>
        <ellipse cx="36" cy="84" rx="13" ry="18" fill="${c.accent}" opacity=".28" transform="rotate(-28 36 84)"/>
        <ellipse cx="84" cy="84" rx="13" ry="18" fill="${c.accent}" opacity=".28" transform="rotate(28 84 84)"/>
      </g>`;
    }
    if (form === 'ghoul') {
      return `<g opacity=".72">
        <path d="M32 80c-4 15 2 24 12 30 8 5 4 11 0 14 14-4 18-15 15-26-2-8 2-15 8-19Z" fill="${c.light}" opacity=".55"/>
        <path d="M88 78c5 14 0 23-9 29-7 5-3 10 1 13-14-3-19-14-16-25 2-8-1-14-7-18Z" fill="${c.light}" opacity=".45"/>
        <circle cx="24" cy="42" r="2.3" fill="${c.accent}" opacity=".8"/>
        <circle cx="97" cy="56" r="1.8" fill="${c.accent}" opacity=".7"/>
      </g>`;
    }
    if (form === 'leviathan') {
      return `<g opacity=".9">
        <path d="M32 68C17 58 7 64 8 78c10 1 20-2 29-8Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M88 68c15-10 25-4 24 10-10 1-20-2-29-8Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M79 92c14 2 23 10 26 18-11 1-19-3-27-10Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M18 70c5 5 10 8 16 9M102 70c-5 5-10 8-16 9" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".65"/>
      </g>`;
    }
    if (form === 'seraph') {
      return `<g opacity=".82">
        <ellipse cx="28" cy="56" rx="17" ry="30" fill="${c.light}" opacity=".4" transform="rotate(-22 28 56)"/>
        <ellipse cx="92" cy="56" rx="17" ry="30" fill="${c.light}" opacity=".4" transform="rotate(22 92 56)"/>
        <ellipse cx="37" cy="82" rx="10" ry="19" fill="${c.accent}" opacity=".28" transform="rotate(-32 37 82)"/>
        <ellipse cx="83" cy="82" rx="10" ry="19" fill="${c.accent}" opacity=".28" transform="rotate(32 83 82)"/>
        <ellipse cx="44" cy="95" rx="7" ry="12" fill="${c.light}" opacity=".22" transform="rotate(-40 44 95)"/>
        <ellipse cx="76" cy="95" rx="7" ry="12" fill="${c.light}" opacity=".22" transform="rotate(40 76 95)"/>
        <circle cx="60" cy="21" r="16" fill="none" stroke="${c.accent}" stroke-width="2" opacity=".7"/>
      </g>`;
    }
    if (form === 'wraith') {
      return `<g opacity=".68">
        <path d="M34 78c-7 13-4 24 5 32 8 7 3 12-2 16 14-3 20-14 17-25-2-8 2-15 9-19Z" fill="${c.light}" opacity=".5"/>
        <path d="M86 76c8 13 5 24-4 31-8 6-3 12 2 15-14-2-20-13-17-24 2-8-2-14-8-18Z" fill="${c.light}" opacity=".4"/>
        <circle cx="23" cy="46" r="2.4" fill="${c.accent}"/><circle cx="98" cy="60" r="1.8" fill="${c.accent}"/>
      </g>`;
    }
    if (form === 'golem') {
      return `<g opacity=".9">
        <path d="M28 61c-8-4-13-1-15 7 1 8 6 13 15 14Z" fill="${c.deep}" opacity=".65"/>
        <path d="M92 61c8-4 13-1 15 7-1 8-6 13-15 14Z" fill="${c.deep}" opacity=".65"/>
        <path d="M34 91c4 7 12 11 26 11s22-4 26-11c-9 3-17 4-26 4s-17-1-26-4Z" fill="${c.deep}" opacity=".5"/>
      </g>`;
    }
    return `<g opacity=".85">
      <circle cx="60" cy="58" r="48" fill="none" stroke="${c.accent}" stroke-width="1.2" stroke-dasharray="3 7" opacity=".55"/>
      <path d="M31 49c-7-4-12-2-16 4 6 1 9 5 11 11" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M89 49c7-4 12-2 16 4-6 1-9 5-11 11" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="76" r="3.5" fill="${c.accent}" opacity=".8"/>
      <circle cx="99" cy="38" r="2.8" fill="${c.light}"/>
      <path d="M97 70l4 8-4 8-4-8Z" fill="${c.light}" opacity=".8"/>
    </g>`;
  }
  if (form === 'dragon') {
    return `<g>
      <path d="M41 33c-3-8 1-14 7-17-2 6 1 9 5 11Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M79 33c3-8-1-14-7-17 2 6-1 9-5 11Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M50 26l5-7 4 8 5-8 4 8" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".65"/>
    </g>`;
  }
  if (form === 'fairy') {
    return `<g>
      <ellipse cx="60" cy="22" rx="14" ry="4" fill="none" stroke="${c.accent}" stroke-width="2" opacity=".8"/>
      <path d="M28 39l1.5 4 4 1.5-4 1.5L28 50l-1.5-4-4-1.5 4-1.5Z" fill="${c.light}"/>
      <path d="M93 66l1.2 3.2 3.2 1.2-3.2 1.2L93 75l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.accent}"/>
      <circle cx="60" cy="27" r="2" fill="${c.light}"/>
    </g>`;
  }
  if (form === 'ghoul') {
    return `<g>
      <path d="M60 25l5 7-5 7-5-7Z" fill="${c.accent}" opacity=".9"/>
      <path d="M44 77c4 4 8 4 12 0M64 77c4 4 8 4 12 0" stroke="${c.light}" stroke-width="1.3" fill="none" opacity=".45"/>
      <path d="M32 34c-4 3-5 7-3 11M88 34c4 3 5 7 3 11" stroke="${c.deep}" stroke-width="1.2" fill="none" opacity=".5"/>
    </g>`;
  }
  if (form === 'leviathan') {
    return `<g>
      <path d="M41 33c-3-8 1-14 7-17-2 6 1 9 5 11Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M79 33c3-8-1-14-7-17 2 6-1 9-5 11Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M45 76c5 3 10 3 15 0M60 76c5 3 10 3 15 0" stroke="${c.light}" stroke-width="1.3" fill="none" opacity=".5"/>
    </g>`;
  }
  if (form === 'seraph') {
    return `<g>
      <circle cx="60" cy="22" r="12" fill="none" stroke="${c.accent}" stroke-width="2" opacity=".8"/>
      <path d="M25 40l1.5 4 4 1.5-4 1.5L25 51l-1.5-4-4-1.5 4-1.5Z" fill="${c.light}"/>
      <path d="M96 64l1.2 3.2 3.2 1.2-3.2 1.2L96 73l-1.2-3.2-3.2-1.2 3.2-1.2Z" fill="${c.accent}"/>
      <path d="M53 27l7-5 7 5" stroke="${c.light}" stroke-width="1.5" fill="none" opacity=".8"/>
    </g>`;
  }
  if (form === 'wraith') {
    return `<g>
      <path d="M44 28l16 8 16-8-5 13 5 11-16-6-16 6 5-11Z" fill="${c.deep}" opacity=".55"/>
      <path d="M44 77c4 4 8 4 12 0M64 77c4 4 8 4 12 0" stroke="${c.light}" stroke-width="1.3" fill="none" opacity=".45"/>
    </g>`;
  }
  if (form === 'golem') {
    return `<g>
      <path d="M40 34l8 9-5 10M80 34l-8 9 5 10" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".55"/>
      <path d="M50 77c6 5 14 5 20 0" stroke="${c.accent}" stroke-width="1.4" fill="none"/>
      <circle cx="36" cy="54" r="2" fill="${c.accent}"/><circle cx="84" cy="75" r="2" fill="${c.accent}"/>
    </g>`;
  }
  return `<g>
    <path d="M60 17l6 9-6 7-6-7Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
    <path d="M43 37c-8-2-13 1-16 7M77 37c8-2 13 1 16 7" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M48 32l-4-6M72 32l4-6M38 42l-6-2M82 42l6-2" stroke="${c.light}" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
    <circle cx="60" cy="26" r="2.6" fill="${c.accent}"/>
  </g>`;
}

function shinyMarkup(sprite, c, clipId) {
  if (!sprite.shiny) return '';
  return `
    <g clip-path="url(#${clipId})" opacity=".5">
      <path d="M8 58L58 8h14L18 68Z" fill="#ffffff" opacity=".18"/>
      <path d="M48 112L104 50h8L54 118Z" fill="#fff6cc" opacity=".14"/>
    </g>
    <ellipse cx="60" cy="62" rx="47" ry="44" fill="none" stroke="#fff6cc" stroke-width="1" stroke-dasharray="2 7" opacity=".42"/>
    <g fill="#fff6cc">
      <path class="shiny-spark s1" d="M25 34l2.2 6 6 2.2-6 2.2-2.2 6-2.2-6-6-2.2 6-2.2Z"/>
      <path class="shiny-spark s2" d="M96 46l1.7 4.6 4.6 1.7-4.6 1.7-1.7 4.6-1.7-4.6-4.6-1.7 4.6-1.7Z"/>
      <path class="shiny-spark s3" d="M91 91l1.4 3.8 3.8 1.4-3.8 1.4-1.4 3.8-1.4-3.8-3.8-1.4 3.8-1.4Z"/>
      <circle class="shiny-spark s2" cx="30" cy="76" r="1.5"/>
      <circle class="shiny-spark s3" cx="84" cy="28" r="1.3"/>
    </g>`;
}

function spriteSVG(sprite, opts = {}) {
  const c = resolvePalette(sprite);
  const expr = opts.expr || 'idle';
  const stage = sprite.stage === 'egg' ? 'baby' : (sprite.stage || 'baby');
  const scale = STAGE_SCALE[stage] || 1;
  const baby = stage === 'baby';
  const id = String(sprite.id || 'spr').replace(/[^a-zA-Z0-9_-]/g, '');
  const delay = (id.length % 7) * 0.4 + 0.4;
  const clipId = `clip-${id}`;
  const gradId = `grad-${id}`;
  const isSleeping = expr === 'sleep';

  const eyes = eyeMarkup(expr, baby, delay);
  const mouth = mouthMarkup(expr);
  const features = elementFeature(sprite, c);
  const breed = breedMarkup(sprite, c);
  const feet = feetMarkup(sprite.breed, c);
  const accessory = accessoryMarkup(sprite.accessory || 'none', c);
  const body = bodyPath(sprite.breed);

  const sparkle = ['elder', 'ancient', 'sensei'].includes(stage)
    ? `<g fill="${c.light}" opacity=".9">
        <path d="M26 29l1.3 3.6L31 34l-3.7 1.4L26 39l-1.3-3.6L21 34l3.7-1.4z"/>
        <path d="M96 68l1 2.8 2.8 1-2.8 1L96 76l-1-2.8-2.8-1 2.8-1z"/>
      </g>` : '';

  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="${gradId}" x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0" stop-color="${c.light}"/>
        <stop offset="0.45" stop-color="${c.body}"/>
        <stop offset="1" stop-color="${mix(c.body, c.deep, 0.45)}"/>
      </linearGradient>
      <clipPath id="${clipId}"><path d="${body}"/></clipPath>
    </defs>
    <ellipse cx="60" cy="104" rx="${['elder', 'ancient', 'sensei'].includes(stage) ? 31 : 25}" ry="5" fill="#000" opacity=".22"/>
    <g transform="translate(60 70) scale(${scale}) translate(-60 -70)">
      ${isSleeping ? `<g transform="rotate(-6 60 70)">` : '<g>'}
      ${formMarkup(sprite, c, 'back')}
      ${breed}
      ${feet}
      <path d="${body}" fill="url(#${gradId})"/>
      ${patternMarkup(sprite, c, clipId)}
      <path d="${body}" fill="none" stroke="${c.deep}" stroke-width="1.2" opacity=".22"/>
      <ellipse cx="38" cy="72" rx="6.4" ry="3.6" fill="#ff8fb2" opacity=".4"/>
      <ellipse cx="82" cy="72" rx="6.4" ry="3.6" fill="#ff8fb2" opacity=".4"/>
      ${eyes}
      ${mouth}
      ${features}
      ${finishMarkup(sprite, c, clipId)}
      ${shinyMarkup(sprite, c, clipId)}
      ${formMarkup(sprite, c, 'front')}
      ${customOutfitMarkup(sprite, c, clipId)}
      ${accessory}
      ${sparkle}
      </g>
    </g>
  </svg>`;
}

/* ---------- egg art ---------- */
function eggSVG(sprite, opts = {}) {
  const c = resolvePalette(sprite);
  const progress = clamp(opts.progress || 0, 0, 100);
  const id = String(sprite.id || 'egg').replace(/[^a-zA-Z0-9_-]/g, '');
  const gradId = `egggrad-${id}`;
  const clipId = `eggclip-${id}`;
  const shell = 'M60 16c20 0 33 25 33 50 0 21-14 34-33 34S27 87 27 66c0-25 13-50 33-50Z';
  const cracks = progress >= 35 ? `
    <path d="M60 46l-7 9 8 5-5 8" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round"/>
  ` : '';
  const cracks2 = progress >= 70 ? `
    <path d="M34 62l9 4-3 7M86 56l-9 6 4 6" stroke="${c.deep}" stroke-width="1.7" fill="none" opacity=".5" stroke-linecap="round"/>
  ` : '';
  const cracks3 = progress >= 92 ? `
    <path d="M42 86l7-7 6 4M78 82l-6-6" stroke="${c.deep}" stroke-width="1.8" fill="none" opacity=".6" stroke-linecap="round"/>
  ` : '';
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="${gradId}" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0" stop-color="${c.light}"/>
        <stop offset="0.55" stop-color="${c.body}"/>
        <stop offset="1" stop-color="${darken(c.body, 0.18)}"/>
      </linearGradient>
      <clipPath id="${clipId}"><path d="${shell}"/></clipPath>
    </defs>
    <ellipse cx="60" cy="103" rx="26" ry="5" fill="#000" opacity=".22"/>
    <path d="${shell}" fill="url(#${gradId})" stroke="${c.deep}" stroke-width="1.3" opacity=".98"/>
    <g clip-path="url(#${clipId})" opacity=".5">
      ${patternMarkup({ pattern: opts.pattern || 'spots' }, c, clipId)}
    </g>
    <ellipse cx="46" cy="40" rx="9" ry="14" fill="#fff" opacity=".4" transform="rotate(-24 46 40)"/>
    <circle cx="76" cy="52" r="3.2" fill="#fff" opacity=".28"/>
    <circle cx="44" cy="78" r="2.2" fill="#fff" opacity=".22"/>
    ${cracks}${cracks2}${cracks3}
    ${progress >= 100 ? `<g><path d="M45 34l8 7-4 6 7 5" stroke="${c.deep}" stroke-width="2.4" fill="none" opacity=".8"/></g>` : ''}
    ${shinyMarkup(sprite, c, clipId)}
  </svg>`;
}

/* Expression derived from current state, for ambient sprites. */
function expressionFor(sprite) {
  if (!sprite) return 'idle';
  if (sprite.stage === 'egg') return 'idle';
  if (sprite.asleep) return 'sleep';
  const n = sprite.needs || {};
  const mood = moodOf(sprite);
  if ((n.clean ?? 100) < 25) return 'dirty';
  if ((n.hunger ?? 100) < 18) return 'sad';
  if ((n.energy ?? 100) < 16) return 'grump';
  if (mood.key === 'radiant' || mood.key === 'happy') return 'happy';
  if (mood.key === 'grumpy') return 'grump';
  if (mood.key === 'restless') return 'sad';
  return 'idle';
}
