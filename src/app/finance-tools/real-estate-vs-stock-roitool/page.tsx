import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RealEstateVsStockROIToolClient';

export const metadata: Metadata = {
  title: 'Real Estate Vs Stock ROITool | MoneyCal India',
  description: "Explore Real Estate Vs Stock ROITool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/real-estate-vs-stock-roitool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
