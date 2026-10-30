// Builds the narration script for the Phase 1 video from the lesson files.
// Usage: node tools/video/script.mjs out.json [lessonId ...]   (no ids = all of Phase 1)
// Each segment is one stretch of voice with what the frame should show while it plays.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = fileURLToPath(new URL("../../", import.meta.url));
const html = readFileSync(root + "index.html", "utf8");
const scripts = [...html.matchAll(/<script src="(content\/[^"]+)"/g)].map((m) => m[1]);
const ctx = { window: {}, console };
ctx.PLAB = ctx.window.PLAB = { lessons: {}, registerLesson: (l) => (ctx.PLAB.lessons[l.id] = l) };
vm.createContext(ctx);
for (const s of scripts) vm.runInContext(readFileSync(root + s, "utf8"), ctx, { filename: s });
const { lessons, curriculum } = ctx.PLAB;

const [out, ...only] = process.argv.slice(2);
const letters = "ABCDE";
const plain = (s) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/(^|[\s(])_(.+?)_(?=[\s.,;:)!?]|$)/g, "$1$2");
const units = [];
let n = 0;

curriculum.phases[0].units.forEach((u, ui) => {
  const unit = { id: u.id, number: ui + 1, title: u.title, lessons: [] };
  for (const entry of u.lessons) {
    const lesson = lessons[entry.lessonId];
    n++;
    if (only.length && !only.includes(lesson.id)) continue;
    const eyebrow = `Unit ${ui + 1} · ${u.title}`;
    const head = { eyebrow, title: `Lesson ${n}: ${lesson.title}` };
    const segs = [];
    segs.push({
      kind: "title",
      text: `Lesson ${n}. ${lesson.title}. ${lesson.summary}`,
      overlay: { type: "title", eyebrow: `Lesson ${n} · ${u.title}`, title: lesson.title, sub: lesson.summary, items: lesson.objectives },
    });
    lesson.steps.forEach((step, si) => {
      const stepTitle = `Step ${si + 1} of ${lesson.steps.length} · ${step.title}`;
      step.say.forEach((line, li) => {
        segs.push({ kind: "line", step: si, line: li, cue: line.cue || null, text: plain(line.text), caption: line.text, stepTitle });
      });
      if (step.check) {
        const c = step.check;
        const right = c.options.findIndex((o) => o.correct);
        const opts = c.options.map((o) => plain(o.text));
        const spoken = opts.map((o, i) => `${i === opts.length - 1 ? "or " : ""}${letters[i]}: ${o}`).join(". ");
        const q = { type: "question", prompt: c.prompt, options: c.options.map((o) => o.text) };
        segs.push({ kind: "question", step: si, text: `Here is a question. ${plain(c.prompt)} Is it ${spoken}?`, caption: "", stepTitle, overlay: q });
        segs.push({ kind: "think", step: si, text: "", seconds: 3, caption: "", stepTitle, overlay: q });
        segs.push({
          kind: "answer",
          step: si,
          text: `The answer is ${letters[right]}: ${opts[right]}. ${plain(c.options[right].why)}`,
          caption: "",
          stepTitle,
          overlay: { ...q, reveal: right, why: c.options[right].why },
        });
      }
    });
    unit.lessons.push({ id: lesson.id, number: n, head, segs });
  }
  if (unit.lessons.length) units.push(unit);
});

writeFileSync(out, JSON.stringify({ units }, null, 1));
const segCount = units.reduce((a, u) => a + u.lessons.reduce((b, l) => b + l.segs.length, 0), 0);
console.log(`${units.length} units, ${units.reduce((a, u) => a + u.lessons.length, 0)} lessons, ${segCount} segments`);
