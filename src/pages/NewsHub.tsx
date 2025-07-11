import React, { useState } from "react";
import NewsSearchBar from "../components/NewsSearchBar";
import NewsList, { NewsItem } from "../components/NewsList";
import { optimizedBlogPosts } from "../data/optimizedBlogPosts";
import BlogSuggestions from "../components/BlogSuggestions";
import DeshiChat from "../components/DeshiChat";
import NewsSubmissionForm from "../components/NewsSubmissionForm";
import CommentsSection from "../components/CommentsSection";

// Placeholder components (to be implemented)
// import NewsList from "../components/NewsList";
// import DeshiChat from "../components/DeshiChat";
// import BlogSuggestions from "../components/BlogSuggestions";
// import NewsSubmissionForm from "../components/NewsSubmissionForm";
// import CommentsSection from "../components/CommentsSection";

const NewsHub: React.FC = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Map EnhancedBlogPost to NewsItem for NewsList
  const latestNews: NewsItem[] = optimizedBlogPosts.slice(0, 6).map(post => ({
    id: post.id,
    title: post.title,
    summary: post.excerpt,
    category: post.categories[0] || "अन्य",
    date: post.publishedDate.split("T")[0],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 py-6 px-2 md:px-8 lg:px-32">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-2">मनीकल देशी न्यूज़ हब</h1>
        <p className="text-lg md:text-xl text-gray-700">यहाँ पाएँ ताज़ा वित्तीय समाचार, सरकारी योजनाएँ, क्रिप्टो अपडेट्स और बहुत कुछ – हिंदी में!</p>
      </header>

      {/* News Search Bar */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-2xl font-bold text-green-600 mb-2">खोजें वित्तीय समाचार</h2>
          <NewsSearchBar onResults={setSearchResults} />
          {searchResults.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-700 mb-2">खोज परिणाम:</h3>
              <ul className="list-disc pl-6 space-y-1">
                {searchResults.map((result, idx) => (
                  <li key={idx} className="text-gray-800">{result}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* News List */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-2xl font-bold text-green-600 mb-2">लेटेस्ट न्यूज़</h2>
          <NewsList news={latestNews} />
        </div>
      </section>

      {/* Blog Suggestions */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-2xl font-bold text-green-600 mb-2">सुझावित ब्लॉग्स</h2>
          <BlogSuggestions />
        </div>
      </section>

      {/* Chatbot */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-2xl font-bold text-green-600 mb-2">देशी चैटबोट</h2>
          <DeshiChat />
        </div>
      </section>

      {/* News Submission Form */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-2xl font-bold text-green-600 mb-2">अपना न्यूज़/ब्लॉग जोड़ें</h2>
          <NewsSubmissionForm />
        </div>
      </section>

      {/* Comments Section */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-2xl font-bold text-green-600 mb-2">टिप्पणियाँ</h2>
          <CommentsSection />
        </div>
      </section>
    </div>
  );
};

export default NewsHub; 