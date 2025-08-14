import { BlogPost } from './types';

// Auto-generated blog imports
import { blog691 } from './691';
import { blog690 } from './690';
import { blog689 } from './689';
import { blog688 } from './688';
import { blog687 } from './687';
import { blog686 } from './686';
import { blog685 } from './685';
import { blog684 } from './684';
import { blog683 } from './683';
import { blog682 } from './682';
import { blog681 } from './681';
import { blog680 } from './680';
import { blog679 } from './679';
import { blog678 } from './678';
import { blog677 } from './677';
import { blog676 } from './676';
import { blog675 } from './675';
import { blog674 } from './674';
import { blog673 } from './673';
import { blog672 } from './672';
import { blog651 } from './651';

// Auto-generated blog array
export const blogs: BlogPost[] = [
  blog691,
  blog690,
  blog689,
  blog688,
  blog687,
  blog686,
  blog685,
  blog684,
  blog683,
  blog682,
  blog681,
  blog680,
  blog679,
  blog678,
  blog677,
  blog676,
  blog675,
  blog674,
  blog673,
  blog672,
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
export { blog691 } from './691';
export { blog690 } from './690';
export { blog689 } from './689';
export { blog688 } from './688';
export { blog687 } from './687';
export { blog686 } from './686';
export { blog685 } from './685';
export { blog684 } from './684';
export { blog683 } from './683';
export { blog682 } from './682';
export { blog681 } from './681';
export { blog680 } from './680';
export { blog679 } from './679';
export { blog678 } from './678';
export { blog677 } from './677';
export { blog676 } from './676';
export { blog675 } from './675';
export { blog674 } from './674';
export { blog673 } from './673';
export { blog672 } from './672';
export { blog651 } from './651';
