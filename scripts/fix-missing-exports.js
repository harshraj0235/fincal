const fs = require('fs');
const path = require('path');

const files = [
  'CtcCalculator.tsx',
  'DaArrearsCalculator.tsx',
  'EighthPayCommissionCalculator.tsx',
  'LoanCalculator.tsx',
  'PostOfficeCalculator.tsx',
  'RdCalculator.tsx',
  'SalaryCalculator.tsx',
  'SalarySlipGenerator.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, '../src/calculators', file);
  const componentName = file.replace('.tsx', '');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('export default')) {
      content += `\n\nexport default ${componentName};\n`;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added export default to ${file}`);
    }
  }
});
