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
import { blog662 } from './662';
import { blog663 } from './663';
import { blog664 } from './664';
import { blog665 } from './665';
import { blog666 } from './666';
import { blog667 } from './667';
import { blog668 } from './668';
import { blog669 } from './669';
import { blog670 } from './670';
import { blog671 } from './671';

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
  blog662,
  blog663,
  blog664,
  blog665,
  blog666,
  blog667,
  blog668,
  blog669,
  blog670,
  blog671,
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
export { blog662 } from './662';
export { blog663 } from './663';
export { blog664 } from './664';
export { blog665 } from './665';
export { blog666 } from './666';
export { blog667 } from './667';
export { blog668 } from './668';
export { blog669 } from './669';
export { blog670 } from './670';
export { blog671 } from './671';
