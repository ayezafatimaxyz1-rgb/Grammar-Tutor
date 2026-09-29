// Usage: node scripts/ig/stills.mjs epi01 30 200 900 ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const [ep, ...frames] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id: `QGE-${ep.toUpperCase()}`, browserExecutable, inputProps: {}});
console.log('duration', composition.durationInFrames, 'frames');
for (const frame of frames.map(Number)) {
  const output = `out/ig/${ep}-f${String(frame).padStart(4, '0')}.png`;
  await renderStill({serveUrl, composition, frame, output, browserExecutable, imageFormat: 'png'});
  console.log('wrote', output);
}
