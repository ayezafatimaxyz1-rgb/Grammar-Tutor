// Reel 2 (MCQ, measured noun): two breads / two loaf / two loaves / two bread.
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, arrow, check, cross, loop, strike, tw, useBeatCue } from "./engine";
import { CARD, CardText, ReelShell, makeReel } from "./reelKit";
import { cta } from "./Reel1";

const V = "rl2", SX = 100, SS = 46;
const OPTS = ["(A)  I need two breads.", "(B)  I need two loaf of bread.", "(C)  I need two loaves of bread.", "(D)  I need two bread."];
const OY = [395, 475, 555, 635];

export const Reel2: React.FC = () => {
  const f = useCurrentFrame();
  const { cue, start, segs } = useBeatCue(V);
  const END = segs.reduce((a, s) => a + s.frames, 0);
  const R = makeReel();
  const wx = (i: number, w: string) => { const t = OPTS[i], k = t.indexOf(w); const x0 = SX + tw(t.slice(0, k), SS, "f700"); return { x0, x1: x0 + tw(w, SS, "f700") }; };
  const rowEnd = (i: number) => SX + tw(OPTS[i], SS, "f700");

  R.card();
  const br = wx(0, "breads");
  R.ink(loop((br.x0 + br.x1) / 2, OY[0] - 16, (br.x1 - br.x0) / 2 + 16, 32, 1), cue("q2", "two breads"), 10, C.grey, 5);
  R.ink(strike(SX, rowEnd(0), OY[0] - 16, 2), cue("q4", "kills option a"), 8, C.red, 5);
  R.ink(cross(rowEnd(0) + 40, OY[0] - 16, 16, 3), cue("q4", "kills option a") + 8, 6, C.red, 7);
  R.ink(strike(SX, rowEnd(3), OY[3] - 16, 4), cue("q4", "wrong too"), 8, C.red, 5);
  R.ink(cross(rowEnd(3) + 40, OY[3] - 16, 16, 5), cue("q4", "wrong too") + 8, 6, C.red, 7);
  R.ink(strike(SX, rowEnd(1), OY[1] - 16, 6), cue("q5", "option b forgot"), 8, C.red, 5);
  R.ink(cross(rowEnd(1) + 40, OY[1] - 16, 16, 7), cue("q5", "option b forgot") + 8, 6, C.red, 7);
  R.rect(SX - 14, OY[2] - 50, rowEnd(2) - SX + 28, 66, "rgba(21,128,61,0.12)", cue("q5", "the answer is c"), { mode: "grow", r: 10 });
  R.ink(check(rowEnd(2) + 44, OY[2] - 18, 20, 8), cue("q5", "the answer is c") + 6, 8, C.green, 8);

  R.panel(start("q2"));
  R.text("most students think:", 540, 880, 52, C.grey, cue("q2", "most students"), { anchor: "middle" });
  R.line([["two", C.ink], ["  =  plural  =  ", C.grey], ["breads", C.ink]], 540, 1010, 72, cue("q2", "because two"));
  R.text("TRAP!", 540, 1220, 140, C.red, cue("q2", "thats the trap"), { anchor: "middle", dur: 12 });

  R.panel(start("q3"));
  R.line([["THE TEST: ", C.navy], ["how do we buy it?", C.ink]], 540, 860, 60, cue("q3", "heres the test"));
  R.photo("bread", 540, 1060, 260, 230, cue("q3", "how do we buy"));
  R.ink(arrow(380, 1060, 270, 1060, 11), cue("q3", "by the loaf"), 6, C.orange, 6);
  R.text("by the loaf", 160, 1070, 48, C.orange, cue("q3", "by the loaf"), { anchor: "middle" });
  R.ink(arrow(700, 1060, 810, 1060, 12), cue("q3", "the slice"), 6, C.orange, 6);
  R.text("by the slice", 930, 1070, 48, C.orange, cue("q3", "the slice"), { anchor: "middle" });
  R.text("not in pieces we count", 540, 1270, 52, C.grey, cue("q3", "not in pieces"), { anchor: "middle" });
  R.line([["MEASURED", C.orange], [", not counted", C.ink]], 540, 1380, 60, cue("q3", "bread is measured"));
  R.line([["BREAD", C.navy], [" = UNCOUNTABLE", C.red]], 540, 1500, 72, cue("q3", "itself is uncountable"));

  R.panel(start("q4"));
  const l1 = R.line([["bread", C.ink], [" + s", C.red]], 540, 900, 90, cue("q4", "so bread never"));
  R.ink(cross(l1.x1 + 70, 870, 34, 13), l1.end, 8, C.red, 10);
  R.text("(A) two breads", 540, 1060, 64, C.ink, cue("q4", "kills option a"), { anchor: "middle" });
  R.line([["(D) two bread", C.ink], ["  ... two what?", C.grey]], 540, 1220, 60, cue("q4", "option d says"));
  R.text("nothing to count", 540, 1340, 56, C.red, cue("q4", "with nothing"), { anchor: "middle" });

  R.panel(start("q5"));
  R.line([["count the ", C.navy], ["LOAF", C.orange]], 540, 860, 72, cue("q5", "count the loaf"));
  R.photo("bread", 260, 1030, 170, 150, cue("q5", "one loaf"));
  R.text("one loaf", 260, 1150, 50, C.orange, cue("q5", "one loaf") + 6, { anchor: "middle" });
  R.photo("bread", 680, 1030, 170, 150, cue("q5", "two loaves"));
  R.photo("bread", 840, 1030, 170, 150, cue("q5", "two loaves") + 6);
  R.text("two loaves", 760, 1150, 50, C.orange, cue("q5", "two loaves") + 10, { anchor: "middle" });
  const at = cue("q5", "i need two loaves");
  R.answerBox(["(C)  I need two loaves", "of bread."], 1250, at, [0, "loaves"]);
  R.ink(check(900, 1390, 40, 30), at + 20, 10, C.green, 12);

  R.panel(start("q6"));
  cta(R, cue("q6", "logic not"), cue("q6", "comment"), cue("q6", "for the next"));

  return (
    <ReelShell f={f} video={V} reel={R} end={END} chip="CSS / PMS PATTERN" prompt="CHOOSE THE CORRECT ONE" promptUntil={start("q2")} cardH={520}
      zoom={[{ at: cue("q2", "two breads"), out: start("q3"), ox: br.x0, oy: OY[0] - 20, s: 1.25 }]}
      countdown={[cue("q1", "correct") + 22, start("q2")]} stamp={{ at: cue("q5", "the answer is c") + 12, text: "ANSWER: C" }}
      sfx={[{ at: cue("q2", "thats the trap"), name: "buzzer", v: 0.08 }]}
      card={<>
        <CardText x={SX} y={CARD.y + 62} size={25} color={C.grey}>CSS / PMS · ENGLISH</CardText>
        <CardText x={SX} y={CARD.y + 122} size={33} color={C.navy} weight={800}>Q. Choose the correct sentence:</CardText>
        {OPTS.map((l, i) => <CardText key={i} x={SX} y={OY[i]} size={SS} color={C.ink}>{l}</CardText>)}
      </>} />
  );
};
