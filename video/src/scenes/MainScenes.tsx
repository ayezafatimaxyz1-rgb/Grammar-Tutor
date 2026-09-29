// The 19 scenes of the 16:9 explainer. Each scene is keyed to words in its narration via useCue().
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  Backpack, Bed, BrickWall, Bowl, Chair, Coin, Cup, GoldBlob, Grain, Holdall, Jug, Loaf, MilkBottle, Necklace,
  Hammer, Painting, Plate, Ring, Scale, Shirt, Slice, Sofa, Suitcase, Swatch, Table, Trousers, Wrench,
} from "../art";
import { CaseTab, Chip, G, Layer, Note, Sentence, Sfx, Stamp, Tag } from "../components";
import { C, FONT, MONO, SECTIONS, tint } from "../theme";
import { fadeUp, lerp, prog, useCue, usePop } from "../timing";
import {
  ART_FACTS, DrawPath, DrawRect, Ideas, KnowledgeMap, MiniPicture, ProcessLoop, TaskCard,
} from "./shared";

const W = 1920;
const H = 1080;
const SX = 120; // sentence column left edge

const Tab: React.FC<{ i: number }> = ({ i }) => {
  const s = SECTIONS[i];
  return <CaseTab num={s.num} title={s.title} color={C[s.key]} />;
};

/* ========================================================== 1 HOOK */
export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tFurn = cue("the furniture are");
  const tChairs = cue("several chairs");
  const tRice = cue("much rice");
  const tGrains = cue("thousands of grains");
  const tList = cue("a memorised list");
  const tWhy = cue("show you why");
  const zoomRoom = prog(f, tChairs, 25);
  const zoomBowl = prog(f, tGrains, 30);
  const listIn = prog(f, tList, 15);
  return (
    <>
      <CaseTab title="GRAMMAR DETECTIVE" color={C.ink} />
      <Sentence text="The [furniture|n] [are|x] expensive." mark="wrong" at={tFurn} hlAt={tChairs} style={{ position: "absolute", left: SX, top: 150 }} size={50} accent={C.unit} />
      <Sentence text="…too [much|g] [rice|n]?" mark="none" at={tRice} style={{ position: "absolute", left: 1080, top: 150 }} size={50} accent={C.measured} />
      <Layer w={W} h={H}>
        {/* room */}
        <g transform={`translate(${lerp(500, 540, zoomRoom)} ${lerp(620, 640, zoomRoom)}) scale(${lerp(1, 1.12, zoomRoom)})`} opacity={prog(f, tFurn - 10, 15) * (1 - listIn)}>
          <rect x={-400} y={-240} width={800} height={400} rx={30} fill={C.card} stroke={C.rule} strokeWidth={4} />
          <G x={-280} y={20} s={0.8}><Chair /></G>
          <G x={-150} y={20} s={0.8}><Chair /></G>
          <G x={40} y={40} s={0.8}><Table /></G>
          <G x={250} y={-100} s={0.65}><Bed /></G>
          <G x={240} y={90} s={0.7}><Sofa /></G>
        </g>
        {/* bowl zooming into grains */}
        <g transform={`translate(1400 ${lerp(640, 600, zoomBowl)}) scale(${lerp(1, 2.6, zoomBowl)})`} opacity={prog(f, tRice - 8, 15) * (1 - zoomBowl * 0.9) * (1 - listIn)}>
          <Bowl />
        </g>
        <g transform="translate(1400 620)" opacity={zoomBowl * (1 - listIn)}>
          {Array.from({ length: 34 }, (_, i) => (
            <G key={i} x={((i * 71) % 520) - 260} y={((i * 43) % 300) - 150} s={2.2 * zoomBowl} r={(i * 57) % 180}><Grain /></G>
          ))}
        </g>
        {/* memorised list */}
        <g transform={`translate(960 ${lerp(700, 600, listIn)})`} opacity={listIn}>
          <rect x={-230} y={-200} width={460} height={400} rx={18} fill={C.card} stroke={C.ink} strokeWidth={4} />
          {["furniture", "luggage", "rice", "knowledge", "work"].map((w, i) => (
            <text key={w} x={-170} y={-120 + i * 62} fontSize={36} fontFamily={MONO} fill={C.inkSoft}>• {w}</text>
          ))}
          <text x={0} y={-160} textAnchor="middle" fontSize={26} fontWeight={700} fill={C.ink} fontFamily={FONT} letterSpacing={3}>MEMORISE:</text>
        </g>
      </Layer>
      {listIn < 0.5 && <Stamp text="?" at={tChairs + 8} x={860} y={380} size={64} />}
      {listIn < 0.5 && <Stamp text="?" at={tGrains + 18} x={1690} y={380} size={64} />}
      <Stamp text="BUT WHY?" at={tWhy} x={1060} y={760} size={64} color={C.error} />
      <Sfx at={tFurn} name="wrong" />
      <Sfx at={tGrains} name="whoosh" />
      <Sfx at={tWhy} name="pop" />
    </>
  );
};

/* ========================================================== 2 OVERVIEW */
export const Overview: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tMeaning = cue("in the meanings");
  const tUnc = cue("uncountable");
  const tSing = cue("singular verb");
  const cues = [cue("overall collection"), cue("a material"), cue("a measured amount"), cue("body of knowledge"), cue("an activity")];
  return (
    <>
      <CaseTab title="FIVE PICTURES" color={C.ink} />
      <div style={{ position: "absolute", left: SX, top: 150, fontSize: 50, fontWeight: 700, ...fadeUp(f, tMeaning) }}>
        In <span style={{ background: tint(C.highlight, 0.6), padding: "0 8px", borderRadius: 8 }}>these meanings</span>
        <span style={{ ...fadeUp(f, tUnc) , display: "inline-block" }}>&nbsp;→ <b>uncountable</b></span>
        <span style={{ ...fadeUp(f, tSing), display: "inline-block" }}>&nbsp;→ <b style={{ color: C.correct }}>singular verb</b></span>
      </div>
      {SECTIONS.map((s, i) => {
        const at = cues[i];
        const p = prog(f, at, 16);
        const x = 130 + i * 340;
        return (
          <div key={s.key} style={{
            position: "absolute", left: x, top: 330, width: 300, height: 520, borderRadius: 24, background: C.card,
            border: `5px solid ${C[s.key]}`, opacity: p, transform: `translateY(${(1 - p) * 60}px) rotate(${(1 - p) * -6}deg)`,
          }}>
            <div style={{ background: C[s.key], color: "#fff", fontFamily: MONO, fontWeight: 600, fontSize: 26, padding: "12px 18px", borderRadius: "18px 18px 0 0" }}>
              CASE {s.num}
            </div>
            <svg width={290} height={260} viewBox="-145 -130 290 260" style={{ display: "block", margin: "10px auto 0" }}>
              <MiniPicture k={s.key} p={prog(f, at + 8, 30)} />
            </svg>
            <div style={{ textAlign: "center", fontWeight: 800, fontSize: 30, color: C[s.key], padding: "0 10px" }}>{s.title}</div>
            <div style={{ textAlign: "center", fontSize: 26, color: C.inkSoft, marginTop: 10, fontStyle: "italic" }}>{s.picture}</div>
          </div>
        );
      })}
      {cues.map((c, i) => <Sfx key={i} at={c} name="tick" />)}
      <Note at={cues[4] + 30} x={960} y={900} w={1500} size={32} italic>
        Five ways of picturing these examples. They can overlap.
      </Note>
    </>
  );
};

/* ========================================================== 3–5 UNIT / MASS */
const FURN = [
  { k: "chair", x: 330, el: <Chair c={C.unit} /> },
  { k: "chair2", x: 500, el: <Chair c={C.unit} /> },
  { k: "table", x: 790, el: <Table c={C.unit} /> },
  { k: "sofa", x: 1110, el: <Sofa c={C.unit} /> },
  { k: "bed", x: 1450, el: <Bed c={C.unit} /> },
];

const FurnitureRow: React.FC<{ show: Record<string, number>; chips?: Record<string, number>; bracket: number; y?: number; s?: number; labels?: number }> = ({
  show, chips = {}, bracket, y = 640, s = 1, labels = 1,
}) => {
  const pop = usePop();
  const f = useCurrentFrame();
  const names: Record<string, string> = { chair: "chair", chair2: "chair", table: "table", sofa: "sofa", bed: "bed" };
  return (
    <g transform={`translate(${960 * (1 - s)} ${y * (1 - s)}) scale(${s})`}>
      <DrawRect x={170} y={y - 190} w={1480} h={380} p={bracket} color={C.unit} sw={7} fill={tint(C.unit, 0.05 * bracket)} />
      {FURN.map((o) => {
        const sc = show[o.k] === undefined ? 0 : pop(f, show[o.k]);
        return (
          <g key={o.k}>
            <G x={o.x} y={y} s={sc}>{o.el}</G>
            <text x={o.x} y={y + 145} textAnchor="middle" fontSize={32} fontWeight={600} fill={C.ink} fontFamily={FONT} opacity={Math.min(sc, labels)}>
              {names[o.k]}
            </text>
          </g>
        );
      })}
      {Object.entries(chips).map(([k, at]) => {
        const o = FURN.find((x) => x.k === k)!;
        const p = pop(f, at);
        return (
          <g key={k} transform={`translate(${o.x} ${y - 150}) scale(${p})`}>
            <circle r={30} fill={C.unit} />
            <text y={11} textAnchor="middle" fontSize={32} fontWeight={800} fill="#fff" fontFamily={FONT}>{k === "chair" ? 1 : 2}</text>
          </g>
        );
      })}
    </g>
  );
};

export const Unit1: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tErr = cue("the furniture are");
  const show = { chair: cue("a chair"), table: cue("a table"), sofa: cue("a sofa"), bed: cue("a bed"), chair2: cue("two chairs") };
  const chips = { chair: cue("one chair"), chair2: cue("two chairs", 0.2) };
  const tCall = cue("call them furniture");
  const b = prog(f, tCall, 22);
  return (
    <>
      <Tab i={0} />
      <Sentence text="The [furniture|n] [are|x] expensive." mark="wrong" at={tErr} hlAt={tCall} style={{ position: "absolute", left: SX, top: 150 }} accent={C.unit} />
      <Note at={show.chair} x={SX} y={260} w={1200} align="left" size={32}>I can count the separate objects…</Note>
      <Layer w={W} h={H}>
        <FurnitureRow show={show} chips={chips} bracket={b} />
      </Layer>
      <Tag color={C.unit} at={tCall + 10} x={910} y={452} size={38} solid>FURNITURE</Tag>
      <Note at={tCall + 18} x={910} y={870} w={1400} size={32} italic>…but <b>furniture</b> is a different way of talking about them.</Note>
      <Sfx at={tErr} name="wrong" />
      {Object.values(chips).map((c, i) => <Sfx key={i} at={c} name="pop" />)}
      <Sfx at={tCall} name="whoosh" />
    </>
  );
};

export const Unit2: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tLabel = cue("overall label");
  const tNot = cue("not the name");
  const tFix = cue("the furniture is");
  const tPieces = cue("pieces of furniture", 0, 0);
  const tTwo = cue("two pieces");
  const tAre = cue("are expensive");
  const tPlural = cue("here pieces is plural");
  const allShown = { chair: -100, chair2: -100, table: -100, sofa: -100, bed: -100 };
  const shrink = prog(f, tFix - 20, 20);
  return (
    <>
      <Tab i={0} />
      <Sentence text="The [furniture|n] [are|x] expensive." mark="wrong" at={-100} hlAt={0} style={{ position: "absolute", left: SX, top: 140, opacity: 1 - 0.5 * shrink }} size={46} accent={C.unit} />
      <Sentence text="The [furniture|nL] [is|vL] expensive." mark="right" at={tFix} linkAt={tFix + 20} style={{ position: "absolute", left: SX, top: 230 }} size={46} accent={C.unit} />
      <Sentence text="[Two|g] [pieces|nLc2] of furniture [are|vL] expensive." mark="right" at={tPieces - 6} chipAt={tTwo} linkAt={tAre}
        style={{ position: "absolute", left: SX, top: 350 }} size={46} accent={C.unit} />
      <Layer w={W} h={H}>
        <g transform={`translate(0 ${lerp(0, 120, shrink)})`}>
          <FurnitureRow show={allShown} bracket={1} s={lerp(1, 0.62, shrink)} y={lerp(640, 720, shrink)} />
        </g>
      </Layer>
      <Tag color={C.unit} at={-100} x={lerp(910, 910, shrink)} y={lerp(452, 700, shrink)} size={lerp(38, 30, shrink)} solid>FURNITURE</Tag>
      <div style={{ position: "absolute", left: 1210, top: 250, width: 620, ...fadeUp(f, tLabel), opacity: prog(f, tLabel) * (1 - shrink) }}>
        <div style={{ fontSize: 34, fontWeight: 700, color: C.unit }}>furniture = the overall label</div>
        <div style={{ fontSize: 30, color: C.inkSoft, marginTop: 10, ...fadeUp(f, tNot) }}>not the name of each separate item</div>
      </div>
      {/* chairs → are / furniture → is comparison */}
      <div style={{ position: "absolute", left: 1520, top: 740, ...fadeUp(f, tFix + 30) }}>
        <div style={{ fontSize: 38, fontWeight: 700, background: C.card, border: `3px solid ${C.rule}`, borderRadius: 16, padding: "14px 26px" }}>
          chairs → <span style={{ color: C.correct }}>are</span>
        </div>
        <div style={{ fontSize: 38, fontWeight: 700, background: C.card, border: `3px solid ${C.unit}`, borderRadius: 16, padding: "14px 26px", marginTop: 18 }}>
          furniture → <span style={{ color: C.correct }}>is</span>
        </div>
      </div>
      <Note at={tPlural} x={SX + 70} y={440} w={900} align="left" size={30} color={C.unit}>The number goes on <b>pieces</b>, so the verb is plural.</Note>
      <Sfx at={tFix} name="correct" />
      <Sfx at={tTwo} name="pop" />
    </>
  );
};

export const Unit3: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tLug = cue("with luggage");
  const tBags = cue("several bags");
  const tLabel = cue("one luggage label");
  const tIs = cue("the luggage is heavy");
  const tThree = cue("three pieces");
  const tAre = cue("are heavy");
  const tCl = cue("clothing");
  const tEq = cue("equipment");
  const tCr = cue("crockery");
  const gather = prog(f, tBags + 5, 20);
  const split = prog(f, tThree, 20);
  const spread = gather * (1 - split);
  const items = [<Suitcase c={C.unit} />, <Holdall c={C.unit} />, <Backpack c={C.unit} />];
  const bx = (i: number) => 620 + (i - 1) * lerp(330, 200, spread);
  return (
    <>
      <Tab i={0} />
      <Sentence text="The [luggage|nL] [is|vL] heavy." mark="right" at={tIs} linkAt={tIs + 14} style={{ position: "absolute", left: SX, top: 150 }} size={46} accent={C.unit} />
      <Sentence text="Three [pieces|nLc3] of luggage [are|vL] heavy." mark="right" at={tThree - 5} chipAt={tThree} linkAt={tAre} style={{ position: "absolute", left: SX, top: 260 }} size={46} accent={C.unit} />
      <Layer w={W} h={H}>
        <DrawRect x={320} y={450} w={600} h={330} p={prog(f, tLabel, 18) * (1 - split)} color={C.unit} sw={7} />
        {items.map((el, i) => (
          <G key={i} x={bx(i)} y={620} s={pop(f, tLug + i * 5) * 0.95}>{el}</G>
        ))}
        {[0, 1, 2].map((i) => {
          const p = pop(f, tThree + 8 + i * 6);
          return (
            <g key={i} transform={`translate(${bx(i)} 470) scale(${p})`}>
              <circle r={28} fill={C.unit} />
              <text y={10} textAnchor="middle" fontSize={30} fontWeight={800} fill="#fff" fontFamily={FONT}>{i + 1}</text>
            </g>
          );
        })}
      </Layer>
      <div style={{ opacity: 1 - split }}><Tag color={C.unit} at={tLabel} x={620} y={452} size={34} solid>LUGGAGE</Tag></div>
      <Note at={tThree + 20} x={620} y={820} w={700} size={30} color={C.unit}>count <b>pieces</b>, not “luggages”</Note>
      {/* picture it similarly */}
      {[
        { at: tCl, label: "CLOTHING", els: [<Shirt c={C.unit} />, <Trousers c={C.unit} />] },
        { at: tEq, label: "EQUIPMENT", els: [<Wrench c={C.unit} />, <Hammer c={C.unit} />] },
        { at: tCr, label: "CROCKERY", els: [<Plate c={C.unit} />, <Cup c={C.unit} />] },
      ].map((row, i) => (
        <div key={row.label} style={{ position: "absolute", left: 1180, top: 400 + i * 200, width: 620, height: 170, background: C.card, border: `4px solid ${C.unit}`, borderRadius: 22, ...fadeUp(f, row.at, 12, 30) }}>
          <svg width={330} height={170} viewBox="-165 -85 330 170" style={{ position: "absolute", left: 10, top: 0 }}>
            <G x={-70} y={0} s={0.62}>{row.els[0]}</G>
            <G x={70} y={0} s={0.62}>{row.els[1]}</G>
          </svg>
          <div style={{ position: "absolute", left: 350, top: 58, fontFamily: MONO, fontWeight: 600, fontSize: 36, color: C.unit }}>{row.label}</div>
        </div>
      ))}
      <Sfx at={tBags} name="whoosh" />
      <Sfx at={tIs} name="correct" />
      <Sfx at={tThree} name="pop" />
    </>
  );
};

/* ========================================================== 6–8 MATERIAL */
const OBJ = [
  { k: "ring", x: 1300, y: 380, el: <Ring /> },
  { k: "coin", x: 1560, y: 600, el: <Coin /> },
  { k: "necklace", x: 1260, y: 800, el: <Necklace /> },
];

export const Material1: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tGold = cue("think of gold");
  const at = [cue("a ring"), cue("a coin"), cue("a necklace")];
  const tThings = cue("three different things");
  const tSub = cue("the substance");
  const tMuch = cue("how much gold");
  return (
    <>
      <Tab i={1} />
      <Layer w={W} h={H}>
        <G x={560} y={600} s={pop(f, tGold) * 1.3}><GoldBlob wobble={f / 10} /></G>
        {OBJ.map((o, i) => (
          <g key={o.k}>
            <DrawPath d={`M660 ${560 + i * 30} C ${900} ${520 + i * 40}, ${o.x - 250} ${o.y}, ${o.x - 90} ${o.y}`} p={prog(f, at[i] - 6, 18)} color={C.gold} sw={10} dash={undefined} />
            <G x={o.x} y={o.y} s={pop(f, at[i] + 8)}>{o.el}</G>
            <text x={o.x + (o.k === "coin" ? 0 : 150)} y={o.y + (o.k === "coin" ? 110 : 12)} textAnchor="middle" fontSize={34} fontWeight={700} fill={C.ink} fontFamily={FONT} opacity={prog(f, tThings)}>
              {o.k}
            </text>
          </g>
        ))}
      </Layer>
      <Tag color={C.material} at={tSub} x={560} y={420} size={36} solid>GOLD · material</Tag>
      <Note at={tSub + 10} x={560} y={740} w={640} size={30}>the substance they are made from</Note>
      <Note at={tThings} x={1450} y={200} w={600} size={30} italic>three separate things</Note>
      <Sentence text="How [much|g] [gold|n]?" at={tMuch} accent={C.material} size={60} style={{ position: "absolute", left: SX, top: 150 }} />
      <Sfx at={tGold} name="whoosh" />
      <Sfx at={tMuch} name="pop" />
    </>
  );
};

export const Material2: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tRings = cue("three rings");
  const tGrams = cue("twenty grams");
  const tNum = cue("the number belongs");
  const sw = [cue("silver"), cue("wood"), cue("glass"), cue("cotton")];
  const needle = prog(f, tGrams, 30);
  return (
    <>
      <Tab i={1} />
      <Sentence text="three [rings|nc3]" at={tRings - 5} chipAt={tRings + 4} accent={C.material} size={56} style={{ position: "absolute", left: 250, top: 190 }} />
      <Sentence text="twenty [grams|nc20] of gold" at={tGrams - 5} chipAt={tGrams + 4} accent={C.material} size={56} style={{ position: "absolute", left: 1100, top: 190 }} />
      <Layer w={W} h={H}>
        {[0, 1, 2].map((i) => <G key={i} x={330 + i * 170} y={480} s={pop(f, tRings + i * 4) * 0.8}><Ring /></G>)}
        <G x={1350} y={500} s={pop(f, tGrams - 8)}>
          <Scale value={needle * 0.55} label={needle > 0.95 ? "20 g" : ""} />
          <g transform="translate(0 -125) scale(0.45)"><GoldBlob wobble={f / 14} /></g>
        </G>
        {(["silver", "wood", "glass", "cotton"] as const).map((k, i) => (
          <g key={k} opacity={prog(f, sw[i])}>
            <G x={390 + i * 380} y={880} s={pop(f, sw[i])}><Swatch kind={k} /></G>
            <text x={390 + i * 380} y={975} textAnchor="middle" fontSize={32} fontWeight={700} fill={C.material} fontFamily={FONT}>{k}</text>
          </g>
        ))}
      </Layer>
      <div style={{ position: "absolute", left: 0, right: 0, top: 680, textAlign: "center", fontSize: 38, fontWeight: 700, ...fadeUp(f, tNum) }}>
        the number goes on <span style={{ color: C.material }}>rings</span> or <span style={{ color: C.material }}>grams</span>, not on <span style={{ textDecoration: `line-through ${C.error} 5px` }}>gold</span>
      </div>
      <Sfx at={tRings + 4} name="pop" />
      <Sfx at={tGrams + 4} name="pop" />
    </>
  );
};

export const Material3: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tCorr = cue("important correction");
  const tBricks = cue("made of bricks");
  const tBlocks = cue("individual blocks");
  const tBrick = cue("made of brick");
  const tMat = cue("means the material");
  const tDiff = cue("the difference");
  const counted = Math.floor(prog(f, tBlocks, 45) * 20);
  const pulse = 1 + 0.06 * Math.sin(Math.max(0, f - tDiff) / 4) * prog(f, tDiff);
  return (
    <>
      <Tab i={1} />
      <Stamp text="CORRECTION TO THE NOTES" at={tCorr} x={1350} y={80} size={34} color={C.material} rot={-3} />
      <Sentence text="This house is made of [bricks|n]." mark="right" at={tBricks} accent={C.material} size={46} style={{ position: "absolute", left: 110, top: 170, transform: `scale(${pulse})`, transformOrigin: "left" }} />
      <Sentence text="This house is made of [brick|n]." mark="right" at={tBrick} accent={C.material} size={46} style={{ position: "absolute", left: 1000, top: 170, transform: `scale(${pulse})`, transformOrigin: "left" }} />
      <Layer w={W} h={H}>
        <g opacity={prog(f, tBricks - 5)}>
          <G x={500} y={560} s={1.25}><BrickWall mode={0} counted={counted} /></G>
        </g>
        <g opacity={prog(f, tBrick - 5)}>
          <G x={1400} y={560} s={1.25}><BrickWall mode={prog(f, tMat, 30)} /></G>
        </g>
      </Layer>
      {counted > 0 && (
        <div style={{ position: "absolute", left: 500, top: 330, transform: "translateX(-50%)", fontSize: 34, fontWeight: 800, color: C.material }}>
          {counted} bricks…
        </div>
      )}
      <Tag color={C.material} at={tBlocks + 10} x={500} y={800} size={30}>bricks = individual blocks</Tag>
      <Tag color={C.material} at={tMat} x={1400} y={800} size={30} solid>brick = the material</Tag>
      <Note at={tDiff} x={960} y={880} w={1500} size={36} color={C.ink}>Both are correct. Ask: <b>what does the word name in this sentence?</b></Note>
      <Sfx at={tCorr} name="pop" />
      <Sfx at={tBricks} name="correct" />
      <Sfx at={tBrick} name="correct" />
    </>
  );
};

/* ========================================================== 9–11 MEASURED */
const RiceGrains: React.FC<{ n: number; s: number; spread?: number }> = ({ n, s, spread = 1 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <G key={i} x={(((i * 71) % 600) - 300) * spread} y={(((i * 43) % 320) - 160) * spread} s={s} r={(i * 57) % 180}><Grain /></G>
    ))}
  </g>
);

export const Measured1: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tErr = cue("i ate too many");
  const tWrong = cue("is wrong");
  const tZoom = cue("if we zoom in");
  const tFood = cue("rice as food");
  const tBowl = cue("amount in the bowl");
  const tList = cue("not listing");
  const zin = prog(f, tZoom, 20);
  const back = prog(f, tFood, 25);
  const count = Math.min(5, Math.floor(prog(f, tList, 30) * 6));
  return (
    <>
      <Tab i={2} />
      <Sentence text="I ate too [many|x] [rice|n] for lunch." mark="wrong" at={tErr} hlAt={tWrong} accent={C.measured} style={{ position: "absolute", left: SX, top: 150 }} />
      <Layer w={W} h={H}>
        <g transform="translate(760 640)" opacity={zin * (1 - back)}>
          <RiceGrains n={40} s={lerp(1, 3, zin)} spread={lerp(0.6, 1.1, zin)} />
        </g>
        <g transform={`translate(760 640) scale(${lerp(0.4, 1.5, back)})`} opacity={back}>
          <Bowl marks />
        </g>
        {/* amount gauge */}
        <g transform="translate(1280 640)" opacity={prog(f, tBowl - 5)}>
          <rect x={-30} y={-170} width={60} height={300} rx={14} fill={C.card} stroke={C.measured} strokeWidth={5} />
          <rect x={-22} y={122 - 280 * 0.6 * prog(f, tBowl, 25)} width={44} height={280 * 0.6 * prog(f, tBowl, 25)} rx={8} fill={tint(C.measured, 0.6)} />
          <text x={60} y={-30} fontSize={34} fontWeight={800} fill={C.measured} fontFamily={FONT}>amount</text>
        </g>
      </Layer>
      <Tag color={C.measured} at={tFood} x={760} y={430} size={34} solid>RICE · food</Tag>
      <Note at={tZoom + 5} x={760} y={900} w={900} size={32} italic>{back < 0.5 ? "we can see many grains…" : ""}</Note>
      {count > 0 && (
        <div style={{ position: "absolute", left: 1450, top: 820, fontSize: 44, fontFamily: MONO, color: C.inkSoft }}>
          <span style={{ textDecoration: count >= 5 ? `line-through ${C.error} 5px` : "none" }}>
            {Array.from({ length: count }, (_, i) => i + 1).join(", ")}…
          </span>
        </div>
      )}
      <Sfx at={tErr} name="wrong" />
      <Sfx at={tZoom} name="whoosh" />
      <Sfx at={tFood} name="whoosh" />
    </>
  );
};

export const Measured2: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tFix = cue("i ate too much");
  const tGrains = cue("many grains of rice");
  const tBowls = cue("two bowls of rice");
  const tWatch = cue("watch where");
  const tSlices = cue("three slices");
  const tLitres = cue("two litres");
  return (
    <>
      <Tab i={2} />
      <Sentence text="I ate too [much|g] [rice|n] for lunch." mark="right" at={tFix} accent={C.measured} style={{ position: "absolute", left: SX, top: 150 }} />
      <Layer w={W} h={H}>
        {/* row icons */}
        <g opacity={prog(f, tFix + 10)}><G x={230} y={390} s={0.55}><Bowl marks /></G></g>
        <g opacity={prog(f, tGrains - 5)} transform="translate(230 560)"><RiceGrains n={10} s={1.6} spread={0.25} /></g>
        <g opacity={prog(f, tBowls - 5)}>
          <G x={180} y={730} s={pop(f, tBowls) * 0.42}><Bowl /></G>
          <G x={290} y={730} s={pop(f, tBowls + 5) * 0.42}><Bowl /></G>
        </g>
        {/* bread and milk */}
        <g opacity={prog(f, tSlices - 5)}>
          <G x={1250} y={420} s={0.7}><Loaf /></G>
          {[0, 1, 2].map((i) => <G key={i} x={1450 + i * 110} y={420} s={pop(f, tSlices + 5 + i * 5) * 0.8} r={-6 + i * 6}><Slice /></G>)}
        </g>
        <g opacity={prog(f, tLitres - 5)}>
          {[0, 1].map((i) => <G key={i} x={1340 + i * 150} y={760} s={pop(f, tLitres + 3 + i * 5) * 0.9}><MilkBottle /></G>)}
        </g>
      </Layer>
      <Sentence text="[much|gL] [rice|nL]" at={tFix + 10} linkAt={tFix + 22} accent={C.measured} size={48} style={{ position: "absolute", left: 400, top: 355 }} />
      <Sentence text="[many|gL] [grains|nL] of rice" at={tGrains} linkAt={tGrains + 10} accent={C.measured} size={48} style={{ position: "absolute", left: 400, top: 525 }} />
      <Sentence text="[two|gL] [bowls|nLc2] of rice" at={tBowls} chipAt={tBowls + 6} linkAt={tBowls + 12} accent={C.measured} size={48} style={{ position: "absolute", left: 400, top: 695 }} />
      <Note at={tWatch} x={400} y={840} w={700} align="left" size={30} color={C.measured}>the quantity goes on <b>grains</b> or <b>bowls</b></Note>
      <Sentence text="three [slices|nc3] of bread" at={tSlices} chipAt={tSlices + 4} accent={C.measured} size={44} style={{ position: "absolute", left: 1180, top: 540 }} />
      <Sentence text="two [litres|nc2] of milk" at={tLitres} chipAt={tLitres + 4} accent={C.measured} size={44} style={{ position: "absolute", left: 1220, top: 900 }} />
      <Sfx at={tFix} name="correct" />
      <Sfx at={tBowls + 6} name="pop" />
      <Sfx at={tSlices + 4} name="pop" />
      <Sfx at={tLitres + 4} name="pop" />
    </>
  );
};

export const Measured3: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tOver = cue("overlaps with substances");
  const tOwn = cue("its own picture");
  const tBowl = cue("a bowl of rice");
  const tJug = cue("a jug of milk");
  const tHow = cue("measuring an amount");
  return (
    <>
      <Tab i={2} />
      <Layer w={W} h={H}>
        <DrawRect x={240} y={330} w={900} h={440} p={prog(f, tOwn, 20)} color={C.measured} sw={7} fill={tint(C.measured, 0.05)} />
        <DrawRect x={780} y={380} w={900} h={440} p={prog(f, tOver, 20)} color={C.material} sw={7} fill={tint(C.material, 0.05)} />
        <G x={500} y={570} s={pop(f, tBowl - 4) * 0.9}><Bowl marks /></G>
        <G x={960} y={590} s={pop(f, tJug - 4) * 0.95}><Jug /></G>
        <G x={1420} y={610} s={pop(f, tOver) * 0.75}><Scale value={0.55} label="20 g" /><g transform="translate(0 -125) scale(0.45)"><GoldBlob wobble={f / 14} /></g></G>
      </Layer>
      <Tag color={C.measured} at={tOwn} x={420} y={330} size={30} solid>MEASURED</Tag>
      <Tag color={C.material} at={tOver} x={1500} y={820} size={30} solid>MATERIAL</Tag>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center", ...fadeUp(f, tHow) }}>
        <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 72, color: C.ink, letterSpacing: 6, borderBottom: `8px solid ${C.measured}` }}>HOW MUCH?</span>
      </div>
      <Note at={tOver + 10} x={960} y={900} w={1400} size={32} italic>The pictures overlap: milk is a food and a substance.</Note>
    </>
  );
};

/* ========================================================== 12–14 ABSTRACT */
export const Abstract1: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tErr = cue("he has many knowledges");
  const tWrong = cue("is wrong");
  const tBody = cue("whole body");
  const tFacts = cue("many facts");
  const tNot = cue("not naming");
  return (
    <>
      <Tab i={3} />
      <Sentence text="He has many [knowledges|x] about art." mark="wrong" at={tErr} hlAt={tWrong} accent={C.abstract} style={{ position: "absolute", left: SX, top: 150 }} />
      <Layer w={W} h={H}>
        <G x={760} y={640}>
          <KnowledgeMap show={prog(f, tErr + 20, 50)} join={prog(f, tBody, 30)} labels={ART_FACTS} />
        </G>
      </Layer>
      <Tag color={C.abstract} at={tBody + 20} x={760} y={390} size={36} solid>KNOWLEDGE</Tag>
      <div style={{ position: "absolute", left: 1250, top: 460, width: 580 }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: C.abstract, ...fadeUp(f, tBody) }}>one whole body of understanding</div>
        <div style={{ fontSize: 32, color: C.inkSoft, marginTop: 24, ...fadeUp(f, tFacts) }}>It contains many facts…</div>
        <div style={{ fontSize: 32, color: C.ink, marginTop: 24, ...fadeUp(f, tNot) }}>…but <b>knowledge</b> doesn’t name each fact separately.</div>
      </div>
      <Sfx at={tErr} name="wrong" />
      <Sfx at={tBody} name="whoosh" />
    </>
  );
};

export const Abstract2: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const tFix = cue("he has a lot");
  const tAdv = cue("some advice");
  const tInf = cue("useful information");
  const tPA = cue("two pieces of advice");
  const tPI = cue("three pieces of information");
  const tF = cue("three facts");
  return (
    <>
      <Tab i={3} />
      <Sentence text="He has [a lot of|g] [knowledge|n] about art." mark="right" at={tFix} accent={C.abstract} style={{ position: "absolute", left: SX, top: 150 }} />
      <Layer w={W} h={H}>
        <G x={480} y={640} s={0.62}><KnowledgeMap show={1} join={1} labels={ART_FACTS} /></G>
      </Layer>
      <Tag color={C.abstract} at={-100} x={480} y={465} size={28} solid>KNOWLEDGE</Tag>
      <Sentence text="[some|g] [advice|n]" at={tAdv} accent={C.abstract} size={44} style={{ position: "absolute", left: 1000, top: 330 }} />
      <Sentence text="[useful|g] [information|n]" at={tInf} accent={C.abstract} size={44} style={{ position: "absolute", left: 1350, top: 330 }} />
      <div style={{ position: "absolute", left: 1000, top: 440, fontSize: 30, color: C.inkSoft, fontStyle: "italic", ...fadeUp(f, tPA - 12) }}>Need a number? Count a unit:</div>
      <Sentence text="two [pieces|nc2] of advice" at={tPA} chipAt={tPA + 4} accent={C.abstract} size={44} style={{ position: "absolute", left: 1000, top: 560 }} />
      <Sentence text="three [pieces|nc3] of information" at={tPI} chipAt={tPI + 4} accent={C.abstract} size={44} style={{ position: "absolute", left: 1000, top: 700 }} />
      <Sentence text="three [facts|nc3]" at={tF} chipAt={tF + 4} accent={C.abstract} size={44} style={{ position: "absolute", left: 1000, top: 840 }} />
      <Sfx at={tFix} name="correct" />
      <Sfx at={tPA + 4} name="pop" />
      <Sfx at={tPI + 4} name="pop" />
      <Sfx at={tF + 4} name="pop" />
    </>
  );
};

export const Abstract3: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tPic = cue("abstract is a picture");
  const tIdea = cue("an idea is abstract");
  const tThree = cue("three ideas");
  const tBody = cue("undivided body");
  const tItems = cue("separate items");
  return (
    <>
      <Tab i={3} />
      <div style={{ position: "absolute", left: SX, top: 150, fontSize: 44, fontWeight: 700, ...fadeUp(f, tPic) }}>
        “Abstract” helps us picture it. <span style={{ color: C.abstract }}>It doesn’t decide every case.</span>
      </div>
      <Layer w={W} h={H}>
        <line x1={960} y1={330} x2={960} y2={940} stroke={C.rule} strokeWidth={4} strokeDasharray="12 12" />
        <G x={480} y={620} s={0.72}><KnowledgeMap show={1} join={1} /></G>
        <g opacity={prog(f, tIdea - 5)}>
          {[0, 1, 2].map((i) => <G key={i} x={1250 + i * 190} y={600} s={pop(f, tIdea + i * 5) * 0.9}><Ideas n={1} /></G>)}
        </g>
      </Layer>
      <Sentence text="[knowledge|n]" at={0} accent={C.abstract} size={52} style={{ position: "absolute", left: 360, top: 330 }} />
      <Sentence text="three [ideas|nc3]" mark="right" at={tThree - 4} chipAt={tThree + 2} accent={C.abstract} size={52} style={{ position: "absolute", left: 1230, top: 330 }} />
      <Tag color={C.abstract} at={tBody} x={480} y={880} size={32} solid>one undivided body</Tag>
      <Tag color={C.abstract} at={tItems} x={1440} y={880} size={32}>separate items</Tag>
      <Sfx at={tThree} name="correct" />
    </>
  );
};

/* ========================================================== 15–17 ACTIVITY / PROCESS */
const ACTIONS = [
  { kind: "type" as const, label: "type" },
  { kind: "plan" as const, label: "plan" },
  { kind: "call" as const, label: "call" },
  { kind: "clean" as const, label: "clean" },
];

export const Activity1: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tErr = cue("she does many works");
  const tWrong = cue("is wrong");
  const at = [cue("type"), cue("plan"), cue("call"), cue("clean")];
  const tWhole = cue("ongoing whole");
  const tWork = cue("but work names");
  const fuse = prog(f, tWork, 30);
  return (
    <>
      <Tab i={4} />
      <Sentence text="She does many [works|x] every day." mark="wrong" at={tErr} hlAt={tWrong} accent={C.activity} style={{ position: "absolute", left: SX, top: 150 }} />
      <Note at={tErr + 10} x={SX} y={250} w={1200} align="left" size={30} italic>…when I mean her daily effort</Note>
      <Layer w={W} h={H}>
        {/* timeline bar that the cards merge into */}
        <rect x={360} y={590} width={1200 * fuse} height={90} rx={45} fill={tint(C.activity, 0.85)} />
        {ACTIONS.map((a, i) => {
          const x = lerp(510 + i * 300, 460 + i * 330, fuse);
          const y = lerp(560, 635, fuse);
          const s = pop(f, at[i]) * lerp(1, 0.38, fuse);
          return <G key={a.kind} x={x} y={y} s={s}><TaskCard kind={a.kind} label={a.label} /></G>;
        })}
        <G x={960} y={820} s={0.9}><g opacity={prog(f, tWhole)}><ProcessLoop fuse={prog(f, tWhole, 25)} /></g></G>
      </Layer>
      <Tag color={C.activity} at={tWork + 20} x={960} y={500} size={36} solid>WORK · activity</Tag>
      <Note at={at[3] + 10} x={1600} y={340} w={450} size={30} italic>{fuse < 0.5 ? "several actions…" : ""}</Note>
      <Sfx at={tErr} name="wrong" />
      {at.map((a, i) => <Sfx key={i} at={a} name="tick" />)}
      <Sfx at={tWork} name="whoosh" />
    </>
  );
};

export const Activity2: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tFix = cue("she does a lot");
  const tCount = cue("to count the actions");
  const tTasks = cue("four tasks");
  const tDesc = cue("describe the work");
  const split = prog(f, tCount, 25);
  return (
    <>
      <Tab i={4} />
      <Sentence text="She does [a lot of|g] [work|n] every day." mark="right" at={tFix} accent={C.activity} style={{ position: "absolute", left: SX, top: 150 }} />
      <Sentence text="She completes four [tasks|nc4] every day." mark="right" at={tTasks - 8} chipAt={tTasks} accent={C.activity} style={{ position: "absolute", left: SX, top: 300 }} />
      <Layer w={W} h={H}>
        <rect x={360} y={560} width={1200} height={90} rx={45} fill={tint(C.activity, 0.85)} opacity={1 - split} />
        {ACTIONS.map((a, i) => {
          const s = lerp(0.38, 1, split);
          return (
            <g key={a.kind}>
              <G x={lerp(460 + i * 330, 510 + i * 300, split)} y={lerp(605, 640, split)} s={s} o={split}><TaskCard kind={a.kind} label={`task ${i + 1}`} /></G>
              <g transform={`translate(${510 + i * 300} 520) scale(${pop(f, tTasks + 6 + i * 4)})`}>
                <circle r={28} fill={C.activity} />
                <text y={10} textAnchor="middle" fontSize={30} fontWeight={800} fill="#fff" fontFamily={FONT}>{i + 1}</text>
              </g>
            </g>
          );
        })}
      </Layer>
      <div style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center", gap: 80, fontSize: 36, fontWeight: 700, ...fadeUp(f, tDesc) }}>
        <div style={{ background: C.card, border: `4px solid ${C.activity}`, borderRadius: 18, padding: "14px 28px" }}>a lot of <span style={{ color: C.activity }}>work</span> = amount of activity</div>
        <div style={{ background: C.card, border: `4px solid ${C.rule}`, borderRadius: 18, padding: "14px 28px" }}>four <span style={{ color: C.activity }}>tasks</span> = separate items</div>
      </div>
      <Sfx at={tFix} name="correct" />
      <Sfx at={tCount} name="whoosh" />
      <Sfx at={tTasks} name="pop" />
    </>
  );
};

export const Activity3: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tThree = cue("three works of art");
  const tGal = cue("in a gallery");
  const tMean = cue("the meaning has changed");
  return (
    <>
      <Tab i={4} />
      <Sentence text="three [works|nc3] of art" mark="right" at={tThree} chipAt={tThree + 8} accent={C.activity} style={{ position: "absolute", left: SX, top: 200 }} size={58} />
      <Layer w={W} h={H}>
        <rect x={200} y={360} width={1520} height={480} rx={10} fill={tint(C.paperDeep, 0.9)} opacity={prog(f, tGal - 10)} />
        <rect x={200} y={820} width={1520} height={20} fill="#B9A988" opacity={prog(f, tGal - 10)} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <G x={560 + i * 400} y={580} s={pop(f, tGal + i * 5) * 1.35}><Painting v={i} /></G>
            <g transform={`translate(${560 + i * 400} 440) scale(${pop(f, tGal + 12 + i * 5)})`}>
              <circle r={30} fill={C.activity} />
              <text y={11} textAnchor="middle" fontSize={32} fontWeight={800} fill="#fff" fontFamily={FONT}>{i + 1}</text>
            </g>
          </g>
        ))}
      </Layer>
      <Tag color={C.activity} at={tGal + 20} x={960} y={900} size={36} solid>WORKS = created pieces</Tag>
      <Note at={tMean} x={960} y={970} w={1400} size={34} color={C.ink}><b>The meaning has changed.</b></Note>
      <Sfx at={tThree} name="correct" />
    </>
  );
};

/* ========================================================== 18 QUIZ */
const QuizCard: React.FC<{
  n: number; prompt: string; answer: string; color: string; showAt: number; answerAt: number; picture: React.ReactNode; hideAt?: number;
}> = ({ n, prompt, answer, color, showAt, answerAt, picture, hideAt }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < showAt || (hideAt !== undefined && f >= hideAt)) return null;
  const think = prog(f, showAt + 6, answerAt - showAt - 6);
  const revealed = f >= answerAt;
  return (
    <>
      <div style={{ position: "absolute", left: SX, top: 140, fontFamily: MONO, fontWeight: 600, fontSize: 30, color: C.inkSoft, ...fadeUp(f, showAt) }}>
        QUESTION {n} / 3
      </div>
      <div style={{ position: "absolute", left: SX, top: 210, fontSize: 64, fontWeight: 700, ...fadeUp(f, showAt) }}>
        {prompt.split("___")[0]}
        <span style={{ display: "inline-block", minWidth: 150, textAlign: "center", borderBottom: `6px solid ${revealed ? C.correct : C.ink}`, color: C.correct }}>
          {revealed ? answer : ""}
        </span>
        {prompt.split("___")[1]}
      </div>
      {!revealed && (
        <svg width={120} height={120} style={{ position: "absolute", left: 1640, top: 170 }} viewBox="-60 -60 120 120">
          <circle r={46} fill="none" stroke={C.rule} strokeWidth={10} />
          <circle r={46} fill="none" stroke={color} strokeWidth={10} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - think} transform="rotate(-90)" />
          <text y={14} textAnchor="middle" fontSize={40} fontWeight={800} fill={C.ink} fontFamily={FONT}>?</text>
        </svg>
      )}
      <div style={{ position: "absolute", left: 0, top: 360, width: W, height: 620, opacity: prog(f, showAt + 4) }}>{picture}</div>
      {revealed && <Sfx at={answerAt} name="correct" />}
      {fps < 0 && null}
    </>
  );
};

export const Quiz: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const pop = usePop();
  const tTry = cue("now try");
  const q1 = cue("the luggage is heavy");
  const q1b = cue("several bags");
  const q2 = cue("i need much");
  const q2b = cue("the food as");
  const q3 = cue("her advice is");
  const q3b = cue("advice as information");
  const tEach = cue("each time");
  const gap = Math.round(1.6 * 30);
  const lugGather = prog(f, q1b, 20);
  return (
    <>
      <CaseTab title="YOUR TURN" color={C.ink} />
      <QuizCard n={1} prompt="The luggage ___ heavy." answer="is" color={C.unit} showAt={q1 - gap - 10} answerAt={q1 + 8} hideAt={q2 - gap - 10}
        picture={
          <svg width={W} height={620} viewBox={`0 0 ${W} 620`}>
            <DrawRect x={600} y={140} w={720} h={330} p={lugGather} color={C.unit} sw={7} />
            {[<Suitcase c={C.unit} />, <Holdall c={C.unit} />, <Backpack c={C.unit} />].map((el, i) => (
              <G key={i} x={960 + (i - 1) * lerp(300, 210, lugGather)} y={310}>{el}</G>
            ))}
            <text x={960} y={540} textAnchor="middle" fontSize={34} fontWeight={700} fill={C.unit} fontFamily={FONT} opacity={lugGather}>several bags, one overall label</text>
          </svg>
        } />
      <QuizCard n={2} prompt="I need ___ more rice." answer="much" color={C.measured} showAt={q2 - gap - 10} answerAt={q2 + 12} hideAt={q3 - gap - 10}
        picture={
          <svg width={W} height={620} viewBox={`0 0 ${W} 620`}>
            <G x={800} y={300} s={1.3}><Bowl fill={0.3 + 0.7 * prog(f, q2b, 30)} marks /></G>
            <text x={1250} y={300} fontSize={40} fontWeight={800} fill={C.measured} fontFamily={FONT} opacity={prog(f, q2b)}>the food as an amount</text>
          </svg>
        } />
      <QuizCard n={3} prompt="Her advice ___ useful." answer="is" color={C.abstract} showAt={q3 - gap - 10} answerAt={q3 + 8} hideAt={tEach}
        picture={
          <svg width={W} height={620} viewBox={`0 0 ${W} 620`}>
            <g opacity={prog(f, q3b)}>
              <ellipse cx={960} cy={300} rx={420} ry={200} fill={tint(C.abstract, 0.07)} stroke={C.abstract} strokeWidth={5} />
              {["save first", "read the contract", "ask for help"].map((t, i) => (
                <text key={t} x={960} y={220 + i * 80} textAnchor="middle" fontSize={36} fontWeight={600} fill={C.ink} fontFamily={FONT}>“{t}”</text>
              ))}
            </g>
            <text x={960} y={560} textAnchor="middle" fontSize={34} fontWeight={700} fill={C.abstract} fontFamily={FONT} opacity={prog(f, q3b + 10)}>advice as information, not separate suggestions</text>
          </svg>
        } />
      {f < q1 - gap - 10 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 440, textAlign: "center", fontSize: 72, fontWeight: 800, ...fadeUp(f, tTry) }}>
          Your turn: three new sentences
        </div>
      )}
      {f >= tEach && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center" }}>
          {["The luggage [is] heavy.", "I need [much] more rice.", "Her advice [is] useful."].map((s, i) => (
            <div key={s} style={{ fontSize: 54, fontWeight: 700, margin: "18px 0", transform: `scale(${pop(f, tEach + i * 6)})` }}>
              <span style={{ color: C.correct }}>✓ </span>
              {s.split(/\[|\]/).map((p, k) => <span key={k} style={k === 1 ? { color: C.correct, fontWeight: 800 } : {}}>{p}</span>)}
            </div>
          ))}
          <div style={{ fontSize: 36, color: C.inkSoft, marginTop: 40, fontStyle: "italic", ...fadeUp(f, cue("picture what")) }}>
            Picture what the noun is naming, then choose the grammar.
          </div>
        </div>
      )}
      <Sfx at={tTry} name="tick" />
    </>
  );
};

/* ========================================================== 19 RECAP */
export const Recap: React.FC = () => {
  const f = useCurrentFrame();
  const cue = useCue();
  const at = [cue("collection"), cue("material"), cue("measured amount"), cue("body of knowledge"), cue("process")];
  const steps = [cue("see the meaning first"), cue("ask what you can count"), cue("that is how")];
  const end = prog(f, steps[0] - 10, 20);
  return (
    <>
      <CaseTab title="CASE CLOSED" color={C.ink} />
      {SECTIONS.map((s, i) => {
        const p = prog(f, at[i], 14);
        return (
          <div key={s.key} style={{
            position: "absolute", left: 130 + i * 340, top: lerp(250, 150, end), width: 300, height: lerp(420, 300, end), borderRadius: 24,
            background: C.card, border: `5px solid ${C[s.key]}`, opacity: p, transform: `scale(${lerp(0.9, 1, p)})`, overflow: "hidden",
          }}>
            <svg width={290} height={lerp(260, 190, end)} viewBox="-145 -130 290 260" style={{ display: "block", margin: "10px auto 0" }}>
              <MiniPicture k={s.key} p={prog(f, at[i] + 4, 30)} />
            </svg>
            <div style={{ textAlign: "center", fontWeight: 800, fontSize: 28, color: C[s.key] }}>{s.picture}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
        {["SEE THE MEANING", "SEE WHAT IS COUNTED", "CHOOSE THE GRAMMAR"].map((t, i) => (
          <React.Fragment key={t}>
            {i > 0 && <div style={{ fontSize: 60, fontWeight: 800, color: C.inkSoft, opacity: prog(f, steps[i]) }}>→</div>}
            <div style={{
              fontFamily: MONO, fontWeight: 600, fontSize: 40, padding: "22px 30px", borderRadius: 18,
              background: i === 2 ? C.correct : C.card, color: i === 2 ? "#fff" : C.ink, border: `4px solid ${i === 2 ? C.correct : C.ink}`,
              ...fadeUp(f, steps[i]),
            }}>{t}</div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 820, textAlign: "center", fontSize: 40, fontWeight: 700, color: C.ink, ...fadeUp(f, steps[2] + 20) }}>
        Grammar Detective · <span style={{ color: C.inkSoft, fontWeight: 500 }}>uncountable nouns</span>
      </div>
      {at.map((a, i) => <Sfx key={i} at={a} name="tick" />)}
      <Sfx at={steps[2]} name="correct" />
    </>
  );
};

export const MAIN_SCENES: Record<string, React.FC> = {
  Hook, Overview, Unit1, Unit2, Unit3, Material1, Material2, Material3, Measured1, Measured2, Measured3,
  Abstract1, Abstract2, Abstract3, Activity1, Activity2, Activity3, Quiz, Recap,
};
