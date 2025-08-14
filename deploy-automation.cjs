const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration for cloud deployment
const DEPLOYMENT_CONFIG = {
  // GitHub repository details
  repoUrl: 'https://github.com/harshraj0235/fincal.git',
  branch: 'main',
  
  // Deployment platforms
  platforms: {
    vercel: {
      command: 'vercel --prod',
      configFile: 'vercel.json'
    },
    netlify: {
      command: 'netlify deploy --prod',
      configFile: 'netlify.toml'
    }
  },
  
  // Automation settings
  automation: {
    schedule: '0 6 * * *', // 6 AM IST daily
    timezone: 'Asia/Kolkata',
    maxRetries: 3,
    retryDelay: 5000 // 5 seconds
  }
};

// Function to setup environment
function setupEnvironment() {
  console.log('Setting up deployment environment...');
  
  // Create necessary directories
  const dirs = ['logs', 'temp', 'backups'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Create log file
  const logFile = path.join('logs', `deployment-${new Date().toISOString().split('T')[0]}.log`);
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, `Deployment Log - ${new Date().toISOString()}\n`);
  }
  
  return logFile;
}

// Function to log messages
function logMessage(message, logFile) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(logFile, logEntry);
}

// Function to execute commands with retry logic
function executeCommand(command, logFile, retries = 0) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        logMessage(`Error executing command: ${command}`, logFile);
        logMessage(`Error: ${error.message}`, logFile);
        
        if (retries < DEPLOYMENT_CONFIG.automation.maxRetries) {
          logMessage(`Retrying... (${retries + 1}/${DEPLOYMENT_CONFIG.automation.maxRetries})`, logFile);
          setTimeout(() => {
            executeCommand(command, logFile, retries + 1)
              .then(resolve)
              .catch(reject);
          }, DEPLOYMENT_CONFIG.automation.retryDelay);
        } else {
          reject(error);
        }
      } else {
        logMessage(`Successfully executed: ${command}`, logFile);
        if (stdout) logMessage(`Output: ${stdout}`, logFile);
        resolve(stdout);
      }
    });
  });
}

// Function to backup current state
function backupCurrentState(logFile) {
  logMessage('Creating backup of current state...', logFile);
  
  const backupDir = path.join('backups', new Date().toISOString().split('T')[0]);
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // Copy important files
  const filesToBackup = [
    'src/data/blogs/index.ts',
    'package.json',
    'package-lock.json'
  ];
  
  filesToBackup.forEach(file => {
    if (fs.existsSync(file)) {
      const backupPath = path.join(backupDir, path.basename(file));
      fs.copyFileSync(file, backupPath);
    }
  });
  
  logMessage('Backup completed successfully', logFile);
}

// Function to run blog generation
async function runBlogGeneration(logFile) {
  try {
    logMessage('Starting blog generation process...', logFile);
    
    // Run the blog generation script
    await executeCommand('node automated-blog-generator.js', logFile);
    
    logMessage('Blog generation completed successfully', logFile);
    return true;
  } catch (error) {
    logMessage(`Blog generation failed: ${error.message}`, logFile);
    return false;
  }
}

// Function to deploy to platforms
async function deployToPlatforms(logFile) {
  const platforms = Object.keys(DEPLOYMENT_CONFIG.platforms);
  
  for (const platform of platforms) {
    try {
      logMessage(`Deploying to ${platform}...`, logFile);
      
      const platformConfig = DEPLOYMENT_CONFIG.platforms[platform];
      await executeCommand(platformConfig.command, logFile);
      
      logMessage(`Successfully deployed to ${platform}`, logFile);
    } catch (error) {
      logMessage(`Failed to deploy to ${platform}: ${error.message}`, logFile);
    }
  }
}

// Function to send notifications
function sendNotifications(success, logFile) {
  logMessage('Sending deployment notifications...', logFile);
  
  // You can integrate with various notification services here
  // Examples: Email, Slack, Discord, Telegram, etc.
  
  const message = success 
    ? '✅ Blog generation and deployment completed successfully!'
    : '❌ Blog generation or deployment failed. Check logs for details.';
  
  logMessage(`Notification: ${message}`, logFile);
  
  // Example: Send to console for now
  console.log('\n' + '='.repeat(50));
  console.log(message);
  console.log('='.repeat(50) + '\n');
}

// Main deployment function
async function runDeployment() {
  const logFile = setupEnvironment();
  
  try {
    logMessage('Starting automated deployment process...', logFile);
    
    // Create backup
    backupCurrentState(logFile);
    
    // Run blog generation
    const blogSuccess = await runBlogGeneration(logFile);
    
    if (blogSuccess) {
      // Deploy to platforms
      await deployToPlatforms(logFile);
      
      // Send success notification
      sendNotifications(true, logFile);
    } else {
      // Send failure notification
      sendNotifications(false, logFile);
    }
    
    logMessage('Deployment process completed', logFile);
    
  } catch (error) {
    logMessage(`Deployment process failed: ${error.message}`, logFile);
    sendNotifications(false, logFile);
  }
}

// Function to setup cron job for cloud platforms
function setupCronJob() {
  const cronJob = `# Automated blog generation and deployment
# Runs daily at 6 AM IST
${DEPLOYMENT_CONFIG.automation.schedule} cd /path/to/project && node deploy-automation.js >> logs/cron.log 2>&1
`;
  
  fs.writeFileSync('crontab.txt', cronJob);
  console.log('Cron job configuration saved to crontab.txt');
  console.log('To install on your server, run: crontab crontab.txt');
}

// Function to create deployment configuration files
function createDeploymentConfigs() {
  // Vercel configuration
  const vercelConfig = {
    version: 2,
    builds: [
      {
        src: 'package.json',
        use: '@vercel/static-build',
        config: {
          distDir: 'dist'
        }
      }
    ],
    routes: [
      {
        src: '/blog/(.*)',
        dest: '/blog/$1'
      },
      {
        src: '/(.*)',
        dest: '/index.html'
      }
    ]
  };
  
  fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
  
  // Netlify configuration
  const netlifyConfig = `
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/blog/*"
  to = "/blog/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
  
  fs.writeFileSync('netlify.toml', netlifyConfig);
  
  console.log('Deployment configuration files created');
}

// Export functions
module.exports = {
  runDeployment,
  setupCronJob,
  createDeploymentConfigs,
  DEPLOYMENT_CONFIG
};

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  
  switch (args[0]) {
    case 'setup':
      createDeploymentConfigs();
      setupCronJob();
      break;
    case 'deploy':
      runDeployment();
      break;
    default:
      console.log('Usage:');
      console.log('  node deploy-automation.js setup  - Create deployment configs');
      console.log('  node deploy-automation.js deploy - Run deployment process');
      break;
  }
}
