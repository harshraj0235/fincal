// Auto-import all blog files from the blogs folder
// This will automatically pick up any new blog files you add (651.ts, 652.ts, etc.)

// Define the blog type
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  coverImage: string;
  excerpt: string;
  categories: string[];
  content: Array<{
    type: string;
    content?: string;
    items?: string[];
    url?: string;
    caption?: string;
    author?: string;
  }>;
  [key: string]: unknown;
}

// Import all blog files dynamically
const blogModules = import.meta.glob('./*.ts', { eager: true });

// Extract all blog objects from the imported modules
export const blogs: BlogPost[] = Object.values(blogModules)
  .map((module: Record<string, unknown>) => {
    // Skip the index.ts file itself
    if (module.default && typeof module.default === 'object' && (module.default as BlogPost).id) {
      return module.default as BlogPost;
    }
    return null;
  })
  .filter((blog): blog is BlogPost => blog !== null) // Remove any null values
  .sort((a: BlogPost, b: BlogPost) => b.id - a.id); // Sort by ID descending (newest first)

// Export individual blogs for specific access if needed
export const blog651 = blogModules['./651.ts']?.default as BlogPost | undefined;
export const blog652 = blogModules['./652.ts']?.default as BlogPost | undefined;
// Add more exports as you create new blog files

console.log(`Loaded ${blogs.length} blog files:`, blogs.map((blog: BlogPost) => blog.id)); 