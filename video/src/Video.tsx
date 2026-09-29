import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Seg, SegProvider, TIMINGS } from "./timing";
import timings from "./timings.json";
import { CASE01 } from "./v2/Case01";
import { K, Karaoke } from "./v2/kit";

type Cue = { start: number; end: number; text: string; words: { w: string; t: number }[] };
const CAPTIONS = (timings as unknown as { captions: Record<string, Cue[]> }).captions;

export const SCENES: Record<string, Record<string, React.FC>> = { v1: CASE01 };

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

/** Quick fade-in at each scene start; scenes share the same stage so cuts stay smooth. */
const Fade: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: Math.min(1, f / 5) }}>{children}</AbsoluteFill>;
};

export const CaseVideo: React.FC<{ id: string; captions: boolean }> = ({ id, captions }) => {
  const track = (TIMINGS as unknown as { videos: Record<string, Seg[]> }).videos[id];
  const scenes = SCENES[id];
  return (
    <AbsoluteFill style={{ backgroundColor: K.bg2 }}>
      {track.map((seg) => {
        const Scene = scenes[seg.scene];
        if (!Scene) throw new Error(`No scene component for ${seg.scene}`);
        return (
          <Sequence key={seg.id} from={seg.startFrame} durationInFrames={seg.frames} name={`${seg.id} ${seg.scene}`}>
            <SegProvider seg={seg}>
              <Fade><Scene /></Fade>
              <Narration seg={seg} />
            </SegProvider>
          </Sequence>
        );
      })}
      {captions && <Karaoke cues={CAPTIONS[id]} />}
    </AbsoluteFill>
  );
};
