# AI Factory — Multi-Page Web Application

## Quick Start
Open `login-page.html` in any modern browser. No build step required.

---

## Demo Credentials

| User | Email | Password | Flow |
|------|-------|----------|------|
| Alex Morgan | `demo@aifactory.com` | `Demo@123` | No industry pre-set → **Landing Page** → select industry |
| Dr. Sarah Chen | `health@aifactory.com` | `Health@123` | Pre-assigned Healthcare → goes directly to **Healthcare Dashboard** |

Both accounts are accessible via the **Guest** shortcut buttons on the login page.

---

## Pages

| File | Description |
|------|-------------|
| `login-page.html` | Authentication page with animated SVG illustration |
| `landing-page.html` | Industry selection hub |
| `healthcare.html` | Healthcare AI platform dashboard |
| `financial.html` | Financial Services AI platform dashboard |
| `manufacturing.html` | Manufacturing AI platform dashboard |
| `retail.html` | Retail AI platform dashboard |
| `insurance.html` | Insurance AI platform dashboard |

---

## File Structure

```
/project
  /css
    portal.css      ← Admin portal layout + dark mode (industry pages)
    login.css       ← Login page styles
    landing.css     ← Landing page styles
    main.css        ← Shared design tokens
  /js
    gallery.js      ← Gallery engine (search, filters, runtime counts)
    portal.js       ← Sidebar, theme toggle, mobile nav
    core.js         ← Auth, Theme, Toast, localStorage
    login.js        ← Login form validation + guest buttons
    landing.js      ← Landing page interactions
  login-page.html
  landing-page.html
  healthcare.html
  financial.html
  manufacturing.html
  retail.html
  insurance.html
  README.md
```

---

## Industry Pages — What Each Includes

- **Admin portal layout** — fixed sidebar + sticky topbar + scrollable main content
- **Dark / Light mode toggle** — persisted in localStorage
- **Hero section** — headline + animated chat widget
- **KPI cards** — 4 outcome metrics
- **Featured Agents** — 6 agent cards with gradients, status ribbons, Case Study + Demo + POC actions
- **Use-Case Gallery** — live search + category chip filters + sidebar checkbox filters
  - Counts computed from data at runtime — always accurate
- **Compliance section** — certification badges + promise cards (dark background)
- **How It Works** — 4-step deployment process
- **Case Study** — split card with customer quote and metrics
- **FAQ** — native `<details>` accordion
- **CTA** — demo booking form

---

## Industry Colour Themes

| Industry | Accent | CSS class |
|----------|--------|-----------|
| Healthcare | Teal `#0d9488` | `.ind-healthcare` |
| Financial | Blue `#2563c6` | `.ind-financial` |
| Manufacturing | Orange `#ea580c` | `.ind-manufacturing` |
| Retail | Purple `#9333ea` | `.ind-retail` |
| Insurance | Indigo `#4f46e5` | `.ind-insurance` |

Adding a new industry requires only a new HTML page + a new CSS class with `--accent` overrides.

---

## Notes

- Client logos and case-study quotes are **illustrative placeholders** for demo purposes.
- All `href="#"` case-study links point to the `#case-study` section on the same page.
- Sidebar active state is set exclusively by `portal.js` based on the current page — never hard-coded in HTML.
