# رزق سے ریاست تک: Qur'an and Economy, an Urdu documentary series

Research, scripts and an editable Remotion animation project for an eight-part Urdu explainer series based on `Quranic_Economic_Blueprint.pdf` (21 slides, AI-generated notes from Nouman Ali Khan lectures).

## Contents

| Path | What it is |
|---|---|
| `docs/01-inventory-audit.md` | Page by page inventory of all 21 slides: 141 numbered points (headings, terms, verses, examples, claims), each classified as Qur'anic text / tafsīr / modern application / empirical claim, with the Qur'an audit and 16 corrections. |
| `docs/02-episode-plan.md` | Eight-episode outline, 60 scenes. Every scene has spoken Urdu script, exact on-screen words (Arabic and Urdu), visual action, duration, badges and sources. |
| `docs/03-pilot.md` | The 83.6 s pilot on رزق as built, with its narration and open items. |
| `docs/coverage.py` | `python3 docs/coverage.py` checks that every inventory point is covered by at least one scene. |
| `remotion/` | Editable Remotion 4 project for the pilot. |
| `remotion/out/rizq-pilot-preview.mp4` | Rendered preview (subtitled narration, no voice-over yet). |

## Working on the animation

```bash
cd remotion
npm install
npm run studio                    # live editor at http://localhost:3000
npm run render                    # → out/rizq-pilot.mp4
node scripts/stills.mjs 250 1100  # render chosen frames to out/stills/
python3 scripts/check_glyphs.py   # every on-screen character exists in its font
```

* **Change words, timing or sources:** `src/data/pilot.ts` only. Scene files handle layout and motion.
* **Colours and fonts:** `src/theme.ts`. Qur'anic text: *Scheherazade New*. Urdu: *Noto Nastaliq Urdu*. Numerals: *Amiri*.
* **Voice-over:** put the file at `public/vo/pilot.mp3` and render with
  `npx remotion render RizqPilot out/rizq-pilot.mp4 --props='{"subtitles":false,"voiceover":"vo/pilot.mp3"}'`,
  then retime the `narration` entries in `pilot.ts` to match the recording.
* The config points Remotion at the preinstalled Chromium in this environment; on another machine delete `remotion.config.ts`'s `setBrowserExecutable` line (or set `REMOTION_BROWSER`).

## Arabic and Urdu rendering notes

* The Uthmani text (QuranEnc, via `quran-json`) reuses U+0656/U+0657/U+065E for open tanween, which only the King Fahd fonts understand. `src/components/uthmani.ts` maps them to the standard U+08F0 to U+08F2 at render time; the source strings stay verbatim.
* Amiri Quran (Fontsource build) misplaced diacritics in headless Chromium, so Qur'anic text uses Scheherazade New, which positioned every mark correctly in testing.
* Latin digits inside Urdu (verse numbers such as 80:25–32) are wrapped in Unicode LTR isolates (`src/components/bidi.ts`) so they do not reorder.
* Nastaliq needs generous line height (2.0 to 2.2) to avoid clipping of ascenders and descenders.

## Sources

Qur'an text: Uthmani script, King Fahd Complex via QuranEnc. English: Saheeh International. Urdu: Maududi (*Tafhīm al-Qur'ān*), via Tanzil. Map: Natural Earth 1:50m (`world-atlas`). Tafsīr, hadith and empirical references are listed per point in `docs/01-inventory-audit.md`; items marked 🔍 need checking against printed editions before broadcast.
