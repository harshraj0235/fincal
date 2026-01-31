/**
 * Moneycal News in 60 Seconds – Inshorts-style text shorts
 * Short, clear, actionable. SEO + shareable.
 */

export type NewsShortCategory =
  | 'rbi'
  | 'markets'
  | 'loans'
  | 'tax'
  | 'crypto'
  | 'economy'
  | 'business'
  | 'startups'
  | 'tech-business'
  | 'personal-finance';

export interface NewsShort {
  id: string;
  slug: string;
  category: NewsShortCategory;
  headline: string;
  whyItMatters: string[];
  keyNumbers?: string[];
  whatToDo: string;
  fullStoryLink: string;
  fullStoryPath: string; // e.g. /news/markets/article-slug
  datePublished: string;
  readTimeSeconds?: number;
  /** Optional image URL for card/OG */
  imageUrl?: string;
  /** Optional video URL (YouTube, etc.) for embed */
  videoUrl?: string;
  /** Author id from teamProfiles */
  authorId?: string;
  /** Source: 'static' | 'custom' (admin-added) */
  source?: 'static' | 'custom';
}

const baseUrl = 'https://moneycal.in';

/** Map contentRegistry category to short category for filters */
export function categoryToShortCategory(cat: string): NewsShortCategory {
  const map: Record<string, NewsShortCategory> = {
    economy: 'economy',
    markets: 'markets',
    business: 'business',
    startups: 'startups',
    'tech-business': 'tech-business',
  };
  return (map[cat] || 'economy') as NewsShortCategory;
}

/** Generate 60-second short text for sharing/embed */
export function getShortAsText(short: NewsShort): string {
  const lines = [
    '🕒 Moneycal News – 60 Seconds',
    '',
    '📌 Headline:',
    short.headline,
    '',
    '⚡ Why it matters:',
    ...short.whyItMatters.map((b) => `• ${b}`),
    '',
  ];
  if (short.keyNumbers && short.keyNumbers.length > 0) {
    lines.push('📊 Key numbers:');
    short.keyNumbers.forEach((n) => lines.push(`• ${n}`));
    lines.push('');
  }
  lines.push('🧠 What should you do?');
  lines.push(`• ${short.whatToDo}`);
  lines.push('');
  lines.push('🔗 Full story:');
  lines.push(`${baseUrl}${short.fullStoryPath}`);
  lines.push('');
  lines.push('#MoneycalNews #FinanceIn60Seconds #IndianEconomy');
  return lines.join('\n');
}

/** Embed code for creators */
export function getShortEmbedCode(short: NewsShort): string {
  const url = `${baseUrl}${short.fullStoryPath}`;
  return `<div class="moneycal-news-short">
  <h4>🕒 Moneycal News – 60 Seconds</h4>
  <p><b>${short.headline.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</b></p>
  <p>Why it matters: ${short.whyItMatters.slice(0, 2).join('; ')}</p>
  <a href="${url}">Read full story</a>
  <small>Powered by <a href="${baseUrl}">Moneycal</a></small>
</div>`;
}

// Pre-built shorts derived from existing news (contentRegistry)
// In production you could generate these from CMS or AI
export const newsShortsList: NewsShort[] = [
  {
    id: 'economy-budget-2026-live-2025',
    slug: 'budget-2026-live-updates-sansad-tax-relief-2025',
    category: 'economy',
    headline: 'Budget 2026 LIVE: संसद में बजट कल पेश — आम जनता को बड़ी राहत, टैक्स/उपयोगी घोषणाएं',
    whyItMatters: [
      'Tax relief and new schemes for common people',
      'Direct impact on savings and investments',
      'Policy clarity for the year ahead',
    ],
    keyNumbers: ['Budget day in Parliament', 'Tax slabs and exemptions in focus'],
    whatToDo: 'Wait for official announcements; avoid speculative moves. Review tax planning after budget.',
    fullStoryLink: `${baseUrl}/news/economy/budget-2026-live-updates-sansad-tax-relief-2025`,
    fullStoryPath: '/news/economy/budget-2026-live-updates-sansad-tax-relief-2025',
    datePublished: '2025-01-31T10:00:00+05:30',
    readTimeSeconds: 45,
  },
  {
    id: 'markets-sensex-nifty-1200-points-2025',
    slug: 'sensex-nifty-1200-points-market-highlights-2025',
    category: 'markets',
    headline: 'सेंसेक्स 1200 अंकों से ऊपर बंद — बाजार में तेजी की वजहें',
    whyItMatters: [
      'Strong day for equity investors',
      'FII/DII flows and sector rotation in focus',
      'Technical levels matter for short-term traders',
    ],
    keyNumbers: ['Sensex +1200 points', 'Nifty above key resistance'],
    whatToDo: 'Avoid chasing; stick to SIPs. Review portfolio if overexposed to a single sector.',
    fullStoryLink: `${baseUrl}/news/markets/sensex-nifty-1200-points-market-highlights-2025`,
    fullStoryPath: '/news/markets/sensex-nifty-1200-points-market-highlights-2025',
    datePublished: '2025-01-31T09:00:00+05:30',
    readTimeSeconds: 40,
  },
  {
    id: 'nifty-50-record-high-fii-inflows-november-2025',
    slug: 'nifty-50-record-high-fii-inflows-november-2025',
    category: 'markets',
    headline: 'Nifty 50 hits record high as FII inflows cross Rs 50,000 Cr (Nov 2025)',
    whyItMatters: [
      'FII confidence in Indian markets',
      'Liquidity supports valuations',
      'Global flows matter for sustained rally',
    ],
    keyNumbers: ['FII inflows: Rs 50,000+ Cr', 'Nifty at all-time high'],
    whatToDo: 'Stay invested with discipline; avoid lump-sum bets at peaks. Diversify across caps.',
    fullStoryLink: `${baseUrl}/news/markets/nifty-50-record-high-fii-inflows-november-2025`,
    fullStoryPath: '/news/markets/nifty-50-record-high-fii-inflows-november-2025',
    datePublished: '2025-11-02T14:30:00+05:30',
    readTimeSeconds: 45,
  },
  {
    id: 'markets-banking-regulation-policy-2025',
    slug: 'banking-regulation-rbi-policy-digital-lending-norms-reforms-2025',
    category: 'rbi',
    headline: 'RBI ने Digital Lending Rules सख्त किए — नीति बदलाव और बैंकिंग रेगुलेशन',
    whyItMatters: [
      'Stricter digital lending norms protect borrowers',
      'Banks and NBFCs need to comply',
      'Borrowing costs and eligibility may change',
    ],
    keyNumbers: ['RBI policy update', 'Digital lending guidelines'],
    whatToDo: 'Prefer RBI-registered lenders. Check loan agreements for hidden charges.',
    fullStoryLink: `${baseUrl}/news/markets/banking-regulation-rbi-policy-digital-lending-norms-reforms-2025`,
    fullStoryPath: '/news/markets/banking-regulation-rbi-policy-digital-lending-norms-reforms-2025',
    datePublished: '2025-11-09T01:00:00+05:30',
    readTimeSeconds: 50,
  },
  {
    id: 'economy-climate-change-impact-2025',
    slug: 'climate-change-economic-impact-agriculture-gdp-carbon-tax-india-2025',
    category: 'economy',
    headline: 'जलवायु परिवर्तन का आर्थिक असर: Agriculture, GDP — क्या करें?',
    whyItMatters: [
      'Climate risk affects sectors and inflation',
      'Carbon tax and policies may impact prices',
      'Long-term portfolio impact',
    ],
    keyNumbers: ['Economic impact on agriculture & GDP', 'Carbon tax discussions'],
    whatToDo: 'Consider climate-aware funds for long term; stay diversified.',
    fullStoryLink: `${baseUrl}/news/economy/climate-change-economic-impact-agriculture-gdp-carbon-tax-india-2025`,
    fullStoryPath: '/news/economy/climate-change-economic-impact-agriculture-gdp-carbon-tax-india-2025',
    datePublished: '2025-11-08T23:00:00+05:30',
    readTimeSeconds: 45,
  },
  {
    id: 'business-top-companies-revenue-2025',
    slug: 'top-companies-revenue-trends-tcs-reliance-hdfc-tata-adani-2025',
    category: 'business',
    headline: 'प्रमुख कंपनियों की राजस्व: Reliance ₹9L Cr, TCS ₹2.4L Cr — कौन बढ़ा, कौन गिरा?',
    whyItMatters: [
      'Revenue trends show sector health',
      'Stock picking and sector allocation',
      'Earnings season insight',
    ],
    keyNumbers: ['Reliance, TCS, HDFC, Tata, Adani revenue trends'],
    whatToDo: 'Use for context, not timing. Align SIPs with long-term winners.',
    fullStoryLink: `${baseUrl}/news/business/top-companies-revenue-trends-tcs-reliance-hdfc-tata-adani-2025`,
    fullStoryPath: '/news/business/top-companies-revenue-trends-tcs-reliance-hdfc-tata-adani-2025',
    datePublished: '2025-11-09T02:00:00+05:30',
    readTimeSeconds: 50,
  },
  {
    id: 'tech-tech-ipo-boom-2025',
    slug: 'tech-ipo-boom-zomato-paytm-nykaa-listing-gains-losses-2025',
    category: 'tech-business',
    headline: 'टेक IPO: Zomato +100%, Paytm -70% — किसमें Invest करें? (2025)',
    whyItMatters: [
      'IPO performance varies widely',
      'Listing gains are not guaranteed',
      'Long-term view matters more than listing pop',
    ],
    keyNumbers: ['Zomato, Paytm, Nykaa listing performance'],
    whatToDo: 'Avoid FOMO; apply only if you understand the business and can hold long term.',
    fullStoryLink: `${baseUrl}/news/tech-business/tech-ipo-boom-zomato-paytm-nykaa-listing-gains-losses-2025`,
    fullStoryPath: '/news/tech-business/tech-ipo-boom-zomato-paytm-nykaa-listing-gains-losses-2025',
    datePublished: '2025-11-08T20:00:00+05:30',
    readTimeSeconds: 45,
  },
  {
    id: 'startups-tier3-city-funding-2025',
    slug: 'tier-3-city-startup-funding-jaipur-indore-coimbatore-ecosystem-2025',
    category: 'startups',
    headline: 'फंडिंग में तीसरा स्थान: Jaipur, Indore Startups ने ₹2,000 Cr Raise किया!',
    whyItMatters: [
      'Tier-3 ecosystems getting capital',
      'Job and entrepreneurship opportunities',
      'Real estate and local economy impact',
    ],
    keyNumbers: ['₹2,000 Cr raised', 'Jaipur, Indore, Coimbatore'],
    whatToDo: 'Watch for local job and business opportunities; invest via diversified funds.',
    fullStoryLink: `${baseUrl}/news/startups/tier-3-city-startup-funding-jaipur-indore-coimbatore-ecosystem-2025`,
    fullStoryPath: '/news/startups/tier-3-city-startup-funding-jaipur-indore-coimbatore-ecosystem-2025',
    datePublished: '2025-11-09T03:00:00+05:30',
    readTimeSeconds: 40,
  },
  {
    id: 'markets-sectors-investors-exiting-2025',
    slug: 'sectors-investors-exiting-pharma-fmcg-it-valuation-concerns-2025',
    category: 'markets',
    headline: 'निवेशकों ने कौन-से सेक्टर छोड़े? Pharma -20%, FMCG Overvalued',
    whyItMatters: [
      'Sector rotation affects returns',
      'Valuation concerns in some sectors',
      'Rebalancing opportunity',
    ],
    keyNumbers: ['Pharma -20%', 'FMCG valuation concerns'],
    whatToDo: 'Don’t exit in panic; rebalance if one sector is >25% of portfolio.',
    fullStoryLink: `${baseUrl}/news/markets/sectors-investors-exiting-pharma-fmcg-it-valuation-concerns-2025`,
    fullStoryPath: '/news/markets/sectors-investors-exiting-pharma-fmcg-it-valuation-concerns-2025',
    datePublished: '2025-11-08T21:00:00+05:30',
    readTimeSeconds: 45,
  },
  {
    id: 'business-high-debt-companies-2025',
    slug: 'high-debt-companies-risk-vodafone-idea-suzlon-debt-equity-ratio-2025',
    category: 'business',
    headline: 'उच्च कर्ज वाली कंपनियां: Vodafone ₹2L Cr Debt — Debt-to-Equity Red Flag?',
    whyItMatters: [
      'High debt increases default risk',
      'Stock volatility in stressed names',
      'Bond and equity selection',
    ],
    keyNumbers: ['Vodafone Idea, Suzlon debt levels', 'Debt-to-equity 5+'],
    whatToDo: 'Avoid concentrated bets in high-debt firms; prefer low-debt quality names.',
    fullStoryLink: `${baseUrl}/news/business/high-debt-companies-risk-vodafone-idea-suzlon-debt-equity-ratio-2025`,
    fullStoryPath: '/news/business/high-debt-companies-risk-vodafone-idea-suzlon-debt-equity-ratio-2025',
    datePublished: '2025-11-08T22:00:00+05:30',
    readTimeSeconds: 50,
  },
];

const CUSTOM_SHORTS_STORAGE_KEY = 'moneycal_custom_shorts';

/** Get admin-published shorts from localStorage (same origin). */
export function getCustomShorts(): NewsShort[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_SHORTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as NewsShort[];
    return Array.isArray(parsed) ? parsed.map((s) => ({ ...s, source: 'custom' as const })) : [];
  } catch {
    return [];
  }
}

/** Save custom shorts to localStorage (append one or replace list). */
export function saveCustomShort(short: NewsShort): void {
  const list = getCustomShorts();
  const existing = list.findIndex((s) => s.id === short.id);
  const next = [...list];
  if (existing >= 0) next[existing] = { ...short, source: 'custom' };
  else next.unshift({ ...short, source: 'custom' });
  localStorage.setItem(CUSTOM_SHORTS_STORAGE_KEY, JSON.stringify(next));
}

/** All shorts: custom (admin-added) first, then static. Use this in UI. Fallback when no fetch. */
export function getNewsShorts(): NewsShort[] {
  const custom = getCustomShorts();
  const staticList = newsShortsList.map((s) => ({ ...s, source: 'static' as const }));
  return [...custom, ...staticList];
}

const CUSTOM_SHORTS_JSON_URL = '/custom-shorts.json';

/** Fetch custom shorts from deployed JSON (GitHub → deploy). Falls back to localStorage then static. */
export async function fetchCustomShortsFromServer(): Promise<NewsShort[]> {
  if (typeof window === 'undefined') return [];
  try {
    const base = typeof window !== 'undefined' && window.location?.origin ? window.location.origin : '';
    const res = await fetch(base + CUSTOM_SHORTS_JSON_URL, { cache: 'no-store' });
    if (!res.ok) return getCustomShorts();
    const data = await res.json();
    const list = Array.isArray(data) ? data : (data?.shorts && Array.isArray(data.shorts) ? data.shorts : []);
    return list.map((s: NewsShort) => ({ ...s, source: 'custom' as const }));
  } catch {
    return getCustomShorts();
  }
}

/** Merged list: server custom first, then static. */
export function mergeShorts(serverCustom: NewsShort[]): NewsShort[] {
  const staticList = newsShortsList.map((s) => ({ ...s, source: 'static' as const }));
  return [...serverCustom, ...staticList];
}

/** Slugify headline for auto slug (supports English + Hindi). */
export function slugifyHeadline(headline: string): string {
  return headline
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}\-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'news-short';
}

/** Category filter options for home section (Latest + RBI, Markets, Loans, Crypto, Tax) */
export const newsShortsFilterCategories: { id: NewsShortCategory | 'latest'; label: string }[] = [
  { id: 'latest', label: 'Latest' },
  { id: 'rbi', label: 'RBI' },
  { id: 'markets', label: 'Markets' },
  { id: 'loans', label: 'Loans' },
  { id: 'tax', label: 'Tax' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'economy', label: 'Economy' },
  { id: 'business', label: 'Business' },
  { id: 'startups', label: 'Startups' },
  { id: 'tech-business', label: 'Tech' },
];
