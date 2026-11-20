<script>
  import Konfigurator from '#lib/Konfigurator.svelte'
</script>

<main>
  <h1>Lahuta-Konfigurator</h1>
  <div class="viewer">
    <Konfigurator />
  </div>
</main>

<style>
  :global(body) {
    margin: 0;ß
    background: #1b1b1f;
    color: white;
    font-family: sans-serif;
  }
  h1 {
    text-align: center;
    padding: 1rem;
    margin: 0;
  }
  .viewer {
    width: 100%;
    height: 80vh;
  }
</style>