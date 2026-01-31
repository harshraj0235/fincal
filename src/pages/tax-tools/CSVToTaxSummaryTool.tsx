import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, FileText, Download, Calculator, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, HelpCircle, ExternalLink } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

interface Transaction {
  date: string;
  type: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price: number;
  amount: number;
}

interface TaxSummary {
  totalBuyAmount: number;
  totalSellAmount: number;
  netGain: number;
  stcgAmount: number;
  ltcgAmount: number;
  stcgTax: number;
  ltcgTax: number;
  totalTax: number;
  transactions: Transaction[];
}

const CSVToTaxSummaryTool: React.FC = () => {
  const [csvData, setCsvData] = useState<string>('');
  const [summary, setSummary] = useState<TaxSummary | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [error, setError] = useState<string>('');

  const parseCSV = (csvText: string): Transaction[] => {
    const lines = csvText.trim().split('\n');
    const transactions: Transaction[] = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(',');
      if (columns.length >= 6) {
        const transaction: Transaction = {
          date: columns[0].trim(),
          type: columns[1].trim().toLowerCase() as 'buy' | 'sell',
          symbol: columns[2].trim(),
          quantity: parseFloat(columns[3]) || 0,
          price: parseFloat(columns[4]) || 0,
          amount: parseFloat(columns[5]) || 0
        };
        transactions.push(transaction);
      }
    }
    
    return transactions;
  };

  const calculateTaxSummary = (transactions: Transaction[]): TaxSummary => {
    let totalBuyAmount = 0;
    let totalSellAmount = 0;
    
    transactions.forEach(tx => {
      if (tx.type === 'buy') {
        totalBuyAmount += tx.amount;
      } else {
        totalSellAmount += tx.amount;
      }
    });
    
    const netGain = totalSellAmount - totalBuyAmount;
    
    // Simplified calculation - in reality, you'd need to match buy/sell pairs
    const stcgAmount = netGain > 0 ? netGain * 0.3 : 0; // Assume 30% STCG
    const ltcgAmount = netGain > 0 ? netGain * 0.7 : 0; // Assume 70% LTCG
    
    const stcgTax = stcgAmount * 0.20; // 20% STCG tax (equity, from July 2024)
    const ltcgTax = Math.max(0, (ltcgAmount - 125000)) * 0.125; // 12.5% LTCG tax with ₹1.25L exemption (from July 2024)
    
    return {
      totalBuyAmount,
      totalSellAmount,
      netGain,
      stcgAmount,
      ltcgAmount,
      stcgTax,
      ltcgTax,
      totalTax: stcgTax + ltcgTax,
      transactions
    };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvData(text);
        setError('');
      };
      reader.readAsText(file);
    }
  };

  const processCSV = () => {
    if (!csvData.trim()) {
      setError('Please upload a CSV file first');
      return;
    }

    try {
      const transactions = parseCSV(csvData);
      if (transactions.length === 0) {
        setError('No valid transactions found in CSV');
        return;
      }
      
      const taxSummary = calculateTaxSummary(transactions);
      setSummary(taxSummary);
      setError('');
    } catch (err) {
      setError('Error processing CSV file. Please check the format.');
    }
  };

  const downloadSummary = () => {
    if (!summary) return;
    
    const csvContent = `Tax Summary Report\n` +
      `Total Buy Amount,${summary.totalBuyAmount}\n` +
      `Total Sell Amount,${summary.totalSellAmount}\n` +
      `Net Gain,${summary.netGain}\n` +
      `STCG Amount,${summary.stcgAmount}\n` +
      `LTCG Amount,${summary.ltcgAmount}\n` +
      `STCG Tax,${summary.stcgTax}\n` +
      `LTCG Tax,${summary.ltcgTax}\n` +
      `Total Tax,${summary.totalTax}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tax-summary-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setCsvData('');
    setSummary(null);
    setError('');
  };

  const canonicalUrl = 'https://moneycal.in/tax-tools/csv-to-tax-summary-tool';
  const faqData = [
    { question: 'What CSV format does this tool expect?', answer: 'The tool expects a CSV with columns: Date, Type (buy/sell), Symbol, Quantity, Price, Amount. Export trading data from your broker in this format or paste data with a header row. The first row is treated as header.' },
    { question: 'How are STCG and LTCG calculated from CSV?', answer: 'The tool sums total buy and sell amounts and estimates STCG/LTCG split (simplified). For accurate FIFO/specific-share matching, use a tax professional or dedicated software. Equity STCG is taxed at 20% and LTCG at 12.5% with ₹1.25 lakh exemption (from July 2024).' },
    { question: 'Is the tax summary valid for ITR filing?', answer: 'The output is an estimate for planning. Always verify with your broker statement and a chartered accountant before filing ITR. Use our Equity Tax Estimator and STCG vs LTCG Classifier for detailed gains classification.' },
    { question: 'Can I use this for mutual fund transactions?', answer: 'The tool accepts any CSV with Date, Type, Symbol, Quantity, Price, Amount. For mutual fund–specific tax (e.g. equity vs debt), use our Mutual Fund Exit Load Checker and Debt Fund Tax Calculator.' },
    { question: 'Where can I get official capital gains tax rates?', answer: 'Check the Income Tax Portal (incometax.gov.in) and the latest Budget documents. Equity LTCG exemption is ₹1.25 lakh and LTCG rate 12.5%; STCG rate 20% (effective from July 2024).' }
  ];

  return (
    <>
      <SEOHelmet
        title="CSV to Tax Summary Tool - Convert Trading Data to Tax Report | MoneyCal"
        description="Convert trading CSV data into comprehensive tax summary reports. Calculate STCG, LTCG, and tax with our CSV to tax summary tool. Data Analysis • Valid 2026–2050."
        keywords="CSV to tax summary, trading data converter, capital gains report, STCG LTCG from CSV, tax report generator India 2026"
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tax Tools', url: '/tax-tools' },
          { name: 'CSV to Tax Summary Tool', url: '/tax-tools/csv-to-tax-summary-tool' }
        ]}
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-medium text-blue-200 mb-2">Data Analysis • Valid 2026–2050</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                CSV to Tax Summary Tool
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Convert trading CSV data into comprehensive tax reports with STCG/LTCG estimates
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
                  <Upload className="h-6 w-6 mr-3 text-blue-600" />
                  Upload Trading Data
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload CSV File
                    </label>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Expected format: Date,Type,Symbol,Quantity,Price,Amount
                    </p>
                  </div>

                  {csvData && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CSV Preview
                      </label>
                      <textarea
                        value={csvData}
                        onChange={(e) => setCsvData(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="Paste CSV data here..."
                      />
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <XCircle className="h-5 w-5 text-red-600 mr-2" />
                        <span className="text-red-800">{error}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      onClick={processCSV}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Generate Tax Summary
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
                  Tax Summary Report
                </h2>

                {summary ? (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total Buy Amount</p>
                        <p className="text-xl font-bold text-green-600">₹{summary.totalBuyAmount.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total Sell Amount</p>
                        <p className="text-xl font-bold text-blue-600">₹{summary.totalSellAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Net Gain/Loss */}
                    <div className={`text-center p-4 rounded-lg ${summary.netGain >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <p className="text-sm text-gray-600">Net Gain/Loss</p>
                      <p className={`text-2xl font-bold ${summary.netGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{summary.netGain.toLocaleString()}
                      </p>
                    </div>

                    {/* Tax Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">STCG Amount:</span>
                        <span className="font-bold text-red-600">₹{summary.stcgAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">LTCG Amount:</span>
                        <span className="font-bold text-blue-600">₹{summary.ltcgAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">STCG Tax (20%):</span>
                        <span className="font-bold text-red-600">₹{summary.stcgTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">LTCG Tax (12.5%, ₹1.25L exempt):</span>
                        <span className="font-bold text-blue-600">₹{summary.ltcgTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <span className="text-gray-700 font-semibold">Total Tax:</span>
                        <span className="font-bold text-purple-600">₹{summary.totalTax.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={downloadSummary}
                      className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Tax Summary
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Upload your CSV file to generate tax summary</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-blue-600" />
                Frequently Asked Questions: CSV to Tax Summary
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
            <article className="mt-12 bg-white rounded-2xl shadow-xl p-8 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">CSV to Tax Summary: Convert Trading Data to Tax Reports for FY 2025-26 and Beyond</h2>
              <p className="text-gray-600 mb-4">
                Converting your <strong>trading CSV data</strong> into a <strong>tax summary report</strong> helps you estimate STCG, LTCG, and tax liability for ITR filing. This <strong>CSV to Tax Summary Tool</strong> accepts a CSV with columns Date, Type (buy/sell), Symbol, Quantity, Price, and Amount, and generates total buy/sell, net gain, and estimated STCG/LTCG tax using current rates (equity STCG 20%, LTCG 12.5% with ₹1.25 lakh exemption from July 2024). Use it for FY 2025-26, FY 2026-27, and future years. For official rates, refer to <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Income Tax Portal</a> and <a href="https://economictimes.indiatimes.com/wealth/tax/capital-gains-latest-ltcg-and-stcg-rates-and-holding-periods-for-various-assets-for-ay-2025-26/articleshow/123827541.cms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Economic Times capital gains rates</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How to Prepare Your CSV</h3>
              <p className="text-gray-600 mb-4">
                Export trading data from your broker (e.g. NSE/BSE equity, F&amp;O) in CSV format. Ensure columns: <strong>Date, Type, Symbol, Quantity, Price, Amount</strong>. Type should be &apos;buy&apos; or &apos;sell&apos;. Use a consistent date format (YYYY-MM-DD recommended). Upload the file or paste the CSV into the tool. The tool sums buy and sell amounts and estimates STCG/LTCG split; for accurate FIFO or specific-share matching, use a tax professional or dedicated software. Use our <Link to="/tax-tools/equity-tax-estimator" className="text-blue-600 hover:underline">Equity Tax Estimator</Link> and <Link to="/tax-tools/stcg-ltcg-classifier" className="text-blue-600 hover:underline">STCG vs LTCG Classifier</Link> for detailed gains classification.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">STCG and LTCG Rates (Equity, from July 2024)</h3>
              <p className="text-gray-600 mb-4">
                For listed equity and equity mutual funds, <strong>STCG</strong> (holding less than 12 months) is taxed at <strong>20%</strong> and <strong>LTCG</strong> (12 months or more) at <strong>12.5%</strong> with an annual exemption of <strong>₹1.25 lakh</strong> (Budget 2024). The CSV tool uses these rates for the estimated tax summary. Always verify with your broker statement and a chartered accountant before filing ITR. For loss utilization, use <Link to="/tax-tools/tax-loss-harvesting-calculator" className="text-blue-600 hover:underline">Tax Loss Harvesting Calculator</Link> and <Link to="/tax-tools/loss-carry-forward-estimator" className="text-blue-600 hover:underline">Loss Carry Forward Estimator</Link>. For turnover and ITR form, use <Link to="/tax-tools/turnover-calculator-itr" className="text-blue-600 hover:underline">Turnover Calculator for ITR</Link> and <Link to="/tax-tools/trader-turnover-estimator-itr" className="text-blue-600 hover:underline">Trader Turnover Estimator for ITR</Link>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Related Tools and Resources</h3>
              <p className="text-gray-600 mb-4">
                Use <Link to="/tax-tools/equity-tax-estimator" className="text-blue-600 hover:underline">Equity Tax Estimator</Link> for year-wise equity tax. Use <Link to="/tax-tools/stcg-ltcg-classifier" className="text-blue-600 hover:underline">STCG vs LTCG Classifier</Link> to determine holding period and rate. Use <Link to="/tax-tools/dividend-tax-estimator" className="text-blue-600 hover:underline">Dividend Tax Estimator</Link> for dividend income. Use <Link to="/tax-tools/mutual-fund-exit-load-checker" className="text-blue-600 hover:underline">Mutual Fund Exit Load Checker</Link> and <Link to="/tax-tools/debt-fund-tax-calculator" className="text-blue-600 hover:underline">Debt Fund Tax Calculator</Link> for mutual fund tax. For official guidance, check <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">incometax.gov.in</a>.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Validity and Disclaimer</h3>
              <p className="text-gray-600 mb-4">
                This tool and content are valid for FY 2025-26, FY 2026-27, and future years unless the law changes. Tax rates are based on current Income Tax Act. The CSV summary is an estimate; always verify with the Income Tax Department or a chartered accountant. This is not professional tax advice.
              </p>
            </article>

            {/* Related Tax Tools */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-6">Related Tax Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/tax-tools/equity-tax-estimator" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Equity Tax Estimator</h3>
                  <p className="text-sm opacity-90">LTCG/STCG by year</p>
                </Link>
                <Link to="/tax-tools/stcg-ltcg-classifier" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">STCG vs LTCG Classifier</h3>
                  <p className="text-sm opacity-90">Capital gains category</p>
                </Link>
                <Link to="/tax-tools/turnover-calculator-itr" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Turnover Calculator ITR</h3>
                  <p className="text-sm opacity-90">ITR form selection</p>
                </Link>
                <Link to="/tax-tools/tax-loss-harvesting-calculator" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors">
                  <h3 className="font-semibold mb-2">Tax Loss Harvesting</h3>
                  <p className="text-sm opacity-90">Offset gains with losses</p>
                </Link>
              </div>
            </motion.div>

            {/* Explore more */}
            <section className="mt-8 py-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/tax-tools" className="text-blue-600 hover:underline">All Tax Tools</Link></li>
                <li><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
                <li><a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">Income Tax Portal <ExternalLink className="h-4 w-4 ml-1" /></a></li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default CSVToTaxSummaryTool;
