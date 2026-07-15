import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/financeGPT.css';
import SEOHelmet from '../components/SEOHelmet';
import ThinkingPanel from '../components/ThinkingPanel';
import SourceCards from '../components/SourceCards';
import FinanceGPTResponseRenderer from '../components/FinanceGPTResponseRenderer';
import { streamGeminiResponse, ContentItem, SourceLink, CoreChatMessage, LLMResponse, ResearchMode } from '../lib/llmEngine';
import { calculatorCategories } from '../data/calculatorData';
import { discoverMetadata as discoverArticles } from '../data/discover/metadata';
import { Sun, Moon } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceLink[];
  recommendations?: ContentItem[];
  followUpQuestions?: string[];
  isStreaming?: boolean;
}

interface ThinkingStep {
  label: string;
  status: 'pending' | 'active' | 'done';
}

interface SavedChat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}



const RESEARCH_MODES: { id: ResearchMode; icon: string; label: string }[] = [
  { id: 'general', icon: '🧠', label: 'General' },
  { id: 'stocks', icon: '📊', label: 'Stocks' },
  { id: 'tax', icon: '💰', label: 'Tax' },
  { id: 'schemes', icon: '🏦', label: 'Schemes' },
  { id: 'news', icon: '📰', label: 'News' },
];

const SUGGESTED_QUERIES: Record<ResearchMode, string[]> = {
  general: [
    'SIP vs FD — कौन सा बेहतर है?',
    'PPF में कितना interest मिलता है?',
    '₹10,000 monthly invest करने का best plan?',
  ],
  stocks: [
    'Reliance share का latest analysis बताओ',
    'Nifty 50 अभी overvalued है?',
    'Best dividend paying stocks India 2026',
  ],
  tax: [
    'Old vs New Tax Regime — कौन सा चुनें?',
    '₹15 lakh salary पर कितना tax बनता है?',
    'Section 80C में कैसे ₹1.5 lakh बचाएं?',
  ],
  schemes: [
    'PM Kisan Yojana में कैसे apply करें?',
    'Ayushman Bharat card कैसे बनवाएं?',
    'Sukanya Samriddhi Yojana benefits?',
  ],
  news: [
    'आज stock market क्यों गिरा?',
    'RBI ने repo rate पर क्या decision लिया?',
    'Budget 2026 की latest updates?',
  ],
};

const STORAGE_KEY = 'moneycal_chats';

// ─── SEO Data ────────────────────────────────────────────
const SEO_TITLE = 'MoneyCal — Free AI Financial Calculator & Assistant India 2025-26 | SIP, EMI, Tax Calculator';
const SEO_DESCRIPTION = 'MoneyCal — India\'s #1 free AI financial assistant. SIP calculator, EMI calculator, income tax calculator 2025-26, gold rate today, IPO GMP, mutual fund returns, PPF, NPS — सब कुछ एक जगह। 200+ financial tools with AI-powered answers in Hindi & English.';
const SEO_KEYWORDS = 'SIP calculator, EMI calculator, income tax calculator 2025-26, mutual fund calculator, gold rate today, silver rate today, IPO GMP 2026, PPF calculator, NPS calculator, home loan EMI calculator, car loan EMI calculator, FD calculator, RD calculator, gratuity calculator, HRA calculator, lumpsum calculator, CAGR calculator, step up SIP calculator, retirement planning calculator, SWP calculator, loan prepayment calculator, TDS calculator, GST calculator, financial calculator India, MoneyCal, AI financial assistant India, एसआईपी कैलकुलेटर, ईएमआई कैलकुलेटर, इनकम टैक्स कैलकुलेटर, म्यूचुअल फंड कैलकुलेटर, होम लोन कैलकुलेटर, गोल्ड रेट आज, new vs old tax regime calculator, salary tax calculator India, SIP vs FD comparison, best SIP plan 2026, free financial tools India';

const FAQ_DATA = [
  { question: 'MoneyCal क्या है?', answer: 'MoneyCal एक AI-powered financial assistant है जो Gemini AI से powered है। यह Indian finance, taxes, investments, SIP, EMI, gold rate, IPO और more के बारे में आपके सवालों का जवाब Hinglish में देता है — पूरी तरह free।' },
  { question: 'MoneyCal free है?', answer: 'हाँ, MoneyCal 100% free है। कोई registration, login या payment ज़रूरी नहीं है। Unlimited questions पूछ सकते हैं और 200+ financial calculators use कर सकते हैं।' },
  { question: 'SIP calculator कैसे use करें?', answer: 'MoneyCal का SIP calculator बिल्कुल free है। बस monthly investment amount, expected return rate और time period डालें — तुरंत total returns, wealth gained और maturity amount पता चल जाएगा।' },
  { question: 'Income Tax Calculator 2025-26 कैसे काम करता है?', answer: 'MoneyCal का Income Tax Calculator new और old दोनों tax regimes support करता है। Salary, deductions (80C, 80D, HRA), और exemptions डालकर तुरंत tax liability calculate कर सकते हैं।' },
  { question: 'EMI calculator से Home Loan EMI कैसे निकालें?', answer: 'Loan amount, interest rate और tenure डालें — MoneyCal तुरंत monthly EMI, total interest payable और amortization schedule दिखाएगा। Home loan, car loan, personal loan सभी के लिए काम करता है।' },
  { question: 'Gold Rate Today कैसे check करें?', answer: 'MoneyCal पर live gold rate (22K और 24K) और silver rate हर शहर के लिए available है। Daily updated prices with historical charts भी देख सकते हैं।' },
  { question: 'IPO GMP कैसे check करें?', answer: 'MoneyCal का IPO Dashboard में latest IPO Grey Market Premium (GMP), subscription status, allotment date, listing date और expected listing gains — सब कुछ एक जगह मिलता है।' },
  { question: 'क्या MoneyCal का data safe है?', answer: 'बिल्कुल safe है। सब कुछ आपके browser में run होता है। MoneyCal कोई personal या financial data store नहीं करता। Privacy-first approach follow करते हैं।' },
];

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'MoneyCal',
  'alternateName': ['MoneyCal.in', 'MoneyCal Financial Calculator', 'MoneyCal AI'],
  'url': 'https://moneycal.in',
  'description': SEO_DESCRIPTION,
  'applicationCategory': 'FinanceApplication',
  'operatingSystem': 'Web Browser',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'INR',
  },
  'featureList': [
    'SIP Calculator', 'EMI Calculator', 'Income Tax Calculator 2025-26',
    'Mutual Fund Calculator', 'Gold Rate Today', 'Silver Rate Today',
    'IPO Dashboard with GMP', 'PPF Calculator', 'NPS Calculator',
    'FD Calculator', 'RD Calculator', 'Home Loan EMI Calculator',
    'Car Loan EMI Calculator', 'Gratuity Calculator', 'HRA Calculator',
    'Step-up SIP Calculator', 'CAGR Calculator', 'Retirement Planning',
    'AI Financial Assistant', '200+ Financial Tools',
  ],
  'inLanguage': ['hi', 'en'],
  'isAccessibleForFree': true,
  'creator': {
    '@type': 'Organization',
    'name': 'MoneyCal',
    'url': 'https://moneycal.in',
  },
};

// ─── LocalStorage Helpers ────────────────────────────────
function loadChats(): SavedChat[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveChats(chats: SavedChat[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats.slice(0, 50))); // Keep max 50 chats
  } catch { /* quota exceeded, ignore */ }
}

function generateChatTitle(messages: ChatMessage[]): string {
  const firstUserMsg = messages.find(m => m.role === 'user');
  if (!firstUserMsg) return 'नई बातचीत';
  return firstUserMsg.content.slice(0, 50) + (firstUserMsg.content.length > 50 ? '...' : '');
}

// ─── Build Content Index ─────────────────────────────────
function buildContentIndex(): ContentItem[] {
  const items: ContentItem[] = [];
  calculatorCategories.forEach((cat) => {
    cat.calculators.forEach((calc) => {
      items.push({
        id: calc.id,
        title: calc.name,
        description: calc.description || '',
        category: cat.name,
        url: `/tools/${calc.id}`,
        keywords: `${calc.name} ${cat.name}`,
        type: 'calculator',
      });
    });
  });
  return items;
}

// ─── Main Component ──────────────────────────────────────
const FinanceGPT: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [researchMode, setResearchMode] = useState<ResearchMode>('general');
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([]);
  const [showThinking, setShowThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState<CoreChatMessage[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; text: string } | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const contentIndexRef = useRef<ContentItem[]>([]);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('moneycal_dark_mode') === 'true';
  });

  // Handle dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('moneycal_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('moneycal_dark_mode', 'false');
    }
  }, [isDarkMode]);

  // Load saved chats from localStorage
  useEffect(() => {
    contentIndexRef.current = buildContentIndex();
    setSavedChats(loadChats());
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinkingSteps]);

  // Save current chat to localStorage whenever messages change
  useEffect(() => {
    if (messages.length === 0 || messages.some(m => m.isStreaming)) return;
    
    setSavedChats(prev => {
      let updated: SavedChat[];
      if (activeChatId) {
        updated = prev.map(c => 
          c.id === activeChatId 
            ? { ...c, messages, title: generateChatTitle(messages), updatedAt: new Date().toISOString() }
            : c
        );
      } else {
        const newId = `chat-${Date.now()}`;
        setActiveChatId(newId);
        updated = [{
          id: newId,
          title: generateChatTitle(messages),
          messages,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }, ...prev];
      }
      saveChats(updated);
      return updated;
    });
  }, [messages.filter(m => !m.isStreaming).length]); // Only trigger on non-streaming msg count change

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
    setShowSuggestions(e.target.value.length > 0);
  };

  // ─── Voice Input (Web Speech API) ──────────────────────
  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setInput(transcript);
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 160) + 'px';
      }
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  // ─── File Upload Handler ───────────────────────────────
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      let text = '';
      if (file.type === 'text/plain' || file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        text = await file.text();
      } else if (file.type === 'application/json' || file.name.endsWith('.json')) {
        text = await file.text();
      } else if (file.type.startsWith('image/')) {
        text = `[User uploaded an image: ${file.name}. Please describe and analyze this image.]`;
      } else if (file.type === 'application/pdf') {
        text = `[User uploaded a PDF: ${file.name}. Extract and analyze the content.]`;
      } else {
        text = await file.text();
      }
      const truncated = text.substring(0, 8000);
      setUploadedFile({ name: file.name, text: truncated });
    } catch {
      alert('Could not read this file. Try a TXT, CSV, or JSON file.');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ─── Computed Suggestions ──────────────────────────────
  const filteredSuggestions = React.useMemo(() => {
    if (!input.trim()) return [];
    const q = input.toLowerCase();
    const allSuggestions = [
      ...SUGGESTED_QUERIES[researchMode],
      ...Object.values(SUGGESTED_QUERIES).flat(),
      ...contentIndexRef.current.map(c => c.title),
    ];
    const unique = [...new Set(allSuggestions)].filter(Boolean);
    return unique.filter(s => s && s.toLowerCase().includes(q)).slice(0, 6);
  }, [input, researchMode]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ─── New Chat ────────────────────────────────────────────
  const handleNewChat = () => {
    window.location.reload();
  };

  // ─── Load Saved Chat ────────────────────────────────────
  const handleLoadChat = (chat: SavedChat) => {
    setMessages(chat.messages);
    setActiveChatId(chat.id);
    setChatHistory(
      chat.messages
        .filter(m => !m.isStreaming)
        .map(m => ({ role: m.role, content: m.content }))
        .slice(-10)
    );
    setSidebarOpen(false);
    setShowThinking(false);
  };

  // ─── Delete Chat ─────────────────────────────────────────
  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setSavedChats(prev => {
      const updated = prev.filter(c => c.id !== chatId);
      saveChats(updated);
      return updated;
    });
    if (activeChatId === chatId) {
      // Reset state without reload
      setMessages([]);
      setChatHistory([]);
      setActiveChatId(null);
      setInput('');
      setShowThinking(false);
      setThinkingSteps([]);
    }
  };

  // Handle query submit
  const handleSubmit = useCallback(async (queryOverride?: string) => {
    let query = queryOverride || input.trim();
    if (!query || isLoading) return;

    // If file is uploaded, prepend its content to the query
    if (uploadedFile) {
      query = `[Uploaded Document: ${uploadedFile.name}]\n\n${uploadedFile.text}\n\n--- User's Question ---\n${query}`;
      setUploadedFile(null);
    }

    setInput('');
    setShowSuggestions(false);
    if (inputRef.current) inputRef.current.style.height = 'auto';

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
    };
    setMessages(prev => [...prev, userMsg]);

    const assistantId = (Date.now() + 1).toString();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      isStreaming: true,
    };
    setMessages(prev => [...prev, assistantMsg]);

    setIsLoading(true);
    setShowThinking(true);
    setThinkingSteps([
      { label: '🔍 MoneyCal knowledge base search कर रहा हूँ...', status: 'pending' },
      { label: '🌐 Live Web Search कर रहा हूँ...', status: 'pending' },
      { label: '🧠 आपके सवाल को analyze कर रहा हूँ...', status: 'pending' },
      { label: '✍️ जवाब लिख रहा हूँ...', status: 'pending' },
    ]);

    try {
      let streamedText = '';

      const onThinkingUpdate = (step: string) => {
        setThinkingSteps(prev => {
          const updated = [...prev];
          const activeIdx = updated.findIndex(s => s.status === 'active');
          if (activeIdx >= 0) updated[activeIdx].status = 'done';
          const pendingIdx = updated.findIndex(s => s.status === 'pending');
          if (pendingIdx >= 0) updated[pendingIdx].status = 'active';
          return updated;
        });
      };

      const onChunk = (chunk: string) => {
        streamedText += chunk;
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId ? { ...m, content: streamedText } : m
          )
        );
        setShowThinking(false);
      };

      const result: LLMResponse = await streamGeminiResponse(
        query,
        contentIndexRef.current,
        chatHistory,
        'beginner',
        onChunk,
        onThinkingUpdate,
        researchMode
      );

      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                content: result.answer || streamedText,
                sources: result.sources,
                recommendations: result.recommendations,
                followUpQuestions: result.followUpQuestions,
                isStreaming: false,
              }
            : m
        )
      );

      setChatHistory(prev => [
        ...prev,
        { role: 'user' as const, content: query },
        { role: 'assistant' as const, content: result.answer || streamedText },
      ].slice(-10));

    } catch (error) {
      console.error('FinanceGPT error:', error);
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                content: '😔 माफ करें, अभी AI server से connect करने में दिक्कत हो रही है। कुछ देर बाद फिर से try करें।',
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      setShowThinking(false);
      setThinkingSteps(prev => prev.map(s => ({ ...s, status: 'done' as const })));
    }
  }, [input, isLoading, chatHistory]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const hasMessages = messages.length > 0;

  // Group chats by time
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const todayChats = savedChats.filter(c => new Date(c.updatedAt).toDateString() === today);
  const yesterdayChats = savedChats.filter(c => new Date(c.updatedAt).toDateString() === yesterday);
  const olderChats = savedChats.filter(c => {
    const d = new Date(c.updatedAt).toDateString();
    return d !== today && d !== yesterday;
  });

  // ─── Render Input Area ───
  const renderInputArea = (isBottom: boolean) => (
    <div className={`fgpt-input-area ${isBottom ? 'fgpt-input-area-bottom' : ''}`}>
      <div className="fgpt-input-container" ref={suggestionsRef}>
        {/* Uploaded file badge */}
        {uploadedFile && (
          <div className="fgpt-file-badge">
            <span>📎 {uploadedFile.name}</span>
            <button onClick={() => setUploadedFile(null)} className="fgpt-file-badge-remove">✕</button>
          </div>
        )}

        <div className="fgpt-input-row">
          {/* File upload button */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.csv,.json,.pdf,image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <button
            className="fgpt-input-icon-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Upload document"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>

          <textarea
            ref={inputRef}
            className="fgpt-input"
            placeholder="कोई भी सवाल पूछें — finance, stocks, tax या कुछ भी..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setTimeout(() => setInputFocused(false), 200)}
            rows={1}
            disabled={isLoading}
          />

          {/* Voice input button */}
          <button
            className={`fgpt-input-icon-btn ${isListening ? 'fgpt-voice-active' : ''}`}
            onClick={handleVoiceInput}
            title="Voice input"
            disabled={isListening}
          >
            {isListening ? (
              <span className="fgpt-voice-pulse"></span>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
                <path d="M19 10v2a7 7 0 01-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            )}
          </button>

          {/* Send button */}
          <button
            className={`fgpt-send-btn ${input.trim() && !isLoading ? 'fgpt-send-btn-active' : ''}`}
            onClick={() => handleSubmit()}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <span className="fgpt-send-spinner"></span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>

        {/* ─── Suggestions Dropdown ─── */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="fgpt-suggestions-dropdown">
            {filteredSuggestions.map((s, i) => (
              <button
                key={i}
                className="fgpt-suggestion-item"
                onMouseDown={() => { setInput(s); setShowSuggestions(false); handleSubmit(s); }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ─── Trending on Focus (when input is empty) ─── */}
        {inputFocused && !input && !showSuggestions && !hasMessages && (
          <div className="fgpt-suggestions-dropdown fgpt-trending-dropdown">
            <div className="fgpt-trending-dropdown-label">🔥 Trending on MoneyCal</div>
            {discoverArticles.slice(0, 5).map((article, i) => (
              <button
                key={i}
                className="fgpt-suggestion-item"
                onMouseDown={() => handleSubmit(article.title)}
              >
                <span className="fgpt-trending-dot">📈</span>
                {article.title.substring(0, 60)}{article.title.length > 60 ? '...' : ''}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="fgpt-disclaimer-text">
        MoneyCal • AI-powered • Voice & Document Analysis • 200+ tools
      </p>
    </div>
  );

  return (
    <>
      <SEOHelmet
        title={SEO_TITLE}
        description={SEO_DESCRIPTION}
        keywords={SEO_KEYWORDS}
        url="/"
        breadcrumbs={[{ name: 'Home', url: '/' }]}
        faqData={FAQ_DATA}
        structuredData={STRUCTURED_DATA}
        isFinanceContent={true}
      />

      <div className="fgpt-layout">
        {/* ─── Sidebar ─── */}
        <div className={`fgpt-sidebar ${sidebarOpen ? 'fgpt-sidebar-open' : ''}`}>
          <div className="fgpt-sidebar-header">
            <button className="fgpt-new-chat-btn" onClick={handleNewChat}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              नई बातचीत
            </button>
            <button className="fgpt-sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>

          <div className="fgpt-sidebar-chats">
            {savedChats.length === 0 && (
              <div className="fgpt-sidebar-empty">
                <p>आपकी बातचीत यहाँ दिखेगी</p>
              </div>
            )}

            {todayChats.length > 0 && (
              <div className="fgpt-chat-group">
                <span className="fgpt-chat-group-label">आज</span>
                {todayChats.map(chat => (
                  <div
                    key={chat.id}
                    className={`fgpt-chat-item ${activeChatId === chat.id ? 'fgpt-chat-item-active' : ''}`}
                    onClick={() => handleLoadChat(chat)}
                  >
                    <span className="fgpt-chat-item-icon">💬</span>
                    <span className="fgpt-chat-item-title">{chat.title}</span>
                    <button className="fgpt-chat-item-delete" onClick={(e) => handleDeleteChat(e, chat.id)} title="Delete">🗑️</button>
                  </div>
                ))}
              </div>
            )}

            {yesterdayChats.length > 0 && (
              <div className="fgpt-chat-group">
                <span className="fgpt-chat-group-label">कल</span>
                {yesterdayChats.map(chat => (
                  <div
                    key={chat.id}
                    className={`fgpt-chat-item ${activeChatId === chat.id ? 'fgpt-chat-item-active' : ''}`}
                    onClick={() => handleLoadChat(chat)}
                  >
                    <span className="fgpt-chat-item-icon">💬</span>
                    <span className="fgpt-chat-item-title">{chat.title}</span>
                    <button className="fgpt-chat-item-delete" onClick={(e) => handleDeleteChat(e, chat.id)} title="Delete">🗑️</button>
                  </div>
                ))}
              </div>
            )}

            {olderChats.length > 0 && (
              <div className="fgpt-chat-group">
                <span className="fgpt-chat-group-label">पुराने</span>
                {olderChats.map(chat => (
                  <div
                    key={chat.id}
                    className={`fgpt-chat-item ${activeChatId === chat.id ? 'fgpt-chat-item-active' : ''}`}
                    onClick={() => handleLoadChat(chat)}
                  >
                    <span className="fgpt-chat-item-icon">💬</span>
                    <span className="fgpt-chat-item-title">{chat.title}</span>
                    <button className="fgpt-chat-item-delete" onClick={(e) => handleDeleteChat(e, chat.id)} title="Delete">🗑️</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Trending in sidebar */}
          <div className="fgpt-sidebar-trending">
            <span className="fgpt-chat-group-label">📈 Trending</span>
            {discoverArticles.slice(0, 3).map(article => (
              <Link key={article.id} to={`/discover/${article.slug}`} className="fgpt-sidebar-trend-link">
                {article.title}
              </Link>
            ))}
          </div>
        </div>

        {/* ─── Sidebar Overlay (mobile) ─── */}
        {sidebarOpen && <div className="fgpt-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* ─── Main Content ─── */}
        <div className="fgpt-page">

          {/* Mobile top bar */}
          <div className="fgpt-mobile-topbar flex justify-between items-center px-4 py-3">
            <button className="fgpt-mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              History
            </button>
            <span className="fgpt-mobile-badge">🧠 AI</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-1.5 bg-green-500 text-white hover:bg-green-600 rounded-lg shadow-sm transition-colors"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button className="fgpt-mobile-new-btn" onClick={handleNewChat}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New
              </button>
            </div>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:block absolute top-6 right-6 z-20">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center justify-center p-2.5 bg-green-500 text-white hover:bg-green-600 rounded-full shadow-md transition-all font-medium text-sm"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* ─── Hero / Empty State ─── */}
          {!hasMessages && (
            <div className="fgpt-hero">
              <div className="fgpt-hero-glow"></div>
              <div className="fgpt-logo-container">
                <span className="fgpt-logo-icon">₹</span>
                <h1 className="fgpt-title">MoneyCal</h1>
                <p className="fgpt-subtitle">पैसों की बात, MoneyCal के साथ • AI-Powered 🇮🇳</p>
              </div>

              {/* Render input area inside hero if NO messages */}
              {renderInputArea(false)}

              {/* Research Mode Pills */}
              <div className="fgpt-modes">
                {RESEARCH_MODES.map(mode => (
                  <button
                    key={mode.id}
                    className={`fgpt-mode-pill ${researchMode === mode.id ? 'fgpt-mode-pill-active' : ''}`}
                    onClick={() => setResearchMode(mode.id)}
                  >
                    <span>{mode.icon}</span>
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>

              {/* Suggested Queries */}
              <div className="fgpt-suggestions">
                {SUGGESTED_QUERIES[researchMode].map((q, i) => (
                  <button key={i} className="fgpt-suggestion" onClick={() => handleSubmit(q)}>
                    {q}
                  </button>
                ))}
              </div>

              {/* ─── Trending Stories ─── */}
              <div className="fgpt-trending">
                <div className="fgpt-trending-header">
                  <span className="fgpt-trending-label">📈 TRENDING STORIES</span>
                  <Link to="/discover" className="fgpt-trending-see-all">सभी देखें →</Link>
                </div>
                <div className="fgpt-trending-grid">
                {[...discoverArticles]
                  .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
                  .slice(0, 4)
                  .map(article => (
                    <Link key={article.id} to={`/discover/${article.slug}`} className="fgpt-trending-card">
                      <h3 className="fgpt-trending-card-title">{article.title}</h3>
                      <span className="fgpt-trending-card-date">
                        {new Date(article.date || Date.now()).toLocaleDateString('hi-IN', { month: 'short', day: 'numeric' })}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Chat Messages ─── */}
          {hasMessages && (
            <div className="fgpt-chat-area">
              <div className="fgpt-modes fgpt-modes-compact">
                {RESEARCH_MODES.map(mode => (
                  <button
                    key={mode.id}
                    className={`fgpt-mode-pill fgpt-mode-pill-sm ${researchMode === mode.id ? 'fgpt-mode-pill-active' : ''}`}
                    onClick={() => setResearchMode(mode.id)}
                  >
                    <span>{mode.icon}</span>
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>

              <div className="fgpt-messages">
                {messages.map(msg => (
                  <div key={msg.id} className={`fgpt-msg fgpt-msg-${msg.role}`}>
                    <div className={`fgpt-avatar fgpt-avatar-${msg.role}`}>
                      {msg.role === 'user' ? '👤' : '₹'}
                    </div>
                    <div className="fgpt-msg-body">
                      {msg.role === 'user' ? (
                        <div className="fgpt-user-text">{msg.content}</div>
                      ) : (
                        <div className="fgpt-assistant-content">
                          {msg.sources && msg.sources.length > 0 && !msg.isStreaming && (
                            <SourceCards sources={msg.sources} />
                          )}
                          {msg.content ? (
                            <FinanceGPTResponseRenderer text={msg.content} sources={msg.sources} />
                          ) : msg.isStreaming ? (
                            <div className="fgpt-cursor-blink">▊</div>
                          ) : null}

                          {msg.followUpQuestions && msg.followUpQuestions.length > 0 && !msg.isStreaming && (
                            <div className="fgpt-followups">
                              <div className="fgpt-followups-label">💡 और जानना चाहते हैं?</div>
                              <div className="fgpt-followups-grid">
                                {msg.followUpQuestions.map((q, i) => (
                                  <button key={i} className="fgpt-followup-btn" onClick={() => handleSubmit(q)}>
                                    {q}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {msg.recommendations && msg.recommendations.length > 0 && !msg.isStreaming && (
                            <div className="fgpt-recommendations">
                              <div className="fgpt-recommendations-label">🔧 Related Tools</div>
                              <div className="fgpt-recommendations-grid">
                                {msg.recommendations.slice(0, 3).map((rec, i) => (
                                  <a key={i} href={rec.url} className="fgpt-rec-card">
                                    <span className="fgpt-rec-icon">🧮</span>
                                    <span className="fgpt-rec-title">{rec.title}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {showThinking && (
                  <div className="fgpt-msg fgpt-msg-assistant">
                    <div className="fgpt-avatar fgpt-avatar-assistant">₹</div>
                    <div className="fgpt-msg-body">
                      <ThinkingPanel steps={thinkingSteps} visible={showThinking} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* ─── Input Bar ─── */}
          {hasMessages && renderInputArea(true)}

          {/* ─── SEO Content Section (visible in empty state, crawlable by Google) ─── */}
          {!hasMessages && (
            <section className="fgpt-seo-section" aria-label="MoneyCal Features & FAQ">
              {/* Internal Links Hub */}
              <div className="fgpt-seo-tools">
                <h2 className="fgpt-seo-h2">🧮 200+ Free Financial Calculators & Tools</h2>
                <p className="fgpt-seo-desc">MoneyCal पर India के सबसे popular financial calculators free में use करें — कोई login या registration ज़रूरी नहीं।</p>
                <div className="fgpt-seo-links">
                  <Link to="/calculators/sip-calculator" className="fgpt-seo-link">SIP Calculator</Link>
                  <Link to="/calculators/emi-calculator" className="fgpt-seo-link">EMI Calculator</Link>
                  <Link to="/calculators/income-tax-calculator" className="fgpt-seo-link">Income Tax Calculator 2025-26</Link>
                  <Link to="/calculators/mutual-fund-calculator" className="fgpt-seo-link">Mutual Fund Calculator</Link>
                  <Link to="/calculators/fd-calculator" className="fgpt-seo-link">FD Calculator</Link>
                  <Link to="/calculators/rd-calculator" className="fgpt-seo-link">RD Calculator</Link>
                  <Link to="/calculators/ppf-calculator" className="fgpt-seo-link">PPF Calculator</Link>
                  <Link to="/calculators/nps-calculator" className="fgpt-seo-link">NPS Calculator</Link>
                  <Link to="/calculators/home-loan-emi-calculator" className="fgpt-seo-link">Home Loan EMI Calculator</Link>
                  <Link to="/calculators/car-loan-emi-calculator" className="fgpt-seo-link">Car Loan EMI Calculator</Link>
                  <Link to="/calculators/lumpsum-calculator" className="fgpt-seo-link">Lumpsum Calculator</Link>
                  <Link to="/calculators/step-up-sip-calculator" className="fgpt-seo-link">Step-up SIP Calculator</Link>
                  <Link to="/calculators/swp-calculator" className="fgpt-seo-link">SWP Calculator</Link>
                  <Link to="/calculators/cagr-calculator" className="fgpt-seo-link">CAGR Calculator</Link>
                  <Link to="/calculators/gratuity-calculator" className="fgpt-seo-link">Gratuity Calculator</Link>
                  <Link to="/calculators/hra-calculator" className="fgpt-seo-link">HRA Calculator</Link>
                  <Link to="/gold-rate" className="fgpt-seo-link">Gold Rate Today</Link>
                  <Link to="/silver-rate" className="fgpt-seo-link">Silver Rate Today</Link>
                  <Link to="/ipo" className="fgpt-seo-link">IPO Dashboard 2026</Link>
                  <Link to="/calculators" className="fgpt-seo-link">All Calculators →</Link>
                </div>
              </div>

              {/* Keyword-rich descriptive content */}
              <div className="fgpt-seo-content">
                <h2 className="fgpt-seo-h2">MoneyCal — India का #1 Free AI Financial Assistant</h2>
                <p className="fgpt-seo-text">
                  MoneyCal एक free AI-powered financial assistant है जो आपकी हर financial query का जवाब देता है — चाहे SIP calculator हो, EMI calculator, income tax calculator 2025-26, gold rate today, या IPO GMP। Gemini AI से powered, MoneyCal 200+ financial calculators, investment tools, और government schemes की जानकारी एक ही जगह पर provide करता है।
                </p>

                <h3 className="fgpt-seo-h3">SIP Calculator — Systematic Investment Plan Returns</h3>
                <p className="fgpt-seo-text">MoneyCal का free SIP calculator monthly investment amount, expected return rate, और time period से total corpus, wealth gained, और maturity amount calculate करता है। Step-up SIP, lumpsum comparison, और inflation-adjusted returns भी available हैं।</p>

                <h3 className="fgpt-seo-h3">EMI Calculator — Home Loan, Car Loan, Personal Loan</h3>
                <p className="fgpt-seo-text">Loan amount, interest rate, और tenure enter करें — MoneyCal instantly monthly EMI, total interest payable, और year-wise amortization schedule दिखाता है। Home loan EMI calculator, car loan EMI calculator, और personal loan EMI calculator — सभी free।</p>

                <h3 className="fgpt-seo-h3">Income Tax Calculator 2025-26 — New vs Old Regime</h3>
                <p className="fgpt-seo-text">New tax regime और old tax regime में कौन सा better है? MoneyCal का income tax calculator salary, deductions (80C, 80D, HRA), exemptions enter करके दोनों regimes compare करता है। Tax saving tips भी AI से पूछ सकते हैं।</p>

                <h3 className="fgpt-seo-h3">Gold Rate Today & Silver Rate — All Cities</h3>
                <p className="fgpt-seo-text">22K और 24K gold rate today, silver rate today — Delhi, Mumbai, Chennai, Bangalore, Hyderabad और सभी major cities के live prices MoneyCal पर daily update होते हैं।</p>

                <h3 className="fgpt-seo-h3">IPO Dashboard — GMP, Subscription Status, Listing Date</h3>
                <p className="fgpt-seo-text">Latest IPO Grey Market Premium (GMP), subscription status live, allotment date, listing date prediction, और expected listing gains — MoneyCal का IPO dashboard India का सबसे complete IPO tracker है।</p>
              </div>

              {/* FAQ Section */}
              <div className="fgpt-seo-faq">
                <h2 className="fgpt-seo-h2">❓ अक्सर पूछे जाने वाले सवाल (FAQ)</h2>
                {FAQ_DATA.map((faq, i) => (
                  <details key={i} className="fgpt-faq-item">
                    <summary className="fgpt-faq-q">{faq.question}</summary>
                    <p className="fgpt-faq-a">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default FinanceGPT;
