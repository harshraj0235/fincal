import React, { useMemo, useState } from 'react';
import { FileText, CheckCircle, Briefcase, Users, Home, ClipboardCheck, Download, ShieldCheck } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

type BorrowerProfile = 'salaried' | 'self-employed' | 'nri';

const profileDocs: Record<BorrowerProfile, Array<{ id: string; label: string; category: string }>> = {
  salaried: [
    { id: 'pan', label: 'PAN Card', category: 'KYC' },
    { id: 'aadhaar', label: 'Aadhaar Card', category: 'KYC' },
    { id: 'address', label: 'Address Proof (Passport/DL/Voter ID/Utility Bill)', category: 'KYC' },
    { id: 'photos', label: 'Passport-size Photos', category: 'KYC' },
    { id: 'salary_slips', label: 'Last 3 Salary Slips', category: 'Income' },
    { id: 'bank_6m', label: 'Last 6 Months Salary Account Statement', category: 'Income' },
    { id: 'form16', label: 'Form 16 (Last 2 Years)', category: 'Income' },
    { id: 'employment', label: 'Employment Verification Letter/ID', category: 'Income' },
    { id: 'sale_agreement', label: 'Sale Agreement / Allotment Letter', category: 'Property' },
    { id: 'title_docs', label: 'Title Chain Documents', category: 'Property' },
    { id: 'approved_plan', label: 'Approved Building Plan', category: 'Property' },
    { id: 'ec', label: 'Encumbrance Certificate', category: 'Property' },
    { id: 'tax_receipts', label: 'Latest Property Tax Receipts', category: 'Property' },
  ],
  'self-employed': [
    { id: 'pan', label: 'PAN Card', category: 'KYC' },
    { id: 'aadhaar', label: 'Aadhaar Card', category: 'KYC' },
    { id: 'address', label: 'Address Proof (Passport/DL/Voter ID/Utility Bill)', category: 'KYC' },
    { id: 'photos', label: 'Passport-size Photos', category: 'KYC' },
    { id: 'itr_2y', label: 'ITR Acknowledgements (Last 2 Years)', category: 'Income' },
    { id: 'business_bank_12m', label: 'Business Account Statements (Last 12 Months)', category: 'Income' },
    { id: 'pl_bs', label: 'Profit & Loss + Balance Sheet', category: 'Income' },
    { id: 'gst', label: 'GST Returns / Registration Proof', category: 'Income' },
    { id: 'business_proof', label: 'Business Continuity Proof (License/Registration)', category: 'Income' },
    { id: 'sale_agreement', label: 'Sale Agreement / Allotment Letter', category: 'Property' },
    { id: 'title_docs', label: 'Title Chain Documents', category: 'Property' },
    { id: 'approved_plan', label: 'Approved Building Plan', category: 'Property' },
    { id: 'ec', label: 'Encumbrance Certificate', category: 'Property' },
    { id: 'tax_receipts', label: 'Latest Property Tax Receipts', category: 'Property' },
  ],
  nri: [
    { id: 'pan', label: 'PAN Card', category: 'KYC' },
    { id: 'passport', label: 'Passport + Visa / Work Permit', category: 'KYC' },
    { id: 'overseas_address', label: 'Overseas Address Proof', category: 'KYC' },
    { id: 'india_address', label: 'India Correspondence Address Proof', category: 'KYC' },
    { id: 'photos', label: 'Passport-size Photos', category: 'KYC' },
    { id: 'employment_contract', label: 'Employment Contract / Appointment Letter', category: 'Income' },
    { id: 'salary_credit', label: 'Salary Credit Statements (NRE/NRO or Overseas)', category: 'Income' },
    { id: 'overseas_tax', label: 'Overseas Tax Return / Income Proof', category: 'Income' },
    { id: 'poa', label: 'Power of Attorney (if representative handling)', category: 'Income' },
    { id: 'sale_agreement', label: 'Sale Agreement / Allotment Letter', category: 'Property' },
    { id: 'title_docs', label: 'Title Chain Documents', category: 'Property' },
    { id: 'approved_plan', label: 'Approved Building Plan', category: 'Property' },
    { id: 'ec', label: 'Encumbrance Certificate', category: 'Property' },
    { id: 'tax_receipts', label: 'Latest Property Tax Receipts', category: 'Property' },
  ],
};

const DocumentsRequired: React.FC = () => {
  const [profile, setProfile] = useState<BorrowerProfile>('salaried');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const currentDocs = profileDocs[profile];
  const completion = useMemo(() => {
    const total = currentDocs.length;
    const done = currentDocs.filter((d) => checkedDocs[d.id]).length;
    const pct = total === 0 ? 0 : (done / total) * 100;
    return { total, done, pct };
  }, [currentDocs, checkedDocs]);

  const grouped = useMemo(() => {
    return currentDocs.reduce<Record<string, Array<{ id: string; label: string }>>>((acc, d) => {
      if (!acc[d.category]) acc[d.category] = [];
      acc[d.category].push({ id: d.id, label: d.label });
      return acc;
    }, {});
  }, [currentDocs]);

  const toggleDoc = (id: string) => setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));

  const copyChecklist = async () => {
    const lines = currentDocs.map((d) => `${checkedDocs[d.id] ? '✓' : '•'} ${d.label}`);
    const payload = `Home Loan Documents Checklist (${profile})\n\n${lines.join('\n')}`;
    try {
      await navigator.clipboard.writeText(payload);
      alert('Checklist copied.');
    } catch {
      alert('Copy failed on this browser.');
    }
  };

  return (
    <>
      <SEOHelmet
        title="Home Loan Documents Required in India (2026): Salaried, Self-Employed, NRI Checklist"
        description="Advanced home loan documents required guide for India. Interactive checklist for salaried, self-employed, and NRI borrowers with approval-ready document strategy."
        keywords="home loan documents required, home loan document checklist india, documents required for home loan salaried self employed nri, home loan paperwork 2026"
        url="/learn/home-loans/documents-required"
        type="article"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Home Loans', url: '/learn/home-loans' },
          { name: 'Documents Required', url: '/learn/home-loans/documents-required' },
        ]}
        faqData={[
          {
            question: 'What documents are mandatory for home loan in India?',
            answer:
              'Core mandatory set includes PAN, identity/address proof, income proof, and complete property title chain papers. Lender-specific additions may apply.',
          },
          {
            question: 'How many months bank statement is needed for home loan?',
            answer:
              'Most lenders ask for 6 months for salaried profiles and 12 months for business/current account where self-employed income is assessed.',
          },
          {
            question: 'Can I get home loan pre-approval before final property papers?',
            answer:
              'Yes. Most lenders provide in-principle eligibility based on profile and income documents. Final sanction/disbursement needs verified property legal papers.',
          },
          {
            question: 'Do NRIs need extra documents for home loan?',
            answer:
              'Yes. NRIs usually need passport-visa proof, overseas income evidence, and in many cases a power of attorney structure for execution in India.',
          },
        ]}
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="documents-required"
        breadcrumb={['Learn', 'Home Loans', 'Documents Required']}
      >
        <section className="bg-white border-2 border-slate-200 rounded-2xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Home Loan Documents Required (India) - Approval-Ready Checklist</h1>
          <p className="text-slate-700">
            This page is built for practical execution, not generic theory. Choose profile, tick what you already have,
            and track readiness before you apply. Strong documentation often improves sanction speed, reduces back-and-forth
            with credit teams, and lowers legal verification delays.
          </p>
        </section>

        <section className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-6 mb-10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-indigo-600" />
                Interactive Document Readiness Tool
              </h2>
              <p className="text-sm text-slate-600 mt-1">Switch borrower profile and track checklist completion instantly.</p>
            </div>
            <button
              onClick={copyChecklist}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <Download className="h-4 w-4" />
              Copy Checklist
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-5">
            {(['salaried', 'self-employed', 'nri'] as BorrowerProfile[]).map((p) => (
              <button
                key={p}
                onClick={() => setProfile(p)}
                className={`px-4 py-3 rounded-lg border text-sm font-semibold ${
                  profile === p
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400'
                }`}
              >
                {p === 'salaried' ? 'Salaried' : p === 'self-employed' ? 'Self-Employed' : 'NRI'}
              </button>
            ))}
          </div>

          <div className="mt-5 bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-700">
              Progress: <strong>{completion.done}/{completion.total}</strong> documents complete ({completion.pct.toFixed(0)}%)
            </p>
            <div className="mt-2 h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${completion.pct}%` }} />
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group} className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 mb-3">{group}</h3>
                <div className="space-y-2">
                  {items.map((doc) => (
                    <label key={doc.id} className="flex items-start gap-2 text-sm text-slate-700">
                      <input type="checkbox" checked={!!checkedDocs[doc.id]} onChange={() => toggleDoc(doc.id)} className="mt-1" />
                      <span>{doc.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Introduction */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Missing even ONE document can delay your approval by 2-4 weeks! 80% of loan delays happen due to incomplete documentation. Get it right the first time! ✅
              </p>
            </div>
          </div>
        </div>

        {/* Quick Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3 Main Document Categories</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">1. Identity & Address</h3>
              <p className="text-gray-700 text-sm">PAN, Aadhaar, Passport, Driving License</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
              <Briefcase className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">2. Income Proof</h3>
              <p className="text-gray-700 text-sm">Salary slips, ITR, bank statements, Form 16</p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
              <Home className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">3. Property Documents</h3>
              <p className="text-gray-700 text-sm">Sale deed, NOC, approved plan, encumbrance certificate</p>
            </div>
          </div>
        </section>

        {/* Salaried Employees */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents for Salaried Employees</h2>
          
          <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
            {/* Category 1: KYC */}
            <div className="mb-6 pb-6 border-b-2 border-gray-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4">A. Identity & Address Proof (KYC)</h3>
              <div className="space-y-3">
                <div className="flex items-start bg-green-50 rounded-lg p-4 border border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">1. PAN Card (Mandatory)</p>
                    <p className="text-sm text-gray-600">Original + self-attested copy</p>
                  </div>
                </div>

                <div className="flex items-start bg-green-50 rounded-lg p-4 border border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">2. Aadhaar Card (Mandatory)</p>
                    <p className="text-sm text-gray-600">Original + copy. Will be linked to loan account</p>
                  </div>
                </div>

                <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-blue-300">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">3. Address Proof (Any ONE)</p>
                    <ul className="text-sm text-gray-700 ml-4 mt-1">
                      <li>• Passport</li>
                      <li>• Driving License</li>
                      <li>• Voter ID</li>
                      <li>• Electricity/Gas bill (latest)</li>
                      <li>• Bank statement with address</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-blue-300">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">4. Passport Size Photos</p>
                    <p className="text-sm text-gray-600">4-6 recent photographs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2: Income Proof */}
            <div className="mb-6 pb-6 border-b-2 border-gray-200">
              <h3 className="text-xl font-bold text-green-900 mb-4">B. Income Proof</h3>
              <div className="space-y-3">
                <div className="flex items-start bg-green-50 rounded-lg p-4 border border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">5. Salary Slips (Last 3 months)</p>
                    <p className="text-sm text-gray-600">Original signed and stamped by employer</p>
                  </div>
                </div>

                <div className="flex items-start bg-green-50 rounded-lg p-4 border border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">6. Bank Statements (Last 6 months)</p>
                    <p className="text-sm text-gray-600">Salary account statements showing salary credits</p>
                  </div>
                </div>

                <div className="flex items-start bg-green-50 rounded-lg p-4 border border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">7. Form 16 (Last 2 years)</p>
                    <p className="text-sm text-gray-600">TDS certificate from employer</p>
                  </div>
                </div>

                <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-blue-300">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">8. Employment Letter</p>
                    <p className="text-sm text-gray-600">Letter from employer confirming employment & salary</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3: Property Docs */}
            <div>
              <h3 className="text-xl font-bold text-purple-900 mb-4">C. Property Documents</h3>
              <div className="space-y-3">
                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">9. Sale Agreement/Allotment Letter</p>
                    <p className="text-sm text-gray-600">Agreement between you and seller/builder</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">10. Property Title Deed</p>
                    <p className="text-sm text-gray-600">Proof of seller's ownership</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">11. Approved Building Plan</p>
                    <p className="text-sm text-gray-600">From local municipal authority</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">12. NOC from Builder/Society</p>
                    <p className="text-sm text-gray-600">No Objection Certificate for loan</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">13. Encumbrance Certificate (EC)</p>
                    <p className="text-sm text-gray-600">Proof that property has no legal dues (last 13 years)</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">14. Property Tax Receipts</p>
                    <p className="text-sm text-gray-600">Latest paid receipts from municipal corporation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Self-Employed */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Documents for Self-Employed</h2>
          
          <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
            <p className="text-gray-700 mb-4">
              Self-employed need ALL salaried documents (except salary slips/Form 16) PLUS these:
            </p>

            <div className="space-y-3">
              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">15. Income Tax Returns (ITR) - Last 2 Years</p>
                  <p className="text-sm text-gray-600">Acknowledged by Income Tax Department with computation</p>
                </div>
              </div>

              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">16. Business Proof</p>
                  <ul className="text-sm text-gray-700 ml-4 mt-1">
                    <li>• GST Registration Certificate</li>
                    <li>• Shop/Establishment License</li>
                    <li>• Partnership Deed (if partnership)</li>
                    <li>• MOA/AOA (if company)</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">17. Business Bank Statements (Last 12 months)</p>
                  <p className="text-sm text-gray-600">Current account statements showing business transactions</p>
                </div>
              </div>

              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">18. Balance Sheet & P&L (Last 2 years)</p>
                  <p className="text-sm text-gray-600">Audited by CA (if turnover &gt; ₹1 crore)</p>
                </div>
              </div>

              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">19. GST Returns (Last 6 months)</p>
                  <p className="text-sm text-gray-600">GSTR-1, GSTR-3B filed returns</p>
                </div>
              </div>

              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">20. Business Continuity Proof</p>
                  <p className="text-sm text-gray-600">Business must be operational for 3+ years (minimum 2 for some banks)</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400">
              <p className="font-bold text-yellow-900">⚠️ Important:</p>
              <p className="text-gray-800 text-sm mt-1">
                Self-employed applications take 5-10 days longer for verification. Start early!
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips for Document Submission</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">1. Make Multiple Sets</h3>
              <p className="text-gray-700">Create 3 sets: 1 for bank, 1 for legal verification, 1 for your records. Saves time if original is lost!</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">2. Self-Attest All Copies</h3>
              <p className="text-gray-700">Sign across each photocopied document. No need for notarization for most docs.</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">3. Organize by Category</h3>
              <p className="text-gray-700">Use separate folders: KYC, Income Proof, Property Docs. Makes verification faster.</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">4. Keep Digital Backup</h3>
              <p className="text-gray-700">Scan all documents and keep in Google Drive. Many banks accept digital submissions for initial review.</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">5. Check Validity Dates</h3>
              <p className="text-gray-700">Bank statements: Within 30 days. Salary slips: Last 3 months. Expired documents = rejection!</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: I don't have 6 months bank statements. Will 3 months work?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Depends on bank.</strong> Some banks accept 3 months IF:<br/>
                • Your CIBIL is 750+<br/>
                • Salary is credited regularly<br/>
                • You provide last 2 years Form 16<br/>
                <br/>
                But 6 months is standard. If you have only 3, apply to multiple banks - some will approve!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: I get salary in cash. How to prove income?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Difficult but not impossible.</strong> Options:<br/>
                1. Deposit cash monthly in bank for 6 months before applying<br/>
                2. Get salary certificate from employer (notarized)<br/>
                3. Show ITR if you file taxes<br/>
                4. Some HFCs/NBFCs consider cash salary if employer provides sworn affidavit<br/>
                <br/>
                <strong>Best approach:</strong> Start depositing fixed amount monthly NOW. After 6 months, you'll have bank statement proof!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Do I need all property documents before applying?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: NO! Apply with basic docs first.</strong><br/>
                <br/>
                <strong>For Initial Application:</strong><br/>
                • Your KYC + Income proof<br/>
                • Property details (address, price, seller name)<br/>
                • Sale agreement (if signed)<br/>
                <br/>
                <strong>Bank will ask for full property docs only AFTER:</strong><br/>
                • Your eligibility is confirmed<br/>
                • In-principle approval given<br/>
                <br/>
                This saves time! Don't delay application waiting for seller's documents.
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: My salary account is with Bank A, applying to Bank B. Problem?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: NO problem at all!</strong> You can apply to ANY bank regardless of salary account.<br/>
                <br/>
                <strong>But consider this:</strong><br/>
                • Salary account bank often gives 0.10-0.25% discount<br/>
                • Faster processing (they already have your history)<br/>
                • May waive processing fees<br/>
                <br/>
                <strong>Smart move:</strong> Apply to BOTH Bank A and 2-3 others. Compare final offers!
              </p>
            </details>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">3 categories: KYC (PAN, Aadhaar), Income (salary slips, bank statements), Property (sale deed, NOC)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Salaried: 14 documents. Self-employed: 20 documents (ITR, GST returns mandatory)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Bank statements must be within 30 days, salary slips last 3 months</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Make 3 sets, self-attest, organize by category, keep digital backup</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Can apply with basic docs first. Full property docs needed only after pre-approval</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Application Process Next! 🚀</h2>
          <p className="text-blue-100 mb-6">
            Documents ready? Now learn the complete step-by-step application process from start to disbursement!
          </p>
          <a
            href="/learn/home-loans/application-process"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Application Process →
          </a>
        </div>

        <section className="mt-10 bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Complete 2026 Home Loan Documents Strategy (Long-Form Guide)</h2>
          <div className="space-y-4 text-slate-700 leading-7">
            <p>
              If you are searching for "home loan documents required", your objective is usually simple: avoid rejection,
              avoid delay, and get the best possible sanction terms. In reality, lenders do not reject many applications
              only because of income mismatch; a large percentage of friction comes from incomplete, stale, or inconsistent
              paperwork. This is why a documentation-first strategy helps you more than rate hunting in the first stage.
            </p>
            <p>
              Home loan underwriting in India typically has three validation layers: profile validation, income validation,
              and property legal validation. Profile validation checks KYC integrity and identity consistency across PAN,
              Aadhaar, and address documents. Income validation measures repayment ability with salary slips or business
              cashflow records. Property legal validation checks title continuity, approvals, and encumbrance status. Your
              application moves only as fast as the slowest layer.
            </p>
            <p>
              Salaried applicants should focus on income continuity and salary credit visibility. Your salary slips and bank
              statements must align month-to-month. If salary credits vary due to incentives, keep salary structure and HR
              confirmation ready. Form 16 and annual tax filing create confidence in declared income quality. Avoid abrupt
              unexplained cash deposits before applying, because credit teams often request additional clarification.
            </p>
            <p>
              Self-employed applicants are assessed on business stability, tax discipline, and documented profitability.
              Lenders expect ITR continuity, banking discipline, and business proof. If there are sharp turnover jumps or
              temporary loss periods, attach context note and supporting evidence early. Doing this proactively reduces
              repetitive query cycles after initial assessment.
            </p>
            <p>
              NRIs often face delay because overseas documentation and India-side execution are split. Keep passport, visa,
              work permit, overseas address proof, and income trail ready in one set. If a representative will act in
              India, structure PoA documentation before the file reaches sanction stage. Last-minute PoA corrections can
              delay disbursement even after sanction letter is issued.
            </p>
            <p>
              Property documents deserve the most attention. A strong borrower profile cannot compensate for weak title
              papers. Ensure title chain continuity, approval plan, occupancy/completion status (as applicable), EC, and
              tax receipt updates. Where redevelopment or inherited property is involved, additional legal lineage proof may
              be needed. Start legal due diligence parallel to eligibility check so both tracks progress together.
            </p>
            <p>
              The reason we built an interactive checklist on top of this lesson is practical: static lists are easy to
              read but hard to execute. Borrowers need completion tracking. When you track checklist progress by profile,
              you identify bottlenecks early, assign responsibilities (you, seller, builder, employer, CA), and reduce idle
              waiting between lender callbacks.
            </p>
            <p>
              For ranking well on search intent, pages must satisfy multiple user intents in one visit: "what documents",
              "why these documents", "what is optional vs mandatory", "what causes rejection", and "how to submit". This
              page covers each layer with practical examples so users do not need to return to search for fragmented
              answers. Better intent coverage often improves engagement and SEO durability.
            </p>
            <p>
              Document hygiene rules that matter: keep legible scans, avoid cropped edges, ensure signatures match records,
              keep latest statements (usually within 30 days), and use self-attested copies where lender asks. Create one
              master folder with naming convention such as KYC_01_PAN, Income_02_BankStatement, Property_03_EC. Organized
              naming reduces confusion when banks ask for re-upload or differential documents.
            </p>
            <p>
              If your case has co-applicants, repeat the same rigor for each person. Co-applicant document mismatch is a
              common hidden delay point. Also verify address consistency. Even minor address variations across records can
              trigger additional KYC checks. Where address mismatch is unavoidable, keep supporting declaration and valid
              supplemental proof.
            </p>
            <p>
              Many users ask whether pre-approval is possible before final property papers. In most institutions, yes.
              Pre-approval tests your credit and affordability. Final sanction and disbursement remain property-dependent.
              Use this to your advantage: clear profile and income stack first, then shortlist properties where title pack
              can be verified quickly.
            </p>
            <p>
              Another strategic tip: do not apply to too many lenders blindly. Each inquiry pattern and document variation
              adds complexity. Instead, prepare one high-quality master file and share with a focused lender set where your
              profile best fits. Quality of first submission often influences processing speed more than quantity of
              applications.
            </p>
            <p>
              If your objective is best rate, document quality still matters. Lenders reward low-risk files with cleaner
              rate/fee outcomes and faster turnaround. A fully ready file allows you to negotiate from strength because
              lender knows execution risk is low. In contrast, incomplete files reduce pricing flexibility and may attract
              conditional approvals.
            </p>
            <p>
              For self-employed borrowers, keep business narrative crisp: what business does, tenure, turnover trend,
              profitability trend, and key risk controls. A one-page summary with documents attached can significantly
              improve credit understanding and reduce back-and-forth clarifications.
            </p>
            <p>
              For NRIs, exchange-rate and remittance behavior can affect lender comfort. Keep consistent inflow records and
              clearly map repayment source account. If rental income or secondary income is included, maintain traceable
              supporting evidence to avoid conservative haircut assumptions.
            </p>
            <p>
              Builders and resale sellers should also be managed as stakeholders in your checklist. Ask for required title
              and approval papers in writing with target timeline. Many delays happen because borrower assumes documents are
              "readily available" but discovers missing records after sanction. Early document collection from seller side
              protects your processing timeline.
            </p>
            <p>
              To summarize, the fastest loan files are not always highest-income files; they are clean files with consistent
              profile, strong income evidence, and legally verifiable property paper trail. Use the readiness tool, close
              gaps, then apply with confidence.
            </p>
          </div>
        </section>

        <section className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <h3 className="font-bold text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Quick Action Plan Before You Apply
          </h3>
          <ol className="mt-3 text-sm text-emerald-900 space-y-1 list-decimal list-inside">
            <li>Select profile in checklist and reach at least 90% completion.</li>
            <li>Validate income continuity with statement + tax documents.</li>
            <li>Collect property legal pack in parallel, not after pre-approval.</li>
            <li>Keep digital + physical set, each document clearly labeled.</li>
            <li>Apply to focused lenders with one strong master file.</li>
          </ol>
        </section>
      </LearnLayout>
    </>
  );
};

export default DocumentsRequired;



