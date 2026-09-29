import './fonts';
import React from 'react';
import {Composition, Still} from 'remotion';
import {RizqPilot, pilotSchemaDefaults} from './RizqPilot';
import {TOTAL_FRAMES, FPS} from './data/pilot';
import {TypeSpecimen} from './TypeSpecimen';
import {EpisodeVideo, episodeFrames} from './ig/Episode';
import {EPISODES} from './ig/registry';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="RizqPilot"
      component={RizqPilot}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={pilotSchemaDefaults}
    />
    <Still id="TypeSpecimen" component={TypeSpecimen} width={1920} height={1080} />
    {Object.keys(EPISODES).map((id) => (
      <Composition
        key={id}
        id={`QGE-${id.toUpperCase()}`}
        component={EpisodeVideo}
        durationInFrames={episodeFrames(id)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{episode: id, captions: true, ambience: true}}
      />
    ))}
  </>
);
