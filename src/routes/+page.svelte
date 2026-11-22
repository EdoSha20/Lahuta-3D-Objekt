
<script>
  import Konfigurator from '#lib/Konfigurator.svelte'

  let heroBildFehlt = $state(false)

  const gallery = [
    {
      image: '/renderings/gesamt.png',
      title: 'Die Lahuta',
      description: 'Das Instrument in seiner ganzen Form.'
    },
    {
      image: '/renderings/detail.png',
      title: 'Handwerk und Details',
      description: 'Holz, Fell und die charakteristische Saite.'
    },
    {
      image: '/renderings/alternative.png',
      title: 'Neue Perspektiven',
      description: 'Traditionelle Form aus einem anderen Blickwinkel.'
    }
  ]
</script>

<svelte:head>
  <title>Lahuta Atelier – Tradition trifft Design</title>
  <meta
    name="description"
    content="Entdecke die traditionelle albanische Lahuta und gestalte dein eigenes Instrument im interaktiven 3D-Konfigurator."
  />
</svelte:head>

<section class="hero" id="start">
  <div class="hero-content">
    <div class="hero-inner">
      <p class="eyebrow">Die Kunst der Lahuta</p>

      <h1>
        Tradition,
        <em>neu gestaltet.</em>
      </h1>

      <p class="hero-description">
        Ein Instrument mit Geschichte. Entdecke die albanische
        Lahuta und gestalte deine eigene Version in 3D.
      </p>

      <div class="hero-actions">
        <a href="#konfigurator" class="button-primary">
          Lahuta gestalten <span aria-hidden="true">↗</span>
        </a>
        <a href="#geschichte" class="button-text">
          Geschichte entdecken
        </a>
      </div>
    </div>
  </div>

  <div class="hero-visual">
    {#if heroBildFehlt}
      <div class="image-fallback">
        <span>LAHUTA</span>
        <p>Traditionelles albanisches Instrument</p>
      </div>
    {:else}
      <img
        src="/renderings/gesamt.png"
        alt="Traditionelle albanische Lahuta"
        fetchpriority="high"
        onerror={() => (heroBildFehlt = true)}
      />
    {/if}
  </div>
</section>

<section class="intro">
  <div class="intro-inner">
    <p class="eyebrow">Das Instrument</p>
    <h2>Ein Stück albanischer <em>Kultur.</em></h2>
    <p>
      Die Lahuta ist ein traditionelles einsaitiges Streichinstrument,
      das besonders in Nordalbanien mit dem Vortrag epischer Lieder
      verbunden ist. Ihre Form und ihr Klang sind Teil einer
      jahrhundertealten musikalischen Tradition.
    </p>
  </div>
</section>

<section class="config-section" id="konfigurator">
  <div class="section-container">
    <div class="section-heading light">
      <div>
        <p class="eyebrow">3D-Konfigurator</p>
        <h2>Deine Lahuta. <em>Deine Gestaltung.</em></h2>
      </div>
      <p>
        Wähle Materialien, verändere die Form und betrachte
        dein Instrument aus verschiedenen Perspektiven.
      </p>
    </div>

    <div class="config-wrapper">
      <Konfigurator />
    </div>
  </div>
</section>

<section class="gallery-section" id="galerie">
  <div class="section-container">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Galerie</p>
        <h2>Die Lahuta im <em>Detail.</em></h2>
      </div>
      <p>
        Verschiedene Ansichten unseres digitalen Instruments.
      </p>
    </div>

    <div class="gallery-grid">
      {#each gallery as item}
        <article class="gallery-card">
          <div class="gallery-image">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
            />
          </div>

          <div class="gallery-info">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="story-section" id="geschichte">
  <div class="story-image">
    <img
      src="/renderings/detail.png"
      alt="Detailansicht einer Lahuta"
      loading="lazy"
    />
  </div>

  <div class="story-content">
    <p class="eyebrow">Geschichte und Tradition</p>
    <h2>Mehr als ein <em>Instrument.</em></h2>

    <p>
      Die Lahuta begleitet seit Generationen den epischen Gesang
      in den albanischen Bergregionen.
    </p>

    <p>
      Traditionell wird sie aus Holz gefertigt und mit einer
      Fellmembran bespannt. Ihre einzelne Saite wird mit einem
      Bogen gespielt.
    </p>

    <a href="#konfigurator" class="story-link">
      Eigene Lahuta gestalten <span aria-hidden="true">↗</span>
    </a>
  </div>
</section>

<style>
  :global(html) {
    scroll-behavior: smooth;
    scroll-padding-top: 90px;
  }

  :global(body) {
    margin: 0;
  }

  :global(img) {
    display: block;
    max-width: 100%;
  }

  .hero,
  .story-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .hero {
    min-height: 660px;
    background: #f5f0e9;
  }

  .hero-content {
    display: flex;
    align-items: center;
    padding: 80px 10%;
  }

  .hero-inner {
    max-width: 540px;
  }

  .eyebrow {
    color: #a27c53;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    margin: 0 0 22px;
  }

  h1,
  h2,
  h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 400;
  }

  h1 {
    font-size: clamp(54px, 5.5vw, 88px);
    line-height: 1.1;
    letter-spacing: -2px;
    margin: 0 0 28px;
  }

  h1 em,
  h2 em {
    color: #a77a48;
    font-weight: 400;
  }

  .hero-description {
    color: #75685d;
    font-size: 15px;
    line-height: 1.9;
    max-width: 430px;
    margin: 0;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 28px;
    margin-top: 36px;
  }

  .button-primary {
    display: inline-flex;
    align-items: center;
    gap: 25px;
    padding: 17px 25px;
    background: #30241e;
    color: #fffaf3;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    transition: background 0.2s;
  }

  .button-primary:hover {
    background: #a77a48;
  }

  .button-text {
    font-size: 13px;
    font-weight: 600;
    color: #30241e;
    text-decoration: none;
    border-bottom: 1px solid #a77a48;
    padding-bottom: 5px;
  }

  .hero-visual {
    position: relative;
    min-height: 600px;
    background: #33251e;
    overflow: hidden;
  }

  .hero-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .image-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #f5f0e9;
    text-align: center;
    padding: 30px;
  }

  .image-fallback span {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 54px;
    letter-spacing: 5px;
  }

  .image-fallback p {
    color: #cbb9a6;
    font-size: 13px;
  }

  .intro {
    padding: 115px 6%;
    text-align: center;
    background: #f5f0e9;
  }

  .intro-inner {
    max-width: 780px;
    margin: auto;
  }

  .intro h2 {
    font-size: clamp(38px, 4vw, 60px);
    line-height: 1.2;
    margin: 0 0 25px;
  }

  .intro-inner > p:last-child {
    max-width: 650px;
    margin: auto;
    color: #75685d;
    font-size: 14px;
    line-height: 2;
  }

  .config-section {
    background: #241b17;
    color: #f5f0e9;
    padding: 100px 0;
  }

  .section-container {
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 6%;
  }

  .section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 35px;
    margin-bottom: 40px;
  }

  .section-heading h2 {
    font-size: clamp(36px, 4vw, 58px);
    line-height: 1.2;
    margin: 0;
  }

  .section-heading > p {
    max-width: 330px;
    color: #817267;
    font-size: 13px;
    line-height: 1.8;
    margin: 0;
  }

  .section-heading.light > p {
    color: #c2b2a5;
  }

  .config-wrapper {
    width: 100%;
    height: min(85vh, 850px);
    min-height: 680px;
    background: #201915;
    overflow: hidden;
  }

  .gallery-section {
    background: #f5f0e9;
    padding: 110px 0;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 25px;
  }

  .gallery-card {
    min-width: 0;
  }

  .gallery-image {
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: #3a2a21;
  }

  .gallery-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }

  .gallery-card:hover img {
    transform: scale(1.04);
  }

  .gallery-info {
    padding: 22px 0;
  }

  .gallery-info h3 {
    font-size: 24px;
    margin: 0 0 8px;
  }

  .gallery-info p {
    color: #817267;
    font-size: 13px;
    line-height: 1.7;
    margin: 0;
  }

  .story-section {
    min-height: 560px;
    background: #e9dfd3;
  }

  .story-image {
    min-height: 500px;
    background: #35261e;
    overflow: hidden;
  }

  .story-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .story-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 85px 12%;
  }

  .story-content h2 {
    font-size: clamp(40px, 4.5vw, 64px);
    line-height: 1.2;
    margin: 0 0 28px;
  }

  .story-content > p:not(.eyebrow) {
    color: #75685d;
    font-size: 14px;
    line-height: 1.9;
    max-width: 450px;
    margin: 0 0 18px;
  }

  .story-link {
    margin-top: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #a77a48;
    color: #30241e;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
  }

  .story-link span {
    margin-left: 15px;
  }

  @media (max-width: 950px) {
    .hero,
    .story-section {
      grid-template-columns: 1fr;
    }

    .hero-content {
      padding: 85px 6%;
    }

    .hero-visual {
      min-height: 500px;
      height: 500px;
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
      padding: 75px 8%;
    }
  }

  @media (max-width: 600px) {
    .hero-content {
      padding: 70px 20px;
    }

    h1 {
      font-size: 52px;
    }

    .hero-visual {
      min-height: 380px;
      height: 380px;
    }

    .intro {
      padding: 75px 20px;
    }

    .config-section {
      padding: 70px 0;
    }

    .section-container {
      padding: 0 15px;
    }

    .config-wrapper {
      height: 760px;
    }

    .gallery-section {
      padding: 75px 0;
    }

    .gallery-grid {
      grid-template-columns: 1fr;
    }

    .gallery-image {
      aspect-ratio: 4 / 3;
    }

    .story-image {
      min-height: 350px;
      height: 350px;
    }

    .story-content {
      padding: 70px 20px;
    }
  }
</style>
