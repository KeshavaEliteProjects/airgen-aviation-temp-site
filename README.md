# AirGen Aviation — v2

**[✈️ Live demo →](https://airgen-landing-page.onrender.com)**

Vite + React + React Three Fiber landing page for AirGen Aviation. Brand copy,
the three-stage journey and the ASK framework come from the AirGen brand
documents in the v1 project (`../AIRGEN/brand/`).

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The build must finish with zero TypeScript and Vite errors.

## Page structure

| Section | Component | Notes |
| --- | --- | --- |
| Hero | `ui/Hero.tsx` | Four variants in `ui/heroes/`, one shown by CSS |
| The journey | `ui/Stages.tsx` | Sticky frame; scroll drives the suit-up (`ui/SuitUp.tsx`) |
| Cadets | `ui/Testimonials.tsx` | Honeycomb of video tiles, sized by pointer distance |
| About / imagery / founders / locations / courses / contact | `ui/ContentSections.tsx` | Editorial sections, reveal-on-scroll |
| Footer | `ui/Footer.tsx` | Own opaque band so the 3D scene stops there |

Modals: `EnquiryModal`, `FoundersModal`, `TestimonialModal`.
Site-level control: `AppearancePicker`, docked in the header — palette and hero
in one panel.

## Architecture

**One scroll, two timelines.**

1. `calculateFlightState(progress)` in `lib/flightPhysics.ts` turns one
   normalised page progress value (`0 → 1`) into the aircraft transform, camera
   composition, telemetry and flight status. The Three.js scene is a pure
   function of that value — no springs, so the camera stops on the same frame
   the wheel does.
2. The stages section measures **its own** scroll position instead of reading
   page progress, so the transformation is exact regardless of how much content
   sits above or below it. It reports its geometry back through
   `registerStagesGeometry` so the rails can scroll to a stage precisely.

Scrolling runs through a single Lenis instance (`lib/smoothScroll.ts`).
Everything that moves the page — nav anchors, hero buttons, both stage rails —
goes through it, and it falls back to native scrolling under
`prefers-reduced-motion`.

### The stage transformation — the suit-up

Three stages, one figure each: an aspirant, a first officer, a captain. A
cross-fade between the three photographs reads as a slideshow, not a
transformation, so `ui/SuitUp.tsx` **assembles** the uniform instead. The
incoming figure is cut into ten anatomical plates that converge out of depth,
glow in flight, and clamp on from the boots upward.

Three things do the work:

- **Plates, not slices.** Band edges land on joints — ankle, knee, hip, waist,
  shoulder — so the seams read as panels. Bands overlap by half a percent to
  kill sub-pixel hairlines; the background maths stays registered at any
  top/height, so the overlap is free.
- **A hard cut under a bloom.** The outgoing plate is cut, never faded. The
  three figures were shot in slightly different poses, and a fade leaves both
  legible together long enough to notice. The arriving plate lingers a few
  frames as a decaying flash over the swap — how the effect is cut on film.
- **Registration.** The three PNGs are normalised to one canvas, scaled to a
  common shoulder-to-foot height and aligned on a head-weighted body axis. See
  *Regenerating derived assets* below: centring on the alpha bounding box
  instead puts the heads up to 114px apart, because the backpack and the
  briefcase drag the box sideways.

`paint()` in `Stages.tsx` drives it through one imperative handle, and also
writes three CSS variables on the section (`--stage-ratio`, `--stage-frac`,
`--stage-transition`) which drive the rail, the flight strip, the glow and the
ground shadow entirely in CSS. Only the rounded stage index goes through React
state, so dragging through the section stays at frame rate.

Below 1100px the section switches to a stacked card layout with a sticky figure
rail — the suit-up still plays, driven by which card is nearest a reference
line rather than by one section-wide ramp — because the sticky three-column
frame cannot hold a stage panel inside one viewport at that width.

### Hero variants

Four openings, in `lib/heroes.ts`:

| | | |
| --- | --- | --- |
| 01 | **Flight path** | The 3D aircraft on its climb, with live telemetry (default) |
| 02 | **Minimal ceiling** | Sky, cloud, one aircraft, one line, one link |
| 03 | **The three ranks** | Aspirant, first officer and captain in a row |
| 04 | **Cockpit** | Full-bleed photograph with the headline over it |

**All four are rendered; CSS shows one**, keyed off `data-hero` on the root.
Choosing in React means a frame of the default hero on every load, and on a
full-bleed hero that flash is the whole screen. Hidden variants cost nothing in
layout and their images are never fetched — a `display: none` subtree does not
trigger image loads.

Two traps if you edit them:

- **Do not put `overflow: hidden` on a hero that full-bleeds.** The sky and the
  cockpit photograph escape the shell with a negative inset
  (`inset: 0 calc(-1 * (100vw - 100%) / 2)`); clipping the element clips that
  back, leaving a dark band down each edge.
- **The minimal hero's sky is radial gradients on one element**, not a stack of
  blurred ellipses. Blurred rects wider than the viewport clip to straight
  vertical edges, and at cloud sizes they merge into one hard band across the
  frame — through the headline. Radials fall off on every side.

### Palette variants

Four full palettes, not accent swaps: Crimson Command (default), Midnight
Avionics, Runway Gold and Approach White. Both switchers share one panel.

Colour lives in `index.css` under `:root[data-theme="…"]`, and the translucent
families resolve through channel triplets (`--ink-rgb`, `--surface-rgb`,
`--accent-rgb`) so the light variant can invert a hairline wash without
restating the hundred-odd rules that use one. An inline script in `index.html`
stamps `data-theme` and `data-hero` before first paint, so there is no flash of
either default.

`lib/themes.ts` holds only what CSS cannot reach: the picker's copy and the
Three.js scene colours, which are WebGL uniforms. `AirGenScene` reads them, so
switching variant re-grades the aircraft lighting and the sky along with the
page. Approach White inverts to a daylight rig rather than tinting a night
one.

### The testimonial honeycomb

Circular tiles on an offset hex grid, scaled by distance from a focus point
that springs toward the pointer (Apple Watch home screen). Hovering therefore
magnifies a *region*, not just the tile under the cursor. The six video tiles
sit on the ring one step out from the centre — the only arrangement of six that
stays symmetric. On phones the outer ring is dropped so the remaining tiles get
the space.

The nearest video tile to the focus previews muted and inline; clicking opens
the popup player with sound, keyboard paging (`←` `→` `Esc`) and the full
testimonial text.

## Assets

`public/assets/`

| File | Used by | Notes |
| --- | --- | --- |
| `plane.glb` | `3d/AircraftGLB.tsx` | Normalised to world scale automatically |
| `logo-light.png` | nav, footer | Generated from the v1 logo: white wordmark, brand red, transparent |
| `logo-dark.png` | — | Same mark for light surfaces (print, email) |
| `pilot-01/02/03.png` | `ui/Stages.tsx` | Aspirant / first officer / captain, normalised to a shared baseline |
| `imagery/*.webp` | visual story, honeycomb fillers | Carried over from the v1 project |
| `testimonials/*` | `ui/Testimonials.tsx` | See `testimonials/README.md` — **the clips are placeholders** |

`person1.png`, `person2.png`, `person3.png`, `image1–6.jpeg` and `logo.png` are
the original source artwork. Nothing loads them at runtime any more — the pilot
figures, testimonial posters and logo variants above were derived from them —
but they are kept so the derived assets can be regenerated.

### Regenerating derived assets

The pilot figures are normalised so all three share a foot baseline, a shoulder
line and a body axis — that registration is what lets the suit-up's plates land
on the right anatomy on every figure. If the source artwork is replaced, re-run the
normalisation: scale each figure so its **shoulder-to-foot** distance is 860px
(not its total height — a cap adds height and would push the shoulders down),
place the feet at y=1146 on a 900×1200 canvas, and align the body axis at
x=450 using `0.8 × head centroid + 0.2 × leg centroid`.

The head is weighted heavily on purpose: it is the landmark none of the three
figures obscures with a prop, and it is the last plate to land. The current
assets register to within 1px on all three axes.

## Before launch

Search the codebase for `TODO(client)`. Currently outstanding:

- **Every testimonial** in `lib/content.ts` is placeholder copy, and every clip
  in `public/assets/testimonials/` is a generated placeholder with a burned-in
  label. See that folder's README.
- Founder credentials, stage durations and hour figures need confirming.
- The enquiry form has no endpoint — it validates and shows a success state but
  posts nowhere.

## Accessibility / performance

- Semantic buttons and landmarks; `aria-current` on both stage rails.
- Visible focus rings; the honeycomb follows keyboard focus, so tabbing through
  the tiles magnifies each one in turn.
- Every dialog traps `Escape`, focuses its close button and stops page scroll.
- `prefers-reduced-motion` disables the focus spring, the reveals and the
  transitions, and hands scrolling back to the browser.
- The appearance picker is a labelled toggle with `aria-pressed` options; the
  palette is previewed as chips rather than named, so it does not depend on
  colour vocabulary.
- Scroll work is rAF-batched; the honeycomb paint loop parks itself once the
  cluster settles.
- GLB preloading, frustum culling, `loading="lazy"` on below-fold imagery, and
  `preload="none"` on tile videos so nothing downloads until hovered.
