import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './news-home-page-revamped/NewsHomePageRevampedClient';

export const metadata: Metadata = {
  title: 'Finance News India - Stock Market, Economy & Business News | MoneyCal',
  description: 'Latest finance news India - stock market updates, economy news, business news, RBI policy, budget updates, mutual fund news & more.',
  keywords: 'finance news India, stock market news, economy news, business news India, RBI news, budget 2026, mutual fund news',
  alternates: { canonical: 'https://moneycal.in/news' }
};

export default function Page() {
  return <ClientComponent />;
}
