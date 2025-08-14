import { BlogPost } from './types';

// Auto-generated blog imports
import { blog651 } from './651';
import { blogtemplate } from './template';
import { testBlog } from './test-automation';

// Auto-generated blog array
export const blogs: BlogPost[] = [
  blog651,
  blogtemplate,
  testBlog,
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
export { blog651 } from './651';
export { blogtemplate } from './template';
export { testBlog } from './test-automation';
