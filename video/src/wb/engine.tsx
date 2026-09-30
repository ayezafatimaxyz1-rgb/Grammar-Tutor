// Whiteboard engine: items written by a hand (marker text, script text, ink strokes, photos) or
// popped on in a formal font (headings, boxes, highlights). Boards are wiped with an eraser.
import React from "react";
import { staticFile, useVideoConfig } from "remotion";
import { Pt, dense, drawState, ellipse, toD, track, wobble } from "../samples/common";
import METRICS from "./metrics.json";

export const VW = 1920, VH = 1080;
export const C = {
  ink: "#1D1F24", navy: "#1E3A5F", blue: "#2257B8", red: "#D7263D", green: "#15803D", orange: "#C9731C", gold: "#B8912A",
  teal: "#138A7E", purple: "#8E3FB0", pink: "#D0336E", grey: "#667085", yellow: "#FBE7A1", cream: "#FFF8E6", paper: "#F2F3F5",
};

export type Font = "hand" | "script" | "f800" | "f700" | "f400i";
const FAM: Record<Font, { family: string; weight: number; style?: string }> = {
  hand: { family: "'Patrick Hand'", weight: 400 },
  script: { family: "Caveat", weight: 700 },
  f800: { family: "Inter", weight: 800 },
  f700: { family: "Inter", weight: 700 },
  f400i: { family: "Inter", weight: 400, style: "italic" },
};
const MX = METRICS as Record<Font, { upm: number; w: Record<string, number>; fallback: number }>;

/** Rendered width of a string (from the real font metrics) so the hand and highlights line up. */
export const tw = (t: string, size: number, font: Font = "hand") => {
  const m = MX[font];
  return ([...t].reduce((a, c) => a + (m.w[c] ?? m.fallback), 0) * size) / m.upm;
};

export const W = (pts: Pt[], seed: number, amp = 2) => wobble(dense(pts, 7), amp, seed);
export const arrow = (x1: number, y1: number, x2: number, y2: number, s: number, head = 20): Pt[][] => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = (d: number): Pt => [x2 - head * Math.cos(a + d), y2 - head * Math.sin(a + d)];
  return [W([[x1, y1], [x2, y2]], s), W([h(0.5), [x2, y2], h(-0.5)], s + 1, 1)];
};
export const check = (x: number, y: number, k: number, s: number): Pt[][] => [W([[x - k, y], [x - k * 0.35, y + k * 0.7], [x + k, y - k * 0.95]], s, 1.2)];
export const cross = (x: number, y: number, k: number, s: number): Pt[][] => [W([[x - k, y - k], [x + k, y + k]], s, 1.2), W([[x + k, y - k], [x - k, y + k]], s + 1, 1.2)];
export const under = (x1: number, x2: number, y: number, s: number): Pt[][] => [W([[x1, y], [x2, y + 4]], s, 1.5)];
export const loop = (cx: number, cy: number, rx: number, ry: number, s: number, turns = 1.1): Pt[][] => [W(ellipse(cx, cy, rx, ry, turns, -2.2), s, 3)];
export const strike = (x1: number, x2: number, y: number, s: number): Pt[][] => [W([[x1 - 8, y + 4], [x2 + 8, y - 6]], s, 1.5)];

export type Anchor = "start" | "middle";
export type Item =
  | { k: "text"; b: number; text: string; x: number; y: number; size: number; color: string; font: Font; at: number; dur: number; anchor: Anchor; hand: boolean }
  | { k: "ink"; b: number; strokes: Pt[][]; at: number; dur: number; color: string; width: number }
  | { k: "photo"; b: number; src: string; x: number; y: number; w: number; h: number; at: number; dur: number }
  | { k: "rect"; b: number; x: number; y: number; w: number; h: number; fill: string; stroke?: string; sw?: number; r?: number; at: number; dur: number; mode: "pop" | "grow" };

export const writeDur = (t: string) => Math.min(46, Math.max(8, Math.round(t.length * 1.6)));

/** Beat-local cue: absolute frame of a phrase inside one narration beat (so repeated words are never ambiguous). */
export const useBeatCue = (video: string) => {
  const { fps } = useVideoConfig();
  const segs = track(video);
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const seg = (id: string) => {
    const s = segs.find((x) => x.id === `${video}_${id}`);
    if (!s) throw new Error(`beat ${id} not found`);
    return s;
  };
  const cue = (id: string, phrase: string, off = 0, nth = 0) => {
    const s = seg(id);
    const target = phrase.split(/\s+/).map(norm).filter(Boolean);
    const words = s.words.map((w) => norm(w.w));
    let seen = 0;
    for (let i = 0; i + target.length <= words.length; i++) {
      if (target.every((t, k) => words[i + k] === t)) {
        if (seen === nth) return s.startFrame + Math.round((s.lead + s.words[i].t + off) * fps);
        seen++;
      }
    }
    throw new Error(`cue "${phrase}" not found in beat ${id}`);
  };
  const has = (id: string, phrase: string) => { try { cue(id, phrase); return true; } catch { return false; } };
  const start = (id: string, off = 0) => seg(id).startFrame + Math.round(off * fps);
  return { cue, has, start, segs };
};

/* ------------------------------------------------------------------ drawing */

export const Draw: React.FC<{ it: Item; f: number; id: string }> = ({ it, f, id }) => {
  const p = Math.max(0, Math.min(1, (f - it.at) / it.dur));
  if (f < it.at) return null;
  if (it.k === "ink") {
    const st = drawState({ strokes: it.strokes, at: it.at, dur: it.dur, color: it.color }, f);
    return <g fill="none" stroke={it.color} strokeWidth={it.width} strokeLinecap="round" strokeLinejoin="round">{st.parts.map((pts, i) => <path key={i} d={toD(pts)} />)}</g>;
  }
  if (it.k === "photo") {
    return (
      <g>
        <defs><clipPath id={id}><rect x={it.x - 8} y={it.y - 8} width={(it.w + 16) * p} height={it.h + 16} /></clipPath></defs>
        <image href={staticFile(it.src)} x={it.x} y={it.y} width={it.w} height={it.h} clipPath={`url(#${id})`} preserveAspectRatio="xMidYMid meet" />
      </g>
    );
  }
  if (it.k === "rect") {
    if (it.mode === "grow") return <rect x={it.x} y={it.y} width={it.w * p} height={it.h} rx={it.r ?? 4} fill={it.fill} />;
    const e = 1 - Math.pow(1 - p, 3), s = 0.92 + 0.08 * e;
    return (
      <g opacity={e} transform={`translate(${it.x + it.w / 2} ${it.y + it.h / 2}) scale(${s}) translate(${-it.x - it.w / 2} ${-it.y - it.h / 2})`}>
        <rect x={it.x} y={it.y} width={it.w} height={it.h} rx={it.r ?? 10} fill={it.fill} stroke={it.stroke} strokeWidth={it.sw ?? 0} />
      </g>
    );
  }
  const fam = FAM[it.font];
  const w = tw(it.text, it.size, it.font), x0 = it.anchor === "middle" ? it.x - w / 2 : it.x;
  const txt = (
    <text x={x0} y={it.y} fontSize={it.size} fill={it.color} fontFamily={fam.family} fontWeight={fam.weight} fontStyle={fam.style} style={{ whiteSpace: "pre" }}>{it.text}</text>
  );
  if (it.hand) {
    return (
      <g>
        <defs><clipPath id={id}><rect x={x0 - 14} y={it.y - it.size * 1.15} width={(w + 28) * p} height={it.size * 1.7} /></clipPath></defs>
        <g clipPath={`url(#${id})`}>{txt}</g>
      </g>
    );
  }
  const e = 1 - Math.pow(1 - p, 3);
  return <g opacity={e} transform={`translate(0 ${(1 - e) * 14})`}>{txt}</g>;
};

/** Where the marker tip is while an item is being drawn (p in 0..1). */
export const tipOf = (it: Item, p: number): Pt | null => {
  if (it.k === "text") {
    if (!it.hand) return null;
    const w = tw(it.text, it.size, it.font), x0 = it.anchor === "middle" ? it.x - w / 2 : it.x;
    return [x0 + p * w, it.y - it.size * 0.28 + Math.sin(p * w * 0.09) * it.size * 0.16];
  }
  if (it.k === "photo") return [it.x + p * it.w, it.y + it.h * (0.5 + 0.38 * Math.sin(p * Math.PI * 7))];
  if (it.k === "rect") return null;
  const st = drawState({ strokes: it.strokes, at: 0, dur: 1, color: "" }, Math.max(0.001, Math.min(0.999, p)));
  const last = it.strokes[it.strokes.length - 1];
  return st.tip ?? last[last.length - 1];
};

/** A right hand holding a marker; (x, y) is the marker tip. */
export const Hand: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => {
  const SK = "#F1C4A0", SKD = "#D89C74";
  return (
    <g transform={`translate(${x} ${y}) rotate(-38)`}>
      <ellipse cx={260} cy={120} rx={260} ry={70} fill="rgba(0,0,0,0.12)" transform="rotate(38 260 120)" />
      <path d="M250 30 Q420 10 900 20 L900 190 Q420 200 250 150 Z" fill={SK} stroke={SKD} strokeWidth={3} />
      <path d="M430 8 L900 0 L900 210 L430 196 Q455 100 430 8 Z" fill="#2E4C8F" />
      <path d="M430 8 Q455 100 430 196" fill="none" stroke="#243C72" strokeWidth={8} />
      <ellipse cx={265} cy={70} rx={120} ry={88} fill={SK} stroke={SKD} strokeWidth={3} />
      <ellipse cx={205} cy={112} rx={58} ry={26} fill={SK} stroke={SKD} strokeWidth={3} />
      <ellipse cx={170} cy={72} rx={62} ry={25} fill={SK} stroke={SKD} strokeWidth={3} />
      <path d="M0 0 L24 -11 L24 11 Z" fill={color} />
      <rect x={22} y={-20} width={40} height={40} rx={6} fill="#2B2B2F" />
      <rect x={60} y={-24} width={260} height={48} rx={12} fill="#F3F3F3" stroke="#BDBDBD" strokeWidth={3} />
      <rect x={150} y={-24} width={70} height={48} fill={color} opacity={0.92} />
      <rect x={310} y={-24} width={34} height={48} rx={10} fill={color} />
      <path d="M78 22 Q70 42 96 46 L200 44 Q222 30 200 16 L96 14 Q80 12 78 22 Z" fill={SK} stroke={SKD} strokeWidth={3} />
      <path d="M92 -20 Q84 -40 110 -44 L215 -34 Q240 -20 222 -4 L110 -6 Q94 -8 92 -20 Z" fill={SK} stroke={SKD} strokeWidth={3} />
      <path d="M98 -30 Q104 -36 114 -34" fill="none" stroke={SKD} strokeWidth={3} />
    </g>
  );
};

export const Eraser: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x - 40} 0)`}>
    <rect x={-60} y={112} width={130} height={940} fill="rgba(253,253,251,0.94)" />
    <g transform="translate(0 580) rotate(90)">
      <rect x={-150} y={-55} width={300} height={110} rx={18} fill="#2F4A7A" />
      <rect x={-150} y={30} width={300} height={34} rx={8} fill="#E3E3E3" />
      <text x={0} y={-6} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={30} fill="#fff">ERASER</text>
    </g>
  </g>
);
