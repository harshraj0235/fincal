#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

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
    log('🚀 Starting deployment process...', 'blue');
    
    // Step 1: Generate blog posts
    log('📝 Step 1: Generating blog posts...', 'blue');
    await runCommand('npm run generate-manual', 'Blog generation');
    
    // Step 2: Install dependencies
    log('📦 Step 2: Installing dependencies...', 'blue');
    await runCommand('npm install', 'Dependency installation');
    
    // Step 3: Build project
    log('🏗️ Step 3: Building project...', 'blue');
    await runCommand('npm run build', 'Project build');
    
    // Step 4: Check build output
    log('🔍 Step 4: Verifying build output...', 'blue');
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      log(`✅ Build successful! Found ${files.length} files in dist/`, 'green');
    } else {
      throw new Error('Build failed - dist directory not found');
    }
    
    // Step 5: Git operations
    log('📝 Step 5: Committing changes...', 'blue');
    await runCommand('git add .', 'Git add');
    await runCommand('git commit -m "🤖 Auto-deploy: Generated blog posts and built project"', 'Git commit');
    
    // Step 6: Push to GitHub
    log('📤 Step 6: Pushing to GitHub...', 'blue');
    await runCommand('git push origin main', 'Git push');
    
    log('🎉 Deployment completed successfully!', 'green');
    log('📊 Summary:', 'blue');
    log('   ✅ Blog posts generated', 'green');
    log('   ✅ Dependencies installed', 'green');
    log('   ✅ Project built successfully', 'green');
    log('   ✅ Changes committed and pushed', 'green');
    log('   🌐 Your website will be updated automatically', 'green');
    
    log('💡 Next steps:', 'blue');
    log('   1. Check your website: https://moneycal.in', 'yellow');
    log('   2. Verify new blog posts appear', 'yellow');
    log('   3. Monitor for any deployment issues', 'yellow');
    
  } catch (error) {
    log('❌ Deployment failed!', 'red');
    log(`Error: ${error.message}`, 'red');
    log('💡 Troubleshooting:', 'blue');
    log('   1. Check if all dependencies are installed', 'yellow');
    log('   2. Verify git configuration', 'yellow');
    log('   3. Check network connection', 'yellow');
    log('   4. Review error messages above', 'yellow');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main };
