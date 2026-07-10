import fs from 'fs';
import path from 'path';

// Import the heavy blog files
import { blogPosts as blogPosts0 } from '../src/data/blogData';
import { blogPosts as blogPosts1 } from '../src/data/blogData1';

const allBlogs = [...(blogPosts0 || []), ...(blogPosts1 || [])].filter(Boolean);

const metadataPath = path.join(process.cwd(), 'src/data/blogMetadata.ts');

const metadata = allBlogs.map(article => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    snippet: article.snippet,
    category: article.category,
    coverImage: article.coverImage,
    author: article.author,
    date: article.date,
    readTime: article.readTime
}));

const content = `// Auto-generated metadata for Blog Posts to avoid loading heavy content in lists
export const blogMetadata = ${JSON.stringify(metadata, null, 4)};
`;

fs.writeFileSync(metadataPath, content);
console.log('Successfully generated blogMetadata.ts for blog articles! Total entries:', metadata.length);
