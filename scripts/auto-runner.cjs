const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

// Enhanced Configuration
let CONFIG = {
  GITHUB_REPO: 'https://github.com/harshraj0235/fincal.git',
  GITHUB_BRANCH: 'main',
  GITHUB_REMOTE: 'origin',
  INTERVAL_HOURS: 36,
  PROJECT_ROOT: path.resolve(__dirname, '..'),
  LOG_FILE: path.join(__dirname, 'auto-runner.log'),
  ERROR_LOG_FILE: path.join(__dirname, 'auto-runner-errors.log'),
  MAX_RETRIES: 3,
  RETRY_DELAY_MINUTES: 5,
  SCRIPT_TIMEOUT_MINUTES: 30,
  HEALTH_CHECK_INTERVAL_MINUTES: 10,
  scripts: [
    'auto-news-generator.cjs',
    'auto-government-jobs-generator.cjs',
    'auto-scheme-job-generator.cjs',
    'generate-blogs.cjs'
  ]
};

// Enhanced logging with colors and error tracking
const COLORS = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
  RESET: '\x1b[0m'
};

let isShuttingDown = false;
let currentCycle = 0;
let totalCycles = 0;
let lastHealthCheck = Date.now();

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

// Enhanced logging function
function log(message, color = COLORS.WHITE) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  
  console.log(`${color}${logMessage}${COLORS.RESET}`);
  
  try {
    fs.appendFileSync(CONFIG.LOG_FILE, logMessage + '\n');
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }
}

// Error logging function
function logError(error, context = '') {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] ERROR ${context}: ${error.message}\nStack: ${error.stack}\n`;
  
  console.error(`${COLORS.RED}${errorMessage}${COLORS.RESET}`);
  
  try {
    fs.appendFileSync(CONFIG.ERROR_LOG_FILE, errorMessage);
  } catch (writeError) {
    console.error('Failed to write to error log file:', writeError.message);
  }
}

// Health check function
function healthCheck() {
  const now = Date.now();
  const timeSinceLastCheck = now - lastHealthCheck;
  const healthCheckInterval = CONFIG.HEALTH_CHECK_INTERVAL_MINUTES * 60 * 1000;
  
  if (timeSinceLastCheck > healthCheckInterval) {
    log('💓 Health check: Automation system is running normally', COLORS.GREEN);
    lastHealthCheck = now;
  }
}

// Enhanced command execution with timeout and retry
function executeCommand(command, timeoutMinutes = CONFIG.SCRIPT_TIMEOUT_MINUTES) {
  const timeout = timeoutMinutes * 60 * 1000;
  
  return new Promise((resolve, reject) => {
    const child = spawn('cmd', ['/c', command], {
      stdio: 'pipe',
      shell: true,
      timeout: timeout
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
    
    child.on('timeout', () => {
      child.kill();
      reject(new Error(`Command timed out after ${timeoutMinutes} minutes`));
    });
  });
}

// Enhanced script execution with retry mechanism
async function runScript(scriptName, retryCount = 0) {
  const scriptPath = path.join(__dirname, scriptName);
  
  if (!fs.existsSync(scriptPath)) {
    throw new Error(`Script not found: ${scriptPath}`);
  }
  
  try {
    log(`🚀 Running script: ${scriptName}`, COLORS.CYAN);
    
    const result = await executeCommand(`node "${scriptPath}"`);
    log(`✅ Script completed successfully: ${scriptName}`, COLORS.GREEN);
    return result;
    
  } catch (error) {
    logError(error, `Script execution failed: ${scriptName}`);
    
    if (retryCount < CONFIG.MAX_RETRIES) {
      const delayMinutes = CONFIG.RETRY_DELAY_MINUTES * (retryCount + 1);
      log(`🔄 Retrying script ${scriptName} in ${delayMinutes} minutes (attempt ${retryCount + 1}/${CONFIG.MAX_RETRIES})`, COLORS.YELLOW);
      
      await new Promise(resolve => setTimeout(resolve, delayMinutes * 60 * 1000));
      return runScript(scriptName, retryCount + 1);
    } else {
      throw new Error(`Script ${scriptName} failed after ${CONFIG.MAX_RETRIES} retries: ${error.message}`);
    }
  }
}

// Enhanced Git operations with better error handling
async function gitOperation(operation, ...args) {
  const commands = {
    pull: `git pull ${CONFIG.GITHUB_REMOTE} ${CONFIG.GITHUB_BRANCH}`,
    add: 'git add .',
    commit: `git commit -m "${args[0] || 'Auto-generated content update'}"`,
    push: `git push ${CONFIG.GITHUB_REMOTE} ${CONFIG.GITHUB_BRANCH}`,
    status: 'git status --porcelain'
  };
  
  const command = commands[operation];
  if (!command) {
    throw new Error(`Unknown git operation: ${operation}`);
  }
  
  try {
    log(`🔧 Git ${operation}...`, COLORS.BLUE);
    const result = await executeCommand(command);
    log(`✅ Git ${operation} completed successfully`, COLORS.GREEN);
    return result;
  } catch (error) {
    logError(error, `Git ${operation} failed`);
    throw error;
  }
}

// Check Git status
async function checkGitStatus() {
  try {
    const status = await gitOperation('status');
    return status.trim() !== '';
  } catch (error) {
    logError(error, 'Git status check failed');
    return false;
  }
}

// Enhanced script execution with monitoring
async function runAllScripts() {
  log('🚀 Starting automated script execution...', COLORS.MAGENTA);
  
  for (const script of CONFIG.scripts) {
    if (isShuttingDown) {
      log('⚠️ Shutdown requested, stopping script execution', COLORS.YELLOW);
      break;
    }
    
    try {
      await runScript(script);
      
      // Health check between scripts
      healthCheck();
      
      // Small delay between scripts to prevent overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    } catch (error) {
      logError(error, `Failed to run script: ${script}`);
      log(`⚠️ Continuing with next script despite error in ${script}`, COLORS.YELLOW);
    }
  }
  
  log('✅ All scripts execution completed', COLORS.GREEN);
}

// Enhanced Git operations handling
async function handleGitOperations() {
  try {
    // Pull latest changes
    await gitOperation('pull');
    
    // Check if there are changes to commit
    const hasChanges = await checkGitStatus();
    
    if (hasChanges) {
      // Add all changes
      await gitOperation('add');
      
      // Commit with timestamp
      const timestamp = new Date().toISOString();
      const commitMessage = `Auto-generated content update - Cycle ${currentCycle} - ${timestamp}`;
      await gitOperation('commit', commitMessage);
      
      // Push to remote
      await gitOperation('push');
      
      log('✅ Git operations completed successfully', COLORS.GREEN);
    } else {
      log('ℹ️ No changes to commit', COLORS.CYAN);
    }
    
  } catch (error) {
    logError(error, 'Git operations failed');
    log('⚠️ Continuing automation despite Git errors', COLORS.YELLOW);
  }
}

// Enhanced full cycle execution
async function runFullCycle() {
  currentCycle++;
  totalCycles++;
  
  log(`🔄 Starting full automation cycle ${currentCycle}...`, COLORS.MAGENTA);
  log(`⏰ Cycle started at: ${new Date().toISOString()}`, COLORS.CYAN);
  
  try {
    // Run all scripts
    await runAllScripts();
    
    // Handle Git operations
    await handleGitOperations();
    
    log(`✅ Cycle ${currentCycle} completed successfully`, COLORS.GREEN);
    log(`📊 Total cycles completed: ${totalCycles}`, COLORS.CYAN);
    
  } catch (error) {
    logError(error, `Cycle ${currentCycle} failed`);
    log(`⚠️ Cycle ${currentCycle} had errors but continuing...`, COLORS.YELLOW);
  }
}

// Enhanced scheduling with auto-restart
function scheduleNextRun() {
  if (isShuttingDown) {
    log('⚠️ Shutdown requested, not scheduling next run', COLORS.YELLOW);
    return;
  }
  
  const intervalMs = CONFIG.INTERVAL_HOURS * 60 * 60 * 1000;
  const nextRunTime = new Date(Date.now() + intervalMs);
  
  log(`⏰ Next run scheduled for: ${nextRunTime.toISOString()}`, COLORS.CYAN);
  log(`⏰ (${CONFIG.INTERVAL_HOURS} hours from now)`, COLORS.CYAN);
  
  setTimeout(async () => {
    if (!isShuttingDown) {
      try {
        await runFullCycle();
        scheduleNextRun(); // Schedule next cycle
      } catch (error) {
        logError(error, 'Scheduled run failed');
        log('🔄 Attempting to restart automation in 5 minutes...', COLORS.YELLOW);
        setTimeout(() => {
          if (!isShuttingDown) {
            startAutomation();
          }
        }, 5 * 60 * 1000);
      }
    }
  }, intervalMs);
}

// Enhanced startup function
function startAutomation() {
  log('🚀 Starting automation service...', COLORS.MAGENTA);
  
  // Load configuration
  loadConfig();
  
  log(`📁 Working directory: ${__dirname}`, COLORS.CYAN);
  log(`⏰ Interval: ${CONFIG.INTERVAL_HOURS} hours`, COLORS.CYAN);
  log(`📝 Log file: ${CONFIG.LOG_FILE}`, COLORS.CYAN);
  log(`🚨 Error log file: ${CONFIG.ERROR_LOG_FILE}`, COLORS.CYAN);
  log(`🔄 Max retries: ${CONFIG.MAX_RETRIES}`, COLORS.CYAN);
  log(`⏱️ Script timeout: ${CONFIG.SCRIPT_TIMEOUT_MINUTES} minutes`, COLORS.CYAN);
  
  // Set up graceful shutdown handlers
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  process.on('uncaughtException', handleUncaughtException);
  process.on('unhandledRejection', handleUnhandledRejection);
  
  // Start the first cycle immediately
  runFullCycle().then(() => {
    scheduleNextRun();
  }).catch(error => {
    logError(error, 'Initial cycle failed');
    log('🔄 Restarting automation in 5 minutes...', COLORS.YELLOW);
    setTimeout(() => {
      if (!isShuttingDown) {
        startAutomation();
      }
    }, 5 * 60 * 1000);
  });
}

// Enhanced error handlers
function handleUncaughtException(error) {
  logError(error, 'Uncaught Exception');
  log('🔄 Restarting automation in 30 seconds...', COLORS.YELLOW);
  setTimeout(() => {
    if (!isShuttingDown) {
      startAutomation();
    }
  }, 30000);
}

function handleUnhandledRejection(reason, promise) {
  logError(new Error(`Unhandled Rejection at: ${promise}, reason: ${reason}`), 'Unhandled Rejection');
  log('🔄 Restarting automation in 30 seconds...', COLORS.YELLOW);
  setTimeout(() => {
    if (!isShuttingDown) {
      startAutomation();
    }
  }, 30000);
}

// Enhanced graceful shutdown
function gracefulShutdown() {
  log('🛑 Shutdown signal received, stopping automation gracefully...', COLORS.YELLOW);
  isShuttingDown = true;
  
  // Give some time for current operations to complete
  setTimeout(() => {
    log('✅ Automation stopped gracefully', COLORS.GREEN);
    process.exit(0);
  }, 5000);
}

// Export functions for testing
module.exports = {
  startAutomation,
  runFullCycle,
  runAllScripts,
  handleGitOperations,
  gracefulShutdown,
  CONFIG
};

// Start automation if this file is run directly
if (require.main === module) {
  startAutomation();
}
