const fs = require('fs');
const files = [
  'aamir-khan-third-marriage-convoy-secret-guests.ts',
  'who-is-gauri-spratt-aamir-khan-third-wife.ts',
  'aamir-khan-gauri-spratt-age-gap-friendship.ts',
  'kiran-rao-reena-dutta-reaction-aamir-third-marriage.ts',
  'junaid-ira-khan-reaction-aamir-third-marriage.ts',
  'gauri-spratt-net-worth-business-empire.ts',
  'gauri-spratt-does-not-like-aamir-khan-movies.ts'
];
files.forEach(f => {
  const p = 'src/data/discover/' + f;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/date:\s*'[^']+'/, "date: '2026-07-05T21:00:00+05:30'");
  fs.writeFileSync(p, c);
});
console.log('Updated dates');
