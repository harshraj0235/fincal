const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');
const cron = require('node-cron');
const { exec } = require('child_process');

// Indian Crypto RSS Feeds
const CRYPTO_RSS_FEEDS = [
  'https://coingape.com/feed',
  'https://bitcoinworld.co.in/feed',
  'https://wazirx.com/blog/feed',
  'https://coindcx.com/blog/feed',
  'https://www.businesstoday.in/rssfeeds/8395173.cms?catid=coindcx-crypto',
  'https://coinfunda.com/feed',
  'https://blog.unocoin.com/feed',
  'https://cryptopeoplee.in/feed'
];

// Indian Crypto blog topics mapping (starting from 75)
const CRYPTO_BLOG_TOPICS = {
  75: 'भारतीय क्रिप्टो बाजार 2025: बिटकॉइन और एथेरियम की वर्तमान स्थिति',
  76: 'भारत में क्रिप्टो एक्सचेंज: WazirX, CoinDCX और अन्य प्लेटफॉर्म्स का तुलनात्मक विश्लेषण',
  77: 'भारतीय क्रिप्टो निवेशकों के लिए टैक्स गाइड 2025: 30% कर और 1% TDS',
  78: 'भारत में क्रिप्टो रेगुलेशन: RBI और सरकार की नीतियां',
  79: 'भारतीय क्रिप्टो ट्रेडिंग रणनीतियां: डे ट्रेडिंग से लेकर होल्डिंग तक',
  80: 'भारत में NFT बाजार: डिजिटल कला और कलेक्टिबल्स में निवेश',
  81: 'भारतीय क्रिप्टो वॉलेट: सुरक्षित निवेश के लिए सर्वोत्तम विकल्प',
  82: 'भारत में डिफाई (DeFi): यील्ड फार्मिंग और स्टेकिंग अवसर',
  83: 'भारतीय क्रिप्टो माइनिंग: कानूनी स्थिति और लाभदायकता',
  84: 'भारत में स्टेबलकॉइन: USDT, USDC और भारतीय रुपया',
  85: 'भारतीय क्रिप्टो पोर्टफोलियो: विविधीकरण और जोखिम प्रबंधन',
  86: 'भारत में क्रिप्टो स्कैम्स: कैसे बचें और सुरक्षित रहें',
  87: 'भारतीय क्रिप्टो एडुकेशन: ब्लॉकचेन और क्रिप्टोग्राफी की बुनियादी बातें',
  88: 'भारत में क्रिप्टो इनोवेशन: स्टार्टअप्स और नई तकनीकें',
  89: 'भारत में क्रिप्टो गेमिंग: प्ले-टू-अर्न और मेटावर्स',
  90: 'भारतीय क्रिप्टो कम्युनिटी: ट्रेडर्स, इन्वेस्टर्स और डेवलपर्स',
  91: 'भारत में क्रिप्टो फ्यूचर्स: CBDC और डिजिटल रुपया',
  92: 'भारतीय क्रिप्टो मार्केट एनालिसिस: तकनीकी और मौलिक विश्लेषण',
  93: 'भारत में क्रिप्टो इंश्योरेंस: निवेश सुरक्षा और बीमा विकल्प',
  94: 'भारतीय क्रिप्टो लेंडिंग: ब्याज अर्जित करने के तरीके',
  95: 'भारत में क्रिप्टो पेमेंट: डिजिटल भुगतान का भविष्य',
  96: 'भारतीय क्रिप्टो रेमिटेंस: विदेशी मुद्रा हस्तांतरण',
  97: 'भारत में क्रिप्टो रियल एस्टेट: प्रॉपर्टी में निवेश',
  98: 'भारतीय क्रिप्टो माइक्रो-इन्वेस्टमेंट: छोटी राशि से शुरुआत',
  99: 'भारत में क्रिप्टो रिटायरमेंट प्लानिंग: लंबी अवधि के लक्ष्य',
  100: 'भारत में क्रिप्टो सोशल ट्रेडिंग: अनुभवी ट्रेडर्स से सीखें'
};

// Function to fetch crypto news from RSS feeds
async function fetchCryptoRSSFeeds() {
  const allNews = [];
  
  for (const feedUrl of CRYPTO_RSS_FEEDS) {
    try {
      console.log(`Fetching from: ${feedUrl}`);
      const response = await axios.get(feedUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(response.data);
      
      if (result.rss && result.rss.channel && result.rss.channel[0].item) {
        const items = result.rss.channel[0].item.slice(0, 5); // Get latest 5 items
        items.forEach(item => {
          allNews.push({
            title: item.title ? item.title[0] : '',
            description: item.description ? item.description[0] : '',
            link: item.link ? item.link[0] : '',
            pubDate: item.pubDate ? item.pubDate[0] : new Date().toISOString(),
            source: feedUrl
          });
        });
      }
    } catch (error) {
      console.error(`Error fetching from ${feedUrl}:`, error.message);
    }
  }
  
  return allNews;
}

// Function to get next crypto blog ID
function getNextCryptoBlogId() {
  const cryptoDir = path.join(__dirname, 'src', 'data', 'crypto');
  const files = fs.readdirSync(cryptoDir).filter(file => file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts');
  
  if (files.length === 0) {
    return 75; // Start from 75 for new Indian crypto blogs
  }
  
  const ids = files.map(file => parseInt(file.replace('.ts', '')));
  return Math.max(...ids) + 1;
}

// Function to generate Indian crypto blog content
function generateCryptoBlogContent(topic, newsData, blogId) {
  const currentDate = new Date().toISOString().split('T')[0];
  const slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  const content = [
    {
      type: 'heading',
      text: topic
    },
    {
      type: 'paragraph',
      text: `भारतीय क्रिप्टोकरेंसी बाजार में तेजी से बदलाव आ रहे हैं। ${topic.toLowerCase()} भारतीय निवेशकों के लिए एक महत्वपूर्ण विषय बन गया है। यह लेख आपको भारतीय संदर्भ में इस क्षेत्र में निवेश के बारे में विस्तृत जानकारी प्रदान करेगा।`
    },
    {
      type: 'subheading',
      text: 'भारतीय क्रिप्टो बाजार की वर्तमान स्थिति'
    },
    {
      type: 'paragraph',
      text: '2025 में भारतीय क्रिप्टोकरेंसी बाजार में काफी परिपक्वता आई है। WazirX, CoinDCX जैसे भारतीय एक्सचेंजों की बढ़ती लोकप्रियता और सरकार की नीतियों में स्पष्टता के साथ, भारतीय निवेशक अब क्रिप्टोकरेंसी को गंभीरता से ले रहे हैं।'
    },
    {
      type: 'subheading',
      text: 'भारतीय निवेशकों के लिए अवसर'
    },
    {
      type: 'paragraph',
      text: 'भारत में क्रिप्टोकरेंसी में निवेश करने के कई तरीके हैं। आप भारतीय एक्सचेंजों पर कॉइन खरीद सकते हैं, डिफाई प्रोटोकॉल में निवेश कर सकते हैं, या NFT में निवेश कर सकते हैं।'
    },
    {
      type: 'list',
      text: 'भारतीय एक्सचेंज: WazirX, CoinDCX, Unocoin जैसे प्लेटफॉर्म्स पर निवेश'
    },
    {
      type: 'list',
      text: 'डिफाई प्रोटोकॉल: यील्ड फार्मिंग और स्टेकिंग के माध्यम से आय अर्जित करना'
    },
    {
      type: 'list',
      text: 'NFT निवेश: भारतीय कलाकारों और कलेक्टिबल्स में निवेश'
    },
    {
      type: 'list',
      text: 'स्टेकिंग: प्रूफ-ऑफ-स्टेक क्रिप्टोकरेंसी में स्टेक करके ब्याज अर्जित करना'
    },
    {
      type: 'subheading',
      text: 'भारतीय क्रिप्टो विनियमन'
    },
    {
      type: 'paragraph',
      text: 'भारत में क्रिप्टोकरेंसी का विनियमन अभी भी विकसित हो रहा है। सरकार ने क्रिप्टोकरेंसी पर 30% कर लगाया है और 1% टीडीएस भी लागू किया है। RBI ने भी क्रिप्टोकरेंसी के संबंध में अपनी नीतियों को स्पष्ट किया है।'
    },
    {
      type: 'subheading',
      text: 'भारतीय क्रिप्टो एक्सचेंज'
    },
    {
      type: 'paragraph',
      text: 'भारत में कई प्रमुख क्रिप्टो एक्सचेंज हैं जो भारतीय निवेशकों को सेवाएं प्रदान करते हैं। WazirX, CoinDCX, Unocoin जैसे एक्सचेंज भारतीय रुपया में क्रिप्टोकरेंसी खरीदने और बेचने की सुविधा प्रदान करते हैं।'
    },
    {
      type: 'subheading',
      text: 'भारतीय क्रिप्टो कराधान'
    },
    {
      type: 'paragraph',
      text: 'भारत में क्रिप्टोकरेंसी से होने वाली आय पर 30% कर लगता है। इसके अलावा, क्रिप्टोकरेंसी की खरीद पर 1% टीडीएस भी लागू है। क्रिप्टोकरेंसी लेन-देन का रिकॉर्ड रखना महत्वपूर्ण है।'
    },
    {
      type: 'subheading',
      text: 'भारतीय क्रिप्टो सुरक्षा'
    },
    {
      type: 'paragraph',
      text: 'भारतीय निवेशकों के लिए क्रिप्टोकरेंसी सुरक्षा महत्वपूर्ण है। आपको विश्वसनीय एक्सचेंज का उपयोग करना चाहिए, दो-कारक प्रमाणीकरण का उपयोग करना चाहिए, और अपने निजी कुंजी को सुरक्षित रखना चाहिए।'
    },
    {
      type: 'subheading',
      text: 'भारतीय क्रिप्टो का भविष्य'
    },
    {
      type: 'paragraph',
      text: 'भारत में क्रिप्टोकरेंसी का भविष्य बहुत उज्ज्वल दिखता है। सरकार की डिजिटल रुपया पहल और ब्लॉकचेन तकनीक के विकास के साथ, भारत क्रिप्टोकरेंसी के क्षेत्र में एक महत्वपूर्ण खिलाड़ी बन रहा है।'
    },
    {
      type: 'subheading',
      text: 'निष्कर्ष'
    },
    {
      type: 'paragraph',
      text: `${topic} में निवेश करने से पहले अच्छी तरह से शोध करें और अपनी वित्तीय स्थिति का मूल्यांकन करें। भारतीय क्रिप्टोकरेंसी बाजार बहुत अस्थिर है और अचानक मूल्य परिवर्तन हो सकते हैं। साथ ही, कराधान और विनियामक मुद्दों को भी ध्यान में रखें।`
    }
  ];

  return `import { CryptoBlogPost } from './types';

export const crypto${blogId}: CryptoBlogPost = {
  id: '${blogId}',
  title: '${topic}',
  slug: '${slug}',
  description: '${topic} के बारे में विस्तृत जानकारी और भारतीय निवेशकों के लिए मार्गदर्शन।',
  content: ${JSON.stringify(content, null, 2)},
  category: 'भारतीय क्रिप्टोकरेंसी',
  tags: ['भारतीय क्रिप्टो', 'क्रिप्टोकरेंसी', 'निवेश', 'डिजिटल एसेट्स', 'ब्लॉकचेन', 'भारत', 'WazirX', 'CoinDCX'],
  author: 'मनीकैल टीम',
  publishedDate: '${currentDate}',
  lastModified: '${currentDate}',
  readTime: '10 मिनट',
  metaDescription: '${topic} के बारे में विस्तृत जानकारी और भारतीय निवेशकों के लिए मार्गदर्शन।',
  keywords: ['भारतीय क्रिप्टो', 'क्रिप्टोकरेंसी', 'निवेश', 'डिजिटल एसेट्स', 'ब्लॉकचेन', 'भारत', 'WazirX', 'CoinDCX', 'क्रिप्टो टैक्स'],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '${topic}',
    description: '${topic} के बारे में विस्तृत जानकारी और भारतीय निवेशकों के लिए मार्गदर्शन।',
    author: {
      '@type': 'Person',
      name: 'मनीकैल टीम'
    },
    publisher: {
      '@type': 'Organization',
      name: 'मनीकैल',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moneycal.in/logo.png'
      }
    },
    datePublished: '${currentDate}',
    dateModified: '${currentDate}',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://moneycal.in/crypto/${slug}'
    },
    keywords: 'भारतीय क्रिप्टो, क्रिप्टोकरेंसी, निवेश, डिजिटल एसेट्स, ब्लॉकचेन, भारत, WazirX, CoinDCX, क्रिप्टो टैक्स'
  },
  openGraph: {
    title: '${topic}',
    description: '${topic} के बारे में विस्तृत जानकारी और भारतीय निवेशकों के लिए मार्गदर्शन।',
    type: 'article',
    url: 'https://moneycal.in/crypto/${slug}',
    siteName: 'मनीकैल'
  }
};`;
}

// Function to create crypto blog file
function createCryptoBlogFile(blogId, content) {
  const filePath = path.join(__dirname, 'src', 'data', 'crypto', `${blogId}.ts`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created crypto blog file: ${blogId}.ts`);
}

// Function to update crypto index file
function updateCryptoIndexFile(newBlogIds) {
  const indexPath = path.join(__dirname, 'src', 'data', 'crypto', 'index.ts');
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Add imports
  newBlogIds.forEach(blogId => {
    const importLine = `import { crypto${blogId} } from './${blogId}';`;
    if (!indexContent.includes(importLine)) {
      indexContent = indexContent.replace(
        '// Auto-generated crypto blog imports',
        `// Auto-generated crypto blog imports\nimport { crypto${blogId} } from './${blogId}';`
      );
    }
  });
  
  // Add to array
  const arrayMatch = indexContent.match(/export const cryptoBlogs: CryptoBlogPost\[\] = \[([\s\S]*?)\];/);
  if (arrayMatch) {
    const currentArray = arrayMatch[1];
    const newArray = newBlogIds.map(id => `  crypto${id},`).join('\n');
    indexContent = indexContent.replace(
      /export const cryptoBlogs: CryptoBlogPost\[\] = \[([\s\S]*?)\];/,
      `export const cryptoBlogs: CryptoBlogPost[] = [\n${currentArray.trim()}\n${newArray}\n];`
    );
  }
  
  // Add exports
  newBlogIds.forEach(blogId => {
    const exportLine = `export { crypto${blogId} } from './${blogId}';`;
    if (!indexContent.includes(exportLine)) {
      indexContent = indexContent.replace(
        '// Export individual crypto blogs',
        `// Export individual crypto blogs\nexport { crypto${blogId} } from './${blogId}';`
      );
    }
  });
  
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log('Updated crypto index file');
}

// Function to update sitemap with crypto blogs
function updateCryptoSitemap(newBlogIds) {
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const currentDate = new Date().toISOString().split('T')[0];
  
  const closingTagIndex = sitemapContent.lastIndexOf('</urlset>');
  if (closingTagIndex !== -1) {
    let newEntries = '';
    newBlogIds.forEach(blogId => {
      const topic = CRYPTO_BLOG_TOPICS[blogId] || `क्रिप्टोकरेंसी निवेश गाइड ${blogId}`;
      const blogSlug = topic
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      newEntries += `\n  <url>\n    <loc>https://moneycal.in/crypto/${blogSlug}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    });
    sitemapContent = sitemapContent.slice(0, closingTagIndex) + newEntries + '\n' + sitemapContent.slice(closingTagIndex);
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log(`Updated sitemap.xml with ${newBlogIds.length} new crypto blog entries`);
  }
}

// Function to commit and push changes
function commitAndPushCryptoChanges() {
  const commands = [
    'git add .',
    'git commit -m "🤖 Auto-generated crypto blog posts - $(date +\'%Y-%m-%d %H:%M:%S\')"',
    'git push origin main'
  ];
  
  commands.forEach(command => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${command}:`, error);
        return;
      }
      console.log(`Executed: ${command}`);
    });
  });
}

// Main function to generate Indian crypto blogs
async function generateCryptoBlogs() {
  try {
    console.log('🚀 Starting Indian crypto blog generation...');
    
    // Fetch Indian crypto news
    const newsData = await fetchCryptoRSSFeeds();
    console.log(`📰 Fetched ${newsData.length} Indian crypto news items`);
    
    // Generate 5 new Indian crypto blogs
    const newBlogIds = [];
    for (let i = 0; i < 5; i++) {
      const blogId = getNextCryptoBlogId();
      const topic = CRYPTO_BLOG_TOPICS[blogId] || `भारतीय क्रिप्टोकरेंसी निवेश गाइड ${blogId}`;
      
      const content = generateCryptoBlogContent(topic, newsData, blogId);
      createCryptoBlogFile(blogId, content);
      newBlogIds.push(blogId);
    }
    
    // Update index file
    updateCryptoIndexFile(newBlogIds);
    
    // Update sitemap
    updateCryptoSitemap(newBlogIds);
    
    // Commit and push changes
    commitAndPushCryptoChanges();
    
    console.log(`✅ Generated ${newBlogIds.length} Indian crypto blog posts: ${newBlogIds.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error generating Indian crypto blogs:', error);
  }
}

// Schedule daily Indian crypto blog generation at 6 AM IST
cron.schedule('0 6 * * *', () => {
  console.log('🕕 6 AM IST - Starting daily Indian crypto blog generation...');
  generateCryptoBlogs();
}, { timezone: 'Asia/Kolkata' });

// Export for manual execution
module.exports = { generateCryptoBlogs };

// Run if called directly
if (require.main === module) {
  generateCryptoBlogs();
}
