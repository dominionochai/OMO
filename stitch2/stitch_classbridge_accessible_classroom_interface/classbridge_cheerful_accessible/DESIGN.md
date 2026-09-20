---
name: ClassBridge Cheerful Accessible
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 58px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 38px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  body-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 36px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  label-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2.25rem
  space-xl: 3.5rem
---

## Brand & Style

This design system is crafted for inclusive, joyous, and barrier-free classroom participation. The emotional tone is reassuring, celebratory, energetic, and radically welcoming. It balances the playful delight of children's learning software with the rock-solid clarity required by specialized assistive technologies (such as eye-gaze tracking, switch access, high-legibility screen magnification, and Deaf/Hard-of-Hearing visual feedback loops).

The design ethos merges **Tactile Toybox Ergonomics** with **Hyper-Readable Minimalism**:
- **Generous hit targets and exaggerated affordances**: Everything feels tangible, friendly, and invites interaction without fear of error.
- **Cognitive clarity**: Zero technical jargon, absence of visual clutter, and strict elimination of dense data grids or complex modal layers.
- **Multi-sensory cues**: High-contrast borders, purposeful color coding, and bounce feedback replace subtle micro-interactions that otherwise exclude students with motor or visual differences.

## Colors

The palette is engineered to surpass WCAG 2.2 AAA contrast standards while sustaining a sunny, non-clinical classroom ambiance.

### Primary Palette & Deaf View
- **Primary Sky Blue (`#0284C7`)**: The foundational anchor. Radiates calm reassurance and clear communication.
- **Secondary Sunny Amber (`#F59E0B`)**: High-salience visual alerts, active focus anchors, and celebratory progress indicators.
- **Tertiary Meadow Green (`#10B981`)**: Positive reinforcement, success actions, and confirmation states.
- **Neutral Deep Ink (`#0F172A`)**: Saturated dark slate, ensuring maximum legibility on light surfaces without the harsh glare of pure `#000000`.

### Sensory Viewport Palettes
- **Deaf / Hard-of-Hearing View**: Uses soft atmospheric tinted backgrounds (`#F0F9FF`) paired with crisp white card containers (`#FFFFFF`), solid `#0284C7` outlines, and rich amber (`#F59E0B`) flash notifications for auditory cues (doorbells, teacher prompts, speech-to-text live indicators).
- **Eye-Control / Switch Access View**: Introduces distinct spatial color anchors across the screen quadrants to prevent gaze confusion:
  - North / Primary Action: Bright Jade (`#10B981`)
  - East / Quick Chat: Vivid Tangerine (`#F97316`)
  - South / Navigation: Royal Purple (`#8B5CF6`)
  - West / Help & Teacher: Warm Rose (`#F43F5E`)
  - Central Focus: Electric Teal (`#06B6D4`)

All interactable borders maintain a minimum contrast ratio of 4.5:1 against the canvas, and text retains at least 7:1 contrast on its respective card container.

## Typography

Typography prioritizes immediate legibility, high character distinction, and dyslexic-friendly geometry. **Plus Jakarta Sans** provides open counters, tall x-height, distinct letterforms, and warm, rounded structural terminals.

### Rules of Engagement
- **Strict Size Floor**: Never render text smaller than `18px` (`body-md`). Captions, labels, tooltips, and secondary context must remain at or above this threshold.
- **Font Weight Distribution**: Weights default to `600` (SemiBold) for body copy and `700`–`800` (Bold to ExtraBold) for titles and labels. Feather-light or thin weights are completely prohibited.
- **Line Heights**: Kept loose (1.4x - 1.6x) to allow children and visual tracking users to read smoothly without visual crowding or line-jumping.
- **Case**: Avoid continuous uppercase strings; sentence case and title case maintain recognizable word shape profiles.

## Layout & Spacing

The layout uses a **Chunky Fluid Grid** prioritizing visual predictability, spatial isolation of controls, and substantial dwell zones for eye-tracking cameras.

### Spatial Structure
- **Desktop & Interactive Displays (1024px+)**: 8-column wide grid, maximum page container of 1440px to keep edges within normal neck/eye rotation fields. Section gutters sit at `1.5rem` (`24px`), with outer canvas padding at `2rem` (`32px`).
- **Tablets & Large Assistive Mounts (768px - 1023px)**: 4-column balanced grid, margins scale down to `1.5rem` (`24px`).
- **Mobile Handheld (320px - 767px)**: 2-column or single-column stacked view with full-width cards, gutters at `1rem` (`16px`).

### Assistive Spatial Guardrails
- **Minimum Target Spacing**: Interactive targets require at least `16px` (`space-sm`) of clean buffer space around their active bounding box to eliminate accidental gaze or physical tap collisions.
- **Thumb and Gaze Anchors**: Primary triggers always dock towards the lower-middle or four persistent screen quadrants rather than floating in arbitrary locations.

## Elevation & Depth

This system intentionally rejects hazy, realistic drop shadows in favor of **Tactile Comic Layering** and **Dual-Tone Chunky Surfaces**:

- **Physical Push Shadow**: Interactive cards and buttons use a flat offset shadow (`0px 6px 0px rgba(15, 23, 42, 0.12)`) paired with a crisp `3px` solid stroke (`#E2E8F0` or matching brand color).
- **Pressed State**: On active press or completed gaze dwell, elements translate down by `4px` (`transform: translateY(4px)`) while the offset shadow collapses to `0px 2px 0px`, delivering an intuitive, toy-like mechanical click.
- **Gaze / Dwell Hover**: When an eye gaze hovers over an element, an outer, glowing ring expands (`0 0 0 6px #F59E0B`) with an internal progress fill indicator that visibly loads over 800ms.
- **Layer Stacking**: Modals and full-screen communication drawers slide up as thick, opaque white panels (`#FFFFFF`) with a `4px` outline in `#0F172A` resting over a `40%` dim sky overlay (`#0284C7` at 20% opacity + backdrop blur of `4px`).

## Shapes

The geometry of this design system is exuberantly pill-shaped, bulbous, and rounded:
- **Buttons and Chips**: Pure pill shapes (`border-radius: 9999px`) provide safe, friendly, and welcoming interactive silhouettes.
- **Cards and Display Surfacing**: Use ultra-soft curves (`2rem` / `32px` to `3rem` / `48px`), eliminating sharp apexes that feel sterile or intimidating.
- **Selection Triggers & Checkboxes**: Large rounded squares (`1rem` / `16px` radius) to prevent sharp corners while clearly distinguishing choice controls from fully rounded action buttons.
- **Focus Indicators**: Every focus ring follows the underlying curved contours precisely, offset by `4px` to remain distinct.

## Components

### Buttons
- **Touch / Gaze Target**: Minimum dimensions of `72px x 72px` on assistive/eye-tracking modes, and `56px` height on standard classroom touch tablets.
- **Primary Button**: Solid `#0284C7`, text `#FFFFFF`, bold `3px` bottom offset border of `#0369A1`. Text is set in `label-xl` (`24px`).
- **Celebration / Answer Button**: Solid `#F59E0B`, text `#0F172A`, bottom border `#D97706`.
- **States**: Hover brings a scale transform (`1.03x`). Focus displays an offset border (`4px solid #0F172A`). Active state snaps downward by `4px`.

### Cards & Communication Tiles
- **Structure**: High-contrast white background (`#FFFFFF`), `3px` solid `#BAE6FD` stroke, and `32px` corner rounding.
- **Tile Variants**: Eye Control cards include an integrated high-contrast visual icon (minimum `48px x 48px`), followed by a clear, large `body-lg` title. Card interiors feature at least `24px` (`space-md`) internal padding.

### Checkboxes & Radio Controls
- **Size**: Extra-large `40px x 40px` targets.
- **Radio Buttons**: Pill-circular containers with an internal solid `20px` candy dot upon selection.
- **Checkboxes**: Thick `16px` rounded rects with a `4px` white checkmark inside a meadow green (`#10B981`) container when active. Unchecked state features an empty white canvas with a `3px` solid `#94A3B8` border.

### Input Fields & Speech Output Boxes
- **Height**: Minimum `64px` tall with a continuous `3px` outline in `#94A3B8`.
- **Interaction**: On focus, the border turns vibrant sky blue (`#0284C7`) with a soft `4px` amber outer ring.
- **Text**: Inputs default to `body-xl` (`24px`) font sizing with high-contrast `#0F172A` text and `#64748B` placeholder text.

### Chips & Choice Badges
- **Shape**: Pill-shaped with `16px` vertical and `28px` horizontal padding.
- **Appearance**: Soft pastel tint background with a corresponding `2px` dark stroke and `label-lg` font. Designed for rapid word assembly, emotion-sharing, and vocabulary prompt tags.

### Dwell-Time Circular Indicator (Eye-Tracking Specialized)
- **Design**: An animated SVG radial fill ring layered over the active gaze target. Traces in bright sunny amber (`#F59E0B`), completing a 360-degree circuit in an accessible 800ms before triggering the button action, complete with an optional soft chime and visual pop confirmation.