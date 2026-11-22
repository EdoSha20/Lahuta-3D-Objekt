<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { HOLZ, FELL, METALL, LICHT, PRESETS, VIEWS, STANDARD, preis, zusammenfassung } from './optionen.js'

  function laden() {
    try {
      return { ...STANDARD, ...JSON.parse(localStorage.getItem('lahuta-config')) }
    } catch {
      return { ...STANDARD }
    }
  }

  let geladen = $state(false)
  let config = $state(laden())
  let view = $state(null)
  let drehen = $state(false)
  let kopiert = $state(false)
  let api = null

  // Konfiguration im Browser merken
  $effect(() => {
    const s = JSON.stringify(config)
    try {
      localStorage.setItem('lahuta-config', s)
    } catch {}
  })

  const gesamtpreis = $derived(preis(config))

  function preset(p) {
    Object.assign(config, p.werte)
  }
  function zuruecksetzen() {
    Object.assign(config, STANDARD)
  }
  function ansicht(v) {
    view = { pos: v.pos, target: v.target, id: Math.random() }
  }
  function foto() {
    try {
      const a = document.createElement('a')
      a.href = api.screenshot()
      a.download = 'meine-lahuta.png'
      a.click()
    } catch (e) {
      console.error(e)
    }
  }
  async function kopieren() {
    try {
      await navigator.clipboard.writeText(zusammenfassung(config))
      kopiert = true
      setTimeout(() => (kopiert = false), 2000)
    } catch (e) {
      console.error(e)
    }
  }

  const knopf = (aktiv) =>
    'inline-flex cursor-pointer items-center gap-2 border px-3 py-2 font-ui text-xs font-bold tracking-wider uppercase transition ' +
    (aktiv ? 'border-gold bg-gold text-schwarz' : 'border-linie bg-kohle text-creme hover:border-gold')

  const label = 'mt-6 mb-2 font-ui text-[11px] font-bold tracking-[0.25em] text-rot uppercase'
</script>

<div class="lg:grid lg:h-[calc(100vh-82px)] lg:grid-cols-[1fr_380px]">
  <!-- 3D-Bühne -->
  <div class="relative h-[65vh] min-h-0 lg:h-auto">
    <Canvas>
      <Scene
        {config}
        {view}
        autoRotate={drehen}
        hintergrund="#161213"
        onloaded={() => (geladen = true)}
        onready={(a) => (api = a)}
      />
    </Canvas>

    {#if !geladen}
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-kohle">
        <div class="h-12 w-12 animate-spin rounded-full border-4 border-linie border-t-gold"></div>
        <p class="font-ui text-xs tracking-[0.25em] text-gold uppercase">Lahuta wird geladen …</p>
      </div>
    {:else}
      <div class="absolute top-4 left-4 flex max-w-[85%] flex-wrap gap-2">
        {#each VIEWS as v}
          <button class={knopf(false) + ' bg-schwarz/80 backdrop-blur'} onclick={() => ansicht(v)}>{v.name}</button>
        {/each}
        <button class={knopf(drehen)} onclick={() => (drehen = !drehen)}>⟳ Drehen</button>
      </div>
      <p class="absolute bottom-3 left-4 font-ui text-[11px] text-grau">
        Ziehen = drehen · Scrollen = zoomen · Zwei Finger = verschieben
      </p>
    {/if}
  </div>

  <!-- Bedienfeld -->
  <aside class="overflow-y-auto border-t-4 border-rot bg-karte p-6 lg:border-t-0 lg:border-l-4">
    {#if geladen}
      <h2 class="text-2xl">Deine Lahuta</h2>
      <p class="font-ui text-xs text-grau">Gestalte dein eigenes Instrument</p>

      <p class={label}>Fertige Looks</p>
      <div class="flex flex-wrap gap-2">
        {#each PRESETS as p}
          <button class={knopf(false)} onclick={() => preset(p)}>{p.name}</button>
        {/each}
      </div>

      <p class={label}>Holz</p>
      <div class="flex flex-wrap gap-2">
        {#each HOLZ as h (h.id)}
          <button class={knopf(config.holz === h.id)} onclick={() => (config.holz = h.id)}>
            <span class="h-3 w-3 rounded-full border border-white/40" style="background:{h.farbe}"></span>{h.name}
          </button>
        {/each}
      </div>

      <p class={label}>Fell</p>
      <div class="flex flex-wrap gap-2">
        {#each FELL as f (f.id)}
          <button class={knopf(config.fell === f.id)} onclick={() => (config.fell = f.id)}>
            <span class="h-3 w-3 rounded-full border border-white/40" style="background:{f.farbe}"></span>{f.name}
          </button>
        {/each}
      </div>

      <p class={label}>Metall</p>
      <div class="flex flex-wrap gap-2">
        {#each METALL as m (m.id)}
          <button class={knopf(config.metall === m.id)} onclick={() => (config.metall = m.id)}>
            <span class="h-3 w-3 rounded-full border border-white/40" style="background:{m.farbe}"></span>{m.name}
          </button>
        {/each}
      </div>

      <p class={label}>Form</p>
      <div class="space-y-3 font-ui text-xs">
        <label class="block">
          <span class="flex justify-between"><span>Korpus breiter</span><b class="text-gold">{Math.round(config.breit * 100)} %</b></span>
          <input class="w-full accent-rot" type="range" min="0" max="1" step="0.01" bind:value={config.breit} />
        </label>
        <label class="block">
          <span class="flex justify-between"><span>Korpus tiefer</span><b class="text-gold">{Math.round(config.tief * 100)} %</b></span>
          <input class="w-full accent-rot" type="range" min="0" max="1" step="0.01" bind:value={config.tief} />
        </label>
        <label class="block">
          <span class="flex justify-between"><span>Hals länger</span><b class="text-gold">{Math.round(config.lang * 100)} %</b></span>
          <input class="w-full accent-rot" type="range" min="0" max="1" step="0.01" bind:value={config.lang} />
        </label>
      </div>

      <p class={label}>Licht</p>
      <div class="flex flex-wrap gap-2">
        {#each LICHT as l (l.id)}
          <button class={knopf(config.licht === l.id)} onclick={() => (config.licht = l.id)}>{l.name}</button>
        {/each}
      </div>

      <div class="mt-8 flex items-center justify-between border border-linie bg-kohle px-4 py-3">
        <span class="font-ui text-xs tracking-wider text-grau uppercase">Preis (fiktiv)</span>
        <strong class="font-titel text-2xl text-gold">ca. {gesamtpreis} €</strong>
      </div>

      <div class="mt-4 grid grid-cols-3 gap-2">
        <button class={knopf(false) + ' justify-center'} onclick={foto}>📷 Foto</button>
        <button class={knopf(false) + ' justify-center'} onclick={kopieren}>{kopiert ? '✓ Kopiert' : '📋 Text'}</button>
        <button class={knopf(false) + ' justify-center'} onclick={zuruecksetzen}>↺ Reset</button>
      </div>
    {/if}
  </aside>
</div>