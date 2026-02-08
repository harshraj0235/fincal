import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Calculator, 
  BarChart3, 
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  CreditCard,
  Receipt,
  FileText,
  PieChart,
  Activity,
  Target,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Search,
  Filter,
  Info
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  slug: string;
  icon: React.ReactNode;
  features: string[];
  keywords: string[];
}

const InvoicingReceivablesHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tools: Tool[] = [
    {
      id: '1',
      name: 'Custom Invoice Generator',
      description: 'Create professional invoices with downloadable PDF format',
      category: 'invoice-creation',
      slug: 'custom-invoice-generator',
      icon: <FileText className="w-6 h-6" />,
      features: ['PDF Download', 'Custom Templates', 'Professional Format'],
      keywords: ['invoice generator', 'PDF invoice', 'custom invoice']
    },
    {
      id: '2',
      name: 'Invoice Due Date Tracker',
      description: 'Track invoice due dates and payment status',
      category: 'tracking',
      slug: 'invoice-due-date-tracker',
      icon: <Calendar className="w-6 h-6" />,
      features: ['Due Date Tracking', 'Payment Status', 'Reminders'],
      keywords: ['due date tracker', 'payment tracking', 'invoice management']
    },
    {
      id: '3',
      name: 'Recurring Invoice Scheduler',
      description: 'Automate recurring invoice generation and scheduling',
      category: 'automation',
      slug: 'recurring-invoice-scheduler',
      icon: <Clock className="w-6 h-6" />,
      features: ['Auto Scheduling', 'Recurring Billing', 'Template Management'],
      keywords: ['recurring invoice', 'auto billing', 'invoice scheduler']
    },
    {
      id: '4',
      name: 'Invoice Ageing Report Visualizer',
      description: 'Visualize invoice ageing and payment patterns',
      category: 'analytics',
      slug: 'invoice-ageing-report-visualizer',
      icon: <BarChart3 className="w-6 h-6" />,
      features: ['Ageing Analysis', 'Payment Patterns', 'Visual Reports'],
      keywords: ['ageing report', 'payment analysis', 'invoice analytics']
    },
    {
      id: '5',
      name: 'GST Tax Auto-Fill Invoice Tool',
      description: 'Automatically calculate and fill GST tax details',
      category: 'tax',
      slug: 'gst-tax-auto-fill-invoice-tool',
      icon: <Calculator className="w-6 h-6" />,
      features: ['GST Calculation', 'Auto Fill', 'Tax Compliance'],
      keywords: ['GST calculator', 'tax invoice', 'GST compliance']
    },
    {
      id: '6',
      name: 'Multi-Currency Invoice Generator',
      description: 'Create invoices in multiple currencies',
      category: 'invoice-creation',
      slug: 'multi-currency-invoice-generator',
      icon: <DollarSign className="w-6 h-6" />,
      features: ['Multi Currency', 'Exchange Rates', 'International Billing'],
      keywords: ['multi currency', 'international invoice', 'exchange rates']
    },
    {
      id: '7',
      name: 'Invoice-to-Cash Cycle Tracker',
      description: 'Track the complete invoice to cash conversion cycle',
      category: 'tracking',
      slug: 'invoice-to-cash-cycle-tracker',
      icon: <TrendingUp className="w-6 h-6" />,
      features: ['Cash Flow Tracking', 'Cycle Analysis', 'Performance Metrics'],
      keywords: ['cash cycle', 'invoice to cash', 'cash flow tracking']
    },
    {
      id: '8',
      name: 'Payment Reminder Tool',
      description: 'Send automated payment reminders to clients',
      category: 'automation',
      slug: 'payment-reminder-tool',
      icon: <Activity className="w-6 h-6" />,
      features: ['Auto Reminders', 'Email Templates', 'Follow-up Tracking'],
      keywords: ['payment reminder', 'follow up', 'collection tool']
    },
    {
      id: '9',
      name: 'Invoice Dispute Tracker',
      description: 'Track and manage invoice disputes and resolutions',
      category: 'tracking',
      slug: 'invoice-dispute-tracker',
      icon: <Shield className="w-6 h-6" />,
      features: ['Dispute Management', 'Resolution Tracking', 'Documentation'],
      keywords: ['dispute tracker', 'invoice disputes', 'resolution management']
    },
    {
      id: '10',
      name: 'PO to Invoice Converter',
      description: 'Convert purchase orders to invoices automatically',
      category: 'automation',
      slug: 'po-to-invoice-converter',
                    icon: <FileText className="w-6 h-6" />,
      features: ['PO Conversion', 'Auto Generation', 'Template Matching'],
      keywords: ['PO converter', 'purchase order', 'invoice conversion']
    },
    {
      id: '11',
      name: 'Receivables vs Payables Dashboard',
      description: 'Compare receivables and payables for cash flow management',
      category: 'analytics',
      slug: 'receivables-vs-payables-dashboard',
      icon: <PieChart className="w-6 h-6" />,
      features: ['Cash Flow Analysis', 'Comparison Reports', 'Dashboard View'],
      keywords: ['receivables payables', 'cash flow dashboard', 'financial analysis']
    },
    {
      id: '12',
      name: 'Invoice Terms Explainer',
      description: 'Understand and explain invoice terms and conditions',
      category: 'education',
      slug: 'invoice-terms-explainer',
      icon: <Target className="w-6 h-6" />,
      features: ['Terms Explanation', 'Legal Guidance', 'Best Practices'],
      keywords: ['invoice terms', 'payment terms', 'legal guidance']
    },
    {
      id: '13',
      name: 'Client-wise Invoice History Visualizer',
      description: 'Visualize invoice history and patterns by client',
      category: 'analytics',
      slug: 'client-wise-invoice-history-visualizer',
      icon: <Users className="w-6 h-6" />,
      features: ['Client Analysis', 'History Tracking', 'Pattern Recognition'],
      keywords: ['client analysis', 'invoice history', 'client tracking']
    },
    {
      id: '14',
      name: 'Custom Invoice Theme Creator',
      description: 'Create custom invoice themes and branding',
      category: 'invoice-creation',
      slug: 'custom-invoice-theme-creator',
      icon: <Zap className="w-6 h-6" />,
      features: ['Theme Customization', 'Branding Tools', 'Template Design'],
      keywords: ['invoice themes', 'branding', 'custom design']
    },
    {
      id: '15',
      name: 'Client Payment Behavior Score Tool',
      description: 'Score and analyze client payment behavior patterns',
      category: 'analytics',
      slug: 'client-payment-behavior-score-tool',
      icon: <CreditCard className="w-6 h-6" />,
      features: ['Behavior Scoring', 'Risk Assessment', 'Payment Analysis'],
      keywords: ['payment behavior', 'client scoring', 'risk assessment']
    },
    {
      id: '16',
      name: 'Partial Payment Invoice Tracker',
      description: 'Track partial payments and outstanding amounts',
      category: 'tracking',
      slug: 'partial-payment-invoice-tracker',
      icon: <Receipt className="w-6 h-6" />,
      features: ['Partial Payment Tracking', 'Outstanding Calculation', 'Payment History'],
      keywords: ['partial payment', 'outstanding tracking', 'payment history']
    },
    {
      id: '17',
      name: 'Time vs Billable Hours Graph',
      description: 'Compare actual time vs billable hours with visual graphs',
      category: 'analytics',
      slug: 'time-vs-billable-hours-graph',
      icon: <BarChart3 className="w-6 h-6" />,
      features: ['Time Tracking', 'Billable Analysis', 'Visual Graphs'],
      keywords: ['billable hours', 'time tracking', 'productivity analysis']
    },
    {
      id: '18',
      name: 'Invoice Email Tracker',
      description: 'Track invoice emails and delivery status',
      category: 'tracking',
      slug: 'invoice-email-tracker',
      icon: <Activity className="w-6 h-6" />,
      features: ['Email Tracking', 'Delivery Status', 'Open Rate Analysis'],
      keywords: ['email tracker', 'delivery status', 'email analytics']
    },
    {
      id: '19',
      name: 'GST-Inclusive Invoice Builder',
      description: 'Build invoices with automatic GST inclusion',
      category: 'invoice-creation',
      slug: 'gst-inclusive-invoice-builder',
      icon: <Calculator className="w-6 h-6" />,
      features: ['GST Inclusion', 'Tax Calculation', 'Compliance Ready'],
      keywords: ['GST invoice', 'tax inclusive', 'compliance']
    },
    {
      id: '20',
      name: 'Outstanding Receivable Heatmap',
      description: 'Visualize outstanding receivables with heatmap analysis',
      category: 'analytics',
      slug: 'outstanding-receivable-heatmap',
      icon: <PieChart className="w-6 h-6" />,
      features: ['Heatmap Visualization', 'Risk Analysis', 'Collection Priority'],
      keywords: ['receivable heatmap', 'outstanding analysis', 'collection priority']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', count: tools.length },
    { id: 'invoice-creation', name: 'Invoice Creation', count: tools.filter(t => t.category === 'invoice-creation').length },
    { id: 'tracking', name: 'Tracking & Management', count: tools.filter(t => t.category === 'tracking').length },
    { id: 'analytics', name: 'Analytics & Reports', count: tools.filter(t => t.category === 'analytics').length },
    { id: 'automation', name: 'Automation', count: tools.filter(t => t.category === 'automation').length },
    { id: 'tax', name: 'Tax & Compliance', count: tools.filter(t => t.category === 'tax').length },
    { id: 'education', name: 'Education', count: tools.filter(t => t.category === 'education').length }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHelmet
        title="Invoicing & Receivables Tools Hub - 50+ Professional Tools | MoneyCal"
        description="Access 50+ professional invoicing and receivables management tools. Generate invoices, track payments, analyze cash flow, and manage receivables with our comprehensive suite of business tools."
        keywords="invoicing tools, receivables management, invoice generator, payment tracker, cash flow analysis, business tools, invoice templates, GST calculator, payment reminder"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Invoicing & Receivables Tools Hub
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Professional invoicing and receivables management tools for businesses. 
                Generate invoices, track payments, analyze cash flow, and optimize your receivables.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  50+ Tools
                </div>
                <div className="flex items-center">
                  <Calculator className="w-4 h-4 mr-2" />
                  Professional Grade
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/invoicing-tools/${tool.slug}`}
                    className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-blue-300 transform hover:-translate-y-1 duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mr-4">
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {tool.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="capitalize">{tool.category.replace('-', ' ')}</span>
                        <span className="text-blue-600 font-medium">Try Tool →</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Professional Invoicing & Receivables Management
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Invoice Creation Tools
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Professional invoice generation with customizable templates, GST compliance, and multi-currency support.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Custom Templates:</strong> Branded invoice designs</p>
                    <p><strong>GST Compliance:</strong> Automatic tax calculations</p>
                    <p><strong>Multi-Currency:</strong> International billing support</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                    Analytics & Reporting
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Comprehensive analytics for cash flow analysis, payment patterns, and receivables management.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Cash Flow Analysis:</strong> Track receivables vs payables</p>
                    <p><strong>Payment Patterns:</strong> Client behavior analysis</p>
                    <p><strong>Visual Reports:</strong> Interactive dashboards</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-purple-600" />
                    Tracking & Management
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Complete tracking of invoice lifecycle from creation to payment collection.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Due Date Tracking:</strong> Payment deadline management</p>
                    <p><strong>Payment Status:</strong> Real-time payment updates</p>
                    <p><strong>Dispute Management:</strong> Resolution tracking</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-orange-600" />
                    Automation Tools
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Automate repetitive tasks and streamline your invoicing workflow.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Recurring Invoices:</strong> Auto-scheduled billing</p>
                    <p><strong>Payment Reminders:</strong> Automated follow-ups</p>
                    <p><strong>PO Conversion:</strong> Automatic invoice generation</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Why Choose Our Invoicing Tools?
                </h3>
                <div className="space-y-4 text-blue-700">
                  <p>
                    <strong>Professional Grade:</strong> Our tools are designed for businesses of all sizes, 
                    from freelancers to large enterprises, with features that meet professional standards.
                  </p>
                  <p>
                    <strong>Compliance Ready:</strong> All tools are built with Indian tax compliance in mind, 
                    including GST calculations and proper invoice formatting requirements.
                  </p>
                  <p>
                    <strong>User-Friendly:</strong> Intuitive interfaces make it easy to generate invoices, 
                    track payments, and analyze your receivables without technical expertise.
                  </p>
                  <p>
                    <strong>Comprehensive Suite:</strong> From invoice creation to payment collection, 
                    our tools cover the entire invoicing and receivables management lifecycle.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InvoicingReceivablesHub;
