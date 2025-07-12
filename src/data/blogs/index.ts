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

// Function to auto-update blog dates every 2 days for fresh content
function autoUpdateBlogDates(blog: BlogPost): BlogPost {
  const now = new Date();
  const blogDate = new Date(blog.date);
  const daysDifference = Math.floor((now.getTime() - blogDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Update date if blog is older than 2 days
  if (daysDifference >= 2) {
    const updatedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    return {
      ...blog,
      date: updatedDate,
      lastModified: now.toISOString(),
      publishedDate: blog.publishedDate || now.toISOString()
    };
  }
  
  return blog;
}

// Import all blog files dynamically
const blogModules = import.meta.glob('./*.ts', { eager: true });

// Extract all blog objects from the imported modules and auto-update dates
export const blogs: BlogPost[] = Object.values(blogModules)
  .map((module: unknown) => {
    // Skip the index.ts file itself
    if (module && typeof module === 'object' && 'default' in module && 
        (module as { default: unknown }).default && 
        typeof (module as { default: unknown }).default === 'object' && 
        ((module as { default: BlogPost }).default as BlogPost).id) {
      return autoUpdateBlogDates((module as { default: BlogPost }).default);
    }
    return null;
  })
  .filter((blog): blog is BlogPost => blog !== null) // Remove any null values
  .sort((a: BlogPost, b: BlogPost) => b.id - a.id); // Sort by ID descending (newest first)

// Export individual blogs for specific access if needed
export const blog651 = (blogModules['./651.ts'] as { default: BlogPost })?.default;
export const blog652 = (blogModules['./652.ts'] as { default: BlogPost })?.default;
// Add more exports as you create new blog files

console.log(`Loaded ${blogs.length} blog files with auto-updated dates:`, blogs.map((blog: BlogPost) => `${blog.id} (${blog.date})`)); 