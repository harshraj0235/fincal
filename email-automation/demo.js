// MoneyCal Email System - DEMO MODE
// This demonstrates how the email system works without actually sending emails

const fs = require('fs');
const path = require('path');

// Load data
const subscribersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'subscribers.json'), 'utf-8'));
const contentData = JSON.parse(fs.readFileSync(path.join(__dirname, 'content-database.json'), 'utf-8'));
const emailTemplate = fs.readFileSync(path.join(__dirname, 'email-template.html'), 'utf-8');

// Demo colors for console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Get random content
function getRandomContent() {
  const allContent = [
    ...contentData.blogs.map(item => ({ ...item, type: 'blog' })),
    ...contentData.tools.map(item => ({ ...item, type: 'tool' })),
    ...contentData.schemes.map(item => ({ ...item, type: 'scheme' })),
    ...contentData.festivals.map(item => ({ ...item, type: 'festival' }))
  ];
  
  const randomIndex = Math.floor(Math.random() * allContent.length);
  return allContent[randomIndex];
}

// Generate email HTML
function generateEmailHTML(subscriberName, content) {
  let html = emailTemplate;
  
  html = html.replace(/{{SUBSCRIBER_NAME}}/g, subscriberName || 'Friend');
  html = html.replace(/{{SUBJECT}}/g, content.title);
  html = html.replace(/{{CATEGORY}}/g, content.category);
  html = html.replace(/{{TITLE}}/g, content.title);
  html = html.replace(/{{DESCRIPTION}}/g, content.description);
  html = html.replace(/{{URL}}/g, content.url);
  html = html.replace(/{{UNSUBSCRIBE_URL}}/g, 'https://moneycal.in/unsubscribe');
  
  return html;
}

// Demo function
function runDemo() {
  console.log('\n' + colors.bright + colors.cyan + '═══════════════════════════════════════════════════════' + colors.reset);
  console.log(colors.bright + colors.cyan + '   📧 MONEYCAL EMAIL AUTOMATION SYSTEM - DEMO MODE' + colors.reset);
  console.log(colors.bright + colors.cyan + '═══════════════════════════════════════════════════════' + colors.reset + '\n');

  // Show configuration
  console.log(colors.bright + '📋 Current Configuration:' + colors.reset);
  console.log(`   Sender: ${subscribersData.settings.sender_name}`);
  console.log(`   Email: ${subscribersData.settings.sender_email}`);
  console.log(`   Frequency: Every ${subscribersData.settings.interval_hours} hours`);
  console.log(`   Active Subscribers: ${subscribersData.subscribers.filter(s => s.active).length}`);
  console.log('');

  // Show subscribers
  console.log(colors.bright + colors.blue + '👥 Active Subscribers:' + colors.reset);
  subscribersData.subscribers.filter(s => s.active).forEach((sub, index) => {
    console.log(`   ${index + 1}. ${colors.green}${sub.email}${colors.reset} (${sub.name || 'No name'})`);
  });
  console.log('');

  // Simulate email sending
  console.log(colors.bright + colors.yellow + '🎲 Selecting Random Content...' + colors.reset);
  const content = getRandomContent();
  
  console.log('');
  console.log(colors.bright + '📧 Selected Content:' + colors.reset);
  console.log(`   ${colors.magenta}Type:${colors.reset} ${content.type.toUpperCase()}`);
  console.log(`   ${colors.magenta}Category:${colors.reset} ${content.category}`);
  console.log(`   ${colors.magenta}Title:${colors.reset} ${content.title}`);
  console.log(`   ${colors.magenta}URL:${colors.reset} ${content.url}`);
  console.log(`   ${colors.magenta}Description:${colors.reset} ${content.description}`);
  console.log('');

  // Show email preview
  console.log(colors.bright + colors.green + '✉️  Email Preview:' + colors.reset);
  console.log(colors.cyan + '─────────────────────────────────────────────────────────' + colors.reset);
  console.log(`${colors.bright}From:${colors.reset} ${subscribersData.settings.sender_name} <${subscribersData.settings.sender_email}>`);
  console.log(`${colors.bright}To:${colors.reset} ${subscribersData.subscribers[0].email}`);
  console.log(`${colors.bright}Subject:${colors.reset} 🌟 ${content.title} | MoneyCal`);
  console.log(colors.cyan + '─────────────────────────────────────────────────────────' + colors.reset);
  console.log('');
  console.log(`   ${colors.bright}🙏 Namaste ${subscribersData.subscribers[0].name},${colors.reset}`);
  console.log('');
  console.log('   We thought you\'d love this! Here\'s something special');
  console.log('   we handpicked for you from MoneyCal:');
  console.log('');
  console.log(`   ${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`   ${colors.bright}${content.category}${colors.reset}`);
  console.log(`   ${colors.bright + colors.green}${content.title}${colors.reset}`);
  console.log('');
  console.log(`   ${content.description}`);
  console.log('');
  console.log(`   ${colors.bright}[📖 Read Full Article →]${colors.reset}`);
  console.log(`   ${colors.blue}${content.url}${colors.reset}`);
  console.log(`   ${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log('');
  console.log('   🔥 Trending on MoneyCal:');
  console.log('   • 🪙 Akshaya Tritiya Gold Buying Muhurat');
  console.log('   • 🕉️ Complete Puja Vidhi Generator');
  console.log('   • 📈 SIP Calculator - Plan Your Future');
  console.log('   • 📅 Festival Calendar 2025');
  console.log('');
  console.log(colors.cyan + '─────────────────────────────────────────────────────────' + colors.reset);
  console.log('');

  // Show what would happen
  console.log(colors.bright + colors.green + '✅ DEMO RESULTS:' + colors.reset);
  console.log(`   ${colors.green}✓${colors.reset} Would send to: ${subscribersData.subscribers.filter(s => s.active).length} active subscribers`);
  console.log(`   ${colors.green}✓${colors.reset} Next send would be in: ${subscribersData.settings.interval_hours} hours`);
  console.log(`   ${colors.green}✓${colors.reset} Daily emails: ${24 / subscribersData.settings.interval_hours} times`);
  console.log('');

  // Show schedule
  console.log(colors.bright + '📅 Daily Email Schedule (Every 3 hours):' + colors.reset);
  const schedules = [
    '12:00 AM', '03:00 AM', '06:00 AM', '09:00 AM',
    '12:00 PM', '03:00 PM', '06:00 PM', '09:00 PM'
  ];
  schedules.forEach((time, index) => {
    console.log(`   ${index + 1}. ${colors.cyan}${time}${colors.reset}`);
  });
  console.log('');

  // Show commands
  console.log(colors.bright + colors.magenta + '🚀 Ready to Send Real Emails?' + colors.reset);
  console.log('');
  console.log('   1️⃣  Set Gmail App Password:');
  console.log(`      ${colors.yellow}$env:EMAIL_PASSWORD="your-app-password"${colors.reset}`);
  console.log('');
  console.log('   2️⃣  Send test email:');
  console.log(`      ${colors.yellow}npm run test${colors.reset}`);
  console.log('');
  console.log('   3️⃣  Start automated scheduler:');
  console.log(`      ${colors.yellow}npm start${colors.reset}`);
  console.log('');

  // Show sample email HTML path
  console.log(colors.bright + '💡 Want to see the full HTML email?' + colors.reset);
  const subscriber = subscribersData.subscribers[0];
  const demoHTML = generateEmailHTML(subscriber.name, content);
  const demoFilePath = path.join(__dirname, 'demo-email-preview.html');
  fs.writeFileSync(demoFilePath, demoHTML);
  console.log(`   Saved to: ${colors.green}${demoFilePath}${colors.reset}`);
  console.log(`   ${colors.cyan}Open this file in your browser to see the email!${colors.reset}`);
  console.log('');

  console.log(colors.bright + colors.cyan + '═══════════════════════════════════════════════════════' + colors.reset);
  console.log(colors.bright + colors.green + '   ✅ DEMO COMPLETED SUCCESSFULLY!' + colors.reset);
  console.log(colors.bright + colors.cyan + '═══════════════════════════════════════════════════════' + colors.reset + '\n');
}

// Run demo
runDemo();




