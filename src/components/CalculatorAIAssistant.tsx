import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Loader2, User, X } from 'lucide-react';
import { streamGeminiResponse, CoreChatMessage } from '../lib/llmEngine';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CalculatorAIAssistantProps {
  calculatorName: string;
  calculatorDescription: string;
}

export const CalculatorAIAssistant: React.FC<CalculatorAIAssistantProps> = ({ calculatorName, calculatorDescription }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<CoreChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStreaming, thinkingStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages: CoreChatMessage[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsStreaming(true);
    setThinkingStep('Analyzing your request...');

    let currentResponse = '';
    // Append an empty assistant message that will be updated
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      // Pass the calculator context as part of the query to ground the AI
      const contextualQuery = `Context: The user is currently using the "${calculatorName}" (${calculatorDescription}).\nUser Question: ${userMessage}`;
      
      await streamGeminiResponse(
        contextualQuery,
        [], // empty content index
        messages,
        'beginner',
        (chunk) => {
          currentResponse = chunk;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].content = currentResponse;
            return updated;
          });
        },
        (step) => setThinkingStep(step),
        'general'
      );
    } catch (error) {
      console.error('Error in AI Assistant:', error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = "I'm sorry, I encountered an error. Please try asking again.";
        return updated;
      });
    } finally {
      setIsStreaming(false);
      setThinkingStep('');
    }
  };

  if (!isOpen) {
    return (
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between border border-blue-100 shadow-sm">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 shrink-0 shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Need Help with this Calculation?</h3>
            <p className="text-gray-600">Ask our AI assistant about {calculatorName}, how to interpret your results, or any other financial questions.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg shrink-0"
        >
          <Bot className="w-5 h-5 mr-2" />
          Ask MoneyCal AI
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="w-6 h-6 mr-2" />
          <div>
            <h3 className="font-bold">MoneyCal AI Assistant</h3>
            <p className="text-xs text-blue-100">Powered by OpenRouter & Gemini</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
            <Sparkles className="w-12 h-12 text-blue-200 mb-4" />
            <p className="font-medium text-gray-700 mb-1">How can I help you today?</p>
            <p className="text-sm">Ask me how to use the {calculatorName}, or any finance related questions!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200 ml-3' : 'bg-blue-100 mr-3'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-gray-600" /> : <Bot className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="prose prose-sm prose-blue max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content || '...'}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {isStreaming && thinkingStep && (
          <div className="flex items-center mt-4 text-gray-500 text-sm ml-11">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {thinkingStep}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${calculatorName}...`}
            disabled={isStreaming}
            className="flex-1 w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
