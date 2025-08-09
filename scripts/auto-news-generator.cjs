const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  BLOG_DIR: path.join(__dirname, '../src/data/blogs'),
  TOPICS: ['finance', 'technology', 'business', 'stock market', 'cryptocurrency', 'startup', 'investment', 'banking', 'insurance', 'real estate'],
  CITIES: [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
    'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi'
  ],
  INTERVAL_HOURS: 36,
  POSTS_PER_CYCLE: 10,
  WORD_COUNT_TARGET: 1200,
  UPDATE_INTERVAL_HOURS: 24
};

// Google News API endpoints (using RSS feeds for trending topics)
const NEWS_SOURCES = {
  FINANCE: 'https://news.google.com/rss/search?q=finance+india&hl=hi&gl=IN&ceid=IN:hi',
  TECHNOLOGY: 'https://news.google.com/rss/search?q=technology+india&hl=hi&gl=IN&ceid=IN:hi',
  BUSINESS: 'https://news.google.com/rss/search?q=business+india&hl=hi&gl=IN&ceid=IN:hi',
  STOCK_MARKET: 'https://news.google.com/rss/search?q=stock+market+india&hl=hi&gl=IN&ceid=IN:hi',
  CRYPTO: 'https://news.google.com/rss/search?q=cryptocurrency+india&hl=hi&gl=IN&ceid=IN:hi'
};

// Hindi content templates for different news categories
const HINDI_TEMPLATES = {
  FINANCE: {
    intro: [
      'भारतीय वित्तीय क्षेत्र में नई गतिविधियों के साथ',
      'देश के आर्थिक विकास में महत्वपूर्ण योगदान देते हुए',
      'वित्तीय बाजार में नए अवसरों की तलाश में',
      'भारतीय अर्थव्यवस्था के विकास में सहायक'
    ],
    body: [
      'यह विकास भारतीय अर्थव्यवस्था के लिए एक सकारात्मक संकेत है। विशेषज्ञों का मानना है कि इससे निवेशकों को नए अवसर मिलेंगे और देश का आर्थिक विकास तेज होगा।',
      'इस नीति के कार्यान्वयन से छोटे और मध्यम उद्यमों को लाभ होगा, जो देश के रोजगार सृजन में महत्वपूर्ण भूमिका निभाते हैं।',
      'बाजार विश्लेषकों का कहना है कि यह कदम दीर्घकालिक विकास के लिए फायदेमंद साबित होगा और निवेशकों का विश्वास बढ़ाएगा।',
      'इस विकास से न केवल वित्तीय क्षेत्र बल्कि संबंधित उद्योगों को भी लाभ होगा, जो समग्र आर्थिक विकास में योगदान करेगा।'
    ],
    conclusion: [
      'भविष्य में इस क्षेत्र में और भी सकारात्मक विकास देखने को मिल सकते हैं।',
      'यह विकास भारतीय अर्थव्यवस्था के लिए एक मील का पत्थर साबित होगा।',
      'विशेषज्ञों का मानना है कि यह प्रवृत्ति जारी रहेगी।',
      'इससे भारतीय वित्तीय क्षेत्र की वैश्विक प्रतिष्ठा में वृद्धि होगी।'
    ]
  },
  TECHNOLOGY: {
    intro: [
      'भारतीय तकनीकी क्षेत्र में नवीनतम विकास के साथ',
      'डिजिटल इंडिया मिशन के तहत नई पहलों के साथ',
      'भारतीय स्टार्टअप इकोसिस्टम में नए अवसरों के साथ',
      'तकनीकी नवाचार के माध्यम से देश के विकास में'
    ],
    body: [
      'यह तकनीकी विकास भारत को वैश्विक तकनीकी महाशक्ति बनाने की दिशा में एक महत्वपूर्ण कदम है।',
      'इस नवाचार से न केवल तकनीकी क्षेत्र बल्कि अन्य उद्योगों को भी लाभ होगा।',
      'विशेषज्ञों का मानना है कि यह विकास भारतीय स्टार्टअप इकोसिस्टम को और मजबूत करेगा।',
      'इससे भारतीय युवाओं को नए रोजगार के अवसर मिलेंगे और देश का तकनीकी विकास तेज होगा।'
    ],
    conclusion: [
      'भविष्य में इस क्षेत्र में और भी नवीनतम तकनीकी विकास देखने को मिल सकते हैं।',
      'यह विकास भारत को वैश्विक तकनीकी नेतृत्व की ओर ले जाएगा।',
      'विशेषज्ञों का मानना है कि यह प्रवृत्ति जारी रहेगी।',
      'इससे भारतीय तकनीकी क्षेत्र की वैश्विक प्रतिष्ठा में वृद्धि होगी।'
    ]
  },
  BUSINESS: {
    intro: [
      'भारतीय व्यापार क्षेत्र में नए विकास के साथ',
      'देश के आर्थिक विकास में महत्वपूर्ण योगदान देते हुए',
      'व्यापारिक गतिविधियों में नए अवसरों की तलाश में',
      'भारतीय उद्योग जगत के विकास में सहायक'
    ],
    body: [
      'यह विकास भारतीय व्यापार क्षेत्र के लिए एक सकारात्मक संकेत है। विशेषज्ञों का मानना है कि इससे नए रोजगार के अवसर सृजित होंगे।',
      'इस पहल से छोटे और मध्यम उद्यमों को लाभ होगा, जो देश के आर्थिक विकास में महत्वपूर्ण भूमिका निभाते हैं।',
      'बाजार विश्लेषकों का कहना है कि यह कदम दीर्घकालिक विकास के लिए फायदेमंद साबित होगा।',
      'इस विकास से न केवल व्यापार क्षेत्र बल्कि संबंधित उद्योगों को भी लाभ होगा।'
    ],
    conclusion: [
      'भविष्य में इस क्षेत्र में और भी सकारात्मक विकास देखने को मिल सकते हैं।',
      'यह विकास भारतीय व्यापार क्षेत्र के लिए एक मील का पत्थर साबित होगा।',
      'विशेषज्ञों का मानना है कि यह प्रवृत्ति जारी रहेगी।',
      'इससे भारतीय व्यापार क्षेत्र की वैश्विक प्रतिष्ठा में वृद्धि होगी।'
    ]
  }
};

// Utility functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomCity() {
  return getRandomElement(CONFIG.CITIES);
}

function getRandomTopic() {
  return getRandomElement(CONFIG.TOPICS);
}

function getRandomTemplate(category) {
  const templates = HINDI_TEMPLATES[category.toUpperCase()] || HINDI_TEMPLATES.BUSINESS;
  return {
    intro: getRandomElement(templates.intro),
    body: getRandomElement(templates.body),
    body2: getRandomElement(templates.body),
    conclusion: getRandomElement(templates.conclusion)
  };
}

function generateHindiContent(topic, city, category, wordCount = CONFIG.WORD_COUNT_TARGET) {
  const template = getRandomTemplate(category);
  
  // Base content structure
  let content = `${template.intro} ${city} में ${topic} के क्षेत्र में एक महत्वपूर्ण विकास देखने को मिला है। `;
  
  // Add more detailed content to reach word count
  content += `${template.body} ${city} के ${topic} क्षेत्र में यह विकास विशेष रूप से महत्वपूर्ण है क्योंकि यह शहर देश के प्रमुख आर्थिक केंद्रों में से एक है। `;
  
  content += `${template.body2} ${city} के निवेशकों और व्यापारियों के लिए यह एक सुनहरा अवसर है। `;
  
  // Add more contextual content
  content += `${city} में ${topic} के क्षेत्र में पहले से ही कई सफल उद्यम स्थापित हैं, और यह नया विकास उन्हें और भी मजबूत करेगा। `;
  
  content += `शहर के युवा उद्यमियों के लिए यह विकास विशेष रूप से फायदेमंद साबित होगा। `;
  
  content += `${city} के ${topic} क्षेत्र में यह विकास न केवल स्थानीय स्तर पर बल्कि राष्ट्रीय स्तर पर भी महत्वपूर्ण है। `;
  
  content += `विशेषज्ञों का मानना है कि ${city} में ${topic} के क्षेत्र में यह विकास एक नई शुरुआत है। `;
  
  content += `${template.conclusion} ${city} के ${topic} क्षेत्र में यह विकास भारतीय अर्थव्यवस्था के लिए एक सकारात्मक संकेत है। `;
  
  // Ensure content meets word count
  while (content.split(' ').length < wordCount * 0.8) {
    content += `यह विकास ${city} के ${topic} क्षेत्र में नए अवसर सृजित करेगा और देश के आर्थिक विकास में योगदान करेगा। `;
  }
  
  return content.trim();
}

function fetchGoogleNewsRSS(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          // Simple RSS parsing for trending topics
          const topics = [];
          const lines = data.split('\n');
          
          for (const line of lines) {
            if (line.includes('<title>') && !line.includes('Google News')) {
              const title = line.replace(/<title>|<\/title>/g, '').trim();
              if (title && title.length > 10) {
                topics.push(title);
              }
            }
          }
          
          resolve(topics.slice(0, 20)); // Return top 20 trending topics
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

function getNextBlogNumber() {
  try {
    const files = fs.readdirSync(CONFIG.BLOG_DIR);
    const blogFiles = files.filter(file => file.endsWith('.ts') && /^\d+\.ts$/.test(file));
    
    if (blogFiles.length === 0) return 1;
    
    const numbers = blogFiles.map(file => parseInt(file.replace('.ts', '')));
    return Math.max(...numbers) + 1;
  } catch (error) {
    console.error('Error getting next blog number:', error);
    return 1;
  }
}

function createBlogPost(number, topic, city, category, content) {
  const currentDate = new Date().toISOString().split('T')[0];
  const nextUpdateDate = new Date(Date.now() + CONFIG.UPDATE_INTERVAL_HOURS * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const blogContent = `import { BlogPost } from './types';

export const blog${number}: BlogPost = {
  id: ${number},
  title: '${topic} में ${city} में नया विकास - ${new Date().getFullYear()}',
  excerpt: '${city} में ${topic} के क्षेत्र में एक महत्वपूर्ण विकास देखने को मिला है। यह विकास भारतीय अर्थव्यवस्था के लिए एक सकारात्मक संकेत है।',
  content: \`${content}\`,
  author: 'MoneyCal India',
  authorImage: '/images/authors/moneycal-india.jpg',
  date: '${currentDate}',
  lastUpdated: '${nextUpdateDate}',
  category: '${category}',
  tags: ['${city}', '${topic}', 'भारत', 'अर्थव्यवस्था', 'विकास'],
  readTime: '${Math.ceil(content.split(' ').length / 200)} min read',
  featured: false,
  trending: true,
  seo: {
    title: '${topic} में ${city} में नया विकास ${new Date().getFullYear()} | MoneyCal India',
    description: '${city} में ${topic} के क्षेत्र में एक महत्वपूर्ण विकास देखने को मिला है। यह विकास भारतीय अर्थव्यवस्था के लिए एक सकारात्मक संकेत है।',
    keywords: '${city}, ${topic}, भारत, अर्थव्यवस्था, विकास, निवेश, रोजगार',
    canonicalUrl: \`https://moneycal.in/blog/${number}\`,
    ogImage: '/images/blog/${number}-og.jpg',
    ogTitle: '${topic} में ${city} में नया विकास ${new Date().getFullYear()}',
    ogDescription: '${city} में ${topic} के क्षेत्र में एक महत्वपूर्ण विकास देखने को मिला है।',
    twitterCard: 'summary_large_image',
    twitterTitle: '${topic} में ${city} में नया विकास ${new Date().getFullYear()}',
    twitterDescription: '${city} में ${topic} के क्षेत्र में एक महत्वपूर्ण विकास देखने को मिला है।',
    schema: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "${topic} में ${city} में नया विकास ${new Date().getFullYear()}",
      "description": "${city} में ${topic} के क्षेत्र में एक महत्वपूर्ण विकास देखने को मिला है।",
      "image": "/images/blog/${number}-og.jpg",
      "author": {
        "@type": "Organization",
        "name": "MoneyCal India"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MoneyCal India",
        "logo": {
          "@type": "ImageObject",
          "url": "https://moneycal.in/logo.png"
        }
      },
      "datePublished": "${currentDate}",
      "dateModified": "${nextUpdateDate}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://moneycal.in/blog/${number}"
      }
    }
  }
};
`;

  const filePath = path.join(CONFIG.BLOG_DIR, `${number}.ts`);
  fs.writeFileSync(filePath, blogContent, 'utf8');
  console.log(`✅ Created blog post ${number}: ${topic} in ${city}`);
}

async function generateNewsBlogs() {
  try {
    console.log('🚀 Starting automated news blog generation...');
    
    // Fetch trending topics from Google News
    const allTopics = [];
    for (const [category, url] of Object.entries(NEWS_SOURCES)) {
      try {
        console.log(`📰 Fetching ${category} news from Google News...`);
        const topics = await fetchGoogleNewsRSS(url);
        allTopics.push(...topics.map(topic => ({ topic, category: category.toLowerCase() })));
      } catch (error) {
        console.error(`❌ Error fetching ${category} news:`, error.message);
      }
    }
    
    if (allTopics.length === 0) {
      console.log('⚠️ No trending topics found, using fallback topics...');
      allTopics.push(
        { topic: 'वित्तीय प्रौद्योगिकी', category: 'finance' },
        { topic: 'डिजिटल बैंकिंग', category: 'technology' },
        { topic: 'स्टार्टअप इकोसिस्टम', category: 'business' },
        { topic: 'क्रिप्टोकरेंसी', category: 'cryptocurrency' },
        { topic: 'रियल एस्टेट निवेश', category: 'investment' }
      );
    }
    
    // Shuffle topics to get variety
    allTopics.sort(() => Math.random() - 0.5);
    
    // Generate 10 new blog posts
    const startNumber = getNextBlogNumber();
    const endNumber = startNumber + CONFIG.POSTS_PER_CYCLE - 1;
    
    console.log(`📝 Generating ${CONFIG.POSTS_PER_CYCLE} blog posts from ${startNumber} to ${endNumber}...`);
    
    for (let i = 0; i < CONFIG.POSTS_PER_CYCLE; i++) {
      const blogNumber = startNumber + i;
      const topicData = allTopics[i % allTopics.length];
      const city = getRandomCity();
      
      const content = generateHindiContent(
        topicData.topic,
        city,
        topicData.category,
        CONFIG.WORD_COUNT_TARGET
      );
      
      createBlogPost(blogNumber, topicData.topic, city, topicData.category, content);
    }
    
    console.log(`✅ Successfully generated ${CONFIG.POSTS_PER_CYCLE} blog posts!`);
    
    // Update blog index file
    updateBlogIndex();
    
    // Commit and push changes
    await commitAndPushChanges();
    
    console.log('🎉 All changes committed and pushed to GitHub!');
    
  } catch (error) {
    console.error('❌ Error in news blog generation:', error);
  }
}

function updateBlogIndex() {
  try {
    const indexPath = path.join(CONFIG.BLOG_DIR, 'index.ts');
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Find the last blog import
    const lastImportMatch = indexContent.match(/import \{ blog(\d+) \} from '\.\/(\d+)';/g);
    if (lastImportMatch) {
      const lastImport = lastImportMatch[lastImportMatch.length - 1];
      const lastNumber = parseInt(lastImport.match(/blog(\d+)/)[1]);
      
      // Add new blog imports
      const startNumber = lastNumber + 1;
      const endNumber = startNumber + CONFIG.POSTS_PER_CYCLE - 1;
      
      for (let i = startNumber; i <= endNumber; i++) {
        const importLine = `import { blog${i} } from './${i}';`;
        indexContent = indexContent.replace(lastImport, `${lastImport}\n${importLine}`);
      }
      
      // Update allBlogPosts array
      const allBlogPostsMatch = indexContent.match(/allBlogPosts = \[([\s\S]*?)\];/);
      if (allBlogPostsMatch) {
        const currentBlogs = allBlogPostsMatch[1];
        let newBlogs = '';
        for (let i = startNumber; i <= endNumber; i++) {
          newBlogs += `\n  blog${i},`;
        }
        
        indexContent = indexContent.replace(
          allBlogPostsMatch[0],
          `allBlogPosts = [${currentBlogs}${newBlogs}\n];`
        );
      }
    }
    
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log('✅ Updated blog index file');
    
  } catch (error) {
    console.error('❌ Error updating blog index:', error);
  }
}

async function commitAndPushChanges() {
  try {
    console.log('📝 Committing changes to Git...');
    
    // Add all changes
    execSync('git add .', { stdio: 'inherit' });
    
    // Commit with descriptive message
    const commitMessage = `Auto-generate ${CONFIG.POSTS_PER_CYCLE} news blogs every ${CONFIG.INTERVAL_HOURS} hours - ${new Date().toISOString()}`;
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    // Push to GitHub
    console.log('🚀 Pushing changes to GitHub...');
    execSync('git push origin main', { stdio: 'inherit' });
    
    console.log('✅ Successfully pushed to GitHub!');
    
  } catch (error) {
    console.error('❌ Error in Git operations:', error);
  }
}

function scheduleNextRun() {
  const nextRun = new Date(Date.now() + CONFIG.INTERVAL_HOURS * 60 * 60 * 1000);
  console.log(`⏰ Next run scheduled for: ${nextRun.toLocaleString()}`);
  
  setTimeout(() => {
    generateNewsBlogs();
    scheduleNextRun(); // Schedule next run
  }, CONFIG.INTERVAL_HOURS * 60 * 60 * 1000);
}

// Auto-update existing blog dates every 24 hours
function updateExistingBlogDates() {
  try {
    console.log('🔄 Updating existing blog dates for freshness...');
    
    const files = fs.readdirSync(CONFIG.BLOG_DIR);
    const blogFiles = files.filter(file => file.endsWith('.ts') && /^\d+\.ts$/.test(file));
    
    for (const file of blogFiles) {
      const filePath = path.join(CONFIG.BLOG_DIR, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Update lastUpdated date
      const currentDate = new Date().toISOString().split('T')[0];
      content = content.replace(
        /lastUpdated: '[\d-]+'/g,
        `lastUpdated: '${currentDate}'`
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
    }
    
    console.log(`✅ Updated ${blogFiles.length} blog posts with fresh dates`);
    
  } catch (error) {
    console.error('❌ Error updating blog dates:', error);
  }
}

// Main execution
async function main() {
  try {
    console.log('🎯 MoneyCal India - Automated News Blog Generator');
    console.log('================================================');
    console.log(`📊 Configuration:`);
    console.log(`   • Posts per cycle: ${CONFIG.POSTS_PER_CYCLE}`);
    console.log(`   • Generation interval: ${CONFIG.INTERVAL_HOURS} hours`);
    console.log(`   • Update interval: ${CONFIG.UPDATE_INTERVAL_HOURS} hours`);
    console.log(`   • Target word count: ${CONFIG.WORD_COUNT_TARGET}`);
    console.log(`   • Blog directory: ${CONFIG.BLOG_DIR}`);
    console.log('');
    
    // Initial run
    await generateNewsBlogs();
    
    // Schedule next runs
    scheduleNextRun();
    
    // Schedule daily blog date updates
    setInterval(updateExistingBlogDates, CONFIG.UPDATE_INTERVAL_HOURS * 60 * 60 * 1000);
    
    console.log('🔄 Script is now running continuously...');
    console.log('💡 Press Ctrl+C to stop the script');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
});

// Export functions for testing
module.exports = {
  generateNewsBlogs,
  updateExistingBlogDates,
  createBlogPost,
  generateHindiContent
};

// Run if called directly
if (require.main === module) {
  main();
}
