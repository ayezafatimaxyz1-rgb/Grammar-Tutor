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
  const label = `${lesson.head.title}`;
  const lessonKey = lesson.id;
  const prep = (f) => page.evaluate((x) => prepare(x), f);
  const lessonLen = (await prep({ key: lessonKey, lesson: lesson.id })).length;
  const starts = await page.evaluate((id) => PLAB.lessons[id].steps.map((st, si) => st.say.map((l) => (l.cue ? scenes[id].startOf(si, l.cue) : null))), lesson.id);

  // How long the board takes to draw a stretch: a teacher draws while talking, so drawing is
  // slowed (up to 3 times) to fill most of the sentence instead of appearing and then waiting.
  const pace = (span, audio) => (span ? Math.min(span * 3, Math.max(span, audio * 1000 * 0.9)) : 0);

  // Plan every segment: how many frames, and what the board does during them.
  const plan = [];
  for (let i = 0; i < lesson.segs.length; i++) {
    const seg = lesson.segs[i];
    const audio = durations[`${lesson.id}-${String(i).padStart(3, "0")}`];
    const base = { label, stepTitle: seg.stepTitle || "", caption: seg.caption || "", wav: i };
    if (seg.kind === "line") {
      const st = starts[seg.step];
      const b = [0];
      for (let k = 1; k < st.length; k++) b[k] = Math.max(b[k - 1], st[k] ?? b[k - 1]);
      b.push(Math.max(b[b.length - 1], lessonLen[seg.step]));
      const from = b[seg.line], to = b[seg.line + 1];
      const play = pace(to - from, audio);
      plan.push({ ...base, key: lessonKey, lesson: lesson.id, step: seg.step, from, to, play, frames: Math.round(Math.max(audio + 0.45, play / 1000 + 0.25) * FPS) });
    } else if (seg.kind === "title") {
      const f = { key: lesson.id + "-title", board: "title", overlay: seg.overlay };
      const len = (await prep(f)).length[0];
      const play = pace(len, audio);
      plan.push({ ...base, ...f, caption: "", stepTitle: "", step: 0, from: 0, to: len, play, frames: Math.round(Math.max(audio + 1.0, play / 1000 + 0.6) * FPS) });
    } else {
      // A question is written on the board, then the answer is circled and explained.
      const answer = lesson.segs.find((x) => x.kind === "answer" && x.step === seg.step);
      const f = { key: `${lesson.id}-q${seg.step}`, board: "question", overlay: answer.overlay };
      const len = (await prep(f)).length;
      const step = seg.kind === "answer" ? 1 : 0;
      const think = seg.kind === "think";
      const to = len[step], from = think ? to : 0;
      const play = pace(to - from, audio);
      const tail = seg.kind === "answer" ? 1.0 : think ? 0 : 0.4;
      plan.push({ ...base, ...f, caption: think ? "Pause the video and think about your answer." : "", step, from, to, play, handAway: think,
        frames: Math.round(Math.max(audio + tail, play / 1000 + 0.3) * FPS) });
    }
  }
  const last = plan[plan.length - 1];
  plan.push({ ...last, from: last.to, caption: "", wav: null, handAway: true, frames: FPS * 2 });

  // VIDEO_LIMIT=60 renders only the first 60 seconds (for a quick sample).
  if (process.env.VIDEO_LIMIT) {
    let left = +process.env.VIDEO_LIMIT * FPS;
    for (let i = 0; i < plan.length; i++) {
      if (left <= 0) { plan.length = i; break; }
      plan[i].frames = Math.min(plan[i].frames, left);
      left -= plan[i].frames;
    }
  }

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
    "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ac", "2", "-ar", "44100", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", out + ".part.mp4"], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((ok, bad) => ff.on("close", (c) => (c ? bad(new Error("ffmpeg " + c)) : ok())));
  const write = (buf) => new Promise((ok) => (ff.stdin.write(buf) ? ok() : ff.stdin.once("drain", ok)));

  let shot = null, key = "";
  for (const p of plan) {
    for (let f = 0; f < p.frames; f++) {
      const t = p.play ? p.from + (p.to - p.from) * Math.min(1, (f * 1000) / FPS / p.play) : p.to;
      const frameKey = `${p.key}|${p.wav}|${p.step}|${t.toFixed(1)}|${p.handAway ? 1 : 0}`;
      if (frameKey !== key) {
        await page.evaluate((fr) => show(fr), { ...p, t });
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
  await page.evaluate(() => Promise.all([document.fonts.load('400 38px "Kalam"'), document.fonts.load('700 38px "Kalam"')]));
  await page.waitForTimeout(500);
  for (const unit of script.units)
    for (const lesson of unit.lessons) if (!only.length || only.includes(lesson.id)) await renderLesson(page, unit, lesson);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
