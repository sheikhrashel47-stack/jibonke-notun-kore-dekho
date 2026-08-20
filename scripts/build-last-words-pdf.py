from __future__ import annotations

import re
from pathlib import Path
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak, Image, HRFlowable
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
MANUSCRIPT = ROOT / 'docs' / 'শেষ-কথাটাও-বলা-হলো-না-manuscript.md'
COVER = ROOT / 'client' / 'public' / 'last-words-cover.png'
OUT = ROOT / 'client' / 'public' / 'last-words.pdf'
FONT_REG = '/usr/share/fonts/truetype/noto/NotoSerifBengali-Regular.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/noto/NotoSerifBengali-Bold.ttf'
if not Path(FONT_BOLD).exists():
    FONT_BOLD = FONT_REG
pdfmetrics.registerFont(TTFont('NotoBengali', FONT_REG))
pdfmetrics.registerFont(TTFont('NotoBengaliBold', FONT_BOLD))
PAGE_W, PAGE_H = A4
MARGIN_X = 14 * mm
TOP = 14 * mm
BOTTOM = 14 * mm

class NovelDoc(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, pagesize=A4, leftMargin=MARGIN_X, rightMargin=MARGIN_X, topMargin=TOP, bottomMargin=BOTTOM, **kwargs)
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id='normal')
        self.addPageTemplates([PageTemplate(id='novel', frames=[frame], onPage=draw_page)])

def draw_page(canvas, doc):
    canvas.saveState()
    p = canvas.getPageNumber()
    if p > 1:
        canvas.setStrokeColor(colors.HexColor('#D2C9C2'))
        canvas.setLineWidth(0.35)
        canvas.line(MARGIN_X, PAGE_H - 10.5*mm, PAGE_W - MARGIN_X, PAGE_H - 10.5*mm)
        canvas.setFont('NotoBengali', 7.3)
        canvas.setFillColor(colors.HexColor('#746A63'))
        canvas.drawString(MARGIN_X, PAGE_H - 8.5*mm, 'শেষ কথাটাও বলা হলো না')
        canvas.drawRightString(PAGE_W - MARGIN_X, 8.5*mm, str(p))
    canvas.restoreState()

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='NovelTitle', fontName='NotoBengaliBold', fontSize=25, leading=33, textColor=colors.HexColor('#202D36'), alignment=TA_CENTER, spaceAfter=10))
styles.add(ParagraphStyle(name='Subtitle', fontName='NotoBengali', fontSize=11.5, leading=18, textColor=colors.HexColor('#6F5F58'), alignment=TA_CENTER, spaceAfter=18))
styles.add(ParagraphStyle(name='Part', fontName='NotoBengaliBold', fontSize=17, leading=25, textColor=colors.HexColor('#254D5A'), spaceBefore=5, spaceAfter=11, keepWithNext=True))
styles.add(ParagraphStyle(name='Chapter', fontName='NotoBengaliBold', fontSize=15.5, leading=23, textColor=colors.HexColor('#9E4E54'), spaceBefore=4, spaceAfter=10, keepWithNext=True))
styles.add(ParagraphStyle(name='Scene', fontName='NotoBengaliBold', fontSize=11, leading=17, textColor=colors.HexColor('#415862'), spaceBefore=10, spaceAfter=4, keepWithNext=True))
styles.add(ParagraphStyle(name='Body', fontName='NotoBengali', fontSize=8.4, leading=12.3, textColor=colors.HexColor('#2F3030'), alignment=TA_LEFT, spaceAfter=2.5, splitLongWords=1))
styles.add(ParagraphStyle(name='Dialogue', fontName='NotoBengali', fontSize=8.3, leading=11.8, textColor=colors.HexColor('#252D31'), leftIndent=7, rightIndent=3, spaceAfter=1.2, splitLongWords=1))
styles.add(ParagraphStyle(name='Small', fontName='NotoBengali', fontSize=8.2, leading=13, textColor=colors.HexColor('#69605A'), spaceAfter=5))
styles.add(ParagraphStyle(name='Toc', fontName='NotoBengali', fontSize=8.5, leading=13, textColor=colors.HexColor('#30383B'), spaceAfter=1.2))
styles.add(ParagraphStyle(name='Quote', fontName='NotoBengali', fontSize=10, leading=16, textColor=colors.HexColor('#7B4049'), leftIndent=10, rightIndent=5, borderColor=colors.HexColor('#C38A8D'), borderWidth=0.6, borderPadding=6, spaceBefore=6, spaceAfter=8))

def esc(s):
    return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

def inline(s):
    s = esc(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    return s

def add_para(story, text, style='Body'):
    story.append(Paragraph(inline(text), styles[style]))

def add_markdown(story, block):
    lines = block.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        if line == '---':
            story.append(HRFlowable(width='100%', thickness=0.45, color=colors.HexColor('#D5C8C1'), spaceBefore=3, spaceAfter=8))
            i += 1
            continue
        if line.startswith('# '):
            story.append(Paragraph(inline(line[2:]), styles['Part']))
            i += 1
            continue
        if line.startswith('## অধ্যায়'):
            story.append(Paragraph(inline(line[3:]), styles['Chapter']))
            i += 1
            continue
        if line.startswith('### '):
            story.append(Paragraph(inline(line[4:]), styles['Scene']))
            i += 1
            continue
        if line.startswith('## '):
            story.append(Paragraph(inline(line[3:]), styles['Chapter']))
            i += 1
            continue
        if line.startswith('> '):
            add_para(story, line[2:], 'Quote')
            i += 1
            continue
        style = 'Dialogue' if re.match(r'^\*\*(আরিয়ান|মেহরিন):\*\*', line) else 'Body'
        block_lines = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not lines[i].startswith(('#', '>', '---')):
            block_lines.append(lines[i].strip())
            i += 1
        add_para(story, ' '.join(block_lines), style)

raw = MANUSCRIPT.read_text(encoding='utf-8')
chapter_matches = list(re.finditer(r'^## অধ্যায় \d+: .+$', raw, re.M))
chapters = []
for i, m in enumerate(chapter_matches):
    end = chapter_matches[i+1].start() if i + 1 < len(chapter_matches) else raw.find('\n# শেষ কথা')
    chapters.append(raw[m.start():end if end != -1 else len(raw)].strip())
front = raw[:chapter_matches[0].start()].strip()
final = raw[raw.find('# শেষ কথা'):].strip() if '# শেষ কথা' in raw else ''

story = []
cover_w = PAGE_W - 2 * MARGIN_X - 14
cover_h = min(cover_w * 1.5, PAGE_H - TOP - BOTTOM - 14)
story.append(Image(str(COVER), width=cover_w, height=cover_h))
story.append(PageBreak())
story.append(Spacer(1, 20*mm))
story.append(Paragraph('শেষ কথাটাও বলা হলো না', styles['NovelTitle']))
story.append(Paragraph('একটি বাংলা literary tragedy', styles['Subtitle']))
story.append(HRFlowable(width='50%', thickness=1, color=colors.HexColor('#9E4E54'), spaceBefore=4, spaceAfter=18, hAlign='CENTER'))
story.append(Paragraph('বন্ধুত্ব, ভালোবাসা, ভুল বোঝাবুঝি, নীরবতা এবং সময়ের গল্প', styles['Subtitle']))
story.append(Spacer(1, 20*mm))
story.append(Paragraph('লেখক: Zayan', styles['Small']))
story.append(PageBreak())
# Front matter: title, dedication, note, character list
add_markdown(story, front)
story.append(PageBreak())
# Contents
story.append(Paragraph('সূচিপত্র', styles['NovelTitle']))
for m in chapter_matches:
    title = m.group(0).split(':',1)[1].strip()
    num = re.search(r'অধ্যায় (\d+)', m.group(0)).group(1)
    story.append(Paragraph(f'{int(num):02d}. {inline(title)}', styles['Toc']))
story.append(PageBreak())
for i, chapter in enumerate(chapters):
    add_markdown(story, chapter)
    if i != len(chapters) - 1:
        story.append(PageBreak())
if final:
    story.append(PageBreak())
    add_markdown(story, final)

OUT.parent.mkdir(parents=True, exist_ok=True)
doc = NovelDoc(str(OUT), title='শেষ কথাটাও বলা হলো না', author='Zayan', subject='বাংলা literary tragedy')
doc.build(story)
print(OUT)
print(f'bytes={OUT.stat().st_size}')
