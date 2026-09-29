"""Check the Instagram series: planned episode ranges cover all 141 points, and built episodes declare them."""
import re, json, pathlib
here = pathlib.Path(__file__).parent
inv = set(re.findall(r"^\| (P\d\d\.\d+) \|", (here / '01-inventory-audit.md').read_text(), re.M))
plan = set()
for row in re.findall(r"^\| \d+ \|.*\| (P.*) \|$", (here / '04-instagram-series.md').read_text(), re.M):
    for a, b in re.findall(r"(P\d\d\.\d+)(?:–(P\d\d\.\d+))?", row):
        page, lo = a[1:3], int(a.split('.')[1])
        hi = int(b.split('.')[1]) if b else lo
        plan |= {f'P{page}.{i}' for i in range(lo, hi + 1)}
built = {}
for f in sorted((here.parent / 'remotion/src/ig/episodes').glob('epi??.json')):
    built[f.stem] = set(json.loads(f.read_text())['covers'])
print(f'inventory {len(inv)} · planned {len(inv & plan)} · missing from plan: {sorted(inv - plan) or "none"}')
for k, v in built.items():
    print(f'{k}: declares {len(v)} points', '' if v <= inv else f'unknown: {sorted(v - inv)}')
