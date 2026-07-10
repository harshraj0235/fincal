import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrendingUp, ChevronRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { fetchIpoData } from '../../services/ipoApi';
import { IpoDetails, IpoResponse } from '../../types/ipo';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const IpoTargetPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [ipoData, setIpoData] = useState<IpoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const isSme = type?.includes('sme');
  const pageTitle = isSme ? 'SME IPO List 2025' : 'Mainboard IPO List 2025';
  const pageTitleHindi = isSme ? 'SME IPO की पूरी लिस्ट' : 'मेनबोर्ड IPO की पूरी लिस्ट';

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchIpoData();
        setIpoData(data);
      } catch (error) {
        console.error("Failed to fetch IPO data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getFilteredData = (): IpoDetails[] => {
    if (!ipoData) return [];
    const all = [...ipoData.open, ...ipoData.upcoming, ...ipoData.closed];
    return all.filter(ipo => 
      isSme ? ipo.type.toLowerCase() === 'sme' : ipo.type.toLowerCase() === 'mainboard'
    );
  };

  const filtered = getFilteredData();

  const seoTitle = `${pageTitleHindi} (${pageTitle}) - Today's GMP & Analysis | MoneyCal`;
  const seoDescription = `Get the latest ${pageTitle} in India. Check today's Grey Market Premium (GMP), subscription status, allotment dates, and expert reviews in Hindi.`;

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title={seoTitle}
        description={seoDescription}
        url={`/ipo/${type}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'IPO Hub', url: '/ipo' },
          { name: pageTitle, url: `/ipo/${type}` },
        ]}
      />

      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header Section */}
        <div className="bg-white border-b border-slate-200 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/ipo" reloadDocument className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-bold transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to IPO Hub
            </Link>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                  {pageTitleHindi}
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Comprehensive tracking for all {isSme ? 'Small and Medium Enterprise (SME)' : 'Mainboard'} IPOs. 
                  View real-time GMP, expected listing gains, and detailed financial analysis.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex items-start gap-4 max-w-xs">
                  <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-sm text-blue-800 font-medium">
                    Verified data from NSE & BSE sources. Updated multiple times daily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          {loading ? (
            <div className="flex items-center justify-center py-32 bg-white rounded-[40px] shadow-xl border border-slate-100">
               <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((ipo) => (
                <Link
                  key={ipo.id}
                  to={`/ipo/${ipo.slug}`}
                  className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-blue-50 text-blue-700`}>
                          {ipo.type}
                        </span>
                        {ipo.listingDate && (
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                            Listing: {ipo.listingDate}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {ipo.name}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                      <span className="text-slate-500 font-medium">Price Band</span>
                      <span className="font-bold text-slate-900">{ipo.priceBand}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                      <span className="text-slate-500 font-medium">Issue Size</span>
                      <span className="font-bold text-slate-900">{ipo.issueSize}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center py-2">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                        <TrendingUp className="w-4 h-4" />
                        Today's GMP
                      </div>
                      <div className="text-right text-emerald-700 font-black">
                        ₹{ipo.expectedGmp} <span className="text-xs">({ipo.expectedGmpPercentage}%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-blue-600">
                    <span>View Analysis</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Targeted FAQ */}
          <div className="mt-20 bg-white rounded-[40px] p-8 sm:p-12 shadow-xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
              <div className="w-3 h-10 bg-blue-600 rounded-full" />
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">{isSme ? 'SME IPO' : 'Mainboard IPO'} में निवेश कैसे करें?</h3>
                <p className="text-slate-600 leading-relaxed">
                  आप अपने डीमैट खाते (जैसे Zerodha, Angel One) के माध्यम से ASBA प्रक्रिया का उपयोग करके ऑनलाइन आवेदन कर सकते हैं। बस IPO सेक्शन में जाएं, अपना पसंदीदा शेयर चुनें और बिड लगाएं।
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">क्या GMP लिस्टिंग की गारंटी देता है?</h3>
                <p className="text-slate-600 leading-relaxed">
                  जी नहीं, ग्रे मार्केट प्रीमियम (GMP) केवल एक अनुमान है कि बाज़ार के खिलाड़ी क्या महसूस कर रहे हैं। यह लिस्टिंग गेन की कोई कानूनी गारंटी नहीं है। हमेशा कंपनी के फंडामेंटल्स की जांच करें।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IpoTargetPage;
