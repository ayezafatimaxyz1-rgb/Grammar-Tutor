// Style sample B: whiteboard doodle. A marker draws the notes' logic live.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Fx } from "../v2/kit";
import { Drawing, Full, HandText, Ink, Pt, TrackAudio, dense, drawState, ellipse, useTrackCue, wobble } from "./common";

const BLACK = "#1B1B1F", BLUE = "#1F5FD1", RED = "#D7263D", GREEN = "#1B9E55", ORANGE = "#E07A10";

const shift = (pts: Pt[], x: number, y: number, s = 1): Pt[] => pts.map(([a, b]) => [x + a * s, y + b * s]);
const W = (pts: Pt[], seed: number) => wobble(dense(pts, 7), 2.2, seed);

// simple doodles centred on (0, 0)
const CHAIR: Pt[][] = [[[-40, -100], [-40, 20]], [[40, -100], [40, 20]], [[-40, -100], [40, -100]], [[-40, -55], [40, -55]], [[-55, 20], [55, 20]], [[-50, 20], [-58, 100]], [[50, 20], [58, 100]]];
const TABLE: Pt[][] = [[[-110, -20], [110, -20]], [[-110, -5], [110, -5]], [[-95, -5], [-100, 90]], [[95, -5], [100, 90]], [[-45, -5], [-45, 60]], [[45, -5], [45, 60]]];
const SOFA: Pt[][] = [[[-90, 0], [-90, -60], [90, -60], [90, 0]], [[-115, -20], [-115, 50], [115, 50], [115, -20], [90, -20]], [[-115, -20], [-90, -20]], [[-90, 10], [90, 10]], [[-95, 50], [-95, 75]], [[95, 50], [95, 75]]];
const BED: Pt[][] = [[[-120, -80], [-120, 70]], [[120, -10], [120, 70]], [[-120, 0], [120, 0]], [[-120, 35], [120, 35]], [[-105, -30], [-55, -30], [-55, 0], [-105, 0], [-105, -30]], [[-40, 0], [20, -25], [120, -10]]];

const ITEMS = [
  { name: "chair", art: CHAIR, x: 300, y: 620, lw: 120 },
  { name: "table", art: TABLE, x: 780, y: 620, lw: 120 },
  { name: "sofa", art: SOFA, x: 300, y: 920, lw: 100 },
  { name: "bed", art: BED, x: 780, y: 920, lw: 80 },
];

type Write = { text: string; x: number; y: number; size: number; w: number; at: number; dur: number; color: string; anchor?: "start" | "middle"; font?: string };

export const WhiteboardSample: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useTrackCue("sm");
  const tStart = cue("why is");
  const tWrong = cue("wrong");
  const tMany = cue("contains many things");
  const tItems = [cue("a chair"), cue("a table"), cue("a sofa"), cue("a bed")];
  const tGroup = cue("groups them together");
  const tUnit = cue("one unit");
  const tMeans = cue("unit means one");
  const tSing = cue("always singular");
  const tAdd = cue("we cant add");
  const tSo = cue("so the furniture is");

  const writes: Write[] = [
    { text: "The furniture are expensive.", x: 100, y: 260, size: 72, w: 880, at: tStart, dur: 45, color: BLACK },
    { text: "contains many things:", x: 540, y: 395, size: 54, w: 520, at: tMany, dur: 22, color: BLUE, anchor: "middle" },
    ...ITEMS.map((it, i) => ({ text: it.name, x: it.x, y: it.y + 150, size: 48, w: it.lw, at: tItems[i] + 16, dur: 10, color: BLACK, anchor: "middle" as const })),
    { text: "ONE UNIT", x: 540, y: 1245, size: 90, w: 380, at: tUnit, dur: 20, color: BLUE, anchor: "middle" },
    { text: "unit = 1", x: 470, y: 1430, size: 110, w: 420, at: tMeans, dur: 22, color: ORANGE, anchor: "middle" },
    { text: "1s", x: 890, y: 1430, size: 100, w: 110, at: tAdd, dur: 8, color: ORANGE, anchor: "middle" },
    { text: "1 is always SINGULAR", x: 540, y: 1550, size: 70, w: 700, at: tSing, dur: 26, color: GREEN, anchor: "middle" },
    { text: "The furniture IS expensive", x: 510, y: 1700, size: 76, w: 820, at: tSo, dur: 34, color: GREEN, anchor: "middle" },
  ];

  const drawings: Drawing[] = [
    // red circle round "are" + cross beside the sentence
    { strokes: [W(ellipse(596, 236, 72, 50), 3)], at: tWrong, dur: 14, color: RED, width: 7 },
    ...ITEMS.map((it, i) => ({ strokes: it.art.map((s, k) => W(shift(s, it.x, it.y, 1.05), i * 7 + k)), at: tItems[i], dur: 16, color: BLACK, width: 8 })),
    { strokes: [W(ellipse(540, 810, 500, 345), 11)], at: tGroup, dur: 30, color: BLUE, width: 10 },
    { strokes: [W([[540, 1270], [540, 1320]], 4), W([[515, 1298], [540, 1325], [565, 1298]], 5)], at: tMeans - 12, dur: 10, color: ORANGE, width: 8 },
    { strokes: [W([[840, 1360], [950, 1455]], 2), W([[950, 1360], [840, 1455]], 3)], at: tAdd + 16, dur: 8, color: RED, width: 10 },
    { strokes: [W([[945, 1680], [970, 1705], [1020, 1635]], 9)], at: tSo + 36, dur: 8, color: GREEN, width: 9 },
  ];

  // marker position: follow whichever element is being drawn or written
  let tip: Pt | null = null;
  for (const d of drawings) {
    const s = drawState(d, f);
    if (s.tip) tip = s.tip;
  }
  for (const w of writes) {
    const p = (f - w.at) / w.dur;
    if (p > 0 && p < 1) {
      const x0 = w.anchor === "middle" ? w.x - w.w / 2 : w.x;
      tip = [x0 + p * w.w, w.y - w.size * 0.3 + Math.sin(f * 2.1) * w.size * 0.18];
    }
  }
  const events = [...drawings.map((d) => d.at), ...writes.map((w) => w.at)].sort((a, b) => a - b);

  return (
    <Full bg="#FBFBF7">
      {/* board frame and faint smudges */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(0,0,0,0.025), transparent 40%), radial-gradient(circle at 70% 75%, rgba(0,0,0,0.03), transparent 45%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, background: "linear-gradient(#C9CDD3, #9EA4AD)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 34, background: "linear-gradient(#9EA4AD, #C9CDD3)" }} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {writes.map((w, i) => (
          <HandText key={i} id={`wb${i}`} text={w.text} x={w.x} y={w.y} size={w.size} w={w.w} p={(f - w.at) / w.dur} color={w.color} anchor={w.anchor} />
        ))}
        {drawings.map((d, i) => <Ink key={i} d={d} f={f} />)}
        {tip && <Marker x={tip[0]} y={tip[1]} color={colorAt(f, drawings, writes)} />}
      </svg>
      <TrackAudio id="sm" />
      {events.map((e, i) => <Fx key={i} at={e} name="scratch" volume={0.14} />)}
    </Full>
  );
};

const colorAt = (f: number, ds: Drawing[], ws: Write[]) => {
  for (const d of ds) if (f >= d.at && f <= d.at + d.dur) return d.color;
  for (const w of ws) if (f >= w.at && f <= w.at + w.dur) return w.color;
  return BLACK;
};

/** Whiteboard marker with its tip at (x, y). */
const Marker: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <g transform={`translate(${x} ${y}) rotate(-35)`}>
    <ellipse cx={120} cy={60} rx={120} ry={22} fill="rgba(0,0,0,0.12)" transform="rotate(35 120 60)" />
    <path d="M0 0 L22 -10 L22 10 Z" fill={color} />
    <rect x={20} y={-22} width={40} height={44} rx={6} fill="#2B2B2F" />
    <rect x={58} y={-26} width={220} height={52} rx={12} fill="#F1F1F1" stroke="#BDBDBD" strokeWidth={3} />
    <rect x={120} y={-26} width={80} height={52} fill={color} opacity={0.9} />
    <rect x={270} y={-26} width={30} height={52} rx={10} fill={color} />
  </g>
);
