---
name: Velvet Terroir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d5c3b8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9e8e84'
  outline-variant: '#51443c'
  surface-tint: '#f4bb92'
  primary: '#f4bb92'
  on-primary: '#4a280a'
  primary-container: '#8b5e3c'
  on-primary-container: '#ffe3d1'
  inverse-primary: '#805533'
  secondary: '#fab983'
  on-secondary: '#4d2700'
  secondary-container: '#6b3e13'
  on-secondary-container: '#ebab76'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#696868'
  on-tertiary-container: '#ebe8e7'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcc5'
  primary-fixed-dim: '#f4bb92'
  on-primary-fixed: '#301400'
  on-primary-fixed-variant: '#653d1e'
  secondary-fixed: '#ffdcc2'
  secondary-fixed-dim: '#fab983'
  on-secondary-fixed: '#2e1500'
  on-secondary-fixed-variant: '#683c11'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system establishes an ultra-premium, intimate specialty coffee atmosphere reminiscent of high-end private tasting salons and bespoke artisanal roasteries. The aesthetic pairs rich dark roast tonalities with glowing amber accents, communicating scarcity, lineage, and precise craft. 

The design language balances editorial elegance with contemporary spatial discipline. It avoids cluttered e-commerce paradigms in favor of generous breathing room, razor-sharp alignment, and soft luminous depth. Micro-interactions should feel weighted and deliberate, invoking the ritualistic nature of slow extraction, single-origin sourcing, and rare estate lots.

## Colors
The default color environment is immersive dark mode, anchoring product imagery against deep, low-luminance surfaces that let golden-amber highlights and rich coffee tones emerge naturally.

- **Primary (`#8B5E3C`)**: Muted, roasted espresso brown used for high-order interactive anchors, primary selection indicators, and warm tonal foundations.
- **Secondary (`#C68B59`)**: Radiant amber-caramel gold deployed for selective accents, call-to-action hover states, roast profile badges, tasting note highlights, and subtle atmospheric glows.
- **Surface & Elevation**:
  - Deep Canvas: `#121212`
  - Elevated Surface: `#1C1C1C`
  - Card & Container: `#252525`
- **Structural Dividers & Outlines**: `#383838` provides low-attenuation structure without visually cutting up the canvas.
- **Typography Scale**:
  - Primary Text: `#FFFFFF` (100% optical clarity for headlines and pricing)
  - Secondary Text: `#BDBDBD` (subdued for metadata, estate regions, cupping notes)

### Light Mode Alternate
When light mode is requested, invert into an artisanal linen profile: Canvas `#F8F5F0`, Cards `#FFFFFF`, Primary Typography `#2B1B14`, Borders `#E6DFD5`, with `#8B5E3C` retained as the lead accent.

## Typography
The system builds contrast through a deliberate pairing of two distinct typographic disciplines:

1. **Editorial Serif (`Playfair Display`)**: Used exclusively for hero narratives, product names, collection titles, and cupping score highlights. Its delicate high-contrast strokes express the legacy and connoisseurship of rare beans.
2. **Modern Geometric Sans-Serif (`Plus Jakarta Sans`)**: Delivers clear readability across specs, origin elevations, processing types (washed, natural, anaerobic), pricing, and interactive controls.

Label tokens (`label-md`, `label-sm`) should be rendered uppercase with expanded letter-spacing (`0.06em` to `0.08em`) to mimic premium apothecary and dry-goods packaging labels.

## Layout & Spacing
The layout model employs a fluid 12-column grid on desktop screens, transitioning to an 8-column structure on tablet devices, and a 4-column stack on mobile. 

Spacious margins (`3rem` on desktop) guarantee that luxury products are never crowded. Content max-width caps at `1320px` to maintain optimal eye travel across high-resolution displays. Structural sections (e.g., origin showcases, curated auctions) rely on vertical spacing multiples of `space-xl` (`2.5rem` to `5rem`) to create an unhurried, editorial pacing. Component padding relies on `space-md` for compact elements and `space-lg` for expansive product cards.

## Elevation & Depth
Depth in this system avoids heavy, synthetic drop shadows, relying instead on surface tonality and light refraction:

- **Layer Stacking**: Base canvas sits at `#121212`. Primary cards and structural shelves sit on elevated surface levels (`#1C1C1C` to `#252525`).
- **Glassmorphism Overlays**: Floating navigation bars, filter menus, and modal drawers utilize background blurs (`backdrop-filter: blur(16px)`) with semi-transparent surfaces (`rgba(28, 28, 28, 0.72)`) bordered by a `1px` stroke of `rgba(255, 255, 255, 0.08)`.
- **Amber Luminescence**: On hover states and active focus triggers, interactive items emit a subtle warm amber bloom rather than a dark shadow: `box-shadow: 0 0 24px -4px rgba(198, 139, 89, 0.22)`.
- **Card Separation**: Cards maintain edge precision via hairline borders (`1px solid #383838`), keeping boundaries clean without muddy shadow spread.

## Shapes
A refined pill-shaped philosophy defines the interactive vocabulary, providing an organic, tactile contrast to the crisp, rectangular grid of media showcases.

- **Primary Interactive Elements**: Buttons, search pills, filter selectors, and origin category toggles utilize complete pill curvature (`9999px` / `rounded-full`).
- **Cards & Displays**: Product cards, sensory radar profiles, and media showcases take `rounded-xl` (`1.5rem` to `2rem`) corners, softening large photographic footprints.
- **Badges & Cupping Tags**: Compact pills with fixed internal paddings to emphasize small lot identifiers, SCA scores, and roast depth.

## Components

### Buttons
- **Primary Action**: Pill silhouette, background in Primary Coffee Brown (`#8B5E3C`), text in White (`#FFFFFF`). On hover, background shifts seamlessly toward Warm Caramel (`#C68B59`) paired with the signature amber glow (`0 0 20px rgba(198, 139, 89, 0.25)`).
- **Secondary Action**: Pill silhouette, transparent background, outlined in `1px solid #383838`. Text in `#FFFFFF`. Hover promotes the border to `#C68B59` with an internal tint of `rgba(198, 139, 89, 0.08)`.
- **Pill Icon Actions**: Circular containers (`44px x 44px`) housing minimal iconography for quick-actions (e.g., tasting bookmark, favorite lot).

### Badges & Terroir Chips
- **Roast Profile & Varietal Badges**: Ultra-slim pill tags with uppercase labels (`label-sm`). Background set to `rgba(255, 255, 255, 0.05)`, border `1px solid rgba(255, 255, 255, 0.12)`, text `#BDBDBD`.
- **SCA Quality Score Chip**: Dedicated highlight badge featuring an accent fill of `rgba(198, 139, 89, 0.15)`, text `#C68B59`, and border `1px solid #C68B59`.

### Product Cards
- Built on Container `#252525` with a `1px solid #383838` edge and `rounded-xl` shape.
- Media container displays packaging or raw bean lots against a rich studio background with a gentle radial gradient.
- Information layout: Origin & Varietal (e.g., *Yirgacheffe • Heirloom*) rendered in `label-md` uppercase `#C68B59`, Title in `Playfair Display` (`headline-sm`), Cupping notes in `body-md` muted text, finished with price and a quick-add pill trigger.
- Hover interaction triggers a subtle `scale(1.015)` shift alongside the signature caramel rim glow.

### Form Inputs & Selectors
- Search and quantity selectors sit on `#1C1C1C` with `1px solid #383838`.
- Focus shifts border color to `#C68B59` with zero harsh outlines. Text is crisp white with placeholder typography in `#757575`.

### Cupping & Tasting Note Spectrum
- Dedicated visual tags representing aroma and flavor notes (e.g., *Bergamot*, *Dark Chocolate*, *Jasmine*) styled as soft-pill micro-chips, allowing enthusiasts to parse sensory notes quickly.