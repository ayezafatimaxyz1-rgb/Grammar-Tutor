export {C, BADGE_COLORS} from '../theme';

export const W = 1080;
export const H = 1920;
export const FPS = 30;

// Instagram Reels safe area: keep text clear of the top bar, the caption/UI band at the
// bottom and the action icons on the right.
export const SAFE = {top: 230, bottom: 1500, left: 70, right: 930};

export const FE = {
  display: '"Cormorant Garamond", Georgia, serif',
  sans: '"DM Sans", system-ui, sans-serif',
  quran: '"Scheherazade New", serif',
};

export const BADGE_TEXT = {
  text: "QUR'ANIC TEXT",
  tafsir: 'SCHOLARLY VIEW',
  modern: 'MODERN APPLICATION',
  claim: 'CLAIM TO CHECK',
} as const;
export type BadgeKind = keyof typeof BADGE_TEXT;
