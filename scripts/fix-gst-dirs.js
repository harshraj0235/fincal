const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/app/gst-tools');

const files = fs.readdirSync(dir);
for (const file of files) {
  if (fs.statSync(path.join(dir, file)).isDirectory()) {
    let newName = file;
    // Replace typical kebab-case mangling
    newName = newName.replace(/^g-s-t-/, 'gst-')
                     .replace(/-page$/, '')
                     .replace(/-r-3b-/, '-r3b-')
                     .replace(/-h-s-n-s-a-c-/, '-hsn-sac-')
                     .replace(/^h-s-n-s-a-c-/, 'hsn-sac-')
                     .replace(/^r-c-m-/, 'rcm-')
                     .replace(/^i-t-c-/, 'itc-')
                     .replace(/-q-r-/, '-qr-')
                     .replace(/-e-way-/, '-eway-')
                     .replace(/-i-t-c-/, '-itc-')
                     .replace(/-r-c-m-/, '-rcm-')
                     .replace(/reverse-g-s-t-/, 'reverse-gst-');

    if (newName !== file) {
      const oldPath = path.join(dir, file);
      const newPath = path.join(dir, newName);
      
      if (fs.existsSync(newPath)) {
        console.log(`Duplicate found! Removing old ${file} because ${newName} exists.`);
        fs.rmSync(oldPath, { recursive: true, force: true });
      } else {
        console.log(`Renaming ${file} -> ${newName}`);
        fs.renameSync(oldPath, newPath);
      }
    }
  }
}
console.log('Cleanup done!');
