"""Register the built Phase 4 lessons: curriculum units per letter, script tags, misconception tag.
Run after phase4.py, from prepositions-lab/. Safe to run again."""
import json, os, re
here = os.path.dirname(__file__)
built = json.load(open(os.path.join(here, "p4_built.json")))
L = lambda s: json.dumps(s)

units = []
for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
    if letter not in built:
        continue  # all batches are built; a letter with no fixed-preposition words (X) gets no unit
    if letter in built:
        ls = "".join(f'              L({L(i)}, {L(t)}, {{ status: "tested", lessonId: {L(i)} }}),\n' for i, t in built[letter])
    else:
        ls = f'              L({L("p4-" + letter.lower() + "-planned")}, {L("Words beginning with " + letter)}),\n'
    units.append(f'          {{\n            id: {L("p4-" + letter.lower())},\n            title: {L("Letter " + letter)},\n            lessons: [\n{ls}            ],\n          }},\n')
block = ('      {\n        id: "p4",\n        title: "Phase 4: Fixed prepositions A to Z",\n'
         '        intro: "Every common and CSS-level word with the prepositions it takes, in alphabetical order. Each sense is drawn, and each choice is tested against the meaning the sentence wants.",\n'
         '        units: [\n' + "".join(units) + '        ],\n      },\n')
p = "content/curriculum.js"; s = open(p).read()
s = re.sub(r'      \{\n        id: "p4",.*?\n      \},\n(?=    \],\n    gaps:)', "", s, flags=re.S)
s = s.replace("    ],\n    gaps:", block + "    ],\n    gaps:", 1)
open(p, "w").write(s)

p = "content/misconceptions.js"; s = open(p).read()
if '"p4-sense"' not in s:
    s = s.rstrip()[:-2] + '  "p4-sense": {\n    label: "Choose by the meaning the sentence wants",\n    explain: "Many words take more than one preposition, each saying something different: certain of (sure it will happen), certain about (sure of the details). Read what comes after, and ask what the sentence means to say.",\n  },\n};\n'
    open(p, "w").write(s)

p = "index.html"; s = open(p).read()
s = re.sub(r'<script src="content/lessons/p4-[^"]+"></script>\n', "", s)
tags = "".join(f'<script src="content/lessons/{i}.js"></script>\n' for letter in sorted(built) for i, _ in built[letter])
s = s.replace("<!-- Interface -->", tags + "<!-- Interface -->")
open(p, "w").write(s)
print("registered", sum(len(v) for v in built.values()), "lessons")
