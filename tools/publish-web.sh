#!/usr/bin/env bash
# Builds the standalone web version and publishes it to the gh-pages branch
# (served at https://ayezafatimaxyz1-rgb.github.io/Grammar-Tutor/).
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
node "$root/tools/build-web.mjs"
work="$(mktemp -d)"
trap 'git -C "$root" worktree remove --force "$work" >/dev/null 2>&1 || true' EXIT
git -C "$root" fetch -q origin gh-pages
git -C "$root" worktree add -q --detach "$work" origin/gh-pages
cp -R "$root/docs/." "$work/"
cp "$root/tools/fetch-news.mjs" "$work/fetch-news.mjs" # the news robot runs from gh-pages (workflow on main)
touch "$work/.nojekyll"
cd "$work"
git add -A
if git diff --cached --quiet; then echo "Web version already up to date."; exit 0; fi
git commit -qm "Publish web version from $(git -C "$root" rev-parse --short HEAD)"
git push -q origin HEAD:gh-pages
echo "Published."
