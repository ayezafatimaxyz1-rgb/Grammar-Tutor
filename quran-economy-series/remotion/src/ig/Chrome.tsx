import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {progress, inOut} from '../components/motion';
import {BADGE_COLORS, BADGE_TEXT, BadgeKind, C, FE, FPS, SAFE} from './theme';
import {useScene} from './sceneContext';

/** Series tag, top left. */
export const Header: React.FC<{dark?: boolean; number: number}> = ({dark, number}) => (
  <div style={{position: 'absolute', top: 120, left: SAFE.left, fontFamily: FE.sans, fontWeight: 700, fontSize: 24, letterSpacing: 3,
    color: dark ? 'rgba(217,236,239,0.75)' : 'rgba(43,33,24,0.62)'}}>
    QURAN AND GLOBAL ECONOMY <span style={{color: dark ? C.teal : C.gold}}>· EPI {number}</span>
  </div>
);

/** Classification badges, stacked under the header. */
export const Badges: React.FC<{kinds: string[]}> = ({kinds}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top: 166, left: SAFE.left, display: 'flex', gap: 12, flexWrap: 'wrap', width: 860}}>
      {kinds.map((k, i) => {
        const p = progress(f, 8 + i * 5, 12);
        const c = BADGE_COLORS[k as BadgeKind];
        return (
          <div key={k} style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 20, letterSpacing: 2, padding: '8px 16px', borderRadius: 999,
            background: c.bg, color: c.fg, opacity: p, transform: `translateY(${(1 - p) * -8}px)`}}>
            {BADGE_TEXT[k as BadgeKind]}
          </div>
        );
      })}
    </div>
  );
};

/** Source line, above the captions. */
export const Source: React.FC<{text: string; dark?: boolean}> = ({text, dark}) => {
  const f = useCurrentFrame();
  if (!text) return null;
  return (
    <div style={{position: 'absolute', top: 1238, left: SAFE.left, width: 820, fontFamily: FE.sans, fontSize: 22, lineHeight: 1.35,
      color: dark ? 'rgba(217,236,239,0.66)' : 'rgba(43,33,24,0.6)', opacity: progress(f, 14, 16),
      borderLeft: `3px solid ${dark ? C.teal : C.gold}`, paddingLeft: 14}}>
      Source: {text}
    </div>
  );
};

/** Burned-in captions: 2 to 5 words at a time, the spoken word lit in gold. Sized for muted viewing. */
export const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const {timing, lead} = useScene();
  const t = (f - lead) / FPS;
  const s = timing.sentences.find((x) => t >= x.start - 0.05 && t <= x.end + 0.25);
  if (!s) return null;
  // chunk words: break after punctuation or at 5 words
  const chunks: typeof s.words[] = [];
  let cur: typeof s.words = [];
  s.words.forEach((w, i) => {
    cur.push(w);
    const last = i === s.words.length - 1;
    if (last || cur.length >= 5 || /[,;:.?!]$/.test(w.w) && cur.length >= 2) {
      chunks.push(cur);
      cur = [];
    }
  });
  const chunk = chunks.find((c) => t < c[c.length - 1].end + 0.02) ?? chunks[chunks.length - 1];
  const o = inOut(f - lead, s.start * FPS - 2, (s.end + 0.25) * FPS, 5);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: 1330, left: 60, width: 860, display: 'flex', justifyContent: 'center', opacity: o}}>
        <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 54, lineHeight: 1.18, textAlign: 'center', color: '#FFFFFF',
          padding: '14px 26px 18px', borderRadius: 18, background: 'rgba(43,33,24,0.86)', maxWidth: 860}}>
          {chunk.map((w, i) => {
            const on = t >= w.start && t < w.end + 0.05;
            return (
              <span key={i} style={{color: on ? C.goldBright : '#FFFFFF'}}>
                {w.w}{i < chunk.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
