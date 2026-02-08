import type { Metadata } from 'next';
import AppShell from '../../../../AppShell';
import { getServerContentForPath } from '../../../../../lib/serverContent';

/** Tools hub: ISR 1 hour */
export const revalidate = 3600;
export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/tools' + (segments?.length ? '/' + segments.join('/') : '');
  return {
    title: segments?.length ? `Tools – ${segments.join(' ')} | MoneyCal` : 'Tools | MoneyCal India',
    description: 'Free business and productivity tools: EMI affordability, discount calculator, time zone converter, and more.',
    openGraph: { url: BASE + pathname },
  };
}

export default async function ToolsPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/tools' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Tools">
        <h1 className="text-2xl font-bold text-gray-900">Tools</h1>
        <p className="text-gray-700 mt-2">Free business and productivity tools: EMI affordability, discount calculator, and more.</p>
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
