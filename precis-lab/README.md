# Precis Lab

A separate app for the precis part of the CSS English paper, built on the same hand-drawn
teaching board as Prepositions Lab: every idea drawn step by step, checks that lock Next,
a mistake notebook, PDF notes you can share, and it works offline once installed.

## What is inside

- **Lessons** (Phase 1: vocabulary, Phase 2: choosing synonyms), from the learner's book,
  Chapters 2 and 3, explained in simple English with the book's slips corrected.
- **One word for many** (`#oneword`): a long phrase and the one word that replaces it, with a test.
- **Synonyms and antonyms, by meaning** (`#words`): type a word; each meaning is shown separately
  with its own synonyms and antonyms, tagged by feeling, formality and where it is used.

## Adding more

- Lessons: edit `tools/content/lessons_data.py`, then `python3 tools/content/lessons.py`.
- One-word entries: add lines to `content/vocab-oneword.js`.
- Words: add headwords to `content/vocab-words.js`.
- Then: `node tests/validate-content.mjs`, `NODE_PATH=$(npm root -g) node tests/walk-all.cjs`,
  `python3 tools/build-sw.py`, and `sh tools/deploy-pages.sh` to publish at `<site>/precis/`.
