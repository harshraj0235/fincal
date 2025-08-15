// api/generate-blogs.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  try {
    console.log('🚀 Starting automated blog generation...');
    
    // Import your blog generation logic
    const { main } = require('../../manual-blog-generator.cjs');
    
    // Run blog generation
    await main();
    
    console.log('✅ Blog generation completed successfully');
    
    res.status(200).json({ 
      success: true, 
      message: 'Blogs generated successfully',
      timestamp: new Date().toISOString(),
      blogsGenerated: 5
    });
  } catch (error) {
    console.error('❌ Error during blog generation:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
