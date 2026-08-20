import json
from pathlib import Path

DATA = Path('/home/ubuntu/presence-data.json')
OUT = Path('/home/ubuntu/presence_expansion_blueprint.md')
book = json.loads(DATA.read_text(encoding='utf-8'))
chapters = book['chapters']

# A5 Bengali prose layout generally fits around 240–270 words per page in this design.
# The target is a practical ~300-page edition, not padding: each chapter receives a
# repeatable expansion package with narrative, application and reflection.
current_words = sum(c.get('wordCount', 0) for c in chapters)
target_words = 72000
avg_target = target_words // len(chapters)
extra_words = target_words - current_words

lines = [
    '# The Presence Code — ৩০০ পৃষ্ঠার Expansion Blueprint\n',
    '## বর্তমান audit\n',
    f'বর্তমান manuscript-এ {len(chapters)}টি অধ্যায়ে মোট আনুমানিক **{current_words:,} শব্দ** আছে। A5 layout, বাংলা font এবং readable line spacing ধরে প্রায় ৩০০ পৃষ্ঠার পূর্ণাঙ্গ সংস্করণের জন্য মোটামুটি **{target_words:,} শব্দ** লক্ষ্য ধরা হয়েছে। অর্থাৎ আনুমানিক **{extra_words:,} শব্দ** নতুন করে যোগ করতে হবে।\n',
    '| মাপকাঠি | বর্তমান | নতুন সংস্করণের লক্ষ্য |',
    '|---|---:|---:|',
    f'| অধ্যায় | {len(chapters)} | {len(chapters)} |',
    f'| মোট শব্দ | {current_words:,} | প্রায় {target_words:,} |',
    f'| অধ্যায়প্রতি গড় | {current_words // len(chapters):,} | প্রায় {avg_target:,} |',
    '| PDF layout | A5, readable | A5, readable; chapter opener ও practice pages সহ |\n',
    '## Quality-preserving expansion package\n',
    'প্রতিটি অধ্যায়কে শুধু দীর্ঘ না করে একই editorial architecture অনুসরণ করা হবে: একটি human opening scene, মূল ধারণার গভীর ব্যাখ্যা, একটি realistic dialogue বা case study, প্রয়োগের ধাপ, ভুল ধারণা বা সতর্কতা, এবং একটি reflection/workbook অংশ। এতে বইয়ের দৈর্ঘ্য বাড়বে, কিন্তু repetition বা ফাঁকা motivational ভাষা বাড়বে না।\n',
    '| যোগ করার অংশ | প্রতি অধ্যায়ে লক্ষ্য | উদ্দেশ্য |',
    '|---|---:|---|',
    '| Opening story / scene | 180–250 শব্দ | পাঠককে মানুষের অভিজ্ঞতার মধ্যে ঢোকানো |',
    '| Concept deepening | 350–500 শব্দ | ধারণাটির কারণ, nuance ও সীমা বোঝানো |',
    '| Dialogue / case study | 250–350 শব্দ | বাস্তব পরিস্থিতিতে প্রয়োগ দেখানো |',
    '| Step-by-step practice | 180–250 শব্দ | পাঠককে বাস্তব action দেওয়া |',
    '| Common mistake / safety note | 100–160 শব্দ | অতিরঞ্জন ও ভুল প্রয়োগ ঠেকানো |',
    '| Reflection + workbook | 120–180 শব্দ | শেখাকে ব্যক্তিগত জীবনে বসানো |\n',
    '## Chapter-by-chapter blueprint\n',
]

for c in chapters:
    n = int(c['number'])
    title = c['title']
    sections = ', '.join(s['title'] for s in c.get('sections', []))
    lines.append(f'### {n:02d}. {title}\n')
    lines.append(f'বর্তমান section: {sections}। এই অধ্যায়ে opening scene, একটি ভিন্ন perspective, বাস্তব dialogue, তিন ধাপের practice এবং “কখন এই কৌশল কাজ করবে না” অংশ যোগ করা হবে। Target: প্রায় {avg_target:,} শব্দ।\n')

lines.extend([
    '## Editorial quality gate\n',
    'প্রথম draft শেষ হওয়ার পর চারটি pass হবে: ভাষার স্বাভাবিকতা ও বানান, একই কথা পুনরাবৃত্তি হচ্ছে কি না, psychology-related claims-এর সতর্কতা ও reference, এবং reader-এর জন্য exercise বাস্তবসম্মত কি না। শেষে PDF-এর actual page count, chapter count ও live reader navigation আবার যাচাই করা হবে।\n',
])
OUT.write_text('\n'.join(lines), encoding='utf-8')
print(f'Wrote {OUT}; current_words={current_words}; target_words={target_words}; extra_words={extra_words}')
