"""Build docs/series-bible.html (a single readable page) from the three Markdown documents."""
import re, pathlib, markdown

here = pathlib.Path(__file__).parent
PARTS = [
    ('audit', 'Inventory & audit', '01-inventory-audit.md'),
    ('episodes', 'Eight episodes', '02-episode-plan.md'),
    ('pilot', 'Pilot', '03-pilot.md'),
]

ARABIC_RUN = re.compile(r'[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿][؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿\s،؛؟۔\.,:!"«»()\[\]0-9٪%⁦⁩‌‍–\-/→←·]*[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿)»"۔؟]')
QURANIC_MARKS = re.compile(r'[ً-ْٰۖ-ۭٱ]')

def fix_uthmani(t):
    return t.replace('ٗ', 'ࣰ').replace('ٖ', 'ࣲ').replace('ٞ', 'ࣱ')

def wrap_arabic(text):
    def rep(m):
        s = m.group(0)
        cls = 'ar' if len(QURANIC_MARKS.findall(s)) >= 3 else 'ur'
        return f'<bdi dir="rtl" class="{cls}">{fix_uthmani(s) if cls == "ar" else s}</bdi>'
    return ARABIC_RUN.sub(rep, text)

def process_text_nodes(html):
    # only touch text between tags
    return re.sub(r'>([^<]+)<', lambda m: '>' + wrap_arabic(m.group(1)) + '<', html)

def decorate(html):
    html = process_text_nodes(html)
    # classification codes in table cells
    for code in ['T + I + E', 'T + A', 'T + I', 'I + A', 'I + E', 'A + E', 'E + I', 'E + A', 'T + E', 'T', 'I', 'A', 'E']:
        chips = ''.join(f'<span class="code c{c}">{c}</span>' for c in code.split(' + '))
        html = html.replace(f'<td>{code}</td>', f'<td class="codes">{chips}</td>')
    html = html.replace('⚠️', '<span class="flag warn" title="Inaccurate or overstated">⚠</span>')
    html = html.replace('🔍', '<span class="flag check" title="Needs a citation">?</span>')
    html = html.replace('✅', '<span class="flag ok" title="Checked">✓</span>')
    # narration lines become their own right-to-left block
    html = re.sub(r'<li><strong>Narration:</strong>\s*(.*?)</li>',
                  lambda m: '<li class="narr"><strong>Narration</strong><p dir="rtl" lang="ur">' + re.sub(r'</?bdi[^>]*>', '', m.group(1)) + '</p></li>', html, flags=re.S)
    # scene headings get an anchor-able id
    html = re.sub(r'<h3>(E\d\.S\d+)', r'<h3 id="\1">\1', html)
    html = re.sub(r'<table>', '<div class="tablewrap"><table>', html).replace('</table>', '</table></div>')
    return html

sections = []
for sid, label, fn in PARTS:
    md = (here / fn).read_text(encoding='utf-8')
    body = markdown.markdown(md, extensions=['tables', 'sane_lists'])
    sections.append(f'<section id="{sid}" class="part">{decorate(body)}</section>')

page = (here / 'page_template.html').read_text(encoding='utf-8').replace('<!--SECTIONS-->', '\n'.join(sections))
(here / 'series-bible.html').write_text(page, encoding='utf-8')
print('wrote', here / 'series-bible.html', len(page) // 1024, 'KB')
