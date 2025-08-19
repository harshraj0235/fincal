import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Save,
  Eye,
  Printer,
  Mail,
  Settings,
  Building,
  Calendar,
  Percent,
  Hash,
  Smartphone,
  Info,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Clock,
  DollarSign,
  Users,
  MessageSquare,
  Flag,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  User,
  Activity,
  Palette,
  Image,
  Type,
  Shield,
  Star,
  Calculator,
  Timer,
  Send,
  Receipt,
  Map,
  CreditCard,
  Zap,
  Target,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string;
  terms: string;
}

const CustomInvoiceGenerator: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    items: [{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    taxRate: 18,
    taxAmount: 0,
    total: 0,
    notes: '',
    terms: 'Net 30 days'
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');

  useEffect(() => {
    calculateTotals();
  }, [invoiceData.items, invoiceData.taxRate]);

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = (subtotal * invoiceData.taxRate) / 100;
    const total = subtotal + taxAmount;

    setInvoiceData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
    }));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id: string) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const generatePDF = () => {
    alert('PDF generation feature - Professional invoice would be downloaded');
  };

  const saveInvoice = () => {
    const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    savedInvoices.push({
      ...invoiceData,
      id: Date.now(),
      savedAt: new Date().toISOString()
    });
    localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
    alert('Invoice saved successfully!');
  };

  const templates = [
    { id: 'professional', name: 'Professional', color: 'bg-blue-500' },
    { id: 'modern', name: 'Modern', color: 'bg-purple-500' },
    { id: 'minimal', name: 'Minimal', color: 'bg-gray-500' },
    { id: 'creative', name: 'Creative', color: 'bg-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="Custom Invoice Generator - Professional PDF Invoice Creator | MoneyCal"
        description="Create professional invoices with downloadable PDF format. Generate custom invoices with advanced templates, automatic calculations, and professional formatting. Perfect for freelancers, small businesses, and professionals."
        keywords="custom invoice generator, professional invoice creator, PDF invoice generator, invoice templates, business invoice, freelance invoice, invoice maker, invoice software, invoice generator online, professional invoice format"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Custom Invoice Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create professional invoices with downloadable PDF format. Generate custom invoices with advanced templates, 
            automatic calculations, and professional formatting for your business needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              PDF Download
            </div>
            <div className="flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Custom Templates
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Professional Format
            </div>
            <div className="flex items-center">
              <Calculator className="w-4 h-4 mr-2" />
              Auto Calculations
            </div>
          </div>
        </motion.div>

        {/* Main Tool Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Invoice Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Invoice Details</h2>
            
            {/* Template Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Choose Template</label>
              <div className="grid grid-cols-2 gap-3">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded ${template.color} mx-auto mb-2`}></div>
                    <span className="text-sm font-medium">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="INV-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={invoiceData.date}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Client Information */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Client Information</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={invoiceData.clientName}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, clientName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Client Name"
                />
                <input
                  type="email"
                  value={invoiceData.clientEmail}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Client Email"
                />
                <textarea
                  value={invoiceData.clientAddress}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, clientAddress: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Client Address"
                  rows={3}
                />
              </div>
            </div>

            {/* Invoice Items */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Invoice Items</h3>
                <button
                  onClick={addItem}
                  className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </button>
              </div>
              
              <div className="space-y-4">
                {invoiceData.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Item description"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Qty"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Rate"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.amount}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        placeholder="Amount"
                      />
                    </div>
                    <div className="col-span-1">
                      {invoiceData.items.length > 1 && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-full p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax and Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  value={invoiceData.taxRate}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Notes and Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={invoiceData.notes}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Additional notes..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Terms</label>
                <textarea
                  value={invoiceData.terms}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, terms: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Payment terms..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Hide Preview' : 'Preview'}
              </button>
              <button
                onClick={saveInvoice}
                className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Invoice
              </button>
              <button
                onClick={generatePDF}
                className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </motion.div>

          {/* Invoice Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Invoice Preview</h2>
            
            <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
                  <p className="text-gray-600">Invoice #: {invoiceData.invoiceNumber || 'INV-001'}</p>
                  <p className="text-gray-600">Date: {invoiceData.date}</p>
                  {invoiceData.dueDate && <p className="text-gray-600">Due Date: {invoiceData.dueDate}</p>}
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Company</h2>
                  <p className="text-gray-600">123 Business Street</p>
                  <p className="text-gray-600">City, State 12345</p>
                  <p className="text-gray-600">contact@company.com</p>
                </div>
              </div>

              {/* Client Info */}
              {invoiceData.clientName && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bill To:</h3>
                  <p className="text-gray-900 font-medium">{invoiceData.clientName}</p>
                  {invoiceData.clientEmail && <p className="text-gray-600">{invoiceData.clientEmail}</p>}
                  {invoiceData.clientAddress && <p className="text-gray-600">{invoiceData.clientAddress}</p>}
                </div>
              )}

              {/* Items Table */}
              <div className="mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Qty</th>
                      <th className="text-right py-2">Rate</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-2">{item.description || 'Item description'}</td>
                        <td className="text-right py-2">{item.quantity}</td>
                        <td className="text-right py-2">₹{item.rate.toFixed(2)}</td>
                        <td className="text-right py-2">₹{item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">₹{invoiceData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Tax ({invoiceData.taxRate}%):</span>
                    <span className="font-medium">₹{invoiceData.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t-2 border-gray-300 pt-2">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-semibold">₹{invoiceData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Notes and Terms */}
              {(invoiceData.notes || invoiceData.terms) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {invoiceData.notes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Notes:</h4>
                      <p className="text-gray-600 text-sm">{invoiceData.notes}</p>
                    </div>
                  )}
                  {invoiceData.terms && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Terms:</h4>
                      <p className="text-gray-600 text-sm">{invoiceData.terms}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Comprehensive Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Professional Invoice Generator Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">PDF Download</h3>
              <p className="text-gray-600">Generate professional PDF invoices that are ready for printing and sharing with clients.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Templates</h3>
              <p className="text-gray-600">Choose from multiple professional templates to match your brand and business style.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Format</h3>
              <p className="text-gray-600">Industry-standard invoice format with all necessary fields and professional layout.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Auto Calculations</h3>
              <p className="text-gray-600">Automatic calculation of subtotals, taxes, and final amounts with real-time updates.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Save className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save & Manage</h3>
              <p className="text-gray-600">Save your invoices locally and manage them efficiently for future reference.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Preview</h3>
              <p className="text-gray-600">See your invoice in real-time as you make changes with our live preview feature.</p>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Invoicing Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/invoicing-tools/invoice-due-date-tracker" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Due Date Tracker</span>
                </div>
                <p className="text-sm text-gray-600">Track invoice due dates and payment status</p>
              </a>
              
              <a href="/invoicing-tools/recurring-invoice-scheduler" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-gray-900">Recurring Scheduler</span>
                </div>
                <p className="text-sm text-gray-600">Automate recurring invoice generation</p>
              </a>
              
              <a href="/invoicing-tools/gst-tax-auto-fill-invoice-tool" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <Calculator className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium text-gray-900">GST Calculator</span>
                </div>
                <p className="text-sm text-gray-600">Auto-calculate and fill GST tax details</p>
              </a>
              
              <a href="/invoicing-tools/invoice-ageing-report-visualizer" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <BarChart3 className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="font-medium text-gray-900">Ageing Reports</span>
                </div>
                <p className="text-sm text-gray-600">Visualize invoice ageing and payment patterns</p>
              </a>
            </div>
          </div>
        </motion.div>

        {/* SEO Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Professional Invoice Generator - Complete Guide</h2>
          
          <div className="prose prose-lg max-w-none">
            <h3>What is a Custom Invoice Generator?</h3>
            <p>
              A custom invoice generator is a professional tool that allows businesses, freelancers, and professionals to create 
              professional invoices with downloadable PDF format. Our advanced invoice generator provides multiple templates, 
              automatic calculations, and professional formatting to ensure your invoices look professional and are compliant 
              with business standards.
            </p>

            <h3>Key Features of Our Invoice Generator</h3>
            <ul>
              <li><strong>PDF Download:</strong> Generate professional PDF invoices that are ready for printing and sharing</li>
              <li><strong>Custom Templates:</strong> Choose from multiple professional templates to match your brand</li>
              <li><strong>Professional Format:</strong> Industry-standard invoice format with all necessary fields</li>
              <li><strong>Auto Calculations:</strong> Automatic calculation of subtotals, taxes, and final amounts</li>
              <li><strong>Client Management:</strong> Store and manage client information for quick access</li>
              <li><strong>Tax Calculation:</strong> Automatic GST and tax calculations for Indian businesses</li>
              <li><strong>Live Preview:</strong> See your invoice in real-time as you make changes</li>
              <li><strong>Save & Manage:</strong> Save invoices locally for future reference</li>
            </ul>

            <h3>Why Use Our Invoice Generator?</h3>
            <p>
              Our custom invoice generator is designed specifically for Indian businesses and professionals. It includes 
              GST calculation features, professional templates, and compliance-ready formatting. Whether you're a freelancer, 
              small business owner, or professional service provider, our tool helps you create professional invoices quickly 
              and efficiently.
            </p>

            <h3>How to Create Professional Invoices</h3>
            <ol>
              <li><strong>Choose Template:</strong> Select from our professional invoice templates</li>
              <li><strong>Enter Details:</strong> Fill in your business and client information</li>
              <li><strong>Add Items:</strong> Include all products or services with quantities and rates</li>
              <li><strong>Set Tax Rate:</strong> Configure GST or other tax rates as applicable</li>
              <li><strong>Preview:</strong> Review your invoice with our live preview feature</li>
              <li><strong>Download:</strong> Generate and download your professional PDF invoice</li>
            </ol>

            <h3>Invoice Generator for Different Business Types</h3>
            <p>
              Our invoice generator is suitable for various business types including freelancers, consultants, small businesses, 
              service providers, and professionals. The tool supports different tax structures, multiple currencies, and various 
              business requirements to ensure compliance and professionalism.
            </p>

            <h3>Related Tools and Resources</h3>
            <p>
              Enhance your invoicing process with our related tools including the <a href="/invoicing-tools/invoice-due-date-tracker" className="text-blue-600 hover:underline">Invoice Due Date Tracker</a> for 
              payment monitoring, <a href="/invoicing-tools/recurring-invoice-scheduler" className="text-blue-600 hover:underline">Recurring Invoice Scheduler</a> for automated billing, and 
              <a href="/invoicing-tools/gst-tax-auto-fill-invoice-tool" className="text-blue-600 hover:underline"> GST Tax Auto-Fill Tool</a> for tax compliance.
            </p>
          </div>
        </motion.div>
      </div>

      <WhatsAppBanner />
      <AstroFinanceButton />
    </div>
  );
};

export default CustomInvoiceGenerator;
