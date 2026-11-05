/* Dictionary detail, M to Z. Same format as vocab-dict.js. */
(function () {
  const out = {};
  const D = (word, pos, labels, coll, usage) => (out[word] = { pos, labels: labels ? labels.split(",").map((x) => x.trim()) : [], coll: coll ? coll.split("|").map((x) => x.trim()) : [], usage });

  // ---------------------------------------------------------------- M, N
  D("magnanimous", "adjective", "approving", "magnanimous in victory | magnanimous gesture", "Fixed: 'magnanimous IN victory'. Noun: magnanimity.");
  D("malevolent", "adjective", "formal", "malevolent force | malevolent smile", "Opposite: benevolent.");
  D("malicious", "adjective", "", "malicious gossip | malicious damage | malicious intent", "Noun: malice. 'malicious intent' is a law phrase.");
  D("meagre", "adjective", "", "meagre income | meagre resources | meagre diet", "American spelling: meager.");
  D("mellifluous", "adjective", "formal, approving", "mellifluous voice | mellifluous tones", "Mostly for voices and music.");
  D("mendacious", "adjective", "formal", "mendacious report | mendacious claims", "Noun: mendacity. Do not confuse with 'mendicant' (beggar).");
  D("mitigate", "verb", "formal", "mitigate the effects | mitigate the risk | mitigating circumstances", "Not 'mitigate against': that is 'militate against'.");
  D("mollify", "verb", "formal", "mollify critics | mollify someone's anger", "Takes a person or their anger as object.");
  D("morose", "adjective", "", "morose silence | morose mood", "Sad and silent.");
  D("mundane", "adjective", "", "mundane tasks | mundane details | mundane life", "Usually slightly disapproving.");
  D("munificent", "adjective", "formal, approving", "munificent gift | munificent donor", "Noun: munificence.");
  D("nefarious", "adjective", "formal", "nefarious activities | nefarious purposes | nefarious schemes", "Only for wicked acts; never for a merely bad result.");
  D("negligent", "adjective", "law, disapproving", "negligent in | gross negligence | criminally negligent", "negligent IN doing something. Do not confuse with 'negligible' (very small).");
  D("nonchalant", "adjective", "", "nonchalant shrug | nonchalant about", "nonchalant ABOUT something.");
  D("notorious", "adjective", "disapproving", "notorious for | notorious criminal", "notorious FOR something bad. For good fame use 'famous' or 'renowned'.");

  // ---------------------------------------------------------------- O
  D("obdurate", "adjective", "formal, disapproving", "obdurate refusal | remain obdurate", "Very stubborn.");
  D("oblivious", "adjective", "", "oblivious to | oblivious of", "oblivious TO or OF something.");
  D("obscure", "adjective, verb", "", "obscure poet | obscure reasons | obscure the view", "As a verb: hide or make unclear. Noun: obscurity.");
  D("obsequious", "adjective", "formal, disapproving", "obsequious manner | obsequious servant", "Too eager to please.");
  D("obsolete", "adjective", "", "become obsolete | render obsolete | obsolete technology", "'render something obsolete' = make it out of date.");
  D("obstinate", "adjective", "disapproving", "obstinate refusal | obstinate child", "Noun: obstinacy.");
  D("ominous", "adjective", "", "ominous silence | ominous signs | ominous clouds", "Noun: omen.");
  D("opulent", "adjective", "", "opulent palace | opulent lifestyle", "Noun: opulence.");
  D("ostentatious", "adjective", "disapproving", "ostentatious display | ostentatious wealth", "Noun: ostentation.");

  // ---------------------------------------------------------------- P
  D("palliate", "verb", "formal, medical", "palliate symptoms | palliative care", "'palliative care' = care that eases pain when a cure is not possible.");
  D("paramount", "adjective", "", "of paramount importance | paramount concern | is paramount", "Fixed: 'of paramount importance'. Not 'very paramount'.");
  D("parsimonious", "adjective", "formal, disapproving", "parsimonious government | parsimonious with", "parsimonious WITH money.");
  D("partisan", "adjective, noun", "", "partisan politics | partisan press | partisan divide", "Noun: a strong supporter of a party.");
  D("paucity", "noun", "formal", "a paucity of", "Always 'a paucity OF something'.");
  D("pedantic", "adjective", "disapproving", "pedantic about | pedantic insistence", "Noun: pedant, pedantry.");
  D("penitent", "adjective, noun", "formal", "penitent sinner | penitent tone", "Noun: penitence.");
  D("perfidious", "adjective", "formal, literary", "perfidious ally | perfidious act", "Noun: perfidy.");
  D("perfunctory", "adjective", "", "perfunctory nod | perfunctory check | perfunctory manner", "Usually before a noun.");
  D("pernicious", "adjective", "formal", "pernicious effect | pernicious influence | pernicious to", "pernicious TO health. Harm that works slowly or hidden.");
  D("perspicacious", "adjective", "formal, approving", "perspicacious observer | perspicacious remarks", "Noun: perspicacity. Do not confuse with 'perspicuous' (clearly expressed).");
  D("pertinent", "adjective", "", "pertinent to | pertinent question | pertinent information", "pertinent TO a matter.");
  D("placate", "verb", "", "placate critics | placate the public", "Adjective: placatory.");
  D("plausible", "adjective", "", "plausible explanation | plausible excuse", "Seems likely, but may not be true.");
  D("plethora", "noun", "formal", "a plethora of", "Always 'a plethora OF'; often slightly disapproving (too many).");
  D("pragmatic", "adjective", "approving", "pragmatic approach | pragmatic solution", "Noun: pragmatism.");
  D("precarious", "adjective", "", "precarious position | precarious balance | precarious existence", "Not stable, likely to fail.");
  D("precocious", "adjective", "", "precocious child | precocious talent", "Mostly for children.");
  D("pristine", "adjective", "approving", "pristine condition | pristine beaches", "Fixed: 'in pristine condition'.");
  D("prodigal", "adjective, noun", "formal", "prodigal son | prodigal with", "'the prodigal son' = a son who wastes money and returns sorry.");
  D("prolific", "adjective", "approving", "prolific writer | prolific scorer", "Producing a lot.");
  D("propensity", "noun", "formal", "a propensity for | a propensity to", "propensity FOR something or TO do something.");
  D("prosaic", "adjective", "disapproving", "prosaic language | prosaic explanation", "From 'prose': plain, not poetic.");
  D("prudent", "adjective", "approving", "prudent to | prudent decision | prudent investment", "'It is prudent to…' Noun: prudence.");
  D("pugnacious", "adjective", "formal, disapproving", "pugnacious style | pugnacious politician", "Eager to fight or argue.");

  // ---------------------------------------------------------------- Q, R
  D("querulous", "adjective", "formal", "querulous voice | querulous tone", "Complaining, in a whining way.");
  D("quixotic", "adjective", "", "quixotic quest | quixotic attempt", "From Don Quixote: noble but unrealistic.");
  D("rancour", "noun", "formal", "without rancour | bitter rancour", "American spelling: rancor. Adjective: rancorous.");
  D("recalcitrant", "adjective", "formal, disapproving", "recalcitrant pupil | recalcitrant member", "Refusing to obey.");
  D("rectitude", "noun", "formal, approving", "moral rectitude | with rectitude", "Uncountable.");
  D("redundant", "adjective", "", "redundant words | made redundant", "British: 'made redundant' = lost a job because it is no longer needed.");
  D("relinquish", "verb", "formal", "relinquish control | relinquish power | relinquish a claim", "relinquish something TO someone.");
  D("remorse", "noun", "", "feel remorse | show remorse | remorse for", "remorse FOR something. Adjective: remorseful.");
  D("repudiate", "verb", "formal", "repudiate claims | repudiate a treaty", "Reject strongly.");
  D("resilient", "adjective", "approving", "resilient economy | resilient people", "Noun: resilience.");
  D("reticent", "adjective", "", "reticent about | reticent to", "reticent ABOUT something. Means 'not saying much', not 'unwilling' in careful use.");
  D("reverent", "adjective", "", "reverent silence | reverent tone", "Noun: reverence. Opposite: irreverent.");

  // ---------------------------------------------------------------- S
  D("sagacious", "adjective", "formal, approving", "sagacious leader | sagacious advice", "Noun: sagacity.");
  D("sanguine", "adjective", "formal", "sanguine about | sanguine outlook", "sanguine ABOUT something. Means hopeful, though the root is 'blood'.");
  D("scrupulous", "adjective", "approving", "scrupulous honesty | scrupulous attention | scrupulous about", "Opposite: unscrupulous (without morals).");
  D("servile", "adjective", "disapproving", "servile attitude | servile obedience", "Noun: servility.");
  D("sceptical", "adjective", "", "sceptical about | sceptical of", "American spelling: skeptical. sceptical ABOUT or OF.");
  D("solicitous", "adjective", "formal", "solicitous of | solicitous about | solicitous enquiry", "Do not confuse with 'solicitor' (a lawyer).");
  D("soporific", "adjective", "formal", "soporific effect | soporific speech", "Making you sleepy.");
  D("sporadic", "adjective", "", "sporadic fighting | sporadic outbreaks | sporadic rain", "Happening now and then.");
  D("spurious", "adjective", "formal", "spurious claims | spurious argument", "False, though it looks real.");
  D("squander", "verb", "disapproving", "squander money | squander an opportunity | squander on", "squander money ON something.");
  D("stoic", "adjective, noun", "approving", "stoic acceptance | stoic silence", "Also 'stoical'. Noun: stoicism.");
  D("superfluous", "adjective", "", "superfluous details | superfluous words", "More than is needed.");
  D("surreptitious", "adjective", "", "surreptitious glance | surreptitious recording", "Usually before a noun.");
  D("sycophant", "noun", "disapproving", "surrounded by sycophants | political sycophants", "Adjective: sycophantic.");

  // ---------------------------------------------------------------- T, U
  D("taciturn", "adjective", "", "taciturn man | taciturn nature", "Quiet by nature.");
  D("tenacious", "adjective", "approving", "tenacious grip | tenacious defence | tenacious in", "Noun: tenacity.");
  D("tenuous", "adjective", "", "tenuous link | tenuous connection | tenuous hold", "Very weak or slight.");
  D("torpid", "adjective", "formal", "torpid economy | torpid state", "Noun: torpor.");
  D("tranquil", "adjective", "", "tranquil setting | tranquil waters", "Noun: tranquillity (British) / tranquility (American).");
  D("transient", "adjective, noun", "", "transient population | transient pain", "Lasting a short time.");
  D("trepidation", "noun", "formal", "with trepidation | some trepidation", "Uncountable.");
  D("trite", "adjective", "disapproving", "trite remark | trite phrase", "Used too often.");
  D("truculent", "adjective", "formal, disapproving", "truculent mood | truculent behaviour", "Aggressively defiant.");
  D("ubiquitous", "adjective", "formal", "ubiquitous mobile phones | become ubiquitous", "Noun: ubiquity.");
  D("unprecedented", "adjective", "", "unprecedented scale | unprecedented rise | on an unprecedented scale", "Fixed: 'on an unprecedented scale'.");

  // ---------------------------------------------------------------- V, W, Z
  D("vacillate", "verb", "formal", "vacillate between", "vacillate BETWEEN two choices.");
  D("venerate", "verb", "formal", "venerate the saints | widely venerated", "Noun: veneration.");
  D("veracity", "noun", "formal", "question the veracity of | veracity of the report", "Uncountable. Do not confuse with 'voracity' (great hunger).");
  D("verbose", "adjective", "disapproving", "verbose style | verbose report", "Noun: verbosity.");
  D("vigilant", "adjective", "", "remain vigilant | vigilant against", "Noun: vigilance.");
  D("vilify", "verb", "formal", "vilified by the press | vilify someone as", "Noun: vilification.");
  D("vindicate", "verb", "", "vindicate a decision | feel vindicated | be vindicated", "Noun: vindication.");
  D("virulent", "adjective", "", "virulent strain | virulent attack | virulent criticism", "For diseases, and for very hostile words.");
  D("vivacious", "adjective", "approving", "vivacious personality | vivacious smile", "Noun: vivacity.");
  D("vociferous", "adjective", "", "vociferous critic | vociferous protest | vociferous opposition", "Loud and forceful.");
  D("voracious", "adjective", "", "voracious reader | voracious appetite", "Noun: voracity.");
  D("wary", "adjective", "", "wary of | wary about", "wary OF something.");
  D("zealous", "adjective", "", "zealous in | zealous supporter", "Noun: zeal; a 'zealot' is someone too zealous (disapproving).");
  D("zenith", "noun", "formal", "at its zenith | reach its zenith", "Fixed: 'at the zenith OF'. Opposite: nadir.");

  PLAB.dict = Object.assign(PLAB.dict || {}, out);
})();
