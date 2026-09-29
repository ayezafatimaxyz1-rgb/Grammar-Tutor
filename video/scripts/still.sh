#!/bin/sh
# usage: scripts/still.sh <Composition> <frame> <out.png>
exec npx remotion still src/index.ts "$1" "$3" --frame="$2" --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell --log=error
