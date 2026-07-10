import React, { useState } from 'react';
import { Filter, ArrowUpDown, ExternalLink, Info, TrendingUp, TrendingDown } from 'lucide-react';

interface BankRate {
  bank: string;
  logo: string;
  savingsRate: number;
  fdRates: {
    months3: number;
    months6: number;
    year1: number;
    year3: number;
    year5: number;
  };
  loanRates: {
    home: number;
    personal: number;
    car: number;
    education: number;
  };
  specialOffers: string[];
  lastUpdated: string;
}

export const InterestRatesComparison: React.FC = () => {
  const [productType, setProductType] = useState<'deposits' | 'loans'>('deposits');
  const [depositType, setDepositType] = useState<'savings' | 'fd'>('fd');
  const [fdTenure, setFdTenure] = useState<'months3' | 'months6' | 'year1' | 'year3' | 'year5'>('year1');
  const [loanType, setLoanType] = useState<'home' | 'personal' | 'car' | 'education'>('home');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [customerType, setCustomerType] = useState<'regular' | 'senior' | 'women'>('regular');
  
  // Sample data for demonstration
  const bankRates: BankRate[] = [
    {
      bank: 'State Bank of India',
      logo: 'sbi-logo.png',
      savingsRate: 3.0,
      fdRates: {
        months3: 5.5,
        months6: 5.75,
        year1: 6.8,
        year3: 6.7,
        year5: 6.5
      },
      loanRates: {
        home: 8.5,
        personal: 12.5,
        car: 9.5,
        education: 10.5
      },
      specialOffers: ['0.5% higher rates for senior citizens', 'Zero processing fee on home loans till Dec 31'],
      lastUpdated: '2 days ago'
    },
    {
      bank: 'HDFC Bank',
      logo: 'hdfc-logo.png',
      savingsRate: 3.5,
      fdRates: {
        months3: 5.75,
        months6: 6.0,
        year1: 7.0,
        year3: 6.9,
        year5: 6.7
      },
      loanRates: {
        home: 8.7,
        personal: 11.5,
        car: 9.25,
        education: 10.75
      },
      specialOffers: ['0.25% lower rates for women borrowers', 'Special FD rates for senior citizens'],
      lastUpdated: '1 day ago'
    },
    {
      bank: 'ICICI Bank',
      logo: 'icici-logo.png',
      savingsRate: 3.25,
      fdRates: {
        months3: 5.6,
        months6: 5.9,
        year1: 6.9,
        year3: 6.8,
        year5: 6.6
      },
      loanRates: {
        home: 8.6,
        personal: 11.75,
        car: 9.3,
        education: 10.6
      },
      specialOffers: ['No foreclosure charges on home loans', 'Special rates for premium customers'],
      lastUpdated: '3 days ago'
    },
    {
      bank: 'Axis Bank',
      logo: 'axis-logo.png',
      savingsRate: 3.5,
      fdRates: {
        months3: 5.65,
        months6: 5.95,
        year1: 6.95,
        year3: 6.85,
        year5: 6.75
      },
      loanRates: {
        home: 8.65,
        personal: 11.25,
        car: 9.15,
        education: 10.8
      },
      specialOffers: ['0.5% higher FD rates for senior citizens', 'Attractive rates for NRIs'],
      lastUpdated: '5 days ago'
    },
    {
      bank: 'Kotak Mahindra Bank',
      logo: 'kotak-logo.png',
      savingsRate: 4.0,
      fdRates: {
        months3: 5.8,
        months6: 6.1,
        year1: 7.1,
        year3: 7.0,
        year5: 6.8
      },
      loanRates: {
        home: 8.75,
        personal: 11.0,
        car: 9.0,
        education: 10.9
      },
      specialOffers: ['Up to 0.75% higher rates for senior citizens', 'Zero processing fee on balance transfers'],
      lastUpdated: '1 week ago'
    },
    {
      bank: 'Yes Bank',
      logo: 'yes-logo.png',
      savingsRate: 4.5,
      fdRates: {
        months3: 6.0,
        months6: 6.25,
        year1: 7.25,
        year3: 7.1,
        year5: 7.0
      },
      loanRates: {
        home: 8.9,
        personal: 10.75,
        car: 9.5,
        education: 11.0
      },
      specialOffers: ['Additional 0.1% for online FD booking', 'Special rates for senior citizens'],
      lastUpdated: '4 days ago'
    },
    {
      bank: 'IndusInd Bank',
      logo: 'indusind-logo.png',
      savingsRate: 4.0,
      fdRates: {
        months3: 5.85,
        months6: 6.15,
        year1: 7.15,
        year3: 7.05,
        year5: 6.9
      },
      loanRates: {
        home: 8.8,
        personal: 10.9,
        car: 9.1,
        education: 10.95
      },
      specialOffers: ['Special rates for super senior citizens (80+)', 'Attractive offers for premium customers'],
      lastUpdated: '2 days ago'
    }
  ];
  
  // Apply senior citizen bonus for FD rates if applicable
  const getAdjustedRate = (bank: BankRate, rate: number): number => {
    if (customerType === 'senior' && productType === 'deposits' && depositType === 'fd') {
      return rate + 0.5; // Typical senior citizen bonus
    }
    if (customerType === 'women' && productType === 'loans') {
      return rate - 0.25; // Typical women borrower discount
    }
    return rate;
  };
  
  // Get the relevant rate based on selected options
  const getRelevantRate = (bank: BankRate): number => {
    if (productType === 'deposits') {
      if (depositType === 'savings') {
        return getAdjustedRate(bank, bank.savingsRate);
      } else {
        return getAdjustedRate(bank, bank.fdRates[fdTenure]);
      }
    } else {
      return getAdjustedRate(bank, bank.loanRates[loanType]);
    }
  };
  
  // Sort banks based on interest rates
  const sortedBanks = [...bankRates].sort((a, b) => {
    const rateA = getRelevantRate(a);
    const rateB = getRelevantRate(b);
    
    if (productType === 'deposits') {
      return sortOrder === 'desc' ? rateB - rateA : rateA - rateB;
    } else {
      return sortOrder === 'asc' ? rateA - rateB : rateB - rateA;
    }
  });
  
  // Get the best rate
  const bestRate = sortedBanks.reduce((prev, current) => {
    const prevRate = getRelevantRate(prev);
    const currentRate = getRelevantRate(current);
    
    if (productType === 'deposits') {
      return prevRate > currentRate ? prev : current;
    } else {
      return prevRate < currentRate ? prev : current;
    }
  });
  
  // Get rate trend indicator
  const getRateTrend = (rate: number): React.ReactNode => {
    // This would ideally compare with historical rates
    // For demonstration, we'll use a simple comparison with the average
    const avgRate = bankRates.reduce((sum, bank) => sum + getRelevantRate(bank), 0) / bankRates.length;
    
    if (productType === 'deposits') {
      if (rate > avgRate + 0.5) return <TrendingUp className="h-4 w-4 text-[--success-600]" />;
      if (rate < avgRate - 0.5) return <TrendingDown className="h-4 w-4 text-[--error-600]" />;
    } else {
      if (rate < avgRate - 0.5) return <TrendingDown className="h-4 w-4 text-[--success-600]" />;
      if (rate > avgRate + 0.5) return <TrendingUp className="h-4 w-4 text-[--error-600]" />;
    }
    
    return null;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Best Interest Rates Comparison</h2>
        <p className="text-neutral-600">
          Compare current interest rates across major banks in India for various financial products. Find the best rates for your savings, fixed deposits, and loans to maximize your returns or minimize your costs.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <button
              onClick={() => setProductType('deposits')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                productType === 'deposits'
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              Deposit Rates
            </button>
            <button
              onClick={() => setProductType('loans')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                productType === 'loans'
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              Loan Rates
            </button>
          </div>
          
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-neutral-500 mr-2" />
            <span className="text-sm text-neutral-600 mr-2">Sort by:</span>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center text-[--primary-600] hover:text-[--primary-800]"
            >
              {productType === 'deposits' ? 'Highest Rate' : 'Lowest Rate'}
              <ArrowUpDown className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        
        {productType === 'deposits' && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => setDepositType('savings')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  depositType === 'savings'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Savings Account
              </button>
              <button
                onClick={() => setDepositType('fd')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  depositType === 'fd'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Fixed Deposit
              </button>
            </div>
            
            {depositType === 'fd' && (
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Select Tenure</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFdTenure('months3')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      fdTenure === 'months3'
                        ? 'bg-[--primary-100] text-[--primary-800]'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    3 Months
                  </button>
                  <button
                    onClick={() => setFdTenure('months6')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      fdTenure === 'months6'
                        ? 'bg-[--primary-100] text-[--primary-800]'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    6 Months
                  </button>
                  <button
                    onClick={() => setFdTenure('year1')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      fdTenure === 'year1'
                        ? 'bg-[--primary-100] text-[--primary-800]'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    1 Year
                  </button>
                  <button
                    onClick={() => setFdTenure('year3')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      fdTenure === 'year3'
                        ? 'bg-[--primary-100] text-[--primary-800]'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    3 Years
                  </button>
                  <button
                    onClick={() => setFdTenure('year5')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      fdTenure === 'year5'
                        ? 'bg-[--primary-100] text-[--primary-800]'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    5 Years
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {productType === 'loans' && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setLoanType('home')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  loanType === 'home'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Home Loan
              </button>
              <button
                onClick={() => setLoanType('personal')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  loanType === 'personal'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Personal Loan
              </button>
              <button
                onClick={() => setLoanType('car')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  loanType === 'car'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Car Loan
              </button>
              <button
                onClick={() => setLoanType('education')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  loanType === 'education'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Education Loan
              </button>
            </div>
          </div>
        )}
        
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Customer Type</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCustomerType('regular')}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                customerType === 'regular'
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              Regular
            </button>
            <button
              onClick={() => setCustomerType('senior')}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                customerType === 'senior'
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              Senior Citizen
            </button>
            <button
              onClick={() => setCustomerType('women')}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                customerType === 'women'
                  ? 'bg-[--primary-100] text-[--primary-800]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              Women
            </button>
          </div>
        </div>
      </div>

      {/* Best Rate Highlight */}
      <div className="bg-[--success-50] border border-[--success-200] rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[--success-900] mb-2">
              Best {productType === 'deposits' ? 'Deposit' : 'Loan'} Rate Available
            </h3>
            <p className="text-[--success-700] mb-4 md:mb-0">
              {bestRate.bank} offers the {productType === 'deposits' ? 'highest' : 'lowest'} rate for {' '}
              {productType === 'deposits' 
                ? (depositType === 'savings' ? 'savings accounts' : `${fdTenure.replace('months', ' month').replace('year', ' year')} fixed deposits`)
                : `${loanType} loans`
              }
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-[--success-700]">
                {getRelevantRate(bestRate).toFixed(2)}%
              </span>
              {getRateTrend(getRelevantRate(bestRate))}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {customerType !== 'regular' && `${customerType === 'senior' ? 'Senior citizen' : 'Women'} special rate`}
            </p>
          </div>
        </div>
      </div>

      {/* Rates Comparison Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Bank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {productType === 'deposits' 
                    ? (depositType === 'savings' ? 'Savings Rate' : `${fdTenure.replace('months', ' Month').replace('year', ' Year')} FD Rate`)
                    : `${loanType.charAt(0).toUpperCase() + loanType.slice(1)} Loan Rate`
                  }
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Special Offers
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {sortedBanks.map((bank, index) => (
                <tr key={index} className={bank.bank === bestRate.bank ? 'bg-[--success-50]' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center">
                        {bank.bank.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{bank.bank}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-lg font-semibold ${
                        bank.bank === bestRate.bank 
                          ? (productType === 'deposits' ? 'text-[--success-700]' : 'text-[--success-700]')
                          : 'text-neutral-900'
                      }`}>
                        {getRelevantRate(bank).toFixed(2)}%
                      </span>
                      <span className="ml-2">
                        {getRateTrend(getRelevantRate(bank))}
                      </span>
                    </div>
                    {customerType !== 'regular' && (
                      <span className="text-xs text-[--primary-600]">
                        {customerType === 'senior' ? 'Senior citizen rate' : 'Women special rate'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-600">
                      {bank.specialOffers.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {bank.specialOffers.map((offer, i) => (
                            <li key={i} className="text-xs">{offer}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-xs">No special offers</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {bank.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a 
                      href={`https://www.${bank.bank.toLowerCase().replace(/\s+/g, '')}.com`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[--primary-600] hover:text-[--primary-900] flex items-center"
                    >
                      Visit
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Understanding Interest Rates</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-[--primary-800] mb-2">Deposit Rates</h4>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li><strong>Savings Account:</strong> Interest calculated on daily balance, paid quarterly</li>
              <li><strong>Fixed Deposit:</strong> Fixed rate for the entire tenure, typically higher than savings</li>
              <li><strong>Senior Citizen Rates:</strong> Usually 0.25% to 0.5% higher than regular rates</li>
              <li><strong>Premature Withdrawal:</strong> May result in lower interest rates</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-[--primary-800] mb-2">Loan Rates</h4>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li><strong>Fixed vs. Floating:</strong> Rates shown are typically floating rates linked to RLLR/MCLR</li>
              <li><strong>Processing Fees:</strong> Additional charges apply, typically 0.5% to 2% of loan amount</li>
              <li><strong>Special Categories:</strong> Women, government employees often get discounted rates</li>
              <li><strong>Credit Score Impact:</strong> Actual rates may vary based on your credit score</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Frequently Asked Questions</h3>
        
        <div className="space-y-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">How often are the interest rates updated?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>We update our interest rate database weekly. However, for major policy changes or when the RBI changes key rates, we update our database immediately to reflect these changes.</p>
              <p className="mt-2">Each rate shows the last updated date for transparency. Banks typically revise their interest rates based on:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>RBI policy rate changes (repo rate, reverse repo rate)</li>
                <li>Changes in their internal benchmarks (MCLR, RLLR)</li>
                <li>Competitive market conditions</li>
                <li>Seasonal promotional offers</li>
              </ul>
              <p className="mt-2">For the most current rates, we recommend confirming with the bank directly before making financial decisions.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Do banks offer different interest rates to different customers?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>Yes, many banks offer preferential rates to certain customer segments:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Senior Citizens:</strong> Typically get 0.25% to 0.50% higher rates on fixed deposits</li>
                <li><strong>Women Borrowers:</strong> Some banks offer 0.05% to 0.25% lower loan rates for women</li>
                <li><strong>Government Employees:</strong> May receive preferential rates on certain loans</li>
                <li><strong>High Net Worth Individuals:</strong> Often get better rates based on relationship value</li>
                <li><strong>Salary Account Holders:</strong> May receive preferential rates with the same bank</li>
                <li><strong>Credit Score Based:</strong> Customers with higher credit scores often qualify for lower loan rates</li>
              </ul>
              <p className="mt-2">Our comparison tool highlights special rates for senior citizens and women. For other categories, you may need to check with the bank directly.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Why do interest rates vary between banks?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>Interest rates vary between banks due to several factors:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Cost of Funds:</strong> Each bank has a different cost structure for acquiring funds</li>
                <li><strong>Liquidity Position:</strong> Banks with excess liquidity may offer lower loan rates or higher deposit rates</li>
                <li><strong>Business Strategy:</strong> Some banks focus on specific segments and adjust rates accordingly</li>
                <li><strong>Risk Assessment:</strong> Different risk models lead to different pricing strategies</li>
                <li><strong>Operational Costs:</strong> Varying overhead costs affect the rates banks can offer</li>
                <li><strong>Competition:</strong> Banks adjust rates to remain competitive in their target markets</li>
              </ul>
              <p className="mt-2">Smaller or newer banks often offer higher deposit rates to attract customers, while established banks might offer lower loan rates due to their lower cost of funds.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Are the lowest loan interest rates always the best option?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>Not necessarily. While the interest rate is important, you should also consider other factors:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Processing Fees:</strong> Some banks with slightly higher rates may have lower or zero processing fees</li>
                <li><strong>Prepayment Penalties:</strong> Lower flexibility for prepayment can offset the benefit of a lower rate</li>
                <li><strong>Loan Tenure Flexibility:</strong> Ability to adjust tenure as per your needs</li>
                <li><strong>Hidden Charges:</strong> Documentation fees, inspection charges, etc.</li>
                <li><strong>Customer Service:</strong> Quality of service can significantly impact your loan experience</li>
                <li><strong>Approval Time:</strong> Faster approval might be worth a slightly higher rate in urgent situations</li>
              </ul>
              <p className="mt-2">Our detailed comparison includes these additional factors to help you make a comprehensive decision. Always read the fine print before finalizing a loan.</p>
            </div>
          </details>
        </div>
      </div>

      {/* Calculators Section */}
      <div className="bg-[--accent-50] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[--accent-900] mb-4">Related Calculators</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {productType === 'deposits' ? (
            <>
              <a 
                href="/calculators/fd-calculator" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-[--accent-800] mb-1">Fixed Deposit Calculator</h4>
                <p className="text-xs text-[--accent-600]">Calculate maturity amount and interest earned on your FD</p>
              </a>
              <a 
                href="/calculators/rd-calculator" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-[--accent-800] mb-1">Recurring Deposit Calculator</h4>
                <p className="text-xs text-[--accent-600]">Calculate returns on your monthly RD investments</p>
              </a>
              <a 
                href="/calculators/savings-account-calculator" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-[--accent-800] mb-1">Savings Account Calculator</h4>
                <p className="text-xs text-[--accent-600]">Calculate interest earned on your savings account</p>
              </a>
            </>
          ) : (
            <>
              <a 
                href="/calculators/emi-calculator" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-[--accent-800] mb-1">EMI Calculator</h4>
                <p className="text-xs text-[--accent-600]">Calculate your monthly loan payments</p>
              </a>
              <a 
                href="/calculators/loan-comparison-calculator" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-[--accent-800] mb-1">Loan Comparison Calculator</h4>
                <p className="text-xs text-[--accent-600]">Compare different loan offers side by side</p>
              </a>
              <a 
                href="/calculators/loan-affordability-calculator" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-[--accent-800] mb-1">Loan Affordability Calculator</h4>
                <p className="text-xs text-[--accent-600]">Find out how much loan you can afford</p>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterestRatesComparison;