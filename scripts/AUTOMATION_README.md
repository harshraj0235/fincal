# 🚀 MoneyCal Complete Automation System

## 📋 Overview

The MoneyCal automation system is designed to run all content generation scripts automatically every 36 hours and handle GitHub push/pull operations seamlessly. This system ensures your repository at `https://github.com/harshraj0235/fincal` stays updated with fresh content without any manual intervention.

## 🎯 Features

### ✅ **Fully Automated**
- **36-Hour Schedule**: All scripts run automatically every 36 hours
- **GitHub Sync**: Automatic push/pull operations every 12 hours
- **Multi-Script Management**: Coordinates all automation scripts
- **Error Recovery**: Automatic retry mechanisms
- **Background Operation**: Runs continuously without user intervention

### 📝 **Content Generation**
- **Auto News Generator**: Creates Hindi news blog posts
- **Government Jobs Generator**: Generates government job content
- **Scheme Job Generator**: Creates government scheme content
- **Blog Generator**: Produces general blog content
- **SEO Optimized**: All content is optimized for search engines

### 🔄 **GitHub Integration**
- **Auto-Pull**: Fetches latest changes from remote repository
- **Auto-Commit**: Commits all generated content with timestamps
- **Auto-Push**: Pushes changes to GitHub automatically
- **Conflict Resolution**: Handles merge conflicts intelligently

## 🛠️ Quick Start

### **Option 1: Simple Start (Recommended)**
```bash
# Navigate to project directory
cd fincal

# Start the master scheduler
npm run start-auto
```

### **Option 2: Background Mode**
```bash
# Start in background (continues running after terminal closes)
npm run start-auto-bg
```

### **Option 3: Direct Script Execution**
```bash
# Run master scheduler directly
npm run master-scheduler
```

### **Option 4: Windows Service (Advanced)**
```powershell
# Install as Windows service (requires admin)
.\scripts\start-master-scheduler.ps1 -InstallService

# Start the service
.\scripts\start-master-scheduler.ps1 -StartService

# Check status
.\scripts\start-master-scheduler.ps1 -Status
```

## 📁 File Structure

```
scripts/
├── auto-master-scheduler.cjs          # Main scheduler script
├── start-master-scheduler.ps1         # PowerShell service manager
├── start-master-scheduler.bat         # Windows batch file
├── master-scheduler-config.json       # Configuration file
├── auto-news-generator.cjs            # News content generator
├── auto-government-jobs-generator.cjs # Government jobs generator
├── auto-scheme-job-generator.cjs      # Scheme jobs generator
├── generate-blogs.cjs                 # Blog content generator
└── AUTOMATION_README.md               # This file
```

## ⚙️ Configuration

### **Master Scheduler Configuration**
Edit `scripts/master-scheduler-config.json`:

```json
{
  "schedule": {
    "runEveryHours": 36,           // Change to desired interval
    "startDelayMinutes": 5         // Initial delay before first run
  },
  "gitSync": {
    "autoSyncIntervalHours": 12,   // GitHub sync frequency
    "repository": "https://github.com/harshraj0235/fincal"
  },
  "scripts": [
    {
      "name": "Auto News Generator",
      "enabled": true,             // Enable/disable individual scripts
      "intervalHours": 36
    }
  ]
}
```

### **Individual Script Configuration**
Each script has its own configuration file:
- `auto-news-config.json` - News generator settings
- Individual script settings within each `.cjs` file

## 📊 Monitoring & Management

### **Check Service Status**
```powershell
# Check if scheduler is running
.\scripts\start-master-scheduler.ps1 -Status

# View recent logs
.\scripts\start-master-scheduler.ps1 -Logs
```

### **Service Management**
```powershell
# Start service
.\scripts\start-master-scheduler.ps1 -StartService

# Stop service
.\scripts\start-master-scheduler.ps1 -StopService

# Install as Windows service
.\scripts\start-master-scheduler.ps1 -InstallService

# Uninstall Windows service
.\scripts\start-master-scheduler.ps1 -UninstallService
```

### **Log Files**
- `master-scheduler.log` - Main scheduler logs
- `auto-news-generator.log` - News generator logs
- `auto-government-jobs-generator.log` - Government jobs logs
- `auto-scheme-job-generator.log` - Scheme jobs logs

## 🔧 Troubleshooting

### **Common Issues**

1. **Service Won't Start**
   ```bash
   # Check Node.js installation
   node --version
   
   # Check if scripts exist
   ls scripts/
   
   # Check file permissions
   icacls scripts/
   ```

2. **GitHub Sync Errors**
   ```bash
   # Check git configuration
   git config --list
   
   # Test git access
   git ls-remote https://github.com/harshraj0235/fincal
   
   # Check internet connection
   ping github.com
   ```

3. **Script Execution Errors**
   ```bash
   # Check Node.js version compatibility
   node --version
   
   # Test individual scripts
   node scripts/auto-news-generator.cjs
   
   # Check log files for detailed errors
   tail -f scripts/master-scheduler.log
   ```

### **Reset Service**
```powershell
# Stop all Node.js processes
Get-Process | Where-Object {$_.ProcessName -eq 'node'} | Stop-Process

# Clear logs
Remove-Item scripts/*.log -Force

# Restart service
.\scripts\start-master-scheduler.ps1
```

## 📈 Performance & Resources

### **Resource Usage**
- **CPU**: Minimal (only during content generation)
- **Memory**: ~50-100MB during operation
- **Disk**: Generates ~17KB per blog post
- **Network**: Only for GitHub sync and content fetching

### **Scalability**
- Handles unlimited content generation
- Efficient file operations
- Smart scheduling prevents resource conflicts
- Automatic cleanup of old logs and backups

## 🔒 Security Features

### **Built-in Security**
- Script validation before execution
- File integrity checks
- Execution time limits
- Allowed file extension restrictions
- Secure GitHub operations

### **Best Practices**
- Runs with minimal privileges
- No sensitive data in logs
- Secure configuration management
- Automatic backup of important files

## 🎯 Automation Benefits

### **Time Savings**
- ✅ No manual content creation needed
- ✅ Automatic GitHub synchronization
- ✅ Continuous operation 24/7
- ✅ Self-maintaining system

### **Content Quality**
- ✅ SEO-optimized Hindi content
- ✅ Varied topics and cities
- ✅ Professional formatting
- ✅ Consistent structure

### **Repository Management**
- ✅ Automatic version control
- ✅ Regular commits with timestamps
- ✅ Conflict resolution
- ✅ Backup and recovery

## 📞 Support & Maintenance

### **Automatic Maintenance**
- Log rotation and cleanup
- Backup creation and management
- Performance monitoring
- Health checks and recovery

### **Manual Maintenance**
- Review logs periodically
- Update configurations as needed
- Monitor GitHub repository
- Check content quality

## 🚀 Next Steps

1. **Start the Service**: Use one of the quick start methods above
2. **Monitor Output**: Watch for success indicators in logs
3. **Check GitHub**: Verify automatic commits are working
4. **Customize**: Adjust settings in configuration files
5. **Scale**: Increase content frequency if needed

## 📋 Checklist

- [ ] Node.js installed and working
- [ ] Git configured with repository access
- [ ] All script files present in scripts/ directory
- [ ] Configuration files properly set up
- [ ] Master scheduler started successfully
- [ ] GitHub sync working (check commits)
- [ ] Content generation running (check logs)
- [ ] Service running continuously

---

**🎉 Your MoneyCal automation system is now fully configured to run every 36 hours and keep your GitHub repository perfectly synchronized!**

For any issues or questions, check the log files and use the troubleshooting section above.
