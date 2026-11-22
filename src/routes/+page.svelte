
<script>
  import Konfigurator from '#lib/Konfigurator.svelte'

  let menuOpen = $state(false)

  const gallery = [
    {
      image: '/renderings/gesamt.png',
      number: '01',
      title: 'Die ganze Lahuta',
      description: 'Tradition, Form und Handwerkskunst.'
    },
    {
      image: '/renderings/detail.png',
      number: '02',
      title: 'Liebe zum Detail',
      description: 'Holz, Fell und feine Saiten.'
    },
    {
      image: '/renderings/alternative.png',
      number: '03',
      title: 'Eine neue Perspektive',
      description: 'Das Instrument in warmem Licht.'
    }
  ]
</script>

<svelte:head>
  <title>Lahuta Atelier | Tradition trifft Design</title>
  <meta
    name="description"
    content="Entdecke die Lahuta in 3D. Gestalte Holz, Fell, Metall und Form in unserem interaktiven Konfigurator."
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<header class="navbar">
  <a class="logo" href="#start">
    LAHUTA<span>ATELIER</span>
  </a>

  <button
    class="menu-toggle"
    aria-label="Menü öffnen"
    aria-expanded={menuOpen}
    onclick={() => (menuOpen = !menuOpen)}
  >
    ☰
  </button>

  <nav class:open={menuOpen} aria-label="Hauptnavigation">
    <a href="#start" onclick={() => (menuOpen = false)}>Start</a>
    <a href="#konfigurator" onclick={() => (menuOpen = false)}>Konfigurator</a>
    <a href="#galerie" onclick={() => (menuOpen = false)}>Galerie</a>
    <a href="#geschichte" onclick={() => (menuOpen = false)}>Geschichte</a>
  </nav>

  <a class="nav-action" href="#konfigurator">Jetzt gestalten ↗</a>
</header>

<main>
  <!-- HERO -->
  <section class="hero" id="start">
    <div class="hero-copy">
      <p class="eyebrow">TRADITION · HANDWERK · TECHNOLOGIE</p>

      <h1>
        Ein Instrument.<br />
        <em>Unendliche</em><br />
        Möglichkeiten.
      </h1>

      <p class="hero-description">
        Entdecke die Lahuta – ein traditionelles albanisches
        Streichinstrument, neu erlebbar in einer interaktiven
        3D-Welt.
      </p>

      <div class="hero-actions">
        <a class="primary-button" href="#konfigurator">
          Lahuta konfigurieren <span>↗</span>
        </a>
        <a class="text-button" href="#galerie">
          Galerie entdecken ↓
        </a>
      </div>

      <div class="hero-bottom">
        <span>01 / 04</span>
        <span>TRADITION IN JEDEM DETAIL</span>
      </div>
    </div>

    <div class="hero-image">
      <img
        src="/renderings/gesamt.png"
        alt="Traditionelle Lahuta auf einem Teppich"
        fetchpriority="high"
      />
      <div class="hero-image-label">
        <span>THE LAHUTA COLLECTION</span>
        <span>EST. 2026</span>
      </div>
    </div>
  </section>

  <!-- INTRO -->
  <section class="intro">
    <p class="eyebrow">DAS KONZEPT</p>
    <h2>
      Tradition bewahren.<br />
      <em>Individuell gestalten.</em>
    </h2>
    <p>
      Wähle deine Lieblingsmaterialien, entdecke unterschiedliche
      Formen und betrachte dein Instrument aus jedem Winkel.
    </p>
  </section>

  <!-- 3D KONFIGURATOR -->
  <section class="config-section" id="konfigurator">
    <div class="section-heading">
      <div>
        <p class="eyebrow">INTERAKTIVES ERLEBNIS / 01</p>
        <h2>Deine Lahuta. <em>Dein Design.</em></h2>
      </div>
      <p>
        Gestalte dein eigenes Instrument in Echtzeit.
        Drehe es, zoome hinein und entdecke die Details.
      </p>
    </div>

    <div class="config-wrapper">
      <Konfigurator />
    </div>

    <div class="feature-row">
      <div>
        <span class="feature-icon">◇</span>
        <h3>Materialien</h3>
        <p>Holz, Fell und Metall individuell kombinieren.</p>
      </div>
      <div>
        <span class="feature-icon">◎</span>
        <h3>360° entdecken</h3>
        <p>Dein Instrument aus verschiedenen Winkeln ansehen.</p>
      </div>
      <div>
        <span class="feature-icon">✧</span>
        <h3>Form gestalten</h3>
        <p>Die Geometrie deiner Lahuta interaktiv verändern.</p>
      </div>
    </div>
  </section>

  <!-- GALERIE -->
  <section class="gallery-section" id="galerie">
    <div class="section-heading">
      <div>
        <p class="eyebrow">VISUELLE EINBLICKE / 02</p>
        <h2>Eine Kunst für <em>sich.</em></h2>
      </div>
      <p>
        Drei Perspektiven auf ein Instrument mit
        jahrhundertealter Tradition.
      </p>
    </div>

    <div class="gallery-grid">
      {#each gallery as item}
        <article class="gallery-card">
          <div class="gallery-image">
            <img src={item.image} alt={item.title} loading="lazy" />
            <span class="gallery-number">{item.number}</span>
          </div>
          <div class="gallery-caption">
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <span class="gallery-arrow">↗</span>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <!-- GESCHICHTE -->
  <section class="story-section" id="geschichte">
    <div class="story-image">
      <img
        src="/renderings/detail.png"
        alt="Detailansicht der Lahuta"
        loading="lazy"
      />
    </div>

    <div class="story-content">
      <p class="eyebrow">UNSER KULTURERBE / 03</p>
      <h2>
        Mehr als nur<br />
        ein <em>Instrument.</em>
      </h2>

      <p>
        Die Lahuta ist ein traditionelles einsaitiges
        Streichinstrument, das besonders in den nordalbanischen
        Bergregionen mit epischen Gesängen verbunden ist.
      </p>

      <p>
        Ihre charakteristische Form und ihre handwerkliche
        Herstellung machen sie zu einem besonderen Teil
        der musikalischen Kultur.
      </p>

      <a href="#konfigurator" class="story-link">
        Entdecke deine Lahuta <span>↗</span>
      </a>
    </div>
  </section>

  <!-- ABSCHLUSS -->
  <section class="closing">
    <p class="eyebrow">DEIN INSTRUMENT WARTET</p>
    <h2>Tradition. <em>Neu gedacht.</em></h2>
    <p>
      Entdecke die Möglichkeiten unseres interaktiven
      3D-Konfigurators.
    </p>
    <a href="#konfigurator" class="primary-button">
      Jetzt konfigurieren ↗
    </a>
  </section>
</main>

<footer>
  <a class="logo" href="#start">LAHUTA<span>ATELIER</span></a>
  <p>Ein interaktives 3D-Projekt · ITP 2026</p>
  <a href="#start">Nach oben ↑</a>
</footer>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
    scroll-padding-top: 90px;
  }

  :global(body) {
    margin: 0;
    background: #f5f0e8;
    color: #261b16;
    font-family: 'DM Sans', sans-serif;
  }

  :global(button),
  :global(a) {
    -webkit-tap-highlight-color: transparent;
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  :global(img) {
    display: block;
    max-width: 100%;
  }

  h1, h2, h3, p {
    margin-top: 0;
  }

  h1, h2, h3 {
    font-family: 'Playfair Display', Georgia, serif;
  }

  em {
    font-weight: 400;
    color: #b78d5b;
  }

  .eyebrow {
    color: #a57c4b;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    line-height: 1.6;
  }

  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 19px 6%;
    background: #f5f0e8f5;
    border-bottom: 1px solid #dfd4c5;
    backdrop-filter: blur(18px);
  }

  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 23px;
    font-weight: 700;
    letter-spacing: -1px;
    white-space: nowrap;
  }

  .logo span {
    color: #b78d5b;
    font-weight: 400;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  nav a {
    font-size: 12px;
    font-weight: 600;
    transition: color .2s;
  }

  nav a:hover {
    color: #b78d5b;
  }

  .nav-action {
    background: #2b211b;
    color: #fff;
    padding: 13px 20px;
    font-size: 12px;
    font-weight: 600;
  }

  .menu-toggle {
    display: none;
    background: transparent;
    border: none;
    font-size: 26px;
    color: #261b16;
    cursor: pointer;
  }

  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 690px;
  }

  .hero-copy {
    padding: 105px 9% 35px 12%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .hero h1 {
    font-size: clamp(45px, 5.2vw, 82px);
    line-height: 1.14;
    letter-spacing: -2px;
    margin: 27px 0;
    font-weight: 500;
  }

  .hero-description {
    max-width: 450px;
    color: #74685e;
    line-height: 1.9;
    font-size: 14px;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 28px;
    margin-top: 30px;
  }

  .primary-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    padding: 19px 26px;
    background: #a77a48;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    transition: background .2s, transform .2s;
  }

  .primary-button:hover {
    background: #855d32;
    transform: translateY(-2px);
  }

  .text-button {
    font-size: 12px;
    font-weight: 700;
    border-bottom: 1px solid #a77a48;
    padding-bottom: 7px;
  }

  .hero-bottom {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: auto;
    padding-top: 70px;
    font-size: 10px;
    letter-spacing: 2px;
    color: #9a8d80;
  }

  .hero-image {
    position: relative;
    min-height: 570px;
    background: #35261e;
    overflow: hidden;
  }

  .hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .hero-image-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 25px;
    color: white;
    background: linear-gradient(transparent, #21160fb8);
    font-size: 10px;
    letter-spacing: 2px;
  }

  .intro {
    padding: 115px 6%;
    text-align: center;
    max-width: 1100px;
    margin: auto;
  }

  .intro h2 {
    font-size: clamp(38px, 5vw, 65px);
    font-weight: 400;
    line-height: 1.25;
    margin: 24px 0;
  }

  .intro > p:last-child {
    max-width: 540px;
    margin: auto;
    color: #74685e;
    line-height: 1.9;
    font-size: 14px;
  }

  .config-section {
    padding: 100px 6%;
    background: #241b17;
    color: #f5f0e8;
  }

  .section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 35px;
    margin-bottom: 45px;
  }

  .section-heading h2 {
    font-size: clamp(35px, 4.4vw, 60px);
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 0;
  }

  .section-heading > p {
    max-width: 320px;
    color: #95877b;
    font-size: 13px;
    line-height: 1.9;
    margin: 0;
  }

  .config-wrapper {
    width: 100%;
    min-height: 680px;
    height: min(85vh, 850px);
    border: 1px solid #574437;
    background: #1b1512;
    overflow: hidden;
  }

  .feature-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    padding-top: 50px;
  }

  .feature-row > div {
    border-top: 1px solid #594637;
    padding-top: 25px;
  }

  .feature-icon {
    font-size: 30px;
    color: #c5a06e;
  }

  .feature-row h3 {
    font-size: 21px;
    font-weight: 400;
    margin: 15px 0 10px;
  }

  .feature-row p {
    color: #9c8c7e;
    font-size: 12px;
    line-height: 1.8;
  }

  .gallery-section {
    padding: 110px 6%;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
  }

  .gallery-card {
    min-width: 0;
  }

  .gallery-image {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: #3a2a21;
  }

  .gallery-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .5s;
  }

  .gallery-card:hover img {
    transform: scale(1.045);
  }

  .gallery-number {
    position: absolute;
    top: 18px;
    left: 18px;
    background: #f5f0e8;
    padding: 9px 12px;
    font-size: 11px;
  }

  .gallery-caption {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 22px 0;
  }

  .gallery-caption h3 {
    font-size: 23px;
    font-weight: 400;
    margin-bottom: 8px;
  }

  .gallery-caption p {
    font-size: 12px;
    color: #87776a;
    line-height: 1.6;
  }

  .gallery-arrow {
    font-size: 22px;
    color: #a77a48;
  }

  .story-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #e8dfd3;
    min-height: 570px;
  }

  .story-image {
    min-height: 480px;
    overflow: hidden;
    background: #35261e;
  }

  .story-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .story-content {
    padding: 90px 12%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .story-content h2 {
    font-size: clamp(38px, 4.5vw, 64px);
    font-weight: 400;
    line-height: 1.2;
    margin: 20px 0 30px;
  }

  .story-content > p:not(.eyebrow) {
    color: #706258;
    font-size: 14px;
    line-height: 2;
    max-width: 460px;
  }

  .story-link {
    margin-top: 25px;
    padding-bottom: 10px;
    border-bottom: 1px solid #a77a48;
    font-size: 12px;
    font-weight: 700;
  }

  .story-link span {
    margin-left: 25px;
  }

  .closing {
    text-align: center;
    padding: 120px 20px;
  }

  .closing h2 {
    font-size: clamp(40px, 5vw, 70px);
    font-weight: 400;
    margin: 20px 0;
  }

  .closing > p:not(.eyebrow) {
    color: #87776a;
    font-size: 14px;
    line-height: 1.8;
    margin-bottom: 35px;
  }

  footer {
    background: #241b17;
    color: #f5f0e8;
    padding: 40px 6%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  footer p, footer > a:last-child {
    font-size: 11px;
    color: #a99a8d;
  }

  @media (max-width: 900px) {
    .navbar {
      padding: 18px 5%;
    }

    .menu-toggle {
      display: block;
      margin-left: auto;
    }

    .navbar nav {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      padding: 25px 6%;
      background: #f5f0e8;
      border-bottom: 1px solid #dfd4c5;
    }

    .navbar nav.open {
      display: flex;
    }

    .nav-action {
      display: none;
    }

    .hero {
      grid-template-columns: 1fr;
    }

    .hero-copy {
      padding: 75px 6% 45px;
    }

    .hero-bottom {
      margin-top: 40px;
      padding-top: 0;
    }

    .hero-image {
      height: 520px;
      min-height: 0;
    }

    .section-heading {
      display: block;
    }

    .section-heading > p {
      margin-top: 20px;
    }

    .config-wrapper {
      height: 740px;
    }

    .gallery-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .story-content {
      padding: 65px 8%;
    }
  }

  @media (max-width: 600px) {
    .logo {
      font-size: 20px;
    }

    .hero h1 {
      font-size: 47px;
    }

    .hero-image {
      height: 420px;
    }

    .intro, .gallery-section {
      padding: 75px 5%;
    }

    .config-section {
      padding: 70px 4%;
    }

    .config-wrapper {
      height: 760px;
    }

    .feature-row {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .gallery-grid {
      grid-template-columns: 1fr;
    }

    .gallery-image {
      aspect-ratio: 4 / 3;
    }

    .story-section {
      grid-template-columns: 1fr;
    }

    .story-image {
      min-height: 360px;
      height: 360px;
    }

    .story-content {
      padding: 70px 6%;
    }

    footer {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
