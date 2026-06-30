/* ============================================================
   BizChinese — i18n
   The learner picks the language LUMI explains things in.
   Every screen AFTER the language step renders in that language.
   Full strings provided for en + zh; other options fall back to en.
   (Chinese being TAUGHT always stays Chinese — only the UI/coach
    translates.)
   ============================================================ */

const LANGS = [
  { k: "en", label: "English", flag: "🇺🇸" },
  { k: "zh", label: "中文", flag: "🇨🇳" },
  { k: "ja", label: "日本語", flag: "🇯🇵" },
  { k: "ko", label: "한국어", flag: "🇰🇷" },
  { k: "es", label: "Español", flag: "🇪🇸" },
  { k: "fr", label: "Français", flag: "🇫🇷" },
];

const STR = {
  en: {
    step: (a, b) => `Step ${a} of ${b}`,
    cont: "Continue",
    startNow: "Start now",

    /* purpose */
    purposeQ: (n) => `Nice to meet you, ${n}! 🎉<br>Why are you learning Business Chinese?`,
    purposes: [
      { k: "work", e: "🏢", t: "Working in China", d: "I work at / will join a Chinese company" },
      { k: "clients", e: "🤝", t: "Chinese clients & suppliers", d: "I deal with partners in China" },
      { k: "market", e: "🚀", t: "Entering the China market", d: "We're expanding into China" },
      { k: "growth", e: "🌱", t: "Personal growth", d: "I just want to level up my Chinese" },
    ],

    /* industry */
    industryQ: (n) => `And which industry are you in, ${n}?`,
    industries: [
      { k: "nev", e: "🚗", t: "New-energy vehicles" },
      { k: "solar", e: "☀️", t: "Solar / new-energy equipment" },
      { k: "telecom", e: "📡", t: "Telecom / hardware" },
      { k: "ecommerce", e: "🛒", t: "Cross-border e-commerce" },
      { k: "internet", e: "🎮", t: "Internet / gaming" },
      { k: "construction", e: "🏗️", t: "Infrastructure / construction" },
      { k: "mining", e: "⛏️", t: "Mining / resources" },
      { k: "retail", e: "🛍️", t: "Consumer goods / retail" },
      { k: "edu", e: "🎓", t: "Vocational education" },
      { k: "fintech", e: "💳", t: "Fintech" },
      { k: "other", e: "✨", t: "Other" },
    ],

    /* recommend */
    recIntro: "Got it! Here are a few scenarios<br>you can start right now 👇",
    recShuffle: "Shuffle",
    recSwipe: "Swipe up for more scenarios",
    recMoreTitle: "More scenarios",
    startLabel: "Start",

    /* home */
    hi: (n) => `Hi, ${n} 👋`,
    homeSub: "Let's keep your Chinese sharp today",
    summon: "Tap me anytime to start a chat ✨",
    summonName: (n) => `Hey ${n}! Stuck on something? Tap to chat with LUMI ✨`,
    today: "TODAY · PICKED BY LUMI",
    continueLesson: "Continue today's lesson →",
    yourPath: "Your learning path",
    all: "All",
    cleared: "cleared",
    inProgress: "in progress · made for you by LUMI",
    locked: "locked · finish the step above",
    upgrade: "next level · workplace talk",
    tabs: { ai: "LUMI", learn: "Home", scn: "Scenarios", me: "Me" },
    summonQ: "How do I politely chase a reply? 👀",
    summonTap: "Ask LUMI anything",
    quickTitle: "Jump straight in",
    popTitle: "Popular in your field",
    learners: (n) => `${n} learning`,
    pullDown: "Pull down to chat with LUMI",

    /* assistant (summoned LUMI) */
    asstTitle: "LUMI · your AI buddy",
    asstHello: (n) => `Hi ${n}! What do you feel like to do today?`,
    asstPrompts: [
      { k: "practice", t: "🎬 Practice a scenario", say: "Practice a scenario" },
      { k: "translate", t: "🌐 Translate a sentence", say: "Translate a sentence" },
      { k: "learn", t: "📚 What should I learn today?", say: "What should I learn today?" },
    ],
    asstField: "Type a sentence or tap 🎙 to speak…",
    asstPracticeReply: "Nice! Here are a few you can start right now — general picks + ones for your field 👇",
    pcGeneral: "General",
    pcVisit: "client visit",
    pcPitch: "product pitch",
    asstTranslateReply: "Sure! Type any sentence in the box below and I'll turn it into natural Business Chinese. For example 👇",
    transFrom: "You",
    translateEx: { src: { en: "Can we move our meeting to tomorrow afternoon?", zh: "会议能不能挪到明天下午？" }, zh: "我们能把会议改到明天下午吗？", py: "Wǒmen néng bǎ huìyì gǎi dào míngtiān xiàwǔ ma?" },
    asstLearnReply: "Based on your goal and field, here's what I'd focus on today:",
    learnItems: ["Politely chasing a reply on WeChat", "3 ways to soften a “no”", "Saying numbers & quotes clearly on a call"],
    asstCourseTitle: "Business email essentials",
    asstCourseLink: "open course →",

    /* course (placeholder) */
    courseBadge: "COURSE",
    courseMeta: "12 lessons · ~35 min",
    courseProgress: "20% complete",
    courseLessonsTitle: "Lessons",
    courseLessons: [
      { t: "Opening lines & greetings", done: true },
      { t: "Making a clear request", done: true },
      { t: "Following up politely", done: false },
      { t: "Closing & sign-off", done: false },
    ],
    courseCta: "Continue learning",

    /* chat */
    chatGoal: "GOAL",
    chatRole: "AI role-play",
    coachName: "LUMI",
    chatField: "Type or tap a suggested reply…",

    /* summary */
    sumTitle: "Scenario cleared!",
    sumTime: "used",
    sumPron: "Pronunciation",
    sumManner: "Appropriateness",
    sumXp: "XP",
    sumUnlock: "🗝️ Phrases you unlocked",
    sumAdvice: (n) =>
      `Great job, ${n}! You can already handle this. Want to try the next one? I've added it to your path.`,
    sumCta: "Go to my learning path",

    /* library */
    libTitle: "Scenario library",
    libSub: "Practice by scenario · LUMI scores you live",
    libSearch: "Search a scenario, e.g. “interview”, “quote”…",
    libCats: "By category",
    libForYou: "For you",
    libSwap: "Shuffle",
    cats: [
      { e: "🧳", t: "Travel & arrival", n: "12 scenarios" },
      { e: "🗣️", t: "Meetings & reports", n: "16 scenarios" },
      { e: "🤝", t: "Expo & networking", n: "9 scenarios" },
      { e: "💰", t: "Negotiation", n: "11 scenarios" },
      { e: "🍽️", t: "Business dinners", n: "7 scenarios" },
      { e: "📧", t: "Email / WeChat", n: "10 scenarios" },
    ],

    /* profile */
    profSub: (n) => `LUMI's learner`,
    profLevel: "⭐ HSK 3 in progress · Lv.6",
    stStreak: "day streak",
    stCleared: "scenarios",
    stXp: "total XP",
    skillsTitle: "Skill radar",
    skills: [
      { t: "Business vocab", v: 72 },
      { t: "Listening", v: 64 },
      { t: "Speaking", v: 58 },
      { t: "Etiquette", v: 80 },
    ],
    achTitle: "Achievements",
    settings: [
      { ic: "🎯", t: "Goals & level" },
      { ic: "🌐", t: "Learning language" },
      { ic: "🔔", t: "Reminders" },
      { ic: "⚙️", t: "Settings" },
    ],
  },

  zh: {
    step: (a, b) => `第 ${a} 步 / 共 ${b} 步`,
    cont: "继续",
    startNow: "立即开始",

    purposeQ: (n) => `很高兴认识你，${n}！🎉<br>你为什么想学商务汉语？`,
    purposes: [
      { k: "work", e: "🏢", t: "在华工作", d: "我在中企工作 / 即将入职" },
      { k: "clients", e: "🤝", t: "对接中国客户·供应商", d: "我要和中国伙伴打交道" },
      { k: "market", e: "🚀", t: "进入中国市场", d: "我们正在拓展中国业务" },
      { k: "growth", e: "🌱", t: "个人发展", d: "想把中文水平提上去" },
    ],

    industryQ: (n) => `${n}，您目前从事于什么行业？`,
    industries: [
      { k: "nev", e: "🚗", t: "新能源汽车" },
      { k: "solar", e: "☀️", t: "光伏 / 新能源设备" },
      { k: "telecom", e: "📡", t: "通信 / 硬件" },
      { k: "ecommerce", e: "🛒", t: "跨境电商" },
      { k: "internet", e: "🎮", t: "互联网 / 游戏" },
      { k: "construction", e: "🏗️", t: "基建 / 工程 / 建筑" },
      { k: "mining", e: "⛏️", t: "矿业 / 资源" },
      { k: "retail", e: "🛍️", t: "消费品 / 零售" },
      { k: "edu", e: "🎓", t: "职业教育" },
      { k: "fintech", e: "💳", t: "金融科技" },
      { k: "other", e: "✨", t: "其他" },
    ],

    recIntro: "好嘞！这几个场景<br>现在就能直接开练 👇",
    recShuffle: "换一批",
    recSwipe: "上划查看更多场景",
    recMoreTitle: "更多场景",
    startLabel: "开始",

    hi: (n) => `你好，${n} 👋`,
    homeSub: "今天也来练一练中文吧",
    summon: "随时点我开启对话 ✨",
    summonName: (n) => `${n}，遇到难题了？点我和 LUMI 聊聊 ✨`,
    today: "今日 · LUMI 为你挑选",
    continueLesson: "继续今日学习 →",
    yourPath: "你的学习路径",
    all: "全部",
    cleared: "已通关",
    inProgress: "进行中 · LUMI 已为你定制",
    locked: "未解锁 · 完成上一关后开启",
    upgrade: "升级关 · 进入职场沟通",
    tabs: { ai: "LUMI", learn: "首页", scn: "场景", me: "我的" },
    summonQ: "如何礼貌地催别人回复消息？👀",
    summonTap: "有问题随时问 LUMI",
    quickTitle: "快速开练",
    popTitle: "行业热门场景",
    learners: (n) => `${n} 人在学`,
    pullDown: "下拉，和 LUMI 开始聊天",

    asstTitle: "LUMI · 你的 AI 小伙伴",
    asstHello: (n) => `${n}，今天想做点什么？`,
    asstPrompts: [
      { k: "practice", t: "🎬 练一个场景", say: "练一个场景" },
      { k: "translate", t: "🌐 翻译一句话", say: "翻译一句话" },
      { k: "learn", t: "📚 今天学点什么？", say: "今天学点什么？" },
    ],
    asstField: "输入句子，或点 🎙 说话…",
    asstPracticeReply: "好嘞！这几个现在就能开练 —— 通用 + 你行业相关的 👇",
    pcGeneral: "通用",
    pcVisit: "客户拜访",
    pcPitch: "产品技术介绍",
    asstTranslateReply: "没问题！在下面输入任意句子，我帮你翻成地道的商务中文。比如 👇",
    transFrom: "你",
    translateEx: { src: { en: "Can we move our meeting to tomorrow afternoon?", zh: "会议能不能挪到明天下午？" }, zh: "我们能把会议改到明天下午吗？", py: "Wǒmen néng bǎ huìyì gǎi dào míngtiān xiàwǔ ma?" },
    asstLearnReply: "结合你的目标和行业，今天建议你重点学：",
    learnItems: ["在微信上礼貌地催回复", "3 种委婉说“不”的方式", "电话里把数字和报价说清楚"],
    asstCourseTitle: "商务邮件高频表达",
    asstCourseLink: "去课程学习 →",

    courseBadge: "课程",
    courseMeta: "12 节课 · 约 35 分钟",
    courseProgress: "已完成 20%",
    courseLessonsTitle: "课程目录",
    courseLessons: [
      { t: "开头问候与称呼", done: true },
      { t: "清楚地提出请求", done: true },
      { t: "礼貌地跟进催办", done: false },
      { t: "结尾与落款", done: false },
    ],
    courseCta: "继续学习",

    chatGoal: "本关目标",
    chatRole: "AI 角色扮演",
    coachName: "LUMI",
    chatField: "输入或点击建议回复…",

    sumTitle: "场景通关！",
    sumTime: "用时",
    sumPron: "发音",
    sumManner: "得体度",
    sumXp: "经验值",
    sumUnlock: "🗝️ 本次解锁表达",
    sumAdvice: (n) => `${n} 太棒了！这个你已经能搞定。要不要试试下一个？我已经加进你的学习路径啦。`,
    sumCta: "进入我的学习路径",

    libTitle: "场景库",
    libSub: "按场景练，LUMI 实时陪练打分",
    libSearch: "搜索场景，如「面试」「报价」…",
    libCats: "按场景分类",
    libForYou: "为你推荐",
    libSwap: "换一批",
    cats: [
      { e: "🧳", t: "差旅出行", n: "12 个场景" },
      { e: "🗣️", t: "会议汇报", n: "16 个场景" },
      { e: "🤝", t: "展会社交", n: "9 个场景" },
      { e: "💰", t: "商务谈判", n: "11 个场景" },
      { e: "🍽️", t: "商务宴请", n: "7 个场景" },
      { e: "📧", t: "邮件 / 微信", n: "10 个场景" },
    ],

    profSub: (n) => `LUMI 的学员`,
    profLevel: "⭐ HSK 3 冲刺中 · Lv.6",
    stStreak: "连续天数",
    stCleared: "通关场景",
    stXp: "累计经验",
    skillsTitle: "能力雷达",
    skills: [
      { t: "商务词汇", v: 72 },
      { t: "听力理解", v: 64 },
      { t: "口语表达", v: 58 },
      { t: "得体礼仪", v: 80 },
    ],
    achTitle: "成就",
    settings: [
      { ic: "🎯", t: "学习目标与水平" },
      { ic: "🌐", t: "学习语言" },
      { ic: "🔔", t: "提醒与打卡" },
      { ic: "⚙️", t: "设置" },
    ],
  },
};

function L(state) {
  return STR[state.lang] || STR.en;
}
