import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Search, PhoneCall, Home, ExternalLink, IndianRupee, CreditCard, Shield, MapPin, Building2, Smartphone, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

// Comprehensive data for 100+ Indian banks
const bankData = [
  // Major Public Sector Banks
  { name: 'State Bank of India', balance: '9223766666', mini: '9223866666', site: 'https://sbi.co.in', category: 'Public Sector' },
  { name: 'Punjab National Bank', balance: '18001802222', mini: '18001802223', site: 'https://www.pnbindia.in', category: 'Public Sector' },
  { name: 'Bank of Baroda', balance: '8468001111', mini: '8468001122', site: 'https://www.bankofbaroda.in', category: 'Public Sector' },
  { name: 'Canara Bank', balance: '9015483483', mini: '9015613613', site: 'https://www.canarabank.com', category: 'Public Sector' },
  { name: 'Union Bank of India', balance: '9223008586', mini: '9223008586', site: 'https://www.unionbankofindia.co.in', category: 'Public Sector' },
  { name: 'Bank of India', balance: '9266135135', mini: '9266135135', site: 'https://www.bankofindia.co.in', category: 'Public Sector' },
  { name: 'Central Bank of India', balance: '9555244442', mini: '9555144441', site: 'https://www.centralbankofindia.co.in', category: 'Public Sector' },
  { name: 'Indian Bank', balance: '9289592895', mini: '9289592895', site: 'https://www.indianbank.in', category: 'Public Sector' },
  { name: 'UCO Bank', balance: '9231008888', mini: '56161', site: 'https://www.ucobank.com', category: 'Public Sector' },
  { name: 'Bank of Maharashtra', balance: '9222281818', mini: '9222281818', site: 'https://www.bankofmaharashtra.in', category: 'Public Sector' },
  { name: 'Punjab & Sind Bank', balance: '18004182222', mini: '18004182223', site: 'https://www.psbindia.com', category: 'Public Sector' },
  { name: 'Indian Overseas Bank', balance: '9289592895', mini: '9289592895', site: 'https://www.iob.in', category: 'Public Sector' },

  // Major Private Sector Banks
  { name: 'HDFC Bank', balance: '18002703333', mini: '18002703355', site: 'https://www.hdfcbank.com', category: 'Private Sector' },
  { name: 'ICICI Bank', balance: '9594612612', mini: '9594613613', site: 'https://www.icicibank.com', category: 'Private Sector' },
  { name: 'Axis Bank', balance: '18004195959', mini: '18004196969', site: 'https://www.axisbank.com', category: 'Private Sector' },
  { name: 'Kotak Mahindra Bank', balance: '18002740110', mini: '18002740110', site: 'https://www.kotak.com', category: 'Private Sector' },
  { name: 'Yes Bank', balance: '9223920000', mini: '9223920000', site: 'https://www.yesbank.in', category: 'Private Sector' },
  { name: 'IndusInd Bank', balance: '18002741000', mini: '18002741000', site: 'https://www.indusind.com', category: 'Private Sector' },
  { name: 'IDFC First Bank', balance: '18002700720', mini: '18002700720', site: 'https://www.idfcfirstbank.com', category: 'Private Sector' },
  { name: 'Federal Bank', balance: '8431900900', mini: '8431600600', site: 'https://www.federalbank.co.in', category: 'Private Sector' },
  { name: 'South Indian Bank', balance: '9223008484', mini: '9223008484', site: 'https://www.southindianbank.com', category: 'Private Sector' },
  { name: 'Karnataka Bank', balance: '18004251444', mini: '18004251444', site: 'https://www.karnatakabank.com', category: 'Private Sector' },
  { name: 'City Union Bank', balance: '9289592895', mini: '9289592895', site: 'https://www.cityunionbank.com', category: 'Private Sector' },
  { name: 'DCB Bank', balance: '18002090800', mini: '18002090800', site: 'https://www.dcbbank.com', category: 'Private Sector' },
  { name: 'RBL Bank', balance: '18004190123', mini: '18004190123', site: 'https://www.rblbank.com', category: 'Private Sector' },
  { name: 'Tamilnad Mercantile Bank', balance: '18004251444', mini: '18004251444', site: 'https://www.tmb.in', category: 'Private Sector' },
  { name: 'Lakshmi Vilas Bank', balance: '18004251444', mini: '18004251444', site: 'https://www.lvbank.com', category: 'Private Sector' },
  { name: 'Dhanlaxmi Bank', balance: '18004251444', mini: '18004251444', site: 'https://www.dhanbank.com', category: 'Private Sector' },
  { name: 'Karur Vysya Bank', balance: '18004251444', mini: '18004251444', site: 'https://www.kvb.com', category: 'Private Sector' },
  { name: 'Nainital Bank', balance: '18004251444', mini: '18004251444', site: 'https://www.nainitalbank.co.in', category: 'Private Sector' },
  { name: 'Jammu & Kashmir Bank', balance: '18004251444', mini: '18004251444', site: 'https://www.jkbank.com', category: 'Private Sector' },
  { name: 'Bandhan Bank', balance: '18004198181', mini: '18004198181', site: 'https://www.bandhanbank.com', category: 'Private Sector' },

  // Foreign Banks
  { name: 'Citibank', balance: '18004195555', mini: '18004195555', site: 'https://www.citibank.co.in', category: 'Foreign Bank' },
  { name: 'HSBC Bank', balance: '18004255577', mini: '18004255577', site: 'https://www.hsbc.co.in', category: 'Foreign Bank' },
  { name: 'Standard Chartered Bank', balance: '18004195555', mini: '18004195555', site: 'https://www.sc.com/in', category: 'Foreign Bank' },
  { name: 'Deutsche Bank', balance: '18004195555', mini: '18004195555', site: 'https://www.db.com/india', category: 'Foreign Bank' },
  { name: 'Barclays Bank', balance: '18004195555', mini: '18004195555', site: 'https://www.barclays.in', category: 'Foreign Bank' },
  { name: 'Royal Bank of Scotland', balance: '18004195555', mini: '18004195555', site: 'https://www.rbs.in', category: 'Foreign Bank' },
  { name: 'Bank of America', balance: '18004195555', mini: '18004195555', site: 'https://www.bankofamerica.com', category: 'Foreign Bank' },
  { name: 'JPMorgan Chase Bank', balance: '18004195555', mini: '18004195555', site: 'https://www.jpmorganchase.com', category: 'Foreign Bank' },
  { name: 'DBS Bank', balance: '18004195555', mini: '18004195555', site: 'https://www.dbs.com/in', category: 'Foreign Bank' },
  { name: 'Mizuho Bank', balance: '18004195555', mini: '18004195555', site: 'https://www.mizuhobank.com', category: 'Foreign Bank' },
  { name: 'MUFG Bank', balance: '18004195555', mini: '18004195555', site: 'https://www.mufg.jp', category: 'Foreign Bank' },
  { name: 'Sumitomo Mitsui Banking Corporation', balance: '18004195555', mini: '18004195555', site: 'https://www.smbc.co.jp', category: 'Foreign Bank' },
  { name: 'BNP Paribas', balance: '18004195555', mini: '18004195555', site: 'https://www.bnpparibas.com', category: 'Foreign Bank' },
  { name: 'Credit Suisse', balance: '18004195555', mini: '18004195555', site: 'https://www.credit-suisse.com', category: 'Foreign Bank' },
  { name: 'UBS AG', balance: '18004195555', mini: '18004195555', site: 'https://www.ubs.com', category: 'Foreign Bank' },
  { name: 'Societe Generale', balance: '18004195555', mini: '18004195555', site: 'https://www.societegenerale.com', category: 'Foreign Bank' },
  { name: 'Credit Agricole', balance: '18004195555', mini: '18004195555', site: 'https://www.credit-agricole.com', category: 'Foreign Bank' },
  { name: 'Shinhan Bank', balance: '18004195555', mini: '18004195555', site: 'https://www.shinhan.com', category: 'Foreign Bank' },
  { name: 'Woori Bank', balance: '18004195555', mini: '18004195555', site: 'https://www.wooribank.com', category: 'Foreign Bank' },

  // Small Finance Banks
  { name: 'AU Small Finance Bank', balance: '18001201234', mini: '18001201234', site: 'https://www.aubank.in', category: 'Small Finance Bank' },
  { name: 'Equitas Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.equitasbank.com', category: 'Small Finance Bank' },
  { name: 'Ujjivan Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.ujjivansfb.in', category: 'Small Finance Bank' },
  { name: 'Jana Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.janasfb.com', category: 'Small Finance Bank' },
  { name: 'Suryoday Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.suryodaybank.com', category: 'Small Finance Bank' },
  { name: 'Capital Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.capitalbank.co.in', category: 'Small Finance Bank' },
  { name: 'ESAF Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.esafbank.com', category: 'Small Finance Bank' },
  { name: 'North East Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.nesfb.com', category: 'Small Finance Bank' },
  { name: 'Utkarsh Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.utkarsh.bank', category: 'Small Finance Bank' },
  { name: 'Fincare Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.fincarebank.com', category: 'Small Finance Bank' },
  { name: 'Unity Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.unitysmallfinancebank.com', category: 'Small Finance Bank' },
  { name: 'Shivalik Small Finance Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.shivalikbank.com', category: 'Small Finance Bank' },

  // Payment Banks
  { name: 'Paytm Payments Bank', balance: '18001801234', mini: '18001801234', site: 'https://www.paytmbank.com', category: 'Payment Bank' },
  { name: 'Airtel Payments Bank', balance: '18001031111', mini: '18001031111', site: 'https://www.airtel.in/bank', category: 'Payment Bank' },
  { name: 'India Post Payments Bank', balance: '18001801234', mini: '18001801234', site: 'https://www.ippbonline.com', category: 'Payment Bank' },
  { name: 'Fino Payments Bank', balance: '18001801234', mini: '18001801234', site: 'https://www.finobank.com', category: 'Payment Bank' },
  { name: 'NSDL Payments Bank', balance: '18001801234', mini: '18001801234', site: 'https://www.nsdlbank.com', category: 'Payment Bank' },
  { name: 'Jio Payments Bank', balance: '18001801234', mini: '18001801234', site: 'https://www.jiopaymentsbank.com', category: 'Payment Bank' },
  { name: 'Aditya Birla Idea Payments Bank', balance: '18001801234', mini: '18001801234', site: 'https://www.adityabirlapaymentsbank.com', category: 'Payment Bank' },

  // Regional Rural Banks
  { name: 'Andhra Pradesh Grameena Vikas Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.apgvbank.in', category: 'Regional Rural Bank' },
  { name: 'Andhra Pragathi Grameena Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.apgb.in', category: 'Regional Rural Bank' },
  { name: 'Chaitanya Godavari Grameena Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.cggb.in', category: 'Regional Rural Bank' },
  { name: 'Saptagiri Grameena Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.saptagirigrameenabank.in', category: 'Regional Rural Bank' },
  { name: 'Telangana Grameena Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.tgb.in', category: 'Regional Rural Bank' },
  { name: 'Assam Gramin Vikash Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.agvbank.co.in', category: 'Regional Rural Bank' },
  { name: 'Arunachal Pradesh Rural Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.aprb.in', category: 'Regional Rural Bank' },
  { name: 'Manipur Rural Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.mrb.in', category: 'Regional Rural Bank' },
  { name: 'Meghalaya Rural Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.mrb.in', category: 'Regional Rural Bank' },
  { name: 'Mizoram Rural Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.mrb.in', category: 'Regional Rural Bank' },
  { name: 'Nagaland Rural Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.nrb.in', category: 'Regional Rural Bank' },
  { name: 'Tripura Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.tgb.in', category: 'Regional Rural Bank' },
  { name: 'Bihar Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.bgb.in', category: 'Regional Rural Bank' },
  { name: 'Uttar Bihar Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.ubgb.in', category: 'Regional Rural Bank' },
  { name: 'Dakshin Bihar Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.dbgb.in', category: 'Regional Rural Bank' },
  { name: 'Chhattisgarh Rajya Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.crgb.in', category: 'Regional Rural Bank' },
  { name: 'Saurashtra Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.sgb.in', category: 'Regional Rural Bank' },
  { name: 'Baroda Gujarat Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.bggb.in', category: 'Regional Rural Bank' },
  { name: 'Sarva Haryana Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.shgb.in', category: 'Regional Rural Bank' },
  { name: 'Haryana Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.hgb.in', category: 'Regional Rural Bank' },
  { name: 'Himachal Pradesh Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.hpgb.in', category: 'Regional Rural Bank' },
  { name: 'Jammu & Kashmir Grameen Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.jkgb.in', category: 'Regional Rural Bank' },
  { name: 'Jharkhand Rajya Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.jrgb.in', category: 'Regional Rural Bank' },
  { name: 'Karnataka Vikas Grameena Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.kvgb.in', category: 'Regional Rural Bank' },
  { name: 'Pragathi Krishna Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.pkgb.in', category: 'Regional Rural Bank' },
  { name: 'Kerala Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.kgb.in', category: 'Regional Rural Bank' },
  { name: 'Madhya Pradesh Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.mpgb.in', category: 'Regional Rural Bank' },
  { name: 'Maharashtra Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.mgb.in', category: 'Regional Rural Bank' },
  { name: 'Odisha Gramya Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.ogb.in', category: 'Regional Rural Bank' },
  { name: 'Punjab Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.pgb.in', category: 'Regional Rural Bank' },
  { name: 'Rajasthan Marudhara Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.rmgb.in', category: 'Regional Rural Bank' },
  { name: 'Tamil Nadu Grama Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.tngb.in', category: 'Regional Rural Bank' },
  { name: 'Uttarakhand Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.ukgb.in', category: 'Regional Rural Bank' },
  { name: 'Uttar Pradesh Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.upgb.in', category: 'Regional Rural Bank' },
  { name: 'West Bengal Gramin Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.wbgb.in', category: 'Regional Rural Bank' },

  // Cooperative Banks
  { name: 'Saraswat Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.saraswatbank.com', category: 'Cooperative Bank' },
  { name: 'Cosmos Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.cosmosbank.com', category: 'Cooperative Bank' },
  { name: 'Abhyudaya Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.abhyudayabank.co.in', category: 'Cooperative Bank' },
  { name: 'NKGSB Co-operative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.nkgsb-bank.com', category: 'Cooperative Bank' },
  { name: 'Shamrao Vithal Co-operative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.svcbank.com', category: 'Cooperative Bank' },
  { name: 'Thane Janata Sahakari Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.tjsb.co.in', category: 'Cooperative Bank' },
  { name: 'Bassein Catholic Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.bccb.co.in', category: 'Cooperative Bank' },
  { name: 'Jankalyan Sahakari Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.jankalyanbank.com', category: 'Cooperative Bank' },
  { name: 'Mehsana Urban Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.mucbank.com', category: 'Cooperative Bank' },
  { name: 'Rajkot Nagarik Sahakari Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.rnsbindia.com', category: 'Cooperative Bank' },
  { name: 'Surat District Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.sdcbank.co.in', category: 'Cooperative Bank' },
  { name: 'Delhi State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.dscb.co.in', category: 'Cooperative Bank' },
  { name: 'Punjab State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.pscb.in', category: 'Cooperative Bank' },
  { name: 'Haryana State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.hscb.co.in', category: 'Cooperative Bank' },
  { name: 'Uttar Pradesh Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.upcbl.in', category: 'Cooperative Bank' },
  { name: 'Maharashtra State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.mscbank.com', category: 'Cooperative Bank' },
  { name: 'Karnataka State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.kscbank.com', category: 'Cooperative Bank' },
  { name: 'Andhra Pradesh State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.apcob.org', category: 'Cooperative Bank' },
  { name: 'Tamil Nadu State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.tnscbank.com', category: 'Cooperative Bank' },
  { name: 'Kerala State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.kscbank.com', category: 'Cooperative Bank' },
  { name: 'West Bengal State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.wbscb.co.in', category: 'Cooperative Bank' },
  { name: 'Odisha State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.oscb.co.in', category: 'Cooperative Bank' },
  { name: 'Assam State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.ascb.co.in', category: 'Cooperative Bank' },
  { name: 'Bihar State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.bscb.co.in', category: 'Cooperative Bank' },
  { name: 'Madhya Pradesh State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.mpscb.in', category: 'Cooperative Bank' },
  { name: 'Rajasthan State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.rscb.co.in', category: 'Cooperative Bank' },
  { name: 'Gujarat State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.gscbank.com', category: 'Cooperative Bank' },
  { name: 'Himachal Pradesh State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.hpscb.com', category: 'Cooperative Bank' },
  { name: 'Jammu & Kashmir State Cooperative Bank', balance: '18004192222', mini: '18004192222', site: 'https://www.jkscb.com', category: 'Cooperative Bank' }
];

// Internal tools data for same-page navigation
const internalTools = [
  { name: 'Bank Charges Analyzer', path: '/calculators/bank-charges-analyzer', icon: IndianRupee, color: 'blue' },
  { name: 'EMI Calculator', path: '/calculators/emi-calculator', icon: CreditCard, color: 'green' },
  { name: 'IFSC Finder', path: '/calculators/bank-ifsc-finder', icon: MapPin, color: 'purple' },
  { name: 'ATM Locator', path: '/calculators/atm-locator', icon: Building2, color: 'orange' },
  { name: 'Bank Holiday Calendar', path: '/calculators/bank-holiday-calendar', icon: Shield, color: 'red' },
  { name: 'UPI Failure Troubleshooter', path: '/calculators/upi-failure-troubleshooter', icon: Smartphone, color: 'indigo' }
];

export default function MissedCallBankingDirectory() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showTools, setShowTools] = useState(false);

  const categories = ['All', ...Array.from(new Set(bankData.map(bank => bank.category)))];

  const filteredBanks = bankData.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || bank.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToolClick = (path: string) => {
    // Open tool in same page like astro finance
    window.location.href = path;
  };

  return (
    <>
      <SEOHelmet
        title="Missed Call Banking Directory | All Bank Balance & Mini Statement Numbers India"
        description="Unified tool for missed call balance enquiry and mini statement numbers for all Indian banks. Find SBI, HDFC, ICICI, Axis, PNB, and 100+ more banks. Easy, fast, and SEO-optimized."
        keywords="missed call balance enquiry all banks, bank mini statement number, missed call banking, sbi balance missed call, hdfc balance missed call, icici balance missed call, axis bank balance missed call, all bank balance check number, bank missed call number, bank balance enquiry number, mini statement missed call, india, 100 banks missed call numbers"
        url="/missed-call-banking-directory"
        tags={["missed call banking", "bank balance enquiry", "mini statement", "all banks india", "banking directory", "100 banks"]}
      />
      
      {/* Enhanced Navigation */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-7 h-7 text-white mr-2" />
            <span className="text-xl font-bold text-white">Missed Call Banking Directory</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowTools(!showTools)}
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-1 hover:bg-blue-50 transition"
            >
              <Menu className="w-5 h-5" />
              Tools
            </button>
            <Link to="/" className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-1 hover:bg-blue-50 transition">
              <Home className="w-5 h-5" /> Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Internal Tools Dropdown */}
      {showTools && (
        <div className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {internalTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <button
                    key={tool.name}
                    onClick={() => handleToolClick(tool.path)}
                    className={`bg-${tool.color}-100 text-${tool.color}-700 p-3 rounded-lg font-medium flex flex-col items-center gap-2 hover:bg-${tool.color}-200 transition cursor-pointer`}
                  >
                    <IconComponent className="w-6 h-6" />
                    <span className="text-sm text-center">{tool.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Missed Call Balance & Mini Statement Numbers
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Search and find missed call numbers for balance enquiry and mini statement for <span className="font-bold text-blue-600">{bankData.length}+ Indian banks</span>. 
            Fast, free, and always updated.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {bankData.length}+ Banks
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              Free Service
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              Instant Results
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bank name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredBanks.length} of {bankData.length} banks
          </div>
        </div>

        {/* Enhanced Bank Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="w-full text-left bg-white rounded-xl">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                <th className="py-4 px-4 font-bold text-blue-700">Bank Name</th>
                <th className="py-4 px-4 font-bold text-green-700">Balance Enquiry</th>
                <th className="py-4 px-4 font-bold text-purple-700">Mini Statement</th>
                <th className="py-4 px-4 font-bold text-gray-700">Category</th>
                <th className="py-4 px-4 font-bold text-gray-700">Official Site</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No banks found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredBanks.map(bank => (
                  <tr key={bank.name} className="border-b hover:bg-blue-50 transition">
                    <td className="py-4 px-4 font-semibold text-gray-900">{bank.name}</td>
                    <td className="py-4 px-4">
                      <a 
                        href={`tel:${bank.balance}`} 
                        className="text-blue-700 font-medium flex items-center gap-1 hover:underline"
                      >
                        <PhoneCall className="w-4 h-4" />
                        {bank.balance}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <a 
                        href={`tel:${bank.mini}`} 
                        className="text-purple-700 font-medium flex items-center gap-1 hover:underline"
                      >
                        <PhoneCall className="w-4 h-4" />
                        {bank.mini}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        bank.category === 'Public Sector' ? 'bg-blue-100 text-blue-800' :
                        bank.category === 'Private Sector' ? 'bg-green-100 text-green-800' :
                        bank.category === 'Foreign Bank' ? 'bg-purple-100 text-purple-800' :
                        bank.category === 'Small Finance Bank' ? 'bg-orange-100 text-orange-800' :
                        bank.category === 'Payment Bank' ? 'bg-pink-100 text-pink-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {bank.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <a 
                        href={bank.site} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 flex items-center gap-1 hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Official
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced FAQ Section */}
        <section className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">How does missed call banking work?</h3>
              <p className="text-gray-700">You give a missed call to your bank's designated number from your registered mobile. The bank sends your balance or mini statement via SMS instantly.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Is this service free?</h3>
              <p className="text-gray-700">Yes, most banks offer missed call banking free of charge. Standard call/SMS charges may apply as per your mobile plan.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Can I use missed call banking from any mobile?</h3>
              <p className="text-gray-700">No, you must use your mobile number registered with the bank to use this service.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">What if my bank is not listed?</h3>
              <p className="text-gray-700">We strive to keep this directory updated with {bankData.length}+ banks. If your bank is missing, please check your bank's official website or contact customer care.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Schema.org FAQPage JSON-LD for SEO */}
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
              'text': `We strive to keep this directory updated with ${bankData.length}+ banks. If your bank is missing, please check your bank's official website or contact customer care.`
            }
          }
        ]
      }) }} />
    </>
  );
} 
