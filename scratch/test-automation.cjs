const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = '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';

// Ignore TLS errors for Google Trends
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function fetchTrendingTopic() {
    console.log('1. Fetching Google Trends (India)...');
    const response = await fetch('https://trends.google.com/trending/rss?geo=IN');
    const text = await response.text();
    
    // Simple regex to extract the first trend
    const titleMatch = text.match(/<title>(.*?)<\/title>/g);
    if (!titleMatch || titleMatch.length < 2) throw new Error('Could not parse trends');
    
    // titleMatch[0] is the channel title, titleMatch[1] is the first item
    const firstTrend = titleMatch[1].replace(/<\/?title>/g, '');
    console.log(`-> Selected Trend: "${firstTrend}"`);
    return firstTrend;
}

async function generateArticle(topic) {
    console.log(`2. Generating article for: ${topic} via OpenRouter...`);
    const prompt = `
You are a top-tier Indian finance and news writer for MoneyCal.in.
Follow these EXACT rules from discover-guidelines.md:
- Write a 1500+ word article in simple Hindi-English mix (Hinglish).
- Write about the topic: "${topic}". Frame it from a business, finance, economic, or consumer impact perspective.
- Use at least 5 real facts with numbers/percentages.
- Format strictly as a TypeScript object for our Discover section.
- NEVER use markdown in the content strings. Use only HTML tags like <strong>, <br>, <a href="...">
- Include exactly 3-5 internal links to our tools (e.g., <a href='https://moneycal.in/tools/sip-calculator'>SIP Calculator</a>).

Format your response EXACTLY like this (and nothing else):
\`\`\`typescript
export const generatedArticle = {
    id: 'slug-here',
    slug: 'slug-here',
    title: 'Compelling Hinglish Title (50-70 chars)',
    snippet: 'Meta description in Hinglish...',
    coverImage: '/images/discover/slug-here.png',
    author: 'MoneyCal Team',
    date: '${new Date().toISOString()}',
    sections: [
        { type: 'p', content: 'Hook paragraph...' },
        { type: 'image', content: '/images/discover/slug-here.png' },
        { type: 'h2', content: '...' },
        { type: 'p', content: '... with <a href="https://moneycal.in/tools/emi-calculator">EMI Calculator</a>' }
    ]
};
\`\`\`
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "openai/gpt-4o-mini", // Universal model
            "messages": [
                { "role": "system", "content": "You are a specialized content generation bot for MoneyCal. You only output valid TypeScript code." },
                { "role": "user", "content": prompt }
            ]
        })
    });

    if (!response.ok) {
        throw new Error(`OpenRouter Error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

async function generateImage(topic) {
    console.log(`3. Generating image for: ${topic} via Pollinations.ai...`);
    // Pollinations generates an image based on the URL prompt
    const imagePrompt = `A modern, vibrant, professional illustration showing ${topic}. Style: Clean, editorial, high-contrast colors, Indian context. No text overlay. Premium magazine quality.`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=1200&height=675&nologo=true`;
    
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    
    const imagePath = path.join(__dirname, 'demo-image.jpg');
    fs.writeFileSync(imagePath, Buffer.from(buffer));
    console.log(`-> Image saved to: ${imagePath}`);
    return imageUrl;
}

async function runDemo() {
    try {
        const topic = await fetchTrendingTopic();
        
        // Run generation in parallel
        const [articleCode] = await Promise.all([
            generateArticle(topic),
            generateImage(topic)
        ]);
        
        const articlePath = path.join(__dirname, 'demo-article.ts');
        fs.writeFileSync(articlePath, articleCode);
        console.log(`-> Article saved to: ${articlePath}`);
        
        console.log('\n✅ Demo Complete! Check scratch/demo-article.ts and scratch/demo-image.jpg');
    } catch (error) {
        console.error('Error during demo:', error);
    }
}

runDemo();
