// Node script to generate multiple SEO-friendly blog files under src/data/blogs
// Usage: node scripts/generate-blogs.cjs

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'data', 'blogs');
if (!fs.existsSync(outDir)) {
  console.error('Output directory not found:', outDir);
  process.exit(1);
}

const cities = [
  'Bengaluru','Mumbai','Delhi','Noida','Pune','Hyderabad','Chennai','Kolkata','Ahmedabad','Jaipur',
  'Lucknow','Chandigarh','Indore','Surat','Kochi','Coimbatore','Bhubaneswar','Patna','Guwahati','Nagpur'
];

const topics = [
  { key: 'tech', title: 'Tech Hiring & AI Adoption', keywords: ['AI jobs India','developer market','MLOps','hiring 2025'] },
  { key: 'stocks', title: 'Stock Market & SIP Discipline', keywords: ['SIP India','market outlook','risk management','asset allocation'] },
  { key: 'jobs', title: 'Jobs, Reskilling & Salaries', keywords: ['jobs 2025','salary bands','reskilling','careers India'] },
  { key: 'finance', title: 'Personal Finance & Tax', keywords: ['PPF','NPS','tax regime','financial planning'] }
];

const pexels = [
  'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
  'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
  'https://images.pexels.com/photos/7063778/pexels-photo-7063778.jpeg',
  'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg'
];

const startId = 680;
const endId = 730;

function pick(arr, i) { return arr[i % arr.length]; }

function genParagraph(city, topic, idx) {
  const sentences = [
    `${city} is seeing steady momentum in ${topic} through 2025 as teams formalize measured, metrics-driven execution across product and operations.`,
    `Leaders emphasize clear baselines, weekly reviews, and cost-aware decisions so experiments compound into predictable outcomes rather than one-off wins.`,
    `Teams that document tradeoffs and connect metrics to business KPIs consistently outperform, especially when roadmaps include evaluation and rollback plans.`,
    `Execution clarity matters more than hype: simple designs, stable pipelines, and thoughtful risk controls keep portfolios resilient in volatile conditions.`,
    `Individual contributors can stand out by publishing concise write-ups, instrumenting features end-to-end, and quantifying results with honest error analysis.`,
    `Local networks in ${city}—meetups, demo days, and peer reviews—accelerate feedback loops and help practitioners benchmark their work against industry standards.`,
    `For 2025, the most durable edge is disciplined delivery: smaller scoped releases, faster iteration cycles, and clean handoffs between functions.`,
    `Organizations that invest in documentation and knowledge reuse reduce onboarding friction and unlock higher throughput without burning teams out.`,
  ];
  return sentences[idx % sentences.length];
}

function makeFile(id) {
  const city = pick(cities, id);
  const topic = pick(topics, id);
  const img = pick(pexels, id);
  const today = new Date().toISOString().split('T')[0];
  const slugBase = `${city.toLowerCase().replace(/\s+/g,'-')}-${topic.key}-trends-2025-guide-${id}`;
  const title = `${city} 2025: ${topic.title} — A Practical Guide (${id})`;
  const excerpt = `${city} practitioners in 2025 focus on disciplined delivery: scoped releases, measurable outcomes, and risk-aware planning.`;
  const kws = [city.toLowerCase(), `${topic.key} 2025`, ...topic.keywords];

  const paragraphs = [];
  for (let i = 0; i < 16; i++) paragraphs.push(genParagraph(city, topic.title, i));

  const contentBlocks = [
    { type: 'heading', content: `${city} 2025: ${topic.title}` },
    { type: 'paragraph', content: paragraphs[0] },
    { type: 'subheading', content: 'Signals that actually matter' },
    { type: 'paragraph', content: paragraphs[1] },
    { type: 'subheading', content: 'A simple weekly routine' },
    { type: 'paragraph', content: paragraphs[2] },
    { type: 'subheading', content: 'Execution checklist' },
    { type: 'list', items: [
      'Define a baseline; instrument KPIs; review weekly.',
      'Ship smaller changes; measure; rollback if needed.',
      'Document decisions; reduce ambiguity in handoffs.',
      'Keep risk buffers: time, budget, and people.'
    ]},
    { type: 'paragraph', content: paragraphs[3] },
    { type: 'paragraph', content: paragraphs[4] },
    { type: 'subheading', content: 'Tools to plan better' },
    { type: 'list', items: [
      'Income Tax Calculator for in-hand planning',
      'EMI Calculator for big-ticket affordability',
      'SIP Calculator for long-term compounding'
    ]},
    { type: 'paragraph', content: paragraphs[5] },
    { type: 'paragraph', content: paragraphs[6] },
    { type: 'paragraph', content: paragraphs[7] },
    { type: 'heading', content: 'Key takeaway' },
    { type: 'paragraph', content: 'Consistency beats intensity. Clear metrics, simple designs, and steady iteration unlock durable results in 2025.' }
  ];

  const file = `import { blogPosts } from '../blogData1';

const blog${id} = {
  id: ${id},
  slug: '${slugBase}',
  title: '${title.replace(/'/g, "\\'")}',
  author: 'Harsh Raj',
  authorTitle: 'Software Engineer & Finance Enthusiast',
  authorImage: '${img}',
  authorBio: 'Educational writing for Indian readers. Not financial advice.',
  metaDescription: '${excerpt.replace(/'/g, "\\'")}',
  excerpt: '${excerpt.replace(/'/g, "\\'")}',
  categories: ['Guides','${city}','${topic.key.toUpperCase()}'],
  keywords: ${JSON.stringify(kws)},
  date: '${today}',
  coverImage: '${img}',
  content: ${JSON.stringify(contentBlocks, null, 2)},
  publishedDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  readingTime: 6,
  schema: { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: '${title.replace(/'/g, "\\'")}' },
  openGraph: { title: '${title.replace(/'/g, "\\'")}', description: '${excerpt.replace(/'/g, "\\'")}', image: '${img}', url: '/blog/${slugBase}', type: 'article', siteName: 'MoneyCal India' },
  discoverOptimized: { highQualityImages: true, originalReporting: true, expertiseSignals: true, freshContent: true }
};

export const relatedBlogPosts = blogPosts.filter(p => p.categories?.some(c => blog${id}.categories.includes(c))).slice(0, 3);
export default blog${id};
`;

  const outPath = path.join(outDir, `${id}.ts`);
  if (!fs.existsSync(outPath)) {
    fs.writeFileSync(outPath, file, 'utf8');
    console.log('Created', outPath);
  } else {
    console.log('Skipped (exists)', outPath);
  }
}

for (let id = startId; id <= endId; id++) {
  // keep 678,679 created manually; generate 680..730
  if (id >= 680) makeFile(id);
}

console.log('Done generating blog files.');


