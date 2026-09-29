// Scene building blocks shared by cases 02–05: case folder opening, rule flow, slice effect.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Sentence } from "../components";
import { MONO } from "../theme";
import { prog } from "../timing";
import { Card, Fx, K, Lens, Proven, Slam, Stage, Svg, useSpring } from "./kit";

/** Manila case folder slamming open with the case word, followed by the question card. */
export const CaseFolder: React.FC<{
  num: string; kind: string; word: string; openAt: number; wordAt: number; cardAt: number; accent: string;
  lines: { text: string; mark: "wrong" | "right" | "none"; hlAt?: number }[];
}> = ({ num, kind, word, openAt, wordAt, cardAt, accent, lines }) => {
  const f = useCurrentFrame();
  const open = useSpring()(f, openAt, { damping: 13 });
  return (
    <Stage shakes={[wordAt]}>
      <div style={{ position: "absolute", left: 90, top: 330, width: 900, height: 480, transform: `scaleY(${open})`, transformOrigin: "top" }}>
        <div style={{ position: "absolute", left: 0, top: -54, width: 300, height: 70, background: "#E4C98F", borderRadius: "14px 14px 0 0", fontFamily: MONO, fontWeight: 600, fontSize: 38, color: K.ink, display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: 3 }}>CASE {num}</div>
        <div style={{ position: "absolute", inset: 0, background: "#E4C98F", borderRadius: "0 18px 18px 18px", boxShadow: "0 24px 50px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: MONO, fontSize: 36, color: "#6B4F1D", letterSpacing: 4 }}>{kind}</div>
          <Slam at={wordAt} size={130} color={K.ink}>{word}</Slam>
        </div>
      </div>
      <Card at={cardAt} y={900} rot={-2}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
          {lines.map((l, i) => (
            <Sentence key={i} text={l.text} mark={l.mark} at={cardAt + i * 8} hlAt={l.hlAt} accent={accent} size={56} />
          ))}
        </div>
      </Card>
      <Svg><Lens x={880} y={1330} s={0.85} mood="search" look={[-0.6, -0.8]} o={prog(f, cardAt + 6)} /></Svg>
      <Fx at={openAt} name="whoosh" />
      <Fx at={wordAt} name="slam" volume={0.3} />
    </Stage>
  );
};

/** Vertical rule flow ending in CASE CLOSED. */
export const RuleFlow: React.FC<{ topAt: number; top: React.ReactNode; steps: { at: number; content: React.ReactNode; bg: string; color?: string }[]; closeAt: number }> = ({
  topAt, top, steps, closeAt,
}) => {
  const f = useCurrentFrame();
  return (
    <Stage shakes={[closeAt]}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 170, textAlign: "center", fontFamily: MONO, fontSize: 44, letterSpacing: 4, opacity: prog(f, topAt) }}>{top}</div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 320, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ fontSize: 60, color: K.dim, opacity: prog(f, s.at), lineHeight: 1 }}>↓</div>}
            <div style={{ opacity: prog(f, s.at), transform: `translateY(${(1 - prog(f, s.at)) * 40}px)`, background: s.bg, color: s.color ?? K.ink, fontSize: 50, fontWeight: 900, padding: "22px 34px", borderRadius: 20, textAlign: "center" }}>
              {s.content}
            </div>
          </React.Fragment>
        ))}
      </div>
      <Svg><Lens x={150} y={1330} s={0.7} mood="happy" o={prog(f, steps[steps.length - 1].at)} /></Svg>
      <Proven at={closeAt} y={1310} label="CASE CLOSED" color={K.yellow} text="" />
      {steps.map((s, i) => <Fx key={i} at={s.at} name={i === steps.length - 1 ? "correct" : "pop"} volume={0.2} />)}
      <Fx at={closeAt} name="stamp" volume={0.4} />
    </Stage>
  );
};

/** Bright slash across the frame at (x, y), angle a. Pair with a "whoosh" + "click". */
export const Slash: React.FC<{ at: number; x: number; y: number; len?: number; a?: number }> = ({ at, x, y, len = 700, a = -60 }) => {
  const f = useCurrentFrame();
  if (f < at || f > at + 14) return null;
  const p = prog(f, at, 5);
  const fade = 1 - prog(f, at + 5, 9);
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`} opacity={fade}>
      <line x1={-len / 2} y1={0} x2={-len / 2 + len * p} y2={0} stroke="#fff" strokeWidth={10} strokeLinecap="round" />
      <line x1={-len / 2} y1={0} x2={-len / 2 + len * p} y2={0} stroke={K.yellow} strokeWidth={30} strokeLinecap="round" opacity={0.35} />
    </g>
  );
};
