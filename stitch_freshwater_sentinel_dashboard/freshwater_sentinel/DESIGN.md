---
name: Freshwater Sentinel
colors:
  surface: '#031712'
  surface-dim: '#031712'
  surface-bright: '#293d37'
  surface-container-lowest: '#00110c'
  surface-container-low: '#0b1f1a'
  surface-container: '#0f231e'
  surface-container-high: '#1a2e28'
  surface-container-highest: '#243932'
  on-surface: '#d0e8de'
  on-surface-variant: '#bec9c4'
  inverse-surface: '#d0e8de'
  inverse-on-surface: '#20342e'
  outline: '#88938e'
  outline-variant: '#3f4945'
  surface-tint: '#86d6be'
  primary: '#86d6be'
  on-primary: '#00382c'
  primary-container: '#4f9f89'
  on-primary-container: '#003026'
  inverse-primary: '#0f6b57'
  secondary: '#ffb68d'
  on-secondary: '#532200'
  secondary-container: '#883d00'
  on-secondary-container: '#ffb68c'
  tertiary: '#efc04c'
  on-tertiary: '#3f2e00'
  tertiary-container: '#b48b16'
  on-tertiary-container: '#372700'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2f2d9'
  primary-fixed-dim: '#86d6be'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#005141'
  secondary-fixed: '#ffdbc9'
  secondary-fixed-dim: '#ffb68d'
  on-secondary-fixed: '#321200'
  on-secondary-fixed-variant: '#763400'
  tertiary-fixed: '#ffdf9b'
  tertiary-fixed-dim: '#efc04c'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5a4300'
  background: '#031712'
  on-background: '#d0e8de'
  surface-variant: '#243932'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 2.5rem
    fontWeight: '400'
    lineHeight: 3rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 1.875rem
    fontWeight: '500'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Newsreader
    fontSize: 1.375rem
    fontWeight: '500'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  telemetry-display:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '400'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.125rem
    letterSpacing: 0.02em
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.08em
  mono-micro:
    fontFamily: JetBrains Mono
    fontSize: 0.625rem
    fontWeight: '400'
    lineHeight: 0.75rem
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.5rem
  margin: 1.5rem
  margin-mobile: 0.75rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system is engineered for scientific environmental intelligence, geospatial risk screening, and hydrological epidemiology in equatorial freshwater systems. Built specifically for field researchers, public health officials, and catchment managers operating in Malawi and the East African Rift basin, it balances instrument-grade precision with the tactile, deliberate gravitas of an archival scientific field ledger.

The aesthetic philosophy rejects consumer software tropes—there are no playful squishy controls, no ethereal glassmorphism blurs, and no synthetic neon highlights. Instead, the visual language draws from cartographic instruments, expedition logbooks, and spectral radiometer readouts. Surfaces feel physical, dark, grounded, and quiet, allowing critical environmental telemetry—chlorophyll-a blooms, turbidity spikes, surface temperatures, and pathogen risk vectors—to read with immediate, unambiguous clarity.

The interface communicates absolute trustworthiness, systematic observation, and field durability. It maintains strict epistemic honesty: uncertain estimates, unverified synthetic passes, and remote models requiring ground-truth soil or water samples are visually marked through explicit structural indicators rather than hidden behind smoothed data visualizations.

## Colors

The palette operates under rigorous semantic constraints informed by limnology and earth-observation science. Pure blacks (`#000000`) and optical whites (`#ffffff`) are strictly barred to prevent visual fatigue during long field shifts and to preserve the organic, parchment-and-water character of the platform. Blue is completely banished from the structural chrome and navigation; it is reserved exclusively for hydrological raster masks and physical water features in cartographic viewports.

### Base & Structural Surfaces
- **Canvas Base (`#0f1e1a`):** Deep basin green-black representing deep bathymetric depths. Acts as the root background layer.
- **Panel Surface (`#16302a`):** Saturated silt-green used for cards, side rails, inspector panels, and HUD blocks.
- **Surface Muted / Hover (`#1d3b34`):** Slightly elevated container tone for row hovers, selected segment backgrounds, and pressed states.
- **Structural Hairline (`#2a453c`):** Precision 1px divider for panel perimeters, tabular separators, and coordinate crosshairs.

### Content & Typography
- **Primary Body Text (`#e8e2d0`):** Warm untreated paper/sand tone providing high contrast without the glare of harsh white.
- **Muted Technical / Meta Text (`#7a9088`):** Desaturated sage/grey used for engineering labels, sensor units, metadata, and grid lines.

### Scientific Accents & Risk Telemetry
- **Primary Accent (`#3f8f7a`):** Living water-green; used for active tab indicators, calibrated telemetry readings, and nominal baseline statuses.
- **Secondary Accent (`#d97b3f`):** Earth ochre/clay; indicates human settlement zones, catchment runoffs, ground sampling points, and terrestrial context.
- **Telemetry Caution (`#e0b23f`):** Algae bloom yellow-amber; flags sensor confidence decay, borderline turbidity thresholds, or impending risk.
- **Telemetry Danger / Anomaly (`#c94f4f`):** Warm brick red; denotes acute biological hazard, pathogen risk vectors, or critical parameter breakdown.

## Typography

The typographic hierarchy orchestrates three distinct tonal layers: academic narrative authority (`Newsreader`), functional operational clarity (`IBM Plex Sans`), and raw instrument verification (`JetBrains Mono`).

### Expressive & Telemetric Serif (`Newsreader`)
Used for primary basin names, field report titles, executive synopsis headers, and prominent numerical telemetry values (such as index readings, trophic scores, and lake surface levels). The italic variant is deployed selectively for regional vernacular, water body classifications, and historical expedition annotations.

### Functional Structural Sans (`IBM Plex Sans`)
Carries all user interface copy, navigation, configuration controls, long-form environmental assessments, and contextual explanations. Set at solid line-heights to guarantee instant legibility under direct sunlight or rugged field tablets.

### Instrument Monospace (`JetBrains Mono`)
The analytical spine of the system. Every latitude/longitude coordinate pair, UTC epoch stamp, multispectral Sentinel-2 band identifier (e.g., `B03`, `B08`), pixel sensor calibration score, and sensor hash must be set in monospace with tabular figures enabled. Labels and data units render uppercase with extended tracking for instant metric parsing.

## Layout & Spacing

Layouts follow a high-density, multi-panel instrument philosophy suited for spatial monitoring and multi-parameter telemetry analysis. The viewport prioritizes uninterrupted cartographic visual fields flanked by analytical telemetry inspectors.

### Grid & Layout Geometry
- **Primary Grid:** 12-column variable grid on desktop screens (`>1280px`), collapsible into an asymmetric split-pane (Map Viewport: 8 cols, Analysis Drawer: 4 cols).
- **HUD & Inspector Panels:** Structured on fixed-width side rails (360px to 420px) overlaying or bordering dynamic geospatial surfaces.
- **Rhythm & Compaction:** Spacing is disciplined, leaning toward compact margins (`0.5rem` to `1rem`) to maximize visual data density on single-screen views without scrolling.

### Responsive Breakpoints & Adaptations
- **Mobile (`<640px`):** Single-column stacked stack. The interactive map viewport anchors the top 45vh with fixed coordinate crosshairs; telemetry analysis and warning cards stack below in full-width accordion panels. Outer margins compress to `0.75rem`.
- **Tablet (`640px – 1024px`):** Flexible 6-column layout with horizontal collapsible bottom-sheets for spectral and water quality charts.
- **Workstation (`>1024px`):** Persistent multi-pane instrumentation with synchronous map-linked inspector rails, floating layer toolbars, and synchronized timeline scrubbers.

## Elevation & Depth

Visual hierarchy is constructed entirely through flat planar layers, hairline borders, and tonal stepping. Drop shadows and ambient blurs are omitted; depth signifies topological layers rather than artificial elevation.

### Structural Depth Architecture
- **Level 0 (Map & Spatial Canvas):** `#0f1e1a` base. Raw cartographic raster tiles, bathymetric contours, and hydrology vector shapes.
- **Level 1 (Docked Structural Rail & Cards):** `#16302a` bounded by a strict `1px solid #2a453c` border. Houses telemetry feeds, observation logs, and parameter sliders.
- **Level 2 (Active Focus & Flyout Inspectors):** `#1d3b34` surrounded by a `1px solid #3f8f7a` hairline or double hairline detail. Used for pin callouts, active coordinate inspectors, and temporal scrub controls.
- **Level 3 (Modal Dialogs & Warning Overlays):** `#16302a` anchored with a high-contrast perimeter hairline (`#d97b3f` or `#c94f4f`).

### Dividing Lines & Framing
Panels utilize crisp, architectural edge lines. Intersecting borders form clean technical corner intersections, reminiscent of drafting tables and scientific charts.

## Shapes

The interface embraces a machined, rectilinear silhouette. Corner radii are restricted to micro-rounding (`0.25rem` / `4px` maximum) or sharp right angles (`0px`), evoking precision lab equipment enclosures and technical drafting frames.

- **Panels, Cards, and Modals:** `roundedness: 1` (`0.25rem` / `4px`) for subtle edge softening without compromising structural rigidity.
- **Pips, Badges, and Status Dots:** Small circular geometry (`50%` radius, `6px` to `8px` diameter) for status indicators.
- **Data Cells, Technical Chips, and Insets:** Sharp corners (`0px`) with hairline borders for raw table views and coordinate overlays.

## Components

### Buttons & Operational Controls
- **Primary Action:** Solid `#3f8f7a` fill, `#0f1e1a` text, weight 600 (`IBM Plex Sans`), flat rectangular profile with 2px radius. Zero elevation shadow. Active/press state darkens to `#327261`.
- **Secondary / Technical Action:** Background `#16302a`, `1px solid #2a453c`, `#e8e2d0` text. Hover state brightens border to `#3f8f7a` and background to `#1d3b34`.
- **Hazard / Override Action:** Background `#16302a`, `1px solid #c94f4f`, `#c94f4f` text.

### Telemetry Cards & Metric Blocks
- Structured with `#16302a` background and `1px solid #2a453c` borders.
- Header row contains the parameter label in uppercase `mono-label` (`#7a9088`), flanked by a discrete circular status pip.
- Central value displayed in large `Newsreader` (`telemetry-display`), with technical physical units (`mg/L`, `NTU`, `°C`) set in adjacent `mono-data`.
- Footer displays sensor baseline deviation and latest timestamp in `mono-micro`.

### Status Indicators & Signal Pips
- 6px–8px solid circular indicators without radial glows.
- **Nominal / Calibrated:** `#3f8f7a`
- **Elevated / Watch:** `#e0b23f`
- **Critical Risk:** `#c94f4f`
- **Offline / Stale:** `#7a9088`

### Scientific Honesty Chips & Disclosure Badges
- **Ground-Truth Required Chip:** Rectangular container with diagonal hatched border styling in `#d97b3f` and `#16302a`, displaying text: `SAMPLE REQUIRED: GROUND CALIBRATION PENDING`.
- **Synthetic Pass Disclosure:** Monospace tag flagged with `[SYNTHETIC SCENE / INTERPOLATED]` to explicitly mark cloud-masked or algorithmic reconstructions.
- **Optical Quality Rating:** Monospaced pill displaying satellite pass sensor fidelity (`QA: 98.2% CLOUD-FREE / SENTINEL-2 MSI`).

### Input Fields & Parameter Steppers
- Inset styling with `#0f1e1a` background, framed by `1px solid #2a453c`.
- Value in `#e8e2d0` (`JetBrains Mono`). Focus state swaps border color cleanly to `#3f8f7a` without focus rings or drop-shadow halos.
- Units permanently visible as fixed-width suffixes in `#7a9088`.

### Cartographic Viewport & Crosshairs
- Dark-field vector styling using deep earthy basemap tones.
- Screen coordinates HUD anchored to bottom-left with dynamic lat/long values, elevation meters, and zoom tier.
- Center-screen targeting reticle using 1px hairline crosses (`#7a9088`) with 8px focal gap.
- Scale bar rendered in classical nautical/cartographic alternating segment pattern using `#2a453c` and `#e8e2d0`.