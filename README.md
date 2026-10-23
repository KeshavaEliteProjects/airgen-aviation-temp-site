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
- `whatsapp`: currently 919515143311. The demo form opens WhatsApp to this number with the visitor's details prefilled.
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

## React version (this folder)
Run: `npm install` then `npm run dev`. Build for hosting: `npm run build` (output in `dist/`).

Changes in this version:
- Hero: after the words Attitude. Skills. Knowledge., three circles fly in from the top, left and right and merge into a Venn diagram. Each circle opens its page (Attitude, Skills, Knowledge); the centre "Airline-ready pilot" opens the full ASK framework page.
- Roadmap: each of the 6 steps opens a popup (summary, 4 key points, how Airgen helps, Book a demo, Talk to a mentor, Previous/Next, arrow keys, Esc). Edit the text in `src/utils/roadmapData.js`.
- Navbar: Career and Alumni removed (also from the enquiry form list). Courses and Services items now open their own pages: ATPL ground class (with enquiry form), Type rating, Licence, NIOS, VISA, Complementary, Conversion, Medicals. Page text is in `src/utils/pageContent.jsx` (`INFO_PAGES`).
- Landing page: the old ASK section content (heading, Venn, tabs, table) and the Technical / Non-technical / Goal labels in the career panels are removed.
- Mobile: softer smaller clouds, plane kept clear of text, no sideways scroll, hero buttons clickable.

The page text for the new pages and roadmap popups is general guidance, not verified against current DGCA rules. Check it, and add exact fees and dates, before launch.

Team page: "Meet the faculty" shows photos in aircraft-window frames that reveal top to bottom as you scroll. Add photos to `public/assets/team/` and list them in `src/utils/teamData.js` (name, role, tag, img). Empty img shows a placeholder silhouette. The names in that file are placeholders.

## Latest news (strip + page)
- Home page: a strip at the very top scrolls the latest headlines and "Click here to watch latest news". Clicking it opens the news page. Hover or focus pauses it. With reduced motion it stays still.
- News page: opens from the strip, from About us > Latest news, or from the link `yoursite.com/#news`. Has category filters, New badge (last 7 days), pinned items first, Share on WhatsApp, and optional YouTube videos.
- To change the news, edit `public/news.json`. No rebuild is needed after the site is live: replace the file on the server. Fields per item: `id`, `date` (YYYY-MM-DD), `title`, `category`, `summary`, optional `pinned`, `image`, `link`, `hidden`, and for video `"type": "video"` with `"videoId": "<YouTube id>"`.
- The three starter items are placeholders. Replace them with real news before launch.
- Files: `src/components/NewsMarquee.jsx`, `src/components/NewsPage.jsx`, `src/utils/newsData.js` (also holds a copy of the starter items used only if news.json fails to load).

## News admin (add news yourself)
- Open `yoursite.com/#admin` and sign in. Default password is in `src/utils/config.js` (`adminPassword`). Change it before launch.
- Add, edit, hide, pin or delete news, including YouTube video items (paste the normal YouTube link).
- Changes are saved as a draft in that browser only and show instantly on the strip and news page there. To publish for all visitors: click Download news.json, then replace `public/news.json` (or `news.json` in the built site folder) on your server.
- Limits: this is a static site, so the password check runs in the browser and is not real security, and visitors only see changes after news.json is replaced. For live updates without uploading a file, or real logins, a small backend (Firebase, Supabase or a Google Sheet) is needed.
- The video item in `news.json` ("Sample video") is a dummy. Delete or replace it.
