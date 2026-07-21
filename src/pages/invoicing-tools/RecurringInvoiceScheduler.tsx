import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  Repeat, 
  Play, 
  Pause, 
  Edit, 
  Trash2,
  Plus,
  Settings,
  FileText,
  DollarSign,
  Users,
  Activity,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface RecurringInvoice {
  id: string;
  name: string;
  clientName: string;
  amount: number;
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate?: string;
  nextInvoiceDate: string;
  status: 'active' | 'paused' | 'completed';
  invoiceCount: number;
  totalGenerated: number;
  description: string;
  autoSend: boolean;
  template: string;
}

const RecurringInvoiceScheduler: React.FC = () => {
  const [schedules, setSchedules] = useState<RecurringInvoice[]>([
    {
      id: '1',
      name: 'Monthly Website Maintenance',
      clientName: 'ABC Company',
      amount: 15000,
      frequency: 'monthly',
      startDate: '2024-01-01',
      nextInvoiceDate: '2024-02-01',
      status: 'active',
      invoiceCount: 1,
      totalGenerated: 15000,
      description: 'Monthly website maintenance and hosting services',
      autoSend: true,
      template: 'professional'
    },
    {
      id: '2',
      name: 'Quarterly Consulting',
      clientName: 'XYZ Corporation',
      amount: 50000,
      frequency: 'quarterly',
      startDate: '2024-01-01',
      nextInvoiceDate: '2024-04-01',
      status: 'active',
      invoiceCount: 1,
      totalGenerated: 50000,
      description: 'Quarterly business consulting services',
      autoSend: false,
      template: 'consulting'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<RecurringInvoice | null>(null);

  const [newSchedule, setNewSchedule] = useState<Omit<RecurringInvoice, 'id' | 'invoiceCount' | 'totalGenerated'>>({
    name: '',
    clientName: '',
    amount: 0,
    frequency: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    nextInvoiceDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
    description: '',
    autoSend: true,
    template: 'professional'
  });

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      case 'yearly': return 'Yearly';
      default: return frequency;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const calculateNextInvoiceDate = (frequency: string, lastDate: string) => {
    const date = new Date(lastDate);
    switch (frequency) {
      case 'weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'quarterly':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    return date.toISOString().split('T')[0];
  };

  const addSchedule = () => {
    const schedule: RecurringInvoice = {
      ...newSchedule,
      id: Date.now().toString(),
      invoiceCount: 0,
      totalGenerated: 0
    };
    setSchedules([...schedules, schedule]);
    setNewSchedule({
      name: '',
      clientName: '',
      amount: 0,
      frequency: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
      nextInvoiceDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      description: '',
      autoSend: true,
      template: 'professional'
    });
    setShowAddForm(false);
  };

  const updateSchedule = (id: string, field: keyof RecurringInvoice, value: any) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id ? { ...schedule, [field]: value } : schedule
    ));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const toggleStatus = (id: string) => {
    setSchedules(schedules.map(schedule => {
      if (schedule.id === id) {
        const newStatus = schedule.status === 'active' ? 'paused' : 'active';
        return { ...schedule, status: newStatus };
      }
      return schedule;
    }));
  };

  const generateInvoice = (id: string) => {
    setSchedules(schedules.map(schedule => {
      if (schedule.id === id) {
        const nextDate = calculateNextInvoiceDate(schedule.frequency, schedule.nextInvoiceDate);
        return {
          ...schedule,
          invoiceCount: schedule.invoiceCount + 1,
          totalGenerated: schedule.totalGenerated + schedule.amount,
          nextInvoiceDate: nextDate
        };
      }
      return schedule;
    }));
  };

  const summary = {
    total: schedules.reduce((sum, s) => sum + s.amount, 0),
    active: schedules.filter(s => s.status === 'active').length,
    paused: schedules.filter(s => s.status === 'paused').length,
    totalGenerated: schedules.reduce((sum, s) => sum + s.totalGenerated, 0),
    nextInvoice: schedules.filter(s => s.status === 'active').length
  };

  return (
    <>
      <SEOHelmet
        title="Recurring Invoice Scheduler - Automated Billing Tool | MoneyCal"
        description="Automate recurring invoice generation and scheduling. Set up automatic billing cycles, manage recurring payments, and streamline your invoicing process."
        keywords="recurring invoice, auto billing, invoice scheduler, automated invoicing, subscription billing, recurring payments"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Recurring Invoice Scheduler
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Automate recurring invoice generation and scheduling. Set up automatic billing cycles, 
                manage recurring payments, and streamline your invoicing process.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-purple-100">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Auto Scheduling
                </div>
                <div className="flex items-center">
                  <Repeat className="w-4 h-4 mr-2" />
                  Recurring Billing
                </div>
                <div className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Template Management
                </div>
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Automation
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
                    <p className="text-sm text-gray-600">Total Schedules</p>
                    <p className="text-2xl font-bold text-gray-900">{schedules.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
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
                    <p className="text-sm text-gray-600">Active Schedules</p>
                    <p className="text-2xl font-bold text-green-600">{summary.active}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Play className="w-6 h-6 text-green-600" />
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
                    <p className="text-sm text-gray-600">Total Generated</p>
                    <p className="text-2xl font-bold text-blue-600">₹{summary.totalGenerated.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
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
                    <p className="text-sm text-gray-600">Next Invoices</p>
                    <p className="text-2xl font-bold text-orange-600">{summary.nextInvoice}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
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
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Repeat className="h-6 w-6 mr-3 text-purple-600" />
                  Recurring Schedules
                </h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Schedule
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Schedules List */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Frequency
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Invoice
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {schedules.map((schedule) => (
                      <tr key={schedule.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{schedule.name}</div>
                            <div className="text-sm text-gray-500">{schedule.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{schedule.clientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{schedule.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{schedule.invoiceCount} invoices</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {getFrequencyLabel(schedule.frequency)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(schedule.nextInvoiceDate).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(schedule.nextInvoiceDate) > new Date() ? 'Upcoming' : 'Due'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                            {getStatusIcon(schedule.status)}
                            <span className="ml-1">{schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => generateInvoice(schedule.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Generate Invoice"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleStatus(schedule.id)}
                              className="text-blue-600 hover:text-blue-900"
                              title={schedule.status === 'active' ? 'Pause' : 'Activate'}
                            >
                              {schedule.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => setEditingSchedule(schedule)}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteSchedule(schedule.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Add/Edit Schedule Modal */}
        {(showAddForm || editingSchedule) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Name</label>
                    <input
                      type="text"
                      value={editingSchedule?.name || newSchedule.name}
                      onChange={(e) => editingSchedule ? 
                        updateSchedule(editingSchedule.id, 'name', e.target.value) :
                        setNewSchedule({...newSchedule, name: e.target.value})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <input
                      type="text"
                      value={editingSchedule?.clientName || newSchedule.clientName}
                      onChange={(e) => editingSchedule ? 
                        updateSchedule(editingSchedule.id, 'clientName', e.target.value) :
                        setNewSchedule({...newSchedule, clientName: e.target.value})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      value={editingSchedule?.amount || newSchedule.amount}
                      onChange={(e) => editingSchedule ? 
                        updateSchedule(editingSchedule.id, 'amount', parseFloat(e.target.value) || 0) :
                        setNewSchedule({...newSchedule, amount: parseFloat(e.target.value) || 0})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                    <select
                      value={editingSchedule?.frequency || newSchedule.frequency}
                      onChange={(e) => editingSchedule ? 
                        updateSchedule(editingSchedule.id, 'frequency', e.target.value) :
                        setNewSchedule({...newSchedule, frequency: e.target.value as any})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={editingSchedule?.startDate || newSchedule.startDate}
                      onChange={(e) => editingSchedule ? 
                        updateSchedule(editingSchedule.id, 'startDate', e.target.value) :
                        setNewSchedule({...newSchedule, startDate: e.target.value})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                    <select
                      value={editingSchedule?.template || newSchedule.template}
                      onChange={(e) => editingSchedule ? 
                        updateSchedule(editingSchedule.id, 'template', e.target.value) :
                        setNewSchedule({...newSchedule, template: e.target.value})
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="professional">Professional</option>
                      <option value="consulting">Consulting</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingSchedule?.autoSend || newSchedule.autoSend}
                      onChange={(e) => editingSchedule ? 
                        updateSchedule(editingSchedule.id, 'autoSend', e.target.checked) :
                        setNewSchedule({...newSchedule, autoSend: e.target.checked})
                      }
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Auto-send invoices
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editingSchedule?.description || newSchedule.description}
                    onChange={(e) => editingSchedule ? 
                      updateSchedule(editingSchedule.id, 'description', e.target.value) :
                      setNewSchedule({...newSchedule, description: e.target.value})
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingSchedule(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingSchedule) {
                      setEditingSchedule(null);
                    } else {
                      addSchedule();
                    }
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  {editingSchedule ? 'Update' : 'Add'} Schedule
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
                Automate Your Recurring Billing Process
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Automated Scheduling
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Set up recurring invoice schedules and let the system handle the rest.
                  </p>
                  <div className="space-y-2 text-sm text-purple-700">
                    <p><strong>Multiple Frequencies:</strong> Weekly, monthly, quarterly, yearly</p>
                    <p><strong>Auto Generation:</strong> Automatic invoice creation</p>
                    <p><strong>Flexible Scheduling:</strong> Custom start and end dates</p>
                  </div>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-pink-600" />
                    Template Management
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Use professional invoice templates for different business types.
                  </p>
                  <div className="space-y-2 text-sm text-pink-700">
                    <p><strong>Professional Templates:</strong> Ready-to-use designs</p>
                    <p><strong>Custom Branding:</strong> Add your company details</p>
                    <p><strong>Auto-send Option:</strong> Automatic email delivery</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    Status Management
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Control your recurring schedules with pause, resume, and stop options.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Active/Paused:</strong> Control schedule status</p>
                    <p><strong>Manual Generation:</strong> Generate invoices on demand</p>
                    <p><strong>Progress Tracking:</strong> Monitor invoice count and totals</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-600" />
                    Client Management
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Manage recurring billing for multiple clients efficiently.
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Client Profiles:</strong> Store client information</p>
                    <p><strong>Multiple Schedules:</strong> Different schedules per client</p>
                    <p><strong>Billing History:</strong> Track all generated invoices</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Benefits of Recurring Invoice Scheduling
                </h3>
                <div className="space-y-4 text-purple-700">
                  <p>
                    <strong>Time Savings:</strong> Automate repetitive billing tasks and focus on 
                    growing your business instead of manual invoice generation.
                  </p>
                  <p>
                    <strong>Consistent Cash Flow:</strong> Regular, predictable invoicing helps 
                    maintain steady cash flow and reduces payment delays.
                  </p>
                  <p>
                    <strong>Professional Image:</strong> Automated, timely invoices create a 
                    professional impression and improve client relationships.
                  </p>
                  <p>
                    <strong>Reduced Errors:</strong> Automated systems eliminate manual errors 
                    and ensure accurate, consistent invoicing.
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

export default RecurringInvoiceScheduler;
