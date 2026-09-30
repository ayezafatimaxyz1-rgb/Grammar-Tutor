import '../ig/fonts';
import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Img, Loop, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {geoConicConformal, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import type {FeatureCollection, Geometry} from 'geojson';
import world50 from 'world-atlas/countries-50m.json';
import {Paper} from '../components/Backdrop';
import {ease, progress} from '../components/motion';
import {C, FE} from '../ig/theme';
import page from './p04.json';
import timing from './p04.timing.json';

const FPS = 30;
type Rect = number[];
type PLine = {text: string; cam: Rect; hl: Rect[]; hlAt?: number[]; part: string};
type TLine = {start: number; end: number; words: {w: string; start: number; end: number}[]};
const LINES = page.lines as PLine[];
const T = timing.lines as TLine[];
export const NOTES_FRAMES = Math.round(timing.duration * FPS);
const IMG_W = 3823, IMG_H = 2134, K = IMG_W / page.displayWidth;
const fr = (s: number) => Math.round(s * FPS);
const PART_LABEL: Record<string, string> = {heading: 'HEADING', subtitle: 'SUBTITLE', venn: 'DIAGRAM', box: 'NOTE', map: 'MAP', gold: 'MAKKAH MODEL'};

const Sfx: React.FC<{name: string; at: number; volume?: number}> = ({name, at, volume = 0.5}) => (
  <Sequence from={Math.max(0, at)} durationInFrames={FPS * 3} layout="none"><Audio src={staticFile(`ig/sfx/${name}.wav`)} volume={volume} /></Sequence>
);

const currentIndex = (t: number) => {
  let i = -1;
  T.forEach((l, k) => { if (t >= l.start - 0.35) i = k; });
  return i;
};

/** The sentence being read, full, with the spoken word lit in gold. */
const Reading: React.FC<{top: number; dark?: boolean}> = ({top, dark}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const i = currentIndex(t);
  if (i < 0) return null;
  const l = T[i];
  const o = progress(f, fr(l.start) - 8, 8);
  return (
    <div style={{position: 'absolute', top, left: 70, width: 940, opacity: o, transform: `translateY(${(1 - o) * 16}px)`}}>
      <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 26, letterSpacing: 6, color: C.gold, marginBottom: 14}}>{PART_LABEL[LINES[i].part]}</div>
      <div style={{fontFamily: FE.display, fontWeight: 700, fontSize: 62, lineHeight: 1.14, color: dark ? '#FFF8EA' : C.ink}}>
        {l.words.map((w, k) => (
          <span key={k} style={{color: t >= w.start ? (dark ? '#FFF8EA' : C.ink) : 'rgba(43,33,24,0.28)', ...(t >= w.start && t < w.end + 0.05 ? {color: C.sepia} : {})}}>
            {w.w}{k < l.words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
};

const Top: React.FC<{label: string}> = ({label}) => {
  const f = useCurrentFrame();
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: 'rgba(43,33,24,0.2)'}}>
        <div style={{height: '100%', width: `${(f / NOTES_FRAMES) * 100}%`, background: C.gold}} />
      </div>
      <div style={{position: 'absolute', top: 70, left: 70, right: 70, display: 'flex', justifyContent: 'space-between', fontFamily: FE.sans, fontWeight: 800, fontSize: 26, letterSpacing: 4}}>
        <span style={{color: C.ink}}>QURAN AND GLOBAL ECONOMY · <span style={{color: C.gold}}>EPI 3</span></span>
        <span style={{color: C.sepia}}>{label}</span>
      </div>
    </>
  );
};

// ================================================================== SAMPLE 1: the note page itself, animated
const VIEW = {cx: 540, cy: 700, w: 1000, h: 980};
const fit = (r: Rect) => {
  const [x0, y0, x1, y1] = r.map((v) => v * K);
  const s = Math.min(VIEW.w / (x1 - x0), VIEW.h / (y1 - y0));
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  // keep the page covering the visible window (x 0..1080, y 150..1260) so no empty background shows
  const tx = IMG_W * s >= 1080 ? clamp(VIEW.cx - ((x0 + x1) / 2) * s, 1080 - IMG_W * s, 0) : VIEW.cx - ((x0 + x1) / 2) * s;
  const ty = IMG_H * s >= 1110 ? clamp(VIEW.cy - ((y0 + y1) / 2) * s, 1260 - IMG_H * s, 150) : VIEW.cy - ((y0 + y1) / 2) * s;
  return {s, tx, ty};
};
const FULL = (() => { const s = 1000 / IMG_W; return {s, tx: 40, ty: VIEW.cy - (IMG_H * s) / 2}; })();

export const NotesAnimated: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const i = currentIndex(t);
  // camera keyframes: full page → each line's region → full page at the end
  const keys: {at: number; cam: {s: number; tx: number; ty: number}}[] = [{at: 0, cam: FULL}];
  LINES.forEach((l, k) => keys.push({at: fr(T[k].start) - 12, cam: fit(l.cam)}));
  keys.push({at: fr(T[T.length - 1].end) + 10, cam: FULL});
  let a = keys[0], b = keys[0];
  for (let k = 0; k < keys.length; k++) if (f >= keys[k].at) { a = keys[k]; b = keys[Math.min(k + 1, keys.length - 1)]; }
  const moveDur = 18;
  const p = ease(Math.min(1, Math.max(0, (f - (b.at - moveDur)) / moveDur)));
  const cam = b === a ? a.cam : {s: interpolate(p, [0, 1], [a.cam.s, b.cam.s]), tx: interpolate(p, [0, 1], [a.cam.tx, b.cam.tx]), ty: interpolate(p, [0, 1], [a.cam.ty, b.cam.ty])};
  const settled = i >= 0 && f >= fr(T[i].start) - 4 && f < fr(T[T.length - 1].end) + 10;
  const l = i >= 0 ? LINES[i] : null;
  const hls = l ? l.hl.map((r, k) => ({r, at: fr(T[i].start + (l.hlAt?.[k] ?? 0) * (T[i].end - T[i].start))})).filter((h) => f >= h.at - 2) : [];
  const toScreen = (r: Rect) => [r[0] * K * cam.s + cam.tx, r[1] * K * cam.s + cam.ty, r[2] * K * cam.s + cam.tx, r[3] * K * cam.s + cam.ty];
  const last = hls[hls.length - 1];
  const dim = settled && last ? progress(f, last.at, 10) * 0.45 : 0;
  const [hx0, hy0, hx1, hy1] = last ? toScreen(last.r) : [0, 0, 0, 0];
  return (
    <AbsoluteFill>
      <Paper />
      <div style={{position: 'absolute', left: 0, top: 150, width: 1080, height: 1110, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: -150, width: 1080, height: 1920}}>
          <Img src={staticFile(page.image)} style={{position: 'absolute', left: 0, top: 0, width: IMG_W, height: IMG_H, transformOrigin: '0 0',
            transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.s})`, boxShadow: '0 30px 80px rgba(43,33,24,0.35)'}} />
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <defs><mask id="hole"><rect width={1080} height={1920} fill="white" /><rect x={hx0 - 10} y={hy0 - 8} width={hx1 - hx0 + 20} height={hy1 - hy0 + 16} rx={14} fill="black" /></mask></defs>
            <rect width={1080} height={1920} fill={`rgba(43,33,24,${dim})`} mask="url(#hole)" />
            {settled && hls.map((h, k) => {
              const [x0, y0, x1, y1] = toScreen(h.r);
              const q = progress(f, h.at, 10);
              const per = 2 * (x1 - x0 + y1 - y0 + 36);
              return <rect key={k} x={x0 - 10} y={y0 - 8} width={x1 - x0 + 20} height={y1 - y0 + 16} rx={14} fill="none" stroke={C.goldBright} strokeWidth={6}
                strokeDasharray={per} strokeDashoffset={per * (1 - q)} opacity={k === hls.length - 1 ? 1 : 0.5} />;
            })}
          </svg>
        </div>
      </div>
      <div style={{position: 'absolute', top: 1262, left: 70, right: 70, height: 3, background: C.gold, opacity: 0.6}} />
      <Reading top={1300} />
      <Top label="NOTES · PAGE 4" />
      <Audio src={staticFile('notes/p04/voice.wav')} />
      <Loop durationInFrames={28 * FPS}><Audio src={staticFile('ig/sfx/ambience.wav')} volume={0.12} /></Loop>
      <Sfx name="paper" at={2} volume={0.5} />
      {LINES.map((ln, k) => (k === 0 || ln.part !== LINES[k - 1].part ? <Sfx key={k} name="swish" at={fr(T[k].start) - 26} volume={0.4} /> : null))}
      {LINES.map((ln, k) => (ln.hlAt ?? [0]).map((h, j) => <Sfx key={`${k}-${j}`} name="tick" at={fr(T[k].start + h * (T[k].end - T[k].start))} volume={0.5} />))}
      <Sfx name="whoosh" at={fr(T[T.length - 1].end) - 8} volume={0.4} />
    </AbsoluteFill>
  );
};

// ================================================================== SAMPLE 2: the page rebuilt, same wording and order
const land = feature(world50 as any, (world50 as any).objects.countries) as unknown as FeatureCollection<Geometry>;

const rise = (f: number, at: number, d = 24) => { const p = progress(f, at, 14); return {opacity: p, transform: `translateY(${(1 - p) * d}px)`}; };

const Card: React.FC<{children: React.ReactNode; gold?: boolean; top: number}> = ({children, gold, top}) => (
  <div style={{position: 'absolute', top, left: 70, right: 70, padding: '40px 44px', borderRadius: 22,
    background: gold ? 'rgba(212,166,74,0.22)' : 'rgba(255,250,236,0.85)', border: `3px solid ${gold ? C.gold : 'rgba(184,137,45,0.5)'}`,
    boxShadow: '0 20px 50px rgba(43,33,24,0.18)'}}>{children}</div>
);

const RebuiltMap: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const {paths, P} = useMemo(() => {
    const proj = geoConicConformal().parallels([15, 40]).rotate([-33, 0]);
    proj.fitExtent([[80, 330], [1000, 1150]], {type: 'MultiPoint', coordinates: [[18, 6], [60, 6], [18, 44], [60, 44]]} as any);
    const gp = geoPath(proj);
    return {paths: land.features.map((ft) => gp(ft) ?? ''), P: (ll: [number, number]) => proj(ll) as [number, number]};
  }, []);
  const o = P([39.83, 21.42]);
  const dests: {n: string; ll: [number, number]; dy: number}[] = [
    {n: 'EUROPE', ll: [23.7, 37.9], dy: -26}, {n: 'SHAM', ll: [36.3, 33.5], dy: -26}, {n: 'SHAM', ll: [52, 35], dy: -26},
    {n: 'YEMEN', ll: [44.2, 15.35], dy: 50}, {n: 'AFRICA', ll: [29, 13], dy: 50}, {n: 'AFRICA', ll: [36, 10], dy: 50}];
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs><clipPath id="mapclip"><rect x={70} y={320} width={940} height={840} rx={18} /></clipPath></defs>
      <rect x={70} y={320} width={940} height={840} rx={18} fill="rgba(255,250,236,0.6)" />
      <g clipPath="url(#mapclip)">{paths.map((d, i) => <path key={i} d={d} fill="rgba(184,137,45,0.10)" stroke="rgba(43,33,24,0.45)" strokeWidth={1.1} />)}</g>
      <rect x={70} y={320} width={940} height={840} rx={18} fill="none" stroke={C.gold} strokeWidth={3} />
      {dests.map((d, i) => {
        const e = P(d.ll), c = [(o[0] + e[0]) / 2 - (e[1] - o[1]) * 0.15, (o[1] + e[1]) / 2 + (e[0] - o[0]) * 0.15];
        const t = progress(f, at + 20 + i * 8, 22);
        return (
          <g key={i}>
            <path d={`M ${o[0]} ${o[1]} Q ${c[0]} ${c[1]} ${e[0]} ${e[1]}`} fill="none" stroke={C.sepia} strokeWidth={5} strokeLinecap="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - t)} />
            <circle cx={e[0]} cy={e[1]} r={10} fill={C.gold} opacity={t} />
            <text x={e[0]} y={e[1] + d.dy} textAnchor="middle" fontFamily="DM Sans" fontWeight={800} fontSize={32} letterSpacing={2} fill={C.ink} opacity={t}>{d.n}</text>
          </g>
        );
      })}
      <circle cx={o[0]} cy={o[1]} r={24 + 6 * Math.sin(f / 5)} fill="none" stroke={C.gold} strokeWidth={4} />
      <circle cx={o[0]} cy={o[1]} r={13} fill={C.sepia} />
      <text x={o[0] + 120} y={o[1] + 12} textAnchor="middle" fontFamily="DM Sans" fontWeight={800} fontSize={40} letterSpacing={3} fill={C.sepia}>MAKKAH</text>
    </svg>
  );
};

export const NotesRebuilt: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const i = currentIndex(t);
  const at = (k: number, frac = 0) => fr(T[k].start + frac * (T[k].end - T[k].start));
  const part = i >= 0 ? LINES[i].part : 'heading';
  const on = (p: string) => part === p || (p === 'heading' && part === 'subtitle');
  const lineOn = (k: number) => i === k;
  const boxLines = [3, 4, 5, 6, 7];
  const boxText = ['Ibrahim (AS) asked for two things in a barren valley:', '1. Make this city a city of peace (national security)', '2. Provide its people with the sustenance of fruits (economic prosperity)',
    'Security without an economy: the system cannot stand.', 'An economy without security: investments and assets are not safe.'];
  const Venn = () => {
    const r = 240, cy = 720, gap = interpolate(progress(f, at(2), 22), [0, 1], [240, 120]);
    const labels = [{t: 'PEACE', x: 540 - gap - 100, a: at(2, 0)}, {t: 'PROSPERITY', x: 540 + gap + 100, a: at(2, 0.18)}];
    const mid = progress(f, at(2, 0.55), 12);
    return (
      <>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <circle cx={540 - gap} cy={cy} r={r} fill="rgba(43,33,24,0.10)" stroke={C.ink} strokeWidth={4} opacity={progress(f, at(2), 12)} />
          <circle cx={540 + gap} cy={cy} r={r} fill="rgba(184,137,45,0.16)" stroke={C.gold} strokeWidth={4} opacity={progress(f, at(2, 0.18), 12)} />
        </svg>
        {labels.map((l) => <div key={l.t} style={{position: 'absolute', top: cy - 30, left: l.x - 160, width: 320, textAlign: 'center', fontFamily: FE.sans, fontWeight: 800, fontSize: 40, letterSpacing: 3, color: C.ink, ...rise(f, l.a)}}>{l.t}</div>)}
        <div style={{position: 'absolute', top: cy - 50, left: 390, width: 300, textAlign: 'center', fontFamily: FE.display, fontWeight: 700, fontSize: 44, lineHeight: 1.05, color: C.sepia, opacity: mid, transform: `scale(${interpolate(mid, [0, 1], [1.3, 1])})`}}>Survival<br />of the State</div>
      </>
    );
  };
  const scene = (p: string, node: React.ReactNode) => {
    const o = on(p) ? 1 : 0;
    return <AbsoluteFill style={{opacity: o}}>{node}</AbsoluteFill>;
  };
  return (
    <AbsoluteFill>
      <Paper />
      {scene('heading', (
        <>
          <div style={{position: 'absolute', top: 420, left: 80, right: 80, textAlign: 'center', fontFamily: FE.display, fontWeight: 700, fontSize: 96, lineHeight: 1.04, color: C.ink, ...rise(f, at(0) - 6)}}>
            The Mutual Link Between National Security and Economic Prosperity
          </div>
          <svg width={1080} height={40} style={{position: 'absolute', top: 870, opacity: progress(f, at(0, 0.8), 12)}}>
            <line x1={300} y1={20} x2={500} y2={20} stroke={C.gold} strokeWidth={3} /><path d="M 540 6 L 546 16 L 556 20 L 546 24 L 540 34 L 534 24 L 524 20 L 534 16 Z" fill={C.gold} /><line x1={580} y1={20} x2={780} y2={20} stroke={C.gold} strokeWidth={3} />
          </svg>
          <div style={{position: 'absolute', top: 940, left: 100, right: 100, textAlign: 'center', fontFamily: FE.display, fontStyle: 'italic', fontWeight: 600, fontSize: 56, lineHeight: 1.15, color: C.sepia, ...rise(f, at(1) - 6)}}>
            The prayer of Ibrahim (AS), and Makkah becoming a global centre of trade
          </div>
        </>
      ))}
      {scene('venn', <Venn />)}
      {scene('box', (
        <Card top={330}>
          {boxText.map((txt, k) => (
            <div key={k} style={{fontFamily: FE.display, fontWeight: k === 0 ? 700 : 600, fontSize: 50, lineHeight: 1.18, marginTop: k === 3 ? 34 : k ? 16 : 0, padding: '6px 14px', borderRadius: 10,
              color: C.ink, background: lineOn(boxLines[k]) ? 'rgba(212,166,74,0.35)' : 'transparent', ...rise(f, at(boxLines[k]) - 6, 16)}}>
              {txt}
            </div>
          ))}
        </Card>
      ))}
      {scene('map', <RebuiltMap at={at(8) - 20} />)}
      {scene('gold', (
        <Card top={420} gold>
          <div style={{fontFamily: FE.display, fontWeight: 700, fontSize: 58, lineHeight: 1.18, color: C.ink, padding: '6px 10px', borderRadius: 10, background: lineOn(9) ? 'rgba(255,250,236,0.6)' : 'transparent', ...rise(f, at(9) - 6)}}>
            The economic model of Makkah: it became a global trade pipeline and a highway rest stop.
          </div>
          <div style={{marginTop: 26, fontFamily: FE.display, fontWeight: 700, fontSize: 58, lineHeight: 1.18, color: C.sepia, padding: '6px 10px', borderRadius: 10, background: lineOn(10) ? 'rgba(255,250,236,0.6)' : 'transparent', ...rise(f, at(10) - 6)}}>
            The Qur'an formally recognised this economic route in Surah Quraysh.
          </div>
        </Card>
      ))}
      <div style={{position: 'absolute', top: 1262, left: 70, right: 70, height: 3, background: C.gold, opacity: 0.6}} />
      <Reading top={1300} />
      <Top label="REBUILT · PAGE 4" />
      <Audio src={staticFile('notes/p04/voice.wav')} />
      <Loop durationInFrames={28 * FPS}><Audio src={staticFile('ig/sfx/ambience.wav')} volume={0.12} /></Loop>
      <Sfx name="chime" at={at(0) - 6} volume={0.35} />
      {LINES.map((ln, k) => (k > 0 && ln.part !== LINES[k - 1].part && !(ln.part === 'subtitle') ? <Sfx key={k} name="whoosh" at={fr(T[k].start) - 10} volume={0.35} /> : null))}
      {[3, 4, 5, 6, 7, 9, 10].map((k) => <Sfx key={k} name="tick" at={at(k)} volume={0.5} />)}
      {[0, 1, 2, 3, 4, 5].map((k) => <Sfx key={`p${k}`} name="ping" at={at(8) + k * 8} volume={0.3} />)}
    </AbsoluteFill>
  );
};
