# 🚀 Sitemap Auto-Update System

## What It Does
Automatically updates ALL dates in `sitemap.xml` to current date every 36 hours.

**Why 36 hours?**
- Keeps sitemap fresh for Google
- Shows active content updates
- Improves crawl frequency
- Better indexing priority

---

## ✅ Quick Start

### Option 1: Manual Update (Instant)
```bash
# Windows
run-sitemap-update.bat

# PowerShell
.\auto-update-sitemap-dates.ps1
```

### Option 2: Auto-Update Every 36 Hours (Recommended)
```bash
# Run as Administrator
.\setup-auto-update-task.ps1
```

This creates a Windows Scheduled Task that runs automatically!

---

## 📊 What Gets Updated

**Before:**
```xml
<lastmod>2025-01-20</lastmod>
```

**After (36 hours later):**
```xml
<lastmod>2025-01-22</lastmod>
```

**Updates:** All 1,640+ URLs in sitemap.xml

---

## 🔍 Verify It's Working

### Check Scheduled Task
1. Open **Task Scheduler** (Windows)
2. Look for: `FinCal-Sitemap-AutoUpdate`
3. Status should be: **Ready**

### Check Log
View `sitemap-update-log.txt` for update history:
```
2025-01-20 14:30:00 - Updated 1640 dates to 2025-01-20
2025-01-22 02:30:00 - Updated 1640 dates to 2025-01-22
```

---

## 🎯 Files Created

| File | Purpose |
|------|---------|
| `auto-update-sitemap-dates.ps1` | Main update script |
| `setup-auto-update-task.ps1` | Creates scheduled task |
| `run-sitemap-update.bat` | Quick manual run |
| `sitemap-update-log.txt` | Update history log |

---

## 🛠️ Troubleshooting

### "Access Denied" Error
**Solution:** Run PowerShell as Administrator
```
Right-click PowerShell → Run as Administrator
```

### Task Not Running
1. Open Task Scheduler
2. Find `FinCal-Sitemap-AutoUpdate`
3. Right-click → Run
4. Check "Last Run Result" = Success (0x0)

### Dates Not Updating
1. Check file permissions on `public/sitemap.xml`
2. Verify script path in Task Scheduler
3. Run manually first to test

---

## 📈 SEO Benefits

✅ **Fresh Content Signal** - Google sees regular updates  
✅ **Improved Crawl Rate** - Bots visit more frequently  
✅ **Priority Indexing** - New dates = higher priority  
✅ **Active Site Signal** - Shows ongoing maintenance  

---

## 🔧 Customize Update Frequency

Edit `setup-auto-update-task.ps1`:
```powershell
# Change from 36 hours to your preference:
-RepetitionInterval (New-TimeSpan -Hours 24)  # Daily
-RepetitionInterval (New-TimeSpan -Hours 48)  # Every 2 days
```

---

## ⚡ Next Steps

1. ✅ Run manual update now: `.\run-sitemap-update.bat`
2. ✅ Setup auto-task: `.\setup-auto-update-task.ps1` (as Admin)
3. ✅ Submit to Google Search Console
4. ✅ Check log after 36 hours

---

## 🎉 You're All Set!

Your sitemap will automatically stay fresh!  
Google will crawl more frequently!  
Better indexing = More traffic! 🚀

