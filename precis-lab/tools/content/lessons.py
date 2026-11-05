"""Precis Lab lessons. Run from precis-lab/:  python3 tools/content/lessons.py
Data lives in lessons_data.py: PHASES = [phase(...)] with units of lessons, each lesson a list of boards.

Board kinds (each a dict with "kind"):
  intro    title, pic, lines                      a big title, a drawing and up to three lines
  rows     title, rows=[(pic, text, hl, sub)]     up to three drawn rows, the hl words highlighted
  columns  title, cols=[(word, pic, l1, l2, l3)], lines   two to four columns side by side
  word     word, name, pic, caption, explain, examples ([bracket] = highlight), note
  shrink   title, before, after, swaps=[(long, short)], note   a long sentence cut to a short one
  text     title, lines=[(text, ink, size)]
  check    prompt, options=[(text, correct, why)]     a question that locks Next until answered
Each lesson also has mistakes=[(wrong, right, why)], practice=[(prompt, options)] and summary=[...].
"""
import json, os, re, sys

here = os.path.dirname(os.path.abspath(__file__))
T = lambda v: json.dumps(v, ensure_ascii=False)
plain = lambda ex: re.sub(r"\[([^\]]*)\]", r"\1", ex)
marks = lambda ex: re.findall(r"\[([^\]]*)\]", ex)
cap = lambda s: s[0].upper() + s[1:] if s else s
dot = lambda s: s if s.endswith((".", "?", "!", ":")) else s + "."
flat = lambda s: " ".join(x.strip() for x in s.split("|"))

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

def hl(id_, target, word):
    return f'{{ do: "highlight", id: "{id_}", target: "{target}", word: {T(word)} }}'

pic = lambda spec, id_, x, y, k: f'...PLAB.kit.pic("{id_}", {T(spec)}, {x}, {y}, {k})'

# ---------------------------------------------------------------- boards

def b_intro(tag, b):
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", b["title"], 480, 70, 46, "accent", "middle", 900),
            pic(b["pic"], f"{tag}-p", 340, 110, 2.0)]
    says = []
    for j, ln in enumerate(b["lines"][:3]):
        acts.append(w(f"{tag}-l{j}", ln, 480, 330 + j * 58, 30 if j == 0 else 26, "accent2" if j == 0 else "main", "middle", 900, gap=400))
        says.append((dot(ln), f"{tag}-l{j}"))
    return acts, says

def b_rows(tag, b):
    rows = ", ".join(f"[{T(p)}, {T(t)}, {{ hl: {T(h)}, sub: {T(s)}, size: 28 }}]" for p, t, h, s in b["rows"])
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", b["title"], 480, 50, 32, "accent", "middle", 900),
            f'...PLAB.kit.rows("{tag}r", [{rows}], {{ y: 135, gap: 135 }})']
    says = [(f"{dot(t)} {cap(dot(s))}", f"{tag}r{i + 1}") for i, (p, t, h, s) in enumerate(b["rows"])]
    return acts, says

def b_columns(tag, b):
    cols = b["cols"]; n = len(cols)
    centres = {1: [480], 2: [250, 710], 3: [165, 480, 795], 4: [120, 360, 600, 840]}[n]
    k = {1: 1.6, 2: 1.5, 3: 1.3, 4: 1.0}[n]
    fit = int(860 / n) - 16
    top = 74
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", b["title"], 480, 42, 30, "accent", "middle", 900)]
    says = []
    for i, (word, spec, l1, l2, l3) in enumerate(cols):
        c = centres[i]; y = top + int(80 * k) + 44
        acts.append(pic(spec, f"{tag}{i}p", int(c - 70 * k), top, k))
        acts.append(w(f"{tag}{i}w", word, c, y, 34 if len(word) < 12 else 28, "accent", "middle", fit, gap=150))
        if l1: acts.append(w(f"{tag}{i}a", l1, c, y + 40, 23, "accent2", "middle", fit))
        if l2: acts.append(w(f"{tag}{i}b", l2, c, y + 72, 20, "muted", "middle", fit))
        if l3: acts.append(w(f"{tag}{i}c", l3, c, y + 106, 22, None, "middle", fit))
        says.append((f"**{word}**: {l1}" + (f", {l2}" if l2 else "") + (f". Example: _{l3}_" if l3 else "") + ".", f"{tag}{i}w"))
    for j, r in enumerate(b.get("lines", [])):
        acts.append(w(f"{tag}-r{j}", r, 480, 470 + j * 48, 26 if j == 0 else 24, "accent" if j == 0 else "accent2", "middle", 910, gap=400 if j == 0 else 200))
        says.append((dot(r), f"{tag}-r{j}"))
    return acts, says

def b_word(tag, d):
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", f"{d['word']}: {d['name']}", 480, 50, 34, "accent", "middle", 900),
            pic(d["pic"], f"{tag}-p", 36, 92, 1.8), w(f"{tag}-c", d["caption"], 162, 282, 22, "accent2", "middle", 290, gap=200)]
    for j, e in enumerate(d["explain"][:3]):
        acts.append(w(f"{tag}-e{j}", e, 328, 118 + j * 40, 25, None, None, 610, gap=350 if j == 0 else 150))
    y0 = 118 + len(d["explain"][:3]) * 40 + 52
    for j, ex in enumerate(d["examples"][:3]):
        acts.append(w(f"{tag}-x{j}", plain(ex), 328, y0 + j * 50, 28, None, None, 610, gap=400 if j == 0 else 250))
        for q, m in enumerate(marks(ex)):
            acts.append(hl(f"{tag}-x{j}h{q}", f"{tag}-x{j}", m))
    says = [(" ".join(d["explain"]), f"{tag}-e0"), ("Look: " + " ".join(f"_{plain(e)}_" for e in d["examples"]), f"{tag}-x0")]
    if d.get("note"):
        acts.append(w(f"{tag}-n", "Remember: " + d["note"], 480, 470, 24, "accent", "middle", 910, gap=400))
        says.append(("Remember: " + dot(d["note"]), f"{tag}-n"))
    return acts, says

def b_shrink(tag, b):
    nb, na = len(plain(b["before"]).split()), len(plain(b["after"]).split())
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", b["title"], 480, 50, 32, "accent", "middle", 900),
            w(f"{tag}-bl", f"Before: {nb} words", 60, 112, 22, "muted"),
            w(f"{tag}-b", plain(b["before"]), 60, 152, 27, "trouble", None, 840, gap=300)]
    for q, m in enumerate(marks(b["before"])):
        acts.append(hl(f"{tag}-bh{q}", f"{tag}-b", m))
    y = 210
    for i, (lng, sht) in enumerate(b.get("swaps", [])[:3]):
        acts.append(w(f"{tag}-s{i}", f"{lng}  →  {sht}", 92, y + i * 40, 23, "accent2", None, 800, gap=250))
    y = 210 + len(b.get("swaps", [])[:3]) * 40 + 30
    acts += [w(f"{tag}-al", f"After: {na} words", 60, y, 22, "muted"),
             w(f"{tag}-a", plain(b["after"]), 60, y + 40, 29, "accent", None, 840, gap=400)]
    for q, m in enumerate(marks(b["after"])):
        acts.append(hl(f"{tag}-ah{q}", f"{tag}-a", m))
    says = [(f"Before, {nb} words: _{plain(b['before'])}_", f"{tag}-b")]
    says += [(f"**{lng}** becomes **{sht}**.", f"{tag}-s{i}") for i, (lng, sht) in enumerate(b.get("swaps", [])[:3])]
    says.append((f"After, {na} words: _{plain(b['after'])}_", f"{tag}-a"))
    if b.get("note"):
        acts.append(w(f"{tag}-n", b["note"], 480, 545, 24, "accent2", "middle", 900, gap=300))
        says.append((dot(b["note"]), f"{tag}-n"))
    return acts, says

def b_text(tag, b):
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", b["title"], 480, 60, 34, "accent", "middle", 900)]
    says = []
    for j, (text, ink, size) in enumerate(b["lines"]):
        acts.append(w(f"{tag}-l{j}", text, 480, 150 + j * 66, size, ink, "middle", 900, gap=400))
        says.append((dot(text), f"{tag}-l{j}"))
    return acts, says

def b_mistakes(tag, rows):
    acts = [f'PLAB.kit.clear("clear-{tag}")', w(f"{tag}-t", "Mistake board", 480, 48, 34, "accent", "middle", 900)]
    says = []
    for i, (bad, good, why) in enumerate(rows[:3]):
        y0 = 115 + i * 150
        acts += [w(f"{tag}{i}w", "✗ " + bad, 60, y0, 28, "trouble", None, 840, gap=400),
                 w(f"{tag}{i}r", "✓ " + good, 60, y0 + 42, 28, "accent2", None, 840, gap=300)]
        acts += [w(f"{tag}{i}y{j}" if j else f"{tag}{i}y", ln.strip(), 92, y0 + 80 + j * 28, 22, "muted", None, 820, gap=200) for j, ln in enumerate(why.split("|")[:2])]
        says.append((f"Wrong: _{bad}_ Right: _{good}_ Why? {flat(why)}", f"{tag}{i}w"))
    return acts, says

BOARDS = {"intro": b_intro, "rows": b_rows, "columns": b_columns, "word": b_word, "shrink": b_shrink, "text": b_text}

def check(qid, prompt, opts, tag):
    return {"id": qid, "source": "original", "skill": prompt, "prompt": prompt,
            "options": [dict(text=t, why=why, **({"correct": True} if ok else {"misconception": tag})) for t, ok, why in opts]}

def js_steps(steps):
    out = []
    for s in steps:
        o = ["      {", f"        id: {T(s['id'])},", f"        title: {T(s['title'])},", f"        alt: {T(s['alt'])},", "        say: ["]
        o += [f"          {{ text: {T(t)}" + (f", cue: {T(c)}" if c else "") + " }," for t, c in s["says"]]
        o += ["        ],", "        actions: ["] + ["          " + a + "," for a in s["actions"]] + ["        ],"]
        if s.get("check"):
            o.append("        check: " + json.dumps(s["check"], ensure_ascii=False, indent=2).replace("\n", "\n        ") + ",")
        o.append("      },")
        out.append("\n".join(o))
    return "\n".join(out)

def build(d, phase_no, unit_id):
    lid = d["id"]
    steps = []
    nchk = 0
    for i, b in enumerate(d["boards"]):
        if b["kind"] == "check":
            nchk += 1
            steps.append(dict(id=f"check-{nchk}", title="Check", alt="The last board stays.", says=[(b.get("say", "Your turn. Think, then choose."), None)], actions=[],
                              check=check(f"{lid}-c{nchk}", b["prompt"], b["options"], d["tag"])))
            continue
        tag = f"b{i}"
        a, s = BOARDS[b["kind"]](tag, b)
        title = b.get("title") or f"{b.get('word', '')}: {b.get('name', '')}"
        alt = title + ". " + " ".join(re.sub(r"[*_]", "", t) for t, c in s)
        steps.append(dict(id=b.get("id", f"board-{i + 1}"), title=title, alt=alt, says=s, actions=a))
    for c in range(0, len(d.get("mistakes", [])), 3):
        part = d["mistakes"][c:c + 3]
        a, s = b_mistakes("mk" if c == 0 else f"mk{c // 3 + 1}", part)
        steps.append(dict(id="mistakes" if c == 0 else f"mistakes-{c // 3 + 1}", title="Mistake board" if c == 0 else f"Mistake board {c // 3 + 1}",
                          alt="Mistakes: " + " ".join(f"Wrong: {b}. Right: {g}. {flat(y)}" for b, g, y in part), says=s, actions=a))
    for i, (q, o) in enumerate(d.get("practice", []), 1):
        steps.append(dict(id=f"practice-{i}", title=f"Practice {i}", alt="The last board stays.", says=[("Choose, then read why each choice is right or wrong.", None)], actions=[], check=check(f"{lid}-p{i}", q, o, d["tag"])))
    acts = ['PLAB.kit.clear("clear-sum")', w("sum-t", "Remember", 480, 80, 46, "accent", "middle")]
    for j, r in enumerate(d["summary"]):
        acts.append(w(f"sum{j}", r, 480, 180 + j * 80, 29, "main" if j % 2 == 0 else "accent2", "middle", 900, gap=500))
    steps.append(dict(id="summary", title="Summary: what to remember", alt="Remember: " + " ".join(d["summary"]), says=[(dot(r), f"sum{j}") for j, r in enumerate(d["summary"])], actions=acts))
    src = f"""/* Precis Lab: {d['title']}. Generated by tools/content/lessons.py; edit the data in lessons_data.py. */
(function () {{
  PLAB.registerLesson({{
    id: {T(lid)},
    title: {T(d['title'])},
    phase: {phase_no},
    unit: {T(unit_id)},
    level: {T(d.get('level', 'Basic'))},
    minutes: {max(4, len(steps) * 2)},
    summary: {T(d['about'])},
    objectives: {T(d['objectives'])},
    steps: [
{js_steps(steps)}
    ],
  }});
}})();
"""
    open(f"content/lessons/{lid}.js", "w").write(src)
    return lid

if __name__ == "__main__":
    exec(open(os.path.join(here, "lessons_data.py")).read())
    os.makedirs("content/lessons", exist_ok=True)
    for f in os.listdir("content/lessons"):
        if f.startswith("pr-"): os.remove(os.path.join("content/lessons", f))
    built = []
    for pn, ph in enumerate(PHASES, 1):
        for u in ph["units"]:
            for d in u["lessons"]:
                built.append((build(d, pn, u["id"]), d["title"]))
    # curriculum
    L = lambda s: json.dumps(s, ensure_ascii=False)
    phs = []
    for ph in PHASES:
        units = []
        for u in ph["units"]:
            ls = "".join(f'          L({L(d["id"])}, {L(d["title"])}, {{ status: "tested", lessonId: {L(d["id"])} }}),\n' for d in u["lessons"])
            units.append(f'      {{\n        id: {L(u["id"])},\n        title: {L(u["title"])},\n        lessons: [\n{ls}        ],\n      }},\n')
        phs.append(f'    {{\n      id: {L(ph["id"])},\n      title: {L(ph["title"])},\n      intro: {L(ph["intro"])},\n      units: [\n{"".join(units)}      ],\n    }},\n')
    cur = ("/* The Precis Lab curriculum. Generated by tools/content/lessons.py from lessons_data.py. */\n(function () {\n"
           '  const L = (id, title, o = {}) => ({ id, title, status: "planned", flags: [], ...o });\n'
           "  PLAB.curriculum = {\n    phases: [\n" + "".join(phs) + "    ],\n    gaps: " + L(GAPS) + ",\n  };\n})();\n")
    open("content/curriculum.js", "w").write(cur)
    tags = {}
    for ph in PHASES:
        for u in ph["units"]:
            for d in u["lessons"]:
                tags[d["tag"]] = (d["tag_label"], d["tag_explain"])
    mis = "/* Mistake groups for the notebook. Generated by tools/content/lessons.py. */\nPLAB.misconceptions = {\n" + "".join(f"  {L(k)}: {{\n    label: {L(a)},\n    explain: {L(b)},\n  }},\n" for k, (a, b) in tags.items()) + "};\n"
    open("content/misconceptions.js", "w").write(mis)
    p = "index.html"; s = open(p).read()
    s = re.sub(r"<!-- LESSONS -->.*?<!-- /LESSONS -->", "<!-- LESSONS -->\n" + "".join(f'<script src="content/lessons/{i}.js"></script>\n' for i, _ in built) + "<!-- /LESSONS -->", s, flags=re.S)
    open(p, "w").write(s)
    print(len(built), "lessons:", ", ".join(i for i, _ in built))
