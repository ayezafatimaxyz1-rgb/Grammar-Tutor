// Style sample E: old school rule vs the logic. A boring memorise list loses health every time the logic proves a point.
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Fx, Karaoke } from "../v2/kit";
import timings from "../timings.json";
import { Full, TrackAudio, track } from "./common";
import { DARK, LessonCanvas, useLesson } from "./lesson";

type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };
const CAPS = (timings as unknown as { captions: Record<string, Cue[]> }).captions;
const LIST = ["furniture: uncountable", "luggage: uncountable", "baggage: uncountable", "equipment: uncountable", "clothing: uncountable", "crockery: uncountable", "cutlery: uncountable", "stationery: uncountable", "machinery: uncountable", "scenery: uncountable", "traffic: uncountable", "garbage: uncountable"];

export const VersusSample: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLesson();
  const end = track("sm").reduce((a, s) => a + s.frames, 0);
  const hits = [L.unit, L.collection, L.so, L.fam[4].what + 12, L.endNote, L.verbs[2] + 12, L.pieces[2] + 6, L.rule[2]];
  const done = hits.filter((h) => f >= h).length;
  const hp = 1 - done / hits.length;
  const last = [...hits].reverse().find((h) => f >= h) ?? -99;
  const flash = Math.max(0, 1 - (f - last) / 10);
  const shake = flash * 14 * Math.sin(f * 2.7);
  const ko = f >= L.rule[2] ? spring({ frame: f - L.rule[2], fps, config: { damping: 18 } }) : 0;

  return (
    <Full bg="#0F1830">
      {/* OLD SCHOOL panel */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 540, background: "#D9D6CF", overflow: "hidden", fontFamily: "Inter, 'Noto Color Emoji'", filter: `grayscale(${0.4 + done * 0.08})`, transform: `translate(${shake}px, ${ko * 700}px) rotate(${ko * 8}deg)`, opacity: 1 - ko }}>
        <div style={{ position: "absolute", left: 40, top: 40, fontSize: 40, fontWeight: 900, color: "#555", letterSpacing: 2 }}>✗ OLD SCHOOL RULE 😴</div>
        <div style={{ position: "absolute", left: 40, top: 110, fontSize: 32, fontStyle: "italic", color: "#777" }}>“just memorise the list…”</div>
        <div style={{ position: "absolute", left: 60, right: 60, top: 170, bottom: 20, overflow: "hidden" }}>
          <div style={{ transform: `translateY(${-(f * 1.4) % (LIST.length * 58)}px)` }}>
            {[...LIST, ...LIST].map((w, i) => <div key={i} style={{ fontFamily: "'IBM Plex Mono'", fontSize: 38, color: "#666", lineHeight: "58px" }}>• {w}</div>)}
          </div>
        </div>
        {/* cracks as it loses */}
        <svg width={1080} height={540} style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: done }, (_, i) => (
            <path key={i} d={`M${120 + i * 120} 0 L${160 + i * 110} 120 L${110 + i * 125} 260 L${170 + i * 118} 540`} stroke="#333" strokeWidth={5} fill="none" opacity={0.6} />
          ))}
        </svg>
        <div style={{ position: "absolute", inset: 0, background: `rgba(230,57,70,${flash * 0.35})` }} />
      </div>
      {/* health bars */}
      <div style={{ position: "absolute", left: 30, right: 30, top: 560, opacity: 1 - ko, display: "flex", alignItems: "center", gap: 16, fontFamily: "Inter", zIndex: 2 }}>
        <div style={{ color: "#E63946", fontWeight: 900, fontSize: 32, width: 190 }}>MEMORISE</div>
        <div style={{ flex: 1, height: 34, background: "#2A2F45", borderRadius: 17, overflow: "hidden", border: "3px solid #444A66" }}>
          <div style={{ width: `${hp * 100}%`, height: "100%", background: "linear-gradient(90deg, #E63946, #FF7B7B)", transition: "none" }} />
        </div>
        <div style={{ color: "#FFD166", fontWeight: 900, fontSize: 60 }}>VS</div>
        <div style={{ color: "#3DDC97", fontWeight: 900, fontSize: 32 }}>LOGIC ✓</div>
      </div>
      {/* THE LOGIC panel */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 620 - ko * 440, bottom: 0, background: "linear-gradient(#16254A, #0F1830)" }}>
        <div style={{ position: "absolute", left: 40, top: 20, fontSize: 40, fontWeight: 900, color: "#3DDC97", fontFamily: "Inter", letterSpacing: 2 }}>✓ THE LOGIC</div>
        <div style={{ position: "absolute", left: 90, top: 60, width: 1000, height: 1150, transform: "scale(0.9)", transformOrigin: "0 0" }}>
          <LessonCanvas th={DARK} end={end} />
        </div>
      </div>
      {f >= L.rule[2] + 6 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 90, textAlign: "center", fontSize: 84, fontWeight: 900, color: "#FFD166", fontFamily: "Inter, 'Noto Color Emoji'", transform: `scale(${spring({ frame: f - L.rule[2] - 6, fps, config: { damping: 9 } })})` }}>K.O. · LOGIC WINS 🏆</div>
      )}
      <Karaoke cues={CAPS.sm} top={1700} />
      <TrackAudio id="sm" />
      {hits.map((h, i) => <Fx key={i} at={h} name="slam" volume={0.22} />)}
      <Fx at={L.rule[2]} name="stamp" volume={0.35} />
    </Full>
  );
};
