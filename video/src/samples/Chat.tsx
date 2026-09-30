// Style sample C: text-message story. A student asks, the teacher explains the notes' logic in chat.
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Bed, Chair, Sofa, Table } from "../art";
import { Fx } from "../v2/kit";
import { Full, TrackAudio, useTrackCue } from "./common";

const FONTS = "Inter, 'Noto Color Emoji', sans-serif";
const BLUE = "#2F5DA8";

type Msg = { at: number; me?: boolean; body: React.ReactNode; tint?: string };

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
      {circle > 0 && (
        <ellipse cx={320} cy={195} rx={290} ry={170} fill="none" stroke="#E07A10" strokeWidth={9} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - circle} strokeLinecap="round" />
      )}
      {label > 0 && (
        <g transform={`translate(320 360) scale(${label})`}>
          <rect x={-130} y={-36} width={260} height={60} rx={30} fill="#E07A10" />
          <text x={0} y={6} textAnchor="middle" fontSize={34} fontWeight={900} fill="#fff" fontFamily="Inter">ONE UNIT</text>
        </g>
      )}
    </svg>
  );
};

export const ChatSample: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cue = useTrackCue("sm");
  const tStart = cue("why is");
  const tMany = cue("furniture contains");
  const tItems = [cue("a chair"), cue("a table"), cue("a sofa"), cue("a bed")];
  const tGroup = cue("but english");
  const tUnit = cue("one unit");
  const tMeans = cue("unit means one");
  const tSing = cue("and one is always");
  const tSo = cue("so the furniture is");
  const tReply = tSo + 62;

  const q = "why is ‘the furniture are expensive’ wrong?? 😭";
  const typedQ = Math.max(0, Math.min(q.length, Math.floor((f - 2) * 1.6)));
  const sendQ = tStart + 20;
  const r = "OHHH 🤯 that actually makes sense";
  const typedR = Math.max(0, Math.min(r.length, Math.floor((f - (tReply - 28)) * 1.4)));

  const msgs: Msg[] = [
    { at: sendQ, me: true, body: q },
    { at: tMany, body: "Furniture contains many things 👇" },
    { at: tItems[0] - 2, body: <Grid f={f} ats={tItems} /> },
    { at: tGroup, body: <>But English groups them together… and names them as <b style={{ color: "#E07A10" }}>ONE unit</b> 📦</> },
    { at: tUnit - 4, body: <Grid f={f} ats={[0, 0, 0, 0]} circle={Math.min(1, Math.max(0, (f - tUnit) / 18))} label={f < tUnit + 16 ? 0 : spring({ frame: f - tUnit - 16, fps, config: { damping: 10 } })} /> },
    { at: tMeans, body: <span style={{ fontSize: 60, fontWeight: 900 }}>unit = 1️⃣</span> },
    { at: tSing, body: <>and 1 is <b>ALWAYS singular</b>. You can’t add <b>-s</b> to 1 🚫</> },
    { at: tSo, tint: "#DDF5E6", body: <span style={{ fontSize: 52 }}>So ✅ The furniture <b style={{ background: "#FFE066", padding: "0 8px", borderRadius: 8 }}>IS</b> expensive.</span> },
    { at: tReply, me: true, body: r },
  ];

  const typing = (f > tMany - 20 && f < tMany) || (f > tGroup - 16 && f < tGroup) || (f > tSing - 14 && f < tSing) || (f > tSo - 16 && f < tSo);
  const grow = (at: number) => spring({ frame: f - at, fps, config: { damping: 14, stiffness: 160 } });

  return (
    <Full bg="#EFE7DE">
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 2px, transparent 2px)", backgroundSize: "44px 44px" }} />
      {/* messages stack from the bottom, like a real chat */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 250, bottom: 230, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 24, padding: "0 36px 24px", fontFamily: FONTS }}>
        {msgs.filter((m) => f >= m.at).map((m, i) => {
          const s = grow(m.at);
          return (
            <div key={i} style={{ display: "flex", justifyContent: m.me ? "flex-end" : "flex-start", maxHeight: s * 900, flex: "none" }}>
              <div style={{
                maxWidth: 860, transformOrigin: m.me ? "bottom right" : "bottom left", transform: `scale(${0.7 + 0.3 * s})`, opacity: Math.min(1, s * 2),
                background: m.me ? "linear-gradient(135deg, #3D8BFF, #1B6BEA)" : m.tint ?? "#fff", color: m.me ? "#fff" : "#1A1A1A",
                fontSize: 46, lineHeight: 1.3, padding: typeof m.body === "string" || m.me ? "22px 30px" : "18px 22px", borderRadius: 34,
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
      {/* input bar with the student's typing */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1690, height: 230, background: "#F7F7F7", borderTop: "2px solid #DDD", fontFamily: FONTS }}>
        <div style={{ position: "absolute", left: 36, right: 150, top: 28, minHeight: 90, borderRadius: 45, background: "#fff", border: "2px solid #DDD", fontSize: 40, padding: "20px 32px", color: "#1A1A1A" }}>
          {f < sendQ ? q.slice(0, typedQ) : f >= tReply - 28 && f < tReply ? r.slice(0, typedR) : <span style={{ color: "#AAA" }}>Message</span>}
        </div>
        <div style={{ position: "absolute", right: 36, top: 30, width: 90, height: 90, borderRadius: 45, background: "#1B6BEA", color: "#fff", fontSize: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>↑</div>
      </div>
      <TrackAudio id="sm" />
      <Fx at={sendQ} name="sent" volume={0.3} />
      {msgs.slice(1, -1).map((m, i) => <Fx key={i} at={m.at} name="msg" volume={0.22} />)}
      <Fx at={tReply} name="sent" volume={0.3} />
      {Array.from({ length: 10 }, (_, i) => <Fx key={`k${i}`} at={2 + i * 3} name="click" volume={0.12} />)}
    </Full>
  );
};
