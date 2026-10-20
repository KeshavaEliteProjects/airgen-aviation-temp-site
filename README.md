# Airgen Aviation website

Static site (HTML, CSS, JS). No build step.

## Files
- `index.html`, `css/style.css`, `js/main.js`, `assets/` (logo, favicon, 4 photos)
- `airgen-aviation-standalone.html`: the same site as one file with images embedded

## Run or deploy
Open `index.html` in a browser, or upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, cPanel). Keep the folder structure as is.
Needs internet for GSAP 3.12.5 (cdnjs) and Google Fonts.

## Contact and booking settings
In `js/main.js`, find `AIRGEN_CONFIG`:
- `whatsapp`: currently 917569512222. The demo form opens WhatsApp to this number with the visitor's details prefilled.
- `phone` / `phoneText`: used by the Call links and the footer.
- `demoUrl`: add a booking link (Calendly etc.) and every demo button opens it instead.
- `email`: shows in the footer; used by the form only if `whatsapp` is empty.
- `enrolUrl`: reserved for a future enrolment link.

The form cannot place an automatic phone call. That needs a server or a telephony service.

## Replace images
Overwrite files in `assets/` with the same names, or edit the `src` in `index.html`.
Images 3 and 4 look like stock photos and image 1 like an AI illustration: confirm licences before launch.

## Not included / not verified
- No hero video (no licensed footage supplied).
- No testimonials, statistics or placement claims.
- Not tested in a real browser or on devices: check scroll animations, pinned sections and mobile layout before launch.
