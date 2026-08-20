from __future__ import annotations

import re
from pathlib import Path
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A5
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak,
    Image, KeepTogether, Table, TableStyle, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
MANUSCRIPT = ROOT / 'docs' / 'the-hard-truth-manuscript.md'
COVER = ROOT / 'client' / 'public' / 'hard-truth-cover.png'
OUT = ROOT / 'client' / 'public' / 'hard-truth.pdf'
FONT_REG = '/usr/share/fonts/truetype/noto/NotoSerifBengali-Regular.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/noto/NotoSerifBengali-Bold.ttf'
if not Path(FONT_BOLD).exists():
    FONT_BOLD = FONT_REG
pdfmetrics.registerFont(TTFont('NotoBengali', FONT_REG))
pdfmetrics.registerFont(TTFont('NotoBengaliBold', FONT_BOLD))

PAGE_W, PAGE_H = A5
MARGIN_X = 18 * mm
TOP = 17 * mm
BOTTOM = 17 * mm

class BookDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, pagesize=A5, leftMargin=MARGIN_X, rightMargin=MARGIN_X, topMargin=TOP, bottomMargin=BOTTOM, **kwargs)
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id='normal')
        self.addPageTemplates([PageTemplate(id='book', frames=[frame], onPage=draw_page)])

def draw_page(canvas, doc):
    canvas.saveState()
    page = canvas.getPageNumber()
    if page > 1:
        canvas.setStrokeColor(colors.HexColor('#D8D0C5'))
        canvas.setLineWidth(0.35)
        canvas.line(MARGIN_X, PAGE_H - 11*mm, PAGE_W - MARGIN_X, PAGE_H - 11*mm)
        canvas.setFont('NotoBengali', 7.5)
        canvas.setFillColor(colors.HexColor('#716B63'))
        canvas.drawString(MARGIN_X, PAGE_H - 9*mm, 'THE HARD TRUTH')
        canvas.drawRightString(PAGE_W - MARGIN_X, 9*mm, str(page))
    canvas.restoreState()

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CoverTitle', fontName='NotoBengaliBold', fontSize=28, leading=34, textColor=colors.HexColor('#EFE4D1'), alignment=TA_CENTER, spaceAfter=8))
styles.add(ParagraphStyle(name='CoverSubtitle', fontName='NotoBengali', fontSize=11, leading=17, textColor=colors.HexColor('#E8D8C4'), alignment=TA_CENTER))
styles.add(ParagraphStyle(name='FrontTitle', fontName='NotoBengaliBold', fontSize=25, leading=31, textColor=colors.HexColor('#1D2427'), alignment=TA_CENTER, spaceAfter=10))
styles.add(ParagraphStyle(name='FrontSubtitle', fontName='NotoBengali', fontSize=12, leading=19, textColor=colors.HexColor('#5D5147'), alignment=TA_CENTER, spaceAfter=20))
styles.add(ParagraphStyle(name='Chapter', fontName='NotoBengaliBold', fontSize=18, leading=25, textColor=colors.HexColor('#9B3E22'), spaceBefore=5, spaceAfter=9, keepWithNext=True))
styles.add(ParagraphStyle(name='ChapterSub', fontName='NotoBengali', fontSize=10.5, leading=16, textColor=colors.HexColor('#6C5E54'), spaceAfter=14, keepWithNext=True))
styles.add(ParagraphStyle(name='Heading', fontName='NotoBengaliBold', fontSize=12.5, leading=18, textColor=colors.HexColor('#27343A'), spaceBefore=11, spaceAfter=5, keepWithNext=True))
styles.add(ParagraphStyle(name='BodyBn', fontName='NotoBengali', fontSize=9.5, leading=16, textColor=colors.HexColor('#2C2C2A'), alignment=TA_LEFT, spaceAfter=7, splitLongWords=1))
styles.add(ParagraphStyle(name='SmallBn', fontName='NotoBengali', fontSize=8.2, leading=13, textColor=colors.HexColor('#5B554E'), spaceAfter=5))
styles.add(ParagraphStyle(name='QuoteBn', fontName='NotoBengali', fontSize=11, leading=18, textColor=colors.HexColor('#6E3423'), leftIndent=12, rightIndent=7, borderColor=colors.HexColor('#C47A55'), borderWidth=0.7, borderPadding=7, spaceBefore=7, spaceAfter=10))
styles.add(ParagraphStyle(name='TOC', fontName='NotoBengali', fontSize=9.3, leading=14, textColor=colors.HexColor('#2C2C2A'), spaceAfter=4))


def esc(s: str) -> str:
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def inline(s: str) -> str:
    s = esc(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'`(.+?)`', r'<font name="NotoBengaliBold">\1</font>', s)
    return s

def para(text, style='BodyBn'):
    return Paragraph(inline(text), styles[style])

def add_markdown(story, text):
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        if line == '---':
            story.append(Spacer(1, 5))
            story.append(HRFlowable(width='100%', thickness=0.5, color=colors.HexColor('#CFC4B5'), spaceBefore=3, spaceAfter=9))
            i += 1
            continue
        if line.startswith('## Chapter '):
            story.append(Paragraph(inline(line[3:]), styles['Chapter']))
            i += 1
            continue
        if line.startswith('### '):
            story.append(Paragraph(inline(line[4:]), styles['Heading']))
            i += 1
            continue
        if line.startswith('## '):
            story.append(Paragraph(inline(line[3:]), styles['Heading']))
            i += 1
            continue
        if line.startswith('# '):
            story.append(Paragraph(inline(line[2:]), styles['FrontTitle']))
            i += 1
            continue
        if line.startswith('> '):
            story.append(Paragraph(inline(line[2:]), styles['QuoteBn']))
            i += 1
            continue
        if line.startswith('- ') or re.match(r'^\d+\. ', line):
            bullet = re.sub(r'^(-|\d+\.)\s+', '• ', line)
            story.append(para(bullet, 'BodyBn'))
            i += 1
            continue
        block = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not lines[i].startswith(('#', '>', '---', '- ')) and not re.match(r'^\d+\. ', lines[i].strip()):
            block.append(lines[i].strip())
            i += 1
        story.append(para(' '.join(block)))

raw = MANUSCRIPT.read_text(encoding='utf-8')
# Split front matter, chapters, and final sections.
chapter_matches = list(re.finditer(r'^## Chapter \d+: .+$', raw, re.M))
chapters = []
for idx, m in enumerate(chapter_matches):
    end = chapter_matches[idx+1].start() if idx + 1 < len(chapter_matches) else len(raw)
    chapters.append(raw[m.start():end].strip())
front = raw[:chapter_matches[0].start()].strip()

story = []
# Cover page
cover_w = PAGE_W - 2 * MARGIN_X
cover_h = cover_w * 1.5
story.append(Image(str(COVER), width=cover_w, height=cover_h))
story.append(PageBreak())
# Title and front matter
story.append(Spacer(1, 22*mm))
story.append(Paragraph('THE HARD TRUTH', styles['FrontTitle']))
story.append(Paragraph('জীবন, ব্যর্থতা, উচ্চাকাঙ্ক্ষা ও নিজেকে গড়ে তোলার একটি বাস্তববাদী নির্দেশিকা', styles['FrontSubtitle']))
story.append(HRFlowable(width='55%', thickness=1, color=colors.HexColor('#A84B2C'), spaceBefore=5, spaceAfter=18, hAlign='CENTER'))
story.append(para('Motivation that survives reality.', 'QuoteBn'))
story.append(Spacer(1, 18*mm))
story.append(para('বাংলা reality-based motivational non-fiction edition', 'SmallBn'))
story.append(para('© 2026 Zayan. All rights reserved.', 'SmallBn'))
story.append(PageBreak())
# Include front matter without duplicate title and TOC generation.
for block in re.split(r'\n---\n', front):
    if block.strip():
        add_markdown(story, block.strip())
story.append(PageBreak())
# Table of contents
story.append(Paragraph('সূচিপত্র', styles['FrontTitle']))
for n, ch in enumerate(chapters, 1):
    m = re.search(r'^## Chapter (\d+): (.+)$', ch, re.M)
    if m:
        title = m.group(2).strip()
        sub = re.search(r'^### (.+)$', ch, re.M)
        subtitle = sub.group(1).strip() if sub else ''
        story.append(Paragraph(f'{n:02d}. {inline(title)} — {inline(subtitle)}', styles['TOC']))
story.append(Spacer(1, 8))
story.append(Paragraph('Personal Life Operating System', styles['TOC']))
story.append(Paragraph('References / Sources', styles['TOC']))
story.append(PageBreak())
# Chapters
for idx, ch in enumerate(chapters):
    add_markdown(story, ch)
    if idx != len(chapters) - 1:
        story.append(PageBreak())
# Final sections are already in the last chapter slice after Chapter 20; add the book’s OS and references from source.
final_start = raw.find('## Personal Life Operating System')
if final_start != -1:
    # avoid adding chapter 20's trailing duplicate if it contains final sections; they are not within chapter 20 in source.
    final_text = raw[final_start:].strip()
    story.append(PageBreak())
    add_markdown(story, final_text)

OUT.parent.mkdir(parents=True, exist_ok=True)
doc = BookDocTemplate(str(OUT), title='THE HARD TRUTH', author='Zayan', subject='বাস্তববাদী জীবন নির্দেশিকা')
doc.build(story)
print(OUT)
print(f'bytes={OUT.stat().st_size}')
