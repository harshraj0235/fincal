import { notFound } from 'next/navigation';
import AppShell from '@/app/AppShell';
import { calculatorCategories, getCalculatorById } from '@/data/calculatorData';
import type { Metadata } from 'next';

const BASE = 'https://moneycal.in';

/** Return empty to avoid OOM on Cloudflare. All calculators generated on-demand. */
export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const calc = getCalculatorById(id);
  if (!calc) return { title: 'Calculator Not Found' };
  const title = `${calc.name} – Free Online Calculator | MoneyCal India`;
  const description = `${calc.name} – Free online calculator for Indian users. ${calc.description} Accurate, no sign-up.`;
  const url = `${BASE}/calculators/${id}`;
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

export default async function CalculatorSSGPage({ params }: Props) {
  const { id } = await params;
  const calc = getCalculatorById(id);
  if (!calc) notFound();
  const related = (calc.relatedCalculators || []).slice(0, 4);
  const relatedCalcs = related
    .map((rid) => getCalculatorById(rid))
    .filter((c): c is NonNullable<typeof c> => !!c);
  return (
    <>
      <article className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Calculator">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{calc.name}</h1>
          <p className="text-lg text-gray-700 mt-2">{calc.description}</p>
          {calc.info && calc.info.length > 0 && (
            <section className="mt-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">How to use</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                {calc.info.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </section>
          )}
        </header>
        {calc.faqs && calc.faqs.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">FAQs</h2>
            <dl className="space-y-4">
              {calc.faqs.map((faq, i) => (
                <div key={i} className="border-l-4 border-blue-200 pl-4">
                  <dt className="font-semibold text-gray-900">{faq.question}</dt>
                  <dd className="mt-1 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        {relatedCalcs.length > 0 && (
          <section className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Related calculators</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {relatedCalcs.map((rc) => (
                <li key={rc.id}>
                  <a
                    href={`/calculators/${rc.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {rc.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <AppShell pathname={`/calculators/${id}`} skipLayout />
    </>
  );
}
