# Tarangan Associates website

A responsive, static website for Tarangan Associates, Bhandara, Maharashtra. Built with plain HTML, CSS and JavaScript so it can be uploaded directly to Netlify, GitHub Pages, or most static hosting providers.

## Files
- `index.html` — homepage, service categories, founder profile, illustrative design concepts, calculator, FAQs, contact and consultation modal.
- `styles.css` — responsive design system and page styling.
- `script.js` — navigation, carousels, enquiry modal, WhatsApp enquiry flow and calculator.
- `privacy.html` / `terms.html` — starter legal information pages to review before launch.

## Run locally
Open `index.html` in a browser, or run a static server from this folder, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy
Upload the site files to the root of a Netlify site, or commit them to a GitHub repository and enable static hosting. No build step is required. The hero video is kept in `public/` and also needs a root-level copy so the static site can serve it at `/Real-Estate-video-SnapYT.App.mp4`; keep both copies in sync when replacing the video.

## Before publishing
1. Verify the business details, current rating, services, and business listing.
2. Replace illustrative architectural images with licensed assets and genuine company project photographs where available. The concepts section explicitly identifies its images as inspiration, not completed work.
3. Confirm calculator rates in `script.js` (`CALCULATOR_RATES`). Current rates are demonstration values, not official Tarangan Associates pricing.
4. Review the privacy policy and terms for actual business practices and applicable legal requirements.
5. Test all image URLs and WhatsApp links on the final hosting domain. No business email or invented opening hours are included.
6. Add a canonical URL after the final production domain is confirmed.

## Calculator rate model
The estimator uses editable tier rates, property multipliers, scope multipliers and room weights, all centralised near the top of `script.js`. It is an indicative demonstration tool only, not a quotation.
