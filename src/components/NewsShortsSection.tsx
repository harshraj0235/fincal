import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useNewsShorts } from '../hooks/useNewsShorts';
import {
  newsShortsFilterCategories,
  type NewsShortCategory,
} from '../data/newsShortsData';
import { formatLatestUpdate } from '../utils/randomCalculators';

const DISPLAY_LIMIT = 6;

const NewsShortsSection: React.FC = () => {
  const { shorts } = useNewsShorts();
  const [filter, setFilter] = useState<NewsShortCategory | 'latest'>('latest');

  const filtered = useMemo(() => {
    const list = [...shorts].sort(
      (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    );
    if (filter === 'latest') return list.slice(0, DISPLAY_LIMIT);
    return list.filter((s) => s.category === filter).slice(0, DISPLAY_LIMIT);
  }, [shorts, filter]);

  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              Moneycal News in 60 Seconds
            </h2>
            <p className="text-slate-600 mt-1 text-sm">
              Short. Clear. Actionable.
              <span className="ml-2 text-slate-500">· Updated {formatLatestUpdate()}</span>
            </p>
          </div>
          <Link
            to="/news/shorts"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            Read all news shorts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filters: Latest + RBI, Markets, Loans, Crypto, Tax */}
        <div className="flex flex-wrap gap-2 mb-6">
          {newsShortsFilterCategories.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as NewsShortCategory | 'latest')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.id === 'latest' && (
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1.5 align-middle" />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Shorts list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((short) => (
            <Link
              key={short.id}
              to={`/news/shorts#${short.slug}`}
              className="block rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all text-left group overflow-hidden"
            >
              {short.imageUrl && (
                <div className="w-full aspect-video bg-slate-100 overflow-hidden">
                  <img src={short.imageUrl} alt={short.headline} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              )}
              <div className="p-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  {short.category}
                </span>
                <h3 className="font-bold text-slate-900 mt-1 line-clamp-2 group-hover:text-blue-700">
                  {short.headline}
                </h3>
                <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                  {short.whyItMatters[0]}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  {short.readTimeSeconds || 45}s read
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/news/shorts"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            Read all news shorts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsShortsSection;
