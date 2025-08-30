// Mock API service for Fino Finance Chat System
// This simulates the backend functionality described in the requirements

export interface FinoQueryRequest {
  query: string;
  lang: 'en' | 'hi';
  timestamp?: Date;
}

export interface FinoQueryResponse {
  query: string;
  response: {
    type: 'stock' | 'insurance' | 'tax' | 'loan' | 'general' | 'error';
    content: string;
    data?: any;
    suggestions?: string[];
    chartData?: any;
    source?: string;
  };
  timestamp: Date;
}

export interface StockData {
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  high52Week: number;
  low52Week: number;
}

export interface InsurancePlan {
  name: string;
  company: string;
  premium: number;
  coverage: string;
  features: string[];
  rating: number;
}

export interface TaxSlab {
  minIncome: number;
  maxIncome: number;
  rate: number;
  description: string;
}

// Mock data for different financial categories
const mockStockData: { [key: string]: StockData } = {
  'reliance': {
    name: 'Reliance Industries',
    price: 2450.25,
    change: 15.50,
    changePercent: 0.64,
    volume: 1250000,
    marketCap: '16.5L Cr',
    high52Week: 2850.00,
    low52Week: 2100.00
  },
  'tcs': {
    name: 'TCS',
    price: 3850.75,
    change: -25.30,
    changePercent: -0.65,
    volume: 850000,
    marketCap: '14.2L Cr',
    high52Week: 4200.00,
    low52Week: 3200.00
  },
  'infosys': {
    name: 'Infosys',
    price: 1450.50,
    change: 8.75,
    changePercent: 0.61,
    volume: 950000,
    marketCap: '6.1L Cr',
    high52Week: 1650.00,
    low52Week: 1200.00
  },
  'hdfc': {
    name: 'HDFC Bank',
    price: 1650.80,
    change: 12.40,
    changePercent: 0.76,
    volume: 1100000,
    marketCap: '12.8L Cr',
    high52Week: 1800.00,
    low52Week: 1400.00
  }
};

const mockInsurancePlans: InsurancePlan[] = [
  {
    name: 'LIC Term Plan',
    company: 'LIC',
    premium: 25000,
    coverage: '₹1 Crore',
    features: ['High Coverage', 'Low Premium', 'Tax Benefits'],
    rating: 4.5
  },
  {
    name: 'HDFC Life Click 2 Protect',
    company: 'HDFC Life',
    premium: 30000,
    coverage: '₹1.5 Crore',
    features: ['Flexible Premium', 'Multiple Riders', 'Online Purchase'],
    rating: 4.3
  },
  {
    name: 'Max Life Smart Term',
    company: 'Max Life',
    premium: 28000,
    coverage: '₹1.2 Crore',
    features: ['Return of Premium', 'Critical Illness', 'Accidental Death'],
    rating: 4.4
  }
];

const mockTaxSlabs: TaxSlab[] = [
  { minIncome: 0, maxIncome: 300000, rate: 0, description: 'Up to ₹3 Lakh' },
  { minIncome: 300001, maxIncome: 600000, rate: 5, description: '₹3-6 Lakh' },
  { minIncome: 600001, maxIncome: 900000, rate: 10, description: '₹6-9 Lakh' },
  { minIncome: 900001, maxIncome: 1200000, rate: 15, description: '₹9-12 Lakh' },
  { minIncome: 1200001, maxIncome: 1500000, rate: 20, description: '₹12-15 Lakh' },
  { minIncome: 1500001, maxIncome: Infinity, rate: 30, description: 'Above ₹15 Lakh' }
];

// Utility functions
const extractStockName = (query: string): string => {
  const queryLower = query.toLowerCase();
  const stocks = Object.keys(mockStockData);
  const found = stocks.find(stock => queryLower.includes(stock));
  return found || 'reliance';
};

const generateStockChart = (stockData: StockData) => {
  return {
    type: 'line',
    data: {
      labels: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'],
      datasets: [{
        label: `${stockData.name} Price (₹)`,
        data: [
          stockData.price - 50,
          stockData.price - 30,
          stockData.price - 10,
          stockData.price + 20,
          stockData.price + 10,
          stockData.price
        ],
        borderColor: stockData.change >= 0 ? '#10B981' : '#EF4444',
        backgroundColor: stockData.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${stockData.name} Price Trend`
        }
      }
    }
  };
};

const generateInsuranceChart = () => {
  return {
    type: 'bar',
    data: {
      labels: mockInsurancePlans.map(plan => plan.name),
      datasets: [{
        label: 'Annual Premium (₹)',
        data: mockInsurancePlans.map(plan => plan.premium),
        backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Insurance Plan Comparison'
        }
      }
    }
  };
};

const generateTaxChart = () => {
  return {
    type: 'doughnut',
    data: {
      labels: mockTaxSlabs.map(slab => slab.description),
      datasets: [{
        data: mockTaxSlabs.map(slab => slab.rate),
        backgroundColor: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Income Tax Slabs 2024'
        }
      }
    }
  };
};

// Main API function
export const queryFino = async (request: FinoQueryRequest): Promise<FinoQueryResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const query = request.query.toLowerCase();
  const lang = request.lang;
  
  try {
    // Stock price queries
    if (query.includes('stock') || query.includes('share') || query.includes('price') || 
        query.includes('शेयर') || query.includes('स्टॉक') || query.includes('मूल्य')) {
      const stockName = extractStockName(request.query);
      const stockData = mockStockData[stockName];
      
      const content = lang === 'hi' 
        ? `${stockData.name} का वर्तमान शेयर मूल्य ₹${stockData.price.toFixed(2)} है। यह ₹${stockData.change.toFixed(2)} (${stockData.changePercent.toFixed(2)}%) ${stockData.change >= 0 ? 'बढ़ा' : 'गिरा'} है।`
        : `The current stock price of ${stockData.name} is ₹${stockData.price.toFixed(2)}. It has ${stockData.change >= 0 ? 'increased' : 'decreased'} by ₹${stockData.change.toFixed(2)} (${stockData.changePercent.toFixed(2)}%).`;
      
      return {
        query: request.query,
        response: {
          type: 'stock',
          content,
          data: stockData,
          suggestions: [
            'Show me the price trend',
            'Compare with other stocks',
            'Calculate my investment returns',
            'What is the 52-week high/low?'
          ],
          chartData: generateStockChart(stockData),
          source: 'Moneycontrol'
        },
        timestamp: new Date()
      };
    }
    
    // Insurance queries
    if (query.includes('insurance') || query.includes('बीमा') || query.includes('life insurance')) {
      const content = lang === 'hi'
        ? `भारत में शीर्ष जीवन बीमा योजनाएं:\n\n${mockInsurancePlans.map(plan => 
            `• ${plan.name} (${plan.company})\n  - कवरेज: ${plan.coverage}\n  - प्रीमियम: ₹${plan.premium.toLocaleString()}/वर्ष\n  - रेटिंग: ${plan.rating}/5`
          ).join('\n\n')}`
        : `Top life insurance plans in India:\n\n${mockInsurancePlans.map(plan => 
            `• ${plan.name} (${plan.company})\n  - Coverage: ${plan.coverage}\n  - Premium: ₹${plan.premium.toLocaleString()}/year\n  - Rating: ${plan.rating}/5`
          ).join('\n\n')}`;
      
      return {
        query: request.query,
        response: {
          type: 'insurance',
          content,
          data: mockInsurancePlans,
          suggestions: [
            'Calculate premium for my age',
            'Compare insurance plans',
            'Show me health insurance options',
            'What are the tax benefits?'
          ],
          chartData: generateInsuranceChart(),
          source: 'Policybazaar'
        },
        timestamp: new Date()
      };
    }
    
    // Tax queries
    if (query.includes('tax') || query.includes('कर') || query.includes('income tax') || 
        query.includes('आयकर') || query.includes('tax slab')) {
      const content = lang === 'hi'
        ? `2024 के लिए आयकर स्लैब:\n\n${mockTaxSlabs.map(slab => 
            `• ${slab.description}: ${slab.rate}%`
          ).join('\n')}\n\nनोट: यह नई कर व्यवस्था के अनुसार है।`
        : `Income tax slabs for 2024:\n\n${mockTaxSlabs.map(slab => 
            `• ${slab.description}: ${slab.rate}%`
          ).join('\n')}\n\nNote: This is according to the new tax regime.`;
      
      return {
        query: request.query,
        response: {
          type: 'tax',
          content,
          data: mockTaxSlabs,
          suggestions: [
            'Calculate my tax liability',
            'Show tax saving options',
            'Compare old vs new tax regime',
            'What are the deductions available?'
          ],
          chartData: generateTaxChart(),
          source: 'ClearTax'
        },
        timestamp: new Date()
      };
    }
    
    // Loan queries
    if (query.includes('loan') || query.includes('emi') || query.includes('ऋण') || 
        query.includes('home loan') || query.includes('personal loan')) {
      const content = lang === 'hi'
        ? 'होम लोन के लिए EMI कैलकुलेट करने के लिए, मुझे निम्नलिखित जानकारी दें:\n\n• लोन राशि (₹)\n• ब्याज दर (% प्रति वर्ष)\n• अवधि (वर्षों में)\n\nमैं आपके लिए विस्तृत EMI गणना और ब्याज ब्रेकडाउन प्रदान करूंगा।'
        : 'To calculate EMI for home loan, please provide me with:\n\n• Loan amount (₹)\n• Interest rate (% per annum)\n• Tenure (in years)\n\nI\'ll provide you with detailed EMI calculation and interest breakdown.';
      
      return {
        query: request.query,
        response: {
          type: 'loan',
          content,
          data: { needsInput: true },
          suggestions: [
            'Calculate EMI for ₹50L loan at 8.5% for 20 years',
            'Compare different loan options',
            'Show me personal loan rates',
            'What is the processing fee?'
          ],
          source: 'BankBazaar'
        },
        timestamp: new Date()
      };
    }
    
    // General financial advice
    const generalResponses = {
      en: [
        "I can help you with stocks, insurance, loans, taxes, and other financial topics. Please ask your question clearly.",
        "What specific financial information are you looking for? I can assist with investments, savings, and financial planning.",
        "Feel free to ask me about any financial topic. I'm here to help with your money-related queries."
      ],
      hi: [
        "मैं स्टॉक, बीमा, ऋण, कर, और अन्य वित्तीय विषयों में आपकी मदद कर सकता हूं। कृपया अपना प्रश्न स्पष्ट रूप से पूछें।",
        "आप किस विशिष्ट वित्तीय जानकारी की तलाश कर रहे हैं? मैं निवेश, बचत, और वित्तीय योजना में सहायता कर सकता हूं।",
        "किसी भी वित्तीय विषय के बारे में पूछने में संकोच न करें। मैं आपके पैसे से संबंधित प्रश्नों में मदद के लिए यहां हूं।"
      ]
    };
    
    const randomResponse = generalResponses[lang][Math.floor(Math.random() * generalResponses[lang].length)];
    
    return {
      query: request.query,
      response: {
        type: 'general',
        content: randomResponse,
        suggestions: [
          'What is the current market trend?',
          'Best investment options for beginners',
          'How to save tax legally?',
          'Compare different insurance plans',
          'Calculate my retirement corpus'
        ]
      },
      timestamp: new Date()
    };
    
  } catch (error) {
    return {
      query: request.query,
      response: {
        type: 'error',
        content: lang === 'hi' 
          ? 'क्षमा करें, मुझे आपके प्रश्न को समझने में कठिनाई हो रही है। कृपया अपना प्रश्न फिर से पूछें।'
          : 'Sorry, I\'m having trouble understanding your question. Please ask again.',
        suggestions: [
          'Try rephrasing your question',
          'Ask about stocks, insurance, loans, or taxes',
          'Use simpler language'
        ]
      },
      timestamp: new Date()
    };
  }
};

// Additional utility functions
export const getPopularQueries = (lang: 'en' | 'hi' = 'en') => {
  const queries = {
    en: [
      'What is the current price of Reliance stock?',
      'Best life insurance plans in India',
      'Income tax slabs for 2024',
      'How to calculate EMI for home loan?',
      'Compare mutual fund returns',
      'What are the tax saving options?',
      'Stock market trends today',
      'Best investment options for beginners'
    ],
    hi: [
      'रिलायंस का वर्तमान शेयर मूल्य क्या है?',
      'भारत में सर्वश्रेष्ठ जीवन बीमा योजनाएं',
      '2024 के लिए आयकर स्लैब',
      'होम लोन के लिए EMI कैसे कैलकुलेट करें?',
      'म्यूचुअल फंड रिटर्न की तुलना करें',
      'कर बचत के विकल्प क्या हैं?',
      'आज के स्टॉक मार्केट ट्रेंड',
      'शुरुआती लोगों के लिए सर्वश्रेष्ठ निवेश विकल्प'
    ]
  };
  
  return queries[lang];
};

export const getMarketStatus = () => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  
  // Market is open Monday to Friday, 9:15 AM to 3:30 PM IST
  const isWeekday = day >= 1 && day <= 5;
  const isMarketHours = hour >= 9 && hour < 16;
  
  return {
    isOpen: isWeekday && isMarketHours,
    nextOpen: isWeekday && !isMarketHours ? 'Tomorrow 9:15 AM' : 'Monday 9:15 AM',
    currentTime: now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })
  };
};

export default {
  queryFino,
  getPopularQueries,
  getMarketStatus
};
