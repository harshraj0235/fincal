import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { useNewsShorts } from '../../hooks/useNewsShorts';
import {
  newsShortsFilterCategories,
  getShortFullUrl,
  DISCOVER_IMAGE_DEFAULT,
  baseUrl,
  type NewsShort,
  type NewsShortCategory,
} from '../../data/newsShortsData';
import { formatStaticShortDate } from '../../utils/randomCalculators';

/** Inshorts-style: one full-screen card per short, vertical scroll like reels */
const NewsShortsPage: React.FC = () => {
  const { shorts, loading } = useNewsShorts();
  const [filter, setFilter] = useState<NewsShortCategory | 'latest'>('latest');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const list = [...shorts].sort(
      (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    );
    if (filter === 'latest') return list;
    return list.filter((s) => s.category === filter);
  }, [shorts, filter]);

  // Track which card is in view (for progress indicator)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardHeight = el.offsetHeight;
      const scrollTop = el.scrollTop;
      const index = Math.round(scrollTop / cardHeight);
      setActiveIndex(Math.min(index, filtered.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [filtered.length]);

  const goTo = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const cardHeight = el.offsetHeight;
      el.scrollTo({ top: index * cardHeight, behavior: 'smooth' });
    },
    []
  );

  const handleShare = useCallback(async (short: NewsShort) => {
    const url = getShortFullUrl(short);
    if (navigator.share) {
      try {
        await navigator.share({
          title: short.headline,
          text: short.whyItMatters[0],
          url,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied!');
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  React.useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'index, follow, max-image-preview:large');
    return () => {
      meta?.setAttribute('content', 'index, follow');
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-16">
        <div className="text-white text-center">
          <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p>Loading shorts…</p>
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-16">
        <div className="text-white text-center max-w-md px-4">
          <p className="text-lg mb-4">No shorts in this category yet.</p>
          <Link to="/news" className="text-amber-400 hover:underline">
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <SEOHelmet
        title="MoneyCal News in 60 Seconds | Finance Shorts – Inshorts Style"
        description="Read finance news in 60 seconds. Swipe through RBI, markets, economy shorts. Short, clear, actionable — like Inshorts for Indian finance."
        keywords="news in 60 seconds, finance shorts, MoneyCal, Inshorts style, RBI, markets, Indian economy"
        image={DISCOVER_IMAGE_DEFAULT}
        url={`${baseUrl}/news/shorts`}
      />

      {/* Fixed header — Inshorts-style */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-lg font-bold text-white truncate">Money Shorts</h1>
          <span className="text-xs text-white/60 w-16 text-right">
            {activeIndex + 1} / {filtered.length}
          </span>
        </div>
        {/* Tabs — horizontal scroll like Inshorts */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          {newsShortsFilterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as NewsShortCategory | 'latest')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.id
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Reel container — full height snap scroll */}
      <div
        ref={scrollRef}
        className="pt-28 pb-24 h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {filtered.map((short, index) => (
          <article
            key={short.id}
            className="h-screen min-h-[100vh] snap-start snap-always flex flex-col relative"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Background image + overlay */}
            <div className="absolute inset-0">
              <img
                src={short.imageUrl || DISCOVER_IMAGE_DEFAULT}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative flex-1 flex flex-col justify-end p-5 pb-8">
              <span className="inline-block text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">
                {short.category}
              </span>
              <time className="text-xs text-white/60 mb-2" dateTime={short.datePublished}>
                {formatStaticShortDate(short.datePublished)}
              </time>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-4">
                {short.headline}
              </h2>
              <div className="text-white/90 text-sm sm:text-base space-y-2 mb-4 max-h-40 overflow-y-auto">
                {short.whyItMatters.slice(0, 2).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {short.keyNumbers && short.keyNumbers.length > 0 && (
                  <p className="text-amber-300/90">
                    📊 {short.keyNumbers.join(' · ')}
                  </p>
                )}
                <p className="text-white/80">
                  <span className="font-semibold">What to do: </span>
                  {short.whatToDo}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={getShortFullUrl(short)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 font-semibold px-4 py-2.5 rounded-lg hover:bg-amber-400 transition-colors text-sm"
                >
                  Read full story
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  to={short.fullStoryPath}
                  className="text-white/80 hover:text-white text-sm"
                >
                  Open on site
                </Link>
                <button
                  onClick={() => handleShare(short)}
                  className="ml-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/50 mt-3">Source: MoneyCal</p>
            </div>
          </article>
        ))}
      </div>

      {/* Progress dots — Inshorts-style */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-1.5">
        {filtered.slice(0, 15).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? 'bg-amber-500 w-6' : 'bg-white/40 w-1.5'
            }`}
            aria-label={`Go to story ${i + 1}`}
          />
        ))}
        {filtered.length > 15 && (
          <span className="text-white/50 text-xs ml-1 self-center">
            +{filtered.length - 15}
          </span>
        )}
      </div>

      {/* Swipe hint */}
      <p className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 text-white/50 text-xs">
        Scroll or swipe for next
      </p>

      {/* Optional: prev/next buttons on desktop */}
      <div className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="p-2 rounded-full bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20"
          aria-label="Previous"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex >= filtered.length - 1}
          className="p-2 rounded-full bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20"
          aria-label="Next"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default NewsShortsPage;
