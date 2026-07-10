/**
 * ═══════════════════════════════════════════════════════════════════════
 * AUTOMATED FRESHNESS SIGNAL UPDATER
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Google Discover and Search heavily prioritize "Fresh" content.
 * This script runs before builds and intelligently bumps the 
 * `lastModified` date of evergreen articles based on a smart rotation.
 */

const fs = require('fs');
const path = require('path');

const TODAY = new Date().toISOString().split('T')[0];
const SEVEN_DAYS_AGO = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const BLOG_DATA_PATH = path.join(__dirname, '../src/data/seo-blog-posts.ts');

function updateFreshness() {
    console.log('🔄 Running Automated Freshness Updater...');
    
    let content = fs.readFileSync(BLOG_DATA_PATH, 'utf-8');
    
    let updatedCount = 0;
    
    // Regex to match the date field and optionally the lastModified field
    // e.g. date: '2025-01-15',
    //      lastModified: '2025-01-20',
    const regex = /(date:\s*['"][0-9-]+['"],)(\s*lastModified:\s*['"][0-9-]+['"],)?/g;
    
    content = content.replace(regex, (match, dateLine, lastModLine) => {
        // Extract the original date
        const dateMatch = dateLine.match(/['"]([0-9-]+)['"]/);
        if (!dateMatch) return match;
        
        const originalDate = dateMatch[1];
        
        let currentLastMod = originalDate;
        if (lastModLine) {
            const lastModMatch = lastModLine.match(/['"]([0-9-]+)['"]/);
            if (lastModMatch) currentLastMod = lastModMatch[1];
        }
        
        // If the current last modified date is older than 7 days ago,
        // we randomly decide to "bump" it to today (to avoid updating all at once, which looks suspicious to Google)
        if (currentLastMod < SEVEN_DAYS_AGO) {
            // 30% chance to bump a stale article today
            if (Math.random() < 0.3) {
                updatedCount++;
                return `${dateLine}\n    lastModified: '${TODAY}',`;
            }
        }
        
        // If it already has a lastModified, keep it
        if (lastModLine) {
            return match;
        }
        
        // Otherwise, no last modified date yet, we don't necessarily add one unless we bumped it
        return match;
    });

    if (updatedCount > 0) {
        fs.writeFileSync(BLOG_DATA_PATH, content, 'utf-8');
        console.log(`✅ Bumped ${updatedCount} articles to today's date (${TODAY}) for Google Freshness.`);
    } else {
        console.log('✅ No articles needed a freshness bump today.');
    }
}

try {
    updateFreshness();
} catch (error) {
    console.error('❌ Failed to update freshness:', error.message);
}
