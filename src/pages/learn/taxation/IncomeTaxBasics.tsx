import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calculator } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const IncomeTaxBasics: React.FC = () => (
  <>
    <SEOHelmet title="Income Tax Basics India: Tax Slabs, Old vs New Regime 2025 | MoneyCal" description="Complete income tax guide. Tax slabs for FY 2024-25, old regime vs new regime comparison, which is better for you." keywords="income tax India, tax slabs 2025, old vs new regime, income tax calculator, आयकर स्लैब" url="/learn/taxation-compliance/income-tax-basics-india-slabs-old-vs-new-regime-2025" />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-blue-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 1 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Income Tax Basics: Tax Slabs & Regimes</h1>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">📊 Tax Slabs FY 2024-25 (AY 2025-26)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-blue-300 rounded-lg p-5 bg-blue-50">
              <h3 className="text-xl font-bold mb-4 text-blue-900">Old Regime</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>₹0 - ₹2.5L</span><strong>0%</strong></div>
                <div className="flex justify-between"><span>₹2.5L - ₹5L</span><strong>5%</strong></div>
                <div className="flex justify-between"><span>₹5L - ₹10L</span><strong>20%</strong></div>
                <div className="flex justify-between"><span>Above ₹10L</span><strong>30%</strong></div>
              </div>
              <p className="text-xs text-blue-700 mt-3">✅ Allows all deductions (80C, 80D, HRA, etc.)</p>
            </div>
            <div className="border-2 border-green-300 rounded-lg p-5 bg-green-50">
              <h3 className="text-xl font-bold mb-4 text-green-900">New Regime (Default)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>₹0 - ₹3L</span><strong>0%</strong></div>
                <div className="flex justify-between"><span>₹3L - ₹7L</span><strong>5%</strong></div>
                <div className="flex justify-between"><span>₹7L - ₹10L</span><strong>10%</strong></div>
                <div className="flex justify-between"><span>₹10L - ₹12L</span><strong>15%</strong></div>
                <div className="flex justify-between"><span>₹12L - ₹15L</span><strong>20%</strong></div>
                <div className="flex justify-between"><span>Above ₹15L</span><strong>30%</strong></div>
              </div>
              <p className="text-xs text-green-700 mt-3">⚠️ NO deductions allowed (except 50K standard deduction)</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🎯 Which Regime to Choose?</h2>
          <ul className="space-y-2">
            <li>• <strong>Old Regime</strong>: If you have investments (₹1.5L in 80C, home loan EMI, health insurance). Tax + deductions = Lower effective tax.</li>
            <li>• <strong>New Regime</strong>: If you don't invest much or want simpler filing (no documentation for deductions). Lower rates but no deductions.</li>
            <li>• <strong>Example:</strong> ₹8L income → Old: ₹35K tax (after 80C) vs New: ₹50K tax. Old wins if you invest!</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default IncomeTaxBasics;



