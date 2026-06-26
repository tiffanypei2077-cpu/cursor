/* ============================================================
   BizChinese — SVG avatar mascots
   Two AI helper characters the user picks from on first launch.
   · 小语 Yuyu  — warm, patient coach (teal/green)
   · 阿龙 Along — energetic, business-savvy buddy (gold/coral)
   ============================================================ */

const AVATARS = {
  yuyu: {
    id: "yuyu",
    name: "小语",
    pinyin: "Yuyu",
    tag: "耐心陪练",
    blurb: "温柔耐心，陪你慢慢练，从不催你。",
    svg: `
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="小语">
  <defs>
    <linearGradient id="yuyuBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#34E0C4"/><stop offset="1" stop-color="#19A7CE"/>
    </linearGradient>
    <linearGradient id="yuyuHair" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3A2D5C"/><stop offset="1" stop-color="#241B3D"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="28" fill="url(#yuyuBg)"/>
  <circle cx="60" cy="56" r="40" fill="#FFE3CB"/>
  <path d="M22 54c0-26 18-40 38-40s38 14 38 40c0 6-3 10-6 10 0-18-12-26-22-26-6 6-26 6-32 0-6 4-10 12-10 26-3 0-6-4-6-10z" fill="url(#yuyuHair)"/>
  <circle cx="46" cy="58" r="5.2" fill="#2A2140"/>
  <circle cx="74" cy="58" r="5.2" fill="#2A2140"/>
  <circle cx="47.6" cy="56.2" r="1.7" fill="#fff"/>
  <circle cx="75.6" cy="56.2" r="1.7" fill="#fff"/>
  <ellipse cx="40" cy="68" rx="6" ry="4" fill="#FFB4A0" opacity="0.7"/>
  <ellipse cx="80" cy="68" rx="6" ry="4" fill="#FFB4A0" opacity="0.7"/>
  <path d="M52 70q8 7 16 0" stroke="#C2553F" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- headset (assistant) -->
  <path d="M26 56a34 34 0 0 1 68 0" stroke="#19A7CE" stroke-width="4" fill="none"/>
  <rect x="20" y="54" width="9" height="16" rx="4" fill="#127a93"/>
  <rect x="91" y="54" width="9" height="16" rx="4" fill="#127a93"/>
  <path d="M91 70c0 8-6 12-12 12" stroke="#127a93" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="79" cy="84" r="3.4" fill="#127a93"/>
</svg>`,
  },

  along: {
    id: "along",
    name: "阿龙",
    pinyin: "Along",
    tag: "实战搭子",
    blurb: "干练直接，带你冲商务实战，效率拉满。",
    svg: `
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="阿龙">
  <defs>
    <linearGradient id="alongBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFD479"/><stop offset="1" stop-color="#FF7A59"/>
    </linearGradient>
    <linearGradient id="alongHair" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2C2030"/><stop offset="1" stop-color="#1A1220"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="28" fill="url(#alongBg)"/>
  <circle cx="60" cy="56" r="40" fill="#FFD9B8"/>
  <path d="M24 50c2-22 18-36 36-36s34 14 36 36c1 8-4 14-4 14-2-12-6-18-10-20-2 6-6 8-10 8 2-4 0-8-2-10-4 8-14 12-26 12-6 0-12-2-14-6-2 4-2 10-2 16 0 0-4-6-4-14z" fill="url(#alongHair)"/>
  <circle cx="46" cy="58" r="5.2" fill="#2A1A12"/>
  <circle cx="74" cy="58" r="5.2" fill="#2A1A12"/>
  <circle cx="47.8" cy="56.2" r="1.7" fill="#fff"/>
  <circle cx="75.8" cy="56.2" r="1.7" fill="#fff"/>
  <path d="M40 50q6 -4 12 0" stroke="#2C2030" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M68 50q6 -4 12 0" stroke="#2C2030" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="40" cy="68" rx="5.5" ry="3.6" fill="#FF9E7A" opacity="0.6"/>
  <ellipse cx="80" cy="68" rx="5.5" ry="3.6" fill="#FF9E7A" opacity="0.6"/>
  <path d="M50 72q10 8 20 0" stroke="#B5462E" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <!-- collar / suit hint -->
  <path d="M30 120v-8c0-6 12-10 30-10s30 4 30 10v8z" fill="#3A3550"/>
  <path d="M52 102l8 10 8-10-8-4z" fill="#FF5C7A"/>
</svg>`,
  },
};

function avatarSVG(id) {
  const a = AVATARS[id] || AVATARS.yuyu;
  return a.svg;
}
