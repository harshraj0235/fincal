# MoneyCal Auto News Generator - Auto Mode Setup

## 🚀 Overview

The MoneyCal Auto News Generator is now configured to run automatically every 36 hours, generating 10 new Hindi blog posts and automatically syncing with your GitHub repository at `https://github.com/harshraj0235/fincal`.

## ⚙️ Auto Mode Features

### 🔄 **Continuous Operation**
- **Blog Generation**: Every 36 hours (1.5 days)
- **GitHub Sync**: Every 12 hours
- **Content Updates**: Every 24 hours
- **Background Service**: Runs continuously without manual intervention

### 📝 **Automatic Blog Creation**
- Generates 10 new blog posts per cycle
- Hindi content with proper SEO optimization
- Random topics and cities for variety
- 1200+ word count per post
- Automatic categorization and tagging

### 🔗 **GitHub Auto-Sync**
- **Auto-Pull**: Fetches latest changes from remote
- **Auto-Commit**: Commits all generated content
- **Auto-Push**: Pushes changes to GitHub
- **Conflict Resolution**: Handles merge conflicts automatically

## 🛠️ Setup Instructions

### **Option 1: Quick Start (Recommended)**
```bash
# Navigate to scripts directory
cd scripts

# Start the service (will run continuously)
./start-auto-news-service.ps1
```

### **Option 2: Background Service**
```bash
# Start in background (Windows)
./start-auto-news-service.ps1 -Background

# Install as Windows Service
./start-auto-news-service.ps1 -InstallService

# Start the installed service
Start-Service MoneyCalAutoNewsGenerator
```

### **Option 3: Manual Start**
```bash
# Direct execution
node scripts/auto-news-generator.cjs
```

## 📋 Service Management

### **Start the Service**
```powershell
# PowerShell (recommended)
.\scripts\start-auto-news-service.ps1

# Batch file
.\scripts\start-auto-news-service.bat

# Direct Node.js
node scripts\auto-news-generator.cjs
```

### **Stop the Service**
- Press `Ctrl+C` in the terminal
- Or close the terminal window
- For background service: `Stop-Process -Name "node"`

### **Check Service Status**
```powershell
# Check if Node.js processes are running
Get-Process | Where-Object {$_.ProcessName -eq 'node'}

# Check service status (if installed)
Get-Service MoneyCalAutoNewsGenerator
```

## ⏰ Schedule Configuration

### **Current Schedule**
- **Blog Generation**: Every 36 hours
- **GitHub Sync**: Every 12 hours  
- **Content Updates**: Every 24 hours
- **Timezone**: Asia/Kolkata (IST)

### **Customize Schedule**
Edit `scripts/auto-news-config.json`:
```json
{
  "blogGeneration": {
    "intervalHours": 36,        // Change to desired interval
    "postsPerCycle": 10         // Change number of posts
  },
  "gitSync": {
    "autoSyncIntervalHours": 12 // Change sync frequency
  }
}
```

## 🔧 Configuration Files

### **Main Script**
- `auto-news-generator.cjs` - Main automation script

### **Service Scripts**
- `start-auto-news-service.ps1` - PowerShell service manager
- `start-auto-news-service.bat` - Windows batch file
- `auto-news-config.json` - Configuration settings

### **Generated Content**
- `src/data/blogs/` - All generated blog posts
- `src/data/blogs/index.ts` - Auto-updated blog index

## 📊 Monitoring & Logs

### **Console Output**
The service provides real-time feedback:
- ✅ Success indicators
- ❌ Error messages
- ⏰ Schedule information
- 📝 Generation progress
- 🔄 Sync status

### **Log Files**
- Logs are displayed in real-time
- Check console for detailed information
- Service runs continuously until stopped

## 🚨 Troubleshooting

### **Common Issues**

1. **Service Won't Start**
   - Ensure Node.js is installed: `node --version`
   - Check if scripts directory exists
   - Verify file permissions

2. **GitHub Sync Errors**
   - Check internet connection
   - Verify GitHub credentials
   - Ensure repository access

3. **Content Generation Issues**
   - Check blogs directory permissions
   - Verify template files exist
   - Check disk space

### **Reset Service**
```powershell
# Stop all Node.js processes
Get-Process | Where-Object {$_.ProcessName -eq 'node'} | Stop-Process

# Restart service
.\scripts\start-auto-news-service.ps1
```

## 🔄 Auto Mode Benefits

### **Fully Automated**
- ✅ No manual intervention required
- ✅ Continuous content generation
- ✅ Automatic GitHub synchronization
- ✅ Self-maintaining system

### **Content Quality**
- ✅ SEO-optimized Hindi content
- ✅ Varied topics and cities
- ✅ Professional formatting
- ✅ Consistent structure

### **Repository Management**
- ✅ Automatic commits
- ✅ Regular pushes to GitHub
- ✅ Conflict resolution
- ✅ Version control

## 📈 Performance

### **Resource Usage**
- **CPU**: Minimal (only during generation)
- **Memory**: Low footprint
- **Disk**: Generates ~17KB per blog post
- **Network**: Only for GitHub sync

### **Scalability**
- Handles unlimited blog posts
- Efficient content generation
- Optimized file operations
- Smart scheduling system

## 🎯 Next Steps

1. **Start the Service**: Run the PowerShell script
2. **Monitor Output**: Watch for success indicators
3. **Check GitHub**: Verify automatic commits
4. **Customize**: Adjust settings in config file
5. **Scale**: Increase post frequency if needed

## 📞 Support

The service is designed to run autonomously. If you encounter issues:
1. Check the console output for error messages
2. Verify your GitHub repository access
3. Ensure Node.js is properly installed
4. Check file permissions in the scripts directory

---

**🎉 Your MoneyCal blog will now automatically generate fresh Hindi content every 36 hours and keep your GitHub repository perfectly synchronized!**
