const fs = require('fs');
const path = require('path');

// List of problematic files
const problematicFiles = [181, 182, 183, 184, 185, 186];

problematicFiles.forEach(id => {
  const filePath = path.join(__dirname, 'src', 'data', 'blogs', `${id}.ts`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the excerpt field - replace the unterminated string with a proper one
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const title = titleMatch ? titleMatch[1] : `Blog ${id}`;
    
    // Create a proper excerpt based on the title
    const excerpt = `${title} - पूरी जानकारी और आवेदन प्रक्रिया। सरकारी योजना के बारे में विस्तृत जानकारी प्राप्त करें।`;
    
    // Replace the problematic excerpt
    content = content.replace(
      /excerpt:\s*'[\s\S]*?',/,
      `excerpt: '${excerpt}',`
    );
    
    // Also fix the SEO description if it has the same issue
    content = content.replace(
      /description:\s*'[\s\S]*?',/,
      `description: '${excerpt}',`
    );
    
    // Fix ogDescription if it has the same issue
    content = content.replace(
      /ogDescription:\s*'[\s\S]*?',/,
      `ogDescription: '${excerpt}',`
    );
    
    // Fix twitterDescription if it has the same issue
    content = content.replace(
      /twitterDescription:\s*'[\s\S]*?',/,
      `twitterDescription: '${excerpt}',`
    );
    
    // Fix schema description if it has the same issue
    content = content.replace(
      /"description":\s*"[\s\S]*?",/,
      `"description": "${excerpt}",`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${id}.ts`);
  } else {
    console.log(`❌ File not found: ${id}.ts`);
  }
});

console.log('🎉 All blog syntax errors fixed!');
