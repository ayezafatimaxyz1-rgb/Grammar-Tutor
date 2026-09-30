// Style sample F: paper cut-out stop-motion. Kraft paper, sticker cut-outs, ransom-note titles, tape,
// and a choppy 15 fps "stop-motion" feel.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Bed, Chair, Sofa, Table } from "../art";
import { Sentence } from "../components";
import { C } from "../theme";
import { Fx, Karaoke } from "../v2/kit";
import timings from "../timings.json";
import { Full, TrackAudio, track } from "./common";
import { ENDINGS, FAMILY, useLesson } from "./lesson";

type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };
const CAPS = (timings as unknown as { captions: Record<string, Cue[]> }).captions;
const FURN = [<Chair c={C.unit} />, <Table c={C.unit} />, <Sofa c={C.unit} />, <Bed c={C.unit} />];
const NAMES = ["chair", "table", "sofa", "bed"];
const TILE_COLS = ["#FFFFFF", "#FFE9A8", "#FFD1DC", "#D6ECFF", "#E3F7D8"];
const FONTS = ["Inter", "Caveat", "'IBM Plex Mono'", "'Patrick Hand'"];

const rnd = (n: number) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); };
const clamp = (v: number) => Math.max(0, Math.min(1, v));

/** Ransom-note letters, each on its own paper tile. */
const Ransom: React.FC<{ text: string; size: number; at: number; F: number; hot?: string; seed?: number }> = ({ text, size, at, F, hot, seed = 1 }) => {
  if (F < at) return null;
  const words = text.split(" ");
  let k = 0;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: size * 0.25 }}>
      {words.map((w, wi) => (
        <div key={wi} style={{ display: "flex", gap: 4 }}>
          {[...w].map((ch, i) => {
            k++;
            const show = F >= at + k * 1.2;
            const r = rnd(seed * 31 + k);
            const isHot = hot && w.toUpperCase() === hot.toUpperCase();
            return (
              <span key={i} style={{
                display: "inline-block", opacity: show ? 1 : 0, fontFamily: FONTS[Math.floor(r * 4)], fontWeight: 800, fontSize: size * (0.9 + r * 0.25),
                background: isHot ? "#E63946" : TILE_COLS[Math.floor(r * 5)], color: isHot ? "#fff" : "#1E2233", padding: "0 6px", lineHeight: 1.15,
                transform: `rotate(${(r - 0.5) * 14 + Math.sin(F * 0.7 + k) * 1.5}deg) translateY(${(rnd(k) - 0.5) * 10}px)`, boxShadow: "2px 3px 0 rgba(0,0,0,0.25)",
              }}>{ch}</span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** Paper card with slightly torn edges and a strip of tape. */
const Paper: React.FC<{ children: React.ReactNode; rot?: number; style?: React.CSSProperties; F: number; at: number; from?: "left" | "right" | "top" | "bottom" }> = ({ children, rot = -2, style, F, at, from = "bottom" }) => {
  if (F < at) return null;
  const p = clamp((F - at) / 8);
  const e = 1 - Math.pow(1 - p, 3);
  const off = (1 - e) * 1200;
  const t = from === "left" ? `translateX(${-off}px)` : from === "right" ? `translateX(${off}px)` : from === "top" ? `translateY(${-off}px)` : `translateY(${off}px)`;
  const torn = Array.from({ length: 24 }, (_, i) => `${(i / 23) * 100}% ${i % 2 ? 1.5 : 0}%`).join(",");
  const tornB = Array.from({ length: 24 }, (_, i) => `${100 - (i / 23) * 100}% ${i % 2 ? 98.5 : 100}%`).join(",");
  return (
    <div style={{ position: "absolute", transform: `${t} rotate(${rot + Math.sin(F * 0.9) * 0.4}deg)`, ...style }}>
      <div style={{ background: "#FFFDF6", padding: "28px 30px", clipPath: `polygon(${torn},${tornB})`, boxShadow: "0 8px 0 rgba(0,0,0,0.2)", filter: "drop-shadow(4px 6px 0 rgba(0,0,0,0.18))" }}>{children}</div>
      <div style={{ position: "absolute", left: "38%", top: -18, width: 150, height: 40, background: "rgba(240,225,180,0.75)", transform: "rotate(-4deg)" }} />
    </div>
  );
};

/** Sticker: artwork with a thick white cut border and shadow. */
const Sticker: React.FC<{ x: number; y: number; s?: number; F: number; at: number; children: React.ReactNode; rot?: number }> = ({ x, y, s = 1, F, at, children, rot = 0 }) => {
  if (F < at) return null;
  const p = clamp((F - at) / 6);
  const pop = p < 1 ? 1.3 - 0.3 * p : 1;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot + Math.sin(F * 0.8 + x) * 1.2}) scale(${s * pop})`} filter="url(#sticker)">{children}</g>
  );
};

export const PaperCutSample: React.FC = () => {
  const f = useCurrentFrame();
  const F = f - (f % 2); // stop-motion: hold every drawing for two frames
  const L = useLesson();
  const end = track("sm").reduce((a, s) => a + s.frames, 0);
  const inSec = (a: number, b: number) => F >= a - 2 && F < b + 2;
  const gather = clamp((F - L.groups - 4) / 20);
  const pos = [[300, 700], [780, 700], [300, 1010], [780, 1010]];
  const bag = [[460, 1000], [620, 1000], [470, 1070], [610, 1070]];

  return (
    <Full bg="#C9A877">
      {/* kraft paper texture */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
        <filter id="kraft"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={3} seed={F % 6 < 3 ? 2 : 5} /><feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.12  0 0 0 0.9 0" /></filter>
        <rect width={1080} height={1920} filter="url(#kraft)" />
      </svg>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <filter id="sticker" x="-30%" y="-30%" width="160%" height="160%">
          <feMorphology in="SourceAlpha" operator="dilate" radius={9} result="grow" />
          <feFlood floodColor="#FFFFFF" /><feComposite in2="grow" operator="in" result="white" />
          <feOffset in="grow" dx={5} dy={7} result="off" /><feFlood floodColor="rgba(0,0,0,0.28)" /><feComposite in2="off" operator="in" result="shadow" />
          <feMerge><feMergeNode in="shadow" /><feMergeNode in="white" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </svg>

      {/* 0 question */}
      {inSec(0, L.look) && (
        <>
          <div style={{ position: "absolute", left: 40, right: 40, top: 420 }}><Ransom text="The furniture ARE expensive?" hot="ARE" size={92} at={L.q} F={F} /></div>
          {F >= L.wrong && <div style={{ position: "absolute", left: 0, right: 0, top: 880, textAlign: "center", fontSize: 360, fontWeight: 900, color: "#E63946", fontFamily: "Caveat", transform: `rotate(-12deg) scale(${F < L.wrong + 6 ? 1.4 : 1})`, textShadow: "6px 8px 0 rgba(0,0,0,0.2)" }}>✗</div>}
        </>
      )}

      {/* 1 contains + 2 one unit */}
      {inSec(L.look, L.why) && (
        <>
          <div style={{ position: "absolute", left: 40, right: 40, top: 250 }}>
            {F < L.doesnt ? <Ransom text="furniture contains…" size={76} at={L.look} F={F} seed={3} /> : <Ransom text="ONE unit" hot="ONE" size={100} at={L.doesnt} F={F} seed={4} />}
          </div>
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            {/* paper bag */}
            {F >= L.groups - 4 && (
              <g filter="url(#sticker)" transform={`translate(540 1060) rotate(${Math.sin(F) * 0.8})`}>
                <path d="M-230 -150 L230 -150 L260 190 L-260 190 Z" fill="#B98752" />
                <path d="M-230 -150 L-190 -190 L190 -190 L230 -150 Z" fill="#9C6B3C" />
                {F >= L.unit && <g transform="rotate(-6)"><rect x={-170} y={20} width={340} height={90} fill="#FFFDF6" /><text x={0} y={85} textAnchor="middle" fontSize={62} fontWeight={900} fill="#1E2233" fontFamily="'IBM Plex Mono'">FURNITURE</text></g>}
              </g>
            )}
            {FURN.map((el, i) => {
              const g = Math.max(0, gather - i * 0.08);
              const x = pos[i][0] + (bag[i][0] - pos[i][0]) * g, y = pos[i][1] + (bag[i][1] - pos[i][1]) * g - Math.sin(g * Math.PI) * 200;
              if (g >= 0.95) return null;
              return <Sticker key={i} x={x} y={y} s={1.35 - g * 0.8} F={F} at={L.items[i]} rot={(i - 1.5) * 5}>{el}</Sticker>;
            })}
          </svg>
          {FURN.map((_, i) => F >= L.items[i] + 4 && gather === 0 && (
            <div key={i} style={{ position: "absolute", left: pos[i][0] - 80, top: pos[i][1] + 140, width: 160, textAlign: "center", fontFamily: "Caveat", fontSize: 52, fontWeight: 700, background: "#FFFDF6", transform: `rotate(${(i - 1.5) * 4}deg)`, boxShadow: "3px 4px 0 rgba(0,0,0,0.2)" }}>{NAMES[i]}</div>
          ))}
          {F >= L.many && gather === 0 && <div style={{ position: "absolute", left: 0, right: 0, top: 1300 }}><Ransom text="many different things" size={60} at={L.many} F={F} seed={9} /></div>}
        </>
      )}

      {/* 3 why */}
      {inSec(L.why, L.unitMeans) && (
        <>
          <div style={{ position: "absolute", left: 40, right: 40, top: 220 }}><Ransom text="WHY?" hot="WHY?" size={150} at={L.why} F={F} seed={11} /></div>
          <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
            <Sticker x={280} y={620} s={1.2} F={F} at={L.notName} rot={-6}><Chair c={C.unit} /></Sticker>
            <Sticker x={780} y={620} s={1} F={F} at={L.notName + 8} rot={5}>
              <g>{FURN.map((el, i) => <g key={i} transform={`translate(${(i % 2) * 150 - 75} ${Math.floor(i / 2) * 120 - 60}) scale(0.5)`}>{el}</g>)}</g>
            </Sticker>
          </svg>
          <Paper F={F} at={L.notName + 4} rot={-4} style={{ left: 90, top: 780, width: 360 }} from="left"><div style={{ fontFamily: "Caveat", fontSize: 50, fontWeight: 700, textAlign: "center" }}>a chair = an object <span style={{ color: "#1B9E55" }}>✓</span></div></Paper>
          <Paper F={F} at={L.notName + 12} rot={4} style={{ left: 560, top: 780, width: 420 }} from="right"><div style={{ fontFamily: "Caveat", fontSize: 50, fontWeight: 700, textAlign: "center" }}>furniture = an object? <span style={{ color: "#E63946" }}>✗</span></div></Paper>
          {F >= L.collection && <div style={{ position: "absolute", left: 30, right: 30, top: 1010 }}><Ransom text="the WHOLE collection" hot="WHOLE" size={72} at={L.collection} F={F} seed={13} /></div>}
          <Paper F={F} at={L.furnish} rot={-2} style={{ left: 110, top: 1200, width: 860 }}>
            <div style={{ fontFamily: "Caveat", fontSize: 68, fontWeight: 700, textAlign: "center" }}>furnish ➜ furniture</div>
            {F >= L.room && <div style={{ fontFamily: "'Patrick Hand'", fontSize: 42, textAlign: "center", color: "#555" }}>everything you furnish a room with</div>}
          </Paper>
        </>
      )}

      {/* 4 unit = 1 */}
      {inSec(L.unitMeans, L.family) && (
        <>
          <div style={{ position: "absolute", left: 40, right: 40, top: 240 }}><Ransom text="unit =" size={90} at={L.unitMeans} F={F} seed={15} /></div>
          {F >= L.unitMeans + 10 && <div style={{ position: "absolute", left: 0, right: 0, top: 340, textAlign: "center", fontSize: 420, fontWeight: 900, color: "#F4A300", fontFamily: "Inter", lineHeight: 1, textShadow: "10px 12px 0 rgba(0,0,0,0.2), -6px -6px 0 #fff", transform: `rotate(-4deg)` }}>1</div>}
          {F >= L.addS && (
            <div style={{ position: "absolute", left: 700, top: 420 + Math.max(0, F - L.addS - 16) ** 2 * 1.4, fontSize: 150, fontFamily: "Caveat", fontWeight: 700, background: "#FFD1DC", padding: "0 20px", transform: `rotate(${Math.max(0, F - L.addS - 16) * 8 - 10}deg)`, boxShadow: "4px 6px 0 rgba(0,0,0,0.2)" }}>s</div>
          )}
          {F >= L.singular && <div style={{ position: "absolute", left: 30, right: 30, top: 820 }}><Ransom text="ALWAYS SINGULAR" hot="SINGULAR" size={80} at={L.singular} F={F} seed={17} /></div>}
          <Paper F={F} at={L.so} rot={2} style={{ left: 90, top: 1080, width: 900 }}>
            <Sentence text="The [furniture|nL] [is|vL] expensive." mark="right" at={L.so} linkAt={L.so + 12} accent={C.unit} size={56} />
          </Paper>
        </>
      )}

      {/* 5 family */}
      {inSec(L.family, L.endings) && (
        <>
          <div style={{ position: "absolute", left: 30, right: 30, top: 190 }}><Ransom text="the whole family" size={76} at={L.family} F={F} seed={19} /></div>
          {FAMILY.map((m, i) => (
            <Paper key={m.w} F={F} at={L.fam[i].word} rot={i % 2 ? 2 : -2} from={i % 2 ? "right" : "left"} style={{ left: 60, top: 330 + i * 255, width: 960 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, height: 150 }}>
                <div style={{ fontFamily: "'IBM Plex Mono'", fontWeight: 600, fontSize: 52, color: m.c, width: 330 }}>{m.w.toUpperCase()}</div>
                {F >= L.fam[i].what && (
                  <svg width={320} height={150} viewBox="-160 -75 320 150" style={{ overflow: "visible" }}>
                    <Sticker x={-75} y={0} s={0.62} F={F} at={L.fam[i].what}>{m.icons[0]}</Sticker>
                    <Sticker x={80} y={0} s={0.62} F={F} at={L.fam[i].what + 4}>{m.icons[1]}</Sticker>
                  </svg>
                )}
                {F >= L.fam[i].what + 12 && <div style={{ marginLeft: "auto", border: `5px solid ${m.c}`, color: m.c, fontFamily: "'IBM Plex Mono'", fontWeight: 600, fontSize: 30, padding: "6px 10px", transform: "rotate(-10deg)" }}>1 UNIT</div>}
              </div>
            </Paper>
          ))}
        </>
      )}

      {/* 6 endings */}
      {inSec(L.endings, L.each) && (
        <>
          <div style={{ position: "absolute", left: 30, right: 30, top: 200 }}><Ransom text="notice the endings" size={76} at={L.endings} F={F} seed={21} /></div>
          {ENDINGS.map(([r, s], i) => F >= L.endWords[i] && (
            <div key={r} style={{ position: "absolute", left: 0, right: 0, top: 420 + i * 220, display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
              <div style={{ background: "#FFFDF6", fontSize: 110, fontWeight: 900, padding: "0 22px", transform: `rotate(${i % 2 ? 2 : -2}deg)`, boxShadow: "5px 7px 0 rgba(0,0,0,0.2)" }}>{r}</div>
              <div style={{ background: F >= L.endNote ? "#F4A300" : "#FFE9A8", color: "#1E2233", fontSize: 110, fontWeight: 900, padding: "0 22px", transform: `rotate(${i % 2 ? -6 : 6}deg) translateY(${F >= L.endNote && F < L.endNote + 6 ? -30 : 0}px)`, boxShadow: "5px 7px 0 rgba(0,0,0,0.25)" }}>{s}</div>
            </div>
          ))}
          <Paper F={F} at={L.endNote} rot={-1} style={{ left: 90, top: 1300, width: 900 }}>
            <div style={{ fontFamily: "Caveat", fontSize: 58, fontWeight: 700, textAlign: "center" }}>these endings build a word for a <b style={{ color: "#D9730D" }}>whole collection</b></div>
          </Paper>
        </>
      )}

      {/* 7 verbs + 8 pieces */}
      {inSec(L.each, L.dont) && (
        <>
          <div style={{ position: "absolute", left: 30, right: 30, top: 200 }}>
            {F < L.count ? <Ransom text="one unit = singular verb" size={66} at={L.each} F={F} seed={23} /> : <Ransom text="count a piece" size={80} at={L.count} F={F} seed={25} />}
          </div>
          {(F < L.count ? ["The [luggage|nL] [is|vL] heavy.", "The [equipment|nL] [is|vL] new.", "My [clothing|nL] [is|vL] wet."] : ["two [pieces|nc2] of furniture", "three [pieces|nc3] of luggage", "an [item|nc1] of clothing"]).map((t, i) => {
            const at = F < L.count ? L.verbs[i] : L.pieces[i];
            return (
              <Paper key={t} F={F} at={at} rot={i % 2 ? 2 : -2} from={i % 2 ? "right" : "left"} style={{ left: 110, top: 480 + i * 280, width: 860 }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Sentence text={t} mark="right" at={at} linkAt={at + 12} chipAt={at + 4} accent={C.unit} size={58} />
                </div>
              </Paper>
            );
          })}
        </>
      )}

      {/* 9 rule */}
      {inSec(L.dont, end) && (
        <>
          <div style={{ position: "absolute", left: 30, right: 30, top: 230 }}><Ransom text="SEE THE UNIT" hot="UNIT" size={110} at={L.seeUnit} F={F} seed={27} /></div>
          {["many things", "one name", "one verb"].map((t, i) => (
            <Paper key={t} F={F} at={L.rule[i]} rot={i % 2 ? 3 : -3} from="top" style={{ left: 200, top: 560 + i * 280, width: 680 }}>
              <div style={{ fontFamily: "Caveat", fontSize: 90, fontWeight: 700, textAlign: "center", color: i === 2 ? "#1B9E55" : "#1E2233" }}>{t}</div>
            </Paper>
          ))}
        </>
      )}

      <div style={{ position: "absolute", left: 0, right: 0, top: 1650, bottom: 0, background: "linear-gradient(rgba(40,28,14,0), rgba(40,28,14,0.85) 30%)" }} />
      <Karaoke cues={CAPS.sm} top={1720} />
      <TrackAudio id="sm" />
      {[L.q, L.wrong, ...L.items, L.groups, L.unit, L.why, L.notName, L.collection, L.furnish, L.unitMeans, L.addS, L.singular, L.so, L.family, ...L.fam.map((m) => m.word), ...L.endWords, L.endNote, ...L.verbs, ...L.pieces, L.dont, ...L.rule].map((a, i) => <Fx key={i} at={a} name={i % 3 ? "pop" : "click"} volume={0.16} />)}
    </Full>
  );
};
