const fs = require('fs');
const path = require('path');

// Get all blog files that need fixing
const blogFiles = [
  651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667,
  678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695,
  696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730
];

blogFiles.forEach(id => {
  const filePath = path.join(__dirname, 'src', 'data', 'blogs', `${id}.ts`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file already has the correct export format
    if (content.includes(`export const blog${id}: BlogPost = {`)) {
      console.log(`✅ ${id}.ts already has correct export`);
      return;
    }
    
    // Fix the export - replace const with export const and add BlogPost type
    content = content.replace(
      /const blog(\d+) = {/,
      'export const blog$1: BlogPost = {'
    );
    
    // Add import if it doesn't exist
    if (!content.includes("import { BlogPost } from './types';")) {
      content = content.replace(
        /^/,
        "import { BlogPost } from './types';\n\n"
      );
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${id}.ts`);
  } else {
    console.log(`❌ File not found: ${id}.ts`);
  }
});

console.log('🎉 All blog export issues fixed!');
