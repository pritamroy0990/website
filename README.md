# Breath Of Kindness Services — Website Starter

A responsive, multi-page home improvement and remodeling website built with HTML, CSS, and vanilla JavaScript. No build step or package manager is required.

## Pages
- `index.html` — homepage, service highlights, project inspiration, process, CTA
- `about.html` — company introduction and approach
- `services.html` — six service categories with contact links
- `projects.html` — filterable gallery
- `reviews.html` — review section with explicit pre-launch placeholders (replace with genuine reviews)
- `faq.html` — accessible accordion FAQ
- `contact.html` — validated estimate request form
- `privacy.html` / `terms.html` — draft legal pages to customize and review
- `404.html` / `500.html` — error pages

## Run locally
Open `index.html` in a browser, or run a local static server from this folder, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Important pre-launch checklist
1. Replace the phone, email, and service area notes with verified business information.
2. In `contact.html`, set `data-business-email="your-real-business-email@example.com"` on the `<body>` element. The form currently validates and prepares an email via `mailto:`; it does not send or store data server-side. For reliable submissions, connect a secure form endpoint or CRM, configure spam protection, and update the privacy policy accordingly.
3. Replace the inspiration images with photos of actual completed work or properly licensed imagery. Do not represent inspiration photography as company work.
4. Replace the sample review cards with genuine customer reviews, or remove them until real reviews are available.
5. Replace `YOUR-DOMAIN.example` in `robots.txt` and `sitemap.xml` with the production domain. Update the structured data in `index.html` with the real URL, service area, phone, and other verified business details.
6. Customize the privacy policy and terms for actual business practices and jurisdiction; obtain appropriate legal review.
7. Confirm business licensing, service availability, estimate policy, warranties, payment terms, and any permit requirements before publishing claims about them.
8. Test links, keyboard navigation, form behavior, and mobile layouts on the production host. Configure server-level 404/500 pages and HTTPS.

## Functionality included
- Responsive navigation with keyboard Escape support
- Responsive layout and reduced-motion preference support
- Service detail links and preselected service on contact page
- Filterable inspiration gallery
- FAQ accordion with ARIA state
- Browser-side validation and email draft generation for estimate requests
- Current-year footer labels
- SEO titles/descriptions, basic Open Graph tags, favicon, structured data starter, sitemap, and robots file

## Production limitation
This package is a complete static website implementation, but it does not include a server, database, real CRM integration, image upload backend, online booking system, analytics, or deployment configuration. The estimate form uses a mailto workflow until a verified business email or form endpoint is configured.


## Stripe online payments
The main navigation now includes **Make a Payment** and `payment.html` provides a customer payment form. Checkout is created securely on the server using Stripe Checkout; the Stripe secret key is never sent to the browser. The payment form currently charges in **USD** and accepts an amount agreed with the business.

### Configure before launch
1. Install Node.js 18 or later.
2. Copy `.env.example` to `.env`.
3. Create or access the business Stripe account and add its **test** secret key as `STRIPE_SECRET_KEY`. Never put a secret key in HTML/JavaScript or commit `.env`.
4. Set `PUBLIC_SITE_URL` to the real production HTTPS domain.
5. Run `npm install`, then `npm start`. Deploy the Node server to a host that supports Node.js and set the environment variables in its dashboard. A static-only host cannot run this Stripe endpoint.
6. Test checkout with Stripe test mode and Stripe test card `4242 4242 4242 4242`, any future expiry, and any CVC. Switch to the live secret key only after the business has completed Stripe onboarding and tested the full flow.
7. Configure a Stripe webhook for `checkout.session.completed` and reconcile successful payments against invoices before treating an order as paid. The success return page alone is not proof of payment.

Stripe processing fees are charged by Stripe and vary by country, payment method, and account agreement. This implementation is a one-time Checkout flow, not recurring billing. Currency is currently USD; confirm the merchant account's supported country/currency before launch.
