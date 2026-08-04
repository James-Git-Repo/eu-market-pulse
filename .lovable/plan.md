# Make the Newsletter the flagship page

Goal: keep the current homepage, but make `/newsletter` the page search engines, AI crawlers and social shares treat as the site's main destination.

## Sitemap changes (`public/sitemap.xml`)

- `/newsletter` → priority `1.0`, `changefreq: daily` (top of the file, first entry after the root).
- `/` → priority `0.9`.
- `/articles` → `0.8`, `/archive` → `0.7`, `/subscribe` → `0.7`.
- De-emphasize side projects: `/million-slots`, `/genielink`, `/resources` → priority `0.3`, `changefreq: yearly`.
- Article URLs (`/post/...`) stay listed and keep `0.8` so newsletter issues remain the strongest content cluster; their existing `lastmod` dates are preserved.
- No `lastmod` added to static routes (no authoritative per-page timestamp to use).

## Newsletter page SEO (`src/pages/Newsletter.tsx`)

- Rewrite title/description into a keyword-led, click-worthy pair, e.g. title "European Market Movers — Weekly Newsletter | The (un)Stable Net" and a description naming European equities, macro and AI plus the weekly cadence.
- Add structured data for the page: a `CollectionPage` + `Blog` schema (name, description, url, publisher) and a `BreadcrumbList` (Home → Newsletter), so Google can show it as a publication hub.
- Add an `ItemList` of the most recent issues shown on the page (position, name, url) to strengthen the hub signal.

## Sitewide signals

- `index.html`: keep the sitewide title/description, and add a `WebSite` JSON-LD `mainEntityOfPage`/`hasPart` pointer plus an Organization `sameAs` set already present — specifically add the newsletter URL as the site's primary publication (`WebSite.mainEntity` → `/newsletter`). Also add `og:site_name` if missing.
- `public/llms.txt`: reorder so Newsletter is the first entry under Pages and described as the site's main product; move the side projects under Optional.
- `public/robots.txt`: unchanged except keeping the editor paths disallowed (already correct).

## In-app prominence (frontend only)

- Homepage (`src/pages/Index.tsx`): promote the newsletter block — make it the first primary call to action with a clear internal link to `/newsletter` using descriptive anchor text ("Read the weekly European Market Movers newsletter").
- Navbar: make "Newsletter" the first/emphasized nav item so internal link equity flows there on every page.
- Article pages (`src/pages/Post.tsx`): add a descriptive in-content link back to `/newsletter` in the footer area of the article ("More issues of the weekly newsletter").

## Notes

- This stack is a static SPA, so per-route titles/descriptions are read by Google (which executes JS) but social crawlers only see `index.html`. If accurate per-page social previews for newsletter issues matter, the app would need SSR — it can be upgraded via "/" → "Migrate to TanStack Start" ([what the upgrade gives you](https://lovable.dev/blog/building-apps-using-tanstack-start)).
- After the change, resubmitting the sitemap in Search Console speeds up re-crawl.
