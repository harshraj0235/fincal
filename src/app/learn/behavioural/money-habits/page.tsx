import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MoneyHabitsClient';

export const metadata: Metadata = {
  title: 'Money Habits | MoneyCal India',
  description: "Explore Money Habits on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/behavioural/money-habits'
  }
};

export default function Page() {
  return <ClientComponent />;
}
