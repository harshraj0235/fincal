import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function testDiscover() {
    console.log('Fetching Google Trends RSS...');
    const response = await fetch('https://trends.google.com/trending/rss?geo=IN');
    const text = await response.text();
    
    const result = await parseStringPromise(text);
    const items = result.rss.channel[0].item;
    
    console.log('Discover Trends (First 1):');
    const item = items[0];
    console.log(JSON.stringify(item, null, 2));
}

async function testIpo() {
    console.log('\nFetching Google News IPO RSS...');
    const url = 'https://news.google.com/rss/search?q=India+IPO+OR+DRHP+OR+GMP+when:1d&hl=en-IN&gl=IN&ceid=IN:en';
    const response = await fetch(url);
    const text = await response.text();
    
    const result = await parseStringPromise(text);
    const items = result.rss.channel[0].item;
    
    console.log('IPO News (First 3):');
    items.slice(0, 3).forEach(item => {
        const title = item.title[0];
        const snippet = item.description[0];
        console.log(`- Title: ${title}`);
        // description often contains HTML, let's strip it roughly
        const cleanSnippet = snippet.replace(/<[^>]*>?/gm, '');
        console.log(`  Snippet: ${cleanSnippet.substring(0, 100)}...`);
    });
}

testDiscover().then(testIpo).catch(console.error);
