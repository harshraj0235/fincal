import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, CheckCircle, Users, BookOpen, TrendingUp, Award, 
  AlertCircle, FileText, Edit3, Search, Globe
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const EditorialPolicy: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Editorial Policy - MoneyCal | Content Standards & Guidelines"
        description="Learn about MoneyCal's editorial standards, fact-checking processes, and commitment to providing accurate, unbiased financial information to our readers."
        keywords="editorial policy, content standards, accuracy, fact-checking, financial journalism, editorial guidelines"
        url="https://moneycal.in/editorial-policy"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Shield className="w-12 h-12" />
              </div>
            </motion.div>
            <h1 className="text-5xl font-bold mb-4">Editorial Policy</h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto">
              Our commitment to accurate, unbiased, and trustworthy financial information
            </p>
            <p className="text-sm text-white/70 mt-4">Last Updated: October 30, 2025</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-8 h-8 mr-3 text-blue-600" />
              Our Editorial Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At <strong>MoneyCal</strong>, we are committed to providing accurate, comprehensive, and unbiased financial 
              information that empowers our readers to make informed decisions about their money. This editorial policy 
              outlines our standards for content creation, fact-checking, corrections, and transparency.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every piece of content published on MoneyCal—whether news articles, calculators, guides, or educational 
              resources—is created and reviewed according to these strict editorial standards to ensure accuracy, 
              reliability, and trustworthiness.
            </p>
          </motion.div>

          {/* Core Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Editorial Principles</h2>
            <div className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: 'Accuracy First',
                  description: 'All financial data, calculations, tax rates, and regulatory information are verified against official government sources (RBI, SEBI, Income Tax Department, GST Council) before publication. We cross-reference multiple authoritative sources.',
                  color: 'text-blue-600'
                },
                {
                  icon: Users,
                  title: 'Independence & Objectivity',
                  description: 'Our content is free from commercial bias. We do not accept payment for editorial content or favorable coverage. All partnerships and affiliate relationships are clearly disclosed.',
                  color: 'text-purple-600'
                },
                {
                  icon: CheckCircle,
                  title: 'Transparency',
                  description: 'We clearly distinguish between news, opinion, and sponsored content. All sources are cited, and calculation methodologies are openly explained. Our editorial process is transparent.',
                  color: 'text-green-600'
                },
                {
                  icon: TrendingUp,
                  title: 'Timeliness & Updates',
                  description: 'Financial regulations change frequently. We update our calculators and content within 24 hours of any official rate changes, new tax slabs, or regulatory updates.',
                  color: 'text-orange-600'
                }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start bg-gray-50 rounded-xl p-6"
                >
                  <div className={`${principle.color} bg-gray-100 p-3 rounded-xl mr-4 flex-shrink-0`}>
                    <principle.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{principle.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{principle.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Creation Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Edit3 className="w-8 h-8 mr-3 text-blue-600" />
              Content Creation & Review Process
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Research & Writing</h3>
                <p className="text-gray-700 leading-relaxed">
                  All articles are written by financial writers with expertise in their respective domains (markets, 
                  taxation, investments, business analysis). Writers must cite primary sources and cross-verify data 
                  from multiple authoritative references.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Fact-Checking</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Every article undergoes a rigorous fact-checking process before publication:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Financial data verified against official government sources (RBI, SEBI, MCA, CBDT)</li>
                  <li>Market data cross-referenced with BSE, NSE, and regulatory filings</li>
                  <li>Tax rates and GST slabs verified against official government notifications</li>
                  <li>Calculations tested with multiple sample inputs</li>
                  <li>External links checked for credibility and accuracy</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Editorial Review</h3>
                <p className="text-gray-700 leading-relaxed">
                  Senior editors review all content for accuracy, clarity, completeness, and adherence to editorial 
                  standards. Articles may be sent back for revision if they don't meet our quality benchmarks.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Expert Validation (For Technical Content)</h3>
                <p className="text-gray-700 leading-relaxed">
                  Calculators, tax guides, and complex financial analyses are validated by Chartered Accountants, 
                  tax consultants, or certified financial advisors before publication.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sources & Citations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Search className="w-8 h-8 mr-3 text-blue-600" />
              Sources & Citations
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We rely on credible, authoritative sources for all financial information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Reserve Bank of India (RBI)',
                'Securities and Exchange Board of India (SEBI)',
                'Ministry of Corporate Affairs (MCA)',
                'Income Tax Department (CBDT)',
                'Goods and Services Tax Council',
                'National Stock Exchange (NSE)',
                'Bombay Stock Exchange (BSE)',
                'Ministry of Finance',
                'CRISIL, ICRA, and other rating agencies',
                'Company annual reports and regulatory filings',
                'Reputable financial publications (Economic Times, Moneycontrol, Bloomberg)',
                'Government notifications and official gazettes'
              ].map((source, index) => (
                <div key={index} className="flex items-start bg-gray-50 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{source}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              All sources are cited within articles, and external links are clearly identified. We do not use 
              unverified social media posts, rumors, or unattributed information as primary sources.
            </p>
          </motion.div>

          {/* Corrections Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-8 h-8 mr-3 text-amber-600" />
              Corrections & Updates Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Despite our rigorous processes, errors can occur. When we discover or are informed of an inaccuracy:
            </p>
            <ul className="space-y-3">
              {[
                'Minor errors (typos, formatting) are corrected immediately without a notice.',
                'Significant factual errors are corrected prominently with an editor\'s note at the top of the article explaining the change.',
                'Major errors that materially affect the article\'s meaning may result in a full rewrite or retraction.',
                'All calculator errors are fixed within 24 hours and users are notified if the error affected results.',
                'Regulatory updates (tax rates, GST slabs) are implemented within 24 hours of official notification.'
              ].map((policy, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{policy}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed mt-6">
              <strong>To report an error:</strong> Please email us at{' '}
              <a href="mailto:corrections@moneycal.in" className="text-blue-600 hover:underline font-semibold">
                corrections@moneycal.in
              </a>{' '}
              with details of the error, the article URL, and the correct information with a source.
            </p>
          </motion.div>

          {/* Conflicts of Interest */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Conflicts of Interest & Disclosures</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To maintain editorial independence and reader trust:
            </p>
            <ul className="space-y-3">
              {[
                'We do not accept payment for editorial coverage or favorable reviews.',
                'Affiliate relationships (if any) are clearly disclosed at the top of relevant articles.',
                'Writers disclose any personal financial interests that could be seen as conflicts of interest.',
                'Sponsored content is clearly labeled as "Sponsored" or "Paid Partnership" and distinguished from editorial content.',
                'We do not engage in market manipulation, pump-and-dump schemes, or promotional content disguised as news.'
              ].map((policy, index) => (
                <li key={index} className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{policy}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* User Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">User Privacy & Data</h2>
            <p className="text-gray-700 leading-relaxed">
              MoneyCal does not collect, store, or share personal financial data entered into our calculators. 
              All calculations are performed locally in your browser. We do not require registration to use our tools. 
              For detailed information, see our{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline font-semibold">
                Privacy Policy
              </a>.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Questions About Our Editorial Policy?</h2>
            <p className="text-xl text-white/90 mb-6">
              We're committed to transparency and accountability
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:editorial@moneycal.in"
                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                editorial@moneycal.in
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all"
              >
                Contact Us
              </a>
            </div>
          </motion.div>

          {/* Legal Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600 mt-8"
          >
            <p className="mb-2">
              <strong className="text-gray-900">Disclaimer:</strong> The content on MoneyCal is for informational 
              and educational purposes only. It does not constitute professional financial, tax, legal, or investment advice. 
              Always consult with qualified professionals before making financial decisions.
            </p>
            <p>
              This editorial policy is a living document and may be updated periodically. Major changes will be 
              communicated to our readers.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EditorialPolicy;
