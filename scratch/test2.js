const line = `    title: 'Samit Dravid Batting: Rahul Dravid son Samit Dravid batting, next 'Wall'?',`;
console.log("Line:", line);
const propMatch = line.match(/^(\s*[a-zA-Z0-9_]+:\s*')(.+)(',\s*)$/);
console.log("Match:", propMatch);
