import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { findSiloItemBySlug } from '../data/lazySilosData';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import PMEGPMarginMoneyCalculator from '../components/calculators/PMEGPMarginMoneyCalculator';
import SGBLTCGCalculator from '../components/calculators/SGBLTCGCalculator';
import ScamDiagnosticTool from '../components/calculators/ScamDiagnosticTool';
import YouthCreditSimulator from '../components/calculators/YouthCreditSimulator';
import MarketSentimentDashboard from '../components/silos/MarketSentimentDashboard';
import TaxSentimentTracker from '../components/silos/TaxSentimentTracker';
import DigitalProvenance from '../components/silos/DigitalProvenance';
import { getCurrentDateISO, formatLatestUpdate } from '../utils/randomCalculators';
import MasterArticleLayout from '../components/articles/MasterArticleLayout';
import PremiumHero from '../components/articles/PremiumHero';
import AISummaryBox from '../components/articles/AISummaryBox';
import StickyShareBar from '../components/articles/StickyShareBar';
import TrendingSidebar from '../components/articles/TrendingSidebar';
import { teamProfiles } from '../data/teamProfiles';

const getAuthorForSlug = (slug: string) => {
  if (!teamProfiles.length) return { name: 'Harsh Raj', role: 'Financial Expert', image: '/authors/harsh.jpg' };
  const idx = Math.abs(slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % teamProfiles.length;
  const p = teamProfiles[idx];
  return { 
    name: p.name, 
    role: p.role, 
    image: p.image || '/authors/default.jpg' 
  };
};

const SiloPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const freshDateISO = getCurrentDateISO();
  const freshDateDisplay = formatLatestUpdate();

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      const result = await findSiloItemBySlug(slug);
      if (result) {
        setData(result.item);
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Loading AI-Proof Content...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen pt-40">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h1>
        <button onClick={() => navigate('/')} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          Back to Home
        </button>
      </div>
    );
  }

  const authorInfo = useMemo(() => getAuthorForSlug(data.slug), [data.slug]);

  const hero = (
    <PremiumHero 
      title={data.titleHindi || data.title}
      excerpt={data.excerptHindi || data.description}
      coverImage={data.coverImage || '/default-silo-hero.jpg'}
      categories={[data.category || 'Finance']}
      authorName={authorInfo.name}
      authorImage={authorInfo.image}
      date={freshDateDisplay}
      readingTime={8}
    />
  );

  const leftSidebar = <StickyShareBar title={data.title} url={window.location.href} />;
  const rightSidebar = <TrendingSidebar trendingItems={[]} />;

  const aiSummary = {
    title: "AI Quick Take",
    points: data.keyFeatures || [
      "AI-proof financial strategy for 2026",
      "Verified human analysis of market trends",
      "Actionable insights for Indian investors"
    ]
  };

  return (
    <>
      <WhatsAppBanner />
      <SEOHelmet
        title={data.title}
        description={data.description}
        keywords={data.keywords?.join(', ')}
        url={`/silo/${data.slug}`}
        type="article"
        articlePublishedTime={data.lastUpdated || freshDateISO}
        articleModifiedTime={freshDateISO}
        section={data.category}
        isFinanceContent={true}
      />

      <MasterArticleLayout
        hero={hero}
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
      >
        <div className="mb-12">
          <AISummaryBox 
            summary={aiSummary.title}
            points={aiSummary.points}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10 mb-10">
          <article className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-p:leading-[1.8] prose-p:text-slate-600 prose-p:mb-12 prose-h2:mb-12 prose-h3:mb-12 prose-h4:mb-12 prose-h5:mb-12">
            {data.content ? (
              data.content.map((section: any, idx: number) => {
                if (section.type === 'heading') return <h2 key={idx}>{section.content}</h2>;
                if (section.type === 'subheading') return <h3 key={idx}>{section.content}</h3>;
                if (section.type === 'paragraph') return <p key={idx}>{section.content}</p>;
                return null;
              })
            ) : (
              <p>{data.description}</p>
            )}

            {/* Dynamic Interactive Tools */}
            <div className="my-12 p-1 bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
              {data.id === 'pmegp-subsidy-2026' && <PMEGPMarginMoneyCalculator />}
              {data.id === 'sgb-taxation-2026' && <SGBLTCGCalculator />}
              {data.id === 'digital-arrest-scam-2026' && <ScamDiagnosticTool />}
              {data.id === 'sbi-student-credit-2026' && <YouthCreditSimulator />}
              {data.id === 'india-macro-outlook-2026' && <MarketSentimentDashboard />}
              {data.id === 'new-tax-regime-2026' && <TaxSentimentTracker />}
            </div>

            <DigitalProvenance 
              author={data.author || "MoneyCal Financial Desk"} 
              lastVerified={data.lastUpdated}
            />

            {data.steps && (
              <div className="mt-8">
                <h3>Procedural Steps:</h3>
                <ol>
                  {data.steps.map((step: string, i: number) => <li key={i}>{step}</li>)}
                </ol>
              </div>
            )}

            {data.keyFeatures && (
              <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-blue-900 mt-0">Key Features & Benefits</h3>
                <ul className="list-disc pl-5">
                  {data.keyFeatures.map((f: string, i: number) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
          </article>

          {/* AI-Bypass: Interactive PDF Summary */}
          <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-2xl">
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-lg">Download Verification Checklist</div>
                <div className="text-sm opacity-70">Customized roadmap for {data.title}</div>
              </div>
            </div>
            <button className="whitespace-nowrap bg-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25">
              Generate PDF (AI-Free)
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        {data.faqSchema && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10 mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {data.faqSchema.map((faq: any, idx: number) => (
                <div key={idx} className="group">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </MasterArticleLayout>
    </>
  );
};

export default SiloPost;
