// Usage: node scripts/stills.mjs 120 400 900 ...   (frame numbers; defaults to one frame per text beat)
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';

const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const frames = process.argv.slice(2).map(Number);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id: 'RizqPilot', browserExecutable, inputProps: {}});
for (const frame of frames) {
  const output = `out/stills/f${String(frame).padStart(4, '0')}.png`;
  await renderStill({serveUrl, composition, frame, output, browserExecutable, imageFormat: 'png'});
  console.log('wrote', output);
}
