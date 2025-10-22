# 📧 MoneyCal Email Automation System

Automated email notification system that sends beautiful, engaging emails with random content from MoneyCal every 3 hours.

## ✨ Features

- ✅ Sends emails every 3 hours automatically
- ✅ Random content selection from blogs, tools, schemes, festivals
- ✅ Beautiful HTML email templates (mobile-responsive)
- ✅ Subscriber management (JSON-based)
- ✅ Activity logging
- ✅ Easy to add/remove subscribers
- ✅ Gmail SMTP integration
- ✅ Anti-spam design with proper headers
- ✅ Unsubscribe functionality

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd email-automation
npm install
```

### 2. Configure Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Scroll down to **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password

### 3. Set Environment Variable

**Windows PowerShell:**
```powershell
$env:EMAIL_PASSWORD="your-16-char-app-password"
```

**Windows CMD:**
```cmd
set EMAIL_PASSWORD=your-16-char-app-password
```

**Linux/Mac:**
```bash
export EMAIL_PASSWORD="your-16-char-app-password"
```

### 4. Send Test Email

```bash
npm run test
```

This will send one email immediately to all active subscribers.

### 5. Start Automated Scheduler

```bash
npm start
```

This will:
- Send emails immediately
- Then send every 3 hours automatically
- Run continuously (press Ctrl+C to stop)

## 📝 Usage Commands

### Send Test Email
```bash
node email-sender.js test
```

### Add New Subscriber
```bash
node email-sender.js add-subscriber harshraj0235@gmail.com "Harsh Raj"
```

### Start 3-Hour Scheduler
```bash
node email-sender.js start
```

## 📊 Subscriber Management

### Add Subscriber via JSON

Edit `subscribers.json`:

```json
{
  "subscribers": [
    {
      "email": "newuser@example.com",
      "name": "New User",
      "subscribed_date": "2025-10-21",
      "active": true,
      "preferences": {
        "blogs": true,
        "tools": true,
        "schemes": true,
        "festivals": true
      }
    }
  ]
}
```

### Deactivate Subscriber

Set `"active": false` in subscribers.json

## 📧 Email Template Customization

Edit `email-template.html` to customize:
- Header design
- Colors and branding
- Content layout
- Footer links
- Social media icons

**Variables available:**
- `{{SUBSCRIBER_NAME}}` - Subscriber's name
- `{{SUBJECT}}` - Email subject
- `{{CATEGORY}}` - Content category
- `{{TITLE}}` - Content title
- `{{DESCRIPTION}}` - Content description
- `{{URL}}` - Content URL
- `{{UNSUBSCRIBE_URL}}` - Unsubscribe link

## 📁 Content Management

### Add New Content

Edit `content-database.json`:

```json
{
  "blogs": [
    {
      "title": "Your New Blog Title",
      "url": "https://moneycal.in/blog/your-post",
      "description": "Engaging description that makes people click!",
      "category": "Finance Tips",
      "image": "https://moneycal.in/images/blog-image.jpg"
    }
  ]
}
```

**Content Types:**
- `blogs` - Blog posts
- `tools` - Calculator/Tools
- `schemes` - Government schemes
- `festivals` - Festival tools

## 📈 Monitoring & Logs

### Check Email Logs

Logs are automatically saved in `email-logs.json`:

```json
[
  {
    "timestamp": "2025-10-21T10:30:00.000Z",
    "content_title": "Akshaya Tritiya Muhurat Finder",
    "content_url": "https://moneycal.in/festival-tools/akshaya-tritiya-muhurat",
    "success_count": 1,
    "fail_count": 0,
    "total_subscribers": 1
  }
]
```

## ⚙️ Configuration

### Change Email Interval

Edit `subscribers.json`:

```json
{
  "settings": {
    "interval_hours": 3,  // Change to 1, 6, 12, 24 etc.
    "emails_per_batch": 50
  }
}
```

### Cron Schedule Options

Edit `email-sender.js` line with `cron.schedule()`:

```javascript
// Every 3 hours
cron.schedule('0 */3 * * *', ...)

// Every hour
cron.schedule('0 * * * *', ...)

// Every 6 hours
cron.schedule('0 */6 * * *', ...)

// Daily at 9 AM
cron.schedule('0 9 * * *', ...)

// Twice daily (9 AM and 6 PM)
cron.schedule('0 9,18 * * *', ...)
```

## 🔒 Security Best Practices

1. **Never commit Gmail password** - Use environment variables
2. **Use App Passwords** - Not your actual Gmail password
3. **Enable 2FA** on Gmail account
4. **Monitor logs** for suspicious activity
5. **Implement unsubscribe** links
6. **Follow CAN-SPAM Act** guidelines

## 🚀 Deployment Options

### Option 1: Local Server (Windows/Mac/Linux)
```bash
# Keep terminal open
npm start
```

### Option 2: PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start email-sender.js --name moneycal-emails -- start
pm2 save
pm2 startup
```

### Option 3: Cloud (Heroku, AWS, DigitalOcean)
```bash
# Add to Procfile
worker: node email-sender.js start
```

### Option 4: GitHub Actions (Scheduled Workflow)
Create `.github/workflows/email-automation.yml`

## 📊 Analytics & Tracking

### Track Email Opens (Future Enhancement)

Add tracking pixel to email template:

```html
<img src="https://moneycal.in/track?email={{EMAIL}}&id={{EMAIL_ID}}" width="1" height="1" />
```

### Track Clicks (Future Enhancement)

Use URL shortener or tracking parameter:
```
https://moneycal.in/blog/post?utm_source=email&utm_campaign=auto
```

## 🎨 Email Template Best Practices

### Current Design Features:
✅ Mobile-responsive design  
✅ Beautiful gradient header  
✅ Clear call-to-action buttons  
✅ Quick links section  
✅ Stats showcase  
✅ Professional footer  
✅ Unsubscribe link  
✅ Anti-spam headers  

### Tips for High Engagement:
- Keep subject lines under 50 characters
- Use emojis strategically (🌟, 🚀, 💰)
- Personalize with subscriber name
- Include clear value proposition
- Mobile-first design
- Single clear CTA
- Include social proof (stats)

## 📋 Troubleshooting

### Email Not Sending?

1. **Check Gmail App Password**
   ```bash
   echo $EMAIL_PASSWORD
   ```

2. **Verify SMTP Settings**
   - Host: smtp.gmail.com
   - Port: 587
   - Secure: false (uses STARTTLS)

3. **Check Gmail Account**
   - 2FA enabled?
   - App password generated?
   - Account not locked?

4. **Test Connection**
   ```bash
   node -e "const n=require('nodemailer'); n.createTransport({host:'smtp.gmail.com',port:587,auth:{user:'moneycalx9@gmail.com',pass:process.env.EMAIL_PASSWORD}}).verify((e,s)=>console.log(e||'✅ Connected'))"
   ```

### Emails Going to Spam?

1. **Improve email content**
   - Avoid spam trigger words
   - Include unsubscribe link
   - Use proper From name
   - Add physical address (optional)

2. **Configure SPF/DKIM** (Advanced)
   - Add SPF record to domain DNS
   - Configure DKIM signing
   - Add DMARC policy

3. **Warm up sending**
   - Start with small batches
   - Gradually increase volume
   - Monitor bounce rates

## 📞 Support

For issues or questions:
- Email: moneycalx9@gmail.com
- Website: https://moneycal.in/contact

## 📜 License

MIT License - Free to use and modify

---

**Made with ❤️ for MoneyCal Users**


