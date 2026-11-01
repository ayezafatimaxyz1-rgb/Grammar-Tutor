# Proof sets for the Phase 1 comparison lessons that have no matching atlas pair.
# Same format as atlas_pairs.py, plus pictures for each preposition. Used by proofs.py.
N, D = "N", "D"

P1_PROOFS = {
"around-round-about": dict(order=["around", "about"], pics={"around": "surrounded", "about": "aboutCircle"}, prove={
  "around": dict(logic=["AROUND: in a circle, or on every side of a place."], ask="Is it a circle, or all the sides of a place?", ex=[
    ("They sat [around] the fire.", "a circle of people | round the fire", {"about": (N, "about is for topics, | not a circle")}),
    ("The earth moves [around] the sun.", "a circle round the sun", {"about": (N, "about the sun = | a topic")}),
    ("A wall runs [around] the fort.", "on every side", {"about": (N, "not a topic")})]),
  "about": dict(logic=["ABOUT: a topic you talk, think or write about."], ask="Is it a topic?", ex=[
    ("We talked [about] the trip.", "the trip is the topic", {"around": (N, "around is a place, | not a topic")}),
    ("a film [about] the war", "the war is its topic", {"around": (N, "the film is not | in a circle")}),
    ("I was thinking [about] you.", "you are the topic | of my thoughts", {"around": (N, "not a circle")})]),
}),
"before-after": dict(order=["before", "after", "ago"], pics={"before": "priorDot", "after": "afterDot", "ago": "pointPast"}, prove={
  "before": dict(logic=["BEFORE: earlier than an event or a time."], ask="Is it earlier than a named event or time?", ex=[
    ("Wash your hands [before] eating.", "washing comes earlier | than eating", {"after": (D, "after eating = later"), "ago": (N, "ago comes after a length | of time: two days ago")}),
    ("Finish the work [before] Friday.", "earlier than Friday", {"after": (D, "after Friday = later"), "ago": (N, "ago does not take | a day")}),
    ("He reached the station [before] me.", "earlier than my arrival", {"after": (D, "later than me"), "ago": (N, "ago needs a length | from now")})]),
  "after": dict(logic=["AFTER: later than an event or a time."], ask="Is it later than a named event or time?", ex=[
    ("We rested [after] the match.", "the rest came later", {"before": (D, "before = earlier"), "ago": (N, "ago is never before | a noun")}),
    ("[After] the war, prices rose.", "the rise came later | than the war", {"before": (D, "before = earlier"), "ago": (N, "not used")}),
    ("Call me [after] lunch.", "later than lunch", {"before": (D, "earlier"), "ago": (N, "not used")})]),
  "ago": dict(logic=["AGO: counts back from now.", "It comes AFTER a length of time."], ask="Is it a length of time counted back from now?", ex=[
    ("He left two years [ago].", "two years back from now", {"before": (D, "two years before = | before another past event"), "after": (N, "not used")}),
    ("I met her a week [ago].", "a week back from today", {"before": (D, "a week before = | before something else"), "after": (N, "not used")}),
    ("The shop opened long [ago].", "far back from now", {"before": (D, "long before = before | another time"), "after": (N, "not used")})]),
}),
"despite": dict(order=["despite", "in spite", "although"], pics={"despite": "umbrellaRain", "in spite": "cross", "although": "umbrellaRain"}, prove={
  "despite": dict(logic=["DESPITE: even with something against it.", "It takes a noun or an -ing word."], ask="Is a noun or -ing word after it?", ex=[
    ("[Despite] the rain, we played.", "the rain is a noun; | the game went on", {"although": (N, "although needs a clause: | although it rained"), "in spite": (N, "keep of: | in spite of")}),
    ("He failed [despite] working hard.", "working is an -ing word", {"although": (N, "needs a clause: | although he worked"), "in spite": (N, "keep of")}),
    ("[Despite] his illness, he came.", "a noun after it", {"although": (N, "needs a clause"), "in spite": (N, "in spite of his illness")})]),
  "although": dict(logic=["ALTHOUGH joins a whole clause:", "a subject and a verb."], ask="Is a full clause (subject + verb) after it?", ex=[
    ("[Although] it rained, we played.", "it rained: a clause", {"despite": (N, "despite cannot take | a clause"), "in spite": (N, "in spite of needs | a noun")}),
    ("[Although] he worked hard, he failed.", "he worked: a clause", {"despite": (N, "despite + clause | is wrong"), "in spite": (N, "not used")}),
    ("She smiled, [although] she was tired.", "she was tired: | a clause", {"despite": (N, "needs a noun: | despite her tiredness"), "in spite": (N, "not used")})]),
}),
"from-to-till": dict(order=["from", "since"], pics={"from": "span", "since": "sincePoint"}, prove={
  "from": dict(logic=["FROM: a start, with an end (from ... to),", "or a start in the future."], ask="Is there an end (to, till), or does it start in the future?", ex=[
    ("The shop is open [from] nine to five.", "a start and an end", {"since": (N, "since runs up to now, | with no end")}),
    ("I worked there [from] 2010 to 2015.", "start and end, | both in the past", {"since": (N, "since needs | have worked, till now")}),
    ("[From] Monday, classes start at eight.", "a start in the future", {"since": (N, "since looks back, | not forward")})]),
  "since": dict(logic=["SINCE: from a past start up to now.", "It goes with have/has (present perfect)."], ask="Did it start in the past and continue till now?", ex=[
    ("I have known him [since] 2010.", "2010 up to now", {"from": (N, "from needs an end | or a future start")}),
    ("She has been ill [since] Monday.", "Monday up to now", {"from": (N, "from Monday needs | an end: to Friday")}),
    ("He has lived here [since] childhood.", "childhood up to now", {"from": (N, "from needs an end")})]),
}),
"front-behind": dict(order=["in front of", "behind", "opposite"], pics={"in front of": [["person", -32, 0], ["arrowR", 22, 24, 0.4], ["box", 78, 24, 0.4]], "behind": [["box", 4, 24, 0.4], ["person", 25, 0]], "opposite": "faces"}, prove={
  "in front of": dict(logic=["IN FRONT OF: on the side something faces,", "with nothing between."], ask="Is it on the facing side, close, with nothing between?", ex=[
    ("The car is parked [in front of] the house.", "on the side the house | faces, nothing between", {"behind": (D, "behind = at the back"), "opposite": (D, "opposite = across | the road from it")}),
    ("She stood [in front of] the class.", "facing the class, | no space between", {"behind": (D, "at the back"), "opposite": (N, "no road or table | between them")}),
    ("Don't walk [in front of] the camera.", "the side it faces", {"behind": (D, "at its back"), "opposite": (N, "not across a space")})]),
  "behind": dict(logic=["BEHIND: at the back of something,", "often hidden."], ask="Is it at the back?", ex=[
    ("The garden is [behind] the house.", "at the back side", {"in front of": (D, "the facing side"), "opposite": (D, "across a road")}),
    ("He hid [behind] a tree.", "at the back, | hidden", {"in front of": (D, "then he is seen"), "opposite": (N, "not across a space")}),
    ("Who is [behind] this plan?", "hidden at the back: | the person causing it", {"in front of": (N, "not a place here"), "opposite": (N, "not used")})]),
  "opposite": dict(logic=["OPPOSITE: facing each other", "across a space: a road, a table."], ask="Do they face each other across a space?", ex=[
    ("The bank is [opposite] the mosque.", "a road between; | they face each other", {"in front of": (D, "in front of = | nothing between"), "behind": (D, "at the back")}),
    ("She sat [opposite] me at dinner.", "a table between; | face to face", {"in front of": (D, "close, no table between"), "behind": (D, "at my back")}),
    ("They live [opposite] us.", "across the street", {"in front of": (D, "right before our door"), "behind": (D, "at the back")})]),
}),
"including-excluding": dict(order=["including", "excluding"], pics={"including": "stackAdd", "excluding": "exceptOne"}, prove={
  "including": dict(logic=["INCLUDING: counted as part of the total."], ask="Is it part of the total?", ex=[
    ("Ten people came, [including] two children.", "the children are part | of the ten", {"excluding": (D, "then twelve came")}),
    ("The price is 500 rupees, [including] tax.", "the tax is inside | the 500", {"excluding": (D, "tax is extra")}),
    ("Everyone, [including] the teacher, laughed.", "the teacher was | part of everyone", {"excluding": (D, "the teacher did not")})]),
  "excluding": dict(logic=["EXCLUDING: kept out of the total."], ask="Is it kept out of the total?", ex=[
    ("The fare is 900 rupees, [excluding] food.", "food is not in | the 900", {"including": (D, "food is inside the 900")}),
    ("All shops close, [excluding] pharmacies.", "pharmacies are left out", {"including": (D, "pharmacies close too")}),
    ("Five days a week, [excluding] Sunday", "Sunday is left out", {"including": (D, "Sunday is counted")})]),
}),
"inside-outside": dict(order=["inside", "outside", "out of"], pics={"inside": "insideBuilding", "outside": "personLeft", "out of": "goOut"}, prove={
  "inside": dict(logic=["INSIDE: within the walls; a position."], ask="Is it within the walls?", ex=[
    ("Wait [inside] the car.", "within the car", {"outside": (D, "outside = beyond it"), "out of": (N, "out of needs | movement leaving")}),
    ("It is warm [inside] the house.", "within the walls", {"outside": (D, "beyond the walls"), "out of": (N, "no movement")})]),
  "outside": dict(logic=["OUTSIDE: beyond the walls; a position."], ask="Is it a place beyond the walls, with no movement out?", ex=[
    ("The children play [outside] the house.", "a place beyond the walls", {"inside": (D, "within"), "out of": (N, "out of needs | movement leaving")}),
    ("Wait [outside] the room.", "a position beyond it", {"inside": (D, "within"), "out of": (N, "no movement")}),
    ("There is a park [outside] the city.", "beyond its edge", {"inside": (D, "within the city"), "out of": (N, "not leaving")})]),
  "out of": dict(logic=["OUT OF: movement from inside to outside."], ask="Is something leaving the inside?", ex=[
    ("He ran [out of] the room.", "from inside to outside", {"outside": (D, "ran outside the room = | ran about out there"), "inside": (N, "opposite")}),
    ("Take the cake [out of] the oven.", "it leaves the inside", {"outside": (N, "no movement"), "inside": (N, "opposite")}),
    ("She got [out of] bed.", "leaving the bed", {"outside": (N, "not a position"), "inside": (N, "opposite")})]),
}),
"near-by-next-to": dict(order=["near", "next to", "by"], pics={"near": "nearSchool", "next to": "sideBySide", "by": "nearbyShop"}, prove={
  "near": dict(logic=["NEAR: a short distance away.", "Other things may be in between."], ask="Is it a short distance, maybe with things between?", ex=[
    ("We live [near] the park.", "a short walk away", {"next to": (D, "next to = nothing | between"), "by": (D, "by the park = | right at its edge")}),
    ("Is there an ATM [near] here?", "close to this place", {"next to": (N, "next to here | is not used"), "by": (N, "by here is not used")})]),
  "next to": dict(logic=["NEXT TO: the very next place.", "Nothing in between."], ask="Is it the very next place, with nothing between?", ex=[
    ("My house is [next to] the mosque.", "the very next building", {"near": (D, "near = maybe a few | houses away"), "by": (D, "by = at its side")}),
    ("Sit [next to] me.", "the very next seat", {"near": (D, "near = close, | maybe not beside"), "by": (D, "by me = at my side, | less common")})]),
  "by": dict(logic=["BY: right at the side or edge of."], ask="Is it right at the side or edge?", ex=[
    ("They have a house [by] the river.", "at the river's edge", {"near": (D, "near = a short | distance away"), "next to": (D, "next to = | touching close")}),
    ("He stood [by] the window.", "at the window's side", {"near": (D, "a little further"), "next to": (D, "very similar")}),
    ("a cottage [by] the sea", "at the sea's edge", {"near": (D, "a little further"), "next to": (N, "the sea is not | a neighbour building")})]),
}),
"out-of-off": dict(order=["out of", "off"], pics={"out of": "goOut", "off": "bounceOff"}, prove={
  "out of": dict(logic=["OUT OF: leaving the inside of something."], ask="Is it leaving an inside (a car, a room, a bag)?", ex=[
    ("Get [out of] the car.", "you sit inside a car", {"off": (N, "you do not stand | on a car")}),
    ("He took a pen [out of] his bag.", "from inside the bag", {"off": (N, "a bag's surface | is not meant")}),
    ("The fish jumped [out of] the water.", "from inside the water", {"off": (N, "water is not | a surface here")})]),
  "off": dict(logic=["OFF: leaving a surface, no longer touching."], ask="Is it leaving a surface or platform (a bus, a table, a wall)?", ex=[
    ("Get [off] the bus.", "a bus has a floor | you stand on", {"out of": (N, "big transport takes | on/off, not in/out")}),
    ("The cup fell [off] the table.", "it left the table's top", {"out of": (N, "a table has no inside")}),
    ("Keep [off] the grass.", "do not stand on it", {"out of": (N, "grass has no inside")})]),
}),
"past-by-via": dict(order=["past", "via", "by"], pics={"past": "pastBank", "via": "roadPass", "by": "emailBy"}, prove={
  "past": dict(logic=["PAST: going beside something and beyond it."], ask="Do you go beside it and beyond?", ex=[
    ("He walked [past] the bank.", "beside the bank, | then beyond it", {"via": (N, "via is a stop | on a route"), "by": (D, "by the bank = | also beside it")}),
    ("It is ten [past] four.", "beyond four o'clock", {"via": (N, "not used"), "by": (N, "not used for time")})]),
  "via": dict(logic=["VIA: through a stop or route on the way."], ask="Is it a stop or route you pass through?", ex=[
    ("We flew to Jeddah [via] Dubai.", "Dubai is a stop | on the way", {"past": (N, "you land there; | you do not pass by"), "by": (N, "by + transport: | by air")}),
    ("Send it [via] email.", "the route the | message takes", {"past": (N, "not used"), "by": (D, "by email | also works")})]),
  "by": dict(logic=["BY: the method of travel or sending."], ask="Is it the kind of transport or method?", ex=[
    ("We went [by] train.", "the method of travel", {"via": (N, "via names a stop, | not the transport"), "past": (N, "not used")}),
    ("Pay [by] card.", "the method of paying", {"via": (N, "not used for paying"), "past": (N, "not used")})]),
}),
"pending": dict(order=["pending", "following", "given"], pics={"pending": "notWait", "following": "followEvent", "given": "scale"}, prove={
  "pending": dict(logic=["PENDING: while waiting for something", "to be decided."], ask="Is something still waiting to be decided?", ex=[
    ("He was suspended [pending] an inquiry.", "the inquiry is not | finished yet", {"following": (D, "following = after | the inquiry"), "given": (N, "given = considering")}),
    ("The bill is on hold [pending] approval.", "approval has not come", {"following": (D, "after approval"), "given": (N, "not used")})]),
  "following": dict(logic=["FOLLOWING: after, as a result of."], ask="Did it happen after the event?", ex=[
    ("[Following] the inquiry, he was dismissed.", "the inquiry came first, | then the dismissal", {"pending": (D, "pending = while | still waiting"), "given": (D, "given = considering")}),
    ("[Following] the rains, roads were closed.", "after the rains", {"pending": (N, "rain is not decided"), "given": (D, "considering the rains")})]),
  "given": dict(logic=["GIVEN: considering, taking into account."], ask="Are we taking a fact into account?", ex=[
    ("[Given] his age, he did well.", "taking his age into account", {"following": (N, "not after his age"), "pending": (N, "nothing is waiting")}),
    ("[Given] the cost, we chose the bus.", "considering the cost", {"following": (N, "not after the cost"), "pending": (N, "not waiting")})]),
}),
"per-plus-minus-versus": dict(order=["per", "versus"], pics={"per": "perKilo", "versus": "versus"}, prove={
  "per": dict(logic=["PER: for each one."], ask="Is it a rate for each unit?", ex=[
    ("Petrol costs 280 rupees [per] litre.", "the price for each litre", {"versus": (N, "versus is a contest")}),
    ("The car was doing 80 km [per] hour.", "distance for each hour", {"versus": (N, "not a contest")})]),
  "versus": dict(logic=["VERSUS: against, in a contest or a case."], ask="Is it one side against another?", ex=[
    ("Pakistan [versus] India", "one side against another", {"per": (N, "per is a rate")}),
    ("the case of Ali [versus] the State", "two sides in court", {"per": (N, "not a rate")})]),
}),
"regarding-concerning": dict(order=["regarding", "about", "with regard to"], pics={"regarding": "pointDoc", "about": "aboutCircle", "with regard to": "docSays"}, prove={
  "regarding": dict(logic=["REGARDING: about, in formal writing:", "letters, notices, reports."], ask="Is it formal writing about a topic?", ex=[
    ("I am writing [regarding] your complaint.", "a formal letter's topic", {"about": (D, "about is fine, | but less formal"), "with regard to": (D, "also formal: | with regard to")}),
    ("a notice [regarding] fees", "formal notice", {"about": (D, "less formal"), "with regard to": (D, "same meaning")})]),
  "about": dict(logic=["ABOUT: the everyday word for a topic."], ask="Is it everyday talk?", ex=[
    ("We talked [about] the fees.", "everyday talk", {"regarding": (D, "too formal | for talk"), "with regard to": (D, "too formal")}),
    ("What is the film [about]?", "everyday question; | about can end a question", {"regarding": (N, "regarding cannot | end a question"), "with regard to": (N, "cannot end a question")})]),
  "with regard to": dict(logic=["WITH REGARD TO: formal, and always TO."], ask="Is it formal, and is TO kept?", ex=[
    ("[With regard to] fees, nothing has changed.", "formal; regard to | points at the topic", {"regarding": (D, "also correct, | one word"), "about": (D, "less formal")})]),
}),
"up-down": dict(order=["up", "down"], pics={"up": "hillUp", "down": "arrowDown"}, prove={
  "up": dict(logic=["UP: to a higher place."], ask="Does it go higher?", ex=[
    ("She climbed [up] the ladder.", "climbing goes higher", {"down": (D, "down = lower")}),
    ("Smoke rose [up] the chimney.", "smoke goes higher", {"down": (N, "smoke rises")}),
    ("They walked [up] the hill.", "towards the top", {"down": (D, "towards the bottom")})]),
  "down": dict(logic=["DOWN: to a lower place."], ask="Does it go lower?", ex=[
    ("The ball rolled [down] the hill.", "rolling goes lower", {"up": (N, "a ball does not roll | uphill by itself")}),
    ("Tears ran [down] her face.", "falling lower", {"up": (N, "tears fall")}),
    ("He came [down] the stairs.", "to a lower floor", {"up": (D, "to a higher floor")})]),
}),
"within-time": dict(order=["in", "within", "after"], pics={"in": "inTimeBefore", "within": "inTimeBefore", "after": "afterDot"}, prove={
  "in": dict(logic=["IN + time from now: when that time has passed."], ask="Is it from now, at the end of a stretch?", ex=[
    ("I'll be back [in] ten minutes.", "when ten minutes | have passed", {"within": (D, "within = before | ten minutes end"), "after": (N, "after ten minutes needs | a past starting point")}),
    ("The results come out [in] a week.", "a week from now", {"within": (D, "before a week ends"), "after": (N, "not from now")})]),
  "within": dict(logic=["WITHIN: before a limit runs out."], ask="Must it happen before the limit ends?", ex=[
    ("Reply [within] a week.", "any time before | the week ends", {"in": (D, "in a week = at the end"), "after": (N, "after = later than")}),
    ("The pain stopped [within] an hour.", "before the hour ended", {"in": (D, "in an hour = | at the end"), "after": (D, "later than an hour")})]),
  "after": dict(logic=["AFTER + time: later, counted from a past point."], ask="Is it counted from a point in the past?", ex=[
    ("He returned [after] two days.", "two days after he left", {"in": (N, "in two days looks | forward from now"), "within": (D, "within = before | two days ended")})]),
}),
"within-without": dict(order=["within", "without"], pics={"within": "reachDot", "without": "personLeft"}, prove={
  "within": dict(logic=["WITHIN: inside a limit."], ask="Is it inside a limit?", ex=[
    ("Stay [within] the boundary.", "inside the line", {"without": (N, "without = not having")}),
    ("Live [within] your means.", "inside what you earn", {"without": (N, "not used")})]),
  "without": dict(logic=["WITHOUT: not having, none."], ask="Is something missing?", ex=[
    ("Tea [without] sugar, please.", "no sugar", {"within": (N, "within is a limit")}),
    ("He left [without] a word.", "no word was said", {"within": (N, "not a limit")})]),
}),
}

# Phase 1 lessons that reuse an atlas pair's proof set.
P1_FROM_ATLAS = {
    "about-on-topic": "of-about-on", "across-along": "through-across-along", "as-like": "like-as", "beside-besides": "beside-besides",
    "between-among": "between-among", "by-until": "by-until", "during-for": "for-since-during", "for-since": "for-since-during",
    "in-on-at-place": "in-on-at-place", "in-on-at-time": "in-on-at-time", "into-onto": "in-into", "over-above": "over-above",
    "under-below": "over-above", "to-towards": "to-towards", "except-but-save": "except-besides",
}
