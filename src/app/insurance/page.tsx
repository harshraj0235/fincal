import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insurance Tools & Guides - Compare Plans & Calculate Premium | MoneyCal',
  description: 'Free insurance tools - compare health insurance, life insurance, term insurance plans. Premium calculator, claim guide & expert advice.',
  keywords: 'insurance calculator, health insurance comparison, term insurance, life insurance India, insurance premium calculator',
  alternates: { canonical: 'https://moneycal.in/insurance' }
};

export default function Page() {
  redirect('/insurance-tools');
}
