"""Phase 4: the fixed preposition system, A to Z.

Run from prepositions-lab/:  python3 tools/content/phase4.py
Data lives in tools/content/p4_*.py (one file per batch of letters). Each entry:

  W(word, level, senses, ask, others)
    level   "B" basic, "I" intermediate, "A" advanced (CSS)
    senses  [(prep, meaning, example)], the example marks its preposition in [brackets]
    ask     index of the sense whose example becomes the "why this one" sentence
    others  [(prep, verdict, reason)] for the other candidates in that sentence:
            D = correct English but a different meaning (reason = that meaning),
            N = not used (reason = why the picture clashes)

Every entry becomes: a board of its senses (one picture per sense), a "why this one and not
the others" lineup, and a practice question at the end of its lesson.
"""
import json, glob, os, re

T = json.dumps
D, N = "D", "N"
LEVEL = {"B": "Basic", "I": "Intermediate", "A": "Advanced"}
PICS = {
    "of": '"awareOf"', "on": '"support"', "upon": '"support"', "to": '"reachDot"', "towards": '"lookAhead"',
    "with": '"agreeWith"', "for": '"wantStar"', "in": '"absorbedIn"', "into": '"intoBag"',
    "at": '[["arrowR", -40, 0], ["target", 30, 0]]', "from": '"holdBack"', "about": '"aboutCircle"',
    "over": '"overRock"', "against": '"shield"', "between": '"linkBetween"', "among": '"crowdDot"',
    "by": '"followRule"', "under": '"underTable"', "through": '"passThrough"', "after": '"careFor"',
    "off": '"bookTable"', "out of": '"goOut"', "up": '"arrowUp"', "down": '"arrowDown"', "(no word)": '"check"',
}
ENTRIES = []

def W(word, level, senses, ask=0, others=()):
    ENTRIES.append(dict(word=word, level=level, senses=senses, ask=ask, others=list(others)))

def pic(prep):
    return PICS.get(prep, PICS.get(prep.split()[-1], '"arrowR"'))

def blank(example):
    return re.sub(r"\[[^\]]*\]", "____", example)

def plain(example):
    return re.sub(r"\[([^\]]*)\]", r"\1", example).replace("(no word) ", "").replace(" (no word)", "")

def phrase(word, prep):
    return word if prep == "(no word)" else f"{word} {prep}"

def lines(text):
    # Split a short reason over two lines at the space nearest the middle.
    if "|" in text or len(text) < 20:
        return text
    mid = len(text) // 2
    cut = min((i for i, c in enumerate(text) if c == " "), key=lambda i: abs(i - mid), default=-1)
    return text if cut < 0 else text[:cut] + " | " + text[cut + 1:]

def entry_steps(e, n, lid):
    w, senses = e["word"], e["senses"]
    lv = LEVEL[e["level"]]
    steps = []
    # 1. The senses, one picture each.
    items = []
    says = []
    for i, sense in enumerate(senses):
        prep, meaning, ex = sense[:3]
        spec = sense[3] if len(sense) > 3 else pic(prep)
        o = (f"hl: {T(prep)}, " if prep != "(no word)" else "") + f"sub: {T(phrase(w, prep) + ' = ' + meaning)}, size: 30"
        items.append(f"[{spec}, {T(plain(ex))}, {{ {o} }}]")
        says.append((f"**{phrase(w, prep)}** means {meaning}: _{plain(ex)}_", f"e{n}s{i + 1}"))
    top = 330 - (len(senses) - 1) * 70
    board = f'...PLAB.kit.rows("e{n}s", [{", ".join(items)}], {{ y: {top}, gap: 140 }})'
    if len(senses) > 1:
        says.insert(0, (f"**{w}** can take {len(senses)} prepositions, and each one says something different. Look at what comes after it.", None))
    alt = f"{w} ({lv}): " + "; ".join(f"{phrase(w, s_[0])} = {s_[1]}, as in {plain(s_[2])}" for s_ in senses)
    steps.append(dict(id=f"{w}-senses".replace(" ", "-"), title=f"{w} · {lv}", alt=alt, says=says,
                      actions=[f'PLAB.kit.clear("clear-{n}a")',
                               f'{{ do: "write", id: "e{n}h", text: {T(w)}, x: 480, y: 70, size: 46, ink: "accent", anchor: "middle" }}',
                               f'{{ do: "write", id: "e{n}hl", text: {T(lv + " · " + ", ".join(phrase(w, s_[0]) for s_ in senses))}, x: 480, y: 112, size: 24, ink: "muted", anchor: "middle", gap: 100 }}',
                               board]))
    # 2. Why this one and not the others.
    prep, meaning, ex = senses[e["ask"]][:3]
    sentence = blank(ex)
    opts = [(pic(prep), prep, True, lines(meaning))]
    for p, v, r in e["others"]:
        opts.append(('"cross"' if v == N else pic(p), p, "diff" if v == D else False, lines(r)))
    clean = lambda r: " ".join(x.strip() for x in r.split("|"))
    why = []
    for p, v, r in e["others"]:
        why.append(f"**{p}** is correct English, but it would mean {clean(r)}. That is not what this sentence says." if v == D else f"**{p}**: {clean(r)}.")
    says2 = [(f"Fill the gap: {sentence.replace('____', '…')} What does the sentence want to say? It wants **{phrase(w, prep)}**: {meaning}.", f"e{n}w1"),
             ("Why not the others? " + " ".join(why), f"e{n}w2")]
    rules = [f"{phrase(w, s_[0])} = {s_[1]}" for s_ in senses][:2]
    opt_js = ", ".join(f"[{o[0]}, {T(o[1])}, {'true' if o[2] is True else T('diff') if o[2] == 'diff' else 'false'}, {T(o[3])}]" for o in opts)
    alt2 = f"The sentence {sentence.replace('____', 'with a gap')}, then the candidates: " + "; ".join(
        f"{o[1]} ({'fits' if o[2] is True else 'correct English, different meaning' if o[2] == 'diff' else 'not used'}: {clean(o[3])})" for o in opts)
    steps.append(dict(id=f"{w}-why".replace(" ", "-"), title=f"{w}: why this one?", alt=alt2, says=says2,
                      actions=[f'PLAB.kit.clear("clear-{n}b")', f'...PLAB.kit.lineup("e{n}w", {T(sentence)}, [{opt_js}], {T(rules)})']))
    # 3. A practice question: another sense's example if there is one, else the same sentence.
    k = next((i for i in range(len(senses)) if i != e["ask"]), e["ask"])
    p3, m3, x3 = senses[k][:3]
    choices = [(p3, True, f"Correct. {phrase(w, p3)} = {m3}.")]
    for p, m, *_ in senses:
        if p != p3 and all(p != c[0] for c in choices):
            choices.append((p, False, f"{phrase(w, p)} means {m}, which is not what this sentence says."))
    for p, v, r in e["others"]:
        if all(p != c[0] for c in choices) and len(choices) < 4:
            choices.append((p, False, f"{clean(r)[0].upper() + clean(r)[1:]}."))
    choices.sort(key=lambda c: c[0])
    check = {"id": f"{lid}-{w}".replace(" ", "-"), "source": "original", "skill": phrase(w, p3), "prompt": blank(x3).replace("____", "___"),
             "options": [dict(text=c[0], why=c[2], **({"correct": True} if c[1] else {"misconception": "p4-sense"})) for c in choices]}
    return steps, check

def js(lesson):
    out = []
    for s in lesson["steps"]:
        o = ["      {", f"        id: {T(s['id'])},", f"        title: {T(s['title'])},", f"        alt: {T(s['alt'])},", "        say: ["]
        o += [f"          {{ text: {T(t)}" + (f", cue: {T(c)}" if c else "") + " }," for t, c in s["says"]]
        o += ["        ],", "        actions: ["] + ["          " + a + "," for a in s["actions"]] + ["        ],"]
        if s.get("check"):
            o.append("        check: " + json.dumps(s["check"], ensure_ascii=False, indent=2).replace("\n", "\n        ") + ",")
        o.append("      },")
        out.append("\n".join(o))
    return "\n".join(out)

def build(letter, entries, chunk=8):
    entries = sorted(entries, key=lambda e: e["word"].lower())
    made = []
    for c in range(0, len(entries), chunk):
        part = entries[c:c + chunk]
        n = c // chunk + 1
        lid = f"p4-{letter.lower()}{n}"
        steps, checks = [], []
        for i, e in enumerate(part):
            st, ck = entry_steps(e, i + 1, lid)
            steps += st
            checks.append((e["word"], ck))
        for i, (w, ck) in enumerate(checks):
            steps.append(dict(id=f"practice-{i + 1}", title=f"Practice: {w}", alt="The last board stays.",
                              says=[("Which preposition carries the meaning this sentence wants?", None)], actions=[], check=ck))
        words = [e["word"] for e in part]
        title = f"{letter} {n}: {words[0]} … {words[-1]}"
        summary = "Words and the prepositions they take, each sense drawn and tested: " + ", ".join(
            f"{e['word']} ({', '.join(s_[0] for s_ in e['senses'])})" for e in part) + "."
        levels = sorted({LEVEL[e["level"]] for e in part}, key=["Basic", "Intermediate", "Advanced"].index)
        src = f"""/* Phase 4, {title}. Generated by tools/content/phase4.py; edit the data there. */
(function () {{
  PLAB.registerLesson({{
    id: {T(lid)},
    title: {T(title)},
    phase: 4,
    unit: {T("p4-" + letter.lower())},
    level: {T(" to ".join([levels[0], levels[-1]]) if len(levels) > 1 else levels[0])},
    minutes: {4 * len(part)},
    summary: {T(summary)},
    objectives: {T(["For each word, see what each preposition conveys and choose by the meaning the sentence wants.", "Explain why the other prepositions fail: a different meaning, or not used at all."])},
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
    for f in sorted(glob.glob(os.path.join(here, "p4_*.py"))):
        exec(open(f).read())
    by = {}
    for e in ENTRIES:
        by.setdefault(e["word"][0].upper(), []).append(e)
    made = {L: build(L, es) for L, es in sorted(by.items())}
    json.dump({L: m for L, m in made.items()}, open(os.path.join(here, "p4_built.json"), "w"), indent=1)
    print(sum(len(m) for m in made.values()), "lessons,", len(ENTRIES), "words")
