import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const [ids, ...frames] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
for (const id of ids.split(',')) {
  const composition = await selectComposition({serveUrl, id, browserExecutable});
  for (const frame of frames.map(Number)) await renderStill({serveUrl, composition, frame, output: `out/ig/${id}-${String(frame).padStart(4, '0')}.png`, browserExecutable, imageFormat: 'jpeg', jpegQuality: 80});
}
console.log('done');
