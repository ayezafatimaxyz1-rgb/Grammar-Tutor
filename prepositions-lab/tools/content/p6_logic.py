# How each phrasal verb is built: base verb meaning + particle meaning = meaning in context.
# Used by phase6.py. Keep each base meaning short: it is written on the board.

BASE = {
    "give": "hand something over", "bring": "carry something here", "set": "put in place", "draw": "pull along",
    "turn": "change direction", "speed": "move fast", "step": "move one foot", "make": "create, form",
    "look": "direct your eyes", "take": "get hold of", "break": "split into pieces", "wind": "turn round and round",
    "blow": "push air", "hold": "keep in your hands", "keep": "continue to have", "cut": "divide with a blade",
    "put": "place something", "let": "allow", "write": "put words on paper", "slow": "lessen speed",
    "hand": "pass by hand", "carry": "hold while moving", "find": "discover", "point": "show with a finger",
    "rule": "decide, govern", "run": "move fast", "wipe": "rub clean", "single": "one alone",
    "weed": "pull out bad plants", "call": "speak out, name", "see": "use your eyes", "lay": "put down flat",
    "go": "move", "pay": "give money", "show": "let someone see", "ward": "guard",
    "catch": "seize something moving", "pass": "move past", "count": "rely, matter", "fill": "make full",
    "drop": "let fall", "get": "reach, obtain", "think": "use your mind", "do": "perform",
    "come": "move here", "face": "turn towards", "stand": "be upright", "fall": "drop down",
}

# Three-word verbs: what the middle particle adds.
MID = {
    "put up with": "holding up a weight", "look forward to": "ahead", "do away with": "gone",
    "run out of": "used up", "come up with": "into view", "cut down on": "less", "face up to": "fully, standing up",
    "look down on": "from above", "look up to": "to someone higher", "get away with": "free, escaping",
    "catch up with": "level", "keep up with": "level", "make up for": "complete, filling a gap",
    "stand up for": "upright, in defence", "go in for": "into an activity", "fall back on": "back, to a reserve",
    "get on with": "along, continuing",
}

# The same verb in another common context: (example with {form}, meaning, how the parts fit there).
ALSO = {
    "break down": ("The old man {broke down} when he heard the news.", "lose control of your feelings", "his calm breaks and falls down, and he cries"),
    "put off": ("The bad smell {put off} many customers.", "make someone dislike", "the customers are pushed away from the shop"),
    "take off": ("{Take off} your shoes at the door.", "remove (clothes)", "the shoes are taken away from your feet"),
    "turn up": ("Please {turn up} the volume.", "increase (sound, heat)", "the knob is turned so the sound goes up"),
    "make up": ("He {made up} a story to escape punishment.", "invent", "a story is made into being out of nothing"),
    "set off": ("The arrest {set off} riots in the city.", "cause to start", "it sets the riots going off, like a fuse"),
    "go off": ("The milk has {gone off}.", "go bad", "it has gone away from fresh"),
    "look up": ("After the rains, things are {looking up}.", "improve", "things point upward"),
    "bring up": ("She {brought up} the issue at the meeting.", "mention", "the issue is brought up into view"),
    "give out": ("The old engine {gave out} on the hill.", "stop working", "its strength is given out until none is left"),
    "hold up": ("Armed men {held up} the bank.", "rob with weapons", "everyone is stopped, hands held up"),
    "turn out": ("A huge crowd {turned out} for the rally.", "come to an event", "people turn out of their homes and come"),
    "pay off": ("He {paid off} his loan in two years.", "pay a debt in full", "the debt is paid until it is off you"),
    "take in": ("The school {took in} the flood victims.", "give shelter to", "the people are taken inside"),
    "take up": ("This desk {takes up} too much space.", "fill (space or time)", "the space is taken up, used completely"),
    "break up": ("The couple {broke up} last year.", "end a relationship", "the pair breaks into two"),
    "come round": ("He fainted but soon {came round}.", "become conscious again", "his mind turns round, back to us"),
    "get through": ("I could not {get through} to her on the phone.", "make contact by phone", "the call passes through to her"),
    "pass on": ("The disease is {passed on} by mosquitoes.", "spread to others", "it moves on from one person to the next"),
    "pick up": None,
}
ALSO = {k: v for k, v in ALSO.items() if v}
