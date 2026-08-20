from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
MANUSCRIPT = ROOT / 'docs' / 'the-hard-truth-manuscript.md'
OUT = ROOT / 'client' / 'src' / 'data' / 'hard-truth-book.ts'
OUT.parent.mkdir(parents=True, exist_ok=True)

text = MANUSCRIPT.read_text(encoding='utf-8')
chapter_re = re.compile(r'^## Chapter (\d+): (.+)$', re.M)
heads = list(chapter_re.finditer(text))
chapters = []

def clean(s):
    return re.sub(r'\s+', ' ', s.strip())

for i, h in enumerate(heads):
    number = int(h.group(1))
    title = h.group(2).strip()
    end = heads[i+1].start() if i+1 < len(heads) else text.find('\n## Personal Life Operating System')
    body = text[h.end():end if end != -1 else len(text)].strip()
    section_heads = list(re.finditer(r'^### (.+)$', body, re.M))
    sections = []
    if section_heads:
        opening = body[:section_heads[0].start()].strip()
        if opening:
            sections.append({'id': '01', 'title': 'প্রথমে যে কথাটি দেখা দরকার', 'blocks': [{'type': 'paragraph', 'content': clean(p)} for p in re.split(r'\n\s*\n', opening) if clean(p)]})
        for sidx, sh in enumerate(section_heads):
            stitle = sh.group(1).strip()
            if stitle in {'Exercises', 'Reflection Questions', 'Action Plan', 'Chapter Summary', 'Practical Framework'}:
                continue
            send = section_heads[sidx+1].start() if sidx+1 < len(section_heads) else len(body)
            raw = body[sh.end():send].strip()
            paras = [clean(p) for p in re.split(r'\n\s*\n', raw) if clean(p)]
            sections.append({'id': f'{len(sections)+1:02d}', 'title': stitle, 'blocks': [{'type': 'paragraph', 'content': p} for p in paras]})
    all_text = ' '.join(b['content'] for s in sections for b in s['blocks'])
    wc = len(all_text.split())
    exercise_match = re.search(r'### Exercises\n\n(.+?)(?=\n\nআরেকটি অনুশীলন:|\n\n### Reflection Questions)', body, re.S)
    exercise = clean(exercise_match.group(1)) if exercise_match else 'এই chapter-এর একটি বাস্তব উদাহরণ লিখে তার পরের action নির্ধারণ করো।'
    action_match = re.search(r'### Action Plan\n\n(.+?)(?=\n\n### Chapter Summary)', body, re.S)
    action = clean(action_match.group(1)) if action_match else 'আগামী সাত দিনের জন্য একটি ছোট, নির্দিষ্ট action ঠিক করো।'
    subtitle = next((clean(p) for p in body.split('\n\n') if clean(p)), title)
    chapters.append({
        'id': f'{number:02d}',
        'number': number,
        'title': title,
        'subtitle': subtitle[:220],
        'readingMinutes': max(18, min(45, round(wc / 210))),
        'wordCount': wc,
        'sections': sections,
        'exercises': [
            {'title': 'Reality exercise', 'prompt': exercise},
            {'title': 'Action plan', 'prompt': action},
        ],
    })

if len(chapters) != 20:
    raise SystemExit(f'Expected 20 chapters, found {len(chapters)}')

meta = [{k: c[k] for k in ('id','number','title','subtitle','readingMinutes')} for c in chapters]
workbook = [x for c in chapters for x in c['exercises']]
ts = []
ts.append('import type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";')
ts.append('')
ts.append('export const hardTruthChapterData: Record<string, BookChapter> = ' + json.dumps({c['id']: c for c in chapters}, ensure_ascii=False, indent=2) + ';')
ts.append('')
ts.append('export const hardTruthChapters: ChapterMeta[] = ' + json.dumps(meta, ensure_ascii=False, indent=2) + ';')
ts.append('')
ts.append('export const hardTruthChapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = Object.fromEntries(Object.keys(hardTruthChapterData).map((id) => [id, async () => ({ default: hardTruthChapterData[id] })]));')
ts.append('')
ts.append('export const hardTruthWorkbookExercises: WorkbookExercise[] = ' + json.dumps(workbook, ensure_ascii=False, indent=2) + ';')
ts.append('')
ts.append('export const hardTruthTotalReadingMinutes = hardTruthChapters.reduce((sum, chapter) => sum + chapter.readingMinutes, 0);')
OUT.write_text('\n'.join(ts) + '\n', encoding='utf-8')
print(OUT)
print(f'chapters={len(chapters)} exercises={len(workbook)} words={sum(c["wordCount"] for c in chapters)} minutes={sum(c["readingMinutes"] for c in chapters)}')
