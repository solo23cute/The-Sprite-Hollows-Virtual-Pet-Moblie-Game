/* Original props for the un-prefixed Base roster. Fortune base forms reuse
   the same character props without the lucky star or finish treatment. */

function signatureBase(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta?.baseRoster) return '';
  const baseArt = (typeof signatureFeature === 'function' ? signatureFeature(meta.baseOf, c) : '') || '';
  if (meta.baseStyle === 'xray') {
    return `${baseArt}<g class="base-xray" opacity=".85">
      <path d="M67 52c10 4 15 11 15 20M53 54c-9 4-14 11-14 20" fill="none" stroke="${c.light}" stroke-width="2" stroke-linecap="round"/>
      <path d="M58 60h4v5h-4zM62 70h4v5h-4zM56 80h4v5h-4zM66 84h4v5h-4z" fill="${c.light}" opacity=".8"/>
      <path d="M47 38l26 26M73 38L47 64" stroke="${c.accent}" stroke-width="1.2" stroke-dasharray="2 4" opacity=".55"/>
      <circle cx="60" cy="62" r="43" fill="none" stroke="${c.light}" stroke-width=".7" opacity=".25"/>
    </g>`;
  }
  if (meta.baseStyle === 'snail') {
    return `${baseArt}<g class="base-snail">
      <path d="M25 84c0-15 11-26 25-26s25 11 25 26" fill="${c.accent}" opacity=".28" stroke="${c.deep}" stroke-width="1"/>
      <path d="M31 84c0-9 6-16 14-16s14 7 14 16" fill="none" stroke="${c.light}" stroke-width="2" opacity=".8"/>
      <path d="M48 68c-2-11 4-19 14-20M48 68c-6-8-4-17 2-22" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="62" cy="48" r="3" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
      <circle cx="50" cy="46" r="2.4" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
      <rect x="82" y="76" width="18" height="13" rx="2" fill="${c.light}" opacity=".55" stroke="${c.deep}" stroke-width="1"/>
      <path d="M82 80h18M91 76v13" stroke="${c.accent}" stroke-width="1" opacity=".85"/>
    </g>`;
  }
  if (meta.fortuneArt && typeof fortuneProp === 'function') {
    return `${baseArt}${fortuneProp(meta.fortuneArt, c)}`;
  }
  return baseArt;
}
