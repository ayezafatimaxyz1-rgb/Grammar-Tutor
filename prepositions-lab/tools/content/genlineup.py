import json, re, sys
exec(open(sys.argv[1]).read())
T = json.dumps
ROOT = "/home/user/Grammar-Tutor/prepositions-lab/content/lessons/"

def match(s, i):
    o = s[i]; c_ = {"{": "}", "[": "]", "(": ")"}[o]; d = 0; q = None; j = i
    while j < len(s):
        c = s[j]
        if q:
            if c == "\\": j += 2; continue
            if c == q: q = None
        elif c in "\"'`": q = c
        elif c == o: d += 1
        elif c == c_:
            d -= 1
            if d == 0: return j + 1
        j += 1
    raise ValueError

def step_js(lid, sentence, opts, rules, ind):
    ok = [i for i, o in enumerate(opts) if o[2] is True][0]
    diff = [i for i, o in enumerate(opts) if o[2] == "diff"]
    wrong = [i for i, o in enumerate(opts) if o[2] is False]
    clean = lambda r: " ".join(x.strip() for x in r.split("|"))
    gap = sentence.replace("____", "…")
    others = [i for i in range(len(opts)) if i != ok]
    why = []
    for i in diff:
        why.append(f"**{opts[i][1]}** is correct English, but it would mean {clean(opts[i][3])}. That is not what this sentence says.")
    for i in wrong:
        why.append(f"**{opts[i][1]}**: {clean(opts[i][3])}.")
    says = [
        (f"Fill the gap: {gap} What does the sentence want to say? The answer is **{opts[ok][1]}**: {clean(opts[ok][3])}.", f"why{ok + 1}"),
        ("Why not the others? " + " ".join(why), f"why{others[0] + 1}"),
        ("The rule: " + "; ".join(rules) + ".", "why-r1"),
    ]
    alt = f"The sentence {sentence.replace('____', 'with a gap')}, then the candidates with pictures: " + "; ".join(
        f"{o[1]} ({'right' if o[2] is True else 'correct English but a different meaning' if o[2] == 'diff' else 'wrong'}: {clean(o[3])})" for o in opts) + ". Rule: " + "; ".join(rules) + "."
    opt_js = ", ".join(f"[{o[0]}, {T(o[1])}, {'true' if o[2] is True else T('diff') if o[2] == 'diff' else 'false'}, {T(o[3])}]" for o in opts)
    i2 = ind + "  "
    lines = [ind + "{",
        i2 + 'id: "why-not",',
        i2 + 'title: "Why this one and not the others?",',
        i2 + "alt: " + T(alt) + ",",
        i2 + "say: ["] + [i2 + "  { text: " + T(t) + ', cue: "' + c + '" },' for t, c in says] + [
        i2 + "],",
        i2 + "actions: [",
        i2 + '  PLAB.kit.clear("clear-why"),',
        i2 + "  ...PLAB.kit.lineup(\"why\", " + T(sentence) + ", [" + opt_js + "], " + T(rules) + "),",
        i2 + "],",
        ind + "},"]
    return "\n".join(lines) + "\n"

done = 0
for lid, (sentence, opts, rules) in L.items():
    p = ROOT + lid + ".js"; s = open(p).read()
    m = re.search(r'\n( *)\{\n *id: "why-not",', s)
    if m:
        ind = m.group(1); b = m.start() + 1 + len(ind); e = match(s, b)
        if s[e] == ",": e += 1
        if s[e] == "\n": e += 1
        s = s[:m.start() + 1] + step_js(lid, sentence, opts, rules, ind) + s[e:]
    else:
        k = -1
        for ind in ("      ", "    "):
            k = s.find("\n" + ind + '{\n' + ind + '  id: "summary",')
            if k < 0:
                mm = re.search(r"\n" + ind + r'\{\n' + ind + r'  id: "[^"]+",\n' + ind + r'  title: "[^"]*",\n' + ind + r'  alt: "(?:[^"\\]|\\.)*",\n' + ind + r'  say: \[[^\]]*\],\n' + ind + r'  actions: \[\],\n' + ind + r'  check:', s)
                k = mm.start() if mm else -1
            if k >= 0: break
        if k < 0: print("NO INSERT", lid); continue
        s = s[:k + 1] + step_js(lid, sentence, opts, rules, ind) + s[k + 1:]
    open(p, "w").write(s); done += 1
print(done, "lineups")
