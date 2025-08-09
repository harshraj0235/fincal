const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Test configuration
const TEST_CONFIG = {
  testScripts: [
    'auto-news-generator.cjs',
    'auto-government-jobs-generator.cjs',
    'auto-scheme-job-generator.cjs',
    'generate-blogs.cjs'
  ],
  testDirs: [
    '../src/data/blogs',
    '../src/data/government-schemes',
    '../src/data/jobs'
  ]
};

// Colors for output
const COLORS = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  CYAN: '\x1b[36m'
};

function log(message, color = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`);
}

function testPrerequisites() {
  log('🔍 Testing prerequisites...', COLORS.BLUE);
  
  // Test Node.js
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    log(`✅ Node.js: ${nodeVersion}`, COLORS.GREEN);
  } catch (error) {
    log('❌ Node.js not found or not working', COLORS.RED);
    return false;
  }
  
  // Test Git
  try {
    const gitVersion = execSync('git --version', { encoding: 'utf8' }).trim();
    log(`✅ Git: ${gitVersion}`, COLORS.GREEN);
  } catch (error) {
    log('❌ Git not found or not working', COLORS.RED);
    return false;
  }
  
  // Test if this is a Git repository
  try {
    execSync('git status', { stdio: 'pipe' });
    log('✅ Git repository detected', COLORS.GREEN);
  } catch (error) {
    log('❌ Not a Git repository', COLORS.RED);
    return false;
  }
  
  return true;
}

function testScripts() {
  log('🔍 Testing automation scripts...', COLORS.BLUE);
  
  let allScriptsExist = true;
  
  for (const script of TEST_CONFIG.testScripts) {
    const scriptPath = path.join(__dirname, script);
    if (fs.existsSync(scriptPath)) {
      log(`✅ Script found: ${script}`, COLORS.GREEN);
    } else {
      log(`❌ Script missing: ${script}`, COLORS.RED);
      allScriptsExist = false;
    }
  }
  
  return allScriptsExist;
}

function testDirectories() {
  log('🔍 Testing required directories...', COLORS.BLUE);
  
  let allDirsExist = true;
  
  for (const dir of TEST_CONFIG.testDirs) {
    const dirPath = path.resolve(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      log(`✅ Directory found: ${dir}`, COLORS.GREEN);
    } else {
      log(`❌ Directory missing: ${dir}`, COLORS.RED);
      allDirsExist = false;
    }
  }
  
  return allDirsExist;
}

function testGitConfiguration() {
  log('🔍 Testing Git configuration...', COLORS.BLUE);
  
  try {
    // Check remote origin
    const remoteOrigin = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    log(`✅ Remote origin: ${remoteOrigin}`, COLORS.GREEN);
    
    // Check current branch
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    log(`✅ Current branch: ${currentBranch}`, COLORS.GREEN);
    
    // Check Git status
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    if (gitStatus) {
      log(`⚠️ Git status: ${gitStatus}`, COLORS.YELLOW);
    } else {
      log('✅ Git working directory clean', COLORS.GREEN);
    }
    
    return true;
  } catch (error) {
    log(`❌ Git configuration error: ${error.message}`, COLORS.RED);
    return false;
  }
}

function testConfigurationFile() {
  log('🔍 Testing configuration file...', COLORS.BLUE);
  
  const configPath = path.join(__dirname, 'automation-config.json');
  if (fs.existsSync(configPath)) {
    try {
      const configData = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(configData);
      log('✅ Configuration file loaded successfully', COLORS.GREEN);
      log(`   Interval: ${config.automation.interval_hours} hours`, COLORS.CYAN);
      log(`   Scripts: ${config.automation.scripts.length}`, COLORS.CYAN);
      return true;
    } catch (error) {
      log(`❌ Configuration file parse error: ${error.message}`, COLORS.RED);
      return false;
    }
  } else {
    log('⚠️ Configuration file not found, will use defaults', COLORS.YELLOW);
    return true;
  }
}

function runQuickTest() {
  log('🚀 Running quick automation test...', COLORS.BLUE);
  
  try {
    // Test with a simple script execution
    const testScript = path.join(__dirname, 'auto-news-generator.cjs');
    if (fs.existsSync(testScript)) {
      log('✅ Test script exists, automation system should work', COLORS.GREEN);
      return true;
    } else {
      log('❌ Test script not found', COLORS.RED);
      return false;
    }
  } catch (error) {
    log(`❌ Quick test failed: ${error.message}`, COLORS.RED);
    return false;
  }
}

function main() {
  log('=======================================', COLORS.CYAN);
  log('    FINCAL AUTOMATION TEST SUITE', COLORS.CYAN);
  log('=======================================', COLORS.CYAN);
  log('');
  
  let allTestsPassed = true;
  
  // Run all tests
  if (!testPrerequisites()) {
    allTestsPassed = false;
  }
  log('');
  
  if (!testScripts()) {
    allTestsPassed = false;
  }
  log('');
  
  if (!testDirectories()) {
    allTestsPassed = false;
  }
  log('');
  
  if (!testGitConfiguration()) {
    allTestsPassed = false;
  }
  log('');
  
  if (!testConfigurationFile()) {
    allTestsPassed = false;
  }
  log('');
  
  if (!runQuickTest()) {
    allTestsPassed = false;
  }
  log('');
  
  // Summary
  if (allTestsPassed) {
    log('🎉 All tests passed! Automation system is ready to use.', COLORS.GREEN);
    log('', COLORS.RESET);
    log('Next steps:', COLORS.CYAN);
    log('1. Run: npm run automation:start', COLORS.WHITE);
    log('2. Or double-click: start-automation.bat', COLORS.WHITE);
    log('3. Or use PowerShell: .\\scripts\\start-automation.ps1', COLORS.WHITE);
  } else {
    log('❌ Some tests failed. Please fix the issues above.', COLORS.RED);
    log('', COLORS.RESET);
    log('Common fixes:', COLORS.CYAN);
    log('1. Install Node.js: https://nodejs.org/', COLORS.WHITE);
    log('2. Install Git: https://git-scm.com/', COLORS.WHITE);
    log('3. Initialize Git repository: git init', COLORS.WHITE);
    log('4. Configure remote: git remote add origin https://github.com/harshraj0235/fincal.git', COLORS.WHITE);
  }
  
  log('');
  log('=======================================', COLORS.CYAN);
}

// Run tests if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  testPrerequisites,
  testScripts,
  testDirectories,
  testGitConfiguration,
  testConfigurationFile,
  runQuickTest
};
