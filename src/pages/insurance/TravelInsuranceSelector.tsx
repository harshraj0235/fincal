import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plane, Calculator, MapPin, Shield, AlertCircle, Globe, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

export const TravelInsuranceSelector: React.FC = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    tripType: 'international',
    destination: 'europe',
    duration: 7,
    travelers: 1,
    age: 30,
    coverage: 'comprehensive',
    activities: ['general']
  });

  const [results, setResults] = useState({
    recommendedPlans: [],
    totalCost: 0,
    coverageDetails: {}
  });

  const destinations = {
    domestic: [
      { name: 'North India', factor: 1.0, risk: 'low' },
      { name: 'South India', factor: 1.0, risk: 'low' },
      { name: 'East India', factor: 1.0, risk: 'low' },
      { name: 'West India', factor: 1.0, risk: 'low' },
      { name: 'Northeast India', factor: 1.2, risk: 'medium' }
    ],
    international: [
      { name: 'Europe', factor: 1.5, risk: 'medium' },
      { name: 'USA/Canada', factor: 2.0, risk: 'high' },
      { name: 'Southeast Asia', factor: 1.2, risk: 'low' },
      { name: 'Middle East', factor: 1.3, risk: 'medium' },
      { name: 'Australia/NZ', factor: 1.8, risk: 'medium' },
      { name: 'Africa', factor: 1.4, risk: 'high' }
    ]
  };

  const insurancePlans = [
    {
      name: 'Basic Plan',
      basePrice: 500,
      coverage: {
        medical: 100000,
        tripCancellation: 50000,
        baggage: 25000,
        personalAccident: 200000
      },
      features: ['Emergency Medical', 'Trip Cancellation', 'Baggage Loss']
    },
    {
      name: 'Standard Plan',
      basePrice: 800,
      coverage: {
        medical: 200000,
        tripCancellation: 100000,
        baggage: 50000,
        personalAccident: 500000
      },
      features: ['Emergency Medical', 'Trip Cancellation', 'Baggage Loss', 'Personal Accident']
    },
    {
      name: 'Comprehensive Plan',
      basePrice: 1200,
      coverage: {
        medical: 500000,
        tripCancellation: 200000,
        baggage: 100000,
        personalAccident: 1000000
      },
      features: ['Emergency Medical', 'Trip Cancellation', 'Baggage Loss', 'Personal Accident', 'Adventure Sports']
    }
  ];

  const calculateTravelInsurance = () => {
    const { tripType, destination, duration, travelers, age, coverage, activities } = inputs;
    
    // Get destination factor
    const destData = destinations[tripType as keyof typeof destinations].find(d => d.name.toLowerCase().includes(destination.toLowerCase()));
    const destinationFactor = destData?.factor || 1.0;
    
    // Get base plan
    const plan = insurancePlans.find(p => p.name.toLowerCase().includes(coverage.toLowerCase())) || insurancePlans[0];
    
    // Calculate base cost
    let baseCost = plan.basePrice * destinationFactor;
    
    // Duration factor (per day)
    const durationFactor = Math.max(1, duration / 7);
    baseCost *= durationFactor;
    
    // Age factor
    const ageFactor = age > 60 ? 1.5 : age > 50 ? 1.2 : 1.0;
    baseCost *= ageFactor;
    
    // Activities factor
    const activityFactor = activities.includes('adventure') ? 1.5 : 1.0;
    baseCost *= activityFactor;
    
    // Total cost for all travelers
    const totalCost = baseCost * travelers;
    
    // Generate recommended plans
    const recommendedPlans = insurancePlans.map(plan => {
      let planCost = plan.basePrice * destinationFactor * durationFactor * ageFactor * activityFactor * travelers;
      return {
        ...plan,
        cost: planCost,
        costPerPerson: planCost / travelers
      };
    });
    
    setResults({
      recommendedPlans,
      totalCost,
      coverageDetails: plan.coverage
    });
  };

  useEffect(() => {
    calculateTravelInsurance();
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

  return (
    <>
      <SEOHelmet
        title="Travel Insurance Selector - Best Travel Insurance Plans India | MoneyCal.in"
        description="Free travel insurance selector for India. Get personalized travel insurance recommendations for domestic and international trips with comprehensive coverage options."
        keywords="travel insurance selector India, best travel insurance for international trips, travel insurance calculator, domestic travel insurance"
        url="/insurance-tools/travel-insurance-selector"
        type="website"
        image="/images/travel-insurance-selector.jpg"
        tags={["travel insurance", "insurance selector", "travel planning", "international travel"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
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
              <Plane className="h-16 w-16 text-orange-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Travel Insurance Selector
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get personalized travel insurance recommendations for domestic and international trips. 
              Compare plans, calculate premiums, and find the best coverage for your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 text-orange-600 mr-2" />
                Trip Details
              </h2>
              
              <div className="space-y-6">
                {/* Trip Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleInputChange('tripType', 'domestic')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        inputs.tripType === 'domestic'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Home className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Domestic</div>
                    </button>
                    <button
                      onClick={() => handleInputChange('tripType', 'international')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        inputs.tripType === 'international'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Globe className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">International</div>
                    </button>
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <select
                    value={inputs.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {destinations[inputs.tripType as keyof typeof destinations].map((dest, index) => (
                      <option key={index} value={dest.name.toLowerCase()}>
                        {dest.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Duration (Days)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="90"
                    step="1"
                    value={inputs.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1 Day</span>
                    <span className="font-semibold text-orange-600">{inputs.duration} Days</span>
                    <span>90 Days</span>
                  </div>
                </div>

                {/* Number of Travelers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={inputs.travelers}
                    onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1 Person</span>
                    <span className="font-semibold text-orange-600">{inputs.travelers} {inputs.travelers === 1 ? 'Person' : 'People'}</span>
                    <span>10 People</span>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age of Primary Traveler
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="80"
                    step="1"
                    value={inputs.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>18 Years</span>
                    <span className="font-semibold text-orange-600">{inputs.age} Years</span>
                    <span>80 Years</span>
                  </div>
                </div>

                {/* Coverage Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coverage Level
                  </label>
                  <select
                    value={inputs.coverage}
                    onChange={(e) => handleInputChange('coverage', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="basic">Basic Coverage</option>
                    <option value="standard">Standard Coverage</option>
                    <option value="comprehensive">Comprehensive Coverage</option>
                  </select>
                </div>

                {/* Activities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Planned Activities
                  </label>
                  <div className="space-y-2">
                    {['general', 'adventure', 'business', 'medical'].map((activity) => (
                      <label key={activity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={inputs.activities.includes(activity)}
                          onChange={(e) => {
                            const newActivities = e.target.checked
                              ? [...inputs.activities, activity]
                              : inputs.activities.filter(a => a !== activity);
                            handleInputChange('activities', newActivities);
                          }}
                          className="mr-2"
                        />
                        <span className="capitalize">{activity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Cost Summary */}
              <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Shield className="h-6 w-6 mr-2" />
                  Estimated Cost
                </h2>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {formatCurrency(results.totalCost)}
                  </div>
                  <div className="text-orange-100">
                    Total for {inputs.travelers} {inputs.travelers === 1 ? 'traveler' : 'travelers'}
                  </div>
                  <div className="text-sm text-orange-200 mt-2">
                    {formatCurrency(results.totalCost / inputs.travelers)} per person
                  </div>
                </div>
              </div>

              {/* Recommended Plans */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-orange-600 mr-2" />
                  Recommended Plans
                </h3>
                <div className="space-y-4">
                  {results.recommendedPlans.map((plan, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                          <div className="text-sm text-gray-600">
                            {plan.features.join(' • ')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-orange-600">
                            {formatCurrency(plan.cost)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatCurrency(plan.costPerPerson)} per person
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Medical Coverage</div>
                          <div className="font-medium">{formatCurrency(plan.coverage.medical)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Trip Cancellation</div>
                          <div className="font-medium">{formatCurrency(plan.coverage.tripCancellation)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Baggage Loss</div>
                          <div className="font-medium">{formatCurrency(plan.coverage.baggage)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Personal Accident</div>
                          <div className="font-medium">{formatCurrency(plan.coverage.personalAccident)}</div>
                        </div>
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
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Premium estimates are approximate and may vary by provider
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Pre-existing medical conditions may require additional coverage
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Adventure sports coverage may require separate add-ons
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Compare policy terms and exclusions before purchasing
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Travel Insurance in India</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Travel insurance provides financial protection against unexpected events during your trip, 
                including medical emergencies, trip cancellations, lost baggage, and personal accidents. 
                It's essential for both domestic and international travel.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Travel Insurance:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Domestic Travel Insurance:</strong> Covers trips within India with lower premiums</li>
                <li><strong>International Travel Insurance:</strong> Essential for overseas travel with higher coverage limits</li>
                <li><strong>Single Trip:</strong> Covers one specific journey with defined dates</li>
                <li><strong>Annual Multi-Trip:</strong> Covers multiple trips throughout the year</li>
                <li><strong>Student Travel Insurance:</strong> Specialized coverage for students studying abroad</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Coverage Areas:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Medical Expenses:</strong> Emergency medical treatment and hospitalization</li>
                <li><strong>Trip Cancellation:</strong> Reimbursement for cancelled trips due to covered reasons</li>
                <li><strong>Baggage Loss:</strong> Compensation for lost, stolen, or damaged luggage</li>
                <li><strong>Personal Accident:</strong> Coverage for accidental death or disability</li>
                <li><strong>Emergency Evacuation:</strong> Medical evacuation to nearest suitable facility</li>
                <li><strong>Travel Delay:</strong> Compensation for flight delays and missed connections</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tips for Choosing Travel Insurance:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Buy insurance as soon as you book your trip for maximum coverage</li>
                <li>Ensure coverage limits are adequate for your destination's healthcare costs</li>
                <li>Check if adventure sports and activities are covered</li>
                <li>Review exclusions and pre-existing condition clauses</li>
                <li>Keep emergency contact numbers and policy details handy</li>
                <li>Consider annual policies if you travel frequently</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelInsuranceSelector;
