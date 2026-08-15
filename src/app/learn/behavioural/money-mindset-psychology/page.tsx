import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MoneyMindsetPsychologyClient';

export const metadata: Metadata = {
  title: 'Money Mindset Psychology | MoneyCal India',
  description: "Explore Money Mindset Psychology on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/behavioural/money-mindset-psychology'
  }
};

export default function Page() {
  return <ClientComponent />;
}
