import base64
import html
import json
from pathlib import Path
from weasyprint import HTML

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
GEN = ROOT / 'docs' / 'somajer-aina-generated'
MOD = ROOT / 'client' / 'src' / 'data' / 'somajer-aina-chapters'
PUBLIC = ROOT / 'public'
manifest = json.loads((GEN / 'manifest.json').read_text(encoding='utf-8'))
manifest.sort(key=lambda x: x['number'])

imports = '\n'.join(f'import chapter{c["number"]:03d} from "./somajer-aina-chapters/chapter-{c["number"]:03d}";' for c in manifest)
modules = ', '.join(f'chapter{c["number"]:03d}' for c in manifest)
meta = '[\n' + ',\n'.join(f'  {{ id: "{c["id"]}", number: {c["number"]}, title: {json.dumps(c["title"], ensure_ascii=False)}, subtitle: {json.dumps(c["subtitle"], ensure_ascii=False)}, readingMinutes: {c["readingMinutes"]} }}' for c in manifest) + '\n]'
loaders = '{\n' + '\n'.join(f'  "{c["id"]}": () => Promise.resolve({{ default: chapter{c["number"]:03d} }}),' for c in manifest) + '\n}'

book_ts = f'''import type {{ BookChapter, ChapterMeta, WorkbookExercise }} from "./book";
{imports}

export const somajerAinaChapterModules: BookChapter[] = [{modules}];
export const somajerAinaChapters: ChapterMeta[] = {meta};
export const somajerAinaChapterLoaders: Record<string, () => Promise<{{ default: BookChapter }}>> = {loaders};
export const somajerAinaTotalReadingMinutes = somajerAinaChapterModules.reduce((sum, chapter) => sum + chapter.readingMinutes, 0);
export const somajerAinaWorkbookExercises: WorkbookExercise[] = somajerAinaChapterModules.flatMap((chapter) => chapter.exercises);
'''
(ROOT / 'client' / 'src' / 'data' / 'somajer-aina-book.ts').write_text(book_ts, encoding='utf-8')

source_lines = [
    '# সমাজের আয়না',
    '## যে বাস্তবতাগুলো আমরা দেখি, কিন্তু দেখতে চাই না',
    '',
    '**লেখক:** শেখ রাসেল',
    '',
    '> এই বইটি পর্যবেক্ষণ, গবেষণা, বাংলাদেশি প্রেক্ষিত, মনোবিজ্ঞান, সমাজবিজ্ঞান, অর্থনীতি ও ব্যবহারিক আত্মপর্যালোচনার সমন্বয়ে তৈরি। যেখানে নির্দিষ্ট প্রমাণ নেই, সেখানে ব্যাখ্যাকে fact হিসেবে উপস্থাপন করা হয়নি।',
    '',
    '## পাঠ-নির্দেশ',
    '',
    'বইটি ১৫টি অংশে বিভক্ত। প্রথম ৯০টি অধ্যায়ে সমাজের বিভিন্ন মুখ ও mechanism বিশ্লেষণ করা হয়েছে। শেষ চারটি বিশেষ অংশে “সমাজ বনাম বাস্তবতা”, fictionalized composite “কেস ফাইল”, source-aware “সমাজের পেছনের সংখ্যা” এবং “সমাজকে বোঝার ১০০টি শিক্ষা” রয়েছে।',
    '',
    '## সূচিপত্র',
]
for c in manifest:
    source_lines.append(f'{c["number"]}. {c["title"]} — {c["subtitle"]}')
source_lines += ['', '## পূর্ণাঙ্গ পাঠ', '']
for c in manifest:
    source_lines += [f'## অধ্যায় {c["number"]}: {c["title"]}', f'### {c["subtitle"]}', '']
    for section in c['sections']:
        source_lines += [f'### {section["title"]}', '']
        for block in section['blocks']:
            if block['type'] == 'subheading':
                source_lines += [f'**{block["content"]}**', '']
            else:
                source_lines += [block['content'], '']
    if c.get('exercises'):
        source_lines += ['#### প্রয়োগ', '']
        for exercise in c['exercises']:
            source_lines += [f'**{exercise["title"]}** — {exercise["prompt"]}', '']
    if c.get('sourceNotes'):
        source_lines += ['#### উৎস ও আরও পড়া', '']
        source_lines += [f'- {note}' for note in c['sourceNotes']]
        source_lines += ['']
    if c.get('uncertaintyNotes'):
        source_lines += ['#### অনিশ্চয়তার নোট', '']
        source_lines += [f'- {note}' for note in c['uncertaintyNotes']]
        source_lines += ['']
source_lines += [
    '## References', '',
    '[1] World Bank, “Bangladesh,” https://www.worldbank.org/ext/en/country/bangladesh',
    '[2] UNICEF Bangladesh, “Education,” https://www.unicef.org/bangladesh/en/education',
    '[3] ILOSTAT, “Bangladesh country profile,” https://ilostat.ilo.org/data/country-profiles/bgd/',
    '[4] American Psychological Association, “Health advisory on social media use in adolescence,” https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use',
    '[5] OECD, “Social mobility and equal opportunity,” https://www.oecd.org/en/topics/sub-issues/social-mobility-and-equal-opportunity.html',
]
(ROOT / 'docs' / 'somajer-aina.md').write_text('\n'.join(source_lines) + '\n', encoding='utf-8')

cover = PUBLIC / 'somajer-aina-cover.png'
cover_b64 = base64.b64encode(cover.read_bytes()).decode('ascii') if cover.exists() else ''
css = '''@font-face { font-family: NotoBengali; src: url("/usr/share/fonts/truetype/noto/NotoSerifBengali-Regular.ttf"); } @font-face { font-family: NotoBengali; src: url("/usr/share/fonts/truetype/noto/NotoSerifBengali-SemiBold.ttf"); font-weight: 700; } @page { size: A5; margin: 18mm 15mm 18mm 15mm; @bottom-center { content: counter(page); font-family: NotoBengali; font-size: 9pt; color: #777; } } body { font-family: NotoBengali, sans-serif; color: #26322d; line-height: 1.75; font-size: 10.5pt; } h1 { color: #174b3b; font-size: 25pt; margin-top: 0; page-break-before: always; } h2 { color: #7a3e2b; font-size: 15pt; margin-top: 18pt; } h3 { color: #174b3b; font-size: 12pt; margin-top: 14pt; } p { text-align: justify; margin: 0 0 8pt; } .cover { page-break-after: always; text-align: center; } .cover img { width: 100%; max-height: 235mm; object-fit: contain; } .toc { page-break-after: always; } .toc p { text-align: left; margin: 0 0 3pt; } .note { background: #eef4ee; border-left: 4pt solid #7a3e2b; padding: 7pt 10pt; margin: 9pt 0; } .source { font-size: 8.7pt; color: #4d5b53; } .feature { page-break-before: always; }'''
html_parts = [f'<html><head><meta charset="utf-8"><style>{css}</style></head><body>']
if cover_b64:
    html_parts.append(f'<div class="cover"><img src="data:image/png;base64,{cover_b64}" /></div>')
html_parts.append('<div class="toc"><h1>সূচিপত্র</h1>')
for c in manifest:
    html_parts.append(f'<p><b>{c["number"]}. {html.escape(c["title"])}</b><br>{html.escape(c["subtitle"])}</p>')
html_parts.append('</div>')
for c in manifest:
    cls = 'feature' if c['number'] > 90 else ''
    html_parts.append(f'<section class="{cls}"><h1>অধ্যায় {c["number"]}: {html.escape(c["title"])}</h1><h2>{html.escape(c["subtitle"])}</h2>')
    for section in c['sections']:
        html_parts.append(f'<h2>{html.escape(section["title"])}</h2>')
        for block in section['blocks']:
            if block['type'] == 'subheading':
                html_parts.append(f'<h3>{html.escape(block["content"])}</h3>')
            else:
                text = html.escape(block['content']).replace('\n', '<br>')
                html_parts.append(f'<p>{text}</p>')
    if c.get('exercises'):
        html_parts.append('<div class="note"><b>প্রয়োগ</b><br>')
        for exercise in c['exercises']:
            html_parts.append(f'<b>{html.escape(exercise["title"])}</b> — {html.escape(exercise["prompt"])}<br>')
        html_parts.append('</div>')
    if c.get('sourceNotes'):
        html_parts.append('<p class="source"><b>উৎস ও আরও পড়া:</b> ' + ' · '.join(html.escape(x) for x in c['sourceNotes']) + '</p>')
    if c.get('uncertaintyNotes'):
        html_parts.append('<p class="source"><b>অনিশ্চয়তার নোট:</b> ' + ' · '.join(html.escape(x) for x in c['uncertaintyNotes']) + '</p>')
    html_parts.append('</section>')
html_parts.append('<section class="feature"><h1>References</h1><p>[1] World Bank: https://www.worldbank.org/ext/en/country/bangladesh</p><p>[2] UNICEF Bangladesh: https://www.unicef.org/bangladesh/en/education</p><p>[3] ILOSTAT: https://ilostat.ilo.org/data/country-profiles/bgd/</p><p>[4] APA: https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use</p><p>[5] OECD: https://www.oecd.org/en/topics/sub-issues/social-mobility-and-equal-opportunity.html</p></section>')
html_parts.append('</body></html>')
HTML(string=''.join(html_parts), base_url=str(ROOT)).write_pdf(str(PUBLIC / 'somajer-aina.pdf'))
print(json.dumps({'chapters': len(manifest), 'wordCount': sum(c['wordCount'] for c in manifest), 'pdf': str(PUBLIC / 'somajer-aina.pdf')}, ensure_ascii=False))
