import { CryptoBlogPost } from './types';

// Auto-generated crypto blog imports
import { crypto74 } from './74';

// Auto-generated crypto blog array
export const cryptoBlogs: CryptoBlogPost[] = [
  crypto74,
];

// Auto-update crypto blog dates
export function autoUpdateCryptoBlogDates() {
  const currentDate = new Date().toISOString().split('T')[0];
  cryptoBlogs.forEach(blog => {
    if (blog.lastModified !== currentDate) {
      blog.lastModified = currentDate;
    }
  });
}

// Export individual crypto blogs
export { crypto74 } from './74';
