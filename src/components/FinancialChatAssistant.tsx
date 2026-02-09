import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Minimize2, Maximize2, Sparkles, Bot, User } from 'lucide-react';
import knowledgeBaseData from '../data/financialKnowledgeBase.json';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FinancialChatAssistantProps {
  language?: 'en' | 'hi';
  embedded?: boolean;
}

export const FinancialChatAssistant: React.FC<FinancialChatAssistantProps> = ({ language = 'en', embedded = false }) => {
  const [isOpen, setIsOpen] = useState(embedded ? true : false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'en' 
        ? '👋 Hello! I\'m your Financial Assistant. Ask me about PPF, SIP, GST, Income Tax, Loans, or any financial topic!'
        : '👋 नमस्ते! मैं आपका वित्तीय सहायक हूं। मुझसे PPF, SIP, GST, आयकर, ऋण, या किसी भी वित्तीय विषय के बारे में पूछें!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load knowledge base from JSON
  const knowledgeBase = knowledgeBaseData;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart search function - finds best matching answer
  const findAnswer = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // First check quick answers (exact or partial match)
    for (const [question, answer] of Object.entries(knowledgeBase.quickAnswers)) {
      if (lowerQuery.includes(question.toLowerCase()) || question.toLowerCase().includes(lowerQuery)) {
        return answer as string;
      }
    }

    // Then search through detailed topics
    for (const topic of knowledgeBase.topics) {
      const matchFound = topic.keywords.some(keyword => 
        lowerQuery.includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes(lowerQuery)
      );
      if (matchFound) {
        return topic.answer;
      }
    }

    // Fuzzy match in quick answers
    for (const [question, answer] of Object.entries(knowledgeBase.quickAnswers)) {
      const questionWords = question.toLowerCase().split(' ');
      const matchCount = questionWords.filter(word => lowerQuery.includes(word)).length;
      if (matchCount >= 2) {
        return answer as string;
      }
    }

    // Default response if no match
    return language === 'en'
      ? `I can help you with:\n\n📊 **Calculators:** EMI, SIP, PPF, GST, Income Tax\n💰 **Investments:** Mutual Funds, NPS, Stocks, FDs\n📝 **Tax:** Section 80C, HRA, ITR Filing\n🏦 **Loans:** Home, Car, Personal Loans\n\n🔍 **Try asking:**\n• "What is PPF?"\n• "How to calculate SIP returns?"\n• "GST filing deadline?"\n• "Income tax for ₹10 lakhs?"\n• "Best investment for 2025?"\n• "NPS vs PPF?"\n\nOr visit our [Help Center](/help-center) for 50+ detailed FAQs!`
      : `मैं आपकी मदद कर सकता हूं:\n\n📊 **कैलकुलेटर:** EMI, SIP, PPF, GST, आयकर\n💰 **निवेश:** म्यूचुअल फंड, NPS, स्टॉक\n📝 **कर:** Section 80C, HRA, ITR\n🏦 **ऋण:** होम, कार, पर्सनल लोन\n\n[सहायता केंद्र](/help-center) पर जाएं!`;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate thinking and respond
    setTimeout(() => {
      const answer = findAnswer(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick question buttons
  const quickQuestions = language === 'en' ? [
    'How to calculate PPF?',
    'What is SIP?',
    'GST filing deadline',
    'Income tax calculator'
  ] : [
    'PPF कैसे कैलकुलेट करें?',
    'SIP क्या है?',
    'GST फाइलिंग डेडलाइन',
    'आयकर कैलकुलेटर'
  ];

  // If embedded mode, render inline chat
  if (embedded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-bold text-2xl">
                  {language === 'en' ? '💬 Ask Our Financial Assistant' : '💬 हमारे वित्तीय सहायक से पूछें'}
                </h2>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {language === 'en' ? 'Online • Instant Answers' : 'ऑनलाइन • त्वरित उत्तर'}
                </div>
              </div>
            </div>
            <p className="text-white/90">
              {language === 'en' 
                ? 'Get instant answers about PPF, SIP, GST, Income Tax, Loans, and more. Ask anything!'
                : 'PPF, SIP, GST, आयकर, ऋण और अधिक के बारे में त्वरित उत्तर प्राप्त करें। कुछ भी पूछें!'}
            </p>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`p-2.5 rounded-full ${message.sender === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <div
                      className={`px-5 py-4 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-white border-2 border-purple-200 text-gray-800 shadow-md'
                      }`}
                    >
                      <div 
                        className="text-sm leading-relaxed whitespace-pre-line"
                        dangerouslySetInnerHTML={{ 
                          __html: message.text
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="underline font-semibold hover:text-blue-600">$1</a>')
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1.5 px-2">
                      {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-purple-600">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border-2 border-purple-200 px-5 py-4 rounded-2xl shadow-md">
                    <div className="flex gap-1.5">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2.5 h-2.5 bg-purple-600 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2.5 h-2.5 bg-purple-600 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2.5 h-2.5 bg-purple-600 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 bg-white border-t-2 border-purple-100">
              <p className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                {language === 'en' ? 'Popular Questions - Click to Ask:' : 'लोकप्रिय प्रश्न - पूछने के लिए क्लिक करें:'}
              </p>
              <div className="flex flex-wrap gap-3">
                {quickQuestions.map((q, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInputText(q);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-700 hover:text-blue-700 rounded-full text-sm font-medium transition-all border border-purple-200 hover:border-purple-400"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 bg-white border-t-2 border-purple-100">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'en' ? '💭 Ask anything about finance... (PPF, SIP, GST, Tax, Loans)' : '💭 वित्त के बारे में कुछ भी पूछें...'}
                className="flex-1 px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all text-base"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                {language === 'en' ? 'Send' : 'भेजें'}
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              {language === 'en' 
                ? '🤖 Powered by MoneyCal AI • 200+ Financial Topics • Instant Answers'
                : '🤖 MoneyCal AI द्वारा संचालित • 200+ वित्तीय विषय • त्वरित उत्तर'}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default: Floating chat button mode
  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all"
          >
            <div className="relative">
              <MessageSquare className="w-7 h-7" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${isMinimized ? 'bottom-6 right-6 w-80' : 'bottom-6 right-6 w-full max-w-md md:max-w-lg'} z-50`}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-purple-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {language === 'en' ? 'Financial Assistant' : 'वित्तीय सहायक'}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      {language === 'en' ? 'Online' : 'ऑनलाइन'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Body */}
              {!isMinimized && (
                <>
                  <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                            {message.sender === 'user' ? (
                              <User className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Bot className="w-4 h-4 text-purple-600" />
                            )}
                          </div>
                          <div>
                            <div
                              className={`px-4 py-3 rounded-2xl ${
                                message.sender === 'user'
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                  : 'bg-white border border-gray-200 text-gray-800'
                              }`}
                            >
                              <div 
                                className="text-sm leading-relaxed whitespace-pre-line"
                                dangerouslySetInnerHTML={{ 
                                  __html: message.text
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="underline font-semibold hover:text-blue-600">$1</a>')
                                }}
                              />
                            </div>
                            <div className="text-xs text-gray-400 mt-1 px-2">
                              {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-purple-100">
                            <Bot className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                            <div className="flex gap-1">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                className="w-2 h-2 bg-purple-600 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-purple-600 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                className="w-2 h-2 bg-purple-600 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Questions */}
                  {messages.length === 1 && (
                    <div className="px-4 py-3 bg-white border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">
                        {language === 'en' ? '💡 Quick Questions:' : '💡 त्वरित प्रश्न:'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {quickQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setInputText(q);
                              setTimeout(() => handleSend(), 100);
                            }}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full text-xs font-medium transition-colors"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input Area */}
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={language === 'en' ? 'Ask anything about finance...' : 'वित्त के बारे में कुछ भी पूछें...'}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {language === 'en' 
                        ? '💡 Powered by MoneyCal Knowledge Base • 50+ Topics Covered'
                        : '💡 MoneyCal ज्ञान आधार द्वारा संचालित • 50+ विषय कवर किए गए'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FinancialChatAssistant;

