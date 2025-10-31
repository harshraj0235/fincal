import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Award } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const WillEstatePlanning: React.FC = () => (
  <>
    <SEOHelmet title="Will & Estate Planning India: Succession, Nomination, No Inheritance Tax | MoneyCal" description="Estate planning basics. Writing will, nomination, succession laws. No inheritance tax in India!" keywords="will estate planning India, succession laws, nomination, inheritance tax India, वसीयत संपत्ति योजना" url="/learn/insurance-retirement/will-estate-planning-india-succession-nomination-inheritance-tax" />
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-pink-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 7 of 7 - FINAL!</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Will & Estate Planning: Secure Your Legacy</h1>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">📝 Writing a Will (5 Steps)</h2>
          <div className="space-y-3">
            {[
              'List all assets: Property, bank accounts, demat, gold, vehicles',
              'Decide beneficiaries: Who gets what? (spouse, children, parents)',
              'Appoint executor: Trusted person to distribute assets after your death',
              'Register will: Not mandatory but recommended (₹5K at sub-registrar)',
              'Update every 5 years or after major life events (marriage, child birth)'
            ].map((step, i) => (
              <div key={i} className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <strong className="text-pink-900">{i + 1}. {step}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🎉 Insurance & Retirement Category Complete!</h2>
          <p className="text-xl mb-6">You've mastered all 7 lessons on protection and retirement!</p>
          <Link to="/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Explore More Categories <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default WillEstatePlanning;


