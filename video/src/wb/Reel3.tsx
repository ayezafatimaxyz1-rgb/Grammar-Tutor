// Reel 3 (spot the error, abstract noun): The informations / provided by the officer / were not / accurate.
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, arrow, check, cross, loop, tw, useBeatCue } from "./engine";
import { CARD, CardText, ReelShell, makeReel } from "./reelKit";
import { cta } from "./Reel1";

const V = "rl3", SX = 100, SS = 46;
const ROWS = ["(A)  The informations", "(B)  provided by the officer", "(C)  were not", "(D)  accurate.", "(E)  No error"];
const RY = [385, 457, 529, 601, 673];

export const Reel3: React.FC = () => {
  const f = useCurrentFrame();
  const { cue, start, segs } = useBeatCue(V);
  const END = segs.reduce((a, s) => a + s.frames, 0);
  const R = makeReel();
  const wx = (i: number, w: string) => { const t = ROWS[i], k = t.indexOf(w); const x0 = SX + tw(t.slice(0, k), SS, "f700"); return { x0, x1: x0 + tw(w, SS, "f700") }; };

  R.card();
  const inf = wx(0, "informations"), were = wx(2, "were");
  R.ink(loop((inf.x0 + inf.x1) / 2, RY[0] - 16, (inf.x1 - inf.x0) / 2 + 18, 34, 1), cue("p3", "never informations"), 12, C.red, 6);
  R.text("information", inf.x1 + 40, RY[0] - 4, 40, C.green, cue("p3", "never informations") + 14);
  R.ink(loop((were.x0 + were.x1) / 2, RY[2] - 16, (were.x1 - were.x0) / 2 + 18, 34, 2), cue("p4", "was not were"), 12, C.red, 6);
  R.text("was", were.x1 + 120, RY[2] - 4, 44, C.green, cue("p4", "was not were") + 14);

  R.panel(start("p2"));
  R.text("2 mistakes", 540, 960, 120, C.red, cue("p2", "two mistakes"), { anchor: "middle" });
  R.text("1 logic", 540, 1130, 120, C.green, cue("p2", "one logic"), { anchor: "middle" });
  R.text("fixes both", 540, 1260, 60, C.navy, cue("p2", "fixes both"), { anchor: "middle" });

  R.panel(start("p3"));
  R.line([["INFORMATION", C.navy], [" = abstract", C.purple]], 540, 860, 64, cue("p3", "information is abstract"));
  ([["page_facing_up", "facts", 230], ["scroll", "news", 540], ["speech_balloon", "details", 850]] as const).forEach(([s, n, x]) => {
    R.photo(s, x, 1020, 170, 150, cue("p3", n));
    R.text(n, x, 1140, 48, C.purple, cue("p3", n) + 8, { anchor: "middle" });
  });
  R.text("can't hold it,  can't count it", 540, 1260, 54, C.red, cue("p3", "you cant hold"), { anchor: "middle" });
  R.line([["UNCOUNTABLE", C.red], [": no s", C.ink]], 540, 1380, 70, cue("p3", "so its uncountable"));
  const w = R.line([["information", C.green], ["s", C.red]], 540, 1510, 76, cue("p3", "never informations") - 4);
  R.ink(cross(w.x1 - tw("s", 76) / 2, 1488, 22, 9), w.end + 2, 6, C.red, 8);

  R.panel(start("p4"));
  R.line([["uncountable", C.red], [" = one whole", C.navy]], 540, 880, 62, cue("p4", "because its uncountable"));
  R.line([["one whole ", C.navy], ["→", C.navy], [" singular verb", C.green]].map(([t, c]) => [t === "→" ? "= " : t, c] as [string, string]), 540, 990, 58, cue("p4", "so the verb"));
  R.text("were", 320, 1200, 110, C.ink, cue("p4", "was not were") - 6, { anchor: "middle" });
  R.ink(cross(320, 1165, 60, 14), cue("p4", "not were"), 8, C.red, 10);
  R.ink(arrow(460, 1165, 600, 1165, 15), cue("p4", "not were") + 6, 6, C.navy, 6);
  R.text("was", 760, 1200, 110, C.green, cue("p4", "not were") + 10, { anchor: "middle" });
  R.ink(check(900, 1150, 30, 16), cue("p4", "not were") + 24, 8, C.green, 10);

  R.panel(start("p5"));
  const at = cue("p5", "the information");
  R.answerBox(["The information provided", "by the officer was not", "accurate."], 840, at, [1, "was"]);
  R.ink(check(900, 1060, 40, 30), at + 24, 10, C.green, 12);
  R.line([["need a number?  a ", C.ink], ["PIECE", C.orange], [" of information", C.ink]], 540, 1260, 50, cue("p5", "need a number"));

  R.panel(start("p6"));
  cta(R, cue("p6", "logic not"), cue("p6", "comment"), cue("p6", "for the next"));

  return (
    <ReelShell f={f} video={V} reel={R} end={END} chip="CSS / PMS PATTERN" prompt="SPOT THE ERROR" promptUntil={start("p2")} cardH={560}
      zoom={[{ at: cue("p3", "never informations"), out: cue("p3", "never informations") + 45, ox: inf.x0, oy: RY[0] - 20, s: 1.22 }, { at: cue("p4", "was not were"), out: cue("p4", "was not were") + 45, ox: were.x0, oy: RY[2] - 20, s: 1.22 }]}
      countdown={[cue("p1", "pattern") + 22, start("p2")]} stamp={{ at: at + 20, text: "A + C" }}
      card={<>
        <CardText x={SX} y={CARD.y + 62} size={25} color={C.grey}>CSS / PMS · ENGLISH</CardText>
        <CardText x={SX} y={CARD.y + 122} size={33} color={C.navy} weight={800}>Q. Spot the error:</CardText>
        {ROWS.map((l, i) => <CardText key={i} x={SX} y={RY[i]} size={SS} color={C.ink}>{l}</CardText>)}
      </>} />
  );
};
