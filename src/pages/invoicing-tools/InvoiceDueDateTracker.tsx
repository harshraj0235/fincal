import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  TrendingUp,
  DollarSign,
  Users,
  Activity,
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
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paidAmount: number;
  notes: string;
  priority: 'low' | 'medium' | 'high';
}

const InvoiceDueDateTracker: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-001',
      clientName: 'ABC Company',
      amount: 50000,
      issueDate: '2024-01-01',
      dueDate: '2024-01-31',
      status: 'pending',
      paidAmount: 0,
      notes: 'First payment for web development project',
      priority: 'medium'
    },
    {
      id: '2',
      invoiceNumber: 'INV-002',
      clientName: 'XYZ Corporation',
      amount: 75000,
      issueDate: '2024-01-05',
      dueDate: '2024-02-05',
      status: 'paid',
      paidAmount: 75000,
      notes: 'Consulting services - fully paid',
      priority: 'high'
    },
    {
      id: '3',
      invoiceNumber: 'INV-003',
      clientName: 'Tech Solutions Ltd',
      amount: 30000,
      issueDate: '2023-12-15',
      dueDate: '2024-01-15',
      status: 'overdue',
      paidAmount: 0,
      notes: 'Software maintenance - overdue payment',
      priority: 'high'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, 'id'>>({
    invoiceNumber: '',
    clientName: '',
    amount: 0,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending',
    paidAmount: 0,
    notes: '',
    priority: 'medium'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <XCircle className="w-4 h-4" />;
      case 'partial': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const addInvoice = () => {
    const invoice: Invoice = {
      ...newInvoice,
      id: Date.now().toString()
    };
    setInvoices([...invoices, invoice]);
    setNewInvoice({
      invoiceNumber: '',
      clientName: '',
      amount: 0,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
      paidAmount: 0,
      notes: '',
      priority: 'medium'
    });
    setShowAddForm(false);
  };

  const updateInvoice = (id: string, field: keyof Invoice, value: any) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id ? { ...invoice, [field]: value } : invoice
    ));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || invoice.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const summary = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.reduce((sum, inv) => sum + inv.paidAmount, 0),
    pending: invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
    overdue: invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0),
    overdueCount: invoices.filter(inv => inv.status === 'overdue').length,
    dueThisWeek: invoices.filter(inv => {
      const daysUntilDue = getDaysUntilDue(inv.dueDate);
      return daysUntilDue >= 0 && daysUntilDue <= 7 && inv.status === 'pending';
    }).length
  };

  return (
    <>
      <SEOHelmet
        title="Invoice Due Date Tracker - Payment Status & Reminders | MoneyCal"
        description="Track invoice due dates and payment status. Monitor overdue invoices, set reminders, and manage your receivables with our comprehensive tracking tool."
        keywords="invoice tracker, due date tracker, payment tracking, overdue invoices, receivables management, payment reminders"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Invoice Due Date Tracker
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Track invoice due dates and payment status. Monitor overdue invoices, 
                set reminders, and manage your receivables effectively.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-green-100">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Due Date Tracking
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Payment Status
                </div>
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Overdue Alerts
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Real-time Updates
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
                    <p className="text-sm text-gray-600">Total Invoiced</p>
                    <p className="text-2xl font-bold text-gray-900">₹{summary.total.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
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
                    <p className="text-sm text-gray-600">Paid Amount</p>
                    <p className="text-2xl font-bold text-green-600">₹{summary.paid.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
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
                    <p className="text-sm text-gray-600">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">₹{summary.overdue.toLocaleString()}</p>
                    <p className="text-sm text-red-600">{summary.overdueCount} invoices</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
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
                    <p className="text-sm text-gray-600">Due This Week</p>
                    <p className="text-2xl font-bold text-yellow-600">{summary.dueThisWeek}</p>
                    <p className="text-sm text-yellow-600">invoices</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="partial">Partial</option>
                  </select>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Invoice
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Invoice List */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInvoices.map((invoice) => {
                      const daysUntilDue = getDaysUntilDue(invoice.dueDate);
                      return (
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
                            {invoice.paidAmount > 0 && (
                              <div className="text-sm text-green-600">Paid: ₹{invoice.paidAmount.toLocaleString()}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{new Date(invoice.dueDate).toLocaleDateString()}</div>
                            <div className={`text-sm ${daysUntilDue < 0 ? 'text-red-600' : daysUntilDue <= 7 ? 'text-yellow-600' : 'text-gray-500'}`}>
                              {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` : 
                               daysUntilDue === 0 ? 'Due today' : 
                               daysUntilDue === 1 ? 'Due tomorrow' : 
                               `${daysUntilDue} days left`}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                              {getStatusIcon(invoice.status)}
                              <span className="ml-1">{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(invoice.priority)}`}>
                              {invoice.priority.charAt(0).toUpperCase() + invoice.priority.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingInvoice(invoice)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteInvoice(invoice.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Add/Edit Invoice Modal */}
        {(showAddForm || editingInvoice) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingInvoice ? 'Edit Invoice' : 'Add New Invoice'}
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                    <input
                      type="text"
                      value={editingInvoice?.invoiceNumber || newInvoice.invoiceNumber}
                      onChange={(e) => editingInvoice ? 
                        updateInvoice(editingInvoice.id, 'invoiceNumber', e.target.value) :
                        setNewInvoice({...newInvoice, invoiceNumber: e.target.value})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <input
                      type="text"
                      value={editingInvoice?.clientName || newInvoice.clientName}
                      onChange={(e) => editingInvoice ? 
                        updateInvoice(editingInvoice.id, 'clientName', e.target.value) :
                        setNewInvoice({...newInvoice, clientName: e.target.value})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      value={editingInvoice?.amount || newInvoice.amount}
                      onChange={(e) => editingInvoice ? 
                        updateInvoice(editingInvoice.id, 'amount', parseFloat(e.target.value) || 0) :
                        setNewInvoice({...newInvoice, amount: parseFloat(e.target.value) || 0})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                    <input
                      type="date"
                      value={editingInvoice?.issueDate || newInvoice.issueDate}
                      onChange={(e) => editingInvoice ? 
                        updateInvoice(editingInvoice.id, 'issueDate', e.target.value) :
                        setNewInvoice({...newInvoice, issueDate: e.target.value})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={editingInvoice?.dueDate || newInvoice.dueDate}
                      onChange={(e) => editingInvoice ? 
                        updateInvoice(editingInvoice.id, 'dueDate', e.target.value) :
                        setNewInvoice({...newInvoice, dueDate: e.target.value})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editingInvoice?.status || newInvoice.status}
                      onChange={(e) => editingInvoice ? 
                        updateInvoice(editingInvoice.id, 'status', e.target.value) :
                        setNewInvoice({...newInvoice, status: e.target.value as any})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                      <option value="partial">Partial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Paid Amount</label>
                    <input
                      type="number"
                      value={editingInvoice?.paidAmount || newInvoice.paidAmount}
                      onChange={(e) => editingInvoice ? 
                        updateInvoice(editingInvoice.id, 'paidAmount', parseFloat(e.target.value) || 0) :
                        setNewInvoice({...newInvoice, paidAmount: parseFloat(e.target.value) || 0})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={editingInvoice?.priority || newInvoice.priority}
                      onChange={(e) => editingInvoice ? 
                        updateInvoice(editingInvoice.id, 'priority', e.target.value) :
                        setNewInvoice({...newInvoice, priority: e.target.value as any})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={editingInvoice?.notes || newInvoice.notes}
                    onChange={(e) => editingInvoice ? 
                      updateInvoice(editingInvoice.id, 'notes', e.target.value) :
                      setNewInvoice({...newInvoice, notes: e.target.value})
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingInvoice(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingInvoice) {
                      setEditingInvoice(null);
                    } else {
                      addInvoice();
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {editingInvoice ? 'Update' : 'Add'} Invoice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Effective Invoice Due Date Management
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-green-600" />
                    Due Date Tracking
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Monitor invoice due dates and get alerts for upcoming payments.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Visual Indicators:</strong> Color-coded due dates</p>
                    <p><strong>Overdue Alerts:</strong> Automatic overdue detection</p>
                    <p><strong>Priority Management:</strong> Focus on high-priority invoices</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    Payment Status
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Track payment status and manage partial payments effectively.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Status Tracking:</strong> Pending, paid, overdue, partial</p>
                    <p><strong>Payment History:</strong> Track paid amounts</p>
                    <p><strong>Real-time Updates:</strong> Instant status changes</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                    Analytics & Reports
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Get insights into your receivables and payment patterns.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Summary Dashboard:</strong> Key metrics overview</p>
                    <p><strong>Overdue Analysis:</strong> Identify problematic invoices</p>
                    <p><strong>Cash Flow Tracking:</strong> Monitor receivables</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-orange-600" />
                    Client Management
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Manage client information and track payment behavior.
                  </p>
                  <div className="space-y-2 text-sm text-orange-700">
                    <p><strong>Client Profiles:</strong> Store client information</p>
                    <p><strong>Payment History:</strong> Track client payment patterns</p>
                    <p><strong>Notes & Comments:</strong> Add important details</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Best Practices for Invoice Tracking
                </h3>
                <div className="space-y-4 text-green-700">
                  <p>
                    <strong>Regular Monitoring:</strong> Check your invoice tracker daily to identify 
                    overdue payments and take immediate action on late payments.
                  </p>
                  <p>
                    <strong>Set Reminders:</strong> Use the due date tracking to set up payment 
                    reminders before invoices become overdue.
                  </p>
                  <p>
                    <strong>Prioritize Collections:</strong> Focus on high-priority and overdue 
                    invoices first to maintain healthy cash flow.
                  </p>
                  <p>
                    <strong>Update Status Promptly:</strong> Mark invoices as paid or partially 
                    paid as soon as payments are received to maintain accurate records.
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

export default InvoiceDueDateTracker;
