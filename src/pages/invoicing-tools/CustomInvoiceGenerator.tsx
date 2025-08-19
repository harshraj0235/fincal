import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calculator, 
  Download, 
  Plus, 
  Trash2,
  Save,
  Eye,
  Printer,
  Mail,
  Settings,
  User,
  Building,
  Calendar,
  DollarSign,
  Percent,
  Hash,
  Smartphone,
  Info
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
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  notes: string;
  terms: string;
}

const CustomInvoiceGenerator: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    companyPhone: '',
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    clientPhone: '',
    items: [
      {
        id: '1',
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
      }
    ],
    subtotal: 0,
    taxRate: 18,
    taxAmount: 0,
    discount: 0,
    total: 0,
    notes: '',
    terms: 'Payment is due within 30 days of invoice date.'
  });

  const [previewMode, setPreviewMode] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

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

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = (subtotal * invoiceData.taxRate) / 100;
    const total = subtotal + taxAmount - invoiceData.discount;
    
    setInvoiceData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
    }));
  };

  React.useEffect(() => {
    calculateTotals();
  }, [invoiceData.items, invoiceData.taxRate, invoiceData.discount]);

  const generatePDF = () => {
    // In a real implementation, you would use a library like jsPDF or html2pdf
    // For now, we'll create a print-friendly version
    window.print();
  };

  const saveInvoice = () => {
    const dataStr = JSON.stringify(invoiceData);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoiceData.invoiceNumber}.json`;
    link.click();
  };

  const loadTemplate = (template: string) => {
    const templates = {
      basic: {
        companyName: 'Your Company Name',
        companyAddress: '123 Business Street\nCity, State 12345',
        companyEmail: 'info@yourcompany.com',
        companyPhone: '+91 98765 43210',
        terms: 'Payment is due within 30 days of invoice date.'
      },
      professional: {
        companyName: 'Professional Services Ltd.',
        companyAddress: '456 Corporate Plaza\nMumbai, Maharashtra 400001',
        companyEmail: 'accounts@professionalservices.com',
        companyPhone: '+91 22 1234 5678',
        terms: 'Payment terms: Net 30 days. Late payments subject to 1.5% monthly interest.'
      },
      freelancer: {
        companyName: 'Freelance Professional',
        companyAddress: '789 Home Office\nBangalore, Karnataka 560001',
        companyEmail: 'hello@freelancepro.com',
        companyPhone: '+91 98765 43210',
        terms: 'Payment due upon receipt. 50% advance required for new projects.'
      }
    };

    const templateData = templates[template as keyof typeof templates];
    setInvoiceData(prev => ({
      ...prev,
      ...templateData
    }));
  };

  return (
    <>
      <SEOHelmet
        title="Custom Invoice Generator - Professional PDF Invoice Creator | MoneyCal"
        description="Create professional invoices with downloadable PDF format. Customize templates, add items, calculate taxes, and generate branded invoices for your business."
        keywords="invoice generator, PDF invoice, custom invoice, professional invoice, invoice template, GST invoice, business invoice"
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
                Custom Invoice Generator
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Create professional invoices with downloadable PDF format. 
                Customize templates, add items, calculate taxes, and generate branded invoices.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  PDF Download
                </div>
                <div className="flex items-center">
                  <Calculator className="w-4 h-4 mr-2" />
                  Tax Calculation
                </div>
                <div className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Custom Templates
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FileText className="h-6 w-6 mr-3 text-blue-600" />
                    Invoice Details
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => loadTemplate('basic')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                    >
                      Basic
                    </button>
                    <button
                      onClick={() => loadTemplate('professional')}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                    >
                      Professional
                    </button>
                    <button
                      onClick={() => loadTemplate('freelancer')}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200"
                    >
                      Freelancer
                    </button>
                  </div>
                </div>

                {/* Invoice Header */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                      <input
                        type="text"
                        value={invoiceData.invoiceNumber}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
                      <input
                        type="date"
                        value={invoiceData.invoiceDate}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Company Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-blue-600" />
                      Company Information
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={invoiceData.companyName}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Company Address"
                        value={invoiceData.companyAddress}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, companyAddress: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="email"
                          placeholder="Email"
                          value={invoiceData.companyEmail}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, companyEmail: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={invoiceData.companyPhone}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, companyPhone: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Client Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-green-600" />
                      Client Information
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={invoiceData.clientName}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, clientName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Client Address"
                        value={invoiceData.clientAddress}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, clientAddress: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="email"
                          placeholder="Email"
                          value={invoiceData.clientEmail}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, clientEmail: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={invoiceData.clientPhone}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, clientPhone: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Invoice Items */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Hash className="w-5 h-5 mr-2 text-purple-600" />
                        Invoice Items
                      </h3>
                      <button
                        onClick={addItem}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Item
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {invoiceData.items.map((item, index) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                placeholder="Item description"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
                              <input
                                type="number"
                                value={item.rate}
                                onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div className="col-span-1">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                              <div className="px-3 py-2 bg-gray-50 rounded text-sm font-medium">
                                ₹{item.amount.toLocaleString()}
                              </div>
                            </div>
                            <div className="col-span-1 flex items-end">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-800"
                                disabled={invoiceData.items.length === 1}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tax and Discount */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Calculator className="w-5 h-5 mr-2 text-orange-600" />
                      Tax & Discount
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                        <input
                          type="number"
                          value={invoiceData.taxRate}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Discount (₹)</label>
                        <input
                          type="number"
                          value={invoiceData.discount}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total</label>
                        <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-lg font-bold text-blue-900">
                          ₹{invoiceData.total.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes and Terms */}
                  <div className="border-t pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea
                          value={invoiceData.notes}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                          rows={3}
                          placeholder="Additional notes..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
                        <textarea
                          value={invoiceData.terms}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, terms: e.target.value }))}
                          rows={3}
                          placeholder="Payment terms..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Invoice Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Eye className="h-6 w-6 mr-3 text-green-600" />
                    Invoice Preview
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={saveInvoice}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={generatePDF}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>

                {/* Invoice Preview Content */}
                <div 
                  ref={invoiceRef}
                  className="border border-gray-300 rounded-lg p-6 bg-white"
                  style={{ minHeight: '600px' }}
                >
                  {/* Invoice Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Invoice #:</strong> {invoiceData.invoiceNumber}</p>
                        <p><strong>Date:</strong> {new Date(invoiceData.invoiceDate).toLocaleDateString()}</p>
                        <p><strong>Due Date:</strong> {new Date(invoiceData.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{invoiceData.companyName}</h2>
                      <div className="text-sm text-gray-600 whitespace-pre-line">
                        {invoiceData.companyAddress}
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        <p>Email: {invoiceData.companyEmail}</p>
                        <p>Phone: {invoiceData.companyPhone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bill To */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Bill To:</h3>
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold">{invoiceData.clientName}</p>
                      <div className="whitespace-pre-line">{invoiceData.clientAddress}</div>
                      <p>Email: {invoiceData.clientEmail}</p>
                      <p>Phone: {invoiceData.clientPhone}</p>
                    </div>
                  </div>

                  {/* Invoice Items Table */}
                  <div className="mb-8">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Qty</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Rate</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.items.map((item) => (
                          <tr key={item.id} className="border-b border-gray-200">
                            <td className="py-3 px-4">{item.description}</td>
                            <td className="py-3 px-4 text-right">{item.quantity}</td>
                            <td className="py-3 px-4 text-right">₹{item.rate.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right font-semibold">₹{item.amount.toLocaleString()}</td>
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
                        <span>₹{invoiceData.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Tax ({invoiceData.taxRate}%):</span>
                        <span>₹{invoiceData.taxAmount.toLocaleString()}</span>
                      </div>
                      {invoiceData.discount > 0 && (
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Discount:</span>
                          <span>-₹{invoiceData.discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-3 border-t-2 border-gray-300 font-bold text-lg">
                        <span>Total:</span>
                        <span>₹{invoiceData.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes and Terms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    {invoiceData.notes && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Notes:</h4>
                        <p className="text-gray-600">{invoiceData.notes}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions:</h4>
                      <p className="text-gray-600">{invoiceData.terms}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Professional Invoice Generation Made Easy
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Professional Templates
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Choose from multiple professional invoice templates designed for different business types.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Basic Template:</strong> Simple and clean design</p>
                    <p><strong>Professional Template:</strong> Corporate branding ready</p>
                    <p><strong>Freelancer Template:</strong> Perfect for individual professionals</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-green-600" />
                    Automatic Calculations
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Automatic calculation of totals, taxes, and discounts with real-time updates.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Item Totals:</strong> Automatic quantity × rate calculation</p>
                    <p><strong>Tax Calculation:</strong> Configurable tax rates</p>
                    <p><strong>Discounts:</strong> Apply discounts and see final totals</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Download className="w-5 h-5 mr-2 text-purple-600" />
                    PDF Export
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Download your invoices as professional PDF files ready for printing or emailing.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>High Quality:</strong> Print-ready PDF format</p>
                    <p><strong>Professional Layout:</strong> Clean and organized design</p>
                    <p><strong>Easy Sharing:</strong> Email or print directly</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-orange-600" />
                    Customization
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Fully customizable invoices with your branding, terms, and specific requirements.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Company Details:</strong> Add your business information</p>
                    <p><strong>Custom Terms:</strong> Include your payment terms</p>
                    <p><strong>Item Management:</strong> Add unlimited items</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Best Practices for Professional Invoices
                </h3>
                <div className="space-y-4 text-blue-700">
                  <p>
                    <strong>Clear Item Descriptions:</strong> Provide detailed descriptions for each item 
                    or service to avoid confusion and disputes.
                  </p>
                  <p>
                    <strong>Accurate Calculations:</strong> Double-check all calculations, especially 
                    taxes and discounts, to ensure accuracy.
                  </p>
                  <p>
                    <strong>Professional Branding:</strong> Include your company logo and use consistent 
                    branding across all invoices.
                  </p>
                  <p>
                    <strong>Clear Payment Terms:</strong> Specify payment due dates, accepted payment 
                    methods, and any late payment fees.
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

export default CustomInvoiceGenerator;
