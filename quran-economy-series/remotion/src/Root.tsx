import './fonts';
import React from 'react';
import {Composition, Still} from 'remotion';
import {RizqPilot, pilotSchemaDefaults} from './RizqPilot';
import {TOTAL_FRAMES, FPS} from './data/pilot';
import {TypeSpecimen} from './TypeSpecimen';

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
  </>
);
