const fs = require('fs');
let c = fs.readFileSync('src/data/discover/samit-dravid-batting-highlights-future-star.ts', 'utf8');
c = c.replace(/\\\\'/g, "\\'");
fs.writeFileSync('src/data/discover/samit-dravid-batting-highlights-future-star.ts', c, 'utf8');
