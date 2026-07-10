const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function replaceLinksInFile(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // We want to replace <Link to="<static_path>"> with <a href="<static_path>">
    // and </Link> with </a> if the opening tag was replaced.
    // Since doing this safely with regex is tricky for nested components,
    // we can just replace all <Link to="/blog..." with <a href="/blog..."
    // AND we must change the matching </Link> to </a>.
    // Instead of raw regex, we can just use the reloadDocument attribute if they use React Router v6
    // Or we can just use <a href="..."></a>
    
    // Actually, simply adding `reloadDocument` to the Link tag achieves the exact same thing (hard reload)!
    // Example: <Link to="/blog" reloadDocument>
    
    // Let's check what version of react-router-dom is used.
    // Assuming it's v6, `reloadDocument` works perfectly.
    // Let's add reloadDocument to all Links matching the static paths.
    
    const staticPaths = ['/blog', '/news', '/ipo', '/discover', '/government-schemes'];
    let modified = false;

    staticPaths.forEach(p => {
        // Match <Link ... to="/blog..." ... >
        // We use a regex that finds <Link ... to=... > and injects reloadDocument if not present
        const linkRegex = new RegExp(`(<Link[^>]*to={?['"\`]${p}(?:[/a-zA-Z0-9_-]*)['"\`]}?)([^>]*)>`, 'g');
        content = content.replace(linkRegex, (match, p1, p2) => {
            if (p2.includes('reloadDocument')) return match;
            modified = true;
            return `${p1} reloadDocument${p2}>`;
        });
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated: ${filePath}`);
    }
}

walkDir(path.join(__dirname, '../src'), replaceLinksInFile);
console.log('Done.');
