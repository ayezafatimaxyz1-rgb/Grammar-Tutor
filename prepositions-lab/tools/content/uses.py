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
            INDEX.setdefault(word if prep == "(no word)" else f"{word} {prep}", plain(ex))
    # Phase 5 and 6: each phrase or verb with its example.
    def surf(phrase, example):
        m = re.search(r"\{([^}]*)\}", example)
        form = m.group(1) or phrase
        s = example[:m.start()] + (form[0].upper() + form[1:] if m.start() == 0 else form) + example[m.end():]
        return re.sub(r"[{}]", "", s)
    ns2 = {"N": "N", "D": "D"}
    ns2["U"] = lambda *a, **k: None
    ns2["F"] = lambda phrase, level, meaning, example, *a, **k: INDEX.setdefault(re.sub(r"[\[\]]", "", phrase), surf(re.sub(r"[\[\]]", "", phrase), example))
    ns2["V"] = lambda verb, level, meaning, example, *a, **k: INDEX.setdefault(re.sub(r"[\[\]]", "", verb), surf(re.sub(r"[\[\]]", "", verb), example))
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
