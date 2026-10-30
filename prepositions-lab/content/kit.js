/* Small builders for common board layouts, so lesson files stay short.
   They return ordinary board actions; nothing here is special to the engine. */
PLAB.kit = {
  // Lines of centred text, top to bottom. Each item is a string or
  // [text, { ink, size, hl, hlStyle, hlInk }] where hl is a word to highlight.
  lines(prefix, items, { y = 140, gap = 85, size = 36, first = 400 } = {}) {
    const out = [];
    items.forEach((item, i) => {
      const [text, o = {}] = Array.isArray(item) ? item : [item];
      const id = `${prefix}${i + 1}`;
      out.push({ do: "write", id, text, x: 480, y: y + i * gap, size: o.size || size, anchor: "middle", ink: o.ink, gap: i ? 350 : first });
      if (o.hl) out.push({ do: "highlight", id: `${id}-h`, target: id, word: o.hl, style: o.hlStyle, ink: o.hlInk });
    });
    return out;
  },

  clear(id) {
    return { do: "erase", id, targets: "all" };
  },

  // A horizontal time line with an optional "now" marker on the right.
  timeline(id, { y = 220, now = true } = {}) {
    const acts = [{ do: "draw", id, shape: "arrow", from: [70, y], to: [890, y], dur: 1000 }];
    if (now) {
      acts.push({ do: "draw", id: `${id}-now`, shape: "circle", cx: 780, cy: y, r: 11, ink: "accent", fill: "solid", dur: 400 });
      acts.push({ do: "write", id: `${id}-now-l`, text: "now", x: 780, y: y + 50, size: 28, ink: "accent", anchor: "middle" });
    }
    return acts;
  },
};
