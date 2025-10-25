// Lazy-loaded blog data to prevent blocking initial page load
// This module will only be loaded when blog pages are accessed

let cachedBlogPosts: any = null;

export const loadBlogData = async () => {
  if (cachedBlogPosts) {
    return cachedBlogPosts;
  }

  // Dynamically import blog data only when needed
  const [module1, module2] = await Promise.all([
    import('./blogData'),
    import('./blogData1'),
  ]);

  cachedBlogPosts = {
    blogPosts0: module1.blogPosts || [],
    blogPosts1: module2.blogPosts || [],
  };

  return cachedBlogPosts;
};

export const loadAllBlogData = async () => {
  if (cachedBlogPosts?.all) {
    return cachedBlogPosts.all;
  }

  const { allBlogPosts } = await import('./allBlogData');
  
  if (!cachedBlogPosts) {
    cachedBlogPosts = {};
  }
  cachedBlogPosts.all = allBlogPosts;

  return allBlogPosts;
};

