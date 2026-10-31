/* Original vector accents for the Fortnite Legacy past-season roster.
   Each silhouette is built from the Hollow's own body and palette; no
   imported outfits, renders, or screenshots are used. */

function signatureFortniteLegacy(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.fortniteLegacyArt) return '';
  const art = meta.fortniteLegacyArt;
  switch (art) {
    case 'knight':
      return `<g class="fn-legacy-signature">
        <path d="M40 28c0-11 9-19 20-19s20 8 20 19Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M42 27h36" stroke="${c.light}" stroke-width="2" opacity=".8"/>
        <path d="M60 9V3M56 5h8" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
        <path d="M37 45h46" stroke="${c.light}" stroke-width="1.6" opacity=".55"/>
        <path d="M48 75 44 92h8l4-17M72 75l4 17h-8l-4-17" fill="${c.light}" opacity=".45"/>
      </g>`;
    case 'raider':
      return `<g class="fn-legacy-signature">
        <path d="M34 31c7-10 16-15 26-15s19 5 26 15Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M35 31h50" stroke="${c.light}" stroke-width="2" opacity=".7"/>
        <rect x="39" y="19" width="16" height="7" rx="3.5" fill="${c.deep}" opacity=".7"/>
        <rect x="65" y="19" width="16" height="7" rx="3.5" fill="${c.deep}" opacity=".7"/>
        <path d="M94 55l10-4-6 9 7 2-11 3" fill="${c.accent}" opacity=".8"/>
      </g>`;
    case 'agent':
      return `<g class="fn-legacy-signature">
        <path d="M38 26c5-7 13-11 22-11s17 4 22 11" fill="${c.deep}" opacity=".8"/>
        <path d="M36 27h48" stroke="${c.accent}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M89 38c6 2 8 6 7 11" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".8"/>
        <circle cx="92" cy="53" r="2.2" fill="${c.accent}"/>
        <path d="M40 82c7 3 14 4 20 4s13-1 20-4" stroke="${c.accent}" stroke-width="1.7" opacity=".55"/>
      </g>`;
    case 'neon':
      return `<g class="fn-legacy-signature">
        <path d="M35 33c6-12 15-19 25-19s19 7 25 19Z" fill="${c.deep}" opacity=".7"/>
        <path d="M38 32h44" stroke="${c.accent}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M26 47l-7 3M94 47l7 3M25 62l-6 5M95 62l6 5" stroke="${c.light}" stroke-width="1.8" opacity=".6" stroke-linecap="round"/>
        <circle cx="88" cy="24" r="2" fill="${c.accent}"/>
      </g>`;
    case 'hero':
      return `<g class="fn-legacy-signature">
        <path d="M36 26c7-6 15-9 24-9s17 3 24 9Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width="1"/>
        <path d="M28 52 18 84l10-4 4 8 8-30M92 52l10 32-10-4-4 8-8-30" fill="${c.deep}" opacity=".45"/>
        <circle cx="60" cy="88" r="8" fill="none" stroke="${c.accent}" stroke-width="2"/>
        <path d="M60 82v12M54 88h12" stroke="${c.accent}" stroke-width="1.6"/>
      </g>`;
    case 'armor':
      return `<g class="fn-legacy-signature">
        <path d="M38 30 32 12l12 6 6-9 10 6 10-6 6 9 12-6-6 18Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width="1"/>
        <path d="M32 44c8 5 18 7 28 7s20-2 28-7" stroke="${c.light}" stroke-width="2" fill="none" opacity=".55"/>
        <path d="M39 72 32 92M81 72l7 20" stroke="${c.accent}" stroke-width="3" opacity=".55"/>
        <circle cx="60" cy="22" r="2" fill="${c.light}"/>
      </g>`;
    case 'drift':
      return `<g class="fn-legacy-signature">
        <path d="M34 35c2-14 12-23 26-23s24 9 26 23l-8-4H42Z" fill="${c.deep}" opacity=".78"/>
        <path d="M42 33h36" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
        <path d="M86 44c10-4 16 2 16 10-6 2-11-1-14-5Z" fill="${c.accent}" opacity=".8"/>
        <path d="M30 73c8 5 18 8 30 8s22-3 30-8" stroke="${c.light}" stroke-width="1.8" opacity=".5"/>
        <circle cx="60" cy="24" r="2.2" fill="${c.light}"/>
      </g>`;
    case 'myth':
      return `<g class="fn-legacy-signature">
        <path d="M40 26 34 8l10 5 6-8 10 7 10-7 6 8 10-5-6 18Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M38 42c5-4 11-6 22-6s17 2 22 6" stroke="${c.light}" stroke-width="1.8" fill="none" opacity=".65"/>
        <path d="M27 74c7 2 12 5 15 9M93 74c-7 2-12 5-15 9" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".7"/>
        <circle cx="60" cy="24" r="2.4" fill="${c.light}"/>
      </g>`;
    case 'witch':
      return `<g class="fn-legacy-signature">
        <path d="M38 28 46 6h9l-2 10 6-6h9l8 18Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.1"/>
        <path d="M31 28h58" stroke="${c.accent}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M88 50l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="${c.light}" opacity=".8"/>
        <path d="M31 80c8 3 18 5 29 5s21-2 29-5" stroke="${c.accent}" stroke-width="1.7" opacity=".5"/>
      </g>`;
    case 'wolf':
      return `<g class="fn-legacy-signature">
        <path d="M38 31 31 8l17 11Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M82 31 89 8 72 19Z" fill="${c.body}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M34 49c0-10 7-17 15-17M86 49c0-10-7-17-15-17" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".6"/>
        <path d="M49 86c4 4 7 6 11 6s7-2 11-6" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".7"/>
        <circle cx="60" cy="23" r="2.2" fill="${c.accent}"/>
      </g>`;
    case 'king':
      return `<g class="fn-legacy-signature">
        <path d="M38 28 30 10l11 5 5-9 8 8 6-11 6 11 8-8 5 9 11-5-8 18Z" fill="${c.light}" opacity=".8" stroke="${c.accent}" stroke-width="1.1"/>
        <path d="M34 34c5-3 12-5 26-5s21 2 26 5" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".65"/>
        <path d="M28 70c-4 7-4 14 0 20M92 70c4 7 4 14 0 20" stroke="${c.light}" stroke-width="2" fill="none" opacity=".5"/>
        <circle cx="60" cy="20" r="2.4" fill="${c.accent}"/>
      </g>`;
    case 'banana':
      return `<g class="fn-legacy-signature">
        <path d="M42 28c0-12 7-21 18-24 2 10-1 18-7 24Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M42 28c5-8 9-14 18-24" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".8"/>
        <path d="M57 8c8 2 12 8 12 15" stroke="${c.accent}" stroke-width="2" fill="none"/>
        <path d="M30 76c9 6 20 9 30 9s21-3 30-9" stroke="${c.accent}" stroke-width="2" opacity=".55"/>
        <circle cx="86" cy="39" r="2" fill="${c.light}"/>
      </g>`;
    case 'star':
      return `<g class="fn-legacy-signature">
        <path d="m60 5 4 12 13 1-10 8 3 13-10-8-10 8 3-13-10-8 13-1Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M33 36c6-5 14-7 27-7s21 2 27 7" stroke="${c.light}" stroke-width="1.8" fill="none" opacity=".65"/>
        <circle cx="30" cy="62" r="2" fill="${c.light}" opacity=".8"/><circle cx="92" cy="54" r="2.4" fill="${c.accent}"/>
      </g>`;
    case 'rift':
      return `<g class="fn-legacy-signature">
        <path d="M60 5c12 0 22 10 22 22S72 49 60 49 38 39 38 27 48 5 60 5Z" fill="${c.deep}" opacity=".55" stroke="${c.accent}" stroke-width="1.4"/>
        <path d="M60 11c8 0 15 7 15 16S68 43 60 43 45 36 45 27s7-16 15-16Z" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".8"/>
        <path d="m60 16 5 8-5 9-5-9Z" fill="${c.accent}"/>
        <path d="M30 58 20 74l10 2-5 10" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".55"/>
      </g>`;
    case 'cosmic':
      return `<g class="fn-legacy-signature">
        <circle cx="60" cy="19" r="14" fill="${c.deep}" opacity=".55" stroke="${c.accent}" stroke-width="1.2"/>
        <path d="M42 23c8-7 28-7 36 0" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".8"/>
        <circle cx="46" cy="18" r="1.5" fill="${c.light}"/><circle cx="68" cy="13" r="1" fill="${c.accent}"/><circle cx="74" cy="24" r="1.4" fill="${c.light}"/>
        <path d="M28 72c8 4 18 6 32 6s24-2 32-6" stroke="${c.accent}" stroke-width="1.8" opacity=".55"/>
      </g>`;
    case 'slurp':
      return `<g class="fn-legacy-signature">
        <path d="M36 30c2-9 9-15 18-17 1 6 0 11-2 15 4 1 7 4 8 8-4 2-8 1-11-2-2 4-6 6-10 5 1-4 3-7 6-9Z" fill="${c.light}" opacity=".8" stroke="${c.accent}" stroke-width="1"/>
        <path d="M86 36c5 5 6 11 3 17" stroke="${c.accent}" stroke-width="2" fill="none"/>
        <path d="M30 78c9 4 20 6 30 6s21-2 30-6" stroke="${c.light}" stroke-width="1.7" opacity=".5"/>
      </g>`;
    case 'power':
      return `<g class="fn-legacy-signature">
        <path d="M34 36c-8 2-12 8-13 15l9 2 4-7M86 36c8 2 12 8 13 15l-9 2-4-7" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" opacity=".9"/>
        <path d="M44 48c6-4 11-5 16-5s10 1 16 5" stroke="${c.light}" stroke-width="1.8" fill="none" opacity=".65"/>
        <path d="M38 77h44" stroke="${c.accent}" stroke-width="3" stroke-linecap="round" opacity=".6"/>
      </g>`;
    case 'mechanic':
      return `<g class="fn-legacy-signature">
        <path d="M38 28c5-10 13-16 22-16s17 6 22 16Z" fill="${c.deep}" opacity=".7"/>
        <circle cx="49" cy="29" r="5.5" fill="${c.light}" stroke="${c.accent}" stroke-width="1.4"/>
        <circle cx="71" cy="29" r="5.5" fill="${c.light}" stroke="${c.accent}" stroke-width="1.4"/>
        <path d="M54 29h12" stroke="${c.accent}" stroke-width="1.6"/>
        <path d="M87 54l8 4-5 7-8-5" fill="${c.accent}" opacity=".8"/>
        <path d="M28 78c9 4 20 6 32 6" stroke="${c.light}" stroke-width="1.7" opacity=".5"/>
      </g>`;
    case 'mask':
      return `<g class="fn-legacy-signature">
        <path d="M36 31c4-14 12-22 24-22s20 8 24 22l-8-2H44Z" fill="${c.deep}" opacity=".8"/>
        <path d="M40 33h40" stroke="${c.accent}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M50 44c3-3 6-4 10-4s7 1 10 4c-3 3-6 5-10 5s-7-2-10-5Z" fill="${c.primary}" opacity=".6"/>
        <path d="M94 62l10 4-7 7" fill="${c.accent}" opacity=".75"/>
      </g>`;
    case 'explorer':
      return `<g class="fn-legacy-signature">
        <path d="M34 30h52l-5-10H39Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M30 30h60" stroke="${c.deep}" stroke-width="3" stroke-linecap="round"/>
        <path d="M89 44l8 2-6 9" fill="${c.light}" opacity=".45" stroke="${c.accent}" stroke-width="1"/>
        <path d="M36 77c8 4 17 6 24 7" stroke="${c.accent}" stroke-width="1.8" opacity=".55"/>
      </g>`;
    case 'scientist':
      return `<g class="fn-legacy-signature">
        <path d="M38 30c4-11 12-18 22-18s18 7 22 18" fill="${c.light}" opacity=".65" stroke="${c.accent}" stroke-width="1.1"/>
        <path d="M42 29h36" stroke="${c.accent}" stroke-width="2"/>
        <path d="M90 38c6 0 9 4 8 9" stroke="${c.accent}" stroke-width="1.6" fill="none"/>
        <circle cx="98" cy="51" r="3" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/>
        <path d="M30 76c9 4 19 6 30 6" stroke="${c.light}" stroke-width="1.6" opacity=".5"/>
      </g>`;
    case 'fish':
      return `<g class="fn-legacy-signature">
        <path d="M60 8c5 5 5 12 0 16-5-4-5-11 0-16Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
        <path d="M36 34c6-8 15-12 24-12s18 4 24 12" fill="${c.light}" opacity=".45"/>
        <path d="M90 61c6 0 9 4 9 8s-5 7-10 4" stroke="${c.accent}" stroke-width="2" fill="none"/>
        <circle cx="92" cy="68" r="1.4" fill="${c.light}"/>
        <path d="M30 78c9 4 20 6 30 6" stroke="${c.light}" stroke-width="1.6" opacity=".5"/>
      </g>`;
    case 'symbiote':
      return `<g class="fn-legacy-signature">
        <path d="M40 28c-4-10 2-18 12-20 0 7 4 11 9 13 5-4 11-4 15 0 5-2 9-6 9-13 10 2 16 10 12 20" fill="${c.deep}" opacity=".75" stroke="${c.accent}" stroke-width="1"/>
        <path d="M30 64c-6 6-8 13-6 20M90 64c6 6 8 13 6 20M38 52c-5 2-8 6-8 11M82 52c5 2 8 6 8 11" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".7"/>
        <circle cx="60" cy="23" r="2.4" fill="${c.light}"/>
      </g>`;
    case 'fighter':
      return `<g class="fn-legacy-signature">
        <path d="M37 30h46" stroke="${c.accent}" stroke-width="5" stroke-linecap="round"/>
        <path d="M82 30c7 1 10 4 12 8" stroke="${c.accent}" stroke-width="2.4" fill="none"/>
        <path d="M33 54c-6 0-9 4-9 9s4 8 9 8M87 54c6 0 9 4 9 9s-4 8-9 8" stroke="${c.light}" stroke-width="1.8" fill="none" opacity=".65"/>
        <path d="M40 80c6 4 13 6 20 6s14-2 20-6" stroke="${c.accent}" stroke-width="1.8" opacity=".55"/>
      </g>`;
    case 'robot':
      return `<g class="fn-legacy-signature">
        <path d="M60 8V1M55 4h10" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="60" cy="9" r="3" fill="${c.light}" stroke="${c.accent}" stroke-width="1"/>
        <path d="M38 31c4-9 11-14 22-14s18 5 22 14Z" fill="${c.light}" opacity=".45" stroke="${c.accent}" stroke-width="1.1"/>
        <path d="M36 45c8 2 16 3 24 3s16-1 24-3" stroke="${c.accent}" stroke-width="1.6" opacity=".6"/>
        <path d="M39 76 34 92M81 76l5 16" stroke="${c.accent}" stroke-width="3" opacity=".5"/>
      </g>`;
    case 'brawler':
      return `<g class="fn-legacy-signature">
        <path d="M34 31c7-9 15-14 26-14s19 5 26 14" fill="${c.deep}" opacity=".65"/>
        <circle cx="48" cy="29" r="5" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".65"/>
        <circle cx="72" cy="29" r="5" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".65"/>
        <path d="M53 29h14" stroke="${c.light}" stroke-width="1" opacity=".55"/>
        <path d="M38 78h44" stroke="${c.accent}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      </g>`;
    default:
      return `<g class="fn-legacy-signature">
        <path d="M38 31c5-10 13-15 22-15s17 5 22 15" fill="${c.accent}" opacity=".6"/>
        <path d="M34 78c8 3 17 5 26 5s18-2 26-5" stroke="${c.light}" stroke-width="1.8" opacity=".5"/>
        <circle cx="60" cy="25" r="2" fill="${c.light}"/>
      </g>`;
  }
}
