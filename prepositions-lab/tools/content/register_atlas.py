"""Register the sense atlas: a curriculum phase shown first (Start here), script tags, misconception tag.
Run after atlas.py, from prepositions-lab/. Safe to run again."""
import json, os, re
here = os.path.dirname(__file__)
built = json.load(open(os.path.join(here, "atlas_built.json")))
L = lambda s: json.dumps(s)
units = []
for u in built:
    ls = "".join(f'              L({L(i)}, {L(t)}, {{ status: "tested", lessonId: {L(i)} }}),\n' for i, t in u["lessons"])
    units.append(f'          {{\n            id: {L("p0-" + u["id"])},\n            title: {L(u["title"])},\n            lessons: [\n{ls}            ],\n          }},\n')
block = ('      {\n        id: "p0",\n        title: "Start here: The sense atlas",\n'
         '        intro: "The basic senses of every preposition, each drawn as its logic and explained from the very beginning, with the pairs people confuse set side by side. Start your preparation here.",\n'
         '        units: [\n' + "".join(units) + '        ],\n      },\n')
p = "content/curriculum.js"; s = open(p).read()
s = re.sub(r'      \{\n        id: "p0",.*?\n      \},\n(?=      \{\n        id: "p1")', "", s, flags=re.S)
s = s.replace('      {\n        id: "p1",', block + '      {\n        id: "p1",', 1)
open(p, "w").write(s)

p = "content/misconceptions.js"; s = open(p).read()
if '"p0-sense"' not in s:
    s = s.rstrip()[:-2] + '  "p0-sense": {\n    label: "Picture the preposition first",\n    explain: "Each preposition draws its own picture: AT a point, ON a surface, IN an area, FROM a starting point, OF a part of a whole. Picture the situation in the sentence and choose the preposition whose picture matches it.",\n  },\n};\n'
    open(p, "w").write(s)

p = "index.html"; s = open(p).read()
s = re.sub(r'<script src="content/lessons/p0-[^"]+"></script>\n', "", s)
tags = "".join(f'<script src="content/lessons/{i}.js"></script>\n' for u in built for i, _ in u["lessons"])
if '<script src="content/atlas.js"></script>' not in s:
    s = s.replace('<script src="content/senses.js"></script>', '<script src="content/senses.js"></script>\n<script src="content/atlas.js"></script>', 1)
s = s.replace("<!-- Interface -->", tags + "<!-- Interface -->")
open(p, "w").write(s)
print("registered", sum(len(u["lessons"]) for u in built), "lessons")
