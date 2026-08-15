import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StockMarketLessonClient';

export const metadata: Metadata = {
  title: 'Stock Market Lesson | MoneyCal India',
  description: "Explore Stock Market Lesson on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/stock-market-lesson'
  }
};

export default function Page() {
  return <ClientComponent />;
}
