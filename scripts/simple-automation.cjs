const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Simple configuration
const CONFIG = {
  GITHUB_REPO: 'https://github.com/harshraj0235/fincal.git',
  INTERVAL_HOURS: 36,
  LOG_FILE: path.join(__dirname, 'simple-automation.log'),
  scripts: [
    'auto-news-generator.cjs',
    'auto-government-jobs-generator.cjs',
    'auto-scheme-job-generator.cjs',
    'generate-blogs.cjs'
  ]
};

let currentCycle = 0;
let isRunning = false;

// Simple logging
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  
  console.log(logMessage);
  
  try {
    fs.appendFileSync(CONFIG.LOG_FILE, logMessage + '\n');
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }
}

// Execute command safely
function executeCommand(command, description) {
  try {
    log(`🔄 ${description}...`);
    const result = execSync(command, { 
      cwd: path.resolve(__dirname, '..'),
      encoding: 'utf8',
      stdio: 'pipe'
    });
    log(`✅ ${description} completed successfully`);
    return result;
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`);
    return null;
  }
}

// Run a single script
function runScript(scriptName) {
  const scriptPath = path.join(__dirname, scriptName);
  
  if (!fs.existsSync(scriptPath)) {
    log(`⚠️ Script not found: ${scriptName}`);
    return false;
  }
  
  try {
    log(`🚀 Running script: ${scriptName}`);
    execSync(`node "${scriptPath}"`, { 
      cwd: path.resolve(__dirname, '..'),
      encoding: 'utf8',
      stdio: 'pipe'
    });
    log(`✅ Script completed: ${scriptName}`);
    return true;
  } catch (error) {
    log(`❌ Script failed: ${scriptName} - ${error.message}`);
    return false;
  }
}

// Run all scripts
function runAllScripts() {
  log('🚀 Starting script execution...');
  
  let successCount = 0;
  for (const script of CONFIG.scripts) {
    if (runScript(script)) {
      successCount++;
    }
    
    // Small delay between scripts
    setTimeout(() => {}, 2000);
  }
  
  log(`📊 Script execution summary: ${successCount}/${CONFIG.scripts.length} successful`);
  return successCount > 0;
}

// Git operations
function handleGitOperations() {
  log('🔄 Handling Git operations...');
  
  // Pull latest changes
  executeCommand('git pull origin main', 'Pulling latest changes');
  
  // Check if there are changes
  const status = executeCommand('git status --porcelain', 'Checking Git status');
  
  if (status && status.trim()) {
    log('📝 Changes detected, committing and pushing...');
    
    executeCommand('git add .', 'Adding all changes');
    
    const timestamp = new Date().toISOString();
    const commitMessage = `Auto-generated content update - Cycle ${currentCycle} - ${timestamp}`;
    executeCommand(`git commit -m "${commitMessage}"`, 'Committing changes');
    
    executeCommand('git push origin main', 'Pushing to GitHub');
    
    log('✅ Git operations completed');
  } else {
    log('ℹ️ No changes to commit');
  }
}

// Main automation cycle
function runCycle() {
  if (isRunning) {
    log('⚠️ Automation already running, skipping cycle');
    return;
  }
  
  isRunning = true;
  currentCycle++;
  
  log(`🔄 Starting automation cycle ${currentCycle}...`);
  log(`⏰ Cycle started at: ${new Date().toISOString()}`);
  
  try {
    // Run all scripts
    const scriptsSuccess = runAllScripts();
    
    // Handle Git operations
    handleGitOperations();
    
    log(`✅ Cycle ${currentCycle} completed`);
    
  } catch (error) {
    log(`❌ Cycle ${currentCycle} failed: ${error.message}`);
  } finally {
    isRunning = false;
  }
}

// Schedule next run
function scheduleNextRun() {
  const intervalMs = CONFIG.INTERVAL_HOURS * 60 * 60 * 1000;
  const nextRunTime = new Date(Date.now() + intervalMs);
  
  log(`⏰ Next run scheduled for: ${nextRunTime.toISOString()}`);
  log(`⏰ (${CONFIG.INTERVAL_HOURS} hours from now)`);
  
  setTimeout(() => {
    runCycle();
    scheduleNextRun(); // Schedule next cycle
  }, intervalMs);
}

// Start automation
function startAutomation() {
  log('🚀 Starting Fincal Automation...');
  log(`📁 Working directory: ${path.resolve(__dirname, '..')}`);
  log(`⏰ Interval: ${CONFIG.INTERVAL_HOURS} hours`);
  log(`📝 Log file: ${CONFIG.LOG_FILE}`);
  
  // Set up graceful shutdown
  process.on('SIGINT', () => {
    log('🛑 Shutdown signal received, stopping gracefully...');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    log('🛑 Termination signal received, stopping gracefully...');
    process.exit(0);
  });
  
  // Run first cycle immediately
  runCycle();
  
  // Schedule next runs
  scheduleNextRun();
  
  log('✅ Automation started successfully');
}

// Export for testing
module.exports = {
  startAutomation,
  runCycle,
  runAllScripts,
  handleGitOperations,
  CONFIG
};

// Start if run directly
if (require.main === module) {
  startAutomation();
}
