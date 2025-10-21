// Quick test script to send email immediately
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Email configuration with your credentials
const EMAIL_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'moneycalx9@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'YOUR_PASSWORD_HERE' // Set EMAIL_PASSWORD environment variable
  }
};

console.log('📧 MoneyCal Email Test - Starting...\n');

// Create transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Load data
const subscribersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'subscribers.json'), 'utf-8'));
const contentData = JSON.parse(fs.readFileSync(path.join(__dirname, 'content-database.json'), 'utf-8'));
const emailTemplate = fs.readFileSync(path.join(__dirname, 'email-template.html'), 'utf-8');

// Get random content
const allContent = [
  ...contentData.tools.map(item => ({ ...item, type: 'tool' })),
  ...contentData.blogs.map(item => ({ ...item, type: 'blog' })),
  ...contentData.schemes.map(item => ({ ...item, type: 'scheme' })),
  ...contentData.festivals.map(item => ({ ...item, type: 'festival' }))
];
const randomContent = allContent[Math.floor(Math.random() * allContent.length)];

console.log('✅ Selected Content:', randomContent.title);
console.log('📁 Category:', randomContent.category);
console.log('🔗 URL:', randomContent.url);
console.log('');

// Generate email HTML
let emailHTML = emailTemplate;
emailHTML = emailHTML.replace(/{{SUBSCRIBER_NAME}}/g, 'Harsh Raj');
emailHTML = emailHTML.replace(/{{SUBJECT}}/g, randomContent.title);
emailHTML = emailHTML.replace(/{{CATEGORY}}/g, randomContent.category);
emailHTML = emailHTML.replace(/{{TITLE}}/g, randomContent.title);
emailHTML = emailHTML.replace(/{{DESCRIPTION}}/g, randomContent.description);
emailHTML = emailHTML.replace(/{{URL}}/g, randomContent.url);
emailHTML = emailHTML.replace(/{{UNSUBSCRIBE_URL}}/g, 'https://moneycal.in/unsubscribe');

// Send email
const mailOptions = {
  from: '"MoneyCal - Your Financial Companion" <moneycalx9@gmail.com>',
  to: 'harshraj0235@gmail.com',
  subject: `🌟 ${randomContent.title} | MoneyCal`,
  html: emailHTML,
  headers: {
    'X-Entity-Ref-ID': `moneycal-${Date.now()}`,
    'List-Unsubscribe': '<https://moneycal.in/unsubscribe>',
  }
};

console.log('📤 Sending email to: harshraj0235@gmail.com');
console.log('📨 Subject: 🌟', randomContent.title, '| MoneyCal');
console.log('');

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('❌ Error sending email:');
    console.log(error);
    console.log('');
    
    if (error.responseCode === 535) {
      console.log('🔐 Authentication Error - Possible solutions:');
      console.log('   1. Enable "Less secure app access" in Gmail settings');
      console.log('   2. Use App Password instead of regular password');
      console.log('   3. Check if credentials are correct');
      console.log('   Visit: https://myaccount.google.com/lesssecureapps');
    }
  } else {
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📮 Response:', info.response);
    console.log('');
    console.log('🎉 CHECK YOUR INBOX: harshraj0235@gmail.com');
    console.log('');
    console.log('💡 Next steps:');
    console.log('   • Check inbox (and spam folder)');
    console.log('   • To send every 3 hours: npm start');
    console.log('   • To add more subscribers: edit subscribers.json');
  }
});

