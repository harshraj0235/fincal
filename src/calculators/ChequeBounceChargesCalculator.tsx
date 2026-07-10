import React, { useState, useMemo, ChangeEvent } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Search, Banknote, AlertCircle, IndianRupee } from 'lucide-react';

const chequeChargesData: { [bank: string]: { charge: string; notes?: string } } = {
  'State Bank of India': { charge: '₹150 + GST', notes: 'For savings account; ₹750 for business accounts' },
  'HDFC Bank': { charge: '₹500 + taxes', notes: 'Per instrument' },
  'ICICI Bank': { charge: '₹350 + taxes', notes: 'Per instrument' },
  'Axis Bank': { charge: '₹350 + taxes', notes: 'Per instrument' },
  'Kotak Mahindra Bank': { charge: '₹350 + taxes', notes: 'Per instrument' },
  'Punjab National Bank': { charge: '₹150 + GST', notes: 'Per instrument' },
  'Bank of Baroda': { charge: '₹150 + GST', notes: 'Per instrument' },
  'Canara Bank': { charge: '₹150 + GST', notes: 'Per instrument' },
  'Union Bank of India': { charge: '₹150 + GST', notes: 'Per instrument' },
  'IDFC First Bank': { charge: '₹250 + taxes', notes: 'Per instrument' },
  'IndusInd Bank': { charge: '₹350 + taxes', notes: 'Per instrument' },
  'Yes Bank': { charge: '₹350 + taxes', notes: 'Per instrument' },
  'Federal Bank': { charge: '₹300 + taxes', notes: 'Per instrument' },
  'Bank of India': { charge: '₹150 + GST', notes: 'Per instrument' },
  'Central Bank of India': { charge: '₹150 + GST', notes: 'Per instrument' },
  'Indian Overseas Bank': { charge: '₹150 + GST', notes: 'Per instrument' },
  'UCO Bank': { charge: '₹150 + GST', notes: 'Per instrument' },
  'Bank of Maharashtra': { charge: '₹150 + GST', notes: 'Per instrument' },
  'Punjab & Sind Bank': { charge: '₹150 + GST', notes: 'Per instrument' },
  'Indian Bank': { charge: '₹150 + GST', notes: 'Per instrument' },
  // Add more banks as needed
};

const banks = Object.keys(chequeChargesData);

const faqList = [
  {
    q: 'What is a cheque bounce charge?',
    a: 'A cheque bounce charge is a penalty levied by banks when a cheque issued by you is returned unpaid due to insufficient funds or other reasons.'
  },
  {
    q: 'How much is the cheque bounce charge in SBI?',
    a: 'SBI charges ₹150 + GST for cheque bounce in savings accounts. For business accounts, it is ₹750.'
  },
  {
    q: 'Are cheque bounce charges the same for all banks?',
    a: 'No, cheque bounce charges vary from bank to bank and may also depend on the type of account.'
  },
  {
    q: 'Is GST applicable on cheque bounce charges?',
    a: 'Yes, GST is applicable on cheque bounce charges as per government rules.'
  },
  {
    q: 'How can I avoid cheque bounce charges?',
    a: 'Maintain sufficient balance in your account and ensure all cheque details are correct before issuing.'
  },
];

const ChequeBounceChargesCalculator: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const filteredBanks = useMemo(() => {
    if (!search) return banks;
    return banks.filter(bank => bank.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const result = selectedBank ? chequeChargesData[selectedBank] : null;

  return (
    <>
      <SEOHelmet
        title="Cheque Bounce Charges Calculator | Bank-wise Cheque Penalty in India 2024"
        description="Find cheque bounce charges for SBI, HDFC, ICICI, Axis, and all major Indian banks. Use our bank cheque penalty Calculator to compare and avoid cheque return penalties. Updated for 2024."
        keywords="cheque bounce charges SBI, bank cheque penalty Calculator, cheque bounce charges India, cheque return charges, bank-wise cheque bounce charges, cheque penalty charges, cheque dishonour charges, cheque bounce fine, cheque bounce penalty calculator"
        url="/calculators/cheque-bounce-charges-calculator"
        tags={["cheque bounce charges", "bank cheque penalty", "cheque bounce charges SBI", "cheque penalty calculator"]}
        schemaType="FAQPage"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': faqList.map(faq => ({
            '@type': 'Question',
            'name': faq.q,
            'acceptedAnswer': { '@type': 'Answer', 'text': faq.a }
          }))
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-700 mb-2">
            Cheque Bounce Charges Calculator
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Instantly find and compare cheque bounce charges for all major Indian banks. Updated for 2024.
          </p>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Banknote className="inline w-4 h-4 mr-1 text-orange-600" />
              Search Bank
            </label>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Type bank name..."
                value={search}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
              />
            </div>
            <select
              value={selectedBank}
              onChange={e => setSelectedBank(e.target.value)}
              className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
            >
              <option value="">Select a bank</option>
              {filteredBanks.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>
          {result && (
            <div className="bg-gradient-to-br from-orange-50 to-yellow-100 border border-orange-200 rounded-xl p-5 mb-6 text-center">
              <h2 className="text-xl font-semibold text-orange-800 mb-2">{selectedBank} Cheque Bounce Charges</h2>
              <div className="text-2xl font-bold text-orange-700 mb-1">{result.charge}</div>
              {result.notes && <div className="text-sm text-gray-600 mb-2">{result.notes}</div>}
              <div className="text-xs text-gray-500">(GST extra as applicable)</div>
            </div>
          )}
          <div className="text-xs text-gray-500 text-center mb-2">
            Data updated: 2024 | Source: Official Bank Websites
          </div>
        </div>
        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto mt-10">
          <h2 className="text-xl font-bold text-orange-700 mb-4 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqList.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                </div>
                <div className="text-gray-700 text-sm">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Related Tools */}
        <div className="max-w-2xl mx-auto mt-10">
          <h2 className="text-lg font-bold text-orange-700 mb-4 text-center">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/calculators/bank-charges-analyzer" className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center">
              <IndianRupee className="w-5 h-5 mx-auto mb-1 text-orange-600" />
              <div className="font-semibold text-orange-800">Bank Charges Analyzer</div>
              <div className="text-xs text-gray-600">Compare all hidden bank charges</div>
            </a>
            <a href="/calculators/emi-calculator" className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center">
              <IndianRupee className="w-5 h-5 mx-auto mb-1 text-orange-600" />
              <div className="font-semibold text-orange-800">EMI Calculator</div>
              <div className="text-xs text-gray-600">Calculate your loan EMIs</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChequeBounceChargesCalculator; 