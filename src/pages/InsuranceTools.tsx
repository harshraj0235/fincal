import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Heart, Car, Plane, Home, Bike, Stethoscope, PieChart, TrendingUp, Calculator, Users, Award, Clock, Target, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const InsuranceTools: React.FC = () => {
  const navigate = useNavigate();

  const insuranceTools = [
    {
      id: 'life-insurance-calculator',
      title: 'Life Insurance Needs Calculator',
      description: 'Calculate the right amount of life insurance coverage based on your income, dependents, and financial goals using the Human Life Value method.',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      features: ['HLV Method', 'Income Analysis', 'Dependent Coverage', 'Tax Benefits'],
      link: '/insurance-tools/life-insurance-calculator',
      keywords: 'life insurance calculator India, how much life insurance do I need, life insurance needs calculator 2025'
    },
    {
      id: 'health-insurance-estimator',
      title: 'Health Insurance Premium Estimator',
      description: 'Compare health insurance premiums across top providers and find the best family health insurance plans with comprehensive coverage.',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      features: ['Provider Comparison', 'Family Coverage', 'Pre-existing Conditions', 'Section 80D Benefits'],
      link: '/insurance-tools/health-insurance-estimator',
      keywords: 'health insurance premium calculator India, family health insurance cost estimator, best health insurance calculator 2025'
    },
    {
      id: 'car-insurance-calculator',
      title: 'Car Insurance Cost Calculator',
      description: 'Calculate car insurance premiums based on vehicle type, age, location, and coverage type. Compare third-party and comprehensive plans.',
      icon: Car,
      color: 'from-green-500 to-green-600',
      features: ['Vehicle Type Analysis', 'Location-based Pricing', 'Coverage Comparison', 'Renewal Tracking'],
      link: '/insurance-tools/car-insurance-calculator',
      keywords: 'car insurance premium calculator India, vehicle insurance cost estimator, car insurance calculator 2025'
    },
    {
      id: 'term-insurance-planner',
      title: 'Term Insurance Planner',
      description: 'Find affordable term insurance plans based on your age, income, and coverage needs. Compare premiums across top providers.',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      features: ['Affordable Plans', 'Age-based Premiums', 'Provider Comparison', 'Coverage Optimization'],
      link: '/insurance-tools/term-insurance-planner',
      keywords: 'term insurance planner India, affordable term insurance calculator, best term insurance tool'
    },
    {
      id: 'travel-insurance-selector',
      title: 'Travel Insurance Selector',
      description: 'Get personalized travel insurance recommendations for domestic and international trips with comprehensive coverage options.',
      icon: Plane,
      color: 'from-orange-500 to-orange-600',
      features: ['Domestic & International', 'Trip Duration Analysis', 'Destination Coverage', 'Emergency Support'],
      link: '/insurance-tools/travel-insurance-selector',
      keywords: 'travel insurance selector India, best travel insurance for international trips, travel insurance calculator'
    },
    {
      id: 'home-insurance-estimator',
      title: 'Home Insurance Cost Estimator',
      description: 'Estimate home insurance premiums based on property value, location, and coverage type. Protect your biggest asset.',
      icon: Home,
      color: 'from-indigo-500 to-indigo-600',
      features: ['Property Value Analysis', 'Location-based Pricing', 'Structure & Contents', 'Natural Disaster Coverage'],
      link: '/insurance-tools/home-insurance-estimator',
      keywords: 'home insurance premium calculator India, property insurance cost estimator, home insurance tool 2025'
    },
    {
      id: 'two-wheeler-tracker',
      title: 'Two-Wheeler Insurance Tracker',
      description: 'Compare bike insurance quotes, track renewal dates, and manage your two-wheeler insurance portfolio efficiently.',
      icon: Bike,
      color: 'from-cyan-500 to-cyan-600',
      features: ['Bike Model Analysis', 'Renewal Reminders', 'Quote Comparison', 'Policy Management'],
      link: '/insurance-tools/two-wheeler-tracker',
      keywords: 'two-wheeler insurance calculator India, bike insurance renewal tracker, bike insurance cost tool'
    },
    {
      id: 'critical-illness-calculator',
      title: 'Critical Illness Cover Calculator',
      description: 'Determine the right critical illness coverage based on your medical history, income, and potential healthcare costs.',
      icon: Stethoscope,
      color: 'from-pink-500 to-pink-600',
      features: ['Medical History Analysis', 'Income-based Coverage', 'Healthcare Cost Estimation', 'Lump-sum Benefits'],
      link: '/insurance-tools/critical-illness-calculator',
      keywords: 'critical illness insurance calculator India, critical illness cover estimator, critical illness tool'
    },
    {
      id: 'portfolio-dashboard',
      title: 'Insurance Portfolio Dashboard',
      description: 'Visualize and manage all your insurance policies in one place. Track premiums, coverage, and renewal dates.',
      icon: PieChart,
      color: 'from-teal-500 to-teal-600',
      features: ['Policy Visualization', 'Premium Tracking', 'Renewal Alerts', 'Coverage Analysis'],
      link: '/insurance-tools/portfolio-dashboard',
      keywords: 'insurance portfolio tracker India, manage insurance policies online, insurance dashboard tool'
    },
    {
      id: 'ulip-calculator',
      title: 'ULIP Return Calculator',
      description: 'Estimate returns on Unit-Linked Insurance Plans based on investment amount, risk profile, and expected market performance.',
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
      features: ['Risk Profile Analysis', 'Return Projections', 'Premium Allocation', 'Market Performance'],
      link: '/insurance-tools/ulip-calculator',
      keywords: 'ULIP return calculator India, unit-linked insurance plan returns, ULIP calculator 2025'
    }
  ];

  const benefits = [
    {
      icon: Calculator,
      title: 'Free to Use',
      description: 'All insurance planning tools are completely free with no registration required'
    },
    {
      icon: Shield,
      title: 'IRDAI Compliant',
      description: 'All calculations follow IRDAI guidelines and Indian insurance regulations'
    },
    {
      icon: Users,
      title: 'Expert Designed',
      description: 'Tools created by insurance experts with years of industry experience'
    },
    {
      icon: Award,
      title: 'Accurate Results',
      description: 'Get precise calculations using proven formulas and real market data'
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Insurance Planning Tools - Free Insurance Calculators India | MoneyCal.in"
        description="Comprehensive suite of 10 free insurance planning tools for India. Calculate life insurance, health insurance, car insurance, and more. Compare premiums, find best plans, and manage your insurance portfolio."
        keywords="insurance planning tools India, free insurance calculators, life insurance calculator, health insurance calculator, car insurance calculator, term insurance planner, travel insurance selector, home insurance estimator, two-wheeler insurance tracker, critical illness calculator, insurance portfolio dashboard, ULIP calculator"
        url="/insurance-tools"
        type="website"
        image="/images/insurance-tools.jpg"
        tags={["insurance tools", "insurance calculator", "insurance planning", "life insurance", "health insurance", "car insurance"]}
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
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                Insurance Planning Tools
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Comprehensive suite of 10 free insurance planning tools designed for Indian users. Calculate premiums, 
              compare plans, and make informed insurance decisions with our expert-designed calculators.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">🛡️ 10 Free Tools</span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">📊 Expert Calculations</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">🇮🇳 India Focused</span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">⚡ Instant Results</span>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Insurance Tools?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Tools Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Insurance Planning Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insuranceTools.map((tool, index) => (
                <Link
                  key={index}
                  to={tool.link}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-1 block group"
                >
                  <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-800 transition-colors">
                    <span>Use Tool</span>
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Our Insurance Tools Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Input Your Details</h3>
                <p className="text-gray-600">
                  Enter your personal information, financial details, and insurance requirements using our intuitive forms.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Get Instant Calculations</h3>
                <p className="text-gray-600">
                  Our advanced algorithms process your inputs and provide accurate calculations using proven insurance formulas.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Make Informed Decisions</h3>
                <p className="text-gray-600">
                  Review detailed results, compare options, and make the best insurance decisions for your needs and budget.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Start Planning Your Insurance Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who have made better insurance decisions with our free tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/insurance-tools/life-insurance-calculator"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Calculate Life Insurance
              </Link>
              <Link 
                to="/insurance-tools/health-insurance-estimator"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Estimate Health Insurance
              </Link>
              <Link 
                to="/insurance-tools/portfolio-dashboard"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Manage Portfolio
              </Link>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Insurance Planning for India</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Our suite of 10 insurance planning tools is specifically designed for the Indian market, taking into account 
                IRDAI regulations, tax benefits under various sections of the Income Tax Act, and the unique needs of Indian families.
              </p>
              <p className="mb-4">
                Whether you're looking for life insurance to protect your family, health insurance to cover medical expenses, 
                or vehicle insurance to comply with legal requirements, our tools provide accurate calculations and comparisons 
                to help you make informed decisions.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Benefits of Our Insurance Tools:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Free Access:</strong> All tools are completely free to use with no registration required</li>
                <li><strong>IRDAI Compliant:</strong> All calculations follow Indian insurance regulations and guidelines</li>
                <li><strong>Tax Optimization:</strong> Consider tax benefits under Section 80C, 80D, and other relevant sections</li>
                <li><strong>Provider Comparison:</strong> Compare premiums and features across top Indian insurance providers</li>
                <li><strong>Expert Formulas:</strong> Use proven calculation methods like Human Life Value (HLV) for life insurance</li>
                <li><strong>Real-time Updates:</strong> Regular updates to reflect current market conditions and regulatory changes</li>
              </ul>
              <p className="mb-4">
                Our tools are designed to address the most common insurance planning challenges faced by Indian consumers, 
                from determining the right amount of life insurance coverage to comparing health insurance premiums across 
                different providers. Each tool provides detailed explanations, actionable insights, and visual representations 
                to help you understand your insurance needs better.
              </p>
              <p>
                Start using our insurance planning tools today to secure your family's financial future and make the most 
                of your insurance investments. All calculations are performed locally in your browser, ensuring complete 
                privacy and security of your personal information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsuranceTools;
