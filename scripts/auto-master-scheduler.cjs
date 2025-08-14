const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const https = require('https');

// Master Configuration
const MASTER_CONFIG = {
  // Scripts to run
  scripts: [
    {
      name: 'Auto News Generator',
      file: 'auto-news-generator.cjs',
      enabled: true,
      intervalHours: 36
    },
    {
      name: 'Government Jobs Generator',
      file: 'auto-government-jobs-generator.cjs',
      enabled: true,
      intervalHours: 36
    },
    {
      name: 'Scheme Job Generator',
      file: 'auto-scheme-job-generator.cjs',
      enabled: true,
      intervalHours: 36
    },
    {
      name: 'Blog Generator',
      file: 'generate-blogs.cjs',
      enabled: true,
      intervalHours: 36
    }
  ],
  
  // GitHub Configuration
  git: {
    repository: 'https://github.com/harshraj0235/fincal',
    branch: 'main',
    autoSync: true,
    syncIntervalHours: 12,
    commitMessage: 'Auto-sync: Updated content and data files',
    pullBeforePush: true
  },
  
  // Logging
  logging: {
    logFile: 'master-scheduler.log',
    maxLogSize: '10MB',
    maxLogFiles: 5
  },
  
  // Schedule
  schedule: {
    timezone: 'Asia/Kolkata',
    runEveryHours: 36,
    startDelayMinutes: 5
  }
};

// Utility Functions
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  
  console.log(logMessage);
  
  // Write to log file
  const logPath = path.join(__dirname, MASTER_CONFIG.logging.logFile);
  fs.appendFileSync(logPath, logMessage + '\n');
}

function getRandomDelay(minSeconds = 30, maxSeconds = 300) {
  return Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Git Operations
class GitManager {
  constructor(config) {
    this.config = config;
    this.repoPath = path.resolve(__dirname, '..');
  }

  async pullChanges() {
    try {
      log('🔄 Pulling latest changes from GitHub...');
      execSync('git pull origin main', { 
        cwd: this.repoPath, 
        stdio: 'inherit' 
      });
      log('✅ Successfully pulled changes from GitHub');
      return true;
    } catch (error) {
      log(`❌ Error pulling changes: ${error.message}`, 'ERROR');
      return false;
    }
  }

  async commitAndPush() {
    try {
      log('📝 Committing changes...');
      
      // Add all changes
      execSync('git add .', { 
        cwd: this.repoPath, 
        stdio: 'inherit' 
      });
      
      // Commit with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const commitMessage = `${this.config.commitMessage} - ${timestamp}`;
      
      execSync(`git commit -m "${commitMessage}"`, { 
        cwd: this.repoPath, 
        stdio: 'inherit' 
      });
      
      log('🚀 Pushing changes to GitHub...');
      execSync('git push origin main', { 
        cwd: this.repoPath, 
        stdio: 'inherit' 
      });
      
      log('✅ Successfully pushed changes to GitHub');
      return true;
    } catch (error) {
      log(`❌ Error in git operations: ${error.message}`, 'ERROR');
      return false;
    }
  }

  async syncWithGitHub() {
    if (!this.config.autoSync) {
      log('⚠️ Git sync is disabled in configuration');
      return false;
    }

    try {
      // Pull first
      if (this.config.pullBeforePush) {
        await this.pullChanges();
      }
      
      // Commit and push
      await this.commitAndPush();
      return true;
    } catch (error) {
      log(`❌ Git sync failed: ${error.message}`, 'ERROR');
      return false;
    }
  }
}

// Script Runner
class ScriptRunner {
  constructor(scriptConfig, gitManager) {
    this.scriptConfig = scriptConfig;
    this.gitManager = gitManager;
    this.lastRun = null;
    this.isRunning = false;
  }

  async runScript() {
    if (this.isRunning) {
      log(`⚠️ Script ${this.scriptConfig.name} is already running, skipping...`);
      return false;
    }

    if (!this.scriptConfig.enabled) {
      log(`⚠️ Script ${this.scriptConfig.name} is disabled, skipping...`);
      return false;
    }

    const scriptPath = path.join(__dirname, this.scriptConfig.file);
    
    if (!fs.existsSync(scriptPath)) {
      log(`❌ Script file not found: ${scriptPath}`, 'ERROR');
      return false;
    }

    this.isRunning = true;
    
    try {
      log(`🚀 Starting script: ${this.scriptConfig.name}`);
      
      // Run the script
      execSync(`node "${scriptPath}"`, { 
        cwd: __dirname, 
        stdio: 'inherit',
        timeout: 300000 // 5 minutes timeout
      });
      
      this.lastRun = new Date();
      log(`✅ Script completed successfully: ${this.scriptConfig.name}`);
      
      // Sync with GitHub after script completion
      await this.gitManager.syncWithGitHub();
      
      return true;
    } catch (error) {
      log(`❌ Script failed: ${this.scriptConfig.name} - ${error.message}`, 'ERROR');
      return false;
    } finally {
      this.isRunning = false;
    }
  }

  shouldRun() {
    if (!this.lastRun) return true;
    
    const hoursSinceLastRun = (new Date() - this.lastRun) / (1000 * 60 * 60);
    return hoursSinceLastRun >= this.scriptConfig.intervalHours;
  }
}

// Master Scheduler
class MasterScheduler {
  constructor(config) {
    this.config = config;
    this.gitManager = new GitManager(config.git);
    this.scriptRunners = config.scripts.map(script => 
      new ScriptRunner(script, this.gitManager)
    );
    this.isRunning = false;
    this.stats = {
      totalRuns: 0,
      successfulRuns: 0,
      failedRuns: 0,
      lastSync: null
    };
  }

  async start() {
    if (this.isRunning) {
      log('⚠️ Master scheduler is already running');
      return;
    }

    this.isRunning = true;
    log('🎯 Starting Master Scheduler...');
    log(`📅 Schedule: Every ${this.config.schedule.runEveryHours} hours`);
    log(`🔄 Git Sync: Every ${this.config.git.syncIntervalHours} hours`);
    log(`⏰ Timezone: ${this.config.schedule.timezone}`);
    
    // Initial delay
    const initialDelay = this.config.schedule.startDelayMinutes * 60 * 1000;
    log(`⏳ Starting in ${this.config.schedule.startDelayMinutes} minutes...`);
    await sleep(initialDelay);

    // Main loop
    while (this.isRunning) {
      try {
        await this.runCycle();
        
        // Wait for next cycle
        const cycleDelay = this.config.schedule.runEveryHours * 60 * 60 * 1000;
        log(`⏳ Next cycle in ${this.config.schedule.runEveryHours} hours...`);
        await sleep(cycleDelay);
        
      } catch (error) {
        log(`❌ Cycle failed: ${error.message}`, 'ERROR');
        await sleep(60000); // Wait 1 minute before retrying
      }
    }
  }

  async runCycle() {
    log('🔄 Starting new cycle...');
    
    // Pull latest changes first
    await this.gitManager.syncWithGitHub();
    
    // Run all enabled scripts
    for (const runner of this.scriptRunners) {
      if (runner.shouldRun()) {
        this.stats.totalRuns++;
        
        const success = await runner.runScript();
        if (success) {
          this.stats.successfulRuns++;
        } else {
          this.stats.failedRuns++;
        }
        
        // Add random delay between scripts
        const delay = getRandomDelay(30, 120) * 1000;
        log(`⏳ Waiting ${delay/1000} seconds before next script...`);
        await sleep(delay);
      } else {
        log(`⏭️ Skipping ${runner.scriptConfig.name} - not due yet`);
      }
    }
    
    // Final sync
    await this.gitManager.syncWithGitHub();
    this.stats.lastSync = new Date();
    
    log('✅ Cycle completed successfully');
    this.logStats();
  }

  logStats() {
    log('📊 Current Statistics:');
    log(`   • Total Runs: ${this.stats.totalRuns}`);
    log(`   • Successful: ${this.stats.successfulRuns}`);
    log(`   • Failed: ${this.stats.failedRuns}`);
    log(`   • Success Rate: ${this.stats.totalRuns > 0 ? ((this.stats.successfulRuns / this.stats.totalRuns) * 100).toFixed(1) : 0}%`);
    log(`   • Last Sync: ${this.stats.lastSync ? this.stats.lastSync.toISOString() : 'Never'}`);
  }

  stop() {
    log('🛑 Stopping Master Scheduler...');
    this.isRunning = false;
  }
}

// Error handling
process.on('SIGINT', () => {
  log('🛑 Received SIGINT, shutting down gracefully...');
  if (global.masterScheduler) {
    global.masterScheduler.stop();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('🛑 Received SIGTERM, shutting down gracefully...');
  if (global.masterScheduler) {
    global.masterScheduler.stop();
  }
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  log(`❌ Uncaught Exception: ${error.message}`, 'ERROR');
  log(`❌ Stack: ${error.stack}`, 'ERROR');
});

process.on('unhandledRejection', (reason, promise) => {
  log(`❌ Unhandled Rejection at: ${promise}, reason: ${reason}`, 'ERROR');
});

// Main execution
async function main() {
  try {
    log('🎯 MoneyCal Master Scheduler Starting...');
    log(`📁 Working Directory: ${__dirname}`);
    log(`🔧 Configuration: ${JSON.stringify(MASTER_CONFIG, null, 2)}`);
    
    const scheduler = new MasterScheduler(MASTER_CONFIG);
    global.masterScheduler = scheduler;
    
    await scheduler.start();
    
  } catch (error) {
    log(`❌ Fatal error: ${error.message}`, 'ERROR');
    log(`❌ Stack: ${error.stack}`, 'ERROR');
    process.exit(1);
  }
}

// Start the scheduler
if (require.main === module) {
  main();
}

module.exports = { MasterScheduler, GitManager, ScriptRunner };
