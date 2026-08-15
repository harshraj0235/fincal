import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EmotionalInvestingClient';

export const metadata: Metadata = {
  title: 'Emotional Investing | MoneyCal India',
  description: "Explore Emotional Investing on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/behavioural/emotional-investing'
  }
};

export default function Page() {
  return <ClientComponent />;
}
