#!/bin/sh
# Publish the app to GitHub Pages at <site>/prepositions/. Run from prepositions-lab/.
# The gh-pages branch also hosts another app, so this only replaces the prepositions/ folder,
# adds one ordinary commit on top, and never force-pushes.
set -e
python3 tools/build-sw.py
git fetch -q origin gh-pages
tmp=$(mktemp -d)
git worktree add -q "$tmp" origin/gh-pages
(cd "$tmp" && git switch -q -c "pages-$$")
rm -rf "$tmp/prepositions"; mkdir -p "$tmp/prepositions"
cp -r index.html manifest.webmanifest sw.js css js content icons "$tmp/prepositions/"
cd "$tmp"
git add -A prepositions
git -c user.name="Prepositions Lab" -c user.email="noreply@anthropic.com" commit -qm "Update Prepositions Lab" || echo "nothing changed"
git push -q origin "pages-$$:gh-pages"
cd - >/dev/null
git worktree remove --force "$tmp"
git branch -q -D "pages-$$" 2>/dev/null || true
