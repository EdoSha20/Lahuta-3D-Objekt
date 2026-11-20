<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  let geladen = $state(false)
  let config = $state({ holz: 'walnuss', fell: 'ziege', metall: 'messing', breit: 0, tief: 0, lang: 0 })

  const holzListe = [['walnuss', 'Walnuss'], ['ahorn', 'Ahorn'], ['kirsche', 'Kirsche'], ['ebenholz', 'Ebenholz']]
  const fellListe = [['ziege', 'Ziege'], ['schaf', 'Schaf'], ['kalb', 'Kalb']]
  const metallListe = [['messing', 'Messing'], ['silber', 'Silber'], ['kupfer', 'Kupfer']]
</script>

<div class="rahmen">
  <Canvas>
    <Scene {config} onloaded={() => (geladen = true)} />
  </Canvas>

  {#if geladen}
    <aside class="menue">
      <h2>Konfiguration</h2>

      <h3>Holz</h3>
      <div class="knoepfe">
        {#each holzListe as [key, name]}
          <button class:aktiv={config.holz === key} onclick={() => (config.holz = key)}>{name}</button>
        {/each}
      </div>

      <h3>Fell</h3>
      <div class="knoepfe">
        {#each fellListe as [key, name]}
          <button class:aktiv={config.fell === key} onclick={() => (config.fell = key)}>{name}</button>
        {/each}
      </div>

      <h3>Metall</h3>
      <div class="knoepfe">
        {#each metallListe as [key, name]}
          <button class:aktiv={config.metall === key} onclick={() => (config.metall = key)}>{name}</button>
        {/each}
      </div>

      <h3>Form</h3>
      <label>Korpus breiter <input type="range" min="0" max="1" step="0.01" bind:value={config.breit} /></label>
      <label>Korpus tiefer <input type="range" min="0" max="1" step="0.01" bind:value={config.tief} /></label>
      <label>Hals länger <input type="range" min="0" max="1" step="0.01" bind:value={config.lang} /></label>
    </aside>
  {:else}
    <div class="laden">
      <div class="kreis"></div>
      <p>Lahuta wird geladen …</p>
    </div>
  {/if}
</div>

<style>
  .rahmen { position: relative; width: 100%; height: 100%; }
  .menue {
    position: absolute; top: 1rem; right: 1rem; width: 240px;
    background: rgba(20, 20, 24, 0.85); color: white;
    padding: 1rem; border-radius: 12px; backdrop-filter: blur(6px);
  }
  h2 { margin: 0 0 0.5rem; font-size: 1.1rem; }
  h3 { margin: 0.8rem 0 0.3rem; font-size: 0.85rem; color: #e0a84a; }
  .knoepfe { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  button {
    padding: 0.35rem 0.7rem; border: 1px solid #666; border-radius: 6px;
    background: #2a2a30; color: white; cursor: pointer;
  }
  button.aktiv { background: #e0a84a; color: #1b1b1f; border-color: #e0a84a; }
  label { display: flex; flex-direction: column; font-size: 0.85rem; margin-top: 0.5rem; }
  .laden {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 1rem;
    background: #1b1b1f; color: white;
  }
  .kreis {
    width: 48px; height: 48px; border: 5px solid #555; border-top-color: #e0a84a;
    border-radius: 50%; animation: drehen 1s linear infinite;
  }
  @keyframes drehen { to { transform: rotate(360deg); } }
</style>