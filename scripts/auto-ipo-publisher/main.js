import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { pingGoogleIndexingApi } from '../utils/google-indexer.js';
import { parseStringPromise } from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure TLS issues don't crash
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
    console.error("❌ OPENROUTER_API_KEY is missing. Please set it in your environment.");
    process.exit(1);
}

const ROOT_DIR = path.resolve(__dirname, '../..');
const IPO_DIR = path.join(ROOT_DIR, 'src', 'data', 'ipo');
const IPO_API_PATH = path.join(ROOT_DIR, 'src', 'services', 'ipoApi.ts');
const IMAGE_DIR = path.join(ROOT_DIR, 'public', 'images', 'ipo');
const PUBLISHED_TRACKER = path.join(__dirname, 'published_ipos.txt');

if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

if (!fs.existsSync(PUBLISHED_TRACKER)) {
    fs.writeFileSync(PUBLISHED_TRACKER, '', 'utf8');
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
                    "model": "openai/gpt-4o-mini",
                    "messages": [
                        { "role": "system", "content": systemPrompt },
                        { "role": "user", "content": prompt }
                    ],
                    "temperature": 0.5
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
            await new Promise(r => setTimeout(r, 2000));
        }
    }
}

async function fetchIpoNews() {
    console.log('📡 Fetching latest IPO News from Google News...');
    const url = 'https://news.google.com/rss/search?q=India+IPO+OR+DRHP+OR+GMP+when:1d&hl=en-IN&gl=IN&ceid=IN:en';
    const response = await fetch(url);
    const text = await response.text();

    const result = await parseStringPromise(text);
    const items = result.rss.channel[0].item;

    const newsArticles = [];
    for (const item of items) {
        const title = item.title[0];
        const snippetRaw = item.description && item.description[0] ? item.description[0] : '';
        const cleanSnippet = snippetRaw.replace(/<[^>]*>?/gm, '').trim();
        
        newsArticles.push({
            title: title,
            context: cleanSnippet
        });
    }

    if (newsArticles.length === 0) throw new Error('Could not parse IPO news');
    return newsArticles;
}

async function selectIpoTopic(newsArticles) {
    console.log(`🤖 Selecting best IPO from ${newsArticles.length} recent news articles...`);

    const publishedIpos = fs.readFileSync(PUBLISHED_TRACKER, 'utf8').split('\n').filter(Boolean);

    const prompt = `
I have a list of recent IPO-related news headlines from India.
I need to select EXACTLY ONE company that is currently in the news for its IPO (Upcoming, Open, or Listed recently).
Do NOT select any IPO that is in this "Already Published" list:
[${publishedIpos.join(', ')}]

Here are the recent news headlines:
${newsArticles.slice(0, 15).map(n => `- Title: ${n.title}\n  Snippet: ${n.context}`).join('\n\n')}

Select the most important, hype-generating IPO (e.g., Bajaj Housing, NTPC Green, etc.) from the list.
Return a valid JSON object with the company name, a brief angle, and the context snippet.
Format: { "company": "Company Name", "angle": "What's happening (e.g. DRHP filed, GMP surging)", "context": "The exact news snippet as ground truth" }
Ensure your response is ONLY valid JSON.
    `;

    const responseText = await callOpenRouter(prompt, "You are a JSON generator. Output only a valid JSON object.");
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
}

async function generateIpoArticle(ipoObj) {
3. Company Overview & Business Model
4. Financial Analysis (Revenue, Profit, Assets over last 3 years)
5. Objectives of the Issue
6. SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)
7. GMP (Grey Market Premium) Updates & Subscription Status
8. Should You Apply? (Expert conclusion)

>>> TYPESCRIPT SYNTAX RULE (CRITICAL) <<<
NEVER use single quotes (') inside your text content. Use double quotes (") instead.
The code must perfectly match the IpoDetails interface.

Format your response EXACTLY like this (and nothing else):
\`\`\`typescript
import { IpoDetails } from '../../types/ipo';

export const generatedIpo: IpoDetails = {
    id: 'slug-here',
    name: 'Company Name',
    slug: 'slug-here-ipo-review-hindi',
    symbol: 'SYMBOL',
    type: 'Mainboard', // or 'SME'
    status: 'Upcoming', // or 'Open' or 'Closed'
    featuredImage: '/images/ipo/slug-here.png',
    companyDescription: 'Short Hindi description (2-3 lines)...',
    aboutCompany: [
        'Point 1 about the business in Hindi',
        'Point 2 about the business in Hindi'
    ],
    priceBand: '₹XXX - ₹XXX',
    issueSize: '₹XXX Cr',
    lotSize: 100, // Number
    openDate: 'TBA',
    closeDate: 'TBA',
    allotmentDate: 'TBA',
    listingDate: 'TBA',
    expectedGmp: 0, // Number
    expectedGmpPercentage: 0, // Number
    subscriptionStatus: { qib: 0, nii: 0, retail: 0, total: 0 },
    financials: [
        { year: 'FY 2024', revenue: '₹XX Cr', profit: '₹XX Cr', assets: '₹XX Cr' },
        { year: 'FY 2023', revenue: '₹XX Cr', profit: '₹XX Cr', assets: '₹XX Cr' }
    ],
    swotAnalysis: {
        strengths: ['Strength 1 in Hindi', 'Strength 2 in Hindi'],
        weaknesses: ['Weakness 1 in Hindi', 'Weakness 2 in Hindi']
    },
    sector: 'Technology / Finance / etc',
    registrar: 'Link Intime / KFintech / TBA',
    listingExchange: 'BSE, NSE',
    shareReservation: {
        qib: '50%',
        nii: '15%',
        retail: '35%'
    },
    promoterHoldings: {
        preIssue: '100%',
        postIssue: 'TBA'
    },
    objectsOfIssue: [
        'Objective 1 in Hindi',
        'Objective 2 in Hindi'
    ],
    technicalMetrics: {
        peRatio: 'XX',
        eps: '₹XX',
        roce: 'XX%'
    },
    contentSections: [
        {
            title: "Article Section Heading 1",
            content: "Detailed paragraph content in Hindi..."
        },
        {
            title: "Article Section Heading 2",
            content: "Detailed paragraph content in Hindi..."
        }
    ]
};
// IMAGE_PROMPT: Write an English prompt for an editorial cover image of this company. Example: "A modern factory of XYZ corp, photorealistic, 8k, professional lighting."
\`\`\`

Before final output, silently verify:
✓ Content is in proper Hindi (Devanagari)
✓ Extremely detailed and analytical
✓ Valid TypeScript syntax (no single quotes inside strings)
`;

    const rawContent = await callOpenRouter(prompt, "You output ONLY valid TypeScript code blocks.");

    let code = rawContent;
    const match = code.match(/\`\`\`typescript([\s\S]*?)\`\`\`/);
    if (match) code = match[1].trim();
    code = code.replace(/```/g, '').trim();

    const slugMatch = code.match(/slug:\s*['"](.*?)['"]/);
    if (!slugMatch) throw new Error("Failed to generate valid slug in TS output.");

    let slug = slugMatch[1];
    
    // Convert 'slug-here-ipo' to camelCase 'slugHereIpo'
    let camelSlug = slug.replace(/-([a-zA-Z0-9])/g, (g) => g[1].toUpperCase());
    if (/^[0-9]/.test(camelSlug)) {
        camelSlug = '_' + camelSlug;
    }
    
    code = code.replace(/export const [a-zA-Z0-9_]+(: IpoDetails)? =/, `export const ${camelSlug}: IpoDetails =`);

    const imagePromptMatch = rawContent.match(/\/\/ IMAGE_PROMPT:\s*(.*)/);
    const customImagePrompt = imagePromptMatch ? imagePromptMatch[1].trim() : null;

    return { slug, camelSlug, company: ipoObj.company, code, customImagePrompt };
}

async function generateImage(slug, company, customPrompt) {
    console.log(`🎨 Generating image for ${slug} (${company})...`);
    
    const finalPrompt = customPrompt || `High-quality corporate headquarters of ${company}, photorealistic Indian context. Professional financial news style, clear symbolism. Clean, high-contrast. No text overlay.`;

    console.log(`✅ Optimized Image Prompt: "${finalPrompt}"`);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1200&height=675&nologo=true`;

    for (let i = 0; i < 3; i++) {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('Pollinations returned ' + response.status);
            const buffer = await response.arrayBuffer();
            const imagePath = path.join(IMAGE_DIR, `${slug}.png`);
            fs.writeFileSync(imagePath, Buffer.from(buffer));
            return `/images/ipo/${slug}.png`;
        } catch (e) {
            console.error(`Image gen failed (attempt ${i + 1}):`, e.message);
            await new Promise(r => setTimeout(r, 2000));
        }
    }
    
    console.log('⚠️ Pollinations failed. Falling back to Unsplash...');
    try {
        const unsplashUrl = `https://source.unsplash.com/1200x675/?office,finance,${encodeURIComponent(company.split(' ')[0])}`;
        const uResponse = await fetch(unsplashUrl);
        if (uResponse.ok) {
            const buffer = await uResponse.arrayBuffer();
            const imagePath = path.join(IMAGE_DIR, `${slug}.png`);
            fs.writeFileSync(imagePath, Buffer.from(buffer));
            return `/images/ipo/${slug}.png`;
        }
    } catch (err) {
        console.error('Unsplash fallback failed:', err.message);
    }
    
    throw new Error('Failed to generate image from all sources');
}

async function updateIpoApiTs(newArticles) {
    console.log('📝 Updating ipoApi.ts...');
    let content = fs.readFileSync(IPO_API_PATH, 'utf-8');

    let importStatements = '';
    let arrayPushStatements = '';

    for (const article of newArticles) {
        importStatements += `import { ${article.camelSlug} } from '../data/ipo/${article.slug}';\n`;
        arrayPushStatements += `    ${article.camelSlug},\n`;
    }

    // Prepend imports below the first import
    const firstImportMatch = content.match(/^import .*?;\n/m);
    if (firstImportMatch) {
        const insertPos = firstImportMatch.index + firstImportMatch[0].length;
        content = content.slice(0, insertPos) + importStatements + content.slice(insertPos);
    } else {
        content = importStatements + content;
    }

    // Find the array declaration: export const allIpoData: IpoDetails[] = [
    const arrayMatchRegex = /export\s+const\s+allIpoData(\s*:\s*IpoDetails\[\])?\s*=\s*\[/;
    const match = content.match(arrayMatchRegex);
    if (!match) throw new Error('Could not find allIpoData array in ipoApi.ts');

    const insertPosition = match.index + match[0].length;
    content = content.slice(0, insertPosition) + '\n' + arrayPushStatements + content.slice(insertPosition);

    fs.writeFileSync(IPO_API_PATH, content);
}

const PUBLISHED_IPOS_FILE = path.join(__dirname, 'published_ipos.txt');
const publishedTopics = new Set();
if (fs.existsSync(PUBLISHED_IPOS_FILE)) {
    const lines = fs.readFileSync(PUBLISHED_IPOS_FILE, 'utf-8').split('\n').map(l => l.trim()).filter(Boolean);
    lines.forEach(l => publishedTopics.add(l));
}

async function processNextIpo() {
    console.log(`\n⏰ [${new Date().toLocaleString()}] Waking up to find new IPOs...`);
    try {
        const rawNews = await fetchIpoNews();
        
        const unseenNews = rawNews.filter(t => {
            for (const pub of publishedTopics) {
                if (t.title.toLowerCase().includes(pub.toLowerCase())) return false;
            }
            return true;
        });

        if (unseenNews.length === 0) {
            console.log('⚠️ No new IPO news found right now.');
            return;
        }

        const ipo = await selectIpoTopic(unseenNews);

        if (!ipo || !ipo.company) {
            console.log('⚠️ AI could not pick an IPO topic.');
            return;
        }

        console.log(`\n✅ Selected new IPO: ${ipo.company}`);

        try {
            const articleData = await generateIpoArticle(ipo);
            const imagePath = await generateImage(articleData.slug, articleData.company, articleData.customImagePrompt);

            // Save TS file
            const filePath = path.join(IPO_DIR, `${articleData.slug}.ts`);
            fs.writeFileSync(filePath, articleData.code);
            console.log(`✅ Saved: ${filePath}`);

            await updateIpoApiTs([articleData]);
            
            console.log('🗺️ Regenerating sitemaps...');
            execSync('npm run generate-sitemaps', { cwd: ROOT_DIR, stdio: 'inherit' });
            
            console.log(`🎉 IPO article published successfully!`);
            
            // 🚀 Instantly Index on Google
            await pingGoogleIndexingApi(`https://moneycal.in/ipo/${articleData.slug}`);
            
            // Log company name to avoid duplicates
            publishedTopics.add(ipo.company);
            fs.appendFileSync(PUBLISHED_IPOS_FILE, ipo.company + '\n');

        } catch (err) {
            console.error(`❌ Failed to generate IPO article for "${ipo.company}":`, err.message);
        }

    } catch (err) {
        console.error('🛑 Pipeline Error during cycle:', err);
    }
}

async function main() {
    console.log('🚀 Starting Auto-IPO Publisher (Single Run for GitHub Actions)...');
    await processNextIpo();
}

main();
