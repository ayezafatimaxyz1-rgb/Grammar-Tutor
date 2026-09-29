import React from 'react';
import {interpolate} from 'remotion';
import {useSceneFrame} from '../components/sceneTime';
import {Paper} from '../components/Backdrop';
import {progress} from '../components/motion';
import {SceneChrome} from '../components/Scene';
import {ArabicReveal, UrduLine} from '../components/Type';
import {FPS, SCENES, TEXT} from '../data/pilot';
import {C, F} from '../theme';
import {uthmani} from '../components/uthmani';

export const S5Close: React.FC<{subtitles: boolean}> = ({subtitles}) => {
  const f = useSceneFrame();
  const spec = SCENES.close;
  const rings = progress(f, 0.4 * FPS, 50);
  const fill = progress(f, 7.6 * FPS, 24);
  const merge = progress(f, 10.4 * FPS, 30);
  const endCard = progress(f, 13.8 * FPS, 20);
  const gap = interpolate(merge, [0, 1], [150, 96]);
  const r = 128;
  const cy = 690;
  const circ = 2 * Math.PI * r;

  return (
    <Paper>
      <SceneChrome spec={spec} subtitles={subtitles}>
        <div style={{position: 'absolute', top: 170, width: '100%'}}>
          <UrduLine text="سورۂ قریش" start={4} size={30} color={C.gold} />
        </div>
        <div style={{position: 'absolute', top: 260, width: '100%'}}>
          <ArabicReveal text={TEXT.close.ayah} start={1.0 * FPS} size={78} dur={60} />
          <UrduLine text={TEXT.close.translation} start={4.3 * FPS} size={34} />
        </div>

        <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
          {[1, -1].map((side, i) => (
            <circle
              key={side}
              cx={960 + side * gap} cy={cy} r={r}
              fill={`rgba(184,137,45,${0.1 * fill})`}
              stroke={C.gold} strokeWidth={2}
              strokeDasharray={circ} strokeDashoffset={circ * (1 - rings)}
              transform={`rotate(${i ? 90 : -90} ${960 + side * gap} ${cy})`}
            />
          ))}
        </svg>
        {TEXT.close.pillars.map((p, i) => {
          const side = i === 0 ? 1 : -1; // رزق on the right (read first), امن on the left
          const x = 960 + side * (gap + 40);
          return (
            <div key={p} style={{position: 'absolute', left: x - 120, width: 240, top: cy - 92, textAlign: 'center', opacity: fill}}>
              <div dir="rtl" style={{fontFamily: F.urdu, fontSize: 44, fontWeight: 700, lineHeight: 2, color: C.ink}}>{p}</div>
              <div dir="rtl" lang="ar" style={{fontFamily: F.quran, fontSize: 26, lineHeight: 1.6, color: C.sepia}}>{uthmani(TEXT.close.pillarWords[i])}</div>
            </div>
          );
        })}

        {/* Next-episode card, lower third */}
        <div
          style={{
            position: 'absolute', top: 870, width: '100%', display: 'flex', justifyContent: 'center',
            opacity: endCard, flexDirection: 'column', alignItems: 'center',
          }}
        >
          <div dir="rtl" style={{fontFamily: F.urdu, fontSize: 28, lineHeight: 2, color: C.ink, borderTop: `1px solid ${C.gold}`, padding: '4px 40px 0'}}>
            {TEXT.close.next}
          </div>
          <div dir="rtl" style={{fontFamily: F.urdu, fontSize: 18, lineHeight: 2, color: C.inkSoft}}>
            {TEXT.close.credit}
          </div>
        </div>
      </SceneChrome>
    </Paper>
  );
};
