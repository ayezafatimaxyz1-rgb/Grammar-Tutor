// Style sample G: talking objects. The furniture has faces and talks; "English" (a book) groups them
// into FURNITURE; the luggage, equipment, clothing, crockery and stationery gangs follow.
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Bed, Chair, Shirt, Sofa, Suitcase, Table } from "../art";
import { Sentence } from "../components";
import { C } from "../theme";
import { Fx, Karaoke } from "../v2/kit";
import timings from "../timings.json";
import { Full, TrackAudio, track } from "./common";
import { ENDINGS, FAMILY, useLesson } from "./lesson";

type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };
const CAPS = (timings as unknown as { captions: Record<string, Cue[]> }).captions;
const clamp = (v: number) => Math.max(0, Math.min(1, v));

/** Cartoon face: eyes that blink and look, mouth that moves while talking. */
const Face: React.FC<{ x: number; y: number; s?: number; talk?: boolean; mood?: "happy" | "sad" | "wow" | "sweat"; f: number; seed?: number }> = ({ x, y, s = 1, talk, mood = "happy", f, seed = 0 }) => {
  const blink = (f + seed * 23) % 110 > 104 ? 0.15 : 1;
  const open = talk ? 0.35 + 0.65 * Math.abs(Math.sin(f / 2.2 + seed)) : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-18, 18].map((ex) => (
        <g key={ex}>
          <ellipse cx={ex} cy={0} rx={10} ry={13 * blink} fill="#fff" stroke="#1E2233" strokeWidth={3} />
          {blink > 0.5 && <circle cx={ex + 2} cy={2} r={5.5} fill="#1E2233" />}
        </g>
      ))}
      <ellipse cx={-30} cy={20} rx={7} ry={4} fill="#FF9AA2" opacity={0.7} />
      <ellipse cx={30} cy={20} rx={7} ry={4} fill="#FF9AA2" opacity={0.7} />
      {mood === "sad" ? <path d="M-10 26 Q0 18 10 26" stroke="#1E2233" strokeWidth={4} fill="none" strokeLinecap="round" />
        : mood === "wow" || open > 0 ? <ellipse cx={0} cy={24} rx={8} ry={4 + 8 * Math.max(open, mood === "wow" ? 0.8 : 0)} fill="#7A1F2B" stroke="#1E2233" strokeWidth={3} />
          : <path d="M-11 20 Q0 32 11 20" stroke="#1E2233" strokeWidth={4} fill="none" strokeLinecap="round" />}
      {mood === "sweat" && <path d="M34 -18 Q40 -6 34 0 Q28 -6 34 -18 Z" fill="#7EC8F8" />}
    </g>
  );
};

/** A character: artwork + face, bouncing gently. */
const Char: React.FC<{ el: React.ReactNode; face: [number, number]; x: number; y: number; s?: number; talk?: boolean; mood?: "happy" | "sad" | "wow" | "sweat"; f: number; seed: number; o?: number }> = ({ el, face, x, y, s = 1, talk, mood, f, seed, o = 1 }) => {
  const bob = Math.abs(Math.sin(f / 7 + seed)) * (talk ? 14 : 6);
  const squash = 1 + (talk ? Math.sin(f / 3.5 + seed) * 0.03 : 0);
  return (
    <g transform={`translate(${x} ${y - bob}) scale(${s * squash} ${s / squash})`} opacity={o}>
      <ellipse cx={0} cy={105 + bob / s} rx={90} ry={14} fill="rgba(0,0,0,0.12)" />
      {el}
      <Face x={face[0]} y={face[1]} f={f} talk={talk} mood={mood} seed={seed} />
    </g>
  );
};

/** Speech bubble above (x, y). */
const Bubble: React.FC<{ x: number; y: number; at: number; until: number; f: number; children: React.ReactNode; w?: number; tail?: "left" | "right" | "mid"; color?: string }> = ({ x, y, at, until, f, children, w = 520, tail = "mid", color = "#fff" }) => {
  const { fps } = useVideoConfig();
  if (f < at || f > until) return null;
  const s = spring({ frame: f - at, fps, config: { damping: 10, stiffness: 200 } });
  const tx = tail === "left" ? 60 : tail === "right" ? w - 60 : w / 2;
  return (
    <div style={{ position: "absolute", left: x - tx, top: y, width: w, transform: `scale(${s})`, transformOrigin: `${tx}px 100%` }}>
      <div style={{ position: "absolute", left: 0, bottom: 0, width: w, background: color, border: "5px solid #1E2233", borderRadius: 36, padding: "18px 26px", fontSize: 44, fontWeight: 800, color: "#1E2233", textAlign: "center", fontFamily: "Inter, 'Noto Color Emoji'", lineHeight: 1.2 }}>
        {children}
        <div style={{ position: "absolute", left: tx - 18, bottom: -30, width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: "30px solid #1E2233" }} />
        <div style={{ position: "absolute", left: tx - 12, bottom: -20, width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: `21px solid ${color}` }} />
      </div>
    </div>
  );
};

/** "English", a book with a face. */
const Book: React.FC<{ x: number; y: number; s?: number; talk?: boolean; f: number; o?: number }> = ({ x, y, s = 1, talk, f, o = 1 }) => (
  <g transform={`translate(${x} ${y - Math.abs(Math.sin(f / 8)) * 8}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={135} rx={100} ry={14} fill="rgba(0,0,0,0.15)" />
    <rect x={-95} y={-125} width={190} height={250} rx={14} fill="#C0392B" stroke="#1E2233" strokeWidth={6} />
    <rect x={-95} y={-125} width={28} height={250} rx={8} fill="#8E2A20" />
    <rect x={-55} y={-100} width={130} height={50} rx={8} fill="#F6D365" />
    <text x={10} y={-66} textAnchor="middle" fontSize={30} fontWeight={900} fill="#1E2233" fontFamily="Inter">ENGLISH</text>
    <g transform="translate(10 10)">
      <circle cx={-22} cy={0} r={22} fill="none" stroke="#1E2233" strokeWidth={5} />
      <circle cx={22} cy={0} r={22} fill="none" stroke="#1E2233" strokeWidth={5} />
      <path d="M0 0 H0" stroke="#1E2233" strokeWidth={5} />
      <Face x={0} y={0} f={f} talk={talk} seed={9} />
    </g>
  </g>
);

const ROOM_BG = (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1250, background: "linear-gradient(#FFF1E0, #FFE3C7)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1250, bottom: 0, background: "repeating-linear-gradient(90deg, #E7B27A 0 180px, #DDA56B 180px 184px)" }} />
    <div style={{ position: "absolute", left: 80, top: 330, width: 300, height: 260, background: "#BFE3FF", border: "14px solid #FFFFFF", boxShadow: "0 0 0 4px #E3C9A8" }} />
  </>
);

export const TalkingSample: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLesson();
  const end = track("sm").reduce((a, s) => a + s.frames, 0);
  const sec = (a: number, b: number) => f >= a - 2 && f < b + 2;
  const sp = (at: number, d = 12) => (f < at ? 0 : spring({ frame: f - at, fps, config: { damping: d } }));
  const talking = (a: number, b: number) => f >= a && f < b;

  const furn = [
    { el: <Chair c={C.unit} />, face: [0, -70] as [number, number] },
    { el: <Table c={C.unit} />, face: [0, 30] as [number, number] },
    { el: <Sofa c={C.unit} />, face: [0, -32] as [number, number] },
    { el: <Bed c={C.unit} />, face: [-60, 18] as [number, number] },
  ];
  const huddle = clamp((f - L.groups) / 20);
  const baseP = [[270, 1010], [790, 1010], [270, 1340], [790, 1340]], hudP = [[440, 1150], [650, 1150], [440, 1320], [650, 1320]];
  const famFaces: [number, number][][] = [[[0, -5], [0, 5]], [[40, -80], [0, 0]], [[0, 5], [0, -45]], [[0, 0], [0, 5]], [[-10, -20], [0, 10]]];
  const verbMood: ("sweat" | "wow" | "sad")[] = ["sweat", "wow", "sad"];

  return (
    <Full bg="#FFE3C7">
      {ROOM_BG}

      {/* scene A: furniture in the room (question → why → one) */}
      {sec(0, L.family) && (
        <>
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            {/* lasso around the huddle */}
            <ellipse cx={545} cy={1240} rx={360} ry={260} fill="none" stroke="#F4A300" strokeWidth={12} strokeDasharray="1 1" pathLength={1} strokeDashoffset={1 - clamp((f - L.groups - 8) / 18)} opacity={huddle > 0 ? 1 : 0} strokeLinecap="round" />
            {furn.map((c, i) => (
              <Char key={i} el={c.el} face={c.face} x={baseP[i][0] + (hudP[i][0] - baseP[i][0]) * huddle} y={baseP[i][1] + (hudP[i][1] - baseP[i][1]) * huddle} s={1.4 - huddle * 0.55} f={f} seed={i}
                talk={talking(L.items[i], L.items[i] + 30) || (i === 0 && (talking(L.q, L.q + 50) || talking(L.why, L.why + 25)))}
                mood={f > L.addS && f < L.addS + 30 ? "wow" : "happy"} />
            ))}
            <Book x={820} y={580} s={1.3} f={f} talk={talking(L.wrong, L.look) || talking(L.groups, L.why) || talking(L.notName, L.unitMeans) || talking(L.singular, L.family)} o={sp(L.wrong - 6)} />
            {/* "s" character running at the name and bouncing off */}
            {f >= L.addS && f < L.addS + 60 && (() => {
              const t = f - L.addS;
              const x = t < 18 ? 1100 - t * 22 : 704 + (t - 18) * 12;
              const y = 900 - (t >= 18 ? Math.abs(Math.sin((t - 18) / 5)) * 140 * Math.exp(-(t - 18) / 18) : 0);
              return (
                <g transform={`translate(${x} ${y}) rotate(${t >= 18 ? (t - 18) * 12 : 0})`}>
                  <circle r={46} fill="#FFD1DC" stroke="#1E2233" strokeWidth={5} />
                  <text y={20} textAnchor="middle" fontSize={64} fontWeight={900} fontFamily="Inter" fill="#1E2233">s</text>
                </g>
              );
            })()}
          </svg>
          {/* name banner and the big 1 */}
          {f >= L.unit && (
            <div style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center", transform: `scale(${sp(L.unit, 9)})` }}>
              <div style={{ background: "#F4A300", color: "#1E2233", fontSize: 64, fontWeight: 900, padding: "10px 36px", borderRadius: 20, border: "5px solid #1E2233", fontFamily: "Inter" }}>FURNITURE {f >= L.unitMeans + 8 ? "= 1" : "= ONE UNIT"}</div>
            </div>
          )}
          <Bubble x={270} y={830} at={L.q} until={L.look} f={f} tail="left" color="#FFE0E0">The furniture <span style={{ color: "#E63946" }}>ARE</span> expensive!</Bubble>
          <Bubble x={820} y={370} at={L.wrong} until={L.look} f={f} w={300} color="#FFFFFF"><span style={{ color: "#E63946" }}>Nope ✗</span></Bubble>
          {furn.map((_, i) => (
            <Bubble key={i} x={baseP[i][0]} y={baseP[i][1] - 160} at={L.items[i]} until={L.items[i] + 40} f={f} w={330}>I’m a {["chair", "table", "sofa", "bed"][i]}!</Bubble>
          ))}
          <Bubble x={900} y={370} at={L.many} until={L.doesnt} f={f} w={520} tail="right">4 different things!</Bubble>
          <Bubble x={900} y={370} at={L.groups} until={L.why - 4} f={f} w={640} tail="right">I name you together… <span style={{ color: "#D9730D" }}>FURNITURE!</span></Bubble>
          <Bubble x={440} y={1010} at={L.why - 4} until={L.notName} f={f} w={380} tail="left">But WHY? 🤔</Bubble>
          <Bubble x={900} y={370} at={L.notName} until={L.collection} f={f} w={700} tail="right">You’re not ‘a furniture’. You’re a <span style={{ color: C.unit }}>CHAIR</span>!</Bubble>
          <Bubble x={900} y={370} at={L.collection} until={L.furnish} f={f} w={700} tail="right">‘Furniture’ = ALL of you. The <span style={{ color: "#D9730D" }}>whole collection</span>.</Bubble>
          <Bubble x={900} y={370} at={L.furnish} until={L.unitMeans} f={f} w={700} tail="right"><span style={{ color: "#D9730D" }}>furnish ➜ furniture</span><br /><span style={{ fontSize: 34, fontWeight: 600 }}>everything you furnish a room with</span></Bubble>
          <Bubble x={900} y={370} at={L.unitMeans} until={L.addS} f={f} w={560} tail="right">A unit means <span style={{ fontSize: 64 }}>1</span>!</Bubble>
          <Bubble x={900} y={370} at={L.addS + 20} until={L.singular} f={f} w={420} tail="right">No “s” on 1! 🚫</Bubble>
          <Bubble x={900} y={370} at={L.singular} until={L.so} f={f} w={600} tail="right">One is always <span style={{ color: "#1B9E55" }}>SINGULAR</span>.</Bubble>
          {f >= L.so && (
            <div style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", justifyContent: "center", transform: `scale(${sp(L.so)})` }}>
              <div style={{ background: "#fff", border: "5px solid #1E2233", borderRadius: 24, padding: "16px 28px" }}>
                <Sentence text="The [furniture|nL] [is|vL] expensive." mark="right" at={L.so} linkAt={L.so + 12} accent={C.unit} size={54} />
              </div>
            </div>
          )}
        </>
      )}

      {sec(L.family, L.dont) && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(#FFF6EC, #FFE7CF)" }} />}
      {/* scene B: the family gangs */}
      {sec(L.family, L.each) && (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 160, textAlign: "center", fontSize: 64, fontWeight: 900, fontFamily: "Inter", color: "#1E2233" }}>
            {f < L.endings ? "Meet the family 👋" : "Notice the endings 👀"}
          </div>
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            {FAMILY.map((m, i) => {
              const y = 380 + i * 250;
              const tog = clamp((f - L.fam[i].what - 10) / 12);
              return (
                <g key={m.w} opacity={sp(L.fam[i].word)}>
                  {f >= L.fam[i].what && [0, 1].map((k) => (
                    <Char key={k} el={m.icons[k]} face={famFaces[i][k]} x={(k ? 870 : 650) - (k ? 1 : -1) * tog * 40} y={y} s={0.7} f={f} seed={i * 2 + k} talk={f < L.fam[i].what + 20} />
                  ))}
                  {tog > 0 && <ellipse cx={760} cy={y + 5} rx={230} ry={110} fill="none" stroke={m.c} strokeWidth={8} strokeDasharray="1 1" pathLength={1} strokeDashoffset={1 - tog} />}
                </g>
              );
            })}
          </svg>
          {FAMILY.map((m, i) => {
            const ending = ENDINGS.find(([r, s]) => r + s === m.w);
            const glow = f >= L.endNote && ending;
            return (
              <div key={m.w} style={{ position: "absolute", left: 50, top: 330 + i * 250, transform: `scale(${sp(L.fam[i].word, 9)})`, transformOrigin: "left center", fontFamily: "Inter" }}>
                <div style={{ background: m.c, color: "#fff", fontSize: 50, fontWeight: 900, padding: "10px 26px", borderRadius: 18, border: "5px solid #1E2233" }}>
                  {ending && f >= L.endings ? <>{ending[0]}<span style={{ background: glow ? "#F4A300" : "transparent", color: glow ? "#1E2233" : "#fff", borderRadius: 10, padding: "0 6px", textDecoration: glow ? "none" : "underline" }}>{ending[1]}</span></> : m.w}
                </div>
                {f >= L.fam[i].what + 14 && <div style={{ marginTop: 8, fontSize: 30, fontWeight: 900, color: m.c }}>= 1 UNIT</div>}
              </div>
            );
          })}
          <Bubble x={540} y={1280} at={L.endNote} until={L.each} f={f} w={900}>These endings often mean a <span style={{ color: "#D9730D" }}>whole collection</span>!</Bubble>
        </>
      )}

      {/* scene C: singular verbs and pieces */}
      {sec(L.each, L.dont) && (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 160, textAlign: "center", fontSize: 58, fontWeight: 900, fontFamily: "Inter", color: "#1E2233" }}>
            {f < L.count ? <>one unit → <span style={{ color: "#1B9E55" }}>singular verb</span></> : <>need a number? count a <span style={{ color: "#D9730D" }}>piece</span></>}
          </div>
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            {f < L.count
              ? [0, 1, 2].map((i) => {
                  const m = FAMILY[i];
                  return f >= L.verbs[i] && <Char key={i} el={m.icons[0]} face={famFaces[i][0]} x={170} y={440 + i * 330} s={0.8} f={f} seed={i} mood={verbMood[i]} talk={f < L.verbs[i] + 30} />;
                })
              : [[<Chair c={C.unit} />, [0, -70]], [<Suitcase c={C.unit} />, [0, -5]], [<Shirt c={C.activity} />, [0, 5]]].map(([el, face], i) =>
                  f >= L.pieces[i] && <Char key={i} el={el as React.ReactNode} face={face as [number, number]} x={170} y={440 + i * 330} s={0.8} f={f} seed={i + 3} talk={f < L.pieces[i] + 30} />)}
            {f < L.count && f >= L.verbs[2] && Array.from({ length: 8 }, (_, k) => <line key={k} x1={80 + k * 25} y1={((f * 9 + k * 70) % 260) + 1000} x2={74 + k * 25} y2={((f * 9 + k * 70) % 260) + 1030} stroke="#5AA9FF" strokeWidth={5} strokeLinecap="round" />)}
          </svg>
          {(f < L.count ? ["The [luggage|nL] [is|vL] heavy.", "The [equipment|nL] [is|vL] new.", "My [clothing|nL] [is|vL] wet."] : ["two [pieces|nc2] of furniture", "three [pieces|nc3] of luggage", "an [item|nc1] of clothing"]).map((t, i) => {
            const at = f < L.count ? L.verbs[i] : L.pieces[i];
            return f >= at && (
              <div key={t} style={{ position: "absolute", left: 330, right: 30, top: 380 + i * 330, transform: `scale(${sp(at, 10)})`, transformOrigin: "left center" }}>
                <div style={{ display: "inline-block", background: "#fff", border: "5px solid #1E2233", borderRadius: 30, padding: "18px 24px", position: "relative" }}>
                  <Sentence text={t} mark="right" at={at} linkAt={at + 12} chipAt={at + 4} accent={C.unit} size={48} />
                  <div style={{ position: "absolute", left: -28, top: 40, width: 0, height: 0, borderTop: "16px solid transparent", borderBottom: "16px solid transparent", borderRight: "28px solid #1E2233" }} />
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* scene D: party */}
      {sec(L.dont, end) && (
        <>
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            {furn.map((c, i) => (
              <Char key={i} el={c.el} face={c.face} x={[180, 420, 660, 900][i]} y={1140 - Math.abs(Math.sin((f + i * 6) / 5)) * 60} s={0.85} f={f} seed={i} talk />
            ))}
            <Book x={540} y={780} s={0.9} f={f} talk={f < L.rule[2] + 20} />
          </svg>
          {["many things", "one name", "one verb"].map((t, i) => f >= L.rule[i] && (
            <div key={t} style={{ position: "absolute", left: 60 + i * 330, top: 300, width: 300, textAlign: "center", fontSize: 50, fontWeight: 900, fontFamily: "Inter", background: i === 2 ? "#3DDC97" : "#fff", border: "5px solid #1E2233", borderRadius: 24, padding: "20px 8px", transform: `scale(${sp(L.rule[i], 9)}) rotate(${(i - 1) * 4}deg)` }}>{t}</div>
          ))}
          {f >= L.seeUnit && <div style={{ position: "absolute", left: 0, right: 0, top: 500, textAlign: "center", fontSize: 90, fontWeight: 900, color: "#D9730D", fontFamily: "Inter", transform: `scale(${sp(L.seeUnit, 9)})` }}>SEE THE UNIT!</div>}
        </>
      )}

      <div style={{ position: "absolute", left: 0, right: 0, top: 1650, bottom: 0, background: "linear-gradient(rgba(30,34,51,0), rgba(30,34,51,0.85) 30%)" }} />
      <Karaoke cues={CAPS.sm} top={1720} />
      <TrackAudio id="sm" />
      {[L.q, ...L.items, L.groups, L.why, L.notName, L.collection, L.furnish, L.unitMeans, L.singular, L.so, ...L.fam.map((m) => m.word), L.endNote, ...L.verbs, ...L.pieces, ...L.rule].map((a, i) => <Fx key={i} at={a} name="pop" volume={0.18} />)}
      <Fx at={L.wrong} name="buzzer" volume={0.2} />
      <Fx at={L.addS + 18} name="boing" volume={0.3} />
      <Fx at={L.unit} name="slam" volume={0.25} />
      {L.fam.map((m, i) => <Fx key={`w${i}`} at={m.what + 10} name="whoosh" volume={0.15} />)}
    </Full>
  );
};

