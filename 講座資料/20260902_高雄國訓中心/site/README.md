# AI 教練工作術｜國訓中心網站

純靜態網站，直接開啟 `index.html` 即可；若要完整測試跨頁同步，可在本資料夾執行：

```bash
python3 -m http.server 8789
```

## 主要頁面

- `index.html`：學員／講師入口。
- `slides.html`：50 頁全螢幕投影片；可用方向鍵、空白鍵、Home/End、F、B、O 操作。
- `presenter.html`：講師控制台，含講稿、計時、提示詞、備援結果與三個工具快速入口。
- `resources.html`：學員課後提示詞、案例資料、官方連結與安全提醒。
- `print.html`：列印版；加上 `?notes=1` 可同時列印講師備註。

## 修改內容的位置

- `course-data.js`：50 頁投影片、講師備註、10 段 Demo、備援結果與工具連結。
- `site.css`：整體視覺與投影片版型。
- `../ai-coach-claude-site-brief/demo-data/`：虛構案例資料。

修改投影片、提示語或 Demo 後，必須同步更新上一層的 `CHANGELOG.md`。

## 網路全斷時

1. 保持使用 `slides.html` 與 `presenter.html`，投影片、講稿、案例與備援結果均為本地檔案。
2. 外部 AI 無法開啟、回覆太久或被登出時，控制台直接按「顯示備援結果」。
3. 不要在台上重新登入、申請方案或處理信用卡。
4. 可在 `print.html?notes=1` 使用瀏覽器列印為 PDF 當備援講稿。

## 公開入口

- 學員入口：`/lectures/20260902.html`
- 講師入口：`/w/20260902-index.html`
- 投影片：`/w/20260902-slides.html`
- 課後資源：`/w/20260902-resources.html`
- 講師控制台：`/w/20260902-presenter.html`
