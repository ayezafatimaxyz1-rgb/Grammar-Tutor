/* Vocabulary 2, CSS level: hard and advanced words of the kind the CSS English paper tests
   ("most similar in meaning" / "most opposite in meaning"). Written for this app; not copied
   from any past paper.
   K(word, level, meaning, example, synonyms, antonyms) adds a one-meaning word;
   KM(word, level, [[meaning, example, synonyms, antonyms], ...]) adds a word with several meanings.
   level: "S" = CSS standard, "A" = CSS advanced (GRE level).
   A word list is "word code; word code=note; ..." where the code is
     feeling: + (good) 0 (neutral) - (bad), then formality: i (informal) n (standard) f (formal) l (literary).
   Example: "subside 0f; ebb 0f=slowly, like the tide going out". */
(function () {
  const FEEL = { "+": "positive", "0": "neutral", "-": "negative" };
  const FORM = { i: "informal", n: "neutral", f: "formal", l: "literary" };
  const USE = { i: "everyday", n: "writing", f: "writing", l: "literature" };
  const parse = (s) =>
    s.split(";").map((x) => x.trim()).filter(Boolean).map((x) => {
      const [head, note = ""] = x.split("=");
      const m = head.trim().match(/^(.*\S)\s+([+0-])([inlf])$/);
      const w = m ? m[1] : head.trim();
      return { w, tone: m ? FEEL[m[2]] : "neutral", formality: m ? FORM[m[3]] : "neutral", use: m ? USE[m[3]] : "writing", note: note.trim() };
    });
  const out = [];
  const K = (word, level, sense, ex, syn, ant) => out.push({ word, level, senses: [{ sense, ex, syn: parse(syn), ant: parse(ant) }] });
  const KM = (word, level, list) => out.push({ word, level, senses: list.map(([sense, ex, syn, ant]) => ({ sense, ex, syn: parse(syn), ant: parse(ant) })) });

  // ---------------------------------------------------------------- A
  K("abate", "S", "to become less strong or severe", "The storm abated by evening.", "subside 0f; lessen 0n; diminish 0f; wane 0f=slowly fading, like the moon; ebb 0f=like the tide going out", "intensify 0f; escalate 0f; worsen 0n");
  K("aberration", "A", "a change from what is normal or expected, usually unwelcome", "The low score was an aberration in an otherwise strong year.", "anomaly 0f; deviation 0f; irregularity 0f; departure 0f", "norm 0f; rule 0n; regularity 0f");
  K("abhor", "S", "to hate something very strongly", "She abhors cruelty to animals.", "detest -f; loathe -f; despise -n; abominate -f=very formal", "adore +n; cherish +f; admire +n");
  K("abstruse", "A", "very hard to understand", "The lecture on abstruse legal theory confused the class.", "obscure -f; recondite -f=known to very few; esoteric 0f=meant for a small group of experts; complex 0n", "clear +n; lucid +f; simple 0n; plain 0n");
  K("acrimony", "A", "bitter anger and ill feeling between people", "The meeting ended in acrimony.", "bitterness -n; rancour -f; animosity -f; hostility -n", "goodwill +n; harmony +n; amity +f=friendship between groups");
  K("acumen", "A", "the ability to judge well and quickly", "Her business acumen made the firm profitable.", "shrewdness +f; insight +n; astuteness +f; judgement +n", "ineptitude -f; stupidity -n; obtuseness -f");
  K("adamant", "S", "refusing to change your mind", "He was adamant that he would not resign.", "firm 0n; unyielding 0f; resolute +f=firm in a good cause; obstinate -f=stubborn, in a bad way", "flexible +n; yielding 0f; hesitant 0n");
  K("admonish", "S", "to warn or scold someone firmly but gently", "The teacher admonished the boys for being late.", "reprimand -f; rebuke -f=sharper; caution 0n; reprove -f", "praise +n; commend +f; applaud +n");
  K("adulation", "A", "too much praise and admiration", "The singer was used to the adulation of fans.", "idolization 0f; worship 0n; flattery -n=praise that is not sincere; acclaim +f", "criticism -n; contempt -f; disdain -f");
  K("affable", "S", "friendly and easy to talk to", "The affable shopkeeper knew every customer by name.", "friendly +n; genial +f; amiable +f; cordial +f=warm but polite", "unfriendly -n; surly -f=bad-tempered and rude; aloof -f=distant, cold");
  K("alacrity", "A", "eager and quick readiness", "She accepted the offer with alacrity.", "eagerness +n; readiness +n; willingness +n; promptness +f", "reluctance -n; apathy -f; sluggishness -n");
  K("altruistic", "S", "caring about others more than yourself", "Edhi's altruistic work saved thousands.", "selfless +n; unselfish +n; philanthropic +f=giving money or help to causes; humanitarian +f", "selfish -n; egoistic -f; self-centred -n");
  K("ambivalent", "A", "having mixed feelings about something", "She felt ambivalent about moving abroad.", "uncertain 0n; undecided 0n; equivocal 0f=unclear on purpose; torn 0i", "certain 0n; decided 0n; resolute +f");
  K("ameliorate", "A", "to make a bad situation better", "New wells ameliorated the water crisis.", "improve +n; better +n; alleviate +f=make pain or a problem less; enhance +f", "worsen -n; aggravate -f; exacerbate -f");
  K("amiable", "S", "pleasant and friendly", "He was an amiable host.", "friendly +n; affable +f; good-natured +n; genial +f", "hostile -n; unfriendly -n; disagreeable -n");
  K("anathema", "A", "something that a person hates completely", "Corruption was anathema to him.", "abomination -f; bane -f=a cause of great trouble; curse -n", "blessing +n; delight +n; favourite +n");
  K("animosity", "S", "strong dislike or hatred", "There was old animosity between the two families.", "hostility -n; enmity -f; antagonism -f; rancour -f", "friendship +n; goodwill +n; amity +f");
  K("apathy", "S", "a lack of interest or concern", "Voter apathy led to a low turnout.", "indifference -n; unconcern -n; lethargy -f=no energy; passivity -f", "interest +n; enthusiasm +n; zeal +f");
  K("appease", "S", "to calm someone by giving them what they want", "The government appeased the strikers with a pay rise.", "pacify 0f; placate 0f; mollify 0f=soften someone's anger; conciliate 0f", "provoke -n; anger -n; enrage -n; antagonize -f");
  K("ardent", "S", "very eager and passionate", "He is an ardent supporter of women's education.", "passionate +n; fervent +f; zealous +f; avid +n=very keen", "apathetic -f; indifferent -n; lukewarm -n");
  K("articulate", "S", "able to express ideas clearly in words", "She is an articulate speaker.", "eloquent +f; fluent +n; lucid +f", "inarticulate -f; tongue-tied -i; incoherent -f");
  K("ascetic", "A", "living a very simple, strict life without pleasures", "The saint lived an ascetic life in a small cell.", "austere 0f; self-denying 0f; abstemious 0f=eating and drinking little; spartan 0n", "self-indulgent -n; hedonistic -f=living for pleasure; luxurious 0n");
  K("assiduous", "A", "working with great care and steady effort", "Her assiduous study paid off in the exam.", "diligent +f; industrious +f; painstaking +n; sedulous +f=very formal", "negligent -f; lazy -n; careless -n");
  K("assuage", "A", "to make a bad feeling or need less intense", "Nothing could assuage her grief.", "ease +n; relieve +n; soothe +n; allay +f=put fears or doubts to rest; mitigate 0f", "aggravate -f; intensify 0f; worsen -n");
  K("astute", "S", "clever at seeing what matters and turning it to advantage", "An astute lawyer spotted the weak point.", "shrewd +n; perceptive +f; sharp +i; perspicacious +f=very formal", "foolish -n; naive -n; obtuse -f");
  K("audacious", "S", "very bold, ready to take risks", "It was an audacious plan to cross the desert.", "bold +n; daring +n; intrepid +f; brazen -f=bold without shame", "timid -n; cautious 0n; meek 0n");
  KM("austere", "A", [
    ["strict and serious in manner", "The austere headmaster rarely smiled.", "stern -n; severe -n; strict 0n; forbidding -f", "genial +f; warm +n; lenient +f"],
    ["plain, without comfort or decoration", "They lived in an austere room with one bed.", "plain 0n; simple 0n; spartan 0n; bare 0n", "luxurious 0n; ornate 0f=heavily decorated; lavish 0f"],
  ]);
  K("avarice", "S", "extreme greed for money", "His avarice made him cheat his own brother.", "greed -n; cupidity -f; covetousness -f", "generosity +n; liberality +f; munificence +f");

  // ---------------------------------------------------------------- B
  K("banal", "A", "so ordinary that it is boring", "The speech was full of banal remarks.", "trite -f; hackneyed -f=used too often; commonplace 0n; dull -n", "original +n; fresh +n; novel +f; striking +n");
  K("belligerent", "S", "hostile and eager to fight", "The belligerent customer shouted at the staff.", "aggressive -n; hostile -n; combative -f; pugnacious -f", "peaceable +n; friendly +n; conciliatory +f");
  K("benevolent", "S", "kind and wishing to do good", "A benevolent landlord forgave the rent after the floods.", "kind +n; charitable +n; altruistic +f; humane +n", "malevolent -f; cruel -n; spiteful -n");
  K("benign", "A", "gentle and kind; (of an illness) not dangerous", "The doctor said the lump was benign.", "harmless +n; gentle +n; mild +n; kindly +n", "malignant -f=(of a tumour) cancerous; harmful -n; hostile -n");
  K("berate", "A", "to scold someone angrily", "The coach berated the players after the loss.", "scold -n; rebuke -f; upbraid -f; reprimand -f", "praise +n; commend +f; compliment +n");
  K("bombastic", "A", "using big, showy words with little meaning", "His bombastic speech impressed no one.", "pompous -n; grandiloquent -f; inflated -n; verbose -f", "plain 0n; simple 0n; restrained +f");
  K("brevity", "S", "the use of few words; shortness of time", "Brevity is the soul of a good precis.", "conciseness +n; succinctness +f; terseness 0f=can be rude", "verbosity -f; wordiness -n; prolixity -f");
  K("brusque", "A", "short and rude in manner", "Her brusque reply hurt his feelings.", "curt -n; abrupt -n; blunt 0n=honest but not gentle; terse 0f", "polite +n; courteous +f; gracious +f");

  // ---------------------------------------------------------------- C
  K("cajole", "A", "to persuade someone with flattery or gentle pressure", "She cajoled her father into buying a bicycle.", "coax 0n; wheedle -f; persuade 0n; sweet-talk 0i", "force -n; compel 0f; coerce -f");
  K("callous", "S", "not caring at all about other people's pain", "It was callous to laugh at the injured man.", "heartless -n; cruel -n; unfeeling -n; insensitive -n", "compassionate +f; kind +n; caring +n; sympathetic +n");
  K("candid", "S", "honest and direct, even when it is unwelcome", "He gave a candid account of his mistakes.", "frank +n; open +n; forthright +f; blunt 0n", "evasive -f; guarded 0n; secretive -n");
  K("capricious", "A", "changing mood or behaviour suddenly, without reason", "The capricious weather spoiled the match.", "fickle -n; unpredictable 0n; erratic -f; whimsical 0f=playfully odd", "steady +n; stable +n; consistent +n");
  K("castigate", "A", "to criticise someone severely", "The report castigated the officials for their delay.", "censure -f; rebuke -f; chastise -f; berate -f", "praise +n; commend +f; laud +f");
  K("caustic", "A", "bitterly and cruelly critical", "His caustic remarks upset the team.", "biting -n; scathing -n; sarcastic -n; cutting -n", "kind +n; mild +n; gentle +n");
  K("censure", "S", "to express strong official disapproval", "The assembly censured the minister.", "condemn -f; criticise -n; reprimand -f; denounce -f", "praise +n; approve +n; commend +f");
  K("chicanery", "A", "clever tricks and deception to get what you want", "The election was marred by chicanery.", "trickery -n; deception -n; fraud -n; subterfuge -f", "honesty +n; candour +f; probity +f");
  K("circumspect", "A", "careful to think about risks before acting", "Be circumspect about what you post online.", "cautious 0n; prudent +f; wary 0n; guarded 0n", "reckless -n; rash -n; heedless -f");
  K("clandestine", "A", "done secretly, often because it is wrong", "They held clandestine meetings at night.", "secret 0n; covert 0f; surreptitious -f; underground 0n", "open 0n; overt 0f; public 0n");
  K("cogent", "A", "clear, logical and convincing", "She made a cogent case for reform.", "convincing +n; compelling +f; persuasive +n; sound +n", "weak -n; unconvincing -n; flimsy -n");
  K("commensurate", "A", "in proportion to; matching in size or degree", "Pay should be commensurate with experience.", "proportionate 0f; corresponding 0f; equivalent 0f", "disproportionate -f; inadequate -f; unequal 0n");
  K("complacent", "S", "too satisfied with yourself to see a danger", "After the win, the team grew complacent.", "self-satisfied -n; smug -n; unconcerned 0n", "vigilant +f; anxious 0n; concerned 0n");
  K("conciliatory", "A", "meant to end anger or a quarrel", "He made a conciliatory gesture to the opposition.", "peacemaking +n; placatory 0f; appeasing 0f; pacifying 0f", "antagonistic -f; hostile -n; provocative -n");
  K("condone", "S", "to accept or forgive wrong behaviour", "The school does not condone cheating.", "excuse 0n; overlook 0n; pardon 0f; tolerate 0n", "condemn -f; censure -f; denounce -f");
  K("conspicuous", "S", "easy to notice; standing out", "He was conspicuous in his bright red coat.", "noticeable 0n; prominent 0f; obvious 0n; striking 0n", "inconspicuous 0f; hidden 0n; unnoticeable 0n");
  K("contentious", "S", "likely to cause an argument", "Dam-building is a contentious issue.", "controversial 0n; disputed 0n; debatable 0n; divisive -f", "agreed 0n; uncontroversial 0f; accepted 0n");
  K("contrite", "A", "feeling sorry for having done wrong", "The contrite boy returned the money.", "remorseful 0f; penitent 0f; repentant 0f; apologetic 0n", "unrepentant -f; impenitent -f; shameless -n");
  K("copious", "A", "plentiful, in large amounts", "She took copious notes in the lecture.", "abundant 0f; plentiful 0n; ample 0f; profuse 0f", "scarce 0n; meagre -f; sparse 0f");
  K("credulous", "A", "too ready to believe things", "Credulous buyers fell for the fake scheme.", "gullible -n; naive -n; trusting 0n", "sceptical 0f; suspicious 0n; incredulous 0f=unable to believe");
  K("culpable", "A", "deserving blame", "The court held the driver culpable.", "blameworthy -f; guilty -n; responsible 0n; liable 0f=legally responsible", "innocent +n; blameless +f; guiltless +f");
  K("cursory", "A", "hasty and not detailed", "He gave the report only a cursory glance.", "hasty 0n; superficial -f; brief 0n; perfunctory -f=done only as a duty", "thorough +n; careful +n; detailed 0n; meticulous +f");
  K("cynical", "S", "believing people act only for themselves", "Years in politics made him cynical.", "sceptical 0f; distrustful -n; suspicious -n; pessimistic -f", "trusting +n; optimistic +n; idealistic +f");

  // ---------------------------------------------------------------- D
  K("dearth", "A", "a lack or shortage of something", "There is a dearth of qualified teachers in rural areas.", "lack 0n; shortage 0n; scarcity 0f; paucity 0f", "abundance +f; plenty +n; surplus 0f=more than needed");
  K("debilitate", "A", "to make someone or something very weak", "The fever debilitated him for weeks.", "weaken -n; enfeeble -f; sap -n=drain slowly; incapacitate -f", "strengthen +n; invigorate +f; fortify +f");
  K("decorum", "A", "correct and polite behaviour", "The judge asked for decorum in court.", "propriety +f; etiquette 0f; good manners +n; dignity +n", "impropriety -f; rudeness -n; indecorum -f");
  K("deference", "A", "polite respect for someone's wishes or position", "In deference to his age, they let him speak first.", "respect +n; regard +n; esteem +f; courtesy +n", "disrespect -n; contempt -f; insolence -f");
  K("deleterious", "A", "causing harm or damage", "Smoking has deleterious effects on health.", "harmful -n; damaging -n; detrimental -f; injurious -f", "beneficial +f; harmless +n; advantageous +f");
  K("denounce", "S", "to criticise publicly and strongly", "Leaders denounced the attack.", "condemn -f; censure -f; criticise -n; decry -f", "praise +n; applaud +n; support +n");
  K("deride", "A", "to mock someone or something as worthless", "Critics derided the film as silly.", "mock -n; ridicule -n; scorn -f; sneer at -n", "praise +n; respect +n; admire +n");
  K("despondent", "A", "having lost hope and courage", "After failing again, he became despondent.", "dejected -f; hopeless -n; disheartened -n; downcast -n", "hopeful +n; optimistic +n; cheerful +n");
  K("diffident", "A", "shy and lacking confidence", "The diffident student rarely spoke in class.", "shy 0n; timid 0n; unassertive 0f; self-effacing 0f=does not draw attention to herself", "confident +n; assertive 0n; bold +n");
  K("diligent", "S", "showing steady, careful effort", "Diligent students revise every day.", "industrious +f; hard-working +n; assiduous +f; conscientious +f", "lazy -n; negligent -f; idle -n");
  K("disdain", "S", "a feeling that someone is not worth respect", "She looked at the dirty room with disdain.", "contempt -f; scorn -f; derision -f; disrespect -n", "respect +n; admiration +n; regard +n");
  K("disparage", "A", "to speak of someone as having little value", "Never disparage the work of others.", "belittle -n; denigrate -f; criticise -n; run down -i", "praise +n; extol +f; commend +f");
  K("docile", "A", "quiet and easy to control", "The docile horse let the child ride it.", "obedient 0n; compliant 0f; meek 0n; tractable 0f", "unruly -n; defiant -n; rebellious 0n; recalcitrant -f");
  K("dogmatic", "A", "stating opinions as if they cannot be questioned", "His dogmatic views ended every debate.", "opinionated -n; doctrinaire -f; rigid -n; inflexible -n", "open-minded +n; flexible +n; tolerant +n");

  // ---------------------------------------------------------------- E
  K("eccentric", "S", "unusual and a little strange in behaviour", "The eccentric professor wore two watches.", "odd 0n; peculiar 0n; quirky 0i; idiosyncratic 0f", "conventional 0f; normal 0n; ordinary 0n");
  K("eclectic", "A", "taking ideas or styles from many different sources", "Her eclectic taste in music ranged from qawwali to jazz.", "diverse 0n; varied 0n; wide-ranging 0n; heterogeneous 0f", "narrow 0n; limited 0n; uniform 0f");
  K("efficacious", "A", "producing the result that was wanted", "The new vaccine proved efficacious.", "effective +n; successful +n; potent +f; efficient +n=works without waste", "ineffective -n; useless -n; futile -f");
  K("effrontery", "A", "bold rudeness with no shame", "He had the effrontery to ask for more money.", "impudence -f; insolence -f; audacity -f=can also be bold courage; nerve -i", "respect +n; modesty +n; humility +n");
  K("elicit", "S", "to draw out a reply or reaction", "The question elicited a long silence.", "draw out 0n; evoke 0f=bring a feeling to mind; extract 0n; obtain 0f", "suppress 0f; stifle 0f");
  K("eminent", "S", "famous and respected in a field", "An eminent scientist opened the conference.", "distinguished +f; renowned +f; prominent +f; celebrated +n", "unknown 0n; obscure 0f; undistinguished -f");
  K("emulate", "S", "to try to be as good as someone you admire", "Young cricketers emulate their heroes.", "imitate 0n; follow 0n; copy 0n=can be neutral or lazy; model oneself on 0n", "ignore 0n; differ from 0n");
  K("enervate", "A", "to drain someone of energy", "The heat enervated the workers.", "exhaust -n; weaken -n; debilitate -f; sap -n", "energize +n; invigorate +f; refresh +n");
  K("enigma", "S", "a person or thing that is mysterious and hard to understand", "The ancient script remains an enigma.", "mystery 0n; puzzle 0n; riddle 0n; conundrum 0f", "certainty 0n; explanation 0n");
  K("enthrall", "A", "to hold someone's full attention with delight", "The storyteller enthralled the children.", "captivate +f; fascinate +n; enchant +n; spellbind +f", "bore -n; repel -n; disgust -n");
  K("ephemeral", "A", "lasting for a very short time", "Fame on social media is often ephemeral.", "transient 0f; fleeting 0n; short-lived 0n; evanescent 0l", "permanent 0n; lasting 0n; enduring +f; eternal 0n");
  K("equanimity", "A", "calmness, especially in a difficult situation", "She heard the bad news with equanimity.", "composure +f; calm +n; serenity +f; poise +f", "agitation -n; anxiety -n; panic -n");
  K("equivocal", "A", "unclear, often on purpose, so it can mean more than one thing", "The minister gave an equivocal answer.", "ambiguous 0f; vague 0n; evasive -f; noncommittal 0f", "clear +n; unequivocal +f; definite 0n");
  K("erudite", "A", "having or showing great learning", "The erudite scholar quoted Rumi from memory.", "learned +f; scholarly +f; well-read +n; knowledgeable +n", "ignorant -n; uneducated -n; illiterate -n");
  K("esoteric", "A", "understood only by a small group with special knowledge", "The book is full of esoteric terms.", "obscure 0f; abstruse 0f; recondite 0f; specialized 0n", "common 0n; familiar 0n; popular 0n; accessible +f");
  K("exacerbate", "S", "to make a problem worse", "Cutting trees exacerbated the floods.", "worsen -n; aggravate -f; intensify 0f; compound -f=add to a problem", "alleviate +f; ease +n; improve +n; mitigate +f");
  K("exasperate", "A", "to annoy someone greatly", "The endless delays exasperated the passengers.", "infuriate -n; irritate -n; annoy -n; vex -f", "please +n; calm +n; soothe +n");
  K("exemplary", "S", "so good that it is an example for others", "Her conduct was exemplary.", "model +n; ideal +n; admirable +n; commendable +f", "deplorable -f; disgraceful -n; poor -n");
  K("exonerate", "A", "to declare someone free from blame", "The inquiry exonerated the officer.", "acquit 0f=a court frees someone; absolve +f; clear +n; vindicate +f", "convict -n; blame -n; incriminate -f");
  K("expedient", "A", "useful for a purpose, but perhaps not fair or right", "It was expedient to delay the vote.", "convenient 0n; practical 0n; advantageous 0f; politic 0f", "inexpedient 0f; impractical -n; unwise -n");
  K("extol", "A", "to praise very highly", "Poets extol the beauty of the valley.", "praise +n; laud +f; acclaim +f; glorify +n", "criticise -n; disparage -f; denigrate -f");

  // ---------------------------------------------------------------- F
  K("facetious", "A", "joking at a time when seriousness is needed", "His facetious comment angered the grieving family.", "flippant -n; frivolous -n; tongue-in-cheek 0i", "serious 0n; earnest +f; solemn 0f");
  K("fallacious", "A", "based on a false idea or wrong reasoning", "The argument is fallacious.", "false -n; mistaken -n; erroneous -f; unsound -f", "valid +f; correct +n; sound +n");
  K("fastidious", "A", "very careful about detail, and hard to please", "He is fastidious about his clothes.", "meticulous 0f; fussy -i; particular 0n; finicky -i", "careless -n; slovenly -f; easygoing +n");
  K("fervent", "S", "having very strong, sincere feelings", "She is a fervent believer in education for all.", "passionate +n; ardent +f; zealous +f; earnest +f", "apathetic -f; indifferent -n; half-hearted -n");
  K("flagrant", "A", "very obvious and shocking (of something wrong)", "It was a flagrant violation of the rules.", "blatant -n; glaring -n; outrageous -n; brazen -f", "minor 0n; slight 0n; hidden 0n");
  K("frivolous", "S", "not serious; silly", "The court dismissed the frivolous case.", "trivial -f; silly -n; flippant -n; petty -n", "serious 0n; important 0n; weighty 0f");
  K("futile", "S", "having no useful result", "Their efforts to save the old tree were futile.", "useless -n; pointless -n; vain -f; fruitless -n", "fruitful +n; effective +n; worthwhile +n");

  // ---------------------------------------------------------------- G
  K("garrulous", "A", "talking too much, about small things", "The garrulous passenger talked all the way to Lahore.", "talkative 0n; loquacious 0f; chatty 0i; verbose -f=uses too many words", "taciturn 0f; reticent 0f; quiet 0n");
  K("gregarious", "S", "enjoying the company of others", "Gregarious people enjoy weddings and big gatherings.", "sociable +n; outgoing +n; convivial +f; friendly +n", "reclusive 0f; unsociable -n; introverted 0n");
  K("gullible", "S", "easily fooled", "Gullible buyers fell for the fake lottery.", "credulous -f; naive -n; trusting 0n", "sceptical 0f; shrewd +n; suspicious 0n");

  // ---------------------------------------------------------------- H
  K("hackneyed", "A", "used so often that it has lost its effect", "Avoid hackneyed phrases in your essay.", "trite -f; clichéd -n; banal -f; stale -n", "original +n; fresh +n; novel +f");
  K("haughty", "S", "proud and looking down on others", "The haughty officer ignored the villagers.", "arrogant -n; proud -n; disdainful -f; supercilious -f", "humble +n; modest +n; unassuming +f");
  K("heinous", "A", "extremely wicked (of a crime)", "Murder is a heinous crime.", "atrocious -f; monstrous -n; abominable -f; wicked -n", "admirable +n; good +n; virtuous +f");

  // ---------------------------------------------------------------- I
  K("impeccable", "S", "without any fault", "Her English is impeccable.", "flawless +n; perfect +n; faultless +f; immaculate +f=perfectly clean", "flawed -n; imperfect -n; faulty -n");
  K("impetuous", "A", "acting quickly without thinking", "His impetuous decision cost him the job.", "rash -n; impulsive -n; hasty -n; reckless -n", "cautious 0n; careful +n; circumspect +f");
  K("implacable", "A", "unable to be calmed or satisfied", "He was an implacable enemy of corruption.", "relentless 0n; unforgiving -n; inexorable 0f; intransigent -f", "forgiving +n; lenient +f; placable +f");
  K("impudent", "A", "rude and not showing respect", "The impudent child talked back to the teacher.", "insolent -f; cheeky -i; rude -n; brazen -f", "respectful +n; polite +n; courteous +f");
  K("incessant", "A", "going on without stopping (often annoying)", "The incessant rain flooded the streets.", "constant 0n; continuous 0n; unceasing 0f; relentless -n", "intermittent 0f=stopping and starting; occasional 0n; sporadic 0f");
  K("incisive", "A", "clear, sharp and direct in thinking", "The editor gave an incisive analysis.", "penetrating +f; perceptive +f; sharp +n; keen +n", "superficial -f; vague -n; muddled -n");
  K("indigenous", "S", "native to a place", "The markhor is indigenous to the mountains of Pakistan.", "native 0n; aboriginal 0f; local 0n; endemic 0f=found only there", "foreign 0n; alien 0f; imported 0n");
  K("indolent", "A", "lazy, not wanting to work", "The indolent clerk left the files untouched.", "lazy -n; idle -n; slothful -f; lethargic -f", "industrious +f; diligent +f; energetic +n");
  K("ineffable", "A", "too great to be described in words", "She felt an ineffable joy at the birth of her son.", "indescribable 0n; inexpressible 0f; unspeakable 0f=often used for bad things", "describable 0n; expressible 0f");
  K("insipid", "A", "dull, with no flavour or interest", "The food was insipid, and so was the talk.", "bland -n; tasteless -n; dull -n; vapid -f", "lively +n; spicy 0n; exciting +n; piquant +f");
  K("intrepid", "S", "fearless and adventurous", "Intrepid climbers reached the summit of K2.", "fearless +n; brave +n; bold +n; daring +n", "timid -n; cowardly -n; fearful -f");
  K("intransigent", "A", "refusing to change your view or agree", "Both sides were intransigent, so the talks failed.", "uncompromising 0f; obstinate -f; inflexible -n; obdurate -f", "flexible +n; compliant 0f; amenable +f");
  K("inundate", "A", "to flood; to overwhelm with too much", "The office was inundated with complaints.", "flood 0n; swamp 0n; overwhelm 0n; deluge 0f", "trickle 0n; drain 0n");
  K("inveterate", "A", "having a habit that cannot be changed", "He is an inveterate liar.", "habitual 0f; chronic -f; confirmed 0n; incorrigible -f", "occasional 0n; reformed +n; infrequent 0f");
  K("irascible", "A", "easily made angry", "The irascible old man shouted at the children.", "irritable -n; short-tempered -n; touchy -i; testy -n", "even-tempered +n; placid +f; calm +n");

  // ---------------------------------------------------------------- J
  K("jubilant", "S", "very happy because of a success", "Jubilant fans danced in the streets after the win.", "joyful +n; triumphant +n; exultant +f; elated +f", "dejected -f; despondent -f; sorrowful -f");
  K("judicious", "S", "showing good judgement", "A judicious use of water saves crops.", "wise +n; prudent +f; sensible +n; shrewd +n", "unwise -n; imprudent -f; rash -n");

  // ---------------------------------------------------------------- L
  K("laconic", "A", "using very few words", "His laconic reply was simply 'No.'", "terse 0f; brief 0n; concise +n; succinct +f", "verbose -f; garrulous -f; wordy -n");
  K("languid", "A", "slow and relaxed, with little energy", "They spent a languid afternoon by the river.", "lethargic -f; listless -n; sluggish -n; relaxed +n", "energetic +n; vigorous +f; lively +n");
  K("lethargic", "S", "slow and without energy", "The heat made everyone lethargic.", "sluggish -n; listless -n; drowsy 0n; torpid -f", "energetic +n; lively +n; vigorous +f");
  K("lucid", "S", "clear and easy to understand", "She gave a lucid explanation of the law.", "clear +n; coherent +f; intelligible +f; transparent +f", "confusing -n; obscure -f; muddled -n");

  PLAB.words = (PLAB.words || []).concat(out);
})();
