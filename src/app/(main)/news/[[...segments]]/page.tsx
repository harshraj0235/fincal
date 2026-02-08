import type { Metadata } from 'next';
import AppShell from '@/app/AppShell';
import { getServerContentForPath } from '@/lib/serverContent';

/** News: ISR 30 min – freshness + discoverability */
export const revalidate = 1800;
export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/news' + (segments?.length ? '/' + segments.join('/') : '');
  const title = segments?.length ? `News – ${segments.join(' ')} | MoneyCal India` : 'MoneyCal News | India Finance & Markets';
  return {
    title,
    description: 'Latest news and short updates on economy, markets, startups, and personal finance. Bite-sized reads for busy readers.',
    openGraph: { url: BASE + pathname },
  };
}

export default async function NewsPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/news' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="News">
        <h1 className="text-2xl font-bold text-gray-900">News</h1>
        <p className="text-gray-700 mt-2">Latest news and short updates on economy, markets, startups, and personal finance.</p>
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
