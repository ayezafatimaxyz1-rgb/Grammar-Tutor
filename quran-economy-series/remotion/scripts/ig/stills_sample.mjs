import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id: 'QGE-STYLE-SAMPLE', browserExecutable});
for (const frame of process.argv.slice(2).map(Number)) {
  await renderStill({serveUrl, composition, frame, output: `out/ig/sample-f${String(frame).padStart(4, '0')}.png`, browserExecutable, imageFormat: 'png'});
}
console.log('done', composition.durationInFrames);
