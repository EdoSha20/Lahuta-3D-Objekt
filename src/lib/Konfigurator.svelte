<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  let geladen = $state(false)
</script>

<div class="rahmen">
  <Canvas>
    <Scene onloaded={() => (geladen = true)} />
  </Canvas>

  {#if !geladen}
    <div class="laden">
      <div class="kreis"></div>
      <p>Lahuta wird geladen …</p>
    </div>
  {/if}
</div>

<style>
  .rahmen {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .laden {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: #1b1b1f;
    color: white;
  }
  .kreis {
    width: 48px;
    height: 48px;
    border: 5px solid #555;
    border-top-color: #e0a84a;
    border-radius: 50%;
    animation: drehen 1s linear infinite;
  }
  @keyframes drehen {
    to {
      transform: rotate(360deg);
    }
  }
</style>