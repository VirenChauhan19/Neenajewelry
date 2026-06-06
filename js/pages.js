const IMG = "assets/img/webp/";

export const pages = {
  "/": {
    title: "Neena's Jewelry - Full-Service Jewelry Solutions",
    mood: "home",
    html: `
      <section class="page page--home">
        <div class="hero">
          <div class="hero-copy">
            <p class="eyebrow reveal">Full-Service Jewelry Solutions</p>
            <h1 class="hero-title">
              <span class="line reveal">Where Brilliance</span>
              <span class="line reveal">Becomes Personal</span>
            </h1>
            <p class="hero-sub reveal">Family-owned in Fairview Heights, Illinois, with custom design, wedding and anniversary rings, vintage jewelry, repair, and gold buying handled with personal care.</p>
            <div class="btn-row reveal">
              <a href="#/collections" class="btn btn--gold" data-link>Explore Collections</a>
              <a href="#/contact" class="btn btn--ghost" data-link>Visit the Store</a>
            </div>
          </div>
          <div class="hero-figure reveal" data-tilt="7">
            <img src="${IMG}model-hero.webp" alt="Model wearing Neena's Jewelry diamond necklace, ring and bracelet" loading="eager" />
            <span class="figure-tag">Stop in today for the perfect gift</span>
          </div>
        </div>

        <div class="featured">
          <p class="eyebrow center reveal">Collections</p>
          <h2 class="center reveal">Pieces worth keeping forever</h2>
          <div class="feature-grid">
            <a class="feature-card reveal" data-tilt="9" href="#/collections" data-link>
              <img src="${IMG}wedding-bands.webp" alt="Diamond eternity wedding bands" loading="lazy" />
              <span>Wedding &amp; Anniversary</span>
            </a>
            <a class="feature-card reveal" data-tilt="9" href="#/collections" data-link>
              <img src="${IMG}engagement-purple.webp" alt="Halo engagement ring on silk" loading="lazy" />
              <span>Engagement Rings</span>
            </a>
            <a class="feature-card reveal" data-tilt="9" href="#/collections" data-link>
              <img src="${IMG}vintage-emerald.webp" alt="Vintage emerald-cut green gemstone ring" loading="lazy" />
              <span>Vintage &amp; Estate</span>
            </a>
            <a class="feature-card reveal" data-tilt="9" href="#/services" data-link>
              <img src="${IMG}gold-bars.webp" alt="Gold bars and coins" loading="lazy" />
              <span>Gold Buying &amp; Selling</span>
            </a>
          </div>
        </div>

        <div class="service-preview">
          <p class="eyebrow center reveal">What we do</p>
          <h2 class="center reveal">A jeweler for the whole story</h2>
          <div class="mini-grid">
            <a class="mini-service reveal" href="#/services" data-link>
              <h3>Custom Design</h3>
              <p>Bring a dream piece, heirloom idea, or anniversary gift into a design you can wear for life.</p>
            </a>
            <a class="mini-service reveal" href="#/services" data-link>
              <h3>Repair</h3>
              <p>Resizing, prongs, stones, restringing, and restoration handled with careful attention.</p>
            </a>
            <a class="mini-service reveal" href="#/services" data-link>
              <h3>Gold Buying</h3>
              <p>Fair, knowledgeable gold buying and selling for pieces you no longer wear.</p>
            </a>
            <a class="mini-service reveal" href="#/buy" data-link>
              <h3>Shop Online</h3>
              <p>Start the conversation online, then get the same local, no-pressure guidance in store.</p>
            </a>
          </div>
        </div>

        <div class="education-band reveal">
          <div>
            <p class="eyebrow">GIA Education</p>
            <h2>Learn before you choose.</h2>
            <p>Neena's Jewelry highlights diamond and jewelry education so every customer can understand quality, care, and value before making a decision.</p>
          </div>
          <img src="${IMG}engagement-hand.webp" alt="Diamond engagement ring shown close up for jewelry education" loading="lazy" />
        </div>

        <div class="testimonial-band reveal">
          <p>Customers consistently call out Neena and Raj's patience, knowledge, custom work, and personal attention.</p>
          <blockquote>A local jewelry experience that feels thoughtful, honest, and deeply personal.<cite>Community Reviews</cite></blockquote>
        </div>
      </section>`,
  },

  "/about": {
    title: "About - Neena's Jewelry",
    mood: "about",
    html: `
      <section class="page page--split">
        <div class="split-figure reveal" data-tilt="7">
          <img src="${IMG}owners.webp" alt="Owners Neena and Raj at Neena's Jewelry" loading="eager" />
        </div>
        <div class="split-copy">
          <p class="eyebrow reveal">Our Story</p>
          <h1 class="reveal">A family that treats <em>you</em> like family.</h1>
          <p class="reveal">Owned and operated by Neena and Raj, Neena's Jewelry has been a trusted Fairview Heights jeweler since 2016. The owners stay personally involved, listening closely to what each piece means before helping you choose, repair, sell, or design.</p>
          <p class="reveal quote">Custom jewelry should feel like it already belonged in your story.</p>
          <div class="stat-row reveal">
            <div class="stat"><span class="stat-num">2016</span><span class="stat-label">Family Owned Since</span></div>
            <div class="stat"><span class="stat-num">GIA</span><span class="stat-label">Education Focused</span></div>
            <div class="stat"><span class="stat-num">5 Star</span><span class="stat-label">Customer Loved</span></div>
          </div>
          <a href="#/contact" class="btn btn--gold reveal" data-link>Come Say Hello</a>
        </div>
      </section>`,
  },

  "/collections": {
    title: "Collections - Neena's Jewelry",
    mood: "collections",
    html: `
      <section class="page page--gallery">
        <header class="page-head">
          <p class="eyebrow reveal">Collections</p>
          <h1 class="reveal">Find the piece that feels unmistakably yours.</h1>
          <p class="reveal lead">Explore wedding bands, engagement rings, estate finds, necklaces, bracelets, earrings, and custom designs.</p>
        </header>

        <div class="gallery">
          <article class="g-item g-item--tall reveal" data-tilt="8">
            <img src="${IMG}wedding-bands.webp" alt="Diamond eternity wedding and anniversary bands" loading="lazy" />
            <div class="g-caption"><h3>Wedding &amp; Anniversary Rings</h3><p>Commitment pieces with lasting sparkle.</p></div>
          </article>
          <article class="g-item reveal" data-tilt="8">
            <img src="${IMG}engagement-hand.webp" alt="Engagement ring on hand" loading="lazy" />
            <div class="g-caption"><h3>Engagement Rings</h3><p>Thoughtful settings for the big yes.</p></div>
          </article>
          <article class="g-item reveal" data-tilt="8">
            <img src="${IMG}engagement-gold.webp" alt="Gold solitaire engagement ring" loading="lazy" />
            <div class="g-caption"><h3>Solitaires</h3><p>Clean, timeless diamond settings.</p></div>
          </article>
          <article class="g-item reveal" data-tilt="8">
            <img src="${IMG}vintage-twins.webp" alt="Vintage halo gemstone rings" loading="lazy" />
            <div class="g-caption"><h3>Vintage &amp; Estate</h3><p>Character-rich pieces with history.</p></div>
          </article>
          <article class="g-item reveal" data-tilt="8">
            <img src="${IMG}vintage-emerald.webp" alt="Emerald-cut vintage ring" loading="lazy" />
            <div class="g-caption"><h3>Colored Gemstones</h3><p>Emeralds, tourmalines, and standout stones.</p></div>
          </article>
          <article class="g-item g-item--tall reveal" data-tilt="8">
            <img src="${IMG}necklaces.webp" alt="Layered personalized necklaces" loading="lazy" />
            <div class="g-caption"><h3>Necklaces, Bracelets &amp; Earrings</h3><p>Everyday elegance and gifts.</p></div>
          </article>
          <article class="g-item reveal" data-tilt="8">
            <img src="${IMG}custom-hearts.webp" alt="Custom heart-shaped diamond rings" loading="lazy" />
            <div class="g-caption"><h3>Custom Designs</h3><p>A piece created around your idea.</p></div>
          </article>
          <article class="g-item reveal" data-tilt="8">
            <img src="${IMG}engagement-purple.webp" alt="Halo ring on purple silk" loading="lazy" />
            <div class="g-caption"><h3>Halo Settings</h3><p>Brilliance framed with detail.</p></div>
          </article>
        </div>
        <div class="cta-strip reveal">
          <span>Looking for something specific?</span>
          <a href="#/contact" class="btn btn--gold" data-link>Ask Neena &amp; Raj</a>
        </div>
      </section>`,
  },

  "/services": {
    title: "Services - Neena's Jewelry",
    mood: "services",
    html: `
      <section class="page page--services">
        <header class="page-head">
          <p class="eyebrow reveal">Services</p>
          <h1 class="reveal">More than a store, a full-service jeweler.</h1>
          <p class="reveal lead">Custom design, expert repair, gold buying, appraisals, and cleaning all under one roof.</p>
        </header>

        <div class="service-rows">
          <article class="service-row reveal">
            <div class="service-img" data-tilt="7"><img src="${IMG}custom-hearts.webp" alt="Custom designed rings" loading="lazy" /></div>
            <div class="service-text">
              <h3>Custom Design Jewelry</h3>
              <p>Start with an idea, a sketch, or a stone. Neena and Raj help shape it into a finished piece with the right details, setting, and story.</p>
              <div class="service-list"><span>Heirloom redesign</span><span>CAD concepts</span><span>Engagement pieces</span></div>
            </div>
          </article>
          <article class="service-row service-row--flip reveal">
            <div class="service-img" data-tilt="7"><img src="${IMG}vintage-solitaire.webp" alt="Jewelry repair and restoration" loading="lazy" /></div>
            <div class="service-text">
              <h3>Jewelry Repair</h3>
              <p>Restore treasured pieces with careful work on prongs, sizing, settings, chains, restringing, and stone replacement.</p>
              <div class="service-list"><span>Ring sizing</span><span>Prongs</span><span>Stone setting</span><span>Restoration</span></div>
            </div>
          </article>
          <article class="service-row reveal">
            <div class="service-img" data-tilt="7"><img src="${IMG}gold-pile.webp" alt="Gold jewelry for buying and selling" loading="lazy" /></div>
            <div class="service-text">
              <h3>Gold Buying &amp; Selling</h3>
              <p>Get clear, knowledgeable help when selling unused gold or exploring gold pieces with lasting value.</p>
              <div class="service-list"><span>Gold</span><span>Coins</span><span>Estate pieces</span></div>
            </div>
          </article>
          <article class="service-row service-row--flip reveal">
            <div class="service-img" data-tilt="7"><img src="${IMG}model-hero.webp" alt="Jewelry appraisals and cleaning" loading="lazy" /></div>
            <div class="service-text">
              <h3>Appraisals &amp; Cleaning</h3>
              <p>Keep your jewelry protected and shining with appraisal support, professional cleaning, and care guidance.</p>
              <div class="service-list"><span>Insurance support</span><span>Cleaning</span><span>Care guidance</span></div>
            </div>
          </article>
        </div>
      </section>`,
  },

  "/buy": {
    title: "Buy Online - Neena's Jewelry",
    mood: "buy",
    html: `
      <section class="page page--buy">
        <div class="buy-card reveal">
          <p class="eyebrow">Buy Online</p>
          <h1>Start online. Finish with personal guidance.</h1>
          <p>Browse, ask questions, or begin an appointment request from home. You will still get the same careful local service Neena's Jewelry is known for in Fairview Heights.</p>
          <div class="btn-row">
            <a href="mailto:neena@neenasjewelry.com" class="btn btn--gold">Start Shopping</a>
            <a href="#/contact" class="btn btn--ghost" data-link>Visit the Store</a>
          </div>
          <div class="note-panel">
            <strong>Need a custom piece?</strong>
            <p>Email the store with your idea, stone, inspiration photo, or occasion and Neena and Raj can help guide the next step.</p>
          </div>
        </div>
        <div class="buy-figure reveal" data-tilt="7">
          <img src="${IMG}wedding-bands.webp" alt="Diamond bands by Neena's Jewelry" loading="lazy" />
        </div>
      </section>`,
  },

  "/contact": {
    title: "Contact - Neena's Jewelry",
    mood: "contact",
    html: `
      <section class="page page--contact">
        <header class="page-head">
          <p class="eyebrow reveal">Visit Us</p>
          <h1 class="reveal">Come say hello.</h1>
          <p class="lead reveal">Stop by the Fairview Heights showroom, call ahead, or email Neena's Jewelry to talk through a purchase, repair, custom design, or gold buying question.</p>
        </header>
        <div class="contact-grid">
          <div class="contact-block reveal">
            <h4>Showroom</h4>
            <p>1935 W Hwy 50<br/>Fairview Heights, IL 62208</p>
          </div>
          <div class="contact-block reveal">
            <h4>Talk to us</h4>
            <p><a href="tel:+16184093299">618-409-3299</a><br/>
               <a href="mailto:neena@neenasjewelry.com">neena@neenasjewelry.com</a></p>
          </div>
          <div class="contact-block reveal">
            <h4>Owners</h4>
            <p>Neena &amp; Raj<br/>Family owned since 2016</p>
          </div>
        </div>
        <div class="map-wrap reveal">
          <iframe
            title="Neena's Jewelry location"
            src="https://www.google.com/maps?q=1935%20W%20Hwy%2050%2C%20Fairview%20Heights%2C%20IL%2062208&output=embed"
            loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <a href="mailto:neena@neenasjewelry.com" class="btn btn--gold reveal">Email Neena's Jewelry</a>
      </section>`,
  },
};

export const NOT_FOUND = {
  title: "Not Found - Neena's Jewelry",
  mood: "home",
  html: `<section class="page page--buy"><div class="buy-card">
    <h1>Page not found</h1>
    <p>Let's get you back to something sparkling.</p>
    <a href="#/" class="btn btn--gold" data-link>Return Home</a>
  </div></section>`,
};
