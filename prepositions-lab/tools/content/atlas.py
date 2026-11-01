"""The sense atlas (Start here): the basic senses of every preposition, each drawn as its logic.

Run from prepositions-lab/:  python3 tools/content/atlas.py
Data lives in tools/content/atlas_data.py:

  UNIT(id, title)                                   starts a unit
  L(id, title, picture, core, child, senses)        one preposition (or a small family)
    S(prep, name, picture, caption, explain_lines, examples, vs)
      examples mark the preposition in [brackets]; vs = (other preposition, how it differs) or None
  D(id, title, panels, rules, check)                a confusing pair (or three) side by side
    panels = [(prep, picture, example, caption)]; check = (prompt with ___, answer, wrong options, why right, why wrong)

Writes content/lessons/p0-*.js (phase 0, shown first), content/atlas.js (data for the atlas page)
and tools/content/atlas_built.json (for register_atlas.py).
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from uses import use_for

T = lambda v: json.dumps(v, ensure_ascii=False)
UNITS = []
# Senses whose "other" preposition is also correct English there: no test question for them.
NOCHECK = {("about", "approximately"), ("about", "here and there"), ("in spite of", "the same, in three words"),
           ("but", "except (after all, none, every)"), ("owing to", "because of (formal)"), ("thanks to", "a cause you are glad of"),
           ("inside", "within the walls"), ("next to", "right beside, nothing between"), ("near", "a short distance from"),
           ("by", "at the side of"), ("over", "more than"), ("opposite", "facing across a space"),
           ("with", "a feeling towards a person"), ("on", "a focused topic"), ("from", "a source"),
           ("into", "a change of state"), ("towards", "in the direction of"), ("to", "up to a limit"),
           ("in", "after a time from now"), ("within", "inside a limit"), ("at", "a place where something happens"),
           ("beyond", "further than a limit"), ("against", "pressing on, touching"), ("of", "a cause from inside"),
           ("by", "an amount of difference"), ("out of", "moving to the outside"), ("off", "away from a surface"),
           ("due to", "caused by (after be)"), ("in front of", "before the face"), ("about", "around a topic")}

def UNIT(uid, title):
    UNITS.append(dict(id=uid, title=title, items=[]))

def S(prep, name, picture, caption, explain, examples, vs=None):
    return dict(prep=prep, name=name, picture=picture, caption=caption, explain=explain, examples=examples, vs=vs)

def L(lid, title, picture, core, child, senses):
    UNITS[-1]["items"].append(dict(kind="lesson", id=lid, title=title, picture=picture, core=core, child=child, senses=senses))

def D(lid, title, panels, rules, check):
    UNITS[-1]["items"].append(dict(kind="pair", id=lid, title=title, panels=panels, rules=rules, check=check))

plain = lambda ex: re.sub(r"\[([^\]]*)\]", r"\1", ex)
marked = lambda ex: re.search(r"\[([^\]]*)\]", ex).group(1)
slug = lambda s: re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
pic = lambda spec: T(spec)

def split2(text, limit=64):
    if len(text) <= limit:
        return [text]
    mid = len(text) // 2
    cut = min((i for i, c in enumerate(text) if c == " "), key=lambda i: abs(i - mid))
    return [text[:cut], text[cut + 1:]]

def core_step(item):
    acts = ['PLAB.kit.clear("clear-core")',
            f'{{ do: "write", id: "c-t", text: {T(item["title"])}, x: 480, y: 70, size: {min(52, int(1150 / max(len(item["title"]), 1)))}, ink: "accent", anchor: "middle", style: "caps", fit: 900 }}',
            f'...PLAB.kit.pic("c-p", {pic(item["picture"])}, 340, 98, 2)']
    acts.append(f'{{ do: "write", id: "c-core", text: {T(item["core"])}, x: 480, y: 318, size: 31, ink: "accent2", anchor: "middle", fit: 910, gap: 400 }}')
    for j, line in enumerate(split2(item["child"], 70)):
        acts.append(f'{{ do: "write", id: "c-child{j}", text: {T(line)}, x: 480, y: {368 + j * 40}, size: 26, anchor: "middle", fit: 910, gap: {300 if j == 0 else 0} }}')
    names = [f"{i + 1}. {s['name']}" for i, s in enumerate(item["senses"])]
    lines = split2("   ".join(names), 80)
    for j, line in enumerate(lines):
        acts.append(f'{{ do: "write", id: "c-list{j}", text: {T(line)}, x: 480, y: {478 + j * 34}, size: 22, ink: "muted", anchor: "middle", fit: 910, gap: {400 if j == 0 else 0} }}')
    says = [(item["core"], "c-core"), (item["child"], "c-child0"),
            (f"It has {len(item['senses'])} senses, and every one grows from this picture: " + "; ".join(s["name"] for s in item["senses"]) + ".", "c-list0")]
    return dict(id="core", title=f"{item['title']}: the core picture", alt=f"{item['title']}. {item['core']} {item['child']}", says=says, actions=acts)

def sense_step(item, i, s):
    t = f"s{i}"
    P = s["prep"].upper()
    head = f"{P} · {s['name']}"
    acts = [f'PLAB.kit.clear("clear-{t}")',
            f'{{ do: "write", id: "{t}h", text: {T(head)}, x: 480, y: 52, size: 34, ink: "accent", anchor: "middle", fit: 900 }}',
            f'...PLAB.kit.pic("{t}p", {pic(s["picture"])}, 36, 92, 1.8, {{ gap: 300 }})',
            f'{{ do: "write", id: "{t}c", text: {T(s["caption"])}, x: 162, y: 282, size: 22, ink: "accent2", anchor: "middle", fit: 290, gap: 200 }}']
    for j, line in enumerate(s["explain"][:2]):
        acts.append(f'{{ do: "write", id: "{t}e{j}", text: {T(line)}, x: 328, y: {122 + j * 40}, size: 26, fit: 610, gap: {350 if j == 0 else 0} }}')
    for j, ex in enumerate(s["examples"][:2]):
        acts.append(f'{{ do: "write", id: "{t}x{j}", text: {T(plain(ex))}, x: 328, y: {240 + j * 54}, size: 29, fit: 610, gap: {400 if j == 0 else 250} }}')
        acts.append(f'{{ do: "highlight", id: "{t}x{j}h", target: "{t}x{j}", word: {T(marked(ex))} }}')
    if s["vs"]:
        acts.append(f'{{ do: "write", id: "{t}v", text: {T("≠ " + s["vs"][0].upper() + ": " + s["vs"][1])}, x: 480, y: 392, size: 25, ink: "trouble", anchor: "middle", fit: 910, gap: 500 }}')
    acts.append(f'{{ do: "write", id: "{t}r", text: {T(item["core"])}, x: 480, y: {455 if s["vs"] else 400}, size: 22, ink: "muted", anchor: "middle", fit: 910, gap: 300 }}')
    says = [(f"**{s['prep']}** here means {s['name']}. " + " ".join(s["explain"]), f"{t}e0"),
            ("Look: " + " ".join(f"_{plain(ex)}_" for ex in s["examples"]), f"{t}x0")]
    if s["vs"]:
        says.append((f"Not the same as **{s['vs'][0]}**: {s['vs'][1]}", f"{t}v"))
    alt = f"{s['prep']}: {s['name']}. Picture: {s['caption']}. " + " ".join(s["explain"]) + " Examples: " + " ".join(plain(e) for e in s["examples"])
    return dict(id=f"{t}-{slug(s['prep'])}", title=f"{s['prep']}: {s['name']}", alt=alt, says=says, actions=acts)

def check_for(lid, i, s):
    ex = s["examples"][0]
    word = marked(ex)
    start = ex.startswith("[")
    cap = (lambda w: w[0].upper() + w[1:]) if start else (lambda w: w)
    prompt = re.sub(r"\[[^\]]*\]", "___", ex)
    opts = [dict(text=cap(s["prep"]), correct=True, why=f"Correct. {s['prep']} here means {s['name']}: " + " ".join(s["explain"]))]
    opts.append(dict(text=cap(s["vs"][0]), misconception="p0-sense", why=s["vs"][1]))
    opts.sort(key=lambda o: o["text"].lower())
    return {"id": f"p0-{lid}-{i}", "source": "original", "skill": f"{s['prep']}: {s['name']}", "prompt": prompt, "options": opts}

FALLBACK_PIC = {"in": "dotIn", "on": "cupOnTable", "at": "airportDot", "onto": "turnOnto", "into": "intoBag", "below": "belowLine",
                "under": "underTable", "above": "floatAbove", "over": "tankOver"}

def proof_steps(title, proof, pics, pre="", qpre="p0"):
    """For each preposition: its picture and question, then sentences proving why it fits and why each
    other one does not, then a how-to-choose board. Returns (steps, practice checks). Every item and
    step id starts with pre, so the boards can be added to other lessons without clashing."""
    steps, checks = [], []
    item = {"id": qpre, "title": title}
    pic_of = lambda p: pics.get(p) or FALLBACK_PIC.get(p, "arrowR")
    order = proof["order"]
    for p in order:
        if p not in proof["prove"]:
            continue  # a wrong form shown only as a candidate (e.g. "in spite" without of)
        pr = proof["prove"][p]
        sp = pre + slug(p)
        # The picture of this one, and the question that picks it.
        a = [f'PLAB.kit.clear("clear-{sp}")',
             f'{{ do: "write", id: "{sp}-t", text: {T(p.upper() + ": its picture")}, x: 480, y: 52, size: 38, ink: "accent", anchor: "middle", fit: 900 }}',
             f'...PLAB.kit.pic("{sp}-p", {pic(pic_of(p))}, 340, 86, 2)']
        for j, line in enumerate(pr["logic"]):
            a.append(f'{{ do: "write", id: "{sp}-l{j}", text: {T(line)}, x: 480, y: {300 + j * 44}, size: 30, ink: {T("accent2" if j == 0 else "main")}, anchor: "middle", fit: 910, gap: {400 if j == 0 else 200} }}')
        a.append(f'{{ do: "write", id: "{sp}-ask", text: {T("Ask yourself: " + pr["ask"])}, x: 480, y: {320 + len(pr["logic"]) * 44 + 40}, size: 27, ink: "accent", anchor: "middle", fit: 910, gap: 500 }}')
        steps.append(dict(id=f"{sp}-pic", title=f"{p}: its picture", alt=f"{p}: " + " ".join(pr["logic"]) + " Ask yourself: " + pr["ask"],
                          says=[(" ".join(pr["logic"]), f"{sp}-l0"), (f"Before you choose **{p}**, ask yourself: {pr['ask']}", f"{sp}-ask")],
                          actions=a))
        # Prove it on sentences: why this one, and why not each of the others.
        for j, (sent, why, others) in enumerate(pr["ex"]):
            gapped = re.sub(r"\[[^\]]*\]", "____", sent)
            cands = [q for q in order if q == p or q in others]
            opts = []
            for q in cands:
                if q == p:
                    opts.append((pic_of(q), q, True, why))
                else:
                    v, r = others[q]
                    opts.append((pic_of(q), q, "diff" if v == "D" else False, r))
            flat = lambda r: " ".join(x.strip() for x in r.split("|"))
            if j < 2:
                opt_js = ", ".join(f"[{pic(o[0])}, {T(o[1])}, {'true' if o[2] is True else T('diff') if o[2] == 'diff' else 'false'}, {T(o[3])}]" for o in opts)
                t = f"{sp}x{j}"
                ex_of = lambda q: use_for(q, f"{gapped}|{q}", strict=True) if others[q][0] == "D" else None
                why_not = " ".join(f"Why not **{q}**? {flat(others[q][1])}" + ((" That is correct English, but it says something else." + (f" Where {q} fits: _{ex_of(q)}_" if ex_of(q) else "")) if others[q][0] == "D" else ".") for q in cands if q != p)
                uses_ = [f"\u2248 {q}: {ex_of(q)}" for q in cands if q != p and ex_of(q)]
                steps.append(dict(id=f"{sp}-ex{j + 1}", title=f"{p}: example {j + 1}, why this and not the others",
                                  alt=f"{gapped.replace('____', 'with a gap')} Answer: {p}, because {flat(why)}. " + " ".join(f"Not {q}: {flat(others[q][1])}." for q in cands if q != p),
                                  says=[(f"Fill the gap: {gapped.replace('____', '…')} Picture it: {flat(why)}. So **{p}**.", f"{t}{cands.index(p) + 1}"),
                                        (why_not, f"{t}-r2")],
                                  actions=[f'PLAB.kit.clear("clear-{t}")', f'...PLAB.kit.lineup("{t}", {T(gapped)}, [{opt_js}], {T(["Why " + p + "? " + flat(why), "Ask: " + pr["ask"]])}, null, {T(uses_)})']))
            else:
                cap = (lambda w: w[0].upper() + w[1:]) if sent.startswith("[") else (lambda w: w)
                o = [dict(text=cap(p), correct=True, why=f"Correct. {flat(why)[0].upper() + flat(why)[1:]}. Ask: {pr['ask']}")]
                o += [dict(text=cap(q), misconception="p0-sense", why=(f"{flat(others[q][1])[0].upper() + flat(others[q][1])[1:]}." + ((" It is correct English, but it says something else." + (f" Where {q} fits: {use_for(q, gapped + '|' + q, strict=True)}" if use_for(q, gapped + '|' + q, strict=True) else "")) if others[q][0] == "D" else ""))) for q in cands if q != p]
                o.sort(key=lambda x: x["text"].lower())
                checks.append((p, {"id": f"{qpre}-{sp}", "source": "original", "skill": f"{item['title']}: {p}", "prompt": re.sub(r"\[[^\]]*\]", "___", sent), "options": o}))
    # How to choose: one question per preposition.
    rows = ", ".join(f"[{pic(pic_of(p))}, {T(proof['prove'][p]['ask'])}, {{ sub: {T('yes → ' + p.upper())}, size: 26 }}]" for p in order if p in proof["prove"])
    gap = 120 if len(order) <= 3 else 100
    steps.append(dict(id=pre + "decide", title=f"{item['title']}: how to choose",
                      alt="How to choose: " + " ".join(f"{proof['prove'][p]['ask']} Then {p}." for p in order if p in proof["prove"]),
                      says=[("How to choose: ask these questions about the situation in the sentence. " + " ".join(f"{proof['prove'][p]['ask']} Then **{p}**." for p in order if p in proof["prove"]), pre + "dc1")],
                      actions=[f'PLAB.kit.clear("clear-{pre}decide")',
                               f'{{ do: "write", id: "{pre}dc-t", text: "How to choose", x: 480, y: 50, size: 38, ink: "accent", anchor: "middle" }}',
                               f'...PLAB.kit.rows("{pre}dc", [{rows}], {{ y: 130, gap: {gap} }})']))
    return steps, checks

def pair_steps(item):
    n = len(item["panels"])
    k = 1.5 if n == 3 else 1.7
    panels = ", ".join(f"[{pic(sp)}, {T(ex)}, {T(cap)}, {{ hl: {T(p)} }}]" for p, sp, ex, cap in item["panels"])
    acts = ['PLAB.kit.clear("clear-pair")',
            f'{{ do: "write", id: "d-t", text: {T(item["title"])}, x: 480, y: 46, size: 36, ink: "accent", anchor: "middle", fit: 900 }}',
            f'...PLAB.kit.panels("d", [{panels}], {{ y: 78, k: {k} }})']
    for j, r in enumerate(item["rules"][:2]):
        acts.append(f'{{ do: "write", id: "d-r{j}", text: {T(r)}, x: 480, y: {420 + j * 52}, size: {27 if j == 0 else 25}, ink: {T("accent" if j == 0 else "accent2")}, anchor: "middle", fit: 910, gap: {500 if j == 0 else 300} }}')
    proof = PAIRS.get(item["id"])
    says = [(f"Put them side by side: " + " · ".join(f"**{p}** = {cap} (_{ex}_)" for p, sp, ex, cap in item["panels"]) + ".", "d1"),
            (item["rules"][0] + ".", "d-r0"), (item["rules"][1] + ".", "d-r1")]
    if proof:
        says.append(("Now we prove it. For each one: its picture, the question to ask, and sentences where it is right and the others are wrong.", None))
    steps = [dict(id="pair", title=item["title"], alt=item["title"] + ": " + "; ".join(f"{p}: {ex}, {cap}" for p, sp, ex, cap in item["panels"]) + ". " + " ".join(item["rules"]),
                  says=says, actions=acts)]
    checks = []
    if proof:
        pics = {p: sp for p, sp, ex, cap in item["panels"]}
        more, checks = proof_steps(item["title"], proof, pics, "", f"p0-{item['id']}")
        steps += more
    prompt, ans, wrong, why_r, why_w = item["check"]
    opts = [dict(text=ans, correct=True, why=f"Correct. {why_r}")] + [dict(text=w, misconception="p0-sense", why=why_w) for w in wrong]
    opts.sort(key=lambda o: o["text"].lower())
    checks.insert(0, (None, {"id": f"p0-{item['id']}-q", "source": "original", "skill": item["title"], "prompt": prompt, "options": opts}))
    for j, (p, ck) in enumerate(checks, 1):
        steps.append(dict(id=f"practice-{j}", title=f"Practice {j}: {item['title']}", alt="The last board stays.",
                          says=[("Which one fits? Picture the situation, ask the question, then choose.", None)], actions=[], check=ck))
    return steps

def js_steps(steps):
    out = []
    for s in steps:
        o = ["      {", f"        id: {T(s['id'])},", f"        title: {T(s['title'])},", f"        alt: {T(s['alt'])},", "        say: ["]
        o += [f"          {{ text: {T(t)}" + (f", cue: {T(c)}" if c else "") + " }," for t, c in s["says"]]
        o += ["        ],", "        actions: ["] + ["          " + a + "," for a in s["actions"]] + ["        ],"]
        if s.get("check"):
            o.append("        check: " + json.dumps(s["check"], ensure_ascii=False, indent=2).replace("\n", "\n        ") + ",")
        o.append("      },")
        out.append("\n".join(o))
    return "\n".join(out)

def build(units=None, prefix="p0", phase=0, var="atlas", data_file="content/atlas.js", built_file="atlas_built.json", label="Sense atlas", data_src="atlas_data.py"):
    built, atlas = [], []
    for u in (units if units is not None else UNITS):
        lessons, data = [], []
        for item in u["items"]:
            lid = f"{prefix}-{item['id']}"
            if item["kind"] == "lesson":
                steps = [core_step(item)]
                checks = []
                for i, s in enumerate(item["senses"], 1):
                    st = sense_step(item, i, s)
                    steps.append(st)
                    s["step"] = st["id"]
                    if s["vs"] and (s["prep"], s["name"]) not in NOCHECK:
                        checks.append((s, check_for(item["id"], i, s)))
                for j, (s, ck) in enumerate(checks, 1):
                    steps.append(dict(id=f"practice-{j}", title=f"Practice: {s['prep']}, {s['name']}", alt="The last board stays.",
                                      says=[("Which one fits? Picture what each one means first.", None)], actions=[], check=ck))
                summary = f"The basic senses of {item['title'].lower()}, each drawn as its logic: " + "; ".join(f"{s['prep']} = {s['name']}" for s in item["senses"]) + "."
                data.append(dict(kind="lesson", lesson=lid, title=item["title"], core=item["core"], child=item["child"],
                                 senses=[dict(prep=s["prep"], name=s["name"], caption=s["caption"], explain=" ".join(s["explain"]),
                                              examples=[plain(e) for e in s["examples"]], vs=s["vs"], step=s["step"]) for s in item["senses"]]))
            else:
                steps = pair_steps(item)
                summary = f"{item['title']} side by side: " + " ".join(item["rules"]) + "."
                data.append(dict(kind="pair", lesson=lid, title=item["title"], rules=item["rules"],
                                 panels=[dict(prep=p, example=ex, caption=cap) for p, sp, ex, cap in item["panels"]]))
            src = f"""/* {label}, {item['title']}. Generated by tools/content/atlas.py; edit the data in {data_src}. */
(function () {{
  PLAB.registerLesson({{
    id: {T(lid)},
    title: {T(item['title'] if item['kind'] == 'pair' else item['title'] + ': its senses')},
    phase: {phase},
    unit: {T(prefix + "-" + u["id"])},
    level: "Basic",
    minutes: {2 * len(steps)},
    summary: {T(summary)},
    objectives: {T(["See what the preposition pictures, and how each sense grows from that picture.", "Use each sense in a sentence, and tell it from the preposition it is most often confused with."])},
    steps: [
{js_steps(steps)}
    ],
  }});
}})();
"""
            open(f"content/lessons/{lid}.js", "w").write(src)
            lessons.append((lid, item["title"] if item["kind"] == "pair" else item["title"] + ": its senses"))
        built.append(dict(id=u["id"], title=u["title"], lessons=lessons))
        atlas.append(dict(id=u["id"], title=u["title"], items=data))
    if data_file:
        open(data_file, "w").write(f"/* {label}: data for its page. Generated by tools/content/atlas.py. */\nPLAB.{var} = " + json.dumps(atlas, ensure_ascii=False, indent=1) + ";\n")
    json.dump(built, open(os.path.join(os.path.dirname(__file__), built_file), "w"), indent=1)
    return built

if __name__ == "__main__":
    exec(open(os.path.join(os.path.dirname(__file__), "atlas_data.py")).read())
    exec(open(os.path.join(os.path.dirname(__file__), "atlas_pairs.py")).read())
    b = build()
    n = sum(len(u["lessons"]) for u in b)
    senses = sum(len(i["senses"]) for u in UNITS for i in u["items"] if i["kind"] == "lesson")
    print(n, "lessons,", senses, "senses,", sum(1 for u in UNITS for i in u["items"] if i["kind"] == "pair"), "pairs")
