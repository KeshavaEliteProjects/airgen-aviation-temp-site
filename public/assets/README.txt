AIRGEN AVIATION — ASSETS
========================

Loaded at runtime
-----------------
  Aircraft model for the 3D flight scene. Keep this filename; the app
  normalises the GLB to world scale automatically and expects the nose on
  local -Z (no artificial 90-degree correction).

logo-light.png
  Navigation and footer wordmark on the dark palettes. White type, brand red,
  transparent — trimmed and resized from logo.png.

logo-dark.png
  The same mark with the neutral type inverted to ink, for the Approach White
  palette and any light surface. The red keeps its hue.

  Both are generated from logo.png. Regenerate them if that file is replaced;
  the ink version separates neutral from coloured pixels on absolute channel
  spread, not on a saturation ratio, because a ratio is meaningless near black
  and misreads dark type as coloured.

pilot-01.png / pilot-02.png / pilot-03.png
  The three journey stages: the aspirant, the first officer, the captain.
  All three are normalised to a 900x1200 transparent canvas with the figure
  1082px tall and its feet at y=1146. That shared baseline is what makes the
  cross-fade read as one person changing rather than three images swapping —
  if you replace them, match that framing or the transition will jump.

imagery/*.webp
  Editorial photography: the visual-story strip and the honeycomb filler
  tiles. Carried over from the v1 project.

testimonials/*
  Video testimonials. See testimonials/README.md — the clips currently in
  that folder are PLACEHOLDERS and must be replaced before launch.

Sources (not loaded at runtime)
-------------------------------
person1.png   Triptych of all three figures. pilot-01.png was cut from it.
person2.png   Source for pilot-02.png.
person3.png   Source for pilot-03.png.
image1-6.jpeg Source for the testimonial posters and stills.
logo.png      The master wordmark, 1983x793 transparent. Source for both
              logo-light.png and logo-dark.png.

These are kept so the derived assets above can be regenerated. Nothing
references them, so they can be deleted if deploy size matters.

AIRGEN V11 media slots:
- cloud.mp4 — full-screen clear sky / cloud hero video
- evolve.mp4 — curved Journey section video
