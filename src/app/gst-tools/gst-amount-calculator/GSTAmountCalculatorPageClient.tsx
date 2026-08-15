"use client";
import React from 'react';
import GSTAmountCalculator from '@/calculators/GSTAmountCalculator';


const GSTAmountCalculatorPage: React.FC = () => {
  const faqData = [
    {
      question: 'How do I calculate GST amount from base price?',
      answer: 'Multiply the base amount by the GST rate and divide by 100. GST Amount = Base × (Rate ÷ 100).'
    },
    {
      question: 'How do I remove GST from an inclusive price?',
      answer: 'Divide the total by (1 + Rate/100) to get the base amount, then subtract the base from total to get GST.'
    },
    {
      question: 'What is the difference between CGST, SGST, and IGST?',
      answer: 'CGST and SGST apply to intra-state transactions and split the GST equally. IGST applies to inter-state transactions and is a single tax.'
    },
    {
      question: 'Is GST calculated before or after discount?',
      answer: 'GST is calculated on the discounted price. Apply the discount first, then compute GST on the reduced base.'
    },
    {
      question: 'Which GST rate should I use in 2026?',
      answer: 'Most goods and services fall into 0%, 5%, 12%, 18%, or 28% slabs. Use the rate prescribed for your product or service.'
    }
  ];
  return (
    <>
      
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <GSTAmountCalculator />
        </div>
      </div>
    </>
  );
};

export default GSTAmountCalculatorPage;
export { GSTAmountCalculatorPage };
