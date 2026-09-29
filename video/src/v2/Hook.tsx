// Shared opening for every case video: the memorised list, then "what if you could prove it?"
import React from "react";
import { useCurrentFrame } from "remotion";
import { Bowl, Bulb, Chair, GoldBlob, Suitcase } from "../art";
import { TaskCard } from "../scenes/shared";
import { MONO } from "../theme";
import { prog, useCue } from "../timing";
import { Fx, K, Lens, Slam, Stage, Svg, useSpring } from "./kit";

export const HOOK_WORDS = [
  { w: "Furniture", c: K.unit, icon: <Chair c={K.unit} /> },
  { w: "Luggage", c: K.unit, icon: <Suitcase c={K.unit} /> },
  { w: "Gold", c: K.material, icon: <GoldBlob /> },
  { w: "Rice", c: K.measured, icon: <Bowl c={K.ink} /> },
  { w: "Knowledge", c: K.abstract, icon: <Bulb c={K.abstract} /> },
  { w: "Work", c: K.activity, icon: <TaskCard kind="type" label="" /> },
];

const EXTRA = ["baggage", "equipment", "sugar", "advice", "information", "research", "clothing", "milk", "progress", "traffic", "scenery", "evidence", "silver", "homework", "news", "bread"];

/** 2 × 3 grid of word cards. `at[i]` = frame each card slams in; `drop` makes them fall away. */
const HookGrid: React.FC<{ at: number[]; drop?: number; highlight?: string }> = ({ at, drop, highlight }) => {
  const f = useCurrentFrame();
  const sp = useSpring();
  return (
    <>
      {HOOK_WORDS.map((h, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = 70 + col * 480, y = 360 + row * 300;
        const s = sp(f, at[i], { damping: 9, stiffness: 220 });
        const fall = drop === undefined ? 0 : prog(f, drop + i * 3, 22);
        const rot = (i % 2 ? 3 : -3) + fall * (i % 2 ? 40 : -40);
        const hi = highlight === h.w;
        if (f < at[i]) return null;
        return (
          <div key={h.w} style={{
            position: "absolute", left: x, top: y, width: 460, height: 260, background: K.card, color: K.ink, borderRadius: 18,
            boxShadow: hi ? `0 0 0 8px ${K.yellow}, 0 18px 40px rgba(0,0,0,0.5)` : "0 18px 40px rgba(0,0,0,0.5)",
            transform: `translateY(${fall * 2100}px) rotate(${rot}deg) scale(${1.6 - 0.6 * s})`, opacity: Math.min(1, s * 2),
            display: "flex", alignItems: "center", gap: 10, padding: "0 24px",
          }}>
            <svg width={170} height={200} viewBox="-110 -130 220 260" style={{ flex: "none" }}>
              <g transform="scale(0.95)">{h.icon}</g>
            </svg>
            <div style={{ fontSize: h.w.length > 8 ? 46 : 56, fontWeight: 900, color: h.c === K.unit ? "#2F5DA8" : h.c === K.material ? "#1E8F7E" : h.c === K.measured ? "#C76E1A" : h.c === K.abstract ? "#7E3FA0" : "#C8325F" }}>{h.w}</div>
          </div>
        );
      })}
    </>
  );
};

export const HookList: React.FC<{ highlight?: string }> = ({ highlight }) => {
  const f = useCurrentFrame();
  const cue = useCue();
  const at = ["furniture", "luggage", "gold", "rice", "knowledge", "work"].map((w) => cue(w));
  const tMem = cue("memorise");
  const tLists = cue("lists like these");
  const tRule = cue("no plural");
  return (
    <Stage shakes={[tMem]}>
      {/* list overload: more words raining down behind the cards */}
      {EXTRA.map((w, i) => {
        const start = tLists + i * 3;
        if (f < start) return null;
        const t = (f - start) / 30;
        return (
          <div key={w} style={{
            position: "absolute", left: 40 + ((i * 263) % 900), top: -80 + t * 520 + (i % 4) * 60, fontFamily: MONO, fontSize: 40,
            color: "rgba(244,241,232,0.35)", transform: `rotate(${(i % 5) * 7 - 14}deg)`,
          }}>{w}</div>
        );
      })}
      <HookGrid at={at} highlight={f > tRule ? highlight : undefined} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 170, textAlign: "center", fontFamily: MONO, fontSize: 40, color: K.dim, opacity: prog(f, at[0]) }}>
        THE LIST YOU WERE GIVEN
      </div>
      {f >= tMem && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center" }}>
          <div style={{
            transform: `rotate(-12deg) scale(${2 - prog(f, tMem, 7)})`, border: `10px solid ${K.red}`, color: K.red, background: "rgba(12,22,41,0.88)",
            fontFamily: MONO, fontWeight: 600, fontSize: 120, padding: "0 34px", borderRadius: 18, letterSpacing: 8,
          }}>MEMORISE!</div>
        </div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1290, textAlign: "center", fontSize: 52, fontWeight: 800, opacity: prog(f, tRule) }}>
        <span style={{ color: K.red }}>no plural</span> · <span style={{ color: K.yellow }}>singular verb</span>
      </div>
      <Fx at={tMem} name="stamp" volume={0.35} />
      {at.map((a, i) => <Fx key={i} at={a} name="slam" volume={0.18} />)}
    </Stage>
  );
};

export const HookTwist: React.FC<{ highlight?: string }> = ({ highlight }) => {
  const f = useCurrentFrame();
  const cue = useCue();
  const sp = useSpring();
  const t0 = cue("but what if");
  const tNo = cue("didnt have to");
  const tProve = cue("prove it");
  const tLogic = cue("with logic");
  const lensIn = sp(f, tNo - 4, { damping: 8, stiffness: 150 });
  return (
    <Stage shakes={[tProve]}>
      <HookGrid at={[-60, -60, -60, -60, -60, -60]} drop={t0} highlight={highlight} />
      <Svg>
        <Lens x={540} y={lerpNum(1500, 760, lensIn)} s={1.5} mood={f > tProve ? "happy" : "shock"} look={[0, -0.3]} o={Math.min(1, lensIn * 2)} />
      </Svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <Slam at={tNo} size={84}>
          <span>Don’t </span><span style={{ textDecoration: `line-through ${K.red} 10px` }}>memorise</span>
        </Slam>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <Slam at={tProve} size={170} color={K.yellow}>PROVE IT.</Slam>
        <div style={{ fontSize: 54, fontWeight: 800, color: K.text, opacity: prog(f, tLogic), fontFamily: MONO }}>with logic</div>
      </div>
      <Fx at={t0} name="whoosh" volume={0.3} />
      <Fx at={tNo - 4} name="boing" />
      <Fx at={tProve - 28} name="riser" volume={0.18} />
      <Fx at={tProve} name="slam" volume={0.35} />
    </Stage>
  );
};

const lerpNum = (a: number, b: number, p: number) => a + (b - a) * p;
