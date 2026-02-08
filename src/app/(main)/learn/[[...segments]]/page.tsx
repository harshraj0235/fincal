import type { Metadata } from 'next';
import AppShell from '../../../../AppShell';
import { getServerContentForPath } from '../../../../../lib/serverContent';

/** Learn: ISR 7 days – authority + internal linking */
export const revalidate = 604800;
export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/learn' + (segments?.length ? '/' + segments.join('/') : '');
  const title = segments?.length ? `Learn – ${segments.join(' ')} | MoneyCal India` : 'Learn | MoneyCal India';
  return {
    title,
    description: 'Free guides on personal finance, loans, insurance, investing, tax, and money management for India.',
    openGraph: { url: BASE + pathname },
  };
}

export default async function LearnPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/learn' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Learn">
        <h1 className="text-2xl font-bold text-gray-900">Learn</h1>
        <p className="text-gray-700 mt-2">Free guides on personal finance, loans, insurance, investing, tax, and money management for India.</p>
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
