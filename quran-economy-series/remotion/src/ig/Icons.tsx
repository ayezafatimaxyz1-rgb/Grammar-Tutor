import React from 'react';

type P = {c: string; draw: number; size?: number; sw?: number};
const s = (c: string, draw: number, len: number, sw = 3) => ({
  fill: 'none', stroke: c, strokeWidth: sw, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  strokeDasharray: len, strokeDashoffset: len * (1 - draw),
});
const Box: React.FC<{size: number; children: React.ReactNode}> = ({size, children}) => (
  <svg width={size} height={size} viewBox="-100 -100 200 200" style={{overflow: 'visible'}}>{children}</svg>
);

export const Mosque: React.FC<P> = ({c, draw, size = 260, sw = 3}) => (
  <Box size={size}>
    <path d="M -60 70 V -5 C -60 -45 -30 -62 0 -78 C 30 -62 60 -45 60 -5 V 70" {...s(c, draw, 520, sw)} />
    <path d="M 0 -78 V -96 M -6 -90 A 7 7 0 1 0 6 -90" {...s(c, draw, 60, sw)} />
    <path d="M -22 70 V 22 A 22 22 0 0 1 22 22 V 70" {...s(c, draw, 180, sw)} />
    <path d="M -86 70 V -40 L -78 -58 L -70 -40 V 70 M 70 70 V -40 L 78 -58 L 86 -40 V 70" {...s(c, draw, 520, sw)} />
    <path d="M -96 70 H 96" {...s(c, draw, 200, sw)} />
  </Box>
);

export const Tower: React.FC<P> = ({c, draw, size = 260, sw = 3}) => (
  <Box size={size}>
    <path d="M -50 80 V -70 L 10 -92 V 80 M 10 -40 H 55 V 80 M -96 80 H 96" {...s(c, draw, 700, sw)} />
    {[-50, -25, 0, 25, 50].map((y) => (
      <path key={y} d={`M -38 ${y} H -2 M 22 ${y + 8} H 44`} {...s(c, draw, 80, sw * 0.7)} />
    ))}
  </Box>
);

export const Stall: React.FC<P & {open: boolean}> = ({c, draw, open, size = 200, sw = 3}) => (
  <Box size={size}>
    <path d="M -80 -20 L -65 -60 H 65 L 80 -20 Z" {...s(c, draw, 380, sw)} />
    <path d="M -80 -20 Q -60 -2 -40 -20 Q -20 -2 0 -20 Q 20 -2 40 -20 Q 60 -2 80 -20" {...s(c, draw, 260, sw)} />
    <path d="M -70 -12 V 70 M 70 -12 V 70 M -90 70 H 90" {...s(c, draw, 360, sw)} />
    {open ? (
      <>
        <circle cx={-35} cy={30} r={14} {...s(c, draw, 90, sw)} />
        <circle cx={0} cy={28} r={16} {...s(c, draw, 100, sw)} />
        <circle cx={36} cy={30} r={13} {...s(c, draw, 85, sw)} />
        <path d="M -60 46 H 60" {...s(c, draw, 120, sw)} />
      </>
    ) : (
      <path d="M -58 -4 V 60 H 58 V -4 M -58 20 H 58 M -58 40 H 58" {...s(c, draw, 420, sw)} />
    )}
  </Box>
);

export const Book: React.FC<P> = ({c, draw, size = 150, sw = 3}) => (
  <Box size={size}>
    <path d="M 0 -50 C -25 -66 -60 -66 -80 -56 V 60 C -60 50 -25 50 0 66 C 25 50 60 50 80 60 V -56 C 60 -66 25 -66 0 -50 V 66" {...s(c, draw, 700, sw)} />
  </Box>
);

export const Scales: React.FC<P> = ({c, draw, size = 150, sw = 3}) => (
  <Box size={size}>
    <path d="M 0 -70 V 70 M -40 70 H 40 M -70 -50 H 70" {...s(c, draw, 380, sw)} />
    <path d="M -70 -50 L -92 10 H -48 Z M 70 -50 L 48 10 H 92 Z" {...s(c, draw, 380, sw)} />
  </Box>
);

export const Economy: React.FC<P> = ({c, draw, size = 150, sw = 3}) => (
  <Box size={size}>
    <path d="M -80 70 H 80 M -60 70 V 20 M -20 70 V -5 M 20 70 V 10 M 60 70 V -40" {...s(c, draw, 480, sw * 1.4)} />
    <path d="M -76 0 L -30 -30 L 10 -12 L 70 -70 M 50 -72 H 72 V -50" {...s(c, draw, 300, sw)} />
  </Box>
);

export const ICONS: Record<string, React.FC<P>> = {
  mosque: Mosque,
  tower: Tower,
  creed: Book,
  law: Scales,
  economy: Economy,
  'stall-open': (p) => <Stall {...p} open />,
  'stall-close': (p) => <Stall {...p} open={false} />,
};
