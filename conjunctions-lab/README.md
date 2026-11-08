# Conjunctions Lab

An interactive course in English conjunctions for the CSS English Precis and Composition paper, built like the Prepositions Lab: lessons taught on a hand-drawn board, tested, and saved as PDF notes.

- `tools/content/lessons_data.py` holds the lessons; run `python3 tools/content/lessons.py` to build `content/lessons/*.js`, the curriculum and the mistake groups.
- `content/conj/atlas.js`, `more.js`, `exam.js` hold the data-driven sections: the atlas (every conjunction), punctuation rules, the mistakes catalogue and the practice questions.
- `js/conj.js` draws those pages and the practice quizzes, and adds text-only PDF plans.
- Checks: `node tests/validate-content.mjs` and `NODE_PATH=$(npm root -g) node tests/walk-all.cjs`.
- Publish: `sh tools/deploy-pages.sh` (from this folder).
