import { BlogPost } from './types';

// Auto-generated blog imports
import { blog651 } from './651';

// Auto-generated blog array
export const blogs: BlogPost[] = [
  blog651,
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
