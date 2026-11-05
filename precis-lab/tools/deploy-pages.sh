#!/bin/sh
# Publish the app to GitHub Pages at <site>/precis/. Run from precis-lab/.
# The gh-pages branch also hosts another app, so this only replaces the precis/ folder,
# adds one ordinary commit on top, and never force-pushes.
set -e
python3 tools/build-sw.py
git fetch -q origin gh-pages
tmp=$(mktemp -d)
git worktree add -q "$tmp" origin/gh-pages
(cd "$tmp" && git switch -q -c "pages-$$")
rm -rf "$tmp/precis"; mkdir -p "$tmp/precis"
cp -r index.html manifest.webmanifest sw.js css js content icons "$tmp/precis/"
cd "$tmp"
git add -A precis
git -c user.name="Precis Lab" -c user.email="noreply@anthropic.com" commit -qm "Update Precis Lab" || echo "nothing changed"
git push -q origin "pages-$$:gh-pages"
cd - >/dev/null
git worktree remove --force "$tmp"
git branch -q -D "pages-$$" 2>/dev/null || true
