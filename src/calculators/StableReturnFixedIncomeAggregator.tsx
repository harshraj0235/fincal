import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, Search, Filter, TrendingUp, Calendar, ArrowRight, Info, ExternalLink, Check } from 'lucide-react';

interface FixedIncomeProduct {
  id: string;
  name: string;
  provider: string;
  category: string;
  interestRate: number;
  minInvestment: number;
  tenure: number; // in months
  riskLevel: 'Very Low' | 'Low' | 'Moderate' | 'High';
  taxability: 'Tax Free' | 'Taxable';
  liquidityRating: number; // 1-5, 5 being most liquid
  creditRating?: string;
  specialFeatures?: string[];
}

export const StableReturnFixedIncomeAggregator: React.FC = () => {
  const [products, setProducts] = useState<FixedIncomeProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<FixedIncomeProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedTaxability, setSelectedTaxability] = useState<string>('All');
  const [minInterestRate, setMinInterestRate] = useState<number>(5);
  const [minTenure, setMinTenure] = useState<number>(0);
  const [maxTenure, setMaxTenure] = useState<number>(120);
  const [minInvestment, setMinInvestment] = useState<number>(1000);
  const [maxInvestment, setMaxInvestment] = useState<number>(10000000);
  const [sortBy, setSortBy] = useState<string>('interestRate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<FixedIncomeProduct | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [investmentTenure, setInvestmentTenure] = useState<number>(12);
  
  // Sample fixed income products
  useEffect(() => {
    const sampleProducts: FixedIncomeProduct[] = [
      {
        id: "fd1",
        name: "Special Fixed Deposit",
        provider: "HDFC Bank",
        category: "Bank Fixed Deposit",
        interestRate: 7.1,
        minInvestment: 10000,
        tenure: 12,
        riskLevel: "Very Low",
        taxability: "Taxable",
        liquidityRating: 3,
        creditRating: "AAA",
        specialFeatures: ["Senior Citizen Additional Rate: 0.5%", "Premature Withdrawal Allowed"]
      },
      {
        id: "fd2",
        name: "Tax Saver Fixed Deposit",
        provider: "SBI",
        category: "Bank Fixed Deposit",
        interestRate: 6.9,
        minInvestment: 1000,
        tenure: 60,
        riskLevel: "Very Low",
        taxability: "Taxable",
        liquidityRating: 1,
        creditRating: "AAA",
        specialFeatures: ["Tax Benefit under Section 80C", "5-year Lock-in Period"]
      },
      {
        id: "cb1",
        name: "Corporate Bond Fund",
        provider: "ICICI Prudential",
        category: "Debt Mutual Fund",
        interestRate: 8.2,
        minInvestment: 5000,
        tenure: 36,
        riskLevel: "Low",
        taxability: "Taxable",
        liquidityRating: 4,
        specialFeatures: ["Indexation Benefit after 3 years", "No Lock-in Period"]
      },
      {
        id: "ppf1",
        name: "Public Provident Fund",
        provider: "Government of India",
        category: "Government Scheme",
        interestRate: 7.1,
        minInvestment: 500,
        tenure: 180,
        riskLevel: "Very Low",
        taxability: "Tax Free",
        liquidityRating: 2,
        specialFeatures: ["EEE Tax Status", "Partial Withdrawal after 7 years", "Loan Facility"]
      },
      {
        id: "scss1",
        name: "Senior Citizen Savings Scheme",
        provider: "Government of India",
        category: "Government Scheme",
        interestRate: 8.2,
        minInvestment: 1000,
        tenure: 60,
        riskLevel: "Very Low",
        taxability: "Taxable",
        liquidityRating: 2,
        specialFeatures: ["Tax Benefit under Section 80C", "Quarterly Interest Payout"]
      },
      {
        id: "nsc1",
        name: "National Savings Certificate",
        provider: "Government of India",
        category: "Government Scheme",
        interestRate: 7.7,
        minInvestment: 1000,
        tenure: 60,
        riskLevel: "Very Low",
        taxability: "Taxable",
        liquidityRating: 2,
        specialFeatures: ["Tax Benefit under Section 80C", "Can be used as Collateral for Loans"]
      },
      {
        id: "kvp1",
        name: "Kisan Vikas Patra",
        provider: "Government of India",
        category: "Government Scheme",
        interestRate: 7.5,
        minInvestment: 1000,
        tenure: 123,
        riskLevel: "Very Low",
        taxability: "Taxable",
        liquidityRating: 2,
        specialFeatures: ["Investment Doubles in 123 months", "Transferable Certificate"]
      },
      {
        id: "rbi1",
        name: "RBI Floating Rate Savings Bond",
        provider: "Reserve Bank of India",
        category: "Government Bond",
        interestRate: 7.15,
        minInvestment: 1000,
        tenure: 84,
        riskLevel: "Very Low",
        taxability: "Taxable",
        liquidityRating: 1,
        specialFeatures: ["Interest Rate linked to NSC + 0.35%", "Half-yearly Interest Payout"]
      },
      {
        id: "cd1",
        name: "Company Fixed Deposit",
        provider: "Bajaj Finance",
        category: "Corporate Deposit",
        interestRate: 8.6,
        minInvestment: 25000,
        tenure: 36,
        riskLevel: "Moderate",
        taxability: "Taxable",
        liquidityRating: 2,
        creditRating: "AAA",
        specialFeatures: ["Senior Citizen Additional Rate: 0.25%", "Cumulative & Non-Cumulative Options"]
      },
      {
        id: "cd2",
        name: "Company Fixed Deposit",
        provider: "Shriram Transport Finance",
        category: "Corporate Deposit",
        interestRate: 9.2,
        minInvestment: 5000,
        tenure: 60,
        riskLevel: "Moderate",
        taxability: "Taxable",
        liquidityRating: 2,
        creditRating: "AA+",
        specialFeatures: ["Monthly Income Option Available", "Premature Withdrawal Allowed"]
      },
      {
        id: "mip1",
        name: "Monthly Income Plan",
        provider: "Post Office",
        category: "Government Scheme",
        interestRate: 7.4,
        minInvestment: 1000,
        tenure: 60,
        riskLevel: "Very Low",
        taxability: "Taxable",
        liquidityRating: 2,
        specialFeatures: ["Monthly Interest Payout", "Joint Holding Allowed"]
      },
      {
        id: "td1",
        name: "Time Deposit",
        provider: "Post Office",
        category: "Government Scheme",
        interestRate: 7.0,
        minInvestment: 1000,
        tenure: 24,
        riskLevel: "Very Low",
        taxability: "Taxable",
        liquidityRating: 2,
        specialFeatures: ["Premature Withdrawal Allowed", "Transferable Certificate"]
      },
      {
        id: "sgb1",
        name: "Sovereign Gold Bond",
        provider: "Government of India",
        category: "Gold Bond",
        interestRate: 2.5,
        minInvestment: 5000,
        tenure: 96,
        riskLevel: "Low",
        taxability: "Tax Free",
        liquidityRating: 3,
        specialFeatures: ["Additional Returns from Gold Price Appreciation", "Capital Gains Tax Exemption on Maturity"]
      },
      {
        id: "nps1",
        name: "NPS Tier II - Corporate Debt",
        provider: "PFRDA",
        category: "Pension Fund",
        interestRate: 8.5,
        minInvestment: 1000,
        tenure: 0,
        riskLevel: "Low",
        taxability: "Taxable",
        liquidityRating: 4,
        specialFeatures: ["Low Fund Management Charges", "No Lock-in Period"]
      },
      {
        id: "lf1",
        name: "Liquid Fund",
        provider: "Aditya Birla Sun Life",
        category: "Debt Mutual Fund",
        interestRate: 6.2,
        minInvestment: 1000,
        tenure: 0,
        riskLevel: "Very Low",
        taxability: "Taxable",
        liquidityRating: 5,
        specialFeatures: ["T+1 Redemption", "No Exit Load"]
      }
    ];
    
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
    
    // Set initial investment amount for first product
    if (sampleProducts.length > 0) {
      setInvestmentAmount(Math.max(sampleProducts[0].minInvestment, 100000));
      setInvestmentTenure(sampleProducts[0].tenure || 12);
    }
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply risk filter
    if (selectedRisk !== 'All') {
      result = result.filter(product => product.riskLevel === selectedRisk);
    }
    
    // Apply taxability filter
    if (selectedTaxability !== 'All') {
      result = result.filter(product => product.taxability === selectedTaxability);
    }
    
    // Apply interest rate filter
    result = result.filter(product => product.interestRate >= minInterestRate);
    
    // Apply tenure filter
    result = result.filter(product => 
      (product.tenure === 0 || product.tenure >= minTenure) && 
      (product.tenure === 0 || product.tenure <= maxTenure)
    );
    
    // Apply investment range filter
    result = result.filter(product => 
      product.minInvestment >= minInvestment && product.minInvestment <= maxInvestment
    );
    
    // Apply sorting
    result.sort((a, b) => {
      let valueA = a[sortBy as keyof FixedIncomeProduct];
      let valueB = b[sortBy as keyof FixedIncomeProduct];
      
      // Handle special case for liquidityRating (higher is better)
      if (sortBy === 'liquidityRating') {
        return sortOrder === 'desc' ? (valueB as number) - (valueA as number) : (valueA as number) - (valueB as number);
      }
      
      // Handle numeric values
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
      }
      
      // Handle string values
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'desc' 
          ? valueB.localeCompare(valueA) 
          : valueA.localeCompare(valueB);
      }
      
      return 0;
    });
    
    setFilteredProducts(result);
  }, [
    searchTerm, 
    selectedCategory, 
    selectedRisk, 
    selectedTaxability, 
    minInterestRate, 
    minTenure, 
    maxTenure, 
    minInvestment, 
    maxInvestment, 
    sortBy, 
    sortOrder, 
    products
  ]);
  
  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  // Get unique risk levels
  const riskLevels = ['All', 'Very Low', 'Low', 'Moderate', 'High'];
  
  // Get unique taxability options
  const taxabilityOptions = ['All', 'Tax Free', 'Taxable'];
  
  // Open product details
  const openProductDetails = (product: FixedIncomeProduct) => {
    setSelectedProduct(product);
    setInvestmentAmount(Math.max(product.minInvestment, investmentAmount));
    setInvestmentTenure(product.tenure || 12);
  };
  
  // Close product details
  const closeProductDetails = () => {
    setSelectedProduct(null);
  };
  
  // Get risk color
  const getRiskColor = (risk: 'Very Low' | 'Low' | 'Moderate' | 'High') => {
    switch (risk) {
      case 'Very Low':
        return 'bg-[--success-100] text-[--success-800]';
      case 'Low':
        return 'bg-[--success-100] text-[--success-800]';
      case 'Moderate':
        return 'bg-[--warning-100] text-[--warning-800]';
      case 'High':
        return 'bg-[--error-100] text-[--error-800]';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };
  
  // Calculate returns
  const calculateReturns = (amount: number, rate: number, tenure: number) => {
    // Simple interest calculation for demonstration
    // In a real app, you'd use compound interest for some products
    const interest = (amount * rate * tenure) / (100 * 12);
    return amount + interest;
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Stable Return Fixed Income Aggregator</h2>
        <p className="text-neutral-600">
          Compare and find the best fixed income investment options across banks, government schemes, and corporate deposits. Get stable returns with lower risk compared to equity investments.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, provider, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto w-full px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg flex items-center justify-center hover:bg-neutral-200"
          >
            <Filter className="h-5 w-5 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input w-full"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Risk Level
                </label>
                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  className="input w-full"
                >
                  {riskLevels.map((risk, index) => (
                    <option key={index} value={risk}>{risk}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Taxability
                </label>
                <select
                  value={selectedTaxability}
                  onChange={(e) => setSelectedTaxability(e.target.value)}
                  className="input w-full"
                >
                  {taxabilityOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Minimum Interest Rate: {minInterestRate}%
              </label>
              <input
                type="range"
                min="5"
                max="10"
                step="0.1"
                value={minInterestRate}
                onChange={(e) => setMinInterestRate(Number(e.target.value))}
                className="slider w-full"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tenure Range: {minTenure} - {maxTenure === 120 ? '120+' : maxTenure} months
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="6"
                    value={minTenure}
                    onChange={(e) => setMinTenure(Number(e.target.value))}
                    className="slider flex-grow"
                  />
                  <input
                    type="range"
                    min="12"
                    max="120"
                    step="12"
                    value={maxTenure}
                    onChange={(e) => setMaxTenure(Number(e.target.value))}
                    className="slider flex-grow"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Investment Range: {formatCurrency(minInvestment)} - {formatCurrency(maxInvestment)}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={minInvestment}
                    onChange={(e) => setMinInvestment(Number(e.target.value))}
                    className="slider flex-grow"
                  />
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="100000"
                    value={maxInvestment}
                    onChange={(e) => setMaxInvestment(Number(e.target.value))}
                    className="slider flex-grow"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Sort By
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSortBy('interestRate');
                    setSortOrder(sortBy === 'interestRate' && sortOrder === 'desc' ? 'asc' : 'desc');
                  }}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    sortBy === 'interestRate'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Interest Rate {sortBy === 'interestRate' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  onClick={() => {
                    setSortBy('tenure');
                    setSortOrder(sortBy === 'tenure' && sortOrder === 'desc' ? 'asc' : 'desc');
                  }}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    sortBy === 'tenure'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Tenure {sortBy === 'tenure' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  onClick={() => {
                    setSortBy('minInvestment');
                    setSortOrder(sortBy === 'minInvestment' && sortOrder === 'desc' ? 'asc' : 'desc');
                  }}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    sortBy === 'minInvestment'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Min. Investment {sortBy === 'minInvestment' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  onClick={() => {
                    setSortBy('liquidityRating');
                    setSortOrder(sortBy === 'liquidityRating' && sortOrder === 'desc' ? 'asc' : 'desc');
                  }}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    sortBy === 'liquidityRating'
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Liquidity {sortBy === 'liquidityRating' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Section */}
      {!selectedProduct && (
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Fixed Income Investment Options</h3>
          
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-lg text-neutral-600 mb-4">No products match your current filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedRisk('All');
                  setSelectedTaxability('All');
                  setMinInterestRate(5);
                  setMinTenure(0);
                  setMaxTenure(120);
                  setMinInvestment(1000);
                  setMaxInvestment(10000000);
                }}
                className="px-4 py-2 bg-[--primary-600] text-white rounded-lg hover:bg-[--primary-700]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Provider</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Interest Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Min. Investment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Tenure</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Risk</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Taxability</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredProducts.map((product) => (
                    <tr 
                      key={product.id}
                      className="hover:bg-neutral-50 cursor-pointer"
                      onClick={() => openProductDetails(product)}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-neutral-900">{product.name}</td>
                      <td className="px-4 py-3 text-sm text-neutral-600">{product.provider}</td>
                      <td className="px-4 py-3 text-sm text-neutral-600">{product.category}</td>
                      <td className="px-4 py-3 text-sm font-medium text-[--success-600]">{product.interestRate}%</td>
                      <td className="px-4 py-3 text-sm text-neutral-600">{formatCurrency(product.minInvestment)}</td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        {product.tenure === 0 ? 'Open-ended' : `${product.tenure} months`}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(product.riskLevel)}`}>
                          {product.riskLevel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">{product.taxability}</td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openProductDetails(product);
                          }}
                          className="text-[--primary-600] hover:text-[--primary-800]"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900">{selectedProduct.name}</h3>
                  <p className="text-neutral-600">{selectedProduct.provider} • {selectedProduct.category}</p>
                </div>
                <button
                  onClick={closeProductDetails}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-[--primary-50] rounded-lg">
                  <p className="text-sm text-neutral-500 mb-1">Interest Rate</p>
                  <p className="text-3xl font-bold text-[--primary-800]">{selectedProduct.interestRate}%</p>
                  <p className="text-xs text-[--primary-600] mt-1">
                    {selectedProduct.interestRate > 8 ? 'Above market average' : 'Competitive rate'}
                  </p>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-sm text-neutral-500 mb-1">Minimum Investment</p>
                  <p className="text-3xl font-bold text-neutral-900">{formatCurrency(selectedProduct.minInvestment)}</p>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-sm text-neutral-500 mb-1">Tenure</p>
                  <p className="text-3xl font-bold text-neutral-900">
                    {selectedProduct.tenure === 0 ? 'Open-ended' : `${selectedProduct.tenure} months`}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-3">Key Features</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                      <span className="text-sm text-neutral-700">Risk Level</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedProduct.riskLevel)}`}>
                        {selectedProduct.riskLevel}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                      <span className="text-sm text-neutral-700">Taxability</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedProduct.taxability === 'Tax Free' 
                          ? 'bg-[--success-100] text-[--success-800]' 
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {selectedProduct.taxability}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                      <span className="text-sm text-neutral-700">Liquidity</span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div 
                            key={rating}
                            className={`h-2 w-2 rounded-full mx-0.5 ${
                              rating <= selectedProduct.liquidityRating 
                                ? 'bg-[--primary-600]' 
                                : 'bg-neutral-300'
                            }`}
                          ></div>
                        ))}
                        <span className="text-xs text-neutral-500 ml-2">
                          {selectedProduct.liquidityRating === 5 
                            ? 'Very High' 
                            : selectedProduct.liquidityRating === 4 
                            ? 'High' 
                            : selectedProduct.liquidityRating === 3 
                            ? 'Medium' 
                            : selectedProduct.liquidityRating === 2 
                            ? 'Low' 
                            : 'Very Low'}
                        </span>
                      </div>
                    </div>
                    
                    {selectedProduct.creditRating && (
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                        <span className="text-sm text-neutral-700">Credit Rating</span>
                        <span className="text-sm font-medium text-neutral-900">{selectedProduct.creditRating}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-3">Special Features</h4>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <ul className="space-y-2">
                      {selectedProduct.specialFeatures?.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[--success-600] mr-2 flex-shrink-0" />
                          <span className="text-sm text-neutral-700">{feature}</span>
                        </li>
                      ))}
                      {!selectedProduct.specialFeatures?.length && (
                        <li className="text-sm text-neutral-500">No special features</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Return Calculator</h4>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Investment Amount (₹)
                      </label>
                      <input
                        type="number"
                        min={selectedProduct.minInvestment}
                        step={1000}
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                        className="input w-full"
                      />
                      <p className="mt-1 text-xs text-neutral-500">
                        Minimum investment: {formatCurrency(selectedProduct.minInvestment)}
                      </p>
                    </div>
                    
                    {selectedProduct.tenure !== 0 && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Investment Tenure (Months)
                        </label>
                        <input
                          type="number"
                          min={selectedProduct.tenure}
                          max={selectedProduct.tenure}
                          value={investmentTenure}
                          readOnly
                          className="input w-full bg-neutral-100"
                        />
                        <p className="mt-1 text-xs text-neutral-500">
                          Fixed tenure product
                        </p>
                      </div>
                    )}
                    
                    {selectedProduct.tenure === 0 && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Investment Tenure (Months)
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={120}
                          value={investmentTenure}
                          onChange={(e) => setInvestmentTenure(Number(e.target.value))}
                          className="input w-full"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-neutral-500 mb-1">Total Investment</p>
                      <p className="text-xl font-bold text-neutral-900">{formatCurrency(investmentAmount)}</p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
                      <p className="text-xl font-bold text-[--success-600]">
                        {formatCurrency(calculateReturns(investmentAmount, selectedProduct.interestRate, investmentTenure) - investmentAmount)}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm text-neutral-500 mb-1">Maturity Value</p>
                      <p className="text-xl font-bold text-[--success-600]">
                        {formatCurrency(calculateReturns(investmentAmount, selectedProduct.interestRate, investmentTenure))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[--accent-50] rounded-lg border border-[--accent-200] mb-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-[--accent-600] mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium text-[--accent-800] mb-1">Tax Implications</h4>
                    <p className="text-sm text-[--accent-700]">
                      {selectedProduct.taxability === 'Tax Free' 
                        ? 'This investment is tax-free. You do not need to pay any tax on the interest earned.' 
                        : selectedProduct.category === 'Debt Mutual Fund' 
                        ? 'Interest income is taxable as per your income tax slab. Long-term capital gains (holding period > 3 years) are taxed at 20% with indexation benefits.' 
                        : 'Interest income is taxable as per your income tax slab rate.'}
                    </p>
                    {selectedProduct.specialFeatures?.some(feature => feature.includes('Section 80C')) && (
                      <p className="text-sm text-[--accent-700] mt-2">
                        This investment qualifies for tax deduction under Section 80C of the Income Tax Act, up to ₹1.5 lakh per financial year.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={closeProductDetails}
                  className="px-4 py-3 rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200 font-medium"
                >
                  Back to Comparison
                </button>
                
                <a 
                  href={`https://www.${selectedProduct.provider.toLowerCase().replace(/\s+/g, '')}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-lg text-white bg-[--primary-600] hover:bg-[--primary-700] font-medium flex-grow sm:flex-grow-0 sm:flex-1 flex items-center justify-center"
                >
                  Invest Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">Understanding Fixed Income Investments</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-neutral-900 mb-2">What are Fixed Income Investments?</h4>
            <p className="text-sm text-neutral-600 mb-3">
              Fixed income investments are financial instruments that pay investors fixed interest or dividend payments until their maturity date. These investments provide a steady and predictable income stream, making them popular among conservative investors and those seeking regular income.
            </p>
            <p className="text-sm text-neutral-600">
              Common fixed income options in India include bank fixed deposits, government savings schemes, corporate deposits, and debt mutual funds. They typically offer lower returns compared to equity investments but come with significantly lower risk.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-neutral-900 mb-2">Key Considerations</h4>
            <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
              <li><strong>Interest Rate:</strong> Higher rates generally mean better returns but may come with increased risk</li>
              <li><strong>Tenure:</strong> Longer tenures typically offer higher interest rates but reduce liquidity</li>
              <li><strong>Liquidity:</strong> How easily you can access your money before maturity</li>
              <li><strong>Taxation:</strong> Different products have different tax implications</li>
              <li><strong>Safety:</strong> Government-backed options are safest, followed by bank deposits</li>
              <li><strong>Minimum Investment:</strong> The minimum amount required to invest</li>
              <li><strong>Credit Rating:</strong> For corporate deposits, indicates the issuer's ability to repay</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-[--primary-50] rounded-lg">
          <h4 className="font-medium text-[--primary-800] mb-2">Fixed Income Investment Strategies</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg">
              <h5 className="text-sm font-medium text-neutral-900 mb-1">Laddering</h5>
              <p className="text-xs text-neutral-600">
                Invest in fixed income products with different maturity dates to balance liquidity needs and maximize returns. This provides regular access to funds while maintaining overall returns.
              </p>
            </div>
            
            <div className="p-3 bg-white rounded-lg">
              <h5 className="text-sm font-medium text-neutral-900 mb-1">Diversification</h5>
              <p className="text-xs text-neutral-600">
                Spread investments across different types of fixed income products and issuers to reduce risk. Include government securities, bank deposits, and high-rated corporate bonds.
              </p>
            </div>
            
            <div className="p-3 bg-white rounded-lg">
              <h5 className="text-sm font-medium text-neutral-900 mb-1">Tax Optimization</h5>
              <p className="text-xs text-neutral-600">
                Choose tax-efficient options based on your tax bracket. Consider tax-free bonds, PPF, or debt funds with indexation benefits for long-term investments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 border border-[--primary-100] mt-8">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Related Investment Tools</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            href="/calculators/fd-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">FD Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate returns on fixed deposits</p>
          </a>
          <a 
            href="/calculators/ppf-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">PPF Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate returns on Public Provident Fund</p>
          </a>
          <a 
            href="/calculators/post-office-schemes-calculator" 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-[--primary-800] mb-1">Post Office Schemes Calculator</h4>
            <p className="text-xs text-[--primary-600]">Calculate returns on various post office schemes</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StableReturnFixedIncomeAggregator;