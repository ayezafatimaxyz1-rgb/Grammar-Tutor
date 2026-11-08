(function () {
  const app = document.getElementById("app");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const KINDS = { pol: "Politics", mil: "War and army", law: "Constitution and courts", eco: "Economy", for: "Foreign affairs", soc: "Society", dis: "Disasters" };
  const ERAS = [
    { name: "Early parliamentary years", a: "1947-08-14", b: "1958-10-07", c: "#2f9e44" },
    { name: "Ayub and Yahya (martial law)", a: "1958-10-07", b: "1971-12-20", c: "#d9480f" },
    { name: "Bhutto's years", a: "1971-12-20", b: "1977-07-05", c: "#1971c2" },
    { name: "Zia's years", a: "1977-07-05", b: "1988-08-17", c: "#a61e4d" },
    { name: "The democratic decade", a: "1988-08-17", b: "1999-10-12", c: "#9c36b5" },
    { name: "Musharraf's years", a: "1999-10-12", b: "2008-08-18", c: "#e67700" },
    { name: "Democracy returns", a: "2008-08-18", b: "2100-01-01", c: "#0b7285" },
  ];
  const eraOf = (date) => ERAS.find((e) => date >= e.a && date < e.b) || ERAS[ERAS.length - 1];
  const today = new Date().toISOString().slice(0, 10);
  const fmt = (e) => (e.d ? e.d + " " : "") + MONTHS[e.m - 1] + " " + e.y;
  const fmtD = (s) => { if (!s) return "present"; const [y, m, d] = s.split("-").map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
  const yr = (s) => (s ? s.slice(0, 4) : "present");
  const LANES = { pm: "Prime Ministers", hs: "Heads of state", army: "Army chiefs" };
  const LANE_ONE = { pm: "Prime Minister", hs: "Governor-General or President", army: "Army chief" };

  const evHtml = (e) => `<article class="ev k-${e.kind}"><div class="d">${esc(fmt(e))}<span class="kind k-${e.kind}">${KINDS[e.kind]}</span>${e.check ? '<span class="flag" title="Check this detail against your book">check</span>' : ""}</div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></article>`;
  const years = [...new Set(PAK.events.map((e) => e.y))];

  function home() {
    app.innerHTML = `<section><p class="eyebrow">Pakistan Story</p><h1>Pakistan from 1947, drawn so you remember it</h1>
      <p class="lede">Dates, leaders and events as timelines and sketches. Start with the timeline, or meet the people in power.</p></section>
      <div class="cards">
        <a class="card" href="#timeline"><span class="badge">Part 1</span><b>Timeline, 1947 onwards</b><span class="t">Every important date, in order, with the year. ${PAK.events.length} events so far.</span></a>
        <a class="card" href="#years"><span class="badge">Part 1</span><b>Year by year</b><span class="t">Pick a year and see what happened and who was in charge.</span></a>
        <a class="card" href="#rulers"><span class="badge">Part 2</span><b>People in power</b><span class="t">Prime Ministers, Presidents and Army chiefs, drawn as connected chains. Tap any person for their era.</span></a>
        <div class="card soon"><span class="badge">Coming next</span><b>Judiciary</b><span class="t">The court system and every Chief Justice.</span></div>
        <div class="card soon"><span class="badge">Coming next</span><b>Parliament and departments</b><span class="t">How the state works, who holds which power, the police and other departments.</span></div>
        <div class="card soon"><span class="badge">Coming next</span><b>Pakistan and the world</b><span class="t">Who recognised Pakistan first, relations with each country, the OIC and other organisations.</span></div>
      </div>
      <p class="note">Dates marked <span class="flag">check</span> are ones where a small detail, such as the exact day, is worth confirming in your textbook. Drawings of people are sketches, not portraits.</p>`;
  }

  function timeline() {
    const decs = [...new Set(years.map((y) => Math.floor(y / 10) * 10))];
    app.innerHTML = `<p class="eyebrow">Part 1</p><h1>Timeline, 1947 onwards</h1>
      <p class="lede">Every important date in order. Tap a year to see that whole year.</p>
      <label class="search"><span class="sr-only"></span><input type="search" id="tq" placeholder="Search: Bhutto, 1971, Kashmir, constitution" autocomplete="off"></label>
      <div class="chips" id="kinds"><button class="chip" aria-pressed="true" data-k="">All</button>${Object.keys(KINDS).map((k) => `<button class="chip" aria-pressed="false" data-k="${k}">${KINDS[k]}</button>`).join("")}</div>
      <div class="chips">${decs.map((d) => `<a class="chip" href="#" data-j="${d}">${d}s</a>`).join("")}</div>
      <p class="muted small" id="tcount"></p><div id="tl"></div>`;
    let kind = "", q = "";
    const draw = () => {
      const es = PAK.events.filter((e) => (!kind || e.kind === kind) && (!q || (e.title + " " + e.text + " " + e.y + " " + MONTHS[e.m - 1]).toLowerCase().includes(q)));
      document.getElementById("tcount").textContent = `${es.length} ${es.length === 1 ? "event" : "events"}`;
      let h = "", cur = 0;
      es.forEach((e) => { if (e.y !== cur) { cur = e.y; h += `<div class="year-head" id="y${cur}"><a href="#year-${cur}">${cur}</a><span>see the whole year</span></div>`; } h += evHtml(e); });
      document.getElementById("tl").innerHTML = h || '<p class="muted">Nothing matches.</p>';
    };
    app.querySelector("#kinds").addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (!b) return; kind = b.dataset.k; app.querySelectorAll("#kinds .chip").forEach((c) => c.setAttribute("aria-pressed", String(c === b))); draw(); });
    app.querySelector("#tq").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); draw(); });
    app.querySelectorAll("[data-j]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); const y = years.find((v) => Math.floor(v / 10) * 10 === +a.dataset.j); const el = document.getElementById("y" + y); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }));
    draw();
  }

  function yearsPage() {
    const all = []; for (let y = 1947; y <= 2025; y++) all.push(y);
    app.innerHTML = `<p class="eyebrow">Part 1</p><h1>Year by year</h1><p class="lede">Pick a year. Years with no entry yet are lighter.</p>
      <div class="yeargrid">${all.map((y) => { const n = PAK.events.filter((e) => e.y === y).length; return `<a href="#year-${y}"${n ? "" : ' style="opacity:.5"'}>${y}<small>${n ? n + (n === 1 ? " event" : " events") : "none yet"}</small></a>`; }).join("")}</div>`;
  }

  const overlap = (l, a, b) => l.start <= b && (l.end || "9999") >= a;
  const personChip = (l) => `<a href="#leader-${l.id}">${PAK.bust(l.look, eraOf(l.start).c, l.id)}<span><b>${esc(l.name)}</b><small>${esc(l.post)}, ${yr(l.start)} to ${yr(l.end)}</small></span></a>`;

  function year(y) {
    y = +y;
    const es = PAK.events.filter((e) => e.y === y);
    const a = `${y}-01-01`, b = `${y}-12-31`;
    const lane = (k) => PAK.leaders.filter((l) => l.lane === k && overlap(l, a, b));
    const era = eraOf(`${y}-07-01`);
    app.innerHTML = `<p class="crumbs"><a href="#years">Years</a></p><h1>${y}</h1><p class="eyebrow" style="color:${era.c}">${esc(era.name)}</p>
      ${["pm", "hs", "army"].map((k) => { const ls = lane(k); return `<h2>${LANES[k]} in ${y}</h2>` + (ls.length ? `<div class="who">${ls.map(personChip).join("")}</div>` : `<p class="muted small">${k === "pm" ? "No Prime Minister's office at this time." : "No entry."}</p>`); }).join("")}
      <h2>What happened in ${y}</h2>${es.length ? es.map(evHtml).join("") : '<p class="muted">No events entered for this year yet.</p>'}
      <div class="pager">${y > 1947 ? `<a class="btn" href="#year-${y - 1}">&larr; ${y - 1}</a>` : "<span></span>"}${y < 2025 ? `<a class="btn" href="#year-${y + 1}">${y + 1} &rarr;</a>` : ""}</div>`;
  }

  const GAPS = {
    zab: "December 1971 to August 1973: President Bhutto ruled under an interim Constitution. The Prime Minister's office came back with the 1973 Constitution.",
    junejo: "1977 to 1985: martial law under General Zia. No Prime Minister.",
    jamali: "1999 to 2002: General Musharraf as Chief Executive. No Prime Minister.",
    nurulamin: "1958 to 1971: no Prime Minister. Presidents Ayub Khan and Yahya Khan ruled.",
  };
  function rulers(lane) {
    lane = LANES[lane] ? lane : "pm";
    const ls = PAK.leaders.filter((l) => l.lane === lane);
    const items = [];
    ls.forEach((l, i) => {
      const prev = ls[i - 1];
      if (lane === "pm" && prev && l.start > prev.end && (GAPS[l.id])) items.push({ gap: GAPS[l.id], color: eraOf(prev.end).c });
      const care = /Caretaker/.test(l.post);
      items.push({ id: l.id, name: l.name, years: `${yr(l.start)} to ${yr(l.end)}`, tag: care ? "caretaker" : "", color: eraOf(l.start).c, look: l.look, href: `#leader-${l.id}` });
    });
    app.innerHTML = `<p class="eyebrow">Part 2</p><h1>People in power</h1>
      <p class="lede">Follow the arrows from the first to the latest. The colour is the era. Tap anyone to read their story and what happened in their time.</p>
      <div class="chips">${Object.keys(LANES).map((k) => `<a class="chip${k === lane ? " on" : ""}" href="#rulers-${k}">${LANES[k]}</a>`).join("")}</div>
      <div class="legend">${ERAS.map((e) => `<span><i style="background:${e.c}"></i>${esc(e.name)}</span>`).join("")}</div>
      ${PAK.chain(items)}<p class="note">These are sketches that show the idea of a person, not portraits.</p>`;
  }

  function leader(id) {
    const ls = PAK.leaders, i = ls.findIndex((l) => l.id === id);
    if (i < 0) return rulers();
    const l = ls[i], era = eraOf(l.start);
    const same = ls.filter((x) => x.lane === l.lane), j = same.indexOf(l);
    const es = PAK.events.filter((e) => e.date >= l.start && e.date <= (l.end || "9999")).sort((x, y) => (x.date < y.date ? -1 : 1));
    const others = ["pm", "hs", "army"].map((k) => ({ k, ls: ls.filter((x) => x.lane === k && x.id !== l.id && overlap(x, l.start, l.end || "9999") && x.start <= (l.end || "9999")) })).filter((o) => o.ls.length);
    app.innerHTML = `<p class="crumbs"><a href="#rulers-${l.lane}">${LANES[l.lane]}</a></p>
      <div class="leader-head">${PAK.bust(l.look, era.c, l.id, "big-avatar")}<div><p class="eyebrow" style="color:${era.c}">${esc(era.name)}</p><h1>${esc(l.name)}</h1><p class="muted">${esc(l.post)}<br>${fmtD(l.start)} to ${fmtD(l.end)}</p></div></div>
      <p>${esc(l.note)}</p>
      ${others.length ? `<h2>In office at the same time</h2><div class="who">${others.flatMap((o) => o.ls.slice(0, 4)).map(personChip).join("")}</div>` : ""}
      <h2>What happened in this time</h2>${es.length ? es.map(evHtml).join("") : '<p class="muted">No events entered for this period yet.</p>'}
      <div class="pager">${j > 0 ? `<a class="btn" href="#leader-${same[j - 1].id}">&larr; ${esc(same[j - 1].name)}</a>` : "<span></span>"}${j < same.length - 1 ? `<a class="btn" href="#leader-${same[j + 1].id}">${esc(same[j + 1].name)} &rarr;</a>` : ""}</div>`;
  }

  function route() {
    const h = decodeURIComponent((location.hash || "#home").slice(1));
    PAK.mountFilter();
    let on = "home";
    if (h === "timeline") { timeline(); on = "timeline"; }
    else if (h === "years") { yearsPage(); on = "years"; }
    else if (h.startsWith("year-")) { year(h.slice(5)); on = "years"; }
    else if (h === "rulers" || h.startsWith("rulers-")) { rulers(h.slice(7)); on = "rulers"; }
    else if (h.startsWith("leader-")) { leader(h.slice(7)); on = "rulers"; }
    else home();
    document.querySelectorAll(".tabbar a").forEach((a) => a.classList.toggle("on", a.dataset.nav === on));
    window.scrollTo(0, 0);
    document.title = "Pakistan Story";
  }
  window.addEventListener("hashchange", route);
  route();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
