'use client';

import React from 'react';
import { Link } from '../../lib/router-compat';
import type { ContentMeta } from '../../lib/seo/contentMeta';
import { getContentPath } from '../../lib/seo/getRelatedContent';

interface RelatedContentProps {
  title?: string;
  items: ContentMeta[];
}

/** Related tools & guides section for blogs, news, calculators. */
export default function RelatedContent({ title = 'Related Tools & Guides', items }: RelatedContentProps) {
  if (!items?.length) return null;

  return (
    <section className="mt-10 pt-6 border-t border-gray-200" aria-label="Related content">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              to={getContentPath(item)}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {item.title || item.slug.replaceAll('-', ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
