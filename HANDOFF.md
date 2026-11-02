# HANDOFF — mirthacarolina.com

Everything an incoming agent or developer needs to take over Mirtha Carolina's realtor site, its CRM, and its voice agent. Last updated **2026-11-01** (HEAD `59c7c26`).

> **No secrets in this file or this repo.** Every key lives in Vercel env vars or the owner's "API Keys" Apple Note. Never put a key in anything under `site/`, because everything there is public.

---

## 1. What this is

| | |
|---|---|
| Client | Mirtha Carolina Solorzano, a bilingual (EN/ES) luxury realtor with Christie's International Real Estate Group / TCM Realty, Monmouth County, NJ |
| Owner / operator | Juan Alvarado, VioX AI (builds and maintains the site for the client) |
| Live site | https://mirthacarolina.com |
| Site repo | https://github.com/juan-viox/mirthacarolina-com (branch `main`) |
| Vercel project (site) | `carolina-realtor-monmouth`, team `vio-x-bergsify` (`prj_NahlJAJc2lOpPziGdfDv7fpY5kpb`) |
| CRM | https://crm.mirthacarolina.com, Vercel project `mirtha-crm` (`prj_vgCBkdLLenig2ZnVbdPgiUtlzV0I`) |
| Local working copy | `~/Library/CloudStorage/OneDrive-VioXAI/Claude/cinematic-sites/output/carolina-realtor-monmouth` |
| CRM local copy | `…/cinematic-sites/output/mirtha-crm` (see §7 for a warning) |

---

## 2. How Juan works (follow this)

1. **Preview first, then ship.** Make the change, show it in a local preview (screenshots at desktop and mobile widths), and wait. Commit and push to prod **only when Juan says "ship it"**.
2. **Local preview:** `npx serve site -l 4178`, or the `mirtha-site` entry in `~/…/Claude/.claude/launch.json` (port 4178).
3. **Read `design-system.json` before any visual change.**
4. **Check mobile every time.** Most of the bug reports have come from Juan's phone.
5. **Commit messages:** conventional style (`feat(listings): …`, `fix(nav): …`, `copy: …`), and every commit message ends with:
   ```
   Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
   ```
6. Use the `viox.ai` domain in VioX references, never `bergsify` (even though the Vercel team slug still says bergsify).
7. Keep it brief: make the change, show it, ship it. Don't hedge.

---

## 3. Stack and deploy

- **Pure static HTML (SSG)**: no framework and no build step. `vercel.json` sets `outputDirectory: "site"`, `cleanUrls: true`, `trailingSlash: false`.
- **Serverless functions** live in the root `api/` folder (Node, Vercel functions). They are not in `site/`.
- **Deploy:** push to `main` and Vercel deploys automatically in about 30 s.
- **If the domain shows a stale build** (this has happened once), run `vercel alias set <latest-deployment-url> mirthacarolina.com`.
- Vercel SSO deployment protection is **off** for this project (it caused 401s), so leave it off.
- GSAP 3.12.5 provides the scroll engine. Fonts are Fraunces, Inter and Cormorant Garamond from Google Fonts.

---

## 4. Repo map

```
api/
  lead.js           POST /api/lead        → CRM /api/v1/ingest/lead       (contact form)
  voice-call.js     POST /api/voice-call  → CRM /api/v1/ingest/voice-call (voice-agent webhook)
site/
  index.html        Home (scroll-scrubbed 121-frame canvas hero: assets/frames/)
  about/ contact/ insights/ portal/ case-study/ 404.html
  listings/         index + 8 detail pages (see §6)
  neighborhoods/    index + 22 town pages
  portfolio/        index + residential / luxury-residential / commercial / rentals
  sitemap.xml robots.txt humans.txt
  assets/
    css/site.css    The only stylesheet (tokens, nav, footer, editorial component, …)
    js/partials.js  Shared NAV, FOOTER and VOICE WIDGET HTML, injected into #mc-nav / #mc-footer / #mc-voice
    js/site.js      boot(): nav, i18n, parallax, inquire form. Exposes MC_boot, MC_initNav, MC_setLocale, MC_getLocale
    js/spa-nav.js   SPA-lite navigation: swaps <main> so the voice widget survives page changes
    js/voice-agent.js, js/idx-config.js
    images/ frames/
design-system.json  Brand tokens (read before visual work)
case-study.*, proposal.html, competitive-report.html, *.json   Sales and research artifacts (not deployed)
```

### Key mechanics
- **Shared chrome:** to change the nav or footer on every page, edit `partials.js` only. Partials fire a `mc:partials-ready` event, and `site.js` boots after it.
- **Bilingual:** every translatable element carries `data-en` and `data-es`. `MC_setLocale` swaps the `textContent` of each one. The locale is stored in `localStorage['mc-locale']`. **Any new text must have both attributes.**
- **SPA-lite:** `spa-nav.js` intercepts internal links, fetches the page and swaps `<main>`, then calls `MC_boot()` again. As a result, init functions must be **idempotent**. For example, the burger uses a `dataset.mcBurgerBound` guard, and the parallax scroll handler is cleaned up through `window.__mcEdScroll`. The script tag sits after `site.js` on 41 pages (all but case-study).
- **Mobile nav overlay:** z-index 200 (above the nav at 100), with its own EN/ES pills in `.overlay-lang`. The mobile pill offset is `top: max(56px, calc(env(safe-area-inset-top) + 32px))`.

---

## 5. Design system (short version, full detail in `design-system.json`)

| Token | Hex |
|---|---|
| navyDeep | `#0B1F3A` |
| navyInk | `#162B4A` |
| christiesRed | `#9B2032` |
| shoreSand | `#E8DFCE` |
| ivoryCream | `#F5F1E8` |
| champagneGold | `#C4A962` |
| seafoam | `#7FA5A8` |

- Type: **Fraunces** (display), **Inter** (body / UI caps), **Cormorant Garamond italic** (accents).
- **No rounded corners.** The look is editorial and magazine-like. Juan rejects plain image grids as "no design creativity".
- **Editorial photo-essay component** `.listing-editorial` (in site.css): `ed-head`, `ed-spread--left|--right|--full`, `ed-frame` > `ed-img-mask` > `ed-img` (parallax via `data-parallax-speed`), `ed-overlay`, `ed-cap`. Spreads stack on mobile at ≤820px. It is used on The Lofts, Seashore, Atlantic Club and Willow. **Reuse it for any new listing gallery.**

### Brand and compliance lockup (tuned through many rounds, so don't resize without being asked)
- Nav, left to right: Christie's logo (`.nav-christies-mark`, 144px desktop / 106px mobile, rendered white), a divider, the MC mark, then "MIRTHA CAROLINA". There is **no** Christie's subtext under the name.
- Footer: Christie's logo 252px, TCM logo 168px (154px mobile), and the caption "MONMOUTH COUNTY, NJ" (Teresa Minnick Group was removed on request).
- Compliance chips: Equal Housing Opportunity + REALTOR® on matching ivory chips with a champagne border, badges rendered black, 41px tall (32px mobile).
- The footer credit "Powered by VioX AI" links to https://viox.ai.
- `mc-logo.png` has the Christie's text band painted out. The backup `mc-logo.original.png` is gitignored (`*.original.png`).

---

## 6. Content

### Listings (`site/listings/`)
| Slug | On-page name | Notes |
|---|---|---|
| `30-melrose` | **The Lofts** (at Pier Village) | The slug stayed the same, and the schema keeps `streetAddress` "30 Melrose Terrace #219". The visible copy says only "The Lofts" (not "The Loft", not "#219"). Images: `lofts-1..4.jpg` |
| `seashore` | Seashore | Editorial; `seashore-tcm-1..3.jpg` + logo |
| `atlantic-club` | Atlantic Club | Editorial; hero `ac-tcm-1.jpg`, `ac-tcm-1..8.jpg` |
| `long-branch-rental` | Willow at Long Branch | Editorial; `willow-tcm-1/2.png` |
| `114-wellington`, `522-amboy`, `537-s-atlantic`, `55-lower-main` | Other listings | Standard layout |

Listing images and copy come from the matching pages on tcmrealtygroup.com when Juan provides a link.

### Copy decisions already made
- The home listings section heading is **"Now Showing." / "En Cartelera."** (formerly "On Private Offer.", also used on the About page).
- The neighborhoods heading is **"The Neighborhoods"** (formerly "Neighborhood Films").

### Neighborhoods
There are 22 town pages that cross-link to each other, plus an index. Each page has a matching `neighborhood-<slug>.jpg`.

---

## 7. VioX CRM integration (live)

```
Contact form (#mcInquireForm) ──POST /api/lead──▶ api/lead.js ──x-api-key──▶ crm.mirthacarolina.com/api/v1/ingest/lead
ElevenLabs agent tool submit_inquiry ──POST https://mirthacarolina.com/api/voice-call──▶ api/voice-call.js ──▶ /api/v1/ingest/voice-call
Footer "Client Portal" → /portal/ → "Enter Portal" → https://crm.mirthacarolina.com/portal
```

- **Site env vars (Vercel, carolina-realtor-monmouth):** `CRM_URL` (= `https://crm.mirthacarolina.com`) and `SITE_API_KEY`. Set them through the Vercel REST API or dashboard. **Don't pipe them through `echo | vercel env add`**, because that once saved literal quotes and `\n` into the values.
- `api/lead.js` splits the name into firstName/lastName and folds neighborhood, listing, message and locale into the description. The CRM then creates a contact and a deal in the **Inquiry** stage.
- `api/voice-call.js` requires a phone number and adds the intent and summary to the transcript.
- **CRM app:** a clone of https://github.com/juan-viox/viox-crm (Next.js 16 + Supabase, multi-tenant schema with `organizations` / `cinematic_sites`). The branding and real-estate pipeline stages are set in `src/crm.config.ts`. The ingest routes require `x-api-key == SITE_API_KEY`. The schema and seed were applied from `MIGRATION-RUN-THIS.sql`.
- **The domain:** `crm.mirthacarolina.com` uses a Cloudflare CNAME to Vercel and is verified.
- **Local fix not pushed upstream:** `src/components/shared/ThemeProvider.tsx` now always renders the Provider, which fixed a client-side crash from `useTheme` running outside the provider during SSR. The upstream `viox-crm` repo still has the bug.
- ⚠️ **Risk:** the local `mirtha-crm` folder has **no git commits**. Production was deployed with the Vercel CLI from that folder, so the customized CRM source exists only in OneDrive and in the Vercel deployment. **First job for a new owner:** commit it to its own private repo (for example `juan-viox/mirtha-crm`) without `.env.local`.
- Mirtha's CRM account: she signs up at https://crm.mirthacarolina.com/signup. Whether she has done this is still unconfirmed.

---

## 8. ElevenLabs voice agent

- Agent ID: `agent_4801kp773y4pe3rt1v1007yd8w4c`. It is embedded through `MC_VOICE_WIDGET` in `partials.js`.
- **Knowledge base:** a RAG index of 42 docs (1 text doc plus 41 URL docs, one per site page). **When you add or rename a page, add its URL doc to the KB** so the agent stays current.
- **Tools:** 8 in total. They include client tools and the webhook tool `submit_inquiry` (`tool_5801kq68dm2jfxm9py583yy8ty0t`), which posts to `/api/voice-call`. The system prompt has a "CRM LEAD CAPTURE" block that tells the agent when to call it.
- The API key is in `cinematic-sites/.env` and the API Keys note. When PATCHing the agent, send the JSON from a file. Tool schemas accept only one of `description` or `constant_value` per field, and `request_body_schema` must not have a top-level `id`.
- **Widget persistence:** the widget survives page changes only because of SPA-lite (§4). A full page reload resets the call.

---

## 9. SEO state

- 43 indexable pages and 1 `noindex` page (404). Every indexable page has a title, meta description, canonical, hreflang (en / es / x-default via `?lang=es`), OG and Twitter cards (`og-cover.jpg`, 1200×630), and Schema.org markup (`RealEstateAgent`, `Residence`/`Offer` on listings, `Article` on case-study, `WebPage` + `AuthenticateAction` on portal).
- `sitemap.xml` lists every page. **Add every new page to it**, with hreflang alternates.
- Next steps (not done): submit the sitemap in Google Search Console and work through `google-business-profile-checklist.md`.

---

## 10. Open items / offered but not started

1. Commit the `mirtha-crm` source to a repo (§7). **This is the highest priority.**
2. Push the ThemeProvider fix upstream to `juan-viox/viox-crm`.
3. Confirm Mirtha has created her account at crm.mirthacarolina.com/signup.
4. Optional: wire Blotato (social posting) into the CRM. The key is in env, not the repo.
5. Optional: the EN/ES pills feel slightly crowded on the closed mobile nav bar.
6. Search Console sitemap submission and the Google Business Profile.

---

## 11. Gotchas log (lessons already paid for)

- **Spelling:** "The Lofts" with an s. A regex `The Loft(?!s)` → `The Lofts` fixed earlier misses.
- **Logos:** don't swap in "official" logos from Wikimedia. The ones found there were the wrong variants (Equal Housing **Lender**, the NAR association mark). Use the PNGs Juan supplied.
- **Editorial captions** clip unless they sit inside `.ed-img-mask`, and the overflow must stay on the mask, not on the frame.
- **Burger menu stopped opening on mobile:** the handler stacked up across repeated `initNav` calls. The fix is the idempotency flag. Keep every new init idempotent.
- **Stale alias:** if the live site doesn't match the latest deploy, re-alias it (§3).
- `git status` may show a modified mode (644→755) on every file. That comes from OneDrive changing permissions and has no content change. Don't commit it (`git config core.fileMode false` silences it).
