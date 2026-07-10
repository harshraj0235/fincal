
import { blogs } from './src/data/blogs/index';

const taxBlogs = blogs.filter(b => b.categories.includes('Tax'));
console.log(`Total Tax Blogs: ${taxBlogs.length}`);

taxBlogs.slice(0, 5).forEach(b => {
    const wordCount = b.content.reduce((acc, curr) => acc + (curr.content ? curr.content.split(' ').length : 0), 0);
    console.log(`Post ${b.id}: ${b.title}`);
    console.log(`- Word count: ~${wordCount}`);
    console.log(`- Excerpt: ${b.excerpt.substring(0, 50)}...`);
});
