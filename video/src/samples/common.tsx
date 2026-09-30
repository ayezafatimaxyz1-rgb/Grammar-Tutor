// Shared helpers for the style samples: whole-track cues, stroke drawing, handwriting reveal.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { Seg, TIMINGS } from "../timing";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export const track = (id: string) => (TIMINGS as unknown as { videos: Record<string, Seg[]> }).videos[id];

/** Absolute frame (from video start) at which a phrase is spoken anywhere in the track. */
export const useTrackCue = (id: string) => {
  const { fps } = useVideoConfig();
  const segs = track(id);
  return (phrase: string, offsetSec = 0, nth = 0) => {
    const target = phrase.split(/\s+/).map(norm).filter(Boolean);
    let seen = 0;
    for (const seg of segs) {
      const words = seg.words.map((w) => norm(w.w));
      for (let i = 0; i + target.length <= words.length; i++) {
        if (target.every((t, k) => words[i + k] === t)) {
          if (seen === nth) return seg.startFrame + Math.round((seg.lead + seg.words[i].t + offsetSec) * fps);
          seen++;
        }
      }
    }
    throw new Error(`cue "${phrase}" not found in ${id}`);
  };
};

export const useSegStart = (id: string) => {
  const { fps } = useVideoConfig();
  const segs = track(id);
  return (i: number, offsetSec = 0) => segs[i].startFrame + Math.round((segs[i].lead + offsetSec) * fps);
};

/** Narration for every segment of a track. */
export const TrackAudio: React.FC<{ id: string }> = ({ id }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {track(id).map((seg) => (
        <Sequence key={seg.id} from={seg.startFrame + Math.round(seg.lead * fps)} layout="none">
          <Audio src={staticFile(seg.audio)} />
        </Sequence>
      ))}
    </>
  );
};

export const Full: React.FC<{ children: React.ReactNode; bg: string }> = ({ children, bg }) => (
  <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>{children}</AbsoluteFill>
);

/* ------------------------------------------------------------------ strokes */

export type Pt = [number, number];

/** Deterministic wobble so marker lines look hand drawn. */
export const wobble = (pts: Pt[], amp = 2.5, seed = 1): Pt[] =>
  pts.map(([x, y], i) => [x + Math.sin(i * 0.23 + seed) * amp + Math.sin(i * 0.61 + seed * 2) * amp * 0.4, y + Math.cos(i * 0.19 + seed * 1.3) * amp + Math.cos(i * 0.53 + seed) * amp * 0.4]);

/** Densify a polyline so wobble and partial drawing look smooth. */
export const dense = (pts: Pt[], step = 8): Pt[] => {
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const n = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / step));
    for (let k = 0; k < n; k++) out.push([x1 + ((x2 - x1) * k) / n, y1 + ((y2 - y1) * k) / n]);
  }
  out.push(pts[pts.length - 1]);
  return out;
};

export const ellipse = (cx: number, cy: number, rx: number, ry: number, turns = 1.08, start = -1.9): Pt[] =>
  Array.from({ length: 90 }, (_, i) => {
    const a = start + (i / 89) * Math.PI * 2 * turns;
    const r = 1 + 0.03 * Math.sin(i / 6);
    return [cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r] as Pt;
  });

const len = (pts: Pt[]) => pts.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);

/** Portion of a polyline drawn at progress p, plus the tip position. */
export const partial = (pts: Pt[], p: number): { pts: Pt[]; tip: Pt } => {
  if (p <= 0) return { pts: [], tip: pts[0] };
  if (p >= 1) return { pts, tip: pts[pts.length - 1] };
  const total = len(pts);
  let acc = 0;
  const out: Pt[] = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (acc + d >= p * total) {
      const r = (p * total - acc) / d;
      const tip: Pt = [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * r, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * r];
      out.push(tip);
      return { pts: out, tip };
    }
    acc += d;
    out.push(pts[i]);
  }
  return { pts, tip: pts[pts.length - 1] };
};

export const toD = (pts: Pt[]) => (pts.length ? "M" + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L") : "");

/** A drawing made of several strokes, drawn one after another between `at` and `at + dur`. */
export type Drawing = { strokes: Pt[][]; at: number; dur: number; color: string; width?: number };

export const drawState = (d: Drawing, f: number) => {
  const p = Math.max(0, Math.min(1, (f - d.at) / d.dur));
  const lens = d.strokes.map(len);
  const total = lens.reduce((a, b) => a + b, 0);
  let budget = p * total;
  let tip: Pt | null = null;
  const parts = d.strokes.map((s, i) => {
    if (budget <= 0) return [] as Pt[];
    const q = Math.min(1, budget / lens[i]);
    budget -= lens[i];
    const r = partial(s, q);
    if (q < 1 || (i === d.strokes.length - 1 && p < 1)) tip = tip ?? r.tip;
    return r.pts;
  });
  return { parts, tip: p > 0 && p < 1 ? tip : null, active: p > 0 && p < 1 };
};

export const Ink: React.FC<{ d: Drawing; f: number }> = ({ d, f }) => {
  const st = drawState(d, f);
  return (
    <g fill="none" stroke={d.color} strokeWidth={d.width ?? 8} strokeLinecap="round" strokeLinejoin="round">
      {st.parts.map((p, i) => <path key={i} d={toD(p)} />)}
    </g>
  );
};

/** Current writing tip across a list of drawings (for the pen/marker to follow). */
export const tipOf = (ds: Drawing[], f: number): Pt | null => {
  for (const d of ds) {
    const s = drawState(d, f);
    if (s.tip) return s.tip;
  }
  return null;
};

/** Handwritten text revealed left to right; exact width via textLength so the pen can follow. */
export const HandText: React.FC<{ text: string; x: number; y: number; size: number; w: number; p: number; color: string; font?: string; id: string; anchor?: "start" | "middle" }> = ({
  text, x, y, size, w, p, color, font = "'Patrick Hand'", id, anchor = "start",
}) => {
  const x0 = anchor === "middle" ? x - w / 2 : x;
  return (
    <g>
      <defs><clipPath id={id}><rect x={x0 - 10} y={y - size * 1.2} width={(w + 20) * Math.max(0, Math.min(1, p))} height={size * 1.8} /></clipPath></defs>
      <text x={x0} y={y} fontSize={size} fill={color} fontFamily={font} textLength={w} lengthAdjust="spacingAndGlyphs" clipPath={`url(#${id})`}>{text}</text>
    </g>
  );
};
