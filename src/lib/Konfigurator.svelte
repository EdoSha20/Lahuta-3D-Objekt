
<script>
  import { onMount } from 'svelte'
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import {
    HOLZ, FELL, METALL, LICHT,
    PRESETS, VIEWS, STANDARD,
    preis, zusammenfassung
  } from './optionen.js'

  let geladen = $state(false)
  let config = $state({ ...STANDARD })

  /** @type {{ pos: [number, number, number], target: [number, number, number], id: number } | null} */
  let view = $state(null)

  let drehen = $state(false)
  let kopiert = $state(false)
  let bereit = $state(false)
  let aktiverTab = $state('material')

  /** @type {{ screenshot: () => string } | null} */
  let api = $state(null)

  const gesamtpreis = $derived(preis(config))

  onMount(() => {
    try {
      const gespeichert = localStorage.getItem('lahuta-config')

      if (gespeichert) {
        const daten = JSON.parse(gespeichert)

        if (daten && typeof daten === 'object') {
          Object.assign(config, daten)
        }
      }
    } catch (e) {
      console.warn('Konfiguration konnte nicht geladen werden', e)
    }

    bereit = true
  })

  $effect(() => {
    const daten = JSON.stringify(config)

    if (bereit) {
      try {
        localStorage.setItem('lahuta-config', daten)
      } catch (e) {
        console.warn('Speichern nicht möglich', e)
      }
    }
  })

  /** @param {(typeof PRESETS)[number]} p */
  function preset(p) {
    Object.assign(config, p.werte)
  }

  function zuruecksetzen() {
    Object.assign(config, STANDARD)
  }

  /** @param {(typeof VIEWS)[number]} v */
  function ansicht(v) {
    view = {
      pos: v.pos,
      target: v.target,
      id: Math.random()
    }
  }

  function foto() {
    if (!api?.screenshot) return

    try {
      const a = document.createElement('a')
      a.href = api.screenshot()
      a.download = 'lahuta-atelier.png'
      a.click()
    } catch (e) {
      console.error('Screenshot fehlgeschlagen', e)
    }
  }

  async function kopieren() {
    try {
      await navigator.clipboard.writeText(zusammenfassung(config))
      kopiert = true
      setTimeout(() => (kopiert = false), 2000)
    } catch (e) {
      console.error('Kopieren fehlgeschlagen', e)
    }
  }
</script>

<div class="atelier">
  <section class="stage" aria-label="Interaktive 3D-Ansicht">
    <div class="stage-top">
      <span class="stage-brand">Lahuta / 3D-Ansicht</span>
      <span class="stage-number">Atelier Nº 01</span>
    </div>

    <div class="canvas-area">
      <Canvas>
        <Scene
          {config}
          {view}
          autoRotate={drehen}
          hintergrund="#eae4dc"
          onloaded={() => (geladen = true)}
          onready={(a) => (api = a)}
        />
      </Canvas>
    </div>

    {#if !geladen}
      <div class="loading">
        <div class="loader"></div>
        <h3>Die Lahuta wird vorbereitet</h3>
        <p>Das 3D-Modell wird geladen …</p>
      </div>
    {/if}

    {#if geladen}
      <div class="stage-controls">
        <div class="view-buttons">
          {#each VIEWS as v}
            <button onclick={() => ansicht(v)}>
              {v.name}
            </button>
          {/each}
        </div>

        <button
          class="rotate-button"
          class:active={drehen}
          aria-pressed={drehen}
          onclick={() => (drehen = !drehen)}
        >
          <span>⟳</span>
          {drehen ? 'Rotation stoppen' : 'Auto-Rotation'}
        </button>
      </div>

      <div class="stage-bottom">
        <span>Ziehen zum Drehen</span>
        <span>Scrollen zum Zoomen</span>
      </div>
    {/if}
  </section>

  <aside class="panel">
    <div class="panel-header">
      <p class="eyebrow">Dein Instrument</p>
      <h2>Die Lahuta <em>gestalten.</em></h2>
      <p>
        Wähle Materialien, passe die Form an
        und entdecke deine eigene Gestaltung.
      </p>
    </div>

    <div class="tabs">
      <button
        class:selected={aktiverTab === 'material'}
        onclick={() => (aktiverTab = 'material')}
      >
        Materialien
      </button>

      <button
        class:selected={aktiverTab === 'form'}
        onclick={() => (aktiverTab = 'form')}
      >
        Form
      </button>

      <button
        class:selected={aktiverTab === 'studio'}
        onclick={() => (aktiverTab = 'studio')}
      >
        Studio
      </button>
    </div>

    <div class="panel-body">
      {#if aktiverTab === 'material'}
        <div class="option-group">
          <div class="group-title">
            <span>01 — Holzart</span>
            <small>Material auswählen</small>
          </div>

          <div class="swatch-grid">
            {#each HOLZ as h (h.id)}
              <button
                class="swatch-option"
                class:chosen={config.holz === h.id}
                onclick={() => (config.holz = h.id)}
                aria-pressed={config.holz === h.id}
              >
                <span
                  class="swatch"
                  style:background={h.farbe}
                ></span>

                <span>{h.name}</span>

                {#if config.holz === h.id}
                  <span class="check">✓</span>
                {/if}
              </button>
            {/each}
          </div>
        </div>

        <div class="option-group">
          <div class="group-title">
            <span>02 — Fellmaterial</span>
            <small>Oberfläche</small>
          </div>

          <div class="swatch-grid">
            {#each FELL as f (f.id)}
              <button
                class="swatch-option"
                class:chosen={config.fell === f.id}
                onclick={() => (config.fell = f.id)}
                aria-pressed={config.fell === f.id}
              >
                <span
                  class="swatch"
                  style:background={f.farbe}
                ></span>

                <span>{f.name}</span>

                {#if config.fell === f.id}
                  <span class="check">✓</span>
                {/if}
              </button>
            {/each}
          </div>
        </div>

        <div class="option-group">
          <div class="group-title">
            <span>03 — Metalldetails</span>
            <small>Feine Akzente</small>
          </div>

          <div class="swatch-grid">
            {#each METALL as m (m.id)}
              <button
                class="swatch-option"
                class:chosen={config.metall === m.id}
                onclick={() => (config.metall = m.id)}
                aria-pressed={config.metall === m.id}
              >
                <span
                  class="swatch"
                  style:background={m.farbe}
                ></span>

                <span>{m.name}</span>

                {#if config.metall === m.id}
                  <span class="check">✓</span>
                {/if}
              </button>
            {/each}
          </div>
        </div>

      {:else if aktiverTab === 'form'}
        <div class="option-group">
          <div class="group-title">
            <span>04 — Proportionen</span>
            <small>Individuelle Form</small>
          </div>

          <p class="hint">
            Verändere die Proportionen deiner Lahuta.
            Die Anpassungen erscheinen direkt im 3D-Modell.
          </p>

          <div class="range-group">
            <label for="breit">
              <span>Korpusbreite</span>
              <span>{Math.round(config.breit * 100)}%</span>
            </label>

            <input
              id="breit"
              type="range"
              min="0"
              max="1"
              step="0.01"
              bind:value={config.breit}
            />
          </div>

          <div class="range-group">
            <label for="tief">
              <span>Korpustiefe</span>
              <span>{Math.round(config.tief * 100)}%</span>
            </label>

            <input
              id="tief"
              type="range"
              min="0"
              max="1"
              step="0.01"
              bind:value={config.tief}
            />
          </div>

          <div class="range-group">
            <label for="lang">
              <span>Halslänge</span>
              <span>{Math.round(config.lang * 100)}%</span>
            </label>

            <input
              id="lang"
              type="range"
              min="0"
              max="1"
              step="0.01"
              bind:value={config.lang}
            />
          </div>
        </div>

      {:else}
        <div class="option-group">
          <div class="group-title">
            <span>05 — Lichtstimmung</span>
            <small>Atmosphäre</small>
          </div>

          <div class="option-list">
            {#each LICHT as l (l.id)}
              <button
                class:chosen={config.licht === l.id}
                onclick={() => (config.licht = l.id)}
              >
                <span>{l.name}</span>
                <span>{config.licht === l.id ? '✓' : '○'}</span>
              </button>
            {/each}
          </div>
        </div>

        <div class="option-group">
          <div class="group-title">
            <span>06 — Kollektion</span>
            <small>Fertige Kombinationen</small>
          </div>

          <div class="option-list">
            {#each PRESETS as p}
              <button onclick={() => preset(p)}>
                <span>{p.name}</span>
                <span>↗</span>
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <div class="panel-footer">
      <div class="price">
        <div>
          <small>Deine Konfiguration</small>
          <span>Unverbindlicher Beispielpreis</span>
        </div>

        <strong>{gesamtpreis} €</strong>
      </div>

      <div class="actions">
        <button onclick={foto} disabled={!geladen || !api}>
          Foto
        </button>

        <button onclick={kopieren}>
          {kopiert ? 'Kopiert!' : 'Teilen'}
        </button>

        <button onclick={zuruecksetzen}>
          Zurücksetzen
        </button>
      </div>
    </div>
  </aside>
</div>

<style>
  .atelier {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 370px;
    width: 100%;
    height: 100%;
    min-height: 680px;
    background: #f5f1eb;
    color: #352c26;
    font-family: 'DM Sans', Arial, sans-serif;
  }

  button {
    font: inherit;
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;
  }

  button:focus-visible {
    outline: 2px solid #9d8069;
    outline-offset: 3px;
  }

  .stage {
    position: relative;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    background: #eae4dc;
  }

  .canvas-area {
    position: absolute;
    inset: 0;
  }

  .stage-top,
  .stage-bottom {
    position: absolute;
    left: 28px;
    right: 28px;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    pointer-events: none;
  }

  .stage-top {
    top: 27px;
  }

  .stage-bottom {
    bottom: 25px;
    color: #81766c;
    font-size: 11px;
  }

  .stage-brand,
  .stage-number {
    color: #716357;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.4px;
  }

  .stage-controls {
    position: absolute;
    top: 72px;
    left: 28px;
    right: 28px;
    z-index: 6;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 15px;
  }

  .view-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-width: 75%;
  }

  .view-buttons button,
  .rotate-button {
    padding: 10px 13px;
    border: 1px solid #d5c9bd;
    background: #f8f5f0ed;
    color: #625449;
    font-size: 11px;
    font-weight: 400;
    border-radius: 2px;
  }

  .view-buttons button:hover,
  .rotate-button:hover,
  .rotate-button.active {
    border-color: #a88d76;
    background: #e5d9cd;
    color: #3a2c23;
  }

  .rotate-button {
    white-space: nowrap;
  }

  .rotate-button span {
    margin-right: 5px;
    font-size: 15px;
  }

  .loading {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px;
    background: #eae4dc;
    color: #493b31;
    text-align: center;
  }

  .loader {
    width: 36px;
    height: 36px;
    border: 1px solid #c9bcb0;
    border-top-color: #826b56;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading h3 {
    margin: 24px 0 8px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 30px;
    font-weight: 400;
  }

  .loading p {
    color: #817367;
    font-size: 12px;
  }

  .panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    background: #f8f5f0;
    color: #352c26;
    border-left: 1px solid #ded5ca;
  }

  .panel-header {
    padding: 34px 28px 26px;
  }

  .eyebrow {
    margin: 0;
    color: #9b806a;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .panel-header h2 {
    margin: 15px 0 12px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 39px;
    line-height: 1.05;
    font-weight: 400;
    letter-spacing: -0.5px;
  }

  .panel-header em {
    color: #96755f;
    font-weight: 400;
  }

  .panel-header > p:last-child {
    margin: 0;
    color: #81766c;
    font-size: 12px;
    line-height: 1.8;
  }

  .tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #e4dbd1;
    border-bottom: 1px solid #e4dbd1;
  }

  .tabs button {
    padding: 17px 4px;
    border: 0;
    border-bottom: 1px solid transparent;
    background: transparent;
    color: #92867b;
    font-size: 12px;
    font-weight: 400;
  }

  .tabs button:hover {
    color: #4d3d31;
  }

  .tabs button.selected {
    border-bottom-color: #96755f;
    color: #4d3d31;
  }

  .panel-body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 10px 28px 25px;
  }

  .option-group {
    padding: 25px 0;
    border-bottom: 1px solid #e5dcd2;
  }

  .group-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 19px;
  }

  .group-title > span {
    color: #6d5a4c;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  .group-title small {
    color: #a0958b;
    font-size: 10px;
    font-weight: 400;
    text-align: right;
  }

  .swatch-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .swatch-option {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 49px;
    padding: 9px 11px;
    border: 1px solid #e0d8cf;
    border-radius: 2px;
    background: #fffdfa;
    color: #57483d;
    font-size: 11px;
    font-weight: 400;
    text-align: left;
  }

  .swatch-option:hover {
    border-color: #b8a18d;
  }

  .swatch-option.chosen {
    border-color: #a78b73;
    background: #f0e9e1;
  }

  .swatch {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border: 1px solid #c6b8a9;
    border-radius: 50%;
  }

  .check {
    margin-left: auto;
    color: #85664d;
    font-size: 12px;
  }

  .hint {
    margin: 0 0 30px;
    color: #83776c;
    font-size: 12px;
    line-height: 1.9;
  }

  .range-group {
    margin-bottom: 30px;
  }

  .range-group label {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin-bottom: 16px;
    color: #5f5045;
    font-size: 12px;
  }

  .range-group label span:last-child {
    color: #947760;
  }

  input[type="range"] {
    width: 100%;
    accent-color: #9d8069;
    cursor: pointer;
  }

  .option-list {
    display: grid;
    gap: 8px;
  }

  .option-list button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 15px;
    border: 1px solid #e0d8cf;
    border-radius: 2px;
    background: #fffdfa;
    color: #57483d;
    font-size: 12px;
    text-align: left;
  }

  .option-list button:hover,
  .option-list button.chosen {
    border-color: #a78b73;
    background: #f0e9e1;
  }

  .panel-footer {
    padding: 22px 28px 25px;
    border-top: 1px solid #e4dbd1;
    background: #f1ebe4;
  }

  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
  }

  .price > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .price small {
    color: #665549;
    font-size: 11px;
    font-weight: 400;
  }

  .price span {
    color: #978b80;
    font-size: 10px;
  }

  .price strong {
    color: #49372c;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 32px;
    font-weight: 400;
    white-space: nowrap;
  }

  .actions {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .actions button {
    min-height: 43px;
    padding: 10px 6px;
    border: 1px solid #cdbfb1;
    border-radius: 2px;
    background: transparent;
    color: #59483b;
    font-size: 11px;
    font-weight: 400;
  }

  .actions button:hover {
    border-color: #a78b73;
    background: #e7dcd0;
  }

  .actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 950px) {
    .atelier {
      grid-template-columns: 1fr;
      height: auto;
    }

    .stage {
      height: 580px;
    }

    .panel {
      border-left: 0;
      border-top: 1px solid #ded5ca;
    }

    .panel-body {
      overflow: visible;
    }
  }

  @media (max-width: 600px) {
    .stage {
      height: 490px;
    }

    .stage-top,
    .stage-bottom {
      left: 16px;
      right: 16px;
    }

    .stage-number {
      display: none;
    }

    .stage-controls {
      top: 65px;
      left: 16px;
      right: 16px;
      flex-direction: column;
    }

    .view-buttons {
      max-width: 100%;
    }

    .view-buttons button,
    .rotate-button {
      padding: 8px 9px;
      font-size: 10px;
    }

    .stage-bottom {
      font-size: 9px;
    }

    .panel-header,
    .panel-body,
    .panel-footer {
      padding-left: 20px;
      padding-right: 20px;
    }

    .panel-header h2 {
      font-size: 36px;
    }
  }
</style>
