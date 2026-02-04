import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowLeft, ExternalLink, Share2, Play } from 'lucide-react';
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

/** Inshorts-style: one full-screen card per short, vertical scroll like reels — attractive & engaging */
const NewsShortsPage: React.FC = () => {
  const { shorts, loading } = useNewsShorts();
  const [filter, setFilter] = useState<NewsShortCategory | 'latest'>('latest');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const filtered = useMemo(() => {
    const list = [...shorts].sort(
      (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    );
    if (filter === 'latest') return list;
    return list.filter((s) => s.category === filter);
  }, [shorts, filter]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardHeight = el.offsetHeight;
      const scrollTop = el.scrollTop;
      const index = Math.round(scrollTop / cardHeight);
      setActiveIndex(Math.min(Math.max(0, index), filtered.length - 1));
      if (scrollTop > 60) setShowSwipeHint(false);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [filtered.length]);

  const goTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardHeight = el.offsetHeight;
    el.scrollTo({ top: index * cardHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goTo(activeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, goTo]);

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

  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'index, follow, max-image-preview:large');
    return () => { meta?.setAttribute('content', 'index, follow'); };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center pt-16">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-300">Loading shorts…</p>
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center pt-16">
        <div className="text-white text-center max-w-md px-4">
          <p className="text-lg mb-4">No shorts in this category yet.</p>
          <Link to="/news" className="text-amber-400 hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
        </div>
      </div>
    );
  }

  const progressPct = filtered.length > 0 ? ((activeIndex + 1) / filtered.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOHelmet
        title="MoneyCal News in 60 Seconds | Finance Shorts – Inshorts Style"
        description="Read finance news in 60 seconds. Swipe through RBI, markets, economy shorts. Short, clear, actionable — like Inshorts for Indian finance."
        keywords="news in 60 seconds, finance shorts, MoneyCal, Inshorts style, RBI, markets, Indian economy"
        image={DISCOVER_IMAGE_DEFAULT}
        url={`${baseUrl}/news/shorts`}
      />

      {/* Fixed header — glass, Inshorts-style */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Play className="w-4 h-4 text-amber-400" fill="currentColor" />
            </span>
            <h1 className="text-lg font-bold text-white">Money Shorts</h1>
          </div>
          <span className="text-xs text-white/60 tabular-nums">
            {activeIndex + 1} / {filtered.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
            style={{ width: `${progressPct}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
        {/* Category tabs — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3" style={{ WebkitOverflowScrolling: 'touch' }}>
          {newsShortsFilterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as NewsShortCategory | 'latest')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.id
                  ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30'
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
        className="pt-[140px] pb-28 h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {filtered.map((short, index) => (
          <motion.article
            key={short.id}
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 1 }}
            className="h-screen min-h-[100vh] snap-start snap-always flex flex-col relative"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Background image + gradient overlay */}
            <div className="absolute inset-0">
              <img
                src={short.imageUrl || DISCOVER_IMAGE_DEFAULT}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/40" />
            </div>

            {/* Content */}
            <div className="relative flex-1 flex flex-col justify-end p-6 pb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/20 text-amber-400 uppercase tracking-wide">
                  {short.category}
                </span>
                <time className="text-xs text-white/50" dateTime={short.datePublished}>
                  {formatStaticShortDate(short.datePublished)}
                </time>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                {short.headline}
              </h2>
              <div className="text-white/90 text-sm sm:text-base space-y-2 mb-5 max-h-44 overflow-y-auto pr-2">
                {short.whyItMatters.slice(0, 2).map((p, i) => (
                  <p key={i} className="leading-relaxed">{p}</p>
                ))}
                {short.keyNumbers && short.keyNumbers.length > 0 && (
                  <p className="text-amber-300/95 font-medium">
                    📊 {short.keyNumbers.join(' · ')}
                  </p>
                )}
                <p className="text-white/85">
                  <span className="font-semibold text-amber-400/90">What to do: </span>
                  {short.whatToDo}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={getShortFullUrl(short)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 font-semibold px-5 py-3 rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/25"
                >
                  Read full story
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  to={short.fullStoryPath}
                  className="text-white/80 hover:text-white text-sm font-medium underline underline-offset-2"
                >
                  Open on site
                </Link>
                <button
                  onClick={() => handleShare(short)}
                  className="ml-auto p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/40 mt-3">Source: MoneyCal</p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Progress dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2 items-center">
        {filtered.slice(0, 12).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all ${
              i === activeIndex ? 'bg-amber-500 w-6 h-2' : 'bg-white/40 w-2 h-2 hover:bg-white/60'
            }`}
            aria-label={`Go to story ${i + 1}`}
          />
        ))}
        {filtered.length > 12 && (
          <span className="text-white/50 text-xs ml-1">+{filtered.length - 12}</span>
        )}
      </div>

      {/* Swipe hint — fades after first scroll */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 text-white/60 text-sm flex items-center gap-2"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
            Scroll or swipe for next
          </motion.p>
        )}
      </AnimatePresence>

      {/* Prev/next buttons — desktop */}
      <div className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="p-3 rounded-xl bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
          aria-label="Previous"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex >= filtered.length - 1}
          className="p-3 rounded-xl bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
          aria-label="Next"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default NewsShortsPage;
