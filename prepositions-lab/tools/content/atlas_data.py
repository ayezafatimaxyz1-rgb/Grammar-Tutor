# The sense atlas: the basic senses of every preposition, each drawn as its logic.
# See atlas.py for the format. Examples mark the preposition in [brackets].
# Explanations are written for someone meeting the idea for the first time.

# ================================================================ 1. WHERE THINGS ARE
UNIT("place", "Where things are")
L("at", "AT", "airportDot", "AT points to one exact spot.", "Think of a pin on a map. AT does not care about the inside or the surface, only the dot.", [
  S("at", "a point in place", "airportDot", "one dot on the map",
    ["We only say WHERE the point is.", "We do not look inside it or on top of it."],
    ["Meet me [at] the gate.", "She is waiting [at] the bus stop."], ("in", "IN looks inside an area: in the city.")),
  S("at", "a place where something happens", "school", "the place of an activity",
    ["The building is a point where an activity happens:", "school is for study, work is for working."],
    ["The children are [at] school.", "He is [at] work till five."], ("in", "in the school = inside the building itself.")),
  S("at", "a target", "target", "aimed at one point",
    ["An action flies to one point, like an arrow", "to the centre of a target."],
    ["Look [at] the board.", "Don't laugh [at] him."], ("to", "TO only shows direction: talk to him, not aim at him.")),
  S("at", "a point on a scale", "scale", "one mark on a scale",
    ["Speed, price and age are scales.", "AT picks one mark on the scale."],
    ["He drove [at] 100 km an hour.", "Rice sells [at] 300 rupees a kilo."], ("on", "ON is not used for points on a scale.")),
])
L("on", "ON", "cupOnTable", "ON means touching a surface and resting on it.", "Put a cup on the table: it touches the top and the table holds it up.", [
  S("on", "touching a surface", "cupOnTable", "resting on top, or stuck to a side",
    ["The thing touches the surface.", "Top, wall or ceiling: if it touches, it is ON."],
    ["The book is [on] the table.", "A picture hangs [on] the wall."], ("over", "OVER is higher with no touching: a lamp over the table.")),
  S("on", "on a line", "alongRiver", "a road, a river, a coast is a line",
    ["A line is a thin surface.", "Things stand along it, touching it."],
    ["Karachi is [on] the coast.", "There is a shop [on] Mall Road."], ("at", "AT picks one point on the line: at 15 Mall Road.")),
  S("on", "a vehicle you stand on", "busOn", "big transport with a floor to walk on",
    ["Buses, trains, planes and ships have a floor.", "You stand ON that floor."],
    ["She got [on] the bus.", "We were [on] the train for six hours."], ("in", "IN is for small vehicles you sit inside: in a car.")),
  S("on", "resting on a support", "onBase", "a base holds it up",
    ["Ideas can rest on a base too.", "If the base goes, the idea falls."],
    ["The film is based [on] a true story.", "It all depends [on] the weather."], ("in", "IN would mean inside, not held up.")),
])
L("in", "IN", "dotIn", "IN means inside a boundary, with something all around.", "Draw a box and put a dot inside it. The box is all around the dot: that is IN.", [
  S("in", "inside a container", "dotIn", "walls all around",
    ["Something is inside, and the walls are all around it."],
    ["The keys are [in] the drawer.", "There is milk [in] the jug."], ("on", "ON is outside, touching the surface.")),
  S("in", "inside an area", "inCity", "a big area with borders around you",
    ["A city or a country is a big area.", "Its borders are all around you."],
    ["She lives [in] Lahore.", "It is very hot [in] Pakistan."], ("at", "AT makes the place a point: at the station.")),
  S("in", "a small vehicle you sit inside", "carIn", "you sit inside, you cannot stand",
    ["In a car or a taxi you are boxed in."],
    ["He is [in] the car.", "We came [in] a taxi."], ("on", "ON is for big transport with a floor: on the bus.")),
  S("in", "inside a state", "surrounded", "a feeling or situation all around you",
    ["A state is like a cloud around you.", "You are inside it until you come out."],
    ["She is [in] love.", "The country is [in] danger."], ("on", "ON is used for some fixed states: on fire, on strike.")),
])
L("inside", "INSIDE / OUTSIDE", "insideBuilding", "INSIDE = within the walls. OUTSIDE = beyond the walls.", "Inside is a stronger IN: you can almost see the walls.", [
  S("inside", "within the walls", "insideBuilding", "the walls are clearly around",
    ["INSIDE stresses the walls around you."],
    ["Wait [inside] the hall.", "It is warm [inside] the house."], ("in", "IN is the ordinary word; inside makes the walls clear.")),
  S("outside", "beyond the walls", "goOut", "out past the boundary",
    ["OUTSIDE is on the far side of the walls."],
    ["The children are playing [outside] the house.", "Wait [outside] the room."], ("out of", "OUT OF shows movement: he ran out of the room.")),
])
L("over", "OVER / ABOVE", "floatAbove", "Both are higher. OVER can cover or cross; ABOVE is only higher.", "A bird above the tree is just higher. A blanket over the bed covers it.", [
  S("above", "higher, no touching", "floatAbove", "just at a higher level",
    ["ABOVE only says higher.", "It does not touch or cover."],
    ["The plane flew [above] the clouds.", "His flat is [above] the shop."], ("on", "ON touches the top.")),
  S("over", "covering", "tankOver", "spread across the top",
    ["OVER can cover something completely."],
    ["She put a blanket [over] the child.", "Clouds hung [over] the city."], ("above", "ABOVE does not cover; it is only higher.")),
  S("over", "crossing to the other side", "overRock", "up, across the top, and down",
    ["OVER can go from one side to the other, across the top."],
    ["The horse jumped [over] the wall.", "There is a bridge [over] the river."], ("through", "THROUGH goes inside, from one end to the other.")),
  S("over", "more than", "excess", "past a limit",
    ["Numbers are levels too.", "OVER is past the level."],
    ["He is [over] sixty.", "It cost [over] a million rupees."], ("above", "ABOVE is used for levels on a scale: above zero.")),
])
L("under", "UNDER / BELOW / BENEATH", "underTable", "UNDER = directly lower, often covered. BELOW = at a lower level.", "A cat under the table has the table over it. A town below the hill is just lower.", [
  S("under", "directly lower, covered", "underTable", "something is right over it",
    ["UNDER is right beneath, often hidden or covered."],
    ["The cat is [under] the table.", "He hid the key [under] a stone."], ("below", "BELOW only says lower, not right beneath.")),
  S("below", "at a lower level", "belowLine", "lower than a line or mark",
    ["BELOW compares two levels.", "One is lower than the other."],
    ["The town lies [below] the hills.", "The temperature fell [below] zero."], ("under", "UNDER is directly beneath something.")),
  S("under", "less than", "minus", "lower than a number",
    ["Numbers and ages work like levels."],
    ["Children [under] five travel free.", "It costs [under] a hundred rupees."], None),
  S("under", "controlled or covered by", "lawRoof", "a rule or power is over you",
    ["A law, a ruler or a process is over you like a roof."],
    ["The matter is [under] discussion.", "The country was [under] British rule."], ("below", "BELOW is never used for control.")),
])
L("beside", "BESIDE / BESIDES", "sideBySide", "BESIDE = at the side of. BESIDES = in addition to.", "One letter changes everything: beside is a place, besides is adding.", [
  S("beside", "at the side of", "sideBySide", "side by side",
    ["BESIDE is a place: right at the side."],
    ["Sit [beside] me.", "There is a well [beside] the mosque."], ("besides", "BESIDES means in addition to.")),
  S("besides", "in addition to", "stackAdd", "one more thing added",
    ["BESIDES adds something to what is already there."],
    ["[Besides] English, she speaks Arabic.", "Who came [besides] Ali?"], ("beside", "BESIDE is only a place.")),
])
L("near", "NEAR / NEXT TO / BY", "nearSchool", "All three are close. NEXT TO is touching close; BY is right at the side.", "Near is a short distance. Next to has nothing in between.", [
  S("near", "a short distance from", "nearSchool", "close, but not touching",
    ["NEAR says the distance is small."],
    ["We live [near] the university.", "Is there a bank [near] here?"], ("next to", "NEXT TO means nothing in between.")),
  S("next to", "right beside, nothing between", "nearbyShop", "the very next place",
    ["NEXT TO: no other thing in between."],
    ["The bank is [next to] the post office.", "She sat [next to] her mother."], ("near", "NEAR may have other things in between.")),
  S("by", "at the side of", "nearbyShop", "right at the edge of",
    ["BY is very close, at the side."],
    ["They have a house [by] the sea.", "He stood [by] the door."], ("near", "NEAR is a little further.")),
])
L("between", "BETWEEN / AMONG", "betweenTicks", "BETWEEN = in the gap of two (or of separate items). AMONG = in a crowd.", "Between two trees there is a gap. Among the trees you are lost in the crowd.", [
  S("between", "in the gap of two", "betweenTicks", "one on each side",
    ["BETWEEN: there is something on each side,", "and you are in the gap."],
    ["The shop is [between] the bank and the hotel.", "Sit [between] Ali and Sara."], ("among", "AMONG is in a crowd, not a gap.")),
  S("among", "in a crowd", "crowdDot", "surrounded by many",
    ["AMONG: many things all around you,", "you are one of the crowd."],
    ["He was [among] the crowd.", "She is popular [among] students."], ("between", "BETWEEN is for two, or clearly separate items.")),
  S("between", "linking two", "linkBetween", "a bond or choice of two",
    ["BETWEEN also links two sides:", "a match, a choice, a difference."],
    ["the match [between] Pakistan and India", "Choose [between] tea and coffee."], ("among", "AMONG shares something in a group: divide it among them.")),
])
L("front", "IN FRONT OF / BEHIND / OPPOSITE", "faces", "IN FRONT OF = before the face of something. BEHIND = at its back. OPPOSITE = facing it across a space.", "Imagine a person: in front is where the face looks, behind is the back.", [
  S("in front of", "before the face", [["person", -32, 0], ["arrowR", 22, 24, 0.4], ["box", 78, 24, 0.4]], "where the front faces",
    ["IN FRONT OF: on the side the thing faces."],
    ["The car is parked [in front of] the house.", "Don't stand [in front of] the TV."], ("opposite", "OPPOSITE has a road or space between, facing each other.")),
  S("behind", "at the back", [["box", 4, 24, 0.4], ["person", 25, 0]], "at the back side",
    ["BEHIND: at the back, often hidden."],
    ["The garden is [behind] the house.", "Who is [behind] this plan?"], ("after", "AFTER is about time or order, not place.")),
  S("opposite", "facing across a space", "faces", "two things face each other",
    ["OPPOSITE: across a road or a table, face to face."],
    ["The bank is [opposite] the mosque.", "She sat [opposite] me."], ("in front of", "IN FRONT OF has nothing between.")),
])
L("around", "AROUND / ROUND / ON TOP OF", "surrounded", "AROUND = in a circle about something. ON TOP OF = on the highest part.", "Draw a circle round a dot: the circle is around it.", [
  S("around", "in a circle about", "surrounded", "all the way round",
    ["AROUND goes in a circle, or on every side."],
    ["They sat [around] the fire.", "The earth moves [around] the sun."], ("about", "ABOUT is used for a topic: talk about the sun.")),
  S("around", "approximately", "aboutCircle", "close to a number, not exact",
    ["AROUND a number = somewhere close to it."],
    ["It costs [around] 500 rupees.", "Come [around] six o'clock."], ("at", "AT six = exactly six.")),
  S("on top of", "on the highest part", "onTopPile", "at the very top",
    ["ON TOP OF: on the highest surface,", "or in addition to something."],
    ["The file is [on top of] the pile.", "[On top of] that, it started to rain."], ("above", "ABOVE does not touch.")),
])

# ================================================================ 2. MOVEMENT
UNIT("move", "Movement and direction")
L("to", "TO / TOWARDS", "reachDot", "TO = movement that reaches a goal. TOWARDS = in the direction of, maybe not reaching.", "Throw a ball TO a friend: it reaches. Walk TOWARDS the sea: you may stop on the way.", [
  S("to", "reaching a goal", "reachDot", "the arrow touches the end",
    ["TO: the movement ends at the goal."],
    ["We went [to] Islamabad.", "She sent a letter [to] her father."], ("towards", "TOWARDS only shows the direction.")),
  S("towards", "in the direction of", "lookAhead", "facing or moving that way",
    ["TOWARDS: pointed that way, not yet there."],
    ["He walked [towards] the door.", "Our attitude [towards] the poor"], ("to", "TO reaches the end.")),
  S("to", "a receiver", "giveTo", "the person something reaches",
    ["Things and words can travel TO a person."],
    ["Give it [to] me.", "She spoke [to] the manager."], ("for", "FOR is someone's benefit: I made tea for you.")),
  S("to", "up to a limit", "upTo", "as far as a point",
    ["TO can mark how far something goes."],
    ["Count [to] ten.", "The water came up [to] our knees."], ("till", "TILL is for time only.")),
])
L("from", "FROM", "origin", "FROM = the starting point. The movement goes away from it.", "Think of a river from a mountain: the mountain is where it starts.", [
  S("from", "a starting point", "origin", "where the movement begins",
    ["FROM marks the start; the arrow leaves it."],
    ["She is [from] Multan.", "The train comes [from] Quetta."], ("of", "OF belongs to: a man of Multan is old-fashioned and formal.")),
  S("from", "a source", "letterFrom", "where something comes out",
    ["Letters, light, ideas: they come FROM a source."],
    ["a letter [from] my brother", "Milk comes [from] cows."], ("by", "BY names the doer: a letter written by my brother.")),
  S("from", "kept away from", "holdBack", "a barrier stops it",
    ["FROM can show separation:", "something is kept away."],
    ["Protect the child [from] danger.", "Rain prevented us [from] playing."], ("of", "OF does not separate: protect of is wrong.")),
  S("from", "different from", "different", "two things apart",
    ["Difference pulls two things apart."],
    ["Urdu is different [from] Arabic.", "This copy is no different [from] the original."], ("than", "THAN is for comparatives: bigger than, not different than (in formal English).")),
])
L("into", "INTO / OUT OF / ONTO / OFF", "intoBag", "INTO = moving to the inside. OUT OF = moving to the outside. ONTO = moving to a surface. OFF = moving away from a surface.", "IN and ON are positions. INTO and ONTO are journeys that end there.", [
  S("into", "moving to the inside", "intoBag", "a journey that ends inside",
    ["INTO is movement: outside, then inside."],
    ["She walked [into] the room.", "Put the money [into] the bag."], ("in", "IN is the position after the move: she is in the room.")),
  S("out of", "moving to the outside", "goOut", "inside, then outside",
    ["OUT OF is the opposite journey."],
    ["He ran [out of] the house.", "Take it [out of] the box."], ("from", "FROM just shows the start, not the inside.")),
  S("onto", "moving to a surface", "turnOnto", "a journey that ends on top",
    ["ONTO: up and on, ending on the surface."],
    ["The cat jumped [onto] the table.", "Turn [onto] the main road."], ("on", "ON is the position: the cat is on the table.")),
  S("off", "away from a surface", "bounceOff", "it leaves the surface",
    ["OFF: no longer touching."],
    ["The book fell [off] the shelf.", "Get [off] the bus here."], ("from", "FROM is a general start; OFF leaves a surface.")),
  S("into", "a change of state", "translate", "one form becomes another",
    ["INTO can also show change:", "one thing turns into another."],
    ["Translate this [into] Urdu.", "Water turned [into] ice."], ("to", "TO is used for some changes too: from bad to worse.")),
])
L("through", "THROUGH / ACROSS / ALONG", "passThrough", "THROUGH = inside, end to end. ACROSS = from one side to the other. ALONG = following a line.", "Through a tunnel, across a road, along a river.", [
  S("through", "inside, from end to end", "passThrough", "in one end and out the other",
    ["THROUGH goes inside something", "and comes out the other end."],
    ["The train went [through] the tunnel.", "Light came [through] the window."], ("across", "ACROSS stays on the surface.")),
  S("across", "from one side to the other", "acrossRoad", "over a flat surface, side to side",
    ["ACROSS: one side, then the opposite side."],
    ["Walk [across] the road.", "They swam [across] the river."], ("along", "ALONG follows the length.")),
  S("along", "following a line", "alongRiver", "moving in the line's direction",
    ["ALONG: you follow the length of a line."],
    ["We walked [along] the canal.", "Trees grow [along] the road."], ("across", "ACROSS cuts through the width.")),
  S("through", "by means of, from start to finish", "allThrough", "the whole way, or the way you used",
    ["THROUGH can also mean the means you used,", "or the whole time."],
    ["I got the job [through] a friend.", "He slept [through] the storm."], ("by", "BY is the simple word for means: by bus.")),
])
L("past", "PAST / UP / DOWN / VIA", "pastBank", "PAST = going by. UP and DOWN = higher and lower. VIA = through a stop on the way.", "Past is beside you, then behind you.", [
  S("past", "going by", "pastBank", "beside it, then beyond it",
    ["PAST: you come near, and go beyond."],
    ["He walked [past] the bank.", "It is ten [past] five."], ("passed", "PASSED is a verb: he passed the bank.")),
  S("up", "to a higher place", "hillUp", "climbing",
    ["UP: higher."],
    ["She ran [up] the stairs.", "They climbed [up] the hill."], ("down", "DOWN is lower.")),
  S("down", "to a lower place", "arrowDown", "falling or going lower",
    ["DOWN: lower; also along a road."],
    ["The ball rolled [down] the hill.", "Walk [down] the road."], ("up", "UP is higher.")),
  S("via", "through a stop on the way", "roadPass", "passing one place to reach another",
    ["VIA names the stop or route you use."],
    ["We flew to London [via] Dubai.", "Send it [via] email."], ("by", "BY is for the kind of transport: by air.")),
])

# ================================================================ 3. TIME
UNIT("time", "Time")
L("attime", "AT / ON / IN for time", "clock", "AT = a point of time. ON = a day. IN = a longer stretch.", "The bigger the time, the bigger the word: at a moment, on a day, in a month or year.", [
  S("at", "a clock time or a moment", "clock", "one point on the clock",
    ["AT: one exact moment."],
    ["The class starts [at] nine.", "I wake up [at] dawn."], ("on", "ON is for days.")),
  S("on", "a day or a date", "calendar", "one box on the calendar",
    ["ON: a day is one square on the calendar."],
    ["I was born [on] 14 August.", "We meet [on] Fridays."], ("in", "IN is for months and years.")),
  S("in", "a month, year or season", "inPeriod", "a long stretch around the event",
    ["IN: a longer period, all around the event."],
    ["It happened [in] 1947.", "It rains a lot [in] July."], ("on", "ON is for a single day.")),
  S("in", "after a time from now", "inTimeBefore", "at the end of a stretch",
    ["IN ten minutes = when ten minutes have passed."],
    ["The train leaves [in] ten minutes.", "I will be back [in] a week."], ("within", "WITHIN = before the end of the stretch.")),
])
L("fortime", "FOR / SINCE / DURING", "span", "FOR = how long. SINCE = from which point. DURING = inside which event.", "FOR measures the length; SINCE pins the start; DURING names the event.", [
  S("for", "a length of time", "span", "measure the whole stretch",
    ["FOR + a length: two hours, three years."],
    ["I have lived here [for] ten years.", "He waited [for] an hour."], ("since", "SINCE needs a starting point, not a length.")),
  S("since", "from a starting point till now", "sincePoint", "the clock started at this point",
    ["SINCE + the starting point: 2015, Monday, childhood."],
    ["I have lived here [since] 2015.", "It has rained [since] morning."], ("for", "FOR needs a length.")),
  S("during", "inside an event", "decade", "somewhere inside the event",
    ["DURING + an event: the war, the film, the night."],
    ["He slept [during] the film.", "Many died [during] the war."], ("for", "FOR answers how long, not when.")),
])
L("bytime", "BY / UNTIL", "notUntil", "BY = not later than (a deadline). UNTIL = all the time up to that point.", "BY is a deadline: finish before it. UNTIL is a line that keeps going and then stops.", [
  S("by", "not later than", "priorDot", "a deadline: done at or before it",
    ["BY: the action happens before the deadline,", "or at the latest on it."],
    ["Submit the form [by] Friday.", "I'll be home [by] six."], ("until", "UNTIL continues the whole time.")),
  S("until", "all the time up to", "notUntil", "it continues, then stops",
    ["UNTIL: the action keeps going up to the point."],
    ["Wait here [until] I come.", "The shop is open [until] ten."], ("by", "BY is a single deadline.")),
])
L("before", "BEFORE / AFTER / WITHIN", "priorDot", "BEFORE = earlier than. AFTER = later than. WITHIN = inside a limit.", "Put an event on a time line: before is on its left, after on its right.", [
  S("before", "earlier than", "priorDot", "on the left of the point",
    ["BEFORE: earlier than the event."],
    ["Wash your hands [before] meals.", "He left [before] dawn."], ("ago", "AGO counts back from now: two years ago.")),
  S("after", "later than", "afterDot", "on the right of the point",
    ["AFTER: later than the event."],
    ["We'll talk [after] lunch.", "[After] the war, the city was rebuilt."], ("behind", "BEHIND is a place, not time.")),
  S("within", "inside a limit", "inTimeBefore", "before the limit runs out",
    ["WITHIN: not beyond the limit, of time or place."],
    ["Reply [within] a week.", "Stay [within] the boundary."], ("in", "IN a week = at the end of a week.")),
])

# ================================================================ 4. IDEAS AND RELATIONS
UNIT("ideas", "Ideas and relations")
L("of", "OF", "ownerBook", "OF joins a part to its whole, a thing to what it belongs to, or what it is made of.", "The roof of the house: the roof is a piece of the house.", [
  S("of", "belonging to", "ownerBook", "it is part of someone's",
    ["OF links a thing to what it belongs to."],
    ["the capital [of] Pakistan", "the end [of] the story"], ("from", "FROM shows where something comes from, not where it belongs.")),
  S("of", "a part of a whole", "roofOf", "a piece taken from the whole",
    ["OF: a part and the whole it is cut from."],
    ["a piece [of] cake", "some [of] the students"], ("from", "FROM is movement away; OF is still part.")),
  S("of", "what it is made of or holds", "emptyJar", "the material or contents",
    ["OF names the material or what fills it."],
    ["a glass [of] water", "a ring made [of] gold"], ("from", "made from = changed into something new: paper is made from wood.")),
  S("of", "about, concerning (knowledge and feeling)", "awareOf", "the thing the mind holds",
    ["After words of knowing and feeling,", "OF names the thing the mind holds."],
    ["She is aware [of] the danger.", "He is afraid [of] dogs."], ("about", "ABOUT is around a topic: think about it.")),
  S("of", "a cause from inside", "sickPerson", "an illness or condition",
    ["OF can give a cause that is part of the person."],
    ["He died [of] cancer.", "Many people die [of] hunger."], ("from", "FROM is an outside cause: died from his injuries.")),
])
L("about", "ABOUT / ON (topic)", "aboutCircle", "ABOUT = around a topic, all its sides. ON = a serious, focused topic.", "Talk about the weather: you walk all around the topic.", [
  S("about", "around a topic", "aboutCircle", "circling every side of the subject",
    ["ABOUT goes all around a topic, in an everyday way."],
    ["We talked [about] the match.", "a story [about] a brave girl"], ("on", "ON is narrower and more formal: a lecture on law.")),
  S("on", "a focused topic", "pointDoc", "pointing at one subject",
    ["ON: a serious or formal topic, like a book or speech."],
    ["a book [on] Iqbal", "He gave a talk [on] climate change."], ("about", "ABOUT is general and everyday.")),
  S("about", "approximately", "circleDoc", "near a number, not exact",
    ["ABOUT a number = roughly."],
    ["It is [about] ten kilometres.", "[About] fifty people came."], ("around", "AROUND means the same here.")),
  S("about", "here and there", "everywhere", "all over a place",
    ["ABOUT can also mean in different directions."],
    ["Children were running [about] the yard.", "Papers lay [about] the room."], ("around", "AROUND works the same way.")),
])
L("for", "FOR", "wantStar", "FOR aims at a purpose, a person who benefits, or an exchange.", "Reach FOR a star: your hand aims at what you want.", [
  S("for", "a purpose", "aimGoal", "what you aim at",
    ["FOR names the aim: why or what for."],
    ["This knife is [for] cutting bread.", "He went out [for] a walk."], ("to", "TO + a verb also gives a purpose: to buy bread.")),
  S("for", "someone's benefit", "careBox", "the person who gets the good",
    ["FOR: the person the action is good for."],
    ["I bought a gift [for] her.", "She works [for] a bank."], ("to", "TO is the receiver of a movement: give it to her.")),
  S("for", "an exchange or price", "exchange", "one thing in return for another",
    ["FOR: one thing given in return for another."],
    ["I bought it [for] 200 rupees.", "Thank you [for] your help."], ("with", "WITH is the tool, not the price.")),
  S("for", "a reason", "reasonFor", "why something happens",
    ["FOR can give the reason."],
    ["He was punished [for] lying.", "Lahore is famous [for] its food."], ("of", "OF is used with die, guilty, accuse: guilty of lying.")),
  S("for", "in support of", "voteFor", "on someone's side",
    ["FOR: on the side of."],
    ["Are you [for] or against the plan?", "Most voted [for] the bill."], ("against", "AGAINST is the opposite side.")),
])
L("with", "WITH / WITHOUT", "agreeWith", "WITH = together, or the tool used. WITHOUT = not together, none.", "Two people side by side: one is with the other.", [
  S("with", "together", "agreeWith", "side by side",
    ["WITH: two things together."],
    ["I went [with] my brother.", "Tea [with] milk, please."], ("by", "BY names a method or a doer, not a companion.")),
  S("with", "a tool", "pen", "the thing in your hand",
    ["WITH names the tool you hold."],
    ["Write [with] a pen.", "He cut it [with] a knife."], ("by", "BY names the method or the doer: by hand, by Ali.")),
  S("with", "having", "longHair", "a feature it carries",
    ["WITH can describe what someone has."],
    ["a girl [with] long hair", "a house [with] a garden"], ("of", "OF links a part: the hair of the girl.")),
  S("with", "a feeling towards a person", "angryFace", "the person you feel it at",
    ["Many feelings take WITH for a person."],
    ["She is angry [with] me.", "He is pleased [with] his result."], ("at", "AT is often for a thing or event: angry at the decision.")),
  S("without", "not having, none", "personLeft", "the other one is missing",
    ["WITHOUT: the companion is not there."],
    ["Tea [without] sugar", "He left [without] a word."], ("with", "WITH is the opposite.")),
])
L("byagent", "BY (doer and means)", "writtenBy", "BY names who did it or how it was done.", "Under a painting: by Sadequain. That names the painter.", [
  S("by", "the doer", "writtenBy", "who did the action",
    ["In passive sentences, BY names the doer."],
    ["The poem was written [by] Iqbal.", "He was bitten [by] a dog."], ("with", "WITH names the tool: written with a pen.")),
  S("by", "the means or method", "emailBy", "how it was done",
    ["BY: the method, especially transport."],
    ["She came [by] bus.", "Pay [by] cheque."], ("in", "IN is used with a/the: in the bus, in a taxi.")),
  S("by", "an amount of difference", "riseBy", "how much it changed",
    ["BY: the size of the difference."],
    ["Prices rose [by] ten percent.", "He won [by] two votes."], ("to", "TO is where it ended: rose to 50.")),
  S("by", "according to a rule", "followRule", "following a rule or a clock",
    ["BY can mean following a rule or standard."],
    ["Play [by] the rules.", "It is late [by] my watch."], ("with", "WITH is not used for rules.")),
])
L("like", "LIKE / AS / THAN", "likeSim", "LIKE = similar to. AS = in the role of. THAN = in a comparison.", "He talks like a teacher (but is not one). He works as a teacher (that is his job).", [
  S("like", "similar to", "likeSim", "two that look alike",
    ["LIKE: similar, but not the same thing."],
    ["She sings [like] a bird.", "He looks [like] his father."], ("as", "AS is the real role.")),
  S("as", "in the role of", "asRole", "the real job or function",
    ["AS: the thing really is this role."],
    ["He works [as] a doctor.", "Use this box [as] a table."], ("like", "LIKE is only similar.")),
  S("than", "in a comparison", "taller", "one is more or less than the other",
    ["THAN follows comparatives: taller, better, more."],
    ["He is taller [than] me.", "I would rather walk [than] wait."], ("to", "Superior, inferior, prefer take TO: superior to.")),
])
L("except", "EXCEPT / BESIDES / INSTEAD OF", "exceptOne", "EXCEPT = leaving one out. BESIDES = adding one. INSTEAD OF = replacing one.", "Everyone came except Ali (Ali did not come). Besides Ali, Sara came (both came).", [
  S("except", "leaving out", "exceptOne", "all but one",
    ["EXCEPT takes one out of the group."],
    ["Everyone came [except] Ali.", "The shop opens daily [except] Sunday."], ("besides", "BESIDES adds; it does not leave out.")),
  S("instead of", "in place of", "replaceDoc", "one replaces the other",
    ["INSTEAD OF: the first is taken away, the second takes its place."],
    ["Drink water [instead of] cola.", "He sent his son [instead of] going himself."], ("besides", "BESIDES keeps both.")),
  S("but", "except (after all, none, every)", "groupOut", "everyone but one",
    ["BUT can mean except after all, none, every, nobody."],
    ["Nobody [but] you knew.", "All [but] one passed."], ("except", "EXCEPT works the same here.")),
])
L("despite", "DESPITE / IN SPITE OF", "umbrellaRain", "Both mean: even though something was against it.", "The rain falls, but you walk on under your umbrella: despite the rain.", [
  S("despite", "even though there is", "umbrellaRain", "something is against it, it happens anyway",
    ["DESPITE + a noun: the obstacle did not stop it."],
    ["[Despite] the rain, the match went on.", "He failed [despite] working hard."], ("despite of", "Never say despite of.")),
  S("in spite of", "the same, in three words", "umbrellaRain", "inside the opposition",
    ["IN SPITE OF = despite. Keep all three words."],
    ["[In spite of] the rain, we went out.", "She smiled [in spite of] the pain."], ("despite", "Despite has no of.")),
])
L("because", "BECAUSE OF / DUE TO / OWING TO / THANKS TO", "causeEffect", "All four give a cause. DUE TO follows BE. THANKS TO is a cause you are glad of.", "Rain, then a delay: the rain is the cause, the delay is the result.", [
  S("because of", "the cause", "causeEffect", "this made that happen",
    ["BECAUSE OF + a noun gives the cause of an action."],
    ["The match was stopped [because of] rain.", "He is late [because of] traffic."], ("because", "BECAUSE needs a full clause: because it rained.")),
  S("due to", "caused by (after be)", "causeEffect", "the result is due to the cause",
    ["Formal English uses DUE TO after BE."],
    ["The delay was [due to] fog.", "His success is [due to] hard work."], ("because of", "Use because of after an action verb.")),
  S("owing to", "because of (formal)", "reasonFor", "a formal cause",
    ["OWING TO = because of, in formal writing."],
    ["[Owing to] illness, he missed the exam.", "The flight was cancelled [owing to] a strike."], ("due to", "Due to follows be.")),
  S("thanks to", "a cause you are glad of", "workSuccess", "a good cause",
    ["THANKS TO: a cause, usually good."],
    ["[Thanks to] the doctors, she recovered.", "We won [thanks to] Ali."], ("because of", "Because of is neutral.")),
])
L("against", "AGAINST / ACCORDING TO / PER", "versus", "AGAINST = opposing, or pressing on. ACCORDING TO = as said by. PER = for each.", "Two teams face each other: one plays against the other.", [
  S("against", "opposing", "versus", "facing the other side",
    ["AGAINST: on the opposite side."],
    ["Pakistan played [against] India.", "Most people are [against] the tax."], ("for", "FOR is the supporting side.")),
  S("against", "pressing on, touching", "leanOn", "leaning onto a surface",
    ["AGAINST: pressed onto something."],
    ["He leaned [against] the wall.", "Rain beat [against] the window."], ("on", "ON rests on top.")),
  S("against", "protection from", "shield", "a shield in front of a danger",
    ["AGAINST can mean protecting from."],
    ["a vaccine [against] polio", "insurance [against] fire"], ("from", "FROM is used with protect: protect from danger.")),
  S("according to", "as said by a source", "docSays", "the source of a statement",
    ["ACCORDING TO names who says it."],
    ["[According to] the report, crime has fallen.", "Do it [according to] the rules."], ("by", "BY names the doer, not the source.")),
  S("per", "for each", "perKilo", "one price or amount for each unit",
    ["PER = for each one."],
    ["100 rupees [per] kilo", "60 km [per] hour"], None),
])
L("beyond", "BEYOND / WITHIN / UNDER / OVER (power)", "farFrom", "BEYOND = further than a limit. WITHIN = inside it. UNDER and OVER = below or above a power.", "A field with a fence: within the fence, beyond the fence.", [
  S("beyond", "further than a limit", "farFrom", "past the edge",
    ["BEYOND: on the far side of a limit, place or idea."],
    ["The village is [beyond] the river.", "This is [beyond] my understanding."], ("over", "OVER crosses the top; beyond is the far side.")),
  S("within", "inside a limit", "reachDot", "not past the edge",
    ["WITHIN: inside the limit."],
    ["Live [within] your means.", "The goal is [within] reach."], ("in", "IN is the plain word for inside.")),
  S("over", "having power over", "leadGroup", "above others, in control",
    ["OVER: higher in power."],
    ["The king ruled [over] the land.", "She has no control [over] him."], ("on", "ON is not used for control.")),
])

# ================================================================ 5. CONFUSING PAIRS, SIDE BY SIDE
UNIT("pairs", "Confusing pairs, side by side")
D("in-on-at-place", "IN, ON, AT for place", [
    ("in", "inCity", "in Lahore", "a big area around you"),
    ("on", "roadPass", "on Mall Road", "a line you stand along"),
    ("at", "airportDot", "at the museum", "one point")],
  ["Bigger area = IN · a line or surface = ON · one point = AT", "I live in Lahore, on Mall Road, at number 15."],
  ("We met ___ the station and walked into the city.", "at", ["in", "on"], "The station is one meeting point: at.", "In the station = inside the building; on is not used here."))
D("in-on-at-time", "IN, ON, AT for time", [
    ("in", "inPeriod", "in July", "a long stretch"),
    ("on", "calendar", "on Monday", "one day"),
    ("at", "clock", "at 9 o'clock", "one moment")],
  ["Long stretch = IN · one day = ON · one moment = AT", "in 1947, on 14 August, at midnight"],
  ("Pakistan came into being ___ 14 August 1947.", "on", ["in", "at"], "A date is one day: on.", "IN is for months and years without a day; AT is for clock times."))
D("of-about-on", "OF, ABOUT, ON", [
    ("of", "awareOf", "aware of the danger", "the thing the mind holds"),
    ("about", "aboutCircle", "talk about the match", "around a topic, everyday"),
    ("on", "pointDoc", "a book on law", "a focused, formal topic")],
  ["OF after know/feel words · ABOUT for everyday topics · ON for formal topics", "think of = have an idea · think about = consider all sides"],
  ("She wrote a thesis ___ Iqbal's poetry.", "on", ["about", "of"], "A thesis is a formal study of one topic: on.", "About is everyday; of would mean belonging to."))
D("of-from", "OF and FROM", [
    ("of", "roofOf", "the roof of the house", "a part that belongs"),
    ("from", "origin", "a letter from home", "a starting point or source")],
  ["OF = belongs, part of · FROM = starts there, comes out of", "made of wood (still wood) · made from milk (changed: cheese)"],
  ("Cheese is made ___ milk.", "from", ["of", "by"], "Milk is changed into cheese: made from.", "Made of keeps the material as it is: a table made of wood."))
D("for-to", "FOR and TO", [
    ("to", "giveTo", "give it to her", "a receiver: it reaches her"),
    ("for", "careBox", "buy it for her", "a benefit: it is good for her")],
  ["TO = the thing travels and reaches · FOR = someone gets the good", "send a letter to him · write a letter for him (on his behalf)"],
  ("I made a cup of tea ___ my mother.", "for", ["to", "with"], "The tea is for her benefit.", "To would need movement: I took the tea to her."))
D("by-with", "BY and WITH", [
    ("by", "writtenBy", "written by Iqbal", "the doer"),
    ("with", "pen", "written with a pen", "the tool in the hand")],
  ["BY = who did it, or the method · WITH = the tool used", "killed by a robber · killed with a knife"],
  ("The window was broken ___ a stone.", "with", ["by", "from"], "The stone is the tool used: with.", "By would name the doer: broken by the boys."))
D("in-into", "IN and INTO, ON and ONTO", [
    ("into", "intoBag", "put it into the bag", "the journey"),
    ("in", "dotIn", "it is in the bag", "the position after")],
  ["INTO/ONTO = moving to · IN/ON = already there", "He jumped into the river. Now he is in the river."],
  ("The thief climbed ___ the roof and hid there.", "onto", ["on", "into"], "Climbing is a movement that ends on the roof: onto.", "On is where he is afterwards; into means inside."))
D("between-among", "BETWEEN and AMONG", [
    ("between", "betweenTicks", "between two trees", "a gap with one on each side"),
    ("among", "crowdDot", "among the trees", "lost in a crowd")],
  ["BETWEEN = two, or clearly separate items · AMONG = a group or crowd", "Divide the land between the two brothers · among the villagers"],
  ("The property was divided ___ his five sons.", "among", ["between", "in"], "Five sons are a group sharing it: among.", "Between is for two, or separate named items."))
D("over-above", "OVER, ABOVE, UNDER, BELOW", [
    ("over", "tankOver", "a blanket over the bed", "covering or crossing"),
    ("above", "floatAbove", "a bird above the tree", "only higher"),
    ("under", "underTable", "a cat under the table", "right beneath")],
  ["OVER covers or crosses · ABOVE is only higher · UNDER is right beneath · BELOW is only lower", "above/below for levels: above average, below zero"],
  ("The temperature dropped ___ zero last night.", "below", ["under", "beneath"], "Zero is a level on a scale: below.", "Under is for being directly beneath something."))
D("through-across-along", "THROUGH, ACROSS, ALONG", [
    ("through", "passThrough", "through the tunnel", "inside, end to end"),
    ("across", "acrossRoad", "across the road", "side to side, on the surface"),
    ("along", "alongRiver", "along the river", "following its length")],
  ["THROUGH = inside · ACROSS = over the width · ALONG = the length", "through the forest, across the field, along the path"],
  ("We walked ___ the forest, under the thick trees.", "through", ["across", "along"], "Under the trees you are inside the forest: through.", "Across is over an open surface; along follows a line."))
D("for-since-during", "FOR, SINCE, DURING", [
    ("for", "span", "for two years", "a length"),
    ("since", "sincePoint", "since 2020", "a starting point"),
    ("during", "decade", "during the war", "inside an event")],
  ["FOR + length · SINCE + starting point · DURING + event", "I have been here for two years, since 2020; I met him during the war."],
  ("He has been ill ___ last Monday.", "since", ["for", "from"], "Last Monday is the starting point: since.", "For needs a length (for a week); from needs an end (from Monday to Friday)."))
D("by-until", "BY and UNTIL", [
    ("by", "priorDot", "finish by Friday", "a deadline: at or before"),
    ("until", "notUntil", "wait until Friday", "all the time up to")],
  ["BY = one action, done before the deadline · UNTIL = a state that goes on up to then", "Return the book by Monday. Keep the book until Monday."],
  ("The report must reach us ___ the 30th.", "by", ["until", "since"], "One action before a deadline: by.", "Until would mean it keeps reaching us all the time up to the 30th."))
D("beside-besides", "BESIDE and BESIDES", [
    ("beside", "sideBySide", "sit beside me", "at my side"),
    ("besides", "stackAdd", "besides English", "in addition to")],
  ["BESIDE = a place · BESIDES = adding one more", "She sat beside Ali. Besides Ali, three others came."],
  ("___ his salary, he earns from tuitions.", "Besides", ["Beside", "Except"], "His tuition money is added to his salary: besides.", "Beside is a place; except would take something out."))
D("like-as", "LIKE and AS", [
    ("like", "likeSim", "he talks like a teacher", "similar, not really"),
    ("as", "asRole", "he works as a teacher", "really in that role")],
  ["LIKE = similar to · AS = in the real role of", "As your friend, I advise you. Like a friend, he helped me."],
  ("She worked ___ a nurse for ten years.", "as", ["like", "for"], "Nursing was her real job: as.", "Like would mean she only seemed like a nurse."))
D("except-besides", "EXCEPT, BESIDES, INSTEAD OF", [
    ("except", "exceptOne", "all except Ali", "one taken out"),
    ("besides", "stackAdd", "besides Ali", "one added"),
    ("instead of", "replaceDoc", "instead of Ali", "one replaced")],
  ["EXCEPT leaves out · BESIDES adds · INSTEAD OF replaces", "Everyone passed except Ali. Besides Ali, Sara passed. Sara went instead of Ali."],
  ("All the ministers attended ___ the finance minister, who was abroad.", "except", ["besides", "instead of"], "The finance minister is left out: except.", "Besides would add him; instead of would replace someone."))
D("due-because", "DUE TO and BECAUSE OF", [
    ("due to", "causeEffect", "The delay was due to fog.", "after BE"),
    ("because of", "reasonFor", "We were late because of fog.", "after an action")],
  ["DUE TO after be (and nouns) · BECAUSE OF after action verbs", "His absence was due to illness. He was absent because of illness."],
  ("The flight was cancelled ___ bad weather.", "because of", ["due to", "thanks to"], "Cancelled is an action verb: because of (formal tests prefer it).", "Due to fits after be: the cancellation was due to bad weather. Thanks to is for good causes."))
D("to-towards", "TO and TOWARDS", [
    ("to", "reachDot", "go to the door", "reaches it"),
    ("towards", "lookAhead", "walk towards the door", "that direction, maybe not reaching")],
  ["TO = the goal is reached · TOWARDS = the direction", "his attitude towards the poor (feeling aimed that way)"],
  ("His attitude ___ his juniors is kind.", "towards", ["to", "for"], "An attitude is aimed in a direction: towards.", "To is for reaching a goal or receiver."))
