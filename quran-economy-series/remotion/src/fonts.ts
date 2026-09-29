import '@fontsource/scheherazade-new/400.css';
import '@fontsource/scheherazade-new/500.css';
import '@fontsource/amiri/400.css';
import '@fontsource/amiri/700.css';
import '@fontsource/noto-nastaliq-urdu/400.css';
import '@fontsource/noto-nastaliq-urdu/600.css';
import '@fontsource/noto-nastaliq-urdu/700.css';
import {continueRender, delayRender} from 'remotion';

// Block rendering until every face is actually loaded, so no frame is drawn with a fallback font.
const handle = delayRender('Loading Arabic and Urdu fonts');
Promise.all([
  document.fonts.load('400 40px "Scheherazade New"', 'ٱللَّهِ'),
  document.fonts.load('500 40px "Scheherazade New"', 'ٱللَّهِ'),
  document.fonts.load('400 40px "Amiri"', 'رزق'),
  document.fonts.load('700 40px "Amiri"', 'رزق'),
  document.fonts.load('400 40px "Noto Nastaliq Urdu"', 'رزق'),
  document.fonts.load('600 40px "Noto Nastaliq Urdu"', 'رزق'),
  document.fonts.load('700 40px "Noto Nastaliq Urdu"', 'رزق'),
])
  .then(() => document.fonts.ready)
  .then(() => continueRender(handle))
  .catch((e) => {
    console.error(e);
    continueRender(handle);
  });
