const text = `    title: 'Samit Dravid Batting: Rahul Dravid son Samit Dravid batting, next 'Wall'?',`;
console.log(text.replace(/(?<!:\s*)'(?!,)/g, '\\\''));
