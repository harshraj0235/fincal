import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight,
  BookOpen,
  Scale
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import InsuranceComparisonTable, { ComparisonData } from '../../components/InsuranceComparisonTable';
import WhatsAppBanner from '../../components/WhatsAppBanner';


const ComparisonGuide: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Mock data fetching based on slug
  const getComparisonData = (): ComparisonData[] => {
    if (slug === 'term-plans') {
      return [
        {
          provider: 'HDFC Life',
          planName: 'Click 2 Protect Super',
          premium: '₹1,245',
          coverage: '1 Crore',
          waitingPeriod: 'None',
          keyFeatures: ['Return of Premium option', 'Critical Illness Cover', 'Terminal Illness included'],
          pros: ['High claim ratio', 'Flexible options'],
          cons: ['Slightly higher premium', 'Complex rider choice']
        },
        {
          provider: 'ICICI Pru',
          planName: 'iProtect Smart',
          premium: '₹1,180',
          coverage: '1 Crore',
          waitingPeriod: 'None',
          keyFeatures: ['Accidental Death Benefit', 'Smart Exit at 60', 'Low premium for non-smokers'],
          pros: ['Very stable brand', 'Simple process'],
          cons: ['Strict medicals', 'Less flexible term']
        },
        {
            provider: 'Max Life',
            planName: 'Smart Secure Plus',
            premium: '₹1,120',
            coverage: '1 Crore',
            waitingPeriod: 'None',
            keyFeatures: ['Zero cost exit', 'Increasing cover option', 'Premium waiver on disability'],
            pros: ['Cheapest in segment', 'Great customer service'],
            cons: ['Lower AUM than HDFC', 'Online only focus']
        }
      ];
    }
    // Default/Health mock
    return [
        {
          provider: 'Star Health',
          planName: 'Assure Insurance',
          premium: '₹850',
          coverage: '10 Lakhs',
          waitingPeriod: '2 Years',
          keyFeatures: ['No Room Rent limit', 'OPD coverage', 'Restoration of SI'],
          pros: ['Huge network', 'No co-pay'],
          cons: ['High claim volume', 'Slow support']
        },
        {
          provider: 'Niva Bupa',
          planName: 'ReAssure 2.0',
          premium: '₹920',
          coverage: '10 Lakhs',
          waitingPeriod: '1 Year',
          keyFeatures: ['Carry forward SI', 'Lock the clock premium', 'Modern hospital focus'],
          pros: ['Fast tech', 'Low wait period'],
          cons: ['Premium hikes', 'Strict zone pricing']
        }
    ];
  };

  const comparisonData = getComparisonData();
  const title = slug === 'term-plans' ? 'Top Term Insurance Plans 2025' : 'Best Health Insurance Comparison';

  return (
    <>
      <WhatsAppBanner />
      <SEOHelmet
        title={`${title} - Side by Side Comparison | MoneyCal`}
        description={`Compare the best ${slug} in India. Check premiums, benefits, exclusions and pros/cons for top insurance providers.`}
        url={`/insurance/compare/${slug}`}
        breadcrumbs={[
            { name: 'Home', url: '/' },
            { name: 'Insurance Hub', url: '/insurance-hub' },
            { name: 'Comparison', url: '#' },
        ]}
      />

      <div className="min-h-screen bg-slate-50 pb-20">
        <div className="bg-white pt-24 pb-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/insurance-hub" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 font-bold transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insurance Hub
            </Link>
            
            <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
               <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                    {title}
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    Choosing the right plan shouldn't be a guessing game. We've analyzed the policy documents of top insurers to give you a clear, unbiased comparison.
                  </p>
               </div>
               <div className="flex items-center gap-4 bg-emerald-50 px-6 py-4 rounded-3xl border border-emerald-100 mb-2">
                 <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                   <ShieldCheck className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-widest">MoneyCal Verified</div>
                    <p className="text-[10px] text-emerald-600 font-bold">Updated: Oct 2025</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            
            {/* Callout Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
               <div className="p-6 bg-white rounded-3xl border border-slate-100 flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                     <h4 className="font-bold text-slate-900 text-sm mb-1">Unbiased Data</h4>
                     <p className="text-xs text-slate-500">We don't accept commissions from insurers.</p>
                  </div>
               </div>
               <div className="p-6 bg-white rounded-3xl border border-slate-100 flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                     <h4 className="font-bold text-slate-900 text-sm mb-1">Fine Print Simplified</h4>
                     <p className="text-xs text-slate-500">Exclusions explained in plain English.</p>
                  </div>
               </div>
               <div className="p-6 bg-white rounded-3xl border border-slate-100 flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 flex-shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                     <h4 className="font-bold text-slate-900 text-sm mb-1">Free Expert Help</h4>
                     <p className="text-xs text-slate-500">1-on-1 consultation if you get stuck.</p>
                  </div>
               </div>
            </div>

            <InsuranceComparisonTable data={comparisonData} />

            {/* Content Article Section for SEO */}
            <div className="mt-20 bg-white rounded-[40px] p-8 sm:p-16 shadow-xl border border-slate-100">
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Detailed Analysis of 2025 Plans</h2>
                  <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-loose">
                    <p>
                      When comparing insurance, premium is often the first thing people look at. While cost is important, the "value per rupee" depends heavily on factors like <strong>Claim Settlement Ratio (CSR)</strong>, <strong>Solvency Ratio</strong>, and most importantly—<strong>Exclusions</strong>.
                    </p>
                    <div className="p-6 bg-slate-50 rounded-3xl border-l-4 border-blue-500 italic">
                      "A low premium plan might cost you more in the long run if it has high co-pay or restrictive room rent limits."
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 pt-4">3 Things to Check in Policy Fine Print</h3>
                    <ul className="space-y-4">
                       <li className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">1</div>
                          <div>
                             <strong className="text-slate-900">Waiting Periods:</strong> Especially for pre-existing diseases. Standard is 2-4 years, but some "Plus" plans are now offering 1-year waiting periods.
                          </div>
                       </li>
                       <li className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">2</div>
                          <div>
                             <strong className="text-slate-900">Sub-limits:</strong> Many plans limit how much you can spend on specific treatments like cataract or maternity, regardless of your total sum insured.
                          </div>
                       </li>
                       <li className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">3</div>
                          <div>
                             <strong className="text-slate-900">Restore/Recharge Benefits:</strong> Does your cover refill if you get sick twice in a year? Modern plans like Niva Bupa and Star offer unlimited restoration.
                          </div>
                       </li>
                    </ul>
                  </div>
                  
                  <div className="mt-16 pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                     <div>
                        <h4 className="text-xl font-bold text-slate-900">Need a personalized quote?</h4>
                        <p className="text-slate-500">Our experts can run the numbers for your specific medical history.</p>
                     </div>
                     <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[20px] transition-all shadow-xl shadow-blue-500/25 active:scale-95 flex items-center gap-3">
                        Talk to an Expert <ChevronRight className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ComparisonGuide;
