// Builds the standalone web version (docs/index.html) from bolo-english.html.
// The Claude artifact is published without a document skeleton; the web version needs one.
// Also writes the manifests that let the page live on the phone's Home Screen (icons: tools/make-icons.cjs).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const page = readFileSync(new URL("../bolo-english.html", import.meta.url), "utf8");
// On iPhone the Home Screen icon opens Safari ("browser"), because the microphone may not work in a standalone web app there.
const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-title" content="Bolo English">
<meta name="theme-color" content="#0d7a4c">
<link rel="manifest" id="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<script>if (/iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) document.getElementById("manifest").href = "manifest-ios.webmanifest";</script>
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
`;
const manifest = (display) => JSON.stringify({
  name: "Bolo English", short_name: "Bolo", description: "Speak English every day with Mam.",
  start_url: "./", scope: "./", display, background_color: "#e9f3ee", theme_color: "#0d7a4c",
  icons: [
    { src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
}, null, 2) + "\n";
const out = (f) => new URL("../docs/" + f, import.meta.url);
mkdirSync(out(""), { recursive: true });
writeFileSync(out("index.html"), head + page + "\n</body>\n</html>\n");
writeFileSync(out("manifest.webmanifest"), manifest("standalone"));
writeFileSync(out("manifest-ios.webmanifest"), manifest("browser"));
console.log("Wrote docs/index.html and the manifests");
