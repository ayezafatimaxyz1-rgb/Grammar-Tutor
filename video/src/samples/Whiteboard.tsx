// Style sample B: whiteboard doodle. A marker draws the notes' logic live across several boards,
// wiping the board between parts.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Fx, Karaoke } from "../v2/kit";
import timings from "../timings.json";
import { Drawing, Full, HandText, Ink, Pt, TrackAudio, dense, drawState, ellipse, track, wobble } from "./common";
import { ENDINGS, FAMILY, useLesson } from "./lesson";

const BLACK = "#1B1B1F", BLUE = "#1F5FD1", RED = "#D7263D", GREEN = "#1B9E55", ORANGE = "#E07A10";
type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };
const CAPS = (timings as unknown as { captions: Record<string, Cue[]> }).captions;

const shift = (pts: Pt[], x: number, y: number, s = 1): Pt[] => pts.map(([a, b]) => [x + a * s, y + b * s]);
const W = (pts: Pt[], seed: number) => wobble(dense(pts, 7), 2.2, seed);
const tw = (t: string, size: number) => t.length * size * 0.43;

const CHAIR: Pt[][] = [[[-40, -100], [-40, 20]], [[40, -100], [40, 20]], [[-40, -100], [40, -100]], [[-40, -55], [40, -55]], [[-55, 20], [55, 20]], [[-50, 20], [-58, 100]], [[50, 20], [58, 100]]];
const TABLE: Pt[][] = [[[-110, -20], [110, -20]], [[-110, -5], [110, -5]], [[-95, -5], [-100, 90]], [[95, -5], [100, 90]], [[-45, -5], [-45, 60]], [[45, -5], [45, 60]]];
const SOFA: Pt[][] = [[[-90, 0], [-90, -60], [90, -60], [90, 0]], [[-115, -20], [-115, 50], [115, 50], [115, -20], [90, -20]], [[-115, -20], [-90, -20]], [[-90, 10], [90, 10]], [[-95, 50], [-95, 75]], [[95, 50], [95, 75]]];
const BED: Pt[][] = [[[-120, -80], [-120, 70]], [[120, -10], [120, 70]], [[-120, 0], [120, 0]], [[-120, 35], [120, 35]], [[-105, -30], [-55, -30], [-55, 0], [-105, 0], [-105, -30]], [[-40, 0], [20, -25], [120, -10]]];
const ARTS = [CHAIR, TABLE, SOFA, BED];
const art = (a: Pt[][], x: number, y: number, s: number, seed: number) => a.map((st, k) => W(shift(st, x, y, s), seed + k));
const arrowDown = (x: number, y1: number, y2: number, seed: number) => [W([[x, y1], [x, y2]], seed), W([[x - 22, y2 - 26], [x, y2], [x + 22, y2 - 26]], seed + 1)];
const arrowRight = (x1: number, x2: number, y: number, seed: number) => [W([[x1, y], [x2, y]], seed), W([[x2 - 26, y - 20], [x2, y], [x2 - 26, y + 20]], seed + 1)];

// simple family doodles (centred, ~200 px)
const SUITCASE: Pt[][] = [[[-55, -60], [55, -60], [55, 70], [-55, 70], [-55, -60]], [[-20, -60], [-20, -82], [20, -82], [20, -60]], [[-25, -60], [-25, 70]], [[25, -60], [25, 70]]];
const BAG: Pt[][] = [[[-85, -20], [-60, -45], [60, -45], [85, -20], [85, 45], [-85, 45], [-85, -20]], [[-40, -45], [-30, -80], [30, -80], [40, -45]]];
const WRENCH: Pt[][] = [[[-70, 70], [20, -20]], [[-55, 85], [35, -5]], [[20, -20], [5, -45], [25, -75], [55, -70], [35, -45], [50, -30], [75, -45], [80, -15], [55, 5], [35, -5]]];
const GEAR: Pt[][] = [ellipse(0, 0, 60, 60, 1, 0), ellipse(0, 0, 22, 22, 1, 0), [[0, -60], [0, -80]], [[0, 60], [0, 80]], [[-60, 0], [-80, 0]], [[60, 0], [80, 0]], [[42, 42], [57, 57]], [[-42, -42], [-57, -57]], [[42, -42], [57, -57]], [[-42, 42], [-57, 57]]];
const SHIRT: Pt[][] = [[[-30, -70], [-80, -45], [-62, -5], [-45, -15], [-45, 75], [45, 75], [45, -15], [62, -5], [80, -45], [30, -70], [0, -48], [-30, -70]]];
const TROUSERS: Pt[][] = [[[-45, -75], [45, -75], [55, 80], [12, 80], [0, -20], [-12, 80], [-55, 80], [-45, -75]]];
const PLATE: Pt[][] = [ellipse(0, 0, 80, 80, 1, 0), ellipse(0, 0, 48, 48, 1, 0)];
const CUP: Pt[][] = [[[-45, -40], [45, -40], [38, 55], [-38, 55], [-45, -40]], [[45, -20], [75, -15], [72, 20], [40, 30]]];
const PEN: Pt[][] = [[[-60, 60], [40, -60], [60, -45], [-40, 75], [-60, 60]], [[-60, 60], [-72, 90], [-40, 75]]];
const PAPER: Pt[][] = [[[-55, -75], [30, -75], [55, -50], [55, 75], [-55, 75], [-55, -75]], [[-35, -30], [35, -30]], [[-35, 0], [35, 0]], [[-35, 30], [15, 30]]];
const FAM_ART = [[SUITCASE, BAG], [WRENCH, GEAR], [SHIRT, TROUSERS], [PLATE, CUP], [PEN, PAPER]];

type Wr = { text: string; x: number; y: number; size: number; at: number; dur: number; color: string; anchor?: "start" | "middle" };

export const WhiteboardSample: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLesson();
  const end = track("sm").reduce((a, s) => a + s.frames, 0);
  const boards = [0, L.why, L.unitMeans, L.family, L.endings, L.each, L.dont, end];
  const B = (b: number) => ({ from: boards[b], to: boards[b + 1] });

  const wr = (b: number, text: string, x: number, y: number, size: number, at: number, color: string, anchor: "start" | "middle" = "middle", dur?: number) =>
    ({ b, text, x, y, size, at, dur: dur ?? Math.max(8, Math.round(text.length * 0.9)), color, anchor });
  const writes: (Wr & { b: number })[] = [
    wr(0, "The furniture are expensive.", 540, 250, 70, L.q, BLACK, "middle", 40),
    wr(0, "contains many things:", 540, 385, 52, L.look, BLUE),
    ...["chair", "table", "sofa", "bed"].map((n, i) => wr(0, n, i % 2 ? 780 : 300, (i < 2 ? 620 : 930) + 150, 46, L.items[i] + 14, BLACK)),
    wr(0, "ONE UNIT = furniture", 540, 1250, 80, L.unit, BLUE),
    wr(1, "WHY?", 540, 300, 140, L.why, RED),
    wr(1, "chair = an object ✓", 290, 700, 44, L.notName, GREEN),
    wr(1, "furniture = an object? ✗", 790, 700, 44, L.notName + 12, RED),
    wr(1, "= the WHOLE collection", 540, 880, 72, L.collection, BLUE),
    wr(1, "furnish → furniture", 700, 1180, 64, L.furnish, ORANGE),
    wr(1, "everything you furnish", 700, 1290, 48, L.room, BLACK),
    wr(1, "a room with", 700, 1360, 48, L.room + 20, BLACK),
    wr(2, "unit = 1", 460, 520, 170, L.unitMeans, ORANGE, "middle", 22),
    wr(2, "1s", 900, 520, 150, L.addS, ORANGE, "middle", 8),
    wr(2, "1 is always SINGULAR", 540, 760, 78, L.singular, GREEN),
    wr(2, "The furniture IS expensive", 510, 1000, 74, L.so, GREEN, "middle", 30),
    wr(3, "the whole family:", 540, 230, 64, L.family, BLUE),
    ...FAMILY.map((m, i) => wr(3, m.w, 220, 390 + i * 250, 66, L.fam[i].word, m.c)),
    ...FAMILY.map((_, i) => wr(3, "1 unit", 960, 390 + i * 250, 50, L.fam[i].what + 14, ORANGE)),
    wr(4, "notice the endings", 540, 260, 70, L.endings, BLUE),
    ...ENDINGS.map(([r, s], i) => wr(4, r + s, 540, 470 + i * 200, 120, L.endWords[i], BLACK, "middle", 10)),
    wr(4, "= a whole collection", 540, 1330, 72, L.endNote, ORANGE),
    wr(5, "one unit → singular verb", 540, 230, 62, L.each, BLUE),
    ...["the luggage is heavy", "the equipment is new", "my clothing is wet"].map((t, i) => wr(5, t, 540, 370 + i * 110, 66, L.verbs[i], GREEN, "middle", 16)),
    wr(5, "need a number? count a piece", 540, 820, 58, L.count, BLUE),
    ...["two pieces of furniture", "three pieces of luggage", "an item of clothing"].map((t, i) => wr(5, t, 540, 960 + i * 110, 66, L.pieces[i], BLACK, "middle", 16)),
    wr(6, "memorise the list", 540, 300, 80, L.dont, BLACK),
    wr(6, "SEE THE UNIT", 540, 520, 130, L.seeUnit, BLUE, "middle", 14),
    wr(6, "many things", 540, 760, 90, L.rule[0], BLACK),
    wr(6, "one name", 540, 1000, 90, L.rule[1], BLUE),
    wr(6, "one verb", 540, 1240, 90, L.rule[2], GREEN),
  ];

  const dr = (b: number, strokes: Pt[][], at: number, dur: number, color: string, width = 8) => ({ b, strokes, at, dur, color, width });
  const endY = (i: number) => 470 + i * 200;
  const drawings: (Drawing & { b: number })[] = [
    dr(0, [W(ellipse(575, 228, 72, 50), 3)], L.wrong, 14, RED, 7),
    ...ARTS.map((a, i) => dr(0, art(a, i % 2 ? 780 : 300, i < 2 ? 620 : 930, 1.05, i * 7), L.items[i], 16, BLACK)),
    dr(0, [W(ellipse(540, 800, 500, 340), 11)], L.groups, 30, BLUE, 10),
    dr(1, art(CHAIR, 290, 520, 1, 40), L.notName - 4, 12, BLACK),
    dr(1, [...ARTS.map((a, i) => art(a, 700 + (i % 2) * 170, 470 + Math.floor(i / 2) * 110, 0.42, 50 + i)).flat(), W(ellipse(785, 525, 200, 150), 60)], L.notName + 4, 16, BLACK, 6),
    dr(1, [W([[80, 1030], [380, 1030], [380, 1420], [80, 1420], [80, 1030]], 70), ...ARTS.map((a, i) => art(a, 150 + (i % 2) * 160, 1130 + Math.floor(i / 2) * 170, 0.45, 80 + i)).flat()], L.furnish - 6, 20, BLACK, 6),
    dr(2, [W([[800, 420], [1000, 560]], 2), W([[1000, 420], [800, 560]], 3)], L.addS + 16, 8, RED, 11),
    dr(2, [W([[930, 985], [955, 1010], [1005, 945]], 9)], L.so + 32, 8, GREEN, 10),
    ...FAMILY.flatMap((_, i) => [
      dr(3, art(FAM_ART[i][0], 520, 370 + i * 250, 0.72, 100 + i), L.fam[i].what, 10, BLACK, 6),
      dr(3, art(FAM_ART[i][1], 700, 370 + i * 250, 0.72, 120 + i), L.fam[i].what + 10, 10, BLACK, 6),
      dr(3, arrowRight(780, 860, 370 + i * 250, 140 + i), L.fam[i].what + 12, 4, ORANGE, 6),
    ]),
    ...ENDINGS.map(([r, s], i) => {
      const full = tw(r + s, 120), x0 = 540 - full / 2, sx = x0 + tw(r, 120) + tw(s, 120) / 2;
      return dr(4, [W(ellipse(sx, endY(i) - 40, tw(s, 120) / 2 + 26, 62), 160 + i)], L.endNote + i * 6, 12, ORANGE, 7);
    }),
    ...[0, 1, 2].map((i) => {
      const t = ["the luggage is heavy", "the equipment is new", "my clothing is wet"][i];
      const full = tw(t, 66), x0 = 540 - full / 2, idx = t.indexOf(" is ") + 1;
      return dr(5, [W(ellipse(x0 + tw(t.slice(0, idx), 66) + tw("is", 66) / 2, 370 + i * 110 - 22, 40, 36), 170 + i)], L.verbs[i] + 16, 8, RED, 6);
    }),
    ...[0, 1, 2].map((i) => {
      const t = ["two pieces of furniture", "three pieces of luggage", "an item of clothing"][i];
      const word = i === 2 ? "item" : "pieces";
      const full = tw(t, 66), x0 = 540 - full / 2, idx = t.indexOf(word);
      const a = x0 + tw(t.slice(0, idx), 66), b = a + tw(word, 66);
      return dr(5, [W([[a, 975 + i * 110], [b, 975 + i * 110]], 180 + i)], L.pieces[i] + 16, 6, ORANGE, 8);
    }),
    dr(6, [W([[300, 272], [780, 272]], 190)], L.dont + 16, 8, RED, 10),
    dr(6, arrowDown(540, 800, 900, 200), L.rule[1] - 8, 6, BLACK, 7),
    dr(6, arrowDown(540, 1040, 1140, 202), L.rule[2] - 8, 6, BLACK, 7),
  ];

  // marker tip
  let tip: Pt | null = null;
  for (const d of drawings) { const s = drawState(d, f); if (s.tip) tip = s.tip; }
  for (const w of writes) {
    const p = (f - w.at) / w.dur;
    if (p > 0 && p < 1) {
      const ww = tw(w.text, w.size);
      const x0 = w.anchor === "middle" ? w.x - ww / 2 : w.x;
      tip = [x0 + p * ww, w.y - w.size * 0.3 + Math.sin(f * 2.1) * w.size * 0.15];
    }
  }
  const col = (() => {
    for (const d of drawings) if (f >= d.at && f <= d.at + d.dur) return d.color;
    for (const w of writes) if (f >= w.at && f <= w.at + w.dur) return w.color;
    return BLACK;
  })();

  // eraser between boards
  const wipe = boards.slice(1, -1).map((b) => ({ b, p: Math.max(0, Math.min(1, (f - (b - 10)) / 14)) }));

  return (
    <Full bg="#FBFBF7">
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(0,0,0,0.025), transparent 40%), radial-gradient(circle at 70% 75%, rgba(0,0,0,0.03), transparent 45%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, background: "linear-gradient(#C9CDD3, #9EA4AD)" }} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {boards.slice(0, -1).map((_, b) => {
          const { from, to } = B(b);
          if (f < from - 12 || f > to + 6) return null;
          const erase = b < boards.length - 2 ? wipe[b].p : 0;
          return (
            <g key={b}>
              <defs><clipPath id={`board${b}`}><rect x={1080 * erase} y={0} width={1080} height={1920} /></clipPath></defs>
              <g clipPath={`url(#board${b})`}>
                {writes.filter((w) => w.b === b).map((w, i) => (
                  <HandText key={i} id={`wb${b}_${i}`} text={w.text} x={w.x} y={w.y} size={w.size} w={tw(w.text, w.size)} p={(f - w.at) / w.dur} color={w.color} anchor={w.anchor} />
                ))}
                {drawings.filter((d) => d.b === b).map((d, i) => <Ink key={i} d={d} f={f} />)}
              </g>
            </g>
          );
        })}
        {/* eraser block sweeping across */}
        {wipe.map((w, i) => (w.p > 0 && w.p < 1 ? (
          <g key={i} transform={`translate(${1080 * w.p - 60} 0)`}>
            <rect x={-40} y={0} width={120} height={1650} fill="rgba(251,251,247,0.9)" />
            <g transform="translate(0 820)"><rect x={-70} y={-120} width={140} height={240} rx={16} fill="#2F4A7A" /><rect x={-70} y={60} width={140} height={60} rx={8} fill="#DDD" /></g>
          </g>
        ) : null))}
        {tip && <Marker x={tip[0]} y={tip[1]} color={col} />}
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1650, bottom: 0, background: "linear-gradient(rgba(20,24,36,0), rgba(20,24,36,0.88) 30%)" }} />
      <Karaoke cues={CAPS.sm} top={1720} />
      <TrackAudio id="sm" />
      {[...writes.map((w) => w.at), ...drawings.map((d) => d.at)].filter((a, i, arr) => arr.findIndex((x) => Math.abs(x - a) < 20) === i).map((a, i) => <Fx key={i} at={a} name="scratch" volume={0.13} />)}
      {boards.slice(1, -1).map((b, i) => <Fx key={`e${i}`} at={b - 10} name="whoosh" volume={0.22} />)}
    </Full>
  );
};

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
