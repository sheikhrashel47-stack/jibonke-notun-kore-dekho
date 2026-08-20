import json
import html
from pathlib import Path
from weasyprint import HTML

ROOT = Path(__file__).resolve().parents[1]
DATA = Path('/home/ubuntu/presence-data.json')
OUT = ROOT / 'public' / 'the_presence_code_ebook.pdf'
COVER = ROOT / 'public' / 'presence-code-cover.png'

book = json.loads(DATA.read_text(encoding='utf-8'))
chapters = book['chapters']

def esc(value):
    return html.escape(str(value), quote=True)

def render_block(block):
    content = esc(block.get('content', ''))
    if block.get('type') == 'subheading':
        return f'<h3>{content}</h3>'
    return f'<p>{content}</p>'

def render_chapter(chapter):
    sections = []
    for section in chapter.get('sections', []):
        body = ''.join(render_block(block) for block in section.get('blocks', []))
        sections.append(f'<section><h2>{esc(section.get("title", ""))}</h2>{body}</section>')
    exercises = chapter.get('exercises') or []
    exercise_html = ''
    if exercises:
        items = ''.join(f'<li><strong>{esc(item.get("title", "অনুশীলন"))}</strong><br>{esc(item.get("prompt", ""))}</li>' for item in exercises)
        exercise_html = f'<aside class="practice"><h2>আজকের অনুশীলন</h2><ol>{items}</ol></aside>'
    return f'''<article class="chapter">
      <div class="chapter-kicker">অধ্যায় {int(chapter.get("number", 0)):02d}</div>
      <h1>{esc(chapter.get("title", ""))}</h1>
      <p class="subtitle">{esc(chapter.get("subtitle", ""))}</p>
      {''.join(sections)}
      {exercise_html}
    </article>'''

cover_uri = COVER.as_uri()
chapters_html = ''.join(render_chapter(chapter) for chapter in chapters)
html_doc = f'''<!doctype html>
<html lang="bn">
<head>
<meta charset="utf-8">
<style>
@font-face {{ font-family: 'Noto Serif Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSerifBengali-Regular.ttf'); font-weight: 400; }}
@font-face {{ font-family: 'Noto Serif Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSerifBengali-Bold.ttf'); font-weight: 700; }}
@font-face {{ font-family: 'Noto Sans Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSansBengali-Regular.ttf'); font-weight: 400; }}
@font-face {{ font-family: 'Noto Sans Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSansBengali-Bold.ttf'); font-weight: 700; }}
@page {{ size: A5; margin: 18mm 17mm 20mm; @bottom-center {{ content: counter(page); color: #8a6a5b; font-family: 'Noto Sans Bengali'; font-size: 9pt; }} }}
@page :first {{ margin: 0; @bottom-center {{ content: none; }} }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; color: #2b1c16; font-family: 'Noto Serif Bengali', serif; font-size: 11.5pt; line-height: 1.85; }}
.cover {{ page: cover; page-break-after: always; width: 148mm; height: 210mm; display: flex; align-items: stretch; justify-content: stretch; }}
.cover img {{ width: 100%; height: 100%; object-fit: cover; }}
.frontmatter {{ page-break-after: always; padding: 22mm 12mm; text-align: center; }}
.frontmatter h1 {{ font-size: 29pt; line-height: 1.25; margin: 0 0 12mm; color: #6f381f; }}
.frontmatter .bn-title {{ font-size: 18pt; margin-bottom: 6mm; }}
.frontmatter p {{ text-align: left; margin: 5mm 0; }}
.frontmatter .note {{ margin-top: 20mm; padding: 6mm; border: 1px solid #d9b8a3; background: #fbf3ee; text-align: left; }}
.chapter {{ page-break-before: always; }}
.chapter-kicker {{ color: #a15e3b; font-family: 'Noto Sans Bengali'; font-size: 10pt; letter-spacing: .5px; margin-bottom: 3mm; }}
.chapter h1 {{ font-size: 22pt; line-height: 1.35; margin: 0 0 2mm; color: #542918; }}
.chapter .subtitle {{ color: #7b6256; font-size: 11pt; margin: 0 0 10mm; border-bottom: 1px solid #e4cfc1; padding-bottom: 6mm; }}
.chapter section {{ margin: 7mm 0 9mm; }}
.chapter h2 {{ font-size: 15pt; line-height: 1.4; color: #8a4b2a; margin: 0 0 3mm; }}
.chapter h3 {{ font-size: 12pt; color: #6e4b3b; margin: 4mm 0 1mm; }}
.chapter p {{ margin: 0 0 3.5mm; orphans: 3; widows: 3; }}
.practice {{ margin-top: 10mm; padding: 6mm 7mm; background: #fbf3ee; border-left: 3px solid #a15e3b; page-break-inside: avoid; }}
.practice h2 {{ margin-top: 0; }}
.practice ol {{ margin: 2mm 0 0; padding-left: 7mm; }}
.practice li {{ margin: 3mm 0; }}
.end {{ page-break-before: always; text-align: center; padding-top: 55mm; }}
.end h1 {{ color: #6f381f; font-size: 24pt; }}
</style>
</head>
<body>
  <div class="cover"><img src="{cover_uri}" alt="The Presence Code cover"></div>
  <section class="frontmatter">
    <h1>The Presence Code</h1>
    <div class="bn-title">নিজেকে প্রকাশ করার অদৃশ্য বিজ্ঞান</div>
    <p><strong>JIBON প্রকাশনা</strong></p>
    <p>এই বইটি আত্মবিশ্বাস, উপস্থিতি, যোগাযোগ, boundary এবং মানুষের সঙ্গে আরও সত্যিকারেরভাবে connect করার বিষয়ে একটি ব্যবহারিক পাঠযাত্রা। উদ্দেশ্য অন্য কারও মতো হওয়া নয়; নিজের ভেতরের স্থিরতা ও উষ্ণতাকে পরিষ্কারভাবে প্রকাশ করা।</p>
    <div class="note"><strong>পাঠকের জন্য নোট:</strong> বইয়ের অনুশীলনগুলো নিজের গতি অনুযায়ী করো। মানসিক অস্বস্তি বা গভীর কষ্টের ক্ষেত্রে বিশ্বস্ত মানুষ বা qualified mental-health professional-এর সাহায্য নেওয়া ভালো।</div>
  </section>
  {chapters_html}
  <section class="end"><h1>পাঠ শেষ নয়</h1><p>উপস্থিতি একদিনে তৈরি হয় না। ছোট, সত্যিকারের অনুশীলনই ধীরে ধীরে তোমার কণ্ঠ, আচরণ এবং সম্পর্কের মধ্যে তার জায়গা করে নেয়।</p><p><strong>JIBON প্রকাশনা</strong></p></section>
</body>
</html>'''

HTML(string=html_doc, base_url=str(ROOT)).write_pdf(str(OUT))
print(f'Wrote {OUT} with {len(chapters)} chapters')
