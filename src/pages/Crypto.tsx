import React from 'react';
import { cryptoBlogs } from '../data/crypto';

const Crypto: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            क्रिप्टोकरेंसी निवेश गाइड
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            बिटकॉइन, एथेरियम और अन्य डिजिटल एसेट्स में निवेश के लिए विशेषज्ञ मार्गदर्शन
          </p>
        </div>

        {/* Crypto Blogs Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cryptoBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {blog.category}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">
                    {blog.readTime}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {blog.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {new Date(blog.publishedDate).toLocaleDateString('hi-IN')}
                    </span>
                  </div>
                  
                  <a
                    href={`/crypto/${blog.slug}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    पढ़ें
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* SEO Content */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            क्रिप्टोकरेंसी निवेश के बारे में
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              क्रिप्टोकरेंसी ने पिछले एक दशक में वित्तीय दुनिया को पूरी तरह से बदल दिया है। 
              बिटकॉइन, एथेरियम और अन्य डिजिटल एसेट्स ने निवेशकों के लिए नए अवसर खोले हैं।
            </p>
            <p className="mb-4">
              हमारे विशेषज्ञ टीम द्वारा तैयार किए गए ये लेख आपको क्रिप्टोकरेंसी में निवेश के 
              बारे में विस्तृत जानकारी प्रदान करते हैं, जिसमें बाजार विश्लेषण, निवेश रणनीतियां, 
              और जोखिम प्रबंधन शामिल हैं।
            </p>
            <p>
              भारत में क्रिप्टोकरेंसी के विनियमन और कराधान के बारे में भी जानकारी प्राप्त करें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crypto;
