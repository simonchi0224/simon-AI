#!/usr/bin/env python3
"""Build a wholly fictional baseball-pitching data pack for the Claude workshop."""
from __future__ import annotations

import argparse
import csv
import math
import shutil
import zipfile
from datetime import date, timedelta
from pathlib import Path
from xml.sax.saxutils import escape

import xlsxwriter
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "demo-data" / "投手案例包_虛構資料"
IMAGE_SOURCE = Path("/Users/simonchi/.codex/generated_images/01a03307-fa7c-7bd0-9086-f93a02f10dd6/exec-aecdf3e6-77e7-483b-8fdf-42eb3b5c66aa.png")

ATHLETES = [
    ("P07", "周昱辰", "右投先發", 22, "本週限制總投球量；無診斷資訊"),
    ("P12", "林柏安", "右投中繼", 24, "背靠背出賽後需確認恢復"),
    ("P19", "張予安", "左投先發", 21, "週三只做低強度技術與恢復"),
]

def ensure():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "影像").mkdir(exist_ok=True)

def daily_rows():
    start = date(2026, 8, 3)
    rows = []
    for i in range(28):
        d = start + timedelta(days=i)
        phase = "調整週" if i < 7 else "建立週" if i < 14 else "專項週" if i < 21 else "減量前週"
        session = ["恢復／移動", "牛棚", "肌力", "技術＋跑動", "比賽模擬", "恢復", "休息"][i % 7]
        minutes = [35, 75, 65, 70, 90, 40, 0][i % 7]
        rpe = [3, 7, 6, 6, 8, 3, 0][i % 7]
        pitches = [0, 38, 0, 18, 62, 0, 0][i % 7] + (4 if i in (11, 18) else 0)
        sleep = [7.6, 7.1, 6.5, 7.2, 6.8, 8.0, 8.3][i % 7]
        soreness = [1, 2, 3, 2, 4, 2, 1][i % 7]
        status = "注意" if soreness >= 4 or sleep < 6.7 else "正常"
        rows.append([d, "P07", phase, session, minutes, rpe, pitches, sleep, soreness, status,
                     "若疼痛加劇、投球品質下降或疲勞回報異常，交由教練確認" if status == "注意" else ""])
    return rows

def write_readme():
    text = """# Claude 教練案例包｜投手群資料（完全虛構）

本資料包供「AI 時代，教練的放大器」課程示範使用。人物、數值、賽程與情境均為虛構；不構成醫療意見、投球處方或真實選手紀錄。

## 檔案與 AI 任務

1. `01_賽季任務與限制.pdf`：讀取賽季目標、賽程、場地與人力限制，先找衝突與資訊缺口。
2. `02_投手教練備忘.docx`：比較教練觀察與訓練安排，列出需要教練確認的決策。
3. `03_投手群監測與排程.xlsx`：計算 session-RPE、7 日負荷、28 日基準、ACWR、單調性與 strain；所有指標僅作討論，不單獨決策。
4. `影像/04_P07_投球動作_虛構.png`：請 AI 描述可觀察的動作事件、列出需補拍角度與教練追問；不得做傷害診斷。

## 建議第一輪提示詞

「請完整閱讀所有附件。先建立資料來源表，再分成：已知事實、資料矛盾、資料不足、只能由教練或既有專業人員確認的決定。不要對真人做診斷，也不要自行補足投球量或強度。」
"""
    (OUT / "README.md").write_text(text, encoding="utf-8")

def write_csv():
    rows = daily_rows()
    with (OUT / "03_每日監測原始資料.csv").open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f)
        w.writerow(["日期", "選手代碼", "週期階段", "訓練／活動", "分鐘", "session RPE", "投球數", "睡眠時數", "酸痛0-10", "狀態", "教練備註"])
        w.writerows(rows)

def docx_xml(paragraphs):
    body = []
    for text, style in paragraphs:
        size = "34" if style == "title" else "26" if style == "h1" else "22"
        bold = "<w:b/>" if style in ("title", "h1") else ""
        color = "17365D" if style in ("title", "h1") else "222222"
        body.append(f'<w:p><w:pPr><w:spacing w:after="120"/></w:pPr><w:r><w:rPr>{bold}<w:color w:val="{color}"/><w:sz w:val="{size}"/><w:rFonts w:eastAsia="Microsoft JhengHei"/></w:rPr><w:t>{escape(text)}</w:t></w:r></w:p>')
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>{''.join(body)}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body></w:document>'''

def write_docx():
    paragraphs = [
        ("投手群教練備忘｜P07 周昱辰（完全虛構）", "title"),
        ("用途與界線", "h1"),
        ("本備忘為課程練習素材。P07、P12、P19 均為虛構代碼；任何資料不構成傷病診斷、復健建議或可直接執行的投球處方。", "body"),
        ("教練觀察｜最近兩週", "h1"),
        ("P07 在高投球量日後隔日主觀疲勞上升；第 2 週比賽模擬後酸痛回報為 4/10。影片僅有一個側面時點，不能據此判定動作問題或受傷風險。", "body"),
        ("已知限制", "h1"),
        ("週二牛棚、週五比賽模擬；週三場地只開放重量室。週末可能有熱身賽，名單與局數尚未確認。P07 本週投球總量上限須由教練確認，不能由 AI 自行設定。", "body"),
        ("本週教練決策點", "h1"),
        ("1. 熱身賽是否列入比賽模擬週期？ 2. P07 的牛棚與比賽模擬間隔是否符合既有安排？ 3. 睡眠下降與酸痛回報是偶發、持續還是需依單位既有流程處理？", "body"),
        ("給 AI 的任務", "h1"),
        ("請交叉比對 PDF 賽程、Excel 負荷與此備忘，列出資料矛盾、需補問問題與兩種可供教練審查的排程選項。不得自行給醫療判斷或精確投球處方。", "body"),
    ]
    content_types = '''<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'''
    rels = '''<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'''
    out = OUT / "02_投手教練備忘_虛構.docx"
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types)
        z.writestr("_rels/.rels", rels)
        z.writestr("word/document.xml", docx_xml(paragraphs))

def write_pdf():
    pdfmetrics.registerFont(UnicodeCIDFont("STSong-Light"))
    styles = getSampleStyleSheet()
    title = ParagraphStyle("title", parent=styles["Title"], fontName="STSong-Light", fontSize=20, leading=28, textColor=colors.HexColor("#17365D"))
    h = ParagraphStyle("h", parent=styles["Heading2"], fontName="STSong-Light", fontSize=13, leading=20, textColor=colors.HexColor("#17365D"))
    body = ParagraphStyle("body", parent=styles["BodyText"], fontName="STSong-Light", fontSize=10, leading=16)
    doc = SimpleDocTemplate(str(OUT / "01_賽季任務與限制_虛構.pdf"), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=16*mm, bottomMargin=16*mm)
    story = [Paragraph("投手群 6 週備賽任務書｜完全虛構", title), Spacer(1, 6*mm),
             Paragraph("案例目的", h), Paragraph("示範 Claude 如何整理多份教練資料、發現衝突、計算可檢查的負荷指標，並提出供教練審查的選項。不是自動產生投球處方。", body),
             Paragraph("賽季與目標", h), Paragraph("6 週後為區域邀請賽；P07 為先發候選人，P12 為中繼候選人，P19 為左投輪值。主要目標是建立可執行的備賽節奏、保留技術品質並讓教練掌握負荷與恢復資訊。", body),
             Paragraph("現場限制", h), Paragraph("週二：牛棚與重量室；週三：僅重量室；週五：比賽模擬；週末：可能熱身賽，局數待確認。投捕搭配、人力與雨備尚未完整提供。", body),
             Paragraph("AI 第一輪任務", h), Paragraph("請先列出：資料來源、已知條件、彼此矛盾、缺少但會改變排程的資訊、以及只能由教練確認的決定。不要自行設定投球數、強度、休息日或醫療處置。", body)]
    data = [[Paragraph(x, body) for x in row] for row in [["週次", "重點", "教練確認點"], ["W1", "建立基準與監測習慣", "近期投球量與賽程"], ["W2-W3", "專項品質與力量安排", "牛棚、模擬、比賽間隔"], ["W4", "中段檢查", "恢復與反應"], ["W5", "賽前刺激", "熱身賽局數"], ["W6", "比賽週", "名單與角色"]]]
    tbl = Table(data, colWidths=[25*mm, 65*mm, 70*mm])
    tbl.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), colors.HexColor("#17365D")), ("TEXTCOLOR", (0,0), (-1,0), colors.white), ("GRID", (0,0), (-1,-1), .35, colors.HexColor("#9AA6B2")), ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 6), ("RIGHTPADDING", (0,0), (-1,-1), 6), ("TOPPADDING", (0,0), (-1,-1), 6), ("BOTTOMPADDING", (0,0), (-1,-1), 6)]))
    story += [Spacer(1, 5*mm), tbl, Spacer(1, 5*mm), Paragraph("資料安全", h), Paragraph("所有姓名、數值、場景與影像均為課程虛構素材。真實選手資料須先依單位規範處理、去識別化並經適當權限確認。", body)]
    doc.build(story)

def write_xlsx():
    out = OUT / "03_投手群監測與排程_虛構.xlsx"
    wb = xlsxwriter.Workbook(out)
    navy, sky, red, green = "#17365D", "#D9EAF7", "#FCE4D6", "#E2F0D9"
    title = wb.add_format({"bold": True, "font_size": 16, "font_color": "white", "bg_color": navy, "align": "left"})
    head = wb.add_format({"bold": True, "font_color": "white", "bg_color": navy, "border": 1, "align": "center"})
    text = wb.add_format({"border": 1})
    datefmt = wb.add_format({"border": 1, "num_format": "yyyy-mm-dd"})
    num = wb.add_format({"border": 1, "num_format": "0.0"})
    loadfmt = wb.add_format({"border": 1, "num_format": "#,##0"})
    note = wb.add_format({"text_wrap": True, "valign": "top", "bg_color": "#FFF2CC", "border": 1})
    ws = wb.add_worksheet("每日監測")
    ws.merge_range("A1:P1", "P07 投手負荷與疲勞監測｜完全虛構教學資料", title)
    headers = ["日期", "代碼", "週期", "活動", "分鐘", "session RPE", "session load", "投球數", "睡眠", "酸痛", "狀態", "教練備註", "7日負荷", "28日基準", "ACWR", "提醒"]
    for c, v in enumerate(headers): ws.write(2, c, v, head)
    for r, row in enumerate(daily_rows(), start=3):
        ws.write_datetime(r, 0, row[0], datefmt); ws.write(r, 1, row[1], text); ws.write(r, 2, row[2], text); ws.write(r, 3, row[3], text)
        ws.write_number(r, 4, row[4], num); ws.write_number(r, 5, row[5], num); ws.write_formula(r, 6, f"=E{r+1}*F{r+1}", loadfmt)
        ws.write_number(r, 7, row[6], loadfmt); ws.write_number(r, 8, row[7], num); ws.write_number(r, 9, row[8], num); ws.write(r, 10, row[9], text); ws.write(r, 11, row[10], note)
        excelrow = r + 1
        ws.write_formula(r, 12, f'=IF(ROW()<10,"",SUM(G{max(4,excelrow-6)}:G{excelrow}))', loadfmt)
        ws.write_formula(r, 13, f'=IF(ROW()<31,"",AVERAGE(G{max(4,excelrow-27)}:G{excelrow})*7)', loadfmt)
        ws.write_formula(r, 14, f'=IFERROR(M{excelrow}/N{excelrow},"")', num)
        ws.write_formula(r, 15, f'=IF(OR(J{excelrow}>=4,I{excelrow}<6.7),"請教練確認恢復與下一次負荷","正常監測")', text)
    ws.conditional_format("J4:J31", {"type": "cell", "criteria": ">=", "value": 4, "format": wb.add_format({"bg_color": red})})
    ws.conditional_format("P4:P31", {"type": "text", "criteria": "containing", "value": "確認", "format": wb.add_format({"bg_color": "#F4CCCC"})})
    ws.freeze_panes(3, 0); ws.autofilter(2, 0, 30, 15)
    for col, width in {0:12,1:8,2:11,3:15,4:9,5:12,6:13,7:9,8:9,9:8,10:8,11:38,12:13,13:13,14:9,15:24}.items(): ws.set_column(col, col, width)
    info = wb.add_worksheet("教練操作說明")
    info.merge_range("A1:D1", "這些數字怎麼用｜完全虛構示範", title)
    entries = [["指標", "公式／意義", "用於提問", "不可做的事"], ["session load", "分鐘 × session RPE", "累積量是否突然上升？", "單獨決定可否出賽"], ["7日負荷", "近 7 日 session load 合計", "近期工作量趨勢？", "視為受傷預測"], ["28日基準", "近 28 日平均日負荷 × 7", "相對於近期基準？", "取代教練觀察"], ["ACWR", "7日負荷 ÷ 28日基準", "值得追問的訊號？", "硬性門檻或診斷"], ["睡眠／酸痛", "主觀回報", "需要確認的恢復訊息？", "作為醫療結論"]]
    for r, row in enumerate(entries, start=2):
        for c, v in enumerate(row): info.write(r, c, v, head if r == 2 else note)
    info.set_column("A:A", 16); info.set_column("B:D", 33); info.set_row(2, 28); [info.set_row(i, 46) for i in range(3, 8)]
    wb.close()

def copy_image():
    if not IMAGE_SOURCE.exists(): raise FileNotFoundError(IMAGE_SOURCE)
    shutil.copy2(IMAGE_SOURCE, OUT / "影像" / "04_P07_投球動作_虛構.png")

def main():
    p = argparse.ArgumentParser(); p.add_argument("target", choices=["all", "docx", "pdf", "xlsx", "support"], nargs="?", default="all"); a = p.parse_args()
    ensure()
    if a.target in ("all", "support"): write_readme(); write_csv(); copy_image()
    if a.target in ("all", "docx"): write_docx()
    if a.target in ("all", "pdf"): write_pdf()
    if a.target in ("all", "xlsx"): write_xlsx()

if __name__ == "__main__": main()
