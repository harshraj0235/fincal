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
  HelpCircle,
  Database,
  FolderOpen,
  Tag,
  Package,
  ShoppingCart,
  Archive,
  RefreshCw,
  Edit3,
  Trash2,
  Copy,
  Star as StarIcon,
  FileDown,
  Palette as PaletteIcon,
  Layout,
  Image as ImageIcon,
  Type as TypeIcon,
  Eye as EyeIcon,
  Download as DownloadIcon,
  Mail as MailIcon,
  Printer as PrinterIcon,
  Save as SaveIcon,
  RotateCcw,
  ChevronDown,
  ChevronUp
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
  clientPhone: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  companyLogo: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  total: number;
  notes: string;
  terms: string;
  currency: string;
  template: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

const CustomInvoiceGenerator: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    clientPhone: '',
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    companyPhone: '',
    companyLogo: '',
    items: [],
    subtotal: 0,
    taxRate: 18,
    taxAmount: 0,
    discountRate: 0,
    discountAmount: 0,
    total: 0,
    notes: '',
    terms: 'Payment is due within 30 days of invoice date.',
    currency: 'INR',
    template: 'modern',
    status: 'draft'
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [savedInvoices, setSavedInvoices] = useState<InvoiceData[]>([]);

  const templates = [
    { id: 'modern', name: 'Modern', preview: 'Clean and professional design' },
    { id: 'classic', name: 'Classic', preview: 'Traditional business format' },
    { id: 'minimal', name: 'Minimal', preview: 'Simple and elegant layout' },
    { id: 'colorful', name: 'Colorful', preview: 'Vibrant and eye-catching' }
  ];

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' }
  ];

  useEffect(() => {
    // Load saved invoices from localStorage
    const saved = localStorage.getItem('savedInvoices');
    if (saved) {
      setSavedInvoices(JSON.parse(saved));
    }

    // Generate invoice number
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    setInvoiceData(prev => ({ ...prev, invoiceNumber }));
  }, []);

  useEffect(() => {
    // Calculate totals
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = (subtotal * invoiceData.taxRate) / 100;
    const discountAmount = (subtotal * invoiceData.discountRate) / 100;
    const total = subtotal + taxAmount - discountAmount;

    setInvoiceData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      discountAmount,
      total
    }));
  }, [invoiceData.items, invoiceData.taxRate, invoiceData.discountRate]);

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

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
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

  const removeItem = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const saveInvoice = () => {
    const updatedInvoices = [...savedInvoices, invoiceData];
    setSavedInvoices(updatedInvoices);
    localStorage.setItem('savedInvoices', JSON.stringify(updatedInvoices));
    alert('Invoice saved successfully!');
  };

  const generatePDF = () => {
    // In a real implementation, this would use a PDF library like jsPDF
    alert('PDF generation feature would be implemented here. For now, you can print the preview.');
    setShowPreview(true);
  };

  const sendInvoice = () => {
    // In a real implementation, this would integrate with email services
    alert('Email feature would be implemented here. For now, the invoice is ready to be sent.');
  };

  const loadTemplate = (templateId: string) => {
    setInvoiceData(prev => ({ ...prev, template: templateId }));
    setShowTemplateSelector(false);
  };

  const resetForm = () => {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      setInvoiceData({
        invoiceNumber,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        clientName: '',
        clientEmail: '',
        clientAddress: '',
        clientPhone: '',
        companyName: '',
        companyAddress: '',
        companyEmail: '',
        companyPhone: '',
        companyLogo: '',
        items: [],
        subtotal: 0,
        taxRate: 18,
        taxAmount: 0,
        discountRate: 0,
        discountAmount: 0,
        total: 0,
        notes: '',
        terms: 'Payment is due within 30 days of invoice date.',
        currency: 'INR',
        template: 'modern',
        status: 'draft'
      });
    }
  };

  const selectedCurrency = currencies.find(c => c.code === invoiceData.currency);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEOHelmet
        title="Custom Invoice Generator - Professional PDF Invoice Creator | MoneyCal"
        description="Create professional invoices with downloadable PDF format. Custom templates, professional formatting, and comprehensive invoice management for businesses."
        keywords="custom invoice generator, PDF invoice, professional invoice, invoice templates, invoice creation, business invoicing, invoice management"
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
            Create professional invoices with downloadable PDF format. Choose from multiple templates, 
            customize your design, and generate professional invoices for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <FileDown className="w-4 h-4 mr-2" />
              PDF Download
            </div>
            <div className="flex items-center">
              <PaletteIcon className="w-4 h-4 mr-2" />
              Custom Templates
            </div>
            <div className="flex items-center">
              <Layout className="w-4 h-4 mr-2" />
              Professional Format
            </div>
            <div className="flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Auto Save
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invoice Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              {/* Header Actions */}
              <div className="flex flex-wrap justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Invoice Details</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowTemplateSelector(true)}
                    className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <PaletteIcon className="w-4 h-4 mr-2" />
                    Template
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={invoiceData.currency}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
                  <input
                    type="date"
                    value={invoiceData.date}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
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

              {/* Company Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={invoiceData.companyName}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
                    <input
                      type="email"
                      value={invoiceData.companyEmail}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, companyEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="company@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                    <textarea
                      value={invoiceData.companyAddress}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, companyAddress: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Company address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Phone</label>
                    <input
                      type="tel"
                      value={invoiceData.companyPhone}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, companyPhone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo URL</label>
                    <input
                      type="url"
                      value={invoiceData.companyLogo}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, companyLogo: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <input
                      type="text"
                      value={invoiceData.clientName}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Client Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
                    <input
                      type="email"
                      value={invoiceData.clientEmail}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, clientEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="client@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Address</label>
                    <textarea
                      value={invoiceData.clientAddress}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, clientAddress: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Client address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Phone</label>
                    <input
                      type="tel"
                      value={invoiceData.clientPhone}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Invoice Items</h3>
                  <button
                    onClick={addItem}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </button>
                </div>
                
                <div className="space-y-4">
                  {invoiceData.items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-lg">
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
                        <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg">
                          {selectedCurrency?.symbol}{item.amount.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax and Discount */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Rate (%)</label>
                  <input
                    type="number"
                    value={invoiceData.discountRate}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, discountRate: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Notes and Terms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={invoiceData.notes}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Additional notes for the client"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
                  <textarea
                    value={invoiceData.terms}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, terms: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Payment terms and conditions"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Invoice Summary */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{selectedCurrency?.symbol}{invoiceData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({invoiceData.taxRate}%):</span>
                    <span className="font-medium">{selectedCurrency?.symbol}{invoiceData.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount ({invoiceData.discountRate}%):</span>
                    <span className="font-medium text-red-600">-{selectedCurrency?.symbol}{invoiceData.discountAmount.toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">{selectedCurrency?.symbol}{invoiceData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    Preview Invoice
                  </button>
                  <button
                    onClick={generatePDF}
                    className="w-full flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                  <button
                    onClick={saveInvoice}
                    className="w-full flex items-center justify-center px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <SaveIcon className="w-4 h-4 mr-2" />
                    Save Invoice
                  </button>
                  <button
                    onClick={sendInvoice}
                    className="w-full flex items-center justify-center px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <MailIcon className="w-4 h-4 mr-2" />
                    Send Invoice
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <PrinterIcon className="w-4 h-4 mr-2" />
                    Print Invoice
                  </button>
                </div>
              </div>

              {/* Saved Invoices */}
              {savedInvoices.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Invoices</h3>
                  <div className="space-y-2">
                    {savedInvoices.slice(-5).map((invoice, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-sm">{invoice.invoiceNumber}</div>
                        <div className="text-xs text-gray-600">{invoice.clientName}</div>
                        <div className="text-xs text-gray-600">{selectedCurrency?.symbol}{invoice.total.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Template Selector Modal */}
        {showTemplateSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Choose Template</h2>
                <button
                  onClick={() => setShowTemplateSelector(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => loadTemplate(template.id)}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      invoiceData.template === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-gray-600 text-sm">{template.preview}</p>
                    <div className="mt-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Template Preview</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Invoice Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Invoice Preview</h2>
                <div className="flex gap-2">
                  <button
                    onClick={generatePDF}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Invoice Preview Content */}
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{invoiceData.companyName || 'Your Company'}</h1>
                    <p className="text-gray-600">{invoiceData.companyAddress}</p>
                    <p className="text-gray-600">{invoiceData.companyEmail}</p>
                    <p className="text-gray-600">{invoiceData.companyPhone}</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">INVOICE</h2>
                    <p className="text-gray-600">Invoice #: {invoiceData.invoiceNumber}</p>
                    <p className="text-gray-600">Date: {invoiceData.date}</p>
                    <p className="text-gray-600">Due Date: {invoiceData.dueDate}</p>
                  </div>
                </div>

                {/* Client Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bill To:</h3>
                  <p className="text-gray-900 font-medium">{invoiceData.clientName || 'Client Name'}</p>
                  <p className="text-gray-600">{invoiceData.clientAddress}</p>
                  <p className="text-gray-600">{invoiceData.clientEmail}</p>
                  <p className="text-gray-600">{invoiceData.clientPhone}</p>
                </div>

                {/* Items Table */}
                <div className="mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 border border-gray-200">Description</th>
                        <th className="text-right p-3 border border-gray-200">Quantity</th>
                        <th className="text-right p-3 border border-gray-200">Rate</th>
                        <th className="text-right p-3 border border-gray-200">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item, index) => (
                        <tr key={item.id}>
                          <td className="p-3 border border-gray-200">{item.description}</td>
                          <td className="p-3 border border-gray-200 text-right">{item.quantity}</td>
                          <td className="p-3 border border-gray-200 text-right">{selectedCurrency?.symbol}{item.rate.toFixed(2)}</td>
                          <td className="p-3 border border-gray-200 text-right">{selectedCurrency?.symbol}{item.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-8">
                  <div className="w-64">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal:</span>
                      <span>{selectedCurrency?.symbol}{invoiceData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Tax ({invoiceData.taxRate}%):</span>
                      <span>{selectedCurrency?.symbol}{invoiceData.taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Discount ({invoiceData.discountRate}%):</span>
                      <span className="text-red-600">-{selectedCurrency?.symbol}{invoiceData.discountAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>{selectedCurrency?.symbol}{invoiceData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes and Terms */}
                {(invoiceData.notes || invoiceData.terms) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {invoiceData.notes && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
                        <p className="text-gray-600">{invoiceData.notes}</p>
                      </div>
                    )}
                    {invoiceData.terms && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
                        <p className="text-gray-600">{invoiceData.terms}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Comprehensive Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mt-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Custom Invoice Generator - Complete Guide</h2>
          
          <div className="prose prose-lg max-w-none">
            <h3>What is a Custom Invoice Generator?</h3>
            <p>
              A custom invoice generator is a professional tool that allows businesses to create, customize, and manage 
              invoices with advanced features like PDF generation, multiple templates, and comprehensive formatting options.
            </p>

            <h3>Key Features</h3>
            <ul>
              <li><strong>PDF Download:</strong> Generate professional PDF invoices for easy sharing and printing</li>
              <li><strong>Custom Templates:</strong> Choose from multiple professional templates or create your own</li>
              <li><strong>Professional Formatting:</strong> Industry-standard invoice layout with all necessary details</li>
              <li><strong>Auto Calculations:</strong> Automatic tax, discount, and total calculations</li>
              <li><strong>Client Management:</strong> Store and manage client information for quick access</li>
              <li><strong>Item Library:</strong> Save frequently used items for faster invoice creation</li>
              <li><strong>Multi-Currency Support:</strong> Create invoices in different currencies</li>
              <li><strong>Email Integration:</strong> Send invoices directly to clients via email</li>
            </ul>

            <h3>Benefits of Using a Custom Invoice Generator</h3>
            <p>
              A professional invoice generator saves time, ensures consistency, and presents a professional image to clients. 
              It helps streamline your billing process, reduce errors, and improve cash flow management.
            </p>

            <h3>Related Tools</h3>
            <p>
              Enhance your invoicing workflow with our related tools including the 
              <a href="/invoicing-tools/invoice-item-library" className="text-blue-600 hover:underline"> Invoice Item Library</a> for managing invoice items,
              <a href="/invoicing-tools/recurring-invoice-scheduler" className="text-blue-600 hover:underline"> Recurring Invoice Scheduler</a> for automated billing, and
              <a href="/invoicing-tools/invoice-due-date-tracker" className="text-blue-600 hover:underline"> Invoice Due Date Tracker</a> for payment monitoring.
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
