// Renders one narrated board video per lesson from a script (script.mjs) and its audio (narrate.py).
// Usage: node tools/video/render.cjs script.json audio_dir out_dir [lessonId ...]
// Frames are captured from frame.html at 15 fps and piped straight into ffmpeg. While the voice
// explains line i of a step, the board plays from that line's cue to the next line's cue, then holds.
const { chromium } = require("playwright");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const FPS = 15;
const SR = 24000;
const PER_FRAME = SR / FPS; // audio samples per video frame
const root = path.resolve(__dirname, "../..");
const [scriptPath, audioDir, outDir, ...only] = process.argv.slice(2);
const script = JSON.parse(fs.readFileSync(scriptPath, "utf8"));
const durations = JSON.parse(fs.readFileSync(path.join(audioDir, "durations.json"), "utf8"));
fs.mkdirSync(outDir, { recursive: true });

// The engine and the course content, in the order index.html loads them (not the app itself).
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]).filter((s) => !/js\/(app|ask)\.js$/.test(s));

function readWav(file) {
  const b = fs.readFileSync(file);
  let at = 12;
  while (at < b.length) {
    const id = b.toString("ascii", at, at + 4);
    const size = b.readUInt32LE(at + 4);
    if (id === "data") return new Int16Array(b.buffer.slice(b.byteOffset + at + 8, b.byteOffset + at + 8 + size));
    at += 8 + size + (size & 1);
  }
  throw new Error("no data chunk in " + file);
}

async function renderLesson(page, unit, lesson) {
  const out = path.join(outDir, `${String(lesson.number).padStart(2, "0")}-${lesson.id}.mp4`);
  if (fs.existsSync(out)) return console.log("exists", out);
  await page.evaluate((id) => useLesson(id), lesson.id);
  const info = await page.evaluate((id) => {
    const s = scenes[id];
    return { length: s.stepLength.slice(), starts: PLAB.lessons[id].steps.map((st, si) => st.say.map((l) => (l.cue ? s.startOf(si, l.cue) : null))) };
  }, lesson.id);

  // Plan every segment: how many frames, and what the board does during them.
  const plan = [];
  lesson.segs.forEach((seg, i) => {
    const audio = durations[`${lesson.id}-${String(i).padStart(3, "0")}`];
    const base = { eyebrow: lesson.head.eyebrow, title: lesson.head.title, stepTitle: seg.stepTitle || "", caption: seg.caption || "", lesson: lesson.id, overlay: seg.overlay || null, wav: i };
    if (seg.kind === "line") {
      const starts = info.starts[seg.step];
      const b = [];
      for (let k = 0; k < starts.length; k++) b[k] = Math.max(k ? b[k - 1] : 0, k ? starts[k] ?? b[k - 1] : 0);
      b.push(Math.max(b[b.length - 1], info.length[seg.step]));
      const from = b[seg.line], to = b[seg.line + 1];
      const secs = Math.max(audio + 0.45, (to - from) / 1000 + 0.2);
      plan.push({ ...base, step: seg.step, from, to, frames: Math.round(secs * FPS) });
    } else if (seg.kind === "title") {
      plan.push({ ...base, step: -1, from: 0, to: 0, stepTitle: "", frames: Math.round((audio + 1.2) * FPS) });
    } else if (seg.kind === "think") {
      plan.push({ ...base, step: seg.step, from: info.length[seg.step], to: info.length[seg.step], think: true, frames: Math.round(audio * FPS) });
    } else {
      plan.push({ ...base, step: seg.step, from: info.length[seg.step], to: info.length[seg.step], frames: Math.round((audio + (seg.kind === "answer" ? 1.0 : 0.4)) * FPS) });
    }
  });
  const last = plan[plan.length - 1];
  plan.push({ ...last, overlay: null, caption: "", wav: null, frames: FPS * 2 });

  // The soundtrack: each segment's voice, padded with silence to the segment's length.
  const total = plan.reduce((n, p) => n + p.frames, 0);
  const pcm = new Int16Array(total * PER_FRAME);
  let at = 0;
  for (const p of plan) {
    if (p.wav != null) {
      const v = readWav(path.join(audioDir, `${lesson.id}-${String(p.wav).padStart(3, "0")}.wav`));
      pcm.set(v.subarray(0, p.frames * PER_FRAME), at);
    }
    at += p.frames * PER_FRAME;
  }
  const rawAudio = out + ".pcm";
  fs.writeFileSync(rawAudio, Buffer.from(pcm.buffer));

  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-f", "s16le", "-ar", String(SR), "-ac", "1", "-i", rawAudio,
    "-c:v", "libx264", "-preset", "veryfast", "-tune", "stillimage", "-crf", "24", "-pix_fmt", "yuv420p", "-r", String(FPS), "-g", String(FPS * 10),
    "-c:a", "aac", "-b:a", "96k", "-ar", "48000", "-movflags", "+faststart", out + ".part.mp4"], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((ok, bad) => ff.on("close", (c) => (c ? bad(new Error("ffmpeg " + c)) : ok())));
  const write = (buf) => new Promise((ok) => (ff.stdin.write(buf) ? ok() : ff.stdin.once("drain", ok)));

  let shot = null, key = "";
  for (const p of plan) {
    const span = p.to - p.from;
    for (let f = 0; f < p.frames; f++) {
      const t = span ? Math.min(p.to, p.from + (f * 1000) / FPS) : p.to;
      const think = p.think ? Math.min(3, 1 + Math.floor(f / FPS)) : 0;
      const frameKey = `${p.wav}|${p.step}|${Math.round(t)}|${think}|${p.overlay ? 1 : 0}`;
      if (frameKey !== key) {
        const overlay = p.overlay ? { ...p.overlay, think } : null;
        await page.evaluate((fr) => show(fr), { ...p, t, overlay });
        shot = await page.screenshot({ type: "jpeg", quality: 90 });
        key = frameKey;
      }
      await write(shot);
    }
  }
  ff.stdin.end();
  await done;
  fs.renameSync(out + ".part.mp4", out);
  fs.unlinkSync(rawAudio);
  console.log(`rendered ${out} (${(total / FPS / 60).toFixed(1)} min)`);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto("file://" + path.join(__dirname, "frame.html"));
  for (const s of scripts) await page.addScriptTag({ path: path.join(root, s) });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  for (const unit of script.units)
    for (const lesson of unit.lessons) if (!only.length || only.includes(lesson.id)) await renderLesson(page, unit, lesson);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
