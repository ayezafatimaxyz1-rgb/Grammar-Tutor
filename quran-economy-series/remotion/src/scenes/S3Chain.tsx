import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Navy, Paper} from '../components/Backdrop';
import {inOut, progress} from '../components/motion';
import {SceneChrome} from '../components/Scene';
import {ArabicReveal, KineticHeading, UrduLine} from '../components/Type';
import {FPS, SCENES, TEXT} from '../data/pilot';
import {C, F} from '../theme';

// Six links, laid out right to left in Urdu reading order.
const XS = [1680, 1390, 1100, 820, 530, 240];
const ROW_Y = 520;
const SPLIT_X = 960; // paper (Qur'anic) to the right, navy (modern) to the left
const T_SPLIT = 11.2 * FPS;

type IconProps = {c: string; draw: number};
const stroke = (c: string, draw: number, len = 400) => ({
  fill: 'none', stroke: c, strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  strokeDasharray: len, strokeDashoffset: len * (1 - draw),
});

const Rain: React.FC<IconProps> = ({c, draw}) => (
  <g>
    <path d="M -38 4 a 18 18 0 0 1 6 -34 a 24 24 0 0 1 44 -6 a 18 18 0 0 1 26 22 a 16 16 0 0 1 -6 18 z" {...stroke(c, draw, 300)} />
    {[-24, -4, 16, 34].map((x, i) => (
      <line key={x} x1={x} y1={16 + (i % 2) * 6} x2={x - 6} y2={34 + (i % 2) * 6} {...stroke(c, draw, 40)} />
    ))}
  </g>
);
const Sprout: React.FC<IconProps> = ({c, draw}) => (
  <g>
    <line x1={-46} y1={30} x2={46} y2={30} {...stroke(c, draw, 100)} />
    <path d="M 0 30 V -8 M 0 4 C -8 -16 -30 -18 -36 -10 C -28 4 -10 6 0 4 M 0 -8 C 8 -30 30 -32 36 -24 C 28 -10 10 -8 0 -8" {...stroke(c, draw, 320)} />
  </g>
);
const Fodder: React.FC<IconProps> = ({c, draw}) => (
  <g>
    {/* haystack with a grazing trough: fodder for livestock (80:31–32) */}
    <line x1={-48} y1={30} x2={48} y2={30} {...stroke(c, draw, 100)} />
    <path d="M -40 30 C -40 -6, -20 -26, 0 -26 C 20 -26, 40 -6, 40 30" {...stroke(c, draw, 200)} />
    <path d="M -26 30 C -24 4, -12 -12, -4 -16 M 0 30 C 0 6, 4 -8, 10 -16 M 22 30 C 22 10, 18 -2, 14 -8" {...stroke(c, draw, 160)} />
    <path d="M -16 -26 l -6 -10 M 0 -26 l 0 -12 M 16 -26 l 6 -10" {...stroke(c, draw, 60)} />
  </g>
);
const Factory: React.FC<IconProps> = ({c, draw}) => (
  <g>
    <path d="M -44 30 V -6 L -22 6 V -6 L 0 6 V -6 L 22 6 V -30 H 38 V 30 Z" {...stroke(c, draw, 420)} />
    <rect x={-32} y={12} width={10} height={10} {...stroke(c, draw, 50)} />
    <rect x={-10} y={12} width={10} height={10} {...stroke(c, draw, 50)} />
  </g>
);
const Truck: React.FC<IconProps> = ({c, draw}) => (
  <g>
    <path d="M -46 20 V -18 H 12 V 20 M 12 -6 H 30 L 44 8 V 20 H -46" {...stroke(c, draw, 380)} />
    <circle cx={-26} cy={24} r={8} {...stroke(c, draw, 60)} />
    <circle cx={28} cy={24} r={8} {...stroke(c, draw, 60)} />
  </g>
);
const PlateIcon: React.FC<IconProps> = ({c, draw}) => (
  <g>
    <ellipse cx={0} cy={10} rx={40} ry={18} {...stroke(c, draw, 220)} />
    <ellipse cx={0} cy={10} rx={26} ry={10} {...stroke(c, draw, 140)} />
    <line x1={-54} y1={-20} x2={-54} y2={24} {...stroke(c, draw, 50)} />
    <line x1={54} y1={-20} x2={54} y2={24} {...stroke(c, draw, 50)} />
  </g>
);
const ICONS = [Rain, Sprout, Fodder, Factory, Truck, PlateIcon];

/** Dots travelling along a horizontal lane; direction -1 = right→left. */
const Flow: React.FC<{y: number; color: string; dir: 1 | -1; t: number; opacity: number; r?: number}> = ({y, color, dir, t, opacity, r = 6}) => {
  const x0 = XS[0] + 40;
  const x1 = XS[5] - 40;
  const n = 9;
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y} x2={x0} y2={y} stroke={color} strokeWidth={1} strokeDasharray="2 8" opacity={0.6} />
      {Array.from({length: n}).map((_, i) => {
        const u = (((t / 160 + i / n) % 1) + 1) % 1;
        const x = dir === -1 ? interpolate(u, [0, 1], [x0, x1]) : interpolate(u, [0, 1], [x1, x0]);
        const edge = Math.min(u / 0.08, (1 - u) / 0.08, 1);
        return <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={edge} />;
      })}
    </g>
  );
};

export const S3Chain: React.FC<{subtitles: boolean}> = ({subtitles}) => {
  const f = useCurrentFrame();
  const spec = SCENES.chain;
  const split = progress(f, T_SPLIT, 24);
  // navy reveal sweeps from the split line to the left edge, with a feathered edge
  const navyEdge = interpolate(split, [0, 1], [SPLIT_X, -80]);
  const flows = progress(f, 14.2 * FPS, 30);
  const noteIn = inOut(f, 18.4 * FPS, spec.durationInFrames + 30, 18);
  const ayah1 = inOut(f, 0.6 * FPS, 6.4 * FPS, 14);
  const ayah2 = inOut(f, 6.6 * FPS, 11.4 * FPS, 14);
  const nodeAt = [1.2, 3.2, 7.0, 11.8, 13.0, 14.0].map((s) => s * FPS);

  return (
    <AbsoluteFill>
      <Paper />
      <AbsoluteFill
        style={{clipPath: `inset(0 ${1920 - SPLIT_X}px 0 ${Math.max(navyEdge, 0)}px)`}}
      >
        <Navy />
      </AbsoluteFill>
      <SceneChrome spec={spec} subtitles={subtitles} dark={split > 0.5}>
        <div style={{position: 'absolute', top: 150, width: '100%', opacity: 1 - split}}>
          <KineticHeading text={TEXT.chain.heading} start={0} size={54} color={C.ink} />
        </div>

        {/* Qur'anic text over the paper half */}
        <div style={{position: 'absolute', top: 285, left: SPLIT_X + 40, width: 880, opacity: ayah1}}>
          <ArabicReveal text={TEXT.chain.ayah} start={0.6 * FPS} size={38} dur={70} />
        </div>
        <div style={{position: 'absolute', top: 252, left: SPLIT_X + 40, width: 880, opacity: ayah2}}>
          <ArabicReveal text={TEXT.chain.ayahTail} start={6.6 * FPS} size={50} dur={30} />
          <UrduLine text={TEXT.chain.ayahTailTranslation} start={7.4 * FPS} size={28} style={{marginTop: -10}} />
        </div>

        {/* Group tags */}
        <div style={{position: 'absolute', top: 404, left: SPLIT_X + 60, width: 820, opacity: 1 - noteIn}}>
          <UrduLine text={TEXT.chain.quranicTag} start={1.0 * FPS} size={24} color={C.gold} />
        </div>
        <div style={{position: 'absolute', top: 400, left: 100, width: 820, opacity: 1 - noteIn}}>
          <UrduLine text={TEXT.chain.modernTag} start={T_SPLIT + 10} size={24} color={C.teal} />
        </div>

        {/* The chain */}
        <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
          {XS.slice(0, -1).map((x, i) => {
            const p = progress(f, nodeAt[i + 1] - 10, 16);
            const col = i < 2 ? C.gold : i === 2 ? C.goldBright : C.teal;
            return (
              <g key={x} opacity={p}>
                <line x1={x - 78} y1={ROW_Y} x2={XS[i + 1] + 78 + (1 - p) * (x - XS[i + 1] - 156)} y2={ROW_Y} stroke={col} strokeWidth={1.6} />
                <path d={`M ${XS[i + 1] + 78} ${ROW_Y} l 10 -6 v 12 z`} fill={col} />
              </g>
            );
          })}
          {XS.map((x, i) => {
            const Icon = ICONS[i];
            const c = i < 3 ? C.ink : C.ice;
            const draw = progress(f, nodeAt[i], 34);
            return (
              <g key={x} transform={`translate(${x}, ${ROW_Y - 6})`}>
                <circle r={66} fill={i < 3 ? 'rgba(255,250,236,0.6)' : 'rgba(14,27,44,0.6)'} stroke={i < 3 ? C.gold : C.teal} strokeWidth={1.4} opacity={draw} />
                <Icon c={c} draw={draw} />
              </g>
            );
          })}
          <Flow y={690} color={C.goldBright} dir={-1} t={f} opacity={flows} />
          <Flow y={738} color={C.teal} dir={1} t={f + 40} opacity={flows} r={5} />
        </svg>

        {/* Node labels */}
        {XS.map((x, i) => {
          const label = i < 3 ? TEXT.chain.quranic[i] : TEXT.chain.modern[i - 3];
          return (
            <div
              key={label}
              dir="rtl"
              style={{
                position: 'absolute', left: x - 150, width: 300, top: ROW_Y + 72, textAlign: 'center',
                fontFamily: F.urdu, fontSize: 28, lineHeight: 2, color: i < 3 ? C.ink : C.ice,
                opacity: progress(f, nodeAt[i] + 8, 16),
              }}
            >
              {label}
            </div>
          );
        })}

        {/* Flow legends */}
        <div dir="rtl" style={{position: 'absolute', top: 664, left: XS[0] + 60, fontFamily: F.urdu, fontSize: 24, lineHeight: 2, color: C.gold, opacity: flows}}>
          {TEXT.chain.goodsLabel} ←
        </div>
        <div dir="rtl" style={{position: 'absolute', top: 712, left: XS[0] + 60, fontFamily: F.urdu, fontSize: 24, lineHeight: 2, color: C.teal, opacity: flows}}>
          {TEXT.chain.moneyLabel} →
        </div>

        {/* Closing note: analogy, not meaning */}
        <div style={{position: 'absolute', top: 300, width: '100%', display: 'flex', justifyContent: 'center', opacity: noteIn}}>
          <div
            dir="rtl"
            style={{
              fontFamily: F.urdu, fontSize: 36, lineHeight: 2.1, color: C.ink, background: 'rgba(243,233,210,0.96)',
              border: `1.5px solid ${C.gold}`, padding: '2px 36px 8px', borderRadius: 6,
              transform: `translateY(${(1 - noteIn) * 10}px)`,
            }}
          >
            {TEXT.chain.note}
          </div>
        </div>
      </SceneChrome>
    </AbsoluteFill>
  );
};
