/* Original costume overlays for the Trick or Treat wave. The shared sprite
   body supplies the face and silhouette; these layers add a character prop,
   a candy bucket, and a small Halloween badge. No imported art is used. */

function signatureTrick(el, c) {
  const meta = typeof ELEMENTS !== 'undefined' ? ELEMENTS[el] : null;
  if (!meta || !meta.trickOrTreat) return '';
  const base = meta.trickBase;
  const baseArt = base && base !== 'pond'
    ? (signatureA(base, c) || signatureB(base, c) || '')
    : '';
  const pondArt = base === 'pond'
    ? `<ellipse cx="60" cy="95" rx="31" ry="7" fill="${c.accent}" opacity=".28" stroke="${c.light}" stroke-width="1"/>
       <path d="M33 92c8-7 19-7 27 0-8 6-19 6-27 0Z" fill="${c.accent}" opacity=".55" stroke="${c.deep}" stroke-width=".8"/>
       <path d="M72 88c5-4 11-3 14 2-5 3-10 3-14-2Z" fill="${c.light}" opacity=".45"/>`
    : '';
  const bones = el === 'trickxray'
    ? `<g opacity=".85" stroke="${c.light}" stroke-width="1.6" fill="none" stroke-linecap="round">
         <path d="M48 62c8-3 16-3 24 0M46 69c9-3 19-3 28 0M48 76c8-2 16-2 24 0M52 83c5-2 11-2 16 0"/>
         <path d="M60 58v30M53 58v30M67 58v30"/>
       </g>`
    : '';
  const badge = `<g class="trick-badge">
      <circle cx="84" cy="64" r="5.2" fill="#ff9f43" stroke="${c.deep}" stroke-width=".9"/>
      <path d="M84 60v8M80 64h8" stroke="${c.deep}" stroke-width="1.2" stroke-linecap="round"/>
    </g>`;
  const bucket = `<g class="trick-bucket" transform="translate(86 76)">
      <path d="M3 8h18l-3 21H6Z" fill="${c.deep}" stroke="${c.accent}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M6 8c0-5 3-8 6-8s6 3 6 8" fill="none" stroke="${c.light}" stroke-width="1.4"/>
      <path d="M8 13h8M8 18h8M8 23h8" stroke="${c.accent}" stroke-width="1" opacity=".65"/>
      <circle cx="7" cy="28" r="1.6" fill="#ffd166"/><circle cx="13" cy="29" r="1.4" fill="#ff8fc8"/><circle cx="19" cy="28" r="1.5" fill="#8be9ff"/>
    </g>`;
  const candyTrail = `<g class="trick-candy" fill="${c.accent}" opacity=".85">
      <path d="M21 30l1.4 3.8 3.8 1.4-3.8 1.4L21 40l-1.4-3.8-3.8-1.4 3.8-1.4Z"/>
      <circle cx="31" cy="89" r="1.8"/><circle cx="99" cy="36" r="1.6"/>
    </g>`;
  const spider = `<g class="trick-spider" stroke="${c.deep}" stroke-width="1.1" opacity=".75">
      <path d="M29 3v11" fill="none"/>
      <circle cx="29" cy="17" r="3.4" fill="${c.deep}"/>
      <path d="M27 15l-4-4M31 15l4-4M26 19l-5 2M32 19l5 2" fill="none"/>
    </g>`;

  return `<g class="trick-signature">${baseArt}${pondArt}${bones}${candyTrail}${spider}${badge}${bucket}</g>`;
}
