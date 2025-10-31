import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Award } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const EstatePlanningInheritance: React.FC = () => (
  <>
    <SEOHelmet title="Estate Planning Inheritance: Wealth Transfer Family Office No Inheritance Tax India 2025 | MoneyCal" description="Plan wealth transfer. Will vs trust, succession planning, HUF (Hindu Undivided Family) benefits, family office (₹100Cr+ wealth), gifting strategies (no gift tax to relatives)." keywords="estate planning India, inheritance tax, will vs trust, HUF benefits, family office, wealth transfer, संपदा योजना विरासत" url="/learn/advanced-specialised-finance/estate-planning-inheritance-tax-wealth-transfer-family-office-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/advanced-specialised-finance" className="flex items-center gap-2 text-gray-600 hover:text-pink-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 7 of 7 - FINAL!</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Estate Planning: Secure Your Legacy!</h1>
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">🏛️ Good News: No Inheritance Tax in India!</h2>
          <ul className="space-y-2 text-sm">
            <li>• India abolished inheritance tax (Estate Duty) in 1985. Receiving property/money from parents/relatives = 100% tax-free! (Gift from non-relatives &gt; ₹50K is taxable at slab rates).</li>
            <li>• <strong>Will vs Trust:</strong> Will = Executed after death. Simple. Trust = Active during lifetime. Complex but better for large estates (₹10Cr+). Trust assets bypass probate (court process).</li>
            <li>• <strong>HUF (Hindu Undivided Family):</strong> Separate tax entity. Deductions: ₹1.5L (80C) + ₹50K (NPS). Effective tax planning for joint family businesses. Minimum 2 members.</li>
            <li>• <strong>Family Office:</strong> For ultra-HNI (₹100Cr+ wealth). Dedicated team manages investments, tax, estate planning. Cost: ₹50L-₹2Cr/year. Examples: Premji Invest (Wipro), Ranjan Pai (Manipal).</li>
            <li>• <strong>Succession Planning:</strong> Start early (age 50-55). Train next generation. Gradual transfer (gift ₹50L/year to children over 10 years = ₹5Cr transferred tax-free!).</li>
          </ul>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🎉 Advanced Topics / Specialised Finance Category Complete!</h2>
          <p className="text-xl mb-6">You've mastered all 7 lessons on advanced investing strategies!</p>
          <Link to="/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Explore More Categories <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default EstatePlanningInheritance;

