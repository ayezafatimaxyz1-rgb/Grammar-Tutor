/* Vocabulary 2, CSS level, M to Z. Same format as vocab-words-css.js. */
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

  // ---------------------------------------------------------------- M
  K("magnanimous", "A", "generous and forgiving, especially to a rival", "The magnanimous winner praised his opponent.", "generous +n; big-hearted +n; noble +n; charitable +n", "petty -n; mean -n; vindictive -f=wanting revenge");
  K("malevolent", "A", "wishing harm to others", "The story's villain had a malevolent smile.", "malicious -f; spiteful -n; hostile -n; vindictive -f", "benevolent +f; kind +n; benign +f");
  K("malicious", "S", "intending to do harm", "He spread malicious rumours about his rival.", "spiteful -n; malevolent -f; vicious -n; hurtful -n", "kind +n; benevolent +f; well-meaning +n");
  K("meagre", "S", "small in amount and not enough", "The family lived on a meagre income.", "scanty -n; paltry -f=so small it is almost insulting; inadequate -f; sparse 0f", "ample +f; abundant +f; generous +n; plentiful +n");
  K("mellifluous", "A", "sweet and smooth to hear", "Her mellifluous voice filled the hall.", "sweet-sounding +n; melodious +f; dulcet +l; honeyed +l", "harsh -n; grating -n; discordant -f");
  K("mendacious", "A", "not telling the truth; lying", "The mendacious report hid the real losses.", "lying -n; dishonest -n; untruthful -n; deceitful -f", "truthful +n; honest +n; veracious +f");
  K("mitigate", "S", "to make something less severe", "Trees mitigate the effects of heat.", "lessen 0n; reduce 0n; alleviate +f; ease +n", "aggravate -f; worsen -n; intensify 0f; exacerbate -f");
  K("mollify", "A", "to calm someone's anger", "An apology mollified the angry customer.", "pacify 0f; placate 0f; appease 0f; soothe +n", "anger -n; provoke -n; enrage -n");
  K("morose", "A", "sad, bad-tempered and silent", "He became morose after losing his job.", "sullen -n; gloomy -n; glum -i; sombre -f", "cheerful +n; jovial +f; sunny +i");
  K("mundane", "S", "ordinary and dull; of daily life", "She was tired of mundane office work.", "ordinary 0n; routine 0n; humdrum -n; prosaic -f", "extraordinary +n; exciting +n; remarkable +n");
  K("munificent", "A", "very generous with money", "A munificent donor built the new hospital wing.", "generous +n; bountiful +f; philanthropic +f; liberal +f", "stingy -i; miserly -n; parsimonious -f");

  // ---------------------------------------------------------------- N
  K("nefarious", "A", "wicked and criminal", "The gang ran a nefarious trade in smuggled goods.", "wicked -n; villainous -n; criminal -n; iniquitous -f", "honest +n; good +n; virtuous +f; lawful 0n");
  K("negligent", "S", "failing to take proper care", "The negligent driver caused the accident.", "careless -n; remiss -f; neglectful -n; lax -n", "careful +n; diligent +f; conscientious +f");
  K("nonchalant", "A", "calm and seeming not to care", "He was nonchalant about the exam results.", "unconcerned 0n; casual 0n; indifferent -n; blasé -i=bored by too much experience", "anxious 0n; concerned 0n; worried 0n");
  K("notorious", "S", "famous for something bad", "The road is notorious for accidents.", "infamous -f; disreputable -f; ill-famed -f", "famous +n=well known, usually for good things; renowned +f; celebrated +n");

  // ---------------------------------------------------------------- O
  K("obdurate", "A", "stubbornly refusing to change", "The obdurate official would not sign the file.", "obstinate -f; stubborn -n; intransigent -f; unyielding 0f", "flexible +n; amenable +f; submissive 0f");
  K("oblivious", "S", "not aware of what is happening around you", "Oblivious to the rain, the children kept playing.", "unaware 0n; unconscious 0n; heedless 0f; unmindful 0f", "aware 0n; conscious 0n; mindful +f; alert +n");
  K("obscure", "S", "not well known, or not clear", "The poem is full of obscure references.", "unclear -n; vague -n; little-known 0n; cryptic 0f", "clear +n; famous +n; well-known 0n; obvious 0n");
  K("obsequious", "A", "too eager to please or obey", "The obsequious clerk agreed with everything the boss said.", "servile -f; sycophantic -f; fawning -n; ingratiating -f", "assertive 0n; independent +n; domineering -n");
  K("obsolete", "S", "no longer in use; out of date", "Typewriters are now obsolete.", "outdated -n; outmoded -f; antiquated -f; defunct 0f", "modern 0n; current 0n; up to date 0n; new 0n");
  K("obstinate", "S", "refusing to change, in an unreasonable way", "The obstinate child would not eat.", "stubborn -n; obdurate -f; headstrong -n; pig-headed -i", "flexible +n; compliant 0f; cooperative +n");
  K("ominous", "S", "suggesting that something bad will happen", "Ominous dark clouds gathered over the city.", "threatening -n; menacing -n; sinister -n; foreboding -f", "promising +n; auspicious +f; encouraging +n");
  K("opulent", "A", "rich and luxurious", "They lived in an opulent house in Islamabad.", "luxurious 0n; lavish 0f; sumptuous 0f; plush 0i", "humble 0n; plain 0n; poor 0n; austere 0f");
  K("ostentatious", "A", "showy, meant to impress others", "The ostentatious wedding cost millions.", "showy -n; flamboyant 0f; pretentious -n; flashy -i", "modest +n; simple 0n; understated +f; restrained +f");

  // ---------------------------------------------------------------- P
  K("palliate", "A", "to make a problem less painful without curing it", "The medicine only palliated the pain.", "ease 0n; relieve 0n; alleviate 0f; mitigate 0f", "aggravate -f; worsen -n; intensify 0f");
  K("paramount", "S", "more important than anything else", "The safety of passengers is paramount.", "supreme 0f; foremost 0f; chief 0n; overriding 0f", "minor 0n; secondary 0n; unimportant 0n");
  K("parsimonious", "A", "unwilling to spend money, to an extreme", "The parsimonious landlord never repaired the roof.", "miserly -n; stingy -i; tight-fisted -i; mean -n", "generous +n; lavish 0f; extravagant -f");
  K("partisan", "S", "strongly supporting one side, without fairness", "The newspaper's partisan reports angered readers.", "biased -n; one-sided -n; prejudiced -n; factional -f", "impartial +f; neutral +n; unbiased +n; objective +f");
  K("paucity", "A", "the presence of something in only small amounts", "There is a paucity of evidence.", "scarcity 0f; dearth 0f; lack 0n; shortage 0n", "abundance +f; plenty +n; profusion 0f");
  K("pedantic", "A", "too concerned with small rules and details", "His pedantic corrections annoyed the class.", "fussy -i; nitpicking -i; hair-splitting -n; overscrupulous -f", "relaxed +n; flexible +n; easygoing +i");
  K("penitent", "A", "feeling sorry for having done wrong", "The penitent thief returned the purse.", "remorseful 0f; contrite 0f; repentant 0f; regretful 0n", "unrepentant -f; defiant -n; shameless -n");
  K("perfidious", "A", "not loyal; betraying trust", "The perfidious ally broke the treaty.", "treacherous -n; disloyal -n; faithless -f; double-dealing -n", "loyal +n; faithful +n; trustworthy +n");
  K("perfunctory", "A", "done only because it must be, with little care", "He gave a perfunctory nod and walked away.", "cursory -f; superficial -f; hasty 0n; mechanical -n", "thorough +n; careful +n; diligent +f");
  K("pernicious", "A", "harmful in a slow or hidden way", "Corruption has a pernicious effect on society.", "harmful -n; destructive -n; insidious -f=spreading slowly and secretly; damaging -n", "beneficial +f; harmless +n; benign +f");
  K("perspicacious", "A", "quick to notice and understand things", "A perspicacious reader saw the hidden meaning.", "perceptive +f; astute +f; shrewd +n; discerning +f", "obtuse -f; dull -n; slow-witted -n");
  K("pertinent", "S", "directly relevant", "Please ask only pertinent questions.", "relevant 0n; apposite 0f; germane 0f; applicable 0n", "irrelevant -n; immaterial 0f; extraneous 0f");
  K("placate", "S", "to make someone less angry", "The manager placated the customer with a refund.", "pacify 0f; appease 0f; mollify 0f; soothe +n", "provoke -n; anger -n; incense -f");
  K("plausible", "S", "seeming reasonable or likely", "His excuse sounded plausible.", "believable 0n; credible 0f; reasonable 0n; convincing +n", "implausible -f; unlikely 0n; far-fetched -i");
  K("plethora", "A", "far more of something than is needed", "There is a plethora of apps for learning English.", "excess 0n; surplus 0f; abundance 0f; glut -n=too much, so it loses value", "dearth 0f; shortage 0n; scarcity 0f");
  K("pragmatic", "S", "dealing with things in a practical way", "We need a pragmatic solution, not a dream.", "practical +n; realistic +n; sensible +n; down-to-earth +i", "idealistic 0f; impractical -n; unrealistic -n");
  K("precarious", "S", "not safe or certain; likely to fall or fail", "The family's finances were precarious.", "unstable -n; insecure -n; risky -n; shaky -i", "safe +n; secure +n; stable +n");
  K("precocious", "A", "showing adult skills very early (of a child)", "The precocious girl solved puzzles meant for adults.", "advanced 0n; gifted +n; mature 0n", "slow 0n; backward -n=avoid: unkind; late-developing 0f");
  K("pristine", "A", "in its original, perfect condition", "The lake in the north is still pristine.", "unspoilt +n; immaculate +f; pure +n; untouched 0n", "spoilt -n; polluted -n; dirty -n");
  KM("prodigal", "A", [
    ["spending money wastefully", "The prodigal son spent his inheritance in a year.", "wasteful -n; extravagant -f; spendthrift -n; profligate -f", "thrifty +n; frugal +f; careful +n"],
    ["giving or having a lot of something (prodigal with praise)", "Nature is prodigal with beauty in the north.", "lavish 0f; generous +n; bountiful +f", "sparing 0n; mean -n"],
  ]);
  K("prolific", "S", "producing a lot of work or results", "Bano Qudsia was a prolific writer.", "productive +n; fruitful +n; fertile 0n", "unproductive -n; barren -f; infertile 0n");
  K("propensity", "A", "a natural tendency to behave in a certain way", "He has a propensity to exaggerate.", "tendency 0n; inclination 0f; proclivity 0f; penchant 0f=a liking", "aversion 0f; disinclination 0f; reluctance 0n");
  K("prosaic", "A", "plain and lacking imagination", "His prosaic report was correct but dull.", "dull -n; mundane -n; unimaginative -n; matter-of-fact 0n", "imaginative +n; poetic +n; inspired +n");
  K("prudent", "S", "careful and wise about the future", "It is prudent to save part of your salary.", "wise +n; sensible +n; judicious +f; careful +n", "imprudent -f; rash -n; reckless -n; unwise -n");
  K("pugnacious", "A", "eager to argue or fight", "The pugnacious young man argued with everyone.", "combative -f; aggressive -n; belligerent -f; quarrelsome -n", "peaceable +n; gentle +n; conciliatory +f");

  // ---------------------------------------------------------------- Q
  K("querulous", "A", "complaining in a whining way", "The querulous patient grumbled about everything.", "complaining -n; peevish -f; whining -i; petulant -f", "contented +n; uncomplaining +f; easygoing +i");
  K("quixotic", "A", "hopeful and noble, but not practical", "His quixotic plan to end poverty in a year failed.", "idealistic 0f; unrealistic -n; romantic 0n; visionary 0f", "practical +n; pragmatic +n; realistic +n");

  // ---------------------------------------------------------------- R
  K("rancour", "A", "bitter, long-lasting resentment", "He spoke of the old dispute without rancour.", "bitterness -n; resentment -n; animosity -f; spite -n", "goodwill +n; forgiveness +n; friendliness +n");
  K("recalcitrant", "A", "refusing to obey rules or authority", "The recalcitrant student ignored every warning.", "unruly -n; defiant -n; disobedient -n; refractory -f", "obedient +n; docile 0f; compliant 0f");
  K("rectitude", "A", "honest and moral behaviour", "The judge was known for her rectitude.", "integrity +n; honesty +n; uprightness +f; probity +f", "dishonesty -n; corruption -n; immorality -f");
  K("redundant", "S", "not needed; more than is necessary", "Cut redundant words from your precis.", "superfluous -f; unnecessary -n; surplus 0f; extra 0n", "necessary 0n; essential 0n; vital 0n");
  K("relinquish", "S", "to give up a power, right or claim", "The general relinquished power to civilians.", "surrender 0n; give up 0n; renounce 0f; cede 0f=hand over territory or power", "retain 0f; keep 0n; seize 0n");
  K("remorse", "S", "deep regret for a wrong you did", "He showed no remorse for the crime.", "regret 0n; contrition 0f; penitence 0f; guilt 0n", "indifference -n; shamelessness -n; satisfaction 0n");
  K("repudiate", "A", "to refuse to accept or be linked with", "She repudiated the claims made against her.", "reject 0n; deny 0n; disown 0n; renounce 0f", "accept 0n; admit 0n; acknowledge 0f");
  K("resilient", "S", "able to recover quickly from difficulty", "Flood-hit families proved resilient.", "tough +n; strong +n; hardy +n; buoyant +f=stays cheerful", "fragile -n; vulnerable -n; weak -n");
  K("reticent", "A", "not willing to say much about your thoughts or feelings", "He was reticent about his family life.", "reserved 0n; quiet 0n; taciturn 0f; uncommunicative 0f", "talkative 0n; open +n; forthcoming +n; garrulous -f");
  K("reverent", "S", "showing deep respect", "The crowd fell into a reverent silence.", "respectful +n; devout +f=religious; adoring +n; worshipful +f", "irreverent -f; disrespectful -n; mocking -n");

  // ---------------------------------------------------------------- S
  K("sagacious", "A", "wise and showing good judgement", "The sagacious elder settled the dispute.", "wise +n; shrewd +n; judicious +f; astute +f", "foolish -n; unwise -n; injudicious -f");
  K("sanguine", "A", "hopeful and cheerful, even in difficulty", "She is sanguine about her chances.", "optimistic +n; hopeful +n; confident +n; buoyant +f", "pessimistic -f; gloomy -n; despondent -f");
  K("scrupulous", "S", "very careful to be honest and correct", "A scrupulous accountant checks every rupee.", "meticulous +f; careful +n; conscientious +f; principled +f", "careless -n; unscrupulous -f=without moral principles; dishonest -n");
  K("servile", "A", "too eager to serve or please others", "His servile manner embarrassed everyone.", "obsequious -f; sycophantic -f; submissive 0f; fawning -n", "assertive 0n; independent +n; proud 0n");
  K("sceptical", "S", "not easily convinced; having doubts", "Scientists were sceptical of the claim.", "doubtful 0n; dubious 0f; distrustful -n; incredulous 0f", "convinced 0n; trusting +n; credulous -f");
  K("solicitous", "A", "caring and anxious about someone's well-being", "The nurse was solicitous of her patients.", "attentive +n; concerned +n; caring +n; considerate +n", "uncaring -n; neglectful -n; indifferent -n");
  K("soporific", "A", "making you sleepy", "The long lecture had a soporific effect.", "sleep-inducing 0n; dull -n; boring -n; somnolent 0f", "stimulating +n; invigorating +f; exciting +n");
  K("sporadic", "S", "happening only now and then", "There was sporadic firing near the border.", "occasional 0n; intermittent 0f; irregular 0n; scattered 0n", "constant 0n; continuous 0n; regular 0n; incessant -f");
  K("spurious", "A", "false, though it seems genuine", "He made spurious claims about his degree.", "false -n; fake -i; bogus -i; counterfeit -n=a copy made to deceive", "genuine +n; authentic +f; real +n");
  K("squander", "S", "to waste money, time or a chance", "Don't squander your youth.", "waste -n; fritter away -i; misuse -n; dissipate -f", "save +n; conserve +f; preserve +f");
  K("stoic", "S", "accepting pain or hardship without complaint", "The stoic farmer rebuilt after the flood.", "uncomplaining +f; patient +n; long-suffering +n; impassive 0f", "complaining -n; emotional 0n; excitable 0n");
  K("superfluous", "S", "more than is needed", "Remove superfluous details from the summary.", "unnecessary -n; redundant -f; excess 0n; surplus 0f", "necessary 0n; essential 0n; required 0n");
  K("surreptitious", "A", "done secretly so others do not notice", "He took a surreptitious look at his phone.", "secret 0n; furtive -f; stealthy -n; covert 0f", "open 0n; overt 0f; blatant -n");
  K("sycophant", "A", "a person who flatters powerful people to gain from them", "The minister was surrounded by sycophants.", "flatterer -n; toady -i; yes-man -i; bootlicker -i", "critic 0n; detractor 0f; rebel 0n");

  // ---------------------------------------------------------------- T
  K("taciturn", "A", "saying very little, by nature", "Her taciturn father rarely spoke at dinner.", "reticent 0f; quiet 0n; uncommunicative 0f; laconic 0f", "talkative 0n; garrulous -f; loquacious 0f");
  K("tenacious", "S", "holding firmly; not giving up", "Her tenacious efforts won the case.", "persistent +n; determined +n; resolute +f; dogged +n", "irresolute -f; weak -n; wavering -n");
  K("tenuous", "A", "very weak or slight", "The link between the two events is tenuous.", "weak -n; slight 0n; flimsy -n; shaky -i", "strong +n; firm +n; solid +n");
  K("torpid", "A", "slow and without energy, like something asleep", "The torpid economy needs reform.", "sluggish -n; lethargic -f; inactive -n; dormant 0f=asleep for now", "active +n; lively +n; vigorous +f");
  K("tranquil", "S", "calm and peaceful", "We spent a tranquil evening by the lake.", "calm +n; peaceful +n; serene +f; placid +f", "agitated -n; noisy -n; turbulent -f");
  K("transient", "S", "lasting only a short time", "Most pain after the operation is transient.", "temporary 0n; fleeting 0n; ephemeral 0f; passing 0n", "permanent 0n; lasting 0n; enduring +f");
  K("trepidation", "A", "fear or worry about what may happen", "She entered the exam hall with trepidation.", "apprehension -f; anxiety -n; dread -n; nervousness -n", "confidence +n; calm +n; assurance +f");
  K("trite", "S", "used so often it is no longer interesting", "'Time is money' is a trite saying.", "hackneyed -f; banal -f; clichéd -n; stale -n", "original +n; fresh +n; novel +f");
  K("truculent", "A", "eager to argue or fight; aggressively defiant", "The truculent boy refused to apologise.", "aggressive -n; belligerent -f; pugnacious -f; defiant -n", "gentle +n; cooperative +n; amiable +f");

  // ---------------------------------------------------------------- U
  K("ubiquitous", "A", "found everywhere", "Mobile phones are now ubiquitous.", "omnipresent 0f; everywhere 0n; pervasive 0f; universal 0n", "rare 0n; scarce 0n; uncommon 0n");
  K("unprecedented", "S", "never done or known before", "The floods of 2022 were unprecedented.", "unparalleled 0f; unheard of 0n; unique 0n; extraordinary 0n", "common 0n; usual 0n; normal 0n");

  // ---------------------------------------------------------------- V
  K("vacillate", "A", "to keep changing your mind", "He vacillated between law and medicine.", "waver -n; dither -i; hesitate 0n; fluctuate 0f", "decide 0n; resolve 0f; persist 0n");
  K("venerate", "A", "to respect deeply", "People venerate the Quaid as the founder of Pakistan.", "revere +f; honour +n; respect +n; esteem +f", "despise -n; scorn -f; disrespect -n");
  K("veracity", "A", "truthfulness, accuracy", "Journalists must check the veracity of their sources.", "truthfulness +n; accuracy +n; honesty +n; credibility +f", "falsehood -f; dishonesty -n; inaccuracy -n");
  K("verbose", "S", "using more words than needed", "A verbose precis loses marks.", "wordy -n; long-winded -i; prolix -f; garrulous -f=talking, not writing", "concise +n; succinct +f; terse 0f; laconic 0f");
  K("vigilant", "S", "watchful for danger", "Be vigilant at the bus station.", "watchful +n; alert +n; wary 0n; observant +n", "careless -n; negligent -f; inattentive -n");
  K("vilify", "A", "to speak about someone in a very abusive way", "The press vilified the minister.", "defame -f; disparage -f; denigrate -f; smear -n", "praise +n; commend +f; extol +f");
  K("vindicate", "A", "to show that someone was right or not guilty", "The new evidence vindicated him.", "exonerate +f; clear +n; justify +n; acquit 0f", "convict -n; blame -n; incriminate -f");
  K("virulent", "A", "very harmful and fast-spreading; bitterly hostile", "A virulent strain of the flu spread quickly.", "deadly -n; malignant -f; toxic -n; venomous -f=(of words) very hostile", "harmless +n; mild +n; benign +f");
  K("vivacious", "S", "lively and full of spirit", "The vivacious host made everyone laugh.", "lively +n; bubbly +i; spirited +n; animated +n", "dull -n; listless -n; lifeless -n");
  K("vociferous", "A", "expressing opinions loudly and forcefully", "There were vociferous protests against the tax.", "vocal 0n; loud 0n; clamorous -f; outspoken 0n", "quiet 0n; silent 0n; reticent 0f");
  K("voracious", "A", "wanting a lot of something, very eagerly", "She is a voracious reader of history.", "insatiable 0f; avid +n; eager +n; greedy -n=(of food) eats too much", "indifferent -n; uninterested -n; satisfied 0n");

  // ---------------------------------------------------------------- W, Z
  K("wary", "S", "careful because you think something may be dangerous", "Be wary of strangers offering easy jobs.", "cautious 0n; careful +n; suspicious 0n; chary 0f", "careless -n; trusting 0n; unwary -n");
  K("zealous", "S", "showing great energy for a cause", "The zealous volunteers worked through the night.", "enthusiastic +n; fervent +f; ardent +f; passionate +n", "apathetic -f; indifferent -n; half-hearted -n");
  K("zenith", "A", "the highest point of success or power", "The empire reached its zenith in the seventeenth century.", "peak 0n; summit 0n; pinnacle 0f; acme 0f", "nadir 0f=the lowest point; bottom 0n; low point 0n");

  PLAB.words = (PLAB.words || []).concat(out);
})();
