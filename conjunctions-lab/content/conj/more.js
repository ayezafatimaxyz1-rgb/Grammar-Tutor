/* Punctuation rules, the mistakes catalogue ("Your sentences, solved") and writing guides. Our own sentences. */
PLAB.conj = PLAB.conj || {};
PLAB.conj.punctText = `
Two full sentences joined by and, but, or, so, yet, for, nor | Put a comma before the conjunction. | He was tired, but he kept working. | He was tired but he kept working. (fine only if the sentence is very short) | There are two subjects and two verbs, so the comma shows where the first idea ends.
One subject, two verbs | No comma before and, but, or. | He sat down and read the paper. | He sat down, and read the paper. | There is only one subject, so there is nothing to separate.
Comma splice | Two full sentences must not be joined by a comma alone. | He was tired, so he slept. | He was tired, he slept. | A comma is too weak to join sentences. Add a conjunction or use a full stop or semicolon.
Subordinate clause first | Put a comma after it. | Although he was tired, he kept working. | Although he was tired he kept working. | The comma shows where the dependent part ends and the main part begins.
Subordinate clause last | Usually no comma. | He kept working although he was tired. | He kept working, although he was tired. | When the main idea comes first, the clause flows on without a break.
however, therefore, moreover, nevertheless | Use a full stop or semicolon before, and a comma after. | He was tired. However, he kept working. | He was tired, however he kept working. | These are linking adverbs, not conjunctions. A comma alone cannot join two sentences.
Lists with and | Commas between items, and before the last "and" if it helps (be consistent). | We bought rice, lentils, and flour. | We bought rice and, lentils and flour. | A comma separates items. The final comma before "and" is optional but must be used the same way throughout.
because | Usually no comma before it. | He failed because he did not study. | He failed, because he did not study. | The reason is part of the same idea. A comma is used before because only for an extra afterthought.
A clause alone is not a sentence | Do not leave a "because" or "although" part standing alone. | He was late because the road was closed. | He was late. Because the road was closed. | The second part is a fragment and has no main idea.
Correlative pairs | Both parts must be of the same grammar. | She is both clever and hard-working. | She is both clever and works hard. | Match adjective with adjective, verb with verb. This is called parallel structure.
Starting with and or but | Allowed in modern writing, but not often in formal essays. | The plan was good. However, it was costly. | The plan was good. But it was costly. | In a CSS essay prefer however, yet or nevertheless at the start of a sentence.
`;
PLAB.conj.mistakeText = `
Although he is rich, but he is unhappy. | Although he is rich, he is unhappy. | Although and but both show contrast. Use only one. | double
Because it rained, so we stayed at home. | Because it rained, we stayed at home. | Because gives the reason and so gives the result. Do not use both. | double
Though he is poor, yet he is honest. | Though he is poor, he is honest. | Though already shows the contrast. Yet is not needed. | double
He neither came nor did not call. | He neither came nor called. | Neither already has the negative. Do not add a second not. | negative
Not only he is clever but also hard-working. | Not only is he clever, but he is also hard-working. | After Not only at the start the helper verb comes first. | order
Hardly had he come than it began to rain. | Hardly had he come when it began to rain. | Hardly and scarcely go with when, not than. | pair
No sooner had he arrived when it rained. | No sooner had he arrived than it rained. | No sooner goes with than, not when. | pair
I will call you when I will arrive. | I will call you when I arrive. | After when, if, until, before, after and as soon as use the present tense for the future. | tense
If it will rain, we will stay at home. | If it rains, we will stay at home. | The if part of a real future uses the present tense. | tense
Unless you do not study, you will fail. | Unless you study, you will fail. | Unless already means if not. Do not add not. | negative
He asked me that where I was going. | He asked me where I was going. | In indirect questions you do not need that. | noun
I do not know if or not he will come. | I do not know whether or not he will come. | Use whether with or not. | noun
The reason is because he was late. | The reason is that he was late. | Reason is and because say the same thing twice. Use that. | noun
Despite he was ill, he went to work. | Although he was ill, he went to work. | Despite is a preposition and takes a noun, not a clause. Use although. | prep
In spite he was late, he came. | In spite of being late, he came. | In spite of takes a noun or an -ing form. Use although for a clause. | prep
Because of he was late, we left. | Because he was late, we left. | Because of takes a noun. Because takes a clause. | prep
Both he and she is ready. | Both he and she are ready. | Both and gives a plural subject. | agree
Neither he nor his friends is ready. | Neither he nor his friends are ready. | With neither nor and either or the verb agrees with the nearer subject. | agree
She is as tall than her sister. | She is as tall as her sister. | As needs another as, not than. | compare
He is taller as me. | He is taller than I am. | After a comparative use than. | compare
Do like I say. | Do as I say. | Like is a preposition. Before a clause use as. | manner
He studies hard so that he will pass. | He studies hard so that he can pass. | Use can or may in the present and could or would in the past after so that. | purpose
He left early so that he can catch the train. | He left early so that he could catch the train. | The main verb is in the past, so the purpose clause is too. | purpose
It was so a hot day that we stayed in. | It was such a hot day that we stayed in. | Such goes with a noun, so with an adjective alone. | result
It was such hot that we stayed in. | It was so hot that we stayed in. | There is no noun after such. Use so. | result
He came, however he left early. | He came; however, he left early. | However is a linking adverb. A comma alone cannot join sentences. | splice
He was late, therefore he missed the bus. | He was late; therefore, he missed the bus. | Therefore is not a conjunction. Use a semicolon or full stop. | splice
The more you read, more you learn. | The more you read, the more you learn. | Both parts need the. | pair
Hardly he had left when it rained. | Hardly had he left when it rained. | After hardly at the start the helper verb comes first. | order
Since I came here, I live in Lahore. | Since I came here, I have lived in Lahore. | Since needs the present perfect in the main clause. | tense
I am waiting since morning. | I have been waiting since morning. | Since for time needs the perfect tense. | tense
Wait until he will come. | Wait until he comes. | After until use the present tense. | tense
Even though he is poor but he is happy. | Even though he is poor, he is happy. | Even though shows contrast. Do not add but. | double
Not only he but also his friends was late. | Not only he but also his friends were late. | The verb agrees with the nearer subject. | agree
Besides of cricket, he plays hockey. | Besides cricket, he plays hockey. | Besides is a preposition here and takes no of. | prep
He asked if will I go. | He asked if I would go. | In indirect questions the order is subject then verb. | order
It was a difficult paper, and yet she passed it with ease and but quickly. | It was a difficult paper, yet she passed it easily. | Do not pile up conjunctions. One is enough. | double
He is poor therefore honest. | He is poor but honest. | Therefore shows result. The idea here is contrast. | meaning
He worked hard, so that he passed. | He worked hard, so he passed. | So that gives purpose. A plain result needs only so. | purpose
He is clever and so he is lazy. | He is clever but lazy. | And joins ideas that go the same way. Use but for contrast. | meaning
`;
