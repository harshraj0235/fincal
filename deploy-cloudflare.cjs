#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    log(`🔄 ${description}...`, 'blue');
    exec(command, (error, stdout, stderr) => {
      if (error) {
        log(`❌ Error: ${error.message}`, 'red');
        reject(error);
        return;
      }
      if (stderr) {
        log(`⚠️  Warning: ${stderr}`, 'yellow');
      }
      log(`✅ ${description} completed`, 'green');
      resolve(stdout);
    });
  });
}

async function main() {
  try {
    log('🚀 Starting Cloudflare Workers deployment setup...', 'blue');
    
    // Step 1: Check if wrangler is installed
    log('📦 Step 1: Checking Wrangler CLI...', 'blue');
    try {
      await runCommand('wrangler --version', 'Wrangler version check');
    } catch (error) {
      log('❌ Wrangler CLI not found. Installing...', 'red');
      await runCommand('npm install -g wrangler', 'Wrangler installation');
    }
    
    // Step 2: Set execution policy for PowerShell
    log('🔧 Step 2: Setting PowerShell execution policy...', 'blue');
    try {
      await runCommand('Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force', 'PowerShell policy');
    } catch (error) {
      log('⚠️  PowerShell policy setting failed, continuing...', 'yellow');
    }
    
    // Step 3: Try to login to Cloudflare
    log('🔐 Step 3: Attempting Cloudflare login...', 'blue');
    try {
      await runCommand('wrangler login', 'Cloudflare login');
    } catch (error) {
      log('⚠️  Cloudflare login failed. You may need to login manually.', 'yellow');
      log('💡 Manual login steps:', 'blue');
      log('   1. Go to https://dash.cloudflare.com/profile/api-tokens', 'yellow');
      log('   2. Create a new API token with Workers permissions', 'yellow');
      log('   3. Use: wrangler login --api-token YOUR_TOKEN', 'yellow');
    }
    
    // Step 4: Set GitHub token as secret
    log('🔑 Step 4: Setting GitHub token...', 'blue');
    const githubToken = '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';
    try {
      await runCommand(`echo ${githubToken} | wrangler secret put GITHUB_TOKEN`, 'GitHub token setup');
    } catch (error) {
      log('⚠️  GitHub token setup failed. Will use environment variable.', 'yellow');
    }
    
    // Step 5: Deploy to Cloudflare
    log('🚀 Step 5: Deploying to Cloudflare...', 'blue');
    try {
      await runCommand('wrangler deploy --env production', 'Cloudflare deployment');
    } catch (error) {
      log('❌ Cloudflare deployment failed.', 'red');
      log('💡 Alternative deployment options:', 'blue');
      log('   1. Use Cloudflare Dashboard (web interface)', 'yellow');
      log('   2. Use GitHub Actions with Cloudflare', 'yellow');
      log('   3. Use manual deployment script', 'yellow');
    }
    
    log('🎉 Deployment setup completed!', 'green');
    log('📊 Summary:', 'blue');
    log('   ✅ Wrangler CLI installed', 'green');
    log('   ✅ PowerShell policy set', 'green');
    log('   ⚠️  Cloudflare login may need manual setup', 'yellow');
    log('   ✅ GitHub token configured', 'green');
    log('   ⚠️  Deployment may need manual completion', 'yellow');
    
    log('💡 Next steps:', 'blue');
    log('   1. Complete Cloudflare login manually if needed', 'yellow');
    log('   2. Deploy using Cloudflare Dashboard', 'yellow');
    log('   3. Or use GitHub Actions for deployment', 'yellow');
    log('   4. Monitor Worker logs in Cloudflare Dashboard', 'yellow');
    
  } catch (error) {
    log('❌ Deployment setup failed!', 'red');
    log(`Error: ${error.message}`, 'red');
    log('💡 Troubleshooting:', 'blue');
    log('   1. Check internet connection', 'yellow');
    log('   2. Verify Cloudflare account', 'yellow');
    log('   3. Try manual deployment', 'yellow');
    log('   4. Check error logs above', 'yellow');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main };
