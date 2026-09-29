// Original vector line art. Each drawing is centred on (0, 0) and fits roughly a 200 × 200 box.
import React from "react";
import { C, tint } from "./theme";

type P = { c?: string; sw?: number };
const line = (c: string, sw = 6) => ({ stroke: c, strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export const Chair: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill="none">
    <path d="M-45 -90 V20 M45 -90 V20" />
    <rect x={-45} y={-90} width={90} height={60} rx={8} fill={tint(c, 0.12)} />
    <rect x={-55} y={10} width={110} height={18} rx={6} fill={tint(c, 0.18)} />
    <path d="M-48 28 L-55 95 M48 28 L55 95" />
  </g>
);

export const Table: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill="none">
    <rect x={-95} y={-30} width={190} height={20} rx={6} fill={tint(c, 0.18)} />
    <path d="M-80 -10 L-85 80 M80 -10 L85 80 M-40 -10 V60 M40 -10 V60" />
  </g>
);

export const Sofa: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill="none">
    <rect x={-80} y={-55} width={160} height={55} rx={16} fill={tint(c, 0.12)} />
    <rect x={-100} y={-20} width={36} height={70} rx={14} fill={tint(c, 0.18)} />
    <rect x={64} y={-20} width={36} height={70} rx={14} fill={tint(c, 0.18)} />
    <rect x={-66} y={0} width={132} height={40} rx={10} fill={tint(c, 0.18)} />
    <path d="M-85 50 V70 M85 50 V70" />
  </g>
);

export const Bed: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill="none">
    <path d="M-100 -60 V60 M100 0 V60" />
    <rect x={-100} y={-10} width={200} height={40} rx={8} fill={tint(c, 0.12)} />
    <rect x={-88} y={-34} width={50} height={24} rx={10} fill={tint(c, 0.2)} />
    <path d="M-30 -10 Q30 -26 100 -10" />
    <path d="M-100 30 H100" />
  </g>
);

export const Suitcase: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill="none">
    <rect x={-55} y={-60} width={110} height={130} rx={14} fill={tint(c, 0.14)} />
    <path d="M-20 -60 V-82 H20 V-60 M-25 -60 V70 M25 -60 V70" />
    <circle cx={-35} cy={80} r={7} /><circle cx={35} cy={80} r={7} />
  </g>
);

export const Holdall: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill="none">
    <path d="M-85 -20 Q-85 -45 -60 -45 H60 Q85 -45 85 -20 V45 H-85 Z" fill={tint(c, 0.14)} />
    <path d="M-40 -45 Q-40 -85 0 -85 Q40 -85 40 -45" />
    <path d="M-85 5 H85" />
  </g>
);

export const Backpack: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill="none">
    <path d="M-50 -40 Q-50 -80 0 -80 Q50 -80 50 -40 V70 H-50 Z" fill={tint(c, 0.14)} />
    <rect x={-32} y={10} width={64} height={40} rx={8} />
    <path d="M-15 -80 Q0 -100 15 -80" />
  </g>
);

export const Shirt: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill={tint(c, 0.14)}>
    <path d="M-30 -70 L-80 -45 L-62 -5 L-45 -15 V75 H45 V-15 L62 -5 L80 -45 L30 -70 Q0 -45 -30 -70 Z" />
  </g>
);

export const Trousers: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill={tint(c, 0.14)}>
    <path d="M-45 -75 H45 L55 80 H12 L0 -20 L-12 80 H-55 Z" />
  </g>
);

export const Wrench: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill={tint(c, 0.14)}>
    <path d="M-60 60 L20 -20 A40 40 0 1 1 45 5 L-35 85 Q-50 95 -65 80 Q-75 70 -60 60 Z" transform="translate(0 -20)" />
  </g>
);

export const Hammer: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill={tint(c, 0.14)}>
    <rect x={-10} y={-40} width={20} height={120} rx={6} />
    <path d="M-60 -75 H45 Q65 -75 65 -55 V-35 H-60 Z" />
  </g>
);

export const Plate: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill="none">
    <ellipse cx={0} cy={0} rx={80} ry={80} fill={tint(c, 0.1)} />
    <ellipse cx={0} cy={0} rx={50} ry={50} />
  </g>
);

export const Cup: React.FC<P> = ({ c = C.ink, sw = 6 }) => (
  <g {...line(c, sw)} fill="none">
    <path d="M-45 -40 H45 L38 45 Q36 60 20 60 H-20 Q-36 60 -38 45 Z" fill={tint(c, 0.14)} />
    <path d="M45 -20 Q75 -20 72 8 Q70 30 40 30" />
  </g>
);

/* ---------------------------------------------------------------- material */

export const Ring: React.FC<P> = ({ c = C.gold, sw = 6 }) => (
  <g {...line(C.goldDeep, sw)}>
    <circle r={48} fill="none" stroke={c} strokeWidth={22} />
    <circle r={48} fill="none" stroke={C.goldDeep} strokeWidth={3} opacity={0.5} />
    <path d="M-14 -62 L0 -84 L14 -62 Z" fill={tint("#9AD7F0", 0.9)} />
  </g>
);

export const Coin: React.FC<P> = ({ c = C.gold }) => (
  <g>
    <circle r={60} fill={c} stroke={C.goldDeep} strokeWidth={6} />
    <circle r={44} fill="none" stroke={C.goldDeep} strokeWidth={3} opacity={0.6} />
    <text x={0} y={16} textAnchor="middle" fontSize={46} fontWeight={800} fill={C.goldDeep} fontFamily="Inter">£</text>
  </g>
);

export const Necklace: React.FC<P> = ({ c = C.gold }) => (
  <g fill="none">
    <path d="M-75 -60 Q-70 30 0 45 Q70 30 75 -60" stroke={c} strokeWidth={9} strokeDasharray="2 14" strokeLinecap="round" />
    <path d="M0 45 L-16 70 L0 95 L16 70 Z" fill={c} stroke={C.goldDeep} strokeWidth={4} />
  </g>
);

/** Molten gold blob; `wobble` animates the outline. */
export const GoldBlob: React.FC<{ wobble?: number; c?: string }> = ({ wobble = 0, c = C.gold }) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    const r = 80 + 10 * Math.sin(a * 3 + wobble) + 6 * Math.cos(a * 2 - wobble * 1.3);
    return [Math.cos(a) * r * 1.2, Math.sin(a) * r * 0.75];
  });
  const d = pts.map((p, i) => {
    const n = pts[(i + 1) % pts.length];
    const mx = (p[0] + n[0]) / 2, my = (p[1] + n[1]) / 2;
    return `${i === 0 ? `M${mx} ${my}` : ""} Q${n[0]} ${n[1]} ${(n[0] + pts[(i + 2) % pts.length][0]) / 2} ${(n[1] + pts[(i + 2) % pts.length][1]) / 2}`;
  }).join(" ");
  return (
    <g>
      <path d={d} fill={c} stroke={C.goldDeep} strokeWidth={5} />
      <ellipse cx={-35} cy={-25} rx={28} ry={10} fill="#fff" opacity={0.45} />
    </g>
  );
};

/** Kitchen scale with a needle; `value` from 0 to 1 moves the needle. */
export const Scale: React.FC<{ value: number; label?: string; c?: string }> = ({ value, label = "", c = C.ink }) => {
  const a = -120 + value * 240;
  return (
    <g {...line(c, 6)}>
      <path d="M-90 -95 H90" strokeWidth={10} />
      <path d="M0 -95 V-70" />
      <rect x={-95} y={-70} width={190} height={175} rx={22} fill={C.card} />
      <circle cx={0} cy={10} r={52} fill={tint(c, 0.06)} />
      {[-120, -60, 0, 60, 120].map((t) => (
        <path key={t} d="M0 -46 V-36" transform={`translate(0 10) rotate(${t})`} strokeWidth={4} />
      ))}
      <path d="M0 10 L0 -38" transform={`rotate(${a} 0 10)`} stroke={C.error} strokeWidth={5} />
      <circle cx={0} cy={10} r={6} fill={c} />
      <text x={0} y={92} textAnchor="middle" fontSize={26} fontWeight={700} fill={c} stroke="none" fontFamily="Inter">{label}</text>
    </g>
  );
};

export const Swatch: React.FC<{ kind: "silver" | "wood" | "glass" | "cotton" }> = ({ kind }) => {
  const fill = { silver: "#C9CED6", wood: "#C08A55", glass: "#CDEAF3", cotton: "#FBFBF6" }[kind];
  const stroke = { silver: "#7D8591", wood: "#7A5230", glass: "#5A9DB5", cotton: "#A9A7A0" }[kind];
  return (
    <g>
      <rect x={-70} y={-55} width={140} height={110} rx={16} fill={fill} stroke={stroke} strokeWidth={5} />
      {kind === "wood" && [-30, -5, 22].map((y) => <path key={y} d={`M-60 ${y} Q-10 ${y - 14} 60 ${y + 4}`} stroke={stroke} strokeWidth={3} fill="none" />)}
      {kind === "silver" && <path d="M-50 35 L40 -40" stroke="#fff" strokeWidth={10} opacity={0.7} strokeLinecap="round" />}
      {kind === "glass" && <path d="M-40 30 L-10 -30 M-20 35 L10 -25" stroke="#fff" strokeWidth={6} opacity={0.9} strokeLinecap="round" />}
      {kind === "cotton" && [-35, 0, 35].map((x) => <circle key={x} cx={x} cy={0} r={18} fill="#fff" stroke={stroke} strokeWidth={3} />)}
    </g>
  );
};

/** Brick wall. mode 0: individually outlined bricks; 1: seamless material texture. */
export const BrickWall: React.FC<{ mode: number; w?: number; h?: number; counted?: number }> = ({ mode, w = 360, h = 240, counted = 0 }) => {
  const bw = 60, bh = 30, rows = Math.floor(h / bh);
  const bricks: { x: number; y: number; i: number }[] = [];
  let i = 0;
  for (let r = 0; r < rows; r++) {
    const off = r % 2 ? -bw / 2 : 0;
    for (let x = off; x < w; x += bw) bricks.push({ x: Math.max(0, x), y: r * bh, i: i++ });
  }
  return (
    <g transform={`translate(${-w / 2} ${-h / 2})`}>
      <defs>
        <clipPath id="wallclip"><rect width={w} height={h} rx={6} /></clipPath>
      </defs>
      <g clipPath="url(#wallclip)">
        <rect width={w} height={h} fill="#B5533C" />
        {bricks.map((b) => {
          const bwid = Math.min(bw, w - b.x);
          const isCounted = b.i < counted;
          return (
            <rect key={b.i} x={b.x + 3} y={b.y + 3} width={bwid - 6} height={bh - 6} rx={3}
              fill={isCounted ? "#D9785C" : "#C1604A"} stroke={isCounted ? "#fff" : "#8E3B28"}
              strokeWidth={isCounted ? 3 : 2} opacity={1 - mode * 0.85} />
          );
        })}
        {/* material texture fades in over the individual bricks */}
        <g opacity={mode}>
          {Array.from({ length: 60 }, (_, k) => (
            <circle key={k} cx={(k * 97) % w} cy={(k * 53) % h} r={3 + (k % 4)} fill="#8E3B28" opacity={0.35} />
          ))}
        </g>
      </g>
      <rect width={w} height={h} rx={6} fill="none" stroke="#6E2C1E" strokeWidth={5} />
    </g>
  );
};

/* ---------------------------------------------------------------- measured */

export const Grain: React.FC<{ r?: number }> = ({ r = 0 }) => (
  <ellipse rx={11} ry={5} transform={`rotate(${r})`} fill="#FFF8E8" stroke={C.measured} strokeWidth={2.5} />
);

/** Bowl with rice; `fill` 0..1 sets the amount and `marks` shows measuring lines. */
export const Bowl: React.FC<{ fill?: number; marks?: boolean; c?: string; food?: "rice" | "none" }> = ({ fill = 1, marks, c = C.ink, food = "rice" }) => (
  <g>
    {food === "rice" && fill > 0 && (
      <g>
        <path d={`M-95 0 Q0 ${-70 * fill} 95 0 Z`} fill="#FFF8E8" stroke={C.measured} strokeWidth={3} />
        {Array.from({ length: Math.round(14 * fill) }, (_, i) => (
          <ellipse key={i} cx={-70 + ((i * 37) % 140)} cy={-8 - ((i * 13) % 26) * fill} rx={8} ry={3.5}
            transform={`rotate(${(i * 47) % 180} ${-70 + ((i * 37) % 140)} ${-8 - ((i * 13) % 26) * fill})`} fill="none" stroke={C.measured} strokeWidth={2} />
        ))}
      </g>
    )}
    <path d="M-110 0 H110 Q105 90 0 95 Q-105 90 -110 0 Z" fill={tint(c, 0.08)} stroke={c} strokeWidth={6} strokeLinejoin="round" />
    <path d="M-40 95 H40" stroke={c} strokeWidth={6} strokeLinecap="round" />
    {marks && [20, 45, 70].map((y) => <path key={y} d={`M${-100 + y * 0.2} ${y} h24`} stroke={C.measured} strokeWidth={4} strokeLinecap="round" />)}
  </g>
);

export const Jug: React.FC<{ level?: number; c?: string }> = ({ level = 0.7, c = C.ink }) => (
  <g>
    <clipPath id="jugclip"><path d="M-60 -80 H60 L70 90 H-70 Z" /></clipPath>
    <rect x={-80} y={90 - 170 * level} width={160} height={170 * level} fill="#FFFFFF" clipPath="url(#jugclip)" />
    <path d="M-60 -80 H60 L70 90 H-70 Z" fill={tint("#9BC4E8", 0.18)} stroke={c} strokeWidth={6} strokeLinejoin="round" />
    <path d="M62 -50 Q105 -45 100 10 Q95 45 66 45" fill="none" stroke={c} strokeWidth={6} />
    {[-40, 0, 40].map((y) => <path key={y} d={`M-60 ${y} h22`} stroke={C.measured} strokeWidth={4} strokeLinecap="round" />)}
  </g>
);

export const Loaf: React.FC<P> = ({ c = C.measured }) => (
  <g {...line(c, 6)}>
    <path d="M-100 40 V-10 Q-100 -60 -40 -60 H40 Q100 -60 100 -10 V40 Z" fill="#F2C98A" />
    {[-50, 0, 50].map((x) => <path key={x} d={`M${x - 10} -45 L${x + 10} -20`} fill="none" />)}
  </g>
);

export const Slice: React.FC<P> = ({ c = C.measured }) => (
  <g {...line(c, 5)}>
    <path d="M-40 55 V-5 Q-55 -10 -52 -30 Q-45 -55 0 -55 Q45 -55 52 -30 Q55 -10 40 -5 V55 Z" fill="#FBE3B6" />
  </g>
);

export const MilkBottle: React.FC<P> = ({ c = C.ink }) => (
  <g {...line(c, 5)}>
    <path d="M-22 -80 H22 V-55 Q45 -35 45 -5 V80 H-45 V-5 Q-45 -35 -22 -55 Z" fill="#FFFFFF" />
    <rect x={-24} y={-92} width={48} height={14} rx={4} fill={C.unit} stroke="none" />
    <rect x={-45} y={10} width={90} height={40} fill={tint(C.unit, 0.2)} stroke="none" />
    <text x={0} y={38} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.unit} stroke="none" fontFamily="Inter">1 L</text>
  </g>
);

/* ---------------------------------------------------------------- abstract */

export const FactCard: React.FC<{ text: string; c?: string; w?: number }> = ({ text, c = C.abstract, w = 230 }) => (
  <g>
    <rect x={-w / 2} y={-34} width={w} height={68} rx={14} fill={C.card} stroke={c} strokeWidth={4} />
    <text x={0} y={10} textAnchor="middle" fontSize={26} fontWeight={600} fill={C.ink} fontFamily="Inter">{text}</text>
  </g>
);

export const Bulb: React.FC<P> = ({ c = C.abstract }) => (
  <g {...line(c, 6)}>
    <path d="M-38 10 Q-62 -20 -50 -52 Q-35 -88 0 -88 Q35 -88 50 -52 Q62 -20 38 10 Q26 24 24 40 H-24 Q-26 24 -38 10 Z" fill={tint(C.highlight, 0.6)} />
    <path d="M-20 55 H20 M-14 70 H14" />
  </g>
);

export const Bubble: React.FC<{ text: string; c?: string; w?: number }> = ({ text, c = C.abstract, w = 300 }) => (
  <g>
    <rect x={-w / 2} y={-45} width={w} height={90} rx={45} fill={C.card} stroke={c} strokeWidth={4} />
    <path d={`M${-w / 4} 43 L${-w / 4 - 20} 75 L${-w / 4 + 20} 44`} fill={C.card} stroke={c} strokeWidth={4} strokeLinejoin="round" />
    <text x={0} y={10} textAnchor="middle" fontSize={28} fontWeight={600} fill={C.ink} fontFamily="Inter">{text}</text>
  </g>
);

/* ---------------------------------------------------------------- activity */

export const ActionIcon: React.FC<{ kind: "type" | "plan" | "call" | "clean"; c?: string }> = ({ kind, c = C.activity }) => (
  <g {...line(c, 5)} fill="none">
    {kind === "type" && (
      <g>
        <rect x={-50} y={-25} width={100} height={50} rx={8} fill={tint(c, 0.12)} />
        {[-30, -10, 10, 30].map((x) => <path key={x} d={`M${x} -8 h6 M${x} 8 h6`} />)}
      </g>
    )}
    {kind === "plan" && (
      <g>
        <rect x={-38} y={-48} width={76} height={96} rx={8} fill={tint(c, 0.12)} />
        <path d="M-20 -20 h40 M-20 0 h40 M-20 20 h24" />
      </g>
    )}
    {kind === "call" && (
      <g>
        <rect x={-28} y={-50} width={56} height={100} rx={12} fill={tint(c, 0.12)} />
        <path d="M-8 38 h16" />
        <path d="M38 -30 q14 14 0 28 M50 -40 q24 24 0 48" />
      </g>
    )}
    {kind === "clean" && (
      <g>
        <path d="M-30 -55 L10 25" />
        <path d="M-5 20 L40 5 L55 45 L5 55 Z" fill={tint(c, 0.12)} />
        <path d="M15 52 L10 30 M30 48 L22 22 M45 45 L36 15" />
      </g>
    )}
  </g>
);

export const Painting: React.FC<{ v: number }> = ({ v }) => {
  const bg = ["#F5E6C8", "#DCEBF5", "#F3DDE3"][v % 3];
  return (
    <g>
      <rect x={-85} y={-65} width={170} height={130} fill="#8B6A3E" rx={4} />
      <rect x={-72} y={-52} width={144} height={104} fill={bg} />
      {v % 3 === 0 && <g><circle cx={30} cy={-18} r={18} fill={C.gold} /><path d="M-72 40 L-20 -10 L20 30 L45 5 L72 40 Z" fill={C.material} /></g>}
      {v % 3 === 1 && <g><rect x={-45} y={-30} width={40} height={60} fill={C.unit} /><circle cx={25} cy={0} r={26} fill={C.error} /></g>}
      {v % 3 === 2 && <g><path d="M-50 30 Q0 -60 50 30" fill="none" stroke={C.abstract} strokeWidth={10} /><circle cx={0} cy={-5} r={12} fill={C.measured} /></g>}
    </g>
  );
};
