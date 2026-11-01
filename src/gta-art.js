/* Original procedural signatures for the Grand Theft Auto wave.
   The shared sprite body supplies the face; these layers add a district aura
   and one prop per character. No imported art is used. */

function signatureGTA(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.gta) return '';
  const group = meta.gtaGroup;
  const art = meta.gtaArt || 'star';
  const aura = {
    gta1: `<path d="M22 96h76M28 96V82h12v14M80 96V82h12v14" stroke="${c.accent}" stroke-width="1.4" fill="none" opacity=".5"/><path d="M48 30c-6-6-3-14 5-14 7 0 9 7 5 12" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".45" stroke-dasharray="2 4"/>`,
    gta3: `<path d="M26 98V64h14v34M80 98V70h14v28M34 64l10-16 10 16" stroke="${c.accent}" stroke-width="1.3" fill="none" opacity=".45"/><path d="M49 40c-4-6 0-12 6-12" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".5"/>`,
    vice: `<circle cx="60" cy="18" r="12" fill="${c.accent}" opacity=".22"/><path d="M14 94c12-16 26-24 46-24s34 8 46 24" stroke="${c.accent}" stroke-width="1.5" fill="none" opacity=".55"/><path d="M12 90c10-6 18-6 26 0" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".6"/>`,
    san: `<path d="M20 95c10-10 18-14 28-14s18 4 28 14" stroke="${c.accent}" stroke-width="1.5" fill="none" opacity=".5"/><path d="M76 96c8-14 14-20 22-22" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".45"/><path d="M88 52c5-3 9-3 12 0" stroke="${c.accent}" stroke-width="1.6" fill="none" opacity=".7"/>`,
    stories: `<rect x="34" y="14" width="26" height="40" rx="4" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".5"/><rect x="39" y="20" width="16" height="20" rx="2" fill="${c.accent}" opacity=".3"/><circle cx="42" cy="46" r="1.4" fill="${c.accent}"/><circle cx="50" cy="46" r="1.4" fill="${c.light}"/>`,
    iv: `<path d="M36 96h48M40 96V84h40v12" stroke="${c.accent}" stroke-width="1.4" fill="none" opacity=".45"/><path d="M44 84c4-10 10-14 16-14s12 4 16 14" stroke="${c.light}" stroke-width="1.3" fill="none" opacity=".4"/><path d="M74 30l8-10v14" stroke="${c.accent}" stroke-width="1.5" fill="none" opacity=".6"/>`,
    v: `<path d="M26 96V60h16v36M78 96V60h16v36" stroke="${c.accent}" stroke-width="1.2" fill="none" opacity=".4"/><circle cx="86" cy="26" r="7" fill="${c.light}" opacity=".18"/><path d="M14 96h92" stroke="${c.light}" stroke-width="1.2" opacity=".35"/>`,
    chinatown: `<path d="M30 16h60" stroke="${c.accent}" stroke-width="1.6" opacity=".6"/><path d="M38 16l4 10M82 16l-4 10" stroke="${c.accent}" stroke-width="1.2" opacity=".6"/><path d="M30 96h60" stroke="${c.light}" stroke-width="1.2" opacity=".4"/><circle cx="60" cy="12" r="3" fill="${c.accent}" opacity=".8"/>`,
  }[group] || '';

  const pieces = {
    star: `<path d="M92 26l3 7 7 1-5 6 1 7-6-3-6 3 1-7-5-6 7-1Z" fill="${c.accent}" opacity=".85"/>`,
    suit: `<path d="M44 84 54 70h12l10 14" fill="${c.deep}" opacity=".5"/><path d="M60 70v14" stroke="${c.light}" stroke-width="1.2" opacity=".7"/><path d="M56 70h8l-4 6Z" fill="${c.accent}"/>`,
    shades: `<rect x="34" y="47" width="22" height="11" rx="4" fill="${c.deep}" opacity=".85"/><rect x="64" y="47" width="22" height="11" rx="4" fill="${c.deep}" opacity=".85"/><path d="M56 51h8" stroke="${c.deep}" stroke-width="2"/>`,
    cap: `<path d="M34 34c0-10 10-16 26-16s26 6 26 16Z" fill="${c.deep}"/><path d="M34 34c10-5 50-5 62 0" stroke="${c.accent}" stroke-width="1.6" fill="none"/>`,
    gun: `<path d="M86 44h14v6H92v6h-6V44Z" fill="${c.deep}"/><path d="M88 50h8" stroke="${c.accent}" stroke-width="1.2"/>`,
    badge: `<path d="M88 36l9 3v8c0 6-4 9-9 11-5-2-9-5-9-11v-8Z" fill="${c.accent}" opacity=".55" stroke="${c.accent}" stroke-width="1"/><path d="M88 42v8M84 46h8" stroke="${c.light}" stroke-width="1.2"/>`,
    mask: `<path d="M30 42c8-4 18-4 26 0v10c0 8-6 14-13 14S30 60 30 52Z" fill="${c.deep}" opacity=".55"/>`,
    crown: `<path d="M78 30l-3-12 8 5 5-8 5 8 8-5-3 12Z" fill="${c.accent}" opacity=".8" stroke="${c.light}" stroke-width=".8"/>`,
    mic: `<rect x="90" y="34" width="7" height="20" rx="3" fill="${c.deep}"/><path d="M94 54v8M88 62h12" stroke="${c.accent}" stroke-width="1.6"/>`,
    wheel: `<circle cx="90" cy="62" r="11" fill="none" stroke="${c.deep}" stroke-width="3"/><circle cx="90" cy="62" r="4" fill="${c.accent}" opacity=".7"/>`,
    heli: `<path d="M74 20h32M90 20v6" stroke="${c.light}" stroke-width="1.6"/><rect x="80" y="26" width="22" height="10" rx="5" fill="${c.deep}" opacity=".6"/><path d="M102 30h4" stroke="${c.accent}" stroke-width="2"/>`,
    cash: `<rect x="84" y="52" width="22" height="13" rx="2" fill="${c.accent}" opacity=".35" stroke="${c.accent}" stroke-width=".8"/><path d="M95 55v7M92 57c0-1 1-1.6 3-1.6s3 .6 3 1.5-6 .8-6 2.2 1 1.6 3 1.6 3-.6 3-1.5" stroke="${c.light}" stroke-width=".8" fill="none"/>`,
    phone: `<rect x="88" y="36" width="13" height="24" rx="3" fill="${c.deep}" opacity=".75" stroke="${c.light}" stroke-width=".8"/><path d="M91 40h7" stroke="${c.accent}" stroke-width="1.6"/>`,
    jacket: `<path d="M38 84c4-8 10-12 22-12s18 4 22 12" fill="none" stroke="${c.light}" stroke-width="1.4" opacity=".55"/><path d="M46 80l14 8 14-8" stroke="${c.accent}" stroke-width="1.2" fill="none" opacity=".7"/>`,
    hair: `<path d="M32 36c2-12 12-20 28-20s26 8 28 20c-6-6-14-9-28-9s-22 3-28 9Z" fill="${c.deep}" opacity=".7"/><path d="M28 40c6-4 10-4 14 0" stroke="${c.accent}" stroke-width="1.4" fill="none" opacity=".6"/>`,
    bike: `<circle cx="34" cy="86" r="11" fill="none" stroke="${c.deep}" stroke-width="3"/><circle cx="86" cy="86" r="11" fill="none" stroke="${c.deep}" stroke-width="3"/><path d="M34 86l18-22h24l10 22M52 64h20" stroke="${c.accent}" stroke-width="1.8" fill="none"/>`,
    plane: `<path d="M14 52l72-16-12 14 18 4-78 12 16-8Z" fill="${c.light}" opacity=".5" stroke="${c.accent}" stroke-width=".9"/><path d="M40 44l12 12" stroke="${c.accent}" stroke-width="1.2"/>`,
    boom: `<circle cx="92" cy="34" r="9" fill="${c.accent}" opacity=".45"/><path d="M92 20v5M92 44v5M78 34h5M101 34h5M82 24l4 4M101 44l-4-4M102 24l-4 4M83 44l4-4" stroke="${c.light}" stroke-width="1.3" stroke-linecap="round"/>`,
    bat: `<path d="M88 30l10-8 6 6-8 10-3 12-5-1 1-11Z" fill="${c.deep}" stroke="${c.accent}" stroke-width=".9"/>`,
    gang: `<path d="M78 40c6-3 12-2 16 2-4 5-10 6-16 4Z" fill="${c.accent}" opacity=".65"/><path d="M28 82c8-4 14-4 22 0M72 86c8-4 14-4 20 0" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".45"/>`,
    food: `<path d="M84 58c0-6 6-10 12-10s12 4 12 10Z" fill="${c.accent}" opacity=".6"/><path d="M86 60h20" stroke="${c.light}" stroke-width="1.4"/><path d="M88 64l2 6M104 64l-2 6" stroke="${c.light}" stroke-width="1.1"/>`,
    dog: `<ellipse cx="94" cy="76" rx="8" ry="6" fill="${c.light}" opacity=".6"/><path d="M88 70c-3-4-2-8 2-8M100 70c3-4 2-8-2-8" stroke="${c.deep}" stroke-width="1.3" fill="none"/><circle cx="92" cy="76" r="1.1" fill="${c.deep}"/>`,
  };
  return `<g class="gta-signature">${aura}${pieces[art] || pieces.star}</g>`;
}
