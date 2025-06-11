import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle, Calendar, FileText, AlertTriangle, Code, Database, Layout, Users, Search } from 'lucide-react';

export const CreditCardFinderRoadmap: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="mb-12">
        <div className="flex items-center mb-4">
          <CreditCard className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-neutral-900">Credit Card Finder & Score Estimator Roadmap</h1>
        </div>
        <p className="text-lg text-neutral-600">
          A comprehensive roadmap for building web tools to help Indian users find the best credit cards and estimate their credit scores.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-3 bg-indigo-600"></div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Credit Card Finder</h2>
            <p className="text-neutral-600 mb-6">
              A web tool that lets users search and compare the best credit cards in India based on rewards, fees, and eligibility.
            </p>
            
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Goal</h3>
                <p className="text-sm text-neutral-600">Help users find the most suitable credit card based on their spending patterns and preferences</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Timeline</h3>
                <p className="text-sm text-neutral-600">Estimated 8-10 weeks for development and testing</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <Code className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Tech Stack</h3>
                <p className="text-sm text-neutral-600">HTML, CSS, JavaScript (client-side only)</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-3 bg-purple-600"></div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Credit Score Estimator</h2>
            <p className="text-neutral-600 mb-6">
              A web tool where users input financial data to estimate their credit score and get improvement tips.
            </p>
            
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Goal</h3>
                <p className="text-sm text-neutral-600">Help users understand their credit score and provide actionable improvement tips</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Timeline</h3>
                <p className="text-sm text-neutral-600">Estimated 6-8 weeks for development and testing</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Code className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Tech Stack</h3>
                <p className="text-sm text-neutral-600">HTML, CSS, JavaScript (client-side only)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Credit Card Finder Roadmap</h2>
        
        <div className="space-y-8">
          <div className="relative pl-8 pb-8 border-l-2 border-indigo-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">1</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Market & Data Research</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Gather a comprehensive list of credit cards from major Indian banks (HDFC, SBI, ICICI, Axis, etc.) and fintech platforms.</p>
              <p>Collect data fields:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-neutral-600">
                <li>Rewards (cashback, points, travel, etc.)</li>
                <li>Fees (joining, annual)</li>
                <li>Eligibility (income, age, CIBIL score)</li>
                <li>Special features (fuel, dining, UPI, etc.)</li>
              </ul>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-indigo-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">2</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Define Comparison Parameters</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Shortlist key features for comparison:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-neutral-600">
                <li>Daily expenditure patterns</li>
                <li>Embedded benefits</li>
                <li>Fees</li>
                <li>Eligibility criteria</li>
              </ul>
              <p>Categorize cards by lifestyle needs (shopping, travel, fuel, premium, etc.)</p>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-indigo-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">3</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Data Structuring</h3>
            <div className="text-neutral-600">
              <p>Store card data in a JSON file or JS object array for client-side searching and filtering.</p>
              <div className="mt-3 bg-neutral-50 p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
{`{
  "id": "hdfc-regalia",
  "name": "HDFC Regalia Credit Card",
  "bank": "HDFC Bank",
  "network": "Visa",
  "category": "travel",
  "annualFee": 2500,
  "joiningFee": 1000,
  "feeWaiver": "Spend ₹3,00,000 in a year",
  "rewards": {
    "type": "points",
    "rate": "4 points per ₹150",
    "valuePerPoint": 0.25
  },
  "benefits": ["airport_lounge", "fuel_surcharge_waiver", "milestone_benefits"],
  "eligibility": {
    "minIncome": 1200000,
    "minCibilScore": 750
  }
}`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-indigo-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">4</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">UI/UX Design</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Design a clean, mobile-friendly interface:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-neutral-600">
                <li>Filters: Rewards type, annual fee range, eligibility, card network (Visa, Mastercard, RuPay), etc.</li>
                <li>Search bar for card name or bank</li>
                <li>Card comparison table/grid with key features</li>
                <li>Detailed card info modal/pop-up</li>
              </ul>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-medium text-neutral-900 mb-2">Main Search Page</h4>
                  <div className="aspect-video bg-neutral-100 rounded-lg flex items-center justify-center">
                    <Layout className="h-8 w-8 text-neutral-400" />
                  </div>
                </div>
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <h4 className="font-medium text-neutral-900 mb-2">Card Comparison View</h4>
                  <div className="aspect-video bg-neutral-100 rounded-lg flex items-center justify-center">
                    <Layout className="h-8 w-8 text-neutral-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-indigo-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">5</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Search & Filter Logic</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Implement JS functions to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-neutral-600">
                <li>Filter cards based on user-selected criteria</li>
                <li>Sort by rewards, fees, or popularity</li>
                <li>Allow multi-card side-by-side comparison</li>
              </ul>
              <div className="mt-3 bg-neutral-50 p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
{`// Example filtering function
function filterCards(cards, filters) {
  return cards.filter(card => {
    // Filter by annual fee
    if (filters.maxAnnualFee && card.annualFee > filters.maxAnnualFee) {
      return false;
    }
    
    // Filter by rewards type
    if (filters.rewardsType && card.rewards.type !== filters.rewardsType) {
      return false;
    }
    
    // Filter by minimum income
    if (filters.minIncome && card.eligibility.minIncome > filters.minIncome) {
      return false;
    }
    
    // Filter by card network
    if (filters.network && card.network !== filters.network) {
      return false;
    }
    
    return true;
  });
}`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-indigo-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">6</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Eligibility Checker</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Simple form: User enters income, age, CIBIL score (optional)</p>
              <p>JS matches user input with card eligibility requirements and highlights suitable cards</p>
              <div className="mt-3 bg-white border border-neutral-200 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 mb-2">Eligibility Form</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Monthly Income</label>
                    <input type="text" className="input" placeholder="₹50,000" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Age</label>
                    <input type="text" className="input" placeholder="30" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">CIBIL Score (Optional)</label>
                    <input type="text" className="input" placeholder="750" disabled />
                  </div>
                  <button className="btn btn-primary w-full" disabled>Check Eligibility</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-indigo-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">7</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Rewards & Fees Calculator</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Optionally, let users enter estimated monthly spends (fuel, shopping, travel)</p>
              <p>JS calculates potential annual rewards/benefits for each card and displays net value after fees</p>
              <div className="mt-3 bg-white border border-neutral-200 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 mb-2">Monthly Spend Breakdown</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Shopping</label>
                    <input type="text" className="input" placeholder="₹15,000" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Dining</label>
                    <input type="text" className="input" placeholder="₹8,000" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Travel</label>
                    <input type="text" className="input" placeholder="₹5,000" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Fuel</label>
                    <input type="text" className="input" placeholder="₹3,000" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Others</label>
                    <input type="text" className="input" placeholder="₹10,000" disabled />
                  </div>
                  <button className="btn btn-primary w-full" disabled>Calculate Rewards</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-indigo-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">8</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Continuous Updates</h3>
            <div className="text-neutral-600">
              <p>Plan for periodic manual updates to card data (since no backend or live API)</p>
              <p>Optionally, provide a feedback form for users to report outdated info</p>
            </div>
          </div>
          
          <div className="relative pl-8">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">9</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Testing & Launch</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Test for usability, accuracy, and mobile responsiveness</p>
              <p>Deploy as a static website (GitHub Pages, Netlify, etc.)</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Credit Score Estimator Roadmap</h2>
        
        <div className="space-y-8">
          <div className="relative pl-8 pb-8 border-l-2 border-purple-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">1</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Understand Credit Score Factors</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Study Indian credit scoring models (CIBIL, Experian, etc.)</p>
              <p>Key factors:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-neutral-600">
                <li>Repayment history (35%)</li>
                <li>Credit utilization (30%)</li>
                <li>Length of credit history (15%)</li>
                <li>New credit inquiries (15%)</li>
                <li>Credit mix (10%)</li>
              </ul>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-purple-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">2</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Design Input Form</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Collect user data:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-neutral-600">
                <li>Number of open loans/credit cards</li>
                <li>Total credit limit & outstanding balance</li>
                <li>Recent payment history (missed/on-time)</li>
                <li>Age of oldest credit account</li>
                <li>Number of recent credit applications</li>
                <li>Types of credit (secured/unsecured)</li>
              </ul>
              <div className="mt-3 bg-white border border-neutral-200 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 mb-2">Credit Score Input Form</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Number of Credit Cards</label>
                    <input type="text" className="input" placeholder="2" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Number of Loans</label>
                    <input type="text" className="input" placeholder="1" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Credit Utilization (%)</label>
                    <input type="text" className="input" placeholder="30%" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Payments Missed in Last 12 Months</label>
                    <input type="text" className="input" placeholder="0" disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-purple-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">3</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Scoring Algorithm (Client-Side)</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Use a simplified, transparent scoring model based on the above weights</p>
              <p>Example: Assign scores for each input and sum for a total out of 900</p>
              <div className="mt-3 bg-neutral-50 p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
{`// Example scoring algorithm
function calculateCreditScore(userData) {
  let score = 750; // Base score
  
  // Payment history (35%)
  if (userData.missedPayments > 0) {
    score -= userData.missedPayments * 30;
  } else {
    score += 50; // Bonus for perfect payment history
  }
  
  // Credit utilization (30%)
  if (userData.creditUtilization < 30) {
    score += 50;
  } else if (userData.creditUtilization > 70) {
    score -= 50;
  }
  
  // Length of credit history (15%)
  if (userData.oldestAccountAge > 5) {
    score += 40;
  } else if (userData.oldestAccountAge < 2) {
    score -= 20;
  }
  
  // New credit inquiries (15%)
  if (userData.recentInquiries > 3) {
    score -= 30;
  }
  
  // Credit mix (10%)
  if (userData.hasCreditCards && userData.hasLoans) {
    score += 30; // Good mix
  }
  
  // Ensure score is within valid range
  return Math.max(300, Math.min(900, score));
}`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-purple-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">4</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Result Display</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Show estimated credit score (e.g., 720/900)</p>
              <p>Visual indicator (poor, fair, good, excellent)</p>
              <p>List key factors affecting the score</p>
              <div className="mt-3 bg-white border border-neutral-200 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 mb-2">Credit Score Result</h4>
                <div className="mb-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center h-32 w-32 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-3">
                      <span className="text-3xl font-bold text-white">750</span>
                    </div>
                    <p className="text-lg font-semibold text-green-600">Good</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Poor</span>
                    <span className="text-sm text-neutral-600">Excellent</span>
                  </div>
                  <div className="h-2 bg-neutral-200 rounded-full">
                    <div className="h-full w-3/4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>300</span>
                    <span>500</span>
                    <span>700</span>
                    <span>900</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-purple-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">5</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Personalized Improvement Tips</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Based on user input, show actionable tips:</p>
              <ul className="list-disc list-inside ml-4 space-y-1 text-neutral-600">
                <li>Pay bills on time</li>
                <li>Reduce credit utilization</li>
                <li>Avoid multiple new credit applications</li>
                <li>Maintain a healthy credit mix</li>
              </ul>
              <div className="mt-3 bg-white border border-neutral-200 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 mb-2">Improvement Recommendations</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h5 className="font-medium text-yellow-800 mb-1">Reduce Credit Utilization</h5>
                    <p className="text-sm text-yellow-700">Your credit utilization is at 65%. Try to keep it below 30% to improve your score.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Excellent Payment History</h5>
                    <p className="text-sm text-green-700">You have no missed payments. Continue this pattern to maintain a good score.</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-800 mb-1">Improve Credit Mix</h5>
                    <p className="text-sm text-blue-700">Consider diversifying your credit portfolio with a mix of secured and unsecured loans.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative pl-8 pb-8 border-l-2 border-purple-200">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">6</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Simulation Feature (Optional)</h3>
            <div className="text-neutral-600">
              <p>Let users simulate actions (e.g., paying off a card, closing a loan) and see the estimated impact on their score</p>
              <div className="mt-3 bg-white border border-neutral-200 rounded-lg p-4">
                <h4 className="font-medium text-neutral-900 mb-2">Score Simulator</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <h5 className="font-medium text-neutral-800 mb-1">Simulate Action</h5>
                    <select className="input w-full mb-2" disabled>
                      <option>Pay off credit card balance</option>
                      <option>Close oldest credit card</option>
                      <option>Apply for new loan</option>
                      <option>Miss a payment</option>
                    </select>
                    <button className="btn btn-primary w-full" disabled>Simulate Impact</button>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium text-indigo-800 mb-1">Potential Impact</h5>
                        <p className="text-sm text-indigo-700">Paying off credit card balance</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-indigo-700">Current: 750</p>
                        <p className="text-lg font-semibold text-green-600">New: 785 (+35)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative pl-8">
            <div className="absolute -left-3 top-0">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">7</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">UI/UX Design & Launch</h3>
            <div className="text-neutral-600 space-y-3">
              <p>Simple, intuitive, mobile-friendly form and results page</p>
              <p>Use charts/graphs for score visualization</p>
              <p>Test with sample scenarios and deploy as a static site</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Example Workflow Table</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Step</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Credit Card Finder</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Credit Score Estimator</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">Data Collection</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Card details, rewards, fees, eligibility</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">User financial info (loans, history, etc.)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">User Input</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Filters, search, eligibility info</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Form fields for score estimation</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">Core Logic</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">JS-based filtering, matching, comparison</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">JS-based scoring algorithm</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">Output</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Card list, comparisons, best matches</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Estimated score, tips, simulation</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">Updates</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Manual data refresh</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Algorithm tweaks, UI improvements</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-100">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-indigo-600 mt-1 mr-3" />
          <div>
            <h3 className="text-xl font-semibold text-indigo-900 mb-2">Implementation Considerations</h3>
            <div className="space-y-3 text-indigo-700">
              <p>When implementing these tools, consider the following:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>All calculations should happen client-side to protect user privacy</li>
                <li>Regularly update credit card data to maintain accuracy</li>
                <li>Include clear disclaimers that the credit score is an estimate only</li>
                <li>Ensure mobile responsiveness for all components</li>
                <li>Consider adding a feedback mechanism to improve the tools over time</li>
              </ul>
              <p className="mt-4">These tools can be valuable additions to your financial calculator suite, helping users make informed decisions about credit cards and understand their credit health.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CreditCardFinderRoadmap;