/* Original accents for the collection milestone secrets and their exotic
   counterparts. These sit alongside the Vault art without importing assets. */

function signatureCollectionSecret(el, c) {
  if (el === 'seasonkeeper') {
    return `<g class="collection-secret-signature">
      <circle cx="60" cy="20" r="14" fill="none" stroke="${c.accent}" stroke-width="1.8"/>
      <path d="M60 6v4M60 30v4M46 20h4M70 20h4M50 10l3 3M70 30l-3-3M70 10l-3 3M50 30l3-3" stroke="${c.light}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M60 13c4 3 6 6 6 10s-3 7-6 8c-3-1-6-4-6-8s2-7 6-10Z" fill="${c.accent}" opacity=".8"/>
      <path d="M32 78c7 4 17 6 28 6s21-2 28-6" stroke="${c.light}" stroke-width="1.6" opacity=".5"/>
    </g>`;
  }
  if (el === 'ringkeeper') {
    return `<g class="collection-secret-signature">
      <path d="M28 34c8-9 18-14 32-14s24 5 32 14" fill="none" stroke="${c.accent}" stroke-width="2.2"/>
      <path d="M24 48h72M28 62h64" stroke="${c.light}" stroke-width="1.8" opacity=".7"/>
      <path d="M36 34v28M84 34v28" stroke="${c.accent}" stroke-width="2.2"/>
      <path d="M60 70c6 0 10 4 10 9s-5 9-10 9-10-4-10-9 4-9 10-9Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M60 72v14" stroke="${c.light}" stroke-width="1.4"/>
    </g>`;
  }
  if (el === 'riftchampion') {
    return `<g class="collection-secret-signature">
      <path d="M60 5c13 0 23 10 23 23S73 50 60 50 37 41 37 28 47 5 60 5Z" fill="${c.deep}" opacity=".55" stroke="${c.accent}" stroke-width="1.5"/>
      <path d="M60 12c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16Z" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".8"/>
      <path d="m60 16 4 10 10 2-8 7 2 10-8-6-8 6 2-10-8-7 10-2Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8"/>
      <path d="M30 64 20 84l9-2 3 8 8-22M90 64l10 20-9-2-3 8-8-22" fill="${c.light}" opacity=".3"/>
    </g>`;
  }
  if (el === 'grandslam') {
    return `<g class="collection-secret-signature">
      <path d="M30 24 34 8l9 6 6-9 11 7 11-7 6 9 9-6 4 16Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
      <path d="M31 27h58" stroke="${c.light}" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M26 70h68" stroke="${c.deep}" stroke-width="5" stroke-linecap="round"/>
      <rect x="38" y="64" width="18" height="13" rx="4" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <rect x="64" y="64" width="18" height="13" rx="4" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <circle cx="47" cy="70" r="3.2" fill="${c.light}"/><circle cx="73" cy="70" r="3.2" fill="${c.light}"/>
      <path d="M41 88c6 3 12 4 19 4s13-1 19-4" stroke="${c.light}" stroke-width="1.6" opacity=".5"/>
    </g>`;
  }
  return '';
}
