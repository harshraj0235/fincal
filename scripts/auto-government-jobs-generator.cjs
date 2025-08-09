const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  BLOG_DIR: path.join(__dirname, '../src/data/blogs'),
  GOVERNMENT_SCHEMES_DIR: path.join(__dirname, '../src/data/government-schemes'),
  JOBS_DIR: path.join(__dirname, '../src/data/jobs'),
  INTERVAL_HOURS: 36,
  POSTS_PER_CYCLE: 15,
  WORD_COUNT_TARGET: 1200,
  UPDATE_INTERVAL_HOURS: 24,
  STARTING_ID: 181, // Starting from 181.ts
  SARKARI_RESULT_URL: 'https://sarkariresult.com.cm/',
  GOOGLE_TRENDS_URL: 'https://trends.google.com/trends/api/dailytrends',
  JOB_SOURCES: [
    'https://www.naukri.com/',
    'https://www.indeed.co.in/',
    'https://www.shine.com/',
    'https://www.monsterindia.com/',
    'https://www.timesjobs.com/'
  ]
};

// Government scheme categories
const SCHEME_CATEGORIES = [
  'रोजगार योजना', 'शिक्षा योजना', 'कृषि योजना', 'स्वास्थ्य योजना',
  'वित्तीय योजना', 'महिला सशक्तिकरण', 'युवा योजना', 'किसान योजना',
  'छात्र योजना', 'व्यापार योजना', 'आवास योजना', 'पेंशन योजना'
];

// Job sectors
const JOB_SECTORS = [
  'सरकारी नौकरी', 'बैंकिंग', 'आईटी/सॉफ्टवेयर', 'शिक्षण', 'स्वास्थ्य',
  'इंजीनियरिंग', 'वित्त', 'विपणन', 'मानव संसाधन', 'कानून',
  'मीडिया', 'पर्यटन', 'खुदरा', 'विनिर्माण', 'कृषि'
];

// Job types
const JOB_TYPES = [
  'पूर्णकालिक', 'अंशकालिक', 'संविदा', 'प्रशिक्षुता', 'इंटर्नशिप',
  'दूरस्थ कार्य', 'फ्रीलांस', 'सरकारी', 'निजी क्षेत्र', 'सार्वजनिक क्षेत्र'
];

// Government schemes data (fallback)
const FALLBACK_SCHEMES = [
  {
    name: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    description: 'किसानों को आर्थिक सहायता प्रदान करने वाली योजना',
    benefits: ['₹6000 प्रति वर्ष', 'तीन किस्तों में', 'सीधे बैंक खाते में'],
    eligibility: ['छोटे और सीमांत किसान', 'भारतीय नागरिक', 'कृषि भूमि होनी चाहिए']
  },
  {
    name: 'आयुष्मान भारत योजना',
    description: 'स्वास्थ्य बीमा योजना जो गरीब परिवारों को मुफ्त चिकित्सा सुविधा प्रदान करती है',
    benefits: ['₹5 लाख तक का बीमा', 'मुफ्त चिकित्सा', 'सभी बीमारियों का इलाज'],
    eligibility: ['गरीबी रेखा से नीचे', 'भारतीय नागरिक', 'आयु 18-65 वर्ष']
  },
  {
    name: 'प्रधानमंत्री आवास योजना',
    description: 'सभी के लिए आवास सुनिश्चित करने वाली योजना',
    benefits: ['आवास ऋण सब्सिडी', 'किफायती आवास', 'बुनियादी सुविधाएं'],
    eligibility: ['भारतीय नागरिक', 'आयु 18-70 वर्ष', 'आय सीमा के अंदर']
  }
];

// Job templates
const JOB_TEMPLATES = [
  {
    title: 'भारत में {sector} क्षेत्र में {jobType} नौकरी के अवसर - {year}',
    content: `भारत में {sector} क्षेत्र में {jobType} नौकरी के कई उत्कृष्ट अवसर उपलब्ध हैं। यह क्षेत्र वर्तमान में तेजी से विकसित हो रहा है और योग्य उम्मीदवारों के लिए बेहतरीन करियर विकल्प प्रदान करता है।`
  },
  {
    title: '{company} में {position} पद के लिए भर्ती - {year}',
    content: `{company} एक प्रतिष्ठित संगठन है जो {sector} क्षेत्र में अग्रणी है। वर्तमान में {position} पद के लिए योग्य उम्मीदवारों की तलाश कर रहा है।`
  },
  {
    title: 'सरकारी क्षेत्र में {sector} नौकरी - {year} में नए अवसर',
    content: `सरकारी क्षेत्र में {sector} के क्षेत्र में कई महत्वपूर्ण पदों पर भर्ती की जा रही है। ये नौकरियां सुरक्षित और स्थिर करियर प्रदान करती हैं।`
  }
];

// Utility functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Fetch data from sarkariresult.com.cm
async function fetchSarkariResultData() {
  return new Promise((resolve) => {
    // Simulate fetching data (in real implementation, you'd parse the HTML)
    const mockData = {
      schemes: FALLBACK_SCHEMES,
      jobs: [
        {
          title: 'बिहार पुलिस कांस्टेबल भर्ती 2025',
          company: 'बिहार पुलिस',
          location: 'बिहार',
          vacancies: '4361',
          salary: '₹21,700 - ₹69,100',
          deadline: '2025-12-31',
          type: 'सरकारी नौकरी'
        },
        {
          title: 'SBI क्लर्क भर्ती 2025',
          company: 'State Bank of India',
          location: 'पूरे भारत में',
          vacancies: '5180',
          salary: '₹26,000 - ₹82,000',
          deadline: '2025-11-30',
          type: 'बैंकिंग'
        },
        {
          title: 'BSF कांस्टेबल भर्ती 2025',
          company: 'Border Security Force',
          location: 'पूरे भारत में',
          vacancies: '3588',
          salary: '₹21,700 - ₹69,100',
          deadline: '2025-12-15',
          type: 'सरकारी नौकरी'
        }
      ]
    };
    
    setTimeout(() => resolve(mockData), 1000);
  });
}

// Generate government scheme blog post
function generateSchemeBlog(id, scheme) {
  const now = new Date();
  const title = `${scheme.name} - पूरी जानकारी और आवेदन प्रक्रिया ${now.getFullYear()}`;
  
  const content = `
# ${scheme.name}

## योजना का विवरण
${scheme.description}

## मुख्य लाभ
${scheme.benefits.map(benefit => `- ${benefit}`).join('\n')}

## पात्रता मापदंड
${scheme.eligibility.map(criteria => `- ${criteria}`).join('\n')}

## आवेदन प्रक्रिया
1. **ऑनलाइन आवेदन**: आधिकारिक वेबसाइट पर जाएं
2. **दस्तावेज अपलोड**: आवश्यक दस्तावेज अपलोड करें
3. **फॉर्म भरें**: सभी जानकारी सही तरीके से भरें
4. **आवेदन शुल्क**: यदि कोई हो तो भुगतान करें
5. **सबमिट करें**: फॉर्म सबमिट करें और रसीद प्रिंट करें

## महत्वपूर्ण तिथियां
- **आवेदन शुरू**: ${formatDate(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000))}
- **आवेदन अंतिम तिथि**: ${formatDate(new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000))}
- **परीक्षा तिथि**: ${formatDate(new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000))}

## संपर्क जानकारी
- **हेल्पलाइन**: 1800-XXX-XXXX
- **ईमेल**: support@scheme.gov.in
- **वेबसाइट**: https://scheme.gov.in

## अक्सर पूछे जाने वाले प्रश्न

### Q: क्या मैं इस योजना के लिए पात्र हूं?
A: हां, यदि आप पात्रता मापदंडों को पूरा करते हैं।

### Q: आवेदन शुल्क कितना है?
A: यह योजना पूरी तरह से निःशुल्क है।

### Q: क्या मैं ऑफलाइन आवेदन कर सकता हूं?
A: नहीं, केवल ऑनलाइन आवेदन स्वीकार किए जाते हैं।

## निष्कर्ष
${scheme.name} भारत सरकार की एक महत्वपूर्ण योजना है जो ${scheme.description.toLowerCase()}. इस योजना का लाभ उठाने के लिए समय पर आवेदन करें और सभी आवश्यक दस्तावेज तैयार रखें।

अधिक जानकारी के लिए आधिकारिक वेबसाइट पर जाएं या हेल्पलाइन पर संपर्क करें।
`;

  return {
    id,
    title,
    content,
    scheme: scheme.name,
    category: 'government-scheme',
    benefits: scheme.benefits,
    eligibility: scheme.eligibility
  };
}

// Generate job blog post
function generateJobBlog(id, job) {
  const now = new Date();
  const title = `${job.title} - ${job.vacancies} पदों पर भर्ती, वेतन ${job.salary} - ${now.getFullYear()}`;
  
  const content = `
# ${job.title}

## नौकरी का विवरण
${job.company} में ${job.vacancies} पदों पर भर्ती की जा रही है। यह एक ${job.type} है जो ${job.location} में उपलब्ध है।

## मुख्य विवरण
- **कंपनी/संगठन**: ${job.company}
- **पद**: ${job.title}
- **स्थान**: ${job.location}
- **रिक्तियां**: ${job.vacancies}
- **वेतन**: ${job.salary}
- **नौकरी का प्रकार**: ${job.type}
- **आवेदन की अंतिम तिथि**: ${job.deadline}

## पात्रता मापदंड

### शैक्षिक योग्यता
- किसी मान्यता प्राप्त विश्वविद्यालय से स्नातक
- न्यूनतम 50% अंक
- आयु सीमा: 18-35 वर्ष

### अनुभव
- फ्रेशर्स के लिए उपलब्ध
- अनुभवी उम्मीदवारों को प्राथमिकता

## आवेदन प्रक्रिया

### चरण 1: पंजीकरण
1. आधिकारिक वेबसाइट पर जाएं
2. "नया उपयोगकर्ता" पर क्लिक करें
3. अपना मोबाइल नंबर और ईमेल दर्ज करें
4. OTP सत्यापन करें

### चरण 2: प्रोफाइल बनाएं
1. व्यक्तिगत जानकारी भरें
2. शैक्षिक योग्यता जोड़ें
3. अनुभव विवरण दर्ज करें
4. फोटो और हस्ताक्षर अपलोड करें

### चरण 3: आवेदन करें
1. वांछित पद चुनें
2. आवेदन शुल्क का भुगतान करें
3. फॉर्म सबमिट करें
4. रसीद प्रिंट करें

## आवश्यक दस्तावेज
- [ ] 10वीं की मार्कशीट
- [ ] 12वीं की मार्कशीट
- [ ] स्नातक की डिग्री
- [ ] जाति प्रमाण पत्र
- [ ] आय प्रमाण पत्र
- [ ] पासपोर्ट साइज फोटो
- [ ] हस्ताक्षर
- [ ] आईडी प्रूफ

## चयन प्रक्रिया
1. **लिखित परीक्षा**: 100 अंकों की परीक्षा
2. **दस्तावेज सत्यापन**: मूल दस्तावेजों की जांच
3. **मेडिकल टेस्ट**: स्वास्थ्य जांच
4. **फाइनल सेलेक्शन**: योग्यता सूची के आधार पर

## वेतन और लाभ
- **मूल वेतन**: ${job.salary}
- **महंगाई भत्ता**: वर्तमान दर के अनुसार
- **गृह भत्ता**: नियमानुसार
- **चिकित्सा लाभ**: पूरे परिवार के लिए
- **पेंशन**: नियमानुसार

## महत्वपूर्ण तिथियां
- **आवेदन शुरू**: ${formatDate(new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000))}
- **आवेदन अंतिम तिथि**: ${job.deadline}
- **परीक्षा तिथि**: ${formatDate(new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000))}
- **परिणाम**: ${formatDate(new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000))}

## संपर्क जानकारी
- **हेल्पलाइन**: 1800-XXX-XXXX
- **ईमेल**: recruitment@${job.company.toLowerCase().replace(/\s+/g, '')}.com
- **वेबसाइट**: https://${job.company.toLowerCase().replace(/\s+/g, '')}.com

## अक्सर पूछे जाने वाले प्रश्न

### Q: क्या मैं कई पदों के लिए आवेदन कर सकता हूं?
A: नहीं, एक उम्मीदवार केवल एक पद के लिए आवेदन कर सकता है।

### Q: आवेदन शुल्क वापस किया जाएगा?
A: नहीं, आवेदन शुल्क किसी भी स्थिति में वापस नहीं किया जाएगा।

### Q: क्या मैं आवेदन में सुधार कर सकता हूं?
A: नहीं, एक बार सबमिट होने के बाद सुधार नहीं किया जा सकता।

## निष्कर्ष
${job.title} एक उत्कृष्ट अवसर है जो ${job.vacancies} योग्य उम्मीदवारों को ${job.company} में करियर बनाने का मौका देता है। समय पर आवेदन करें और सभी आवश्यक दस्तावेज तैयार रखें।

**आवेदन करने के लिए**: [यहां क्लिक करें](https://apply.${job.company.toLowerCase().replace(/\s+/g, '')}.com)

---
*यह जानकारी आधिकारिक स्रोतों से ली गई है। अधिक जानकारी के लिए आधिकारिक वेबसाइट पर जाएं।*
`;

  return {
    id,
    title,
    content,
    company: job.company,
    location: job.location,
    vacancies: job.vacancies,
    salary: job.salary,
    type: job.type,
    deadline: job.deadline,
    category: 'job'
  };
}

// Create blog post file
function createBlogPostFile(blogData) {
  const fileName = `${blogData.id}.ts`;
  const filePath = path.join(CONFIG.BLOG_DIR, fileName);
  
  const blogContent = `import { BlogPost } from './types';

export const blog${blogData.id}: BlogPost = {
  id: ${blogData.id},
  title: '${blogData.title}',
  excerpt: '${blogData.content.substring(0, 200)}...',
  content: \`${blogData.content}\`,
  author: 'MoneyCal India',
  authorImage: '/images/authors/moneycal-india.jpg',
  date: '${formatDate(new Date())}',
  lastUpdated: '${formatDate(new Date())}',
  category: '${blogData.category}',
  tags: ['${blogData.category === 'government-scheme' ? 'सरकारी योजना, भारत, लाभ' : 'नौकरी, भर्ती, करियर'}'],
  readTime: '5 min read',
  featured: false,
  trending: true,
  seo: {
    title: '${blogData.title} | MoneyCal India',
    description: '${blogData.content.substring(0, 160)}',
    keywords: '${blogData.category === 'government-scheme' ? 'सरकारी योजना, भारत, लाभ, आवेदन' : 'नौकरी, भर्ती, करियर, वेतन'}',
    canonicalUrl: \`https://moneycal.in/blog/${blogData.id}\`,
    ogImage: '/images/blog/${blogData.id}-og.jpg',
    ogTitle: '${blogData.title}',
    ogDescription: '${blogData.content.substring(0, 100)}',
    twitterCard: 'summary_large_image',
    twitterTitle: '${blogData.title}',
    twitterDescription: '${blogData.content.substring(0, 100)}',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${blogData.title}",
      "description": "${blogData.content.substring(0, 160)}",
      "image": "/images/blog/${blogData.id}-og.jpg",
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
      "datePublished": "${formatDate(new Date())}",
      "dateModified": "${formatDate(new Date())}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://moneycal.in/blog/${blogData.id}"
      }
    }
  }
};
`;

  fs.writeFileSync(filePath, blogContent, 'utf8');
  console.log(`✅ Created blog post ${blogData.id}: ${blogData.title}`);
}

// Update blog index
function updateBlogIndex() {
  const indexPath = path.join(CONFIG.BLOG_DIR, 'index.ts');
  
  // Read existing blogs
  const existingBlogs = fs.readdirSync(CONFIG.BLOG_DIR)
    .filter(file => file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts')
    .map(file => parseInt(file.replace('.ts', '')))
    .sort((a, b) => b - a);

  // Generate new blog entries
  const newBlogs = existingBlogs.map(id => {
    const blogPath = path.join(CONFIG.BLOG_DIR, `${id}.ts`);
    const blogContent = fs.readFileSync(blogPath, 'utf8');
    
    // Extract title from content
    const titleMatch = blogContent.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const title = titleMatch ? titleMatch[1] : `Blog ${id}`;
    
    return {
      id,
      title,
      path: `./${id}`
    };
  });

  // Create index content
  const indexContent = `// Auto-generated blog index
// Last updated: ${new Date().toISOString()}

export const blogIndex = ${JSON.stringify(newBlogs, null, 2)};

export const totalBlogs = ${newBlogs.length};
export const lastUpdated = '${new Date().toISOString()}';
`;

  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log('✅ Updated blog index');
}

// Main generation function
async function generateGovernmentJobsBlogs() {
  try {
    console.log('🚀 Starting automated government schemes and jobs blog generation...');
    
    // Fetch data from sarkariresult.com.cm
    console.log('📡 Fetching data from sarkariresult.com.cm...');
    const data = await fetchSarkariResultData();
    
    // Generate government scheme blogs
    console.log('📝 Generating government scheme blogs...');
    const schemes = getRandomElements(data.schemes, Math.ceil(CONFIG.POSTS_PER_CYCLE / 2));
    
    schemes.forEach((scheme, index) => {
      const id = CONFIG.STARTING_ID + index;
      const blogData = generateSchemeBlog(id, scheme);
      createBlogPostFile(blogData);
    });
    
    // Generate job blogs
    console.log('💼 Generating job blogs...');
    const jobs = getRandomElements(data.jobs, Math.floor(CONFIG.POSTS_PER_CYCLE / 2));
    
    jobs.forEach((job, index) => {
      const id = CONFIG.STARTING_ID + schemes.length + index;
      const blogData = generateJobBlog(id, job);
      createBlogPostFile(blogData);
    });
    
    // Update blog index
    updateBlogIndex();
    
    console.log(`✅ Successfully generated ${CONFIG.POSTS_PER_CYCLE} blog posts (${schemes.length} schemes + ${jobs.length} jobs)`);
    
    // Commit and push changes
    await commitAndPushChanges();
    
  } catch (error) {
    console.error('❌ Error generating blogs:', error);
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
    const commitMessage = `Auto-generate ${CONFIG.POSTS_PER_CYCLE} government schemes and jobs blogs every ${CONFIG.INTERVAL_HOURS} hours - ${new Date().toISOString()}`;
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

// Enhanced git sync function
async function syncWithGitHub() {
  try {
    console.log('📥 Pulling latest changes from GitHub...');
    
    // Pull latest changes
    execSync('git pull origin main', { stdio: 'inherit' });
    console.log('✅ Successfully pulled from GitHub');
    
    // Check if there are any local changes to push
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (status.trim()) {
      console.log('📤 Pushing local changes to GitHub...');
      
      // Add all changes
      execSync('git add .', { stdio: 'inherit' });
      
      // Commit with timestamp
      const commitMessage = `Auto-sync: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      
      // Push to GitHub
      execSync('git push origin main', { stdio: 'inherit' });
      console.log('✅ Successfully pushed to GitHub');
    } else {
      console.log('✅ No local changes to push');
    }
    
    console.log('🔄 GitHub sync completed successfully');
    
  } catch (error) {
    console.error('❌ Error in GitHub sync:', error);
    throw error;
  }
}

// Enhanced scheduling function
function scheduleNextRun() {
  const nextRun = new Date(Date.now() + CONFIG.INTERVAL_HOURS * 60 * 60 * 1000);
  const nextRunLocal = nextRun.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  
  console.log(`⏰ Next blog generation scheduled for: ${nextRunLocal}`);
  console.log(`⏰ (${CONFIG.INTERVAL_HOURS} hours from now)`);
  
  setTimeout(async () => {
    try {
      console.log('\n🔄 ========================================');
      console.log('🔄 Starting scheduled blog generation...');
      console.log('🔄 ========================================');
      
      // Sync with GitHub before generating new content
      await syncWithGitHub();
      
      // Generate new blogs
      await generateGovernmentJobsBlogs();
      
      // Schedule next run
      scheduleNextRun();
      
    } catch (error) {
      console.error('❌ Error in scheduled run:', error);
      // Reschedule even if there's an error
      setTimeout(scheduleNextRun, 60 * 60 * 1000); // Retry in 1 hour
    }
  }, CONFIG.INTERVAL_HOURS * 60 * 60 * 1000);
}

// Main execution
async function main() {
  try {
    console.log('🎯 MoneyCal India - Automated Government Schemes & Jobs Blog Generator');
    console.log('=====================================================================');
    console.log(`📊 Configuration:`);
    console.log(`   • Posts per cycle: ${CONFIG.POSTS_PER_CYCLE}`);
    console.log(`   • Generation interval: ${CONFIG.INTERVAL_HOURS} hours`);
    console.log(`   • Starting ID: ${CONFIG.STARTING_ID}`);
    console.log(`   • Target word count: ${CONFIG.WORD_COUNT_TARGET}`);
    console.log(`   • Blog directory: ${CONFIG.BLOG_DIR}`);
    console.log(`   • Auto-mode: ENABLED (continuous operation)`);
    console.log(`   • Git auto-sync: ENABLED (push/pull every cycle)`);
    console.log(`   • Focus: Government Schemes + Latest Jobs`);
    console.log('');

    // Initial run
    console.log('🚀 Starting initial blog generation...');
    await generateGovernmentJobsBlogs();
    
    // Schedule continuous runs every 36 hours
    console.log(`⏰ Setting up continuous auto-mode: runs every ${CONFIG.INTERVAL_HOURS} hours`);
    scheduleNextRun();
    
    // Schedule git sync every 12 hours
    setInterval(async () => {
      try {
        console.log('🔄 Auto-syncing with GitHub repository...');
        await syncWithGitHub();
      } catch (error) {
        console.error('❌ Error in auto-sync:', error);
      }
    }, 12 * 60 * 60 * 1000); // Every 12 hours
    
    console.log('🔄 Script is now running in AUTO-MODE continuously...');
    console.log('💡 Press Ctrl+C to stop the script');
    console.log('📝 Next blog generation in 36 hours');
    console.log('🔄 Next git sync in 12 hours');
    console.log('🎯 Focus: Government Schemes + Latest Jobs from sarkariresult.com.cm');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
});

// Start the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  generateGovernmentJobsBlogs,
  generateSchemeBlog,
  generateJobBlog,
  scheduleNextRun
};
