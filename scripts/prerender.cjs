/**
 * ═══════════════════════════════════════════════════════════════════════
 * STATIC SEO PRERENDERER — Zero-dependency, works on ANY CI
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * This script runs AFTER Vite build. It reads the built index.html,
 * parses ALL data files to extract SEO metadata (title, description),
 * and generates a unique index.html for EVERY URL on the site with
 * correct <title>, <meta description>, <link rel="canonical">, and
 * Open Graph tags baked in.
 *
 * WHY THIS IS THE BEST METHOD:
 * - No Puppeteer / Chrome needed (works on Cloudflare Pages, Vercel, etc.)
 * - Processes 2,500+ pages in < 5 seconds
 * - Never crashes, never times out
 * - Googlebot sees unique, correct SEO tags on EVERY page immediately
 * - Future-proof: add new data files and they auto-generate
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../dist');
const SRC_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const URLS_FILE = path.join(PUBLIC_DIR, 'all-urls-master.txt');
const BASE_URL = 'https://moneycal.in';

// ═══════════════════════════════════════════════════════════════════════
// HELPER: Extract bracket-balanced array from a string
// ═══════════════════════════════════════════════════════════════════════
/**
 * Given a block of text, find `key: [...]` where `[...]` may contain nested brackets.
 * Returns the content between the outermost brackets, or null.
 */
function extractBracketedArray(text, key) {
    const startRegex = new RegExp(key + ':\\s*\\[');
    const m = startRegex.exec(text);
    if (!m) return null;

    let depth = 1;
    let i = m.index + m[0].length; // right after the opening '['
    const start = i;

    while (i < text.length && depth > 0) {
        const ch = text[i];
        if (ch === '[') depth++;
        else if (ch === ']') depth--;
        else if (ch === "'" || ch === '"' || ch === '`') {
            // Skip over quoted strings to avoid false bracket matches
            const quote = ch;
            i++;
            while (i < text.length && text[i] !== quote) {
                if (text[i] === '\\') i++; // skip escaped chars
                i++;
            }
        }
        i++;
    }

    if (depth !== 0) return null;
    return text.substring(start, i - 1); // exclude the closing ']'
}

// ═══════════════════════════════════════════════════════════════════════
// 1. BUILD SEO MAP — Extract title & description from all data files
// ═══════════════════════════════════════════════════════════════════════

function buildSeoMap() {
    const seoMap = {};

    // Helper: extract {slug, name/title, description/excerpt} from TS files
    function extractFromFile(filePath, slugPrefix, titleField, descField) {
        if (!fs.existsSync(filePath)) return;
        const content = fs.readFileSync(filePath, 'utf-8');

        // Match objects with slug/id + name/title + description/excerpt
        const slugRegex = new RegExp(`(?:slug|id):\\s*['"]([^'"]+)['"]`, 'g');
        const entries = [];
        let match;

        // Split into top-level object blocks using bracket counting
        // This correctly handles nested arrays/objects inside each entry
        const blocks = [];
        // Find the start of the main array
        const arrayStart = content.search(/\[\s*\{/);
        if (arrayStart === -1) return;
        
        let depth = 0;
        let blockStart = -1;
        for (let i = arrayStart; i < content.length; i++) {
            const ch = content[i];
            if (ch === '{') {
                if (depth === 1) blockStart = i; // top-level object start (inside the main array)
                depth++;
            } else if (ch === '}') {
                depth--;
                if (depth === 1 && blockStart !== -1) {
                    blocks.push(content.substring(blockStart, i + 1));
                    blockStart = -1;
                }
            } else if (ch === '[') {
                if (depth === 0) depth = 1; // entering the main array
                else depth++;
            } else if (ch === ']') {
                depth--;
            } else if (ch === "'" || ch === '"' || ch === '`') {
                // Skip quoted strings
                const quote = ch;
                i++;
                while (i < content.length && content[i] !== quote) {
                    if (content[i] === '\\') i++;
                    i++;
                }
            }
        }

        blocks.forEach(block => {
            const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/) || block.match(/id:\s*['"]([^'"]+)['"]/);
            const titleMatch = block.match(new RegExp(`(?:${titleField}):\\s*['"]([^'"]+)['"]`));
            const descMatch = block.match(new RegExp(`(?:${descField}):\\s*['"]([^'"]{10,}?)['"]`));
            const dateMatch = block.match(/date:\s*['"]([^'"]+)['"]/);

            if (slugMatch) {
                const slug = slugMatch[1];
                const title = titleMatch ? titleMatch[1] : humanize(slug);
                const desc = descMatch ? descMatch[1].substring(0, 160) : '';
                const date = dateMatch ? dateMatch[1] : undefined;
                const urlPath = `${slugPrefix}/${slug}`;

                // Extract FAQs
                const faqMatch = block.match(/(?:faqs|faqSchema):\s*\[([\s\S]*?)\]/);
                const faqs = [];
                if (faqMatch) {
                    const faqBlocks = faqMatch[1].split(/\{\s*\n?\s*(?:question|q):/);
                    faqBlocks.slice(1).forEach(fBlock => {
                        const qMatch = fBlock.match(/^[^'"]*['"]([^'"]+)['"]/);
                        const aMatch = fBlock.match(/(?:answer|a):\s*['"]([^'"]+)['"]/);
                        if (qMatch && aMatch) faqs.push({ question: qMatch[1], answer: aMatch[1] });
                    });
                }

                // Extract HowTo for Schemes (applicationProcess)
                const applicationProcessMatch = block.match(/applicationProcess:\s*\[([\s\S]*?)\]/);
                const howToSteps = [];
                if (applicationProcessMatch) {
                    const itemRegex = /['"]([^'"]+)['"]/g;
                    let m;
                    while ((m = itemRegex.exec(applicationProcessMatch[1])) !== null) {
                        howToSteps.push({ step: `Step ${howToSteps.length + 1}`, details: m[1] });
                    }
                }

                // Extract Body Content (for pure static HTML generation)
                let bodyHtml = '';
                const contentStr = extractBracketedArray(block, 'content');
                if (contentStr) {
                    const itemBlocks = contentStr.split(/\}\s*,\s*\{/);
                    itemBlocks.forEach(ib => {
                        const typeM = ib.match(/type:\s*['"]([^'"]+)['"]/);
                        const contM = ib.match(/content:\s*['" \`]([\s\S]*?)['" \`]\s*(?=,|}|\]|$)/);
                        const type = typeM ? typeM[1] : '';
                        let text = contM ? contM[1] : '';

                        text = text.replace(/\\(['"`])/g, '$1');

                        if (type === 'heading') bodyHtml += `<h2 style="font-size:1.8rem;font-weight:800;margin:2.5rem 0 1.25rem;color:#111827">${text}</h2>`;
                        else if (type === 'subheading') bodyHtml += `<h3 style="font-size:1.5rem;font-weight:800;margin:2rem 0 1rem;color:#111827">${text}</h3>`;
                        else if (type === 'paragraph') bodyHtml += `<p style="margin-bottom:1.5rem">${text}</p>`;
                        else if (type === 'highlight') {
                            bodyHtml += `<div style="background:#f0f9ff;border-left:4px solid #3b82f6;padding:1.5rem;border-radius:0.5rem;margin:2rem 0">`;
                            if (text) bodyHtml += `<h3 style="font-size:1.2rem;font-weight:700;color:#2563eb;margin:0 0 1rem 0">${text}</h3>`;
                            const itemsM = ib.match(/items:\s*\[([\s\S]*?)\]/);
                            if (itemsM) {
                                const listItems = [];
                                const itemRegex = /(['"])((?:(?!\1)[^\\]|\\.)*?)\1/g;
                                let match;
                                while ((match = itemRegex.exec(itemsM[1])) !== null) {
                                    listItems.push(match[2].replace(/\\(['"`])/g, '$1'));
                                }
                                if (listItems.length > 0) {
                                    bodyHtml += `<ul style="margin:0;padding-left:1.5rem">${listItems.map(li => `<li style="margin-bottom:0.5rem;color:#4b5563">${li}</li>`).join('')}</ul>`;
                                }
                            }
                            bodyHtml += `</div>`;
                        }
                        else if (type === 'list') {
                            const itemsM = ib.match(/items:\s*\[([\s\S]*?)\]/);
                            if (itemsM) {
                                const listItems = [];
                                const itemRegex = /(['"])((?:(?!\1)[^\\]|\\.)*?)\1/g;
                                let match;
                                while ((match = itemRegex.exec(itemsM[1])) !== null) {
                                    listItems.push(match[2].replace(/\\(['"`])/g, '$1'));
                                }
                                if (listItems.length > 0) {
                                    bodyHtml += `<ul style="margin-bottom:1.5rem;padding-left:1.5rem">${listItems.map(li => `<li style="margin-bottom:0.5rem">${li}</li>`).join('')}</ul>`;
                                }
                            }
                        }
                    });

                    // Inject Ads
                    const adHtml = `\n<div class="ad-unit in-article-ad my-8 text-center" style="margin:2rem 0;text-align:center;"><span class="text-[10px] text-gray-400 block mb-1" style="font-size:10px;color:#9ca3af;margin-bottom:4px;display:block;">Advertisement</span><ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-6815277662449747"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>\n`;
                    let pCount = 0;
                    bodyHtml = bodyHtml.split(/(?=<(?:p|h2|h3|ul|div) )/).map(chunk => {
                        if (chunk.trim() && !chunk.startsWith('<h') && !chunk.startsWith('<div')) {
                            pCount++;
                            if (pCount > 0 && pCount % 3 === 0 && pCount <= 15) {
                                return chunk + adHtml;
                            }
                        }
                        return chunk;
                    }).join('');
                } else {
                    // Fallback: simple string content
                    const simpleContentMatch = block.match(/content:\s*[`"']([\s\S]*?)[`"']\s*[,}]/);
                    if (simpleContentMatch) bodyHtml = simpleMarkdownToHtml(simpleContentMatch[1]);
                }

                seoMap[urlPath] = {
                    title,
                    description: desc,
                    date: date,
                    section: slugPrefix.replace(/^\//, ''),
                    body: bodyHtml || undefined,
                    faqs: faqs.length > 0 ? faqs : undefined,
                    howToSteps: howToSteps.length > 0 ? howToSteps : undefined
                };
            }
        });
    }

    // --- Calculators ---
    console.log('  📊 Parsing calculatorData.ts...');
    const calcPath = path.join(SRC_DIR, 'data/calculatorData.ts');
    if (fs.existsSync(calcPath)) {
        const content = fs.readFileSync(calcPath, 'utf-8');
        // Extract calculators with improved regex to handle structured 'info' object
        const calcBlocks = content.split(/\{\s*\n?\s*id:\s*['"]/);
        calcBlocks.forEach(block => {
            const idMatch = block.match(/^([^'"]+)['"]/);
            if (!idMatch) return;
            const id = idMatch[1];
            const urlPath = `/calculators/${id}`;
            
            // Match name and description
            const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
            const descMatch = block.match(/description:\s*['"]([^'"]+)['"]/);

            if (nameMatch && descMatch) {
                const name = nameMatch[1];
                const desc = descMatch[1];

                // Extract info (Legacy Array or New Object)
                let bodyHtml = '';
                let faqs = [];
                
                const infoArrayMatch = block.match(/info:\s*\[([\s\S]*?)\]/);
                const infoObjectMatch = block.match(/info:\s*\{([\s\S]*?)\n\s*\}\s*(?:,|\n)/);

                if (infoArrayMatch) {
                    const infoItems = [];
                    const itemRegex = /['"]([^'"]+)['"]/g;
                    let m;
                    while ((m = itemRegex.exec(infoArrayMatch[1])) !== null) {
                        infoItems.push(m[1]);
                    }
                    if (infoItems.length > 0) {
                        bodyHtml = infoItems.map(item => `<p style="margin-bottom:1.5rem">${item}</p>`).join('');
                    }
                } else if (infoObjectMatch) {
                    const infoContent = infoObjectMatch[1];
                    
                    // Extract Benefits
                    const benefitsMatch = infoContent.match(/benefits:\s*\[([\s\S]*?)\]/);
                    if (benefitsMatch) {
                        const benefits = benefitsMatch[1].split(',').map(b => b.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
                        if (benefits.length > 0) {
                            bodyHtml += `<h2 style="color:#111827;font-size:1.4rem;margin:1.5rem 0 1rem">Key Benefits</h2><ul>${benefits.map(b => `<li style="margin-bottom:0.5rem">${escapeHtml(b)}</li>`).join('')}</ul>`;
                        }
                    }

                    // Extract HowToSteps
                    const howToMatch = infoContent.match(/howToSteps:\s*\[([\s\S]*?)\]/);
                    let howToSteps = [];
                    if (howToMatch) {
                        const sBlocks = howToMatch[1].split(/\{\s*\n?\s*step:/);
                        sBlocks.slice(1).forEach(sb => {
                            const s = sb.match(/^[^'"]*['"]([^'"]+)['"]/);
                            const d = sb.match(/details:\s*['"]([^'"]+)['"]/);
                            if (s && d) howToSteps.push({ step: s[1], details: d[1] });
                        });
                    }

                    // Extract FAQs from info object
                    const faqBlockMatch = infoContent.match(/faqs:\s*\[([\s\S]*?)\]/);
                    if (faqBlockMatch) {
                        const fBlocks = faqBlockMatch[1].split(/\{\s*\n?\s*question:/);
                        fBlocks.slice(1).forEach(fb => {
                            const q = fb.match(/^[^'"]*['"]([^'"]+)['"]/);
                            const a = fb.match(/answer:\s*['"]([^'"]+)['"]/);
                            if (q && a) faqs.push({ question: q[1], answer: a[1] });
                        });
                    }
                }

                // Fallback: Check for faqs outside info (standalone property)
                if (faqs.length === 0) {
                    const faqMatch = block.match(/faqs:\s*\[([\s\S]*?)\]/);
                    if (faqMatch) {
                        const fBlocks = faqMatch[1].split(/\{\s*\n?\s*question:/);
                        fBlocks.slice(1).forEach(fb => {
                            const q = fb.match(/^[^'"]*['"]([^'"]+)['"]/);
                            const a = fb.match(/answer:\s*['"]([^'"]+)['"]/);
                            if (q && a) faqs.push({ question: q[1], answer: a[1] });
                        });
                    }
                }

                // Check if this is a calculator or a category
                if (block.includes('category:')) {
                    // It's a calculator
                    seoMap[`/calculators/${id}`] = {
                        title: `${name} - Free Online Calculator | MoneyCal.in`,
                        description: desc.substring(0, 160),
                        section: 'calculators',
                        body: bodyHtml,
                        faqs: faqs.length > 0 ? faqs : undefined,
                        howToSteps: typeof howToSteps !== 'undefined' && howToSteps.length > 0 ? howToSteps : undefined
                    };
                } else if (block.includes('calculators:')) {
                    // It's a category
                    seoMap[`/category/${id}`] = {
                        title: `${name} - Financial Calculators | MoneyCal.in`,
                        description: desc.substring(0, 160),
                        section: 'category'
                    };
                }
            }
        });
    }

    // --- Blog Posts ---
    console.log('  📝 Parsing blog data files...');
    const blogDataDir = path.join(SRC_DIR, 'data');
    const blogsDir = path.join(SRC_DIR, 'data/blogs');

    function parseBlogFile(filePath) {
        if (!fs.existsSync(filePath)) return;
        const content = fs.readFileSync(filePath, 'utf-8');
        // Split by BlogPost markers or objects
        const blocks = content.split(/\{\s*\n?\s*id:\s*/);

        blocks.forEach(block => {
            const slugMatch = block.match(/slug:\s*["']([^"']+)["']/);
            const titleMatch = block.match(/title:\s*["']([^"']+)["']/);
            const excerptMatch = block.match(/excerpt:\s*["']([^"']{10,}?)["']/);
            const metaTitleMatch = block.match(/metaTitle:\s*["']([^"']+)["']/);
            const metaDescMatch = block.match(/metaDescription:\s*["']([^"']+)["']/);

            if (slugMatch) {
                const slug = slugMatch[1];
                let bodyHtml = '';

                // Try to extract content array [...]
                const contentArrMatch = block.match(/content:\s*\[([\s\S]*?)\]\s*(,?\s*lastModified|,\s*readingTime|,\s*featured|,\s*structuredData|,\s*faqSchema|,\s*})/);
                if (contentArrMatch) {
                    const contentStr = contentArrMatch[1];
                    const itemBlocks = contentStr.split(/\}\s*,\s*\{/);
                    itemBlocks.forEach(ib => {
                        const typeM = ib.match(/type:\s*['"]([^'"]+)['"]/);
                        // Improved regex to handle various ending scenarios (comma, closing brace, end of string)
                        // This one uses lookahead to stop properly at boundaries
                        const contM = ib.match(/content:\s*['" \`]([\s\S]*?)['" \`]\s*(?=,|}|\]|$)/);
                        const type = typeM ? typeM[1] : '';
                        let text = contM ? contM[1] : '';

                        // Fix escaped quotes in text
                        text = text.replace(/\\(['"`])/g, '$1');

                        if (type === 'heading') bodyHtml += `<h2 style="font-size:1.8rem;font-weight:800;margin:2.5rem 0 1.25rem;color:#111827">${text}</h2>`;
                        else if (type === 'subheading') bodyHtml += `<h3 style="font-size:1.5rem;font-weight:800;margin:2rem 0 1rem;color:#111827">${text}</h3>`;
                        else if (type === 'paragraph') bodyHtml += `<p style="margin-bottom:1.5rem">${text}</p>`;
                        else if (type === 'list') {
                            const itemsM = ib.match(/items:\s*\[([\s\S]*?)\]/);
                            if (itemsM) {
                                // Extract strings from the array correctly handling escaped quotes
                                const listItems = [];
                                // This regex handles both single and double quotes and escaped versions
                                const itemRegex = /(['"])((?:(?!\1)[^\\]|\\.)*?)\1/g;
                                let match;
                                while ((match = itemRegex.exec(itemsM[1])) !== null) {
                                    // Remove escapes from the captured text
                                    listItems.push(match[2].replace(/\\(['"`])/g, '$1'));
                                }
                                if (listItems.length > 0) {
                                    bodyHtml += `<ul style="margin-bottom:1.5rem;padding-left:1.5rem">${listItems.map(li => `<li style="margin-bottom:0.5rem">${li}</li>`).join('')}</ul>`;
                                }
                            }
                        }
                    });

                    // Inject Ads into structured blog blocks (4-5 ads)
                    const adHtml = `\n<div class="ad-unit in-article-ad my-8 text-center" style="margin:2rem 0;text-align:center;"><span class="text-[10px] text-gray-400 block mb-1" style="font-size:10px;color:#9ca3af;margin-bottom:4px;display:block;">Advertisement</span><ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-6815277662449747"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>\n`;
                    let pCount = 0;
                    bodyHtml = bodyHtml.split(/(?=<(?:p|h2|h3|ul) )/).map(chunk => {
                        if (chunk.trim() && !chunk.startsWith('<h')) {
                            pCount++;
                            if (pCount > 0 && pCount % 3 === 0 && pCount <= 15) {
                                return chunk + adHtml;
                            }
                        }
                        return chunk;
                    }).join('');
                } else {
                    // Fallback: simple string content
                    const simpleContentMatch = block.match(/content:\s*[`"']([\s\S]*?)[`"']\s*[,}]/);
                    if (simpleContentMatch) bodyHtml = simpleMarkdownToHtml(simpleContentMatch[1]);
                }

                seoMap[`/blog/${slug}`] = {
                    title: (metaTitleMatch ? metaTitleMatch[1] : (titleMatch ? titleMatch[1] : humanize(slug))) + ' | MoneyCal.in',
                    description: (metaDescMatch ? metaDescMatch[1] : (excerptMatch ? excerptMatch[1] : '')).substring(0, 160),
                    section: 'blog',
                    body: bodyHtml,
                    faqs: block.includes('faqSchema:') ? [] : undefined
                };
            }
        });
    }

    // Advanced blog parsing to get FAQs
    function parseBlogFileAdvanced(filePath) {
        if (!fs.existsSync(filePath)) return;
        const content = fs.readFileSync(filePath, 'utf-8');
        const blocks = content.split(/\{\s*\n?\s*id:\s*\d+/);
        blocks.forEach(block => {
            const slugMatch = block.match(/slug:\s*["']([^"']+)["']/);
            if (slugMatch) {
                const urlPath = `/blog/${slugMatch[1]}`;
                const faqMatch = block.match(/faqSchema:\s*\[([\s\S]*?)\]/);
                if (faqMatch) {
                    const faqs = [];
                    const fBlocks = faqMatch[1].split(/question:\s*['"]/);
                    fBlocks.slice(1).forEach(fb => {
                        const q = fb.match(/^([^'"]+)/);
                        const a = fb.match(/answer:\s*['"]([^'"]+)/);
                        if (q && a) faqs.push({ question: q[1], answer: a[1] });
                    });
                    if (faqs.length > 0 && seoMap[urlPath]) seoMap[urlPath].faqs = faqs;
                }
            }
        });
    }

    if (fs.existsSync(blogDataDir)) {
        fs.readdirSync(blogDataDir)
            .filter(f => f.startsWith('blogData') && f.endsWith('.ts'))
            .forEach(f => {
                console.log(`    - Starting: ${f}`);
                parseBlogFile(path.join(blogDataDir, f));
                parseBlogFileAdvanced(path.join(blogDataDir, f));
                console.log(`    - Done: ${f}`);
            });
        console.log(`    - Starting: optimizedBlogPosts.ts`);
        parseBlogFile(path.join(blogDataDir, 'optimizedBlogPosts.ts'));
        parseBlogFileAdvanced(path.join(blogDataDir, 'optimizedBlogPosts.ts'));
        console.log(`    - Done: optimizedBlogPosts.ts`);
    }
    if (fs.existsSync(blogsDir)) {
        walkDir(blogsDir, f => { parseBlogFile(f); parseBlogFileAdvanced(f); });
    }

    extractFromFile(path.join(SRC_DIR, 'data/governmentSchemesData.ts'), '/government-schemes', 'title|name', 'description|excerpt');
    
    // --- Strategic 2026 Silos ---
    console.log('  🏗️ Parsing 2026 Strategic Silos...');
    const SILOS_DIR = path.join(SRC_DIR, 'data/silos');
    extractFromFile(path.join(SILOS_DIR, 'msmeSubsidiesData.ts'), '/msme-subsidies', 'title|name', 'description|excerpt|excerptHindi');
    extractFromFile(path.join(SILOS_DIR, 'landRecordsData.ts'), '/land-records', 'title|name', 'description|excerpt|excerptHindi');
    extractFromFile(path.join(SILOS_DIR, 'scholarshipsData.ts'), '/scholarships', 'title|name', 'description|excerpt|excerptHindi');
    extractFromFile(path.join(SILOS_DIR, 'youthBankingData.ts'), '/youth-banking', 'title|name', 'description|excerpt|excerptHindi');
    extractFromFile(path.join(SILOS_DIR, 'taxation2026Data.ts'), '/taxation-2026', 'title|name', 'description|excerpt|excerptHindi');
    extractFromFile(path.join(SILOS_DIR, 'scamDiagnosticsData.ts'), '/scam-diagnostics', 'title|name', 'description|excerpt|excerptHindi');
    extractFromFile(path.join(SILOS_DIR, 'tradingTerminalsData.ts'), '/trading-terminals', 'title|name', 'description|excerpt|excerptHindi');
    extractFromFile(path.join(SILOS_DIR, 'macroTrendsData.ts'), '/macro-trends', 'title|name', 'description|excerpt|excerptHindi');
    extractFromFile(path.join(SILOS_DIR, 'insuranceNicheData.ts'), '/insurance-niche', 'title|name', 'description|excerpt|excerptHindi');

    // --- Crypto ---
    console.log('  🪙 Parsing cryptoData.ts...');
    extractFromFile(path.join(SRC_DIR, 'data/cryptoData.ts'), '/crypto', 'title|name', 'description|excerpt');

    // --- Discover Articles ---
    console.log('  📰 Parsing Discover articles from src/data/discover/*.ts...');
    const discoverDir = path.join(SRC_DIR, 'data/discover');
    if (fs.existsSync(discoverDir)) {
        fs.readdirSync(discoverDir).forEach(file => {
            if (!file.endsWith('.ts') || file === 'types.ts' || file === 'index.ts') return;
            const filePath = path.join(discoverDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            const slugMatch = content.match(/slug:\s*['"]([^'"]+)['"]/);
            const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
            const snippetMatch = content.match(/snippet:\s*['"]([^'"]+)['"]/);
            const coverMatch = content.match(/coverImage:\s*['"`]([^'"`]+)['"`]/);
            // Match fixed date strings like '2026-07-02T...' or new Date().toISOString()
            const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/) || content.match(/date:\s*new Date\(\)\.toISOString\(\)/);

            if (slugMatch && titleMatch) {
                const slug = slugMatch[1];
                const title = titleMatch[1];
                const snippet = snippetMatch ? snippetMatch[1].substring(0, 160) : '';
                const coverImage = coverMatch ? coverMatch[1] : '';
                const fullCoverUrl = coverImage.startsWith('http') ? coverImage : `https://moneycal.in${coverImage}`;

                // Extract date — if it's new Date(), use current time; if fixed string, use it
                let articleDate;
                if (dateMatch && dateMatch[1]) {
                    articleDate = dateMatch[1];
                } else {
                    articleDate = new Date().toISOString();
                }

                // Build body HTML from sections
                let bodyHtml = '';
                const sectionsContent = content.match(/sections:\s*\[([\s\S]*)\]\s*\n?\s*\};?\s*$/);
                if (sectionsContent) {
                    const sectionStr = sectionsContent[1];
                    // Split by section object boundaries
                    const sectionBlocks = sectionStr.split(/\}\s*,\s*\{/);
                    sectionBlocks.forEach(sb => {
                        const typeM = sb.match(/type:\s*['"]([^'"]+)['"]/);
                        const contM = sb.match(/content:\s*['"]([^]*?)(?:'\s*\}|"\s*\})/);
                        // Simpler extraction for content
                        const contentExtract = sb.match(/content:\s*['"]([\s\S]*?)['"]\s*$/m);
                        const type = typeM ? typeM[1] : '';
                        let text = contentExtract ? contentExtract[1] : (contM ? contM[1] : '');
                        text = text.replace(/\\(['"` ])/g, '$1');

                        if (type === 'h2') bodyHtml += `<h2 style="font-size:1.5rem;font-weight:800;margin:2rem 0 1rem;color:#111827">${text}</h2>`;
                        else if (type === 'h3') bodyHtml += `<h3 style="font-size:1.25rem;font-weight:700;margin:1.5rem 0 0.75rem;color:#111827">${text}</h3>`;
                        else if (type === 'p') bodyHtml += `<p style="margin-bottom:1.5rem">${text.substring(0, 500)}</p>`;
                        else if (type === 'callout') bodyHtml += `<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:15px 20px;margin:25px 0;border-radius:0 8px 8px 0">${text.substring(0, 300)}</div>`;
                    });
                }

                seoMap[`/discover/${slug}`] = {
                    title: title,
                    description: snippet,
                    section: 'discover',
                    date: articleDate,
                    coverImage: fullCoverUrl,
                    body: bodyHtml || undefined
                };
            }
        });
        console.log(`    ✅ Parsed ${Object.keys(seoMap).filter(k => k.startsWith('/discover/')).length} discover articles`);
    }

    // --- Excel Tools ---
    console.log('  📗 Parsing excelToolsData.ts + exceltooldata.ts...');
    extractFromFile(path.join(SRC_DIR, 'data/excelToolsData.ts'), '/excel-tools', 'title|name', 'description|excerpt');
    extractFromFile(path.join(SRC_DIR, 'data/newExcelData.ts'), '/exceltool', 'title|name', 'description|excerpt');

    // Excel Tool Blog Posts
    const excelBlogPath = path.join(SRC_DIR, 'data/exceltooldata.ts');
    if (fs.existsSync(excelBlogPath)) {
        const content = fs.readFileSync(excelBlogPath, 'utf-8');
        const blocks = content.split(/\{\s*\n?\s*id:\s*['"]\d+['"]/);
        blocks.forEach(block => {
            const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
            const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
            const excerptMatch = block.match(/excerpt:\s*['"]([^'"]+)['"]/);
            if (slugMatch && titleMatch) {
                seoMap[`/excel-tools/${slugMatch[1]}`] = {
                    title: `${titleMatch[1]} | MoneyCal Excel Tools`,
                    description: (excerptMatch ? excerptMatch[1] : titleMatch[1]).substring(0, 160)
                };
            }
        });
    }

    // --- Gold Tools ---
    console.log('  🥇 Parsing goldTools.ts...');
    extractFromFile(path.join(SRC_DIR, 'data/goldTools.ts'), '/gold-tools', 'title|name', 'description|excerpt');

    // --- Festival Tools ---
    console.log('  🎉 Parsing festivalTools.ts...');
    const festivalPath = path.join(SRC_DIR, 'data/festivalTools.ts');
    if (fs.existsSync(festivalPath)) {
        const content = fs.readFileSync(festivalPath, 'utf-8');
        let currentFestival = null;
        content.split('\n').forEach(line => {
            const festivalMatch = line.match(/^\s{4}slug:\s*['"]([^'"]+)['"]/);
            if (festivalMatch) {
                currentFestival = festivalMatch[1];
                seoMap[`/festival-tools/${currentFestival}`] = {
                    title: `${humanize(currentFestival)} Festival Tools | MoneyCal.in`,
                    description: `Free ${humanize(currentFestival)} festival tools and calculators for India.`
                };
            }
            const toolMatch = line.match(/^\s{6,8}slug:\s*['"]([^'"]+)['"]/);
            if (toolMatch && currentFestival) {
                seoMap[`/festival-tools/${currentFestival}/${toolMatch[1]}`] = {
                    title: `${humanize(toolMatch[1])} - ${humanize(currentFestival)} Tool | MoneyCal.in`,
                    description: `Free ${humanize(toolMatch[1])} tool for ${humanize(currentFestival)} festival.`
                };
            }
        });
    }

    // --- GK Data ---
    console.log('  🧠 Parsing gkData.ts (Hub + Categories + Topics)...');
    const gkPath = path.join(SRC_DIR, 'data/gkData.ts');
    if (fs.existsSync(gkPath)) {
        const content = fs.readFileSync(gkPath, 'utf-8');
        // Extract category slugs
        const categoryBlocks = content.split(/export const \w+Category\s*[:=]\s*\{/);
        categoryBlocks.slice(1).forEach(block => {
            const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
            const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
            const descMatch = block.match(/description:\s*['"]([^'"]+)['"]/);

            if (slugMatch && nameMatch) {
                const catSlug = slugMatch[1];
                seoMap[`/gk/${catSlug}`] = {
                    title: `${nameMatch[1]} GK Quiz - General Knowledge | MoneyCal.in`,
                    description: (descMatch ? descMatch[1] : `Test your knowledge in ${nameMatch[1]} with our free GK quiz.`).substring(0, 160)
                };

                // Find topics for this category - look for the corresponding lessons/topics array
                // The structure is usually: category object, then lessons/topics array
                const lessonsMatch = content.match(new RegExp(`export const ${catSlug.replace(/-/g, '')}Topics:.*?=\\s*\\[([\\s\\S]*?)\\];`, 'i'));
                if (lessonsMatch) {
                    const topicBlocks = lessonsMatch[1].split(/\{\s*\n?\s*id:/);
                    topicBlocks.slice(1).forEach(tBlock => {
                        const tSlugMatch = tBlock.match(/slug:\s*['"]([^'"]+)['"]/);
                        const tTitleMatch = tBlock.match(/title:\s*['"]([^'"]+)['"]/);
                        if (tSlugMatch && tTitleMatch) {
                            seoMap[`/gk/${catSlug}/${tSlugMatch[1]}`] = {
                                title: `${tTitleMatch[1]} - ${nameMatch[1]} GK Topic | MoneyCal.in`,
                                description: `Learn about ${tTitleMatch[1]} in our ${nameMatch[1]} general knowledge section.`
                            };
                        }
                    });
                }
            }
        });
    }

    // --- Blog data from src/data ---
    console.log('  📝 Parsing blog content from src/data...');
    const dataDirs = [
        path.join(SRC_DIR, 'data'),
        path.join(SRC_DIR, 'data/blogs')
    ];

    dataDirs.forEach(dir => {
        if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach(file => {
                if (file.endsWith('.ts') && !file.includes('.d.ts')) {
                    parseBlogFile(path.join(dir, file), seoMap);
                }
            });
        }
    });

    // --- News articles from contentRegistry & articleLoader ---
    console.log('  📰 Parsing news articles (structured & plain)...');
    const registryPath = path.join(SRC_DIR, 'cms-content/contentRegistry.ts');
    const loaderPath = path.join(SRC_DIR, 'cms-content/articleLoader.ts');
    const plainLoaderPath = path.join(SRC_DIR, 'cms-content/plainArticleLoader.ts');

    // 1. Build a map of variable names to their raw object content from all files in cms-content
    const variableContentMap = {};
    const cmsDir = path.join(SRC_DIR, 'cms-content');
    const newsDataDir = path.join(SRC_DIR, 'data/news-articles');

    const scanDirs = [cmsDir, newsDataDir];
    scanDirs.forEach(dir => {
        if (fs.existsSync(dir)) {
            walkDir(dir, f => {
                if (f.includes('articleLoader.ts') || f.includes('contentRegistry.ts')) return;
                const fileContent = fs.readFileSync(f, 'utf-8');

            // Extract NewsGuideSection objects
            // Match "export const variableName: NewsGuideSection = { ... };" or "const variableName: NewsGuideSection = { ... };"
            const guideMatches = fileContent.matchAll(/(?:export\s+)?const\s+(\w+):\s*NewsGuideSection\s*=\s*\{([\s\S]*?)\};/g);
            for (const m of guideMatches) {
                const varName = m[1];
                const objStr = m[2];
                // Simple parsing of fields for NewsGuideSection
                const headline = (objStr.match(/headline:\s*['"]([^'"]+)['"]/) || [])[1];
                const subheadline = (objStr.match(/subheadline:\s*['"]([^'"]+)['"]/) || [])[1];

                // Construct a mini-article object for convertNewsGuideToHtml
                const miniArticle = {
                    whatsNew: { summary: (objStr.match(/summary:\s*['"]([^'"]{20,})['"]/) || [])[1] },
                    whyItMatters: {
                        significance: (objStr.match(/significance:\s*['"]([^'"]{20,})['"]/) || [])[1],
                        impact: (objStr.match(/impact:\s*\[([\s\S]*?)\]/) || ['', ''])[1].split(/['"],\s*['"]/).map(s => s.replace(/^['"]|['"]$/g, ''))
                    },
                    takeaway: {
                        forReaders: (objStr.match(/forReaders:\s*\[([\s\S]*?)\]/) || ['', ''])[1].split(/['"],\s*['"]/).map(s => s.replace(/^['"]|['"]$/g, ''))
                    }
                };

                // Extract Facts
                const factsMatch = objStr.match(/facts:\s*\[([\s\S]*?)\]/);
                if (factsMatch) {
                    miniArticle.keyData = { facts: [] };
                    const fBlocks = factsMatch[1].split(/\{\s*\n?\s*label:/);
                    fBlocks.slice(1).forEach(fb => {
                        const l = (fb.match(/^[^'"]*['"]([^'"]+)['"]/) || [])[1];
                        const v = (fb.match(/value:\s*['"]([^'"]+)['"]/) || [])[1];
                        if (l && v) miniArticle.keyData.facts.push({ label: l, value: v });
                    });
                }

                // Extract Main Topics
                const topicsMatch = objStr.match(/mainTopics:\s*\[([\s\S]*?)\]/);
                if (topicsMatch) {
                    miniArticle.coverage = { mainTopics: [] };
                    const tBlocks = topicsMatch[1].split(/\{\s*\n?\s*title:/);
                    tBlocks.slice(1).forEach(tb => {
                        const t = (tb.match(/^[^'"]*['"]([^'"]+)['"]/) || [])[1];
                        const d = (tb.match(/description:\s*['"]([^'"]+)['"]/) || [])[1];
                        const sMatch = tb.match(/subtopics:\s*\[([\s\S]*?)\]/);
                        const s = sMatch ? sMatch[1].split(/['"],\s*['"]/).map(sub => sub.replace(/^['"]|['"]$/g, '')) : [];
                        if (t) miniArticle.coverage.mainTopics.push({ title: t, description: d || '', subtopics: s });
                    });
                }

                variableContentMap[varName] = convertNewsGuideToHtml(miniArticle);
            }
        });
        }
    });

    // 2. Map slugs to content using articleLoader.ts
    if (fs.existsSync(loaderPath)) {
        const loaderContent = fs.readFileSync(loaderPath, 'utf-8');
        const mappingMatch = loaderContent.match(/export const articleContentMap:.*?=\s*\{([\s\S]*?)\};/);
        if (mappingMatch) {
            const mapLines = mappingMatch[1].split('\n');
            mapLines.forEach(line => {
                const match = line.match(/^\s*['"]([^'"]+)['"]\s*:\s*(\w+)/);
                if (match) {
                    const slug = match[1];
                    const varName = match[2];
                    const path = `/news/${slug}`; // We'll handle category below

                    // We need to find the category to match the seoMap keys correctly
                    // But we can just set it for all possible categories if needed, or rely on the registry
                }
            });
        }
    }

    if (fs.existsSync(registryPath)) {
        const content = fs.readFileSync(registryPath, 'utf-8');
        const loaderContent = fs.existsSync(loaderPath) ? fs.readFileSync(loaderPath, 'utf-8') : '';
        const plainLoaderContent = fs.existsSync(plainLoaderPath) ? fs.readFileSync(plainLoaderPath, 'utf-8') : '';

        const blocks = content.split(/\n\s*\{/).slice(1);
        blocks.forEach(block => {
            const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
            const categoryMatch = block.match(/category:\s*['"]([^'"]+)['"]/);
            const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);

            if (slugMatch && titleMatch) {
                const slug = slugMatch[1];
                const category = categoryMatch ? categoryMatch[1] : 'markets';
                const urlPath = `/news/${category}/${slug}`;

                // Find variable name in articleLoader
                const varMatch = loaderContent.match(new RegExp(`['"]${slug}['"]\\s*:\\s*(\\w+)`));
                if (varMatch && variableContentMap[varMatch[1]]) {
                    seoMap[urlPath] = {
                        title: `${titleMatch[1]} | MoneyCal News`,
                        description: titleMatch[1].substring(0, 160),
                        section: 'news',
                        body: variableContentMap[varMatch[1]]
                    };
                } else {
                    // Try plainArticleLoader
                    const plainMatch = plainLoaderContent.match(new RegExp(`['"]${slug}['"]\\s*:\\s*\\{[\\s\S]*?content:\\s*['" \`]([\\s\\S]*?)['" \`]`, 'i'));
                    if (plainMatch) {
                        seoMap[urlPath] = {
                            title: `${titleMatch[1]} | MoneyCal News`,
                            description: titleMatch[1].substring(0, 160),
                            section: 'news',
                            body: simpleMarkdownToHtml(plainMatch[1])
                        };
                    } else {
                        seoMap[urlPath] = {
                            title: `${titleMatch[1]} | MoneyCal News`,
                            description: titleMatch[1].substring(0, 160),
                            section: 'news'
                        };
                    }
                }
            }
        });
    }

    // --- Learning Center Lessons ---
    console.log('  🎓 Parsing Learn lessons from data/learn/*.ts...');
    const learnDir = path.join(SRC_DIR, 'data/learn');
    if (fs.existsSync(learnDir)) {
        fs.readdirSync(learnDir).forEach(file => {
            if (!file.endsWith('.ts')) return;
            const content = fs.readFileSync(path.join(learnDir, file), 'utf-8');

            // Extract category slug from the file
            const catMatch = content.match(/slug:\s*['"]([^'"]+)['"]/);
            if (!catMatch) return;
            const catSlug = catMatch[1];

            // Extract lessons
            const lessonBlocks = content.split(/\{\s*\n?\s*id:\s*['"]/);
            lessonBlocks.slice(1).forEach(block => {
                const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
                const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
                const descMatch = block.match(/description:\s*['"]([^'"]+)['"]/);

                if (slugMatch && titleMatch) {
                    seoMap[`/learn/${catSlug}/${slugMatch[1]}`] = {
                        title: `${titleMatch[1]} - MoneyCal Academy`,
                        description: (descMatch ? descMatch[1] : titleMatch[1]).substring(0, 160),
                        section: 'learn'
                    };
                }
            });
        });
    }

    // --- Static/known pages ---
    const staticPages = {
        '/': { title: 'MoneyCal.in - Free Financial Calculators for India', description: "India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more." },
        '/blog': { title: 'Financial Blog - Expert Articles | MoneyCal.in', description: 'Read expert articles on personal finance, investments, tax planning, and more.' },
        '/learn': { title: 'Learn Finance - Free Courses | MoneyCal.in', description: 'Free financial education courses covering investments, tax planning, insurance, and more.' },
        '/tools': { title: 'Financial Tools & Utilities | MoneyCal.in', description: 'Free online financial tools for budgeting, tax computation, loan analysis, and more.' },
        '/news': { title: 'Financial News & Market Updates | MoneyCal.in', description: 'Latest financial news, market updates, and economic analysis for India.' },
        '/about-us': { title: 'About Us | MoneyCal.in', description: 'Learn about MoneyCal.in - India\'s most comprehensive financial calculator platform.' },
        '/contact-us': { title: 'Contact Us | MoneyCal.in', description: 'Get in touch with the MoneyCal.in team for support, feedback, or partnerships.' },
        '/privacy-policy': { title: 'Privacy Policy | MoneyCal.in', description: 'Read our privacy policy to understand how we collect, use, and protect your data.' },
        '/terms-of-service': { title: 'Terms of Service | MoneyCal.in', description: 'Read our terms of service for using MoneyCal.in financial tools and calculators.' },
        '/disclaimer': { title: 'Disclaimer | MoneyCal.in', description: 'Important disclaimer about the financial tools and information provided on MoneyCal.in.' },
        '/sitemap': { title: 'Sitemap | MoneyCal.in', description: 'Browse the complete sitemap of MoneyCal.in financial tools and resources.' },
        '/search': { title: 'Search | MoneyCal.in', description: 'Search across all calculators, tools, blog posts, and resources on MoneyCal.in.' },
        '/loan-tools': { title: 'Loan Tools & EMI Calculators | MoneyCal.in', description: 'Free loan comparison tools, EMI calculators, and prepayment planners for India.' },
        '/tax-tools': { title: 'Tax Calculators & Tools | MoneyCal.in', description: 'Free income tax calculators, GST tools, and tax planning resources for India.' },
        '/finance-tools': { title: 'Finance Tools & Calculators | MoneyCal.in', description: 'Free financial planning tools including SIP, mutual fund, and investment calculators.' },
        '/gold-tools': { title: 'Gold Price Tools & Calculators | MoneyCal.in', description: 'Free gold price calculators, purity checkers, and investment tools for India.' },
        '/gst-tools': { title: 'GST Calculators & Tools | MoneyCal.in', description: 'Free GST calculators, HSN code lookup, and GST compliance tools for India.' },
        '/excel-tools': { title: 'Excel Financial Templates | MoneyCal.in', description: 'Free downloadable Excel templates for financial planning, budgeting, and investment tracking.' },
        '/crypto': { title: 'Crypto Tools & Analysis | MoneyCal.in', description: 'Cryptocurrency tools, market analysis, and investment resources for Indian investors.' },
        '/government-schemes': { title: 'Government Schemes | MoneyCal.in', description: 'Complete guide to Indian government financial schemes including PPF, SSY, NPS, and more.' },
        '/category': { title: 'Calculator Categories | MoneyCal.in', description: 'Browse all categories of financial calculators available on MoneyCal.in.' },
        '/help-center': { title: 'Help Center | MoneyCal.in', description: 'Find answers to frequently asked questions about MoneyCal.in tools and services.' },
        '/editorial-policy': { title: 'Editorial Policy | MoneyCal.in', description: 'Our editorial guidelines and standards for financial content and tools.' },
        '/cookie-policy': { title: 'Cookie Policy | MoneyCal.in', description: 'Understand how MoneyCal.in uses cookies to improve your browsing experience.' },
    };
    Object.assign(seoMap, staticPages);

    // Load generated FAQs
    const generatedFaqsPath = path.join(PUBLIC_DIR, 'generated-faqs.json');
    if (fs.existsSync(generatedFaqsPath)) {
        console.log('  🧩 Injecting generated FAQs...');
        const generatedFaqs = JSON.parse(fs.readFileSync(generatedFaqsPath, 'utf-8'));
        for (const [urlPath, faqs] of Object.entries(generatedFaqs)) {
            if (seoMap[urlPath]) {
                if (!seoMap[urlPath].faqs) seoMap[urlPath].faqs = [];
                // Only add if not already present
                if (seoMap[urlPath].faqs.length === 0) {
                    seoMap[urlPath].faqs = faqs;
                }
            }
        }
    }

    // --- Phase 2: Hindi SEO Infrastructure ---
    const hindiEntries = {};
    let hindiTranslations = {};
    const hindiTransPath = path.join(SRC_DIR, 'data/hindiTranslations.json');
    if (fs.existsSync(hindiTransPath)) {
        hindiTranslations = JSON.parse(fs.readFileSync(hindiTransPath, 'utf-8'));
    }

    for (const [urlPath, seo] of Object.entries(seoMap)) {
        if (!urlPath.startsWith('/hi/') && !urlPath.includes('/api/')) {
            const slug = urlPath.split('/').pop();
            const translated = hindiTranslations[slug];
            const hiTitle = translated?.titleHindi ? `${translated.titleHindi} | MoneyCal` : (seo.title ? seo.title.replace('| MoneyCal', '| MoneyCal (Hindi)') : seo.title);
            const hiDesc = translated?.excerptHindi ? translated.excerptHindi : seo.description;

            hindiEntries[`/hi${urlPath === '/' ? '' : urlPath}`] = {
                ...seo,
                isHindi: true,
                title: hiTitle,
                description: hiDesc
            };
        }
    }
    Object.assign(seoMap, hindiEntries);

    return seoMap;
}

// ═══════════════════════════════════════════════════════════════════════
// 2. GENERATE STATIC HTML — Inject SEO tags into index.html copies
// ═══════════════════════════════════════════════════════════════════════

function generateStaticPages(seoMap) {
    const indexHtmlPath = path.join(DIST_DIR, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
        console.error('❌ dist/index.html not found! Run vite build first.');
        process.exit(1);
    }

    const template = fs.readFileSync(indexHtmlPath, 'utf-8');

    // Read all URLs from master list
    let urls = [];
    if (fs.existsSync(URLS_FILE)) {
        urls = fs.readFileSync(URLS_FILE, 'utf-8').split('\n').filter(Boolean);
    } else {
        console.warn('⚠️  all-urls-master.txt not found. Using SEO map keys only.');
        urls = Object.keys(seoMap).map(p => `${BASE_URL}${p}`);
    }

    console.log(`\n📋 Processing ${urls.length} URLs...`);

    let success = 0;
    let skipped = 0;

    urls.forEach((urlStr, index) => {
        if (index % 100 === 0) console.log(`    - Processing URL ${index}/${urls.length}...`);
        let pathname;
        try {
            const parsed = new URL(urlStr);
            pathname = parsed.pathname;
            // Force normalize: remove trailing slash except for homepage
            if (pathname !== '/' && pathname.endsWith('/')) {
                pathname = pathname.slice(0, -1);
            }
        } catch (err) {
            console.error(`  ❌ URL Parse Error: ${urlStr} - ${err.message}`);
            return;
        }

        // Skip the homepage (it already has the template)
        if (pathname === '/') {
            try {
                const homeHtml = injectSeoTags(template, '/', seoMap['/'] || {
                    title: 'MoneyCal.in - Free Financial Calculators for India',
                    description: "India's most comprehensive financial calculator platform."
                }, seoMap);
                fs.writeFileSync(indexHtmlPath, homeHtml);
                success++;
            } catch (err) {
                console.error(`  ❌ Homepage Inject Error: ${err.message}`);
            }
            return;
        }

        // [FIX] Skip /discover/ and /web-stories/ because they are fully generated by 
        // generate-discover-content.cjs and copied to dist/ by Vite. Overwriting them 
        // here would ruin their custom HTML layouts (ads, related articles, etc).
        if (pathname.startsWith('/discover/') || pathname.startsWith('/web-stories/')) {
            success++;
            return;
        }

        // Get SEO data for this path (from map or auto-generate from URL)
        const seo = seoMap[pathname] || generateSeoFromPath(pathname);

        try {
            // Inject SEO tags
            const html = injectSeoTags(template, pathname, seo, seoMap);

            // Save to dist/pathname/index.html
            let savePath = path.join(DIST_DIR, pathname);
            if (!savePath.endsWith('.html')) {
                savePath = path.join(savePath, 'index.html');
            }

            fs.mkdirSync(path.dirname(savePath), { recursive: true });
            fs.writeFileSync(savePath, html);
            success++;
        } catch (err) {
            console.error(`  ❌ Failed: ${pathname} - ${err.message}`);
            skipped++;
        }
    });

    return { success, skipped };
}

// ═══════════════════════════════════════════════════════════════════════
// 3. SEO TAG INJECTION — Replace <head> tags with page-specific ones
// ═══════════════════════════════════════════════════════════════════════

function generateHeaderHtml() {
    return `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white border-b border-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="/" class="flex items-center space-x-2 flex-shrink-0" aria-label="MoneyCal.in Home">
            <div class="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-indian-rupee"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MoneyCal.in</h1>
            </div>
          </a>
          <!-- SEO Hidden Links for bots -->
          <nav class="hidden xl:flex items-center space-x-4">
             <a href="/calculators">Calculators</a>
             <a href="/tools">Tools</a>
             <a href="/ipo">IPO</a>
             <a href="/gold-rate">Market Rates</a>
             <a href="/learn">Learn</a>
             <a href="/blog">Blog</a>
             <a href="/news">News</a>
             <a href="/government-schemes">Schemes</a>
          </nav>
        </div>
      </div>
    </header>
    `;
}

function generateFooterHtml() {
    const year = new Date().getFullYear();
    return `
    <footer class="bg-[#fafbfc] border-t border-gray-100 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div class="col-span-2 lg:col-span-2 pr-0 lg:pr-12">
            <a href="/" class="flex items-center space-x-3 mb-6">
              <div class="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-indian-rupee"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
              </div>
              <span class="text-2xl font-black tracking-tight text-gray-900">MoneyCal<span class="text-blue-600">.in</span></span>
            </a>
            <p class="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">India's premier financial portal. Empowering millions with accurate calculators, real-time market insights, and expert financial guidance.</p>
          </div>
          <div>
              <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Calculators</h4>
              <ul class="space-y-4">
                  <li><a href="/calculators/emi-calculator" class="text-[15px] text-gray-600">EMI Calculator</a></li>
                  <li><a href="/calculators/sip-calculator" class="text-[15px] text-gray-600">SIP Calculator</a></li>
                  <li><a href="/calculators/income-tax-calculator" class="text-[15px] text-gray-600">Income Tax Calculator</a></li>
                  <li><a href="/calculators/mutual-fund-returns-calculator" class="text-[15px] text-gray-600">Mutual Fund Calculator</a></li>
                  <li><a href="/calculators/ppf-calculator" class="text-[15px] text-gray-600">PPF Calculator</a></li>
                  <li><a href="/calculators" class="text-[15px] text-gray-600">All Calculators</a></li>
              </ul>
          </div>
          <div>
              <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Tools</h4>
              <ul class="space-y-4">
                  <li><a href="/finance-tools" class="text-[15px] text-gray-600">Finance Tools</a></li>
                  <li><a href="/tax-tools" class="text-[15px] text-gray-600">Tax Tools</a></li>
                  <li><a href="/gst-tools" class="text-[15px] text-gray-600">GST Tools</a></li>
                  <li><a href="/excel-tools" class="text-[15px] text-gray-600">Excel Tools</a></li>
                  <li><a href="/tools" class="text-[15px] text-gray-600">All Tools</a></li>
              </ul>
          </div>
          <div>
              <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Resources</h4>
              <ul class="space-y-4">
                  <li><a href="/learn" class="text-[15px] text-gray-600">Learn</a></li>
                  <li><a href="/blog" class="text-[15px] text-gray-600">Blog</a></li>
                  <li><a href="/news" class="text-[15px] text-gray-600">News</a></li>
                  <li><a href="/government-schemes" class="text-[15px] text-gray-600">Government Schemes</a></li>
                  <li><a href="/crypto" class="text-[15px] text-gray-600">Crypto</a></li>
              </ul>
          </div>
        </div>
        <div class="border-t border-gray-100 pt-12 mb-12">
          <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Company & Legal</h4>
          <div class="flex flex-wrap gap-x-8 gap-y-4">
             <a href="/about-us" class="text-sm text-gray-500">About Us</a>
             <a href="/contact-us" class="text-sm text-gray-500">Contact Us</a>
             <a href="/privacy-policy" class="text-sm text-gray-500">Privacy Policy</a>
             <a href="/terms-and-conditions" class="text-sm text-gray-500">Terms & Conditions</a>
             <a href="/disclaimer" class="text-sm text-gray-500">Disclaimer</a>
             <a href="/sitemap" class="text-sm text-gray-500">Sitemap</a>
          </div>
        </div>
        <div class="border-t border-gray-100 pt-8 mt-12">
            <div class="text-sm text-gray-500 font-medium">© ${year} MoneyCal.in Financial Services Pvt Ltd.</div>
        </div>
      </div>
    </footer>
    `;
}

function getRelatedLinks(pathname, seoMap, count = 4) {
    const current = seoMap[pathname] || {};
    const section = current.section;
    if (!section) return [];

    return Object.entries(seoMap)
        .filter(([path, data]) => {
            return data.section === section && path !== pathname && !path.includes('/category/');
        })
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, count)
        .map(([path, data]) => ({
            path,
            title: data.title.split('|')[0].trim()
        }));
}

function injectSeoTags(template, pathname, seo, seoMap) {
    // Ensure pathname is normalized for the canonical URL
    let normalizedPath = pathname;
    if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1);
    }
    // NEW SEO ENFORCEMENT LOGIC Auto-corrects missing keywords and short descriptions
    const keywordPath = normalizedPath === '/' ? 'home' : normalizedPath.split('/').pop().replace(/-/g, ' ');
    let baseTitle = seo.title || `MoneyCal.in | ${humanize(normalizedPath)}`;
    let baseDesc = seo.description || `Free online ${humanize(normalizedPath)} tools and calculators for India.`;

    // 1. Enforce Title Keyword Relevance for Googlebot matching
    const isHinglish = keywordPath.includes('rupaye') || keywordPath.includes('kare') || keywordPath.includes('hindi') || keywordPath.includes('se') || keywordPath.includes('mein') || keywordPath.includes('liye');
    if (!isHinglish) {
        const kwWords = keywordPath.split(' ').filter(w => w.length > 3 && !['with', 'that', 'this', 'from', 'for', 'the', 'and', 'india', 'how', 'what', 'why', 'are', 'can', 'does', 'buy', 'sell', 'guide'].includes(w.toLowerCase()));
        const titleLower = baseTitle.toLowerCase();
        const missingKwWord = kwWords.find(w => {
            const stem = w.toLowerCase().endsWith('s') ? w.toLowerCase().slice(0, -1) : w.toLowerCase();
            return !titleLower.includes(stem);
        });
        if (missingKwWord && baseTitle.length < 125) {
            // Append missing keyword BEFORE the separator so cleanTitle catches it for H1 replacement
            const parts = baseTitle.split('|');
            parts[0] = `${parts[0].trim()} ${missingKwWord.charAt(0).toUpperCase() + missingKwWord.slice(1)} `;
            baseTitle = parts.join('|');
        }
    }

    // 2. Enforce Description Length (> 50)
    if (baseDesc.length < 50) {
        baseDesc = `${baseDesc} Learn all about ${keywordPath} and get the best financial insights in India on MoneyCal.`;
    }

    // 3. Truncate Long Titles & Descriptions safely
    if (baseTitle.length > 130) baseTitle = baseTitle.substring(0, 127) + '...';
    if (baseDesc.length > 165) baseDesc = baseDesc.substring(0, 162) + '...';

    const cleanTitle = baseTitle.split('|')[0].trim();
    const canonicalUrl = `${BASE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
    const title = baseTitle;
    const description = baseDesc;

    let html = template;

    // 0. CLEANUP: Strip matching SEO tags already in the template to avoid duplicates
    html = html.replace(/<title>[^<]*<\/title>/i, '');
    html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/is, '');
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/is, '');
    html = html.replace(/<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*\/?>/gis, '');
    html = html.replace(/<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*\/?>/gis, '');

    // 3. Generate JSON-LD (Search Engine Schema)
    const jsonLd = generateJsonLd(normalizedPath, seo, canonicalUrl);
    // Escape < to prevent XSS and premature </script> closing which causes "Unexpected token '<'"
    const safeJsonLd = JSON.stringify(jsonLd, null, 2).replace(/</g, '\\u003c');
    const jsonLdScript = `\n    <script type="application/ld+json">\n    ${safeJsonLd}\n    </script>`;

    // 1. RE-INJECT: Put them back at the top of <head>
    const headStart = html.indexOf('<head>') + 6;
    // Determine OG Type and Article Meta
    const isArticle = pathname.includes('/blog/') || pathname.includes('/news/') || pathname.includes('/crypto/') || pathname.includes('/astro-finance/') || pathname.includes('/gk/') || pathname.includes('/msme-subsidies/') || pathname.includes('/land-records/') || pathname.includes('/scholarships/') || pathname.includes('/youth-banking/') || pathname.includes('/taxation-2026/') || pathname.includes('/scam-diagnostics/') || pathname.includes('/trading-terminals/') || pathname.includes('/macro-trends/') || pathname.includes('/insurance-niche/');
    const ogType = isArticle ? 'article' : 'website';
    
    let articleMeta = '';
    if (isArticle) {
        // Fallback dates if none provided
        const pubDate = seo.date || new Date().toISOString();
        const modDate = new Date().toISOString(); // Force freshness rotation on every build
        articleMeta = `
    <meta property="article:published_time" content="${pubDate}" />
    <meta property="article:modified_time" content="${modDate}" />`;
    }

    // Generate Hreflang Tags
    const isHindi = normalizedPath.startsWith('/hi');
    const enUrl = isHindi ? `${BASE_URL}${normalizedPath.replace('/hi', '') || '/'}` : canonicalUrl;
    const hiUrl = isHindi ? canonicalUrl : `${BASE_URL}/hi${normalizedPath === '/' ? '' : normalizedPath}`;
    const hreflangTags = `
    <link rel="alternate" hreflang="en-IN" href="${enUrl}" />
    <link rel="alternate" hreflang="hi-IN" href="${hiUrl}" />
    <link rel="alternate" hreflang="x-default" href="${enUrl}" />`;

    const fullSeoBlock = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonicalUrl}" />${hreflangTags}
    <meta property="og:type" content="${ogType}" />${articleMeta}
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:site_name" content="MoneyCal.in" />
    <meta property="og:locale" content="${isHindi ? 'hi_IN' : 'en_IN'}" />
    <meta property="og:image" content="${BASE_URL}/android-chrome-512x512.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:site" content="@MoneyCalIN" />${jsonLdScript}`;

    html = html.slice(0, headStart) + fullSeoBlock + html.slice(headStart);

    // 2. [BEST SEO] Replace generic Hero text with page-specific content in the static shell
    if (pathname !== '/') {
        const labelText = pathname.includes('/blog/') ? 'Financial Blog' :
                          pathname.includes('/crypto/') ? 'Crypto News' :
                          pathname.includes('/astro-finance/') ? 'Astro Finance' :
                          pathname.includes('/gk/') ? 'General Knowledge' :
            pathname.includes('/news/') ? 'Financial News' :
                pathname.includes('/learn/') ? 'MoneyCal Academy' :
                    pathname.includes('/gk/') ? 'GK Quiz' : 'Finance Tool';

        const pluralLabel = labelText.endsWith('s') || labelText.endsWith('s ') ? labelText : `${labelText}s`;

        // Update Label
        html = html.replace('Trusted Finance Tools', escapeHtml(labelText));

        // Update H1 specifically inside the main section to avoid matching head tags
        const h1Regex = /(<main[\s\S]*?<h1[^>]*>)([\s\S]*?)(<\/h1>)/i;
        html = html.replace(h1Regex, (match, op, content, cl) => {
            const spanRegex = /(<span[^>]*>).*?(<\/span>)/i;
            return `${op}${escapeHtml(cleanTitle)}<br/>${content.match(spanRegex) ? content.match(spanRegex)[0].replace(/>.*?<\/span>/, '>— Free Tool</span>') : '— Free Tool'}${cl}`;
        });

        // Update P description in the LCP shell (specifically inside main)
        const pRegex = /(<main[\s\S]*?<p[^>]*>)(\s*200\+ free tools\. Built for India\. Privacy-first\.\s*)(<\/p>)/i;
        html = html.replace(pRegex, `$1${escapeHtml(description)}$3`);

        // [SPIDER-WEB] Inject "Recommended Resources" section into <body> SPECIFICALLY
        const related = getRelatedLinks(normalizedPath, seoMap);
        if (related.length > 0) {
            const linksHtml = related.map(link =>
                `<li><a href="${link.path}" style="color:#2563eb;text-decoration:none;font-weight:600;display:block;padding:0.25rem 0">${escapeHtml(link.title)}</a></li>`
            ).join('');

            const relatedSection = `
        <section style="margin-top:2rem;padding:1.25rem;background:#ffffff;border:1px solid #f3f4f6;box-shadow:0 1px 3px rgba(0,0,0,0.05);border-radius:0.75rem;text-align:left">
          <p style="font-size:0.75rem;font-weight:700;color:#4b5563;margin:0 0 0.75rem 0;text-transform:uppercase;letter-spacing:0.1em">Recommended ${escapeHtml(pluralLabel)}</p>
          <ul style="list-style:none;padding:0;margin:0">
              ${linksHtml}
          </ul>
        </section>`;

            // Find the location of the description WE JUST REPLACED in the body
            const bodyMarker = `<p style="margin:0.75rem auto 0;max-width:28rem;font-size:1rem;color:#6b7280">\n            ${escapeHtml(description)}`;

            if (html.includes(bodyMarker)) {
                html = html.replace(bodyMarker, bodyMarker + relatedSection);
            } else {
                const mainMatch = html.match(/<main[^>]*>/i);
                if (mainMatch) {
                    const bodyStart = html.indexOf(mainMatch[0]);
                    const descIndex = html.indexOf(escapeHtml(description), bodyStart);
                    if (descIndex !== -1) {
                        const insertPos = html.indexOf('</p>', descIndex) + 4;
                        html = html.slice(0, insertPos) + relatedSection + html.slice(insertPos);
                    }
                }
            }
        }

        // 7. [HIGH CTR] Inject FAQ section into <body>
        if (seo.faqs && seo.faqs.length > 0) {
            const faqsHtml = seo.faqs.map(f => `
        <div style="margin-bottom:1.5rem">
          <p style="font-weight:700;color:#111827;margin:0 0 0.5rem 0">Q: ${escapeHtml(f.question)}</p>
          <p style="color:#4b5563;margin:0">${escapeHtml(f.answer)}</p>
        </div>`).join('');

            const faqSection = `
      <section style="margin-top:3rem;padding:2rem;background:#ffffff;border:1px solid #f3f4f6;box-shadow:0 1px 3px rgba(0,0,0,0.05);border-radius:1rem;text-align:left">
        <h2 style="font-size:1.25rem;font-weight:800;color:#111827;margin:0 0 1.5rem 0">Frequently Asked Questions</h2>
        ${faqsHtml}
      </section>`;

            // Append to the end of the last section in main
            if (html.includes('</section>')) {
                html = html.replace(/<\/section>(?!.*<\/section>)/, `</section>${faqSection}`);
            } else {
                html = html.replace('</main>', `${faqSection}</main>`);
            }
        }
    }

    // 8. Inject Header, Body, and Footer into #root
    const botHeader = generateHeaderHtml();
    const botFooter = generateFooterHtml();
    const bodyContent = generateBodyContent(pathname, seo, seoMap);

    const rootStartMarker = /<div id="root"[^>]*>/i;
    const rootStartMatch = html.match(rootStartMarker);
    const bodyEndIndex = html.toLowerCase().lastIndexOf('</body>');

    // Find the last </div> before </body>
    const lastDivIndex = html.toLowerCase().lastIndexOf('</div>', bodyEndIndex);

    if (rootStartMatch && lastDivIndex !== -1) {
        const rootStartIndex = html.indexOf(rootStartMatch[0]);
        const contentStartIndex = rootStartIndex + rootStartMatch[0].length;

        const beforeRoot = html.substring(0, contentStartIndex);
        const afterRoot = html.substring(lastDivIndex);
        const originalShell = html.substring(contentStartIndex, lastDivIndex);

        // [CRITICAL SEO FIX] Remove <noscript> so Googlebot gives full weight to the content.
        // Google devalues content inside <noscript>. 
        // We use a regular div. React's createRoot will safely wipe this out upon hydration.
        // [PURE STATIC HTML] Remove React Hydration for content pages to maximize AdSense performance
        const isContentPath = pathname.includes('/blog/') || pathname.includes('/news/') || pathname.includes('/government-schemes/') || pathname.includes('/ipo/') || pathname.includes('/discover/') || pathname.includes('/crypto/') || pathname.includes('/gk/') || pathname.includes('/astro-finance/') || pathname.includes('/msme-subsidies/') || pathname.includes('/land-records/') || pathname.includes('/scholarships/') || pathname.includes('/youth-banking/') || pathname.includes('/taxation-2026/') || pathname.includes('/scam-diagnostics/') || pathname.includes('/trading-terminals/') || pathname.includes('/macro-trends/') || pathname.includes('/insurance-niche/');
        
        let finalContent = '';
        
        // If it's a content path and we have SEO body, we will strip React below.
        // Therefore, we MUST hide the original shell (skeleton) so Googlebot sees the real content in the first viewport.
        if (isContentPath && seo.body) {
            // Add display:none to original shell so it doesn't push down the SEO content
            finalContent = `\n    <div style="display:none;">\n${originalShell.trim()}\n</div>\n`;
            finalContent += `    <div id="seo-prerender-content" class="seo-static-prerender">\n      ${botHeader}\n      ${bodyContent}\n      ${botFooter}\n    </div>\n`;
        } else if (bodyContent) {
            // Keep original shell visible for SPA loading, hide SEO content (Googlebot still reads it from DOM)
            finalContent = `\n    ${originalShell.trim()}\n`;
            finalContent += `    <div id="seo-prerender-content" class="seo-static-prerender" style="display:none;">\n      ${botHeader}\n      ${bodyContent}\n      ${botFooter}\n    </div>\n`;
        } else {
            // Fallback for non-content pages (e.g. calculators)
            finalContent = `\n    ${originalShell.trim()}\n`;
        }
        
        let finalHtml = beforeRoot + finalContent + afterRoot;
        // ONLY strip React if we have a real data-driven seo.body. Hardcoded React components (like ChhathPuja.tsx) MUST hydrate!
        if (isContentPath && seo.body) {
            finalHtml = finalHtml.replace(/<script type="module"[^>]*src="\/assets\/index-[^>]*><\/script>/gi, '');
            finalHtml = finalHtml.replace(/<script type="module"[^>]*src="\/src\/main\.tsx"[^>]*><\/script>/gi, '');
            // Also remove any link rel="modulepreload" to prevent useless fetching
            finalHtml = finalHtml.replace(/<link rel="modulepreload"[^>]*>/gi, '');
        }

        return finalHtml;
    }

    return html;
}

function generateJsonLd(pathname, seo, canonicalUrl) {
    const title = seo.title ? seo.title.split('|')[0].trim() : humanize(pathname);
    const description = seo.description || `Online tools and info for ${title}.`;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD for dateModified

    // 1. BreadcrumbList (Essential for all pages)
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://moneycal.in"
            }
        ]
    };

    let cumulative = '';
    segments.forEach((seg, index) => {
        cumulative += `/${seg}`;
        breadcrumbs.itemListElement.push({
            "@type": "ListItem",
            "position": index + 2,
            "name": humanize(seg),
            "item": `https://moneycal.in${cumulative}`
        });
    });

    // 2. Specific Schema Based on URL Pattern
    let mainEntity = null;

    if (pathname.includes('/calculators/') || pathname.includes('/tools/')) {
        mainEntity = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
            "publisher": { "@type": "Organization", "name": "MoneyCal.in" },
            "dateModified": today
        };
    } else if (pathname.includes('/blog/') || pathname.includes('/government-schemes/') || pathname.includes('/discover/') || pathname.includes('/crypto/') || pathname.includes('/astro-finance/') || pathname.includes('/gk/') || pathname.includes('/msme-subsidies/') || pathname.includes('/land-records/') || pathname.includes('/scholarships/') || pathname.includes('/youth-banking/') || pathname.includes('/taxation-2026/') || pathname.includes('/scam-diagnostics/') || pathname.includes('/trading-terminals/') || pathname.includes('/macro-trends/') || pathname.includes('/insurance-niche/')) {
        mainEntity = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "image": {
                "@type": "ImageObject",
                "url": seo.coverImage || "https://moneycal.in/default-blog-hero.jpg"
            },
            "publisher": {
                "@type": "Organization",
                "name": "MoneyCal India",
                "logo": { "@type": "ImageObject", "url": "https://moneycal.in/android-chrome-512x512.jpg" }
            },
            "author": { "@type": "Person", "name": "MoneyCal Editorial Team" },
            "datePublished": seo.date || "2025-01-15",
            "dateModified": today
        };
    } else if (pathname.includes('/news/') || pathname.includes('/crypto/') || pathname.includes('/ipo/')) {
        mainEntity = {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "image": {
                "@type": "ImageObject",
                "url": seo.coverImage || "https://moneycal.in/default-news-hero.jpg"
            },
            "publisher": {
                "@type": "Organization",
                "name": "MoneyCal India",
                "logo": { "@type": "ImageObject", "url": "https://moneycal.in/android-chrome-512x512.jpg" }
            },
            "author": { "@type": "Person", "name": "MoneyCal Editorial Team" },
            "datePublished": seo.date || "2025-01-20",
            "dateModified": today
        };
    }

    // 3. FAQPage Schema
    let faqPage = null;
    if (seo.faqs && seo.faqs.length > 0) {
        faqPage = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": seo.faqs.map(f => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.answer
                }
            }))
        };
    }

    // 4. HowTo Schema
    let howToPage = null;
    if (seo.howToSteps && seo.howToSteps.length > 0) {
        howToPage = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to use the ${title}`,
            "step": seo.howToSteps.map((step, index) => ({
                "@type": "HowToStep",
                "url": `${canonicalUrl}#step${index + 1}`,
                "name": step.step,
                "itemListElement": [{
                    "@type": "HowToDirection",
                    "text": step.details
                }]
            }))
        };
    }

    const schemas = [breadcrumbs];
    if (mainEntity) schemas.push(mainEntity);
    if (faqPage) schemas.push(faqPage);
    if (howToPage) schemas.push(howToPage);

    return schemas.length === 1 ? schemas[0] : schemas;
}

/**
 * Converts structured NewsGuideSection to HTML for SEO
 */
function convertNewsGuideToHtml(article) {
    if (!article) return '';
    let html = '';
    const adHtml = `\n<div class="ad-unit in-article-ad my-8 text-center" style="margin:2rem 0;text-align:center;"><span class="text-[10px] text-gray-400 block mb-1" style="font-size:10px;color:#9ca3af;margin-bottom:4px;display:block;">Advertisement</span><ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-6815277662449747"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>\n`;

    // Summary / Whats New
    if (article.whatsNew) {
        html += `<section style="margin-bottom:2.5rem">
            <h2 style="font-size:1.8rem;font-weight:800;margin-bottom:1.25rem;color:#111827">What's New</h2>
            <p style="margin-bottom:1rem">${simpleMarkdownToHtml(article.whatsNew.summary)}</p>
        </section>`;
    }

    // Why It Matters
    if (article.whyItMatters) {
        html += `<section style="margin-bottom:2.5rem">
            <h2 style="font-size:1.8rem;font-weight:800;margin-bottom:1.25rem;color:#111827">Why It Matters</h2>
            <p style="margin-bottom:1.25rem">${simpleMarkdownToHtml(article.whyItMatters.significance)}</p>
            ${article.whyItMatters.impact ? `<ul style="margin-bottom:1.5rem;padding-left:1.5rem">
                ${article.whyItMatters.impact.map(i => `<li style="margin-bottom:0.75rem">${escapeHtml(i)}</li>`).join('')}
            </ul>` : ''}
        </section>`;
        html += adHtml;
    }

    // Main Topics / Coverage
    if (article.coverage && article.coverage.mainTopics) {
        article.coverage.mainTopics.forEach((topic, index) => {
            html += `<section style="margin-bottom:2.5rem">
                <h3 style="font-size:1.5rem;font-weight:800;margin-bottom:1rem;color:#111827">${escapeHtml(topic.title)}</h3>
                <p style="margin-bottom:1rem">${escapeHtml(topic.description)}</p>
                ${topic.subtopics ? `<ul style="margin-bottom:1.5rem;padding-left:1.5rem">
                    ${topic.subtopics.map(s => `<li style="margin-bottom:0.5rem">${escapeHtml(s)}</li>`).join('')}
                </ul>` : ''}
            </section>`;
            if (index % 2 === 0) {
                html += adHtml;
            }
        });
    }

    // Key Data
    if (article.keyData && article.keyData.facts) {
        html += `<section style="margin-bottom:2.5rem;padding:1.5rem;background:#f9fafb;border:1px solid #f3f4f6;border-radius:0.75rem">
            <h2 style="font-size:1.8rem;font-weight:800;margin-bottom:1.25rem;color:#111827">Key Facts & Data</h2>
            <table style="width:100%;border-collapse:collapse">
                ${article.keyData.facts.map(f => `
                    <tr style="border-bottom:1px solid #f3f4f6">
                        <td style="padding:0.75rem 0;font-weight:700;color:#4b5563">${escapeHtml(f.label)}</td>
                        <td style="padding:0.75rem 0;text-align:right">${escapeHtml(f.value)}</td>
                    </tr>
                `).join('')}
            </table>
        </section>`;
        html += adHtml;
    }

    // Takeaway
    if (article.takeaway) {
        html += `<section style="margin-bottom:2.5rem;padding:2rem;background:#f0fdf4;border-left:4px solid #16a34a;border-radius:0.5rem">
            <h2 style="font-size:1.8rem;font-weight:800;margin-bottom:1.25rem;color:#16a34a">Key Takeaways</h2>
            ${article.takeaway.forReaders ? `<ul style="margin-bottom:1.5rem;padding-left:1.5rem">
                ${article.takeaway.forReaders.map(t => `<li style="margin-bottom:0.75rem">${escapeHtml(t)}</li>`).join('')}
            </ul>` : ''}
        </section>`;
    }

    return html;
}

function generateBodyContent(pathname, seo, seoMap) {
    let html = '';
    const cleanTitle = seo.title ? seo.title.split('|')[0].trim() : humanize(pathname);

    // FAQ Section for bots
    let faqSection = '';
    if (seo.faqs && seo.faqs.length > 0) {
        const faqsHtml = seo.faqs.map(f => `
        <div style="margin-bottom:1.5rem">
          <p style="font-weight:700;color:#111827;margin:0 0 0.5rem 0">Q: ${escapeHtml(f.question)}</p>
          <p style="color:#4b5563;margin:0">${escapeHtml(f.answer)}</p>
        </div>`).join('');

        faqSection = `
      <section style="margin-top:3rem;padding:2rem;background:#ffffff;border:1px solid #f3f4f6;box-shadow:0 1px 3px rgba(0,0,0,0.05);border-radius:1rem;text-align:left">
        <h2 style="font-size:1.25rem;font-weight:800;color:#111827;margin:0 0 1.5rem 0">Frequently Asked Questions</h2>
        ${faqsHtml}
      </section>`;
    }

    // Generate Table of Contents and Internal Links
    let tocHtml = '';
    let processedBody = seo.body;
    if (seo.body) {
        const tocResult = injectTableOfContents(seo.body);
        processedBody = tocResult.html;
        tocHtml = tocResult.tocHtml;
        
        // Inject internal links if seoMap is available
        if (seoMap) {
            processedBody = injectInternalLinks(processedBody, pathname, seoMap);
        }
    }

    // Header section for the article
    html += `
    <article style="max-width:800px;margin:0 auto;padding:3rem 1rem;color:#4b5563;font-family:ui-sans-serif, system-ui, -apple-system, sans-serif;line-height:1.7;text-align:left">
      <header style="margin-bottom:2rem;border-bottom:1px solid #f3f4f6;padding-bottom:1.5rem">
        <h1 style="font-size:2.5rem;font-weight:900;margin-bottom:1rem;line-height:1.2;color:#111827">${escapeHtml(cleanTitle)}</h1>
        <div style="font-size:0.9rem;color:#6b7280;font-weight:600">
          <span>By MoneyCal Editorial Team</span> • <span>Published ${seo.date ? new Date(seo.date).getFullYear() : new Date().getFullYear()}</span>
        </div>
      </header>
      ${tocHtml}
      <div class="content" style="font-size:1.15rem;line-height:1.8">
        ${processedBody || `<p style="margin-bottom:1.5rem">${escapeHtml(seo.description || `Online tools and information for ${cleanTitle}.`)}</p>`}
      </div>
      ${faqSection}
    </article>
    `;
    return html;
}

function injectTableOfContents(html) {
    if (!html) return { html: '', tocHtml: '' };

    const toc = [];
    const headingRegex = /<(h[23])[^>]*>(.*?)<\/\1>/gi;
    
    // Add IDs to headings
    const newHtml = html.replace(headingRegex, (match, tag, content) => {
        // Strip nested HTML from content to get clean text for ID
        const textContent = content.replace(/<[^>]+>/g, '').trim();
        if (!textContent) return match;
        
        let id = textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        // Ensure ID uniqueness could be added here, but simple is fine for now
        
        toc.push({ tag: tag.toLowerCase(), text: textContent, id });
        
        // Return original tag with ID added
        return `<${tag} id="${id}" style="${tag === 'h2' ? 'font-size:1.8rem;font-weight:800;margin:2.5rem 0 1.25rem;color:#111827' : 'font-size:1.5rem;font-weight:800;margin:2rem 0 1rem;color:#111827'}">${content}</${tag}>`;
    });

    if (toc.length < 2) return { html: newHtml, tocHtml: '' };

    let tocHtml = `
    <div style="background:#ffffff;border:1px solid rgba(255,255,255,0.1);border-radius:0.75rem;padding:1.5rem;margin-bottom:2.5rem">
        <h3 style="font-size:1.25rem;font-weight:800;margin-bottom:1rem;color:#111827">Table of Contents</h3>
        <ul style="list-style:none;padding:0;margin:0">
    `;

    toc.forEach(item => {
        const padding = item.tag === 'h3' ? 'padding-left:1.5rem' : '';
        tocHtml += `<li style="margin-bottom:0.75rem;${padding}"><a href="#${item.id}" style="color:#2563eb;text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='#93c5fd'" onmouseout="this.style.color='#60a5fa'">${escapeHtml(item.text)}</a></li>`;
    });

    tocHtml += `</ul></div>`;

    return { html: newHtml, tocHtml };
}

function injectInternalLinks(html, currentPath, seoMap) {
    if (!html || !seoMap) return html;
    
    // Determine the section of the current path (e.g. '/blog/', '/news/')
    const pathSectionMatch = currentPath.match(/^\/([^/]+)\//);
    const currentSection = pathSectionMatch ? `/${pathSectionMatch[1]}/` : null;

    // Find candidate links from seoMap
    const allPaths = Object.keys(seoMap).filter(p => 
        p !== currentPath && 
        (!currentSection || p.startsWith(currentSection)) &&
        (p.includes('/blog/') || p.includes('/news/') || p.includes('/discover/') || p.includes('/ipo/') || p.includes('/government-schemes/') || p.includes('/calculators/') || p.includes('/crypto/') || p.includes('/gk/') || p.includes('/astro-finance/') || p.includes('/msme-subsidies/') || p.includes('/land-records/') || p.includes('/scholarships/') || p.includes('/youth-banking/') || p.includes('/taxation-2026/') || p.includes('/scam-diagnostics/') || p.includes('/trading-terminals/') || p.includes('/macro-trends/') || p.includes('/insurance-niche/'))
    );
    
    if (allPaths.length === 0) return html;
    
    // Sort based on simple char codes to have pseudo-stable random links per page
    const seed = currentPath.length;
    const candidates = [...allPaths].sort((a, b) => {
        let valA = a.length + (a.charCodeAt(0) * seed);
        let valB = b.length + (b.charCodeAt(0) * seed);
        return valB - valA; // Pseudo-random stable sort
    });
    
    // Pick 3 related links
    const selected = candidates.slice(0, 3);
    if (selected.length === 0) return html;

    const linksHtml = `
    <div style="margin:2.5rem 0;padding:1.5rem;background:rgba(96,165,250,0.05);border-left:4px solid #60a5fa;border-radius:0.5rem">
        <h4 style="font-size:1rem;font-weight:800;margin-bottom:1rem;color:#2563eb;text-transform:uppercase;letter-spacing:0.05em">Also Read</h4>
        <ul style="list-style:disc;padding-left:1.5rem;margin:0">
            ${selected.map(p => {
                const title = seoMap[p].title ? seoMap[p].title.split('|')[0].trim() : humanize(p);
                return `<li style="margin-bottom:0.75rem;color:#2563eb"><a href="${p}" style="color:#2563eb;text-decoration:none;font-weight:600;font-size:1.1rem;transition:text-decoration 0.2s" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${escapeHtml(title)}</a></li>`;
            }).join('')}
        </ul>
    </div>`;

    let pCount = 0;
    let injected = false;
    
    const newHtml = html.replace(/<p[^>]*>[\s\S]*?<\/p>/gi, (match) => {
        pCount++;
        // Inject after the 2nd valid paragraph
        if (pCount === 3 && !injected && match.length > 50) {
            injected = true;
            return match + linksHtml;
        }
        return match;
    });

    return injected ? newHtml : html + linksHtml;
}

/**
 * Super simple Markdown to HTML converter for prerendering
 */
function simpleMarkdownToHtml(md) {
    if (!md) return '';
    let pCount = 0;
    const adHtml = `\n<div class="ad-unit in-article-ad my-8 text-center" style="margin:2rem 0;text-align:center;"><span class="text-[10px] text-gray-400 block mb-1" style="font-size:10px;color:#9ca3af;margin-bottom:4px;display:block;">Advertisement</span><ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-6815277662449747"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>\n`;

    let html = md
        // Headings
        .replace(/^### (.*$)/gim, '<h3 style="font-size:1.5rem;font-weight:800;margin:2rem 0 1rem;color:#111827">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 style="font-size:1.8rem;font-weight:800;margin:2.5rem 0 1.25rem;color:#111827">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 style="font-size:2.2rem;font-weight:900;margin:3rem 0 1.5rem;color:#111827">$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Lists
        .replace(/^\s*-\s+(.*)$/gim, '<li style="margin-bottom:0.5rem">$1</li>')
        // Paragraphs (wrap lines that don't start with tags)
        .split('\n').map(line => {
            line = line.trim();
            if (!line) return '';
            if (line.startsWith('<')) return line;
            
            pCount++;
            let res = `<p style="margin-bottom:1.5rem">${line}</p>`;
            if (pCount > 0 && pCount % 3 === 0 && pCount <= 15) {
                res += adHtml;
            }
            return res;
        }).join('\n');

    // Wrap lists
    html = html.replace(/(<li.*?>[\s\S]*?<\/li>)/g, '<ul style="margin-bottom:1.5rem;padding-left:1.5rem">$1</ul>');
    html = html.replace(/<\/ul>\n?<ul.*?>/g, ''); // Join consecutive lists

    return html;
}

// ═══════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════

function humanize(slug) {
    return slug
        .replace(/^\/+/, '')
        .split(/[-_/]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .trim() || 'MoneyCal';
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function generateSeoFromPath(pathname) {
    // Auto-generate reasonable SEO from URL path
    const segments = pathname.replace(/^\/+/, '').split('/');
    const section = segments[0] || '';
    const page = segments[segments.length - 1] || section;

    const sectionLabels = {
        'calculators': 'Calculator',
        'tools': 'Tool',
        'loan-tools': 'Loan Tool',
        'tax-tools': 'Tax Tool',
        'gold-tools': 'Gold Tool',
        'gst-tools': 'GST Tool',
        'excel-tools': 'Excel Tool',
        'finance-tools': 'Finance Tool',
        'festival-tools': 'Festival Tool',
        'blog': 'Blog',
        'learn': 'Learn',
        'news': 'News',
        'crypto': 'Crypto',
        'government-schemes': 'Government Scheme',
        'category': 'Category',
        'gk': 'GK Quiz',
        'design-tools': 'Design Tool',
        'insurance-tools': 'Insurance Tool',
        'invoicing-tools': 'Invoicing Tool',
        'seo-tools': 'SEO Tool',
        'bank-tools': 'Bank Tool',
    };

    const label = sectionLabels[section] || 'Page';
    const name = humanize(page);

    return {
        title: `${name} - Free ${label} | MoneyCal.in`,
        description: `Free online ${name.toLowerCase()} ${label.toLowerCase()} for India.Calculate, plan, and manage your finances with MoneyCal.in.`
    };
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(entry => {
        const fullPath = path.join(dir, entry);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath, callback);
        } else if (entry.endsWith('.ts')) {
            callback(fullPath);
        }
    });
}

function generateGoogleNewsAndFeed(seoMap) {
    console.log('📰 Step 3: Generating Google News Sitemap and RSS Feed...');
    const newsPaths = Object.keys(seoMap).filter(p => p.includes('/news/') || p.includes('/discover/') || p.includes('/blog/') || p.includes('/ipo/') || p.includes('/government-schemes/') || p.includes('/crypto/') || p.includes('/gk/') || p.includes('/astro-finance/') || p.includes('/msme-subsidies/') || p.includes('/land-records/') || p.includes('/scholarships/') || p.includes('/youth-banking/') || p.includes('/taxation-2026/') || p.includes('/scam-diagnostics/') || p.includes('/trading-terminals/') || p.includes('/macro-trends/') || p.includes('/insurance-niche/'));
    
    // Sort by date descending
    const sortedNews = newsPaths.map(p => ({ path: p, data: seoMap[p] }))
        .sort((a, b) => {
            const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
            const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
            return dateB - dateA;
        });

    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const recentNews = sortedNews.filter(n => {
        if (!n.data.date) return false;
        const pubDate = new Date(n.data.date).getTime();
        return (now - pubDate) <= sevenDaysMs;
    });

    // Generate sitemap-news.xml
    let newsSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n<!-- Google News Sitemap -->\n`;
    recentNews.forEach(n => {
        newsSitemapXml += `  <url>
    <loc>https://moneycal.in${n.path}</loc>
    <news:news>
      <news:publication>
        <news:name>MoneyCal</news:name>
        <news:language>hi</news:language>
      </news:publication>
      <news:publication_date>${new Date(n.data.date).toISOString()}</news:publication_date>
      <news:title>${escapeHtml(n.data.title ? n.data.title.split('|')[0].trim() : humanize(n.path))}</news:title>
    </news:news>
  </url>\n`;
    });
    newsSitemapXml += `</urlset>`;
    
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-news.xml'), newsSitemapXml);
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap-news.xml'), newsSitemapXml);
    console.log(`   ✅ Generated sitemap-news.xml with ${recentNews.length} articles`);

    // Generate feed.xml (RSS 2.0)
    const top50 = sortedNews.slice(0, 50);
    let rssXml = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n  <title>MoneyCal News &amp; Updates</title>\n  <link>https://moneycal.in</link>\n  <description>Latest financial news, IPO updates, and market trends from MoneyCal.in</description>\n  <language>hi-IN</language>\n  <atom:link href="https://moneycal.in/feed.xml" rel="self" type="application/rss+xml" />\n`;

    top50.forEach(n => {
        const pubDate = n.data.date ? new Date(n.data.date).toUTCString() : new Date().toUTCString();
        rssXml += `  <item>
    <title>${escapeHtml(n.data.title ? n.data.title.split('|')[0].trim() : humanize(n.path))}</title>
    <link>https://moneycal.in${n.path}</link>
    <guid>https://moneycal.in${n.path}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escapeHtml(n.data.description || '')}</description>
  </item>\n`;
    });
    rssXml += `</channel>\n</rss>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), rssXml);
    fs.writeFileSync(path.join(DIST_DIR, 'feed.xml'), rssXml);
    console.log(`   ✅ Generated feed.xml with ${top50.length} articles\n`);
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════

function main() {
    console.log('═══════════════════════════════════════════════════════════════════════');
    console.log('🚀 STATIC SEO PRERENDERER (Zero-dependency, No Chrome needed)');
    console.log('═══════════════════════════════════════════════════════════════════════\n');

    const startTime = Date.now();

    // Step 1: Build SEO map from data files
    console.log('📖 Step 1: Building SEO metadata map from source data...');
    const seoMap = buildSeoMap();
    console.log(`   ✅ Built SEO map with ${Object.keys(seoMap).length} entries\n`);

    // Step 2: Generate static HTML for all URLs
    console.log('🔨 Step 2: Generating static HTML pages...');
    const { success, skipped } = generateStaticPages(seoMap);

    // Step 3: Generate News Sitemaps and RSS Feeds
    generateGoogleNewsAndFeed(seoMap);

    // Step 4: Generate 404.html for Cloudflare Pages/Netlify soft 404 fix
    const indexHtmlPath = path.join(DIST_DIR, 'index.html');
    const notFoundHtmlPath = path.join(DIST_DIR, '404.html');
    if (fs.existsSync(indexHtmlPath)) {
        fs.copyFileSync(indexHtmlPath, notFoundHtmlPath);
        console.log(`   ✅ Generated 404.html for Soft 404 resolution\n`);
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('\n═══════════════════════════════════════════════════════════════════════');
    console.log('🎉 STATIC SEO PRERENDERING COMPLETE!');
    console.log('═══════════════════════════════════════════════════════════════════════');
    console.log(`   ✅ Pages generated: ${success} `);
    console.log(`   ⏭️  Skipped / Failed: ${skipped} `);
    console.log(`   ⏱️  Total time: ${elapsed} s`);
    console.log(`   🤖 Googlebot will now see unique title, description, `);
    console.log(`      canonical, and OG tags on EVERY page.`);
    console.log('═══════════════════════════════════════════════════════════════════════\n');
}

main();
