# 匯聯實業 AI 工作坊｜2026-10-06

四小時課程網站。來源檔集中在 `site/`，Simon AI 公開入口和投影片使用 `lectures/`、`w/` 的輕量 iframe wrapper。

## 公開網址

- 學員入口：<https://simon-chi.com/lectures/20261006.html>
- 投影片：<https://simon-chi.com/w/20261006-slides.html>
- 練習資源：<https://simon-chi.com/w/20261006-resources.html>
- 講師控制台：<https://simon-chi.com/w/20261006-presenter.html>

## 編輯位置

- `site/course-data.js`：投影片、講師備註、時程與課堂題目。
- `site/site.css`：入口、投影片與控制台視覺。
- `site/index.html`：學員入口。
- `site/slides.html`：全螢幕投影片；方向鍵／空白鍵切頁，F 全螢幕、O 總覽、B 暫時隱藏畫面。
- `site/presenter.html`：講師備註、計時器、投影片導覽；與投影片頁透過 BroadcastChannel 同步。
- `site/resources.html`：業務／QC 練習情境與交付前檢查表。

## 課程安排

13:30–17:30，共 240 分鐘。包含 10 分鐘休息。每項任務先用約 10 分鐘說明或示範，再留實作時間；依工作角色分流案例。

業務助理案例：詢價整理與查證、Workspace 郵件與文件、說明書及零件表轉換、Invoice／Packing／報單差異、產品圖片和型號找圖流程。

QC 案例：檢驗資料整理、規格與檢驗結果比對、異常紀錄及既有 QC SOP 整理。沒有核准規格時不由 AI 自行判定合格與否。

所有練習使用經核准的去識別素材；照片為 AI 生成情境示意。產品圖片整理與 gatx.tools 取圖以示範和可行性討論為主，不承諾工具能直接完成最終檔案。
