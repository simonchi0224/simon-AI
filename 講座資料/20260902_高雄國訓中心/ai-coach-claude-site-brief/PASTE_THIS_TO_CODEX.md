# 直接貼給 Codex 的任務文字

請在目前工作目錄建置「AI 教練工作術：運用 Claude 協助訓練規劃與行政工作」講師網站。

開始前請完整閱讀 `ai-coach-claude-site-brief/` 內所有 Markdown、CSV 與資料檔，特別是：

- `00_START_HERE.md`
- `01_SITE_AND_DESIGN_SPEC.md`
- `02_SLIDE_CONTENT_AND_SPEAKER_NOTES.md`
- `03_LIVE_DEMO_PLAYBOOK.md`
- `demo-data/` 內全部檔案
- `04_REFERENCE_AND_SAFETY.md`
- `05_ACCEPTANCE_CHECKLIST.md`

這不是只做一份投影片。交付必須同時包含：

1. 學員入口 `/`
2. 50 頁網頁投影片 `/slides`
3. 講師控制台 `/presenter`
4. 課後資源 `/resources`
5. 列印／PDF 版 `/print`
6. Live Demo D01–D10、提示詞複製、案例下載與每一步備援輸出
7. 雙視窗頁碼同步、段落計時、黑幕、全螢幕、縮圖總覽與離線核心內容

請先檢查現有 repo、`AGENTS.md`、套件與未提交變更。若為空目錄，可依規格採 Next.js App Router、TypeScript 與本地內容資料檔；不要建立資料庫、登入或 AI API 串接，不可在程式碼中放任何 API Key。

先提出精簡實作計畫，接著直接完成建置。逐頁內容已經定稿，不要自行濃縮成少量模板頁。完成後執行 lint、typecheck、production build，依 `05_ACCEPTANCE_CHECKLIST.md` 驗收並回報結果。
