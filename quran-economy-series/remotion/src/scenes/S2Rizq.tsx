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

export const S2Rizq: React.FC<{subtitles: boolean}> = ({subtitles}) => {
  const f = useSceneFrame();
  const spec = SCENES.rizq;
  const intro = progress(f, 4, 30);
  const shift = progress(f, 7.2 * FPS, 28);
  const wordY = interpolate(shift, [0, 1], [330, 190]);
  const wordSize = interpolate(shift, [0, 1], [230, 150]);
  // three senses, placed on a gentle arc under the word, appear as the narration names them
  const senses = TEXT.rizq.senses.map((s, i) => ({s, at: [4.4, 5.0, 5.9][i] * FPS, x: [1180, 960, 740][i]}));
  return (
    <Paper>
      <SceneChrome spec={spec} subtitles={subtitles}>
        <div
          dir="rtl"
          lang="ar"
          style={{
            position: 'absolute', top: wordY, width: '100%', textAlign: 'center', fontFamily: F.quran,
            fontSize: wordSize, lineHeight: 1.3, color: C.gold, opacity: intro,
            transform: `translateY(${(1 - intro) * 20}px)`,
          }}
        >
          {uthmani(TEXT.rizq.word)}
        </div>
        <div style={{position: 'absolute', top: interpolate(shift, [0, 1], [640, 430]), width: '100%', opacity: 1 - shift * 0.15}}>
          <UrduLine text={TEXT.rizq.gloss} start={1.2 * FPS} size={34} color={C.inkSoft} />
        </div>
        {senses.map(({s, at, x}) => {
          const p = progress(f, at, 16);
          const out = shift;
          return (
            <div
              key={s}
              dir="rtl"
              style={{
                position: 'absolute', left: x - 110, width: 220, top: 760 - out * 250, textAlign: 'center',
                fontFamily: F.urdu, fontSize: 32, lineHeight: 2, color: C.ink, opacity: p * (1 - out),
                borderTop: `1.5px solid ${C.gold}`, transform: `translateY(${(1 - p) * 14}px)`,
              }}
            >
              {s}
            </div>
          );
        })}
        <div style={{position: 'absolute', top: 540, width: '100%'}}>
          <ArabicReveal text={TEXT.rizq.ayah} start={7.6 * FPS} size={70} dur={50} />
          <UrduLine text={TEXT.rizq.translation} start={9.2 * FPS} size={36} />
        </div>
      </SceneChrome>
    </Paper>
  );
};
