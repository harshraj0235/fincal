import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, ArrowUp, Clock, ExternalLink, Menu, X, MessageSquare, IndianRupee, TrendingUp, BookOpen, Landmark, Newspaper, ChevronRight, Zap, Shield, BarChart3, Wallet, PiggyBank, CreditCard, Building2, GraduationCap, Heart, Globe2, LinkIcon, Copy, Check, Mic, MicOff, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEOHelmet from '../components/SEOHelmet';
import MiniSIP from '../components/MiniSIP';
import MiniEMI from '../components/MiniEMI';
import { discoverMetadata as discoverArticles } from '../data/discover/metadata';
import { calculatorCategories } from '../data/calculatorData';
import { resourcesList, toolsList } from '../data/homeSearchData';

import { streamGeminiResponse, ContentItem, SourceLink, CoreChatMessage } from '../lib/llmEngine';
import StockWidget from '../components/StockWidget';
import ChartWidget from '../components/ChartWidget';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: ContentItem[];
  sources?: SourceLink[];
  calculatorType?: 'sip' | 'emi';
  followUpQuestions?: string[];
  isStreaming?: boolean;
  timestamp: Date;
};

// ───────────────────────────────────────────────────────
// Shuffled suggestion prompts
// ───────────────────────────────────────────────────────
const allPrompts = [
  { icon: <IndianRupee className="w-4 h-4" />, label: '₹50 लाख Home Loan की EMI कितनी होगी?', color: 'text-blue-600' },
  { icon: <TrendingUp className="w-4 h-4" />, label: '₹10,000 SIP 20 साल में कितना बनेगा?', color: 'text-emerald-600' },
  { icon: <Landmark className="w-4 h-4" />, label: 'Old vs New Tax Regime — कौन सा बेहतर?', color: 'text-red-600' },
  { icon: <BookOpen className="w-4 h-4" />, label: 'Section 80C में कैसे ₹1.5 lakh बचाएं?', color: 'text-amber-600' },
  { icon: <PiggyBank className="w-4 h-4" />, label: 'PPF vs FD — कहाँ invest करना बेहतर?', color: 'text-teal-600' },
  { icon: <BarChart3 className="w-4 h-4" />, label: 'Mutual Fund शुरुआत से कैसे सीखें?', color: 'text-purple-600' },
  { icon: <Wallet className="w-4 h-4" />, label: 'Gold में invest करने का सबसे अच्छा तरीका?', color: 'text-yellow-600' },
  { icon: <Shield className="w-4 h-4" />, label: 'Term Insurance कितना cover लेना चाहिए?', color: 'text-indigo-600' },
  { icon: <CreditCard className="w-4 h-4" />, label: 'CIBIL Score कैसे 750+ करें?', color: 'text-pink-600' },
  { icon: <Building2 className="w-4 h-4" />, label: 'NPS में invest करना चाहिए या नहीं?', color: 'text-orange-600' },
  { icon: <GraduationCap className="w-4 h-4" />, label: 'Education Loan कैसे मिलेगा step by step?', color: 'text-sky-600' },
  { icon: <Heart className="w-4 h-4" />, label: '₹25,000 salary में कैसे invest करें?', color: 'text-rose-600' },
  { icon: <Zap className="w-4 h-4" />, label: 'EPF का पैसा कैसे निकालें?', color: 'text-violet-600' },
  { icon: <Newspaper className="w-4 h-4" />, label: 'IPO में apply कैसे करें?', color: 'text-gray-600' },
  { icon: <Landmark className="w-4 h-4" />, label: 'PM Kisan Yojana eligibility कैसे चेक करें?', color: 'text-green-600' },
  { icon: <IndianRupee className="w-4 h-4" />, label: 'Loan prepay करना बेहतर है या invest करना?', color: 'text-cyan-600' },
];

function getShuffledPrompts(count: number) {
  const shuffled = [...allPrompts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ───────────────────────────────────────────────────────
// SEO FAQ
// ───────────────────────────────────────────────────────
const faqItems = [
  { q: 'MoneyCal क्या है?', a: 'MoneyCal एक AI-powered financial assistant है जो Gemini AI से powered है। यह Indian finance, taxes, investments, और more के बारे में आपके सवालों का जवाब Hinglish में देता है — पूरी तरह free।' },
  { q: 'क्या MoneyCal free है?', a: 'हाँ, यह 100% free है और कोई registration या login ज़रूरी नहीं है। Unlimited questions पूछ सकते हैं।' },
  { q: 'MoneyCal answers कैसे ढूंढता है?', a: 'MoneyCal Gemini 2.0 Flash AI model use करता है, साथ में 200+ calculators, articles, government schemes, IPO data, और market resources में search करके आपके सवाल का best answer ढूंढता है।' },
  { q: 'क्या मेरा financial data safe है?', a: 'बिल्कुल। सब कुछ आपके browser में run होता है। हम कोई personal या financial data store नहीं करते।' },
];

// ───────────────────────────────────────────────────────
// Home Component
// ───────────────────────────────────────────────────────
export const Home: React.FC = () => {
  const pageTitle = 'MoneyCal — Free AI Financial Assistant India 2025-26';
  const pageDescription = 'MoneyCal — Ask anything about EMI, SIP, Income Tax, IPOs, Gold Rates and more. AI-powered financial assistant built for India.';

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const isProcessingRef = useRef(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [thinkingState, setThinkingState] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile] = useState<'beginner' | 'expert'>('beginner');
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [shuffledPrompts] = useState(() => getShuffledPrompts(6));
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasMessages = chatHistory.length > 0;

  // ── Build base content index ──
  const baseContent = useMemo<ContentItem[]>(() => {
    const calcs = calculatorCategories.flatMap((cat) =>
      cat.calculators.map((c) => ({
        id: `calc-${c.id}`, title: c.name, description: c.description,
        category: cat.name, url: `/calculators/${c.id}`,
        keywords: c.keywords.join(' '), type: 'calculator' as const,
      }))
    );
    const tools = toolsList.map((t) => ({
      id: `hub-${t.path}`, title: t.name, description: `${t.count} tools available.`,
      category: 'Tools', url: t.path, keywords: `${t.name} tools`, type: 'hub' as const,
    }));
    const resources = resourcesList.map((r) => ({
      id: `res-${r.path}`, title: r.name, description: `${r.count} resources & guides.`,
      category: 'Resources', url: r.path, keywords: `${r.name} resources`, type: 'page' as const,
    }));
    const nav: ContentItem[] = [
      { id: 'nav-calc', title: 'All Calculators', description: 'Browse every finance calculator.', category: 'Nav', url: '/calculators', keywords: 'all calculators tools', type: 'page' },
      { id: 'nav-blog', title: 'Finance Blog', description: 'Personal finance guides.', category: 'Nav', url: '/blog', keywords: 'blog finance guides', type: 'page' },
      { id: 'nav-news', title: 'Market News', description: 'Daily finance updates.', category: 'Nav', url: '/news', keywords: 'news market', type: 'page' },
      { id: 'nav-ipo', title: 'IPO Dashboard 2026', description: 'Track IPOs with GMP data.', category: 'Nav', url: '/ipo', keywords: 'ipo gmp allotment listing', type: 'page' },
      { id: 'nav-gold', title: 'Gold Rate Today', description: 'Live 22K & 24K gold prices.', category: 'Nav', url: '/gold-rate', keywords: 'gold rate price 22k 24k sona', type: 'page' },
      { id: 'nav-silver', title: 'Silver Rate Today', description: 'Live silver prices.', category: 'Nav', url: '/silver-rate', keywords: 'silver rate chandi', type: 'page' },
      { id: 'nav-discover', title: 'Discover', description: 'Trending stories & viral news.', category: 'Nav', url: '/discover', keywords: 'discover trending viral', type: 'page' },
    ];
    return [...calcs, ...tools, ...resources, ...nav];
  }, []);

  // ── Lazy-load extra content ──
  useEffect(() => {
    let mounted = true;
    Promise.all([
      import('../data/allBlogData'),
      import('../cms-content/contentRegistry'),
      import('../data/governmentSchemesData'),
      import('../data/discover/metadata'),
    ]).then(([blogMod, newsMod, schemeMod, discoverMod]) => {
      if (!mounted) return;
      const blogs: ContentItem[] = (blogMod.allBlogPosts || []).filter(Boolean).map((p: any) => ({
        id: `blog-${p.slug}`, title: p.title, description: p.excerpt || 'Finance article',
        category: p.categories?.[0] || 'Blog', url: `/blog/${p.slug}`,
        keywords: `${p.title} ${(p.categories || []).join(' ')}`, type: 'blog' as const,
      }));
      const news: ContentItem[] = (newsMod.contentRegistry || []).filter(Boolean).map((a: any) => ({
        id: `news-${a.slug}`, title: a.title, description: `Latest: ${a.category}`,
        category: 'News', url: `/news/${a.slug}`,
        keywords: `${a.title} ${a.category}`, type: 'news' as const,
      }));
      const schemes: ContentItem[] = (schemeMod.governmentSchemes || []).filter(Boolean).map((s: any) => ({
        id: `scheme-${s.slug}`, title: s.title, description: s.excerpt,
        category: s.category || 'Schemes', url: `/government-schemes/${s.slug}`,
        keywords: `${s.title} ${s.category}`, type: 'scheme' as const,
      }));
      const discovers: ContentItem[] = (discoverMod.discoverMetadata || []).filter(Boolean).map((d: any) => ({
        id: `disc-${d.slug}`, title: d.title, description: d.snippet || 'Discover',
        category: 'Discover', url: `/discover/${d.slug}`,
        keywords: `${d.title} discover trending`, type: 'discover' as const,
      }));
      setAllContent([...baseContent, ...blogs, ...news, ...schemes, ...discovers]);
      setContentLoaded(true);
    });
    return () => { mounted = false; };
  }, [baseContent]);

  const contentIndex = contentLoaded ? allContent : baseContent;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, thinkingState]);

  // ── Voice Input Setup ──
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results).map((r: any) => r[0].transcript).join('');
        setInputValue(transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // ── Copy Answer ──
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // ── Streaming submit handler ──
  const processQuery = useCallback(async (query: string, currentHistory: ChatMessage[]) => {
    isProcessingRef.current = true;
    setIsProcessing(true);
    setThinkingState('🔍 MoneyCal knowledge base search कर रहा हूँ...');

    // Create placeholder bot message for streaming
    const botMsgId = `b-${Date.now()}`;
    const botMsg: ChatMessage = {
      id: botMsgId, role: 'assistant', content: '',
      isStreaming: true, timestamp: new Date(),
    };
    setChatHistory(prev => [...prev, botMsg]);

    try {
      const chatHistoryForAPI: CoreChatMessage[] = currentHistory
        .filter(m => !m.isStreaming)
        .map(m => ({ role: m.role, content: m.content }));

      const result = await streamGeminiResponse(
        query,
        contentIndex,
        chatHistoryForAPI,
        userProfile,
        // onChunk — update the streaming message
        (chunk) => {
          setThinkingState(null); // Hide thinking once first chunk arrives
          setChatHistory(prev => prev.map(m =>
            m.id === botMsgId
              ? { ...m, content: m.content + chunk }
              : m
          ));
        },
        // onThinkingUpdate
        (step) => setThinkingState(step)
      );

      // Finalize the message with metadata
      setChatHistory(prev => prev.map(m =>
        m.id === botMsgId
          ? {
              ...m,
              content: result.answer || m.content,
              isStreaming: false,
              recommendations: result.recommendations,
              sources: result.sources,
              calculatorType: result.calculatorType,
              followUpQuestions: result.followUpQuestions,
            }
          : m
      ));
    } catch (err) {
      console.error('Process query error:', err);
      setChatHistory(prev => prev.map(m =>
        m.id === botMsgId
          ? { ...m, content: 'माफ़ कीजिए, कुछ गड़बड़ हो गई। कृपया दोबारा कोशिश करें। 🙏', isStreaming: false }
          : m
      ));
    } finally {
      setThinkingState(null);
      setIsProcessing(false);
      isProcessingRef.current = false;
    }
  }, [contentIndex, userProfile]);

  const handleSubmit = useCallback(() => {
    const query = inputValue.trim();
    if (!query || isProcessingRef.current) return;
    isProcessingRef.current = true;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: query, timestamp: new Date() };
    const updated = [...chatHistory, userMsg];
    setChatHistory(updated);
    processQuery(query, updated);
    setInputValue('');
    // Auto-resize textarea
    if (inputRef.current) inputRef.current.style.height = '48px';
  }, [inputValue, chatHistory, processQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  const handleQuickPrompt = (label: string) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setInputValue('');
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: label, timestamp: new Date() };
    const updated = [...chatHistory, userMsg];
    setChatHistory(updated);
    processQuery(label, updated);
  };

  const handleNewChat = () => { setChatHistory([]); setInputValue(''); setSidebarOpen(false); };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = '48px';
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
  };

  const typeBadgeColor: Record<string, string> = {
    calculator: 'bg-blue-50 text-blue-700 border-blue-200',
    hub: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blog: 'bg-purple-50 text-purple-700 border-purple-200',
    news: 'bg-amber-50 text-amber-700 border-amber-200',
    scheme: 'bg-teal-50 text-teal-700 border-teal-200',
    page: 'bg-slate-50 text-slate-700 border-slate-200',
    discover: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  // Trending discover for sidebar
  const trendingDiscover = discoverArticles.slice(0, 3);

  return (
    <>
      <SEOHelmet
        title={pageTitle}
        description={pageDescription}
        url="/"
        breadcrumbs={[{ name: 'Home', url: '/' }]}
        faqData={faqItems.map(f => ({ question: f.q, answer: f.a }))}
        isFinanceContent={true}
      />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white">

        {/* ── Mobile Sidebar Overlay ── */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col animate-slide-in-left" onClick={e => e.stopPropagation()}>
              <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <button onClick={handleNewChat} className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <Plus className="w-4 h-4" /> नई बातचीत
                </button>
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 px-3 py-4 overflow-y-auto">
                {chatHistory.filter(m => m.role === 'user').length > 0 && (
                  <>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Recent</p>
                    {chatHistory.filter(m => m.role === 'user').slice(-5).reverse().map(m => (
                      <div key={m.id} className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer truncate flex items-center gap-2 mb-0.5">
                        <MessageSquare className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="truncate">{m.content}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Desktop Sidebar ── */}
        <div className="w-[260px] bg-gradient-to-b from-[#fafbfc] to-[#f0f2f5] flex-shrink-0 flex-col hidden md:flex border-r border-gray-200/80">
          <div className="p-4">
            <button onClick={handleNewChat} className="flex items-center gap-3 px-4 py-2.5 w-full bg-white hover:bg-gray-50 rounded-xl transition-all text-sm font-semibold text-gray-800 shadow-sm border border-gray-200/80 hover:shadow">
              <Plus className="w-4 h-4 text-blue-600" />
              नई बातचीत
            </button>
          </div>

          <div className="px-3 flex-1 overflow-y-auto">
            {chatHistory.filter(m => m.role === 'user').length > 0 ? (
              <>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Recent</p>
                {chatHistory.filter(m => m.role === 'user').slice(-8).reverse().map(m => (
                  <div key={m.id} className="px-3 py-2 text-sm text-gray-600 hover:bg-white hover:shadow-sm rounded-lg cursor-pointer truncate flex items-center gap-2 mb-0.5 transition-all">
                    <MessageSquare className="w-3 h-3 text-gray-400 shrink-0" />
                    <span className="truncate">{m.content}</span>
                  </div>
                ))}
              </>
            ) : (
              <div className="px-2 py-8 text-center">
                <p className="text-xs text-gray-400">आपकी बातचीत यहाँ दिखेगी</p>
              </div>
            )}
          </div>

          {/* Trending in sidebar */}
          <div className="px-3 py-3 border-t border-gray-200/80">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Trending
            </p>
            {trendingDiscover.map(article => (
              <Link key={article.id} to={`/discover/${article.slug}`} className="block px-3 py-1.5 text-xs text-gray-500 hover:text-blue-600 hover:bg-white rounded-lg truncate transition-all">
                {article.title}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 flex flex-col h-full w-full bg-white relative">

          {/* Mobile Chat Tools */}
          <div className="md:hidden flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
            <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm transition-colors">
              <Menu className="w-4 h-4" />
              History
            </button>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-full text-[10px] font-bold text-blue-700">
                <Sparkles className="w-3 h-3" /> AI
              </span>
            </div>
            <button onClick={handleNewChat} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>

          {/* Scrollable chat area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto w-full px-4 sm:px-6">

              {/* ── Empty State ── */}
              {!hasMessages && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] pt-8 sm:pt-16">

                  {/* Logo */}
                  <div className="mb-6 sm:mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 mb-5 shadow-lg shadow-blue-500/20">
                      <IndianRupee className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      पैसों की बात, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">MoneyCal</span> के साथ
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
                      EMI, SIP, Tax, IPO, Gold Rate — कोई भी सवाल पूछिए। <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-full text-[10px] font-bold text-blue-700"><Sparkles className="w-3 h-3" /> AI</span> powered, 200+ tools।
                    </p>
                  </div>

                  {/* Suggestion chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl mb-10">
                    {shuffledPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickPrompt(prompt.label)}
                        className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 hover:border-blue-200 transition-all text-left group shadow-sm hover:shadow"
                      >
                        <span className={`${prompt.color} group-hover:scale-110 transition-transform`}>{prompt.icon}</span>
                        <span className="truncate font-medium">{prompt.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Discover Articles — for SEO freshness */}
                  <div className="w-full max-w-xl">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" /> Trending Stories
                      </p>
                      <Link to="/discover" className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5">
                        सभी देखें <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {discoverArticles.slice(0, 4).map(article => (
                        <Link
                          key={article.id}
                          to={`/discover/${article.slug}`}
                          className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-teal-50/50 hover:border-blue-200 transition-all group shadow-sm hover:shadow"
                        >
                          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-1.5">{article.title}</h3>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(article.date).toLocaleDateString('hi-IN', { month: 'short', day: 'numeric' })}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Chat Messages ── */}
              {hasMessages && (
                <div className="py-6 space-y-8">
                  {chatHistory.map((msg) => (
                    <div key={msg.id}>
                      {msg.role === 'user' ? (
                        <div className="flex justify-end">
                          <div className="bg-gradient-to-br from-blue-600 to-teal-500 text-white px-5 py-3 rounded-3xl rounded-br-lg max-w-[85%] sm:max-w-[75%] shadow-md shadow-blue-500/10">
                            <p className="text-sm sm:text-base leading-relaxed">{msg.content}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="bg-gradient-to-br from-blue-600 to-teal-500 text-white p-2.5 rounded-xl shadow-md shadow-blue-500/20 mt-0.5 shrink-0">
                            <IndianRupee className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">MoneyCal</p>
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-full text-[9px] font-bold text-blue-600">
                                <Sparkles className="w-2.5 h-2.5" /> AI
                              </span>
                            </div>
                            <div className="text-sm sm:text-[15px] text-gray-800 leading-[1.8]">
                              <div className="prose prose-sm md:prose-base max-w-none prose-blue prose-headings:text-gray-900 prose-strong:text-gray-900 prose-a:text-blue-600 prose-table:text-sm">
                                <ReactMarkdown 
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    code({ node, inline, className, children, ...props }: any) {
                                      const match = /language-(\w+)/.exec(className || '');
                                      const lang = match ? match[1] : '';
                                      const content = String(children).replace(/\n$/, '');

                                      if (!inline && lang === 'stock') {
                                        return <StockWidget ticker={content.trim()} />;
                                      }
                                      if (!inline && lang === 'chart') {
                                        return <ChartWidget payloadStr={content.trim()} />;
                                      }
                                      
                                      return !inline ? (
                                        <pre className="bg-gray-800 text-gray-100 rounded-xl p-4 overflow-x-auto text-sm my-4 border border-gray-700 shadow-md">
                                          <code className={className} {...props}>{children}</code>
                                        </pre>
                                      ) : (
                                        <code className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md text-sm border border-blue-100 font-mono" {...props}>
                                          {children}
                                        </code>
                                      );
                                    },
                                    img({ src, alt, ...props }: any) {
                                      return (
                                        <span className="block my-5 overflow-hidden rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
                                          <img src={src} alt={alt} className="w-full h-auto object-cover" loading="lazy" {...props} />
                                          {alt && <span className="block p-2.5 text-center text-xs font-medium text-gray-500 bg-gray-50 border-t border-gray-100">{alt}</span>}
                                        </span>
                                      );
                                    }
                                  }}
                                >
                                  {msg.content}
                                </ReactMarkdown>
                              </div>
                              {msg.isStreaming && (
                                <span className="inline-block w-2 h-5 bg-blue-500 animate-pulse ml-0.5 align-middle rounded-sm" />
                              )}
                              {msg.calculatorType === 'sip' && !msg.isStreaming && <MiniSIP />}
                              {msg.calculatorType === 'emi' && !msg.isStreaming && <MiniEMI />}
                            </div>

                            {/* Action buttons (Copy) */}
                            {!msg.isStreaming && msg.content && (
                              <div className="flex items-center gap-2 mt-3">
                                <button
                                  onClick={() => copyToClipboard(msg.content, msg.id)}
                                  className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                                >
                                  {copiedId === msg.id ? (
                                    <><Check className="w-3 h-3 text-green-500" /> Copied!</>
                                  ) : (
                                    <><Copy className="w-3 h-3" /> Copy</>
                                  )}
                                </button>
                              </div>
                            )}

                            {/* Follow-up Questions */}
                            {!msg.isStreaming && msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                              <div className="mt-4 pt-3 border-t border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                  💡 और जानना चाहते हैं?
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {msg.followUpQuestions.map((q, qi) => (
                                    <button
                                      key={qi}
                                      onClick={() => handleQuickPrompt(q)}
                                      disabled={isProcessing}
                                      className="px-3 py-1.5 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all disabled:opacity-50"
                                    >
                                      {q}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Source Citations */}
                            {!msg.isStreaming && msg.sources && msg.sources.length > 0 && (
                              <div className="mt-4 pt-3 border-t border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                  <Globe2 className="w-3 h-3" /> Sources
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {msg.sources.map((src, si) => (
                                    <a
                                      key={si}
                                      href={src.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg text-[11px] text-gray-500 hover:text-blue-600 transition-all"
                                    >
                                      <LinkIcon className="w-3 h-3" />
                                      <span className="font-medium">{src.domain}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Recommended Tools & Articles */}
                            {!msg.isStreaming && msg.recommendations && msg.recommendations.length > 0 && (
                              <div className="mt-4 pt-3 border-t border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">🔗 सम्बंधित Tools</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {msg.recommendations.map(rec => (
                                    <button
                                      key={rec.id}
                                      onClick={() => navigate(rec.url)}
                                      className="flex items-center gap-3 px-3 py-2.5 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 border border-gray-200 hover:border-blue-200 rounded-xl transition-all text-left group shadow-sm hover:shadow"
                                    >
                                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md border ${typeBadgeColor[rec.type] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                        {rec.type === 'calculator' ? 'CALC' : rec.type === 'discover' ? 'NEW' : rec.type.toUpperCase()}
                                      </span>
                                      <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-blue-700 truncate">{rec.title}</span>
                                      <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-blue-500 shrink-0" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Thinking state */}
                  {thinkingState !== null && (
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-gradient-to-br from-blue-600 to-teal-500 text-white p-2.5 rounded-xl shadow-md shadow-blue-500/20 mt-0.5 shrink-0">
                        <IndianRupee className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-3 py-3">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-xs text-gray-400 ml-1">{thinkingState}</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* ── Bottom Input Bar ── */}
          <div className="w-full px-4 pb-4 sm:px-6 sm:pb-6 bg-transparent flex-shrink-0 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="p-[3px] rounded-[1.75rem] bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 focus-within:from-blue-600 focus-within:via-fuchsia-500 focus-within:to-teal-400 transition-all duration-500 shadow-[0_8px_30px_rgba(168,85,247,0.25)] focus-within:shadow-[0_0_40px_rgba(59,130,246,0.4)] animate-gradient-x">
                <div className="relative flex items-end bg-gradient-to-br from-white/95 to-blue-50/90 backdrop-blur-2xl rounded-3xl transition-all pointer-events-auto overflow-hidden">
                  {/* Subtle inner colorful glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-teal-400/10 pointer-events-none"></div>
                  
                  <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="पूछिए कुछ भी... EMI, SIP, Tax, IPO, Gold 🇮🇳"
                  rows={1}
                  className="flex-1 bg-transparent relative z-10 resize-none px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-900 placeholder:text-gray-500 focus:outline-none max-h-32 leading-relaxed"
                  style={{ minHeight: '56px' }}
                />
                <div className="flex items-center gap-1.5 pr-2 sm:pr-3 pb-2 sm:pb-3 relative z-10">
                  {/* Voice Input Button */}
                  {recognitionRef.current && (
                    <button
                      onClick={toggleVoiceInput}
                      className={`p-2.5 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-sm ${
                        isListening
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse shadow-lg shadow-red-500/40'
                          : 'bg-white hover:bg-gradient-to-br hover:from-purple-100 hover:to-blue-100 text-purple-500 hover:text-purple-700 border border-purple-100'
                      }`}
                      title="Voice Input (Hindi)"
                    >
                      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                  )}
                  {/* Send Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={!inputValue.trim() || isProcessing}
                    className={`p-3 rounded-2xl transition-all duration-300 flex items-center justify-center border border-white/20 ${
                      inputValue.trim() && !isProcessing
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:via-indigo-500 hover:to-teal-400 text-white shadow-[0_4px_15px_rgba(59,130,246,0.5)] transform hover:-translate-y-0.5'
                        : 'bg-gradient-to-br from-blue-200 to-purple-200 text-white shadow-sm'
                    }`}
                  >
                    <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
              </div>
              <p className="text-center text-[10px] sm:text-[11px] text-gray-400 mt-3 pointer-events-auto drop-shadow-sm">
                MoneyCal — <span className="inline-flex items-center gap-0.5"><Sparkles className="w-3 h-3" /> AI</span> powered · 200+ tools · Hinglish
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
