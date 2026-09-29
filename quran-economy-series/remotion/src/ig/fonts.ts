import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-sans/800.css';
import {continueRender, delayRender} from 'remotion';

const handle = delayRender('Loading English fonts');
Promise.all([
  document.fonts.load('600 40px "Cormorant Garamond"', 'Quran'),
  document.fonts.load('700 40px "Cormorant Garamond"', 'Quran'),
  document.fonts.load('400 40px "DM Sans"', 'Quran'),
  document.fonts.load('700 40px "DM Sans"', 'Quran'),
  document.fonts.load('800 40px "DM Sans"', 'Quran'),
])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
