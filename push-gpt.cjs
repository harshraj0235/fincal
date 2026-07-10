const { execSync } = require('child_process');

try {
  console.log('Adding files...');
  execSync('git add src/lib/llmEngine.ts src/pages/Home.tsx', { stdio: 'inherit' });
  
  console.log('Committing changes...');
  execSync('git commit -m "feat: integrate Gemini 2.0 Flash AI with streaming chat UI for Finance GPT"', { stdio: 'inherit' });
  
  console.log('Pushing to main...');
  execSync('git push -f origin main', { stdio: 'inherit' });
  
  console.log('Successfully pushed code.');
} catch (error) {
  console.error('Failed to push code:', error.message);
}
