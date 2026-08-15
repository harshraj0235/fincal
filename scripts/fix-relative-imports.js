const fs = require('fs');
const path = require('path');

const PROJECT = path.join(__dirname, '..');
const SRC = path.join(PROJECT, 'src');

function fixImports(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += fixImports(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const before = content;
      
      // Fix ../lib/, ../services/, ../styles/ -> @/lib/ etc
      content = content.replace(/from\s+['"]\.\.\/\.\.\/lib\//g, "from '@/lib/");
      content = content.replace(/from\s+['"]\.\.\/lib\//g, "from '@/lib/");
      
      content = content.replace(/from\s+['"]\.\.\/\.\.\/services\//g, "from '@/services/");
      content = content.replace(/from\s+['"]\.\.\/services\//g, "from '@/services/");

      content = content.replace(/from\s+['"]\.\.\/\.\.\/styles\//g, "from '@/styles/");
      content = content.replace(/from\s+['"]\.\.\/styles\//g, "from '@/styles/");
      content = content.replace(/import\s+['"]\.\.\/\.\.\/styles\//g, "import '@/styles/");
      content = content.replace(/import\s+['"]\.\.\/styles\//g, "import '@/styles/");
      
      // Fix local component imports in UniversalArticleDispatcherClient
      if (entry.name === 'UniversalArticleDispatcherClient.tsx') {
        content = content.replace(/\.\/BlogPost/g, "@/app/blog-post/BlogPostClient");
        content = content.replace(/\.\/CryptoArticlePost/g, "@/app/crypto-article-post/CryptoArticlePostClient");
        content = content.replace(/\.\/SEOBlogPost/g, "@/app/seoblog-post/SEOBlogPostClient");
        content = content.replace(/\.\/news\/NewsArticlePage/g, "@/app/news/news-article-page/NewsArticlePageClient");
        content = content.replace(/\.\/DiscoverArticlePage/g, "@/app/discover/discover-article-page/DiscoverArticlePageClient");
        content = content.replace(/\.\/SiloPost/g, "@/app/silo-post/SiloPostClient");
        content = content.replace(/\.\/GovernmentSchemePost/g, "@/app/government-scheme-post/GovernmentSchemePostClient");
      }
      
      // Fix ExcelToolDetailClient
      if (entry.name === 'ExcelToolDetailClient.tsx') {
        content = content.replace(/from\s+['"]\.\//g, "from '@/calculators/excel/"); // Excel tools are in src/calculators/excel/ in Vite ?
      }
      
      // Fix ProgrammaticMasterDispatcherClient
      if (entry.name === 'ProgrammaticMasterDispatcherClient.tsx') {
        content = content.replace(/\.\/ProgrammaticSipDispatcher/g, "@/app/calculators/programmatic-sip-dispatcher/ProgrammaticSipDispatcherClient");
        content = content.replace(/\.\/ProgrammaticIncomeTaxDispatcher/g, "@/app/calculators/programmatic-income-tax-dispatcher/ProgrammaticIncomeTaxDispatcherClient");
        content = content.replace(/\.\/ProgrammaticEmiDispatcher/g, "@/app/calculators/programmatic-emi-dispatcher/ProgrammaticEmiDispatcherClient");
      }
      
      // Fix NewsCategoryDispatcherClient
      if (entry.name === 'NewsCategoryDispatcherClient.tsx') {
        content = content.replace(/\.\/news\/NewsCategoryPage/g, "@/app/news/news-category-page/NewsCategoryPageClient");
        content = content.replace(/\.\/market\/CityRateDetail/g, "@/app/market/city-rate-detail/CityRateDetailClient");
      }

      if (content !== before) {
        fs.writeFileSync(fullPath, content);
        count++;
        console.log(`Fixed imports in ${fullPath.replace(PROJECT, '')}`);
      }
    }
  }
  return count;
}

const fixed = fixImports(SRC);
console.log(`\nFixed remaining relative imports in ${fixed} files.`);
