const http = require('http');
const https = require('https');
const { spawn } = require('child_process');

async function extractLinksFromHTML(html) {
  const links = new Set();
  const regex = /href="([^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    let url = match[1];
    if (url.startsWith('/') && !url.startsWith('//')) {
      links.add(url);
    }
  }
  return Array.from(links);
}

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ data, statusCode: res.statusCode, location: res.headers.location }));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching homepage to audit all links...');

  try {
    const { data: homeHtml, statusCode } = await fetchPage('http://localhost:3000/');
    if (statusCode !== 200) {
      console.error(`Failed to load homepage. Status: ${statusCode}`);
      process.exit(1);
    }

    const links = await extractLinksFromHTML(homeHtml);
    console.log(`Found ${links.length} internal links on the homepage. Verifying all of them...`);

    let broken = [];
    let checked = 0;
    
    for (const link of links) {
      // Ignore static assets
      if (link.match(/\.(png|jpg|jpeg|webp|svg|css|js|woff2?|ico|webmanifest)$/)) continue;
      
      const res = await fetchPage(`http://localhost:3000${link}`);
      checked++;
      
      if (res.statusCode >= 400) {
        console.log(`❌ BROKEN [${res.statusCode}]: ${link}`);
        broken.push(link);
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        console.log(`↪️  REDIRECT [${res.statusCode}]: ${link} -> ${res.location}`);
      } else {
        console.log(`✅ OK [${res.statusCode}]: ${link}`);
      }
    }

    console.log(`\nAudit Complete! Checked ${checked} links.`);
    if (broken.length > 0) {
      console.error(`Found ${broken.length} BROKEN links:`);
      broken.forEach(b => console.error(`- ${b}`));
    } else {
      console.log('🎉 ALL LINKS ON THE HOMEPAGE ARE WORKING PERFECTLY!');
    }
  } catch (err) {
    console.error(err);
  }
}

main();
