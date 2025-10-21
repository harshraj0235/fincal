// MoneyCal Automated Email Notification System
// Sends random content from website every 3 hours to subscribers

const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

// Load data files
const subscribersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'subscribers.json'), 'utf-8'));
const contentData = JSON.parse(fs.readFileSync(path.join(__dirname, 'content-database.json'), 'utf-8'));
const emailTemplate = fs.readFileSync(path.join(__dirname, 'email-template.html'), 'utf-8');

// Email configuration
const EMAIL_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'moneycalx9@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'YOUR_PASSWORD_HERE' // Set EMAIL_PASSWORD environment variable
  }
};

// Create email transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Function to get random content from database
function getRandomContent() {
  // Combine all content types
  const allContent = [
    ...contentData.blogs.map(item => ({ ...item, type: 'blog' })),
    ...contentData.tools.map(item => ({ ...item, type: 'tool' })),
    ...contentData.schemes.map(item => ({ ...item, type: 'scheme' })),
    ...contentData.festivals.map(item => ({ ...item, type: 'festival' }))
  ];

  // Pick random content
  const randomIndex = Math.floor(Math.random() * allContent.length);
  return allContent[randomIndex];
}

// Function to generate personalized email HTML
function generateEmailHTML(subscriberName, content) {
  let html = emailTemplate;
  
  // Replace placeholders
  html = html.replace(/{{SUBSCRIBER_NAME}}/g, subscriberName || 'Friend');
  html = html.replace(/{{SUBJECT}}/g, content.title);
  html = html.replace(/{{CATEGORY}}/g, content.category);
  html = html.replace(/{{TITLE}}/g, content.title);
  html = html.replace(/{{DESCRIPTION}}/g, content.description);
  html = html.replace(/{{URL}}/g, content.url);
  html = html.replace(/{{UNSUBSCRIBE_URL}}/g, 'https://moneycal.in/unsubscribe');
  
  return html;
}

// Function to send email to all subscribers
async function sendEmailsToSubscribers() {
  console.log(`\n🚀 Starting email batch at ${new Date().toLocaleString('en-IN')}`);
  
  const activeSubscribers = subscribersData.subscribers.filter(sub => sub.active);
  
  if (activeSubscribers.length === 0) {
    console.log('❌ No active subscribers found');
    return;
  }

  // Get random content for this batch
  const content = getRandomContent();
  console.log(`📧 Selected content: "${content.title}" (${content.category})`);

  let successCount = 0;
  let failCount = 0;

  // Send to each subscriber
  for (const subscriber of activeSubscribers) {
    try {
      const emailHTML = generateEmailHTML(subscriber.name, content);
      
      const mailOptions = {
        from: `"${subscribersData.settings.sender_name}" <${subscribersData.settings.sender_email}>`,
        to: subscriber.email,
        subject: `🌟 ${content.title} | MoneyCal`,
        html: emailHTML,
        headers: {
          'X-Entity-Ref-ID': `moneycal-${Date.now()}`,
          'List-Unsubscribe': '<https://moneycal.in/unsubscribe>',
        }
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to: ${subscriber.email}`);
      successCount++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Failed to send to ${subscriber.email}:`, error.message);
      failCount++;
    }
  }

  console.log(`\n📊 Batch Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📧 Total: ${activeSubscribers.length}`);
  console.log(`   🕐 Next batch in ${subscribersData.settings.interval_hours} hours\n`);

  // Log to file
  logEmailActivity(content, successCount, failCount);
}

// Function to log email activity
function logEmailActivity(content, successCount, failCount) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    content_title: content.title,
    content_url: content.url,
    success_count: successCount,
    fail_count: failCount,
    total_subscribers: subscribersData.subscribers.filter(s => s.active).length
  };

  const logFile = path.join(__dirname, 'email-logs.json');
  let logs = [];
  
  if (fs.existsSync(logFile)) {
    logs = JSON.parse(fs.readFileSync(logFile, 'utf-8'));
  }
  
  logs.push(logEntry);
  
  // Keep only last 100 entries
  if (logs.length > 100) {
    logs = logs.slice(-100);
  }
  
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
}

// Function to add new subscriber
function addSubscriber(email, name = '') {
  const newSubscriber = {
    email: email,
    name: name,
    subscribed_date: new Date().toISOString().split('T')[0],
    active: true,
    preferences: {
      blogs: true,
      tools: true,
      schemes: true,
      festivals: true
    }
  };

  subscribersData.subscribers.push(newSubscriber);
  fs.writeFileSync(
    path.join(__dirname, 'subscribers.json'),
    JSON.stringify(subscribersData, null, 2)
  );
  
  console.log(`✅ New subscriber added: ${email}`);
}

// Function to send test email
async function sendTestEmail() {
  console.log('\n🧪 Sending test email...\n');
  await sendEmailsToSubscribers();
}

// Schedule email sending every 3 hours
function startEmailScheduler() {
  console.log('📅 Email scheduler started!');
  console.log(`⏰ Emails will be sent every ${subscribersData.settings.interval_hours} hours`);
  console.log(`📧 Sending to ${subscribersData.subscribers.filter(s => s.active).length} active subscribers`);
  console.log(`🚀 First email will be sent immediately...\n`);

  // Send immediately on start
  sendEmailsToSubscribers();

  // Schedule for every 3 hours (0 */3 * * *)
  cron.schedule('0 */3 * * *', () => {
    console.log('\n⏰ Scheduled email batch triggered');
    sendEmailsToSubscribers();
  });

  console.log('✅ Scheduler is now running. Press Ctrl+C to stop.\n');
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args[0] === 'test') {
    // Send test email immediately
    sendTestEmail().then(() => {
      console.log('\n✅ Test completed!');
      process.exit(0);
    }).catch(error => {
      console.error('\n❌ Test failed:', error);
      process.exit(1);
    });
  } else if (args[0] === 'add-subscriber') {
    // Add new subscriber
    const email = args[1];
    const name = args[2] || '';
    if (!email) {
      console.error('❌ Usage: node email-sender.js add-subscriber <email> [name]');
      process.exit(1);
    }
    addSubscriber(email, name);
    process.exit(0);
  } else if (args[0] === 'start') {
    // Start the scheduler
    startEmailScheduler();
  } else {
    console.log('\n📧 MoneyCal Email Automation System\n');
    console.log('Usage:');
    console.log('  node email-sender.js test              - Send test email now');
    console.log('  node email-sender.js start             - Start 3-hour scheduler');
    console.log('  node email-sender.js add-subscriber <email> [name]  - Add new subscriber\n');
    console.log('Examples:');
    console.log('  node email-sender.js test');
    console.log('  node email-sender.js add-subscriber user@example.com "John Doe"');
    console.log('  node email-sender.js start\n');
  }
}

module.exports = {
  sendEmailsToSubscribers,
  addSubscriber,
  getRandomContent
};

