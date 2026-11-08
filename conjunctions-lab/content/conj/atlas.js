/* The atlas: every conjunction with its logic. Line: word | type | group | what it does | picture | examples (separated by ;;) | be careful (optional)
   type: coord, sub, corr, adv.  All sentences are our own. */
PLAB.conj = PLAB.conj || {};
PLAB.conj.groupNames = { add: "Adding", contrast: "Contrast", choice: "Choice", reason: "Reason", result: "Result", time: "Time", condition: "Condition", purpose: "Purpose", concession: "Concession", comparison: "Comparison", place: "Place", manner: "Manner", noun: "That and whether", example: "Giving examples", emphasis: "Emphasis", sequence: "Sequence and ending", summary: "Summing up" };
PLAB.conj.typeNames = { coord: "Coordinating: joins two equal parts", sub: "Subordinating: makes one part depend on the other", corr: "Correlative pair: works in two parts", adv: "Conjunctive adverb or linker: links sentences" };
PLAB.conj.atlasText = `
and | coord | add | joins two equal things and adds one to the other | plus | He bought rice and lentils. ;; We prayed, and then we left. | Do not repeat "and" in a long chain. Use commas in a list and "and" before the last item.
but | coord | contrast | joins two ideas where the second goes against what you expect | contrast | He is poor but honest. ;; She studied hard, but she failed. | Never use "but" together with "although": say "Although he is rich, he is unhappy."
or | coord | choice | offers a choice between two | spokes | Will you have tea or coffee? ;; Hurry, or you will miss the bus. | "or" can also mean "otherwise": a warning, with a comma before it.
nor | coord | choice | adds a second negative idea. The helper verb comes before the subject | minus | He did not call, nor did he write. ;; She neither smiled nor spoke. | After "nor" the order flips: nor did he, nor can she.
for | coord | reason | gives a reason, like because, but it comes after the main idea. Formal and a little literary | reasonFor | He was tired, for he had worked all night. | "for" as a conjunction always follows a comma and cannot begin a sentence.
yet | coord | contrast | like "but", with more surprise: even so | contrast | The paper was hard, yet she passed. ;; He is rich yet very simple. | "yet" and "but" can be used together only with care. Avoid "but yet": one of the two is enough.
so | coord | result | gives the result of what came before | causeEffect | It rained, so we stayed home. ;; The road was blocked, so the bus turned back. | "so" shows result, "because" shows reason. Never write "Because it rained, so we stayed."
when | sub | time | at the moment that something happens | clock | When the bell rang, the students left. ;; I was reading when you called. | Not "when" + future: say "I will call you when I arrive", not "when I will arrive".
whenever | sub | time | every time that: at any time | calendar | Whenever it rains, the road floods. ;; Call me whenever you need help.
while | sub | time | during the time that: two things at once | span | He read the paper while she cooked. ;; While I was walking, it began to rain. | Do not mix up with the contrast use of "while": see the contrast section.
as | sub | time | at the same time, while something changes or goes on | span | As the sun rose, the fog lifted. ;; He smiled as he spoke. | "as" has four uses: time, reason, manner and comparison. The sentence shows which.
before | sub | time | earlier than another event | priorDot | Wash your hands before you eat. ;; Before the guests came, we cleaned the house. | Use the present tense after "before": before he leaves, not before he will leave.
after | sub | time | later than another event | afterDot | After the rain stopped, we went out. ;; She rested after she had finished work.
until | sub | time | up to the moment when | notUntil | Wait here until I return. ;; He worked until the sun set. | "until" and "till" mean the same. "until" is more formal.
since | sub | time | from a past time up to now | sincePoint | I have lived here since I was a child. ;; Much has changed since he left. | "since" for time needs the present perfect: has been, have lived. "since" can also give a reason: see the reason section.
once | sub | time | as soon as: after a single event | afterDot | Once the water boils, add the rice. ;; Once he understood, he never forgot.
as soon as | sub | time | at the very moment, with no delay | arrive | Call me as soon as you arrive. ;; As soon as the ceasefire began, the shelling stopped.
by the time | sub | time | not later than the moment when | onTimeDot | By the time we reached the station, the train had left. | Use the past perfect in the main part when the first event is in the past.
the moment | sub | time | the exact instant that | clock | The moment she saw him, she smiled. ;; I recognised him the moment he spoke.
because | sub | reason | gives the reason: the cause comes after the word | reasonFor | He was late because the road was closed. ;; Because it rained, the match was cancelled. | Never use "because" and "so" together. Never start a one-word answer with "because of" and then a clause.
since | sub | reason | gives a reason that the listener already knows | reasonFor | Since you are tired, you should rest. | Because "since" has a time meaning too, use "because" if the sentence could be misread.
as | sub | reason | gives a reason in a light way, usually at the start | reasonFor | As it was late, we went home. | Use "as" for reason only when the meaning is clear. Otherwise it may be confused with the time use.
seeing that | sub | reason | considering the fact that | reasonFor | Seeing that the roads are flooded, the school will stay closed. | A formal and slightly old-fashioned reason word.
now that | sub | reason | because a new situation has begun | arrive | Now that exams are over, we can relax. ;; Now that he has a car, he travels more.
inasmuch as | sub | reason | to the extent that, because (very formal) | reasonFor | The treaty is unfair inasmuch as it favours one side. | Rare and formal. Use "because" in most writing.
although | sub | concession | shows a contrast: the main idea is true even though the first idea is also true | umbrellaRain | Although he was tired, he kept working. ;; The match went on although it was raining. | One contrast word per sentence: never "although ... but".
though | sub | concession | the same as "although", but also used at the end of a sentence | umbrellaRain | Though she is young, she is wise. ;; It is hard work. I like it, though. | "though" can end a sentence in speech. "although" cannot.
even though | sub | concession | a stronger "although": it is surprising that the first part is true | umbrellaRain | Even though he was ill, he went to work. | "even though" is for a fact. "even if" is for something that may or may not happen.
whereas | sub | contrast | compares two things that are clearly different | contrast | Karachi is hot and humid, whereas Quetta is cold and dry. | Use "whereas" or "while" to set two facts side by side, not to show surprise.
while | sub | contrast | shows that two facts differ | contrast | While Ali likes cricket, his brother prefers hockey. | At the start of a sentence "while" may be read as time. Use "whereas" if you must be clear.
whilst | sub | contrast | the same as "while" in British and formal English | contrast | Whilst the plan is good, it is costly. | Used mainly in British writing and old-fashioned style.
even if | sub | concession | whether or not the thing happens | umbrella | I will go even if it rains. ;; Even if he apologises, I will not forgive him. | "even if" is about a possible thing. "even though" is about a real thing.
much as | sub | concession | although I like or want it very much | umbrellaRain | Much as I admire her, I cannot support this plan. | A formal and elegant concession.
if | sub | condition | the main idea is true only when the condition is true | keyLock | If it rains, we will stay home. ;; I would help if I could. | Do not use "will" in the "if" part of a real future: not "if it will rain".
unless | sub | condition | if not: unless means only if the condition is not true | keyLock | Unless you hurry, you will be late. | Do not add "not": "unless you do not hurry" is wrong.
provided that | sub | condition | only if: this must be true | keyLock | You may go provided that you return by nine. | "providing that" is the same. The condition is strict.
as long as | sub | condition | only if: and for as long as it stays true | span | You can stay as long as you keep quiet. | Also a time use: He waited as long as he could.
so long as | sub | condition | the same as "as long as" | span | So long as you work, you will succeed.
on condition that | sub | condition | formal: only if this is agreed | doc | They gave him the loan on condition that he repay it in a year. | A formal, legal word group.
in case | sub | condition | because something may happen: to be ready for it | umbrella | Take an umbrella in case it rains. | "in case" is about preparing. It is not the same as "if": "if it rains, take an umbrella" is about doing it only then.
supposing | sub | condition | imagine that | think | Supposing the rain continues, what shall we do? | Followed by a possibility. "suppose" is the same.
only if | sub | condition | no other condition will do | keyLock | You can win only if you practise daily. | "only if" at the start turns the order: Only if you practise can you win.
so that | sub | purpose | in order that: the purpose of the main action | target | He studies hard so that he can pass. ;; She spoke loudly so that everyone could hear. | In the past use could or would: He left early so that he could catch the train.
in order that | sub | purpose | a formal "so that" | target | The rules were changed in order that everyone might benefit. | Formal. "may or might" is used after it.
lest | sub | purpose | for fear that: so that something bad will not happen | shield | He ran lest he should be late. | Old-fashioned and literary. It already has a negative meaning, so never add "not".
for fear that | sub | purpose | because of a fear that | shield | They hid the books for fear that thieves might come. | Formal. After it use "should" or "might".
so ... that | corr | result | so much of a quality that a result follows | causeEffect | The tea was so hot that I could not drink it. | The result part uses "that". Do not forget it.
such ... that | corr | result | so strong a thing that a result follows | causeEffect | It was such a hard paper that many students failed. | "such" goes with a noun. "so" goes with an adjective or adverb.
than | sub | comparison | shows the thing compared with: after a comparative | scaleTip | Lahore is bigger than Multan. ;; He ran faster than I did. | Use "than" after a comparative, never "then". The comparison must be fair: "than that of".
as ... as | corr | comparison | shows that two things are equal | compareBars | She is as tall as her brother. | In a negative the first "as" may become "so": not so tall as.
as if | sub | comparison | in a way that seems like: used for appearance or an unreal idea | likeSim | He talks as if he knew everything. | When it is unreal, use the past subjunctive: as if he were rich.
as though | sub | comparison | the same as "as if" | likeSim | She looked as though she had seen a ghost.
the more ... the more | corr | comparison | one thing grows as the other grows | rising | The more you read, the more you learn. | Both parts use "the" and a comparative.
where | sub | place | in or to the place in which | pin | Stay where you are. ;; This is the school where I studied.
wherever | sub | place | in any place | everywhere | Wherever he goes, people welcome him. | Not "where ever" as two words.
as | sub | manner | in the way that | exact | Do as I say. ;; He did the work as he was told. | "as" gives a way. "like" is a preposition: like a doctor, not as a doctor, unless it is a real job.
how | sub | manner | the way in which | think | I do not know how he did it. | In the noun clause "how" does not need "the way".
that | sub | noun | introduces a statement as the object of a verb: he said that | speak | He said that he was ready. ;; It is clear that prices will rise. | "that" can be left out after many verbs: He said he was ready.
whether | sub | noun | introduces a yes or no question that is part of a sentence | qToA | I do not know whether he will come. ;; The question is whether we can afford it. | After a preposition use "whether": the question of whether. Not "if".
if | sub | noun | introduces an indirect yes or no question | qToA | She asked if I was ready. | "whether" is safer in formal writing and before "or not".
both ... and | corr | add | joins two things as the same weight, emphasising both | plus | He is both brave and kind. | Both parts must be of the same grammar: both in the village and in the city.
either ... or | corr | choice | one of two | spokes | You can either walk or take a bus. | The verb agrees with the nearer subject: Either he or his friends are coming.
neither ... nor | corr | choice | not one and not the other | minus | He neither smiled nor spoke. | The verb agrees with the nearer subject. Do not add another not.
not only ... but also | corr | add | one thing and then a stronger one as well | stackAdd | She is not only clever but also hard-working. | Keep the pairs parallel. After "not only" at the start of a sentence, the order flips.
whether ... or | corr | choice | two possibilities, and it does not matter which | qToA | Whether you agree or not, the decision stands.
not ... but | corr | contrast | says what it is not, then what it is | contrast | He is not lazy but tired. | The two parts after not and but must be of the same kind.
rather ... than | corr | choice | prefers the first to the second | preferTea | I would rather walk than wait. | After "would rather" use the base verb.
no sooner ... than | corr | time | the second event came at once after the first | clock | No sooner had he arrived than it began to rain. | Always "than", never "when". After "no sooner" the helper verb comes before the subject.
hardly ... when | corr | time | the second event came at once after the first | clock | Hardly had she sat down when the bell rang. | "hardly ... when" and "scarcely ... when" go together. Never "than".
scarcely ... when | corr | time | the second event came at once after the first | clock | Scarcely had he left when the phone rang. | Also "scarcely ... before".
however | adv | contrast | shows a contrast with the sentence before: but, in a different place | contrast | The plan is good. However, it is costly. | A comma follows "however". With a semicolon: The plan is good; however, it is costly. Never join two sentences with only a comma and "however".
therefore | adv | result | shows the result of what was said | causeEffect | Prices rose; therefore, demand fell. | A semicolon before and a comma after, if it joins two full sentences.
moreover | adv | add | adds a stronger or extra point | stackAdd | The idea is cheap. Moreover, it is simple. | Formal. Use it for a new and stronger point.
furthermore | adv | add | adds one more point | stackAdd | He is skilled. Furthermore, he is honest.
nevertheless | adv | contrast | in spite of that | contrast | It was risky. Nevertheless, they went ahead. | Formal. "nonetheless" means the same.
nonetheless | adv | contrast | in spite of that | contrast | The task is hard; nonetheless, it can be done.
consequently | adv | result | as a result | causeEffect | The dam burst. Consequently, the village was flooded. | Formal result word.
thus | adv | result | in this way, so | causeEffect | He worked hard; thus he succeeded. | Formal. It can also mean "in this way".
hence | adv | result | for this reason (formal) | causeEffect | The roads are poor, hence the delay. | Short and formal. No "of" after it.
accordingly | adv | result | in a way that suits what was said | causeEffect | The rules changed, and we acted accordingly.
meanwhile | adv | time | at the same time, in another place | span | The men cooked. Meanwhile, the women set the table.
otherwise | adv | condition | if not: or else | keyLock | Leave now. Otherwise, you will be late. | "otherwise" is a warning. It does not join with a comma only.
instead | adv | contrast | in place of that | swap | He did not go out. Instead, he stayed and read. | "instead" is an adverb; "instead of" is a preposition. Do not mix them.
besides | adv | add | also, and in addition (a lighter extra point) | addMore | It is too late. Besides, I am tired. | "beside" means next to. "besides" means also.
also | adv | add | too: another point | addMore | He studies law. He also writes poetry. | "also" usually goes before the verb. To start a formal sentence, write "In addition" instead.
likewise | adv | add | in the same way | likenTo | He voted. Likewise, his brother cast his vote.
similarly | adv | add | in a like way | likenTo | The north was hit by floods. Similarly, the south suffered.
in addition | adv | add | and also: a formal extra point | addMore | In addition, the school needs a library.
on the other hand | adv | contrast | the other side of the question | contrast | Cars are fast. On the other hand, they pollute. | Use it for two sides of one question. It is not a simple "but".
in contrast | adv | contrast | sets two things against each other | contrast | The north is dry. In contrast, the south is wet.
on the contrary | adv | contrast | the opposite is true | contrast | He is not lazy. On the contrary, he works day and night. | It denies the earlier statement.
for example | adv | example | introduces one example | giveTo | Many crops grow here. For example, rice and wheat. | "for instance" means the same. "such as" is not a sentence opener.
for instance | adv | example | introduces one example | giveTo | Some countries, for instance Japan, have no oil.
in fact | adv | emphasis | the truth is even stronger or different | exact | He is not poor. In fact, he is rich.
indeed | adv | emphasis | really, truly | exact | It was cold; indeed, it was freezing.
as a result | adv | result | because of this | causeEffect | The crops failed. As a result, prices rose. | "as a result of" is a preposition group followed by a noun.
then | adv | sequence | after that, next | timeline | First wash the rice. Then boil it. | "then" is not a conjunction. Do not join with a comma only: Wash it, then boil it is only fine in speech.
still | adv | contrast | in spite of that | contrast | It is late. Still, we should try.
afterwards | adv | sequence | later, after that | afterDot | We ate. Afterwards, we walked.
finally | adv | sequence | at last, the last point | finally | Finally, add the salt.
firstly | adv | sequence | the first point | timeline | Firstly, the plan is cheap.
in conclusion | adv | summary | to end, the last word | conclusion | In conclusion, education is the key to progress.
in short | adv | summary | to say it briefly | longToShort | In short, the plan failed.
in other words | adv | summary | to say the same thing in a clearer way | translate | He is frugal. In other words, he is careful with money.
that is | adv | summary | to explain exactly | translate | He is a bachelor, that is, he is unmarried.
namely | adv | example | to name the exact items | giveTo | Three provinces, namely Punjab, Sindh and Balochistan, agreed.
above all | adv | emphasis | the most important point | star | Above all, be honest.
`;
