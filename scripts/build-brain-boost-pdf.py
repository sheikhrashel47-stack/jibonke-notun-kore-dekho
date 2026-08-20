from pathlib import Path
from markdown import markdown
from weasyprint import HTML, CSS

ROOT = Path(__file__).resolve().parents[1]
MANUSCRIPT = ROOT / "client" / "src" / "data" / "brain-boost-manuscript.md"
COVER = ROOT / "client" / "public" / "brain-boost-cover.png"
OUTPUT = ROOT / "client" / "public" / "brain-boost.pdf"

body = markdown(MANUSCRIPT.read_text(encoding="utf-8"), extensions=["extra", "sane_lists"])
cover_uri = COVER.as_uri()
html = f"""<!doctype html>
<html lang=\"bn\">
<head><meta charset=\"utf-8\"><title>BRAIN BOOST — মস্তিষ্ককে শাণিত করার বিজ্ঞান</title></head>
<body>
<section class=\"cover\"><img src=\"{cover_uri}\" alt=\"BRAIN BOOST cover\"></section>
<section class=\"frontmatter\">
  <p class=\"eyebrow\">JIBON প্রকাশনা · Brain Training Journey</p>
  <h1>BRAIN BOOST</h1>
  <h2>মস্তিষ্ককে শাণিত করার বিজ্ঞান</h2>
  <p>মনোযোগ, স্মৃতি, যুক্তি, সমস্যা সমাধান, দ্রুত চিন্তা ও বুদ্ধিবৃত্তিক ক্ষমতা অনুশীলনের ২০ level-এর বাংলা পাঠযাত্রা।</p>
  <p class=\"author\">লেখক: শেখ রাসেল</p>
  <blockquote>এই বই নির্দিষ্ট IQ point বাড়ার নিশ্চয়তা দেয় না। এটি trainable cognitive skills, thinking habits এবং personal learning practice উন্নত করার জন্য তৈরি।</blockquote>
</section>
<main>{body}</main>
</body></html>"""

css = CSS(string="""
@font-face { font-family: 'Noto Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSansBengali-Regular.ttf'); font-weight: 400; }
@font-face { font-family: 'Noto Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSansBengali-Bold.ttf'); font-weight: 700; }
@font-face { font-family: 'Noto Serif Bengali'; src: url('file:///usr/share/fonts/truetype/noto/NotoSerifBengali-Regular.ttf'); font-weight: 400; }
@page { size: A5; margin: 18mm 15mm 20mm; @bottom-right { content: counter(page); color: #6b746d; font-family: 'Noto Bengali'; font-size: 8pt; } }
@page :first { margin: 0; @bottom-right { content: none; } }
* { box-sizing: border-box; }
body { color: #1c2f27; font-family: 'Noto Bengali', sans-serif; font-size: 10.5pt; line-height: 1.78; }
.cover { page-break-after: always; width: 100%; height: 210mm; display: flex; align-items: center; justify-content: center; background: #08251c; }
.cover img { width: 100%; height: 100%; object-fit: cover; }
.frontmatter { page-break-after: always; min-height: 170mm; padding-top: 28mm; }
.eyebrow { color: #a2791f; font-size: 9pt; letter-spacing: .08em; }
.frontmatter h1 { color: #123d2b; font-family: 'Noto Serif Bengali', serif; font-size: 31pt; line-height: 1.1; margin: 20mm 0 4mm; }
.frontmatter h2 { color: #9a711d; font-size: 17pt; margin: 0 0 12mm; }
.frontmatter .author { margin-top: 18mm; font-weight: 700; }
blockquote { border-left: 3px solid #d5a83c; margin: 12mm 0; padding: 4mm 5mm; background: #f7f1df; color: #3d493f; }
main h1 { color: #123d2b; font-family: 'Noto Serif Bengali', serif; font-size: 24pt; line-height: 1.25; margin-top: 6mm; page-break-before: always; }
main h1:first-child { page-break-before: auto; }
main h2 { color: #8b6517; font-size: 18pt; line-height: 1.35; border-bottom: 1px solid #e6dcc3; padding-bottom: 2mm; margin-top: 9mm; page-break-before: always; }
main h3 { color: #1f6248; font-size: 14pt; line-height: 1.4; margin-top: 8mm; }
main h4 { color: #8b6517; font-size: 11pt; margin-top: 6mm; }
main p { orphans: 3; widows: 3; }
main ul { padding-left: 7mm; }
main li { margin-bottom: 2mm; }
strong { color: #244c3b; }
""")
HTML(string=html, base_url=str(ROOT)).write_pdf(str(OUTPUT), stylesheets=[css])
print(OUTPUT)
