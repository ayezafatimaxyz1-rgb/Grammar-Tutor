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
exec(open(os.path.join(os.path.dirname(__file__), "p6_logic.py")).read())

def U(slug, title, prep, intro):
    phase5.U(slug, title, prep, intro)

def V(verb, level, meaning, example, sense, picture, others, icon=None, wrong=None):
    key = re.search(r"\[([^\]]+)\]", verb).group(1)
    phase5.F(verb, level, meaning, example, f"{key} = {sense}|{picture}", others, icon, wrong)
    UNITS[-1]["entries"][-1]["sense"] = sense

def ppic(word):
    return FALLBACK.get(word) or pic(word)

_phrase_steps = phase5.entry_steps

def equation(e, n, tag, meaning, example, fit):
    """A board that builds the meaning: verb (its own meaning) + particle (what it conveys) = the phrasal verb,
    then the sentence, then how the parts fit in that sentence."""
    ph, key = e["phrase"], e["key"]
    words = ph.split()
    verb = words[0]
    parts = [(verb, BASE.get(verb, ""), "main")]
    if len(words) == 3:
        parts.append((words[1], MID.get(ph, ""), "accent2"))
    parts.append((key, e["sense"], "accent2"))
    xs = [150, 480] if len(parts) == 2 else [110, 325, 540]
    res_x = 800 if len(parts) == 2 else 795
    acts, k = [], 0
    for i, (w, m, ink) in enumerate(parts):
        acts.append(f'{{ do: "write", id: "{tag}q{i}", text: {T(w)}, x: {xs[i]}, y: 190, size: 42, ink: {T(ink)}, anchor: "middle", gap: {350 if i else 450} }}')
        acts.append(f'{{ do: "write", id: "{tag}q{i}m", text: {T(m)}, x: {xs[i]}, y: 228, size: 21, ink: "muted", anchor: "middle", fit: {250 if len(parts) == 2 else 190} }}')
        sign_x = (xs[i] + (xs[i + 1] if i + 1 < len(parts) else res_x)) // 2 + (0 if i + 1 < len(parts) else -45)
        acts.append(f'{{ do: "write", id: "{tag}q{i}s", text: {T("+" if i + 1 < len(parts) else "=")}, x: {sign_x}, y: 190, size: 40, ink: "muted", anchor: "middle" }}')
    acts.append(f'{{ do: "write", id: "{tag}qr", text: {T(ph)}, x: {res_x + 15}, y: 190, size: 38, ink: "accent", anchor: "middle", fit: 300, gap: 300 }}')
    acts.append(f'{{ do: "write", id: "{tag}qrm", text: {T(meaning)}, x: {res_x + 15}, y: 228, size: 21, ink: "muted", anchor: "middle", fit: 300 }}')
    m = re.search(r"\{([^}]*)\}", example)
    form = m.group(1)
    sentence = example[:m.start()] + form + example[m.end():]
    acts.append(f'...PLAB.kit.rows("{tag}r", [[{spec(e)}, {T(sentence)}, {{ hl: {T(form)}, size: 30 }}]], {{ y: 330, gap: 130 }})')
    acts.append(f'{{ do: "write", id: "{tag}f1", text: {T("In this sentence: " + fit)}, x: 480, y: 455, size: 28, ink: "accent2", anchor: "middle", fit: 910, gap: 500 }}')
    acts.append(f'{{ do: "write", id: "{tag}f2", text: {T("so " + ph + " = " + meaning)}, x: 480, y: 505, size: 30, ink: "accent", anchor: "middle", fit: 910, gap: 300 }}')
    sum_text = " + ".join(f"{w} ({mm})" for w, mm, _ in parts)
    return acts, sentence, sum_text

def spec(e):
    return T(e["icon"]) if e["icon"] else ppic(e["key"])

def entry_steps(e, n, lid):
    steps, check = _phrase_steps(e, n, lid)
    ph, key = e["phrase"], e["key"]
    lv = LEVEL[e["level"]]
    pic_line = e["logic"].split("|")[1]
    # 1. Build the meaning: base verb + particle = phrasal verb, then fit it to the sentence.
    acts, sentence, sum_text = equation(e, n, f"f{n}", e["meaning"], e["example"], pic_line)
    steps[0]["actions"] = [f'PLAB.kit.clear("clear-{n}a")',
                           f'{{ do: "write", id: "f{n}h", text: {T(ph)}, x: 480, y: 70, size: 46, ink: "accent", anchor: "middle" }}',
                           f'{{ do: "write", id: "f{n}hl", text: {T(lv + " · " + e["meaning"])}, x: 480, y: 112, size: 24, ink: "muted", anchor: "middle", gap: 100 }}'] + acts
    steps[0]["alt"] = f"{ph} ({lv}): {sum_text} = {ph}, {e['meaning']}. Sentence: {sentence} In this sentence, {pic_line}."
    steps[0]["says"] = [
        (f"**{ph}** means {e['meaning']}: _{sentence}_", f"f{n}r1"),
        (f"Why **{key}**? Take it apart: {sum_text}. In this sentence, {pic_line}, so {ph} means {e['meaning']}.", f"f{n}f1"),
        (f"Sense: **{key}** = {e['sense']}.", f"f{n}f2"),
    ]
    # 2. The same verb in another common context, built the same way.
    if ph in ALSO:
        ex2, mean2, fit2 = ALSO[ph]
        acts2, sentence2, sum2 = equation(e, n, f"g{n}", mean2, ex2, fit2)
        steps.insert(1, dict(
            id=steps[0]["id"].replace("-meaning", "-context"), title=f"{ph}: another context",
            alt=f"{ph} in another context: {sum2} = {mean2}. Sentence: {sentence2} In this sentence, {fit2}.",
            says=[(f"The same parts, another context: _{sentence2}_", f"g{n}r1"),
                  (f"{sum2}. Here {fit2}, so **{ph}** means {mean2}. The parts keep their meaning; the context decides how they fit.", f"g{n}f1")],
            actions=[f'PLAB.kit.clear("clear-{n}c")',
                     f'{{ do: "write", id: "g{n}h", text: {T(ph + ": another context")}, x: 480, y: 70, size: 40, ink: "accent", anchor: "middle" }}',
                     f'{{ do: "write", id: "g{n}hl", text: {T("same parts, different situation")}, x: 480, y: 112, size: 24, ink: "muted", anchor: "middle", gap: 100 }}'] + acts2))
    ph, key = e["phrase"], e["key"]
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
phase5.spec = spec

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
