import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Paper} from '../components/Backdrop';
import {progress} from '../components/motion';
import {SceneChrome} from '../components/Scene';
import {ArabicReveal, KineticHeading, UrduLine} from '../components/Type';
import {FPS, SCENES, TEXT} from '../data/pilot';
import {C} from '../theme';

const Plate: React.FC<{draw: number}> = ({draw}) => {
  const dash = (len: number) => ({strokeDasharray: len, strokeDashoffset: len * (1 - draw)});
  return (
    <svg width={420} height={300} viewBox="-210 -150 420 300">
      <ellipse cx={0} cy={20} rx={190} ry={78} fill="none" stroke={C.ink} strokeWidth={2.2} style={dash(900)} />
      <ellipse cx={0} cy={20} rx={138} ry={52} fill="none" stroke={C.ink} strokeWidth={1.2} opacity={0.6} style={dash(640)} />
      {/* bread */}
      <path
        d="M -70 18 C -72 -20, -30 -34, 0 -34 C 30 -34, 72 -20, 70 18 C 40 30, -40 30, -70 18 Z"
        fill={C.paperDeep} fillOpacity={draw} stroke={C.ink} strokeWidth={2} style={dash(420)}
      />
      <path d="M -40 -12 q 10 -8 20 0 M -6 -18 q 10 -8 20 0 M 26 -12 q 10 -8 20 0" fill="none" stroke={C.inkSoft} strokeWidth={1.4} style={dash(120)} />
      {/* wheat stalk as a quiet signature */}
      <g opacity={draw} transform="translate(150,-70) rotate(18)">
        <line x1={0} y1={0} x2={0} y2={70} stroke={C.gold} strokeWidth={1.6} />
        {[0, 14, 28].map((y) => (
          <g key={y}>
            <ellipse cx={-6} cy={y + 6} rx={4} ry={9} fill="none" stroke={C.gold} strokeWidth={1.4} transform={`rotate(-25 ${-6} ${y + 6})`} />
            <ellipse cx={6} cy={y + 6} rx={4} ry={9} fill="none" stroke={C.gold} strokeWidth={1.4} transform={`rotate(25 6 ${y + 6})`} />
          </g>
        ))}
      </g>
    </svg>
  );
};

export const S1Food: React.FC<{subtitles: boolean}> = ({subtitles}) => {
  const f = useCurrentFrame();
  const spec = SCENES.food;
  const lift = progress(f, 4.4 * FPS, 26);
  const plateY = interpolate(lift, [0, 1], [0, -150]);
  const plateScale = interpolate(lift, [0, 1], [1.15, 0.85]);
  return (
    <Paper>
      <SceneChrome spec={spec} subtitles={subtitles}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <div style={{transform: `translateY(${plateY}px) scale(${plateScale})`}}>
            <Plate draw={progress(f, 6, 70)} />
          </div>
        </AbsoluteFill>
        <div style={{position: 'absolute', top: 150, width: '100%'}}>
          <KineticHeading text={TEXT.food.heading} start={2} size={58} color={C.gold} style={{opacity: 1 - lift}} />
        </div>
        <div style={{position: 'absolute', top: 520, width: '100%'}}>
          <ArabicReveal text={TEXT.food.ayah} start={4.9 * FPS} size={86} dur={46} />
          <UrduLine text={TEXT.food.translation} start={6.3 * FPS} size={40} style={{marginTop: -6}} />
        </div>
      </SceneChrome>
    </Paper>
  );
};
