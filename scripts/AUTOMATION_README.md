# Fincal Automation System

This automation system runs all your content generation scripts every 36 hours and automatically syncs with your GitHub repository.

## 🚀 Features

- **Automatic Script Execution**: Runs all generators every 36 hours
- **Git Integration**: Automatically pulls, commits, and pushes changes
- **Windows Service**: Can be installed as a Windows service
- **Task Scheduler**: Windows Task Scheduler integration
- **Comprehensive Logging**: Detailed logs of all operations
- **Error Handling**: Robust error handling and recovery

## 📁 Files

- `auto-runner.cjs` - Main automation script
- `start-automation.bat` - Windows batch file for easy execution
- `start-automation.ps1` - PowerShell script with advanced features
- `setup-windows-task.ps1` - Windows Task Scheduler setup script

## 🛠️ Prerequisites

1. **Node.js** - Install from [https://nodejs.org/](https://nodejs.org/)
2. **Git** - Install from [https://git-scm.com/](https://git-scm.com/)
3. **GitHub Repository** - Your repo must be configured with remote origin

## 🚀 Quick Start

### Method 1: Simple Batch File (Recommended for beginners)

1. Double-click `start-automation.bat`
2. The service will start and run automatically
3. Press `Ctrl+C` to stop

### Method 2: PowerShell Script

```powershell
# Start the automation service
.\scripts\start-automation.ps1

# Check service status
.\scripts\start-automation.ps1 -Status

# Install as Windows service (requires admin)
.\scripts\start-automation.ps1 -InstallService

# Uninstall Windows service (requires admin)
.\scripts\start-automation.ps1 -UninstallService
```

### Method 3: Windows Task Scheduler (Recommended for production)

```powershell
# Run as Administrator
.\scripts\setup-windows-task.ps1 -Create

# Check status
.\scripts\setup-windows-task.ps1 -Status

# Remove task
.\scripts\setup-windows-task.ps1 -Delete
```

### Method 4: NPM Scripts

```bash
# Start automation
npm run automation:start

# Install Windows task (requires admin)
npm run automation:install-task

# Check status
npm run automation:status

# Remove task (requires admin)
npm run automation:remove-task
```

## ⚙️ Configuration

The automation system is configured in `auto-runner.cjs`:

```javascript
const CONFIG = {
  GITHUB_REPO: 'https://github.com/harshraj0235/fincal.git',
  INTERVAL_HOURS: 36,  // Change this to modify frequency
  LOG_FILE: path.join(__dirname, 'auto-runner.log'),
  SCRIPTS: [
    'auto-news-generator.cjs',
    'auto-government-jobs-generator.cjs',
    'auto-scheme-job-generator.cjs',
    'generate-blogs.cjs'
  ]
};
```

## 📊 What Happens Every 36 Hours

1. **Pull Latest Changes**: Gets latest code from GitHub
2. **Run All Scripts**: Executes all content generators
3. **Check for Changes**: Detects new generated content
4. **Commit Changes**: Creates commit with timestamp
5. **Push to GitHub**: Uploads all changes to your repository
6. **Schedule Next Run**: Sets up the next 36-hour cycle

## 📝 Logging

All operations are logged to `scripts/auto-runner.log` with timestamps and color-coded output:

- 🚀 **Blue**: Starting operations
- ✅ **Green**: Successful operations
- ❌ **Red**: Errors
- ⚠️ **Yellow**: Warnings
- ℹ️ **Cyan**: Information

## 🔧 Troubleshooting

### Common Issues

1. **Node.js not found**
   - Install Node.js from [https://nodejs.org/](https://nodejs.org/)
   - Ensure it's in your system PATH

2. **Git not found**
   - Install Git from [https://git-scm.com/](https://git-scm.com/)
   - Ensure it's in your system PATH

3. **Not a Git repository**
   - Run `git init` in your project directory
   - Configure remote origin: `git remote add origin https://github.com/harshraj0235/fincal.git`

4. **Permission denied**
   - Run PowerShell as Administrator for service installation
   - Check file permissions

5. **GitHub authentication failed**
   - Configure Git credentials: `git config --global user.name "Your Name"`
   - Set up SSH keys or use personal access tokens

### Check Service Status

```powershell
# Check if automation is running
Get-Process -Name "node" | Where-Object { $_.CommandLine -like "*auto-runner.cjs*" }

# Check Windows service status
Get-Service -Name "FincalAutomation" -ErrorAction SilentlyContinue

# Check scheduled task
Get-ScheduledTask -TaskName "FincalAutomation" -ErrorAction SilentlyContinue
```

### Manual Execution

```bash
# Run a single script
node scripts/auto-news-generator.cjs
node scripts/auto-government-jobs-generator.cjs
node scripts/auto-scheme-job-generator.cjs
node scripts/generate-blogs.cjs

# Run all scripts manually
node scripts/auto-runner.cjs
```

## 🔒 Security Considerations

1. **Git Credentials**: Store securely, don't commit to repository
2. **File Permissions**: Ensure scripts have appropriate permissions
3. **Network Access**: Service requires internet access for GitHub operations
4. **Log Files**: Logs may contain sensitive information

## 📈 Monitoring

### Check Logs

```bash
# View recent logs
Get-Content scripts/auto-runner.log -Tail 50

# Search for errors
Select-String "ERROR" scripts/auto-runner.log

# Search for successful operations
Select-String "✅" scripts/auto-runner.log
```

### Performance Metrics

- **Execution Time**: Each cycle logs duration
- **Success Rate**: Tracks successful vs failed script executions
- **Git Operations**: Logs all pull/push operations
- **Error Tracking**: Detailed error messages and stack traces

## 🚀 Advanced Usage

### Custom Scripts

Add your own scripts to the `SCRIPTS` array in `auto-runner.cjs`:

```javascript
SCRIPTS: [
  'auto-news-generator.cjs',
  'auto-government-jobs-generator.cjs',
  'auto-scheme-job-generator.cjs',
  'generate-blogs.cjs',
  'your-custom-script.cjs'  // Add your scripts here
]
```

### Custom Intervals

Change the execution frequency by modifying `INTERVAL_HOURS`:

```javascript
INTERVAL_HOURS: 24,  // Run every 24 hours
INTERVAL_HOURS: 12,  // Run every 12 hours
INTERVAL_HOURS: 48,  // Run every 48 hours
```

### Environment Variables

You can use environment variables for configuration:

```bash
# Set custom interval
set FINCAL_INTERVAL_HOURS=24

# Set custom log file
set FINCAL_LOG_FILE=C:\logs\fincal.log
```

## 📞 Support

If you encounter issues:

1. Check the log file for error details
2. Verify all prerequisites are installed
3. Ensure proper permissions and credentials
4. Check network connectivity to GitHub

## 🔄 Update Process

To update the automation system:

1. Pull latest changes: `git pull origin main`
2. Restart the automation service
3. Check logs for any new errors
4. Verify all scripts are working correctly

---

**Note**: This automation system is designed to run continuously. Ensure your system has stable power and internet connectivity for optimal operation.
