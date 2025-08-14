const { runNewsPortalAutomation } = require('./news-portal-automation.cjs');
const fs = require('fs');
const path = require('path');

// Scheduler Configuration
const SCHEDULER_CONFIG = {
  INTERVAL_HOURS: 24,
  LOG_FILE: path.join(__dirname, 'news-portal-scheduler.log'),
  ERROR_LOG_FILE: path.join(__dirname, 'news-portal-scheduler-errors.log'),
  STATUS_FILE: path.join(__dirname, 'news-portal-scheduler-status.json')
};

// Utility Functions
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(SCHEDULER_CONFIG.LOG_FILE, logMessage + '\n');
}

function logError(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ERROR: ${message}`;
  console.error(logMessage);
  fs.appendFileSync(SCHEDULER_CONFIG.ERROR_LOG_FILE, logMessage + '\n');
}

function updateStatus(status) {
  const statusData = {
    lastRun: new Date().toISOString(),
    status: status,
    nextRun: new Date(Date.now() + (SCHEDULER_CONFIG.INTERVAL_HOURS * 60 * 60 * 1000)).toISOString(),
    totalRuns: 0,
    successfulRuns: 0,
    failedRuns: 0
  };

  // Load existing status if available
  if (fs.existsSync(SCHEDULER_CONFIG.STATUS_FILE)) {
    try {
      const existingStatus = JSON.parse(fs.readFileSync(SCHEDULER_CONFIG.STATUS_FILE, 'utf8'));
      statusData.totalRuns = (existingStatus.totalRuns || 0) + 1;
      statusData.successfulRuns = existingStatus.successfulRuns || 0;
      statusData.failedRuns = existingStatus.failedRuns || 0;
      
      if (status === 'success') {
        statusData.successfulRuns++;
      } else if (status === 'failed') {
        statusData.failedRuns++;
      }
    } catch (error) {
      logError(`Failed to load existing status: ${error.message}`);
    }
  } else {
    statusData.totalRuns = 1;
    if (status === 'success') {
      statusData.successfulRuns = 1;
    } else if (status === 'failed') {
      statusData.failedRuns = 1;
    }
  }

  fs.writeFileSync(SCHEDULER_CONFIG.STATUS_FILE, JSON.stringify(statusData, null, 2));
}

function runNewsPortalCycle() {
  log('🚀 Starting News Portal Automation Cycle...');
  
  try {
    // Run the news portal automation
    runNewsPortalAutomation();
    
    // Update status
    updateStatus('success');
    
    log('✅ News Portal Automation Cycle completed successfully!');
    log(`⏰ Next cycle scheduled in ${SCHEDULER_CONFIG.INTERVAL_HOURS} hours`);
    
  } catch (error) {
    logError(`News Portal Automation Cycle failed: ${error.message}`);
    updateStatus('failed');
  }
}

function scheduleNextRun() {
  const intervalMs = SCHEDULER_CONFIG.INTERVAL_HOURS * 60 * 60 * 1000; // Convert hours to milliseconds
  
  setTimeout(() => {
    runNewsPortalCycle();
    scheduleNextRun(); // Schedule the next run
  }, intervalMs);
  
  const nextRunTime = new Date(Date.now() + intervalMs);
  log(`📅 Next News Portal Automation scheduled for: ${nextRunTime.toISOString()}`);
}

function startNewsPortalScheduler() {
  log('🎯 Starting News Portal Scheduler...');
  log(`⏰ Automation will run every ${SCHEDULER_CONFIG.INTERVAL_HOURS} hours`);
  
  // Run immediately on startup
  runNewsPortalCycle();
  
  // Schedule subsequent runs
  scheduleNextRun();
  
  log('✅ News Portal Scheduler started successfully!');
  log('🔄 Scheduler will continue running indefinitely...');
  
  // Keep the process alive
  process.on('SIGINT', () => {
    log('🛑 News Portal Scheduler stopped by user');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    log('🛑 News Portal Scheduler stopped by system');
    process.exit(0);
  });
}

// Health check function
function getSchedulerStatus() {
  try {
    if (fs.existsSync(SCHEDULER_CONFIG.STATUS_FILE)) {
      const status = JSON.parse(fs.readFileSync(SCHEDULER_CONFIG.STATUS_FILE, 'utf8'));
      return status;
    }
    return { status: 'not_started' };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
}

// Export functions
module.exports = {
  startNewsPortalScheduler,
  runNewsPortalCycle,
  getSchedulerStatus,
  SCHEDULER_CONFIG
};

// Run if called directly
if (require.main === module) {
  startNewsPortalScheduler();
}
