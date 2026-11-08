/* The stepped pyramid of power: sketched figures standing behind name plates, one step per rank. */
(function () {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const PLATE = ["#b0292f", "#1d4ed8", "#1e3a8a", "#2f6f2f", "#7c2d12", "#374151"];
  const wrap = (t, n) => { const out = []; let line = ""; String(t).split(" ").forEach((w) => { if ((line + " " + w).trim().length > n && line) { out.push(line); line = w; } else line = (line + " " + w).trim(); }); if (line) out.push(line); return out; };
  function throne() {
    return `<g filter="url(#pak-pencil)"><path d="M-26 40 L-26 -6 Q-26 -34 0 -38 Q26 -34 26 -6 L26 40Z" fill="#d4a017" stroke="#7a5a00" stroke-width="2.4"/><path d="M-18 40 L-18 -2 Q-18 -26 0 -30 Q18 -26 18 -2 L18 40Z" fill="#8f1d1d" fill-opacity=".85" stroke="#7a5a00" stroke-width="1.5"/>
      <circle cx="0" cy="-46" r="9" fill="#01411c" stroke="#d4a017" stroke-width="2"/><path d="M-2 -52 A6 6 0 1 0 -2 -40 A4.8 4.8 0 1 1 -2 -52Z" fill="#fff"/><path d="M5 -50 l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3Z" fill="#fff"/></g>`;
  }
  PAK.pyramid = function (def) {
    const W = 360, tiers = def.tiers, GAP = 6;
    const widths = tiers.map((_, i) => 130 + (i * (W - 130 - 6)) / Math.max(1, tiers.length - 1));
    let y = 14, svgInner = "", plates = "";
    tiers.forEach((row, ti) => {
      const w = Math.min(W - 6, widths[ti]), x0 = (W - w) / 2;
      const n = row.length, cell = w / n, bs = Math.min(56, cell - 6);
      const maxLines = Math.max(...row.map((id) => (PAK.roles[id] ? Math.min(3, wrap(PAK.roles[id].plate, Math.max(9, Math.floor((cell - 6) / 4.9))).length) : 1)));
      const h = bs + 56 + (ti === 0 ? 38 : 0);
      svgInner += `<path d="M${x0} ${y + h} L${x0 + 6} ${y + 10} Q${x0 + 8} ${y} ${x0 + 18} ${y} H${x0 + w - 18} Q${x0 + w - 8} ${y} ${x0 + w - 6} ${y + 10} L${x0 + w} ${y + h}Z" fill="#161c20" stroke="#d4a017" stroke-width="2" />`;
      row.forEach((id, i) => {
        const r = PAK.roles[id]; if (!r) return;
        const cx = x0 + cell * i + cell / 2, by = y + (ti === 0 ? 30 : 8);
        const col = PLATE[ti % PLATE.length];
        let fig = `<g${PAK.photoOf(id) ? "" : ' filter="url(#pak-pencil)"'}><g transform="translate(${cx - bs / 2} ${by + (ti === 0 ? 26 : 0)}) scale(${bs / 100})">${PAK.bustInner(r.look, "#d4a017", id)}</g></g>`;
        if (ti === 0) fig = `<g transform="translate(${cx} ${by + 22})">${throne()}</g>` + fig;
        const ls = wrap(r.plate, Math.max(9, Math.floor((cell - 6) / 4.9))).slice(0, 3);
        const ph = 8 + maxLines * 9.5, py = y + h - ph - 6;
        plates += `<g class="hot" data-role="${id}" tabindex="0" role="button" aria-label="${esc(r.name)}">${fig}<rect x="${cx - cell / 2 + 3}" y="${py}" width="${cell - 6}" height="${ph}" rx="3" fill="${col}" stroke="#fff" stroke-opacity=".6" stroke-width="1"/>${ls.map((ln, q) => `<text x="${cx}" y="${py + 11 + q * 9.5}" text-anchor="middle" font-size="7.6" font-weight="700" fill="#fff">${esc(ln)}</text>`).join("")}<rect x="${cx - cell / 2}" y="${y}" width="${cell}" height="${h}" fill="transparent"/></g>`;
      });
      y += h + GAP;
    });
    return `<svg class="pyr" viewBox="0 0 ${W} ${y + 8}" role="group" aria-label="${esc(def.title)}"><rect width="${W}" height="${y + 8}" rx="16" fill="#0b0f12"/>${svgInner}${plates}</svg>`;
  };

  PAK.roleSheet = function (id) {
    const r = PAK.roles[id]; if (!r) return;
    let box = document.getElementById("sheet"); if (box) box.remove();
    box = document.createElement("div"); box.id = "sheet"; box.className = "sheet-overlay";
    box.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><button class="sheet-x" aria-label="Close">&times;</button>
      <div class="leader-head">${PAK.bust(r.look, "#d4a017", id, "big-avatar")}<div><p class="eyebrow">Post</p><h2 style="margin:.1em 0">${esc(r.name)}</h2></div></div>
      <h3>What the post does</h3><p>${esc(r.what)}</p><h3>How chosen and removed</h3><p>${esc(r.how)}</p>
      <p class="note">The drawing is a sketch of the post, not of the person who holds it today. Holders change.</p></div>`;
    document.body.appendChild(box);
    const close = () => { box.remove(); document.removeEventListener("keydown", key); }; const key = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", key);
    box.addEventListener("click", (e) => (e.target === box || e.target.closest(".sheet-x")) && close());
    box.querySelector(".sheet-x").focus();
  };

  const SECTIONS = [["gov", "Government"], ["par", "Parliament"], ["courts", "Courts"], ["forces", "Forces"], ["prov", "Provinces"]];
  const EXPLAIN = {
    gov: "Read from the top: the President is the head of state, the Prime Minister runs the government, and the Chief Justice heads the courts. The rows below are the ministers, the three armed services and independent bodies such as the Election Commission and the Auditor General. Tap any figure to read about the post.",
    par: "Parliament has three parts: the President, the Senate and the National Assembly. The National Assembly is the bigger house (336 seats against 96) and the Prime Minister answers to it. Only the National Assembly passes money bills. The Senate gives every province equal seats and cannot be dissolved.",
    courts: "The pyramid of courts. The Supreme Court sits at the top, and its rulings bind every other court. The High Courts are in each province, and the District and Sessions Courts at the base try most cases. The Federal Shariat Court checks laws against the injunctions of Islam.",
    forces: "The President is the Supreme Commander. Each service has its own chief: Army, Navy and Air Force. The Joint Chiefs and the ISI work across the three. All are under the elected government, in law.",
    prov: "Each province has a Governor (the President's representative, mostly ceremonial) and a Chief Minister, who actually runs the government. Under them the Chief Secretary leads the civil servants and the Inspector General leads the police.",
  };
  PAK.pyramidPage = function (app, key) {
    key = PAK.pyramids[key] ? key : "gov";
    const def = PAK.pyramids[key];
    app.innerHTML = `<p class="eyebrow">Part 4</p><h1>How Pakistan's state works</h1>
      <div class="chips">${SECTIONS.map(([k, n]) => `<a class="chip${k === key ? " on" : ""}" href="#state-${k}">${n}</a>`).join("")}</div>
      <h2>${esc(def.title)}</h2><p class="lede">${esc(EXPLAIN[key])}</p>
      ${PAK.pyramid(def)}
      <h2>The three branches</h2><div class="cards"><div class="card"><b>Parliament (makes laws)</b><span class="t">The National Assembly and the Senate pass laws and the budget.</span></div><div class="card"><b>Government (carries them out)</b><span class="t">The Prime Minister, the Cabinet and the ministries.</span></div><div class="card"><b>Courts (judge disputes)</b><span class="t">They can strike down a law that goes against the Constitution. This is called judicial review.</span></div></div>
      <p class="note">Tap any figure. The faces are sketches of the post, not of today's holder.</p>`;
    app.querySelectorAll(".hot").forEach((g) => {
      const go = () => PAK.roleSheet(g.dataset.role);
      g.addEventListener("click", go);
      g.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), go()));
    });
  };
})();
