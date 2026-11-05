# The précis app: the full plan

A separate app, only for précis, next to the learner's other three apps (Bolo English for speaking, Likho English for writing, Speak Up Daily for a speaking course). Working name: **Khulasa English** (khulasa means summary). This file holds everything decided so far, so the app can be built in a new chat.

The book notes it is based on: `notes/precis-book.md` (Chapters 2 and 3, read line by line, with corrections and exercise answers).

---

## 1. Who it is for

- A learner from Pakistan, first language Urdu, English level A1 to A2 now, preparing for the CSS exam in one to two years, with about one hour a day for all study.
- Uses an iPhone: the app runs in Safari and from the Home Screen. Also opened inside the Claude app.
- Wants a strict, real teacher ("Mam"), not empty praise, and a course that takes her "from zero to hero" with the methods of her précis book, not generic AI content.

## 2. Rules from the learner (keep every one)

1. **English only** in the app: no Urdu or Roman Urdu, in simple English that fits the learner's level.
2. **Exact feedback:** say the exact mistake in the learner's own words (which word, what it did wrong), never a general rule alone.
3. **Strict and real marking**, like a CSS examiner.
4. **Fast:** short checks use the fast model, slow work runs in the background, and a status shows the seconds. Never leave the learner on "Mam took too long".
5. **Keeps working** when the learner switches apps for a moment (resume the job on return).
6. **Variety:** generated tasks, sentences and questions must not repeat the same kind every time.
7. **No dashes in prose** (the learner's style rule): write sentences without "-" or "—" as joiners.
8. **Do not copy the book's text** into the app (it is public on GitHub Pages): teach its ideas in our own words, with our own examples.
9. Pakistani context in examples (cities, issues, names), aimed at CSS topics.

## 3. Platform (the same as the other apps)

- **One HTML file**, `khulasa-english.html` in the repo `ayezafatimaxyz1-rgb/Grammar-Tutor` (branch `claude/bolo-english`), published two ways:
  - **as a Claude artifact:** the AI is `window.claude.use("sample")` (`modelTier: "quick"` for fast jobs, `"default"` for careful ones, and `sample.json` for JSON answers).
  - **as a website**, at https://ayezafatimaxyz1-rgb.github.io/Grammar-Tutor/khulasa/:
    - add an entry to `tools/build-web.mjs` and an icon to `tools/make-icons.cjs`
    - publish with `./tools/publish-web.sh`
    - on iPhone the Home Screen icon opens Safari, as for the other apps.
- **The AI on the website** uses the learner's own free Gemini key, kept only in the phone's localStorage under `bolo.gemini`, which all the apps share (same site). Never put a key in the code, and never ask the learner to send it.
- **Copy the Gemini adapter from `likho-english.html`**, which already has everything needed:
  - the newest stable Flash and Flash-Lite models (`chooseModels`, saved with `v: 2`)
  - thinking off for quick jobs, low for careful jobs, and `noThink` for copying
  - waiting and asking again when Google is busy (5xx) or says too many requests this minute (429 with retryDelay)
  - `hedged()`: the other model takes over when one is slow or fails, for example when Flash's small free daily limit is used up
  - keeping going when the learner leaves the app and comes back
  - named errors (`errText`)
- **Settings (⚙):** the level, the Gemini key (paste box, a link to aistudio.google.com/apikey, and the note that the key is shared with the other apps), Home Screen steps, and links to the other apps.
- **Storage:** localStorage on the website, and the account store inside Claude if wanted (Likho shows how).
- **Tests:** Playwright with a mock of Claude and of Gemini, like `tools/test/mock-claude.js` and `tools/test/run-likho-web.cjs`.
- **Commits** end with the session's attribution lines. No pull request unless asked.

## 4. The app's sections (tabs)

1. **Today:** the daily lesson, the "Shrink the sentence" drill and the words due for review
2. **One Word:** one word for many
3. **Words:** the Word Explorer
4. **My Words:** the word bank and review
5. Progress and tests, reached from Today (or a fifth tab)

## 5. Today

- **First day:** a 5 minute level test (word choice, one word for many, tone, shortening a sentence) to choose the starting lesson.
- **Every day (about 15 minutes):**
  1. one lesson of the course (section 6)
  2. the daily drill "Shrink the sentence" (section 7)
  3. the words due for review from My Words
- **Every week:** a short test of the week's lessons. Lessons count as learned after they are passed.
- **A streak** of days in a row.

## 6. Course 1: Words for Précis (13 lessons, in the book's order)

Every lesson has a short idea in simple English, examples (our own), 8 to 10 exercises checked at once with the exact reason when wrong, and a pass mark. Answers that can be judged on the phone are checked there first; other right answers go to the fast AI judge.

**From Chapter 2 (vocabulary):**
1. **The exact word:**
   - *solitude* (chosen, can be peaceful) vs *isolation* (unwanted) vs *loneliness* (a sad feeling)
   - one exact word can carry a phrase: *imminent* for "rapidly approaching"
   - an abstract noun can carry a clause: *financial prosperity* for "doing exceptionally well financially"
2. **One word for many:**
   - nouns for phrases: "a person who teaches" is an *educator*
   - a direct verb for a noun phrase: "is conducting an examination of" is *is reviewing*
3. **Cut what adds nothing:**
   - adverbs like *very* and *really*
   - padding: "in the final analysis" is *finally*
   - inflated words: *utilize* is just *use*; *ameliorate* is just *improve*
   - keep only essential adjectives
4. **Denotation and connotation:**
   - the literal meaning vs the feeling (*home*: where you live, and warmth and safety)
   - positive and negative pairs: *frugal* / *stingy*, *thrifty* / *stingy*, *confident* / *arrogant*
5. **Context changes meaning:**
   - *sanction* (a penalty or an approval), *cultivate* (crops or friendships), *novel* (a book or new), *reserve*
   - in medicine, *malignant* is not just *harmful*
6. **Précis linking words:** *thus, namely, henceforth, notwithstanding, in essence, in sum*.
7. **Common mistakes:**
   - a word used wrongly (*nefarious* is not just *negative*), needlessly hard words, mixed idioms
   - ignoring connotation: a peaceful protest called *riotous*
   - Pakistani habits: "the concerned party" reads as "the worried party"; say "the party concerned"
   - a hard word is only useful when it can be used correctly

**From Chapter 3 (synonyms):**

8. **Near-synonyms:** the same basic meaning, but a different tone (*said* / *exclaimed*), formality (*ask* / *inquire*) or strength (*happy* / *elated*). True synonyms are rare.
9. **Strength ladders:** annoyed, angry, furious; like, love, adore.
10. **Keep the key term:**
    - technical words stay: *hypothesis* is not *theory*, *syndrome* is not *disease*, *tort* is not *wrong*, *tensile strength* is not *durability*
    - the passage's key term stays the same every time, or the examiner thinks there are two ideas
11. **Spot the distortion:**
    - *arduous* to *long* loses the difficulty
    - *ambiguous* (two readings) to *vague* (unclear) is a different fault
    - *risk* to *gamble* adds a judgement
    - *adoration* to *liking* weakens the feeling
    - *exotic* is culturally insensitive (*distinctive* is better)
12. **Change the tone:** "The results were good" is *satisfactory* (formal), *excellent* (positive), *merely adequate* (negative) or *great* (informal). Match the passage's tone and keep it.
13. **Reporting verbs** (not in the book, but every précis needs them):
    - *states, notes* (neutral)
    - *argues, contends* (makes a case)
    - *claims* (doubtful)
    - *admits* (concedes)
    - *warns, stresses* (urgent)

**The book's errors, to teach correctly** (details in `notes/precis-book.md`):
- Its condensing example becomes longer and swaps *hypothesis* for *theory*. Shortening comes from cutting and combining, not only from swapping synonyms.
- *Utilize* is inflated, not formal. A précis is formal through no slang, no short forms and the third person.
- "An extremely intelligent individual" is not *a genius* (that exaggerates); use *a brilliant person*.
- "Overwhelming dread" is not *apprehensive* (that weakens it).
- "The drug improved the disease" is wrong: a drug *treats* a disease.
- For a learner, a learner's dictionary with example sentences is safer than a thesaurus.

**Exercise types:** replace the wordy phrase; one word for many; choose the right word for the context; pick the word that keeps the meaning, or the one that distorts it; order a strength ladder; positive or negative; formal or informal; rewrite in another tone; choose the reporting verb; shorten a sentence (for example, the book's 23 word sentence down to 14).

## 7. The daily drill: Shrink the sentence

- One sentence a day from a CSS-style passage. **Mam writes original sentences** on CSS topics, never copied from the book or newspapers, and never the same kind twice in a row.
- Levels grow from A2 (short, common words) to C1 (CSS passages).
- **The learner's task:** make it shorter, with a target number of words, keeping the meaning.
- **Mam checks every word the learner changed** against the original and says exactly when:
  - part of the meaning was lost or added
  - a word was weakened or exaggerated
  - its connotation or formality changed
  - a technical or key term was replaced or switched
  - a phrase was copied from the original
  - an opinion was added
- Then her own shorter version, and the word count.
- This is the first step of précis: a précis is many sentences shortened this way.

## 8. One Word for Many

- **Learn:** a built-in list of long phrases and their one word, grouped by topic, each with an example sentence:
  - people: "a person who cannot be corrected" is *incorrigible*
  - government and law
  - behaviour
  - CSS topics like the economy and society
- **Ask Mam:**
  - the learner types any long phrase and Mam gives the one word, with an example
  - if no single word fits, she says so honestly and gives the shortest correct phrase, never inventing a word
  - she warns about near-misses (a word that is close but wrong)
- **Practise:** replace the phrase in a sentence; the reverse (the word, then its meaning).
- Every word learned goes to My Words.

## 9. Word Explorer

The learner types a word. Mam shows its **different meanings separately**. For each meaning she lists only the **real synonyms**, strict and few, never a long loose list. For each synonym:
- **tone:** positive, neutral or negative
- **formality:** formal, neutral or informal (literary where it applies)
- **strength:** weaker, the same or stronger
- **context:** where and with which words it is used, and one example sentence
- **safe in a précis?** can it replace the word without changing the meaning?

Then, for each meaning, the **antonyms**, and the **common mistakes**. Every look-up is saved: it opens at once the next time, and the learner can save any word to My Words.

**Example: "alone"**

1. **Alone by choice (no one else is there)**

   | Synonym | Tone | Formality | Note |
   |---|---|---|---|
   | on my own | neutral | everyday | the most common in speech |
   | by myself | neutral | everyday | "I live by myself." |
   | in solitude | positive, peaceful | formal | "She wrote the book in solitude." |
   | solitary | neutral | formal | only before a noun: "a solitary walk" |

   Antonyms: together, with others, in company.

2. **Alone and unhappy (not by choice)**

   | Synonym | Tone | Formality | Note |
   |---|---|---|---|
   | lonely | negative | everyday | a sad feeling |
   | isolated | negative | neutral | cut off; also places: "an isolated village" |
   | lonesome | negative | informal | mainly American |
   | forlorn | very negative, stronger | literary | sad and left alone |

   Antonyms: connected, among friends.

3. **Alone, meaning without help**

   | Synonym | Tone | Formality | Note |
   |---|---|---|---|
   | single-handedly | positive, admiring | neutral | "She built it single-handedly." |
   | unaided | neutral | formal | "He climbed it unaided." |

   Antonyms: with help, jointly.

**Common mistakes:**
- "I am alone" only means no one is with you, while "I feel lonely" means you are sad: swapping them in a précis changes the meaning.
- You cannot say "an alone girl": say "a lone girl" or "a girl who lives alone".

**Example: "happy"** has three meanings:
- the feeling: *glad*, *content* (calm, satisfied), *delighted*, *joyful*, *elated*, *ecstatic*, from calm to very strong; antonyms *sad*, *unhappy*, *miserable*, *dejected* (formal)
- willing ("happy to help"): *glad*, *willing*, *pleased*; antonyms *reluctant*, *unwilling*
- lucky ("a happy coincidence"): *fortunate*; antonym *unfortunate*

**A JSON shape for the answer:**
```json
{"word": "alone", "say": "how to say it", "senses": [{"meaning": "without other people, by choice", "example": "...",
  "synonyms": [{"word": "in solitude", "tone": "positive", "formality": "formal", "strength": "same", "context": "...", "example": "...", "precis_safe": true}],
  "antonyms": ["together"]}], "mistakes": ["..."]}
```

## 10. My Words (the word bank)

- Every word from the lessons, the drill, One Word and the Explorer, with its meaning, synonyms, tone, an example and where it came from.
- **Review at the right time:** boxes of 1, 3, 7, 14 and 30 days. A word the learner knew moves up a box; a word she forgot goes back to the first box.
- **Review types:** the meaning; choose the right synonym for a sentence; order by strength; positive or negative; one word for a phrase.

## 11. Progress and tests

- Lessons passed, words learned, the streak, weekly test results, and the drill's score over time.

## 12. Later: Course 2 and onwards (when the next chapters arrive)

Still to send: the book's cover (title and author), the contents page, Chapter 1 (pages 1 to 10), page 21, and Chapter 4 onwards. When they come, read every line, add notes to `notes/precis-book.md`, and add lessons:
- finding the central idea and the key points in the author's order
- cutting examples, details and repetition
- the title
- one third of the length, and counting words
- own words and the third person, with no opinions
- full précis on CSS-style and past CSS passages, marked strictly like the real exam (15 marks for the précis, 5 for the title)

`likho-english.html` already has précis marking (`precisMeasure`, key points kept or missed, copied phrases, a model précis written in a second call) to reuse.

## 13. How it helps in the CSS exam

- **The précis question:** examiners cut marks for wordy sentences, a changed meaning, the wrong tone, copied phrases and opinions. Course 1 and the daily drill train exactly that.
- **The vocabulary questions** in the same English paper (synonyms, antonyms, the right use of words) use the same skills, so the Explorer and My Words help there too.
- **Essays and other papers** become shorter, clearer and more exact.

## 14. To start the new chat

Paste this:

> Build my précis app, Khulasa English, from `notes/precis-app-plan.md` in my repo `ayezafatimaxyz1-rgb/Grammar-Tutor` (branch `claude/bolo-english`). Read it all first, and `notes/precis-book.md`. Start with version 1: Today with Course 1 (the 13 lessons) and the Shrink the sentence drill, One Word for Many, the Word Explorer and My Words. Make it a website app like Likho, with its own Home Screen icon, and also a Claude artifact.
