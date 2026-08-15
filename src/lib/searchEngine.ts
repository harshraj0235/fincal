export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  fullContent?: string;
}

// ───────────────────────────────────────────────────────
// Multi-proxy fallback for CORS — if one goes down, try the next
// ───────────────────────────────────────────────────────
const CORS_PROXIES = [
  (url: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

async function fetchWithFallback(targetUrl: string): Promise<{ contents: string } | null> {
  for (const buildProxyUrl of CORS_PROXIES) {
    try {
      const proxyUrl = buildProxyUrl(targetUrl);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout per proxy

      const response = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) continue;

      // allorigins returns { contents: "..." }, others return raw text
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        // allorigins format
        if (data.contents) return { contents: data.contents };
        // codetabs format — returns raw string in json sometimes
        if (typeof data === 'string') return { contents: data };
        return null;
      } else {
        // corsproxy.io and codetabs return raw HTML
        const text = await response.text();
        if (text) return { contents: text };
      }
    } catch (err) {
      console.warn(`Proxy failed, trying next...`, err);
      continue;
    }
  }
  console.error('All CORS proxies failed for:', targetUrl);
  return null;
}

export async function fetchWebpageContent(url: string): Promise<string> {
  try {
    // Some urls might be invalid
    if (!url.startsWith('http')) return '';

    const data = await fetchWithFallback(url);
    if (!data?.contents) return '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');

    // Remove noise elements
    const elementsToRemove = doc.querySelectorAll('script, style, nav, header, footer, iframe, noscript, aside, form, .ad, .sidebar, [role="banner"], [role="contentinfo"]');
    elementsToRemove.forEach(el => el.remove());

    // Extract text from body
    const textContent = doc.body?.textContent || '';
    
    // Clean up whitespace and limit length to save context window (3000 chars ~ 750 tokens)
    return textContent.replace(/\s+/g, ' ').trim().substring(0, 3000); 
  } catch (error) {
    console.error('Failed to fetch webpage:', url, error);
    return '';
  }
}

export async function searchWeb(query: string, fetchFullContent: boolean = false): Promise<SearchResult[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodedQuery}`;

    const data = await fetchWithFallback(ddgUrl);
    if (!data?.contents) {
      console.error('Search: all proxies failed');
      return [];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');

    const results: SearchResult[] = [];
    const resultNodes = doc.querySelectorAll('.result__body');

    resultNodes.forEach((node) => {
      if (results.length >= 4) return; // limit to top 4 results

      const titleNode = node.querySelector('.result__title .result__a');
      const snippetNode = node.querySelector('.result__snippet');
      const urlNode = node.querySelector('.result__url');

      if (titleNode && snippetNode) {
        let url = (titleNode as HTMLAnchorElement).href;
        
        // DDG sometimes wraps urls in their redirector, clean it up if possible
        if (url.includes('duckduckgo.com/l/?uddg=')) {
          const params = new URLSearchParams(url.split('?')[1]);
          const realUrl = params.get('uddg');
          if (realUrl) url = decodeURIComponent(realUrl);
        } else if (urlNode) {
          // Fallback to text inside URL node
          url = 'https://' + (urlNode.textContent?.trim() || '');
        }

        results.push({
          title: titleNode.textContent?.trim() || '',
          url: url,
          snippet: snippetNode.textContent?.trim() || '',
        });
      }
    });

    if (fetchFullContent && results.length > 0) {
      // Fetch full content for the top 3 results in parallel
      const contentPromises = results.slice(0, 3).map(async (res) => {
        const content = await fetchWebpageContent(res.url);
        if (content) {
          res.fullContent = content;
        }
        return res;
      });
      await Promise.all(contentPromises);
    }

    return results;
  } catch (error) {
    console.error('Web search error:', error);
    return [];
  }
}
