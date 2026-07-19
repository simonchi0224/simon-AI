# Codex 圖片生成規格 — 0721 台中市議會人事室 AI 工作坊

> 素材路徑：`slides/assets/generated/`
> 視覺語言：延續現有 7 個 SVG 的風格——**抽象漸層 + 幾何線條**，不是照片、不是插畫人物，深色調為主，品牌色 `#e8541e`（橘）/ `#7c6af7`（紫）/ `#0066cc`（藍）/ `#16a34a`（綠）點綴。**圖片本身不要放文字**，文字一律由 HTML 疊上去。

---

## 已完成，不需要生成（5張現有素材待配對）

| 檔名 | 規格 | 建議配對頁面 | 目前狀態 |
|---|---|---|---|
| `taichung-auditorium-bg.svg` | 1600×900 背景版 | AM/PM 封面 cover 頁 | 已生成，還沒接上任何頁面 |
| `public-sector-ai-safety.svg` | 1200×720 插圖版 | AM「AI素養不是背名詞」divider 或 CiviClaw 那組 | 已生成，還沒接上任何頁面 |
| `life-ai-assistant.svg` | 1200×720 插圖版 | PM「生活場景」divider（六情境開場前）| 已生成，還沒接上任何頁面 |
| `auditorium-ai-workshop.svg` | 1200×720 插圖版 | AM「今天的遊戲規則」或講師介紹頁 | 已生成，還沒接上任何頁面 |
| `ai-factory-infrastructure.svg` | 1200×720 插圖版 | PM「OpenClaw：強大與代價」/ NVIDIA工廠頁 | 已生成，還沒接上任何頁面 |

---

## 需要新生成（共 5 張）

---

### 圖片 1：`deepfake-risk-bg.svg`

**對應投影片：** PM「眼見不一定為憑」（深偽 Deepfake 真實案例頁，Arup案例＋台灣本地案例）
**用途：** `.quote-bg` 滿版背景，套 `--bg-img:url('assets/generated/deepfake-risk-bg.svg')`
**尺寸：** viewBox `0 0 1600 900`，`preserveAspectRatio="xMidYMid slice"`

**生成指令：**
```
抽象向量背景，主題是「深偽/AI詐騙的不確定感、真假難辨」。

視覺元素：
- 底色深色漸層，從左上 #070707 過渡到右下帶一點警示暖色 #2a1007 或 #1d1015
- 畫面中央偏右：兩個幾乎重疊但有些微錯位的人臉輪廓線條（line art，不要五官細節，只用簡單的幾何/線條暗示"雙重身份"、"真假疊影"），一個用 #e8541e 描邊、一個用 #7c6af7 描邊，錯位造成 glitch/故障感
- 背景散布細小的雜訊點或掃描線紋理，暗示數位訊號失真
- 右下角或角落可以有一個簡單的「警示」幾何符號（三角形線框，不要驚嘆號文字），用低透明度 #e8541e
- 整體要暗、要有壓迫感但不獵奇，因為背景色會疊加深色遮罩再放白字

技術規格：
viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"，SVG 格式，
用 linearGradient/radialGradient 做漸層，line art 用 stroke 不要 fill 大面積色塊，
畫面偏左 60% 留空（之後左側會疊加白色標題文字），視覺重心放在右側 40%。
不要任何文字或字母。
```

---

### 圖片 2：`civiclaw-case-bg.svg`

**對應投影片：** AM divider「已經有機關真的在做」（CiviClaw 台北市政府案例組開場）
**用途：** `.quote-bg` 滿版背景
**尺寸：** viewBox `0 0 1600 900`，`preserveAspectRatio="xMidYMid slice"`

**生成指令：**
```
抽象向量背景，主題是「政府科技治理、公部門導入AI的穩重感」。

視覺元素：
- 底色深藍到深灰漸層，從左上 #070a12 過渡到右下 #101323（比深偽那張更冷靜、更沉穩，不要暖色警示調）
- 畫面右側：一個簡化的盾牌線條圖形（shield outline），內部用細線畫出網格/電路紋路，暗示「資料保護」，盾牌用 #7c6af7 或 #0066cc 描邊
- 盾牌旁邊或下方，用極簡線條畫幾個小方塊節點、用細線連接（暗示「分級權限」「資料節點」），節點用 #e8541e 小圓點點綴
- 背景可以有極淡的台灣意象線條（例如簡化的建築剪影，如台北101的極簡幾何輪廓，線條要非常細、不搶戲），透明度低於10%
- 整體調性：穩重、專業、政府感，不要太科幻

技術規格：
viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"，SVG 格式，
主視覺放右側40%，左側60%留空給文字，
不要任何文字或字母。
```

---

### 圖片 3：`closing-quote-bg.svg`

**對應投影片：** PM 結尾金句頁「你的判斷，是AI最後的防線」
**用途：** `.quote-bg` 滿版背景（這是全場最後一頁，情緒收尾用）
**尺寸：** viewBox `0 0 1600 900`，`preserveAspectRatio="xMidYMid slice"`

**生成指令：**
```
抽象向量背景，主題是「人的判斷力、溫暖而堅定的收尾感」，這是整場工作坊的最後一頁。

視覺元素：
- 底色深色漸層，從左上 #0f0d0c 過渡到右下帶溫暖橘色調 #2a1007（跟開場封面 taichung-auditorium-bg.svg 的暖色調呼應，首尾呼應）
- 畫面右側：一個簡化的人形輪廓線條（側面或半身剪影，極簡幾何風格，不要具體五官），輪廓線用 #e8541e 或漸層描邊
- 人形輪廓的頭部或胸口位置，有一個小小的發光節點（radialGradient 光暈，#f0b45d 或 #e8541e），暗示「判斷力/決策核心」
- 背景可以有極稀疏的光點/星點效果，營造「重要時刻」的儀式感，但不要太多、不要搶戲
- 整體調性：溫暖、堅定、有力量感，不是冷冰冰的科技感

技術規格：
viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"，SVG 格式，
人形主視覺放右側，左側留空給文字，
不要任何文字或字母。
```

---

### 圖片 4：`ai-discourse-bg.svg`

**對應投影片：** AM divider「AI圈最近在吵什麼」（開場暖身四話題組，全場第一個內容 divider）
**用途：** `.quote-bg` 滿版背景
**尺寸：** viewBox `0 0 1600 900`，`preserveAspectRatio="xMidYMid slice"`

**生成指令：**
```
抽象向量背景，主題是「眾聲喧嘩、話題討論」，這是整場工作坊的開場暖身頁，語氣要輕一點、有活力，不要沉重。

視覺元素：
- 底色深色漸層，從左上 #0f0d0c 過渡到右下 #1e1835（偏紫，跟後面AI基礎設施的橘色調做出區隔）
- 畫面右側：多個大小不一的簡單對話框/氣泡線條輪廓（speech bubble outline，極簡幾何，不要圓角過度卡通），疏密錯落排列，暗示「很多話題同時在討論」
- 對話框輪廓交錯用 #e8541e、#7c6af7、#0066cc 三色描邊，營造多元討論的活潑感
- 背景可以有極稀疏的光點裝飾
- 整體調性：活潑、有話題感，但仍維持專業，不要太卡通

技術規格：
viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"，SVG 格式，
主視覺放右側40%，左側60%留空給文字，
不要任何文字或字母。
```

---

### 圖片 5：`data-privacy-guard.svg`

**對應投影片：** PM「公部門用AI先守住三條線」
**用途：** 內文插圖（非滿版），放在三條線清單旁邊或上方，`object-fit:contain`
**尺寸：** viewBox `0 0 1200 720`

**生成指令：**
```
抽象向量插圖，主題是「三層防護、資安分級」，風格跟現有 public-sector-ai-safety.svg 一致（亮色背景版，不是深色背景版）。

視覺元素：
- 底色淺色漸層，#fbfaf7 到 #f5efe7（跟現有插圖版一致的亮色調）
- 畫面中央：三個同心圓或三層堆疊的盾牌形狀，由外到內分別用 #e8541e、#7c6af7、#16a34a 描邊（暗示三條防線層層把關），線條風格、不要實心色塊
- 最內層中心可以有一個小圖示暗示「人」（極簡的人形符號或決策節點），代表最終還是人在把關
- 整體乾淨、專業、資安感

技術規格：
viewBox="0 0 1200 720"，SVG 格式，
主視覺置中，四周留白，
不要任何文字或字母。
```

---

## HTML 整合說明（Codex 生完後，這步由 Claude Code 執行，不用現在做）

| 圖片 | 整合位置 | 整合方式 |
|---|---|---|
| `taichung-auditorium-bg.svg` | AM/PM `<section class="slide cover">` | 加 `quote-bg` 概念或直接當 cover 背景疊加深色遮罩 |
| `public-sector-ai-safety.svg` | AM「AI素養不是背名詞」divider | `<img>` 插入 divider 內文旁 |
| `life-ai-assistant.svg` | PM「生活場景」divider | `<img>` 插入 divider 內文旁 |
| `auditorium-ai-workshop.svg` | AM「今天的遊戲規則」 | `<img>` 插入內文旁 |
| `ai-factory-infrastructure.svg` | PM「OpenClaw：強大與代價」| `<img>` 插入卡片旁 |
| `deepfake-risk-bg.svg` | PM「眼見不一定為憑」 | 改 `class="slide quote-bg no-auto"` + `--bg-img` |
| `civiclaw-case-bg.svg` | AM「已經有機關真的在做」divider | 改 `class="slide divider quote-bg no-auto"` 或新增背景層 |
| `closing-quote-bg.svg` | PM 結尾金句頁 `bqslide` | 改 `class="slide quote-bg no-auto"` + `--bg-img` |
| `ai-discourse-bg.svg` | AM「AI圈最近在吵什麼」divider | 改 `class="slide divider quote-bg no-auto"` + `--bg-img` |
| `data-privacy-guard.svg` | PM「公部門用AI先守住三條線」| `<img>` 插入清單旁 |

---

## 目標達成盤點：兩份投影片各至少 10 頁有圖片/圖表

**AM（現有 5 頁圖表 + 4 頁新配圖 = 9 頁）**
現有：2張stats-grid數字牆 + 1張vs-tbl比較表 + 2張quote-bg（台積電/公部門手冊）
新增：cover封面（taichung-auditorium-bg）+ AI素養divider（public-sector-ai-safety）+ 遊戲規則頁（auditorium-ai-workshop）+ CiviClaw divider（civiclaw-case-bg）+ 開場話題divider（ai-discourse-bg）
= **共 10 頁** ✅

**PM（現有 4 頁圖表 + 6 頁新配圖 = 10 頁）**
現有：2張stats-grid數字牆 + 2張quote-bg（NVIDIA/？）
新增：cover封面（taichung-auditorium-bg）+ 生活場景divider（life-ai-assistant）+ OpenClaw頁（ai-factory-infrastructure）+ 深偽案例頁（deepfake-risk-bg）+ 結尾金句頁（closing-quote-bg）+ 三條線頁（data-privacy-guard）
= **共 10 頁** ✅

---

*規格由 Claude Code 整理，2026.07.18*
