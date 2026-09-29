# Part 4: QURAN AND GLOBAL ECONOMY, the English Instagram series

**Format:** vertical 1080×1920, 30 fps, each episode under 3 minutes (Instagram Reels limit). English narration, burned-in captions (most Reels are watched muted), Qur'anic text in Arabic with Saheeh International translation.
**Voice:** local Kokoro-82M model (Apache-2.0), narrator blended 70/30 from its `am_michael` and `am_onyx` voices to match the pitch and range of the Zafar reference used in the Urdu pilot. No ElevenLabs.
**Sound:** synthesized effects only (whooshes, soft chime on verse reveals, ticks, strike, map pings, low title hit) and a very quiet wind ambience. No music.
**Style:** same as the pilot: warm paper and gold for Qur'anic concepts, navy and teal for present-day diagrams, the four classification badges on every scene, sources on screen, and on-screen corrections wherever the source notes were wrong.

## Episode map (every inventory point assigned)

| EPI | Title | Source pages | Inventory points |
|---|---|---|---|
| 1 | The Big Misconception | 1–2 | P01.1–P01.5, P02.1–P02.7 |
| 2 | Is the Earth a Prison or a Blessing? | 3 | P03.1–P03.9 |
| 3 | A Prayer in a Barren Valley | 4 | P04.1–P04.10 |
| 4 | Rizq: From Rain to Plate | 5 | P05.1–P05.5 |
| 5 | Thamarah, Fadl and Mata' | 5–6 | P05.6–P05.8, P06.1–P06.7 |
| 6 | The Trader and the Warrior | 7 | P07.1–P07.9 |
| 7 | Roads, Walls, Ships and Hajj | 8 | P08.1–P08.9 |
| 8 | Inside the Consumer's Mind | 9 | P09.1–P09.6 |
| 9 | The Qarun Complex | 10 | P10.1–P10.7 |
| 10 | The Middle Path, and Prayer as a Reset | 11–12 | P11.1–P11.8, P12.1–P12.6 |
| 11 | Fraud, Concentration and Riba | 13–14 | P13.1–P13.5, P14.1–P14.8 |
| 12 | Pharaoh's Playbook and True Charity | 15–16 | P15.1–P15.5, P16.1–P16.5 |
| 13 | Inheritance and Marriage | 17–18 | P17.1–P17.6, P18.1–P18.6 |
| 14 | Wilayah: The Economics of Unity | 19–21 | P19.1–P19.4, P20.1–P20.7, P21.1–P21.4 |

Each episode's script lives in `remotion/src/ig/episodes/epiNN.json` with a `covers` list; `python3 docs/coverage_ig.py` checks the whole series covers all 141 points.

## Production pipeline (per episode)

```bash
cd remotion
python3 scripts/ig/voice.py epi01          # narration → public/ig/epi01/*.wav + timing JSON
npx remotion render QGE-EPI01 out/ig/QGE-EPI01.mp4 --codec=h264 --pixel-format=yuv420p
```

Sound effects are regenerated with `python3 scripts/ig/sfx.py`. Scene templates: `globe`, `title`, `legend`, `split`, `ayah`, `quote`, `correction`, `lens`, `outro` (more are added per episode: maps, flow chains, charts).
