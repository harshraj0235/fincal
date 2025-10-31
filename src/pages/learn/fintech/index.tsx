import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, TrendingUp, Smartphone } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { fintechLessons } from '../../../data/learn/fintechLessons';

const FinTechDigitalPaymentsHub: React.FC = () => {
  return (
    <>
      <SEOHelmet 
        title="FinTech & Digital Payments Guide for Indians | MoneyCal Learn" 
        description="Master UPI, digital wallets, online banking, payment security in Hindi & English. 6 comprehensive lessons on GPay, PhonePe, Paytm, CRED, Jupiter, and cyber fraud prevention." 
        keywords="UPI guide India, digital wallet, GPay PhonePe Paytm, online banking, payment security, cyber fraud prevention, FinTech apps India, BNPL, UPI गाइड, डिजिटल भुगतान" 
        url="/learn/fintech-digital-payments" 
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pt-20 px-4">
        <div className="max-w-6xl mx-auto py-12">
          <Link to="/learn" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Learn Hub</span>
          </Link>

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-12 mb-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">💳</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">FinTech & Digital Payments</h1>
                <p className="text-xl opacity-90">फिनटेक और डिजिटल भुगतान - भारत का डिजिटल क्रांति</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Master digital payments in India! Learn UPI (GPay, PhonePe, Paytm), digital wallets, online banking (NEFT/RTGS/IMPS), payment security, avoid UPI scams, explore FinTech apps (CRED, Jupiter, Fi), and understand BNPL (Buy Now Pay Later). Become a digital payment expert! 🚀
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span><strong>6 Lessons</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span><strong>~4 Hours</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                <span><strong>100% Digital India Ready</strong></span>
              </div>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {fintechLessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/learn/fintech-digital-payments/${lesson.slug}`}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-400 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-blue-600 uppercase">{lesson.difficulty}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                <p className="text-sm text-blue-700 font-semibold mb-4">🇮🇳 {lesson.titleHindi}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Start Learning →</span>
                  <div className="w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-400 flex items-center justify-center transition-colors">
                    <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:text-white rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">📱 Join 500M+ Digital India Users!</h2>
            <p className="text-gray-600 mb-6">
              India processes <strong>10 billion+ UPI transactions/month</strong>! Start with <strong>UPI Complete Guide</strong> to master digital payments, or jump to <strong>Payment Security</strong> to protect yourself from cyber fraud!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/learn/fintech-digital-payments/upi-complete-guide-gpay-phonepe-paytm-limit-charges-india-2025"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Start with UPI Guide
              </Link>
              <Link
                to="/learn/fintech-digital-payments/payment-security-cyber-fraud-prevention-upi-scams-india-2025"
                className="px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
              >
                Learn Payment Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinTechDigitalPaymentsHub;



