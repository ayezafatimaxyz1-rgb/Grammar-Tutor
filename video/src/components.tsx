import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO, tint } from "./theme";
import { fadeUp, prog, usePop } from "./timing";

/* ------------------------------------------------------------------ paper */

export const Paper: React.FC<{ children?: React.ReactNode; vertical?: boolean }> = ({ children, vertical }) => (
  <AbsoluteFill style={{ backgroundColor: C.paper, fontFamily: FONT, color: C.ink }}>
    {/* faint ruled case-file lines */}
    <AbsoluteFill
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0 ${vertical ? 63 : 53}px, ${tint(C.rule, 0.35)} ${vertical ? 63 : 53}px ${vertical ? 64 : 54}px)`,
      }}
    />
    <AbsoluteFill style={{ boxShadow: `inset 0 0 ${vertical ? 160 : 200}px ${tint(C.paperDeep, 0.9)}` }} />
    {children}
  </AbsoluteFill>
);

/* ---------------------------------------------------------------- case tab */

export const CaseTab: React.FC<{ num?: string; title: string; color: string; x?: number; y?: number; scale?: number }> = ({
  num, title, color, x = 72, y = 48, scale = 1,
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: x, top: y, transformOrigin: "left top", transform: `scale(${scale})`, ...fadeUp(f, 0, 12, -12) }}>
      <div style={{ display: "flex", alignItems: "stretch", fontFamily: MONO, fontWeight: 600, fontSize: 26, letterSpacing: 2 }}>
        <div style={{ background: color, color: "#fff", padding: "10px 18px", borderRadius: "10px 0 0 10px" }}>
          {num ? `CASE ${num}` : "CASE FILE"}
        </div>
        <div style={{ background: C.card, color, padding: "10px 20px", border: `3px solid ${color}`, borderLeft: "none", borderRadius: "0 10px 10px 0" }}>
          {title}
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- sentence */

type Tok = { t: string; flags: string };

/** "The [furniture|n] [are|x] expensive." → tokens. Flags: n noun highlight, v verb, x error strike,
 *  g green emphasis, L part of agreement link, c<digit/word> counter chip on this token. */
const parse = (s: string): Tok[] => {
  const out: Tok[] = [];
  const re = /\[([^\]|]+)\|([^\]]+)\]|([^[]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m[3]) out.push({ t: m[3], flags: "" });
    else out.push({ t: m[1], flags: m[2] });
  }
  return out;
};

export const Sentence: React.FC<{
  text: string;
  mark?: "wrong" | "right" | "none";
  at?: number;          // appear frame
  hlAt?: number;        // noun highlight / strike frame
  linkAt?: number;      // agreement bracket frame
  chipAt?: number;      // counter chip frame
  accent?: string;
  size?: number;
  style?: React.CSSProperties;
  fadeOutAt?: number;
  bounceAt?: number;    // chip that tries to land on a token and bounces off
}> = ({ text, mark = "none", at = 0, hlAt, linkAt, chipAt, accent = C.unit, size = 54, style, fadeOutAt, bounceAt }) => {
  const f = useCurrentFrame();
  const pop = usePop();
  const toks = parse(text);
  const hl = hlAt === undefined ? 1 : prog(f, hlAt, 14);
  const link = linkAt === undefined ? 0 : prog(f, linkAt, 16);
  const color = mark === "wrong" ? C.error : mark === "right" ? C.correct : C.ink;
  const out = fadeOutAt === undefined ? 1 : 1 - prog(f, fadeOutAt, 10);

  const renderTok = (tk: Tok, i: number) => {
    const { t, flags } = tk;
    if (!flags) return <React.Fragment key={i}>{t}</React.Fragment>;
    const chip = flags.match(/c([0-9a-z]+)/)?.[1];
    const st: React.CSSProperties = { position: "relative", display: "inline-block", whiteSpace: "pre" };
    let deco: React.ReactNode = null;
    if (flags.includes("n")) {
      deco = (
        <span style={{
          position: "absolute", left: -6, right: -6, top: "12%", bottom: "4%", borderRadius: 10,
          background: tint(accent, 0.2), transformOrigin: "left", transform: `scaleX(${hl})`, zIndex: -1,
        }} />
      );
      st.fontWeight = 800;
    }
    if (flags.includes("v")) { st.fontWeight = 800; st.color = mark === "wrong" ? C.error : C.correct; }
    if (flags.includes("g")) { st.fontWeight = 800; st.color = C.correct; }
    if (flags.includes("x")) {
      st.fontWeight = 800;
      deco = (
        <span style={{
          position: "absolute", left: -4, right: -4, top: "52%", height: Math.max(4, size / 12), background: C.error,
          transformOrigin: "left", transform: `scaleX(${hl})`, borderRadius: 3,
        }} />
      );
    }
    return (
      <span key={i} style={st}>
        {deco}
        {t}
        {chip && chipAt !== undefined && <Chip label={chip} at={chipAt} size={size * 0.9} color={accent} />}
        {flags.match(/b([0-9a-z]+)/) && bounceAt !== undefined && <BounceChip label={flags.match(/b([0-9a-z]+)/)![1]} at={bounceAt} size={size * 0.9} color={accent} />}
      </span>
    );
  };

  // group linked tokens so a bracket can be drawn underneath them
  const first = toks.findIndex((t) => t.flags.includes("L"));
  const last = toks.length - 1 - [...toks].reverse().findIndex((t) => t.flags.includes("L"));
  const body =
    first < 0 ? (
      toks.map(renderTok)
    ) : (
      <>
        {toks.slice(0, first).map(renderTok)}
        <span style={{ position: "relative", display: "inline-block", whiteSpace: "pre" }}>
          {toks.slice(first, last + 1).map((t, k) => renderTok(t, first + k))}
          <span style={{
            position: "absolute", left: 0, right: 0, bottom: -size * 0.22, height: size * 0.28,
            borderLeft: `4px solid ${accent}`, borderRight: `4px solid ${accent}`, borderBottom: `4px solid ${accent}`,
            borderRadius: "0 0 12px 12px", clipPath: `inset(0 ${(1 - link) * 100}% 0 0)`,
          }} />
        </span>
        {toks.slice(last + 1).map(renderTok)}
      </>
    );

  const markScale = pop(f, at + 4);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.35, fontSize: size, fontWeight: 600, color, lineHeight: 1.25, opacity: out, ...fadeUp(f, at), ...style }}>
      {mark !== "none" && (
        <div style={{
          flex: "none", width: size * 1.05, height: size * 1.05, borderRadius: "50%", display: "flex", alignItems: "center",
          justifyContent: "center", background: mark === "wrong" ? C.error : C.correct, color: "#fff", fontSize: size * 0.7,
          fontWeight: 800, transform: `scale(${markScale})`,
        }}>
          {mark === "wrong" ? "✗" : "✓"}
        </div>
      )}
      <div style={{ position: "relative", zIndex: 0 }}>{body}</div>
    </div>
  );
};

/* -------------------------------------------------------------------- chip */

/** Counter badge that flies in and lands above a token. */
export const Chip: React.FC<{ label: string; at: number; size?: number; color?: string; from?: [number, number]; style?: React.CSSProperties }> = ({
  label, at, size = 48, color = C.ink, from = [-140, -120], style,
}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 18);
  const land = usePop()(f, at + 14);
  if (f < at) return null;
  const x = from[0] * (1 - p);
  const y = from[1] * (1 - p) - Math.sin(p * Math.PI) * 40;
  return (
    <span style={{
      position: "absolute", left: "50%", top: -size * 1.05, width: size, height: size, marginLeft: -size / 2,
      borderRadius: "50%", background: color, color: "#fff", fontSize: size * 0.55, fontWeight: 800,
      display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT,
      transform: `translate(${x}px, ${y}px) scale(${0.85 + 0.15 * land})`, boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
      opacity: p, ...style,
    }}>
      {label}
    </span>
  );
};

/** Counter badge that flies at a token, hits it and bounces away: "this number can't go here". */
export const BounceChip: React.FC<{ label: string; at: number; size?: number; color?: string }> = ({ label, at, size = 48, color = C.ink }) => {
  const f = useCurrentFrame();
  if (f < at || f > at + 40) return null;
  const t = f - at;
  const hit = 12;
  const x = t < hit ? -160 * (1 - t / hit) : 60 * (t - hit) / 8;
  const y = t < hit ? -140 * (1 - t / hit) : -Math.abs(Math.sin((t - hit) / 5)) * 90 * Math.exp(-(t - hit) / 14) - (t - hit) * 3;
  const o = t < hit ? 1 : Math.max(0, 1 - (t - hit) / 26);
  return (
    <span style={{
      position: "absolute", left: "50%", top: -size * 1.05, width: size, height: size, marginLeft: -size / 2, borderRadius: "50%",
      background: color, color: "#fff", fontSize: size * 0.55, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: FONT, transform: `translate(${x}px, ${y}px) rotate(${t > hit ? (t - hit) * 12 : 0}deg)`, opacity: o,
    }}>{label}</span>
  );
};

/* ----------------------------------------------------------------- labels */

export const Tag: React.FC<{ children: React.ReactNode; color: string; at: number; x: number; y: number; size?: number; solid?: boolean; center?: boolean }> = ({
  children, color, at, x, y, size = 30, solid, center = true,
}) => {
  const f = useCurrentFrame();
  const s = usePop()(f, at);
  return (
    <div style={{
      position: "absolute", left: x, top: y, transform: `translate(${center ? "-50%" : "0"}, -50%) scale(${s})`,
      fontFamily: MONO, fontWeight: 600, fontSize: size, letterSpacing: 1.5, padding: `${size * 0.25}px ${size * 0.55}px`,
      borderRadius: 10, whiteSpace: "nowrap", border: `3px solid ${color}`, color: solid ? "#fff" : color,
      background: solid ? color : C.card,
    }}>
      {children}
    </div>
  );
};

export const Note: React.FC<{ children: React.ReactNode; at: number; x: number; y: number; w?: number; size?: number; color?: string; align?: "left" | "center"; italic?: boolean }> = ({
  children, at, x, y, w = 900, size = 34, color = C.inkSoft, align = "center", italic,
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{
      position: "absolute", left: align === "center" ? x - w / 2 : x, top: y, width: w, textAlign: align, fontSize: size,
      color, fontStyle: italic ? "italic" : "normal", fontWeight: 500, lineHeight: 1.3, ...fadeUp(f, at),
    }}>
      {children}
    </div>
  );
};

/** Rubber stamp, e.g. "?" or "CORRECTION". */
export const Stamp: React.FC<{ text: string; at: number; x: number; y: number; color?: string; size?: number; rot?: number }> = ({
  text, at, x, y, color = C.error, size = 44, rot = -8,
}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const p = prog(f, at, 8);
  const sc = 1.6 - 0.6 * p;
  return (
    <div style={{
      position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${sc})`, opacity: p * 0.92,
      fontFamily: MONO, fontWeight: 600, fontSize: size, color, border: `5px solid ${color}`, borderRadius: 12,
      padding: "4px 18px", letterSpacing: 3, whiteSpace: "nowrap",
    }}>
      {text}
    </div>
  );
};

/** Absolutely positioned SVG layer in stage pixels. */
export const Layer: React.FC<{ children: React.ReactNode; w: number; h: number }> = ({ children, w, h }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
    {children}
  </svg>
);

/** Place a child group at (x, y) with scale / opacity. */
export const G: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; children: React.ReactNode }> = ({ x, y, s = 1, o = 1, r = 0, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>{children}</g>
);

/* --------------------------------------------------------------- captions */

export const Captions: React.FC<{ cues: { start: number; end: number; text: string }[]; bottom: number; size: number; width: number }> = ({ cues, bottom, size, width }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const cue = cues.find((c) => t >= c.start && t < c.end);
  if (!cue) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom, display: "flex", justifyContent: "center" }}>
      <div style={{
        maxWidth: width, background: tint(C.ink, 0.88), color: "#fff", fontFamily: FONT, fontSize: size, fontWeight: 600, lineHeight: 1.3,
        padding: `${size * 0.3}px ${size * 0.6}px`, borderRadius: 14, textAlign: "center", whiteSpace: "pre-line",
      }}>
        {cue.text}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------- sfx */

export type SfxName = "pop" | "tick" | "correct" | "wrong" | "whoosh";
export const Sfx: React.FC<{ at: number; name: SfxName; volume?: number }> = ({ at, name, volume = 0.12 }) => (
  <Sequence from={Math.max(0, at)} durationInFrames={30} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);
