// Style sample D: quiz show. "Right or wrong?" with a countdown, then rounds that prove the logic.
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Fx, Karaoke } from "../v2/kit";
import timings from "../timings.json";
import { Full, TrackAudio, track } from "./common";
import { DARK, LessonCanvas, useLesson } from "./lesson";

type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };
const CAPS = (timings as unknown as { captions: Record<string, Cue[]> }).captions;

export const QuizSample: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLesson();
  const end = track("sm").reduce((a, s) => a + s.frames, 0);
  const pop = (at: number) => (f < at ? 0 : spring({ frame: f - at, fps, config: { damping: 10, stiffness: 180 } }));

  const reveal = L.look - 6;
  const points = [reveal, L.unit, L.collection, L.so, ...L.fam.map((m) => m.what + 12), L.endNote, ...L.verbs.map((v) => v + 12), ...L.pieces.map((p) => p + 6)];
  const score = points.filter((p) => f >= p).length;
  const rounds: [number, string][] = [[L.q - 8, "ROUND 1 · RIGHT or WRONG?"], [L.look, "ROUND 2 · WHAT’S INSIDE?"], [L.why, "ROUND 3 · WHY?"], [L.family, "ROUND 4 · LIGHTNING ROUND ⚡"], [L.endings, "ROUND 5 · SPOT THE PATTERN"], [L.each, "ROUND 6 · IS or ARE?"], [L.count, "ROUND 7 · COUNT IT"], [L.dont, "FINAL ANSWER"]];
  const cur = [...rounds].reverse().find((r) => f >= r[0]);
  const count = Math.max(0, Math.ceil((reveal - f) / fps));
  const final = L.rule[2];

  return (
    <Full bg="radial-gradient(ellipse at 50% 0%, #5B2A86 0%, #2A1146 55%, #14082A 100%)">
      {/* spotlights */}
      {[-1, 1].map((s) => (
        <div key={s} style={{ position: "absolute", left: s < 0 ? -200 : 600, top: -200, width: 700, height: 1600, background: "linear-gradient(rgba(255,230,150,0.18), transparent 70%)", transform: `rotate(${s * (18 + Math.sin(f / 30) * 6)}deg)`, transformOrigin: "top center", filter: "blur(10px)" }} />
      ))}
      {/* header */}
      <div style={{ position: "absolute", left: 40, right: 40, top: 60, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Inter, 'Noto Color Emoji'" }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: "#FFD166", textShadow: "0 0 20px rgba(255,209,102,0.6)" }}>RIGHT or WRONG?</div>
        <div style={{ background: "#FFD166", color: "#2A1146", fontSize: 40, fontWeight: 900, padding: "10px 24px", borderRadius: 999, transform: `scale(${1 + 0.25 * Math.max(0, 1 - (f - (points.filter((p) => f >= p).pop() ?? -99)) / 8)})` }}>⭐ {score}</div>
      </div>
      {cur && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", justifyContent: "center" }}>
          <div key={cur[1]} style={{ background: "rgba(255,255,255,0.12)", border: "3px solid rgba(255,255,255,0.35)", color: "#fff", fontSize: 38, fontWeight: 800, padding: "10px 30px", borderRadius: 999, transform: `scale(${pop(cur[0])})`, fontFamily: "Inter, 'Noto Color Emoji'" }}>{cur[1]}</div>
        </div>
      )}
      {/* stage card */}
      <div style={{ position: "absolute", left: 40, top: 270, width: 1000, height: 1150, transform: "scale(1)", borderRadius: 40, background: "rgba(255,255,255,0.06)", border: "4px solid rgba(255,255,255,0.18)" }}>
        <LessonCanvas th={DARK} end={end} />
      </div>
      {/* round 1 buttons + countdown */}
      {f < L.look + 20 && (
        <div style={{ position: "absolute", left: 60, right: 60, top: 1180, display: "flex", gap: 40, fontFamily: "Inter, 'Noto Color Emoji'" }}>
          {[{ t: "✓ RIGHT", c: "#1B9E55", win: false }, { t: "✗ WRONG", c: "#E63946", win: true }].map((b) => (
            <div key={b.t} style={{ flex: 1, textAlign: "center", fontSize: 60, fontWeight: 900, color: "#fff", padding: "26px 0", borderRadius: 30, background: b.c,
              opacity: f >= reveal && !b.win ? 0.3 : 1, transform: `scale(${f >= reveal && b.win ? 1.08 + 0.04 * Math.sin(f / 2) : 1})`, boxShadow: f >= reveal && b.win ? "0 0 50px rgba(230,57,70,0.9)" : "0 10px 0 rgba(0,0,0,0.3)" }}>{b.t}</div>
          ))}
        </div>
      )}
      {f >= L.wrong - 4 && f < reveal && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 950, textAlign: "center", fontSize: 200, fontWeight: 900, color: "#FFD166", fontFamily: "Inter", transform: `scale(${1.3 - ((f - L.wrong) % fps) / fps * 0.3})` }}>{count}</div>
      )}
      {/* winner */}
      {f >= final + 10 && (
        <>
          {Array.from({ length: 40 }, (_, i) => {
            const t = f - final - 10;
            return <div key={i} style={{ position: "absolute", left: (i * 131) % 1080, top: -40 + t * (8 + (i % 5) * 3) - (i % 7) * 60, width: 18, height: 30, background: ["#FFD166", "#E63946", "#3DDC97", "#5AA9FF", "#B388FF"][i % 5], transform: `rotate(${t * (i % 2 ? 9 : -7)}deg)` }} />;
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 1440, textAlign: "center", fontSize: 76, fontWeight: 900, color: "#FFD166", transform: `scale(${pop(final + 10)})`, fontFamily: "Inter, 'Noto Color Emoji'" }}>LOGIC WINS 🏆</div>
        </>
      )}
      <Karaoke cues={CAPS.sm} top={1560} />
      <TrackAudio id="sm" />
      {rounds.map((r, i) => <Fx key={i} at={r[0]} name="whoosh" volume={0.15} />)}
      {Array.from({ length: 3 }, (_, i) => <Fx key={`c${i}`} at={reveal - (3 - i) * fps} name="tick" volume={0.3} />)}
      <Fx at={reveal} name="buzzer" volume={0.25} />
      {points.slice(1).map((p, i) => <Fx key={`p${i}`} at={p} name="ding" volume={0.14} />)}
      <Fx at={final + 10} name="correct" volume={0.3} />
    </Full>
  );
};
