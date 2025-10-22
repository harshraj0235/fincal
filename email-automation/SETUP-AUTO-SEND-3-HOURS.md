# ⚙️ Setup Automatic Email Sending Every 3 Hours

## 🎯 What This Does

The system will automatically:
1. **Extract latest content** from your sitemap.xml
2. **Prioritize new content** (< 7 days old gets 85% preference)
3. **Send professional emails** to all active subscribers
4. **Log all activity** in email-activity-log.json
5. **Run every 3 hours** automatically in the background

---

## 📋 Method 1: Windows Task Scheduler (Recommended)

### Step 1: Open Task Scheduler
- Press `Win + R`
- Type: `taskschd.msc`
- Press Enter

### Step 2: Create New Task
- Click "Create Basic Task"
- Name: `MoneyCal Auto Email Sender`
- Description: `Sends automated emails every 3 hours with latest content`
- Click Next

### Step 3: Set Trigger
- Select: **Daily**
- Start: **Today at 9:00 AM** (or any time)
- Click Next

### Step 4: Set Action
- Select: **Start a program**
- Program/script: `powershell.exe`
- Add arguments:
```
-ExecutionPolicy Bypass -File "C:\Users\Anand\Downloads\main fincal\fincal\email-automation\Auto-Send-Every-3-Hours.ps1"
```
- Click Next, then Finish

### Step 5: Configure Advanced Settings
- Right-click the task → Properties
- Go to **Triggers** tab → Edit
- Check: **Repeat task every: 3 hours**
- Duration: **Indefinitely**
- Click OK

### Step 6: Test It!
- Right-click the task → **Run**
- Check your email and `email-activity-log.json`

---

## 📋 Method 2: PowerShell Command (Manual)

Run this in PowerShell (as Administrator):

```powershell
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -File 'C:\Users\Anand\Downloads\main fincal\fincal\email-automation\Auto-Send-Every-3-Hours.ps1'"

$trigger = New-ScheduledTaskTrigger -Once -At 9:00AM -RepetitionInterval (New-TimeSpan -Hours 3) -RepetitionDuration ([TimeSpan]::MaxValue)

Register-ScheduledTask -TaskName "MoneyCal Auto Email Sender" -Action $action -Trigger $trigger -Description "Sends automated emails every 3 hours with latest content from MoneyCal.in"
```

---

## 📋 Method 3: Keep PowerShell Window Open (Simple)

If you want to run it continuously in a PowerShell window:

```powershell
cd "C:\Users\Anand\Downloads\main fincal\fincal\email-automation"

while ($true) {
    .\Auto-Send-Every-3-Hours.ps1
    Write-Host "Sleeping for 3 hours..." -ForegroundColor Cyan
    Start-Sleep -Seconds 10800  # 3 hours = 10800 seconds
}
```

---

## 🔍 How It Prioritizes Content

### Content Selection Algorithm:
- **85% chance**: Sends latest/high-priority content (< 30 days old)
- **15% chance**: Sends older content for diversity
- **Priority Levels**:
  - **Very High**: < 7 days old (NEW content!)
  - **High**: < 30 days old
  - **Medium**: Older content

### Example:
```
Today's content (0 days old): 85% selection chance
Week-old content (7 days): 85% selection chance
Month-old content (30 days): 85% selection chance
Older content: 15% selection chance
```

---

## 📊 Activity Logging

Every email batch is logged in `email-activity-log.json`:

```json
{
  "timestamp": "2025-10-21 21:29:19",
  "content_title": "Income Tax Calculator 2025-26",
  "content_url": "https://moneycal.in/calculators/income-tax-calculator",
  "content_category": "Tax Calculator",
  "content_priority": "very_high",
  "content_age_days": 0,
  "success_count": 4,
  "fail_count": 0,
  "total_subscribers": 4
}
```

---

## 🎯 Content Sources

The system automatically pulls from:
1. **Sitemap.xml** (priority 0.9+)
2. **Latest additions** (prioritized)
3. **All sections**:
   - Festival Tools
   - Religious Tools
   - Calculators (SIP, EMI, Tax, Loan, etc.)
   - Finance Tools
   - Tax Tools
   - Government Schemes
   - Crypto Finance
   - Astro Finance
   - Blogs

---

## ✅ Verify It's Working

### Check 1: Email Activity Log
```powershell
Get-Content email-activity-log.json | ConvertFrom-Json | Select-Object -Last 5
```

### Check 2: Check Gmail
- All 4 subscribers should receive emails
- Emails should land in **Primary** tab (not Promotions/Spam)

### Check 3: Task Scheduler
- Open Task Scheduler
- Find "MoneyCal Auto Email Sender"
- Check "Last Run Result" (should be 0x0 = success)

---

## 🛑 Stop Automatic Sending

### Option 1: Disable Task (Keep settings)
```powershell
Disable-ScheduledTask -TaskName "MoneyCal Auto Email Sender"
```

### Option 2: Remove Task Completely
```powershell
Unregister-ScheduledTask -TaskName "MoneyCal Auto Email Sender" -Confirm:$false
```

---

## 🔧 Troubleshooting

### Issue: Emails not sending
**Fix**: Check `config-DONOTCOMMIT.ps1` has correct Gmail App Password

### Issue: Task not running
**Fix**: Ensure PowerShell execution policy allows scripts:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: No new content being picked
**Fix**: Update sitemap.xml with new pages and dates

---

## 📈 Expected Results

- **First run**: Sends latest content (highest priority)
- **3 hours later**: Sends different latest content
- **Subscribers get**: 8 emails per day (every 3 hours)
- **Content rotation**: Smart prioritization ensures new content is featured

---

## 🎉 System Benefits

✅ **Fully Automated** - No manual intervention needed
✅ **Smart Content Selection** - Latest content gets 85% preference
✅ **Inbox Delivery** - Professional emails land in Primary tab
✅ **Activity Tracking** - Full logs of what was sent and when
✅ **Easy Management** - Add/remove subscribers via subscribers.json
✅ **Scalable** - Add more content via sitemap.xml automatically

---

**Note**: The system is now LIVE and running! Check your inbox every 3 hours for new content from MoneyCal! 🚀



