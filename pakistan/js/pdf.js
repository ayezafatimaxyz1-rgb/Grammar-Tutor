/* PDF notes: the timeline, one era, a one-page-per-era revision sheet, or the people in power.
   Runs on the phone: nothing is uploaded. The PDF library loads only when a PDF is asked for. */
(function () {
  const clean = (s) => String(s || "").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/→/g, "->").replace(/[^\x00-\xff]/g, "");
  const load = (src) => new Promise((ok, fail) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => fail(new Error("Could not load the PDF library")); document.head.appendChild(s); });
  const FILTER = '<defs><filter id="pak-pencil" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter></defs>';
  const cache = new Map();
  function raster(key, inner, vb, w, h) {
    if (cache.has(key)) return Promise.resolve(cache.get(key));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}">${FILTER}<rect width="100%" height="100%" fill="#f3f5f9"/><g filter="url(#pak-pencil)" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
    return new Promise((ok) => {
      const img = new Image();
      img.onload = () => { const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d").drawImage(img, 0, 0); const u = c.toDataURL("image/png"); cache.set(key, u); ok(u); };
      img.onerror = () => ok(null);
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    });
  }
  const evPic = (e, color) => raster("e:" + PAK.illusKey(e) + color, PAK.motif(PAK.illusKey(e), color), "0 0 120 90", 240, 180);

  class Doc {
    constructor(title, sub) {
      this.d = new window.jspdf.jsPDF({ unit: "mm", format: "a4", compress: true });
      this.W = 210; this.H = 297; this.M = 14; this.y = this.M; this.title = title; this.n = 1;
      const d = this.d;
      d.setFillColor(1, 65, 28); d.rect(0, 0, this.W, 26, "F");
      d.setTextColor(255); d.setFont("helvetica", "bold"); d.setFontSize(18); d.text(clean(title), this.M, 12);
      d.setFont("helvetica", "normal"); d.setFontSize(10); d.text(clean(sub), this.M, 19);
      d.setTextColor(30); this.y = 34;
    }
    foot() { const d = this.d; d.setFontSize(8); d.setTextColor(120); d.text("Pakistan Story - check important dates against your textbook", this.M, this.H - 6); d.text(String(this.n), this.W - this.M, this.H - 6, { align: "right" }); d.setTextColor(30); }
    need(h) { if (this.y + h > this.H - 14) { this.foot(); this.d.addPage(); this.n++; this.y = this.M; } }
    text(t, size, style, color, indent = 0, lh = 1.28) {
      const d = this.d; d.setFont("helvetica", style || "normal"); d.setFontSize(size); const c = color || [30, 30, 30]; d.setTextColor(c[0], c[1], c[2]);
      const lines = d.splitTextToSize(clean(t), this.W - this.M * 2 - indent);
      const step = size * 0.3528 * lh;
      lines.forEach((ln) => { this.need(step); d.text(ln, this.M + indent, this.y + step * 0.8); this.y += step; });
    }
    gap(h) { this.y += h; }
    head(t, color) { this.need(14); const d = this.d, c = color || [1, 65, 28]; d.setFillColor(c[0], c[1], c[2]); d.rect(this.M, this.y, this.W - this.M * 2, 8, "F"); d.setTextColor(255); d.setFont("helvetica", "bold"); d.setFontSize(12); d.text(clean(t), this.M + 3, this.y + 5.6); d.setTextColor(30); this.y += 12; }
    async event(e, era, trick) {
      const need = 34 + (e.text.length > 200 ? 8 : 0);
      this.need(need);
      const pic = await evPic(e, era.c);
      const top = this.y;
      if (pic) this.d.addImage(pic, "PNG", this.M, top, 32, 24);
      const x = 32 + 4;
      this.d.setFont("helvetica", "bold"); this.d.setFontSize(9); this.d.setTextColor(90); this.d.text(clean(PAK.fmt(e) + "  -  " + { pol: "Politics", mil: "War and army", law: "Constitution and courts", eco: "Economy", for: "Foreign affairs", soc: "Society", dis: "Disaster" }[e.kind] + (e.check ? "  (check this detail)" : "")), this.M + x, top + 3.6);
      this.d.setFontSize(11.5); this.d.setTextColor(1, 65, 28); this.d.text(clean(e.title), this.M + x, top + 9);
      const lines = this.d.splitTextToSize(clean(e.text), this.W - this.M * 2 - x);
      this.d.setFont("helvetica", "normal"); this.d.setFontSize(9.5); this.d.setTextColor(30);
      let yy = top + 13.5; lines.forEach((ln) => { this.d.text(ln, this.M + x, yy); yy += 4.2; });
      this.y = Math.max(top + 26, yy);
      const dt = PAK.detailOf(e);
      if (dt) { this.text("Why: " + dt.why, 9, "normal", [60, 60, 60], 0, 1.25); this.text("Next: " + dt.next, 9, "normal", [60, 60, 60], 0, 1.25); }
      if (trick) { this.text("Remember: " + trick, 9, "italic", [138, 90, 0], 0, 1.25); }
      this.gap(4);
    }
    async finish(name, share) {
      this.foot();
      const blob = this.d.output("blob"), file = new File([blob], name, { type: "application/pdf" });
      if (share && navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: this.title }); return; } catch (e) { if (e && e.name === "AbortError") return; } }
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }
  }
  const hex = (c) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
  const trickOf = (e) => { for (const sc of PAK.scenes) for (const [t, tr] of sc.spots) if (e.title.startsWith(t)) return tr; return ""; };

  PAK.pdf = async function (kind, share, btn) {
    const label = btn && btn.textContent;
    if (btn) { btn.disabled = true; btn.textContent = "Making PDF..."; }
    try {
      if (!window.jspdf) await load("js/jspdf.umd.min.js");
      const ERAS = PAK.ERAS;
      if (kind === "all" || kind.startsWith("era:")) {
        const eras = kind === "all" ? ERAS : [ERAS[+kind.slice(4)]];
        const sub = kind === "all" ? `${PAK.events.length} events from 1947 to now, with pictures` : eras[0].name;
        const doc = new Doc(kind === "all" ? "Pakistan Timeline, 1947 onwards" : eras[0].name, sub);
        for (const er of eras) {
          const es = PAK.events.filter((e) => PAK.eraOf(e.date) === er);
          const idx = ERAS.indexOf(er);
          doc.head(`${er.name}  (${er.a.slice(0, 4)} to ${er.b.startsWith("2100") ? "now" : er.b.slice(0, 4)})`, hex(er.c));
          doc.text("Learn this first: " + PAK.scenes[idx].summary, 10, "bold", [60, 60, 60]);
          doc.gap(3);
          let cur = 0;
          for (const e of es) { if (e.y !== cur) { cur = e.y; doc.need(12); doc.text(String(cur), 14, "bold", hex(er.c)); doc.gap(1); } await doc.event(e, er, trickOf(e)); }
          doc.gap(4);
        }
        await doc.finish(kind === "all" ? "pakistan-timeline.pdf" : `pakistan-${eras[0].name.toLowerCase().replace(/[^a-z]+/g, "-")}.pdf`, share);
      } else if (kind === "revision") {
        const doc = new Doc("Revision sheet", "One section per era: the key dates and the memory tricks");
        for (const [i, er] of ERAS.entries()) {
          doc.head(`${er.name}  (${er.a.slice(0, 4)} to ${er.b.startsWith("2100") ? "now" : er.b.slice(0, 4)})`, hex(er.c));
          doc.text(PAK.scenes[i].summary, 10, "bold", [60, 60, 60]); doc.gap(2);
          for (const [t, tr] of PAK.scenes[i].spots) {
            const e = PAK.events.find((x) => x.title.startsWith(t) && PAK.eraOf(x.date) === er);
            if (!e) continue;
            doc.text(`${PAK.fmt(e)}: ${e.title}`, 10.5, "bold", [1, 65, 28]);
            doc.text(tr, 9.5, "italic", [138, 90, 0], 3); doc.gap(1.5);
          }
          doc.gap(5);
        }
        await doc.finish("pakistan-revision-sheet.pdf", share);
      } else if (kind === "people") {
        const doc = new Doc("People in power", "Prime Ministers, heads of state and army chiefs");
        const LN = { pm: "Prime Ministers", hs: "Governors-General and Presidents", army: "Army chiefs" };
        for (const lane of ["pm", "hs", "army"]) {
          doc.head(LN[lane]);
          for (const l of PAK.leaders.filter((x) => x.lane === lane)) {
            doc.need(26);
            const er = PAK.eraOf(l.start);
            const pic = await raster("b:" + l.id, PAK.bustInner(l.look, er.c, l.id), "0 0 100 100", 160, 160);
            const top = doc.y;
            if (pic) doc.d.addImage(pic, "PNG", doc.M, top, 20, 20);
            doc.d.setFont("helvetica", "bold"); doc.d.setFontSize(11); doc.d.setTextColor(1, 65, 28); doc.d.text(clean(l.name), doc.M + 24, top + 5);
            doc.d.setFont("helvetica", "normal"); doc.d.setFontSize(9); doc.d.setTextColor(90); doc.d.text(clean(`${l.post}, ${l.start.slice(0, 4)} to ${l.end ? l.end.slice(0, 4) : "now"}`), doc.M + 24, top + 9.5);
            const lines = doc.d.splitTextToSize(clean(l.note), doc.W - doc.M * 2 - 24); doc.d.setTextColor(30); doc.d.setFontSize(9.5);
            let yy = top + 14.5; lines.forEach((ln) => { doc.d.text(ln, doc.M + 24, yy); yy += 4.2; });
            doc.y = Math.max(top + 22, yy) + 2;
          }
          doc.gap(3);
        }
        await doc.finish("pakistan-people-in-power.pdf", share);
      }
    } catch (err) { alert("Sorry, the PDF could not be made: " + err.message); }
    finally { if (btn) { btn.disabled = false; btn.textContent = label; } }
  };

  document.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-pdf]");
    if (b) { ev.preventDefault(); PAK.pdf(b.dataset.pdf, b.dataset.share === "1", b); }
  });
})();
