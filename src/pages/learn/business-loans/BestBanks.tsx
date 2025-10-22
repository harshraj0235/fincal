import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../../components/learn/LearnLayout';

const BestBanks: React.FC = () => {
  const [loanType, setLoanType] = useState('all');
  const [loanAmount, setLoanAmount] = useState('medium');

  const lessonData = {
    title: "Best Banks for Business Loans 2024 - Compare Interest Rates & Features | MoneyCal",
    category: "business-loans",
    currentLesson: "best-banks",
    breadcrumb: [
      { name: "Learn", url: "/learn" },
      { name: "Business Loans", url: "/learn/business-loans" },
      { name: "Best Banks", url: "/learn/business-loans/best-banks" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Best Banks for Business Loans 2024 - Compare Interest Rates, Processing Fees & Features | MoneyCal</title>
        <meta name="description" content="Compare best banks for business loans in India. Find lowest interest rates, processing fees, and features for MSME loans, working capital loans, term loans, and startup loans from top banks and NBFCs." />
        <meta name="keywords" content="best banks for business loans, lowest business loan interest rate, business loan comparison, MSME loan banks, working capital loan banks, startup loan banks" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best Banks for Business Loans 2024",
            "description": "Comprehensive comparison of banks offering business loans in India"
          })}
        </script>
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Best Banks for Business Loans 2024
              <span className="block text-xl mt-2 text-indigo-100">व्यापारिक ऋण के लिए सर्वश्रेष्ठ बैंक 2024</span>
            </h1>
            <p className="text-lg text-indigo-100">
              Compare top banks and NBFCs offering business loans in India. 
              Find the best interest rates, lowest processing fees, and most suitable features for your business needs.
            </p>
          </div>

          {/* Filter Options */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Best Bank / अपना सर्वश्रेष्ठ बैंक खोजें</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Type / ऋण प्रकार
                </label>
                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Loan Types</option>
                  <option value="msme">MSME Loan</option>
                  <option value="working-capital">Working Capital</option>
                  <option value="term-loan">Term Loan</option>
                  <option value="startup">Startup Loan</option>
                  <option value="equipment">Equipment Loan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount / ऋण राशि
                </label>
                <select
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="small">Up to ₹10 Lakh</option>
                  <option value="medium">₹10 Lakh - ₹1 Crore</option>
                  <option value="large">Above ₹1 Crore</option>
                </select>
              </div>
            </div>
          </div>

          {/* Top Public Sector Banks */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Top Public Sector Banks / शीर्ष सार्वजनिक क्षेत्र के बैंक
            </h2>
            
            <div className="space-y-6">
              {/* SBI */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">State Bank of India (SBI)</h3>
                    <p className="text-sm text-gray-600">Largest public sector bank in India</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">8.50%</div>
                    <div className="text-sm text-gray-600">Interest Rate p.a.</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Loan Amount</h4>
                    <p className="text-blue-700">₹10 Lakh - ₹100 Crore</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 text-sm mb-1">Processing Fee</h4>
                    <p className="text-green-700">0.35% - 0.50%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 text-sm mb-1">Tenure</h4>
                    <p className="text-purple-700">Up to 10 years</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li>• Quick approval process</li>
                    <li>• Collateral-free up to ₹2 Crore (CGTMSE)</li>
                    <li>• Special schemes for MSME</li>
                    <li>• Nationwide branch network</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a href="https://sbi.co.in/web/business/sme" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Apply Now
                  </a>
                  <a href="https://sbi.co.in/web/business/sme" target="_blank" rel="noopener noreferrer" 
                     className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    Learn More
                  </a>
                </div>
              </div>

              {/* PNB */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Punjab National Bank (PNB)</h3>
                    <p className="text-sm text-gray-600">Second largest public sector bank</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">8.75%</div>
                    <div className="text-sm text-gray-600">Interest Rate p.a.</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Loan Amount</h4>
                    <p className="text-blue-700">₹5 Lakh - ₹50 Crore</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 text-sm mb-1">Processing Fee</h4>
                    <p className="text-green-700">0.50% - 1%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 text-sm mb-1">Tenure</h4>
                    <p className="text-purple-700">Up to 7 years</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li>• Flexible repayment options</li>
                    <li>• MUDRA loan facility available</li>
                    <li>• Special rates for women entrepreneurs</li>
                    <li>• Online application portal</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a href="https://www.pnbindia.in/en/ui/MSME.aspx" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Apply Now
                  </a>
                  <a href="https://www.pnbindia.in/en/ui/MSME.aspx" target="_blank" rel="noopener noreferrer" 
                     className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    Learn More
                  </a>
                </div>
              </div>

              {/* Bank of Baroda */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Bank of Baroda</h3>
                    <p className="text-sm text-gray-600">Strong presence in MSME lending</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">9.00%</div>
                    <div className="text-sm text-gray-600">Interest Rate p.a.</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Loan Amount</h4>
                    <p className="text-blue-700">₹10 Lakh - ₹75 Crore</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 text-sm mb-1">Processing Fee</h4>
                    <p className="text-green-700">0.50% - 0.75%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 text-sm mb-1">Tenure</h4>
                    <p className="text-purple-700">Up to 8 years</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li>• Baroda MSME Prerana scheme</li>
                    <li>• Working capital overdraft facility</li>
                    <li>• Customized loan solutions</li>
                    <li>• Strong international presence</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a href="https://www.bankofbaroda.in/business-banking/msme" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Apply Now
                  </a>
                  <a href="https://www.bankofbaroda.in/business-banking/msme" target="_blank" rel="noopener noreferrer" 
                     className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Top Private Sector Banks */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Top Private Sector Banks / शीर्ष निजी क्षेत्र के बैंक
            </h2>
            
            <div className="space-y-6">
              {/* HDFC Bank */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">HDFC Bank</h3>
                    <p className="text-sm text-gray-600">Leading private sector bank</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">9.25%</div>
                    <div className="text-sm text-gray-600">Interest Rate p.a.</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Loan Amount</h4>
                    <p className="text-blue-700">₹10 Lakh - ₹100 Crore</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 text-sm mb-1">Processing Fee</h4>
                    <p className="text-green-700">1% - 1.5%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 text-sm mb-1">Tenure</h4>
                    <p className="text-purple-700">Up to 10 years</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li>• Fast digital approval process</li>
                    <li>• Pre-approved offers for existing customers</li>
                    <li>• Flexible EMI options</li>
                    <li>• Excellent customer service</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a href="https://www.hdfcbank.com/sme/business-loans" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Apply Now
                  </a>
                  <a href="https://www.hdfcbank.com/sme/business-loans" target="_blank" rel="noopener noreferrer" 
                     className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    Learn More
                  </a>
                </div>
              </div>

              {/* ICICI Bank */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">ICICI Bank</h3>
                    <p className="text-sm text-gray-600">Innovative digital banking solutions</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">9.50%</div>
                    <div className="text-sm text-gray-600">Interest Rate p.a.</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Loan Amount</h4>
                    <p className="text-blue-700">₹5 Lakh - ₹50 Crore</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 text-sm mb-1">Processing Fee</h4>
                    <p className="text-green-700">1% - 2%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 text-sm mb-1">Tenure</h4>
                    <p className="text-purple-700">Up to 12 years</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li>• Instant approval for eligible customers</li>
                    <li>• Business overdraft facility</li>
                    <li>• Comprehensive business banking suite</li>
                    <li>• Digital account management</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a href="https://www.icicibank.com/business-banking/loan" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Apply Now
                  </a>
                  <a href="https://www.icicibank.com/business-banking/loan" target="_blank" rel="noopener noreferrer" 
                     className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    Learn More
                  </a>
                </div>
              </div>

              {/* Axis Bank */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Axis Bank</h3>
                    <p className="text-sm text-gray-600">Customized MSME solutions</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">9.75%</div>
                    <div className="text-sm text-gray-600">Interest Rate p.a.</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Loan Amount</h4>
                    <p className="text-blue-700">₹5 Lakh - ₹75 Crore</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 text-sm mb-1">Processing Fee</h4>
                    <p className="text-green-700">1% - 1.5%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 text-sm mb-1">Tenure</h4>
                    <p className="text-purple-700">Up to 10 years</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li>• Specialized SME banking</li>
                    <li>• Working capital and term loans</li>
                    <li>• Trade finance solutions</li>
                    <li>• Digital banking platform</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a href="https://www.axisbank.com/business-banking/sme" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Apply Now
                  </a>
                  <a href="https://www.axisbank.com/business-banking/sme" target="_blank" rel="noopener noreferrer" 
                     className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Top NBFCs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Top NBFCs for Business Loans / शीर्ष NBFC
            </h2>
            
            <div className="space-y-6">
              {/* Bajaj Finserv */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Bajaj Finserv</h3>
                    <p className="text-sm text-gray-600">Quick approval and disbursal</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">11.00%</div>
                    <div className="text-sm text-gray-600">Interest Rate p.a.</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Loan Amount</h4>
                    <p className="text-blue-700">₹1 Lakh - ₹80 Lakh</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 text-sm mb-1">Processing Fee</h4>
                    <p className="text-green-700">Up to 3.50%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 text-sm mb-1">Tenure</h4>
                    <p className="text-purple-700">Up to 8 years</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li>• Pre-approved offers available</li>
                    <li>• Minimal documentation</li>
                    <li>• Quick approval (24-48 hours)</li>
                    <li>• Collateral-free loans</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a href="https://www.bajajfinserv.in/business-loan" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Apply Now
                  </a>
                  <a href="https://www.bajajfinserv.in/business-loan" target="_blank" rel="noopener noreferrer" 
                     className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    Learn More
                  </a>
                </div>
              </div>

              {/* Tata Capital */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Tata Capital</h3>
                    <p className="text-sm text-gray-600">Trusted Tata brand</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">11.50%</div>
                    <div className="text-sm text-gray-600">Interest Rate p.a.</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">Loan Amount</h4>
                    <p className="text-blue-700">₹75,000 - ₹25 Lakh</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 text-sm mb-1">Processing Fee</h4>
                    <p className="text-green-700">2.25% - 3%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 text-sm mb-1">Tenure</h4>
                    <p className="text-purple-700">Up to 6 years</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li>• Flexible repayment options</li>
                    <li>• Doorstep service available</li>
                    <li>• Customized loan solutions</li>
                    <li>• No hidden charges</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a href="https://www.tatacapital.com/business-loans.htm" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Apply Now
                  </a>
                  <a href="https://www.tatacapital.com/business-loans.htm" target="_blank" rel="noopener noreferrer" 
                     className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Quick Comparison / त्वरित तुलना
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Bank/NBFC</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Interest Rate</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Loan Amount</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Processing Fee</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">SBI</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600">8.50% - 12.50%</td>
                    <td className="border border-gray-300 px-4 py-3">₹10L - ₹100Cr</td>
                    <td className="border border-gray-300 px-4 py-3">0.35% - 0.50%</td>
                    <td className="border border-gray-300 px-4 py-3">Large loans, MSME</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">HDFC Bank</td>
                    <td className="border border-gray-300 px-4 py-3">9.25% - 13.50%</td>
                    <td className="border border-gray-300 px-4 py-3">₹10L - ₹100Cr</td>
                    <td className="border border-gray-300 px-4 py-3">1% - 1.5%</td>
                    <td className="border border-gray-300 px-4 py-3">Digital process, service</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">ICICI Bank</td>
                    <td className="border border-gray-300 px-4 py-3">9.50% - 14.00%</td>
                    <td className="border border-gray-300 px-4 py-3">₹5L - ₹50Cr</td>
                    <td className="border border-gray-300 px-4 py-3">1% - 2%</td>
                    <td className="border border-gray-300 px-4 py-3">Quick approval</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Axis Bank</td>
                    <td className="border border-gray-300 px-4 py-3">9.75% - 14.50%</td>
                    <td className="border border-gray-300 px-4 py-3">₹5L - ₹75Cr</td>
                    <td className="border border-gray-300 px-4 py-3">1% - 1.5%</td>
                    <td className="border border-gray-300 px-4 py-3">SME banking</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Bajaj Finserv</td>
                    <td className="border border-gray-300 px-4 py-3">11% - 16%</td>
                    <td className="border border-gray-300 px-4 py-3">₹1L - ₹80L</td>
                    <td className="border border-gray-300 px-4 py-3">Up to 3.50%</td>
                    <td className="border border-gray-300 px-4 py-3">Small loans, quick</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Choose */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              How to Choose the Best Bank / सर्वश्रेष्ठ बैंक कैसे चुनें
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Factors / मुख्य कारक</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Interest Rates / ब्याज दरें</h4>
                      <p className="text-gray-600 text-sm">Compare effective interest rates including all charges</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Processing Time / प्रसंस्करण समय</h4>
                      <p className="text-gray-600 text-sm">Check approval and disbursal timeline</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Collateral Requirements / जमानत आवश्यकताएं</h4>
                      <p className="text-gray-600 text-sm">Understand security required for loan approval</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-orange-100 text-orange-600 rounded-full p-2 mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Customer Service / ग्राहक सेवा</h4>
                      <p className="text-gray-600 text-sm">Evaluate support quality and branch accessibility</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Comparison Tips / तुलना टिप्स</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Calculate total cost including all fees / सभी शुल्कों सहित कुल लागत की गणना करें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Check eligibility criteria before applying / आवेदन करने से पहले पात्रता मानदंड जांचें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Read customer reviews and ratings / ग्राहक समीक्षा और रेटिंग पढ़ें</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Negotiate rates if you have good credit score</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Consider existing banking relationship / मौजूदा बैंकिंग संबंध पर विचार करें</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions / अक्सर पूछे जाने वाले प्रश्न
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Which bank offers the lowest interest rate on business loans?
                </h3>
                <p className="text-gray-600">
                  Public sector banks like SBI typically offer the lowest interest rates starting from 8.50% p.a. for business loans. 
                  However, actual rates depend on your business profile, credit score, and loan amount. Government schemes like MUDRA offer even lower rates for eligible MSMEs.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Should I choose a public sector bank or private bank for business loan?
                </h3>
                <p className="text-gray-600">
                  Public sector banks generally offer lower interest rates and better terms for large loans, while private banks provide faster processing, better customer service, and digital convenience. 
                  Choose based on your priorities: cost savings (public) vs. speed and service (private).
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I get a business loan from multiple banks simultaneously?
                </h3>
                <p className="text-gray-600">
                  Yes, you can have business loans from multiple banks if you meet their eligibility criteria. However, multiple loan applications in a short period may negatively impact your credit score. 
                  It's better to apply to one bank at a time and maintain a healthy debt-to-income ratio.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Which bank is best for startups and new businesses?
                </h3>
                <p className="text-gray-600">
                  For startups, consider banks offering MUDRA loans (₹10 lakh), Stand-Up India scheme (₹10 lakh - ₹1 crore), or SIDBI assistance. 
                  NBFCs like Bajaj Finserv and Tata Capital also cater to new businesses with flexible eligibility. Check government schemes first for better rates.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  How do I switch my business loan to a bank with lower interest rates?
                </h3>
                <p className="text-gray-600">
                  You can transfer your business loan through balance transfer or refinancing. Compare total cost including processing fees, prepayment charges of old loan, and new interest rate. 
                  Most banks offer balance transfer with attractive interest rates for customers with good repayment history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default BestBanks;
