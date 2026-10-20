// Builds the standalone web version (docs/index.html) from bolo-english.html.
// The Claude artifact is published without a document skeleton; the web version needs one.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const page = readFileSync(new URL("../bolo-english.html", import.meta.url), "utf8");
const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Bolo English">
<meta name="theme-color" content="#0d7a4c">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
`;
mkdirSync(new URL("../docs/", import.meta.url), { recursive: true });
writeFileSync(new URL("../docs/index.html", import.meta.url), head + page + "\n</body>\n</html>\n");
console.log("Wrote docs/index.html");
