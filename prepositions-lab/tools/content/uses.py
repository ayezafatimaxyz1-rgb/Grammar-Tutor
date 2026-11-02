"""Where the other choice is right: an example for every "correct English, but a different meaning" (≈).

Every ≈ answer in the course says what that other word would mean. This module adds the second half:
an example sentence where that other word is the right choice. Examples come first from the course
itself (a phrase or verb that has its own lesson elsewhere), then from USE below, written by hand.

    use_for(alt, key=None) -> example sentence or None
      alt  the other choice as a phrase ("give in", "afraid for", "in light of")
      key  for bare prepositions inside a sentence, "sentence|prep" (or "lesson|prep"), looked up in USE first
"""
import glob, os, re

here = os.path.dirname(os.path.abspath(__file__))
plain = lambda ex: re.sub(r"\s+", " ", re.sub(r"\[([^\]]*)\]", r"\1", ex).replace("(no word) ", "").replace(" (no word)", "")).strip()
INDEX = {}
MEANING = {}  # alt -> meaning, from the course's own entries

def _load():
    if INDEX:
        return
    ns = {"N": "N", "D": "D"}
    # Phase 4: every sense of every word.
    ents = []
    ns["W"] = lambda word, level, senses, ask=0, others=(): ents.append((word, senses))
    for f in sorted(glob.glob(os.path.join(here, "p4_*.py"))):
        if f.endswith("p4_base.py"):
            continue
        exec(open(f).read(), ns)
    for word, senses in ents:
        for s in senses:
            prep, ex = s[0], s[2]
            k = word if prep == "(no word)" else f"{word} {prep}"
            INDEX.setdefault(k, plain(ex))
            MEANING.setdefault(k, s[1])
    # Phase 5 and 6: each phrase or verb with its example.
    def surf(phrase, example):
        m = re.search(r"\{([^}]*)\}", example)
        form = m.group(1) or phrase
        s = example[:m.start()] + (form[0].upper() + form[1:] if m.start() == 0 else form) + example[m.end():]
        return re.sub(r"[{}]", "", s)
    ns2 = {"N": "N", "D": "D"}
    ns2["U"] = lambda *a, **k: None
    def add(phrase, meaning, example):
        k = re.sub(r"[\[\]]", "", phrase)
        INDEX.setdefault(k, surf(k, example))
        MEANING.setdefault(k, meaning)
    ns2["F"] = lambda phrase, level, meaning, example, *a, **k: add(phrase, meaning, example)
    ns2["V"] = lambda verb, level, meaning, example, *a, **k: add(verb, meaning, example)
    exec(open(os.path.join(here, "p5_phrases.py")).read(), ns2)
    exec(open(os.path.join(here, "p6_verbs.py")).read(), ns2)
    ns3 = {}
    exec(open(os.path.join(here, "p6_three.py")).read(), ns3)
    for verb, rows in ns3["EXTRA"].items():
        for ex, mean, fit in rows:
            INDEX.setdefault(verb, re.sub(r"[{}]", "", ex))

def use_for(alt, key=None, strict=False):
    """strict: a bare preposition inside one sentence; only a hand-written example for that sentence fits."""
    _load()
    if key and key in USE:
        return USE[key]
    if strict:
        return None
    if alt in USE:
        return USE[alt]
    return INDEX.get(alt)

def meaning_for(alt, key=None, strict=False, reason=""):
    """What the other choice means in its own example: a hand-written meaning first, then the course's
    own entry for that phrase, then the reason given on the board."""
    _load()
    for k in (key, None if strict else alt):
        if k and k in MEAN:
            return MEAN[k]
    if not strict and not (key and key in USE) and alt in MEANING:
        return MEANING[alt]
    r = " ".join(x.strip() for x in reason.split("|"))
    return re.sub(r"^[^=]{1,40}=\s*", "", r) if "=" in r[:42] else r

MEAN = {}  # hand-written meanings for examples whose board reason only fits the original sentence

# Hand-written examples: where the other choice is the right one.
USE = {}
USE.update({
# Phase 4 words
"access for": "The building has easy access for disabled people.", "attach with": "Attach the photo with glue.",
"break out of": "Two prisoners broke out of jail.", "endowed by": "The college was endowed by a rich donor.",
"exception for": "The school made an exception for the sick child.", "filled by": "The post was filled by a young officer.",
"heir of": "He is the heir of a rich landlord.", "knock off": "The cat knocked the cup off the table.",
"mix in": "Mix in the sugar slowly.", "nervous of": "She is nervous of big dogs.",
"talk on": "The professor gave a talk on Iqbal's poetry.", "write for": "He writes letters for people who cannot read.",
# Phase 5 phrases
"in light of": "In light of the new report, the plan was changed.", "in favour with": "The minister is no longer in favour with the prime minister.",
"against": "Ten members voted against the bill.", "in the charge of": "The children were left in the charge of their aunt.",
"on terms with": "The two brothers are on good terms with each other.", "on the face of it": "On the face of it, the plan looks easy.",
"in the case of": "In the case of children, the fee is half.", "by the name of": "A man by the name of Aslam called you.",
"in respect of": "No fee is charged in respect of the first visit.", "in competition with": "Our shop is in competition with the new mall.",
"in the habit of": "He is in the habit of waking up early.", "in want of": "The old house is in want of repair.",
"out of proportion to": "His anger was out of proportion to the small mistake.", "on the other hand": "The job pays well. On the other hand, the hours are long.",
"as a whole": "The country as a whole is getting richer.", "in line with": "Salaries were raised in line with inflation.",
"in a spot": "I am in a spot: I have lost my wallet.", "at last": "At last, the train arrived.",
"in the hands of": "The decision is now in the hands of the court.", "so far": "So far, ten students have passed.",
"at heart": "He looks strict, but at heart he is kind.", "by choice": "She lives alone by choice.",
"by all means": "\"May I sit here?\" \"By all means.\"", "by and by": "By and by, the pain went away.",
"on purpose": "He broke the window on purpose.", "with respect for": "Treat your elders with respect for their age.",
"without doubt": "He is without doubt the best player.", "in effect": "The new law is now in effect.",
"for a while": "Wait here for a while.", "from time to time": "We visit our village from time to time.",
"under construction": "The new bridge is under construction.", "in consideration of": "He was paid in consideration of his services.",
"on the way": "The doctor is on the way.", "under the circumstances": "Under the circumstances, you did your best.",
"in any case": "It may rain, but we will go in any case.", "in order": "Your papers are in order.",
"up to date": "Keep your records up to date.", "beyond question": "Her honesty is beyond question.",
"without question": "He is without question the best student.", "in doubt": "The result of the match is still in doubt.",
"within their means": "Good families live within their means.", "out of reach": "Keep medicines out of reach of children.",
"on the point of": "I was on the point of leaving when he called.", "thanks to": "Thanks to the doctors, she recovered.",
"subsequent to": "Subsequent to the meeting, a report was sent.", "instead of": "Drink water instead of cola.",
# Phase 6 verbs
"bring out": "The company brought out a new phone.", "draw out": "Don't draw out the meeting.", "draw back": "The crowd drew back from the fire.",
"turn in": "I am tired; I will turn in early.", "speed off": "The thief jumped into a car and sped off.", "make off": "The thieves made off with the money.",
"wind down": "The factory is winding down its work.", "blow out": "Blow out the candles.", "keep on": "Keep on trying.",
"keep off": "Keep off the grass.", "turn over": "Turn over the page.", "cut out": "Cut out sugar from your diet.",
"let off": "The teacher let him off with a warning.", "let in": "Open the window and let in fresh air.", "write up": "Write up your notes after the class.",
"carry off": "She carried off the first prize.", "look out": "Look out! A car is coming.", "point at": "Don't point at people.",
"rule over": "The king ruled over a large land.", "rule on": "The court will rule on the case tomorrow.", "wipe off": "Wipe off the dust from the table.",
"wipe up": "Wipe up the spilt milk.", "sort out": "Let me sort out this problem.", "call out": "The teacher called out the names.",
"call up": "I'll call you up tonight.", "see to": "I will see to the guests.", "lay down": "The rules were laid down by the board.",
"lay out": "Lay out the plates on the table.", "go out": "The lights went out.", "pay up": "Pay up, or we will take you to court.",
"show up": "He showed up late for the meeting.", "show in": "Please show in the next visitor.", "catch up": "Walk fast to catch up.",
"catch out": "The teacher caught him out with a hard question.", "pass out": "He passed out in the heat.", "pass over": "They passed over him for the job.",
"count in": "If you are going to the match, count me in.", "count out": "I am too busy; count me out.", "fill up": "Fill up the tank, please.",
"drop out": "He dropped out of college.", "drop off": "I'll drop you off at the station.", "get on": "How are you getting on with your new boss?",
"think up": "She thought up a clever plan.", "come up": "The question of fees came up in the meeting.", "stand by": "I will stand by you.",
"stand out": "Her red dress stood out in the crowd.", "put up": "We can put you up for the night.", "put up to": "Who put you up to this?",
"do without": "We can do without sugar.", "run short of": "We are running short of time.", "come up against": "We came up against many problems.",
"come up to": "His work did not come up to our standard.", "look up at": "Look up at the stars.", "get away from": "We need to get away from the city noise.",
"get along with": "She gets along with everyone.", "catch up on": "I need to catch up on my sleep.", "make up with": "He made up with his brother.",
"stand up to": "She stood up to the bully.", "go in with": "He went in with his cousin to open a shop.", "go for": "I will go for the blue shirt.",
"fall behind with": "They fell behind with the rent.", "get on to": "I'll get on to the bank about the loan.",
})

# "Why this one" boards in Phases 1 and 2: lesson|word
USE.update({
"on-core|in": "The safe is built in the wall.", "on-core|at": "He was standing at the wall, waiting.", "on-core|above": "The clock is above the door.",
"into-onto|in": "The ball is rolling about in the box.", "into-onto|onto": "The ball rolled onto the lid of the box.", "into-onto|to": "The ball rolled to the wall and stopped.",
"within-without|in": "The results will come in ten days.", "within-without|after": "You may apply again after ten days.",
"over-above|above": "The kite flew high above the river.", "under-below|below": "The kitchen is on the floor below.", "under-below|on": "The cat is sleeping on the table.",
"on-top-of|above": "A fan hangs above the books.", "on-top-of|over": "She spread a cloth over the pile of books.",
"front-behind|opposite": "The car is parked opposite the house, across the road.", "front-behind|ahead of": "The bus is ahead of our car.",
"around-round-about|of": "Bang-e-Dra is a book of Iqbal's poems.", "against|for": "Ninety members voted for the bill.",
"to-towards|towards": "We drove towards Lahore, but stopped at Sheikhupura.", "to-towards|into": "We drove into Lahore at noon.",
"through|in": "The train waited in the tunnel for an hour.", "across-along|along": "We swam along the river for a mile.",
"past-by-via|through": "She walked through the bank to the back door.", "up-down|down": "He climbed down the hill to the village.",
"beyond|under": "The car is under repair at the garage.", "throughout|through": "The river passes through Sindh.", "throughout|along": "Trees were planted along the motorway.",
"what-is-a-preposition|under": "The cat is under the table.", "within-time|in": "The work will be finished in two weeks, not before.",
"within-time|after": "You can apply again after two weeks.", "pending|following": "Following the inquiry, he was dismissed.",
"pending|despite": "Despite the inquiry, he kept his job.", "of|from": "The legs were taken from the old table.", "of|for": "I bought new legs for the table.",
"about-on-topic|on": "The professor gave a lecture on cricket history.", "as-like|like": "She talks like a teacher.", "as-like|for": "She works for a teacher as his secretary.",
"except-but-save|besides": "Besides Ali, three more boys came.", "except-but-save|without": "They went to Murree without Ali.",
"including-excluding|including": "The fee is Rs 60,000, including hostel charges.", "including-excluding|besides": "Besides the fee, you pay for books.",
"addition-exception|Except": "Except teaching, she has no job.", "addition-exception|Instead of": "Instead of teaching, she now writes novels.",
"circumstance|In view of": "In view of the fire, the building was closed.", "circumstance|In the wake of": "In the wake of the fire, new rules were made.",
"process|At the expense of": "He finished fast at the expense of quality.", "arrive-at-in|in": "We arrived in Lahore at noon.",
"look-family|for": "I am looking for my keys.", "look-family|at": "Look at the board.", "look-family|into": "The police will look into the theft.",
"die-of-from|from": "Heavy losses resulted from the flood.", "compare-to-with|with": "Compare your answer with the key.",
"responsibility|for": "Ministers are accountable for their decisions.", "familiarity|to": "Her face is familiar to me.",
"separability|it off": "It was too loud, so she turned it off.", "in-idioms|on": "The train left on time.",
})

# Proofs: "sentence with ____|word"
USE.update({
"The students are ____ the hall.|at": "Meet me at the hall gate at nine.", "There is a picture ____ the wall.|at": "He stood at the wall and waited.",
"We stopped ____ a petrol station.|in": "We waited in the petrol station's shop.", "The train leaves ____ 6:30.|in": "The train leaves in thirty minutes.",
"The shops close ____ night.|in": "I woke up twice in the night.", "He is certain ____ success.|about": "I am not certain about the details.",
"They talked ____ the match.|on": "The coach gave a talk on cricket rules.", "She is uncertain ____ the future.|of": "She is uncertain of success.",
"He wrote a book ____ Iqbal.|of": "This is a book of Iqbal's letters.", "He wrote a book ____ Iqbal.|about": "My son is reading a story about Iqbal.",
"She gave a lecture ____ climate change.|about": "We chatted about climate change over tea.", "Write an essay ____ democracy.|about": "Tell me about your village.",
"a table made ____ wood|from": "Paper is made from wood.", "Give the book ____ Ali.|for": "I bought this book for Ali.",
"She wrote a letter ____ her mother.|for": "She wrote a letter for her mother, who cannot write.", "The road was blocked ____ stones.|by": "The road was blocked by the protesters.",
"He jumped ____ the river.|in": "The boys jumped and played in the river.", "Put the files ____ the drawer.|in": "The files are in the drawer.",
"The cat jumped ____ the table.|on": "The children jumped on the bed for fun.", "Divide the sweets ____ the children.|between": "Divide the sweets between the two sisters.",
"A bridge was built ____ the river.|above": "Clouds hung above the river.", "The temperature is ____ 40 degrees.|over": "He is over forty years old.",
"His flat is ____ the shop.|over": "He lives in a flat over the shop.", "We walked ____ the forest.|across": "We walked across the open field.",
"She walked ____ the road.|along": "She walked along the road to the market.", "They swam ____ the river.|along": "They swam along the river bank.",
"We walked ____ the canal.|across": "We walked across the canal bridge.", "It has rained ____ morning.|during": "It rained twice during the morning.",
"Many lost their homes ____ the floods.|since": "Prices have risen since the floods.", "The shop is open ____ ten.|by": "The shop will be open by ten.",
"Who came ____ Ali?|beside": "Who sat beside Ali?", "He fought ____ a lion.|as": "He played the hero as a young actor.",
"She works ____ a teacher.|like": "She talks like a teacher.", "Use the box ____ a table.|like": "This box looks like a table.",
"All passed ____ Hamid.|besides": "Besides Hamid, all the others passed too.", "____ Hamid, five others passed.|except": "All passed except Hamid.",
"____ a car, he owns a bike.|instead of": "He bought a bike instead of a car.", "Drink water ____ cola.|besides": "Besides water, you may drink juice.",
"He sent his son ____ going himself.|besides": "Besides his son, he went himself too.",
"The delay was ____ fog.|because of": "The flight was delayed because of fog.", "His success is ____ hard work.|because of": "He succeeded because of hard work.",
"The accident was ____ carelessness.|because of": "The car crashed because of carelessness.", "The match was stopped ____ rain.|due to": "The stoppage was due to rain.",
"We went ____ Murree.|towards": "We drove towards Murree but turned back.", "He walked ____ school.|towards": "He walked towards school, then stopped at a shop.",
"The dog ran ____ me.|to": "The dog ran to me and licked my hand.", "Wash your hands ____ eating.|after": "Wash your hands after eating too.",
"Finish the work ____ Friday.|after": "We can rest after Friday.", "He reached the station ____ me.|after": "He came after me, ten minutes late.",
"We rested ____ the match.|before": "We rested before the match.", "____ the war, prices rose.|before": "Before the war, prices were low.",
"Call me ____ lunch.|before": "Call me before lunch.", "He left two years ____.|before": "He had left two years before the war.",
"I met her a week ____.|before": "I had met her a week before the wedding.", "The shop opened long ____.|before": "The shop opened long before the mall.",
"The car is parked ____ the house.|behind": "The car is parked behind the house, in the garage.", "The car is parked ____ the house.|opposite": "The car is parked opposite the house, across the road.",
"She stood ____ the class.|behind": "She stood behind the class to watch them.", "Don't walk ____ the camera.|behind": "The photographer stood behind the camera.",
"The garden is ____ the house.|in front of": "There is a lawn in front of the house.", "The garden is ____ the house.|opposite": "There is a park opposite the house.",
"He hid ____ a tree.|in front of": "He stood in front of a tree for the photo.", "The bank is ____ the mosque.|in front of": "The car stopped in front of the mosque gate.",
"The bank is ____ the mosque.|behind": "The graveyard is behind the mosque.", "She sat ____ me at dinner.|in front of": "She sat in front of me in the bus.",
"She sat ____ me at dinner.|behind": "She sat behind me in class.", "They live ____ us.|in front of": "A tree grows in front of our door.",
"They live ____ us.|behind": "They live behind us, in the next street.",
"Ten people came, ____ two children.|excluding": "Ten people came, excluding the children.", "The price is 500 rupees, ____ tax.|excluding": "The price is 500 rupees, excluding tax.",
"Everyone, ____ the teacher, laughed.|excluding": "Everyone, excluding the teacher, laughed.", "The fare is 900 rupees, ____ food.|including": "The fare is 900 rupees, including food.",
"All shops close, ____ pharmacies.|including": "All shops close, including pharmacies.", "Five days a week, ____ Sunday|including": "Seven days a week, including Sunday.",
"Wait ____ the car.|outside": "Wait outside the car; it is too hot inside.", "It is warm ____ the house.|outside": "It is cold outside the house.",
"The children play ____ the house.|inside": "On rainy days the children play inside the house.", "Wait ____ the room.|inside": "Wait inside the room; it is cold.",
"There is a park ____ the city.|inside": "There is a big park inside the city.", "He ran ____ the room.|outside": "The children ran about outside the room.",
"We live ____ the park.|next to": "Our house is next to the park gate.", "We live ____ the park.|by": "We live right by the park.",
"My house is ____ the mosque.|near": "My house is near the mosque, two streets away.", "My house is ____ the mosque.|by": "My house is by the mosque.",
"Sit ____ me.|near": "Sit near me, so you can hear.", "Sit ____ me.|by": "Come and sit by me.",
"They have a house ____ the river.|near": "They live near the river, a short walk away.", "They have a house ____ the river.|next to": "Their house is next to the river bank.",
"He stood ____ the window.|near": "He stood near the window.", "He stood ____ the window.|next to": "He stood next to the window.",
"a cottage ____ the sea|near": "a cottage near the sea", "He walked ____ the bank.|by": "He walked by the bank on his way home.",
"Send it ____ email.|by": "Send it by email.", "He was suspended ____ an inquiry.|following": "He was dismissed following the inquiry.",
"The bill is on hold ____ approval.|following": "The bill became law following approval.", "____ the inquiry, he was dismissed.|pending": "He was suspended pending the inquiry.",
"____ the inquiry, he was dismissed.|given": "Given the inquiry's findings, he was dismissed.", "____ the rains, roads were closed.|given": "Given the rains, we stayed home.",
"I am writing ____ your complaint.|about": "We were talking about your complaint.", "a notice ____ fees|about": "Students were chatting about fees.",
"We talked ____ the fees.|regarding": "A notice regarding the fees was issued.", "____ fees, nothing has changed.|regarding": "Regarding fees, nothing has changed.",
"____ fees, nothing has changed.|about": "We talked about fees.", "She climbed ____ the ladder.|down": "She climbed down the ladder.",
"They walked ____ the hill.|down": "They walked down the hill to the village.", "He came ____ the stairs.|up": "He went up the stairs to his room.",
"I'll be back ____ ten minutes.|within": "Reply within ten minutes.", "The results come out ____ a week.|within": "Results must come out within a week.",
"Reply ____ a week.|in": "The results come out in a week.", "The pain stopped ____ an hour.|in": "The pain will stop in an hour.",
"The pain stopped ____ an hour.|after": "The pain stopped after an hour.", "He returned ____ two days.|within": "Please reply within two days.",
"I met him ____ the bus.|in": "I met him in the car.", "We were ____ a plane for six hours.|in": "We sat in a small car for six hours.",
"We arrived ____ the station.|in": "We waited in the station building.", "They arrived ____ the hotel late.|in": "They stayed in the hotel.",
"She got ____ her bike.|off": "She got off her bike.", "He got ____ a taxi.|out of": "He got out of the taxi.",
"Get ____ the bus at Liberty.|on": "Get on the bus at Liberty.", "We got ____ the plane.|on": "We got on the plane.",
"Get ____ the car slowly.|in": "Get in the car slowly.", "She got ____ the taxi.|in": "She got in the taxi.",
"Turn left ____ the corner.|on": "There is a bakery on the corner.", "Wait for me ____ the corner.|on": "The bank on the corner is closed.",
"There is a bakery ____ the corner.|at": "Turn left at the corner.", "The bank ____ the corner is closed.|at": "Wait for me at the corner.",
"He sat ____ the corner, alone.|at": "Wait for me at the corner of Mall Road.",
"Walk ____ the canal to the bridge.|across": "Walk across the canal bridge.", "Drive ____ this road for a mile.|across": "Walk across this road carefully.",
"Go ____ the hospital.|through": "Go through the hospital to the back gate.", "Go ____ the main gate.|past": "Go past the main gate.",
"Walk ____ the bazaar.|across": "Walk across the bazaar to the other side.", "Walk ____ the bazaar.|past": "Walk past the bazaar.",
"Walk ____ the bridge.|along": "Walk along the bridge and look at the river.", "The post office is ____ the road.|along": "There are shops along the road.",
"The post office is ____ the road.|past": "The post office is past the bank.",
"Prices rose ____ 5 percent.|to": "Inflation rose to 12 percent.", "Prices rose ____ 5 percent.|from": "Inflation rose from 5 percent to 8 percent.",
"Petrol rose ____ 290 rupees.|by": "Petrol rose by 10 rupees.", "Petrol rose ____ 290 rupees.|from": "Petrol rose from 280 to 290 rupees.",
"The score fell ____ zero.|by": "The score fell by ten points.", "The score fell ____ zero.|from": "The score fell from fifty to zero.",
"Apples are sold ____ 250 rupees a kilo.|for": "I bought two kilos of apples for 500 rupees.", "I bought the phone ____ 30,000 rupees.|at": "Phones are on sale at 30,000 rupees each.",
"She sold her gold ____ a good price.|at": "Gold is selling at a good price now.", "The fee is 2,000 rupees ____ student.|for": "I paid 2,000 rupees for one student.",
"He earns 1,500 ____ day.|for": "He was paid 1,500 for a day's work.",
})

# Your sentences (Phase 8): y:lesson|word
USE.update({
"y:dawn|by": "I must reach the station by dawn.", "y:dawn|after": "The shops open after dawn.",
"y:in-on-time|in": "Come in time for dinner.", "y:into|in": "The spider waits in its parlour.",
"y:into|to": "Walk to my door, and I will meet you there.", "y:into|by": "The fly walked by the parlour without going in.",
})

# The exact meaning the word gives in its "where it fits" example (shown after the example).
MEAN.update({
    # Phase 4 words
    "access for": "meant for these people", "attach with": "using it as the tool", "break out of": "escape from inside a place",
    "endowed by": "given money by a founder", "exception for": "a special allowance for someone", "filled by": "done by this person",
    "heir of": "the one who will inherit from a person", "knock off": "push it off a surface", "mix in": "stir it into the rest",
    "nervous of": "afraid of a thing (British English)", "talk on": "give a formal talk about a subject", "write for": "write on someone's behalf",
    "pride of": "the best of; what makes them proud", "resign to": "accept it calmly", "subject of": "the topic of",
    # Phase 5 and 6 phrases and verbs
    "in favour with": "liked by someone powerful", "against": "opposing it", "in the charge of": "looked after by someone",
    "on terms with": "having a (friendly) relationship with", "in the case of": "as for, concerning", "by the name of": "called",
    "in respect of": "concerning, for", "in competition with": "competing against", "in want of": "needing",
    "in line with": "matching, rising with", "subsequent to": "after", "instead of": "in place of",
    "up to date": "current, with the latest information", "on the other hand": "here is the other side of it",
    "turn in": "go to bed", "turn over": "flip to the other side", "call out": "say aloud", "call up": "phone",
    "drop off": "take someone and leave them somewhere", "put up": "give a guest a place to stay", "carry off": "win",
    "cut out": "stop eating or doing it", "go for": "choose", "fill up": "fill completely",
    # Phase 1 and 2 lineups
    "on-core|in": "set inside the wall itself", "on-core|at": "at the point beside the wall, not touching it", "on-core|above": "higher than the door, not on it",
    "into-onto|in": "inside the box the whole time; no entering", "into-onto|onto": "moved and ended on top of the lid", "into-onto|to": "moved as far as the wall, not into it",
    "within-without|in": "at the end of ten days", "within-without|after": "any time once ten days are over",
    "over-above|above": "higher than the river, not crossing it", "under-below|below": "on a lower level, not right under",
    "under-below|on": "resting on the top surface", "on-top-of|above": "higher than the books, not touching", "on-top-of|over": "covering the pile",
    "front-behind|opposite": "facing it from across the road", "front-behind|ahead of": "further along the same road, in front",
    "around-round-about|of": "written by Iqbal (his poems)", "against|for": "in support of the bill",
    "to-towards|towards": "in the direction of Lahore, not reaching it", "to-towards|into": "entered the city",
    "through|in": "inside the tunnel, not moving through", "across-along|along": "lengthwise, following the river",
    "past-by-via|through": "into the bank and out the other side", "up-down|down": "from the top to the bottom",
    "beyond|under": "being repaired right now", "throughout|through": "from one end to the other, not every part",
    "throughout|along": "in a line by the side of the motorway", "what-is-a-preposition|under": "lower than the table, covered by it",
    "within-time|in": "at the end of two weeks", "within-time|after": "any time once two weeks are over",
    "pending|following": "after the inquiry ended", "pending|despite": "even though there was an inquiry",
    "of|from": "taken off the old table (the source)", "of|for": "meant for the table, bought to fit it",
    "about-on-topic|on": "a formal lecture with cricket history as its subject",
    "as-like|like": "in the same way as a teacher, but she is not one", "as-like|for": "her employer is a teacher",
    "except-but-save|besides": "in addition to Ali (Ali came too)", "except-but-save|without": "Ali was left behind",
    "including-excluding|including": "the hostel charges are inside the Rs 60,000", "including-excluding|besides": "in addition to the fee",
    "addition-exception|Except": "teaching is the one thing left out", "addition-exception|Instead of": "writing has replaced teaching",
    "circumstance|In view of": "because of the fire (it is a reason)", "circumstance|In the wake of": "after the fire, as a result of it",
    "process|At the expense of": "losing quality to gain speed",
    "arrive-at-in|in": "reached a city or big area", "look-family|for": "trying to find something lost",
    "look-family|at": "turning the eyes to it", "look-family|into": "investigating it",
    "die-of-from|from": "the flood was the cause of the losses", "compare-to-with|with": "set side by side to find differences",
    "responsibility|for": "must explain the decisions themselves", "familiarity|to": "I know her face (the face is known to me)",
    "separability|it off": "switched it off", "in-idioms|on": "at the planned time, not late",
    # Proofs and pairs
    "The students are ____ the hall.|at": "at the hall as a meeting point", "There is a picture ____ the wall.|at": "beside the wall, not hanging on it",
    "We stopped ____ a petrol station.|in": "inside the shop building", "The train leaves ____ 6:30.|in": "thirty minutes from now",
    "The shops close ____ night.|in": "during the night, at some point in it", "He is certain ____ success.|about": "sure of the details, the facts",
    "They talked ____ the match.|on": "a formal talk with cricket rules as its subject", "She is uncertain ____ the future.|of": "not sure she will succeed",
    "He wrote a book ____ Iqbal.|of": "a book made of Iqbal's own letters", "He wrote a book ____ Iqbal.|about": "a story with Iqbal as its topic",
    "She gave a lecture ____ climate change.|about": "chatting with climate change as the topic", "Write an essay ____ democracy.|about": "tell me things about it",
    "a table made ____ wood|from": "the wood changed into paper", "Give the book ____ Ali.|for": "bought to give to Ali",
    "She wrote a letter ____ her mother.|for": "wrote it on her mother's behalf", "The road was blocked ____ stones.|by": "the protesters did the blocking",
    "He jumped ____ the river.|in": "they were already inside the river, playing", "Put the files ____ the drawer.|in": "already inside; where they are",
    "The cat jumped ____ the table.|on": "jumping up and down on the bed", "Divide the sweets ____ the children.|between": "shared by exactly two",
    "A bridge was built ____ the river.|above": "higher than the river", "The temperature is ____ 40 degrees.|over": "more than forty",
    "His flat is ____ the shop.|over": "on the floor above the shop", "We walked ____ the forest.|across": "from one side of the field to the other",
    "She walked ____ the road.|along": "following its length", "They swam ____ the river.|along": "following the bank lengthwise",
    "We walked ____ the canal.|across": "over the bridge to the other bank", "It has rained ____ morning.|during": "at some times within the morning",
    "Many lost their homes ____ the floods.|since": "from the floods until now", "The shop is open ____ ten.|by": "not later than ten",
    "Who came ____ Ali?|beside": "at Ali's side", "He fought ____ a lion.|as": "when he was a young actor",
    "She works ____ a teacher.|like": "in a teacher's way", "Use the box ____ a table.|like": "similar to a table in looks",
    "All passed ____ Hamid.|besides": "in addition to Hamid", "____ Hamid, five others passed.|except": "Hamid is left out",
    "____ a car, he owns a bike.|instead of": "in place of a car", "Drink water ____ cola.|besides": "in addition to water",
    "He sent his son ____ going himself.|besides": "in addition to his son", "The delay was ____ fog.|because of": "fog was the reason",
    "His success is ____ hard work.|because of": "hard work was the reason", "The accident was ____ carelessness.|because of": "carelessness was the reason",
    "The match was stopped ____ rain.|due to": "caused by rain", "We went ____ Murree.|towards": "in the direction of Murree only",
    "He walked ____ school.|towards": "in the direction of school only", "The dog ran ____ me.|to": "ran and reached me",
    "Wash your hands ____ eating.|after": "when eating is over", "Finish the work ____ Friday.|after": "once Friday is over",
    "He reached the station ____ me.|after": "later than me", "We rested ____ the match.|before": "earlier than the match",
    "____ the war, prices rose.|before": "earlier than the war", "Call me ____ lunch.|before": "earlier than lunch",
    "He left two years ____.|before": "two years earlier than the war", "I met her a week ____.|before": "a week earlier than the wedding",
    "The shop opened long ____.|before": "much earlier than the mall",
    "The car is parked ____ the house.|behind": "at the back of the house", "The car is parked ____ the house.|opposite": "facing the house from across the road",
    "She stood ____ the class.|behind": "at the back of the class", "Don't walk ____ the camera.|behind": "at the back of the camera",
    "The garden is ____ the house.|in front of": "on the side the house faces", "The garden is ____ the house.|opposite": "facing it, across the road",
    "He hid ____ a tree.|in front of": "on the facing side, where he can be seen", "The bank is ____ the mosque.|in front of": "at the facing side of the gate",
    "The bank is ____ the mosque.|behind": "at the back of the mosque", "She sat ____ me at dinner.|in front of": "in the seat ahead of mine",
    "She sat ____ me at dinner.|behind": "in the seat at my back", "They live ____ us.|in front of": "just before our door",
    "They live ____ us.|behind": "at the back of our house",
    "Ten people came, ____ two children.|excluding": "the children are not counted", "The price is 500 rupees, ____ tax.|excluding": "tax is not counted; you pay it extra",
    "Everyone, ____ the teacher, laughed.|excluding": "the teacher is left out", "The fare is 900 rupees, ____ food.|including": "food is counted inside the 900",
    "All shops close, ____ pharmacies.|including": "pharmacies close too", "Five days a week, ____ Sunday|including": "Sunday is counted in the seven",
    "Wait ____ the car.|outside": "out of the car, next to it", "It is warm ____ the house.|outside": "out beyond its walls",
    "The children play ____ the house.|inside": "within its walls", "Wait ____ the room.|inside": "within the room",
    "There is a park ____ the city.|inside": "within the city's limits", "He ran ____ the room.|outside": "out of the room, around it",
    "We live ____ the park.|next to": "right beside, nothing between", "We live ____ the park.|by": "very close to",
    "My house is ____ the mosque.|near": "a short distance from it", "My house is ____ the mosque.|by": "beside it",
    "Sit ____ me.|near": "close to me", "Sit ____ me.|by": "at my side",
    "They have a house ____ the river.|near": "a short distance from it", "They have a house ____ the river.|next to": "right beside it",
    "He stood ____ the window.|near": "close to it", "He stood ____ the window.|next to": "right beside it",
    "a cottage ____ the sea|near": "a short distance from the sea", "He walked ____ the bank.|by": "past the bank",
    "Send it ____ email.|by": "using email as the means",
    "He was suspended ____ an inquiry.|following": "after the inquiry", "The bill is on hold ____ approval.|following": "after approval",
    "____ the inquiry, he was dismissed.|pending": "while waiting for the inquiry to finish", "____ the inquiry, he was dismissed.|given": "considering the findings",
    "____ the rains, roads were closed.|given": "considering the rains",
    "I am writing ____ your complaint.|about": "on the topic of, in everyday talk", "a notice ____ fees|about": "on the topic of, in everyday talk",
    "We talked ____ the fees.|regarding": "concerning (formal writing)", "____ fees, nothing has changed.|regarding": "concerning",
    "____ fees, nothing has changed.|about": "on the topic of",
    "She climbed ____ the ladder.|down": "from the top to the bottom", "They walked ____ the hill.|down": "from the top to the bottom",
    "He came ____ the stairs.|up": "from the bottom to the top",
    "I'll be back ____ ten minutes.|within": "before ten minutes are over", "The results come out ____ a week.|within": "before a week is over",
    "Reply ____ a week.|in": "at the end of a week", "The pain stopped ____ an hour.|in": "at the end of an hour",
    "The pain stopped ____ an hour.|after": "once an hour was over", "He returned ____ two days.|within": "before the two days end",
    "I met him ____ the bus.|in": "inside a car (a small vehicle)", "We were ____ a plane for six hours.|in": "inside a small car",
    "We arrived ____ the station.|in": "inside the building", "They arrived ____ the hotel late.|in": "inside the hotel as guests",
    "She got ____ her bike.|off": "left the bike", "He got ____ a taxi.|out of": "left the taxi",
    "Get ____ the bus at Liberty.|on": "boarded the bus", "We got ____ the plane.|on": "boarded the plane",
    "Get ____ the car slowly.|in": "entered the car", "She got ____ the taxi.|in": "entered the taxi",
    "Turn left ____ the corner.|on": "standing on that corner plot", "Wait for me ____ the corner.|on": "standing on that corner plot",
    "There is a bakery ____ the corner.|at": "at that point where you turn", "The bank ____ the corner is closed.|at": "at that meeting point",
    "He sat ____ the corner, alone.|at": "at the street corner point",
    "Walk ____ the canal to the bridge.|across": "from one side to the other", "Drive ____ this road for a mile.|across": "from one side to the other",
    "Go ____ the hospital.|through": "in one side and out the other", "Go ____ the main gate.|past": "beside it and beyond it, not in",
    "Walk ____ the bazaar.|across": "from one side to the other", "Walk ____ the bazaar.|past": "beside it and on, not into it",
    "Walk ____ the bridge.|along": "following its length", "The post office is ____ the road.|along": "at points beside the road",
    "The post office is ____ the road.|past": "further on, beyond the bank",
    "Prices rose ____ 5 percent.|to": "the new level it reached", "Prices rose ____ 5 percent.|from": "the level it started at",
    "Petrol rose ____ 290 rupees.|by": "the size of the rise", "Petrol rose ____ 290 rupees.|from": "the price it started at",
    "The score fell ____ zero.|by": "the size of the fall", "The score fell ____ zero.|from": "where it started",
    "Apples are sold ____ 250 rupees a kilo.|for": "the total paid in exchange", "I bought the phone ____ 30,000 rupees.|at": "the rate for each phone",
    "She sold her gold ____ a good price.|at": "the rate it sells at", "The fee is 2,000 rupees ____ student.|for": "paid in exchange for one student",
    "He earns 1,500 ____ day.|for": "paid in exchange for one day's work",
    # Your lessons
    "y:dawn|by": "not later than dawn (a deadline)", "y:dawn|after": "later than dawn",
    "y:in-on-time|in": "early enough, with time to spare", "y:into|in": "already inside, not moving in",
    "y:into|to": "as far as my door, not going in", "y:into|by": "past it, without going in",
})

def use_line(p, alt, key=None, strict=False, reason=""):
    """The board line for a ≈ option: its example and what the word means there, or None."""
    ex = use_for(alt, key, strict)
    return f"≈ {p}: {ex}  = {meaning_for(alt, key, strict, reason)}" if ex else None

def use_say(p, alt, key=None, strict=False, reason=""):
    """The spoken add-on for a ≈ option: where it fits and what it means there."""
    ex = use_for(alt, key, strict)
    if not ex: return ""
    m = meaning_for(alt, key, strict, reason)
    return f" Where {p} fits: _{ex}_ There **{p}** means {m}."

USE["y:while-during|in"] = "He explained the rule in the lecture."
MEAN["y:while-during|in"] = "as part of what the lecture said"
USE["y:by-until-over|over"] = "I will read your report over the weekend."
MEAN["y:by-until-over|over"] = "at some time across the whole weekend"
USE["y:within-during|in"] = "The results will come out in three days."
MEAN["y:within-during|in"] = "at the end of three days from now"
USE["y:ago-before|earlier"] = "In 2020, I learnt he had left two years earlier."
MEAN["y:ago-before|earlier"] = "two years before 2020"
