/* Original procedural signature layer for the cross-media catalog. */

function signatureCatalog(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.catalogGroup) return '';
  const group = typeof CATALOG_GROUPS !== 'undefined' ? CATALOG_GROUPS[meta.catalogGroup] : null;
  const accent = group?.accent || c.accent;
  const props = typeof heroMotifArt === 'function' ? heroMotifArt(c) : {};
  const prop = props[meta.catalogArt] || props.star || '';
  const aura = meta.worldVariant
    ? `<circle cx="60" cy="60" r="43" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="2 8" opacity=".55"/>
       <path d="M22 60c13-8 63-8 76 0M60 18c-7 14-7 68 0 84M31 34c18 7 40 7 58 0M31 86c18-7 40-7 58 0" fill="none" stroke="${accent}" stroke-width=".8" opacity=".25"/>`
    : meta.shortcut
      ? `<path d="M20 48h27M14 60h33M23 72h24" stroke="${accent}" stroke-width="2" stroke-linecap="round" opacity=".65"/>
         <path d="M91 50l17 10-17 10" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>`
      : `<circle cx="60" cy="58" r="45" fill="none" stroke="${accent}" stroke-width="1.2" stroke-dasharray="3 7" opacity=".5"/>
         <path d="M31 35l3-5 4 5M86 83l-4 5-4-5" stroke="${accent}" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>`;
  return `<g class="catalog-signature">${aura}${prop}</g>`;
}
