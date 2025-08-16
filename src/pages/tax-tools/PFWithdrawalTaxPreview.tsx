import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Download, Info, TrendingUp, AlertTriangle, FileText, Shield, Clock, DollarSign } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface PFWithdrawalEntry {
  id: string;
  type: 'full' | 'partial';
  amount: number;
  serviceYears: number;
  reason: string;
  isEmployed: boolean;
}

const PFWithdrawalTaxPreview: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState<PFWithdrawalEntry[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);
  const [isEmployed, setIsEmployed] = useState<boolean>(true);
  const [serviceYears, setServiceYears] = useState<number>(5);

  const calculateTax = (amount: number, years: number, employed: boolean, type: 'full' | 'partial') => {
    let taxRate = 0;
    
    if (type === 'full') {
      if (years < 5) {
        taxRate = 0.10; // 10% TDS
      } else if (years >= 5 && employed) {
        taxRate = 0.05; // 5% TDS if still employed
      } else {
        taxRate = 0; // No TDS if unemployed after 5 years
      }
    } else {
      // Partial withdrawal
      if (years < 5) {
        taxRate = 0.10;
      } else {
        taxRate = 0; // No TDS for partial withdrawal after 5 years
      }
    }
    
    return amount * taxRate;
  };

  const addWithdrawal = () => {
    const newWithdrawal: PFWithdrawalEntry = {
      id: Date.now().toString(),
      type: 'full',
      amount: 0,
      serviceYears: serviceYears,
      reason: '',
      isEmployed: isEmployed
    };
    
    setWithdrawals([...withdrawals, newWithdrawal]);
  };

  const updateWithdrawal = (id: string, field: keyof PFWithdrawalEntry, value: any) => {
    setWithdrawals(withdrawals.map(w => 
      w.id === id ? { ...w, [field]: value } : w
    ));
  };

  const removeWithdrawal = (id: string) => {
    setWithdrawals(withdrawals.filter(w => w.id !== id));
  };

  const calculateTotal = () => {
    const total = withdrawals.reduce((sum, w) => sum + w.amount, 0);
    const tax = withdrawals.reduce((sum, w) => 
      sum + calculateTax(w.amount, w.serviceYears, w.isEmployed, w.type), 0
    );
    
    setTotalAmount(total);
    setTotalTax(tax);
  };

  const getTaxStatus = (years: number, employed: boolean, type: 'full' | 'partial') => {
    if (type === 'full') {
      if (years < 5) return 'Taxable (10% TDS)';
      if (employed) return 'Taxable (5% TDS)';
      return 'Tax Free';
    } else {
      if (years < 5) return 'Taxable (10% TDS)';
      return 'Tax Free';
    }
  };

  const getRecommendation = () => {
    if (serviceYears < 5) {
      return "Consider waiting until 5 years of service to reduce tax liability on withdrawals.";
    }
    if (isEmployed) {
      return "If possible, consider withdrawing after leaving employment to avoid 5% TDS.";
    }
    return "You're eligible for tax-free withdrawals after 5 years of service.";
  };

  return (
    <>
      <SEOHelmet
        title="PF Withdrawal Tax Preview - Provident Fund Tax Calculator | MoneyCal"
        description="Calculate tax implications of PF withdrawals. Preview TDS rates, tax-free amounts, and optimize your Provident Fund withdrawal strategy with our comprehensive calculator."
        keywords="PF withdrawal tax, provident fund tax calculator, PF TDS calculator, EPF withdrawal tax, PF withdrawal rules, tax-free PF withdrawal, PF withdrawal after 5 years"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4"
              >
                <Shield className="h-8 w-8 text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                PF Withdrawal Tax Preview
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Calculate tax implications and TDS rates for your Provident Fund withdrawals. 
                Plan your PF exit strategy with our comprehensive tax preview tool.
              </p>
            </div>

            {/* Main Calculator */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Input Section */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <Calculator className="h-6 w-6 mr-2 text-blue-500" />
                    Withdrawal Details
                  </h2>

                  {/* Service Details */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Service
                      </label>
                      <input
                        type="number"
                        value={serviceYears}
                        onChange={(e) => setServiceYears(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        max="50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employment Status
                      </label>
                      <select
                        value={isEmployed ? 'employed' : 'unemployed'}
                        onChange={(e) => setIsEmployed(e.target.value === 'employed')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="employed">Currently Employed</option>
                        <option value="unemployed">Left Employment</option>
                      </select>
                    </div>
                  </div>

                  {/* Withdrawals List */}
                  <div className="space-y-4">
                    {withdrawals.map((withdrawal, index) => (
                      <motion.div
                        key={withdrawal.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-800">Withdrawal #{index + 1}</h4>
                          <button
                            onClick={() => removeWithdrawal(withdrawal.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Type
                            </label>
                            <select
                              value={withdrawal.type}
                              onChange={(e) => updateWithdrawal(withdrawal.id, 'type', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="full">Full Withdrawal</option>
                              <option value="partial">Partial Withdrawal</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Amount (₹)
                            </label>
                            <input
                              type="number"
                              value={withdrawal.amount}
                              onChange={(e) => updateWithdrawal(withdrawal.id, 'amount', Number(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Reason
                            </label>
                            <input
                              type="text"
                              value={withdrawal.reason}
                              onChange={(e) => updateWithdrawal(withdrawal.id, 'reason', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Retirement, Medical"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <button
                    onClick={addWithdrawal}
                    className="mt-4 w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Add Withdrawal Entry
                  </button>
                </motion.div>
              </div>

              {/* Results Section */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2 text-green-500" />
                    Tax Preview
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Total Withdrawal</span>
                        <span className="text-lg font-bold text-blue-600">₹{totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Total Tax (TDS)</span>
                        <span className="text-lg font-bold text-red-600">₹{totalTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Net Amount</span>
                        <span className="text-lg font-bold text-green-600">₹{(totalAmount - totalTax).toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={calculateTotal}
                      className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Calculate Tax
                    </button>

                    {/* Tax Status */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Tax Status</h4>
                      <div className="space-y-2">
                        {withdrawals.map((w, index) => (
                          <div key={w.id} className="flex justify-between text-sm">
                            <span>Withdrawal #{index + 1}:</span>
                            <span className={`font-medium ${
                              getTaxStatus(w.serviceYears, w.isEmployed, w.type).includes('Tax Free') 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {getTaxStatus(w.serviceYears, w.isEmployed, w.type)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                        Recommendation
                      </h4>
                      <p className="text-sm text-gray-700">{getRecommendation()}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Info className="h-6 w-6 mr-2 text-blue-500" />
                PF Withdrawal Tax Rules
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">TDS Rates</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Service &lt; 5 years</span>
                      <span className="text-sm font-bold text-red-600">10% TDS</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Service &ge; 5 years, Employed</span>
                      <span className="text-sm font-bold text-orange-600">5% TDS</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Service &ge; 5 years, Unemployed</span>
                      <span className="text-sm font-bold text-green-600">No TDS</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Points</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                      <span>5 years of continuous service is crucial for tax benefits</span>
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>Partial withdrawals after 5 years are generally tax-free</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                      <span>Form 15G/15H can be submitted to avoid TDS if eligible</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                      <span>EPF withdrawal is tax-free after 5 years of service</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Related Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white"
            >
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a 
                  href="/tax-tools/pf-vs-nps-tax-growth-comparison" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">PF vs NPS Comparison</h3>
                  <p className="text-sm opacity-90">Compare tax benefits and growth potential</p>
                </a>
                <a 
                  href="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">ELSS Tax Benefits</h3>
                  <p className="text-sm opacity-90">Visualize ELSS lock-in vs tax savings</p>
                </a>
                <a 
                  href="/tax-tools/80c-deduction-bucket-visualizer" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">80C Deductions</h3>
                  <p className="text-sm opacity-90">Optimize your 80C investment portfolio</p>
                </a>
                <a 
                  href="/tax-tools/tax-efficient-withdrawal-planner" 
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Plan tax-efficient investment withdrawals</p>
                </a>
              </div>
            </motion.div>

            <WhatsAppBanner />
            <AstroFinanceButton />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PFWithdrawalTaxPreview;
