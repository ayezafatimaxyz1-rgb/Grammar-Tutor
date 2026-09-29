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
const names = { Main: "main_16x9", Short1: "short1_unit_9x16", Short2: "short2_material_9x16", Short3: "short3_measured_9x16", Short4: "short4_abstract_9x16", Short5: "short5_activity_9x16" };
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
