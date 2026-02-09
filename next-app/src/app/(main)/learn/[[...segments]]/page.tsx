import type { Metadata } from 'next';
import AppShell from '@/app/AppShell';
import { getServerContentForPath } from '@/lib/serverContent';

export const dynamicParams = true;

const BASE = 'https://moneycal.in';

interface Props {
  params: Promise<{ segments?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const pathname = '/learn' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  const isLesson = serverContent?.type === 'learn-lesson';
  const title = isLesson
    ? `${(serverContent as { title: string }).title} | Learn | MoneyCal India`
    : segments?.length
      ? `Learn – ${segments.join(' ')} | MoneyCal India`
      : 'Learn | MoneyCal India';
  const description = isLesson
    ? (serverContent as { description: string }).description
    : 'Free guides on personal finance, loans, insurance, investing, tax, and money management for India.';
  return {
    title,
    description,
    openGraph: { url: BASE + pathname, title, description },
  };
}

export default async function LearnPage({ params }: Props) {
  const { segments } = await params;
  const pathname = '/learn' + (segments?.length ? '/' + segments.join('/') : '');
  const serverContent = getServerContentForPath(pathname);
  const isLesson = serverContent?.type === 'learn-lesson';
  const lesson = isLesson ? (serverContent as { title: string; description: string; category: string; categoryName?: string; relatedCalculators?: string[]; relatedLessons?: string[] }) : null;

  return (
    <>
      <main className="container mx-auto px-4 py-4 max-w-4xl" aria-label="Learn">
        {lesson ? (
          <article>
            <header className="mb-6">
              <nav className="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
                <a href="/learn" className="hover:text-gray-700">Learn</a>
                {lesson.categoryName && (
                  <>
                    {' / '}
                    <span>{lesson.categoryName}</span>
                  </>
                )}
              </nav>
              <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
              <p className="text-lg text-gray-700 mt-2">{lesson.description}</p>
            </header>
            {lesson.relatedCalculators && lesson.relatedCalculators.length > 0 && (
              <section className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Related calculators</h2>
                <ul className="space-y-1">
                  {lesson.relatedCalculators.slice(0, 6).map((path) => {
                    const id = path.replace(/^\/calculators\//, '');
                    const label = id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    return (
                      <li key={path}>
                        <a href={path} className="text-blue-600 hover:text-blue-800 hover:underline">
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
            {lesson.relatedLessons && lesson.relatedLessons.length > 0 && (
              <section className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Related lessons</h2>
                <ul className="space-y-1">
                  {lesson.relatedLessons.slice(0, 6).map((slug) => (
                    <li key={slug}>
                      <a
                        href={`/learn/${lesson.category}/${slug}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900">Learn</h1>
            <p className="text-lg text-gray-700 mt-2">
              Free guides on personal finance, loans, insurance, investing, tax, and money management for India.
            </p>
          </>
        )}
      </main>
      <AppShell pathname={pathname} skipLayout serverContent={serverContent} />
    </>
  );
}
