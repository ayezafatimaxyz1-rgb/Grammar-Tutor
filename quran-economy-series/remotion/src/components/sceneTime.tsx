import React, {createContext, useContext} from 'react';
import {useCurrentFrame} from 'remotion';
import {FPS} from '../data/pilot';

// Visual cues in the scene files are written in "design time": the sentence start times the
// animation was first built against. When a recorded voice-over puts sentences elsewhere, this
// maps real time back to design time piecewise-linearly between sentence starts, so every cue
// still lands on its sentence without rewriting the scenes.
type Breaks = {design: number[]; real: number[]};
const Ctx = createContext<Breaks | null>(null);

export const SceneTime: React.FC<{design: number[]; real: number[]; children: React.ReactNode}> = ({design, real, children}) => (
  <Ctx.Provider value={{design: [0, ...design], real: [0, ...real]}}>{children}</Ctx.Provider>
);

const toDesign = (t: number, {design, real}: Breaks) => {
  let i = 0;
  while (i < real.length - 1 && t >= real[i + 1]) i++;
  if (i === real.length - 1) return design[i] + (t - real[i]); // after the last sentence: real speed
  const u = (t - real[i]) / (real[i + 1] - real[i]);
  return design[i] + u * (design[i + 1] - design[i]);
};

/** Drop-in replacement for useCurrentFrame() inside scenes: returns the design-time frame. */
export const useSceneFrame = () => {
  const frame = useCurrentFrame();
  const b = useContext(Ctx);
  return b ? toDesign(frame / FPS, b) * FPS : frame;
};
