import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar,
  DollarSign,
  AlertCircle,
  Clock,
  Users,
  Activity,
  Filter,
  Download,
  RefreshCw,
  Info
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'current' | '30-60' | '60-90' | '90+';
  daysOverdue: number;
  paidAmount: number;
  outstandingAmount: number;
}

const InvoiceAgeingReportVisualizer: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-001',
      clientName: 'ABC Company',
      amount: 50000,
      issueDate: '2024-01-01',
      dueDate: '2024-01-31',
      status: 'current',
      daysOverdue: 0,
      paidAmount: 0,
      outstandingAmount: 50000
    },
    {
      id: '2',
      invoiceNumber: 'INV-002',
      clientName: 'XYZ Corporation',
      amount: 75000,
      issueDate: '2023-12-01',
      dueDate: '2023-12-31',
      status: '30-60',
      daysOverdue: 45,
      paidAmount: 0,
      outstandingAmount: 75000
    },
    {
      id: '3',
      invoiceNumber: 'INV-003',
      clientName: 'Tech Solutions Ltd',
      amount: 30000,
      issueDate: '2023-11-01',
      dueDate: '2023-11-30',
      status: '60-90',
      daysOverdue: 75,
      paidAmount: 0,
      outstandingAmount: 30000
    },
    {
      id: '4',
      invoiceNumber: 'INV-004',
      clientName: 'Digital Agency',
      amount: 45000,
      issueDate: '2023-10-01',
      dueDate: '2023-10-31',
      status: '90+',
      daysOverdue: 105,
      paidAmount: 0,
      outstandingAmount: 45000
    },
    {
      id: '5',
      invoiceNumber: 'INV-005',
      clientName: 'Marketing Pro',
      amount: 25000,
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      status: 'current',
      daysOverdue: 0,
      paidAmount: 0,
      outstandingAmount: 25000
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-600 bg-green-100';
      case '30-60': return 'text-yellow-600 bg-yellow-100';
      case '60-90': return 'text-orange-600 bg-orange-100';
      case '90+': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'current': return 'Current (0-30 days)';
      case '30-60': return '30-60 Days';
      case '60-90': return '60-90 Days';
      case '90+': return '90+ Days';
      default: return status;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesPeriod = selectedPeriod === 'all' || invoice.status === selectedPeriod;
    const matchesClient = selectedClient === 'all' || invoice.clientName === selectedClient;
    return matchesPeriod && matchesClient;
  });

  const ageingSummary = {
    current: invoices.filter(inv => inv.status === 'current').reduce((sum, inv) => sum + inv.outstandingAmount, 0),
    '30-60': invoices.filter(inv => inv.status === '30-60').reduce((sum, inv) => sum + inv.outstandingAmount, 0),
    '60-90': invoices.filter(inv => inv.status === '60-90').reduce((sum, inv) => sum + inv.outstandingAmount, 0),
    '90+': invoices.filter(inv => inv.status === '90+').reduce((sum, inv) => sum + inv.outstandingAmount, 0)
  };

  const totalOutstanding = Object.values(ageingSummary).reduce((sum, amount) => sum + amount, 0);
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);

  const ageingData = [
    { name: 'Current (0-30 days)', value: ageingSummary.current, color: '#10B981' },
    { name: '30-60 Days', value: ageingSummary['30-60'], color: '#F59E0B' },
    { name: '60-90 Days', value: ageingSummary['60-90'], color: '#F97316' },
    { name: '90+ Days', value: ageingSummary['90+'], color: '#EF4444' }
  ];

  const clients = Array.from(new Set(invoices.map(inv => inv.clientName)));

  return (
    <>
      <SEOHelmet
        title="Invoice Ageing Report Visualizer - Payment Analysis Tool | MoneyCal"
        description="Visualize invoice ageing and payment patterns. Analyze outstanding receivables, track payment delays, and optimize your collection strategy with detailed ageing reports."
        keywords="invoice ageing report, payment analysis, receivables aging, outstanding invoices, collection analysis, payment patterns"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Invoice Ageing Report Visualizer
              </h1>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Visualize invoice ageing and payment patterns. Analyze outstanding receivables, 
                track payment delays, and optimize your collection strategy.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-orange-100">
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ageing Analysis
                </div>
                <div className="flex items-center">
                  <PieChart className="w-4 h-4 mr-2" />
                  Payment Patterns
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Visual Reports
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Collection Strategy
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Outstanding</p>
                    <p className="text-2xl font-bold text-red-600">₹{totalOutstanding.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Invoiced</p>
                    <p className="text-2xl font-bold text-blue-600">₹{totalInvoiced.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Collection Rate</p>
                    <p className="text-2xl font-bold text-green-600">
                      {totalInvoiced > 0 ? ((totalPaid / totalInvoiced) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overdue Invoices</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {invoices.filter(inv => inv.status !== 'current').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Filter className="h-6 w-6 mr-3 text-orange-600" />
                  Ageing Analysis
                </h2>
                <div className="flex space-x-4">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Periods</option>
                    <option value="current">Current (0-30 days)</option>
                    <option value="30-60">30-60 Days</option>
                    <option value="60-90">60-90 Days</option>
                    <option value="90+">90+ Days</option>
                  </select>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Clients</option>
                    {clients.map(client => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-orange-600" />
                  Outstanding by Age
                </h3>
                <div className="space-y-4">
                  {ageingData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-700">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">₹{item.value.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">
                          {totalOutstanding > 0 ? ((item.value / totalOutstanding) * 100).toFixed(1) : 0}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bar Chart */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Outstanding Amount by Period
                </h3>
                <div className="space-y-4">
                  {ageingData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="font-semibold">₹{item.value.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${totalOutstanding > 0 ? (item.value / totalOutstanding) * 100 : 0}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detailed Table */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-gray-600" />
                  Detailed Ageing Report
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days Overdue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ageing Bucket
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Outstanding
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                            <div className="text-sm text-gray-500">{new Date(invoice.issueDate).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{invoice.clientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{invoice.amount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(invoice.dueDate).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${invoice.daysOverdue > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {invoice.daysOverdue > 0 ? `${invoice.daysOverdue} days` : 'Current'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            {getStatusLabel(invoice.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{invoice.outstandingAmount.toLocaleString()}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding Invoice Ageing Analysis
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-600" />
                    Current (0-30 Days)
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Invoices that are current or within the normal payment period.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Action:</strong> Normal follow-up procedures</p>
                    <p><strong>Risk Level:</strong> Low</p>
                    <p><strong>Collection Strategy:</strong> Standard reminders</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                    30-60 Days
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Invoices that are overdue but still within manageable range.
                  </p>
                  <div className="space-y-2 text-sm text-yellow-700">
                    <p><strong>Action:</strong> Increased follow-up frequency</p>
                    <p><strong>Risk Level:</strong> Medium</p>
                    <p><strong>Collection Strategy:</strong> Phone calls and emails</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                    60-90 Days
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Seriously overdue invoices requiring immediate attention.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Action:</strong> Escalated collection efforts</p>
                    <p><strong>Risk Level:</strong> High</p>
                    <p><strong>Collection Strategy:</strong> Formal demand letters</p>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                    90+ Days
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Critically overdue invoices that may require legal action.
                  </p>
                  <div className="space-y-2 text-sm text-red-700">
                    <p><strong>Action:</strong> Legal collection procedures</p>
                    <p><strong>Risk Level:</strong> Critical</p>
                    <p><strong>Collection Strategy:</strong> Legal action or write-off</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Best Practices for Invoice Ageing Management
                </h3>
                <div className="space-y-4 text-orange-700">
                  <p>
                    <strong>Regular Monitoring:</strong> Review your ageing report weekly to identify 
                    invoices that are approaching or exceeding payment terms.
                  </p>
                  <p>
                    <strong>Proactive Communication:</strong> Contact clients before invoices become 
                    overdue to maintain positive relationships and improve collection rates.
                  </p>
                  <p>
                    <strong>Escalation Procedures:</strong> Have clear escalation procedures for 
                    different ageing buckets to ensure consistent collection efforts.
                  </p>
                  <p>
                    <strong>Payment Terms Review:</strong> Regularly review and adjust payment terms 
                    based on client payment behavior and industry standards.
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

export default InvoiceAgeingReportVisualizer;
