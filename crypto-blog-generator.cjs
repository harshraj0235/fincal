const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');
const cron = require('node-cron');
const { exec } = require('child_process');

// Crypto RSS Feeds
const CRYPTO_RSS_FEEDS = [
  'https://cointelegraph.com/rss',
  'https://cryptonews.com/news/feed',
  'https://bitcoinmagazine.com/.rss/full/',
  'https://decrypt.co/feed',
  'https://www.coindesk.com/arc/outboundfeeds/rss/'
];

// Crypto blog topics mapping
const CRYPTO_BLOG_TOPICS = {
  74: 'क्रिप्टोकरेंसी में निवेश: 2025 में बिटकॉइन और डिजिटल एसेट्स का पूरा गाइड',
  75: 'एथेरियम 2.0: स्टेकिंग और डीएपी का भविष्य',
  76: 'डिफाई (DeFi) निवेश: यील्ड फार्मिंग और लिक्विडिटी माइनिंग',
  77: 'NFT बाजार: डिजिटल कला और कलेक्टिबल्स में निवेश',
  78: 'क्रिप्टो वॉलेट सुरक्षा: हॉट वॉलेट vs कोल्ड वॉलेट',
  79: 'क्रिप्टो ट्रेडिंग रणनीतियां: स्कैल्पिंग से लेकर होल्डिंग तक',
  80: 'स्टेबलकॉइन: USDT, USDC और DAI का विश्लेषण',
  81: 'क्रिप्टो माइनिंग: प्रूफ-ऑफ-वर्क और प्रूफ-ऑफ-स्टेक',
  82: 'क्रिप्टो एक्सचेंज: कौन सा एक्सचेंज सबसे अच्छा है?',
  83: 'क्रिप्टो टैक्स: भारत में क्रिप्टोकरेंसी पर कराधान',
  84: 'क्रिप्टो रेगुलेशन: भारत और विश्व में कानूनी स्थिति',
  85: 'क्रिप्टो पोर्टफोलियो डायवर्सिफिकेशन',
  86: 'क्रिप्टो रिस्क मैनेजमेंट: स्टॉप-लॉस और टेक-प्रॉफिट',
  87: 'क्रिप्टो टेक्निकल एनालिसिस: चार्ट पैटर्न और इंडिकेटर्स',
  88: 'क्रिप्टो फंडामेंटल एनालिसिस: टोकनोमिक्स और यूटिलिटी',
  89: 'क्रिप्टो स्कैम्स: कैसे बचें और सुरक्षित रहें',
  90: 'क्रिप्टो एडुकेशन: ब्लॉकचेन और क्रिप्टोग्राफी की बुनियादी बातें',
  91: 'क्रिप्टो इनोवेशन: लेयर 2 सॉल्यूशन्स और स्केलेबिलिटी',
  92: 'क्रिप्टो इकोसिस्टम: डेवलपर्स और प्रोजेक्ट्स',
  93: 'क्रिप्टो गेमिंग: प्ले-टू-अर्न और मेटावर्स'
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
    return 74; // Start from 74
  }
  
  const ids = files.map(file => parseInt(file.replace('.ts', '')));
  return Math.max(...ids) + 1;
}

// Function to generate crypto blog content
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
      text: `क्रिप्टोकरेंसी बाजार में नई तकनीक और निवेश अवसरों की लगातार बढ़ती मांग के साथ, ${topic.toLowerCase()} एक महत्वपूर्ण विषय बन गया है। यह लेख आपको इस क्षेत्र में निवेश के बारे में विस्तृत जानकारी प्रदान करेगा।`
    },
    {
      type: 'subheading',
      text: 'वर्तमान बाजार की स्थिति'
    },
    {
      type: 'paragraph',
      text: '2025 में क्रिप्टोकरेंसी बाजार में काफी परिपक्वता आई है। संस्थागत निवेशकों की बढ़ती रुचि और विनियामक स्पष्टता के साथ, डिजिटल एसेट्स मुख्यधारा में आ रहे हैं।'
    },
    {
      type: 'subheading',
      text: 'निवेश के अवसर'
    },
    {
      type: 'paragraph',
      text: 'क्रिप्टोकरेंसी में निवेश करने के कई तरीके हैं। आप सीधे कॉइन खरीद सकते हैं, डिफाई प्रोटोकॉल में निवेश कर सकते हैं, या NFT में निवेश कर सकते हैं।'
    },
    {
      type: 'list',
      text: 'सीधे क्रिप्टोकरेंसी खरीदना: बिटकॉइन, एथेरियम जैसी प्रमुख क्रिप्टोकरेंसी में निवेश'
    },
    {
      type: 'list',
      text: 'डिफाई प्रोटोकॉल: यील्ड फार्मिंग और लिक्विडिटी प्रदान करना'
    },
    {
      type: 'list',
      text: 'NFT निवेश: डिजिटल कला और कलेक्टिबल्स में निवेश'
    },
    {
      type: 'list',
      text: 'स्टेकिंग: प्रूफ-ऑफ-स्टेक क्रिप्टोकरेंसी में स्टेक करना'
    },
    {
      type: 'subheading',
      text: 'जोखिम प्रबंधन'
    },
    {
      type: 'paragraph',
      text: 'क्रिप्टोकरेंसी में निवेश करते समय जोखिम प्रबंधन महत्वपूर्ण है। आपको अपने पोर्टफोलियो का विविधीकरण करना चाहिए और केवल उतनी राशि का निवेश करना चाहिए जिसे आप खो सकते हैं।'
    },
    {
      type: 'subheading',
      text: 'भारत में क्रिप्टोकरेंसी'
    },
    {
      type: 'paragraph',
      text: 'भारत में क्रिप्टोकरेंसी का विनियमन अभी भी विकसित हो रहा है। सरकार ने क्रिप्टोकरेंसी पर 30% कर लगाया है और 1% टीडीएस भी लागू किया है।'
    },
    {
      type: 'subheading',
      text: 'भविष्य की संभावनाएं'
    },
    {
      type: 'paragraph',
      text: 'क्रिप्टोकरेंसी का भविष्य बहुत उज्ज्वल दिखता है। ब्लॉकचेन तकनीक का विकास और नए उपयोग मामलों की खोज के साथ, यह क्षेत्र तेजी से बढ़ रहा है।'
    },
    {
      type: 'subheading',
      text: 'निष्कर्ष'
    },
    {
      type: 'paragraph',
      text: `${topic} में निवेश करने से पहले अच्छी तरह से शोध करें और अपनी वित्तीय स्थिति का मूल्यांकन करें। क्रिप्टोकरेंसी बाजार बहुत अस्थिर है और अचानक मूल्य परिवर्तन हो सकते हैं।`
    }
  ];

  return `import { CryptoBlogPost } from './types';

export const crypto${blogId}: CryptoBlogPost = {
  id: '${blogId}',
  title: '${topic}',
  slug: '${slug}',
  description: '${topic} के बारे में विस्तृत जानकारी और निवेश मार्गदर्शन।',
  content: ${JSON.stringify(content, null, 2)},
  category: 'क्रिप्टोकरेंसी',
  tags: ['क्रिप्टोकरेंसी', 'निवेश', 'डिजिटल एसेट्स', 'ब्लॉकचेन', 'भारत'],
  author: 'मनीकैल टीम',
  publishedDate: '${currentDate}',
  lastModified: '${currentDate}',
  readTime: '8 मिनट',
  metaDescription: '${topic} के बारे में विस्तृत जानकारी और निवेश मार्गदर्शन।',
  keywords: ['क्रिप्टोकरेंसी', 'निवेश', 'डिजिटल एसेट्स', 'ब्लॉकचेन', 'भारत'],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '${topic}',
    description: '${topic} के बारे में विस्तृत जानकारी और निवेश मार्गदर्शन।',
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
    keywords: 'क्रिप्टोकरेंसी, निवेश, डिजिटल एसेट्स, ब्लॉकचेन, भारत'
  },
  openGraph: {
    title: '${topic}',
    description: '${topic} के बारे में विस्तृत जानकारी और निवेश मार्गदर्शन।',
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

// Main function to generate crypto blogs
async function generateCryptoBlogs() {
  try {
    console.log('🚀 Starting crypto blog generation...');
    
    // Fetch crypto news
    const newsData = await fetchCryptoRSSFeeds();
    console.log(`📰 Fetched ${newsData.length} crypto news items`);
    
    // Generate 5 new crypto blogs
    const newBlogIds = [];
    for (let i = 0; i < 5; i++) {
      const blogId = getNextCryptoBlogId();
      const topic = CRYPTO_BLOG_TOPICS[blogId] || `क्रिप्टोकरेंसी निवेश गाइड ${blogId}`;
      
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
    
    console.log(`✅ Generated ${newBlogIds.length} crypto blog posts: ${newBlogIds.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error generating crypto blogs:', error);
  }
}

// Schedule daily crypto blog generation at 6 AM IST
cron.schedule('0 6 * * *', () => {
  console.log('🕕 6 AM IST - Starting daily crypto blog generation...');
  generateCryptoBlogs();
}, { timezone: 'Asia/Kolkata' });

// Export for manual execution
module.exports = { generateCryptoBlogs };

// Run if called directly
if (require.main === module) {
  generateCryptoBlogs();
}
