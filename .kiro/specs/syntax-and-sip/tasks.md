# Syntax & Sip — Implementation Tasks

> Tasks are organised into 8 phases that match the approved development process from the steering file. Each phase is independently runnable and reviewable. Do not begin a new phase until the current one has been visually inspected and approved.
>
> **Rule:** No AI-generated dashboard aesthetics. No rounded card grids. No glassmorphism. No blob decorations. No SaaS layout patterns. Every phase must feel like a human-composed editorial café design.

---

## Phase 1 — Brand Foundation + Home Hero

**Goal:** Get the project running with the correct brand system and a complete, visually accurate home hero. At the end of this phase you should be able to run `npm run dev` and see the navbar and hero looking like a premium café site.

---

### Task 1.1 — Install dependencies and verify project runs

**Files:** `package.json`, `vite.config.js`

**What to do:**
- Confirm React, Vite, and React Router DOM are installed.
- If React Router DOM is not present, install it: `npm install react-router-dom`.
- Run `npm run dev` and confirm the dev server starts without errors.
- Clear out the default Vite boilerplate from `App.jsx`, `App.css`, `index.css`, `main.jsx` — replace with empty/minimal shells.

**Acceptance criteria:**
- `npm run dev` starts without errors.
- The browser shows a blank page (or just "Syntax & Sip") — no Vite/React logos, no default CSS.

---

### Task 1.2 — Create CSS variables and global styles

**Files:** `src/styles/variables.css`, `src/styles/global.css`, `src/main.jsx`

**What to do:**
- Create `src/styles/variables.css` with all CSS custom properties from design §4.1:
  - All 9 palette colours (`--color-espresso`, `--color-deep-coffee`, `--color-roasted-brown`, `--color-warm-clay`, `--color-caramel`, `--color-cream`, `--color-soft-beige`, `--color-dark-text`, `--color-accent`)
  - Typography variables: `--font-display`, `--font-body`, and all 6 size tokens using `clamp()`
  - Spacing tokens: `--space-xs` through `--space-2xl`
  - Radius tokens: `--radius-sm`, `--radius-md`, `--radius-lg`
  - Transition tokens: `--transition-fast`, `--transition-base`, `--transition-slow`
- Create `src/styles/global.css` with:
  - CSS reset (box-sizing, margin/padding reset, `html` and `body` base styles)
  - `body` background: `--color-soft-beige`, color: `--color-dark-text`
  - Font family applied to `body` using `--font-body`
  - `prefers-reduced-motion` rule that collapses all animation/transition durations to `0.01ms`
  - No decorative styles yet — this is foundation only
- Import both files in `src/main.jsx` before anything else.

**Acceptance criteria:**
- CSS variables are accessible in browser DevTools on `:root`.
- Body background is `#F3E9DF` (soft beige).
- No layout or visual styles applied yet beyond the reset.

---

### Task 1.3 — Set up routing skeleton

**Files:** `src/App.jsx`, `src/pages/Home/Home.jsx`, `src/pages/Space/Space.jsx`, `src/pages/Fuel/Fuel.jsx`, `src/pages/Squad/Squad.jsx`, `src/pages/Checkout/Checkout.jsx`, `src/pages/Story/Story.jsx`

**What to do:**
- Wrap the app in `<BrowserRouter>` in `src/main.jsx` (or `App.jsx`).
- Define all 6 routes in `App.jsx` using `<Routes>` and `<Route>`:
  - `/` → `Home`
  - `/space` → `Space`
  - `/fuel` → `Fuel`
  - `/squad` → `Squad`
  - `/checkout` → `Checkout`
  - `/story` → `Story`
- Each page component is a minimal stub: just a `<main>` with the page name as an `<h1>` for now.
- `<Navbar>` and `<Footer>` are rendered outside `<Routes>` in `App.jsx` — stubbed as empty `<nav>` and `<footer>` elements for now.

**Acceptance criteria:**
- Navigating to `/space`, `/fuel`, `/squad`, `/checkout`, `/story` in the browser shows the correct page stub.
- No 404 errors on any of these routes.

---

### Task 1.4 — Build the Button component

**Files:** `src/components/Button/Button.jsx`, `src/components/Button/Button.css`

**What to do:**
- Create a `Button` component that accepts: `variant` (`"primary"` | `"secondary"` | `"ghost"`), `children`, `onClick`, `as` (default `"button"`, can be `"a"` or React Router `Link`), `to` (for link destination), `href`, and any standard HTML button/anchor attributes.
- `primary`: background `--color-espresso`, text `--color-cream`, no border. On hover: background `--color-deep-coffee`. Transition: `--transition-fast`.
- `secondary`: background transparent, border `1.5px solid --color-espresso`, text `--color-espresso`. On hover: background `--color-espresso`, text `--color-cream`. Transition: `--transition-fast`.
- `ghost`: no background, no border, text `--color-dark-text`. On hover: text `--color-deep-coffee`, underline.
- All variants: minimum height `44px`, `padding: 10px 24px`, `cursor: pointer`, `font-family: --font-body`, uppercase letter-spacing.
- Do NOT make buttons giant pill-shaped. Use `--radius-sm` (4px) only.
- Focus ring: `outline: 2px solid var(--color-accent); outline-offset: 2px`.

**Acceptance criteria:**
- All three variants render correctly when added to a test page or Home stub.
- Hover states work.
- Focus ring visible on keyboard focus.
- Buttons are not oversized or pill-shaped.

---

### Task 1.5 — Build the Navbar component

**Files:** `src/components/Navbar/Navbar.jsx`, `src/components/Navbar/Navbar.css`

**What to do:**
- Build `<Navbar>` as a `<nav>` element with:
  - Brand name "SYNTAX & SIP" as a `<Link to="/">` — display font, cream colour
  - Four `<NavLink>` links: SPACE `/space`, FUEL `/fuel`, SQUAD `/squad`, STORY `/story`
  - `BOOK A DESK` as a `Button variant="primary"` linking to `/space`
  - Desktop: single horizontal row, brand left, links centred, CTA right
  - Active link class `nav-link--active`: subtle underline or `--color-cream` colour shift
- The navbar has two visual modes controlled by a CSS class:
  - `.navbar--overlay`: used on `/` (homepage). `position: fixed`, `background: transparent`, appears over the hero. Links and brand are `--color-cream`.
  - `.navbar--solid`: used on all other pages. `background: --color-espresso`, links are `--color-cream`.
- Use `useLocation()` from React Router to detect the current route and apply the correct class.
- Mobile (`< 768px`): show only brand + hamburger icon. Hamburger is a plain `<button>` with three horizontal lines (CSS-drawn, no icon library). Clicking opens a full-width dropdown menu with stacked links and the CTA. The dropdown slides down (CSS transition).
- Add `aria-expanded`, `aria-controls` to the hamburger button.
- Add a `menuOpen` state (local `useState`) to control the dropdown.

**Acceptance criteria:**
- On `/`, navbar is transparent and overlays the hero without a visible bar separation.
- On `/space` (and other inner pages), navbar has solid espresso background.
- All 4 nav links navigate correctly.
- BOOK A DESK goes to `/space`.
- Active link is visually distinguished.
- On mobile, hamburger opens/closes the dropdown.
- No icon libraries used. No glassmorphism. No rounded rectangle pill nav.

---

### Task 1.6 — Build the homepage hero section

**Files:** `src/pages/Home/Home.jsx`, `src/pages/Home/Home.css`

**What to do:**
- Replace the Home stub with the actual hero section.
- The hero must be a `<section>` with `min-height: 100vh` and the `hero.png` asset as a `background-image`.
- Layer a CSS gradient overlay on top of the image: `linear-gradient(to bottom, rgba(29,8,4,0.45) 0%, rgba(29,8,4,0.82) 100%)`. This keeps the photo visible while ensuring text contrast.
- Inside the hero:
  - A large headline: all-caps, `--size-display-xl`, `--font-display`, `--color-cream`. Text: "FIND YOUR CORNER." (or the chosen headline — pick one and commit to it).
  - A tagline below: `--size-heading`, `--font-body`, `--color-caramel`. Text: "A café designed around the way you work."
  - Two CTAs side by side: `Button variant="primary"` ("BOOK A DESK" → `/space`) and `Button variant="secondary"` ("BUILD YOUR SIP" → `/fuel`).
- The Navbar overlays the hero (no visible gap). The hero content should be offset from the top by the navbar height using `padding-top`.
- **Layout**: The text and CTAs should be positioned to the lower-left or centre-left of the hero, NOT symmetrically centred like a SaaS landing page. Asymmetric feels more editorial and human.
- No floating cards, no blobs, no geometric shapes over the photo.

**Acceptance criteria:**
- The hero fills the full viewport on load.
- `hero.png` is visible through the gradient.
- Headline is large and dominant.
- Tagline uses the correct colour.
- Both CTA buttons are visible and navigate correctly.
- Navbar visually integrates with the hero (no white bar above the photo).
- Does NOT look like a generic startup landing page.

---

### Task 1.7 — Build the Footer component

**Files:** `src/components/Footer/Footer.jsx`, `src/components/Footer/Footer.css`

**What to do:**
- Simple footer: dark background (`--color-espresso`), cream text.
- Left: "SYNTAX & SIP" brand name.
- Centre: four nav links (Space, Fuel, Squad, Story) in a row.
- Right: a short tagline ("A café designed around the way you work.") or copyright line.
- No excessive columns, no social media icons, no newsletter signup. Keep it compact and premium.
- Single horizontal row on desktop. Stacked on mobile.

**Acceptance criteria:**
- Footer appears on every page.
- Footer uses espresso background and cream text.
- All nav links work.
- Footer is not cluttered or overwrought.

---

## Phase 2 — Supporting Homepage Sections

**Goal:** Complete the homepage with all 8 sections from the design. At the end of this phase the homepage is a fully scrollable, visually complete campaign page. Each section must look compositionally distinct.

---

### Task 2.1 — Brand introduction section

**Files:** `src/pages/Home/Home.jsx`, `src/pages/Home/Home.css`

**What to do:**
- Add a section immediately after the hero.
- Background: `--color-espresso`.
- Two-column layout on desktop: large pull-quote on the left (2/3 width), short supporting copy on the right (1/3 width).
- Pull-quote: a single impactful sentence in `--size-display-md`, `--font-display`, `--color-cream`. Something like: "Not just a café. A place built for how you think."
- Right copy: 2–3 short sentences in `--size-body`, `--color-caramel` explaining the platform's concept.
- No border boxes around the text. No cards. Just typography and whitespace on a dark background.
- On mobile: stacked, pull-quote on top.

**Acceptance criteria:**
- Section is visually distinct from the hero (dark solid background vs photographic).
- Typography is large and editorial on desktop.
- No card containers. No borders around the section content.

---

### Task 2.2 — Product journey section (01 / 02 / 03)

**Files:** `src/pages/Home/Home.jsx`, `src/pages/Home/Home.css`

**What to do:**
- Add a section with a light beige background (`--color-soft-beige`).
- Title: "HOW IT WORKS" or "THE JOURNEY" — small label above, then a large step-numbered layout.
- Three steps in a horizontal editorial row on desktop:
  - **01 FIND YOUR SPACE** — short description, link to `/space`
  - **02 BUILD YOUR SIP** — short description, link to `/fuel`
  - **03 STUDY TOGETHER** — short description, link to `/squad`
- Step numbers ("01", "02", "03") in `--size-display-lg`, `--font-display`, `--color-caramel` — decorative, large, offset.
- Step titles in `--size-display-md`, `--font-display`, `--color-espresso`.
- Step descriptions in `--size-body`, `--color-dark-text`.
- A text link (not a button pill) at the bottom of each step.
- On mobile: stacked vertically. Numbers remain large.
- **Do not** put borders or box shadows around each step. Use whitespace and typography weight to separate them.

**Acceptance criteria:**
- Three numbered steps visible and legible.
- Each step links to the correct page.
- No card borders or shadows around steps.
- Looks like a typographic editorial section, not a feature card grid.

---

### Task 2.3 — Space preview section

**Files:** `src/pages/Home/Home.jsx`, `src/pages/Home/Home.css`

**What to do:**
- Add an asymmetric two-column section. Background: `--color-cream`.
- Left column (text side, narrower): 
  - Section label: "SPACE" in small caps/uppercase, `--color-warm-clay`
  - Heading: "Choose your corner." in `--size-display-md`, `--font-display`
  - 1–2 sentences describing the seat telemetry concept
  - A "FIND A SEAT →" text link to `/space`
  - Two or three stat callouts below the text: e.g. "18 seats", "6 filters", "Live telemetry" — plain text figures, NOT metric cards or badge pills
- Right column (visual side, wider): a small simplified SVG floor map preview — just the outer room shape, a few circles representing seats (no interactivity, purely illustrative), zone labels. This is a teaser, not a full map.
- Left column: ~40% width. Right column: ~60%. On mobile: stacked.

**Acceptance criteria:**
- Asymmetric layout visible on desktop.
- SVG room preview is present (even if simplified) and not interactive.
- No card boxes around the stat figures.
- Links to `/space`.

---

### Task 2.4 — Fuel preview section

**Files:** `src/pages/Home/Home.jsx`, `src/pages/Home/Home.css`

**What to do:**
- Add a full-width typographic band section. Background: `--color-deep-coffee` or `--color-espresso`.
- Centre-aligned (one of few sections that IS centred, intentionally, as a typographic moment).
- A large drink name in `--size-display-xl`, `--font-display`, `--color-cream` — e.g. "OATMILK LATTE." — static, decorative.
- Below it: 3–4 small metric callouts in a horizontal row: e.g. "₹180  ·  64mg caffeine  ·  180kcal  ·  3g protein". Plain text, `--color-caramel`, `--size-small`. No boxes, no pills around each metric.
- A "BUILD YOURS →" text link to `/fuel` in `--color-cream`.
- This section should feel like a typographic poster, not a product configurator preview.

**Acceptance criteria:**
- Large drink name is visually dominant.
- Metric row is subtle and understated.
- Dark background contrasts with adjacent sections.
- Not a card or feature box. No rounded rectangles with borders.

---

### Task 2.5 — Squad preview section

**Files:** `src/pages/Home/Home.jsx`, `src/pages/Home/Home.css`

**What to do:**
- Add a section. Background: `--color-soft-beige`.
- Heading: "STUDY TOGETHER." in `--size-display-md`, `--font-display`.
- Below: a simple styled list of 3–4 fake member names and amounts:
  ```
  Priya        Oat Latte + Vanilla     ₹210
  Arjun        Cold Brew               ₹180
  Kavya        Matcha + Oat Milk       ₹230
  ────────────────────────────────────────
  Total                                ₹620
  ```
  Plain text table layout using CSS grid/flex. No card boxes. No table borders. Use a thin `1px` line only for the total separator.
- Below the list: "Split equally? By order? You decide." in body copy.
- A "START A SQUAD →" text link to `/squad`.
- Right side (on desktop): large display text showing "3 members / ₹620" or similar — a big typographic number that acts as a visual anchor.

**Acceptance criteria:**
- Member/order list is visible and legible.
- The list uses simple text layout, NOT a card grid.
- Large typographic number visible on desktop.
- Links to `/squad`.

---

### Task 2.6 — Story / editorial section and final CTA

**Files:** `src/pages/Home/Home.jsx`, `src/pages/Home/Home.css`

**What to do:**
- **Story teaser section:** Background `--color-espresso`. A pull-quote in large italic `--font-display` cream text: e.g. *"We built Syntax & Sip because we kept working in places that didn't get it."* Below: a `READ OUR STORY →` text link to `/story`.
- **Final CTA section:** Background `--color-soft-beige`. A large heading: "READY TO FIND YOUR CORNER?" in `--size-display-lg`, `--font-display`. Single `Button variant="primary"` ("BOOK A DESK" → `/space`) and a secondary text link ("Build your sip →" → `/fuel`). Generous vertical padding. No decorative elements around the CTA.

**Acceptance criteria:**
- Story teaser feels editorial, not like a generic "About Us" preview.
- Final CTA section is simple, spacious, and confident.
- No decorative blobs, shapes, or frames around these sections.
- Homepage scrolls smoothly through all 8 sections with visually distinct rhythms.

---

## Phase 3 — Space / Interactive Café Map

**Goal:** A fully working seat selection page with the SVG floor map, filters, telemetry panel, and booking flow connected to SessionContext.

---

### Task 3.1 — Create the SessionContext and useLocalStorage hook

**Files:** `src/hooks/useLocalStorage.js`, `src/context/SessionContext.jsx`, `src/hooks/useSession.js`, `src/App.jsx`

**What to do:**
- Create `useLocalStorage(key, defaultValue)` hook:
  - On mount: `JSON.parse(localStorage.getItem(key))` inside a try/catch. Return `defaultValue` on error or if key is absent.
  - On `setValue(newVal)`: if `newVal` is `null`, call `localStorage.removeItem(key)`. Otherwise call `localStorage.setItem(key, JSON.stringify(newVal))`.
  - Returns `[value, setValue]`.
- Create `SessionContext.jsx`:
  - Use `useLocalStorage` for `selectedSeatId`, `confirmedDrink`, and `squad`.
  - Expose the full context API from design §6.1: `selectSeat`, `clearSeat`, `confirmDrink`, `clearDrink`, `createSession`, `joinSession`, `addMember`, `removeMember`, `updateMemberDrink`, `updateMemberSeat`, `setSplitMode`, `setCustomAmount`, `clearSquad`, `confirmSession`.
  - `confirmSession()` sets all three state values to `null` (which triggers `localStorage.removeItem` via the hook).
  - Member IDs are generated as `Date.now().toString()` — simple, no library needed.
- Create `useSession()` convenience hook: just `useContext(SessionContext)`.
- Wrap `<App>` in `<SessionProvider>` in `main.jsx`.

**Acceptance criteria:**
- `useSession()` in any component returns the context values without error.
- Setting `selectedSeatId` via `selectSeat()` and refreshing the page restores the value.
- Setting it to `null` (via `clearSeat()`) removes the LocalStorage key.
- No crashes if LocalStorage contains invalid JSON.

---

### Task 3.2 — Create the local seat data file

**Files:** `src/data/seats.js`

**What to do:**
- Create 18 seat objects following the exact schema from design §5.1 (all fields required: `id`, `label`, `availability`, `seatType`, `wifiSpeed`, `noiseLevel`, `hasPower`, `naturalLighting`, `trafficLevel`, `pricePerHour`, `mapX`, `mapY`).
- Mix of types:
  - 6 solo seats (various positions)
  - 4 group seats
  - 4 booth seats
  - 4 bar seats
- Mix of availability: 12 available, 3 reserved, 3 occupied.
- Ensure at least 2 seats qualify for each of the 6 filters: Power, Quiet, Fast Wi-Fi (≥100 Mbps), Window (naturalLighting: true), Group (seatType: "group"), Low Traffic.
- `mapX` and `mapY` values should reflect a plausible café floor layout (window seats along one wall, bar seats along another, group tables in the centre/back).

**Acceptance criteria:**
- `import { seats } from './data/seats.js'` works without error.
- At least 2 seats match each filter criterion.
- 3 reserved + 3 occupied + 12 available = 18 total.

---

### Task 3.3 — Build the SeatMap SVG component

**Files:** `src/components/SeatMap/SeatMap.jsx`, `src/components/SeatMap/SeatMap.css`, `src/components/Seat/Seat.jsx`, `src/components/Seat/Seat.css`

**What to do:**
- `SeatMap` renders an `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">`.
- Inside the SVG, draw the static floor decoration (non-interactive):
  - Outer room rectangle with `rx="8"` (slight rounding), `fill="none"`, `stroke="--color-caramel"`, thin stroke.
  - A counter bar shape (filled `--color-roasted-brown`) along one wall.
  - A window zone: subtle shaded `<rect>` along the top wall, low opacity `--color-caramel`.
  - Zone labels as SVG `<text>` elements: "Window Zone", "Bar Seating", "Group Tables" in `--size-small`, `--color-warm-clay`.
- Map each seat in the `seats` prop to a `<Seat>` component, passing seat data + `isSelected` (bool) + `isFilteredOut` (bool) + `onSeatClick` + `onUnavailableClick`.
- Seat colours from design §10.2 table — use inline `fill` and `opacity` attributes (SVG CSS variables work in modern browsers but inline is safer).
- Wrap the SVG in a `div.seat-map-container` with `overflow: auto` for mobile scrolling.

- `Seat` component renders a `<g>` element:
  - Contains a `<circle r="16">` (32px diameter, scales to ≥44px at default map size) or a `<rect width="32" height="32" rx="4">` for group/booth seats.
  - A `<title>` child element with the seat's accessible label.
  - `role="button"`, `tabIndex={0}` (or `-1` for occupied/reserved).
  - `aria-label` matching the `<title>` content.
  - `aria-disabled="true"` for reserved and occupied.
  - `onClick` and `onKeyDown` (Enter/Space activate; occupied/reserved call `onUnavailableClick`).
  - CSS class driven by state: `.seat--available`, `.seat--selected`, `.seat--reserved`, `.seat--occupied`, `.seat--filtered-out`.
  - Hover: scale(1.1) on `.seat--available` only, via CSS transition.

**Acceptance criteria:**
- SVG renders the café floor layout with zones and labels.
- 18 seats appear at correct positions on the map.
- Each seat's visual state (available, selected, reserved, occupied) is visually distinct.
- Clicking a seat triggers the correct callback.
- Each seat has an accessible `<title>` and `aria-label`.
- Keyboard Enter/Space activates a seat.
- No icon libraries. No card boxes around the map.

---

### Task 3.4 — Build the FilterBar component

**Files:** `src/components/FilterBar/FilterBar.jsx`, `src/components/FilterBar/FilterBar.css`

**What to do:**
- `FilterBar` receives: `activeFilters` (array of filter keys), `onToggleFilter(key)`, `onClearFilters()`.
- Renders 6 toggle buttons: **Power**, **Quiet**, **Fast Wi-Fi**, **Window**, **Group**, **Low Traffic**.
- Each button is a plain `<button>` with `aria-pressed={activeFilters.includes(key)}`.
- Active state: `background: --color-accent; color: --color-cream`.
- Inactive state: `background: transparent; border: 1px solid --color-caramel; color: --color-dark-text`.
- A "Clear all" text button appears when any filter is active (`aria-hidden` otherwise).
- On desktop: vertical stack in a sidebar. On mobile: horizontal scrollable row across the top.
- **Not pill-shaped.** Use `--radius-sm` (4px). No excessive padding.

**Acceptance criteria:**
- All 6 filters toggle correctly.
- `aria-pressed` updates on each toggle.
- "Clear all" appears only when ≥1 filter active.
- Active filter has the correct accent colour.
- Buttons are not pill/capsule shaped.

---

### Task 3.5 — Build the TelemetryMetric and SeatDetails components

**Files:** `src/components/TelemetryMetric/TelemetryMetric.jsx`, `src/components/TelemetryMetric/TelemetryMetric.css`, `src/components/SeatDetails/SeatDetails.jsx`, `src/components/SeatDetails/SeatDetails.css`

**What to do:**
- `TelemetryMetric`: renders one metric row/tile: a small inline SVG icon, a label, and a value. No card border. Just an icon-label-value triplet with appropriate spacing.
  - Icons (inline SVG, keep simple): Wi-Fi symbol, noise wave, lightning bolt (power), sun (lighting), footsteps/person (traffic), tag (price).
  - Props: `icon`, `label`, `value`.

- `SeatDetails`: a panel that slides in from the right on desktop (position fixed, right side), or from the bottom on mobile.
  - Structure:
    - Seat label in `--size-heading`, `--font-display`
    - Seat type badge: plain text in small uppercase, `--color-warm-clay`
    - A thin `1px` divider (no box/card border)
    - 6 `TelemetryMetric` items in a 2-column grid
    - `Book this seat` `Button variant="primary"`
    - `Close` `Button variant="ghost"` (or a plain × text button)
  - If a seat is already selected: show "Replace your current selection?" inline text with Confirm/Cancel text buttons rather than a modal.
  - Props: `seat`, `isCurrentlySelected`, `onBook`, `onClose`.
  - `role="dialog"`, `aria-labelledby` pointing to the seat label heading, `aria-modal="true"`.
  - The panel slides in/out via CSS `transform: translateX(100%)` → `translateX(0)` transition.
  - On mobile: `transform: translateY(100%)` → `translateY(0)`, slides up from bottom.

**Acceptance criteria:**
- All 7 telemetry metrics render with icon + label + value.
- Panel slides in/out correctly on desktop and mobile.
- "Book this seat" calls `onBook()`.
- "Close" calls `onClose()`.
- Replacement confirmation appears when a seat is already selected.
- Panel has correct ARIA attributes.

---

### Task 3.6 — Build the Space page and wire everything together

**Files:** `src/pages/Space/Space.jsx`, `src/pages/Space/Space.css`

**What to do:**
- Replace the Space stub with the full page.
- Local state: `activeFilters` (array, default `[]`), `focusedSeatId` (string or `null`).
- Read `selectedSeatId` from `useSession()`.
- Page layout (desktop): page header section, then a two-column layout: FilterBar sidebar left + SeatMap right. SeatDetails overlays from the right when `focusedSeatId` is set.
- Page header: "FIND YOUR SPACE" in `--size-display-lg`, `--font-display`, and 1 sentence of intro copy below. Background `--color-soft-beige`. Generous padding.
- Apply filter logic from design §10.3 to compute `filteredSeats`. Pass `isFilteredOut` to each `Seat` based on whether it's in `filteredSeats` or not.
- When a user clicks an available/selected seat → set `focusedSeatId` to that seat's id → `SeatDetails` panel opens.
- When a user clicks a reserved/occupied seat → briefly show a small inline tooltip "Seat unavailable" (a `<span>` that appears and fades after 2 seconds via CSS).
- When `onBook(seat)` is called in `SeatDetails` → call `selectSeat(seat.id)` from context → close the panel.
- **SessionBar:** When `selectedSeatId` is not null, show a slim bar fixed at the bottom of the viewport: "Your seat: [label] · ₹[price]/hr · [View in Checkout →]". Background `--color-espresso`, text `--color-cream`. Simple and unobtrusive. Not a floating card.
- If `filteredSeats.length === 0`, show `EmptyState` below the map with a "Clear all filters" action. The map itself stays visible with all seats dimmed.

**Acceptance criteria:**
- Page header renders correctly.
- All 18 seats appear on the map.
- Filters dim non-matching seats correctly.
- Clicking an available seat opens the SeatDetails panel with correct data.
- Booking a seat updates `selectedSeatId` in context and the map shows the seat as selected.
- SessionBar appears after booking, links to `/checkout`.
- Empty state appears when all filters produce no matches.
- Refreshing the page restores the selected seat from LocalStorage.

---

### Task 3.7 — Build the EmptyState component

**Files:** `src/components/EmptyState/EmptyState.jsx`, `src/components/EmptyState/EmptyState.css`

**What to do:**
- Reusable component accepting: `icon` (inline SVG), `heading` (string), `message` (string), `action` (optional `{ label, onClick }`).
- Renders: icon centred above heading, heading in `--size-heading`, `--font-display`, message in `--size-body`, optional action as a `Button variant="secondary"`.
- No card box or border around it. Generous vertical padding. Centred content.
- Background: inherits from parent. Does not impose its own background.

**Acceptance criteria:**
- Renders correctly in Space (filter empty state) with a "Clear all filters" action.
- No visual card border around the empty state.
- Accessible: heading has appropriate heading level.

---

## Phase 4 — Fuel Builder

**Goal:** A fully working drink customisation experience with live metric updates, the SVG cup visual, and LocalStorage persistence of the confirmed drink.

---

### Task 4.1 — Create the drinks and ingredients data files

**Files:** `src/data/drinks.js`, `src/data/ingredients.js`

**What to do:**
- `drinks.js`: export `const drinks = [...]` with 5 base drinks (Espresso, Latte, Cold Brew, Americano, Matcha) following the exact schema from design §5.2. Assign plausible `basePrice`, `caffeine`, `calories`, `protein`, and `color` values. Prices in INR (₹80–₹180 range).
- `ingredients.js`: export `milkOptions`, `sweetnessOptions`, `syrupOptions`, `extraOptions` following the exact schema from design §5.3. All values must be present; no `undefined` fields.

**Acceptance criteria:**
- Both files import without error.
- Each drink has all 6 required fields.
- Each ingredient has all required fields with no missing keys.
- Syrups and extras cover at least 4 options each.

---

### Task 4.2 — Create the calculateDrinkMetrics utility

**Files:** `src/context/calculations.js`

**What to do:**
- Export a pure function `calculateDrinkMetrics(drinkConfig, drinks, milkOptions, sweetnessOptions, syrupOptions, extraOptions)`.
- It looks up each id, sums contributions, and returns `{ price, caffeine, calories, protein }` — all numbers.
- Every individual lookup uses `?? 0` to guard against missing values. The function must never return `NaN` or `undefined` for any field.
- Also export: `calculateMemberSubtotal(member, drinks, ingredients, seats)`, `calculateGroupTotal(members, drinks, ingredients, seats)`, `calculateSplitAmounts(members, groupTotal, splitMode, customAmounts)`.
- Equal split rounding: `Math.floor(groupTotal / members.length)` per member; add remainder to last member.

**Acceptance criteria:**
- `calculateDrinkMetrics` with a valid config returns correct numeric totals.
- Called with `null` drinkConfig returns `{ price: 0, caffeine: 0, calories: 0, protein: 0 }`.
- `calculateSplitAmounts` with `splitMode: "equal"` and 3 members / ₹640 returns amounts that sum exactly to 640.

---

### Task 4.3 — Build the DrinkVisual SVG component

**Files:** `src/components/DrinkVisual/DrinkVisual.jsx`, `src/components/DrinkVisual/DrinkVisual.css`

**What to do:**
- An SVG cup illustration. Keep it simple and clean — a takeaway cup silhouette with:
  - Cup body (tall trapezoid shape)
  - Lid shape on top
  - A sleeve band
  - A liquid fill layer inside the cup body
- The liquid fill `fill` colour is driven by the `drinkColor` prop (from the selected base drink's `color` field).
- If milk is selected (milkId ≠ "none"), a semi-transparent lighter layer at the top of the fill represents the milk. Change its opacity based on milk type.
- The SVG should be roughly 200×280px viewBox. Clean, minimal, editorial — not cartoony, not 3D.
- On selection change, the colour transition uses `CSS transition: fill 0.25s ease`.

**Acceptance criteria:**
- Cup renders with the correct fill colour for each of the 5 base drinks.
- Switching base drink visually changes the cup fill colour.
- Milk layer appears/disappears based on milk selection.
- The illustration does not look overly complex or AI-generated-clipart-style.

---

### Task 4.4 — Build the IngredientOption component

**Files:** `src/components/IngredientOption/IngredientOption.jsx`, `src/components/IngredientOption/IngredientOption.css`

**What to do:**
- A `<button>` component for a single selectable option.
- Props: `label`, `isSelected`, `onClick`, `disabled` (optional).
- Selected state: `background: --color-accent; color: --color-cream; border-color: --color-accent`.
- Unselected state: `background: transparent; border: 1px solid --color-caramel; color: --color-dark-text`.
- `aria-pressed={isSelected}`.
- On hover (unselected): subtle border colour shift to `--color-roasted-brown`.
- Size: compact, not pill-shaped. `padding: 8px 16px`, `border-radius: --radius-sm` (4px).
- Used for: base drink cards (slightly larger), milk options, sweetness options, syrup chips, extras chips. The same component handles all — visual size differences via a `size` prop (`"card"` vs `"chip"`).
  - `"card"` variant: wider, includes an optional description line below the label.
  - `"chip"` variant: compact, label only.

**Acceptance criteria:**
- Renders correctly in both `card` and `chip` sizes.
- `aria-pressed` updates on toggle.
- Selected/unselected states are visually distinct.
- Not pill-shaped.

---

### Task 4.5 — Build the MetricsPanel component

**Files:** `src/components/MetricsPanel/MetricsPanel.jsx`, `src/components/MetricsPanel/MetricsPanel.css`

**What to do:**
- Receives: `{ price, caffeine, calories, protein }`.
- Renders 4 metric items in a 2×2 grid layout.
- Each item: a small label above, a large value below. Labels: "PRICE", "CAFFEINE", "CALORIES", "PROTEIN". Values: `₹${price}`, `${caffeine}mg`, `${calories}kcal`, `${protein}g`.
- Label: `--size-small`, uppercase, `--color-warm-clay`.
- Value: `--size-display-md`, `--font-display`, `--color-espresso`.
- **No card boxes or border tiles around each metric.** Just typographic hierarchy and whitespace.
- Wrap the entire panel in a `<div aria-live="polite" aria-atomic="true">` so screen readers announce updates.
- A thin separating line between the 4 items (use CSS grid gap, not borders on each tile).

**Acceptance criteria:**
- All 4 metrics render with correct labels and values.
- Values update immediately when props change.
- `aria-live="polite"` is present on the container.
- No border boxes or shadows around individual metrics.

---

### Task 4.6 — Build the FuelBuilder component and Fuel page

**Files:** `src/components/FuelBuilder/FuelBuilder.jsx`, `src/components/FuelBuilder/FuelBuilder.css`, `src/pages/Fuel/Fuel.jsx`, `src/pages/Fuel/Fuel.css`

**What to do:**
- `FuelBuilder` is the orchestrator. Local state: `draftDrink` (the in-progress config, NOT committed to context).
  - Initialise from `confirmedDrink` in context if it exists, else default to `{ baseId: drinks[0].id, milkId: "none", sweetnessId: "none", syrupIds: [], extraIds: [] }`.
- Layout: two-column on desktop (controls left, visual + metrics right). Single column on mobile (visual + metrics on top, controls below).
- Left/bottom column — controls:
  - "BASE" heading + 5 `IngredientOption size="card"` components for base drinks (single-select)
  - "MILK" heading + 5 `IngredientOption size="chip"` components (single-select)
  - "SWEETNESS" heading + 4 `IngredientOption size="chip"` components (single-select)
  - "SYRUPS" heading + 4 `IngredientOption size="chip"` components (multi-select: clicking toggles id in/out of `syrupIds` array)
  - "EXTRAS" heading + 4 `IngredientOption size="chip"` components (multi-select: same pattern)
  - `Button variant="primary"` "Add to Order" at the bottom
- Right/top column — live result:
  - `DrinkVisual` component receiving current `draftDrink` colour
  - Selected drink name in `--size-heading`, `--font-display`
  - `MetricsPanel` receiving calculated metrics from `calculateDrinkMetrics(draftDrink, ...)`
- On "Add to Order": call `confirmDrink(draftDrink)` from context. Show a brief "Added to your session" inline confirmation text that disappears after 2s.
- Section headings ("BASE", "MILK", etc.) are plain uppercase labels, `--size-small`, `--color-warm-clay`. Not boxed.

- `Fuel` page:
  - Page header: "BUILD YOUR SIP" in `--size-display-lg`, `--font-display`. Background `--color-soft-beige`. Intro copy 1–2 sentences.
  - Then `<FuelBuilder />`.
  - If `confirmedDrink` is set (from context), show a slim confirmation banner at the top of the builder area: "Your current order: [drink name] — ₹[price] · [Edit below]". Not a card. Just a line of text.

**Acceptance criteria:**
- Selecting a base drink updates the cup fill colour and all 4 metrics immediately.
- Selecting milk/sweetness updates metrics immediately.
- Adding/removing syrups/extras updates metrics immediately.
- "Add to Order" saves `confirmedDrink` to context and LocalStorage.
- Refreshing the page restores the last confirmed drink configuration.
- No metric is NaN or undefined under any selection state.
- The builder does not look like a shopping cart or e-commerce product page.

---

## Phase 5 — Squad / Group Study

**Goal:** A working group session page where you can create a session, add members, assign drinks/seats, choose a split mode, and see accurate totals.

---

### Task 5.1 — Create the squad example data file

**Files:** `src/data/squad.js`

**What to do:**
- Export one example session object that the "Join Session" flow can load when a matching name is entered:
  ```js
  export const exampleSessions = [
    {
      sessionName: "Study Group Alpha",
      members: [
        { id: "m1", name: "Priya",  drinkConfig: { baseId: "latte", milkId: "oat", sweetnessId: "medium", syrupIds: ["vanilla"], extraIds: [] }, seatId: "S03" },
        { id: "m2", name: "Arjun",  drinkConfig: { baseId: "cold-brew", milkId: "none", sweetnessId: "none", syrupIds: [], extraIds: ["extra-shot"] }, seatId: "S07" },
        { id: "m3", name: "Kavya",  drinkConfig: { baseId: "matcha", milkId: "oat", sweetnessId: "light", syrupIds: [], extraIds: [] }, seatId: null },
      ],
      splitMode: "order",
      customAmounts: {},
    }
  ]
  ```
- Seat ids must match actual ids in `seats.js`.

**Acceptance criteria:**
- File imports without error.
- Joining "Study Group Alpha" pre-populates the squad page with the 3 example members.

---

### Task 5.2 — Build the SquadMember component

**Files:** `src/components/SquadMember/SquadMember.jsx`, `src/components/SquadMember/SquadMember.css`

**What to do:**
- Renders one member row/card. Layout: name on the left, drink summary in the middle, seat info, subtotal on the right, remove button far right.
- Name: editable. Use a `<span>` that turns into an `<input>` on click (`isEditingName` local state). On blur, call `onUpdateName(id, newName)`.
- Drink summary: if no drink — "No drink yet". If drink set — "{baseDrink.name} + {milkLabel}" e.g. "Oat Latte". An "Edit" text link opens the drink modal.
- Seat summary: if no seat — "No seat". If set — seat label. An "Edit" text link opens a seat picker.
- Subtotal: `₹[amount]` in `--font-display`, right-aligned.
- Remove button: a plain "×" `<button>` with `aria-label="Remove [name]"`.
- The seat picker: a simple `<select>` dropdown listing all seats from `seats.js`. Include an "No seat" option as the first item.
- The drink "Edit" link opens a simple modal that wraps `<FuelBuilder>` in compact mode (the same component, rendered inside a `<dialog>` element or a div overlay).
- **Not inside a large card with shadow.** Use a simple horizontal row layout with a thin bottom border to separate members. Background: inherits from parent.

**Acceptance criteria:**
- Name is editable inline.
- Drink summary shows correctly.
- Seat picker updates the member's `seatId` in context.
- Subtotal is calculated correctly.
- Remove button removes the member from context.
- The member row does not use heavy card styling.

---

### Task 5.3 — Build the BillSplitter component

**Files:** `src/components/BillSplitter/BillSplitter.jsx`, `src/components/BillSplitter/BillSplitter.css`

**What to do:**
- Receives: `members`, `splitMode`, `customAmounts`, `onSetSplitMode(mode)`, `onSetCustomAmount(memberId, amount)`. Also receives the data references needed to run `calculateSplitAmounts`.
- Top: three `<button>` elements: "By Order" | "Equal" | "Custom". Active button: `background: --color-accent; color: --color-cream`. Inactive: plain bordered button.
- Below: a list of member names and their owed amount for the active split mode. Plain rows — label left, amount right. No card boxes.
- Group total at the bottom: `"Group Total    ₹[amount]"` — label in `--size-small`, amount in `--size-display-md`, `--font-display`.
- Custom mode: each member row gets a `<input type="number" min="0">` instead of a static amount. Local state `customDraftAmounts` holds in-progress values. Show a running "Remaining: ₹[diff]" line. If `diff ≠ 0`, show validation text "Amounts must add up to ₹[total]" in `--color-accent`. The inputs have associated `<label>` elements.
- On any change in custom mode, call `onSetCustomAmount` to update context.

**Acceptance criteria:**
- All three split modes render correctly.
- Split by order shows each member's individual subtotal.
- Equal split divides total correctly and sums exactly to group total.
- Custom split shows number inputs, running remaining figure, and validation message when amounts don't balance.
- No border boxes around individual member rows.

---

### Task 5.4 — Build the SquadPanel component and Squad page

**Files:** `src/components/SquadPanel/SquadPanel.jsx`, `src/components/SquadPanel/SquadPanel.css`, `src/pages/Squad/Squad.jsx`, `src/pages/Squad/Squad.css`

**What to do:**
- `SquadPanel`:
  - If `squad === null`: shows the create/join UI (two `<input>` + two `<button>` pairs). Calling `createSession(name)` or `joinSession(name)` from context initialises the squad.
  - If `squad` is set: shows session name, an "End Session" `Button variant="ghost"`, then the member list (`SquadMember` × N), then an "+ Add Member" button at the bottom. Clicking "Add Member" calls `addMember("New Member")` from context and the new member appears at the bottom of the list.
  - "End Session" calls `clearSquad()`.
  - Shows `EmptyState` (zero members prompt) if session is active but `members.length === 0`.

- `Squad` page:
  - Page header: "STUDY TOGETHER" in `--size-display-lg`. Background `--color-soft-beige`.
  - Two-column layout on desktop: `SquadPanel` left (60%), `BillSplitter` right (40%). Stacked on mobile.
  - Page-level "Go to Checkout" link appears when session is active: `Button variant="secondary"` → `/checkout`.

**Acceptance criteria:**
- Creating a session shows the member management UI.
- Joining "Study Group Alpha" pre-populates 3 members.
- Adding members works. Removing members works.
- `BillSplitter` updates correctly when members are added/removed.
- Session persists across page refresh.
- "End Session" clears the squad.
- Empty state shown when session has no members.

---

## Phase 6 — Checkout / Session Summary

**Goal:** A working session summary page that reads from context, displays the combined seat + drink + squad info, computes totals, handles the confirmation flow, and shows appropriate empty states.

---

### Task 6.1 — Build the Checkout page

**Files:** `src/pages/Checkout/Checkout.jsx`, `src/pages/Checkout/Checkout.css`

**What to do:**
- Read `selectedSeatId`, `confirmedDrink`, `squad` from `useSession()`.
- Local state: `sessionConfirmed` (bool, default `false`).

**Empty state:** If all three are null/empty, render `EmptyState` with heading "Your session is empty" and three action links: "Find a space →", "Build your sip →", "Start a squad →".

**Summary state** (at least one piece of session data exists):
- Page header: "YOUR SESSION" in `--size-display-lg`.
- **Seat block:** If `selectedSeatId` is set, show seat label, type, `₹[price]/hr (1 hr)`. An "Edit →" link to `/space`. If not set, show a simple "No seat selected. [Choose one →]" line.
- **Drink block:** If `confirmedDrink` is set, show drink name, customisation summary (milk, syrups, extras as a short text string), `₹[price]`. An "Edit →" link to `/fuel`. If not set, show "No drink added. [Build one →]".
- **Squad block:** If `squad` is set and has members, show the member list in a simple table-style layout (name, drink, amount). Show the active split mode. Show group total.
- **Final total line:** `"Total    ₹[finalTotal]"` in large `--font-display`. Seat cost (1hr) + drink cost if solo, or group total if squad is active.
- `Button variant="primary"` "Confirm Session" at the bottom. If `squad.splitMode === "custom"` and amounts don't balance, this button is `disabled` with a tooltip/note explaining why.
- On confirm: call `confirmSession()` from context → set `sessionConfirmed = true`.

**Success state** (`sessionConfirmed === true`):
- Clear everything and show: a large "✓ Your session is confirmed." heading, tagline "See you at Syntax & Sip.", two links: "Explore the menu" → `/fuel` and "Back to home" → `/`. Background `--color-espresso`, cream text.

**Acceptance criteria:**
- Empty state renders when no session data exists.
- Seat, drink, and squad each render correctly when data exists.
- Final total calculates correctly.
- Confirm button clears LocalStorage and shows success screen.
- Disabled confirm button when custom split is unbalanced.
- Edit links navigate to correct pages.
- Success state renders after confirmation.

---

## Phase 7 — Responsive Behaviour + Accessibility

**Goal:** The full application works correctly and looks good on mobile, tablet, and desktop. All WCAG 2.1 AA requirements from the approved spec are met.

---

### Task 7.1 — Responsive layout audit and fixes: Navbar + Homepage

**Files:** `src/components/Navbar/Navbar.css`, `src/pages/Home/Home.css`

**What to do:**
- Test the Navbar at 320px, 600px, 768px, 1024px, 1280px.
- Verify: mobile menu opens/closes, all links accessible, brand name fits.
- Test the homepage at all breakpoints.
- Fix: hero text overflow on small screens, section layout stacking, step-number sizes, CTA button wrapping.
- Ensure no horizontal scroll on any homepage section at 320px.

**Acceptance criteria:**
- No horizontal overflow at 320px on homepage.
- All homepage sections look intentional (not just shrunk desktop layouts) at 375px.
- Mobile nav opens and shows all links + CTA.

---

### Task 7.2 — Responsive layout audit and fixes: Space page

**Files:** `src/pages/Space/Space.css`, `src/components/SeatMap/SeatMap.css`, `src/components/FilterBar/FilterBar.css`, `src/components/SeatDetails/SeatDetails.css`

**What to do:**
- On mobile: FilterBar becomes a horizontal scrollable strip above the map.
- On mobile: SeatMap container has `overflow: auto` so the map is scrollable.
- On mobile: SeatDetails panel slides up from the bottom.
- Verify seat tap targets are ≥44px on a real mobile viewport size.
- SessionBar (selected seat strip) must remain readable at 320px.

**Acceptance criteria:**
- FilterBar scrolls horizontally on mobile, does not wrap awkwardly.
- Floor map is scrollable on mobile.
- SeatDetails slides up from bottom on mobile.
- Seat tap targets are large enough for thumb use.

---

### Task 7.3 — Responsive layout audit and fixes: Fuel + Squad + Checkout

**Files:** `src/pages/Fuel/Fuel.css`, `src/components/FuelBuilder/FuelBuilder.css`, `src/pages/Squad/Squad.css`, `src/pages/Checkout/Checkout.css`

**What to do:**
- Fuel: on mobile, metrics + DrinkVisual appear above controls. Ingredient option chips wrap cleanly without horizontal scroll.
- Squad: BillSplitter moves below SquadPanel. Member rows remain readable. Custom split inputs fit on small screens.
- Checkout: all blocks stack cleanly. Final total is visible without scrolling too far.

**Acceptance criteria:**
- No horizontal scroll on Fuel, Squad, or Checkout at 320px.
- All interactive controls reachable by touch on mobile.
- Typography remains legible and hierarchical on mobile.

---

### Task 7.4 — Keyboard navigation and focus management audit

**Files:** All interactive component files

**What to do:**
- Tab through every interactive element on every page in order.
- Verify focus is visible on all elements (outline ring present).
- Fix any elements missing `:focus-visible` styles.
- Verify the mobile nav focus trap: opening the menu focuses the first link; Escape closes and returns focus to the hamburger button.
- Verify the SeatDetails panel: opening focuses the panel heading or first interactive element; closing returns focus to the seat that was clicked.
- Verify seat map keyboard nav: Tab moves between available seats; Enter/Space opens the detail panel; reserved/occupied seats are not in tab order.

**Acceptance criteria:**
- Every interactive element has a visible focus ring.
- Mobile nav focus trap works correctly.
- SeatDetails focus management works correctly.
- Reserved/occupied seats are not reachable by Tab.

---

### Task 7.5 — ARIA and semantic HTML audit

**Files:** All component and page files

**What to do:**
- Verify every page has a single `<h1>` and correct heading hierarchy (`<h2>`, `<h3>` in logical order).
- Verify all images have appropriate `alt` text (or `alt=""` for decorative ones).
- Verify `aria-pressed` on all filter and ingredient toggle buttons.
- Verify `aria-live="polite"` is present on the `MetricsPanel` wrapper.
- Verify `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on `SeatDetails`.
- Verify all custom split `<input>` elements have associated `<label>` elements.
- Verify the SVG seat nodes have `<title>` elements and `aria-label` attributes.
- Verify `aria-expanded` / `aria-controls` on the mobile nav hamburger button.

**Acceptance criteria:**
- Each page has exactly one `<h1>`.
- All form inputs have labels.
- All ARIA attributes from design §17.2 are present and correct.
- No `<div onClick>` patterns — all interactive elements use `<button>` or `<a>`.

---

### Task 7.6 — Colour contrast verification

**Files:** `src/styles/variables.css`, any component using text over background

**What to do:**
- Test the following combinations with a browser contrast checker or browser devtools:
  - `--color-cream` (`#E9E6E3`) on `--color-espresso` (`#1D0804`) — expected ~14:1 ✓
  - `--color-dark-text` (`#1D0804`) on `--color-soft-beige` (`#F3E9DF`) — expected ~17:1 ✓
  - `--color-caramel` (`#D1B39C`) on `--color-espresso` (`#1D0804`) — verify ≥4.5:1 for body text, ≥3:1 for large text. If it fails for body text, use it for large text/headings only.
  - `--color-accent` (`#7A8C4F`) on `--color-soft-beige` — verify ≥3:1 (used for active states/large UI elements only).
- Fix any failing combination by adjusting usage (e.g. use the colour only at larger text sizes, or swap background).

**Acceptance criteria:**
- No body-text colour combination fails WCAG 2.1 AA 4.5:1 minimum.
- No large-text or UI component combination falls below 3:1.
- Report any colour that had to be adjusted in a brief inline comment in `variables.css`.

---

## Phase 8 — Micro-interactions + Final Polish

**Goal:** Add the final layer of CSS transitions and small UX polish that makes the site feel alive and intentional, without being excessive. Fix any remaining visual roughness.

---

### Task 8.1 — Seat map micro-interactions

**Files:** `src/components/Seat/Seat.css`, `src/components/SeatDetails/SeatDetails.css`

**What to do:**
- Verify seat hover scale(1.1) transition works smoothly (`--transition-fast`).
- Add a brief pulse ring animation on seat selection confirmation: when a seat becomes `selected`, a CSS `@keyframes` ring expands from the seat centre and fades out. Duration: 400ms. One play only.
- Verify SeatDetails slide-in/out transition is smooth on desktop and mobile (`--transition-slow`).
- Respect `prefers-reduced-motion` — all animations should reduce to instant.

**Acceptance criteria:**
- Seat hover scale works without jank.
- Selection pulse ring plays once on booking.
- Panel slides smoothly.
- All animations disabled under `prefers-reduced-motion`.

---

### Task 8.2 — Fuel Builder micro-interactions

**Files:** `src/components/IngredientOption/IngredientOption.css`, `src/components/MetricsPanel/MetricsPanel.css`

**What to do:**
- `IngredientOption`: clicking an option triggers a brief visual "press" effect (scale: 0.97, then back to 1.0, 100ms).
- Metric value changes: if feasible without over-engineering — a quick opacity cross-fade when a metric value changes (opacity to 0, new value, opacity to 1). Implement only if it can be done cleanly with a CSS transition triggered by a key change on the element. Skip if it complicates the code.
- "Added to your session" confirmation text after "Add to Order": fade in, hold 2s, fade out via CSS animation.

**Acceptance criteria:**
- Ingredient option press effect is subtle and fast.
- Metric cross-fade (if implemented) does not cause layout shift.
- "Added to your session" message appears and disappears automatically.

---

### Task 8.3 — Navigation and page transition polish

**Files:** `src/components/Navbar/Navbar.css`

**What to do:**
- Verify mobile nav dropdown animation is smooth (slide down, `--transition-base`).
- On desktop, add a subtle underline grow animation to nav link hover (underline width grows from 0 to 100%, `--transition-fast`).
- Navbar scroll behaviour: on the homepage, the navbar transitions from fully transparent to a semi-transparent dark background when the user scrolls down past the hero. Implement with a `useEffect` that listens to `window.scroll` and sets a `scrolled` boolean state. Apply `navbar--scrolled` CSS class when `scrolled === true`.

**Acceptance criteria:**
- Mobile nav slides down smoothly.
- Nav link hover underline animates on desktop.
- Homepage navbar darkens when scrolled past the hero (approximately 80px scroll depth).
- Scrolled state does not cause layout shift.

---

### Task 8.4 — Homepage section polish

**Files:** `src/pages/Home/Home.css`

**What to do:**
- Review every homepage section for visual spacing. Tighten or loosen `padding` values where sections feel cramped or too stretched.
- Verify section backgrounds transition naturally (no jarring white gaps between dark and light sections).
- Verify the product journey steps (01/02/03) look editorial and intentional — not like a grid of feature cards.
- Verify the hero headline does not overflow at 320px. Adjust `clamp()` values if needed.
- Verify the footer sits cleanly at the bottom of all pages.

**Acceptance criteria:**
- Homepage passes a visual inspection at 375px (mobile), 768px (tablet), and 1280px (desktop).
- No section looks like a generic SaaS landing page pattern.
- No jarring visual gaps or colour breaks between sections.

---

### Task 8.5 — Build the Story page

**Files:** `src/pages/Story/Story.jsx`, `src/pages/Story/Story.css`

**What to do:**
- Build the complete Story page following design §14.
- Section 1: Full-bleed dark hero (`--color-espresso` background). Headline "A PLACE TO THINK." in `--size-display-xl`, `--font-display`, `--color-cream`. No photo needed — typography and colour is enough.
- Section 2: Two-column on desktop, single column on mobile. Background `--color-soft-beige`. Origin copy: 3 short paragraphs. Written in the brand voice: warm, intelligent, human — not corporate. Start with something like: "We kept looking for a place where we could settle in for four hours and actually get things done. Not a library. Not a loud bar. Somewhere that understood both the coffee and the code."
- Section 3: Full-bleed `--color-cream` background. A pull-quote in large italic `--font-display`: *"We built Syntax & Sip for the people who live between ideas."*
- Section 4: Three brand pillars: "Focus", "Community", "Craft" — label in `--size-heading`, one sentence below each. Plain three-column layout on desktop, stacked on mobile. No card borders.
- Section 5: CTA band — "Ready to find your corner?" in `--size-display-md`. `Button variant="primary"` "BOOK A DESK" → `/space`. Background `--color-espresso`.
- The copy should feel written by a person, not generated by AI.

**Acceptance criteria:**
- All 5 sections render correctly.
- Copy feels human and editorial.
- No generic "About Us" corporate layout patterns.
- CTA links to `/space`.
- Page is responsive at all breakpoints.

---

### Task 8.6 — Final cross-browser and cross-device review

**Files:** All files

**What to do:**
- Open the app in Chrome, Firefox, and Safari (or Edge as a Chromium proxy).
- Verify SVG rendering (floor map, DrinkVisual) is consistent across browsers.
- Verify CSS custom properties work everywhere (they do in all modern browsers — confirm no IE-era fallbacks needed).
- Verify LocalStorage persistence works correctly: fill out seat + drink + squad, close the tab, reopen, confirm state is restored.
- Verify `confirmSession()` clears all three LocalStorage keys.
- Check for any console errors or warnings in production build: run `npm run build` and verify it completes without errors.

**Acceptance criteria:**
- No console errors in development.
- `npm run build` completes without errors.
- LocalStorage restore works on fresh tab load.
- Session confirm clears LocalStorage correctly.
- Visual rendering consistent across Chrome and Firefox.

---

*Tasks phase complete. `requirements.md` and `design.md` have not been modified.*
*Total: 8 phases, 34 tasks.*
*Do not begin implementation until this file has been reviewed and approved.*
