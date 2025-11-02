/**
 * 📝 ARTICLE PUBLISHER
 * Creates TypeScript files and updates CMS registry
 */

const fs = require('fs');
const path = require('path');
const config = require('./config');
const { generateSlug } = require('./news-fetcher');

/**
 * Create article TypeScript file
 * @param {Object} article - Article object with content
 * @param {string} imagePath - Featured image path
 * @returns {Object} File info
 */
function createArticleFile(article, imagePath) {
  const { title, excerpt, content, seoKeywords, focusKeywords, sourceTopic } = article;
  const { category, author } = sourceTopic;
  
  const slug = generateSlug(title);
  const fileName = `${slug}.ts`;
  const filePath = path.join(config.paths.newsArticlesDir, category, fileName);

  // Ensure category directory exists
  const categoryDir = path.join(config.paths.newsArticlesDir, category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  // Generate TypeScript content
  const tsContent = `import { PlainArticle } from '../../types';

const article: PlainArticle = {
  id: '${slug}',
  title: \`${title.replace(/`/g, "'")}\`,
  excerpt: \`${excerpt.replace(/`/g, "'")}\`,
  content: \`${content.replace(/`/g, "'")}\`,
  category: '${category}',
  author: {
    name: '${author}',
    avatar: '/images/authors/${author.toLowerCase().replace(/\s+/g, '-')}.jpg',
    bio: 'Senior Financial Analyst at MoneyCal'
  },
  publishDate: '${new Date().toISOString().split('T')[0]}',
  readingTime: '${article.readingTime || '8 mins'}',
  featured: true,
  featuredImage: '${imagePath}',
  tags: ${JSON.stringify(seoKeywords.slice(0, 5))},
  seo: {
    metaTitle: \`${title.substring(0, 60)}\`,
    metaDescription: \`${excerpt.substring(0, 155)}\`,
    keywords: ${JSON.stringify(seoKeywords)},
    focusKeyword: '${focusKeywords[0] || seoKeywords[0]}'
  }
};

export default article;
`;

  // Write file
  fs.writeFileSync(filePath, tsContent);
  
  console.log(`✅ Article file created: ${category}/${fileName}`);

  return {
    slug,
    fileName,
    filePath,
    category,
    relativePath: `${category}/${fileName}`
  };
}

/**
 * Update plainArticleLoader.ts to import new articles
 * @param {Array} articleFiles - Array of created article files
 */
function updatePlainArticleLoader(articleFiles) {
  const loaderPath = config.paths.plainArticleLoader;
  
  // Read current file
  let content = fs.readFileSync(loaderPath, 'utf-8');

  // Generate imports for new articles
  const imports = articleFiles.map((file, index) => {
    const importName = `article${Date.now()}${index}`;
    return {
      statement: `import ${importName} from './news-articles/${file.relativePath.replace('.ts', '')}';`,
      name: importName,
      slug: file.slug
    };
  });

  // Add imports at top (after existing imports)
  const importStatements = imports.map(i => i.statement).join('\n');
  content = content.replace(
    /(import.*from.*';)/,
    `$1\n${importStatements}`
  );

  // Add to articles array
  const articleNames = imports.map(i => i.name).join(',\n  ');
  content = content.replace(
    /(const articles.*=.*\[)/,
    `$1\n  ${articleNames},`
  );

  fs.writeFileSync(loaderPath, content);
  console.log(`✅ Updated plainArticleLoader.ts with ${articleFiles.length} articles`);
}

/**
 * Update contentRegistry.ts with new articles
 * @param {Array} articleFiles - Array of created article files
 * @param {Array} articles - Full article objects
 */
function updateContentRegistry(articleFiles, articles) {
  const registryPath = config.paths.contentRegistry;
  
  // Read current file
  let content = fs.readFileSync(registryPath, 'utf-8');

  // Generate registry entries
  const entries = articles.map((article, index) => {
    const file = articleFiles[index];
    return `  {
    id: '${file.slug}',
    title: '${article.title.replace(/'/g, "\\'")}',
    category: '${file.category}',
    slug: '${file.slug}',
    excerpt: '${article.excerpt.substring(0, 150).replace(/'/g, "\\'")}',
    author: '${article.sourceTopic.author}',
    date: '${new Date().toISOString().split('T')[0]}',
    readTime: '${article.readingTime}',
    tags: ${JSON.stringify(article.seoKeywords.slice(0, 5))}
  }`;
  });

  // Add to contentMetadata array
  const entriesText = entries.join(',\n');
  content = content.replace(
    /(export const contentMetadata.*=.*\[)/,
    `$1\n${entriesText},`
  );

  fs.writeFileSync(registryPath, content);
  console.log(`✅ Updated contentRegistry.ts with ${articleFiles.length} articles`);
}

/**
 * Publish all articles
 * @param {Array} articles - Generated articles
 * @param {Array} imagePaths - Corresponding image paths
 */
async function publishArticles(articles, imagePaths) {
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('📝 PUBLISHING ARTICLES TO CMS');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  const articleFiles = [];

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const imagePath = imagePaths[i];

    try {
      const fileInfo = createArticleFile(article, imagePath);
      articleFiles.push(fileInfo);
    } catch (error) {
      console.error(`❌ Failed to publish article ${i + 1}:`, error.message);
    }
  }

  // Update loaders
  console.log('\n📦 Updating CMS loaders...');
  updatePlainArticleLoader(articleFiles);
  updateContentRegistry(articleFiles, articles);

  console.log(`\n✅ PUBLISHED ${articleFiles.length} ARTICLES!`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  return articleFiles;
}

module.exports = {
  createArticleFile,
  updatePlainArticleLoader,
  updateContentRegistry,
  publishArticles
};

