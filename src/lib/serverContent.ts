/**
 * Server-side content resolver for SEO.
 * Returns pre-loaded content for key paths so the initial HTML includes full content
 * without waiting for client-side loading.
 */

import { contentRegistry } from '../cms-content/contentRegistry';
import { getArticleContent } from '../cms-content/articleLoader';
import { getPlainArticleContent } from '../cms-content/plainArticleLoader';
import type { NewsGuideSection } from '../components/NewsGuideTemplate';

export interface NewsArticleServerContent {
  type: 'news-article';
  articleMeta: {
    id: string;
    slug: string;
    title: string;
    category: string;
    authorId: string;
    datePublished: string;
    image: string;
    subCategory?: string;
  };
  cmsContent: NewsGuideSection | null;
  plainContent: { content: string; title?: string } | null;
}

export interface LearnLessonServerContent {
  type: 'learn-lesson';
  title: string;
  category: string;
  slug: string;
  description: string;
}

export type ServerContent = NewsArticleServerContent | LearnLessonServerContent;

/**
 * Resolve server content for a given pathname.
 * Returns content that can be used for initial HTML render (no loading state).
 */
export function getServerContentForPath(pathname: string): ServerContent | null {
  const segments = pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const [first, second, third] = segments;

  // News article: /news/:categorySlug/:articleId
  if (first === 'news' && second && third) {
    const articleMeta = contentRegistry.find((a) => a.slug === third);
    if (!articleMeta) return null;

    const cmsContent = getArticleContent(articleMeta.slug);
    const plainContent = getPlainArticleContent(articleMeta.slug);

    return {
      type: 'news-article',
      articleMeta: {
        id: articleMeta.id,
        slug: articleMeta.slug,
        title: articleMeta.title,
        category: articleMeta.category,
        authorId: articleMeta.authorId,
        datePublished: articleMeta.datePublished,
        image: articleMeta.image,
        subCategory: articleMeta.subCategory,
      },
      cmsContent: cmsContent ?? null,
      plainContent: plainContent && plainContent.content ? { content: plainContent.content, title: plainContent.title } : null,
    };
  }

  // Learn lesson: /learn/:category/:lessonSlug (e.g. /learn/business-loans/government-schemes)
  if (first === 'learn' && second && third) {
    try {
      const { loanCategories } = require('../data/learn/loansLessons');
      for (const cat of loanCategories || []) {
        const lesson = cat.lessons?.find((l: { slug?: string; title?: string }) => l.slug === third);
        if (lesson) {
          return {
            type: 'learn-lesson',
            title: lesson.title || third,
            category: second,
            slug: third,
            description: (lesson as { description?: string }).description || (lesson as { title?: string }).title || '',
          };
        }
      }
    } catch {
      /* ignore */
    }
    const title = third.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      type: 'learn-lesson',
      title,
      category: second,
      slug: third,
      description: `Learn about ${title} - practical financial education for India.`,
    };
  }

  return null;
}
