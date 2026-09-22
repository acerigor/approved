# CLAUDE.md — Virtual HR Agency Website

## Project overview

A marketing website for a **remote HR staffing agency** (brand name TBD). The agency provides dedicated HR professionals who work remotely for client companies, small and large.

**How the business works**
- The client company pays the agency one monthly invoice.
- The agency is the legal employer of the HR worker: it pays their salary and handles their benefits and employment paperwork.
- Clients can hire HR staff **full-time** or **part-time** (part-time suits small companies).

**Audience:** client companies only (small business owners and HR/operations leads at larger companies).
**Out of scope for now:** recruiting HR workers (no Careers page), client portal, worker portal, login.

**Primary goal of the site:** turn visitors into booked calls. The "Book a call" action is the main conversion on every page.

This is a **concept project** for a UX case study. Placeholder content (testimonials, stats, prices) must be realistic but clearly marked as placeholder in code comments.

---

## Tech stack

- **Next.js** (latest, App Router)
- **TypeScript**
- **Tailwind CSS v4** (set up by create-next-app)
- **React** for interactivity — no Alpine, no jQuery
- `next/font` for fonts, `next/image` for images, Metadata API for SEO

**Setup**
```bash
npx create-next-app@latest   # TypeScript, ESLint, Tailwind, App Router, no src/ dir, @/* import alias
npm run dev
npm run build
npm run lint
```

**Rendering approach**
- Pages are **Server Components** by default.
- Add `"use client"` only to the small components that need state or browser APIs (menu, toggle, accordion, calculator, form). Keep client components as small and low in the tree as possible.
- Every page should be statically generated — no data fetching at request time.

---

## Folder structure

```
/
├── CLAUDE.md
├── app/
│   ├── layout.tsx              # <html>, fonts, Header, Footer, default metadata
│   ├── globals.css             # Tailwind import + @theme design tokens + base styles
│   ├── page.tsx                # Home
│   ├── roles/
│   │   ├── page.tsx            # HR Roles overview
│   │   └── [slug]/page.tsx     # Role page template (generateStaticParams from data/roles.ts)
│   ├── how-it-works/page.tsx
│   ├── pricing/page.tsx
│   ├── why-us/page.tsx
│   ├── about/page.tsx
│   ├── book-a-call/page.tsx
│   ├── faq/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/                 # Header, MobileMenu, Footer, CtaSection
│   ├── sections/               # page sections (Hero, HowItWorksSteps, PaymentFlow, ...)
│   └── ui/                     # Button, Card, Accordion, Toggle, FormField, ...
├── data/
│   ├── roles.ts                # all five roles: slug, name, summary, tasks, bestFor, vetting, pricing, faqs
│   ├── pricing.ts
│   ├── faqs.ts
│   └── testimonials.ts         # placeholder
├── lib/                        # helpers (e.g. cost calculator logic)
└── public/
    └── images/
```

**Role slugs:** `hr-generalist`, `recruiter`, `payroll-specialist`, `hr-assistant`, `hr-manager`.
All role pages are generated from `data/roles.ts` through one template — never create separate files per role.

---

## Navigation

**Header (in `app/layout.tsx`):** Logo · HR Roles · How it Works · Pricing · Why Us · About · **Book a call** (primary button)
- Mobile: hamburger menu (client component), "Book a call" stays visible.
- Highlight the current page and set `aria-current="page"` (use `usePathname` inside a small client component).
- Use `next/link` for all internal links.

**Footer (in `app/layout.tsx`):** page links, FAQ, Privacy Policy, Terms, contact email/phone, copyright.

**Closing CTA section:** one reusable `<CtaSection />` component used at the end of every page.

---

## Pages and sections

### Home (`/`)
1. Hero — the promise (a dedicated HR professional without the hiring hassle), "Book a call" + "See pricing"
2. The problem — in-house HR hiring is slow and costly; doing it yourself takes time from the business
3. Who it's for — small companies (part-time HR) vs. larger companies (full-time or multiple staff)
4. HR roles — cards linking to each role page
5. How it works — short steps
6. How payment works — visual: company pays agency → agency pays and manages the HR worker
7. Why us — vetting, replacement guarantee, confidentiality
8. Testimonials (placeholder)
9. Pricing teaser
10. Final CTA

### HR Roles overview (`/roles`)
1. Intro
2. Role cards — what each role does, full-time/part-time availability, starting price
3. "Not sure which role you need?" → Book a call
4. CTA

### Role page template (`/roles/[slug]`)
1. Hero — role name, one-line summary, CTA
2. What they handle — main tasks
3. Who it's best for — company size and situations
4. How we vet them — qualifications and experience standards
5. Sample specialist profile card
6. Pricing for this role
7. FAQ (accordion)
8. CTA

Use `generateMetadata` for a unique title and description per role. Unknown slugs call `notFound()`.

### How it Works (`/how-it-works`)
1. Steps — consultation call → shortlist → interview and choose → onboarding → ongoing support
2. Payment flow diagram — one invoice to the agency; agency pays salary and handles benefits and paperwork
3. "What we handle vs. what you handle" comparison
4. Timeline — first call to HR person starting
5. Replacement guarantee
6. FAQ
7. CTA

### Pricing (`/pricing`)
1. Full-time / part-time toggle
2. Plan cards by role, with what's included
3. Custom quote for larger teams or multiple staff
4. Cost comparison — agency vs. hiring in-house (interactive calculator)
5. FAQ
6. CTA

### Why Us (`/why-us`)
1. Vetting process
2. Data security and confidentiality
3. Replacement guarantee
4. Dedicated account manager
5. Testimonials and key numbers (placeholder)
6. CTA

### About (`/about`)
1. Story and mission
2. Values
3. Leadership team (placeholder)
4. CTA

### Book a Call (`/book-a-call`) — the site's finish line
1. Form — name, work email, company, company size, role needed, full-time or part-time, preferred start date, message
2. Calendar to pick a call time (embed provider TBD: Cal.com or Calendly — leave a clearly marked placeholder)
3. "What happens next" in 3 steps
4. Other ways to reach us
5. Confirmation state after submitting

Form submission method TBD (Server Action, API route, or a service like Formspree) — leave a clearly marked placeholder. Validate on the client with inline, specific error messages; also validate on the server once submission is wired up.

### FAQ, Privacy, Terms, Not found
Simple content pages. FAQ reuses the Accordion component and data from `data/faqs.ts`.

---

## Design tokens

Tokens come from the Figma design system and live in `app/globals.css` under `@theme`. **Until they are provided, use neutral placeholder tokens and do not invent a brand palette or fonts.** When Figma tokens arrive, map them to:
- Colors (brand, neutrals, text, surfaces, feedback states)
- Font families (loaded with `next/font`, exposed as CSS variables) and type scale
- Spacing, border radius, shadows
- Breakpoints (if different from Tailwind defaults)

Always use tokens — no hard-coded hex values or arbitrary values like `text-[17px]` unless unavoidable.

---

## Interactive components (client components)

- `MobileMenu` — focus handling, Escape to close, locks body scroll while open
- `PricingToggle` — full-time / part-time; shares state with the plan cards it controls
- `Accordion` — `<button>` with `aria-expanded` and `aria-controls`
- `CostCalculator` — calculation logic lives in `lib/` as a pure, testable function
- `BookCallForm` — validation, submitting state, confirmation state
- Section reveals — use sparingly, one deliberate moment rather than on every section; implement with CSS and a small IntersectionObserver hook. **Ask before adding an animation library.**

Use React state and props; no global state library.

---

## Conventions

- **Mobile-first**, responsive; check at 375px, 768px, 1280px, and 1536px.
- **Accessibility:** WCAG 2.2 AA — semantic landmarks, one `<h1>` per page, logical heading order, visible focus states, labels on all form fields, alt text on images, color contrast AA, respect `prefers-reduced-motion`.
- **SEO:** export `metadata` (or `generateMetadata`) on every page with a unique title and description; default Open Graph data and a title template in `app/layout.tsx`; `sitemap.ts` and `robots.ts` included; `lang="en"`.
- **Performance:** `next/image` with explicit sizes, `priority` only on the hero image, `next/font` to avoid layout shift, minimal client JavaScript.
- **Copy:** plain language, sentence case, active voice. Buttons say what happens ("Book a call", not "Submit"). Placeholder copy must still read like real content. Page content lives in components or `data/`, not scattered in many places.
- **Code:** TypeScript with explicit types for data in `data/`; PascalCase component files (`PricingToggle.tsx`), kebab-case route folders; one component per file; no inline `style` props; no `any`.

---

## Workflow

- Build **one page or section at a time**; stop for review after each.
- Build order:
  1. Project setup (create-next-app, placeholder tokens in `globals.css`, fonts, base layout)
  2. Shared parts (Header, MobileMenu, Footer, CtaSection, Button)
  3. Home
  4. `data/roles.ts`, then the role page template
  5. Roles overview, How it Works, Pricing, Why Us, About
  6. Book a Call (form + confirmation)
  7. FAQ, Privacy, Terms, Not found, sitemap and robots
  8. Final pass: responsiveness, accessibility, SEO, performance
- Run `npm run lint` and `npm run build` after each step; fix all errors and warnings before moving on.
- Check each page in the browser at the breakpoints above.
- Ask before adding any new dependency or changing the stack.

---

## Open decisions (TBD)

- Brand name and logo
- Design tokens (from Figma)
- Pricing amounts
- Calendar provider (Cal.com or Calendly)
- Form submission method
- Analytics
- Hosting (Vercel is the natural fit for Next.js)
