import {Easing, interpolate} from 'remotion';

export const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** 0→1 over [start, start+dur], eased, clamped. */
export const progress = (frame: number, start: number, dur: number) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

/** Fade in at `start`, fade out ending at `end`. */
export const inOut = (frame: number, start: number, end: number, fade = 12) =>
  Math.min(progress(frame, start, fade), 1 - progress(frame, end - fade, fade));
