import './fonts';
import React from 'react';
import {AbsoluteFill, Audio, Loop, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Navy, Paper} from '../components/Backdrop';
import {progress} from '../components/motion';
import {Badges, Captions, Header, Source} from './Chrome';
import {EPISODES} from './registry';
import {SceneProvider} from './sceneContext';
import {Sfx, TEMPLATES} from './templates';
import {FPS} from './theme';

export const LEAD = 10; // frames of crossfade into each scene before its voice starts

export type EpisodeProps = {episode: string; captions: boolean; ambience: boolean};

export const episodeFrames = (id: string) =>
  EPISODES[id].timing.scenes.reduce((sum, s) => sum + Math.round(s.duration * FPS), 0);

const Fade: React.FC<{enabled: boolean; children: React.ReactNode}> = ({enabled, children}) => {
  const f = useCurrentFrame();
  const p = enabled ? progress(f, 0, LEAD) : 1;
  return <AbsoluteFill style={{opacity: p, transform: `scale(${1.02 - 0.02 * p})`}}>{children}</AbsoluteFill>;
};

export const EpisodeVideo: React.FC<EpisodeProps> = ({episode, captions, ambience}) => {
  const {ep, timing} = EPISODES[episode];
  let start = 0;
  return (
    <AbsoluteFill style={{backgroundColor: '#0E1B2C'}}>
      {ep.scenes.map((scene, i) => {
        const frames = Math.round(timing.scenes[i].duration * FPS);
        const lead = i === 0 ? 0 : LEAD;
        const def = TEMPLATES[scene.template];
        if (!def) throw new Error(`Unknown template ${scene.template}`);
        const T = def.C;
        const seq = (
          <Sequence key={i} from={start - lead} durationInFrames={frames + lead} name={`${i + 1} ${scene.template}`}>
            <SceneProvider value={{ep, scene, timing: timing.scenes[i], index: i, frames, lead}}>
              <Fade enabled={i > 0}>
                {def.bg === 'paper' ? <Paper /> : def.bg === 'navy' ? <Navy /> : null}
                <T />
                <Header dark={def.headerDark} number={ep.number} />
                <Badges kinds={scene.badges} />
                <Source text={scene.source} dark={def.sourceDark} />
                {captions ? <Captions /> : null}
              </Fade>
              <Sequence from={lead} name="voice" layout="none">
                <Audio src={staticFile(timing.scenes[i].voice)} />
              </Sequence>
              {i > 0 ? <Sfx name="whoosh" at={0} volume={0.35} /> : null}
            </SceneProvider>
          </Sequence>
        );
        start += frames;
        return seq;
      })}
      {ambience ? (
        <Loop durationInFrames={28 * FPS} name="ambience">
          <Audio src={staticFile('ig/sfx/ambience.wav')} volume={0.12} />
        </Loop>
      ) : null}
    </AbsoluteFill>
  );
};
