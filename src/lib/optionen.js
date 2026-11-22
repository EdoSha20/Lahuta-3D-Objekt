// Alle Optionen des Konfigurators an einem Ort
export const HOLZ = [
  { id: 'walnuss', name: 'Walnuss', farbe: '#7a5940', preis: 40 },
  { id: 'ahorn', name: 'Ahorn', farbe: '#dbbb8a', preis: 20 },
  { id: 'kirsche', name: 'Kirsche', farbe: '#b3694d', preis: 30 },
  { id: 'ebenholz', name: 'Ebenholz', farbe: '#262120', preis: 90 }
]

export const FELL = [
  { id: 'ziege', name: 'Ziege', farbe: '#e8d6b5', preis: 0 },
  { id: 'schaf', name: 'Schaf', farbe: '#f2ebd9', preis: 15 },
  { id: 'kalb', name: 'Kalb', farbe: '#c4a17a', preis: 25 }
]

export const METALL = [
  { id: 'messing', name: 'Messing', farbe: '#e8cc8a', preis: 20 },
  { id: 'silber', name: 'Silber', farbe: '#eeeef0', preis: 35 },
  { id: 'kupfer', name: 'Kupfer', farbe: '#d98f6a', preis: 25 }
]

export const LICHT = [
  { id: 'studio', name: 'Studio', farbe: '#ffffff', ambient: 0.8, key: 2.5 },
  { id: 'warm', name: 'Warm', farbe: '#ffd6a0', ambient: 0.7, key: 2.6 },
  { id: 'abend', name: 'Abend', farbe: '#ff9a6a', ambient: 0.35, key: 2.2 }
]

export const STANDARD = {
  holz: 'walnuss',
  fell: 'ziege',
  metall: 'messing',
  licht: 'warm',
  breit: 0,
  tief: 0,
  lang: 0
}

export const PRESETS = [
  { name: 'Tradition', werte: { holz: 'walnuss', fell: 'ziege', metall: 'messing', licht: 'warm', breit: 0, tief: 0, lang: 0 } },
  { name: 'Dunkle Nacht', werte: { holz: 'ebenholz', fell: 'kalb', metall: 'silber', licht: 'abend', breit: 0.3, tief: 0.2, lang: 0.2 } },
  { name: 'Helle Berge', werte: { holz: 'ahorn', fell: 'schaf', metall: 'silber', licht: 'studio', breit: 0, tief: 0, lang: 0.3 } },
  { name: 'Heldensaal', werte: { holz: 'kirsche', fell: 'schaf', metall: 'messing', licht: 'warm', breit: 0.5, tief: 0.5, lang: 0.6 } }
]

// Kamera-Ansichten (three.js: Y = oben, Vorderseite = +Z)
export const VIEWS = [
  { name: 'Gesamt', pos: [0.35, 0.65, 2.4], target: [0.17, 0.5, 0] },
  { name: 'Korpus', pos: [0.3, 0.3, 0.95], target: [0.02, 0.15, 0] },
  { name: 'Kopf', pos: [0.45, 1.0, 0.75], target: [0, 0.92, 0] },
  { name: 'Bogen', pos: [0.95, 0.45, 1.25], target: [0.31, 0.35, 0] },
  { name: 'Seite', pos: [2.3, 0.6, 0.4], target: [0.1, 0.5, 0] }
]

const finde = (liste, id) => liste.find((x) => x.id === id)

export function preis(c) {
  const form = c.breit * 30 + c.tief * 20 + c.lang * 45
  return Math.round(
    189 + (finde(HOLZ, c.holz)?.preis ?? 0) + (finde(FELL, c.fell)?.preis ?? 0) + (finde(METALL, c.metall)?.preis ?? 0) + form
  )
}

export function zusammenfassung(c) {
  return (
    `Meine Lahuta: Holz ${finde(HOLZ, c.holz)?.name}, Fell ${finde(FELL, c.fell)?.name}, Metall ${finde(METALL, c.metall)?.name}, ` +
    `Korpus breiter ${Math.round(c.breit * 100)} %, tiefer ${Math.round(c.tief * 100)} %, Hals länger ${Math.round(c.lang * 100)} %. ` +
    `Preis: ca. ${preis(c)} € (fiktiv).`
  )
}