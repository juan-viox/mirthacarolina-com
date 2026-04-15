/* =============================================================================
   MIRTHA CAROLINA · VOICE AGENT CLIENT TOOLS (bilingual Studio Concierge)
   - ElevenLabs convai widget bridge
   - Cross-page routing: if a requested section is on a different page,
     navigate to that page and scroll-to the matching hash once it loads.
   ========================================================================== */

(function () {
  'use strict';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function smoothScrollTo(el, offset) {
    if (!el) return;
    var rect = el.getBoundingClientRect();
    var top  = rect.top + window.pageYOffset - (offset || 80);
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function pulse(el, duration) {
    if (!el) return;
    el.classList.add('mc-pulse');
    setTimeout(function () { el.classList.remove('mc-pulse'); }, duration || 2400);
  }

  // Section routing — each section maps to { path, hash }
  // path: URL path on the site. hash: optional #id to scroll to on that page.
  var ROUTE = {
    hero:          { path: '/',               hash: '#hero' },
    properties:    { path: '/listings/',      hash: '#listings' },
    listings:      { path: '/listings/',      hash: '#listings' },
    neighborhoods: { path: '/neighborhoods/', hash: '' },
    about:         { path: '/about/',         hash: '' },
    portfolio:     { path: '/portfolio/',     hash: '' },
    insights:      { path: '/insights/',      hash: '' },
    stories:       { path: '/about/',         hash: '#stories' },
    process:       { path: '/about/',         hash: '#process' },
    contact:       { path: '/contact/',       hash: '' },
    footer:        { path: null,              hash: '' } // current-page footer
  };

  // Aliases (same as original)
  var ALIAS = {
    home: 'hero',
    listing: 'properties',
    neighborhood: 'neighborhoods',
    bio: 'about',
    mirtha: 'about',
    mirthacarolina: 'about',
    portfolio_grid: 'portfolio',
    market: 'insights',
    report: 'insights',
    testimonials: 'stories',
    form: 'contact',
    inquire: 'contact',
    schedule: 'contact'
  };

  function resolveKey(raw) {
    var id = (raw || '').toString().trim().toLowerCase();
    if (ROUTE[id]) return id;
    if (ALIAS[id]) return ALIAS[id];
    return 'hero';
  }

  function currentPath() {
    var p = window.location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '/');
    return p === '' ? '/' : p;
  }

  function navigateOrScroll(key) {
    var route = ROUTE[key];
    if (!route) return false;

    if (route.path === null) {
      // footer — current page
      var footer = document.querySelector('footer.footer');
      smoothScrollTo(footer);
      return true;
    }

    // On current page? scroll to hash if section exists, otherwise navigate
    if (currentPath() === route.path) {
      var hashId = route.hash.replace(/^#/, '');
      if (hashId) {
        var el = document.getElementById(hashId);
        if (el) { smoothScrollTo(el); return true; }
      }
      // no hash or element not present — scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }

    // Cross-page navigation
    window.location.href = route.path + (route.hash || '');
    return true;
  }

  var MC = {
    scroll_to_section: function (args) {
      var raw = args && (args.section_id || args.section || args.id);
      var key = resolveKey(raw);
      navigateOrScroll(key);
      return { ok: true, scrolled_to: key, route: ROUTE[key] };
    },

    scroll_direction: function (args) {
      var dir = (args && args.direction || '').toString().trim().toLowerCase();
      if (dir === 'top')    { window.scrollTo({ top: 0, behavior: 'smooth' }); return { ok: true, direction: 'top' }; }
      if (dir === 'bottom') { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); return { ok: true, direction: 'bottom' }; }

      // next/previous: walk through sections on the current page
      var sections = $$('main section, section[id], main article[id]');
      var y = window.pageYOffset + 120;
      var currentIdx = 0;
      for (var i = 0; i < sections.length; i++) {
        var top = sections[i].getBoundingClientRect().top + window.pageYOffset;
        if (top <= y) currentIdx = i;
      }
      var targetIdx = (dir === 'previous' || dir === 'prev' || dir === 'up')
        ? Math.max(0, currentIdx - 1)
        : Math.min(sections.length - 1, currentIdx + 1);
      if (sections[targetIdx]) smoothScrollTo(sections[targetIdx]);
      return { ok: true, direction: dir };
    },

    change_language: function (args) {
      var loc = (args && args.locale || '').toString().trim().toLowerCase();
      if (loc !== 'en' && loc !== 'es') return { ok: false, error: 'invalid locale' };
      if (typeof window.MC_setLocale === 'function') {
        window.MC_setLocale(loc);
        return { ok: true, locale: loc };
      }
      var pill = document.querySelector('.lang-pill[data-lang="' + loc + '"]');
      if (pill) { pill.click(); return { ok: true, locale: loc }; }
      try { localStorage.setItem('mc-locale', loc); } catch (e) {}
      document.documentElement.lang = loc;
      $$('[data-en]').forEach(function (el) {
        var v = el.dataset[loc]; if (v !== undefined) el.textContent = v;
      });
      return { ok: true, locale: loc, fallback: true };
    },

    highlight_property: function (args) {
      var idx = parseInt((args && (args.index || args.id || args.n)) || 0, 10);
      if (!idx || idx < 1 || idx > 4) return { ok: false, error: 'index must be 1–4' };
      // Navigate to listings index and pulse the card once there
      if (currentPath() !== '/listings/') {
        window.location.href = '/listings/#listing-' + idx;
        return { ok: true, index: idx, navigated: true };
      }
      var cards = $$('.listing-card, .teaser-card, .property-card, [data-property-index]');
      var target = cards[idx - 1];
      if (target) {
        smoothScrollTo(target);
        setTimeout(function () { pulse(target, 3000); }, 700);
      }
      return { ok: true, index: idx };
    },

    // highlight_neighborhood routes across all 22 Monmouth County submarkets:
    //   holmdel, red-bank, rumson, long-branch, asbury-park, little-silver,
    //   fair-haven, oceanport, ocean-township, oakhurst, eatontown,
    //   monmouth-beach, wall, spring-lake, sea-bright, atlantic-highlands,
    //   colts-neck, deal, manasquan, aberdeen, matawan, keyport
    highlight_neighborhood: function (args) {
      var name = (args && args.name || '').toString().trim().toLowerCase();
      // Normalize aliases → canonical slug used in /neighborhoods/{slug}/ URLs
      var aliases = {
        'red bank':'red-bank',
        'redbank':'red-bank',
        // Long Branch: canonical is now 'long-branch' (detail path) but legacy 'pier-village' still resolves
        'long branch':'long-branch',
        'longbranch':'long-branch',
        'piervillage':'long-branch',
        'pier village':'long-branch',
        'pier_village':'long-branch',
        'pier':'long-branch',
        'pier-village':'long-branch',
        // New 18
        'asbury':'asbury-park',
        'asbury park':'asbury-park',
        'asburypark':'asbury-park',
        'little silver':'little-silver',
        'littlesilver':'little-silver',
        'fair haven':'fair-haven',
        'fairhaven':'fair-haven',
        'ocean township':'ocean-township',
        'oceantownship':'ocean-township',
        'monmouth beach':'monmouth-beach',
        'monmouthbeach':'monmouth-beach',
        'wall township':'wall',
        'walltownship':'wall',
        'spring lake':'spring-lake',
        'springlake':'spring-lake',
        'sea bright':'sea-bright',
        'seabright':'sea-bright',
        'atlantic highlands':'atlantic-highlands',
        'atlantichighlands':'atlantic-highlands',
        'colts neck':'colts-neck',
        'coltsneck':'colts-neck'
      };
      name = aliases[name] || name;

      var validSlugs = [
        'holmdel', 'red-bank', 'rumson', 'long-branch',
        'asbury-park', 'little-silver', 'fair-haven', 'oceanport',
        'ocean-township', 'oakhurst', 'eatontown', 'monmouth-beach',
        'wall', 'spring-lake', 'sea-bright', 'atlantic-highlands',
        'colts-neck', 'deal', 'manasquan', 'aberdeen',
        'matawan', 'keyport'
      ];
      if (validSlugs.indexOf(name) === -1) {
        // Unknown neighborhood → default to the index page
        window.location.href = '/neighborhoods/';
        return { ok: false, error: 'unknown neighborhood', navigated: true };
      }

      var detailPath = '/neighborhoods/' + name + '/';
      var indexPath = '/neighborhoods/';
      var cur = currentPath();

      // Case 1: already on the detail page — scroll to top of hero
      if (cur === detailPath) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return { ok: true, neighborhood: name, action: 'already_on_detail' };
      }

      // Case 2: on the neighborhoods index — pulse the matching card in place
      if (cur === indexPath) {
        setTimeout(function () {
          var card = document.querySelector('.neighborhood-card[data-nbh="' + name + '"]') ||
                     document.getElementById('nbh-' + name) ||
                     // legacy fallback (old pinned-scroll entries)
                     document.querySelector('.nbh-entry[data-nbh="' + name.replace('-','') + '"]') ||
                     (name === 'long-branch' ? document.getElementById('nbh-pier-village') : null) ||
                     (name === 'long-branch' ? document.querySelector('.nbh-entry[data-nbh="pier"]') : null);
          if (card) {
            smoothScrollTo(card, 160);
            pulse(card, 3000);
          }
        }, 100);
        return { ok: true, neighborhood: name, action: 'pulse_on_index' };
      }

      // Case 3: elsewhere on the site — navigate to the detail page
      window.location.href = detailPath;
      return { ok: true, neighborhood: name, navigated: true };
    },

    open_inquiry_form: function () {
      if (currentPath() !== '/contact/') {
        window.location.href = '/contact/';
        return { ok: true, navigated: true };
      }
      var contact = document.getElementById('contact') || document.querySelector('.inquire-form');
      smoothScrollTo(contact);
      setTimeout(function () {
        var first = contact && (contact.querySelector('input[name="name"], input[type="text"], input:not([type="hidden"])'));
        if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
        var form = contact && contact.querySelector ? contact.querySelector('form') : null;
        if (form) pulse(form, 2400);
      }, 800);
      return { ok: true };
    },

    show_market_report: function () {
      if (currentPath() !== '/insights/') {
        window.location.href = '/insights/';
        return { ok: true, navigated: true };
      }
      var card = document.querySelector('.insights-card, #insights .insights-card, #insights article');
      if (card) { smoothScrollTo(card); setTimeout(function () { pulse(card, 3000); }, 700); }
      return { ok: true };
    }
  };

  // Expose for debugging
  window.MC_TOOLS = MC;

  // Register on the elevenlabs-convai widget when it fires `call`
  function attachWidget() {
    var widget = document.querySelector('elevenlabs-convai');
    if (!widget) return;
    widget.addEventListener('elevenlabs-convai:call', function (e) {
      try {
        if (e && e.detail && e.detail.config) {
          e.detail.config.clientTools = MC;
        }
      } catch (err) {
        console.warn('[mc] widget tool registration failed:', err);
      }
    });
    widget.addEventListener('elevenlabs-convai:tool-call', function (e) {
      try {
        var name = e.detail && e.detail.tool_name;
        var params = e.detail && e.detail.parameters;
        if (name && typeof MC[name] === 'function') {
          MC[name](params || {});
        }
      } catch (err) {
        console.warn('[mc] tool-call legacy handler error:', err);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachWidget);
  } else {
    attachWidget();
  }
  setTimeout(attachWidget, 1500);
  setTimeout(attachWidget, 4000);
})();
