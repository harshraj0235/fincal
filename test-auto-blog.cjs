#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Auto Blog Generation System...');

// Test 1: Check if required files exist
const requiredFiles = [
  'src/data/blogs/types.ts',
  'src/data/blogs/index.ts',
  'src/utils/rssFetcher.ts',
  'src/utils/blogGenerator.ts',
  'src/utils/autoBlogScheduler.ts'
];

console.log('\n📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing. Please check the file structure.');
  process.exit(1);
}

// Test 2: Check if blogs directory is writable
const blogsDir = 'src/data/blogs';
console.log(`\n📝 Checking write permissions for ${blogsDir}...`);
try {
  const testFile = path.join(blogsDir, 'test-write.tmp');
  fs.writeFileSync(testFile, 'test');
  fs.unlinkSync(testFile);
  console.log('✅ Blogs directory is writable');
} catch (error) {
  console.log('❌ Cannot write to blogs directory:', error.message);
  process.exit(1);
}

// Test 3: Check Git configuration
console.log('\n🔧 Checking Git configuration...');
const { execSync } = require('child_process');
try {
  const gitUser = execSync('git config user.name', { encoding: 'utf8' }).trim();
  const gitEmail = execSync('git config user.email', { encoding: 'utf8' }).trim();
  console.log(`✅ Git configured: ${gitUser} <${gitEmail}>`);
} catch (error) {
  console.log('❌ Git not configured properly:', error.message);
  console.log('Please run: git config --global user.name "Your Name"');
  console.log('Please run: git config --global user.email "your.email@example.com"');
}

// Test 4: Check RSS feed accessibility
console.log('\n📡 Testing RSS feed accessibility...');
const RSS_FEEDS = [
  'https://www.moneycontrol.com/rss/business.xml',
  'https://economictimes.indiatimes.com/rssfeeds/837555174.cms',
  'https://www.livemint.com/rss/money',
  'https://www.cnbctv18.com/commonfeeds/v1/cnbc-rss-feeds.xml',
  'https://in.investing.com/rss/news.rss'
];

async function testRSSFeed(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log(`✅ ${url}`);
      return true;
    } else {
      console.log(`❌ ${url} - Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${url} - Error: ${error.message}`);
    return false;
  }
}

// Test RSS feeds
Promise.all(RSS_FEEDS.map(testRSSFeed)).then(results => {
  const workingFeeds = results.filter(Boolean).length;
  console.log(`\n📊 RSS Feed Status: ${workingFeeds}/${RSS_FEEDS.length} feeds accessible`);
  
  if (workingFeeds > 0) {
    console.log('✅ System is ready for blog generation!');
    console.log('\n🚀 To start the automated system:');
    console.log('   npm run auto-blog:daemon');
    console.log('\n🔧 To test manual generation:');
    console.log('   npm run auto-blog:manual');
  } else {
    console.log('❌ No RSS feeds are accessible. Please check your internet connection.');
  }
});

console.log('\n🎉 Test completed!');
