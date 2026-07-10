const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'data', 'discover');
const publicDir = path.join(__dirname, 'public', 'discover');

const articles = [
  {
    slug: 'north-east-floods-inflation',
    title: '🚨 Big Alert: Floods & Rain Will Impact Your Monthly Budget',
    snippet: 'नॉर्थ-ईस्ट में भारी बाढ़ और देश भर में मानसून का असर। जानें कैसे इससे महंगाई बढ़ेगी और आपका मंथली बजट प्रभावित होगा।',
    category: 'Economy',
    topic: 'North-East Floods -> Inflation & Supply Shock',
    author: 'MoneyCal Team'
  },
  {
    slug: 'monsoon-active-direct-money-impact',
    title: 'Rainfall alert: Prices of these items may rise/fall',
    snippet: 'पूरे भारत में मानसून एक्टिव। सब्ज़ियों के दाम, पेट्रोल और ग्रामीण आय पर इसका क्या असर होगा? पूरी रिपोर्ट पढ़ें।',
    category: 'Economy',
    topic: 'Monsoon Active Across India -> Direct Money Impact',
    author: 'MoneyCal Team'
  },
  {
    slug: 'rbi-big-move-liquidity',
    title: 'RBI Just Changed This Rule – Your EMI May Change Soon',
    snippet: 'RBI ने HFCs को लेकर बड़ा बदलाव किया है। मार्केट में लिक्विडिटी बढ़ने से आपकी EMI और लोन पर क्या होगा असर? जानें।',
    category: 'Finance',
    topic: 'RBI Big Move -> More Liquidity in Market',
    author: 'MoneyCal Team'
  },
  {
    slug: 'india-debt-market-weakness',
    title: 'Hidden financial risk India is ignoring',
    snippet: 'भारत के डेट मार्केट की कमज़ोरी एक बड़ा रिस्क बन सकती है। क्या इससे इंफ्रास्ट्रक्चर फंडिंग और इकॉनमी की रफ्तार रुकेगी?',
    category: 'Economy',
    topic: 'India Debt Market Weakness (Hidden Big Risk)',
    author: 'MoneyCal Team'
  },
  {
    slug: 'foreign-investors-buying-indian-bonds',
    title: 'Foreign Investors Are Pouring Money Into India – Why?',
    snippet: 'ग्लोबल फर्म्स ने भारतीय बांड्स में $1 बिलियन का निवेश किया है। विदेशी निवेशकों के इस बड़े कदम का क्या मतलब है?',
    category: 'Market',
    topic: 'Foreign Investors Buying Indian Bonds (BIG SIGNAL)',
    author: 'MoneyCal Team'
  },
  {
    slug: 'global-war-impact-on-india',
    title: 'War Impact on India: Petrol, EMI & Stock Market Explained',
    snippet: 'ईरान और अमेरिका की नीतियों से रुपये और स्टॉक मार्केट पर भारी असर। कच्चे तेल की कीमतें कैसे आपकी जेब ढीली करेंगी?',
    category: 'Market',
    topic: 'Global War Impact on India (VERY VIRAL)',
    author: 'MoneyCal Team'
  },
  {
    slug: 'india-close-to-8-percent-growth',
    title: 'India Heading Towards 8% Growth – What It Means for You',
    snippet: 'भारत 8% ग्रोथ की ओर अग्रसर। जानें इसका जॉब मार्केट, स्टार्टअप्स और शेयर बाज़ार पर कैसा पॉज़िटिव असर होगा।',
    category: 'Economy',
    topic: 'India Close to 8% Growth (Mega Narrative)',
    author: 'MoneyCal Team'
  },
  {
    slug: 'mumbai-local-upgrade-spending-shift',
    title: 'Why Indians are spending more on comfort travel',
    snippet: 'मुंबई में 12 नई AC लोकल ट्रेनें। यह अपग्रेड कैसे भारतीयों के बढ़ते खर्च और लाइफस्टाइल बदलाव की कहानी कहता है?',
    category: 'Lifestyle',
    topic: 'Mumbai Local Upgrade -> Spending Shift Story',
    author: 'MoneyCal Team'
  },
  {
    slug: 'msme-trader-focus-day',
    title: 'Govt pushing small business growth – who benefits?',
    snippet: 'यूपी में व्यापारी कल्याण दिवस मनाना छोटे व्यवसायों (MSME) और लोकल इकॉनमी के लिए कितना बड़ा बूस्ट है? पढ़ें विश्लेषण।',
    category: 'Business',
    topic: 'MSME & Trader Focus Day (Local Economy Boost)',
    author: 'MoneyCal Team'
  },
  {
    slug: 'indian-ocean-new-business-zone',
    title: 'New trade routes that can create billionaires',
    snippet: 'हिंद महासागर से ट्रेड एक्सपेंशन: सरकार का नया फोकस कैसे लॉजिस्टिक्स और एक्सपोर्ट कंपनियों के लिए बड़े मौके ला रहा है।',
    category: 'Business',
    topic: 'Indian Ocean = New Business Opportunity Zone',
    author: 'MoneyCal Team'
  }
];

const toCamelCase = (str) => {
  return str.split('-').map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
};

let indexImports = '';
let indexArrayElements = '';

articles.forEach(article => {
  const varName = toCamelCase(article.slug);
  const filePath = path.join(baseDir, `${article.slug}.ts`);
  
  const content = `import { DiscoverArticle } from './types';

export const ${varName}: DiscoverArticle = {
  id: '${article.slug}',
  slug: '${article.slug}',
  title: '${article.title.replace(/'/g, "\\'")}',
  snippet: '${article.snippet.replace(/'/g, "\\'")}',
  coverImage: '/discover/${article.slug}/cover.png',
  author: '${article.author}',
  date: new Date().toISOString(),
  category: '${article.category}',
  sections: [
    {
      type: 'p',
      content: 'आज के इस विशेष लेख में हम बात करेंगे <strong>${article.topic.replace(/'/g, "\\'")}</strong> के बारे में। यह खबर आपके वित्तीय फैसलों, निवेश और दैनिक बजट को सीधे तौर पर प्रभावित कर सकती है।'
    },
    {
      type: 'p',
      content: 'आर्थिक उतार-चढ़ाव के इस दौर में सही जानकारी होना सबसे ज़रूरी है। अगर आप अपने भविष्य को सुरक्षित करना चाहते हैं, तो हमारे <a href="/calculators/sip-calculator">SIP Calculator</a> का इस्तेमाल कर आज ही सही निवेश की योजना बनाएं।'
    },
    {
      type: 'h2',
      content: 'क्या है मुख्य खबर?'
    },
    {
      type: 'p',
      content: '${article.snippet.replace(/'/g, "\\'")}'
    },
    {
      type: 'p',
      content: 'विशेषज्ञों का मानना है कि इस तरह के बदलावों का असर न सिर्फ बड़े निवेशकों पर, बल्कि आम आदमी की जेब पर भी पड़ता है। बढ़ती महंगाई और बाज़ार की अनिश्चितता के बीच, सही टूल्स का उपयोग करना बहुत महत्वपूर्ण है। अपनी EMI को बेहतर ढंग से समझने के लिए हमारे <a href="/calculators/emi-calculator">EMI Calculator</a> का उपयोग करें।'
    },
    {
      type: 'callout',
      content: '<strong>महत्वपूर्ण सलाह (Important Tip):</strong> बाज़ार के हर ट्रेंड पर नज़र रखें और किसी भी अफवाह पर ध्यान न दें। अपने निवेश को डायवर्सिफाई करें (Diversify your investments) और जोखिम को कम करें।'
    },
    {
      type: 'h2',
      content: 'निष्कर्ष'
    },
    {
      type: 'p',
      content: 'निष्कर्ष के तौर पर, यह स्थिति लंबी अवधि के निवेशकों के लिए अवसर और जोखिम दोनों लेकर आ रही है। सही रणनीति अपनाकर आप इसका लाभ उठा सकते हैं। लगातार अपडेट्स के लिए <a href="/">MoneyCal.in</a> से जुड़े रहें।'
    }
  ]
};
`;
  
  fs.writeFileSync(filePath, content);
  console.log(`Created ${filePath}`);
  
  // create public dir
  const pubArticleDir = path.join(publicDir, article.slug);
  if (!fs.existsSync(pubArticleDir)) {
    fs.mkdirSync(pubArticleDir, { recursive: true });
  }
  
  indexImports += `import { ${varName} } from './${article.slug}';\n`;
  indexArrayElements += `    ${varName},\n`;
});

// Update index.ts
const indexPath = path.join(baseDir, 'index.ts');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// replace // ADD NEW DISCOVER ARTICLES HERE
indexContent = indexContent.replace(
  '// ADD NEW DISCOVER ARTICLES HERE', 
  indexImports + '\n// ADD NEW DISCOVER ARTICLES HERE'
);

indexContent = indexContent.replace(
  'export const discoverArticles: DiscoverArticle[] = [',
  'export const discoverArticles: DiscoverArticle[] = [\n' + indexArrayElements
);

fs.writeFileSync(indexPath, indexContent);
console.log('Updated index.ts');
