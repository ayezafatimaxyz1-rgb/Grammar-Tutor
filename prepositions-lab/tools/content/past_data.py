"""Past-tense boards for the time lessons in yours_data.py: each preposition in past sentences,
and what the past tense changes. Rows: (picture, sentence, highlighted words, note)."""
PAST = {
"dawn": [("In the past: AT, BY, AFTER dawn", [
    ("onTimeDot", "We left the house at dawn.", "at", "past: still AT, dawn is one point"),
    ("priorDot", "We had reached the station by dawn.", "by", "past BY: had + reached, done before dawn"),
    ("afterDot", "The bus left after dawn.", "after", "AFTER: later than dawn")]),
  ("In the past: IN the morning, ON Monday", [
    ("inPeriod", "I woke up early in the morning.", "in", "IN the morning: a stretch, past or not"),
    ("calendar", "We met on Monday morning.", "on", "a named day takes ON, even in the past"),
    ("onTimeDot", "The guests went home at midnight.", "at", "AT midnight: one point")])],
"in-on-time": [("In the past: ON time, IN time, AT that time", [
    ("onTimeDot", "The train left on time.", "on time", "ON time: at the planned time, not late"),
    ("inTimeBefore", "We reached the airport in time for the flight.", "in time", "IN time: early enough, before it was too late"),
    ("clock", "At that time, I lived in Quetta.", "At that time", "AT THAT TIME: one point in the past")])],
"for-since": [("In the past: FOR and SINCE", [
    ("span", "I lived in Karachi for ten years.", "for", "lived + FOR: the ten years are over; I left"),
    ("span", "I have lived in Karachi for ten years.", "for", "have lived + FOR: the ten years reach now"),
    ("sincePoint", "By 2020, she had lived there since 2015.", "since", "had + SINCE: up to a past point, 2020")]),
  ("In the past: SINCE, FROM, OVER", [
    ("sincePoint", "It was the first rain since March.", "since", "from March up to that past day"),
    ("betweenTicks", "I worked there from 2016 to 2019.", "from", "FROM ... TO: a closed piece in the past"),
    ("rising", "Over the years, the village grew into a town.", "Over", "OVER: across the past years, while it changed")])],
"parts-of-day": [("In the past: IN the evening, AT midnight, ON Friday night", [
    ("inPeriod", "It rained heavily in the evening.", "in", "IN the evening: a stretch, past or not"),
    ("clock", "The plane landed at midnight.", "at", "AT midnight: one point"),
    ("calendar", "He arrived on Friday night.", "on", "a named day takes ON: on Friday night")])],
"while-during": [("In the past: DURING, WHILE, FOR", [
    ("span", "I fell asleep during the lecture.", "during", "DURING + a noun, past or not"),
    ("speak", "He called while I was cooking.", "while", "past WHILE: was / were + -ing for the long action"),
    ("ruler", "I slept for ten minutes.", "for", "FOR: how long it lasted")]),
  ("In the past: one stretch, two ways", [
    ("speak", "While I was walking home, it started to rain.", "While", "long action (was walking) + short action (started)"),
    ("span", "During my stay in Murree, it snowed twice.", "During", "DURING + a noun: my stay"),
    ("speak", "While I was staying in Murree, it snowed twice.", "While", "the same stretch as an action: was staying")])],
"by-until-over": [("In the past: BY, UNTIL, NOT UNTIL", [
    ("priorDot", "I had finished the report by Friday.", "by", "past BY: had + finished, done before Friday"),
    ("notUntil", "I waited until six, then went home.", "until", "past UNTIL: the waiting went on, then stopped"),
    ("notUntil", "He didn't come until Monday.", "until", "NOT UNTIL: he came on Monday, not before")]),
  ("In the past: OVER, BY THE TIME", [
    ("allThrough", "We went to Murree over the weekend.", "over", "OVER: some time across that past weekend"),
    ("priorDot", "By the time we arrived, the train had left.", "By the time", "by the time + past, then had + left"),
    ("priorDot", "By 2010, he had become a doctor.", "By", "BY a past year: had + become")])],
"from-since": [("In the past: FROM or SINCE?", [
    ("betweenTicks", "She lived in Lahore from 2015 to 2020.", "from", "lived + FROM ... TO: closed; she left"),
    ("sincePoint", "She has lived in Lahore since 2015.", "since", "has lived + SINCE: she still lives there"),
    ("sincePoint", "By 2020, she had lived in Lahore since 2015.", "since", "had lived + SINCE: up to a past point")]),
  ("In the past: more FROM and SINCE", [
    ("pointFuture", "From that day on, he never smoked again.", "From", "FROM a past day: a start, and it went on"),
    ("sincePoint", "I haven't seen him since he left.", "since", "SINCE + a past event, up to now"),
    ("cross", "She lived in Lahore since 2015.", "since", "wrong: lived is closed. Say from 2015 to 2020")])],
"eid": [("In the past: AT Eid, ON Eid day, IN Ramazan", [
    ("onTimeDot", "Last year, we went to Lahore at Eid.", "at", "past: still AT the festival time"),
    ("calendar", "It rained on Eid day.", "on", "one calendar day: ON, past or not"),
    ("inPeriod", "We fasted in Ramazan and visited Murree during the Eid holidays.", "in", "a month: IN; the holiday stretch: DURING")])],
"over-time": [("In the past: OVER", [
    ("rising", "His English improved a lot over the summer.", "over", "across the past summer, while it changed"),
    ("calendar", "We went to Murree over the weekend.", "over", "some time during that past weekend"),
    ("excess", "I waited for over an hour.", "over", "more than an hour")])],
"within-during": [("In the past: WITHIN, IN, AFTER", [
    ("inTimeBefore", "The ambulance arrived within ten minutes.", "within", "past WITHIN: it came before ten minutes ran out"),
    ("inPeriod", "He finished the job in three days.", "in", "past IN: the job TOOK three days, not 'from now'"),
    ("afterDot", "He returned after two days.", "after", "past AFTER: two days later than he left")]),
  ("In the past: DURING, LATER", [
    ("span", "The lights went out during the match.", "during", "DURING an event, past or not"),
    ("afterDot", "He returned two days later.", "later", "LATER: after a past point"),
    ("inTimeBefore", "He said he would return in two days.", "in", "IN two days from the time he spoke")])],
}

# Boards for the other time lessons (Phase 1, the sense atlas and the time chapter), spliced in by past.py.
_ATONIN = [("In the past: AT, ON, IN with time", [
    ("clock", "The meeting began at 9 o'clock.", "at", "AT a clock time, past or not"),
    ("calendar", "We got married on 5 May 2019.", "on", "ON a day or a date"),
    ("inPeriod", "Pakistan was created in 1947.", "in", "IN a year, month or season")]),
  ("In the past: AT THAT TIME, IN THOSE DAYS", [
    ("cross", "I met her last Monday.", "last Monday", "no AT / ON before last, next, this, every"),
    ("clock", "At that time, I was a student.", "At that time", "AT THAT TIME: one point in the past"),
    ("inPeriod", "In those days, there was no motorway.", "In those days", "IN THOSE DAYS: a stretch in the past")])]
_IN = [("In the past: IN + a length", [
    ("inPeriod", "He was born in 1998.", "in", "IN a past year"),
    ("inPeriod", "He finished the job in three days.", "in", "past IN + a length: the job TOOK three days"),
    ("afterDot", "He came back two days later.", "later", "counting from a past point: LATER, not IN")])]
_BEFORE = [("In the past: BEFORE, AFTER", [
    ("priorDot", "I had eaten before he arrived.", "before", "the earlier action can take had + done"),
    ("afterDot", "After the war ended, prices rose.", "After", "AFTER + a past event"),
    ("priorDot", "He left two years before the war.", "before", "a length + BEFORE: earlier than a past event")]),
  ("In the past: AGO, BEFORE, LATER", [
    ("pointPast", "He left two years ago.", "ago", "AGO: counted back from NOW"),
    ("priorDot", "He had left two years before.", "before", "counted back from a PAST point: BEFORE, not ago"),
    ("afterDot", "She arrived two days later.", "later", "counted forward from a past point: LATER")])]
_AGO = [("In the past: AGO", [
    ("pointPast", "I met him three days ago.", "ago", "AGO + past simple: met, went, saw"),
    ("cross", "I have met him three days ago.", "ago", "wrong: AGO never takes have. Say I met him"),
    ("sincePoint", "I have not met him since Monday.", "since", "up to now? use SINCE with have")])]
_PENDING = [("In the past: PENDING, FOLLOWING, DURING", [
    ("notWait", "He was suspended pending an inquiry.", "pending", "PENDING: while they were still waiting for it"),
    ("followEvent", "He was dismissed following the inquiry.", "following", "FOLLOWING: after the past event"),
    ("span", "During the inquiry, he stayed at home.", "During", "DURING: inside the inquiry")])]

PAST_OTHER = {
    "p0-attime": _ATONIN, "p0-in-on-at-time": _ATONIN, "in-on-at-time": _ATONIN, "in-time": _IN + _ATONIN[1:],
    "p0-fortime": PAST["for-since"], "for-since": PAST["for-since"], "p0-for-since-during": PAST["for-since"][:1] + PAST["while-during"][:1],
    "during-for": PAST["while-during"], "p0-bytime": PAST["by-until-over"], "p0-by-until": PAST["by-until-over"], "by-until": PAST["by-until-over"],
    "p0-before": _BEFORE, "before-after": _BEFORE, "from-to-till": PAST["from-since"], "within-time": PAST["within-during"],
    "ago-not-prep": _AGO + _BEFORE[1:], "pending": _PENDING,
}

# Movement lessons: TO my address (something moves there) or AT my address (the spot where I am).
_ADDRESS = [("Send it TO my address, or AT my address?", [
    ("goHome", "Send the letter to my home address.", "to", "SEND moves the letter: movement towards a place takes TO"),
    ("house", "You can contact me at my home address.", "at", "no movement: the spot where I am takes AT"),
    ("goHome", "Send it to me at my home address.", "to me at", "TO = where it goes · AT = where I can be found")]),
  ("Moving verbs take TO, staying verbs take AT", [
    ("arrowR", "Post the parcel to my office.", "to", "post, send, deliver, bring, go: something moves, so TO"),
    ("house", "I live at 15 Mall Road.", "at", "live, stay, wait, meet me: no movement, so AT"),
    ("cross", "Send the letter at my home address.", "at", "wrong: AT does not show the movement")])]
MOVE = {"to-towards": _ADDRESS, "p0-to": _ADDRESS, "p0-to-towards": _ADDRESS, "arrive-at-in": _ADDRESS}

# Place lessons: AT, ON, IN with an address, then TO (moving there) vs AT (the spot).
_PLACE_ADDRESS = [("AT, ON, IN with an address", [
    ("house", "I live at 15 Mall Road.", "at", "a house number: one exact spot, so AT"),
    ("roadPass", "I live on Mall Road.", "on", "a street with no number: a line, so ON"),
    ("inCity", "I live in Lahore.", "in", "a city or area: inside its borders, so IN")])] + _ADDRESS[:1]
MOVE.update({"in-on-at-place": _PLACE_ADDRESS, "p0-at": _PLACE_ADDRESS, "p0-in-on-at-place": _PLACE_ADDRESS})

# TO as matching a pattern, in the atlas TO lesson.
_TO_PATTERN = [("TO can also mean: made to match a pattern", [
    ("fitMould", "The baker bakes cakes to order.", "to order", "made to match each customer's order"),
    ("ruler", "The tailor made the suit to measure.", "to measure", "made to match your size"),
    ("scale", "The map is drawn to scale.", "to scale", "made to match the real sizes in one ratio")])]
MOVE["p0-to"] = MOVE["p0-to"] + _TO_PATTERN
MOVE["to-towards"] = MOVE["to-towards"] + _TO_PATTERN
