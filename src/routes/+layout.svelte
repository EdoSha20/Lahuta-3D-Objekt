<script>
  import './layout.css'

  let { children } = $props()
  let offen = $state(false)

  const links = [
    ['/', 'Start'],
    ['/geschichte', 'Geschichte'],
    ['/konfigurator', 'Konfigurator'],
    ['/spielen', 'Musik']
  ]
</script>

<svelte:head>
  <title>Lahuta – Zëri i Malësisë</title>
  <meta
    name="description"
    content="Die Lahuta, das einsaitige Streichinstrument der albanischen Berge: Geschichte, 3D-Konfigurator und Musik."
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Manrope:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="flex min-h-screen flex-col">
  <header class="sticky top-0 z-50 bg-schwarz/90 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
      <a href="/" class="font-titel text-xl font-black tracking-[0.25em] text-gold no-underline">
        LAHUTA
      </a>

      <nav class="hidden gap-8 md:flex">
        {#each links as [href, name]}
          <a
            {href}
            class="font-ui text-xs font-bold tracking-[0.2em] text-creme/80 uppercase no-underline transition hover:text-gold"
          >
            {name}
          </a>
        {/each}
      </nav>

      <button
        class="cursor-pointer text-2xl text-gold md:hidden"
        aria-label="Menü"
        onclick={() => (offen = !offen)}
      >
        {offen ? '✕' : '☰'}
      </button>
    </div>

    {#if offen}
      <nav class="flex flex-col gap-1 border-t border-linie bg-schwarz px-5 py-3 md:hidden">
        {#each links as [href, name]}
          <a
            {href}
            onclick={() => (offen = false)}
            class="py-2 font-ui text-sm font-bold tracking-[0.2em] text-creme uppercase no-underline"
          >
            {name}
          </a>
        {/each}
      </nav>
    {/if}

    <div class="kilim"></div>
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="bg-kohle">
    <div class="kilim"></div>
    <div class="mx-auto max-w-6xl px-5 py-10 text-center">
      <p class="font-titel text-lg text-gold">Mirë se vini</p>
      <p class="mt-1 text-creme/80">Willkommen in der Welt der Lahuta</p>
      <p class="mt-6 font-ui text-xs tracking-wider text-grau">
        ITP-Schulprojekt · 3D-Konfigurator mit Blender, Three.js und Threlte
      </p>
    </div>
  </footer>
</div>