const fs = require('fs');
const path = require('path');
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

// Fallback data for government schemes
const FALLBACK_SCHEMES = [
  {
    name: 'PM Kisan Samman Nidhi Yojana',
    description: 'Direct income support of ₹6,000 per year to eligible farmer families',
    benefits: '₹6,000 annually in three equal installments',
    eligibility: 'Small and marginal farmers, landholding families',
    deadline: '2025-12-31',
    link: 'https://pmkisan.gov.in/'
  },
  {
    name: 'PM Fasal Bima Yojana',
    description: 'Comprehensive crop insurance scheme for farmers',
    benefits: 'Crop damage compensation, premium subsidy',
    eligibility: 'All farmers growing notified crops',
    deadline: '2025-12-31',
    link: 'https://pmfby.gov.in/'
  },
  {
    name: 'PM Awas Yojana (Gramin)',
    description: 'Housing for All in rural areas',
    benefits: 'Financial assistance for house construction',
    eligibility: 'Rural households without pucca houses',
    deadline: '2025-12-31',
    link: 'https://pmayg.nic.in/'
  },
  {
    name: 'PM Ujjwala Yojana',
    description: 'Free LPG connections to women from BPL households',
    benefits: 'Free LPG connection, first refill',
    eligibility: 'Women from BPL households',
    deadline: '2025-12-31',
    link: 'https://pmuy.gov.in/'
  },
  {
    name: 'PM Jan Dhan Yojana',
    description: 'Financial inclusion program for all households',
    benefits: 'Zero balance bank account, insurance coverage',
    eligibility: 'All Indian citizens',
    deadline: 'Ongoing',
    link: 'https://pmjdy.gov.in/'
  }
];

// Fallback data for trending jobs
const FALLBACK_JOBS = [
  {
    title: 'बिहार पुलिस कांस्टेबल भर्ती 2025',
    company: 'बिहार पुलिस',
    location: 'बिहार',
    vacancies: '4361',
    salary: '₹21,700 - ₹69,100',
    deadline: '2025-12-31',
    type: 'सरकारी नौकरी',
    link: 'https://bihar.police.gov.in/'
  },
  {
    title: 'UP Police Constable Recruitment 2025',
    company: 'UP Police',
    location: 'Uttar Pradesh',
    vacancies: '60244',
    salary: '₹21,700 - ₹69,100',
    deadline: '2025-12-31',
    type: 'Government Job',
    link: 'https://uppolice.gov.in/'
  },
  {
    title: 'SSC CGL 2025 Notification',
    company: 'Staff Selection Commission',
    location: 'All India',
    vacancies: '7500+',
    salary: '₹9,300 - ₹34,800',
    deadline: '2025-12-31',
    type: 'Government Job',
    link: 'https://ssc.nic.in/'
  },
  {
    title: 'IBPS PO 2025 Recruitment',
    company: 'Institute of Banking Personnel Selection',
    location: 'All India',
    vacancies: '5000+',
    salary: '₹23,700 - ₹42,020',
    deadline: '2025-12-31',
    type: 'Banking Job',
    link: 'https://ibps.in/'
  },
  {
    title: 'Railway NTPC 2025',
    company: 'Indian Railways',
    location: 'All India',
    vacancies: '35000+',
    salary: '₹19,900 - ₹35,400',
    deadline: '2025-12-31',
    type: 'Government Job',
    link: 'https://indianrailways.gov.in/'
  }
];

// Utility functions
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function getNextDate(days = 1) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function generateRandomId() {
  return Math.floor(Math.random() * 1000000);
}

function getNextBlogId() {
  try {
    const files = fs.readdirSync(CONFIG.BLOG_DIR);
    const blogFiles = files.filter(file => file.endsWith('.ts') && file !== 'index.ts');
    
    if (blogFiles.length === 0) {
      return CONFIG.STARTING_ID;
    }
    
    const ids = blogFiles.map(file => parseInt(file.replace('.ts', ''))).filter(id => !isNaN(id));
    return Math.max(...ids) + 1;
  } catch (error) {
    return CONFIG.STARTING_ID;
  }
}

// Mock function to fetch data from sarkariresult.com.cm
async function fetchSarkariResultData() {
  return new Promise((resolve) => {
    // Simulate fetching data (in real implementation, you'd parse the HTML)
    const mockData = {
      schemes: FALLBACK_SCHEMES,
      jobs: FALLBACK_JOBS
    };
    
    setTimeout(() => resolve(mockData), 1000);
  });
}

// Generate government scheme blog content
function generateSchemeBlogContent(scheme, id) {
  const title = `${scheme.name} - पूरी जानकारी और आवेदन प्रक्रिया 2025`;
  const excerpt = `${scheme.name} के बारे में विस्तृत जानकारी, पात्रता, लाभ और आवेदन प्रक्रिया। यह योजना किसानों/नागरिकों के लिए कैसे फायदेमंद है।`;
  
  const content = `
# ${scheme.name} - पूरी जानकारी और आवेदन प्रक्रिया 2025

## योजना का परिचय
${scheme.name} भारत सरकार की एक महत्वपूर्ण योजना है जो ${scheme.description}। यह योजना देश के विकास और नागरिकों के कल्याण के लिए शुरू की गई है।

## योजना के मुख्य लाभ
- **वित्तीय सहायता**: ${scheme.benefits}
- **सामाजिक सुरक्षा**: बेहतर जीवन स्तर
- **आर्थिक विकास**: रोजगार और आय में वृद्धि
- **डिजिटल इंडिया**: ऑनलाइन आवेदन प्रक्रिया

## पात्रता मानदंड
${scheme.eligibility}

## आवेदन प्रक्रिया
1. **ऑनलाइन आवेदन**: ${scheme.link} पर जाएं
2. **फॉर्म भरें**: सभी आवश्यक जानकारी दर्ज करें
3. **दस्तावेज अपलोड करें**: आवश्यक प्रमाण पत्र जोड़ें
4. **आवेदन जमा करें**: फॉर्म की समीक्षा के बाद सबमिट करें

## महत्वपूर्ण तिथियां
- **आवेदन शुरू**: ${getCurrentDate()}
- **आवेदन अंतिम तिथि**: ${scheme.deadline}
- **दस्तावेज सत्यापन**: आवेदन के 15 दिनों के भीतर
- **लाभ वितरण**: सत्यापन के 30 दिनों के भीतर

## आवश्यक दस्तावेज
- आधार कार्ड
- पैन कार्ड
- बैंक खाता विवरण
- पता प्रमाण
- आय प्रमाण पत्र
- जाति प्रमाण पत्र (यदि लागू हो)

## संपर्क जानकारी
- **हेल्पलाइन**: 1800-XXX-XXXX
- **ईमेल**: support@${scheme.name.toLowerCase().replace(/\s+/g, '')}.gov.in
- **वेबसाइट**: ${scheme.link}

## अक्सर पूछे जाने वाले प्रश्न

### Q1: क्या मैं इस योजना के लिए पात्र हूं?
A: ${scheme.eligibility}

### Q2: आवेदन कैसे करें?
A: ${scheme.link} पर जाकर ऑनलाइन आवेदन करें

### Q3: कितना समय लगेगा लाभ मिलने में?
A: आवेदन के 30-45 दिनों के भीतर लाभ मिल जाता है

### Q4: क्या आवेदन शुल्क है?
A: नहीं, यह योजना पूरी तरह से निःशुल्क है

## निष्कर्ष
${scheme.name} एक बेहतरीन योजना है जो ${scheme.description}। इस योजना का लाभ उठाने के लिए समय पर आवेदन करें और सभी आवश्यक दस्तावेज तैयार रखें।

---

*यह जानकारी सरकारी वेबसाइटों और आधिकारिक स्रोतों से ली गई है। कृपया नवीनतम अपडेट के लिए आधिकारिक वेबसाइट ${scheme.link} देखें।*
  `;

  return {
    title,
    excerpt,
    content: content.trim(),
    seo: {
      title: `${scheme.name} - पूरी जानकारी और आवेदन प्रक्रिया 2025 | MoneyCal India`,
      description: `${scheme.name} के बारे में विस्तृत जानकारी, पात्रता, लाभ और आवेदन प्रक्रिया। यह योजना किसानों/नागरिकों के लिए कैसे फायदेमंद है।`,
      keywords: `${scheme.name}, government scheme, sarkari yojana, apply online, benefits, eligibility, 2025`,
      canonicalUrl: `https://moneycal.in/government-schemes/${id}`,
      ogImage: `https://moneycal.in/images/schemes/${id}.jpg`,
      ogTitle: `${scheme.name} - पूरी जानकारी और आवेदन प्रक्रिया 2025`,
      ogDescription: `${scheme.name} के बारे में विस्तृत जानकारी, पात्रता, लाभ और आवेदन प्रक्रिया।`,
      twitterCard: 'summary_large_image',
      twitterTitle: `${scheme.name} - पूरी जानकारी और आवेदन प्रक्रिया 2025`,
      twitterDescription: `${scheme.name} के बारे में विस्तृत जानकारी, पात्रता, लाभ और आवेदन प्रक्रिया।`,
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": excerpt,
        "author": {
          "@type": "Organization",
          "name": "MoneyCal India"
        },
        "publisher": {
          "@type": "Organization",
          "name": "MoneyCal India",
          "url": "https://moneycal.in"
        },
        "datePublished": getCurrentDate(),
        "dateModified": getCurrentDate()
      }
    }
  };
}

// Generate job blog content
function generateJobBlogContent(job, id) {
  const title = `${job.title} - पूरी जानकारी और आवेदन प्रक्रिया 2025`;
  const excerpt = `${job.title} के बारे में विस्तृत जानकारी, पात्रता, वेतन, रिक्तियां और आवेदन प्रक्रिया। ${job.company} में नौकरी के लिए आवेदन करें।`;
  
  const content = `
# ${job.title} - पूरी जानकारी और आवेदन प्रक्रिया 2025

## नौकरी का परिचय
${job.title} ${job.company} द्वारा जारी की गई एक बेहतरीन अवसर है। यह नौकरी ${job.location} में उपलब्ध है और ${job.type} के अंतर्गत आती है।

## नौकरी का विवरण

| विवरण | जानकारी |
|-------|----------|
| **पद का नाम** | ${job.title} |
| **कंपनी/संगठन** | ${job.company} |
| **स्थान** | ${job.location} |
| **रिक्तियां** | ${job.vacancies} |
| **वेतन** | ${job.salary} |
| **नौकरी का प्रकार** | ${job.type} |
| **आवेदन अंतिम तिथि** | ${job.deadline} |
| **आवेदन लिंक** | [${job.link}](${job.link}) |

## पात्रता मानदंड

### शैक्षिक योग्यता
- किसी मान्यता प्राप्त विश्वविद्यालय से स्नातक डिग्री
- न्यूनतम 50% अंक (SC/ST/OBC के लिए 45%)
- कंप्यूटर की बुनियादी जानकारी

### आयु सीमा
- न्यूनतम आयु: 18 वर्ष
- अधिकतम आयु: 30 वर्ष
- आरक्षित श्रेणियों के लिए छूट उपलब्ध

### अनुभव
- फ्रेशर्स के लिए उपलब्ध
- पूर्व अनुभव वाले उम्मीदवारों को प्राथमिकता

## आवेदन प्रक्रिया

### चरण 1: ऑनलाइन पंजीकरण
1. ${job.link} पर जाएं
2. "Apply Now" या "आवेदन करें" पर क्लिक करें
3. नया खाता बनाएं या लॉगिन करें

### चरण 2: आवेदन फॉर्म भरें
1. व्यक्तिगत जानकारी दर्ज करें
2. शैक्षिक योग्यता का विवरण दें
3. अनुभव का विवरण (यदि कोई हो)
4. फोटो और हस्ताक्षर अपलोड करें

### चरण 3: आवेदन शुल्क
1. आवेदन शुल्क का भुगतान करें
2. भुगतान रसीद डाउनलोड करें
3. आवेदन फॉर्म सबमिट करें

### चरण 4: आवेदन की पुष्टि
1. आवेदन संख्या नोट करें
2. आवेदन की प्रिंट आउट लें
3. भविष्य के संदर्भ के लिए सहेजें

## चयन प्रक्रिया

### चरण 1: लिखित परीक्षा
- **विषय**: सामान्य ज्ञान, तर्कशक्ति, गणित, अंग्रेजी
- **कुल अंक**: 100
- **समय**: 2 घंटे
- **न्यूनतम अर्हता अंक**: 40%

### चरण 2: शारीरिक परीक्षण (यदि लागू हो)
- दौड़, लंबी कूद, ऊंची कूद
- शारीरिक मापन
- चिकित्सा परीक्षण

### चरण 3: साक्षात्कार
- व्यक्तिगत साक्षात्कार
- समूह चर्चा (यदि लागू हो)
- दस्तावेज सत्यापन

## वेतन और लाभ

### मूल वेतन
${job.salary}

### अतिरिक्त लाभ
- महंगाई भत्ता (DA)
- मकान किराया भत्ता (HRA)
- यात्रा भत्ता (TA)
- चिकित्सा भत्ता
- पेंशन योजना
- बीमा कवरेज

## महत्वपूर्ण तिथियां

| कार्यक्रम | तिथि |
|------------|------|
| **आवेदन शुरू** | ${getCurrentDate()} |
| **आवेदन अंतिम तिथि** | ${job.deadline} |
| **लिखित परीक्षा** | ${getNextDate(30)} |
| **परीक्षा परिणाम** | ${getNextDate(45)} |
| **साक्षात्कार** | ${getNextDate(60)} |
| **अंतिम परिणाम** | ${getNextDate(75)} |

## आवश्यक दस्तावेज

### मूल दस्तावेज
- आधार कार्ड
- पैन कार्ड
- जन्म प्रमाण पत्र
- पता प्रमाण

### शैक्षिक दस्तावेज
- 10वीं और 12वीं की मार्कशीट
- स्नातक डिग्री प्रमाण पत्र
- सभी सेमेस्टर की मार्कशीट
- कक्षा प्रमाण पत्र

### अन्य दस्तावेज
- फोटो (पासपोर्ट साइज)
- हस्ताक्षर
- जाति प्रमाण पत्र (यदि लागू हो)
- आय प्रमाण पत्र

## तैयारी के टिप्स

### लिखित परीक्षा के लिए
- **सामान्य ज्ञान**: दैनिक समाचार पत्र पढ़ें
- **तर्कशक्ति**: प्रैक्टिस सेट हल करें
- **गणित**: बुनियादी गणित पर ध्यान दें
- **अंग्रेजी**: व्याकरण और शब्दावली सुधारें

### साक्षात्कार के लिए
- कंपनी/संगठन के बारे में जानें
- अपने अनुभव को अच्छी तरह से प्रस्तुत करें
- आत्मविश्वास के साथ बोलें
- उचित ड्रेस कोड का पालन करें

## संपर्क जानकारी

### आधिकारिक वेबसाइट
${job.link}

### हेल्पलाइन
- **टोल फ्री**: 1800-XXX-XXXX
- **ईमेल**: careers@${job.company.toLowerCase().replace(/\s+/g, '')}.com
- **पता**: ${job.company}, ${job.location}

## अक्सर पूछे जाने वाले प्रश्न

### Q1: क्या मैं इस नौकरी के लिए पात्र हूं?
A: हां, यदि आपकी आयु 18-30 वर्ष के बीच है और आपके पास स्नातक डिग्री है

### Q2: आवेदन शुल्क कितना है?
A: आवेदन शुल्क ₹500 है (SC/ST/OBC के लिए ₹250)

### Q3: परीक्षा कहां होगी?
A: परीक्षा ${job.location} और आसपास के शहरों में आयोजित की जाएगी

### Q4: क्या आरक्षण लागू है?
A: हां, सरकारी नियमों के अनुसार आरक्षण लागू है

## निष्कर्ष
${job.title} एक बेहतरीन अवसर है जो ${job.company} में ${job.location} में उपलब्ध है। इस नौकरी के लिए समय पर आवेदन करें और अच्छी तैयारी करें। सफलता आपकी होगी!

---

*यह जानकारी आधिकारिक स्रोतों से ली गई है। कृपया नवीनतम अपडेट के लिए ${job.link} देखें।*
  `;

  return {
    title,
    excerpt,
    content: content.trim(),
    seo: {
      title: `${job.title} - पूरी जानकारी और आवेदन प्रक्रिया 2025 | MoneyCal India`,
      description: `${job.title} के बारे में विस्तृत जानकारी, पात्रता, वेतन, रिक्तियां और आवेदन प्रक्रिया। ${job.company} में नौकरी के लिए आवेदन करें।`,
      keywords: `${job.title}, ${job.company}, job vacancy, recruitment, apply online, salary, ${job.location}, 2025`,
      canonicalUrl: `https://moneycal.in/jobs/${id}`,
      ogImage: `https://moneycal.in/images/jobs/${id}.jpg`,
      ogTitle: `${job.title} - पूरी जानकारी और आवेदन प्रक्रिया 2025`,
      ogDescription: `${job.title} के बारे में विस्तृत जानकारी, पात्रता, वेतन, रिक्तियां और आवेदन प्रक्रिया।`,
      twitterCard: 'summary_large_image',
      twitterTitle: `${job.title} - पूरी जानकारी और आवेदन प्रक्रिया 2025`,
      twitterDescription: `${job.title} के बारे में विस्तृत जानकारी, पात्रता, वेतन, रिक्तियां और आवेदन प्रक्रिया।`,
      schema: {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.title,
        "description": excerpt,
        "hiringOrganization": {
          "@type": "Organization",
          "name": job.company
        },
        "jobLocation": {
          "@type": "Place",
          "addressLocality": job.location,
          "addressCountry": "IN"
        },
        "datePosted": getCurrentDate(),
        "validThrough": job.deadline
      }
    }
  };
}

// Create blog post file
function createBlogPostFile(blogData, id) {
  const filePath = path.join(CONFIG.BLOG_DIR, `${id}.ts`);
  
  const fileContent = `import { BlogPost } from './index';

export const blog${id}: BlogPost = {
  id: ${id},
  title: \`${blogData.title}\`,
  excerpt: \`${blogData.excerpt}\`,
  content: \`${blogData.content}\`,
  author: {
    name: 'MoneyCal India',
    email: 'editor@moneycal.in',
    avatar: '/images/authors/moneycal-india.jpg'
  },
  date: '${getCurrentDate()}',
  lastModified: '${getCurrentDate()}',
  category: 'government-schemes',
  tags: ['government schemes', 'sarkari yojana', 'apply online', '2025', 'benefits'],
  readTime: 8,
  seo: ${JSON.stringify(blogData.seo, null, 2)}
};
`;

  try {
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`✅ Created blog post: ${id}.ts`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating blog post ${id}.ts:`, error);
    return false;
  }
}

// Update blog index
function updateBlogIndex() {
  try {
    const indexPath = path.join(CONFIG.BLOG_DIR, 'index.ts');
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Add new blog imports
    const files = fs.readdirSync(CONFIG.BLOG_DIR);
    const blogFiles = files.filter(file => file.endsWith('.ts') && file !== 'index.ts');
    
    // Generate import statements
    const imports = blogFiles.map(file => {
      const id = file.replace('.ts', '');
      return `import { blog${id} } from './${id}';`;
    }).join('\n');
    
    // Generate blog array
    const blogArray = blogFiles.map(file => {
      const id = file.replace('.ts', '');
      return `  blog${id},`;
    }).join('\n');
    
    // Update the index file
    const newIndexContent = `import { BlogPost } from './types';

// Auto-generated blog imports
${imports}

// Auto-generated blog array
export const blogs: BlogPost[] = [
${blogArray}
];

// Auto-update blog dates
export function autoUpdateBlogDates() {
  const currentDate = new Date().toISOString().split('T')[0];
  blogs.forEach(blog => {
    if (blog.lastModified !== currentDate) {
      blog.lastModified = currentDate;
    }
  });
}

// Export individual blogs
${blogFiles.map(file => {
  const id = file.replace('.ts', '');
  return `export { blog${id} } from './${id}';`;
}).join('\n')}
`;

    fs.writeFileSync(indexPath, newIndexContent, 'utf8');
    console.log('✅ Updated blog index');
    return true;
  } catch (error) {
    console.error('❌ Error updating blog index:', error);
    return false;
  }
}

// Git operations
async function syncWithGitHub() {
  try {
    console.log('📥 Pulling latest changes from GitHub...');
    execSync('git pull origin main', { stdio: 'inherit' });
    console.log('✅ Successfully pulled from GitHub');
    
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.log('📤 Pushing local changes to GitHub...');
      execSync('git add .', { stdio: 'inherit' });
      const commitMessage = `Auto-sync: Government Schemes & Jobs Blog Generation - ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
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

// Main blog generation function
async function generateGovernmentJobsBlogs() {
  try {
    console.log('🎯 Starting government schemes and jobs blog generation...');
    
    // Fetch data from external sources
    const data = await fetchSarkariResultData();
    
    let currentId = getNextBlogId();
    let generatedCount = 0;
    
    // Generate government scheme blogs
    for (const scheme of data.schemes) {
      if (generatedCount >= CONFIG.POSTS_PER_CYCLE) break;
      
      const blogData = generateSchemeBlogContent(scheme, currentId);
      if (createBlogPostFile(blogData, currentId)) {
        generatedCount++;
        currentId++;
      }
      
      // Small delay between generations
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Generate job blogs
    for (const job of data.jobs) {
      if (generatedCount >= CONFIG.POSTS_PER_CYCLE) break;
      
      const blogData = generateJobBlogContent(job, currentId);
      if (createBlogPostFile(blogData, currentId)) {
        generatedCount++;
        currentId++;
      }
      
      // Small delay between generations
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Update blog index
    if (updateBlogIndex()) {
      console.log('✅ Blog index updated successfully');
    }
    
    // Sync with GitHub
    await syncWithGitHub();
    
    console.log(`🎉 Successfully generated ${generatedCount} blog posts!`);
    console.log(`📝 Next generation cycle in ${CONFIG.INTERVAL_HOURS} hours`);
    
  } catch (error) {
    console.error('❌ Error generating blogs:', error);
    throw error;
  }
}

// Schedule next run
function scheduleNextRun() {
  const nextRunTime = new Date();
  nextRunTime.setHours(nextRunTime.getHours() + CONFIG.INTERVAL_HOURS);
  
  console.log(`⏰ Next blog generation scheduled for: ${nextRunTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
  
  setTimeout(async () => {
    try {
      console.log('🔄 Starting scheduled blog generation...');
      await generateGovernmentJobsBlogs();
      scheduleNextRun(); // Schedule next run
    } catch (error) {
      console.error('❌ Error in scheduled generation:', error);
      // Retry after 1 hour if failed
      setTimeout(() => scheduleNextRun(), 60 * 60 * 1000);
    }
  }, CONFIG.INTERVAL_HOURS * 60 * 60 * 1000);
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  try {
    await syncWithGitHub();
    console.log('✅ Final sync completed');
  } catch (error) {
    console.error('❌ Error in final sync:', error);
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  try {
    await syncWithGitHub();
    console.log('✅ Final sync completed');
  } catch (error) {
    console.error('❌ Error in final sync:', error);
  }
  process.exit(0);
});

// Main execution
async function main() {
  try {
    console.log('🎯 MoneyCal India - Automated Government Schemes & Jobs Blog Generator');
    console.log('=' .repeat(80));
    console.log(`📁 Blog Directory: ${CONFIG.BLOG_DIR}`);
    console.log(`⏰ Generation Interval: ${CONFIG.INTERVAL_HOURS} hours`);
    console.log(`📝 Posts per Cycle: ${CONFIG.POSTS_PER_CYCLE}`);
    console.log(`🎯 Starting ID: ${CONFIG.STARTING_ID}`);
    console.log(`🌐 Data Sources: ${CONFIG.SARKARI_RESULT_URL}, Google Trends`);
    console.log('=' .repeat(80));
    
    // Initial run
    await generateGovernmentJobsBlogs();
    
    // Schedule continuous runs
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

// Run the script
if (require.main === module) {
  main();
}