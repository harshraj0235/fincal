import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Tractor, 
  Home, 
  Heart, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Landmark,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { loadGovSchemesData } from '../data/lazyGovSchemesData';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const getCategoryIcon = (category: string) => {
  const normCat = category.toLowerCase();
  if (normCat.includes('hous') || normCat.includes('आवास')) return <Home className="w-8 h-8" />;
  if (normCat.includes('health') || normCat.includes('स्वास्थ्य') || normCat.includes('insurance')) return <Heart className="w-8 h-8" />;
  if (normCat.includes('agri') || normCat.includes('farm') || normCat.includes('kisan') || normCat.includes('कृषि')) return <Tractor className="w-8 h-8" />;
  if (normCat.includes('edu') || normCat.includes('scholar') || normCat.includes('student') || normCat.includes('शिक्षा')) return <GraduationCap className="w-8 h-8" />;
  if (normCat.includes('business') || normCat.includes('msme') || normCat.includes('loan') || normCat.includes('व्यापार')) return <Briefcase className="w-8 h-8" />;
  if (normCat.includes('social') || normCat.includes('pension') || normCat.includes('women') || normCat.includes('youth') || normCat.includes('सामाजिक')) return <Users className="w-8 h-8" />;
  return <Landmark className="w-8 h-8" />;
};

const GovernmentSchemeCategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<any>(null);
  const [schemes, setSchemes] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadGovSchemesData();
      // Find category by slug (slugified name or ID)
      const cat = data.categories.find(c => 
        c.name.toLowerCase().replace(/\s+/g, '-') === categorySlug || 
        c.id === categorySlug
      );

      if (cat) {
        setCategory(cat);
        const filtered = data.schemes.filter(s => s.category === cat.name);
        setSchemes(filtered);
      }
      setLoading(false);
    };
    fetchData();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Loading Category...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen pt-40">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
        <button onClick={() => navigate('/government-schemes')} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          Back to All Schemes
        </button>
      </div>
    );
  }

  const seoTitle = `${category.nameHindi} (${category.name}) - सभी सरकारी योजनाएं | MoneyCal`;
  const seoDescription = `${category.nameHindi} सत्र की सभी सरकारी योजनाओं की सूची। पात्रता, लाभ और आवेदन प्रक्रिया की पूरी जानकारी हिंदी और अंग्रेजी में।`;

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title={seoTitle}
        description={seoDescription}
        url={`/government-schemes/category/${categorySlug}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Government Schemes', url: '/government-schemes' },
          { name: category.nameHindi, url: `/government-schemes/category/${categorySlug}` },
        ]}
      />

      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/government-schemes" reloadDocument className="inline-flex items-center text-emerald-100 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> All Schemes
            </Link>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                {getCategoryIcon(category.name)}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
                  {category.nameHindi} <span className="text-emerald-300">Yojana</span>
                </h1>
                <p className="text-xl text-emerald-100/80 max-w-2xl font-medium">
                  Complete list of {category.name} schemes. Detailed guides on eligibility, required documents, and application process.
                </p>
                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold">
                    {schemes.length} Active Schemes
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold text-emerald-300">
                    Sarkari Yojana 2025-26
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Quick Navigation</h3>
                <ul className="space-y-3">
                  {schemes.slice(0, 8).map(s => (
                    <li key={s.id}>
                      <a href={`#${s.slug}`} className="text-sm text-gray-600 hover:text-emerald-600 flex items-center gap-2 group">
                        <ChevronRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        <span className="truncate">{s.titleHindi}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Listing */}
            <div className="lg:col-span-3 space-y-6">
              {schemes.map((scheme) => (
                <Link
                  id={scheme.slug}
                  key={scheme.id}
                  to={`/government-schemes/${scheme.slug}`}
                  className="group block bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-56 h-48 md:h-auto overflow-hidden">
                      <img 
                        src={scheme.coverImage} 
                        alt={scheme.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                            {scheme.status === 'active' ? 'Active' : scheme.status}
                          </span>
                          <span className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            {scheme.lastUpdated || '2025-06-25'}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 leading-tight">
                          {scheme.titleHindi}
                        </h2>
                        <p className="text-gray-600 line-clamp-2 text-sm sm:text-base leading-relaxed mb-4">
                          {scheme.excerptHindi}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className="text-emerald-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read Full Guide <ArrowRight className="w-4 h-4" />
                        </span>
                        {scheme.beneficiaries && (
                          <span className="text-xs text-gray-400 font-medium italic">
                            Beneficiaries: {scheme.beneficiaries}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {schemes.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                  <Tractor className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-500">No schemes found in this category</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* FAQ Section for Category */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-2 h-8 bg-emerald-500 rounded-full" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-6">
                <h3 className="text-lg font-bold text-emerald-800 mb-2">{category.nameHindi} के लिए कौन पात्र है?</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">इस श्रेणी की अधिकांश योजनाएं विशिष्ट लाभार्थियों जैसे किसानों, महिलाओं या छोटे व्यापारियों तक सीमित हैं। प्रत्येक योजना की अपनी विशिष्ट पात्रता शर्तें हैं जो ऊपर विस्तार से दी गई हैं।</p>
              </div>
              <div className="border-b border-gray-100 pb-6">
                <h3 className="text-lg font-bold text-emerald-800 mb-2">आवेदन कैसे करें?</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">अधिकतर योजनाओं के लिए आवेदन जन सेवा केंद्र (CSC) या आधिकारिक पोर्टल के माध्यम से किया जा सकता है। आवश्यक दस्तावेजों में आधार कार्ड, बैंक पासबुक और संबंधित प्रमाण पत्र शामिल हैं।</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GovernmentSchemeCategoryPage;
