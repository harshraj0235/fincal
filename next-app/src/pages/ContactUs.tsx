import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle, Globe, Shield } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <SEOHelmet
        title="Contact Us - MoneyCal | Get in Touch with Our Team"
        description="Have questions? Contact MoneyCal's support team. We're here to help with any queries about our financial calculators, tools, or services."
        keywords="contact moneycal, customer support, help desk, contact form, get in touch"
        url="/contact-us"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <MessageSquare className="w-12 h-12" />
              </div>
            </motion.div>
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-2xl text-white/90">We're here to help! Reach out with any questions or feedback</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Contact Us</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-800 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="bug">Report a Bug</option>
                      <option value="feature">Feature Request</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-800 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl p-8"
              >
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-xl mr-4">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email Support</h3>
                      <a href="mailto:support@moneycal.in" className="text-white/90 hover:underline">
                        support@moneycal.in
                      </a>
                      <p className="text-sm text-white/70 mt-1">Response within 24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-xl mr-4">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">General Inquiries</h3>
                      <a href="mailto:info@moneycal.in" className="text-white/90 hover:underline">
                        info@moneycal.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-xl mr-4">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Privacy & Legal</h3>
                      <a href="mailto:privacy@moneycal.in" className="text-white/90 hover:underline">
                        privacy@moneycal.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-3 rounded-xl mr-4">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Website</h3>
                      <a href="https://moneycal.in" className="text-white/90 hover:underline">
                        moneycal.in
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Quick Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Help</h3>
                <div className="space-y-4">
                  <a href="/help-center" className="block p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <h4 className="font-bold text-gray-900">Help Center</h4>
                    <p className="text-sm text-gray-600">Find answers to common questions</p>
                  </a>
                  <a href="/about" className="block p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <h4 className="font-bold text-gray-900">About Us</h4>
                    <p className="text-sm text-gray-600">Learn more about MoneyCal</p>
                  </a>
                  <a href="/privacy-policy" className="block p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <h4 className="font-bold text-gray-900">Privacy Policy</h4>
                    <p className="text-sm text-gray-600">How we protect your data</p>
                  </a>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 border-l-4 border-green-500"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Support Hours</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Monday - Saturday:</strong> 9:00 AM - 6:00 PM IST
                </p>
                <p className="text-gray-700">
                  <strong>Sunday:</strong> Closed
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  💡 Our calculators are available 24/7, even when support is offline!
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
