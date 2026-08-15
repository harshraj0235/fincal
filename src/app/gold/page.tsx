import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gold Investment Tools - Gold Rate, Calculator & Analysis | MoneyCal',
  description: 'Gold investment tools - check gold rate today, gold price calculator, gold loan calculator, jewellery price estimator & investment analysis.',
  keywords: 'gold rate today, gold price India, gold investment, gold calculator, gold loan, 22K gold rate, 24K gold rate',
  alternates: { canonical: 'https://moneycal.in/gold' }
};

export default function Page() {
  redirect('/market/market-rates-hub');
}
