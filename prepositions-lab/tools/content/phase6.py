"""Phase 6: phrasal verbs, grouped by what the particle conveys.

Run from prepositions-lab/:  python3 tools/content/phase6.py
Data lives in tools/content/p6_verbs.py:

  U(slug, title, particle, intro_lines)   starts a unit
  V(verb, level, meaning, example, sense, picture, others, icon=None, wrong=None)
    verb     the verb with its tested particle in [brackets]: "call [off]", "put up [with]"
    example  {form} is the verb as it stands in the sentence: "He {gave up} smoking."
    sense    what the particle conveys here ("completely", "away"): it groups the verbs on
             each preposition's page
    picture  one short line: how that sense gives the meaning
    others   [(verb, verdict, reason)]: D = a real verb with another meaning, N = not used

Each verb gets the same three boards as a Phase 5 phrase, plus a line naming the particle's sense.
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(__file__))
import phase5
from phase4 import T, D, N, LEVEL, pic, lines, js

phase5.WRONG.update({
    "up": ["down", "out", "off"], "down": ["up", "off", "out"], "out": ["off", "up", "in"], "off": ["out", "up", "on"],
    "on": ["off", "in", "up"], "in": ["out", "on", "up"], "into": ["out", "over", "up"], "over": ["off", "up", "out"],
    "away": ["off", "out", "back"], "back": ["off", "up", "out"], "about": ["up", "out", "off"], "across": ["about", "up", "over"],
    "through": ["over", "off", "in"], "after": ["for", "into", "over"], "for": ["to", "on", "after"], "round": ["about", "over", "up"],
    "with": ["to", "for", "of"], "to": ["for", "with", "at"], "of": ["from", "for", "with"],
})
FALLBACK = {"out": '"goOut"', "away": '"personLeft"', "back": '"returnArc"', "across": '"acrossRoad"', "round": '"loop"',
            "about": '"aboutCircle"', "through": '"passThrough"', "into": '"intoBag"', "off": '"bounceOff"'}
UNITS = phase5.UNITS

def U(slug, title, prep, intro):
    phase5.U(slug, title, prep, intro)

def V(verb, level, meaning, example, sense, picture, others, icon=None, wrong=None):
    key = re.search(r"\[([^\]]+)\]", verb).group(1)
    phase5.F(verb, level, meaning, example, f"{key} = {sense}|{picture}", others, icon, wrong)
    UNITS[-1]["entries"][-1]["sense"] = sense

def ppic(word):
    return FALLBACK.get(word) or pic(word)

_phrase_steps = phase5.entry_steps

def entry_steps(e, n, lid):
    steps, check = _phrase_steps(e, n, lid)
    ph, key = e["phrase"], e["key"]
    # Name the particle's sense, so the preposition pages can group verbs by it.
    steps[0]["says"].append((f"Sense: **{key}** = {e['sense']}.", None))
    # Wrong practice options: a real verb says what it means instead; anything else simply does not mean this.
    others = {p: (v, r) for p, v, r in e["others"]}
    form = phase5.surface(e)[0]
    base = ph[: ph.lower().rindex(" " + key.lower())].strip()
    logic = e["logic"].replace("|", ": ")
    for o in check["options"]:
        if o.get("correct"):
            o["why"] = f"Correct. {ph} = {e['meaning']}. Here {key} = {e['sense']}: {e['logic'].split('|')[1]}."
            continue
        cand = f"{base} {o['text']}".strip()
        v = others.get(cand)
        o["why"] = (f"{cand} means {v[1].replace('|', ' ')}, which is not what this sentence says." if v and v[0] == D
                    else f"{cand} does not mean {e['meaning']}. The verb is {ph}: {logic}.")
        o["misconception"] = "p6-particle"
    return steps, check

phase5.entry_steps = entry_steps
phase5.pic = ppic  # unit boards for out, away, through ... get their own pictures
# In a lineup, picture each other verb by its particle (give in: the IN picture).
phase5.other_pic = lambda p: ppic(p.split()[-1]) if len(p.split()) > 1 else ppic(p)
_spec = phase5.spec
phase5.spec = lambda e: T(e["icon"]) if e["icon"] else ppic(e["key"])

phase5.PREFIX = "p6"

def build(u, chunk=6):
    made = phase5.build(u, chunk)
    for lid, title in made:
        path = f"content/lessons/{lid}.js"
        src = open(path).read()
        src = (src.replace("Phase 5,", "Phase 6,").replace("tools/content/phase5.py; edit the data in p5_phrases.py", "tools/content/phase6.py; edit the data in p6_verbs.py")
               .replace("Fixed prepositional phrases, each drawn with what it means and why its preposition fits:", "Phrasal verbs, each drawn with what it means and what its particle conveys:")
               .replace("Which preposition completes the fixed phrase? Picture what the phrase means first.", "Which particle gives the meaning this sentence wants? Picture what each one conveys.")
               .replace('"Know what each phrase means and use it in a sentence.", "Explain why the phrase takes its preposition, from the picture of that preposition.", "Tell each phrase from the near misses that mean something else or are not English."',
                        '"Know what each phrasal verb means and use it in a sentence.", "Explain the meaning from what the particle conveys: up = completely, off = away, and so on.", "Tell each verb from the same verb with another particle, which means something else."')
               .replace("In every phrase in this part, ask what the preposition pictures. That picture is why the phrase takes it, and why another preposition would say something else or nothing at all.",
                        "In every verb in this part, ask what the particle pictures. The same verb with another particle says something else: call off is not call out or call up."))
        assert "p5" not in src and "phase: 6," in src, lid
        open(path, "w").write(src)
    return made

if __name__ == "__main__":
    here = os.path.dirname(__file__)
    exec(open(os.path.join(here, "p6_verbs.py")).read())
    built = [dict(slug=u["slug"], title=u["title"], lessons=build(u)) for u in UNITS]
    json.dump(built, open(os.path.join(here, "p6_built.json"), "w"), indent=1)
    print(sum(len(u["lessons"]) for u in built), "lessons,", sum(len(u["entries"]) for u in UNITS), "verbs")
