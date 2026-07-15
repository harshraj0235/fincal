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
You are a top-tier Indian finance and news writer for MoneyCal.in.
Follow these EXACT rules:
- Write a 1500+ word article in simple Hindi-English mix (Hinglish).
- Write about the topic: "${topicObj.topic}". 
- Focus heavily on this angle: "${topicObj.angle}".
- Use at least 5 real facts with numbers/percentages (approximate realistically if exact current data is unavailable, but make it look professional).
- Format strictly as a TypeScript object for our Discover section.
- NEVER use markdown in the content strings. Use only HTML tags like <strong>, <br>, <a href="...">
- Include exactly 3-5 internal links to our tools (e.g., <a href='https://moneycal.in/tools/sip-calculator'>SIP Calculator</a>, <a href='https://moneycal.in/tools/income-tax-calculator'>Income Tax</a>).
- Ensure the slug is URL safe (lowercase, hyphens only).

Format your response EXACTLY like this (and nothing else, no extra text):
\`\`\`typescript
export const generatedArticle = {
    id: 'slug-here',
    slug: 'slug-here',
    title: 'Compelling Hinglish Title', // NEVER include text like "(61 chars)", "(50 chars)" or any meta instructions in the generated title
    snippet: 'Meta description in Hinglish (150 chars max)...',
    coverImage: '/images/discover/slug-here.png',
    author: 'MoneyCal Team',
    date: '${new Date().toISOString()}',
    sections: [
        { type: 'p', content: 'Hook paragraph...' },
        { type: 'image', content: '/images/discover/slug-here.png' },
        { type: 'h2', content: 'Heading 1' },
        { type: 'p', content: 'Content with <a href="https://moneycal.in/tools/emi-calculator">EMI Calculator</a>' }
    ]
};
\`\`\`
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

    return { slug, camelSlug, title, code };
}

async function generateImage(slug, title) {
    console.log(`🎨 Generating image for ${slug}...`);
    const imagePrompt = `A modern, vibrant, professional illustration showing ${title}. Style: Clean, editorial, high-contrast colors, Indian context. No text overlay. Premium magazine quality.`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=1200&height=675&nologo=true`;

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
    throw new Error('Failed to generate image after 3 attempts');
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
            const imagePath = await generateImage(articleData.slug, articleData.title);

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
