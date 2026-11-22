
<script>
  import Konfigurator from '#lib/Konfigurator.svelte'

  let heroBildFehlt = $state(false)

  const gallery = [
    {
      image: '/renderings/02_Frontansicht.png',
      title: 'Die Form',
      description: '01 — Frontansicht'
    },
    {
      image: '/renderings/05_Detail_Korpus.png',
      title: 'Das Handwerk',
      description: '02 — Korpus und Materialien'
    },
    {
      image: '/renderings/06_Detail_Kopf.png',
      title: 'Die Einzelheiten',
      description: '03 — Traditionelle Gestaltung'
    }
  ]
</script>

<svelte:head>
  <title>Lahuta Atelier — Ein Instrument mit Geschichte</title>
  <meta
    name="description"
    content="Die albanische Lahuta entdecken. Tradition, Handwerk und ein interaktiver 3D-Konfigurator."
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<section class="hero" id="start">
  <div class="hero-content">
    <div class="hero-inner">
      <p class="eyebrow">Albanisches Kulturerbe</p>

      <h1>
        Die Kunst
        <span>der <em>Lahuta.</em></span>
      </h1>

      <div class="hero-line"></div>

      <p class="hero-description">
        Ein Instrument, das Geschichten bewahrt.
        Entdecke die traditionelle albanische Lahuta
        und ihre besondere Handwerkskunst.
      </p>

      <div class="hero-actions">
        <a href="#geschichte" class="text-link">
          Die Geschichte entdecken
          <span aria-hidden="true">↗</span>
        </a>

        <a href="#konfigurator" class="text-link secondary">
          Zum 3D-Konfigurator
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>

    <div class="hero-bottom">
      <span>Tradition & Handwerk</span>
      <span>01 / 04</span>
    </div>
  </div>

  <div class="hero-visual">
    {#if heroBildFehlt}
      <div class="image-fallback">
        <span>Lahuta</span>
        <p>Ein Stück albanischer Tradition</p>
      </div>
    {:else}
      <img
        src="/renderings/01_Gesamtansicht.png"
        alt="Traditionelle albanische Lahuta auf einem gemusterten Teppich"
        fetchpriority="high"
        onerror={() => (heroBildFehlt = true)}
      />
    {/if}

    <span class="image-caption">
      Die Lahuta — Traditionelles Streichinstrument
    </span>
  </div>
</section>

<section class="intro">
  <div class="intro-inner">
    <p class="eyebrow">Ein lebendiges Erbe</p>

    <h2>
      Ein Instrument.
      <em>Viele Geschichten.</em>
    </h2>

    <p>
      Die Lahuta ist mehr als ein Musikinstrument.
      Seit Generationen begleitet sie den epischen
      Gesang in den albanischen Bergregionen und
      bewahrt die Geschichten einer reichen
      mündlichen Tradition.
    </p>

    <span class="intro-decoration" aria-hidden="true">✳</span>
  </div>
</section>

<section class="story-section" id="geschichte">
  <div class="story-image">
    <img
      src="/renderings/05_Detail_Korpus.png"
      alt="Handwerkliche Details des Lahuta-Korpus"
      loading="lazy"
    />
    <span class="story-image-caption">
      Detailstudie / Lahuta
    </span>
  </div>

  <div class="story-content">
    <div class="story-inner">
      <p class="eyebrow">Geschichte & Herkunft</p>

      <h2>
        Von Generation
        <em>zu Generation.</em>
      </h2>

      <div class="fine-line"></div>

      <p>
        Die Lahuta ist ein traditionelles
        einsaitiges Streichinstrument, das
        besonders in Nordalbanien verbreitet ist.
      </p>

      <p>
        Ihr Korpus wird aus Holz gefertigt und
        mit einer Fellmembran bespannt.
        Die einzelne Saite wird mit einem Bogen
        gespielt.
      </p>

      <p>
        Über Jahrhunderte war sie eng mit dem
        Vortrag epischer Lieder verbunden.
        Ihr Klang begleitet Erzählungen über
        Geschichte, Helden und das Leben
        in den Bergregionen.
      </p>

      <a href="#konfigurator" class="text-link">
        Das Instrument entdecken
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
</section>

<section class="config-section" id="konfigurator">
  <div class="section-container">
    <div class="section-heading config-heading">
      <div>
        <p class="eyebrow">Interaktive Gestaltung</p>

        <h2>
          Tradition neu
          <em>entdecken.</em>
        </h2>
      </div>

      <p>
        Betrachte die Lahuta aus verschiedenen
        Perspektiven und entdecke ihre
        Gestaltungsmöglichkeiten.
      </p>
    </div>

    <div class="config-wrapper">
      <Konfigurator />
    </div>

    <p class="config-note">
      Interaktives 3D-Modell · Lahuta Atelier
    </p>
  </div>
</section>

<section class="gallery-section" id="galerie">
  <div class="section-container">
    <div class="gallery-heading">
      <div>
        <p class="eyebrow">Eine nähere Betrachtung</p>

        <h2>
          Form, Material
          <em>& Detail.</em>
        </h2>
      </div>

      <p>
        Drei Perspektiven auf ein Instrument,
        dessen Gestaltung von Tradition und
        Handwerk geprägt ist.
      </p>
    </div>

    <div class="gallery-grid">
      {#each gallery as item, index}
        <figure class:featured={index === 0} class="gallery-item">
          <div class="gallery-image">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
            />
          </div>

          <figcaption class="gallery-info">
            <div>
              <span class="gallery-number">
                {item.description}
              </span>
              <h3>{item.title}</h3>
            </div>

            <span class="gallery-symbol" aria-hidden="true">
              ↗
            </span>
          </figcaption>
        </figure>
      {/each}
    </div>
  </div>
</section>

<section class="closing-section">
  <div class="closing-inner">
    <p class="eyebrow">Lahuta Atelier</p>

    <h2>
      Eine Tradition,
      <em>die weiterlebt.</em>
    </h2>

    <p>
      Entdecke das Instrument auf deine eigene Weise.
    </p>

    <a href="#konfigurator" class="closing-link">
      Lahuta in 3D entdecken
      <span aria-hidden="true">↗</span>
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
    background: #f4efe7;
  }

  :global(img) {
    display: block;
    max-width: 100%;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(::selection) {
    background: #b8a18c;
    color: #251d18;
  }

  .hero,
  .story-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .eyebrow {
    margin: 0 0 28px;
    color: #906b52;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 2.3px;
    text-transform: uppercase;
  }

  h1,
  h2,
  h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 400;
    letter-spacing: -0.7px;
  }

  h1 em,
  h2 em {
    display: block;
    color: #916b53;
    font-weight: 400;
  }

  p {
    font-family: 'DM Sans', sans-serif;
  }

  /* HERO */

  .hero {
    min-height: 690px;
    background: #f4efe7;
  }

  .hero-content {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    padding: 105px 12% 80px;
  }

  .hero-inner {
    max-width: 540px;
  }

  h1 {
    margin: 0;
    color: #30241e;
    font-size: clamp(70px, 7vw, 112px);
    line-height: 0.91;
  }

  h1 span {
    display: block;
  }

  h1 em {
    display: inline;
  }

  .hero-line,
  .fine-line {
    width: 44px;
    height: 1px;
    background: #aa8b70;
  }

  .hero-line {
    margin: 40px 0 30px;
  }

  .hero-description {
    max-width: 380px;
    margin: 0;
    color: #776b60;
    font-size: 13px;
    line-height: 2.1;
    font-weight: 400;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 24px 35px;
    margin-top: 42px;
  }

  .text-link {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 9px;
    border-bottom: 1px solid #a98b74;
    color: #3b2c23;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 400;
    text-decoration: none;
    transition: color 0.25s, border-color 0.25s;
  }

  .text-link:hover {
    color: #a16c4a;
    border-color: #a16c4a;
  }

  .text-link.secondary {
    color: #8c7b6d;
    border-color: #c9bdb0;
  }

  .text-link span {
    font-size: 16px;
  }

  .hero-bottom {
    position: absolute;
    bottom: 35px;
    left: 12%;
    right: 12%;
    display: flex;
    justify-content: space-between;
    color: #a18f80;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 1px;
  }

  .hero-visual {
    position: relative;
    min-height: 650px;
    overflow: hidden;
    background: #35271f;
  }

  .hero-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .image-caption {
    position: absolute;
    bottom: 25px;
    left: 30px;
    right: 30px;
    color: #f5eee5;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 8px #0009;
  }

  .image-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    color: #f4efe7;
    text-align: center;
  }

  .image-fallback span {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 75px;
    font-style: italic;
  }

  .image-fallback p {
    font-size: 12px;
    color: #cbb9a6;
  }

  /* INTRO */

  .intro {
    padding: 145px 24px;
    background: #eae0d3;
    text-align: center;
  }

  .intro-inner {
    max-width: 720px;
    margin: 0 auto;
  }

  .intro h2 {
    margin: 0 0 30px;
    color: #352820;
    font-size: clamp(48px, 5.3vw, 76px);
    line-height: 1.05;
  }

  .intro-inner > p:not(.eyebrow) {
    max-width: 510px;
    margin: 0 auto;
    color: #75685d;
    font-size: 13px;
    line-height: 2.2;
  }

  .intro-decoration {
    display: block;
    margin-top: 45px;
    color: #9a785e;
    font-size: 20px;
    font-weight: 400;
  }

  /* GESCHICHTE */

  .story-section {
    min-height: 660px;
    background: #f4efe7;
  }

  .story-image {
    position: relative;
    min-height: 620px;
    overflow: hidden;
    background: #39291f;
  }

  .story-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .story-image-caption {
    position: absolute;
    left: 30px;
    bottom: 25px;
    color: #f3e8da;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.7px;
    text-shadow: 0 1px 8px #0009;
  }

  .story-content {
    display: flex;
    align-items: center;
    padding: 95px 12%;
  }

  .story-inner {
    max-width: 450px;
  }

  .story-content h2 {
    margin: 0;
    color: #33271f;
    font-size: clamp(48px, 5vw, 74px);
    line-height: 1.02;
  }

  .fine-line {
    margin: 35px 0;
  }

  .story-content p:not(.eyebrow) {
    margin: 0 0 20px;
    color: #74685e;
    font-size: 13px;
    line-height: 2.05;
  }

  .story-content .text-link {
    margin-top: 20px;
  }

  /* KONFIGURATOR */

  .config-section {
    padding: 110px 0 95px;
    background: #29201b;
    color: #f5f0e9;
  }

  .section-container {
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 6%;
  }

  .section-heading {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 40px;
    margin-bottom: 45px;
  }

  .section-heading h2,
  .gallery-heading h2 {
    margin: 0;
    font-size: clamp(48px, 5vw, 74px);
    line-height: 1.05;
  }

  .config-heading h2 {
    color: #f3ebe0;
  }

  .config-heading h2 em {
    color: #c8a78c;
  }

  .config-heading .eyebrow {
    color: #c5a78d;
  }

  .section-heading > p {
    max-width: 300px;
    margin: 0;
    color: #c4b6a8;
    font-size: 12px;
    line-height: 2;
  }

  .config-wrapper {
    width: 100%;
    height: min(85vh, 850px);
    min-height: 680px;
    overflow: hidden;
    background: #201915;
  }

  .config-note {
    margin: 17px 0 0;
    color: #a99a8b;
    font-size: 10px;
    letter-spacing: 0.7px;
    text-align: right;
  }

  /* GALERIE */

  .gallery-section {
    padding: 130px 0 145px;
    background: #f4efe7;
  }

  .gallery-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: 55px;
  }

  .gallery-heading h2 {
    color: #352820;
  }

  .gallery-heading > p {
    max-width: 290px;
    margin: 0;
    color: #827367;
    font-size: 12px;
    line-height: 2;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 55px 30px;
    align-items: start;
  }

  .gallery-item {
    min-width: 0;
    margin: 0;
  }

  .gallery-item.featured {
    grid-row: span 2;
  }

  .gallery-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #39291f;
  }

  .gallery-item.featured .gallery-image {
    aspect-ratio: 3 / 4;
  }

  .gallery-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .gallery-item:hover img {
    transform: scale(1.025);
  }

  .gallery-info {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 20px;
    padding: 18px 0 0;
    border-bottom: 1px solid #d8ccbf;
    padding-bottom: 20px;
  }

  .gallery-number {
    color: #988777;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.5px;
  }

  .gallery-info h3 {
    margin: 7px 0 0;
    color: #372a22;
    font-size: 30px;
    line-height: 1.1;
  }

  .gallery-symbol {
    color: #92735b;
    font-size: 17px;
    font-weight: 400;
  }

  /* ABSCHLUSS */

  .closing-section {
    padding: 125px 24px 140px;
    background: #e8dccd;
    text-align: center;
  }

  .closing-inner {
    max-width: 650px;
    margin: 0 auto;
  }

  .closing-inner h2 {
    margin: 0 0 25px;
    color: #34271f;
    font-size: clamp(50px, 5.5vw, 80px);
    line-height: 1.05;
  }

  .closing-inner > p:not(.eyebrow) {
    margin: 0;
    color: #79695d;
    font-size: 13px;
    line-height: 2;
  }

  .closing-link {
    display: inline-flex;
    align-items: center;
    gap: 35px;
    margin-top: 38px;
    padding-bottom: 10px;
    border-bottom: 1px solid #9a775c;
    color: #3b2d24;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    text-decoration: none;
    transition: color 0.2s;
  }

  .closing-link:hover {
    color: #a16c4a;
  }

  .closing-link span {
    font-size: 17px;
  }

  /* TABLET */

  @media (max-width: 950px) {
    .hero,
    .story-section {
      grid-template-columns: 1fr;
    }

    .hero-content {
      min-height: 560px;
      padding: 90px 8% 110px;
    }

    .hero-bottom {
      left: 8%;
      right: 8%;
    }

    .hero-visual {
      min-height: 540px;
      height: 540px;
    }

    .story-image {
      min-height: 540px;
      height: 540px;
    }

    .story-content {
      padding: 100px 8%;
    }

    .section-heading,
    .gallery-heading {
      align-items: start;
      flex-direction: column;
      gap: 22px;
    }

    .config-wrapper {
      height: 740px;
    }

    .gallery-grid {
      gap: 40px 22px;
    }
  }

  /* MOBILE */

  @media (max-width: 600px) {
    .eyebrow {
      font-size: 9px;
      letter-spacing: 1.8px;
      margin-bottom: 22px;
    }

    .hero-content {
      min-height: 520px;
      padding: 75px 25px 105px;
    }

    h1 {
      font-size: clamp(64px, 13vw, 86px);
    }

    .hero-description {
      font-size: 12px;
    }

    .hero-actions {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .hero-bottom {
      left: 25px;
      right: 25px;
    }

    .hero-visual {
      min-height: 420px;
      height: 420px;
    }

    .image-caption {
      left: 20px;
      bottom: 20px;
      font-size: 9px;
    }

    .intro {
      padding: 90px 25px;
    }

    .intro h2 {
      font-size: 51px;
    }

    .story-image {
      min-height: 400px;
      height: 400px;
    }

    .story-content {
      padding: 85px 25px;
    }

    .story-content h2 {
      font-size: 54px;
    }

    .config-section {
      padding: 80px 0 65px;
    }

    .section-container {
      padding: 0 18px;
    }

    .section-heading h2,
    .gallery-heading h2 {
      font-size: 52px;
    }

    .config-wrapper {
      height: 760px;
    }

    .gallery-section {
      padding: 90px 0;
    }

    .gallery-heading {
      margin-bottom: 35px;
    }

    .gallery-grid {
      grid-template-columns: 1fr;
      gap: 38px;
    }

    .gallery-item.featured {
      grid-row: auto;
    }

    .gallery-item.featured .gallery-image,
    .gallery-image {
      aspect-ratio: 4 / 3;
    }

    .gallery-info h3 {
      font-size: 27px;
    }

    .closing-section {
      padding: 95px 25px 105px;
    }

    .closing-inner h2 {
      font-size: 54px;
    }
  }
</style>
