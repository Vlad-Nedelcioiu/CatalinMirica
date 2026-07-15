# Graph Report - CatalinMirica  (2026-07-15)

## Corpus Check
- 53 files · ~20,265 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 343 nodes · 674 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4bab45ef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pages & Home Sections
- Design Docs & Critique
- Admin & Booking API
- Booking Flow UI
- TypeScript Config
- Layout, Gallery & Motion
- Package & Build Tooling
- Runtime Dependencies
- Next.js Config
- PostCSS Config
- 5. Components
- layout.tsx
- Product
- Critique — Timeless Visuals home page (`app/page.tsx`)
- template.tsx
- Timeless Visuals

## God Nodes (most connected - your core abstractions)
1. `cn()` - 43 edges
2. `unsplash()` - 18 edges
3. `Container()` - 16 edges
4. `compilerOptions` - 16 edges
5. `Section()` - 11 edges
6. `buttonClasses()` - 11 edges
7. `formatTime()` - 11 edges
8. `Product` - 11 edges
9. `POST()` - 10 edges
10. `PACKAGES` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Contrast Cautions (--color-muted and --color-brass fail 4.5:1 on cream)` --semantically_similar_to--> `P1: WCAG AA Contrast Failures on Brass and Muted Text`  [INFERRED] [semantically similar]
  CLAUDE.md → .impeccable/critique/2026-07-14T09-32-03Z__app-page-tsx.md
- `Timeless Visuals Favicon Brand Mark` --implements--> `The Heirloom Album (Creative North Star)`  [INFERRED]
  app/icon.svg → DESIGN.md
- `P1: Mobile Hero Grid Empty Holes` --conceptually_related_to--> `Product Purpose: Close Warm Leads via Credibility`  [INFERRED]
  .impeccable/critique/2026-07-14T09-32-03Z__app-page-tsx.md → PRODUCT.md
- `Graphify Query-First Workflow` --conceptually_related_to--> `Timeless Visuals Website`  [INFERRED]
  CLAUDE.md → README.md
- `Design Principle 2: The Site Is Itself the Proof` --rationale_for--> `The Heirloom Album (Creative North Star)`  [INFERRED]
  PRODUCT.md → DESIGN.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **DESIGN.md Named Rules** — design_foil_stamp_rule, design_photograph_owns_the_color_rule, design_one_italic_rule, design_eyebrow_signature_rule, design_flat_at_rest_rule [EXTRACTED 1.00]
- **PRODUCT.md Anti-Reference Set (four banned aesthetics)** — product_generic_template_look, product_cheesy_wedding_vendor, product_dark_moody_luxury, product_trendy_maximalist [EXTRACTED 1.00]
- **WCAG AA Contrast Safety System (commitment, safe color steps, cautions, measured failures)** — product_wcag_2_2_aa_commitment, design_deep_brass, design_deep_caption, claude_contrast_cautions, _impeccable_critique_2026_07_14t09_32_03z__app_page_tsx_p1_wcag_contrast_failures [INFERRED 0.85]
- **Favicon Applies the Heirloom Album Brand Palette** — app_icon_brandmark, app_globals_color_brass, app_globals_color_ink, design_heirloom_album [INFERRED 0.75]

## Communities (16 total, 3 thin omitted)

### Community 0 - "Pages & Home Sections"
Cohesion: 0.12
Nodes (26): metadata, details, metadata, metadata, Accordion(), AboutTeaser(), highlights, CTASection() (+18 more)

### Community 1 - "Design Docs & Critique"
Cohesion: 0.06
Nodes (49): Home Page Design Critique (24/40), P1: Conversion Hierarchy Inverts Documented Strategy, P1: Mobile Hero Grid Empty Holes, P1: Reduced-Motion Promise Not Kept / Opacity-0 Gating, P1: WCAG AA Contrast Failures on Brass and Muted Text, P2: Template Scaffolding (Eyebrow Saturation, Stat Band, Icon-Card Grid), Brass Accent Color Token (#a9743f), Ink Dark Background Color (#1b1916) (+41 more)

### Community 2 - "Admin & Booking API"
Cohesion: 0.11
Nodes (33): AdminPage(), metadata, pkgName(), statusTone, when(), GET(), isDate(), isEmail() (+25 more)

### Community 3 - "Booking Flow UI"
Cohesion: 0.14
Nodes (26): BookingFlow(), initialDetails, isEmail(), STEPS, SummaryRow(), BookingDetails, BookingForm(), Calendar() (+18 more)

### Community 4 - "TypeScript Config"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+19 more)

### Community 5 - "Layout, Gallery & Motion"
Cohesion: 0.15
Nodes (16): aspectFor(), Filter, filters, Gallery(), Lightbox(), Package, PORTFOLIO, PORTFOLIO_CATEGORIES (+8 more)

### Community 6 - "Package & Build Tooling"
Cohesion: 0.08
Nodes (23): description, devDependencies, postcss, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+15 more)

### Community 7 - "Runtime Dependencies"
Cohesion: 0.11
Nodes (19): clsx, date-fns, framer-motion, lucide-react, next, dependencies, clsx, date-fns (+11 more)

### Community 10 - "5. Components"
Cohesion: 0.09
Nodes (22): 1. Overview, 2. Colors: The Album Palette, 3. Typography, 4. Elevation, 5. Components, 6. Do's and Don'ts, Buttons, Cards / Containers (+14 more)

### Community 11 - "layout.tsx"
Cohesion: 0.13
Nodes (16): inter, metadata, playfair, viewport, Footer(), MotionProvider(), links, Navbar() (+8 more)

### Community 12 - "Product"
Cohesion: 0.17
Nodes (11): Accessibility & Inclusion, Anti-references, Brand Personality, Conversion & proof, Design Principles, Platform, Positioning, Product (+3 more)

### Community 13 - "Critique — Timeless Visuals home page (`app/page.tsx`)"
Cohesion: 0.20
Nodes (9): Anti-Patterns Verdict, Critique — Timeless Visuals home page (`app/page.tsx`), Design Health Score, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider (+1 more)

### Community 15 - "Timeless Visuals"
Cohesion: 0.50
Nodes (3): Design Context, graphify, Timeless Visuals

## Knowledge Gaps
- **132 isolated node(s):** `metadata`, `statusTone`, `metadata`, `metadata`, `details` (+127 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Booking Flow UI` to `Pages & Home Sections`, `Admin & Booking API`, `layout.tsx`, `Layout, Gallery & Motion`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Package & Build Tooling`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `metadata`, `statusTone`, `metadata` to the rest of the system?**
  _132 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pages & Home Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.12210915818686402 - nodes in this community are weakly interconnected._
- **Should `Design Docs & Critique` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `Admin & Booking API` be split into smaller, more focused modules?**
  _Cohesion score 0.11282051282051282 - nodes in this community are weakly interconnected._
- **Should `Booking Flow UI` be split into smaller, more focused modules?**
  _Cohesion score 0.14414414414414414 - nodes in this community are weakly interconnected._