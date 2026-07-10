const fetch = require('node-fetch');

async function testDDG() {
  try {
    const q = encodeURIComponent('latest RBI repo rate 2026');
    // We will simulate what the browser would do. We can test DuckDuckGo HTML directly.
    const url = `https://html.duckduckgo.com/html/?q=${q}`;
    
    console.log("Fetching", url);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    
    const html = await res.text();
    console.log("Response length:", html.length);
    
    // Quick regex to find result snippets (since we are in node, no DOMParser easily available unless we use JSDOM, but we can just check if HTML is returned)
    if (html.includes('result__snippet')) {
      console.log("SUCCESS: Found result snippets in HTML");
    } else {
      console.log("FAILED: No snippets found, maybe blocked?");
      console.log(html.substring(0, 500));
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

testDDG();
