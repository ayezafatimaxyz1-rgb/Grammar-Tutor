import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Paper} from './components/Backdrop';
import {TEXT} from './data/pilot';
import {C, F} from './theme';
import {uthmani} from './components/uthmani';

// Every Qur'anic string in the pilot, set large, to inspect shaping, diacritics and Uthmani marks.
const AYAT = [TEXT.food.ayah, TEXT.rizq.word, TEXT.rizq.ayah, TEXT.chain.ayah, TEXT.chain.ayahTail, TEXT.close.ayah, ...TEXT.close.pillarWords];

export const TypeSpecimen: React.FC = () => (
  <Paper>
    <AbsoluteFill style={{padding: '90px 120px', gap: 0, justifyContent: 'center'}}>
      {AYAT.map((a) => (
        <div key={a} dir="rtl" lang="ar" style={{fontFamily: F.quran, fontSize: 50, lineHeight: 1.75, color: C.ink, textAlign: 'center'}}>
          {uthmani(a)}
        </div>
      ))}
    </AbsoluteFill>
  </Paper>
);
