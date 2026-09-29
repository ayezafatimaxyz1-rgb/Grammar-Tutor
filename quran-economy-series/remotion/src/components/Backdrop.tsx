import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';

const noise = (opacity: number, seed: number) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' seed='${seed}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.25  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 ${opacity} 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  )}")`;

/** Warm paper for Qur'anic concepts: fibre noise, soft vignette, a single gold hairline frame. */
export const Paper: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{backgroundColor: C.paper}}>
    <AbsoluteFill style={{backgroundImage: noise(0.16, 7), opacity: 0.9}} />
    <AbsoluteFill
      style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(255,250,235,0.55) 0%, rgba(0,0,0,0) 55%, rgba(120,90,40,0.18) 100%)'}}
    />
    <div style={{position: 'absolute', inset: 56, border: `1.5px solid ${C.gold}`, opacity: 0.55}} />
    <div style={{position: 'absolute', inset: 64, border: `0.75px solid ${C.gold}`, opacity: 0.35}} />
    {children}
  </AbsoluteFill>
);

/** Navy drafting sheet for present-day diagrams: faint grid, no glow effects. */
export const Navy: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{backgroundColor: C.navy}}>
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(${C.navyLine} 1px, transparent 1px), linear-gradient(90deg, ${C.navyLine} 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        opacity: 0.45,
      }}
    />
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 40%, rgba(47,181,168,0.07) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)'}} />
    {children}
  </AbsoluteFill>
);
