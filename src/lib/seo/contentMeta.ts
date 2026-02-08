/**
 * Content metadata model for SEO and internal linking.
 * Used by getRelatedContent() to auto-generate contextual links.
 */

export type ContentType = 'news' | 'blog' | 'learn' | 'calculator' | 'tool' | 'government';

export interface ContentMeta {
  slug: string;
  type: ContentType;
  category: string;
  subcategory?: string;
  tags: string[];
  title?: string;
  priorityScore?: number;
  /** Full path e.g. /news/economy/article-slug */
  path?: string;
}

/** Golden linking matrix: which page types must link to which. */
export const LINK_RULES: Record<ContentType, ContentType[]> = {
  news: ['blog', 'tool'],
  blog: ['calculator', 'learn', 'blog'],
  calculator: ['blog', 'tool'],
  tool: ['calculator', 'government'],
  learn: ['calculator', 'blog'],
  government: ['tool', 'calculator'],
};

/** Check if a link from `from` to `to` is allowed by LINK_RULES. */
export function isAllowedLink(from: ContentType, to: ContentType): boolean {
  return LINK_RULES[from]?.includes(to) ?? false;
}
