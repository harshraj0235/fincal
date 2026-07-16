# Google Discover Article Creation — Complete Instructions

> **How to use this file**: Give the agent a topic. The agent MUST read this file first, then follow every step below. No shortcuts.

---

## STEP 1: Topic Research (MANDATORY — Do Before Writing)

When the user gives a topic, do these searches FIRST:

### 1A. Google Trending Check
- Search the topic on Google to see what people are actually searching
- Find the **exact trending keywords** people use (Hindi + English mixed)
- Note the top 5 related searches Google shows at the bottom

### 1B. Find Real Facts and Data
- Search for **official sources** (government sites, company press releases, RBI, SEBI, etc.)
- Find **at least 5 real facts** with numbers, dates, percentages
- Find **expert quotes** if available
- Note the **source URLs** for credibility

### 1C. Keyword Selection
- Pick **1 primary keyword** (most searched term for this topic)
- Pick **3-5 secondary keywords** (related terms people also search)
- Use these keywords naturally throughout the article
- The primary keyword MUST appear in: title, first paragraph, one H2 heading, meta description

---

## STEP 2: Article Writing Rules

### Title Rules
- Length: **50-70 characters** (NOT more)
- Must be **click-compelling but NOT clickbait**
- Use the primary keyword naturally
- Add emotion words: जानिए, चौंकाने वाला, बड़ी खबर, सच्चाई, पूरी जानकारी
- Example: `"OnePlus N6 Battery: क्या 8,000mAh सच में गेम-चेंजर है? पूरी सच्चाई"`
- **NEVER use**: "You won't believe", misleading claims, false urgency

### Content Rules (SEO & Bypass AI Detection)
- **Minimum 1500 words** (this is non-negotiable)
- Write in **simple Hindi-English mix** (Hinglish) — the way normal Indians talk
- **Burstiness & Perplexity**: Mix very short, punchy sentences (3-5 words) with longer, explanatory sentences. This completely defeats AI detectors.
- **BAN THESE AI WORDS**: Never use "delve", "crucial", "testament", "tapestry", "landscape", "moreover", "furthermore", "demystify". Write like a real human journalist.
- Use **short paragraphs** (3-4 lines max per paragraph)
- Add **emotion** — the reader should FEEL something while reading
- Write like you're explaining to a friend, not writing a textbook. Plagiarism-free and unique.
- **NO markdown syntax** — use only HTML tags: `<strong>`, `<a href>`, `<br>`
- **NO `*`, `**`, `[]()` markdown** — everything must be pure HTML

### Content Structure (Follow This Exact Order)
```
1. Opening paragraph (100-150 words) — Hook the reader, state the main news/fact
2. Cover Image — Always after first paragraph
3. H2: Main topic explanation (300-400 words)
4. H2: Key facts/data with numbers (200-300 words)  
5. Callout box — Important highlight or warning
6. H2: Impact/Effect on common people (200-300 words)
7. H2: Expert opinion or analysis (200-300 words)
8. H2: What should you do? / Action steps (200-300 words)
9. H2: Future outlook (100-200 words)
10. Final paragraph — Summary with internal link to MoneyCal tool
```

### Fact Integration Rules
- Every article MUST have **at least 5 real facts** with specific numbers
- Format facts like: "RBI की रिपोर्ट के अनुसार, 2026 में भारत की GDP ग्रोथ 6.8% रही"
- Include dates, amounts in rupees, percentages
- Mention the source naturally in text: "SEBI के अनुसार...", "सरकारी आंकड़ों के मुताबिक..."

---

## STEP 3: Image Rules (CRITICAL for Discover)

### Image Generation
- Use the `generate_image` tool to create the cover image
- **Image keyword**: Use the **primary keyword of the article** as the image prompt
- The prompt should describe a **modern, vibrant, professional** image related to the topic
- **NEVER use generic images** — every image must be specific to the article topic
- **NEVER use** cricket images for UPSC articles, or random stock photos

### Image Prompt Format
```
"A modern, vibrant, professional illustration showing [SPECIFIC TOPIC VISUAL]. 
Style: Clean, editorial, high-contrast colors, Indian context. 
No text overlay. 16:9 aspect ratio. Premium magazine quality."
```

### Image Technical Requirements
- Resolution: **1200px wide minimum** (Google Discover requirement)
- Aspect ratio: **16:9** for articles
- Save to: `/public/images/discover/[article-slug].png`
- The meta tag `<meta name="robots" content="max-image-preview:large">` is already in the template

---

## STEP 4: Internal Linking (MANDATORY)

Every article MUST have **3-5 internal links** to MoneyCal tools/pages.

### How to Add Internal Links
- Links must be **inside the text** — NOT shown as raw URLs
- Use `<a href='https://moneycal.in/tools/sip-calculator'>SIP Calculator</a>` format
- The link text should be **natural words** that fit in the sentence
- When clicked, the link should directly open the target page

### Link Examples by Topic Category

**Finance/Investment articles:**
- `<a href='https://moneycal.in/tools/sip-calculator'>SIP Calculator</a>`
- `<a href='https://moneycal.in/tools/emi-calculator'>EMI Calculator</a>`
- `<a href='https://moneycal.in/tools/fd-calculator'>FD Calculator</a>`
- `<a href='https://moneycal.in/tools/ppf-calculator'>PPF Calculator</a>`
- `<a href='https://moneycal.in/tools/mutual-fund-calculator'>Mutual Fund Calculator</a>`

**Tax articles:**
- `<a href='https://moneycal.in/tools/income-tax-calculator'>Income Tax Calculator</a>`
- `<a href='https://moneycal.in/tools/gst-calculator'>GST Calculator</a>`
- `<a href='https://moneycal.in/tools/hra-calculator'>HRA Calculator</a>`

**Loan/EMI articles:**
- `<a href='https://moneycal.in/tools/home-loan-emi-calculator'>Home Loan EMI Calculator</a>`
- `<a href='https://moneycal.in/tools/car-loan-calculator'>Car Loan Calculator</a>`
- `<a href='https://moneycal.in/tools/personal-loan-calculator'>Personal Loan Calculator</a>`

**Gold/Commodity articles:**
- `<a href='https://moneycal.in/gold-tools/gold-price-calculator'>Gold Price Calculator</a>`

**Government scheme articles:**
- `<a href='https://moneycal.in/government-schemes'>Government Schemes</a>`

**Always link to at least 1 other discover article:**
- `<a href='https://moneycal.in/discover/[related-slug]'>related article title</a>`

---

## STEP 5: Create the Article File

### File Location
```
src/data/discover/[article-slug].ts
```

### Slug Rules
- All lowercase
- Use hyphens between words
- Keep it short but descriptive (5-8 words max)
- Include primary keyword
- Example: `ev-battery-blast-prevention-bms-app-settings`

### File Template
```typescript
import { DiscoverArticle } from './types';

export const variableName: DiscoverArticle = {
    id: 'article-slug-here',
    slug: 'article-slug-here',
    title: 'Article Title Here (50-70 chars)',
    snippet: 'Meta description here — compelling summary in 150-160 characters that makes people click.',
    coverImage: '/images/discover/article-slug-here.png',
    author: 'MoneyCal Team',
    date: '2026-07-02T12:00:00+05:30',  // USE FIXED DATE — current date in ISO format
    sections: [
        {
            type: 'p',
            content: 'First paragraph — hook the reader...'
        },
        {
            type: 'image',
            content: '/images/discover/article-slug-here.png'
        },
        {
            type: 'h2',
            content: 'First H2 Heading'
        },
        {
            type: 'p',
            content: 'Paragraph content with <a href=\'https://moneycal.in/tools/sip-calculator\'>SIP Calculator</a> internal link...'
        },
        {
            type: 'callout',
            content: 'Important highlight or key takeaway...'
        },
        {
            type: 'h2',
            content: 'Second H2 Heading'
        },
        {
            type: 'p',
            content: 'More content...'
        },
    ]
};
```

### Section Types Available
| Type | Use For |
|------|---------|
| `p` | Regular paragraphs |
| `h2` | Main section headings |
| `h3` | Sub-section headings |
| `image` | Images (content = image path) |
| `callout` | Highlighted boxes for key info |
| `ul` | Bullet point lists |
| `quiz` | Interactive quiz elements |

### IMPORTANT Rules for Content
- **date**: ALWAYS use a fixed ISO date string like `'2026-07-02T12:00:00+05:30'` — NEVER use `new Date().toISOString()`
- **author**: ALWAYS use `'MoneyCal Team'`
- **All links in HTML format**: `<a href='url'>text</a>` — NEVER use markdown `[text](url)`
- **Bold text**: Use `<strong>text</strong>` — NEVER use markdown bold
- **No markdown anywhere** in content strings

---

## STEP 6: Register the Article

### 6A. Add Import to index.ts
Open `src/data/discover/index.ts` and add at the top (before the comment line):
```typescript
import { variableName } from './article-slug-here';
```

### 6B. Add to Array
Add the variable to the `_discoverArticles` array (anywhere — it auto-sorts by date):
```typescript
    variableName,
    // Add variables here
```

---

## STEP 7: Build and Deploy

Run these commands in order:
```bash
npm run build
git add -A
git commit -m "Add discover article: [article title]"
git pull origin main --rebase
git push origin main
```

---

## STEP 8: Post-Publish Checklist

After deploying, verify:

- [ ] Article loads at `https://moneycal.in/discover/[slug]`
- [ ] Cover image is visible and high quality
- [ ] All internal links work (click each one)
- [ ] Article appears on the Discover listing page (`/discover`)
- [ ] Article appears in `sitemap-news.xml`
- [ ] Submit URL in Google Search Console > URL Inspection > Request Indexing
- [ ] Share on social media (Twitter, Facebook, WhatsApp) for engagement signals

---

## Google Discover Optimization Checklist

These are the signals Google Discover uses to select content:

| Signal | How We Handle It |
|--------|-----------------|
| **Large image (1200px+)** | Auto-generated with generate_image tool |
| **max-image-preview:large** | Auto-added in static HTML template |
| **NewsArticle schema** | Auto-generated JSON-LD by prerender |
| **Fresh content** | Fixed dates, 7-day news sitemap window |
| **E-E-A-T** | Author byline, publication date, facts with sources |
| **Mobile-friendly** | Responsive design built-in |
| **Fast loading** | Static HTML pre-rendered for crawlers |
| **No clickbait** | Must follow title rules above |
| **User engagement** | Share on social media after publishing |
| **Consistent publishing** | Publish 2-3 articles daily |

---

## Common Mistakes to AVOID

1. Using `new Date().toISOString()` for dates
2. Using markdown bold or link syntax in content
3. Writing less than 1500 words
4. Using generic/unrelated images
5. Forgetting internal links (need 3-5 per article)
6. Clickbait titles ("You won't believe...")
7. Not adding the article to `index.ts`
8. Not running `npm run build` after creating the file
9. Not submitting URL in Google Search Console
10. Writing without researching real facts first
