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
        }
    } catch (e) {
        console.error(`Error reading ${appTsxPath}: ${e}`);
    }
    return routes;
}

function parseNetlifyToml(tomlPath) {
    const redirects = [];
    let currentRedirect = null;
    try {
        const lines = fs.readFileSync(tomlPath, 'utf8').split('\n');
        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('[[redirects]]')) {
                if (currentRedirect) redirects.push(currentRedirect);
                currentRedirect = {};
            } else if (line.includes('=') && currentRedirect) {
                const [key, ...valParts] = line.split('=');
                const val = valParts.join('=').trim().replace(/"/g, '');
                currentRedirect[key.trim()] = val;
            }
        }
        if (currentRedirect) redirects.push(currentRedirect);
    } catch (e) {
        console.error(`Error reading ${tomlPath}: ${e}`);
    }
    return redirects;
}

const appPath = path.resolve('src/App.tsx');
const tomlPath = path.resolve('netlify.toml');

const routes = extractRoutes(appPath);
const redirects = parseNetlifyToml(tomlPath);

const conflicts = [];
const redundant = [];

for (const r of redirects) {
    const fromPath = r.from || '';
    const toPath = r.to || '';
    const force = (r.force || 'false').toLowerCase() === 'true';
    const cleanFrom = fromPath.replace(/\/$/, '');

    if (routes.has(cleanFrom) || routes.has(fromPath)) {
        if (force && fromPath !== toPath) {
            conflicts.push(`FORCE REDIRECT on valid route: ${fromPath} -> ${toPath}`);
        } else if (fromPath !== toPath) {
            redundant.push(`SOFT REDIRECT on valid route: ${fromPath} -> ${toPath}`);
        }
    }

    if (fromPath === toPath && r.status !== '200') {
        redundant.push(`SELF REDIRECT: ${fromPath}`);
    }
}

console.log(`Total Routes found in App.tsx: ${routes.size}`);
console.log(`Total Redirects found in netlify.toml: ${redirects.length}`);

console.log("\n--- CONFLICTS (Force redirects on existing routes) ---");
conflicts.slice(0, 50).forEach(c => console.log(c));
if (conflicts.length > 50) console.log(`... and ${conflicts.length - 50} more`);

console.log("\n--- REDUNDANT/SOFT REDIRECTS ---");
redundant.slice(0, 50).forEach(r => console.log(r));
if (redundant.length > 50) console.log(`... and ${redundant.length - 50} more`);
