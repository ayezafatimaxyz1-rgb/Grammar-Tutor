/* Master curriculum and coverage tracker.
   status: planned → drafted → implemented → tested → complete
     planned      listed in the curriculum, no lesson content yet
     drafted      explanations written, not yet built into the app
     implemented  playable in the app
     tested       passes the automated checks
     complete     reviewed and approved by the learner
   flags: formal, literary, archaic, regional (BrE/AmE), disputed. These mark usage notes the
   lesson must cover, not reasons to skip the item.

   This inventory was drafted from general grammar knowledge. It has NOT yet been checked
   item by item against dictionaries, grammar references or CSS past papers; that research is a
   later stage, and "gaps" below lists what is known to be missing. */
(function () {
  const L = (id, title, o = {}) => ({ id, title, status: "planned", flags: [], ...o });

  PLAB.curriculum = {
    phases: [
      {
        id: "p1",
        title: "Phase 1: Individual prepositions",
        intro: "One preposition at a time: its core sense, a drawn picture, its meaning map, contrasts, mistakes and practice.",
        units: [
          {
            id: "p1-foundations",
            title: "Foundations",
            lessons: [
              L("what-is-a-preposition", "What a preposition is: the thing, the reference point, the relationship"),
              L("prep-adverb-conjunction", "Same word, different job: preposition, adverb particle or conjunction (after, before, since, up)"),
              L("prep-objects", "What follows a preposition: nouns, pronouns (between you and me), -ing forms, clauses"),
              L("stranding", "Ending a sentence with a preposition: myth and real usage", { flags: ["disputed"] }),
            ],
          },
          {
            id: "p1-space-containers",
            title: "Space: containers, surfaces and points",
            lessons: [
              L("in-core", "IN: inside a boundary", { status: "tested", lessonId: "in-core" }),
              L("in-time", "IN for time: in June, in 2025, in the morning, in ten minutes", { status: "tested", lessonId: "in-time" }),
              L("on-core", "ON: contact with a surface, and its extensions", { status: "tested", lessonId: "on-core" }),
              L("at-core", "AT: a place pictured as a point", { status: "tested", lessonId: "at-core" }),
              L("in-on-at-place", "Comparison: in / on / at for places (in the car, on the bus, at the station)", { status: "tested", lessonId: "in-on-at-place" }),
              L("in-on-at-time", "Comparison: in / on / at for time"),
              L("into-onto", "INTO and ONTO: movement that ends inside or on"),
              L("out-of-off", "OUT OF and OFF: leaving a container or a surface"),
              L("inside-outside", "INSIDE and OUTSIDE (and inside of, outside of)", { flags: ["regional"] }),
              L("within-without", "WITHIN, and the old sense of WITHOUT (outside)", { flags: ["formal", "archaic"] }),
            ],
          },
          {
            id: "p1-position",
            title: "Space: position and arrangement",
            lessons: [
              L("over-above", "OVER and ABOVE"),
              L("under-below", "UNDER, BELOW, BENEATH, UNDERNEATH", { flags: ["formal"] }),
              L("on-top-of", "ON TOP OF"),
              L("beside-besides", "BESIDE vs BESIDES"),
              L("near-by-next-to", "NEAR, NEAR TO, BY, NEXT TO, CLOSE TO, ALONGSIDE"),
              L("front-behind", "IN FRONT OF, BEHIND, OPPOSITE, AHEAD OF, BEFORE (place)", { flags: ["formal"] }),
              L("between-among", "BETWEEN, AMONG, AMONGST, AMID, AMIDST", { flags: ["regional", "literary"] }),
              L("around-round-about", "AROUND, ROUND, ABOUT (place)", { flags: ["regional"] }),
              L("against", "AGAINST: contact, opposition, contrast"),
              L("upon", "UPON: formal on, and fixed phrases (once upon a time, upon arrival)", { flags: ["formal"] }),
            ],
          },
          {
            id: "p1-movement",
            title: "Space: movement and path",
            lessons: [
              L("to-towards", "TO and TOWARD(S)", { flags: ["regional"] }),
              L("from", "FROM: source and starting point"),
              L("through", "THROUGH (and AmE through = until)", { flags: ["regional"] }),
              L("across-along", "ACROSS and ALONG"),
              L("past-by-via", "PAST, BY, VIA"),
              L("up-down", "UP and DOWN as prepositions"),
              L("beyond", "BEYOND: further than, and beyond doubt / beyond control"),
              L("throughout", "THROUGHOUT"),
            ],
          },
          {
            id: "p1-time",
            title: "Time",
            lessons: [
              L("for-since", "FOR vs SINCE"),
              L("during-for", "DURING vs FOR"),
              L("by-until", "BY vs UNTIL / TILL", { flags: ["regional"] }),
              L("before-after", "BEFORE, AFTER, PRIOR TO, SUBSEQUENT TO", { flags: ["formal"] }),
              L("from-to-till", "FROM ... TO / UNTIL / THROUGH", { flags: ["regional"] }),
              L("within-time", "WITHIN and IN for time limits"),
              L("pending", "PENDING and other participle prepositions (following, considering, given)", { flags: ["formal"] }),
              L("ago-not-prep", "Words that look like time prepositions but are not (ago, last week, home)"),
            ],
          },
          {
            id: "p1-relations",
            title: "Relations, means and attitude",
            lessons: [
              L("of", "OF: belonging, part, material, content, and of vs 's"),
              L("for", "FOR: purpose, benefit, exchange, support, duration"),
              L("with-without", "WITH and WITHOUT: company, instrument, manner, possession"),
              L("by-agent-means", "BY: agent, means, method, and by vs with"),
              L("about-on-topic", "ABOUT vs ON for topics"),
              L("as-like", "AS vs LIKE", { flags: ["disputed"] }),
              L("unlike", "UNLIKE"),
              L("except-but-save", "EXCEPT, EXCEPT FOR, BUT, SAVE, BARRING", { flags: ["formal"] }),
              L("despite", "DESPITE and IN SPITE OF"),
              L("per-plus-minus-versus", "PER, PLUS, MINUS, VERSUS, RE", { flags: ["formal"] }),
              L("than-debate", "THAN: preposition or conjunction? (taller than me / than I am)", { flags: ["disputed"] }),
              L("regarding-concerning", "REGARDING, CONCERNING, RESPECTING, TOUCHING", { flags: ["formal", "archaic"] }),
              L("including-excluding", "INCLUDING, EXCLUDING, NOTWITHSTANDING", { flags: ["formal"] }),
              L("archaic-literary", "Archaic and literary prepositions: unto, betwixt, ere, athwart, anent, qua, vis-à-vis", { flags: ["archaic", "literary"] }),
            ],
          },
          {
            id: "p1-complex",
            title: "Multiword (complex) prepositions",
            lessons: [
              L("cause", "Cause: because of, due to, owing to, on account of, thanks to", { flags: ["disputed"] }),
              L("purpose-means", "Purpose and means: for the sake of, with a view to, by means of, by virtue of, by dint of", { flags: ["formal"] }),
              L("reference", "Reference: with regard to, in regard to, as regards, with respect to, in terms of, as to, as for", { flags: ["formal"] }),
              L("addition-exception", "Addition and exception: in addition to, as well as, along with, together with, apart from, aside from, with the exception of", { flags: ["regional"] }),
              L("substitution", "Substitution: instead of, in place of, in lieu of, rather than", { flags: ["formal"] }),
              L("conformity", "Conformity and basis: according to, in accordance with, in line with, on the basis of, pursuant to", { flags: ["formal"] }),
              L("concession", "Concession and contrast: in spite of, regardless of, irrespective of, in contrast to/with, as opposed to"),
              L("representation", "On behalf of (and AmE in behalf of), on the part of, in favour of, in charge of", { flags: ["regional"] }),
              L("circumstance", "Circumstance: in view of, in (the) light of, in the event of, in case of, in the face of, in the wake of", { flags: ["regional"] }),
              L("comparison-measure", "Comparison and measure: in comparison with/to, in relation to, in excess of, up to, close to, far from"),
              L("process", "Process and cost: in the course of, at the expense of, for the purpose of, by way of"),
            ],
          },
        ],
      },
      {
        id: "p2",
        title: "Phase 2: Fixed combinations",
        intro: "Words that choose a particular preposition, why they do when a reason exists, and how to learn them when the reason is simply usage.",
        units: [
          {
            id: "p2-verb",
            title: "Verb + preposition (prepositional verbs)",
            lessons: [
              L("depend-rely", "depend on, rely on, count on, insist on, focus on, comment on"),
              L("believe-in", "believe in vs believe someone; trust in, confide in, succeed in, persist in"),
              L("apply-for-to", "apply for a job vs apply to an institution"),
              L("agree-with-on-to", "agree with a person, agree on a subject, agree to a proposal"),
              L("arrive-at-in", "arrive at a building or point, arrive in a city or country"),
              L("look-family", "look at, look for, look after, look into, look forward to"),
              L("object-pattern", "Verb + object + preposition: prevent from, accuse of, congratulate on, blame for, provide with"),
              L("no-preposition", "Verbs that take no preposition: discuss, enter, reach, marry, resemble, approach"),
              L("abstain-refrain", "Formal verbs: abstain from, refrain from, adhere to, comply with, conform to, dispense with", { flags: ["formal"] }),
              L("die-of-from", "die of vs die from; suffer from, recover from, result in vs result from"),
              L("compare-to-with", "compare to vs compare with; contrast with, distinguish between/from", { flags: ["disputed"] }),
            ],
          },
          {
            id: "p2-adjective",
            title: "Adjective + preposition",
            lessons: [
              L("feelings", "Feelings: interested in, afraid of, fond of, keen on, angry with/at/about", { flags: ["regional"] }),
              L("ability", "Ability: good at, bad at, capable of, skilled in/at, proficient in"),
              L("responsibility", "Responsibility: responsible for, accountable to/for, liable for/to"),
              L("similarity", "Similarity and difference: similar to, identical to/with, different from/to/than", { flags: ["regional", "disputed"] }),
              L("familiarity", "familiar with vs familiar to; aware of, conscious of, ignorant of"),
              L("formal-adjectives", "Formal: impervious to, contingent on/upon, conducive to, averse to, tantamount to, commensurate with", { flags: ["formal"] }),
            ],
          },
          {
            id: "p2-noun",
            title: "Noun + preposition",
            lessons: [
              L("reason-cause", "reason for, cause of, solution to, answer to, key to"),
              L("demand-need", "demand for, need for, respect for, desire for"),
              L("access-approach", "access to, approach to, attitude to/towards, reaction to"),
              L("increase-decrease", "an increase in vs an increase of; a rise in, a fall in"),
              L("relationship", "relationship with/between, connection with/between, link to/with/between"),
            ],
          },
          {
            id: "p2-phrasal",
            title: "Phrasal verbs and prepositional verbs",
            lessons: [
              L("phrasal-vs-prepositional", "Phrasal verb or prepositional verb? (look up a word vs look up the chimney)"),
              L("separability", "Where the object goes: turn it off, look after it"),
              L("three-part", "Three-part verbs: put up with, look down on, do away with, come up with"),
              L("formal-alternatives", "Formal one-word alternatives for CSS writing (investigate for look into)", { flags: ["formal"] }),
            ],
          },
          {
            id: "p2-idiom",
            title: "Idioms and fixed expressions",
            lessons: [
              L("in-idioms", "Expressions with in: in charge, in time vs on time, in the end vs at the end"),
              L("on-at-idioms", "Expressions with on and at: on purpose, at random, at large, on the whole"),
              L("by-out-of-idioms", "Expressions with by, out of, under: by heart, out of order, under way"),
            ],
          },
          {
            id: "p2-errors",
            title: "Common errors and corrections",
            lessons: [
              L("redundant", "Redundant prepositions: discuss about, reach at, return back, emphasise on"),
              L("missing", "Missing prepositions: listen to, wait for, explain to someone"),
              L("wrong-choice", "Wrong choice from the first language: married with, angry on, consist from"),
            ],
          },
        ],
      },
      {
        id: "p3",
        title: "Phase 3: CSS examination lab",
        intro: "Authentic past-paper questions with verified sources, kept separate from original practice questions.",
        units: [
          {
            id: "p3-css",
            title: "CSS English Precis and Composition",
            lessons: [
              L("syllabus", "What the FPSC syllabus asks for, verified against the official document"),
              L("past-papers", "Verified past-paper preposition questions, by year, with sources"),
              L("patterns", "Recurring patterns in past papers"),
              L("mixed-practice", "Original mixed practice sets and timed tests"),
            ],
          },
        ],
      },
    ],
    gaps: [
      "The inventory has not yet been checked item by item against dictionaries or grammar references.",
      "No CSS past paper has been collected or verified yet. The app contains no past-paper questions.",
      "The Phase 2 lists are starting sets, not complete inventories. They need a research pass to expand.",
      "Senses of each preposition (e.g. the many uses of of, for, by) will be listed inside each lesson once researched.",
    ],
  };
})();
