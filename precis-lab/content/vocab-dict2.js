/* Dictionary detail, E to L. Same format as vocab-dict.js. */
(function () {
  const out = {};
  const D = (word, pos, labels, coll, usage) => (out[word] = { pos, labels: labels ? labels.split(",").map((x) => x.trim()) : [], coll: coll ? coll.split("|").map((x) => x.trim()) : [], usage });

  // ---------------------------------------------------------------- E
  D("eccentric", "adjective, noun", "", "an eccentric old man | eccentric behaviour | a harmless eccentric", "Noun: eccentricity.");
  D("eclectic", "adjective", "formal", "eclectic mix | eclectic taste | eclectic collection", "Usually before a noun.");
  D("efficacious", "adjective", "formal", "efficacious treatment | efficacious in", "Mainly for medicines and methods. Noun: efficacy. Do not confuse with 'efficient' (no waste).");
  D("effrontery", "noun", "formal, disapproving", "have the effrontery to", "Fixed: 'have the effrontery TO do something'.");
  D("elicit", "verb", "formal", "elicit a response | elicit information | elicit from", "elicit something FROM someone. Do not confuse with 'illicit' (illegal).");
  D("eminent", "adjective", "approving", "an eminent scholar | eminent jurist", "Do not confuse with 'imminent' (about to happen) or 'immanent'.");
  D("emulate", "verb", "formal", "emulate someone's success | emulate a role model", "Takes a person or their success as object.");
  D("enervate", "verb", "formal", "enervating heat | enervating climate", "Means WEAKEN, not energize: a common mistake.");
  D("enigma", "noun", "", "remain an enigma | a bit of an enigma | wrapped in an enigma", "Adjective: enigmatic.");
  D("enthrall", "verb", "", "be enthralled by | enthralling story", "British spelling: enthral. Often passive: 'enthralled by the story'.");
  D("ephemeral", "adjective", "formal", "ephemeral fame | ephemeral pleasures", "Describes things that pass quickly.");
  D("equanimity", "noun", "formal, approving", "with equanimity | maintain equanimity", "Usually 'with equanimity'.");
  D("equivocal", "adjective", "formal", "an equivocal answer | equivocal evidence", "Verb: equivocate. Opposite: unequivocal.");
  D("erudite", "adjective", "formal, approving", "an erudite scholar | erudite lecture", "Noun: erudition.");
  D("esoteric", "adjective", "formal", "esoteric knowledge | esoteric subject", "Describes knowledge and subjects.");
  D("exacerbate", "verb", "formal", "exacerbate the problem | exacerbate tensions | exacerbate the crisis", "Takes a problem as object. Not for people: not 'exacerbate him'.");
  D("exasperate", "verb", "", "exasperated by | exasperated with | exasperating delay", "exasperated BY a thing, WITH a person.");
  D("exemplary", "adjective", "approving", "exemplary conduct | exemplary punishment | exemplary service", "'exemplary punishment' = a harsh punishment meant to warn others.");
  D("exonerate", "verb", "formal", "exonerate someone from | fully exonerated", "exonerate someone FROM blame.");
  D("expedient", "adjective, noun", "formal", "politically expedient | a temporary expedient", "Can suggest 'useful but not moral'.");
  D("extol", "verb", "formal", "extol the virtues of", "Fixed: 'extol the virtues OF something'. British spelling: extol; past: extolled.");

  // ---------------------------------------------------------------- F
  D("facetious", "adjective", "disapproving", "a facetious remark | facetious comment", "Used for jokes made at the wrong time.");
  D("fallacious", "adjective", "formal", "fallacious argument | fallacious reasoning", "Noun: fallacy.");
  D("fastidious", "adjective", "", "fastidious about | fastidious attention to detail", "fastidious ABOUT something. Can be approving or disapproving.");
  D("fervent", "adjective", "approving", "fervent supporter | fervent hope | fervent prayer", "Noun: fervour.");
  D("flagrant", "adjective", "disapproving", "flagrant violation | flagrant abuse | flagrant breach", "For wrongs only. Do not confuse with 'fragrant' (sweet-smelling).");
  D("frivolous", "adjective", "disapproving", "frivolous lawsuit | frivolous spending", "Noun: frivolity.");
  D("futile", "adjective", "", "futile attempt | futile effort | prove futile", "Noun: futility.");

  // ---------------------------------------------------------------- G, H
  D("garrulous", "adjective", "", "a garrulous old man | garrulous neighbour", "Talking a lot about unimportant things.");
  D("gregarious", "adjective", "", "gregarious nature | gregarious animals", "Also used of animals that live in groups.");
  D("gullible", "adjective", "disapproving", "gullible tourists | gullible public", "Noun: gullibility. Opposite: shrewd, sceptical.");
  D("hackneyed", "adjective", "disapproving", "hackneyed phrase | hackneyed theme", "Describes language and ideas.");
  D("haughty", "adjective", "disapproving", "haughty manner | haughty look", "Noun: haughtiness.");
  D("heinous", "adjective", "formal", "heinous crime | heinous act", "Mostly for crimes.");

  // ---------------------------------------------------------------- I
  D("impeccable", "adjective", "approving", "impeccable manners | impeccable record | impeccable taste", "Describes standards, records, taste.");
  D("impetuous", "adjective", "", "impetuous decision | impetuous youth", "Acting without thought; can be mildly disapproving.");
  D("implacable", "adjective", "formal", "implacable enemy | implacable opposition", "Opposite: placable (rare).");
  D("impudent", "adjective", "disapproving", "impudent child | impudent question", "Noun: impudence.");
  D("incessant", "adjective", "disapproving", "incessant rain | incessant noise | incessant demands", "Usually for something annoying.");
  D("incisive", "adjective", "approving", "incisive analysis | incisive mind | incisive comment", "Describes thinking and comment.");
  D("indigenous", "adjective", "", "indigenous people | indigenous to | indigenous species", "indigenous TO a place.");
  D("indolent", "adjective", "formal, disapproving", "indolent youth | an indolent life", "Noun: indolence.");
  D("ineffable", "adjective", "formal, literary", "ineffable joy | ineffable beauty", "Usually for good feelings.");
  D("insipid", "adjective", "disapproving", "insipid food | insipid performance", "For food and for dull things.");
  D("intrepid", "adjective", "approving", "intrepid explorer | intrepid traveller", "Usually before a noun.");
  D("intransigent", "adjective", "formal, disapproving", "intransigent attitude | remain intransigent", "Noun: intransigence.");
  D("inundate", "verb", "", "inundated with | inundated by", "Usually passive: 'inundated WITH letters'.");
  D("inveterate", "adjective", "", "inveterate liar | inveterate gambler | inveterate smoker", "Usually for a bad habit, before a noun.");
  D("irascible", "adjective", "formal", "irascible old man | irascible temper", "Easily angered.");

  // ---------------------------------------------------------------- J, L
  D("jubilant", "adjective", "", "jubilant crowds | jubilant fans", "Noun: jubilation.");
  D("judicious", "adjective", "formal, approving", "judicious use of | judicious choice", "Do not confuse with 'judicial' (of courts and judges).");
  D("laconic", "adjective", "", "laconic reply | laconic style", "Using few words; not rude like 'curt'.");
  D("languid", "adjective", "literary", "languid afternoon | languid movement", "Noun: languor.");
  D("lethargic", "adjective", "", "feel lethargic | lethargic economy", "Noun: lethargy.");
  D("lucid", "adjective", "approving", "lucid explanation | lucid writing | lucid moments", "'lucid moments' = clear-minded moments in an illness.");

  PLAB.dict = Object.assign(PLAB.dict || {}, out);
})();
