import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Calculator, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, Shield } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface PFNPSComparison {
  monthlyContribution: number;
  years: number;
  pfCorpus: number;
  npsCorpus: number;
  pfTaxBenefit: number;
  npsTaxBenefit: number;
  pfNetAmount: number;
  npsNetAmount: number;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const PFvsNPSTaxGrowthComparison: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState<string>('');
  const [years, setYears] = useState<string>('30');
  const [incomeTaxSlab, setIncomeTaxSlab] = useState<string>('30');
  const [comparison, setComparison] = useState<PFNPSComparison | null>(null);

  const calculatePFNPSComparison = () => {
    if (!monthlyContribution || !years || !incomeTaxSlab) {
      alert('Please fill in all fields');
      return;
    }

    const monthly = parseFloat(monthlyContribution);
    const yearsNum = parseFloat(years);
    const taxSlab = parseFloat(incomeTaxSlab);
    
    // PF calculations (8.1% interest, tax-free)
    const pfRate = 8.1;
    const pfCorpus = monthly * 12 * (Math.pow(1 + pfRate/100, yearsNum) - 1) / (pfRate/100);
    const pfTaxBenefit = (monthly * 12 * taxSlab / 100) * yearsNum; // Annual tax benefit
    const pfNetAmount = pfCorpus + pfTaxBenefit;
    
    // NPS calculations (10% interest, partially taxable)
    const npsRate = 10;
    const npsCorpus = monthly * 12 * (Math.pow(1 + npsRate/100, yearsNum) - 1) / (npsRate/100);
    const npsTaxBenefit = (monthly * 12 * taxSlab / 100) * yearsNum; // Annual tax benefit
    const npsTaxOnWithdrawal = npsCorpus * 0.1; // 10% tax on withdrawal
    const npsNetAmount = npsCorpus + npsTaxBenefit - npsTaxOnWithdrawal;
    
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (pfNetAmount > npsNetAmount) {
      recommendation = 'PF is better - Higher net returns with tax-free withdrawals';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else {
      recommendation = 'NPS is better - Higher growth potential despite withdrawal tax';
      color = 'text-blue-600';
      icon = <TrendingUp className="h-5 w-5" />;
    }

    setComparison({
      monthlyContribution: monthly,
      years: yearsNum,
      pfCorpus,
      npsCorpus,
      pfTaxBenefit,
      npsTaxBenefit,
      pfNetAmount,
      npsNetAmount,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setMonthlyContribution('');
    setYears('30');
    setIncomeTaxSlab('30');
    setComparison(null);
  };

  return (
    <>
      <SEOHelmet
        title="PF vs NPS Tax & Growth Comparison - Compare EPF vs NPS Returns | MoneyCal"
        description="Compare EPF vs NPS tax benefits and growth potential. Calculate which retirement scheme offers better returns with our PF vs NPS comparison calculator."
        keywords="PF vs NPS, EPF calculator, NPS calculator, retirement planning, tax benefits comparison, pension scheme comparison"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                PF vs NPS Tax & Growth Comparison
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare EPF and NPS to find the best retirement planning option for your financial goals
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-blue-600" />
                  Investment Parameters
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Contribution (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      placeholder="Enter monthly contribution"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (Years)
                    </label>
                    <select
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="10">10 Years</option>
                      <option value="15">15 Years</option>
                      <option value="20">20 Years</option>
                      <option value="25">25 Years</option>
                      <option value="30">30 Years</option>
                      <option value="35">35 Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Income Tax Slab (%)
                    </label>
                    <select
                      value={incomeTaxSlab}
                      onChange={(e) => setIncomeTaxSlab(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L - ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculatePFNPSComparison}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Compare Schemes
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  Comparison Results
                </h2>

                {comparison ? (
                  <div className="space-y-6">
                    {/* Recommendation */}
                    <div className={`text-center p-4 rounded-lg ${comparison.color.includes('green') ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${comparison.color}`}>
                        {comparison.icon}
                        <span className="ml-2 text-lg font-bold">Recommendation</span>
                      </div>
                      <p className="text-sm text-gray-600">{comparison.recommendation}</p>
                    </div>

                    {/* PF Details */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <Building2 className="h-5 w-5 mr-2" />
                        Employee Provident Fund (EPF)
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Interest Rate:</span>
                          <span className="font-bold text-green-600">8.1%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Corpus Amount:</span>
                          <span className="font-bold text-green-600">₹{comparison.pfCorpus.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Benefits:</span>
                          <span className="font-bold text-green-600">₹{comparison.pfTaxBenefit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Amount:</span>
                          <span className="font-bold text-green-600">₹{comparison.pfNetAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* NPS Details */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        National Pension System (NPS)
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Interest Rate:</span>
                          <span className="font-bold text-blue-600">10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Corpus Amount:</span>
                          <span className="font-bold text-blue-600">₹{comparison.npsCorpus.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Tax Benefits:</span>
                          <span className="font-bold text-blue-600">₹{comparison.npsTaxBenefit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Withdrawal Tax:</span>
                          <span className="font-bold text-red-600">-₹{(comparison.npsCorpus * 0.1).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Net Amount:</span>
                          <span className="font-bold text-blue-600">₹{comparison.npsNetAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Investment Period</p>
                        <p className="text-xl font-bold text-purple-600">{comparison.years} years</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Tax Slab</p>
                        <p className="text-xl font-bold text-orange-600">{incomeTaxSlab}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter investment details to compare PF vs NPS</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding PF vs NPS Comparison
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Employee Provident Fund (EPF)
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• 8.1% guaranteed interest rate</li>
                    <li>• Tax-free withdrawals</li>
                    <li>• Employer contribution (12%)</li>
                    <li>• Government backed security</li>
                    <li>• No withdrawal restrictions</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    National Pension System (NPS)
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Higher potential returns (10%)</li>
                    <li>• Market-linked returns</li>
                    <li>• Additional tax benefit (50K)</li>
                    <li>• 10% tax on withdrawal</li>
                    <li>• Annuity requirement (40%)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Key Differences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">EPF Advantages</h4>
                    <ul className="space-y-1 text-yellow-700 text-sm">
                      <li>• Tax-free withdrawals</li>
                      <li>• Guaranteed returns</li>
                      <li>• No market risk</li>
                      <li>• Flexible withdrawal</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">NPS Advantages</h4>
                    <ul className="space-y-1 text-yellow-700 text-sm">
                      <li>• Higher growth potential</li>
                      <li>• Additional tax benefits</li>
                      <li>• Professional management</li>
                      <li>• Diversified portfolio</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Related Retirement Planning Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/tax-tools/nps-calculator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">NPS Calculator</span>
                    <p className="text-sm text-purple-600">Calculate NPS returns and corpus</p>
                  </a>
                  <a href="/tax-tools/retirement-calculator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Retirement Calculator</span>
                    <p className="text-sm text-purple-600">Plan your retirement corpus</p>
                  </a>
                  <a href="/tax-tools/tax-efficient-withdrawal-planner" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Withdrawal Planner</span>
                    <p className="text-sm text-purple-600">Plan tax-efficient withdrawals</p>
                  </a>
                  <a href="/tax-tools/pension-calculator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Pension Calculator</span>
                    <p className="text-sm text-purple-600">Calculate pension benefits</p>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PFvsNPSTaxGrowthComparison;
