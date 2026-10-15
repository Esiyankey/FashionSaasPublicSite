# FashionSaas Storefront

Next.js storefront connected to the FashionSaas Admin tenant API. Product, category, store,
navigation, About, blog, and Outfit Finder content comes from the admin database. Contact and
newsletter forms, checkout, and guest order lookup/cancellation use the same API.

## Local development

1. Start FashionSaas Admin with its database configured and migrations applied. The admin API
   must be reachable at `http://localhost:3000`.
2. Copy `.env.example` to `.env.local`. The defaults target the local admin server and the
   `fashion-saas` tenant; change the slug to use another organization.
3. Install dependencies with `npm install`, then run `npm run dev`.
4. Open `http://localhost:3001` (or the port Next.js reports).

The API client has a localhost-only development fallback. Production requires
`NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_STORE_SLUG`. Set `NEXT_PUBLIC_SITE_URL` to the
storefront's public origin so canonical metadata, robots, and sitemap URLs are correct.

## Admin setup

Import the storefront's existing content into FashionSaas Admin using its documented
`npm run db:import-storefront` workflow. Configure products, categories, branding, navigation,
About content, blog posts, contact details, and Outfit Finder options in the admin dashboard.
See the admin repository's `docs/INTEGRATION.md` for the API contract, tenant setup, and deploy
order.

For immediate storefront updates, configure `REVALIDATE_SECRET` here and the matching
`STOREFRONT_REVALIDATE_URL` / `STOREFRONT_REVALIDATE_SECRET` in the admin app. Without the
webhook, public API content refreshes through the configured cache revalidation window.

## Checkout and privacy

Checkout uses cash on delivery because no payment provider is connected. The browser sends
product/variant IDs, quantities, and shipping details; the admin server calculates all prices,
tax, shipping, and stock reservation. Guest order lookup and pending-only cancellation use an
access token kept in the shopper's browser. The storefront does not collect card numbers or CVV.

## Validation

```bash
npx tsc --noEmit --incremental false
npm run lint
```
