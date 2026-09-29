// Reusable props for the standalone videos.
import React from "react";
import { K } from "./kit";

/** Cardboard box. Children are drawn inside (between back and front panels). close: 0 open → 1 lid shut. */
export const Box: React.FC<{ x: number; y: number; w?: number; h?: number; close?: number; label?: string; labelP?: number; see?: number; color?: string; children?: React.ReactNode }> = ({
  x, y, w = 560, h = 320, close = 0, label, labelP = 0, see = 0, color = K.unit, children,
}) => {
  const top = y - h / 2;
  const flap = h * 0.42;
  const fa = close; // flap angle progress
  return (
    <g>
      {/* back panel */}
      <rect x={x - w / 2} y={top} width={w} height={h} fill="#8A5A34" stroke="#5E3B1F" strokeWidth={6} rx={6} />
      {/* back flap, standing up while open */}
      <path d={`M${x - w / 2} ${top} L${x + w / 2} ${top} L${x + w / 2 - 30} ${top - flap * (1 - fa)} L${x - w / 2 + 30} ${top - flap * (1 - fa)} Z`} fill="#9C6A40" stroke="#5E3B1F" strokeWidth={5} />
      {children}
      {/* front panel */}
      <g opacity={1 - see * 0.8}>
        <rect x={x - w / 2} y={top + h * 0.18} width={w} height={h * 0.82} fill="#B7824F" stroke="#5E3B1F" strokeWidth={6} rx={6} />
        <path d={`M${x - w / 2 + 20} ${top + h * 0.5} H${x + w / 2 - 20}`} stroke="#8A5A34" strokeWidth={4} opacity={0.5} />
      </g>
      {/* front flap folding shut over the top */}
      {fa > 0 && (
        <path d={`M${x - w / 2} ${top + h * 0.18} L${x + w / 2} ${top + h * 0.18} L${x + w / 2} ${top + h * 0.18 - (h * 0.18) * fa} L${x - w / 2} ${top + h * 0.18 - (h * 0.18) * fa} Z`}
          fill="#C58E59" stroke="#5E3B1F" strokeWidth={5} opacity={1 - see * 0.8} />
      )}
      {label && labelP > 0 && (
        <g transform={`translate(${x} ${y + h * 0.18}) rotate(-3) scale(${labelP})`}>
          <rect x={-w * 0.36} y={-44} width={w * 0.72} height={88} rx={10} fill={K.card} stroke={color} strokeWidth={6} />
          <text x={0} y={Math.min(54, w * 0.1) / 3} textAnchor="middle" fontSize={Math.min(54, w * 0.1)} fontWeight={900} fill={color} fontFamily="Inter" letterSpacing={3}>{label}</text>
        </g>
      )}
    </g>
  );
};

/** Hand-drawn red X scribble, drawn on with p 0..1. */
export const Scribble: React.FC<{ x: number; y: number; w: number; h: number; p: number }> = ({ x, y, w, h, p }) => (
  <g stroke={K.red} strokeWidth={14} strokeLinecap="round" fill="none">
    <path d={`M${x - w / 2} ${y - h / 2} L${x + w / 2} ${y + h / 2}`} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - Math.min(1, p * 2)} />
    {p > 0.5 && <path d={`M${x + w / 2} ${y - h / 2} L${x - w / 2} ${y + h / 2}`} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - (p - 0.5) * 2} />}
  </g>
);

export const QMark: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={140 * s} fontWeight={900} fill={K.yellow} fontFamily="Inter" opacity={o}>?</text>
);
