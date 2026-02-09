import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, Plus, Trash2, ArrowDown, ArrowUp, Info, AlertTriangle, Download } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  cryptocurrency: string;
  date: string;
  quantity: number;
  pricePerUnit: number;
  totalValue: number;
  fees: number;
}

export const CryptoTaxEstimator: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [financialYear, setFinancialYear] = useState<string>('2024-25');
  const [taxRate, setTaxRate] = useState<number>(30);
  const [surcharge, setSurcharge] = useState<number>(0);
  const [cess, setCess] = useState<number>(4);
  
  // Calculated values
  const [shortTermGains, setShortTermGains] = useState<number>(0);
  const [longTermGains, setLongTermGains] = useState<number>(0);
  const [totalTaxLiability, setTotalTaxLiability] = useState<number>(0);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState<number>(0);
  
  // Cryptocurrency options
  const cryptocurrencies = [
    'Bitcoin (BTC)',
    'Ethereum (ETH)',
    'Binance Coin (BNB)',
    'Ripple (XRP)',
    'Cardano (ADA)',
    'Solana (SOL)',
    'Polkadot (DOT)',
    'Dogecoin (DOGE)',
    'Avalanche (AVAX)',
    'Polygon (MATIC)'
  ];
  
  const [showFAQ, setShowFAQ] = useState(false);
  
  // Add a new transaction
  const addTransaction = () => {
    const today = new Date().toISOString().split('T')[0];
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'buy',
      cryptocurrency: cryptocurrencies[0],
      date: today,
      quantity: 0,
      pricePerUnit: 0,
      totalValue: 0,
      fees: 0
    };
    
    setTransactions([...transactions, newTransaction]);
  };
  
  // Remove a transaction
  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };
  
  // Update a transaction
  const updateTransaction = (id: string, field: keyof Transaction, value: any) => {
    setTransactions(transactions.map(t => {
      if (t.id === id) {
        const updatedTransaction = { ...t, [field]: value };
        
        // Recalculate total value if quantity or price changes
        if (field === 'quantity' || field === 'pricePerUnit') {
          updatedTransaction.totalValue = updatedTransaction.quantity * updatedTransaction.pricePerUnit;
        }
        
        return updatedTransaction;
      }
      return t;
    }));
  };
  
  // Calculate tax liability
  useEffect(() => {
    // In India, all crypto gains are treated as short-term gains regardless of holding period
    // and taxed at a flat 30% rate (as of 2023)
    
    // Calculate gains for each sell transaction
    let totalGains = 0;
    
    // Get all buy transactions
    const buyTransactions = [...transactions].filter(t => t.type === 'buy').sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Get all sell transactions
    const sellTransactions = [...transactions].filter(t => t.type === 'sell').sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Calculate gains using FIFO (First In, First Out) method
    sellTransactions.forEach(sellTx => {
      let remainingQuantityToSell = sellTx.quantity;
      let costBasis = 0;
      
      // Find matching buy transactions for this cryptocurrency
      const matchingBuyTxs = buyTransactions.filter(buyTx => 
        buyTx.cryptocurrency === sellTx.cryptocurrency
      );
      
      for (const buyTx of matchingBuyTxs) {
        if (remainingQuantityToSell <= 0) break;
        
        // Skip buy transactions that occur after the sell transaction
        if (new Date(buyTx.date) > new Date(sellTx.date)) continue;
        
        // Calculate how much of this buy transaction to use
        const quantityFromThisBuy = Math.min(buyTx.quantity, remainingQuantityToSell);
        
        // Add to cost basis
        costBasis += quantityFromThisBuy * buyTx.pricePerUnit;
        
        // Reduce remaining quantity to sell
        remainingQuantityToSell -= quantityFromThisBuy;
      }
      
      // Calculate gain or loss
      const saleProceeds = sellTx.totalValue - sellTx.fees;
      const gain = saleProceeds - costBasis;
      
      // Add to total gains (losses are not allowed to be offset in India)
      totalGains += Math.max(0, gain);
    });
    
    // Calculate tax components
    const baseTax = totalGains * (taxRate / 100);
    const surchargeAmount = baseTax * (surcharge / 100);
    const cessAmount = (baseTax + surchargeAmount) * (cess / 100);
    
    const totalTax = baseTax + surchargeAmount + cessAmount;
    
    // Set calculated values
    setShortTermGains(totalGains);
    setLongTermGains(0); // No long-term gains concept for crypto in India
    setTotalTaxLiability(totalTax);
    setEffectiveTaxRate(totalGains > 0 ? (totalTax / totalGains) * 100 : 0);
    
  }, [transactions, taxRate, surcharge, cess]);
  
  // Load sample data
  const loadSampleData = () => {
    const sampleTransactions: Transaction[] = [
      {
        id: '1',
        type: 'buy',
        cryptocurrency: 'Bitcoin (BTC)',
        date: '2023-04-15',
        quantity: 0.5,
        pricePerUnit: 3500000,
        totalValue: 1750000,
        fees: 1750
      },
      {
        id: '2',
        type: 'buy',
        cryptocurrency: 'Ethereum (ETH)',
        date: '2023-05-20',
        quantity: 5,
        pricePerUnit: 150000,
        totalValue: 750000,
        fees: 750
      },
      {
        id: '3',
        type: 'sell',
        cryptocurrency: 'Bitcoin (BTC)',
        date: '2023-12-10',
        quantity: 0.2,
        pricePerUnit: 4500000,
        totalValue: 900000,
        fees: 900
      },
      {
        id: '4',
        type: 'buy',
        cryptocurrency: 'Solana (SOL)',
        date: '2023-08-05',
        quantity: 20,
        pricePerUnit: 7500,
        totalValue: 150000,
        fees: 150
      },
      {
        id: '5',
        type: 'sell',
        cryptocurrency: 'Ethereum (ETH)',
        date: '2024-01-15',
        quantity: 2,
        pricePerUnit: 200000,
        totalValue: 400000,
        fees: 400
      }
    ];
    
    setTransactions(sampleTransactions);
  };
  
  // Clear all transactions
  const clearTransactions = () => {
    setTransactions([]);
  };
  
  // Export transactions as CSV
  const exportToCsv = () => {
    const headers = ['Type', 'Cryptocurrency', 'Date', 'Quantity', 'Price Per Unit', 'Total Value', 'Fees'];
    const csvData = transactions.map(t => 
      `${t.type},${t.cryptocurrency},${t.date},${t.quantity},${t.pricePerUnit},${t.totalValue},${t.fees}`
    );
    
    const csv = [
      headers.join(','),
      ...csvData
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'crypto_transactions.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <>
      <SEOHelmet
        title="Crypto Tax Calculator India - Estimate Crypto Tax Online | Fincal"
        description="Calculate your cryptocurrency tax liability in India. Add your buy and sell transactions to estimate your capital gains tax as per Indian regulations. Fully mobile-friendly, SEO-optimized, and easy to use."
        keywords="crypto tax calculator India, cryptocurrency tax, crypto gains tax, crypto TDS, crypto tax estimator, crypto tax online, Indian crypto tax rules"
        url="/calculators/crypto-tax-estimator"
        tags={["crypto tax calculator", "crypto tax India", "cryptocurrency tax", "tax estimator", "crypto TDS"]}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "Crypto Tax Calculator India",
          "description": "Calculate your cryptocurrency tax liability in India. Add your buy and sell transactions to estimate your capital gains tax as per Indian regulations.",
          "url": "https://fincal.in/calculators/crypto-tax-estimator",
          "provider": {
            "@type": "Organization",
            "name": "Fincal"
          },
          "serviceType": "Crypto Tax Calculator"
        })}
      </script>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Crypto Tax Estimator</h2>
            <p className="text-neutral-600 mb-2">
              Calculate your cryptocurrency tax liability in India. Add your buy and sell transactions to estimate your capital gains tax based on current regulations.
            </p>
          </div>
          <button
            className="text-sm text-[--primary-600] hover:text-[--primary-800] underline md:ml-4"
            aria-label="Show Crypto Tax FAQ"
            onClick={() => setShowFAQ(true)}
          >
            How does this work?
          </button>
        </div>

        {/* Tax Settings Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tax Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Financial Year
              </label>
              <select
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
                className="input w-full"
              >
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
                <option value="2022-23">2022-23</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="input w-full"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Surcharge (%)
              </label>
              <select
                value={surcharge}
                onChange={(e) => setSurcharge(Number(e.target.value))}
                className="input w-full"
              >
                <option value="0">No Surcharge (Income ≤ ₹50 Lakhs)</option>
                <option value="10">10% (Income &gt; ₹50 Lakhs to ₹1 Cr)</option>
                <option value="15">15% (Income &gt; ₹1 Cr to ₹2 Cr)</option>
                <option value="25">25% (Income &gt; ₹2 Cr to ₹5 Cr)</option>
                <option value="37">37% (Income &gt; ₹5 Cr)</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-[--primary-50] rounded-lg">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-[--primary-600] mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-[--primary-800] mb-1">Current Crypto Tax Rules in India</h4>
                <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
                  <li>30% flat tax rate on crypto gains (no distinction between short-term and long-term)</li>
                  <li>1% TDS on all crypto transactions above ₹10,000</li>
                  <li>No offsetting of losses against other income or carrying forward losses</li>
                  <li>No indexation benefits available</li>
                  <li>4% Health and Education Cess applicable on the tax amount</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Crypto Transactions</h3>
            <div className="flex space-x-2">
              <button 
                onClick={loadSampleData}
                className="text-sm text-[--primary-600] hover:text-[--primary-800] flex items-center"
              >
                Load Sample Data
              </button>
              <button 
                onClick={clearTransactions}
                className="text-sm text-neutral-600 hover:text-neutral-800 flex items-center"
              >
                Clear All
              </button>
              <button 
                onClick={exportToCsv}
                className="text-sm text-neutral-600 hover:text-neutral-800 flex items-center"
                disabled={transactions.length === 0}
              >
                <Download className="h-4 w-4 mr-1" />
                Export CSV
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Cryptocurrency
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Price (₹)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Total Value (₹)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Fees (₹)
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-2">
                      <select
                        value={transaction.type}
                        onChange={(e) => updateTransaction(transaction.id, 'type', e.target.value)}
                        className="border-0 bg-transparent focus:ring-0 p-0 text-sm"
                      >
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={transaction.cryptocurrency}
                        onChange={(e) => updateTransaction(transaction.id, 'cryptocurrency', e.target.value)}
                        className="border-0 bg-transparent focus:ring-0 p-0 text-sm w-full"
                      >
                        {cryptocurrencies.map((crypto, index) => (
                          <option key={index} value={crypto}>{crypto}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="date"
                        value={transaction.date}
                        onChange={(e) => updateTransaction(transaction.id, 'date', e.target.value)}
                        className="border-0 bg-transparent focus:ring-0 p-0 text-sm"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={transaction.quantity}
                        onChange={(e) => updateTransaction(transaction.id, 'quantity', Number(e.target.value))}
                        className="border-0 bg-transparent focus:ring-0 p-0 text-sm w-20"
                        min="0"
                        step="0.000001"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={transaction.pricePerUnit}
                        onChange={(e) => updateTransaction(transaction.id, 'pricePerUnit', Number(e.target.value))}
                        className="border-0 bg-transparent focus:ring-0 p-0 text-sm w-24"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm font-medium">
                      {formatCurrency(transaction.totalValue)}
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={transaction.fees}
                        onChange={(e) => updateTransaction(transaction.id, 'fees', Number(e.target.value))}
                        className="border-0 bg-transparent focus:ring-0 p-0 text-sm w-20"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeTransaction(transaction.id)}
                        className="text-neutral-400 hover:text-[--error-600]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <button
              onClick={addTransaction}
              className="flex items-center text-[--primary-600] hover:text-[--primary-800]"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Tax Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tax Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Total Taxable Gains</span>
                    <span className="text-lg font-semibold text-neutral-900">{formatCurrency(shortTermGains)}</span>
                  </div>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-neutral-600">Base Tax (30%)</span>
                    <span className="text-sm font-medium text-neutral-900">{formatCurrency(shortTermGains * 0.3)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-neutral-600">Surcharge ({surcharge}%)</span>
                    <span className="text-sm font-medium text-neutral-900">{formatCurrency(shortTermGains * 0.3 * (surcharge / 100))}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-neutral-600">Health & Education Cess (4%)</span>
                    <span className="text-sm font-medium text-neutral-900">
                      {formatCurrency((shortTermGains * 0.3 * (1 + surcharge / 100)) * 0.04)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-neutral-200">
                    <span className="text-sm font-medium text-neutral-700">Total Tax Liability</span>
                    <span className="text-lg font-semibold text-[--error-600]">{formatCurrency(totalTaxLiability)}</span>
                  </div>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Effective Tax Rate</span>
                    <span className="text-lg font-semibold text-neutral-900">
                      {effectiveTaxRate.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="p-4 bg-[--warning-50] rounded-lg border border-[--warning-200] mb-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-[--warning-600] mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium text-[--warning-800] mb-1">Important Tax Notes</h4>
                    <ul className="list-disc list-inside text-sm text-[--warning-700] space-y-1">
                      <li>Losses from one cryptocurrency cannot be offset against gains from another</li>
                      <li>Crypto-to-crypto transactions are also taxable events</li>
                      <li>1% TDS is applicable on all transactions above ₹10,000</li>
                      <li>Infrastructure costs (mining equipment, etc.) are not deductible</li>
                      <li>Gifted cryptocurrencies are taxable in the hands of the recipient</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[--primary-50] rounded-lg">
                <h4 className="font-medium text-[--primary-800] mb-2">Tax Saving Strategies</h4>
                <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-2">
                  <li>Hold investments for at least 24 months to potentially benefit from future long-term capital gains provisions (if introduced)</li>
                  <li>Consider tax-loss harvesting by selling underperforming assets before the end of the financial year</li>
                  <li>Keep detailed records of all transactions, including fees and acquisition costs</li>
                  <li>Consider investing through SIPs to average out purchase costs</li>
                  <li>Consult with a tax professional for personalized advice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* TDS Calculation Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">TDS Calculation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-neutral-600 mb-4">
                As per Section 194S of the Income Tax Act, a 1% TDS is applicable on the transfer of Virtual Digital Assets (VDAs) where the payment exceeds ₹10,000 in a financial year. This TDS is deducted by the person responsible for paying the consideration.
              </p>
              
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h4 className="font-medium text-neutral-900 mb-2">Estimated TDS</h4>
                <div className="space-y-2">
                  {transactions.filter(t => t.type === 'sell' && t.totalValue >= 10000).map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">
                        {transaction.cryptocurrency} ({new Date(transaction.date).toLocaleDateString()})
                      </span>
                      <span className="text-sm font-medium text-neutral-900">
                        {formatCurrency(transaction.totalValue * 0.01)}
                      </span>
                    </div>
                  ))}
                  
                  {transactions.filter(t => t.type === 'sell' && t.totalValue >= 10000).length === 0 && (
                    <p className="text-sm text-neutral-500 italic">No transactions subject to TDS</p>
                  )}
                  
                  <div className="pt-2 border-t border-neutral-200 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-neutral-700">Total TDS</span>
                      <span className="text-lg font-semibold text-neutral-900">
                        {formatCurrency(transactions
                          .filter(t => t.type === 'sell' && t.totalValue >= 10000)
                          .reduce((sum, t) => sum + t.totalValue * 0.01, 0)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="p-4 bg-[--accent-50] rounded-lg mb-4">
                <h4 className="font-medium text-[--accent-800] mb-2">TDS Exemptions</h4>
                <ul className="list-disc list-inside text-sm text-[--accent-700] space-y-1">
                  <li>No TDS if the value of transactions during the financial year doesn't exceed ₹10,000</li>
                  <li>No TDS if the payer is an individual/HUF whose total sales/gross receipts/turnover from business doesn't exceed ₹1 crore (₹50 lakh for profession) during the preceding financial year</li>
                  <li>Exchanges may deduct TDS on your behalf for transactions conducted through them</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[--accent-50] rounded-lg">
                <h4 className="font-medium text-[--accent-800] mb-2">Important Notes</h4>
                <ul className="list-disc list-inside text-sm text-[--accent-700] space-y-1">
                  <li>TDS is not the final tax liability; it's an advance tax collection mechanism</li>
                  <li>You still need to calculate and pay the full tax on your crypto gains</li>
                  <li>TDS paid can be claimed as a credit against your final tax liability</li>
                  <li>Maintain proper documentation of TDS deducted for filing your income tax return</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Understanding Crypto Taxation in India</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-neutral-900 mb-2">Key Tax Rules</h4>
              <ul className="list-disc list-inside text-sm text-neutral-600 space-y-2">
                <li>30% flat tax on income from transfer of virtual digital assets</li>
                <li>No deduction except cost of acquisition</li>
                <li>No set-off of losses against any other income</li>
                <li>No carry forward of losses to subsequent years</li>
                <li>Gift of virtual digital assets is taxable in the hands of the recipient</li>
                <li>1% TDS on transfer of virtual digital assets above threshold limits</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-neutral-900 mb-2">Taxable Events</h4>
              <ul className="list-disc list-inside text-sm text-neutral-600 space-y-2">
                <li><strong>Selling crypto for INR:</strong> Taxable at 30%</li>
                <li><strong>Trading one crypto for another:</strong> Taxable at 30%</li>
                <li><strong>Using crypto to purchase goods/services:</strong> Taxable at 30%</li>
                <li><strong>Mining rewards:</strong> Taxable at 30% when sold</li>
                <li><strong>Staking rewards:</strong> Taxable at 30% when sold</li>
                <li><strong>Airdrops:</strong> Taxable at 30% when sold</li>
                <li><strong>DeFi yields:</strong> Taxable at 30% when sold</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[--primary-50] rounded-lg">
            <h4 className="font-medium text-[--primary-800] mb-2">Record Keeping Requirements</h4>
            <p className="text-sm text-[--primary-700] mb-3">
              Maintaining detailed records is crucial for accurate crypto tax reporting. Keep track of:
            </p>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li>Date and time of each transaction</li>
              <li>Type of transaction (buy, sell, trade, etc.)</li>
              <li>Quantity and value of cryptocurrency</li>
              <li>Transaction fees paid</li>
              <li>Wallet addresses involved</li>
              <li>Exchange or platform used</li>
              <li>Purpose of the transaction</li>
              <li>TDS certificates and payment proofs</li>
            </ul>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="bg-[--primary-50] rounded-lg p-6 border border-[--primary-100] mt-8">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Related Investment Tools</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="/calculators/capital-gains-tax-advanced-calculator" 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h4 className="font-medium text-[--primary-800] mb-1">Capital Gains Tax Calculator</h4>
              <p className="text-xs text-[--primary-600]">Calculate tax on various investment gains</p>
            </a>
            <a 
              href="/calculators/income-tax-calculator" 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h4 className="font-medium text-[--primary-800] mb-1">Income Tax Calculator</h4>
              <p className="text-xs text-[--primary-600]">Calculate your overall income tax liability</p>
            </a>
            <a 
              href="/calculators/tds-calculator" 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h4 className="font-medium text-[--primary-800] mb-1">TDS Calculator</h4>
              <p className="text-xs text-[--primary-600]">Calculate TDS for various income types</p>
            </a>
          </div>
        </div>
        <div className="fixed bottom-4 right-4 z-50 md:hidden">
          <button
            onClick={addTransaction}
            className="bg-[--primary-600] text-white rounded-full shadow-lg px-6 py-3 font-bold text-lg hover:bg-[--primary-700] focus:outline-none focus:ring-2 focus:ring-[--primary-400]"
            aria-label="Add Transaction"
          >
            + Add Transaction
          </button>
        </div>
        {/* FAQ Modal */}
        {showFAQ && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button
                className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700"
                aria-label="Close FAQ"
                onClick={() => setShowFAQ(false)}
              >
                ×
              </button>
              <h3 className="text-xl font-bold mb-4">Crypto Tax Calculator FAQ</h3>
              <ul className="list-disc list-inside text-sm text-neutral-700 space-y-2">
                <li><strong>Is this calculator updated for 2024?</strong> Yes, it uses the latest Indian crypto tax rules.</li>
                <li><strong>Is my data saved?</strong> No, all calculations are done in your browser and not stored.</li>
                <li><strong>Can I export my transactions?</strong> Yes, use the Export CSV button.</li>
                <li><strong>Is this tool free?</strong> 100% free for all users.</li>
                <li><strong>Is this mobile-friendly?</strong> Yes, fully responsive and easy to use on any device.</li>
                <li><strong>Where can I get more help?</strong> See the info and notes sections below, or contact us via the site.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CryptoTaxEstimator;