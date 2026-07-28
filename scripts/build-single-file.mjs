/**
 * Bundles the web export into one self-contained .html file.
 *
 * Useful for sharing the app as a plain link — it needs no server, no network
 * at runtime, and no install. Everything (JS, fonts) is inlined.
 *
 *   npx expo export --platform web --output-dir dist --clear
 *   node scripts/build-single-file.mjs dist anton-sky.html
 *
 * Font subsetting needs Python fontTools (`pip install fonttools brotli`).
 * Without it the script still runs and simply skips the inlining, leaving the
 * page to fall back to the platform serif.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const WEB = process.argv[2] ?? 'dist';
const OUT = process.argv[3] ?? 'anton-sky.html';
// `--fragment` omits <html>/<head>/<body> for hosts that supply their own
// document shell. The default is a complete, standalone page.
const FRAGMENT = process.argv.includes('--fragment');

// The faces App.tsx registers, mapped to their source directory.
const FACES = [
  ['Fraunces300', '300Light'],
  ['Fraunces400', '400Regular'],
  ['Fraunces500', '500Medium'],
  ['Fraunces600', '600SemiBold'],
  ['Fraunces700', '700Bold'],
];

// Latin plus the punctuation the copy actually uses. The astrological glyphs
// are not in Fraunces and come from the platform's symbol font either way.
const UNICODES = [
  'U+0020-007E', 'U+00A0-00FF', 'U+0131', 'U+0152-0153',
  'U+2013-2014', 'U+2018-201D', 'U+2022', 'U+2026',
  'U+00B0', 'U+00B7', 'U+2032-2033', 'U+00AB', 'U+00BB',
].join(',');

function buildFontCss() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'anton-fonts-'));
  const rules = [];

  for (const [family, dir] of FACES) {
    const src = `node_modules/@expo-google-fonts/fraunces/${dir}/Fraunces_${dir}.ttf`;
    if (!fs.existsSync(src)) throw new Error(`missing font source: ${src}`);
    const out = path.join(tmp, `${family}.woff2`);
    execFileSync('pyftsubset', [
      src, `--unicodes=${UNICODES}`, '--flavor=woff2',
      '--layout-features=kern,liga', `--output-file=${out}`,
    ]);
    const b64 = fs.readFileSync(out).toString('base64');

    // No font-weight/font-style descriptors on purpose. expo-font declares each
    // of these families at the default weight 400, pointing at asset files that
    // do not exist here. Declaring a different weight would make its broken rule
    // the exact match for a normal-weight request, and the browser would prefer
    // it no matter the source order. Matching its descriptors means the later
    // rule — ours — simply wins.
    rules.push(
      `@font-face{font-family:'${family}';font-display:swap;` +
        `src:url(data:font/woff2;base64,${b64}) format('woff2')}`,
    );
  }

  fs.rmSync(tmp, { recursive: true, force: true });
  return rules.join('\n');
}

let fontCss = '';
try {
  fontCss = buildFontCss();
} catch (err) {
  console.warn(`! skipping inlined fonts: ${err.message}`);
  console.warn('! install them with: pip install fonttools brotli');
}

const jsDir = path.join(WEB, '_expo/static/js/web');
const jsName = fs.readdirSync(jsDir).find((f) => f.endsWith('.js'));
if (!jsName) throw new Error(`no bundle found in ${jsDir} — run expo export first`);

// A literal </script> inside the bundle would close the tag early.
const js = fs
  .readFileSync(path.join(jsDir, jsName), 'utf8')
  .replace(/<\/script/gi, '<\\/script');

const favicon = fs.existsSync('assets/favicon.png')
  ? `<link rel="icon" href="data:image/png;base64,${fs.readFileSync('assets/favicon.png').toString('base64')}">`
  : '';

// Served straight from a static host, the page needs its own charset (the copy
// is full of Portuguese accents) and a viewport meta, or phones render it at
// desktop width and the whole app looks zoomed out.
const head = FRAGMENT
  ? ''
  : `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#FCFABD">
<meta name="description" content="The natal chart of Anton Duque Estrada — 26 July 2026, Filderstadt. EN/PT.">
${favicon}
`;

const tail = FRAGMENT ? '' : '\n</body>\n</html>\n';

const body = `<title>Anton's Sky · O Céu de Anton</title>
<style id="anton-fonts">
${fontCss}

/* The app paints its own solid yellow; the shell just gets out of the way
   and gives react-native-web the definite height its ScrollViews need. */
html, body { height: 100%; margin: 0; padding: 0; }
body { overflow: hidden; background: #FCFABD; -webkit-font-smoothing: antialiased; }
#root { display: flex; height: 100%; flex: 1; min-height: 0; }
</style>
${FRAGMENT ? '' : '</head>\n<body>'}

<div id="root"></div>

<script>
/* expo-font appends its own <style id="expo-generated-fonts"> at runtime. Keep
   ours last in <head> so our rules win the cascade. */
(function () {
  var mine = document.getElementById('anton-fonts');
  if (!mine) return;
  document.head.appendChild(mine);
  new MutationObserver(function () {
    if (document.head.lastElementChild !== mine) document.head.appendChild(mine);
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
</script>

<script>${js}</script>
`;

const html = head + body + tail;

fs.mkdirSync(path.dirname(path.resolve(OUT)), { recursive: true });
fs.writeFileSync(OUT, html);
const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(`fonts  ${kb(fontCss.length)}`);
console.log(`bundle ${kb(js.length)}`);
console.log(`wrote  ${OUT} (${kb(html.length)})${FRAGMENT ? ' [fragment]' : ''}`);
