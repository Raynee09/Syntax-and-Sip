# Syntax & Sip — Requirements

## Overview

Syntax & Sip is a premium smart café + workspace platform for students, coders, designers, freelancers, and remote workers. The product combines café discovery, interactive workspace seat selection, drink customization, group study session management, and collaborative bill splitting into a single cohesive frontend application.

This document defines **what** the product must do. It does not prescribe how it will be implemented.

> **Currency:** All monetary values displayed in this application — seat prices, drink prices, member subtotals, group totals, and split amounts — must be denominated in **Indian Rupees (INR)** and displayed with the ₹ symbol (e.g. ₹120, ₹350/hr).

---

## Table of Contents

1. [Global / Cross-Cutting Requirements](#1-global--cross-cutting-requirements)
2. [Navigation](#2-navigation)
3. [Homepage](#3-homepage)
4. [Space Page — Seat Selection & Telemetry](#4-space-page--seat-selection--telemetry)
5. [Fuel Page — Drink Builder](#5-fuel-page--drink-builder)
6. [Squad Page — Group Study Session](#6-squad-page--group-study-session)
7. [Checkout / Session Summary](#7-checkout--session-summary)
8. [Story Page](#8-story-page)
9. [LocalStorage Persistence](#9-localstorage-persistence)
10. [Responsive Behavior](#10-responsive-behavior)
11. [Accessibility](#11-accessibility)
12. [Empty States & Invalid Selections](#12-empty-states--invalid-selections)

> **Note:** There are 12 requirement areas, numbered 1–12, consistent with the table of contents above.

---

## 1. Global / Cross-Cutting Requirements

### 1.1 Technology Stack

- **REQ-G-01** The application must be built with React and Vite.
- **REQ-G-02** The application must be implemented in JavaScript (not TypeScript).
- **REQ-G-03** Styling must use plain CSS. CSS variables must be used for all design tokens (colors, spacing, typography scale).
- **REQ-G-04** SVG must be used where appropriate for icons, the floor map, and decorative elements.
- **REQ-G-05** All seat, drink, ingredient, and squad data must be stored in local JavaScript/JSON data files inside `src/data/`.
- **REQ-G-06** No backend, database, Firebase, Supabase, Express, WebSockets, or authentication system may be introduced.
- **REQ-G-07** No real payment processing may be introduced. All checkout behavior is a frontend simulation.

### 1.2 Brand & Visual Identity

- **REQ-G-08** The application must use the exact typographic choices defined by the project reference. No font substitutions are permitted.
- **REQ-G-09** The application must use the defined color palette: Espresso `#1D0804`, Deep Coffee `#592F1D`, Roasted Brown `#734830`, Warm Clay `#926347`, Caramel `#D1B39C`, Cream `#E9E6E3`, Soft Beige `#F3E9DF`, Dark Text `#1D0804`. No colors outside this palette may be introduced without justification.
- **REQ-G-10** A restrained muted olive/lime accent may be used only for functional UI states (e.g. active selection, confirmed booking) and nowhere else.
- **REQ-G-11** The overall visual character must feel premium, editorial, warm, and café-like — not like a SaaS dashboard.

### 1.3 Animation

- **REQ-G-12** Animations must be used only when they improve navigation, feedback, transitions, selection states, or builder interactions. Constant movement, parallax effects, and decorative animations are not permitted.

---

## 2. Navigation

### User Stories

> As a visitor, I want a persistent navigation bar so I can reach any section of the site from any page.

> As a visitor, I want a clear call-to-action in the navigation so I can begin the booking flow immediately.

### Acceptance Criteria

- **REQ-N-01** The navigation must be present and visible on every page.
- **REQ-N-02** The navigation must display the brand name **SYNTAX & SIP**.
- **REQ-N-03** The navigation must include four primary links: **SPACE**, **FUEL**, **SQUAD**, **STORY**.
- **REQ-N-04** The navigation must include a primary CTA button labeled **BOOK A DESK**.
- **REQ-N-05** The active page link must be visually distinct from inactive links.
- **REQ-N-06** On desktop, all navigation items must be visible in a single horizontal bar.
- **REQ-N-07** On mobile, the navigation must collapse into a usable mobile menu (hamburger or equivalent). All primary links and the CTA must remain accessible within the mobile menu.
- **REQ-N-08** The navigation must be keyboard-navigable. All links and the CTA must be reachable and activatable via keyboard.
- **REQ-N-09** The navigation must visually integrate with the hero section on the homepage rather than appearing as a standalone floating bar.

---

## 3. Homepage

### User Stories

> As a visitor, I want to immediately understand what Syntax & Sip is so I can decide whether it meets my needs.

> As a visitor, I want to see previews of the core product features so I know what the platform offers before diving in.

> As a visitor, I want clear calls to action so I can start the most relevant experience without hunting.

### Acceptance Criteria

#### 3.1 Hero Section

- **REQ-H-01** The homepage must open with a full-viewport or near-full-viewport hero section.
- **REQ-H-02** The hero must contain a large editorial headline communicating the café's workspace positioning (e.g. "FIND YOUR CORNER." or "COFFEE FOR YOUR FOCUS.").
- **REQ-H-03** The hero must contain a supporting tagline: *"A café designed around the way you work."*
- **REQ-H-04** The hero must contain a primary CTA button: **BOOK A DESK**.
- **REQ-H-05** The hero must contain a secondary CTA: **BUILD YOUR SIP**.
- **REQ-H-06** The hero must use a photographic coffee/workspace visual composition (the `hero.png` asset or equivalent).
- **REQ-H-07** Clicking **BOOK A DESK** must navigate to the Space page.
- **REQ-H-08** Clicking **BUILD YOUR SIP** must navigate to the Fuel page.

#### 3.2 Brand Introduction Section

- **REQ-H-09** The homepage must include a short brand/product introduction section that communicates the platform's core identity and differentiator from a generic café.

#### 3.3 Product Journey Section

- **REQ-H-10** The homepage must include an editorial section presenting the three-step product journey: **FIND YOUR SPACE → BUILD YOUR SIP → STUDY TOGETHER**.
- **REQ-H-11** Each step must link to its corresponding page (Space, Fuel, Squad respectively).

#### 3.4 Feature Preview Sections

- **REQ-H-12** The homepage must include a preview/teaser section for the Space / Telemetry experience.
- **REQ-H-13** The homepage must include a preview/teaser section for the Fuel Builder experience.
- **REQ-H-14** The homepage must include a preview/teaser section for the Squad / Group Study experience.
- **REQ-H-15** Each preview section must include a link or CTA leading to the corresponding full-feature page.

#### 3.5 Story/Editorial Section

- **REQ-H-16** The homepage must include an editorial café story section that communicates the brand's personality and values.

#### 3.6 Final CTA Section

- **REQ-H-17** The homepage must end with a final CTA section reinforcing the primary action (e.g. **BOOK A DESK** or **BUILD YOUR SIP**).

#### 3.7 Layout

- **REQ-H-18** Sections must not all share the same card-grid layout. The homepage must use varied compositions and visual rhythms across sections.

---

## 4. Space Page — Seat Selection & Telemetry

### User Stories

> As a visitor, I want to see an interactive map of the café floor so I can understand the layout and find a suitable seat.

> As a visitor, I want to filter seats by specific needs (power, quiet, Wi-Fi speed, etc.) so I can quickly narrow down my options.

> As a visitor, I want to click a seat and see its details and telemetry so I can make an informed decision before booking.

> As a visitor, I want to book a seat from its detail view so I can reserve my workspace.

### Acceptance Criteria

#### 4.1 Floor Map

- **REQ-S-01** The Space page must display an interactive 2D café floor map.
- **REQ-S-02** The floor map must render individual seat positions. Each seat must be visually distinct based on its current state.
- **REQ-S-03** Seat states must be: **available**, **selected**, **reserved**, **occupied**. Each state must have a visually distinct appearance. State definitions:
  - **available** — the seat exists in local data with no prior claim and may be booked by the user.
  - **selected** — the user's current frontend session choice. This is a local UI state only; it does not represent a globally reserved or server-side reserved seat. Because this is a frontend-only application, there is no real-time global reservation system.
  - **reserved** — a seat predefined as unavailable in the local data file. It cannot be selected by the user.
  - **occupied** — a seat predefined as in-use in the local data file. It cannot be selected by the user.
- **REQ-S-04** The floor map must be implemented using SVG or CSS-based shapes and must not resemble a generic analytics dashboard.
- **REQ-S-05** Occupied and reserved seats must not be selectable by the user.

#### 4.2 Seat Data

Each seat in the data layer must carry the following attributes:

- **REQ-S-06** `id` — unique identifier
- **REQ-S-07** `availability` — one of: available, reserved, occupied
- **REQ-S-08** `wifiSpeed` — a numeric value in Mbps (e.g. `50`, `120`, `200`). Must be stored as a number, not a descriptive string.
- **REQ-S-09** `noiseLevel` — a descriptive label (e.g. quiet, moderate, lively)
- **REQ-S-10** `hasPower` — boolean
- **REQ-S-11** `naturalLighting` — boolean or descriptive label
- **REQ-S-12** `seatType` — a label (e.g. solo, group, booth, bar)
- **REQ-S-13** `pricePerHour` — numeric value in INR, displayed as ₹ (e.g. ₹250/hr).
- **REQ-S-14** `trafficLevel` — a label (e.g. low, moderate, high)

#### 4.3 Filters

- **REQ-S-15** The Space page must provide filter controls for: **Power**, **Quiet**, **Fast Wi-Fi**, **Window**, **Group**, **Low Traffic**. Filter logic is deterministic:
  - **Power** — `hasPower === true`
  - **Quiet** — `noiseLevel === "quiet"`
  - **Fast Wi-Fi** — `wifiSpeed >= 100` (Mbps)
  - **Window** — `naturalLighting === true`
  - **Group** — `seatType === "group"`
  - **Low Traffic** — `trafficLevel === "low"`
- **REQ-S-16** Filters must be toggleable. Multiple filters may be active simultaneously.
- **REQ-S-17** When one or more filters are active, only seats matching all active filter criteria must be shown as selectable on the map. Non-matching seats must appear visually inactive/dimmed.
- **REQ-S-18** If no seats match the active filters, the page must show a meaningful empty state message rather than a blank map.
- **REQ-S-19** Filters must be clearable (individually or all at once).

#### 4.4 Seat Detail Panel

- **REQ-S-20** Clicking an available seat must open a detail panel (sidebar, modal, or inline panel) focused on that seat.
- **REQ-S-21** The detail panel must display all telemetry attributes for the selected seat: Wi-Fi speed, noise level, power availability, natural lighting, seat type, price per hour, traffic level.
- **REQ-S-22** The detail panel must include a clearly labeled **Book this seat** action.
- **REQ-S-23** The detail panel must include a way to dismiss/close it without booking.
- **REQ-S-24** Clicking a reserved or occupied seat must not open the booking panel. It may optionally display a read-only "Unavailable" state.

#### 4.5 Booking

- **REQ-S-25** Confirming **Book this seat** must mark the seat as **selected** (user's chosen seat) within the current session.
- **REQ-S-26** Only one seat may be selected per session. Selecting a new seat while one is already selected must replace the previous selection after a confirmation prompt or automatically (behavior must be consistent).
- **REQ-S-27** A selected seat must be visually distinguishable from available, reserved, and occupied states on the map.
- **REQ-S-28** After booking, the selected seat must be persisted to LocalStorage so it survives a page refresh.
- **REQ-S-29** The page must surface a visual indicator (e.g. badge or summary strip) showing the currently selected seat when one has been booked.

---

## 5. Fuel Page — Drink Builder

### User Stories

> As a visitor, I want to choose a base drink and customize it so I can build a drink that fits my exact preferences.

> As a visitor, I want to see a live price, caffeine, calorie, and protein count update as I customize my drink so I can make an informed choice.

> As a visitor, I want the builder to feel like a creative, experimental experience rather than a product catalog.

### Acceptance Criteria

#### 5.1 Base Drink Selection

- **REQ-F-01** The Fuel page must allow the user to select one base drink from at minimum: **Espresso**, **Latte**, **Cold Brew**, **Americano**, **Matcha**.
- **REQ-F-02** Exactly one base drink must be selected at all times. A default selection must be pre-applied when the page loads.
- **REQ-F-03** Switching the base drink must immediately update all dynamic metrics (price, caffeine, calories, protein).

#### 5.2 Customization Options

- **REQ-F-04** The builder must offer milk selection with at minimum: no milk, whole milk, oat milk, almond milk, soy milk.
- **REQ-F-05** The builder must offer sweetness level selection (e.g. none, light, medium, sweet).
- **REQ-F-06** The builder must offer syrup add-ons. Multiple syrups may be selected simultaneously.
- **REQ-F-07** The builder must offer extras/add-ons (e.g. espresso shot, whipped cream, protein powder). Multiple extras may be selected simultaneously.
- **REQ-F-08** Each customization option must carry its own contribution to price, caffeine, calories, and protein.

#### 5.3 Live Metrics

- **REQ-F-09** The page must display a live **price** total that updates immediately on any customization change.
- **REQ-F-10** The page must display a live **caffeine** value (in mg) that updates immediately on any customization change.
- **REQ-F-11** The page must display a live **calories** value that updates immediately on any customization change.
- **REQ-F-12** The page must display a live **protein** value (in g) that updates immediately on any customization change.
- **REQ-F-13** All four metrics must be prominently visible at the same time, not behind a tab or toggle.

#### 5.4 Visual Feedback

- **REQ-F-14** The builder must include a visual representation of the drink (e.g. an SVG or illustrated cup) that responds to the user's selections. At minimum, the visual must update to reflect the base drink selection.
- **REQ-F-15** Selected customization options must be clearly visually marked as active/selected.
- **REQ-F-16** Deselecting a syrup or extra must immediately update the visual and metrics.

#### 5.5 Drink Confirmation

- **REQ-F-17** The builder must include a clearly labeled final action to confirm the drink selection and add it to the current session/order (e.g. **Add to Order**).
- **REQ-F-18** After confirmation, the selected drink and customization must be persisted to LocalStorage.
- **REQ-F-19** Returning to the Fuel page within the same session must restore the user's last confirmed drink configuration from LocalStorage.

---

## 6. Squad Page — Group Study Session

### User Stories

> As a user, I want to create a group study session so I can coordinate a café visit with others.

> As a user, I want to add members to my squad and assign each person an individual drink and optional seat so the group order is organized in one place.

> As a user, I want to split the bill in different ways so the payment process is fair and flexible.

### Acceptance Criteria

#### 6.1 Session Management

- **REQ-SQ-01** The Squad page must allow a user to **create** a new study session.
- **REQ-SQ-02** The Squad page must allow a user to **join** an existing session (simulated via a session code or name, no backend required).
- **REQ-SQ-03** A session must persist in LocalStorage so it survives a page refresh.
- **REQ-SQ-04** The user must be able to clear/end a session and start fresh.

#### 6.2 Members

- **REQ-SQ-05** A squad may contain multiple members (minimum supported: 1, reasonable maximum: 8).
- **REQ-SQ-06** Each member must have a **name**.
- **REQ-SQ-07** Each member may have an **individual drink/order** assigned, either built with the Fuel Builder data or selected from a simplified list.
- **REQ-SQ-08** Each member may have an **optional seat** assigned, chosen from the available seats in the local seat data file. This is a separate concept from the main session's selected seat (managed on the Space page); the two do not conflict and there is no backend-style seat locking or real-time conflict detection.
- **REQ-SQ-08a** Multiple squad members may be assigned the same seat in local state. No uniqueness enforcement is applied, as this is a frontend simulation with no reservation backend.
- **REQ-SQ-09** Each member must display their **individual subtotal** (drink price + seat price if applicable).
- **REQ-SQ-10** Members must be addable and removable from the session.

#### 6.3 Group Total & Bill Split

- **REQ-SQ-11** The Squad page must display the **group total** (sum of all member subtotals).
- **REQ-SQ-12** The Squad page must support **split by order**: each member pays their own individual subtotal.
- **REQ-SQ-13** The Squad page must support **equal split**: the group total is divided equally among all members regardless of individual orders.
- **REQ-SQ-14** The Squad page must support **custom split**: the user can manually enter a custom amount for each member, with the interface validating that the sum of custom amounts equals the group total.
- **REQ-SQ-15** The active split method must be clearly displayed and easily switchable.
- **REQ-SQ-16** Each member's owed amount must be clearly displayed for the active split method.

---

## 7. Checkout / Session Summary

### User Stories

> As a user, I want to see a single summary of my selected seat, drink, squad, and total before finalizing so I can review everything in one place.

### Acceptance Criteria

- **REQ-C-01** The Checkout/Session Summary must display the currently selected seat (or a prompt to select one if none chosen).
- **REQ-C-02** The Checkout/Session Summary must display the currently confirmed drink and its customization (or a prompt to build one if none confirmed).
- **REQ-C-03** The Checkout/Session Summary must display the squad members and their individual orders (if a squad session is active).
- **REQ-C-04** The Checkout/Session Summary must display the active bill split method and each member's owed amount.
- **REQ-C-05** The Checkout/Session Summary must display a **final total**.
- **REQ-C-06** The summary must allow the user to navigate back to any section (Space, Fuel, Squad) to make changes.
- **REQ-C-07** The summary must include a **Confirm Session** action. Upon confirmation, the session state (seat, drink, squad) must be cleared from LocalStorage and the user must see a success/confirmation state.
- **REQ-C-08** No real payment method or external service may be invoked.
- **REQ-C-09** If no seat, no drink, and no squad members have been selected, the summary must show a meaningful empty/onboarding state rather than a blank screen.

---

## 8. Story Page

### User Stories

> As a visitor, I want to learn about the Syntax & Sip brand and what makes it different so I feel connected to the café before visiting.

### Acceptance Criteria

- **REQ-ST-01** The Story page must exist as a standalone route/page.
- **REQ-ST-02** The Story page must communicate the brand's personality, values, and origin narrative.
- **REQ-ST-03** The Story page must use editorial layout and typography consistent with the overall visual identity.
- **REQ-ST-04** The Story page must include at least one CTA leading back to the core product experiences (Space, Fuel, or Squad).
- **REQ-ST-05** The Story page must not feel like a generic "About Us" corporate page.

---

## 9. LocalStorage Persistence

### Acceptance Criteria

- **REQ-LS-01** The user's selected seat must be persisted to LocalStorage and restored on page load.
- **REQ-LS-02** The user's confirmed drink configuration must be persisted to LocalStorage and restored on page load.
- **REQ-LS-03** The user's active squad session (members, names, orders, seats, split method) must be persisted to LocalStorage and restored on page load.
- **REQ-LS-04** Confirming/completing the session (REQ-C-07) must clear all related LocalStorage keys.
- **REQ-LS-05** LocalStorage must use clearly namespaced keys (e.g. `syntaxsip_seat`, `syntaxsip_drink`, `syntaxsip_squad`) to avoid collisions.
- **REQ-LS-06** The application must handle corrupted or missing LocalStorage data gracefully (fail silently with defaults rather than crashing).

---

## 10. Responsive Behavior

### Acceptance Criteria

- **REQ-R-01** The application must be usable at desktop (≥1280px), laptop (≥1024px), tablet (≥768px), and mobile (≥320px) widths.
- **REQ-R-02** At all breakpoints, typography hierarchy must be preserved. Headings must remain visually dominant.
- **REQ-R-03** Layouts must stack intelligently on smaller screens rather than being scaled-down replicas of the desktop layout.
- **REQ-R-04** The navigation must transition to a mobile-friendly collapsed menu at tablet/mobile sizes (REQ-N-07).
- **REQ-R-05** The café floor map must remain usable on tablet and mobile. At minimum, it must scroll/pan or scale gracefully; seat tap targets must be large enough for touch interaction (minimum 44×44px tap target).
- **REQ-R-06** The Fuel Builder must remain fully usable on mobile. All customization options must be reachable without horizontal scrolling.
- **REQ-R-07** The Squad page must remain fully usable on mobile. Member management, bill split controls, and totals must all be accessible.
- **REQ-R-08** No content may be permanently hidden or inaccessible at any supported breakpoint.
- **REQ-R-09** Images and visual assets must not overflow their containers at any breakpoint.

---

## 11. Accessibility

### Acceptance Criteria

- **REQ-A-01** All interactive elements (buttons, links, filter toggles, seat map interactions) must be keyboard-focusable and activatable.
- **REQ-A-02** All interactive elements must have visible focus indicators.
- **REQ-A-03** All images must have meaningful `alt` text. Decorative images must use `alt=""`.
- **REQ-A-04** Color contrast between text and background must meet WCAG 2.1 AA minimum ratio (4.5:1 for normal text, 3:1 for large text).
- **REQ-A-05** Form inputs (member names, custom split amounts) must have associated labels.
- **REQ-A-06** The floor map seats must be navigable by keyboard and each seat must have an accessible label conveying its id, type, and availability state.
- **REQ-A-07** The dynamic metric updates in the Fuel Builder must be announced to screen readers (e.g. using `aria-live` regions).
- **REQ-A-08** The page structure must use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`, `<h1>`–`<h3>`, etc.).
- **REQ-A-09** The mobile navigation menu must manage focus correctly when opened and closed.

---

## 12. Empty States & Invalid Selections

### Acceptance Criteria

- **REQ-E-01** If no seats match the active Space filters, the floor map must display a clear empty state message (e.g. "No seats match your filters. Try adjusting your selection.").
- **REQ-E-02** If the user attempts to open the Checkout/Session Summary with no seat, no drink, and no squad members, the summary must show a guided empty state prompting them to start building their session.
- **REQ-E-03** If the user reaches the Squad page with zero members, it must show a clear prompt to add the first member rather than a blank or broken UI.
- **REQ-E-04** In the custom split mode (REQ-SQ-14), if the sum of custom amounts does not equal the group total, the interface must show a clear validation message and must not allow confirmation until the amounts balance.
- **REQ-E-05** If the user clicks a reserved or occupied seat on the floor map, the seat must not enter a selected state. It may optionally display a brief "Seat unavailable" message.
- **REQ-E-06** If LocalStorage data is missing or unparseable, the application must load with clean default state without throwing an error.
- **REQ-E-07** The Fuel Builder must always show valid metrics. If no base drink is selected (edge case), the metrics must show zeroes or a neutral default rather than NaN or undefined.

---

## Requirements Summary Table

| ID | Area | Priority |
|----|------|----------|
| REQ-G-01 – REQ-G-11 | Global / Tech Stack / Brand | Must Have |
| REQ-G-12 | Animation | Should Have |
| REQ-N-01 – REQ-N-09 | Navigation | Must Have |
| REQ-H-01 – REQ-H-18 | Homepage | Must Have |
| REQ-S-01 – REQ-S-29 | Space / Seat Selection | Must Have |
| REQ-F-01 – REQ-F-19 | Fuel / Drink Builder | Must Have |
| REQ-SQ-01 – REQ-SQ-16 | Squad / Group Study | Must Have |
| REQ-C-01 – REQ-C-09 | Checkout / Summary | Must Have |
| REQ-ST-01 – REQ-ST-05 | Story Page | Should Have |
| REQ-LS-01 – REQ-LS-06 | LocalStorage Persistence | Must Have |
| REQ-R-01 – REQ-R-09 | Responsive Behavior | Must Have |
| REQ-A-01 – REQ-A-09 | Accessibility | Must Have |
| REQ-E-01 – REQ-E-07 | Empty States & Invalid Selections | Must Have |

There are **12 requirement areas** (sections 1–12) consistent with the table of contents.

---

*Requirements phase complete. Design and implementation tasks have not been generated. Awaiting user review.*
