import React from "react";
import { Composition } from "remotion";
import { CaseVideo, SCENES } from "./Video";
import { Seg, TIMINGS } from "./timing";

const videos = (TIMINGS as unknown as { videos: Record<string, Seg[]> }).videos;
const total = (segs: { frames: number }[]) => segs.reduce((a, s) => a + s.frames, 0);

export const Root: React.FC = () => (
  <>
    {Object.keys(videos).filter((id) => SCENES[id]).map((id) => (
      <Composition key={id} id={`Case0${id.slice(1)}`} component={CaseVideo} width={1080} height={1920} fps={TIMINGS.fps}
        durationInFrames={total(videos[id])} defaultProps={{ id, captions: true }} />
    ))}
  </>
);
