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
"within-during": [("In the past: WITHIN, IN, AFTER", [
    ("inTimeBefore", "The ambulance arrived within ten minutes.", "within", "past WITHIN: it came before ten minutes ran out"),
    ("inPeriod", "He finished the job in three days.", "in", "past IN: the job TOOK three days, not 'from now'"),
    ("afterDot", "He returned after two days.", "after", "past AFTER: two days later than he left")]),
  ("In the past: DURING, LATER", [
    ("span", "The lights went out during the match.", "during", "DURING an event, past or not"),
    ("afterDot", "He returned two days later.", "later", "LATER: after a past point"),
    ("inTimeBefore", "He said he would return in two days.", "in", "IN two days from the time he spoke")])],
}
