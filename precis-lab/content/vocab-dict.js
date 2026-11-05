/* Dictionary detail for every headword in Vocabulary 2, in the style of a learner's dictionary.
   D(word, part of speech, labels, collocations, usage)
     labels: formal, informal, literary, old-fashioned, approving, disapproving, technical, law, medical
             (empty when the word is neutral, everyday English)
     collocations: the words it usually goes with, separated by "|"
     usage: grammar pattern and the common mistake to avoid
   Written for this app from general dictionary knowledge; check a learner's dictionary for more. */
(function () {
  const out = {};
  const D = (word, pos, labels, coll, usage) => (out[word] = { pos, labels: labels ? labels.split(",").map((x) => x.trim()) : [], coll: coll ? coll.split("|").map((x) => x.trim()) : [], usage });

  // ---------------------------------------------------------------- everyday words
  D("alone", "adjective, adverb", "", "all alone | feel alone | leave someone alone | you alone", "Not used before a noun: say 'a lonely man', not 'an alone man'.");
  D("happy", "adjective", "", "happy with | happy about | happy to help | a happy ending", "happy WITH a result, ABOUT a situation, FOR someone: 'I am happy for you.'");
  D("sad", "adjective", "", "sad about | sad to hear | a sad day | sad news", "sad ABOUT something, sad TO + verb: 'sad to leave'.");
  D("angry", "adjective", "", "angry with someone | angry about something | angry at", "angry WITH a person, ABOUT a thing. Never 'angry on'.");
  D("afraid", "adjective", "", "afraid of | afraid to | I'm afraid that", "Not used before a noun: say 'a frightened child', not 'an afraid child'. afraid OF + noun.");
  D("big", "adjective", "informal", "a big house | a big decision | a big mistake", "In formal writing and a precis, 'large' or 'major' often reads better than 'big'.");
  D("important", "adjective", "", "important for | important to | vitally important | an important role", "important FOR a purpose, TO a person. Avoid 'very important': use crucial, vital or essential.");
  D("good", "adjective", "", "good at | good for | good to | a good deal of", "good AT a skill, good FOR health, good TO a person (kind).");
  D("bad", "adjective", "", "bad for | bad at | bad news | go bad", "bad FOR health, bad AT a skill. Comparative: worse, worst.");
  D("clear", "adjective", "", "make it clear | clear evidence | a clear explanation | clear about", "'It is clear that…' Do not write 'It is clear to that'.");
  D("difficult", "adjective", "", "difficult to + verb | find it difficult | a difficult task", "'difficult to understand', not 'difficult for understanding'.");
  D("begin", "verb", "", "begin with | begin to | begin + -ing", "Past: began; past participle: begun. 'commence' is the formal word.");
  D("show", "verb", "", "show that | show someone something | show how", "Past participle: shown. 'The report shows that…'");
  D("say", "verb", "", "say that | say something to someone | it is said that", "SAY something TO someone; TELL someone something. Not 'say me'.");
  D("use", "verb", "", "use something for | use something as | make use of", "Prefer 'use' to 'utilize' in a precis: 'utilize' only sounds bigger.");
  D("help", "verb", "", "help someone with | help someone (to) do | help out", "'help him (to) carry the box': the TO is optional.");
  D("change", "verb", "", "change into | change from … to | change for the better", "change FROM one thing TO another; turn INTO.");
  D("increase", "verb", "", "increase by | increase to | increase in | a sharp increase", "rise BY the amount (by 5%), rise TO the new level (to 12%), an increase IN prices.");
  D("strong", "adjective", "", "a strong argument | strong evidence | strong opposition | strong wind", "We say 'strong tea' and 'heavy rain', not 'strong rain'.");
  D("poor", "adjective", "", "poor in | the poor | poor health | poor quality", "'the poor' = poor people (plural).");
  D("problem", "noun", "", "solve a problem | face a problem | a problem with | a serious problem", "a problem WITH something; the solution TO a problem.");
  D("careful", "adjective", "", "careful with | careful about | careful to + verb | be careful of", "careful WITH money, careful ABOUT details.");
  D("honest", "adjective", "", "honest with someone | honest about | to be honest", "honest WITH a person, ABOUT a matter. Note the silent h: AN honest man.");
  D("brave", "adjective", "", "a brave decision | brave enough to | brave the storm", "Also a verb: 'They braved the cold.'");

  // ---------------------------------------------------------------- A
  D("abate", "verb", "formal", "the storm abated | the pain abated | show no sign of abating", "Mostly used without an object: 'The wind abated.'");
  D("aberration", "noun", "formal", "a temporary aberration | a statistical aberration | mental aberration", "Usually singular with 'a': 'The loss was an aberration.'");
  D("abhor", "verb", "formal", "abhor violence | abhor cruelty", "abhor + noun or -ing. Not used in the continuous: say 'I abhor', not 'I am abhorring'.");
  D("abstruse", "adjective", "formal", "abstruse theory | abstruse argument | abstruse subject", "Describes ideas, not people.");
  D("acrimony", "noun", "formal", "end in acrimony | bitter acrimony | without acrimony", "Uncountable: no 'an'. Adjective: acrimonious.");
  D("acumen", "noun", "formal, approving", "business acumen | political acumen | financial acumen", "Uncountable. Usually with a field before it: business acumen.");
  D("adamant", "adjective", "", "adamant that | adamant about | remain adamant", "Usually after a verb: 'He was adamant that…'");
  D("admonish", "verb", "formal", "admonish someone for | admonish someone to do", "admonish someone FOR doing something.");
  D("adulation", "noun", "formal", "receive adulation | public adulation | the adulation of fans", "Uncountable. Often used with a slight disapproval of too much praise.");
  D("affable", "adjective", "approving", "an affable manner | an affable host", "Describes people and their manner.");
  D("alacrity", "noun", "formal", "with alacrity | accept with alacrity", "Almost always in 'with alacrity'.");
  D("altruistic", "adjective", "approving", "altruistic motives | altruistic behaviour", "Noun: altruism.");
  D("ambivalent", "adjective", "", "ambivalent about | ambivalent towards | ambivalent feelings", "ambivalent ABOUT or TOWARDS something.");
  D("ameliorate", "verb", "formal", "ameliorate conditions | ameliorate the situation | ameliorate suffering", "In a precis, 'improve' is usually clearer.");
  D("amiable", "adjective", "approving", "an amiable man | amiable conversation", "Do not confuse with 'amicable' (friendly, of a settlement: an amicable divorce).");
  D("anathema", "noun", "formal", "anathema to | is anathema to someone", "Usually 'X is anathema TO someone', without 'an'.");
  D("animosity", "noun", "", "animosity towards | animosity between | personal animosity", "animosity TOWARDS a person, BETWEEN two sides.");
  D("apathy", "noun", "disapproving", "voter apathy | public apathy | apathy towards", "Uncountable. Adjective: apathetic.");
  D("appease", "verb", "often disapproving", "appease critics | appease the public | a policy of appeasement", "Often suggests giving in too much to a threat.");
  D("ardent", "adjective", "approving", "an ardent supporter | an ardent admirer | ardent love", "Usually before a noun.");
  D("articulate", "adjective, verb", "approving", "an articulate speaker | articulate an idea | articulate clearly", "As a verb: express clearly. Pronounced differently: adjective ends 'lut', verb ends 'late'.");
  D("ascetic", "adjective, noun", "formal", "an ascetic life | ascetic practices", "Do not confuse with 'aesthetic' (about beauty).");
  D("assiduous", "adjective", "formal, approving", "assiduous efforts | assiduous attention | assiduous in", "assiduous IN doing something.");
  D("assuage", "verb", "formal", "assuage fears | assuage guilt | assuage grief | assuage hunger", "Takes a feeling or need as its object.");
  D("astute", "adjective", "approving", "an astute observer | astute judgement | politically astute", "Describes people or their judgement.");
  D("audacious", "adjective", "", "an audacious plan | an audacious attempt", "Can be approving (bold) or disapproving (rude). Noun: audacity.");
  D("austere", "adjective", "", "austere conditions | an austere manner | austerity measures", "Noun: austerity (also = strict cutting of government spending).");
  D("avarice", "noun", "formal, disapproving", "greed and avarice | driven by avarice", "Uncountable. Adjective: avaricious.");

  // ---------------------------------------------------------------- B
  D("banal", "adjective", "disapproving", "banal remarks | a banal question | banal lyrics", "Noun: banality.");
  D("belligerent", "adjective", "", "a belligerent tone | belligerent nations", "Also a noun in law: 'the belligerents' = the countries at war.");
  D("benevolent", "adjective", "formal, approving", "a benevolent ruler | benevolent fund | benevolent smile", "Opposite: malevolent.");
  D("benign", "adjective", "", "a benign tumour | benign neglect | a benign climate", "In medicine: not cancerous. Opposite: malignant.");
  D("berate", "verb", "formal", "berate someone for", "berate someone FOR doing something.");
  D("bombastic", "adjective", "disapproving", "bombastic language | a bombastic speech", "Noun: bombast.");
  D("brevity", "noun", "", "for brevity | brevity of life | brevity is the soul of wit", "'for the sake of brevity' = to keep it short.");
  D("brusque", "adjective", "", "a brusque manner | a brusque reply", "Describes speech or manner.");

  // ---------------------------------------------------------------- C
  D("cajole", "verb", "", "cajole someone into | cajole someone to do", "cajole someone INTO doing something.");
  D("callous", "adjective", "disapproving", "callous disregard | a callous remark | callous indifference", "Do not confuse with 'callus' (hard skin).");
  D("candid", "adjective", "", "a candid interview | candid about | a candid view", "candid ABOUT something. Noun: candour.");
  D("capricious", "adjective", "", "capricious weather | a capricious ruler", "Noun: caprice.");
  D("castigate", "verb", "formal", "castigate someone for", "castigate someone FOR doing something.");
  D("caustic", "adjective", "", "caustic remarks | caustic wit | caustic soda", "Also chemistry: burning (caustic soda).");
  D("censure", "verb, noun", "formal", "a vote of censure | censure someone for | public censure", "Do not confuse with 'censor' (to cut parts of a book or film).");
  D("chicanery", "noun", "formal, disapproving", "political chicanery | legal chicanery", "Uncountable.");
  D("circumspect", "adjective", "formal", "circumspect about | circumspect in", "circumspect ABOUT or IN doing something.");
  D("clandestine", "adjective", "formal", "a clandestine meeting | clandestine operations", "Usually before a noun.");
  D("cogent", "adjective", "formal, approving", "a cogent argument | cogent reasons | cogent evidence", "Describes arguments and reasons, not people.");
  D("commensurate", "adjective", "formal", "commensurate with", "Always commensurate WITH: 'salary commensurate with experience'.");
  D("complacent", "adjective", "disapproving", "complacent about | grow complacent", "complacent ABOUT something. Do not confuse with 'complaisant' (willing to please).");
  D("conciliatory", "adjective", "", "a conciliatory tone | conciliatory gesture | conciliatory approach", "Verb: conciliate.");
  D("condone", "verb", "", "condone violence | condone corruption", "Usually negative: 'We do not condone…'");
  D("conspicuous", "adjective", "", "conspicuous by its absence | conspicuous consumption", "'conspicuous by one's absence' = noticed because missing.");
  D("contentious", "adjective", "", "a contentious issue | contentious debate", "Describes issues, and people who like arguing.");
  D("contrite", "adjective", "formal", "a contrite apology | contrite expression", "Noun: contrition.");
  D("copious", "adjective", "", "copious notes | copious amounts | copious rain", "Usually before a noun.");
  D("credulous", "adjective", "disapproving", "credulous public | credulous believers", "Do not confuse with 'credible' (believable).");
  D("culpable", "adjective", "law, formal", "culpable homicide | culpable negligence | held culpable", "Noun: culpability.");
  D("cursory", "adjective", "", "a cursory glance | a cursory look | cursory examination", "Usually before a noun.");
  D("cynical", "adjective", "disapproving", "cynical about | a cynical attempt", "cynical ABOUT something.");

  // ---------------------------------------------------------------- D
  D("dearth", "noun", "formal", "a dearth of", "Always 'a dearth OF something'.");
  D("debilitate", "verb", "formal", "debilitating illness | debilitating effect", "Most often as the adjective 'debilitating'.");
  D("decorum", "noun", "formal", "observe decorum | sense of decorum | with decorum", "Uncountable.");
  D("deference", "noun", "formal", "in deference to | out of deference to | show deference", "Fixed phrase: 'in deference TO someone'.");
  D("deleterious", "adjective", "formal", "deleterious effect | deleterious to", "deleterious TO health.");
  D("denounce", "verb", "", "denounce someone as | denounce violence | publicly denounce", "denounce someone AS a traitor. Noun: denunciation.");
  D("deride", "verb", "formal", "deride someone as | widely derided", "Noun: derision; adjective: derisive.");
  D("despondent", "adjective", "", "despondent about | despondent over", "despondent ABOUT or OVER something.");
  D("diffident", "adjective", "", "diffident about | a diffident manner", "Do not confuse with 'different'. Noun: diffidence.");
  D("diligent", "adjective", "approving", "diligent in | diligent student | diligent search", "diligent IN doing something. Noun: diligence.");
  D("disdain", "noun, verb", "", "disdain for | with disdain | disdain to do", "disdain FOR something; also a verb: 'disdain to answer'.");
  D("disparage", "verb", "formal", "disparage someone's work | disparaging remarks", "Adjective: disparaging.");
  D("docile", "adjective", "", "docile animal | docile workforce", "Can sound disapproving when used of people.");
  D("dogmatic", "adjective", "disapproving", "dogmatic about | dogmatic views", "Noun: dogma.");

  PLAB.dict = Object.assign(PLAB.dict || {}, out);
})();
