import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, PieChart, Plus, Edit3, Trash2, Calendar, DollarSign, Shield, AlertCircle, TrendingUp, Users, Download, Link } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const PortfolioDashboard: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [policies, setPolicies] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [formData, setFormData] = useState({
    policyType: 'life',
    policyName: '',
    provider: '',
    policyNumber: '',
    sumAssured: 0,
    premiumAmount: 0,
    premiumFrequency: 'annual',
    startDate: '',
    maturityDate: '',
    beneficiary: '',
    status: 'active'
  });

  const policyTypes = [
    { name: 'Life Insurance', color: 'bg-blue-500', icon: '🛡️' },
    { name: 'Health Insurance', color: 'bg-green-500', icon: '🏥' },
    { name: 'Motor Insurance', color: 'bg-purple-500', icon: '🚗' },
    { name: 'Home Insurance', color: 'bg-orange-500', icon: '🏠' },
    { name: 'Travel Insurance', color: 'bg-cyan-500', icon: '✈️' },
    { name: 'Critical Illness', color: 'bg-red-500', icon: '❤️' },
    { name: 'Term Insurance', color: 'bg-indigo-500', icon: '📋' },
    { name: 'ULIP', color: 'bg-pink-500', icon: '📈' }
  ];

  const providers = [
    'LIC', 'HDFC Life', 'ICICI Prudential', 'SBI Life', 'Bajaj Allianz', 'Max Life', 
    'Kotak Life', 'Tata AIA', 'Aditya Birla Sun Life', 'Reliance Nippon'
  ];

  const addPolicy = () => {
    if (!formData.policyName || !formData.provider || !formData.policyNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const newPolicy = {
      id: Date.now(),
      ...formData,
      sumAssured: parseInt(formData.sumAssured),
      premiumAmount: parseInt(formData.premiumAmount)
    };

    if (editingPolicy) {
      setPolicies(policies.map(p => p.id === editingPolicy.id ? newPolicy : p));
      setEditingPolicy(null);
    } else {
      setPolicies([...policies, newPolicy]);
    }

    setFormData({
      policyType: 'life',
      policyName: '',
      provider: '',
      policyNumber: '',
      sumAssured: 0,
      premiumAmount: 0,
      premiumFrequency: 'annual',
      startDate: '',
      maturityDate: '',
      beneficiary: '',
      status: 'active'
    });
    setShowAddForm(false);
  };

  const deletePolicy = (id) => {
    setPolicies(policies.filter(p => p.id !== id));
  };

  const editPolicy = (policy) => {
    setFormData(policy);
    setEditingPolicy(policy);
    setShowAddForm(true);
  };

  const getDaysUntilRenewal = (maturityDate) => {
    if (!maturityDate) return null;
    const today = new Date();
    const renewal = new Date(maturityDate);
    const diffTime = renewal - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const downloadPDF = async () => {
    if (!resultsRef.current) return;

    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('insurance-portfolio-dashboard.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const getPolicyTypeData = (type) => {
    return policyTypes.find(t => t.name.toLowerCase().includes(type.toLowerCase())) || policyTypes[0];
  };

  // Calculate portfolio statistics
  const totalSumAssured = policies.reduce((sum, policy) => sum + policy.sumAssured, 0);
  const totalAnnualPremium = policies.reduce((sum, policy) => {
    const frequency = policy.premiumFrequency;
    const multiplier = frequency === 'monthly' ? 12 : frequency === 'quarterly' ? 4 : 1;
    return sum + (policy.premiumAmount * multiplier);
  }, 0);

  const policiesByType = policyTypes.map(type => ({
    ...type,
    count: policies.filter(p => p.policyType.toLowerCase().includes(type.name.toLowerCase())).length,
    sumAssured: policies
      .filter(p => p.policyType.toLowerCase().includes(type.name.toLowerCase()))
      .reduce((sum, p) => sum + p.sumAssured, 0)
  }));

  const expiringSoon = policies.filter(p => {
    const days = getDaysUntilRenewal(p.maturityDate);
    return days !== null && days <= 30 && days > 0;
  });

  return (
    <>
      <SEOHelmet
        title="Insurance Portfolio Dashboard - Manage Insurance Policies India | MoneyCal.in"
        description="Free insurance portfolio dashboard for India. Visualize and manage all your insurance policies in one place. Track premiums, coverage, and renewal dates."
        keywords="insurance portfolio tracker India, manage insurance policies online, insurance dashboard tool, insurance policy management"
        url="/insurance-tools/portfolio-dashboard"
        type="website"
        image="/images/portfolio-dashboard.jpg"
        tags={["insurance portfolio", "policy management", "insurance dashboard", "policy tracker"]}
      />
      
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <PieChart className="h-16 w-16 text-teal-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Insurance Portfolio Dashboard
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Visualize and manage all your insurance policies in one place. Track premiums, coverage, and renewal dates.
            </p>
          </div>

          {/* Add Policy Button */}
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center mx-auto transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Policy
            </button>
          </div>

          {/* Add/Edit Policy Form */}
          {showAddForm && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 text-teal-600 mr-2" />
                {editingPolicy ? 'Edit Policy' : 'Add New Policy'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Policy Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Type
                  </label>
                  <select
                    value={formData.policyType}
                    onChange={(e) => setFormData({...formData, policyType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {policyTypes.map((type, index) => (
                      <option key={index} value={type.name.toLowerCase()}>
                        {type.icon} {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Policy Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Name *
                  </label>
                  <input
                    type="text"
                    value={formData.policyName}
                    onChange={(e) => setFormData({...formData, policyName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., Term Life Insurance"
                  />
                </div>

                {/* Provider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Provider *
                  </label>
                  <select
                    value={formData.provider}
                    onChange={(e) => setFormData({...formData, provider: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select Provider</option>
                    {providers.map((provider, index) => (
                      <option key={index} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>

                {/* Policy Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Number *
                  </label>
                  <input
                    type="text"
                    value={formData.policyNumber}
                    onChange={(e) => setFormData({...formData, policyNumber: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Policy number"
                  />
                </div>

                {/* Sum Assured */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sum Assured (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.sumAssured}
                    onChange={(e) => setFormData({...formData, sumAssured: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Premium Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Premium Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.premiumAmount}
                    onChange={(e) => setFormData({...formData, premiumAmount: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Premium Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Premium Frequency
                  </label>
                  <select
                    value={formData.premiumFrequency}
                    onChange={(e) => setFormData({...formData, premiumFrequency: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Maturity Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maturity/Renewal Date
                  </label>
                  <input
                    type="date"
                    value={formData.maturityDate}
                    onChange={(e) => setFormData({...formData, maturityDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Beneficiary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beneficiary
                  </label>
                  <input
                    type="text"
                    value={formData.beneficiary}
                    onChange={(e) => setFormData({...formData, beneficiary: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Beneficiary name"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="lapsed">Lapsed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingPolicy(null);
                    setFormData({
                      policyType: 'life',
                      policyName: '',
                      provider: '',
                      policyNumber: '',
                      sumAssured: 0,
                      premiumAmount: 0,
                      premiumFrequency: 'annual',
                      startDate: '',
                      maturityDate: '',
                      beneficiary: '',
                      status: 'active'
                    });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addPolicy}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  {editingPolicy ? 'Update Policy' : 'Add Policy'}
                </button>
              </div>
            </div>
          )}

          {/* Portfolio Summary */}
          {policies.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <PieChart className="h-6 w-6 text-teal-600 mr-2" />
                  Portfolio Summary
                </h2>
                <button
                  onClick={downloadPDF}
                  className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </div>
              <div ref={resultsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-teal-100 rounded-lg">
                    <Shield className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{policies.length}</div>
                    <div className="text-sm text-gray-600">Total Policies</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalSumAssured)}</div>
                    <div className="text-sm text-gray-600">Total Coverage</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalAnnualPremium)}</div>
                    <div className="text-sm text-gray-600">Annual Premium</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{expiringSoon.length}</div>
                    <div className="text-sm text-gray-600">Expiring Soon</div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          )}

          {/* Policies by Type Chart */}
          {policies.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <PieChart className="h-5 w-5 text-teal-600 mr-2" />
                Policies by Type
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {policiesByType.filter(type => type.count > 0).map((type, index) => (
                  <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-semibold text-gray-900">{type.count}</div>
                    <div className="text-sm text-gray-600">{type.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatCurrency(type.sumAssured)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Policies List */}
          {policies.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
              <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Policies Added</h3>
              <p className="text-gray-600 mb-6">
                Add your insurance policies to start tracking your portfolio and managing your coverage.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add Your First Policy
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {policies.map((policy) => {
                const typeData = getPolicyTypeData(policy.policyType);
                const daysUntilRenewal = getDaysUntilRenewal(policy.maturityDate);
                const isExpiringSoon = daysUntilRenewal !== null && daysUntilRenewal <= 30 && daysUntilRenewal > 0;
                const isExpired = daysUntilRenewal !== null && daysUntilRenewal < 0;

                return (
                  <div key={policy.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${typeData.color} text-white mr-3`}>
                          <span className="text-lg">{typeData.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {policy.policyName}
                          </h3>
                          <p className="text-sm text-gray-600">{policy.provider}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editPolicy(policy)}
                          className="p-2 text-gray-400 hover:text-teal-600 transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deletePolicy(policy.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Policy No:</span>
                        <span className="text-sm font-medium">{policy.policyNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sum Assured:</span>
                        <span className="text-sm font-medium text-teal-600">
                          {formatCurrency(policy.sumAssured)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Premium:</span>
                        <span className="text-sm font-medium">
                          {formatCurrency(policy.premiumAmount)} {policy.premiumFrequency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`text-sm font-medium capitalize ${
                          policy.status === 'active' ? 'text-green-600' : 
                          policy.status === 'inactive' ? 'text-gray-600' : 
                          'text-red-600'
                        }`}>
                          {policy.status}
                        </span>
                      </div>
                      {policy.maturityDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Renewal:</span>
                          <span className="text-sm font-medium">{formatDate(policy.maturityDate)}</span>
                        </div>
                      )}
                      {daysUntilRenewal !== null && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Days Until Renewal:</span>
                          <span className={`text-sm font-medium ${
                            isExpired ? 'text-red-600' : 
                            isExpiringSoon ? 'text-orange-600' : 
                            'text-green-600'
                          }`}>
                            {isExpired ? 'Expired' : `${daysUntilRenewal} days`}
                          </span>
                        </div>
                      )}
                    </div>

                    {policy.beneficiary && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Beneficiary:</span>
                          <span className="text-sm font-medium">{policy.beneficiary}</span>
                        </div>
                      </div>
                    )}

                    {isExpiringSoon && (
                      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
                          <span className="text-sm text-orange-800">
                            {isExpired ? 'Policy expired!' : 'Policy expiring soon!'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Managing Your Insurance Portfolio</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                An insurance portfolio dashboard helps you manage all your insurance policies in one place, 
                track premiums, monitor coverage, and ensure you have adequate protection for all aspects of your life.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Benefits of Portfolio Management:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Centralized View:</strong> See all your policies in one dashboard</li>
                <li><strong>Coverage Analysis:</strong> Identify gaps and overlaps in your coverage</li>
                <li><strong>Renewal Tracking:</strong> Never miss a policy renewal date</li>
                <li><strong>Cost Optimization:</strong> Analyze and optimize your insurance costs</li>
                <li><strong>Risk Assessment:</strong> Ensure adequate coverage for all risks</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Metrics to Track:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Total Coverage:</strong> Sum of all your insurance coverage amounts</li>
                <li><strong>Annual Premiums:</strong> Total amount you pay annually for all policies</li>
                <li><strong>Coverage Ratio:</strong> Coverage amount relative to your income and assets</li>
                <li><strong>Policy Distribution:</strong> Spread of coverage across different insurance types</li>
                <li><strong>Renewal Schedule:</strong> Timeline of upcoming policy renewals</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Portfolio Optimization Tips:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Review your portfolio annually to ensure adequate coverage</li>
                <li>Consolidate policies where possible to reduce administrative burden</li>
                <li>Compare premiums across providers to find better deals</li>
                <li>Consider bundling policies with the same provider for discounts</li>
                <li>Update beneficiary information regularly</li>
                <li>Keep all policy documents organized and accessible</li>
                <li>Monitor claim settlement ratios of your insurance providers</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Insurance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/insurance-tools/life-insurance-calculator" className="text-blue-600 hover:text-blue-800 underline">Life Insurance Calculator</RouterLink>
                  <RouterLink to="/insurance-tools/health-insurance-estimator" className="text-blue-600 hover:text-blue-800 underline">Health Insurance Estimator</RouterLink>
                  <RouterLink to="/insurance-tools/term-insurance-planner" className="text-blue-600 hover:text-blue-800 underline">Term Insurance Planner</RouterLink>
                  <RouterLink to="/insurance-tools/ulip-calculator" className="text-blue-600 hover:text-blue-800 underline">ULIP Calculator</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioDashboard;
