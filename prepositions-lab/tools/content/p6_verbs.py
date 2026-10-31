# Phase 6: phrasal verbs, grouped by what the particle conveys. See phase6.py for the format.
# {form} in an example is the verb as it stands in the sentence.
# ---------------------------------------------------------------- UP
U("up", "Phrasal verbs with UP", "up", [
    "UP: upward, then completely, more, into view, into being.",
    "give up, wind up: finished completely  ·  speed up, step up: more",
    "turn up, look up: into view  ·  set up, draw up: into being",
])
V("give [up]", "B", "stop doing", "He {gave up} smoking last year.", "completely", "the habit is finished for good",
  [("give in", D, "surrender, stop resisting"), ("give out", D, "hand out, or stop working")], "cigarette")
V("bring [up]", "B", "raise a child", "She {brought up} three children alone.", "upward", "the child is raised to adulthood",
  [("bring about", D, "cause to happen"), ("bring out", D, "publish, or reveal")], "growTo")
V("set [up]", "I", "establish", "The government {set up} a commission.", "into being", "the body is made to stand",
  [("set off", D, "start a journey"), ("set in", D, "begin and continue (bad weather)")], "house")
V("draw [up]", "A", "prepare a document", "The lawyer {drew up} the contract.", "into being", "the document is drawn into shape",
  [("draw out", D, "make longer"), ("draw back", D, "move away, withdraw")], "doc")
V("turn [up]", "B", "arrive, appear", "Only ten people {turned up} for the meeting.", "into view", "they come up into sight",
  [("turn down", D, "refuse"), ("turn in", D, "go to bed, or hand over")], "arriveDoor")
V("speed [up]", "B", "go faster", "We must {speed up} the work.", "more", "the speed goes up",
  [("slow down", D, "go slower"), ("speed off", D, "leave very fast")], "car")
V("step [up]", "A", "increase", "Police have {stepped up} patrols in the city.", "more", "each step goes higher",
  [("step down", D, "resign"), ("step in", D, "intervene")], "stairs")
V("make [up]", "I", "form, together make", "Women {make up} half the population.", "completely", "the parts complete the whole",
  [("make out", D, "see or understand with difficulty"), ("make off", D, "run away")], "stackAdd")
V("look [up]", "B", "search for information", "{Look up} the word in a dictionary.", "into view", "the word is brought up out of the book",
  [("look into", D, "investigate"), ("look over", D, "examine quickly")], "dictionary")
V("take [up]", "I", "start (a hobby or job)", "She {took up} painting after she retired.", "into being", "a new activity is picked up",
  [("take on", D, "accept work or hire"), ("take over", D, "take control")], "pen")
V("break [up]", "I", "end, scatter", "The meeting {broke up} at noon.", "completely", "it breaks into pieces and is over",
  [("break down", D, "stop working, or collapse"), ("break out", D, "start suddenly (war, fire)")], "brokenBox")
V("wind [up]", "A", "close down, end", "The company was {wound up} last year.", "completely", "wound to the end, like a reel",
  [("wind down", D, "slow down gradually"), ("wind off", N, "not used")], "endOfPath")
V("blow [up]", "I", "destroy by explosion", "Terrorists {blew up} the bridge.", "completely", "it goes up in pieces",
  [("blow out", D, "put out a flame by blowing"), ("blow over", D, "pass without harm")], "flame")
V("hold [up]", "I", "delay", "Heavy traffic {held up} the ambulance.", "stopped", "held up in the air, it cannot move on",
  [("hold on", D, "wait"), ("hold back", D, "restrain")], "fogDelay")
V("keep [up]", "I", "stay at the same pace", "Prices rise fast and wages cannot {keep up}.", "level", "kept up at the same height",
  [("keep on", D, "continue"), ("keep off", D, "stay away from")], "levelScale")
# ---------------------------------------------------------------- DOWN
U("down", "Phrasal verbs with DOWN", "down", [
    "DOWN: lower, less, defeated, onto paper, down the line.",
    "turn down, put down: pushed down, rejected or defeated",
    "write down: onto paper  ·  hand down: down the generations",
])
V("turn [down]", "B", "refuse", "She {turned down} the offer.", "rejected", "the offer is pushed down",
  [("turn up", D, "arrive, appear"), ("turn over", D, "flip, or hand over")], "cross")
V("break [down]", "I", "collapse, fail", "The talks {broke down} after a week.", "collapsed", "it falls down and stops",
  [("break up", D, "end and scatter"), ("break into", D, "enter by force")], "brokenBox")
V("cut [down]", "B", "fell (a tree)", "They {cut down} the old trees.", "to the ground", "the tree comes down",
  [("cut off", D, "disconnect, isolate"), ("cut out", D, "remove, or stop doing")], "tree")
V("put [down]", "A", "crush by force", "The army {put down} the revolt.", "defeated", "the revolt is pressed down",
  [("put off", D, "postpone"), ("put out", D, "extinguish")], "pressed")
V("let [down]", "I", "disappoint", "He {let down} his friends.", "lower", "their hopes are let fall",
  [("let off", D, "excuse from punishment"), ("let in", D, "allow to enter")], "angryFace")
V("step [down]", "I", "resign", "The minister {stepped down} after the scandal.", "lower", "he steps down from his post",
  [("step up", D, "increase"), ("step in", D, "intervene")], "stairs")
V("write [down]", "B", "record on paper", "Please {write down} the address.", "onto paper", "the words go down on the page",
  [("write off", D, "cancel a debt, or give up on"), ("write up", D, "write a full report")], "pen")
V("slow [down]", "B", "go slower", "Drivers must {slow down} near schools.", "less", "the speed goes down",
  [("speed up", D, "go faster"), ("slow off", N, "not used")], "car")
V("bring [down]", "I", "cause to fall", "The scandal {brought down} the government.", "lower", "the government is brought down from power",
  [("bring up", D, "raise a child, or mention"), ("bring about", D, "cause to happen")], "arrowDown")
V("hand [down]", "A", "pass to the next generation", "These customs were {handed down} from father to son.", "down the line", "passed down the generations",
  [("hand over", D, "give control to"), ("hand in", D, "submit")], "giveTo")
# ---------------------------------------------------------------- OUT
U("out", "Phrasal verbs with OUT", "out", [
    "OUT: outward, into the open, to the end, gone, picked out.",
    "carry out: done to the end  ·  find out, point out: into the open",
    "put out, wipe out: gone  ·  single out, rule out: taken out of a group",
])
V("carry [out]", "I", "perform, do", "The police {carried out} a raid.", "to the end", "the plan is carried all the way into action",
  [("carry on", D, "continue"), ("carry off", D, "win, or do well")], "check")
V("find [out]", "B", "discover", "We soon {found out} the truth.", "into the open", "the truth comes out",
  [("look out", D, "be careful"), ("find in", N, "not used")], "magnifier")
V("break [out]", "I", "start suddenly", "War {broke out} in 1939.", "outward", "it bursts out",
  [("break down", D, "collapse, fail"), ("break up", D, "end, scatter")], "flame")
V("point [out]", "I", "draw attention to", "She {pointed out} the mistake.", "into the open", "it is brought out for all to see",
  [("point at", D, "aim a finger at"), ("point off", N, "not used")], "pointDoc")
V("rule [out]", "A", "exclude", "The police {ruled out} murder.", "taken out", "it is put outside the possibilities",
  [("rule over", D, "govern"), ("rule on", D, "decide officially about")], "cross")
V("set [out]", "A", "explain clearly", "The report {sets out} the facts.", "into the open", "the facts are laid out in view",
  [("set up", D, "establish"), ("set off", D, "start a journey, or cause")], "doc")
V("put [out]", "B", "extinguish", "Firemen {put out} the fire.", "gone", "the flame is out",
  [("put off", D, "postpone"), ("put down", D, "crush by force")], "flame")
V("run [out]", "B", "be used up", "Our time has {run out}.", "gone", "it runs out until none is left",
  [("run over", D, "hit with a vehicle"), ("run into", D, "meet by chance")], "emptyJar")
V("give [out]", "B", "distribute", "The teacher {gave out} the papers.", "outward", "it goes out to many people",
  [("give up", D, "stop doing"), ("give in", D, "surrender")], "giveTo")
V("make [out]", "I", "see or understand with difficulty", "I could not {make out} his words.", "into the open", "the words are drawn out of the noise",
  [("make up", D, "form, or invent"), ("make off", D, "run away")], "eyeLook")
V("turn [out]", "I", "prove to be", "The rumour {turned out} to be false.", "into the open", "the truth turns out into view",
  [("turn up", D, "arrive"), ("turn down", D, "refuse")], "question")
V("wipe [out]", "I", "destroy completely", "The flood {wiped out} the village.", "gone", "wiped until nothing is left",
  [("wipe off", D, "clean off a surface"), ("wipe up", D, "clean up a spill")], "wave")
V("single [out]", "A", "choose one for attention", "He was {singled out} for praise.", "taken out", "one is taken out of the group",
  [("point out", D, "draw attention to a thing"), ("single in", N, "not used")], "exceptOne")
V("weed [out]", "A", "remove what is unwanted", "The test {weeds out} weak candidates.", "taken out", "like weeds pulled out of a field",
  [("sort out", D, "organise, or solve"), ("weed off", N, "not used")], "groupOut")
# ---------------------------------------------------------------- OFF
U("off", "Phrasal verbs with OFF", "off", [
    "OFF: away, separated, removed, set going.",
    "call off, put off: taken off the plan  ·  cut off, lay off: separated",
    "set off, take off: away from the start  ·  go off: set going",
])
V("call [off]", "B", "cancel", "The match was {called off} because of rain.", "away", "the event is taken off the calendar",
  [("call out", D, "shout, or challenge"), ("call up", D, "phone, or summon")], "rainCancel")
V("put [off]", "B", "postpone", "They {put off} the meeting till Monday.", "away", "the meeting is moved away in time",
  [("put out", D, "extinguish"), ("put on", D, "wear, or stage")], "calendar")
V("set [off]", "I", "start a journey", "We {set off} at dawn.", "away", "away from the starting point",
  [("set up", D, "establish"), ("set in", D, "begin and continue")], "car")
V("take [off]", "B", "leave the ground", "The plane {took off} on time.", "away", "away from the ground",
  [("take over", D, "take control"), ("take up", D, "start a hobby")], "plane")
V("see [off]", "I", "say goodbye as someone leaves", "We went to the airport to {see off} our friend.", "away", "you watch them go away",
  [("see through", D, "not be fooled by"), ("see to", D, "deal with")], "train")
V("lay [off]", "A", "dismiss for lack of work", "The factory {laid off} two hundred workers.", "removed", "taken off the payroll",
  [("lay down", D, "state a rule"), ("lay out", D, "arrange, plan")], "personLeft")
V("cut [off]", "I", "isolate, disconnect", "The village was {cut off} by floods.", "separated", "the link is cut away",
  [("cut down", D, "fell, or reduce"), ("cut out", D, "remove, or stop")], "roadBarrier")
V("go [off]", "I", "explode, or ring", "The bomb {went off} at noon.", "set going", "it goes off with a bang",
  [("go on", D, "continue"), ("go out", D, "stop burning")], "flame")
V("pay [off]", "I", "bring success", "His hard work {paid off}.", "away", "the effort is paid off in full",
  [("pay back", D, "return money"), ("pay up", D, "pay what you owe")], "workSuccess")
V("write [off]", "A", "cancel (a debt)", "The bank {wrote off} the loan.", "removed", "the debt is taken off the books",
  [("write down", D, "record on paper"), ("write up", D, "write a full report")], "coin")
V("show [off]", "I", "display proudly", "He likes to {show off} his new car.", "away", "he shows it off to everyone around",
  [("show up", D, "arrive"), ("show in", D, "lead a guest in")], "crown")
V("ward [off]", "A", "keep away (danger)", "Vaccines {ward off} disease.", "away", "the danger is pushed away",
  [("keep off", D, "stay away from"), ("ward over", N, "not used")], "shield")
# ---------------------------------------------------------------- ON
U("on", "Phrasal verbs with ON", "on", [
    "ON: continuing, attached, taken onto you, resting on.",
    "carry on, go on: continuing  ·  catch on: it sticks",
    "take on: a load onto you  ·  count on: resting on someone",
])
V("carry [on]", "B", "continue", "{Carry on} with your work.", "continuing", "the work goes on and on",
  [("carry out", D, "perform"), ("carry off", D, "win, or do well")], "arrowR")
V("go [on]", "B", "continue, happen", "The meeting {went on} for hours.", "continuing", "it keeps going on",
  [("go off", D, "explode, or go bad"), ("go over", D, "review")], "clock")
V("take [on]", "I", "hire, or accept a task", "The firm {took on} new staff.", "onto you", "a load is taken onto you",
  [("take off", D, "leave the ground"), ("take over", D, "take control")], "people")
V("put [on]", "B", "wear", "She {put on} her coat.", "attached", "the coat goes on your body",
  [("put off", D, "postpone"), ("put out", D, "extinguish")], "person")
V("catch [on]", "A", "become popular", "The idea soon {caught on}.", "attached", "it catches on and sticks",
  [("catch up", D, "reach someone ahead"), ("catch out", D, "trap someone in an error")], "rising")
V("hold [on]", "B", "wait", "{Hold on} a minute, please.", "continuing", "you hold on and keep waiting",
  [("hold up", D, "delay"), ("hold back", D, "restrain")], "clock")
V("look [on]", "I", "watch without acting", "The crowd {looked on} as the building burned.", "continuing", "they keep looking and do nothing",
  [("look after", D, "take care of"), ("look into", D, "investigate")], "eye")
V("pass [on]", "I", "give to the next person", "Please {pass on} the message.", "continuing", "it travels on to the next person",
  [("pass out", D, "faint"), ("pass over", D, "ignore, skip")], "envelope")
V("count [on]", "I", "depend on", "You can {count on} me.", "resting on", "your weight rests on me",
  [("count in", D, "include"), ("count out", D, "exclude")], "support")
V("call [on]", "A", "formally ask, urge", "The president {called on} the nation to stay calm.", "resting on", "the request lands on them",
  [("call off", D, "cancel"), ("call up", D, "phone, or summon")], "speak")
# ---------------------------------------------------------------- IN, INTO
U("in", "Phrasal verbs with IN and INTO", "in", [
    "IN: inward, entering, giving way.",
    "hand in, fill in: something goes in  ·  give in: giving way",
    "look into, break into: entering  ·  step in: coming into a matter",
])
V("give [in]", "I", "surrender", "The rebels finally {gave in}.", "giving way", "they yield inward",
  [("give up", D, "stop doing"), ("give out", D, "distribute")], "flag")
V("hand [in]", "B", "submit", "{Hand in} your papers now.", "inward", "the papers go in to the teacher",
  [("hand down", D, "pass to the next generation"), ("hand over", D, "give control")], "doc")
V("fill [in]", "B", "complete (a form)", "Please {fill in} this form.", "inward", "the gaps are filled in",
  [("fill up", D, "fill completely (a tank)"), ("fill on", N, "not used")], "pen")
V("break [into]", "I", "enter by force", "Thieves {broke into} the shop.", "entering", "they break their way inside",
  [("break out", D, "start suddenly"), ("break down", D, "collapse")], "door")
V("look [into]", "I", "investigate", "The police are {looking into} the case.", "entering", "the eyes go inside the matter",
  [("look after", D, "take care of"), ("look over", D, "examine quickly")], "magnifier")
V("step [in]", "I", "intervene", "The army {stepped in} to restore order.", "entering", "it steps into the matter",
  [("step down", D, "resign"), ("step up", D, "increase")], "shield")
V("drop [in]", "B", "visit briefly", "{Drop in} whenever you are passing.", "entering", "you drop in for a moment",
  [("drop out", D, "leave a course"), ("drop off", D, "fall asleep, or deliver")], "house")
V("set [in]", "A", "begin and continue", "The rainy season has {set in}.", "entering", "it settles in and stays",
  [("set off", D, "start a journey"), ("set up", D, "establish")], "rain")
V("run [into]", "I", "meet by chance", "I {ran into} an old friend at the station.", "entering", "your paths run into each other",
  [("run out", D, "be used up"), ("run over", D, "hit with a vehicle")], "people")
V("take [in]", "A", "deceive", "Many people were {taken in} by the trick.", "inward", "they swallow the lie whole",
  [("take off", D, "leave the ground"), ("take on", D, "hire, or accept a task")], "secret")
# ---------------------------------------------------------------- OVER
U("over", "Phrasal verbs with OVER", "over", [
    "OVER: from one side to the other, past, across the top.",
    "take over, hand over: control moves across",
    "get over, blow over: past it  ·  go over, look over: across the whole",
])
V("take [over]", "I", "take control", "The army {took over} the government.", "across", "control moves from one side to the other",
  [("take on", D, "hire, or accept a task"), ("take off", D, "leave the ground")], "crown")
V("hand [over]", "I", "give control to", "He {handed over} the keys to the new owner.", "across", "it passes from one hand to another",
  [("hand in", D, "submit"), ("hand down", D, "pass to the next generation")], "giveTo")
V("go [over]", "I", "review", "Let us {go over} the plan once more.", "across the whole", "you pass over every part",
  [("go off", D, "explode"), ("go on", D, "continue")], "review")
V("get [over]", "I", "recover from", "She soon {got over} the shock.", "past", "she climbs over it and leaves it behind",
  [("get through", D, "pass, or finish"), ("get on", D, "have a good relationship")], "recover")
V("think [over]", "I", "consider carefully", "{Think over} the offer before you reply.", "across the whole", "your mind passes over every part",
  [("think up", D, "invent"), ("think on", N, "not used in standard English")], "thinkSelf")
V("run [over]", "B", "hit with a vehicle", "A car {ran over} the dog.", "across the top", "the wheels pass over it",
  [("run into", D, "meet by chance"), ("run out", D, "be used up")], "car")
V("blow [over]", "A", "pass without harm", "The storm soon {blew over}.", "past", "it blows past and is gone",
  [("blow up", D, "explode"), ("blow out", D, "put out a flame")], "cloud")
V("look [over]", "I", "examine quickly", "Please {look over} my essay.", "across the whole", "your eyes pass over it",
  [("look into", D, "investigate"), ("look up", D, "search for information")], "circleDoc")
# ---------------------------------------------------------------- AWAY, BACK
U("away", "Phrasal verbs with AWAY and BACK", "away", [
    "AWAY: going off and gone. BACK: behind, or returned.",
    "pass away, run away: gone  ·  give away: from you to others",
    "hold back: kept behind  ·  pay back: returned",
])
V("pass [away]", "I", "die (polite)", "His grandfather {passed away} last year.", "gone", "he passes away out of this life",
  [("pass out", D, "faint"), ("pass over", D, "ignore, skip")], "personLeft")
V("give [away]", "I", "donate, or reveal", "He {gave away} all his money.", "from you", "it goes away from you to others",
  [("give up", D, "stop doing"), ("give in", D, "surrender")], "gift")
V("run [away]", "B", "escape", "The boy {ran away} from home.", "gone", "he runs away and is gone",
  [("run out", D, "be used up"), ("run over", D, "hit with a vehicle")], "goOut")
V("turn [away]", "I", "refuse entry", "Hundreds were {turned away} at the gate.", "from you", "they are sent away",
  [("turn down", D, "refuse an offer"), ("turn out", D, "prove to be")], "gate")
V("put [away]", "B", "store in its place", "{Put away} your books.", "gone", "out of sight, in its place",
  [("put off", D, "postpone"), ("put out", D, "extinguish")], "inDrawer")
V("hold [back]", "I", "restrain", "She {held back} her tears.", "kept behind", "the tears are held behind",
  [("hold up", D, "delay"), ("hold on", D, "wait")], "holdBack")
V("pay [back]", "B", "return money", "He {paid back} the loan.", "returned", "the money comes back",
  [("pay off", D, "bring success, or clear a debt"), ("pay up", D, "pay what you owe")], "coin")
V("cut [back]", "I", "reduce", "The firm {cut back} spending.", "kept behind", "spending is cut back to less",
  [("cut off", D, "isolate"), ("cut out", D, "remove, or stop")], "minus")
V("look [back]", "B", "think about the past", "{Looking back}, I made many mistakes.", "returned", "your eyes turn back to the past",
  [("look up", D, "search for information"), ("look over", D, "examine quickly")], "returnArc")
# ---------------------------------------------------------------- ABOUT, ACROSS, THROUGH, AFTER, FOR, ROUND
U("more", "Phrasal verbs with ABOUT, ACROSS, THROUGH, AFTER, FOR, ROUND", "through", [
    "Each particle keeps its own picture.",
    "bring about: all around  ·  come across: paths cross  ·  get through: end to end",
    "look after: following to watch  ·  call for: aiming at a need  ·  come round: turning",
])
V("bring [about]", "A", "cause to happen", "The war {brought about} great changes.", "all around", "change is brought into being all around",
  [("bring up", D, "raise a child, or mention"), ("bring down", D, "cause to fall")], "causeEffect")
V("come [about]", "I", "happen", "How did the accident {come about}?", "all around", "it comes into being around us",
  [("come across", D, "find by chance"), ("come up", D, "arise, be mentioned")], "question")
V("come [across]", "I", "find by chance", "I {came across} an old letter.", "crossing", "your path crosses it",
  [("come about", D, "happen"), ("come up", D, "arise, be mentioned")], "magnifier")
V("get [through]", "I", "pass, or finish", "She {got through} the exam.", "end to end", "from one end to the other",
  [("get over", D, "recover from"), ("get on", D, "have a good relationship")], "passThrough")
V("see [through]", "A", "not be fooled by", "She {saw through} his lies.", "end to end", "her eyes pass right through the lie",
  [("see off", D, "say goodbye"), ("see to", D, "deal with")], "lensBars")
V("go [through]", "I", "experience (hardship)", "The country {went through} hard times.", "end to end", "from the start to the end of it",
  [("go over", D, "review"), ("go off", D, "explode")], "roadPass")
V("look [after]", "B", "take care of", "She {looks after} her old parents.", "following", "you follow behind them to watch",
  [("look into", D, "investigate"), ("look for", D, "search for")], "careFor")
V("take [after]", "I", "resemble (a parent)", "He {takes after} his father.", "following", "he follows after him in looks",
  [("take over", D, "take control"), ("take up", D, "start a hobby")], "likeSim")
V("look [for]", "B", "search for", "I am {looking for} my keys.", "aiming at", "the search aims at what you want",
  [("look after", D, "take care of"), ("look into", D, "investigate")], "searchQ")
V("stand [for]", "I", "represent", "UN {stands for} United Nations.", "in place of", "the letters stand in place of the words",
  [("stand by", D, "support, stay loyal"), ("stand out", D, "be easy to notice")], "badge")
V("call [for]", "A", "require", "The situation {calls for} quick action.", "aiming at", "it calls out for what it needs",
  [("call off", D, "cancel"), ("call on", D, "formally ask, urge")], "demandFor")
V("come [round]", "A", "change your opinion", "He will {come round} to our view.", "turning", "he turns round to face our way",
  [("come across", D, "find by chance"), ("come about", D, "happen")], "turnTo")
# ---------------------------------------------------------------- THREE-WORD VERBS
U("three", "Three-word verbs", "with", [
    "Verb + particle + preposition: each part keeps its picture.",
    "put up with: hold up under it, together with it",
    "look forward to: eyes ahead, pointing at the day",
])
V("put up [with]", "I", "tolerate", "I cannot {put up with} this noise.", "together with", "you hold up under it and live with it",
  [("put up", D, "give a guest a place to stay"), ("put up to", D, "persuade someone to do wrong")], "umbrellaRain")
V("look forward [to]", "B", "wait for with pleasure", "We {look forward to} your reply.", "pointing at", "your eyes are ahead, on the day",
  [("look forward for", N, "to points at what is ahead"), ("look up to", D, "admire")], "lookAhead")
V("do away [with]", "A", "abolish", "The government {did away with} the tax.", "together with", "you put it away with you, gone",
  [("do without", D, "manage without"), ("do away of", N, "the fixed form is do away with")], "cross")
V("run out [of]", "B", "have no more", "We have {run out of} petrol.", "what it is made of", "of names the supply that is used up",
  [("run short of", D, "have too little"), ("run out from", N, "of names the supply")], "emptyJar")
V("come up [with]", "I", "think of (an idea)", "She {came up with} a good plan.", "together with", "up into view, and she brings it along",
  [("come up against", D, "face a problem"), ("come up to", D, "reach a standard")], "star")
V("cut down [on]", "I", "reduce", "Try to {cut down on} sugar.", "landing on", "on points at the thing you reduce",
  [("cut down", D, "fell a tree"), ("cut down with", N, "on points at what is reduced")], "minus")
V("face up [to]", "A", "accept and deal with", "You must {face up to} the facts.", "pointing at", "you turn your face to it",
  [("face up with", N, "to points at what you face"), ("look up to", D, "admire")], "faceWind")
V("look down [on]", "I", "despise", "He {looks down on} the poor.", "landing on", "his look falls down on them",
  [("look up to", D, "admire"), ("look down to", N, "on lands on the person")], "lookDown")
V("look up [to]", "I", "admire", "Students {look up to} their teacher.", "pointing at", "your eyes go up to someone above you",
  [("look down on", D, "despise"), ("look up at", D, "raise your eyes to (literally)")], "arrowUp")
V("get away [with]", "I", "escape punishment for", "He {got away with} the crime.", "together with", "he leaves, and the crime goes with him",
  [("get away from", D, "escape from a place"), ("get along with", D, "be friendly with")], "escaped")
V("catch up [with]", "I", "reach someone ahead", "I ran to {catch up with} them.", "together with", "you come level, together with them",
  [("keep up with", D, "stay level with"), ("catch up on", D, "do work left undone")], "arrowR")
V("keep up [with]", "I", "stay level with", "It is hard to {keep up with} the news.", "together with", "you stay level, together with it",
  [("catch up with", D, "reach someone ahead"), ("put up with", D, "tolerate")], "levelScale")
V("make up [for]", "I", "compensate for", "Nothing can {make up for} the loss.", "in exchange for", "one thing is given for another",
  [("make up with", D, "become friends again"), ("make up of", N, "be made up of = consist of")], "exchange")
V("stand up [for]", "I", "defend", "{Stand up for} your rights.", "on behalf of", "you stand up on its behalf",
  [("stand up to", D, "resist someone stronger"), ("stand by", D, "support, stay loyal")], "shield")
V("go in [for]", "A", "take up (a career or contest)", "He {went in for} medicine.", "aiming at", "you go in, aiming at it",
  [("go in with", D, "join as a partner"), ("go for", D, "choose, or attack")], "aimGoal")
V("fall back [on]", "A", "use when other things fail", "We {fell back on} our savings.", "resting on", "you rest on what holds you up",
  [("fall behind with", D, "be late with payments"), ("fall back to", N, "on: you rest on what holds you up")], "support")
V("get on [with]", "I", "have a good relationship with", "She {gets on with} her colleagues.", "together with", "you go on together with them",
  [("get on to", D, "contact"), ("get away with", D, "escape punishment for")], "agreeWith")
