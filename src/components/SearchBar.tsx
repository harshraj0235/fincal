import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, IndianRupee, FileText, Globe, Landmark, Newspaper, Search, Shield, X, Sparkles, Plus, Mic, ArrowUp } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { resourcesList, toolsList } from '../data/homeSearchData';

interface SearchBarProps {
  variant?: 'default' | 'compact' | 'hero';
  onClose?: () => void;
  dropdownMode?: 'overlay' | 'inline';
  onSearchStateChange?: (isSearching: boolean) => void;
}

type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  keywords: string;
  type: 'calculator' | 'hub' | 'blog' | 'news' | 'scheme' | 'page' | 'discover';
};

const typeBadgeClasses: Record<SearchItem['type'], string> = {
  calculator: 'bg-blue-50 text-blue-700',
  hub: 'bg-emerald-50 text-emerald-700',
  blog: 'bg-purple-50 text-purple-700',
  news: 'bg-amber-50 text-amber-700',
  scheme: 'bg-teal-50 text-teal-700',
  page: 'bg-slate-100 text-slate-700',
  discover: 'bg-indigo-50 text-indigo-700',
};

const typeIcon: Record<SearchItem['type'], JSX.Element> = {
  calculator: <IndianRupee className="h-5 w-5" />,
  hub: <Globe className="h-5 w-5" />,
  blog: <BookOpen className="h-5 w-5" />,
  news: <Newspaper className="h-5 w-5" />,
  scheme: <Landmark className="h-5 w-5" />,
  page: <Shield className="h-5 w-5" />,
  discover: <Sparkles className="h-5 w-5" />,
};

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, 15);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <span>
      {displayedText}
      {isTyping && <span className="animate-pulse ml-0.5 inline-block w-1.5 h-4 bg-blue-600 align-middle"></span>}
    </span>
  );
};

export const SearchBar: React.FC<SearchBarProps> = ({ 
  variant = 'default', 
  onClose, 
  dropdownMode = 'overlay',
  onSearchStateChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [extraItems, setExtraItems] = useState<SearchItem[]>([]);
  const [isLoadingExtras, setIsLoadingExtras] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const baseItems = useMemo<SearchItem[]>(() => {
    const calculatorItems = calculatorCategories.flatMap((category) =>
      category.calculators.map((calc) => ({
        id: `calc-${calc.id}`,
        title: calc.name,
        description: calc.description,
        category: category.name,
        url: `/calculators/${calc.id}`,
        keywords: calc.keywords.join(' '),
        type: 'calculator' as const,
      }))
    );
    const toolHubItems = toolsList.map((tool) => ({
      id: `hub-${tool.path}`,
      title: tool.name,
      description: `${tool.count} tools available in ${tool.name}.`,
      category: 'Tools Hub',
      url: tool.path,
      keywords: `${tool.name} tools hub`,
      type: 'hub' as const,
    }));
    const resourceHubItems = resourcesList.map((resource) => ({
      id: `resource-${resource.path}`,
      title: resource.name,
      description: `${resource.count} resources and guides in ${resource.name}.`,
      category: 'Resources',
      url: resource.path,
      keywords: `${resource.name} resources`,
      type: 'page' as const,
    }));
    const navigationItems: SearchItem[] = [
      {
        id: 'nav-calculators',
        title: 'All Calculators',
        description: 'Browse every finance Calculator and tool.',
        category: 'Navigation',
        url: '/calculators',
        keywords: 'all calculators tools',
        type: 'page',
      },
      {
        id: 'nav-blog',
        title: 'Finance Blog',
        description: 'Actionable personal finance guides and explainers.',
        category: 'Navigation',
        url: '/blog',
        keywords: 'blog finance guides',
        type: 'page',
      },
      {
        id: 'nav-news',
        title: 'Market News',
        description: 'Daily finance and market news updates.',
        category: 'Navigation',
        url: '/news',
        keywords: 'news market economy',
        type: 'page',
      },
      {
        id: 'nav-ipo',
        title: 'IPO Dashboard 2026',
        description: 'Track upcoming, current, and past IPOs with GMP and allotment status.',
        category: 'Navigation',
        url: '/ipo',
        keywords: 'ipo gmp allotment listing initial public offering',
        type: 'page',
      },
      {
        id: 'nav-learn',
        title: 'Learn Finance',
        description: 'Free masterclasses and courses to build your financial knowledge.',
        category: 'Navigation',
        url: '/learn',
        keywords: 'learn education masterclass course',
        type: 'page',
      },
      {
        id: 'nav-gold',
        title: 'Gold Rate Today',
        description: 'Live 22K and 24K gold rates across major Indian cities.',
        category: 'Navigation',
        url: '/gold-rate',
        keywords: 'gold rate price 22k 24k today',
        type: 'page',
      },
      {
        id: 'nav-silver',
        title: 'Silver Rate Today',
        description: 'Live silver rates across major Indian cities.',
        category: 'Navigation',
        url: '/silver-rate',
        keywords: 'silver rate price today',
        type: 'page',
      },
      {
        id: 'nav-games',
        title: 'Finance Games',
        description: 'Play fun games to test your financial knowledge and reflexes.',
        category: 'Navigation',
        url: '/games',
        keywords: 'games fun play quiz',
        type: 'page',
      },
      {
        id: 'nav-discover',
        title: 'Discover',
        description: 'Trending stories, viral news, and social media buzz.',
        category: 'Navigation',
        url: '/discover',
        keywords: 'discover trending viral social media',
        type: 'page',
      },
    ];
    return [...calculatorItems, ...toolHubItems, ...resourceHubItems, ...navigationItems];
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length < 2 || extraItems.length > 0) return;
    let mounted = true;
    setIsLoadingExtras(true);
    Promise.all([
      import('../data/allBlogData'),
      import('../cms-content/contentRegistry'),
      import('../data/governmentSchemesData'),
      import('../data/discover/metadata')
    ])
      .then(([blogModule, newsModule, schemeModule, discoverModule]) => {
        if (!mounted) return;
        const blogItems: SearchItem[] = (blogModule.allBlogPosts || []).filter(Boolean).map((post: any) => ({
          id: `blog-${post.slug}`,
          title: post.title,
          description: post.excerpt || 'Finance blog article',
          category: post.categories?.[0] || 'Blog',
          url: `/blog/${post.slug}`,
          keywords: `${post.title} ${(post.categories || []).join(' ')}`,
          type: 'blog',
        }));
        const newsItems: SearchItem[] = (newsModule.contentRegistry || []).filter(Boolean).map((article: any) => ({
          id: `news-${article.slug}`,
          title: article.title,
          description: `Latest update in ${article.category}`,
          category: `News · ${article.category}`,
          url: `/news/${article.slug}`,
          keywords: `${article.title} ${article.category}`,
          type: 'news',
        }));
        const schemeItems: SearchItem[] = (schemeModule.governmentSchemes || []).filter(Boolean).map((scheme: any) => ({
          id: `scheme-${scheme.slug}`,
          title: scheme.title,
          description: scheme.excerpt,
          category: scheme.category || 'Government Schemes',
          url: `/government-schemes/${scheme.slug}`,
          keywords: `${scheme.title} ${scheme.category}`,
          type: 'scheme',
        }));
        const discoverItems: SearchItem[] = (discoverModule.discoverMetadata || []).filter(Boolean).map((article: any) => ({
          id: `discover-${article.slug}`,
          title: article.title,
          description: article.snippet || 'Discover article',
          category: 'Discover',
          url: `/discover/${article.slug}`,
          keywords: `${article.title} discover news trending`,
          type: 'discover',
        }));
        setExtraItems([...blogItems, ...newsItems, ...schemeItems, ...discoverItems]);
      })
      .finally(() => {
        if (mounted) setIsLoadingExtras(false);
      });
    return () => {
      mounted = false;
    };
  }, [searchTerm, extraItems.length]);

  // Notify parent of search state changes
  useEffect(() => {
    if (onSearchStateChange) {
      onSearchStateChange(searchTerm.trim().length > 0);
    }
  }, [searchTerm, onSearchStateChange]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.trim().toLowerCase();
    const allItems = [...baseItems, ...extraItems];
    const scored = allItems
      .map((item) => {
        const titleMatch = item.title.toLowerCase();
        const descMatch = item.description.toLowerCase();
        const keywordMatch = item.keywords.toLowerCase();
        let score = 0;
        if (titleMatch.startsWith(query)) score += 4;
        if (titleMatch.includes(query)) score += 3;
        if (keywordMatch.includes(query)) score += 2;
        if (descMatch.includes(query)) score += 1;
        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    const unique = new Map<string, SearchItem>();
    scored.forEach(({ item }) => {
      if (!unique.has(item.url)) {
        unique.set(item.url, item);
      }
    });
    return Array.from(unique.values()).slice(0, 12);
  }, [searchTerm, baseItems, extraItems]);

  const handleSelect = (item: SearchItem) => {
    navigate(item.url);
    setSearchTerm('');
    if (onClose) onClose();
  };

  const inputClasses =
    variant === 'hero'
      ? 'w-full rounded-[2rem] border border-gray-200 bg-[#f4f4f4] pl-12 pr-24 py-3.5 text-base text-gray-900 shadow-sm focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100 focus:outline-none transition-all placeholder:text-gray-500'
      : variant === 'compact'
      ? 'w-full rounded-full border border-slate-200 bg-slate-50 px-10 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none'
      : 'w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-base text-slate-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none';

  const resultsWrapperClasses =
    dropdownMode === 'overlay'
      ? 'absolute left-0 right-0 mt-3 z-50'
      : 'mt-4';

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) acc[result.type] = [];
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  const typeOrder = ['calculator', 'scheme', 'discover', 'hub', 'news', 'blog', 'page'];

  // Determine if we should show the AI Quick Answer
  // The user requested that we ALWAYS show the Finance GPT response for any query
  const topResult = results[0];
  const showQuickAnswer = !!topResult && searchTerm.trim().length >= 2;

  return (
    <div className={`w-full ${dropdownMode === 'overlay' ? 'relative' : 'flex flex-col-reverse'}`}>
      <div className={`relative ${dropdownMode === 'inline' && searchTerm ? 'mt-4 sticky bottom-4 z-20' : ''}`}>
        <div className={`absolute inset-y-0 left-0 ${variant === 'compact' ? 'pl-3' : variant === 'hero' ? 'pl-4' : 'pl-4'} flex items-center pointer-events-none`}>
          {variant === 'hero' ? (
            <div className="bg-white rounded-full p-1.5 shadow-sm border border-gray-200 text-gray-600">
               <Plus className="h-4 w-4" />
            </div>
          ) : (
            <Search className={variant === 'compact' ? 'h-4 w-4 text-slate-400' : 'h-5 w-5 text-slate-400'} />
          )}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={variant === 'hero' ? "Ask anything" : "Search tools, articles, guides..."}
          className={inputClasses}
          aria-label="Search MoneyCal site"
        />
        
        {/* Right side icons */}
        <div className={`absolute inset-y-0 right-0 ${variant === 'compact' ? 'pr-3' : variant === 'hero' ? 'pr-3' : 'pr-4'} flex items-center gap-2`}>
          {variant === 'hero' && !searchTerm && (
            <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
              <Mic className="h-5 w-5" />
            </button>
          )}
          {searchTerm && (
            <>
              {variant !== 'hero' && (
                <button
                  className="flex items-center"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  <X className={variant === 'compact' ? 'h-4 w-4 text-slate-400' : 'h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors'} />
                </button>
              )}
              {variant === 'hero' && (
                <button className="bg-black hover:bg-gray-800 text-white p-2 rounded-full shadow-sm transition-colors flex items-center justify-center">
                  <ArrowUp className="h-5 w-5" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {searchTerm && (
        <div className={`${resultsWrapperClasses} ${dropdownMode === 'inline' ? 'mb-8' : 'rounded-2xl border border-slate-200 bg-white shadow-xl'}`}>
          {dropdownMode !== 'inline' && (
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Search className="h-4 w-4 text-slate-400" />
                Search results from the MoneyCal library
              </div>
              {isLoadingExtras && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Loading more results...
                </div>
              )}
            </div>
          )}
          {results.length > 0 ? (
            <div className={dropdownMode === 'inline' ? 'space-y-8 animate-fade-in-up' : 'max-h-[70vh] overflow-y-auto p-2 sm:p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200'}>
              
              {/* MoneyCal AI Quick Answer (ChatGPT Style) */}
              {showQuickAnswer && (
                <div className="mx-2 mb-8 flex flex-col gap-4">
                  {/* User Message Bubble */}
                  <div className="flex justify-end">
                    <div className="bg-gray-100 text-gray-800 px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm border border-gray-200">
                      <p className="text-sm font-medium">{searchTerm}</p>
                    </div>
                  </div>
                  
                  {/* AI Message Bubble */}
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white p-2 rounded-full shadow-md mt-1 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="bg-white border border-blue-100 shadow-sm rounded-2xl p-4 sm:p-5 flex-1 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Sparkles className="w-32 h-32 text-blue-600" />
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                          Finance GPT
                        </h4>
                        
                        <div className="prose prose-sm max-w-none text-gray-700 mb-5 leading-relaxed font-medium">
                           <TypewriterText text={topResult.description} />
                        </div>

                        <div className="border-t border-gray-100 pt-4 mt-4">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Recommended Full Article</p>
                          <button 
                            onClick={() => handleSelect(topResult)}
                            className="w-full sm:w-auto text-left flex items-center justify-between sm:justify-start gap-4 px-4 py-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl transition-all group/btn"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-gray-900 group-hover/btn:text-blue-700 truncate">{topResult.title}</p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">{topResult.url}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover/btn:text-blue-600 shrink-0" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {typeOrder.map(type => {
                const items = groupedResults[type];
                if (!items || items.length === 0) return null;
                const sectionTitle = type === 'calculator' ? '🧮 Calculators & Tools' :
                                     type === 'scheme' ? '🏛️ Government Schemes' :
                                     type === 'discover' ? '✨ Discover' :
                                     type === 'hub' ? '📂 Categories' :
                                     type === 'news' ? '📰 Market News' :
                                     type === 'blog' ? '📝 Articles & Guides' : '📄 Pages';
                return (
                  <div key={type} className="px-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 px-2 border-b border-slate-100 pb-2">{sectionTitle}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {items.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleSelect(result)}
                          className="w-full text-left rounded-2xl border border-transparent hover:border-blue-100 hover:bg-blue-50/50 transition-all p-3 flex gap-3 group"
                        >
                          <div className={`h-10 w-10 shrink-0 rounded-xl bg-white shadow-sm border border-slate-100 text-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform ${typeBadgeClasses[result.type]}`}>
                            {typeIcon[result.type]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block text-sm font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
                              {result.title}
                            </span>
                            <span className="block text-xs font-medium text-slate-500 truncate mt-0.5">
                              {result.category}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={dropdownMode === 'inline' ? 'p-8 text-center text-slate-500' : 'p-8 text-center text-slate-600'}>
              <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-lg font-bold mb-1">No matches found</p>
              <p className="text-sm">We couldn't find anything for "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};