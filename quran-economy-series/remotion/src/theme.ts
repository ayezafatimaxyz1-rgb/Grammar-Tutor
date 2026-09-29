export const C = {
  paper: '#F3E9D2',
  paperDeep: '#E9DBBB',
  ink: '#2B2118',
  inkSoft: '#5A4A3A',
  gold: '#B8892D',
  goldBright: '#D4A64A',
  sepia: '#8A5A2B',
  navy: '#0E1B2C',
  navyLine: '#1D3350',
  teal: '#2FB5A8',
  ice: '#D9ECEF',
  coral: '#E8795A',
};

export const F = {
  quran: '"Scheherazade New", serif',
  urdu: '"Noto Nastaliq Urdu", serif',
  naskh: '"Amiri", serif',
};

export const BADGE_COLORS = {
  text: {bg: C.gold, fg: '#FFF8EA'},
  tafsir: {bg: C.sepia, fg: '#FFF4E4'},
  modern: {bg: C.teal, fg: '#06201D'},
  claim: {bg: C.coral, fg: '#2A0E05'},
} as const;
