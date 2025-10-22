# 🚀 MoneyCal Email Automation - Complete Setup Guide

## 📋 Prerequisites

- Node.js (v14 or higher)
- Gmail account (moneycalx9@gmail.com)
- Terminal/Command Prompt access

## 🔧 Step-by-Step Setup

### Step 1: Install Node.js Dependencies

```bash
cd email-automation
npm install
```

This will install:
- `nodemailer` - For sending emails
- `node-cron` - For scheduling

### Step 2: Configure Gmail App Password

**⚠️ Important: Do NOT use your regular Gmail password!**

1. **Enable 2-Factor Authentication on Gmail:**
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process

2. **Generate App Password:**
   - Visit https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "MoneyCal Automation"
   - Click "Generate"
   - **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

3. **Set Environment Variable:**

   **Windows PowerShell:**
   ```powershell
   $env:EMAIL_PASSWORD="abcd efgh ijkl mnop"
   ```

   **Windows CMD:**
   ```cmd
   set EMAIL_PASSWORD=abcdefghijklmnop
   ```

   **Mac/Linux:**
   ```bash
   export EMAIL_PASSWORD="abcdefghijklmnop"
   ```

   **Permanent Setup (Windows):**
   - Search "Environment Variables" in Windows
   - Click "Environment Variables" button
   - Under "User variables", click "New"
   - Variable name: `EMAIL_PASSWORD`
   - Variable value: Your app password
   - Click OK

### Step 3: Verify Configuration

Test your email configuration:

```bash
node email-sender.js test
```

**Expected Output:**
```
🧪 Sending test email...

🚀 Starting email batch at 10/21/2025, 3:30:00 PM
📧 Selected content: "Akshaya Tritiya Muhurat Finder 2025" (Festival Tool)
✅ Email sent to: harshraj0235@gmail.com

📊 Batch Summary:
   ✅ Successful: 1
   ❌ Failed: 0
   📧 Total: 1
   🕐 Next batch in 3 hours

✅ Test completed!
```

### Step 4: Check Your Inbox

1. Check `harshraj0235@gmail.com` inbox
2. Email should arrive within 30 seconds
3. Subject: "🌟 [Content Title] | MoneyCal"
4. Check spam folder if not in inbox

### Step 5: Start Automated Scheduler

```bash
npm start
```

**This will:**
- ✅ Send emails immediately
- ✅ Then send every 3 hours automatically
- ✅ Run continuously until you stop it (Ctrl+C)

**Schedule:**
- 12:00 AM
- 3:00 AM
- 6:00 AM
- 9:00 AM
- 12:00 PM
- 3:00 PM
- 6:00 PM
- 9:00 PM

## 📧 Managing Subscribers

### Add Subscriber via Command

```bash
node email-sender.js add-subscriber email@example.com "Full Name"
```

**Examples:**
```bash
node email-sender.js add-subscriber harshraj0235@gmail.com "Harsh Raj"
node email-sender.js add-subscriber user@gmail.com "John Doe"
```

### Add Multiple Subscribers via Excel

1. Open `subscribers-template.xlsx`
2. Fill in the columns:
   - Email
   - Name
   - Active (TRUE/FALSE)
3. Convert to JSON using online converter or script
4. Update `subscribers.json`

### Manually Edit subscribers.json

```json
{
  "subscribers": [
    {
      "email": "harshraj0235@gmail.com",
      "name": "Harsh Raj",
      "subscribed_date": "2025-10-21",
      "active": true,
      "preferences": {
        "blogs": true,
        "tools": true,
        "schemes": true,
        "festivals": true
      }
    },
    {
      "email": "newuser@gmail.com",
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

## 📝 Adding New Content

### Edit content-database.json

Add your blog posts, tools, schemes:

```json
{
  "blogs": [
    {
      "title": "New Blog Post Title",
      "url": "https://moneycal.in/blog/new-post",
      "description": "Compelling description that makes people click!",
      "category": "Category Name",
      "image": "https://moneycal.in/images/image.jpg"
    }
  ]
}
```

## 🎨 Customizing Email Template

### Edit email-template.html

**Change Colors:**
```css
/* Find these in the <style> section */
background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
/* Change to your brand colors */
```

**Change Logo/Text:**
```html
<div class="logo">💰 MoneyCal</div>
<div class="tagline">Your Trusted Financial & Festival Companion</div>
```

**Add/Remove Sections:**
- Quick Links
- Stats Box
- Featured Content
- Footer Links

## 🔍 Monitoring & Logs

### View Email Logs

Logs are saved in `email-logs.json`:

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

### Admin Panel

Open `admin-panel.html` in browser:
```bash
# Windows
start admin-panel.html

# Mac
open admin-panel.html

# Linux
xdg-open admin-panel.html
```

## ⚠️ Troubleshooting

### Issue: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution:**
- Make sure you're using **App Password**, not regular password
- Enable 2-Factor Authentication first
- Generate new App Password
- Remove spaces from app password when setting env variable

### Issue: Emails going to spam

**Solutions:**
1. **Improve email content**
   - Add unsubscribe link (already included)
   - Use professional language
   - Include company address

2. **Email authentication** (Advanced)
   - Set up SPF record: `v=spf1 include:_spf.google.com ~all`
   - Configure DKIM
   - Add DMARC policy

3. **Start slowly**
   - Send to 5-10 subscribers first
   - Gradually increase volume
   - Monitor bounce rates

### Issue: Rate limiting

Gmail limits:
- 500 emails per day (free Gmail)
- 2,000 emails per day (Google Workspace)

**Solution:**
- Batch emails with delays
- Upgrade to Google Workspace if needed
- Use professional email service (SendGrid, Mailchimp)

## 📊 Excel Integration (Future)

To use Excel instead of JSON:

1. Install `xlsx` package:
   ```bash
   npm install xlsx
   ```

2. Read Excel file:
   ```javascript
   const XLSX = require('xlsx');
   const workbook = XLSX.readFile('subscribers.xlsx');
   const sheet = workbook.Sheets['Subscribers'];
   const subscribers = XLSX.utils.sheet_to_json(sheet);
   ```

## 🚀 Production Deployment

### Option 1: VPS/Cloud Server

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start email-sender.js --name moneycal-emails -- start

# Save configuration
pm2 save

# Auto-start on reboot
pm2 startup
```

### Option 2: Heroku

1. Create `Procfile`:
   ```
   worker: node email-sender.js start
   ```

2. Deploy:
   ```bash
   git add .
   git commit -m "Add email automation"
   heroku create moneycal-email-system
   heroku config:set EMAIL_PASSWORD=your-app-password
   git push heroku main
   heroku ps:scale worker=1
   ```

### Option 3: AWS Lambda (Scheduled)

Use AWS EventBridge to trigger Lambda function every 3 hours.

## 📈 Analytics & Improvement

### Track Email Opens

Add tracking pixel to template:
```html
<img src="https://moneycal.in/api/track-open?id={{EMAIL_ID}}" width="1" height="1" />
```

### Track Clicks

Add UTM parameters to links:
```
?utm_source=email&utm_medium=newsletter&utm_campaign=auto-3hour
```

### A/B Testing

Test different:
- Subject lines
- Send times
- Content types
- Email designs

## 🎯 Best Practices

### Email Content:
✅ Personalize with name  
✅ Keep subject under 50 chars  
✅ Use emojis strategically  
✅ Single clear CTA  
✅ Mobile-responsive design  
✅ Include unsubscribe link  
✅ Provide value in every email  

### Subscriber Management:
✅ Get explicit consent  
✅ Easy unsubscribe process  
✅ Respect preferences  
✅ Clean inactive subscribers  
✅ Monitor bounce rates  

### Technical:
✅ Use App Passwords  
✅ Log all activities  
✅ Handle errors gracefully  
✅ Add delays between emails  
✅ Monitor sending limits  

## 📞 Support

Need help? Contact:
- Email: moneycalx9@gmail.com
- Website: https://moneycal.in/contact

---

**Last Updated:** October 21, 2025  
**Version:** 1.0.0


