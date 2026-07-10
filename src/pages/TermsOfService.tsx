import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const TermsOfService: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Terms of Service - MoneyCal | User Agreement and Guidelines"
        description="Read MoneyCal's Terms of Service. Understand your rights and responsibilities when using our financial calculators and tools. Complete user agreement and guidelines."
        keywords="terms of service, user agreement, terms and conditions, usage policy, legal terms"
        url="/terms-of-service"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Scale className="w-12 h-12" />
              </div>
            </motion.div>
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-white/90">Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Acceptance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>MoneyCal</strong> ("Website," "Platform," "Service," "we," "our," or "us"). 
              By accessing or using moneycal.in, you agree to be bound by these Terms of Service ("Terms"). 
              If you disagree with any part of these terms, you may not access our services.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              These Terms apply to all visitors, users, and others who access or use the Service. Please read these 
              Terms carefully before using our Platform.
            </p>
          </motion.div>

          {/* Services Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-8 h-8 mr-3 text-purple-600" />
              2. Description of Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              MoneyCal provides free financial calculators, tools, educational content, and resources including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Financial calculators (EMI, SIP, PPF, GST, Income Tax, etc.)</li>
              <li>Investment analysis tools and trackers</li>
              <li>Tax planning and GST compliance tools</li>
              <li>Educational articles and guides on personal finance</li>
              <li>Market data and financial news (from third-party sources)</li>
              <li>Comparison tools for financial products</li>
            </ul>
          </motion.div>

          {/* User Obligations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. User Obligations and Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You agree to use our services only for lawful purposes. You agree NOT to:</p>
            <div className="space-y-3">
              {[
                'Use the service for any illegal or unauthorized purpose',
                'Attempt to gain unauthorized access to any part of the service',
                'Interfere with or disrupt the service or servers',
                'Copy, reproduce, or redistribute our content without permission',
                'Use automated systems (bots, scrapers) to access the service',
                'Transmit any viruses, malware, or harmful code',
                'Impersonate any person or entity',
                'Harass, abuse, or harm other users'
              ].map((rule, index) => (
                <div key={index} className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{rule}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-yellow-50 rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-yellow-500"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="w-8 h-8 mr-3 text-yellow-600" />
              4. Disclaimer and Limitation of Liability
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>IMPORTANT:</strong> MoneyCal provides financial calculators and educational content for informational 
                purposes only. <strong>We are NOT financial advisors, tax consultants, or investment professionals.</strong>
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">No Financial Advice:</h3>
                <p>
                  All calculations, projections, and information provided are for general informational purposes. They should 
                  NOT be considered as professional financial, investment, tax, or legal advice. Always consult with qualified 
                  professionals before making financial decisions.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Accuracy Disclaimer:</h3>
                <p>
                  While we strive for accuracy and update our calculators regularly with latest rates and regulations, we cannot 
                  guarantee 100% accuracy. Tax laws, GST rates, and financial regulations change frequently. Users should verify 
                  critical information from official sources.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">No Liability:</h3>
                <p>
                  MoneyCal and its team members shall NOT be liable for any direct, indirect, incidental, consequential, or 
                  punitive damages arising from your use of our services, including but not limited to financial losses, 
                  investment decisions, or tax liabilities based on our tools.
                </p>
              </div>
              <p className="font-bold">
                USE OF OUR SERVICES IS AT YOUR OWN RISK. THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.
              </p>
            </div>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Intellectual Property Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Service and its original content, features, and functionality are owned by MoneyCal and are protected by 
              international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-3">What You Can Do:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Use our calculators for personal, non-commercial purposes</li>
                <li>Share links to our tools on social media or websites</li>
                <li>Embed our calculators with proper attribution (where available)</li>
              </ul>
              <h3 className="font-bold text-gray-900 mb-3 mt-4">What You Cannot Do:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Copy, reproduce, or redistribute our content without permission</li>
                <li>Create derivative works based on our tools</li>
                <li>Use our brand name or logo without authorization</li>
                <li>Scrape or systematically download our content</li>
              </ul>
            </div>
          </motion.div>

          {/* External Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Third-Party Links and Content</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Service may contain links to third-party websites, services, or advertisements that are not owned or 
              controlled by MoneyCal. We have no control over, and assume no responsibility for, the content, privacy policies, 
              or practices of any third-party websites or services.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-800">
                <strong>Important:</strong> Clicking on third-party links will take you away from MoneyCal. We recommend 
                reviewing the privacy policies and terms of any third-party sites you visit.
              </p>
            </div>
          </motion.div>

          {/* Termination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to terminate or suspend access to our Service immediately, without prior notice or liability, 
              for any reason, including without limitation if you breach these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Upon termination, your right to use the Service will immediately cease. However, since we don't require user 
              accounts, termination typically means IP-based blocking in case of abuse.
            </p>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Governing Law and Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its 
              conflict of law provisions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising out of or related to these Terms or the Service shall be subject to the exclusive 
              jurisdiction of the courts located in [Your City], India.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Questions About Terms?</h2>
            <p className="text-lg mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 mb-6">
              <div>Email: <strong>legal@moneycal.in</strong></div>
              <div>Website: <strong>moneycal.in</strong></div>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:shadow-2xl transition-all"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;

