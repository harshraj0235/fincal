import { BlogPost } from './types';

// Auto-generated blog imports
import { blog671 } from './671';
import { blog670 } from './670';
import { blog669 } from './669';
import { blog668 } from './668';
import { blog667 } from './667';
import { blog666 } from './666';
import { blog665 } from './665';
import { blog664 } from './664';
import { blog663 } from './663';
import { blog662 } from './662';
import { blog661 } from './661';
import { blog660 } from './660';
import { blog659 } from './659';
import { blog658 } from './658';
import { blog657 } from './657';
import { blog656 } from './656';
import { blog655 } from './655';
import { blog654 } from './654';
import { blog653 } from './653';
import { blog652 } from './652';
import { blog651 } from './651';

// Auto-generated blog array
export const blogs: BlogPost[] = [
  blog671,
  blog670,
  blog669,
  blog668,
  blog667,
  blog666,
  blog665,
  blog664,
  blog663,
  blog662,
  blog661,
  blog660,
  blog659,
  blog658,
  blog657,
  blog656,
  blog655,
  blog654,
  blog653,
  blog652,
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
export { blog671 } from './671';
export { blog670 } from './670';
export { blog669 } from './669';
export { blog668 } from './668';
export { blog667 } from './667';
export { blog666 } from './666';
export { blog665 } from './665';
export { blog664 } from './664';
export { blog663 } from './663';
export { blog662 } from './662';
export { blog661 } from './661';
export { blog660 } from './660';
export { blog659 } from './659';
export { blog658 } from './658';
export { blog657 } from './657';
export { blog656 } from './656';
export { blog655 } from './655';
export { blog654 } from './654';
export { blog653 } from './653';
export { blog652 } from './652';
export { blog651 } from './651';
