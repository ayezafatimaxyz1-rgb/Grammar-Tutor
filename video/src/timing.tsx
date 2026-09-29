import React, { createContext, useContext } from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import timings from "./timings.json";

export type Word = { w: string; t: number };
export type Seg = {
  id: string; scene: string; audio: string; start: number; startFrame: number;
  frames: number; lead: number; audioDur: number; words: Word[]; text: string;
};

export const TIMINGS = timings as unknown as {
  fps: number; main: Seg[]; shorts: Record<string, Seg[]>;
};

const SegContext = createContext<Seg | null>(null);
export const SegProvider: React.FC<{ seg: Seg; children: React.ReactNode }> = ({ seg, children }) => (
  <SegContext.Provider value={seg}>{children}</SegContext.Provider>
);

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Returns a function that converts a phrase in this scene's narration into the
 * frame (relative to the scene start) at which the narrator says it.
 * Animations are keyed to words, so re-recording narration keeps them in sync.
 */
export const useCue = () => {
  const seg = useContext(SegContext);
  const { fps } = useVideoConfig();
  if (!seg) throw new Error("useCue outside SegProvider");
  return (phrase: string, offsetSec = 0, nth = 0) => {
    const target = phrase.split(/\s+/).map(norm).filter(Boolean);
    const words = seg.words.map((w) => norm(w.w));
    let hit = -1;
    let seen = 0;
    for (let i = 0; i + target.length <= words.length; i++) {
      if (target.every((t, k) => words[i + k] === t)) {
        if (seen === nth) { hit = i; break; }
        seen++;
      }
    }
    if (hit < 0) throw new Error(`cue "${phrase}" not found in ${seg.id}`);
    return Math.round((seg.lead + seg.words[hit].t + offsetSec) * fps);
  };
};

export const useSeg = () => {
  const seg = useContext(SegContext);
  if (!seg) throw new Error("useSeg outside SegProvider");
  return seg;
};

const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** 0 → 1 progress starting at frame `at` over `dur` frames. */
export const prog = (f: number, at: number, dur = 15) =>
  interpolate(f, [at, at + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

/** Fade + rise in. */
export const fadeUp = (f: number, at: number, dur = 15, dist = 24): React.CSSProperties => {
  const p = prog(f, at, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
};

/** Springy pop scale, 0 → 1. */
export const usePop = () => {
  const { fps } = useVideoConfig();
  return (f: number, at: number) =>
    f < at ? 0 : spring({ frame: f - at, fps, config: { damping: 12, stiffness: 160, mass: 0.7 } });
};

export const useF = () => useCurrentFrame();

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
