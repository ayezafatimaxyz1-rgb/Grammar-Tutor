# Confusing pairs, proved: for each preposition in a pair, its picture, the question to ask,
# and three sentences. The first two are proved on lineup boards (why this one, why not each other);
# the third becomes a practice question. Used by atlas.py.
# Each sentence: (sentence with [prep], why this one, {other: (verdict, why not)})
#   verdict N = not English here; D = correct English but a different meaning.
# Reasons are short: they are written on the board ("|" breaks the line).
N, D = "N", "D"

PAIRS = {
"in-on-at-place": dict(order=["in", "on", "at"], prove={
  "in": dict(logic=["IN: a big area or a box around you.", "Borders or walls are on every side."], ask="Is there an area or walls all around?", ex=[
    ("She lives [in] Karachi.", "a city is an area | with borders all round", {"on": (N, "a city is not | a surface or line"), "at": (N, "we are not marking | one point")}),
    ("The students are [in] the hall.", "walls are all around | the students", {"on": (N, "they are not on | its roof"), "at": (D, "at the hall = at the | place, maybe outside")}),
    ("There are many mosques [in] Lahore.", "the mosques are inside | the city's borders", {"on": (N, "a city is not a line"), "at": (N, "Lahore is an area here, | not one point")})]),
  "on": dict(logic=["ON: a surface or a line.", "The thing touches it or stands along it."], ask="Is it a surface, or a line like a road or coast?", ex=[
    ("The shop is [on] Mall Road.", "a road is a line; | the shop stands along it", {"in": (N, "a road is not an area | with walls"), "at": (N, "at needs a point: | at 15 Mall Road")}),
    ("Gwadar is [on] the coast.", "a coast is a line | where land meets sea", {"in": (N, "the coast is a line, | not an area"), "at": (N, "the coast is long, | not one point")}),
    ("There is a picture [on] the wall.", "it touches the | wall's surface", {"in": (N, "it is not inside | the wall"), "at": (D, "at the wall = | standing beside it")})]),
  "at": dict(logic=["AT: one point.", "We only say where; we do not look inside."], ask="Is it one exact point, a meeting place or an address?", ex=[
    ("Meet me [at] the bus stop.", "the bus stop is one | point where we meet", {"in": (N, "a bus stop has | no inside"), "on": (N, "it is not a | surface or line")}),
    ("He lives [at] 15 Mall Road.", "a house number is | one exact point", {"in": (N, "an address is a point, | not an area"), "on": (N, "on Mall Road is fine, | but not with a number")}),
    ("We stopped [at] a petrol station.", "one stop on the way: | a point", {"in": (D, "in it = inside the | building itself"), "on": (N, "not a surface or line")})]),
}),
"in-on-at-time": dict(order=["in", "on", "at"], prove={
  "in": dict(logic=["IN: a long stretch of time.", "Months, years, seasons, parts of the day."], ask="Is it a month, year, season or part of the day?", ex=[
    ("Pakistan was founded [in] 1947.", "a year is a long | stretch of time", {"on": (N, "on is for one day"), "at": (N, "at is for a moment")}),
    ("It is very cold [in] January.", "a month is a | stretch of days", {"on": (N, "no single day | is named"), "at": (N, "a month is not a moment")}),
    ("I study best [in] the morning.", "the morning is a | stretch of hours", {"on": (N, "on Monday morning, | but not alone"), "at": (N, "at is for night, | noon, dawn")})]),
  "on": dict(logic=["ON: one day.", "A date, a day of the week, a special day."], ask="Is there one day or date?", ex=[
    ("The exam is [on] Monday.", "Monday is one day, | one box on the calendar", {"in": (N, "in is for longer | stretches"), "at": (N, "a day is not a | clock moment")}),
    ("She was born [on] 5 May.", "a date is one day", {"in": (N, "in May without | the date"), "at": (N, "at is for a time | on the clock")}),
    ("We met [on] Eid day.", "one special day", {"in": (N, "a day is not a | long stretch"), "at": (N, "at Eid = the festival | season, not the day")})]),
  "at": dict(logic=["AT: one moment.", "A clock time, or a point like night or noon."], ask="Is it a clock time or one moment?", ex=[
    ("The train leaves [at] 6:30.", "6:30 is one point | on the clock", {"in": (D, "in 6:30 is not | English; in 30 minutes"), "on": (N, "on is for days")}),
    ("The shops close [at] night.", "night is treated | as one point", {"in": (N, "in the night = during | one particular night"), "on": (N, "on is for days")}),
    ("We had lunch [at] noon.", "noon is one moment", {"in": (N, "noon is not a stretch"), "on": (N, "noon is not a day")})]),
}),
"of-about-on": dict(order=["of", "about", "on"], prove={
  "of": dict(logic=["OF: after words of knowing and feeling,", "it names the thing the mind holds."], ask="Does a know or feel word come before it (aware, afraid, proud)?", ex=[
    ("She is aware [of] the risk.", "aware is a knowing word: | the risk is what she knows", {"about": (N, "aware takes of, | not about"), "on": (N, "on is for formal | topics like books")}),
    ("He is afraid [of] snakes.", "fear holds the snakes | in the mind", {"about": (D, "afraid about = worried | about a situation"), "on": (N, "on is not a feeling | word partner")}),
    ("We are proud [of] our soldiers.", "proud is a feeling: | of names its object", {"about": (N, "proud takes of"), "on": (N, "not used")})]),
  "about": dict(logic=["ABOUT: around a topic, every side of it,", "in everyday talk."], ask="Is it everyday talk around a topic?", ex=[
    ("They talked [about] the match.", "they went round and round | the topic, casually", {"of": (N, "talk of is old, | not everyday"), "on": (D, "talked on = gave a | formal talk")}),
    ("I am worried [about] my exam.", "the worry circles | around the exam", {"of": (N, "worried takes about"), "on": (N, "on is formal, | not a feeling")}),
    ("Tell me [about] your village.", "every side of the topic: | people, fields, food", {"of": (D, "tell me of is | poetic, old-fashioned"), "on": (N, "not a formal study")})]),
  "on": dict(logic=["ON: a focused, formal topic:", "books, lectures, essays, reports."], ask="Is it a book, lecture, essay or report on one subject?", ex=[
    ("He wrote a book [on] Iqbal.", "a book is a formal | study of one subject", {"of": (D, "a book of Iqbal = | a book by him"), "about": (D, "about is fine but | everyday in tone")}),
    ("She gave a lecture [on] climate change.", "a lecture points at | one serious subject", {"of": (N, "lecture of = given by"), "about": (D, "less formal")}),
    ("Write an essay [on] democracy.", "an essay focuses | on one subject", {"of": (N, "essay of = written by"), "about": (D, "less formal")})]),
}),
"of-from": dict(order=["of", "from"], prove={
  "of": dict(logic=["OF: a part that belongs to a whole,", "or the material that stays as it is."], ask="Is it still part of the whole, or still that material?", ex=[
    ("the roof [of] the house", "the roof is a piece | of the house", {"from": (N, "the roof has not | come out of it")}),
    ("a table made [of] wood", "you can still see | the wood", {"from": (D, "made from = changed | into something new")}),
    ("the capital [of] Pakistan", "the capital belongs | to Pakistan", {"from": (N, "nothing comes out | of Pakistan here")})]),
  "from": dict(logic=["FROM: a starting point or a source.", "Something leaves it or is changed out of it."], ask="Did something start there, come out of it, or change from it?", ex=[
    ("a letter [from] my father", "the letter started | with him and travelled", {"of": (N, "a letter of my father | = his letters, old use")}),
    ("Cheese is made [from] milk.", "milk changed; | you cannot see it now", {"of": (N, "made of keeps the | material as it is")}),
    ("He is [from] Peshawar.", "Peshawar is where | his story starts", {"of": (N, "of Peshawar is old | and formal")})]),
}),
"for-to": dict(order=["to", "for"], prove={
  "to": dict(logic=["TO: something travels and reaches", "a person or place."], ask="Does something move and reach the person?", ex=[
    ("Give the book [to] Ali.", "the book travels | and reaches Ali", {"for": (D, "for Ali = on his | behalf, he gets the good")}),
    ("She wrote a letter [to] her mother.", "the letter goes to | her mother", {"for": (D, "for her mother = | on her behalf")}),
    ("Explain the rule [to] the class.", "the words travel | to the students", {"for": (N, "explain for is | not used here")})]),
  "for": dict(logic=["FOR: someone gets the good,", "or it is aimed at a purpose."], ask="Who benefits, or what is it for?", ex=[
    ("I cooked dinner [for] my parents.", "they get the good; | nothing travels to them", {"to": (N, "cook to is not English")}),
    ("This medicine is [for] fever.", "the purpose: what | it is used against", {"to": (N, "to does not show | purpose with nouns")}),
    ("She works [for] a bank.", "the bank gets | the good of her work", {"to": (N, "works to is not used")})]),
}),
"by-with": dict(order=["by", "with"], prove={
  "by": dict(logic=["BY: the doer of an action,", "or the method (by bus, by hand)."], ask="Who did it, or by what method?", ex=[
    ("The poem was written [by] Faiz.", "Faiz is the doer", {"with": (N, "Faiz is a person, | not a tool")}),
    ("We travelled [by] train.", "the method of travel", {"with": (N, "with a train = taking | a train along with you")}),
    ("The thief was caught [by] the police.", "the police did | the catching", {"with": (N, "the police are | not a tool")})]),
  "with": dict(logic=["WITH: the tool held in the hand.", "Someone uses it to do the action."], ask="Is it a tool someone used?", ex=[
    ("He cut the rope [with] a knife.", "the knife is the tool | in his hand", {"by": (N, "by a knife makes the | knife the doer")}),
    ("She wrote it [with] a pen.", "the pen is the tool", {"by": (D, "by hand is a method; | by a pen is not used")}),
    ("The road was blocked [with] stones.", "stones are what was used", {"by": (D, "by stones sounds like | the stones did it")})]),
}),
"in-into": dict(order=["into", "in", "onto", "on"], prove={
  "into": dict(logic=["INTO: a movement that ends inside."], ask="Is there movement from outside to inside?", ex=[
    ("He jumped [into] the river.", "a jump: outside, | then inside", {"in": (D, "jumped in the river = | jumped while inside it"), "onto": (N, "a river has | no top surface")}),
    ("Put the files [into] the drawer.", "the files move inside", {"in": (D, "in is common in speech; | into stresses movement"), "on": (N, "not on top")})]),
  "in": dict(logic=["IN: already inside, no movement."], ask="Is it just where something is now?", ex=[
    ("The files are [in] the drawer.", "they are inside now; | no movement", {"into": (N, "into needs movement"), "on": (N, "not on top")}),
    ("He is swimming [in] the river.", "he is inside the river | the whole time", {"into": (N, "into needs a | move from outside"), "onto": (N, "not used")})]),
  "onto": dict(logic=["ONTO: a movement that ends on a surface."], ask="Is there movement up onto a surface?", ex=[
    ("The cat jumped [onto] the table.", "a jump that ends | on the top", {"on": (D, "jumped on the table = | jumped up and down there"), "into": (N, "a table has no inside")})]),
  "on": dict(logic=["ON: already resting on a surface."], ask="Is it just resting there now?", ex=[
    ("The cat is sleeping [on] the table.", "resting on top, | no movement", {"onto": (N, "onto needs movement"), "into": (N, "not inside")})]),
}),
"between-among": dict(order=["between", "among"], prove={
  "between": dict(logic=["BETWEEN: a gap with something on each side,", "or a link between separate, named items."], ask="Are there two, or separate items you can name one by one?", ex=[
    ("Sit [between] Ali and Sara.", "one on each side, | you in the gap", {"among": (N, "two people are | not a crowd")}),
    ("a treaty [between] Pakistan, China and Iran", "three named partners, | each linked to each", {"among": (N, "among blurs them | into a crowd")}),
    ("Choose [between] tea and coffee.", "two separate choices", {"among": (N, "two is not a group")})]),
  "among": dict(logic=["AMONG: inside a crowd or group,", "not counting one by one."], ask="Is it a crowd or group seen as a whole?", ex=[
    ("He felt lost [among] strangers.", "strangers all around, | a crowd", {"between": (N, "no gap of two")}),
    ("Divide the sweets [among] the children.", "shared through the | whole group", {"between": (D, "between the two children | if there are two")}),
    ("She is popular [among] students.", "the whole group of | students", {"between": (N, "not two or named | items")})]),
}),
"over-above": dict(order=["over", "above", "under", "below"], prove={
  "over": dict(logic=["OVER: higher and covering,", "or crossing from side to side."], ask="Does it cover, or cross over?", ex=[
    ("She spread a sheet [over] the bed.", "the sheet covers | the bed", {"above": (N, "above does not cover"), "below": (N, "opposite side")}),
    ("A bridge was built [over] the river.", "it crosses from | one side to the other", {"above": (D, "above = only higher, | not crossing"), "under": (N, "opposite")})]),
  "above": dict(logic=["ABOVE: only higher. No touching,", "no covering. Also higher on a scale."], ask="Is it just at a higher level?", ex=[
    ("The temperature is [above] 40 degrees.", "a level on a scale", {"over": (D, "over 40 is common for | numbers, not scales"), "below": (N, "opposite meaning")}),
    ("His flat is [above] the shop.", "only higher, | one floor up", {"over": (D, "over the shop is | also heard"), "under": (N, "opposite meaning")})]),
  "under": dict(logic=["UNDER: directly beneath, often covered."], ask="Is something right over it, covering it?", ex=[
    ("The cat is hiding [under] the bed.", "the bed is right | over the cat", {"below": (N, "below is a level, | not hidden beneath"), "over": (N, "opposite")})]),
  "below": dict(logic=["BELOW: at a lower level, or lower on a scale."], ask="Is it just lower, or lower on a scale?", ex=[
    ("The marks were [below] average.", "a lower point | on a scale", {"under": (N, "under is for things | directly beneath"), "above": (N, "opposite")})]),
}),
"through-across-along": dict(order=["through", "across", "along"], prove={
  "through": dict(logic=["THROUGH: inside something,", "in at one end and out at the other."], ask="Do you go inside it from end to end?", ex=[
    ("The train passed [through] the tunnel.", "inside the tunnel, | end to end", {"across": (N, "across stays on | top of a surface"), "along": (N, "along follows | a line beside it")}),
    ("We walked [through] the forest.", "the trees were | all around us", {"across": (D, "across the forest = | over it, side to side"), "along": (N, "a forest is | not a line")})]),
  "across": dict(logic=["ACROSS: from one side to the other side,", "over a flat surface."], ask="Do you go from one side to the opposite side?", ex=[
    ("She walked [across] the road.", "one side, then | the opposite side", {"through": (N, "a road has no inside"), "along": (D, "along the road = | following its length")}),
    ("They swam [across] the river.", "bank to bank", {"through": (N, "not end to end inside"), "along": (D, "along = up or down | the river's length")})]),
  "along": dict(logic=["ALONG: following the length of a line."], ask="Do you follow its length?", ex=[
    ("We walked [along] the canal.", "following the canal's | length", {"across": (D, "across = to the | other bank"), "through": (N, "not inside the canal")}),
    ("Trees grow [along] the road.", "a line of trees | following the road", {"across": (N, "trees do not cross it"), "through": (N, "no inside")})]),
}),
"for-since-during": dict(order=["for", "since", "during"], prove={
  "for": dict(logic=["FOR: how long. A length of time:", "two hours, three years, a week."], ask="Does it measure how long?", ex=[
    ("I have lived here [for] ten years.", "ten years is a length", {"since": (N, "since needs a start: | since 2015"), "during": (N, "during needs an event")}),
    ("He waited [for] two hours.", "two hours measures | the waiting", {"since": (N, "two hours is not | a starting point"), "during": (N, "not an event")})]),
  "since": dict(logic=["SINCE: from which point till now.", "A starting point: 2015, Monday, childhood."], ask="Does it name the point when it started?", ex=[
    ("I have lived here [since] 2015.", "2015 is where | the line starts", {"for": (N, "for needs a length"), "during": (N, "2015 is not an event | here")}),
    ("It has rained [since] morning.", "morning is the start; | it is still raining", {"for": (N, "morning is not a length"), "during": (D, "during the morning = | at some time in it")})]),
  "during": dict(logic=["DURING: inside an event or a period:", "the war, the film, the night."], ask="Does it name an event, and something happens inside it?", ex=[
    ("He fell asleep [during] the film.", "the film is the event; | the sleep is inside it", {"for": (N, "for answers how long"), "since": (N, "since needs a starting | point till now")}),
    ("Many lost their homes [during] the floods.", "inside the event of | the floods", {"for": (N, "not a length"), "since": (D, "since the floods = from | then till now")})]),
}),
"by-until": dict(order=["by", "until"], prove={
  "by": dict(logic=["BY: a deadline. One action happens", "at the deadline or before it."], ask="Is it one action that must be done before a deadline?", ex=[
    ("Submit the form [by] Friday.", "one action, done | Friday or earlier", {"until": (N, "you do not keep | submitting till Friday")}),
    ("I will be home [by] six.", "I arrive at six | or before", {"until": (N, "arriving is one action, | not continuing")}),
    ("The work must be finished [by] June.", "finishing is one action | before the deadline", {"until": (N, "finish is not a | continuing action")})]),
  "until": dict(logic=["UNTIL: the action keeps going", "all the time up to that point, then stops."], ask="Does something continue up to that point?", ex=[
    ("Wait here [until] I come.", "waiting continues | up to my arrival", {"by": (N, "waiting is not one | action with a deadline")}),
    ("The shop is open [until] ten.", "open the whole time, | then it closes", {"by": (D, "open by ten = it will | have opened before ten")}),
    ("He stayed [until] the end.", "he kept staying | right up to the end", {"by": (N, "staying continues")})]),
}),
"beside-besides": dict(order=["beside", "besides"], prove={
  "beside": dict(logic=["BESIDE: a place, at the side of."], ask="Is it about where something is?", ex=[
    ("She sat [beside] her mother.", "a place: at her side", {"besides": (N, "besides adds; it is | not a place")}),
    ("There is a well [beside] the mosque.", "the well is at | the side of the mosque", {"besides": (N, "not adding anything")}),
    ("Put the lamp [beside] the bed.", "a place at the side", {"besides": (N, "not in addition")})]),
  "besides": dict(logic=["BESIDES: in addition to. One more thing added."], ask="Is something being added?", ex=[
    ("[Besides] Urdu, he speaks Pashto.", "Pashto is added | to Urdu", {"beside": (N, "beside is a place, | not adding")}),
    ("Who came [besides] Ali?", "who else, in | addition to Ali", {"beside": (D, "who came beside Ali = | walked at his side")}),
    ("[Besides] being clever, she is kind.", "kindness is added | to cleverness", {"beside": (N, "not a place")})]),
}),
"like-as": dict(order=["like", "as"], prove={
  "like": dict(logic=["LIKE: similar to. It only looks or acts the same;", "it is not really that thing."], ask="Is it only similar, not really that?", ex=[
    ("He fought [like] a lion.", "he is not a lion; | he fought similarly", {"as": (N, "as a lion = he really | was a lion")}),
    ("She looks [like] her mother.", "similar faces", {"as": (N, "she is not her mother")}),
    ("It tastes [like] honey.", "similar taste, | not honey", {"as": (N, "it is not honey")})]),
  "as": dict(logic=["AS: in the real role or job of.", "It really is that."], ask="Is it the real role or function?", ex=[
    ("She works [as] a teacher.", "teaching is her | real job", {"like": (D, "like a teacher = only | similar, not her job")}),
    ("He spoke [as] the chief guest.", "he really was | the chief guest", {"like": (N, "he did not only | seem to be")}),
    ("Use the box [as] a table.", "the box really does | the job of a table", {"like": (D, "like a table = it | only looks similar")})]),
}),
"except-besides": dict(order=["except", "besides", "instead of"], prove={
  "except": dict(logic=["EXCEPT: one is taken out of the group."], ask="Is one left out?", ex=[
    ("All passed [except] Hamid.", "Hamid did not pass: | he is taken out", {"besides": (D, "besides Hamid = Hamid | also passed"), "instead of": (N, "no one replaced him")}),
    ("The office opens daily [except] Sunday.", "Sunday is left out", {"besides": (N, "not adding Sunday"), "instead of": (N, "no swap")})]),
  "besides": dict(logic=["BESIDES: one is added to the group."], ask="Is one more added?", ex=[
    ("[Besides] Hamid, five others passed.", "Hamid passed, and | five more too", {"except": (D, "except Hamid = Hamid | failed"), "instead of": (N, "no swap")}),
    ("[Besides] a car, he owns a bike.", "the bike is added", {"except": (N, "not leaving out"), "instead of": (D, "instead of = he has | a bike, no car")})]),
  "instead of": dict(logic=["INSTEAD OF: one replaces the other."], ask="Does one take the place of the other?", ex=[
    ("Drink water [instead of] cola.", "water takes the | place of cola", {"except": (N, "nothing is left out | of a group"), "besides": (D, "besides = drink both")}),
    ("He sent his son [instead of] going himself.", "the son replaced him", {"except": (N, "not leaving out"), "besides": (D, "besides = both went")})]),
}),
"due-because": dict(order=["due to", "because of"], prove={
  "due to": dict(logic=["DUE TO: caused by. In formal English", "it follows BE (or a noun)."], ask="Does it come after is, was, are (or a noun)?", ex=[
    ("The delay was [due to] fog.", "after was: the delay | is caused by fog", {"because of": (D, "accepted in speech; | formal tests prefer due to")}),
    ("His success is [due to] hard work.", "after is", {"because of": (D, "accepted, but due to | is the formal choice")}),
    ("The accident was [due to] carelessness.", "after was", {"because of": (D, "formal tests prefer due to")})]),
  "because of": dict(logic=["BECAUSE OF: the reason for an action.", "It follows an action verb."], ask="Does it give the reason for an action (stopped, cancelled, missed)?", ex=[
    ("The match was stopped [because of] rain.", "stopped is an action: | rain is its reason", {"due to": (D, "disputed after an | action in formal tests")}),
    ("She missed school [because of] illness.", "missed is an action", {"due to": (N, "after missed, formal | tests reject due to")}),
    ("We stayed home [because of] the storm.", "stayed is an action", {"due to": (N, "formal tests reject it here")})]),
}),
"to-towards": dict(order=["to", "towards"], prove={
  "to": dict(logic=["TO: the movement reaches the goal."], ask="Does it reach the end?", ex=[
    ("We went [to] Murree.", "we reached Murree", {"towards": (D, "towards Murree = in that | direction, maybe not there")}),
    ("Send the file [to] me.", "the file must | reach me", {"towards": (N, "a file cannot only | head my way")}),
    ("He walked [to] school.", "he arrived at school", {"towards": (D, "towards = in that | direction only")})]),
  "towards": dict(logic=["TOWARDS: in the direction of.", "Facing or moving that way, maybe not arriving."], ask="Is it only the direction, or an attitude aimed at someone?", ex=[
    ("The dog ran [towards] me.", "the direction of running", {"to": (D, "to me = it reached me")}),
    ("His attitude [towards] the poor is kind.", "a feeling aimed | in a direction", {"to": (N, "attitude takes towards")}),
    ("We are working [towards] a solution.", "the direction of the | work; not there yet", {"to": (N, "work to a solution | is not used")})]),
}),
}
