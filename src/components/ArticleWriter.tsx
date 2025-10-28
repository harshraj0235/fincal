import React, { useState } from 'react';
import { Copy, Check, Download, Sparkles } from 'lucide-react';
import { newsCategories } from '../data/newsCategories';
import { generateLenskartArticlePrompt } from '../data/news-articles/lenskart-ipo-series';

/**
 * ArticleWriter Component
 * Internal tool for content team to generate AI prompts
 * Simplifies the article creation workflow
 */

interface ArticleSuggestion {
  number: number;
  title: string;
  category: string;
  subcategory: string;
  focus: string;
  keywords: string[];
  estimatedTraffic: string;
}

const ArticleWriter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Lenskart article suggestions (expandable to other topics)
  const lenskartArticles: ArticleSuggestion[] = [
    {
      number: 1,
      title: "Why Lenskart's IPO Could Reshape the Indian Eyewear Industry",
      category: "Markets",
      subcategory: "IPOs & Listings",
      focus: "IPO significance, market impact, stakeholder analysis",
      keywords: ["lenskart ipo", "eyewear industry india", "ipo 2025"],
      estimatedTraffic: "5,000-10,000/month"
    },
    {
      number: 2,
      title: "Lenskart's ₹67,000 Crore Valuation Explained: Is It Justified?",
      category: "Markets",
      subcategory: "IPOs & Listings",
      focus: "Valuation methodology, P/S ratio, comparable analysis",
      keywords: ["lenskart valuation", "ipo valuation analysis"],
      estimatedTraffic: "3,000-7,000/month"
    },
    {
      number: 3,
      title: "Lenskart's Omnichannel Masterstroke: How 2,000+ Stores Changed the Game",
      category: "Startups",
      subcategory: "Startup Funding & News",
      focus: "Store expansion strategy, online-to-offline, retail economics",
      keywords: ["lenskart stores", "omnichannel retail", "online to offline"],
      estimatedTraffic: "2,000-5,000/month"
    },
    {
      number: 4,
      title: "SoftBank to Temasek: The Big Money Behind Lenskart's Success",
      category: "Startups",
      subcategory: "Startup Funding & News",
      focus: "Investor profiles, funding rounds, returns on investment",
      keywords: ["lenskart investors", "softbank investment", "venture capital"],
      estimatedTraffic: "2,000-4,000/month"
    },
    {
      number: 5,
      title: "Lenskart's IPO War Chest: ₹7,278 Crore Deployment Strategy",
      category: "Markets",
      subcategory: "IPOs & Listings",
      focus: "Use of funds, expansion plans, technology investments",
      keywords: ["lenskart ipo funds", "expansion strategy"],
      estimatedTraffic: "1,500-3,000/month"
    }
  ];

  const copyPromptToClipboard = (articleNumber: number, title: string, focus: string) => {
    const prompt = generateLenskartArticlePrompt(articleNumber, title, focus);
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(articleNumber);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const downloadAllPrompts = () => {
    const allPrompts = lenskartArticles.map(article => 
      `=== ARTICLE #${article.number} ===\n${generateLenskartArticlePrompt(article.number, article.title, article.focus)}\n\n`
    ).join('\n---\n\n');
    
    const blob = new Blob([allPrompts], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lenskart-100-articles-prompts.txt';
    a.click();
  };

  const filteredArticles = lenskartArticles.filter(article =>
    (selectedCategory === 'all' || article.category === selectedCategory) &&
    (searchTerm === '' || article.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-10 w-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-neutral-900">Article Writer - AI Prompt Generator</h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Generate production-ready AI prompts for news articles. Copy, customize, and create content in minutes!
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {newsCategories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>

            <button
              onClick={downloadAllPrompts}
              className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              <Download className="h-4 w-4" />
              Download All Prompts
            </button>
          </div>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div 
              key={article.number}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border-l-4 border-purple-600"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm font-bold rounded-full mb-2">
                    Article #{article.number}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{article.title}</h3>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-neutral-700">Category:</span>
                  <span className="text-neutral-600">{article.category} / {article.subcategory}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-neutral-700">Focus:</span>
                  <span className="text-neutral-600">{article.focus}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-neutral-700">Est. Traffic:</span>
                  <span className="text-green-600 font-medium">{article.estimatedTraffic}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => copyPromptToClipboard(article.number, article.title, article.focus)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  copiedPrompt === article.number
                    ? 'bg-green-600 text-white'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {copiedPrompt === article.number ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy AI Prompt
                  </>
                )}
              </button>

              <p className="text-xs text-neutral-500 mt-3 text-center">
                Paste into ChatGPT/Claude → Generate → Edit → Publish
              </p>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Copy Prompt</h3>
              <p className="text-white/90 text-sm">Click "Copy AI Prompt" button on any article card</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Generate with AI</h3>
              <p className="text-white/90 text-sm">Paste into ChatGPT/Claude and get complete draft in 2 minutes</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Human Edit</h3>
              <p className="text-white/90 text-sm">Fact-check, add sources, optimize (20-30 min)</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 text-2xl font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Publish!</h3>
              <p className="text-white/90 text-sm">Add to CMS and go live. Track performance.</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-3xl font-bold text-purple-600">100</p>
            <p className="text-neutral-600 font-medium">Total Articles</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">40-60 min</p>
            <p className="text-neutral-600 font-medium">Per Article</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-3xl font-bold text-blue-600">300K+</p>
            <p className="text-neutral-600 font-medium">Est. Monthly Traffic</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-3xl font-bold text-orange-600">5-6 weeks</p>
            <p className="text-neutral-600 font-medium">Full Series</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleWriter;

