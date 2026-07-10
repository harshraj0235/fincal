import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Target, Award, Heart, TrendingUp, Shield, Globe,
  Sparkles, CheckCircle, BookOpen, Calculator, Zap, IndianRupee
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const AboutUs: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="About MoneyCal - India's Most Comprehensive Financial Tools Platform"
        description="Learn about MoneyCal's mission to provide free, accurate financial calculators and educational resources to empower Indians with financial literacy and smart decision-making tools."
        keywords="about moneycal, financial tools India, free calculators, financial education, company mission, financial literacy"
        url="/about"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

          <div className="relative max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                <Heart className="w-16 h-16" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About MoneyCal</h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Empowering India with free, accurate financial tools and education since 2023
            </p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-10 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-10 h-10 mr-4 text-blue-600" />
              Our Story
            </h2>
            <div className="prose max-w-none text-lg text-gray-700 leading-relaxed">
              <p className="mb-4">
                <strong>MoneyCal</strong> was born from a simple observation: millions of Indians struggle with financial planning
                because they lack access to simple, reliable calculation tools. In 2023, a team of financial experts,
                software engineers, and educators came together with a mission to change this.
              </p>
              <p className="mb-4">
                We saw people making critical financial decisions—buying homes, planning retirement, starting businesses—without
                proper tools to calculate EMIs, returns, or tax implications. Financial literacy shouldn't be a privilege;
                it should be accessible to everyone, in every corner of India.
              </p>
              <p className="mb-4">
                Starting with just 10 calculators, we've grown to offer <strong>over 100 comprehensive financial tools</strong>
                covering everything from GST to retirement planning. Today, we serve <strong>over 1 million users monthly</strong>,
                helping them make informed financial decisions with confidence.
              </p>
              <p>
                Our platform is completely <strong>free, with no registration required</strong>, because we believe financial
                empowerment should have no barriers. We're proudly Indian, built for Indians, supporting both
                <strong> Hindi and English</strong> to serve our diverse nation.
              </p>
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-3xl shadow-2xl p-10"
            >
              <Target className="w-16 h-16 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg leading-relaxed">
                To democratize financial planning by providing free, accurate, and easy-to-use calculators and educational
                resources that empower every Indian to make informed financial decisions and achieve their financial goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-3xl shadow-2xl p-10"
            >
              <Sparkles className="w-16 h-16 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                To become India's most trusted financial education platform, where every citizen—from students to retirees—can
                access world-class tools and knowledge to build wealth, secure their future, and achieve financial independence.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-10 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Trust & Accuracy',
                  description: 'Every Calculator is rigorously tested and updated with latest tax rates, GST slabs, and regulations. Your financial decisions deserve accurate data.',
                  color: 'from-blue-500 to-indigo-600'
                },
                {
                  icon: Heart,
                  title: 'User-First',
                  description: 'No ads interrupting calculations, no registration walls, no hidden fees. Just pure, helpful tools designed for your convenience.',
                  color: 'from-pink-500 to-red-600'
                },
                {
                  icon: Globe,
                  title: 'Inclusive',
                  description: 'Available in Hindi and English, accessible to all, designed for India. Financial literacy should know no language barriers.',
                  color: 'from-green-500 to-teal-600'
                },
                {
                  icon: Zap,
                  title: 'Innovation',
                  description: 'Constantly adding new tools, features, and educational content based on user needs and market trends.',
                  color: 'from-yellow-500 to-orange-600'
                },
                {
                  icon: BookOpen,
                  title: 'Education',
                  description: 'Beyond calculators, we provide comprehensive guides, FAQs, and real-world examples to help you understand your finances.',
                  color: 'from-purple-500 to-pink-600'
                },
                {
                  icon: Users,
                  title: 'Community',
                  description: 'Built for Indians, by Indians. We understand local financial needs from GST filing to PPF calculations.',
                  color: 'from-cyan-500 to-blue-600'
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What We Offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-xl p-10 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: IndianRupee, title: '100+ Financial Calculators', desc: 'EMI, SIP, PPF, GST, Income Tax, and more' },
                { icon: TrendingUp, title: 'Investment Tools', desc: 'Stock analysis, mutual fund calculators, CAGR, XIRR trackers' },
                { icon: Shield, title: 'GST & Tax Tools', desc: 'Complete GST suite, ITR calculators, TDS tools' },
                { icon: BookOpen, title: 'Educational Content', desc: '1000+ articles, guides, tutorials, and FAQs' },
                { icon: Zap, title: 'Real-time Updates', desc: 'Latest tax rates, GST slabs, and regulatory changes' },
                { icon: Globe, title: 'Bilingual Support', desc: 'Full platform available in Hindi and English' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl mr-4 flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-10 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '1M+', label: 'Monthly Users', icon: Users },
                { value: '100+', label: 'Tools & Calculators', icon: IndianRupee },
                { value: '50M+', label: 'Calculations Performed', icon: TrendingUp },
                { value: '24/7', label: 'Always Available', icon: Award }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Trust Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-xl p-10 mb-16 border-l-4 border-green-500"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Trust MoneyCal?</h2>
            <div className="space-y-4">
              {[
                'All calculators verified by Chartered Accountants and financial experts',
                'Updated within 24 hours of any tax rate or GST slab changes',
                'Over 1 million satisfied users across India',
                'Zero data collection - no personal information stored',
                'Open-source calculation logic - complete transparency',
                'Regular security audits and updates',
                'Compliance with all Indian financial regulations',
                'Free forever - no premium tiers or hidden costs'
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-10 mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Team</h2>
            <p className="text-xl text-gray-600 text-center mb-10 max-w-3xl mx-auto">
              A diverse team of financial experts, software engineers, and educators working together to make
              financial literacy accessible to every Indian.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  role: 'Financial Experts',
                  description: 'Chartered Accountants, tax consultants, and investment advisors ensuring accuracy',
                  icon: Award,
                  color: 'from-blue-500 to-indigo-600'
                },
                {
                  role: 'Technology Team',
                  description: 'Full-stack developers creating fast, secure, and user-friendly experiences',
                  icon: Zap,
                  color: 'from-purple-500 to-pink-600'
                },
                {
                  role: 'Content Creators',
                  description: 'Financial writers and educators producing clear, helpful guides and tutorials',
                  icon: BookOpen,
                  color: 'from-green-500 to-teal-600'
                }
              ].map((team, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="text-center"
                >
                  <div className={`w-24 h-24 bg-gradient-to-br ${team.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                    <team.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{team.role}</h3>
                  <p className="text-gray-600">{team.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-12 text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Join Over 1 Million Users</h2>
            <p className="text-2xl mb-8 text-white/90">
              Start making smarter financial decisions today with our free tools
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="/tools"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
              >
                Explore All Tools
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
