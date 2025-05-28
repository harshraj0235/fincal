import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, DollarSign, PieChart, FileText, Award, Shield, Building, Search, CreditCard, AlertTriangle, Home, HelpCircle, Target, MessageSquare } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { CategorySection } from '../components/CategorySection';

export const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const govtSchemesRef = useRef<HTMLDivElement | null>(null);
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const [showToolsModal, setShowToolsModal] = useState<boolean>(false);
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const categoryId = location.hash.substring(1);
      
      if (categoryId === 'govt-schemes' && govtSchemesRef.current) {
        // Scroll to government schemes section
        setTimeout(() => {
          govtSchemesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else if (categoryId === 'tools' && toolsRef.current) {
        // Scroll to tools section
        setTimeout(() => {
          toolsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        const element = categoryRefs.current[categoryId];
        
        if (element) {
          // Scroll to the category with a small delay to ensure rendering is complete
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    }
  }, [location]);

  const openToolModal = (toolId: string) => {
    setActiveToolModal(toolId);
    setShowToolsModal(true);
  };

  const closeToolModal = () => {
    setShowToolsModal(false);
    setActiveToolModal(null);
  };

  const renderToolContent = () => {
    switch (activeToolModal) {
      case 'emi-calculator':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Loan EMI Calculator</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Loan Amount (₹)</label>
                <input type="number" className="input" placeholder="Enter loan amount" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Interest Rate (%)</label>
                <input type="number" className="input" placeholder="Enter interest rate" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Loan Tenure (Years)</label>
                <input type="number" className="input" placeholder="Enter loan tenure" />
              </div>
              <button className="btn btn-primary w-full">Calculate EMI</button>
              <div className="mt-4">
                <Link to="/calculators/emi-calculator" className="text-primary-600 hover:text-primary-700 font-medium">
                  Use Advanced EMI Calculator →
                </Link>
              </div>
            </div>
          </div>
        );
      case 'cibil-score':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">CIBIL Score Explanation</h3>
            <div className="space-y-4">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What is CIBIL Score?</h4>
                <p className="text-sm text-neutral-600">
                  A CIBIL Score is a three-digit number between 300 and 900 that represents your creditworthiness. 
                  The higher the score, the better your chances of loan approval.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="ml-2 text-sm">300-549</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="ml-2 text-sm">550-649</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div className="bg-yellow-300 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="ml-2 text-sm">650-699</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div className="bg-green-300 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="ml-2 text-sm">700-749</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="ml-2 text-sm">750-900</span>
                </div>
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Factors Affecting CIBIL Score</h4>
                <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                  <li>Payment History (35%)</li>
                  <li>Credit Utilization (30%)</li>
                  <li>Credit Age (15%)</li>
                  <li>Credit Mix (10%)</li>
                  <li>New Credit Inquiries (10%)</li>
                </ul>
              </div>
              
              <a href="https://www.cibil.com/freecibilscore" target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                Check Your CIBIL Score for Free
              </a>
            </div>
          </div>
        );
      case 'rera-search':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">RERA Builder Search</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Select State</label>
                <select className="input">
                  <option value="">Select State</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="tamil-nadu">Tamil Nadu</option>
                  <option value="delhi">Delhi</option>
                  <option value="uttar-pradesh">Uttar Pradesh</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="haryana">Haryana</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Search by</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="search-type" className="mr-2" defaultChecked />
                    <span>Project Name</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="search-type" className="mr-2" />
                    <span>Builder Name</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="search-type" className="mr-2" />
                    <span>RERA Number</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Enter Search Term</label>
                <input type="text" className="input" placeholder="Enter project/builder name or RERA number" />
              </div>
              
              <button className="btn btn-primary w-full">Search RERA Database</button>
              
              <div className="bg-neutral-50 p-4 rounded-lg text-sm text-neutral-600">
                <p className="font-medium text-neutral-700 mb-2">Why check RERA registration?</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ensures the project is legally registered</li>
                  <li>Protects buyer rights and investments</li>
                  <li>Guarantees transparency in property transactions</li>
                  <li>Provides recourse in case of disputes</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'fraud-reporting':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Financial Fraud Reporting</h3>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium">Report Financial Fraud Immediately</h4>
                    <p className="text-xs mt-1">
                      If you've been a victim of financial fraud, report it immediately to minimize damage.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Type of Fraud</label>
                <select className="input">
                  <option value="">Select Fraud Type</option>
                  <option value="upi">UPI Fraud</option>
                  <option value="credit-card">Credit/Debit Card Fraud</option>
                  <option value="phishing">Phishing Attack</option>
                  <option value="investment">Investment Fraud</option>
                  <option value="loan">Loan Fraud</option>
                  <option value="kyc">KYC Fraud</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Bank/Financial Institution</label>
                  <input type="text" className="input" placeholder="Enter bank name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Amount (₹)</label>
                  <input type="number" className="input" placeholder="Enter amount" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Fraud Details</label>
                <textarea className="input" rows={3} placeholder="Describe what happened"></textarea>
              </div>
              
              <button className="btn bg-red-600 hover:bg-red-700 text-white w-full">Report Fraud</button>
              
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Important Helplines</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>National Cyber Crime Helpline</span>
                    <a href="tel:1930" className="font-medium text-primary-600">1930</a>
                  </li>
                  <li className="flex justify-between">
                    <span>RBI Complaints</span>
                    <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="font-medium text-primary-600">cms.rbi.org.in</a>
                  </li>
                  <li className="flex justify-between">
                    <span>Banking Ombudsman</span>
                    <a href="tel:14448" className="font-medium text-primary-600">14448</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'savings-goal':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Savings Goal Planner</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Goal Name</label>
                <input type="text" className="input" placeholder="e.g., Home Down Payment, Vacation" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Target Amount (₹)</label>
                <input type="number" className="input" placeholder="Enter target amount" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Timeline (Months)</label>
                <input type="number" className="input" placeholder="Enter number of months" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Current Savings (₹)</label>
                <input type="number" className="input" placeholder="Enter current savings" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Expected Annual Return (%)</label>
                <input type="number" className="input" placeholder="Enter expected return" defaultValue="7" />
              </div>
              
              <button className="btn btn-primary w-full">Calculate Monthly Savings</button>
              
              <div className="mt-4">
                <Link to="/calculators/financial-goal-calculator" className="text-primary-600 hover:text-primary-700 font-medium">
                  Use Advanced Goal Planner →
                </Link>
              </div>
            </div>
          </div>
        );
      case 'bank-helpline':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Bank Helpline Directory</h3>
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    className="input pl-10"
                    placeholder="Search for a bank..."
                  />
                </div>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                <div className="bg-white p-3 rounded-lg border border-neutral-200">
                  <h4 className="font-medium">State Bank of India</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-neutral-500">Customer Care</p>
                      <a href="tel:1800112211" className="text-primary-600 font-medium">1800-11-2211</a>
                    </div>
                    <div>
                      <p className="text-neutral-500">Card Blocking</p>
                      <a href="tel:18001234" className="text-primary-600 font-medium">1800-1234</a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-neutral-200">
                  <h4 className="font-medium">HDFC Bank</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-neutral-500">Customer Care</p>
                      <a href="tel:18002026161" className="text-primary-600 font-medium">1800-202-6161</a>
                    </div>
                    <div>
                      <p className="text-neutral-500">Card Blocking</p>
                      <a href="tel:18002586161" className="text-primary-600 font-medium">1800-258-6161</a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-neutral-200">
                  <h4 className="font-medium">ICICI Bank</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-neutral-500">Customer Care</p>
                      <a href="tel:18001080" className="text-primary-600 font-medium">1800-1080</a>
                    </div>
                    <div>
                      <p className="text-neutral-500">Card Blocking</p>
                      <a href="tel:18001860" className="text-primary-600 font-medium">1800-1860</a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-neutral-200">
                  <h4 className="font-medium">Axis Bank</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-neutral-500">Customer Care</p>
                      <a href="tel:18605505555" className="text-primary-600 font-medium">1860-550-5555</a>
                    </div>
                    <div>
                      <p className="text-neutral-500">Card Blocking</p>
                      <a href="tel:18605005555" className="text-primary-600 font-medium">1860-500-5555</a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-neutral-200">
                  <h4 className="font-medium">Kotak Mahindra Bank</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-neutral-500">Customer Care</p>
                      <a href="tel:18602662666" className="text-primary-600 font-medium">1860-266-2666</a>
                    </div>
                    <div>
                      <p className="text-neutral-500">Card Blocking</p>
                      <a href="tel:18602662666" className="text-primary-600 font-medium">1860-266-2666</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg text-sm">
                <p className="font-medium text-neutral-700 mb-2">Important RBI Helplines</p>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>RBI Complaints Management System</span>
                    <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-primary-600 font-medium">cms.rbi.org.in</a>
                  </li>
                  <li className="flex justify-between">
                    <span>Banking Ombudsman</span>
                    <a href="tel:14448" className="text-primary-600 font-medium">14448</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'chatbot':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Financial Assistant</h3>
            <div className="bg-neutral-50 rounded-lg p-4 h-80 overflow-y-auto mb-4 flex flex-col">
              <div className="bg-primary-100 text-primary-800 p-3 rounded-lg self-start mb-3 max-w-[80%]">
                <p>Hello! I'm your financial assistant. How can I help you today?</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg self-end mb-3 max-w-[80%] border border-neutral-200">
                <p>I want to know about tax saving investments</p>
              </div>
              
              <div className="bg-primary-100 text-primary-800 p-3 rounded-lg self-start mb-3 max-w-[80%]">
                <p>Great question! Here are some popular tax-saving investment options in India:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>PPF (Public Provident Fund)</li>
                  <li>ELSS (Equity Linked Saving Scheme)</li>
                  <li>Tax-saving FDs (Fixed Deposits)</li>
                  <li>National Pension System (NPS)</li>
                  <li>Sukanya Samriddhi Yojana (for girl child)</li>
                </ul>
                <p className="mt-2">Would you like more details about any specific option?</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg self-end mb-3 max-w-[80%] border border-neutral-200">
                <p>Tell me more about ELSS</p>
              </div>
              
              <div className="bg-primary-100 text-primary-800 p-3 rounded-lg self-start max-w-[80%]">
                <p>ELSS (Equity Linked Saving Scheme) is a type of mutual fund that invests primarily in equity and equity-related products. Key features:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Tax deduction up to ₹1.5 lakh under Section 80C</li>
                  <li>Shortest lock-in period (3 years) among tax-saving instruments</li>
                  <li>Potential for higher returns compared to traditional options</li>
                  <li>SIP option available for disciplined investing</li>
                </ul>
                <p className="mt-2">Would you like to calculate potential returns using our SIP calculator?</p>
              </div>
            </div>
            
            <div className="flex">
              <input type="text" className="input flex-grow" placeholder="Type your question here..." />
              <button className="btn btn-primary ml-2">Send</button>
            </div>
            
            <div className="mt-4 text-sm text-neutral-500">
              <p>Try asking about:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-neutral-100 px-2 py-1 rounded-full text-xs">Tax saving options</span>
                <span className="bg-neutral-100 px-2 py-1 rounded-full text-xs">Loan eligibility</span>
                <span className="bg-neutral-100 px-2 py-1 rounded-full text-xs">Investment advice</span>
                <span className="bg-neutral-100 px-2 py-1 rounded-full text-xs">Government schemes</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white text-neutral-900 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              India's Most Comprehensive Financial Calculator Suite
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-neutral-600">
              50+ calculators tailored for Indian financial needs - from EMI and taxes to investments and retirement planning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculators/emi-calculator" className="btn bg-[--primary-600] text-white hover:bg-[--primary-700]">
                EMI Calculator
              </Link>
              <Link to="/calculators/sip-calculator" className="btn bg-white text-[--primary-800] border border-[--primary-200] hover:bg-neutral-50">
                SIP Calculator
              </Link>
              <Link to="#govt-schemes" className="btn bg-[--success-600] text-white hover:bg-[--success-700]">
                Government Schemes
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Calculators */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">Most Popular Calculators</h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Our most used financial tools that help thousands of Indians make better financial decisions every day
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                id: 'emi-calculator',
                name: 'EMI Calculator',
                description: 'Calculate your monthly loan payments',
                icon: <Calculator className="h-6 w-6 text-[--primary-600]" />
              },
              {
                id: 'sip-calculator',
                name: 'SIP Calculator',
                description: 'Plan your investment returns over time',
                icon: <TrendingUp className="h-6 w-6 text-[--primary-600]" />
              },
              {
                id: 'income-tax-calculator',
                name: 'Income Tax Calculator',
                description: 'Estimate your income tax liability',
                icon: <DollarSign className="h-6 w-6 text-[--primary-600]" />
              },
              {
                id: 'ppf-calculator',
                name: 'PPF Calculator',
                description: 'Project your PPF account growth',
                icon: <PieChart className="h-6 w-6 text-[--primary-600]" />
              }
            ].map(calculator => (
              <Link 
                key={calculator.id}
                to={`/calculators/${calculator.id}`} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="rounded-full bg-[--primary-50] p-4 mb-4">
                  {calculator.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{calculator.name}</h3>
                <p className="text-neutral-600">{calculator.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Tools Section */}
      <section 
        id="tools" 
        ref={toolsRef}
        className="py-12 sm:py-16 bg-gradient-to-r from-[--primary-50] to-[--secondary-50]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">Essential Financial Tools</h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Specialized tools to help you navigate the complex financial landscape in India
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* EMI Calculator Tool */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="p-1 bg-gradient-to-r from-[--primary-500] to-[--primary-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--primary-100] p-3 mr-4">
                    <Calculator className="h-6 w-6 text-[--primary-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Loan EMI Calculator</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Calculate your monthly loan installments instantly. Plan your budget with accurate EMI estimates for home, car, personal, and business loans.
                </p>
                <button 
                  onClick={() => openToolModal('emi-calculator')}
                  className="btn bg-[--primary-600] text-white hover:bg-[--primary-700] w-full"
                >
                  Calculate EMI
                </button>
              </div>
            </div>
            
            {/* CIBIL Score Tool */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="p-1 bg-gradient-to-r from-[--success-500] to-[--success-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--success-100] p-3 mr-4">
                    <CreditCard className="h-6 w-6 text-[--success-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">CIBIL Score Explanation</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Understand what your credit score means and how it affects your loan eligibility. Learn how to improve your score for better financial opportunities.
                </p>
                <button 
                  onClick={() => openToolModal('cibil-score')}
                  className="btn bg-[--success-600] text-white hover:bg-[--success-700] w-full"
                >
                  Understand CIBIL Score
                </button>
              </div>
            </div>
            
            {/* RERA Search Tool */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="p-1 bg-gradient-to-r from-[--accent-500] to-[--accent-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--accent-100] p-3 mr-4">
                    <Home className="h-6 w-6 text-[--accent-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">RERA Builder Search</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Verify builder credentials and project approvals before investing in property. Access RERA registration details across different states in India.
                </p>
                <button 
                  onClick={() => openToolModal('rera-search')}
                  className="btn bg-[--accent-600] text-white hover:bg-[--accent-700] w-full"
                >
                  Search RERA Database
                </button>
              </div>
            </div>
            
            {/* Fraud Reporting Tool */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="p-1 bg-gradient-to-r from-[--error-500] to-[--error-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--error-100] p-3 mr-4">
                    <AlertTriangle className="h-6 w-6 text-[--error-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Fraud Reporting</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Quick access to report financial fraud and scams. Get guidance on immediate steps to take if you've been a victim of financial fraud.
                </p>
                <button 
                  onClick={() => openToolModal('fraud-reporting')}
                  className="btn bg-[--error-600] text-white hover:bg-[--error-700] w-full"
                >
                  Report Financial Fraud
                </button>
              </div>
            </div>
            
            {/* Savings Goal Planner */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="p-1 bg-gradient-to-r from-[--primary-500] to-[--secondary-500]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--secondary-100] p-3 mr-4">
                    <Target className="h-6 w-6 text-[--secondary-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Savings Goal Planner</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Set financial goals and create a savings plan to achieve them. Calculate how much you need to save monthly to reach your target amount.
                </p>
                <button 
                  onClick={() => openToolModal('savings-goal')}
                  className="btn bg-[--secondary-600] text-white hover:bg-[--secondary-700] w-full"
                >
                  Plan Your Savings
                </button>
              </div>
            </div>
            
            {/* Bank Helpline Directory */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="p-1 bg-gradient-to-r from-[--primary-500] to-[--primary-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--primary-100] p-3 mr-4">
                    <HelpCircle className="h-6 w-6 text-[--primary-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Bank Helpline Directory</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Quick access to customer care numbers and helplines for all major banks in India. Find the right contact for your banking needs.
                </p>
                <button 
                  onClick={() => openToolModal('bank-helpline')}
                  className="btn bg-[--primary-600] text-white hover:bg-[--primary-700] w-full"
                >
                  Find Bank Helplines
                </button>
              </div>
            </div>
            
            {/* Interactive Chatbot */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 lg:col-span-3">
              <div className="p-1 bg-gradient-to-r from-[--accent-500] to-[--primary-500]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--accent-100] p-3 mr-4">
                    <MessageSquare className="h-6 w-6 text-[--accent-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Interactive Financial Assistant</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Get instant answers to your financial questions. Our AI-powered assistant can help with basic financial concepts, calculator guidance, and general financial advice.
                </p>
                <div className="flex justify-center">
                  <button 
                    onClick={() => openToolModal('chatbot')}
                    className="btn bg-[--accent-600] text-white hover:bg-[--accent-700] px-8"
                  >
                    Chat with Financial Assistant
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-neutral-600 mb-4">
              These tools are designed to help you make informed financial decisions. For more detailed calculations, explore our comprehensive calculator suite.
            </p>
            <Link to="/#" className="inline-flex items-center text-[--primary-600] hover:text-[--primary-700] font-medium">
              Explore All Calculators
            </Link>
          </div>
        </div>
      </section>
      
      {/* Government Schemes Section */}
      <section 
        id="govt-schemes" 
        ref={govtSchemesRef}
        className="py-12 sm:py-16 bg-gradient-to-r from-[--success-50] to-[--primary-50]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">Government Schemes for Indians</h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore various government schemes designed to provide financial security and benefits to Indian citizens
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Investment & Savings Schemes */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--primary-500] to-[--primary-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--primary-100] p-3 mr-4">
                    <PieChart className="h-6 w-6 text-[--primary-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Investment & Savings</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Public Provident Fund (PPF)</p>
                      <p className="text-sm text-neutral-600">Long-term savings with tax benefits under Section 80C</p>
                      <Link to="/calculators/ppf-calculator" className="text-xs text-[--primary-600] font-medium hover:underline">Calculate Returns →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Sukanya Samriddhi Yojana</p>
                      <p className="text-sm text-neutral-600">Savings scheme for girl child with high interest rates</p>
                      <Link to="/calculators/sukanya-samriddhi-calculator" className="text-xs text-[--primary-600] font-medium hover:underline">Calculate Returns →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">National Pension System (NPS)</p>
                      <p className="text-sm text-neutral-600">Voluntary retirement savings scheme with tax benefits</p>
                      <Link to="/calculators/nps-calculator" className="text-xs text-[--primary-600] font-medium hover:underline">Calculate Returns →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Kisan Vikas Patra (KVP)</p>
                      <p className="text-sm text-neutral-600">Investment scheme that doubles your money in about 10 years</p>
                      <Link to="/calculators/post-office-schemes-calculator" className="text-xs text-[--primary-600] font-medium hover:underline">Calculate Returns →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Insurance & Social Security */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--success-500] to-[--success-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--success-100] p-3 mr-4">
                    <Shield className="h-6 w-6 text-[--success-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Insurance & Social Security</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Pradhan Mantri Jeevan Jyoti Bima Yojana</p>
                      <p className="text-sm text-neutral-600">Life insurance coverage of ₹2 lakh at just ₹330 per year</p>
                      <Link to="/calculators/term-insurance-calculator" className="text-xs text-[--success-600] font-medium hover:underline">Compare with Term Insurance →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Pradhan Mantri Suraksha Bima Yojana</p>
                      <p className="text-sm text-neutral-600">Accidental death coverage of ₹2 lakh at just ₹12 per year</p>
                      <Link to="/calculators/human-life-value-calculator" className="text-xs text-[--success-600] font-medium hover:underline">Calculate Coverage Needs →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Atal Pension Yojana</p>
                      <p className="text-sm text-neutral-600">Guaranteed pension of ₹1,000 to ₹5,000 per month after 60</p>
                      <Link to="/calculators/pension-calculator" className="text-xs text-[--success-600] font-medium hover:underline">Calculate Pension →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Ayushman Bharat</p>
                      <p className="text-sm text-neutral-600">Health insurance coverage up to ₹5 lakh per family per year</p>
                      <Link to="/calculators/health-insurance-calculator" className="text-xs text-[--success-600] font-medium hover:underline">Calculate Health Insurance →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Business & Employment */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--accent-500] to-[--accent-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--accent-100] p-3 mr-4">
                    <Building className="h-6 w-6 text-[--accent-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Business & Employment</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Pradhan Mantri Mudra Yojana</p>
                      <p className="text-sm text-neutral-600">Loans up to ₹10 lakh for small businesses without collateral</p>
                      <Link to="/calculators/business-loan-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Calculate Business Loan EMI →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Stand-Up India</p>
                      <p className="text-sm text-neutral-600">Loans from ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs</p>
                      <Link to="/calculators/loan-affordability-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Calculate Loan Affordability →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">PM-KISAN</p>
                      <p className="text-sm text-neutral-600">Direct income support of ₹6,000 per year to farmer families</p>
                      <Link to="/calculators/financial-goal-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Plan Financial Goals →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">MGNREGA</p>
                      <p className="text-sm text-neutral-600">Guarantees 100 days of wage employment in rural areas</p>
                      <Link to="/calculators/budget-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Create Budget Plan →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Housing & Property */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--primary-500] to-[--secondary-500]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--secondary-100] p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[--secondary-600]">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Housing & Property</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--secondary-100] text-[--secondary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Pradhan Mantri Awas Yojana (PMAY)</p>
                      <p className="text-sm text-neutral-600">Housing subsidy up to ₹2.67 lakh for affordable housing</p>
                      <Link to="/calculators/home-loan-calculator" className="text-xs text-[--secondary-600] font-medium hover:underline">Calculate Home Loan EMI →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--secondary-100] text-[--secondary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">CLSS for MIG</p>
                      <p className="text-sm text-neutral-600">Interest subsidy for middle income groups on home loans</p>
                      <Link to="/calculators/loan-affordability-calculator" className="text-xs text-[--secondary-600] font-medium hover:underline">Check Loan Affordability →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--secondary-100] text-[--secondary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">RERA Protection</p>
                      <p className="text-sm text-neutral-600">Regulatory framework to protect homebuyers' interests</p>
                      <Link to="/calculators/property-registration-calculator" className="text-xs text-[--secondary-600] font-medium hover:underline">Calculate Registration Costs →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Education & Skill Development */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--error-500] to-[--error-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--error-100] p-3 mr-4">
                    <FileText className="h-6 w-6 text-[--error-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Education & Skills</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--error-100] text-[--error-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Vidya Lakshmi Portal</p>
                      <p className="text-sm text-neutral-600">Single window for education loans from multiple banks</p>
                      <Link to="/calculators/emi-calculator" className="text-xs text-[--error-600] font-medium hover:underline">Calculate Education Loan EMI →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--error-100] text-[--error-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">PM Kaushal Vikas Yojana</p>
                      <p className="text-sm text-neutral-600">Free skill training for youth with certification and monetary reward</p>
                      <Link to="/calculators/financial-goal-calculator" className="text-xs text-[--error-600] font-medium hover:underline">Plan Career Goals →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--error-100] text-[--error-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">National Scholarship Portal</p>
                      <p className="text-sm text-neutral-600">Single platform for all scholarship schemes across ministries</p>
                      <Link to="/calculators/compound-interest-calculator" className="text-xs text-[--error-600] font-medium hover:underline">Calculate Education Fund →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Tax Benefits & Subsidies */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--accent-500] to-[--primary-500]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--accent-100] p-3 mr-4">
                    <Award className="h-6 w-6 text-[--accent-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Tax Benefits & Subsidies</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Section 80C Deductions</p>
                      <p className="text-sm text-neutral-600">Tax benefits up to ₹1.5 lakh on various investments</p>
                      <Link to="/calculators/section-80c-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Calculate Tax Savings →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">LPG Subsidy</p>
                      <p className="text-sm text-neutral-600">Direct benefit transfer for LPG cylinder subsidies</p>
                      <Link to="/calculators/budget-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Plan Monthly Budget →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Electricity Subsidies</p>
                      <p className="text-sm text-neutral-600">State-specific subsidies for electricity consumption</p>
                      <Link to="/calculators/tax-saving-investment-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Plan Tax Savings →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/blog" className="inline-flex items-center text-[--primary-600] hover:text-[--primary-700] font-medium">
              <FileText className="h-5 w-5 mr-2" />
              Read our detailed guides on government schemes
            </Link>
          </div>
        </div>
      </section>
      
      {/* Category Section */}
      <CategorySection />
      
      {/* Categories */}
      {calculatorCategories.map((category, index) => (
        <section 
          key={category.id}
          id={category.id}
          ref={el => categoryRefs.current[category.id] = el}
          className="py-12 sm:py-16 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">{category.name}</h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {category.calculators.map(calculator => (
                <Link 
                  key={calculator.id}
                  to={`/calculators/${calculator.id}`} 
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{calculator.name}</h3>
                  <p className="text-neutral-600 mb-4">{calculator.description}</p>
                  <div className="text-[--primary-600] font-medium flex items-center">
                    Use Calculator
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-neutral-900">Ready to make informed financial decisions?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-neutral-600">
            Our calculators help you plan loans, investments, taxes, and more with precision and ease.
          </p>
          <Link 
            to="/calculators/financial-goal-calculator" 
            className="btn bg-[--primary-600] text-white hover:bg-[--primary-700] text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3"
          >
            Plan Your Financial Goals
          </Link>
        </div>
      </section>

      {/* Tools Modal */}
      {showToolsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="text-lg font-semibold text-neutral-900">Financial Tool</div>
              <button 
                onClick={closeToolModal}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
              {renderToolContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};