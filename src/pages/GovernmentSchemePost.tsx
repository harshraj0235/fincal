import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, Download, Share2, ChevronRight, Users, TrendingUp, Phone, Globe } from 'lucide-react';
import { getGovernmentSchemeBySlug, getRelatedGovernmentSchemes } from '../data/governmentSchemesData';

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
          
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
              {scheme.categoryHindi}
            </span>
            {scheme.budget && (
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                बजट: {scheme.budget}
              </span>
            )}
            {scheme.beneficiaries && (
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {scheme.beneficiaries} लाभार्थी
              </span>
            )}
            <button onClick={handleShare} className="ml-auto flex items-center gap-1 px-3 py-1 rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">
              <Share2 className="h-4 w-4" /> शेयर करें
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">लक्षित समूह</h3>
            </div>
            <div className="space-y-2">
              {scheme.targetAudience.slice(0, 3).map(audience => (
                <div key={audience} className="text-sm text-gray-600">• {audience}</div>
              ))}
              {scheme.targetAudience.length > 3 && (
                <div className="text-sm text-green-600">+{scheme.targetAudience.length - 3} और</div>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">मुख्य लाभ</h3>
            </div>
            <div className="space-y-2">
              {scheme.benefits.slice(0, 3).map(benefit => (
                <div key={benefit} className="text-sm text-gray-600">• {benefit}</div>
              ))}
              {scheme.benefits.length > 3 && (
                <div className="text-sm text-blue-600">+{scheme.benefits.length - 3} और</div>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-3">
              <Tag className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">पात्रता</h3>
            </div>
            <div className="space-y-2">
              {scheme.eligibility.slice(0, 3).map(eligibility => (
                <div key={eligibility} className="text-sm text-gray-600">• {eligibility}</div>
              ))}
              {scheme.eligibility.length > 3 && (
                <div className="text-sm text-purple-600">+{scheme.eligibility.length - 3} और</div>
              )}
            </div>
          </div>
        </div>

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

        {/* Scheme Content */}
        <article className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm border">
          {scheme.content.map((section, idx) => {
            if (section.type === 'paragraph') return <p key={idx} id={`section-${idx}`}>{section.content}</p>;
            if (section.type === 'heading') return <h2 key={idx} id={`section-${idx}`}>{section.content}</h2>;
            if (section.type === 'subheading') return <h3 key={idx} id={`section-${idx}`}>{section.content}</h3>;
            if (section.type === 'list') return <ul key={idx} id={`section-${idx}`}>{section.items?.map((item, i) => <li key={i}>{item}</li>)}</ul>;
            if (section.type === 'image') return (
              <figure key={idx} id={`section-${idx}`} className="my-8">
                <img src={section.url} alt={section.caption || ''} className="rounded-lg shadow" />
                {section.caption && <figcaption className="text-center text-gray-500 text-sm mt-2">{section.caption}</figcaption>}
              </figure>
            );
            if (section.type === 'quote') return (
              <blockquote key={idx} id={`section-${idx}`} className="border-l-4 border-green-400 pl-4 italic text-lg my-6">
                "{section.content}"
                {section.author && <div className="text-right text-sm text-green-700 mt-2">— {section.author}</div>}
              </blockquote>
            );
            if (section.type === 'table' && section.tableData) return (
              <div key={idx} id={`section-${idx}`} className="my-8 overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr>
                      {section.tableData.headers.map((header, i) => (
                        <th key={i} className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.tableData.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            if (section.type === 'highlight') return (
              <div key={idx} id={`section-${idx}`} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                <div className="font-semibold text-yellow-800 mb-2">महत्वपूर्ण जानकारी</div>
                <div className="text-yellow-700">{section.content}</div>
              </div>
            );
            return null;
          })}
        </article>

        {/* Application Process */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-semibold text-xl mb-4 text-gray-900">आवेदन प्रक्रिया</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">आवश्यक दस्तावेज</h4>
              <ul className="space-y-2">
                {scheme.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">आवेदन के चरण</h4>
              <ol className="space-y-2">
                {scheme.applicationProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium min-w-fit">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        {(scheme.officialWebsite || scheme.helpline) && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-xl mb-4 text-gray-900">संपर्क जानकारी</h3>
            <div className="flex flex-wrap gap-4">
              {scheme.officialWebsite && (
                <a
                  href={scheme.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  आधिकारिक वेबसाइट
                </a>
              )}
              {scheme.helpline && (
                <a
                  href={`tel:${scheme.helpline}`}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  हेल्पलाइन: {scheme.helpline}
                </a>
              )}
            </div>
          </div>
        )}

        {/* FAQ Schema */}
        {scheme.faqSchema.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-xl mb-4 text-gray-900">अक्सर पूछे जाने वाले प्रश्न</h3>
            <div className="space-y-4">
              {scheme.faqSchema.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Schemes */}
        <div className="mt-12">
          <h3 className="font-semibold mb-6 text-xl text-gray-900">संबंधित योजनाएं</h3>
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
      </div>
    </div>
  );
};

export default GovernmentSchemePost; 