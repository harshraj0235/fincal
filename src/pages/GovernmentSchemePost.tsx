import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2, ChevronRight, Copy as CopyIcon } from 'lucide-react';
import { getGovernmentSchemeBySlug, getRelatedGovernmentSchemes } from '../data/governmentSchemesData';
import SEOHelmet from '../components/SEOHelmet';

interface TocItem {
  idx: number;
  text: string | undefined;
  type: 'heading' | 'subheading';
}

const AUTHOR = {
  name: 'Harsh Raj',
  linkedin: 'https://www.linkedin.com/in/harshitpatel9/',
  twitter: 'https://x.com/harshitx9',
  bio: 'Harsh Raj is a Software Engineer with years of experience helping people make smart investment decisions. Passionate about financial literacy and transparent, trustworthy guidance.'
};

const GovernmentSchemePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const scheme = getGovernmentSchemeBySlug(slug || '');
  const relatedSchemes = getRelatedGovernmentSchemes(slug || '', 3);

  // Table of Contents
  const toc = useMemo(() => {
    if (!scheme) return [];
    return scheme.content
      .map((section, idx) => {
        if (section.type === 'heading' || section.type === 'subheading') {
          return { idx, text: section.content, type: section.type } as TocItem;
        }
        return null;
      })
      .filter((item): item is TocItem => item !== null);
  }, [scheme]);

  // Share Link handlers
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const shareUrls = useMemo(() => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(scheme?.title ?? '');
    return {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
    };
  }, [scheme]);

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: scheme?.title,
        url: window.location.href,
      });
    } else {
      handleCopyLink();
    }
  };

  if (!scheme) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Scheme Not Found</h1>
        <button onClick={() => navigate('/government-schemes')} className="btn mt-4">Back to Schemes</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHelmet title={scheme.seoTitle} description={scheme.seoDescription} />
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8">
          <button onClick={() => navigate('/government-schemes')} className="flex items-center text-white mb-6 hover:underline text-base sm:text-lg">
            <ArrowLeft className="h-4 w-4 mr-1" /> सभी योजनाएं
          </button>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
            <div className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
              scheme.status === 'active' ? 'bg-green-500' :
              scheme.status === 'upcoming' ? 'bg-blue-500' :
              scheme.status === 'past' ? 'bg-gray-500' :
              'bg-purple-500'
            }`}>
              {scheme.status === 'active' ? 'सक्रिय योजना' :
                scheme.status === 'upcoming' ? 'आगामी योजना' :
                scheme.status === 'past' ? 'पुरानी योजना' : 'भविष्य की योजना'}
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <Calendar className="h-4 w-4" />
              {new Date(scheme.launchDate).toLocaleDateString('hi-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">{scheme.titleHindi}</h1>
          <p className="text-lg sm:text-xl opacity-90 mb-6">{scheme.excerptHindi}</p>
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs sm:text-sm">{scheme.categoryHindi}</span>
            {scheme.budget && (
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs sm:text-sm">बजट: {scheme.budget}</span>
            )}
            {scheme.beneficiaries && (
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs sm:text-sm">{scheme.beneficiaries} लाभार्थी</span>
            )}
            {/* Social/Copy/Share Buttons */}
            <div className="ml-auto flex gap-1 items-center">
              <button onClick={handleNativeShare} className="flex items-center gap-1 px-2 py-1 rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-xs sm:text-sm" title="शेयर करें">
                <Share2 className="h-4 w-4" /> शेयर करें
              </button>
              <button onClick={handleCopyLink} className="flex items-center gap-1 px-2 py-1 rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-xs sm:text-sm" title="कॉपी करें">
                <CopyIcon className="h-4 w-4" /> कॉपी लिंक
              </button>
              <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-[#25d366] hover:bg-[#22b358] transition-colors text-xs sm:text-sm text-white" title="WhatsApp">
                WhatsApp
              </a>
              <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-[#1da1f2] hover:bg-[#1875b2] transition-colors text-xs sm:text-sm text-white" title="X">
                X
              </a>
              <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-[#4267B2] hover:bg-[#324d8c] transition-colors text-xs sm:text-sm text-white" title="Facebook">
                Facebook
              </a>
              <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-[#0077b5] hover:bg-[#005983] transition-colors text-xs sm:text-sm text-white" title="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Blog Content */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
        {/* Table of Contents */}
        {toc.length > 2 && (
          <div className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
            <div className="font-semibold mb-4 text-gray-900 text-base sm:text-lg">विषय सूची</div>
            <ul className="space-y-2">
              {toc.map(item => item && (
                <li key={item.idx}>
                  <a
                    href={`#section-${item.idx}`}
                    className="text-blue-700 hover:underline text-sm flex items-center gap-2"
                    onClick={e => {
                      e.preventDefault();
                      const el = document.getElementById(`section-${item.idx}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    {item.type === 'subheading' && <ChevronRight className="h-3 w-3 text-blue-400" />} {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Blog Content Rendering */}
        <article className="prose prose-base sm:prose-lg max-w-none">
          {scheme.content.map((section, idx) => {
            switch (section.type) {
              case 'heading':
                return <h2 id={`section-${idx}`} key={idx} className="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-green-800">{section.content}</h2>;
              case 'subheading':
                return <h3 id={`section-${idx}`} key={idx} className="text-lg sm:text-xl font-semibold mt-8 mb-3 text-green-700">{section.content}</h3>;
              case 'paragraph':
                return <p key={idx} className="mb-5 text-base sm:text-lg leading-relaxed text-gray-800">{section.content}</p>;
              case 'list':
                return (
                  <ul key={idx} className="list-disc pl-6 mb-5 text-gray-800">
                    {section.items?.map((item, i) => <li key={i} className="mb-2">{item}</li>)}
                  </ul>
                );
              case 'image':
                return (
                  <div key={idx} className="my-8 text-center">
                    <img src={section.url} alt={section.caption || ''} className="mx-auto rounded-lg shadow-lg max-h-80 sm:max-h-96 object-contain" />
                    {section.caption && <div className="text-sm text-gray-500 mt-2">{section.caption}</div>}
                  </div>
                );
              case 'quote':
                return (
                  <blockquote key={idx} className="border-l-4 border-green-500 pl-4 italic text-base sm:text-lg my-8 bg-green-50 py-4 px-4 sm:px-6 rounded">
                    “{section.content}”
                    {section.author && <div className="text-sm text-green-700 mt-2">— {section.author}</div>}
                  </blockquote>
                );
              case 'table':
                return (
                  <div key={idx} className="overflow-x-auto my-8">
                    <table className="min-w-full border text-left text-xs sm:text-base">
                      <thead>
                        <tr>
                          {section.tableData?.headers.map((header, i) => (
                            <th key={i} className="border px-2 sm:px-4 py-2 bg-gray-100 text-green-800">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.tableData?.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j} className="border px-2 sm:px-4 py-2">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              default:
                return null;
            }
          })}
        </article>

        {/* Author Box */}
        <div className="mt-12 mb-10 bg-white p-5 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-green-100">
          <div>
            <div className="font-bold text-lg text-green-800">{AUTHOR.name}</div>
            <div className="text-gray-700 text-sm mb-2">{AUTHOR.bio}</div>
            <div className="flex gap-3 mt-1">
              <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline text-xs sm:text-sm">LinkedIn</a>
              <a href={AUTHOR.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs sm:text-sm">Twitter (X)</a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {scheme.faqSchema && scheme.faqSchema.length > 0 && (
          <div className="mt-12 bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-green-800">अक्सर पूछे जाने वाले सवाल (FAQs)</h2>
            <ul className="space-y-4">
              {scheme.faqSchema.map((faq, idx) => (
                <li key={idx}>
                  <h3 className="font-semibold text-green-700 mb-2 text-base sm:text-lg">{faq.question}</h3>
                  <p className="text-gray-800 text-sm sm:text-base">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Schemes */}
        {relatedSchemes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-green-800">संबंधित योजनाएं</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedSchemes.map(relatedScheme => (
                <Link
                  key={relatedScheme.id}
                  to={`/government-schemes/${relatedScheme.slug}`}
                  className="block bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img src={relatedScheme.coverImage} alt={relatedScheme.title} className="h-28 sm:h-32 w-full object-cover" />
                  <div className="p-3">
                    <div className="font-medium text-gray-900 line-clamp-2 mb-2 text-sm sm:text-base">{relatedScheme.titleHindi}</div>
                    <div className="text-xs text-gray-500 mb-2">{relatedScheme.categoryHindi}</div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        relatedScheme.status === 'active' ? 'bg-green-100 text-green-700' :
                        relatedScheme.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {relatedScheme.status === 'active' ? 'सक्रिय' :
                          relatedScheme.status === 'upcoming' ? 'आगामी' : 'पुरानी'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer at the very bottom */}
        <div className="mb-10 mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs sm:text-sm text-yellow-800">
          <b>Disclaimer:</b> This content is for educational purposes only. I am not a certified financial expert or advisor. All information is based on personal experience, research, and knowledge, and should not be considered as professional or legal advice. Please consult with a qualified expert before making any financial decisions. All risks associated with your actions are your own responsibility. If you find any mistakes or inaccuracies, please contact me as soon as possible so I can make corrections. I try my best to comply with all applicable laws in India.
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemePost;
