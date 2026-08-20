from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path('/home/ubuntu/jibonke-notun-kore-dekho')
MANUSCRIPT = ROOT / 'docs' / 'the-intelligence-code-manuscript.md'
OUT = ROOT / 'client' / 'src' / 'data' / 'intelligence-code-book.ts'
OUT.parent.mkdir(parents=True, exist_ok=True)

text = MANUSCRIPT.read_text(encoding='utf-8')
chapter_re = re.compile(r'^### অধ্যায় (\d+): (.+)$', re.M)
headings = list(chapter_re.finditer(text))
chapters = []

def clean_paragraph(block: str) -> str:
    return re.sub(r'\s+', ' ', block.strip())

def parse_sections(body: str):
    matches = list(re.finditer(r'^#### (.+)$', body, re.M))
    sections = []
    if matches:
        opening = body[:matches[0].start()].strip()
        if opening:
            paras = [clean_paragraph(x) for x in re.split(r'\n\s*\n', opening) if clean_paragraph(x)]
            sections.append({'id': '01', 'title': 'শুরু করার আগে', 'blocks': [{'type': 'paragraph', 'content': p} for p in paras]})
        for i, match in enumerate(matches):
            title = match.group(1).strip()
            end = matches[i + 1].start() if i + 1 < len(matches) else len(body)
            raw = body[match.end():end].strip()
            paras = [clean_paragraph(x) for x in re.split(r'\n\s*\n', raw) if clean_paragraph(x)]
            blocks = []
            for p in paras:
                if p.startswith('**আজকের প্রয়োগ:**'):
                    p = p.replace('**আজকের প্রয়োগ:**', 'আজকের প্রয়োগ:')
                if p.startswith('**চ্যালেঞ্জ:**'):
                    blocks.append({'type': 'subheading', 'content': 'চ্যালেঞ্জ'})
                    p = p.replace('**চ্যালেঞ্জ:**', '').strip()
                blocks.append({'type': 'paragraph', 'content': p})
            if blocks:
                sections.append({'id': f'{len(sections)+1:02d}', 'title': title, 'blocks': blocks})
    return sections

for i, match in enumerate(headings):
    number = int(match.group(1))
    title = match.group(2).strip()
    end = headings[i + 1].start() if i + 1 < len(headings) else text.find('\n## Notes & Sources')
    body = text[match.end():end if end != -1 else len(text)].strip()
    sections = parse_sections(body)
    all_text = ' '.join(block['content'] for section in sections for block in section['blocks'])
    word_count = len(all_text.split())
    # Extract the chapter's small exercise and today application as workbook prompts.
    exercise_prompt = next((b['content'] for s in sections if s['title'] == 'ছোট অনুশীলন' for b in s['blocks'] if b['type'] == 'paragraph'), 'নিজের জীবনের একটি ঘটনায় এই chapter-এর idea প্রয়োগ করো।')
    application_prompt = next((b['content'] for s in sections if s['title'] == 'থামার জায়গা' for b in s['blocks'] if b['type'] == 'paragraph'), 'আজ একটি চিন্তার process লিখে রাখো।')
    # Subtitle is derived from the first concise purpose paragraph.
    subtitle = next((s['blocks'][0]['content'] for s in sections if s['blocks']), 'চিন্তার একটি ব্যবহারিক পাঠ')
    chapters.append({
        'id': f'{number:02d}',
        'number': number,
        'title': title,
        'subtitle': subtitle[:220],
        'readingMinutes': max(7, min(18, round(word_count / 170))),
        'wordCount': word_count,
        'sections': sections,
        'exercises': [
            {'title': 'চিন্তার নোট', 'prompt': exercise_prompt},
            {'title': 'Real-life transfer', 'prompt': application_prompt},
        ],
    })

if len(chapters) != 100:
    raise SystemExit(f'Expected 100 chapters, found {len(chapters)}')

meta = [{k: item[k] for k in ('id', 'number', 'title', 'subtitle', 'readingMinutes')} for item in chapters]
workbook = [exercise for chapter in chapters for exercise in chapter['exercises']]

ts = []
ts.append('import type { BookChapter, ChapterMeta, WorkbookExercise } from "./book";')
ts.append('')
ts.append('export const intelligenceCodeChapterData: Record<string, BookChapter> = ' + json.dumps({c['id']: c for c in chapters}, ensure_ascii=False, indent=2) + ';')
ts.append('')
ts.append('export const intelligenceCodeChapters: ChapterMeta[] = ' + json.dumps(meta, ensure_ascii=False, indent=2) + ';')
ts.append('')
ts.append('export const intelligenceCodeChapterLoaders: Record<string, () => Promise<{ default: BookChapter }>> = Object.fromEntries(Object.keys(intelligenceCodeChapterData).map((id) => [id, async () => ({ default: intelligenceCodeChapterData[id] })]));')
ts.append('')
ts.append('export const intelligenceCodeWorkbookExercises: WorkbookExercise[] = ' + json.dumps(workbook, ensure_ascii=False, indent=2) + ';')
ts.append('')
ts.append('export const intelligenceCodeTotalReadingMinutes = intelligenceCodeChapters.reduce((sum, chapter) => sum + chapter.readingMinutes, 0);')
OUT.write_text('\n'.join(ts) + '\n', encoding='utf-8')
print(OUT)
print(f'chapters={len(chapters)} exercises={len(workbook)} words={sum(c["wordCount"] for c in chapters)} minutes={sum(c["readingMinutes"] for c in chapters)}')
