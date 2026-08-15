import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MoneyRelationshipsClient';

export const metadata: Metadata = {
  title: 'Money Relationships | MoneyCal India',
  description: "Explore Money Relationships on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/behavioural/money-relationships'
  }
};

export default function Page() {
  return <ClientComponent />;
}
