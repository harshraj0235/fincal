import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, Calendar, Search, AlertTriangle, ShieldCheck, Repeat, 
  QrCode, GitCompare, Layers, FileText, Route, Scale, BarChart3, TrendingUp,
  Grid, List, ArrowRight, Star, Clock, Users, CheckCircle, Zap, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const gstTools = [
  // GST Calculation Tools
  { name: 'GST Amount Calculator', slug: 'gst-amount-calculator', icon: IndianRupee, desc: 'Calculate GST based on price and rate', category: 'GST Calculation', featured: true },
  { name: 'Reverse GST Calculator', slug: 'reverse-gst-calculator', icon: IndianRupee, desc: 'Determine pre-tax price from GST-inclusive amount', category: 'GST Calculation', featured: true },
  { name: 'GST Slab Calculator', slug: 'gst-slab-calculator', icon: IndianRupee, desc: 'Identify applicable GST slab for products/services', category: 'GST Calculation', featured: true },
  { name: 'GST Inclusive Price Calculator', slug: 'gst-inclusive-price-calculator', icon: IndianRupee, desc: 'Calculate total price including GST', category: 'GST Calculation', featured: false },
  { name: 'GST Exclusive Price Calculator', slug: 'gst-exclusive-price-calculator', icon: IndianRupee, desc: 'Determine price before GST is added', category: 'GST Calculation', featured: false },
  { name: 'GST on Discounted Price Calculator', slug: 'gst-discounted-price-calculator', icon: IndianRupee, desc: 'Calculate GST on discounted items', category: 'GST Calculation', featured: false },
  { name: 'GST on Advance Payment Calculator', slug: 'gst-advance-payment-calculator', icon: IndianRupee, desc: 'Compute GST on advance received', category: 'GST Calculation', featured: false },
  { name: 'GST on Refundable Deposit Calculator', slug: 'gst-refundable-deposit-calculator', icon: IndianRupee, desc: 'Calculate GST on refundable deposits', category: 'GST Calculation', featured: false },
  { name: 'GST on Reimbursement Calculator', slug: 'gst-reimbursement-calculator', icon: IndianRupee, desc: 'Determine GST on reimbursements', category: 'GST Calculation', featured: false },
  { name: 'GST on Export Sales Calculator', slug: 'gst-export-sales-calculator', icon: IndianRupee, desc: 'Calculate GST on export transactions', category: 'GST Calculation', featured: false },

  // Input Tax Credit (ITC) Tools
  { name: 'ITC Eligibility Checker', slug: 'itc-eligibility-checker', icon: ShieldCheck, desc: 'Verify eligibility for claiming ITC', category: 'Input Tax Credit', featured: true },
  { name: 'ITC Utilization Calculator', slug: 'itc-utilization-calculator', icon: BarChart3, desc: 'Optimize ITC utilization across tax heads', category: 'Input Tax Credit', featured: true },
  { name: 'ITC Reversal Calculator', slug: 'itc-reversal-calculator', icon: Repeat, desc: 'Calculate ITC reversal due to non-payment to suppliers', category: 'Input Tax Credit', featured: false },
  { name: 'ITC Carry Forward Calculator', slug: 'itc-carry-forward-calculator', icon: TrendingUp, desc: 'Determine ITC to be carried forward to next period', category: 'Input Tax Credit', featured: false },
  { name: 'ITC on Capital Goods Calculator', slug: 'itc-capital-goods-calculator', icon: IndianRupee, desc: 'Calculate ITC on capital goods', category: 'Input Tax Credit', featured: false },
  { name: 'ITC on Input Services Calculator', slug: 'itc-input-services-calculator', icon: IndianRupee, desc: 'Compute ITC on input services', category: 'Input Tax Credit', featured: false },
  { name: 'ITC on Goods Calculator', slug: 'itc-goods-calculator', icon: IndianRupee, desc: 'Determine ITC on goods purchased', category: 'Input Tax Credit', featured: false },
  { name: 'Blocked Credit Calculator', slug: 'blocked-credit-calculator', icon: AlertTriangle, desc: 'Identify and calculate blocked credits', category: 'Input Tax Credit', featured: false },
  { name: 'ITC on Mixed Supplies Calculator', slug: 'itc-mixed-supplies-calculator', icon: IndianRupee, desc: 'Calculate ITC on mixed supplies', category: 'Input Tax Credit', featured: false },
  { name: 'ITC on Zero-Rated Supplies Calculator', slug: 'itc-zero-rated-supplies-calculator', icon: IndianRupee, desc: 'Determine ITC on zero-rated supplies', category: 'Input Tax Credit', featured: false },

  // GST Return Filing Tools
  { name: 'GSTR-1 Filing Deadline Calculator', slug: 'gstr-1-deadline-calculator', icon: Calendar, desc: 'Track due dates for GSTR-1 filing', category: 'Return Filing', featured: true },
  { name: 'GSTR-3B Filing Deadline Calculator', slug: 'gstr-3b-deadline-calculator', icon: Calendar, desc: 'Monitor due dates for GSTR-3B filing', category: 'Return Filing', featured: true },
  { name: 'GSTR-9 Filing Deadline Calculator', slug: 'gstr-9-deadline-calculator', icon: Calendar, desc: 'Keep track of GSTR-9 filing deadlines', category: 'Return Filing', featured: false },
  { name: 'GSTR-9A Filing Deadline Calculator', slug: 'gstr-9a-deadline-calculator', icon: Calendar, desc: 'Monitor due dates for GSTR-9A filing', category: 'Return Filing', featured: false },
  { name: 'GSTR-1 Late Fee Calculator', slug: 'gstr-1-late-fee-calculator', icon: AlertTriangle, desc: 'Calculate late fees for delayed GSTR-1 filing', category: 'Return Filing', featured: false },
  { name: 'GSTR-3B Late Fee Calculator', slug: 'gstr-3b-late-fee-calculator', icon: AlertTriangle, desc: 'Determine late fees for late GSTR-3B filing', category: 'Return Filing', featured: false },
  { name: 'GSTR-9 Late Fee Calculator', slug: 'gstr-9-late-fee-calculator', icon: AlertTriangle, desc: 'Compute late fees for delayed GSTR-9 filing', category: 'Return Filing', featured: false },
  { name: 'GSTR-9A Late Fee Calculator', slug: 'gstr-9a-late-fee-calculator', icon: AlertTriangle, desc: 'Calculate late fees for late GSTR-9A filing', category: 'Return Filing', featured: false },
  { name: 'Nil Return Filing Reminder Tool', slug: 'nil-return-reminder-tool', icon: Clock, desc: 'Set reminders for filing nil returns', category: 'Return Filing', featured: false },
  { name: 'Quarterly Return Filing Tracker', slug: 'quarterly-return-tracker', icon: BarChart3, desc: 'Monitor quarterly return filing status', category: 'Return Filing', featured: false },

  // GST Penalty & Interest Tools
  { name: 'GST Interest Calculator', slug: 'gst-interest-calculator', icon: AlertTriangle, desc: 'Calculate interest on delayed GST payments', category: 'Penalty & Interest', featured: true },
  { name: 'GST Penalty Calculator', slug: 'gst-penalty-calculator', icon: AlertTriangle, desc: 'Determine penalties for GST non-compliance', category: 'Penalty & Interest', featured: true },
  { name: 'GST Composition Scheme Penalty Calculator', slug: 'gst-composition-penalty-calculator', icon: AlertTriangle, desc: 'Compute penalties under the composition scheme', category: 'Penalty & Interest', featured: false },
  { name: 'GST Late Payment Interest Calculator', slug: 'gst-late-payment-interest-calculator', icon: AlertTriangle, desc: 'Calculate interest on late GST payments', category: 'Penalty & Interest', featured: false },
  { name: 'GST Late Filing Interest Calculator', slug: 'gst-late-filing-interest-calculator', icon: AlertTriangle, desc: 'Determine interest on late filing of returns', category: 'Penalty & Interest', featured: false },
  { name: 'GST Late Fee Waiver Eligibility Checker', slug: 'gst-late-fee-waiver-checker', icon: ShieldCheck, desc: 'Check eligibility for late fee waiver', category: 'Penalty & Interest', featured: false },
  { name: 'GST Late Fee Reduction Calculator', slug: 'gst-late-fee-reduction-calculator', icon: IndianRupee, desc: 'Calculate reduced late fees under certain conditions', category: 'Penalty & Interest', featured: false },
  { name: 'GST Penalty Waiver Eligibility Checker', slug: 'gst-penalty-waiver-checker', icon: ShieldCheck, desc: 'Determine eligibility for penalty waiver', category: 'Penalty & Interest', featured: false },
  { name: 'GST Penalty Reduction Calculator', slug: 'gst-penalty-reduction-calculator', icon: IndianRupee, desc: 'Compute reduced penalties under specific circumstances', category: 'Penalty & Interest', featured: false },
  { name: 'GST Compliance Score Tracker', slug: 'gst-compliance-score-tracker', icon: BarChart3, desc: 'Monitor GST compliance score over time', category: 'Penalty & Interest', featured: false },

  // GST Refund Tools
  { name: 'GST Refund Eligibility Checker', slug: 'gst-refund-eligibility-checker', icon: ShieldCheck, desc: 'Verify eligibility for GST refunds', category: 'GST Refund', featured: true },
  { name: 'GST Refund Application Status Tracker', slug: 'gst-refund-status-tracker', icon: BarChart3, desc: 'Track the status of GST refund applications', category: 'GST Refund', featured: true },
  { name: 'GST Refund Amount Estimator', slug: 'gst-refund-amount-estimator', icon: IndianRupee, desc: 'Estimate the amount eligible for GST refund', category: 'GST Refund', featured: false },
  { name: 'GST Refund Rejection Reason Finder', slug: 'gst-refund-rejection-finder', icon: AlertTriangle, desc: 'Identify reasons for GST refund rejections', category: 'GST Refund', featured: false },
  { name: 'GST Refund Processing Time Calculator', slug: 'gst-refund-processing-time-calculator', icon: Clock, desc: 'Calculate expected processing time for refunds', category: 'GST Refund', featured: false },
  { name: 'GST Refund Interest Calculator', slug: 'gst-refund-interest-calculator', icon: IndianRupee, desc: 'Compute interest on delayed GST refunds', category: 'GST Refund', featured: false },
  { name: 'GST Refund Adjustment Calculator', slug: 'gst-refund-adjustment-calculator', icon: IndianRupee, desc: 'Determine adjustments in GST refunds', category: 'GST Refund', featured: false },
  { name: 'GST Refund Carry Forward Calculator', slug: 'gst-refund-carry-forward-calculator', icon: TrendingUp, desc: 'Calculate refunds to be carried forward', category: 'GST Refund', featured: false },
  { name: 'GST Refund Claim Form Generator', slug: 'gst-refund-claim-form-generator', icon: FileText, desc: 'Generate GST refund claim forms', category: 'GST Refund', featured: false },
  { name: 'GST Refund Documentation Checklist', slug: 'gst-refund-documentation-checklist', icon: CheckCircle, desc: 'List of documents required for GST refund claims', category: 'GST Refund', featured: false },

  // Reverse Charge Mechanism (RCM) Tools
  { name: 'RCM Applicability Checker', slug: 'rcm-applicability-checker', icon: ShieldCheck, desc: 'Determine if RCM applies to a transaction', category: 'Reverse Charge', featured: true },
  { name: 'RCM Tax Calculation Tool', slug: 'rcm-tax-calculation-tool', icon: IndianRupee, desc: 'Calculate tax under RCM', category: 'Reverse Charge', featured: true },
  { name: 'RCM Invoice Generator', slug: 'rcm-invoice-generator', icon: FileText, desc: 'Generate invoices under RCM', category: 'Reverse Charge', featured: false },
  { name: 'RCM Payment Tracker', slug: 'rcm-payment-tracker', icon: BarChart3, desc: 'Monitor payments under RCM', category: 'Reverse Charge', featured: false },
  { name: 'RCM Compliance Checklist', slug: 'rcm-compliance-checklist', icon: CheckCircle, desc: 'Ensure compliance with RCM provisions', category: 'Reverse Charge', featured: false },
  { name: 'RCM Credit Eligibility Checker', slug: 'rcm-credit-eligibility-checker', icon: ShieldCheck, desc: 'Verify eligibility to claim credit under RCM', category: 'Reverse Charge', featured: false },
  { name: 'RCM Adjustment Calculator', slug: 'rcm-adjustment-calculator', icon: IndianRupee, desc: 'Adjustments related to RCM transactions', category: 'Reverse Charge', featured: false },
  { name: 'RCM Documentation Guide', slug: 'rcm-documentation-guide', icon: FileText, desc: 'Guide for maintaining records under RCM', category: 'Reverse Charge', featured: false },
  { name: 'RCM Due Date Tracker', slug: 'rcm-due-date-tracker', icon: Calendar, desc: 'Track due dates for RCM payments', category: 'Reverse Charge', featured: false },
  { name: 'RCM Audit Trail Generator', slug: 'rcm-audit-trail-generator', icon: FileText, desc: 'Generate audit trails for RCM transactions', category: 'Reverse Charge', featured: false },

  // GST Compliance & Documentation Tools
  { name: 'GST Invoice Generator', slug: 'gst-invoice-generator', icon: FileText, desc: 'Create GST-compliant invoices', category: 'Compliance & Documentation', featured: true },
  { name: 'GST E-Way Bill Generator', slug: 'gst-eway-bill-generator', icon: Route, desc: 'Generate e-way bills for goods transportation', category: 'Compliance & Documentation', featured: true },
  { name: 'GST Challan Generator', slug: 'gst-challan-generator', icon: FileText, desc: 'Create GST payment challans', category: 'Compliance & Documentation', featured: false },
  { name: 'GST Credit Note Generator', slug: 'gst-credit-note-generator', icon: FileText, desc: 'Generate GST credit notes', category: 'Compliance & Documentation', featured: false },
  { name: 'GST Debit Note Generator', slug: 'gst-debit-note-generator', icon: FileText, desc: 'Create GST debit notes', category: 'Compliance & Documentation', featured: false },
  { name: 'GST Payment Receipt Generator', slug: 'gst-payment-receipt-generator', icon: FileText, desc: 'Generate receipts for GST payments', category: 'Compliance & Documentation', featured: false },
  { name: 'GST Refund Application Form Generator', slug: 'gst-refund-application-form-generator', icon: FileText, desc: 'Create forms for GST refund applications', category: 'Compliance & Documentation', featured: false },
  { name: 'GST Audit Report Generator', slug: 'gst-audit-report-generator', icon: FileText, desc: 'Generate GST audit reports', category: 'Compliance & Documentation', featured: false },
  { name: 'GST Compliance Calendar', slug: 'gst-compliance-calendar', icon: Calendar, desc: 'Track GST compliance deadlines', category: 'Compliance & Documentation', featured: false },
  { name: 'GST Document Storage Solution', slug: 'gst-document-storage-solution', icon: FileText, desc: 'Store GST-related documents securely', category: 'Compliance & Documentation', featured: false },

  // GST Composition Scheme Tools
  { name: 'Composition Scheme Eligibility Checker', slug: 'composition-scheme-eligibility-checker', icon: ShieldCheck, desc: 'Determine eligibility for the composition scheme', category: 'Composition Scheme', featured: true },
  { name: 'Composition Scheme Tax Calculator', slug: 'composition-scheme-tax-calculator', icon: IndianRupee, desc: 'Calculate tax under the composition scheme', category: 'Composition Scheme', featured: true },
  { name: 'Composition Scheme Invoice Generator', slug: 'composition-scheme-invoice-generator', icon: FileText, desc: 'Create invoices under the composition scheme', category: 'Composition Scheme', featured: false },
  { name: 'Composition Scheme Return Filing Guide', slug: 'composition-scheme-return-filing-guide', icon: FileText, desc: 'Step-by-step guide for filing returns under the scheme', category: 'Composition Scheme', featured: false },
  { name: 'Composition Scheme Compliance Checklist', slug: 'composition-scheme-compliance-checklist', icon: CheckCircle, desc: 'Ensure compliance with scheme provisions', category: 'Composition Scheme', featured: false },
  { name: 'Composition Scheme Turnover Tracker', slug: 'composition-scheme-turnover-tracker', icon: BarChart3, desc: 'Monitor turnover for scheme eligibility', category: 'Composition Scheme', featured: false },
  { name: 'Composition Scheme Transition Guide', slug: 'composition-scheme-transition-guide', icon: FileText, desc: 'Guide for transitioning to/from the scheme', category: 'Composition Scheme', featured: false },
  { name: 'Composition Scheme Benefits Calculator', slug: 'composition-scheme-benefits-calculator', icon: IndianRupee, desc: 'Calculate benefits of opting for the scheme', category: 'Composition Scheme', featured: false },
  { name: 'Composition Scheme Penalty Calculator', slug: 'composition-scheme-penalty-calculator', icon: AlertTriangle, desc: 'Determine penalties under the scheme', category: 'Composition Scheme', featured: false },
  { name: 'Composition Scheme Documentation Guide', slug: 'composition-scheme-documentation-guide', icon: FileText, desc: 'Maintain records for the scheme', category: 'Composition Scheme', featured: false },

  // GST Analytics & Reporting Tools
  { name: 'GST Filing Status Tracker', slug: 'gst-filing-status-tracker', icon: BarChart3, desc: 'Monitor GST return filing status', category: 'Analytics & Reporting', featured: true },
  { name: 'GST Payment Status Tracker', slug: 'gst-payment-status-tracker', icon: BarChart3, desc: 'Track GST payment status', category: 'Analytics & Reporting', featured: true },
  { name: 'GST Credit Utilization Report', slug: 'gst-credit-utilization-report', icon: BarChart3, desc: 'Generate reports on ITC utilization', category: 'Analytics & Reporting', featured: false },
  { name: 'GST Refund Status Report', slug: 'gst-refund-status-report', icon: BarChart3, desc: 'Monitor GST refund status', category: 'Analytics & Reporting', featured: false },
  { name: 'GST Compliance Score Report', slug: 'gst-compliance-score-report', icon: BarChart3, desc: 'Assess GST compliance score', category: 'Analytics & Reporting', featured: false },
  { name: 'GST Audit Trail Report', slug: 'gst-audit-trail-report', icon: FileText, desc: 'Generate audit trails for GST transactions', category: 'Analytics & Reporting', featured: false },
  { name: 'GST Penalty & Interest Report', slug: 'gst-penalty-interest-report', icon: BarChart3, desc: 'Track penalties and interest', category: 'Analytics & Reporting', featured: false },
  { name: 'GST Invoice Matching Report', slug: 'gst-invoice-matching-report', icon: GitCompare, desc: 'Match invoices for reconciliation', category: 'Analytics & Reporting', featured: false },
  { name: 'GST E-Way Bill Report', slug: 'gst-eway-bill-report', icon: Route, desc: 'Generate e-way bill reports', category: 'Analytics & Reporting', featured: false },
  { name: 'GST Turnover Analysis Report', slug: 'gst-turnover-analysis-report', icon: TrendingUp, desc: 'Analyze turnover trends and patterns', category: 'Analytics & Reporting', featured: false },

  // Additional Popular Tools
  { name: 'HSN/SAC Finder', slug: 'gst-hsn-sac-finder', icon: Search, desc: 'Find correct HSN/SAC & tax rate', category: 'Reference Tools', featured: true },
  { name: 'GST Slab Finder', slug: 'gst-slab-finder', icon: Layers, desc: 'Get latest GST slab for product/service', category: 'Reference Tools', featured: true },
  { name: 'GST Liability Calculator', slug: 'gst-liability-calculator', icon: Scale, desc: 'Output tax minus eligible ITC', category: 'GST Calculation', featured: true },
  { name: 'GST Rate Impact Analyzer', slug: 'gst-rate-impact-analyzer', icon: TrendingUp, desc: 'Impact of GST rate change on price/margins', category: 'Analytics & Reporting', featured: true },
  { name: 'GST E-Invoice QR Validator', slug: 'gst-einvoice-qr-validator', icon: QrCode, desc: 'Validate GST e-invoice QR code', category: 'Compliance & Documentation', featured: true },
  { name: 'GST ITC Reconciliation', slug: 'gst-itc-reconciliation', icon: GitCompare, desc: 'Match purchases with GSTR-2B', category: 'Input Tax Credit', featured: true },
  { name: 'GST E-Way Bill Distance Calculator', slug: 'gst-eway-distance-calculator', icon: Route, desc: 'Auto-distance & validity estimator', category: 'Compliance & Documentation', featured: true },
  { name: 'GST Annual Turnover Tracker', slug: 'gst-turnover-tracker', icon: BarChart3, desc: 'Track turnover & registration thresholds', category: 'Analytics & Reporting', featured: true },
];

const implementedSlugs = new Set([
  'gst-calculator',
  'gst-due-date-tracker',
  'gstr-3b-preparation',
  'gst-hsn-sac-finder',
  'gst-slab-finder',
  'gst-liability-calculator',
  'gst-penalty-interest-calculator',
  'gst-rcm-calculator',
  'gst-composition-eligibility',
  'gst-einvoice-qr-validator',
  'gst-invoice-generator',
  'gst-eway-distance-calculator',
  'gst-turnover-tracker',
  'gst-rate-impact-analyzer',
  'gstr-1-deadline-calculator',
  'gst-amount-calculator',
  'reverse-gst-calculator',
  'gst-slab-calculator',
  'gstr-3b-deadline-calculator',
  'composition-scheme-eligibility-checker',
  'itc-eligibility-checker',
  'rcm-applicability-checker',
  'gst-refund-eligibility-checker'
]);

const categories = [
  'All Categories',
  'GST Calculation',
  'Input Tax Credit',
  'Return Filing',
  'Penalty & Interest',
  'GST Refund',
  'Reverse Charge',
  'Compliance & Documentation',
  'Composition Scheme',
  'Analytics & Reporting',
  'Reference Tools'
];

const GSTTools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFeatured, setShowFeatured] = useState(false);

  const availableTools = gstTools.filter(tool => implementedSlugs.has(tool.slug));
  const filteredTools = availableTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || tool.category === selectedCategory;
    const matchesFeatured = !showFeatured || tool.featured;
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const featuredTools = availableTools.filter(tool => tool.featured);
  const categoryCounts = categories.reduce((acc, category) => {
    if (category === 'All Categories') {
      acc[category] = availableTools.length;
    } else {
      acc[category] = availableTools.filter(tool => tool.category === category).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <SEOHelmet
        title="GST Tools Hub - GST Calculators and Filing Helpers | MoneyCal.in"
        description="Explore GST tools including Calculator, due date tracker, GSTR-3B, HSN finder, penalty, RCM, e-invoice validator, ITC eligibility, invoice generator and more. Complete GST compliance toolkit."
        keywords="gst tools, gst Calculator, gstr 3b, hsn finder, gst penalty, e invoice, itc reconciliation, gst invoice, gst refund, rcm Calculator, composition scheme"
        url="/gst-tools"
        type="website"
        image="/images/gst-tools.jpg"
        tags={["gst", "gstr", "itc", "e-invoice", "hsn", "gst calculator", "gst tools"]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'GST Tools', url: '/gst-tools' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "GST Tools Hub",
          description: "GST calculators, filing helpers, compliance trackers, and reference utilities.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: availableTools.length
          }
        }}
      />

      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <IndianRupee className="h-16 w-16 text-green-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">GST Tools Hub</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Curated GST compliance toolkit with calculators, trackers, and filing helpers.
              From basic GST calculations to compliance monitoring - everything you need for seamless GST management.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>{availableTools.length} Tools</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                <span>Free to Use</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Always Updated</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
              <p className="text-gray-700 text-sm">Select a category (Calculator, returns, ITC). Open a tool, enter data, download or save results, and link to filings.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
              <p className="text-gray-700 text-sm">Calculator → inclusive/exclusive and discounts. Returns → GSTR-1/3B deadlines and late fees. ITC → eligibility and reconciliation.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
              <p className="text-gray-700 text-sm">Compute GST liability → subtract ITC. Check GSTR-3B due date → plan payment. Find HSN/SAC → map invoice items.</p>
            </div>
          </div>

          {/* Featured Tools Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Featured Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredTools.slice(0, 8).map((tool, index) => (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <tool.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {tool.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                      <RouterLink
                        to={`/tools/${tool.slug}`}
                        className="flex items-center text-green-600 hover:text-green-700 font-semibold text-sm group-hover:translate-x-1 transition-transform"
                      >
                        Use Tool <ArrowRight className="w-4 h-4 ml-1" />
                      </RouterLink>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search GST tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category} ({categoryCounts[category]})
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Featured Filter */}
              <button
                onClick={() => setShowFeatured(!showFeatured)}
                className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                  showFeatured 
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Star className="w-4 h-4 inline mr-2" />
                Featured Only
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredTools.length} of {availableTools.length} tools
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Categories: {categories.length - 1}</span>
              <span>Featured: {featuredTools.length}</span>
            </div>
          </div>

          {/* Tools Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 ${
                  viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <tool.icon className="w-6 h-6 text-green-600" />
                      </div>
                      {tool.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {tool.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                      <RouterLink
                        to={`/tools/${tool.slug}`}
                        className="flex items-center text-green-600 hover:text-green-700 font-semibold text-sm group-hover:translate-x-1 transition-transform"
                      >
                        Use Tool <ArrowRight className="w-4 h-4 ml-1" />
                      </RouterLink>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors mr-4 flex-shrink-0">
                      <tool.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {tool.name}
                        </h3>
                        {tool.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                            Featured
                          </span>
                        )}
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {tool.desc}
                      </p>
                    </div>
                    <RouterLink
                      to={`/tools/${tool.slug}`}
                      className="flex items-center text-green-600 hover:text-green-700 font-semibold text-sm group-hover:translate-x-1 transition-transform ml-4"
                    >
                      Use Tool <ArrowRight className="w-4 h-4 ml-1" />
                    </RouterLink>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setShowFeatured(false);
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Category Overview */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Tool Categories Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.slice(1).map(category => {
                const count = categoryCounts[category];
                const categoryTools = availableTools.filter(tool => tool.category === category);
                const featuredCount = categoryTools.filter(tool => tool.featured).length;
                
                return (
                  <div key={category} className="p-4 border border-gray-200 rounded-lg hover:border-green-200 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{count} tools</span>
                      {featuredCount > 0 && (
                        <span className="text-yellow-600">
                          {featuredCount} featured
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GSTTools;
