// Checks the course content without a browser: every lesson is well formed, every board
// action is known, every reference points at something that exists, and every check has
// exactly one correct answer with explanations. Run: node tests/validate-content.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = fileURLToPath(new URL("..", import.meta.url));
const html = readFileSync(root + "index.html", "utf8");
const scripts = [...html.matchAll(/<script src="(content\/[^"]+)"/g)].map((m) => m[1]);

const ctx = { window: {}, console };
ctx.PLAB = ctx.window.PLAB = { lessons: {}, registerLesson: (l) => (ctx.PLAB.lessons[l.id] = l) };
vm.createContext(ctx);
for (const src of scripts) vm.runInContext(readFileSync(root + src, "utf8"), ctx, { filename: src });

const { lessons, curriculum, misconceptions } = ctx.PLAB;
const sketchSrc = readFileSync(root + "js/sketch.js", "utf8");
const SHAPES = [...sketchSrc.matchAll(/^\s{4}(\w+)(?:,|:)/gm)].map((m) => m[1]);
const ACTIONS = ["draw", "write", "highlight", "move", "erase", "wait"];
const STATUSES = ["planned", "drafted", "implemented", "tested", "complete"];
const FLAGS = ["formal", "literary", "archaic", "regional", "disputed"];
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

// Curriculum
const ids = new Set();
for (const ph of curriculum.phases)
  for (const u of ph.units)
    for (const l of u.lessons) {
      if (ids.has(l.id)) fail(`curriculum ${l.id}`, "duplicate id");
      ids.add(l.id);
      if (!STATUSES.includes(l.status)) fail(`curriculum ${l.id}`, `unknown status ${l.status}`);
      l.flags.forEach((f) => FLAGS.includes(f) || fail(`curriculum ${l.id}`, `unknown flag ${f}`));
      if (l.lessonId && !lessons[l.lessonId]) fail(`curriculum ${l.id}`, `lesson file ${l.lessonId} is not loaded`);
      if (!l.lessonId && STATUSES.indexOf(l.status) >= 2) fail(`curriculum ${l.id}`, `marked ${l.status} but has no lesson`);
    }
const unitIds = new Set(curriculum.phases.flatMap((p) => p.units.map((u) => u.id)));

// Lessons
const qids = new Set();
for (const lesson of Object.values(lessons)) {
  const at = `lesson ${lesson.id}`;
  if (!unitIds.has(lesson.unit)) fail(at, `unknown unit ${lesson.unit}`);
  const items = new Set();
  const stepIds = new Set();
  lesson.steps.forEach((step, si) => {
    const w = `${at} step ${si + 1} (${step.id})`;
    if (stepIds.has(step.id)) fail(w, "duplicate step id");
    stepIds.add(step.id);
    if (!step.title) fail(w, "missing title");
    if (!step.alt) fail(w, "missing alt text for the board");
    const actionIds = new Set();
    for (const a of step.actions) {
      if (!ACTIONS.includes(a.do)) fail(w, `unknown action ${a.do}`);
      if (a.id) actionIds.add(a.id);
      if (["draw", "write", "highlight"].includes(a.do)) {
        if (!a.id) fail(w, `${a.do} needs an id`);
        if (items.has(a.id)) fail(w, `item ${a.id} defined twice`);
        items.add(a.id);
      }
      if (a.do === "draw") checkShape(w, a);
      if (a.do === "write" && !a.text) fail(w, `write ${a.id} has no text`);
      if ((a.do === "highlight" || a.do === "move") && !items.has(a.target)) fail(w, `${a.do} target ${a.target} not drawn yet`);
      if (a.do === "highlight") {
        const t = findItem(lesson, a.target);
        if (t && !new RegExp(`(^|[^A-Za-z])${a.word}(?![A-Za-z])`).test(t.text)) fail(w, `"${a.word}" is not in "${t.text}"`);
      }
      if (a.do === "erase" && a.targets !== "all") a.targets.forEach((t) => items.has(t) || fail(w, `erase target ${t} not drawn yet`));
    }
    for (const line of step.say || []) if (line.cue && !actionIds.has(line.cue)) fail(w, `say cue ${line.cue} is not an action in this step`);
    if (step.check) checkQuestion(w, step.check);
  });
}

function findItem(lesson, id) {
  for (const s of lesson.steps) for (const a of s.actions) if (a.id === id) return a;
}

function checkShape(w, a) {
  if (!SHAPES.includes(a.shape)) fail(w, `unknown shape ${a.shape}`);
  (a.parts || []).forEach((p) => SHAPES.includes(p.shape) || fail(w, `unknown shape ${p.shape} in ${a.id}`));
}

function checkQuestion(w, q) {
  if (qids.has(q.id)) fail(w, `question id ${q.id} used twice`);
  qids.add(q.id);
  if (!["original", "past-paper"].includes(q.source)) fail(w, `question ${q.id} needs source "original" or "past-paper"`);
  if (q.source === "past-paper" && !(q.citation && (q.year || q.yearNote))) fail(w, `past-paper question ${q.id} needs a citation and a verified year (or a yearNote saying it is not confirmed)`);
  const right = q.options.filter((o) => o.correct);
  if (right.length !== 1) fail(w, `question ${q.id} must have exactly one correct option (has ${right.length})`);
  for (const o of q.options) {
    if (!o.why) fail(w, `option "${o.text}" has no explanation`);
    if (!o.correct && !misconceptions[o.misconception]) fail(w, `option "${o.text}" needs a known misconception tag`);
    for (const a of o.show || []) {
      if (!ACTIONS.includes(a.do)) fail(w, `unknown action ${a.do} in feedback drawing`);
      if (a.do === "draw") checkShape(w, a);
    }
  }
}

const count = Object.values(lessons).reduce((n, l) => n + l.steps.length, 0);
if (errors.length) {
  console.error(`Content check failed with ${errors.length} problem(s):\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log(`Content OK: ${ids.size} curriculum entries, ${Object.keys(lessons).length} lesson(s), ${count} steps, ${qids.size} checks.`);
