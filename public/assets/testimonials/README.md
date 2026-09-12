# Testimonial media

The site reads this folder through `TESTIMONIALS` in `src/lib/content.ts`.
Each entry needs three files, named by its two-digit id:

    NN.mp4          the testimonial clip        (H.264 / MP4, 16:9, ~1280×720)
    NN-poster.jpg   the circular tile thumbnail (square, ≥720×720)
    NN-still.jpg    the modal fallback frame    (16:9, ≥1280×720)

## Before launch — replace everything here

Every `NN.mp4` in this folder is a **generated placeholder**: a slow pan over
one of the existing training photos, with a burned-in "PLACEHOLDER CLIP" label
so it can never be mistaken for a real testimonial. The posters and stills are
crops of the same photos.

To go live:

1. Drop the real clips in as `01.mp4` … `06.mp4` (keep the names, or change the
   `video` field in `src/lib/content.ts`).
2. Export a square poster and a 16:9 still from each clip, same naming.
3. Replace the placeholder names, roles and quotes in `TESTIMONIALS`
   (`src/lib/content.ts`) — they are marked `TODO(client)`.

Encode hint (matches the placeholders):

    ffmpeg -i source.mov -vf scale=1280:-2 -c:v libx264 -crf 24 \
           -pix_fmt yuv420p -movflags +faststart -an 01.mp4

Clips are muted-by-default on the tiles and unmuted in the popup, so keep the
audio track on the real files.
