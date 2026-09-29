// Case 02 · MATERIAL · gold and brick. Hook: melt three gold objects and ask "how many golds?"
import React from "react";
import { useCurrentFrame } from "remotion";
import { BrickWall, Coin, Flame, GoldBlob, Ingot, Necklace, Plank, Ring, Scale, Table } from "../art";
import { G, Sentence } from "../components";
import { C } from "../theme";
import { lerp, prog, useCue } from "../timing";
import { CaseFolder, RuleFlow, Slash } from "./common";
import { Card, Fx, K, Label, Lens, ProofBanner, Proven, Slam, Stage, Svg, useSpring } from "./kit";
import { Scribble } from "./props";

const A = K.material;

/* ---------------------------------------------------------------- hook: the melt */
export const C2Melt: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const sp = useSpring();
  const ats = [cue("a ring"), cue("a coin"), cue("a necklace")];
  const tThree = cue("three golden");
  const tMelt = cue("melt them");
  const tHow = cue("how many golds");
  const melt = prog(f, tMelt, 40);
  const objs = [{ x: 260, el: <Ring /> }, { x: 540, el: <Coin /> }, { x: 820, el: <Necklace /> }];
  return (
    <Stage shakes={[tHow]}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 200, textAlign: "center", fontSize: 58, fontWeight: 900, opacity: prog(f, tThree) * (1 - prog(f, tMelt, 10)) }}>
        <span style={{ color: K.yellow }}>3</span> golden things
      </div>
      <Svg>
        {objs.map((o, i) => {
          const s = sp(f, ats[i]) * 1.3;
          const x = lerp(o.x, 540, melt);
          const y = lerp(700, 930, melt);
          return (
            <g key={i} opacity={1 - prog(f, tMelt + 20, 20)}>
              <g transform={`translate(${x} ${y}) scale(${s * (1 - melt * 0.3)} ${s * (1 - melt * 0.8)})`}>{o.el}</g>
            </g>
          );
        })}
        <G x={540} y={960} s={prog(f, tMelt + 10, 30) * 1.5}><GoldBlob wobble={f / 7} /></G>
        {/* drips */}
        {[0, 1, 2].map((i) => {
          const t = (f - tMelt - i * 9) % 30;
          if (f < tMelt || melt >= 1) return null;
          return <ellipse key={i} cx={440 + i * 100} cy={760 + t * 6} rx={10} ry={16} fill={C.gold} opacity={1 - t / 30} />;
        })}
        <g opacity={prog(f, tMelt - 6, 10)}><G x={540} y={1200} s={1.4}><Flame t={f} /></G></g>
      </Svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1290, display: "flex", justifyContent: "center" }}>
        <Slam at={tHow} size={92} color={K.yellow}>How many golds?</Slam>
      </div>
      {ats.map((a, i) => <Fx key={i} at={a} name="pop" />)}
      <Fx at={tMelt} name="whoosh" volume={0.3} />
      <Fx at={tMelt + 5} name="riser" volume={0.12} />
      <Fx at={tHow} name="slam" volume={0.3} />
    </Stage>
  );
};

export const C2Break: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const t3 = cue("three");
  const t1 = cue("one");
  const tWork = cue("doesnt even work");
  const tLesson = cue("whole lesson");
  const tNo = cue("no memorising");
  return (
    <Stage shakes={[tWork]}>
      <Svg>
        <G x={540} y={900} s={1.5}><GoldBlob wobble={f / 7} /></G>
        <Scribble x={540} y={500} w={700} h={140} p={prog(f, tWork, 10)} />
      </Svg>
      <Label at={t3} x={250} y={700} color={K.red} size={70}>3?</Label>
      <Label at={t1} x={830} y={700} color={K.red} size={70}>1?</Label>
      <div style={{ position: "absolute", left: 0, right: 0, top: 440, textAlign: "center", fontSize: 88, fontWeight: 900, color: K.yellow, opacity: 1 - prog(f, tLesson - 5, 10) * 0.7 }}>How many golds?</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1150, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <Slam at={tLesson} size={84}>That <span style={{ color: K.yellow }}>is</span> the lesson.</Slam>
        <div style={{ fontSize: 46, fontWeight: 800, opacity: prog(f, tNo) }}>No <span style={{ textDecoration: `line-through ${K.red} 8px` }}>memorising</span>. Just proof.</div>
      </div>
      <Fx at={t3} name="tick" />
      <Fx at={t1} name="tick" />
      <Fx at={tWork} name="buzzer" volume={0.25} />
      <Fx at={tLesson} name="slam" volume={0.3} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- case opens */
export const C2Case: React.FC = () => {
  const cue = useCue();
  return (
    <CaseFolder num="02" kind="MATERIAL" word="gold" openAt={cue("case two")} wordAt={cue("materials")} cardAt={cue("why do we")} accent={C.material}
      lines={[
        { text: "made of [gold|n]", mark: "right" },
        { text: "made of [golds|x]", mark: "wrong", hlAt: cue("never") },
      ]} />
  );
};

/* ---------------------------------------------------------------- proof 1: the cut test */
const Halves: React.FC<{ id: string; sep: number; rot?: number; children: React.ReactNode }> = ({ id, sep, rot = 18, children }) => (
  <g>
    <defs>
      <clipPath id={`${id}l`}><rect x={-400} y={-400} width={400} height={800} /></clipPath>
      <clipPath id={`${id}r`}><rect x={0} y={-400} width={400} height={800} /></clipPath>
    </defs>
    <g transform={`translate(${-sep} ${sep * 0.3}) rotate(${-rot * (sep / 100)})`}><g clipPath={`url(#${id}l)`}>{children}</g></g>
    <g transform={`translate(${sep} ${sep * 0.3}) rotate(${rot * (sep / 100)})`}><g clipPath={`url(#${id}r)`}>{children}</g></g>
  </g>
);

export const C2CutRing: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tCut = cue("in half");
  const tQ = cue("still a ring");
  const tNo = cue("no");
  const sep = prog(f, tCut + 3, 14) * 90;
  return (
    <Stage shakes={[tCut + 3]}>
      <ProofBanner n={1} text="The cut test" color={K.yellow} />
      <Svg>
        <g transform="translate(540 800) scale(2.6)"><Halves id="ring" sep={sep / 2.6}><Ring /></Halves></g>
        <Slash at={tCut} x={540} y={800} a={-90} len={560} />
      </Svg>
      <Label at={tQ} x={540} y={420} size={50}>Still a ring?</Label>
      <Label at={tNo} x={540} y={1180} color={K.red} size={56}>✗ a broken ring</Label>
      <Fx at={tCut} name="whoosh" volume={0.3} />
      <Fx at={tCut + 3} name="click" volume={0.5} />
      <Fx at={tNo} name="buzzer" volume={0.2} />
    </Stage>
  );
};

export const C2CutGold: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tLump = cue("lump of gold");
  const tCut = cue("in half");
  const tYes = cue("yes");
  const tAgain = cue("cut it again");
  const tStill2 = cue("still gold", 0, 1);
  const tSmall = cue("however small");
  const tStamp = tSmall + 55;
  const sep1 = prog(f, tCut + 3, 14) * 150;
  const sep2 = prog(f, tAgain + 8, 14) * 80;
  const shrink = prog(f, tStamp - 10, 10);
  return (
    <Stage shakes={[tCut + 3, tAgain + 8, tStamp]}>
      <ProofBanner n={1} text="The cut test" color={K.yellow} />
      <Svg>
        <g opacity={1 - shrink} transform={`translate(540 ${lerp(760, 700, shrink)}) scale(${1.6 * prog(f, tLump - 8, 10) || 0.001})`}>
          {[-1, 1].map((side) => (
            <g key={side} transform={`translate(${side * sep1 / 1.6} 0)`}>
              <defs><clipPath id={`gold${side}`}><rect x={side < 0 ? -200 : 0} y={-200} width={200} height={400} /></clipPath></defs>
              <g clipPath={`url(#gold${side})`}>
                <g transform={`translate(${side * -sep2 / 3.2} 0)`}><defs><clipPath id={`q${side}a`}><rect x={-200} y={-200} width={side < 0 ? 140 : 260} height={400} /></clipPath></defs>
                  <g clipPath={`url(#q${side}a)`}><Ingot /></g>
                </g>
                <g transform={`translate(${side * sep2 / 3.2} 0)`}><defs><clipPath id={`q${side}b`}><rect x={side < 0 ? -60 : 60} y={-200} width={260} height={400} /></clipPath></defs>
                  <g clipPath={`url(#q${side}b)`}><Ingot /></g>
                </g>
              </g>
            </g>
          ))}
        </g>
        {/* crumbs */}
        {f > tSmall && Array.from({ length: 18 }, (_, i) => (
          <circle key={i} cx={200 + ((i * 97) % 680)} cy={1000 + ((i * 53) % 120)} r={6 + (i % 3) * 3} fill={C.gold} opacity={prog(f, tSmall + i, 8) * (1 - shrink)} />
        ))}
        <Slash at={tCut} x={540} y={760} a={-90} len={400} />
        <Slash at={tAgain + 5} x={540} y={760} a={-80} len={900} />
      </Svg>
      <div style={{ opacity: 1 - shrink }}>
        <Label at={tYes} x={300} y={960} color={K.green}>gold ✓</Label>
        <Label at={tYes + 4} x={780} y={960} color={K.green}>gold ✓</Label>
        <Label at={tStill2} x={540} y={1080} color={K.green} size={44}>still gold ✓ ✓ ✓ ✓</Label>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1170, textAlign: "center", fontSize: 50, fontWeight: 800, opacity: prog(f, tSmall) }}>however small → <span style={{ color: K.yellow }}>still gold</span></div>
      </div>
      <Proven at={tStamp} y={820} text="every piece is still gold: it’s a material, not a thing" />
      <Fx at={tCut} name="whoosh" volume={0.3} />
      <Fx at={tCut + 3} name="click" volume={0.5} />
      <Fx at={tYes} name="ding" volume={0.16} />
      <Fx at={tAgain + 5} name="whoosh" volume={0.3} />
      <Fx at={tStill2} name="ding" volume={0.16} />
      <Fx at={tStamp} name="stamp" volume={0.4} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- proof 2: count or measure */
export const C2CountMeasure: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const sp = useSpring();
  const tNum = cue("give a number");
  const tRings = cue("three rings");
  const tMeas = cue("measure the material");
  const tGrams = cue("twenty grams");
  const tNever = cue("never lands");
  const tStamp = tNever + 50;
  const needle = prog(f, tGrams, 30);
  const fade = 1 - prog(f, tStamp - 6, 8);
  return (
    <Stage shakes={[tStamp]}>
      <ProofBanner n={2} text="Giving it a number" color={K.yellow} />
      <Svg>
        <g opacity={fade}>
          {[0, 1, 2].map((i) => <G key={i} x={300 + i * 240} y={430} s={sp(f, tRings + i * 4) * 0.9}><Ring /></G>)}
          <G x={540} y={880} s={sp(f, tMeas) * 1.1}>
            <Scale value={needle * 0.55} label={needle > 0.95 ? "20 g" : ""} />
            <g transform="translate(0 -125) scale(0.45)"><GoldBlob wobble={f / 14} /></g>
          </G>
        </g>
      </Svg>
      <div style={{ opacity: fade }}>
        {f >= tRings && <div style={{ position: "absolute", left: 0, right: 0, top: 540, display: "flex", justifyContent: "center" }}>
          <Sentence text="three [rings|nc3]" at={tRings} chipAt={tRings + 6} accent={C.material} size={62} style={{ background: K.card, padding: "10px 28px", borderRadius: 14 }} />
        </div>}
        {f >= tGrams && <div style={{ position: "absolute", left: 0, right: 0, top: 1060, display: "flex", justifyContent: "center" }}>
          <Sentence text="twenty [grams|nc20] of gold" at={tGrams} chipAt={tGrams + 6} accent={C.material} size={62} style={{ background: K.card, padding: "10px 28px", borderRadius: 14 }} />
        </div>}
        {f >= tNever && <div style={{ position: "absolute", left: 0, right: 0, top: 1250, display: "flex", justifyContent: "center" }}>
          <Sentence text="[3|g] [gold|nb3]" at={tNever} bounceAt={tNever + 4} accent={C.material} size={62} mark={f > tNever + 18 ? "wrong" : "none"} style={{ background: K.card, padding: "10px 28px", borderRadius: 14 }} />
        </div>}
      </div>
      <Proven at={tStamp} y={760} text="count the objects or measure the material, never count gold itself" />
      <Fx at={tNum} name="pop" />
      <Fx at={tRings + 6} name="click" volume={0.4} />
      <Fx at={tGrams + 6} name="click" volume={0.4} />
      <Fx at={tNever + 16} name="boing" volume={0.3} />
      <Fx at={tStamp} name="stamp" volume={0.4} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- proof 3: the brick twist */
export const C2BrickCount: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tTwist = cue("the twist");
  const tCount = cue("can be counted");
  const tForty = cue("forty bricks");
  const tMat = cue("also a material");
  const counted = Math.min(40, Math.round(prog(f, tCount, tForty - tCount + 6) * 40));
  const mode = prog(f, tMat, 30);
  return (
    <Stage shakes={[tTwist]}>
      <ProofBanner n={3} text="The twist: brick" color={K.yellow} />
      <Svg><G x={540} y={820} s={2}><BrickWall mode={mode} counted={mode > 0 ? 0 : counted} w={420} h={300} /></G></Svg>
      {counted > 0 && mode < 0.5 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 420, textAlign: "center", fontSize: 80, fontWeight: 900, color: K.yellow }}>{counted} bricks</div>
      )}
      <Label at={tMat} x={540} y={1180} color={A} size={52}>BRICK · a material, like gold</Label>
      <Fx at={tTwist} name="slam" volume={0.3} />
      {Array.from({ length: 8 }, (_, i) => <Fx key={i} at={tCount + i * ((tForty - tCount + 10) / 8)} name="tick" volume={0.12} />)}
      <Fx at={tMat} name="whoosh" volume={0.3} />
    </Stage>
  );
};

export const C2BrickBoth: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tBoth = cue("both are right");
  const t1 = cue("made of bricks");
  const t2 = cue("made of brick");
  const tDecide = cue("the meaning decides");
  const tStamp = tDecide + 40;
  return (
    <Stage shakes={[tStamp]}>
      <ProofBanner n={3} text="Both are right" color={K.yellow} />
      <Card at={t1} y={330} rot={-1.5}>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <svg width={220} height={150} viewBox="-120 -80 240 160"><g transform="scale(0.5)"><BrickWall mode={0} counted={40} w={420} h={280} /></g></svg>
          <div>
            <Sentence text="made of [bricks|n]" mark="right" at={t1} accent={C.material} size={54} />
            <div style={{ fontSize: 36, fontWeight: 700, color: "#1E8F7E", marginTop: 8 }}>= the blocks</div>
          </div>
        </div>
      </Card>
      <Card at={t2} y={640} rot={1.5}>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <svg width={220} height={150} viewBox="-120 -80 240 160"><g transform="scale(0.5)"><BrickWall mode={1} w={420} h={280} /></g></svg>
          <div>
            <Sentence text="made of [brick|n]" mark="right" at={t2} accent={C.material} size={54} />
            <div style={{ fontSize: 36, fontWeight: 700, color: "#1E8F7E", marginTop: 8 }}>= the material</div>
          </div>
        </div>
      </Card>
      <div style={{ position: "absolute", left: 0, right: 0, top: 260, textAlign: "center", fontSize: 44, fontWeight: 800, opacity: prog(f, tBoth) * (1 - prog(f, t1, 6)) }}>Both are right.</div>
      <Proven at={tStamp} y={1020} text="the meaning decides the grammar" />
      <Fx at={t1} name="correct" volume={0.2} />
      <Fx at={t2} name="correct" volume={0.2} />
      <Fx at={tStamp} name="stamp" volume={0.4} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- your turn: wood */
export const C2Wood: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const sp = useSpring();
  const tTurn = cue("your turn");
  const tCut = cue("in half");
  const tYes = cue("yes");
  const tTable = cue("this table");
  const sep = prog(f, tCut + 3, 14) * 110;
  const up = prog(f, tTable - 10, 16);
  return (
    <Stage shakes={[tCut + 3]}>
      <ProofBanner n="YOUR TURN" text="wood" color={K.green} />
      <Svg>
        <g transform={`translate(540 ${lerp(700, 520, up)}) scale(${lerp(1.6, 1, up)})`}>
          {[-1, 1].map((side) => (
            <g key={side} transform={`translate(${side * sep / 1.6} 0) rotate(${side * sep / 20})`}>
              <defs><clipPath id={`plank${side}`}><rect x={side < 0 ? -200 : 0} y={-100} width={200} height={200} /></clipPath></defs>
              <g clipPath={`url(#plank${side})`}><Plank /></g>
            </g>
          ))}
        </g>
        <Slash at={tCut} x={540} y={700} a={-90} len={320} />
        <G x={540} y={960} s={sp(f, tTable) * 1.4}><Table c="#C9935C" /></G>
      </Svg>
      <div style={{ opacity: 1 - up }}>
        <Label at={tYes} x={300} y={880} color={K.green}>wood ✓</Label>
        <Label at={tYes + 4} x={780} y={880} color={K.green}>wood ✓</Label>
      </div>
      {f >= tTable && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 1210, display: "flex", justifyContent: "center" }}>
          <Sentence text="This table is made of [wood|n]." mark="right" at={tTable} accent={C.material} size={56} style={{ background: K.card, padding: "18px 30px", borderRadius: 16 }} />
        </div>
      )}
      <Fx at={tTurn} name="pop" />
      <Fx at={tCut} name="whoosh" volume={0.3} />
      <Fx at={tCut + 3} name="click" volume={0.5} />
      <Fx at={tYes} name="ding" volume={0.16} />
      <Fx at={tTable} name="correct" volume={0.2} />
    </Stage>
  );
};

/* ---------------------------------------------------------------- the rule */
export const C2Rule: React.FC = () => {
  const cue = useCue();
  const tMat = cue("its a material");
  return (
    <RuleFlow topAt={cue("dont memorise")} top={<><span style={{ textDecoration: `line-through ${K.red} 8px` }}>MEMORISE</span> → <span style={{ color: K.yellow }}>CUT IT</span></>}
      closeAt={cue("measure it", 1.8)}
      steps={[
        { at: cue("cut it in half"), content: "Cut it in half.", bg: K.card },
        { at: cue("every piece"), content: "Every piece still the same stuff?", bg: K.card },
        { at: tMat - 4, content: "YES → it’s a material", bg: K.green },
        { at: cue("measure it"), content: <>Measure it. Don’t count it.</>, bg: K.yellow },
      ]} />
  );
};

export const CASE02: Record<string, React.FC> = {
  MeltHook: C2Melt, HookBreak: C2Break, CaseOpen: C2Case, CutRing: C2CutRing, CutGold: C2CutGold,
  CountMeasure: C2CountMeasure, BrickCount: C2BrickCount, BrickBoth: C2BrickBoth, WoodTest: C2Wood, RuleCard2: C2Rule,
};
