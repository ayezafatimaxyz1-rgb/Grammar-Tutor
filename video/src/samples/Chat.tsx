// Style sample C: text-message story. A student asks, the teacher explains the notes' logic in chat.
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Bed, Chair, Sofa, Table } from "../art";
import { Fx } from "../v2/kit";
import { Full, TrackAudio } from "./common";
import { ENDINGS, FAMILY, useLesson } from "./lesson";

const FONTS = "Inter, 'Noto Color Emoji', sans-serif";
const BLUE = "#2F5DA8";
const ORANGE = "#E07A10";

type Msg = { at: number; me?: boolean; body: React.ReactNode; tint?: string; text?: string };

const Grid: React.FC<{ f: number; ats: number[]; circle?: number; label?: number }> = ({ f, ats, circle = 0, label = 0 }) => {
  const items = [<Chair c={BLUE} />, <Table c={BLUE} />, <Sofa c={BLUE} />, <Bed c={BLUE} />];
  const names = ["chair", "table", "sofa", "bed"];
  return (
    <svg width={640} height={circle ? 380 : 420} viewBox={`0 0 640 ${circle ? 380 : 420}`}>
      {items.map((el, i) => {
        const x = 170 + (i % 2) * 300, y = (circle ? 120 : 110) + Math.floor(i / 2) * (circle ? 150 : 190);
        const s = f < ats[i] ? 0 : Math.min(1, (f - ats[i]) / 8);
        return (
          <g key={i}>
            <g transform={`translate(${x} ${y}) scale(${(circle ? 0.55 : 0.7) * s})`}>{el}</g>
            {!circle && <text x={x} y={y + 95} textAnchor="middle" fontSize={34} fontWeight={700} fill="#333" fontFamily="Inter" opacity={s}>{names[i]}</text>}
          </g>
        );
      })}
      {circle > 0 && <ellipse cx={320} cy={195} rx={290} ry={170} fill="none" stroke={ORANGE} strokeWidth={9} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - circle} strokeLinecap="round" />}
      {label > 0 && (
        <g transform={`translate(320 360) scale(${label})`}>
          <rect x={-130} y={-36} width={260} height={60} rx={30} fill={ORANGE} />
          <text x={0} y={6} textAnchor="middle" fontSize={34} fontWeight={900} fill="#fff" fontFamily="Inter">ONE UNIT</text>
        </g>
      )}
    </svg>
  );
};

const Row: React.FC<{ show: number; children: React.ReactNode }> = ({ show, children }) => (
  <div style={{ opacity: Math.min(1, Math.max(0, show)), transform: `translateX(${(1 - Math.min(1, Math.max(0, show))) * -30}px)` }}>{children}</div>
);

export const ChatSample: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLesson();
  const sp = (at: number) => (f < at ? 0 : spring({ frame: f - at, fps, config: { damping: 10 } }));
  const show = (at: number) => (f - at) / 8;

  const msgs: Msg[] = [
    { at: L.q + 20, me: true, text: "why is ‘the furniture are expensive’ wrong?? 😭", body: "why is ‘the furniture are expensive’ wrong?? 😭" },
    { at: L.look, body: "Look at what furniture contains 👇" },
    { at: L.items[0] - 2, body: <Grid f={f} ats={L.items} /> },
    { at: L.doesnt, body: <>But English doesn’t name each one. It groups them together as <b style={{ color: ORANGE }}>ONE unit</b> 📦</> },
    { at: L.groups, body: <Grid f={f} ats={[0, 0, 0, 0]} circle={Math.min(1, Math.max(0, (f - L.groups) / 20))} label={sp(L.unit)} /> },
    { at: L.why - 16, me: true, text: "but WHY does English do that? 🤔", body: "but WHY does English do that? 🤔" },
    { at: L.notName, body: <>Because furniture isn’t the name of <b>one object</b> 🙅 It’s the name of the <b style={{ background: "#FFE066", padding: "0 6px", borderRadius: 6 }}>WHOLE collection</b></> },
    { at: L.furnish, body: <><b style={{ color: ORANGE }}>furnish</b> ➜ <b style={{ color: ORANGE }}>furniture</b> 🏠<br /><span style={{ fontSize: 40, color: "#555" }}>everything you furnish a room with</span></> },
    { at: L.unitMeans, body: <>unit = <b style={{ fontSize: 60 }}>1️⃣</b> and 1 is <b>ALWAYS singular</b>. You can’t add <b>-s</b> to 1 🚫</> },
    { at: L.so, tint: "#DDF5E6", body: <span style={{ fontSize: 52 }}>So ✅ The furniture <b style={{ background: "#FFE066", padding: "0 8px", borderRadius: 8 }}>IS</b> expensive.</span> },
    { at: L.family - 12, me: true, text: "wait… is luggage the same?? 🧳", body: "wait… is luggage the same?? 🧳" },
    { at: L.family + 4, body: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 40 }}>
        <div style={{ fontWeight: 800 }}>Yes! The whole family 👇</div>
        {FAMILY.map((m, i) => (
          <Row key={m.w} show={show(L.fam[i].word)}>
            <b style={{ color: m.c }}>{m.w}</b> = {m.what} <span style={{ opacity: Math.min(1, Math.max(0, show(L.fam[i].what))) }}>➜ <b style={{ background: m.c, color: "#fff", padding: "0 10px", borderRadius: 8, fontSize: 32 }}>ONE UNIT</b></span>
          </Row>
        ))}
      </div>
    ) },
    { at: L.endings, body: (
      <div style={{ fontSize: 40 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Notice the endings 👀</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: 56, fontWeight: 900 }}>
          {ENDINGS.map(([r, s], i) => <Row key={r} show={show(L.endWords[i])}>{r}<span style={{ background: f > L.endNote ? "#FFE066" : "transparent", color: ORANGE, borderRadius: 8, padding: "0 4px" }}>{s}</span></Row>)}
        </div>
        <Row show={show(L.endNote)}><div style={{ marginTop: 10, color: "#444" }}>these endings build a word for a <b>whole collection</b></div></Row>
      </div>
    ) },
    { at: L.each, tint: "#DDF5E6", body: (
      <div style={{ fontSize: 44, display: "flex", flexDirection: "column", gap: 6 }}>
        <b>one unit → singular verb ✅</b>
        {["The luggage IS heavy.", "The equipment IS new.", "My clothing IS wet."].map((t, i) => <Row key={t} show={show(L.verbs[i])}>{t.split("IS")[0]}<b style={{ background: "#FFE066", padding: "0 6px", borderRadius: 6 }}>is</b>{t.split("IS")[1]}</Row>)}
      </div>
    ) },
    { at: L.count - 14, me: true, text: "and if I need a number? 🔢", body: "and if I need a number? 🔢" },
    { at: L.count + 8, body: (
      <div style={{ fontSize: 44, display: "flex", flexDirection: "column", gap: 6 }}>
        <b>Count a piece 🧩</b>
        {["two pieces of furniture", "three pieces of luggage", "an item of clothing"].map((t, i) => <Row key={t} show={show(L.pieces[i])}>{t.replace(/pieces|item/, "§").split("§")[0]}<b style={{ color: ORANGE }}>{t.includes("item") ? "item" : "pieces"}</b>{t.replace(/pieces|item/, "§").split("§")[1]}</Row>)}
      </div>
    ) },
    { at: L.dont, body: <>Don’t memorise the list. <b>See the unit</b> ✨<br /><span style={{ fontWeight: 800, color: ORANGE }}>many things → one name → one verb</span></> },
    { at: L.rule[2] + 24, me: true, text: "OHHH 🤯 saving this 🔖", body: "OHHH 🤯 saving this 🔖" },
  ];

  const teacher = msgs.filter((m) => !m.me);
  const typing = teacher.some((m) => f > m.at - 14 && f < m.at && m.at - 14 > 0 && !teacher.some((o) => o.at < m.at && o.at > m.at - 14));
  const composing = msgs.find((m) => m.me && f >= m.at - 26 && f < m.at);
  const grow = (at: number) => spring({ frame: f - at, fps, config: { damping: 14, stiffness: 160 } });

  return (
    <Full bg="#EFE7DE">
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 2px, transparent 2px)", backgroundSize: "44px 44px" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 250, bottom: 230, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 24, padding: "0 36px 24px", fontFamily: FONTS }}>
        {msgs.filter((m) => f >= m.at).map((m, i) => {
          const s = grow(m.at);
          return (
            <div key={i} style={{ display: "flex", justifyContent: m.me ? "flex-end" : "flex-start", maxHeight: s * 1200, flex: "none" }}>
              <div style={{
                maxWidth: 900, transformOrigin: m.me ? "bottom right" : "bottom left", transform: `scale(${0.7 + 0.3 * s})`, opacity: Math.min(1, s * 2),
                background: m.me ? "linear-gradient(135deg, #3D8BFF, #1B6BEA)" : m.tint ?? "#fff", color: m.me ? "#fff" : "#1A1A1A",
                fontSize: 46, lineHeight: 1.3, padding: typeof m.body === "string" || m.me ? "22px 30px" : "20px 26px", borderRadius: 34,
                borderBottomRightRadius: m.me ? 8 : 34, borderBottomLeftRadius: m.me ? 34 : 8, boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
              }}>{m.body}</div>
            </div>
          );
        })}
        {typing && (
          <div style={{ display: "flex", flex: "none" }}>
            <div style={{ background: "#fff", borderRadius: 34, padding: "26px 34px", display: "flex", gap: 14 }}>
              {[0, 1, 2].map((k) => <div key={k} style={{ width: 20, height: 20, borderRadius: 10, background: "#9AA0A6", transform: `translateY(${Math.sin(f / 3 + k) * 6}px)` }} />)}
            </div>
          </div>
        )}
      </div>
      {/* header */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 240, background: "#F7F7F7", borderBottom: "2px solid #DDD", fontFamily: FONTS }}>
        <div style={{ position: "absolute", left: 50, top: 22, fontSize: 34, fontWeight: 700 }}>9:41</div>
        <div style={{ position: "absolute", left: 40, top: 120, fontSize: 60, color: "#1B6BEA" }}>‹</div>
        <div style={{ position: "absolute", left: 110, top: 100, width: 110, height: 110, borderRadius: 55, background: "linear-gradient(135deg, #2F5DA8, #7E3FA0)", color: "#fff", fontSize: 44, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>GT</div>
        <div style={{ position: "absolute", left: 245, top: 112, fontSize: 44, fontWeight: 800 }}>Grammar Teacher</div>
        <div style={{ position: "absolute", left: 245, top: 168, fontSize: 32, color: typing ? "#1B9E55" : "#888" }}>{typing ? "typing…" : "online"}</div>
      </div>
      {/* input bar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1690, height: 230, background: "#F7F7F7", borderTop: "2px solid #DDD", fontFamily: FONTS }}>
        <div style={{ position: "absolute", left: 36, right: 150, top: 28, minHeight: 90, borderRadius: 45, background: "#fff", border: "2px solid #DDD", fontSize: 40, padding: "20px 32px", color: "#1A1A1A" }}>
          {composing ? [...composing.text!].slice(0, Math.floor((f - (composing.at - 26)) * ([...composing.text!].length / 22))).join("") : <span style={{ color: "#AAA" }}>Message</span>}
        </div>
        <div style={{ position: "absolute", right: 36, top: 30, width: 90, height: 90, borderRadius: 45, background: "#1B6BEA", color: "#fff", fontSize: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>↑</div>
      </div>
      <TrackAudio id="sm" />
      {msgs.map((m, i) => <Fx key={i} at={m.at} name={m.me ? "sent" : "msg"} volume={m.me ? 0.3 : 0.2} />)}
    </Full>
  );
};
