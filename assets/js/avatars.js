/* ============================================================
   BizChinese — LUMI mascot
   A single jelly/blob IP character (Pop Mart "yuki"-style,
   NON human-shaped). Translucent, glowing, squishy & cute.
   Used everywhere as the one AI buddy.
   ============================================================ */

const LUMI = {
  name: "LUMI",
  blurb: "你的商务汉语 AI 小伙伴",
};

/* mood: "happy" (default) | "wink" | "think" */
function lumiSVG(mood = "happy") {
  const eyeL =
    mood === "wink"
      ? `<path d="M71 104q9 -8 18 0" stroke="#3a2b5c" stroke-width="5" fill="none" stroke-linecap="round"/>`
      : `<ellipse cx="80" cy="104" rx="9" ry="12" fill="#3a2b5c"/><circle cx="83.5" cy="99" r="3" fill="#fff"/>`;
  const mouth =
    mood === "think"
      ? `<circle cx="100" cy="123" r="5" fill="#3a2b5c"/>`
      : `<path d="M90 119 q10 11 20 0" stroke="#3a2b5c" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;

  return `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="LUMI">
  <defs>
    <radialGradient id="lumiBody" cx="42%" cy="32%" r="78%">
      <stop offset="0" stop-color="#D7FBFF"/>
      <stop offset="36%" stop-color="#8FD8FF"/>
      <stop offset="68%" stop-color="#A98BFF"/>
      <stop offset="100%" stop-color="#F08CDC"/>
    </radialGradient>
    <linearGradient id="lumiGloss" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".95"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="lumiGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#A98BFF" stop-opacity=".6"/>
      <stop offset="100%" stop-color="#A98BFF" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="100" cy="168" rx="50" ry="11" fill="#1a0f33" opacity=".18"/>
  <circle cx="100" cy="100" r="94" fill="url(#lumiGlow)"/>

  <!-- antenna / light -->
  <path d="M104 40 q6 -16 18 -22" stroke="#A98BFF" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="124" cy="15" r="9" fill="#FFE08A"/>
  <circle cx="124" cy="15" r="16" fill="url(#lumiGlow)"/>

  <!-- jelly body -->
  <path d="M26 106 C26 58 58 34 100 34 C142 34 174 58 174 106 C174 144 148 164 100 164 C52 164 26 144 26 106 Z"
        fill="url(#lumiBody)" fill-opacity="0.93" stroke="#ffffff" stroke-opacity=".55" stroke-width="2"/>

  <!-- translucent inner core + gloss -->
  <ellipse cx="94" cy="96" rx="60" ry="56" fill="#ffffff" opacity=".10"/>
  <ellipse cx="74" cy="66" rx="27" ry="18" fill="url(#lumiGloss)" opacity=".85" transform="rotate(-18 74 66)"/>
  <circle cx="132" cy="60" r="7" fill="#fff" opacity=".55"/>

  <!-- feet nubs -->
  <ellipse cx="78" cy="162" rx="13" ry="8" fill="url(#lumiBody)" fill-opacity=".93"/>
  <ellipse cx="122" cy="162" rx="13" ry="8" fill="url(#lumiBody)" fill-opacity=".93"/>

  <!-- face -->
  ${eyeL}
  <ellipse cx="120" cy="104" rx="9" ry="12" fill="#3a2b5c"/>
  <circle cx="123.5" cy="99" r="3" fill="#fff"/>
  <ellipse cx="63" cy="121" rx="9" ry="6" fill="#FF8FC4" opacity=".55"/>
  <ellipse cx="137" cy="121" rx="9" ry="6" fill="#FF8FC4" opacity=".55"/>
  ${mouth}

  <!-- sparkles -->
  <path d="M152 92 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="#fff" opacity=".9"/>
  <circle cx="44" cy="70" r="3.2" fill="#fff" opacity=".8"/>
</svg>`;
}
