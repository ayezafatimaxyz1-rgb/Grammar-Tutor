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
    # a pair is highlighted as one stretch, from its first part to its last
    parts = [p.strip() for p in word.split("...")] if "..." in word else [word]
    pos, first, last = 0, None, None
    for p in parts:
        m = re.compile(r"\b" + re.escape(p) + r"\b", re.I).search(sentence, pos)
        if not m: continue
        first = m.start() if first is None else first
        last = m.end()
        pos = m.end()
    return sentence if first is None else sentence[:first] + "[" + sentence[first:last] + "]" + sentence[last:]

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

# ---------------------------------------------------------------- senses of one word
SENSES = {
 "as": ("as", [("as", "time"), ("as", "reason"), ("as", "manner"), ("as ... as", "comparison")],
        [("clock", "Time: it changes as something else goes on", "time", "As the sun rose, the fog lifted."),
         ("reasonFor", "Reason: you could say because", "reason", "As it was late, we went home."),
         ("exact", "Manner: you could say in the way that", "way", "Do as I say.")],
        "Try because. If it fits, the sense is reason. Try while. If it fits, time. Try in the way that. If it fits, manner."),
 "since": ("since", [("since", "time"), ("since", "reason")],
        [("sincePoint", "Time: from a past point until now", "time", "I have lived here since 2015."),
         ("reasonFor", "Reason: because, the reason is known", "reason", "Since you are tired, rest."),
         ("cross", "Time since needs the perfect tense", "perfect", "I have lived, not I live, since 2015.")],
        "Does since point to a starting time? Then time. Does it give a reason the listener knows? Then reason."),
 "while": ("while", [("while", "time"), ("while", "contrast")],
        [("span", "Time: during, at the same time as", "time", "He read while she cooked."),
         ("contrast", "Contrast: whereas, two facts differ", "contrast", "While Ali likes cricket, Omar likes hockey."),
         ("question", "Test: put at the same time as, or whereas", "test", "At the same time as = time. Whereas = contrast.")],
        "Replace while with at the same time as. If it fits it is time. Replace it with whereas. If it fits it is contrast."),
 "if": ("if", [("if", "condition"), ("if", "noun")],
        [("keyLock", "Condition: only when it is true", "condition", "If it rains, we will stay home."),
         ("qToA", "Noun clause: a yes or no question inside", "question", "She asked if I was ready."),
         ("question", "Test: can you put whether in its place?", "whether", "Whether fits only the question sense.")],
        "Can you put whether in its place? Then it is a yes or no question. If not, it is a condition."),
 "so": ("so", [("so", "result"), ("so that", "purpose"), ("so ... that", "result")],
        [("thenResult", "SO alone: the result of what came before", "result", "It rained, so we stayed home."),
         ("target", "SO THAT: the purpose, what he wants", "purpose", "He studies so that he can pass."),
         ("causeEffect", "SO ... THAT: so much that a result followed", "so ... that", "It was so hot that I fainted.")],
        "So alone: what happened. So that: what someone wants. So ... that: how much, and what followed."),
}

def _sense_lessons():
    out = []
    for key, (word, parts, rows, tell) in SENSES.items():
        boards = [dict(kind="intro", title=f"{word.upper()} has {len(parts)} jobs", pic="twoPaths", lines=[f"One word, {len(parts)} meanings.", "The sentence tells you which one.", "Learn a quick test for each."])]
        for w_, g in parts:
            sh = _short[(w_, g)]
            e = next(x for x in _atlas if x[0] == w_ and x[2] == g)
            exs = [_mark(x.strip(), e[0]) for x in e[5].split(";;")][:2]
            boards.append(dict(kind="word", word=e[0], name=GNAME[g], pic=e[4], caption=GNAME[g], explain=[sh[0], sh[1]], examples=exs, note=sh[2]))
        boards.append(dict(kind="rows", title=f"How to tell which {word.upper()}", rows=rows))
        qs = [g for g in _gaps if any(w_ in (g[0].lower() + " ") for w_ in [])]
        mk = [(m[0], m[1], m[2]) for m in _mist if re.search(r"\b" + re.escape(word) + r"\b", m[1], re.I)][:3]
        out.append(lesson(f"sn-{key.replace(' ', '-')}", f"The senses of {word.upper()}", "sn-" + key, f"The senses of {word}", f"One word can do several jobs. {tell}",
            f"The different jobs of {word}, with a quick test for telling them apart.", ["Name each sense.", "Use the quick test.", "Choose the sense from the sentence."],
            boards, mk, [(q, o) for q, o in []], [tell, "Read the sentence, then test."], level="Atlas"))
    return out
GNAME = {g[0]: g[1] for g in GROUPS}

# ---------------------------------------------------------------- confusing pairs
PAIRS = """
because|because of|reasonFor|reasonFor|gives a reason: a clause follows|+ subject + verb|because it rained|gives a reason: a noun follows|+ a noun|because of the rain|Clause after because. Noun after because of.|We stayed in ___ it rained.
because|since|reasonFor|sincePoint|the clear, main reason|answers: why?|He left because he was ill.|a reason both of you know|often at the start|Since you know, tell me.|Use since for a reason already known.|___ you know the answer, tell me.
although|despite|umbrellaRain|barrierStop|+ a clause (subject and verb)|although he was ill|Although he was ill, he came.|+ a noun or an -ing form|despite his illness|Despite his illness, he came.|Although takes a clause. Despite takes a noun.|He came ___ his illness.
although|but|umbrellaRain|contrast|opens the weaker idea|never together with but|Although he is poor, he is kind.|joins two parts|comes between the parts|He is poor, but he is kind.|Use one of them, never both.|___ he is poor, he is kind.
while|whereas|span|contrast|two things at once, or a contrast|may be read as time|He read while she cooked.|only a plain contrast|between two facts|Karachi is hot, whereas Quetta is cold.|Use whereas when while could look like time.|Karachi is hot, ___ Quetta is cold.
so|such|scaleTip|scaleTip|+ adjective or adverb|so hot, so fast|It was so hot that we left.|+ a noun|such a hot day|It was such a hot day.|So + adjective. Such + noun.|It was ___ a hot day that we stayed in.
as|like|exact|likeSim|+ a clause: in the way that|do as I say|He did as he was told.|+ a noun: similar to|like a doctor|She sings like a bird.|As before a clause. Like before a noun.|Do ___ I told you.
than|then|scaleTip|timeline|compares two things|taller than me|He is taller than I am.|time: next, at that time|first wash, then eat|First wash the rice. Then boil it.|Than compares. Then is time.|She is taller ___ her sister.
if|whether|keyLock|qToA|a condition|only when it is true|If it rains, stay home.|a yes or no question inside|I do not know whether|I asked whether he came.|If is a condition. Whether is a question.|I do not know ___ he will come.
unless|if ... not|keyLock|keyLock|means if not, said once|never add not|Unless you study, you fail.|the same meaning, with not|if you do not study|If you do not study, you fail.|Same meaning. Never use not after unless.|___ you study, you will fail.
in case|if|umbrella|keyLock|be ready beforehand|before it happens|Take an umbrella in case it rains.|act only afterwards|when it happens|If it rains, take an umbrella.|In case is for preparing. If is for acting then.|Take a sweater ___ it gets cold.
hardly|no sooner|clock|clock|goes with when|hardly ... when|Hardly had he left when it rained.|goes with than|no sooner ... than|No sooner had he left than it rained.|Hardly takes when. No sooner takes than.|No sooner had he left ___ it rained.
either|neither|fork|neitherTwo|one of two, positive|either ... or|Either walk or take a bus.|not one, not the other|neither ... nor|Neither he nor I knew.|Either goes with or. Neither goes with nor.|He can ___ walk or ride.
besides|beside|addMore|nearSchool|also, in addition|a light extra point|It is late. Besides, I am tired.|next to|a place|He sat beside me.|Besides adds. Beside means next to.|It is late. ___, I am tired.
instead|instead of|swap|swap|stands alone: an adverb|he did not go; instead|He stayed. Instead, he read.|+ a noun: a preposition|instead of tea|He drank coffee instead of tea.|Instead alone. Instead of + noun.|He drank coffee ___ tea.
however|but|contrast|contrast|links two sentences|comma after however|It is cheap. However, it is bad.|joins two parts of a sentence|no semicolon|It is cheap, but bad.|However needs a full stop or semicolon.|It is cheap; ___, it is bad.
therefore|so|causeEffect|thenResult|linking adverb: formal|semicolon or full stop before|He was late; therefore, he missed it.|a conjunction: joins with a comma|, so|He was late, so he missed it.|Therefore is formal. So joins with a comma.|He was late; ___, he missed the bus.
moreover|also|stackAdd|addMore|adds a stronger point|a formal linker|It is cheap. Moreover, it is simple.|adds another point|usually before the verb|He also writes poetry.|Moreover is stronger and starts a sentence.|It is cheap. ___, it is simple.
though|although|umbrellaRain|umbrellaRain|may end a sentence|It is hard. I like it, though.|She is young, though wise.|cannot end a sentence|opens a clause|Although she is young, she is wise.|Only though can end a sentence.|I enjoyed the film. It was too long, ___.
even if|even though|umbrella|umbrellaRain|a maybe: it may not happen|I will go even if it rains.|I will go even if it rains.|a fact: it is true|surprising|He went even though he was ill.|Even if is possible. Even though is true.|He went to work ___ he was ill.
until|by the time|notUntil|onTimeDot|up to a moment, going on|Wait until I return.|Wait until I return.|not later than a moment|a deadline|By the time we arrived, it had ended.|Until continues. By the time is a deadline.|___ we arrived, the train had left.
since|for|sincePoint|span|a point in time|since Monday, since 2015|I have lived here since 2015.|a length of time|for three days|I have lived here for ten years.|Since + a point. For + a length of time.|He has lived here ___ ten years.
when|while|clock|span|one moment|when I arrived|I was reading when you called.|a stretch of time|while she cooked|He read while she cooked.|When is a moment. While is a stretch.|I was reading ___ you called.
as soon as|once|arriveDoor|afterDot|the very moment, no delay|as soon as you arrive|Call me as soon as you arrive.|after it is done|once it is finished|Once the water boils, add rice.|As soon as stresses no delay. Once stresses it is done.|Call me ___ you arrive.
""".strip().split("\n")

def _pair_lessons():
    ps = [l.split("|") for l in PAIRS]
    out = []
    for ci in range(0, len(ps), 6):
        ch = ps[ci:ci + 6]; n = ci // 6 + 1
        boards = [dict(kind="intro", title=f"Confusing pairs {n}", pic="versus", lines=["Two words that look alike but do different jobs.", "Learn the test for each one.", "Then choose from the sentence."])]
        mk, pr = [], []
        for a, b, pa, pb, a1, a2, a3, b1, b2, b3, rule, q in ch:
            boards.append(dict(kind="columns", title=f"{a} or {b}?", cols=[(a, pa, a1, a2, a3), (b, pb, b1, b2, b3)], lines=[rule]))
            pr.append((q.replace("___", "______"), [(a, True, f"{a.upper()}: {a1}. {rule}"), (b, False, f"{b.upper()} does not fit here: {b1}.")]))
        for a, b, *rest in ch: pass
        out.append(lesson(f"cp-{n}", "Confusing pairs: " + ", ".join(f"{p[0]}/{p[1]}" for p in ch)[:58], "cp-" + str(n), "Confusing pairs", "Two words that look alike do different jobs. Learn the test that tells them apart.",
            "Pairs of conjunctions and linkers that students mix up, with a test for each.", ["Say what each word does.", "Use the test.", "Choose from the sentence."], boards, [], pr[:6],
            [ch[0][10], ch[1][10], ch[2][10]], level="Atlas"))
    return out

SENSE_LESSONS = _sense_lessons()
PAIR_LESSONS = _pair_lessons()
