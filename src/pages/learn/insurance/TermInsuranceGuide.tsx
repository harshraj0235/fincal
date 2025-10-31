import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Shield, CheckCircle, Target, AlertTriangle, DollarSign, Heart, Users } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const TermInsuranceGuide: React.FC = () => {
  const [age, setAge] = useState(30);
  const [annualIncome, setAnnualIncome] = useState(600000);
  
  const recommendedCover = annualIncome * 15; // 15x annual income rule
  const estimatedPremium = (recommendedCover / 100000) * (age < 30 ? 600 : age < 40 ? 800 : 1200);

  return (
    <>
      <SEOHelmet title="Term Insurance Guide: ₹1 Crore Cover for ₹12K/Year India | MoneyCal" description="Complete term insurance guide in Hindi & English. Cover amount, best companies, online vs offline, riders explained." keywords="term insurance India, 1 crore cover, term insurance calculator, best term plans, टर्म इंश्योरेंस" url="/learn/insurance-retirement/term-insurance-complete-guide-1-crore-cover-india" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 px-4">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex justify-between mb-8">
            <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-blue-600"><ArrowLeft className="w-5 h-5" />Back</Link>
            <span className="text-sm text-gray-600">Lesson 1 of 7</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Term Insurance Complete Guide</h1>
          <p className="text-xl text-gray-600 mb-8">टर्म इंश्योरेंस - ₹1 करोड़ कवर सिर्फ ₹12K/वर्ष में</p>

          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">🧮 Cover Amount Calculator</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Annual Income (₹):</label>
                <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>
            <div className="bg-blue-100 rounded-lg p-5">
              <div className="flex justify-between mb-3">
                <strong className="text-blue-900">Recommended Cover (15x income):</strong>
                <strong className="text-2xl text-blue-700">₹{(recommendedCover / 10000000).toFixed(2)} Crore</strong>
              </div>
              <div className="flex justify-between">
                <strong className="text-blue-900">Estimated Premium/Year:</strong>
                <strong className="text-xl text-green-700">₹{estimatedPremium.toFixed(0).toLocaleString()}</strong>
              </div>
              <p className="text-xs text-gray-600 mt-3">Formula: 15× annual income. Premium varies by age, health, smoking status.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">✅ Key Takeaways</h2>
            <ul className="space-y-2">
              <li>• Term insurance = pure life cover. If you die, family gets ₹1 Crore. You survive? No money back (that's why it's cheap!).</li>
              <li>• Cover needed: 15-20× annual income. Earning ₹6L/year? Get ₹90L-₹1.2Cr cover.</li>
              <li>• Cost: ₹1 Crore cover for 30-year-old = ₹12-15K/year (₹1K/month). Extremely affordable!</li>
              <li>• Best companies 2025: HDFC Life, ICICI Pru, Max Life, LIC (online plans 30% cheaper).</li>
              <li>• NEVER buy: Endowment, money-back, ULIP. Only TERM insurance (cheapest, highest cover).</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">🏆 Top 5 Term Insurance Plans (2025)</h2>
            <div className="space-y-3">
              {[
                { company: 'HDFC Life Click 2 Protect', cover: '₹1 Cr', premium: '₹11,500/year', claim: '98.12%' },
                { company: 'ICICI Pru iProtect Smart', cover: '₹1 Cr', premium: '₹12,200/year', claim: '97.82%' },
                { company: 'Max Life Smart Secure Plus', cover: '₹1 Cr', premium: '₹12,800/year', claim: '99.34%' },
                { company: 'LIC Tech Term', cover: '₹1 Cr', premium: '₹14,500/year', claim: '98.50%' },
                { company: 'SBI eShield', cover: '₹1 Cr', premium: '₹13,000/year', claim: '97.50%' }
              ].map((plan, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <strong className="text-gray-900 block">{plan.company}</strong>
                    <span className="text-xs text-gray-600">Claim Settlement: {plan.claim}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-700">{plan.cover}</div>
                    <div className="text-xs text-gray-600">{plan.premium}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermInsuranceGuide;


