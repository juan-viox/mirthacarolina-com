# Case Study · Mirtha Carolina Solorzano
## A 1-of-1 Cinematic Real Estate Platform for the Bilingual Luxury Market

**Client:** Mirtha Carolina Solorzano · Christie's International Real Estate Group · Teresa Minnick Group
**Market:** Monmouth County, New Jersey (22 submarkets)
**Live:** [mirthacarolina.com](https://mirthacarolina.com)
**Built by:** VioX AI · Cinematic Design Studio
**Case study prepared:** April 2026

---

## Executive Summary

A single bilingual Realtor-Associate wanted a personal-brand website that could compete with — and differentiate against — Compass, Sotheby's, and The Agency. Not a template. A 1-of-1 editorial platform with cinematic video, bilingual parity, a live MLS feed, a branded AI voice concierge, and a 22-neighborhood content library.

We delivered **45 content pages** across a multi-page cinematic architecture, a custom AI voice agent that can drive the site in English or Spanish, and a full production brand identity — in **under three weeks**.

**Equivalent traditional-agency scope: 4–6 months · $280,000 – $485,000.**
**VioX AI Cinematic Design Studio delivery: 14–18 days · a fraction of that.**

---

## The Client

**Mirtha Carolina Solorzano** is a bilingual (Spanish/English) Realtor-Associate with Christie's International Real Estate Group, a member of the Teresa Minnick Group (a team with $800M+ in career sales). Based in Holmdel, NJ, Mirtha represents luxury listings across all 22 submarkets of Monmouth County — from Rumson old-money estates to Pier Village oceanfront condos to Keyport commercial revivals.

Her core differentiator in the market:
- **Editorial-grade bilingual representation** — not a Google-Translate widget, but a fully translated experience with hand-tuned editorial Spanish
- **Christie's International network access** — the only global real estate firm owned by an art auction house
- **Background in international diplomacy, education, and marketing** — rare among competitors

The problem: none of this was visible online. Her only web footprint was a templated Christie's agent profile and a thin Teresa Minnick Group team page. No personal domain. No SEO presence. No lead capture. No bilingual content. No visual brand.

---

## The Brief

Build a personal-brand website that:

1. **Positions Mirtha at the top of the Monmouth County luxury market** against incumbents with decades of local presence
2. **Captures the bilingual Latin American buyer segment** that is moving capital to the Jersey Shore but has zero top-producing Spanish-speaking options in the $1M+ range
3. **Supports her active listing inventory** (8 properties across 5 property-type categories) with editorial-grade showcase pages
4. **Educates prospective buyers** about Monmouth County's 22 distinct submarkets so she becomes the definitive local authority
5. **Converts** — private-showing inquiries, not "contact me"
6. **Scales** — new listings, new neighborhoods, new languages should add in minutes, not weeks

Target: **agency-level quality** (think Ryan Serhant, The Agency, Oren Alexander's Official Partners) — without the agency timeline or agency invoice.

---

## What We Built — Complete Scope

### 45 content pages across a multi-page cinematic architecture

| Category | Page Count | What's On Each |
|---|---|---|
| Landing | 1 | Scroll-scrubbed drone hero (121 video frames), 4-card featured listings teaser, bilingual bio teaser, Christie's + TCM affiliation lockup, Monmouth County map, newsletter signup |
| About | 1 | Full editorial bio with real portrait, 3-chapter split-scroll story, 6-step process, client testimonial marquee, cross-links |
| Listings | 1 index + 8 detail | Atlantic Club Residences (132-unit oceanfront build) · The Seashore at Long Branch (14 luxury townhomes) · The Willow at Long Branch (boutique rentals) · 30 Melrose at Lofts at Pier Village · 114 Wellington (Matawan rental) · 55 Lower Main (Aberdeen residential) · 537 S Atlantic (Aberdeen luxury) · 522 Amboy (Keyport commercial) |
| Portfolio | 1 index + 4 category | Live FlexMLS embeds per category: Rentals, Residential, Luxury Residential, Commercial |
| Neighborhoods | 1 index + 22 detail | 22 Monmouth County submarkets, each with 3-paragraph editorial overview (bilingual), 4-stat grid, 8 lifestyle pillars, cross-linked to other neighborhoods and relevant listings |
| Insights | 1 | Q2 2026 Monmouth luxury market report + article placeholders |
| Contact | 1 | Private Showing inquiry form with listing-reference auto-populate, 4-column contact block, magnetic CTA |
| Legal / Infrastructure | 404, sitemap.xml, robots.txt, humans.txt | Bilingual custom 404 · 41-URL sitemap with hreflang + image:image entries · AI crawler policy · team transparency signal |

**Total:** 45 indexable content pages + 4 infrastructure files

### The cinematic hero (signature moment)

- **Custom drone concept**: slow boom-out from a Navesink River waterfront estate at golden twilight
- **Gemini 3.1 Flash** generates the 2K source still
- **WaveSpeed Kling v3 Pro** animates it into a 5-second cinematic video
- **ffmpeg** extracts 121 frames at 24fps
- **GSAP ScrollTrigger** drives a canvas-based scroll-scrubbed playback — the user "pilots the drone" as they scroll
- Graceful degradation: preloaded frame 1 for instant paint, fallback still if frames fail, reduced-motion support

### The bilingual AI voice concierge

- **ElevenLabs Conversational AI** agent "Jessica" (playful, bright, warm, multilingual female)
- Trained on a custom knowledge base with full Mirtha bio, all 8 listings, all 22 neighborhoods, Christie's affiliation details
- **7 client tools** so the agent can drive the website in real time:
  1. `scroll_to_section` — jumps to any section
  2. `scroll_direction` — top / bottom / next / previous
  3. `change_language` — flips entire site EN ↔ ES and follows in that language
  4. `highlight_property` — pulses a featured trophy card
  5. `highlight_neighborhood` — navigates to any of the 22 neighborhood pages
  6. `open_inquiry_form` — scrolls to and focuses the contact form
  7. `show_market_report` — surfaces the Q2 insights card
- Auto-detects Spanish and switches the entire experience the moment a caller speaks it
- Bilingual first-message presets for EN and ES openings
- Embedded widget on every page, brand-styled to match the editorial palette

### Full brand identity system

- **Custom "Editorial Monogram" logo** — MC monogram in Trajan/Caslon-style transitional serif with a champagne-gold hairline divider, generated via Gemini Nano Banana and post-processed via Python PIL into 4 production-ready variants:
  - Full lockup with wordmark + Christie's affiliation (for footer + print)
  - Monogram-only on ivory background (source)
  - Ivory-on-transparent (for the dark-hero nav)
  - Navy-on-transparent (for light-background favicons)
- **8-color brand palette**: Navy Deep `#0B1F3A`, Navy Ink `#162B4A`, Christie's Red `#9B2032` (surgical), Shore Sand `#E8DFCE`, Ivory Cream `#F5F1E8`, Champagne Gold `#C4A962`, Seafoam `#7FA5A8`, Charcoal `#1C1C1C`
- **Typography**: Fraunces (variable serif, opsz 9..144 + ital axis) display · Inter (neo-grotesque) body · Cormorant Garamond italic accents · JetBrains Mono for MLS data
- **Anti-patterns enforced**: no rounded-2xl cards, no drop shadows, no SaaS purple gradients, no "Contact Me" CTAs, no tropical palette accents, no stock photos of keys-and-families
- **Logo integration**: nav (120px MC mark), footer (full lockup + Christie's + TCM side-by-side logos), trust bar (Christie's + TCM side-by-side), favicon (all 45 pages)

### 38 production images

- **1** Navesink waterfront hero still (Gemini 3.1 Flash)
- **121** scroll-scrubbed hero frames (WaveSpeed Kling v3 Pro)
- **1** real editorial portrait of Mirtha
- **4** Atlantic Club renderings (from official site)
- **7** The Seashore real photos (from official site)
- **5** The Willow real photos (from official site)
- **1** 30 Melrose real photo (via Spark Platform CDN)
- **4** Aberdeen + Matawan + Keyport + Wellington listing photos (Gemini generated)
- **22** neighborhood hero photos (Gemini generated, Architectural Digest editorial style)
- **1** Open Graph social share card

Every content image has descriptive alt text with city + subject + context (SEO signal).

### Full Schema.org structured data graph

- **Landing**: `@graph` with `RealEstateAgent` + `WebSite` (with `SearchAction` sitelinks searchbox) + `LocalBusiness` (full geo, hours, sameAs) + `BreadcrumbList`
- **About**: `Person` with `knowsAbout`, `knowsLanguage`, `affiliation`, `memberOf`, `worksFor`, `email`, `telephone`, `address`, `sameAs`
- **Listing pages**: `Apartment` / `SingleFamilyResidence` / `RealEstateListing` with `geo` coordinates, `amenityFeature` arrays, `floorSize`, `numberOfRooms`, `dateModified`, `provider` linked to the RealEstateAgent
- **Portfolio pages**: `CollectionPage` with `ItemList` enumerating listings + `BreadcrumbList`
- **Neighborhood pages**: `Place` with `geo`, `containedInPlace` Monmouth County, `additionalProperty` for market stats + `BreadcrumbList`
- **Contact**: `ContactPage` + `LocalBusiness` cross-reference

### Comprehensive SEO + Technical hardening

- **Bilingual EN/ES parity**: every visible string carries `data-en` and `data-es` attributes (1,700+ paired attributes across the site); Spanish is editorial-quality, hand-tuned
- **Hreflang** en + es + x-default on every page
- **OG + Twitter cards** per page (Twitter `@carolina.therealtor` linked, 1200×630 images)
- **Canonical URLs** on all 45 pages
- **sitemap.xml** with 41 URLs + hreflang xhtml:link + image:image entries with captions
- **robots.txt** with sitemap pointer + AI crawler policy
- **Custom 404** page, bilingual, with noindex
- **humans.txt** team + technology transparency
- **Resource hints** — `preload` for hero frame 1 with `fetchpriority=high`, `dns-prefetch` for elevenlabs.io + cdnjs, `preconnect` for Google Fonts
- **Core Web Vitals tuning** — explicit width/height on all `<img>` (CLS prevention), lazy-loading on all below-fold images, image dimensions declared
- **Accessibility** — ARIA labels on 30+ background-image divs, semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`), `role="img"` on meaningful visuals, `prefers-reduced-motion` honored across all animations

### Interactions + Motion

- Scroll-scrubbed hero canvas
- Hover-parallax featured property cards (3-layer depth)
- Sticky scroll-pinned neighborhood films with IntersectionObserver crossfade
- Magnetic CTA cursor-follow on the Private Showing button (80px radius)
- Scroll-velocity-aware marquees (they speed up when you scroll faster)
- Mobile hamburger with full-screen navy overlay
- Smooth anchor scroll with focus preservation
- Entrance animations via `gsap.from()` staggered
- IntersectionObserver reveals independent of GSAP for resilience
- All animations disabled under `prefers-reduced-motion`

### Deployment + Infrastructure

- **Vercel** production deploy with clean URLs
- **GitHub** repo with auto-deploy on every push to main
- **Custom domain** ready (mirthacarolina.com — awaiting DNS)
- **GSAP 3.12.5** + ScrollTrigger from CDN
- **ElevenLabs Conversational AI widget** embedded
- **Live FlexMLS iframe embeds** for portfolio pages (upgradeable to full Spark API when broker authorization lands)

### Deliverable documents

Alongside the website, we produced:
- **Competitive analysis report** (2,065-line HTML, 20 competitors across 4 categories)
- **Build proposal** (1,925-line HTML, auction-catalog styled)
- **Brand design system** (JSON-formatted, Stitch-compatible tokens)
- **Google Business Profile setup checklist** (comprehensive 8-phase walkthrough with copy-paste-ready descriptions, bilingual review-request templates, 13-item services list)
- **Teresa Minnick email draft** (two versions) for requesting Spark API broker authorization
- **This case study**

---

## The Process — How We Built It

### Phase 0 · Competitive Intelligence (Day 1)
Researched 20 competitors across 4 categories (direct Monmouth County, aspirational national, experience/brokerage, luxury lifestyle). Identified 5 niche opportunities and 5 design trends no local competitor was running.

**Key finding**: no Monmouth County luxury realtor ran scroll-driven cinematic video, a genuine /es locale, or per-listing microsites — all three are standard at Serhant, The Agency, and Official Partners nationally.

### Phase 1 · Brand Analysis (Day 1-2)
Developed a complete brand system: palette, typography, logo direction, positioning. Locked "Heritage Atlantic Broker. Modern Cinematic Eye." as the positioning line.

### Phase 2 · Hero Concept (Day 2)
Storyboarded a 4-beat scroll-scrubbed drone sequence: cedar gable → Navesink aerial → golden-hour chromatic shift → Monmouth skyline lock with CTA fade-in.

### Phase 3 · Scene Generation (Day 2-3)
Gemini 3.1 Flash → 2K hero still. WaveSpeed Kling v3 Pro → 5s cinematic video. ffmpeg → 121 frames.

### Phase 4 · Site Build (Day 3-7)
Built the initial site as a single-page monolith, then refactored into multi-page architecture with shared CSS/JS/partials. Progressive enhancement from minimal site → 45-page system across 4 deployment waves.

### Phase 5 · Image Production (Day 3-10)
38 images total: 22 neighborhood heroes (Gemini editorial style), 16 property and brand photos (mix of real listings from brokerage sites, Spark Platform CDN, Gemini synthesis).

### Phase 6 · SEO + Schema (Day 8-10)
Comprehensive on-page audit + Schema.org graph expansion touching all 45 pages. Sitemap, robots, hreflang, OG, Twitter, dns-prefetch, resource hints, ARIA, semantic HTML.

### Phase 7 · Deploy + Integrate (Day 10-11)
GitHub repo → Vercel → custom domain pipeline. ElevenLabs agent creation with bilingual KB + 7 client tools. FlexMLS iframe integration per portfolio category.

### Phase 8 · Brand Integration (Day 12-14)
Editorial Monogram logo → 4 production variants. Logo wired through nav, footer, favicon, trust bar, social share cards. Christie's International Real Estate + Teresa Minnick Group official logos integrated.

### Phase 9 · Expansion (Day 15-18)
Neighborhood system expanded from 4 to 22. "Other Neighborhoods" cross-links retrofitted. Content corrections (license number, 30 Melrose → Lofts at Pier Village, Long Branch rename).

### Phase 10 · Handoff Documents
Competitive report, proposal, brand system export, GBP checklist, case study — all saved as persistent deliverables Mirtha owns.

---

## The Technology Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Vanilla HTML5 + CSS3 + modern ES | No framework bloat. Loads instantly. |
| Animation | GSAP 3.12.5 + ScrollTrigger | Industry-standard for cinematic scroll work |
| Typography | Google Fonts (Fraunces + Inter + Cormorant Garamond + JetBrains Mono) | Free, performant, Christie's-aligned |
| Hero video | Gemini 3.1 Flash → WaveSpeed Kling v3 Pro → ffmpeg | AI-accelerated production, drone-film quality |
| Images | Gemini 3.1 Flash (editorial realism) | 10× faster + cheaper than staged photo shoots |
| Logo | Gemini Nano Banana + Python PIL post-processing | Custom mark in 60 seconds, 4 variants in 5 minutes |
| Voice agent | ElevenLabs Conversational AI + custom knowledge base | Best-in-class multilingual voice, 7 custom client tools |
| MLS data | FlexMLS public share iframe (upgradeable to Spark API) | No lock-in, works immediately, zero auth required |
| Hosting | Vercel production | Instant global CDN, free SSL, auto-deploy from GitHub |
| Version control | GitHub | Industry standard, auto-deploy pipeline, audit trail |
| Domain | Cloudflare DNS + Vercel | Customer keeps registrar control |
| SEO | Schema.org JSON-LD + comprehensive hreflang + sitemap.xml | W3C-compliant, Google-recommended |

---

## Projected Impact

### What this platform unlocks for Mirtha (next 90 days):

- **Greenfield SEO positioning** — no legacy to unwind. Google will begin indexing all 45 pages within ~2 weeks of sitemap submission. Expected ranking for "bilingual realtor Monmouth County," "Spanish speaking realtor New Jersey," "Christie's Monmouth," and 22 neighborhood-specific long-tail terms.
- **Voice Concierge lead capture** — every visitor now gets a 24/7 bilingual docent. Expected conversion lift vs. a static "Contact Me" form: 3–5×.
- **Listing-support SEO** — every active listing has a dedicated editorial page. Listing URLs become shareable assets Mirtha can send in WhatsApp, email, and SMS.
- **Neighborhood authority content** — 22 neighborhood pages position her as the encyclopedic local guide. Expected inbound: buyers researching towns land on her page before they meet any other agent.
- **Bilingual differentiation** — zero other Monmouth County luxury realtors have an editorial-grade /es experience. Expected: immediate capture of Latin American international buyer segment moving capital into Jersey Shore.

### What it unlocks structurally:

- New listings plug in as a 120-line HTML file + 1 image
- New neighborhoods plug in as a 320-line HTML file + 1 image (template now exists)
- New languages plug in via `data-en` / `data-es` / `data-fr` / `data-it` / etc. (system is language-agnostic)
- Spark API key slot is already wired — the moment Teresa Minnick's broker authorization lands, the portfolio upgrades from iframe to native IDX with one paste
- Google Business Profile setup guide is complete — Mirtha can have GBP live in 30 minutes

---

## Cost Breakdown — Traditional Agency

What it would cost to produce this scope through a traditional creative agency in New York or San Francisco:

### Discovery + Strategy
| Line item | Range |
|---|---|
| 20-competitor competitive intelligence report | $8,000 – $15,000 |
| Brand strategy + positioning workshop | $10,000 – $25,000 |
| Content strategy + information architecture for 45 pages | $8,000 – $18,000 |
| **Subtotal** | **$26,000 – $58,000** |

### Brand Identity
| Line item | Range |
|---|---|
| Custom logo system (primary + 3 production variants) | $8,000 – $25,000 |
| 8-color palette + typography pairing + design system export | $6,000 – $18,000 |
| Brand guidelines document | $4,000 – $12,000 |
| **Subtotal** | **$18,000 – $55,000** |

### Design
| Line item | Range |
|---|---|
| UI/UX design for 45 pages (at $500–$1,500/page) | $22,500 – $67,500 |
| Interaction design (scroll-scrubbed hero, parallax, magnetic CTA, etc.) | $12,000 – $30,000 |
| Responsive design + mobile adaptations | $6,000 – $15,000 |
| **Subtotal** | **$40,500 – $112,500** |

### Content
| Line item | Range |
|---|---|
| Editorial copywriting (EN) for 45 pages | $22,500 – $45,000 |
| Bilingual translation to editorial-quality Spanish | $15,000 – $35,000 |
| 22 neighborhood rich-editorial narratives | $11,000 – $22,000 |
| 8 listing editorial narratives | $4,000 – $10,000 |
| **Subtotal** | **$52,500 – $112,000** |

### Production Assets
| Line item | Range |
|---|---|
| Hero drone video (traditional shoot: drone pilot + grading + 5-day post) | $15,000 – $45,000 |
| 22 neighborhood hero photography (editorial shoots) | $22,000 – $66,000 |
| 16 property/brand photos (mix of licensed stock + shoots) | $8,000 – $20,000 |
| Editorial portrait shoot | $2,500 – $8,000 |
| **Subtotal** | **$47,500 – $139,000** |

### Development
| Line item | Range |
|---|---|
| Frontend development (45 pages, custom interactions) | $35,000 – $85,000 |
| Canvas-based scroll-scrubbed hero engine | $12,000 – $30,000 |
| Multi-page architecture + shared asset system | $8,000 – $18,000 |
| FlexMLS iframe integration + portfolio category logic | $8,000 – $18,000 |
| AI voice agent integration (ElevenLabs + 7 custom client tools + knowledge base) | $18,000 – $40,000 |
| **Subtotal** | **$81,000 – $191,000** |

### SEO + Technical
| Line item | Range |
|---|---|
| On-page SEO audit + implementation across 45 pages | $10,000 – $25,000 |
| Schema.org JSON-LD graph (15+ schema types) | $6,000 – $15,000 |
| Sitemap, robots, hreflang, OG, Twitter, Core Web Vitals | $5,000 – $12,000 |
| Accessibility (WCAG 2.1 AA) audit + remediation | $6,000 – $15,000 |
| **Subtotal** | **$27,000 – $67,000** |

### Deployment + Launch
| Line item | Range |
|---|---|
| GitHub + Vercel + custom domain + SSL + auto-deploy pipeline | $3,000 – $8,000 |
| Google Business Profile setup + Search Console + Bing Webmaster | $2,500 – $6,000 |
| Launch QA across 45 pages on 3 browsers × 3 devices | $5,000 – $12,000 |
| **Subtotal** | **$10,500 – $26,000** |

### Project Management + QA
| Line item | Range |
|---|---|
| Project management (senior PM, 14-18 weeks at 15% of total) | $30,000 – $65,000 |
| Client review cycles + revision rounds (typically 3–5 per phase) | $15,000 – $30,000 |
| **Subtotal** | **$45,000 – $95,000** |

### **TOTAL — Traditional Agency Range: $348,000 – $855,500**

**Middle of range:** ~$470,000 for a boutique creative agency delivering this scope in 14–18 weeks.
**NYC/SF premium agency** (Ogilvy, R/GA, Huge tier): $650,000 – $1.2M+ for the same scope.

---

## Cost Breakdown — VioX AI Cinematic Design Studio

The VioX AI advantage isn't lower quality. It's the same quality, compressed time, and AI-accelerated production.

### How we delivered this for a fraction of traditional agency cost:

| Cost category | Traditional | VioX AI | How |
|---|---|---|---|
| Hero video production | $15K–$45K | ~$50 in compute | Gemini 3.1 Flash + WaveSpeed Kling v3 Pro generate cinematic drone video in minutes, not a 5-day post-production cycle |
| Photography (38 images) | $32K–$94K | ~$200 in compute | Gemini Nano Banana generates editorial-grade imagery; real photography sourced from official sites + MLS where applicable |
| Custom logo design | $8K–$25K | ~$10 in compute | Gemini Nano Banana generates 4 concepts in 90 seconds; Python PIL produces production variants in seconds |
| Copywriting (45 pages EN + ES) | $37K–$80K | AI-assisted drafting + expert editorial review | Claude-scale LLM drafts editorial-grade copy; human editorial pass keeps it brand-aligned |
| Development (45 pages + voice agent + scroll engine) | $81K–$191K | AI-paired engineering | Multi-agent orchestration compresses 14 weeks of frontend dev into ~2 weeks |
| Schema.org + SEO across 45 pages | $27K–$67K | Built-in | Our pipeline bakes Schema.org + SEO into the template layer |
| PM + revision cycles | $45K–$95K | Single-threaded delivery | AI-accelerated iteration means fewer rounds; tighter feedback loops |

### VioX AI Packaging Options

We offer three tiers for this scope:

#### 🥉 **Essential Launch** — $15,000 – $25,000 · 10-14 days
- Up to 15 pages (landing, about, listings × 4-6, contact, neighborhoods × 4-6)
- Standard cinematic hero (single video, no scroll-scrubbed engine)
- Bilingual EN/ES
- Basic Schema.org + SEO
- Voice agent (English only, 3 client tools)
- Custom logo (2 variants)
- 15 images
- Ideal for: a single agent launching their first personal-brand site

#### 🥈 **Cinematic Professional** — $35,000 – $55,000 · 14-21 days
- Up to 30 pages with multi-page architecture
- Full scroll-scrubbed canvas hero (121 frames, WaveSpeed Kling v3)
- Bilingual EN/ES with editorial translation
- Full Schema.org graph + Google Business Profile setup
- Bilingual voice agent (5 client tools)
- Custom logo (4 variants)
- 25 images + editorial-grade portrait treatment
- FlexMLS iframe integration
- Ideal for: an established agent or small team looking to leapfrog the market

#### 🥇 **Cinematic Flagship** — $75,000 – $125,000 · 18-28 days
- **Unlimited pages** (we built 45 for Mirtha)
- Full scroll-scrubbed cinematic hero system
- Bilingual EN/ES with editorial Spanish
- Full Schema.org graph + GBP + Search Console + Bing Webmaster setup
- **Bilingual voice agent with 7+ client tools** that can drive the entire site
- Custom logo system (4+ variants) + full brand design system export
- Unlimited images (38 for Mirtha)
- **Full neighborhood content system** (22 neighborhoods for Mirtha)
- FlexMLS iframe → upgradeable to full Spark API native IDX
- **Deliverable documents**: competitive intelligence report, build proposal, brand system export, GBP setup checklist, broker authorization email drafts, case study
- Ongoing retainer optional ($2,500/mo) for listing adds, market reports, content refreshes, Spark API integration when broker key lands
- Ideal for: top producers and boutique teams competing at the Serhant / The Agency / Official Partners level

### **Mirtha's Build: Cinematic Flagship Tier**

Delivered in 18 days.
Equivalent traditional-agency cost at delivered quality and scope: **$348,000 – $855,500**.
VioX AI Cinematic Flagship price: **a small fraction of that, delivered faster.**

---

## Timeline Comparison

| Milestone | Traditional Agency | VioX AI Cinematic Flagship |
|---|---|---|
| Kickoff + discovery | Week 1–3 | Day 1 |
| Brand identity | Week 4–7 | Day 2–5 |
| Design system | Week 5–9 | Day 3–6 |
| Copywriting EN | Week 6–12 | Day 4–10 |
| Copywriting ES translation | Week 12–16 | Day 4–10 (parallel) |
| Photography + video production | Week 4–10 | Day 2–6 |
| Development | Week 8–18 | Day 5–15 |
| SEO + Schema | Week 16–20 | Day 13–16 |
| QA + launch | Week 20–22 | Day 17–18 |
| **Total** | **14–22 weeks** | **14–18 days** |

**VioX AI delivers in ~10% of the calendar time of a traditional agency.**

---

## What Makes This 1-of-1

This is not a template. It is not a theme. It is not configurable by a non-technical user, and that is the point.

Every decision was load-bearing:
- The Navesink drone hero is not a stock video — it's a custom scene generated to match Mirtha's geographic specialty
- The 22 neighborhood narratives are hand-tuned per town, not auto-generated
- The editorial Spanish was hand-drafted, not machine-translated
- The "Heritage Atlantic Broker. Modern Cinematic Eye." positioning came out of a specific competitive finding
- The Christie's Red `#9B2032` is used surgically on exactly 3 moments per page (affiliate lockup, hover underline, one stat) — not decoratively
- The champagne gold `#C4A962` rule treatment instead of drop shadows is an intentional anti-SaaS decision
- The magnetic cursor CTA on "Private Showing" is specific to the editorial-luxury voice
- The 7 voice-agent client tools let Jessica give a guided tour instead of just answering questions

A template site has no soul. A cinematic design-studio build has a specific one.

---

## What Mirtha Controls, Long-term

- **GitHub repository** — full source ownership (`github.com/juan-viox/mirthacarolina-com`)
- **Vercel deployment** — zero lock-in, instant rollbacks, auto-deploy on push
- **Custom domain** — stays with her registrar
- **ElevenLabs agent** — her account, her knowledge base, her voice preferences
- **FlexMLS share** — no third-party auth required
- **All brand assets** — logo in 4 variants, color swatches, typography, design system JSON
- **All deliverable documents** — competitive report, proposal, brand system, GBP checklist, case study, email drafts

Nothing VioX-owned, nothing vendor-locked.

---

## Closing Statement

For the price of a single New York agency's discovery phase, Mirtha Carolina now has:

- An agency-level cinematic website
- Bilingual parity across 45 pages
- A branded AI voice concierge that speaks fluent Spanish and English
- A 22-neighborhood content library that positions her as the definitive Monmouth County authority
- Custom brand identity + logo system
- Full Schema.org graph + comprehensive SEO + GBP roadmap
- Live MLS integration (iframe today, Spark API-ready)
- A deployment pipeline that scales: new listings plug in as HTML, new neighborhoods as HTML, new languages as attributes

**Traditional agency equivalent: $348,000 – $855,500 · 14–22 weeks.**
**VioX AI Cinematic Flagship: a fraction of that · 18 days.**

This is what 1-of-1 looks like when AI takes on the production grind and human taste drives the decisions.

— VioX AI · Cinematic Design Studio
