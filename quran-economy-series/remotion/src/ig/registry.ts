import epi01 from './episodes/epi01.json';
import epi01t from './episodes/epi01.timing.json';

export type Scene = {
  template: string;
  badges: string[];
  source: string;
  narration: string[];
  props: Record<string, any>;
};
export type Episode = {id: string; number: number; title: string; next: string; covers: string[]; scenes: Scene[]};
export type Word = {w: string; start: number; end: number};
export type Sentence = {text: string; start: number; end: number; words: Word[]};
export type SceneTiming = {voice: string; duration: number; sentences: Sentence[]};
export type Timing = {id: string; fps: number; scenes: SceneTiming[]};

export const EPISODES: Record<string, {ep: Episode; timing: Timing}> = {
  epi01: {ep: epi01 as Episode, timing: epi01t as Timing},
};
