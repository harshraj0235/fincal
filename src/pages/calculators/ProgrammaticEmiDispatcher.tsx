import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { matchProgrammaticEmiRoute } from '../../data/programmaticSEO';
import { EmiCalculator } from '../../calculators/EmiCalculator';

export const ProgrammaticEmiDispatcher: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/404" replace />;
  }

  const match = matchProgrammaticEmiRoute(slug);

  if (!match) {
    return <Navigate to="/404" replace />;
  }

  const { type, bank, city, loanType } = match;

  let h1 = '';
  let title = '';
  let description = '';
  let keywords = '';
  let subtitle = '';
  let customFaq: any[] = [];
  let defaultBankIndex = undefined;

  if (type === 'bank' && bank) {
    h1 = `${bank.name} ${loanType.name} EMI Calculator 2026-2027`;
    title = `${bank.name} ${loanType.name} EMI Calculator | Check Latest Interest Rates`;
    description = `Calculate your ${bank.name} ${loanType.name} EMI instantly. Get the exact monthly installment, total interest, and amortization schedule based on ${bank.fullName}'s latest interest rates for 2026-2027.`;
    keywords = `${bank.name.toLowerCase()} ${loanType.name.toLowerCase()} emi calculator, ${bank.fullName.toLowerCase()} emi calculator, ${bank.name.toLowerCase()} loan emi, calculate ${bank.name.toLowerCase()} ${loanType.name.toLowerCase()} emi`;
    subtitle = `Find exactly how much your monthly EMI will be for a ${loanType.name} from ${bank.fullName}. Accurate to the latest 2026-2027 rates.`;
    defaultBankIndex = bank.bankIndex;

    customFaq = [
      {
        question: `What is the current interest rate for ${bank.name} ${loanType.name}?`,
        answer: `The interest rates for ${bank.fullName} vary based on your CIBIL score and loan amount. Select ${bank.name} from the bank preset table below to see the exact range currently being offered in 2026-2027.`
      },
      {
        question: `How is the ${bank.name} ${loanType.name} EMI calculated?`,
        answer: `Like all major Indian banks, ${bank.name} calculates EMI using the standard reducing balance formula. This calculator replicates ${bank.name}'s exact formula to give you an accurate amortization schedule.`
      },
      {
        question: `Does ${bank.name} charge prepayment penalties on ${loanType.name}s?`,
        answer: `As per RBI guidelines, ${bank.name} does not charge prepayment penalties on floating rate home loans. For personal and car loans, a prepayment penalty (usually 2-5%) may apply after a lock-in period.`
      }
    ];
  } else if (type === 'city' && city) {
    h1 = `${loanType.name} EMI Calculator in ${city.name} (2026-2027)`;
    title = `${loanType.name} EMI Calculator in ${city.name} | Compare Top Banks`;
    description = `Planning a ${loanType.name} in ${city.name}? Calculate your exact EMI, compare latest interest rates from top banks in ${city.name}, and check your eligibility instantly.`;
    keywords = `${loanType.name.toLowerCase()} emi calculator ${city.name.toLowerCase()}, ${loanType.name.toLowerCase()} in ${city.name.toLowerCase()}, emi calculator for ${city.name.toLowerCase()}`;
    subtitle = `Instantly calculate your ${loanType.name} EMI and compare the lowest interest rates offered by top banks and NBFCs across ${city.name}.`;

    customFaq = [
      {
        question: `Which bank offers the lowest ${loanType.name} interest rate in ${city.name}?`,
        answer: `Interest rates across top banks in ${city.name} like SBI, HDFC, and ICICI are largely standardized. Currently, rates start from around 8.40% for home loans. Use the preset buttons above to compare rates.`
      },
      {
        question: `Is it better to take a ${loanType.name} from a local NBFC or a major bank in ${city.name}?`,
        answer: `Major banks typically offer lower interest rates, but NBFCs in ${city.name} might offer faster processing and more flexible eligibility criteria. Always compare the total EMI cost before deciding.`
      },
      {
        question: `Are property registration charges in ${city.name} included in the home loan?`,
        answer: `No, banks usually do not include stamp duty and registration charges in the loan amount. You must account for ${city.name}'s specific stamp duty rates out of pocket.`
      }
    ];
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <EmiCalculator
        title={title}
        description={description}
        keywords={keywords}
        h1={h1}
        subtitle={subtitle}
        url={`/calculators/${slug}`}
        faqData={customFaq}
        defaultPresetIndex={loanType.presetIndex}
        defaultBankIndex={defaultBankIndex}
      />
    </div>
  );
};

export default ProgrammaticEmiDispatcher;
