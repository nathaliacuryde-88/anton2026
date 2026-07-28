/**
 * Natal chart engine.
 *
 * Planetary positions come from `astronomy-engine` (VSOP87/ELP-derived, good to
 * a few arcseconds) rotated into the true ecliptic of date, which is the frame
 * the tropical zodiac is measured in.
 *
 * Everything astrology adds on top of astronomy — obliquity, sidereal time,
 * the Ascendant/Midheaven, Placidus house cusps, the lunar nodes, Lilith, the
 * Part of Fortune and the aspect grid — is computed here. The obliquity,
 * nutation and sidereal-time routines follow Meeus, *Astronomical Algorithms*
 * (2nd ed.) and were checked against the worked examples in chapters 12 and 22.
 */

import * as Astronomy from 'astronomy-engine';

import {
  ASPECTS,
  AspectKey,
  Bilingual,
  BODIES,
  BODY_KEYS,
  BodyKey,
  SIGNS,
} from './constants';

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

const sin = (deg: number) => Math.sin(deg * D2R);
const cos = (deg: number) => Math.cos(deg * D2R);
const tan = (deg: number) => Math.tan(deg * D2R);
const asin = (x: number) => Math.asin(x) * R2D;
const atan2 = (y: number, x: number) => Math.atan2(y, x) * R2D;

export const norm360 = (deg: number) => ((deg % 360) + 360) % 360;

/** Shortest signed separation from `a` to `b`, in (-180, 180]. */
export const delta180 = (a: number, b: number) => {
  let d = norm360(b - a);
  if (d > 180) d -= 360;
  return d;
};

// ---------------------------------------------------------------------------
// Birth data
// ---------------------------------------------------------------------------

export type BirthData = {
  name: string;
  year: number;
  month: number; // 1-12
  day: number;
  hour: number; // local clock time, 24h
  minute: number;
  /** Hours east of UTC actually in force at birth (e.g. +2 for German summer time). */
  tzOffset: number;
  tzLabel: string;
  latitude: number; // north positive
  longitude: number; // east positive
  place: Bilingual;
};

// ---------------------------------------------------------------------------
// Time & frame
// ---------------------------------------------------------------------------

export function julianDay(y: number, m: number, d: number, hours = 0): number {
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    d +
    B -
    1524.5 +
    hours / 24
  );
}

/** Mean obliquity of the ecliptic (Meeus 22.2), degrees. */
function meanObliquity(T: number): number {
  return (
    23.43929111 - (46.815 * T + 0.00059 * T * T - 0.001813 * T * T * T) / 3600
  );
}

/** Nutation in longitude and obliquity (Meeus ch. 22, principal terms), degrees. */
function nutation(T: number): { dpsi: number; deps: number } {
  const D = 297.85036 + 445267.11148 * T - 0.0019142 * T * T;
  const M = 357.52772 + 35999.05034 * T - 0.0001603 * T * T;
  const Mp = 134.96298 + 477198.867398 * T + 0.0086972 * T * T;
  const F = 93.27191 + 483202.017538 * T - 0.0036825 * T * T;
  const Om = 125.04452 - 1934.136261 * T + 0.0020708 * T * T;

  const dpsi =
    (-171996 - 174.2 * T) * sin(Om) +
    (-13187 - 1.6 * T) * sin(-2 * D + 2 * F + 2 * Om) +
    -2274 * sin(2 * F + 2 * Om) +
    2062 * sin(2 * Om) +
    (1426 - 3.4 * T) * sin(M) +
    712 * sin(Mp) +
    -517 * sin(-2 * D + M + 2 * F + 2 * Om) +
    -386 * sin(2 * F + Om) +
    -301 * sin(Mp + 2 * F + 2 * Om) +
    217 * sin(-2 * D - M + 2 * F + 2 * Om) +
    -158 * sin(-2 * D + Mp) +
    129 * sin(-2 * D + 2 * F + Om) +
    123 * sin(-Mp + 2 * F + 2 * Om);

  const deps =
    (92025 + 8.9 * T) * cos(Om) +
    (5736 - 3.1 * T) * cos(-2 * D + 2 * F + 2 * Om) +
    977 * cos(2 * F + 2 * Om) +
    -895 * cos(2 * Om) +
    54 * cos(M) +
    -7 * cos(Mp) +
    224 * cos(-2 * D + M + 2 * F + 2 * Om) +
    200 * cos(2 * F + Om) +
    129 * cos(Mp + 2 * F + 2 * Om) +
    -95 * cos(-2 * D - M + 2 * F + 2 * Om);

  return { dpsi: (dpsi * 0.0001) / 3600, deps: (deps * 0.0001) / 3600 };
}

/** Apparent sidereal time at Greenwich (Meeus 12.4), degrees. */
function apparentGST(jdUT: number, dpsi: number, eps: number): number {
  const T = (jdUT - 2451545.0) / 36525;
  const theta =
    280.46061837 +
    360.98564736629 * (jdUT - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000;
  return norm360(norm360(theta) + dpsi * cos(eps));
}

// ---------------------------------------------------------------------------
// Bodies
// ---------------------------------------------------------------------------

const ASTRO_BODY: Partial<Record<BodyKey, Astronomy.Body>> = {
  sun: Astronomy.Body.Sun,
  mercury: Astronomy.Body.Mercury,
  venus: Astronomy.Body.Venus,
  mars: Astronomy.Body.Mars,
  jupiter: Astronomy.Body.Jupiter,
  saturn: Astronomy.Body.Saturn,
  uranus: Astronomy.Body.Uranus,
  neptune: Astronomy.Body.Neptune,
  pluto: Astronomy.Body.Pluto,
};

/** Geocentric apparent position in the true ecliptic of date. */
function eclipticOfDate(
  body: Astronomy.Body,
  time: Astronomy.AstroTime,
): { lon: number; lat: number } {
  const eqj = Astronomy.GeoVector(body, time, true); // light-time + aberration
  const ect = Astronomy.RotateVector(Astronomy.Rotation_EQJ_ECT(time), eqj);
  const sph = Astronomy.SphereFromVector(ect);
  return { lon: norm360(sph.lon), lat: sph.lat };
}

/**
 * True lunar node: where the Moon's instantaneous orbital plane crosses the
 * ecliptic. Taken from the orbital angular momentum r x v, so it needs no
 * search and is exact for the given instant.
 */
function trueNode(time: Astronomy.AstroTime): number {
  const state = Astronomy.GeoMoonState(time);
  const rot = Astronomy.Rotation_EQJ_ECT(time);
  const r = Astronomy.RotateVector(
    rot,
    new Astronomy.Vector(state.x, state.y, state.z, time),
  );
  const v = Astronomy.RotateVector(
    rot,
    new Astronomy.Vector(state.vx, state.vy, state.vz, time),
  );
  // h = r x v is normal to the orbit; the ascending node lies along z_hat x h.
  const hx = r.y * v.z - r.z * v.y;
  const hy = r.z * v.x - r.x * v.z;
  return norm360(atan2(hx, -hy));
}

/** Mean lunar apogee, the "Black Moon Lilith" of most chart software (Meeus). */
function meanLilith(T: number): number {
  return norm360(
    83.3532465 +
      4069.0137287 * T -
      0.010325 * T * T -
      (T * T * T) / 80053 +
      (T * T * T * T) / 18999000,
  );
}

// ---------------------------------------------------------------------------
// Angles & houses
// ---------------------------------------------------------------------------

function ascendantOf(ramc: number, eps: number, lat: number): number {
  return norm360(
    atan2(cos(ramc), -(sin(ramc) * cos(eps) + tan(lat) * sin(eps))),
  );
}

function midheavenOf(ramc: number, eps: number): number {
  return norm360(atan2(sin(ramc), cos(ramc) * cos(eps)));
}

/** Ecliptic longitude of the point on the ecliptic with the given right ascension. */
function raToLon(ra: number, eps: number): number {
  return norm360(atan2(sin(ra), cos(ra) * cos(eps)));
}

export type HouseSystem = 'placidus' | 'porphyry';

/**
 * Porphyry cusps: each quadrant between the angles is trisected. Used as the
 * fallback wherever Placidus degenerates (inside the polar circles).
 */
function porphyryCusps(asc: number, mc: number): number[] {
  const ic = norm360(mc + 180);
  const dsc = norm360(asc + 180);
  const q1 = norm360(asc - mc) / 3; // MC -> ASC, houses 11 and 12
  const q2 = norm360(ic - asc) / 3; // ASC -> IC, houses 2 and 3
  return [
    asc,
    norm360(asc + q2),
    norm360(asc + 2 * q2),
    ic,
    norm360(ic + q1),
    norm360(ic + 2 * q1),
    dsc,
    norm360(dsc + q2),
    norm360(dsc + 2 * q2),
    mc,
    norm360(mc + q1),
    norm360(mc + 2 * q1),
  ];
}

/**
 * Placidus cusps.
 *
 * Each intermediate cusp sits at a fixed fraction of a point's own semi-arc:
 * cusp 11 one third of the way from the MC to the Ascendant, cusp 12 two
 * thirds, and cusps 2 and 3 likewise between the IC and the Ascendant. The
 * semi-arc depends on the cusp's declination, which depends on the cusp — so
 * the hour angle is solved by fixed-point iteration.
 */
function placidusCusps(
  ramc: number,
  eps: number,
  lat: number,
): { cusps: number[]; system: HouseSystem } {
  const asc = ascendantOf(ramc, eps, lat);
  const mc = midheavenOf(ramc, eps);

  const solve = (offset: number, frac: number, nocturnal: boolean): number | null => {
    let ra = norm360(ramc + offset);
    for (let i = 0; i < 60; i++) {
      const dec = asin(sin(eps) * sin(raToLon(ra, eps)));
      const t = tan(lat) * tan(dec);
      if (Math.abs(t) > 1) return null; // cusp never rises: Placidus undefined
      const ad = asin(t); // ascensional difference
      const next = nocturnal
        ? norm360(ramc + 180 - frac * (90 - ad))
        : norm360(ramc + frac * (90 + ad));
      const moved = Math.abs(delta180(ra, next));
      ra = next;
      if (moved < 1e-10) break;
    }
    return raToLon(ra, eps);
  };

  const c11 = solve(30, 1 / 3, false);
  const c12 = solve(60, 2 / 3, false);
  const c2 = solve(120, 2 / 3, true);
  const c3 = solve(150, 1 / 3, true);

  if (c11 === null || c12 === null || c2 === null || c3 === null) {
    return { cusps: porphyryCusps(asc, mc), system: 'porphyry' };
  }

  return {
    cusps: [
      asc,
      c2,
      c3,
      norm360(mc + 180),
      norm360(c11 + 180),
      norm360(c12 + 180),
      norm360(asc + 180),
      norm360(c2 + 180),
      norm360(c3 + 180),
      mc,
      c11,
      c12,
    ],
    system: 'placidus',
  };
}

/** 1-based house number containing `lon`, given the twelve cusps. */
export function houseOf(lon: number, cusps: number[]): number {
  for (let i = 0; i < 12; i++) {
    const span = norm360(cusps[(i + 1) % 12] - cusps[i]);
    const into = norm360(lon - cusps[i]);
    if (into < span) return i + 1;
  }
  return 1;
}

// ---------------------------------------------------------------------------
// Chart
// ---------------------------------------------------------------------------

export type Placement = {
  key: BodyKey;
  lon: number;
  lat: number;
  /** Degrees of ecliptic longitude per day; negative means retrograde. */
  speed: number;
  retrograde: boolean;
  /** Near a direction change: moving at under 5% of its usual daily motion. */
  stationary: boolean;
  signIndex: number;
  /** Degrees into the sign, 0-30. */
  degreeInSign: number;
  house: number;
};

export type Aspect = {
  a: BodyKey | 'asc' | 'mc';
  b: BodyKey | 'asc' | 'mc';
  key: AspectKey;
  /** Absolute difference from exactness, degrees. */
  orb: number;
  /** 0 = exact, 1 = at the edge of the allowed orb. */
  looseness: number;
  applying: boolean;
};

export type Chart = {
  birth: BirthData;
  jdUT: number;
  utcDate: Date;
  obliquity: number;
  ramc: number;
  asc: number;
  mc: number;
  cusps: number[];
  houseSystem: HouseSystem;
  placements: Record<BodyKey, Placement>;
  ordered: Placement[];
  aspects: Aspect[];
  /** True when the Sun was above the horizon (houses 7-12). */
  dayChart: boolean;
  elementCounts: Record<string, number>;
  modalityCounts: Record<string, number>;
};

const LUMINARY_BONUS = 1.5;

/** Mean daily motion in ecliptic longitude, degrees, used to flag stations. */
const MEAN_MOTION: Partial<Record<BodyKey, number>> = {
  mercury: 1.383,
  venus: 1.602,
  mars: 0.524,
  jupiter: 0.083,
  saturn: 0.0335,
  uranus: 0.0117,
  neptune: 0.006,
  pluto: 0.004,
};

function aspectOrb(key: AspectKey, a: string, b: string): number {
  const def = ASPECTS.find((x) => x.key === key)!;
  const isLum = (k: string) => k === 'sun' || k === 'moon' || k === 'asc' || k === 'mc';
  return def.orb + (isLum(a) || isLum(b) ? LUMINARY_BONUS : 0);
}

export function computeChart(birth: BirthData): Chart {
  const utHours = birth.hour + birth.minute / 60 - birth.tzOffset;
  const jdUT = julianDay(birth.year, birth.month, birth.day, utHours);

  const utcDate = new Date(
    Date.UTC(birth.year, birth.month - 1, birth.day, 0, 0, 0) +
      Math.round(utHours * 3600 * 1000),
  );
  const time = Astronomy.MakeTime(utcDate);

  // astronomy-engine's `tt` already carries the TT-UT1 correction, so use it
  // for everything measured against dynamical time.
  const T = time.tt / 36525;
  const { dpsi, deps } = nutation(T);
  const obliquity = meanObliquity(T) + deps;

  // --- bodies -------------------------------------------------------------
  const raw: Record<string, { lon: number; lat: number; speed: number }> = {};

  const dtDays = 0.5;
  const timeBefore = time.AddDays(-dtDays);
  const timeAfter = time.AddDays(dtDays);

  for (const key of BODY_KEYS) {
    const body = ASTRO_BODY[key];
    if (!body) continue;
    const now = eclipticOfDate(body, time);
    const before = eclipticOfDate(body, timeBefore).lon;
    const after = eclipticOfDate(body, timeAfter).lon;
    raw[key] = {
      lon: now.lon,
      lat: now.lat,
      speed: delta180(before, after) / (2 * dtDays),
    };
  }

  // The Moon has its own high-precision ecliptic-of-date routine.
  const moonNow = Astronomy.EclipticGeoMoon(time);
  raw.moon = {
    lon: norm360(moonNow.lon),
    lat: moonNow.lat,
    speed:
      delta180(
        norm360(Astronomy.EclipticGeoMoon(timeBefore).lon),
        norm360(Astronomy.EclipticGeoMoon(timeAfter).lon),
      ) /
      (2 * dtDays),
  };

  const node = trueNode(time);
  const nodeSpeed =
    delta180(trueNode(timeBefore), trueNode(timeAfter)) / (2 * dtDays);
  raw.northNode = { lon: node, lat: 0, speed: nodeSpeed };
  raw.southNode = { lon: norm360(node + 180), lat: 0, speed: nodeSpeed };

  const lilith = meanLilith(T);
  raw.lilith = {
    lon: lilith,
    lat: 0,
    speed: meanLilith(T + dtDays / 36525) - meanLilith(T - dtDays / 36525),
  };

  // --- angles & houses ----------------------------------------------------
  const gst = apparentGST(jdUT, dpsi, obliquity);
  const ramc = norm360(gst + birth.longitude);
  const { cusps, system } = placidusCusps(ramc, obliquity, birth.latitude);
  const asc = cusps[0];
  const mc = cusps[9];

  // --- Part of Fortune ----------------------------------------------------
  const sunHouse = houseOf(raw.sun.lon, cusps);
  const dayChart = sunHouse >= 7;
  const fortune = dayChart
    ? norm360(asc + raw.moon.lon - raw.sun.lon)
    : norm360(asc + raw.sun.lon - raw.moon.lon);
  raw.fortune = { lon: fortune, lat: 0, speed: 0 };

  // --- assemble placements ------------------------------------------------
  const placements = {} as Record<BodyKey, Placement>;
  for (const key of BODY_KEYS) {
    const r = raw[key];
    const signIndex = Math.floor(norm360(r.lon) / 30);
    placements[key] = {
      key,
      lon: norm360(r.lon),
      lat: r.lat,
      speed: r.speed,
      // The lunar node moves retrograde almost always; the Part of Fortune is a
      // derived point and is never marked retrograde.
      retrograde: key === 'fortune' ? false : r.speed < 0,
      stationary:
        MEAN_MOTION[key] !== undefined &&
        Math.abs(r.speed) < 0.05 * MEAN_MOTION[key]!,
      signIndex,
      degreeInSign: norm360(r.lon) - signIndex * 30,
      house: houseOf(r.lon, cusps),
    };
  }

  // --- aspects ------------------------------------------------------------
  type AspectPoint = { key: BodyKey | 'asc' | 'mc'; lon: number; speed: number };
  const aspectPoints: AspectPoint[] = [
    // The South Node mirrors the North exactly, and the Part of Fortune is
    // derived from the Sun, Moon and Ascendant, so both would only add
    // duplicate lines to the grid.
    ...BODY_KEYS.filter((k) => k !== 'southNode' && k !== 'fortune').map(
      (k): AspectPoint => ({
        key: k,
        lon: placements[k].lon,
        speed: placements[k].speed,
      }),
    ),
    { key: 'asc', lon: asc, speed: 0 },
    { key: 'mc', lon: mc, speed: 0 },
  ];

  const aspects: Aspect[] = [];
  for (let i = 0; i < aspectPoints.length; i++) {
    for (let j = i + 1; j < aspectPoints.length; j++) {
      const p = aspectPoints[i];
      const q = aspectPoints[j];
      // The Ascendant and Midheaven are fixed relative to each other by the
      // geometry of the chart, so an aspect between them says nothing.
      const isAngle = (k: string) => k === 'asc' || k === 'mc';
      if (isAngle(p.key) && isAngle(q.key)) continue;
      const sep = Math.abs(delta180(p.lon, q.lon));
      for (const def of ASPECTS) {
        const orb = Math.abs(sep - def.angle);
        const allowed = aspectOrb(def.key, p.key, q.key);
        if (orb > allowed) continue;
        // Separation shrinking over the next hours => the aspect is applying.
        const step = 0.02;
        const sepLater = Math.abs(
          delta180(p.lon + p.speed * step, q.lon + q.speed * step),
        );
        aspects.push({
          a: p.key,
          b: q.key,
          key: def.key,
          orb,
          looseness: orb / allowed,
          applying: Math.abs(sepLater - def.angle) < orb,
        });
        break; // one aspect per pair: the tightest match wins
      }
    }
  }
  aspects.sort((x, y) => x.orb - y.orb);

  // --- element / modality balance ----------------------------------------
  // Counted over the ten traditional bodies plus the Ascendant, which is how
  // the balance is normally read.
  const elementCounts: Record<string, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  const modalityCounts: Record<string, number> = { cardinal: 0, fixed: 0, mutable: 0 };
  const counted: Array<number> = BODY_KEYS.filter(
    (k) => !BODIES[k].point,
  ).map((k) => placements[k].signIndex);
  counted.push(Math.floor(asc / 30));
  for (const idx of counted) {
    elementCounts[SIGNS[idx].element] += 1;
    modalityCounts[SIGNS[idx].modality] += 1;
  }

  return {
    birth,
    jdUT,
    utcDate,
    obliquity,
    ramc,
    asc,
    mc,
    cusps,
    houseSystem: system,
    placements,
    ordered: BODY_KEYS.map((k) => placements[k]),
    aspects,
    dayChart,
    elementCounts,
    modalityCounts,
  };
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

/** "17° 57′" */
export function formatDegree(degreeInSign: number): string {
  const d = Math.floor(degreeInSign);
  const m = Math.floor((degreeInSign - d) * 60);
  return `${d}° ${String(m).padStart(2, '0')}′`;
}

/** "17° 57′ ♎ Libra" style parts, for the caller to lay out. */
export function splitLongitude(lon: number) {
  const signIndex = Math.floor(norm360(lon) / 30);
  const degreeInSign = norm360(lon) - signIndex * 30;
  return { signIndex, degreeInSign, sign: SIGNS[signIndex] };
}
