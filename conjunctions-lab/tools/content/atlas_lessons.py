# Builds board lessons from the data: the atlas (with "why this, why not the others"), the punctuation rules and the mistakes catalogue.
# Executed from lessons_data.py. Needs: here, lesson, chk, re, os.
def _block(path, name):
    s = open(path).read()
    return s.split(name + " = `")[1].split("`;")[0].strip().split("\n")
_conj = os.path.join(here, "..", "..", "content", "conj")
_atlas = [[x.strip() for x in l.split("|")] for l in _block(os.path.join(_conj, "atlas.js"), "PLAB.conj.atlasText")]
_punct = [[x.strip() for x in l.split("|")] for l in _block(os.path.join(_conj, "more.js"), "PLAB.conj.punctText")]
_mist = [[x.strip() for x in l.split("|")] for l in _block(os.path.join(_conj, "more.js"), "PLAB.conj.mistakeText")]
_gaps = [[x.strip() for x in l.split("|")] for l in _block(os.path.join(_conj, "exam.js"), "PLAB.conj.gapText")]
_ns = {}
exec(open(os.path.join(here, "atlas_short.py")).read(), _ns)
_short = {(l.split("|")[0], l.split("|")[1]): l.split("|")[2:] for l in _ns["SHORT"].strip().split("\n")}

TYPE_LABEL = {"coord": "coordinating", "sub": "subordinating", "corr": "pair", "adv": "linking adverb"}
GROUPS = [
 ("add", "Adding", "plus", ["Words that add one idea to another.", "Some add a stronger point, some just another.", "Pick by how strong the extra point is."]),
 ("contrast", "Contrast", "contrast", ["Words that set two ideas against each other.", "Some show surprise, some a plain difference.", "Join with one contrast word only."]),
 ("concession", "Concession", "umbrellaRain", ["The main idea stays true in spite of another idea.", "Although, though, even though, even if.", "Never add but after them."]),
 ("choice", "Choice", "fork", ["Words that give a choice or a refusal.", "Or, nor, either ... or, neither ... nor.", "Keep both sides of a pair parallel."]),
 ("reason", "Reason", "reasonFor", ["Words that give the reason.", "The reason is the cause; the result follows.", "Because and so never go together."]),
 ("result", "Result", "causeEffect", ["Words that show what followed.", "So, therefore, consequently, so ... that.", "A result needs a reason before it."]),
 ("time", "Time", "clock", ["Words that place one event against another.", "Before, after, while, until, since, as soon as.", "Use the present tense after them for the future."]),
 ("condition", "Condition", "keyLock", ["Words that say what must be true first.", "If, unless, provided that, in case.", "Present tense in the condition."]),
 ("purpose", "Purpose", "target", ["Words that say why someone acts.", "So that, in order that, lest.", "Match the tense after them."]),
 ("comparison", "Comparison", "scaleTip", ["Words that compare.", "Than, as ... as, as if.", "Than follows a comparative."]),
 ("place", "Place", "airportDot", ["Words that say where.", "Where and wherever.", "Not the same as when."]),
 ("manner", "Manner", "exact", ["Words that say how.", "As and how.", "Before a clause use as, not like."]),
 ("noun", "That and whether", "qToA", ["Words that start a clause used as a noun.", "That, whether, if.", "Whether is safer for yes or no questions."]),
 ("example", "Examples", "giveTo", ["Words that bring in an example.", "For example, for instance, namely.", "One example or all of them."]),
 ("emphasis", "Emphasis", "star", ["Words that stress a point.", "In fact, indeed, above all.", "Use them to strengthen, not to decorate."]),
 ("sequence", "Order of points", "timeline", ["Words that order a list of points.", "First, then, afterwards, finally.", "Keep them in a sensible order."]),
 ("summary", "Summing up", "conclusion", ["Words that close or restate.", "In conclusion, in short, in other words.", "Use them to end, not to start."]),
]

def _mark(sentence, word):
    parts = [p.strip() for p in word.split("...")] if "..." in word else [word]
    out, pos = sentence, 0
    for p in parts:
        m = re.compile(r"\b" + re.escape(p) + r"\b", re.I).search(out, pos)
        if m:
            out = out[:m.start()] + "[" + m.group(0) + "]" + out[m.end():]
            pos = m.end() + 1
    return out

def _atlas_lessons():
    lessons = []
    for gid, gname, gpic, glines in GROUPS:
        es = [e for e in _atlas if e[2] == gid]
        for ci in range(0, len(es), 6):
            ch = es[ci:ci + 6]; n = ci // 6 + 1
            words = [e[0].lower() for e in ch]
            lid = f"at-{gid}" + (f"-{n}" if len(es) > 6 else "")
            boards = [dict(kind="intro", title=gname + (f" ({n})" if len(es) > 6 else ""), pic=gpic, lines=glines)]
            for i, e in enumerate(ch):
                sh = _short[(e[0], e[2])]
                exs = [_mark(x.strip(), e[0]) for x in e[5].split(";;")][:2]
                boards.append(dict(kind="word", word=e[0], name=TYPE_LABEL[e[1]], pic=e[4], caption=gname, explain=[sh[0], sh[1]], examples=exs, note=sh[2]))
                if i % 3 == 2 or i == len(ch) - 1:
                    grp = ch[(i // 3) * 3:(i // 3) * 3 + 3]
                    boards.append(dict(kind="rows", title="Which one? Why this, why not the others", rows=[(g[4], f"{g[0]}: {_short[(g[0], g[2])][0]}", g[0], _short[(g[0], g[2])][1]) for g in grp]))
            gq = [g for g in _gaps if any(g[1].lower() == w or g[1].lower().startswith(w + " ") for w in words)][:2]
            for g in gq[:1]:
                opts = [(g[1], True, g[5])] + [(o, False, f"{o.upper()} does not fit. " + g[5]) for o in g[2:5]]
                boards.insert(3 if len(boards) > 3 else len(boards), chk(g[0], *opts))
            mk = [(m[0], m[1], m[2]) for m in _mist if any(re.search(r"\b" + re.escape(w.split(" ...")[0]) + r"\b", m[1], re.I) for w in words)][:3]
            pr = []
            for g in gq[1:2]:
                pr.append((g[0], [(g[1], True, g[5])] + [(o, False, f"{o.upper()} does not fit. " + g[5]) for o in g[2:5]]))
            lessons.append(lesson(lid, f"{gname}: " + ", ".join(e[0] for e in ch)[:48], "at-" + gid, f"{gname} words", f"Each of these words does a different job. Learn what it says, and why the others do not fit.",
                f"The {gname.lower()} words {', '.join(words)}: the logic of each, an example, and why this one and not the others.",
                [f"Say what each word does.", "Say why this word and not its neighbours.", "Spot the usual trap."],
                boards, mk or [("(see the boards above)", "(see the boards above)", "Read the Be careful notes.")] if False else mk, pr,
                [f"{e[0]}: {_short[(e[0], e[2])][0]}" for e in ch[:3]] or ["Read the boards again."], level="Atlas"))
    return lessons

def _punct_lessons():
    boards = [dict(kind="intro", title="Commas and conjunctions", pic="equalTwo", lines=["Where a comma goes depends on the kind of join.", "Two full sentences, a clause first, a linking adverb.", "Learn the rule behind each one."])]
    for w_, rule, ok, bad, why in _punct:
        boards.append(dict(kind="text", title=w_[:48], lines=[(rule, "accent", 24), ("✓ " + ok, "accent2", 27), ("✗ " + bad, "trouble", 27), (why, "muted", 22)]))
    return [lesson("cj-comma-rules", "The comma rules for conjunctions", "cj-comma", "Punctuation with conjunctions", "A comma, a semicolon or nothing: the rule depends on what the conjunction joins.",
        "Eleven rules for punctuating and, but, because, although, however and the lists they appear in.", ["Know the eleven rules.", "Fix a comma splice.", "Punctuate a clause that comes first or last."],
        boards, [(b, g, y) for _, _, g, b, y in _punct[:3]], [], ["Two full sentences with FANBOYS: comma before.", "A clause first: comma after it.", "However and therefore need a semicolon or full stop before them."], level="Basic")]

MIST_TAGS = {"double": "Two conjunctions where one is enough", "negative": "Double negatives", "order": "Word order after not only, hardly", "pair": "Pairs that must match", "tense": "Tenses after conjunctions", "noun": "That, whether and if", "prep": "Conjunction or preposition", "agree": "Agreement with both, either, neither", "compare": "Comparisons", "manner": "As and like", "purpose": "So that", "result": "So and such", "splice": "Comma splice and linking adverbs", "meaning": "Wrong meaning"}
def _mist_lessons():
    out = []
    for tg, label in MIST_TAGS.items():
        ms = [m for m in _mist if m[3] == tg]
        if not ms: continue
        boards = [dict(kind="intro", title=label, pic="cross", lines=[f"{len(ms)} sentences that students get wrong.", "Read the wrong one, then the right one, then the rule.", "Ask why this form and not the other."])]
        pr = [("Which sentence is correct?", [(m[1], True, m[2]), (m[0], False, m[2])]) for m in ms[:3]]
        out.append(lesson(f"ms-{tg}", f"Mistakes: {label}", "ms-" + tg, label, f"The usual mistake: {label.lower()}.", f"{len(ms)} wrong sentences about {label.lower()}, with the right form and the rule.",
            ["Spot the mistake.", "Say the rule.", "Write the right form."], boards, [(m[0], m[1], m[2]) for m in ms], pr,
            [ms[0][2], "Read the rule, not just the answer."], level="Exam"))
    return out

ATLAS_LESSONS = _atlas_lessons()
PUNCT_LESSONS = _punct_lessons()
MIST_LESSONS = _mist_lessons()
