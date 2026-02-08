'use client';

import React from 'react';
import { Link } from '../../lib/router-compat';

interface SidebarLink {
  href: string;
  label: string;
}

interface CategorySidebarProps {
  title?: string;
  links: SidebarLink[];
}

/**
 * Contextual sidebar for blogs, learn, news.
 * Only for content pages – not on calculators (focus conversion).
 */
export default function CategorySidebar({ title = 'Related', links }: CategorySidebarProps) {
  if (!links?.length) return null;

  return (
    <aside className="lg:col-span-4" aria-label="Related content">
      <div className="sticky top-24 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">{title}</h4>
        <ul className="space-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link to={l.href} className="text-sm text-gray-600 hover:text-blue-600">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
