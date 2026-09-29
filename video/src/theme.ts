// Colour tokens and type for the Grammar Detective case-file style.
export const C = {
  paper: "#F6F1E7",
  paperDeep: "#EDE5D3",
  card: "#FFFDF8",
  ink: "#26262B",
  inkSoft: "#5B5A60",
  rule: "#D9CFBB",
  error: "#C23B2E",
  errorWash: "#F6DAD5",
  correct: "#2E7D4F",
  correctWash: "#D8ECDD",
  highlight: "#F4D35E",
  unit: "#2F5DA8",
  material: "#1E8F7E",
  measured: "#C76E1A",
  abstract: "#7E3FA0",
  activity: "#C8325F",
  gold: "#D4A017",
  goldDeep: "#A87A06",
};

export type Accent = "unit" | "material" | "measured" | "abstract" | "activity";

export const SECTIONS: { key: Accent; num: string; title: string; picture: string }[] = [
  { key: "unit", num: "01", title: "UNIT / MASS", picture: "overall collection" },
  { key: "material", num: "02", title: "MATERIAL", picture: "material" },
  { key: "measured", num: "03", title: "MEASURED", picture: "measured amount" },
  { key: "abstract", num: "04", title: "ABSTRACT", picture: "body of knowledge" },
  { key: "activity", num: "05", title: "ACTIVITY / PROCESS", picture: "activity" },
];

export const FONT = "Inter, sans-serif";
export const MONO = "'IBM Plex Mono', monospace";

export const tint = (hex: string, alpha: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};
