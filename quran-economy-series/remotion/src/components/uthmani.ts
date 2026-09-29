// The QuranEnc/KFGQPC Uthmani text reuses a few code points that only the King Fahd Complex fonts
// interpret as open tanween. Map them to the standard Unicode characters so any Qur'anic font
// (here Scheherazade New) shapes them correctly. The source strings in data/pilot.ts stay verbatim.
const MAP: Record<string, string> = {
  'ٗ': 'ࣰ', // inverted damma  -> open fathatan
  'ٞ': 'ࣱ', // fatha w/ 2 dots -> open dammatan
  'ٖ': 'ࣲ', // subscript alef  -> open kasratan
};

export const uthmani = (s: string) => s.replace(/[ٖٗٞ]/g, (c) => MAP[c]);
