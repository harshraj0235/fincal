/**
 * ═══════════════════════════════════════════════════════════════════════
 * INDEXNOW BULK SUBMISSION
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Sends the top 500 URLs to IndexNow (Bing, Yandex, Seznam) to trigger
 * instant crawling and indexing after a successful build.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'moneycal.in';
const KEY = '467d825db6c7cec969b9ba04316e293d';
const URLS_FILE = path.resolve(__dirname, '../public/all-urls-master.txt');

function main() {
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('🚀 INDEXNOW: Initiating bulk ping to search engines...');
    console.log('═══════════════════════════════════════════════════════════════\n');

    if (!fs.existsSync(URLS_FILE)) {
        console.error('❌ Error: all-urls-master.txt not found.');
        return;
    }

    const urls = fs.readFileSync(URLS_FILE, 'utf-8')
        .split('\n')
        .map(u => u.trim())
        .filter(u => u.length > 0 && !u.includes('/category/') && !u.includes('/topics/'));

    // Prioritize high-freshness content like Discover, News, and IPOs
    const priorityUrls = urls.filter(u => u.includes('/discover/') || u.includes('/news/') || u.includes('/ipo/'));
    const otherUrls = urls.filter(u => !u.includes('/discover/') && !u.includes('/news/') && !u.includes('/ipo/'));
    
    // IndexNow recommends a max of 10,000 URLs per request. 
    // We'll send the top 500 prioritizing fresh content.
    const topUrls = [...priorityUrls, ...otherUrls].slice(0, 500);

    const payload = JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: topUrls
    });

    const options = {
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200 || res.statusCode === 202) {
                console.log(`✅ IndexNow Submission Successful! (Status: ${res.statusCode})`);
                console.log(`   📡 Submitted ${topUrls.length} URLs for instant indexing.`);
                console.log(`   🌐 Search engines notified: Bing, Yandex, Seznam`);
            } else {
                console.error(`❌ IndexNow Submission Failed! (Status: ${res.statusCode})`);
                console.error(`   Message: ${responseData}`);
            }
            console.log('\n═══════════════════════════════════════════════════════════════\n');
        });
    });

    req.on('error', (e) => {
        console.error(`❌ IndexNow Request Error: ${e.message}`);
    });

    req.write(payload);
    req.end();
}

main();
