const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'pages');
const re = /export\s+default\b/;
const out = [];
function walk(d) {
  const entries = fs.readdirSync(d, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(d, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith('.tsx')) {
      const content = fs.readFileSync(full, 'utf8');
      if (!re.test(content)) out.push(path.relative(path.join(__dirname, '..'), full));
    }
  }
}
walk(dir);
fs.writeFileSync(path.join(__dirname, 'pages-without-default.txt'), out.join('\n'), 'utf8');
console.log(out.length);
out.forEach(f => console.log(f));
