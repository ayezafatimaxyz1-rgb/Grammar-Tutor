# "Why this one and not the others?" for every lesson.
# lesson: (sentence with ____, [(spec, word, ok, reason)], [rule, rule])
Y, N, D = True, False, "diff"  # D: correct English, but a different meaning
L = {
# ---------- Phase 1 ----------
"in-core": ("Sara lives ____ Lahore.", [
  ('"liveIn"', "in", Y, "an area she is | inside"),
  ('"roadPass"', "at", N, "shrinks Lahore to a | dot on a route"),
  ('"onBase"', "on", N, "on top of the city, | like a lid"),
  ('"goHome"', "to", N, "to is movement; | living is not")],
  ["in = inside an area: live in Lahore", "at = a stop on a route: stopped at Lahore"]),
"in-time": ("My birthday is ____ June.", [
  ('"inPeriod"', "in", Y, "a month is a stretch | you are inside"),
  ('"calendar"', "on", N, "on is for one day: | on 14 June"),
  ('"clock"', "at", N, "at is for a clock | time: at 5 o'clock")],
  ["in a month, year, season · on a day", "at a clock time"]),
"on-core": ("The picture is ____ the wall.", [
  ('[["wall", -30, 0], ["doc", 20, 0, 0.6]]', "on", Y, "touching the wall's | surface"),
  ('"inDrawer"', "in", D, "built into the wall, | like a safe"),
  ('"reachDot"', "at", N, "at = a point near it, | not touching"),
  ('"floatAbove"', "above", D, "higher than the wall, | not hanging on it")],
  ["on = touching a surface, even a wall or a ceiling", "in = inside · above = higher, no contact"]),
"at-core": ("She is waiting ____ the bus stop.", [
  ('"reachDot"', "at", Y, "a bus stop is | a point"),
  ('"insideBuilding"', "in", N, "a bus stop has | no inside"),
  ('"onBase"', "on", N, "not standing on | top of it"),
  ('"goHome"', "to", N, "waiting is not | moving")],
  ["at = a place pictured as a point", "in = inside · to = movement towards"]),
"in-on-at-place": ("The photo is ____ page 12.", [
  ('"storyBook"', "on", Y, "a page is a | surface"),
  ('"dotIn"', "in", N, "in is for what the | picture contains"),
  ('"reachDot"', "at", N, "at is a point, | not a page")],
  ["on a page, on a screen (a surface)", "in the photo, in the report (contents)"]),
"in-on-at-time": ("The meeting is ____ Monday.", [
  ('"calendar"', "on", Y, "one named day"),
  ('"inPeriod"', "in", N, "in is for longer | stretches: in June"),
  ('"clock"', "at", N, "at is for clock | times: at 9 a.m.")],
  ["in June · on Monday · at 9 a.m.", "stretch · day · point"]),
"into-onto": ("The ball rolled ____ the box.", [
  ('"intoBag"', "into", Y, "movement that ends | inside"),
  ('"loop"', "in", D, "already inside, | rolling about"),
  ('"cupOnTable"', "onto", D, "ended on top | of the box"),
  ('"reachDot"', "to", D, "stopped beside it, | not inside")],
  ["into = moving from outside to inside", "in = already inside · onto = ending on top"]),
"out-of-off": ("She got ____ the bus.", [
  ('"busOn"', "off", Y, "a bus is a platform | you step off"),
  ('"carIn"', "out of", N, "out of is for cars | and taxis"),
  ('"origin"', "from", N, "from names a start, | not stepping down"),
  ('"bookTable"', "off of", N, "of is extra | (informal)")],
  ["get off a bus, train, plane", "get out of a car, taxi"]),
"inside-outside": ("Please wait ____ the office.", [
  ('"gatePerson"', "outside", Y, "beyond its walls"),
  ('"goOut"', "out", N, "out needs of: | out of the office"),
  ('"gatePerson"', "outside of", N, "of is informal | (mostly AmE)")],
  ["outside the office (formal)", "out of the office · outside of (informal)"]),
"within-without": ("Reply ____ ten days.", [
  ('"inPeriod"', "within", Y, "any time up to | day ten"),
  ('"pointFuture"', "in", D, "on day ten, | not before"),
  ('"afterDot"', "after", D, "only once the | ten days are over"),
  ('"sincePoint"', "since", N, "since needs a | starting point")],
  ["within = any time inside the limit", "in = at the end of the time"]),
"over-above": ("There is a bridge ____ the river.", [
  ('"overRock"', "over", Y, "crossing from one | side to the other"),
  ('"floatAbove"', "above", D, "higher up, but | not crossing it"),
  ('"cupOnTable"', "on", N, "it would lie on | the water")],
  ["over = covering or crossing", "above = higher, no contact"]),
"under-below": ("The cat is sleeping ____ the table.", [
  ('"underTable"', "under", Y, "directly beneath, | covered by it"),
  ('"belowLine"', "below", D, "on a lower level, | like the floor below"),
  ('"cupOnTable"', "on", D, "lying on top | of the table"),
  ('"inDrawer"', "in", N, "inside it, | in a drawer")],
  ["under = directly beneath, covered", "below = lower on a level or scale"]),
"on-top-of": ("The cup is ____ the pile of books.", [
  ('"onTopPile"', "on top of", Y, "on the highest | surface"),
  ('"floatAbove"', "above", D, "higher, | not touching"),
  ('"overRock"', "over", D, "covering | the pile")],
  ["on top of = on the highest surface", "on top of that = in addition (informal)"]),
"beside-besides": ("She stood ____ the tree.", [
  ('"nearSchool"', "beside", Y, "at its side"),
  ('"plus"', "besides", N, "= in addition to"),
  ('"cross"', "next", N, "next needs to: | next to the tree")],
  ["beside = at the side of", "besides = in addition to, apart from"]),
"near-by-next-to": ("We live ____ the school.", [
  ('"nearSchool"', "near", Y, "a short distance | from it"),
  ('"nearbyShop"', "nearby", N, "nearby takes | no object"),
  ('"cross"', "next", N, "next needs to: | next to the school")],
  ["near the school · next to the school", "a nearby shop · we live nearby"]),
"front-behind": ("The car is parked ____ the house.", [
  ('"nearSchool"', "in front of", Y, "same side, at | its front"),
  ('"acrossRoad"', "opposite", D, "across the road, | facing it"),
  ('"court"' if False else '"priorDot"', "before", N, "before is for time, | or formal: before a court"),
  ('"wordsMove"', "ahead of", D, "further along | the road")],
  ["in front of = same side", "opposite = across · before = time (or formal)"]),
"between-among": ("The ball is ____ the two trees.", [
  ('[["tree", -45, 0], ["dot", 0, 22, 0.6], ["tree", 45, 0]]', "between", Y, "two separate | points"),
  ('"crowdDot"', "among", N, "among needs a | group around it"),
  ('"amidRising"', "amid", N, "amid = in the middle | of a situation")],
  ["between = separate individuals", "among = inside a group · amid = in a situation"]),
"around-round-about": ("She wrote a book ____ Iqbal.", [
  ('"aboutCircle"', "about", Y, "the topic"),
  ('"circleDoc"', "around", N, "informal for | a topic"),
  ('"ownerBook"', "of", D, "written by Iqbal, | not about him")],
  ["about, on = a topic", "around = in a circle, or approximately"]),
"against": ("80 members voted ____ the bill.", [
  ('"versus"', "against", Y, "opposing it"),
  ('"voteFor"', "for", D, "supporting | the bill"),
  ('"scale"', "to", N, "to is for scores: | 120 votes to 80")],
  ["against = opposing · for = supporting", "a score: 120 votes to 80"]),
"upon": ("The film starts ____ Monday.", [
  ('"calendar"', "on", Y, "days take on"),
  ('"calendar"', "upon", N, "upon is never used | for days"),
  ('"clock"', "at", N, "at is for | clock times")],
  ["upon: depend upon, upon arrival (formal)", "days: on Monday"]),
"to-towards": ("We drove ____ Lahore and arrived at noon.", [
  ('"goHome"', "to", Y, "the destination | we reached"),
  ('"arrowR"', "towards", D, "only the direction; | clashes with arrived"),
  ('"intoBag"', "into", D, "entered the city: | a different focus"),
  ('"reachDot"', "at", N, "at needs arrive: | arrived at")],
  ["to = destination reached", "towards = direction only"]),
"from": ("Paper is made ____ wood.", [
  ('[["tree", -40, 0, 0.8], ["arrowR", 0, 0, 0.5], ["doc", 40, 0, 0.8]]', "from", Y, "the wood has | changed"),
  ('"table"', "of", N, "of = the material | still shows"),
  ('"writtenBy"', "by", N, "by names the | maker")],
  ["made from = changed · made of = still visible", "made by = the maker"]),
"through": ("The train went ____ the tunnel.", [
  ('"passThrough"', "through", Y, "in one end, | out the other"),
  ('"roadPass"', "across", N, "across = over | a surface"),
  ('"alongRiver"', "along", N, "along = following | a line"),
  ('"loop"', "in", D, "was inside it, | not passing through")],
  ["through = in one side and out the other", "across = over a surface · along = following a line"]),
"across-along": ("We swam ____ the river to the other bank.", [
  ('"crossRiver"', "across", Y, "from one bank | to the other"),
  ('"alongRiver"', "along", D, "swam lengthwise, | not to the other bank"),
  ('"floatAbove"', "above", N, "above the water, | not in it")],
  ["across = side to side", "along = following the length"]),
"past-by-via": ("She walked ____ the bank.", [
  ('"pastBank"', "past", Y, "beside it and | beyond it"),
  ('"pastBank"', "passed", N, "a verb; walked is | already the verb"),
  ('"passThrough"', "through", N, "into it and | out again")],
  ["walked past (preposition)", "passed it (verb)"]),
"up-down": ("He climbed ____ the hill to the top.", [
  ('"hillUp"', "up", Y, "towards the top"),
  ('"arrowDown"', "down", D, "towards the bottom; | clashes with the top"),
  ('"cupOnTable"', "on", N, "on = already | there")],
  ["up = towards the top · down = towards the bottom", "climb up the hill · walk down the stairs"]),
"beyond": ("The old car is ____ repair.", [
  ('"groupOut"', "beyond", Y, "past the point of | fixing"),
  ('"review"', "under", D, "being fixed | now"),
  ('"cross"', "out of", N, "out of repair | is not used")],
  ["beyond repair = cannot be fixed", "under repair = being fixed"]),
"throughout": ("The floods caused damage ____ Sindh.", [
  ('"everywhere"', "throughout", Y, "in every part | of it"),
  ('"passThrough"', "through", D, "passed through, | not every part"),
  ('"alongRiver"', "along", D, "only along | one line")],
  ["throughout = in every part", "through = passing in and out"]),
"what-is-a-preposition": ("The cup is ____ the table.", [
  ('"cupOnTable"', "on", Y, "resting on its | surface"),
  ('"inDrawer"', "in", N, "inside the table"),
  ('"underTable"', "under", D, "beneath | the table")],
  ["the preposition shows how the thing sits", "against the reference point"]),
"prep-adverb-conjunction": ("We stayed at home ____ the rain.", [
  ('"cloud"', "because of", Y, "+ a noun"),
  ('"rain"', "because", N, "+ a clause: | because it rained"),
  ('"different"', "although", N, "shows contrast, | not cause")],
  ["because of + noun", "because + clause"]),
"prep-objects": ("I look forward to ____ you.", [
  ('"lookAhead"', "meeting", Y, "to is a | preposition: -ing"),
  ('"arrowR"', "meet", N, "to meet is the | infinitive"),
  ('"pointPast"', "met", N, "a past form")],
  ["look forward to, committed to, used to + -ing", "test: a noun fits (to the meeting)"]),
"stranding": ("This is the house I grew up ____.", [
  ('"house"', "in", Y, "grow up in | a place"),
  ('"reachDot"', "at", N, "at = a point, | not a home"),
  ('"onBase"', "on", N, "on = a surface")],
  ["ending with a preposition is fine", "formal: the house in which I grew up"]),
"for-since": ("I have lived here ____ ten years.", [
  ('"span"', "for", Y, "the length of | the stretch"),
  ('"sincePoint"', "since", N, "since needs a | starting point"),
  ('"betweenTicks"', "from", N, "from needs an end: | from 2015 to 2025"),
  ('"inPeriod"', "during", N, "during = when, | not how long")],
  ["for + a length · since + a starting point", "during + a period (when)"]),
"during-for": ("I woke up twice ____ the night.", [
  ('"inPeriod"', "during", Y, "when: inside | that time"),
  ('"span"', "for", N, "for = how long"),
  ('"speak"', "while", N, "while + a clause: | while I slept")],
  ["during + noun = when", "for = how long · while + clause"]),
"by-until": ("Submit the form ____ Friday.", [
  ('"priorDot"', "by", Y, "a deadline: | no later than"),
  ('"notUntil"', "until", N, "until = keep doing | it up to Friday"),
  ('"sincePoint"', "since", N, "since looks back | from now")],
  ["by = a deadline for one action", "until = a state that lasts up to then"]),
"before-after": ("____ to the meeting, the minister met reporters.", [
  ('"priorDot"', "Prior", Y, "prior always | takes to"),
  ('"priorDot"', "Before", N, "before takes no to: | before the meeting"),
  ('"afterDot"', "Subsequent", N, "= after, the | opposite")],
  ["prior to = before (formal)", "subsequent to = after (formal)"]),
"from-to-till": ("The shop is open from 9 ____ 5.", [
  ('"span"', "to", Y, "from ... to"),
  ('"betweenTicks"', "and", N, "and belongs to | between"),
  ('"clock"', "at", N, "at = one point, | not an end")],
  ["from 9 to 5 (or until 5)", "between 9 and 5"]),
"within-time": ("The work will be finished ____ two weeks, maybe sooner.", [
  ('"inPeriod"', "within", Y, "any time inside | the two weeks"),
  ('"pointFuture"', "in", D, "after exactly | two weeks"),
  ('"afterDot"', "after", D, "only once the | two weeks are over")],
  ["within = no later than", "in = when the time has passed"]),
"pending": ("The decision was postponed ____ an inquiry.", [
  ('"notWait"', "pending", Y, "while waiting | for it"),
  ('"followEvent"', "following", D, "after the inquiry | has ended"),
  ('"overRock"', "despite", D, "although there | is an inquiry")],
  ["pending = until something happens", "following = after"]),
"ago-not-prep": ("I met him two years ____.", [
  ('"pointPast"', "ago", Y, "counted back | from now"),
  ('"backFromPoint"', "before", N, "counts back from | another past moment"),
  ('"sincePoint"', "since", N, "since needs a | point: since 2023")],
  ["ago = back from now (past simple)", "before = back from a past point"]),
"of": ("The legs ____ the table are broken.", [
  ('"roofOf"', "of", Y, "a part of | a thing"),
  ('"origin"', "from", D, "legs taken | off the table"),
  ('"target"', "for", D, "legs made for it, | not yet fitted")],
  ["of = part of, belonging to", "people: Ali's book · things: the legs of the table"]),
"for": ("This knife is ____ cutting bread.", [
  ('"bread"', "for", Y, "purpose + -ing"),
  ('"arrowR"', "to", N, "to + verb: | to cut bread"),
  ('"bread"', "with", N, "with names the | tool, not the aim")],
  ["for + -ing or noun = purpose", "to + verb = purpose: went to buy"]),
"with-without": ("She cut the bread ____ a knife.", [
  ('"bread"', "with", Y, "a tool you hold"),
  ('"emailBy"', "by", N, "by + a means: | by hand, by email"),
  ('"origin"', "from", N, "from = origin")],
  ["with + a tool", "by + a means (no article)"]),
"by-agent-means": ("The poem was written ____ Iqbal.", [
  ('"writtenBy"', "by", Y, "the person | who did it"),
  ('"letterFrom"', "from", N, "from = sent by, | origin"),
  ('"ownerBook"', "of", N, "of = belonging | to him")],
  ["passive + by + the doer", "a letter from Iqbal = he sent it"]),
"about-on-topic": ("We talked ____ cricket for hours.", [
  ('"aboutCircle"', "about", Y, "everyday | topic word"),
  ('"onBase"', "on", D, "gave a formal | talk on it"),
  ('"circleDoc"', "around", N, "informal for | a topic")],
  ["about = everyday topic", "on = formal topic (a lecture on)"]),
"as-like": ("She works ____ a teacher at a college.", [
  ('"asRole"', "as", Y, "her real job: | she is one"),
  ('"likeSim"', "like", D, "she only resembles | a teacher"),
  ('"giveTo"', "for", D, "employed by | a teacher")],
  ["as = a real role", "like = similar to"]),
"unlike": ("____ Karachi, Lahore has cold winters.", [
  ('"different"', "Unlike", Y, "contrasts two | cities"),
  ('"cross"', "Dislike", N, "a verb: | to not like"),
  ('"different"', "Different", N, "needs from: | different from")],
  ["unlike X, Y ... (compare like with like)", "different from"]),
"except-but-save": ("Everyone came ____ Ali.", [
  ('"groupOut"', "except", Y, "Ali is left out"),
  ('"plus"', "besides", D, "Ali came too"),
  ('"personLeft"', "without", D, "they came, leaving | Ali behind")],
  ["except = not including", "besides = in addition to"]),
"despite": ("____ the rain, we played the match.", [
  ('"overRock"', "Despite", Y, "+ a noun"),
  ('"rain"', "Although", N, "+ a clause: | although it rained"),
  ('"cross"', "Despite of", N, "never despite of")],
  ["despite / in spite of + noun", "although + clause"]),
"per-plus-minus-versus": ("The car was going 120 km ____ hour.", [
  ('"perKilo"', "per", Y, "for each hour"),
  ('"inPeriod"', "in", N, "in an hour = | within one hour"),
  ('"cross"', "by", N, "by = a means or a | change: rose by 10")],
  ["per = for each", "Rs 200 per kilo · 120 km per hour"]),
"than-debate": ("She is taller ____ me.", [
  ('"taller"', "than", Y, "comparison after | -er"),
  ('"timeline"', "then", N, "then = next, | at that time"),
  ('"origin"', "from", N, "taller from | is wrong")],
  ["taller than, better than", "then = time"]),
"regarding-concerning": ("I am writing ____ the delay.", [
  ('"pointDoc"', "regarding", Y, "= about it"),
  ('"wave"', "regards", N, "regards = | greetings"),
  ('"cross"', "regard", N, "needs with ... to: | with regard to")],
  ["regarding, concerning, with regard to", "never with regards to"]),
"including-excluding": ("The fee is Rs 50,000, ____ hostel charges. (They are not in it.)", [
  ('"groupOut"', "excluding", Y, "left out of | the total"),
  ('"plus"', "including", D, "the charges are | inside the total"),
  ('"addMore"', "besides", D, "in addition | to the charges")],
  ["including = part of the total", "excluding = left out"]),
"archaic-literary": ("In modern English: Come ____ me.", [
  ('"arrowR"', "to", Y, "modern English"),
  ('"scroll"', "unto", N, "old, Bible | English")],
  ["read old words, but write modern ones", "unto = to · ere = before"]),
"cause": ("____ fog, the flight was delayed.", [
  ('"fogDelay"', "Owing to", Y, "safe at the | start"),
  ('"fogDelay"', "Due to", N, "disputed at the | start; fine after be"),
  ('"rain"', "Because", N, "+ a clause: | because it was foggy")],
  ["Owing to fog, ... · Because of fog, ...", "The delay was due to fog."]),
"purpose-means": ("They cut staff with a view to ____ costs.", [
  ('"aimGoal"', "reducing", Y, "to is a | preposition: -ing"),
  ('"aimGoal"', "reduce", N, "to + verb is | the infinitive"),
  ('"pointPast"', "reduced", N, "a past form")],
  ["with a view to + -ing", "in order to + verb"]),
"reference": ("____ me, I agree with the plan.", [
  ('"turnTo"', "As for", Y, "turning to | a new person"),
  ('"question"', "As to", N, "as to = about: | doubts as to whether"),
  ('"aboutCircle"', "About", N, "about me = | a topic about me")],
  ["as for = turning to someone new", "as to = about"]),
"addition-exception": ("____ teaching, she writes novels.", [
  ('"addMore"', "In addition to", Y, "adds a second | thing"),
  ('"groupOut"', "Except", D, "teaching taken | away"),
  ('"swap"', "Instead of", D, "teaching | replaced")],
  ["in addition to, as well as = adding", "except = taking away · instead of = replacing"]),
"substitution": ("I had coffee ____ tea.", [
  ('"swap"', "instead of", Y, "one in place | of the other"),
  ('"cross"', "instead", N, "alone it ends a sentence: | I had coffee instead"),
  ('"groupOut"', "except", N, "except = not | including")],
  ["instead of + noun or -ing", "rather than + bare verb"]),
"conformity": ("____ the report, poverty has fallen.", [
  ('"docSays"', "According to", Y, "what a source | says"),
  ('"followRule"', "In accordance with", N, "= following | a rule"),
  ('"cross"', "According", N, "needs to: it points | to the source")],
  ["according to + a source", "in accordance with + a rule"]),
"concession": ("The school is open to all, ____ income.", [
  ('[["crowd", -30, 0, 0.8], ["gate", 40, 0, 0.9]]', "regardless of", Y, "income makes | no difference"),
  ('"cross"', "irregardless of", N, "not standard | English"),
  ('"overRock"', "despite", N, "despite = a real | obstacle overcome")],
  ["regardless of, irrespective of", "despite + an obstacle"]),
"representation": ("She spoke ____ the government at the UN.", [
  ('"speakFor"', "on behalf of", Y, "as its | representative"),
  ('"blame"', "on the part of", N, "= by: a mistake | on the part of"),
  ('"scaleTip"', "in favour of", D, "speaking in | support of it")],
  ["on behalf of = representing", "on the part of = by"]),
"circumstance": ("____ fire, use the stairs.", [
  ('"fireStairs"', "In the event of", Y, "if it happens"),
  ('"viewRisk"', "In view of", D, "because a fire | is happening now"),
  ('"boat"', "In the wake of", D, "after a fire | has happened")],
  ["in the event of = if it happens", "in view of = considering · in the wake of = after"]),
"comparison-measure": ("The hall holds ____ 500 people.", [
  ('"tankLid"', "up to", Y, "500 at most"),
  ('"tankOver"', "in excess of", D, "more | than 500"),
  ('"farFrom"', "far from", N, "far from = | not at all")],
  ["up to = the most · in excess of = more than", "close to = nearly · far from = not at all"]),
"process": ("____ the inquiry, new facts emerged.", [
  ('"courseAlong"', "In the course of", Y, "= during"),
  ('"expense"', "At the expense of", D, "harming | the inquiry"),
  ('"flowersApology"', "By way of", N, "= as a form of")],
  ["in the course of = during", "at the expense of = at the cost of"]),
# ---------- Phase 2 ----------
"depend-rely": ("It all depends ____ the weather.", [
  ('"support"', "on", Y, "rests on it like | a support"),
  ('"cross"', "of", N, "of = belonging; depend | means resting on"),
  ('"origin"', "from", N, "from = a starting | point, not a support")],
  ["depend on, rely on, count on, insist on", "formal: depend upon"]),
"believe-in": ("I believe ____ democracy.", [
  ('"beliefIn"', "in", Y, "trust placed | in an idea"),
  ('"pressOn"', "on", N, "on = resting on a | surface; belief goes inside"),
  ('"believeWords"', "(no word)", N, "believe + a person | = accept their words")],
  ["believe in = trust its value or existence", "believe someone = accept their words"]),
"apply-for-to": ("She applied ____ the job.", [
  ('"wantStar"', "for", Y, "the prize she | wants"),
  ('"applyTo"', "to", N, "to = the office | that receives it"),
  ('"cross"', "(no word)", N, "apply a job = | spread it like paint")],
  ["apply for + what you want", "apply to + the place that receives it"]),
"agree-with-on-to": ("I agree ____ you completely.", [
  ('"agreeWith"', "with", Y, "the same view | as a person"),
  ('"agreeTo"', "to", N, "to = accepting | a proposal"),
  ('"agreeOn"', "on", N, "on = a point | decided together")],
  ["agree with a person · agree to a proposal", "agree on a date"]),
"arrive-at-in": ("We arrived ____ the airport at noon.", [
  ('"airportDot"', "at", Y, "a building is | a point"),
  ('"inCity"', "in", N, "in is for cities, | countries"),
  ('"goHome"', "to", N, "to = still | moving")],
  ["arrive at a point · arrive in an area", "never arrive to"]),
"look-family": ("Please look ____ the children while I am out.", [
  ('"careFor"', "after", Y, "take care | of them"),
  ('"searchQ"', "for", D, "searching: they | are lost"),
  ('"eyeLook"', "at", D, "only watching | them"),
  ('"lookInto"', "into", D, "investigating | them")],
  ["look after = care · look for = search", "look at = watch · look into = investigate"]),
"object-pattern": ("They accused him ____ theft.", [
  ('"accuseOf"', "of", Y, "accuse someone | of a wrong"),
  ('"blame"', "for", N, "for goes with | blame"),
  ('"gavel"', "with", N, "with goes with | charge")],
  ["accuse of · blame for · charge with", "prevent from · congratulate on"]),
"no-preposition": ("We discussed ____ the issue.", [
  ('"discuss"', "(no word)", Y, "discuss already | means talk about"),
  ('"aboutCircle"', "about", N, "says about | twice"),
  ('"onBase"', "on", N, "discuss takes | no preposition")],
  ["discuss, reach, enter, marry: no preposition", "the nouns keep it: a discussion about"]),
"abstain-refrain": ("Please refrain ____ smoking.", [
  ('"holdBack"', "from", Y, "holding back | from it"),
  ('"arrowR"', "to", N, "to = moving towards; | refrain is moving away"),
  ('"cross"', "of", N, "of = belonging; nothing | belongs here")],
  ["refrain from, abstain from + -ing", "comply with · adhere to"]),
"die-of-from": ("The flood resulted ____ heavy losses.", [
  ('"causeEffect"', "in", Y, "cause first: | looks to the effect"),
  ('"wrongWay"', "from", D, "the losses caused | the flood"),
  ('"cross"', "to", N, "to = arriving; | result points at the effect with in")],
  ["subject = cause: result in", "subject = effect: result from"]),
"compare-to-with": ("The poet compared her smile ____ the sun.", [
  ('"likenTo"', "to", Y, "says one is | like the other"),
  ('"sideBySide"', "with", D, "examining both, | like an analyst"),
  ('"origin"', "from", N, "from = apart: | distinguish from")],
  ["compare to = liken", "compare with = examine side by side"]),
"feelings": ("She is interested ____ history.", [
  ('"absorbedIn"', "in", Y, "attention goes | inside the subject"),
  ('"pressOn"', "on", N, "on = a surface or topic: | a book on history"),
  ('"aboutCircle"', "about", N, "about goes with | worried, angry")],
  ["interested in · afraid of · keen on", "angry with a person, about a situation"]),
"ability": ("She is good ____ mathematics.", [
  ('[["arrowR", -40, 0], ["target", 30, 0]]', "at", Y, "hitting the | target"),
  ('"expertIn"', "in", N, "informal; in | is for fields: proficient in"),
  ('"onBase"', "on", N, "on = a topic: | a book on maths")],
  ["good at, bad at · capable of", "proficient in, experienced in"]),
"responsibility": ("Ministers are accountable ____ Parliament.", [
  ('"answerTo"', "to", Y, "the authority | above them"),
  ('"careFor"', "for", D, "Parliament would be | their task"),
  ('"cross"', "of", N, "of = belonging; Parliament | does not own them")],
  ["accountable to + authority", "accountable for + task"]),
"similarity": ("This plan is superior ____ that one.", [
  ('"taller"', "to", Y, "superior already | means more"),
  ('"compareBars"', "than", N, "than goes with | better, more"),
  ('"origin"', "from", N, "from = moving apart: | different from")],
  ["superior to, inferior to, senior to", "better than, more than"]),
"familiarity": ("I am familiar ____ the rules.", [
  ('"knowsWay"', "with", Y, "the person | knows them"),
  ('[["doc", -38, 0, 0.8], ["arrowR", 0, 0, 0.5], ["person", 40, 0, 0.8]]', "to", D, "the rules | would know me"),
  ('"awareOf"', "of", N, "of goes with | aware"),
  ],
  ["person first: familiar with", "thing first: familiar to"]),
"formal-adjectives": ("Peace is conducive ____ economic growth.", [
  ('"growTo"', "to", Y, "leading towards | a result"),
  ('"target"', "for", N, "for = a purpose; peace | is not aimed at growth"),
  ('"levelScale"', "with", N, "with goes with | commensurate")],
  ["conducive to, averse to, tantamount to", "contingent on · commensurate with"]),
"reason-cause": ("What was the reason ____ the delay?", [
  ('"reasonFor"', "for", Y, "the reason | given for it"),
  ('"causeEffect"', "of", N, "of goes with | cause: cause of"),
  ('"arrowR"', "to", N, "to + a verb only: | no reason to worry")],
  ["the reason for · the cause of", "the solution to · the key to"]),
"demand-need": ("There is a growing demand ____ electricity.", [
  ('"demandFor"', "for", Y, "reaching for | a target"),
  ('"cross"', "of", N, "of = belonging; demand | is not part of electricity"),
  ('"arrowR"', "to", N, "to = arriving; demand | is reaching for it")],
  ["a demand for, a need for, respect for", "the verbs take none: demand it"]),
"access-approach": ("Millions lack access ____ clean water.", [
  ('"accessTo"', "to", Y, "a way in, | reaching it"),
  ('"cross"', "of", N, "of = a part of; access | is a way in"),
  ('"giveTo"', "for", N, "for = who | benefits")],
  ["access to, approach to, response to", "commitment to + -ing"]),
"increase-decrease": ("There was a sharp increase ____ prices.", [
  ('"riseIn"', "in", Y, "the thing that | changes"),
  ('"riseBy"', "of", N, "of = the amount: | of 10 per cent"),
  ('"arrowUp"', "by", N, "by follows the verb: | rose by 10 per cent")],
  ["an increase in prices · an increase of 10%", "prices rose by 10%"]),
"relationship": ("Doctors found a link ____ smoking and cancer.", [
  ('"linkBetween"', "between", Y, "both sides | named"),
  ('"linkWith"', "with", N, "with = from one | side: its link with"),
  ('"cross"', "of", N, "of names one side; | a link needs both")],
  ["between X and Y", "X's link with Y"]),
"phrasal-vs-prepositional": ("I did not know the word, so I looked it ____.", [
  ('"dictionary"', "up", Y, "particle: search | in a book"),
  ('"searchQ"', "for", N, "looked for it = | searched for it"),
  ('"lookInto"', "into", N, "= investigated it")],
  ["look it up = find it in a book", "look for = search · look into = investigate"]),
"separability": ("The offer was poor, so she turned ____.", [
  ('"slotIn"', "it down", Y, "pronoun in | the middle"),
  ('"cross"', "down it", N, "a pronoun cannot | follow the particle"),
  ('"switchOff"', "it off", D, "switched it off, | like a light")],
  ["turn it down = refuse it", "pronoun in the middle of a phrasal verb"]),
"three-part": ("I cannot put up ____ this noise any longer.", [
  ('"pressed"', "with", Y, "put up with | = tolerate"),
  ('"arrowR"', "to", N, "to = a goal; you are | not moving to the noise"),
  ('"target"', "for", N, "for = what you want; | you do not want noise")],
  ["put up with, do away with, come up with", "look down on, look up to, run out of"]),
"formal-alternatives": ("The police will investigate ____ the matter.", [
  ('"magnifier"', "(no word)", Y, "investigate | takes no particle"),
  ('"lookInto"', "into", N, "into belongs to | look into"),
  ('"aboutCircle"', "about", N, "investigate already | holds the topic")],
  ["investigate the matter (formal)", "look into the matter (spoken)"]),
"in-idioms": ("The ambulance arrived just ____ time to save him.", [
  ('"inTimeBefore"', "in", Y, "early enough"),
  ('"onTimeDot"', "on", D, "at the planned | moment"),
  ('"cross"', "at", N, "at = one point; here | time is a stretch")],
  ["in time = early enough", "on time = at the planned moment"]),
"on-at-idioms": ("He broke the window ____ purpose.", [
  ('"aimGoal"', "on", Y, "on purpose = | deliberately"),
  ('"dice"', "by", N, "by goes with | accident, chance"),
  ('"cross"', "with", N, "with = a tool or company; | purpose is neither")],
  ["on purpose · by accident · by chance", "at random · at large · on the whole"]),
"by-out-of-idioms": ("She learnt the poem ____ heart.", [
  ('"learnHeart"', "by", Y, "by heart = | from memory"),
  ('"origin"', "from", N, "from = a source: | learnt it from a book"),
  ('"heart"', "with", N, "with heart = with | feeling (different)")],
  ["by heart · by chance · by mistake", "out of order · under way"]),
"redundant": ("We reached ____ the station at six.", [
  ('"reachDot"', "(no word)", Y, "reach already | means arrive at"),
  ('"airportDot"', "at", N, "says at twice"),
  ('"goHome"', "to", N, "reach takes | no preposition")],
  ["reach, discuss, emphasise: no preposition", "arrive at · get to"]),
"missing": ("Please listen ____ me carefully.", [
  ('"speak"', "to", Y, "listen needs to | before its object"),
  ('"cross"', "(no word)", N, "listen cannot reach | its object alone"),
  ('"eyeLook"', "at", N, "at goes with look")],
  ["listen to, wait for, reply to, belong to", "explain it to me"]),
"wrong-choice": ("She is married ____ a doctor.", [
  ('"marry"', "to", Y, "be married to | someone"),
  ('"people"', "with", N, "with = together, | not the bond of marriage"),
  ('"writtenBy"', "by", N, "by = who | performed it")],
  ["married to · angry with · afraid of", "consist of · for two years"]),
}
