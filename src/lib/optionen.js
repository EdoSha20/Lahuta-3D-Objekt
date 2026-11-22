
/**
 * Alle Optionen für den Lahuta-Konfigurator.
 * Materialien, Licht, Kamera, Presets und Preisberechnung.
 */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   farbe: string,
 *   preis: number
 * }} MaterialOption
 */

/**
 * @typedef {{
 *   holz: string,
 *   fell: string,
 *   metall: string,
 *   licht: string,
 *   breit: number,
 *   tief: number,
 *   lang: number
 * }} LahutaConfig
 */

/**
 * @typedef {{
 *   name: string,
 *   pos: [number, number, number],
 *   target: [number, number, number]
 * }} KameraAnsicht
 */

// HOLZARTEN
/** @type {MaterialOption[]} */
export const HOLZ = [
  { id: 'walnuss', name: 'Walnuss', farbe: '#7a5940', preis: 40 },
  { id: 'ahorn', name: 'Ahorn', farbe: '#dbbb8a', preis: 20 },
  { id: 'kirsche', name: 'Kirsche', farbe: '#b3694d', preis: 30 },
  { id: 'ebenholz', name: 'Ebenholz', farbe: '#262120', preis: 90 }
]

// FELLMATERIALIEN
/** @type {MaterialOption[]} */
export const FELL = [
  { id: 'ziege', name: 'Ziege', farbe: '#e8d6b5', preis: 0 },
  { id: 'schaf', name: 'Schaf', farbe: '#f2ebd9', preis: 15 },
  { id: 'kalb', name: 'Kalb', farbe: '#c4a17a', preis: 25 }
]

// METALLDETAILS
/** @type {MaterialOption[]} */
export const METALL = [
  { id: 'messing', name: 'Messing', farbe: '#e8cc8a', preis: 20 },
  { id: 'silber', name: 'Silber', farbe: '#eeeef0', preis: 35 },
  { id: 'kupfer', name: 'Kupfer', farbe: '#d98f6a', preis: 25 }
]

// LICHTSTIMMUNGEN
export const LICHT = [
  {
    id: 'studio',
    name: 'Studio',
    farbe: '#ffffff',
    ambient: 0.8,
    key: 2.5
  },
  {
    id: 'warm',
    name: 'Warm',
    farbe: '#ffd6a0',
    ambient: 0.7,
    key: 2.6
  },
  {
    id: 'abend',
    name: 'Abend',
    farbe: '#ff9a6a',
    ambient: 0.35,
    key: 2.2
  }
]

// STANDARDKONFIGURATION
/** @type {LahutaConfig} */
export const STANDARD = {
  holz: 'walnuss',
  fell: 'ziege',
  metall: 'messing',
  licht: 'warm',
  breit: 0,
  tief: 0,
  lang: 0
}

// FERTIGE DESIGN-KOMBINATIONEN
/** @type {{ name: string, werte: LahutaConfig }[]} */
export const PRESETS = [
  {
    name: 'Tradition',
    werte: {
      holz: 'walnuss',
      fell: 'ziege',
      metall: 'messing',
      licht: 'warm',
      breit: 0,
      tief: 0,
      lang: 0
    }
  },
  {
    name: 'Dunkle Nacht',
    werte: {
      holz: 'ebenholz',
      fell: 'kalb',
      metall: 'silber',
      licht: 'abend',
      breit: 0.3,
      tief: 0.2,
      lang: 0.2
    }
  },
  {
    name: 'Helle Berge',
    werte: {
      holz: 'ahorn',
      fell: 'schaf',
      metall: 'silber',
      licht: 'studio',
      breit: 0,
      tief: 0,
      lang: 0.3
    }
  },
  {
    name: 'Heldensaal',
    werte: {
      holz: 'kirsche',
      fell: 'schaf',
      metall: 'messing',
      licht: 'warm',
      breit: 0.5,
      tief: 0.5,
      lang: 0.6
    }
  }
]

// KAMERAANSICHTEN
// Three.js: Y = oben, Vorderseite = +Z
/** @type {KameraAnsicht[]} */
export const VIEWS = [
  {
    name: 'Gesamt',
    pos: [0.35, 0.65, 2.4],
    target: [0.17, 0.5, 0]
  },
  {
    name: 'Korpus',
    pos: [0.3, 0.3, 0.95],
    target: [0.02, 0.15, 0]
  },
  {
    name: 'Kopf',
    pos: [0.45, 1.0, 0.75],
    target: [0, 0.92, 0]
  },
  {
    name: 'Bogen',
    pos: [0.95, 0.45, 1.25],
    target: [0.31, 0.35, 0]
  },
  {
    name: 'Seite',
    pos: [2.3, 0.6, 0.4],
    target: [0.1, 0.5, 0]
  }
]

// HILFSFUNKTIONEN

/**
 * Sucht eine Materialoption anhand ihrer ID.
 *
 * @param {MaterialOption[]} liste
 * @param {string} id
 * @returns {MaterialOption | undefined}
 */
const finde = (liste, id) => {
  return liste.find((option) => option.id === id)
}

/**
 * Berechnet den fiktiven Preis der Lahuta.
 *
 * @param {LahutaConfig} config
 * @returns {number}
 */
export function preis(config) {
  const grundpreis = 189

  const holzpreis = finde(HOLZ, config.holz)?.preis ?? 0
  const fellpreis = finde(FELL, config.fell)?.preis ?? 0
  const metallpreis = finde(METALL, config.metall)?.preis ?? 0

  const formpreis =
    config.breit * 30 +
    config.tief * 20 +
    config.lang * 45

  return Math.round(
    grundpreis +
    holzpreis +
    fellpreis +
    metallpreis +
    formpreis
  )
}

/**
 * Erstellt eine lesbare Zusammenfassung der Konfiguration.
 *
 * @param {LahutaConfig} config
 * @returns {string}
 */
export function zusammenfassung(config) {
  const holz = finde(HOLZ, config.holz)?.name ?? 'Unbekannt'
  const fell = finde(FELL, config.fell)?.name ?? 'Unbekannt'
  const metall = finde(METALL, config.metall)?.name ?? 'Unbekannt'

  return [
    'Meine individuelle Lahuta',
    '',
    `Holz: ${holz}`,
    `Fell: ${fell}`,
    `Metall: ${metall}`,
    `Licht: ${config.licht}`,
    '',
    `Korpusbreite: ${Math.round(config.breit * 100)} %`,
    `Korpustiefe: ${Math.round(config.tief * 100)} %`,
    `Halslänge: ${Math.round(config.lang * 100)} %`,
    '',
    `Preis: ca. ${preis(config)} € (fiktiv)`,
    '',
    'Erstellt mit Lahuta Atelier'
  ].join('\n')
}
