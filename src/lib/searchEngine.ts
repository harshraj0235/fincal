export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  fullContent?: string;
}

export async function fetchWebpageContent(url: string): Promise<string> {
  try {
    // Some urls might be invalid
    if (!url.startsWith('http')) return '';

    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) return '';
    
    const data = await response.json();
    const htmlString = data.contents;
    if (!htmlString) return '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

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
    // Using AllOrigins CORS proxy since browser will block direct DDG HTML calls
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(ddgUrl)}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) {
      console.error('Search proxy failed:', response.status);
      return [];
    }

    const data = await response.json();
    const htmlString = data.contents;
    
    if (!htmlString) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

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
