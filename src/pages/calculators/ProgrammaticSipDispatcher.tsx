import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SipCalculator } from '../../calculators/SipCalculator';

const parseSipFromSlug = (slug: string) => {
  // Matches: sip-calculator-for-5000-per-month
  const amountMatch = slug.match(/^sip-calculator-for-(\d+)-per-month$/);
  if (amountMatch) {
    return { type: 'amount', value: parseInt(amountMatch[1]) };
  }
  
  // Matches: sip-calculator-for-10-years
  const yearsMatch = slug.match(/^sip-calculator-for-(\d+)-years$/);
  if (yearsMatch) {
    return { type: 'years', value: parseInt(yearsMatch[1]) };
  }

  return null;
};

export const ProgrammaticSipDispatcher: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/404" replace />;
  }

  const match = parseSipFromSlug(slug);

  if (!match) {
    return <Navigate to="/404" replace />;
  }

  let h1 = '';
  let title = '';
  let description = '';
  let keywords = '';
  let subtitle = '';
  let customFaq = [];
  let defaultAmount = 10000;
  let defaultYears = 10;

  if (match.type === 'amount') {
    const amount = match.value;
    defaultAmount = amount;
    
    h1 = `SIP Calculator for ₹${amount.toLocaleString()} per Month`;
    title = `SIP Calculator for ₹${amount.toLocaleString()} per Month | Mutual Fund Returns`;
    description = `Calculate the future value of a ₹${amount.toLocaleString()} monthly SIP. See the magic of compounding and wealth creation over 5, 10, 15 and 20 years.`;
    keywords = `sip calculator ${amount}, mutual fund sip ${amount}, sip return on ${amount}, monthly sip ${amount}`;
    subtitle = `Visualize how a disciplined monthly investment of ₹${amount.toLocaleString()} can grow into a massive corpus over time.`;

    customFaq = [
      {
        question: `How much wealth can a ₹${amount.toLocaleString()} monthly SIP generate?`,
        answer: `If you invest ₹${amount.toLocaleString()} every month in an equity mutual fund that returns an average of 12% annually, your total investment of ₹${(amount * 12 * 10).toLocaleString()} over 10 years will grow to approximately ₹${Math.round(amount * ((Math.pow(1.01, 120) - 1) / 0.01) * 1.01).toLocaleString()}! Over 20 years, the compounding effect is even more dramatic.`
      },
      {
        question: `Is ₹${amount.toLocaleString()} a good amount to start a SIP?`,
        answer: `Yes, starting with ₹${amount.toLocaleString()} is an excellent foundation. The key to wealth creation is not just the amount, but the consistency and time you remain invested. If your salary increases, you can always use a 'Step-Up SIP' strategy to increase this amount by 10% annually.`
      }
    ];
  } else if (match.type === 'years') {
    const years = match.value;
    defaultYears = years;
    
    h1 = `SIP Calculator for ${years} Years`;
    title = `SIP Calculator for ${years} Years | Compounding Returns`;
    description = `Plan your investments for ${years} years. Calculate your mutual fund SIP maturity value, wealth gained, and see the exact breakdown of your long-term wealth creation.`;
    keywords = `sip calculator ${years} years, mutual fund returns ${years} years, long term sip planning`;
    subtitle = `See the power of compounding at work over a ${years}-year time horizon.`;

    customFaq = [
      {
        question: `Is ${years} years a good time horizon for an SIP?`,
        answer: `${years} years is an excellent time horizon for equity mutual funds. By staying invested for this duration, you allow your returns to compound while effectively riding out short-term market volatility.`
      }
    ];
  }

  return (
    <SipCalculator
      title={title}
      description={description}
      keywords={keywords}
      h1={h1}
      subtitle={subtitle}
      url={`/calculators/${slug}`}
      faqData={customFaq}
      defaultAmount={defaultAmount}
      defaultYears={defaultYears}
    />
  );
};

export default ProgrammaticSipDispatcher;
