const fs = require('fs');
const path = require('path');

const OLD_SRC = 'D:\\New folder (21)\\src';
const NEW_SRC = 'D:\\New folder (21)\\moneycal-next\\src';

const missingFiles = [
  'lib/llmEngine.ts',
  'lib/schemes/scoring.ts',
  'services/ipoApi.ts',
  'services/stockApi.ts',
  'styles/financeGPT.css',
  'pages/BlogPost.tsx',
  'pages/CryptoArticlePost.tsx',
  'pages/DebtPayoffCalculator.tsx',
  'pages/DiscoverArticlePage.tsx',
  'pages/EMICalculator.tsx',
  'pages/FinancialGoalPlanner.tsx',
  'pages/InvestmentPortfolioTracker.tsx',
  'pages/InvoiceGeneratorBusiness.tsx',
  'pages/MonthlyBudgetPlanner.tsx',
  'pages/MonthlyBudgetTracker.tsx',
  'pages/NetWorthCalculator.tsx',
  'pages/ProgrammaticEmiDispatcher.tsx',
  'pages/ProgrammaticIncomeTaxDispatcher.tsx',
  'pages/ProgrammaticSipDispatcher.tsx',
  'pages/SEOBlogPost.tsx',
  'pages/SimpleDailyExpenseTracker.tsx',
  'pages/VacationBudgetPlanner.tsx'
];

let copied = 0;

for (const file of missingFiles) {
  const oldPath = path.join(OLD_SRC, file);
  // Determine new path based on type
  let newPath = path.join(NEW_SRC, file);
  
  if (file.startsWith('pages/')) {
    // Some are calculators/excel, some are dispatchers
    const basename = path.basename(file);
    if (['SimpleDailyExpenseTracker.tsx', 'MonthlyBudgetPlanner.tsx', 'InvoiceGeneratorBusiness.tsx', 'MonthlyBudgetTracker.tsx', 'DebtPayoffCalculator.tsx', 'InvestmentPortfolioTracker.tsx', 'NetWorthCalculator.tsx', 'VacationBudgetPlanner.tsx'].includes(basename)) {
      newPath = path.join(NEW_SRC, 'calculators', 'excel', basename);
    } else if (basename.startsWith('Programmatic')) {
      // Create directories for programmatic dispatchers
      let dir = '';
      if (basename === 'ProgrammaticEmiDispatcher.tsx') dir = 'programmatic-emi-dispatcher';
      else if (basename === 'ProgrammaticSipDispatcher.tsx') dir = 'programmatic-sip-dispatcher';
      else if (basename === 'ProgrammaticIncomeTaxDispatcher.tsx') dir = 'programmatic-income-tax-dispatcher';
      newPath = path.join(NEW_SRC, 'app', 'calculators', dir, basename.replace('.tsx', 'Client.tsx')); // Rename to Client since they are used in app router
    } else if (basename === 'EMICalculator.tsx' || basename === 'FinancialGoalPlanner.tsx') {
        newPath = path.join(NEW_SRC, 'calculators', basename);
    } else {
      // Articles -> These were migrated to src/app/[name]/[name]Client.tsx
      console.log(`Skipping manual article fix for ${basename}, will fix import path instead.`);
      continue;
    }
  }

  if (fs.existsSync(oldPath)) {
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
    fs.copyFileSync(oldPath, newPath);
    console.log(`Copied ${file} -> ${newPath.replace(NEW_SRC, '')}`);
    copied++;
  } else {
    console.log(`NOT FOUND in old src: ${file}`);
  }
}

console.log(`\nCopied ${copied} files.`);
