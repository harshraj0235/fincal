import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HowToManagePersonalFinancesIndiaBeginnersClient';

export const metadata: Metadata = {
  title: 'How To Manage Personal Finances India Beginners | MoneyCal India',
  description: "Explore How To Manage Personal Finances India Beginners on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/personal-finance/how-to-manage-personal-finances-india-beginners'
  }
};

export default function Page() {
  return <ClientComponent />;
}
