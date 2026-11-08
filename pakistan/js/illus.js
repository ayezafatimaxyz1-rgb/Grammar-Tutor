/* Pencil-sketch illustrations for events. Each motif is drawn in a 120 x 90 box.
   ill(key, accent) returns an <svg>. The shared pencil filter gives the hand-drawn edge. */
PAK = window.PAK || {};
(function () {
  const INK = "#2a2520", GREEN = "#01411c";
  const L = (d, o = {}) => `<path d="${d}" fill="${o.f || "none"}" fill-opacity="${o.fo == null ? 1 : o.fo}" stroke="${o.s || INK}" stroke-width="${o.w || 1.8}"${o.dash ? ' stroke-dasharray="4 4"' : ""}/>`;
  const C = (x, y, r, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.f || "none"}" fill-opacity="${o.fo == null ? 1 : o.fo}" stroke="${o.s || INK}" stroke-width="${o.w || 1.8}"/>`;
  const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r || 2}" fill="${o.f || "none"}" fill-opacity="${o.fo == null ? 1 : o.fo}" stroke="${o.s || INK}" stroke-width="${o.w || 1.8}"/>`;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.z || 12}" font-weight="700" text-anchor="${o.a || "middle"}" fill="${o.f || INK}">${s}</text>`;
  const hatch = (x, y, w, h, c) => { let s = ""; for (let i = 0; i < w + h; i += 7) s += `<path d="M${x + Math.max(0, i - h)} ${y + Math.min(i, h)} L${x + Math.min(i, w)} ${y + Math.max(0, i - w)}" stroke="${c}" stroke-width=".9" opacity=".55"/>`; return s; };
  const star = (cx, cy, r, f) => { let p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.42 : r; p.push((cx + rr * Math.cos(a)).toFixed(1) + " " + (cy + rr * Math.sin(a)).toFixed(1)); } return L("M" + p.join(" L") + "Z", { f, w: 1 }); };
  const crescent = (cx, cy, r) => L(`M${cx} ${cy - r} A${r} ${r} 0 1 0 ${cx} ${cy + r} A${r * 0.8} ${r * 0.8} 0 1 1 ${cx} ${cy - r}Z`, { f: "#fff", w: 1 });

  const M = {
    flag: (a) => L("M26 10 V84", { w: 2.6 }) + L("M26 14 Q50 8 72 14 T108 14 V56 Q90 62 72 56 T26 56Z", { f: GREEN, fo: 0.85 }) + L("M26 14 Q32 12 38 14 V56 Q32 58 26 56Z", { f: "#fff" }) + crescent(72, 35, 11) + star(80, 31, 6, "#fff") + C(26, 10, 2.4, { f: INK }),
    map: (a, partition) => L("M32 18 L56 8 L76 16 L70 30 L90 38 L82 52 L92 62 L70 70 L62 84 L48 78 L40 62 L30 52 L36 40 L26 28Z", { f: GREEN, fo: 0.28 }) + hatch(40, 20, 40, 50, GREEN) + (partition ? L("M52 4 Q60 40 46 60 T58 88", { s: "#c92a2a", w: 2.6, dash: true }) : "") + C(62, 46, 2.5, { f: "#c92a2a", s: "#c92a2a" }),
    partition: (a) => M.map(a, true),
    ballot: (a) => R(22, 42, 62, 38, { f: "#e8dcc4", fo: 0.9 }) + L("M34 42 H72", { w: 4 }) + R(36, 50, 34, 10, { f: "#fff", fo: 0.6 }) + L("M60 14 L84 12 L86 40 L62 42Z", { f: "#fff" }) + L("M66 24 L72 31 L82 18", { s: a, w: 3 }) + L("M90 52 L108 52 M90 62 L104 62", { w: 1.4 }) + C(96, 36, 3, { f: a, s: a }),
    gavel: (a) => L("M24 64 L60 28", { w: 5 }) + R(46, 16, 36, 20, { f: a, fo: 0.35, r: 5 }) + L("M78 22 L82 26", { w: 2 }) + R(30, 70, 70, 10, { f: "#e8dcc4", fo: 0.9, r: 3 }) + L("M42 66 H88", { w: 2 }) + C(98, 34, 7, { s: a, w: 1.2, dash: true }),
    scroll: (a) => R(34, 12, 56, 66, { f: "#f4e9cf", fo: 0.95, r: 3 }) + L("M34 14 Q28 14 28 20 Q28 26 34 26 M90 76 Q96 76 96 70 Q96 64 90 64", { w: 1.8 }) + [24, 32, 40, 48].map((y) => L(`M44 ${y} H80`, { w: 1.2, s: "#777" })).join("") + C(70, 62, 8, { f: "#b0292f", s: "#7d1c21" }) + T(70, 66, "★", { z: 9, f: "#fff" }) + L("M44 60 H56", { w: 1.2, s: "#777" }),
    helmet: (a) => L("M26 56 Q26 24 60 22 Q94 24 94 56Z", { f: "#6b7a3e", fo: 0.8 }) + L("M20 56 H100 V64 H20Z", { f: "#556b2f", fo: 0.9 }) + hatch(30, 28, 56, 26, "#2a2520") + star(60, 40, 9, "#e0c15a") + L("M30 64 Q60 80 90 64", { w: 1.6 }),
    tank: (a) => R(22, 46, 76, 18, { f: "#6b7a3e", fo: 0.7, r: 6 }) + R(40, 32, 38, 16, { f: "#6b7a3e", fo: 0.85, r: 4 }) + L("M78 38 H108", { w: 4 }) + L("M18 66 H102 Q106 66 106 72 Q106 78 100 78 H22 Q14 78 14 72 Q14 66 18 66Z", { f: "#444", fo: 0.35 }) + [28, 44, 60, 76, 92].map((x) => C(x, 72, 4.5, { w: 1.3 })).join("") + C(58, 40, 3, { f: INK }),
    plane: (a) => L("M14 48 Q40 36 92 42 Q108 44 106 50 Q104 56 90 56 L24 54Z", { f: "#e9edf2", fo: 0.9 }) + L("M52 46 L36 22 L60 22 L74 44Z", { f: a, fo: 0.35 }) + L("M52 54 L38 76 L62 76 L74 55Z", { f: a, fo: 0.35 }) + L("M18 46 L8 30 L24 30 L30 46", { f: a, fo: 0.35 }) + [66, 74, 82, 90].map((x) => C(x, 48, 1.8, { f: "#9ad", s: INK, w: 1 })).join(""),
    crash: (a) => `<g transform="rotate(24 60 40)">${M.plane(a)}</g>` + L("M20 24 Q10 18 18 12 Q26 8 30 14 Q38 8 42 16 Q48 22 38 26", { f: "#999", fo: 0.55, w: 1.4 }) + L("M74 72 L82 62 L86 74 L96 64 L96 78Z", { f: "#e67700", fo: 0.8, w: 1.4 }),
    treaty: (a) => R(20, 14, 58, 66, { f: "#fff", r: 2 }) + [24, 32, 40, 48, 56].map((y) => L(`M28 ${y} H68`, { w: 1.2, s: "#888" })).join("") + L("M30 70 Q38 62 44 70 T58 68", { s: a, w: 1.6 }) + L("M86 18 L104 74 L98 76 L82 20Z", { f: a, fo: 0.5 }) + L("M104 74 L100 84 L98 76", { f: INK }) + C(60, 66, 6, { f: "#b0292f", s: "#7d1c21", w: 1.2 }),
    globe: (a) => C(60, 46, 32, { f: "#bfe0f2", fo: 0.55 }) + L("M60 14 Q42 46 60 78 M60 14 Q78 46 60 78 M28 46 H92 M33 30 Q60 38 87 30 M33 62 Q60 54 87 62", { w: 1.3 }) + L("M30 38 Q40 30 48 36 Q44 46 36 48Z M66 26 Q82 28 84 40 Q74 46 68 38Z M56 56 Q70 52 76 62 Q66 72 58 66Z", { f: "#5fa86a", fo: 0.7, w: 1 }),
    mountain: (a) => L("M8 78 L38 28 L56 54 L74 20 L112 78Z", { f: "#9aa7b4", fo: 0.55 }) + hatch(28, 30, 60, 46, "#556") + L("M38 28 L30 42 L38 38 L44 44Z M74 20 L64 40 L72 36 L78 42 L86 38Z", { f: "#fff" }) + C(96, 20, 8, { f: "#ffd84a", fo: 0.8 }) + L("M12 80 H108", { w: 1.4 }),
    cloud: (a) => L("M8 80 L34 54 L50 66 L68 44 L112 80Z", { f: "#9aa7b4", fo: 0.5 }) + L("M54 64 Q50 50 56 44 Q44 40 50 30 Q50 14 66 16 Q82 14 80 30 Q90 40 76 44 Q82 50 74 64Z", { f: "#e9edf2", fo: 0.9 }) + L("M56 44 Q66 50 76 44", { w: 1.2 }) + hatch(52, 20, 26, 40, "#999"),
    river: (a) => L("M6 30 Q24 22 44 30 T84 30 T116 28", { s: "#1971c2", w: 2 }) + L("M6 44 Q24 36 44 44 T84 44 T116 42", { s: "#1971c2", w: 2 }) + L("M6 58 Q24 50 44 58 T84 58 T116 56", { s: "#1971c2", w: 2 }) + R(46, 16, 28, 62, { f: "#aaa", fo: 0.7, r: 2 }) + hatch(46, 16, 28, 62, "#555") + L("M46 16 H74", { w: 3 }),
    cyclone: (a) => L("M60 46 m0 0 C60 36 74 34 76 46 C78 62 52 66 46 48 C40 26 74 14 88 36 C98 54 80 76 56 74 C34 72 22 52 30 36", { s: "#1971c2", w: 2.4 }) + C(60, 46, 3, { f: "#1971c2", s: "#1971c2" }) + L("M10 82 Q24 76 38 82 T66 82 T94 82 T118 80", { s: "#1971c2", w: 1.6 }),
    flood: (a) => L("M30 60 L60 30 L90 60Z", { f: "#c97b4a", fo: 0.6 }) + R(38, 60, 44, 22, { f: "#e8dcc4", fo: 0.8 }) + R(54, 66, 12, 16, { f: "#7a5c3a", fo: 0.6 }) + L("M4 70 Q16 62 28 70 T52 70 T76 70 T100 70 T120 68 V88 H4Z", { f: "#1971c2", fo: 0.45, s: "#1971c2", w: 1.8 }) + L("M4 78 Q16 72 28 78 T52 78 T76 78 T100 78", { s: "#1971c2", w: 1.2 }),
    quake: (a) => R(34, 24, 52, 56, { f: "#e8dcc4", fo: 0.8 }) + [[42, 32], [60, 32], [42, 50], [60, 50]].map(([x, y]) => R(x, y, 12, 12, { w: 1.3 })).join("") + L("M64 14 L56 30 L68 38 L52 56 L66 62 L50 82", { s: "#c92a2a", w: 2.6 }) + L("M12 84 H108", { w: 2 }) + L("M14 78 L22 84 M98 78 L106 84", { w: 1.4 }),
    book: (a) => L("M60 24 Q40 16 18 22 V70 Q40 64 60 74 Q80 64 102 70 V22 Q80 16 60 24Z", { f: "#fff" }) + L("M60 24 V74", { w: 1.6 }) + [32, 42, 52].map((y) => L(`M26 ${y} H52 M68 ${y} H94`, { w: 1.1, s: "#888" })).join("") + L("M80 12 L100 40 L96 42 L76 14Z", { f: a, fo: 0.5 }),
    crowd: (a) => [[30, 62], [60, 56], [90, 62]].map(([x, y], i) => C(x, y - 12, 8, { f: "#f1c9a5", fo: 0.9 }) + L(`M${x - 13} ${y + 22} Q${x - 13} ${y} ${x} ${y} Q${x + 13} ${y} ${x + 13} ${y + 22}Z`, { f: ["#2f9e44", a, "#1971c2"][i], fo: 0.55 })).join("") + L("M60 44 V14", { w: 2 }) + R(40, 6, 40, 16, { f: "#fff", r: 1 }) + L("M46 14 H74", { w: 1.6, s: a }) + L("M60 14", {}),
    coins: (a) => [[40, 70], [40, 62], [40, 54]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="7" fill="#f4c542" fill-opacity=".85" stroke="${INK}" stroke-width="1.6"/>`).join("") + `<ellipse cx="86" cy="72" rx="16" ry="5" fill="#f4c542" fill-opacity=".85" stroke="${INK}" stroke-width="1.6"/><ellipse cx="86" cy="64" rx="16" ry="5" fill="#f4c542" fill-opacity=".85" stroke="${INK}" stroke-width="1.6"/>` + T(40, 40, "Rs", { z: 16 }) + L("M60 20 L60 42", { s: "#2f9e44", w: 2.4 }) + L("M52 28 L60 20 L68 28", { s: "#2f9e44", w: 2.4 }),
    factory: (a) => R(14, 42, 78, 38, { f: "#d9d3c7", fo: 0.9 }) + L("M14 42 L34 28 V42 L54 28 V42 L74 28 V42", { w: 1.6 }) + R(78, 18, 12, 26, { f: "#b0592f", fo: 0.7 }) + R(96, 28, 10, 16, { f: "#b0592f", fo: 0.7 }) + [24, 44, 64].map((x) => R(x, 56, 12, 12, { w: 1.2 })).join("") + L("M82 14 Q76 6 84 2 Q92 0 90 10 M100 24 Q96 16 104 12", { s: "#999", w: 1.4 }),
    train: (a) => R(16, 34, 52, 28, { f: "#556b2f", fo: 0.7, r: 3 }) + R(68, 20, 22, 42, { f: "#556b2f", fo: 0.85, r: 3 }) + R(72, 26, 14, 10, { f: "#bfe0f2", fo: 0.8, w: 1.2 }) + L("M92 46 L108 62 H90Z", { f: "#999", fo: 0.6, w: 1.4 }) + [28, 44, 60, 80].map((x) => C(x, 70, 7, { f: "#444", fo: 0.35 })).join("") + L("M8 78 H112", { w: 2 }) + [24, 36, 48].map((x) => C(x, 28, 4, { f: "#f1c9a5" })).join("") + L("M80 20 L80 10 M80 12 Q86 6 94 8", { w: 1.4 }),
    mourning: (a) => L("M60 20 Q44 20 44 36 Q44 46 60 62 Q76 46 76 36 Q76 20 60 20Z", { f: "#111", fo: 0.85 }) + L("M60 62 L44 82 M60 62 L76 82", { f: "none", s: "#111", w: 6 }) + L("M92 70 V50 M92 50 Q96 44 92 38 Q88 44 92 50", { w: 1.6 }) + R(86, 70, 12, 10, { f: "#f4e9cf", r: 2 }) + C(92, 42, 2.4, { f: "#ffd84a", s: "#e67700", w: 1 }),
    dome: (a) => L("M20 78 V50 H100 V78Z", { f: "#e8dcc4", fo: 0.9 }) + L("M30 50 Q30 20 60 14 Q90 20 90 50Z", { f: GREEN, fo: 0.45 }) + L("M60 14 V6", { w: 2 }) + C(60, 5, 2, { f: a, s: a }) + [32, 48, 64, 80].map((x) => R(x, 52, 8, 26, { f: "#fff", r: 1, w: 1.3 })).join("") + L("M14 78 H106", { w: 2.6 }),
    scales: (a) => L("M60 14 V78 M44 78 H76", { w: 2.4 }) + L("M24 28 H96", { w: 2 }) + L("M24 28 L14 52 H34Z M96 28 L86 52 H106Z", { f: a, fo: 0.3, w: 1.6 }) + L("M14 52 Q24 62 34 52 M86 52 Q96 62 106 52", { w: 1.6 }) + C(60, 14, 4, { f: "#f4c542" }),
    helmetpol: (a) => M.helmet(a),
    school: (a) => R(18, 40, 84, 40, { f: "#f1d5a8", fo: 0.9 }) + L("M12 40 L60 16 L108 40Z", { f: "#b0592f", fo: 0.6 }) + [28, 48, 68, 86].map((x) => R(x, 52, 10, 14, { w: 1.3, f: "#bfe0f2", fo: 0.6 })).join("") + R(52, 62, 16, 18, { f: "#7a5c3a", fo: 0.6 }) + L("M60 16 V4 L74 8 L60 12", { f: "#fff", w: 1.4 }) + L("M104 76 V62 M104 62 Q108 56 104 50 Q100 56 104 62", { w: 1.4 }) + C(104, 52, 2, { f: "#ffd84a", s: "#e67700", w: 1 }),
    road: (a) => L("M44 84 L56 12 H68 L84 84Z", { f: "#555", fo: 0.55 }) + L("M62 80 V70 M62 58 V48 M62 36 V26", { s: "#fff", w: 3 }) + R(92, 48, 22, 16, { f: a, fo: 0.45, r: 2 }) + R(92, 64, 12, 8, { f: a, fo: 0.45, r: 2 }) + C(98, 74, 3.4, { f: "#333" }) + C(110, 74, 3.4, { f: "#333" }) + L("M10 84 H110", { w: 1.6 }) + L("M14 70 L22 50 L30 70Z", { f: "#2f9e44", fo: 0.6, w: 1.4 }),
  };
  const RULES = [
    [/Resolution 47|UNCIP|UN Commission/i, "globe"], [/Karachi Agreement|Liaquat-Nehru|Mutual Defence/i, "treaty"],
    [/Radcliffe|3 June Plan|One Unit|Hyderabad|FATA|ended\b.*provinces/i, "partition"],
    [/Partition migration/i, "train"], [/United Nations|OIC|war on terror|Liaquat visits|Pakistan joins the UN/i, "globe"],
    [/Operation Gibraltar|Kashmir|Kargil|Article 370|Rann/i, "mountain"],
    [/nuclear tests/i, "cloud"], [/Indus Waters/i, "river"], [/cyclone/i, "cyclone"], [/flood/i, "flood"], [/earthquake/i, "quake"],
    [/Language Movement|Urdu/i, "book"], [/plane crash/i, "crash"], [/assassinat|Death of Jinnah|hanged/i, (t) => (/hanged/i.test(t) ? "scales" : "mourning")],
    [/Army Public School/i, "school"], [/CPEC/i, "road"], [/Nationalisation|nationalis/i, "factory"], [/Zakat/i, "coins"], [/State Bank/i, "coins"],
    [/born|Independence|sworn in as Governor|Bangladesh declared/i, "flag"],
    [/Balakot|2025/i, "plane"],
    [/Operation|martial law|coup|Rawalpindi Conspiracy|Lal Masjid|Emergency|Abbottabad|Salala|Anti-Ahmadiyya|Searchlight|Fair Play/i, "helmet"],
    [/War with India|1965 War|Fall of Dhaka|Zarb|Soviet|Ceasefire/i, "tank"],
    [/Tashkent|Simla|Lahore Declaration|Geneva|SEATO|Baghdad Pact|defence agreement|treaty|Agreement|border agreement/i, "treaty"],
    [/election|ballot|no-confidence|Basic Democracies|United Front|vote of|presidential election/i, "ballot"],
    [/Federal Court|Supreme Court|disqualified|Chief Justice|Judges restored|validates/i, "gavel"],
    [/Constitution|Amendment|Objectives|Six Points|Act\b|Ordinance|Family Laws|Declaration/i, "scroll"],
    [/Awami|People's Party|protest|Movement against|May 9/i, "crowd"], [/Benazir Bhutto returns/i, "crowd"],
    [/Assembly dissolved|Prime Minister|President|dismissed|resign|caretaker|takes power|becomes/i, "dome"],
  ];
  const BYKIND = { pol: "dome", mil: "tank", law: "scroll", eco: "coins", for: "globe", soc: "crowd", dis: "flood" };
  PAK.illusKey = function (e) {
    const t = e.title + " " + e.text.slice(0, 60);
    for (const [re, k] of RULES) if (re.test(e.title)) return typeof k === "function" ? k(e.title) : k;
    for (const [re, k] of RULES) if (re.test(t)) return typeof k === "function" ? k(t) : k;
    return BYKIND[e.kind] || "dome";
  };
  PAK.illus = function (key, accent) {
    const f = M[key] || M.dome;
    return `<svg class="illus" viewBox="0 0 120 90" role="img" aria-hidden="true"><g filter="url(#pak-pencil)" stroke-linecap="round" stroke-linejoin="round">${f(accent || GREEN)}</g></svg>`;
  };
  PAK.illusKeys = Object.keys(M);
  PAK.motif = (key, accent) => (M[key] || M.dome)(accent || GREEN);
})();
