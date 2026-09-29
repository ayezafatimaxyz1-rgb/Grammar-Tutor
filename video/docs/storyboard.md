# Grammar Detective: Why these nouns are uncountable

Scene-by-scene storyboard. The narration column is the recorded script (see `src/script.json`, the single source of truth for audio, captions and scene order). Times are targets; the rendered video derives each scene's length from its recorded narration plus a short pad.

## Visual system

| Token | Value | Use |
|---|---|---|
| Paper | `#F6F1E7` warm off-white | background, case-file page |
| Ink | `#26262B` charcoal | text, line art |
| Error | `#C23B2E` red | wrong sentence, strike line |
| Correct | `#2E7D4F` green | corrected sentence, tick |
| 1 UNIT / MASS | `#2F5DA8` blue | bracket, label, icons |
| 2 MATERIAL | `#1E8F7E` teal | substance, swatches |
| 3 MEASURED | `#C76E1A` amber | grains, bowl, measuring marks |
| 4 ABSTRACT | `#7E3FA0` purple | fact nodes, knowledge map |
| 5 ACTIVITY / PROCESS | `#C8325F` crimson | action cards, timeline |

Recurring grammar marks:
* **Noun highlight**: the noun under discussion gets a rounded highlighter swipe in the section accent.
* **Agreement line**: a thin curved line draws from the noun that carries the number to the verb (`furniture → is`, `pieces → are`).
* **Counter chip**: a round number badge flies in and lands on the noun it counts (`2 → pieces`, `3 → rings`, `20 → grams`, `2 → bowls`, `4 → tasks`). It never lands on the uncountable noun.
* **Case-file tab**: top left, `CASE 01 · UNIT / MASS` etc., in the section accent.
* Errors appear first in red with a strike line; the correction only appears after the meaning animation has played.

## Main video (16:9, 1920 × 1080)

| # | Target | Case file | Error shown | Objects on screen | Semantic transformation | Highlighted noun | Correction / result | Narration |
|---|---|---|---|---|---|---|---|---|
| 1 | 0:00–0:19 | Hook | ✗ The furniture **are** expensive. ✗ …**much rice**? (question) | Room line drawing: chair, table, sofa, bed. Bowl of rice. | Camera pushes into the room objects, then into the bowl where individual grains become visible. No fix yet. | furniture, rice | none yet: "?" stamps | "Why is 'The furniture are expensive' wrong …" |
| 2 | 0:19–0:37 | Overview | none | Five case-file cards | Cards deal in one at a time: collection bracket, gold drop, measuring jug, knowledge map, timeline loop. Caption: *in these meanings*. | none | "uncountable → singular verb" | "In the meanings we are studying …" |
| 3 | 0:37–0:56 | 01 UNIT / MASS | ✗ The furniture **are** expensive. | Chair, table, sofa, bed, each labelled | Each object gets a count badge 1, 2 (second chair appears) . Then a blue bracket draws round all four: **FURNITURE**. Objects stay visible inside. | furniture | none yet | "First: unit or mass …" |
| 4 | 0:56–1:17 | 01 | ✗ …are | Split panel: `chairs → are` vs `furniture → is` | Label *FURNITURE = overall label, not the name of each item*. Counter chip **2** flies past *furniture* and lands on **pieces**; agreement line **pieces → are**. Four objects remain on screen throughout. | furniture, pieces | ✓ The furniture **is** expensive. ✓ Two **pieces** of furniture **are** expensive. | "Furniture is the overall label …" |
| 5 | 1:17–1:31 | 01 | none | Bags, suitcase, holdall | Bags slide together under **LUGGAGE**; then three separate with chips 1–3 on **pieces**. Quick strip: clothing (shirt + trousers), equipment (tools), crockery (plate + cup). | luggage, pieces | ✓ The luggage **is** heavy. ✓ Three pieces of luggage **are** heavy. | "The same picture helps with luggage …" |
| 6 | 1:31–1:48 | 02 MATERIAL | none | Gold pour, ring, coin, necklace | A flowing gold blob pours and forms three objects. Tag **GOLD [material]** stays on the blob, separate from the three object labels. "How much gold?" | gold | question: How **much** gold? | "Second: material …" |
| 7 | 1:48–2:05 | 02 | none | Three rings, scale | Chip **3** lands on **rings**; scale needle settles at **20 g**, chip on **grams**. Swatches: silver, wood, glass, cotton. | rings, grams, gold | three rings · twenty grams of gold | "I count three rings …" |
| 8 | 2:05–2:23 | 02 | (notes correction) | Wall of bricks | Left: individually outlined bricks with count ticks → ✓ *made of bricks*. Right: same wall rendered as continuous material texture → ✓ *made of brick*. **Both green ticks.** Banner: *Correction to the notes*. | bricks / brick | ✓ This house is made of **bricks**. ✓ This house is made of **brick**. | "There is an important correction …" |
| 9 | 2:23–2:42 | 03 MEASURED | ✗ I ate too **many rice** for lunch. | Grains, bowl | Zoom into scattered grains, then pull back: grains fill a bowl with amount marks labelled **RICE**. Red underline on *many rice*. | rice | none yet | "Third: a measured food amount …" |
| 10 | 2:42–3:03 | 03 | ✗ …many rice | Grains, two bowls, loaf, milk bottles | Sequence of three quantity lines: **much** rice (amount bar) → many **grains** of rice (chip on grains) → **two bowls** of rice (chip on bowls). Then three slices of bread, two litres of milk. | rice, grains, bowls, slices, litres | ✓ I ate too **much rice** for lunch. | "So: 'I ate too much rice' …" |
| 11 | 3:03–3:20 | 03 | none | Rice bowl, milk jug, gold scale | Three items side by side; shared label **HOW MUCH?** draws across all three. | none | overlap shown | "This food group overlaps …" |
| 12 | 3:20–3:38 | 04 ABSTRACT | ✗ He has many **knowledges** about art. | Fact cards: dates, painters, styles, colour theory | Fact cards drift in, then connect into one knowledge map (lines between nodes). Red line strikes *knowledges*. | knowledge | none yet | "Fourth: abstract …" |
| 13 | 3:38–3:58 | 04 | ✗ …knowledges | Knowledge map, advice and information bubbles | Correct sentence stays. Chips land on **pieces** (2 pieces of advice, 3 pieces of information) and on **facts** (3 facts). | knowledge, advice, information, pieces, facts | ✓ He has **a lot of knowledge** about art. | "Say, 'He has a lot of knowledge …'" |
| 14 | 3:58–4:14 | 04 | none | Knowledge map vs three bulbs | Split: **knowledge [one body]** vs **three ideas [separate items]** with chip 3 on ideas. Caption: *abstract ≠ always uncountable*. | knowledge, ideas | ✓ three ideas | "Abstract is a picture that helps us think …" |
| 15 | 4:14–4:32 | 05 ACTIVITY / PROCESS | ✗ She does many **works** every day. | Four action cards: type, plan, call, clean | Cards slide onto a line, then fuse into one continuous timeline bar labelled **WORK [activity]**. | work | none yet | "Fifth: activity or process …" |
| 16 | 4:32–4:51 | 05 | ✗ …many works | Timeline, four task cards | Correction appears. Timeline re-opens into four numbered **task** cards; chip 4 on **tasks**. Contrast: *a lot of work* ⟷ *four tasks*. | work, tasks | ✓ She does **a lot of work** every day. ✓ She completes four **tasks** every day. | "So: 'She does a lot of work …'" |
| 17 | 4:51–5:02 | 05 | none | Gallery wall, three framed paintings | Chip 3 on **works**. Label **WORKS = creations**. | works (of art) | ✓ three works of art | "But 'three works of art' is correct …" |
| 18 | 5:02–5:29 | Quiz | three prompts | Luggage / rice / advice | Each prompt shows with blank verb or quantifier, short thinking beat (progress ring), then meaning animation and answer reveal: **is**, **much**, **is**. | luggage, rice, advice | ✓ The luggage **is** heavy. ✓ I need **much** more rice. ✓ Her advice **is** useful. | "Now try three new sentences …" |
| 19 | 5:29–5:48 | Recap | none | Five mini animations | Five cards replay in order; end card **SEE THE MEANING → SEE WHAT IS COUNTED → CHOOSE THE GRAMMAR**. | none | end card | "These are the five pictures …" |

## Vertical lessons (9:16, 1080 × 1920)

Each Short is recomposed, not cropped: diagrams stack vertically (object zone top, sentence zone middle, caption zone lower third, safe margins for platform UI). Every Short has its own error, visual, correction and second example.

| Short | Hook (first second) | Beats | Correction | Second example |
|---|---|---|---|---|
| 1 UNIT / MASS | "Four objects. So why does furniture take *is*?" (✗ The furniture are expensive.) | objects counted → bracket FURNITURE → *is* → chip 2 on **pieces** → luggage | ✓ The furniture **is** expensive. | ✓ Three pieces of luggage **are** heavy. |
| 2 MATERIAL | "Is a house made of brick, or bricks? Both are correct." | gold forms three objects → 3 rings / 20 g → brick wall two ways | ✓ made of **bricks** · ✓ made of **brick** | twenty grams of gold |
| 3 MEASURED | "Thousands of grains. So why not *many rice*?" | grains → bowl amount → *much rice* → chips on grains / bowls → bread slices | ✓ I ate too **much rice** for lunch. | three slices of bread |
| 4 ABSTRACT | "Why *a lot of knowledge*, but *three ideas*?" | facts → knowledge map → correction → pieces of advice → three ideas | ✓ He has **a lot of knowledge** about art. | two pieces of advice · three ideas |
| 5 ACTIVITY / PROCESS | "Why *a lot of work*, but *four tasks*?" | actions → one timeline → correction → four task cards → three works of art | ✓ She does **a lot of work** every day. | four tasks · three works of art |

## Accuracy notes applied

* "This house is made of bricks" is shown as **correct** (individual blocks); "made of brick" is correct as the material. The notes' red cross on *bricks* is not reproduced.
* No claim that every abstract or material noun is always uncountable: *three ideas* and *three works of art* are shown as correct.
* Furniture is never described as "one object"; the four objects stay visible inside the FURNITURE bracket. The "unit means 1" diagram from the notes is not used.
* The five headings are presented as ways of picturing these examples, and scene 11 shows that MEASURED overlaps with MATERIAL.
