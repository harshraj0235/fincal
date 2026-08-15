import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Religious & Traditional Finance Tools - Muhurat, Panchang & More | MoneyCal',
  description: 'Traditional finance tools - muhurat calculator, panchang, auspicious dates for investment, religious finance calculators & astro finance.',
  keywords: 'muhurat calculator, panchang, auspicious investment dates, astro finance, religious finance tools India',
  alternates: { canonical: 'https://moneycal.in/religious' }
};

export default function Page() {
  redirect('/religious-traditional-tools');
}
