"""Prepositions in context: one section that organises the whole course by situation.

Run from prepositions-lab/:  python3 tools/content/context.py
1. Builds the new drawn lessons in context_data.py (transport, directions, numbers) as
   content/lessons/pc-*.js (phase 7), with proofs for their confusing pairs.
2. Writes content/context.js: the sections and chapters, each with a quick-reference table and the
   boards from across the course that belong to it, in teaching order.
"""
import json, os, re, sys, glob
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, here)
import atlas

T = lambda v: json.dumps(v, ensure_ascii=False)
exec(open(os.path.join(here, "atlas_data.py")).read(), atlas.__dict__)   # NOCHECK etc. stay as they are
pair_fn = atlas.D
exec(open(os.path.join(here, "atlas_pairs.py")).read(), atlas.__dict__)
atlas.D = pair_fn  # atlas_pairs.py reuses the name D for its verdicts
atlas.UNITS[:] = []
exec(open(os.path.join(here, "context_data.py")).read(), atlas.__dict__)
atlas.PAIRS.update(atlas.CT_PAIRS)
built = atlas.build(units=atlas.UNITS, prefix="pc", phase=7, var="contextLessons", data_file=None,
                    built_file="context_built.json", label="Prepositions in context", data_src="context_data.py")
new_lessons = {u["id"]: [i for i, _ in u["lessons"]] for u in built}

# ---------------------------------------------------------------- which boards belong where
exists = lambda lid: os.path.exists(f"content/lessons/{lid}.js")
def L(*ids):
    return [dict(lesson=i) for i in ids if exists(i)]

# Phase 4 words: where each one's boards live, and what kind of word it is.
import phase4
for f in sorted(glob.glob(os.path.join(here, "p4_*.py"))):
    exec(open(f).read(), phase4.__dict__)
exec(open(os.path.join(here, "p4_base.py")).read(), phase4.__dict__)
where = {}
for f in glob.glob("content/lessons/p4-*.js"):
    lid = os.path.basename(f)[:-3]
    for w in re.findall(r'id: "([^"]+)-senses"', open(f).read()):
        where[w] = lid
NOUNS = {"access", "advantage", "alternative", "cure", "desire", "effect", "emphasis", "exception", "faith", "heir", "knowledge",
         "need", "pride", "respect", "sympathy", "threat", "trust", "victim", "zeal", "accord", "amount"}
VERBS = set(phase4.BASE4) | {"approve", "attend", "beware"}
words = [e for e in phase4.ENTRIES if e["word"].replace(" ", "-") in where]
def W(kind):
    out = []
    for e in sorted(words, key=lambda e: e["word"]):
        w = e["word"]
        k = "verb" if w in VERBS else "noun" if w in NOUNS else "adj"
        if k == kind:
            out.append(dict(word=w.replace(" ", "-"), lesson=where[w.replace(" ", "-")]))
    return out
def word_table(kind):
    rows = []
    for e in sorted(words, key=lambda e: e["word"]):
        w = e["word"]
        k = "verb" if w in VERBS else "noun" if w in NOUNS else "adj"
        if k == kind:
            for p, m, ex, *_ in e["senses"]:
                rows.append([f"{w} {p}" if p != "(no word)" else w, m, re.sub(r"\[([^\]]*)\]", r"\1", ex).replace("(no word) ", "")])
    return rows
FEELINGS = ["afraid", "alarmed", "amazed", "angry", "anxious", "ashamed", "astonished", "bored", "confident", "disappointed", "disgusted",
            "envious", "fed up", "fond", "furious", "grateful", "happy", "indignant", "interested", "jealous", "keen", "mad", "nervous",
            "pleased", "proud", "satisfied", "sensitive", "shocked", "sorry", "surprised", "suspicious", "thankful", "tired", "upset",
            "wary", "worried", "kind", "cruel", "rude", "polite", "generous", "hostile", "indifferent", "sure", "certain"]
def feel_items():
    return [dict(word=w.replace(" ", "-"), lesson=where[w.replace(" ", "-")]) for w in FEELINGS if w.replace(" ", "-") in where]

P6 = sorted(os.path.basename(f)[:-3] for f in glob.glob("content/lessons/p6-*.js"))
P5 = sorted(os.path.basename(f)[:-3] for f in glob.glob("content/lessons/p5-*.js"))
order6 = ["up", "down", "out", "off", "on", "in", "over", "away", "more", "three"]
P6.sort(key=lambda x: (order6.index(re.sub(r"\d+$", "", x[3:])) if re.sub(r"\d+$", "", x[3:]) in order6 else 99, x))

SECTIONS = [
 dict(id="s1", title="Section 1: Using prepositions correctly in context", chapters=[
  dict(id="time", title="Using prepositions to talk about time",
       intro="Time is a line. AT is a point on it, ON is a day, IN is a stretch; FOR measures, SINCE starts, DURING sits inside, BY is a deadline, UNTIL keeps going.",
       table=[["at", "a clock time or moment", "at 9 o'clock, at noon, at night"], ["on", "a day or date", "on Monday, on 14 August"],
              ["in", "a month, year, season, part of day; time from now", "in July, in 1947, in the morning, in ten minutes"],
              ["for", "how long (a length)", "for two hours, for ten years"], ["since", "from a starting point till now", "since 2015, since Monday"],
              ["during", "inside an event", "during the war, during the film"], ["by", "a deadline: at or before", "by Friday, by six"],
              ["until / till", "all the time up to", "until ten, till evening"], ["from ... to", "a start and an end", "from 9 to 5"],
              ["before / after", "earlier / later than", "before lunch, after the war"], ["within", "before a limit runs out", "within a week"],
              ["ago", "back from now (after the time)", "two years ago"]],
       items=L("p0-attime", "p0-in-on-at-time", "p0-fortime", "p0-for-since-during", "p0-bytime", "p0-by-until", "p0-before",
               "in-time", "in-on-at-time", "for-since", "during-for", "by-until", "before-after", "from-to-till", "within-time", "ago-not-prep", "pending", "py-dawn", "py-parts-of-day", "py-in-on-time", "py-for-since", "py-while-during", "py-by-until-over", "py-from-since", "py-within-during", "py-ago-before", "py-eid", "py-over-time", "py-before-ago-after", "py-at-on-to-upon")),
  dict(id="place", title="Using prepositions when talking about place or location",
       intro="Place is a picture: AT a point, ON a surface or line, IN an area or container; then over, under, beside, between, in front of and the rest place one thing against another.",
       table=[["at", "a point, an address, a meeting place", "at the gate, at 15 Mall Road"], ["on", "a surface, a line, a floor", "on the table, on the coast, on the third floor"],
              ["in", "an area, a container, a room", "in Lahore, in the drawer"], ["inside / outside", "within / beyond the walls", "inside the hall, outside the house"],
              ["over / above", "covering or crossing / only higher", "a bridge over the river, above the clouds"], ["under / below / beneath", "directly beneath / lower level", "under the table, below the hills"],
              ["beside / besides", "at the side of / in addition to", "sit beside me; besides Urdu"], ["near / next to / by", "close / nothing between / at the edge", "near the park, next to the bank, by the sea"],
              ["between / among", "a gap of two / in a crowd", "between Ali and Sara, among friends"], ["in front of / behind / opposite", "facing side / back / across a space", "in front of the house, opposite the mosque"],
              ["around / on top of", "in a circle / on the highest part", "around the fire, on top of the pile"]],
       items=L("p0-at", "p0-on", "p0-in", "p0-in-on-at-place", "p0-inside", "p0-over", "p0-under", "p0-over-above", "p0-beside", "p0-beside-besides",
               "p0-near", "p0-between", "p0-between-among", "p0-front", "p0-around", "in-core", "on-core", "at-core", "in-on-at-place", "inside-outside",
               "within-without", "over-above", "under-below", "on-top-of", "beside-besides", "near-by-next-to", "front-behind", "between-among",
               "around-round-about", "against", "upon", "beyond", "throughout", "py-address", "py-at-on-to-upon", "py-into")),
  dict(id="transport", title="Using prepositions when talking about transportation and travelling",
       intro="BY names the kind of transport; ON and IN say where you are in it; a journey goes FROM a start, VIA a stop, TO a place, and you ARRIVE AT a point or IN an area.",
       table=[["by", "the kind of transport (no a/the)", "by bus, by train, by air"], ["on", "transport with a floor; bikes, horses", "on the bus, on the plane, on my bike"],
              ["in", "cars, taxis, small boats", "in a car, in the taxi"], ["on foot", "walking", "we went on foot"],
              ["get on / get off", "boarding / leaving big transport", "get on the train, get off the bus"], ["get in / get out of", "boarding / leaving a car or taxi", "get in the car, get out of the taxi"],
              ["from ... to", "start and destination", "from Lahore to Karachi"], ["leave for / set off for", "the place you head to", "we leave for Islamabad"],
              ["arrive at / arrive in", "a point / an area (never arrive to)", "arrive at the airport, arrive in Karachi"], ["via", "a stop on the way", "via Dubai"],
              ["on", "a trip, journey, holiday, business", "on holiday, on business"]],
       items=[dict(lesson=i) for i in new_lessons.get("transport", [])] + L("p0-into", "out-of-off", "into-onto", "arrive-at-in", "past-by-via", "py-address", "py-into")),
  dict(id="directions", title="Using prepositions when giving directions",
       intro="Directions are a route told piece by piece: along a road, past a landmark, at a turning, into the next road, across a bridge, through a park, until you reach the place, on your left.",
       table=[["along / down / up", "follow the road's length", "go along Mall Road"], ["past", "beside a landmark and beyond", "go past the mosque"],
              ["at", "the point where you turn", "turn left at the lights"], ["into / onto", "enter the new road", "turn right into Jail Road"],
              ["across", "to the other side", "walk across the bridge"], ["through", "inside, end to end", "go through the park"],
              ["until / as far as", "how far to go", "go straight until the bridge"], ["on", "which side", "it is on your left; on the corner"],
              ["opposite / next to / between", "where the place is", "opposite the bank, next to the school"], ["towards", "in the direction of", "walk towards the river"]],
       items=[dict(lesson=i) for i in new_lessons.get("directions", [])] + L("p0-to", "p0-to-towards", "p0-through", "p0-through-across-along", "p0-past",
               "to-towards", "from", "through", "across-along", "past-by-via", "up-down", "py-address")),
  dict(id="cause", title="Prepositions of cause, reason and purpose",
       intro="A cause comes before its result: because of, due to (after be), owing to, thanks to, for (a reason), from and of (die from / die of). A purpose aims ahead: for + noun or -ing, with a view to + -ing.",
       table=[["because of", "the cause of an action", "stopped because of rain"], ["due to", "caused by (after be)", "the delay was due to fog"],
              ["owing to", "because of (formal)", "owing to illness, he missed it"], ["thanks to", "a good cause", "thanks to the doctors"],
              ["for", "a reason; a purpose", "punished for lying; a knife for cutting"], ["of / from", "an inner cause / an outer cause", "died of cancer, died from injuries"],
              ["with a view to", "with the aim of + -ing", "with a view to buying a house"], ["out of", "a motive", "he helped out of kindness"]],
       items=L("p0-because", "p0-due-because", "p0-for", "cause", "purpose-means", "for", "prep-adverb-conjunction", "reason-cause", "die-of-from", "py-conducive-to")),
  dict(id="means", title="Prepositions of means, method and the doer",
       intro="BY names the doer or the method; WITH names the tool in the hand; THROUGH names the route or the person you used; WITHOUT says something is missing.",
       table=[["by", "the doer (passive); the method", "written by Iqbal; by email, by hand"], ["with", "the tool held; together", "cut with a knife; came with a friend"],
              ["through", "by means of a person or route", "got the job through a friend"], ["without", "not having", "tea without sugar"],
              ["by means of", "using", "lifted by means of a pump"], ["by way of", "as a form of; via", "said nothing by way of apology"]],
       items=L("p0-byagent", "p0-by-with", "p0-with", "with-without", "by-agent-means", "purpose-means", "through", "py-with-by")),
  dict(id="topics", title="Prepositions for topics, opinions and communication",
       intro="ABOUT goes round a topic, ON focuses on a formal subject, OF names the one thing the mind holds; you speak TO a person and agree WITH them, ON a point, TO a proposal.",
       table=[["about", "an everyday topic, many sides", "talk about the match, worried about the future"], ["on", "a formal subject", "a book on Iqbal, a lecture on law"],
              ["of", "the one thing known or felt", "aware of the risk, sure of success"], ["regarding / concerning / with regard to", "about (formal writing)", "regarding your complaint"],
              ["to", "the person spoken or written to", "talk to the manager, write to her"], ["agree with / on / to", "a person / a point / a proposal", "agree with you, on a date, to the terms"],
              ["according to", "as said by a source", "according to the report"], ["in", "a language", "write in English"]],
       items=L("p0-about", "p0-of", "p0-of-about-on", "about-on-topic", "regarding-concerning", "reference", "agree-with-on-to", "conformity")),
  dict(id="feelings", title="Prepositions after feelings and attitudes",
       intro="Feelings point somewhere: angry WITH a person, ABOUT a situation; afraid OF a thing, FOR someone; kind TO people; proud OF; interested IN; good AT.",
       table=[["angry / upset with", "a person", "angry with me"], ["angry / upset / worried about", "a situation", "worried about the exam"],
              ["afraid / proud / fond / tired of", "the thing the feeling holds", "afraid of dogs, proud of her"], ["afraid / sorry for", "someone you feel for", "sorry for the poor"],
              ["kind / cruel / rude / polite to", "the person treated", "kind to animals"], ["interested in", "attention goes inside", "interested in history"],
              ["good / bad at", "a skill", "good at maths"], ["surprised / shocked at (or by)", "the cause of the reaction", "shocked at the news"],
              ["pleased / satisfied with", "a result", "pleased with the result"], ["keen on", "a liking", "keen on cricket"]],
       items=L("feelings", "ability") + feel_items()),
  dict(id="comparison", title="Prepositions of comparison, contrast, addition and exception",
       intro="LIKE is similar, AS is the real role, THAN follows comparatives, TO follows superior/inferior/prefer; DESPITE shows contrast; EXCEPT takes out, BESIDES adds, INSTEAD OF replaces.",
       table=[["like / as", "similar to / in the role of", "sings like a bird; works as a doctor"], ["than", "after comparatives", "taller than me"],
              ["to", "superior, inferior, prefer, similar", "superior to, prefer tea to coffee"], ["different from", "not the same", "different from Arabic"],
              ["despite / in spite of", "even though (+ noun)", "despite the rain"], ["except / but", "leaving out", "all except Ali"],
              ["besides / in addition to", "adding", "besides English"], ["instead of", "replacing", "water instead of cola"],
              ["including / excluding", "inside / outside the total", "including tax"], ["unlike", "in contrast to", "unlike Karachi, Lahore is cold"]],
       items=L("py-to-with-from", "p0-like", "p0-like-as", "p0-except", "p0-except-besides", "p0-despite", "as-like", "unlike", "than-debate", "despite", "except-but-save",
               "including-excluding", "addition-exception", "substitution", "concession", "compare-to-with", "similarity")),
  dict(id="numbers", title="Prepositions with numbers, money and measurement",
       intro="On a scale, AT is a mark, OVER and UNDER are more and less, BETWEEN is a range, BY is the size of a change, TO is where it ended, PER is for each, FOR is a total paid, OUT OF is a score.",
       table=[["at", "a price level, speed, age, rate", "at 300 a kilo, at 80 km an hour, at sixty"], ["for", "the total paid", "bought it for 500"],
              ["per", "for each unit", "50 per person"], ["by", "the size of a change", "rose by 10 percent"], ["to", "where a change ended", "rose to 200"],
              ["from ... to", "start and end of a change or range", "from 100 to 120"], ["between ... and", "a range", "between 5 and 10"],
              ["over / under", "more / less than", "over a million, under five"], ["out of", "a score or share", "85 out of 100"],
              ["in", "the unit or currency", "pay in dollars, in metres"], ["up to", "the most", "up to 500 people"]],
       items=[dict(lesson=i) for i in new_lessons.get("numbers", [])] + L("per-plus-minus-versus", "comparison-measure", "increase-decrease", "py-price")),
 ]),
 dict(id="s2", title="Section 2: Using prepositions correctly after certain common English verbs", chapters=[
  dict(id="verbs", title="Verbs and the prepositions they take, A to Z",
       intro="Each verb keeps its own meaning, and the preposition adds its picture: depend (hang) + on (resting on) = rely on. Some verbs take two or three prepositions, each saying something different.",
       table=word_table("verb"),
       items=L("py-dispense-dispose", "py-insure", "py-to-with-from", "py-congratulate-on", "depend-rely", "believe-in", "apply-for-to", "agree-with-on-to", "arrive-at-in", "look-family", "object-pattern", "abstain-refrain",
               "die-of-from", "compare-to-with", "no-preposition", "redundant", "missing", "wrong-choice", "formal-alternatives") + W("verb")),
  dict(id="phrasal", title="Phrasal verbs and three-word verbs",
       intro="The particle carries the meaning: up = completely or more, off = away, out = into the open or gone, down = lower or onto paper. The same verb with another particle is another verb.",
       table=[["up", "completely, more, into view, into being", "give up, speed up, turn up, set up"], ["down", "lower, rejected, onto paper", "turn down, put down, write down"],
              ["out", "to the end, into the open, gone", "carry out, find out, put out"], ["off", "away, separated, set going", "call off, cut off, set off"],
              ["on", "continuing, attached, onto you", "carry on, catch on, take on"], ["in / into", "inward, entering, giving way", "hand in, look into, give in"],
              ["over", "across, past, across the whole", "take over, get over, go over"], ["away / back", "gone / returned or kept behind", "pass away, pay back, hold back"],
              ["three-word verbs", "verb + particle + preposition", "put up with, look forward to, do away with"]],
       items=L("phrasal-vs-prepositional", "separability", "three-part") + [dict(lesson=i) for i in P6]),
 ]),
 dict(id="s3", title="Section 3: Using prepositions correctly after adjectives and nouns, and in fixed phrases", chapters=[
  dict(id="adjectives", title="Adjectives and the prepositions they take, A to Z",
       intro="An adjective describes a state, and the preposition points to what the state is about: afraid of, good at, interested in, responsible for.",
       table=word_table("adj"),
       items=L("feelings", "ability", "responsibility", "similarity", "familiarity", "formal-adjectives", "py-conducive-to", "py-married-to") + W("adj")),
  dict(id="nouns", title="Nouns and the prepositions they take",
       intro="Many nouns keep the preposition of their verb or adjective, but some change: the reason for, the cause of, a demand for, access to, an increase in.",
       table=word_table("noun"),
       items=L("py-member-of", "reason-cause", "demand-need", "access-approach", "increase-decrease", "relationship") + W("noun")),
  dict(id="phrases", title="Fixed prepositional phrases and idioms",
       intro="Fixed phrases keep their preposition, and the preposition still fits its picture: in lieu of (in a place), by dint of (by a means), at the behest of (at a point).",
       table=[["in ...", "inside a state or frame", "in lieu of, in spite of, in view of, in charge of"], ["on ...", "resting on a base or edge", "on behalf of, on account of, on the verge of"],
              ["at ...", "a point of control, price or state", "at the behest of, at the cost of, at stake"], ["by ...", "a means or a way", "by dint of, by virtue of, by heart"],
              ["with / without ...", "joined to a topic / no link", "with regard to, without fail"], ["for ...", "aim or cause", "for the sake of, for want of"],
              ["under ...", "below a cover or process", "under the auspices of, under way"], ["out of / beyond / within", "outside / past / inside a limit", "out of order, beyond doubt, within reach"]],
       items=L("in-idioms", "on-at-idioms", "by-out-of-idioms", "circumstance", "process", "representation", "py-to-order") + [dict(lesson=i) for i in P5]),
 ]),
]

open("content/context.js", "w").write("/* Prepositions in context: the course organised by situation. Generated by tools/content/context.py. */\nPLAB.context = "
                                      + json.dumps(SECTIONS, ensure_ascii=False, indent=1) + ";\n")
n_ch = sum(len(s["chapters"]) for s in SECTIONS)
print(sum(len(u["lessons"]) for u in built), "new lessons;", n_ch, "chapters;",
      ", ".join(f"{c['id']}={len(c['items'])}" for s in SECTIONS for c in s["chapters"]))
