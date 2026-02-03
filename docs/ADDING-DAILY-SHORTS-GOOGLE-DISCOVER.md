# Adding Daily Shorts — Google Discover Ready

Add **multiple Moneycal shorts daily** based on trends. When you add a short, make it **eligible for Google Discover** and always link to the **full article** (internal link) so readers can go deeper.

---

## 1. How to add shorts daily

- Use the **Add Shorts** page: `/add-shorts-news` (password protected).
- Add as many shorts as you want per day — one form submit per short.
- Each short appears on `/news/shorts` and in the **Content for Google Discover** block with a **full URL** to the full story.
- For site-wide visibility, use the **Publish** flow so the short is saved to `public/custom-shorts.json` and deployed (see [SHORTS-PUBLISH-API-SETUP.md](./SHORTS-PUBLISH-API-SETUP.md)).

---

## 2. Google Discover checklist (each short)

For a short to be **eligible for Google Discover**:

| Requirement | What to do |
|-------------|------------|
| **Image** | Add an **Image URL** (recommended **min 1200px wide**, e.g. 1200×630). Use our default Discover images in code or your own CDN. |
| **Full article link** | Set **Full story link** to the **internal** full article URL, e.g. `https://moneycal.in/news/markets/your-article-slug`. This is the link shown as “Full story URL” on the shorts page. |
| **Headline** | Clear, engaging headline (under ~110 characters). |
| **Fresh content** | Use today’s date when adding; the app can set `datePublished` to current day for freshness. |
| **Readable copy** | Use short sentences and human-friendly “Why it matters” and “What should you do?” (see below). |

The shorts page already outputs **NewsArticle** JSON-LD and **full URLs** for each short so Discover can use them.

---

## 3. Full text article link / internal link

- **Full story link** on the Add Shorts form must be the **full URL** of the **internal** article on Moneycal, e.g.  
  `https://moneycal.in/news/markets/india-us-trade-deal-rupee-markets-surge-overnight-2026`
- Do **not** use external links here if you want the short to drive traffic to your own full article.
- The short will show:
  - “Full story URL: https://moneycal.in/...” (visible and clickable)
  - “Read full story →” linking to the same article.

---

## 4. Human-friendly, readable structure

Write so a real person can scan and understand in 60 seconds:

- **Headline**  
  One clear idea. You can use a single emoji (e.g. 🔥 🚀 📈 ⚠️) at the start.

- **Why it matters** (2–4 bullets)  
  - Use **short sentences**.  
  - One idea per bullet.  
  - Examples:  
    - “Indian markets jumped sharply and the rupee posted its strongest one-day gain in years.”  
    - “A major trade deal with the U.S. was just announced.”  
    - “Huge boost to investor sentiment and export expectations.”

- **Key numbers** (optional)  
  One short phrase per line, e.g. “Nifty +2.5% today”, “INR ~90.27 vs USD”.

- **What should you do?**  
  One or two short sentences. Action or mindset, not jargon.  
  Example: “Keep an eye on export-linked stocks and foreign fund flows; sentiment is strong.”

Avoid long paragraphs and heavy jargon. Prefer active voice and concrete numbers where possible.

---

## 5. Example (Discover-ready short)

- **Headline:** 🔥 Rupee Hits 7-Year High — Markets SKYROCKET After India-US Deal!  
- **Why it matters:**  
  - Indian markets jumped sharply and the rupee posted its strongest one-day gain in years.  
  - A major trade deal with the U.S. was just announced.  
  - Huge boost to investor sentiment and export expectations.  
- **Key numbers:** Nifty +2.5% today, INR ~90.27 vs USD  
- **What to do:** Keep an eye on export-linked stocks and foreign fund flows; sentiment is strong.  
- **Full story link:** `https://moneycal.in/news/markets/india-us-trade-deal-rupee-markets-surge-overnight-2026`  
- **Image URL:** A 1200px-wide image (e.g. from `/images/optimized/` or your CDN).

---

## 6. Where things live in code

- **Static shorts list:** `src/data/newsShortsData.ts` — `newsShortsList`, `DISCOVER_IMAGES`, `getNewsShortsTodayISO()`.
- **Add Shorts form:** `src/pages/news/AddShortsNewsPage.tsx`.
- **Shorts page (Discover block + full URLs):** `src/pages/news/NewsShortsPage.tsx`.
- **Publish API:** See [SHORTS-PUBLISH-API-SETUP.md](./SHORTS-PUBLISH-API-SETUP.md) and `functions/api/publish-short.js` (Cloudflare) or `api/publish-short.js` (Vercel).

Adding multiple shorts daily with **proper image** and **internal full-article link** keeps them Discover-friendly and drives readers to your full text articles.
