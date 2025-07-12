import React, { useState, useRef, useEffect } from 'react';
import { getAllCalculators, getCalculatorById } from '../data/calculatorData';
import { excelTools } from '../data/excelToolsData';
import { governmentSchemes } from '../data/governmentSchemesData';
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';
import { cryptoArticles } from '../data/cryptoData';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface SearchResult {
  type: 'calculator' | 'excel-tool' | 'government-scheme' | 'blog' | 'crypto';
  title: string;
  description: string;
  category: string;
  url: string;
  relevance: number;
}

const FinanceChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your financial assistant. Ask me anything about calculators, Excel tools, government schemes, or financial topics. I\'ll provide concise answers and show you related resources.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const searchData = (query: string): SearchResult[] => {
    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search calculators
    const calculators = getAllCalculators();
    calculators.forEach(calc => {
      const relevance = calc.keywords.some(keyword => 
        keyword.toLowerCase().includes(lowerQuery)
      ) ? 3 : 
      calc.name.toLowerCase().includes(lowerQuery) ? 2 : 0;

      if (relevance > 0) {
        // Get detailed calculator info
        const calculatorDetails = getCalculatorById(calc.id);
        let description = `Financial calculator for ${calc.name.toLowerCase()}`;
        
        if (calculatorDetails) {
          const features = [];
          if (calculatorDetails.info && calculatorDetails.info.length > 0) {
            features.push(...calculatorDetails.info.slice(0, 3));
          }
          if (calculatorDetails.faqs && calculatorDetails.faqs.length > 0) {
            features.push(calculatorDetails.faqs[0].question);
          }
          
          if (features.length > 0) {
            description = `**Key Features:**\n• ${features.join('\n• ')}`;
          }
        }

        results.push({
          type: 'calculator',
          title: calc.name,
          description: description,
          category: calc.category,
          url: `/calculators/${calc.id}`,
          relevance
        });
      }
    });

    // Search Excel tools
    excelTools.forEach(tool => {
      const relevance = tool.keywords.some(keyword => 
        keyword.toLowerCase().includes(lowerQuery)
      ) ? 3 : 
      tool.title.toLowerCase().includes(lowerQuery) ? 2 :
      tool.description.toLowerCase().includes(lowerQuery) ? 1 : 0;

      if (relevance > 0) {
        // Create detailed description with features
        let description = tool.description;
        if (tool.features && tool.features.length > 0) {
          const featureList = tool.features.slice(0, 3).join('\n• ');
          description = `${tool.description}\n\n**Key Features:**\n• ${featureList}`;
        }

        results.push({
          type: 'excel-tool',
          title: tool.title,
          description: description,
          category: tool.category,
          url: `/excel-tools/${tool.slug}`,
          relevance
        });
      }
    });

    // Search government schemes
    governmentSchemes.forEach(scheme => {
      const relevance = scheme.title.toLowerCase().includes(lowerQuery) ? 2 :
      scheme.seoDescription?.toLowerCase().includes(lowerQuery) ? 1 : 0;

      if (relevance > 0) {
        results.push({
          type: 'government-scheme',
          title: scheme.title,
          description: scheme.seoDescription || '',
          category: scheme.category || 'Government Scheme',
          url: `/government-schemes/${scheme.slug}`,
          relevance
        });
      }
    });

    // Search blog posts
    const allBlogPosts = [...blogPosts0, ...blogPosts1];
    allBlogPosts.forEach(post => {
      const relevance = post.title.toLowerCase().includes(lowerQuery) ? 3 :
      post.excerpt?.toLowerCase().includes(lowerQuery) ? 2 :
      post.categories?.some(cat => cat.toLowerCase().includes(lowerQuery)) ? 1 : 0;

      if (relevance > 0) {
        // Extract key points from content if available
        let keyPoints = '';
        if (post.content && Array.isArray(post.content)) {
          const contentText = post.content
            .filter(item => item.type === 'paragraph' || item.type === 'list')
            .map(item => item.content || (item.items ? item.items.join(' ') : ''))
            .join(' ')
            .substring(0, 200);
          
          if (contentText) {
            keyPoints = contentText.length > 150 ? contentText.substring(0, 150) + '...' : contentText;
          }
        }

        results.push({
          type: 'blog',
          title: post.title,
          description: keyPoints || post.excerpt || '',
          category: post.categories?.[0] || 'Blog',
          url: `/blog/${post.slug}`,
          relevance
        });
      }
    });

    // Search crypto articles
    cryptoArticles.forEach(article => {
      const relevance = article.title.toLowerCase().includes(lowerQuery) ? 3 :
      article.excerpt.toLowerCase().includes(lowerQuery) ? 2 :
      article.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ? 1 : 0;

      if (relevance > 0) {
        // Extract key points from FAQ if available
        let keyPoints = article.excerpt;
        if (article.faqSchema && article.faqSchema.length > 0) {
          const faqPoints = article.faqSchema
            .slice(0, 2)
            .map(faq => faq.question)
            .join(' • ');
          if (faqPoints) {
            keyPoints = `${article.excerpt}\n\n**Key Topics:**\n• ${faqPoints}`;
          }
        }

        results.push({
          type: 'crypto',
          title: article.title,
          description: keyPoints,
          category: article.category,
          url: `/crypto/${article.slug}`,
          relevance
        });
      }
    });

    return results.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
  };

  const generateResponse = (query: string, results: SearchResult[]): string => {
    if (results.length === 0) {
      return "I couldn't find specific information about that. Try asking about calculators, Excel tools, government schemes, blog posts, or crypto topics. For example: 'EMI calculator', 'budget template', 'PPF scheme', 'crypto regulation', etc.";
    }

    const topResult = results[0];
    let response = `✨ **Quick Answer for "${query}"**\n\n`;

    if (topResult.type === 'calculator') {
      response += `📊 **${topResult.title}**\n\n`;
      response += `**Key Features:**\n`;
      response += `• ${topResult.description}\n`;
      response += `• Category: ${topResult.category}\n`;
      response += `• [🔗 Try Calculator](${topResult.url})\n\n`;
    } else if (topResult.type === 'excel-tool') {
      response += `📈 **${topResult.title}**\n\n`;
      response += `**What you get:**\n`;
      response += `• ${topResult.description}\n`;
      response += `• Category: ${topResult.category}\n`;
      response += `• [🔗 Download Tool](${topResult.url})\n\n`;
    } else if (topResult.type === 'government-scheme') {
      response += `🏛️ **${topResult.title}**\n\n`;
      response += `**Scheme Highlights:**\n`;
      response += `• ${topResult.description}\n`;
      response += `• Category: ${topResult.category}\n`;
      response += `• [🔗 Learn More](${topResult.url})\n\n`;
    } else if (topResult.type === 'blog') {
      response += `📝 **${topResult.title}**\n\n`;
      response += `**Quick Summary:**\n`;
      response += `• ${topResult.description}\n`;
      response += `• Category: ${topResult.category}\n`;
      response += `• [🔗 Read Full Article](${topResult.url})\n\n`;
    } else if (topResult.type === 'crypto') {
      response += `₿ **${topResult.title}**\n\n`;
      response += `**Key Points:**\n`;
      response += `• ${topResult.description}\n`;
      response += `• Category: ${topResult.category}\n`;
      response += `• [🔗 Read Full Guide](${topResult.url})\n\n`;
    }

    if (results.length > 1) {
      response += `**💡 Related Resources:**\n`;
      results.slice(1, 4).forEach((result, index) => {
        const icon = result.type === 'calculator' ? '📊' : 
                    result.type === 'excel-tool' ? '📈' : 
                    result.type === 'government-scheme' ? '🏛️' :
                    result.type === 'blog' ? '📝' : '₿';
        const action = result.type === 'calculator' ? 'Try' :
                      result.type === 'excel-tool' ? 'Download' :
                      result.type === 'government-scheme' ? 'Learn' :
                      result.type === 'blog' ? 'Read' : 'Explore';
        response += `${index + 1}. ${icon} **${result.title}**\n   [🔗 ${action}](${result.url})\n\n`;
      });
    }

    return response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate processing time
    setTimeout(() => {
      const results = searchData(inputValue);
      const botResponse = generateResponse(inputValue, results);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-2xl mx-auto">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Financial Assistant</h3>
            <p className="text-green-100 text-sm">Ask me about calculators, tools, and schemes</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">
                {message.type === 'bot' ? (
                  <div className="space-y-2">
                    {message.content.split('\n').map((line, index) => {
                      if (line.includes('[🔗')) {
                        // Handle clickable links
                        const linkMatch = line.match(/\[🔗 ([^\]]+)\]\(([^)]+)\)/);
                        if (linkMatch) {
                          const [, linkText, url] = linkMatch;
                          return (
                            <div key={index} className="flex items-center space-x-2">
                              <span>{line.replace(/\[🔗 [^\]]+\]\([^)]+\)/, '')}</span>
                              <button
                                onClick={() => window.open(url, '_blank')}
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                              >
                                🔗 {linkText}
                              </button>
                            </div>
                          );
                        }
                      }
                      return <div key={index}>{line}</div>;
                    })}
                  </div>
                ) : (
                  message.content
                )}
              </div>
              <div className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-green-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600">Searching...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about EMI calculator, budget tools, government schemes..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        {/* Quick Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {['EMI Calculator', 'Budget Template', 'PPF Scheme', 'Tax Calculator', 'Crypto Regulation', 'Mutual Funds'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceChat; 