/* Vocabulary 2, more CSS-level words tied to the context sections (policy, power, change, conflict).
   Same format as vocab-words-css.js. */
(function () {
  const FEEL = { "+": "positive", "0": "neutral", "-": "negative" };
  const FORM = { i: "informal", n: "neutral", f: "formal", l: "literary" };
  const USE = { i: "everyday", n: "writing", f: "writing", l: "literature" };
  const parse = (s) => s.split(";").map((x) => x.trim()).filter(Boolean).map((x) => {
    const [head, note = ""] = x.split("=");
    const m = head.trim().match(/^(.*\S)\s+([+0-])([inlf])$/);
    return { w: m ? m[1] : head.trim(), tone: m ? FEEL[m[2]] : "neutral", formality: m ? FORM[m[3]] : "neutral", use: m ? USE[m[3]] : "writing", note: note.trim() };
  });
  const out = [];
  const K = (word, level, sense, ex, syn, ant) => out.push({ word, level, senses: [{ sense, ex, syn: parse(syn), ant: parse(ant) }] });
  const KM = (word, level, list) => out.push({ word, level, senses: list.map(([sense, ex, syn, ant]) => ({ sense, ex, syn: parse(syn), ant: parse(ant) })) });

  KM("sanction", "A", [
    ["official approval or permission", "The ministry gave its sanction to the new road.", "approval +f; authorization 0f; consent 0f; endorsement +f", "veto -f; refusal -n; prohibition -f"],
    ["a penalty used to force a state to obey", "The UN imposed sanctions on the regime.", "penalty -n; embargo 0f=a ban on trade; restriction -n; punishment -n", "reward +n; incentive +f; relief +n"],
  ]);
  K("stringent", "A", "very strict and demanding", "The bank applied stringent rules for loans.", "strict 0n; rigorous 0f; severe -n; exacting 0f", "lenient +f; lax -n; flexible +n; relaxed +n");
  K("lenient", "S", "not strict; gentle in punishing", "The judge was lenient with the first-time offender.", "merciful +n; forgiving +n; tolerant +n; indulgent 0f=too gentle", "strict 0n; harsh -n; severe -n; stern -n");
  K("rampant", "A", "spreading wildly and without control (of something bad)", "Corruption was rampant in the department.", "unchecked -f; widespread 0n; uncontrolled -n; rife -f", "contained 0n; rare 0n; checked 0n");
  K("pervasive", "A", "present and spreading in every part", "A pervasive fear gripped the city.", "widespread 0n; prevalent 0f; omnipresent 0f; ubiquitous 0f", "limited 0n; rare 0n; confined 0n");
  K("prevalent", "S", "common and widespread at a time or place", "Dengue is prevalent after the rains.", "common 0n; widespread 0n; frequent 0n; rife -f", "rare 0n; uncommon 0n; exceptional 0n");
  K("burgeoning", "A", "growing and increasing fast", "The burgeoning population strained the schools.", "growing 0n; booming +n; flourishing +f; mushrooming 0n", "dwindling -n; declining -n; shrinking -n");
  K("stagnant", "A", "not growing or moving; without activity", "The economy remained stagnant for years.", "inactive -n; sluggish -n; static 0f; motionless 0n", "thriving +n; booming +n; dynamic +f; lively +n");
  K("volatile", "A", "changing quickly and unpredictably", "Oil prices remain volatile.", "unstable -n; erratic -n; unpredictable 0n; fluctuating 0f", "stable +n; steady +n; constant 0n; predictable +n");
  K("viable", "S", "able to work and succeed", "A viable business needs steady customers.", "feasible +f; workable +n; practicable 0f; realistic +n", "unworkable -n; impractical -n; unrealistic -n");
  K("feasible", "S", "possible and practical to do", "The plan is feasible if funds arrive.", "practicable 0f; achievable +n; realistic +n; possible 0n", "impracticable -f; unrealistic -n; impossible -n");
  K("pivotal", "A", "of central importance; things depend on it", "She played a pivotal role in the talks.", "crucial 0n; central 0n; critical 0n; key 0n", "minor 0n; peripheral 0f; marginal 0f; trivial -f");
  K("imminent", "S", "about to happen very soon", "With exams imminent, the library was full.", "impending 0f; approaching 0n; forthcoming 0f; near 0n", "distant 0n; remote 0n; far off 0n");
  K("inevitable", "S", "certain to happen; impossible to avoid", "After the floods, delay was inevitable.", "unavoidable 0n; inescapable 0f; certain 0n; destined 0f", "avoidable 0n; preventable 0n; uncertain 0n");
  K("detrimental", "A", "causing harm or damage", "Stress is detrimental to health.", "harmful -n; damaging -n; injurious -f; adverse -f", "beneficial +f; helpful +n; advantageous +f");
  K("alleviate", "A", "to make pain or a problem less severe", "Aid alleviated the hunger in the camps.", "ease +n; relieve +n; mitigate +f; lessen 0n", "aggravate -f; worsen -n; intensify 0f");
  K("curtail", "A", "to cut short or reduce", "Lack of funds curtailed the project.", "reduce 0n; restrict 0f; limit 0n; cut back 0i", "extend 0n; expand 0n; prolong 0f");
  K("bolster", "A", "to strengthen or support", "The win bolstered his confidence.", "strengthen +n; reinforce +f; boost +n; support +n", "weaken -n; undermine -f; erode -f");
  K("undermine", "A", "to weaken slowly, often in secret", "Rumours undermined trust in the bank.", "weaken -n; erode -f; sabotage -n; subvert -f", "strengthen +n; bolster +f; reinforce +f");
  K("foster", "A", "to encourage the growth of something", "Good schools foster talent.", "encourage +n; promote +f; nurture +f; cultivate +f", "hinder -f; suppress -f; stifle -f; discourage -n");
  K("hamper", "S", "to slow down or make difficult", "Lack of roads hampered the rescue.", "hinder -f; impede -f; obstruct -f; restrict -f", "help +n; facilitate +f; aid +f; assist +f");
  K("advocate", "A", "to publicly support a cause", "She advocates better schooling for girls.", "support +n; champion +f; promote +f; recommend 0n", "oppose -n; criticise -n; reject -n");
  K("scrutinize", "A", "to examine very carefully", "Auditors scrutinized the accounts.", "examine 0n; inspect 0n; analyse 0n; study 0n", "overlook -n; ignore -n; glance at 0n");
  K("arbitrate", "A", "to settle a dispute as a neutral judge", "A senior judge arbitrated the dispute.", "mediate +f; judge 0n; adjudicate 0f; settle 0n", "disrupt -n; inflame -f; escalate -f");
  K("concede", "S", "to admit that something is true, or give up", "He conceded defeat after the count.", "admit 0n; acknowledge 0f; yield 0f; surrender 0n", "deny 0n; refute 0f; resist 0n; contest 0f");
  K("repeal", "A", "to officially end a law", "Parliament repealed the old act.", "abolish 0f; revoke 0f; annul 0f; rescind 0f", "enact 0f; introduce 0n; pass 0n; uphold 0f");
  K("coerce", "A", "to force someone to do something by threats", "Workers were coerced into signing.", "force -n; compel 0f; pressure -n; bully -n", "persuade 0n; encourage +n; allow 0n");
  K("incite", "A", "to urge people to violence or unlawful acts", "The speech incited the crowd to riot.", "provoke -n; stir up -n; instigate -f; agitate -f", "calm +n; pacify +f; restrain 0f");
  K("quell", "A", "to put an end to a revolt or strong feeling", "Police quelled the riot.", "suppress -f; subdue 0f; crush -n; put down 0n", "incite -f; provoke -n; stir up -n");
  K("pacify", "S", "to calm someone or bring peace to a place", "The minister pacified the angry traders.", "calm +n; appease 0f; placate 0f; soothe +n", "provoke -n; anger -n; inflame -f; agitate -f");

  PLAB.words = (PLAB.words || []).concat(out);
})();
