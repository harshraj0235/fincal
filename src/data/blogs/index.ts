import { BlogPost } from './types';

// Auto-generated blog imports
import { blog651 } from './651';
import { blog652 } from './652';
import { blog653 } from './653';
import { blog654 } from './654';
import { blog655 } from './655';
import { blog656 } from './656';
import { blog657 } from './657';
import { blog658 } from './658';
import { blog659 } from './659';
import { blog660 } from './660';
import { blog661 } from './661';

// Auto-generated blog array
export const blogs: BlogPost[] = [
  blog651,
  blog652,
  blog653,
  blog654,
  blog655,
  blog656,
  blog657,
  blog658,
  blog659,
  blog660,
  blog661,
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
export { blog652 } from './652';
export { blog653 } from './653';
export { blog654 } from './654';
export { blog655 } from './655';
export { blog656 } from './656';
export { blog657 } from './657';
export { blog658 } from './658';
export { blog659 } from './659';
export { blog660 } from './660';
export { blog661 } from './661';
