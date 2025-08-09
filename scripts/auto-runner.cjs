const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const https = require('https');

// Configuration
let CONFIG = {
  GITHUB_REPO: 'https://github.com/harshraj0235/fincal.git',
  INTERVAL_HOURS: 36,
  LOG_FILE: path.join(__dirname, 'auto-runner.log'),
  SCRIPTS: [
    'auto-news-generator.cjs',
    'auto-government-jobs-generator.cjs',
    'auto-scheme-job-generator.cjs',
    'generate-blogs.cjs'
  ]
};

// Load configuration from file if available
function loadConfig() {
  try {
    const configPath = path.join(__dirname, 'automation-config.json');
    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, 'utf8');
      const fileConfig = JSON.parse(configData);
      
      // Merge configurations
      CONFIG = { ...CONFIG, ...fileConfig.automation };
      
      // Update paths
      if (fileConfig.paths) {
        Object.keys(fileConfig.paths).forEach(key => {
          if (key === 'project_root') {
            CONFIG.PROJECT_ROOT = path.resolve(__dirname, fileConfig.paths[key]);
          } else {
            CONFIG[key.toUpperCase()] = path.resolve(__dirname, fileConfig.paths[key]);
          }
        });
      }
      
      // Update GitHub config
      if (fileConfig.github) {
        CONFIG.GITHUB_REPO = fileConfig.github.repository;
        CONFIG.GITHUB_BRANCH = fileConfig.github.branch;
        CONFIG.GITHUB_REMOTE = fileConfig.github.remote;
      }
      
      log('✅ Configuration loaded from automation-config.json', COLORS.GREEN);
    } else {
      log('ℹ️ No configuration file found, using default settings', COLORS.YELLOW);
    }
  } catch (error) {
    log(`⚠️ Failed to load configuration: ${error.message}`, COLORS.YELLOW);
    log('ℹ️ Using default configuration', COLORS.YELLOW);
  }
}

// Colors for console output
const COLORS = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m'
};

// Utility functions
function log(message, color = COLORS.RESET) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  
  console.log(`${color}${logMessage}${COLORS.RESET}`);
  
  // Write to log file
  fs.appendFileSync(CONFIG.LOG_FILE, logMessage + '\n');
}

function executeCommand(command, description) {
  try {
    log(`🔄 ${description}...`, COLORS.BLUE);
    const result = execSync(command, { 
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      stdio: 'pipe'
    });
    log(`✅ ${description} completed successfully`, COLORS.GREEN);
    return result;
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, COLORS.RED);
    return null;
  }
}

function runScript(scriptName) {
  const scriptPath = path.join(__dirname, scriptName);
  
  if (!fs.existsSync(scriptPath)) {
    log(`⚠️ Script not found: ${scriptName}`, COLORS.YELLOW);
    return false;
  }
  
  try {
    log(`🚀 Running script: ${scriptName}`, COLORS.CYAN);
    const result = execSync(`node "${scriptPath}"`, { 
      cwd: __dirname,
      encoding: 'utf8',
      stdio: 'pipe'
    });
    log(`✅ Script ${scriptName} completed successfully`, COLORS.GREEN);
    return true;
  } catch (error) {
    log(`❌ Script ${scriptName} failed: ${error.message}`, COLORS.RED);
    return false;
  }
}

function gitOperation(operation, description) {
  try {
    log(`🔄 Git ${operation}...`, COLORS.BLUE);
    
    switch (operation) {
      case 'pull':
        execSync('git pull origin main', { 
          cwd: path.join(__dirname, '..'),
          stdio: 'pipe'
        });
        break;
      case 'add':
        execSync('git add .', { 
          cwd: path.join(__dirname, '..'),
          stdio: 'pipe'
        });
        break;
      case 'commit':
        const timestamp = new Date().toISOString();
        execSync(`git commit -m "Auto-update: ${timestamp} - Generated new content"`, { 
          cwd: path.join(__dirname, '..'),
          stdio: 'pipe'
        });
        break;
      case 'push':
        execSync('git push origin main', { 
          cwd: path.join(__dirname, '..'),
          stdio: 'pipe'
        });
        break;
    }
    
    log(`✅ Git ${operation} completed successfully`, COLORS.GREEN);
    return true;
  } catch (error) {
    log(`❌ Git ${operation} failed: ${error.message}`, COLORS.RED);
    return false;
  }
}

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', { 
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8'
    });
    return status.trim().length > 0;
  } catch (error) {
    log(`❌ Git status check failed: ${error.message}`, COLORS.RED);
    return false;
  }
}

function runAllScripts() {
  log('🚀 Starting automated script execution...', COLORS.MAGENTA);
  
  let successCount = 0;
  let totalCount = CONFIG.SCRIPTS.length;
  
  // Run each script
  for (const script of CONFIG.SCRIPTS) {
    if (runScript(script)) {
      successCount++;
    }
    
    // Small delay between scripts
    setTimeout(() => {}, 1000);
  }
  
  log(`📊 Script execution summary: ${successCount}/${totalCount} successful`, COLORS.CYAN);
  return successCount === totalCount;
}

function handleGitOperations() {
  log('🔄 Handling Git operations...', COLORS.BLUE);
  
  // Pull latest changes
  if (!gitOperation('pull', 'Pulling latest changes')) {
    log('⚠️ Failed to pull latest changes, continuing...', COLORS.YELLOW);
  }
  
  // Check if there are changes to commit
  if (checkGitStatus()) {
    log('📝 Changes detected, committing and pushing...', COLORS.CYAN);
    
    if (gitOperation('add', 'Adding all changes')) {
      if (gitOperation('commit', 'Committing changes')) {
        gitOperation('push', 'Pushing to GitHub');
      }
    }
  } else {
    log('ℹ️ No changes to commit', COLORS.CYAN);
  }
}

function runFullCycle() {
  log('🔄 Starting full automation cycle...', COLORS.MAGENTA);
  
  const startTime = new Date();
  log(`⏰ Cycle started at: ${startTime.toISOString()}`, COLORS.CYAN);
  
  // Run all scripts
  const scriptsSuccess = runAllScripts();
  
  // Handle Git operations
  handleGitOperations();
  
  const endTime = new Date();
  const duration = (endTime - startTime) / 1000;
  
  log(`✅ Full cycle completed in ${duration.toFixed(2)} seconds`, COLORS.GREEN);
  log(`⏰ Next cycle will run in ${CONFIG.INTERVAL_HOURS} hours`, COLORS.CYAN);
  
  return scriptsSuccess;
}

function scheduleNextRun() {
  const nextRun = new Date();
  nextRun.setHours(nextRun.getHours() + CONFIG.INTERVAL_HOURS);
  
  log(`⏰ Next scheduled run: ${nextRun.toISOString()}`, COLORS.YELLOW);
  
  // Schedule next run
  setTimeout(() => {
    log('⏰ Scheduled time reached, starting new cycle...', COLORS.MAGENTA);
    runFullCycle();
    scheduleNextRun(); // Schedule the next run
  }, CONFIG.INTERVAL_HOURS * 60 * 60 * 1000);
}

function startAutomation() {
  log('🚀 Starting automation service...', COLORS.MAGENTA);
  
  // Load configuration
  loadConfig();
  
  log(`📁 Working directory: ${__dirname}`, COLORS.CYAN);
  log(`⏰ Interval: ${CONFIG.INTERVAL_HOURS} hours`, COLORS.CYAN);
  log(`📝 Log file: ${CONFIG.LOG_FILE}`, COLORS.CYAN);
  
  // Create log file if it doesn't exist
  if (!fs.existsSync(CONFIG.LOG_FILE)) {
    fs.writeFileSync(CONFIG.LOG_FILE, '');
  }
  
  // Run initial cycle
  runFullCycle();
  
  // Schedule next runs
  scheduleNextRun();
  
  log('✅ Automation service started successfully', COLORS.GREEN);
  log('🔄 Service will continue running automatically', COLORS.CYAN);
}

// Handle process termination
process.on('SIGINT', () => {
  log('🛑 Received SIGINT, shutting down gracefully...', COLORS.YELLOW);
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('🛑 Received SIGTERM, shutting down gracefully...', COLORS.YELLOW);
  process.exit(0);
});

// Export functions for external use
module.exports = {
  runFullCycle,
  runAllScripts,
  handleGitOperations,
  startAutomation
};

// If this file is run directly, start the automation
if (require.main === module) {
  startAutomation();
}
