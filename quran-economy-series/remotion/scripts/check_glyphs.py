"""Verify every character the pilot puts on screen exists in the font assigned to it (no fallback glyphs).

Qur'anic strings (ayah*, word, pillarWords) -> Scheherazade New, after the same Uthmani normalisation
the renderer applies. Everything else Urdu -> Noto Nastaliq Urdu. Digits/Latin -> checked against the
font's Latin subset too.
"""
import re, sys, pathlib
from fontTools.ttLib import TTFont

root = pathlib.Path(__file__).resolve().parent.parent
fs = root / 'node_modules/@fontsource'
def cmap(*files):
    m = set()
    for f in files:
        m |= set(TTFont(fs / f).getBestCmap())
    return m

quran_font = cmap('scheherazade-new/files/scheherazade-new-arabic-400-normal.woff', 'scheherazade-new/files/scheherazade-new-latin-400-normal.woff')
urdu_font = cmap(*(f'noto-nastaliq-urdu/files/noto-nastaliq-urdu-{s}-400-normal.woff' for s in ('arabic', 'latin', 'latin-ext')))
naskh_font = cmap('amiri/files/amiri-arabic-400-normal.woff', 'amiri/files/amiri-latin-400-normal.woff')

src = (root / 'src/data/pilot.ts').read_text(encoding='utf-8')
norm = lambda t: t.replace('ٗ', 'ࣰ').replace('ٖ', 'ࣲ').replace('ٞ', 'ࣱ')
quran_keys = re.compile(r"(ayah|ayahTail|word|pillarWords)\s*:")
IGNORE = {0x20, 0x2066, 0x2069, 0x200C, 0x200D}

problems = 0
for line in src.splitlines():
    strings = re.findall(r"'([^']*)'", line) + re.findall(r'"([^"]*)"', line)
    if not strings or line.strip().startswith(('//', 'import', 'export type')):
        continue
    is_quran = bool(quran_keys.search(line))
    font, name = (quran_font, 'Scheherazade New') if is_quran else (urdu_font, 'Noto Nastaliq Urdu')
    for s in strings:
        t = norm(s) if is_quran else s
        missing = sorted({c for c in t if ord(c) not in IGNORE and ord(c) not in font})
        if missing:
            problems += 1
            print(f'[{name}] missing {[f"U+{ord(c):04X} {c}" for c in missing]} in: {s[:60]}')

# The stat numeral is set in Amiri (Latin digits and symbols)
for c in '0123456789%':
    if c != ' ' and ord(c) not in naskh_font:
        problems += 1
        print(f'[Amiri] missing U+{ord(c):04X} {c}')

print('glyph check:', 'OK, every on-screen character is in its assigned font' if not problems else f'{problems} problem strings')
sys.exit(1 if problems else 0)
