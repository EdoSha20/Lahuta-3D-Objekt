
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
  let view = $state(null)
  let drehen = $state(false)
  let kopiert = $state(false)
  let bereit = $state(false)
  let aktiverTab = $state('material')
  let api = null

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

  function preset(p) {
    Object.assign(config, p.werte)
  }

  function zuruecksetzen() {
    Object.assign(config, STANDARD)
  }

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
      <div class="stage-brand">
        <span class="status-dot"></span>
        INTERACTIVE 3D EXPERIENCE
      </div>
      <span class="stage-number">Nº 001 — LAHUTA</span>
    </div>

    <div class="canvas-area">
      <Canvas>
        <Scene
          {config}
          {view}
          autoRotate={drehen}
          hintergrund="#201915"
          onloaded={() => (geladen = true)}
          onready={(a) => (api = a)}
        />
      </Canvas>
    </div>

    {#if !geladen}
      <div class="loading">
        <div class="loader"></div>
        <h3>Deine Lahuta wird vorbereitet</h3>
        <p>3D-Modell und Materialien werden geladen …</p>
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
          class:active={drehen}
          class="rotate-button"
          aria-pressed={drehen}
          onclick={() => (drehen = !drehen)}
        >
          <span>⟳</span>
          {drehen ? 'Rotation stoppen' : 'Auto-Rotation'}
        </button>
      </div>

      <div class="stage-bottom">
        <span>↔ Ziehen zum Drehen</span>
        <span>⊕ Scrollen zum Zoomen</span>
      </div>
    {/if}
  </section>

  <aside class="panel">
    <div class="panel-header">
      <span class="eyebrow">THE PERSONAL COLLECTION</span>
      <h2>Gestalte deine <em>Lahuta.</em></h2>
      <p>Jedes Detail erzählt deine Geschichte.</p>
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
            <span>01 / HOLZART</span>
            <small>Wähle deinen Charakter</small>
          </div>

          <div class="swatch-grid">
            {#each HOLZ as h (h.id)}
              <button
                class:chosen={config.holz === h.id}
                class="swatch-option"
                onclick={() => (config.holz = h.id)}
                aria-pressed={config.holz === h.id}
              >
                <span class="swatch" style:background={h.farbe}></span>
                <span>{h.name}</span>
                {#if config.holz === h.id}<b>✓</b>{/if}
              </button>
            {/each}
          </div>
        </div>

        <div class="option-group">
          <div class="group-title">
            <span>02 / FELLMATERIAL</span>
            <small>Oberfläche gestalten</small>
          </div>

          <div class="swatch-grid">
            {#each FELL as f (f.id)}
              <button
                class:chosen={config.fell === f.id}
                class="swatch-option"
                onclick={() => (config.fell = f.id)}
                aria-pressed={config.fell === f.id}
              >
                <span class="swatch" style:background={f.farbe}></span>
                <span>{f.name}</span>
                {#if config.fell === f.id}<b>✓</b>{/if}
              </button>
            {/each}
          </div>
        </div>

        <div class="option-group">
          <div class="group-title">
            <span>03 / METALLDETAILS</span>
            <small>Der letzte Schliff</small>
          </div>

          <div class="swatch-grid">
            {#each METALL as m (m.id)}
              <button
                class:chosen={config.metall === m.id}
                class="swatch-option"
                onclick={() => (config.metall = m.id)}
                aria-pressed={config.metall === m.id}
              >
                <span class="swatch" style:background={m.farbe}></span>
                <span>{m.name}</span>
                {#if config.metall === m.id}<b>✓</b>{/if}
              </button>
            {/each}
          </div>
        </div>
      {:else if aktiverTab === 'form'}
        <div class="option-group">
          <div class="group-title">
            <span>04 / INDIVIDUELLE FORM</span>
            <small>3D-Geometrie verändern</small>
          </div>

          <p class="hint">
            Passe die Proportionen deiner Lahuta an.
            Die Änderungen werden direkt im 3D-Modell sichtbar.
          </p>

          <div class="range-group">
            <label for="breit">
              <span>Korpusbreite</span>
              <strong>{Math.round(config.breit * 100)}%</strong>
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
              <strong>{Math.round(config.tief * 100)}%</strong>
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
              <strong>{Math.round(config.lang * 100)}%</strong>
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
            <span>05 / LICHTSTIMMUNG</span>
            <small>Die richtige Atmosphäre</small>
          </div>

          <div class="option-list">
            {#each LICHT as l (l.id)}
              <button
                class:chosen={config.licht === l.id}
                onclick={() => (config.licht = l.id)}
              >
                <span>✧ {l.name}</span>
                <span>{config.licht === l.id ? '●' : '○'}</span>
              </button>
            {/each}
          </div>
        </div>

        <div class="option-group">
          <div class="group-title">
            <span>06 / DESIGN-KOLLEKTION</span>
            <small>Fertige Kombinationen</small>
          </div>

          <div class="option-list">
            {#each PRESETS as p}
              <button onclick={() => preset(p)}>
                <span>◇ {p.name}</span>
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
          <small>INDIVIDUELLE KONFIGURATION</small>
          <span>Unverbindlicher Beispielpreis</span>
        </div>
        <strong>{gesamtpreis} €</strong>
      </div>

      <div class="actions">
        <button onclick={foto} disabled={!geladen || !api}>
          <span>▣</span> Foto
        </button>
        <button onclick={kopieren}>
          <span>▤</span> {kopiert ? 'Kopiert!' : 'Teilen'}
        </button>
        <button onclick={zuruecksetzen}>
          <span>↺</span> Reset
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
    background: #211914;
    color: #f6f0e8;
    font-family: 'DM Sans', sans-serif;
  }

  button {
    font: inherit;
    cursor: pointer;
  }

  .stage {
    position: relative;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    background: #201915;
  }

  .canvas-area {
    position: absolute;
    inset: 0;
  }

  .stage-top,
  .stage-bottom {
    position: absolute;
    left: 25px;
    right: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    pointer-events: none;
    z-index: 5;
  }

  .stage-top {
    top: 25px;
  }

  .stage-bottom {
    bottom: 22px;
    color: #c3b4a6;
    font-size: 11px;
    letter-spacing: .5px;
  }

  .stage-brand,
  .stage-number {
    font-size: 10px;
    letter-spacing: 2px;
    color: #e6c8a0;
  }

  .status-dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    margin-right: 8px;
    border-radius: 50%;
    background: #c7a270;
  }

  .stage-controls {
    position: absolute;
    top: 70px;
    left: 25px;
    right: 25px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    z-index: 6;
  }

  .view-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    max-width: 75%;
  }

  .view-buttons button,
  .rotate-button {
    padding: 10px 12px;
    border: 1px solid #786454;
    background: #241b17df;
    color: #f4e9db;
    font-size: 10px;
    letter-spacing: .4px;
    backdrop-filter: blur(12px);
    transition: .2s;
  }

  .view-buttons button:hover,
  .rotate-button:hover,
  .rotate-button.active {
    background: #b78d5b;
    border-color: #b78d5b;
    color: #1e1713;
  }

  .rotate-button {
    white-space: nowrap;
  }

  .rotate-button span {
    margin-right: 6px;
    font-size: 15px;
  }

  .loading {
    position: absolute;
    inset: 0;
    z-index: 10;
    background: #211914;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 25px;
  }

  .loader {
    width: 45px;
    height: 45px;
    border: 2px solid #564335;
    border-top-color: #c7a270;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px;
    font-weight: 400;
    margin: 25px 0 8px;
  }

  .loading p {
    color: #b6a393;
    font-size: 12px;
  }

  .panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    background: #f4eee5;
    color: #2d211a;
    border-left: 1px solid #d6c8b8;
  }

  .panel-header {
    padding: 32px 26px 24px;
  }

  .eyebrow,
  .group-title > span {
    color: #a17b51;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
  }

  .panel-header h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 30px;
    line-height: 1.25;
    font-weight: 400;
    margin: 13px 0;
  }

  .panel-header em {
    color: #ae8455;
  }

  .panel-header p {
    color: #8c7b6b;
    font-size: 12px;
    margin: 0;
  }

  .tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #ded3c5;
    border-bottom: 1px solid #ded3c5;
  }

  .tabs button {
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 16px 4px;
    color: #9b8a7b;
    font-size: 11px;
    font-weight: 600;
  }

  .tabs button.selected {
    color: #6b4827;
    border-bottom-color: #a77a48;
  }

  .panel-body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 12px 26px 25px;
  }

  .option-group {
    padding: 22px 0;
    border-bottom: 1px solid #ded3c5;
  }

  .group-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
  }

  .group-title small {
    color: #9c8c7d;
    font-size: 10px;
    text-align: right;
  }

  .swatch-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .swatch-option {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 10px;
    border: 1px solid #ded3c5;
    background: #faf7f2;
    color: #4b3a2d;
    font-size: 11px;
    text-align: left;
  }

  .swatch-option.chosen {
    border-color: #a77a48;
    background: #eee2d1;
  }

  .swatch {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid #b9aa99;
  }

  .swatch-option b {
    margin-left: auto;
    color: #936637;
  }

  .hint {
    font-size: 12px;
    line-height: 1.8;
    color: #8c7b6b;
    margin-bottom: 30px;
  }

  .range-group {
    margin-bottom: 28px;
  }

  .range-group label {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 15px;
  }

  .range-group strong {
    color: #9e7548;
  }

  input[type="range"] {
    width: 100%;
    accent-color: #a77a48;
    cursor: pointer;
  }

  .option-list {
    display: grid;
    gap: 9px;
  }

  .option-list button {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    background: #faf7f2;
    color: #4b3a2d;
    border: 1px solid #ded3c5;
    padding: 15px;
    text-align: left;
    font-size: 12px;
  }

  .option-list button.chosen {
    background: #eee2d1;
    border-color: #a77a48;
  }

  .panel-footer {
    padding: 20px 26px 24px;
    border-top: 1px solid #ded3c5;
    background: #eee6db;
  }

  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .price > div {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .price small {
    color: #8f6c47;
    font-size: 9px;
    letter-spacing: 1px;
  }

  .price span {
    color: #958474;
    font-size: 10px;
  }

  .price strong {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 27px;
    font-weight: 400;
    white-space: nowrap;
  }

  .actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .actions button {
    padding: 13px 5px;
    background: #30231b;
    color: #fff4e7;
    border: 1px solid #30231b;
    font-size: 11px;
  }

  .actions button:hover {
    background: #a77a48;
    border-color: #a77a48;
  }

  .actions button:disabled {
    opacity: .5;
    cursor: not-allowed;
  }

  .actions span {
    margin-right: 4px;
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
    }

    .panel-body {
      overflow: visible;
    }
  }

  @media (max-width: 600px) {
    .stage {
      height: 480px;
    }

    .stage-top,
    .stage-bottom {
      left: 15px;
      right: 15px;
    }

    .stage-number {
      display: none;
    }

    .stage-controls {
      top: 62px;
      left: 15px;
      right: 15px;
      flex-direction: column;
    }

    .view-buttons {
      max-width: 100%;
    }

    .view-buttons button,
    .rotate-button {
      padding: 8px;
      font-size: 9px;
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
  }
</style>
