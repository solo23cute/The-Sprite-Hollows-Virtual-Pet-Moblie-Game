/* Original vector ring gear for the WWE-inspired wave. The shared sprite body
   supplies the face; these layers add masks, hair, titles, and entrance gear. */

function signatureWWE(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.wweArt) return '';
  switch (meta.wweArt) {
    case 'deadman':
      return `<g class="wwe-signature">
        <path d="M37 25h46l-8-11H45Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.1"/>
        <path d="M31 25h58" stroke="${c.accent}" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M42 38c-4 12-3 22 1 30M78 38c4 12 3 22-1 30" stroke="${c.light}" stroke-width="2" fill="none" opacity=".55"/>
        <path d="M52 50c3-2 6-2 8 0M60 50c2-2 5-2 8 0" stroke="${c.accent}" stroke-width="1.4" fill="none"/>
        <path d="M34 80c9 4 19 6 26 6s17-2 26-6" stroke="${c.light}" stroke-width="1.6" opacity=".45"/>
      </g>`;
    case 'brawler':
      return `<g class="wwe-signature">
        <path d="M37 31c7-8 14-12 23-12s16 4 23 12" fill="${c.deep}" opacity=".65"/>
        <path d="M33 31h54" stroke="${c.accent}" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M43 48c-5 4-8 9-8 15M77 48c5 4 8 9 8 15" stroke="${c.light}" stroke-width="1.8" fill="none" opacity=".55"/>
        <path d="M49 86h22" stroke="${c.accent}" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="88" cy="70" r="4" fill="none" stroke="${c.accent}" stroke-width="1.5"/>
      </g>`;
    case 'showman':
      return `<g class="wwe-signature">
        <path d="M35 27c8-8 17-12 25-12s17 4 25 12" fill="${c.deep}" opacity=".7"/>
        <path d="M35 30c8 2 16 3 25 3s17-1 25-3" stroke="${c.accent}" stroke-width="2" fill="none"/>
        <path d="M44 29h14M62 29h14" stroke="${c.deep}" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M56 29h8" stroke="${c.deep}" stroke-width="1.6"/>
        <path d="M92 49c4-4 7-3 7 1 0 4-4 8-7 8" fill="${c.accent}" opacity=".75"/>
      </g>`;
    case 'champion':
      return `<g class="wwe-signature">
        <path d="M38 26c5-8 13-12 22-12s17 4 22 12" fill="${c.deep}" opacity=".65"/>
        <path d="M36 26h48" stroke="${c.accent}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M31 88h58" stroke="${c.deep}" stroke-width="5" stroke-linecap="round"/>
        <rect x="43" y="83" width="34" height="12" rx="4" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
        <circle cx="60" cy="89" r="4" fill="${c.light}" stroke="${c.deep}" stroke-width=".8"/>
        <path d="M40 86 30 80M80 86l10-6" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/>
      </g>`;
    case 'power':
      return `<g class="wwe-signature">
        <path d="M34 37c-7 3-10 8-10 14l8 2 5-7M86 37c7 3 10 8 10 14l-8 2-5-7" fill="${c.accent}" stroke="${c.deep}" stroke-width="1" opacity=".9"/>
        <path d="M40 28c6-7 13-10 20-10s14 3 20 10" fill="${c.deep}" opacity=".7"/>
        <path d="M45 83c5 3 10 4 15 4s10-1 15-4" stroke="${c.accent}" stroke-width="2.2" fill="none" opacity=".8"/>
        <path d="M34 72h52" stroke="${c.light}" stroke-width="2" opacity=".4"/>
      </g>`;
    case 'viper':
      return `<g class="wwe-signature">
        <path d="M35 31c6-10 14-15 25-15s19 5 25 15l-7 2H42Z" fill="${c.deep}" opacity=".8"/>
        <path d="M38 32h44" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
        <path d="M45 44c4-3 8-3 11 0-3 3-7 3-11 0ZM64 44c3-3 7-3 11 0-3 3-7 3-11 0Z" fill="${c.accent}"/>
        <path d="M92 54c7 0 10 5 8 10" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".6"/>
        <path d="M40 80c6 3 13 5 20 5s14-2 20-5" stroke="${c.accent}" stroke-width="1.8" opacity=".55"/>
      </g>`;
    case 'queen':
      return `<g class="wwe-signature">
        <path d="M38 27 31 9l11 5 6-9 8 8 4-11 4 11 8-8 6 9 11-5-7 18Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M36 32c6-3 14-4 24-4s18 1 24 4" stroke="${c.light}" stroke-width="1.8" fill="none" opacity=".6"/>
        <path d="M30 72c7 3 14 5 20 6M90 72c-7 3-14 5-20 6" stroke="${c.accent}" stroke-width="2" opacity=".6"/>
        <circle cx="60" cy="20" r="2.2" fill="${c.light}"/>
      </g>`;
    case 'empress':
      return `<g class="wwe-signature">
        <path d="M35 29c6-11 15-17 25-17s19 6 25 17Z" fill="${c.deep}" opacity=".78"/>
        <path d="M38 30h44" stroke="${c.accent}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M44 44c4 3 9 4 16 4s12-1 16-4" stroke="${c.light}" stroke-width="1.8" fill="none" opacity=".7"/>
        <path d="M46 20 38 8l12 3 10-7 10 7 12-3-8 12" stroke="${c.accent}" stroke-width="1.6" fill="none" opacity=".85"/>
        <circle cx="60" cy="16" r="2.4" fill="${c.light}"/>
      </g>`;
    case 'highflyer':
      return `<g class="wwe-signature">
        <path d="M35 30c6-12 15-18 25-18s19 6 25 18Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.1"/>
        <path d="M38 31h44" stroke="${c.light}" stroke-width="2" stroke-linecap="round"/>
        <path d="M41 40c5 4 10 5 19 5s14-1 19-5" stroke="${c.deep}" stroke-width="2" fill="none" opacity=".7"/>
        <path d="M30 68c-4 7-3 13 1 19M90 68c4 7 3 13-1 19" stroke="${c.accent}" stroke-width="2" fill="none" opacity=".6"/>
        <circle cx="60" cy="23" r="2.2" fill="${c.light}"/>
      </g>`;
    default:
      return `<g class="wwe-signature">
        <path d="M36 30c6-10 14-14 24-14s18 4 24 14" fill="${c.accent}" opacity=".55"/>
        <path d="M34 78c9 4 18 6 26 6s17-2 26-6" stroke="${c.light}" stroke-width="1.8" opacity=".5"/>
      </g>`;
  }
}
