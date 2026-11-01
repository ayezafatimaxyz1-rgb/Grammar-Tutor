# Prepositions in context: new drawn lessons for the situations the rest of the course does not
# cover as a whole: transport and travelling, giving directions, numbers and money.
# Same format as atlas_data.py (L, S, D) and atlas_pairs.py (PAIRS). Built by context.py.

UNIT("transport", "Transportation and travelling")
L("ct-transport", "BY / ON / IN for transport", "busOn", "BY names the kind of transport. ON and IN say where you are in it.", "By bus is how you travel. On the bus is where you are: standing on its floor.", [
  S("by", "the kind of transport", "emailBy", "the method of travel, no a or the",
    ["BY + the transport alone, with no a, the or my:", "it names the method, like by hand."],
    ["We went to Murree [by] bus.", "She travels to work [by] train."], ("on", "ON needs a, the or my: on the bus, on my bike.")),
  S("on", "big transport you stand or walk in", "busOn", "a bus, train, plane or ship has a floor",
    ["Buses, trains, planes and ships have a floor.", "You can stand and walk: you are ON it."],
    ["There were forty people [on] the bus.", "We met [on] the train to Karachi."], ("in", "IN is for small vehicles you only sit inside: in a car.")),
  S("in", "small transport you sit inside", "carIn", "a car or taxi boxes you in",
    ["In a car, a taxi or a small boat you cannot", "stand and walk: you are boxed IN."],
    ["The children were asleep [in] the car.", "He came [in] a taxi."], ("on", "ON is for transport with a floor: on the bus.")),
  S("on", "transport you sit on top of", "driveOn", "a bike, a motorbike, a horse",
    ["A bicycle, a motorbike or a horse: you sit ON top of it."],
    ["He goes to college [on] his bike.", "The soldier rode [on] a horse."], ("in", "You cannot be inside a bike.")),
  S("on", "on foot", "feet", "walking: your feet are the transport",
    ["Walking is ON foot: you stand on your feet.", "By foot is heard, but on foot is the standard phrase."],
    ["We went to the market [on] foot.", "The village can only be reached [on] foot."], ("by", "By foot is heard, but CSS expects on foot.")),
])
L("ct-boarding", "GET ON / OFF, GET IN / OUT OF", "busOn", "Big transport: get on, get off. Small transport: get in, get out of.", "You step ON to a bus's floor and OFF it again. You climb INTO a car and OUT OF it.", [
  S("get on", "boarding big transport", "busOn", "stepping onto its floor",
    ["Bus, train, plane, ship, bike: get ON."],
    ["Get [on] the bus at the next stop.", "She got [on] the plane at Lahore."], ("get in", "Get in is for cars and taxis.")),
  S("get off", "leaving big transport", "bounceOff", "stepping off its floor",
    ["Leaving a bus, train or plane: get OFF."],
    ["We got [off] the train at Rawalpindi.", "Get [off] the bike carefully."], ("get out of", "Get out of is for cars and taxis.")),
  S("get in", "getting into a car or taxi", "carIn", "climbing inside",
    ["Car, taxi, small boat: get IN or get INTO."],
    ["Get [in] the car, we are late.", "He got [into] a taxi outside the hotel."], ("get on", "Get on is for big transport.")),
  S("get out of", "leaving a car or taxi", "goOut", "climbing out of the inside",
    ["Leaving a car or taxi: get OUT OF."],
    ["She got [out of] the car at the gate.", "Get [out of] the taxi here."], ("get off", "Get off is for big transport.")),
])
L("ct-journey", "Journeys: FROM, TO, FOR, AT, IN, VIA", "roadPass", "A journey has a start (FROM), a goal (TO), stops on the way (VIA) and an arrival (AT or IN).", "Draw a road: FROM the start, VIA a stop, TO the end, and you ARRIVE AT a point or IN a city.", [
  S("from", "the starting point", "origin", "where the journey begins",
    ["FROM marks where the journey starts."],
    ["The train [from] Quetta is late.", "We flew [from] Lahore to Jeddah."], ("of", "OF is not used for a journey's start.")),
  S("to", "the destination", "toShop", "where the journey ends",
    ["After go, travel, fly, drive, walk: TO the place."],
    ["We are flying [to] Dubai.", "He drove [to] Islamabad."], ("for", "FOR follows leave and set off: leave for Dubai.")),
  S("for", "after leave and set off", "leaveFor", "the place you are heading towards",
    ["Leave, set off, head, sail, be bound:", "they take FOR the place."],
    ["We leave [for] Islamabad tomorrow.", "The ship set sail [for] Gwadar."], ("to", "Leave to Islamabad is wrong; leave for.")),
  S("at", "arriving at a point", "airportDot", "a station, airport, hotel, gate",
    ["Arrive AT a point: a station, an airport, a building."],
    ["We arrived [at] the airport at noon.", "The train arrives [at] platform 3."], ("to", "Never arrive to.")),
  S("in", "arriving in an area", "inCity", "a city or a country",
    ["Arrive IN an area: a city, a country."],
    ["They arrived [in] Karachi at night.", "She arrived [in] Pakistan last week."], ("at", "AT is for a point, not a city.")),
  S("via", "a stop on the way", "roadPass", "passing through one place to reach another",
    ["VIA names a stop or route on the way."],
    ["We flew to London [via] Doha.", "The bus goes [via] Jhelum."], ("by", "BY names the kind of transport: by air.")),
  S("on", "on a journey, trip, holiday or business", "calendar", "the journey is something you are on",
    ["A trip, a journey, a tour, holiday, business:", "you are ON it while it lasts."],
    ["He is away [on] business.", "They went to Swat [on] holiday."], ("in", "IN holiday is wrong; on holiday.")),
])
D("ct-by-on", "BY BUS or ON THE BUS", [
    ("by", "emailBy", "by bus", "the method, no the"),
    ("on", "busOn", "on the bus", "where you are, with the")],
  ["BY + transport alone = how you travel · ON / IN + a, the, my = where you are", "I go by bus. I met him on the bus. I came in my car."],
  ("She comes to the university ___ train every day.", "by", ["on", "in"], "No the or a: it names the method of travel.", "On and in need a or the: on the train."))
D("ct-arrive", "ARRIVE AT, ARRIVE IN, REACH", [
    ("at", "airportDot", "arrive at the station", "a point"),
    ("in", "inCity", "arrive in Lahore", "an area"),
    ("reach", "reachDot", "reach Lahore", "no preposition")],
  ["arrive at a point · arrive in an area · never arrive to", "reach takes no preposition: we reached Lahore"],
  ("The delegation arrived ___ Islamabad on Monday.", "in", ["at", "to"], "Islamabad is a city: an area, so in.", "At is for a point; arrive never takes to."))
D("ct-get", "GET ON or GET IN", [
    ("get on", "busOn", "get on the train", "transport with a floor"),
    ("get in", "carIn", "get in the car", "you sit boxed inside")],
  ["get on / off: bus, train, plane, ship, bike · get in / out of: car, taxi", "Can you stand up and walk in it? Then on and off."],
  ("Quickly, get ___ the taxi before it rains.", "in", ["on", "off"], "A taxi boxes you in: get in.", "On and off are for transport with a floor."))

UNIT("directions", "Giving directions")
L("ct-directions", "Directions: ALONG, PAST, ACROSS, THROUGH, AT, ON, INTO", "roadPass", "Directions are a journey told step by step: along a road, past a place, at a turning, on your left.", "Draw the route as you speak: each preposition is one part of the line.", [
  S("along", "following the road", "alongRiver", "keep going the way the road goes",
    ["Go ALONG (or DOWN, UP) the road: follow its length."],
    ["Go [along] Mall Road for five minutes.", "Walk [down] this street to the end."], ("across", "ACROSS cuts to the other side.")),
  S("past", "going beyond a landmark", "pastBank", "beside it, then beyond it",
    ["Go PAST a landmark: you do not stop or turn there."],
    ["Go [past] the mosque.", "Walk [past] two traffic lights."], ("passed", "Passed is a verb: you passed the mosque.")),
  S("at", "the point where you turn", "airportDot", "a corner, a signal, a roundabout",
    ["Turn AT a point: the corner, the lights, the roundabout."],
    ["Turn left [at] the traffic lights.", "Turn right [at] the second corner."], ("on", "ON the corner is where a building stands, not where you turn.")),
  S("into", "turning into a road", "turnOnto", "you enter the new road",
    ["Turn INTO (or ONTO) a road: you enter it."],
    ["Turn right [into] Jail Road.", "Turn left [onto] the main road."], ("in", "Turn in Jail Road is wrong; into.")),
  S("across", "crossing to the other side", "acrossRoad", "from one side to the other",
    ["Go ACROSS the road, the bridge, the square."],
    ["Walk [across] the bridge.", "The bank is [across] the road."], ("through", "THROUGH goes inside: through the park.")),
  S("through", "inside, from one end to the other", "passThrough", "in one end, out the other",
    ["Go THROUGH a park, a gate, a market."],
    ["Go [through] the park.", "Drive [through] the gate."], ("across", "ACROSS stays on top, side to side.")),
  S("on", "which side something is", "faces", "on your left, on your right",
    ["It is ON your left / ON your right; ON the corner of two roads."],
    ["The school is [on] your left.", "The shop is [on] the corner of Mall Road."], ("at", "AT the corner is the point where you turn.")),
  S("until", "how far to go", "notUntil", "keep going up to that point",
    ["Go straight UNTIL (or AS FAR AS) a point, then stop or turn."],
    ["Go straight [until] you reach the bridge.", "Walk [as far as] the post office."], ("by", "BY is a deadline, not a distance.")),
])
D("ct-corner", "AT, ON, IN THE CORNER", [
    ("at", "airportDot", "turn at the corner", "the point where you turn"),
    ("on", "faces", "a shop on the corner", "standing where two roads meet"),
    ("in", "dotIn", "a chair in the corner", "inside a room's corner")],
  ["at the corner: where you turn · on the corner: a building where roads meet · in the corner: inside a room", "Turn left at the corner; the bank is on the corner; the lamp is in the corner."],
  ("Put the plant ___ the corner of the room.", "in", ["on", "at"], "Inside a room, the corner surrounds it: in.", "On and at are for street corners."))
D("ct-past-through", "ALONG, ACROSS, PAST, THROUGH", [
    ("along", "alongRiver", "along the road", "following its length"),
    ("past", "pastBank", "past the bank", "beside it and beyond"),
    ("through", "passThrough", "through the park", "inside, end to end")],
  ["along = the length · across = the width · past = beside and beyond · through = inside", "Go along this road, past the bank, through the park, then across the bridge."],
  ("Don't stop at the mosque; walk ___ it and take the next left.", "past", ["through", "across"], "You go beside the mosque and beyond it: past.", "Through would take you inside the mosque; across would cross it."))

UNIT("numbers", "Numbers, money and measurement")
L("ct-numbers", "Numbers, money and measurement", "scale", "Numbers are points and lines on a scale. Each preposition says how a number sits on it.", "Draw a ruler: AT a mark, OVER or UNDER a mark, BETWEEN two marks, BY how much it moved, PER each unit.", [
  S("at", "a point on a scale: price, speed, age, rate", "scale", "one mark",
    ["AT picks one mark: a price, a speed, an age, a rate."],
    ["Rice is sold [at] 300 rupees a kilo.", "He retired [at] sixty."], ("on", "ON is not used for a point on a scale.")),
  S("for", "a price paid", "exchange", "money in exchange for a thing",
    ["Buy, sell, pay FOR: one thing in exchange for money."],
    ["I bought this book [for] 500 rupees.", "He sold his car [for] a good price."], ("at", "AT is a rate or price level: sold at 500 a kilo.")),
  S("by", "the size of a change", "riseBy", "how much it moved",
    ["Rise, fall, increase, win BY an amount: the difference."],
    ["Prices rose [by] ten percent.", "Pakistan won [by] five wickets."], ("to", "TO is where it ended: rose to 200.")),
  S("to", "where a change ended", "upTo", "the new level",
    ["Rise or fall TO a level: where it ends."],
    ["The price rose [to] 200 rupees.", "The population grew [to] 240 million."], ("by", "BY is the size of the change.")),
  S("per", "for each unit", "perKilo", "one amount for each",
    ["PER = for each: per kilo, per hour, per person."],
    ["The fare is 50 rupees [per] person.", "He drove at 80 km [per] hour."], ("for", "FOR names a price paid, not a rate for each.")),
  S("out of", "a part of a total", "groupOut", "some taken from the whole",
    ["Scores and shares: X OUT OF the total."],
    ["She got 85 [out of] 100.", "Nine [out of] ten people agreed."], ("from", "From 100 is not used for scores.")),
  S("between", "inside a range of two numbers", "betweenTicks", "from one mark to another",
    ["BETWEEN X AND Y: a range. Or FROM X TO Y."],
    ["Children [between] five and ten can enter.", "The work costs [between] 10 and 15 lakh."], ("among", "AMONG is for groups, not numbers.")),
  S("over", "more than a number", "excess", "past the mark",
    ["OVER (more than) and UNDER (less than) a number."],
    ["It cost [over] a million rupees.", "Children [under] five travel free."], ("above", "ABOVE is used for levels on a scale: above average.")),
  S("in", "the unit or currency", "coin", "measured in that unit",
    ["Pay IN rupees, measure IN metres, weigh IN kilos."],
    ["Can I pay [in] dollars?", "The length is given [in] metres."], ("by", "BY is a method: pay by card.")),
])
D("ct-by-to", "RISE BY or RISE TO", [
    ("by", "riseBy", "rose by 10%", "the size of the change"),
    ("to", "upTo", "rose to 200", "the new level")],
  ["BY = how much it changed · TO = where it ended · FROM = where it started", "Prices rose from 100 to 110: they rose by 10."],
  ("Inflation fell ___ 12 percent to 8 percent.", "from", ["by", "to"], "12 percent is where it started: from.", "By would be the size of the fall (4 points); to is where it ended (8 percent)."))
D("ct-at-for", "SOLD AT or SOLD FOR", [
    ("at", "scale", "sold at 300 a kilo", "a rate or price level"),
    ("for", "exchange", "sold for 300", "the total paid")],
  ["AT = a rate or level (at 300 a kilo, at 10% interest) · FOR = the total paid in exchange", "per = for each unit: 300 rupees per kilo"],
  ("He bought the old bicycle ___ 4,000 rupees.", "for", ["at", "per"], "The total paid in exchange: for.", "At is a rate (at 4,000 a month); per needs a unit (per kilo)."))

# Proofs for the pairs above (same format as atlas_pairs.py).
CT_PAIRS = {
"ct-by-on": dict(order=["by", "on", "in"], prove={
  "by": dict(logic=["BY + transport alone: how you travel."], ask="Is there no a, the or my before the transport?", ex=[
    ("I go to work [by] bus.", "no the: it is the method", {"on": ("N", "on needs the: on the bus"), "in": ("N", "in needs a or the")}),
    ("They came [by] air.", "the method of travel", {"on": ("N", "not used"), "in": ("N", "not used")}),
    ("She travels [by] train.", "the method", {"on": ("N", "on the train | needs the"), "in": ("N", "not used")})]),
  "on": dict(logic=["ON + a, the, my: where you are, on big transport."], ask="Is there a, the or my, and is it transport with a floor?", ex=[
    ("I met him [on] the bus.", "the bus: where | we were", {"by": ("N", "by takes no the"), "in": ("D", "heard, but on | is standard for buses")}),
    ("She left her bag [on] the train.", "on its floor", {"by": ("N", "by takes no the"), "in": ("N", "not for trains")}),
    ("We were [on] a plane for six hours.", "a plane has a floor", {"by": ("N", "by takes no a"), "in": ("D", "heard; on is standard")})]),
  "in": dict(logic=["IN + a, the, my: inside a car or taxi."], ask="Is it a car or taxi, with a, the or my?", ex=[
    ("He came [in] his car.", "his car: boxed inside", {"by": ("N", "by takes no his"), "on": ("N", "you cannot | stand in a car")}),
    ("We waited [in] the taxi.", "inside the taxi", {"by": ("N", "not with the"), "on": ("N", "not for taxis")}),
    ("She drove [in] a small car.", "inside it", {"by": ("N", "not with a"), "on": ("N", "not for cars")})]),
}),
"ct-arrive": dict(order=["at", "in", "to"], prove={
  "at": dict(logic=["ARRIVE AT a point: a station, an airport, a building."], ask="Is it one point or building?", ex=[
    ("We arrived [at] the station.", "a station is a point", {"in": ("D", "in = already inside | the building"), "to": ("N", "never arrive to")}),
    ("They arrived [at] the hotel late.", "a building: a point", {"in": ("D", "inside it"), "to": ("N", "never arrive to")}),
    ("She arrived [at] the meeting on time.", "an event: a point", {"in": ("N", "not an area"), "to": ("N", "never arrive to")})]),
  "in": dict(logic=["ARRIVE IN an area: a city, a country."], ask="Is it a city or a country?", ex=[
    ("We arrived [in] Lahore at dawn.", "a city is an area", {"at": ("N", "Lahore is an area, | not a point"), "to": ("N", "never arrive to")}),
    ("Spring has arrived [in] the valley.", "an area", {"at": ("N", "not a point"), "to": ("N", "never arrive to")}),
    ("The team arrived [in] England.", "a country", {"at": ("N", "not a point"), "to": ("N", "never")})]),
}),
"ct-get": dict(order=["on", "in", "off", "out of"], prove={
  "on": dict(logic=["GET ON: boarding transport with a floor."], ask="Is it a bus, train, plane, ship or bike?", ex=[
    ("Get [on] the train now.", "a train has a floor", {"in": ("N", "in is for cars, taxis"), "out of": ("N", "leaving, the opposite")}),
    ("She got [on] her bike.", "you sit on top of a bike", {"in": ("N", "not inside a bike"), "off": ("D", "leaving it")})]),
  "in": dict(logic=["GET IN: getting into a car or taxi."], ask="Is it a car or a taxi?", ex=[
    ("Get [in] the car.", "you sit boxed in", {"on": ("N", "on is for big transport"), "off": ("N", "off is for big transport")}),
    ("He got [in] a taxi.", "inside it", {"on": ("N", "not for taxis"), "out of": ("D", "leaving it")})]),
  "off": dict(logic=["GET OFF: leaving transport with a floor."], ask="Is it leaving a bus, train, plane or bike?", ex=[
    ("Get [off] the bus at Liberty.", "leaving its floor", {"out of": ("N", "out of is for cars"), "on": ("D", "boarding it")}),
    ("We got [off] the plane.", "leaving it", {"out of": ("N", "not for planes"), "on": ("D", "boarding")})]),
  "out of": dict(logic=["GET OUT OF: leaving a car or taxi."], ask="Is it leaving a car or taxi?", ex=[
    ("Get [out of] the car slowly.", "leaving the inside", {"off": ("N", "off is for buses, trains"), "in": ("D", "getting into it")}),
    ("She got [out of] the taxi.", "leaving the inside", {"off": ("N", "not for taxis"), "in": ("D", "getting into it")})]),
}),
"ct-corner": dict(order=["at", "on", "in"], prove={
  "at": dict(logic=["AT THE CORNER: the point where you turn or meet."], ask="Is it the point where you turn, stop or meet?", ex=[
    ("Turn left [at] the corner.", "the turning point", {"on": ("D", "on the corner = a building | standing there"), "in": ("N", "a street corner | has no inside")}),
    ("Wait for me [at] the corner.", "a meeting point", {"on": ("D", "standing on the corner | is also heard"), "in": ("N", "not a room")})]),
  "on": dict(logic=["ON THE CORNER: a building where two roads meet."], ask="Is it a building standing where two roads meet?", ex=[
    ("There is a bakery [on] the corner.", "a building on the | corner of two roads", {"at": ("D", "at the corner = | near that point"), "in": ("N", "not a room")}),
    ("The bank [on] the corner is closed.", "the building standing there", {"at": ("D", "near that point"), "in": ("N", "not a room")})]),
  "in": dict(logic=["IN THE CORNER: inside a room or box, where two walls meet."], ask="Is it inside a room?", ex=[
    ("The TV is [in] the corner of the room.", "two walls around it", {"on": ("N", "on a room corner | is not used"), "at": ("N", "not a street point")}),
    ("He sat [in] the corner, alone.", "inside the room's corner", {"on": ("N", "not used"), "at": ("D", "at the corner = | by the street corner")})]),
}),
"ct-past-through": dict(order=["along", "across", "past", "through"], prove={
  "along": dict(logic=["ALONG: follow the length of the road."], ask="Do you follow its length?", ex=[
    ("Walk [along] the canal to the bridge.", "following the canal", {"across": ("D", "to the other bank"), "through": ("N", "not inside the canal")}),
    ("Drive [along] this road for a mile.", "the length of the road", {"across": ("D", "across = to the | other side"), "past": ("N", "past needs a landmark")})]),
  "past": dict(logic=["PAST: beside a landmark, then beyond it."], ask="Do you go beside it and keep going?", ex=[
    ("Go [past] the hospital.", "beside it, then beyond", {"through": ("D", "into it and out"), "along": ("N", "a hospital is | not a line")}),
    ("Drive [past] two petrol pumps.", "beside them and beyond", {"through": ("N", "not inside them"), "across": ("N", "not crossing them")})]),
  "through": dict(logic=["THROUGH: inside, from one end to the other."], ask="Do you go inside it and out the other end?", ex=[
    ("Go [through] the main gate.", "in one side, out the other", {"past": ("D", "beside it, not in"), "across": ("N", "a gate is not crossed | side to side")}),
    ("Walk [through] the bazaar.", "inside it, end to end", {"across": ("D", "side to side"), "past": ("D", "beside it only")})]),
  "across": dict(logic=["ACROSS: from one side to the other."], ask="Do you cross to the other side?", ex=[
    ("Walk [across] the bridge.", "one side to the other", {"along": ("D", "along its length"), "through": ("N", "a bridge has | no inside")}),
    ("The post office is [across] the road.", "on the other side", {"along": ("D", "somewhere along it"), "past": ("D", "beyond it")})]),
}),
"ct-by-to": dict(order=["by", "to", "from"], prove={
  "by": dict(logic=["BY: the size of the change."], ask="Is it how much it changed?", ex=[
    ("Prices rose [by] 5 percent.", "5 percent is the change", {"to": ("D", "to 5 percent = the | new level"), "from": ("D", "the starting level")}),
    ("He won [by] 300 votes.", "the margin", {"to": ("N", "not a level"), "from": ("N", "not a start")})]),
  "to": dict(logic=["TO: the level where it ended."], ask="Is it the new level?", ex=[
    ("Petrol rose [to] 290 rupees.", "the new price", {"by": ("D", "by 290 = it went up 290"), "from": ("D", "the old price")}),
    ("The score fell [to] zero.", "where it ended", {"by": ("D", "the size of the fall"), "from": ("D", "where it started")})]),
  "from": dict(logic=["FROM: the level where it started."], ask="Is it the starting level?", ex=[
    ("It rose [from] 100 to 120.", "100 is the start", {"by": ("N", "by 100 to 120 | is not used"), "to": ("N", "to comes later")})]),
}),
"ct-at-for": dict(order=["at", "for", "per"], prove={
  "at": dict(logic=["AT: a rate or a price level."], ask="Is it a rate or level (a kilo, a month, a percent)?", ex=[
    ("Apples are sold [at] 250 rupees a kilo.", "a rate for each kilo", {"for": ("D", "for 250 = the total | for all of them"), "per": ("N", "per needs a unit | straight after")}),
    ("The bank lends [at] 12 percent interest.", "a rate", {"for": ("N", "not a total paid"), "per": ("N", "not used")})]),
  "for": dict(logic=["FOR: the total paid in exchange."], ask="Is it the whole amount paid for the thing?", ex=[
    ("I bought the phone [for] 30,000 rupees.", "the total paid", {"at": ("D", "at = a rate | for each unit"), "per": ("N", "no unit")}),
    ("She sold her gold [for] a good price.", "the price received", {"at": ("D", "at a good price | is also used"), "per": ("N", "not used")})]),
  "per": dict(logic=["PER: for each one unit."], ask="Is a unit straight after it (kilo, person, hour)?", ex=[
    ("The fee is 2,000 rupees [per] student.", "for each student", {"at": ("N", "at needs a price level"), "for": ("D", "for a student = | for one student")}),
    ("He earns 1,500 [per] day.", "for each day", {"at": ("N", "not used"), "for": ("D", "for a day = | one day's pay")})]),
}),
}
