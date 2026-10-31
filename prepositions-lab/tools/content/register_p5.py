"""Register the built Phase 5 lessons: curriculum units, script tags, misconception tag.
Run after phase5.py, from prepositions-lab/. Safe to run again."""
import json, os, re
here = os.path.dirname(__file__)
built = json.load(open(os.path.join(here, "p5_built.json")))
L = lambda s: json.dumps(s)
units = []
for u in built:
    ls = "".join(f'              L({L(i)}, {L(t)}, {{ status: "tested", lessonId: {L(i)} }}),\n' for i, t in u["lessons"])
    units.append(f'          {{\n            id: {L("p5-" + u["slug"])},\n            title: {L(u["title"])},\n            lessons: [\n{ls}            ],\n          }},\n')
block = ('      {\n        id: "p5",\n        title: "Phase 5: Prepositional phrases",\n'
         '        intro: "Fixed phrases such as in lieu of, by dint of and at the behest of, grouped by the preposition that carries their sense. Each phrase is drawn with what it means, why it takes its preposition, and the near misses that mean something else.",\n'
         '        units: [\n' + "".join(units) + '        ],\n      },\n')
p = "content/curriculum.js"; s = open(p).read()
s = re.sub(r'      \{\n        id: "p5",.*?\n      \},\n(?=    \],\n    gaps:)', "", s, flags=re.S)
s = s.replace("    ],\n    gaps:", block + "    ],\n    gaps:", 1)
open(p, "w").write(s)

p = "content/misconceptions.js"; s = open(p).read()
if '"p5-phrase"' not in s:
    s = s.rstrip()[:-2] + '  "p5-phrase": {\n    label: "A fixed phrase keeps its own preposition",\n    explain: "Phrases like in lieu of, by dint of and at the behest of always take the same preposition, and it matches a picture: in a place, by a means, at a point. A different preposition gives a phrase that is not English, or a different phrase with another meaning.",\n  },\n};\n'
    open(p, "w").write(s)

p = "index.html"; s = open(p).read()
s = re.sub(r'<script src="content/lessons/p5-[^"]+"></script>\n', "", s)
tags = "".join(f'<script src="content/lessons/{i}.js"></script>\n' for u in built for i, _ in u["lessons"])
s = s.replace("<!-- Interface -->", tags + "<!-- Interface -->")
open(p, "w").write(s)
print("registered", sum(len(u["lessons"]) for u in built), "lessons")
