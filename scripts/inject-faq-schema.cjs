/**
 * ═══════════════════════════════════════════════════════════════════════
 * FAQ AUTO-GENERATOR FOR BLOG POSTS
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Parses all blog data files and auto-generates FAQ schema entries
 * from the heading + paragraph structure of each post.
 * 
 * Strategy: For each blog post, extract up to 5 FAQs by converting
 * headings into questions and using the following paragraph as the answer.
 * 
 * Run: node scripts/inject-faq-schema.cjs
 * Output: public/generated-faqs.json (consumed by prerender.cjs)
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src');
const OUTPUT_FILE = path.resolve(__dirname, '../public/generated-faqs.json');

// Hindi question patterns for common finance headings
const HINDI_Q_PATTERNS = [
    { match: /calculator|कैलकुलेटर/i, q: (t) => `${t} कैसे use करें?` },
    { match: /eligibility|पात्रता/i, q: (t) => `${t} के लिए कौन eligible है?` },
    { match: /benefits|लाभ|फायदे/i, q: (t) => `${t} के क्या फायदे हैं?` },
    { match: /apply|आवेदन/i, q: (t) => `${t} के लिए कैसे apply करें?` },
    { match: /documents|दस्तावेज/i, q: (t) => `${t} के लिए कौन से documents चाहिए?` },
];

function headingToQuestion(heading, postTitle) {
    if (!heading || heading.length < 5) return null;
    const h = heading.trim();

    // Already a question
    if (h.endsWith('?') || h.includes('कैसे') || h.includes('क्या')) return h;

    // "What is X" pattern
    if (/^(what|how|why|when|which|who|can|is|does|do|should)/i.test(h)) return h + '?';

    // Hindi patterns
    for (const p of HINDI_Q_PATTERNS) {
        if (p.match.test(h)) return p.q(h);
    }

    // Default: "What is [heading]?"
    if (/[a-zA-Z]/.test(h)) {
        return `What is ${h}?`;
    }
    return `${h} क्या है?`;
}

function extractFaqsFromContent(contentStr) {
    const faqs = [];
    // Split by content block boundaries
    const blocks = contentStr.split(/\}\s*,\s*\{/);
    
    let lastHeading = null;
    
    for (const block of blocks) {
        const typeM = block.match(/type:\s*['"]([^'"]+)['"]/);
        const contM = block.match(/content:\s*['"`]([^'"`]{10,}?)['"`]/);
        const type = typeM ? typeM[1] : '';
        const text = contM ? contM[1].replace(/\\(['"`])/g, '$1').trim() : '';
        
        if (!text) continue;
        
        if (type === 'heading' || type === 'subheading') {
            lastHeading = text;
        } else if (type === 'paragraph' && lastHeading) {
            const question = headingToQuestion(lastHeading);
            if (question && text.length >= 30) {
                // Truncate answer to ~200 chars for conciseness
                const answer = text.length > 250 ? text.substring(0, 247) + '...' : text;
                faqs.push({ question, answer });
                lastHeading = null; // consume it
            }
        }
        
        if (faqs.length >= 5) break; // max 5 per post
    }
    
    return faqs;
}

function parseBlogFile(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf-8');
    const results = {};
    
    const blocks = content.split(/\{\s*\n?\s*id:\s*/);
    
    for (const block of blocks) {
        const slugMatch = block.match(/slug:\s*["']([^"']+)["']/);
        if (!slugMatch) continue;
        const slug = slugMatch[1];
        
        // Check if it already has faqSchema
        if (block.includes('faqSchema:')) continue;
        
        // Extract content array (simplified regex)
        const contentArrMatch = block.match(/content:\s*\[([\s\S]*?)(?:\]\s*,|\]\s*\})/);
        if (!contentArrMatch) continue;
        
        const faqs = extractFaqsFromContent(contentArrMatch[1]);
        if (faqs.length >= 2) { // need at least 2 FAQs
            results[`/blog/${slug}`] = faqs;
        }
    }
    
    return results;
}

function main() {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🔍 FAQ AUTO-GENERATOR: Scanning blog data files...');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    const allFaqs = {};
    
    // Parse all blog data files
    const blogFiles = [
        'blogData.ts',
        'blogData1.ts',
        'seo-blog-posts.ts',
        'optimizedBlogPosts.ts',
    ];
    
    for (const file of blogFiles) {
        const filePath = path.join(SRC_DIR, 'data', file);
        console.log(`  📝 Parsing ${file}...`);
        const faqs = parseBlogFile(filePath);
        const count = Object.keys(faqs).length;
        console.log(`     ✅ Generated FAQs for ${count} posts`);
        Object.assign(allFaqs, faqs);
    }
    
    // Also generate FAQs for government schemes that are missing them
    const schemePath = path.join(SRC_DIR, 'data/governmentSchemesData.ts');
    if (fs.existsSync(schemePath)) {
        console.log(`  🏛️  Parsing governmentSchemesData.ts...`);
        const content = fs.readFileSync(schemePath, 'utf-8');
        const blocks = content.split(/\{\s*\n?\s*id:\s*/);
        let schemeCount = 0;
        
        for (const block of blocks) {
            const slugMatch = block.match(/slug:\s*["']([^"']+)["']/);
            if (!slugMatch) continue;
            const slug = slugMatch[1];
            
            // Skip if it already has faqSchema
            if (block.includes('faqSchema:')) continue;
            
            // Use benefits + eligibility to generate FAQs
            const titleMatch = block.match(/titleHindi:\s*["']([^"']+)["']/) || block.match(/title:\s*["']([^"']+)["']/);
            const title = titleMatch ? titleMatch[1] : slug;
            
            const benefitsMatch = block.match(/benefits:\s*\[([\s\S]*?)\]/);
            const eligMatch = block.match(/eligibility:\s*\[([\s\S]*?)\]/);
            
            const faqs = [];
            if (benefitsMatch) {
                const items = benefitsMatch[1].match(/['"]([^'"]{15,})['"]/g);
                if (items && items.length > 0) {
                    faqs.push({
                        question: `${title.split(':')[0].trim()} के क्या लाभ हैं?`,
                        answer: items.slice(0, 3).map(i => i.replace(/^['"]|['"]$/g, '')).join('. ')
                    });
                }
            }
            if (eligMatch) {
                const items = eligMatch[1].match(/['"]([^'"]{15,})['"]/g);
                if (items && items.length > 0) {
                    faqs.push({
                        question: `${title.split(':')[0].trim()} के लिए कौन पात्र है?`,
                        answer: items.slice(0, 3).map(i => i.replace(/^['"]|['"]$/g, '')).join('. ')
                    });
                }
            }
            
            if (faqs.length >= 1) {
                allFaqs[`/government-schemes/${slug}`] = faqs;
                schemeCount++;
            }
        }
        console.log(`     ✅ Generated FAQs for ${schemeCount} schemes`);
    }
    
    // Write output
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allFaqs, null, 2), 'utf-8');
    const totalPosts = Object.keys(allFaqs).length;
    const totalFaqs = Object.values(allFaqs).reduce((sum, f) => sum + f.length, 0);
    
    console.log(`\n═══════════════════════════════════════════════════════════════`);
    console.log(`🎉 FAQ GENERATION COMPLETE!`);
    console.log(`   📄 Posts with FAQs: ${totalPosts}`);
    console.log(`   ❓ Total FAQs generated: ${totalFaqs}`);
    console.log(`   💾 Saved to: ${OUTPUT_FILE}`);
    console.log(`═══════════════════════════════════════════════════════════════\n`);
}

main();
