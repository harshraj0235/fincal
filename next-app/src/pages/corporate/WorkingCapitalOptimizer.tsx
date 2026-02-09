import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, PieChart, DollarSign, Download, Link, Building, BarChart3, Target, TrendingUp, Clock } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { getPdfLibs } from '../../lib/pdfExportClient';

export const WorkingCapitalOptimizer: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    // Company Information
    companyName: '',
    industry: 'manufacturing',
    
    // Revenue and Sales
    annualRevenue: 100000000,
    costOfGoodsSold: 60000000,
    grossProfit: 40000000,
    
    // Current Assets
    accountsReceivable: 15000000,
    inventory: 20000000,
    cashAndEquivalents: 5000000,
    otherCurrentAssets: 2000000,
    
    // Current Liabilities
    accountsPayable: 12000000,
    accruedExpenses: 3000000,
    shortTermDebt: 8000000,
    otherCurrentLiabilities: 1000000,
    
    // Working Capital Metrics
    arDays: 45,
    inventoryDays: 120,
    apDays: 60,
    
    // Optimization Targets
    targetArDays: 30,
    targetInventoryDays: 90,
    targetApDays: 45,
    
    // Cost of Capital
    costOfCapital: 12,
    interestRate: 8
  });

  const [results, setResults] = useState({
    currentWorkingCapital: 0,
    optimizedWorkingCapital: 0,
    workingCapitalReduction: 0,
    cashFlowImprovement: 0,
    interestSavings: 0,
    currentMetrics: {
      arDays: 0,
      inventoryDays: 0,
      apDays: 0,
      cashConversionCycle: 0
    },
    optimizedMetrics: {
      arDays: 0,
      inventoryDays: 0,
      apDays: 0,
      cashConversionCycle: 0
    },
    recommendations: [],
    impactAnalysis: {
      revenueImpact: 0,
      costImpact: 0,
      netBenefit: 0
    }
  });

  const industries = [
    { name: 'Manufacturing', arDays: 45, inventoryDays: 120, apDays: 60 },
    { name: 'Retail', arDays: 15, inventoryDays: 60, apDays: 30 },
    { name: 'Technology', arDays: 30, inventoryDays: 30, apDays: 45 },
    { name: 'Healthcare', arDays: 60, inventoryDays: 45, apDays: 30 },
    { name: 'Construction', arDays: 90, inventoryDays: 30, apDays: 45 },
    { name: 'Services', arDays: 30, inventoryDays: 0, apDays: 30 },
    { name: 'Automotive', arDays: 60, inventoryDays: 90, apDays: 45 },
    { name: 'Pharmaceuticals', arDays: 75, inventoryDays: 180, apDays: 60 }
  ];

  const calculateWorkingCapital = () => {
    const {
      accountsReceivable, inventory, cashAndEquivalents, otherCurrentAssets,
      accountsPayable, accruedExpenses, shortTermDebt, otherCurrentLiabilities,
      annualRevenue, costOfGoodsSold, arDays, inventoryDays, apDays,
      targetArDays, targetInventoryDays, targetApDays, costOfCapital, interestRate
    } = inputs;

    // Current Working Capital
    const currentAssets = accountsReceivable + inventory + cashAndEquivalents + otherCurrentAssets;
    const currentLiabilities = accountsPayable + accruedExpenses + shortTermDebt + otherCurrentLiabilities;
    const currentWorkingCapital = currentAssets - currentLiabilities;

    // Current Metrics
    const currentArDays = (accountsReceivable / annualRevenue) * 365;
    const currentInventoryDays = (inventory / costOfGoodsSold) * 365;
    const currentApDays = (accountsPayable / costOfGoodsSold) * 365;
    const currentCashConversionCycle = currentArDays + currentInventoryDays - currentApDays;

    // Optimized Working Capital Calculation
    const optimizedAr = (annualRevenue * targetArDays) / 365;
    const optimizedInventory = (costOfGoodsSold * targetInventoryDays) / 365;
    const optimizedAp = (costOfGoodsSold * targetApDays) / 365;
    
    const optimizedCurrentAssets = optimizedAr + optimizedInventory + cashAndEquivalents + otherCurrentAssets;
    const optimizedCurrentLiabilities = optimizedAp + accruedExpenses + shortTermDebt + otherCurrentLiabilities;
    const optimizedWorkingCapital = optimizedCurrentAssets - optimizedCurrentLiabilities;

    // Working Capital Reduction
    const workingCapitalReduction = currentWorkingCapital - optimizedWorkingCapital;
    
    // Cash Flow Improvement
    const cashFlowImprovement = workingCapitalReduction;
    
    // Interest Savings
    const interestSavings = (workingCapitalReduction * interestRate) / 100;

    // Optimized Metrics
    const optimizedArDays = targetArDays;
    const optimizedInventoryDays = targetInventoryDays;
    const optimizedApDays = targetApDays;
    const optimizedCashConversionCycle = optimizedArDays + optimizedInventoryDays - optimizedApDays;

    // Generate Recommendations
    const recommendations = [];
    
    if (currentArDays > targetArDays) {
      recommendations.push({
        type: 'Accounts Receivable',
        current: currentArDays,
        target: targetArDays,
        improvement: currentArDays - targetArDays,
        impact: (accountsReceivable - optimizedAr),
        suggestion: 'Implement stricter credit policies, offer early payment discounts, and improve collection processes'
      });
    }
    
    if (currentInventoryDays > targetInventoryDays) {
      recommendations.push({
        type: 'Inventory Management',
        current: currentInventoryDays,
        target: targetInventoryDays,
        improvement: currentInventoryDays - targetInventoryDays,
        impact: (inventory - optimizedInventory),
        suggestion: 'Implement just-in-time inventory, improve demand forecasting, and optimize supplier relationships'
      });
    }
    
    if (currentApDays < targetApDays) {
      recommendations.push({
        type: 'Accounts Payable',
        current: currentApDays,
        target: targetApDays,
        improvement: targetApDays - currentApDays,
        impact: (optimizedAp - accountsPayable),
        suggestion: 'Negotiate extended payment terms with suppliers while maintaining good relationships'
      });
    }

    // Impact Analysis
    const revenueImpact = 0; // Assuming no direct revenue impact
    const costImpact = -interestSavings; // Cost savings
    const netBenefit = costImpact; // Net benefit from optimization

    setResults({
      currentWorkingCapital,
      optimizedWorkingCapital,
      workingCapitalReduction,
      cashFlowImprovement,
      interestSavings,
      currentMetrics: {
        arDays: currentArDays,
        inventoryDays: currentInventoryDays,
        apDays: currentApDays,
        cashConversionCycle: currentCashConversionCycle
      },
      optimizedMetrics: {
        arDays: optimizedArDays,
        inventoryDays: optimizedInventoryDays,
        apDays: optimizedApDays,
        cashConversionCycle: optimizedCashConversionCycle
      },
      recommendations,
      impactAnalysis: {
        revenueImpact,
        costImpact,
        netBenefit
      }
    });
  };

  useEffect(() => {
    calculateWorkingCapital();
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1) + ' L';
    } else {
      return num.toLocaleString();
    }
  };

  const downloadPDF = async () => {
    if (!resultsRef.current) return;
    const { html2canvas, jsPDF } = await getPdfLibs();
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
      
      pdf.save('working-capital-optimization-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <SEOHelmet
        title="Working Capital Optimization Tool - Free Cash Flow Management Calculator | MoneyCal.in"
        description="Optimize your working capital with our free cash flow management tool. Calculate cash conversion cycle, improve AR/AP management, and reduce working capital requirements."
        keywords="working capital calculator, cash conversion cycle tool, free corporate finance tool, working capital optimization, cash flow management"
        url="/corporate-finance/working-capital-optimizer"
        type="website"
        image="/images/working-capital-optimizer.jpg"
        tags={["working capital", "cash flow", "corporate finance", "cash conversion cycle"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
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
              <PieChart className="h-16 w-16 text-orange-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Working Capital Optimizer
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Optimize your working capital and improve cash flow management. 
              Calculate cash conversion cycle, analyze AR/AP efficiency, and identify opportunities for working capital reduction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-orange-600 mr-2" />
                Company Information
              </h2>
              
              <div className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={inputs.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    value={inputs.industry}
                    onChange={(e) => {
                      const selectedIndustry = industries.find(i => i.name.toLowerCase() === e.target.value);
                      handleInputChange('industry', e.target.value);
                      if (selectedIndustry) {
                        handleInputChange('arDays', selectedIndustry.arDays);
                        handleInputChange('inventoryDays', selectedIndustry.inventoryDays);
                        handleInputChange('apDays', selectedIndustry.apDays);
                        handleInputChange('targetArDays', selectedIndustry.arDays * 0.8);
                        handleInputChange('targetInventoryDays', selectedIndustry.inventoryDays * 0.8);
                        handleInputChange('targetApDays', selectedIndustry.apDays * 1.2);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {industries.map((industry, index) => (
                      <option key={index} value={industry.name.toLowerCase()}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Financial Metrics */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Revenue (₹)
                      </label>
                      <input
                        type="number"
                        value={inputs.annualRevenue}
                        onChange={(e) => handleInputChange('annualRevenue', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cost of Goods Sold (₹)
                      </label>
                      <input
                        type="number"
                        value={inputs.costOfGoodsSold}
                        onChange={(e) => handleInputChange('costOfGoodsSold', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Current Assets */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Assets (₹)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accounts Receivable
                      </label>
                      <input
                        type="number"
                        value={inputs.accountsReceivable}
                        onChange={(e) => handleInputChange('accountsReceivable', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inventory
                      </label>
                      <input
                        type="number"
                        value={inputs.inventory}
                        onChange={(e) => handleInputChange('inventory', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cash & Equivalents
                      </label>
                      <input
                        type="number"
                        value={inputs.cashAndEquivalents}
                        onChange={(e) => handleInputChange('cashAndEquivalents', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Current Assets
                      </label>
                      <input
                        type="number"
                        value={inputs.otherCurrentAssets}
                        onChange={(e) => handleInputChange('otherCurrentAssets', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Current Liabilities */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Liabilities (₹)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accounts Payable
                      </label>
                      <input
                        type="number"
                        value={inputs.accountsPayable}
                        onChange={(e) => handleInputChange('accountsPayable', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accrued Expenses
                      </label>
                      <input
                        type="number"
                        value={inputs.accruedExpenses}
                        onChange={(e) => handleInputChange('accruedExpenses', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Short-term Debt
                      </label>
                      <input
                        type="number"
                        value={inputs.shortTermDebt}
                        onChange={(e) => handleInputChange('shortTermDebt', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Current Liabilities
                      </label>
                      <input
                        type="number"
                        value={inputs.otherCurrentLiabilities}
                        onChange={(e) => handleInputChange('otherCurrentLiabilities', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Optimization Targets */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Targets (Days)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target AR Days
                      </label>
                      <input
                        type="number"
                        value={inputs.targetArDays}
                        onChange={(e) => handleInputChange('targetArDays', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Inventory Days
                      </label>
                      <input
                        type="number"
                        value={inputs.targetInventoryDays}
                        onChange={(e) => handleInputChange('targetInventoryDays', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target AP Days
                      </label>
                      <input
                        type="number"
                        value={inputs.targetApDays}
                        onChange={(e) => handleInputChange('targetApDays', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Cost Parameters */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Parameters (%)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cost of Capital
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.costOfCapital}
                        onChange={(e) => handleInputChange('costOfCapital', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interest Rate
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.interestRate}
                        onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Optimization Summary */}
              <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Target className="h-6 w-6 mr-2" />
                    Optimization Summary
                  </h2>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.workingCapitalReduction)}
                    </div>
                    <div className="text-orange-100">Working Capital Reduction</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.cashFlowImprovement)}
                    </div>
                    <div className="text-orange-100">Cash Flow Improvement</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.interestSavings)}
                    </div>
                    <div className="text-orange-100">Annual Interest Savings</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.optimizedMetrics.cashConversionCycle.toFixed(0)} days
                    </div>
                    <div className="text-orange-100">Optimized CCC</div>
                  </div>
                </div>
              </div>

              {/* Current vs Optimized Metrics */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-orange-600 mr-2" />
                  Cash Conversion Cycle Analysis
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Current AR Days</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {results.currentMetrics.arDays.toFixed(0)} days
                      </div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-sm text-gray-600">Optimized AR Days</div>
                      <div className="text-lg font-semibold text-orange-600">
                        {results.optimizedMetrics.arDays.toFixed(0)} days
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Current Inventory Days</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {results.currentMetrics.inventoryDays.toFixed(0)} days
                      </div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-sm text-gray-600">Optimized Inventory Days</div>
                      <div className="text-lg font-semibold text-orange-600">
                        {results.optimizedMetrics.inventoryDays.toFixed(0)} days
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Current AP Days</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {results.currentMetrics.apDays.toFixed(0)} days
                      </div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-sm text-gray-600">Optimized AP Days</div>
                      <div className="text-lg font-semibold text-orange-600">
                        {results.optimizedMetrics.apDays.toFixed(0)} days
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Current Cash Conversion Cycle</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {results.currentMetrics.cashConversionCycle.toFixed(0)} days
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-sm text-gray-600">Optimized Cash Conversion Cycle</div>
                      <div className="text-lg font-semibold text-green-600">
                        {results.optimizedMetrics.cashConversionCycle.toFixed(0)} days
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
                  Optimization Recommendations
                </h3>
                <div className="space-y-4">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{rec.type}</h4>
                        <span className="text-sm font-semibold text-orange-600">
                          {formatCurrency(rec.impact)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Current: {rec.current.toFixed(0)} days → Target: {rec.target.toFixed(0)} days
                        <span className="ml-2 text-green-600 font-semibold">
                          (Improvement: {rec.improvement.toFixed(0)} days)
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-orange-600 mr-2" />
                  Impact Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-semibold text-gray-900">Annual Interest Savings</span>
                    <span className="font-bold text-green-600 text-lg">
                      {formatCurrency(results.interestSavings)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="font-semibold text-gray-900">Cash Flow Improvement</span>
                    <span className="font-bold text-blue-600 text-lg">
                      {formatCurrency(results.cashFlowImprovement)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <span className="font-semibold text-gray-900">Net Benefit</span>
                    <span className="font-bold text-purple-600 text-lg">
                      {formatCurrency(results.impactAnalysis.netBenefit)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Working Capital Optimization</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Working capital optimization is the process of managing current assets and liabilities to minimize 
                the amount of capital tied up in day-to-day operations while maintaining sufficient liquidity for 
                business operations.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Components:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Accounts Receivable (AR):</strong> Money owed by customers for goods/services delivered</li>
                <li><strong>Inventory:</strong> Raw materials, work-in-progress, and finished goods held for sale</li>
                <li><strong>Accounts Payable (AP):</strong> Money owed to suppliers for goods/services received</li>
                <li><strong>Cash Conversion Cycle:</strong> Time between paying suppliers and receiving payment from customers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Optimization Strategies:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>AR Management:</strong> Implement credit policies, offer early payment discounts, improve collections</li>
                <li><strong>Inventory Management:</strong> Just-in-time inventory, demand forecasting, supplier optimization</li>
                <li><strong>AP Management:</strong> Negotiate extended payment terms, optimize payment schedules</li>
                <li><strong>Cash Management:</strong> Optimize cash balances, invest excess cash, manage banking relationships</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Benefits of Optimization:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reduced working capital requirements and improved cash flow</li>
                <li>Lower financing costs and interest expenses</li>
                <li>Improved operational efficiency and profitability</li>
                <li>Enhanced financial flexibility and investment capacity</li>
                <li>Better supplier and customer relationships</li>
              </ul>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-orange-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Corporate Finance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/corporate-finance/business-valuation-calculator" className="text-orange-600 hover:text-orange-800 underline">Business Valuation Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/loan-amortization-generator" className="text-orange-600 hover:text-orange-800 underline">Loan Amortization Generator</RouterLink>
                  <RouterLink to="/corporate-finance/capital-structure-analyzer" className="text-orange-600 hover:text-orange-800 underline">Capital Structure Analyzer</RouterLink>
                  <RouterLink to="/corporate-finance/break-even-calculator" className="text-orange-600 hover:text-orange-800 underline">Break-Even Point Calculator</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkingCapitalOptimizer;
