import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, Download, Share2, ChevronRight, Users, TrendingUp, Phone, Globe } from 'lucide-react';
import { getGovernmentSchemeBySlug, getRelatedGovernmentSchemes } from '../data/governmentSchemesData';
import { SEOHelmet } from '../components/SEOHelmet';

interface TocItem {
  idx: number;
  text: string | undefined;
  type: 'heading' | 'subheading';
}

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

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: scheme?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
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
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button onClick={() => navigate('/government-schemes')} className="flex items-center text-white mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" /> सभी योजनाएं
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              scheme.status === 'active' ? 'bg-green-500' :
              scheme.status === 'upcoming' ? 'bg-blue-500' :
              scheme.status === 'past' ? 'bg-gray-500' :
              'bg-purple-500'
            }`}>
              {scheme.status === 'active' ? 'सक्रिय योजना' :
               scheme.status === 'upcoming' ? 'आगामी योजना' :
               scheme.status === 'past' ? 'पुरानी योजना' : 'भविष्य की योजना'}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4" />
              {new Date(scheme.launchDate).toLocaleDateString('hi-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{scheme.titleHindi}</h1>
          <p className="text-xl opacity-90 mb-6">{scheme.excerptHindi}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">{scheme.categoryHindi}</span>
            {scheme.budget && (
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">बजट: {scheme.budget}</span>
            )}
            {scheme.beneficiaries && (
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">{scheme.beneficiaries} लाभार्थी</span>
            )}
            <button onClick={handleShare} className="ml-auto flex items-center gap-1 px-3 py-1 rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">
              <Share2 className="h-4 w-4" /> शेयर करें
            </button>
          </div>
        </div>
      </div>

      {/* Main Blog Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Table of Contents */}
        {toc.length > 2 && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border">
            <div className="font-semibold mb-4 text-gray-900 text-lg">विषय सूची</div>
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
        <article className="prose prose-lg max-w-none">
          {scheme.content.map((section, idx) => {
            switch (section.type) {
              case 'heading':
                return <h2 id={`section-${idx}`} key={idx} className="text-3xl font-bold mt-12 mb-4 text-green-800">{section.content}</h2>;
              case 'subheading':
                return <h3 id={`section-${idx}`} key={idx} className="text-xl font-semibold mt-8 mb-3 text-green-700">{section.content}</h3>;
              case 'paragraph':
                return <p key={idx} className="mb-5 text-lg leading-relaxed text-gray-800">{section.content}</p>;
              case 'list':
                return (
                  <ul key={idx} className="list-disc pl-6 mb-5 text-gray-800">
                    {section.items?.map((item, i) => <li key={i} className="mb-2">{item}</li>)}
                  </ul>
                );
              case 'image':
                return (
                  <div key={idx} className="my-8 text-center">
                    <img src={section.url} alt={section.caption || ''} className="mx-auto rounded-lg shadow-lg max-h-96 object-contain" />
                    {section.caption && <div className="text-sm text-gray-500 mt-2">{section.caption}</div>}
                  </div>
                );
              case 'quote':
                return (
                  <blockquote key={idx} className="border-l-4 border-green-500 pl-4 italic text-lg my-8 bg-green-50 py-4 px-6 rounded">
                    “{section.content}”
                    {section.author && <div className="text-sm text-green-700 mt-2">— {section.author}</div>}
                  </blockquote>
                );
              case 'table':
                return (
                  <div key={idx} className="overflow-x-auto my-8">
                    <table className="min-w-full border text-left">
                      <thead>
                        <tr>
                          {section.tableData?.headers.map((header, i) => (
                            <th key={i} className="border px-4 py-2 bg-gray-100 text-green-800">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.tableData?.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j} className="border px-4 py-2">{cell}</td>
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

        {/* FAQ Section */}
        {scheme.faqSchema && scheme.faqSchema.length > 0 && (
          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-6 text-green-800">अक्सर पूछे जाने वाले सवाल (FAQs)</h2>
            <ul className="space-y-4">
              {scheme.faqSchema.map((faq, idx) => (
                <li key={idx}>
                  <h3 className="font-semibold text-green-700 mb-2">{faq.question}</h3>
                  <p className="text-gray-800">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Schemes */}
        {relatedSchemes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4 text-green-800">संबंधित योजनाएं</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedSchemes.map(relatedScheme => (
                <Link
                  key={relatedScheme.id}
                  to={`/government-schemes/${relatedScheme.slug}`}
                  className="block bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img src={relatedScheme.coverImage} alt={relatedScheme.title} className="h-32 w-full object-cover" />
                  <div className="p-4">
                    <div className="font-medium text-gray-900 line-clamp-2 mb-2">{relatedScheme.titleHindi}</div>
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
      </div>
    </div>
  );
};

export default GovernmentSchemePost; 