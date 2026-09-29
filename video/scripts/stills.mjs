// Render preview stills: node scripts/stills.mjs <Composition> <outDir> <frame> [frame...]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";

const [comp, outDir, ...frames] = process.argv.slice(2);
const browserExecutable = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: comp, browserExecutable, logLevel: "error" });
fs.mkdirSync(outDir, { recursive: true });
for (const fr of frames) {
  const output = path.join(outDir, `${comp}_${fr}.png`);
  await renderStill({ serveUrl, composition, frame: Number(fr), output, browserExecutable, scale: 0.5, logLevel: "error" });
  console.log(output);
}
