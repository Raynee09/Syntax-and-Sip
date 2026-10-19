---
inclusion: always
---

# SYNTAX & SIP — PROJECT STEERING

## 1. Project Identity

Project name: Syntax & Sip

Syntax & Sip is a premium smart café + workspace platform designed for students, coders, designers, freelancers, and remote workers.

It is NOT a generic café website.

The product combines:
- café discovery
- workspace/seat selection
- real-time-style workspace telemetry
- drink customization
- group study sessions
- collaborative ordering and bill splitting

The experience should feel like a real premium café brand that happens to have intelligent digital tools.

---

## 2. Core Product Features

The three primary product experiences are:

### A. SPACE / TELEMETRY

Users can explore an interactive 2D café floor map.

Each seat can display:
- availability
- Wi-Fi speed
- noise level
- power/socket availability
- natural lighting
- seat type
- price per hour
- traffic level

Users can filter seats by:
- Power
- Quiet
- Fast Wi-Fi
- Window
- Group
- Low Traffic

Seat states:
- available
- selected
- reserved
- occupied

Clicking a seat should open a focused detail panel containing telemetry and a clear "Book this seat" action.

The floor map should feel like an intentional café workspace interface, not a generic dashboard.

---

### B. FUEL BUILDER

Users can build a personalized drink.

Options can include:
- base drink
- milk
- sweetness
- syrups
- extras

Supported base examples:
- Espresso
- Latte
- Cold Brew
- Americano
- Matcha

The builder must dynamically calculate:
- price
- caffeine
- calories
- protein

The experience should feel like a coffee laboratory / customization studio.

Do NOT make it look like a generic e-commerce product configurator.

---

### C. SQUAD / GROUP STUDY

Users can create or join a study session.

A squad can contain multiple members.

Each member can have:
- name
- individual drink/order
- optional seat
- individual price

The group should support:
- total calculation
- split by order
- split equally
- custom split

No backend is required.

Use local state and LocalStorage for persistence.

---

## 3. Technical Constraints

This is a FRONTEND-ONLY project.

Use:

- React
- Vite
- JavaScript
- HTML
- CSS
- SVG
- local JavaScript/JSON data
- LocalStorage

Do NOT introduce:

- backend servers
- databases
- Firebase
- Supabase
- Express
- authentication backends
- WebSockets
- unnecessary APIs
- unnecessary external services

Keep the implementation understandable for a college student.

Prefer simple React components, hooks, props, local state, and reusable data structures.

Do not introduce complex architecture unless there is a clear reason.

---

# 4. TYPOGRAPHY — HARD CONSTRAINT

TYPOGRAPHY IS NON-NEGOTIABLE.

## Exact font choices for Syntax & Sip

**Display font:** `"Waghu WAGHU Bold"`
— Used for: hero headlines, major editorial headings, section titles, large uppercase statements, pull-quotes, decorative step numbers, and all `--font-display` references in CSS.

**Body / UI font:** `"Coffee Morning Sans"`
— Used for: navigation links, body copy, descriptions, labels, buttons, prices, captions, metric values, form inputs, and all `--font-body` references in CSS.

These fonts must be loaded and applied exactly as named. No substitution, approximation, or silent fallback is permitted.

## Rules

Do NOT:
- substitute the fonts
- approximate the fonts
- replace them with "similar" fonts
- use a different Google Font
- silently fall back to a different display font
- choose fonts based on personal preference

Do NOT use:
- Inter
- Poppins
- Montserrat
- Manrope
- DM Sans
- or other generic startup/UI fonts as replacements.

The typography should preserve the exact visual character of the provided reference.

The display typography should feel:
- bold
- heavy
- editorial
- premium
- large-scale
- tightly composed
- confident

Typography should be treated as a major visual element rather than ordinary UI text.

If the exact selected font files or font names are unavailable, STOP and ask the user for them.

Never silently substitute a font.

---

# 5. VISUAL ART DIRECTION

The primary visual reference is the Heritage Coffee reference supplied by the user.

Use the reference for:
- visual language
- composition
- typography scale
- café branding
- image treatment
- navigation style
- spacing
- hierarchy
- editorial composition
- premium coffee atmosphere

DO NOT copy the reference website.

The final product must clearly be Syntax & Sip.

The reference is an art-direction reference, not a template.

---

# 6. BRAND PERSONALITY

Syntax & Sip should feel:

- premium
- warm
- intelligent
- youthful
- editorial
- sophisticated
- focused
- calm
- human-designed
- slightly experimental

It should communicate:

"A café designed around the way you work."

The product should feel like a place where someone genuinely wants to spend several hours working.

---

# 7. COLOR SYSTEM

Use the following core palette.

Espresso:
#1D0804

Deep Coffee:
#592F1D

Roasted Brown:
#734830

Warm Clay:
#926347

Caramel:
#D1B39C

Cream:
#E9E6E3

Soft Beige:
#F3E9DF

Dark Text:
#1D0804

Use the palette intentionally.

Do not introduce random colors.

A very restrained muted olive/lime accent may be used only when necessary for states or small functional accents.

Avoid:
- purple/blue gradients
- neon colors
- cyberpunk colors
- random bright accents
- excessive multicolor UI

---

# 8. DESIGN LANGUAGE

Favor:

- oversized typography
- strong editorial hierarchy
- cinematic coffee photography
- warm neutral surfaces
- asymmetrical layouts
- generous whitespace
- restrained rounded corners
- dark translucent navigation elements
- large visual sections
- premium café imagery
- subtle borders
- carefully controlled contrast
- intentional composition

Avoid generic AI-generated design patterns.

DO NOT create:
- generic SaaS dashboards
- excessive glassmorphism
- excessive rounded cards
- repetitive card grids
- giant generic centered hero sections
- purple/blue gradient backgrounds
- floating random blobs
- cartoon illustrations
- fake 3D objects
- random particles
- excessive shadows
- excessive animations
- cyberpunk styling
- generic startup copy
- stock-looking illustrations

The site should look designed by a human designer with strong editorial taste.

---

# 9. NAVIGATION

The primary navigation should feel similar in spirit to the supplied café reference.

Brand:

SYNTAX & SIP

Primary navigation:

SPACE
FUEL
SQUAD
STORY

Primary CTA:

BOOK A DESK

The navigation should be compact, premium, and visually integrated into the hero rather than looking like a generic SaaS navbar.

---

# 10. HOMEPAGE DIRECTION

The homepage should feel like a premium café campaign website.

Hero direction:

Large photographic coffee/workspace composition.

Possible headline direction:

FIND YOUR CORNER.

or

COFFEE FOR YOUR FOCUS.

Supporting message:

A café designed around the way you work.

Primary CTA:

BOOK A DESK

Secondary CTA:

BUILD YOUR SIP

The hero should visually communicate:
- coffee
- workspace
- focus
- atmosphere
- technology
- community

without looking like a technology company landing page.

---

# 11. PRODUCT JOURNEY

The site should communicate a simple journey:

FIND YOUR SPACE
→
BUILD YOUR SIP
→
STUDY TOGETHER

This can become a major editorial section on the homepage.

Each step should lead naturally into the corresponding product feature.

---

# 12. HOME PAGE SECTIONS

The homepage should include:

1. Premium hero
2. Short brand/product introduction
3. Space / Telemetry preview
4. Fuel Builder preview
5. Squad / Group Study preview
6. Editorial café story section
7. Final CTA

Do not turn every section into identical cards.

Use different compositions and visual rhythms.

---

# 13. SPACE PAGE

The Space page should prioritize the interactive floor map.

Suggested structure:

- page introduction
- filter controls
- café floor map
- seat states
- selected seat details
- telemetry metrics
- booking action

The floor map should be visually interesting and understandable.

Use SVG or CSS-based shapes where appropriate.

Do not use a generic analytics dashboard layout.

---

# 14. FUEL PAGE

The Fuel page should feel like a coffee laboratory.

Suggested structure:

- introduction
- drink base selection
- milk selection
- sweetness
- syrups
- extras
- dynamic drink visual
- live nutritional/price metrics
- final selection

Changes should update immediately.

Avoid making the interface look like a shopping cart.

---

# 15. SQUAD PAGE

The Squad page should feel collaborative.

Include:

- create session
- join session
- members
- member orders
- optional seats
- group total
- split by order
- equal split
- custom split

Use local state.

Make the interaction easy to understand.

---

# 16. SESSION / CHECKOUT

A lightweight session summary can combine:

- selected seat
- selected drink
- squad members
- individual orders
- bill split
- final total

This is a frontend simulation.

Do not introduce a real payment system.

---

# 17. DATA

Use local data files for:

- seats
- ingredients
- drinks
- squad/session examples

Prefer clean JavaScript objects/arrays.

Example conceptual structure:

src/
  data/
    seats.js
    ingredients.js
    drinks.js
    squad.js

Keep data separate from presentation components.

---

# 18. COMPONENT STRUCTURE

Prefer reusable components such as:

src/
  components/
    Navbar
    Button
    SeatMap
    Seat
    SeatDetails
    TelemetryMetric
    FuelBuilder
    IngredientOption
    DrinkVisual
    SquadMember
    BillSplitter
    Footer

  pages/
    Home
    Space
    Fuel
    Squad
    Checkout
    Story

  data/
    seats
    ingredients
    drinks
    squad

  styles/
    variables
    global
    navbar
    home
    space
    fuel
    squad
    checkout
    story

This structure can evolve if the implementation gives a strong reason to change it.

Do not create unnecessary files.

---

# 19. STATE AND STORAGE

Use React state for active interactions.

Use LocalStorage for persistence of relevant user choices, such as:

- selected seat
- selected drink
- current order
- squad/session

Do not add a backend.

---

# 20. RESPONSIVE DESIGN

The website must work on:

- desktop
- laptop
- tablet
- mobile

Desktop is the primary art direction.

On smaller screens:
- preserve typography hierarchy
- maintain visual quality
- stack layouts intelligently
- keep interactions usable
- avoid simply shrinking desktop layouts

The floor map and Fuel Builder must remain usable on mobile.

---

# 21. ANIMATION

Animation should be restrained.

Use motion only when it improves:
- navigation
- feedback
- transitions
- selection states
- seat interactions
- builder changes

Avoid:
- constant movement
- excessive parallax
- spinning objects
- distracting particle effects
- animation everywhere

Premium design should feel calm.

---

# 22. DEVELOPMENT PROCESS

Do NOT build the entire application in one autonomous step.

Build in controlled phases.

PHASE 1:
Brand system + global styles + navbar + homepage hero

PHASE 2:
Homepage supporting sections

PHASE 3:
Space / Telemetry

PHASE 4:
Fuel Builder

PHASE 5:
Squad / Group Study

PHASE 6:
Checkout / Session Summary

PHASE 7:
Responsive refinement

PHASE 8:
Micro-interactions and final polish

After each phase:
1. inspect the existing implementation
2. explain what will change
3. implement only that phase
4. test the result
5. report changed files
6. STOP and wait for user review

Never silently continue into the next phase.

---

# 23. IMPORTANT AI BEHAVIOR

Do not make design decisions that contradict this steering file.

If an important design decision is ambiguous:
- ask the user
- do not invent a generic solution

If the exact fonts are unavailable:
- STOP
- ask the user
- do not substitute

If a feature can be implemented simply with React state and local data:
- prefer that approach

Do not introduce technologies merely because they are popular.

The goal is a polished, understandable college project.

---

# 24. CODE QUALITY

Prefer:

- semantic HTML
- reusable React components
- clear component names
- simple state management
- readable CSS
- CSS variables for design tokens
- accessible buttons and controls
- meaningful alt text
- keyboard-friendly interactive elements where practical

Avoid:

- huge monolithic components
- duplicated code
- unnecessary dependencies
- unreadable generated code
- unexplained abstractions
- unnecessary libraries

---

# 25. FINAL DESIGN PRINCIPLE

Syntax & Sip should feel like:

A beautifully designed independent café brand
+
A smart workspace
+
A thoughtful digital product.

It should NOT feel like:

A SaaS dashboard pretending to be a café.