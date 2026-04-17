/* =============================================================================
   MIRTHA CAROLINA · SPA-LITE NAVIGATION
   Keeps the ElevenLabs voice widget (#mc-voice) alive across page transitions
   by intercepting internal link clicks, fetching the target page, and swapping
   only <main> content. <header> (#mc-nav), #mc-voice, and <footer> (#mc-footer)
   stay mounted — so the agent's active conversation is never torn down.

   Safety rails:
   - Only same-origin navigations are intercepted
   - Modifier-clicks, middle/right-clicks, target=_blank, downloads → pass through
   - If the fetch or DOM swap fails, we fall back to real window.location.href nav
   - ScrollTriggers from the previous page are killed before re-boot so they
     don't leak and double-fire on the new DOM
   ========================================================================== */

(function () {
  'use strict';

  // Browsers missing these APIs get the old multi-page behavior — safe default.
  if (!window.history || !window.history.pushState || !window.fetch || !window.DOMParser) return;

  var origin = window.location.origin;
  var inTransition = false;

  function killScrollTriggers() {
    try {
      if (window.ScrollTrigger && typeof window.ScrollTrigger.getAll === 'function') {
        window.ScrollTrigger.getAll().forEach(function (t) { try { t.kill(); } catch (e) {} });
      }
    } catch (e) {}
  }

  function isSameOriginLink(a) {
    if (!a || !a.href) return false;
    // New tab / download / explicit target
    if (a.target && a.target !== '' && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;

    var raw = a.getAttribute('href') || '';
    if (!raw) return false;
    if (raw.charAt(0) === '#') return false;                   // same-page hash
    if (raw.indexOf('mailto:') === 0) return false;
    if (raw.indexOf('tel:') === 0) return false;
    if (raw.indexOf('javascript:') === 0) return false;

    try {
      var u = new URL(a.href, window.location.href);
      if (u.origin !== origin) return false;
      // Skip static asset extensions — let the browser handle them natively
      if (/\.(pdf|png|jpe?g|webp|gif|svg|mp4|webm|zip|mp3)$/i.test(u.pathname)) return false;
      return true;
    } catch (e) { return false; }
  }

  function reapplyLocale() {
    try {
      if (typeof window.MC_setLocale === 'function') {
        var cur = (typeof window.MC_getLocale === 'function') ? window.MC_getLocale() : 'en';
        window.MC_setLocale(cur);
      }
    } catch (e) {}
  }

  function restoreScroll(parsedUrl) {
    // If URL has a hash, scroll to matching element; otherwise top.
    if (parsedUrl.hash) {
      var el = document.getElementById(parsedUrl.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }
    catch (e) { window.scrollTo(0, 0); }
  }

  function swapToUrl(url, push) {
    if (inTransition) return;
    inTransition = true;

    // Brief fade on the old main for a softer transition. If anything goes
    // wrong, we fall back to a hard nav and the fade doesn't matter.
    var currentMain = document.querySelector('main');
    if (currentMain) currentMain.style.transition = 'opacity 180ms ease';
    if (currentMain) currentMain.style.opacity = '0.35';

    fetch(url, { credentials: 'same-origin', headers: { 'X-Requested-With': 'mc-spa' } })
      .then(function (r) {
        if (!r.ok) throw new Error('fetch status ' + r.status);
        return r.text();
      })
      .then(function (html) {
        var doc;
        try { doc = new DOMParser().parseFromString(html, 'text/html'); }
        catch (e) { throw new Error('parse failed: ' + e.message); }

        var newMain = doc.querySelector('main');
        var oldMain = document.querySelector('main');
        if (!newMain || !oldMain) throw new Error('main element missing');

        // Tear down page-scoped behaviors that would otherwise leak / double-fire.
        killScrollTriggers();

        // Swap main. Clone the new node so it's detached from the parsed doc.
        var imported = document.importNode(newMain, true);
        oldMain.replaceWith(imported);

        // Title + description (description kept in sync for screen readers / tabs).
        if (doc.title) document.title = doc.title;
        var newDesc = doc.querySelector('meta[name="description"]');
        var curDesc = document.querySelector('meta[name="description"]');
        if (newDesc && curDesc) curDesc.setAttribute('content', newDesc.getAttribute('content') || '');

        // History
        if (push) {
          try { history.pushState({ mcSpa: true, url: url }, '', url); }
          catch (e) { /* pushState can throw in rare edge cases; nav still succeeded visually */ }
        }

        // Scroll restore
        var parsed = new URL(url, window.location.href);
        restoreScroll(parsed);

        // Re-run site init on the new DOM
        if (typeof window.MC_boot === 'function') {
          // Defer one frame so layout is settled before ScrollTriggers measure
          requestAnimationFrame(function () {
            try { window.MC_boot(); } catch (e) { console.warn('[mc-spa] boot failed:', e); }
            reapplyLocale();
            // Let anything else that cares (e.g. current-page nav highlight) respond
            document.dispatchEvent(new CustomEvent('mc:page-swapped', { detail: { url: url } }));
          });
        } else {
          reapplyLocale();
          document.dispatchEvent(new CustomEvent('mc:page-swapped', { detail: { url: url } }));
        }
      })
      .catch(function (err) {
        // Hard-fallback: do a normal full-page navigation so the user always gets there.
        console.warn('[mc-spa] swap failed, doing full nav:', err);
        window.location.href = url;
      })
      .finally(function () {
        inTransition = false;
        // Fade the (new) main back in. If the element was replaced, fetch it fresh.
        var m = document.querySelector('main');
        if (m) {
          m.style.transition = 'opacity 260ms ease';
          m.style.opacity = '1';
        }
      });
  }

  // Intercept same-origin link clicks
  document.addEventListener('click', function (ev) {
    if (ev.defaultPrevented) return;
    if (ev.button !== 0) return;                                       // only primary-click
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;  // let browser handle open-in-new-tab etc.

    var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
    if (!a) return;
    if (!isSameOriginLink(a)) return;

    var href = a.href;
    if (href === window.location.href) { ev.preventDefault(); return; } // same URL — no-op

    ev.preventDefault();
    swapToUrl(href, true);
  });

  // Back/forward
  window.addEventListener('popstate', function () {
    swapToUrl(window.location.href, false);
  });
})();
