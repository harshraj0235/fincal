# Duplicate, Google chose different canonical – festival-tools (GSC)

## What was happening

Google reported **26** URLs under "Duplicate, Google chose different canonical than user". They were single-segment festival-tools URLs like:

- `/festival-tools/festival-financial-health`
- `/festival-tools/personalized-gift-chatbot`
- `/festival-tools/amazon-deal-finder`
- etc.

These URLs match the route `/festival-tools/:festivalSlug` and render **FestivalLanding**. The slug (e.g. `festival-financial-health`) is not a **festival** slug in data (festivals are `diwali`, `rath-yatra`, etc.), so `findFestival(slug)` returns `undefined` and the page showed "Festival not found" with **no canonical or meta**. Google then inferred a different canonical (e.g. `/festival-tools`), which produced the GSC issue.

## What was fixed

1. **FestivalLanding** (when festival not found):  
   - Added **SEOHelmet** with a **self-referencing canonical** (`url = https://moneycal.in/festival-tools/{slug}`).  
   - Set **noindex, nofollow** so this error page is not indexed.  
   - Result: The page explicitly states "this URL is the canonical for this URL" and asks crawlers not to index it, so Google no longer "chooses" a different canonical.

2. **FestivalToolPage** (when tool not found):  
   - Same approach: **SEOHelmet** with **self-referencing canonical** for the current path and **noindex, nofollow**.  
   - Applies to invalid two-segment URLs (e.g. `/festival-tools/diwali/non-existent-tool`).

## Valid festival-tools URLs

- **Hub:** `/festival-tools`  
- **Festival landing:** `/festival-tools/{festivalSlug}` (e.g. `/festival-tools/diwali`) – only when the slug exists in `festivalTools` data.  
- **Tool page:** `/festival-tools/{festivalSlug}/{toolSlug}` (e.g. `/festival-tools/diwali/diwali-budget-calculator`).

Valid pages already set a self-referencing canonical via SEOHelmet. The change only affects **not-found** views.

## What you should do next

1. **Deploy** so the updated FestivalLanding and FestivalToolPage are live.
2. **Sitemap:** Ensure only **valid** festival-tools URLs are in the sitemap (hub, known festival slugs, and known festival+tool slugs). Remove or stop adding single-segment tool-only URLs (e.g. `/festival-tools/festival-financial-health`) if they are not real festival slugs.
3. **GSC:** After recrawls, the 26 URLs should either drop from the "Duplicate, Google chose different canonical" report (noindex) or align with the self-referencing canonical we now send.
