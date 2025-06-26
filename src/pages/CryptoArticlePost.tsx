import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cryptoArticles } from '../data/cryptoData';
import SEOHelmet from '../components/SEOHelmet';
import { ArrowLeft } from 'lucide-react';

const renderContent = (content) => {
  return content.map((block, idx) => {
    switch (block.type) {
      case 'heading':
        return <h1 key={idx} className="text-3xl font-bold text-yellow-300 mb-4 mt-8">{block.content}</h1>;
      case 'subheading':
        return <h2 key={idx} className="text-2xl font-semibold text-pink-400 mb-3 mt-6">{block.content}</h2>;
      case 'paragraph':
        return <p key={idx} className="text-gray-200 mb-4 text-lg leading-relaxed">{block.content}</p>;
      case 'list':
        return <ul key={idx} className="list-disc list-inside mb-4 text-gray-200">{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
      case 'image':
        return <img key={idx} src={block.url} alt={block.caption || ''} className="my-6 rounded-lg shadow-lg mx-auto" />;
      case 'quote':
        return <blockquote key={idx} className="border-l-4 border-yellow-400 pl-4 italic text-gray-300 mb-4">{block.content}</blockquote>;
      case 'table':
        return (
          <table key={idx} className="my-6 w-full text-left border border-gray-700">
            <thead>
              <tr>{block.tableData.headers.map((h, i) => <th key={i} className="px-3 py-2 border-b border-gray-700 text-yellow-300">{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.tableData.rows.map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j} className="px-3 py-2 border-b border-gray-800">{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        );
      case 'highlight':
        return <div key={idx} className="bg-yellow-900 text-yellow-200 rounded-lg p-4 my-4 font-semibold">{block.content}</div>;
      default:
        return null;
    }
  });
};

const CryptoArticlePost: React.FC = () => {
  const { slug } = useParams();
  const article = cryptoArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <Link to="/crypto" className="text-yellow-400 hover:underline flex items-center gap-2"><ArrowLeft /> Back to Crypto</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white pb-16">
      <SEOHelmet
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.excerpt}
        keywords={article.keywords?.join(', ')}
        url={`/crypto/${article.slug}`}
        image={article.coverImage}
        type="article"
        tags={article.keywords}
      />
      <div className="max-w-3xl mx-auto px-4 pt-10">
        <Link to="/crypto" className="text-yellow-400 hover:underline flex items-center gap-2 mb-6"><ArrowLeft /> Back to Crypto</Link>
        <img src={article.coverImage} alt={article.title} className="w-full h-64 object-cover rounded-lg mb-6 border-4 border-gray-900" />
        <h1 className="text-4xl font-extrabold text-yellow-300 mb-4">{article.title}</h1>
        <p className="text-lg text-gray-300 mb-6">{article.excerpt}</p>
        <div className="mb-8">
          {renderContent(article.content)}
        </div>
        {/* FAQ Section */}
        {article.faqSchema && article.faqSchema.length > 0 && (
          <div className="mt-10 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">Frequently Asked Questions</h2>
            <ul className="space-y-4">
              {article.faqSchema.map((faq, i) => (
                <li key={i}>
                  <strong className="text-yellow-300">Q: {faq.question}</strong>
                  <p className="text-gray-200 ml-2 mt-1">A: {faq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoArticlePost; 