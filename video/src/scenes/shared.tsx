// Pieces shared by the main video and the vertical lessons.
import React from "react";
import { useCurrentFrame } from "remotion";
import { ActionIcon, Bulb, GoldBlob, Jug, Ring } from "../art";
import { C, tint } from "../theme";
import { prog } from "../timing";

/** Rounded rectangle that draws itself on. */
export const DrawRect: React.FC<{ x: number; y: number; w: number; h: number; p: number; color: string; sw?: number; dash?: boolean; fill?: string }> = ({
  x, y, w, h, p, color, sw = 6, dash, fill = "none",
}) => (
  <rect x={x} y={y} width={w} height={h} rx={28} pathLength={1} fill={fill} stroke={color} strokeWidth={sw}
    strokeDasharray={dash ? undefined : "1 1"} strokeDashoffset={dash ? undefined : 1 - p} opacity={p > 0 ? 1 : 0}
    strokeLinecap="round" />
);

/** Path that draws itself on. */
export const DrawPath: React.FC<{ d: string; p: number; color: string; sw?: number; dash?: string }> = ({ d, p, color, sw = 6, dash }) => (
  <path d={d} pathLength={1} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"
    strokeDasharray={dash ?? "1 1"} strokeDashoffset={dash ? undefined : 1 - p} opacity={p > 0 ? 1 : 0} />
);

/** Knowledge map: fact nodes joined by lines. `join` 0..1 draws the links and the enclosing outline. */
export const NODES: [number, number][] = [[-230, -110], [-40, -150], [170, -95], [-190, 60], [30, 20], [220, 90], [-40, 150]];
export const LINKS: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 6], [5, 6]];

export const KnowledgeMap: React.FC<{ join: number; show?: number; labels?: string[]; c?: string; enclose?: number }> = ({
  join, show = 1, labels, c = C.abstract, enclose = join,
}) => (
  <g>
    <ellipse cx={0} cy={0} rx={330} ry={235} fill={tint(c, 0.07 * enclose)} stroke={c} strokeWidth={5}
      pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - enclose} opacity={enclose > 0 ? 1 : 0} />
    {LINKS.map(([a, b], i) => (
      <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[a][0] + (NODES[b][0] - NODES[a][0]) * join}
        y2={NODES[a][1] + (NODES[b][1] - NODES[a][1]) * join} stroke={c} strokeWidth={4} opacity={join > 0 ? 0.7 : 0} />
    ))}
    {NODES.map(([x, y], i) => {
      const s = Math.min(1, Math.max(0, show * NODES.length - i));
      const label = labels?.[i];
      const w = label ? Math.max(110, label.length * 15 + 30) : 0;
      return (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          {label ? (
            <g>
              <rect x={-w / 2} y={-26} width={w} height={52} rx={12} fill={C.card} stroke={c} strokeWidth={4} />
              <text x={0} y={9} textAnchor="middle" fontSize={24} fontWeight={600} fill={C.ink} fontFamily="Inter">{label}</text>
            </g>
          ) : (
            <circle r={18} fill={C.card} stroke={c} strokeWidth={5} />
          )}
        </g>
      );
    })}
  </g>
);

export const ART_FACTS = ["Monet", "Cubism", "oil paint", "perspective", "colour wheel", "fresco", "Van Gogh"];

/** Four linked action circles that close into one looping arrow (notes' Error 5 motif). */
export const ProcessLoop: React.FC<{ fuse: number; c?: string; r?: number }> = ({ fuse, c = C.activity, r = 90 }) => {
  const f = useCurrentFrame();
  const spin = (f * 2) % 360;
  return (
    <g>
      {[0, 1, 2, 3].map((i) => {
        const lx = -1.5 * r + i * r, ly = 0;
        const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
        const cx = lx + (Math.cos(a) * r * 0.8 - lx) * fuse;
        const cy = ly + (Math.sin(a) * r * 0.8 - ly) * fuse;
        return <circle key={i} cx={cx} cy={cy} r={18} fill={C.card} stroke={c} strokeWidth={5} opacity={1 - fuse * 0.6} />;
      })}
      <path d={`M${-1.5 * r} 0 H${1.5 * r}`} stroke={c} strokeWidth={5} opacity={1 - fuse} />
      <g opacity={fuse} transform={`rotate(${spin})`}>
        <path d={`M0 ${-r * 0.8} A${r * 0.8} ${r * 0.8} 0 1 1 ${-r * 0.8 * Math.sin(0.6)} ${-r * 0.8 * Math.cos(0.6)}`} fill="none" stroke={c} strokeWidth={9} strokeLinecap="round" />
        <path d="M-12 -12 L12 0 L-12 12 Z" transform={`translate(${-r * 0.8 * Math.sin(0.6)} ${-r * 0.8 * Math.cos(0.6)}) rotate(${-40})`} fill={c} />
      </g>
    </g>
  );
};

/** Small looping icon for each of the five pictures (overview and recap cards). */
export const MiniPicture: React.FC<{ k: string; p: number }> = ({ k, p }) => {
  const f = useCurrentFrame();
  if (k === "unit")
    return (
      <g>
        {[[-40, -20], [20, -30], [-20, 25], [40, 20]].map(([x, y], i) => (
          <circle key={i} cx={x * (1.6 - 0.6 * p)} cy={y * (1.6 - 0.6 * p)} r={13} fill={C.unit} />
        ))}
        <rect x={-85} y={-70} width={170} height={140} rx={30} fill="none" stroke={C.unit} strokeWidth={6} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
      </g>
    );
  if (k === "material")
    return (
      <g>
        <g transform="scale(0.55) translate(-40 20)"><GoldBlob wobble={f / 12} /></g>
        <g transform={`translate(60 -35) scale(${0.45 * p})`}><Ring /></g>
      </g>
    );
  if (k === "measured") return <g transform="scale(0.65)"><Jug level={0.2 + 0.6 * p} /></g>;
  if (k === "abstract") return <g transform="scale(0.3)"><KnowledgeMap join={p} /></g>;
  if (k === "activity") return <g transform="scale(0.75)"><ProcessLoop fuse={p} r={80} /></g>;
  return null;
};

export const TaskCard: React.FC<{ kind: "type" | "plan" | "call" | "clean"; label: string; w?: number }> = ({ kind, label, w = 190 }) => (
  <g>
    <rect x={-w / 2} y={-90} width={w} height={180} rx={20} fill={C.card} stroke={C.activity} strokeWidth={5} />
    <g transform="translate(0 -18)"><ActionIcon kind={kind} /></g>
    <text x={0} y={68} textAnchor="middle" fontSize={28} fontWeight={700} fill={C.ink} fontFamily="Inter">{label}</text>
  </g>
);

export const Ideas: React.FC<{ n: number; gap?: number }> = ({ n, gap = 170 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <g key={i} transform={`translate(${(i - (n - 1) / 2) * gap} 0)`}><Bulb /></g>
    ))}
  </g>
);

export const useProg = () => {
  const f = useCurrentFrame();
  return (at: number, dur = 15) => prog(f, at, dur);
};
