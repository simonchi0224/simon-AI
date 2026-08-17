/*
 * 講師控制台｜種子資料
 * 這是唯一需要編輯的資料檔。新增課程／段落／提示語都在這裡改，不用動畫面程式。
 * 型別說明（純 JS 註解，非真正 TypeScript，方便直接在瀏覽器載入不需編譯）：
 *
 * Course   { id, title, audience, date, time, location, tags[], version, updatedAt, summary, resources[], sessions[] }
 * Session  { id, title, timeLabel, durationMinutes, objective, outputs[], resources[], segments[] }
 *   timeLabel：這堂課的實際鐘點時間（例如 "09:10–10:30"），選填，未定案時可省略。
 * Segment  { title, minutes, range, mode('intro'|'lecture'|'demo'|'exercise'|'review'), speakerNotes, studentInstruction, resources[], promptIds[], checklist[] }
 * Resource { title, type('slides'|'doc'|'folder'|'sheet'|'site'|'tool'), description, url, openMode('newtab'), revealSession }
 *   revealSession：這個資源最早在第幾堂才可以對學員公開／發放。1 代表課前或第一堂即可用。
 *   講師模式在還沒到那一堂時，會用鎖頭圖示標示，避免提早開錯連結。
 * Prompt   { id, title, body, tool, tags[], usageNote, courseIds[] }
 */

const SLIDES_BASE = "../講座資料/20260820_台東_史前博物館AI工作坊/slides/";
const TEMPLATE_BASE = "../講座資料/AI工作流程實作工作坊_通用教案模板/";
const DRIVE_SESSION1 = "https://drive.google.com/drive/folders/1VLrTNJwRaWPwKsxELfYEqnpJMe20ju_y";

const PROMPT_PREFIX = {
  id: "prefix",
  title: "使用前共同前綴（每次新對話先貼這段）",
  body: "你是我的工作整理助手。請只依據我提供的資料處理；資料不足或彼此矛盾時，請標記【待確認】並列出原因，不要自行補寫。輸出前請先檢查是否出現未提供的名稱、數字、日期、承諾或規則。",
  tool: "ChatGPT / Gemini",
  tags: ["通用前綴"],
  usageNote: "每一組開始操作 AI 前，先貼這段當作系統設定，能大幅降低 AI 自行補資料的機率。",
  courseIds: ["ai-workflow-0820"]
};

// PROMPTS 內容於 2026-08-10 對照 slides/exercises.html 逐字同步——
// 這是學員實際會看到的提示語版本，兩邊不可各講各話。改任何一邊都要記得同步另一邊。
const PROMPTS = [
  PROMPT_PREFIX,
  {
    id: "p1-task-map",
    title: "任務地圖初稿",
    body: "你是【單位／專案】的行政協作人員。以下是主管交辦信、背景資料與會議筆記。請只根據我提供的資料整理，不要自行補人數、預算、日期或活動內容。\n\n請輸出：\n1. 目前目的與對象\n2. 已確認條件\n3. 待確認問題（問題／為什麼要確認／建議詢問對象）\n4. 接下來 10 個工作天要先做的工作，依優先順序排列\n\n資料如下：\n【貼上你們先整理過的資料】",
    tool: "ChatGPT / Gemini",
    tags: ["任務釐清"],
    usageNote: "先由小組整理資料再貼入；每個數字都要能指出來源。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p2-confirm-letter",
    title: "主管確認信",
    body: "請根據以下任務地圖，寫一封寄給主管的確認信。主旨要清楚；內文依序寫背景、目前已知條件、3 個需要裁示的問題、方向確認後的下一步。語氣專業簡潔，不要把待確認事項寫成已定案。",
    tool: "ChatGPT / Gemini",
    tags: ["正式信件"],
    usageNote: "第1堂交件 B。任務地圖完成後直接接續使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p3-formal-email",
    title: "正式信件",
    body: "請依照下面資料，寫一封寄給【對象】的正式電子郵件。語氣清楚、禮貌、不要太長，也不要自行補資料。\n\n信件目的：＿＿＿＿\n對方需要回覆／執行：＿＿＿＿\n已知條件：＿＿＿＿\n尚待確認或需要對方說明：＿＿＿＿\n\n請輸出主旨、完整信件，最後列出寄出前必須確認的 3 件事。",
    tool: "ChatGPT / Gemini",
    tags: ["正式信件"],
    usageNote: "第2堂交件之一，換對象／目的即可重複使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p4-announcement-faq",
    title: "公告與 FAQ",
    body: "請把以下「已確認資訊」改寫成給【受眾】看的活動公告，語氣清楚、友善、150 字內。另列出 3 題常見問答。\n\n限制：未確認的日期、地點、預算、報名方式不得自行補寫；需要保留時請寫「後續公告」。",
    tool: "ChatGPT / Gemini",
    tags: ["公告文字"],
    usageNote: "第2堂交件之一。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p5-meeting-tracker",
    title: "會議摘要與追蹤表",
    body: "以下是會議筆記與後續信件。請只整理資料裡明確出現的內容，不要推測或補人名、期限。\n\n請輸出：\n1. 100 字內會議摘要\n2. 已確認決議\n3. 待確認／需要主管裁示\n4. 工作追蹤表：工作項目｜負責人｜期限｜目前狀態｜依據或備註\n5. 最多 3 項風險提醒\n\n資料如下：【貼上資料】",
    tool: "ChatGPT / Gemini",
    tags: ["會議摘要", "待辦追蹤"],
    usageNote: "第3堂核心提示語，貼上模擬會議筆記後使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p6-followup-letter",
    title: "會後確認信",
    body: "請根據以下會議摘要與工作追蹤表，寫一封會後確認信。請分開列出已確認事項、待確認事項、各項工作；請與會者在【期限】前回覆修正或認領未定工作。",
    tool: "ChatGPT / Gemini",
    tags: ["正式信件", "會議摘要"],
    usageNote: "第3堂交件，接續會議摘要與追蹤表之後使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p7-exec-deck",
    title: "五頁主管簡報大綱",
    body: "你是【單位】的專案承辦人。請根據以下已確認資料與待決策事項，整理一份 5 頁主管簡報大綱。\n\n每一頁請輸出：頁面標題、這頁要回答的問題、3–5 點內容、建議使用的圖表或資料呈現方式。\n\n限制：未確認資訊請標示「需決策／待確認」，不要寫成定案。\n資料如下：【貼上小組整理內容】",
    tool: "ChatGPT / Gemini",
    tags: ["簡報架構"],
    usageNote: "第4堂核心提示語，把前三堂成果整段貼入使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p8-poster-summary",
    title: "海報與 150 字對外說明",
    body: "請根據以下已確認資訊，產出一張活動海報的內容稿與 150 字內對外說明。海報至少有：活動名稱、對象、時間／地點／報名方式（僅在已確認時）、一句說明、聯絡窗口。\n\n沒有資料時請標示「後續公告」，不得自行補寫。",
    tool: "ChatGPT / Gemini",
    tags: ["海報文案"],
    usageNote: "第4堂交件，五頁簡報大綱完成後接續使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p9-universal-template",
    title: "萬用 Prompt 模板",
    body: "我是【單位／職稱】，要處理【這件事的背景】。\n對象是【誰會看到這個內容】。\n請幫我完成【具體任務】，並寫成【格式：信件／摘要／條列／表格】。\n語氣要【正式／親切／簡潔】，篇幅【字數或篇幅限制】。\n\n限制：只使用我提供的資料；沒有資料請標示【待確認】，不要自行補寫。",
    tool: "ChatGPT / Gemini",
    tags: ["通用模板", "提示技巧"],
    usageNote: "改編自台中市議會場。任何工作開始前，可先用此結構把需求說清楚。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p10-project-brief",
    title: "計畫書／專案草稿骨架",
    body: "我是【單位】承辦人，要撰寫【活動／計畫名稱】的初稿。\n已知資料：目的【】、對象【】、時間地點【】、可用資源／預算【】、限制【】。\n\n請依序輸出：\n1. 緣起與目的\n2. 辦理方式與時程\n3. 角色分工與所需資源\n4. 預期效益\n5. 待確認事項與風險\n\n請用正式但易讀的文字；沒有來源的數字、日期與承諾請標示【待確認】。",
    tool: "ChatGPT / Gemini",
    tags: ["計畫書", "專案"],
    usageNote: "改編自台中市議會場的計畫書草稿結構。適合先搭骨架，不可直接當正式核定文件。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p11-tone-rewrite",
    title: "語氣改寫與讀者版本",
    body: "請將以下內容改寫成給【讀者】看的版本。\n讀者目前最需要知道：【】\n希望他下一步做：【】\n語氣：【正式／親切／簡潔】；長度：【】。\n\n請先列出哪些資訊不適合對此讀者公開，再提供改寫稿。不得補寫名稱、日期、數字、規則或承諾。\n\n原始內容：\n【貼上內容】",
    tool: "ChatGPT / Gemini",
    tags: ["語氣改寫", "對象"],
    usageNote: "同一份資訊需要寫給主管、合作方與一般讀者時使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p12-multi-channel-copy",
    title: "活動資訊一次產出多種版本",
    body: "以下是已確認的活動資訊：【時間、地點、對象、亮點、報名方式、聯絡窗口】。\n\n請分別產出：\n1. 200 字內正式新聞稿／網站公告\n2. 120 字內社群貼文\n3. 60 字內 LINE 或簡訊通知\n4. 12 字內海報主標題 3 個版本\n\n每一版都要符合讀者與平台特性；沒有確認的資訊請省略或寫「後續公告」。",
    tool: "ChatGPT / Gemini",
    tags: ["活動文案", "多平台"],
    usageNote: "改編自台中市議會場。一次產出前，先確認來源資訊都已核定。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p13-public-research",
    title: "公開資料研究／比較表",
    body: "請整理【主題】的公開資訊。\n範圍：【地區／期間／指定官方網站】。\n比較欄位：【欄位名稱】。\n\n請輸出：\n1. 比較表\n2. 300 字內摘要\n3. 每一項資料的來源連結與日期\n4. 資料矛盾、缺漏或需要人工確認之處\n\n限制：僅使用公開資料；不處理個資；遇到矛盾請並列，不自行判定。",
    tool: "Gemini / Perplexity / Manus",
    tags: ["研究", "比較表", "Agent"],
    usageNote: "改編自台中市議會場的 Agent 任務說明書。交給代理型工具前，要先設定資料範圍與驗收點。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p14-fact-check",
    title: "事實核對三欄表",
    body: "以下是 AI 草稿與原始資料。請逐項比對，做成三欄表：\n「草稿中的主張｜原始資料是否支持｜建議修正」。\n\n請特別檢查名稱、日期、數字、費用、資格、地點、規則、引用與對外承諾。若找不到來源，請標示【待確認】而不是猜測。\n\n【AI 草稿】\n【原始資料】",
    tool: "ChatGPT / Gemini",
    tags: ["資料查核", "品質檢查"],
    usageNote: "所有公開或需交付的 AI 草稿，完成前都可使用。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p15-next-actions",
    title: "把零散待辦排成下一步",
    body: "以下是我目前零散的待辦、訊息與限制。請不要替我決定最終優先順序，而是整理成：\n1. 立即處理／本週處理／等待確認／可延後 四類\n2. 每項工作的下一個最小行動\n3. 需要詢問的人或缺少的資料\n4. 建議的工作時段與預估時間\n\n若資訊不足，請先列問題，不要自行假設期限或負責人。\n\n【貼上待辦】",
    tool: "ChatGPT / Gemini",
    tags: ["待辦整理", "時間管理"],
    usageNote: "適合把會議後、訊息裡與腦中的零散工作先整理成可行動清單。",
    courseIds: ["ai-workflow-0820"]
  },
  {
    id: "p16-personal-template",
    title: "個人可重複使用模板",
    body: "我經常需要處理【工作情境】。請依我的流程設計一個可重複使用的提示語模板，分成：\n1. 先提供的資料\n2. 要 AI 完成的任務\n3. 指定輸出格式\n4. 最後人工檢查項目\n\n請用可直接複製的挖空格式，並提醒我此情境最常見的資料安全、事實或責任風險。",
    tool: "ChatGPT / Gemini",
    tags: ["工作模板", "課後延伸"],
    usageNote: "把課堂上一次成功的操作，變成日後可重複使用的工作資產。",
    courseIds: ["ai-workflow-0820"]
  }
];

const COURSES = [
  {
    id: "ai-workflow-0820",
    title: "老闆沒說但你一定要會：如何用 AI 實現準時下班的快樂研習",
    audience: "國立臺灣史前文化博物館場（人數/職務待確認；課堂練習情境為虛構企業「遠景科技」，與史前館本身業務無關）",
    date: "2026-08-20（四）",
    time: "08:40 報到／09:00 開場／09:10–11:50 上午第 1–3 節（10:00 休息一次）／13:30 下午報到／13:40–16:20 下午第 5–7 節（14:30 休息一次；最後 5 分鐘回饋）",
    location: "國立臺灣史前文化博物館 2058 會議室",
    tags: ["AI工作坊", "職場實作", "通用版教案"],
    version: "V1",
    updatedAt: "2026-08-10",
    summary: "以虛構的遠景科技「2026 員工家庭日」情境，練習把交辦、信件、會議與成果整理成可交付的工作流程；上午、下午各只休息一次 10 分鐘，下午第 7 節最後五分鐘完成回饋，16:20 準時結束。",
    resources: [
      { title: "講師入口｜投影片站", type: "site", description: "AM/PM 投影片、提示語全集、工具手冊的總入口", url: SLIDES_BASE + "index.html", openMode: "newtab", revealSession: 1 },
      { title: "學員課前網站", type: "site", description: "課前發給學員的頁面", url: "../lectures/20260820.html", openMode: "newtab", revealSession: 1 },
      { title: "AI 工具速查手冊", type: "site", description: "34 個 AI 工具＋官方連結、任務×工具地圖、公務資料安全提醒", url: SLIDES_BASE + "handout.html", openMode: "newtab", revealSession: 1 },
      { title: "通用版完整教案 V1", type: "doc", description: "四堂課完整教學設計、講師示範提示詞、評量標準", url: TEMPLATE_BASE + "通用版完整教案V1.md", openMode: "newtab", revealSession: 1 },
      { title: "學員實作手冊 SOP（範例版）", type: "doc", description: "遠景科技情境的操作 SOP 草稿，實際內容以 Drive 任務包為準", url: TEMPLATE_BASE + "學員實作手冊SOP_遠景科技範例.md", openMode: "newtab", revealSession: 1 },
      { title: "課程總覽", type: "doc", description: "本場次的行政資訊、待確認事項清單", url: "../講座資料/20260820_台東_史前博物館AI工作坊/課程總覽.txt", openMode: "newtab", revealSession: 1 },
      { title: "Drive｜第一堂原始資料", type: "folder", description: "主管交辦信、去年紀錄、場地資訊、會議筆記、預算表——第一堂課前發給學員下載", url: DRIVE_SESSION1, openMode: "newtab", revealSession: 1 },
      { title: "Drive｜第二堂起補充資料", type: "folder", description: "主管與部門來信串、報名人數、廠商詢價、抽獎品、預算草稿；連結暫不公開，授課前再由講師補上", url: "", openMode: "newtab", revealSession: 2 }
    ],
    sessions: [
      {
        id: "s1",
        title: "第1堂．把模糊交辦，變成可執行的任務",
        timeLabel: "09:10–10:00（第 1 節）",
        durationMinutes: 80,
        objective: "先建立正確 AI 工作觀：AI 負責依資料整理初稿，人負責核對與決定。能辨識交辦中的目標、受眾、交付物、期限、限制與未知問題，並完成任務地圖與主管確認信。",
        outputs: ["一頁式任務地圖", "工作優先順序（立即處理／等待確認／可後續處理）", "主管確認信"],
        resources: [
          { title: "上午場投影片", type: "slides", description: "第1–2堂投影片", url: SLIDES_BASE + "slide-AM.html", openMode: "newtab", revealSession: 1 },
          { title: "提示語全集", type: "site", description: "本堂可直接複製的提示語與交件格式", url: SLIDES_BASE + "exercises.html", openMode: "newtab", revealSession: 1 }
        ],
        segments: [
          {
            title: "開場：發下任務包", minutes: 10, range: "0–10", mode: "intro",
            speakerNotes: "先說明四堂課會把一個專案做成可交付成果；發下第一堂原始資料，請每組用兩分鐘說出：遠景科技究竟要辦什麼、資料散在哪裡。提醒今天練的是虛構情境，不輸入真實敏感資料。",
            studentInstruction: "先讀任務包並回答：我們現在被交辦什麼？哪一句最不清楚？哪個資訊一旦錯了，後面會全部重做？",
            resources: [], promptIds: [],
            checklist: ["每組都拿到任務包（Drive 第一堂原始資料）"]
          },
          {
            title: "方法：任務拆解六格", minutes: 15, range: "10–25", mode: "lecture",
            speakerNotes: "連結投影片的四個觀念：AI 生成的是最可能的文字、不是自動查證的事實；搜尋是找來源、生成式 AI 是依資料做草稿；價值在可重複流程；工作習慣是會使用、會評估、會負責。再帶任務拆解六格：目標、對象、交付物、限制、時程、待確認。",
            studentInstruction: "先不要操作 AI。把今天的安全句型記下來：資料沒有寫，就標示「待確認」，不要請 AI 猜。",
            resources: [], promptIds: [],
            checklist: []
          },
          {
            title: "示範：任務地圖＋確認信", minutes: 15, range: "25–40", mode: "demo",
            speakerNotes: "用主管信、去年紀錄與會議筆記示範四步：讀、分、問、核。先找 10/17、48 萬、人數約 200 等矛盾或暫定資訊；再用「角色／範圍／任務／格式」提示語輸出任務地圖；最後把過度武斷的句子改成「暫定」或「待確認」，再濃縮成主管確認信。",
            studentInstruction: "看四個畫面：原始資料、提示語、AI 初稿、人工核對。留意 AI 是否把暫定日期、預算與人數寫成定案。",
            resources: [], promptIds: ["prefix", "p1-task-map", "p2-confirm-letter"],
            checklist: []
          },
          {
            title: "分組實作：任務地圖＋確認信", minutes: 35, range: "40–75", mode: "exercise",
            speakerNotes: "提醒每組輪流操作，並指定資料查核角色。巡組只問：資料出處在哪裡？這件事誰有權決定？這份成果下一位誰會用？",
            studentInstruction: "先讀資料 3 分鐘，每人找 3 個已知條件與 1 個矛盾或缺漏；再完成任務地圖、近期工作優先順序、至少 3 個待確認問題與主管確認信。",
            resources: [
              { title: "Drive｜第一堂原始資料", type: "folder", description: "本堂唯一資料來源", url: DRIVE_SESSION1, openMode: "newtab", revealSession: 1 }
            ],
            promptIds: ["prefix", "p1-task-map", "p2-confirm-letter"],
            checklist: ["六格皆有內容，待確認項目不得被 AI 虛構答案取代", "工作優先順序至少三個層次", "確認信讓主管能快速回覆或裁示"]
          },
          {
            title: "收束：資料查核員的 90 秒", minutes: 5, range: "75–80", mode: "review",
            speakerNotes: "以投影片交件前 90 秒檢查收尾：數字日期能否回原文、不確定是否標待確認、優先順序是否清楚、主管是否知道要回覆什麼。先帶讀課前網站的萬用提示語骨架與 ChatGPT／Gemini／Claude 的適用位置；接著切到本堂固定的 FAQ 與 Q&A 兩頁，留 2 分鐘處理任務地圖、待確認與確認信的問題，再進下一堂。",
            studentInstruction: "請非主要操作的人當資料查核員，完成 90 秒檢查；一句話分享風險並存檔。",
            resources: [], promptIds: [],
            checklist: []
          }
        ]
      },
      {
        id: "s2",
        title: "第2堂．讓不同對象，都收到清楚而合適的文字",
        timeLabel: "10:10–11:50（第 2–3 節）",
        durationMinutes: 80,
        objective: "能依讀者選擇工具、界定可公開資料與調整訊息層級；能把同一份專案資料轉成合作信、主管摘要、公告與 FAQ，並在發送前完成事實、安全與責任檢查。",
        outputs: ["合作單位電子郵件", "公文／簽核說明初稿", "對外公告＋三題常見問答"],
        resources: [
          { title: "上午場投影片", type: "slides", description: "第1–2堂投影片", url: SLIDES_BASE + "slide-AM.html", openMode: "newtab", revealSession: 1 }
        ],
        segments: [
          {
            title: "回顧：挑一件要對外溝通的事", minutes: 10, range: "0–10", mode: "intro",
            speakerNotes: "先用工具地圖快速定位：ChatGPT 偏文字草稿、Gemini 偏 Google 工作流、Manus 偏多步驟任務；重點不是誰最強，而是這件事是寫作、查來源還是跑流程。再請各組挑一件需要溝通的事。",
            studentInstruction: "回顧第 1 堂任務地圖，挑一件需要溝通的事，並說出它要寫給誰、要對方做什麼、什麼不能公開。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "方法：對象／目的／必要資訊／語氣／下一步", minutes: 15, range: "10–25", mode: "lecture",
            speakerNotes: "帶三個寫前問題：寫給誰、要他做什麼、什麼能公開。補充可用的去識別化語氣範例、如何直接指出 AI 要修哪裡，以及資料分級：公開／去識別化後可用／不可貼。提醒對外內容、引用與承諾都仍由人負責。",
            studentInstruction: "先聽方法。準備用「對象／目的／已知條件／待確認／輸出格式」取代模糊的『幫我寫一封專業信』。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "示範：同一份資料轉三種文字", minutes: 15, range: "25–40", mode: "demo",
            speakerNotes: "以同一份家庭日資料示範三種讀者：主管要判斷與裁示、廠商要需求與回覆期限、同仁只要已確認的參加資訊。示範合作信的主旨、脈絡、條列問題與下一步；再請 AI 輸出寄出前必查 3 件事。示範把未核定資訊改成「後續公告」。",
            studentInstruction: "觀察同一份資料如何因讀者不同而取捨，也檢查 AI 是否自行補上場地、人數、預算或承諾。",
            resources: [], promptIds: ["prefix", "p3-formal-email", "p4-announcement-faq"],
            checklist: []
          },
          {
            title: "分組實作：三份文字成果", minutes: 35, range: "40–75", mode: "exercise",
            speakerNotes: "要求每組先選對象與目的，再用補充資料完成文字包。巡組特別檢查資料是否去識別化、是否有未核定資訊對外流出。完成後互換，以『讀者知道下一步嗎』檢查。",
            studentInstruction: "完成合作單位正式信、主管摘要或簽核初稿、公告與三題 FAQ。每份都標出已知與待確認資訊；互換另一組檢查語氣、事實、承諾與下一步。",
            resources: [
              { title: "Drive｜第二堂起補充資料", type: "folder", description: "主管與部門來信串、廠商詢價等；連結暫不公開", url: "", openMode: "newtab", revealSession: 2 }
            ],
            promptIds: ["prefix", "p3-formal-email", "p4-announcement-faq"],
            checklist: ["合作單位信有主旨、目的、具體問題與下一步", "主管摘要保留可調整的事實文字，不替主管做決定", "公告與 FAQ 只使用已確認資訊，未定內容標示後續公告", "未貼入個資、帳密、未公開合約、敏感人事或採購資料"]
          },
          {
            title: "收束：AI寫太滿或太空的地方", minutes: 5, range: "75–80", mode: "review",
            speakerNotes: "以五關檢查收束：來源、名稱日期數字規則、待確認、讀者適切性、最終責任。請各組分享一處 AI 寫得太滿或太空，以及精準怎麼修；帶讀課前網站的語氣改寫與多版本活動文案，再用本堂 FAQ／Q&A 兩頁收問題，最後轉入下午。",
            studentInstruction: "一句話分享：AI 哪裡寫錯或寫太空？你加了哪一項背景、限制或格式讓它變得可用？",
            resources: [], promptIds: [], checklist: []
          }
        ]
      },
      {
        id: "s3",
        title: "第3堂．會議結束後，讓事情真的往下走",
        timeLabel: "13:40–14:30（第 5 節）",
        durationMinutes: 80,
        objective: "能判斷對話式、帶來源與代理型 AI 的適用邊界；能把會議筆記轉成可追溯的摘要、決議、待辦、負責人、期限與風險，並透過會後確認信讓工作真的接得下去。",
        outputs: ["一頁式會議摘要", "工作追蹤表", "會後確認信", "一項待主管決定的風險事項"],
        resources: [
          { title: "下午場投影片", type: "slides", description: "第3–4堂投影片", url: SLIDES_BASE + "slide-PM.html", openMode: "newtab", revealSession: 1 }
        ],
        segments: [
          {
            title: "引導：找出討論／定案／沒負責人", minutes: 8, range: "0–8", mode: "intro",
            speakerNotes: "先複習：對話式 AI 適合草稿、帶來源 AI 適合讀資料、代理型 AI 適合可撤回的多步驟公開／模擬任務。接著用混亂會議筆記問大家：哪些只是討論、哪些已定案、哪些沒有主責？",
            studentInstruction: "從筆記中找出一個討論、一個決議、一個待辦與一個缺少負責人的地方。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "方法：AI 工作系統＋會議整理五欄", minutes: 22, range: "8–30", mode: "lecture",
            speakerNotes: "先用新增的七張通用觀念投影片快速建立系統觀：單次 Prompt 與可重複模板、ChatGPT 自訂 GPT／Gemini Gem、Project、NotebookLM、連接器權限，以及模型的先快後深。核心講法是：先把資料和規則做對，再升模型；Project 不是檔案垃圾桶，外掛先看權限。時間不足時優先講 GPT／Gem、NotebookLM、模型兩輪工作法，其餘作為課後閱讀。接著帶回會前／會後流程與會議五欄：討論、決議、待辦、風險或待裁示；每一句都要找得到來源與狀態。",
            studentInstruction: "記下兩條原則：『有人提議』不等於『已決議』；模型更強也不能補足錯的資料。沒有主責、期限或權責，就寫待確認。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "示範：會議摘要＋追蹤表＋會後信", minutes: 12, range: "30–42", mode: "demo",
            speakerNotes: "以原始筆記示範陷阱：10/17 只是暫定、48 萬有條件、行政與人資未必已被指派。先要求 AI 只整理明確內容，再輸出 100 字摘要、決議、待確認、追蹤表與三項風險；逐列保留『依據』欄。最後草擬可讓與會者修正的確認信。",
            studentInstruction: "跟著看示範，檢查 AI 有沒有把『好像是行政跟人資』誤寫成主責；請記下正確寫法：負責人待確認，並寫清楚要問誰。",
            resources: [], promptIds: ["prefix", "p5-meeting-tracker", "p6-followup-letter"],
            checklist: []
          },
          {
            title: "分組實作：整理會議＋處理變更卡", minutes: 33, range: "42–75", mode: "exercise",
            speakerNotes: "提醒錄音、逐字稿與會議資料不一定能上傳；本堂只用任務包。巡組時由資料查核角色問每列來源，避免任意補人名與期限。",
            studentInstruction: "完成一頁式會議摘要、工作追蹤表、會後確認信與至少一項待主管裁示的風險。追蹤表每列都要有工作、負責人、期限、狀態、依據與卡點／下一步。",
            resources: [
              { title: "第一次籌備會原始筆記", type: "folder", description: "本堂以原始會議筆記和後續信件為資料來源；連結暫不公開", url: "", openMode: "newtab", revealSession: 3 }
            ],
            promptIds: ["prefix", "p5-meeting-tracker", "p6-followup-letter"],
            checklist: ["討論與決議有分開", "每個待辦有負責人與期限，或清楚標示待確認", "列出至少一項可能影響預算、場地或時程的風險"]
          },
          {
            title: "收束：最可能延誤專案的是什麼", minutes: 5, range: "75–80", mode: "review",
            speakerNotes: "請各組用一句話說明最可能延誤專案的風險、它的依據，以及應由誰決定或協助。帶讀課前網站的 Perplexity、NotebookLM、Manus 與公開研究／待辦／事實核對提示語；接著切到本堂 FAQ／Q&A 兩頁，處理討論與決議、追蹤表與資料安全的問題，再進下一堂。",
            studentInstruction: "一句話分享：最可能延誤的是什麼？依據在哪裡？誰應決定？",
            resources: [], promptIds: [], checklist: []
          }
        ]
      },
      {
        id: "s4",
        title: "第4堂．把工作成果，整理成簡報與對外視覺",
        timeLabel: "14:40–16:20（第 6–7 節）",
        durationMinutes: 80,
        objective: "能把前三堂成果與中途變更整理成支持決策的五頁簡報、對外海報與短文；能分清 AI 輔助與人的最終責任，並用事實、權利、讀者與行動指引檢查公開成果。",
        outputs: ["五頁主管簡報大綱", "海報初稿內容", "150 字以內對外說明"],
        resources: [
          { title: "下午場投影片", type: "slides", description: "第3–4堂投影片", url: SLIDES_BASE + "slide-PM.html", openMode: "newtab", revealSession: 1 }
        ],
        segments: [
          {
            title: "引導：主管與民眾各自要先看到什麼", minutes: 10, range: "0–10", mode: "intro",
            speakerNotes: "先讓大家換讀者：主管要看選項、成本、風險與待裁示；合作方要看需求與期限；同仁／民眾要看與自己有關的已確認資訊。接著說明 AI 可整理選項和缺口，但不能替有權責者取捨。",
            studentInstruction: "討論：主管一分鐘內需要做哪個決定？民眾看到海報先找什麼？同一份資料哪些只能留在內部？",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "方法：簡報五頁骨架／海報五格", minutes: 15, range: "10–25", mode: "lecture",
            speakerNotes: "帶三條原則：一頁只回答一個決策問題、視覺放大資訊而不掩蓋內容、公開前核對事實／承諾／讀者。補充來源與授權、AI 圖像影音的媒體識讀、最終簽名者責任，以及變更管理三步：先列影響、再列選項、最後請人決定。最後帶五頁簡報骨架與海報三層資訊。",
            studentInstruction: "先聽方法。把『如果出錯時我需要解釋嗎？』當作判斷：若需要，AI 就只能當輔助。",
            resources: [], promptIds: [], checklist: []
          },
          {
            title: "示範：簡報大綱＋海報規格", minutes: 15, range: "25–40", mode: "demo",
            speakerNotes: "發出變更情境：場地 A 取消，預算從 48 萬下修為 42 萬。示範先停止哪些假設、重算哪些成本、要主管決定什麼；再將前三堂已確認資料與待決策事項轉成五頁簡報。接著示範海報三層資訊與 150 字短文，只保留已確認內容。",
            studentInstruction: "跟著看示範：先整理影響、選項、待決策，再請 AI 產出有格式的大綱；留意未確認資訊必須標為待確認或後續公告。",
            resources: [], promptIds: ["prefix", "p7-exec-deck", "p8-poster-summary"],
            checklist: []
          },
          {
            title: "分組實作：簡報＋海報＋對外說明", minutes: 30, range: "40–70", mode: "exercise",
            speakerNotes: "提供變更卡後，要求各組先更新任務地圖與追蹤表，再做成果呈現。不比美工，比內容是否能支持決策與下一步。",
            studentInstruction: "先更新取消場地與預算下修的影響；完成五頁主管簡報大綱、海報內容稿與 150 字內對外說明。每組準備一分鐘說明：主管現在需要決定什麼？",
            resources: [], promptIds: ["prefix", "p7-exec-deck", "p8-poster-summary"],
            checklist: ["五頁簡報清楚呈現規模／方案／成本／風險／需要主管決定的事", "海報只使用已確認資訊，並有對象、必要資訊與下一步", "對外說明 150 字內，讀者知道是什麼、與誰有關、下一步怎麼做", "圖片、引用、數據與權利已被標記為需確認或已確認"]
          },
          {
            title: "成果分享與互評", minutes: 10, range: "70–80", mode: "review",
            speakerNotes: "每組一分鐘，依『資料正確、訊息清楚、下一步可執行』互評。最後回到三條工作紅線：安全、正確、負責；請學員選一件非敏感的真實工作，未來一週照今天流程跑一次。最後引導掃課後問卷 QR Code。",
            studentInstruction: "1 分鐘分享＋互評；寫下下週要試的一件真實工作，以及你會保留的提示語模板。最後完成課後問卷。",
            resources: [], promptIds: ["p14-fact-check", "p16-personal-template"], checklist: ["完成最終事實核對", "留下可重複使用的個人工作模板", "完成課後問卷"]
          }
        ]
      }
    ]
  },
  {
    id: "coach-ai-0902",
    title: "AI 教練工作術：運用 Claude 協助訓練規劃與行政工作",
    audience: "高雄國訓中心退役教練約 50 人（講述與現場示範為主）",
    date: "2026-09-02（三）",
    time: "10:45–12:45",
    location: "高雄市左營區世運大道 399 號",
    tags: ["教練", "Claude", "生成式AI", "示範講座"],
    version: "V1",
    updatedAt: "2026-08-12",
    summary: "以虛構高中田徑短跑隊的匿名案例，示範 ChatGPT、Gemini 與 Claude 在任務拆解、資料整理、訓練週計畫、行政公告與安全審核上的分工；不輸入任何真實選手、傷病或可識別資料。",
    resources: [
      { title: "講師入口", type: "site", description: "本場次總入口與課程資訊", url: "../w/20260902-index.html", openMode: "newtab", revealSession: 1 },
      { title: "講師控制台", type: "site", description: "三欄講師模式、計時、講稿與示範備援", url: "../w/20260902-presenter.html", openMode: "newtab", revealSession: 1 },
      { title: "50 頁投影片", type: "slides", description: "投影模式；可用鍵盤翻頁、黑幕、總覽與備援結果", url: "../w/20260902-slides.html", openMode: "newtab", revealSession: 1 },
      { title: "學員提示語與案例資料", type: "site", description: "可複製提示語、匿名案例檔與工具入口", url: "../w/20260902-resources.html", openMode: "newtab", revealSession: 1 },
      { title: "學員課前入口", type: "site", description: "可於課前分享給學員的簡明頁面", url: "../lectures/20260902.html", openMode: "newtab", revealSession: 1 }
    ],
    sessions: [
      {
        id: "coach-0902-main",
        title: "兩小時講座．AI 教練工作術",
        timeLabel: "10:45–12:45",
        durationMinutes: 120,
        objective: "知道三類 AI 的工作邊界，能用匿名虛構案例觀察 Claude 的整理、規劃與檢核流程，並保留教練的專業判斷與資料安全責任。",
        outputs: ["一套可重複使用的工作提示語", "一份經人工審核的訓練規劃草稿"],
        resources: [],
        segments: [
          { title: "開場與安全邊界", minutes: 15, range: "10:45–11:00", mode: "intro", speakerNotes: "先建立 AI 是副駕駛、真實選手與傷病資料不輸入的原則；以匿名短跑隊案例帶入。", studentInstruction: "辨識哪些資料可當練習素材、哪些必須留在單位內部。", resources: [], promptIds: [], checklist: ["不輸入姓名、醫療、成績或可識別選手資料"] },
          { title: "AI 工具分工與提示語", minutes: 30, range: "11:00–11:30", mode: "lecture", speakerNotes: "比較對話、資料閱讀與長文件工作空間的適用情境；帶 Prompt 四要素與人工核對關卡。", studentInstruction: "觀察同一任務如何用目的、資料、限制與輸出格式講清楚。", resources: [], promptIds: [], checklist: [] },
          { title: "Claude 現場示範", minutes: 35, range: "11:30–12:05", mode: "demo", speakerNotes: "依 D01–D09 示範資料整理、微週期、場地替代、行政公告與品質檢核；網路或工具不穩時切到備援結果。", studentInstruction: "記錄 AI 哪些地方需要補資料、哪些結論必須由教練判斷。", resources: [], promptIds: [], checklist: ["每個建議都回到原始資料與訓練原理檢查"] },
          { title: "休息", minutes: 15, range: "12:05–12:20", mode: "review", speakerNotes: "投影休息倒數；講師檢查下一段示範素材與網路。", studentInstruction: "休息後回座。", resources: [], promptIds: [], checklist: [] },
          { title: "FAQ、Q&A 與下一步", minutes: 25, range: "12:20–12:45", mode: "review", speakerNotes: "先帶讀課前網站的 Gamma、Canva、Napkin 與影音創作工具，回到「任務→工具→人工核對」；再用最後兩張投影片回答成果發布、海報資訊與最終責任的 FAQ，並以 Q&A 與問卷 QR Code 完成課程回饋與下一步。", studentInstruction: "提出最後一個問題；掃碼回饋，並寫下下週想先用 AI 處理的一件非敏感工作與人工檢查點。", resources: [], promptIds: [], checklist: ["確定人工最終審核者"] }
        ]
      }
    ]
  }
];

const MODE_LABEL = { intro: "開場", lecture: "方法", demo: "示範", exercise: "分組實作", review: "收束" };
