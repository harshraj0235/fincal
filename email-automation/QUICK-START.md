# ⚡ Quick Start - MoneyCal Email Automation

## 🎯 What This Does

Automatically sends beautiful emails every 3 hours to your subscribers with random content from MoneyCal:
- 📝 Blog posts
- 🛠️ Tools & calculators
- 🏛️ Government schemes
- 🎊 Festival guides

## 🚀 5-Minute Setup

### 1. Install Dependencies (1 minute)

```bash
cd email-automation
npm install
```

### 2. Get Gmail App Password (2 minutes)

1. Visit: https://myaccount.google.com/apppasswords
2. Generate password for "MoneyCal Automation"
3. Copy the 16-character code

### 3. Set Password (30 seconds)

```powershell
$env:EMAIL_PASSWORD="your-app-password-here"
```

### 4. Run Demo (30 seconds)

```bash
npm run demo
```

See how the system works without sending real emails!

### 5. Send Test Email (1 minute)

```bash
npm run test
```

Check `harshraj0235@gmail.com` inbox!

## ✅ Done!

To start automated 3-hour schedule:
```bash
npm start
```

## 📧 Current Subscriber

- **Email:** harshraj0235@gmail.com
- **Name:** Harsh Raj
- **Status:** Active ✅

## 🎨 What Subscribers Receive

Beautiful HTML emails with:
- Personalized greeting
- Random featured content
- Quick links to trending tools
- Stats showcase
- Social media links
- Easy unsubscribe option

## 📊 Email Schedule

Sends **8 times per day:**
- 12:00 AM, 3:00 AM, 6:00 AM, 9:00 AM
- 12:00 PM, 3:00 PM, 6:00 PM, 9:00 PM

## 🔧 Add More Subscribers

```bash
node email-sender.js add-subscriber email@example.com "Name"
```

Or edit `subscribers.json` directly.

## 📝 Add More Content

Edit `content-database.json` to add:
- New blog posts
- New tools
- Government schemes
- Festival guides

## 🎯 Next Steps

1. ✅ Run demo to see preview
2. ✅ Send test email
3. ✅ Add more subscribers
4. ✅ Customize email template
5. ✅ Start scheduler

---

**Need Help?** Check `README.md` or `SETUP-GUIDE.md`




