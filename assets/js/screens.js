/* ============================================================
   BizChinese — Screen library (LUMI edition)
   Conversational onboarding led by the single mascot LUMI:
   greet → name → language → purpose → "start now" scenarios
   → swipe up to a traditional home (with a LUMI summon bar).
   Shared by prototype.html (interactive) and index.html (gallery).
   ============================================================ */

function statusbar(theme = "dark") {
  return `
  <div class="statusbar" style="${theme === "light" ? "color:#1A1733" : ""}">
    <span>9:41</span>
    <span class="sb-icons"><span>●●●</span><span>5G</span><span>100%</span></span>
  </div>`;
}

const ICON = {
  chev: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  back: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z"/></svg>`,
  mic: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  up: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  down: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const DEMO_STATE = { name: "Alex", lang: "en", purpose: "work", scenario: "interview", shuffle: false };

/* ============================================================
   Scenario data — "can start right now" sets, per purpose
   ============================================================ */
const SCN = {
  work: [
    { k: "interview", e: "💼", c: "violet", cn: "模拟面试", t: { en: "Job interview", zh: "模拟面试" }, s: { en: "Introduce yourself & answer “why you”", zh: "自我介绍、回答“为什么是你”" }, tags: { en: ["Interview", "Intermediate", "6 min"], zh: ["面试", "中级", "6 分钟"] } },
    { k: "standup", e: "🗣️", c: "teal", cn: "周会汇报", t: { en: "Weekly stand-up", zh: "周会进度汇报" }, s: { en: "Report progress, blockers, next steps", zh: "讲清进度、卡点和下一步" }, tags: { en: ["Report", "Intermediate", "6 min"], zh: ["汇报", "中级", "6 分钟"] } },
    { k: "hr", e: "📝", c: "coral", cn: "和 HR 聊入职", t: { en: "Onboarding with HR", zh: "和 HR 聊入职" }, s: { en: "Start date, contract, benefits", zh: "入职时间、合同、福利" }, tags: { en: ["Workplace", "Beginner", "5 min"], zh: ["职场", "初级", "5 分钟"] } },
    { k: "lunch", e: "🥡", c: "gold", cn: "午餐闲聊", t: { en: "Lunch small talk", zh: "和同事午餐闲聊" }, s: { en: "Casual chat with colleagues", zh: "和同事轻松聊几句" }, tags: { en: ["Social", "Beginner", "4 min"], zh: ["社交", "初级", "4 分钟"] } },
  ],
  clients: [
    { k: "expo", e: "🤝", c: "violet", cn: "展会产品介绍", t: { en: "Expo product pitch", zh: "展会产品介绍" }, s: { en: "Greet, pitch product, capture leads", zh: "打招呼、介绍产品、引导留资" }, tags: { en: ["Expo", "Intermediate", "6 min"], zh: ["展会", "中级", "6 分钟"] } },
    { k: "quote", e: "💰", c: "teal", cn: "给客户报价", t: { en: "Quoting a client", zh: "给客户报价" }, s: { en: "Give price, discuss qty & terms", zh: "报价、谈数量与账期" }, tags: { en: ["Negotiation", "Advanced", "8 min"], zh: ["谈判", "高级", "8 分钟"] } },
    { k: "visit", e: "🏢", c: "coral", cn: "接待来访客户", t: { en: "Hosting a client visit", zh: "接待来访客户" }, s: { en: "Welcome, tour, schedule", zh: "迎接、参观、安排行程" }, tags: { en: ["Hosting", "Intermediate", "6 min"], zh: ["接待", "中级", "6 分钟"] } },
    { k: "supplier", e: "📦", c: "gold", cn: "和供应商对货期", t: { en: "Supplier delivery sync", zh: "和供应商对货期" }, s: { en: "Confirm dates, push, plan delays", zh: "确认交期、催货、谈延期" }, tags: { en: ["Supply", "Intermediate", "7 min"], zh: ["供应链", "中级", "7 分钟"] } },
  ],
  market: [
    { k: "trip", e: "✈️", c: "violet", cn: "来中国出差", t: { en: "Business trip to China", zh: "来中国出差" }, s: { en: "Airport taxi, hotel, get receipts", zh: "打车、酒店、要发票" }, tags: { en: ["Travel", "Beginner", "5 min"], zh: ["差旅", "初级", "5 分钟"] } },
    { k: "dealer", e: "🤝", c: "teal", cn: "见经销商谈合作", t: { en: "Meeting a distributor", zh: "见经销商谈合作" }, s: { en: "Discuss partnership & terms", zh: "谈合作模式与条件" }, tags: { en: ["Partnership", "Advanced", "8 min"], zh: ["合作", "高级", "8 分钟"] } },
    { k: "research", e: "📊", c: "coral", cn: "市场调研访谈", t: { en: "Market research chat", zh: "市场调研访谈" }, s: { en: "Ask local users about needs", zh: "向本地用户了解需求" }, tags: { en: ["Research", "Intermediate", "6 min"], zh: ["调研", "中级", "6 分钟"] } },
    { k: "pitch", e: "🚀", c: "gold", cn: "路演 pitch", t: { en: "Investor pitch", zh: "路演融资 pitch" }, s: { en: "Pitch your company in 3 minutes", zh: "3 分钟讲清你的公司" }, tags: { en: ["Pitch", "Advanced", "7 min"], zh: ["路演", "高级", "7 分钟"] } },
  ],
  growth: [
    { k: "selfintro", e: "🙋", c: "violet", cn: "商务自我介绍", t: { en: "Self-introduction", zh: "商务自我介绍" }, s: { en: "Introduce yourself professionally", zh: "得体地介绍自己" }, tags: { en: ["Basics", "Beginner", "4 min"], zh: ["基础", "初级", "4 分钟"] } },
    { k: "smalltalk", e: "💬", c: "teal", cn: "商务寒暄", t: { en: "Business small talk", zh: "商务寒暄" }, s: { en: "Break the ice politely", zh: "得体地破冰寒暄" }, tags: { en: ["Social", "Beginner", "4 min"], zh: ["社交", "初级", "4 分钟"] } },
    { k: "toast", e: "🍷", c: "coral", cn: "餐桌敬酒", t: { en: "Making a toast", zh: "餐桌敬酒" }, s: { en: "Toast properly at a dinner", zh: "在饭局上得体敬酒" }, tags: { en: ["Dining", "Intermediate", "5 min"], zh: ["宴请", "中级", "5 分钟"] } },
    { k: "wechat", e: "📱", c: "gold", cn: "微信商务沟通", t: { en: "WeChat for work", zh: "微信商务沟通" }, s: { en: "Add WeChat, message a contact", zh: "加微信、得体地发消息" }, tags: { en: ["Digital", "Beginner", "4 min"], zh: ["数字", "初级", "4 分钟"] } },
  ],
};
function poolFor(s) { return SCN[s.purpose] || SCN.work; }
function scnByKey(k) {
  for (const p in SCN) { const f = SCN[p].find((x) => x.k === k); if (f) return f; }
  return SCN.work[0];
}
function tt(o, lang) { return o[lang] || o.en; }
/* scenario title; drops the Chinese suffix when it equals the localized title */
function scnLabel(o, lang) {
  const t = tt(o.t, lang);
  return t === o.cn ? t : `${t} <span style="opacity:.82;font-weight:600">· ${o.cn}</span>`;
}

/* deterministic-ish shuffle for variety */
function shuffled(arr) { return [...arr].sort(() => Math.random() - 0.5); }

/* ============================================================
   Dialogues (Chinese is the taught language; UI/coach translate)
   ============================================================ */
const DIALOGUES = {
  interview: {
    emoji: "💼", role: { en: "Interviewer", zh: "面试官" },
    goal: { en: "Introduce yourself, state a strength, ask one question back", zh: "自我介绍、说明优势、反问一个问题" },
    turns: [
      { who: "in", cn: "你好，请先简单做个自我介绍吧。", py: "Nǐ hǎo, qǐng xiān jiǎndān zuò ge zìwǒ jièshào ba.", tr: { en: "Hi, please give a short self-introduction.", zh: "你好，请先简单做个自我介绍。" } },
      { who: "out", cn: "您好，我叫 Alex，有五年市场经验，很高兴来面试。", py: "Nín hǎo, wǒ jiào Alex, yǒu wǔ nián shìchǎng jīngyàn, hěn gāoxìng lái miànshì.", tr: { en: "Hello, I'm Alex, I have 5 years of marketing experience. Glad to be here.", zh: "您好，我叫 Alex，有五年市场经验，很高兴来面试。" }, score: 96 },
      { who: "in", cn: "很好。你为什么想加入我们公司？", py: "Hěn hǎo. Nǐ wèishéme xiǎng jiārù wǒmen gōngsī?", tr: { en: "Great. Why do you want to join our company?", zh: "很好。你为什么想加入我们公司？" } },
    ],
    coach: { en: "Tip: finish with a question like “团队多大？” to show real interest.", zh: "小提示：可以反问一句“团队多大？”，显得更有兴趣。" },
    suggest: ["因为贵司产品很棒。", "我带过 8 人团队。", "团队大概多少人？"],
  },
  expo: {
    emoji: "🤝", role: { en: "Booth visitor", zh: "展位客户" },
    goal: { en: "Greet, give a one-line pitch, invite to leave contact", zh: "打招呼、一句话介绍、邀请留联系方式" },
    turns: [
      { who: "in", cn: "你好，你们这个产品是做什么的？", py: "Nǐ hǎo, nǐmen zhège chǎnpǐn shì zuò shénme de?", tr: { en: "Hi, what does your product do?", zh: "你好，你们这个产品是做什么的？" } },
      { who: "out", cn: "您好，我们帮工厂降低 30% 的能耗，欢迎了解一下。", py: "Nín hǎo, wǒmen bāng gōngchǎng jiàngdī bǎifēnzhī sānshí de nénghào.", tr: { en: "Hello, we help factories cut energy use by 30%. Take a look!", zh: "您好，我们帮工厂降低 30% 的能耗，欢迎了解一下。" }, score: 94 },
      { who: "in", cn: "听起来不错，有资料吗？", py: "Tīng qǐlái búcuò, yǒu zīliào ma?", tr: { en: "Sounds good, do you have a brochure?", zh: "听起来不错，有资料吗？" } },
    ],
    coach: { en: "Tip: offer your WeChat — “加个微信，我发您资料” is very natural here.", zh: "小提示：可以说“加个微信，我发您资料”，特别自然。" },
    suggest: ["加个微信，我发您资料。", "这是我的名片。", "您贵姓？" ],
  },
  trip: {
    emoji: "🚕", role: { en: "Taxi driver", zh: "出租车司机" },
    goal: { en: "State your destination, ask for the highway, get a receipt", zh: "说清目的地、要求走高速、索取发票" },
    turns: [
      { who: "in", cn: "您好，去哪儿？", py: "Nín hǎo, qù nǎr?", tr: { en: "Hello, where to?", zh: "您好，去哪儿？" } },
      { who: "out", cn: "去国贸大酒店，麻烦走高速。", py: "Qù Guómào Dàjiǔdiàn, máfan zǒu gāosù.", tr: { en: "To Guomao Hotel, please take the highway.", zh: "去国贸大酒店，麻烦走高速。" }, score: 96 },
      { who: "in", cn: "好的，大概四十分钟。", py: "Hǎo de, dàgài sìshí fēnzhōng.", tr: { en: "Sure, about 40 minutes.", zh: "好的，大概四十分钟。" } },
    ],
    coach: { en: "Tip: at the end say “帮我开张发票” to get a receipt for expenses.", zh: "小提示：到了说“帮我开张发票”，报销要用到。" },
    suggest: ["帮我开张发票。", "大概多少钱？", "可以手机支付吗？"],
  },
};
function dialogueFor(s) {
  if (DIALOGUES[s.scenario]) return DIALOGUES[s.scenario];
  // map by purpose to a sensible default
  const byPurpose = { work: "interview", clients: "expo", market: "trip", growth: "interview" };
  return DIALOGUES[byPurpose[s.purpose] || "interview"];
}

/* ============================================================
   Reusable bits
   ============================================================ */
function lumiHead(size = 56) {
  return `<div class="assistant-avatar" style="width:${size}px;height:${size}px">${lumiSVG("happy")}</div>`;
}
function tabbar(active, d) {
  // AI/LUMI is the first, always-accented tab so the assistant stays prominent
  return `<div class="tabbar tabbar--4">
    <div class="tabbar__item tabbar__item--ai ${active === "ai" ? "on" : ""}" data-go="assistant">
      <span class="tabbar__lumi">${lumiSVG("happy")}</span>${d.tabs.ai}</div>
    <div class="tabbar__item ${active === "home" ? "on" : ""}" data-go="home"><span class="ic">🏠</span>${d.tabs.learn}</div>
    <div class="tabbar__item ${active === "scn" ? "on" : ""}" data-go="library"><span class="ic">🧭</span>${d.tabs.scn}</div>
    <div class="tabbar__item ${active === "me" ? "on" : ""}" data-go="profile"><span class="ic">👤</span>${d.tabs.me}</div>
  </div>`;
}
/* ---- quick-start tiles + popular cards for the home ---- */
const QUICK = [
  { k: "trip", e: "🧳", t: { en: "Business trip", zh: "来中国出差" } },
  { k: "interview", e: "💼", t: { en: "Interview", zh: "模拟面试" } },
  { k: "expo", e: "📊", t: { en: "Exhibition", zh: "展会介绍" } },
  { k: "standup", e: "🗣️", t: { en: "Report", zh: "周会汇报" } },
];
const POPULAR = [
  { k: "interview", e: "💼", g: 1, cn: "面试自我介绍", t: { en: "Interview self-intro", zh: "面试自我介绍" }, learners: "36,364" },
  { k: "standup", e: "📈", g: 2, cn: "专业术语速成", t: { en: "Industry jargon", zh: "专业术语速成" }, learners: "28,940" },
  { k: "expo", e: "🤝", g: 3, cn: "展会接待客户", t: { en: "Hosting clients at expo", zh: "展会接待客户" }, learners: "19,205" },
  { k: "quote", e: "💰", g: 4, cn: "商务报价谈判", t: { en: "Quote & negotiate", zh: "商务报价谈判" }, learners: "24,118" },
  { k: "toast", e: "🍷", g: 5, cn: "餐桌敬酒", t: { en: "Toast at a dinner", zh: "餐桌敬酒" }, learners: "15,402" },
  { k: "wechat", e: "📱", g: 6, cn: "微信商务沟通", t: { en: "WeChat for work", zh: "微信商务沟通" }, learners: "31,277" },
];

/* ============================================================
   1 · WELCOME — LUMI greets + self-intro (pre-language, English)
   ============================================================ */
function scrWelcome() {
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="screen__body" style="display:flex;flex-direction:column;align-items:center;text-align:center">
      <div class="eyebrow" style="margin-top:6px">BizChinese · 商务汉语</div>
      <div class="lumi-hero">${lumiSVG("happy")}</div>
      <h1 class="h1" style="margin-top:2px">Hi! 你好! こんにちは! 👋</h1>
      <p class="sub">I'm <b style="color:#fff">LUMI</b>, your AI buddy for Business&nbsp;Chinese.<br>
      I'll help you handle real work conversations in China — one scenario at a time, no pressure.</p>
      <div class="speech speech--lg" style="margin-top:22px;border-radius:20px 20px 6px 20px">
        Ready? Let's get to know each other first 💜
      </div>
    </div>
    <div class="screen__footer">
      <button class="btn" data-go="ask_name">Say hi to LUMI</button>
    </div>
  </section>`;
}

/* ============================================================
   2 · ASK NAME — chat, LUMI asks your name (backend records)
   ============================================================ */
function scrAskName(s) {
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="screen__body">
      <div class="steps" style="margin-top:4px"><i class="on"></i><i></i><i></i></div>
      <p class="muted" style="margin-top:14px">Step 1 of 3</p>

      <div class="assistant-row" style="margin-top:8px">
        ${lumiHead(56)}
        <div class="speech speech--lg">First things first —<br>what should I call you? 😊</div>
      </div>

      <div class="name-field">
        <input id="nameInput" class="name-input" type="text" placeholder="Type your name…" value="${s.name && s.name !== "Alex" ? s.name : ""}" autocomplete="off" />
      </div>
      <div class="chip-row">
        <button class="namechip" data-name="Alex">Alex</button>
        <button class="namechip" data-name="Maria">Maria</button>
        <button class="namechip" data-name="Kenji">Kenji</button>
      </div>
      <p class="muted" style="margin-top:14px">🔒 Saved to your profile so LUMI can greet you by name.</p>
    </div>
    <div class="screen__footer">
      <button class="btn" id="nameContinue" data-go="ask_language">Continue</button>
    </div>
  </section>`;
}

/* ============================================================
   3 · ASK LANGUAGE — chat, choose UI language (pre-selection)
   ============================================================ */
function scrAskLanguage(s) {
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="screen__body">
      <div class="steps" style="margin-top:4px"><i class="on"></i><i class="on"></i><i></i></div>
      <p class="muted" style="margin-top:14px">Step 2 of 3</p>

      <div class="assistant-row" style="margin-top:8px">
        ${lumiHead(56)}
        <div class="speech speech--lg">Nice to meet you${s.name ? ", " + s.name : ""}!<br>Which language should I explain things in?</div>
      </div>

      <div class="lang-grid">
        ${LANGS.map((l) => `
        <button class="lang-card ${s.lang === l.k ? "is-selected" : ""}" data-lang="${l.k}" data-go="ask_purpose">
          <span class="lang-flag">${l.flag}</span><b>${l.label}</b>
        </button>`).join("")}
      </div>
      <p class="muted" style="margin-top:16px">From here on, LUMI will talk to you in this language. The Chinese you practice stays Chinese 🀄</p>
    </div>
  </section>`;
}

/* ============================================================
   4 · ASK PURPOSE — chat (now in chosen language)
   ============================================================ */
function scrAskPurpose(s) {
  const d = L(s);
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="screen__body">
      <div class="steps" style="margin-top:4px"><i class="on"></i><i class="on"></i><i class="on"></i></div>
      <p class="muted" style="margin-top:14px">${d.step(3, 3)}</p>

      <div class="assistant-row" style="margin-top:8px">
        ${lumiHead(56)}
        <div class="speech speech--lg">${d.purposeQ(s.name || "friend")}</div>
      </div>

      <div class="bubbles">
        ${d.purposes.map((p) => `
        <button class="bubble ${s.purpose === p.k ? "is-selected" : ""}" data-purpose="${p.k}" data-go="recommend">
          <span class="bubble__icon">${p.e}</span>
          <span class="bubble__txt"><b>${p.t}</b><span>${p.d}</span></span>
          <span class="bubble__chev">${ICON.chev}</span>
        </button>`).join("")}
      </div>
    </div>
  </section>`;
}

/* ============================================================
   5 · RECOMMEND — "start now" scenarios + swipe-up to home
   ============================================================ */
function scrRecommend(s) {
  const d = L(s);
  let list = poolFor(s);
  list = (s.shuffle ? shuffled(list) : list).slice(0, 3);
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="screen__body" style="padding-bottom:96px">
      <div class="assistant-row" style="margin-top:8px">
        ${lumiHead(56)}
        <div class="speech speech--lg">${d.recIntro}</div>
      </div>

      <div style="display:flex;justify-content:flex-end;margin-top:14px">
        <button class="pill-btn" data-shuffle>🎲 ${d.recShuffle}</button>
      </div>

      <div class="scn-list" style="margin-top:8px">
        ${list.map((o) => `
        <div class="scn-card scn-card--${o.c}" data-scenario="${o.k}" data-go="chat">
          <div class="scn-card__top">
            <span class="scn-card__emoji">${o.e}</span>
            <div><h3>${scnLabel(o, s.lang)}</h3>
            <div class="scn-card__sub">${tt(o.s, s.lang)}</div></div>
          </div>
          <div class="scn-card__meta">${tt(o.tags, s.lang).map((t) => `<span class="chip">${t}</span>`).join("")}
            <span class="chip chip--go">▶ ${d.startLabel}</span></div>
          <div class="scn-card__cta">${ICON.chev}</div>
        </div>`).join("")}
      </div>
    </div>

    <!-- swipe up handle -> traditional home -->
    <button class="swipe-up" data-go="home">
      <span class="swipe-up__bar"></span>
      ${ICON.up}
      <span>${d.recSwipe}</span>
    </button>
  </section>`;
}

/* ============================================================
   6 · CHAT — scenario conversation
   ============================================================ */
function scrChat(s) {
  const d = L(s);
  const dia = dialogueFor(s);
  const scn = scnByKey(s.scenario);
  const turns = dia.turns.map((m) => {
    if (m.who === "in") {
      return `
      <div class="msg msg--in">
        <div class="msg__avatar">${lumiSVG("happy")}</div>
        <div class="bubble-chat">
          <div class="pinyin">${m.py}</div>${m.cn}
          <div class="trans">${tt(m.tr, s.lang)}</div>
        </div>
      </div>`;
    }
    return `
      <div class="msg msg--out">
        <div class="bubble-chat">
          <div class="pinyin">${m.py}</div>${m.cn}
          <div class="trans">${tt(m.tr, s.lang)}</div>
          ${m.score ? `<div class="msg__score">${ICON.star} ${d.sumPron} ${m.score}</div>` : ""}
        </div>
      </div>`;
  }).join("");

  return `
  <section class="screen chat screen--light">
    ${statusbar("light")}
    <div class="chat__nav">
      <button class="iconbtn" data-go="recommend">${ICON.back}</button>
      <div class="chat__title"><b>${tt(scn.t, s.lang)}</b><br><span>${d.chatRole} · ${scn.cn}</span></div>
      <span class="chat__role-tag">${dia.emoji} ${tt(dia.role, s.lang)}</span>
    </div>

    <div class="chat__body">
      <div class="coach">🎯 <b>${d.chatGoal}</b>: ${tt(dia.goal, s.lang)}</div>
      ${turns}
      <div class="coach">💡 <b>${d.coachName}</b>: ${tt(dia.coach, s.lang)}</div>
    </div>

    <div class="chat__foot">
      <div class="suggest">
        ${dia.suggest.map((x) => `<button data-suggest>${x}</button>`).join("")}
      </div>
      <div class="chat__inputbar">
        <div class="field">${d.chatField}</div>
        <div class="mic" data-go="summary">${ICON.mic}</div>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   7 · SUMMARY
   ============================================================ */
function scrSummary(s) {
  const d = L(s);
  const scn = scnByKey(s.scenario);
  return `
  <section class="screen screen--light">
    <div class="screen__bg" style="background:radial-gradient(100% 60% at 50% 0%, rgba(46,213,154,.18), transparent 60%), var(--paper)"></div>
    ${statusbar("light")}
    <div class="screen__body" style="text-align:center">
      <div style="font-size:60px;margin-top:14px">🎉</div>
      <h1 class="h1" style="color:var(--ink);margin-bottom:4px">${d.sumTitle}</h1>
      <p class="sub">${tt(scn.t, s.lang)} · ${scn.cn} · ${d.sumTime} 4:20</p>

      <div class="stat-row" style="margin-top:20px">
        <div class="stat"><b>96</b><span>${d.sumPron}</span></div>
        <div class="stat"><b>A</b><span>${d.sumManner}</span></div>
        <div class="stat"><b>+35</b><span>${d.sumXp}</span></div>
      </div>

      <div class="glass" style="background:#fff;border:1px solid var(--line);border-radius:var(--r-lg);padding:16px;margin-top:18px;text-align:left;box-shadow:var(--shadow-sm)">
        <b style="color:var(--ink)">${d.sumUnlock}</b>
        <div class="path__tagrow" style="margin-top:10px">
          <span class="tag-s">麻烦走高速</span><span class="tag-s">帮我开张发票</span>
          <span class="tag-s">加个微信</span><span class="tag-s">大概多久</span>
        </div>
      </div>

      <div class="glass" style="background:linear-gradient(135deg,rgba(109,94,248,.1),rgba(255,111,181,.1));border:1px dashed rgba(154,79,240,.4);border-radius:var(--r-lg);padding:14px 16px;margin-top:14px;text-align:left;display:flex;gap:10px;align-items:center">
        <div class="assistant-avatar" style="width:42px;height:42px;flex:none">${lumiSVG("wink")}</div>
        <span style="font-size:13px;color:var(--ink-2);line-height:1.55">${d.sumAdvice(s.name || "friend")}</span>
      </div>
    </div>
    <div class="screen__footer">
      <button class="btn" data-go="home">${d.sumCta}</button>
    </div>
  </section>`;
}

/* ============================================================
   8 · HOME — traditional home; AI (LUMI) made prominent:
        big summon hero on top + always-on-call floating button.
   ============================================================ */
function scrHome(s) {
  const d = L(s);
  const focus = d.purposes.find((p) => p.k === s.purpose) || d.purposes[0];
  return `
  <section class="screen screen--light" data-home>
    <div class="screen__bg" style="background:radial-gradient(130% 42% at 50% 0%, rgba(154,79,240,.16), transparent 55%), var(--paper)"></div>
    ${statusbar("light")}

    <!-- pull DOWN handle: drag down (or tap) to reveal LUMI chat -->
    <div class="pull-down" data-pullopen role="button" tabindex="0">
      <span class="pull-down__pill">
        <span class="pull-down__face">${lumiSVG("happy")}</span>
        ${d.pullDown}
        ${ICON.down}
      </span>
      <span class="pull-down__bar"></span>
    </div>

    <div class="home-head">
      <div>
        <div class="home-head__hi">${d.hi(s.name || "friend")}</div>
        <div class="home-head__focus">${focus.e} ${focus.t} <span class="caret">⌄</span></div>
      </div>
      <div class="home-head__bell">🔔</div>
    </div>

    <div class="screen__body" style="padding-top:2px;padding-bottom:120px">

      <!-- ★ prominent AI summon hero (re-awaken LUMI) -->
      <button class="summon-hero" data-go="assistant">
        <span class="summon-hero__char">${lumiSVG("think")}</span>
        <span class="summon-hero__bubble">
          <span class="summon-hero__q">${d.summonQ}</span>
          <span class="go-round">${ICON.chev}</span>
        </span>
      </button>

      <!-- quick-start tiles -->
      <div class="quick-card">
        ${QUICK.map((q) => `
        <button class="quick-tile" data-scenario="${q.k}" data-go="chat">
          <b>${tt(q.t, s.lang)}</b>
          <span class="quick-tile__ic">${q.e}<span class="quick-tile__spark">✦</span></span>
        </button>`).join("")}
      </div>

      <!-- popular scenarios in your field -->
      <div class="sec-title" style="margin-top:20px"><b>${d.popTitle}</b></div>
      <div class="pop-grid">
        ${POPULAR.map((p) => `
        <div class="pop-card" data-scenario="${p.k}" data-go="chat">
          <div class="pop-thumb pop-thumb--g${p.g}"><span>${p.e}</span></div>
          <b>${tt(p.t, s.lang)}</b>
          <span class="learners"><i class="learn-dot"></i>${d.learners(p.learners)}</span>
        </div>`).join("")}
      </div>
    </div>

    ${tabbar("home", d)}

    <!-- pull-down chat sheet (slides from the top) -->
    <div class="pull-dim" data-dim></div>
    <div class="pull-sheet screen chat screen--light" data-sheet>
      ${assistantInner(s, true)}
    </div>
  </section>`;
}

/* ============================================================
   9 · ASSISTANT — summoned LUMI chat
   ============================================================ */
/* shared assistant chat body (reused by full screen + pull-down sheet) */
function assistantInner(s, inSheet) {
  const d = L(s);
  const grip = inSheet ? `<div class="pull-sheet__grip" data-sheetgrip></div>` : "";
  const back = inSheet
    ? `<button class="iconbtn" data-pullclose aria-label="close">${ICON.up}</button>`
    : `<button class="iconbtn" data-go="home">${ICON.back}</button>`;
  return `
    ${grip}
    ${statusbar("light")}
    <div class="chat__nav">
      ${back}
      <div class="chat__title"><b>${d.asstTitle}</b><br><span>● online</span></div>
      <span class="chat__role-tag">✨ AI</span>
    </div>
    <div class="chat__body">
      <div class="msg msg--in">
        <div class="msg__avatar">${lumiSVG("happy")}</div>
        <div class="bubble-chat">${d.asstHello(s.name || "friend")}</div>
      </div>
      <div class="asst-prompts">
        ${d.asstPrompts.map((p, i) => `<button class="asst-prompt" data-go="${i === 0 ? "recommend" : "chat"}">${p}</button>`).join("")}
      </div>
    </div>
    <div class="chat__foot">
      <div class="chat__inputbar">
        <div class="field">${d.asstField}</div>
        <div class="mic" data-go="recommend">${ICON.mic}</div>
      </div>
    </div>`;
}
function scrAssistant(s) {
  return `<section class="screen chat screen--light">${assistantInner(s, false)}</section>`;
}

/* ============================================================
   10 · LIBRARY
   ============================================================ */
function scrLibrary(s) {
  const d = L(s);
  const bg = ["var(--grad-ai)", "var(--grad-teal)", "var(--grad-coral)", "var(--grad-gold)", "linear-gradient(135deg,#8E7CFF,#5B7CFF)", "linear-gradient(135deg,#FF9F6E,#FF5C7A)"];
  let hot = shuffled(poolFor(s)).slice(0, 2);
  return `
  <section class="screen screen--light">
    <div class="screen__bg" style="background:var(--paper)"></div>
    ${statusbar("light")}
    <div class="app-head"><div class="app-head__hi"><b style="font-size:21px">${d.libTitle}</b><br><span>${d.libSub}</span></div></div>
    <div class="screen__body" style="padding-top:4px">
      <div class="searchbar">🔍 ${d.libSearch}</div>

      <div class="sec-title" style="margin-top:18px"><b>${d.libCats}</b></div>
      <div class="cat-grid">
        ${d.cats.map((c, i) => `
        <div class="cat-card" style="background:${bg[i]};${i === 3 ? "color:#4a2c00" : ""}" data-go="recommend">
          <span class="e">${c.e}</span>
          <div><b>${c.t}</b><br><small>${c.n}</small></div>
        </div>`).join("")}
      </div>

      <div class="sec-title"><b>${d.libForYou}</b><a data-go="library">${d.libSwap}</a></div>
      <div class="scn-list">
        ${hot.map((o) => `
        <div class="scn-card scn-card--${o.c}" data-scenario="${o.k}" data-go="chat">
          <div class="scn-card__top">
            <span class="scn-card__emoji">${o.e}</span>
            <div><h3>${scnLabel(o, s.lang)}</h3><div class="scn-card__sub">${tt(o.s, s.lang)}</div></div>
          </div>
          <div class="scn-card__meta">${tt(o.tags, s.lang).map((t) => `<span class="chip">${t}</span>`).join("")}</div>
          <div class="scn-card__cta">${ICON.chev}</div>
        </div>`).join("")}
      </div>
    </div>
    ${tabbar("scn", d)}
  </section>`;
}

/* ============================================================
   11 · PROFILE
   ============================================================ */
function scrProfile(s) {
  const d = L(s);
  return `
  <section class="screen screen--light">
    <div class="screen__bg" style="background:radial-gradient(120% 40% at 50% 0%, rgba(154,79,240,.18), transparent 55%), var(--paper)"></div>
    ${statusbar("light")}
    <div class="profile-hero">
      <div class="profile-hero__avatar" style="border:none;background:transparent;box-shadow:none">${lumiSVG("happy")}</div>
      <h2>${s.name || "Alex"}</h2>
      <p>${d.profSub(s.name)}</p>
      <span class="level-pill">${d.profLevel}</span>
    </div>
    <div class="screen__body" style="padding-top:6px">
      <div class="stat-row">
        <div class="stat"><b>7</b><span>${d.stStreak}</span></div>
        <div class="stat"><b>23</b><span>${d.stCleared}</span></div>
        <div class="stat"><b>1.2k</b><span>${d.stXp}</span></div>
      </div>

      <div class="sec-title"><b>${d.skillsTitle}</b></div>
      <div class="list-card" style="padding:16px">
        ${d.skills.map((sk, i) => `
        <div class="skill" style="margin-top:${i === 0 ? 0 : 14}px">
          <div class="skill__head"><span>${sk.t}</span><span>${sk.v}%</span></div>
          <div class="skill__bar"><div class="skill__fill" style="width:${sk.v}%"></div></div>
        </div>`).join("")}
      </div>

      <div class="sec-title"><b>${d.achTitle}</b><a>${d.all}</a></div>
      <div class="ach-row">
        <div class="ach"><span class="e">🔥</span><small>7</small></div>
        <div class="ach"><span class="e">🚕</span><small>✈️</small></div>
        <div class="ach"><span class="e">🎤</span><small>95+</small></div>
        <div class="ach locked"><span class="e">🏆</span><small>—</small></div>
      </div>

      <div class="list-card">
        ${d.settings.map((it) => `<div class="list-item"><span class="ic">${it.ic}</span> ${it.t} <span class="chev">${ICON.chev}</span></div>`).join("")}
      </div>
    </div>
    ${tabbar("me", d)}
  </section>`;
}

/* ============================================================
   Registry
   ============================================================ */
const SCREENS = [
  { id: "welcome",     group: "首次进入 · Onboarding", title: "LUMI 登场 · 自我介绍", desc: "果冻小人 LUMI 出现，打招呼 + 自我介绍。", render: scrWelcome },
  { id: "ask_name",    group: "首次进入 · Onboarding", title: "聊天 · 问名字", desc: "进入聊天环节，LUMI 询问用户名字（后端记录）。", render: scrAskName },
  { id: "ask_language",group: "首次进入 · Onboarding", title: "聊天 · 选学习语言", desc: "选择讲解语言并记录，后续提问都用该语言。", render: scrAskLanguage },
  { id: "ask_purpose", group: "首次进入 · Onboarding", title: "聊天 · 学习目的", desc: "在华工作 / 对接客户供应商 / 进入市场 / 个人发展。", render: scrAskPurpose },
  { id: "recommend",   group: "首次进入 · Onboarding", title: "可直接开始的场景", desc: "按目的随机推可直接开练的场景，底部上划查看更多。", render: scrRecommend },
  { id: "chat",        group: "核心体验 · Practice", title: "场景对话", desc: "点击场景直接开练：AI 角色扮演 + 拼音/翻译 + 打分。", render: scrChat },
  { id: "summary",     group: "核心体验 · Practice", title: "通关结算", desc: "评分、解锁表达与 LUMI 的下一步建议。", render: scrSummary },
  { id: "home",        group: "主应用 · App", title: "传统首页 · LUMI 随时召唤", desc: "上划进入的首页：顶部大召唤条 + 悬浮按钮 + 底部首位 Tab，LUMI 全程突出、随时唤起。", render: scrHome },
  { id: "assistant",   group: "主应用 · App", title: "召唤 LUMI 对话", desc: "点击召唤入口，与 LUMI 开启对话（快捷指令）。", render: scrAssistant },
  { id: "library",     group: "主应用 · App", title: "场景库", desc: "按场景分类浏览、搜索、推荐。", render: scrLibrary },
  { id: "profile",     group: "主应用 · App", title: "我的", desc: "等级、能力雷达、成就与设置。", render: scrProfile },
];

const SCREEN_MAP = Object.fromEntries(SCREENS.map((x) => [x.id, x]));
