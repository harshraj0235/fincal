import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface CategoryFAQSchemaProps {
  category: string;
}

export const categoryFAQs: Record<string, FAQItem[]> = {
  markets: [
    {
      question: "How can I track the latest Indian stock market news?",
      answer: "You can track the latest Indian stock market news on MoneyCal.in, where we provide real-time updates on Sensex, Nifty, top gainers, losers, and expert analysis on market trends."
    },
    {
      question: "Which are the best indicators for market trends in 2024?",
      answer: "Key indicators to watch in 2024 include FII/DII flow, crude oil prices, US Fed interest rate decisions, and quarterly corporate earnings of Nifty 50 companies."
    }
  ],
  economy: [
    {
      question: "What is the latest update on India's GDP growth?",
      answer: "India remains one of the fastest-growing major economies. Latest reports highlight strong performance in manufacturing and services, with GDP growth projections often exceeding 6-7% for the current fiscal year."
    },
    {
      question: "How does inflation affect my savings?",
      answer: "Inflation reduces the purchasing power of your money. To protect your savings, it's essential to invest in assets that offer returns higher than the inflation rate, such as equities or inflation-indexed bonds."
    }
  ],
  ipo: [
    {
      question: "How to check IPO allotment status online?",
      answer: "You can check IPO allotment status on the registrar's website (like Link Intime or KFintech) or through the BSE and NSE official websites using your PAN number or application number."
    },
    {
      question: "What should I look for before investing in an IPO?",
      answer: "Before investing, analyze the company's RHP (Red Herring Prospectus), its debt-to-equity ratio, profit margins, the promoter's track record, and the 'Grey Market Premium' (GMP), although GMP is not an official indicator."
    }
  ],
  'personal-finance': [
    {
      question: "What is the best way to start a SIP for beginners?",
      answer: "Beginners should start by choosing a diversified flexi-cap or index mutual fund. You can start with as little as ₹500 per month via your bank's net banking or third-party investment apps."
    },
    {
      question: "How can I save income tax under the old regime?",
      answer: "Under the old regime, you can save tax by investing in instruments like ELSS, PPF, and Life Insurance (Section 80C), Health Insurance (Section 80D), and claiming HRA or Home Loan interest (Section 24)."
    }
  ]
};

const CategoryFAQSchema: React.FC<CategoryFAQSchemaProps> = ({ category }) => {
  const faqs = categoryFAQs[category.toLowerCase()] || [];

  if (faqs.length === 0) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default CategoryFAQSchema;
