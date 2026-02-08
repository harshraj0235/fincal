import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BarChart3, DollarSign, Download, Link, Target, TrendingUp, Calculator, PieChart } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import { getPdfLibs } from '../../lib/pdfExportClient';

export const BreakEvenCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    // Company Information
    companyName: '',
    industry: 'manufacturing',
    
    // Cost Structure
    fixedCosts: 1000000,
    variableCostsPerUnit: 50,
    sellingPricePerUnit: 100,
    
    // Additional Costs
    marketingCosts: 100000,
    administrativeCosts: 200000,
    depreciation: 50000,
    interestExpense: 30000,
    
    // Sales Projections
    currentSales: 20000,
    targetSales: 30000,
    salesGrowthRate: 10,
    
    // Market Analysis
    marketSize: 100000,
    marketShare: 20,
    competitorPrice: 95,
    
    // Sensitivity Analysis
    priceSensitivity: 5,
    costSensitivity: 10,
    volumeSensitivity: 15
  });

  const [results, setResults] = useState({
    breakEven: {
      units: 0,
      sales: 0,
      marginOfSafety: 0,
      contributionMargin: 0,
      contributionMarginRatio: 0
    },
    profitability: {
      currentProfit: 0,
      targetProfit: 0,
      profitMargin: 0,
      returnOnSales: 0
    },
    analysis: {
      breakEvenTime: 0,
      riskLevel: '',
      recommendations: []
    },
    scenarios: {
      optimistic: { units: 0, profit: 0 },
      realistic: { units: 0, profit: 0 },
      pessimistic: { units: 0, profit: 0 }
    }
  });

  const industries = [
    { name: 'Manufacturing', fixedCosts: 1000000, variableCosts: 50, sellingPrice: 100 },
    { name: 'Retail', fixedCosts: 500000, variableCosts: 30, sellingPrice: 60 },
    { name: 'Technology', fixedCosts: 2000000, variableCosts: 20, sellingPrice: 150 },
    { name: 'Healthcare', fixedCosts: 1500000, variableCosts: 40, sellingPrice: 120 },
    { name: 'Food & Beverage', fixedCosts: 800000, variableCosts: 25, sellingPrice: 50 },
    { name: 'Construction', fixedCosts: 1200000, variableCosts: 60, sellingPrice: 100 },
    { name: 'Automotive', fixedCosts: 3000000, variableCosts: 80, sellingPrice: 200 },
    { name: 'Pharmaceuticals', fixedCosts: 5000000, variableCosts: 10, sellingPrice: 300 }
  ];

  const calculateBreakEven = () => {
    const {
      fixedCosts, variableCostsPerUnit, sellingPricePerUnit,
      marketingCosts, administrativeCosts, depreciation, interestExpense,
      currentSales, targetSales, salesGrowthRate,
      marketSize, marketShare, competitorPrice,
      priceSensitivity, costSensitivity, volumeSensitivity
    } = inputs;

    // Total Fixed Costs
    const totalFixedCosts = fixedCosts + marketingCosts + administrativeCosts + depreciation + interestExpense;

    // Contribution Margin
    const contributionMargin = sellingPricePerUnit - variableCostsPerUnit;
    const contributionMarginRatio = contributionMargin / sellingPricePerUnit;

    // Break-Even Analysis
    const breakEvenUnits = totalFixedCosts / contributionMargin;
    const breakEvenSales = breakEvenUnits * sellingPricePerUnit;

    // Current Performance
    const currentRevenue = currentSales * sellingPricePerUnit;
    const currentVariableCosts = currentSales * variableCostsPerUnit;
    const currentProfit = currentRevenue - currentVariableCosts - totalFixedCosts;
    const currentProfitMargin = (currentProfit / currentRevenue) * 100;
    const returnOnSales = currentProfitMargin;

    // Margin of Safety
    const marginOfSafety = ((currentSales - breakEvenUnits) / currentSales) * 100;

    // Target Profit Analysis
    const targetRevenue = targetSales * sellingPricePerUnit;
    const targetVariableCosts = targetSales * variableCostsPerUnit;
    const targetProfit = targetRevenue - targetVariableCosts - totalFixedCosts;

    // Break-Even Time (assuming linear growth)
    const monthlyGrowth = salesGrowthRate / 12;
    const breakEvenTime = breakEvenUnits / (currentSales * (1 + monthlyGrowth / 100));

    // Risk Assessment
    let riskLevel = 'Low';
    if (marginOfSafety < 10) riskLevel = 'High';
    else if (marginOfSafety < 20) riskLevel = 'Medium';

    // Generate Recommendations
    const recommendations = [];
    
    if (breakEvenUnits > currentSales) {
      recommendations.push({
        type: 'Volume Increase',
        priority: 'High',
        impact: 'Increase sales volume to reach break-even',
        benefit: `Need to sell ${(breakEvenUnits - currentSales).toFixed(0)} more units`,
        action: 'Focus on marketing, sales strategies, and market expansion'
      });
    }
    
    if (contributionMarginRatio < 0.3) {
      recommendations.push({
        type: 'Pricing Strategy',
        priority: 'High',
        impact: 'Improve contribution margin',
        benefit: 'Better profitability and lower break-even point',
        action: 'Consider price increases or cost reduction strategies'
      });
    }
    
    if (marginOfSafety < 20) {
      recommendations.push({
        type: 'Risk Management',
        priority: 'Medium',
        impact: 'Improve margin of safety',
        benefit: 'Better financial stability and reduced risk',
        action: 'Diversify revenue streams and reduce fixed costs'
      });
    }

    // Scenario Analysis
    const scenarios = {
      optimistic: {
        units: currentSales * 1.2,
        profit: (currentSales * 1.2 * sellingPricePerUnit) - (currentSales * 1.2 * variableCostsPerUnit) - totalFixedCosts
      },
      realistic: {
        units: currentSales,
        profit: currentProfit
      },
      pessimistic: {
        units: currentSales * 0.8,
        profit: (currentSales * 0.8 * sellingPricePerUnit) - (currentSales * 0.8 * variableCostsPerUnit) - totalFixedCosts
      }
    };

    setResults({
      breakEven: {
        units: breakEvenUnits,
        sales: breakEvenSales,
        marginOfSafety,
        contributionMargin,
        contributionMarginRatio
      },
      profitability: {
        currentProfit,
        targetProfit,
        profitMargin: currentProfitMargin,
        returnOnSales
      },
      analysis: {
        breakEvenTime,
        riskLevel,
        recommendations
      },
      scenarios
    });
  };

  useEffect(() => {
    calculateBreakEven();
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
      
      pdf.save('break-even-analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <SEOHelmet
        title="Break-Even Point Calculator - Free Business Profitability Analysis Tool | MoneyCal.in"
        description="Calculate break-even point with our free business profitability tool. Analyze fixed costs, variable costs, and determine when your business becomes profitable."
        keywords="break even calculator, corporate finance tool, profit point calculator, business profitability analysis, break even analysis"
        url="/corporate-finance/break-even-calculator"
        type="website"
        image="/images/break-even-calculator.jpg"
        tags={["break even", "profitability", "corporate finance", "business analysis"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
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
              <BarChart3 className="h-16 w-16 text-red-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Break-Even Point Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Calculate your business break-even point and analyze profitability. 
              Determine the minimum sales volume needed to cover all costs and start generating profits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 text-red-600 mr-2" />
                Business Information
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                        handleInputChange('fixedCosts', selectedIndustry.fixedCosts);
                        handleInputChange('variableCostsPerUnit', selectedIndustry.variableCosts);
                        handleInputChange('sellingPricePerUnit', selectedIndustry.sellingPrice);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {industries.map((industry, index) => (
                      <option key={index} value={industry.name.toLowerCase()}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cost Structure */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Structure</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fixed Costs (₹)
                      </label>
                      <input
                        type="number"
                        value={inputs.fixedCosts}
                        onChange={(e) => handleInputChange('fixedCosts', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Variable Cost per Unit (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.variableCostsPerUnit}
                        onChange={(e) => handleInputChange('variableCostsPerUnit', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selling Price per Unit (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={inputs.sellingPricePerUnit}
                        onChange={(e) => handleInputChange('sellingPricePerUnit', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Costs */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Costs (₹)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Marketing Costs
                      </label>
                      <input
                        type="number"
                        value={inputs.marketingCosts}
                        onChange={(e) => handleInputChange('marketingCosts', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Administrative Costs
                      </label>
                      <input
                        type="number"
                        value={inputs.administrativeCosts}
                        onChange={(e) => handleInputChange('administrativeCosts', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Depreciation
                      </label>
                      <input
                        type="number"
                        value={inputs.depreciation}
                        onChange={(e) => handleInputChange('depreciation', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interest Expense
                      </label>
                      <input
                        type="number"
                        value={inputs.interestExpense}
                        onChange={(e) => handleInputChange('interestExpense', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Sales Projections */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Projections</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Sales (Units)
                      </label>
                      <input
                        type="number"
                        value={inputs.currentSales}
                        onChange={(e) => handleInputChange('currentSales', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Sales (Units)
                      </label>
                      <input
                        type="number"
                        value={inputs.targetSales}
                        onChange={(e) => handleInputChange('targetSales', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sales Growth Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.salesGrowthRate}
                        onChange={(e) => handleInputChange('salesGrowthRate', parseFloat(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Break-Even Summary */}
              <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Target className="h-6 w-6 mr-2" />
                    Break-Even Analysis
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
                      {results.breakEven.units.toFixed(0)}
                    </div>
                    <div className="text-red-100">Break-Even Units</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.breakEven.sales)}
                    </div>
                    <div className="text-red-100">Break-Even Sales</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.breakEven.marginOfSafety.toFixed(1)}%
                    </div>
                    <div className="text-red-100">Margin of Safety</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {results.breakEven.contributionMarginRatio.toFixed(1)}%
                    </div>
                    <div className="text-red-100">Contribution Margin</div>
                  </div>
                </div>
              </div>

              {/* Profitability Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Profitability Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-semibold text-gray-900">Current Profit</span>
                    <span className="font-bold text-green-600 text-lg">
                      {formatCurrency(results.profitability.currentProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Target Profit</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.profitability.targetProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Profit Margin</span>
                    <span className="font-semibold text-green-600">
                      {results.profitability.profitMargin.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Return on Sales</span>
                    <span className="font-semibold text-green-600">
                      {results.profitability.returnOnSales.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Risk Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
                  Risk Analysis
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <span className="font-semibold text-gray-900">Risk Level</span>
                    <span className={`font-bold text-lg px-3 py-1 rounded ${
                      results.analysis.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                      results.analysis.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {results.analysis.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Break-Even Time (Months)</span>
                    <span className="font-semibold text-orange-600">
                      {results.analysis.breakEvenTime.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Margin of Safety</span>
                    <span className="font-semibold text-orange-600">
                      {results.breakEven.marginOfSafety.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <PieChart className="h-5 w-5 text-blue-600 mr-2" />
                  Recommendations
                </h3>
                <div className="space-y-4">
                  {results.analysis.recommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      rec.priority === 'High' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{rec.type}</h4>
                        <span className={`text-sm font-semibold px-2 py-1 rounded ${
                          rec.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {rec.priority} Priority
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Impact:</strong> {rec.impact}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Benefit:</strong> {rec.benefit}
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Action:</strong> {rec.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scenario Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
                  Scenario Analysis
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Optimistic</h4>
                      <div className="text-sm text-gray-600">
                        <div>Units: {results.scenarios.optimistic.units.toFixed(0)}</div>
                        <div>Profit: {formatCurrency(results.scenarios.optimistic.profit)}</div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Realistic</h4>
                      <div className="text-sm text-gray-600">
                        <div>Units: {results.scenarios.realistic.units.toFixed(0)}</div>
                        <div>Profit: {formatCurrency(results.scenarios.realistic.profit)}</div>
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">Pessimistic</h4>
                      <div className="text-sm text-gray-600">
                        <div>Units: {results.scenarios.pessimistic.units.toFixed(0)}</div>
                        <div>Profit: {formatCurrency(results.scenarios.pessimistic.profit)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Break-Even Analysis</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Break-even analysis is a critical financial tool that determines the point at which total revenue equals total costs, 
                resulting in neither profit nor loss. This analysis helps businesses understand their cost structure and make informed 
                decisions about pricing, production, and sales strategies.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Components:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Fixed Costs:</strong> Expenses that remain constant regardless of production volume</li>
                <li><strong>Variable Costs:</strong> Expenses that change proportionally with production volume</li>
                <li><strong>Contribution Margin:</strong> Difference between selling price and variable cost per unit</li>
                <li><strong>Break-Even Point:</strong> The sales volume at which total revenue equals total costs</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Metrics:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Break-Even Units:</strong> Number of units that must be sold to cover all costs</li>
                <li><strong>Break-Even Sales:</strong> Total revenue needed to reach break-even point</li>
                <li><strong>Margin of Safety:</strong> Percentage by which sales can drop before reaching break-even</li>
                <li><strong>Contribution Margin Ratio:</strong> Percentage of each sales rupee that contributes to fixed costs</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Applications:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pricing strategy development and optimization</li>
                <li>Production planning and capacity utilization</li>
                <li>Cost control and expense management</li>
                <li>Investment decision making and project evaluation</li>
                <li>Risk assessment and financial planning</li>
              </ul>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Corporate Finance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/corporate-finance/business-valuation-calculator" className="text-red-600 hover:text-red-800 underline">Business Valuation Calculator</RouterLink>
                  <RouterLink to="/corporate-finance/working-capital-optimizer" className="text-red-600 hover:text-red-800 underline">Working Capital Optimizer</RouterLink>
                  <RouterLink to="/corporate-finance/capital-structure-analyzer" className="text-red-600 hover:text-red-800 underline">Capital Structure Analyzer</RouterLink>
                  <RouterLink to="/corporate-finance/scenario-analysis-simulator" className="text-red-600 hover:text-red-800 underline">Scenario Analysis Simulator</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreakEvenCalculator;
