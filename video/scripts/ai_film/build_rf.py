#!/usr/bin/env python3
"""Real-life film, cut 2 ("one unit"): a room fills with furniture, a toolbox fills with equipment,
a traveller gathers luggage. Items arrive one by one, then the collection gets its one name.
usage: build_rf.py clips.json <upload_url> [data.json]  → writes data.json and prints the sandbox command."""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
script = json.load(open(os.path.join(ROOT, "src/script.json")))
tim = json.load(open(os.path.join(ROOT, "src/timings.json")))
VID = "rf"
beats = [v for v in script["videos"] if v["id"] == VID][0]["beats"]
segs = tim["videos"][VID]
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


def el(ph, lines, size, style, y, bg="W", x=540, until=None, nth=0, off=0.0):
    """Card appears when `ph` is spoken; stays to the end of its beat, or until (beat, rel) / phrase."""
    b, t = cue(ph, nth, off)
    b1, t1 = (b, "end") if until is None else (until if isinstance(until, tuple) else cue(until))
    els.append({"b": b, "t0": t, "b1": b1, "t1": t1, "lines": lines, "size": size, "style": style, "y": y, "bg": bg, "x": x})


def one(txt, c="D"):
    return [[[txt, c]]]


els.append({"always": True, "lines": one("GRAMMAR · REAL LIFE", "W"), "size": 30, "style": "pill", "bg": "#1E2233", "y": 120, "x": 540, "b": 0, "t0": 0, "t1": 0})

# hook
el("quick question", one("QUICK QUESTION", "W"), 44, "pill", 300, bg="O")
el("why do we", one("WHY?", "Y"), 150, "big", 520)
for i, w in enumerate(["furnitures", "equipments", "luggages"]):
    el(w, [[[w + "  ", "D"], ["✗", "R"]]], 60, "card", 800 + i * 130)

# furniture: the room fills up, item by item; the counter stays until the name lands
END_ROOM = (5, "end")
el("an empty room", one("an empty room"), 54, "card", 330, until=(1, "end"))
el("in comes a chair", one("chair"), 56, "pill", 300, until=END_ROOM, off=0.6)
el("then a sofa", one("+ sofa"), 56, "pill", 410, until=END_ROOM, off=0.3)
el("then a bed", one("+ bed"), 56, "pill", 520, until=END_ROOM, off=0.3)
el("has furniture", one("= FURNITURE", "W"), 84, "pill", 680, bg="O")
el("not three furnitures", [[["3 furnitures  ", "D"], ["✗", "R"]]], 54, "card", 1250, until="just furniture")
el("just furniture", [[["✓ ", "G"], ["furniture", "D"]]], 60, "card", 1250)
# the unit logic
el("groups them", [[["grouped ", "W"], ["→", "W"], [" ONE UNIT", "W"]]], 60, "pill", 330, bg="O")
el("a unit means", one("1", "O"), 360, "big", 700)
el("always singular", [[["1 is always ", "W"], ["SINGULAR", "W"]]], 54, "pill", 1020, bg="G")
el("no s", one("+s ✗", "R"), 110, "big", 700, x=860)
el("the furniture is new", [[["✓ ", "G"], ["The furniture ", "D"], ["IS", "G"], [" new.", "D"]]], 58, "card", 1250)

# equipment: the toolbox fills up, then the lid closes on one name
END_BOX = (11, "end")
el("an empty toolbox", one("an empty toolbox"), 54, "card", 330, until=(7, "end"))
el("a spanner goes in", one("spanner"), 56, "pill", 300, until=END_BOX, off=0.4)
el("then a hammer", one("+ hammer"), 56, "pill", 410, until=END_BOX, off=0.3)
el("then a drill", one("+ drill"), 56, "pill", 520, until=END_BOX, off=0.3)
el("many tools", [[["many tools ", "D"], ["→", "O"], [" one box", "D"]]], 54, "card", 680, until="one unit equipment")
el("one unit equipment", one("= EQUIPMENT", "W"), 84, "pill", 680, bg="G")
el("the equipment is ready", [[["✓ ", "G"], ["The equipment ", "D"], ["IS", "G"], [" ready.", "D"]]], 58, "card", 1250)

# luggage: the traveller gathers bags by the door
END_BAGS = (16, "end")
el("getting ready", one("off to the airport"), 54, "card", 330, until=(12, "end"))
el("a suitcase", one("suitcase"), 56, "pill", 300, until=END_BAGS, off=0.3)
el("then a backpack", one("+ backpack"), 56, "pill", 410, until=END_BAGS, off=0.3)
el("then a carryon bag", one("+ carry-on bag"), 56, "pill", 520, until=END_BAGS, off=0.3)
el("bags and suitcases together", [[["bags + suitcases", "D"]]], 54, "card", 680, until="one unit luggage")
el("one unit luggage", one("= LUGGAGE", "W"), 84, "pill", 680, bg="B")
el("my luggage is heavy", [[["✓ ", "G"], ["My luggage ", "D"], ["IS", "G"], [" heavy.", "D"]]], 58, "card", 1250)

# counting and the rule
el("count a piece", [[["need a number? count a ", "W"], ["PIECE", "Y"]]], 50, "pill", 330, bg="#1E2233")
ps = [("two pieces of furniture", "two ", "PIECES", " of furniture"), ("a piece of equipment", "a ", "PIECE", " of equipment"), ("three pieces of luggage", "three ", "PIECES", " of luggage")]
for i, (ph, a, m, z) in enumerate(ps):
    el(ph, [[[a, "D"], [m, "O"], [z, "D"]]], 58, "card", 1180, until=ps[i + 1][0] if i < 2 else None)
el("dont memorise", one("don’t memorise the list"), 50, "card", 380)
el("see the unit", one("SEE THE UNIT", "Y"), 110, "big", 560)
for i, (ph, c) in enumerate([("many things", "W"), ("one name", "W"), ("one verb", "G")]):
    el(ph, one(ph, "D" if c == "W" else "W"), 60, "pill", 880 + i * 150, bg=c)

# captions relative to beats
caps = []
for c in tim["captions"][VID]:
    bi = max(i for i, s in enumerate(segs) if s["start"] <= c["start"] + 1e-6)
    txt = re.sub(r"(?<![A-Za-z])[‘’'“”]|[‘’'“”](?![A-Za-z])", "", c["text"].replace("\n", " ")).replace("’", "'")
    caps.append([bi, round(c["start"] - segs[bi]["start"], 2), round(c["end"] - segs[bi]["start"], 2), txt])

# [clip, beat, relStart, relEnd, srcStart, speed]; arrival clips are sped up so each item lands in its beat
E = "end"
C = lambda ph, nth=0: cue(ph, nth)[1]
plan = [["hook", 0, 0, E, 0, 0.8],
        ["room0", 1, 0, E, 0], ["chair", 2, 0, E, 0, 1.3], ["sofa", 3, 0, E, 0, 1.45], ["bed", 4, 0, E, 0, 1.6],
        ["roomfull", 5, 0, E, 0], ["roomfull", 6, 0, C("groups them"), 5.6], ["seal", 6, C("groups them"), C("one is always"), 0.5], ["roomfull", 6, C("one is always"), E, 5.0, 0.6],
        ["box0", 7, 0, E, 0], ["spanner", 8, 0, E, 0, 1.3], ["hammer", 9, 0, E, 0, 1.45], ["drill", 10, 0, E, 0, 1.5], ["lid", 11, 0, E, 0, 1.05],
        ["door0", 12, 0, E, 0], ["suitcase", 13, 0, E, 0, 1.3], ["backpack", 14, 0, E, 0, 1.4], ["carryon", 15, 0, E, 0, 1.4], ["leave", 16, 0, E, 0],
        ["roomfull", 17, 0, C("a piece of equipment"), 6.0], ["lid", 17, C("a piece of equipment"), C("three pieces of luggage"), 6.5], ["leave", 17, C("three pieces of luggage"), E, 5.0],
        ["bed", 18, 0, C("see the unit"), 3.0], ["lid", 18, C("see the unit"), C("one name"), 5.5], ["leave", 18, C("one name"), E, 6.5]]

data = {"beats": [{"text": speak(b["text"]), "pad": b["pad"]} for b in beats], "els": els, "caps": caps, "plan": plan, "clips": clips, "upload": upload}
out = sys.argv[3] if len(sys.argv) > 3 else "data.json"
body = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
open(out, "w").write(body)
raw = f"https://raw.githubusercontent.com/ayezafatimaxyz1-rgb/Grammar-Tutor/{os.environ.get('REF', 'claude/grammar-detective-video')}/video/scripts/ai_film/run_template.py"
print(f"curl -sSfL -o run.py '{raw}' && cat > data.json <<'JSON_EOF'\n{body}\nJSON_EOF\npython3 run.py > run.log 2>&1")
