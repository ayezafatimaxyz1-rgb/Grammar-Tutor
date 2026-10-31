# Phase 5: prepositional phrases, grouped by the preposition that carries their sense.
# See phase5.py for the format. {} in an example is where the phrase goes.
# ---------------------------------------------------------------- IN
U("in", "Phrases with IN", "in", [
    "IN puts you inside something: a state, a frame, a situation.",
    "in lieu of: standing in the place of another thing",
    "in view of, in the light of: the fact is inside what you see",
])
F("[in] lieu of", "A", "instead of", "Employees were paid cash {} unused leave.", "lieu = place (French)|you stand in the place of another thing",
  [("in light of", D, "because of new facts"), ("on lieu of", N, "lieu is a place, and you stand in it")], "inLieu")
F("[in] spite of", "B", "despite", "The match went on {} the rain.", "spite = opposition|the action carries on inside the opposition",
  [("despite of", N, "despite takes no of: despite the rain"), ("in place of", D, "instead of the rain")], "umbrellaRain")
F("[in] view of", "I", "considering", "{} the strike, the exam was postponed.", "the fact is in your view|you decide with it in sight",
  [("with a view to", D, "with the aim of"), ("in favour of", D, "supporting the strike")], "viewRisk")
F("[in] the light of", "I", "considering new information", "{} new evidence, the case was reopened.", "light shows things clearly|the facts are seen inside that light",
  [("in spite of", D, "although there was new evidence"), ("on the light of", N, "light surrounds you, so in")], "lightDoc", wrong=["on", "at", "with"])
F("[in] favour of", "B", "supporting", "Most members voted {} the bill.", "favour is a side|you are inside the side that supports",
  [("in favour with", D, "liked by (in favour with the king)"), ("against", D, "opposing the bill")], "voteFor")
F("in accordance [with]", "A", "following a rule or law", "The land was divided {} the law.", "accord = agreement|with joins the action to the rule",
  [("in accordance to", N, "a common error: accordance takes with"), ("in addition to", D, "as well as the law")], "followRule", wrong=["to", "of", "by"])
F("in addition [to]", "B", "as well as", "{} his salary, he gets a car.", "add to: one thing is joined to another|to points at what it is added to",
  [("in addition of", N, "you add to something, so to"), ("in lieu of", D, "instead of his salary")], "addMore", wrong=["of", "with", "for"])
F("[in] charge of", "B", "responsible for", "She is {} the whole project.", "charge = duty|you are inside that duty",
  [("in the charge of", D, "being looked after by someone"), ("on charge of", N, "a role is something you are in")], "leaderGroup")
F("[in] case of", "B", "if there is", "{} fire, use the stairs.", "case = a situation|if you find yourself inside it",
  [("in spite of", D, "although there is a fire"), ("on case of", N, "a situation is something you are in")], "fireStairs")
F("[in] terms of", "I", "measured by, as regards", "{} salary, the job is good.", "terms = the units you measure in|you judge inside those units",
  [("on terms with", D, "on friendly terms with someone"), ("in term of", N, "always plural: terms")], "scale")
F("[in] the wake of", "A", "just after and because of", "Prices rose {} the floods.", "wake = the trail behind a ship|you move inside that trail",
  [("in the face of", D, "while facing the floods"), ("on the wake of", N, "you ride inside the trail, so in")], "boat")
F("[in] the face of", "A", "when facing, despite", "They stayed calm {} danger.", "face to face with it|you act inside that meeting",
  [("in the wake of", D, "just after the danger"), ("on the face of it", D, "apparently, judging by looks")], "faceWind", wrong=["at", "by", "under"])
F("[in] the event of", "I", "if it happens", "{} rain, the match will be postponed.", "an event is a situation|if you find yourself in it",
  [("in the course of", D, "during the rain"), ("at the event of", N, "an event is a situation, so in")], "rain")
F("[in] the course of", "I", "during", "{} the inquiry, new facts emerged.", "course = path|inside the path of the inquiry",
  [("in the case of", D, "concerning the inquiry"), ("during of", N, "during takes no of")], "courseAlong")
F("[in] the interest of", "A", "for the benefit of", "Schools were closed {} public safety.", "the benefit is a cause|you act inside that cause",
  [("in the face of", D, "while facing public safety"), ("for the interest of", N, "the fixed phrase is in the interest of")], "protectKids")
F("[in] the name of", "I", "using as the reason or authority", "Crimes are committed {} religion.", "a name is a frame|people act inside it",
  [("by the name of", D, "called (a man by the name of Ali)"), ("on behalf of", D, "speaking for someone as their agent")], "badge", wrong=["on", "at", "under"])
F("[in] the presence of", "I", "with someone there", "The will was signed {} two witnesses.", "presence surrounds you|you are inside it",
  [("in the absence of", D, "with the witnesses missing"), ("at the presence of", N, "presence surrounds you, so in")], "people")
F("[in] the absence of", "I", "without", "{} proof, he was released.", "absence is a state|you are inside it",
  [("in the presence of", D, "with proof there"), ("on the absence of", N, "absence is a state, so in")], "personLeft")
F("in keeping [with]", "A", "matching", "The decision is {} the constitution.", "keep with = stay together with|with joins the two",
  [("in keeping to", N, "keeping takes with here"), ("in breach of", D, "breaking the constitution")], "fitMould", wrong=["to", "of", "by"])
F("in breach [of]", "A", "breaking a rule", "The order was {} the law.", "a breach of something|of names what is broken",
  [("in keeping with", D, "matching the law"), ("in breach with", N, "a breach is of something")], "brokenBox", wrong=["with", "to", "by"])
F("in pursuit [of]", "A", "trying to get", "He went abroad {} knowledge.", "pursuit = the chase|of names what is chased",
  [("in place of", D, "instead of knowledge"), ("in pursuit for", N, "the chase of its goal, so of")], "aimGoal", wrong=["for", "to", "with"])
F("in search [of]", "B", "looking for", "Thousands left the village {} work.", "a search of something|the verb is search for, the phrase is in search of",
  [("in charge of", D, "responsible for work"), ("in search for", N, "the fixed phrase takes of")], "searchQ", wrong=["to", "with", "about"])
F("in compliance [with]", "A", "obeying", "{} the court's order, the shop was sealed.", "comply with|with joins the act to the order",
  [("in defiance of", D, "openly disobeying"), ("in compliance to", N, "comply with, so compliance with")], "complyWith", wrong=["to", "of", "by"])
F("in defiance [of]", "A", "openly disobeying", "They marched {} the ban.", "defiance of something|of names what is defied",
  [("in compliance with", D, "obeying the ban"), ("in defiance to", N, "defiance is of something")], "barrierStop", wrong=["to", "with", "against"])
F("in response [to]", "I", "as an answer to", "The law was passed {} public demand.", "a response goes to what it answers|to points back at the demand",
  [("in respect of", D, "concerning public demand"), ("in response of", N, "a response goes to something")], "qToA", wrong=["of", "with", "for"])
F("in return [for]", "I", "as payment or exchange for", "He helped me {} a small favour.", "for = exchange|one thing for another",
  [("in place of", D, "instead of a favour"), ("in return of", N, "you give in return for what you get")], "exchange", wrong=["of", "to", "with"])
F("[in] place of", "B", "instead of", "Use honey {} sugar.", "a place you stand in|one thing takes another's place",
  [("in case of", D, "if there is sugar"), ("on place of", N, "a place is something you stand in")], "swap")
F("[in] honour of", "I", "to show respect to", "A dinner was held {} the guest.", "honour is the frame of the event|the dinner sits inside it",
  [("in favour of", D, "supporting the guest"), ("for honour of", N, "the fixed phrase is in honour of")], "crown")
F("in collaboration [with]", "I", "working together with", "The study was done {} Punjab University.", "labour together|with joins the partners",
  [("in competition with", D, "competing against them"), ("in collaboration of", N, "collaborate with, so with")], "agreeWith", wrong=["of", "to", "by"])
F("in contrast [to]", "I", "unlike", "{} his brother, he is shy.", "set one against the other|to points at what you compare",
  [("in addition to", D, "as well as his brother"), ("in contrast of", N, "contrast to or with, never of")], "contrast", wrong=["of", "for", "from"])
F("in the hope [of]", "I", "hoping to get", "He waited at the gate {} a reply.", "a hope of something|of names what you hope for",
  [("in the habit of", D, "used to doing something"), ("in the hope for", N, "the noun phrase takes of")], "star", wrong=["for", "to", "with"])
F("in excess [of]", "A", "more than", "Losses were {} ten million rupees.", "excess = going over|of names the limit",
  [("in want of", D, "lacking ten million"), ("in excess to", N, "an excess of a limit")], "excess", wrong=["to", "from", "with"])
F("in need [of]", "B", "needing", "These roads are {} repair.", "the need for X, but in need of X|in this phrase, of",
  [("in charge of", D, "responsible for repair"), ("in need for", N, "a common error: in need of")], "emptyJar", wrong=["for", "to", "with"])
F("[in] memory of", "I", "to remember someone", "A school was built {} the martyrs.", "memory is the frame|the school stands inside it",
  [("in charge of", D, "responsible for the martyrs"), ("on memory of", N, "the fixed phrase is in memory of")], "heart")
F("in proportion [to]", "A", "matching in size", "Tax should be {} income.", "one size points to another|to links the two sizes",
  [("out of proportion to", D, "far too large for"), ("in proportion of", N, "proportion takes to")], "ratio", wrong=["of", "for", "at"])
# ---------------------------------------------------------------- ON
U("on", "Phrases with ON", "on", [
    "ON rests one thing on another: a base, an edge, a point.",
    "on the basis of, on the strength of: the result rests on it",
    "on the verge of, on the brink of: standing on an edge",
])
F("[on] behalf of", "I", "representing, for", "I am writing {} my father.", "you act resting on his authority|on = support",
  [("on account of", D, "because of my father"), ("in behalf of", N, "old American use; CSS expects on behalf of")], "speakFor")
F("[on] account of", "I", "because of", "The flight was delayed {} fog.", "the result rests on its reason|on = a base",
  [("on behalf of", D, "representing the fog"), ("in account of", N, "a reason is a base the result rests on")], "causeEffect")
F("[on] the basis of", "I", "based on", "Admission is given {} merit.", "a basis is a base|the decision rests on it",
  [("on the verge of", D, "about to reach merit"), ("at the basis of", N, "a basis is something you rest on")], "onBase")
F("[on] the verge of", "A", "very near to", "The species is {} extinction.", "verge = edge|you stand on the edge",
  [("on the eve of", D, "the day before extinction"), ("at the verge of", N, "you stand on an edge")], "nearEnd")
F("[on] the eve of", "I", "just before an event", "Riots broke out {} the election.", "eve = the evening before|days and dates take on",
  [("on the verge of", D, "very near to (a state)"), ("in the eve of", N, "eve is a day, and days take on")], "calendar")
F("[on] the part of", "A", "by, coming from", "There was no mistake {} the driver.", "the act rests on that side|on = belongs to that side",
  [("on behalf of", D, "representing the driver"), ("from the part of", N, "the fixed phrase is on the part of")], "person")
F("[on] the grounds of", "A", "because of (a reason)", "He was dismissed {} misconduct.", "grounds = the ground under a decision|it stands on them",
  [("in the light of", D, "considering new facts"), ("at the grounds of", N, "grounds are a base you stand on")], "reasonFor")
F("[on] the contrary", "I", "the opposite is true", "He is not lazy; {}, he works day and night.", "you stand on the opposite side|on marks that side",
  [("on the other hand", D, "a second point, not a denial"), ("in the contrary", N, "the fixed phrase is on the contrary")], "opposite")
F("[on] the whole", "I", "generally", "{}, the plan worked well.", "standing on the whole thing|looking at all of it",
  [("as a whole", D, "taken together as one unit"), ("in the whole", N, "the fixed phrase is on the whole")], "everywhere")
F("[on] the strength of", "A", "because of the support of", "He got the job {} his degree.", "strength is a support|the result rests on it",
  [("on the part of", D, "done by his degree"), ("by the strength of", N, "a support is rested on, so on")], "support")
F("on a par [with]", "A", "equal to", "Our universities are not {} the best in the world.", "par = level|with joins the two equals",
  [("in line with", D, "matching a policy"), ("on a par to", N, "equal with, so with")], "levelScale", wrong=["to", "of", "at"])
F("[on] the brink of", "A", "very close to (danger)", "The economy is {} collapse.", "brink = the edge of a cliff|you stand on it",
  [("on the eve of", D, "the day before collapse"), ("at the brink of", N, "brink is an edge, and you stand on it")], "endOfPath")
F("[on] the spot", "I", "immediately, there and then", "He was fined {}.", "you stand on that very spot|no moving away",
  [("in a spot", D, "in trouble (informal)"), ("at spot", N, "the fixed phrase is on the spot")], "directHit", wrong=["in", "by", "under"])
F("[on] no account", "A", "never", "{} should you open this door.", "no account to rest on|nothing can support it",
  [("on account of", D, "because of"), ("in no account", N, "the fixed phrase is on no account")], "cross")
# ---------------------------------------------------------------- AT
U("at", "Phrases with AT", "at", [
    "AT points to one spot: a point of control, a price, a state.",
    "at the helm of, at the mercy of: at the point of control",
    "at the cost of, at the rate of: a point on a scale",
])
F("[at] the behest of", "A", "on the order of", "The raid was carried out {} the minister.", "behest = command|the action starts at that point",
  [("on behalf of", D, "representing the minister"), ("on the behest of", N, "the fixed phrase is at the behest of")], "gavel", wrong=["in", "by", "under"])
F("[at] the cost of", "I", "losing something to get it", "He succeeded {} his health.", "a price is a point you pay at|at = a point on a scale",
  [("in the course of", D, "while his health went on"), ("on the cost of", N, "a price is a point you pay at")], "weighCost")
F("[at] the expense of", "A", "causing loss to", "They grew rich {} the poor.", "the bill lands at that point|someone else pays",
  [("at the mercy of", D, "in the power of the poor"), ("on the expense of", N, "a price is a point: at")], "expense")
F("[at] the mercy of", "I", "completely in the power of", "The boat was {} the waves.", "you are at the point where they decide|no control of your own",
  [("at the expense of", D, "causing loss to the waves"), ("in the mercy of", N, "the fixed phrase is at the mercy of")], "puppet")
F("[at] the outset", "A", "at the start", "{}, I must thank the organisers.", "the start is a point in time|at = a point",
  [("at last", D, "finally, after a long wait"), ("in the outset", N, "a starting point takes at")], "flag")
F("at odds [with]", "A", "in disagreement with", "His words are {} his actions.", "odds = difference|with joins the two that differ",
  [("in line with", D, "matching his actions"), ("at odds to", N, "at odds with, never to")], "argue", wrong=["to", "from", "against"])
F("[at] the helm of", "A", "in charge of", "She is {} the company.", "helm = the steering wheel|you stand at that point",
  [("at the mercy of", D, "in the power of the company"), ("on the helm of", N, "you stand at the helm")], "leadGroup")
F("[at] the hands of", "A", "caused by (harm)", "They suffered badly {} the enemy.", "harm comes from that point|at = the source point",
  [("in the hands of", D, "in the control or care of"), ("on the hands of", N, "the fixed phrase is at the hands of")], "puppetHand", wrong=["on", "by", "under"])
F("at variance [with]", "A", "different from", "The report is {} the facts.", "variance = difference|with joins the two that differ",
  [("in keeping with", D, "matching the facts"), ("at variance to", N, "at variance with")], "mismatch", wrong=["to", "from", "of"])
F("[at] random", "B", "without a plan", "Names were chosen {}.", "any point at all|at = a point, unchosen",
  [("at large", D, "free, not caught"), ("by random", N, "the fixed phrase is at random")], "dice")
F("[at] large", "I", "free, not caught", "The killer is still {}.", "loose at no fixed point|nothing holds him",
  [("at random", D, "without a plan"), ("in large", N, "the fixed phrase is at large")], "escaped")
F("[at] the instance of", "A", "at the request of", "The inquiry began {} the court.", "instance = request|the action starts at that point",
  [("for instance", D, "for example"), ("on the instance of", N, "the fixed phrase is at the instance of")], "speak")
F("[at] stake", "I", "at risk", "Thousands of lives are {}.", "a stake = what is bet|it sits at the point of risk",
  [("at large", D, "free, not caught"), ("on stake", N, "the fixed phrase is at stake")], "scaleTip")
F("[at] the rate of", "I", "at the speed or level of", "Prices rose {} ten percent a year.", "a rate is a point on a scale|at = a point",
  [("at the cost of", D, "losing ten percent"), ("on the rate of", N, "a point on a scale takes at")], "perKilo")
# ---------------------------------------------------------------- BY
U("by", "Phrases with BY", "by", [
    "BY names the means: the tool, the force, the way.",
    "by dint of, by means of, by virtue of: this is how it happened",
    "by heart, by chance, by mistake: the way it was done",
])
F("[by] dint of", "A", "by means of (effort)", "He rose {} hard work.", "dint = force|by names the means",
  [("in spite of", D, "although he worked hard"), ("with dint of", N, "the fixed phrase uses by")], "pushRock", wrong=["with", "in", "through"])
F("[by] virtue of", "A", "because of (a quality or right)", "He is a citizen {} his birth here.", "virtue = power or quality|by names what gives the right",
  [("in view of", D, "considering his birth"), ("in virtue of", N, "rare and old; CSS expects by virtue of")], "keyLock", wrong=["with", "on", "through"])
F("[by] means of", "I", "using", "Water is lifted {} a pump.", "means = a tool|by names the tool",
  [("by way of", D, "as a form of, or via"), ("with means of", N, "a means is a way, and ways take by")], "pulley", wrong=["with", "in", "through"])
F("[by] way of", "A", "as a form of, or via", "He said nothing {} apology.", "a way = a route|by names the route",
  [("by means of", D, "using an apology as a tool"), ("in way of", N, "the fixed phrase is by way of")], "roadPass", wrong=["with", "in", "through"])
F("[by] far", "I", "by a great amount", "She is {} the best student in class.", "by marks the size of a difference|far = a long way",
  [("so far", D, "until now"), ("from far", N, "the fixed phrase is by far")], "taller", wrong=["with", "in", "from"])
F("[by] heart", "B", "from memory", "He learnt the poem {}.", "the heart is the means of keeping it|by names the means",
  [("at heart", D, "really, deep down"), ("with heart", N, "the fixed phrase is by heart")], "learnHeart", wrong=["with", "in", "from"])
F("[by] chance", "B", "accidentally", "We met {} in the market.", "chance is the way it happened|by names the way",
  [("by choice", D, "deliberately"), ("with chance", N, "the fixed phrase is by chance")], "question", wrong=["with", "in", "through"])
F("[by] no means", "I", "not at all", "The task is {} easy.", "no means = no way at all|by names the way",
  [("by all means", D, "certainly, of course"), ("in no means", N, "the fixed phrase is by no means")], "minus", wrong=["with", "in", "through"])
F("[by] and large", "A", "generally", "{}, the people are honest.", "an old sailing phrase|taken as a whole",
  [("at large", D, "free, not caught"), ("by and by", D, "after a while")], "crowd", wrong=["with", "in", "at"])
F("[by] mistake", "B", "accidentally, in error", "He took my bag {}.", "the mistake is the way it happened|by names the way",
  [("on purpose", D, "deliberately"), ("in mistake", N, "the fixed phrase is by mistake")], "wrongWay", wrong=["with", "in", "through"])
F("[by] force of", "A", "because of the power of", "He woke at five {} habit.", "force is the means|by names it",
  [("in spite of", D, "although he had the habit"), ("with force of", N, "the fixed phrase is by force of")], "loop", wrong=["with", "in", "on"])
# ---------------------------------------------------------------- WITH, WITHOUT
U("with", "Phrases with WITH and WITHOUT", "with", [
    "WITH joins a statement to its topic or its aim; WITHOUT cuts the link.",
    "with regard to, with reference to: joined to a topic",
    "without fail, without regard to: nothing joined",
])
F("with regard [to]", "I", "concerning", "{} your letter, the post has been filled.", "regard = a look|to points at what you look at",
  [("with a view to", D, "with the aim of"), ("with regard of", N, "regard to: pointing at the topic")], "pointDoc", wrong=["of", "on", "at"])
F("with reference [to]", "I", "about, concerning", "{} your letter of 5 May, I am pleased to reply.", "refer to|to points at what is referred to",
  [("in response to", D, "as an answer to your letter"), ("with reference of", N, "reference points to something")], "docSays", wrong=["of", "for", "on"])
F("with a view [to]", "A", "with the aim of (+ -ing)", "He saved money {} buying a house.", "a view to a goal|to points ahead at the aim",
  [("in view of", D, "considering"), ("with a view of", N, "a view of = a sight of (a view of the sea)")], "lookAhead", wrong=["of", "for", "on"])
F("with respect [to]", "A", "concerning", "{} fees, nothing has changed.", "respect = looking back at|to points at the topic",
  [("with respect for", D, "showing respect for"), ("with respect of", N, "with respect to, or in respect of")], "circleDoc", wrong=["of", "on", "at"])
F("[with] the exception of", "I", "except", "Everyone attended {} Ali.", "with marks what goes along|here, the one left out",
  [("with the help of", D, "helped by Ali"), ("without the exception of", N, "the exception is the one left out")], "exceptOne", wrong=["in", "by", "at"])
F("[without] fail", "B", "always, every time", "He writes to his mother every week {}.", "with no failure at all|without = none of it",
  [("without doubt", D, "certainly"), ("with no fail", N, "the fixed phrase is without fail")], "check", wrong=["with", "in", "by"])
F("without regard [to]", "A", "ignoring", "Aid was given {} religion.", "regard to = paying attention to|without cuts that link",
  [("with regard to", D, "concerning religion"), ("without regard of", N, "regard to (or for)")], "lensBars", wrong=["of", "on", "at"])
F("[with] the help of", "B", "helped by, using", "He climbed the wall {} a rope.", "the help comes along with you|with = together",
  [("by dint of", D, "by his own effort"), ("by the help of", N, "help comes along with you: with")], "lift", wrong=["by", "in", "from"])
F("with effect [from]", "A", "starting from (a date)", "The new rule applies {} 1 July.", "the effect starts from that date|from = a starting point",
  [("in effect", D, "in practice, really"), ("with effect of", N, "effect from: a starting date")], "sincePoint", wrong=["of", "since", "to"])
# ---------------------------------------------------------------- FOR
U("for", "Phrases with FOR", "for", [
    "FOR aims at a purpose, a benefit or a cause.",
    "for the sake of: aimed at someone's good",
    "for want of, for fear of: the cause behind an action",
])
F("[for] the sake of", "I", "for the good of", "He left the city {} his children.", "for aims at the benefit|sake = good",
  [("on behalf of", D, "representing his children"), ("to the sake of", N, "the fixed phrase is for the sake of")], "careFor", wrong=["to", "in", "by"])
F("[for] want of", "A", "because of a lack of", "The plants died {} water.", "want = lack|for names the cause",
  [("in need of", D, "needing water, still alive"), ("by want of", N, "the fixed phrase is for want of")], "drop", wrong=["to", "by", "from"])
F("[for] fear of", "I", "because afraid of", "He kept quiet {} punishment.", "for names the cause|fear is why he acts",
  [("for the sake of", D, "to benefit punishment"), ("to fear of", N, "the fixed phrase is for fear of")], "afraidOf", wrong=["to", "by", "at"])
F("[for] good", "I", "for ever, permanently", "He has left the country {}.", "for marks how long|good = for ever",
  [("for a while", D, "for a short time"), ("in good", N, "the fixed phrase is for good")], "goHome", wrong=["to", "in", "by"])
F("[for] the time being", "I", "for now, temporarily", "{} you can use my room.", "for marks how long|only this stretch of time",
  [("from time to time", D, "now and then"), ("at the time being", N, "the fixed phrase is for the time being")], "clock", wrong=["to", "in", "by"])
F("[for] instance", "B", "for example", "Many fruits, {} mangoes, grow here.", "for = in the role of|this one stands for the rest",
  [("at the instance of", D, "at the request of"), ("in instance", N, "the fixed phrase is for instance")], "magnifier", wrong=["to", "in", "by"])
# ---------------------------------------------------------------- UNDER
U("under", "Phrases with UNDER", "under", [
    "UNDER puts something below a cover, a control or a process.",
    "under the auspices of: below its protection",
    "under consideration, under way: below a process still going on",
])
F("[under] the auspices of", "A", "supported by", "The summit was held {} UNESCO.", "auspices = protection|you are under its cover",
  [("at the behest of", D, "on UNESCO's order"), ("in the auspices of", N, "protection covers you: under")], "umbrella")
F("[under] the guise of", "A", "pretending to be", "He entered the house {} a doctor.", "a disguise covers you|you are under it",
  [("in the name of", D, "using a doctor's authority"), ("on the guise of", N, "a disguise covers you: under")], "secret", wrong=["on", "below", "at"])
F("[under] consideration", "I", "being thought about", "The proposal is {}.", "a process covers it|it sits under it, not finished",
  [("under construction", D, "being built"), ("in consideration of", D, "in return for")], "review", wrong=["on", "below", "at"])
F("[under] the influence of", "I", "affected by", "He was driving {} drugs.", "the influence presses down|you are under it",
  [("in the hands of", D, "in the control of"), ("on the influence of", N, "influence presses down: under")], "shaking")
F("[under] way", "A", "in progress", "Work on the dam is {}.", "an old sailing phrase|the ship is moving",
  [("on the way", D, "travelling, not yet there"), ("in way", N, "the fixed phrase is under way")], "driveOn")
F("[under] no circumstances", "A", "never", "{} should you sign it.", "no situation can cover it|under = covered by",
  [("under the circumstances", D, "considering the situation"), ("in any case", D, "whatever happens")], "shield", wrong=["on", "below", "at"])
# ---------------------------------------------------------------- MORE
U("more", "More phrases: out of, beyond, within, from, to, of, against", "out of", [
    "OUT OF and BEYOND: outside a state or past a limit.",
    "WITHIN: inside a limit. FROM: a starting point. TO: pointing at.",
    "against the backdrop of: set in front of a background",
])
F("[out of] order", "B", "not working", "The lift is {}.", "out of = outside a state|outside its working order",
  [("in order", D, "arranged correctly, or allowed"), ("off order", N, "the fixed phrase is out of order")], "switchOff", wrong=["off", "from", "beyond"])
F("[out of] date", "B", "old, no longer valid", "This map is {}.", "out of = outside|outside its time",
  [("up to date", D, "current, the opposite"), ("off date", N, "the fixed phrase is out of date")], "oldCalendar", wrong=["off", "from", "beyond"])
F("[out of] the question", "I", "impossible", "A holiday is {} this year.", "outside what can even be asked|out of = outside",
  [("beyond question", D, "certainly true"), ("without question", D, "with no doubt")], "cross", wrong=["off", "in", "from"])
F("[beyond] doubt", "I", "certainly", "His guilt has been proved {}.", "past the reach of doubt|beyond = further than",
  [("in doubt", D, "uncertain"), ("over doubt", N, "the fixed phrase is beyond doubt")], "check", wrong=["over", "above", "out of"])
F("[beyond] one's means", "I", "spending more than you have", "They live {beyond their means}.", "past the limit of what you have|beyond = further than",
  [("within their means", D, "spending only what they have"), ("above their means", N, "the fixed phrase is beyond your means")], "coin", wrong=["over", "above", "out of"])
F("[within] reach", "B", "close enough to get", "Success is now {}.", "inside the limit of your arm|within = inside a limit",
  [("out of reach", D, "too far to get"), ("inside reach", N, "the fixed phrase is within reach")], "reachDot", wrong=["inside", "into", "among"])
F("[from] scratch", "I", "from the very beginning", "They rebuilt the school {}.", "scratch = the starting line|from = a starting point",
  [("from time to time", D, "now and then"), ("by scratch", N, "you start from a starting line")], "pen", wrong=["by", "of", "at"])
F("[to] the point", "I", "relevant, brief", "His speech was short and {}.", "to points at|it points straight at the point",
  [("on the point of", D, "about to do something"), ("at the point", N, "the fixed phrase is to the point")], "target", wrong=["at", "for", "by"])
F("[of] late", "A", "recently", "{} he has been unwell.", "an old phrase|of = from the time of",
  [("at last", D, "finally"), ("in late", N, "the fixed phrase is of late")], "recentYears", wrong=["in", "at", "by"])
F("[against] the backdrop of", "A", "with that situation in the background", "Elections were held {} violence.", "a backdrop hangs behind|events are seen against it",
  [("in the wake of", D, "just after the violence"), ("on the backdrop of", N, "a background stands behind: against")], "wall", wrong=["on", "in", "at"])
F("according [to]", "B", "as stated by", "{} the report, crime has fallen.", "accord = agree|to points at the source",
  [("in accordance with", D, "following a rule"), ("according with", N, "the fixed phrase is according to")], "docSays", wrong=["with", "for", "by"])
F("owing [to]", "I", "because of", "{} illness, he missed the exam.", "owe to = the debt points to the cause|to points at it",
  [("thanks to", D, "because of, with credit or thanks"), ("owing for", N, "the fixed phrase is owing to")], "causeEffect", wrong=["for", "of", "by"])
F("prior [to]", "A", "before", "{} the meeting, the papers were sent.", "prior = earlier|to points at what it is earlier than",
  [("subsequent to", D, "after the meeting"), ("prior than", N, "prior takes to, not than")], "priorDot", wrong=["than", "for", "of"])
F("apart [from]", "I", "except, or as well as", "{} English, he speaks French.", "apart = separated|from = away from",
  [("instead of", D, "in place of English"), ("apart of", N, "the fixed phrase is apart from")], "groupOut", wrong=["of", "to", "by"])
