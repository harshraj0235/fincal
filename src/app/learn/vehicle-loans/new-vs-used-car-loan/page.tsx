import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NewVsUsedCarLoanClient';

export const metadata: Metadata = {
  title: 'New Vs Used Car Loan | MoneyCal India',
  description: "Explore New Vs Used Car Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/vehicle-loans/new-vs-used-car-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
