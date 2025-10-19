import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Database, AlertCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Privacy Policy - MoneyCal | How We Protect Your Data"
        description="Read MoneyCal's comprehensive privacy policy. Learn how we collect, use, and protect your information. Your privacy and data security is our top priority."
        keywords="privacy policy, data protection, user privacy, data security, information collection"
        url="https://moneycal.in/privacy-policy"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
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
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-white/90">Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At <strong>MoneyCal</strong> ("we," "our," or "us"), we are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and 
              safeguard your information when you visit our website <strong>moneycal.in</strong>.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              By using our website and services, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, please do not use our services.
            </p>
          </motion.div>

          {/* Key Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-blue-500"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="w-8 h-8 mr-3 text-blue-600" />
              Our Privacy Principles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'No personal data collection for calculator use',
                'Transparent about data practices',
                'Regular security audits and updates',
                'Compliance with Indian IT Act 2000',
                'No selling of user data to third parties',
                'Clear opt-out options for all tracking'
              ].map((principle, index) => (
                <div key={index} className="flex items-start">
                  <UserCheck className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{principle}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-8 h-8 mr-3 text-purple-600" />
              Information We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Information You Do NOT Need to Provide</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>Good News:</strong> You can use all our calculators and tools <strong>without creating an account, 
                  without logging in, and without providing ANY personal information</strong>. We believe financial tools 
                  should be accessible without barriers.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>No name required</li>
                  <li>No email address needed</li>
                  <li>No phone number collected</li>
                  <li>No registration or signup</li>
                  <li>All calculators work anonymously</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  When you visit our website, we automatically collect certain technical information to improve our services:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Device Information:</strong> Browser type, device type, operating system</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent, features used</li>
                  <li><strong>IP Address:</strong> For analytics and security (not linked to identity)</li>
                  <li><strong>Cookies:</strong> For analytics and user experience (see Cookie Policy below)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Information You Choose to Provide</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  You may voluntarily provide information when you:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Contact Us:</strong> Name, email when submitting inquiries or feedback</li>
                  <li><strong>Newsletter Subscription:</strong> Email address if you opt-in to receive updates (optional)</li>
                  <li><strong>Social Media:</strong> Interactions on our social media pages</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* How We Use Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Eye className="w-8 h-8 mr-3 text-green-600" />
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Service Provision',
                  desc: 'To provide, maintain, and improve our calculators and tools'
                },
                {
                  title: 'Analytics & Improvement',
                  desc: 'To understand how users interact with our platform and identify areas for enhancement'
                },
                {
                  title: 'Communication',
                  desc: 'To respond to your inquiries, feedback, and support requests'
                },
                {
                  title: 'Security',
                  desc: 'To detect, prevent, and address technical issues, fraud, or security threats'
                },
                {
                  title: 'Legal Compliance',
                  desc: 'To comply with legal obligations under Indian law'
                },
                {
                  title: 'Content Updates',
                  desc: 'To send newsletters and updates (only if you explicitly opt-in)'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cookies Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences 
              through your browser settings.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Types of Cookies We Use:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                  <li><strong>Analytics Cookies:</strong> Google Analytics to understand user behavior (anonymous)</li>
                  <li><strong>Preference Cookies:</strong> To remember your language choice and settings</li>
                  <li><strong>Advertising Cookies:</strong> May be used if you consent (for Google AdSense)</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-gray-800">
                  <strong>Note:</strong> You can disable cookies in your browser, but this may affect website functionality. 
                  Most browsers allow you to refuse cookies or alert you when cookies are being sent.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Third-Party Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may use third-party services to support our operations. These services have their own privacy policies:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Google Analytics</h3>
                <p className="text-gray-700 mb-2">
                  Used for website analytics and user behavior tracking (anonymized data).
                </p>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Google Privacy Policy →
                </a>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Google AdSense (if applicable)</h3>
                <p className="text-gray-700 mb-2">
                  Used for displaying relevant advertisements. Google may use cookies for ad personalization.
                </p>
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Google Ads Privacy Policy →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-green-500"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="w-8 h-8 mr-3 text-green-600" />
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>HTTPS encryption for all data transmission</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Secure hosting infrastructure</li>
              <li>Limited access to any collected data (team members only)</li>
              <li>Regular backups and disaster recovery procedures</li>
            </ul>
            <div className="mt-4 bg-white p-4 rounded-lg">
              <p className="text-gray-800">
                <strong>Important:</strong> While we strive to use commercially acceptable means to protect your information, 
                no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under Indian law and our commitment to privacy, you have the following rights:
            </p>
            <div className="space-y-4">
              {[
                { right: 'Access', desc: 'Request access to any personal data we hold about you' },
                { right: 'Correction', desc: 'Request correction of inaccurate data' },
                { right: 'Deletion', desc: 'Request deletion of your personal data ("Right to be Forgotten")' },
                { right: 'Opt-Out', desc: 'Unsubscribe from newsletters or marketing communications' },
                { right: 'Data Portability', desc: 'Request a copy of your data in a readable format' },
                { right: 'Objection', desc: 'Object to processing of your data for specific purposes' }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.right}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-800">
                To exercise any of these rights, please contact us at <strong>privacy@moneycal.in</strong> or use our 
                <a href="/contact" className="text-blue-600 underline ml-1">Contact page</a>.
              </p>
            </div>
          </motion.div>

          {/* Children's Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are intended for users aged 18 and above. We do not knowingly collect personal information from 
              children under 18. If you are a parent or guardian and believe your child has provided us with personal information, 
              please contact us immediately, and we will take steps to remove such information.
            </p>
          </motion.div>

          {/* Changes to Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-8 h-8 mr-3 text-orange-600" />
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update our Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, 
              or other factors. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Posting the updated policy on this page with a new "Last Updated" date</li>
              <li>Displaying a prominent notice on our homepage</li>
              <li>Sending an email notification (if you've subscribed to our newsletter)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We encourage you to review this Privacy Policy periodically. Continued use of our services after changes 
              constitutes acceptance of the updated policy.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-6">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <strong className="w-32">Email:</strong>
                <span>privacy@moneycal.in</span>
              </div>
              <div className="flex items-center">
                <strong className="w-32">Website:</strong>
                <a href="https://moneycal.in" className="underline">https://moneycal.in</a>
              </div>
              <div className="flex items-center">
                <strong className="w-32">Contact Form:</strong>
                <a href="/contact" className="underline">moneycal.in/contact</a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm">
                <strong>Governing Law:</strong> This Privacy Policy is governed by and construed in accordance with the 
                laws of India, including the Information Technology Act, 2000 and the Information Technology 
                (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
