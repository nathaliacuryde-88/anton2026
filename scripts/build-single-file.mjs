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

// The six faces App.tsx registers, mapped to their source directory.
const FACES = [
  ['Cormorant300', '300Light'],
  ['Cormorant400', '400Regular'],
  ['Cormorant500', '500Medium'],
  ['Cormorant600', '600SemiBold'],
  ['Cormorant400Italic', '400Regular_Italic'],
  ['Cormorant300Italic', '300Light_Italic'],
];

// Latin plus the punctuation the copy actually uses. The astrological glyphs
// are not in Cormorant and come from the platform's symbol font either way.
const UNICODES = [
  'U+0020-007E', 'U+00A0-00FF', 'U+0131', 'U+0152-0153',
  'U+2013-2014', 'U+2018-201D', 'U+2022', 'U+2026',
  'U+00B0', 'U+00B7', 'U+2032-2033', 'U+00AB', 'U+00BB',
].join(',');

function buildFontCss() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'anton-fonts-'));
  const rules = [];

  for (const [family, dir] of FACES) {
    const src = `node_modules/@expo-google-fonts/cormorant-garamond/${dir}/CormorantGaramond_${dir}.ttf`;
    if (!fs.existsSync(src)) throw new Error(`missing font source: ${src}`);
    const out = path.join(tmp, `${family}.woff2`);
    execFileSync('pyftsubset', [
      src, `--unicodes=${UNICODES}`, '--flavor=woff2',
      '--layout-features=kern,liga', `--output-file=${out}`,
    ]);
    const b64 = fs.readFileSync(out).toString('base64');

    // No font-weight/font-style descriptors on purpose. The family name already
    // encodes the weight, and expo-font declares each of these families at the
    // default weight 400 pointing at asset files that do not exist here. If we
    // declared, say, weight 300 for Cormorant300, the browser would treat
    // expo-font's broken weight-400 rule as the exact match for a normal-weight
    // request and prefer it no matter the source order. Matching its descriptors
    // means the later rule — ours — simply wins.
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

const html = `<title>Anton's Sky · O Céu de Anton</title>
<style id="anton-fonts">
${fontCss}

/* The app paints its own pastel gradient; the shell just gets out of the way
   and gives react-native-web the definite height its ScrollViews need. */
html, body { height: 100%; margin: 0; padding: 0; }
body { overflow: hidden; background: #FDF8F4; -webkit-font-smoothing: antialiased; }
#root { display: flex; height: 100%; flex: 1; min-height: 0; }
</style>

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

fs.writeFileSync(OUT, html);
const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(`fonts  ${kb(fontCss.length)}`);
console.log(`bundle ${kb(js.length)}`);
console.log(`wrote  ${OUT} (${kb(html.length)})`);
