import epi01 from './episodes/epi01.json';
import epi01t from './episodes/epi01.timing.json';
import epi02 from './episodes/epi02.json';
import epi02t from './episodes/epi02.timing.json';
import epi03 from './episodes/epi03.json';
import epi03t from './episodes/epi03.timing.json';

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
  epi02: {ep: epi02 as Episode, timing: epi02t as Timing},
  epi03: {ep: epi03 as Episode, timing: epi03t as Timing},
};
