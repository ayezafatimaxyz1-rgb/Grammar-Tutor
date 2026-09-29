import {Config} from '@remotion/cli/config';

// Use the preinstalled headless Chromium instead of downloading one.
Config.setBrowserExecutable(process.env.REMOTION_BROWSER ?? '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
// Standard (limited-range) pixel format; the default yuvj420p plays badly in some phone players.
Config.setPixelFormat('yuv420p');
Config.setConcurrency(4);
