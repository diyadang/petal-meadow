#!/bin/sh
# Builds docs/ (the installable iPhone web app) from src/app.html
set -e
cd "$(dirname "$0")/.."
mkdir -p docs
{
printf '%s\n' '<!doctype html>' '<html lang="en">' '<head>' '<meta charset="utf-8">' \
 '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' \
 '<meta name="theme-color" content="#ffd3e2">' \
 '<meta name="apple-mobile-web-app-capable" content="yes">' \
 '<meta name="mobile-web-app-capable" content="yes">' \
 '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">' \
 '<meta name="apple-mobile-web-app-title" content="nibble">' \
 '<link rel="manifest" href="manifest.webmanifest">' \
 '<link rel="apple-touch-icon" href="icons/icon-180.png">' \
 '<link rel="icon" type="image/png" href="icons/icon-192.png">' \
 '<style>html,body{margin:0;height:100%}body{-webkit-text-size-adjust:100%}img{max-width:100%}[hidden]{display:none!important}</style>' \
 '</head>' '<body>'
cat src/app.html
printf '%s\n' '<script>if("serviceWorker" in navigator){addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})})}</script>' '</body>' '</html>'
} > docs/index.html
echo "built docs/index.html"
