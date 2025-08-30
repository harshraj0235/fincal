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
}

interface FinoChatProps {
  className?: string;
}

const FinoChat: React.FC<FinoChatProps> = ({ className = '' }) => {
  console.log('FinoChat component is loading...');
  
  // Test if component is rendering
  useEffect(() => {
    console.log('FinoChat component mounted successfully!');
  }, []);
  
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const [badge, setBadge] = useState('');
  
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
        chartData: response.response.chartData
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
    
    switch (chartData.type) {
      case 'line':
        return <Line data={chartData.data} options={chartData.options} />;
      case 'bar':
        return <Bar data={chartData.data} options={chartData.options} />;
      case 'doughnut':
        return <Doughnut data={chartData.data} options={chartData.options} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} ${className}`}>
      <Helmet>
        <title>Fino Chat - AI Finance Assistant | Get Instant Financial Advice</title>
        <meta name="description" content="Chat with Fino, your AI finance assistant. Get instant answers about stocks, insurance, loans, taxes, and more. Features voice input, real-time data, and multi-language support." />
      </Helmet>

      {/* Header */}
      <div className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Fino</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI Finance Assistant</p>
                </div>
              </div>
              {badge && (
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {badge}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLanguage(lang => lang === 'en' ? 'hi' : 'en')}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                title="Switch Language"
              >
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              
              <button
                onClick={clearChat}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                title="Clear Chat"
              >
                <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className={`rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-[calc(100vh-200px)] flex flex-col`}>
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
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : isDarkMode 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
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
          
          {/* Input Area */}
          <div className={`border-t p-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={language === 'hi' ? 'अपना प्रश्न टाइप करें...' : 'Type your question...'}
                  className={`w-full px-4 py-3 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                
                {/* Language Indicator */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {language.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-3 rounded-full transition-all ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                title={isListening ? 'Stop Listening' : 'Start Voice Input'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Send Message"
              >
                <Send className="w-5 h-5" />
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
    </div>
  );
};

export default FinoChat;
