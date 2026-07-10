const fs = require('fs');
const path = require('path');

function extractRoutes(appTsxPath) {
    const routes = new Set();
    try {
        const content = fs.readFileSync(appTsxPath, 'utf8');
        const regex = /path=["']([^"']+)["']/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            routes.add(match[1]);
            // Also add version with trailing slash
            if (match[1] !== '/') {
                routes.add(match[1] + '/');
            }
        }
    } catch (e) {
        console.error(`Error reading ${appTsxPath}: ${e}`);
    }
    return routes;
}

function cleanupNetlifyToml(tomlPath, routes) {
    try {
        const content = fs.readFileSync(tomlPath, 'utf8');
        const blocks = content.split('[[redirects]]');
        const header = blocks[0];
        const newBlocks = [header];
        
        let removedCount = 0;
        let keptCount = 0;

        for (let i = 1; i < blocks.length; i++) {
            const block = blocks[i];
            const fromMatch = block.match(/from\s*=\s*["']([^"']+)["']/);
            const toMatch = block.match(/to\s*=\s*["']([^"']+)["']/);
            const forceMatch = block.match(/force\s*=\s*(true|false)/);
            
            if (fromMatch) {
                const fromPath = fromMatch[1];
                const toPath = toMatch ? toMatch[1] : '';
                const isForce = forceMatch ? forceMatch[1] === 'true' : false;

                // Check if this fromPath is a valid route
                // Exceptions: status=200 rules (proxies) or specific known aliases we want to keep?
                // For now, if it's a valid route and it's being redirected AWAY (from != to), we remove it.
                if (routes.has(fromPath) && fromPath !== toPath) {
                   console.log(`Removing conflicting redirect: ${fromPath} -> ${toPath}`);
                   removedCount++;
                   continue; // Skip this block
                }
            }
            newBlocks.push(`[[redirects]]${block}`);
            keptCount++;
        }

        const newContent = newBlocks.join('');
        fs.writeFileSync(tomlPath, newContent, 'utf8');
        console.log(`\nCleanup complete! Removed ${removedCount} redirects. Kept ${keptCount} redirects.`);
    } catch (e) {
        console.error(`Error processing ${tomlPath}: ${e}`);
    }
}

const appPath = path.resolve('src/App.tsx');
const tomlPath = path.resolve('netlify.toml');

const routes = extractRoutes(appPath);
cleanupNetlifyToml(tomlPath, routes);
