import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Image as ImageIcon, Video, Link as LinkIcon, Calendar, User, Tag, FileText, Send, Sparkles, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import {
  newsShortsFilterCategories,
  saveCustomShort,
  slugifyHeadline,
  DISCOVER_IMAGES,
  baseUrl,
  type NewsShort,
  type NewsShortCategory,
} from '../../data/newsShortsData';
import { teamProfiles } from '../../data/teamProfiles';

const ADD_SHORTS_PASSWORD = 'Harson';
const ADD_SHORTS_SESSION_KEY = 'moneycal_add_shorts_unlocked';

function AddShortsDiscoverChecklist() {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left"
      >
        <span className="font-semibold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Add multiple shorts daily — Google Discover ready
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0 space-y-2 text-sm text-slate-700">
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <span><strong>Image:</strong> Use an image URL (min 1200px wide for Discover). You can use: <code className="text-xs bg-white px-1 rounded">{DISCOVER_IMAGES[0]}</code></span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <span><strong>Full story link:</strong> Always use an <strong>internal</strong> link to the full article, e.g. <code className="text-xs bg-white px-1 rounded">{baseUrl}/news/markets/article-slug</code></span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <span><strong>Copy:</strong> Short sentences, human-friendly “Why it matters” and “What should you do?” — see <code className="text-xs bg-white px-1 rounded">docs/ADDING-DAILY-SHORTS-GOOGLE-DISCOVER.md</code> in repo.</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

const AddShortsNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Form state
  const [headline, setHeadline] = useState('');
  const [whyItMattersText, setWhyItMattersText] = useState('');
  const [keyNumbersText, setKeyNumbersText] = useState('');
  const [whatToDo, setWhatToDo] = useState('');
  const [fullStoryLink, setFullStoryLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState<NewsShortCategory>('economy');
  const [authorId, setAuthorId] = useState(teamProfiles[0]?.id || '');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [datePublished, setDatePublished] = useState(() => new Date().toISOString().slice(0, 16));
  const [readTimeSeconds, setReadTimeSeconds] = useState(45);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishedViaApi, setPublishedViaApi] = useState(false);
  const [publishError, setPublishError] = useState('');

  useEffect(() => {
    const ok = sessionStorage.getItem(ADD_SHORTS_SESSION_KEY) === '1';
    setUnlocked(ok);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === ADD_SHORTS_PASSWORD) {
      sessionStorage.setItem(ADD_SHORTS_SESSION_KEY, '1');
      setUnlocked(true);
      setPasswordError('');
    } else {
      setPasswordError('Wrong password. Only the owner can add shorts.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADD_SHORTS_SESSION_KEY);
    setUnlocked(false);
    setPassword('');
  };

  const handleAutoSlug = () => {
    if (headline.trim()) {
      setSlug(slugifyHeadline(headline));
      setSlugManual(false);
    }
  };

  const whyItMatters = whyItMattersText
    .split('\n')
    .map((s) => s.trim().replace(/^[•\-]\s*/, ''))
    .filter(Boolean);
  const keyNumbers = keyNumbersText
    .split('\n')
    .map((s) => s.trim().replace(/^[•\-]\s*/, ''))
    .filter(Boolean);

  const fullStoryPath = (() => {
    if (!fullStoryLink.trim()) return `/news/${category}/${slug || 'article'}`;
    if (fullStoryLink.startsWith('/')) return fullStoryLink;
    try {
      return new URL(fullStoryLink).pathname;
    } catch {
      return fullStoryLink;
    }
  })();

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishError('');
    if (!headline.trim()) {
      setPublishError('Headline is required.');
      return;
    }
    if (whyItMatters.length === 0) {
      setPublishError('Add at least one "Why it matters" point.');
      return;
    }
    if (!whatToDo.trim()) {
      setPublishError('"What should you do?" is required.');
      return;
    }
    const finalSlug = (slugManual ? slug : slugifyHeadline(headline)).trim() || slugifyHeadline(headline);
    const id = `custom-${category}-${finalSlug}-${Date.now()}`;
    const link = fullStoryLink.trim() || `${baseUrl}${fullStoryPath}`;
    const path = fullStoryPath.startsWith('/') ? fullStoryPath : `/${fullStoryPath}`;

    const short: NewsShort = {
      id,
      slug: finalSlug,
      category,
      headline: headline.trim(),
      whyItMatters,
      keyNumbers: keyNumbers.length ? keyNumbers : undefined,
      whatToDo: whatToDo.trim(),
      fullStoryLink: link,
      fullStoryPath: path,
      datePublished: new Date(datePublished).toISOString(),
      readTimeSeconds: readTimeSeconds || 45,
      imageUrl: imageUrl.trim() || undefined,
      videoUrl: videoUrl.trim() || undefined,
      authorId: authorId || undefined,
      source: 'custom',
    };

    setPublishError('');
    try {
      const apiUrl = typeof window !== 'undefined' && window.location?.origin
        ? `${window.location.origin}/api/publish-short`
        : '/api/publish-short';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: ADD_SHORTS_PASSWORD, short }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setPublishedViaApi(true);
        setPublishSuccess(true);
        setPublishError('');
        setTimeout(() => {
          setPublishSuccess(false);
          setPublishedViaApi(false);
          navigate('/news/shorts');
        }, 2500);
        return;
      }
      if (res.status === 401) {
        setPublishError('Invalid password.');
        return;
      }
      if (res.status >= 400) {
        setPublishError(data.error || `Publish failed (${res.status}). Saving locally instead.`);
      }
    } catch (_err) {
      setPublishError('API unavailable. Saving to this device only.');
    }
    try {
      saveCustomShort(short);
      setPublishSuccess(true);
      setTimeout(() => {
        setPublishSuccess(false);
        navigate('/news/shorts');
      }, 1500);
    } catch (err) {
      setPublishError('Failed to save. Try again.');
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center">
              <Lock className="w-7 h-7 text-slate-400" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-white text-center mb-2">Add Shorts News</h1>
          <p className="text-slate-400 text-sm text-center mb-6">This page is private. Enter password to continue.</p>
          <form onSubmit={handleUnlock}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              autoFocus
            />
            {passwordError && <p className="text-red-400 text-sm mt-2">{passwordError}</p>}
            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  const categoryOptions = newsShortsFilterCategories.filter((c) => c.id !== 'latest');

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Add Shorts News
          </h1>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Lock page
          </button>
        </div>

        <AddShortsDiscoverChecklist />

        <form onSubmit={handlePublish} className="space-y-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Headline */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Headline *</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. RBI keeps repo rate unchanged for the 6th time"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Why it matters (multiple lines) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Why it matters * (one per line)</label>
            <textarea
              value={whyItMattersText}
              onChange={(e) => setWhyItMattersText(e.target.value)}
              placeholder="• Home & personal loan EMIs stay same&#10;• Inflation still above comfort zone&#10;• RBI focusing on growth + stability"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
            />
          </div>

          {/* Key numbers (optional) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Key numbers (optional, one per line)</label>
            <textarea
              value={keyNumbersText}
              onChange={(e) => setKeyNumbersText(e.target.value)}
              placeholder="• Repo Rate: 6.50%&#10;• Inflation Target: 4%"
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
            />
          </div>

          {/* What should you do */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">What should you do? *</label>
            <input
              type="text"
              value={whatToDo}
              onChange={(e) => setWhatToDo(e.target.value)}
              placeholder="e.g. Good time to review loan tenure; FD investors stay patient."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Full story link */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Full story link
            </label>
            <input
              type="url"
              value={fullStoryLink}
              onChange={(e) => setFullStoryLink(e.target.value)}
              placeholder={`${baseUrl}/news/markets/article-slug (internal full article link)`}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Image URL (recommended for Discover: 1200px wide)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder={DISCOVER_IMAGES[0]}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="mt-2 h-24 w-auto rounded-lg object-cover border border-slate-200" />
            )}
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Video className="w-4 h-4" /> Video URL (optional, YouTube etc.)
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as NewsShortCategory)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              {categoryOptions.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> Author
            </label>
            <select
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              {teamProfiles.map((p) => (
                <option key={p.id} value={p.id}>{p.name} – {p.role}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Publish date & time
            </label>
            <input
              type="datetime-local"
              value={datePublished}
              onChange={(e) => setDatePublished(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Slug (URL-friendly)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManual(true);
                }}
                placeholder="Auto from headline or type your own"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={handleAutoSlug}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1"
                title="Generate from headline"
              >
                <Sparkles className="w-4 h-4" /> Auto
              </button>
            </div>
          </div>

          {/* Read time */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Read time (seconds)</label>
            <input
              type="number"
              min={30}
              max={90}
              value={readTimeSeconds}
              onChange={(e) => setReadTimeSeconds(Number(e.target.value) || 45)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {publishError && <p className="text-red-600 text-sm">{publishError}</p>}
          {publishSuccess && (
            <p className="text-green-600 font-semibold flex items-center gap-2">
              <Send className="w-4 h-4" />
              {publishedViaApi
                ? 'Published to GitHub! Deploy in 1–2 min. Redirecting…'
                : 'Published! Redirecting to shorts…'}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-5 h-5" /> Publish to Moneycal Shorts
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-500 text-center">
          With API configured (GitHub token + env), shorts publish to GitHub and appear for everyone after deploy. Otherwise they save to this device only.
        </p>
      </div>
    </div>
  );
};

export default AddShortsNewsPage;
