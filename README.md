# Flash Fix Computers & Security Systems — Hyderabad

A premium, cinematic marketing website for a CCTV camera sales, installation, repair
and maintenance business serving Hyderabad.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Motion for
React (Framer Motion)**, **Lucide React**, **React Hook Form** and **Zod**.

---

## Business details — already filled in

| Field | Value |
| --- | --- |
| Business name | Flash Fix Computers & Security Systems |
| Brand | Flash Fix COMSEC |
| WhatsApp / Phone | +91 90305 46555 → `919030546555` |
| City | Hyderabad, Telangana |

Everything else lives in `src/config/business.ts`.

### ⚠️ Still needs filling in

Open **`src/config/business.ts`** and replace the remaining `REPLACE_*` values:

| Field | What to put |
| --- | --- |
| `email` | Business email address |
| `address.*` | Shop / office address |
| `hours[]` | Business hours (keep in sync with Google Business Profile) |
| `serviceAreas[]` | Verified Hyderabad service areas |
| `mapsUrl` | Google Maps link for "Get directions" |

Also update `metadataBase` in `src/app/layout.tsx` and the URLs in
`src/app/sitemap.ts` / `src/app/robots.ts` to your real domain before launch.

> **A quick check:** after editing, visit `/` and click any WhatsApp button. The URL
> should read `https://wa.me/919030546555?text=…`.

---

## 📸 Photography — `public/images/`

The repository ships with **generated placeholder images** so the site builds and
renders correctly offline. Replace them with your real photography, keeping the
same filenames:

```
public/images/
├── hero/cctv-hero.jpg          ← the big cinematic hero image (1400×1750)
├── cta/closing.jpg             ← final CTA background
├── services/
│   ├── installation.jpg         ← technician mounting a camera
│   ├── supply.jpg               ← boxed cameras / recorders
│   ├── repair.jpg               ← camera wiring / servicing
│   ├── upgrades.jpg             ← replacing an old camera
│   └── maintenance.jpg          ← engineer cleaning / re-aligning a camera
├── products/
│   ├── dome.jpg  bullet.jpg  ip.jpg  wireless.jpg  ptz.jpg
│   └── dvr.jpg   nvr.jpg     accessories.jpg
├── solutions/
│   ├── home.jpg  apartment.jpg  shop.jpg  office.jpg
│   ├── warehouse.jpg  commercial.jpg  factory.jpg  community.jpg
├── projects/
│   └── project-1.jpg … project-8.jpg
├── trust/maintenance.jpg
└── pages/
    └── services.jpg  products.jpg  solutions.jpg
    projects.jpg  about.jpg  contact.jpg
```

**Photo guidance**

- Hero: 1400×1750 (4:5 portrait) or wider, dark, low-contrast subjects, dusk.
- Service and solution images: 1400×900, natural light, real working context.
- Products: 1200×900, plain background, the unit filling the frame.
- Projects: only **approved** installation photos. Never include customer names,
  house numbers, company plates, or enough detail to identify a camera's exact
  placement on a private property.

You can regenerate the placeholders any time with:

```bash
node scripts/generate-placeholders.mjs   # all images
node scripts/generate-hero.mjs          # hero only
node scripts/generate-favicon.mjs       # favicon.ico
```

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
```

> `next dev` writes to `.next-dev` and `next build` / `next start` write to
> `.next`, so a running dev server can never corrupt a production build.

### The homepage

The homepage is deliberately **six sections** so it stays tight and converts well.
Everything else lives on its own page, and each section links out — no content is
hidden, only moved to where it belongs.

| # | Section | Full content lives at |
| --- | --- | --- |
| 1 | Hero | — |
| 2 | Services (3 featured) | `/services` |
| 3 | Products (4 featured) | `/products` |
| 4 | Installation process | — |
| 5 | AMC & maintenance / trust | — |
| 6 | Enquiry form + closing CTA | `/contact` |

Also on their own pages: `/solutions` (8 property types), `/projects` (gallery +
lightbox), `/services` (5 services in full + FAQs).

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx            ← fonts, header, footer, floating contact
│   ├── page.tsx              ← homepage
│   ├── globals.css           ← design tokens + component primitives
│   ├── icon.svg              ← favicon (Next file-based metadata)
│   ├── api/enquiry/route.ts  ← validated enquiry endpoint
│   ├── services/  products/  solutions/  projects/
│   ├── about/  contact/  privacy/
│   ├── not-found.tsx  sitemap.ts  robots.ts
├── components/
│   ├── layout/               ← Header, Footer, PageHero, FloatingContact
│   ├── motion/               ← Reveal, MotionButton, MediaImage, useReveal
│   ├── home/                 ← homepage sections (Hero, ServicesCondensed, …)
│   ├── forms/EnquiryForm.tsx ← RHF + Zod form with loading/success/error states
│   └── ui/Logo.tsx           ← Flash Fix COMSEC badge
├── config/
│   ├── business.ts           ← ⚠️ business details (edit this)
│   └── navigation.ts         ← nav + footer link structure
├── data/site.ts              ← services, products, solutions, projects, FAQs
├── lib/
│   ├── motion.ts             ← shared animation variants + timing tokens
│   ├── enquiry-schema.ts     ← Zod schema shared by client and server
│   └── utils.ts
```

---

## Design system

### Tokens

All tokens live in `tailwind.config.ts` and `src/app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `ink-950` | `#07090E` | Cinematic near-black — hero, dark sections |
| `navy-900` | `#0A1020` | Deep navy — the signature hero surface |
| `bone-100` | `#F5F3EF` | Warm neutral — alternating content sections |
| `electric-500` | `#2E6BFF` | Electric blue — accent only, used sparingly |
| `signal-500` | `#25D366` | WhatsApp green — conversion actions only |

Typography is **Chakra Petch** (display + body) with the auto-generated
`Chakra Petch Fallback` face, so there is no layout shift while the font loads.

### Motion

`src/lib/motion.ts` holds the shared variants — `fadeUp`, `fadeInLeft`,
`fadeInRight`, `fadeIn`, `scaleIn`, `imageReveal`, `heroScale`, the stagger
containers, and the `EASE` / `DURATION` timing tokens.

Two ways to reveal content:

```tsx
// 1. The hook (preferred — reduced-motion aware)
const reveal = useReveal();
<motion.div {...reveal({ opacity: 0, y: 24 }, { opacity: 1, y: 0 }, { delay: 0.06 })} />

// 2. The variant component
<Reveal delay={0.1}><h2>…</h2></Reveal>
```

**Reduced motion.** `useReveal()` switches from `whileInView` to `animate` with a
zero-duration transition when the user prefers reduced motion, so content is
never left hidden waiting for a scroll trigger that will not run. The global
stylesheet also neutralises CSS animations and transitions.

**Rules applied throughout**

- Only `opacity` and `transform` are animated — no layout thrashing.
- Scroll triggers use Motion's `whileInView` (IntersectionObserver), not
  `window.addEventListener("scroll")`.
- The header uses one passive, `requestAnimationFrame`-throttled scroll listener.
- Parallax is limited to a subtle image offset and is disabled on reduced motion.
- No bouncing, no animated counters, no perpetual motion beyond the scroll cue
  and the WhatsApp pulse ring.

---

## The enquiry form

`src/components/forms/EnquiryForm.tsx` uses React Hook Form with a Zod resolver.

- **Client-side validation** — `src/lib/enquiry-schema.ts`
- **Server-side validation** — the same schema runs again in
  `src/app/api/enquiry/route.ts` (never trust the client)
- **States** — idle, loading (spinner + disabled), success (confirmation panel),
  error (inline alert naming the failure and offering WhatsApp/call)

### Where enquiries go

Each enquiry is written to `data/enquiries.json` on the server **and** emailed to
the business inbox when Gmail SMTP is configured (see `.env.example`).

```bash
cp .env.example .env.local
# Edit .env.local — add your Gmail App Password (not your normal login password).
```

| Variable | Purpose |
| --- | --- |
| `GMAIL_USER` | Gmail account used to send (e.g. `flashfixhyd1@gmail.com`) |
| `GMAIL_APP_PASSWORD` | 16-character [Google App Password](https://myaccount.google.com/apppasswords) |
| `ENQUIRY_NOTIFY_EMAIL` | Inbox that receives leads (defaults to `business.email` in `business.ts`) |

If persistence fails, the endpoint returns a 500 and the form shows an error — **it
never shows a false success**. If email fails but the file save worked, the visitor
still sees success (check server logs).

To also forward enquiries to a CRM, Google Sheet, or automation tool, set:

```bash
ENQUIRY_WEBHOOK_URL=https://your-endpoint.example/enquiries
```

The endpoint POSTs the enquiry as JSON:

```json
{
  "id": "ENQ-MVTDOQLA",
  "receivedAt": "2026-01-01T00:00:00.000Z",
  "name": "…", "phone": "…", "email": "…",
  "propertyType": "…", "location": "…", "service": "…",
  "cameraCount": "…", "message": "…"
}
```

If the webhook fails, the enquiry is still saved locally so it is never lost.

> On a read-only server filesystem (some PaaS platforms), `data/enquiries.json`
> cannot be written — configure `ENQUIRY_WEBHOOK_URL` there.

---

## WhatsApp integration

All WhatsApp links come from `whatsappLink()` in `src/config/business.ts`:

```ts
whatsappLink("Hi, I'd like a price for Dome Cameras.", business.name)
// → https://wa.me/919876543210?text=Hi%2C%20I'd%20like...
```

Each service, product and CTA passes a contextual message so the customer
arrives with the conversation already framed. Click-to-call links use
`telLink()`.

---

## Accessibility

- Skip-to-content link as the first tab stop.
- Visible focus rings on every interactive element (`ring-2 ring-electric-500`).
- `aria-expanded` / `aria-controls` on the mobile menu; `Escape` closes it; body
  scroll is locked while it is open.
- Accessible accordion with `aria-expanded`, `aria-controls` and `role="region"`.
- Project lightbox: `role="dialog"`, `aria-modal`, arrow-key navigation,
  `Escape` to close, scroll lock.
- Every image has meaningful `alt` text; decorative images use `alt=""`.
- One `<h1>` per page, with a sane heading hierarchy.
- Form fields have real `<label>`s, `aria-invalid`, and inline error messages.

---

## Performance

- Server Components by default. Client Components are limited to the genuinely
  interactive pieces: header, hero, service/product/solutions sections, project
  gallery, FAQ, process timeline, enquiry form, floating contact.
- `next/image` with AVIF/WebP, explicit `sizes`, and `priority` only on the hero.
- Shared bundles: ~103 kB first-load JS; the homepage adds ~7.7 kB of route code.
- All marketing pages are statically prerendered; only `/api/enquiry` is dynamic.

---

## Validation scripts

Useful helpers used while building this site. They require the Chrome app on
macOS.

```bash
npm run start -- -p 3111        # in one terminal

node scripts/audit.mjs           # per-page audit: h1 count, broken images,
                                 # missing alt, zero-size controls, console errors
node scripts/a11y.mjs            # reduced motion, keyboard nav, focus rings,
                                 # mobile menu open/close/Escape
node scripts/slice.mjs           # scroll-through screenshots of every section
```

---

## Browser support

Modern evergreen browsers. The site uses `IntersectionObserver`, CSS
`backdrop-filter`, `clamp()`, `:focus-visible`, and `env(safe-area-inset-*)`,
with sensible fallbacks where a feature is unavailable.

---

## Deployment

Deploys as a standard Next.js app (Vercel, or any Node 18+ host).

```bash
npm run build
npm run start
```

Set `ENQUIRY_WEBHOOK_URL` in the deployment environment if you use a webhook.
Update `metadataBase` in `src/app/layout.tsx` and the URLs in `src/app/sitemap.ts`
and `src/app/robots.ts` to your real domain before launch.
