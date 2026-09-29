// Rebuild timings/subtitles, then render every video to out/video/.
// Usage: npm run render:all            (all videos)
//        npm run render:all -- Short2  (just one composition)
import { execSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";

const only = process.argv.slice(2);
const browserExecutable = process.env.REMOTION_BROWSER ||
  (fs.existsSync("/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell")
    ? "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell" : undefined);

execSync("python3 scripts/prepare.py", { stdio: "inherit" });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comps = await getCompositions(serveUrl, { browserExecutable, logLevel: "error" });
const script = JSON.parse(fs.readFileSync("src/script.json", "utf8"));
const names = Object.fromEntries(script.videos.map((v) => [`Case0${v.id.slice(1)}`, v.slug]));
fs.mkdirSync("out/video", { recursive: true });
for (const composition of comps) {
  if (only.length && !only.includes(composition.id)) continue;
  const outputLocation = `out/video/${names[composition.id] ?? composition.id}.mp4`;
  console.log(`rendering ${composition.id} → ${outputLocation}`);
  await renderMedia({
    serveUrl, composition, codec: "h264", crf: 20, outputLocation, browserExecutable, logLevel: "error",
    concurrency: 4, onProgress: ({ progress }) => process.stdout.write(`\r  ${(progress * 100).toFixed(0)}%`),
  });
  console.log("");
}
