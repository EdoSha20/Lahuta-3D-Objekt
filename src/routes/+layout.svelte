
<script>
  import './layout.css'

  let { children } = $props()
  let offen = $state(false)

  const links = [
    { href: '/', name: 'Start' },
    { href: '/#geschichte', name: 'Geschichte' },
    { href: '/#konfigurator', name: 'Konfigurator' },
    { href: '/#galerie', name: 'Galerie' }
  ]

  function menueSchliessen() {
    offen = false
  }
</script>

<svelte:head>
  <title>Lahuta Atelier – Tradition trifft Design</title>
  <meta
    name="description"
    content="Entdecke die traditionelle albanische Lahuta und gestalte dein eigenes Instrument im interaktiven 3D-Konfigurator."
  />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="site">
  <header class="header">
    <div class="header-inner">
      <a
        href="/"
        class="logo"
        aria-label="Lahuta Atelier – Startseite"
        onclick={menueSchliessen}
      >
        Lahuta<span> Atelier</span>
      </a>

      <nav class="desktop-nav" aria-label="Hauptnavigation">
        {#each links as link}
          <a href={link.href}>{link.name}</a>
        {/each}
      </nav>

      <a href="/#konfigurator" class="header-cta">
        Jetzt gestalten <span aria-hidden="true">↗</span>
      </a>

      <button
        class="menu-toggle"
        type="button"
        aria-label={offen ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={offen}
        aria-controls="mobile-navigation"
        onclick={() => (offen = !offen)}
      >
        {#if offen}
          <span aria-hidden="true">✕</span>
        {:else}
          <span aria-hidden="true">☰</span>
        {/if}
      </button>
    </div>

    {#if offen}
      <nav
        id="mobile-navigation"
        class="mobile-nav"
        aria-label="Mobile Navigation"
      >
        {#each links as link}
          <a href={link.href} onclick={menueSchliessen}>
            {link.name}
          </a>
        {/each}

        <a
          href="/#konfigurator"
          class="mobile-cta"
          onclick={menueSchliessen}
        >
          Jetzt gestalten ↗
        </a>
      </nav>
    {/if}
  </header>

  <main id="hauptinhalt">
    {@render children()}
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="/" class="footer-logo">
            Lahuta<span> Atelier</span>
          </a>
          <p>Tradition bewahren. Individuell gestalten.</p>
        </div>

        <nav class="footer-links" aria-label="Footernavigation">
          {#each links as link}
            <a href={link.href}>{link.name}</a>
          {/each}
        </nav>
      </div>

      <div class="footer-bottom">
        <span>© {new Date().getFullYear()} Lahuta Atelier</span>
        <span>ITP-Projekt · HTL Shkodër</span>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  .site {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f5f0e9;
    color: #30241e;
    font-family: 'DM Sans', sans-serif;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgb(245 240 233 / 97%);
    border-bottom: 1px solid #e4d9cb;
    backdrop-filter: blur(12px);
  }

  .header-inner {
    max-width: 1440px;
    min-height: 78px;
    margin: 0 auto;
    padding: 0 6%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
  }

  .logo,
  .footer-logo {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.7px;
    color: #30241e;
    text-decoration: none;
    white-space: nowrap;
  }

  .logo span,
  .footer-logo span {
    color: #a77a48;
    font-weight: 400;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .desktop-nav a {
    color: #5e5148;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .desktop-nav a:hover,
  .footer-links a:hover {
    color: #b48a59;
  }

  .desktop-nav a:focus-visible,
  .header-cta:focus-visible,
  .mobile-nav a:focus-visible,
  .footer-links a:focus-visible,
  .menu-toggle:focus-visible {
    outline: 2px solid #b48a59;
    outline-offset: 4px;
  }

  .header-cta {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 13px 19px;
    background: #30241e;
    color: #fffaf3;
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    transition: background 0.2s ease;
  }

  .header-cta:hover {
    background: #956c42;
  }

  .menu-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    padding: 0;
    border: none;
    background: transparent;
    color: #30241e;
    font-size: 24px;
    cursor: pointer;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 15px 6% 25px;
    background: #f5f0e9;
    border-top: 1px solid #e4d9cb;
  }

  .mobile-nav a {
    padding: 12px 0;
    color: #30241e;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
  }

  .mobile-nav .mobile-cta {
    margin-top: 10px;
    padding: 14px 18px;
    background: #30241e;
    color: #fffaf3;
    text-align: center;
  }

  main {
    flex: 1;
    min-width: 0;
  }

  .footer {
    background: #30241e;
    color: #f5f0e9;
  }

  .footer-inner {
    max-width: 1440px;
    margin: 0 auto;
    padding: 44px 6% 22px;
  }

  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 35px;
    padding-bottom: 35px;
  }

  .footer-logo {
    color: #fff8ef;
    font-size: 25px;
  }

  .footer-brand p {
    margin: 10px 0 0;
    color: #c4b6a8;
    font-size: 12px;
    line-height: 1.7;
  }

  .footer-links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
    padding-top: 10px;
  }

  .footer-links a {
    color: #d9cdc0;
    font-size: 12px;
    font-weight: 400;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding-top: 20px;
    border-top: 1px solid #55473e;
    color: #a99b8e;
    font-size: 11px;
  }

  @media (max-width: 900px) {
    .desktop-nav,
    .header-cta {
      display: none;
    }

    .menu-toggle {
      display: flex;
    }

    .header-inner {
      min-height: 70px;
    }
  }

  @media (max-width: 600px) {
    .header-inner {
      padding: 0 20px;
    }

    .logo {
      font-size: 22px;
    }

    .mobile-nav {
      padding: 15px 20px 25px;
    }

    .footer-inner {
      padding: 38px 20px 20px;
    }

    .footer-top {
      flex-direction: column;
      gap: 25px;
      padding-bottom: 30px;
    }

    .footer-links {
      gap: 14px 22px;
      padding-top: 0;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 8px;
    }
  }
</style>
