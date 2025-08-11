const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Service configuration
const SERVICE_CONFIG = {
  name: 'FincalAutomation',
  description: 'Fincal Content Generation and GitHub Sync Automation',
  scriptPath: path.join(__dirname, 'auto-runner.cjs'),
  logFile: path.join(__dirname, 'service.log'),
  restartDelay: 30000, // 30 seconds
  maxRestarts: 10,
  restartWindow: 60000 // 1 minute
};

let restartCount = 0;
let lastRestartTime = 0;
let isShuttingDown = false;

// Enhanced logging
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  
  console.log(logMessage);
  
  try {
    fs.appendFileSync(SERVICE_CONFIG.logFile, logMessage + '\n');
  } catch (error) {
    console.error('Failed to write to service log:', error.message);
  }
}

// Start the automation process
function startAutomationProcess() {
  if (isShuttingDown) {
    log('Service is shutting down, not starting new process', 'WARN');
    return null;
  }
  
  log(`Starting automation process: ${SERVICE_CONFIG.scriptPath}`, 'INFO');
  
  const child = spawn('node', [SERVICE_CONFIG.scriptPath], {
    stdio: ['pipe', 'pipe', 'pipe'],
    detached: false,
    shell: true,
    cwd: path.resolve(__dirname, '..')
  });
  
  let stdout = '';
  let stderr = '';
  
  child.stdout.on('data', (data) => {
    const output = data.toString();
    stdout += output;
    log(`STDOUT: ${output.trim()}`, 'DEBUG');
  });
  
  child.stderr.on('data', (data) => {
    const output = data.toString();
    stderr += output;
    log(`STDERR: ${output.trim()}`, 'ERROR');
  });
  
  child.on('close', (code) => {
    log(`Automation process exited with code: ${code}`, code === 0 ? 'INFO' : 'ERROR');
    
    if (code !== 0 && !isShuttingDown) {
      handleProcessFailure(code, stderr);
    }
  });
  
  child.on('error', (error) => {
    log(`Automation process error: ${error.message}`, 'ERROR');
    
    if (!isShuttingDown) {
      handleProcessFailure(-1, error.message);
    }
  });
  
  return child;
}

// Handle process failure with restart logic
function handleProcessFailure(exitCode, error) {
  const now = Date.now();
  const timeSinceLastRestart = now - lastRestartTime;
  
  // Reset restart count if enough time has passed
  if (timeSinceLastRestart > SERVICE_CONFIG.restartWindow) {
    restartCount = 0;
  }
  
  restartCount++;
  lastRestartTime = now;
  
  log(`Process failure detected. Exit code: ${exitCode}, Error: ${error}`, 'ERROR');
  log(`Restart attempt ${restartCount}/${SERVICE_CONFIG.maxRestarts}`, 'INFO');
  
  if (restartCount <= SERVICE_CONFIG.maxRestarts && !isShuttingDown) {
    log(`Restarting automation in ${SERVICE_CONFIG.restartDelay / 1000} seconds...`, 'INFO');
    
    setTimeout(() => {
      if (!isShuttingDown) {
        startAutomationProcess();
      }
    }, SERVICE_CONFIG.restartDelay);
  } else if (restartCount > SERVICE_CONFIG.maxRestarts) {
    log(`Maximum restart attempts (${SERVICE_CONFIG.maxRestarts}) reached. Stopping service.`, 'ERROR');
    process.exit(1);
  }
}

// Graceful shutdown
function gracefulShutdown() {
  log('Shutdown signal received, stopping service gracefully...', 'INFO');
  isShuttingDown = true;
  
  // Give some time for cleanup
  setTimeout(() => {
    log('Service shutdown complete', 'INFO');
    process.exit(0);
  }, 5000);
}

// Health check
function healthCheck() {
  log('Service health check: Running normally', 'INFO');
}

// Main service function
function startService() {
  log('Starting Fincal Automation Service...', 'INFO');
  log(`Service configuration:`, 'INFO');
  log(`  Name: ${SERVICE_CONFIG.name}`, 'INFO');
  log(`  Script: ${SERVICE_CONFIG.scriptPath}`, 'INFO');
  log(`  Log file: ${SERVICE_CONFIG.logFile}`, 'INFO');
  log(`  Max restarts: ${SERVICE_CONFIG.maxRestarts}`, 'INFO');
  
  // Set up process handlers
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  process.on('uncaughtException', (error) => {
    log(`Uncaught exception: ${error.message}`, 'ERROR');
    log(`Stack: ${error.stack}`, 'ERROR');
  });
  process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled rejection at: ${promise}, reason: ${reason}`, 'ERROR');
  });
  
  // Start the automation process
  startAutomationProcess();
  
  // Periodic health check
  setInterval(healthCheck, 300000); // Every 5 minutes
  
  log('Service started successfully', 'INFO');
}

// Export for testing
module.exports = {
  startService,
  startAutomationProcess,
  handleProcessFailure,
  gracefulShutdown,
  SERVICE_CONFIG
};

// Start service if run directly
if (require.main === module) {
  startService();
}
