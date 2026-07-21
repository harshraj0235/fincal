import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Car, IndianRupee, TrendingUp, AlertCircle, Shield, Download, Link } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


const providers = [
  { name: 'Bajaj Allianz', factor: 1.0, rating: 4.5, features: ['Quick Claims', 'Wide Network', '24/7 Support'] },
  { name: 'ICICI Lombard', factor: 1.05, rating: 4.4, features: ['Cashless Repairs', 'Roadside Assistance', 'Zero Depreciation'] },
  { name: 'HDFC ERGO', factor: 1.08, rating: 4.3, features: ['Instant Policy', 'Digital Claims', 'Garage Network'] },
  { name: 'New India Assurance', factor: 0.95, rating: 4.2, features: ['Government Backed', 'Reliable Claims', 'Pan India'] },
  { name: 'Oriental Insurance', factor: 0.98, rating: 4.1, features: ['Affordable Premiums', 'Easy Renewal', 'Good Coverage'] },
  { name: 'United India Insurance', factor: 0.92, rating: 4.0, features: ['Budget Friendly', 'Simple Process', 'Trusted Brand'] }
];

export const CarInsuranceCalculator: React.FC = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState({
    vehicleType: 'sedan',
    vehicleAge: 2,
    city: 'metro',
    coverageType: 'comprehensive',
    vehicleValue: 800000,
    engineCapacity: 1200,
    previousClaims: 0,
    noClaimBonus: 20,
    voluntaryDeductible: 0
  });

  const [results, setResults] = useState({
    basePremium: 0,
    vehicleFactor: 0,
    ageFactor: 0,
    cityFactor: 0,
    coverageFactor: 0,
    totalPremium: 0,
    providers: [] as Array<{
      name: string;
      factor: number;
      rating: number;
      features: string[];
      premium: number;
    }>
  });

  const calculateCarInsurance = useCallback(() => {
    const { vehicleType, vehicleAge, city, coverageType, engineCapacity, previousClaims, noClaimBonus, voluntaryDeductible } = inputs;
    
    // Base premium calculation
    const basePremium = 5000; // Base premium for third-party
    
    // Vehicle type factor
    const vehicleFactors = {
      'hatchback': 1.0,
      'sedan': 1.2,
      'suv': 1.5,
      'luxury': 2.0
    };
    const vehicleFactor = vehicleFactors[vehicleType as keyof typeof vehicleFactors] || 1.0;
    
    // Age factor (older cars have higher premiums)
    const ageFactor = 1 + (vehicleAge * 0.05);
    
    // City factor
    const cityFactors = {
      'metro': 1.3,
      'tier1': 1.1,
      'tier2': 1.0,
      'tier3': 0.9
    };
    const cityFactor = cityFactors[city as keyof typeof cityFactors] || 1.0;
    
    // Coverage type factor
    const coverageFactors = {
      'third-party': 1.0,
      'comprehensive': 2.5,
      'zero-depreciation': 3.0
    };
    const coverageFactor = coverageFactors[coverageType as keyof typeof coverageFactors] || 1.0;
    
    // Engine capacity factor
    const engineFactor = 1 + (engineCapacity - 1000) * 0.0001;
    
    // Previous claims factor
    const claimsFactor = 1 + (previousClaims * 0.1);
    
    // No claim bonus factor (reduces premium)
    const ncbFactor = 1 - (noClaimBonus * 0.01);
    
    // Voluntary deductible factor (reduces premium)
    const deductibleFactor = 1 - (voluntaryDeductible * 0.001);
    
    const totalPremium = basePremium * vehicleFactor * ageFactor * cityFactor * coverageFactor * engineFactor * claimsFactor * ncbFactor * deductibleFactor;
    
    // Calculate premiums for different providers
    const providerPremiums = providers.map(provider => ({
      ...provider,
      premium: totalPremium * provider.factor
    }));
    
    setResults({
      basePremium,
      vehicleFactor,
      ageFactor,
      cityFactor,
      coverageFactor,
      totalPremium,
      providers: providerPremiums
    });
  }, [inputs]);

  useEffect(() => {
    calculateCarInsurance();
  }, [inputs, calculateCarInsurance]);

  const handleInputChange = (field: string, value: string | number) => {
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
      
      pdf.save('car-insurance-calculator-results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <>
      <SEOHelmet
        title="Car Insurance Premium Calculator - Vehicle Insurance Cost India | MoneyCal.in"
        description="Free car insurance premium Calculator for India. Calculate vehicle insurance costs based on car type, age, location. Compare third-party and comprehensive insurance premiums across providers."
        keywords="car insurance premium Calculator India, vehicle insurance cost estimator, car insurance Calculator 2025, third party insurance Calculator, comprehensive car insurance calculator"
        url="/insurance-tools/car-insurance-calculator"
        type="website"
        image="/images/car-insurance-calculator.jpg"
        tags={["car insurance", "vehicle insurance", "insurance calculator", "premium calculator"]}
      />
      
      <WhatsAppBanner />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
              <Car className="h-16 w-16 text-green-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Car Insurance Cost Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Calculate car insurance premiums based on vehicle type, age, location, and coverage type. 
              Compare third-party and comprehensive insurance plans across top providers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="h-6 w-6 text-green-600 mr-2" />
                Vehicle Details
              </h2>
              
              <div className="space-y-6">
                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    value={inputs.vehicleType}
                    onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="hatchback">Hatchback</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury Car</option>
                  </select>
                </div>

                {/* Vehicle Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Age (Years)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={inputs.vehicleAge}
                    onChange={(e) => handleInputChange('vehicleAge', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0 Years</span>
                    <span className="font-semibold text-green-600">{inputs.vehicleAge} Years</span>
                    <span>15 Years</span>
                  </div>
                </div>

                {/* City Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City Type
                  </label>
                  <select
                    value={inputs.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="metro">Metro City</option>
                    <option value="tier1">Tier 1 City</option>
                    <option value="tier2">Tier 2 City</option>
                    <option value="tier3">Tier 3 City</option>
                  </select>
                </div>

                {/* Coverage Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coverage Type
                  </label>
                  <select
                    value={inputs.coverageType}
                    onChange={(e) => handleInputChange('coverageType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="third-party">Third Party Only</option>
                    <option value="comprehensive">Comprehensive</option>
                    <option value="zero-depreciation">Zero Depreciation</option>
                  </select>
                </div>

                {/* Vehicle Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Value (₹)
                  </label>
                  <input
                    type="range"
                    min="200000"
                    max="5000000"
                    step="50000"
                    value={inputs.vehicleValue}
                    onChange={(e) => handleInputChange('vehicleValue', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹2 Lakhs</span>
                    <span className="font-semibold text-green-600">{formatCurrency(inputs.vehicleValue)}</span>
                    <span>₹50 Lakhs</span>
                  </div>
                </div>

                {/* Engine Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Engine Capacity (CC)
                  </label>
                  <input
                    type="range"
                    min="800"
                    max="3000"
                    step="100"
                    value={inputs.engineCapacity}
                    onChange={(e) => handleInputChange('engineCapacity', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>800 CC</span>
                    <span className="font-semibold text-green-600">{inputs.engineCapacity} CC</span>
                    <span>3000 CC</span>
                  </div>
                </div>

                {/* Previous Claims */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Claims (Last 3 Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={inputs.previousClaims}
                    onChange={(e) => handleInputChange('previousClaims', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* No Claim Bonus */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No Claim Bonus (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={inputs.noClaimBonus}
                    onChange={(e) => handleInputChange('noClaimBonus', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0%</span>
                    <span className="font-semibold text-green-600">{inputs.noClaimBonus}%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Voluntary Deductible */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voluntary Deductible (₹)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={inputs.voluntaryDeductible}
                    onChange={(e) => handleInputChange('voluntaryDeductible', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹0</span>
                    <span className="font-semibold text-green-600">{formatCurrency(inputs.voluntaryDeductible)}</span>
                    <span>₹50,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div ref={resultsRef} className="space-y-6">
              {/* Provider Comparison */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                    Provider Comparison
                  </h3>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
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
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(provider.premium)}
                          </div>
                          <div className="text-sm text-gray-500">per year</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {provider.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coverage Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  Coverage Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Vehicle Type</span>
                    <span className="font-semibold text-blue-600 capitalize">{inputs.vehicleType}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Coverage Type</span>
                    <span className="font-semibold text-green-600 capitalize">{inputs.coverageType}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Vehicle Age</span>
                    <span className="font-semibold text-purple-600">{inputs.vehicleAge} years</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">No Claim Bonus</span>
                    <span className="font-semibold text-orange-600">{inputs.noClaimBonus}%</span>
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
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Premium estimates are approximate and may vary by provider
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Third-party insurance is mandatory as per Motor Vehicles Act
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Comprehensive coverage includes own damage and third-party liability
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    No Claim Bonus can significantly reduce your premium
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Car Insurance in India</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Car insurance in India is mandatory as per the Motor Vehicles Act, 1988. Understanding the different types 
                of coverage and factors affecting premiums helps you make informed decisions about your vehicle insurance. 
                For comprehensive insurance planning, explore our 
                <RouterLink to="/insurance-tools" className="text-blue-600 hover:text-blue-800 underline">complete suite of insurance tools</RouterLink>.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Car Insurance Coverage:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Third Party Insurance:</strong> Mandatory coverage for damage to third parties and their property</li>
                <li><strong>Comprehensive Insurance:</strong> Covers both third-party liability and own damage to your vehicle</li>
                <li><strong>Zero Depreciation:</strong> Covers the full cost of repairs without depreciation deduction</li>
                <li><strong>Engine Protection:</strong> Additional cover for engine damage due to water ingress or oil leakage</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Factors Affecting Car Insurance Premiums:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Vehicle Type:</strong> Luxury cars and SUVs have higher premiums than hatchbacks</li>
                <li><strong>Vehicle Age:</strong> Older vehicles generally have higher premiums due to increased risk</li>
                <li><strong>Location:</strong> Metro cities have higher premiums due to higher accident rates and repair costs</li>
                <li><strong>Engine Capacity:</strong> Higher engine capacity vehicles have higher premiums</li>
                <li><strong>Previous Claims:</strong> History of claims increases premium rates</li>
                <li><strong>No Claim Bonus:</strong> Discount for claim-free years, up to 50%</li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Related Insurance Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <RouterLink to="/insurance-tools/two-wheeler-tracker" className="text-green-600 hover:text-green-800 underline">Two-Wheeler Insurance Tracker</RouterLink>
                  <RouterLink to="/insurance-tools/home-insurance-estimator" className="text-green-600 hover:text-green-800 underline">Home Insurance Estimator</RouterLink>
                  <RouterLink to="/insurance-tools/portfolio-dashboard" className="text-green-600 hover:text-green-800 underline">Insurance Portfolio Dashboard</RouterLink>
                  <RouterLink to="/insurance-tools/life-insurance-calculator" className="text-green-600 hover:text-green-800 underline">Life Insurance Calculator</RouterLink>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tips for Lower Car Insurance Premiums:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain a good driving record and avoid claims</li>
                <li>Choose a higher voluntary deductible to reduce premium</li>
                <li>Install anti-theft devices for additional discounts</li>
                <li>Compare quotes from multiple insurance providers</li>
                <li>Consider add-on covers based on your specific needs</li>
                <li>Renew your policy on time to maintain No Claim Bonus</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarInsuranceCalculator;
