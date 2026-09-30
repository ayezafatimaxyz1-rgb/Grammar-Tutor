// The furniture lesson as reusable visuals, keyed to the narration. Used by the quiz and versus styles
// (and by chat for its picture bubbles). Everything is laid out on a 1000 × 1150 canvas.
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Bed, Chair, Cup, Gear, Holdall, Paper, PenStick, Plate, Shirt, Sofa, Suitcase, Table, Trousers, Wrench } from "../art";
import { Sentence } from "../components";
import { C } from "../theme";
import { useTrackCue } from "./common";

export const useLesson = () => {
  const cue = useTrackCue("sm");
  return {
    q: cue("why is"), wrong: cue("wrong"),
    look: cue("look at"), items: [cue("a chair"), cue("a table"), cue("a sofa"), cue("a bed")], many: cue("many different things"),
    doesnt: cue("doesnt name each one"), groups: cue("groups them together"), unit: cue("one unit furniture"),
    why: cue("why because"), notName: cue("not the name of an object"), collection: cue("whole collection"), furnish: cue("comes from furnish"), room: cue("furnish a room"),
    unitMeans: cue("a unit means one"), singular: cue("always singular"), addS: cue("cant add s"), so: cue("so the furniture is"),
    family: cue("the whole family"),
    fam: [
      { word: cue("luggage"), what: cue("bags and suitcases") },
      { word: cue("equipment"), what: cue("tools and machines") },
      { word: cue("clothing"), what: cue("shirts and trousers") },
      { word: cue("crockery"), what: cue("plates and cups") },
      { word: cue("stationery"), what: cue("pens and paper") },
    ],
    endings: cue("notice the endings"), endWords: [cue("luggage", 0, 1), cue("equipment", 0, 1), cue("clothing", 0, 1), cue("crockery", 0, 1)], endNote: cue("these endings"),
    each: cue("each one is one unit"), verbs: [cue("the luggage is heavy"), cue("the equipment is new"), cue("my clothing is wet")],
    count: cue("need to count"), pieces: [cue("two pieces of furniture"), cue("three pieces of luggage"), cue("an item of clothing")],
    dont: cue("dont memorise"), seeUnit: cue("see the unit"), rule: [cue("many things"), cue("one name"), cue("one verb")],
  };
};
export type L = ReturnType<typeof useLesson>;

export const FAMILY = [
  { w: "luggage", what: "bags + suitcases", icons: [<Suitcase c={C.unit} />, <Holdall c={C.unit} />], c: C.unit },
  { w: "equipment", what: "tools + machines", icons: [<Wrench c={C.material} />, <Gear c={C.material} />], c: C.material },
  { w: "clothing", what: "shirts + trousers", icons: [<Shirt c={C.activity} />, <Trousers c={C.activity} />], c: C.activity },
  { w: "crockery", what: "plates + cups", icons: [<Plate c={C.measured} />, <Cup c={C.measured} />], c: C.measured },
  { w: "stationery", what: "pens + paper", icons: [<PenStick c={C.abstract} />, <Paper c={C.abstract} />], c: C.abstract },
];
export const ENDINGS: [string, string][] = [["lugg", "age"], ["equip", "ment"], ["cloth", "ing"], ["crock", "ery"]];
export const FURN = [<Chair c={C.unit} />, <Table c={C.unit} />, <Sofa c={C.unit} />, <Bed c={C.unit} />];
export const FURN_NAMES = ["chair", "table", "sofa", "bed"];

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const ease = (p: number) => 1 - Math.pow(1 - clamp(p), 3);

export const usePopS = () => {
  const { fps } = useVideoConfig();
  return (f: number, at: number) => (f < at ? 0 : spring({ frame: f - at, fps, config: { damping: 11, stiffness: 170, mass: 0.7 } }));
};

type Th = { text: string; dim: string; accent: string; card: string };
export const DARK: Th = { text: "#FFFFFF", dim: "#B9C0D4", accent: "#FFD166", card: "#FFFFFF" };
export const LIGHT: Th = { text: "#1E2233", dim: "#5B5A60", accent: "#D9730D", card: "#FFFFFF" };

const Box: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ position: "absolute", fontFamily: "Inter, 'Noto Color Emoji', sans-serif", ...style }}>{children}</div>
);

const SentCard: React.FC<{ text: string; mark?: "wrong" | "right" | "none"; at: number; y: number; size?: number; chipAt?: number; linkAt?: number; accent?: string }> = ({ text, mark = "right", at, y, size = 54, chipAt, linkAt, accent = C.unit }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const p = ease((f - at) / 10);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: "16px 28px", boxShadow: "0 10px 26px rgba(0,0,0,0.25)" }}>
        <Sentence text={text} mark={mark} at={at} chipAt={chipAt} linkAt={linkAt} accent={accent} size={size} />
      </div>
    </div>
  );
};

/** One section of the lesson, visible from `from` to `to` with a quick fade. */
const Sec: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const f = useCurrentFrame();
  if (f < from - 2 || f > to + 8) return null;
  const o = Math.min(clamp((f - from + 2) / 8), 1 - clamp((f - to) / 8));
  return <div style={{ position: "absolute", inset: 0, opacity: o, transform: `translateY(${(1 - Math.min(1, clamp((f - from + 2) / 8))) * 40}px)` }}>{children}</div>;
};

/** The whole lesson on a 1000 × 1150 canvas. */
export const LessonCanvas: React.FC<{ th: Th; end: number }> = ({ th, end }) => {
  const f = useCurrentFrame();
  const L = useLesson();
  const pop = usePopS();
  const circle = ease((f - L.groups) / 26);
  const gather = ease((f - L.groups - 6) / 24);
  const pos = [[270, 360], [730, 360], [270, 720], [730, 720]];
  const inC = [[400, 470], [600, 470], [400, 650], [600, 650]];

  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1000, height: 1150, color: th.text, fontFamily: "Inter, 'Noto Color Emoji', sans-serif" }}>
      {/* 0 question */}
      <Sec from={0} to={L.look}>
        <SentCard text="The [furniture|n] [are|x] expensive." mark="wrong" at={L.q} y={420} size={60} />
        <Box style={{ left: 0, right: 0, top: 620, textAlign: "center", fontSize: 220, fontWeight: 900, color: th.accent, transform: `scale(${pop(f, L.wrong)})` }}>?</Box>
      </Sec>

      {/* 1 contains many things, 2 grouped into one unit */}
      <Sec from={L.look} to={L.why}>
        <Box style={{ left: 0, right: 0, top: 70, textAlign: "center", fontSize: 50, fontWeight: 800 }}>
          {f < L.doesnt ? <>furniture <span style={{ color: th.accent }}>contains…</span></> : <>English groups them into <span style={{ color: th.accent }}>ONE unit</span></>}
        </Box>
        <svg width={1000} height={1150} style={{ position: "absolute", inset: 0 }}>
          <ellipse cx={500} cy={560} rx={330} ry={260} fill="none" stroke={th.accent} strokeWidth={10} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - circle} opacity={circle > 0 ? 1 : 0} strokeLinecap="round" />
          {FURN.map((el, i) => {
            const x = pos[i][0] + (inC[i][0] - pos[i][0]) * gather, y = pos[i][1] + (inC[i][1] - pos[i][1]) * gather;
            return (
              <g key={i}>
                <g transform={`translate(${x} ${y}) scale(${pop(f, L.items[i]) * (1.4 - 0.55 * gather)})`}>{el}</g>
                <text x={x} y={y + 150 - 60 * gather} textAnchor="middle" fontSize={40} fontWeight={700} fill={th.text} fontFamily="Inter" opacity={pop(f, L.items[i]) * (1 - gather)}>{FURN_NAMES[i]}</text>
              </g>
            );
          })}
        </svg>
        <Box style={{ left: 0, right: 0, top: 930, textAlign: "center", fontSize: 46, fontWeight: 800, color: th.dim, opacity: clamp((f - L.many) / 8) * (1 - gather) }}>many different things</Box>
        <Box style={{ left: 0, right: 0, top: 870, display: "flex", justifyContent: "center", transform: `scale(${pop(f, L.unit)})` }}>
          <div style={{ background: th.accent, color: "#1E2233", fontSize: 64, fontWeight: 900, padding: "10px 40px", borderRadius: 999 }}>furniture = ONE unit</div>
        </Box>
      </Sec>

      {/* 3 why */}
      <Sec from={L.why} to={L.unitMeans}>
        <Box style={{ left: 0, right: 0, top: 40, textAlign: "center", fontSize: 110, fontWeight: 900, color: th.accent, transform: `scale(${pop(f, L.why)})` }}>WHY?</Box>
        <div style={{ position: "absolute", left: 40, right: 40, top: 220, display: "flex", gap: 30, opacity: clamp((f - L.notName) / 8) }}>
          {[{ icon: <Chair c={C.unit} />, t: "chair = an object", ok: true }, { icon: <g>{FURN.map((el, i) => <g key={i} transform={`translate(${(i % 2) * 90 - 45} ${Math.floor(i / 2) * 80 - 40}) scale(0.38)`}>{el}</g>)}</g>, t: "furniture = an object?", ok: false }].map((c, i) => (
            <div key={i} style={{ flex: 1, background: "#fff", color: "#1E2233", borderRadius: 22, padding: 20, textAlign: "center", border: `6px solid ${c.ok ? C.correct : C.error}` }}>
              <svg width={260} height={200} viewBox="-130 -100 260 200">{c.icon}</svg>
              <div style={{ fontSize: 38, fontWeight: 800 }}>{c.t} <span style={{ color: c.ok ? C.correct : C.error }}>{c.ok ? "✓" : "✗"}</span></div>
            </div>
          ))}
        </div>
        <Box style={{ left: 40, right: 40, top: 610, textAlign: "center", fontSize: 54, fontWeight: 900, transform: `scale(${pop(f, L.collection)})` }}>
          it names the <span style={{ background: th.accent, color: "#1E2233", padding: "0 14px", borderRadius: 12 }}>WHOLE collection</span>
        </Box>
        <div style={{ position: "absolute", left: 60, right: 60, top: 760, display: "flex", alignItems: "center", gap: 30, opacity: clamp((f - L.furnish) / 8) }}>
          <svg width={330} height={300} viewBox="-165 -150 330 300">
            <rect x={-150} y={-130} width={300} height={260} rx={10} fill="rgba(255,255,255,0.08)" stroke={th.text} strokeWidth={6} />
            {FURN.map((el, i) => <g key={i} transform={`translate(${(i % 2) * 140 - 70} ${Math.floor(i / 2) * 110 - 45}) scale(${0.42 * pop(f, L.room + i * 4)})`}>{el}</g>)}
          </svg>
          <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.25 }}>
            <span style={{ color: th.accent }}>furnish</span> ➜ <span style={{ color: th.accent }}>furniture</span>
            <div style={{ fontSize: 38, fontWeight: 600, color: th.dim, marginTop: 10, opacity: clamp((f - L.room) / 8) }}>everything you furnish a room with</div>
          </div>
        </div>
      </Sec>

      {/* 4 unit = 1 → singular */}
      <Sec from={L.unitMeans} to={L.family}>
        <Box style={{ left: 0, right: 0, top: 60, textAlign: "center", fontSize: 70, fontWeight: 800 }}>unit =</Box>
        <Box style={{ left: 0, right: 0, top: 130, textAlign: "center", fontSize: 330, fontWeight: 900, color: th.accent, lineHeight: 1, transform: `scale(${pop(f, L.unitMeans + 10)})` }}>1</Box>
        <Box style={{ left: 640, top: 200, fontSize: 130, fontWeight: 900, color: C.error, fontFamily: "Caveat", opacity: clamp((f - L.addS) / 6) }}>
          +s<div style={{ position: "absolute", left: -10, right: -10, top: "50%", height: 14, background: C.error, transform: `rotate(-20deg) scaleX(${clamp((f - L.addS - 20) / 6)})` }} />
        </Box>
        <Box style={{ left: 0, right: 0, top: 520, textAlign: "center", fontSize: 64, fontWeight: 900, color: "#3DDC97", opacity: clamp((f - L.singular) / 8) }}>1 is always SINGULAR</Box>
        <SentCard text="The [furniture|nL] [is|vL] expensive." at={L.so} y={720} size={60} linkAt={L.so + 14} />
      </Sec>

      {/* 5 the family */}
      <Sec from={L.family} to={L.endings}>
        <Box style={{ left: 0, right: 0, top: 10, textAlign: "center", fontSize: 54, fontWeight: 900 }}>the whole <span style={{ color: th.accent }}>family</span></Box>
        {FAMILY.map((m, i) => {
          const a = L.fam[i].word;
          const p = pop(f, a);
          return (
            <div key={m.w} style={{ position: "absolute", left: 30, right: 30, top: 110 + i * 205, height: 185, background: "#fff", color: "#1E2233", borderRadius: 24, display: "flex", alignItems: "center", gap: 18, padding: "0 24px", transform: `scale(${p})`, opacity: Math.min(1, p * 2) }}>
              <div style={{ fontSize: 50, fontWeight: 900, color: m.c, width: 290 }}>{m.w}</div>
              <svg width={300} height={170} viewBox="-150 -85 300 170" style={{ opacity: clamp((f - L.fam[i].what) / 6) }}>
                <g transform="translate(-70 0) scale(0.7)">{m.icons[0]}</g>
                <g transform="translate(70 0) scale(0.7)">{m.icons[1]}</g>
              </svg>
              <div style={{ marginLeft: "auto", background: m.c, color: "#fff", fontWeight: 900, fontSize: 30, padding: "10px 16px", borderRadius: 14, transform: `scale(${pop(f, L.fam[i].what + 12)}) rotate(-4deg)` }}>ONE UNIT</div>
            </div>
          );
        })}
      </Sec>

      {/* 6 endings */}
      <Sec from={L.endings} to={L.each}>
        <Box style={{ left: 0, right: 0, top: 30, textAlign: "center", fontSize: 58, fontWeight: 900 }}>notice the <span style={{ color: th.accent }}>endings</span> 👀</Box>
        {ENDINGS.map(([root, suf], i) => {
          const p = pop(f, L.endWords[i]);
          const lit = clamp((f - L.endNote) / 8);
          return (
            <Box key={root} style={{ left: 0, right: 0, top: 170 + i * 170, textAlign: "center", fontSize: 110, fontWeight: 900, transform: `scale(${p})` }}>
              {root}<span style={{ background: lit > 0 ? th.accent : "transparent", color: lit > 0 ? "#1E2233" : th.accent, borderRadius: 16, padding: "0 12px", marginLeft: 6 }}>{suf}</span>
            </Box>
          );
        })}
        <Box style={{ left: 40, right: 40, top: 900, textAlign: "center", fontSize: 50, fontWeight: 800, opacity: clamp((f - L.endNote) / 8) }}>
          these endings often build a word for a <span style={{ color: th.accent }}>whole collection</span>
        </Box>
      </Sec>

      {/* 7 singular verbs */}
      <Sec from={L.each} to={L.count}>
        <Box style={{ left: 0, right: 0, top: 80, textAlign: "center", fontSize: 58, fontWeight: 900 }}>one unit → <span style={{ color: "#3DDC97" }}>singular verb</span></Box>
        <SentCard text="The [luggage|nL] [is|vL] heavy." at={L.verbs[0]} y={300} linkAt={L.verbs[0] + 12} />
        <SentCard text="The [equipment|nL] [is|vL] new." at={L.verbs[1]} y={520} linkAt={L.verbs[1] + 12} accent={C.material} />
        <SentCard text="My [clothing|nL] [is|vL] wet." at={L.verbs[2]} y={740} linkAt={L.verbs[2] + 12} accent={C.activity} />
      </Sec>

      {/* 8 count a piece */}
      <Sec from={L.count} to={L.dont}>
        <Box style={{ left: 0, right: 0, top: 80, textAlign: "center", fontSize: 58, fontWeight: 900 }}>need a number? count a <span style={{ color: th.accent }}>piece</span> 🧩</Box>
        <SentCard text="two [pieces|nc2] of furniture" at={L.pieces[0]} y={320} chipAt={L.pieces[0] + 4} />
        <SentCard text="three [pieces|nc3] of luggage" at={L.pieces[1]} y={540} chipAt={L.pieces[1] + 4} />
        <SentCard text="an [item|nc1] of clothing" at={L.pieces[2]} y={760} chipAt={L.pieces[2] + 4} accent={C.activity} />
      </Sec>

      {/* 9 rule */}
      <Sec from={L.dont} to={end}>
        <Box style={{ left: 0, right: 0, top: 60, textAlign: "center", fontSize: 58, fontWeight: 900 }}>
          <span style={{ textDecoration: `line-through ${C.error} 8px` }}>memorise the list</span>
        </Box>
        <Box style={{ left: 0, right: 0, top: 170, textAlign: "center", fontSize: 72, fontWeight: 900, color: th.accent, transform: `scale(${pop(f, L.seeUnit)})` }}>SEE THE UNIT</Box>
        {["many things", "one name", "one verb"].map((t, i) => (
          <Box key={t} style={{ left: 0, right: 0, top: 360 + i * 230, display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${pop(f, L.rule[i])})` }}>
            {i > 0 && <div style={{ fontSize: 60, color: th.dim, lineHeight: 0.8 }}>↓</div>}
            <div style={{ background: i === 2 ? "#3DDC97" : "#fff", color: "#1E2233", fontSize: 64, fontWeight: 900, padding: "16px 48px", borderRadius: 24 }}>{t}</div>
          </Box>
        ))}
      </Sec>
    </div>
  );
};
