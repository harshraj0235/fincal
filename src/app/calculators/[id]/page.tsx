import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { calculatorCategories, getCalculatorById } from '../../data/calculatorData';
import type { Metadata } from 'next';

const App = dynamic(() => import('../../App'));

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
  const url = `${BASE}/calculators/${params.id}`;
  const ogImage = `${BASE}/android-chrome-512x512.png`;
  return {
    title,
    description,
    keywords: (calc.keywords || []).slice(0, 10).join(', '),
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'MoneyCal India',
      images: [{ url: ogImage, width: 512, height: 512, alt: calc.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

export default function CalculatorSSGPage({ params }: Props) {
  const calc = getCalculatorById(params.id);
  if (!calc) notFound();
  return (
    <>
      <article className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Calculator">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{calc.name}</h1>
          <p className="text-gray-700 mt-2">{calc.description}</p>
          {calc.info && calc.info.length > 0 && (
            <ul className="mt-2 list-disc pl-6 text-gray-600 text-sm space-y-1">
              {calc.info.slice(0, 3).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}
        </header>
      </article>
      <App pathname={`/calculators/${params.id}`} skipLayout />
    </>
  );
}
