import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, IndianRupee, TrendingUp, DollarSign, BarChart3, Download, Link, Building, Target, PieChart } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const BusinessValuationCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    // Company Basic Info
    companyName: '',
    industry: 'technology',
    revenue: 10000000,
    ebit: 2000000,
    netIncome: 1500000,
    
    // Growth & Projections
    revenueGrowthRate: 15,
    ebitGrowthRate: 12,
    projectionYears: 5,
    
    // DCF Parameters
    discountRate: 10,
    terminalGrowthRate: 3,
    taxRate: 25,
    
    // Multiples
    evEbitdaMultiple: 12,
    peMultiple: 18,
    priceToSalesMultiple: 3,
    
    // Balance Sheet
    totalDebt: 5000000,
    cashAndEquivalents: 2000000,
    sharesOutstanding: 1000000
  });

  const [results, setResults] = useState({
    dcfValuation: 0,
    multiplesValuation: 0,
    averageValuation: 0,
    enterpriseValue: 0,
    equityValue: 0,
    sharePrice: 0,
    valuationRange: { min: 0, max: 0 },
    projections: [],
    sensitivityAnalysis: []
  });

  const industries = [
    { name: 'Technology', evEbitda: 15, pe: 25, ps: 4 },
    { name: 'Healthcare', evEbitda: 12, pe: 20, ps: 3 },
    { name: 'Financial Services', evEbitda: 8, pe: 12, ps: 2 },
    { name: 'Manufacturing', evEbitda: 10, pe: 15, ps: 2.5 },
    { name: 'Retail', evEbitda: 8, pe: 14, ps: 1.5 },
    { name: 'Energy', evEbitda: 6, pe: 10, ps: 1 },
    { name: 'Real Estate', evEbitda: 12, pe: 18, ps: 3 },
    { name: 'Consumer Goods', evEbitda: 10, pe: 16, ps: 2 }
  ];

  const calculateValuation = () => {
    const {
      revenue, ebit, netIncome, revenueGrowthRate, ebitGrowthRate, projectionYears,
      discountRate, terminalGrowthRate, taxRate, evEbitdaMultiple, peMultiple,
      priceToSalesMultiple, totalDebt, cashAndEquivalents, sharesOutstanding
    } = inputs;

    // DCF Calculation
    const projections = [];
    let currentRevenue = revenue;
    let currentEbit = ebit;
    let pvCashFlows = 0;

    for (let year = 1; year <= projectionYears; year++) {
      currentRevenue *= (1 + revenueGrowthRate / 100);
      currentEbit *= (1 + ebitGrowthRate / 100);
      const freeCashFlow = currentEbit * (1 - taxRate / 100);
      const pv = freeCashFlow / Math.pow(1 + discountRate / 100, year);
      pvCashFlows += pv;

      projections.push({
        year,
        revenue: currentRevenue,
        ebit: currentEbit,
        freeCashFlow,
        presentValue: pv
      });
    }

    // Terminal Value
    const terminalFCF = currentEbit * (1 + terminalGrowthRate / 100) * (1 - taxRate / 100);
    const terminalValue = terminalFCF / ((discountRate - terminalGrowthRate) / 100);
    const pvTerminalValue = terminalValue / Math.pow(1 + discountRate / 100, projectionYears);

    const dcfValuation = pvCashFlows + pvTerminalValue;

    // Multiples Valuation
    const evEbitdaValue = ebit * evEbitdaMultiple;
    const peValue = netIncome * peMultiple;
    const psValue = revenue * priceToSalesMultiple;

    const multiplesValuation = (evEbitdaValue + peValue + psValue) / 3;

    // Average Valuation
    const averageValuation = (dcfValuation + multiplesValuation) / 2;

    // Enterprise Value and Equity Value
    const enterpriseValue = averageValuation;
    const equityValue = enterpriseValue - totalDebt + cashAndEquivalents;
    const sharePrice = equityValue / sharesOutstanding;

    // Valuation Range
    const valuationRange = {
      min: Math.min(dcfValuation, multiplesValuation),
      max: Math.max(dcfValuation, multiplesValuation)
    };

    // Sensitivity Analysis
    const sensitivityAnalysis = [];
    const discountRates = [8, 10, 12, 15];
    const growthRates = [10, 15, 20, 25];

    discountRates.forEach(rate => {
      growthRates.forEach(growth => {
        let testRevenue = revenue;
        let testEbit = ebit;
        let testPvCashFlows = 0;

        for (let year = 1; year <= projectionYears; year++) {
          testRevenue *= (1 + growth / 100);
          testEbit *= (1 + growth / 100);
          const freeCashFlow = testEbit * (1 - taxRate / 100);
          const pv = freeCashFlow / Math.pow(1 + rate / 100, year);
          testPvCashFlows += pv;
        }

        const testTerminalFCF = testEbit * (1 + terminalGrowthRate / 100) * (1 - taxRate / 100);
        const testTerminalValue = testTerminalFCF / ((rate - terminalGrowthRate) / 100);
        const testPvTerminalValue = testTerminalValue / Math.pow(1 + rate / 100, projectionYears);
        const testDcfValuation = testPvCashFlows + testPvTerminalValue;

        sensitivityAnalysis.push({
          discountRate: rate,
          growthRate: growth,
          valuation: testDcfValuation
        });
      });
    });

    setResults({
      dcfValuation,
      multiplesValuation,
      averageValuation,
      enterpriseValue,
      equityValue,
      sharePrice,
      valuationRange,
      projections,
      sensitivityAnalysis
    });
  };

  useEffect(() => {
    calculateValuation();
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
      
      pdf.save('business-valuation-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <SEOHelmet
        title="Business Valuation Calculator - Free DCF & Multiples Tool | MoneyCal.in"
        description="Free business valuation Calculator using DCF analysis and comparable multiples. Calculate company worth, enterprise value, and share price with detailed projections."
        keywords="business valuation Calculator, free DCF tool, company worth Calculator, enterprise value Calculator, business valuation tool"
        url="/corporate-finance/business-valuation-calculator"
        type="website"
        image="/images/business-valuation-calculator.jpg"
        tags={["business valuation", "DCF analysis", "company valuation", "financial modeling"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
              <IndianRupee className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Business Valuation Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Professional business valuation using DCF analysis and comparable multiples. 
              Calculate enterprise value, equity value, and share price with detailed financial projections.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-blue-600 mr-2" />
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        handleInputChange('evEbitdaMultiple', selectedIndustry.evEbitda);
                        handleInputChange('peMultiple', selectedIndustry.pe);
                        handleInputChange('priceToSalesMultiple', selectedIndustry.ps);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {industries.map((industry, index) => (
                      <option key={index} value={industry.name.toLowerCase()}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Financial Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Revenue (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.revenue}
                      onChange={(e) => handleInputChange('revenue', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EBIT (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.ebit}
                      onChange={(e) => handleInputChange('ebit', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Net Income (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.netIncome}
                      onChange={(e) => handleInputChange('netIncome', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shares Outstanding
                    </label>
                    <input
                      type="number"
                      value={inputs.sharesOutstanding}
                      onChange={(e) => handleInputChange('sharesOutstanding', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Growth Rates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Revenue Growth Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.revenueGrowthRate}
                      onChange={(e) => handleInputChange('revenueGrowthRate', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EBIT Growth Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.ebitGrowthRate}
                      onChange={(e) => handleInputChange('ebitGrowthRate', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* DCF Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.discountRate}
                      onChange={(e) => handleInputChange('discountRate', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Terminal Growth (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.terminalGrowthRate}
                      onChange={(e) => handleInputChange('terminalGrowthRate', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.taxRate}
                      onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Multiples */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EV/EBITDA Multiple
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.evEbitdaMultiple}
                      onChange={(e) => handleInputChange('evEbitdaMultiple', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      P/E Multiple
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.peMultiple}
                      onChange={(e) => handleInputChange('peMultiple', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      P/S Multiple
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.priceToSalesMultiple}
                      onChange={(e) => handleInputChange('priceToSalesMultiple', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Balance Sheet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Debt (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.totalDebt}
                      onChange={(e) => handleInputChange('totalDebt', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cash & Equivalents (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.cashAndEquivalents}
                      onChange={(e) => handleInputChange('cashAndEquivalents', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Valuation Summary */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Target className="h-6 w-6 mr-2" />
                    Valuation Summary
                  </h2>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.averageValuation)}
                    </div>
                    <div className="text-blue-100">Average Valuation</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.sharePrice)}
                    </div>
                    <div className="text-blue-100">Share Price</div>
                  </div>
                </div>
              </div>

              {/* Valuation Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <PieChart className="h-5 w-5 text-blue-600 mr-2" />
                  Valuation Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">DCF Valuation</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(results.dcfValuation)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Multiples Valuation</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(results.multiplesValuation)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <span className="font-semibold text-gray-900">Enterprise Value</span>
                    <span className="font-bold text-blue-600 text-lg">
                      {formatCurrency(results.enterpriseValue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                    <span className="font-semibold text-gray-900">Equity Value</span>
                    <span className="font-bold text-green-600 text-lg">
                      {formatCurrency(results.equityValue)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Valuation Range */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                  Valuation Range
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Minimum Valuation</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(results.valuationRange.min)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Maximum Valuation</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.valuationRange.max)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Financial Projections */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  Financial Projections
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">Year</th>
                        <th className="text-right py-2">Revenue</th>
                        <th className="text-right py-2">EBIT</th>
                        <th className="text-right py-2">FCF</th>
                        <th className="text-right py-2">PV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.projections.map((projection, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2">{projection.year}</td>
                          <td className="text-right py-2">{formatNumber(projection.revenue)}</td>
                          <td className="text-right py-2">{formatNumber(projection.ebit)}</td>
                          <td className="text-right py-2">{formatNumber(projection.freeCashFlow)}</td>
                          <td className="text-right py-2">{formatNumber(projection.presentValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Business Valuation</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Business valuation is the process of determining the economic value of a company. 
                Our Calculator uses two primary methods: Discounted Cash Flow (DCF) analysis and 
                Comparable Company Multiples to provide a comprehensive valuation.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">DCF Analysis:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Projected Cash Flows:</strong> Estimates future free cash flows based on growth assumptions</li>
                <li><strong>Discount Rate:</strong> Reflects the risk and required return for the investment</li>
                <li><strong>Terminal Value:</strong> Captures the value beyond the projection period</li>
                <li><strong>Present Value:</strong> Converts future cash flows to today's value</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comparable Multiples:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>EV/EBITDA:</strong> Enterprise value to earnings before interest, taxes, depreciation, and amortization</li>
                <li><strong>P/E Ratio:</strong> Price-to-earnings ratio based on net income</li>
                <li><strong>P/S Ratio:</strong> Price-to-sales ratio based on revenue</li>
                <li><strong>Industry Benchmarks:</strong> Uses industry-specific multiples for accuracy</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Considerations:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adjust growth rates based on market conditions and company lifecycle</li>
                <li>Use appropriate discount rates reflecting business risk and market conditions</li>
                <li>Consider industry-specific factors and competitive positioning</li>
                <li>Review and update assumptions regularly as business conditions change</li>
                <li>Use multiple valuation methods for a more robust assessment</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Corporate Finance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/corporate-finance/ma-synergy-estimator" className="text-blue-600 hover:text-blue-800 underline">M&A Synergy Estimator</RouterLink>
                  <RouterLink to="/corporate-finance/capital-structure-analyzer" className="text-blue-600 hover:text-blue-800 underline">Capital Structure Analyzer</RouterLink>
                  <RouterLink to="/corporate-finance/cost-capital-benchmarking" className="text-blue-600 hover:text-blue-800 underline">Cost of Capital Benchmarking</RouterLink>
                  <RouterLink to="/corporate-finance/scenario-analysis-simulator" className="text-blue-600 hover:text-blue-800 underline">Scenario Analysis Simulator</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessValuationCalculator;
