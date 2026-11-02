"""Build the publishable page (dist/) and the installable app (app/) from index.html."""
import pathlib, re
root = pathlib.Path(__file__).parent
src = (root / 'index.html').read_text()
head, body = src.split('</style>', 1)
head += '</style>'
base = '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
(root / 'dist').mkdir(exist_ok=True)
(root / 'dist' / 'index.html').write_text(f'<!DOCTYPE html>\n<html lang="en">\n<head>\n{base}{head}\n</head>\n<body>\n{body.strip()}\n</body>\n</html>\n')
pwa_head = base + ('<meta name="theme-color" content="#1d2b4f">\n<link rel="manifest" href="manifest.webmanifest">\n'
  '<link rel="icon" href="icon-192.png">\n<link rel="apple-touch-icon" href="apple-touch-icon.png">\n'
  '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n'
  '<meta name="apple-mobile-web-app-title" content="Maths Board">\n')
pwa_js = ("<script>if('serviceWorker' in navigator){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));"
  "let reloaded=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!reloaded&&navigator.serviceWorker.controller){reloaded=true}})}</script>\n")
(root / 'app' / 'index.html').write_text(f'<!DOCTYPE html>\n<html lang="en">\n<head>\n{pwa_head}{head}\n</head>\n<body>\n{body.strip()}\n{pwa_js}</body>\n</html>\n')
import shutil
shutil.copy(root / 'vendor' / 'jspdf.umd.min.js', root / 'app' / 'jspdf.umd.min.js')
print('built dist/index.html and app/index.html')
