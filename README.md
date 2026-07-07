# SDCI (Sustainable Development Conversations Initiative) Website

This is the complete production-grade website for SDCI (Sustainable Development Conversations Initiative), an independent policy think tank based in Bauchi, Nigeria.

The site is built with a content management system (CMS) embedded directly in the application, enabling editors to manage publications, podcast episodes, infographics, events, team bios, membership tiers, and contact submissions.

## Tech Stack

1. **Framework**: Next.js 16 (App Router, TypeScript, React Server Components)
2. **CMS**: Payload CMS 3 (Code-first schemas, embedded admin panel)
3. **Database**: Dual-database adapter support via Drizzle ORM:
   - **Local/Development**: SQLite (`@payloadcms/db-sqlite`) local file `payload.db`
   - **Staging/Production**: PostgreSQL (`@payloadcms/db-postgres`) automatically used when `DATABASE_URI` starts with `postgres://` or `postgresql://`
4. **Styling**: Tailwind CSS (v4 CSS-first design tokens, Newsreader serif + Inter sans Google Fonts)
5. **Validation & Actions**: Next.js Server Actions + Zod validations
6. **Payments**: Paystack Inline Checkout integration (Naira native + Diaspora USD path)

---

## Folder Structure

```
├── public/                     # Static assets and uploads
│   └── uploads/                # Media uploads directory (gated PDFs, images)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/              # Frontend Application pages
│   │   │   ├── about/          # Mission & Team pages
│   │   │   ├── careers/        # Talent pool CV submission form
│   │   │   ├── contact/        # Contact form
│   │   │   ├── data-tools/     # Parked Coming Soon page
│   │   │   ├── events/         # Upcoming and past events
│   │   │   ├── faq/            # FAQ page with Accordion
│   │   │   ├── get-involved/   # Membership checkout & donations
│   │   │   ├── media/          # Podcast episodes & Documentaries
│   │   │   ├── programmes/     # Consultation request forms
│   │   │   ├── research/       # Filterable research database
│   │   │   │   └── [slug]/     # Paywalled Detail page template
│   │   │   └── style-guide/    # Verification guide page
│   │   ├── (payload)/          # Payload CMS admin routes
│   │   └── globals.css         # Tailwind v4 color theme tokens
│   ├── components/             # Reusable UI Primitives
│   │   ├── ui/                 # In-house components (Button, Card, Tag...)
│   │   └── shared/             # Layouts (Header, Footer, SearchModal...)
│   ├── payload/                # Payload CMS Configuration
│   │   ├── payload.config.ts   # Database adapter switching logic
│   │   ├── seed.ts             # Database seeding scripts
│   │   ├── collections/        # Team, Publications, Podcast, Submissions...
│   │   └── globals/            # Navigation, Footer, SiteSettings, ImpactStats...
```

---

## Color System & Typography Tokens

We implement custom design tokens within Tailwind v4 in `src/app/globals.css`:
- **Deep Petrol (`#02273d`)**: Primary color for typography ink and dark backgrounds.
- **SDCI Green (`#16ac62`)**: Accent action color.
- **Bright Lime (`#c0ff71`)**: High-energy highlight spark on dark backgrounds.

### Accessibility Safeguards (WCAG AA)
- **Lime (#c0ff71)** is decorative-only. It is never used for small text to prevent contrast failures.
- **Green (#16ac62)** uses Deep Petrol text on buttons, or is darkened to `#167546` for white text button variations to pass the 4.5:1 ratio requirement.

---

## Environment Variables

Create a `.env` or `.env.local` file in the root workspace:

```env
# Payload CMS Secret Key
PAYLOAD_SECRET=sdci_default_super_secret_key_12345

# Database Configuration (defaults to local SQLite file:./payload.db if left blank)
# To use Postgres in production:
# DATABASE_URI=postgresql://user:password@host/db-name?sslmode=require
```

---

## Local Development & Seeding

1. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *Note: On first startup, the database auto-seeding routine triggers. If `payload.db` is empty, it populates all membership tiers, focus areas, FAQ lists, team profiles, and publications automatically from `SDCI-website-content.md`.*

3. **Verify Design Elements**:
   Navigate to [http://localhost:3000/style-guide](http://localhost:3000/style-guide) to view components, form inputs, validation triggers, and the theme palette.

4. **CMS Admin Panel**:
   Access the editor workspace at [http://localhost:3000/admin](http://localhost:3000/admin).
   - **Default Dev Login**: `admin@sdcinitiative.com`
   - **Default Dev Password**: `adminpassword`

---

## Payments & Gating

- **Paystack sandbox payments**: Integrated client-side on the Get Involved page, loading inline test sheets.
- **Gating**: Gated publications (e.g. White Papers, full Magazine Digest PDF issues) automatically verify users' active authenticated session token. If invalid, the page blocks access and renders a premium editorial paywall call-out.
