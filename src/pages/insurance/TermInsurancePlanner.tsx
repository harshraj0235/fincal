import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Target, IndianRupee, TrendingUp, Users, DollarSign, Info, AlertCircle, Shield, Download, Link } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

export const TermInsurancePlanner: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    age: 30,
    annualIncome: 500000,
    sumAssured: 10000000,
    policyTerm: 20,
    premiumPaymentTerm: 20,
    smoking: false,
    occupation: 'low-risk'
  });

  const [results, setResults] = useState({
    monthlyPremium: 0,
    yearlyPremium: 0,
    totalPremium: 0,
    providers: []
  });

  const providers = [
    { name: 'LIC', factor: 1.0, rating: 4.5, features: ['Government Backed', 'Reliable', 'Wide Network'] },
    { name: 'HDFC Life', factor: 1.1, rating: 4.4, features: ['Quick Claims', 'Digital Process', 'Good Service'] },
    { name: 'ICICI Prudential', factor: 1.05, rating: 4.3, features: ['Competitive Rates', 'Online Purchase', 'Flexible Options'] },
    { name: 'SBI Life', factor: 0.98, rating: 4.2, features: ['Bank Backed', 'Affordable', 'Trusted'] },
    { name: 'Bajaj Allianz', factor: 1.08, rating: 4.1, features: ['Fast Processing', 'Good Coverage', 'Customer Support'] }
  ];

  const calculateTermInsurance = () => {
    const { age, sumAssured, policyTerm, smoking, occupation } = inputs;
    
    // Base premium calculation (simplified)
    const basePremium = (sumAssured / 1000000) * 1000; // ₹1000 per ₹10L coverage
    
    // Age factor
    const ageFactor = 1 + (age - 25) * 0.05;
    
    // Smoking factor
    const smokingFactor = smoking ? 1.5 : 1.0;
    
    // Occupation factor
    const occupationFactors = {
      'low-risk': 1.0,
      'medium-risk': 1.2,
      'high-risk': 1.5
    };
    const occupationFactor = occupationFactors[occupation as keyof typeof occupationFactors] || 1.0;
    
    const yearlyPremium = basePremium * ageFactor * smokingFactor * occupationFactor;
    const monthlyPremium = yearlyPremium / 12;
    const totalPremium = yearlyPremium * policyTerm;
    
    // Calculate premiums for different providers
    const providerPremiums = providers.map(provider => ({
      ...provider,
      yearlyPremium: yearlyPremium * provider.factor,
      monthlyPremium: (yearlyPremium * provider.factor) / 12
    }));
    
    setResults({
      monthlyPremium,
      yearlyPremium,
      totalPremium,
      providers: providerPremiums
    });
  };

  useEffect(() => {
    calculateTermInsurance();
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
      
      pdf.save('term-insurance-planner-results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <>
      <SEOHelmet
        title="Term Insurance Planner - Affordable Term Insurance Plans India | MoneyCal.in"
        description="Free term insurance planner for India. Find affordable term insurance plans based on age, income, and coverage needs. Compare premiums across top providers and get personalized recommendations."
        keywords="term insurance planner India, affordable term insurance Calculator, best term insurance tool, term insurance premium Calculator, term insurance comparison"
        url="/insurance-tools/term-insurance-planner"
        type="website"
        image="/images/term-insurance-planner.jpg"
        tags={["term insurance", "insurance planner", "premium calculator", "life insurance"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
              <Target className="h-16 w-16 text-purple-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Term Insurance Planner
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Find affordable term insurance plans based on your age, income, and coverage needs. 
              Compare premiums across top providers and get personalized recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="h-6 w-6 text-purple-600 mr-2" />
                Your Details
              </h2>
              
              <div className="space-y-6">
                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Age
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    step="1"
                    value={inputs.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>18 Years</span>
                    <span className="font-semibold text-purple-600">{inputs.age} Years</span>
                    <span>65 Years</span>
                  </div>
                </div>

                {/* Annual Income */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income (₹)
                  </label>
                  <input
                    type="range"
                    min="200000"
                    max="2000000"
                    step="50000"
                    value={inputs.annualIncome}
                    onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹2 Lakhs</span>
                    <span className="font-semibold text-purple-600">{formatCurrency(inputs.annualIncome)}</span>
                    <span>₹20 Lakhs</span>
                  </div>
                </div>

                {/* Sum Assured */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Sum Assured (₹)
                  </label>
                  <input
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="500000"
                    value={inputs.sumAssured}
                    onChange={(e) => handleInputChange('sumAssured', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹10 Lakhs</span>
                    <span className="font-semibold text-purple-600">{formatCurrency(inputs.sumAssured)}</span>
                    <span>₹5 Crores</span>
                  </div>
                </div>

                {/* Policy Term */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Term (Years)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    step="5"
                    value={inputs.policyTerm}
                    onChange={(e) => handleInputChange('policyTerm', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>10 Years</span>
                    <span className="font-semibold text-purple-600">{inputs.policyTerm} Years</span>
                    <span>40 Years</span>
                  </div>
                </div>

                {/* Smoking Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Smoking Status
                  </label>
                  <select
                    value={inputs.smoking ? 'smoker' : 'non-smoker'}
                    onChange={(e) => handleInputChange('smoking', e.target.value === 'smoker')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="non-smoker">Non-Smoker</option>
                    <option value="smoker">Smoker</option>
                  </select>
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation Risk Level
                  </label>
                  <select
                    value={inputs.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="low-risk">Low Risk (Office Job, Teacher, etc.)</option>
                    <option value="medium-risk">Medium Risk (Sales, Marketing, etc.)</option>
                    <option value="high-risk">High Risk (Pilot, Mining, etc.)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Premium Estimates */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    Premium Estimates
                  </h2>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.monthlyPremium)}
                    </div>
                    <div className="text-purple-100">Monthly Premium</div>
                  </div>
                  <div className="text-center p-4 bg-white/20 rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(results.yearlyPremium)}
                    </div>
                    <div className="text-purple-100">Yearly Premium</div>
                  </div>
                </div>
              </div>

              {/* Provider Comparison */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 text-purple-600 mr-2" />
                  Provider Comparison
                </h3>
                <div className="space-y-3">
                  {results.providers.map((provider, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600 ml-1">{provider.rating}/5</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">
                            {formatCurrency(provider.yearlyPremium)}
                          </div>
                          <div className="text-sm text-gray-500">per year</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {provider.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
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
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Premium estimates are approximate and may vary by provider
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Medical examination may be required for higher coverage amounts
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Premiums are generally lower for younger and non-smoking individuals
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Compare policy features and claim settlement ratios before purchasing
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Term Insurance in India</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Term insurance is the most affordable form of life insurance that provides pure life cover without any 
                investment component. It offers high coverage at low premiums, making it ideal for young families and 
                individuals with financial dependents. For comprehensive insurance planning, explore our 
                <RouterLink to="/insurance-tools" className="text-blue-600 hover:text-blue-800 underline">complete suite of insurance tools</RouterLink>.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Benefits of Term Insurance:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>High Coverage at Low Cost:</strong> Maximum protection for minimum premium</li>
                <li><strong>Tax Benefits:</strong> Premiums eligible for deduction under Section 80C</li>
                <li><strong>Flexible Terms:</strong> Choose policy term based on your financial goals</li>
                <li><strong>Rider Options:</strong> Add critical illness, accidental death, and disability riders</li>
                <li><strong>No Investment Risk:</strong> Pure protection without market-linked returns</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Factors Affecting Term Insurance Premiums:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Age:</strong> Premiums increase with age due to higher mortality risk</li>
                <li><strong>Health Status:</strong> Medical conditions and lifestyle habits affect premiums</li>
                <li><strong>Smoking Status:</strong> Smokers pay higher premiums due to health risks</li>
                <li><strong>Occupation:</strong> High-risk occupations have higher premium rates</li>
                <li><strong>Coverage Amount:</strong> Higher sum assured results in higher premiums</li>
                <li><strong>Policy Term:</strong> Longer terms may have different premium structures</li>
              </ul>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Insurance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/insurance-tools/life-insurance-calculator" className="text-purple-600 hover:text-purple-800 underline">Life Insurance Calculator</RouterLink>
                  <RouterLink to="/insurance-tools/health-insurance-estimator" className="text-purple-600 hover:text-purple-800 underline">Health Insurance Estimator</RouterLink>
                  <RouterLink to="/insurance-tools/ulip-calculator" className="text-purple-600 hover:text-purple-800 underline">ULIP Calculator</RouterLink>
                  <RouterLink to="/insurance-tools/portfolio-dashboard" className="text-purple-600 hover:text-purple-800 underline">Insurance Portfolio Dashboard</RouterLink>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tips for Choosing Term Insurance:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Buy early when you're young and healthy for lower premiums</li>
                <li>Choose adequate coverage (10-15 times your annual income)</li>
                <li>Compare premiums and features across multiple providers</li>
                <li>Consider add-on riders based on your specific needs</li>
                <li>Review the claim settlement ratio of the insurance company</li>
                <li>Ensure the policy term covers your financial responsibilities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermInsurancePlanner;
