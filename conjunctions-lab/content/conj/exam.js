/* Exam lab questions. gap: sentence | correct | wrong1 | wrong2 | wrong3 | why.  join: two sentences | best conjunction | wrong1 | wrong2 | wrong3 | why. Our own questions. */
PLAB.conj = PLAB.conj || {};
PLAB.conj.gapText = `
He was very tired, ___ he kept working. | but | because | or | so | Tired and kept working go against each other: BUT shows contrast.
It rained heavily, ___ the match was cancelled. | so | but | although | or | The cancelling is the result of the rain: SO.
You must leave now, ___ you will miss the train. | or | and | but | so | A warning with a bad result: OR means otherwise.
___ he is rich, he lives simply. | Although | Because | So | Or | Rich and living simply go against each other: ALTHOUGH.
He stayed at home ___ he was ill. | because | although | so | but | Ill is the reason for staying: BECAUSE.
I will wait here ___ you come back. | until | although | unless | because | Wait up to the moment you return: UNTIL.
___ you work hard, you will fail. | Unless | If | Because | Though | Unless means if not: you will fail if you do not work hard.
Take a raincoat ___ it rains. | in case | unless | although | until | You carry it to be ready: IN CASE.
She studies day and night ___ she can win a scholarship. | so that | although | unless | whereas | Winning is her purpose: SO THAT.
He ran fast ___ he could catch the bus. | so that | because of | although | until | A purpose clause in the past uses could after SO THAT.
It was ___ a hot day that we stayed indoors. | such | so | very | too | Such goes with a noun (a hot day).
The tea was ___ hot that I could not drink it. | so | such | very | too | So goes with an adjective alone (hot).
Lahore is crowded, ___ the village is quiet. | whereas | because | so | until | Two different facts side by side: WHEREAS.
He neither smiled ___ spoke. | nor | or | and | but | NEITHER goes with NOR.
You can ___ walk or take a bus. | either | neither | both | not only | EITHER goes with OR.
She is ___ clever but also kind. | not only | either | neither | whether | NOT ONLY goes with BUT ALSO.
___ he nor his brother was present. | Neither | Either | Both | Not only | NEITHER goes with NOR.
I would rather walk ___ wait for a bus. | than | to | from | or | RATHER goes with THAN.
No sooner had he sat down ___ the phone rang. | than | when | that | as | NO SOONER goes with THAN.
Hardly had she left ___ it began to rain. | when | than | that | so | HARDLY goes with WHEN.
He is taller ___ his brother. | than | as | then | that | Use THAN after a comparative.
She is as brave ___ her father. | as | than | like | that | AS ... AS shows equality.
He speaks ___ he were the owner. | as if | like | so that | unless | AS IF shows an unreal appearance, with were.
Do ___ I told you. | as | like | than | so | AS before a clause for manner.
I do not know ___ he will come. | whether | that | so | because | WHETHER introduces a yes or no question inside a sentence.
He said ___ he was ready. | that | whether | because | so | THAT introduces a statement after said.
___ the roads were blocked, the buses stopped. | Since | Unless | Until | Whereas | SINCE gives a reason that is already known.
Wait ___ I return. | until | unless | because | although | UNTIL shows up to which time.
___ you arrive, call me. | As soon as | Although | Unless | Because | AS SOON AS shows at the moment.
The plan is cheap. ___, it is simple. | Moreover | Therefore | Although | Because | An extra point to add: MOREOVER.
The plan is good. ___, it is costly. | However | Moreover | Therefore | Because | A contrast between sentences: HOWEVER.
Prices rose; ___, demand fell. | consequently | however | although | moreover | The fall in demand is the result: CONSEQUENTLY.
He was ill. ___, he came to work. | Nevertheless | Therefore | Moreover | Because | In spite of that: NEVERTHELESS.
The road was closed. ___, we took a longer route. | As a result | In contrast | Although | Moreover | The longer route is the result of the closure.
Cars are fast. ___, they cause pollution. | On the other hand | Therefore | Besides | Since | The other side of the question: ON THE OTHER HAND.
He is not lazy. ___, he works day and night. | On the contrary | Moreover | Therefore | In case | The opposite of lazy: ON THE CONTRARY.
You may go ___ you finish your work first. | provided that | unless | although | until | A strict condition: PROVIDED THAT.
___ he apologises, I will not forgive him. | Even if | Because | So that | While | EVEN IF is about something that may happen.
He kept smiling ___ he was in great pain. | even though | so that | unless | until | EVEN THOUGH is a strong, surprising contrast with a fact.
Stay ___ you are. | where | when | although | because | WHERE gives the place.
___ the sun set, the birds returned. | As | Unless | Although | Whereas | AS here means while: at the same time.
He did not call, ___ did he write. | nor | or | and | but | After NOR the helper verb comes before the subject.
Read the question carefully ___ you answer. | before | although | unless | since | Before shows the earlier action.
He has lived here ___ he was a child. | since | for | until | while | SINCE points to a starting time in the past.
___ more you read, the more you learn. | The | A | Much | So | THE ... THE is a pair: the more ... the more.
Not ___ is he clever, but he is also kind. | only | either | both | just | After NOT ONLY at the start the verb comes first.
Whether you agree ___ not, the decision stands. | or | and | but | nor | WHETHER goes with OR.
He did it ___ he was told to. | as | like | because of | unless | AS gives the way.
`;
PLAB.conj.joinText = `
The road was blocked. The bus was late. | so | although | unless | until | The late bus is the result: join with SO.
He is poor. He is honest. | but | so | because | or | The two ideas go against each other: BUT.
You must hurry. You will miss the train. | or | but | because | so | A warning: OR.
He was ill. He went to work. | although | because | so | unless | A surprise contrast: ALTHOUGH he was ill, he went.
She was late. The bus broke down. | because | although | unless | until | The breakdown is the reason: BECAUSE.
Finish your homework. You can go out. | before | although | unless | whereas | One thing must happen first: BEFORE.
He did not study. He failed. | so | but | although | or | The failing is the result: SO.
Karachi is hot. Quetta is cold. | whereas | because | so | until | A plain difference: WHEREAS.
Ali likes cricket. His brother prefers hockey. | while | because | so | unless | Two different likes side by side: WHILE.
Take an umbrella. It may rain. | in case | although | unless | until | Be ready for what may happen: IN CASE.
She works hard. She wants to win a scholarship. | so that | although | unless | whereas | The wish is the purpose: SO THAT.
It was a hot day. We stayed indoors. | such ... that | so ... as | as ... as | not only | Such a hot day that we stayed indoors: SUCH THAT.
He is clever. He is also kind. | not only ... but also | either ... or | neither ... nor | whether ... or | Two good qualities together.
He will not help. He will not stop us. | neither ... nor | either ... or | both ... and | not only | Two negatives: NEITHER NOR.
You can pay by cash. You can pay by card. | either ... or | neither ... nor | both ... and | not only | One of two choices: EITHER OR.
He arrived. It began to rain at once. | No sooner ... than | Hardly ... than | As ... as | Rather ... than | NO SOONER goes with THAN.
The plan is good. It is costly. | however | therefore | moreover | because | A contrast between sentences: HOWEVER.
Prices rose. Demand fell. | consequently | nevertheless | whereas | although | The fall is the result: CONSEQUENTLY.
He is tired. He kept working. | nevertheless | therefore | moreover | because | In spite of that: NEVERTHELESS.
The idea is cheap. It is simple. | moreover | therefore | although | unless | An extra point: MOREOVER.
`;
