// Enhanced API service for Fino Finance Chat System
// This simulates real-time data fetching and advanced financial analysis like Perplexity

export interface FinoQueryRequest {
  query: string;
  lang: 'en' | 'hi';
  timestamp?: Date;
  context?: string;
}

export interface FinoQueryResponse {
  query: string;
  response: {
    type: 'stock' | 'insurance' | 'tax' | 'loan' | 'general' | 'error' | 'market' | 'crypto' | 'mutual_fund' | 'news';
    content: string;
    data?: any;
    suggestions?: string[];
    chartData?: any;
    source?: string;
    sources?: string[];
    confidence?: number;
    lastUpdated?: Date;
    realTimeData?: boolean;
  };
  timestamp: Date;
}

export interface StockData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  high52Week: number;
  low52Week: number;
  pe: number;
  sector: string;
  lastUpdated: Date;
}

export interface MarketData {
  index: string;
  value: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdated: Date;
}

export interface InsurancePlan {
  name: string;
  company: string;
  premium: number;
  coverage: string;
  features: string[];
  rating: number;
  claimSettlementRatio: number;
  lastUpdated: Date;
}

export interface TaxSlab {
  minIncome: number;
  maxIncome: number;
  rate: number;
  description: string;
  regime: 'old' | 'new';
}

export interface MutualFund {
  name: string;
  category: string;
  nav: number;
  change: number;
  changePercent: number;
  aum: string;
  expenseRatio: number;
  rating: number;
  lastUpdated: Date;
}

export interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap: string;
  volume24h: string;
  lastUpdated: Date;
}

// Enhanced mock data with real-time simulation
const mockStockData: Record<string, StockData> = {
  'reliance': {
    name: 'Reliance Industries',
    symbol: 'RELIANCE',
    price: 2456.80,
    change: 23.45,
    changePercent: 0.96,
    volume: 1250000,
    marketCap: '₹16.6L Cr',
    high52Week: 2850.00,
    low52Week: 2100.00,
    pe: 18.5,
    sector: 'Oil & Gas',
    lastUpdated: new Date()
  },
  'tcs': {
    name: 'Tata Consultancy Services',
    symbol: 'TCS',
    price: 3856.20,
    change: -45.30,
    changePercent: -1.16,
    volume: 850000,
    marketCap: '₹14.1L Cr',
    high52Week: 4200.00,
    low52Week: 3200.00,
    pe: 25.2,
    sector: 'IT Services',
    lastUpdated: new Date()
  },
  'infosys': {
    name: 'Infosys Limited',
    symbol: 'INFY',
    price: 1456.75,
    change: 12.80,
    changePercent: 0.89,
    volume: 2100000,
    marketCap: '₹6.1L Cr',
    high52Week: 1650.00,
    low52Week: 1200.00,
    pe: 22.8,
    sector: 'IT Services',
    lastUpdated: new Date()
  },
  'hdfc': {
    name: 'HDFC Bank',
    symbol: 'HDFCBANK',
    price: 1656.40,
    change: 8.90,
    changePercent: 0.54,
    volume: 1800000,
    marketCap: '₹12.3L Cr',
    high52Week: 1800.00,
    low52Week: 1400.00,
    pe: 19.2,
    sector: 'Banking',
    lastUpdated: new Date()
  },
  'icici': {
    name: 'ICICI Bank',
    symbol: 'ICICIBANK',
    price: 956.80,
    change: -15.20,
    changePercent: -1.56,
    volume: 2200000,
    marketCap: '₹6.7L Cr',
    high52Week: 1100.00,
    low52Week: 800.00,
    pe: 16.8,
    sector: 'Banking',
    lastUpdated: new Date()
  },
  'sbi': {
    name: 'State Bank of India',
    symbol: 'SBIN',
    price: 556.25,
    change: 5.80,
    changePercent: 1.05,
    volume: 3500000,
    marketCap: '₹4.9L Cr',
    high52Week: 650.00,
    low52Week: 450.00,
    pe: 12.5,
    sector: 'Banking',
    lastUpdated: new Date()
  },
  'wipro': {
    name: 'Wipro Limited',
    symbol: 'WIPRO',
    price: 456.90,
    change: -8.50,
    changePercent: -1.83,
    volume: 1800000,
    marketCap: '₹2.5L Cr',
    high52Week: 550.00,
    low52Week: 380.00,
    pe: 20.1,
    sector: 'IT Services',
    lastUpdated: new Date()
  },
  'bharti': {
    name: 'Bharti Airtel',
    symbol: 'BHARTIARTL',
    price: 856.40,
    change: 12.30,
    changePercent: 1.46,
    volume: 1500000,
    marketCap: '₹4.7L Cr',
    high52Week: 950.00,
    low52Week: 650.00,
    pe: 28.5,
    sector: 'Telecom',
    lastUpdated: new Date()
  },
  'itc': {
    name: 'ITC Limited',
    symbol: 'ITC',
    price: 456.75,
    change: 3.20,
    changePercent: 0.71,
    volume: 2000000,
    marketCap: '₹5.7L Cr',
    high52Week: 500.00,
    low52Week: 380.00,
    pe: 15.2,
    sector: 'FMCG',
    lastUpdated: new Date()
  }
};

const mockMarketData: Record<string, MarketData> = {
  'nifty': {
    index: 'Nifty 50',
    value: 19856.40,
    change: 125.80,
    changePercent: 0.64,
    volume: 45000000,
    lastUpdated: new Date()
  },
  'sensex': {
    index: 'Sensex',
    value: 66523.15,
    change: 425.60,
    changePercent: 0.64,
    volume: 38000000,
    lastUpdated: new Date()
  },
  'nifty_bank': {
    index: 'Nifty Bank',
    value: 45623.80,
    change: -125.40,
    changePercent: -0.27,
    volume: 12000000,
    lastUpdated: new Date()
  }
};

const mockInsurancePlans: InsurancePlan[] = [
  {
    name: 'LIC Jeevan Anand',
    company: 'LIC',
    premium: 25000,
    coverage: '₹50 Lakh',
    features: ['Death Benefit', 'Maturity Benefit', 'Accidental Death', 'Terminal Illness'],
    rating: 4.2,
    claimSettlementRatio: 98.31,
    lastUpdated: new Date()
  },
  {
    name: 'HDFC Life Click 2 Protect 3D Plus',
    company: 'HDFC Life',
    premium: 18000,
    coverage: '₹1 Crore',
    features: ['Life Cover', 'Critical Illness', 'Accidental Death', 'Premium Waiver'],
    rating: 4.5,
    claimSettlementRatio: 99.07,
    lastUpdated: new Date()
  },
  {
    name: 'ICICI Prudential iProtect Smart',
    company: 'ICICI Prudential',
    premium: 22000,
    coverage: '₹75 Lakh',
    features: ['Life Insurance', 'Critical Illness', 'Accidental Death', 'Disability Cover'],
    rating: 4.3,
    claimSettlementRatio: 98.58,
    lastUpdated: new Date()
  }
];

const mockTaxSlabs: TaxSlab[] = [
  {
    minIncome: 0,
    maxIncome: 300000,
    rate: 0,
    description: 'No tax up to ₹3 lakh',
    regime: 'new'
  },
  {
    minIncome: 300001,
    maxIncome: 600000,
    rate: 5,
    description: '5% tax on income above ₹3 lakh',
    regime: 'new'
  },
  {
    minIncome: 600001,
    maxIncome: 900000,
    rate: 10,
    description: '10% tax on income above ₹6 lakh',
    regime: 'new'
  },
  {
    minIncome: 900001,
    maxIncome: 1200000,
    rate: 15,
    description: '15% tax on income above ₹9 lakh',
    regime: 'new'
  },
  {
    minIncome: 1200001,
    maxIncome: 1500000,
    rate: 20,
    description: '20% tax on income above ₹12 lakh',
    regime: 'new'
  },
  {
    minIncome: 1500001,
    maxIncome: Infinity,
    rate: 30,
    description: '30% tax on income above ₹15 lakh',
    regime: 'new'
  }
];

const mockMutualFunds: MutualFund[] = [
  {
    name: 'HDFC Top 100 Fund',
    category: 'Large Cap',
    nav: 856.45,
    change: 12.30,
    changePercent: 1.46,
    aum: '₹12,500 Cr',
    expenseRatio: 1.25,
    rating: 4.5,
    lastUpdated: new Date()
  },
  {
    name: 'ICICI Prudential Bluechip Fund',
    category: 'Large Cap',
    nav: 1256.80,
    change: -8.50,
    changePercent: -0.67,
    aum: '₹8,900 Cr',
    expenseRatio: 1.15,
    rating: 4.3,
    lastUpdated: new Date()
  },
  {
    name: 'HDFC Mid-Cap Opportunities Fund',
    category: 'Mid Cap',
    nav: 456.25,
    change: 15.80,
    changePercent: 3.59,
    aum: '₹6,200 Cr',
    expenseRatio: 1.35,
    rating: 4.2,
    lastUpdated: new Date()
  }
];

const mockCryptoData: Record<string, CryptoData> = {
  'bitcoin': {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 4250000,
    change24h: 125000,
    changePercent24h: 3.03,
    marketCap: '₹83.2L Cr',
    volume24h: '₹2.1L Cr',
    lastUpdated: new Date()
  },
  'ethereum': {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 285000,
    change24h: -8500,
    changePercent24h: -2.90,
    marketCap: '₹34.2L Cr',
    volume24h: '₹1.8L Cr',
    lastUpdated: new Date()
  }
};

// Enhanced query processing with real-time data simulation
export const queryFino = async (request: FinoQueryRequest): Promise<FinoQueryResponse> => {
  const { query, lang = 'en' } = request;
  const queryLower = query.toLowerCase();

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Stock queries with real-time data
  if (queryLower.includes('stock') || queryLower.includes('share') || queryLower.includes('price') || 
      queryLower.includes('शेयर') || queryLower.includes('मूल्य') || queryLower.includes('स्टॉक')) {
    
    const stockName = extractStockName(query);
    if (stockName && mockStockData[stockName]) {
      const stock = mockStockData[stockName];
      const content = lang === 'hi' 
        ? `${stock.name} (${stock.symbol}) का वर्तमान मूल्य ₹${stock.price.toFixed(2)} है।\n\n📊 मार्केट डेटा:\n• परिवर्तन: ₹${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)\n• वॉल्यूम: ${(stock.volume / 100000).toFixed(1)}L\n• मार्केट कैप: ${stock.marketCap}\n• 52-सप्ताह उच्च: ₹${stock.high52Week}\n• 52-सप्ताह निम्न: ₹${stock.low52Week}\n• P/E अनुपात: ${stock.pe}\n• सेक्टर: ${stock.sector}\n\n🕐 अंतिम अपडेट: ${stock.lastUpdated.toLocaleTimeString('hi-IN')}`
        : `${stock.name} (${stock.symbol}) is currently trading at ₹${stock.price.toFixed(2)}.\n\n📊 Market Data:\n• Change: ₹${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)\n• Volume: ${(stock.volume / 100000).toFixed(1)}L\n• Market Cap: ${stock.marketCap}\n• 52-Week High: ₹${stock.high52Week}\n• 52-Week Low: ₹${stock.low52Week}\n• P/E Ratio: ${stock.pe}\n• Sector: ${stock.sector}\n\n🕐 Last Updated: ${stock.lastUpdated.toLocaleTimeString('en-IN')}`;
      
      return {
        query: request.query,
        response: {
          type: 'stock',
          content,
          data: stock,
          suggestions: [
            'Show 1-year chart',
            'Compare with other stocks',
            'Get analyst recommendations',
            'Check news and updates',
            'Calculate returns'
          ],
          chartData: generateStockChart(stock),
          source: 'NSE/BSE Real-time Data',
          sources: ['NSE', 'BSE', 'MoneyControl', 'Economic Times'],
          confidence: 0.95,
          lastUpdated: stock.lastUpdated,
          realTimeData: true
        },
        timestamp: new Date()
      };
    }
  }

  // Market index queries
  if (queryLower.includes('nifty') || queryLower.includes('sensex') || queryLower.includes('market') ||
      queryLower.includes('निफ्टी') || queryLower.includes('सेंसेक्स') || queryLower.includes('बाजार')) {
    
    const indexName = queryLower.includes('nifty') || queryLower.includes('निफ्टी') ? 'nifty' : 'sensex';
    const market = mockMarketData[indexName];
    
    if (market) {
      const content = lang === 'hi'
        ? `${market.index} वर्तमान में ${market.value.toLocaleString('hi-IN')} पर ट्रेड कर रहा है।\n\n📈 मार्केट स्टेटस:\n• परिवर्तन: ${market.change.toLocaleString('hi-IN')} (${market.changePercent.toFixed(2)}%)\n• वॉल्यूम: ${(market.volume / 10000000).toFixed(1)}Cr\n• ट्रेंड: ${market.change >= 0 ? 'बुलिश' : 'बेयरिश'}\n\n🕐 अंतिम अपडेट: ${market.lastUpdated.toLocaleTimeString('hi-IN')}`
        : `${market.index} is currently trading at ${market.value.toLocaleString('en-IN')}.\n\n📈 Market Status:\n• Change: ${market.change.toLocaleString('en-IN')} (${market.changePercent.toFixed(2)}%)\n• Volume: ${(market.volume / 10000000).toFixed(1)}Cr\n• Trend: ${market.change >= 0 ? 'Bullish' : 'Bearish'}\n\n🕐 Last Updated: ${market.lastUpdated.toLocaleTimeString('en-IN')}`;
      
      return {
        query: request.query,
        response: {
          type: 'market',
          content,
          data: market,
          suggestions: [
            'Show market chart',
            'Compare with other indices',
            'Get sector-wise performance',
            'Check market news',
            'View top gainers/losers'
          ],
          chartData: generateMarketChart(market),
          source: 'NSE/BSE Real-time Data',
          sources: ['NSE', 'BSE', 'MoneyControl', 'Economic Times'],
          confidence: 0.98,
          lastUpdated: market.lastUpdated,
          realTimeData: true
        },
        timestamp: new Date()
      };
    }
  }

  // Insurance queries
  if (queryLower.includes('insurance') || queryLower.includes('life insurance') || queryLower.includes('बीमा') || 
      queryLower.includes('जीवन बीमा')) {
    const content = lang === 'hi'
      ? 'भारत में शीर्ष जीवन बीमा योजनाएं:\n\n' + mockInsurancePlans.map(plan => 
          `🏢 ${plan.name} (${plan.company})\n• प्रीमियम: ₹${plan.premium.toLocaleString('hi-IN')}/वर्ष\n• कवरेज: ${plan.coverage}\n• रेटिंग: ${plan.rating}/5 ⭐\n• क्लेम सेटलमेंट: ${plan.claimSettlementRatio}%\n• फीचर्स: ${plan.features.join(', ')}\n`
        ).join('\n')
      : 'Top Life Insurance Plans in India:\n\n' + mockInsurancePlans.map(plan => 
          `🏢 ${plan.name} (${plan.company})\n• Premium: ₹${plan.premium.toLocaleString('en-IN')}/year\n• Coverage: ${plan.coverage}\n• Rating: ${plan.rating}/5 ⭐\n• Claim Settlement: ${plan.claimSettlementRatio}%\n• Features: ${plan.features.join(', ')}\n`
        ).join('\n');

    return {
      query: request.query,
      response: {
        type: 'insurance',
        content,
        data: { plans: mockInsurancePlans },
        suggestions: [
          'Calculate premium for my age',
          'Compare different plans',
          'Check claim settlement ratio',
          'Get tax benefits info',
          'Find best plan for my needs'
        ],
        chartData: generateInsuranceChart(mockInsurancePlans),
        source: 'IRDAI & Insurance Companies',
        sources: ['IRDAI', 'PolicyBazaar', 'BankBazaar', 'Insurance Companies'],
        confidence: 0.92,
        lastUpdated: new Date(),
        realTimeData: false
        },
        timestamp: new Date()
      };
    }
    
    // Tax queries
  if (queryLower.includes('tax') || queryLower.includes('income tax') || queryLower.includes('कर') || 
      queryLower.includes('आयकर')) {
      const content = lang === 'hi'
      ? '2024-25 के लिए नई कर व्यवस्था (New Tax Regime):\n\n' + mockTaxSlabs.map(slab => 
          `• ₹${slab.minIncome.toLocaleString('hi-IN')} - ₹${slab.maxIncome === Infinity ? '∞' : slab.maxIncome.toLocaleString('hi-IN')}: ${slab.rate}% कर\n  ${slab.description}\n`
        ).join('\n') + '\n💡 सुझाव: अपनी आय के अनुसार सबसे अच्छी कर व्यवस्था चुनें।'
      : 'Income Tax Slabs 2024-25 (New Tax Regime):\n\n' + mockTaxSlabs.map(slab => 
          `• ₹${slab.minIncome.toLocaleString('en-IN')} - ₹${slab.maxIncome === Infinity ? '∞' : slab.maxIncome.toLocaleString('en-IN')}: ${slab.rate}% tax\n  ${slab.description}\n`
        ).join('\n') + '\n💡 Tip: Choose the best tax regime based on your income and deductions.';
      
      return {
        query: request.query,
        response: {
          type: 'tax',
          content,
        data: { slabs: mockTaxSlabs },
          suggestions: [
            'Calculate my tax liability',
          'Compare old vs new regime',
          'Find tax saving options',
          'Check deductions available',
          'Get tax planning tips'
        ],
        chartData: generateTaxChart(mockTaxSlabs),
        source: 'Income Tax Department',
        sources: ['Income Tax Dept', 'ClearTax', 'TaxGuru', 'Economic Times'],
        confidence: 0.98,
        lastUpdated: new Date(),
        realTimeData: false
      },
      timestamp: new Date()
    };
  }

  // Mutual Fund queries
  if (queryLower.includes('mutual fund') || queryLower.includes('sip') || queryLower.includes('mf') || 
      queryLower.includes('म्यूचुअल फंड') || queryLower.includes('एसआईपी') || queryLower.includes('निवेश')) {
    const content = lang === 'hi'
      ? 'भारत में शीर्ष म्यूचुअल फंड:\n\n' + mockMutualFunds.map(fund => 
          `📈 ${fund.name}\n• कैटेगरी: ${fund.category}\n• NAV: ₹${fund.nav.toFixed(2)}\n• परिवर्तन: ₹${fund.change.toFixed(2)} (${fund.changePercent.toFixed(2)}%)\n• AUM: ${fund.aum}\n• एक्सपेंस रेशियो: ${fund.expenseRatio}%\n• रेटिंग: ${fund.rating}/5 ⭐\n`
        ).join('\n') + '\n💡 SIP शुरू करने के लिए न्यूनतम ₹500 प्रति माह है।'
      : 'Top Mutual Funds in India:\n\n' + mockMutualFunds.map(fund => 
          `📈 ${fund.name}\n• Category: ${fund.category}\n• NAV: ₹${fund.nav.toFixed(2)}\n• Change: ₹${fund.change.toFixed(2)} (${fund.changePercent.toFixed(2)}%)\n• AUM: ${fund.aum}\n• Expense Ratio: ${fund.expenseRatio}%\n• Rating: ${fund.rating}/5 ⭐\n`
        ).join('\n') + '\n💡 Minimum SIP amount is ₹500 per month.';

    return {
      query: request.query,
      response: {
        type: 'mutual_fund',
        content,
        data: { funds: mockMutualFunds },
        suggestions: [
          'Calculate SIP returns for ₹5000/month',
          'Compare different fund categories',
          'Show me best performing funds',
          'What is the expense ratio?',
          'How to start SIP?'
        ],
        chartData: generateMutualFundChart(mockMutualFunds),
        source: 'AMFI & Fund Houses',
        sources: ['AMFI', 'Value Research', 'Morningstar', 'Fund Houses'],
        confidence: 0.94,
        lastUpdated: new Date(),
        realTimeData: true
        },
        timestamp: new Date()
      };
    }
    
  // Crypto queries
  if (queryLower.includes('crypto') || queryLower.includes('bitcoin') || queryLower.includes('ethereum') ||
      queryLower.includes('क्रिप्टो') || queryLower.includes('बिटकॉइन')) {
    const cryptoName = queryLower.includes('bitcoin') || queryLower.includes('बिटकॉइन') ? 'bitcoin' : 'ethereum';
    const crypto = mockCryptoData[cryptoName];
    
    if (crypto) {
      const content = lang === 'hi'
        ? `${crypto.name} (${crypto.symbol}) का वर्तमान मूल्य ₹${crypto.price.toLocaleString('hi-IN')} है।\n\n💰 क्रिप्टो डेटा:\n• 24h परिवर्तन: ₹${crypto.change24h.toLocaleString('hi-IN')} (${crypto.changePercent24h.toFixed(2)}%)\n• मार्केट कैप: ${crypto.marketCap}\n• 24h वॉल्यूम: ${crypto.volume24h}\n• ट्रेंड: ${crypto.changePercent24h >= 0 ? 'बुलिश' : 'बेयरिश'}\n\n🕐 अंतिम अपडेट: ${crypto.lastUpdated.toLocaleTimeString('hi-IN')}`
        : `${crypto.name} (${crypto.symbol}) is currently trading at ₹${crypto.price.toLocaleString('en-IN')}.\n\n💰 Crypto Data:\n• 24h Change: ₹${crypto.change24h.toLocaleString('en-IN')} (${crypto.changePercent24h.toFixed(2)}%)\n• Market Cap: ${crypto.marketCap}\n• 24h Volume: ${crypto.volume24h}\n• Trend: ${crypto.changePercent24h >= 0 ? 'Bullish' : 'Bearish'}\n\n🕐 Last Updated: ${crypto.lastUpdated.toLocaleTimeString('en-IN')}`;
      
      return {
        query: request.query,
        response: {
          type: 'crypto',
          content,
          data: crypto,
          suggestions: [
            'Show price chart',
            'Compare with other cryptos',
            'Get market analysis',
            'Check trading volume',
            'View price predictions'
          ],
          chartData: generateCryptoChart(crypto),
          source: 'Crypto Exchanges',
          sources: ['CoinMarketCap', 'CoinGecko', 'WazirX', 'CoinDCX'],
          confidence: 0.96,
          lastUpdated: crypto.lastUpdated,
          realTimeData: true
        },
        timestamp: new Date()
      };
    }
    }
    
    // General financial advice
  const content = lang === 'hi'
    ? `मैं आपकी वित्तीय जरूरतों में मदद कर सकता हूं! मैं निम्नलिखित विषयों पर जानकारी प्रदान कर सकता हूं:\n\n📈 **स्टॉक और मार्केट**: शेयर कीमतें, निफ्टी, सेंसेक्स\n💰 **निवेश**: म्यूचुअल फंड, SIP, पोर्टफोलियो\n🏦 **बैंकिंग**: लोन, EMI, बचत खाते\n🛡️ **बीमा**: जीवन बीमा, स्वास्थ्य बीमा\n📊 **कर**: आयकर, कर बचत योजनाएं\n💎 **क्रिप्टो**: बिटकॉइन, एथेरियम\n\nकृपया अपना सवाल पूछें!`
    : `I can help you with your financial needs! I can provide information on:\n\n📈 **Stocks & Market**: Share prices, Nifty, Sensex\n💰 **Investments**: Mutual funds, SIP, portfolio\n🏦 **Banking**: Loans, EMI, savings accounts\n🛡️ **Insurance**: Life insurance, health insurance\n📊 **Taxes**: Income tax, tax saving schemes\n💎 **Crypto**: Bitcoin, Ethereum\n\nPlease ask me your question!`;
    
    return {
      query: request.query,
      response: {
        type: 'general',
      content,
      data: { category: 'general' },
        suggestions: [
        'What is the current Nifty 50?',
        'Best mutual funds for SIP',
        'Income tax slabs 2024',
        'Life insurance plans comparison',
        'How to calculate EMI?'
      ],
      source: 'Fino AI',
      sources: ['Fino AI', 'Financial Data Sources'],
      confidence: 0.85,
      lastUpdated: new Date(),
      realTimeData: false
      },
      timestamp: new Date()
  };
};

// Helper functions
const extractStockName = (query: string): string | null => {
  const queryLower = query.toLowerCase();
  const stockMap: Record<string, string> = {
    'reliance': 'reliance',
    'ril': 'reliance',
    'tcs': 'tcs',
    'infosys': 'infosys',
    'infy': 'infosys',
    'hdfc': 'hdfc',
    'hdfc bank': 'hdfc',
    'icici': 'icici',
    'icici bank': 'icici',
    'sbi': 'sbi',
    'state bank': 'sbi',
    'wipro': 'wipro',
    'bharti': 'bharti',
    'airtel': 'bharti',
    'itc': 'itc'
  };

  for (const [key, value] of Object.entries(stockMap)) {
    if (queryLower.includes(key)) {
      return value;
    }
  }
  return null;
};

const generateStockChart = (stock: StockData) => ({
  type: 'line',
  data: {
    labels: ['9:15 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '3:30 PM'],
    datasets: [{
      label: `${stock.symbol} Price`,
      data: [
        stock.price - stock.change - 10,
        stock.price - stock.change - 5,
        stock.price - stock.change + 2,
        stock.price - stock.change + 8,
        stock.price - stock.change + 5,
        stock.price - stock.change + 12,
        stock.price - stock.change + 8,
        stock.price
      ],
      borderColor: stock.change >= 0 ? '#10B981' : '#EF4444',
      backgroundColor: stock.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
      tension: 0.4
    }]
  }
});

const generateMarketChart = (market: MarketData) => ({
  type: 'area',
  data: {
    labels: ['9:15 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '3:30 PM'],
    datasets: [{
      label: market.index,
      data: [
        market.value - market.change - 50,
        market.value - market.change - 25,
        market.value - market.change + 10,
        market.value - market.change + 30,
        market.value - market.change + 20,
        market.value - market.change + 40,
        market.value - market.change + 25,
        market.value
      ],
      borderColor: market.change >= 0 ? '#10B981' : '#EF4444',
      backgroundColor: market.change >= 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
      tension: 0.4
    }]
  }
});

const generateInsuranceChart = (plans: InsurancePlan[]) => ({
  type: 'bar',
  data: {
    labels: plans.map(plan => plan.company),
    datasets: [{
      label: 'Claim Settlement Ratio (%)',
      data: plans.map(plan => plan.claimSettlementRatio),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
      borderColor: ['#2563EB', '#059669', '#D97706'],
      borderWidth: 2
    }]
  }
});

const generateTaxChart = (slabs: TaxSlab[]) => ({
  type: 'doughnut',
  data: {
    labels: slabs.map(slab => `${slab.rate}%`),
    datasets: [{
      data: slabs.map(slab => slab.rate),
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'],
      borderWidth: 2
    }]
  }
});

const generateMutualFundChart = (funds: MutualFund[]) => ({
  type: 'pie',
  data: {
    labels: funds.map(fund => fund.name),
    datasets: [{
      data: funds.map(fund => fund.nav),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
      borderWidth: 2
    }]
  }
});

const generateCryptoChart = (crypto: CryptoData) => ({
  type: 'line',
  data: {
    labels: ['12:00 AM', '4:00 AM', '8:00 AM', '12:00 PM', '4:00 PM', '8:00 PM', '12:00 AM'],
    datasets: [{
      label: `${crypto.symbol} Price`,
      data: [
        crypto.price - crypto.change24h - 50000,
        crypto.price - crypto.change24h - 25000,
        crypto.price - crypto.change24h + 10000,
        crypto.price - crypto.change24h + 30000,
        crypto.price - crypto.change24h + 20000,
        crypto.price - crypto.change24h + 40000,
        crypto.price
      ],
      borderColor: crypto.changePercent24h >= 0 ? '#10B981' : '#EF4444',
      backgroundColor: crypto.changePercent24h >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
      tension: 0.4
    }]
  }
});

export const getPopularQueries = (lang: 'en' | 'hi' = 'en'): string[] => {
  if (lang === 'hi') {
    return [
      'रिलायंस का वर्तमान शेयर मूल्य क्या है?',
      'निफ्टी 50 की वर्तमान स्थिति',
      'सर्वश्रेष्ठ म्यूचुअल फंड',
      '2024 के लिए आयकर स्लैब',
      'जीवन बीमा योजनाएं',
      'बिटकॉइन की कीमत',
      'EMI कैलकुलेटर',
      'SIP निवेश योजना'
    ];
  }
  
  return [
    'What is the current price of Reliance stock?',
    'Current Nifty 50 status',
    'Best mutual funds for investment',
    'Income tax slabs 2024',
    'Life insurance plans comparison',
    'Bitcoin price today',
    'EMI calculator for home loan',
    'SIP investment planning'
  ];
};