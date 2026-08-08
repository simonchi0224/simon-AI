/*
 * 講師控制台｜種子資料
 * 這是唯一需要編輯的資料檔。新增課程／段落／提示語都在這裡改，不用動畫面程式。
 * 型別說明（純 JS 註解，非真正 TypeScript，方便直接在瀏覽器載入不需編譯）：
 *
 * Course   { id, title, audience, date, time, location, tags[], version, updatedAt, summary, resources[], sessions[] }
 * Session  { id, title, durationMinutes, objective, outputs[], resources[], segments[] }
 * Segment  { title, minutes, range, mode('intro'|'lecture'|'demo'|'exercise'|'review'), speakerNotes, studentInstruction, resources[], promptIds[], checklist[] }
 * Resource { title, type('slides'|'doc'|'folder'|'sheet'|'site'|'tool'), description, url, openMode('newtab'), revealSession }
 *   revealSession：這個資源最早在第幾堂才可以對學員公開／發放。1 代表課前或第一堂即可用。
 *   講師模式在還沒到那一堂時，會用鎖頭圖示標示，避免提早開錯連結。
 * Prompt   { id, title, body, tool, tags[], usageNote, courseIds[] }
 */

const SLIDES_BASE = "../講座資料/20260820_台東_史前博物館AI工作坊/slides/";
const TEMPLATE_BASE = "../講座資料/AI工作流程實作工作坊_通用教案模板/";
const DRIVE_SESSION1 = "https://drive.google.com/drive/folders/1VLrTNJwRaWPwKsxELfYEqnpJMe20ju_y";
const DRIVE_SESSION2PLUS = "https://drive.google.com/drive/folders/170TPUIDsWRxZz8zZjO13pTCS3OUJlsWY";

const PROMPT_PREFIX = {
  id: "prefix",
  title: "使用前共同前綴（每次新對話先貼這段）",
  body: "你是我的工作整理助手。請只依據我提供的資料處理；資料不足或彼此矛盾時，請標記【待確認】並列出原因，不要自行補寫。輸出前請先檢查是否出現未提供的名稱、數字、日期、承諾或規則。",
  tool: "ChatGPT / Gemini",
  tags: ["通用前綴"],
  usageNote: "每一組開始操作 AI 前，先貼這段當作系統設定，能大幅降低 AI 自行補資料的機率。",
  courseIds: ["ai-workflow-0820"]
};

const PROMPTS = [
  PROMPT_PREFIX,
  {
    id: "p1-task-map",
    title: "任務拆解｜整理成任務地圖",
    body: "請將以下交辦與背景資料整理成任務地圖，欄位包含：目標、受眾、交付物、工作項目、優先順序、時程與限制、待確認事項、建議下一步。請用表格輸出。",
    tool: "ChatGPT / Gemini",
    tags: ["任務釐清"],
    usageNote: "第1堂示範＋分組實作核心提示語。貼上主管交辦信＋背景資料後使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p2-data-gap",
    title: "資料缺口與確認問題",
    body: "請從以下資料找出所有會影響執行或對外溝通的資訊缺口。依「一定要先確認／可在執行中確認／可暫不處理」分類，並替每個問題寫出最適合詢問的對象。",
    tool: "ChatGPT / Gemini",
    tags: ["資料查核", "任務釐清"],
    usageNote: "資料查核角色的主力提示語，任何一堂資料矛盾時都可以用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p3-confirm-letter",
    title: "主管確認信",
    body: "依據以下任務地圖草擬一封寄給主管的確認信。信中要包含目前理解、待確認事項、預計下一步與需要主管決定之處；語氣正式、清楚，不要替主管做未授權的決定。",
    tool: "ChatGPT / Gemini",
    tags: ["正式信件"],
    usageNote: "第1堂交件 B。任務地圖完成後直接接續使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p4-vendor-email",
    title: "合作單位電子郵件",
    body: "請將以下專案資料寫成一封給合作單位的正式電子郵件。先列出需要對方確認或提供的事項，再寫信件。主旨要可讓人一眼辨識目的，信末要有明確回覆或行動要求。",
    tool: "ChatGPT / Gemini",
    tags: ["正式信件", "角色扮演"],
    usageNote: "第2堂三份文字成果之一。可換成「請以遠景科技行政人員身分」等角色扮演開頭。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p5-memo-draft",
    title: "公文／簽核文字初稿",
    body: "請以正式、中性、可供承辦調整的文字，整理以下資料為公文或簽核說明初稿。請區分背景、目的、辦理方式、需要協助或裁示事項。來源未確認的內容請保留【待確認】標記。",
    tool: "ChatGPT / Gemini",
    tags: ["公告文字", "正式信件"],
    usageNote: "第2堂交件之一，公部門／企業簽核情境皆可用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p6-announcement-faq",
    title: "對外公告與 FAQ",
    body: "請把以下資料改寫為對外公告，讀者是第一次接觸本單位的一般民眾。輸出：18 字內標題、120 至 180 字公告、三題常見問答，以及發布前仍須確認的資料清單。",
    tool: "ChatGPT / Gemini",
    tags: ["公告文字"],
    usageNote: "第2堂交件 C。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p7-meeting-tracker",
    title: "會議紀錄與追蹤表",
    body: "請整理以下會議筆記。先將內容分類為背景、討論、決議、待辦、待裁示與未確認。再輸出會議摘要與追蹤表，欄位為事項、負責人、期限、目前狀態、風險／需協助。不可把討論意見當作決議。",
    tool: "ChatGPT / Gemini",
    tags: ["會議摘要", "待辦追蹤"],
    usageNote: "第3堂核心提示語，貼上模擬會議筆記後使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p8-followup-letter",
    title: "會後確認信",
    body: "請依據以下會議結論草擬會後確認信，分成「已確認決議」「各方待辦」「待主管裁示」三段。語氣客觀，讓未參加會議的人也能看懂下一步。",
    tool: "ChatGPT / Gemini",
    tags: ["正式信件", "會議摘要"],
    usageNote: "第3堂交件 C，接續會議摘要與追蹤表之後使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p9-exec-deck",
    title: "主管簡報大綱",
    body: "請把以下任務地圖、會議摘要與追蹤表整理成五頁主管簡報。每頁請列出頁面標題、核心訊息、三至五個重點，以及建議圖表或視覺。最後一頁須清楚寫出需要主管做的決定。",
    tool: "ChatGPT / Gemini",
    tags: ["簡報架構"],
    usageNote: "第4堂核心提示語，把前三堂成果整段貼入使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p10-poster-spec",
    title: "海報內容規格",
    body: "請依據以下資料規劃活動海報。輸出主標題三個版本、副標、對象、亮點、必要資訊欄位、行動指引、視覺方向與發布前檢查清單。資料缺漏請先標記，勿自行補寫。",
    tool: "ChatGPT / Gemini",
    tags: ["海報文案"],
    usageNote: "第4堂交件 B。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p11-fact-check",
    title: "事實核對三欄表",
    body: "以下是 AI 產出的草稿與原始資料。請逐項比對，做成三欄表：草稿中的主張、原始資料是否支持、建議修正。請特別檢查名稱、數字、日期、資格、費用、地點、規則與對外承諾。",
    tool: "ChatGPT / Gemini",
    tags: ["資料查核", "實作成果檢查"],
    usageNote: "任何一堂交件前都可以用，適合資料查核角色收尾檢查。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p12-personal-template",
    title: "個人工作模板產生器",
    body: "我經常需要處理以下工作情境：[填入情境]。請依我的流程設計一個可重複使用的提示詞模板，分成「先提供的資料」「要 AI 完成的任務」「指定輸出格式」「最後人工檢查項目」四部分。",
    tool: "ChatGPT / Gemini",
    tags: ["活動企劃", "語氣改寫"],
    usageNote: "課程最後「個人帶回工作的一張卡」環節使用，讓學員把課堂方法轉成自己的模板。",
    courseIds: ["ai-workflow-0820"]
  }
];

const COURSES = [
  {
    id: "ai-workflow-0820",
    title: "AI 公務效率實作工作坊：從交辦任務到可交付成果",
    audience: "國立臺灣史前文化博物館場（人數/職務待確認；課堂練習情境為虛構企業「遠景科技」，與史前館本身業務無關）",
    date: "2026-08-20（四）",
    time: "上午 2 堂（各 80–85 分）／下午 2 堂（各 80 分），15:50 結束（確切鐘點待確認）",
    location: "待確認",
    tags: ["AI工作坊", "公務效率", "通用版教案"],
    version: "V1",
    updatedAt: "2026-08-08",
    summary: "共用情境：遠景科技股份有限公司辦理「2026 員工家庭日」。學員扮演跨部門籌備小組，逐步處理混亂的主管信件、去年資料、會議筆記、廠商詢價、預算與中途變更，四堂課結束時交出一套能交給主管的專案成果包。",
    resources: [
      { title: "講師入口｜投影片站", type: "site", description: "AM/PM 投影片、提示語全集、工具手冊的總入口", url: SLIDES_BASE + "index.html", openMode: "newtab", revealSession: 1 },
      { title: "學員課前網站", type: "site", description: "課前發給學員的頁面", url: "../lectures/20260820.html", openMode: "newtab", revealSession: 1 },
      { title: "通用版完整教案 V1", type: "doc", description: "四堂課完整教學設計、講師示範提示詞、評量標準", url: TEMPLATE_BASE + "通用版完整教案V1.md", openMode: "newtab", revealSession: 1 },
      { title: "學員實作手冊 SOP（範例版）", type: "doc", description: "遠景科技情境的操作 SOP 草稿，實際內容以 Drive 任務包為準", url: TEMPLATE_BASE + "學員實作手冊SOP_遠景科技範例.md", openMode: "newtab", revealSession: 1 },
      { title: "課程總覽", type: "doc", description: "本場次的行政資訊、待確認事項清單", url: "../講座資料/20260820_台東_史前博物館AI工作坊/課程總覽.txt", openMode: "newtab", revealSession: 1 },
      { title: "Drive｜第一堂原始資料", type: "folder", description: "主管交辦信、去年紀錄、場地資訊、會議筆記、預算表——第一堂課前發給學員下載", url: DRIVE_SESSION1, openMode: "newtab", revealSession: 1 },
      { title: "Drive｜第二堂起補充資料", type: "folder", description: "主管與部門來信串、報名人數、廠商詢價、抽獎品、預算草稿，含第三堂後才發放的變更通知", url: DRIVE_SESSION2PLUS, openMode: "newtab", revealSession: 2 }
    ],
    sessions: [
      {
        id: "s1",
        title: "第1堂．把模糊交辦，變成可執行的任務",
        durationMinutes: 80,
        objective: "能辨識主管交辦中的目標、受眾、交付物、期限、限制與未知問題；能要求 AI 依指定欄位整理資料；能完成任務地圖與向主管確認的正式信件初稿。",
        outputs: ["一頁式任務地圖", "工作優先順序（立即處理／等待確認／可後續處理）", "主管確認信"],
        resources: [
          { title: "上午場投影片", type: "slides", description: "第1–2堂投影片", url: SLIDES_BASE + "slide-AM.html", openMode: "newtab", revealSession: 1 },
          { title: "提示語全集", type: "site", description: "本堂提示語（待內容補齊後上線）", url: SLIDES_BASE + "exercises.html", openMode: "newtab", revealSession: 1 }
        ],
        segments: [
          {
            title: "開場：發下任務包", minutes: 10, range: "0–10", mode: "intro",
            speakerNotes: "發下任務包，請各組先用兩分鐘說出「我們現在被交辦什麼」。",
            studentInstruction: "討論並回答：哪一句最不清楚？哪個資訊一旦錯了，後面全部都會重做？",
            resources: [], promptIds: [],
            checklist: ["每組都拿到任務包（Drive 第一堂原始資料）"]
          },
          {
            title: "方法：任務拆解六格", minutes: 15, range: "10–25", mode: "lecture",
            speakerNotes: "講解任務拆解六格：目標、對象、交付物、限制、時程、待確認事項。說明 AI 在這裡是協助整理，不會替你決定真正的優先順序。",
            studentInstruction: "先聽方法，不急著操作 AI。",
            resources: [], promptIds: [],
            checklist: []
          },
          {
            title: "示範：任務地圖＋確認信", minutes: 15, range: "25–40", mode: "demo",
            speakerNotes: "用主管信與舊資料，示範先貼資料、要求不補寫、輸出六格任務地圖，再請 AI 草擬確認信。示範一次把過度武斷的句子改成「目前理解如下，請確認」。",
            studentInstruction: "跟著看示範的四個畫面：原始資料、指令、AI回答、人工修正。",
            resources: [], promptIds: ["prefix", "p1-task-map", "p3-confirm-letter"],
            checklist: []
          },
          {
            title: "分組實作：任務地圖＋確認信", minutes: 35, range: "40–75", mode: "exercise",
            speakerNotes: "巡組時只問：資料出處在哪裡？這件事誰要決定？你們要交給誰看？",
            studentInstruction: "完成任務地圖、工作項目排序、三個待確認問題與主管確認信。",
            resources: [
              { title: "Drive｜第一堂原始資料", type: "folder", description: "本堂唯一資料來源", url: DRIVE_SESSION1, openMode: "newtab", revealSession: 1 }
            ],
            promptIds: ["prefix", "p1-task-map", "p3-confirm-letter"],
            checklist: ["六格皆有內容，待確認項目不得被 AI 虛構答案取代", "工作優先順序至少三個層次", "確認信讓主管能快速回覆或裁示"]
          },
          {
            title: "收束：風險一句話", minutes: 5, range: "75–80", mode: "review",
            speakerNotes: "各組用一句話說出本組最容易被忽略的風險，將成果存入成果資料夾。",
            studentInstruction: "一句話分享＋存檔。",
            resources: [], promptIds: [],
            checklist: []
          }
        ]
      },
      {
        id: "s2",
        title: "第2堂．讓不同對象，都收到清楚而合適的文字",
        durationMinutes: 80,
        objective: "能區分內部確認、跨單位合作與對外公告的訊息重點與語氣；能運用 AI 將長資料轉成電子郵件、公文或簽核說明、公告與常見問答；能對 AI 產出的承諾、名稱、規則、時間與數字進行人工核對。",
        outputs: ["合作單位電子郵件", "公文／簽核說明初稿", "對外公告＋三題常見問答"],
        resources: [
          { title: "上午場投影片", type: "slides", description: "第1–2堂投影片", url: SLIDES_BASE + "slide-AM.html", openMode: "newtab", revealSession: 1 }
        ],
        segments: [
          {
            title: "回顧：挑一件要對外溝通的事", minutes: 10, range: "0–10", mode: "intro",
            speakerNotes: "請各組從第一堂任務地圖中挑出一件需要對外溝通的事，問：不同對象最在意什麼？",
            studentInstruction: "回顧第1堂任務地圖，挑一件事。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "方法：對象／目的／必要資訊／語氣／下一步", minutes: 15, range: "10–25", mode: "lecture",
            speakerNotes: "介紹五格寫作框架。用一個活動名額調整的例子，示範主管說明、合作信件與民眾公告會怎麼不同。",
            studentInstruction: "先聽方法。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "示範：同一份資料轉三種文字", minutes: 15, range: "25–40", mode: "demo",
            speakerNotes: "將同一份活動資料依序轉為合作單位電子郵件、簽核說明或公文文字、對外公告和三題常見問答；示範要求 AI 自行列出資訊缺口。",
            studentInstruction: "跟著看示範。",
            resources: [], promptIds: ["prefix", "p4-vendor-email", "p5-memo-draft", "p6-announcement-faq"],
            checklist: []
          },
          {
            title: "分組實作：三份文字成果", minutes: 35, range: "40–75", mode: "exercise",
            speakerNotes: "完成後互換給另一組用「讀者看不看得懂」檢查。",
            studentInstruction: "完成三份文字成果，並互換另一組檢查。",
            resources: [
              { title: "Drive｜第二堂起補充資料", type: "folder", description: "主管與部門來信串、廠商詢價等", url: DRIVE_SESSION2PLUS, openMode: "newtab", revealSession: 2 }
            ],
            promptIds: ["prefix", "p4-vendor-email", "p5-memo-draft", "p6-announcement-faq"],
            checklist: ["合作單位信主旨清楚，有目的／要對方做什麼／回覆期限或待確認欄位", "公文／簽核初稿保留可調整的事實文字", "公告與FAQ讀者一眼找到參加對象、內容、方式、聯絡窗口"]
          },
          {
            title: "收束：AI寫太滿或太空的地方", minutes: 5, range: "75–80", mode: "review",
            speakerNotes: "每組分享一處 AI 寫得太滿或太空的地方，以及他們怎麼修。",
            studentInstruction: "一句話分享。",
            resources: [], promptIds: [], checklist: []
          }
        ]
      },
      {
        id: "s3",
        title: "第3堂．會議結束後，讓事情真的往下走",
        durationMinutes: 80,
        objective: "能將模糊會議筆記整理成會議摘要、決議、待辦、負責人、期限與待裁示事項；能做出可持續更新的工作追蹤表；能以會後確認信降低認知落差與責任不清。",
        outputs: ["一頁式會議摘要", "工作追蹤表", "會後確認信", "一項待主管決定的風險事項"],
        resources: [
          { title: "下午場投影片", type: "slides", description: "第3–4堂投影片", url: SLIDES_BASE + "slide-PM.html", openMode: "newtab", revealSession: 1 }
        ],
        segments: [
          {
            title: "引導：找出討論／定案／沒負責人", minutes: 10, range: "0–10", mode: "intro",
            speakerNotes: "拿出一段故意混亂的會議筆記，請大家找出哪些只是討論、哪些已經定案、哪些根本沒有負責人。",
            studentInstruction: "討論。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "方法：會議整理五欄", minutes: 15, range: "10–25", mode: "lecture",
            speakerNotes: "介紹會議整理五欄：結論／決議、待辦事項、負責人、期限、風險或待裁示。提醒「有人提議」不代表「已決議」。",
            studentInstruction: "先聽方法。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "示範：會議摘要＋追蹤表＋會後信", minutes: 15, range: "25–40", mode: "demo",
            speakerNotes: "請 AI 先分辨資訊類型，再輸出表格；接著要求它列出矛盾、缺少責任人與需要主管決定之處。最後草擬會後確認信。",
            studentInstruction: "跟著看示範。",
            resources: [], promptIds: ["prefix", "p7-meeting-tracker", "p8-followup-letter"],
            checklist: []
          },
          {
            title: "分組實作：整理會議＋處理變更卡", minutes: 35, range: "40–75", mode: "exercise",
            speakerNotes: "整理模擬會議筆記，完成一頁摘要、追蹤表、會後信與一項待主管裁示的風險。中途發下變更卡，要求更新一項待辦。",
            studentInstruction: "完成一頁式會議摘要、工作追蹤表、會後確認信、一項風險事項；拿到變更卡後更新追蹤表。",
            resources: [
              { title: "Drive｜活動變更通知（本堂後發放）", type: "folder", description: "場地取消＋預算下修的中途變更卡，本堂尾聲才公開給學員", url: DRIVE_SESSION2PLUS, openMode: "newtab", revealSession: 3 }
            ],
            promptIds: ["prefix", "p7-meeting-tracker", "p8-followup-letter"],
            checklist: ["討論與決議有分開", "每個待辦有負責人與期限，或清楚標示待確認", "列出至少一項可能影響預算、場地或時程的風險"]
          },
          {
            title: "收束：最可能延誤專案的是什麼", minutes: 5, range: "75–80", mode: "review",
            speakerNotes: "請各組用一句話說明「現在最可能延誤專案的是什麼」，並指出應由誰決定。",
            studentInstruction: "一句話分享。",
            resources: [], promptIds: [], checklist: []
          }
        ]
      },
      {
        id: "s4",
        title: "第4堂．把工作成果，整理成簡報與對外視覺",
        durationMinutes: 80,
        objective: "能把任務地圖、溝通文字與會議追蹤資訊整理成清楚的簡報敘事；能使用 AI 協助產出簡報大綱、每頁重點、海報文字與視覺方向；能在發布前檢查事實、資訊層級與行動指引。",
        outputs: ["五頁主管簡報大綱", "海報初稿內容", "150 字以內對外說明"],
        resources: [
          { title: "下午場投影片", type: "slides", description: "第3–4堂投影片", url: SLIDES_BASE + "slide-PM.html", openMode: "newtab", revealSession: 1 }
        ],
        segments: [
          {
            title: "引導：主管與民眾各自要先看到什麼", minutes: 10, range: "0–10", mode: "intro",
            speakerNotes: "問大家主管打開一份簡報時，最需要在一分鐘內知道什麼？再問民眾看到海報時，會先找哪一個資訊。",
            studentInstruction: "討論。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "方法：簡報五頁骨架／海報五格", minutes: 15, range: "10–25", mode: "lecture",
            speakerNotes: "介紹主管簡報五頁骨架：目的與背景、現況與需求、方案與工作安排、風險與需要決策、下一步。介紹海報五格：主標、對象與價值、必要資訊、行動方式、聯絡窗口。",
            studentInstruction: "先聽方法。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "示範：簡報大綱＋海報規格", minutes: 15, range: "25–40", mode: "demo",
            speakerNotes: "把前三堂成果貼入 AI，要求先提出簡報邏輯，再展開每頁要點；接著將公告改成海報文字規格與視覺提示。示範把一段太長的海報文案砍到讀者看得完。",
            studentInstruction: "跟著看示範。",
            resources: [], promptIds: ["prefix", "p9-exec-deck", "p10-poster-spec"],
            checklist: []
          },
          {
            title: "分組實作：簡報＋海報＋對外說明", minutes: 30, range: "40–70", mode: "exercise",
            speakerNotes: "完成五頁主管簡報大綱、一張海報初稿內容與 150 字內對外說明。",
            studentInstruction: "完成五頁主管簡報大綱、海報初稿內容、150字以內對外說明。",
            resources: [], promptIds: ["prefix", "p9-exec-deck", "p10-poster-spec"],
            checklist: ["主管能從前兩頁看懂要決定什麼", "海報只用已確認資訊", "對外說明150字內，讀者知道是什麼、跟誰有關、下一步怎麼做"]
          },
          {
            title: "成果分享與互評", minutes: 10, range: "70–80", mode: "review",
            speakerNotes: "每組一分鐘，依「資料是否正確、訊息是否清楚、下一步能否執行」三項標準互評；最後收斂成可帶回工作的流程。",
            studentInstruction: "1分鐘分享＋用三項標準互評別組。",
            resources: [], promptIds: ["p11-fact-check"], checklist: []
          }
        ]
      }
    ]
  }
];

const MODE_LABEL = { intro: "開場", lecture: "方法", demo: "示範", exercise: "分組實作", review: "收束" };
