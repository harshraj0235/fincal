/**
 * ═══════════════════════════════════════════════════════════════════════
 * HINDI TRANSLATION BATCH SCRIPT
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Extracts titles and excerpts from blogData files and uses Google Translate API
 * to generate Hindi translations, saving them to src/data/hindiTranslations.json.
 */

const fs = require('fs');
const path = require('path');
const { translate } = require('@vitalets/google-translate-api');

const SRC_DIR = path.resolve(__dirname, '../src');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/hindiTranslations.json');

// Helper to extract data using regex without evaluating TS
function extractPosts(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const posts = [];
    
    const blocks = content.split(/\{\s*\n?\s*id:\s*/).slice(1);
    
    for (const block of blocks) {
        const slugMatch = block.match(/slug:\s*["']([^"']+)["']/);
        const titleMatch = block.match(/title:\s*["']([^"']+)["']/);
        const excerptMatch = block.match(/excerpt:\s*["']([^"']{10,}?)["']/);
        
        if (slugMatch && titleMatch) {
            posts.push({
                slug: slugMatch[1],
                title: titleMatch[1],
                excerpt: excerptMatch ? excerptMatch[1] : ''
            });
        }
    }
    
    return posts;
}

// Pause function to avoid rate limits
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🌐 BATCH HINDI TRANSLATOR (Using @vitalets/google-translate-api)');
    console.log('═══════════════════════════════════════════════════════════════\n');

    const filesToScan = ['blogData.ts', 'blogData1.ts', 'seo-blog-posts.ts', 'optimizedBlogPosts.ts'];
    let allPosts = [];

    for (const file of filesToScan) {
        const filePath = path.join(SRC_DIR, 'data', file);
        const posts = extractPosts(filePath);
        allPosts = allPosts.concat(posts);
    }

    console.log(`📊 Found ${allPosts.length} total posts.`);

    // Load existing translations to avoid re-translating
    let translations = {};
    if (fs.existsSync(OUTPUT_FILE)) {
        translations = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
    }

    const postsToTranslate = allPosts.filter(p => !translations[p.slug]);
    
    // For safety and speed, we'll only translate the top 20 missing ones per run
    // The user can re-run this script in CI or locally to gradually translate everything
    const BATCH_SIZE = 20;
    const batch = postsToTranslate.slice(0, BATCH_SIZE);

    console.log(`📝 Translating ${batch.length} new posts (Run script multiple times for more)...`);

    for (let i = 0; i < batch.length; i++) {
        const post = batch[i];
        console.log(`  [${i+1}/${batch.length}] Translating: ${post.slug}`);
        
        try {
            const titleRes = await translate(post.title, { to: 'hi' });
            let excerptHi = '';
            if (post.excerpt) {
                const excerptRes = await translate(post.excerpt, { to: 'hi' });
                excerptHi = excerptRes.text;
            }

            translations[post.slug] = {
                titleHindi: titleRes.text,
                excerptHindi: excerptHi
            };
            
            // Sleep to avoid 429 Too Many Requests
            await sleep(1500); 
        } catch (error) {
            console.error(`❌ Error translating ${post.slug}:`, error.message);
            if (error.name === 'TooManyRequestsError') {
                console.log('⚠️ Rate limit hit. Saving progress and exiting.');
                break;
            }
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(translations, null, 2), 'utf-8');
    
    console.log(`\n✅ Saved translations to ${OUTPUT_FILE}`);
    console.log(`   Total translated posts so far: ${Object.keys(translations).length} / ${allPosts.length}`);
    console.log('═══════════════════════════════════════════════════════════════\n');
}

main();
