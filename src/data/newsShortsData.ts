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

/** Canonical site URL – use for Google Discover full URLs and schema */
export const baseUrl = 'https://moneycal.in';

/** Default image for Discover (min 1200px wide recommended). Replace with 1200×630+ when available. */
export const DISCOVER_IMAGE_DEFAULT = `${baseUrl}/images/optimized/pexels-photo-7063778.jpeg`;

/** Full URL to this short's full story (Google Discover format). */
export function getShortFullUrl(short: NewsShort): string {
  return short.fullStoryLink || `${baseUrl}${short.fullStoryPath}`;
}

/** Today's date in ISO (for fresh content; use at build/render time) */
export function getNewsShortsTodayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T12:00:00+05:30`;
}

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

// Discover-ready image URLs (min 1200px wide recommended). Use for daily trend shorts.
export const DISCOVER_IMAGES = [
  `${baseUrl}/images/optimized/pexels-photo-7063778.jpeg`,
  `${baseUrl}/images/optimized/pexels-photo-6693661.jpeg`,
  `${baseUrl}/images/optimized/pexels-photo-6802042.jpeg`,
  `${baseUrl}/images/optimized/pexels-photo-7876708.jpeg`,
] as const;

// Pre-built shorts derived from existing news (contentRegistry)
// Add multiple shorts daily based on trends; each needs image + internal full-article link for Google Discover
export const newsShortsList: NewsShort[] = [
  // Viral 60-second shorts – human-friendly, Discover-eligible, internal full-story links
  {
    id: 'markets-rupee-explodes-7-year-rally-trade-deal-2026',
    slug: 'rupee-rally-trade-deal',
    category: 'markets',
    headline: '🔥 Rupee Hits 7-Year High — Markets SKYROCKET After India-US Deal!',
    whyItMatters: [
      'Indian markets jumped sharply and the rupee posted its strongest one-day gain in years.',
      'A major trade deal with the U.S. was just announced.',
      'Huge boost to investor sentiment and export expectations.',
    ],
    keyNumbers: ['Nifty +2.5% today', 'INR ~90.27 vs USD'],
    whatToDo: 'Keep an eye on export-linked stocks and foreign fund flows; sentiment is strong.',
    fullStoryLink: `${baseUrl}/news/markets/india-us-trade-deal-rupee-markets-surge-overnight-2026`,
    fullStoryPath: '/news/markets/india-us-trade-deal-rupee-markets-surge-overnight-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'markets-rupee-rallies-best-day-since-2018-2026',
    slug: 'rupee-rallies-best-day-since-2018',
    category: 'markets',
    headline: '🚀 Rupee RALLIES Like Crazy — Best Day Since 2018!',
    whyItMatters: [
      'The Indian rupee surged to its best performance in years.',
      'That’s fueling optimism on global flows and export-linked sectors.',
    ],
    keyNumbers: ['Rupee best day since 2018', 'Export-linked sectors in focus'],
    whatToDo: 'Watch export-linked sectors and global flow data for follow-through.',
    fullStoryLink: `${baseUrl}/news/markets/india-us-trade-deal-rupee-markets-surge-overnight-2026`,
    fullStoryPath: '/news/markets/india-us-trade-deal-rupee-markets-surge-overnight-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  {
    id: 'markets-nifty-surges-global-deals-confidence-2026',
    slug: 'nifty-rally-markets',
    category: 'markets',
    headline: '📈 NIFTY SOARS — Broad Rally Across Stocks Today!',
    whyItMatters: [
      'India’s blue-chip indices climbed strongly.',
      'Trade optimism lifted investor confidence — big momentum swing in markets.',
    ],
    keyNumbers: ['Nifty up ~3% today', 'Broad-based buying across sectors'],
    whatToDo: 'Watch auto, tech and export stocks for momentum; avoid chasing at the open.',
    fullStoryLink: `${baseUrl}/news/markets/wall-street-india-sensex-nifty-rally-trade-optimism-2026`,
    fullStoryPath: '/news/markets/wall-street-india-sensex-nifty-rally-trade-optimism-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[2],
    source: 'static',
  },
  {
    id: 'economy-budget-aftermath-rbi-support-markets-2026',
    slug: 'budget-market-reaction',
    category: 'economy',
    headline: '⚠️ Budget Aftermath Shocks Markets — RBI Steps In!',
    whyItMatters: [
      'After recent budget announcements, financial markets faced volatility.',
      'The RBI moved to support sentiment.',
      'Important for both fixed income and equity investors.',
    ],
    keyNumbers: ['Bond yields mixed', 'RBI support in focus'],
    whatToDo: 'Stay calm; watch for flight to safety and the RBI’s next steps.',
    fullStoryLink: `${baseUrl}/news/economy/budget-2026-india-markets-borderless-direct-fpi-route-2026`,
    fullStoryPath: '/news/economy/budget-2026-india-markets-borderless-direct-fpi-route-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[3],
    source: 'static',
  },
  // Hindi audience shorts – Feb 2026 (Fractal IPO, Varaha, MP debt, Abbott, Startups Jan, Groww, Emversity, GrowthPal, Fintech)
  {
    id: 'markets-fractal-analytics-ipo-size-cut-2026',
    slug: 'fractal-analytics-ipo-size-cut-40-valuation',
    category: 'markets',
    headline: '🔥 Fractal Analytics ने IPO साइज़ 40% काटा — फिर भी बड़ा वैल्यूएशन, रिटेल बिडिंग 9 फरवरी',
    whyItMatters: [
      'AI और एनालिटिक्स फर्म ने IPO साइज़ घटाकर लगभग $314M किया।',
      'वैल्यूएशन ~₹1,600 करोड़ बनाए रखा — भारत के AI स्टार्टअप बाजार का बड़ा संकेत।',
    ],
    keyNumbers: ['IPO साइज़ ~$314M', 'वैल्यूएशन ~₹1,600 Cr', 'रिटेल बिडिंग 9 फरवरी'],
    whatToDo: 'पूरी कहानी पढ़ें; निवेश से पहले रिस्क समझें।',
    fullStoryLink: `${baseUrl}/news/markets/fractal-analytics-ipo-size-price-band-india-2026`,
    fullStoryPath: '/news/markets/fractal-analytics-ipo-size-price-band-india-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'markets-fractal-ipo-price-band-2026',
    slug: 'fractal-analytics-ipo-price-band-857-900',
    category: 'markets',
    headline: '💥 Fractal Analytics ने IPO प्राइस बैंड लॉन्च किया — भारत का पहला प्योर AI IPO?',
    whyItMatters: [
      'प्राइस बैंड ₹857–₹900 प्रति शेयर तय।',
      'ग्लोबल इन्वेस्टर्स का फोकस भारत के AI इकोसिस्टम पर।',
    ],
    keyNumbers: ['₹857–₹900/sh', 'पहला प्योर AI Indian IPO'],
    whatToDo: 'फुल आर्टिकल पढ़ें और अपनी पोर्टफोलियो एक्सपोजर सीमित रखें।',
    fullStoryLink: `${baseUrl}/news/markets/fractal-analytics-ipo-size-price-band-india-2026`,
    fullStoryPath: '/news/markets/fractal-analytics-ipo-size-price-band-india-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  {
    id: 'startups-varaha-climate-tech-45m-2026',
    slug: 'varaha-climate-tech-45m-funding',
    category: 'startups',
    headline: '🌱 Varaha को $45M फंडिंग — क्लाइमेट टेक में बड़ा डेब्यू, भारत में ग्रीन कैपिटल',
    whyItMatters: [
      'WestBridge Capital की अगुआई में $45M राउंड।',
      'एग्रीकल्चरल कार्बन रिमूवल टेक — भारत में क्लाइमेट फोकस का संकेत।',
    ],
    keyNumbers: ['$45M', 'WestBridge लीड', 'कार्बन रिमूवल'],
    whatToDo: 'क्लाइमेट और ग्रीन सेक्टर की पूरी खबर पढ़ें।',
    fullStoryLink: `${baseUrl}/news/startups/varaha-climate-tech-45-million-funding-india-2026`,
    fullStoryPath: '/news/startups/varaha-climate-tech-45-million-funding-india-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[2],
    source: 'static',
  },
  {
    id: 'economy-mp-borrows-5200-crore-2026',
    slug: 'madhya-pradesh-borrows-5200-crore-debt',
    category: 'economy',
    headline: '🏛️ मध्य प्रदेश ने केंद्र से ₹5,200 करोड़ उधार लिए — कर्ज पर चर्चा',
    whyItMatters: [
      'राज्य का नया उधार बजट स्तर से ऊपर कुल कर्ज बढ़ा रहा है।',
      'चुनाव से पहले राजकोषीय दबाव और नीति बहस।',
    ],
    keyNumbers: ['₹5,200 Cr', 'केंद्र से उधार', 'कर्ज स्तर'],
    whatToDo: 'इकोनॉमी और पॉलिसी अपडेट्स के लिए न्यूज़ फॉलो करें।',
    fullStoryLink: `${baseUrl}/news/economy`,
    fullStoryPath: '/news/economy',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[3],
    source: 'static',
  },
  {
    id: 'markets-abbott-india-q3-results-feb12-2026',
    slug: 'abbott-india-board-meeting-q3-feb-12',
    category: 'markets',
    headline: '📅 Abbott India बोर्ड मीटिंग 12 फरवरी — Q3 रिजल्ट्स, कॉर्पोरेट फाइनेंस अपडेट',
    whyItMatters: [
      'बड़ी फार्मा प्लेयर से अचानक अर्निंग्स अपडेट।',
      'कॉर्पोरेट फाइनेंस और हेल्थकेयर सेक्टर वॉचर्स के लिए महत्वपूर्ण।',
    ],
    keyNumbers: ['12 फरवरी', 'Q3 रिजल्ट्स', 'Abbott India'],
    whatToDo: 'मार्केट्स और इकोनॉमी न्यूज़ से जुड़े रहें।',
    fullStoryLink: `${baseUrl}/news/markets`,
    fullStoryPath: '/news/markets',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 35,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'startups-india-january-930m-122-deals-2026',
    slug: 'indian-startups-january-2026-funding-930m',
    category: 'startups',
    headline: '📈 जनवरी में भारतीय स्टार्टअप्स ने ~$930M उठाया — 122 डील्स, साल भर में सबसे ज़्यादा',
    whyItMatters: [
      'मैक्रो स्लोडाउन के बावजूद जनवरी में करीब 122 फंडिंग डील्स।',
      'अर्ली-स्टेज इन्वेस्टर्स ने एक्टिविटी बनाए रखी।',
    ],
    keyNumbers: ['~$930M', '122 डील्स', 'जनवरी 2026'],
    whatToDo: 'स्टार्टअप और फंडिंग ट्रेंड्स की पूरी रिपोर्ट पढ़ें।',
    fullStoryLink: `${baseUrl}/news/startups`,
    fullStoryPath: '/news/startups',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  {
    id: 'markets-groww-global-asset-manager-mf-2026',
    slug: 'groww-global-asset-manager-mutual-fund',
    category: 'markets',
    headline: '📊 Groww ग्लोबल एसेट मैनेजर के साथ म्यूचुअल फंड बिजनेस में — पर्सनल फाइनेंस के लिए बड़ी खबर',
    whyItMatters: [
      'रिगुलेटरी फाइलिंग में US एसेट मैनेजर के साथ स्ट्रैटेजिक डील।',
      'भारत के एसेट मैनेजमेंट सीन को बूस्ट।',
    ],
    keyNumbers: ['Groww', 'म्यूचुअल फंड', 'ग्लोबल पार्टनर'],
    whatToDo: 'निवेश और MF अपडेट्स के लिए न्यूज़ और टूल्स चेक करें।',
    fullStoryLink: `${baseUrl}/news/markets`,
    fullStoryPath: '/news/markets',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[2],
    source: 'static',
  },
  {
    id: 'startups-emversity-30m-premji-invest-2026',
    slug: 'emversity-30-million-premji-invest',
    category: 'startups',
    headline: '💼 Emversity ने $30M उठाया — Premji Invest लीड, एजुकेशन टेक देशभर स्केल',
    whyItMatters: [
      'भारत में एजुकेशन टेक फंडिंग की बड़ी खबर।',
      'कैपिटल से नेशनवाइड कैंपस तक स्केल।',
    ],
    keyNumbers: ['$30M', 'Premji Invest', 'एजुकेशन टेक'],
    whatToDo: 'स्टार्टअप और एजुकेशन सेक्टर न्यूज़ फॉलो करें।',
    fullStoryLink: `${baseUrl}/news/startups`,
    fullStoryPath: '/news/startups',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[3],
    source: 'static',
  },
  {
    id: 'startups-growthpal-2-6m-ai-ma-2026',
    slug: 'growthpal-ai-ma-deal-platform-2-6m',
    category: 'startups',
    headline: '🚀 AI M&A प्लेटफॉर्म GrowthPal ने $2.6M उठाया — Ideaspring Capital लीड',
    whyItMatters: [
      'छोटा लेकिन न्यूज़ी राउंड; AI in कॉर्पोरेट डीलमेकिंग में सीड कैपिटल।',
      'भारत में AI-फोकस्ड स्टार्टअप्स पर इन्वेस्टर इंटरेस्ट।',
    ],
    keyNumbers: ['$2.6M', 'Ideaspring', 'AI M&A'],
    whatToDo: 'टेक और स्टार्टअप न्यूज़ पढ़ें।',
    fullStoryLink: `${baseUrl}/news/startups`,
    fullStoryPath: '/news/startups',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 35,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'startups-fintech-funding-dip-2025-early-stage-2026',
    slug: 'fintech-funding-dip-2025-early-stage-trend',
    category: 'startups',
    headline: '📉 2025 में फिनटेक फंडिंग में गिरावट, लेकिन अर्ली-स्टेज ने ट्रेंड तोड़ा',
    whyItMatters: [
      'Tracxn डेटा: पिछले साल कुल फिनटेक फंडिंग में 17% गिरावट।',
      'अर्ली-स्टेज डील्स बढ़े — भारत के स्टार्टअप फंडिंग हेल्थ का न्यूअंस्ड नैरेटिव।',
    ],
    keyNumbers: ['17% डिप', 'अर्ली-स्टेज ग्रोथ', 'फिनटेक'],
    whatToDo: 'फंडिंग विंटर और स्टार्टअप सर्वाइवल गाइड पढ़ें।',
    fullStoryLink: `${baseUrl}/news/startups/bharat-startup-funding-gir-gayi-2025-kaise-bachein-hindi-guide`,
    fullStoryPath: '/news/startups/bharat-startup-funding-gir-gayi-2025-kaise-bachein-hindi-guide',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  // Market Movers, IPOs, Sensex/Nifty LIVE, IT plunge, Trade Deal, Deepinder Goyal, Stocks to Watch, macro/debt, clickbait (Feb 2026)
  {
    id: 'markets-setup-top-15-opening-bell-feb-2026',
    slug: 'market-setup-top-15-opening-bell-feb-2026',
    category: 'markets',
    headline: '📈 Market Setup Today — Top 15 Things Before Opening Bell!',
    whyItMatters: [
      'What traders should watch before markets open: Nifty, sectors, data cues.',
      'Great for daily trading prep and YouTube/Reels content.',
    ],
    keyNumbers: ['Top 15 cues', 'Nifty, sectors', 'Stocks to Watch'],
    whatToDo: 'Read full market setup; check FII/DII, crude, rupee before bell.',
    fullStoryLink: `${baseUrl}/news/markets/market-setup-top-15-opening-bell-stocks-to-watch-feb-2026`,
    fullStoryPath: '/news/markets/market-setup-top-15-opening-bell-stocks-to-watch-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'markets-seven-ipos-14000-cr-feb-2026',
    slug: 'seven-ipos-14000-crore-feb-2026',
    category: 'markets',
    headline: '7 IPOs Worth ₹14,000 Cr COMING in Feb — Don\'t Miss These Stocks!',
    whyItMatters: [
      'Fractal Analytics, Aye Finance, Clean Max Enviro Energy & more.',
      'Big for listings news and primary market watchers.',
    ],
    keyNumbers: ['~₹14,000 Cr', '7 IPOs', 'Feb end'],
    whatToDo: 'Read full IPO list; apply only after understanding business and risk.',
    fullStoryLink: `${baseUrl}/news/markets/seven-ipos-14000-crore-feb-end-2026`,
    fullStoryPath: '/news/markets/seven-ipos-14000-crore-feb-end-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  {
    id: 'markets-sensex-nifty-live-flat-volatility-feb-2026',
    slug: 'sensex-nifty-live-flat-volatility',
    category: 'markets',
    headline: 'Sensex, Nifty LIVE – Markets trade flat with volatility; IT, bank stocks active',
    whyItMatters: [
      'Fresh market sentiment snapshot for the day.',
      'IT and bank stocks driving activity.',
    ],
    keyNumbers: ['Flat to volatile', 'IT, bank active'],
    whatToDo: 'Follow live prices; avoid panic selling on intraday moves.',
    fullStoryLink: `${baseUrl}/news/markets/market-setup-top-15-opening-bell-stocks-to-watch-feb-2026`,
    fullStoryPath: '/news/markets/market-setup-top-15-opening-bell-stocks-to-watch-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[2],
    source: 'static',
  },
  {
    id: 'markets-it-stocks-plunge-8-percent-feb-2026',
    slug: 'it-stocks-crash-8-percent-infosys-tcs',
    category: 'markets',
    headline: 'IT Stocks CRASH Up to 8% — What This Means for Your Portfolio!',
    whyItMatters: [
      'Global tech sell-off hits Infosys, TCS & peers — huge interest for tech investors.',
      'Short-term volatility; long-term fundamentals still matter.',
    ],
    keyNumbers: ['Up to 8% fall', 'Infosys, TCS', 'Global tech selloff'],
    whatToDo: 'Avoid panic selling; rebalance if overexposed to IT.',
    fullStoryLink: `${baseUrl}/news/markets/indian-it-stocks-plunge-8-percent-global-selloff-2026`,
    fullStoryPath: '/news/markets/indian-it-stocks-plunge-8-percent-global-selloff-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[3],
    source: 'static',
  },
  {
    id: 'markets-india-us-trade-deal-live-impact-feb-2026',
    slug: 'india-us-trade-deal-live-market-impact',
    category: 'markets',
    headline: 'India-US Trade Deal live updates & potential market impact',
    whyItMatters: [
      'Ongoing trade pact news that could move stocks, commodities & tariffs.',
      'Rupee and export-linked sectors in focus.',
    ],
    keyNumbers: ['Trade deal', 'Stocks, commodities', 'Tariffs'],
    whatToDo: 'Follow full story for live updates; watch export and bank stocks.',
    fullStoryLink: `${baseUrl}/news/markets/india-us-trade-deal-rupee-markets-surge-overnight-2026`,
    fullStoryPath: '/news/markets/india-us-trade-deal-rupee-markets-surge-overnight-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'business-deepinder-goyal-open-call-ex-employees-feb-2026',
    slug: 'deepinder-goyal-open-call-ex-employees-zomato',
    category: 'business',
    headline: 'Deepinder Goyal\'s open call to ex-employees — Zomato founder vibe + hiring trend',
    whyItMatters: [
      'Unique corporate/leadership finance story.',
      'Hiring and talent trends in focus.',
    ],
    keyNumbers: ['Zomato', 'Ex-employees', 'Hiring'],
    whatToDo: 'Watch for leadership and hiring trends in listed consumer/tech names.',
    fullStoryLink: `${baseUrl}/news/business`,
    fullStoryPath: '/news/business',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  {
    id: 'markets-stocks-to-watch-bajaj-aditya-birla-feb-2026',
    slug: 'stocks-to-watch-today-bajaj-finance-aditya-birla',
    category: 'markets',
    headline: 'Top Stocks to Watch Today (4 Feb) — Bajaj Finance, Aditya Birla + More!',
    whyItMatters: [
      'Bajaj Finance, Aditya Birla Capital, Castrol India, Aarti Drugs, V2 Retail in focus.',
      'Great for targeted trading videos or posts.',
    ],
    keyNumbers: ['Bajaj Finance', 'Aditya Birla Capital', 'Castrol, Aarti, V2 Retail'],
    whatToDo: 'Read full market setup; do not chase — stick to your plan.',
    fullStoryLink: `${baseUrl}/news/markets/market-setup-top-15-opening-bell-stocks-to-watch-feb-2026`,
    fullStoryPath: '/news/markets/market-setup-top-15-opening-bell-stocks-to-watch-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[2],
    source: 'static',
  },
  {
    id: 'economy-offshore-debt-window-trade-deal-rupee-feb-2026',
    slug: 'indian-corporates-offshore-debt-window-trade-deal',
    category: 'economy',
    headline: 'Indian corporates likely to tap offshore debt window after trade deal and rupee rally',
    whyItMatters: [
      'Lenders eye cheaper global funds — macro & debt markets in focus.',
      'Bond yields and bank margins affected.',
    ],
    keyNumbers: ['Offshore debt', 'Rupee rally', 'Cheaper global funds'],
    whatToDo: 'Read macro & debt article; watch bond yields and bank stocks.',
    fullStoryLink: `${baseUrl}/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026`,
    fullStoryPath: '/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[3],
    source: 'static',
  },
  {
    id: 'economy-inflation-rbi-tolerance-fm-sitharaman-feb-2026',
    slug: 'inflation-rbi-tolerance-fm-nirmala-sitharaman',
    category: 'economy',
    headline: 'Inflation to stay within RBI\'s tolerance — FM Nirmala Sitharaman',
    whyItMatters: [
      'FM says inflation won\'t overshoot policy band — useful for personal finance & market outlook.',
      'Rate cut expectations and bond market implications.',
    ],
    keyNumbers: ['RBI band', 'Inflation', 'FM statement'],
    whatToDo: 'Stay updated on CPI data; plan fixed income and equity allocation.',
    fullStoryLink: `${baseUrl}/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026`,
    fullStoryPath: '/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'economy-bond-yields-lower-trade-deal-feb-2026',
    slug: 'indian-bond-yields-open-lower-trade-deal',
    category: 'economy',
    headline: 'Bond Yields Fall After Trade Deal — BIG for Bank & Debt Investors!',
    whyItMatters: [
      'Indian bond yields open lower after trade deal finalisation.',
      'Big for debt markets, fixed-income investors & bank stocks view.',
    ],
    keyNumbers: ['Bond yields lower', 'Trade deal', 'Bank stocks'],
    whatToDo: 'Read macro article; consider duration and bank exposure.',
    fullStoryLink: `${baseUrl}/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026`,
    fullStoryPath: '/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  {
    id: 'markets-lic-housing-accumulate-525-target-feb-2026',
    slug: 'analyst-lic-housing-finance-accumulate-525',
    category: 'markets',
    headline: 'Analyst report: Accumulate LIC Housing Finance with ₹525 target',
    whyItMatters: [
      'Broker rating that traders love to discuss.',
      'Housing finance and NBFC sector in focus.',
    ],
    keyNumbers: ['₹525 target', 'Accumulate', 'LIC Housing Finance'],
    whatToDo: 'Do your own research; ratings are not buy/sell advice.',
    fullStoryLink: `${baseUrl}/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026`,
    fullStoryPath: '/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 35,
    imageUrl: DISCOVER_IMAGES[2],
    source: 'static',
  },
  {
    id: 'markets-technical-view-nifty-new-peaks-trade-pact-feb-2026',
    slug: 'technical-market-view-us-india-deal-nifty-peaks',
    category: 'markets',
    headline: 'Market Technicals Turn Bullish After Trade Pact — Nifty Eyes New Highs!',
    whyItMatters: [
      'US–India deal lifts bulls; great for chart/technical outlook videos or stories.',
      'Short-term sentiment and levels to watch.',
    ],
    keyNumbers: ['Nifty', 'New peaks', 'Trade pact'],
    whatToDo: 'Follow support/resistance; avoid overleveraging on momentum.',
    fullStoryLink: `${baseUrl}/news/markets/india-us-trade-deal-rupee-markets-surge-overnight-2026`,
    fullStoryPath: '/news/markets/india-us-trade-deal-rupee-markets-surge-overnight-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[3],
    source: 'static',
  },
  {
    id: 'economy-india-crude-imports-russian-oil-feb-2026',
    slug: 'indias-capacity-crude-imports-russian-oil-shrink',
    category: 'economy',
    headline: 'Exclusive: India\'s Crude Import Bill May Explode — Here\'s Why!',
    whyItMatters: [
      'India\'s capacity to manage crude imports even if Russian oil supplies shrink.',
      'Big macro + fiscal finance theme.',
    ],
    keyNumbers: ['Crude imports', 'Russian oil', 'Fiscal impact'],
    whatToDo: 'Watch OMC and energy stocks; follow economy section for updates.',
    fullStoryLink: `${baseUrl}/news/economy`,
    fullStoryPath: '/news/economy',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'economy-budget-2026-structural-growth-shift-feb-2026',
    slug: 'budget-2026-structural-growth-shift-opinion',
    category: 'economy',
    headline: 'Budget 2026 marks structural growth shift — High-engagement analysis',
    whyItMatters: [
      'Moneycontrol-style opinion: structural growth shift.',
      'High-engagement analysis piece for readers.',
    ],
    keyNumbers: ['Budget 2026', 'Structural shift', 'Growth'],
    whatToDo: 'Read full budget coverage; align long-term allocation with policy.',
    fullStoryLink: `${baseUrl}/news/economy/budget-2026-india-markets-borderless-direct-fpi-route-2026`,
    fullStoryPath: '/news/economy/budget-2026-india-markets-borderless-direct-fpi-route-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  {
    id: 'markets-stocks-to-watch-extended-castrol-aarti-v2-feb-2026',
    slug: 'stocks-to-watch-castrol-aarti-v2-retail',
    category: 'markets',
    headline: 'Stocks to Watch (extended) – Castrol India, Aarti Drugs, V2 Retail & more',
    whyItMatters: [
      'Adds more tickers to talk about for trading and content.',
      'Great for targeted posts and videos.',
    ],
    keyNumbers: ['Castrol India', 'Aarti Drugs', 'V2 Retail'],
    whatToDo: 'Read full market setup; avoid chasing single names.',
    fullStoryLink: `${baseUrl}/news/markets/market-setup-top-15-opening-bell-stocks-to-watch-feb-2026`,
    fullStoryPath: '/news/markets/market-setup-top-15-opening-bell-stocks-to-watch-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[2],
    source: 'static',
  },
  {
    id: 'economy-public-health-spending-low-budget-concern-feb-2026',
    slug: 'budget-concern-public-health-spending-low',
    category: 'economy',
    headline: 'Budget concern: Public health spending remains low despite increases',
    whyItMatters: [
      'Fiscal policy & social finance angle.',
      'Long-term sector and policy implications.',
    ],
    keyNumbers: ['Health spending', 'Budget', 'Fiscal'],
    whatToDo: 'Follow economy and budget analysis for policy impact.',
    fullStoryLink: `${baseUrl}/news/economy`,
    fullStoryPath: '/news/economy',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[3],
    source: 'static',
  },
  {
    id: 'economy-inflation-not-threat-fm-markets-react-feb-2026',
    slug: 'inflation-not-threat-fm-markets-react',
    category: 'economy',
    headline: 'Inflation Is Not a Threat Says FM — Markets React HARD!',
    whyItMatters: [
      'Clickbait-friendly headline for YouTube/Reels — inflation and market reaction.',
      'Personal finance & rate outlook content.',
    ],
    keyNumbers: ['FM', 'Inflation', 'Markets'],
    whatToDo: 'Read macro article; plan savings and investment accordingly.',
    fullStoryLink: `${baseUrl}/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026`,
    fullStoryPath: '/news/economy/macro-debt-bonds-inflation-rbi-lic-housing-feb-2026',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 40,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
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
