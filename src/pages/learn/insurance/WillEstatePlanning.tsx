import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Zap,
  BarChart3, Layers, Lock, Users, Star, Sparkles, Clock, BadgeCheck,
  PieChart, Percent, Calculator, Building, Landmark, CreditCard,
  TrendingDown, Info, Download, Share2, FileText, Calendar, Home,
  Smartphone, Globe, XCircle, BookOpen, UserCheck, HeartHandshake
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const WillEstatePlanning: React.FC = () => {
  const [showWillTemplate, setShowWillTemplate] = useState(false);

  const faqData = [
    {
      question: "What is a Will and why do I need one?",
      answer: "A Will is a legal document stating who gets your assets after your death. Why needed: (1) Avoid family disputes, (2) Ensure assets go to intended persons (not default succession law), (3) Appoint guardian for minor children, (4) Save time & legal costs for heirs. Without will = intestate succession (state decides who gets what)."
    },
    {
      question: "Is there inheritance tax in India?",
      answer: "NO inheritance tax in India! When someone dies, heirs get assets 100% tax-free. No estate duty, no inheritance tax (unlike US 40%, UK 40%). Only cost: Stamp duty on property transfer (5-7% state-wise). Gift tax: Also NO (but clubbing provisions if reversible gift)."
    },
    {
      question: "What is nomination and how is it different from Will?",
      answer: "Nomination: Caretaker who receives asset temporarily (must distribute as per Will/succession law). Will: Final ownership transfer. Example: Bank account nominee = Wife (she receives money) but Will says 50% to son → Wife must give 50% to son. Nomination ≠ ownership! Both are needed."
    },
    {
      question: "How to write a valid Will in India?",
      answer: "5 requirements: (1) Written (typed/handwritten), (2) Signed by you (testator), (3) Witnessed by 2 people (they sign + address), (4) Sound mind when writing, (5) Not under coercion. Registration not mandatory but recommended (₹5,000 at sub-registrar). Can type on plain paper - no stamp paper needed!"
    },
    {
      question: "Can I change my Will after writing?",
      answer: "YES! Will can be modified anytime while alive. Ways: (1) Write new Will (auto cancels old), (2) Add codicil (amendment to existing Will). Best practice: Review & update every 5 years or after major events (marriage, child birth, divorce, property purchase)."
    },
    {
      question: "What happens if I die without a Will (intestate)?",
      answer: "Hindu Succession Act applies (for Hindus/Sikhs/Jains/Buddhists). Assets distributed: (1) Class I heirs: Wife, children, mother (equal shares), (2) If no Class I, then Class II (father, siblings, etc). Process: Legal heir certificate (6-12 months) + court approval. Result: Delays + family disputes + legal costs!"
    },
    {
      question: "Where to add nomination in India?",
      answer: "Add everywhere! (1) Bank accounts (savings, FD, PPF), (2) Demat account (shares), (3) Mutual funds, (4) Insurance policies, (5) EPF/PPF, (6) Property (co-owner nomination). How: Fill nomination form (online netbanking or offline). Takes 5 minutes per account. Update after marriage/children!"
    },
    {
      question: "Can NRI write a Will for Indian assets?",
      answer: "YES! NRI can write separate Wills: (1) Indian Will for Indian property/assets (as per Indian laws), (2) Foreign Will for assets abroad (as per that country's laws). Register Indian Will in India. Executor can be in India or abroad. Assets distributed as per Will, no inheritance tax!"
    },
    {
      question: "What is a Trust and who needs it?",
      answer: "Trust: Legal entity to hold assets for beneficiaries. Needed if: (1) HNI with ₹10+ Cr assets (tax planning, privacy), (2) Minor/disabled beneficiaries (trustee manages till they're capable), (3) Charitable goals. Cost: ₹50K-2L setup + annual maintenance. Regular person: Will is enough, no need for trust!"
    },
    {
      question: "How to ensure smooth asset transfer to heirs?",
      answer: "5-step checklist: (1) Write Will + register (₹5K), (2) Add nomination in all accounts (bank, demat, MF, insurance), (3) Make asset list with account numbers, (4) Keep Will + documents in locker (tell executor location), (5) Review & update every 5 years. Smooth transfer = no family disputes!"
    },
    {
      question: "What is succession certificate and when is it needed?",
      answer: "Court-issued document proving who are legal heirs. Needed: (1) If no Will + no nomination (intestate death), (2) To claim assets from bank/company, (3) To transfer shares/property. Process: Apply to court, wait 6-12 months, pay ₹50K-2L legal costs. Avoid by: Writing Will + adding nominations!"
    },
    {
      question: "Can I give assets to charity in Will?",
      answer: "YES! You can donate 0-100% to charity. Tax benefit: Nil (you're dead!). But: (1) Mention charity name, address clearly, (2) Inform charity (they may honor your memory), (3) Executor ensures transfer. Many donate 10-20% to charity, rest to family. Your choice!"
    },
    {
      question: "What happens to joint property after death?",
      answer: "Joint property types: (1) Joint tenancy: Survivor gets 100% automatically (no Will needed). (2) Tenancy in common: Your share (50%) goes as per Will. In India: Most joint bank accounts are 'Either or Survivor' (survivor gets all). Joint property: Ownership as per sale deed (50-50 or as mentioned)."
    },
    {
      question: "Should I tell my family about my Will?",
      answer: "YES! (1) Tell executor where Will is kept (locker/lawyer), (2) Inform family broadly (avoid shock/disputes later), (3) DON'T: Share exact asset distribution (may cause conflicts while you're alive). Balance: Transparency about existence of Will, privacy about exact contents."
    },
    {
      question: "How much does it cost to write a Will in India?",
      answer: "DIY: ₹0 (write yourself on plain paper, get 2 witnesses). Lawyer: ₹5,000-20,000 (depends on complexity/city). Registration: ₹5,000 at sub-registrar (optional but recommended). Total: ₹0-25,000. Don't use expensive 'Will writing' services (₹50K+) - not worth it for most people!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Will & Estate Planning India 2025: Write Valid Will, Succession Laws, Nomination Guide | No Inheritance Tax! | MoneyCal"
        description="Complete Will & Estate Planning guide for India: How to write valid Will (5 steps), nomination vs Will difference, Hindu Succession Act, no inheritance tax in India, intestate succession, trusts for HNIs, asset transfer checklist, legal heir certificate. Free Will template. Secure your legacy for family. Hindi + English"
        keywords="will estate planning India, how to write will, succession laws India, nomination guide, no inheritance tax India, intestate succession, trust for HNIs, legal heir certificate, वसीयत संपत्ति योजना"
        url="/learn/insurance-retirement/will-estate-planning-india-succession-nomination-inheritance-tax"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Insurance & Retirement</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-pink-600 font-semibold">Lesson 7 of 7 - FINAL!</span>
                <Link 
                  to="/learn/insurance-retirement"
                  className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <span className="hidden sm:inline">Back to Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-pink-600 uppercase tracking-wide">
                  Lesson 7 • 45 Minutes • Intermediate • FINAL
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Will & Estate Planning 2025
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  Secure Your Legacy - वसीयत और संपत्ति योजना
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-pink-50 border-l-4 border-pink-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-pink-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Master
              </h3>
              <ul className="space-y-2 text-pink-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>How to write a valid Will in India (5 steps + free template)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Nomination vs Will: Difference explained with examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Good news: NO inheritance tax in India! (Assets 100% tax-free)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Hindu Succession Act: What happens without Will (intestate)</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* No Inheritance Tax */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                🎉 Good News: NO Inheritance Tax in India!
              </h2>

              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-3">Your Heirs Get 100% Tax-Free!</h3>
                  <p className="mb-4">
                    When you die, your family receives ALL assets (property, FDs, stocks, gold) <strong>without paying any inheritance tax.</strong> 
                    India abolished estate duty in 1985. Zero tax on inherited wealth!
                  </p>
                  <div className="bg-white/30 rounded-lg p-4">
                    <strong>Example:</strong> You have ₹5 Crore assets (₹2 Cr property + ₹3 Cr investments)
                    <p className="mt-2">→ Your children inherit full ₹5 Crore</p>
                    <p>→ Tax paid: ₹0 (zero!)</p>
                    <p className="text-green-300 font-bold">Compare: USA 40% = ₹2 Cr tax. UK 40% = ₹2 Cr tax. India = ₹0!</p>
                  </div>
                </div>

                <div className="bg-yellow-400 text-gray-900 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-yellow-700" />
                    Only Cost: Stamp Duty on Property Transfer
                  </h3>
                  <p className="text-sm">When property is transferred to heir's name: 5-7% stamp duty (varies by state). On ₹1 Cr property = ₹5-7L stamp duty. But this is transfer cost, NOT inheritance tax!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* How to Write a Will */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-pink-600" />
                How to Write a Valid Will (5 Steps)
              </h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="border-l-4 border-pink-500 bg-pink-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-pink-700 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                    List All Your Assets
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li>✅ <strong>Immovable:</strong> House, land, plot (address, survey number, value)</li>
                    <li>✅ <strong>Bank accounts:</strong> Savings, FD, PPF (bank name, account number, approx balance)</li>
                    <li>✅ <strong>Investments:</strong> Demat account, mutual funds, shares, bonds</li>
                    <li>✅ <strong>Insurance:</strong> Life insurance policies (policy number, sum assured)</li>
                    <li>✅ <strong>Vehicles:</strong> Car, bike (registration number)</li>
                    <li>✅ <strong>Jewelry/Gold:</strong> Approximate value</li>
                    <li>✅ <strong>Business:</strong> Partnership share, sole proprietorship</li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                    Decide Beneficiaries (Who Gets What)
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li><strong>Spouse:</strong> Usually 50-60% of assets</li>
                    <li><strong>Children:</strong> Remaining 40-50% (equal or unequal shares - your choice!)</li>
                    <li><strong>Parents:</strong> If dependent on you, allocate portion</li>
                    <li><strong>Charity:</strong> Optional (10-20% common for philanthropic goals)</li>
                    <li><strong>Specific items:</strong> "Gold jewelry to daughter", "Ancestral house to son"</li>
                  </ul>
                  <div className="bg-white p-4 rounded-lg mt-4">
                    <strong>Example:</strong> Total ₹2 Cr assets →
                    <p className="text-sm">• Wife: ₹1 Cr (50%)</p>
                    <p className="text-sm">• Son: ₹50L (25%)</p>
                    <p className="text-sm">• Daughter: ₹50L (25%)</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                    Appoint Executor
                  </h3>
                  <p className="text-gray-800 mb-3">
                    Executor: Trusted person who will distribute assets as per your Will after your death.
                  </p>
                  <ul className="space-y-2 text-gray-800">
                    <li><strong>Choose:</strong> Spouse, adult child, trusted friend, lawyer</li>
                    <li><strong>Qualities:</strong> Honest, financially savvy, good with paperwork</li>
                    <li><strong>Duties:</strong> File Will in court, pay debts, distribute assets, handle objections</li>
                    <li><strong>Tip:</strong> Appoint alternate executor if primary unavailable</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                    Write & Sign the Will
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li><strong>Format:</strong> Typed or handwritten on plain paper (no stamp paper needed!)</li>
                    <li><strong>Language:</strong> English, Hindi, or any Indian language (avoid ambiguous words)</li>
                    <li><strong>Witnesses:</strong> 2 people (18+, NOT beneficiaries!) sign + write full address</li>
                    <li><strong>Your Signature:</strong> Sign on every page (avoid disputes)</li>
                    <li><strong>Date:</strong> Mention date & place of signing</li>
                  </ul>
                  <button 
                    onClick={() => setShowWillTemplate(!showWillTemplate)}
                    className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors"
                  >
                    {showWillTemplate ? 'Hide' : 'View'} Free Will Template
                  </button>
                </div>

                {/* Step 5 */}
                <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-orange-700 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                    Register Will (Optional but Recommended)
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li><strong>Where:</strong> Sub-Registrar office in your district</li>
                    <li><strong>Cost:</strong> ₹5,000-10,000 (varies by state)</li>
                    <li><strong>Documents:</strong> 2 copies of Will + ID proof + 2 witnesses</li>
                    <li><strong>Benefit:</strong> Harder to contest, officially recorded, copy available anytime</li>
                    <li><strong>Not mandatory:</strong> Unregistered Will is also valid (but easier to dispute)</li>
                  </ul>
                </div>
              </div>

              {/* Will Template */}
              {showWillTemplate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 bg-gray-50 border-2 border-gray-300 rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Download className="w-6 h-6 text-purple-600" />
                    Sample Will Template (Free to Use)
                  </h3>
                  <div className="bg-white border-2 border-dashed border-gray-400 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap text-gray-800">{`LAST WILL AND TESTAMENT

I, [Your Full Name], aged [Age] years, residing at [Full Address], 
being of sound mind and memory, do hereby revoke all my previous 
Wills and declare this to be my Last Will and Testament.

1. EXECUTOR
I appoint [Executor Name], [Relationship], residing at [Executor Address]
as the Executor of this Will.

2. BENEFICIARIES & ASSETS

A. Immovable Property:
House at [Address] → To my [Beneficiary Name, Relationship]

B. Bank Accounts:
SBI A/c [Account No.] → To my [Beneficiary Name]
HDFC FD [Account No.] → To my [Beneficiary Name]

C. Investments:
Demat Account [DP ID] → To my [Beneficiary Names in equal shares]

D. Jewelry & Gold:
All gold jewelry → To my [Beneficiary Name]

E. Vehicles:
Car [Registration No.] → To my [Beneficiary Name]

3. RESIDUARY CLAUSE
All other assets not specifically mentioned above shall be divided 
equally among [Beneficiary Names].

4. GUARDIAN FOR MINOR CHILDREN (if applicable)
If I die before my children turn 18, I appoint [Guardian Name] as 
their legal guardian.

5. DECLARATION
I declare that this is my Last Will, made without any coercion or 
undue influence.

Signed on this [Date] at [Place]

_____________________          _____________________
Signature of Testator          Name: [Your Name]


WITNESSES (2 persons who are NOT beneficiaries):

Witness 1:                     Witness 2:
Signature: _____________        Signature: _____________
Name: __________________        Name: __________________
Address: _______________        Address: _______________
________________________        ________________________`}</pre>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    <Info className="w-4 h-4 inline mr-1" />
                    Copy this template, fill your details, print, sign with 2 witnesses. Valid Will ready in 30 minutes!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Nomination Guide */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <UserCheck className="w-8 h-8 text-blue-600" />
                Nomination: Complete Checklist
              </h2>

              <p className="text-gray-700 mb-6">
                Add nomination in <strong>ALL</strong> accounts! It makes asset transfer smooth and fast (no court, no legal heir certificate needed).
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 font-bold text-gray-900">Account Type</th>
                      <th className="px-4 py-3 font-bold text-gray-900">How to Add Nomination</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Recommended Nominee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: 'Bank Savings/FD', how: 'Netbanking → Update Nomination or Visit branch', nominee: 'Spouse (100%) or Spouse 50% + Children 50%' },
                      { type: 'PPF Account', how: 'Form E at post office/bank', nominee: 'Spouse or Children' },
                      { type: 'Demat Account', how: 'Broker platform → Profile → Nomination', nominee: 'Spouse (caretaker)' },
                      { type: 'Mutual Funds', how: 'AMC website or via broker', nominee: 'Spouse or Children' },
                      { type: 'EPF/PF', how: 'EPFO portal → Manage → Nomination (Form 2)', nominee: 'Spouse 100%' },
                      { type: 'Life Insurance', how: 'At purchase or via insurer portal', nominee: 'Spouse/Children (multiple allowed)' },
                      { type: 'NPS Account', how: 'CRA portal → Update Nomination', nominee: 'Spouse' }
                    ].map((row, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50">
                        <td className="px-4 py-3 font-semibold">{row.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.how}</td>
                        <td className="px-4 py-3 text-sm text-blue-700">{row.nominee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="font-bold text-green-900 mb-3">✅ Action Checklist:</h3>
                <ul className="space-y-2 text-green-900">
                  <li>□ Add/update nomination in ALL bank accounts (login to netbanking → takes 5 min per account)</li>
                  <li>□ Add nomination in demat account (Zerodha/Groww → Profile → Nomination)</li>
                  <li>□ Add nomination in EPF (EPFO portal → Manage → Form 2)</li>
                  <li>□ Add nomination in PPF account (bank/post office)</li>
                  <li>□ Review annually, update after major life events (marriage, child birth)</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                ❓ Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Q{index + 1}: {faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>No inheritance tax:</strong> Heirs get 100% assets tax-free (India advantage!)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Will is simple:</strong> Write on plain paper, 2 witnesses, ₹0-5K cost</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Add nominations:</strong> In all accounts (bank, demat, EPF, PPF, insurance)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Update regularly:</strong> Review Will every 5 years or after major life events</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Without Will:</strong> Court decides (6-12 months delay) + family disputes + legal costs</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Links */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Lessons</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/learn/insurance-retirement/term-insurance-complete-guide-1-crore-cover-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Shield className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Term Insurance</h3>
                  <p className="text-sm text-gray-600">₹1 Cr cover protection</p>
                </Link>
                <Link to="/learn/insurance-retirement/retirement-planning-india-corpus-calculation-60-years-goal" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Clock className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Retirement Planning</h3>
                  <p className="text-sm text-gray-600">₹3 Crore by 60</p>
                </Link>
                <Link to="/learn/insurance-retirement/nps-national-pension-system-tier-1-tier-2-tax-benefits-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Building className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">NPS Guide</h3>
                  <p className="text-sm text-gray-600">₹50K extra deduction</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Category Complete */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white shadow-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Award className="w-16 h-16" />
              <h3 className="text-4xl font-bold">🎉 Category Complete!</h3>
            </div>
            <p className="text-2xl mb-4">Congratulations! You've completed all 7 lessons on</p>
            <p className="text-3xl font-bold mb-8">Insurance, Retirement & Estate Planning!</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">7</div>
                <div className="text-sm opacity-90">Lessons Completed</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">6 Hours</div>
                <div className="text-sm opacity-90">Learning Time</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-90">Category Mastered</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/learn/insurance-retirement"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
                Review Category
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Explore More Categories
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WillEstatePlanning;
