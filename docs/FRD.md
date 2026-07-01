# BizChinese · 商务汉语 — 功能需求清单（FRD）

> 配套主文档：[PRD](./PRD.md)。本文件给出**功能清单 + 用户故事 + 验收标准（Given/When/Then）+ 优先级 + 埋点**，与可点击原型一一对应（`prototype.html#<id>`）。
>
> 优先级：**P0** = MVP 必须；**P1** = 重要、紧随其后；**P2** = 增强 / 后续。

---

## 1. 功能清单总览

| 编号 | 模块 | 功能 | 优先级 | 原型 id |
| --- | --- | --- | --- | --- |
| F-01 | IP 形象 | LUMI 形象与多表情 | P0 | 全局 |
| F-02 | Onboarding | LUMI 登场自我介绍 | P0 | `welcome` |
| F-03 | Onboarding | 问名字并记录 | P0 | `ask_name` |
| F-04 | Onboarding | 选讲解语言并切换界面 | P0 | `ask_language` |
| F-05 | Onboarding | 选学习目的 | P0 | `ask_purpose` |
| F-06 | Onboarding | 选所在行业 | P0 | `ask_industry` |
| F-07 | Onboarding | 推荐可直接开始的场景 + 换一批 + 上划进首页 | P0 | `recommend` |
| F-08 | 练习 | 场景介绍页（背景 + 角色扮演任务 + 对话角色） | P0 | `scene_intro` |
| F-09 | 练习 | 场景对话（数字人 + 办公室；AI 翻译/慢速/提示；用户发言后多维评价；无报告、可续聊） | P0 | `chat` |
| F-10 | 首页 | 传统首页结构（焦点/快速磁贴/行业热门场景） | P0 | `home` |
| F-11 | 首页 | 下拉手势召唤 LUMI | P0 | `home` |
| F-12 | 首页 | 中部召唤条 + 底部 LUMI Tab | P0 | `home` |
| F-13 | 助手 | 召唤 LUMI：今天想做点什么（含自由文本/语音） | P0 | `assistant` |
| F-14 | 助手 | 练一个新场景（3 个新卡片：通用 + 行业相关 + 换一批/指令） | P0 | `asst_practice` |
| F-15 | 助手 | 翻译一句话 | P0 | `asst_translate` |
| F-16 | 助手 | 今天学点什么 + 跳转课程链接 | P0 | `asst_learn` |
| F-17 | 课程 | 课程页（占位） | P1 | `course` |
| F-18 | 场景库 | 分类 / 搜索 / 推荐 | P1 | `library` |
| F-19 | 我的 | 等级 / 能力雷达 / 成就 / 设置 | P1 | `profile` |
| F-20 | 通用 | 多语言 i18n | P0 | 全局 |

---

## 2. 用户故事与验收标准

### F-02 LUMI 登场（`welcome`）· P0
**用户故事**：作为新用户，我希望一打开就被友好地欢迎并了解这个助手是谁，以便建立信任、愿意继续。
**验收标准**
- Given 首次打开，When 进入欢迎页，Then 显示 LUMI 形象 + 多语言问候 + 一句话自我介绍 + 主 CTA。
- When 点击主 CTA，Then 进入“问名字”。

### F-03 问名字（`ask_name`）· P0
**用户故事**：作为新用户，我希望被询问怎么称呼我，以便后续被个性化称呼。
**验收标准**
- Given 在问名字页，Then 显示 LUMI 提问、可输入文本框、快捷示例名、继续按钮、隐私提示，步骤指示为 1/4。
- When 输入或选择名字并继续，Then **记录名字**并进入“选语言”。
- When 未输入直接继续，Then 使用默认占位名（产品化时改为必填校验）。

### F-04 选讲解语言（`ask_language`）· P0
**用户故事**：作为非中文母语用户，我希望选择 LUMI 用哪种语言跟我讲解。
**验收标准**
- Given 在选语言页（步骤 2/4），Then 展示语言选项（含国旗 + 名称）。
- When 选择某语言，Then **记录语言**，并从该步起**所有后续界面文案切换为该语言**，进入“学习目的”。
- And 明确告知“被教学的中文不变，仅界面/点评翻译”。

### F-05 学习目的（`ask_purpose`）· P0
**验收标准**
- Given 步骤 3/4，文案以所选语言显示，并按名字称呼用户。
- Then 提供 4 个气泡单选：在华工作 / 对接客户·供应商 / 进入市场 / 个人发展。
- When 选择，Then 记录目的并进入“所在行业”。

### F-06 所在行业（`ask_industry`）· P0
**验收标准**
- Given 步骤 4/4，Then 提供 11 个行业单选：新能源汽车、光伏/新能源设备、通信/硬件、跨境电商、互联网/游戏、基建/工程/建筑、矿业/资源、消费品/零售、职业教育、金融科技、其他。
- When 选择某行业，Then 记录行业并进入“推荐场景”。

### F-07 推荐可直接开始的场景（`recommend`）· P0
**用户故事**：作为完成 onboarding 的用户，我希望立刻看到几个能马上开始的场景。
**验收标准**
- Given 进入推荐页，Then 按“学习目的”**随机展示 3 个**可立即开始的场景卡（标题/中文名/说明/标签/▶开始）。
- When 点击“🎲 换一批”，Then 重新随机推荐。
- When 点击场景卡，Then 进入**场景介绍页**（`scene_intro`）。
- And 底部展示“上划查看更多场景”手势入口；When 触发，Then 进入传统首页。

### F-08 场景介绍页（`scene_intro`）· P0
**用户故事**：作为学习者，开始对话前我希望先了解场景背景和我要扮演的角色。
**验收标准**
- Then 展示：办公室场景 banner + 数字人预览 + 关闭按钮；场景标题；角色扮演任务说明。
- Then “对话角色”区展示 AI 角色（有人物名）+ You（我的角色）。
- When 点击“开始对话”，Then 进入 `chat`。

### F-09 场景对话（`chat`）· P0
**用户故事**：作为学习者，我希望像和真人一样、在有画面的场景里练习，并得到简短、多维的反馈；可随时结束、下次接着聊。
**验收标准**
- Then 背景为**数字人 + 办公室场景**（占位，可替换为实时数字人）。
- Then 顶部展示：关闭（X）、**场景名称 + AI 角色**、**结束（Finish）**。
- Then AI 消息含中文，并提供 **翻译 / 慢速 / 提示** 三个操作；When 点“翻译”，Then 就地展开拼音 + 界面语言译文。
- Then 用户发言后展示**简短多维评价**：用语 / 词汇准确度 / 发音准确度 / 表达准确度 + 总评标签。
- Then 底部为“输入消息，或按住说话”+ 语音。
- **无通关报告**；When 点“结束”，Then 退出；**再次进入同一场景继续上次对话**。

### F-10 传统首页结构（`home`）· P0
**验收标准**
- Then 顶部展示问候（含名字）+ 学习焦点（基于目的）+ 通知。
- Then 展示快速开练磁贴（来中国出差/模拟面试/展会介绍/周会汇报），点击进入对话。
- Then 展示“行业热门场景”图卡 + “XX,XXX 人在学”。

### F-11 下拉手势召唤 LUMI（`home`）· P0
**用户故事**：作为用户，我希望随时方便地把 AI 叫出来。
**验收标准**
- Given 首页顶部有“下拉，和 LUMI 开始聊天”把手。
- When 在把手上**按住向下拖动**，Then LUMI 聊天面板从顶部跟手滑下、背景渐暗。
- When 松手且下拉超过阈值（约 1/3 屏），Then 展开为完整 LUMI 对话；否则回弹收起。
- When **轻点**把手，Then 直接打开。
- When 面板内点收起 / 上滑把手，Then 收起面板。
- And 支持鼠标与触屏（Pointer 事件）。

### F-12 召唤条与底部 Tab（`home`）· P0
**验收标准**
- Then 首页中部展示 LUMI + 示例问题气泡 + 箭头；点击进入助手对话。
- Then 底部第一个 Tab 为 LUMI（高亮）；点击进入助手对话。
- And 通过召唤条 / Tab / 下拉打开时，助手默认展示“选项菜单”。

### F-13 召唤 LUMI · 今天想做点什么（`assistant`）· P0
**用户故事**：唤起 AI 后我希望快速选择要做的事，或直接打字/说话。
**验收标准**
- Then LUMI 问“今天想做点什么？”，提供 4 个选项（置顶为**继续上次的对话**）：继续上次的对话 / 练一个新场景 / 翻译一句话 / 今天学点什么。
- Then 下方常驻文本输入框 + 语音按钮，用户可自由输入。
- When 点击“继续上次的对话”，Then 直接进入 `chat` 继续上次场景。
- When 选择其余选项，Then 在同一对话中进入对应模式（见 F-14/15/16）。
- And 进入模式后提供快捷指令切换条，可在几种模式间切换。

### F-14 练一个新场景（`asst_practice`）· P0
**验收标准**
- When 选择“练一个新场景”，Then LUMI 回复并给出 **3 个新场景卡片**：**通用场景 + 用户所在行业相关场景**（行业卡带行业标签）。
- When 点击“🎲 换一批”，Then 重新随机 3 个；用户也可在输入框给明确指令更换。
- When 点击任意场景卡，Then 进入**场景介绍页**（`scene_intro`）。

### F-15 翻译一句话（`asst_translate`）· P0
**验收标准**
- When 选择“翻译一句话”，Then 向 AI 发送翻译指令，LUMI 进入翻译模式并展示示例：你说的话（界面语言）→ 中文（拼音 + 汉字）。
- And 用户可在下方输入框继续输入句子进行翻译。

### F-16 今天学点什么 + 课程链接（`asst_learn`）· P0
**验收标准**
- When 选择“今天学点什么”，Then LUMI 结合目的+行业给出今日可学要点列表。
- And 提供一个跳转课程的链接；When 点击，Then 进入课程页（当前为占位）。

### F-17 课程页（`course`）· P1
**验收标准**
- Then 展示课程 banner（标题/课时/进度）、课程目录（已完成/进行中/未解锁）、继续学习 CTA。
- 说明：当前为占位假数据，仅打通跳转。

### F-18 场景库（`library`）· P1
**验收标准**
- Then 展示搜索框、场景分类、为你推荐（可换一批）。
- When 点击场景，Then 进入**场景介绍页**（`scene_intro`）。

### F-19 我的（`profile`）· P1
**验收标准**
- Then 展示 LUMI 头像、用户名、等级、统计（连续天数/通关场景/经验）、能力雷达、成就、设置入口。

### F-20 多语言 i18n · P0
**验收标准**
- Given 用户已选讲解语言，Then 所有 onboarding 后续页与主应用界面文案以该语言显示。
- And 教学中文与拼音不被翻译；当界面语言为中文时，场景双标自动去重。
- And 原型范围：en/zh 完整，其余回退英文。

---

## 3. 状态模型（前端原型）

| 字段 | 含义 | 采集页 | 默认 |
| --- | --- | --- | --- |
| `name` | 用户名字 | `ask_name` | Alex |
| `lang` | 讲解语言 | `ask_language` | en |
| `purpose` | 学习目的 | `ask_purpose` | work |
| `industry` | 所在行业 | `ask_industry` | nev |
| `scenario` | 当前场景 | recommend/home/library/assistant | interview |
| `asstMode` | 助手模式 | assistant | menu |

---

## 4. 埋点事件表

| 事件 | 触发时机 | 关键属性 |
| --- | --- | --- |
| `onboarding_start` | 进入 welcome | - |
| `onboarding_step_complete` | 完成每一步 | step(name/language/purpose/industry), value |
| `onboarding_finish` | 到达 recommend | name, lang, purpose, industry |
| `scenario_recommend_view` | recommend 展示 | purpose, scenario_ids |
| `scenario_shuffle` | 点击换一批 | purpose |
| `home_view` | 进入首页 | - |
| `lumi_summon` | 唤起助手 | entry(pulldown/hero/tab) |
| `assistant_action` | 选择助手选项 | mode(practice/translate/learn) |
| `assistant_free_input` | 自由输入/语音（产品化） | type(text/voice) |
| `scene_intro_view` | 进入场景介绍页 | scenario_id, source(onboarding/home/library/assistant) |
| `scenario_start` | 点击“开始对话”进入 chat | scenario_id |
| `scenario_continue` | 继续上次的对话 | scenario_id |
| `chat_turn` | 每轮对话（用户发言） | scenario_id, turn_index, eval(word/vocab/pron/expr) |
| `chat_action` | 点翻译/慢速/提示 | scenario_id, action |
| `scenario_finish` | 点“结束”离开（无报告） | scenario_id, turns |
| `course_link_click` | 点击课程链接 | course_id |
| `course_view` | 进入课程页 | course_id |

---

## 5. 边界与异常（节选）
- 名字为空：原型放行用占位名；**产品化需必填校验**。
- 语言未选不可进入下一步（原型中选择即跳转）。
- 行业选“其他”：按通用场景推荐为主。
- 弱网 / AI 超时（产品化）：对话需有加载态与重试。
- 麦克风无权限：语音按钮需引导授权并降级为文本输入。

---

## 6. 与原型的对应关系
所有功能均可在交互原型逐屏验证：打开 `prototype.html`，用顶部下拉框选择对应界面 id，或按真实路径点击体验；在线版：`https://tiffanypei2077-cpu.github.io/cursor/`。
