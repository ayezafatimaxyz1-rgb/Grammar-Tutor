import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {BADGE_LABELS, BadgeKind, NarrationLine, FPS, TEXT} from '../data/pilot';
import {BADGE_COLORS, C, F} from '../theme';
import {inOut, progress} from './motion';
import {isolateNumbers} from './bidi';

/** Classification badges, top right (reading start for Urdu). */
export const Badges: React.FC<{kinds: BadgeKind[]; start?: number}> = ({kinds, start = 10}) => {
  const f = useCurrentFrame();
  return (
    <div dir="rtl" style={{position: 'absolute', top: 92, right: 110, display: 'flex', gap: 14}}>
      {kinds.map((k, i) => {
        const p = progress(f, start + i * 6, 14);
        return (
          <div
            key={k}
            style={{
              fontFamily: F.urdu, fontSize: 22, lineHeight: 1.9, padding: '0 20px',
              background: BADGE_COLORS[k].bg, color: BADGE_COLORS[k].fg, borderRadius: 999,
              opacity: p, transform: `translateY(${(1 - p) * -8}px)`,
            }}
          >
            {BADGE_LABELS[k]}
          </div>
        );
      })}
    </div>
  );
};

/** Source strip, bottom left. */
export const SourceStrip: React.FC<{text: string; dark?: boolean}> = ({text, dark}) => {
  const f = useCurrentFrame();
  return (
    <div
      dir="rtl"
      style={{
        position: 'absolute', left: 110, bottom: 84, fontFamily: F.urdu, fontSize: 21, lineHeight: 2,
        color: dark ? 'rgba(217,236,239,0.72)' : 'rgba(43,33,24,0.66)', opacity: progress(f, 20, 20),
        borderInlineStart: `3px solid ${dark ? C.teal : C.gold}`, paddingInlineStart: 14,
      }}
    >
      ماخذ: {isolateNumbers(text)}
    </div>
  );
};

export const SeriesTag: React.FC<{dark?: boolean}> = ({dark}) => (
  <div
    dir="rtl"
    style={{
      position: 'absolute', top: 92, left: 110, fontFamily: F.urdu, fontSize: 20, lineHeight: 2,
      color: dark ? 'rgba(217,236,239,0.55)' : 'rgba(43,33,24,0.5)',
    }}
  >
    {isolateNumbers(TEXT.seriesTag)}
  </div>
);

/** Review subtitles: the narration script, timed. Toggle off for the final cut once VO is recorded. */
export const Subtitles: React.FC<{lines: NarrationLine[]; dark?: boolean}> = ({lines, dark}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const line = lines.find((l) => t >= l.from && t < l.to);
  if (!line) return null;
  const o = inOut(f, line.from * FPS, line.to * FPS, 8);
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 150, pointerEvents: 'none'}}>
      <div
        dir="rtl"
        lang="ur"
        style={{
          maxWidth: 1300, fontFamily: F.urdu, fontSize: 30, lineHeight: 2.15, textAlign: 'center', opacity: o,
          color: dark ? '#EAF5F6' : '#FFF8EA', background: dark ? 'rgba(4,10,18,0.72)' : 'rgba(43,33,24,0.78)',
          padding: '4px 30px 10px', borderRadius: 10,
        }}
      >
        {isolateNumbers(line.text)}
      </div>
    </AbsoluteFill>
  );
};
