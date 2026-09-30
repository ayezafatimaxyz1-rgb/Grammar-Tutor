// Visual kit for the standalone "prove it" videos: dark evidence-board stage, detective lens
// mascot, proof banners, PROVEN stamps, camera shake and karaoke captions.
import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../theme";
import { prog } from "../timing";

export const K = {
  bg: "#13203A",
  bg2: "#0C1629",
  grid: "rgba(255,255,255,0.045)",
  text: "#F4F1E8",
  dim: "#9AA6BD",
  card: "#F6F1E7",
  ink: "#1E2233",
  yellow: "#FFD166",
  red: "#FF5A5F",
  green: "#3DDC97",
  unit: "#5AA9FF",
  material: "#2EC4B6",
  measured: "#FF9F43",
  abstract: "#B388FF",
  activity: "#FF6B9A",
  lensRim: "#FFD166",
  wood: "#B07A4A",
};

export const VW = 1080;
export const VH = 1920;

/* ------------------------------------------------------------------ stage */

/** Dark evidence board with slow push-in and screen shake at the given frames. */
export const Stage: React.FC<{ children: React.ReactNode; shakes?: number[]; zoom?: number }> = ({ children, shakes = [], zoom = 0.04 }) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  let dx = 0, dy = 0;
  for (const s of shakes) {
    const t = f - s;
    if (t >= 0 && t < 14) {
      const a = 18 * Math.exp(-t / 4);
      dx += a * Math.sin(t * 2.3);
      dy += a * Math.cos(t * 3.1);
    }
  }
  const z = 1 + zoom * (f / Math.max(1, durationInFrames));
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 35%, ${K.bg} 0%, ${K.bg2} 100%)`, fontFamily: FONT, color: K.text, overflow: "hidden" }}>
      <AbsoluteFill style={{
        backgroundImage: `linear-gradient(${K.grid} 2px, transparent 2px), linear-gradient(90deg, ${K.grid} 2px, transparent 2px)`,
        backgroundSize: "72px 72px", transform: `translate(${dx * 0.4}px, ${dy * 0.4}px)`,
      }} />
      <AbsoluteFill style={{ transform: `translate(${dx}px, ${dy}px) scale(${z})`, transformOrigin: "50% 45%" }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------- motion */

type WP = { at: number; x: number; y: number };
/** Springy movement through waypoints: returns [x, y] at frame f. */
export const useWaypoints = () => {
  const { fps } = useVideoConfig();
  return (f: number, pts: WP[]): [number, number] => {
    let x = pts[0].x, y = pts[0].y;
    for (let i = 1; i < pts.length; i++) {
      if (f < pts[i].at) break;
      const s = spring({ frame: f - pts[i].at, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } });
      x = interpolate(s, [0, 1], [x, pts[i].x]);
      y = interpolate(s, [0, 1], [y, pts[i].y]);
    }
    return [x, y];
  };
};

export const useSpring = () => {
  const { fps } = useVideoConfig();
  return (f: number, at: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) =>
    f < at ? 0 : spring({ frame: f - at, fps, config: { damping: 11, stiffness: 170, mass: 0.7, ...cfg } });
};

/* ----------------------------------------------------------------- mascot */

/** Detective lens: a magnifying glass with eyes. Bobs, blinks and looks where it is told. */
export const Lens: React.FC<{ x: number; y: number; s?: number; look?: [number, number]; mood?: "neutral" | "search" | "happy" | "shock"; o?: number; rot?: number }> = ({
  x, y, s = 1, look = [0, 0], mood = "neutral", o = 1, rot = -18,
}) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 9) * 6;
  const blink = (f % 95) > 90 ? 0.15 : 1;
  const eyeH = mood === "shock" ? 1.25 : mood === "happy" ? 0.55 : 1;
  const [lx, ly] = look;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${s})`} opacity={o}>
      <g transform={`rotate(${rot})`}>
        <rect x={-14} y={70} width={28} height={120} rx={12} fill={K.wood} stroke="#6B4423" strokeWidth={5} />
        <circle r={82} fill="rgba(170, 220, 255, 0.28)" stroke={K.lensRim} strokeWidth={16} />
        <path d="M-45 -40 Q-20 -62 12 -60" stroke="#fff" strokeWidth={9} strokeLinecap="round" fill="none" opacity={0.55} />
      </g>
      {[-26, 26].map((ex) => (
        <g key={ex} transform={`translate(${ex} 0)`}>
          <ellipse rx={17} ry={22 * blink * eyeH} fill="#fff" stroke={K.ink} strokeWidth={4} />
          {blink > 0.5 && mood !== "happy" && <circle cx={lx * 7} cy={ly * 8} r={8} fill={K.ink} />}
          {mood === "happy" && <path d="M-11 4 Q0 -9 11 4" stroke={K.ink} strokeWidth={5} fill="none" strokeLinecap="round" />}
        </g>
      ))}
      {mood === "search" && <path d="M-48 -34 L-10 -26 M48 -34 L10 -26" stroke={K.ink} strokeWidth={6} strokeLinecap="round" />}
      {mood === "shock" && <ellipse cx={0} cy={38} rx={9} ry={12} fill={K.ink} />}
      {mood === "happy" && <path d="M-18 32 Q0 50 18 32" stroke={K.ink} strokeWidth={6} fill="none" strokeLinecap="round" />}
    </g>
  );
};

/* ---------------------------------------------------------------- banners */

export const ProofBanner: React.FC<{ n: number | string; text: string; at?: number; color?: string }> = ({ n, text, at = 0, color = K.yellow }) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 14);
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 150, display: "flex", alignItems: "center", gap: 22, opacity: p, transform: `translateX(${(1 - p) * -80}px)` }}>
      <div style={{ background: color, color: K.ink, fontFamily: MONO, fontWeight: 600, fontSize: 36, padding: "10px 22px", borderRadius: 12, letterSpacing: 2, whiteSpace: "nowrap" }}>
        {typeof n === "number" ? `PROOF ${n}` : n}
      </div>
      <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.15 }}>{text}</div>
    </div>
  );
};

/** Big "PROVEN ✓" stamp. Pair with <Sfx name="stamp"> and a shake at the same frame. */
export const Proven: React.FC<{ at: number; text: string; y?: number; label?: string; color?: string }> = ({ at, text, y = 1300, label = "PROVEN ✓", color = K.green }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const p = prog(f, at, 7);
  const sc = 2.2 - 1.2 * p;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        transform: `rotate(-7deg) scale(${sc})`, opacity: p, border: `9px solid ${color}`, color, borderRadius: 18,
        fontFamily: MONO, fontWeight: 600, fontSize: 92, letterSpacing: 6, padding: "4px 30px", background: "rgba(12,22,41,0.85)",
      }}>{label}</div>
      <div style={{ marginTop: 26, fontSize: 42, fontWeight: 700, textAlign: "center", maxWidth: 900, opacity: prog(f, at + 8, 12) }}>{text}</div>
    </div>
  );
};

/** Off-white evidence card pinned to the board. */
export const Card: React.FC<{ at: number; x?: number; y: number; w?: number; rot?: number; children: React.ReactNode; pin?: string; drop?: number }> = ({
  at, x = 540, y, w = 940, rot = -1.5, children, pin = K.red, drop,
}) => {
  const f = useCurrentFrame();
  const s = useSpring()(f, at);
  const fall = drop === undefined ? 0 : prog(f, drop, 18);
  if (f < at) return null;
  return (
    <div style={{
      position: "absolute", left: x - w / 2, top: y, width: w, background: K.card, color: K.ink, borderRadius: 14,
      padding: "34px 36px 30px", boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
      transform: `translateY(${(1 - s) * 60 + fall * 900}px) rotate(${rot + fall * 25}deg) scale(${0.9 + 0.1 * s})`, opacity: Math.min(1, s * 1.5) * (1 - fall),
    }}>
      <div style={{ position: "absolute", left: "50%", top: -14, width: 30, height: 30, marginLeft: -15, borderRadius: "50%", background: pin, boxShadow: "0 3px 6px rgba(0,0,0,0.4)" }} />
      {children}
    </div>
  );
};

/** Word that slams in with overshoot. */
export const Slam: React.FC<{ at: number; children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({ at, children, size = 96, color = K.text, style }) => {
  const f = useCurrentFrame();
  const s = useSpring()(f, at, { damping: 9, stiffness: 220 });
  if (f < at) return null;
  return (
    <div style={{ fontSize: size, fontWeight: 900, color, lineHeight: 1.05, transform: `scale(${1.8 - 0.8 * s})`, opacity: Math.min(1, s * 2), ...style }}>
      {children}
    </div>
  );
};

/** Floating label that pops above an object. */
export const Label: React.FC<{ at: number; x: number; y: number; children: React.ReactNode; color?: string; size?: number; dark?: boolean }> = ({
  at, x, y, children, color = K.yellow, size = 38, dark = true,
}) => {
  const f = useCurrentFrame();
  const s = useSpring()(f, at);
  if (f < at) return null;
  return (
    <div style={{
      position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${s})`, background: dark ? color : "transparent",
      color: dark ? K.ink : color, fontWeight: 800, fontSize: size, padding: "8px 20px", borderRadius: 999, whiteSpace: "nowrap",
      border: dark ? "none" : `4px solid ${color}`,
    }}>{children}</div>
  );
};

/* ---------------------------------------------------------------- captions */

type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };

/** Word-by-word karaoke captions for vertical video. */
export const Karaoke: React.FC<{ cues: Cue[]; top?: number }> = ({ cues, top = 1545 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const cue = cues.find((c) => t >= c.start && t < c.end);
  if (!cue) return null;
  let cur = -1;
  cue.words.forEach((w, i) => { if (t >= w.t - 0.05) cur = i; });
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top, display: "flex", justifyContent: "center" }}>
      <div style={{ textAlign: "center", fontFamily: FONT, fontSize: 54, fontWeight: 900, lineHeight: 1.2, color: "#fff", textShadow: "0 4px 0 rgba(0,0,0,0.6), 0 0 18px rgba(0,0,0,0.6)" }}>
        {cue.words.map((w, i) => (
          <span key={i} style={{ color: i === cur ? K.yellow : i < cur ? "#fff" : "rgba(255,255,255,0.7)", display: "inline-block", marginRight: i < cue.words.length - 1 ? "0.26em" : 0, transform: i === cur ? "scale(1.08)" : "none" }}>
            {w.w.replace(/[‘“”]/g, "").replace(/’(?=[.,:;?!]*$)/, "")}
          </span>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------- sfx */

export type Sound = "pop" | "tick" | "correct" | "wrong" | "whoosh" | "stamp" | "ding" | "buzzer" | "boing" | "click" | "slam" | "riser" | "scratch" | "msg" | "sent";
export const Fx: React.FC<{ at: number; name: Sound; volume?: number }> = ({ at, name, volume = 0.22 }) => (
  <Sequence from={Math.max(0, Math.round(at))} durationInFrames={45} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

/** Full-frame SVG layer in vertical stage coordinates. */
export const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={VW} height={VH} viewBox={`0 0 ${VW} ${VH}`} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>{children}</svg>
);
