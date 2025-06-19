// src/data/blogData1.ts

import type { BlogPost } from './blogData';

export const blogPosts: BlogPost[] = [
  {
    id: 270,
    title: "Your New Blog Post Title",
    slug: "your-new-blog-post-slug",
    date: "June 19, 2025",
    author: "Your Name",
    coverImage: "https://your-image-url.jpg",
    excerpt: "A short summary of your new blog post.",
    categories: ["Category1", "Category2"],
    content: [
      {
        type: "paragraph",
        content: "Your blog post content goes here."
      },
      // Add more sections as needed (heading, list, image, etc.)
    ]
  },
  // Add more posts (id: 271, 272, etc.) in the same structure if needed
];
