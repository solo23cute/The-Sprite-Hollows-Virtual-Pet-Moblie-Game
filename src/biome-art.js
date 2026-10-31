/* Signature art for the type-biome guardians and secret vault sprites. */

function signatureBiome(el, c) {
  if (BIOME_GUARDIAN_BY_SPECIES[el]) {
    const type = BIOME_GUARDIAN_BY_SPECIES[el];
    if (type === 'normal') return `<g>
      <path d="M38 29c-9-7-15-5-17 4 7 0 11 4 14 10" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
      <path d="M82 29c9-7 15-5 17 4-7 0-11 4-14 10" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round"/>
      <path d="M49 26l11-10 11 10-3 7H52Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.1"/>
      <circle cx="60" cy="23" r="2" fill="${c.accent}"/>
    </g>`;
    if (type === 'fire') return `<g>
      <path d="M60 31c-9-9-2-18 4-25 1 8 9 11 7 20-1 5-5 8-11 5Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M60 28c-3-5 1-9 3-12 1 4 3 6 3 9 0 3-3 5-6 3Z" fill="${c.light}"/>
      <path d="M33 42c-4 5-4 11 0 15M87 42c4 5 4 11 0 15" stroke="${c.light}" stroke-width="1.6" fill="none" opacity=".7"/>
      <circle cx="94" cy="35" r="2.2" fill="${c.accent}"/>
    </g>`;
    if (type === 'water') return `<g>
      <path d="M26 38q10-9 20 0t20 0 20 0" stroke="${c.accent}" stroke-width="2.4" fill="none" opacity=".8"/>
      <path d="M28 31q8-6 16 0t16 0 16 0" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".65"/>
      <path d="M60 14c7 8 12 14 12 20a12 12 0 0 1-24 0c0-6 5-12 12-20Z" fill="${c.accent}" opacity=".3" stroke="${c.light}" stroke-width="1.1"/>
      <circle cx="57" cy="33" r="1.5" fill="${c.light}"/>
    </g>`;
    if (type === 'electric') return `<g>
      <path d="M60 4l-9 18h9l-6 18 18-23h-9l8-13Z" fill="${c.accent}" stroke="${c.deep}" stroke-width=".8" opacity=".92"/>
      <path d="M31 40l-7-5M89 40l7-5M28 53h-8M92 53h8" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
      <circle cx="29" cy="64" r="1.8" fill="${c.light}"/><circle cx="93" cy="30" r="1.5" fill="${c.light}"/>
    </g>`;
    if (type === 'grass') return `<g>
      <path d="M46 30c-10-1-17 5-20 13 8-1 14-4 20-9M74 30c10-1 17 5 20 13-8-1-14-4-20-9" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M60 20c-3-7 0-13 6-16 2 7 0 12-4 16Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M53 31c-3-7-1-12 4-15 2 6 1 11-2 15Z" fill="${c.light}" opacity=".8"/>
      <circle cx="31" cy="26" r="2" fill="${c.accent}"/><circle cx="90" cy="31" r="1.6" fill="${c.accent}"/>
    </g>`;
    if (type === 'ice') return `<g>
      <path d="M60 3v22M50 8l10 8 10-8M50 20l10-8 10 8" stroke="${c.light}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <circle cx="60" cy="14" r="2" fill="${c.accent}"/>
      <path d="M29 34l4 4-4 4M91 34l-4 4 4 4" stroke="${c.accent}" stroke-width="1.4" fill="none"/>
      <path d="M27 56l1.4 3.8 3.8 1.4-3.8 1.4L27 67l-1.4-3.8L21.8 62l3.8-1.4Z" fill="${c.light}" opacity=".8"/>
    </g>`;
    if (type === 'fighting') return `<g>
      <path d="M35 36q25-10 50 0l-2 8q-23-7-46 0Z" fill="${c.accent}" stroke="${c.deep}" stroke-width="1"/>
      <path d="M84 42c9 2 12 8 9 14-3 5-9 5-13 2" fill="${c.light}" opacity=".85" stroke="${c.deep}" stroke-width=".9"/>
      <path d="M32 72l-7 5M88 72l7 5" stroke="${c.light}" stroke-width="2" stroke-linecap="round" opacity=".65"/>
      <circle cx="60" cy="24" r="2" fill="${c.light}"/>
    </g>`;
    if (type === 'poison') return `<g>
      <circle cx="42" cy="24" r="7" fill="${c.accent}" opacity=".3" stroke="${c.light}" stroke-width="1"/>
      <circle cx="60" cy="15" r="5" fill="${c.light}" opacity=".35" stroke="${c.accent}" stroke-width="1"/>
      <circle cx="77" cy="25" r="4" fill="${c.accent}" opacity=".28" stroke="${c.light}" stroke-width="1"/>
      <path d="M39 31q6-8 12 0" stroke="${c.light}" stroke-width="2" fill="none" opacity=".8"/>
      <path d="M29 57c4-5 9-4 11 1-5 2-7 5-7 9" stroke="${c.accent}" stroke-width="1.5" fill="none" opacity=".7"/>
    </g>`;
    if (type === 'ground') return `<g>
      <path d="M30 36l13-12 12 7 10-11 14 14 11-3 2 13-31 6Z" fill="${c.accent}" opacity=".85" stroke="${c.deep}" stroke-width="1"/>
      <path d="M34 48l25-5 27 6" stroke="${c.light}" stroke-width="1.3" fill="none" opacity=".6"/>
      <circle cx="91" cy="30" r="2" fill="${c.light}"/>
    </g>`;
    if (type === 'flying') return `<g>
      <path d="M35 40c-12-10-22-6-24 4 10-1 16 3 22 9" fill="${c.light}" opacity=".55" stroke="${c.accent}" stroke-width="1.1"/>
      <path d="M85 40c12-10 22-6 24 4-10-1-16 3-22 9" fill="${c.light}" opacity=".55" stroke="${c.accent}" stroke-width="1.1"/>
      <path d="M33 24c4-6 10-6 13 0 4-5 11-5 14 1" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".7"/>
      <circle cx="94" cy="31" r="1.8" fill="${c.accent}"/>
    </g>`;
    if (type === 'psychic') return `<g>
      <ellipse cx="60" cy="19" rx="25" ry="6.5" fill="none" stroke="${c.accent}" stroke-width="1.3" transform="rotate(-14 60 19)"/>
      <ellipse cx="60" cy="19" rx="18" ry="4.5" fill="none" stroke="${c.light}" stroke-width="1" transform="rotate(22 60 19)" opacity=".8"/>
      <circle cx="60" cy="19" r="4" fill="${c.light}" opacity=".9"/>
      <circle cx="34" cy="17" r="2.3" fill="${c.accent}"/>
      <path d="M92 39l1.6 4.4 4.4 1.6-4.4 1.6L92 51l-1.6-4.4-4.4-1.6 4.4-1.6Z" fill="${c.accent}" opacity=".8"/>
    </g>`;
    if (type === 'bug') return `<g>
      <path d="M48 28C40 17 32 13 26 14c4 9 10 14 19 18M72 28c8-11 16-15 22-14-4 9-10 14-19 18" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="40" cy="24" r="2.4" fill="${c.light}"/><circle cx="80" cy="24" r="2.4" fill="${c.light}"/>
      <path d="M30 43c-7 0-10 5-9 10M90 43c7 0 10 5 9 10" stroke="${c.light}" stroke-width="1.4" fill="none" opacity=".6"/>
      <path d="M37 55c-4 4-5 8-3 12M83 55c4 4 5 8 3 12" stroke="${c.deep}" stroke-width="1.6" fill="none" opacity=".45"/>
    </g>`;
    if (type === 'rock') return `<g>
      <path d="M36 36l10-14 13 6 8-9 16 16 7-2-4 12-25 4Z" fill="${c.accent}" opacity=".9" stroke="${c.deep}" stroke-width="1.1"/>
      <path d="M38 48l22-5 23 5" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".55"/>
      <path d="M29 72l5-7 7 2M84 69l6 4 4-6" stroke="${c.light}" stroke-width="1.2" fill="none" opacity=".45"/>
    </g>`;
    if (type === 'ghost') return `<g>
      <path d="M34 31c-6-1-10 3-10 9 5 0 8 3 10 7M86 31c6-1 10 3 10 9-5 0-8 3-10 7" fill="${c.light}" opacity=".2" stroke="${c.light}" stroke-width="1" stroke-dasharray="3 4"/>
      <path d="M55 25l5-12 5 12" stroke="${c.accent}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="60" cy="15" r="3" fill="${c.light}" opacity=".75"/>
      <circle cx="29" cy="55" r="2" fill="${c.accent}" opacity=".7"/><circle cx="93" cy="47" r="1.6" fill="${c.light}" opacity=".6"/>
    </g>`;
    if (type === 'dragon') return `<g>
      <path d="M42 31c-5-8-4-16 2-21 2 7 5 11 10 14M78 31c5-8 4-16-2-21-2 7-5 11-10 14" fill="${c.accent}" stroke="${c.deep}" stroke-width="1.2"/>
      <path d="M52 25l8-8 8 8" stroke="${c.light}" stroke-width="1.5" fill="none" opacity=".7"/>
      <path d="M92 57c3 5 2 10-2 14" stroke="${c.accent}" stroke-width="1.6" fill="none" opacity=".7"/>
      <circle cx="60" cy="14" r="2" fill="${c.light}"/>
    </g>`;
    if (type === 'dark') return `<g>
      <path d="M77 13c-10 2-16 11-13 21 3 8 11 13 20 11-7 6-17 7-25 1-9-7-10-20-2-28 5-6 13-8 20-5Z" fill="${c.accent}" opacity=".85" stroke="${c.light}" stroke-width="1"/>
      <path d="M38 25l1.5 4 4 1.5-4 1.5L38 36l-1.5-4-4-1.5 4-1.5Z" fill="${c.light}" opacity=".65"/>
      <circle cx="31" cy="54" r="1.8" fill="${c.accent}" opacity=".6"/>
    </g>`;
    if (type === 'steel') return `<g>
      <circle cx="60" cy="19" r="12" fill="none" stroke="${c.light}" stroke-width="3" stroke-dasharray="5 4"/>
      <circle cx="60" cy="19" r="6" fill="${c.accent}" opacity=".5" stroke="${c.light}" stroke-width="1.2"/>
      <circle cx="60" cy="19" r="2" fill="${c.light}"/>
      <path d="M31 42l-6 4 6 5M89 42l6 4-6 5" stroke="${c.accent}" stroke-width="1.7" fill="none"/>
      <path d="M30 68h10M80 68h10" stroke="${c.light}" stroke-width="1.4" opacity=".55"/>
    </g>`;
    if (type === 'fairy') return `<g>
      <ellipse cx="30" cy="55" rx="14" ry="20" fill="${c.light}" opacity=".35" transform="rotate(-22 30 55)"/>
      <ellipse cx="90" cy="55" rx="14" ry="20" fill="${c.light}" opacity=".35" transform="rotate(22 90 55)"/>
      <path d="M60 4l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill="${c.light}" opacity=".9"/>
      <circle cx="60" cy="18" r="2" fill="${c.accent}"/>
      <path d="M28 30l1.2 3.2 3.2 1.2-3.2 1.2L28 39l-1.2-3.2L23.6 34.4l3.2-1.2Z" fill="${c.accent}"/>
    </g>`;
  }

  switch (el) {
    case 'yeallingzebra81':
      return `<g>
        <path d="M38 33c-5 11-5 28 0 44 3 9 8 12 11 6 4-8-1-29 0-42Z" fill="#ff5fbf" stroke="#2a1748" stroke-width="1.2"/>
        <path d="M82 33c5 11 5 28 0 44-3 9-8 12-11 6-4-8 1-29 0-42Z" fill="#ff5fbf" stroke="#2a1748" stroke-width="1.2"/>
        <path d="M42 32c3-11 14-18 25-18 10 0 20 6 24 17-8-2-14-5-19-10-4 6-15 10-30 11Z" fill="#ff74c4" stroke="#2a1748" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M35 38c0-14 11-25 25-25s25 11 25 25" fill="none" stroke="#5a3b8a" stroke-width="6" stroke-linecap="round"/>
        <path d="M39 35c1-12 9-20 21-20s20 8 21 20" fill="none" stroke="#4be0b0" stroke-width="2" stroke-linecap="round"/>
        <rect x="22" y="50" width="17" height="25" rx="7" fill="#5a3b8a" stroke="#2a1748" stroke-width="1.2"/>
        <rect x="81" y="50" width="17" height="25" rx="7" fill="#5a3b8a" stroke="#2a1748" stroke-width="1.2"/>
        <rect x="27" y="57" width="5" height="12" rx="2.5" fill="#4be0b0"/>
        <rect x="88" y="57" width="5" height="12" rx="2.5" fill="#4be0b0"/>
        <path d="M47 86c4-4 22-4 26 0l8 16c-14 5-28 5-42 0Z" fill="#6b4fa8" stroke="#2a1748" stroke-width="1.2"/>
        <path d="M54 88c3 5 9 5 12 0" fill="none" stroke="#4be0b0" stroke-width="3" stroke-linecap="round"/>
        <path d="M30 28c-2 4-3 8-3 12M90 28c2 4 3 8 3 12" stroke="#4be0b0" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
        <path d="M100 36l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6Z" fill="#4be0b0" opacity=".8"/>
      </g>`;
    case 'supernora':
      return `<g>
        <path d="M33 79c-10 8-14 17-13 27h80c1-11-4-20-14-27l-14-3H47Z" fill="#5b3fbf" stroke="#22154f" stroke-width="1.2"/>
        <path d="M44 84q16-5 32 0" fill="none" stroke="#ffd166" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M60 4l4.3 9.2 10.2 1.3-7.5 7.2 2 10.1-9-5.1-9 5.1 2-10.1-7.5-7.2 10.2-1.3Z" fill="#ffd166" stroke="#22154f" stroke-width="1.1" stroke-linejoin="round"/>
        <circle cx="60" cy="14" r="2.2" fill="#fff4c2"/>
        <path d="M37 32c-9 6-13 16-11 27M83 32c9 6 13 16 11 27" fill="none" stroke="#ff7ac8" stroke-width="3" stroke-linecap="round"/>
        <path d="M36 52q9-5 18 0v10q-9 4-18 0ZM66 52q9-5 18 0v10q-9 4-18 0Z" fill="none" stroke="#ffd166" stroke-width="1.8"/>
        <path d="M54 58h12M32 57l-5-3M88 57l5-3" stroke="#ffd166" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M60 95l2.2 4.8 5.2.7-3.8 3.6 1 5.1-4.6-2.6-4.6 2.6 1-5.1-3.8-3.6 5.2-.7Z" fill="#ffd166" stroke="#22154f" stroke-width=".8"/>
        <path d="M88 23c9-8 18-10 27-7-9 3-15 8-19 15" fill="#ffd166" opacity=".75"/>
        <path d="M96 14l1.7 4.7 4.7 1.7-4.7 1.7-1.7 4.7-1.7-4.7-4.7-1.7 4.7-1.7ZM21 39l1.4 3.8 3.8 1.4-3.8 1.4L21 50l-1.4-3.8L15.8 44.2l3.8-1.4Z" fill="#fff4c2"/>
      </g>`;
    case 'wildtrickyjokerwolf':
      return `<g>
        <path d="M38 35L32 8l21 13M82 35l6-27-21 13" fill="#4b2a78" stroke="#160d26" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M82 35l6-27-13 8Z" fill="#67f07a" opacity=".9"/>
        <path d="M40 27l-2-10 9 6M80 27l2-10-9 6" fill="#ff7ac8" opacity=".7"/>
        <circle cx="34" cy="8" r="3" fill="#ffd166" stroke="#160d26" stroke-width=".8"/>
        <circle cx="86" cy="8" r="3" fill="#ffd166" stroke="#160d26" stroke-width=".8"/>
        <path d="M36 42c-8 6-11 15-8 24M84 42c8 6 11 15 8 24" fill="none" stroke="#d9ffcf" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>
        <path d="M38 52q9-5 18 0v9q-9 4-18 0ZM64 52q9-5 18 0v9q-9 4-18 0Z" fill="none" stroke="#67f07a" stroke-width="1.7"/>
        <path d="M56 56h8M42 38l3 3M78 38l-3 3" stroke="#d9ffcf" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M60 39l3.2 4.5-3.2 4.5-3.2-4.5Z" fill="#67f07a" stroke="#160d26" stroke-width=".8"/>
        <path d="M44 75q16 13 32 0" fill="#160d26" stroke="#67f07a" stroke-width="2" stroke-linejoin="round"/>
        <path d="M50 78l3 5 3-4M64 79l3 4 3-5" fill="#fff4c2"/>
        <path d="M47 91q13-4 26 0l7 16q-20 6-40 0Z" fill="#4b2a78" stroke="#160d26" stroke-width="1.2"/>
        <path d="M55 92q5 4 10 0" fill="none" stroke="#67f07a" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M92 91c11-5 15-14 12-25 9 14 2 29-12 33" fill="#67f07a" stroke="#160d26" stroke-width="1.1"/>
        <path d="M102 47l1.5 4.2 4.2 1.5-4.2 1.5-1.5 4.2-1.5-4.2-4.2-1.5 4.2-1.5Z" fill="#ff7ac8"/>
      </g>`;
    case 'litladybear':
      return `<g>
        <path d="M34 41c-7-11-4-24 5-29 4 8 9 13 16 16 8-3 13-8 17-16 9 5 12 18 5 29" fill="#b51f1f" stroke="#08060a" stroke-width="1.5"/>
        <path d="M37 27c-2 5-1 10 2 14M83 27c2 5 1 10-2 14" stroke="#08060a" stroke-width="3" stroke-linecap="round"/>
        <path d="M33 36c-9 8-11 22-7 35 3-4 6-9 7-15M87 36c9 8 11 22 7 35-3-4-6-9-7-15" fill="#f7eff4" stroke="#d9c5d2" stroke-width="1"/>
        <path d="M35 40c-5 8-5 17-2 25M85 40c5 8 5 17 2 25" stroke="#ff9fc6" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
        <path d="M34 61c0-9 11-15 26-15s26 6 26 15c0 15-10 23-26 23s-26-8-26-23Z" fill="#0a0709"/>
        <path d="M43 48c3 4 4 8 4 12M77 48c-3 4-4 8-4 12M49 45c1 4 1 8 0 12M71 45c-1 4-1 8 0 12" stroke="#d92e27" stroke-width="3" stroke-linecap="round"/>
        <path d="M38 56l7 3M82 56l-7 3M42 70l6-2M78 70l-6-2" stroke="#d92e27" stroke-width="2.2" stroke-linecap="round"/>
        <ellipse cx="47" cy="62" rx="5.5" ry="5" fill="#ffe39a"/><ellipse cx="73" cy="62" rx="5.5" ry="5" fill="#ffe39a"/>
        <circle cx="47" cy="62" r="2" fill="#1b1005"/><circle cx="73" cy="62" r="2" fill="#1b1005"/>
        <circle cx="48.5" cy="60" r=".8" fill="#fff"/><circle cx="74.5" cy="60" r=".8" fill="#fff"/>
        <path d="M54 72q6-4 12 0-2 6-6 6t-6-6Z" fill="#201417"/>
        <path d="M55 78q5 3 10 0" fill="none" stroke="#f7eff4" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M49 82l-3 7 5-2 3 5 3-5 5 2-3-7" fill="#fff" stroke="#08060a" stroke-width="1"/>
        <path d="M35 88c-7 2-11 7-12 13l15-1 8-8M85 88c7 2 11 7 12 13l-15-1-8-8" fill="#159b90" stroke="#0b5e58" stroke-width="1"/>
        <rect x="38" y="91" width="44" height="9" rx="1.8" fill="#159b90" stroke="#0b5e58" stroke-width="1"/>
        <text x="60" y="97.8" text-anchor="middle" textLength="38" lengthAdjust="spacingAndGlyphs" font-family="system-ui, sans-serif" font-size="5.6" font-weight="900" fill="#fff7e1" letter-spacing=".1">LIT-LADYBEAR</text>
        <path d="M44 39c-2 4-2 8-1 11M76 39c2 4 2 8 1 11" stroke="#f7eff4" stroke-width="1.5" opacity=".9"/>
        <path d="M100 37l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6Z" fill="#ffcf5c" opacity=".9"/>
      </g>`;
    case 'hollowguide':
      return `<g>
        <circle cx="60" cy="18" r="11" fill="${c.accent}" opacity=".18"/>
        <circle cx="60" cy="18" r="7" fill="none" stroke="${c.light}" stroke-width="1.4"/>
        <path d="M60 8v4M60 24v4M48 18h4M68 18h4" stroke="${c.accent}" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M60 13l3 5-3 6-3-6Z" fill="${c.light}"/>
        <circle cx="31" cy="44" r="2" fill="${c.accent}" opacity=".75"/><circle cx="91" cy="58" r="1.6" fill="${c.light}" opacity=".7"/>
      </g>`;
    case 'summitspirit':
      return `<g>
        <path d="M34 54l13-28 7 13 6-9 10 24-18 7Z" fill="${c.light}" opacity=".28" stroke="${c.accent}" stroke-width="1.2"/>
        <path d="M60 32v-20l17 5-17 6" fill="${c.accent}" stroke="${c.light}" stroke-width="1"/>
        <circle cx="60" cy="10" r="2" fill="${c.light}"/>
        <path d="M28 59l3 8M92 59l-3 8" stroke="${c.light}" stroke-width="1.2" opacity=".5"/>
      </g>`;
    case 'atlaskeeper':
      return `<g>
        <circle cx="60" cy="18" r="12" fill="none" stroke="${c.light}" stroke-width="1.2" opacity=".8"/>
        <path d="M48 18h24M60 6c4 4 6 8 6 12s-2 8-6 12M60 6c-4 4-6 8-6 12s2 8 6 12" stroke="${c.accent}" stroke-width="1.1" fill="none"/>
        <path d="M37 34l7-4 5 6 7-3 8 5" stroke="${c.light}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>
        <circle cx="92" cy="48" r="2.2" fill="${c.accent}"/>
      </g>`;
    case 'heartkeeper':
      return `<g>
        <path d="M60 25c-5-7-15-4-15 4 0 7 15 14 15 14s15-7 15-14c0-8-10-11-15-4Z" fill="${c.accent}" opacity=".35" stroke="${c.light}" stroke-width="1.3"/>
        <path d="M60 15l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="${c.light}" opacity=".85"/>
        <circle cx="33" cy="38" r="2" fill="${c.light}" opacity=".7"/><circle cx="88" cy="31" r="1.5" fill="${c.accent}"/>
      </g>`;
    case 'shelloracle':
      return `<g>
        <path d="M61 5c12 0 21 10 21 22 0 10-7 17-15 18l-6 15-6-15c-8-1-15-8-15-18C40 15 49 5 61 5Z" fill="${c.light}" opacity=".3" stroke="${c.accent}" stroke-width="1.3"/>
        <path d="M61 15c5 3 8 6 8 11 0 4-3 7-6 8" stroke="${c.light}" stroke-width="1.4" fill="none"/>
        <path d="M53 17c-4 3-5 7-5 10 0 3 1 5 3 7" stroke="${c.accent}" stroke-width="1.1" fill="none" opacity=".8"/>
        <circle cx="61" cy="23" r="2" fill="${c.accent}"/>
      </g>`;
    case 'cheatmaster':
      return `<g>
        <path d="M36 28l8-14 8 8 8-12 8 12 8-8 8 14Z" fill="${c.light}" stroke="${c.deep}" stroke-width="1.2"/>
        <path d="M47 20h3v9h-3M57 16h3v13h-3M67 20h3v9h-3" fill="${c.accent}" opacity=".9"/>
        <rect x="26" y="34" width="9" height="4" rx="1" fill="${c.accent}" opacity=".7"/>
        <rect x="84" y="48" width="10" height="4" rx="1" fill="${c.light}" opacity=".6"/>
        <path d="M31 68l6-4M85 72l6-4" stroke="${c.accent}" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
      </g>`;
  }
  return '';
}
