import React, { useState } from "react";
import NewsSearchBar from "../components/NewsSearchBar";
import NewsList, { NewsItem } from "../components/NewsList";
import BlogSuggestions from "../components/BlogSuggestions";
import DeshiChat from "../components/DeshiChat";
import NewsSubmissionForm from "../components/NewsSubmissionForm";
import CommentsSection from "../components/CommentsSection";
import { blogPosts as blogPosts0 } from "../data/blogData";
import { blogPosts as blogPosts1 } from "../data/blogData1";
import { governmentSchemes } from "../data/governmentSchemesData";
import { calculatorCategories } from "../data/calculatorData";

function getRandomElements<T>(arr: T[], n: number): T[] {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const NewsHub: React.FC = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Flatten calculators
  const calculators: NewsItem[] = calculatorCategories.flatMap(cat => cat.calculators.map(calc => ({
    id: String(calc.id),
    title: calc.name,
    summary: calc.description,
    category: cat.name,
    date: "",
    slug: `/calculators/${calc.id}`
  })));

  // Map blog posts
  const allBlogs: NewsItem[] = [
    ...blogPosts0.map(post => ({
      id: String(post.id),
      title: post.title,
      summary: post.excerpt || "",
      category: post.categories?.[0] || "अन्य",
      date: post.date || "",
      slug: `/blog/${post.slug}`
    })),
    ...blogPosts1.map(post => ({
      id: String(post.id),
      title: post.title,
      summary: post.excerpt || "",
      category: post.categories?.[0] || "अन्य",
      date: post.date || "",
      slug: `/blog/${post.slug}`
    })),
    ...governmentSchemes.map(scheme => ({
      id: String(scheme.id),
      title: scheme.title,
      summary: scheme.seoDescription || "",
      category: scheme.category || "सरकारी योजना",
      date: "",
      slug: `/government-schemes/${scheme.slug}`
    })),
    ...calculators
  ];

  // Pick 6 random blogs/calculators/schemes
  const randomBlogs: NewsItem[] = getRandomElements(allBlogs, 6);

  // NewsList now expects a click handler to open the slug
  const handleNewsClick = (slug: string) => {
    window.open(slug, "_blank");
  };

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
          <NewsList news={randomBlogs} onNewsClick={handleNewsClick} />
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
