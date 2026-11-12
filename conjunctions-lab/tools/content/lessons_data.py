# Conjunctions Lab lessons. Run python3 tools/content/lessons.py after editing. See lessons.py for the board kinds.
# Every example sentence is our own. Explanations are in simple English with Pakistan-flavoured examples.

def lesson(id, title, tag, tag_label, tag_explain, about, objectives, boards, mistakes, practice, summary, level="Basic"):
    return dict(id=id, title=title, tag=tag, tag_label=tag_label, tag_explain=tag_explain, about=about, objectives=objectives,
                boards=boards, mistakes=mistakes, practice=practice, summary=summary, level=level)

def chk(prompt, *options, say=None):
    d = dict(kind="check", prompt=prompt, options=list(options))
    if say: d["say"] = say
    return d

GAPS = ["Built so far: the foundation, the seven coordinating conjunctions, subordinating conjunctions by meaning, pairs, linking adverbs and punctuation.",
        "The atlas, the mistakes catalogue and the practice sets grow with every lesson: new conjunctions and new questions are added over time."]

# ================================================================ START
P0 = [
 dict(id="u-start", title="Start here", lessons=[
  lesson("cj-what", "What is a conjunction? The three families", "cj-what",
    "What a conjunction does", "A conjunction joins words, phrases or clauses. Choosing the wrong one changes the meaning, so learn what each one says.",
    "What a conjunction does, and the three families: coordinating, subordinating and the pairs.",
    ["Say what a conjunction does.", "Tell coordinating from subordinating conjunctions.", "Remember the seven coordinating ones: FANBOYS."],
    [
     dict(kind="intro", title="A conjunction is a bridge", pic="equalTwo",
          lines=["It joins two parts so they make one sentence.", "It also says how the parts are related.", "So the wrong bridge gives the wrong meaning."]),
     dict(kind="rows", title="Three kinds of bridge", rows=[
          ("equalTwo", "Coordinating: joins two equal parts", "equal", "and, but, or, so: neither part depends on the other"),
          ("depend", "Subordinating: one part depends on the other", "depends", "because, although, if, when: the small part hangs on the big part"),
          ("bothTwo", "Pairs: work in two parts", "two parts", "both ... and, either ... or, not only ... but also")]),
     dict(kind="word", word="FANBOYS", name="the seven coordinating conjunctions", pic="equalTwo", caption="For And Nor But Or Yet So",
          explain=["Each letter is one conjunction.", "They join two equal parts.", "A comma goes before them when two full sentences are joined."],
          examples=["He was tired, [but] he kept working.", "It rained, [so] we stayed home.", "Tea [or] coffee?"], note="FANBOYS: For, And, Nor, But, Or, Yet, So."),
     chk("Which one is a coordinating conjunction?", ("but", True, "Right. BUT joins two equal parts."), ("because", False, "BECAUSE is subordinating: it makes a part depend on another."), ("although", False, "ALTHOUGH is subordinating too.")),
     dict(kind="rows", title="What do they say?", rows=[
          ("plus", "AND adds", "adds", "rice and lentils"),
          ("contrast", "BUT shows a contrast", "contrast", "poor but honest"),
          ("causeEffect", "BECAUSE gives the reason", "reason", "late because the road was closed")]),
     chk("Which one gives the reason?", ("because", True, "Right. BECAUSE tells why."), ("although", False, "ALTHOUGH shows a contrast, not a reason."), ("unless", False, "UNLESS shows a condition.")),
    ],
    [("He is poor, because honest.", "He is poor but honest.", "The two ideas go against each other, so use BUT. | BECAUSE gives a reason, which is not the idea here.")],
    [("A word that joins two equal sentences is:", [("a coordinating conjunction", True, "Right. Like and, but, or."), ("a subordinating conjunction", False, "That one joins an unequal part to a main part."), ("a preposition", False, "A preposition takes a noun, not a clause.")]),
     ("Which is NOT in FANBOYS?", [("although", True, "Right. ALTHOUGH is subordinating."), ("nor", False, "NOR is one of FANBOYS."), ("yet", False, "YET is one of FANBOYS."),])],
    ["A conjunction joins and shows the relation between the parts.", "Coordinating (FANBOYS) joins two equal parts. Subordinating makes one part depend on the other.", "Pairs like both ... and, either ... or work in two parts."]),
 ]),
]

# ================================================================ PHASE 1: COORDINATING
P1 = [
 dict(id="u-fanboys", title="The seven: FANBOYS", lessons=[
  lesson("cj-and-but", "AND and BUT", "cj-and-but",
    "And and but", "AND adds an idea that goes the same way. BUT adds an idea that goes against the first. Do not swap them.",
    "AND adds, BUT shows contrast: when to use each, the comma, and not piling up conjunctions.",
    ["Use AND for ideas that go the same way.", "Use BUT for ideas that go against each other.", "Know when a comma is needed."],
    [
     dict(kind="columns", title="Same way or against?", cols=[
          ("and", "plus", "same direction", "adds one to the other", "He is clever and kind."),
          ("but", "contrast", "against what you expect", "second idea goes against the first", "He is clever but lazy.")],
          lines=["Ask: do both ideas point the same way?", "If not, use but."]),
     dict(kind="word", word="BUT", name="contrast", pic="contrast", caption="two ideas pull apart",
          explain=["The second idea is unexpected after the first.", "He is poor, and yet honest: use BUT.", "BUT can join words or sentences."],
          examples=["She is small [but] strong.", "The test was hard, [but] she passed.", "He tried, [but] he failed."], note="Do not write: although ... but. One contrast word is enough."),
     chk("The village is small ___ beautiful.", ("and", True, "Right. Small and beautiful point the same way: AND."), ("but", False, "BUT would suggest small is bad, which is not meant."), ("so", False, "SO shows result, not an added quality.")),
     dict(kind="rows", title="The comma", rows=[
          ("equalTwo", "Two full sentences: comma before and or but", "comma", "He was tired, but he kept working."),
          ("equalTwo", "One subject, two verbs: no comma", "no comma", "He sat down and read the paper."),
          ("longChain", "Do not chain many ands", "chain", "He came and he sat and he ate and he left.")]),
     chk("Which is better written?", ("He came, sat down and ate.", True, "Right. One subject, a list of verbs: commas then AND before the last."), ("He came and he sat and he ate.", False, "A long chain of ANDs sounds childish."), ("He came, and, sat, and, ate.", False, "Commas around every AND are wrong.")),
    ],
    [("He is rich, but he is generous too.", "He is rich and generous too.", "Rich and generous go the same way: AND. | BUT would suggest being rich and generous clash."),
     ("Although he is poor, but he is honest.", "Although he is poor, he is honest.", "ALTHOUGH and BUT both show contrast. | Use only one of them.")],
    [("He worked hard ___ he failed.", [("but", True, "Right. Failing after hard work is unexpected: BUT."), ("and", False, "AND does not show the surprise."), ("so", False, "SO would mean failing was the result of working hard.")]),
     ("She sings ___ dances well.", [("and", True, "Right. Two skills that go the same way: AND."), ("but", False, "There is no contrast."), ("or", False, "OR gives a choice, not an addition.")])],
    ["AND adds an idea that goes the same way. BUT shows a contrast.", "Comma before and or but only when two full sentences are joined.", "Never use although and but together."]),
  lesson("cj-or-nor", "OR and NOR", "cj-or-nor",
    "Or and nor", "OR gives a choice or a warning. NOR adds a second negative, and then the helper verb comes first.",
    "OR as a choice or warning, NOR after a negative, and the word order after NOR.",
    ["Use OR for a choice and for a warning.", "Use NOR after a negative.", "Put the helper verb before the subject after NOR."],
    [
     dict(kind="rows", title="Two jobs of OR", rows=[
          ("fork", "A choice", "choice", "Will you have tea or coffee?"),
          ("shield", "A warning: otherwise", "warning", "Hurry, or you will miss the bus."),
          ("preferTea", "Choosing the second: or else", "or else", "Study, or you will fail.")]),
     dict(kind="word", word="NOR", name="and not", pic="neitherTwo", caption="a second negative",
          explain=["NOR follows a negative idea.", "The helper verb comes before the subject.", "He did not call, nor did he write."],
          examples=["He did not call, [nor] did he write.", "She neither smiled [nor] spoke.", "I cannot swim, [nor] can my brother."], note="After nor: nor did he, nor can she, nor will they."),
     chk("He did not apologise, ___ did he explain.", ("nor", True, "Right. A second negative, with the helper verb first: NOR DID HE."), ("or", False, "OR would not carry the negative."), ("but", False, "BUT shows contrast, not a second negative.")),
     dict(kind="text", title="Neither ... nor is built differently", lines=[("✗ He neither came nor did not call.", "trouble", 28), ("✓ He neither came nor called.", "accent2", 28), ("NEITHER already holds the negative: add no other not.", "accent", 24)]),
    ],
    [("He neither came nor did not call.", "He neither came nor called.", "NEITHER already has the negative. | Do not add a second not."),
     ("He did not write, nor he called.", "He did not write, nor did he call.", "After NOR the helper verb comes before the subject. | Say: nor did he.")],
    [("She is not rich, ___ is she proud.", [("nor", True, "Right. NOR, then the helper verb IS before SHE."), ("or", False, "OR does not carry the negative."), ("but", False, "BUT does not fit this meaning.")]),
     ("Work hard, ___ you will fail.", [("or", True, "Right. A warning: OR means otherwise."), ("nor", False, "NOR needs a negative before it."), ("and", False, "AND would promise success.")])],
    ["OR gives a choice or a warning (or else).", "NOR adds a second negative; the helper verb comes before the subject.", "Neither ... nor already hold the negative: add no other not."]),
  lesson("cj-for-yet-so", "FOR, YET and SO", "cj-for-yet-so",
    "For, yet and so", "SO gives the result. FOR gives the reason, after the main idea. YET is a strong BUT. Do not mix reason and result.",
    "FOR (reason), YET (surprising contrast) and SO (result), and why because and so never go together.",
    ["Use SO for a result.", "Use FOR as a formal reason, after the idea.", "Use YET for a surprising contrast."],
    [
     dict(kind="rows", title="Three small words", rows=[
          ("thenResult", "SO: the result of what came first", "so", "It rained, so we stayed home."),
          ("reasonFor", "FOR: the reason, formal, after the idea", "for", "He rested, for he was tired."),
          ("contrast", "YET: a surprising contrast", "yet", "It was hard, yet she passed.")]),
     dict(kind="columns", title="Reason or result?", cols=[
          ("because", "reasonFor", "gives the REASON", "comes before the reason", "He stayed because he was ill."),
          ("so", "thenResult", "gives the RESULT", "comes before the result", "He was ill, so he stayed.")],
          lines=["The same facts, told in two directions.", "Never use both in one sentence."]),
     chk("It was raining, ___ we stayed indoors.", ("so", True, "Right. Staying indoors is the result: SO."), ("because", False, "BECAUSE would give the reason, and the reason is already stated."), ("yet", False, "YET shows surprise, but there is none here.")),
     dict(kind="text", title="A very common mistake", lines=[("✗ Because it rained, so we stayed home.", "trouble", 27), ("✓ Because it rained, we stayed home.", "accent2", 27), ("✓ It rained, so we stayed home.", "accent2", 27), ("BECAUSE and SO each do the job alone.", "accent", 24)]),
    ],
    [("Because it rained, so we stayed at home.", "It rained, so we stayed at home.", "BECAUSE and SO both join the same two ideas. | Choose one of them."),
     ("He is clever, so he is lazy.", "He is clever, yet he is lazy.", "SO shows result, but lazy is a surprise. | Use YET or BUT.")],
    [("The road was closed, ___ the buses stopped.", [("so", True, "Right. The buses stopping is the result: SO."), ("yet", False, "YET would show surprise."), ("for", False, "FOR gives a reason, but the reason here comes first.")]),
     ("He was very tired, ___ he kept working.", [("yet", True, "Right. Working while tired is surprising: YET."), ("so", False, "SO would mean being tired caused the working."), ("or", False, "OR gives a choice.")])],
    ["SO gives the result, FOR gives the reason, YET gives a surprising contrast.", "Because and so never go in the same sentence.", "FOR as a conjunction is formal, follows a comma and cannot begin a sentence."]),
 ]),
]

# ================================================================ PHASE 2: SUBORDINATING
P2 = [
 dict(id="u-sub", title="Subordinating conjunctions by meaning", lessons=[
  lesson("cj-time", "Time: when, while, as, before, after, until, since", "cj-time",
    "Time conjunctions", "Time conjunctions say when one thing happens compared with another. After them use the present tense for the future.",
    "When, while, as, before, after, until, since, once and as soon as, with the tense rule.",
    ["Choose the time word that shows the order.", "Use the present tense after time words for the future.", "Use since with the present perfect."],
    [
     dict(kind="rows", title="Which comes first?", rows=[
          ("priorDot", "BEFORE: the main action is earlier", "before", "Wash your hands before you eat."),
          ("afterDot", "AFTER: the main action is later", "after", "We went out after the rain stopped."),
          ("notUntil", "UNTIL: up to that moment", "until", "Wait here until I return.")]),
     dict(kind="word", word="WHILE", name="at the same time", pic="span", caption="two things at once",
          explain=["Two actions go on together.", "He read while she cooked.", "Use AS for changes: as the sun rose."],
          examples=["He read [while] she cooked.", "[As] the sun rose, the fog lifted.", "[As soon as] you arrive, call me."], note="As soon as: the very moment, with no delay."),
     chk("Call me ___ you arrive.", ("as soon as", True, "Right. The very moment you arrive: AS SOON AS."), ("although", False, "ALTHOUGH shows contrast."), ("unless", False, "UNLESS shows a condition.")),
     dict(kind="text", title="The tense rule", lines=[("✗ I will call you when I will arrive.", "trouble", 27), ("✓ I will call you when I arrive.", "accent2", 27), ("After when, before, after, until, as soon as: present tense.", "accent", 24), ("They talk about the future, but the verb stays in the present.", "muted", 22)]),
     dict(kind="rows", title="Since", rows=[
          ("sincePoint", "SINCE: from a point in the past until now", "since", "I have lived here since 2015."),
          ("sincePoint", "Use the present perfect: have lived", "have lived", "not: I live here since 2015"),
          ("reasonFor", "SINCE can also give a reason", "reason", "Since you are tired, rest.")]),
     chk("Which is correct?", ("I have waited since morning.", True, "Right. SINCE with the present perfect."), ("I am waiting since morning.", False, "SINCE for time needs the perfect tense."), ("I waited since morning.", False, "The waiting is not finished, so use the perfect.")),
    ],
    [("I will call you when I will arrive.", "I will call you when I arrive.", "After WHEN use the present tense for the future. | Not: when I will arrive."),
     ("I am waiting since morning.", "I have been waiting since morning.", "SINCE needs the present perfect.")],
    [("Wait here ___ I return.", [("until", True, "Right. Up to the moment you return: UNTIL."), ("unless", False, "UNLESS means if not."), ("because", False, "BECAUSE gives a reason.")]),
     ("He has lived here ___ he was a child.", [("since", True, "Right. A starting point in the past: SINCE."), ("for", False, "FOR is followed by a length of time, not a point."), ("until", False, "UNTIL does not match has lived.")])],
    ["Before, after, until, while, as soon as show the order or the time of two actions.", "After time words use the present tense for the future.", "Since from a past point needs the present perfect."]),
  lesson("cj-reason", "Reason: because, since, as", "cj-reason",
    "Reason conjunctions", "Because is the clearest reason word. Since and as give a reason the listener already knows. Because of takes a noun.",
    "Because, since, as and now that, and the difference between because and because of.",
    ["Use because for the main reason.", "Know that since and as can be time words too.", "Use because of before a noun."],
    [
     dict(kind="rows", title="Three reason words", rows=[
          ("reasonFor", "BECAUSE: the clear, main reason", "because", "He stayed home because he was ill."),
          ("reasonFor", "SINCE and AS: the reason is already known", "since", "Since you are tired, rest."),
          ("arriveDoor", "NOW THAT: a new situation is the reason", "now that", "Now that exams are over, relax.")]),
     dict(kind="columns", title="Conjunction or preposition?", cols=[
          ("because", "reasonFor", "+ a clause", "subject and verb follow", "because he was late"),
          ("because of", "reasonFor", "+ a noun", "no verb follows", "because of the rain")],
          lines=["Clause after because.", "Noun after because of."]),
     chk("We stayed home ___ the rain.", ("because of", True, "Right. A noun follows (the rain): BECAUSE OF."), ("because", False, "BECAUSE needs a clause: because it rained."), ("although", False, "ALTHOUGH shows contrast.")),
     dict(kind="text", title="Do not say", lines=[("✗ The reason is because he was late.", "trouble", 27), ("✓ The reason is that he was late.", "accent2", 27), ("✗ Because of he was late, we left.", "trouble", 27), ("✓ Because he was late, we left.", "accent2", 27)]),
    ],
    [("The reason is because he was late.", "The reason is that he was late.", "The reason is and because say the same thing twice. | Use that."),
     ("Because of he was late, we left.", "Because he was late, we left.", "A clause follows, so use BECAUSE, not BECAUSE OF.")],
    [("The match was cancelled ___ the heavy rain.", [("because of", True, "Right. A noun follows."), ("because", False, "BECAUSE would need a verb after it."), ("so", False, "SO gives a result and cannot come here.")]),
     ("The match was cancelled ___ it rained heavily.", [("because", True, "Right. A clause follows."), ("because of", False, "BECAUSE OF needs a noun."), ("although", False, "ALTHOUGH shows contrast.")])],
    ["Because gives the reason; since and as give a known reason.", "Because + clause. Because of + noun.", "Say the reason is that, not the reason is because."]),
  lesson("cj-contrast", "Contrast: although, though, even though, whereas, while", "cj-contrast",
    "Contrast conjunctions", "Although and its friends show that two ideas go against each other. Use only one contrast word in a sentence.",
    "Although, though, even though, whereas, while and even if, and why although and but never go together.",
    ["Use although for contrast.", "Use whereas to set two facts side by side.", "Never double the contrast."],
    [
     dict(kind="word", word="ALTHOUGH", name="in spite of the fact that", pic="umbrellaRain", caption="the umbrella does not stop the rain",
          explain=["Two ideas pull against each other.", "The main idea still holds.", "Although he is rich, he lives simply."],
          examples=["[Although] he was tired, he kept working.", "He kept working [although] he was tired.", "[Though] she is young, she is wise."], note="Though means the same. Even though is stronger."),
     dict(kind="columns", title="Which contrast word?", cols=[
          ("although", "umbrellaRain", "a surprise", "main idea still true", "Although it rained, we went."),
          ("whereas", "contrast", "two plain facts", "side by side", "Karachi is hot, whereas Quetta is cold."),
          ("even if", "umbrella", "a maybe", "it may or may not happen", "I will go even if it rains.")]),
     chk("Lahore is crowded, ___ the village is quiet.", ("whereas", True, "Right. Two plain facts set side by side: WHEREAS."), ("although", False, "ALTHOUGH shows surprise, not a plain difference."), ("because", False, "BECAUSE gives a reason.")),
     dict(kind="text", title="One contrast word only", lines=[("✗ Although he is poor, but he is honest.", "trouble", 27), ("✓ Although he is poor, he is honest.", "accent2", 27), ("✓ He is poor, but he is honest.", "accent2", 27), ("Although and but do the same job. Choose one.", "accent", 24)]),
     chk("Which is correct?", ("Though she was ill, she came.", True, "Right. One contrast word."), ("Though she was ill, but she came.", False, "Though and but together are wrong."), ("Though she was ill, yet she came.", False, "Though and yet together are not good style.")),
    ],
    [("Although he is rich, but he is unhappy.", "Although he is rich, he is unhappy.", "ALTHOUGH and BUT both show contrast. | Use only one."),
     ("Despite he was ill, he went to work.", "Although he was ill, he went to work.", "DESPITE is a preposition and takes a noun. | For a clause use although.")],
    [("___ he is poor, he is generous.", [("Although", True, "Right. A contrast: ALTHOUGH."), ("Because", False, "BECAUSE gives a reason."), ("Unless", False, "UNLESS shows a condition.")]),
     ("I will go ___ it rains.", [("even if", True, "Right. It may or may not rain: EVEN IF."), ("even though", False, "EVEN THOUGH is for a fact."), ("because", False, "BECAUSE gives a reason.")])],
    ["Although, though and even though show a contrast; even though is stronger.", "Whereas and while set two facts side by side.", "Never use although with but, or even though with yet."]),
  lesson("cj-condition", "Condition: if, unless, provided that, in case", "cj-condition",
    "Condition conjunctions", "If sets a condition. Unless means if not. In case means be ready. After if and unless use the present tense for the future.",
    "If, unless, provided that, as long as and in case, and the tense rule.",
    ["Use if and unless correctly.", "Tell in case from if.", "Use the present tense in the condition."],
    [
     dict(kind="rows", title="Four condition words", rows=[
          ("keyLock", "IF: it is true only when the condition is true", "if", "If it rains, we will stay."),
          ("keyLock", "UNLESS: if not", "unless", "Unless you hurry, you will be late."),
          ("keyLock", "PROVIDED THAT, AS LONG AS: only if", "provided that", "Go provided that you return by nine.")]),
     dict(kind="columns", title="In case or if?", cols=[
          ("in case", "umbrella", "be ready before", "the thing may happen", "Take an umbrella in case it rains."),
          ("if", "keyLock", "do it only then", "when it happens", "If it rains, take an umbrella.")],
          lines=["In case: you prepare early.", "If: you act after it happens."]),
     chk("Take a sweater ___ it gets cold.", ("in case", True, "Right. You prepare before it happens: IN CASE."), ("unless", False, "UNLESS would reverse the meaning."), ("although", False, "ALTHOUGH shows contrast.")),
     dict(kind="text", title="Tense in the condition", lines=[("✗ If it will rain, we will stay at home.", "trouble", 27), ("✓ If it rains, we will stay at home.", "accent2", 27), ("✗ Unless you do not study, you will fail.", "trouble", 27), ("✓ Unless you study, you will fail.", "accent2", 27)]),
    ],
    [("If it will rain, we will stay at home.", "If it rains, we will stay at home.", "The if part of a real future takes the present tense."),
     ("Unless you do not hurry, you will be late.", "Unless you hurry, you will be late.", "UNLESS already means if not. | Do not add not.")],
    [("___ you study, you will fail.", [("Unless", True, "Right. Unless means if not: unless you study = if you do not study."), ("If", False, "IF would mean you fail by studying."), ("Because", False, "BECAUSE gives a reason.")]),
     ("You may go ___ you finish your work first.", [("provided that", True, "Right. A strict condition: PROVIDED THAT."), ("although", False, "ALTHOUGH shows contrast."), ("until", False, "UNTIL shows a time.")])],
    ["If sets a condition; unless means if not; provided that and as long as mean only if.", "In case is about being ready early.", "Use the present tense in the condition for the future. Never add not after unless."]),
  lesson("cj-purpose", "Purpose and result: so that, so ... that, such ... that", "cj-purpose",
    "Purpose and result", "So that gives the purpose. So ... that and such ... that give a result. Do not mix them.",
    "So that, in order that, lest, so ... that and such ... that.",
    ["Use so that for a purpose.", "Use so with an adjective and such with a noun.", "Match the tense after so that."],
    [
     dict(kind="columns", title="Purpose or result?", cols=[
          ("so that", "target", "PURPOSE", "what he wants to happen", "He studies so that he can pass."),
          ("so ... that", "causeEffect", "RESULT", "so strong that something followed", "It was so hot that I fainted.")]),
     dict(kind="rows", title="So or such?", rows=[
          ("scaleTip", "SO + adjective or adverb", "so", "The tea was so hot."),
          ("scaleTip", "SUCH + noun", "such", "It was such hot tea."),
          ("causeEffect", "Then add THAT and the result", "that", "so hot that I could not drink it.")]),
     chk("It was ___ a hot day that we stayed in.", ("such", True, "Right. SUCH goes with a noun: a hot day."), ("so", False, "SO goes with an adjective alone: so hot a day is formal and rare."), ("very", False, "VERY does not lead to a result with that.")),
     dict(kind="text", title="Tense after so that", lines=[("He studies hard so that he can pass.", "accent2", 27), ("He studied hard so that he could pass.", "accent2", 27), ("✗ He left early so that he can catch the train.", "trouble", 27), ("Main verb in the past: the purpose clause goes in the past too.", "accent", 23)]),
    ],
    [("It was so a hot day that we stayed in.", "It was such a hot day that we stayed in.", "SUCH goes with a noun. | SO goes with an adjective alone."),
     ("He left early so that he can catch the train.", "He left early so that he could catch the train.", "The main verb is in the past. | So the purpose clause is too.")],
    [("The tea was ___ hot that I could not drink it.", [("so", True, "Right. SO with an adjective alone."), ("such", False, "SUCH needs a noun."), ("very", False, "VERY leads to no result.")]),
     ("She worked hard ___ she could win a scholarship.", [("so that", True, "Right. Winning is her purpose: SO THAT."), ("although", False, "ALTHOUGH shows contrast."), ("whereas", False, "WHEREAS compares two facts.")])],
    ["So that gives the purpose; use can or may for now and could or would for past.", "So + adjective, such + noun, then that for the result.", "Lest means for fear that and already holds a negative."]),
  lesson("cj-comparison", "Comparison: than, as ... as, as if", "cj-comparison",
    "Comparison conjunctions", "Than follows a comparative. As ... as shows equality. As if shows how something seems.",
    "Than, as ... as, as if, as though and the more ... the more.",
    ["Use than after a comparative.", "Use as ... as for equality.", "Use as if with were for unreal ideas."],
    [
     dict(kind="rows", title="Three comparisons", rows=[
          ("scaleTip", "THAN: after a comparative", "than", "Lahore is bigger than Multan."),
          ("compareBars", "AS ... AS: equal", "as ... as", "She is as brave as her father."),
          ("likeSim", "AS IF: how it seems", "as if", "He talks as if he knew everything.")]),
     chk("He is taller ___ his brother.", ("than", True, "Right. THAN after a comparative: taller than."), ("as", False, "AS would need a first as: as tall as."), ("then", False, "THEN is about time, not comparison.")),
     dict(kind="text", title="Common slips", lines=[("✗ She is as tall than her sister.", "trouble", 27), ("✓ She is as tall as her sister.", "accent2", 27), ("✗ Do like I say.", "trouble", 27), ("✓ Do as I say. (AS before a clause, LIKE before a noun)", "accent2", 25)]),
    ],
    [("She is as tall than her sister.", "She is as tall as her sister.", "AS ... AS needs two as. | THAN is only for a comparative."),
     ("Do like I told you.", "Do as I told you.", "Before a clause use AS. | LIKE is a preposition: like a doctor.")],
    [("He speaks ___ he were the owner.", [("as if", True, "Right. An unreal idea: AS IF, with were."), ("so that", False, "SO THAT gives a purpose."), ("unless", False, "UNLESS is a condition.")]),
     ("She is as clever ___ her mother.", [("as", True, "Right. AS ... AS."), ("than", False, "THAN needs a comparative."), ("like", False, "LIKE does not work with as clever.")])],
    ["Than follows a comparative; as ... as shows equality.", "As if (or as though) shows how something seems; use were for unreal ideas.", "Use as before a clause and like before a noun."]),
 ]),
]

# ================================================================ PHASE 3: PAIRS
P3 = [
 dict(id="u-pairs", title="Pairs and fixed partners", lessons=[
  lesson("cj-pairs", "Pairs: both ... and, either ... or, neither ... nor, not only ... but also", "cj-pairs",
    "Correlative pairs", "A pair has two parts. Once you use the first, the second must follow. Both parts must be of the same grammar.",
    "Both ... and, either ... or, neither ... nor, not only ... but also, whether ... or and rather ... than.",
    ["Keep both parts of a pair.", "Make both sides parallel.", "Agree the verb with the nearer subject."],
    [
     dict(kind="columns", title="Four pairs", cols=[
          ("both ... and", "bothTwo", "two things together", "the same weight", "both brave and kind"),
          ("either ... or", "fork", "one of two", "choose", "either walk or ride"),
          ("neither ... nor", "neitherTwo", "not one, not the other", "negative", "neither smiled nor spoke"),
          ("not only ... but also", "stackAdd", "one, then more", "adds with stress", "not only clever but also kind")]),
     chk("He is ___ clever but also kind.", ("not only", True, "Right. NOT ONLY goes with BUT ALSO."), ("either", False, "EITHER goes with OR."), ("neither", False, "NEITHER goes with NOR.")),
     dict(kind="text", title="Balance both sides", lines=[("✗ She is both clever and works hard.", "trouble", 27), ("✓ She is both clever and hard-working.", "accent2", 27), ("Adjective with adjective, verb with verb.", "accent", 24), ("Both sides of a pair must be the same kind of word.", "muted", 22)]),
     chk("Which is correct?", ("Neither he nor his friends are ready.", True, "Right. The verb agrees with the nearer subject: friends, so are."), ("Neither he nor his friends is ready.", False, "The nearer subject is plural: use are."), ("Neither he or his friends are ready.", False, "NEITHER goes with NOR, not OR.")),
    ],
    [("Either he comes nor I go.", "Either he comes or I go.", "EITHER goes with OR. | NOR goes with NEITHER."),
     ("Not only he is clever but also hard-working.", "Not only is he clever, but he is also hard-working.", "After NOT ONLY at the start the helper verb comes first.")],
    [("___ he nor his brother was present.", [("Neither", True, "Right. NEITHER ... NOR."), ("Either", False, "EITHER goes with OR."), ("Both", False, "BOTH goes with AND.")]),
     ("I would rather walk ___ wait for a bus.", [("than", True, "Right. RATHER ... THAN."), ("to", False, "TO does not pair with rather."), ("from", False, "FROM does not pair with rather.")])],
    ["Both ... and, either ... or, neither ... nor, not only ... but also.", "Make both sides of a pair the same grammar.", "With either, neither and not only, the verb agrees with the nearer subject."]),
  lesson("cj-nosooner", "No sooner ... than, hardly ... when", "cj-nosooner",
    "No sooner and hardly", "No sooner goes with than. Hardly and scarcely go with when. The helper verb comes before the subject.",
    "No sooner ... than, hardly ... when and scarcely ... when, with the inverted order.",
    ["Pair no sooner with than.", "Pair hardly and scarcely with when.", "Put the helper verb first."],
    [
     dict(kind="columns", title="Fast partners", cols=[
          ("No sooner ... than", "clock", "second event right after", "always THAN", "No sooner had he sat down than it rained."),
          ("Hardly ... when", "clock", "second event right after", "always WHEN", "Hardly had he sat down when it rained.")],
          lines=["Past perfect first, past simple second.", "The helper verb comes before the subject."]),
     chk("No sooner had he arrived ___ it began to rain.", ("than", True, "Right. NO SOONER goes with THAN."), ("when", False, "WHEN goes with HARDLY."), ("that", False, "THAT does not pair with no sooner.")),
     dict(kind="text", title="Check the order", lines=[("✗ Hardly he had left when it rained.", "trouble", 27), ("✓ Hardly had he left when it rained.", "accent2", 27), ("✗ No sooner had he come when it rained.", "trouble", 27), ("✓ No sooner had he come than it rained.", "accent2", 27)]),
    ],
    [("Hardly had she left than it rained.", "Hardly had she left when it rained.", "HARDLY goes with WHEN. | THAN goes with NO SOONER."),
     ("Hardly he had left when it rained.", "Hardly had he left when it rained.", "After HARDLY at the start the helper verb comes first.")],
    [("Scarcely had we started ___ the rain stopped.", [("when", True, "Right. SCARCELY goes with WHEN."), ("than", False, "THAN goes with NO SOONER."), ("so", False, "SO does not pair here.")]),
     ("No sooner had the bell rung ___ the students left.", [("than", True, "Right. NO SOONER ... THAN."), ("when", False, "WHEN goes with HARDLY."), ("that", False, "THAT does not pair here.")])],
    ["No sooner ... than. Hardly ... when. Scarcely ... when.", "The helper verb comes before the subject after the opening word.", "Use the past perfect first, then the past simple."]),
 ]),
]

# ================================================================ PHASE 4: LINKING ADVERBS AND PUNCTUATION
P4 = [
 dict(id="u-linkers", title="Linking adverbs and punctuation", lessons=[
  lesson("cj-however", "However, therefore, moreover and other linkers", "cj-however",
    "Linking adverbs", "However, therefore and moreover link two sentences, but they are not conjunctions. A comma alone cannot join sentences with them.",
    "However, therefore, moreover, nevertheless, consequently and how to punctuate them.",
    ["Use linkers for the right job.", "Punctuate them correctly.", "Avoid the comma splice."],
    [
     dict(kind="rows", title="Four jobs", rows=[
          ("addMore", "MOREOVER, FURTHERMORE: add a point", "moreover", "It is cheap. Moreover, it is simple."),
          ("contrast", "HOWEVER, NEVERTHELESS: contrast", "however", "It is good. However, it is costly."),
          ("causeEffect", "THEREFORE, CONSEQUENTLY: result", "therefore", "Prices rose; therefore, demand fell.")]),
     dict(kind="text", title="The comma splice", lines=[("✗ He was late, however he got the job.", "trouble", 27), ("✓ He was late. However, he got the job.", "accent2", 27), ("✓ He was late; however, he got the job.", "accent2", 27), ("A comma alone cannot join two sentences.", "accent", 24)]),
     chk("Which is correct?", ("The plan is cheap; however, it is risky.", True, "Right. A semicolon, then however and a comma."), ("The plan is cheap, however it is risky.", False, "A comma alone is a comma splice."), ("The plan is cheap however, it is risky.", False, "The comma goes after however.")),
    ],
    [("He was late, therefore he missed the bus.", "He was late; therefore, he missed the bus.", "THEREFORE is a linking adverb. | A comma alone cannot join two sentences."),
     ("The idea is good, however it is costly.", "The idea is good; however, it is costly.", "Use a semicolon or a full stop before HOWEVER.")],
    [("Prices rose; ___, demand fell.", [("consequently", True, "Right. The fall in demand is the result."), ("however", False, "HOWEVER shows contrast."), ("moreover", False, "MOREOVER adds a point.")]),
     ("The plan is good. ___, it is costly.", [("However", True, "Right. A contrast between sentences."), ("Therefore", False, "THEREFORE shows result."), ("Moreover", False, "MOREOVER adds a point.")])],
    ["However, therefore and moreover are linking adverbs, not conjunctions.", "Use a full stop or a semicolon before them and a comma after.", "A comma alone gives a comma splice."]),
  lesson("cj-punct", "Punctuating conjunctions: the comma rules", "cj-punct",
    "Punctuation with conjunctions", "A comma separates two full sentences joined by FANBOYS. After a subordinate clause that comes first, put a comma.",
    "When to put a comma with and, but, because, although and linkers.",
    ["Know when to put a comma.", "Never leave a clause standing alone.", "Know when to leave it out."],
    [
     dict(kind="rows", title="When a comma helps", rows=[
          ("equalTwo", "Two full sentences with FANBOYS: comma before", "comma", "He was tired, but he kept working."),
          ("depend", "A subordinate clause first: comma after", "comma", "Although he was tired, he kept working."),
          ("depend", "A subordinate clause last: usually no comma", "no comma", "He kept working although he was tired.")]),
     dict(kind="text", title="A fragment is not a sentence", lines=[("✗ He was late. Because the road was closed.", "trouble", 27), ("✓ He was late because the road was closed.", "accent2", 27), ("Because the road was closed. has no main idea.", "muted", 23), ("A because or although part cannot stand alone.", "accent", 24)]),
     chk("Which is correct?", ("He sat down and read the paper.", True, "Right. One subject and two verbs: no comma."), ("He sat down, and read the paper.", False, "No comma when one subject does two things."), ("He sat down and, read the paper.", False, "The comma is in the wrong place.")),
    ],
    [("He was late. Because the road was closed.", "He was late because the road was closed.", "Because the road was closed is a fragment. | Join it to the main idea."),
     ("Although he was tired he kept working.", "Although he was tired, he kept working.", "A subordinate clause at the start needs a comma after it.")],
    [("Which sentence needs a comma?", [("He was tired but he kept working hard for the exam.", True, "Right. Two full sentences joined by BUT: put a comma before BUT."), ("He sat down and read.", False, "One subject and two verbs: no comma."), ("He kept working although he was tired.", False, "The subordinate clause is last: usually no comma.")])],
    ["Comma before FANBOYS only when two full sentences are joined.", "Comma after a subordinate clause that comes first.", "Never leave a because or although part standing alone."]),
 ]),
]

# ================================================================ PHASE 5: EXAM LAB
P5 = [
 dict(id="u-exam", title="The exam lab", lessons=[
  lesson("cj-top-mistakes", "The seven mistakes students make most", "cj-top",
    "Top conjunction mistakes", "Most conjunction errors in exams come from a few habits. Learn them and you can spot and fix them in seconds.",
    "Seven common mistakes: double conjunctions, wrong pairs, wrong tenses and the comma splice.",
    ["Spot double conjunctions.", "Spot wrong pairs and tenses.", "Fix a comma splice."],
    [
     dict(kind="rows", title="Habit 1: two words doing one job", rows=[
          ("cross", "Although ... but", "although ... but", "Although he is rich, he is unhappy."),
          ("cross", "Because ... so", "because ... so", "Because it rained, we stayed. (or: It rained, so we stayed)"),
          ("cross", "Though ... yet", "though ... yet", "Though she is young, she is wise.")]),
     dict(kind="rows", title="Habit 2: wrong partners", rows=[
          ("cross", "Hardly ... than", "hardly ... than", "Hardly had he left when it rained."),
          ("cross", "No sooner ... when", "no sooner ... when", "No sooner had he left than it rained."),
          ("cross", "Either ... nor", "either ... nor", "Either he comes or I go.")]),
     dict(kind="rows", title="Habit 3: wrong tense after the conjunction", rows=[
          ("cross", "if it will rain", "will", "If it rains, we will stay."),
          ("cross", "when I will arrive", "will", "I will call when I arrive."),
          ("cross", "since I came, I live", "since", "Since I came, I have lived here.")]),
     chk("Which is correct?", ("Although he is poor, he is honest.", True, "Right. One contrast word."), ("Although he is poor, but he is honest.", False, "Although and but together are wrong."), ("Although he is poor, yet but honest.", False, "Too many conjunctions.")),
     chk("Which is correct?", ("He was late; therefore, he missed the bus.", True, "Right. A semicolon then therefore."), ("He was late, therefore he missed the bus.", False, "A comma splice."), ("He was late therefore, he missed the bus.", False, "The comma goes after therefore.")),
    ],
    [("Hardly had he come than it rained.", "Hardly had he come when it rained.", "Hardly goes with when."),
     ("If it will rain, we will stay.", "If it rains, we will stay.", "No will after if for a real future."),
     ("Neither he nor they is ready.", "Neither he nor they are ready.", "Agree the verb with the nearer subject, they.")],
    [("Which sentence has a double conjunction mistake?", [("Because it rained, so we stayed.", True, "Right. Because and so do the same job."), ("It rained, so we stayed.", False, "This is correct."), ("Because it rained, we stayed.", False, "This is correct.")]),
     ("Which pair is wrong?", [("No sooner ... when", True, "Right. It must be no sooner ... than."), ("Hardly ... when", False, "This pair is correct."), ("Not only ... but also", False, "This pair is correct.")])],
    ["Double conjunctions (although ... but, because ... so) are wrong: use one.", "Learn the partners: no sooner than, hardly when, either or, neither nor.", "No will after if, when, until. Use a semicolon with however and therefore."], level="Exam"),
 ]),
]

exec(open(os.path.join(here, "atlas_lessons.py")).read())

PHASES = [
 dict(id="ph-start", title="Start here: What a conjunction is", intro="The three families of conjunctions, with the seven coordinating ones to remember.", units=P0),
 dict(id="ph-atlas", title="The conjunction atlas", intro="Every conjunction and linker drawn as a board: what it says, an example, and why this word and not its neighbours. One PDF for all of it.",
      units=[dict(id="u-at-" + g[0], title=g[1], lessons=[l for l in ATLAS_LESSONS if l["id"].startswith("at-" + g[0])]) for g in GROUPS if any(l["id"].startswith("at-" + g[0]) for l in ATLAS_LESSONS)]),
 dict(id="ph-sense", title="Senses and confusing pairs", intro="One word with several jobs (as, since, while, if, so), and 24 pairs of words that students mix up, each with a test that tells them apart.",
      units=[dict(id="u-senses", title="One word, several senses", lessons=SENSE_LESSONS), dict(id="u-confused", title="Confusing pairs", lessons=PAIR_LESSONS)]),
 dict(id="ph-coord", title="Phase 1: The coordinating conjunctions", intro="AND, BUT, OR, NOR, FOR, YET and SO: what each one says and the comma rule.", units=P1),
 dict(id="ph-sub", title="Phase 2: Subordinating conjunctions by meaning", intro="Time, reason, contrast, condition, purpose and result, and comparison. The tense rules and the usual traps.", units=P2),
 dict(id="ph-pairs", title="Phase 3: Pairs and fixed partners", intro="Both ... and, either ... or, neither ... nor, not only ... but also, no sooner ... than and hardly ... when, and why each pair takes its partner.", units=P3 + [dict(id="u-pair-logic", title="Why this partner, why not the others", lessons=PAIR_LOGIC_LESSONS)]),
 dict(id="ph-link", title="Phase 4: Linking adverbs and punctuation", intro="However, therefore and moreover, the comma splice, and when to use commas with conjunctions.", units=P4 + [dict(id="u-comma-rules", title="The comma rules", lessons=PUNCT_LESSONS)]),
 dict(id="ph-mist", title="Your sentences, solved: the mistakes", intro="The 40 mistakes students make most, grouped by type, each with the right form and the rule.", units=[dict(id="u-mistakes", title="Mistakes by type", lessons=MIST_LESSONS)]),
 dict(id="ph-exam", title="Phase 5: The exam lab", intro="The seven mistakes that cost marks, and how to fix them quickly.", units=P5),
]
