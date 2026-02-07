import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { calculatorCategories, getCalculatorById } from '../../data/calculatorData';
import type { Metadata } from 'next';

const App = dynamic(() => import('../../App'), { ssr: false });

const BASE = 'https://moneycal.in';

/** SSG: pre-generate all calculator pages at build time. */
export async function generateStaticParams() {
  return calculatorCategories.flatMap((cat) =>
    cat.calculators.map((calc) => ({ id: calc.id }))
  );
}

export const dynamicParams = true;
export const revalidate = 86400; // ISR: revalidate once per day

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calc = getCalculatorById(params.id);
  if (!calc) return { title: 'Calculator Not Found' };
  const title = `${calc.name} – Free Online Calculator | MoneyCal India`;
  const description = `${calc.name} – Free online calculator for Indian users. ${calc.description} Accurate, no sign-up.`;
  return {
    title,
    description,
    keywords: (calc.keywords || []).slice(0, 10).join(', '),
    openGraph: {
      title,
      description,
      url: `${BASE}/calculators/${params.id}`,
      siteName: 'MoneyCal India',
    },
    alternates: { canonical: `${BASE}/calculators/${params.id}` },
  };
}

export default function CalculatorSSGPage({ params }: Props) {
  const calc = getCalculatorById(params.id);
  if (!calc) notFound();
  return <App pathname={`/calculators/${params.id}`} skipLayout />;
}
