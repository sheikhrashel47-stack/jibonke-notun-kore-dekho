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
    content = esc(block.get('content', '')).replace('\\n', '<br>')
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

def lines(count=8):
    return ''.join('<div class="writing-line"></div>' for _ in range(count))

def render_worksheets(chapter):
    n = int(chapter.get('number', 0))
    title = esc(chapter.get('title', ''))
    return f'''<section class="worksheet practice-sheet">
      <div class="worksheet-kicker">অধ্যায় {n:02d} · প্রয়োগপত্র</div>
      <h1>{title}</h1>
      <p class="worksheet-lead">এই পাতাটি পড়ার পরের বাস্তব প্রয়োগের জন্য। উত্তর নিখুঁত হতে হবে না; নির্দিষ্ট, সৎ এবং নিজের জীবনের সঙ্গে যুক্ত হলেই যথেষ্ট।</p>
      <div class="prompt"><strong>১. আজকের সবচেয়ে গুরুত্বপূর্ণ insight কী?</strong>{lines(2)}</div>
      <div class="prompt"><strong>২. কোন বাস্তব পরিস্থিতিতে এটি প্রয়োগ করবে?</strong>{lines(2)}</div>
      <div class="prompt"><strong>৩. তোমার প্রথম ছোট পদক্ষেপ ও সম্ভাব্য বাধা কী?</strong>{lines(2)}</div>
      <div class="prompt"><strong>৪. একটি সাম্প্রতিক ঘটনা: fact, feeling ও next action আলাদা করে লেখো।</strong>{lines(2)}</div>
      <p class="worksheet-footer">মনে রেখো: reflection নিজেকে দোষী করার জন্য নয়; নিজের choice আরও পরিষ্কার করার জন্য।</p>
    </section>'''

def render_appendix():
    return f'''<section class="worksheet appendix"><div class="worksheet-kicker">পরিশিষ্ট · ৩০ দিনের Presence Practice</div><h1>প্রতিদিনের ছোট অনুশীলন</h1><p class="worksheet-lead">আগামী ৩০ দিনে প্রতিদিন একটি ছোট, observable practice বেছে নাও। লক্ষ্য perfect performance নয়; নিজের উপস্থিতি, clarity ও warmth-এর evidence তৈরি করা।</p><div class="prompt"><strong>সপ্তাহ ১: pause, posture ও breathing</strong>{lines(8)}</div><div class="prompt"><strong>সপ্তাহ ২: চোখের যোগাযোগ, কণ্ঠ ও listening</strong>{lines(8)}</div><div class="prompt"><strong>সপ্তাহ ৩: boundary, request ও assertive language</strong>{lines(8)}</div><div class="prompt"><strong>সপ্তাহ ৪: কঠিন মুহূর্তে repair ও follow-through</strong>{lines(8)}</div></section>
    <section class="worksheet appendix"><div class="worksheet-kicker">পরিশিষ্ট · Conversation Planner</div><h1>কঠিন কথোপকথনের আগে</h1><p class="worksheet-lead">কথা বলার আগে উদ্দেশ্য, সীমা এবং desired next step লিখে নাও। এতে আবেগ অস্বীকার না করেও ভাষা বেশি পরিষ্কার থাকে।</p><div class="prompt"><strong>আমি কী বলতে চাই, এক বাক্যে?</strong>{lines(8)}</div><div class="prompt"><strong>কোন fact বা নির্দিষ্ট ঘটনার ওপর কথা বলব?</strong>{lines(8)}</div><div class="prompt"><strong>আমার boundary বা request কী?</strong>{lines(8)}</div><div class="prompt"><strong>অপর পক্ষ ভিন্নভাবে প্রতিক্রিয়া দিলে আমার respectful next step কী?</strong>{lines(8)}</div></section>
    <section class="worksheet appendix"><div class="worksheet-kicker">পরিশিষ্ট · Boundary Language Lab</div><h1>স্পষ্ট কিন্তু মানবিক বাক্য</h1><p class="worksheet-lead">নিজের ভাষায় তিনটি বাক্য লিখে রাখো। এগুলো প্রয়োজনে বদলাবে; মুখস্থ script হিসেবে নয়, clarity-এর সহায়ক হিসেবে ব্যবহার করবে।</p><div class="prompt"><strong>না বলার বাক্য</strong>{lines(8)}</div><div class="prompt"><strong>সময় চাওয়ার বাক্য</strong>{lines(8)}</div><div class="prompt"><strong>ভিন্নমত জানানোর বাক্য</strong>{lines(8)}</div><div class="prompt"><strong>কথা থামিয়ে নিরাপদে সরে আসার বাক্য</strong>{lines(8)}</div></section>
    <section class="worksheet appendix"><div class="worksheet-kicker">পরিশিষ্ট · Weekly Review</div><h1>নিজের অগ্রগতি দেখা</h1><p class="worksheet-lead">প্রতি সপ্তাহের শেষে ফলাফল নয়, process-এর দিকে তাকাও। কোথায় তুমি pause নিয়েছ, কোথায় repair করেছ, এবং কোথায় support চেয়েছ—এসবও progress।</p><div class="prompt"><strong>এই সপ্তাহে কোন আচরণটি আমার values-এর সঙ্গে সবচেয়ে বেশি মিলেছে?</strong>{lines(8)}</div><div class="prompt"><strong>কোথায় আমি automatic reaction-এর বদলে choice তৈরি করেছি?</strong>{lines(8)}</div><div class="prompt"><strong>পরের সপ্তাহে একটি জিনিস কী সহজ করব?</strong>{lines(8)}</div></section>
    <section class="worksheet appendix"><div class="worksheet-kicker">পরিশিষ্ট · Personal Notes</div><h1>আমার Presence Code</h1><p class="worksheet-lead">বইটি শেষ করার পর নিজের তিনটি guiding principle লিখে রাখো। এগুলো অন্যকে impress করার জন্য নয়; নিজের আচরণকে নিজের values-এর সঙ্গে align করার জন্য।</p><div class="prompt"><strong>আমি কেমন মানুষ হিসেবে উপস্থিত হতে চাই?</strong>{lines(10)}</div><div class="prompt"><strong>চাপের সময় কোন বাক্যটি আমাকে grounded রাখবে?</strong>{lines(8)}</div><div class="prompt"><strong>কোন মানুষ বা support system-এর কাছে ফিরব?</strong>{lines(6)}</div></section>'''

cover_uri = COVER.as_uri()
chapters_html = ''.join(render_chapter(chapter) for chapter in chapters) + render_appendix()
html_doc = f'''<!doctype html>
<html lang="bn">
<head>
<meta charset="utf-8">
<style>
@font-face {{ font-family: 'Noto Serif Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSerifBengali-Regular.ttf'); font-weight: 400; }}
@font-face {{ font-family: 'Noto Serif Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSerifBengali-Bold.ttf'); font-weight: 700; }}
@font-face {{ font-family: 'Noto Sans Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSansBengali-Regular.ttf'); font-weight: 400; }}
@font-face {{ font-family: 'Noto Sans Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSansBengali-Bold.ttf'); font-weight: 700; }}
@page {{ size: A5; margin: 12mm 12mm 14mm; @bottom-center {{ content: counter(page); color: #8a6a5b; font-family: 'Noto Sans Bengali'; font-size: 9pt; }} }}
@page cover {{ size: A5; margin: 0; @bottom-center {{ content: none; }} }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; color: #2b1c16; font-family: 'Noto Serif Bengali', serif; font-size: 10pt; line-height: 1.55; }}
.cover {{ page: cover; page-break-after: always; width: 148mm; height: 210mm; display: flex; }}
.cover img {{ width: 100%; height: 100%; object-fit: cover; }}
.frontmatter {{ page-break-after: always; padding: 22mm 12mm; text-align: center; }}
.frontmatter h1 {{ font-size: 29pt; line-height: 1.25; margin: 0 0 12mm; color: #6f381f; }}
.frontmatter .bn-title {{ font-size: 18pt; margin-bottom: 6mm; }}
.frontmatter p {{ text-align: left; margin: 5mm 0; }}
.frontmatter .note {{ margin-top: 20mm; padding: 6mm; border: 1px solid #d9b8a3; background: #fbf3ee; text-align: left; }}
.chapter {{ page-break-before: always; }}
.chapter section {{ break-inside: auto; }}
.chapter-kicker, .worksheet-kicker {{ color: #a15e3b; font-family: 'Noto Sans Bengali'; font-size: 10pt; letter-spacing: .4px; margin-bottom: 3mm; }}
.chapter h1 {{ font-size: 18pt; line-height: 1.25; margin: 0 0 1.5mm; color: #542918; }}
.chapter .subtitle {{ color: #7b6256; font-size: 9.5pt; margin: 0 0 5mm; border-bottom: 1px solid #e4cfc1; padding-bottom: 3mm; }}
.chapter section {{ margin: 3.5mm 0 5mm; }}
.chapter h2 {{ font-size: 12.5pt; line-height: 1.3; color: #8a4b2a; margin: 0 0 1.5mm; }}
.chapter h3 {{ font-size: 10.5pt; color: #6e4b3b; margin: 2mm 0 1mm; }}
.chapter p {{ margin: 0 0 2mm; orphans: 2; widows: 2; }}
.practice {{ margin-top: 10mm; padding: 6mm 7mm; background: #fbf3ee; border-left: 3px solid #a15e3b; page-break-inside: avoid; }}
.practice h2 {{ margin-top: 0; }}
.practice ol {{ margin: 2mm 0 0; padding-left: 7mm; }}
.practice li {{ margin: 3mm 0; }}
.worksheet {{ page-break-before: always; page-break-after: always; min-height: 150mm; }}
.worksheet h1 {{ color: #542918; font-size: 20pt; line-height: 1.35; margin: 0 0 5mm; }}
.worksheet-lead {{ color: #6d584e; margin: 0 0 9mm; }}
.prompt {{ margin: 4mm 0 5mm; page-break-inside: avoid; }}
.prompt strong {{ display: block; color: #6f381f; font-family: 'Noto Sans Bengali'; font-size: 10.8pt; margin-bottom: 2mm; }}
.writing-line {{ height: 5.5mm; border-bottom: .35pt solid #d8c3b7; }}
.practice-sheet {{ padding-top: 2mm; }}
.field-sheet {{ padding-top: 2mm; }}
.worksheet-footer {{ margin-top: 8mm; padding: 4mm 5mm; color: #7b6256; background: #fbf3ee; border-left: 3px solid #d29a75; }}
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
    <p>এই বিস্তৃত সংস্করণে প্রতিটি অধ্যায়ের সঙ্গে বাস্তব দৃশ্য, কথোপকথন, প্রয়োগপদ্ধতি এবং দুই পাতার guided worksheet রাখা হয়েছে, যাতে পাঠক শুধু পড়েন না—নিজের জীবনে অনুশীলনও করতে পারেন।</p>
    <div class="note"><strong>পাঠকের জন্য নোট:</strong> বইয়ের অনুশীলনগুলো নিজের গতি অনুযায়ী করো। মানসিক অস্বস্তি বা গভীর কষ্টের ক্ষেত্রে বিশ্বস্ত মানুষ বা qualified mental-health professional-এর সাহায্য নেওয়া ভালো।</div>
  </section>
  {chapters_html}
  <section class="end"><h1>পাঠ শেষ নয়</h1><p>উপস্থিতি একদিনে তৈরি হয় না। ছোট, সত্যিকারের অনুশীলনই ধীরে ধীরে তোমার কণ্ঠ, আচরণ এবং সম্পর্কের মধ্যে তার জায়গা করে নেয়।</p><p><strong>JIBON প্রকাশনা</strong></p></section>
</body>
</html>'''

HTML(string=html_doc, base_url=str(ROOT)).write_pdf(str(OUT))
print(f'Wrote {OUT} with {len(chapters)} chapters and 5 appendix pages')
