/**
 * MoneyCal News Shorts — Inshorts-style 60-second finance news
 * One card per story: headline, why it matters, key numbers, what to do, full story link.
 */

import {
  bulkNationalPolitical,
  bulkEconomyMarkets,
  bulkSports,
  bulkWorld,
  bulkEntertainment,
  bulkScience,
  bulkCurrentAffairsFeb2026,
} from './newsShortsBulk2026';

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
  source?: 'static' | 'custom' | 'feed';
}

/** Path to auto-updated shorts feed (Indian/Hindi news, updated every 2h). */
export const SHORTS_FEED_JSON_PATH = '/shorts-feed.json';

/** Sort shorts by date: latest (most recent) first, then older. Invalid/missing dates go to end. */
export function sortShortsByDateLatestFirst(shorts: NewsShort[]): NewsShort[] {
  return [...shorts].sort((a, b) => {
    const ta = new Date(a.datePublished).getTime();
    const tb = new Date(b.datePublished).getTime();
    const va = Number.isNaN(ta) ? 0 : ta;
    const vb = Number.isNaN(tb) ? 0 : tb;
    return vb - va;
  });
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

/** Inshorts-style tabs: Latest + category filters (full list for any UI) */
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

/** Simplified tabs for reel UI (Google-friendly, minimal) */
export const newsShortsReelTabs = newsShortsFilterCategories.slice(0, 6);

/** Static list of shorts — Inshorts-style 60-second news */
export const newsShortsList: NewsShort[] = [
  {
    id: 'term-2cr-620-calculator-hack-2026',
    slug: 'term-2crore-620-calculator-hack',
    category: 'personal-finance',
    headline: 'I Got ₹2 Crore Cover Paying Only ₹620 – The Calculator Hack Everyone Needs',
    whyItMatters: [
      'Pure term plan में ₹2 crore cover कई young, healthy non-smokers के लिए ₹600–800/month range में possible है — agents अक्सर ये नहीं बताते।',
      'Calculator hack = age, sum assured और term डालकर instant estimate लेना; फिर उसी range में online quotes compare करके buy करना।',
    ],
    whatToDo: 'Free term calculator से अपने profile के लिए ₹2 Cr cover का premium देखें; अगर आप ज्यादा दे रहे हैं तो pure term switch या top-up करें।',
    summaryParagraphs: [
      'बहुत से लोग मानते हैं कि ₹2 crore term cover महंगा होगा, लेकिन सच ये है कि healthy 25–35 साल के non-smoker के लिए कई insurers ₹600–800 प्रति महीने में ही ऐसा cover दे देते हैं। ट्रिक ये है कि आप पहले एक free term insurance calculator में अपनी age, desired sum assured (₹2 Cr) और term (e.g. 35 years) डालें — बिना phone number या OTP के instant estimate मिल जाता है। इस estimate को benchmark मानकर आप 2–3 insurers से actual quote ले सकते हैं और सबसे सही premium पर buy कर सकते हैं।',
      'जो लोग पहले से endowment या ULIP ले चुके हैं, वो अक्सर same cover के लिए 2–3 गुना ज्यादा premium दे रहे होते हैं। Calculator hack से आप पता लगा सकते हैं कि आपको “सही” दर पर कितना premium देना चाहिए; अगर current policy ज्यादा है तो extra pure term लेकर gap पूरा करें और नए पैसे costlier product में न डालें।',
    ],
    fullStoryLink: `${baseUrl}/blog/free-term-insurance-calculator-no-phone-instant-results`,
    fullStoryPath: '/blog/free-term-insurance-calculator-no-phone-instant-results',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80',
    authorId: 'vikram',
    source: 'static',
  },
  {
    id: 'term-vs-ulip-crorepati-cry-2026',
    slug: 'term-vs-ulip-crorepati-cry',
    category: 'personal-finance',
    headline: 'Term Insurance vs ULIP: One Makes You Crorepati, One Makes You Cry',
    whyItMatters: [
      'Term = सस्ता protection; ULIP = insurance + investment mix जहाँ charges और lock-in आपके returns खा सकते हैं।',
      'Same premium में term लेकर बची रकम SIP/PPF में डालने से अक्सर बेहतर long-term result मिलता है।',
    ],
    whatToDo: 'अगर आपको सिर्फ़ life cover चाहिए तो pure term लें; investment के लिए अलग mutual fund या PPF use करें। ULIP तभी लें जब आप charges और risk समझते हों।',
    summaryParagraphs: [
      'Term insurance और ULIP दोनों “life insurance” के नाम पर बेचे जाते हैं, लेकिन नतीजा अलग होता है। Term में आप कम premium में बड़ा cover लेते हैं — अगर policy term के दौरान आपकी मौत हो जाती है तो family को sum assured मिलता है; वरना maturity पर कुछ नहीं। ULIP में premium का हिस्सा insurance में जाता है और हिस्सा equity/debt में invest होता है; लेकिन policy charges, allocation charges और long lock-in की वजह से net return अक्सर simple SIP से कम रह जाता है।',
      'जो लोग “insurance + investment” एक साथ चाहते हैं, उन्हें अक्सर ULIP push किया जाता है। Reality ये है कि अलग-अलग term plan + SIP (या index fund) लेने से आपको बेहतर protection मिलती है और investment side पर charges कम होते हैं। Calculator से देखें कि आपकी age पर term कितना सस्ता है; बची रकम को disciplined SIP में डालें — यही “crorepati” वाला रास्ता है। जो ULIP में बिना समझे पैसा डालते हैं वो बाद में returns देखकर “cry” करते हैं।',
    ],
    fullStoryLink: `${baseUrl}/blog/term-insurance-secret-90-percent-indians-dont-know-calculator`,
    fullStoryPath: '/blog/term-insurance-secret-90-percent-indians-dont-know-calculator',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 55,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=630&fit=crop&q=80',
    authorId: 'saurabh-kumar',
    source: 'static',
  },
  {
    id: 'term-rates-2026-crashed-check-now-2026',
    slug: 'term-rates-2026-crashed-check-now',
    category: 'personal-finance',
    headline: '2026 Term Insurance Rates Just Crashed – Check Before They Rise Again!',
    whyItMatters: [
      'कुछ insurers ने 2026 में online term plans की दरें competitive रखी हैं; age बढ़ने के साथ premium हर साल बढ़ता है।',
      'अभी check करने का मतलब है कि आप current low rate पर lock कर सकते हैं।',
    ],
    whatToDo: 'आज ही free calculator से 2026 rates check करें; अगर आप under-insured या overpaying हैं तो नया quote लेकर switch या top-up करें।',
    summaryParagraphs: [
      '2026 में कई insurers ने pure term plans की premium competitive रखी है ताकि online और direct channel से ज्यादा buyers आएं। इसका मतलब ये है कि healthy, young buyers के लिए ₹1–2 crore cover की monthly premium पहले के सालों के मुकाबले attractive हो सकती है। लेकिन ये “low” phase हमेशा नहीं रहता — claims experience, regulation और competition के चलते दरें ऊपर-नीचे होती रहती हैं। साथ ही आपकी उम्र हर साल बढ़ती है, और term insurance में age सबसे बड़ा factor है; एक साल देर से buy करने पर हजारों रुपए सालाना ज्यादा देना पड़ सकता है।',
      'इसलिए “rates crashed” का सही use ये है कि आप अभी एक calculator में अपनी age, sum assured और term डालकर देखें कि market में क्या range मिल रहा है। अगर आपको लगता है कि आप under-insured हैं या पुरानी policy में overpay कर रहे हैं, तो नए quotes लेकर तुलना करें और जल्दी decide करें — wait करने से premium फिर rise हो सकता है।',
    ],
    fullStoryLink: `${baseUrl}/blog/term-plan-premium-3x-higher-than-should-be-calculator`,
    fullStoryPath: '/blog/term-plan-premium-3x-higher-than-should-be-calculator',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: 'https://images.unsplash.com/photo-1554224311-beee460c201a?w=1200&h=630&fit=crop&q=80',
    authorId: 'harsh-raj',
    source: 'static',
  },
  {
    id: 'hidden-term-trick-saves-50k-year-2026',
    slug: 'hidden-term-trick-saves-50k-year',
    category: 'personal-finance',
    headline: 'The Hidden Term Plan Trick That Saves ₹50,000+ Every Single Year',
    whyItMatters: [
      'Pure term लेकर बचाया हुआ premium (vs endowment/ULIP) हर साल ₹50K+ हो सकता है — उसे SIP में डालने से long-term wealth बनती है।',
      'Trick = पहले calculator से “fair” premium पता करो, फिर सिर्फ़ वही product लो जो वो number दे।',
    ],
    whatToDo: 'Calculator से अपना सही premium निकालें; अगर आप उससे ₹50K+ सालाना ज्यादा दे रहे हैं तो plan बदलें या top-up pure term से करें।',
    summaryParagraphs: [
      'Hidden trick कोई जादू नहीं — बस ये कि आप जो “life insurance” ले रहे हैं, उसका premium calculator से check करें। जो लोग endowment या ULIP में ₹25,000–40,000 सालाना दे रहे हैं उन्हें अक्सर same cover pure term में ₹8,000–12,000 सालाना में मिल सकता है। बची हुई रकम (कई के लिए ₹50,000 से ऊपर हर साल) अगर SIP या PPF में जाती है तो 15–20 साल में लाखों का फर्क पड़ जाता है।',
      'Trick ये है कि आप पहले किसी free term calculator में age, sum assured और term डालकर “ideal” premium range देखें। फिर अपनी current policy का premium और sum assured compare करें। अगर आप 2–3x ज्यादा दे रहे हैं तो आप हर साल ₹50K+ बचा सकते हैं बस सही product चुनकर। बची रकम को automatic SIP में डाल दें — यही hidden trick है जो हर साल पैसा बचाता है।',
    ],
    fullStoryLink: `${baseUrl}/blog/term-insurance-secret-90-percent-indians-dont-know-calculator`,
    fullStoryPath: '/blog/term-insurance-secret-90-percent-indians-dont-know-calculator',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 55,
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80',
    authorId: 'raushan-kumar',
    source: 'static',
  },
  {
    id: 'family-suffer-without-term-calculator-2026',
    slug: 'family-suffer-without-term-calculator',
    category: 'personal-finance',
    headline: 'Why Your Family Will Suffer If You Don\'t Use This Term Calculator Now',
    whyItMatters: [
      'Under-insurance का मतलब है कि आपकी अनुपस्थिति में family को loans, expenses और goals के लिए पैसा नहीं मिलेगा।',
      'Calculator से 2 मिनट में पता चल जाता है कि आपको कितना cover चाहिए और कितना premium “fair” है।',
    ],
    whatToDo: 'आज ही free term calculator खोलें; income, loans और goals के हिसाब से sum assured और term set करें और अगर shortfall है तो cover लें।',
    summaryParagraphs: [
      'बहुत से लोग term insurance को टालते रहते हैं या बिना गणना के कोई छोटा सा plan ले लेते हैं। जब अचानक कुछ हो जाता है तो पता चलता है कि home loan, kids’ education और daily expenses के लिए जो रकम चाहिए थी वो नहीं मिल रही। Calculator का काम ये है कि वो आपको 10–15 मिनट में बता दे कि आपकी income, outstanding loans और goals के हिसाब से कितना sum assured और कितने साल का term चाहिए — और उस पर लगभग कितना premium देना पड़ेगा।',
      'अगर आप ये step skip करते हैं तो दो तरह का नुकसान हो सकता है: या तो आप under-insured रह जाते हैं (family suffer करती है) या overpay करते हैं (गलत product में पैसा जाता है)। Calculator use करने में 2 मिनट लगते हैं; न करने की कीमत सालों तक परिवार को चुकानी पड़ सकती है। इसलिए आज ही एक no-phone, no-OTP calculator खोलें और अपना number निकालें।',
    ],
    fullStoryLink: `${baseUrl}/blog/how-much-term-insurance-really-need-calculator`,
    fullStoryPath: '/blog/how-much-term-insurance-really-need-calculator',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 55,
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=630&fit=crop&q=80',
    authorId: 'vikram',
    source: 'static',
  },
  {
    id: '1crore-term-under-10k-year-insane-tool-2026',
    slug: '1crore-term-under-10k-year-tool',
    category: 'personal-finance',
    headline: '1 Crore Term Cover Under ₹10,000/Year? Try This Insane Tool',
    whyItMatters: [
      'Healthy young non-smoker के लिए ₹1 crore term cover सालाना ₹8,000–12,000 range में मिल सकता है — यानी under ₹10K possible है।',
      '“Insane tool” = free term calculator जो बिना phone/OTP के instant estimate देता है।',
    ],
    whatToDo: 'Calculator में age, ₹1 Cr sum assured और 30–35 year term डालें; अगर estimate ~₹10K/year के आसपास आए तो quotes लेकर buy करें।',
    summaryParagraphs: [
      '₹10,000 सालाना यानी लगभग ₹833 प्रति महीने — क्या इससे ₹1 crore term cover मिल सकता है? जी हाँ, कई healthy 25–35 साल के non-smokers के लिए ये range realistic है। Insurers अब online direct plans में aggressive pricing कर रहे हैं, और जो लोग agents के ज़रिए महंगे endowment/ULIP लेते हैं वो इस number पर यकीन नहीं करते। लेकिन एक free term insurance calculator में बस अपनी age, sum assured (₹1 crore) और term (e.g. 35 years) डालकर देखें — आपको तुरंत एक indicative premium मिल जाएगा।',
      '“Insane” इसलिए क्योंकि ज्यादातर लोगों को लगता है कि ₹1 crore cover के लिए कम से कम ₹20–30K सालाना देना होगा। Tool (calculator) ये दिखाता है कि pure term में numbers कितने अलग हो सकते हैं। No phone number, no OTP — बस browser में open करो, numbers डालो और result देखो। फिर जिस insurer का quote इस range के करीब हो, उससे buy कर सकते हैं।',
    ],
    fullStoryLink: `${baseUrl}/blog/1-crore-term-insurance-399-per-month-calculator`,
    fullStoryPath: '/blog/1-crore-term-insurance-399-per-month-calculator',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 50,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80',
    authorId: 'saurabh-kumar',
    source: 'static',
  },
  {
    id: 'world-roundup-gaza-floods-jellyfish-2026-02-05',
    slug: 'world-roundup-gaza-floods-jellyfish',
    category: 'economy',
    headline: 'World Roundup: Gaza Strikes, Spain Floods, Phantom Jellyfish & More Global Headlines',
    whyItMatters: [
      'Middle East tensions, European extreme weather और rare deep-sea discoveries एक ही दिन global risk और science दोनों को highlight करते हैं।',
      'ऐसी headlines oil prices, travel plans और investor sentiment पर indirect असर डाल सकती हैं — इसलिए Indian investors के लिए भी relevant हैं।',
    ],
    whatToDo:
      'Global news को ignore मत कीजिए — risk management, asset allocation और emergency planning करते समय geopolitical और climate risks को भी factor कीजिए।',
    summaryParagraphs: [
      'आज की global खबरों में सबसे बड़ी सुर्खी Gaza से आती है, जहाँ Israel के fresh strikes में कम-से-कम 24 लोगों की मौत हुई, जिनमें बच्चे भी शामिल हैं। इससे फिर से Middle East में tension बढ़ा है और ceasefire talks पर दबाव बढ़ सकता है, जो oil prices और broader risk sentiment को indirectly प्रभावित करता है। इसी के साथ Australia में National Day protest के दौरान हुए attempted bombing को authorities terror act की तरह treat कर रहे हैं, दिखाता है कि developed देशों में भी security risk हमेशा मौजूद रहता है। दुसरी ओर, Spain के Andalucía region में Storm Leonardo की वजह से severe flooding हुई, जिससे evacuations, transport disruption और insurance claims बढ़ने की आशंका है — climate change–linked extreme weather अब regular headline बन चुका है।',
      'Science और human grit से जुड़ी दो कहानियाँ भी viral हैं: Argentina के coast के पास deep-sea footage में school-bus size phantom jellyfish दिखी, जो दुनिया के सबसे rare jellyfish species में से एक मानी जाती है और ocean biodiversity पर नया insight देती है। Australia में एक 13 साल के लड़के ने family की boat के औकात से बाहर drift होने पर 2+ miles तैर कर coast तक पहुँच कर help बुलवाई और सबकी जान बचाई — ये human endurance और presence of mind की powerful याद दिलाता है। इसी बीच UK में Prince Andrew, जो पहले Epstein controversy से जुड़ चुके हैं, अपने royal residence से move-out की headlines में हैं, जिससे British monarchy और public opinion के बीच की दूरी पर फिर discussion शुरू हो गया है।',
      'Global context समझना सिर्फ़ curiosity के लिए नहीं, बल्कि investors, travellers और students के लिए भी ज़रूरी है — conflict zones, climate risk और political uncertainty portfolios और life plans पर असर डाल सकते हैं।',
    ],
    fullStoryLink: `${baseUrl}/news/shorts`,
    fullStoryPath: '/news/shorts',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 65,
    imageUrl:
      'https://images.unsplash.com/photo-1548266652-99cf27701ced?w=1200&h=630&fit=crop&q=80', // generic world news image
    authorId: 'harsh-raj',
    source: 'static',
  },
  {
    id: 'india-roundup-bharat-taxi-metro-dea-2026-02-05',
    slug: 'india-roundup-bharat-taxi-metro-dea',
    category: 'business',
    headline: 'India Today: Bharat Taxi vs Uber-Ola, Metro Fare Hike, Drug Ring Bust & Parliament Fireworks',
    whyItMatters: [
      'Bharat Taxi launch से app-based cab market में competition बढ़ेगा, जिसका असर fares और drivers की earnings दोनों पर पड़ सकता है।',
      'Metro fare hikes, highway jams और land disputes जैसे decisions रोज़मर्रा के खर्च, travel time और local politics को सीधे छूते हैं।',
    ],
    whatToDo:
      'Urban commuters अपने monthly budget और route planning को update करें; policy और courts के बड़े फैसलों को long-term investment और career decisions में factor करें।',
    summaryParagraphs: [
      'India से आज की बड़ी national headlines शुरू होती हैं Bharat Taxi के official launch से — एक नया player जो Uber और Ola जैसे giants को सीधे challenge करेगा। इसका मतलब है कि आने वाले महीनों में कुछ routes पर promotional offers, fare wars और drivers के लिए नए incentive structures देखने को मिल सकते हैं, लेकिन साथ ही regulation और safety norms पर भी नया दबाव बनेगा। वहीं Bengaluru Metro ने 9 February से लगभग 5% fare hike का ऐलान किया है, जिससे रोज़ metro से आने-जाने वाले commuters के monthly travel budget में सीधा असर पड़ेगा, खासकर middle-class और students के लिए। US Drug Enforcement Administration (DEA) ने India-linked online drug ring पर बड़ा crackdown करते हुए 200 domains seize किए और चार लोगों को arrest किया, जिससे cyber-enabled crime और India की image पर international स्तर पर सवाल उठ सकते हैं।',
      'Mumbai-Pune Expressway पर tanker accident की वजह से 5–10 km तक traffic jam रही और कई buses प्रभावित हुईं; हालांकि बाद में traffic धीरे-धीरे normalize हुआ। ऐसे incidents remind करते हैं कि highways पर safety standards और emergency response कितना critical है। Gujarat High Court ने राज्य सरकार को 45,000 sq m land ashram से reclaim करने की अनुमति दी, जो land use, encroachment और religious trusts पर चल रही बहस का नया chapter है। Delhi में Lok Sabha को दोपहर 2 बजे तक के लिए suspend करना पड़ा क्योंकि BJP और Congress के बीच तीखी तकरार चल रही थी, वहीं Bengal सरकार को Supreme Court से एक अहम setback मिला, जो राज्य–centre संबंधों और federal politics पर दूरगामी असर डाल सकता है।',
      'इन सभी developments का मतलब है कि India का policy, infrastructure और law-&-order landscape तेज़ी से evolve हो रहा है — investors, job seekers और आम नागरिकों को इन बदलावों पर नज़र रखनी चाहिए।',
    ],
    fullStoryLink: `${baseUrl}/news/shorts`,
    fullStoryPath: '/news/shorts',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 70,
    imageUrl:
      'https://images.unsplash.com/photo-1586769852044-692d6e3703c8?w=1200&h=630&fit=crop&q=80', // Indian city traffic/metro
    authorId: 'saurabh-kumar',
    source: 'static',
  },
  {
    id: 'sports-roundup-u19-ind-eng-nba-2026-02-05',
    slug: 'sports-roundup-u19-ind-eng-nba',
    category: 'business',
    headline: 'Sports Buzz: U-19 World Cup IND vs ENG Final, India–Pakistan Debate & NBA Trade Deadline Drama',
    whyItMatters: [
      'India U-19 टीम का World Cup final तक पहुँचना cricket pipeline की ताकत दिखाता है — future stars की पहचान यहीं से होती है।',
      'India–Pakistan cricket politics और NBA trades दोनों ही billion-dollar sports economies और fan engagement को प्रभावित करते हैं।',
    ],
    whatToDo:
      'Cricket और global sports follow करने वाले fans fixtures, squads और big trades पर नज़र रखें; betting या impulsive financial decisions से बचें — sports को entertainment और learning की तरह देखें।',
    summaryParagraphs: [
      'Harare में ICC U-19 World Cup 2026 का final अब India vs England के बीच तय हो चुका है — junior level पर ये clash सिर्फ़ trophy के लिए नहीं, बल्कि अगले 5–10 साल के लिए national teams के talent pipeline की एक झलक भी है। पिछले कुछ editions की तरह इस बार भी India U-19 टीम ने consistency और depth दिखाई है, जिससे selectors को future openers, all-rounders और bowlers की अच्छी list मिल जाएगी। इस बीच former Australia fast bowler Brett Lee ने फिर से India–Pakistan bilateral series के पक्ष में आवाज़ उठाई है, लेकिन Pakistan के PM ने सुरक्षा और political context का हवाला देकर boycott line को ही support किया है, जिससे high-voltage Indo-Pak cricket की वापसी फिलहाल दूर दिखती है।',
      'दूसरी तरफ Atlantic के पार NBA Trade Deadline का buzz तेज़ है — कई big names के team बदलने की चर्चा है, जो franchises की championship window, salary cap और fan loyalty को सीधे touch करता है। हर blockbuster trade के पीछे detailed analytics, contract math और future picks की chessboard होती है, जो दिखाती है कि modern sports pure entertainment नहीं, बल्कि data-driven business भी है।',
      'Indian viewers के लिए ये सब सिर्फ़ late-night entertainment नहीं; global sports economics, sponsorship deals और franchise models को समझना startup founders, marketers और finance professionals के लिए भी सीखने का बड़ा source हो सकता है।',
    ],
    fullStoryLink: `${baseUrl}/news/shorts`,
    fullStoryPath: '/news/shorts',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 65,
    imageUrl:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=630&fit=crop&q=80', // generic stadium/sports image
    authorId: 'raushan-kumar',
    source: 'static',
  },
  {
    id: 'markets-roundup-gold-silver-sensex-savings-2026-02-05',
    slug: 'markets-roundup-gold-silver-sensex-savings',
    category: 'markets',
    headline: 'Gold–Silver में तगड़ी चाल, Sensex–Nifty सुस्त और Savings Accounts में ~5% तक APY — क्या करें?',
    whyItMatters: [
      'Gold और silver की volatility safe-haven demand और global risk mood को reflect करती है — Indian households के लिए ये core asset class है।',
      'Equity indices की muted opening और higher savings rates मिलकर asset allocation decisions को tricky बनाते हैं।',
    ],
    whatToDo:
      'Short-term price moves पर jump मत करें; goals और risk profile के हिसाब से gold, equity और high-yield savings में balanced allocation बनाईए।',
    summaryParagraphs: [
      'आज के commodity और बाजार action में gold और silver दोनों spotlight में हैं: gold ने recent correction के बाद फिर से rebound दिखाया है जबकि silver में intraday dips के साथ choppy trade दिखा, जो industrial demand और speculative positioning दोनों का mix है। Indian households के लिए gold सिर्फ़ investment नहीं, बल्कि cultural और emergency asset भी है, इसलिए बार-बार की volatility के बावजूद long-term allocation generally stable रहती है। इसी बीच Sensex और Nifty ने muted opening दी, जहां mixed commodity moves और global cues की वजह से traders ने wait-and-watch stance लिया हुआ है — sectors में rotation दिख रहा है लेकिन broad-based trend अभी साफ़ नहीं है।',
      'Banking और fintech side पर सबसे interesting development high-yield savings accounts हैं जो अब ~5.00% APY (या उसके आसपास effective annual yield) offer कर रहे हैं, खासकर कुछ digital-first या private banks में। इससे short-term parking और emergency funds के लिए options बढ़ गए हैं, लेकिन साथ ही customers को fine print, balance slab conditions और FD से तुलना करके ही decision लेना चाहिए। Equity में suust start, gold–silver की तेज़ चाल और savings rates का uptrend मिलकर retail investors के सामने asset allocation का tough सवाल रखते हैं — कहाँ कितना रखें ताकि liquidity, safety और growth तीनों का balance बने रहे।',
      'Practical तरीका यह है कि short-term जरूरतों और emergency corpus के लिए high-yield savings/short FDs use करें, long-term wealth creation के लिए diversified equity funds या index funds और portfolio hedge व cultural allocation के लिए limited लेकिन disciplined gold exposure रखें।',
    ],
    fullStoryLink: `${baseUrl}/news/shorts`,
    fullStoryPath: '/news/shorts',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 70,
    imageUrl:
      'https://images.unsplash.com/photo-1547514701-42782101795e?w=1200&h=630&fit=crop&q=80', // gold/silver coins
    authorId: 'harsh-raj',
    source: 'static',
  },
  {
    id: 'ent-viral-ott-jellyfish-2026-02-05',
    slug: 'ent-viral-ott-jellyfish',
    category: 'business',
    headline: 'OTT पर The Raja Saab से लेकर Lincoln Lawyer 4, और Viral Phantom Jellyfish Video ने जीता Internet',
    whyItMatters: [
      'New OTT releases binge-watching behaviour और subscription choices को drive करते हैं — entertainment spend अब हर household budget का हिस्सा है।',
      'Deep-sea phantom jellyfish जैसा rare footage science curiosity और social media virality दोनों को जोड़ता है, जो attention economy को define करता है।',
    ],
    whatToDo:
      'OTT subscriptions को clubbing/bundling के साथ optimise करें, और viral content को सिर्फ़ forwarding नहीं, learning के नज़रिये से भी देखें — ocean health और science stories पर भी ध्यान दें।',
    summaryParagraphs: [
      'Entertainment और viral culture की दुनिया में इस हफ्ते OTT platforms पर बड़ा lineup है: Indian audiences के लिए The Raja Saab जैसे बड़े star cast वाले titles ready हैं, वहीं global viewers के लिए Lincoln Lawyer 4 जैसा popular legal drama वापस आ रहा है। Streaming wars का मतलब है कि हर platform exclusive releases के ज़रिए आपका ध्यान और subscription रुपये capture करने की कोशिश कर रहा है; users के लिए इसका upside ज्यादा choice है लेकिन downside ये कि बिना planning के multiple subscriptions pocket पर भारी पड़ सकते हैं। इसी बीच internet पर सबसे ज्यादा share होने वाले clips में से एक Argentina के coast के पास deep-sea में shoot हुआ phantom jellyfish का video है — school-bus size का ये creature बहुत rare है और marine scientists के लिए भी excitement का reason बना हुआ है।',
      'ऐसे viral clips सिर्फ़ wow-factor नहीं लाते, बल्कि oceans की unexplored दुनिया और climate change के असर पर ध्यान खींचते हैं। Social feeds में जब भी ऐसे videos दिखें, उन्हें सिर्फ़ entertainment नहीं, बल्कि opportunity की तरह देखें — ocean conservation, deep-sea research और biodiversity के बारे में पढ़ने का chance।',
      'OTT और viral content दोनों मिलकर आज की attention economy की core कहानी बताते हैं: आपका समय, data और subscription पैसा सबसे बड़ी currency है; content चुनते समय mindful रहें ताकि entertainment, learning और budget का healthy balance बन सके।',
    ],
    fullStoryLink: `${baseUrl}/news/shorts`,
    fullStoryPath: '/news/shorts',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 70,
    imageUrl:
      'https://images.unsplash.com/photo-1594905791954-6675fc969971?w=1200&h=630&fit=crop&q=80', // TV/OTT style image
    authorId: 'saurabh-kumar',
    source: 'static',
  },
  {
    id: 'astro-horoscope-feb5-2026',
    slug: 'astro-horoscope-feb5-2026',
    category: 'personal-finance',
    headline: 'आज का Panchang & Horoscope: Sankashti Chaturthi, शुभ योग और किन राशियों के लिए फायदे के मौके?',
    whyItMatters: [
      'बहुत से Indian households रोज़ के decisions (shopping, travel, investments) में Panchang और राशिफल को ध्यान में रखते हैं।',
      'Astro content high-traffic driver है — लेकिन इसे grounded financial planning के साथ balance करना ज़रूरी है।',
    ],
    whatToDo:
      'Panchang और राशिफल को motivation और reflection के tool की तरह लें; big money decisions हमेशा maths, risk profile और goals के आधार पर लें, सिर्फ़ stars के नहीं।',
    summaryParagraphs: [
      'आज के Panchang के मुताबिक यह Sankashti Chaturthi का दिन है, जिसे कई लोग विशेष रूप से गणेश पूजा और मनोकामना पूर्ति से जोड़ते हैं। कुछ पंचांगों के अनुसार शुभ yogs भी बन रहे हैं, जिनमें विशेष time windows को यात्रा, deal-making या नए काम शुरू करने के लिए बेहतर माना जाता है। इसी के साथ daily राशिफल updates बताते हैं कि किन राशियों के लिए आज communication, career या relationships में opportunities खुल सकती हैं और किसे health या खर्चों पर extra ध्यान देने की ज़रूरत है। Astrology content इसलिए popular है क्योंकि यह लोगों को दिन की शुरुआत में एक narrative, hope या caution का फ्रेम दे देता है।',
      'लेकिन financial और career decisions के लिए सिर्फ़ राशिफल पर भरोसा करना practical नहीं है। अगर आज का horoscope कहता है कि धन लाभ के योग हैं, तो भी SIP बढ़ाने या बड़ी खरीद करने से पहले income, budget और goals को देखना ज़रूरी है। इसी तरह, अगर कहीं challenges का जिक्र है, तो उसे risk management और contingency planning की lens से पढ़ा जा सकता है — जैसे emergency fund बनाना, insurance cover check करना या debt कम करना।',
      'Best approach यही है कि Panchang और horoscope को self-reflection और discipline बढ़ाने के संकेत की तरह use करें, जबकि वास्तविक पैसे और career decisions data, planning और सलाह के आधार पर लें — stars inspiration दे सकते हैं, लेकिन execution आपके हाथ में है।',
    ],
    fullStoryLink: `${baseUrl}/news/shorts`,
    fullStoryPath: '/news/shorts',
    datePublished: getNewsShortsTodayISO(),
    readTimeSeconds: 75,
    imageUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=630&fit=crop&q=80', // astrology/horoscope style
    authorId: 'vikram',
    source: 'static',
  },
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

const allStaticShorts: NewsShort[] = [
  ...newsShortsList,
  ...bulkNationalPolitical,
  ...bulkEconomyMarkets,
  ...bulkSports,
  ...bulkWorld,
  ...bulkEntertainment,
  ...bulkScience,
  ...bulkCurrentAffairsFeb2026,
];

/** All shorts — custom (if any) first, then static. Each has one paragraph summary 360+ chars. */
export function getNewsShorts(): NewsShort[] {
  const staticList = allStaticShorts
    .map((s) => ({ ...s, source: 'static' as const }))
    .map(normalizeShortSummary);
  if (typeof window === 'undefined') return staticList;
  const custom = getCustomShorts().map(normalizeShortSummary);
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

const MIN_SUMMARY_CHARS = 360;

/** Ensures each short has one quality paragraph summary of 360+ characters. */
export function normalizeShortSummary(short: NewsShort): NewsShort {
  const parts = short.summaryParagraphs?.length
    ? short.summaryParagraphs
    : [
        ...short.whyItMatters,
        ...(short.keyNumbers?.length ? [`Key figures: ${short.keyNumbers.join(', ')}.`] : []),
        short.whatToDo,
      ];
  let paragraph = parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  if (paragraph.length < MIN_SUMMARY_CHARS) {
    paragraph += ' For full details and the complete story, read the article using the link below.';
  }
  if (paragraph.length < MIN_SUMMARY_CHARS) {
    paragraph += ' This summary gives you the main points in one place.';
  }
  return { ...short, summaryParagraphs: [paragraph] };
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
