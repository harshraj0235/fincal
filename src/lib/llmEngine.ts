import { calculatorCategories } from '../data/calculatorData';
import { searchWeb, SearchResult } from './searchEngine';

// ───────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────
export type ContentItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  keywords: string;
  type: 'calculator' | 'hub' | 'blog' | 'news' | 'scheme' | 'page' | 'discover';
};

export type ResearchMode = 'general' | 'stocks' | 'tax' | 'schemes' | 'news';

export type SourceLink = {
  title: string;
  url: string;
  domain: string;
};

export type LLMResponse = {
  answer: string;
  sources: SourceLink[];
  recommendations: ContentItem[];
  calculatorType?: 'sip' | 'emi';
  followUpQuestions?: string[];
};

export type CoreChatMessage = { role: 'user' | 'assistant'; content: string };

// ───────────────────────────────────────────────────────
// OpenRouter API Configuration
// ───────────────────────────────────────────────────────
const OPENROUTER_API_KEY = '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';
const OPENROUTER_MODEL = 'meta-llama/llama-4-maverick';
const OPENROUTER_API_URL = `https://openrouter.ai/api/v1/chat/completions`;

// ───────────────────────────────────────────────────────
// Response Cache (1-hour TTL)
// ───────────────────────────────────────────────────────
const responseCache = new Map<string, { response: LLMResponse; timestamp: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function getCacheKey(query: string, mode: ResearchMode): string {
  return `${mode}::${query.trim().toLowerCase()}`;
}

function getCachedResponse(query: string, mode: ResearchMode): LLMResponse | null {
  const key = getCacheKey(query, mode);
  const cached = responseCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.response;
  }
  if (cached) responseCache.delete(key); // expired
  return null;
}

function setCachedResponse(query: string, mode: ResearchMode, response: LLMResponse): void {
  const key = getCacheKey(query, mode);
  // Keep cache size manageable
  if (responseCache.size > 100) {
    const firstKey = responseCache.keys().next().value;
    if (firstKey) responseCache.delete(firstKey);
  }
  responseCache.set(key, { response, timestamp: Date.now() });
}

// ───────────────────────────────────────────────────────
// Research Mode — Mode-specific prompt instructions
// ───────────────────────────────────────────────────────
function getResearchModeInstruction(mode: ResearchMode): string {
  switch (mode) {
    case 'stocks':
      return `\n## RESEARCH MODE: STOCKS 📊
- You are in STOCK ANALYSIS mode. The user wants detailed stock market information.
- ALWAYS render a \`\`\`stock TICKER\`\`\` widget for any company mentioned.
- Include: PE ratio, 52-week high/low, sector comparison, promoter holding if known.
- Mention recent quarterly results, revenue growth, profit margins.
- Compare with sector peers when relevant.
- Add a \`\`\`chart\`\`\` widget to visualize comparisons if useful.\n`;
    case 'tax':
      return `\n## RESEARCH MODE: TAX 💰
- You are in TAX ANALYSIS mode. The user wants detailed Indian tax information.
- ALWAYS use FY 2025-26 tax slabs and rules.
- ALWAYS include a comparison table of Old vs New Tax Regime when relevant.
- Mention specific sections: 80C, 80D, 80G, 80E, 80TTA, 24(b), HRA exemption.
- Calculate exact tax amounts with step-by-step breakdown.
- Recommend MoneyCal's Income Tax Calculator for personalized calculations.\n`;
    case 'schemes':
      return `\n## RESEARCH MODE: GOVERNMENT SCHEMES 🏦
- You are in GOVERNMENT SCHEMES mode. The user wants scheme details.
- List: Eligibility criteria, required documents, application process (step-by-step), official website link.
- Mention the scheme's budget allocation and number of beneficiaries if known.
- Compare with similar schemes when relevant.
- Always mention the official portal URL for applying.\n`;
    case 'news':
      return `\n## RESEARCH MODE: NEWS 📰
- You are in FINANCIAL NEWS mode. The user wants latest market/financial news.
- Focus on latest developments with specific dates.
- Provide market impact analysis — how this news affects investors.
- Cite sources with [1], [2] etc.
- Give actionable takeaways — what should investors do in response.
- Mention related stocks/sectors that are affected.\n`;
    default:
      return '';
  }
}

function getSearchQueryPrefix(mode: ResearchMode): string {
  switch (mode) {
    case 'stocks': return 'India stock market analysis ';
    case 'tax': return 'India income tax FY 2025-26 ';
    case 'schemes': return 'Indian government scheme details ';
    case 'news': return 'latest India financial news today ';
    default: return '';
  }
}

// ───────────────────────────────────────────────────────
// System Prompt — The "Brain" of Finance GPT
// ───────────────────────────────────────────────────────
function buildSystemPrompt(userProfile: 'beginner' | 'expert', contextSnippet: string, webSnippet: string, researchMode: ResearchMode = 'general'): string {
  const modeInstruction = getResearchModeInstruction(researchMode);
  const profileInstruction = userProfile === 'beginner'
    ? 'User is a BEGINNER. Use very simple language, avoid jargon, explain terms, give relatable examples like "chai ka budget" or "monthly salary". Be encouraging and patient.'
    : 'User is a finance EXPERT. Be precise, use technical terms, give advanced strategies, cite specific sections of law.';

  return `You are **MoneyCal AI** — India's #1 AI-Powered Assistant, built by MoneyCal.in.

## YOUR IDENTITY
- You are a friendly, intelligent assistant who speaks naturally in **Hinglish** (a natural mix of Hindi and English, like how educated Indians talk).
- You are an EXPERT in Indian personal finance, taxes, investments, banking, government schemes, and markets.
- BUT you can ALSO answer ANY general question on any topic — technology, science, health, education, career, cooking, travel, history, entertainment, sports, relationships, coding, etc.
- Your name is "MoneyCal AI". Always identify as this.
- For FINANCE questions: give detailed, data-driven, actionable answers with calculations.
- For NON-FINANCE questions: give helpful, accurate, well-structured answers. Still use Hinglish. Still be warm and conversational.

## LANGUAGE RULES (CRITICAL)
- ALWAYS respond in **Hinglish** — mix Hindi and English naturally. Example: "SIP एक बहुत ही powerful wealth creation tool है। ₹5,000 per month invest करने से 20 साल में ₹49.9 lakh बन सकते हैं at 12% returns!"
- Use **Devanagari script** for Hindi words, English for technical terms.
- NEVER respond in pure English or pure Hindi. Always Hinglish.
- Use emojis strategically: 📊📈💰🏦💡🎯✅❌⚠️🔬🌍📱 to make answers scannable.

## RESPONSE FORMAT RULES
1. **Start with a QUICK ANSWER BOX** — The very first thing in your response should be a 1-2 line direct answer in bold. Example:
   **💡 Quick Answer: SIP में ₹5,000/month invest करने से 20 साल में ~₹49.9 lakh बन सकते हैं (at 12% returns)।**
2. **Numbers first.** For finance questions, always lead with concrete numbers, calculations, rates. Users want facts, not theory.
3. **Use Markdown formatting:**
   - Use **bold** for key terms and numbers
   - Use bullet points for lists
   - Use tables for comparisons (e.g., Old vs New Tax Regime)
   - Use ### headings to organize long answers
4. **End with KEY TAKEAWAY** — Before the follow-up questions, add:
   ### 🎯 Key Takeaway
   A 2-3 line boxed summary of the most important point.
5. **Include ACTION STEPS** — Give numbered, clear, actionable steps the user can take right now.

## GENERATIVE UI (WIDGETS & CHARTS) — LIVE DATA
You have the ability to render beautiful interactive widgets with **LIVE real-time data** directly in the chat.
1. **Stock Widget (LIVE PRICE)**: If the user asks about ANY stock's price, analysis, or mentions a company name, you MUST output a stock widget block. This will show LIVE current price, change, high, low, open, volume — all fetched in real-time from Yahoo Finance.
   - For NSE stocks: append .NS (e.g., RELIANCE.NS, TCS.NS, HDFCBANK.NS)
   - For BSE stocks: append .BO (e.g., RELIANCE.BO)
   - For US stocks: use directly (e.g., AAPL, GOOGL, TSLA)
   - For indices: ^NSEI (Nifty 50), ^BSESN (Sensex)
   - ALWAYS output the stock widget FIRST, then provide your analysis.
   Example:
   \`\`\`stock
   RELIANCE.NS
   \`\`\`
   Common tickers: RELIANCE.NS, TCS.NS, HDFCBANK.NS, INFY.NS, ICICIBANK.NS, SBIN.NS, BHARTIARTL.NS, ITC.NS, HINDUNILVR.NS, TATAMOTORS.NS, WIPRO.NS, LT.NS, BAJFINANCE.NS, MARUTI.NS, ADANIENT.NS, TATASTEEL.NS
2. **Chart Widget**: If the user asks for a comparison, trend, or anything that involves data points (e.g., "FD vs SIP returns"), you MUST output a chart widget block containing valid JSON.
   Example:
   \`\`\`chart
   {
     "title": "SIP vs FD Returns (10 Years)",
     "type": "bar",
     "yAxisFormatter": "currency",
     "data": [
       {"name": "FD", "value": 1500000},
       {"name": "SIP", "value": 2500000}
     ]
   }
   \`\`\`

## ENDING RULES
1. **Every answer MUST end with:**
   - 🎯 **अगला कदम** (Next Step) — A clear action the user can take
   - 🔗 If finance-related, recommend 1-2 relevant MoneyCal calculators/tools from the context below
2. **Always provide 3 follow-up questions** at the very end, formatted exactly like this:
   \`\`\`
   ---
   **💡 और जानना चाहते हैं?**
   1. [follow-up question 1]
   2. [follow-up question 2]
   3. [follow-up question 3]
   \`\`\`

## FINANCIAL ACCURACY RULES
- Always use **FY 2025-26** tax slabs and rules (latest).
- New Tax Regime is DEFAULT. Old Regime is opt-in.
- Standard Deduction: ₹75,000 (New Regime), ₹50,000 (Old Regime).
- Section 87A Rebate: Up to ₹12 lakh (New), ₹5 lakh (Old).
- EPF interest rate: 8.25% (2025-26).
- PPF interest rate: 7.1%.
- Repo Rate: 6.00% (as of June 2026).
- **Stock prices**: You CAN show LIVE stock prices! Use the \`\`\`stock TICKER\`\`\` widget — it fetches real-time data from Yahoo Finance. ALWAYS use it when user asks about a stock.
- **Gold/Silver rates**: Use web search results for latest rates. Also recommend MoneyCal's [gold rate page](/gold-rate) and [silver rate page](/silver-rate).
- For ANY live data question (stock price, gold rate, crypto, currency exchange), ALWAYS search the web first and provide the most recent data from search results.

## HANDLING NON-FINANCE QUESTIONS
- If user asks about technology, health, science, career, cooking, travel, sports, entertainment, coding, AI, or ANY other topic:
  - ANSWER IT properly and helpfully. Do NOT refuse or redirect to finance.
  - Use the same Hinglish style. Be equally detailed and helpful.
  - At the end, you can casually mention "MoneyCal पर finance से related कोई भी सवाल भी पूछ सकते हैं 😊" but DON'T force it.
- NEVER say "I can only answer finance questions." You are a GENERAL AI assistant with finance expertise.

## LIVE WEB CONTEXT (Real-Time Search Results & Scraped Pages)
Use the following real-time web search results (including full scraped content) to answer the user's query if it requires live data, news, or recent information.

**CITATION RULE (CRITICAL):**
- When you use information from a source, you MUST cite it INLINE at the end of the sentence like this: \`[1]\` or \`[2]\`.
- DO NOT use markdown links like \`[1](url)\`. Just use the bracketed number \`[1]\` which corresponds to the source number provided below.
- Do NOT provide a bibliography or list of sources at the end. The system will handle that. Just use the inline numbers.

${webSnippet}
${modeInstruction}
## CALCULATOR RECOMMENDATIONS
When relevant, naturally recommend MoneyCal calculators. Here's your available toolkit:
${contextSnippet}

## USER PROFILE
${profileInstruction}

## SAFETY & COMPLIANCE
- Add "⚠️ Disclaimer: यह financial advice नहीं है। Investment decisions लेने से पहले certified financial advisor से consult करें।" on ANY investment/stock/mutual fund advice.
- NEVER give specific stock buy/sell recommendations.
- NEVER predict market movements ("market will go up/down").
- For government schemes, cite official sources.
- For health questions, suggest consulting a doctor for serious concerns.

## WHAT YOU MUST NEVER DO
- Never refuse a question just because it's not finance-related. ANSWER EVERYTHING.
- Never give generic filler responses. Every sentence must add value.
- Never break character. You are always MoneyCal AI.
- Never use formal/robotic language. Be warm, conversational, like a smart friend.`;
}

// ───────────────────────────────────────────────────────
// Search Content Index (kept from original)
// ───────────────────────────────────────────────────────
export function searchContentIndex(query: string, allItems: ContentItem[]): ContentItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(w => w.length >= 2);
  const scored = allItems.map((item) => {
    const title = (item.title || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const kw = (item.keywords || '').toLowerCase();
    let score = 0;
    if (title.includes(q)) score += 10;
    if (kw.includes(q)) score += 6;
    if (desc.includes(q)) score += 4;
    for (const word of words) {
      if (title.includes(word)) score += 3;
      if (kw.includes(word)) score += 2;
      if (desc.includes(word)) score += 1;
    }
    if (title.startsWith(q)) score += 5;
    return { item, score };
  }).filter(e => e.score > 0).sort((a, b) => b.score - a.score);

  const unique = new Map<string, ContentItem>();
  scored.forEach(({ item }) => { if (!unique.has(item.url)) unique.set(item.url, item); });
  return Array.from(unique.values()).slice(0, 8);
}

// ───────────────────────────────────────────────────────
// Build Context Snippet from Content Index
// ───────────────────────────────────────────────────────
function buildContextSnippet(items: ContentItem[]): string {
  if (items.length === 0) return 'No specific tools matched. Suggest browsing https://moneycal.in/calculators';

  const grouped: Record<string, ContentItem[]> = {};
  items.forEach(item => {
    const cat = item.type;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  let snippet = '';
  for (const [type, entries] of Object.entries(grouped)) {
    snippet += `\n### ${type.toUpperCase()}S:\n`;
    entries.slice(0, 5).forEach(e => {
      snippet += `- **${e.title}** → https://moneycal.in${e.url} — ${e.description}\n`;
    });
  }
  return snippet;
}

// ───────────────────────────────────────────────────────
// Extract Follow-up Questions from AI Response
// ───────────────────────────────────────────────────────
function extractFollowUpQuestions(text: string): { cleanedText: string; questions: string[] } {
  const questions: string[] = [];

  // Try to find the follow-up section
  const followUpRegex = /---\s*\n\*?\*?💡.*?\*?\*?\s*\n([\s\S]*?)$/;
  const match = text.match(followUpRegex);

  if (match) {
    const followUpSection = match[1];
    const lines = followUpSection.split('\n').filter(l => l.trim());
    lines.forEach(line => {
      const cleaned = line.replace(/^\d+\.\s*/, '').replace(/\[|\]/g, '').trim();
      if (cleaned.length > 5 && cleaned.length < 100) {
        questions.push(cleaned);
      }
    });
    // Remove the follow-up section from the main text
    const cleanedText = text.substring(0, text.indexOf(match[0])).trim();
    return { cleanedText, questions };
  }

  return { cleanedText: text, questions };
}

// ───────────────────────────────────────────────────────
// Detect Calculator Type from Query
// ───────────────────────────────────────────────────────
function detectCalculatorType(query: string): 'sip' | 'emi' | undefined {
  const q = query.toLowerCase();
  if (q.includes('sip') || q.includes('systematic investment')) return 'sip';
  if (q.includes('emi') || q.includes('home loan') || q.includes('car loan') || q.includes('personal loan')) return 'emi';
  return undefined;
}

// ───────────────────────────────────────────────────────
// Generate Sources from Response
// ───────────────────────────────────────────────────────
function generateSources(query: string): SourceLink[] {
  const q = query.toLowerCase();
  const sources: SourceLink[] = [];

  if (q.includes('tax') || q.includes('टैक्स') || q.includes('80c') || q.includes('itr')) {
    sources.push({ title: 'Income Tax India', url: 'https://incometaxindia.gov.in/', domain: 'incometaxindia.gov.in' });
  }
  if (q.includes('ipo') || q.includes('share') || q.includes('stock') || q.includes('nifty') || q.includes('sensex')) {
    sources.push({ title: 'NSE India', url: 'https://www.nseindia.com/', domain: 'nseindia.com' });
  }
  if (q.includes('mutual fund') || q.includes('sip') || q.includes('म्यूचुअल')) {
    sources.push({ title: 'AMFI India', url: 'https://www.amfiindia.com/', domain: 'amfiindia.com' });
  }
  if (q.includes('gold') || q.includes('सोना') || q.includes('silver') || q.includes('चांदी')) {
    sources.push({ title: 'India Bullion Association', url: 'https://www.ibja.co/', domain: 'ibja.co' });
  }
  if (q.includes('loan') || q.includes('emi') || q.includes('repo') || q.includes('rbi')) {
    sources.push({ title: 'Reserve Bank of India', url: 'https://rbi.org.in/', domain: 'rbi.org.in' });
  }
  if (q.includes('epf') || q.includes('pf') || q.includes('provident') || q.includes('pension')) {
    sources.push({ title: 'EPFO', url: 'https://www.epfindia.gov.in/', domain: 'epfindia.gov.in' });
  }
  if (q.includes('gst')) {
    sources.push({ title: 'GST Portal', url: 'https://www.gst.gov.in/', domain: 'gst.gov.in' });
  }
  if (q.includes('insurance') || q.includes('bima') || q.includes('बीमा')) {
    sources.push({ title: 'IRDAI', url: 'https://www.irdai.gov.in/', domain: 'irdai.gov.in' });
  }

  // Always add MoneyCal as a source
  sources.push({ title: 'MoneyCal.in', url: 'https://moneycal.in', domain: 'moneycal.in' });

  return sources.slice(0, 4);
}

// ───────────────────────────────────────────────────────
// Generate Dynamic Follow-up Questions (no separate API call — extracted from main response)
// ───────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────
// Streaming Gemini API Call
// ───────────────────────────────────────────────────────
export async function streamGeminiResponse(
  query: string,
  contentIndex: ContentItem[],
  chatHistory: CoreChatMessage[] = [],
  userProfile: 'beginner' | 'expert' = 'beginner',
  onChunk: (text: string) => void,
  onThinkingUpdate: (step: string) => void,
  researchMode: ResearchMode = 'general'
): Promise<LLMResponse> {
  // Check cache first for identical queries
  const cached = getCachedResponse(query, researchMode);
  if (cached) {
    onThinkingUpdate('⚡ Cache se instant answer mil gaya!');
    onChunk(cached.answer);
    return cached;
  }
  // Step 1: Search content index for relevant tools
  onThinkingUpdate('🔍 MoneyCal knowledge base search कर रहा हूँ...');
  const localResults = searchContentIndex(query, contentIndex);
  const contextSnippet = buildContextSnippet(localResults.length > 0 ? localResults : contentIndex.slice(0, 15));

  // Step 1.5: Perform Live Web Search with Full Scraped Content
  onThinkingUpdate('🌐 Live Web Search कर रहा हूँ...');
  const searchQuery = getSearchQueryPrefix(researchMode) + query;
  const webResults = await searchWeb(searchQuery, true);
  let webSnippet = 'No live web context found.';
  if (webResults.length > 0) {
    webSnippet = webResults.map((r, i) => `[${i + 1}] Title: ${r.title}\nURL: ${r.url}\nSnippet: ${r.snippet}\nFull Content: ${r.fullContent || 'N/A'}\n`).join('\n');
  }

  // Step 2: Build system prompt
  onThinkingUpdate('🧠 आपके सवाल को समझ रहा हूँ...');
  const systemPrompt = buildSystemPrompt(userProfile, contextSnippet, webSnippet, researchMode);

  // Step 3: Build conversation messages for OpenRouter
  const messages: any[] = [];

  // System Prompt
  messages.push({
    role: 'system',
    content: systemPrompt
  });

  // Add chat history (last 6 messages for context window management)
  const recentHistory = chatHistory.slice(-6);
  recentHistory.forEach(msg => {
    messages.push({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    });
  });

  // Add current query
  messages.push({
    role: 'user',
    content: query
  });

  // Step 4: Call OpenRouter API with streaming
  onThinkingUpdate('✍️ जवाब लिख रहा हूँ...');

  let fullResponse = '';

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://moneycal.in', // Optional, for OpenRouter rankings
        'X-Title': 'MoneyCal' // Optional, for OpenRouter rankings
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: messages,
        stream: true,
        temperature: 0.75,
        top_p: 0.95
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    // Parse SSE stream
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) throw new Error('No response body');

    let buffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Process SSE events
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const text = parsed?.choices?.[0]?.delta?.content;
            if (text) {
              fullResponse += text;
              onChunk(text);
            }
          } catch {
            // Skip malformed JSON
          }
        }
      }
    }
  } catch (error) {
    console.error('OpenRouter streaming failed, falling back to non-streaming:', error);

    // Fallback: Non-streaming call
    try {
      const fbResponse = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: messages,
          stream: false,
          temperature: 0.75
        })
      });

      if (!fbResponse.ok) throw new Error(`OpenRouter fallback error: ${fbResponse.status}`);

      const data = await fbResponse.json();
      fullResponse = data?.choices?.[0]?.message?.content || '';
      if (fullResponse) {
        onChunk(fullResponse);
      }
    } catch (fallbackError) {
      console.error('OpenRouter fallback also failed:', fallbackError);
      fullResponse = `मुझे अभी AI server से connect करने में दिक्कत हो रही है। 😔\n\nलेकिन आप यह try कर सकते हैं:\n\n`;
      if (localResults.length > 0) {
        localResults.slice(0, 3).forEach(r => {
          fullResponse += `- **[${r.title}](${r.url})** — ${r.description}\n`;
        });
      }
      fullResponse += `\nकुछ देर बाद फिर से पूछें या हमारे [All Calculators](/calculators) page पर जाएं।`;
      onChunk(fullResponse);
    }
  }

  // Step 5: Post-process the response
  const { cleanedText, questions } = extractFollowUpQuestions(fullResponse);
  const calculatorType = detectCalculatorType(query);
  let sources = generateSources(query);

  // Inject web search sources dynamically
  if (webResults && webResults.length > 0) {
    const webSources = webResults.map(r => {
      try {
        return { title: r.title, url: r.url, domain: new URL(r.url).hostname.replace('www.', '') };
      } catch {
        return { title: r.title, url: r.url, domain: 'web' };
      }
    });
    // Remove duplicates based on URL
    const allSources = [...webSources, ...sources];
    sources = Array.from(new Map(allSources.map(item => [item.url, item])).values()).slice(0, 5);
  }

  // Use follow-ups extracted from the main response, or fall back to defaults
  const finalFollowUps = questions.length > 0 ? questions : generateDefaultFollowUps(query);

  const result: LLMResponse = {
    answer: cleanedText || fullResponse,
    sources,
    recommendations: localResults.slice(0, 4),
    calculatorType,
    followUpQuestions: finalFollowUps,
  };

  // Cache the response for future identical queries
  setCachedResponse(query, researchMode, result);

  return result;
}

// ───────────────────────────────────────────────────────
// Generate Default Follow-up Questions
// ───────────────────────────────────────────────────────
function generateDefaultFollowUps(query: string): string[] {
  const q = query.toLowerCase();

  if (q.includes('sip') || q.includes('mutual fund'))
    return ['SIP और Lump Sum में क्या फर्क है?', 'Best Mutual Fund कैसे चुनें?', 'SIP में कितने साल invest करना चाहिए?'];
  if (q.includes('emi') || q.includes('loan'))
    return ['Home Loan में floating vs fixed rate कौन सा बेहतर?', 'Loan prepayment करना चाहिए या invest करना?', 'CIBIL Score कैसे improve करें?'];
  if (q.includes('tax') || q.includes('टैक्स'))
    return ['Old vs New Tax Regime कौन सी बेहतर है?', 'Section 80C में कैसे ₹1.5 lakh बचाएं?', 'HRA exemption कैसे claim करें?'];
  if (q.includes('gold') || q.includes('सोना'))
    return ['Sovereign Gold Bond कैसे खरीदें?', 'Physical Gold vs Digital Gold — कौन सा बेहतर?', 'Gold ETF क्या होता है?'];
  if (q.includes('ipo'))
    return ['IPO में apply कैसे करें step by step?', 'GMP (Grey Market Premium) क्या होता है?', 'IPO allotment chances कैसे बढ़ाएं?'];

  return ['मेरे लिए best investment option कौन सा है?', 'Tax बचाने के top 5 तरीके बताइए', '₹10,000 monthly budget में कैसे invest करें?'];
}

// ───────────────────────────────────────────────────────
// Legacy Non-streaming API (backward compatibility)
// ───────────────────────────────────────────────────────
export async function processQueryLLM(
  query: string,
  contentIndex: ContentItem[],
  chatHistory: CoreChatMessage[] = [],
  userProfile: 'beginner' | 'expert' = 'beginner'
): Promise<LLMResponse> {
  let finalAnswer = '';

  const result = await streamGeminiResponse(
    query,
    contentIndex,
    chatHistory,
    userProfile,
    (chunk) => { finalAnswer += ''; }, // No-op for non-streaming
    () => {} // No-op for thinking updates
  );

  return result;
}
