import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Search, PhoneCall, Home, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Hardcoded data for all major Indian banks
const bankData = [
  { name: 'State Bank of India', balance: '9223766666', mini: '9223866666', site: 'https://sbi.co.in' },
  { name: 'HDFC Bank', balance: '18002703333', mini: '18002703355', site: 'https://www.hdfcbank.com' },
  { name: 'ICICI Bank', balance: '9594612612', mini: '9594613613', site: 'https://www.icicibank.com' },
  { name: 'Axis Bank', balance: '18004195959', mini: '18004196969', site: 'https://www.axisbank.com' },
  { name: 'Punjab National Bank', balance: '18001802222', mini: '18001802223', site: 'https://www.pnbindia.in' },
  { name: 'Bank of Baroda', balance: '8468001111', mini: '8468001122', site: 'https://www.bankofbaroda.in' },
  { name: 'Canara Bank', balance: '9015483483', mini: '9015613613', site: 'https://www.canarabank.com' },
  { name: 'Union Bank of India', balance: '9223008586', mini: '9223008586', site: 'https://www.unionbankofindia.co.in' },
  { name: 'Kotak Mahindra Bank', balance: '18002740110', mini: '18002740110', site: 'https://www.kotak.com' },
  { name: 'IDFC First Bank', balance: '18002700720', mini: '18002700720', site: 'https://www.idfcfirstbank.com' },
  { name: 'IndusInd Bank', balance: '18002741000', mini: '18002741000', site: 'https://www.indusind.com' },
  { name: 'Bank of India', balance: '9266135135', mini: '9266135135', site: 'https://www.bankofindia.co.in' },
  { name: 'Central Bank of India', balance: '9555244442', mini: '9555144441', site: 'https://www.centralbankofindia.co.in' },
  { name: 'Indian Bank', balance: '9289592895', mini: '9289592895', site: 'https://www.indianbank.in' },
  { name: 'UCO Bank', balance: '9231008888', mini: '56161', site: 'https://www.ucobank.com' },
  { name: 'Bank of Maharashtra', balance: '9222281818', mini: '9222281818', site: 'https://www.bankofmaharashtra.in' },
  { name: 'Yes Bank', balance: '9223920000', mini: '9223920000', site: 'https://www.yesbank.in' },
  { name: 'Federal Bank', balance: '8431900900', mini: '8431600600', site: 'https://www.federalbank.co.in' },
  { name: 'South Indian Bank', balance: '9223008484', mini: '9223008484', site: 'https://www.southindianbank.com' },
  { name: 'IDBI Bank', balance: '18008431122', mini: '18008431133', site: 'https://www.idbibank.in' },
  // ...add more banks as needed
];

export default function MissedCallBankingDirectory() {
  const [search, setSearch] = useState('');
  const filteredBanks = bankData.filter(bank =>
    bank.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEOHelmet
        title="Missed Call Banking Directory | All Bank Balance & Mini Statement Numbers India"
        description="Unified tool for missed call balance enquiry and mini statement numbers for all Indian banks. Find SBI, HDFC, ICICI, Axis, PNB, and more. Easy, fast, and SEO-optimized."
        keywords="missed call balance enquiry all banks, bank mini statement number, missed call banking, sbi balance missed call, hdfc balance missed call, icici balance missed call, axis bank balance missed call, all bank balance check number, bank missed call number, bank balance enquiry number, mini statement missed call, india"
        url="/missed-call-banking-directory"
        tags={["missed call banking", "bank balance enquiry", "mini statement", "all banks india", "banking directory"]}
        schemaType="FAQPage"
      />
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-7 h-7 text-white mr-2" />
          <span className="text-xl font-bold text-white">Missed Call Banking Directory</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-1 hover:bg-blue-50 transition"><Home className="w-5 h-5" /> Home</Link>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Missed Call Balance & Mini Statement Numbers (All Banks)</h1>
        <p className="text-center text-lg text-gray-700 mb-6">Search and find missed call numbers for balance enquiry and mini statement for all Indian banks. Fast, free, and always updated.</p>
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bank name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="w-full text-left bg-white rounded-xl">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                <th className="py-3 px-4 font-bold text-blue-700">Bank Name</th>
                <th className="py-3 px-4 font-bold text-green-700">Balance Enquiry</th>
                <th className="py-3 px-4 font-bold text-purple-700">Mini Statement</th>
                <th className="py-3 px-4 font-bold text-gray-700">Official Site</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanks.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-500">No banks found.</td></tr>
              ) : (
                filteredBanks.map(bank => (
                  <tr key={bank.name} className="border-b hover:bg-blue-50 transition">
                    <td className="py-3 px-4 font-semibold text-gray-900">{bank.name}</td>
                    <td className="py-3 px-4">
                      <a href={`tel:${bank.balance}`} className="text-blue-700 font-medium flex items-center gap-1 hover:underline"><PhoneCall className="w-4 h-4" />{bank.balance}</a>
                    </td>
                    <td className="py-3 px-4">
                      <a href={`tel:${bank.mini}`} className="text-purple-700 font-medium flex items-center gap-1 hover:underline"><PhoneCall className="w-4 h-4" />{bank.mini}</a>
                    </td>
                    <td className="py-3 px-4">
                      <a href={bank.site} target="_blank" rel="noopener noreferrer" className="text-blue-600 flex items-center gap-1 hover:underline"><ExternalLink className="w-4 h-4" />Official</a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Related Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/calculators/bank-charges-analyzer" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium flex items-center gap-1 hover:bg-blue-200 transition"><LinkIcon className="w-4 h-4" />Bank Charges Analyzer</Link>
            <Link to="/calculators/emi-calculator" className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium flex items-center gap-1 hover:bg-green-200 transition"><LinkIcon className="w-4 h-4" />EMI Calculator</Link>
            <Link to="/calculators/ifsc-finder" className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium flex items-center gap-1 hover:bg-purple-200 transition"><LinkIcon className="w-4 h-4" />IFSC Finder</Link>
          </div>
        </div>
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How does missed call banking work?</h3>
              <p className="text-gray-700">You give a missed call to your bank's designated number from your registered mobile. The bank sends your balance or mini statement via SMS instantly.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is this service free?</h3>
              <p className="text-gray-700">Yes, most banks offer missed call banking free of charge. Standard call/SMS charges may apply as per your mobile plan.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I use missed call banking from any mobile?</h3>
              <p className="text-gray-700">No, you must use your mobile number registered with the bank to use this service.</p>
            </div>
            <div>
              <h3 className="font-semibold">What if my bank is not listed?</h3>
              <p className="text-gray-700">We strive to keep this directory updated. If your bank is missing, please check your bank's official website or contact customer care.</p>
            </div>
          </div>
        </section>
      </main>
      {/* Schema.org FAQPage JSON-LD for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How does missed call banking work?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'You give a missed call to your bank\'s designated number from your registered mobile. The bank sends your balance or mini statement via SMS instantly.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Is this service free?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, most banks offer missed call banking free of charge. Standard call/SMS charges may apply as per your mobile plan.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Can I use missed call banking from any mobile?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No, you must use your mobile number registered with the bank to use this service.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What if my bank is not listed?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We strive to keep this directory updated. If your bank is missing, please check your bank\'s official website or contact customer care.'
            }
          }
        ]
      }) }} />
    </>
  );
} 