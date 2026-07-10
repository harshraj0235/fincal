// src/pages/ExcelToolPost.tsx

import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';
import { getExcelToolBlogPostBySlug, getRelatedExcelToolBlogPosts } from '../data/exceltooldata';

// Premium Layout Components
import MasterArticleLayout from '../components/articles/MasterArticleLayout';
import PremiumHero from '../components/articles/PremiumHero';
import AISummaryBox from '../components/articles/AISummaryBox';
import StickyShareBar from '../components/articles/StickyShareBar';
import TrendingSidebar from '../components/articles/TrendingSidebar';
import { teamProfiles } from '../data/teamProfiles';
import { seoBlogPosts } from '../data/seo-blog-posts';

interface TocItem {
  idx: number;
  text: string | undefined;
  type: 'heading' | 'subheading';
}

const ExcelToolPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getExcelToolBlogPostBySlug(slug || '');
  const relatedPosts = getRelatedExcelToolBlogPosts(slug || '', 3);

  const trendingItems = useMemo(() => {
    return seoBlogPosts
      .slice(0, 5)
      .map(p => ({
        id: p.id.toString(),
        slug: p.slug,
        title: p.title,
        category: p.categories[0] || 'Finance'
      }));
  }, []);

  // Table of Contents (for headings/subheadings)
  const toc = useMemo(() => {
    if (!post) return [];
    return post.content
      .map((section, idx) => {
        if (section.type === 'heading' || section.type === 'subheading') {
          return { idx, text: section.content, type: section.type } as TocItem;
        }
        return null;
      })
      .filter((item): item is TocItem => item !== null);
  }, [post]);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <button onClick={() => navigate('/exceltool')} className="btn mt-4">Back to Excel Tool</button>
      </div>
    );
  }

  const authorProfile = useMemo(() => {
    const profile = teamProfiles.find(p => p.name === post.author);
    return {
      name: profile?.name || post.author,
      role: profile?.role || post.authorTitle || 'Financial Expert',
      image: profile?.image || post.authorImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      bio: "Expert financial analyst specializing in Excel tools and automation.",
      gradient: "from-blue-600 to-indigo-600"
    };
  }, [post.author, post.authorTitle, post.authorImage]);

  return (
    <MasterArticleLayout
      hero={
        <PremiumHero
          categories={post.categories}
          title={post.title}
          authorName={authorProfile.name}
          authorImage={authorProfile.image}
          date={post.date}
          coverImage={post.coverImage}
          readingTime={12}
        />
      }
      leftSidebar={<StickyShareBar url={window.location.href} title={post.title} />}
      rightSidebar={<TrendingSidebar trendingItems={trendingItems} />}
    >
      {/* AI Summary Box */}
      <AISummaryBox
        summary={`This guide provides a comprehensive walkthrough and download for the "${post.title}" Excel tool. It covers key features, setup instructions, and practical applications to help you streamline your financial workflows.`}
        points={[
          "Direct download link for the professional Excel tool",
          "Step-by-step implementation guide",
          "Best practices for financial data management",
          "Automated calculations for precision results"
        ]}
      />

      {/* Table of Contents */}
      {toc.length > 2 && (
        <div className="mb-12 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            Table of Contents
          </h3>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toc.map(item => item && (
              <a
                key={item.idx}
                href={`#section-${item.idx}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`section-${item.idx}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium ${item.type === 'subheading' ? 'pl-4 text-sm' : ''}`}
              >
                <ChevronRight className={`w-4 h-4 ${item.type === 'subheading' ? 'text-slate-300' : 'text-blue-500'}`} />
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Download Button (Fixed/Floating for high intent) */}
      {post.downloadLink && (
        <div className="my-10 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Download className="w-32 h-32 text-white" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-white mb-2">Ready to use this tool?</h3>
              <p className="text-blue-100 font-medium">Download the latest version of {post.title} instantly.</p>
            </div>
            <a
              href={post.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black shadow-xl hover:scale-105 transition-all flex items-center gap-3 active:scale-95"
            >
              <Download className="w-5 h-5" />
              Download Excel File
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
        <article className="prose prose-slate prose-lg max-w-none 
        prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
        prose-h2:text-3xl prose-h2:mb-12 prose-h3:mb-12 prose-h4:mb-12 prose-h5:mb-12 prose-h6:mb-12
        prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-12
        prose-a:text-blue-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:text-slate-800
        prose-img:rounded-[2.5rem] prose-img:shadow-2xl">
        {post.content.map((section, idx) => {
          if (section.type === 'paragraph') return <p key={idx} id={`section-${idx}`}>{section.content}</p>;
          if (section.type === 'heading') return <h2 key={idx} id={`section-${idx}`} className="flex items-center gap-3 py-6 mt-12 border-t border-slate-100">{section.content}</h2>;
          if (section.type === 'subheading') return <h3 key={idx} id={`section-${idx}`} className="text-xl font-bold text-slate-900 mt-8 mb-12">{section.content}</h3>;
          if (section.type === 'list') return <ul key={idx} id={`section-${idx}`} className="space-y-4 my-8">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="text-slate-600 font-medium">{item}</span>
              </li>
            ))}
          </ul>;
          if (section.type === 'image') return (
            <figure key={idx} id={`section-${idx}`} className="my-12">
              <div className="group relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img src={section.url} alt={section.caption || ''} className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
              </div>
              {section.caption && <figcaption className="text-center text-slate-500 text-sm font-bold mt-6 italic bg-slate-50 py-3 px-6 rounded-full w-fit mx-auto border border-slate-100">
                {section.caption}
              </figcaption>}
            </figure>
          );
          if (section.type === 'quote') return (
            <blockquote key={idx} id={`section-${idx}`} className="my-12">
              <p className="text-2xl leading-relaxed text-slate-800 italic">“{section.content}”</p>
              {section.author && <cite className="block text-right text-blue-600 font-black tracking-widest uppercase text-sm not-italic mt-4">— {section.author}</cite>}
            </blockquote>
          );
          return null;
        })}
      </article>

      {/* Related Articles Component (Modern Version) */}
      {relatedPosts.length > 0 && (
        <div className="mt-20 pt-20 border-t border-slate-100">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Expand Your Knowledge</h3>
            <Link to="/exceltool" className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1">
              View All Tools <ArrowLeft className="w-3 h-3 rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map(rp => (
              <Link key={rp.id} to={`/exceltool/${rp.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-video mb-4">
                  <img src={rp.coverImage} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="flex gap-2 mb-3">
                  {rp.categories.slice(0, 1).map(cat => (
                    <span key={cat} className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      {cat}
                    </span>
                  ))}
                </div>
                <h4 className="font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {rp.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </MasterArticleLayout>
  );
};

export default ExcelToolPost;
