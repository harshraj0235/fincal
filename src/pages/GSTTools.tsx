import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Calendar, FileSpreadsheet, Search, AlertTriangle, ShieldCheck, Repeat, QrCode, GitCompare, Layers, FileText, Route, Scale, BarChart3, TrendingUp } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const tools = [
  { name: 'GST Calculator', slug: 'gst-calculator', icon: Calculator, desc: 'Add/remove GST, net price and tax amount' },
  { name: 'GST Due Date Tracker', slug: 'gst-due-date-tracker', icon: Calendar, desc: 'GSTR-1, 3B, 9 due dates with reminders' },
  { name: 'GSTR-3B Preparation', slug: 'gstr-3b-preparation', icon: FileSpreadsheet, desc: 'Summarize 3B from invoices (CSV/Excel)' },
  { name: 'HSN/SAC Finder', slug: 'gst-hsn-sac-finder', icon: Search, desc: 'Find correct HSN/SAC & tax rate' },
  { name: 'Penalty & Interest', slug: 'gst-penalty-interest-calculator', icon: AlertTriangle, desc: 'Late fees and interest on delay' },
  { name: 'Composition Eligibility', slug: 'gst-composition-eligibility', icon: ShieldCheck, desc: 'Check eligibility & rates' },
  { name: 'RCM Calculator', slug: 'gst-rcm-calculator', icon: Repeat, desc: 'Reverse charge liability calculator' },
  { name: 'E-Invoice QR Validator', slug: 'gst-einvoice-qr-validator', icon: QrCode, desc: 'Validate GST e-invoice QR code' },
  { name: 'ITC Reconciliation', slug: 'gst-itc-reconciliation', icon: GitCompare, desc: 'Match purchases with GSTR-2B' },
  { name: 'GST Slab Finder', slug: 'gst-slab-finder', icon: Layers, desc: 'Get latest GST slab for product/service' },
  { name: 'GST Invoice Generator', slug: 'gst-invoice-generator', icon: FileText, desc: 'Create downloadable GST invoice (PDF)' },
  { name: 'E-Way Bill Distance', slug: 'gst-eway-distance-calculator', icon: Route, desc: 'Auto-distance & validity estimator' },
  { name: 'GST Liability', slug: 'gst-liability-calculator', icon: Scale, desc: 'Output tax minus eligible ITC' },
  { name: 'Annual Turnover Tracker', slug: 'gst-turnover-tracker', icon: BarChart3, desc: 'Track turnover & registration thresholds' },
  { name: 'Rate Impact Analyzer', slug: 'gst-rate-impact-analyzer', icon: TrendingUp, desc: 'Impact of GST rate change on price/margins' },
];

const GSTTools: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="GST Tools Hub - Free GST Calculators and Filing Helpers | MoneyCal.in"
        description="Explore 15 free GST tools: calculator, due date tracker, GSTR-3B, HSN finder, penalty, RCM, e-invoice validator, ITC reconciliation, invoice generator and more."
        keywords="gst tools, gst calculator, gstr 3b, hsn finder, gst penalty, e invoice, itc reconciliation, gst invoice"
        url="/gst-tools"
        type="website"
        image="/images/gst-tools.jpg"
        tags={["gst", "gstr", "itc", "e-invoice", "hsn"]}
      />

      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="h-16 w-16 text-amber-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">GST Tools Hub</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Free, no-login GST calculators and filing helpers tailored for Indian businesses. Download PDFs, validate data, and stay compliant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((t, index) => (
              <motion.div key={t.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.03 }}>
                <RouterLink to={`/gst-tools/${t.slug}`} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-amber-200 transform hover:-translate-y-2 transition-all block h-full">
                  <div className="flex items-start mb-4">
                    <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <t.icon className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">{t.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{t.desc}</p>
                    </div>
                  </div>
                  <div className="text-amber-700 font-semibold text-sm">Open Tool →</div>
                </RouterLink>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTTools;


