import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Heart, Shield, CheckCircle, Target,
  AlertTriangle, Lightbulb, DollarSign, Users, Calculator,
  Zap, XCircle, Award, Clock, TrendingUp, FileText
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const HealthInsuranceGuide: React.FC = () => {
  const [age, setAge] = useState(30);
  const [familyMembers, setFamilyMembers] = useState(4);
  const [coverAmount, setCoverAmount] = useState(500000);
  
  const basePremium = coverAmount / 1000 * (age < 30 ? 8 : age < 40 ? 12 : age < 50 ? 18 : 30);
  const floaterPremium = basePremium * familyMembers * 0.6; // 40% discount for floater
  const individualPremium = basePremium * familyMembers;

  return (
    <>
      <SEOHelmet 
        title="Health Insurance India: ₹5L Family Floater, Cashless Claims, Portability Guide 2025 | MoneyCal" 
        description="Complete health insurance guide in Hindi & English. Individual vs family floater, cover amount calculator, cashless claim process, portability, waiting periods, best companies, room rent limits." 
        keywords="health insurance India, family floater, 5 lakh cover, cashless claim process, portability, waiting period, room rent limit, स्वास्थ्य बीमा गाइड" 
        url="/learn/insurance-retirement/health-insurance-india-5-lakh-cover-family-floater-portability" 
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Insurance & Retirement</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 2 of 7</span>
                <Link 
                  to="/learn/insurance-retirement/nps-national-pension-system-tier-1-tier-2-tax-benefits-india"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                  Lesson 2 • 60 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Health Insurance: Protect Against Medical Bankruptcy
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  स्वास्थ्य बीमा: ₹5-10 लाख कवर गाइड
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives (सीखने के उद्देश्य)
              </h3>
              <ul className="space-y-2">
                {[
                  'Calculate how much health cover you need (₹5L minimum, ₹10L+ ideal for family)',
                  'Compare Individual vs Family Floater policies (save ₹10K annually with floater)',
                  'Understand waiting periods (30 days, 2-4 years for pre-existing diseases)',
                  'Master cashless claim process (5-step guide for smooth hospitalization)',
                  'Learn portability rules (switch insurers without losing benefits)',
                  'Choose best health insurance companies (claim settlement ratio 85%+)'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Why Health Insurance is Critical */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6">
              🚨 Medical Costs in India: The Harsh Reality
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                <strong className="block mb-3 text-xl">💰 Common Medical Expenses:</strong>
                <ul className="space-y-2 text-sm">
                  <li>• Heart surgery: ₹3-5 lakh</li>
                  <li>• Cancer treatment: ₹10-25 lakh</li>
                  <li>• Kidney transplant: ₹8-15 lakh</li>
                  <li>• Brain surgery: ₹5-10 lakh</li>
                  <li>• ICU per day: ₹15-30K</li>
                  <li>• Normal delivery: ₹50K-1L</li>
                  <li>• C-section: ₹1-2 lakh</li>
                </ul>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5">
                <strong className="block mb-3 text-xl">😱 Without Insurance:</strong>
                <ul className="space-y-2 text-sm">
                  <li>• Sell FDs, break savings</li>
                  <li>• Take loan @ 15-20% interest</li>
                  <li>• Borrow from relatives (stress!)</li>
                  <li>• Delay treatment (risky!)</li>
                  <li>• Go to cheaper hospital (compromise)</li>
                  <li>• Financial ruin for years</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>Real Stat:</strong> 60% of bankruptcies in India are due to medical expenses. 
                One hospitalization can wipe out 10 years of savings. <strong>Health insurance is NOT optional - it's essential!</strong>
              </p>
            </div>
          </motion.section>

          {/* Cover Amount Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-green-600" />
              🧮 How Much Cover Do You Need?
            </h2>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Your Age:</label>
                  <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
                    min="18"
                    max="65"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Family Members:</label>
                  <input 
                    type="number" 
                    value={familyMembers} 
                    onChange={(e) => setFamilyMembers(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
                    min="1"
                    max="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Cover Amount (₹):</label>
                  <select
                    value={coverAmount}
                    onChange={(e) => setCoverAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
                  >
                    <option value={300000}>₹3 Lakh</option>
                    <option value={500000}>₹5 Lakh</option>
                    <option value={1000000}>₹10 Lakh</option>
                    <option value={2000000}>₹20 Lakh</option>
                    <option value={5000000}>₹50 Lakh</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border-2 border-blue-500">
                  <div className="text-sm text-gray-600 mb-1">Family Floater Premium (Estimate)</div>
                  <div className="text-3xl font-bold text-blue-700">
                    ₹{floaterPremium.toFixed(0).toLocaleString()}/year
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Covers all {familyMembers} members, shared ₹{(coverAmount/100000).toFixed(0)}L</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-orange-500">
                  <div className="text-sm text-gray-600 mb-1">Individual Plans (All Members)</div>
                  <div className="text-3xl font-bold text-orange-700">
                    ₹{individualPremium.toFixed(0).toLocaleString()}/year
                  </div>
                  <p className="text-xs text-gray-600 mt-2">₹{(coverAmount/100000).toFixed(0)}L each person (₹{(coverAmount*familyMembers/100000).toFixed(0)}L total)</p>
                </div>
              </div>

              <div className="mt-4 bg-green-100 rounded-lg p-4">
                <strong className="text-green-900">💰 You Save: ₹{(individualPremium - floaterPremium).toFixed(0).toLocaleString()}/year with Family Floater!</strong>
                <p className="text-sm text-gray-600 mt-2">
                  Family floater is 40-50% cheaper than individual policies for all members. 
                  Over 20 years, savings = ₹{((individualPremium - floaterPremium) * 20 / 100000).toFixed(2)} lakh!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Individual vs Family Floater */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg overflow-x-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              👨‍👩‍👧‍👦 Individual vs Family Floater: Complete Comparison
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="p-3 text-left">Feature</th>
                    <th className="p-3">Family Floater</th>
                    <th className="p-3">Individual Policies</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Cost (₹5L cover, family of 4)</td>
                    <td className="p-3 text-center font-bold text-green-700">₹18,000/year</td>
                    <td className="p-3 text-center font-bold text-red-700">₹32,000/year</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Coverage</td>
                    <td className="p-3 text-center">₹5L shared among all members</td>
                    <td className="p-3 text-center">₹5L per person (₹20L total)</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Scenario: 2 members hospitalized</td>
                    <td className="p-3 text-center text-orange-700">Share ₹5L between both</td>
                    <td className="p-3 text-center text-green-700">Each gets ₹5L (₹10L total)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Best For</td>
                    <td className="p-3 text-center">Young families (kids &lt; 18, parents &lt; 60)</td>
                    <td className="p-3 text-center">Seniors, chronic conditions, large families</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Premium Increase (Aging)</td>
                    <td className="p-3 text-center">Based on oldest member</td>
                    <td className="p-3 text-center">Each person's age separately</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <strong className="text-lg text-green-900 block mb-3">✅ When to Choose Family Floater:</strong>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Young family (parents &lt; 45, kids &lt; 18)</li>
                  <li>✓ Budget constraint (save 40-50% on premium)</li>
                  <li>✓ Healthy family (unlikely 2+ members hospitalized same year)</li>
                  <li>✓ Starter cover (can add super top-up later for more protection)</li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                <strong className="text-lg text-orange-900 block mb-3">⚠️ When to Choose Individual:</strong>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Parents &gt; 60 years (senior citizens need separate)</li>
                  <li>• Pre-existing conditions (diabetes, BP in family)</li>
                  <li>• Want maximum coverage per person</li>
                  <li>• Can afford higher premium (₹30-40K/year)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-100 rounded-xl p-6">
              <strong className="text-blue-900 text-lg block mb-3">🎯 Recommended Strategy:</strong>
              <p className="text-gray-700">
                <strong>Base:</strong> ₹5-10L Family Floater (cheap, covers routine hospitalization)<br/>
                <strong>Top-Up:</strong> ₹20-30L Super Top-Up (activates if base exhausted, very cheap - ₹5-8K/year)<br/>
                <strong>Total Coverage:</strong> ₹30-40L combined for apenas ₹25-30K/year premium!<br/><br/>
                This "Base + Top-Up" strategy gives high coverage at low cost. Best of both worlds!
              </p>
            </div>
          </motion.section>

          {/* Best Health Insurance Companies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🏆 Best Health Insurance Companies India (2024-25)
            </h2>

            <p className="text-gray-700 mb-6">
              <strong>Key Metric:</strong> <strong>Claim Settlement Ratio</strong> - percentage of claims approved by insurer. 
              Higher = better. Aim for 85%+ minimum.
            </p>

            <div className="space-y-4">
              {[
                {
                  company: 'Star Health Insurance',
                  csr: '91.5%',
                  premium: '₹16,000',
                  pros: ['Highest CSR in India', 'Specialized in health', '15,000+ network hospitals', 'Senior citizen friendly'],
                  plans: 'Star Comprehensive, Star Family Health Optima'
                },
                {
                  company: 'Care Health Insurance (Religare)',
                  csr: '89.2%',
                  premium: '₹15,500',
                  pros: ['High CSR', 'No room rent limit (many plans)', 'Fast claim processing', 'Good for maternity'],
                  plans: 'Care Supreme, Care Advantage'
                },
                {
                  company: 'Niva Bupa (Max Bupa)',
                  csr: '88.5%',
                  premium: '₹17,000',
                  pros: ['High CSR', 'Bupa global expertise', 'Unlimited restoration', 'Good customer service'],
                  plans: 'Niva Bupa ReAssure, Health Companion'
                },
                {
                  company: 'HDFC ERGO',
                  csr: '96.5%',
                  premium: '₹18,000',
                  pros: ['Highest CSR!', 'HDFC trust', 'Wide hospital network', 'Quick approvals'],
                  plans: 'HDFC ERGO Optima Restore, My:Health Suraksha'
                },
                {
                  company: 'ICICI Lombard',
                  csr: '88.0%',
                  premium: '₹17,500',
                  pros: ['ICICI brand', 'Good claim process', 'Health check-ups included', 'Wellness programs'],
                  plans: 'ICICI Health AdvantEdge, Complete Health Insurance'
                }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
                  <div className="flex items-center justify-between mb-3">
                    <strong className="text-xl text-gray-900">{item.company}</strong>
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                      CSR: {item.csr}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-600">Premium (₹5L floater, 4 members)</div>
                      <div className="text-2xl font-bold text-blue-700">{item.premium}/year</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-600">Popular Plans</div>
                      <div className="text-sm font-semibold text-gray-800">{item.plans}</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <strong className="text-green-800 block mb-2">✅ Why Choose:</strong>
                    <ul className="space-y-1 text-xs text-gray-700">
                      {item.pros.map((pro, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-400">
              <strong className="text-yellow-900 text-lg block mb-3">🎯 How to Choose:</strong>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Highest CSR:</strong> HDFC ERGO (96.5%), Star Health (91.5%)</li>
                <li><strong>Best Value:</strong> Care Health (₹15.5K for good coverage)</li>
                <li><strong>For Seniors:</strong> Star Health (specializes in senior citizen plans)</li>
                <li><strong>Best Features:</strong> Care Health (no room rent limit), Niva Bupa (unlimited restoration)</li>
              </ul>
            </div>
          </motion.section>

          {/* Cashless Claim Process */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🏥 Cashless Claim Process (5 Simple Steps)
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: '1. Check Network Hospital',
                  action: 'Before admission, verify hospital is in insurer\'s cashless network',
                  detail: 'Call insurance helpline or check app. 5,000-10,000 hospitals usually covered. Apollo, Fortis, Max, Manipal are in most networks.',
                  tip: 'Emergency? Any hospital okay. File reimbursement claim later. Non-emergency? Choose network hospital for cashless.'
                },
                {
                  step: '2. Inform TPA (Within 24 Hours)',
                  action: 'Call insurance TPA helpline immediately after admission',
                  detail: 'TPA = Third Party Administrator (handles claims for insurance company). Number on insurance card. Available 24/7.',
                  tip: 'Inform ASAP! Delay in intimation can cause claim issues. Save TPA number in phone contacts.'
                },
                {
                  step: '3. Submit Pre-Authorization Form',
                  action: 'Hospital insurance desk will help fill pre-auth form',
                  detail: 'Form asks: Policy number, ailment, estimated bill, doctor treating. Hospital submits to TPA digitally within 2-4 hours.',
                  tip: 'Keep policy number saved in phone notes. Makes process faster. Also carry insurance card always!'
                },
                {
                  step: '4. TPA Approval (2-6 Hours)',
                  action: 'TPA reviews and approves coverage amount',
                  detail: 'Approved amount may be less than actual bill if hospital charges are inflated. E.g., hospital estimated ₹2L, TPA approves ₹1.5L (standard rates).',
                  tip: 'If amount insufficient, you pay difference. Or negotiate with hospital to reduce bill to approved amount.'
                },
                {
                  step: '5. Discharge Without Payment',
                  action: 'Hospital gets payment from insurance, you walk out without paying',
                  detail: 'You apenas sign discharge papers. Hospital directly bills insurance. If bill > approved amount, pay difference.',
                  tip: 'Get discharge summary, all bills, reports. Keep for records. Needed for tax (medical expenses deduction).'
                }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">{i + 1}</span>
                    <strong className="text-lg text-blue-900">{item.step}</strong>
                  </div>
                  <p className="text-gray-700 mb-2"><strong>What to do:</strong> {item.action}</p>
                  <p className="text-gray-600 text-sm mb-3"><strong>Details:</strong> {item.detail}</p>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-800"><strong>💡 Pro Tip:</strong> {item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Common Mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ⚠️ 10 Health Insurance Mistakes to Avoid
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: 'Buying apenas ₹1-2 lakh cover (insufficient!)',
                  reality: 'ICU for 3 days = ₹1 lakh gone! Heart surgery = ₹4-5 lakh. ₹2L cover exhausted in 2 days. Then you pay from pocket.',
                  fix: 'Minimum ₹5L for family of 4. Ideal: ₹10L base + ₹20L super top-up = ₹30L total coverage for apenas ₹25K/year premium.'
                },
                {
                  mistake: 'Not disclosing pre-existing diseases (diabetes, BP)',
                  reality: `Claim time, insurance investigates medical history. Found diabetes pero you didn't declare? Claim REJECTED! ₹10L hospital bill, you pay from pocket.`,
                  fix: 'Declare honestly. Premium increases 20-30% pero at least claims get paid. Hiding diseases = claim rejection risk.'
                },
                {
                  mistake: 'Buying health insurance apenas when sick',
                  reality: 'Got diabetes at age 45, NOW want insurance? Premium is 40-50% higher. Also 2-4 year waiting period for diabetes-related claims!',
                  fix: `Buy young (age 25-30) when healthy. Lock low premium. Pre-existing conditions covered after waiting period. Don't wait till sick!`
                },
                {
                  mistake: 'Not checking room rent limit',
                  reality: 'Policy has ₹5K/day room rent limit. Admitted to AC room ₹8K/day. Insurance pays apenas ₹5K. You pay ₹3K/day. 10 days = ₹30K from pocket!',
                  fix: 'Choose policies with no room rent limit or 2% of sum insured (₹5L cover = ₹10K/day okay). Costs apenas ₹2-3K extra premium.'
                },
                {
                  mistake: 'Relying apenas on company health insurance',
                  reality: 'Company gives ₹3L cover. Leaves job? No insurance! Also company policy stops at 60 (retirement) when you need it MOST!',
                  fix: 'Buy personal health policy (₹5L minimum). Company insurance is bonus. Your policy stays lifelong, regardless of job/age.'
                },
                {
                  mistake: 'Not porting to better insurer (stuck with bad claims company)',
                  reality: `Current insurer has 65% CSR (rejects 35% claims!). Pero stuck for 10 years thinking "I'll lose benefits". You won't!`,
                  fix: `Portability allowed after 1 year. Keep accumulated benefits (no fresh waiting periods). Switch to 90%+ CSR company. Don't suffer bad service!`
                },
                {
                  mistake: 'Buying health insurance with investment (ULIP health plans)',
                  reality: 'Some policies mix health cover + investment. Returns are apenas 5-6% (worse than mutual funds 12%). Expensive + low returns.',
                  fix: 'Buy pure health insurance. Invest separately in mutual funds. NEVER mix insurance with investment!'
                },
                {
                  mistake: 'Not knowing waiting periods (shocked when claim rejected!)',
                  reality: 'Bought policy in Jan. Hospitalized for knee surgery in Feb. Claim rejected! Why? 30-day waiting period for all diseases (except accidents).',
                  fix: 'Read policy: 30 days for illness, 2-4 years for pre-existing (diabetes, BP), 9-12 months for maternity. Plan accordingly!'
                },
                {
                  mistake: 'Choosing cheapest policy (₹8K premium vs ₹15K)',
                  reality: 'Cheap policy has: Low network hospitals (800 vs 5,000), room rent limits (₹3K/day), copay 20% (you pay 20% of bill), claim rejection common.',
                  fix: `Don't choose based on premium alone. Check: CSR 85%+, network hospitals 5,000+, no room rent limit, zero copay. Worth paying ₹5-7K extra.`
                },
                {
                  mistake: 'Not buying critical illness rider',
                  reality: 'Cancer treatment costs ₹15-25L over 2-3 years. Base health insurance covers apenas hospitalization, not outpatient chemo (₹2-3L).',
                  fix: 'Add critical illness rider (₹3-4K/year for ₹20L cover). Pays lump sum if diagnosed with cancer/heart attack. Use for treatment, income loss, etc.'
                }
              ].map((item, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex items-start gap-3">
                    <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                    <div>
                      <p className="text-red-900 font-bold mb-2 text-lg">❌ {item.mistake}</p>
                      <p className="text-gray-700 mb-2"><strong>Reality:</strong> {item.reality}</p>
                      <p className="text-green-700"><strong>✅ Fix:</strong> {item.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Expert Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 shadow-lg border-2 border-yellow-400"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              💡 Pro Health Insurance Tips
            </h2>

            <div className="space-y-4">
              {[
                'Buy before age 30. Premium at 25 = ₹12K. At 45 = ₹35K (3x more!). Every 10 years delay = 2x premium. Lock cheap rates young.',
                'Base + Top-Up strategy: ₹5L base (₹15K) + ₹20L super top-up (₹6K) = ₹25L total coverage for ₹21K apenas. Cheapest way to get high coverage!',
                'Choose policies with "Restoration Benefit". If ₹5L exhausted, it resets for next claim same year. Unlimited use in bad years.',
                `Get separate policy for parents > 60. Don't add to family floater (makes premium very expensive). Senior citizen plans available: Star Senior Citizen, Care Senior.`,
                'Maternity planning? Buy policy 9-12 months BEFORE conceiving (waiting period). Cost: ₹40-60K delivery expenses covered.',
                'Room rent: Choose "no capping" policies (Care, Niva Bupa offer this). Worth ₹3K extra premium. AC rooms are ₹8-10K/day, limits create co-payment issues.',
                `Keep insurance card photo in phone. Emergency? Show card, hospital starts cashless process. Don't waste time searching for card at home.`,
                'Renew ON TIME! Gap of even 1 day = fresh waiting periods (2-4 years for pre-existing). Set auto-debit or calendar reminder 15 days before expiry.'
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800"><strong>Tip {i + 1}:</strong> {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ❓ Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'What if hospital is not in cashless network during emergency?',
                  a: 'Admitted to any hospital (pay yourself). File reimbursement claim after discharge. Submit bills, discharge summary, doctor prescriptions. Insurance reimburses in 15-30 days.'
                },
                {
                  q: 'Can insurance reject my claim even if I have valid policy?',
                  a: 'Yes, if: (1) You hid pre-existing disease, (2) Treatment during waiting period, (3) Non-payable items (cosmetic surgery, vitamins, toiletries), (4) Fraud. Otherwise, no - if CSR is 90%+, genuine claims get approved.'
                },
                {
                  q: 'I have company insurance ₹3L. Should I buy personal policy?',
                  a: 'YES! Company policy stops when you leave job/retire (age 60). Buy ₹5-10L personal policy NOW (cheap at young age). Keep both - company covers small bills, personal covers major hospitalization.'
                },
                {
                  q: 'What is copayment? Should I avoid policies with copay?',
                  a: 'Copay = You pay certain % of bill. E.g., 20% copay on ₹1L bill = you pay ₹20K, insurance pays ₹80K. AVOID copay policies unless premium is 40-50% cheaper. Better to pay ₹5K extra premium than risk ₹20K copay!'
                },
                {
                  q: 'Can I port from Company A to Company B without losing benefits?',
                  a: 'YES! After 1 year, you can port. Accumulated waiting periods, no-claim bonus - all transfer. E.g., 3 years with ICICI, port to Star Health - your 3 years waiting for diabetes is preserved!'
                },
                {
                  q: 'Room rent limit ₹5K/day pero I need ICU ₹15K/day. What happens?',
                  a: 'Proportionate deduction! If room limit is 33% of actual (₹5K vs ₹15K), entire bill reduced by 33%. ₹3L bill becomes ₹2L claim. You pay ₹1L! Choose no-limit policies!'
                },
                {
                  q: `I'm 28, healthy. Should I buy health insurance now or wait?`,
                  a: `Buy NOW! Age 28: ₹10L cover = ₹15K/year. Age 38: Same = ₹28K/year. Lock cheap rates now. Even if you don't claim for 10 years, premium saved vs buying later = ₹1.5 lakh!`
                },
                {
                  q: 'What is restoration benefit? Is it useful?',
                  a: 'If you use full ₹5L sum insured, restoration benefit refills it for next claim SAME YEAR. E.g., father hospitalized (₹5L used), mother hospitalized (₹5L restored, available again). Very useful for families!'
                },
                {
                  q: 'Should I take ₹10L individual or ₹5L family floater?',
                  a: 'Family floater if young family (kids &lt; 18, parents &lt; 45). Cheaper + sufficient. Individual ₹10L if parents &gt; 60, multiple chronic conditions, or you can afford ₹40K+ premium.'
                },
                {
                  q: 'Maternity covered? What's the waiting period?',
                  a: 'Most policies cover maternity after 9-12 month waiting period. Coverage: ₹40K-₹1L per delivery. Plan pregnancy after insurance! Buy policy → Wait 1 year → Conceive → Delivery covered.'
                }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <p className="font-bold text-lg text-gray-900 mb-2">Q{i + 1}: {faq.q}</p>
                  <p className="text-gray-700"><strong>A:</strong> {faq.a}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Action Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Your Health Insurance Action Plan
            </h2>

            <div className="space-y-3">
              {[
                'Calculate cover needed: ₹5L minimum for family, ₹10L ideal',
                'Compare 3 insurers: Star Health, Care Health, HDFC ERGO (check CSR 85%+)',
                'Choose Family Floater for young families (save 40% vs individual)',
                'Add Super Top-Up ₹20L (apenas ₹5-6K extra for huge coverage)',
                'Declare ALL health issues honestly (avoid claim rejection)',
                'Choose NO room rent limit policies (worth ₹3K extra premium)',
                'Save TPA helpline number in phone contacts',
                `Set auto-renewal (don't let policy lapse - fresh waiting periods!)`
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>💡 Remember:</strong> Medical emergency can bankrupt you in 48 hours. 
                ₹15-20K/year premium is NOTHING compared to ₹10-25L hospital bill. 
                <strong> Buy health insurance TODAY, not tomorrow!</strong>
              </p>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: NPS - National Pension System Complete Guide</h3>
            <p className="mb-6 text-purple-100">
              Learn NPS Tier 1 vs Tier 2, tax benefits ₹50K extra (80CCD), returns 10-12%, 
              how to build ₹2 crore retirement corpus!
            </p>
            <Link
              to="/learn/insurance-retirement/nps-national-pension-system-tier-1-tier-2-tax-benefits-india"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: NPS Complete Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthInsuranceGuide;
