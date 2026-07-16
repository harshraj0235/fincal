import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure TLS issues with trends don't crash
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
    console.error("❌ OPENROUTER_API_KEY is missing. Please set it in your environment.");
    process.exit(1);
}

const ROOT_DIR = path.resolve(__dirname, '../..');
const DISCOVER_DIR = path.join(ROOT_DIR, 'src', 'data', 'discover');
const INDEX_TS_PATH = path.join(DISCOVER_DIR, 'index.ts');
const IMAGE_DIR = path.join(ROOT_DIR, 'public', 'images', 'discover');

// Ensure image directory exists
if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

async function callOpenRouter(prompt, systemPrompt = "You are a specialized API that returns valid JSON or code.", maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "openai/gpt-4o-mini", // Universal fast model
                    "messages": [
                        { "role": "system", "content": systemPrompt },
                        { "role": "user", "content": prompt }
                    ],
                    "temperature": 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`OpenRouter Error: ${response.status} ${await response.text()}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed: ${error.message}`);
            if (i === maxRetries - 1) throw error;
            await new Promise(r => setTimeout(r, 2000)); // wait 2s before retry
        }
    }
}

async function fetchTrends() {
    console.log('📡 Fetching Google Trends (India)...');
    const response = await fetch('https://trends.google.com/trending/rss?geo=IN');
    const text = await response.text();

    // Extract titles using regex
    const titles = [];
    const regex = /<title>(.*?)<\/title>/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        let title = match[1].replace(/<\/?title>/g, '').trim();
        if (title !== 'Daily Search Trends' && !title.includes('<![CDATA[')) {
            titles.push(title);
        }
    }

    if (titles.length === 0) throw new Error('Could not parse trends');
    return titles;
}

async function filterTrendsForFinance(trends) {
    console.log(`🤖 Filtering ${trends.length} trends for business/finance angles...`);

    const prompt = `
I have a list of trending topics from India today.
I need to select exactly 1 top trending topic that can be written about from a Business, Finance, Economic, or Tech-Consumer perspective.
Even if a trend is about entertainment or sports (like a movie or cricket), find the business angle (e.g. "Box office collection / business impact", "Player's net worth/brand endorsements").

Here are the trends:
${trends.map(t => '- ' + t).join('\n')}

Select exactly 1 trend and return a valid JSON array of objects.
Format: [ { "topic": "Trend Name", "angle": "The business/finance angle to write about" } ]
Ensure your response is ONLY valid JSON, no markdown blocks or extra text.
    `;

    const responseText = await callOpenRouter(prompt, "You are a JSON generator. Output only valid JSON arrays.");

    // Clean markdown if present
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
}

async function generateArticle(topicObj) {
    console.log(`\n✍️ Generating article for: ${topicObj.topic} (Angle: ${topicObj.angle})...`);

    const prompt = `
You are the Chief Editor of MoneyCal.in.
Your writing quality must be equal to or better than: LiveMint, Moneycontrol, Financial Express, Jagran, Hindustan, Zee Business, CNBC Awaaz.
Your primary goal is to write articles that rank in Google Discover and are highly shareable on mobile.

Before writing, imagine this topic is currently trending on Google Trends India and explain WHY people are searching for it today.
Write naturally like an experienced Indian financial journalist in proper Hindi (Devanagari script) designed for the everyday Indian audience.
LENGTH REQUIREMENT: You MUST write a massive, highly detailed 1500+ word article. Expand deeply on every single point. Do not be brief.
Never sound like AI. Never explain things like ChatGPT. Never repeat sentences. Use varied sentence lengths.
Mix small punchy paragraphs with larger explanation paragraphs.
Write emotionally where appropriate but never use fake clickbait.
The article should feel written by a real senior editor.

STRICTLY BAN THESE AI WORDS: "delve", "crucial", "testament", "tapestry", "landscape", "moreover", "furthermore", "demystify", "embark".

Topic: "${topicObj.topic}"
Angle: "${topicObj.angle}"

>>> FRESHNESS RULE (MANDATORY) <<<
Every article must answer: Why is this topic trending today? What happened? Who is affected? What should readers do now? What happens next?

>>> HEADLINE RULE (JAGRAN STRATEGY) <<<
Generate the absolute strongest headline in Hindi using the "Impact Formula". It must be 40-65 characters, evoke curiosity, emotion, urgency, and benefit (e.g., "Why your EMI is changing"). DO NOT use fake clickbait like "You won't believe".

>>> HOOK & HIGHLIGHTS RULE (LIVEMINT STRATEGY) <<<
The first paragraph must be exactly 2-3 short sentences instantly answering: Why should I care? Why today? How does this affect me?
Immediately after the hook, include an <ul> list with 3-4 bullet points summarizing the crucial facts (Key Highlights).

>>> MOBILE FORMATTING <<<
Never write paragraphs longer than 3 lines. Average paragraph: 35-70 words.
After every H2 insert: 1 short paragraph, 1 bullet list, 1 explanation.

>>> E-E-A-T & SOURCES <<<
Include Official sources (RBI, SEBI, CBDT, GST Council, NPCI, UIDAI, Income Tax Department, Ministry websites) whenever applicable.
Mention exact numbers, dates, and circulars. Never invent facts. Add an External Source mention if it's news.

>>> NLP OPTIMIZATION <<<
Naturally include related entities (UPI, RBI, Income Tax, EPFO, SBI, HDFC, PAN, Aadhaar, GST, Mutual Funds, Sensex, Nifty) without keyword stuffing.

>>> KNOWLEDGE GRAPH ENTITIES (SEO) <<<
Identify 1 or 2 core entities that this article is about (e.g., "Income Tax", "Reserve Bank of India", "HDFC Bank").
Output these in the 'entities' array with their precise English Wikipedia URL (e.g., https://en.wikipedia.org/wiki/Income_tax_in_India). This is critical for Google Knowledge Graph linking.

>>> CONTENT BLOCKS TO INCLUDE <<<
- 1 Action Box / Quick Summary (Who is affected, deadline, important numbers).
- 1 HTML Table (e.g., Old rule vs New rule).
- 5 FAQs at the end (Real user questions, short answers).
- DWELL TIME HACK (MONEYCONTROL STRATEGY): You MUST include a specific call-to-action telling the user to use a calculator. Include exactly 3-5 internal links to relevant calculators (e.g., "Calculate your exact impact here: <a href='https://moneycal.in/tools/income-tax-calculator'>Income Tax Calculator</a>"). Ensure the slug is URL safe.

>>> TYPESCRIPT SYNTAX RULE (CRITICAL) <<<
NEVER use single quotes (') inside your content text. If you need to use quotes inside the text, use double quotes ("). Using single quotes will break the TypeScript compiler because the content itself is wrapped in single quotes.

Format your response EXACTLY like this (and nothing else, no extra text):
\`\`\`typescript
export const generatedArticle = {
    id: 'slug-here',
    slug: 'slug-here',
    title: 'Compelling Hindi Title (Devanagari script)', // NEVER include text like "(61 chars)"
    snippet: 'Meta description in Hindi (150 chars max)...',
    coverImage: '/images/discover/slug-here.png',
    author: 'MoneyCal Team',
    date: '${new Date().toISOString()}',
    sections: [
        { type: 'p', content: 'Hook paragraph...' },
        { type: 'callout', content: '<strong>Quick Summary</strong><br>Who is affected...' },
        { type: 'h2', content: 'Heading 1' },
        { type: 'p', content: 'Content with <a href="https://moneycal.in/tools/emi-calculator">EMI Calculator</a>' },
        { type: 'ul', content: '<li>Point 1</li><li>Point 2</li>' },
        { type: 'h2', content: 'Table data' },
        { type: 'p', content: '<table>...</table>' },
        { type: 'h2', content: 'FAQs' },
        { type: 'p', content: '<strong>Q1: Question?</strong><br>Answer...' }
    ],
    entities: [
        { name: 'Main Entity Name', url: 'https://en.wikipedia.org/wiki/Main_Entity' }
    ]
};
// IMAGE_PROMPT: (MUST BE WRITTEN IN ENGLISH) Create a highly realistic editorial-quality image for Google Discover. 16:9, Ultra realistic, 8K, Natural lighting, No text, No logo. Professional news photography style. Topic-focused. Include important objects related to the article. Avoid random people.
\`\`\`

Before final output silently verify:
✓ Looks human and in proper Hindi (Devanagari)
✓ No AI phrases
✓ Discover optimized & Mobile friendly
✓ E-E-A-T facts and NLP entities included
✓ Knowledge Graph entity array populated with correct Wikipedia URL
✓ Table and FAQs added
✓ JSON/TypeScript syntax valid
Return ONLY the TypeScript object.
    `;

    const rawContent = await callOpenRouter(prompt, "You output ONLY valid TypeScript code blocks.");

    // Extract typescript code from response
    let code = rawContent;
    const match = code.match(/\`\`\`typescript([\s\S]*?)\`\`\`/);
    if (match) code = match[1].trim();
    code = code.replace(/```/g, '').trim();

    // We need to parse this code to extract the slug to save the file properly
    const slugMatch = code.match(/slug:\s*['"](.*?)['"]/);
    if (!slugMatch) throw new Error("Failed to generate valid slug in TS output.");

    let slug = slugMatch[1];

    // Change export name from 'generatedArticle' to camelCase slug
    let camelSlug = slug.replace(/-([a-zA-Z0-9])/g, (g) => g[1].toUpperCase());
    if (/^[0-9]/.test(camelSlug)) {
        camelSlug = '_' + camelSlug;
    }
    code = code.replace(/export const [a-zA-Z0-9_]+ =/, `export const ${camelSlug} = `);
    // Ensure DiscoverArticle type is imported and used
    if (!code.includes('DiscoverArticle')) {
        code = "import { DiscoverArticle } from './types';\n\n" + code.replace(`export const ${camelSlug} = `, `export const ${camelSlug}: DiscoverArticle = `);
    }

    // Force replace the date to be the actual current time to avoid AI hallucinations
    code = code.replace(/date:\s*['"].*?['"]/, `date: '${new Date().toISOString()}'`);

    const titleMatch = code.match(/title:\s*['"](.*?)['"]/);
    const title = titleMatch ? titleMatch[1] : topicObj.topic;

    const imagePromptMatch = rawContent.match(/\/\/ IMAGE_PROMPT:\s*(.*)/);
    const customImagePrompt = imagePromptMatch ? imagePromptMatch[1].trim() : null;

    return { slug, camelSlug, title, code, customImagePrompt };
}

async function generateImage(slug, title, keyword, customPrompt) {
    console.log(`🎨 Generating image for ${slug} (Topic: ${keyword})...`);
    
    // Step 1: Use LLM to optimize the prompt (ensures it is highly descriptive and strictly English)
    const promptInstructions = `
I have an article with the following Hindi topic: "${keyword}"

Write a highly detailed, purely English image generation prompt for this topic. 
The image should be a professional, photorealistic editorial photography style for a financial news website (like Bloomberg or LiveMint).
DO NOT include any text, logos, or words in the image.
Keep the prompt under 50 words.

Return ONLY the English image prompt, nothing else.`;

    let finalPrompt = '';
    try {
        finalPrompt = await callOpenRouter(promptInstructions, "You output ONLY English image prompts. No markdown, no quotes.");
    } catch (e) {
        console.error("⚠️ Failed to optimize prompt via LLM, using fallback.");
        finalPrompt = `High-quality editorial photography, photorealistic Indian context. The core concept of: ${keyword}. Professional financial news style, clear symbolism. Clean, high-contrast. No text overlay.`;
    }

    console.log(`✅ Optimized Image Prompt: "${finalPrompt}"`);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1200&height=675&nologo=true`;

    for (let i = 0; i < 3; i++) {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('Pollinations returned ' + response.status);
            const buffer = await response.arrayBuffer();
            const imagePath = path.join(IMAGE_DIR, `${slug}.png`);
            fs.writeFileSync(imagePath, Buffer.from(buffer));
            return `/images/discover/${slug}.png`;
        } catch (e) {
            console.error(`Image gen failed (attempt ${i + 1}):`, e.message);
            await new Promise(r => setTimeout(r, 2000));
        }
    }
    
    console.log('⚠️ Pollinations failed. Falling back to Unsplash...');
    try {
        const unsplashUrl = `https://source.unsplash.com/1200x675/?${encodeURIComponent(keyword.split(' ').slice(0, 2).join(','))}`;
        const uResponse = await fetch(unsplashUrl);
        if (uResponse.ok) {
            const buffer = await uResponse.arrayBuffer();
            const imagePath = path.join(IMAGE_DIR, `${slug}.png`);
            fs.writeFileSync(imagePath, Buffer.from(buffer));
            return `/images/discover/${slug}.png`;
        }
    } catch (err) {
        console.error('Unsplash fallback failed:', err.message);
    }
    
    throw new Error('Failed to generate image from all sources');
}

async function updateIndexTs(newArticles) {
    console.log('📝 Updating index.ts...');
    let indexContent = fs.readFileSync(INDEX_TS_PATH, 'utf-8');

    let importStatements = '';
    let arrayPushStatements = '';

    for (const article of newArticles) {
        importStatements += `import { ${article.camelSlug} } from './${article.slug}';\n`;
        arrayPushStatements += `    ${article.camelSlug},\n`;
    }

    // Prepend imports
    indexContent = importStatements + indexContent;

    // Append to array
    // Find array declaration using regex to ignore whitespace/newlines from code formatters
    const arrayMatchRegex = /const\s+_discoverArticles[^=]*=\s*\[/;
    const match = indexContent.match(arrayMatchRegex);
    if (!match) throw new Error('Could not find _discoverArticles array in index.ts');

    const insertPosition = match.index + match[0].length;
    indexContent = indexContent.slice(0, insertPosition) + '\n' + arrayPushStatements + indexContent.slice(insertPosition);

    fs.writeFileSync(INDEX_TS_PATH, indexContent);
}

const PUBLISHED_TRENDS_FILE = path.join(__dirname, 'published_trends.txt');
const publishedTopics = new Set();
if (fs.existsSync(PUBLISHED_TRENDS_FILE)) {
    const lines = fs.readFileSync(PUBLISHED_TRENDS_FILE, 'utf-8').split('\n').map(l => l.trim()).filter(Boolean);
    lines.forEach(l => publishedTopics.add(l));
}

async function processNextArticle() {
    console.log(`\n⏰ [${new Date().toLocaleString()}] Waking up to find a new trend...`);
    try {
        const rawTrends = await fetchTrends();
        const unseenTrends = rawTrends.filter(t => !publishedTopics.has(t));

        if (unseenTrends.length === 0) {
            console.log('⚠️ No new trends found right now. Will check again in 30 minutes.');
            return;
        }

        const selectedTrends = await filterTrendsForFinance(unseenTrends);

        if (!selectedTrends || selectedTrends.length === 0) {
            console.log('⚠️ AI could not find a suitable finance angle for the current trends.');
            return;
        }

        const trend = selectedTrends[0];
        console.log(`\n✅ Selected new trend: ${trend.topic}`);

        try {
            const articleData = await generateArticle(trend);
            const imagePath = await generateImage(articleData.slug, articleData.title, trend.topic, articleData.customImagePrompt);

            // Save TS file
            const filePath = path.join(DISCOVER_DIR, `${articleData.slug}.ts`);
            fs.writeFileSync(filePath, articleData.code);
            console.log(`✅ Saved: ${filePath}`);

            await updateIndexTs([articleData]);
            console.log('🔄 Generating metadata for frontend...');
            execSync('npx tsx scripts/generateDiscoverMetadata.ts', { cwd: ROOT_DIR, stdio: 'inherit' });
            
            console.log('🗺️ Regenerating sitemaps...');
            execSync('npm run generate-sitemaps', { cwd: ROOT_DIR, stdio: 'inherit' });
            
            console.log(`🎉 Article published and sitemaps updated successfully!`);
            publishedTopics.add(trend.topic);
            fs.appendFileSync(PUBLISHED_TRENDS_FILE, trend.topic + '\n');

        } catch (err) {
            console.error(`❌ Failed to generate article for "${trend.topic}":`, err.message);
        }

    } catch (err) {
        console.error('🛑 Pipeline Error during cycle:', err);
    }
}

async function main() {
    console.log('🚀 Starting Auto-Discover Publisher (Single Run for GitHub Actions)...');
    
    // Process exactly one article and exit
    await processNextArticle();
}

main();
