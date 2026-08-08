# 講師控制台

Simon 自己上課用的講師入口網站。純靜態 HTML／CSS／JS，沒有建置流程，跟 `simon-AI` 專案其餘部分（simon-chi.com）用同一套技術棧與部署方式（GitHub Pages）。

## 本機啟動方式

直接在瀏覽器打開 `console/index.html` 就能用——所有資料是用 `<script src="data/data.js">` 載入成全域變數，不是用 `fetch()` 讀 JSON，所以 `file://` 開啟也不會有 CORS 問題，不需要跑本機伺服器。

如果想要有路由/相對路徑更接近上線環境的體驗，也可以在 `simon-AI/` 目錄下跑：

```bash
python3 -m http.server 8000
# 開啟 http://localhost:8000/console/
```

## 資料在哪裡改

**只有一個檔案要編輯：`console/data/data.js`。** 所有畫面（首頁、課程列表、課程詳情、講師模式、提示語庫）都是從這個檔案讀資料算繪，改資料不用動 HTML／CSS。

檔案裡有四種資料：

- `COURSES` — 課程陣列，每個課程底下有 `sessions`（堂次），每堂底下有 `segments`（開場/方法/示範/實作/收束）
- `PROMPTS` — 提示語庫，扁平陣列，用 `courseIds` 標記屬於哪些課程
- `MODE_LABEL` — segment.mode 的中文顯示文字，新增 mode 種類時要記得也在這裡加一行
- 檔案開頭幾個 `const XXX_BASE` — 常用路徑前綴，方便同一課程的多個資源共用同一個資料夾路徑

## 如何新增一門課程

1. 打開 `console/data/data.js`，在 `COURSES` 陣列裡複製一個現有課程物件當範本。
2. 改 `id`（給一個唯一字串，例如 `ai-workflow-0902`）、`title`、`audience`、`date`、`time`、`location`、`tags`、`summary`。
3. `resources` 是課程層級的常用連結（投影片站入口、教案文件、Drive 資料夾等）。
4. `sessions` 依堂次填寫，每堂的 `segments` 建議照「開場/方法/示範/實作/收束」五段寫，每段至少填 `speakerNotes`（你要講的重點）跟 `studentInstruction`（學員現在要做什麼）。
5. 若某段有專屬的提示語，把 `PROMPTS` 裡對應的 `id` 填進該 segment 的 `promptIds` 陣列。
6. 若某項資源要等到某一堂才能公開給學員（例如中途變更卡），設定該 Resource 的 `revealSession`；數字是「最早可以在第幾堂公開」，講師模式與課程詳情頁會自動顯示 🔒 鎖頭提示，避免提早開錯連結。
7. 存檔即可，首頁、課程列表、講師模式都會自動出現這門新課程，不用改任何 HTML。

## 如何替換資源連結

同樣在 `data.js` 裡改對應 Resource 物件的 `url` 欄位。如果是投影片／教案這類「本課程自己資料夾裡的檔案」，建議先在檔案開頭定義一個 `XXX_BASE` 常數（相對路徑），資源物件裡用 `XXX_BASE + "檔名"` 組出完整路徑，這樣以後整個資料夾搬家只要改一個地方。

## 新增提示語

在 `PROMPTS` 陣列加一個物件，至少填 `id`（唯一）、`title`、`body`（提示語正文，換行直接寫在字串裡，畫面會保留格式）、`tool`、`tags`（陣列，用來做篩選按鈕）、`usageNote`、`courseIds`。提示語庫頁面會自動撈到所有標籤做成篩選列。

## 目前刻意保留（不在這版做）的功能

- 沒有學員登入、付費、多人協作、即時聊天室、檔案上傳或 AI 聊天功能。
- 不串接 Google Drive／Docs API——所有 Google 資源都是純連結，開新分頁瀏覽。
- 進度（哪些段落已完成、上次開啟的課程、深淺色模式）存在瀏覽器 `localStorage`，換裝置或清瀏覽器資料不會同步。
- 全域搜尋目前只會把關鍵字帶去提示語庫頁面篩選；還沒有跨課程內容全文搜尋。

## 部署

跟 `simon-AI` 其他頁面一樣，是 GitHub Pages 靜態網站的一部分，`git push` 後會自動更新，不需要額外的建置或部署步驟。網址預期會是 `https://simon-chi.com/console/`。
