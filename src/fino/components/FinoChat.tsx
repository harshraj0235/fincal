import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Globe, 
  BarChart3, 
  TrendingUp, 
  Calculator,
  Shield,
  Zap,
  MessageCircle,
  Bot,
  User,
  Copy,
  Download,
  Share2,
  Settings,
  Moon,
  Sun,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { queryFino, getPopularQueries, getMarketStatus, FinoQueryRequest } from '../services/finoApi';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  data?: any;
  suggestions?: string[];
  chartData?: any;
  isTyping?: boolean;
  sources?: string[];
  confidence?: number;
  realTimeData?: boolean;
  lastUpdated?: Date;
}

interface FinoChatProps {
  className?: string;
}

const FinoChat: React.FC<FinoChatProps> = ({ className = '' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const [badge, setBadge] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(typeof window !== 'undefined' ? window.speechSynthesis : null);

  // Load chat history and settings
  useEffect(() => {
    const savedMessages = localStorage.getItem('fino-chat-history');
    const savedLanguage = localStorage.getItem('fino-language') as 'en' | 'hi' || 'en';
    const savedDarkMode = localStorage.getItem('fino-dark-mode') === 'true';
    const savedQueryCount = parseInt(localStorage.getItem('fino-query-count') || '0');
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: '1',
        type: 'bot',
        content: savedLanguage === 'hi' 
          ? 'नमस्ते! मैं Fino हूं, आपका AI वित्तीय सहायक। मैं स्टॉक, बीमा, ऋण, कर, और अन्य वित्तीय विषयों में आपकी मदद कर सकता हूं। अंग्रेजी या हिंदी में कुछ भी पूछें!'
          : 'Namaste! I\'m Fino, your AI finance assistant. I can help you with stocks, insurance, loans, taxes, and more. Ask me anything in English or Hindi!',
        timestamp: new Date(),
        suggestions: getPopularQueries(savedLanguage)
      };
      setMessages([welcomeMessage]);
    }
    setLanguage(savedLanguage);
    setIsDarkMode(savedDarkMode);
    setQueryCount(savedQueryCount);
    
    if (savedQueryCount >= 5) setBadge('Finance Guru');
    if (savedQueryCount >= 20) setBadge('Investment Master');
    if (savedQueryCount >= 50) setBadge('Financial Expert');
  }, []);

  // Save chat history
  useEffect(() => {
    localStorage.setItem('fino-chat-history', JSON.stringify(messages));
    localStorage.setItem('fino-language', language);
    localStorage.setItem('fino-dark-mode', isDarkMode.toString());
    localStorage.setItem('fino-query-count', queryCount.toString());
  }, [messages, language, isDarkMode, queryCount]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'en' ? 'en-IN' : 'hi-IN';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentQuery = inputValue;
    setInputValue('');
    setIsTyping(true);
    setQueryCount(prev => prev + 1);
    
    // Update badge based on query count
    if (queryCount + 1 >= 50) setBadge('Financial Expert');
    else if (queryCount + 1 >= 20) setBadge('Investment Master');
    else if (queryCount + 1 >= 5) setBadge('Finance Guru');
    
    try {
      // Call the API service
      const request: FinoQueryRequest = {
        query: currentQuery,
        lang: language
      };
      
      const response = await queryFino(request);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.response.content,
        timestamp: new Date(),
        data: response.response.data,
        suggestions: response.response.suggestions,
        chartData: response.response.chartData,
        sources: response.response.sources,
        confidence: response.response.confidence,
        realTimeData: response.response.realTimeData,
        lastUpdated: response.response.lastUpdated
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling Fino API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: language === 'hi' 
          ? 'क्षमा करें, कुछ तकनीकी समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।'
          : 'Sorry, there seems to be a technical issue. Please try again later.',
        timestamp: new Date(),
        suggestions: ['Try again', 'Ask a different question', 'Check your internet connection']
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };



  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-IN' : 'hi-IN';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      synthRef.current.speak(utterance);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearChat = () => {
    const welcomeMessage: Message = {
      id: '1',
      type: 'bot',
      content: language === 'hi' 
        ? 'चैट साफ़ हो गई! आज मैं आपकी कैसे मदद कर सकता हूं?'
        : 'Chat cleared! How can I help you today?',
      timestamp: new Date(),
      suggestions: getPopularQueries(language)
    };
    setMessages([welcomeMessage]);
  };

  const renderChart = (chartData: any) => {
    if (!chartData) return null;
    
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: isDarkMode ? '#ffffff' : '#374151'
          }
        },
        tooltip: {
          backgroundColor: isDarkMode ? '#374151' : '#ffffff',
          titleColor: isDarkMode ? '#ffffff' : '#374151',
          bodyColor: isDarkMode ? '#ffffff' : '#374151',
          borderColor: isDarkMode ? '#6B7280' : '#D1D5DB',
          borderWidth: 1
        }
      },
      scales: chartData.type === 'line' || chartData.type === 'bar' ? {
        x: {
          ticks: { color: isDarkMode ? '#ffffff' : '#374151' },
          grid: { color: isDarkMode ? '#374151' : '#E5E7EB' }
        },
        y: {
          ticks: { color: isDarkMode ? '#ffffff' : '#374151' },
          grid: { color: isDarkMode ? '#374151' : '#E5E7EB' }
        }
      } : undefined
    };
    
    const chartOptions = { ...defaultOptions, ...chartData.options };
    
    switch (chartData.type) {
      case 'line':
        return (
          <div className="h-64 w-full">
            <Line data={chartData.data} options={chartOptions} />
          </div>
        );
      case 'bar':
        return (
          <div className="h-64 w-full">
            <Bar data={chartData.data} options={chartOptions} />
          </div>
        );
      case 'doughnut':
        return (
          <div className="h-64 w-full">
            <Doughnut data={chartData.data} options={chartOptions} />
          </div>
        );
      case 'pie':
        return (
          <div className="h-64 w-full">
            <Doughnut data={chartData.data} options={chartOptions} />
          </div>
        );
      case 'area':
        return (
          <div className="h-64 w-full">
            <Line 
              data={{
                ...chartData.data,
                datasets: chartData.data.datasets.map((dataset: any) => ({
                  ...dataset,
                  fill: true
                }))
              }} 
              options={chartOptions} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'} ${className}`}>
      <Helmet>
        <title>Fino Chat - AI Finance Assistant | Get Instant Financial Advice</title>
        <meta name="description" content="Chat with Fino, your AI finance assistant. Get instant answers about stocks, insurance, loans, taxes, and more. Features voice input, real-time data, and multi-language support." />
        <meta name="keywords" content="finance chat, AI financial advice, voice finance assistant, Hindi finance chatbot, real-time stock data, financial calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Fino - AI Finance Chat System",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "AI-powered finance chat system with voice input, real-time data, and multi-language support",
            "featureList": [
              "AI-Powered Chat",
              "Voice Input (English/Hindi)",
              "Real-time Financial Data",
              "Multi-language Support",
              "Secure & Private",
              "No Login Required"
            ]
          })}
        </script>
      </Helmet>

      {/* Enhanced Header */}
      <div className={`sticky top-0 z-50 backdrop-blur-md ${isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} border-b shadow-lg`}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Fino
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  AI Finance Assistant
                </p>
              </div>
              {badge && (
                <div className="hidden sm:block px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-medium shadow-lg">
                  {badge}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setLanguage(lang => lang === 'en' ? 'hi' : 'en')}
                className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100/50 hover:bg-gray-200/50'} transition-all duration-200 hover:scale-105`}
                title="Switch Language"
              >
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100/50 hover:bg-gray-200/50'} transition-all duration-200 hover:scale-105`}
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              
              <button
                onClick={clearChat}
                className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-100/50 hover:bg-gray-200/50'} transition-all duration-200 hover:scale-105`}
                title="Clear Chat"
              >
                <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Container */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className={`rounded-3xl shadow-2xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90 border border-gray-200'} h-[calc(100vh-180px)] flex flex-col overflow-hidden`}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[90%] sm:max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    
                    <div className={`rounded-3xl px-5 py-4 shadow-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : isDarkMode 
                          ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white border border-gray-600' 
                          : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 border border-gray-200'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {/* Enhanced message metadata */}
                      {message.type === 'bot' && (
                        <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-3">
                              {message.realTimeData && (
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                  <span>Live Data</span>
                                </div>
                              )}
                              {message.confidence && (
                                <div className="flex items-center space-x-1">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>{Math.round(message.confidence * 100)}% confidence</span>
                                </div>
                              )}
                              {message.lastUpdated && (
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>Updated {message.lastUpdated.toLocaleTimeString()}</span>
                                </div>
                              )}
                            </div>
                            {message.sources && message.sources.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <span>Sources: {message.sources.slice(0, 2).join(', ')}</span>
                                {message.sources.length > 2 && <span>+{message.sources.length - 2}</span>}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Chart */}
                      {message.chartData && (
                        <div className="mt-4 w-full max-w-md">
                          {renderChart(message.chartData)}
                        </div>
                      )}
                      
                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs opacity-75">Suggestions:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => setInputValue(suggestion)}
                                className={`text-xs px-3 py-1 rounded-full ${
                                  message.type === 'user'
                                    ? 'bg-blue-500 hover:bg-blue-400'
                                    : isDarkMode
                                      ? 'bg-gray-600 hover:bg-gray-500'
                                      : 'bg-gray-200 hover:bg-gray-300'
                                } transition-colors`}
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Message Actions */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-opacity-20">
                        <span className="text-xs opacity-75">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => copyToClipboard(message.content)}
                            className="p-1 hover:bg-opacity-20 rounded"
                            title="Copy"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => speakText(message.content)}
                            className="p-1 hover:bg-opacity-20 rounded"
                            title="Speak"
                          >
                            {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Enhanced Input Area */}
          <div className={`border-t p-6 ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'} backdrop-blur-sm`}>
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={language === 'hi' ? 'अपना प्रश्न टाइप करें...' : 'Type your question...'}
                  className={`w-full px-6 py-4 rounded-2xl border-2 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 text-base ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }`}
                />
                
                {/* Language Indicator */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {language.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-4 rounded-2xl transition-all duration-200 hover:scale-105 ${
                  isListening 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg' 
                    : isDarkMode 
                      ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border border-gray-600' 
                      : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 border border-gray-300'
                }`}
                title={isListening ? 'Stop Listening' : 'Start Voice Input'}
              >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                title="Send Message"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{language === 'hi' ? 'त्वरित क्रियाएं:' : 'Quick actions:'}</span>
                {getPopularQueries(language).slice(0, 3).map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(query)}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {query.length > 20 ? query.substring(0, 20) + '...' : query}
                  </button>
                ))}
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'hi' ? 'प्रश्न:' : 'Queries:'} {queryCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className={`rounded-3xl shadow-2xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90 border border-gray-200'} p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📰 Latest Financial News
            </h2>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105">
              View All News
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* News Card 1 */}
            <div className={`rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer ${
              isDarkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50/50 border border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Market Update</span>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Nifty 50 Reaches New All-Time High
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                The Nifty 50 index surged to 19,856 points, marking a significant milestone in the Indian stock market...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-semibold">+0.64%</span>
                <span className="text-xs text-gray-500">Economic Times</span>
              </div>
            </div>

            {/* News Card 2 */}
            <div className={`rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer ${
              isDarkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50/50 border border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Banking</span>
                <span className="text-xs text-gray-400">4 hours ago</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                RBI Announces New Digital Banking Guidelines
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                The Reserve Bank of India has introduced new regulations for digital banking services to enhance security...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-semibold">Policy Update</span>
                <span className="text-xs text-gray-500">Business Standard</span>
              </div>
            </div>

            {/* News Card 3 */}
            <div className={`rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer ${
              isDarkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50/50 border border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Crypto</span>
                <span className="text-xs text-gray-400">6 hours ago</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Bitcoin Surges Past ₹42 Lakh Mark
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Bitcoin has reached a new high in the Indian market, crossing the ₹42 lakh threshold with strong institutional support...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-semibold">+3.03%</span>
                <span className="text-xs text-gray-500">CoinDesk</span>
              </div>
            </div>

            {/* News Card 4 */}
            <div className={`rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer ${
              isDarkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50/50 border border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Insurance</span>
                <span className="text-xs text-gray-400">8 hours ago</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                New Health Insurance Plans Launched
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Leading insurance companies have introduced comprehensive health insurance plans with better coverage...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-orange-600 font-semibold">New Plans</span>
                <span className="text-xs text-gray-500">Insurance Times</span>
              </div>
            </div>

            {/* News Card 5 */}
            <div className={`rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer ${
              isDarkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50/50 border border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Tax</span>
                <span className="text-xs text-gray-400">10 hours ago</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Income Tax Filing Deadline Extended
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                The government has extended the income tax filing deadline to provide relief to taxpayers...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-red-600 font-semibold">Deadline</span>
                <span className="text-xs text-gray-500">TaxGuru</span>
              </div>
            </div>

            {/* News Card 6 */}
            <div className={`rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer ${
              isDarkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50/50 border border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Mutual Funds</span>
                <span className="text-xs text-gray-400">12 hours ago</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                SIP Investments Reach Record High
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Systematic Investment Plans have seen unprecedented growth with record inflows this month...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-indigo-600 font-semibold">Record Growth</span>
                <span className="text-xs text-gray-500">AMFI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinoChat;
