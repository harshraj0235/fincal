
const fs = require('fs');

function repair() {
    const filePath = 'src/data/blogData.ts';
    const startLine = 3183; // Line where post 19 starts
    const endLine = 3418;   // Line where post 19 ends
    const newContentFile = 'new_post_19_content_hindi.txt';

    try {
        console.log('Reading main file...');
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        console.log('Total lines read:', lines.length);

        console.log('Reading new content...');
        const newContent = fs.readFileSync(newContentFile, 'utf-8');

        console.log('Performing slice and join...');
        const before = lines.slice(0, startLine - 1);
        const after = lines.slice(endLine);

        // Join with \n to preserve formatting
        const finalContent = before.join('\n') + '\n' + newContent + '\n' + after.join('\n');

        console.log('Writing back to file...');
        fs.writeFileSync(filePath, finalContent, 'utf-8');
        console.log('REPAIR SUCCESSFUL');
    } catch (err) {
        console.error('ERROR DURING REPAIR:', err);
        process.exit(1);
    }
}

repair();
