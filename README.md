# AI Factory — Multi-Page Web Application
## Quick Start

Open `login-page.html` in any modern browser. No build step required.

---

## Demo Credentials

| User | Email | Password | Flow |
|------|-------|----------|------|
| Alex Morgan | `demo@aifactory.com` | `Demo@123` | No industry → **Landing Page** → pick industry |
| Dr. Sarah Chen | `health@aifactory.com` | `Health@123` | Pre-assigned → **Healthcare** page directly |

---

## Industry Pages

Each page (`healthcare.html`, `financial.html`, `manufacturing.html`, `retail.html`, `insurance.html`) matches the reference HTML structure with:

- **Hero** — industry-specific AI chat demo widget + floating metric cards
- **Trust strip** — client logos
- **Stats grid** — 4 outcome metrics with source citations
- **Featured Agents** — 6 hand-curated agent cards with thumbnail gradients, status ribbons, and Case Study links
- **Full gallery** — all use cases rendered dynamically via JS with:
  - Live search (title + description)
  - Category filter chips (top bar)
  - Sidebar checkbox filters (multi-group, multi-select)
  - Real-time count badge
  - Clear all button
- **Compliance / Trust** — 5 certification badges + 3 promise cards (dark section)
- **How it works** — 4-step deployment process
- **Case study** — customer quote with metrics overlay
- **FAQ** — native `<details>` accordion
- **CTA** — demo booking form
- **Footer** — 5-column with industry cross-links

## Use Case Counts

| Industry | Use Cases | Filter Groups |
|----------|-----------|---------------|
| Healthcare | 24 | Care setting, Department, Data source, Priority outcome |
| Financial | 20 | Business line, Data source, Regulatory framework, Business goal |
| Manufacturing | 16 | Production area, Data source, Business goal |
| Retail | 16 | Channel, Data source, Business goal |
| Insurance | 15 | Line of business, Data source, Business goal |

## Industry Color Themes (CSS variables)

| Industry | Accent | CSS Class |
|----------|--------|-----------|
| Healthcare | Teal `#0d9488` | `.industry-healthcare` |
| Financial | Blue `#1b4ea0` | `.industry-financial` |
| Manufacturing | Orange `#ea580c` | `.industry-manufacturing` |
| Retail | Purple `#9333ea` | `.industry-retail` |
| Insurance | Indigo `#4f46e5` | `.industry-insurance` |

## File Structure

```
/project
  /css
    industry.css      ← Full industry page design system (reference-matched)
    main.css          ← Shared design tokens
    login.css         ← Login page styles
    landing.css       ← Landing page styles
    dashboard.css     ← (legacy dashboard styles, not used by industry pages)
  /js
    gallery.js        ← Gallery engine: search, filter chips, sidebar filters, render
    core.js           ← Auth, theme, toast, localStorage
    login.js          ← Login form logic
    landing.js        ← Landing page interactions
    dashboard.js      ← (legacy, not used by industry pages)
  /assets             ← Placeholder for custom assets
  login-page.html
  landing-page.html
  healthcare.html
  financial.html
  manufacturing.html
  retail.html
  insurance.html
  README.md
```
