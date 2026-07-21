import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Info, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface DeadlineInfo {
  category: string;
  deadline: string;
  daysLeft: number;
  status: 'urgent' | 'warning' | 'safe';
  description: string;
}

const TaxFilingDeadlineReminderWidget: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('individual');
  const [deadlines, setDeadlines] = useState<DeadlineInfo[]>([]);

  useEffect(() => {
    calculateDeadlines();
  }, [selectedCategory]);

  const calculateDeadlines = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    let categoryDeadlines: DeadlineInfo[] = [];

    if (selectedCategory === 'individual') {
      categoryDeadlines = [
        {
          category: 'ITR Filing Deadline',
          deadline: `${currentYear}-07-31`,
          daysLeft: Math.ceil((new Date(`${currentYear}-07-31`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Last date for filing Income Tax Returns for individuals'
        },
        {
          category: 'Advance Tax Q1',
          deadline: `${currentYear}-06-15`,
          daysLeft: Math.ceil((new Date(`${currentYear}-06-15`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'First quarter advance tax payment deadline'
        },
        {
          category: 'Advance Tax Q2',
          deadline: `${currentYear}-09-15`,
          daysLeft: Math.ceil((new Date(`${currentYear}-09-15`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Second quarter advance tax payment deadline'
        },
        {
          category: 'Advance Tax Q3',
          deadline: `${currentYear}-12-15`,
          daysLeft: Math.ceil((new Date(`${currentYear}-12-15`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Third quarter advance tax payment deadline'
        },
        {
          category: 'Advance Tax Q4',
          deadline: `${currentYear + 1}-03-15`,
          daysLeft: Math.ceil((new Date(`${currentYear + 1}-03-15`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Fourth quarter advance tax payment deadline'
        }
      ];
    } else if (selectedCategory === 'business') {
      categoryDeadlines = [
        {
          category: 'Business ITR Filing',
          deadline: `${currentYear}-09-30`,
          daysLeft: Math.ceil((new Date(`${currentYear}-09-30`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Last date for filing business tax returns'
        },
        {
          category: 'GST Filing (Monthly)',
          deadline: `${currentYear}-${String(currentDate.getMonth() + 2).padStart(2, '0')}-20`,
          daysLeft: Math.ceil((new Date(`${currentYear}-${String(currentDate.getMonth() + 2).padStart(2, '0')}-20`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Monthly GST return filing deadline'
        },
        {
          category: 'TDS Payment',
          deadline: `${currentYear}-${String(currentDate.getMonth() + 2).padStart(2, '0')}-07`,
          daysLeft: Math.ceil((new Date(`${currentYear}-${String(currentDate.getMonth() + 2).padStart(2, '0')}-07`).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
          status: 'safe',
          description: 'Monthly TDS payment deadline'
        }
      ];
    }

    // Update status based on days left
    categoryDeadlines = categoryDeadlines.map(deadline => ({
      ...deadline,
      status: deadline.daysLeft <= 7 ? 'urgent' : deadline.daysLeft <= 30 ? 'warning' : 'safe'
    }));

    setDeadlines(categoryDeadlines);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'safe':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Calendar className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'safe':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <>
      <SEOHelmet
        title="Tax Filing Deadline Reminder Widget - Never Miss Tax Deadlines | MoneyCal"
        description="Stay updated with all tax filing deadlines. Get reminders for ITR filing, advance tax, GST, and TDS payments. Never miss important tax dates again."
        keywords="tax filing deadline, ITR deadline, advance tax deadline, GST filing deadline, TDS payment deadline, tax reminder, tax calendar"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Tax Filing Deadline Reminder Widget
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Never miss important tax deadlines with our comprehensive reminder system
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Deadline Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taxpayer Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="individual">Individual Taxpayer</option>
                      <option value="business">Business/Corporate</option>
                    </select>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-3">Quick Links to Tax Tools</h3>
                    <div className="space-y-2 text-sm">
                      <a href="/tax-tools/stcg-ltcg-classifier" className="block text-blue-700 hover:text-blue-900">
                        • STCG vs LTCG Classifier
                      </a>
                      <a href="/tax-tools/equity-tax-estimator" className="block text-blue-700 hover:text-blue-900">
                        • Equity Tax Estimator
                      </a>
                      <a href="/tax-tools/dividend-tax-estimator" className="block text-blue-700 hover:text-blue-900">
                        • Dividend Tax Calculator
                      </a>
                      <a href="/tax-tools/section-80c-tally-analyzer" className="block text-blue-700 hover:text-blue-900">
                        • Section 80C Tally Analyzer
                      </a>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">Important Reminders</h3>
                    <ul className="space-y-1 text-sm text-yellow-800">
                      <li>• Set calendar reminders for all deadlines</li>
                      <li>• Keep documents ready well in advance</li>
                      <li>• Use our tax calculators for accurate estimates</li>
                      <li>• Consider advance tax payments to avoid penalties</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  Upcoming Deadlines
                </h2>

                <div className="space-y-4">
                  {deadlines.map((deadline, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${getStatusColor(deadline.status)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {getStatusIcon(deadline.status)}
                          <h3 className="font-semibold text-gray-900 ml-2">{deadline.category}</h3>
                        </div>
                        <span className={`text-sm font-semibold ${
                          deadline.status === 'urgent' ? 'text-red-600' :
                          deadline.status === 'warning' ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {deadline.daysLeft > 0 ? `${deadline.daysLeft} days left` : 'Due today'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{deadline.description}</p>
                      <p className="text-xs text-gray-500">Deadline: {new Date(deadline.deadline).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">SEO Optimized Content</h3>
                  <div className="text-sm text-purple-800 space-y-2">
                    <p><strong>Tax Filing Deadlines 2024-25:</strong> Stay compliant with our comprehensive deadline tracker. From ITR filing to advance tax payments, never miss important dates.</p>
                    <p><strong>Income Tax Return Deadline:</strong> July 31st is the last date for individual taxpayers to file their ITR. Use our <a href="/tax-tools/equity-tax-estimator" className="underline">Equity Tax Estimator</a> for accurate calculations.</p>
                    <p><strong>Advance Tax Payment Schedule:</strong> Quarterly advance tax payments help avoid penalties. Calculate your liability with our <a href="/tax-tools/dividend-tax-estimator" className="underline">Dividend Tax Calculator</a>.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Complete Guide to Tax Filing Deadlines in India
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <h3>Understanding Tax Filing Deadlines</h3>
                <p>
                  Tax filing deadlines are crucial for every taxpayer in India. Missing these deadlines can result in penalties, 
                  interest charges, and legal complications. Our comprehensive deadline reminder widget helps you stay on top 
                  of all important tax dates throughout the year.
                </p>

                <h3>Key Tax Deadlines for Individuals</h3>
                <ul>
                  <li><strong>ITR Filing Deadline:</strong> July 31st of the assessment year</li>
                  <li><strong>Advance Tax Q1:</strong> June 15th (15% of total tax liability)</li>
                  <li><strong>Advance Tax Q2:</strong> September 15th (45% of total tax liability)</li>
                  <li><strong>Advance Tax Q3:</strong> December 15th (75% of total tax liability)</li>
                  <li><strong>Advance Tax Q4:</strong> March 15th (100% of total tax liability)</li>
                </ul>

                <h3>Business Tax Deadlines</h3>
                <p>
                  Business entities have different deadlines including GST filing, TDS payments, and corporate tax returns. 
                  Use our <a href="/tax-tools/turnover-calculator-itr" className="text-blue-600 hover:text-blue-800">Turnover Calculator</a> to estimate your business tax liability accurately.
                </p>

                <h3>Related Tax Tools</h3>
                <p>
                  Enhance your tax planning with our comprehensive suite of tax calculators:
                </p>
                <ul>
                  <li><a href="/tax-tools/stcg-ltcg-classifier" className="text-blue-600 hover:text-blue-800">STCG vs LTCG Classifier</a> - Determine your capital gains category</li>
                  <li><a href="/tax-tools/equity-tax-estimator" className="text-blue-600 hover:text-blue-800">Equity Tax Estimator</a> - Calculate taxes on equity investments</li>
                  <li><a href="/tax-tools/dividend-tax-estimator" className="text-blue-600 hover:text-blue-800">Dividend Tax Calculator</a> - Estimate dividend tax liability</li>
                  <li><a href="/tax-tools/section-80c-tally-analyzer" className="text-blue-600 hover:text-blue-800">Section 80C Tally Analyzer</a> - Maximize your tax deductions</li>
                </ul>

                <h3>Tips for Timely Tax Filing</h3>
                <ol>
                  <li>Set multiple reminders for important deadlines</li>
                  <li>Keep all required documents organized</li>
                  <li>Use our tax calculators for accurate estimates</li>
                  <li>Consider advance tax payments to avoid penalties</li>
                  <li>Consult with tax professionals for complex cases</li>
                </ol>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TaxFilingDeadlineReminderWidget;
