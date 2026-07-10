import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { IncomeTaxCalculator } from '../../calculators/IncomeTaxCalculator';

const parseSalaryFromSlug = (slug: string): number | null => {
  // Matches: income-tax-calculator-salary-10-lakh
  const lakhMatch = slug.match(/^income-tax-calculator-salary-(\d+)-lakh$/);
  if (lakhMatch) {
    return parseInt(lakhMatch[1]) * 100000;
  }
  
  // Matches: income-tax-calculator-salary-1-crore
  const croreMatch = slug.match(/^income-tax-calculator-salary-(\d+)-crore$/);
  if (croreMatch) {
    return parseInt(croreMatch[1]) * 10000000;
  }

  return null;
};

export const ProgrammaticIncomeTaxDispatcher: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/404" replace />;
  }

  const salary = parseSalaryFromSlug(slug);

  if (!salary) {
    return <Navigate to="/404" replace />;
  }

  const displaySalary = salary >= 10000000 
    ? `${salary / 10000000} Crore` 
    : `${salary / 100000} Lakh`;

  const h1 = `Income Tax on ₹${displaySalary} Salary (2026-2027)`;
  const title = `Income Tax Calculator for ₹${displaySalary} Salary | Old vs New Regime`;
  const description = `Calculate exact income tax on a ₹${displaySalary} salary for FY 2026-27. Compare the Old vs New tax regimes, see your ₹75,000 standard deduction impact, and find out which regime saves you more money.`;
  const keywords = `income tax on ${displaySalary.toLowerCase()} salary, tax on ${salary}, income tax calculator for ${displaySalary.toLowerCase()}, new tax regime ${displaySalary.toLowerCase()}`;
  const subtitle = `Find exactly how much tax you need to pay on a ₹${displaySalary} salary under the New and Old Regimes for FY 2026-2027.`;

  const customFaq = [
    {
      question: `How much is the tax on a ₹${displaySalary} salary under the New Tax Regime?`,
      answer: `Under the New Tax Regime for FY 2026-27, a salary of ₹${displaySalary} gets a standard deduction of ₹75,000. After applying the new ₹4 Lakh slab structure (0% up to ₹4L, 5% for ₹4-8L, etc.), the calculator above shows your exact liability. Note: If your taxable income is ₹12 Lakh or less, you get a full rebate under Section 87A and pay ₹0 tax!`
    },
    {
      question: `Which is better for a ₹${displaySalary} salary: Old or New Regime?`,
      answer: `It depends entirely on your investments. For a ₹${displaySalary} salary, if you claim high deductions like Section 80C (₹1.5L), 80D (Health Insurance), and Section 24(b) (Home Loan Interest up to ₹2L), the Old Regime might still be beneficial. However, for most individuals who do not have a home loan, the New Regime with its lower tax slabs and ₹75k standard deduction is the clear winner. Check the comparison chart above.`
    },
    {
      question: `Are there any surcharges applied to a ₹${displaySalary} salary?`,
      answer: salary >= 5000000 
        ? `Yes. Since your salary is ₹${displaySalary} (above ₹50 Lakhs), a surcharge will be applied to your base tax liability. Under the New Tax Regime, the maximum surcharge rate has been capped at 25% (down from 37%). Our calculator automatically applies the correct surcharge and marginal relief.`
        : `No. Surcharges are only applicable for taxable incomes exceeding ₹50 Lakhs. Since your salary is ₹${displaySalary}, you only need to pay the base tax plus the 4% Health & Education Cess.`
    }
  ];

  return (
    <IncomeTaxCalculator
      title={title}
      description={description}
      keywords={keywords}
      h1={h1}
      subtitle={subtitle}
      url={`/calculators/${slug}`}
      faqData={customFaq}
      defaultSalary={salary}
    />
  );
};

export default ProgrammaticIncomeTaxDispatcher;
