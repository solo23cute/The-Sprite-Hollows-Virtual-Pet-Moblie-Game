/* Original signature overlays for named variant tiers. Existing finish
   variants use the shared finish renderer; Cheat, Hunter, and Fortune get
   their own small props so every tier reads differently in the codex. */

function signatureVariant(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.variantOf) return '';
  const base = meta.variantOf;
  const baseArt = (typeof signatureFeature === 'function' ? signatureFeature(base, c) : '') || signatureA(base, c) || signatureB(base, c) || '';

  const cheat = meta.variantStyle === 'cheat'
    ? `<g class="variant-cheat" opacity=".9">
        <rect x="24" y="26" width="10" height="5" fill="${c.accent}" opacity=".65"/>
        <rect x="88" y="36" width="7" height="3" fill="${c.light}" opacity=".7"/>
        <rect x="31" y="83" width="5" height="9" fill="${c.accent}" opacity=".45"/>
        <path d="M18 58h8M18 64h12M18 70h6M96 82h9M92 88h13" stroke="${c.accent}" stroke-width="1.7" stroke-linecap="round" opacity=".7"/>
        <path d="M83 25l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="${c.light}" opacity=".9"/>
      </g>`
    : '';
  const hunter = meta.variantStyle === 'hunter'
    ? `<g class="variant-hunter">
        <circle cx="60" cy="62" r="48" fill="none" stroke="${c.accent}" stroke-width="1" stroke-dasharray="3 8" opacity=".45"/>
        <path d="M60 10v10M60 104v-10M10 62h10M100 62h10" stroke="${c.accent}" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>
        <circle cx="60" cy="62" r="4" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".8"/>
        <path d="M36 29c8-7 16-10 24-10s16 3 24 10" fill="${c.deep}" opacity=".72"/>
        <path d="M32 40c7 2 13 1 18-3M88 40c-7 2-13 1-18-3" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".65"/>
        <path d="M91 34l7-9 2 12" fill="none" stroke="${c.accent}" stroke-width="1.8" stroke-linecap="round"/>
      </g>`
    : '';
  const hacker = meta.variantStyle === 'hacker'
    ? `<g class="variant-hacker">
        <path d="M30 48c12-7 48-7 60 0v8c-10 5-20 7-30 7s-20-2-30-7Z" fill="#061a12" opacity=".78" stroke="#7dffb0" stroke-width="1.2"/>
        <path d="M36 54h48" stroke="#d8ffef" stroke-width="1.9" stroke-linecap="round" opacity=".92"/>
        <path d="M48 58v3M60 58v4M72 58v3" stroke="#7dffb0" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>
        <path d="M24 74l-13 8M96 74l13 8" stroke="#7dffb0" stroke-width="1.5" fill="none" opacity=".55"/>
        <circle cx="10" cy="83" r="2" fill="#d8ffef" opacity=".85"/>
        <circle cx="110" cy="83" r="2" fill="#d8ffef" opacity=".85"/>
        <path d="M82 22l7 5-7 5M38 22l-7 5 7 5" fill="none" stroke="#7dffb0" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
        <path d="M76 35h12M72 39h16" stroke="#d8ffef" stroke-width="1.2" stroke-linecap="round" opacity=".55"/>
        <path d="M42 95h36" stroke="#7dffb0" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>
        <path d="M26 31l1.4 3.8 3.8 1.4-3.8 1.4L26 41.4l-1.4-3.8-3.8-1.4 3.8-1.4Z" fill="#7dffb0" opacity=".7"/>
      </g>`
    : '';
  const fortune = meta.variantStyle === 'fortune'
    ? `<g class="variant-fortune">
        <circle cx="94" cy="28" r="9" fill="${c.accent}" opacity=".22" stroke="${c.accent}" stroke-width="1"/>
        <path d="M94 21l2.2 5.6L102 29l-5.8 2.4L94 37l-2.2-5.6L86 29l5.8-2.4Z" fill="#ffd166" opacity=".95"/>
        <path d="M26 34l1.7 4.6 4.6 1.7-4.6 1.7L26 47l-1.7-4.6-4.6-1.7 4.6-1.7Z" fill="${c.light}" opacity=".8"/>
        <path d="M25 82c10-4 18-2 24 5M95 78c-7-3-13-1-17 4" stroke="${c.accent}" stroke-width="1.8" fill="none" opacity=".65"/>
        ${fortuneProp(meta.fortuneArt, c)}
      </g>`
    : '';
  const secretColors = {
    accent: c.accent || c.body || c.primary || '#ffd166',
    light: c.light || '#ffffff',
    deep: c.deep || c.body || c.primary || '#2a1a4a',
  };
  const secret = meta.variantStyle === 'secret'
    ? `<g class="variant-secret">
        <path d="M32 44c2-18 54-18 56 0-9-5-18-7-28-7s-19 2-28 7Z" fill="${secretColors.deep}" opacity=".2"/>
        <path d="M22 92c7-8 20-8 29 0M69 92c9-8 22-8 29 0" fill="none" stroke="${secretColors.accent}" stroke-width="1.4" stroke-dasharray="2 4" opacity=".55"/>
        <path d="M25 37l1.7 4.6 4.6 1.7-4.6 1.7L25 49.6l-1.7-4.6-4.6-1.7 4.6-1.7Z" fill="${secretColors.light}" opacity=".68"/>
        <path d="M89 70v-3a5 5 0 0 1 10 0v3" fill="none" stroke="${secretColors.light}" stroke-width="1.7"/>
        <rect x="86" y="70" width="16" height="13" rx="2.5" fill="${secretColors.accent}" opacity=".9" stroke="${secretColors.deep}" stroke-width="1"/>
        <circle cx="94" cy="76" r="1.8" fill="${secretColors.deep}"/><path d="M94 77v3" stroke="${secretColors.deep}" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M71 88l4-6 4 6M72 91h6" fill="none" stroke="${secretColors.light}" stroke-width="1.4" stroke-linecap="round" opacity=".65"/>
        <path d="M41 74c4-3 8-3 12 0M41 79c4-3 8-3 12 0" fill="none" stroke="${secretColors.light}" stroke-width="1.2" opacity=".4"/>
      </g>`
    : '';

  return `<g class="variant-signature">${baseArt}${hacker}${cheat}${hunter}${fortune}${secret}</g>`;
}

function fortuneProp(kind, c) {
  switch (kind) {
    case 'peel':
      return `<path d="M34 88c-9 4-14 12-11 19 6 0 11-5 14-12 2 7 7 10 13 8-2-8-8-13-16-15Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>`;
    case 'repeat':
      return `<path d="M26 78c-5 6-4 15 3 20M94 66c5-6 4-15-3-20" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/><path d="M22 80l4-8 8 3M98 64l-4 8-8-3" fill="none" stroke="${c.light}" stroke-width="1.5"/>`;
    case 'fish':
      return `<path d="M84 88c8-5 16-4 22 3-8 6-16 6-22 2l-7 5v-15Z" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/><circle cx="96" cy="91" r="1.2" fill="${c.deep}"/>`;
    case 'chest':
      return `<rect x="82" y="78" width="25" height="17" rx="3" fill="${c.accent}" opacity=".5" stroke="${c.light}" stroke-width="1.2"/><path d="M82 84h25M94 78v17" stroke="${c.light}" stroke-width="1.4"/><circle cx="94" cy="87" r="2" fill="${c.deep}"/>`;
    case 'x':
      return `<path d="M88 72l16 16M104 72l-16 16" stroke="${c.accent}" stroke-width="3" stroke-linecap="round" opacity=".9"/><circle cx="96" cy="80" r="14" fill="none" stroke="${c.light}" stroke-width="1" stroke-dasharray="2 4" opacity=".7"/>`;
    case 'compass':
      return `<circle cx="93" cy="86" r="12" fill="none" stroke="${c.accent}" stroke-width="1.6"/><path d="M93 77l4 9-4-2-4 2Z" fill="${c.light}"/><circle cx="93" cy="86" r="1.6" fill="${c.accent}"/>`;
    case 'kelp':
      return `<path d="M26 94c-6-8-4-16 2-22 3 7 2 15-2 22ZM34 97c2-9 8-14 15-16-1 8-6 14-15 16Z" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>`;
    case 'sprout':
      return `<path d="M94 94c-1-8 4-14 12-15-1 8-5 13-12 15ZM94 94c-6-4-9-10-7-16 5 3 7 9 7 16Z" fill="${c.accent}" opacity=".8" stroke="${c.deep}" stroke-width="1"/>`;
    case 'spark':
      return `<path d="M96 70l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="${c.accent}" opacity=".9"/><circle cx="84" cy="94" r="3" fill="${c.light}" opacity=".8"/>`;
    case 'hook':
      return `<path d="M94 72v14c0 7-5 11-11 9" fill="none" stroke="${c.light}" stroke-width="2.4" stroke-linecap="round"/><path d="M80 93c-2 3 0 6 3 6" fill="none" stroke="${c.accent}" stroke-width="2"/>`;
    case 'sleep':
      return `<path d="M88 82h12l-12 12h12" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M76 70h7l-7 7h7" fill="none" stroke="${c.light}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/><path d="M84 94c6-4 12-4 18 0" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".5"/>`;
    case 'snail':
      return `<circle cx="94" cy="87" r="12" fill="${c.accent}" opacity=".72" stroke="${c.deep}" stroke-width="1"/><path d="M94 79c5 0 8 4 8 8s-4 8-8 8-8-4-8-8c0-3 2-6 5-7" fill="none" stroke="${c.light}" stroke-width="1.4" stroke-linecap="round"/><path d="M94 71v-6M100 73l5-5" stroke="${c.light}" stroke-width="1.6" stroke-linecap="round"/><circle cx="94" cy="63" r="1.8" fill="${c.light}"/><path d="M84 97c4 2 8 2 12 0" stroke="${c.light}" stroke-width="1" opacity=".55"/>`;
    default:
      return '';
  }
}
