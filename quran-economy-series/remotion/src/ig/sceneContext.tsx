import React, {createContext, useContext} from 'react';
import {FPS} from './theme';
import type {Episode, Scene, SceneTiming} from './registry';

/** lead: frames of visual crossfade before this scene's voice starts (scene frame `lead` = voice time 0). */
type Ctx = {ep: Episode; scene: Scene; timing: SceneTiming; index: number; frames: number; lead: number};
const SceneCtx = createContext<Ctx | null>(null);
export const SceneProvider = SceneCtx.Provider;

export const useScene = () => {
  const c = useContext(SceneCtx);
  if (!c) throw new Error('useScene outside a scene');
  return c;
};

/** Frame (scene-relative) at which narration sentence `i` starts; fractional i interpolates into it. */
export const useCue = () => {
  const {timing, lead} = useScene();
  return (at: number | undefined, offset = 0) => {
    if (at === undefined) return offset + lead;
    const i = Math.floor(at);
    const s = timing.sentences[Math.min(i, timing.sentences.length - 1)];
    const frac = at - i;
    return Math.round((s.start + frac * (s.end - s.start)) * FPS) + offset + lead;
  };
};
