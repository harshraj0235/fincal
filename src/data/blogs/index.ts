import { BlogPost } from './types';

// Auto-generated blog imports
import { blog651 } from './651';
import { blog652 } from './652';
import { blog653 } from './653';
import { blog654 } from './654';
import { blog655 } from './655';
import { blog656 } from './656';
import { blog657 } from './657';
import { blog658 } from './658';
import { blog659 } from './659';
import { blog660 } from './660';
import { blog661 } from './661';
import { blog662 } from './662';
import { blog663 } from './663';
import { blog664 } from './664';
import { blog665 } from './665';
import { blog666 } from './666';
import { blog667 } from './667';
import { blog668 } from './668';
import { blog669 } from './669';
import { blog670 } from './670';
import { blog671 } from './671';
import { blog672 } from './672';
import { blog673 } from './673';
import { blog674 } from './674';
import { blog675 } from './675';
import { blog676 } from './676';
import { blog677 } from './677';
import { blog678 } from './678';
import { blog679 } from './679';
import { blog680 } from './680';
import { blog681 } from './681';
import { blog682 } from './682';
import { investmentGuides } from './investment-guides';
import { equityInvestmentForBeginners } from './equity-investment-for-beginners';
import { coreConcepts } from './core-concepts';
import { taxSavingInvestmentOptions } from './tax-saving-investment-options';
import { cryptocurrency } from './cryptocurrency';
import { personalFinance } from './personal-finance';
import { mutualFunds } from './mutual-funds';
import { stockMarket } from './stock-market';
import { banking } from './banking';
import { creditCards } from './credit-cards';
import { insurance } from './insurance';
import { news } from './news';
import { calculators } from './calculators';
import { excelTools } from './excel-tools';

// Auto-generated blog array
export const blogs: BlogPost[] = [
  blog651,
  blog652,
  blog653,
  blog654,
  blog655,
  blog656,
  blog657,
  blog658,
  blog659,
  blog660,
  blog661,
  blog662,
  blog663,
  blog664,
  blog665,
  blog666,
  blog667,
  blog668,
  blog669,
  blog670,
  blog671,
  blog672,
  blog673,
  blog674,
  blog675,
  blog676,
  blog677,
  blog678,
  blog679,
  blog680,
  blog681,
  blog682,
  investmentGuides,
  equityInvestmentForBeginners,
  coreConcepts,
  taxSavingInvestmentOptions,
  cryptocurrency,
  personalFinance,
  mutualFunds,
  stockMarket,
  banking,
  creditCards,
  insurance,
  news,
  calculators,
  excelTools,
];

// Auto-update blog dates
export function autoUpdateBlogDates() {
  const currentDate = new Date().toISOString().split('T')[0];
  blogs.forEach(blog => {
    if (blog.lastModified !== currentDate) {
      blog.lastModified = currentDate;
    }
  });
}

// Export individual blogs
export { blog651 } from './651';
export { blog652 } from './652';
export { blog653 } from './653';
export { blog654 } from './654';
export { blog655 } from './655';
export { blog656 } from './656';
export { blog657 } from './657';
export { blog658 } from './658';
export { blog659 } from './659';
export { blog660 } from './660';
export { blog661 } from './661';
export { blog662 } from './662';
export { blog663 } from './663';
export { blog664 } from './664';
export { blog665 } from './665';
export { blog666 } from './666';
export { blog667 } from './667';
export { blog668 } from './668';
export { blog669 } from './669';
export { blog670 } from './670';
export { blog671 } from './671';
export { blog672 } from './672';
export { blog673 } from './673';
export { blog674 } from './674';
export { blog675 } from './675';
export { blog676 } from './676';
export { blog677 } from './677';
export { blog678 } from './678';
export { blog679 } from './679';
export { blog680 } from './680';
export { blog681 } from './681';
export { blog682 } from './682';
export { investmentGuides } from './investment-guides';
export { equityInvestmentForBeginners } from './equity-investment-for-beginners';
export { coreConcepts } from './core-concepts';
export { taxSavingInvestmentOptions } from './tax-saving-investment-options';
export { cryptocurrency } from './cryptocurrency';
export { personalFinance } from './personal-finance';
export { mutualFunds } from './mutual-funds';
export { stockMarket } from './stock-market';
export { banking } from './banking';
export { creditCards } from './credit-cards';
export { insurance } from './insurance';
export { news } from './news';
export { calculators } from './calculators';
export { excelTools } from './excel-tools';
