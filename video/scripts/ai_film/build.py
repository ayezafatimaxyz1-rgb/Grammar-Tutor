#!/usr/bin/env python3
"""Builds the sandbox command for the real-life mini film: writes script text, cue-timed cards,
captions and the clip plan to data.json for run_template.py, which the sandbox fetches from GitHub.
usage: build.py clips.json <upload_url> [data.json]  → writes data.json and prints the sandbox command."""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
script = json.load(open(os.path.join(ROOT, "src/script.json")))
tim = json.load(open(os.path.join(ROOT, "src/timings.json")))
sm = [v for v in script["videos"] if v["id"] == "sm"][0]
segs = tim["videos"]["sm"]
clips = json.load(open(sys.argv[1]))
upload = sys.argv[2]

def speak(t):
    return t.replace("‘", "").replace("’ ", " ").replace("’:", ":").replace("’,", ",").replace("’.", ".").replace("’", "'")

norm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())
def cue(ph, nth=0, off=0.0):
    tgt = [norm(x) for x in ph.split() if norm(x)]
    seen = 0
    for bi, s in enumerate(segs):
        w = [norm(x["w"]) for x in s["words"]]
        for i in range(len(w) - len(tgt) + 1):
            if w[i:i + len(tgt)] == tgt:
                if seen == nth:
                    return bi, round(s["lead"] + s["words"][i]["t"] + off, 2)
                seen += 1
    raise KeyError(ph)

els = []
def el(b, t0, t1, lines, size, style, y, bg="W", x=540):
    els.append({"b": b, "t0": t0, "t1": t1, "lines": lines, "size": size, "style": style, "y": y, "bg": bg, "x": x})
L = lambda *parts: list(parts)

els.append({"always": True, "lines": [[["GRAMMAR · REAL LIFE", "W"]]], "size": 30, "style": "pill", "bg": "#1E2233", "y": 120, "x": 540, "b": 0, "t0": 0, "t1": 0})
# 0 question
el(0, 0.3, "end", [L(["The furniture ", "D"], ["ARE", "R"], [" expensive?", "D"])], 58, "card", 430)
b, t = cue("wrong"); el(b, t, "end", [[["✗", "W"]]], 150, "pill", 760, bg="R")
# 1 contents
for i, (ph, nm) in enumerate([("a chair", "a chair"), ("a table", "a table"), ("a sofa", "a sofa"), ("a bed", "a bed")]):
    b, t = cue(ph); el(b, t, "end", [[[nm, "D"]]], 50, "pill", 930 + i * 112, bg="W")
b, t = cue("many different things"); el(b, t, "end", [[["many different things", "W"]]], 50, "pill", 1400, bg="B")
# 2 one unit
b, t = cue("groups them together"); el(b, t, "end", [[["grouped together ", "D"], ["→", "O"]]], 54, "card", 430)
b, t = cue("one unit furniture"); el(b, t, "end", [[["FURNITURE = ONE UNIT", "D"]]], 64, "pill", 1250, bg="O")
# 3 why
b, t = cue("why because"); el(b, t, "end", [[["WHY?", "Y"]]], 140, "big", 400)
b, t = cue("not the name of an object"); el(b, t, "end", [[["furniture ", "D"], ["≠", "R"], [" one object", "D"]]], 54, "card", 640)
b, t = cue("whole collection"); el(b, t, "end", [[["= the ", "D"], ["WHOLE", "O"], [" collection", "D"]]], 54, "card", 800)
b, t = cue("comes from furnish"); el(b, t, "end", [[["furnish ", "W"], ["→", "W"], [" furniture", "W"]]], 60, "pill", 1250, bg="O")
b, t = cue("furnish a room"); el(b, t, "end", [[["everything you furnish a room with", "D"]]], 40, "card", 1390)
# 4 unit = 1
b, t = cue("a unit means one"); el(b, t, "end", [[["a unit means", "W"]]], 60, "big", 330)
el(b, t + 0.3, "end", [[["1", "O"]]], 380, "big", 620)
b, t = cue("always singular"); el(b, t, "end", [[["1 is always ", "W"], ["SINGULAR", "W"]]], 54, "pill", 1000, bg="G")
b, t = cue("cant add s"); el(b, t, "end", [[["+s ✗", "R"]]], 110, "big", 620, x=850)
b, t = cue("so the furniture is"); el(b, t, "end", [[["✓ ", "G"], ["The furniture ", "D"], ["IS", "G"], [" expensive.", "D"]]], 54, "card", 1250)
# 5 family
fam = [("luggage", "bags and suitcases", "bags + suitcases", "B"), ("equipment", "tools and machines", "tools + machines", "G"),
       ("clothing", "shirts and trousers", "shirts + trousers", "R"), ("crockery", "plates and cups", "plates + cups", "O"), ("stationery", "pens and paper", "pens + paper", "Y")]
b, t = cue("the whole family"); el(b, t, cue("luggage")[1], [[["the whole family", "W"]]], 60, "big", 430)
for i, (wd, what, label, c) in enumerate(fam):
    b, t0 = cue(wd); t1 = cue(fam[i + 1][0])[1] if i < 4 else "end"
    el(b, t0, t1, [[[wd.upper(), "W" if c != "Y" else "D"]]], 84, "pill", 880, bg=c)
    b, tw = cue(what); el(b, tw, t1, [[[label, "D"]]], 50, "card", 1030)
    el(b, tw + 0.5, t1, [[["= ONE UNIT", "W"]]], 50, "pill", 1160, bg="G")
# 6 endings
b, t = cue("notice the endings"); el(b, t, "end", [[["notice the endings", "D"]]], 54, "card", 400)
ends = [("lugg", "age"), ("equip", "ment"), ("cloth", "ing"), ("crock", "ery")]
for i, (r, s) in enumerate(ends):
    b, t0 = cue(r + s, 1); t1 = cue(ends[i + 1][0] + ends[i + 1][1], 1)[1] if i < 3 else "end"
    el(b, t0, t1, [[[r, "W"], [s, "O"]]], 140, "big", 850)
b, t = cue("these endings"); el(b, t, "end", [[["these endings build a word", "D"]], [["for a ", "D"], ["WHOLE COLLECTION", "O"]]], 48, "card", 1200)
# 7 verbs
b, t = cue("each one is one unit"); el(b, t, "end", [[["one unit ", "W"], ["→", "W"], [" singular verb", "W"]]], 50, "pill", 400, bg="G")
vs = [("the luggage is heavy", "The luggage ", " heavy."), ("the equipment is new", "The equipment ", " new."), ("my clothing is wet", "My clothing ", " wet.")]
for i, (ph, a, z) in enumerate(vs):
    b, t0 = cue(ph); t1 = cue(vs[i + 1][0])[1] if i < 2 else "end"
    el(b, t0, t1, [[["✓ ", "G"], [a, "D"], ["IS", "G"], [z, "D"]]], 58, "card", 1180)
# 8 pieces
b, t = cue("need to count"); el(b, t, "end", [[["need a number? count a ", "W"], ["PIECE", "Y"]]], 50, "pill", 400, bg="#1E2233")
ps = [("two pieces of furniture", "two ", "PIECES", " of furniture"), ("three pieces of luggage", "three ", "PIECES", " of luggage"), ("an item of clothing", "an ", "ITEM", " of clothing")]
for i, (ph, a, m, z) in enumerate(ps):
    b, t0 = cue(ph); t1 = cue(ps[i + 1][0])[1] if i < 2 else "end"
    el(b, t0, t1, [[[a, "D"], [m, "O"], [z, "D"]]], 58, "card", 1180)
# 9 rule
b, t = cue("dont memorise"); el(b, t, "end", [[["don’t memorise the list", "D"]]], 50, "card", 380)
b, t = cue("see the unit"); el(b, t, "end", [[["SEE THE UNIT", "Y"]]], 110, "big", 560)
for i, (ph, c) in enumerate([("many things", "W"), ("one name", "W"), ("one verb", "G")]):
    b, t = cue(ph); el(b, t, "end", [[[ph, "D" if c == "W" else "W"]]], 60, "pill", 880 + i * 150, bg=c)

# captions relative to beats
caps = []
for c in tim["captions"]["sm"]:
    bi = max(i for i, s in enumerate(segs) if s["start"] <= c["start"] + 1e-6)
    caps.append([bi, round(c["start"] - segs[bi]["start"], 2), round(c["end"] - segs[bi]["start"], 2), re.sub(r"(?<![A-Za-z])[‘’'“”]|[‘’'“”](?![A-Za-z])", "", c["text"].replace("\n", " ")).replace("’", "'")])

E = "end"
plan = [[1, 0, 0, E, 0], [3, 1, 0, E, 0], [2, 2, 0, 5.0, 0], [5, 2, 5.0, E, 0], [4, 3, 0, E, 0], [5, 4, 0, E, 0.5],
        [4, 5, 0, cue("luggage")[1], 7.0], [6, 5, cue("luggage")[1], cue("equipment")[1], 0], [7, 5, cue("equipment")[1], cue("clothing")[1], 0],
        [8, 5, cue("clothing")[1], cue("crockery")[1], 0], [9, 5, cue("crockery")[1], cue("stationery")[1], 0], [10, 5, cue("stationery")[1], E, 0],
        [6, 6, 0, cue("equipment", 1)[1], 2.0], [7, 6, cue("equipment", 1)[1], cue("clothing", 1)[1], 2.0], [8, 6, cue("clothing", 1)[1], cue("crockery", 1)[1], 2.0], [9, 6, cue("crockery", 1)[1], E, 2.0],
        [11, 7, 0, cue("the equipment is new")[1], 0], [12, 7, cue("the equipment is new")[1], cue("my clothing is wet")[1], 0], [13, 7, cue("my clothing is wet")[1], E, 0],
        [14, 8, 0, cue("three pieces of luggage")[1], 0], [15, 8, cue("three pieces of luggage")[1], cue("an item of clothing")[1], 0], [16, 8, cue("an item of clothing")[1], E, 0],
        [17, 9, 0, E, 0]]

data = {"beats": [{"text": speak(b["text"]), "pad": b["pad"]} for b in sm["beats"]], "els": els, "caps": caps, "plan": plan, "clips": clips, "upload": upload}
out = sys.argv[3] if len(sys.argv) > 3 else "data.json"
body = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
open(out, "w").write(body)
# sandbox command: fetch the template from GitHub, write the data, run detached
raw = f"https://raw.githubusercontent.com/ayezafatimaxyz1-rgb/Grammar-Tutor/{os.environ.get('REF', 'claude/grammar-detective-video')}/video/scripts/ai_film/run_template.py"
print(f"curl -sSfL -o run.py '{raw}' && cat > data.json <<'JSON_EOF'\n{body}\nJSON_EOF\npython3 run.py > run.log 2>&1")
