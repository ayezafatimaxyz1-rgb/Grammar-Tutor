import '../ig/fonts';
import React from 'react';
import {AbsoluteFill, Audio, Img, Loop, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Paper} from '../components/Backdrop';
import {ease, progress} from '../components/motion';
import {C, FE} from '../ig/theme';
import timing from './sample.timing.json';

const FPS = 30;
type Line = {text: string; beat: string; start: number; end: number; words: {w: string; start: number; end: number}[]};
const LINES = timing.lines as Line[];
export const SAMPLE_FRAMES = Math.round(timing.duration * FPS);

const fr = (s: number) => Math.round(s * FPS);
const lineOf = (beat: string) => LINES.find((l) => l.beat === beat)!;
// Each beat is on screen from its line's start until the next line starts (last one to the end).
const span = (beat: string) => {
  const i = LINES.findIndex((l) => l.beat === beat);
  return {from: fr(LINES[i].start) - 3, to: i + 1 < LINES.length ? fr(LINES[i + 1].start) - 3 : SAMPLE_FRAMES};
};

const Sfx: React.FC<{name: string; at: number; volume?: number}> = ({name, at, volume = 0.5}) => (
  <Sequence from={Math.max(0, at)} durationInFrames={FPS * 3} layout="none">
    <Audio src={staticFile(`ig/sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

/** Slow camera push on everything inside, so the frame is never still. */
const Push: React.FC<{dur: number; from?: number; to?: number; x?: [number, number]; y?: [number, number]; children: React.ReactNode}> = ({dur, from = 1.04, to = 1.14, x = [0, 0], y = [0, 0], children}) => {
  const f = useCurrentFrame();
  const t = Math.min(1, f / Math.max(1, dur));
  const s = interpolate(t, [0, 1], [from, to]);
  return (
    <AbsoluteFill style={{transform: `scale(${s}) translate(${interpolate(t, [0, 1], x)}px, ${interpolate(t, [0, 1], y)}px)`}}>{children}</AbsoluteFill>
  );
};

/** Illustration with parallax depth: a soft, larger back layer and a sharp front layer moving at different speeds. */
const Plate: React.FC<{src: string; dur: number; pan?: [number, number]; zoom?: [number, number]; focus?: string}> = ({src, dur, pan = [0, 0], zoom = [1.05, 1.18], focus = 'center'}) => {
  const f = useCurrentFrame();
  const t = Math.min(1, f / Math.max(1, dur));
  const s = interpolate(t, [0, 1], zoom);
  const px = interpolate(t, [0, 1], pan);
  const style = (k: number): React.CSSProperties => ({
    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: focus,
    transform: `scale(${1 + (s - 1) * k}) translateX(${px * k}px)`,
  });
  return (
    <AbsoluteFill style={{backgroundColor: C.paper}}>
      <Img src={staticFile(src)} style={{...style(0.6), filter: 'blur(14px) sepia(0.3)', opacity: 0.7}} />
      <Img src={staticFile(src)} style={{...style(1), mixBlendMode: 'multiply'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(43,33,24,0.45) 100%)'}} />
    </AbsoluteFill>
  );
};

/** Big slam text, word by word, for hook / punch / loop beats. */
const Slam: React.FC<{words: {w: string; start: number}[]; gold?: string[]; dark?: boolean; size?: number}> = ({words, gold = [], dark, size = 150}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: dark ? C.ink : 'transparent', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 940, textAlign: 'center', lineHeight: 0.98}}>
        {words.map((w, i) => {
          const p = progress(f, w.start, 6);
          const sc = interpolate(p, [0, 1], [1.6, 1]);
          const isGold = gold.includes(w.w.replace(/[^\w']/g, '').toLowerCase());
          return (
            <span key={i} style={{display: 'inline-block', margin: '0 16px', opacity: p, transform: `scale(${sc})`,
              fontFamily: FE.display, fontWeight: 700, fontSize: size, letterSpacing: -1,
              color: isGold ? C.goldBright : dark ? '#FFF8EA' : C.ink}}>
              {w.w.toUpperCase()}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Centre captions: 1 to 3 words, popping in, keyword in gold. */
const PopCaptions: React.FC<{hide: string[]}> = ({hide}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const line = LINES.find((l) => t >= l.start - 0.03 && t <= l.end + 0.12);
  if (!line || hide.includes(line.beat)) return null;
  const chunks: Line['words'][] = [];
  let cur: Line['words'] = [];
  line.words.forEach((w, i) => {
    cur.push(w);
    if (i === line.words.length - 1 || cur.length >= 3 || (/[,.?!]$/.test(w.w) && cur.length >= 1)) {
      chunks.push(cur);
      cur = [];
    }
  });
  const chunk = chunks.find((c) => t < c[c.length - 1].end + 0.02) ?? chunks[chunks.length - 1];
  const t0 = chunk[0].start * FPS;
  const pop = progress(f, t0 - 1, 5);
  const longest = chunk.reduce((a, w) => (w.w.length > a.w.length ? w : a), chunk[0]);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: 1080, width: 1000, textAlign: 'center', transform: `scale(${interpolate(pop, [0, 1], [0.85, 1])})`, opacity: pop}}>
        {chunk.map((w, i) => (
          <span key={i} style={{display: 'inline-block', margin: '0 12px', fontFamily: FE.sans, fontWeight: 800, fontSize: 96, lineHeight: 1.05,
            color: w === longest ? C.goldBright : '#FFFFFF', WebkitTextStroke: '10px rgba(43,33,24,0.9)', paintOrder: 'stroke fill',
            textShadow: '0 8px 24px rgba(0,0,0,0.35)'}}>
            {w.w.replace(/[,]$/, '').toUpperCase()}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: 'rgba(43,33,24,0.25)'}}>
      <div style={{height: '100%', width: `${(f / SAMPLE_FRAMES) * 100}%`, background: C.goldBright}} />
    </div>
  );
};

const Tag: React.FC<{text: string; at: number; top?: number}> = ({text, at, top = 330}) => {
  const f = useCurrentFrame();
  const p = progress(f, at, 8);
  return (
    <div style={{position: 'absolute', top, width: 1080, display: 'flex', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * -20}px)`}}>
      <div style={{fontFamily: FE.sans, fontWeight: 800, fontSize: 44, letterSpacing: 6, padding: '16px 34px', borderRadius: 14, background: C.ink, color: C.goldBright}}>{text}</div>
    </div>
  );
};

const Stamp: React.FC<{text: string; at: number}> = ({text, at}) => {
  const f = useCurrentFrame();
  const p = progress(f, at, 7);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', top: 470, transform: `rotate(-8deg) scale(${interpolate(p, [0, 1], [2.2, 1])})`, opacity: p,
        fontFamily: FE.sans, fontWeight: 800, fontSize: 110, letterSpacing: 4, color: '#FFF8EA', background: 'rgba(138,90,43,0.92)',
        padding: '10px 40px', border: `6px solid ${C.goldBright}`, borderRadius: 12}}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

const wordsOf = (beat: string, base: number) => lineOf(beat).words.map((w) => ({w: w.w, start: fr(w.start) - base}));

export const StyleSample: React.FC = () => {
  const f = useCurrentFrame();
  const B = (beat: string) => span(beat);
  const seq = (beat: string, node: React.ReactNode) => {
    const {from, to} = B(beat);
    return (
      <Sequence key={beat} from={from} durationInFrames={to - from} name={beat}>
        {node}
      </Sequence>
    );
  };
  const hook = B('hook'), crack = B('crack');
  const shake = (at: number) => {
    const d = f - at;
    return d >= 0 && d < 8 ? Math.sin(d * 2.4) * (8 - d) * 1.6 : 0;
  };
  const kick = shake(hook.from + 2) + shake(B('punch').from + 2) + shake(B('loop').from + fr(1.1));
  return (
    <AbsoluteFill style={{backgroundColor: C.paper, transform: `translate(${kick}px, ${kick * 0.6}px)`}}>
      {seq('hook', <Push dur={hook.to - hook.from} from={1} to={1.06}><Paper /><Slam words={wordsOf('hook', hook.from)} gold={['worship']} /></Push>)}
      {seq('tease', (
        <Push dur={60}><Paper />
          <AbsoluteFill style={{alignItems: 'center'}}>
            <div style={{position: 'absolute', top: 520, fontFamily: FE.display, fontStyle: 'italic', fontWeight: 700, fontSize: 130, lineHeight: 1, color: C.sepia, textAlign: 'center'}}>Sounds<br />strange?</div>
          </AbsoluteFill>
        </Push>
      ))}
      {seq('img0', <Plate src="ig2/sample/img0.png" dur={B('dunya').to - B('img0').from} zoom={[1.02, 1.1]} />)}
      {seq('deen', <><Plate src="ig2/sample/img0.png" dur={60} zoom={[1.35, 1.5]} pan={[160, 200]} /><Tag text="PRAYER · FASTING" at={4} /></>)}
      {seq('dunya', <><Plate src="ig2/sample/img0.png" dur={60} zoom={[1.35, 1.5]} pan={[-160, -200]} /><Tag text="BUSINESS · CAREER" at={4} /></>)}
      {seq('crack', (
        <Push dur={crack.to - crack.from}><Paper />
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <polyline points="540,0 500,300 580,560 510,820 590,1080 520,1340 575,1600 540,1920" fill="none" stroke={C.gold} strokeWidth={10}
              strokeDasharray={2200} strokeDashoffset={2200 * (1 - progress(f - crack.from, 0, 14))} />
          </svg>
          <Stamp text="NEVER SPLIT" at={fr(lineOf('crack').words[3].start) - crack.from} />
        </Push>
      ))}
      {seq('img1', <Plate src="ig2/sample/img1.png" dur={B('img1').to - B('img1').from} zoom={[1.05, 1.16]} pan={[0, -40]} />)}
      {seq('punch', <Push dur={40} from={1} to={1.05}><Slam words={wordsOf('punch', B('punch').from)} gold={['organises']} dark size={170} /></Push>)}
      {seq('img2', (
        <>
          <Plate src="ig2/sample/img2.png" dur={B('img2').to - B('img2').from} zoom={[1.1, 1.22]} pan={[40, -40]} />
          {['EARNING', 'SPENDING', 'TRADING'].map((w, i) => <Tag key={w} text={w} at={fr(lineOf('img2').words[i].start) - B('img2').from} top={300 + i * 120} />)}
        </>
      ))}
      {seq('img3', (
        <>
          <Plate src="ig2/sample/img3.png" dur={B('img3').to - B('img3').from} zoom={[1.02, 1.2]} />
          <Stamp text="NOT ISLAM" at={fr(lineOf('img3').words[7].start) - B('img3').from} />
        </>
      ))}
      {seq('loop', <Push dur={B('loop').to - B('loop').from} from={1.06} to={1}><Paper /><Slam words={wordsOf('loop', B('loop').from).slice(2)} gold={['worship']} /></Push>)}

      <PopCaptions hide={['hook', 'punch', 'loop']} />
      <ProgressBar />
      <div style={{position: 'absolute', top: 60, left: 50, fontFamily: FE.sans, fontWeight: 800, fontSize: 26, letterSpacing: 4, color: C.ink, opacity: 0.75,
        background: 'rgba(243,233,210,0.8)', padding: '6px 14px', borderRadius: 8}}>
        QURAN AND GLOBAL ECONOMY · EPI 1
      </div>

      <Audio src={staticFile('ig2/sample/voice.wav')} />
      <Loop durationInFrames={20 * FPS}><Audio src={staticFile('ig/sfx/pulse.wav')} volume={(fr_) => interpolate(fr_, [0, 20], [0, 0.22], {extrapolateRight: 'clamp'})} /></Loop>
      <Sfx name="impact" at={hook.from + 1} volume={0.7} />
      <Sfx name="riser" at={B('tease').to - 40} volume={0.35} />
      {['img0', 'crack', 'img1', 'img2', 'img3'].map((b) => <Sfx key={b} name="whoosh" at={B(b).from - 4} volume={0.4} />)}
      <Sfx name="swish" at={B('deen').from} volume={0.35} />
      <Sfx name="swish" at={B('dunya').from} volume={0.35} />
      <Sfx name="strike" at={crack.from + 2} volume={0.6} />
      <Sfx name="hit" at={fr(lineOf('crack').words[3].start)} volume={0.5} />
      <Sfx name="impact" at={B('punch').from + 1} volume={0.6} />
      {[0, 1, 2].map((i) => <Sfx key={i} name="pop" at={fr(lineOf('img2').words[i].start)} volume={0.5} />)}
      <Sfx name="hit" at={fr(lineOf('img3').words[7].start)} volume={0.5} />
      <Sfx name="impact" at={fr(lineOf('loop').words[2].start)} volume={0.6} />
    </AbsoluteFill>
  );
};
