// Builds the standalone web versions from the Claude artifacts: Bolo English (docs/index.html) and Likho English (docs/likho/index.html).
// The Claude artifact is published without a document skeleton; the web version needs one.
// Also writes the manifests that let each app live on the phone's Home Screen (icons: tools/make-icons.cjs).
// Both apps are on the same site, so the Gemini key saved in one is there in the other.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const APPS = [
  { src: "bolo-english.html", dir: "", name: "Bolo English", short: "Bolo", desc: "Speak English every day with Mam.", theme: "#0d7a4c", bg: "#e9f3ee" },
  { src: "likho-english.html", dir: "likho/", name: "Likho English", short: "Likho", desc: "Write English every day, and Mam checks it.", theme: "#2449a8", bg: "#e9eef8" },
];
// On iPhone the Home Screen icon opens Safari ("browser"), because the microphone may not work in a standalone web app there.
const head = (a) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-title" content="${a.name}">
<meta name="theme-color" content="${a.theme}">
<link rel="manifest" id="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<script>if (/iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) document.getElementById("manifest").href = "manifest-ios.webmanifest";</script>
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
`;
const manifest = (a, display) => JSON.stringify({
  name: a.name, short_name: a.short, description: a.desc,
  start_url: "./", scope: "./", display, background_color: a.bg, theme_color: a.theme,
  icons: [
    { src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
}, null, 2) + "\n";
for (const a of APPS) {
  const page = readFileSync(new URL("../" + a.src, import.meta.url), "utf8");
  const out = (f) => new URL("../docs/" + a.dir + f, import.meta.url);
  mkdirSync(out(""), { recursive: true });
  writeFileSync(out("index.html"), head(a) + page + "\n</body>\n</html>\n");
  writeFileSync(out("manifest.webmanifest"), manifest(a, "standalone"));
  writeFileSync(out("manifest-ios.webmanifest"), manifest(a, "browser"));
  console.log(`Wrote docs/${a.dir}index.html and its manifests`);
}
