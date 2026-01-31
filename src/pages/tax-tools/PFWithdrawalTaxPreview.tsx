import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Download, Info, TrendingUp, AlertTriangle, FileText, Shield, Clock, DollarSign, HelpCircle, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

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

  const canonicalUrl = 'https://moneycal.in/tax-tools/pf-withdrawal-tax-preview';
  const faqData = [
    { question: 'Is PF withdrawal tax-free after 5 years?', answer: 'Yes. EPF withdrawal after 5 years of continuous service is tax-free. If you withdraw before 5 years, 10% TDS may apply (unless Form 15G/15H is submitted and accepted). If you withdraw after 5 years while still employed, 5% TDS may apply on the taxable portion in some cases; after leaving employment, withdrawal is tax-free.' },
    { question: 'What is the TDS rate on PF withdrawal before 5 years?', answer: 'If service is less than 5 years, 10% TDS applies on PF withdrawal (unless you submit Form 15G/15H and your income is below the taxable limit). After 5 years, full withdrawal is tax-free if you have left employment; if still employed, rules may vary—use this PF Withdrawal Tax Preview to see estimated TDS.' },
    { question: 'Can I avoid TDS on PF withdrawal with Form 15G/15H?', answer: 'If your total income is below the taxable limit, you can submit Form 15G (below 60) or Form 15H (60+) to the EPFO to avoid TDS on PF withdrawal. This tool shows the TDS that would apply without the form; consult your employer or EPFO for form submission.' },
    { question: 'Is partial PF withdrawal tax-free?', answer: 'Partial withdrawal for specified purposes (e.g. home loan, medical, education) after 5 years is generally tax-free. Partial withdrawal before 5 years may attract 10% TDS. Use this calculator to add partial and full withdrawal entries and see total tax.' },
    { question: 'Where can I get official EPF withdrawal rules?', answer: 'Check EPFO (epfindia.gov.in) and the Income Tax Act. TDS rules are in the Income Tax Act and EPF Scheme. This calculator is for illustration; verify with EPFO or a chartered accountant.' }
  ];

  return (
    <>
      <SEOHelmet
        title="PF Withdrawal Tax Preview - Provident Fund Tax Calculator | MoneyCal"
        description="Calculate tax implications of PF withdrawals. Preview TDS rates, tax-free amounts, and optimize your EPF withdrawal. Retirement Planning • Valid 2026–2050."
        keywords="PF withdrawal tax, EPF TDS calculator, PF withdrawal after 5 years, tax-free PF withdrawal India 2026"
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'PF Withdrawal Tax Preview', url: '/tax-tools/pf-withdrawal-tax-preview' }
        ]}
        faqData={faqData}
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
              <p className="text-sm font-medium text-blue-600 mb-2">Retirement Planning • Valid 2026–2050</p>
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

            {/* FAQ Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-green-600" />
                Frequently Asked Questions: PF Withdrawal Tax
              </h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SEO Content: 1500+ words */}
            <article className="bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">PF Withdrawal Tax: Complete Guide for FY 2025-26 and Beyond</h2>
              <p className="text-gray-600 mb-4">
                Understanding <strong>PF (Provident Fund) withdrawal tax</strong> helps you plan your EPF exit and avoid surprise TDS. This <strong>PF Withdrawal Tax Preview</strong> lets you add full or partial withdrawal entries, enter years of service and employment status, and see estimated TDS and net amount. EPF withdrawal after 5 years of continuous service is <strong>tax-free</strong>; before 5 years, 10% TDS may apply. If you withdraw after 5 years while still employed, 5% TDS may apply in certain cases. Use it for FY 2025-26, FY 2026-27, and future years. For official rules, see <a href="https://www.epfindia.gov.in/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">EPFO</a> and <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Income Tax Portal</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">TDS Rates on EPF Withdrawal</h3>
              <p className="text-gray-600 mb-4">
                If <strong>service is less than 5 years</strong>, 10% TDS applies on the taxable portion (unless Form 15G/15H is submitted and accepted). If <strong>service is 5 years or more and you have left employment</strong>, withdrawal is tax-free. If you withdraw <strong>after 5 years while still employed</strong>, 5% TDS may apply on the taxable amount in some situations. Partial withdrawal for specified purposes after 5 years is generally tax-free. Use this calculator to add multiple withdrawal entries and see total TDS. For comparison with NPS, use <Link to="/tax-tools/pf-vs-nps-tax-growth-comparison" className="text-green-600 hover:underline">PF vs NPS Tax & Growth Comparison</Link> and <Link to="/tax-tools/nps-tax-benefit-vs-growth-estimator" className="text-blue-600 hover:underline">NPS Tax Benefit vs Growth Estimator</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Form 15G and 15H to Avoid TDS</h3>
              <p className="text-gray-600 mb-4">
                If your total income is below the taxable limit, you can submit <strong>Form 15G</strong> (below 60 years) or <strong>Form 15H</strong> (60 years and above) to the EPFO to avoid TDS on PF withdrawal. This tool shows the TDS that would apply without the form. For 80C and retirement planning, use <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="text-green-600 hover:underline">80C Deduction Bucket Visualizer</Link> and <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="text-blue-600 hover:underline">Tax-Efficient Withdrawal Planner</Link>. For official form and TDS rules, check <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">incometax.gov.in</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Validity and Disclaimer</h3>
              <p className="text-gray-600 mb-4">
                This calculator and content are valid for FY 2025-26, FY 2026-27, and future years unless the law changes. EPF TDS rules are based on current Income Tax Act and EPF Scheme. Verify with EPFO or a chartered accountant. This is not professional advice.
              </p>
            </article>

            {/* Related Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white"
            >
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/tax-tools/pf-vs-nps-tax-growth-comparison" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">PF vs NPS Comparison</h3>
                  <p className="text-sm opacity-90">Compare tax benefits and growth</p>
                </Link>
                <Link to="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">ELSS Tax Benefits</h3>
                  <p className="text-sm opacity-90">ELSS lock-in vs tax savings</p>
                </Link>
                <Link to="/tax-tools/80c-deduction-bucket-visualizer" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">80C Deductions</h3>
                  <p className="text-sm opacity-90">Optimize 80C portfolio</p>
                </Link>
                <Link to="/tax-tools/tax-efficient-withdrawal-planner" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Withdrawal Planner</h3>
                  <p className="text-sm opacity-90">Tax-efficient withdrawals</p>
                </Link>
              </div>
            </motion.div>

            {/* Explore more */}
            <section className="mt-8 py-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/tax-tools" className="text-green-600 hover:underline">All Tax Tools</Link></li>
                <li><Link to="/" className="text-green-600 hover:underline">Home</Link></li>
                <li><a href="https://www.epfindia.gov.in/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline inline-flex items-center">EPFO <ExternalLink className="h-4 w-4 ml-1" /></a></li>
              </ul>
            </section>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PFWithdrawalTaxPreview;
