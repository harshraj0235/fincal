const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Enhanced Configuration
const CONFIG = {
  BLOG_DIR: path.join(__dirname, '../src/data/blogs'),
  TOPICS: [
    'वित्तीय प्रौद्योगिकी', 'डिजिटल बैंकिंग', 'स्टार्टअप इकोसिस्टम', 'क्रिप्टोकरेंसी', 'रियल एस्टेट निवेश',
    'म्यूचुअल फंड', 'शेयर मार्केट', 'इंश्योरेंस टेक', 'फिनटेक', 'डिजिटल पेमेंट', 'ब्लॉकचेन', 'AI फाइनेंस',
    'सस्टेनेबल इन्वेस्टमेंट', 'ग्रीन फाइनेंस', 'माइक्रोफाइनेंस', 'पी2पी लेंडिंग', 'रोबो एडवाइजरी',
    'डिजिटल वॉलेट', 'स्मार्ट कॉन्ट्रैक्ट्स', 'डिजिटल करेंसी', 'फाइनेंशियल लिटरेसी', 'इन्वेस्टमेंट प्लानिंग'
  ],
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

// Modern content templates with engaging structure
const MODERN_TEMPLATES = {
  FINANCE: {
    intro: [
      'भारतीय वित्तीय क्षेत्र में एक नई क्रांति की शुरुआत हो रही है',
      'डिजिटल युग में वित्तीय सेवाओं का नया अध्याय शुरू हो रहा है',
      'भारतीय अर्थव्यवस्था में नए वित्तीय अवसरों की खोज जारी है',
      'वित्तीय समावेशन के लिए नई तकनीकी पहलें सामने आ रही हैं'
    ],
    sections: [
      {
        title: '🚀 नवीनतम विकास',
        content: [
          'यह विकास भारतीय वित्तीय क्षेत्र के लिए एक मील का पत्थर साबित हो रहा है।',
          'नई तकनीकों के माध्यम से वित्तीय सेवाएं अधिक सुलभ हो रही हैं।',
          'डिजिटल पेमेंट और बैंकिंग सेवाओं में तेजी से विकास देखने को मिल रहा है।'
        ]
      },
      {
        title: '💡 तकनीकी नवाचार',
        content: [
          'आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग का उपयोग बढ़ रहा है।',
          'ब्लॉकचेन तकनीक वित्तीय लेनदेन को और सुरक्षित बना रही है।',
          'मोबाइल बैंकिंग और डिजिटल वॉलेट का प्रचलन तेजी से बढ़ रहा है।'
        ]
      },
      {
        title: '📊 बाजार विश्लेषण',
        content: [
          'विशेषज्ञों का मानना है कि यह विकास दीर्घकालिक लाभ प्रदान करेगा।',
          'निवेशकों के लिए नए अवसर सृजित हो रहे हैं।',
          'छोटे और मध्यम उद्यमों को विशेष लाभ मिल रहा है।'
        ]
      },
      {
        title: '🎯 भविष्य की संभावनाएं',
        content: [
          'भविष्य में और भी नवीनतम तकनीकी विकास देखने को मिल सकते हैं।',
          'वित्तीय समावेशन का लक्ष्य तेजी से प्राप्त हो रहा है।',
          'भारत वैश्विक फिनटेक हब के रूप में उभर रहा है।'
        ]
      }
    ],
    conclusion: [
      'यह विकास भारतीय अर्थव्यवस्था के लिए एक सकारात्मक संकेत है।',
      'भविष्य में इस क्षेत्र में और भी सकारात्मक विकास देखने को मिल सकते हैं।',
      'यह विकास भारतीय वित्तीय क्षेत्र की वैश्विक प्रतिष्ठा में वृद्धि करेगा।'
    ]
  },
  TECHNOLOGY: {
    intro: [
      'भारतीय तकनीकी क्षेत्र में नए आयाम स्थापित हो रहे हैं',
      'डिजिटल इंडिया मिशन के तहत नई पहलें सामने आ रही हैं',
      'भारतीय स्टार्टअप इकोसिस्टम में नए अवसर सृजित हो रहे हैं',
      'तकनीकी नवाचार के माध्यम से देश का विकास तेज हो रहा है'
    ],
    sections: [
      {
        title: '🚀 तकनीकी क्रांति',
        content: [
          'आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग का उपयोग बढ़ रहा है।',
          'इंटरनेट ऑफ थिंग्स (IoT) का प्रचलन तेजी से बढ़ रहा है।',
          'क्लाउड कंप्यूटिंग और डेटा एनालिटिक्स में नए विकास हो रहे हैं।'
        ]
      },
      {
        title: '💡 स्टार्टअप इकोसिस्टम',
        content: [
          'भारतीय स्टार्टअप इकोसिस्टम में नए अवसर सृजित हो रहे हैं।',
          'युवा उद्यमियों के लिए नए रोजगार के अवसर मिल रहे हैं।',
          'तकनीकी नवाचार के माध्यम से समस्याओं का समाधान हो रहा है।'
        ]
      },
      {
        title: '📊 डिजिटल परिवर्तन',
        content: [
          'डिजिटल परिवर्तन के माध्यम से सेवाएं अधिक सुलभ हो रही हैं।',
          'ई-गवर्नेंस और डिजिटल पेमेंट में तेजी से विकास हो रहा है।',
          'स्मार्ट सिटी मिशन के तहत नई तकनीकों का उपयोग हो रहा है।'
        ]
      },
      {
        title: '🎯 भविष्य की दिशा',
        content: [
          'भविष्य में और भी नवीनतम तकनीकी विकास देखने को मिल सकते हैं।',
          'भारत वैश्विक तकनीकी नेतृत्व की ओर बढ़ रहा है।',
          'तकनीकी नवाचार के माध्यम से सामाजिक विकास हो रहा है।'
        ]
      }
    ],
    conclusion: [
      'यह विकास भारतीय तकनीकी क्षेत्र के लिए एक मील का पत्थर साबित होगा।',
      'भविष्य में इस क्षेत्र में और भी सकारात्मक विकास देखने को मिल सकते हैं।',
      'यह विकास भारतीय तकनीकी क्षेत्र की वैश्विक प्रतिष्ठा में वृद्धि करेगा।'
    ]
  },
  BUSINESS: {
    intro: [
      'भारतीय व्यापार क्षेत्र में नए अवसर सृजित हो रहे हैं',
      'डिजिटल युग में व्यापारिक गतिविधियों में नए आयाम जुड़ रहे हैं',
      'भारतीय उद्योग जगत में नए विकास की शुरुआत हो रही है',
      'व्यापारिक नवाचार के माध्यम से आर्थिक विकास तेज हो रहा है'
    ],
    sections: [
      {
        title: '🚀 व्यापारिक विकास',
        content: [
          'ई-कॉमर्स और डिजिटल मार्केटिंग में तेजी से विकास हो रहा है।',
          'छोटे और मध्यम उद्यमों के लिए नए अवसर सृजित हो रहे हैं।',
          'डिजिटल परिवर्तन के माध्यम से व्यापारिक गतिविधियां सरल हो रही हैं।'
        ]
      },
      {
        title: '💡 नवीनतम रुझान',
        content: [
          'सस्टेनेबल बिजनेस मॉडल का प्रचलन बढ़ रहा है।',
          'सोशल मीडिया मार्केटिंग में नए अवसर मिल रहे हैं।',
          'डिजिटल पेमेंट के माध्यम से लेनदेन सरल हो रहे हैं।'
        ]
      },
      {
        title: '📊 बाजार विश्लेषण',
        content: [
          'विशेषज्ञों का मानना है कि यह विकास दीर्घकालिक लाभ प्रदान करेगा।',
          'नए रोजगार के अवसर सृजित हो रहे हैं।',
          'व्यापारिक गतिविधियों में पारदर्शिता बढ़ रही है।'
        ]
      },
      {
        title: '🎯 भविष्य की संभावनाएं',
        content: [
          'भविष्य में और भी नए व्यापारिक अवसर देखने को मिल सकते हैं।',
          'डिजिटल परिवर्तन के माध्यम से व्यापारिक गतिविधियां और सरल होंगी।',
          'भारतीय व्यापार क्षेत्र वैश्विक स्तर पर प्रतिस्पर्धी बन रहा है।'
        ]
      }
    ],
    conclusion: [
      'यह विकास भारतीय व्यापार क्षेत्र के लिए एक सकारात्मक संकेत है।',
      'भविष्य में इस क्षेत्र में और भी सकारात्मक विकास देखने को मिल सकते हैं।',
      'यह विकास भारतीय व्यापार क्षेत्र की वैश्विक प्रतिष्ठा में वृद्धि करेगा।'
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
  const categoryKey = category.toUpperCase();
  return MODERN_TEMPLATES[categoryKey] || MODERN_TEMPLATES.FINANCE;
}

// Generate modern, engaging content with 1200 words
function generateModernContent(topic, city, category, wordCount = CONFIG.WORD_COUNT_TARGET) {
  const template = getRandomTemplate(category);
  
  // Create modern, structured content
  let content = `# ${topic} में ${city} में नया विकास - ${new Date().getFullYear()}

## 🚀 परिचय

${getRandomElement(template.intro)} ${city} में ${topic} के क्षेत्र में एक महत्वपूर्ण विकास देखने को मिला है। यह विकास न केवल स्थानीय स्तर पर बल्कि पूरे देश के लिए एक मील का पत्थर साबित हो रहा है।

${city} के ${topic} क्षेत्र में यह विकास विशेष रूप से महत्वपूर्ण है क्योंकि यह शहर देश के प्रमुख आर्थिक केंद्रों में से एक है। पिछले कुछ वर्षों में ${city} ने ${topic} के क्षेत्र में उल्लेखनीय प्रगति की है।

## 📊 वर्तमान स्थिति

${city} में ${topic} के क्षेत्र में पहले से ही कई सफल उद्यम स्थापित हैं, और यह नया विकास उन्हें और भी मजबूत करेगा। शहर के युवा उद्यमियों के लिए यह विकास विशेष रूप से फायदेमंद साबित होगा।

${city} के ${topic} क्षेत्र में यह विकास न केवल स्थानीय स्तर पर बल्कि राष्ट्रीय स्तर पर भी महत्वपूर्ण है। विशेषज्ञों का मानना है कि ${city} में ${topic} के क्षेत्र में यह विकास एक नई शुरुआत है।`;

  // Add structured sections
  template.sections.forEach(section => {
    content += `\n\n## ${section.title}\n\n`;
    
    section.content.forEach(paragraph => {
      content += `${paragraph} ${city} के ${topic} क्षेत्र में यह विकास नए अवसर सृजित करेगा और देश के आर्थिक विकास में योगदान करेगा। `;
    });
  });

  // Add conclusion
  content += `\n\n## 🎉 निष्कर्ष\n\n`;
  
  template.conclusion.forEach(conclusion => {
    content += `${conclusion} ${city} के ${topic} क्षेत्र में यह विकास भारतीय अर्थव्यवस्था के लिए एक सकारात्मक संकेत है। `;
  });

  // Ensure content meets word count target
  while (content.split(' ').length < wordCount * 0.9) {
    content += `यह विकास ${city} में ${topic} के क्षेत्र में नए अवसर सृजित करेगा और देश के आर्थिक विकास में योगदान करेगा। विशेषज्ञों का मानना है कि यह प्रवृत्ति जारी रहेगी और भविष्य में और भी सकारात्मक विकास देखने को मिल सकते हैं। `;
  }

  return content.trim();
}

// Get next blog number
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

// Create modern blog post
function createModernBlogPost(number, topic, city, category, content) {
  const currentDate = new Date().toISOString().split('T')[0];
  const nextUpdateDate = new Date(Date.now() + CONFIG.UPDATE_INTERVAL_HOURS * 60 * 60 * 1000).toISOString().split('T')[0];
  const wordCount = content.split(' ').length;
  const readTime = Math.ceil(wordCount / 200);
  
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
  tags: ['${city}', '${topic}', 'भारत', 'अर्थव्यवस्था', 'विकास', 'नवाचार', 'तकनीक'],
  readTime: '${readTime} min read',
  featured: true,
  trending: true,
  seo: {
    title: '${topic} में ${city} में नया विकास ${new Date().getFullYear()} | MoneyCal India',
    description: '${city} में ${topic} के क्षेत्र में एक महत्वपूर्ण विकास देखने को मिला है। यह विकास भारतीय अर्थव्यवस्था के लिए एक सकारात्मक संकेत है।',
    keywords: '${city}, ${topic}, भारत, अर्थव्यवस्था, विकास, निवेश, रोजगार, नवाचार, तकनीक',
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
  console.log(`✅ Created modern blog post ${number}: ${topic} in ${city} (${wordCount} words)`);
}

// Main generation function
async function generateModernNewsBlogs() {
  try {
    console.log('🚀 Starting enhanced news blog generation...');
    console.log(`📝 Target: ${CONFIG.POSTS_PER_CYCLE} posts with ${CONFIG.WORD_COUNT_TARGET} words each`);
    
    // Generate blog posts
    const startNumber = getNextBlogNumber();
    const endNumber = startNumber + CONFIG.POSTS_PER_CYCLE - 1;
    
    console.log(`📝 Generating ${CONFIG.POSTS_PER_CYCLE} modern blog posts from ${startNumber} to ${endNumber}...`);
    
    for (let i = 0; i < CONFIG.POSTS_PER_CYCLE; i++) {
      const blogNumber = startNumber + i;
      const topic = getRandomTopic();
      const city = getRandomCity();
      const category = getRandomElement(['finance', 'technology', 'business']);
      
      const content = generateModernContent(topic, city, category, CONFIG.WORD_COUNT_TARGET);
      createModernBlogPost(blogNumber, topic, city, category, content);
      
      // Small delay between posts
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`✅ Successfully generated ${CONFIG.POSTS_PER_CYCLE} modern blog posts`);
    
    // Commit and push changes
    await commitAndPushChanges();
    
  } catch (error) {
    console.error('❌ Error generating modern blogs:', error);
    throw error;
  }
}

// Git operations
async function commitAndPushChanges() {
  try {
    console.log('📝 Committing changes to Git...');
    
    // First pull any remote changes
    console.log('📥 Pulling latest changes before committing...');
    execSync('git pull origin main', { stdio: 'inherit' });
    
    // Add all changes
    execSync('git add .', { stdio: 'inherit' });
    
    // Commit with descriptive message
    const commitMessage = `Enhanced: Generate ${CONFIG.POSTS_PER_CYCLE} modern ${CONFIG.WORD_COUNT_TARGET}-word news blogs - ${new Date().toISOString()}`;
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    // Push to GitHub
    console.log('🚀 Pushing changes to GitHub...');
    execSync('git push origin main', { stdio: 'inherit' });
    
    console.log('✅ Successfully pushed to GitHub!');
    
  } catch (error) {
    console.error('❌ Error in Git operations:', error);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    await generateModernNewsBlogs();
    console.log('🎉 Enhanced news generation completed successfully!');
  } catch (error) {
    console.error('❌ Enhanced news generation failed:', error);
    process.exit(1);
  }
}

// Export for use in automation
module.exports = {
  generateModernNewsBlogs,
  generateModernContent,
  createModernBlogPost,
  CONFIG
};

// Run if called directly
if (require.main === module) {
  main();
}
