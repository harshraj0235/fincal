// Stock API Service for real-time data integration
const ALPHA_VANTAGE_API_KEY = 'W76F2HDWELS8UUB2';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface StockOverview {
  symbol: string;
  name: string;
  description: string;
  exchange: string;
  currency: string;
  country: string;
  sector: string;
  industry: string;
  marketCap: string;
  peRatio: string;
  dividendYield: string;
  eps: string;
  bookValue: string;
  roe: string;
  debtToEquity: string;
  beta: string;
  high52Week: string;
  low52Week: string;
}

export interface StockSearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

// Cache for API responses to avoid rate limiting
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = <T>(key: string): T | null => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  return null;
};

const setCachedData = <T>(key: string, data: T) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Get real-time stock quote
export const getStockQuote = async (symbol: string): Promise<StockQuote | null> => {
  try {
    const cacheKey = `quote_${symbol}`;
    const cached = getCachedData<StockQuote>(cacheKey);
    if (cached) return cached;

    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: Record<string, unknown> = await response.json();
    
    if (typeof data['Error Message'] === 'string') {
      throw new Error(data['Error Message']);
    }
    
    const quote = data['Global Quote'] as Record<string, string> | undefined;
    if (!quote) {
      return null;
    }
    
    const stockQuote: StockQuote = {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      open: parseFloat(quote['02. open']),
      previousClose: parseFloat(quote['08. previous close'])
    };
    
    setCachedData(cacheKey, stockQuote);
    return stockQuote;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return null;
  }
};

// Get stock overview/company information
export const getStockOverview = async (symbol: string): Promise<StockOverview | null> => {
  try {
    const cacheKey = `overview_${symbol}`;
    const cached = getCachedData<StockOverview>(cacheKey);
    if (cached) return cached;

    const response = await fetch(
      `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: Record<string, string> = await response.json();
    
    if (typeof data['Error Message'] === 'string') {
      throw new Error(data['Error Message']);
    }
    
    if (!data.Symbol) {
      return null;
    }
    
    const overview: StockOverview = {
      symbol: data.Symbol,
      name: data.Name,
      description: data.Description,
      exchange: data.Exchange,
      currency: data.Currency,
      country: data.Country,
      sector: data.Sector,
      industry: data.Industry,
      marketCap: data.MarketCapitalization,
      peRatio: data.PERatio,
      dividendYield: data.DividendYield,
      eps: data.EPS,
      bookValue: data.BookValue,
      roe: data.ReturnOnEquityTTM,
      debtToEquity: data.DebtToEquityRatio,
      beta: data.Beta,
      high52Week: data['52WeekHigh'],
      low52Week: data['52WeekLow']
    };
    
    setCachedData(cacheKey, overview);
    return overview;
  } catch (error) {
    console.error('Error fetching stock overview:', error);
    return null;
  }
};

// Search for stocks
export const searchStocks = async (query: string): Promise<StockSearchResult[]> => {
  try {
    const cacheKey = `search_${query}`;
    const cached = getCachedData<StockSearchResult[]>(cacheKey);
    if (cached) return cached;

    const response = await fetch(
      `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: Record<string, unknown> = await response.json();
    
    if (typeof data['Error Message'] === 'string') {
      throw new Error(data['Error Message']);
    }
    
    const results = Array.isArray(data.bestMatches) ? data.bestMatches as Array<Record<string, string>> : [];
    const searchResults: StockSearchResult[] = results.map((match) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      marketOpen: match['5. marketOpen'],
      marketClose: match['6. marketClose'],
      timezone: match['7. timezone'],
      currency: match['8. currency'],
      matchScore: match['9. matchScore']
    }));
    
    setCachedData(cacheKey, searchResults);
    return searchResults;
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
};

// Get multiple stock quotes for screener
export const getMultipleStockQuotes = async (symbols: string[]): Promise<StockQuote[]> => {
  const quotes: StockQuote[] = [];
  
  // Process in batches to avoid rate limiting
  const batchSize = 5;
  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize);
    const batchPromises = batch.map(symbol => getStockQuote(symbol));
    
    try {
      const batchResults = await Promise.all(batchPromises);
      quotes.push(...batchResults.filter(quote => quote !== null) as StockQuote[]);
      
      // Add delay between batches to respect rate limits
      if (i + batchSize < symbols.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error fetching batch quotes:', error);
    }
  }
  
  return quotes;
};

// Get popular Indian stocks (NSE symbols)
export const getPopularIndianStocks = (): string[] => {
  return [
    'RELIANCE.BSE',
    'TCS.BSE',
    'HDFCBANK.BSE',
    'INFY.BSE',
    'ICICIBANK.BSE',
    'HINDUNILVR.BSE',
    'ITC.BSE',
    'SBIN.BSE',
    'BHARTIARTL.BSE',
    'KOTAKBANK.BSE',
    'AXISBANK.BSE',
    'ASIANPAINT.BSE',
    'MARUTI.BSE',
    'SUNPHARMA.BSE',
    'TATAMOTORS.BSE',
    'WIPRO.BSE',
    'ULTRACEMCO.BSE',
    'TITAN.BSE',
    'BAJFINANCE.BSE',
    'NESTLEIND.BSE'
  ];
};

// Get sector-wise stock lists
export const getSectorStocks = (): { [key: string]: string[] } => {
  return {
    'Information Technology': ['TCS.BSE', 'INFY.BSE', 'WIPRO.BSE', 'HCLTECH.BSE', 'TECHM.BSE'],
    'Banking': ['HDFCBANK.BSE', 'ICICIBANK.BSE', 'SBIN.BSE', 'KOTAKBANK.BSE', 'AXISBANK.BSE'],
    'Oil & Gas': ['RELIANCE.BSE', 'ONGC.BSE', 'IOC.BSE', 'BPCL.BSE', 'HPCL.BSE'],
    'FMCG': ['HINDUNILVR.BSE', 'ITC.BSE', 'NESTLEIND.BSE', 'BRITANNIA.BSE', 'MARICO.BSE'],
    'Automobile': ['MARUTI.BSE', 'TATAMOTORS.BSE', 'M&M.BSE', 'BAJAJ-AUTO.BSE', 'HEROMOTOCO.BSE'],
    'Pharmaceuticals': ['SUNPHARMA.BSE', 'DRREDDY.BSE', 'CIPLA.BSE', 'DIVISLAB.BSE', 'APOLLOHOSP.BSE']
  };
};

// Utility function to format market cap
export const formatMarketCap = (marketCap: string): string => {
  if (!marketCap) return 'N/A';
  
  const num = parseFloat(marketCap);
  if (isNaN(num)) return marketCap;
  
  if (num >= 100000000000) {
    return `${(num / 100000000000).toFixed(1)}L Cr`;
  } else if (num >= 10000000000) {
    return `${(num / 10000000000).toFixed(1)}K Cr`;
  } else if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}Cr`;
  } else {
    return `${num.toLocaleString()}`;
  }
};

// Utility function to format percentage
export const formatPercentage = (value: string | number): string => {
  if (!value) return 'N/A';
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return 'N/A';
  
  return `${num.toFixed(2)}%`;
};

// Utility function to format currency
export const formatCurrency = (value: string | number, currency: string = 'INR'): string => {
  if (!value) return 'N/A';
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return 'N/A';
  
  return `${currency} ${num.toLocaleString()}`;
};
