"""Register the built Phase 6 lessons: curriculum units, script tags, misconception tag.
Run after phase5.py, from prepositions-lab/. Safe to run again."""
import json, os, re
here = os.path.dirname(__file__)
built = json.load(open(os.path.join(here, "p6_built.json")))
L = lambda s: json.dumps(s)
units = []
for u in built:
    ls = "".join(f'              L({L(i)}, {L(t)}, {{ status: "tested", lessonId: {L(i)} }}),\n' for i, t in u["lessons"])
    units.append(f'          {{\n            id: {L("p6-" + u["slug"])},\n            title: {L(u["title"])},\n            lessons: [\n{ls}            ],\n          }},\n')
block = ('      {\n        id: "p6",\n        title: "Phase 6: Phrasal verbs",\n'
         '        intro: "Phrasal verbs such as call off, bring about and put up with, grouped by what the particle conveys: up = completely, off = away, out = into the open. Each verb is drawn and set against the same verb with other particles, which mean something else.",\n'
         '        units: [\n' + "".join(units) + '        ],\n      },\n')
p = "content/curriculum.js"; s = open(p).read()
s = re.sub(r'      \{\n        id: "p6",.*?\n      \},\n(?=    \],\n    gaps:)', "", s, flags=re.S)
s = s.replace("    ],\n    gaps:", block + "    ],\n    gaps:", 1)
open(p, "w").write(s)

p = "content/misconceptions.js"; s = open(p).read()
if '"p6-particle"' not in s:
    s = s.rstrip()[:-2] + '  "p6-particle": {\n    label: "The particle carries the meaning",\n    explain: "In a phrasal verb the particle says what happens: up = completely or more, off = away or cancelled, out = into the open or gone. The same verb with another particle is another verb: call off (cancel) is not call out (shout) or call up (phone).",\n  },\n};\n'
    open(p, "w").write(s)

p = "index.html"; s = open(p).read()
s = re.sub(r'<script src="content/lessons/p6-[^"]+"></script>\n', "", s)
tags = "".join(f'<script src="content/lessons/{i}.js"></script>\n' for u in built for i, _ in u["lessons"])
s = s.replace("<!-- Interface -->", tags + "<!-- Interface -->")
open(p, "w").write(s)
print("registered", sum(len(u["lessons"]) for u in built), "lessons")
