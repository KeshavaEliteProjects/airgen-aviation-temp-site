# AIRGEN Aviation — GitHub Pages static site

This is a static HTML/CSS/JS version of the AIRGEN coming-soon page.

## Local testing

Open a terminal in this folder and run:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

Opening through a local HTTP server is recommended instead of double-clicking `index.html`, because it mirrors normal GitHub Pages hosting more closely.

## GitHub Pages

Upload the contents of this folder to a GitHub repository and enable **Settings → Pages → Deploy from a branch**.

The aircraft is a lightweight transparent WebP rendered from the supplied GLB. The GLB itself is not loaded by the website.

## Form notifications

The contact form posts to Web3Forms. Keep the Web3Forms access key in `index.html` as configured for this static site.
