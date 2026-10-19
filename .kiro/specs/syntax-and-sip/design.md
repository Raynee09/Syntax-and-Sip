# Syntax & Sip — Design

> This document translates the approved requirements into a concrete frontend architecture and design blueprint. It covers structure, data models, state strategy, component decomposition, and interaction design for every feature area. No application code is produced here.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Project File Structure](#2-project-file-structure)
3. [Routing](#3-routing)
4. [Design System](#4-design-system)
5. [Local Data Models](#5-local-data-models)
6. [State Management Strategy](#6-state-management-strategy)
7. [LocalStorage Strategy](#7-localstorage-strategy)
8. [Navigation Component](#8-navigation-component)
9. [Homepage Design](#9-homepage-design)
10. [Space Page — Seat Map & Telemetry](#10-space-page--seat-map--telemetry)
11. [Fuel Page — Drink Builder](#11-fuel-page--drink-builder)
12. [Squad Page — Group Study Session](#12-squad-page--group-study-session)
13. [Checkout / Session Summary](#13-checkout--session-summary)
14. [Story Page](#14-story-page)
15. [Session Flow — How the Three Experiences Connect](#15-session-flow--how-the-three-experiences-connect)
16. [Responsive Design Strategy](#16-responsive-design-strategy)
17. [Accessibility Design](#17-accessibility-design)
18. [Empty States & Error Boundaries](#18-empty-states--error-boundaries)
19. [Animation & Motion](#19-animation--motion)

---

## 1. Architecture Overview

Syntax & Sip is a single-page application (SPA) built with React and Vite. There is no server, no API, and no external data source. All application data is local JavaScript modules. All persistence is LocalStorage. Routing is client-side.

```
Browser
  └── React SPA (Vite dev server / static build)
        ├── React Router DOM (client-side routing)
        ├── React Context API (global session state)
        ├── Local JS data files (seats, drinks, ingredients, squad)
        └── LocalStorage (seat selection, drink config, squad session)
```

**Key architectural decisions:**

- **Global session state via React Context.** A single `SessionContext` wraps the entire app and holds the user's selected seat, confirmed drink, and squad session. Components read from and write to this context. This avoids prop-drilling without introducing a state library.
- **Data is static and imported.** All seat, drink, and ingredient data is imported directly from `src/data/` files. There are no fetch calls.
- **LocalStorage is a side-effect of state changes.** A custom `useLocalStorage` hook synchronises a piece of state to LocalStorage automatically. Components never call `localStorage.setItem` directly.
- **Pages are thin orchestrators.** Each page component (`Space`, `Fuel`, `Squad`, etc.) owns no business logic of its own — it composes feature components that contain the logic. This keeps pages readable.

---

## 2. Project File Structure

```
src/
├── main.jsx                   # React entry point, wraps App in providers
├── App.jsx                    # Router setup, SessionProvider wrapper
│
├── context/
│   └── SessionContext.jsx     # Global session state + LocalStorage sync
│
├── hooks/
│   ├── useLocalStorage.js     # Read/write a key to LocalStorage safely
│   └── useSession.js          # Convenience hook consuming SessionContext
│
├── data/
│   ├── seats.js               # Array of seat objects
│   ├── drinks.js              # Array of base drink objects
│   ├── ingredients.js         # Milk, syrups, extras, sweetness options
│   └── squad.js               # Example session seed (optional, dev only)
│
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── Space/
│   │   ├── Space.jsx
│   │   └── Space.css
│   ├── Fuel/
│   │   ├── Fuel.jsx
│   │   └── Fuel.css
│   ├── Squad/
│   │   ├── Squad.jsx
│   │   └── Squad.css
│   ├── Checkout/
│   │   ├── Checkout.jsx
│   │   └── Checkout.css
│   └── Story/
│       ├── Story.jsx
│       └── Story.css
│
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.css
│   ├── SeatMap/
│   │   ├── SeatMap.jsx        # SVG floor map container
│   │   └── SeatMap.css
│   ├── Seat/
│   │   ├── Seat.jsx           # Individual seat node on the map
│   │   └── Seat.css
│   ├── SeatDetails/
│   │   ├── SeatDetails.jsx    # Slide-in detail panel
│   │   └── SeatDetails.css
│   ├── TelemetryMetric/
│   │   ├── TelemetryMetric.jsx  # Single metric display (Wi-Fi, noise…)
│   │   └── TelemetryMetric.css
│   ├── FilterBar/
│   │   ├── FilterBar.jsx
│   │   └── FilterBar.css
│   ├── FuelBuilder/
│   │   ├── FuelBuilder.jsx    # Full drink builder orchestrator
│   │   └── FuelBuilder.css
│   ├── DrinkVisual/
│   │   ├── DrinkVisual.jsx    # SVG cup that responds to selections
│   │   └── DrinkVisual.css
│   ├── IngredientOption/
│   │   ├── IngredientOption.jsx
│   │   └── IngredientOption.css
│   ├── MetricsPanel/
│   │   ├── MetricsPanel.jsx   # Live price/caffeine/cal/protein display
│   │   └── MetricsPanel.css
│   ├── SquadPanel/
│   │   ├── SquadPanel.jsx     # Session create/join + member list
│   │   └── SquadPanel.css
│   ├── SquadMember/
│   │   ├── SquadMember.jsx    # Single member card
│   │   └── SquadMember.css
│   ├── BillSplitter/
│   │   ├── BillSplitter.jsx   # Split mode selector + per-member amounts
│   │   └── BillSplitter.css
│   └── EmptyState/
│       ├── EmptyState.jsx     # Reusable empty/prompt component
│       └── EmptyState.css
│
├── styles/
│   ├── variables.css          # CSS custom properties (tokens)
│   └── global.css             # Reset, base typography, body styles
│
└── assets/
    └── hero.png               # Hero photograph
```

---

## 3. Routing

React Router DOM v6 handles all navigation. Routes are defined in `App.jsx`.

| Path | Page Component | Purpose |
|------|---------------|---------|
| `/` | `Home` | Homepage / landing |
| `/space` | `Space` | Seat map + telemetry |
| `/fuel` | `Fuel` | Drink builder |
| `/squad` | `Squad` | Group study session |
| `/checkout` | `Checkout` | Session summary + confirmation |
| `/story` | `Story` | Brand narrative |

**Navigation behaviour:**
- `<Navbar>` is rendered outside the `<Routes>` block so it appears on every page.
- `<Footer>` follows the same pattern.
- The `BOOK A DESK` CTA in the nav links to `/space`.
- The nav uses `<NavLink>` from React Router to automatically apply an active class to the current route (satisfying REQ-N-05).

---

## 4. Design System

### 4.1 CSS Custom Properties (`variables.css`)

All design tokens are defined as CSS custom properties on `:root`. Components never use raw colour values.

```
/* Colour palette */
--color-espresso:       #1D0804;
--color-deep-coffee:    #592F1D;
--color-roasted-brown:  #734830;
--color-warm-clay:      #926347;
--color-caramel:        #D1B39C;
--color-cream:          #E9E6E3;
--color-soft-beige:     #F3E9DF;
--color-dark-text:      #1D0804;
--color-accent:         #7A8C4F;   /* restrained olive — functional states only */

/* Typography scale */
--font-display:         "Waghu WAGHU Bold", serif;
--font-body:            "Coffee Morning Sans", sans-serif;

--size-display-xl:      clamp(4rem, 10vw, 9rem);
--size-display-lg:      clamp(2.5rem, 6vw, 5.5rem);
--size-display-md:      clamp(1.75rem, 4vw, 3rem);
--size-heading:         clamp(1.25rem, 2.5vw, 1.75rem);
--size-body:            1rem;
--size-small:           0.875rem;

/* Spacing scale */
--space-xs:   0.25rem;
--space-sm:   0.5rem;
--space-md:   1rem;
--space-lg:   2rem;
--space-xl:   4rem;
--space-2xl:  8rem;

/* Radii */
--radius-sm:  4px;
--radius-md:  8px;
--radius-lg:  16px;

/* Transitions */
--transition-fast:   150ms ease;
--transition-base:   250ms ease;
--transition-slow:   400ms ease;
```

### 4.2 Typography

The display font is **"Waghu WAGHU Bold"** — bold, editorial, heavy. It is used for all hero headlines, section titles, pull-quotes, and large label text. The body/UI font is **"Coffee Morning Sans"** — used for all navigation links, prose, form labels, button text, metrics, captions, and supporting UI text. **No font substitutions are permitted per REQ-G-08.**

Typography usage rules:
- `--size-display-xl`: hero headline only.
- `--size-display-lg`: major section headings (Space intro, Fuel intro, Squad intro).
- `--size-display-md`: sub-section headings, card headers.
- `--size-heading`: component headings, detail panel titles.
- `--size-body`: all body copy, labels, form inputs.
- `--size-small`: captions, metadata, telemetry labels.

All sizes use `clamp()` for fluid scaling across breakpoints.

### 4.3 Button Component

The `Button` component accepts a `variant` prop: `primary`, `secondary`, `ghost`.

- `primary`: filled with `--color-espresso`, cream text. Used for primary CTAs (BOOK A DESK, Add to Order, Confirm Session).
- `secondary`: outlined with `--color-espresso` border, dark text. Used for secondary CTAs (BUILD YOUR SIP, back-navigation).
- `ghost`: no border, text-only. Used for navigation links and dismissal actions.

All buttons must meet minimum 44×44px touch target size.

---

## 5. Local Data Models

### 5.1 Seat (`src/data/seats.js`)

```js
{
  id:              "S01",
  label:           "Window Nook A",
  availability:    "available",       // "available" | "reserved" | "occupied"
  seatType:        "solo",            // "solo" | "group" | "booth" | "bar"
  wifiSpeed:       150,               // number, Mbps
  noiseLevel:      "quiet",           // "quiet" | "moderate" | "lively"
  hasPower:        true,              // boolean
  naturalLighting: true,              // boolean
  trafficLevel:    "low",             // "low" | "moderate" | "high"
  pricePerHour:    250,               // number, INR
  mapX:            120,               // SVG x-coordinate
  mapY:            80,                // SVG y-coordinate
}
```

The `availability` field in the data file represents the initial/static state (reserved or occupied seats are hardcoded here). The `selected` state is NOT stored in this data file — it lives in `SessionContext` as a seat `id` string.

The file exports a plain array: `export const seats = [ ... ]`.

**Minimum dataset:** 16–20 seats with varied types, a mix of availability states, and enough variety to make all 6 filters return at least one result.

### 5.2 Base Drink (`src/data/drinks.js`)

```js
{
  id:          "espresso",
  name:        "Espresso",
  description: "Intense, concentrated, unapologetic.",
  basePrice:   120,       // INR
  caffeine:    64,        // mg
  calories:    5,
  protein:     0.1,       // g
  color:       "#3B1F0E", // used by DrinkVisual SVG
}
```

Exports: `export const drinks = [ ... ]`

### 5.3 Ingredients (`src/data/ingredients.js`)

Each ingredient category is a separate named export.

```js
// Milk options (single-select)
export const milkOptions = [
  { id: "none",   label: "No Milk",    price: 0,  caffeine: 0, calories: 0,  protein: 0   },
  { id: "whole",  label: "Whole Milk", price: 30, caffeine: 0, calories: 61, protein: 3.2 },
  { id: "oat",    label: "Oat Milk",   price: 40, caffeine: 0, calories: 45, protein: 1.0 },
  { id: "almond", label: "Almond Milk",price: 40, caffeine: 0, calories: 30, protein: 1.0 },
  { id: "soy",    label: "Soy Milk",   price: 35, caffeine: 0, calories: 33, protein: 2.8 },
]

// Sweetness (single-select)
export const sweetnessOptions = [
  { id: "none",   label: "No Sugar",  price: 0,  calories: 0  },
  { id: "light",  label: "Light",     price: 0,  calories: 10 },
  { id: "medium", label: "Medium",    price: 0,  calories: 25 },
  { id: "sweet",  label: "Sweet",     price: 10, calories: 50 },
]

// Syrups (multi-select)
export const syrupOptions = [
  { id: "vanilla",    label: "Vanilla",    price: 30, calories: 20 },
  { id: "caramel",    label: "Caramel",    price: 30, calories: 25 },
  { id: "hazelnut",   label: "Hazelnut",   price: 30, calories: 22 },
  { id: "cinnamon",   label: "Cinnamon",   price: 25, calories: 10 },
]

// Extras (multi-select)
export const extraOptions = [
  { id: "extra-shot", label: "Extra Shot",      price: 40, caffeine: 64, calories: 5,  protein: 0   },
  { id: "whip",       label: "Whipped Cream",   price: 30, caffeine: 0,  calories: 52, protein: 0.4 },
  { id: "protein",    label: "Protein Powder",  price: 60, caffeine: 0,  calories: 40, protein: 10  },
  { id: "oat-foam",   label: "Oat Foam",        price: 35, caffeine: 0,  calories: 18, protein: 0.5 },
]
```

### 5.4 Session State Shape (in memory / LocalStorage)

This is not a data file — it's the shape of the value stored in `SessionContext` and serialised to LocalStorage.

```js
{
  // Space
  selectedSeatId: "S01" | null,

  // Fuel
  confirmedDrink: {
    baseId:     "latte",
    milkId:     "oat",
    sweetnessId:"medium",
    syrupIds:   ["vanilla"],
    extraIds:   ["extra-shot"],
    // Derived totals (recalculated on load, not stored raw)
  } | null,

  // Squad
  squad: {
    sessionName: "Study Group Alpha",
    members: [
      {
        id:       "m1",        // uuid or timestamp-generated
        name:     "Priya",
        drinkConfig: { ... }   // same shape as confirmedDrink, or null
        seatId:   "S04" | null,
      }
    ],
    splitMode: "order" | "equal" | "custom",
    customAmounts: { "m1": 350, "m2": 200 }, // only used when splitMode === "custom"
  } | null,
}
```

---

## 6. State Management Strategy

### 6.1 SessionContext

A single React Context, `SessionContext`, is created in `src/context/SessionContext.jsx`.

The context value exposes:

```js
{
  // Seat
  selectedSeatId,
  selectSeat(seatId),
  clearSeat(),

  // Drink
  confirmedDrink,
  confirmDrink(drinkConfig),
  clearDrink(),

  // Squad
  squad,
  createSession(name),
  joinSession(name),
  addMember(name),
  removeMember(memberId),
  updateMemberDrink(memberId, drinkConfig),
  updateMemberSeat(memberId, seatId),
  setSplitMode(mode),
  setCustomAmount(memberId, amount),
  clearSquad(),

  // Global
  confirmSession(),   // clears everything + LocalStorage
}
```

`SessionProvider` (wrapping `<App>`) initialises all state from LocalStorage on mount via the `useLocalStorage` hook.

### 6.2 Local Component State

Feature components maintain their own ephemeral UI state that does not need to persist:

| Component | Local State |
|-----------|-------------|
| `Space` | `activeFilters[]`, `focusedSeatId` (which seat's panel is open) |
| `FuelBuilder` | `draftDrink` (the in-progress config before the user confirms) |
| `SquadPanel` | `showJoinInput` (toggle for join session input) |
| `BillSplitter` | `customDraftAmounts` (draft custom amounts before validation) |
| `Navbar` | `menuOpen` (mobile menu toggle) |

The distinction: `SessionContext` holds *committed* choices; local state holds *in-progress* choices.

### 6.3 Derived Values

Calculations (drink price, caffeine, calories, protein; member subtotals; group total; split amounts) are **never stored** — they are computed on every render from the base data and current config. This avoids stale cached totals.

Calculation functions live in `src/context/SessionContext.jsx` or a co-located `calculations.js` utility:

```
calculateDrinkMetrics(drinkConfig, drinks, ingredients) → { price, caffeine, calories, protein }
calculateMemberSubtotal(member, drinks, ingredients, seats) → number (INR)
calculateGroupTotal(members, drinks, ingredients, seats) → number (INR)
calculateSplitAmounts(members, groupTotal, splitMode, customAmounts) → { [memberId]: amount }
```

---

## 7. LocalStorage Strategy

### 7.1 Keys

| Key | Value stored |
|-----|-------------|
| `syntaxsip_seat` | `selectedSeatId` string or `null` |
| `syntaxsip_drink` | `confirmedDrink` object or `null` |
| `syntaxsip_squad` | `squad` object or `null` |

### 7.2 `useLocalStorage` Hook

```
useLocalStorage(key, defaultValue)
  → [value, setValue]
```

On mount: reads from `localStorage.getItem(key)`, parses JSON, falls back to `defaultValue` if missing or if `JSON.parse` throws.
On `setValue`: calls `localStorage.setItem(key, JSON.stringify(value))`.
`null` is a valid value (it clears the key via `localStorage.removeItem`).

### 7.3 Session Confirmation (clearing)

When `confirmSession()` is called in `SessionContext`:
1. All three state values are set to `null`.
2. All three LocalStorage keys are removed.
3. A `sessionConfirmed` flag (local component state in `Checkout`) is set to `true` to show the success screen.

### 7.4 Corruption Handling

The hook wraps `JSON.parse` in a try/catch. If parsing fails, the default value is returned and the corrupted key is overwritten on the next `setValue` call. The app never crashes due to bad LocalStorage data.

---

## 8. Navigation Component

### 8.1 Layout

The `Navbar` is a `<nav>` element rendered at the top of every page via `App.jsx`. On the homepage it is positioned absolutely over the hero (dark, translucent background). On all other pages it has a solid `--color-espresso` background.

Desktop layout (single row):
```
SYNTAX & SIP          SPACE   FUEL   SQUAD   STORY          [BOOK A DESK]
```

Mobile layout (`< 768px`): brand name left, hamburger icon right. Clicking hamburger opens a full-width dropdown with stacked links and the CTA.

### 8.2 Active State

`<NavLink>` from React Router DOM applies a CSS class `nav-link--active` when the current route matches. Active links use an underline or a subtle colour shift from `--color-caramel` to `--color-cream`.

### 8.3 Mobile Menu

- `menuOpen` state in `Navbar` controls visibility.
- When open, focus is trapped within the menu using a focus trap pattern (first focusable element receives focus on open; Tab cycles within the menu; Escape closes the menu and returns focus to the hamburger button).
- The hamburger button has `aria-expanded` and `aria-controls` attributes.

---

## 9. Homepage Design

### 9.1 Section Breakdown

| # | Section | Visual approach |
|---|---------|----------------|
| 1 | Hero | Full-viewport, `hero.png` as background, overlay gradient, oversized display headline, two CTAs |
| 2 | Brand intro | Two-column: large pull-quote left, short copy right. Dark background (`--color-espresso`) |
| 3 | Product journey | Three steps in a horizontal editorial row on desktop, stacked on mobile. Numbered 01/02/03 in display type |
| 4 | Space preview | Asymmetric: left copy + stats, right partial floor map SVG preview |
| 5 | Fuel preview | Full-width dark band, centered: drink name in oversized type, metric chips below |
| 6 | Squad preview | Light beige background, editorial layout with member name tags and a total figure |
| 7 | Story/editorial | Quote-style section with café imagery reference |
| 8 | Final CTA | Minimal: large headline, single primary button |

### 9.2 Hero

- Background: `hero.png` with a dark gradient overlay (`rgba(29,8,4,0.5)` → `rgba(29,8,4,0.85)`) so text remains legible.
- Headline: `--size-display-xl`, `--font-display`, `--color-cream`, all caps.
- Tagline: `--size-heading`, `--font-body`, `--color-caramel`.
- Primary CTA: `Button variant="primary"` → `/space`.
- Secondary CTA: `Button variant="secondary"` → `/fuel`.
- The Navbar overlays the hero with no visible separation.

### 9.3 No Repeated Card Grids

Per REQ-H-18, each section uses a distinct composition. The Space preview uses a two-column asymmetric layout. The Fuel preview uses a full-bleed typographic band. The Squad preview uses a list-style layout with financial figures. No two consecutive sections share the same structural template.

---

## 10. Space Page — Seat Map & Telemetry

### 10.1 Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Page header: "FIND YOUR SPACE" headline + short intro copy   │
├──────────────────┬──────────────────────────────────────────┤
│  FilterBar       │                                          │
│  (left sidebar   │   SeatMap (SVG)                          │
│  on desktop,     │                                          │
│  top bar on      │                                          │
│  mobile)         │                                          │
│                  │                                          │
├──────────────────┴──────────────────────────────────────────┤
│ SeatDetails panel (slides in from right, or bottom on mobile)│
└─────────────────────────────────────────────────────────────┘
```

When a seat is selected (booked), a slim `SessionBar` strip appears at the bottom of the page showing the seat label and a "View in Checkout" link.

### 10.2 SeatMap SVG Design

The SVG viewBox is fixed (e.g. `0 0 800 600`) with `preserveAspectRatio="xMidYMid meet"`. On mobile the SVG scales inside a scrollable container.

**Floor layout elements (decorative, non-interactive):**
- Outer walls as a `<rect>` with rounded corners.
- Counter/bar area as a filled shape.
- A window zone indicator (subtle line/shading along one wall).
- Zone labels ("Window Zone", "Bar Seating", "Group Area") as `<text>` elements.

**Seat nodes:**
Each seat is rendered by a `<Seat>` component, which renders a `<g>` (group) element inside the SVG containing:
- A `<circle>` or `<rect>` shape, sized ~28×28px SVG units (scales to ≥44px on screen at the default map size).
- A `<title>` element for screen reader accessibility (e.g. "Seat S01 — Window Nook A, solo, available").

Seat visual states:

| State | Fill colour | Stroke | Opacity |
|-------|------------|--------|---------|
| available | `--color-caramel` | `--color-roasted-brown` | 1.0 |
| selected | `--color-accent` (olive) | `--color-dark-text` | 1.0 |
| reserved | `--color-warm-clay` | `--color-warm-clay` | 0.5 |
| occupied | `--color-espresso` | `--color-espresso` | 0.6 |
| filtered-out (dimmed) | `--color-caramel` | none | 0.2 |

Seat node click/keyboard behaviour:
- `available` and `selected` seats: trigger `onSeatClick(seat)` which opens `SeatDetails`.
- `reserved` and `occupied` seats: trigger `onUnavailableClick()` which optionally shows a brief inline tooltip "Seat unavailable."
- Each seat `<g>` has `role="button"`, `tabIndex={0}`, `aria-label`, `aria-disabled` (for reserved/occupied), and handles both `onClick` and `onKeyDown` (Enter/Space).

### 10.3 FilterBar

Six filter toggle buttons. Each corresponds to a filter key. Active filters have `--color-accent` background. The component maintains no state — it receives `activeFilters` array and `onToggleFilter(key)` / `onClearFilters()` as props from `Space`.

Filter application logic (in `Space`):

```
filteredSeats = seats.filter(seat => {
  if (seat.availability !== "available") return false  // never show unavailable as selectable
  if (filters.includes("power")      && !seat.hasPower)              return false
  if (filters.includes("quiet")      && seat.noiseLevel !== "quiet") return false
  if (filters.includes("fast-wifi")  && seat.wifiSpeed < 100)        return false
  if (filters.includes("window")     && !seat.naturalLighting)       return false
  if (filters.includes("group")      && seat.seatType !== "group")   return false
  if (filters.includes("low-traffic")&& seat.trafficLevel !== "low") return false
  return true
})
```

When filters are active, seats NOT in `filteredSeats` are rendered with `filtered-out` visual state but remain visible on the map (they are dimmed, not hidden). This preserves the spatial context of the floor.

If `filteredSeats.length === 0`, the `EmptyState` component is rendered below the map.

### 10.4 SeatDetails Panel

Triggered by clicking an available seat. On desktop it slides in from the right as a fixed-width aside. On mobile it slides up from the bottom as a bottom sheet.

Panel content:
```
Seat label + type badge
─────────────────────
Telemetry grid (2×3 on desktop, 2-column stacked on mobile):
  Wi-Fi         [speed] Mbps
  Noise         [level]
  Power         ✓ / ✗
  Window Light  ✓ / ✗
  Traffic       [level]
  Price         ₹[amount]/hr
─────────────────────
[Book this seat]   [✕ Close]
```

`TelemetryMetric` is a small display component: icon + label + value. Icons are inline SVG.

`Book this seat` calls `selectSeat(seat.id)` on `SessionContext`. If a seat is already selected, a brief inline confirmation message appears: "Replace your current selection?" with Confirm / Cancel. After confirming, the panel closes and the `SessionBar` updates.

### 10.5 Seat Selection in SessionContext

`selectSeat(seatId)`:
1. Sets `selectedSeatId` to the new `seatId`.
2. Writes to `syntaxsip_seat` in LocalStorage.

`clearSeat()`:
1. Sets `selectedSeatId` to `null`.
2. Removes `syntaxsip_seat` from LocalStorage.

On `SeatMap` render, the seat whose `id === selectedSeatId` receives the `selected` visual state regardless of its `availability` field in the data. The data file's `availability` field only controls reserved/occupied.

---

## 11. Fuel Page — Drink Builder

### 11.1 Page Layout

```
┌────────────────────────────────────────────────┐
│ "BUILD YOUR SIP" headline + intro copy          │
├───────────────────────┬────────────────────────┤
│  Builder controls     │  DrinkVisual (SVG cup)  │
│  (left column)        │  + MetricsPanel         │
│                       │  (right column)         │
│  Base drink selector  │                         │
│  Milk selector        │                         │
│  Sweetness selector   │                         │
│  Syrup add-ons        │                         │
│  Extras               │                         │
│                       │                         │
│  [Add to Order]       │                         │
└───────────────────────┴────────────────────────┘
```

On mobile: right column (visual + metrics) moves above the controls. This ensures the live metrics are always visible before the user scrolls into the controls.

### 11.2 Draft State vs Confirmed State

`FuelBuilder` maintains a `draftDrink` in local component state. This is the in-progress configuration. It is NOT committed to `SessionContext` or LocalStorage until the user clicks **Add to Order**.

On page mount, `draftDrink` is initialised from `confirmedDrink` in `SessionContext` (if present) or from the default (first base drink, no milk, no sweetness, no syrups, no extras).

This means:
- Users can experiment freely without their saved drink changing.
- Refreshing the page restores the last *confirmed* drink, not an in-progress draft.

### 11.3 Metric Calculation

`calculateDrinkMetrics(draftDrink)` runs on every render of `FuelBuilder`:

```
price    = baseDrink.basePrice
           + milk.price
           + sweetness.price
           + sum(selectedSyrups.map(s => s.price))
           + sum(selectedExtras.map(e => e.price))

caffeine = baseDrink.caffeine
           + sum(selectedExtras.map(e => e.caffeine))

calories = baseDrink.calories
           + milk.calories
           + sweetness.calories
           + sum(selectedSyrups.map(s => s.calories))
           + sum(selectedExtras.map(e => e.calories))

protein  = baseDrink.protein
           + milk.protein
           + sum(selectedExtras.map(e => e.protein))
```

All values default to `0` if any ingredient is missing (guards against NaN/undefined per REQ-E-07).

### 11.4 DrinkVisual

An SVG component that renders a stylised cup. The cup fill colour changes to match the selected base drink's `color` field. A layered fill (a semi-transparent layer) represents milk if a non-null milk is selected.

The visual does not attempt photorealistic rendering — it is an editorial, illustrative representation: a clean vector cup silhouette with colour zones that react to selections.

### 11.5 IngredientOption Component

Renders a single selectable option (base drink card, milk pill, syrup chip, etc.).

Props: `label`, `isSelected`, `onClick`, `disabled`. When `isSelected`, applies `--color-accent` border and a checkmark indicator. All options are `<button>` elements with `aria-pressed` for screen readers.

### 11.6 MetricsPanel

Four metric tiles in a 2×2 grid, always visible. Each tile shows an icon, label, and value. Uses `aria-live="polite"` on a wrapping `<div>` so screen readers announce value changes.

---

## 12. Squad Page — Group Study Session

### 12.1 Page Layout

```
┌─────────────────────────────────────────────────┐
│ "STUDY TOGETHER" headline                        │
├──────────────────────┬──────────────────────────┤
│  SquadPanel          │  BillSplitter             │
│  (left)              │  (right)                  │
│                      │                           │
│  Session name        │  Split mode selector      │
│  + [End Session]     │  Member amounts list      │
│                      │  Group total              │
│  Member list:        │                           │
│  [SquadMember ×N]    │                           │
│                      │                           │
│  [+ Add Member]      │                           │
└──────────────────────┴──────────────────────────┘
```

On mobile: `BillSplitter` moves below `SquadPanel`.

### 12.2 Create vs Join Session

On the Squad page, if `squad === null`:

```
┌──────────────────────┐
│ No active session    │
│                      │
│  Session name input  │
│  [Create Session]    │
│                      │
│  ─── or ───          │
│                      │
│  Session code input  │
│  [Join Session]      │
└──────────────────────┘
```

"Join" is simulated: if a session name is entered that matches a hardcoded example session (from `src/data/squad.js`), it pre-populates the squad with example members. Otherwise it creates a new session with that name and zero members. This satisfies REQ-SQ-02 without any backend.

### 12.3 SquadMember Component

Each member card displays:
- Name (editable inline on click, or via edit button)
- Drink: either "No drink" or a summary label (e.g. "Oat Latte + Vanilla") with an **Edit** link that opens a simplified drink picker (the same `FuelBuilder` component in a compact/modal mode, or a dropdown of pre-built drinks from `drinks.js`).
- Seat: either "No seat" or a seat label with an **Edit** link that opens a seat picker (a simplified dropdown of available seats from `seats.js`).
- Subtotal: `₹[amount]`
- Remove button (×)

The simplified drink picker for squad members can either:
- Re-use `FuelBuilder` in a modal — preferred for consistency.
- Or offer a "quick pick" dropdown of base drink + milk only. This simpler version is acceptable for v1 if the full builder in a modal creates layout complexity.

Design decision: **use a modal-wrapped `FuelBuilder`** for consistency. The modal is triggered by the member's "Edit" drink link. The member's drink config is stored in `squad.members[i].drinkConfig`.

### 12.4 BillSplitter Component

**Split mode selector:** Three buttons (`By Order`, `Equal`, `Custom`). Active mode has `--color-accent` background.

**Split by Order:**
```
Priya   ₹350
Arjun   ₹290
Kavya   ₹0 (no order)
─────────────
Total   ₹640
```

**Equal Split:**
```
Priya   ₹213
Arjun   ₹213
Kavya   ₹214   (remainder distributed to last member)
─────────────
Total   ₹640
```

Equal split rounding: integer division; any remainder (from INR paise being ignored) added to the last member's amount, so the sum always equals the total exactly.

**Custom Split:**
Each member has a number input. A running "Remaining" figure shows `groupTotal − sum(customAmounts)`. If remaining ≠ 0, the **Confirm Session** button in Checkout is disabled and a validation message "Amounts must add up to ₹[total]" is shown.

### 12.5 Seat Assignment for Squad Members

A squad member's `seatId` is picked from a dropdown listing all seats from `seats.js` (showing label + availability). The dropdown includes an "No seat" option. There is no conflict detection (REQ-SQ-08a): two members can reference the same seat. The UI does not visually flag this.

---

## 13. Checkout / Session Summary

### 13.1 Page Layout

```
┌──────────────────────────────────────────────┐
│ "YOUR SESSION" headline                       │
├───────────────┬──────────────────────────────┤
│ Seat summary  │  Drink summary               │
│ ─────────     │  ─────────                   │
│ [seat label]  │  [drink name]                │
│ [type, price] │  [customisations]            │
│ [Edit →]      │  [price]  [Edit →]           │
├───────────────┴──────────────────────────────┤
│ Squad summary (if squad active)               │
│ ─────────────────────────────────────────────│
│ [member]  [drink]  [seat]  [amount]           │
│ ...                                           │
│ Split mode: [By Order]                        │
│                              Group Total ₹XXX │
├──────────────────────────────────────────────┤
│                       [Confirm Session →]     │
└──────────────────────────────────────────────┘
```

Edit links navigate back to the relevant page (`/space`, `/fuel`, `/squad`).

### 13.2 Final Total Calculation

```
If squad is active:
  finalTotal = calculateGroupTotal(squad.members)

If no squad (solo session):
  finalTotal = (confirmedDrink price) + (selectedSeat pricePerHour × 1)
               // one hour assumed as a default
```

The "× 1 hour" assumption is shown explicitly in the UI: "1 hour (default)".

### 13.3 Confirm Session

On click:
1. `confirmSession()` is called in `SessionContext`.
2. All three LocalStorage keys are cleared.
3. All state in SessionContext is reset to `null`.
4. `Checkout` shows a success screen:

```
┌──────────────────────────────────────────────┐
│                                              │
│   ☕  Your session is confirmed.              │
│                                              │
│   See you at Syntax & Sip.                   │
│                                              │
│   [Explore the menu →]   [Back to home →]   │
│                                              │
└──────────────────────────────────────────────┘
```

### 13.4 Empty Checkout State

If `selectedSeatId === null && confirmedDrink === null && squad === null`:

```
┌──────────────────────────────────────────────┐
│   Nothing here yet.                          │
│   Start building your session:               │
│                                              │
│   [Find a space →]   [Build your sip →]      │
│   [Start a squad →]                          │
└──────────────────────────────────────────────┘
```

---

## 14. Story Page

### 14.1 Layout

Editorial, scrolling page. No interactive features.

Sections:
1. Full-bleed dark hero with large display type headline ("A PLACE TO THINK.").
2. Origin story copy (2–3 short paragraphs). Two-column on desktop, single column on mobile.
3. Pull-quote: a single brand statement in oversized italic type.
4. Values section: three short pillars (e.g. "Focus", "Community", "Craft") with a sentence each.
5. CTA band: "Ready to find your corner?" → `[BOOK A DESK]`.

### 14.2 Copy Tone

The Story page copy must feel authored, not generated. It should communicate the café's personality (warm, intelligent, editorial) consistent with the steering file brand personality section. The copy is hardcoded JSX — there is no CMS.

---

## 15. Session Flow — How the Three Experiences Connect

The three core experiences are independent pages but share state through `SessionContext`. A user can complete them in any order, or use only one. The Checkout page brings them together.

```
[Home]
  │
  ├──→ [/space]  Select a seat
  │        └── selectedSeatId saved to context + LocalStorage
  │
  ├──→ [/fuel]   Build a drink → Add to Order
  │        └── confirmedDrink saved to context + LocalStorage
  │
  ├──→ [/squad]  Create session → Add members → Assign drinks/seats → Choose split
  │        └── squad saved to context + LocalStorage
  │
  └──→ [/checkout]  Reads selectedSeatId + confirmedDrink + squad
            │        Displays combined summary + total
            └── Confirm Session → clear all state + show success
```

**Session persistence across navigation:**
Because the context state is initialised from LocalStorage on app load, the user can navigate freely between pages — even refreshing — without losing their in-progress session. The session only clears when they explicitly click **Confirm Session**.

**The Navbar `BOOK A DESK` CTA** always links to `/space`. From there, the user naturally flows to `/fuel` (prompted by the Space page's "Next: Build your sip →" link in the `SessionBar`) and then to `/squad` and `/checkout`.

**Cross-page awareness:**
- The `SeatMap` reads `selectedSeatId` from context to show the currently booked seat at a glance.
- The `FuelBuilder` reads `confirmedDrink` to pre-populate the draft on mount.
- The `SquadPanel` can reference the `confirmedDrink` as the "current user's" drink when adding themselves as the first member.
- The `Checkout` assembles all three into one view.

---

## 16. Responsive Design Strategy

### 16.1 Breakpoints

Defined as CSS custom properties and used in media queries:

```css
/* Mobile first */
/* Base styles: ≥320px (mobile) */
@media (min-width: 600px)  { /* large mobile / small tablet */ }
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1024px) { /* laptop */ }
@media (min-width: 1280px) { /* desktop */ }
```

### 16.2 Layout Strategy per Page

| Page | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Home hero | Single column, stacked CTAs | Same, larger type | Full-viewport, side-by-side CTAs |
| Space | FilterBar on top, map below, details as bottom sheet | FilterBar left sidebar, details as right panel | Two-column: sidebar + map + right panel |
| Fuel | Metrics + visual on top, controls below | Two-column | Two-column |
| Squad | SquadPanel, then BillSplitter stacked | Two-column | Two-column |
| Checkout | Stacked cards | Stacked cards | Two-column grid |

### 16.3 Floor Map on Mobile

The SVG map is placed inside a `div` with `overflow: auto` and a fixed height on mobile. The SVG uses a fixed `width` and `height` attribute (not `100%`) so it is scrollable on small screens. Seat `<g>` elements are sized to ensure the rendered tap target is ≥44px.

Alternatively, a `transform: scale()` approach reduces the map to fit the viewport width, with a "tap to zoom" interaction. The simpler scroll approach is preferred for v1.

### 16.4 Typography at Breakpoints

All `--size-*` tokens use `clamp(min, preferred, max)`. The `--size-display-xl` token (hero headline) reduces from `9rem` on desktop to `4rem` on mobile, preserving the editorial dominance while fitting the viewport.

---

## 17. Accessibility Design

### 17.1 Keyboard Navigation

- All interactive elements use native `<button>` or `<a>` elements where possible (inherently focusable).
- SVG seat nodes use `<g role="button" tabIndex="0">` with `onKeyDown` handling Enter and Space.
- Focus order follows visual reading order.
- The mobile nav focus trap uses a `useEffect` that sets focus to the first menu item on open and attaches a `keydown` listener for Escape.

### 17.2 ARIA

| Pattern | ARIA approach |
|---------|--------------|
| Filter toggle buttons | `aria-pressed="true/false"` |
| Seat nodes (SVG) | `role="button"`, `aria-label="Seat S01, Window Nook A, solo, available"`, `aria-disabled` for reserved/occupied |
| Seat detail panel | `role="dialog"`, `aria-labelledby` pointing to the panel heading, `aria-modal="true"` |
| Mobile nav menu | `aria-expanded` on hamburger, `aria-controls` pointing to menu `id` |
| Live metrics | `aria-live="polite"` on `MetricsPanel` container |
| Split mode buttons | `role="radiogroup"` + `role="radio"` + `aria-checked` pattern, or `aria-pressed` on toggle buttons |
| Custom split inputs | `<label for="...">` paired with `<input id="...">` |

### 17.3 Colour Contrast

All text/background combinations from the palette are verified at design time:
- `--color-cream` on `--color-espresso`: ~14:1 ✓
- `--color-dark-text` on `--color-soft-beige`: ~17:1 ✓
- `--color-caramel` on `--color-espresso`: must be checked — if it fails AA for body text it is used for large text (headings) only or a lighter tone is substituted.
- `--color-accent` (olive) on `--color-soft-beige`: must be verified at implementation time.

### 17.4 Focus Indicators

All focusable elements have a visible focus ring: `outline: 2px solid --color-accent; outline-offset: 2px`. The browser default outline is not removed without a replacement.

---

## 18. Empty States & Error Boundaries

### 18.1 EmptyState Component

A reusable `EmptyState` component accepts:
- `icon`: an inline SVG icon (e.g. a coffee cup outline)
- `heading`: short text
- `message`: supporting sentence
- `action`: optional `{ label, href }` for a CTA link

Used in:
- Space: no filter matches
- Checkout: no session data
- Squad: no members

### 18.2 Filter Empty State (Space)

When `filteredSeats.length === 0`, the area below the map renders:
```
[☕ icon]
No seats match your filters.
Try removing a filter or exploring the full map.
[Clear all filters]
```

The map itself remains visible (dimmed seats) so the user can see the spatial context.

### 18.3 Drink Metrics Guard

In `calculateDrinkMetrics`, all additions use `(value ?? 0)` to guard against undefined ingredient data. The function always returns an object with numeric values, never `NaN`.

### 18.4 LocalStorage Error Boundary

The `useLocalStorage` hook catches `JSON.parse` errors silently and returns the default value. No user-visible error is thrown.

---

## 19. Animation & Motion

All animations are implemented with CSS transitions using the `--transition-*` tokens. No animation library is introduced.

| Interaction | Animation |
|-------------|-----------|
| Seat hover (available) | `transform: scale(1.1)` over `--transition-fast` |
| Seat selection confirmation | Brief `--color-accent` ring pulse (CSS `@keyframes`) |
| SeatDetails panel open/close | `transform: translateX(0/100%)` (desktop) or `translateY(0/100%)` (mobile) over `--transition-slow` |
| FilterBar toggle | Background colour crossfade over `--transition-fast` |
| Metric value change (Fuel) | Brief opacity flash (fade out old value, fade in new) over `--transition-base` — only if feasible; skip if it complicates the implementation |
| Mobile nav open/close | `transform: translateY(0/-100%)` over `--transition-base` |
| Checkout confirm → success | Fade out summary, fade in success screen over `--transition-slow` |

Animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

*Design phase complete. `requirements.md` has not been modified. `tasks.md` has not been generated. Awaiting user review before proceeding to implementation tasks.*
