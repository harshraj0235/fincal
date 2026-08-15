import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Finance Tools - Business Calculators & Analysis | MoneyCal',
  description: 'Corporate finance tools - ROI calculator, break-even analysis, cash flow tools, business valuation & corporate tax calculators.',
  keywords: 'corporate finance tools, ROI calculator, break-even calculator, business valuation, corporate tax calculator India',
  alternates: { canonical: 'https://moneycal.in/corporate' }
};

export default function Page() {
  redirect('/corporate-finance');
}
