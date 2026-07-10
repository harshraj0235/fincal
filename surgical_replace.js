
const fs = require('fs');
const path = require('path');

function surgicalReplace(filePath, startLine, endLine, newContentFile) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    const newContent = fs.readFileSync(newContentFile, 'utf-8');

    // startLine and endLine are 1-indexed
    const before = lines.slice(0, startLine - 1);
    const after = lines.slice(endLine);

    const result = before.join('\n') + '\n' + newContent + '\n' + after.join('\n');

    fs.writeFileSync(filePath, result, 'utf-8');
    console.log('Replacement complete.');
}

const args = process.argv.slice(2);
if (args.length !== 4) {
    console.log('Usage: node surgical_replace.js <file_path> <start_line> <end_line> <new_content_file>');
    process.exit(1);
}

surgicalReplace(args[0], parseInt(args[1]), parseInt(args[2]), args[3]);
