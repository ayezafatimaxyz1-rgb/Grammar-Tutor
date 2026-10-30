# Prepositions Lab

An interactive course in English prepositions for the CSS English Precis and Composition paper.
Lessons are taught on a teaching board that draws each explanation stroke by stroke.

This is the first prototype: the curriculum structure, the board engine, and lesson 1 (the core sense of *in*).

## Open it

No build step and no server are needed. Open `index.html` in a browser (double-click it), or serve the
folder with any static server, e.g. `npx serve prepositions-lab`.

Progress, mistakes, bookmarks and notes are saved in that browser's local storage.

## Structure

```
index.html                  page shell; lists every script in load order
css/app.css                 all styles (light and dark themes)
js/sketch.js                hand-drawn shape generator (rect, circle, arrow, person, blob, ...)
js/board.js                 the board engine: builds a lesson's drawings, renders any (step, time)
js/store.js                 saved progress, mistakes with spaced review, bookmarks, notes
js/app.js                   library, lesson player, mistake notebook
content/curriculum.js       master curriculum and coverage tracker (status per lesson)
content/misconceptions.js   the misunderstandings that wrong answers are grouped by
content/icons.js            a vocabulary of board sketches (about 220 concept pictures)
content/kit.js              builders for board layouts: picture rows, picture panels, lines, time lines
content/lessons/*.js        one file per lesson
tests/validate-content.mjs  checks lesson data without a browser
tests/e2e.cjs               walks through lesson 1 in Chromium
```

## Writing a lesson

A lesson is plain data: steps, each with board actions, explanation lines and an optional check.
Add the file to `content/lessons/`, add a `<script>` tag for it in `index.html`, and set `lessonId`
and `status` on its curriculum entry.

Board actions (canvas is 960 × 600):

| action      | what it does                                         | main fields                          |
|-------------|------------------------------------------------------|--------------------------------------|
| `draw`      | draws a shape stroke by stroke                       | `id`, `shape`, shape fields, `ink`, `fill` |
| `write`     | writes text left to right in handwriting             | `id`, `text`, `x`, `y`, `size`, `anchor` |
| `highlight` | marks a word in written text                         | `target`, `word`, `style` (`underline`, `ring`) |
| `move`      | moves a drawn item, optionally in a hop              | `target`, `by: [dx, dy]`, `arc`      |
| `erase`     | fades items out                                      | `targets: [...]` or `"all"`          |
| `wait`      | a pause                                              | `dur`                                |

Every action also takes `dur` (ms), `gap` (pause before it) and `sync: true` (start with the previous action).
Inks: `main`, `accent`, `accent2`, `muted`, `trouble`, `hi`.

Explanation lines take a `cue` (an action id): the line lights up when that action starts drawing.
In text, `**word**` marks a key term and `_text_` marks an example.

Checks: one option has `correct: true`; every wrong option names a `misconception` from
`content/misconceptions.js` and may carry `show`, a list of board actions drawn as a comparison.
Every question has `source: "original"` or `source: "past-paper"`; a past-paper question must also
carry a verified `year` and `citation`, and the content check refuses it otherwise.

## Checks

```
node tests/validate-content.mjs
node tests/e2e.cjs [screenshot-dir]       # needs Playwright with Chromium
node tests/walk-all.cjs [screenshot-dir]  # plays every step of every lesson, checks text fits and does not overlap
```

## Phase 1 video

The narrated board video is rendered offline with a free voice (Kokoro, run locally):

```
node tools/video/script.mjs script.json [lessonId ...]             # narration script from the lessons
python tools/video/narrate.py script.json audio --model kokoro-q8.onnx --voices voices.npz
node tools/video/render.cjs script.json audio out [lessonId ...]   # one 1080p mp4 per lesson
```
