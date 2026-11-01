"""Register the new Prepositions-in-context lessons (phase 7) and the section's data file.
Run after context.py, from prepositions-lab/. Safe to run again."""
import json, os, re
here = os.path.dirname(__file__)
built = json.load(open(os.path.join(here, "context_built.json")))
L = lambda s: json.dumps(s)
units = []
for u in built:
    ls = "".join(f'              L({L(i)}, {L(t)}, {{ status: "tested", lessonId: {L(i)} }}),\n' for i, t in u["lessons"])
    units.append(f'          {{\n            id: {L("pc-" + u["id"])},\n            title: {L(u["title"])},\n            lessons: [\n{ls}            ],\n          }},\n')
block = ('      {\n        id: "p7",\n        title: "Phase 7: Prepositions in context",\n'
         '        intro: "New drawn lessons for situations: transport and travelling, giving directions, numbers and money. The Prepositions in context section puts these together with every other board in the course, chapter by chapter.",\n'
         '        units: [\n' + "".join(units) + '        ],\n      },\n')
p = "content/curriculum.js"; s = open(p).read()
s = re.sub(r'      \{\n        id: "p7",.*?\n      \},\n(?=    \],\n    gaps:)', "", s, flags=re.S)
s = s.replace("    ],\n    gaps:", block + "    ],\n    gaps:", 1)
open(p, "w").write(s)
p = "index.html"; s = open(p).read()
s = re.sub(r'<script src="content/lessons/pc-[^"]+"></script>\n', "", s)
tags = "".join(f'<script src="content/lessons/{i}.js"></script>\n' for u in built for i, _ in u["lessons"])
s = s.replace("<!-- Interface -->", tags + "<!-- Interface -->")
if '<script src="content/context.js"></script>' not in s:
    s = s.replace('<script src="content/atlas.js"></script>', '<script src="content/atlas.js"></script>\n<script src="content/context.js"></script>', 1)
open(p, "w").write(s)
print("registered", sum(len(u["lessons"]) for u in built), "lessons")
