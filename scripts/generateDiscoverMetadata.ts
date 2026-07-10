import fs from 'fs';
import path from 'path';
import { discoverArticles } from '../src/data/discover/index';

const metadataPath = path.join(process.cwd(), 'src/data/discover/metadata.ts');

const metadata = discoverArticles.map(article => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    snippet: article.snippet,
    coverImage: article.coverImage,
    author: article.author,
    date: article.date
}));

const content = `// Auto-generated metadata for Discover Articles to avoid loading heavy sections in lists
export const discoverMetadata = ${JSON.stringify(metadata, null, 4)};
`;

fs.writeFileSync(metadataPath, content);
console.log('Successfully generated metadata.ts for discover articles!');
