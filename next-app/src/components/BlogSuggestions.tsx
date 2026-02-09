import React from "react";
import { optimizedBlogPosts, EnhancedBlogPost } from "../data/optimizedBlogPosts";
import { financePosts, FinancePost } from "../data/financePosts";

interface BlogSuggestionsProps {}

const BlogSuggestions: React.FC<BlogSuggestionsProps> = () => {
  // Pick top 2 from each source
  const suggestions: Array<{
    id: string;
    title: string;
    category: string;
    link: string;
    source: string;
  }> = [
    ...financePosts.slice(0, 2).map((post) => ({
      id: post.id,
      title: post.title,
      category: post.category || "अन्य",
      link: post.link || `/finance/${post.slug}`,
      source: "FinancePost",
    })),
    ...optimizedBlogPosts.slice(0, 2).map((post: EnhancedBlogPost) => ({
      id: post.id,
      title: post.title,
      category: post.categories[0] || "अन्य",
      link: `/blog/${post.slug}`,
      source: "OptimizedBlogPost",
    })),
    // Add more sources here if needed
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {suggestions.map((item) => (
        <a
          key={item.id}
          href={item.link}
          className="block bg-white rounded-xl shadow p-5 hover:shadow-lg transition border-l-4 border-green-400"
        >
          <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-2">{item.category}</span>
          <h3 className="text-lg font-bold text-green-800 mb-2">{item.title}</h3>
          <div className="text-xs text-gray-400">{item.source === "FinancePost" ? "फाइनेंस पोस्ट" : "ब्लॉग पोस्ट"}</div>
        </a>
      ))}
    </div>
  );
};

export default BlogSuggestions; 