/* =============================================================================
   MIRTHA CAROLINA · SHARED PARTIALS
   Injected into #mc-nav, #mc-footer, #mc-voice on each page.
   After injection, we re-run setLocale so bilingual text applies to the
   newly-injected markup.
   ========================================================================== */

window.MC_NAV = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="mc-mark" viewBox="0 0 240 40">
      <text x="6" y="30" font-family="Fraunces, Georgia, serif" font-size="28" font-weight="600" fill="currentColor" letter-spacing="2.5">MC</text>
      <line x1="52" y1="28" x2="116" y2="28" stroke="#C4A962" stroke-width="1.2" />
      <text x="122" y="26" font-family="Inter, sans-serif" font-size="10" letter-spacing="2.5" fill="currentColor" font-weight="600">MIRTHA CAROLINA</text>
    </symbol>
    <symbol id="arrow-right" viewBox="0 0 24 12">
      <path d="M0 6 H22 M16 1 L22 6 L16 11" stroke="currentColor" stroke-width="1.2" fill="none" />
    </symbol>
  </defs>
</svg>

<header class="nav" id="nav" role="banner">
  <div class="nav-shell">
    <a class="nav-mark" href="/" aria-label="Mirtha Carolina — Christie's International Real Estate — Home">
      <img class="nav-christies-mark" src="/assets/images/christies-logo.png" alt="Christie's International Real Estate Group" width="2613" height="659" decoding="async" />
      <span class="nav-logo-divider" aria-hidden="true"></span>
      <img class="nav-mc-mark" src="/assets/images/mc-mark-light.png" alt="" width="600" height="600" decoding="async" />
      <span class="nav-mark-text">
        <span class="wm">MIRTHA CAROLINA</span>
      </span>
    </a>

    <nav aria-label="Primary">
      <ul class="nav-links">
        <li><a href="/listings/"      data-en="Listings"      data-es="Propiedades">Listings</a></li>
        <li><a href="/portfolio/"     data-en="Portfolio"     data-es="Portafolio">Portfolio</a></li>
        <li><a href="/neighborhoods/" data-en="Neighborhoods" data-es="Vecindarios">Neighborhoods</a></li>
        <li><a href="/about/"         data-en="About"         data-es="Sobre Mí">About</a></li>
        <li><a href="/insights/"      data-en="Insights"      data-es="Perspectivas">Insights</a></li>
        <li><a href="/contact/"       data-en="Contact"       data-es="Contacto">Contact</a></li>
      </ul>
    </nav>

    <div class="nav-right">
      <div class="lang-toggle" role="group" aria-label="Language toggle">
        <button class="lang-pill active" data-lang="en" aria-label="English">EN</button>
        <button class="lang-pill"        data-lang="es" aria-label="Español">ES</button>
      </div>
      <button class="nav-burger" id="navBurger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="nav-overlay" id="navOverlay" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="overlay-lang" role="group" aria-label="Language toggle">
    <button class="lang-pill active" data-lang="en" aria-label="English">EN</button>
    <button class="lang-pill"        data-lang="es" aria-label="Español">ES</button>
  </div>
  <ul>
    <li><a href="/listings/"      data-en="Listings"      data-es="Propiedades">Listings</a></li>
    <li><a href="/portfolio/"     data-en="Portfolio"     data-es="Portafolio">Portfolio</a></li>
    <li><a href="/neighborhoods/" data-en="Neighborhoods" data-es="Vecindarios">Neighborhoods</a></li>
    <li><a href="/about/"         data-en="About"         data-es="Sobre Mí">About</a></li>
    <li><a href="/insights/"      data-en="Insights"      data-es="Perspectivas">Insights</a></li>
    <li><a href="/contact/"       data-en="Contact"       data-es="Contacto"><em>Contact</em></a></li>
  </ul>
</div>
`;

window.MC_FOOTER = `
<footer class="footer" role="contentinfo">
  <div class="shell">
    <div class="footer-grid">
      <div class="footer-col footer-mark">
        <a class="footer-mc-lockup" href="/" aria-label="Mirtha Carolina">
          <img src="/assets/images/mc-logo.png" alt="Mirtha Carolina · Christie's International Real Estate" width="1024" height="1024" loading="lazy" decoding="async" />
        </a>
        <span class="aff" data-en="MONMOUTH COUNTY, NJ" data-es="CONDADO DE MONMOUTH, NJ">MONMOUTH COUNTY, NJ</span>
        <p class="tag-line" data-en="Bilingual luxury concierge for the Navesink, Rumson, Holmdel, and the Atlantic shoreline." data-es="Concierge de lujo bilingüe para el Navesink, Rumson, Holmdel y el litoral Atlántico.">
          Bilingual luxury concierge for the Navesink, Rumson, Holmdel, and the Atlantic shoreline.
        </p>
        <a class="christies-lockup" href="https://www.christiesrealestategroup.com/" target="_blank" rel="noopener" aria-label="Christie's International Real Estate Group">
          <img class="christies-logo-img" src="/assets/images/christies-logo.png" alt="Christie's International Real Estate Group" width="2613" height="659" loading="lazy" decoding="async" />
          <span class="christies-caption" data-en="Independently Owned and Operated" data-es="Operada de Forma Independiente">Independently Owned and Operated</span>
        </a>
        <a class="tcm-lockup" href="https://www.tcmrealtygroup.com/" target="_blank" rel="noopener" aria-label="Teresa Minnick Group · TCM Realty Group">
          <img class="tcm-logo-img" src="/assets/images/tcm-logo-white.png" alt="Teresa Minnick Group · TCM Realty Group" width="1441" height="321" loading="lazy" decoding="async" />
          <span class="tcm-caption" data-en="A Member of the Teresa Minnick Group" data-es="Miembro del Teresa Minnick Group">A Member of the Teresa Minnick Group</span>
        </a>
        <div class="footer-compliance" aria-label="Fair housing and REALTOR® compliance">
          <span class="compliance-chip"><img class="compliance-badge compliance-eho" src="/assets/images/equal-housing-white.png" alt="Equal Housing Opportunity" width="585" height="600" loading="lazy" decoding="async" /></span>
          <span class="compliance-chip"><img class="compliance-badge compliance-realtor" src="/assets/images/realtor-white.png" alt="REALTOR®" width="235" height="274" loading="lazy" decoding="async" /></span>
        </div>
      </div>

      <div class="footer-col">
        <h5 data-en="NAVIGATE" data-es="NAVEGAR">NAVIGATE</h5>
        <ul>
          <li><a href="/listings/"      data-en="Listings"      data-es="Propiedades">Listings</a></li>
          <li><a href="/portfolio/"     data-en="Portfolio"     data-es="Portafolio">Portfolio</a></li>
          <li><a href="/neighborhoods/" data-en="Neighborhoods" data-es="Vecindarios">Neighborhoods</a></li>
          <li><a href="/about/"         data-en="About"         data-es="Sobre Mí">About</a></li>
          <li><a href="/insights/"      data-en="Insights"      data-es="Perspectivas">Insights</a></li>
          <li><a href="/contact/"       data-en="Contact"       data-es="Contacto">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col footer-contact">
        <h5 data-en="THE OFFICE" data-es="LA OFICINA">THE OFFICE</h5>
        <div class="item"><p class="label" data-en="OFFICE" data-es="OFICINA">OFFICE</p><p class="val">732.444.7575</p></div>
        <div class="item"><p class="label" data-en="CELL" data-es="MÓVIL">CELL</p><p class="val">201.554.7166</p></div>
        <div class="item"><p class="label" data-en="EMAIL" data-es="CORREO">EMAIL</p><p class="val"><a href="mailto:CSolorzano@christiesrealestategroup.com">CSolorzano@christiesrealestategroup.com</a></p></div>
        <div class="item"><p class="label" data-en="ADDRESS" data-es="DIRECCIÓN">ADDRESS</p><p class="val">59 Main Street, Holmdel, NJ 07733</p></div>
        <div class="item"><p class="label">INSTAGRAM</p><p class="val"><a href="https://www.instagram.com/carolina.therealtor/" target="_blank" rel="noopener">@carolina.therealtor</a></p></div>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="copy">© 2026 Mirtha Carolina Solorzano. All rights reserved.</p>
      <p class="licenses" data-en="NJ REALTOR LICENSE #1755940 · CHRISTIE'S AFFILIATE" data-es="LIC. NJ #1755940 · AFILIADA CHRISTIE'S">NJ REALTOR LICENSE #1755940 · CHRISTIE'S AFFILIATE</p>
      <div class="footer-lang" role="group" aria-label="Language toggle footer">
        <button class="lang-pill active" data-lang="en">EN</button>
        <button class="lang-pill"        data-lang="es">ES</button>
      </div>
    </div>
  </div>
</footer>
`;

window.MC_VOICE_WIDGET = `
<div class="voice-agent-wrap" aria-hidden="false">
  <elevenlabs-convai agent-id="agent_4801kp773y4pe3rt1v1007yd8w4c"></elevenlabs-convai>
</div>
`;

// Bootstrap: inject partials into mount points, then re-run bilingual toggle
// so freshly-injected data-en/data-es text renders in the correct language.
(function () {
  function mount() {
    var nav = document.getElementById('mc-nav');
    var footer = document.getElementById('mc-footer');
    var voice = document.getElementById('mc-voice');
    if (nav) nav.innerHTML = window.MC_NAV;
    if (footer) footer.innerHTML = window.MC_FOOTER;
    if (voice) voice.innerHTML = window.MC_VOICE_WIDGET;

    // Re-apply locale to freshly-injected markup
    if (typeof window.MC_setLocale === 'function') {
      window.MC_setLocale(window.MC_getLocale ? window.MC_getLocale() : 'en');
    }
    // Fire a custom event so site.js can re-wire nav handlers that depend on
    // the injected nav (burger/overlay/current-page highlight).
    document.dispatchEvent(new CustomEvent('mc:partials-ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
