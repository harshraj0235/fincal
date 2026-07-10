import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   BANK HOLIDAY CALENDAR — PURE STATIC HTML EDITION
   Target keywords: bank holidays 2026, bank holiday calendar india,
   rbi bank holidays, national holidays, state bank holidays
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "Are bank holidays the same across all states in India?", answer: "No, bank holidays vary across states in India. While national holidays like Republic Day, Independence Day, and Gandhi Jayanti are observed nationwide, many holidays are state-specific based on local festivals and events (e.g., Ganesh Chaturthi in Maharashtra or Durga Puja in West Bengal)." },
  { question: "Are weekends considered bank holidays in India?", answer: "All Sundays are bank holidays. For Saturdays, banks in India are closed on the second and fourth Saturdays of every month. Banks are open on the first, third, and fifth (if applicable) Saturdays of the month." },
  { question: "Will NEFT and RTGS work on bank holidays?", answer: "Yes! NEFT and RTGS are now available 24x7x365. You can transfer money online anytime, even on Sundays, National Holidays, and RBI holidays. UPI and IMPS also work 24/7." },
  { question: "Do private banks like HDFC, ICICI, and Axis observe the same holidays as SBI?", answer: "Yes, all scheduled commercial banks (including private banks, PSU banks like SBI, and regional rural banks) follow the holiday list mandated by the Reserve Bank of India (RBI) and their respective State Governments." }
];

interface Holiday {
  date: string;
  day: string;
  name: string;
  type: 'National' | 'State' | 'RBI';
  states: string;
}

const HOLIDAY_DATA_2026: Holiday[] = [
  { date: '2026-01-01', day: 'Thursday', name: "New Year's Day", type: 'State', states: 'Multiple States' },
  { date: '2026-01-14', day: 'Wednesday', name: 'Makar Sankranti / Pongal', type: 'State', states: 'Andhra Pradesh, Karnataka, Tamil Nadu, Telangana, Gujarat' },
  { date: '2026-01-26', day: 'Monday', name: 'Republic Day', type: 'National', states: 'All States' },
  { date: '2026-03-03', day: 'Tuesday', name: 'Maha Shivaratri', type: 'State', states: 'Most States' },
  { date: '2026-03-23', day: 'Monday', name: 'Holi', type: 'State', states: 'Most States (Except South India)' },
  { date: '2026-04-01', day: 'Wednesday', name: 'Annual Closing of Bank Accounts', type: 'RBI', states: 'All States (Banks closed for public)' },
  { date: '2026-04-03', day: 'Friday', name: 'Good Friday', type: 'State', states: 'Most States' },
  { date: '2026-04-14', day: 'Tuesday', name: 'Dr. Ambedkar Jayanti', type: 'National', states: 'All States' },
  { date: '2026-05-01', day: 'Friday', name: 'May Day / Labour Day', type: 'State', states: 'Karnataka, Tamil Nadu, West Bengal, Maharashtra' },
  { date: '2026-08-15', day: 'Saturday', name: 'Independence Day', type: 'National', states: 'All States' },
  { date: '2026-09-06', day: 'Sunday', name: 'Janmashtami', type: 'State', states: 'Most States' },
  { date: '2026-09-14', day: 'Monday', name: 'Ganesh Chaturthi', type: 'State', states: 'Maharashtra, Gujarat, Karnataka, Andhra Pradesh' },
  { date: '2026-10-02', day: 'Friday', name: 'Gandhi Jayanti', type: 'National', states: 'All States' },
  { date: '2026-10-19', day: 'Monday', name: 'Dussehra (Vijaya Dashami)', type: 'National', states: 'All States' },
  { date: '2026-11-08', day: 'Sunday', name: 'Diwali (Deepavali)', type: 'National', states: 'All States' },
  { date: '2026-12-25', day: 'Friday', name: 'Christmas', type: 'National', states: 'All States' },
];

export const BankHolidayCalendar: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredHolidays = HOLIDAY_DATA_2026.filter(h => selectedType === 'All' || h.type === selectedType);

  return (
    <>
      <SEOHelmet 
        title="Bank Holidays 2026 in India | SBI, HDFC, ICICI Holiday Calendar" 
        description="Comprehensive list of bank holidays in India for 2026. Check state-wise, national, and RBI bank holidays for SBI, HDFC, ICICI, and all public/private banks." 
        keywords="bank holidays 2026, bank holiday calendar india, sbi bank holidays, rbi bank holidays, national holidays india, bank saturday holidays" 
        url="/calculators/bank-holiday-calendar" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'Bank Holiday Calendar 2026', description: 'Check bank holidays in India.', category: 'Financial Tools', features: ['State-wise Holidays', 'National Holidays', 'RBI Holidays'], ratingValue: 4.7, reviewCount: 9500, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators & Tools</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Bank Holidays 2026</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Bank Holidays in India (2026)</h1>
          <p className="text-gray-600">Plan your banking and financial activities in advance. Below is the comprehensive list of bank holidays mandated by the Reserve Bank of India (RBI) under the Negotiable Instruments Act for all public sector, private sector, foreign, cooperative, and regional rural banks in India.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-10 overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">2026 Holiday Schedule</h2>
            <div className="flex bg-white rounded border border-gray-300 overflow-hidden">
              {['All', 'National', 'State', 'RBI'].map(type => (
                <button 
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 text-sm font-medium ${selectedType === type ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} border-r border-gray-200 last:border-r-0`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 border-b font-semibold text-gray-700">Date</th>
                  <th className="p-4 border-b font-semibold text-gray-700">Day</th>
                  <th className="p-4 border-b font-semibold text-gray-700">Holiday Name</th>
                  <th className="p-4 border-b font-semibold text-gray-700">Type</th>
                  <th className="p-4 border-b font-semibold text-gray-700">Applicable States</th>
                </tr>
              </thead>
              <tbody>
                {filteredHolidays.map((h, i) => (
                  <tr key={i} className="hover:bg-blue-50 border-b border-gray-100 last:border-0 transition-colors">
                    <td className="p-4 whitespace-nowrap font-medium text-gray-800">{new Date(h.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="p-4 whitespace-nowrap text-gray-600">{h.day}</td>
                    <td className="p-4 font-bold text-blue-900">{h.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${h.type === 'National' ? 'bg-green-100 text-green-800' : h.type === 'RBI' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>
                        {h.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{h.states}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredHolidays.length === 0 && (
              <div className="p-8 text-center text-gray-500">No holidays found for this category.</div>
            )}
          </div>
        </div>

        {/* ═══════════════ SEO CONTENT ═══════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          <h2>Understanding Bank Holidays in India (RBI Guidelines)</h2>
          <p>
            In India, bank holidays are not uniform across the entire country. The Reserve Bank of India (RBI) issues a comprehensive list of holidays every year under the Negotiable Instruments Act, 1881. It is important to know that while some holidays mean banks are closed across the entire nation, many holidays are specific to individual states based on regional festivals.
          </p>

          <h3>The Three Categories of RBI Bank Holidays</h3>
          <p>The RBI categorizes bank holidays into three distinct groups:</p>
          <ol>
            <li><strong>Holiday under Negotiable Instruments Act:</strong> These are the most common holidays. Most state-level festivals (like Bihu in Assam, Onam in Kerala, or Chhatrapati Shivaji Maharaj Jayanti in Maharashtra) fall under this category.</li>
            <li><strong>Holiday under Negotiable Instruments Act and Real Time Gross Settlement Holiday:</strong> These are national holidays where all clearing houses and settlement systems are closed. Examples include Republic Day (Jan 26), Independence Day (Aug 15), and Gandhi Jayanti (Oct 2).</li>
            <li><strong>Banks' Closing of Accounts:</strong> This occurs on April 1st every year. Banks remain open for their own internal auditing and account closing work, but they are closed to the public for regular transactions.</li>
          </ol>

          <h3>Saturday Bank Holiday Rules in India</h3>
          <p>Since 2015, the Indian banking sector follows a standardized weekend holiday schedule:</p>
          <ul>
            <li><strong>Closed:</strong> All Sundays are bank holidays.</li>
            <li><strong>Closed:</strong> The <strong>Second (2nd)</strong> and <strong>Fourth (4th)</strong> Saturdays of every month are declared bank holidays.</li>
            <li><strong>Open:</strong> The First (1st), Third (3rd), and Fifth (5th) Saturdays are normal working days for all banks.</li>
          </ul>
          <div className="bg-yellow-50 p-4 rounded-lg my-4 text-sm border-l-4 border-yellow-500">
            <strong>Update on 5-Day Banking:</strong> The Indian Banks' Association (IBA) and bank unions have signed a memorandum for a 5-day work week (making all Saturdays holidays). However, as of early 2026, this proposal is still awaiting final notification from the Ministry of Finance and the RBI. Until the official gazette notification is issued, the 2nd and 4th Saturday rule remains in effect.
          </div>

          <h3>What Financial Services Work on Bank Holidays?</h3>
          <p>A bank holiday only means that physical bank branches are closed. The digital financial infrastructure of India runs 24/7/365. You can seamlessly perform the following operations even on National Holidays:</p>
          <ul>
            <li><strong>UPI Payments:</strong> Google Pay, PhonePe, Paytm, and BHIM operate without interruption.</li>
            <li><strong>IMPS (Immediate Payment Service):</strong> Instant fund transfers up to ₹5 Lakhs are fully operational.</li>
            <li><strong>NEFT & RTGS:</strong> Previously restricted, both NEFT and RTGS are now available 24x7, including on Sundays and RBI holidays.</li>
            <li><strong>ATM Services:</strong> Cash withdrawals and cash deposit machines (CDMs) remain functional.</li>
            <li><strong>Net Banking & Mobile Banking:</strong> You can manage FDs, check balances, and pay utility bills.</li>
          </ul>
          <p><strong>What DOES NOT work?</strong> Physical cheque clearing (CTS) does not happen on bank holidays. If you deposit a cheque on a Saturday holiday, it will only be sent for clearing on the next working Monday.</p>

          <h3>State-Specific Variations</h3>
          <p>Do not assume that a holiday in Delhi applies to Bangalore. For example:</p>
          <ul>
            <li><strong>Gudi Padwa / Ugadi:</strong> Holiday in Maharashtra, Karnataka, Telangana, and Andhra Pradesh, but a normal working day in North India.</li>
            <li><strong>Durga Puja (Maha Ashtami/Navami):</strong> Continuous holidays in West Bengal, Odisha, and Tripura, but largely working days in South India.</li>
            <li><strong>Pongal / Makar Sankranti:</strong> Bank holiday in Tamil Nadu and Andhra Pradesh, but often working days in Delhi and Mumbai.</li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>While every effort has been made to ensure the accuracy of this 2026 holiday calendar, dates for certain festivals (like Eid-ul-Fitr, Muharram, or Diwali) may change at the last minute subject to the sighting of the moon or state government gazette notifications. Please confirm with your local bank branch before planning critical physical transactions.</p>
          </div>
        </div>
      </div>
    </>
  );
};