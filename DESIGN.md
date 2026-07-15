---
name: Timeless Visuals
description: Calm, editorial design system for an events photography & videography studio — cream surfaces, charcoal ink, brass foil accents.
colors:
  brass-foil: "#a9743f"
  brass-deep: "#8a5a2b"
  brushed-brass: "#c79a64"
  linen-cream: "#faf7f1"
  album-white: "#ffffff"
  pressed-sand: "#f1ebe1"
  charcoal-ink: "#1b1916"
  soft-ink: "#4b4740"
  faded-caption: "#8b857a"
  deep-caption: "#6b665e"
  deckle-line: "#e7e0d4"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, 'Times New Roman', serif"
    fontSize: "3rem–4.5rem (text-5xl → md:text-7xl)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.875rem–2.75rem (text-3xl → md:2.75rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem–1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    letterSpacing: "0.28em"
rounded:
  xl: "1.25rem"
  2xl: "1rem"
  full: "9999px"
spacing:
  section-y: "5rem (sm: 7rem)"
  container-x: "1.5rem (sm: 2rem)"
  container-max: "72rem"
  card-pad: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.charcoal-ink}"
    textColor: "{colors.linen-cream}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-brass:
    backgroundColor: "{colors.brass-foil}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  input:
    backgroundColor: "{colors.album-white}"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
  badge-neutral:
    backgroundColor: "{colors.album-white}"
    textColor: "{colors.soft-ink}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  badge-ink:
    backgroundColor: "{colors.charcoal-ink}"
    textColor: "{colors.linen-cream}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.linen-cream}"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.card-pad}"
---

# Design System: Timeless Visuals

## 1. Overview

**Creative North Star: "The Heirloom Album"**

Every screen is a spread in a hand-bound wedding album: linen-cream pages, brass foil stamping, serif captions set with care. The system's job is to feel *kept*, not scrolled past — unhurried, refined, and quiet enough that the photography supplies all the drama. Chrome recedes; the work is the subject. This is a studio presenting its way of seeing, and the site's own craft is the first proof of that eye.

The system explicitly rejects the four failure modes named in PRODUCT.md: the **generic template look** (interchangeable agency sections, icon grids), the **cheesy wedding-vendor** aesthetic (script fonts, rose gold, hearts), **dark moody luxury** (near-black + gold exclusivity), and anything **trendy / maximalist** that will date. Timelessness is the brand promise, so the system optimizes for how it will look in twenty years, not twenty weeks.

Density is low and pacing is deliberate: one dominant idea per fold, generous section spacing (5–7rem vertical), a 72rem content column, and photography given full-bleed or near-full-bleed room whenever it appears.

**Key Characteristics:**
- Warm paper-and-ink neutrals; brass used like foil stamping — rare and precise
- Serif display (Playfair Display) for voice, quiet sans (Inter) for everything functional
- Pill-shaped interactive elements against soft-rectangle content frames
- Flat at rest; soft ambient shadow only as interaction feedback
- Motion is a slow exhale: soft fades, gentle rises, one cinematic ken-burns zoom

## 2. Colors: The Album Palette

A restrained paper-and-ink palette where photography carries the color; the UI supplies warmth and one metallic voice.

### Primary
- **Brass Foil** (#a9743f): The single accent. Used like foil stamping on an album cover: the italicized word in a display heading, active nav states, checkmarks, focus rings, the required-field asterisk, and the occasional filled `brass` button. Its rarity is its value. **Never for small text** — it sits at 3.7:1 on cream.
- **Deep Brass** (#8a5a2b): The text-safe brass step (5.5:1 on cream, 5.9:1 on white). Eyebrows, kicker dashes, step numbers, and any brass-colored type below large-text size use this, so the foil voice survives at caption scale without breaking AA.
- **Brushed Brass** (#c79a64): The soft echo of Brass Foil — ambient glows (hero backdrop blur), hover borders at 40% opacity, tinted badge fills at 10%.

### Neutral
- **Linen Cream** (#faf7f1): The body background — the album's page stock. Also the text color on ink-filled elements.
- **Album White** (#ffffff): Raised surfaces: alternating sections, form controls, cards that must read as "on top of" the cream page.
- **Pressed Sand** (#f1ebe1): The deepest background tint, for panels that need to recede below cream.
- **Charcoal Ink** (#1b1916): Primary text and dark fills (primary buttons, icon plates). Warm near-black, never pure #000.
- **Soft Ink** (#4b4740): Secondary text — leads, descriptions, feature lists. The workhorse body color (8.5:1 on cream).
- **Faded Caption** (#8b857a): Decorative traces only (inactive dots, disabled states). **At 3.4:1 on cream it fails AA for small text** — readable metadata uses Deep Caption instead.
- **Deep Caption** (#6b665e): The readable metadata gray (5.2:1 on cream, 5.6:1 on white). Trust rows, legal lines, testimonial roles, placeholders, and feature lists — quiet without failing AA.
- **Deckle Line** (#e7e0d4): Hairline borders and dividers — the only edge treatment surfaces get at rest.

### Named Rules
**The Foil Stamp Rule.** Brass appears on well under 10% of any screen, applied with the precision of foil stamping: one italic word, one icon, one ring. If brass starts covering areas instead of details, it has stopped being foil.

**The Photograph Owns the Color Rule.** The UI palette stays paper-quiet because the photography supplies the color. No new saturated hues enter the system; if a screen feels colorless, the fix is imagery, never chrome.

## 3. Typography

**Display Font:** Playfair Display (with Georgia, "Times New Roman" fallback)
**Body Font:** Inter (with ui-sans-serif, system-ui fallback)

**Character:** A classic editorial pairing — a high-contrast transitional serif that reads like an album caption plate, over a self-effacing sans that handles the functional text without personality competition. The serif speaks; the sans serves.

### Hierarchy
- **Display** (500, clamp-equivalent 3rem → 4.5rem via text-5xl/sm:text-6xl/md:text-7xl, line-height 1.03, -0.01em): Hero headlines only. May carry a single brass italic word (see rule below).
- **Headline** (500, 1.875rem → 2.75rem, tight leading): Section headings, always paired with `text-balance`.
- **Title** (500, 1.25rem): Card and article headings.
- **Body** (400, 0.875–1.125rem, line-height 1.625): Leads use Soft Ink at 1rem–1.125rem; supporting copy at 0.875rem. Keep measure ≤ 65–75ch (`max-w-xl` / `max-w-2xl` on prose blocks).
- **Label** (600, 0.72rem, 0.28em tracking, uppercase, Deep Brass): The `.eyebrow` kicker, always rendered as hairline dash + label (dash both sides when centered). Field labels use the quieter variant: 0.75rem, 0.14em tracking, Soft Ink. Two auxiliary ramp steps exist as tokens: `2xs` (0.625rem, logo descriptor) and `headline` (2.75rem, section headings at md+).

### Named Rules
**The One Italic Rule.** A display heading earns at most one italicized, brass-colored word — the emotional pivot ("memories"). Two makes it a costume.

**The Eyebrow Is the Signature Rule.** The brass tracked-caps eyebrow is this brand's one sanctioned kicker format. Use it as designed (hairline dash + label, Deep Brass) or not at all; never invent a second kicker style. Budget: at most 3 per page — it orients (Hero, Selected work, How it works), it does not scaffold every section.

## 4. Elevation

Flat at rest, lift on touch. Surfaces at rest are separated by Deckle Line hairline borders and background tint steps (Pressed Sand → Linen Cream → Album White), not by shadows. The two soft, large-blur shadows exist as *responses*: a card lifts (`hover:-translate-y-1` + shadow-card) when it becomes interactive, a primary button carries shadow-card because it is the page's one standing invitation.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 12px 40px -24px rgba(27, 25, 22, 0.28)`): Hover state for interactive cards; resting state for primary/brass buttons.
- **Soft plate** (`box-shadow: 0 18px 50px -28px rgba(27, 25, 22, 0.35)`): Reserved for large floating imagery or hero plates that must separate from the page.

### Named Rules
**The Flat-at-Rest Rule.** Depth is interaction feedback, never decoration. If a static, non-interactive element has a shadow, remove it.

## 5. Components

Refined and restrained: pill buttons, hairline borders, quiet hovers. Nothing raises its voice.

### Buttons
- **Shape:** Full pill (9999px radius), medium weight, wide tracking.
- **Primary:** Charcoal Ink fill, Linen Cream text, shadow-card at rest; hover eases to 90% opacity. Padding 12px 24px (md), 16px 32px (lg).
- **Brass:** Brass Foil fill, white text — reserved for the single most important CTA on a screen, at most one per view.
- **Outline:** 1px Charcoal Ink border at 25% opacity; hover inverts to full ink fill with cream text — the system's most theatrical state change.
- **Ghost:** Bare ink text; hover shifts to brass.
- **Focus:** 2px Brass Foil ring at 50% opacity, offset 2px against cream. All variants.

### Chips / Badges
- **Style:** Full pill, 1px border, 0.75rem medium text, padding 4px 12px.
- **Tones:** `neutral` (white fill, Deckle border, Soft Ink text), `brass` (10% brass fill, 30% brass border, brass text), `ink` (solid ink fill, cream text).

### Cards / Containers
- **Corner Style:** Soft rectangle (1rem, rounded-2xl) — content frames stay rectangular so pills read as interactive.
- **Background:** Linen Cream at 60% over Album White sections, or Album White over cream.
- **Shadow Strategy:** None at rest (see Elevation); hover lifts 4px with Card lift shadow and a 40% brass border.
- **Border:** 1px Deckle Line, always.
- **Internal Padding:** 1.5rem.

### Inputs / Fields
- **Style:** Album White fill, 1px Deckle Line border, 1.25rem radius (rounded-xl — note this project's xl token is 1.25rem, larger than 2xl's 1rem), padding 12px 16px, small shadow.
- **Focus:** Border shifts to Brass Foil + 2px brass ring at 20% opacity. No outline.
- **Label:** 0.75rem caps, 0.14em tracking, Soft Ink; required marker in brass.
- **Error:** 0.75rem medium red-600 message below; **Hint:** same size in Faded Caption.

### Navigation
- **Style:** Sticky, transparent over the hero; after 8px of scroll it gains a cream 85% backdrop-blur and a Deckle bottom border.
- **Links:** 0.875rem medium Inter; Soft Ink → Ink on hover with an animated 1px underline growing left-to-right; active route holds Brass Foil.
- **Logo:** Ink circle plate with aperture mark (hover: brass) + serif wordmark over a micro-tracked caps descriptor.
- **Mobile:** Full-width panel sliding under the bar; links jump to display-serif 1.5rem scale.

### Reveal (signature motion primitive)
Every section enters through `<Reveal>`: fade + 26px rise, 0.7s, cubic-bezier(0.22, 1, 0.36, 1), triggered once at -80px viewport margin, with optional 0.05–0.07s stagger between siblings. The hero image carries the one cinematic flourish: an 18s ken-burns zoom (scale 1.05 → 1.16). A global `prefers-reduced-motion` rule collapses all animation to near-instant.

## 6. Do's and Don'ts

### Do:
- **Do** let photography carry every screen's visual weight — full-bleed or generously framed imagery, with chrome in paper neutrals around it.
- **Do** apply brass like foil stamping: one italic display word, icons, rings, and rare filled CTAs — under 10% of any screen.
- **Do** use Soft Ink (#4b4740) for any text that must actually be read; it clears AA at 8.5:1 on cream.
- **Do** keep interactive elements pill-shaped and content frames soft-rectangled — the shape contrast is the affordance system.
- **Do** give every animation its reduced-motion collapse (the global rule exists; don't bypass it with JS-driven motion).
- **Do** write alt text in the brand voice: "Couple sharing a first dance" beats "wedding photo".

### Don't:
- **Don't** drift into the **generic template look** — interchangeable icon grids, stock section rhythms, could-be-anyone layouts (PRODUCT.md anti-reference #1).
- **Don't** touch **cheesy wedding-vendor** moves: script fonts, rose gold, heart motifs, sentimental clip-art (anti-reference #2).
- **Don't** slide into **dark moody luxury**: no near-black page backgrounds, no gold-on-black exclusivity (anti-reference #3). Ink is for text and small fills, never for whole viewports.
- **Don't** adopt **trendy / maximalist** effects — loud gradients, oversized type experiments, brutalist or acid aesthetics (anti-reference #4). If it would date a printed album, it dates this site.
- **Don't** set small text in Faded Caption (#8b857a) or Brass Foil (#a9743f) — both fail 4.5:1 on cream. The AA-safe steps exist for exactly this: Deep Caption (#6b665e) for metadata, Deep Brass (#8a5a2b) for brass-voiced labels.
- **Don't** add shadows to static elements, borders thicker than 1px, or a second accent hue. One foil, one line weight, flat at rest.
- **Don't** exceed one brass-filled button per view or one italic word per heading. Rarity is the entire mechanism.
