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
  /** Optional paragraph-style summary (short, concise, no bullets). When set, UI shows these instead of whyItMatters/keyNumbers. */
  summaryParagraphs?: string[];
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
    id: 'term-1cr-399-month-2026',
    slug: 'term-1cr-399-month',
    category: 'personal-finance',
    headline: '₹1 Crore Term Insurance सिर्फ ₹399/महीना? ये Calculator सच्चाई दिखाएगा',
    whyItMatters: [
      'ज़्यादातर लोग agents से महंगा “investment + insurance” प्लान ले लेते हैं, जबकि pure term plan में ₹1 करोड़ cover बहुत कम premium में मिल सकता है।',
      'फ्री calculator से आप देख सकते हैं कि आपकी age पर सही premium कितना होना चाहिए — इससे overpaying और गलत product से बचा जा सकता है।',
    ],
    keyNumbers: ['₹1 crore cover', '₹399/month* (young, healthy non-smoker)', 'Pure term plan'],
    whatToDo: 'पहले calculator से अपना सही premium देखिए, फिर ही कोई plan खरीदिए; combo “insurance + saving” को default choice मत बनाइए।',
    summaryParagraphs: [
      '₹1 करोड़ term insurance कई लोगों के लिए ₹400–600/महीना range में possible है, लेकिन bank और agents ज़्यादातर महंगे plans push करते हैं।',
      'इस short से जुड़े full article में step-by-step बताया गया है कि term calculator कैसे use करें और सही cover कैसे चुनें।',
      'What to do: फ्री calculator से premium compare करें, फिर pure term + अलग investment चुनें।',
    ],
    fullStoryLink: `${baseUrl}/blog/1-crore-term-insurance-399-per-month-calculator`,
    fullStoryPath: '/blog/1-crore-term-insurance-399-per-month-calculator',
    datePublished: '2026-02-05T08:30:00+05:30',
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[0],
    authorId: 'vikram',
    source: 'static',
  },
  {
    id: 'term-secret-90-indians-2026',
    slug: 'term-secret-90-indians',
    category: 'personal-finance',
    headline: 'Term Insurance का Secret जो 90% Indians नहीं जानते (Free Calculator Inside)',
    whyItMatters: [
      'ज़्यादातर लोग life insurance को “saving plan” समझते हैं और real protection यानी pure term cover ही नहीं लेते।',
      'Free calculator दिखाता है कि pure term लेकर और बाकी पैसा अलग invest करके आप बेहतर protection + returns पा सकते हैं।',
    ],
    keyNumbers: ['10–15× annual income', 'Pure term vs endowment', 'Free calculator'],
    whatToDo: 'अपने existing policies की तुलना pure term premium से कीजिए और जरूरत हो तो extra term cover लें, saving/investment के लिए अलग product चुनें।',
    summaryParagraphs: [
      'इस short से जुड़े article में समझाया गया है कि “Buy term, invest the rest” क्यों ज़्यादातर Indians के लिए बेहतर strategy है।',
      'Free calculator से आप देख पाएंगे कि आपकी income पर कितना cover और approx premium होना चाहिए।',
      'What to do: existing policies review करें, under-insured हैं तो term बढ़ाएँ, overpay कर रहे हैं तो strategy बदलें।',
    ],
    fullStoryLink: `${baseUrl}/blog/term-insurance-secret-90-percent-indians-dont-know-calculator`,
    fullStoryPath: '/blog/term-insurance-secret-90-percent-indians-dont-know-calculator',
    datePublished: '2026-02-05T08:40:00+05:30',
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[1],
    authorId: 'saurabh-kumar',
    source: 'static',
  },
  {
    id: 'term-premium-3x-higher-2026',
    slug: 'term-premium-3x-higher',
    category: 'personal-finance',
    headline: 'Shock: आपका Term Plan Premium शायद 3× ज़्यादा है जितना होना चाहिए!',
    whyItMatters: [
      'बहुत से लोग “life insurance” के नाम पर endowment/ULIP ले चुके हैं जिनका premium pure term से 2–3 गुना ज़्यादा होता है।',
      'एक simple calculator comparison से पता चल सकता है कि आप सच में कितना overpay कर रहे हैं — और इसे कैसे ठीक करें।',
    ],
    keyNumbers: ['2–3× higher premium', 'Same या कम sum assured', 'Online pure term option'],
    whatToDo: 'अपने policy का premium और sum assured note करें, फिर free term calculator से तुलना करके देखें कि pure term में कितना देना पड़ता; उसके बाद strategy बदलें।',
    summaryParagraphs: [
      'इस article में तीन main reasons explain हैं जिनकी वजह से term premium ज़्यादा होता है: wrong product, high-commission channel और late purchase।',
      'Calculator से मिला “fair” premium range आपके लिए benchmark बन जाता है — इससे ऊपर दे रहे हैं तो rethink की ज़रूरत है।',
      'What to do: extra pure term cover लें, महंगे combo products में fresh investment रोकें और future में online/direct term prefer करें।',
    ],
    fullStoryLink: `${baseUrl}/blog/term-plan-premium-3x-higher-than-should-be-calculator`,
    fullStoryPath: '/blog/term-plan-premium-3x-higher-than-should-be-calculator',
    datePublished: '2026-02-05T08:50:00+05:30',
    readTimeSeconds: 55,
    imageUrl: DISCOVER_IMAGES[2],
    authorId: 'harsh-raj',
    source: 'static',
  },
  {
    id: 'how-much-term-insurance-need-2026',
    slug: 'how-much-term-need',
    category: 'personal-finance',
    headline: 'आपको वाकई कितनी Term Insurance चाहिए? ज़्यादातर लोग गलत अनुमान लगाते हैं!',
    whyItMatters: [
      'Under-insured होने से family future risky हो जाता है, over-insured होने से बेवजह premium burn होता है।',
      'Simple formula (10–15× income + loans + goals) और calculator से आप exact संख्या के काफ़ी नज़दीक पहुँच सकते हैं।',
    ],
    keyNumbers: ['10–15× income rule', 'Loans + goals', 'Need-based cover'],
    whatToDo: 'अपनी income, loans और goals लिखिए; फिर article में बताई गई method और calculator से देखिए कि आपको कितना sum assured और term चाहिए।',
    summaryParagraphs: [
      'इस guide में “how much term insurance” का detailed, step-by-step जवाब है — सिर्फ़ round figure नहीं, need-based calculation।',
      'Calculator से तुरंत दिख जाता है कि selected sum assured और term के लिए approx premium क्या होगा और budget में है या नहीं।',
      'What to do: guess छोड़िए, calculation कीजिए; फिर उसी हिसाब से term plan choose कीजिए।',
    ],
    fullStoryLink: `${baseUrl}/blog/how-much-term-insurance-really-need-calculator`,
    fullStoryPath: '/blog/how-much-term-insurance-really-need-calculator',
    datePublished: '2026-02-05T09:00:00+05:30',
    readTimeSeconds: 55,
    imageUrl: DISCOVER_IMAGES[3],
    authorId: 'raushan-kumar',
    source: 'static',
  },
  {
    id: 'free-term-calculator-no-phone-2026',
    slug: 'free-term-calculator-no-phone',
    category: 'personal-finance',
    headline: 'Free Term Insurance Calculator — No Phone, No OTP, सिर्फ़ Instant Result!',
    whyItMatters: [
      'ज़्यादातर online calculators आपका mobile number मांगते हैं और फिर लगातार calls/messages आते हैं।',
      'No-phone, no-OTP calculator से आप आराम से premium compare कर सकते हैं, बिना किसी spam के।',
    ],
    keyNumbers: ['No phone/OTP', 'Instant estimate', 'Multiple scenarios'],
    whatToDo: 'Age, sum assured और term डालकर अलग-अलग scenarios check करें; फिर best quote के लिए insurer/aggregator चुनें।',
    summaryParagraphs: [
      'इस short से linked article में बताया गया है कि बिना phone number दिए term premium कैसे estimate करें और planning कैसे आसान हो जाती है।',
      'आप family के लिए भी अलग-अलग age और cover scenarios run कर सकते हैं, बिना किसी unwanted sales call के।',
      'What to do: पहले calculator से comfort लें, फिर actual खरीद insurer की site या trusted platform से करें।',
    ],
    fullStoryLink: `${baseUrl}/blog/free-term-insurance-calculator-no-phone-instant-results`,
    fullStoryPath: '/blog/free-term-insurance-calculator-no-phone-instant-results',
    datePublished: '2026-02-05T09:10:00+05:30',
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[0],
    authorId: 'vikram',
    source: 'static',
  },
  {
    id: 'rbi-mpc-rates-stable-today-2026',
    slug: 'rbi-mpc-rates-stable-today',
    category: 'rbi',
    headline: 'क्या RBI दरों को स्थिर रखेगा? MPC मीट आज शुरू',
    whyItMatters: [
      'RBI का MPC बैठक शुरू — India-US ट्रेड डील के बाद रेपो रेट स्थिर रखने की उम्मीद।',
      'हर निवेशक और कर्ज लेने वालों के लिए बड़ा मुद्दा।',
    ],
    keyNumbers: ['MPC meet', 'Repo rate', 'Loans & FD'],
    whatToDo: 'लोन/FD प्लान करें; पैनिक ट्रेड न करें।',
    summaryParagraphs: [
      'RBI की मौद्रिक नीति कमिटी (MPC) बैठक शुरू हो गई है। India-US ट्रेड डील के बाद रेपो रेट को स्थिर रखने की संभावना है। यह हर निवेशक और कर्ज लेने वालों के लिए बड़ा मुद्दा है।',
      'Key: MPC meet, repo rate, loans and FD impact.',
      'What to do: Plan loans/FD; do not panic-trade on outcome.',
    ],
    fullStoryLink: `${baseUrl}/news/economy/rbi-mpc-rates-stable-today-mpc-meet-starts-2026`,
    fullStoryPath: '/news/economy/rbi-mpc-rates-stable-today-mpc-meet-starts-2026',
    datePublished: '2026-01-31T08:00:00+05:30',
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
  {
    id: 'ai-tool-pressure-it-2026',
    slug: 'ai-tool-pressure-it-shares',
    category: 'tech-business',
    headline: 'नया AI टूल से भारतीय IT पर दबाव — Infosys, TCS शेयर नीचे?',
    whyItMatters: [
      'Infosys, TCS और अन्य IT शेयरों में गिरावट — नए AI टूल के प्रभाव से।',
      'टेक सेक्टर की कहानी अभी शुरू है।',
    ],
    keyNumbers: ['AI pressure', 'IT stocks', 'Infosys TCS'],
    whatToDo: 'पैनिक सेल न करें; SIP और डायवर्सिफिकेशन जारी रखें।',
    summaryParagraphs: [
      'नए AI टूल के प्रभाव से भारतीय IT कंपनियों पर दबाव बढ़ रहा है। Infosys, TCS और अन्य आईटी शेयरों में गिरावट का रुझान देखा जा रहा है — टेक सेक्टर की कहानी अभी शुरू है।',
      'Key: AI tools, IT sector, Infosys TCS.',
      'What to do: Do not panic sell; continue SIP and diversification.',
    ],
    fullStoryLink: `${baseUrl}/news/markets/ai-tool-pressure-indian-it-infosys-tcs-shares-down-2026`,
    fullStoryPath: '/news/markets/ai-tool-pressure-indian-it-infosys-tcs-shares-down-2026',
    datePublished: '2026-01-31T09:00:00+05:30',
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[2],
    source: 'static',
  },
  {
    id: 'blackrock-india-fink-2026',
    slug: 'blackrock-india-bullish',
    category: 'markets',
    headline: 'BlackRock का इंडिया पर बड़ा बयान — निवेशकों को भरोसा?',
    whyItMatters: [
      'BlackRock के सीईओ Larry Fink ने भारत को लेकर Bullish रुख अपनाया।',
      'विदेशी निवेशकों (FPI) के लिए बहुत बड़ी खबर।',
    ],
    keyNumbers: ['BlackRock', 'Larry Fink', 'FPI India'],
    whatToDo: 'लॉन्ग टर्म कॉन्फिडेंस; पोर्टफोलियो बैलेंस रखें।',
    summaryParagraphs: [
      'BlackRock के सीईओ Larry Fink ने भारत को लेकर बुलिश रुख अपनाया है। यह विदेशी निवेशकों (FPI) और इक्विटी बाजार के लिए बहुत बड़ी खबर है।',
      'Key: BlackRock, Larry Fink, FPI confidence.',
      'What to do: Long-term confidence; keep portfolio balanced.',
    ],
    fullStoryLink: `${baseUrl}/news/markets/blackrock-india-larry-fink-bullish-fpi-investors-2026`,
    fullStoryPath: '/news/markets/blackrock-india-larry-fink-bullish-fpi-investors-2026',
    datePublished: '2026-01-31T10:00:00+05:30',
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[1],
    source: 'static',
  },
  {
    id: 'sensex-nifty-weak-start-2026',
    slug: 'sensex-nifty-weak-today',
    category: 'markets',
    headline: 'Sensex-Nifty आज कमजोर शुरुआत — IT सेक्टर दबाव में',
    whyItMatters: [
      'BSE सेंसेक्स और निफ्टी ने लाल साइन के साथ ट्रेड किया।',
      'खासकर IT सेक्टर की कमजोरी के कारण।',
    ],
    keyNumbers: ['Sensex', 'Nifty', 'IT sector'],
    whatToDo: 'एक दिन के मूव पर पैनिक न करें; SIP जारी रखें।',
    summaryParagraphs: [
      'शेयर बाजार अपडेट: Sensex-Nifty आज कमजोर शुरुआत। BSE सेंसेक्स और नेशनल स्टॉक इंडेक्स निफ्टी ने लाल साइन के साथ ट्रेड किया है — खासकर IT सेक्टर की कमजोरी के कारण।',
      'Key: Sensex, Nifty, IT sector drag.',
      'What to do: Do not panic on one-day move; continue SIP.',
    ],
    fullStoryLink: `${baseUrl}/news/markets/sensex-nifty-weak-start-today-it-sector-2026`,
    fullStoryPath: '/news/markets/sensex-nifty-weak-start-today-it-sector-2026',
    datePublished: '2026-01-31T11:00:00+05:30',
    readTimeSeconds: 45,
    imageUrl: DISCOVER_IMAGES[3],
    source: 'static',
  },
  {
    id: 'gold-silver-surge-2026',
    slug: 'gold-silver-prices-surge',
    category: 'economy',
    headline: 'सोना-चांदी की कीमतों में भारी उछाल!',
    whyItMatters: [
      'सोना ₹7,000 तक ऊपर और चांदी ₹16,000 तक महंगी हुई।',
      'खुदरा निवेशकों को लगातार आकर्षित करता है।',
    ],
    keyNumbers: ['Gold ₹7K up', 'Silver ₹16K', 'Record levels'],
    whatToDo: 'थोड़ा-थोड़ा एंट्री; फिजिकल/SGB/ETF बैलेंस रखें।',
    summaryParagraphs: [
      'सोने और चांदी की कीमतों में तेज़ी से बड़े स्तर की वृद्धि हुई — सोना ₹7,000 तक ऊपर और चांदी ₹16,000 तक महंगी हुई। यह खुदरा निवेशकों को लगातार आकर्षित करता है।',
      'Key: Gold, silver, record prices.',
      'What to do: Small SIP-style entry; balance physical/SGB/ETF.',
    ],
    fullStoryLink: `${baseUrl}/news/markets/gold-silver-prices-surge-record-7000-16000-2026`,
    fullStoryPath: '/news/markets/gold-silver-prices-surge-record-7000-16000-2026',
    datePublished: '2026-01-31T12:00:00+05:30',
    readTimeSeconds: 50,
    imageUrl: DISCOVER_IMAGES[0],
    source: 'static',
  },
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
    summaryParagraphs: [
      'The Centre\'s borrowing plan is at a record level, yet bond and equity markets have not crashed. RBI and the government used staged bond issues and liquidity support to avoid a sell-off.',
      'Notable figures: record borrowing, stable bond yields, and RBI OMO support.',
      'What to do: Watch bond fund NAVs and bank stocks; stay diversified.',
    ],
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
    summaryParagraphs: [
      'The MPC may keep the repo rate unchanged, so loan rates could stay higher for longer. FD returns can remain attractive, while new home and car loans are unlikely to get cheaper soon.',
      'Key areas to watch: repo rate, FD rates, and loan EMI.',
      'What to do: Lock in FD tenors if you need fixed income; avoid over-leveraging on loans.',
    ],
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
    summaryParagraphs: [
      'The repo rate decision affects loans, FDs, bonds, and equity sentiment. Inflation and growth outlook will drive market direction.',
      'Focus on three things: MPC meet outcome, repo rate, and inflation versus growth.',
      'What to do: Do not panic-trade on the outcome; align your portfolio with your goal.',
    ],
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
    summaryParagraphs: [
      'Export-linked, bank, and infra stocks rallied after the U.S.–India trade deal news. The move gives a sentiment boost to equity, but avoid chasing; stick to discipline.',
      'Sectors in focus: export, banking, and infrastructure.',
      'What to do: Read the full story; do not chase. Use SIP and asset allocation.',
    ],
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
    summaryParagraphs: [
      'Bank stocks rallied ahead of the RBI MPC on rate-pause expectations and the NIM outlook. A one-day move is not a buy or sell signal; check your allocation.',
      'Watch: bank rally, RBI MPC outcome, and net interest margins.',
      'What to do: Avoid trading only on today\'s move; stick to your long-term plan.',
    ],
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
    summaryParagraphs: [
      'Fractal, Aye Finance, Clean Max and four more IPOs are lined up before February end, together worth around ₹14,000 crore. It is a big primary market moment; apply only after understanding each business and the risks.',
      'Notable names: Fractal, Aye Finance, Clean Max, and four others.',
      'What to do: Read the full list and apply in select names with limited exposure.',
    ],
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
    summaryParagraphs: [
      'A global tech sell-off hit Infosys, TCS and their peers, with falls of up to 8%. This is short-term volatility; long-term fundamentals still matter.',
      'Key points: sharp fall in IT names, Infosys and TCS among the worst hit, global selloff driving the move.',
      'What to do: Avoid panic selling; rebalance only if you are overexposed to IT.',
    ],
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
    summaryParagraphs: [
      'Before the opening bell, watch Nifty, sectors, FII/DII flows, crude, and the rupee. Stocks in focus include Bajaj Finance, Aditya Birla Capital, Castrol and a few more.',
      'Fifteen things to keep in mind before the market opens.',
      'What to do: Check the full list before market open; avoid chasing at the open.',
    ],
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
    summaryParagraphs: [
      'Indian bond yields opened lower after the trade deal; the offshore debt window is in focus. The FM said inflation will stay within the RBI band; LIC Housing has an Accumulate rating with a target of ₹525.',
      'Notable points: bond yields lower, LIC Housing Accumulate ₹525, inflation expected in RBI band.',
      'What to do: Read the macro update; watch bank and debt fund NAVs.',
    ],
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
    summaryParagraphs: [
      'The Delhi government budget for 2026-27 may bring new taxes or higher spending on infrastructure, health, and education. The outcome matters for local business and citizens.',
      'Focus areas: Delhi budget 2026-27, taxes, and spending priorities.',
      'What to do: Follow the full story for announcements; plan your finances accordingly.',
    ],
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
