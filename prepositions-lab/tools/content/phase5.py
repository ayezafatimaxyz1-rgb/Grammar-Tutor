"""Phase 5: prepositional phrases (in lieu of, by dint of, at the behest of ...).

Run from prepositions-lab/:  python3 tools/content/phase5.py
Data lives in tools/content/p5_phrases.py:

  U(slug, title, prep, intro_lines)   starts a unit: the phrases led by one preposition
  F(phrase, level, meaning, example, logic, others, icon=None, wrong=None)
    phrase   the phrase with its tested preposition in [brackets]: "[in] lieu of", "in accordance [with]"
    example  {} marks where the phrase goes; {their words} gives the phrase in another form
    logic    why this preposition, in two short lines split by "|"
    others   [(phrase, verdict, reason)] for the lineup: D = correct English, different meaning;
             N = not used (reason says why)
    icon     the picture (defaults to the tested preposition's picture)
    wrong    the wrong prepositions offered in the practice question

Every phrase becomes: a board of its meaning with why this preposition, a "why this phrase and
not the others" lineup, and a practice question that blanks the tested preposition.
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(__file__))
from phase4 import T, D, N, LEVEL, pic, lines, js  # same board kit and output format as Phase 4

UNITS = []
WRONG = {
    "in": ["on", "at", "by"], "on": ["in", "at", "by"], "at": ["in", "on", "by"], "by": ["with", "in", "through"],
    "with": ["to", "of", "by"], "without": ["with", "in", "by"], "for": ["to", "in", "by"], "of": ["for", "to", "about"],
    "to": ["for", "of", "with"], "under": ["in", "on", "below"], "from": ["of", "by", "since"], "out of": ["off", "from", "beyond"],
    "beyond": ["over", "above", "out of"], "within": ["inside", "into", "among"], "against": ["on", "in", "at"],
}

def U(slug, title, prep, intro):
    UNITS.append(dict(slug=slug, title=title, prep=prep, intro=intro, entries=[]))

def F(phrase, level, meaning, example, logic, others, icon=None, wrong=None):
    key = re.search(r"\[([^\]]+)\]", phrase).group(1)
    UNITS[-1]["entries"].append(dict(phrase=re.sub(r"[\[\]]", "", phrase), key=key, level=level, meaning=meaning,
                                     example=example, logic=logic, others=list(others), icon=icon, wrong=wrong or WRONG[key]))

def surface(e):
    # The phrase as it stands in the example sentence, and the full sentence.
    m = re.search(r"\{([^}]*)\}", e["example"])
    form = m.group(1) or e["phrase"]
    at_start = m.start() == 0
    if at_start:
        form = form[0].upper() + form[1:]
    return form, e["example"][:m.start()] + form + e["example"][m.end():], e["example"][:m.start()] + "____" + e["example"][m.end():]

def blank_key(form, key):
    # Replace the tested preposition inside the phrase with a gap (keeping the rest).
    m = re.search(rf"(?i)(?<![A-Za-z]){re.escape(key)}(?![A-Za-z])", form)
    return form[:m.start()] + "___" + form[m.end():]

def spec(e):
    return T(e["icon"]) if e["icon"] else pic(e["key"])

def entry_steps(e, n, lid):
    ph, key = e["phrase"], e["key"]
    lv = LEVEL[e["level"]]
    form, sentence, gapped = surface(e)
    l1, l2 = [x.strip() for x in (e["logic"] + "|").split("|")[:2]]
    sid = re.sub(r"[^a-z]+", "-", ph.lower()).strip("-")
    steps = []
    # 1. What the phrase means, and why this preposition.
    steps.append(dict(
        id=f"{sid}-meaning", title=f"{ph} · {lv}",
        alt=f"{ph} ({lv}) means {e['meaning']}, as in: {sentence} Why {key}? {l1}; {l2}.",
        says=[(f"**{ph}** means {e['meaning']}: _{sentence}_", f"f{n}r1"),
              (f"Why **{key}**? {l1[0].upper() + l1[1:]}: {l2}.", f"f{n}y1")],
        actions=[f'PLAB.kit.clear("clear-{n}a")',
                 f'{{ do: "write", id: "f{n}h", text: {T(ph)}, x: 480, y: 70, size: 46, ink: "accent", anchor: "middle" }}',
                 f'{{ do: "write", id: "f{n}hl", text: {T(lv + " · " + e["meaning"])}, x: 480, y: 112, size: 24, ink: "muted", anchor: "middle", gap: 100 }}',
                 f'...PLAB.kit.rows("f{n}r", [[{spec(e)}, {T(sentence)}, {{ hl: {T(form)}, sub: {T(ph + " = " + e["meaning"])}, size: 30 }}]], {{ y: 250, gap: 140 }})',
                 f'{{ do: "write", id: "f{n}y1", text: {T("Why " + key + "? " + l1)}, x: 480, y: 440, size: 32, ink: "accent2", anchor: "middle", fit: 900, gap: 500 }}',
                 f'{{ do: "write", id: "f{n}y2", text: {T(l2)}, x: 480, y: 492, size: 28, ink: "muted", anchor: "middle", fit: 900 }}']))
    # 2. Why this phrase and not the others.
    opts = [(spec(e), ph, True, lines(e["meaning"]))]
    for p, v, r in e["others"]:
        opts.append(('"cross"' if v == N else pic(p.split()[0]), p, "diff" if v == D else False, lines(r)))
    clean = lambda r: " ".join(x.strip() for x in r.split("|"))
    why = [f"**{p}** is correct English, but it means {clean(r)}. That is not what this sentence says." if v == D else f"**{p}**: {clean(r)}." for p, v, r in e["others"]]
    opt_js = ", ".join(f"[{o[0]}, {T(o[1])}, {'true' if o[2] is True else T('diff') if o[2] == 'diff' else 'false'}, {T(o[3])}]" for o in opts)
    steps.append(dict(
        id=f"{sid}-why", title=f"{ph}: why this one?",
        alt=f"The sentence {gapped.replace('____', 'with a gap')}, then the candidates: " + "; ".join(
            f"{o[1]} ({'fits' if o[2] is True else 'correct English, different meaning' if o[2] == 'diff' else 'not used'}: {clean(o[3])})" for o in opts),
        says=[(f"Fill the gap: {gapped.replace('____', '…')} The sentence wants **{ph}**: {e['meaning']}.", f"f{n}w1"),
              ("Why not the others? " + " ".join(why), f"f{n}w2")],
        actions=[f'PLAB.kit.clear("clear-{n}b")', f'...PLAB.kit.lineup("f{n}w", {T(gapped)}, [{opt_js}], {T([ph + " = " + e["meaning"], "Why " + key + "? " + l1])})']))
    # 3. Practice: the tested preposition is blanked inside the phrase.
    prompt = sentence.replace(form, blank_key(form, key), 1)
    logic = f"{l1}: {l2}"
    choices = [(key, True, f"Correct. {ph} = {e['meaning']}. Why {key}? {logic}.")]
    for w in e["wrong"]:
        if w != key:
            choices.append((w, False, f"{blank_key(form, key).replace('___', w)} is not the fixed phrase. It is {ph}: {logic}."))
    choices.sort(key=lambda c: c[0])
    check = {"id": f"{lid}-{sid}", "source": "original", "skill": ph, "prompt": prompt,
             "options": [dict(text=c[0], why=c[2], **({"correct": True} if c[1] else {"misconception": "p5-phrase"})) for c in choices]}
    return steps, check

def intro_step(u):
    acts = ['PLAB.kit.clear("clear-intro")',
            f'{{ do: "write", id: "u-h", text: {T(u["prep"].upper())}, x: 480, y: 90, size: 64, ink: "accent", anchor: "middle", style: "caps" }}',
            f'...PLAB.kit.pic("u-p", {pic(u["prep"])}, 400, 120, 1.15)']
    says = []
    for i, line in enumerate(u["intro"]):
        acts.append(f'{{ do: "write", id: "u-l{i + 1}", text: {T(line)}, x: 480, y: {350 + i * 62}, size: {32 if i == 0 else 28}, ink: {T("accent2" if i == 0 else "main")}, anchor: "middle", fit: 900, gap: 400 }}')
        says.append((line[0].upper() + line[1:] + ("" if line.endswith(".") else "."), f"u-l{i + 1}"))
    says.append(("In every phrase in this part, ask what the preposition pictures. That picture is why the phrase takes it, and why another preposition would say something else or nothing at all.", None))
    return dict(id="intro", title=u["title"], alt=f"{u['prep'].upper()}: " + " ".join(u["intro"]), says=says, actions=acts)

def build(u, chunk=6):
    made = []
    es = u["entries"]
    for c in range(0, len(es), chunk):
        part = es[c:c + chunk]
        n = c // chunk + 1
        lid = f"p5-{u['slug']}{n}"
        steps = [intro_step(u)] if n == 1 else []
        checks = []
        for i, e in enumerate(part):
            st, ck = entry_steps(e, i + 1, lid)
            steps += st
            checks.append((e["phrase"], ck))
        for i, (ph, ck) in enumerate(checks):
            steps.append(dict(id=f"practice-{i + 1}", title=f"Practice: {ph}", alt="The last board stays.",
                              says=[("Which preposition completes the fixed phrase? Picture what the phrase means first.", None)], actions=[], check=ck))
        title = f"{u['title'].split(':')[0]} {n}: {part[0]['phrase']} … {part[-1]['phrase']}"
        levels = sorted({LEVEL[e["level"]] for e in part}, key=["Basic", "Intermediate", "Advanced"].index)
        src = f"""/* Phase 5, {title}. Generated by tools/content/phase5.py; edit the data in p5_phrases.py. */
(function () {{
  PLAB.registerLesson({{
    id: {T(lid)},
    title: {T(title)},
    phase: 5,
    unit: {T("p5-" + u["slug"])},
    level: {T(" to ".join([levels[0], levels[-1]]) if len(levels) > 1 else levels[0])},
    minutes: {4 * len(part)},
    summary: {T("Fixed prepositional phrases, each drawn with what it means and why its preposition fits: " + ", ".join(e["phrase"] for e in part) + ".")},
    objectives: {T(["Know what each phrase means and use it in a sentence.", "Explain why the phrase takes its preposition, from the picture of that preposition.", "Tell each phrase from the near misses that mean something else or are not English."])},
    steps: [
{js(dict(steps=steps))}
    ],
  }});
}})();
"""
        open(f"content/lessons/{lid}.js", "w").write(src)
        made.append((lid, title))
    return made

if __name__ == "__main__":
    here = os.path.dirname(__file__)
    exec(open(os.path.join(here, "p5_phrases.py")).read())
    built = [dict(slug=u["slug"], title=u["title"], lessons=build(u)) for u in UNITS]
    json.dump(built, open(os.path.join(here, "p5_built.json"), "w"), indent=1)
    print(sum(len(u["lessons"]) for u in built), "lessons,", sum(len(u["entries"]) for u in UNITS), "phrases")
