/* ============================================================
   BizChinese — Screen library
   Every screen is a render(state) -> HTML string function.
   Shared by the interactive prototype (prototype.html) and the
   overview gallery (index.html), so markup stays DRY.
   ============================================================ */

/* ---------- small helpers ---------- */
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
};

/* state defaults used by gallery so screens look populated */
const DEMO_STATE = {
  avatar: "yuyu",
  branch: "new",
  pain: "travel",
  industry: "manufacturing",
  scenario: "taxi",
};

/* ============================================================
   1 · WELCOME — two mascots introduce themselves + pick one
   ============================================================ */
function scrWelcome(s) {
  const sel = s.avatar;
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="screen__body" style="display:flex;flex-direction:column">
      <div style="margin-top:6px">
        <div class="eyebrow">BizChinese · 商务汉语</div>
        <h1 class="h1">欢迎来到 BizChinese 👋</h1>
        <p class="sub">请选择一个喜欢的形象作为你的小助手，<br>专门帮在中企工作的你，搞定中文沟通的问题。</p>
      </div>

      <div class="choose-grid">
        ${["yuyu", "along"].map((id) => {
          const a = AVATARS[id];
          return `
          <button class="choose-card ${sel === id ? "is-selected" : ""}" data-avatar="${id}">
            <div class="choose-card__avatar">${a.svg}</div>
            <h3>${a.name} <span style="font-size:12px;opacity:.6">${a.pinyin}</span></h3>
            <p>${a.blurb}</p>
            <span class="choose-card__tag">${a.tag}</span>
          </button>`;
        }).join("")}
      </div>

      <div class="assistant-row" style="margin-top:26px">
        <div class="assistant-avatar">${avatarSVG(sel)}</div>
        <div class="speech speech--lg">你好！我是 ${AVATARS[sel].name}，<br>接下来由我陪你练商务中文～</div>
      </div>
    </div>
    <div class="screen__footer">
      <button class="btn" data-go="q1">就选 ${AVATARS[sel].name}，开始吧</button>
    </div>
  </section>`;
}

/* ============================================================
   2 · Q1 — first time in China or already working?
   ============================================================ */
function scrQ1(s) {
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="screen__body">
      <div class="steps" style="margin-top:4px"><i class="on"></i><i></i><i></i></div>
      <p class="muted" style="margin-top:14px">第 1 步 / 共 3 步</p>

      <div class="assistant-row" style="margin-top:8px">
        <div class="assistant-avatar">${avatarSVG(s.avatar)}</div>
        <div class="speech speech--lg">你是第一次来中国，<br>还是已经在这边工作了？</div>
      </div>

      <div class="bubbles">
        <button class="bubble ${s.branch === "new" ? "is-selected" : ""}" data-branch="new" data-go="q2_new">
          <span class="bubble__icon">🛬</span>
          <span class="bubble__txt"><b>刚到中国</b><span>初来乍到，先解决眼前的事</span></span>
          <span class="bubble__chev">${ICON.chev}</span>
        </button>
        <button class="bubble ${s.branch === "exp" ? "is-selected" : ""}" data-branch="exp" data-go="q2_exp">
          <span class="bubble__icon">💼</span>
          <span class="bubble__txt"><b>工作一段时间了</b><span>想在专业场景更进一步</span></span>
          <span class="bubble__chev">${ICON.chev}</span>
        </button>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   3a · Q2 (new arrival) — what's the biggest headache?
   ============================================================ */
function scrQ2New(s) {
  const opts = [
    { k: "travel", e: "🧳", t: "出行和日常", d: "打车、酒店、办卡（差旅场景）" },
    { k: "meeting", e: "🗣️", t: "跟同事开会沟通", d: "汇报、周会、对接（汇报场景）" },
    { k: "expo", e: "🤝", t: "参加展会见客户", d: "接待、寒暄、交换名片（展会场景）" },
  ];
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="screen__body">
      <div class="steps" style="margin-top:4px"><i class="on"></i><i class="on"></i><i></i></div>
      <p class="muted" style="margin-top:14px">第 2 步 / 共 3 步 · 刚到中国</p>

      <div class="assistant-row" style="margin-top:8px">
        <div class="assistant-avatar">${avatarSVG(s.avatar)}</div>
        <div class="speech speech--lg">那最近最头疼的<br>是什么？</div>
      </div>

      <div class="bubbles">
        ${opts.map((o) => `
        <button class="bubble ${s.pain === o.k ? "is-selected" : ""}" data-pain="${o.k}" data-go="prep">
          <span class="bubble__icon">${o.e}</span>
          <span class="bubble__txt"><b>${o.t}</b><span>${o.d}</span></span>
          <span class="bubble__chev">${ICON.chev}</span>
        </button>`).join("")}
      </div>
    </div>
  </section>`;
}

/* ============================================================
   3b · Q2 (experienced) — which industry?
   ============================================================ */
function scrQ2Exp(s) {
  const inds = [
    { k: "manufacturing", e: "🏭", t: "制造 / 供应链", d: "工厂、采购、物流" },
    { k: "tech", e: "💻", t: "互联网 / 科技", d: "产品、研发、运营" },
    { k: "finance", e: "📈", t: "金融 / 投资", d: "银行、基金、风控" },
    { k: "trade", e: "🚢", t: "外贸 / 进出口", d: "报关、跟单、谈判" },
    { k: "consumer", e: "🛍️", t: "消费 / 零售", d: "品牌、渠道、门店" },
    { k: "other", e: "✨", t: "其他行业", d: "告诉我你的领域" },
  ];
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="screen__body">
      <div class="steps" style="margin-top:4px"><i class="on"></i><i class="on"></i><i></i></div>
      <p class="muted" style="margin-top:14px">第 2 步 / 共 3 步 · 工作一段时间了</p>

      <div class="assistant-row" style="margin-top:8px">
        <div class="assistant-avatar">${avatarSVG(s.avatar)}</div>
        <div class="speech speech--lg">你是做哪个行业的？<br>我按行业给你配场景。</div>
      </div>

      <div class="ind-grid">
        ${inds.map((o) => `
        <button class="ind-card ${s.industry === o.k ? "is-selected" : ""}" data-industry="${o.k}" data-go="prep">
          <span class="ind-card__icon">${o.e}</span>
          <b>${o.t}</b><span>${o.d}</span>
        </button>`).join("")}
      </div>
    </div>
  </section>`;
}

/* ============================================================
   4 · PREP — AI prepares scenarios ("先试一个？")
   ============================================================ */
function scrPrep(s) {
  const ctx = s.branch === "exp"
    ? `行业：${({manufacturing:"制造/供应链",tech:"互联网/科技",finance:"金融/投资",trade:"外贸/进出口",consumer:"消费/零售",other:"你的领域"}[s.industry]||"你的领域")}`
    : `重点：${({travel:"出行和日常",meeting:"开会沟通",expo:"展会见客户"}[s.pain]||"出行和日常")}`;
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="prep">
      <div class="prep__orb">
        <div class="assistant-avatar" style="width:86px;height:86px;box-shadow:none">${avatarSVG(s.avatar)}</div>
      </div>
      <h2 class="h2" style="margin-top:6px">好，我帮你准备了几个场景</h2>
      <p class="sub">正在按「${ctx}」为你定制 · AI 学习路径生成中</p>
      <div class="prep__list">
        <div class="prep__item"><span class="prep__check">✓</span> 已分析你的水平与目标</div>
        <div class="prep__item"><span class="prep__check">✓</span> 已匹配高频商务表达</div>
        <div class="prep__item"><span class="prep__check">✓</span> 已生成 3 个真实场景对话</div>
      </div>
    </div>
    <div class="screen__footer">
      <button class="btn" data-go="recommend">先试一个？</button>
    </div>
  </section>`;
}

/* ============================================================
   5 · RECOMMEND — recommended scenario list
   ============================================================ */
const SCENARIO_SETS = {
  travel: [
    { k: "taxi", e: "🚕", c: "violet", t: "机场打车去酒店", sub: "跟司机说清目的地、走高速、要发票", tags: ["差旅", "初级", "5 分钟"] },
    { k: "hotel", e: "🏨", c: "teal", t: "酒店入住与延住", sub: "办入住、要发票、申请延迟退房", tags: ["差旅", "初级", "4 分钟"] },
    { k: "simcard", e: "📱", c: "coral", t: "营业厅办手机卡", sub: "选套餐、实名登记、开通流量", tags: ["生活", "初级", "6 分钟"] },
  ],
  meeting: [
    { k: "standup", e: "🗣️", c: "violet", t: "周会进度汇报", sub: "讲清进度、卡点和下一步计划", tags: ["汇报", "中级", "6 分钟"] },
    { k: "intro", e: "👋", c: "teal", t: "新人会议自我介绍", sub: "介绍背景、职责，留下好印象", tags: ["汇报", "初级", "4 分钟"] },
    { k: "sync", e: "🔗", c: "coral", t: "跨部门对接需求", sub: "提出需求、确认排期与责任人", tags: ["协作", "中级", "7 分钟"] },
  ],
  expo: [
    { k: "booth", e: "🤝", c: "violet", t: "展位接待客户", sub: "打招呼、介绍产品、引导留资", tags: ["展会", "中级", "6 分钟"] },
    { k: "card", e: "📇", c: "teal", t: "交换名片与寒暄", sub: "得体寒暄、加微信、约后续", tags: ["社交", "初级", "4 分钟"] },
    { k: "quote", e: "💰", c: "coral", t: "现场询价与报价", sub: "回应价格、谈数量与账期", tags: ["谈判", "高级", "8 分钟"] },
  ],
  manufacturing: [
    { k: "supplier", e: "🏭", c: "violet", t: "与供应商对货期", sub: "确认交期、催货、谈延期方案", tags: ["供应链", "中级", "7 分钟"] },
    { k: "qc", e: "🔍", c: "teal", t: "车间品质问题沟通", sub: "描述不良、定责、要求整改", tags: ["制造", "中级", "6 分钟"] },
    { k: "po", e: "📑", c: "coral", t: "采购下单与议价", sub: "确认规格、谈单价与账期", tags: ["采购", "高级", "8 分钟"] },
  ],
};
function scenariosFor(s) {
  if (s.branch === "exp") return SCENARIO_SETS[s.industry] || SCENARIO_SETS.manufacturing;
  return SCENARIO_SETS[s.pain] || SCENARIO_SETS.travel;
}
function scrRecommend(s) {
  const list = scenariosFor(s);
  return `
  <section class="screen">
    <div class="screen__bg screen__bg--ai"></div>
    ${statusbar()}
    <div class="screen__body">
      <div class="assistant-row" style="margin-top:8px">
        <div class="assistant-avatar">${avatarSVG(s.avatar)}</div>
        <div class="speech speech--lg">给你挑了这几个，<br>点一个直接开练 👇</div>
      </div>
      <div class="scn-list">
        ${list.map((o, i) => `
        <div class="scn-card scn-card--${o.c}" data-scenario="${o.k}" data-go="chat">
          <div class="scn-card__top">
            <span class="scn-card__emoji">${o.e}</span>
            <div><h3>${o.t}</h3><div class="scn-card__sub">${o.sub}</div></div>
          </div>
          <div class="scn-card__meta">${o.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
          <div class="scn-card__cta">${ICON.chev}</div>
        </div>`).join("")}
      </div>
      <p class="muted" style="text-align:center;margin-top:18px">以上场景由 AI 按你的情况实时生成 · 之后可在「场景库」找到更多</p>
    </div>
  </section>`;
}

/* ============================================================
   6 · CHAT — scenario conversation (taxi demo)
   ============================================================ */
function scrChat(s) {
  const av = avatarSVG(s.avatar);
  return `
  <section class="screen chat screen--light">
    ${statusbar("light")}
    <div class="chat__nav">
      <button class="iconbtn" data-go="recommend">${ICON.back}</button>
      <div class="chat__title"><b>机场打车去酒店</b><br><span>AI 角色扮演 · 差旅场景</span></div>
      <span class="chat__role-tag">🚕 出租车司机</span>
    </div>

    <div class="chat__body">
      <div class="coach">🎯 <b>本关目标</b>：说清目的地、要求走高速、最后索取发票</div>

      <div class="msg msg--in">
        <div class="msg__avatar">${av}</div>
        <div class="bubble-chat">
          <div class="pinyin">Nín hǎo, qù nǎr?</div>
          您好，去哪儿？
          <div class="trans">Hello, where to?</div>
        </div>
      </div>

      <div class="msg msg--out">
        <div class="bubble-chat">
          <div class="pinyin">Qù Guómào Dàjiǔdiàn, máfan zǒu gāosù.</div>
          去国贸大酒店，麻烦走高速。
          <div class="trans">To Guomao Hotel, please take the highway.</div>
          <div class="msg__score">${ICON.star} 发音 96 · 很地道</div>
        </div>
      </div>

      <div class="msg msg--in">
        <div class="msg__avatar">${av}</div>
        <div class="bubble-chat">
          <div class="pinyin">Hǎo de, gāosù kuài yìdiǎn. Dàgài sìshí fēnzhōng.</div>
          好的，高速快一点。大概四十分钟。
          <div class="trans">Sure, the highway is faster. About 40 minutes.</div>
        </div>
      </div>

      <div class="coach">💡 <b>小语提示</b>：到了别忘了说「师傅，帮我开张发票」，差旅报销要用到。</div>
    </div>

    <div class="chat__foot">
      <div class="suggest">
        <button data-suggest>师傅，能开发票吗？</button>
        <button data-suggest>大概多少钱？</button>
        <button data-suggest>可以用手机支付吗？</button>
      </div>
      <div class="chat__inputbar">
        <div class="field">输入或点击建议回复…</div>
        <div class="mic" data-go="summary">${ICON.mic}</div>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   7 · SUMMARY — scenario completion / feedback
   ============================================================ */
function scrSummary(s) {
  return `
  <section class="screen screen--light">
    <div class="screen__bg" style="background:radial-gradient(100% 60% at 50% 0%, rgba(46,213,154,.18), transparent 60%), var(--paper)"></div>
    ${statusbar("light")}
    <div class="screen__body" style="text-align:center">
      <div style="font-size:64px;margin-top:18px">🎉</div>
      <h1 class="h1" style="color:var(--ink);margin-bottom:4px">场景通关！</h1>
      <p class="sub">机场打车去酒店 · 用时 4 分 20 秒</p>

      <div class="stat-row" style="margin-top:22px">
        <div class="stat"><b>96</b><span>发音</span></div>
        <div class="stat"><b>A</b><span>得体度</span></div>
        <div class="stat"><b>+35</b><span>经验值</span></div>
      </div>

      <div class="glass" style="background:#fff;border:1px solid var(--line);border-radius:var(--r-lg);padding:16px;margin-top:18px;text-align:left;box-shadow:var(--shadow-sm)">
        <b style="color:var(--ink)">🗝️ 本次解锁表达</b>
        <div class="path__tagrow" style="margin-top:10px">
          <span class="tag-s">麻烦走高速</span>
          <span class="tag-s">帮我开张发票</span>
          <span class="tag-s">用手机支付</span>
          <span class="tag-s">大概多久能到</span>
        </div>
      </div>

      <div class="glass" style="background:linear-gradient(135deg,rgba(109,94,248,.1),rgba(255,111,181,.1));border:1px dashed rgba(154,79,240,.4);border-radius:var(--r-lg);padding:14px 16px;margin-top:14px;text-align:left">
        <span style="font-size:13px;color:var(--ink-2);line-height:1.6">🤖 <b style="color:var(--violet)">${AVATARS[s.avatar].name}建议</b>：你已经能搞定打车啦，下一步要不要练「酒店入住」？我已经加进你的学习路径了。</span>
      </div>
    </div>
    <div class="screen__footer">
      <button class="btn" data-go="home">进入我的学习路径</button>
    </div>
  </section>`;
}

/* ============================================================
   8 · HOME — AI-driven learning path
   ============================================================ */
function tabbar(active) {
  const items = [
    { k: "home", e: "🏠", t: "学习", go: "home" },
    { k: "library", e: "🧭", t: "场景库", go: "library" },
    { k: "center", center: true },
    { k: "review", e: "🔁", t: "复习", go: "home" },
    { k: "profile", e: "👤", t: "我的", go: "profile" },
  ];
  return `<div class="tabbar">
    ${items.map((it) => it.center
      ? `<div class="tabbar__center" data-go="recommend">＋</div>`
      : `<div class="tabbar__item ${active === it.k ? "on" : ""}" data-go="${it.go}"><span class="ic">${it.e}</span>${it.t}</div>`
    ).join("")}
  </div>`;
}
function scrHome(s) {
  const goal = s.branch === "exp" ? "行业商务沟通进阶" : "在华生活与工作适应";
  return `
  <section class="screen screen--light">
    <div class="screen__bg" style="background:radial-gradient(120% 50% at 50% 0%, rgba(109,94,248,.16), transparent 55%), var(--paper)"></div>
    ${statusbar("light")}
    <div class="app-head">
      <div class="app-head__avatar">${avatarSVG(s.avatar)}</div>
      <div class="app-head__hi"><b>下午好，Alex</b><br><span>${AVATARS[s.avatar].name}陪你练 · ${goal}</span></div>
      <div class="app-head__streak">🔥 7</div>
    </div>
    <div class="screen__body" style="padding-top:4px">
      <div class="ai-card">
        <div class="ai-card__label">今日 AI 推荐</div>
        <h3>酒店入住与延住</h3>
        <p>承接你刚练完的「打车」，继续把差旅场景打通。约 4 分钟。</p>
        <button class="btn" data-scenario="hotel" data-go="chat">继续今日学习 →</button>
      </div>

      <div class="sec-title"><b>你的学习路径</b><a data-go="library">全部</a></div>
      <div class="path">
        <div class="path__rail"></div>
        <div class="path__node">
          <div class="path__dot done">✓</div>
          <div class="path__card"><b>机场打车去酒店</b><p>已通关 · 发音 96</p></div>
        </div>
        <div class="path__node">
          <div class="path__dot active">🏨</div>
          <div class="path__card active">
            <b>酒店入住与延住</b><p>进行中 · AI 已为你定制对话</p>
            <div class="path__tagrow"><span class="tag-s">差旅</span><span class="tag-s">初级</span><span class="tag-s">4 分钟</span></div>
          </div>
        </div>
        <div class="path__node">
          <div class="path__dot">📱</div>
          <div class="path__card"><b>营业厅办手机卡</b><p>未解锁 · 完成上一关后开启</p></div>
        </div>
        <div class="path__node">
          <div class="path__dot">🗣️</div>
          <div class="path__card"><b>周会进度汇报</b><p>升级关 · 进入职场沟通</p></div>
        </div>
      </div>
    </div>
    ${tabbar("home")}
  </section>`;
}

/* ============================================================
   9 · LIBRARY — scenario categories
   ============================================================ */
function scrLibrary(s) {
  const cats = [
    { e: "🧳", t: "差旅出行", n: "12 个场景", bg: "var(--grad-ai)" },
    { e: "🗣️", t: "会议汇报", n: "16 个场景", bg: "var(--grad-teal)" },
    { e: "🤝", t: "展会社交", n: "9 个场景", bg: "var(--grad-coral)" },
    { e: "💰", t: "商务谈判", n: "11 个场景", bg: "var(--grad-gold)" },
    { e: "🍽️", t: "商务宴请", n: "7 个场景", bg: "linear-gradient(135deg,#8E7CFF,#5B7CFF)" },
    { e: "📧", t: "邮件 / 微信", n: "10 个场景", bg: "linear-gradient(135deg,#FF9F6E,#FF5C7A)" },
  ];
  const hot = scenariosFor(s);
  return `
  <section class="screen screen--light">
    <div class="screen__bg" style="background:var(--paper)"></div>
    ${statusbar("light")}
    <div class="app-head"><div class="app-head__hi"><b style="font-size:21px">场景库</b><br><span>按场景练，AI 实时陪练打分</span></div></div>
    <div class="screen__body" style="padding-top:4px">
      <div class="searchbar">🔍 搜索场景，如「报销」「报价」「请假」…</div>

      <div class="sec-title" style="margin-top:18px"><b>按场景分类</b></div>
      <div class="cat-grid">
        ${cats.map((c) => `
        <div class="cat-card" style="background:${c.bg};${c.t==='商务谈判'?'color:#4a2c00':''}" data-go="recommend">
          <span class="e">${c.e}</span>
          <div><b>${c.t}</b><br><small>${c.n}</small></div>
        </div>`).join("")}
      </div>

      <div class="sec-title"><b>为你推荐</b><a data-go="recommend">换一批</a></div>
      <div class="scn-list">
        ${hot.slice(0, 2).map((o) => `
        <div class="scn-card scn-card--${o.c}" data-scenario="${o.k}" data-go="chat">
          <div class="scn-card__top">
            <span class="scn-card__emoji">${o.e}</span>
            <div><h3>${o.t}</h3><div class="scn-card__sub">${o.sub}</div></div>
          </div>
          <div class="scn-card__meta">${o.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
          <div class="scn-card__cta">${ICON.chev}</div>
        </div>`).join("")}
      </div>
    </div>
    ${tabbar("library")}
  </section>`;
}

/* ============================================================
   10 · PROFILE — progress, skills, achievements
   ============================================================ */
function scrProfile(s) {
  const skills = [
    { t: "商务词汇", v: 72 },
    { t: "听力理解", v: 64 },
    { t: "口语表达", v: 58 },
    { t: "得体礼仪", v: 80 },
  ];
  return `
  <section class="screen screen--light">
    <div class="screen__bg" style="background:radial-gradient(120% 40% at 50% 0%, rgba(154,79,240,.18), transparent 55%), var(--paper)"></div>
    ${statusbar("light")}
    <div class="profile-hero">
      <div class="profile-hero__avatar">${avatarSVG(s.avatar)}</div>
      <h2>Alex Müller</h2>
      <p>在华工作 · ${AVATARS[s.avatar].name}的学员</p>
      <span class="level-pill">⭐ HSK 3 冲刺中 · Lv.6</span>
    </div>
    <div class="screen__body" style="padding-top:6px">
      <div class="stat-row">
        <div class="stat"><b>7</b><span>连续天数</span></div>
        <div class="stat"><b>23</b><span>通关场景</span></div>
        <div class="stat"><b>1.2k</b><span>累计经验</span></div>
      </div>

      <div class="sec-title"><b>能力雷达</b></div>
      <div class="list-card" style="padding:16px">
        ${skills.map((sk) => `
        <div class="skill" style="margin-top:${sk === skills[0] ? 0 : 14}px">
          <div class="skill__head"><span>${sk.t}</span><span>${sk.v}%</span></div>
          <div class="skill__bar"><div class="skill__fill" style="width:${sk.v}%"></div></div>
        </div>`).join("")}
      </div>

      <div class="sec-title"><b>成就</b><a>全部</a></div>
      <div class="ach-row">
        <div class="ach"><span class="e">🔥</span><small>7天<br>不间断</small></div>
        <div class="ach"><span class="e">🚕</span><small>差旅<br>达人</small></div>
        <div class="ach"><span class="e">🎤</span><small>发音<br>95+</small></div>
        <div class="ach locked"><span class="e">🏆</span><small>谈判<br>高手</small></div>
      </div>

      <div class="list-card">
        <div class="list-item"><span class="ic">🎯</span> 学习目标与水平 <span class="chev">${ICON.chev}</span></div>
        <div class="list-item"><span class="ic">🔔</span> 提醒与打卡时间 <span class="chev">${ICON.chev}</span></div>
        <div class="list-item"><span class="ic">🤖</span> 更换我的 AI 小助手 <span class="chev">${ICON.chev}</span></div>
        <div class="list-item"><span class="ic">⚙️</span> 设置 <span class="chev">${ICON.chev}</span></div>
      </div>
    </div>
    ${tabbar("profile")}
  </section>`;
}

/* ============================================================
   Registry
   ============================================================ */
const SCREENS = [
  { id: "welcome",   group: "首次进入 · Onboarding", title: "欢迎 · 选择小助手", desc: "两个形象出场自我介绍，用户选择专属 AI 小助手。", render: scrWelcome },
  { id: "q1",        group: "首次进入 · Onboarding", title: "Q1 · 来中国的阶段", desc: "「第一次来中国，还是已经工作了？」气泡选项分流。", render: scrQ1 },
  { id: "q2_new",    group: "首次进入 · Onboarding", title: "Q2a · 最头疼的事", desc: "「刚到中国」分支：出行日常 / 开会沟通 / 展会见客户。", render: scrQ2New },
  { id: "q2_exp",    group: "首次进入 · Onboarding", title: "Q2b · 行业选择", desc: "「工作一段时间」分支：选择所在行业。", render: scrQ2Exp },
  { id: "prep",      group: "首次进入 · Onboarding", title: "AI 准备场景", desc: "形象说「我帮你准备了几个场景，先试一个？」生成动画。", render: scrPrep },
  { id: "recommend", group: "首次进入 · Onboarding", title: "推荐场景列表", desc: "根据回答实时生成的 3 个推荐场景卡片。", render: scrRecommend },
  { id: "chat",      group: "核心体验 · Practice", title: "场景对话", desc: "点击场景直接开练：AI 角色扮演 + 拼音/翻译 + 实时打分。", render: scrChat },
  { id: "summary",   group: "核心体验 · Practice", title: "通关结算", desc: "评分、解锁表达与小助手的下一步建议。", render: scrSummary },
  { id: "home",      group: "主应用 · App", title: "学习路径首页", desc: "AI 主导的学习路径、今日推荐与连续打卡。", render: scrHome },
  { id: "library",   group: "主应用 · App", title: "场景库", desc: "按场景分类浏览，搜索，AI 实时推荐。", render: scrLibrary },
  { id: "profile",   group: "主应用 · App", title: "我的", desc: "等级、能力雷达、成就与设置。", render: scrProfile },
];

const SCREEN_MAP = Object.fromEntries(SCREENS.map((x) => [x.id, x]));
