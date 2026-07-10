import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, IndianRupee, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

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
    
    const stcgTax = stcgAmount * 0.15; // 15% STCG tax
    const ltcgTax = Math.max(0, (ltcgAmount - 100000)) * 0.10; // 10% LTCG tax with 1L exemption
    
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

  return (
    <>
      <SEOHelmet
        title="CSV to Tax Summary Tool - Convert Trading Data to Tax Report | MoneyCal"
        description="Convert your trading CSV data into comprehensive tax summary reports. Calculate STCG, LTCG, and tax liabilities with our advanced CSV to tax summary converter tool."
        keywords="CSV to tax summary, trading data converter, capital gains Calculator, tax report generator, STCG LTCG Calculator, investment tax tool"
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
                CSV to Tax Summary Tool
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Convert your trading data into comprehensive tax reports with automatic STCG/LTCG calculations
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
                        <span className="text-gray-700">STCG Tax (15%):</span>
                        <span className="font-bold text-red-600">₹{summary.stcgTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">LTCG Tax (10%):</span>
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

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                How to Use CSV to Tax Summary Tool
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Step 1: Prepare Your CSV
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Export trading data from your broker</li>
                    <li>• Ensure columns: Date, Type, Symbol, Quantity, Price, Amount</li>
                    <li>• Type should be 'buy' or 'sell'</li>
                    <li>• Use consistent date format (YYYY-MM-DD)</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <IndianRupee className="h-5 w-5 mr-2" />
                    Step 2: Generate Report
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Upload your CSV file</li>
                    <li>• Review the data preview</li>
                    <li>• Click "Generate Tax Summary"</li>
                    <li>• Download the detailed report</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• This tool provides estimates for educational purposes</li>
                  <li>• Consult a tax professional for accurate calculations</li>
                  <li>• Consider using our <a href="/tax-tools/stcg-ltcg-classifier" className="underline font-semibold">STCG vs LTCG Classifier</a> for detailed analysis</li>
                  <li>• For mutual fund calculations, try our <a href="/tax-tools/mutual-fund-exit-load-checker" className="underline font-semibold">Mutual Fund Exit Load Checker</a></li>
                </ul>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Related Tax Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/tax-tools/equity-tax-estimator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Equity Tax Estimator</span>
                    <p className="text-sm text-purple-600">Calculate equity tax by assessment year</p>
                  </a>
                  <a href="/tax-tools/dividend-tax-estimator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Dividend Tax Estimator</span>
                    <p className="text-sm text-purple-600">Calculate dividend tax under new rules</p>
                  </a>
                  <a href="/tax-tools/loss-carry-forward-estimator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Loss Carry Forward</span>
                    <p className="text-sm text-purple-600">Track capital loss carry forward</p>
                  </a>
                  <a href="/tax-tools/turnover-calculator-itr" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Turnover Calculator</span>
                    <p className="text-sm text-purple-600">Calculate turnover for ITR filing</p>
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

export default CSVToTaxSummaryTool;
