import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const FinancialIndependence: React.FC = () => (
  <>
    <SEOHelmet title="Financial Independence FIRE: Early Retirement at 40 India 2025 | MoneyCal" description="Achieve FIRE (Financial Independence Retire Early). Save 50-70% of income, invest aggressively, FI number calculation (25× annual expenses), coast FIRE, barista FIRE." keywords="financial independence India, FIRE movement, early retirement, retire at 40, FI number, वित्तीय स्वतंत्रता FIRE" url="/learn/behavioural-finance-money-psychology/financial-independence-fire-movement-early-retirement-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/behavioural-finance-money-psychology" className="flex items-center gap-2 text-gray-600 hover:text-teal-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 6 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">FIRE: Retire at 40, Live on Investments!</h1>
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🔥 FIRE Formula (Financial Independence Retire Early)</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>FI Number:</strong> Annual expenses × 25 = FI number. Example: ₹6L/year expenses → Need ₹1.5 Cr corpus. Then live on 4% withdrawal (₹6L) forever!</li>
            <li>• <strong>How to Achieve:</strong> 1) Increase income (₹50K → ₹1L/month), 2) Reduce expenses (₹40K → ₹25K), 3) Invest difference (₹75K/month) for 15 years = ₹3 Cr at 12%!</li>
            <li>• <strong>Save 50-70% of Income:</strong> Extreme? Yes. Possible? Yes! Live in shared flat (₹10K vs ₹20K), cook at home (₹5K vs ₹15K), no EMIs, buy used car. Sacrifice 10 years, freedom 40 years!</li>
            <li>• <strong>Coast FIRE:</strong> Save aggressively till 35, build ₹50L corpus. Then work part-time. Corpus grows to ₹3Cr by 60 (no more contributions needed). Work less, enjoy life!</li>
            <li>• <strong>Barista FIRE:</strong> Quit high-stress job at 40. Work low-stress coffee shop job (₹20K/month) for health insurance + basic expenses. Investments handle rest. Semi-retired!</li>
            <li>• <strong>FIRE in India:</strong> Easier than US! Lower cost of living. ₹50K/month = comfortable life in Tier-2 cities. Need only ₹1.5Cr to retire!</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default FinancialIndependence;


