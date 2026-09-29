import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, F} from '../theme';
import {progress} from './motion';
import {uthmani} from './uthmani';
import {isolateNumbers} from './bidi';

type Common = {start?: number; style?: React.CSSProperties};

/** Restrained kinetic heading: 18 frame rise and fade, no bounce. */
export const KineticHeading: React.FC<Common & {text: string; size?: number; color?: string}> = ({
  text, start = 0, size = 64, color = C.ink, style,
}) => {
  const f = useCurrentFrame();
  const p = progress(f, start, 18);
  return (
    <div
      dir="rtl"
      style={{
        fontFamily: F.urdu, fontWeight: 700, fontSize: size, color, lineHeight: 2.1,
        opacity: p, transform: `translateY(${(1 - p) * 26}px)`, textAlign: 'center', ...style,
      }}
    >
      {isolateNumbers(text)}
    </div>
  );
};

/** Qur'anic text that "writes on" right to left with a soft mask edge. */
export const ArabicReveal: React.FC<Common & {text: string; size?: number; dur?: number; color?: string}> = ({
  text, start = 0, size = 72, dur = 40, color = C.ink, style,
}) => {
  const f = useCurrentFrame();
  const p = progress(f, start, dur);
  const edge = 8; // % width of the feathered edge
  const pos = (1 - p) * (100 + edge) - edge;
  return (
    <div
      dir="rtl"
      lang="ar"
      style={{
        fontFamily: F.quran, fontSize: size, color, lineHeight: 1.9, textAlign: 'center',
        WebkitMaskImage: `linear-gradient(to left, #000 0%, #000 ${100 - pos - edge}%, transparent ${100 - pos}%)`,
        maskImage: `linear-gradient(to left, #000 0%, #000 ${100 - pos - edge}%, transparent ${100 - pos}%)`,
        ...style,
      }}
    >
      {uthmani(text)}
    </div>
  );
};

/** Urdu body line: fades up gently. */
export const UrduLine: React.FC<Common & {text: string; size?: number; color?: string; weight?: number}> = ({
  text, start = 0, size = 40, color = C.inkSoft, weight = 400, style,
}) => {
  const f = useCurrentFrame();
  const p = progress(f, start, 16);
  return (
    <div
      dir="rtl"
      lang="ur"
      style={{
        fontFamily: F.urdu, fontSize: size, fontWeight: weight, color, lineHeight: 2.2, textAlign: 'center',
        opacity: p, transform: `translateY(${(1 - p) * 12}px)`, ...style,
      }}
    >
      {isolateNumbers(text)}
    </div>
  );
};
