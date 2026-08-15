import React from 'react';
import { Metadata } from 'next';
import VratUpavasCalendar from './VratUpavasCalendar';

export const metadata: Metadata = {
  title: 'Vrat Upavas Calendar | MoneyCal India',
  description: 'Use our free Vrat Upavas Calendar to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/festival-tools/vrat-upavas-calendar'
  }
};

export default function Page() {
  return <VratUpavasCalendar />;
}
