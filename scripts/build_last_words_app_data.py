from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
MANUSCRIPT = ROOT / 'docs' / 'শেষ-কথাটাও-বলা-হলো-না-manuscript.md'
OUT = ROOT / 'client' / 'src' / 'data' / 'last-words-book.ts'
text = MANUSCRIPT.read_text(encoding='utf-8')
chapter_re = re.compile(r'^## অধ্যায় (\d+): (.+)$', re.M)
heads = list(chapter_re.finditer(text))
chapters = []

def clean(s):
    s = re.sub(r'\*\*(.+?)\*\*', r'\1', s)
    return re.sub(r'\s+', ' ', s.strip())

for i, h in enumerate(heads):
    number = int(h.group(1))
    title = h.group(2).strip()
    end = heads[i+1].start() if i + 1 < len(heads) else text.find('\n# শেষ কথা')
    body = text[h.end():end if end != -1 else len(text)].strip()
    section_heads = list(re.finditer(r'^### (.+)$', body, re.M))
    sections = []
    if section_heads:
        opening = body[:section_heads[0].start()].strip()
        if opening:
            sections.append({'id': '01', 'title': 'শুরু', 'blocks': [{'type': 'paragraph', 'content': clean(p)} for p in re.split(r'\n\s*\n', opening) if clean(p)]})
        for sidx, sh in enumerate(section_heads):
            stitle = sh.group(1).strip()
            send = section_heads[sidx+1].start() if sidx + 1 < len(section_heads) else len(body)
            raw = body[sh.end():send].strip()
            paras = [clean(p) for p in re.split(r'\n\s*\n', raw) if clean(p)]
            sections.append({'id': f'{len(sections)+1:02d}', 'title': stitle, 'blocks': [{'type': 'paragraph', 'content': p} for p in paras]})
    all_text = ' '.join(b['content'] for s in sections for b in s['blocks'])
    wc = len(all_text.split())
    first_para = next((clean(p) for p in body.split('\n\n') if clean(p)), title)
    chapters.append({
        'id': f'{number:02d}',
        'number': number,
        'title': title,
        'subtitle': first_para[:220],
        'readingMinutes': max(20, min(70, round(wc / 185))),
        'wordCount': wc,
        'sections': sections,
        'exercises': [
            {'title': 'কথাটির ভেতরের কথা', 'prompt': 'এই অধ্যায়ের কোন কথার বাইরে আরেকটি অনুভূতি লুকিয়ে ছিল? একটি সংলাপ বেছে তার subtext লিখুন।'},
            {'title': 'নিজের জীবনের আয়না', 'prompt': 'কোনো সম্পর্কের ক্ষেত্রে আপনি কি কখনো প্রশ্নের বদলে অনুমান করেছেন? ঘটনাটি লিখে, কোন কথাটি সময়মতো বলা যেত তা নির্ধারণ করুন।'},
        ],
    })
if len(chapters) != 50:
    raise SystemExit(f'Expected 50 chapters, found {len(chapters)}')
meta = [{k: c[k] for k in ('id','number','title','subtitle','readingMinutes')} for c in chapters]
workbook = [x for c in chapters for x in c['exercises']]
lines = ['import type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";', '', 'export const lastWordsChapterData: Record<string, BookChapter> = ' + json.dumps({c['id']: c for c in chapters}, ensure_ascii=False, indent=2) + ';', '', 'export const lastWordsChapters: ChapterMeta[] = ' + json.dumps(meta, ensure_ascii=False, indent=2) + ';', '', 'export const lastWordsChapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = Object.fromEntries(Object.keys(lastWordsChapterData).map((id) => [id, async () => ({ default: lastWordsChapterData[id] })]));', '', 'export const lastWordsWorkbookExercises: WorkbookExercise[] = ' + json.dumps(workbook, ensure_ascii=False, indent=2) + ';', '', 'export const lastWordsTotalReadingMinutes = lastWordsChapters.reduce((sum, chapter) => sum + chapter.readingMinutes, 0);']
OUT.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(OUT)
print(f'chapters={len(chapters)} exercises={len(workbook)} words={sum(c["wordCount"] for c in chapters)} minutes={sum(c["readingMinutes"] for c in chapters)}')
