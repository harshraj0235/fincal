/**
 * Auto-related linking logic for SEO.
 * Server-side utility to generate contextual internal links.
 */

import type { ContentMeta, ContentType } from './contentMeta';
import { isAllowedLink } from './contentMeta';

export interface RelatedContentOptions {
  limit?: number;
  allowedTypes?: ContentType[];
}

/**
 * Score and return related content for a given page.
 * Weight: same category +5, same subcategory +3, matching tags +2 each, priorityScore bonus.
 */
export function getRelatedContent(
  current: ContentMeta,
  all: ContentMeta[],
  options: RelatedContentOptions = {}
): ContentMeta[] {
  const { limit = 6, allowedTypes } = options;
  const allowed = allowedTypes ?? undefined;

  return all
    .filter((item) => item.slug !== current.slug)
    .filter((item) => !allowed || allowed.includes(item.type))
    .map((item) => {
      let score = 0;
      if (item.category === current.category) score += 5;
      if (item.subcategory && item.subcategory === current.subcategory) score += 3;
      const commonTags = item.tags.filter((tag) => current.tags.includes(tag));
      score += commonTags.length * 2;
      score += item.priorityScore ?? 0;
      if (allowed && isAllowedLink(current.type, item.type)) score += 2;
      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Build path from content meta (e.g. /news/economy/slug). */
export function getContentPath(item: ContentMeta): string {
  if (item.path) return item.path;
  switch (item.type) {
    case 'news':
      return `/news/${item.category}/${item.slug}`;
    case 'blog':
      return `/blog/${item.slug}`;
    case 'learn':
      return `/learn/${item.category}/${item.slug}`;
    case 'calculator':
      return `/calculators/${item.slug}`;
    case 'tool':
      return `/tools/${item.slug}`;
    case 'government':
      return `/government-schemes/${item.slug}`;
    default:
      return `/${item.type}/${item.slug}`;
  }
}
