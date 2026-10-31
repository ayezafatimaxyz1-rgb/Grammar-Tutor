"""Phase 3: the CSS examination lab, built from real CSS English (Precis & Composition) papers.

Run from prepositions-lab/:  python3 tools/content/phase3.py
It writes content/lessons/p3-*.js. Edit the data here, not the generated files.

Every past-paper item names its paper. A paper's year is given only when it was confirmed against
an outside source; otherwise year is None and the note says so. Nothing here is invented: items
marked "original" are the app's own practice questions and are labelled that way in the app.
"""
import json, os

T = json.dumps
Y, N = True, False
COPY = "Copy supplied by the learner (cssaspirants.pk)"
PAPERS = {
    "2019": dict(year=2019, note="matched to a solved CSS 2019 paper (comprehension on the Martian 'Thing')"),
    "2021": dict(year=2021, note="passage matched to an answer key labelled CSS 2021 and the FPSC copy"),
    "2022": dict(year=2022, note="paper sat on 12 May 2022; passage on civil society matched"),
    "2023": dict(year=2023, note="FPSC paper headed Competitive Examination 2023 (voluntary simplicity passage)"),
    "2024": dict(year=2024, note="FPSC 2024 paper (digital divide passage)"),
    "2026": dict(year=2026, note="year printed on the paper"),
    "A": dict(year=None, note="paper with the passage 'Beauty is not an ornament to life'; year not printed, not yet confirmed"),
    "B": dict(year=None, note="paper with the passage on machines and civilization; year not printed, not yet confirmed"),
    "C": dict(year=None, note="paper with the Manto precis; a sentence mentions February 2020, but the year is not confirmed"),
    "D": dict(year=None, note="paper with the passage on wandering; year not printed, not yet confirmed"),
}

def paper_label(pid):
    y = PAPERS[pid]["year"]
    return f"CSS {y}" if y else "CSS paper (year not confirmed)"

def citation(pid, q):
    p = PAPERS[pid]
    return f"CSS English (Precis & Composition), {q}. {COPY}; {p['note']}."

# ---------------------------------------------------------------------------------------------
# Worked item: (paper, question, sentence with ____, [(pic, word, ok, reason)], [rule, rule])
# Check item:  (paper, question, prompt, [(option, ok, why, misconception tag)])
# ---------------------------------------------------------------------------------------------
LESSONS = []

def lesson(**k):
    LESSONS.append(k)

lesson(id="p3-partners", n=3, title="Partner words: responsible for, impervious to",
  level="Advanced", minutes=14,
  summary="The largest group in the papers: an adjective, verb or noun that always takes the same preposition. The blank sits right after the partner word, so look left, recall the pair, and test the picture behind it.",
  objectives=["Spot a partner word just before the blank and recall its preposition.",
              "Solve the partner-word items from CSS 2019, 2021, 2022, 2023 and 2024."],
  intro=("Look left: the partner decides",
    "Four pictures: a person caring for children (responsible for), a shield with arrows bouncing off (impervious to), a block on a pillar (contingent on), a level balance (commensurate with).",
    ["In these items the word just before the blank chooses the preposition. **Look left**: _responsible ___, impervious ___, contingent ___._",
     "Recall the pair and its picture: care for (responsible **for**), bouncing off towards (impervious **to**), resting on a support (contingent **on**), matching (commensurate **with**).",
     "Then read the whole sentence again with your choice. If it sounds like the pair you learnt in Phase 2, write it down."],
    [('"careFor"', "responsible for", "care for a task", "for"),
     ('"bounceOff"', "impervious to", "nothing gets through", "to"),
     ('"support"', "contingent on", "resting on a condition", "on"),
     ('"levelScale"', "commensurate with", "matching in size", "with")]),
  worked=[
    ("2019", "Q.5(b)(iv)", "My parents are not responsible ____ my actions.", [
      ('"careFor"', "for", Y, "the task in | their care"), ('"answerTo"', "to", N, "to = the authority | you answer to"), ('"ownerBook"', "of", N, "of = belonging; | not this pair")],
      ["responsible for + the task or person", "responsible to + the authority"]),
    ("2021", "Q.5(b)(iv)", "The morgue is redolent ____ the odor of deceased individuals.", [
      ('"origin"', "of", Y, "full of the smell | of something"), ('"levelScale"', "with", N, "also heard, but | of is the standard pair"), ('"growTo"', "to", N, "to = towards; | a smell does not move to")],
      ["redolent of = smelling of, suggesting", "full of: redolent of the past"]),
    ("2021", "Q.5(b)(viii)", "Ahmad applied ____ the bank for a loan.", [
      ('"applyTo"', "to", Y, "the bank receives | the application"), ('"wantStar"', "for", N, "for = the loan he | wants (already used)"), ('"reachDot"', "at", N, "at = a point, not | a receiver")],
      ["apply to + the place that receives it", "apply for + the thing you want"]),
    ("2024", "Q.5(b)(i)", "His research is characterized ____ a deep understanding of genetic mutations.", [
      ('"writtenBy"', "by", Y, "passive: the quality | that marks it"), ('"levelScale"', "with", N, "with = a tool or | company"), ('"ownerBook"', "of", N, "of = belonging, | not the passive doer")],
      ["be characterized by, marked by, defined by", "passive + by"]),
    ("2024", "Q.5(b)(ii)", "The solution is contingent ____ various factors.", [
      ('"support"', "on", Y, "rests on them | like a support"), ('"arrowR"', "to", N, "to = towards; | a common error"), ('"origin"', "from", N, "from = a source")],
      ["contingent on (upon) = depending on", "same picture: depend on, rely on"]),
    ("B", "Q.5(a)(vi)", "The public are cautioned ____ pickpockets.", [
      ('"shield"', "against", Y, "a warning that | protects from danger"), ('"aboutCircle"', "about", N, "about = the topic; | weaker"), ('"target"', "for", N, "for = aimed at a | benefit")],
      ["caution / warn against + a danger", "protect against, insure against"]),
    ("C", "Q.5(b)(i)", "I was annoyed ____ him.", [
      ('"angryFace"', "with", Y, "a person: with"), ('"aboutCircle"', "about", N, "about = a situation: | annoyed about the delay"), ('"pressOn"', "on", N, "word-for-word | translation")],
      ["annoyed with a person", "annoyed about (at) a situation"]),
  ],
  checks=[
    ("2021", "Q.5(b)(v)", "He is cogitating ___ some means of revenge.", [
      ("on", Y, "Correct. Cogitate on (upon, about) = think deeply about. Thought rests on the topic.", None),
      ("to", N, "To points to a goal; thinking rests on a topic, so on or about.", "p3-partner"),
      ("with", N, "With = together or a tool. Use cogitate on.", "p3-partner")]),
    ("2021", "Q.5(b)(vii)", "His body is impervious ___ moisture.", [
      ("to", Y, "Correct. Impervious to: nothing gets through to it.", None),
      ("from", N, "From is for separation. The fixed pair is impervious to.", "p3-partner"),
      ("against", N, "Against is close in meaning, but the fixed pair is impervious to.", "p3-partner")]),
    ("2021", "Q.5(b)(vi)", "He was reticent ___ do anything about the problem.", [
      ("to", Y, "Correct here, because a verb (do) follows: reticent to + verb = reluctant to. Careful writers prefer reluctant to, so in your own writing use reluctant.", None),
      ("about", N, "Reticent about + a topic is the standard use (reticent about his past), but here a verb follows, so to.", "p3-partner"),
      ("from", N, "From would need -ing (refrain from doing); reticent does not take from.", "p3-partner")]),
    ("2024", "Q.5(b)(iii)", "The experiment is predicated ___ the assumption of uniform conditions.", [
      ("on", Y, "Correct. Predicated on (upon) = based on: it rests on the assumption.", None),
      ("by", N, "By names a doer in the passive; an assumption is a base, so on.", "p3-partner"),
      ("to", N, "To does not show a base. Use predicated on.", "p3-partner")]),
    ("2024", "Q.5(b)(iv)", "The project is commensurate ___ the skills of the research team.", [
      ("with", Y, "Correct. Commensurate with = matching in size or level.", None),
      ("to", N, "To is heard, but the standard pair is commensurate with.", "p3-partner"),
      ("on", N, "On is for resting on a condition (contingent on).", "p3-partner")]),
    ("2024", "Q.5(b)(v)", "The methodology is impervious ___ external influences.", [
      ("to", Y, "Correct. Impervious to: nothing from outside gets through to it.", None),
      ("from", N, "From is separation; the fixed pair is impervious to.", "p3-partner"),
      ("against", N, "Close in meaning, but the fixed pair is impervious to.", "p3-partner")]),
    ("2024", "Q.5(b)(viii)", "The model is contingent ___ accurate data inputs.", [
      ("on", Y, "Correct. Contingent on (upon): the model rests on accurate data.", None),
      ("to", N, "Contingent to is a common error. Use contingent on.", "p3-partner"),
      ("with", N, "With belongs to commensurate with, not contingent.", "p3-partner")]),
    ("2024", "Q.5(b)(vi)", "The discussion oscillated ___ two main points.", [
      ("between", Y, "Correct. Swinging from one point to another and back: between two points.", None),
      ("among", N, "Among needs a group; two points take between.", "between-vs-among"),
      ("on", N, "On rests on one point; oscillate swings between two.", "p3-partner")]),
    ("2024", "Q.5(b)(vii)", "His proposal hinges ___ securing adequate funding.", [
      ("on", Y, "Correct. Like a door on its hinge, it turns on one thing: hinge on (upon).", None),
      ("at", N, "At is a point in space or time, not a support. Use hinge on.", "p3-partner"),
      ("to", N, "To does not show what something turns on.", "p3-partner")]),
    ("C", "Q.5(b)(ii)", "This train is bound ___ Gujrat.", [
      ("for", Y, "Correct. Bound for = going towards a destination (like leave for).", None),
      ("to", N, "Bound to + verb means certain to (bound to win). For a destination: bound for.", "p3-partner"),
      ("at", N, "At is a point, not a destination of a journey.", "p3-partner")]),
    ("C", "Q.5(b)(vi)", "Do not meddle ___ my affairs.", [
      ("in", Y, "Correct. Meddle in (or with) someone's affairs: getting inside them.", None),
      ("on", N, "On is a surface; meddling gets inside, so in.", "p3-partner"),
      ("at", N, "At is a point; use meddle in.", "p3-partner")]),
    ("2023", "Q.5(b)(vi)", "I have been working hard ___ arithmetic.", [
      ("at", Y, "Correct. Work at a skill or task, like good at: aiming at the target.", None),
      ("for", N, "For names a purpose or a person; the subject you work on takes at (or on).", "p3-partner"),
      ("with", N, "With names a tool or a partner, not a subject.", "p3-partner")]),
  ])

lesson(id="p3-phrasal", n=4, title="Phrasal verbs: put off, went off, kept on",
  level="Advanced", minutes=12,
  summary="Many blanks complete a phrasal verb: the verb and the small word make a new meaning (put off = postpone). Read the meaning the sentence needs, then pick the particle that makes that meaning.",
  objectives=["Recognise when a blank completes a phrasal verb.", "Solve the phrasal-verb items from CSS 2021, 2022, 2023 and other papers."],
  intro=("Ask what the verb means here",
    "Four pictures: a calendar (put off = postpone), a dictionary (look up), a person walking on (keep on = continue), a bus with a person (knock down).",
    ["If the verb alone does not give the meaning the sentence needs, the blank is a **particle** that changes it: _The meeting was put ___ by the Chairman_ means it was postponed.",
     "Ask: what did happen? Postponed: **put off**. Searched in a dictionary: **look up**. Continued: **keep on**. Hit and made to fall: **knock down**.",
     "Then check the pronoun test from Phase 2: a separable phrasal verb can say _put it off._"],
    [('"calendar"', "put off = postpone", "the meeting moves later", "off"),
     ('"dictionary"', "look up = search for", "in a dictionary", "up"),
     ('"stickTo"', "keep on = continue", "doing it again and again", "on"),
     ('"busOn"', "knock down = hit, make fall", "by a vehicle", "down")]),
  worked=[
    ("C", "Q.5(b)(vii)", "The meeting was put ____ by the Chairman.", [
      ('"calendar"', "off", Y, "put off = | postponed"), ('"cross"', "out", N, "put out = | extinguish (a fire)"), ('"arrowDown"', "down", N, "put down = write, | or crush")],
      ["put off = postpone", "call off = cancel"]),
    ("2021", "Q.5(b)(ii)", "I looked this word ____ in the dictionary, but I still don't understand it.", [
      ('"dictionary"', "up", Y, "look up = find | in a book"), ('"searchQ"', "for", N, "look for = search, | not in a dictionary"), ('"lookInto"', "into", N, "look into = | investigate")],
      ["look a word up in a dictionary", "look for · look into · look after"]),
    ("C", "Q.5(b)(iii)", "The pistol went ____ by accident.", [
      ('"flame"', "off", Y, "go off = fire, | explode"), ('"arrowUp"', "up", N, "go up = rise"), ('"arrowR"', "on", N, "go on = continue")],
      ["a gun, bomb or alarm goes off", "go on = continue"]),
    ("2022", "Q.5(b)(iv)", "My husband brought me some flowers today. He must be ____ something!", [
      ('"secret"', "up to", Y, "up to something = | secretly planning"), ('"aboutCircle"', "about", N, "about something | is incomplete"), ('"cross"', "on to", N, "on to = aware of: | different")],
      ["be up to something = planning something secret", "up to = as many as (up to 500)"]),
  ],
  checks=[
    ("C", "Q.5(b)(iv)", "He kept ___ asking silly questions.", [
      ("on", Y, "Correct. Keep on + -ing = continue again and again.", None),
      ("up", N, "Keep up = maintain a level (keep up the good work), not repeat an action.", "p3-phrasal"),
      ("off", N, "Keep off = stay away from.", "p3-phrasal")]),
    ("C", "Q.5(b)(v)", "He was knocked ___ by the bus.", [
      ("down", Y, "Correct. Knock down = hit and make fall (also knock over).", None),
      ("off", N, "Knock off = stop work, or reduce a price (informal).", "p3-phrasal"),
      ("out", N, "Knock out = make unconscious, or eliminate from a contest.", "p3-phrasal")]),
    ("C", "Q.5(b)(viii)", "He rounded ___ his speech with a quote from Ghalib.", [
      ("off", Y, "Correct. Round off = finish something neatly.", None),
      ("up", N, "Round up = gather people, or raise a number to the nearest whole.", "p3-phrasal"),
      ("on", N, "Round on = turn and attack someone in words.", "p3-phrasal")]),
    ("2022", "Q.5(b)(v)", "My younger son tripped ___ the cat and fell downstairs.", [
      ("over", Y, "Correct. Trip over something: the foot catches on it and you fall over it.", None),
      ("on", N, "Trip on is sometimes heard, but the standard phrase is trip over.", "p3-phrasal"),
      ("with", N, "With = together; you trip over an obstacle.", "p3-phrasal")]),
    ("2023", "Q.5(b)(v)", "She entered ___ an agreement with them.", [
      ("into", Y, "Correct. Enter into an agreement, talks or negotiations = begin them.", None),
      ("(no word)", N, "Enter alone means go into a place. For agreements: enter into.", "p3-phrasal"),
      ("in", N, "In is for position; entering an agreement takes into.", "p3-phrasal")]),
    ("2023", "Q.5(b)(vii)", "He got ___ his bicycle.", [
      ("on", Y, "Correct. A bicycle, bus or horse is a platform: get on (and get off).", None),
      ("in", N, "In is for cars and taxis: get in the car.", "on-vs-in-vehicle"),
      ("into", N, "Into is for small enclosed vehicles: get into a car.", "on-vs-in-vehicle")]),
  ])

lesson(id="p3-idioms", n=5, title="Fixed phrases: by heart, of his own accord",
  level="Intermediate", minutes=11,
  summary="Some blanks sit inside a fixed phrase that must be learnt whole: by heart, of one's own accord, under the weather, in ruins, with luck, without offence, to someone's face. Recognise the phrase, then check its meaning fits.",
  objectives=["Recognise fixed phrases in the papers and their meanings.", "Solve the fixed-phrase items from CSS 2019, 2021, 2022, 2023 and other papers."],
  intro=("Learn the phrase as one unit",
    "Four pictures: a book and a heart (by heart), a person under a rain cloud (under the weather), a broken building (in ruins), a person face to face (to his face).",
    ["Fixed phrases cannot be worked out word by word. **By heart** means from memory; **under the weather** means slightly ill; **in ruins** means destroyed.",
     "When the blank is followed by a word like _heart, accord, weather, ruins, offence, luck_, think of the whole phrase you know.",
     "Then read the sentence: does that meaning fit? _I need to learn these verbs by heart_: yes, from memory."],
    [('"learnHeart"', "by heart", "from memory", "by"),
     ('"sickPerson"', "under the weather", "slightly ill", "under"),
     ('"brokenBox"', "in ruins", "destroyed", "in"),
     ('"faces"', "to his face", "directly, face to face", "to")]),
  worked=[
    ("2021", "Q.5(b)(iii)", "I need to learn these verbs ____ heart by tomorrow.", [
      ('"learnHeart"', "by", Y, "by heart = | from memory"), ('"heart"', "with", N, "with heart = with | feeling: different"), ('"origin"', "from", N, "from = a source: | from a book")],
      ["by heart · by tomorrow (a deadline)", "by + means or deadline"]),
    ("2022", "Q.5(b)(iii)", "He went ____ his own accord: nobody forced him to go.", [
      ('"thinkSelf"', "of", Y, "of his own accord | = willingly"), ('"pointDoc"', "on", N, "on his own = alone; | accord takes of"), ('"followRule"', "in", N, "in accord with | = agreeing with")],
      ["of one's own accord = by choice", "in accordance with = following a rule"]),
    ("2022", "Q.5(b)(ii)", "____ luck, we should be in Islamabad by 5 p.m.", [
      ('"dice"', "With", Y, "with luck = | if things go well"), ('"cross"', "By", N, "by luck = by chance, | about the past"), ('"cross"', "In", N, "in luck = fortunate | now")],
      ["with luck = hopefully (future)", "by luck = by chance (past)"]),
    ("A", "Q.4(b)(iv)", "I said it ____ his face.", [
      ('"faces"', "to", Y, "to his face = | directly to him"), ('"reachDot"', "at", N, "at = a point | you aim at"), ('"onBase"', "on", N, "on his face = on | its surface")],
      ["say it to someone's face = openly", "behind someone's back = secretly"]),
  ],
  checks=[
    ("2022", "Q.5(b)(vi)", "You look really ___ the weather. Are you ill?", [
      ("under", Y, "Correct. Under the weather = slightly ill.", None),
      ("in", N, "In the weather is not the phrase. Use under the weather.", "idiom-pairs"),
      ("over", N, "Over the weather is not a phrase.", "idiom-pairs")]),
    ("2022", "Q.5(b)(viii)", "He told that his career was ___ ruins because of the pandemic.", [
      ("in", Y, "Correct. In ruins = destroyed, a state you are inside.", None),
      ("at", N, "At ruins is not the phrase. A state takes in: in ruins, in danger.", "state-preposition-guess"),
      ("on", N, "On ruins would mean standing on top of them.", "state-preposition-guess")]),
    ("2023", "Q.5(b)(viii)", "It cannot be done ___ offence.", [
      ("without", Y, "Correct. Without offence = without upsetting anyone.", None),
      ("with", N, "With offence would mean causing offence: the opposite.", "idiom-pairs"),
      ("by", N, "By offence is not a phrase.", "idiom-pairs")]),
    ("2019", "Q.5(b)(vii)", "The police took the men in ___ questioning.", [
      ("for", Y, "Correct. Take someone in for questioning: for names the purpose.", None),
      ("to", N, "To + a noun would be a destination, not a purpose.", "for-purpose"),
      ("at", N, "At is a point; the purpose takes for.", "for-purpose")]),
  ])

lesson(id="p3-space", n=6, title="Place and movement: over the wall, into the room",
  level="Intermediate", minutes=12,
  summary="Items about real places and movement: draw the scene in your mind, then choose the Phase 1 picture that matches. Over a wall (crossing above), into a parlour (entering), at a destination (a point), in the shade (inside an area).",
  objectives=["Picture the scene and choose the matching preposition.", "Solve the place and movement items from CSS 2019, 2021, 2022, 2023 and other papers."],
  intro=("Draw the scene",
    "Four pictures: an arrow over a wall (jumped over the wall), an arrow into a room (walk into my parlour), an arrow ending at a dot (arrive at our destination), a person in the shade of a tree (in the shade).",
    ["For place and movement, **draw the scene** in your head. Is something crossing above, entering, reaching a point, or inside an area?",
     "Crossing above a barrier: **over** the wall. Entering: **into** my parlour. A point at the end of a journey: **at** our destination. Inside an area: **in** the shade.",
     "Then test the others: _through the wall_ would mean breaking it; _on the wall_ would mean standing on top."],
    [('"overRock"', "jumped over the wall", "crossing above it", "over"),
     ('"enterRoom"', "walk into my parlour", "entering it", "into"),
     ('"airportDot"', "arrive at our destination", "a point at the end", "at"),
     ('"tree"', "sat in the shade", "inside an area", "in")]),
  worked=[
    ("2023", "Q.5(b)(iv)", "The burglar jumped ____ the compound wall.", [
      ('"overRock"', "over", Y, "crossing above | the wall"), ('"passThrough"', "through", N, "through = breaking | the wall"), ('"onBase"', "on", N, "on = landing on | its top")],
      ["over = crossing above", "through = in one side and out the other"]),
    ("2019", "Q.5(b)(i)", "What time do we arrive ____ our destination?", [
      ('"airportDot"', "at", Y, "a destination is | a point"), ('"goHome"', "to", N, "to = still | travelling"), ('"inCity"', "in", N, "in is for cities | and countries")],
      ["arrive at a point · arrive in a city", "never arrive to"]),
    ("2022", "Q.5(b)(vii)", "The car went ____ the brow of the hill and was soon out of sight.", [
      ('"hillUp"', "over", Y, "up and across | the top"), ('"arrowUp"', "up", N, "only rising, | not crossing"), ('"passThrough"', "through", N, "a hilltop has | no inside")],
      ["over the brow = across the top of the hill", "over a wall, over a bridge"]),
  ],
  checks=[
    ("2019", "Q.5(b)(ii)", "We are flying ___ some rough weather; please fasten your seat belts.", [
      ("through", Y, "Correct. The plane goes in one side of the weather and out the other.", None),
      ("over", N, "Over would mean above the weather, which would not be rough for you.", "through-across-along"),
      ("across", N, "Across is over a surface; weather has depth, so through.", "through-across-along")]),
    ("2021", "Q.5(b)(i)", "The knavish wolf was able ___ convince the pig to let him ___ his home.", [
      ("to … into", Y, "Correct. Able to + verb, and let him into his home (entering).", None),
      ("to … in", N, "Let him in is fine alone, but before his home: into (entering).", "into-vs-in-motion"),
      ("for … at", N, "Able takes to + verb; at his home is a position, not entering.", "into-vs-in-motion")]),
    ("2023", "Q.5(b)(i)", "The neighbours came ___ my house to see what's going on in the house.", [
      ("to", Y, "Correct. Came to my house: movement ending at the house (also round to, over to).", None),
      ("at", N, "At is a position; coming is movement, so to.", "at-vs-to-target"),
      ("in", N, "In is inside, without movement; use came to (or into, if they entered).", "into-vs-in-motion")]),
    ("2023", "Q.5(b)(ii)", "She sat ___ the shade of the tree.", [
      ("in", Y, "Correct. Shade is an area she is inside.", None),
      ("under", N, "Under the tree is fine; but the shade itself is an area: in the shade.", "in-vs-on"),
      ("on", N, "On would mean on top of a surface.", "in-vs-on")]),
    ("A", "Q.4(b)(iii)", "Monkeys live ___ trees.", [
      ("in", Y, "Correct. Trees with their branches are pictured as a space the monkeys are inside.", None),
      ("at", N, "At makes the trees a point.", "in-vs-at-place"),
      ("upon", N, "Upon is a formal on, for surfaces.", "upon-limits"),
      ("on", N, "On would put them on the surface, like birds on a branch.", "in-vs-on")]),
    ("B", "Q.5(a)(v)", "\"Will you walk ___ my parlour?\"", [
      ("into", Y, "Correct. The famous line: from outside to inside.", None),
      ("in", N, "In is already inside; walking from outside takes into.", "into-vs-in-motion"),
      ("to", N, "To stops at the door; into goes inside.", "into-vs-in-motion"),
      ("by", N, "By would mean passing it.", "into-vs-in-motion")]),
  ])

lesson(id="p3-figurative", n=7, title="Literary sentences: beneath the surface, towards perfection",
  level="Advanced", minutes=12,
  summary="Recent papers use literary sentences where ideas move like objects: themes weave through verses, power consolidates within an elite, symbolism whispers beneath the surface. Keep the space picture and apply it to the idea.",
  objectives=["Apply space pictures to abstract, literary sentences.", "Solve the literary items from the paper on wandering and similar ones."],
  intro=("Ideas move like objects",
    "Four pictures: an arrow through a tunnel (themes wove through the verses), a dot inside a group (power within the elite), a fish beneath a water line (meaning beneath the surface), an arrow towards a star (leaned towards perfection).",
    ["In literary sentences the subject is an idea, but the preposition keeps its **space picture**. Themes that run all along the verses: they weave **through** them.",
     "Power held inside one group: **within** the elite. Meaning hidden under the words: **beneath** the surface. A persona pointing at an ideal: **towards** perfection.",
     "Ask: is the idea passing through, held inside, hidden below, or pointing at? Then choose."],
    [('"passThrough"', "wove through the verses", "running all along them", "through"),
     ('"crowdDot"', "within the elite", "held inside the group", "within"),
     ('"fish"', "beneath the surface", "hidden below", "beneath"),
     ('"lookAhead"', "leaned towards perfection", "pointing at an ideal", "towards")]),
  worked=[
    ("D", "Q.5(b)(i)", "The massive landslide tumbled ____ the valley below.", [
      ('"intoBag"', "into", Y, "falling down and | ending inside it"), ('"hillUp"', "over", N, "over = across the | top, not down in"), ('"airportDot"', "at", N, "at = a point; | no movement")],
      ["into = movement ending inside", "down into the valley"]),
    ("D", "Q.5(b)(iii)", "The subtle symbolism and metaphors whispered ____ the surface of the words.", [
      ('"fish"', "beneath", Y, "hidden below the | surface meaning"), ('"floatAbove"', "above", N, "above = on show, | not hidden"), ('"onBase"', "on", N, "on the surface = | obvious")],
      ["beneath the surface = hidden meaning", "on the surface = obvious"]),
    ("D", "Q.5(b)(vii)", "Her online persona leaned ____ perfection, hiding flaws.", [
      ('"lookAhead"', "towards", Y, "pointing at an | ideal"), ('"onBase"', "on", N, "lean on = depend on | for support"), ('"pressOn"', "against", N, "lean against = rest | on a wall")],
      ["lean towards = tend to", "lean on = depend on"]),
  ],
  checks=[
    ("D", "Q.5(b)(ii)", "The controversy surrounding arranged marriages raged ___ the Pakistani community.", [
      ("within", Y, "Correct. The controversy stayed inside the community (also among, through).", None),
      ("on", N, "On is a surface; a debate inside a group takes within or among.", "p3-figurative"),
      ("at", N, "At is a point; a community is a group or area.", "p3-figurative")]),
    ("D", "Q.5(b)(iv)", "The concept of Tawhid lies ___ the very fabric of Islamic theology.", [
      ("within", Y, "Correct. It is held inside the fabric, woven into it (also at the heart of).", None),
      ("over", N, "Over would put it above or covering the fabric.", "p3-figurative"),
      ("beside", N, "Beside would put it next to the fabric, not part of it.", "p3-figurative")]),
    ("D", "Q.5(b)(v)", "As social media scrolled endlessly ___ her daily life, her attention span shrivelled.", [
      ("through", Y, "Correct. Running all along her day, from one end to the other.", None),
      ("across", N, "Across is a surface crossed once; through runs inside her day.", "p3-figurative"),
      ("by", N, "By would mean passing near it.", "p3-figurative")]),
    ("D", "Q.5(b)(vi)", "Power consolidated ___ the ruling elite, silencing dissent.", [
      ("within", Y, "Correct. Power gathered inside one small group (also among, in).", None),
      ("between", N, "Between needs two separate sides.", "between-vs-among"),
      ("over", N, "Power over the elite would mean controlling them: a different meaning.", "p3-figurative")]),
    ("D", "Q.5(b)(viii)", "Themes of love, loss, and longing wove ___ Ghalib's verses, creating a rich tapestry of emotion.", [
      ("through", Y, "Correct. Like a thread passing all through the cloth.", None),
      ("into", N, "Into is possible for weaving something in once; running all along the verses is through.", "p3-figurative"),
      ("over", N, "Over would cover the verses, not run inside them.", "p3-figurative")]),
  ])

lesson(id="p3-small", n=8, title="Time, means and small words: by noon, with a hatchet",
  level="Intermediate", minutes=12,
  summary="Short items test the basic Phase 1 meanings: time (by noon, at dawn, for a long time), means (with a hatchet, by its own light), price (at this price), cause (owing to), purpose (for cooking), and a preposition left at the end (the woman you gave the book to).",
  objectives=["Use the Phase 1 time, means and cause pictures in exam items.", "Solve the short items from CSS 2019, 2022, 2023 and other papers."],
  intro=("Back to the basic pictures",
    "Four pictures: a deadline dot (by noon), a knife cutting bread (with a hatchet), a fog delaying a plane (owing to poor attendance), coins on a scale (at this price).",
    ["Many short items only test the Phase 1 meanings. Time: a deadline is **by** (_by noon_), a moment is **at** (_at dawn_), a length is **for** (_for a long time_).",
     "Means: a tool in your hand is **with** (_with a hatchet_). Cause at the start of a sentence: **owing to** or **because of**. Price is a point on a scale: **at** this price.",
     "And when the person comes earlier in the sentence, the preposition stays at the end: _the woman you gave the book **to**._"],
    [('"priorDot"', "by noon", "a deadline", "by"),
     ('"bread"', "with a hatchet", "a tool in the hand", "with"),
     ('"fogDelay"', "Owing to poor attendance", "the cause", "Owing to"),
     ('"coin"', "at this price", "a point on a scale", "at")]),
  worked=[
    ("2019", "Q.5(b)(iii)", "It is warming up; ____ noon we should be able to go swimming.", [
      ('"priorDot"', "by", Y, "a deadline: | no later than"), ('"notUntil"', "until", N, "until = waiting | up to then"), ('"clock"', "at", N, "at noon = exactly | then; by fits better")],
      ["by noon = no later than noon", "until noon = continuing up to noon"]),
    ("2019", "Q.5(b)(vi)", "____ poor attendance, this course is being cancelled.", [
      ('"fogDelay"', "Owing to", Y, "the cause: safe | at the start"), ('"rain"', "Because", N, "+ a clause: because | attendance is poor"), ('"overRock"', "Despite", N, "despite = the | opposite logic")],
      ["Owing to / Because of / Due to + noun", "Because + clause"]),
    ("2019", "Q.5(b)(viii)", "The woman you gave the book ____ is my aunt.", [
      ('"giveTo"', "to", Y, "give something | to someone"), ('"target"', "for", N, "for = for her | benefit: different"), ('"cross"', "(no word)", N, "gave the book her | is missing to")],
      ["give X to someone · the person I gave X to", "formal: the woman to whom you gave the book"]),
    ("B", "Q.5(a)(i)", "____ a Ford he has a Fiat car.", [
      ('"plus"', "Besides", Y, "in addition | to a Ford"), ('"priorDot"', "Before", N, "before = earlier | in time"), ('"overRock"', "Despite", N, "despite = an | obstacle")],
      ["besides = in addition to", "beside = at the side of"]),
  ],
  checks=[
    ("2019", "Q.5(b)(v)", "This pan is ___ cooking omelettes.", [
      ("for", Y, "Correct. Purpose + -ing: a pan for cooking.", None),
      ("to", N, "To + verb: to cook. Before -ing use for.", "for-purpose"),
      ("with", N, "With names the tool used, not the purpose.", "for-purpose")]),
    ("2022", "Q.5(b)(i)", "Despite regular practice he never seems to win ___ tennis.", [
      ("at", Y, "Correct. Win at a game, like good at: the game is the target.", None),
      ("in", N, "Win in names a place or contest (win in the final). For a game: win at.", "p3-small"),
      ("on", N, "On is not used with a game you play.", "p3-small")]),
    ("2023", "Q.5(b)(iii)", "The moon does not shine ___ its own light.", [
      ("by", Y, "Correct. By names the means: it shines by reflected light.", None),
      ("from", N, "From would name a source; the means takes by (or with).", "p3-small"),
      ("on", N, "On is a surface, not a means.", "p3-small")]),
    ("A", "Q.4(b)(i)", "I cannot buy this car ___ this price.", [
      ("for", N, "For is used with an amount (for Rs 2 million), not with this price.", "at-for-scale"),
      ("in", N, "In is not used with price.", "at-for-scale"),
      ("at", Y, "Correct. A price is a point on a scale: at this price.", None),
      ("on", N, "On is not used with price.", "at-for-scale")]),
    ("A", "Q.4(b)(ii)", "Send these books ___ my home address.", [
      ("on", N, "On is a word-for-word error; an address is a destination.", "l1-transfer"),
      ("at", N, "At my address is a position (I live at); sending moves them to it.", "at-vs-to-target"),
      ("in", N, "In is not used with an address.", "address-at-on-in"),
      ("to", Y, "Correct. Sending is movement towards a destination: to.", None)]),
    ("B", "Q.5(a)(ii)", "I saw him felling a big tree ___ a hatchet.", [
      ("with", Y, "Correct. A tool you hold: with a hatchet.", None),
      ("through", N, "Through is a path or channel.", "with-vs-by"),
      ("by", N, "By + a means without the: by hand. A tool takes with.", "with-vs-by"),
      ("at", N, "At is a point or target.", "with-vs-by")]),
    ("B", "Q.5(a)(iii)", "I must start ___ dawn to reach the station in time.", [
      ("on", N, "On is for days and dates.", "time-size"),
      ("at", Y, "Correct. Dawn is a point in the day: at dawn (like at noon).", None),
      ("by", N, "By dawn would be a deadline (no later than dawn); with start, at fits.", "by-vs-until"),
      ("after", N, "After dawn would be too late for the meaning.", "time-size")]),
    ("B", "Q.5(a)(iv)", "I have known him ___ a long time.", [
      ("since", N, "Since needs a starting point: since 2015.", "for-vs-since"),
      ("from", N, "From needs an end too, and it does not go with the present perfect here.", "for-vs-since"),
      ("for", Y, "Correct. A length of time: for a long time.", None),
      ("over", N, "Over a long time describes a process happening during it.", "for-vs-since")]),
  ])

lesson(id="p3-double", n=9, title="Two blanks in one sentence (CSS 2026)",
  level="Advanced", minutes=12,
  summary="CSS 2026 put two blanks in each sentence. Solve them one at a time: each blank has its own partner word to the left. Never let the first answer decide the second.",
  objectives=["Solve two-blank items one blank at a time.", "Solve all eight items from CSS 2026."],
  intro=("One blank at a time",
    "Two separate lenses over one sentence: the first blank and its partner word (familiar ___), the second blank and its partner (knowledgeable ___).",
    ["CSS 2026 asked: _He was familiar ___ the author but not knowledgeable in depth ___ him._ Two blanks, two different partner words.",
     "Cover the second half and solve the first: **familiar with**. Then cover the first half and solve the second: **knowledgeable about**.",
     "Each blank has its own partner. The two answers are often different, and that is the trap."],
    [('"knowsWay"', "familiar with the author", "first partner: familiar", "with"),
     ('"aboutCircle"', "knowledgeable about him", "second partner: knowledgeable", "about")]),
  worked=[
    ("2026", "Q.5(b)(i)", "Nobody is certain ____ the future but some are convinced ____ the past.", [
      ('"question"', "about … of", Y, "certain about (or of); | convinced of"), ('"cross"', "of … about", N, "convinced about is | weaker; of is standard"), ('"cross"', "on … of", N, "certain on is | not used")],
      ["certain about / of · sure of", "convinced of · aware of"]),
    ("2026", "Q.5(b)(iii)", "After weighing ____ all the options we decided to plump ____ the first design.", [
      ('"scale"', "up … for", Y, "weigh up = consider; | plump for = choose"), ('"cross"', "on … for", N, "weigh on = | trouble someone"), ('"cross"', "up … on", N, "plump on is | not a phrase")],
      ["weigh up the options", "plump for = choose"]),
    ("2026", "Q.5(b)(v)", "The party's withdrawal ____ the elections was widely seen as an obstacle ____ the success of the peace plan.", [
      ('"goOut"', "from … to", Y, "withdraw from; | an obstacle to"), ('"cross"', "of … for", N, "withdrawal of = removing | something; obstacle for is wrong"), ('"cross"', "from … for", N, "an obstacle blocks | the way to")],
      ["withdrawal from (leaving)", "an obstacle to, a threat to, a key to"]),
    ("2026", "Q.5(b)(vii)", "I don't advise ____ anyone, I just listen ____ their complaints.", [
      ('"speak"', "(no word) … to", Y, "advise someone; | listen to"), ('"cross"', "to … to", N, "advise takes a | direct object"), ('"cross"', "(no word) … (no word)", N, "listen needs to")],
      ["advise someone (no preposition)", "listen to someone"]),
  ],
  checks=[
    ("2026", "Q.5(b)(ii)", "He was familiar ___ the author but not knowledgeable in depth ___ him.", [
      ("with … about", Y, "Correct. Person first: familiar with; knowledgeable about a topic.", None),
      ("to … of", N, "Familiar to would mean the author knows him.", "familiar-with-to"),
      ("with … with", N, "Knowledgeable takes about (or of), not with.", "p3-double")]),
    ("2026", "Q.5(b)(iv)", "The accused declared that he had no credible motive ___ revenge and denied the charges.", [
      ("for", Y, "Correct. A motive for something, like a reason for.", None),
      ("of", N, "Motive of is not the standard pair; use motive for.", "noun-preps"),
      ("to", N, "Motive to + verb is possible (a motive to lie), but before a noun: for.", "noun-preps")]),
    ("2026", "Q.5(b)(vi)", "They agreed to cooperate ___ police ___ these matters.", [
      ("with … in", Y, "Correct. Cooperate with someone, in (or on) something.", None),
      ("to … in", N, "Cooperate takes with for the partner.", "p3-double"),
      ("with … to", N, "The matter takes in or on, not to.", "p3-double")]),
    ("2026", "Q.5(b)(viii)", "The landscape ___ the Pampas is in places similar ___ the Dutch landscape.", [
      ("of … to", Y, "Correct. The landscape of a region; similar to.", None),
      ("in … with", N, "Similar takes to, not with.", "comparison-to"),
      ("of … than", N, "Than goes with -er words; similar takes to.", "comparison-to")]),
  ])

lesson(id="p3-errors", n=10, title="Preposition errors in sentence correction",
  level="Intermediate", minutes=11,
  summary="The 'Correct only five' question often hides a preposition error: an extra one (regret at, reaches to manhood), a missing one (smiled me, put the back seat), or a wrong one (commences from, send on my address, late in night).",
  objectives=["Find extra, missing and wrong prepositions in correction items.", "Correct the preposition errors from CSS 2019, 2022, 2023, 2026 and other papers."],
  intro=("Three kinds of error",
    "Three pictures: a crossed-out extra word (regret at the delay), a gap with a question mark (smiled me), a word replaced (commences from becomes commences on).",
    ["Correction items hide three kinds of preposition error. **Extra**: the verb needs none: _I regret at the delay_ becomes _I regret the delay._",
     "**Missing**: the verb cannot reach its object: _who just smiled me_ becomes _who just smiled at me._",
     "**Wrong**: a different picture is needed: _commences from February 1st_ becomes _commences on February 1st_ (a day takes on)."],
    [('"extraWord"', "extra: regret at the delay", "regret the delay", None),
     ('"gapSlot"', "missing: smiled me", "smiled at me", None),
     ('"swap"', "wrong: commences from", "commences on February 1st", None)]),
  worked=[
    ("2019", "Q.4(iv)", "Correct it: I regret ____ the delay.  (the paper had: I regret at the delay)", [
      ('"extraWord"', "(no word)", Y, "regret takes a | direct object"), ('"reachDot"', "at", N, "extra word: | regret at"), ('"aboutCircle"', "about", N, "regret about is | heard, but not needed")],
      ["I regret the delay.", "noun: my regret at the delay"]),
    ("2022", "Q.4(vii)", "Correct it: I offered my seat to an older woman who just smiled ____ me.", [
      ('"faces"', "at", Y, "smile at | someone"), ('"gapSlot"', "(no word)", N, "smiled me: | missing at"), ('"arrowR"', "to", N, "smile to is | not standard")],
      ["smile at, look at, laugh at", "a target takes at"]),
    ("C", "Q.4(vii)", "Correct it: The new session commences ____ February 1st, 2020.  (the paper had: commences from)", [
      ('"calendar"', "on", Y, "a date takes on"), ('"origin"', "from", N, "from needs an end: | from 1 to 28 February"), ('"inPeriod"', "in", N, "in is for months: | in February")],
      ["on a date: on February 1st", "from ... to for a period"]),
  ],
  checks=[
    ("2022", "Q.4(viii)", "Correct the sentence: \"She packed her bags, carried downstairs and put the back seat of her car.\" What is the preposition fix?", [
      ("put them in the back seat", Y, "Correct. Put needs a place word: in the back seat (and an object, them).", None),
      ("put on the back seat", N, "On would place them on the seat's surface; the car interior takes in, and the object them is missing.", "missing-prep"),
      ("put to the back seat", N, "Put does not take to for a place.", "missing-prep")]),
    ("2023", "Q.4(iii)", "Correct the sentence: \"This year, he will sit in the CSS examination.\"", [
      ("This year, he will sit the CSS examination.", Y, "Correct. Sit an examination (BrE) or sit for it; in is wrong.", None),
      ("This year, he will sit on the CSS examination.", N, "Sit on would mean sitting on top of it, or delaying it.", "extra-prep"),
      ("This year, he will sit at the CSS examination.", N, "At is not used with sit an exam.", "extra-prep")]),
    ("2026", "Q.4(7)", "Correct the phrase from the sentence: \"It was late in night and a boy rode his bike along the path ...\"", [
      ("late at night", Y, "Correct. At night (a point-like part of the day), never in night.", None),
      ("late on night", N, "On is for named days: on Monday night.", "day-part-with-day"),
      ("late in the night", N, "In the night is possible for a specific night, but the fixed phrase here is late at night.", "day-part-with-day")]),
    ("C", "Q.4(vi)", "Correct the sentence: \"When he reaches to manhood, he will visit to England.\"", [
      ("When he reaches manhood, he will visit England.", Y, "Correct. Reach and visit take direct objects: no to.", None),
      ("When he reaches at manhood, he will visit in England.", N, "Reach and visit need no preposition.", "redundant-prep"),
      ("When he reaches to manhood, he will visit England.", N, "Reach already means arrive at; to is extra.", "redundant-prep")]),
    ("C", "Q.4(viii)", "Correct the sentence: \"Please send this letter on my address.\"", [
      ("Please send this letter to my address.", Y, "Correct. Sending moves it to a destination.", None),
      ("Please send this letter in my address.", N, "In is not used with an address.", "address-at-on-in"),
      ("Please send this letter on my address.", N, "On is a word-for-word error.", "l1-transfer")]),
  ])

# A mock paper in the same format, with the app's own original sentences.
MOCK = [
  ("The minister was accused ___ misusing public funds.", [("of", Y, "Accuse someone of a wrong.", None), ("for", N, "For goes with blame.", "object-preps"), ("with", N, "With goes with charge.", "object-preps")]),
  ("The success of the plan hinges ___ public support.", [("on", Y, "Hinge on: it turns on one thing.", None), ("at", N, "At is a point, not a support.", "p3-partner"), ("to", N, "To does not show what something turns on.", "p3-partner")]),
  ("The match was called ___ because of rain.", [("off", Y, "Call off = cancel.", None), ("out", N, "Call out = shout, or criticise.", "p3-phrasal"), ("up", N, "Call up = phone, or summon.", "p3-phrasal")]),
  ("She learnt the whole poem ___ heart.", [("by", Y, "By heart = from memory.", None), ("with", N, "With heart = with feeling.", "idiom-pairs"), ("from", N, "From is a source.", "idiom-pairs")]),
  ("The thief jumped ___ the fence and ran away.", [("over", Y, "Crossing above the fence.", None), ("through", N, "Through would break it.", "p3-space"), ("on", N, "On would land on top.", "p3-space")]),
  ("Hope flickered ___ the hearts of the flood victims.", [("within", Y, "Held inside their hearts (also in).", None), ("over", N, "Over would be above, not inside.", "p3-figurative"), ("at", N, "At is a point.", "p3-figurative")]),
  ("Please submit the form ___ Friday.", [("by", Y, "A deadline.", None), ("until", N, "Until = keep doing it up to then.", "by-vs-until"), ("since", N, "Since looks back from now.", "by-vs-until")]),
  ("Nobody was aware ___ the danger, and nobody was prepared ___ it.", [("of … for", Y, "Aware of; prepared for.", None), ("about … to", N, "Prepared takes for (or to + verb).", "p3-double"), ("of … with", N, "Prepared with names what you have, not the event.", "p3-double")]),
]

# ---------------------------------------------------------------------------------------------
def say_lineup(sentence, opts, rules, src):
    ok = [i for i, o in enumerate(opts) if o[2]][0]
    wrong = [i for i, o in enumerate(opts) if not o[2]]
    clean = lambda r: " ".join(x.strip() for x in r.split("|"))
    gap = sentence.replace("____", "…")
    return [
        (f"From {src}: {gap} The answer is **{opts[ok][1]}**: {clean(opts[ok][3])}.", f"why{ok + 1}"),
        ("Why not the others? " + " ".join(f"**{opts[i][1]}**: {clean(opts[i][3])}." for i in wrong), f"why{wrong[0] + 1}"),
        ("Remember: " + "; ".join(rules) + ".", "why-r1"),
    ]

def js_step(sid, title, alt, says, actions, check=None):
    out = ["      {", f"        id: {T(sid)},", f"        title: {T(title)},", f"        alt: {T(alt)},", "        say: ["]
    out += [f"          {{ text: {T(t)}" + (f", cue: {T(c)}" if c else "") + " }," for t, c in says]
    out += ["        ],", "        actions: ["] + ["          " + a + "," for a in actions] + ["        ],"]
    if check:
        out.append("        check: " + check + ",")
    out.append("      },")
    return "\n".join(out)

def js_check(cid, pid, q, prompt, opts, skill):
    d = {"id": cid, "skill": skill, "prompt": prompt, "options": []}
    if pid == "original":
        d["source"] = "original"
    else:
        d.update(source="past-paper", question=q, citation=citation(pid, q))
        if PAPERS[pid]["year"]:
            d["year"] = PAPERS[pid]["year"]
        else:
            d["yearNote"] = PAPERS[pid]["note"]
    for text, ok, why, tag in opts:
        o = {"text": text, "why": why}
        if ok: o["correct"] = True
        else: o["misconception"] = tag
        d["options"].append(o)
    return json.dumps(d, ensure_ascii=False, indent=2).replace("\n", "\n        ")

def write_lesson(L):
    steps = []
    title, alt, says, items = L["intro"]
    pre = "pat"
    grid = ", ".join(f"[{s}, {T(t)}, {T(sub)}, {{ {('hl: ' + T(h)) if h else ''} }}]" for s, t, sub, h in items)
    cues = [f"{pre}1", f"{pre}2", f"{pre}{min(3, len(items))}"]
    steps.append(js_step("pattern", title, alt, list(zip(says, cues)), [f'...PLAB.kit.grid("{pre}", [{grid}])']))
    for k, (pid, q, sentence, opts, rules) in enumerate(L["worked"]):
        src = f"{paper_label(pid)}, {q}"
        if "  (the paper had: " in sentence:
            sentence, had = sentence.split("  (the paper had: ")
            src += " · the paper had: " + had.rstrip(")")
        a = f"The sentence {sentence.replace('____', 'with a gap')}, then the candidates: " + "; ".join(
            f"{o[1]} ({'right' if o[2] else 'wrong'})" for o in opts) + f". Source: {src}."
        opt_js = ", ".join(f"[{o[0]}, {T(o[1])}, {'true' if o[2] else 'false'}, {T(o[3])}]" for o in opts)
        steps.append(js_step(f"item{k + 1}", f"{paper_label(pid)} · {q}", a, say_lineup(sentence, opts, rules, src),
            [f'PLAB.kit.clear("clear-item{k + 1}")', f'...PLAB.kit.lineup("why", {T(sentence)}, [{opt_js}], {T(rules)}, {T("Source: " + src)})'.replace('"why"', f'"w{k + 1}"')]))
        # fix cues to the item's own prefix
        steps[-1] = steps[-1].replace('cue: "why', f'cue: "w{k + 1}')
    for k, (pid, q, prompt, opts) in enumerate(L["checks"]):
        ck = js_check(f"{L['id']}-q{k + 1}", pid, q, prompt, opts, L["title"])
        steps.append(js_step(f"try{k + 1}", f"Try it: {paper_label(pid)} · {q}", "The board stays as it is.",
            [(f"A real item from {paper_label(pid)}, {q}. Solve it with the same method.", None)], [], ck))
    body = "\n".join(steps)
    src = f"""/* Lesson 3.{L['n']}: {L['title']}. Generated by tools/content/phase3.py; edit the data there. */
(function () {{
  PLAB.registerLesson({{
    id: {T(L['id'])},
    title: {T(L['title'])},
    phase: 3,
    unit: "p3-css",
    level: {T(L['level'])},
    minutes: {L['minutes']},
    summary: {T(L['summary'])},
    objectives: {T(L['objectives'])},
    steps: [
{body}
    ],
  }});
}})();
"""
    open(f"content/lessons/{L['id']}.js", "w").write(src)

def write_mock():
    steps = []
    rows = ", ".join(f'[null, {T(f"({i + 1}) " + s)}, {{ size: 26 }}]' for i, (s, _) in enumerate(MOCK))
    steps.append(js_step("paper", "The mock paper", "Eight sentences with blanks, numbered 1 to 8, written down the board like an exam question.",
        [("This is a mock question in the CSS format: eight sentences, attempt any five. Give yourself five minutes. These sentences are the app's own, written in the same style as the papers.", "m1"),
         ("Use the method for each one: look left for a partner word, look right, draw the scene or recall the phrase, then test the candidates.", "m5")],
        ['{ do: "write", id: "head", text: "Fill the blanks with appropriate prepositions (any FIVE)", x: 480, y: 40, size: 26, ink: "accent", anchor: "middle" }',
         f'...PLAB.kit.rows("m", [{rows}], {{ y: 95, gap: 64 }})']))
    for k, (s, opts) in enumerate(MOCK):
        ck = js_check(f"p3-mock-q{k + 1}", "original", None, s, opts, "mock paper")
        steps.append(js_step(f"m-q{k + 1}", f"Mock item {k + 1}", "The mock paper stays on the board.",
            [(f"Mock item {k + 1}.", None)], [], ck))
    body = "\n".join(steps)
    src = f"""/* Lesson 3.11: a timed mock question in the CSS format. Generated by tools/content/phase3.py. */
(function () {{
  PLAB.registerLesson({{
    id: "p3-mock",
    title: "Mock question: eight blanks, attempt five",
    phase: 3,
    unit: "p3-css",
    level: "Advanced",
    minutes: 10,
    summary: "A mock question in the exact CSS format, with the app's own sentences covering every pattern from the papers: partner words, phrasal verbs, fixed phrases, place, literary space, time and two blanks.",
    objectives: ["Solve a full question in the CSS format in five minutes.", "Use the four-step method under time pressure."],
    steps: [
{body}
    ],
  }});
}})();
"""
    open("content/lessons/p3-mock.js", "w").write(src)

if __name__ == "__main__":
    for L in LESSONS:
        write_lesson(L)
    write_mock()
    print(len(LESSONS) + 1, "lessons written")
