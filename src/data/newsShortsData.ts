/**
 * MoneyCal News Shorts — Inshorts-style 60-second finance news
 * One card per story: headline, why it matters, key numbers, what to do, full story link.
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
  fullStoryPath: string;
  datePublished: string;
  readTimeSeconds?: number;
  imageUrl?: string;
  videoUrl?: string;
  authorId?: string;
  source?: 'static' | 'custom';
}

export const baseUrl = 'https://moneycal.in';
export const DISCOVER_IMAGE_DEFAULT = `${baseUrl}/images/optimized/pexels-photo-7063778.jpeg`;

export const DISCOVER_IMAGES = [
  `${baseUrl}/images/optimized/pexels-photo-7063778.jpeg`,
  `${baseUrl}/images/optimized/pexels-photo-6693661.jpeg`,
  `${baseUrl}/images/optimized/pexels-photo-6802042.jpeg`,
  `${baseUrl}/images/optimized/pexels-photo-7876708.jpeg`,
] as const;

export function getShortFullUrl(short: NewsShort): string {
  return short.fullStoryLink || `${baseUrl}${short.fullStoryPath}`;
}

export function getNewsShortsTodayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T12:00:00+05:30`;
}

export function getShortAsText(short: NewsShort): string {
  const lines = [
    '🕒 MoneyCal News – 60 Seconds',
    '',
    '📌 ' + short.headline,
    '',
    '⚡ Why it matters:',
    ...short.whyItMatters.map((b) => `• ${b}`),
    '',
  ];
  if (short.keyNumbers?.length) {
    lines.push('📊 Key numbers:');
    short.keyNumbers.forEach((n) => lines.push(`• ${n}`));
    lines.push('');
  }
  lines.push('🧠 What should you do?');
  lines.push(`• ${short.whatToDo}`);
  lines.push('');
  lines.push('🔗 ' + `${baseUrl}${short.fullStoryPath}`);
  return lines.join('\n');
}

export function getShortEmbedCode(short: NewsShort): string {
  const url = `${baseUrl}${short.fullStoryPath}`;
  return `<div class="moneycal-news-short">
  <h4>🕒 MoneyCal News – 60 Seconds</h4>
  <p><b>${short.headline.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</b></p>
  <p>Why it matters: ${short.whyItMatters.slice(0, 2).join('; ')}</p>
  <a href="${url}">Read full story</a>
  <small>Powered by <a href="${baseUrl}">MoneyCal</a></small>
</div>`;
}

/** Inshorts-style tabs: Latest + category filters */
export const newsShortsFilterCategories: { id: NewsShortCategory | 'latest'; label: string }[] = [
  { id: 'latest', label: 'Latest' },
  { id: 'markets', label: 'Markets' },
  { id: 'economy', label: 'Economy' },
  { id: 'business', label: 'Business' },
  { id: 'startups', label: 'Startups' },
  { id: 'tech-business', label: 'Tech' },
  { id: 'rbi', label: 'RBI' },
  { id: 'personal-finance', label: 'Finance' },
];

/** Static list of shorts — Inshorts-style 60-second news */
export const newsShortsList: NewsShort[] = [
  {
    id: 'record-govt-borrowing-2026',
    slug: 'record-govt-borrowing-no-crash',
    category: 'economy',
    headline: 'RECORD Govt Borrowing Plan Without Market Crash — Here\'s How!',
    whyItMatters: [
      'Centre\'s borrowing plan is at a record level but bond and equity markets have not crashed.',
      'RBI and govt used staged bond issues and liquidity support to avoid a sell-off.',
    ],
    keyNumbers: ['Record borrowing', 'Bond yields stable', 'RBI OMO support'],
    whatToDo: 'Watch bond fund NAVs and bank stocks; stay diversified.',
    fullStoryLink: `${baseUrl}/news/economy/record-govt-borrowing-plan-without-market-crash-2026`,
    fullStoryPath: '/news/economy/record-govt-borrowing-plan-without-market-crash-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'rbi-pause-rate-cuts-2026',
    slug: 'rbi-pause-rate-cuts-loans-fd',
    category: 'economy',
    headline: 'RBI May Pause Rate Cuts — What It Means for Your Loans & FD Returns',
    whyItMatters: [
      'MPC may keep repo rate unchanged — loan rates stay higher for longer.',
      'FD returns can stay attractive; new home/car loans won\'t get cheaper soon.',
    ],
    keyNumbers: ['Repo rate', 'FD rates', 'Loan EMI'],
    whatToDo: 'Lock in FD tenors if you need fixed income; avoid over-leveraging on loans.',
    fullStoryLink: `${baseUrl}/news/economy/rbi-may-pause-rate-cuts-loans-fd-returns-2026`,
    fullStoryPath: '/news/economy/rbi-may-pause-rate-cuts-loans-fd-returns-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  {
    id: 'rbi-mpc-3-things-2026',
    slug: 'rbi-mpc-3-things-investors',
    category: 'markets',
    headline: 'RBI MPC Starts Today — 3 Things Every Investor Should Know',
    whyItMatters: [
      'Repo rate decision affects loans, FD, bonds and equity sentiment.',
      'Inflation and growth outlook will drive market direction.',
    ],
    keyNumbers: ['MPC meet', '3 things', 'Repo, inflation, growth'],
    whatToDo: 'Don\'t panic-trade on the outcome; align portfolio with your goal.',
    fullStoryLink: `${baseUrl}/news/markets/rbi-mpc-starts-today-3-things-every-investor-should-know-2026`,
    fullStoryPath: '/news/markets/rbi-mpc-starts-today-3-things-every-investor-should-know-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[2],
    source: 'static',
  },
  {
    id: 'top-5-stocks-us-india-trade-2026',
    slug: 'top-5-stocks-us-india-trade',
    category: 'markets',
    headline: 'Top 5 Stocks Surging After U.S.–India Trade News — Don\'t Miss These!',
    whyItMatters: [
      'Export-linked, bank and infra stocks rallied after trade deal news.',
      'Sentiment boost for equity; avoid chasing — stick to discipline.',
    ],
    keyNumbers: ['Top 5', 'US–India trade', 'Export, bank, infra'],
    whatToDo: 'Read full story; do not chase — use SIP and asset allocation.',
    fullStoryLink: `${baseUrl}/news/markets/top-5-stocks-surging-after-us-india-trade-news-2026`,
    fullStoryPath: '/news/markets/top-5-stocks-surging-after-us-india-trade-news-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[3],
    source: 'static',
  },
  {
    id: 'bank-stocks-rally-rbi-mpc-2026',
    slug: 'bank-stocks-rally-buy-sell',
    category: 'markets',
    headline: 'Bank Stocks Rally Before RBI MPC — Buy or Sell Today?',
    whyItMatters: [
      'Banks rallied ahead of MPC on rate-pause expectations and NIM outlook.',
      'One-day move is not a buy/sell signal — check your allocation.',
    ],
    keyNumbers: ['Bank rally', 'RBI MPC', 'NIM'],
    whatToDo: 'Avoid trading only on today\'s move; stick to long-term plan.',
    fullStoryLink: `${baseUrl}/news/markets/bank-stocks-rally-before-rbi-mpc-buy-or-sell-2026`,
    fullStoryPath: '/news/markets/bank-stocks-rally-before-rbi-mpc-buy-or-sell-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'seven-ipos-14k-cr-2026',
    slug: 'seven-ipos-feb-2026',
    category: 'markets',
    headline: '7 IPOs Worth ₹14,000 Cr COMING in Feb — Don\'t Miss These Stocks!',
    whyItMatters: [
      'Fractal, Aye Finance, Clean Max and four more IPOs before Feb end.',
      'Big primary market moment; apply only after understanding business and risk.',
    ],
    keyNumbers: ['~₹14,000 Cr', '7 IPOs', 'Fractal, Aye, Clean Max'],
    whatToDo: 'Read full list; apply in select names with limited exposure.',
    fullStoryLink: `${baseUrl}/news/markets/seven-ipos-14000-crore-feb-end-2026`,
    fullStoryPath: '/news/markets/seven-ipos-14000-crore-feb-end-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  {
    id: 'it-stocks-crash-8pc-2026',
    slug: 'it-stocks-crash-infosys-tcs',
    category: 'markets',
    headline: 'IT Stocks CRASH Up to 8% — What This Means for Your Portfolio!',
    whyItMatters: [
      'Global tech sell-off hit Infosys, TCS and peers.',
      'Short-term volatility; long-term fundamentals still matter.',
    ],
    keyNumbers: ['Up to 8% fall', 'Infosys, TCS', 'Global selloff'],
    whatToDo: 'Avoid panic selling; rebalance if overexposed to IT.',
    fullStoryLink: `${baseUrl}/news/markets/indian-it-stocks-plunge-8-percent-global-selloff-2026`,
    fullStoryPath: '/news/markets/indian-it-stocks-plunge-8-percent-global-selloff-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[2],
    source: 'static',
  },
  {
    id: 'market-setup-15-things-2026',
    slug: 'market-setup-opening-bell',
    category: 'markets',
    headline: 'Market Setup Today — Top 15 Things Before Opening Bell!',
    whyItMatters: [
      'Nifty, sectors, FII/DII, crude, rupee — what to watch before bell.',
      'Stocks to watch: Bajaj Finance, Aditya Birla Capital, Castrol, more.',
    ],
    keyNumbers: ['Top 15', 'Opening bell', 'Stocks to watch'],
    whatToDo: 'Check full list before market open; avoid chasing at open.',
    fullStoryLink: `${baseUrl}/news/markets/market-setup-top-15-opening-bell-stocks-to-watch-feb-2026`,
    fullStoryPath: '/news/markets/market-setup-top-15-opening-bell-stocks-to-watch-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[3],
    source: 'static',
  },
  {
    id: 'macro-bond-yields-lic-2026',
    slug: 'macro-bond-yields-lic-housing',
    category: 'economy',
    headline: 'Bond Yields Fall After Trade Deal — BIG for Bank & Debt Investors!',
    whyItMatters: [
      'Indian bond yields opened lower after trade deal; offshore debt window in focus.',
      'FM said inflation will stay in RBI band; LIC Housing Accumulate ₹525.',
    ],
    keyNumbers: ['Bond yields lower', 'LIC Housing ₹525', 'Inflation RBI band'],
    whatToDo: 'Read macro update; watch bank and debt fund NAVs.',
    fullStoryLink: `${baseUrl}/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026`,
    fullStoryPath: '/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'delhi-budget-2026-27-2026',
    slug: 'delhi-budget-big-changes',
    category: 'economy',
    headline: 'Delhi Budget 2026-27 Plans BIG Changes — New Taxes or Spending?',
    whyItMatters: [
      'Delhi government budget may bring new taxes or higher spending on infra, health, education.',
      'Matters for local business and citizens.',
    ],
    keyNumbers: ['Delhi budget', '2026-27', 'Taxes, spending'],
    whatToDo: 'Follow full story for announcements; plan finances accordingly.',
    fullStoryLink: `${baseUrl}/news/economy/delhi-budget-2026-27-plans-big-changes-new-taxes-spending-2026`,
    fullStoryPath: '/news/economy/delhi-budget-2026-27-plans-big-changes-new-taxes-spending-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
];

/** All shorts — custom (if any) first, then static. Use in UI. */
export function getNewsShorts(): NewsShort[] {
  const staticList = newsShortsList.map((s) => ({ ...s, source: 'static' as const }));
  if (typeof window === 'undefined') return staticList;
  const custom = getCustomShorts();
  return custom.length ? [...custom, ...staticList] : staticList;
}

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

/** Save custom short (for admin Add Shorts page). */
export function saveCustomShort(short: NewsShort): void {
  const list = getCustomShorts();
  const existing = list.findIndex((s) => s.id === short.id);
  const next = [...list];
  if (existing >= 0) next[existing] = { ...short, source: 'custom' };
  else next.unshift({ ...short, source: 'custom' });
  localStorage.setItem(CUSTOM_SHORTS_STORAGE_KEY, JSON.stringify(next));
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
