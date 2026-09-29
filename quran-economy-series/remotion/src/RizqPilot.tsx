import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {progress} from './components/motion';
import {FPS, SCENE_ORDER, SCENES, TRANSITION, VO_LEAD} from './data/pilot';
import {SceneTime} from './components/sceneTime';
import {S1Food} from './scenes/S1Food';
import {S2Rizq} from './scenes/S2Rizq';
import {S3Chain} from './scenes/S3Chain';
import {S4Map} from './scenes/S4Map';
import {S5Close} from './scenes/S5Close';

export type PilotProps = {
  /** Show the narration script as timed subtitles (for review before VO is recorded). */
  subtitles: boolean;
  /** Play the recorded Urdu voice-over (public/vo/s1.mp3 … s5.mp3). */
  voice: boolean;
};

export const pilotSchemaDefaults: PilotProps = {subtitles: true, voice: true};

const COMPONENTS = {food: S1Food, rizq: S2Rizq, chain: S3Chain, map: S4Map, close: S5Close};

/** Ink wipe: the incoming scene is revealed right to left (Urdu reading direction) with a feathered edge. */
const InkWipe: React.FC<{children: React.ReactNode; enabled: boolean}> = ({children, enabled}) => {
  const f = useCurrentFrame();
  if (!enabled) return <>{children}</>;
  const p = progress(f, 0, TRANSITION);
  const edge = 12;
  const pos = (1 - p) * (100 + edge);
  const mask = `linear-gradient(to left, #000 0%, #000 ${Math.max(0, 100 - pos)}%, transparent ${Math.min(100, 100 - pos + edge)}%)`;
  return <AbsoluteFill style={p >= 1 ? undefined : {WebkitMaskImage: mask, maskImage: mask}}>{children}</AbsoluteFill>;
};

export const RizqPilot: React.FC<PilotProps> = ({subtitles, voice}) => {
  let from = 0;
  return (
    <AbsoluteFill style={{backgroundColor: '#F3E9D2'}}>
      {SCENE_ORDER.map((key, i) => {
        const Comp = COMPONENTS[key];
        const dur = SCENES[key].durationInFrames;
        const seq = (
          <Sequence key={key} from={from} durationInFrames={dur} name={`${SCENES[key].id} ${key}`}>
            <InkWipe enabled={i > 0}>
              <SceneTime design={SCENES[key].designFrom} real={SCENES[key].narration.map((l) => l.from)}>
                <Comp subtitles={subtitles} />
              </SceneTime>
            </InkWipe>
            {voice ? (
              <Sequence from={Math.round(VO_LEAD * FPS)} name="voice-over">
                <Audio src={staticFile(SCENES[key].voice)} />
              </Sequence>
            ) : null}
          </Sequence>
        );
        from += dur - TRANSITION;
        return seq;
      })}
    </AbsoluteFill>
  );
};
