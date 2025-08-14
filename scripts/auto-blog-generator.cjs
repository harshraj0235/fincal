#!/usr/bin/env node

const { AutoBlogScheduler } = require('../src/utils/autoBlogScheduler.ts');
const path = require('path');
const fs = require('fs');

// Ensure we're in the right directory
process.chdir(path.join(__dirname, '..'));

console.log('🚀 Starting Auto Blog Generator System');
console.log('📁 Working directory:', process.cwd());

// Check if required directories exist
const blogsDir = path.join(process.cwd(), 'src', 'data', 'blogs');
if (!fs.existsSync(blogsDir)) {
  console.error('❌ Blogs directory not found:', blogsDir);
  process.exit(1);
}

// Initialize and start the scheduler
async function main() {
  try {
    const scheduler = new AutoBlogScheduler();
    
    // Check command line arguments
    const args = process.argv.slice(2);
    
    if (args.includes('--manual') || args.includes('-m')) {
      console.log('🔧 Running manual blog generation...');
      await scheduler.triggerManualGeneration();
    } else if (args.includes('--status') || args.includes('-s')) {
      console.log('📊 Checking scheduler status...');
      const status = scheduler.getStatus();
      console.log('Status:', status);
    } else if (args.includes('--start') || args.includes('--daemon')) {
      console.log('🔄 Starting scheduler in daemon mode...');
      await scheduler.startScheduler();
      
      // Keep the process running
      process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down scheduler...');
        process.exit(0);
      });
      
      process.on('SIGTERM', () => {
        console.log('\n🛑 Shutting down scheduler...');
        process.exit(0);
      });
    } else {
      console.log('📋 Usage:');
      console.log('  node scripts/auto-blog-generator.cjs --manual    # Run manual generation');
      console.log('  node scripts/auto-blog-generator.cjs --status    # Check status');
      console.log('  node scripts/auto-blog-generator.cjs --daemon    # Start scheduler');
      console.log('');
      console.log('🔧 Running manual generation by default...');
      await scheduler.triggerManualGeneration();
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the application
main();
