import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Festival Finance Guide - Festival Shopping, Budget & Planning | MoneyCal',
  description: 'Festival finance tips - Diwali budget planner, festival shopping deals, muhurat trading guide, festival loan offers & savings tips.',
  keywords: 'festival finance, Diwali budget, festival shopping tips, muhurat trading, festival offers India',
  alternates: { canonical: 'https://moneycal.in/festival' }
};

export default function Page() {
  redirect('/festival-tools');
}
