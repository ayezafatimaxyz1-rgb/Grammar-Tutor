import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Captions, Paper } from "./components";
import { MAIN_SCENES } from "./scenes/MainScenes";
import { SHORT_SCENES } from "./scenes/ShortScenes";
import { C } from "./theme";
import { Seg, SegProvider, TIMINGS } from "./timing";
import timings from "./timings.json";

const CAPTIONS = (timings as unknown as { captions: Record<string, { start: number; end: number; text: string }[]> }).captions;

/** Plays a scene's narration, honouring any thinking-pause gaps cut into it. */
const Narration: React.FC<{ seg: Seg }> = ({ seg }) => {
  const { fps } = useVideoConfig();
  const parts = (seg as Seg & { parts?: { from: number; to: number | null; offset: number }[] }).parts ?? [{ from: 0, to: null, offset: 0 }];
  return (
    <>
      {parts.map((p, i) => (
        <Sequence key={i} from={Math.round((seg.lead + p.from + p.offset) * fps)} layout="none">
          <Audio src={staticFile(seg.audio)} trimBefore={Math.round(p.from * fps)} trimAfter={p.to === null ? undefined : Math.round(p.to * fps)} />
        </Sequence>
      ))}
    </>
  );
};

const Track: React.FC<{ track: Seg[]; scenes: Record<string, React.FC>; vertical?: boolean; crossfade?: number }> = ({ track, scenes, vertical, crossfade = 8 }) => (
  <>
    {track.map((seg) => {
      const Scene = scenes[seg.scene];
      if (!Scene) throw new Error(`No scene component for ${seg.scene}`);
      return (
        <Sequence key={seg.id} from={seg.startFrame} durationInFrames={seg.frames} name={`${seg.id} ${seg.scene}`}>
          <SegProvider seg={seg}>
            <Fade frames={seg.frames} crossfade={crossfade}>
              <Paper vertical={vertical}>
                <Scene />
              </Paper>
            </Fade>
            <Narration seg={seg} />
          </SegProvider>
        </Sequence>
      );
    })}
  </>
);

/** Brief fade at scene boundaries so cuts feel soft. */
const Fade: React.FC<{ frames: number; crossfade: number; children: React.ReactNode }> = ({ frames, crossfade, children }) => {
  const f = useCurrentFrame();
  const o = Math.min(1, f / crossfade, (frames - f) / (crossfade / 2));
  return <AbsoluteFill style={{ opacity: Math.max(0, o) }}>{children}</AbsoluteFill>;
};

export const MainVideo: React.FC<{ captions: boolean }> = ({ captions }) => (
  <AbsoluteFill style={{ backgroundColor: C.paper }}>
    <Track track={TIMINGS.main} scenes={MAIN_SCENES} />
    {captions && <Captions cues={CAPTIONS.main} bottom={40} size={34} width={1500} />}
  </AbsoluteFill>
);

export const ShortVideo: React.FC<{ id: string; captions: boolean }> = ({ id, captions }) => (
  <AbsoluteFill style={{ backgroundColor: C.paper }}>
    <Track track={TIMINGS.shorts[id]} scenes={SHORT_SCENES} vertical />
    {captions && <Captions cues={CAPTIONS[id]} bottom={330} size={44} width={900} />}
  </AbsoluteFill>
);
