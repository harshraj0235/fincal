import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Shield, Calculator, TrendingUp, Users, DollarSign, Info, AlertCircle, Download, Link } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { getPdfLibs } from '../../lib/pdfExportClient';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

export const LifeInsuranceCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    annualIncome: 500000,
    dependents: 2,
    existingLiabilities: 2000000,
    existingSavings: 500000,
    coverageYears: 20,
    inflationRate: 6,
    spouseIncome: 200000,
    childrenAges: [5, 8],
    educationCost: 1000000,
    marriageCost: 500000
  });

  const [results, setResults] = useState({
    humanLifeValue: 0,
    incomeReplacement: 0,
    liabilityCoverage: 0,
    educationMarriageFund: 0,
    totalCoverage: 0,
    monthlyPremium: 0,
    yearlyPremium: 0,
    taxBenefits: 0
  });

  const calculateLifeInsurance = () => {
    const { annualIncome, dependents, existingLiabilities, existingSavings, coverageYears, inflationRate, spouseIncome, childrenAges, educationCost, marriageCost } = inputs;
    
    // Human Life Value (HLV) Method
    const humanLifeValue = annualIncome * coverageYears;
    
    // Income Replacement Method (considering spouse income)
    const netIncome = annualIncome - spouseIncome;
    const incomeReplacement = netIncome * coverageYears;
    
    // Liability Coverage
    const liabilityCoverage = Math.max(0, existingLiabilities - existingSavings);
    
    // Education and Marriage Fund
    const totalEducationMarriageCost = educationCost + marriageCost;
    const educationMarriageFund = totalEducationMarriageCost;
    
    // Total Coverage Required
    const totalCoverage = Math.max(humanLifeValue, incomeReplacement) + liabilityCoverage + educationMarriageFund;
    
    // Premium Calculation (assuming 0.5% of sum assured as annual premium)
    const yearlyPremium = totalCoverage * 0.005;
    const monthlyPremium = yearlyPremium / 12;
    
    // Tax Benefits (Section 80C - up to ₹1.5 lakhs)
    const taxBenefits = Math.min(yearlyPremium, 150000) * 0.3; // Assuming 30% tax bracket
    
    setResults({
      humanLifeValue,
      incomeReplacement,
      liabilityCoverage,
      educationMarriageFund,
      totalCoverage,
      monthlyPremium,
      yearlyPremium,
      taxBenefits
    });
  };

  useEffect(() => {
    calculateLifeInsurance();
  }, [inputs]);

  const handleInputChange = (field: string, value: number) => {
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
      
      pdf.save('life-insurance-calculator-results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <>
      <SEOHelmet
        title="Life Insurance Needs Calculator - Calculate Coverage Amount India | MoneyCal.in"
        description="Free life insurance calculator for India. Calculate how much life insurance you need using Human Life Value method. Get personalized coverage recommendations, premium estimates, and tax benefits."
        keywords="life insurance calculator India, how much life insurance do I need, life insurance needs calculator 2025, human life value calculator, life insurance coverage calculator"
        url="/insurance-tools/life-insurance-calculator"
        type="website"
        image="/images/life-insurance-calculator.jpg"
        tags={["life insurance", "insurance calculator", "coverage calculator", "human life value"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
              <Shield className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Life Insurance Needs Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Calculate the right amount of life insurance coverage using the Human Life Value (HLV) method. 
              Get personalized recommendations based on your income, dependents, and financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                Your Financial Details
              </h2>
              
              <div className="space-y-6">
                {/* Annual Income */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income (₹)
                  </label>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={inputs.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹1 Lakh</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(inputs.annualIncome)}</span>
                    <span>₹50 Lakhs</span>
                  </div>
                </div>

                {/* Number of Dependents */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Dependents
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={inputs.dependents}
                    onChange={(e) => handleInputChange('dependents', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Spouse Income */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spouse Annual Income (₹)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3000000"
                    step="50000"
                    value={inputs.spouseIncome}
                    onChange={(e) => handleInputChange('spouseIncome', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹0</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(inputs.spouseIncome)}</span>
                    <span>₹30 Lakhs</span>
                  </div>
                </div>

                {/* Existing Liabilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Existing Liabilities (₹)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={inputs.existingLiabilities}
                    onChange={(e) => handleInputChange('existingLiabilities', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹0</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(inputs.existingLiabilities)}</span>
                    <span>₹1 Crore</span>
                  </div>
                </div>

                {/* Existing Savings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Existing Savings & Investments (₹)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="50000"
                    value={inputs.existingSavings}
                    onChange={(e) => handleInputChange('existingSavings', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹0</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(inputs.existingSavings)}</span>
                    <span>₹50 Lakhs</span>
                  </div>
                </div>

                {/* Coverage Years */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Coverage Period (Years)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    step="5"
                    value={inputs.coverageYears}
                    onChange={(e) => handleInputChange('coverageYears', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>10 Years</span>
                    <span className="font-semibold text-blue-600">{inputs.coverageYears} Years</span>
                    <span>40 Years</span>
                  </div>
                </div>

                {/* Education Cost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Children's Education Fund (₹)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="100000"
                    value={inputs.educationCost}
                    onChange={(e) => handleInputChange('educationCost', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹0</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(inputs.educationCost)}</span>
                    <span>₹50 Lakhs</span>
                  </div>
                </div>

                {/* Marriage Cost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Children's Marriage Fund (₹)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3000000"
                    step="100000"
                    value={inputs.marriageCost}
                    onChange={(e) => handleInputChange('marriageCost', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹0</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(inputs.marriageCost)}</span>
                    <span>₹30 Lakhs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Main Result */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    Recommended Coverage
                  </h2>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
                <div className="text-4xl font-bold mb-2">
                  {formatCurrency(results.totalCoverage)}
                </div>
                <p className="text-blue-100">
                  Total life insurance coverage recommended for your family's financial security
                </p>
              </div>

              {/* Premium Estimates */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  Premium Estimates
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.monthlyPremium)}
                    </div>
                    <div className="text-sm text-gray-600">Monthly Premium</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(results.yearlyPremium)}
                    </div>
                    <div className="text-sm text-gray-600">Yearly Premium</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className="text-sm text-yellow-800">
                      Tax Benefits: {formatCurrency(results.taxBenefits)} per year (Section 80C)
                    </span>
                  </div>
                </div>
              </div>

              {/* Coverage Breakdown */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 text-purple-600 mr-2" />
                  Coverage Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Income Replacement</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(results.incomeReplacement)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Liability Coverage</span>
                    <span className="font-semibold text-green-600">{formatCurrency(results.liabilityCoverage)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Education & Marriage</span>
                    <span className="font-semibold text-purple-600">{formatCurrency(results.educationMarriageFund)}</span>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    This calculation uses the Human Life Value (HLV) method
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Premium estimates are approximate and may vary by provider
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Consider inflation and changing financial needs over time
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Consult with a qualified insurance advisor for personalized advice
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Life Insurance Needs Calculation</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Life insurance is a crucial financial tool that provides financial security to your family in case of your untimely demise. 
                The Human Life Value (HLV) method is one of the most widely used approaches to determine how much life insurance coverage you need.
                For more comprehensive financial planning, explore our <RouterLink to="/insurance-tools" className="text-blue-600 hover:text-blue-800 underline">complete suite of insurance tools</RouterLink>.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How the Human Life Value Method Works:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Income Replacement:</strong> Calculates the present value of your future earnings over the coverage period</li>
                <li><strong>Liability Coverage:</strong> Ensures your family can pay off existing debts and loans</li>
                <li><strong>Education & Marriage Fund:</strong> Provides for your children's future education and marriage expenses</li>
                <li><strong>Emergency Fund:</strong> Maintains your family's standard of living during the transition period</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tax Benefits of Life Insurance in India:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Section 80C:</strong> Premiums paid up to ₹1.5 lakhs are eligible for tax deduction</li>
                <li><strong>Section 10(10D):</strong> Maturity proceeds are generally tax-free if certain conditions are met</li>
                <li><strong>Section 80CCC:</strong> Additional deduction for pension plans</li>
              </ul>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Insurance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/insurance-tools/term-insurance-planner" className="text-blue-600 hover:text-blue-800 underline">Term Insurance Planner</RouterLink>
                  <RouterLink to="/insurance-tools/health-insurance-estimator" className="text-blue-600 hover:text-blue-800 underline">Health Insurance Estimator</RouterLink>
                  <RouterLink to="/insurance-tools/ulip-calculator" className="text-blue-600 hover:text-blue-800 underline">ULIP Calculator</RouterLink>
                  <RouterLink to="/insurance-tools/portfolio-dashboard" className="text-blue-600 hover:text-blue-800 underline">Insurance Portfolio Dashboard</RouterLink>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Factors to Consider:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your current age and health condition</li>
                <li>Number and age of dependents</li>
                <li>Existing financial assets and liabilities</li>
                <li>Inflation rate and future financial goals</li>
                <li>Spouse's earning capacity</li>
                <li>Children's education and marriage expenses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LifeInsuranceCalculator;
