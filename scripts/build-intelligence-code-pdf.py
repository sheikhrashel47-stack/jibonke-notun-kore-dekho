from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A5
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
MANUSCRIPT = ROOT / 'docs' / 'the-intelligence-code-manuscript.md'
COVER = ROOT / 'client' / 'public' / 'intelligence-code-cover.png'
OUT = ROOT / 'client' / 'public' / 'intelligence-code.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)

REGULAR = '/usr/share/fonts/truetype/noto/NotoSerifBengali-Regular.ttf'
BOLD = '/usr/share/fonts/truetype/noto/NotoSerifBengali-Bold.ttf'
if not Path(BOLD).exists():
    BOLD = REGULAR
pdfmetrics.registerFont(TTFont('BengaliSerif', REGULAR))
pdfmetrics.registerFont(TTFont('BengaliSerif-Bold', BOLD))
pdfmetrics.registerFontFamily('BengaliSerif', normal='BengaliSerif', bold='BengaliSerif-Bold')

PAGE_W, PAGE_H = A5
MARGIN_X = 17 * mm
TOP = 18 * mm
BOTTOM = 17 * mm

class IntelligenceDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, **kwargs)
        frame = Frame(MARGIN_X, BOTTOM, PAGE_W - 2*MARGIN_X, PAGE_H - TOP - BOTTOM, id='normal')
        self.addPageTemplates([PageTemplate(id='book', frames=frame, onPage=self.draw_page)])
    def draw_page(self, canvas, doc):
        if doc.page <= 2:
            return
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor('#D8CDE7'))
        canvas.setLineWidth(0.4)
        canvas.line(MARGIN_X, PAGE_H - 12*mm, PAGE_W - MARGIN_X, PAGE_H - 12*mm)
        canvas.setFont('BengaliSerif', 7.5)
        canvas.setFillColor(colors.HexColor('#6B4E9B'))
        canvas.drawString(MARGIN_X, PAGE_H - 9*mm, 'বুদ্ধিমত্তার কোড')
        canvas.setFillColor(colors.HexColor('#6D6575'))
        canvas.drawRightString(PAGE_W - MARGIN_X, 9*mm, str(doc.page))
        canvas.restoreState()

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CoverTitle', fontName='BengaliSerif-Bold', fontSize=25, leading=31, alignment=TA_CENTER, textColor=colors.HexColor('#FFFFFF'), spaceAfter=8))
styles.add(ParagraphStyle(name='CoverSub', fontName='BengaliSerif', fontSize=11, leading=17, alignment=TA_CENTER, textColor=colors.HexColor('#F3EAFD')))
styles.add(ParagraphStyle(name='FrontTitle', fontName='BengaliSerif-Bold', fontSize=22, leading=28, alignment=TA_CENTER, textColor=colors.HexColor('#2D2440'), spaceAfter=8))
styles.add(ParagraphStyle(name='FrontSub', fontName='BengaliSerif', fontSize=11, leading=17, alignment=TA_CENTER, textColor=colors.HexColor('#5F526C')))
styles.add(ParagraphStyle(name='Part', fontName='BengaliSerif-Bold', fontSize=17, leading=23, textColor=colors.HexColor('#6B4E9B'), spaceBefore=8, spaceAfter=9))
styles.add(ParagraphStyle(name='Chapter', fontName='BengaliSerif-Bold', fontSize=15, leading=21, textColor=colors.HexColor('#2D2440'), spaceBefore=8, spaceAfter=10, keepWithNext=True))
styles.add(ParagraphStyle(name='Section', fontName='BengaliSerif-Bold', fontSize=11.5, leading=17, textColor=colors.HexColor('#6B4E9B'), spaceBefore=8, spaceAfter=5, keepWithNext=True))
styles.add(ParagraphStyle(name='BodyBn', fontName='BengaliSerif', fontSize=9.7, leading=16.3, alignment=TA_JUSTIFY, textColor=colors.HexColor('#2E2933'), spaceAfter=7))
styles.add(ParagraphStyle(name='BodySmall', fontName='BengaliSerif', fontSize=8.5, leading=13.5, textColor=colors.HexColor('#4B4352'), spaceAfter=5))
styles.add(ParagraphStyle(name='QuoteBn', fontName='BengaliSerif', fontSize=10.5, leading=17, leftIndent=10, rightIndent=8, textColor=colors.HexColor('#4E3D67'), borderColor=colors.HexColor('#C9B6E4'), borderWidth=1, borderPadding=8, spaceBefore=5, spaceAfter=9))
styles.add(ParagraphStyle(name='TOCPart', fontName='BengaliSerif-Bold', fontSize=10.5, leading=15, textColor=colors.HexColor('#6B4E9B'), spaceBefore=5, spaceAfter=2))
styles.add(ParagraphStyle(name='TOCChapter', fontName='BengaliSerif', fontSize=8.2, leading=12.5, textColor=colors.HexColor('#443A4D'), leftIndent=7, spaceAfter=1))
styles.add(ParagraphStyle(name='SmallCaps', fontName='BengaliSerif-Bold', fontSize=8.5, leading=12, textColor=colors.HexColor('#6B4E9B'), spaceBefore=5, spaceAfter=3))


def inline_markup(s: str) -> str:
    s = s.strip()
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = s.replace('&', '&amp;').replace('<b>', '___B_OPEN___').replace('</b>', '___B_CLOSE___')
    s = s.replace('<', '&lt;').replace('>', '&gt;')
    s = s.replace('___B_OPEN___', '<b>').replace('___B_CLOSE___', '</b>')
    return s


def parse_markdown(text):
    lines = text.splitlines()
    parts = []
    current_part = None
    current_ch = None
    current_section = None
    for line in lines:
        if line.startswith('## PART '):
            current_part = {'heading': line[3:].strip(), 'chapters': []}
            parts.append(current_part)
            current_ch = None
            current_section = None
        elif line.startswith('### অধ্যায় '):
            m = re.match(r'### অধ্যায় (\d+): (.+)', line)
            current_ch = {'number': int(m.group(1)), 'title': m.group(2), 'opening': [], 'sections': []}
            current_part['chapters'].append(current_ch)
            current_section = None
        elif line.startswith('#### '):
            current_section = {'title': line[5:].strip(), 'paragraphs': []}
            current_ch['sections'].append(current_section)
        elif current_ch is not None and line.strip():
            if current_section is None:
                current_ch['opening'].append(line.strip())
            else:
                current_section['paragraphs'].append(line.strip())
    return parts

md = MANUSCRIPT.read_text(encoding='utf-8')
parts = parse_markdown(md)
assert sum(len(p['chapters']) for p in parts) == 100

story = []
# cover page
if COVER.exists():
    img = Image(str(COVER), width=285, height=427.5)
    story.append(img)
else:
    story += [Spacer(1, 60*mm), Paragraph('THE INTELLIGENCE CODE', styles['FrontTitle']), Paragraph('বুদ্ধিমত্তার কোড', styles['FrontSub'])]
story.append(PageBreak())
story += [Spacer(1, 30*mm), Paragraph('THE INTELLIGENCE CODE', styles['FrontTitle']), Paragraph('বুদ্ধিমত্তার কোড', styles['FrontSub']), Spacer(1, 15*mm), Paragraph('কীভাবে আরও পরিষ্কার, দ্রুত, গভীর ও শক্তিশালীভাবে চিন্তা করা যায়', styles['FrontSub']), Spacer(1, 20*mm), Paragraph('Project owner: Zayan', styles['BodySmall']), Paragraph('বাংলা master e-book edition', styles['BodySmall']), PageBreak()]

story += [Paragraph('বিষয়সূচি', styles['Part']), Paragraph('২০টি Part এবং ১০০টি Chapter-এর পাঠযাত্রা', styles['BodySmall'])]
for part in parts:
    story.append(Paragraph(inline_markup(part['heading']), styles['TOCPart']))
    for ch in part['chapters']:
        story.append(Paragraph(inline_markup(f"{ch['number']:03d}. {ch['title']}"), styles['TOCChapter']))
story.append(PageBreak())

for pidx, part in enumerate(parts):
    story.append(Paragraph(inline_markup(part['heading']), styles['Part']))
    if pidx == 0:
        story.append(Paragraph('এই বই কোনো IQ guarantee নয়। এটি attention, memory, reasoning, creativity, decision এবং metacognition-এর সাহায্যে নিজের চিন্তার process দেখা ও উন্নত করার একটি ব্যবহারিক যাত্রা।', styles['QuoteBn']))
    for ch in part['chapters']:
        story.append(Paragraph(inline_markup(f"অধ্যায় {ch['number']:03d}: {ch['title']}"), styles['Chapter']))
        for paragraph in ch['opening']:
            if paragraph.startswith('>'):
                story.append(Paragraph(inline_markup(paragraph[1:].strip()), styles['QuoteBn']))
            else:
                story.append(Paragraph(inline_markup(paragraph), styles['BodyBn']))
        for section in ch['sections']:
            story.append(Paragraph(inline_markup(section['title']), styles['Section']))
            for paragraph in section['paragraphs']:
                if paragraph.startswith('**চ্যালেঞ্জ:**'):
                    paragraph = paragraph.replace('**চ্যালেঞ্জ:**', '<b>চ্যালেঞ্জ:</b>')
                if paragraph.startswith('**আজকের প্রয়োগ:**'):
                    paragraph = paragraph.replace('**আজকের প্রয়োগ:**', '<b>আজকের প্রয়োগ:</b>')
                story.append(Paragraph(inline_markup(paragraph), styles['BodyBn']))
        story.append(Spacer(1, 3*mm))
    if pidx < len(parts) - 1:
        story.append(PageBreak())

story += [PageBreak(), Paragraph('NOTES & SOURCES', styles['Part']), Paragraph('বৈজ্ঞানিক আলোচনার evidence anchors', styles['BodySmall'])]
refs = [
    ('[1]', 'Human intelligence and brain networks — Dialogues in Clinical Neuroscience / PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3181994/'),
    ('[2]', 'Working Memory Underpins Cognitive Development, Learning, and Education — PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4207727/'),
    ('[3]', 'Metacognition: ideas and insights from neuro- and educational sciences — npj Science of Learning', 'https://www.nature.com/articles/s41539-021-00089-5'),
    ('[4]', 'The Role of Metacognitive Components in Creative Thinking — Frontiers in Psychology', 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.02404/full'),
    ('[5]', 'Working Memory and Attention — PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6688548/'),
    ('[6]', 'A Neural Network Framework for Cognitive Bias — PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6129743/'),
    ('[7]', 'Decision-making, cognitive functions, impulsivity, and media use — PMC', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8547206/'),
]
for label, title, url in refs:
    story.append(Paragraph(inline_markup(f'{label} {title}'), styles['BodySmall']))
    story.append(Paragraph(inline_markup(url), styles['BodySmall']))
story += [Spacer(1, 8*mm), Paragraph('শেষ কথা', styles['Section']), Paragraph('বুদ্ধিমত্তার সবচেয়ে গভীর রূপ সবচেয়ে বেশি উত্তর জানার মধ্যে নেই। বরং কোন প্রশ্নটি করা উচিত, কোন তথ্যটি গুরুত্বপূর্ণ, কোথায় সন্দেহ করা উচিত, কখন নিজের মত বদলাতে হবে এবং কোন জিনিসটি এখনও আমরা জানি না—তা বুঝতে পারার মধ্যে আছে।', styles['QuoteBn'])]

doc = IntelligenceDocTemplate(str(OUT), pagesize=A5, leftMargin=MARGIN_X, rightMargin=MARGIN_X, topMargin=TOP, bottomMargin=BOTTOM, title='THE INTELLIGENCE CODE — বুদ্ধিমত্তার কোড', author='Zayan')
doc.build(story)
print(OUT)
