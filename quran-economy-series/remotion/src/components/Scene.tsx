import React from 'react';
import {AbsoluteFill} from 'remotion';
import {SceneSpec} from '../data/pilot';
import {Badges, SeriesTag, SourceStrip, Subtitles} from './Chrome';

/** Shared chrome for every scene: badges, source strip, series tag, optional review subtitles. */
export const SceneChrome: React.FC<{spec: SceneSpec; dark?: boolean; subtitles: boolean; children: React.ReactNode}> = ({
  spec, dark, subtitles, children,
}) => (
  <AbsoluteFill>
    {children}
    <SeriesTag dark={dark} />
    <Badges kinds={spec.badges} />
    <SourceStrip text={spec.source} dark={dark} />
    {subtitles ? <Subtitles lines={spec.narration} dark={dark} /> : null}
  </AbsoluteFill>
);
