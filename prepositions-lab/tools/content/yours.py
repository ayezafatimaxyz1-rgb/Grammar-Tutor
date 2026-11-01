"""Your sentences, solved: one lesson per sentence the learner asked about.

Run from prepositions-lab/:  python3 tools/content/yours.py
Data: tools/content/yours_data.py. Every lesson follows the same path:
  1. your sentence, every choice side by side (lineup: right / different meaning / wrong, with a reason)
  2. the words side by side in columns, each with its picture       3. a check question
  4. one board per word, building the rule from its picture         5. special boards (time lines, price line ...)
  6. the mistake board: wrong in red, right in green, and why       7. a second check
  8. three practice questions, every option explained               9. the summary rule
Writes content/lessons/py-*.js (phase 8), registers them, and adds their misconception groups.
"""
import json, os, re, sys
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, here)
from atlas import T, js_steps, plain, marked

exec(open(os.path.join(here, "yours_data.py")).read())

def w(id_, text, x, y, size=28, ink=None, anchor=None, fit=None, gap=None, style=None):
    o = f'{{ do: "write", id: "{id_}", text: {T(text)}, x: {x}, y: {y}, size: {size}'
    if ink: o += f', ink: "{ink}"'
    if anchor: o += f', anchor: "{anchor}"'
    if fit: o += f", fit: {fit}"
    if gap is not None: o += f", gap: {gap}"
    if style: o += f', style: "{style}"'
    return o + " }"

def line(id_, a, b, ink="main", width=3, dur=500, arrow=False):
    return f'{{ do: "draw", id: "{id_}", shape: "{"arrow" if arrow else "line"}", from: [{a[0]}, {a[1]}], to: [{b[0]}, {b[1]}], ink: "{ink}", width: {width}, dur: {dur} }}'

def circle(id_, cx, cy, r, ink, fill="solid"):
    return f'{{ do: "draw", id: "{id_}", shape: "circle", cx: {cx}, cy: {cy}, r: {r}, ink: "{ink}", fill: "{fill}", dur: 400 }}'

def hl(id_, target, word):
    return f'{{ do: "highlight", id: "{id_}", target: "{target}", word: {T(word)} }}'

pic = lambda spec, id_, x, y, k: f'...PLAB.kit.pic("{id_}", {T(spec)}, {x}, {y}, {k})'
flat = lambda r: " ".join(x.strip() for x in r.split("|"))
cap = lambda s: s[0].upper() + s[1:] if s else s
VERDICT = {"Y": "right", "D": "correct English, but a different meaning", "N": "wrong"}

def columns(tag, title, cols, lines_=()):
    n = len(cols)
    centres = {1: [480], 2: [250, 710], 3: [165, 480, 795], 4: [120, 360, 600, 840]}[n]
    k = {1: 1.6, 2: 1.5, 3: 1.3, 4: 1.0}[n]
    fit = int(860 / n) - 16
    top = 74
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", title, 480, 42, 30, "accent", "middle", 900)]
    says = []
    for i, (word, spec, l1, l2, l3) in enumerate(cols):
        c = centres[i]
        y = top + int(80 * k) + 44
        acts.append(pic(spec, f"{tag}{i}p", int(c - 70 * k), top, k))
        acts.append(w(f"{tag}{i}w", word, c, y, 34 if len(word) < 12 else 28, "accent", "middle", fit, gap=150))
        if l1: acts.append(w(f"{tag}{i}a", l1, c, y + 40, 23, "accent2", "middle", fit))
        if l2: acts.append(w(f"{tag}{i}b", l2, c, y + 72, 20, "muted", "middle", fit))
        if l3: acts.append(w(f"{tag}{i}c", l3, c, y + 106, 22, None, "middle", fit))
        says.append((f"**{word}**: {l1}" + (f", {l2}" if l2 else "") + (f". Example: _{l3}_" if l3 else "") + ".", f"{tag}{i}w"))
    for j, r in enumerate(lines_):
        acts.append(w(f"{tag}-r{j}", r, 480, 470 + j * 48, 26 if j == 0 else 24, "accent" if j == 0 else "accent2", "middle", 910, gap=400 if j == 0 else 200))
        says.append((r if r.endswith(".") else r + ".", f"{tag}-r{j}"))
    return acts, says

def word_board(tag, d):
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", f"{d['word'].upper()}: {d['name']}", 480, 50, 34, "accent", "middle", 900),
            pic(d["pic"], f"{tag}-p", 36, 92, 1.8), w(f"{tag}-c", d["caption"], 162, 282, 22, "accent2", "middle", 290, gap=200)]
    for j, e in enumerate(d["explain"][:3]):
        acts.append(w(f"{tag}-e{j}", e, 328, 118 + j * 40, 25, None, None, 610, gap=350 if j == 0 else 150))
    y0 = 118 + len(d["explain"][:3]) * 40 + 52
    for j, ex in enumerate(d["examples"][:3]):
        acts.append(w(f"{tag}-x{j}", plain(ex), 328, y0 + j * 50, 28, None, None, 610, gap=400 if j == 0 else 250))
        acts.append(hl(f"{tag}-x{j}h", f"{tag}-x{j}", marked(ex)))
    says = [(" ".join(d["explain"]), f"{tag}-e0"), ("Look: " + " ".join(f"_{plain(e)}_" for e in d["examples"]), f"{tag}-x0")]
    if d.get("note"):
        acts.append(w(f"{tag}-n", "Remember: " + d["note"], 480, 470, 24, "accent", "middle", 910, gap=400))
        says.append(("Remember: " + d["note"] + ".", f"{tag}-n"))
    return acts, says

def timeline(tag, s):
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", s["title"], 480, 50, 32, "accent", "middle", 900),
            line(f"{tag}-l", (80, 300), (880, 300), "main", 3, 900, arrow=True)]
    says = []
    if s.get("left"): acts.append(w(f"{tag}-L", s["left"], 80, 340, 22, "muted"))
    if s.get("right"): acts.append(w(f"{tag}-R", s["right"], 880, 340, 22, "muted", "end"))
    for i, it in enumerate(s["items"]):
        kind, t = it[0], f"{tag}i{i}"
        if kind in ("pin", "sun"):
            _, x, label, ink, say = it
            acts.append(circle(f"{t}d", x, 300, 20 if kind == "sun" else 11, "hi" if kind == "sun" else ink))
            acts.append(w(t, label, x, 375, 22, ink, "middle", 250, gap=150))
        elif kind == "tick":
            _, x, label, ink, say = it
            acts.append(line(f"{t}d", (x, 286), (x, 314), ink, 3, 300))
            acts.append(w(t, label, x, 345, 24, ink, "middle", 160, gap=100))
        elif kind in ("bracket", "arrow"):
            _, x1, x2, label, ink, say, *lv = it
            y0 = 250 - (lv[0] if lv else 0) * 55
            if kind == "bracket":
                acts += [line(f"{t}a", (x1, y0 + 16), (x1, y0), ink, 3, 200), line(f"{t}b", (x1, y0), (x2, y0), ink, 3, 500),
                         line(f"{t}c", (x2, y0), (x2, y0 + 16), ink, 3, 200)]
            else:
                acts.append(line(f"{t}a", (x1, y0), (x2, y0), ink, 3, 700, arrow=True))
            acts.append(w(t, label, (x1 + x2) // 2, y0 - 12, 21, ink, "middle", x2 - x1 + 60, gap=150))
        elif kind == "vline":
            _, x, label, ink, say = it
            acts.append(line(f"{t}d", (x, 140), (x, 330), ink, 4, 500))
            acts.append(w(t, label, x, 125, 22, ink, "middle", 300, gap=150))
        elif kind == "rise":
            _, x1, x2, label, ink, say = it
            acts.append(line(f"{t}d", (x1, 455), (x2, 405), ink, 3, 800))
            acts.append(w(t, label, (x1 + x2) // 2, 488, 21, ink, "middle", 700, gap=150))
        if say: says.append((say, t))
    for j, r in enumerate(s.get("lines", [])):
        acts.append(w(f"{tag}-r{j}", r, 480, 470 + j * 46, 26 if j == 0 else 24, "accent" if j == 0 else "accent2", "middle", 910, gap=400 if j == 0 else 200))
        says.append((r if r.endswith(".") else r + ".", f"{tag}-r{j}"))
    return acts, says

def special(tag, s):
    if s["kind"] == "timeline":
        return timeline(tag, s)
    if s["kind"] == "columns":
        return columns(tag, s["title"], [(c[0], c[1], c[2], c[3], c[4]) for c in s["cols"]], s.get("lines", []))
    if s["kind"] == "rows":
        rows = ", ".join(f"[{T(spec)}, {T(text)}, {{ hl: {T(h)}, sub: {T(sub)}, size: 30 }}]" for spec, text, h, sub in s["rows"])
        acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", s["title"], 480, 50, 32, "accent", "middle", 900),
                f'...PLAB.kit.rows("{tag}r", [{rows}], {{ y: 135, gap: 135 }})']
        says = [(f"_{text}_ {cap(sub)}.", f"{tag}r{i + 1}") for i, (spec, text, h, sub) in enumerate(s["rows"])]
        return acts, says
    if s["kind"] == "text":
        acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", s["title"], 480, 60, 34, "accent", "middle", 900)]
        says = []
        for j, (text, ink, size, say) in enumerate(s["lines"]):
            acts.append(w(f"{tag}-l{j}", text, 480, 170 + j * 75, size, ink, "middle", 900, gap=400))
            if say: says.append((say, f"{tag}-l{j}"))
        return acts, says
    raise ValueError(s["kind"])

def mistake_board(tag, rows):
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", "Mistake board", 480, 48, 34, "accent", "middle", 900)]
    says = []
    for i, (bad, good, why) in enumerate(rows[:3]):
        y0 = 115 + i * 150
        acts += [w(f"{tag}{i}w", "✗ " + bad, 60, y0, 29, "trouble", None, 840, gap=400),
                 w(f"{tag}{i}r", "✓ " + good, 60, y0 + 42, 29, "accent2", None, 840, gap=300),
                 w(f"{tag}{i}y", why, 92, y0 + 80, 22, "muted", None, 820, gap=200)]
        says.append((f"Wrong: _{bad}_ Right: _{good}_ Why? {why}", f"{tag}{i}w"))
    return acts, says

def check(qid, prompt, opts, tag):
    return {"id": qid, "source": "original", "skill": prompt, "prompt": prompt,
            "options": [dict(text=t, why=why, **({"correct": True} if ok else {"misconception": tag})) for t, ok, why in opts]}

def lesson(d):
    lid = f"py-{d['id']}"
    steps = []
    # 1. your sentence
    opts = ", ".join(f"[{T(spec)}, {T(word)}, {'true' if v == 'Y' else T('diff') if v == 'D' else 'false'}, {T(r)}]" for word, spec, v, r in d["choices"])
    says = [(f"Your sentence: _{d['sentence'].replace('____', '…')}_ Here is every choice, side by side.", "ys-s")]
    says += [(f"**{word}** is {VERDICT[v]}: {flat(r)}.", f"ys{i + 1}") for i, (word, spec, v, r) in enumerate(d["choices"])]
    says += [(r if r.endswith(".") else r + ".", f"ys-r{j + 1}") for j, r in enumerate(d["choice_rules"])]
    steps.append(dict(id="your-sentence", title="Your sentence: every choice side by side",
                      alt=f"{d['sentence'].replace('____', 'with a gap')} Choices: " + "; ".join(f"{word}: {VERDICT[v]}, {flat(r)}" for word, spec, v, r in d["choices"]),
                      says=says, actions=['PLAB.kit.clear("clear-ys")', f'...PLAB.kit.lineup("ys", {T(d["sentence"])}, [{opts}], {T(d["choice_rules"])})']))
    # 2. side by side
    a, s = columns("cols", "Side by side: what each word pictures", d["columns"])
    steps.append(dict(id="side-by-side", title="Side by side: each word and its picture", alt="Side by side: " + "; ".join(f"{c[0]}: {c[2]}, {c[4]}" for c in d["columns"]), says=s, actions=a))
    # 3. check
    q, o = d["checks"][0]
    steps.append(dict(id="check-1", title="Check", alt="The last board stays.", says=[("Your turn. Picture each word, then choose.", None)], actions=[], check=check(f"{lid}-c1", q, o, d["tag"])))
    # 4. one board per word
    for i, wd in enumerate(d["words"]):
        a, s = word_board(f"wd{i}", wd)
        steps.append(dict(id=f"word-{i + 1}", title=f"{wd['word'].upper()}: {wd['name']}", alt=f"{wd['word']}: {wd['name']}. " + " ".join(wd["explain"]) + " " + " ".join(plain(e) for e in wd["examples"]), says=s, actions=a))
    # 5. special boards
    for i, sp in enumerate(d["specials"]):
        a, s = special(f"sp{i}", sp)
        steps.append(dict(id=f"picture-{i + 1}", title=sp["title"], alt=sp["title"] + ". " + " ".join(t for t, c in s), says=s, actions=a))
    # 6. mistakes
    a, s = mistake_board("mk", d["mistakes"])
    steps.append(dict(id="mistakes", title="Mistake board", alt="Mistakes: " + " ".join(f"Wrong: {b}. Right: {g}. {y}" for b, g, y in d["mistakes"]), says=s, actions=a))
    # 7. second check
    q, o = d["checks"][1]
    steps.append(dict(id="check-2", title="Check", alt="The last board stays.", says=[("Your turn again.", None)], actions=[], check=check(f"{lid}-c2", q, o, d["tag"])))
    # 8. practice
    for i, (q, o) in enumerate(d["practice"], 1):
        steps.append(dict(id=f"practice-{i}", title=f"Practice {i}", alt="The last board stays.", says=[("Choose, then read why each choice is right or wrong.", None)], actions=[], check=check(f"{lid}-p{i}", q, o, d["tag"])))
    # 9. summary
    acts = ['PLAB.kit.clear("clear-sum")', w("sum-t", "Remember", 480, 80, 46, "accent", "middle")]
    for j, r in enumerate(d["summary"]):
        acts.append(w(f"sum{j}", r, 480, 180 + j * 80, 30, "main" if j % 2 == 0 else "accent2", "middle", 900, gap=500))
    steps.append(dict(id="summary", title="Summary: the rule to remember", alt="Remember: " + " ".join(d["summary"]),
                      says=[(r, f"sum{j}") for j, r in enumerate(d["summary"])], actions=acts))
    src = f"""/* Your sentences, solved: {d['title']}. Generated by tools/content/yours.py; edit the data in yours_data.py. */
(function () {{
  PLAB.registerLesson({{
    id: {T(lid)},
    title: {T(d['title'])},
    phase: 8,
    unit: "py-yours",
    level: "Basic to Intermediate",
    minutes: {len(steps) * 2},
    summary: {T("Starts from the sentence: " + d['sentence'].replace('____', '___') + " " + " ".join(d['summary']))},
    objectives: {T(["See every choice for your sentence side by side, with why each is right or wrong.", "Picture what each word means and build the rule from the picture.", "Avoid the common mistakes, and remember the summary rule."])},
    steps: [
{js_steps(steps)}
    ],
  }});
}})();
"""
    open(f"content/lessons/{lid}.js", "w").write(src)
    return lid

ids = [(lesson(d), d["title"]) for d in LESSONS]

# Register: phase 8 in the curriculum, script tags, misconception groups.
L = lambda s: json.dumps(s)
ls = "".join(f'              L({L(i)}, {L(t)}, {{ status: "tested", lessonId: {L(i)} }}),\n' for i, t in ids)
block = ('      {\n        id: "p8",\n        title: "Phase 8: Your sentences, solved",\n'
         '        intro: "Lessons built from the sentences you asked about. Each starts from your sentence with every choice side by side, pictures each word, proves the rule, shows the common mistakes, and ends with practice and a summary rule.",\n'
         '        units: [\n          {\n            id: "py-yours",\n            title: "Your sentences",\n            lessons: [\n' + ls + '            ],\n          },\n        ],\n      },\n')
p = "content/curriculum.js"; s = open(p).read()
s = re.sub(r'      \{\n        id: "p8",.*?\n      \},\n(?=    \],\n    gaps:)', "", s, flags=re.S)
s = s.replace("    ],\n    gaps:", block + "    ],\n    gaps:", 1)
open(p, "w").write(s)
p = "content/misconceptions.js"; s = open(p).read()
for d in LESSONS:
    if f'"{d["tag"]}"' not in s:
        s = s.rstrip()[:-2] + f'  {L(d["tag"])}: {{\n    label: {L(d["tag_label"])},\n    explain: {L(d["tag_explain"])},\n  }},\n}};\n'
open(p, "w").write(s)
p = "index.html"; s = open(p).read()
s = re.sub(r'<script src="content/lessons/py-[^"]+"></script>\n', "", s)
s = s.replace("<!-- Interface -->", "".join(f'<script src="content/lessons/{i}.js"></script>\n' for i, _ in ids) + "<!-- Interface -->")
open(p, "w").write(s)
print(len(ids), "lessons:", ", ".join(i for i, _ in ids))
