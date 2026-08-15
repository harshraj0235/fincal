import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RewardsCashbackClient';

export const metadata: Metadata = {
  title: 'Rewards Cashback | MoneyCal India',
  description: "Explore Rewards Cashback on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/rewards-cashback'
  }
};

export default function Page() {
  return <ClientComponent />;
}
