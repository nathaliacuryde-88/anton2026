# Anton's Sky · O Céu de Anton

A small bilingual (EN/PT) mobile app holding the natal chart of

**Anton Duque Estrada** — 26 July 2026, 12:45 CEST, Filderstadt, Germany.

Soft pastel palette, Cormorant Garamond throughout, five screens:

| Screen | |
|---|---|
| **Chart · Mapa** | The wheel, the big three, and the element/modality balance. Tap any symbol. |
| **Sky · Céu** | Every body with its sign, degree, house, and retrograde or stationary state. |
| **Houses · Casas** | The twelve Placidus cusps and who is living in each one. |
| **Aspects · Aspectos** | Every aspect, sorted by how exact it is. |
| **Portrait · Retrato** | A letter to Anton, assembled from his own chart. |

Tap **EN / PT** in the header to switch language; everything, including the
letter, is translated.

## Running it

```bash
npm install
npm start
```

Then scan the QR code with **Expo Go** ([iOS](https://apps.apple.com/app/expo-go/id982107779) /
[Android](https://play.google.com/store/apps/details?id=host.exp.exponent)), or press
`a` / `i` / `w` for an Android emulator, iOS simulator, or the browser.

To build a standalone app, use [EAS Build](https://docs.expo.dev/build/setup/):

```bash
npx eas-cli build --platform android --profile preview
```

Other scripts:

```bash
npm run chart      # print the computed chart to the terminal
npm run typecheck  # tsc --noEmit
npm run single     # bundle the web build into one shareable .html file
```

### Sharing it as a link

`npm run single` produces a single self-contained `anton-sky.html` — the whole
app, fonts and all, in one file that needs no server and no network. Open it
anywhere, or send it to someone. It needs Python fontTools for the font
subsetting step (`pip install fonttools brotli`); without it the page still
works and falls back to the platform serif.

## How the chart is computed

Positions come from [`astronomy-engine`](https://github.com/cosinekitty/astronomy)
(VSOP87 for the planets, ELP for the Moon), rotated into the **true ecliptic of
date** — the frame the tropical zodiac is measured in — with light-time and
aberration corrections applied.

Everything astrology adds on top lives in [`src/astro/engine.ts`](src/astro/engine.ts):
obliquity and nutation, apparent sidereal time, the Ascendant and Midheaven,
**Placidus** house cusps, the true lunar node, mean Lilith, the Part of Fortune,
and the aspect grid.

A few notes on the choices made there:

- **Placidus cusps** are solved by fixed-point iteration: each intermediate cusp
  sits at a fixed fraction of its own semi-arc, and the semi-arc depends on the
  cusp's declination, which depends on the cusp. Inside the polar circles
  Placidus is undefined, so the engine falls back to Porphyry and says so.
- **The true node** is taken from the Moon's orbital angular momentum
  (`r × v`) rather than the mean-node polynomial, so it is exact for the instant.
- **The Part of Fortune** uses the day formula (`ASC + Moon − Sun`) for a chart
  born with the Sun above the horizon, and the night formula otherwise.
- **Retrograde and stationary** states come from a finite difference of true
  longitude over ±12 hours, so they are measured rather than looked up.

### Checks

The Meeus routines were verified against the worked examples in
*Astronomical Algorithms* (2nd ed.):

| Quantity | Reference | Computed |
|---|---|---|
| Nutation Δψ, Δε (ex. 22.a) | −3.788″, +9.443″ | −3.773″, +9.449″ |
| Mean sidereal time (ex. 12.a) | 13h10m46.3668s | 13h10m46.3668s |
| Moon λ, β (ex. 47.a) | 133.162655°, −3.229126° | identical to 6 dp |

The Ascendant and Midheaven were checked geometrically: at Anton's birth moment
the computed Ascendant sits at altitude 0.000° and azimuth 100.7° (rising, due
east) and the Midheaven at azimuth 180.000° (exactly on the meridian).

## Changing the birth data

Everything is driven by one file — [`src/data/birth.ts`](src/data/birth.ts).
Set the date, local clock time, the UTC offset **actually in force at birth**
(daylight saving included), and the coordinates. The wheel, the houses, the
aspects and the letter all recompute; the interpretation copy covers all twelve
signs, so it stays correct.

## A note

Astrology is not science. It is a very old and very beautiful way of telling
someone that they are welcome here.
