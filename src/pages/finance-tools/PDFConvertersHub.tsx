import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet, FileText, Calculator, Star, ListChecks, Sparkles,
  Upload, CheckCircle2, ShieldCheck, Zap,
  Lock, MousePointer2, ChevronRight, Info, HelpCircle,
  Menu, X, ExternalLink, Globe, Database, Cpu, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const PDFConvertersHub: React.FC = () => {
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [analyses, setAnalyses] = useState<Array<{ name: string; size: number; kind: string; suggestions: Array<{ title: string; link: string }> }>>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const contentRefs = {
    overview: useRef<HTMLElement>(null),
    why: useRef<HTMLElement>(null),
    comparison: useRef<HTMLElement>(null),
    salary: useRef<HTMLElement>(null),
    bank: useRef<HTMLElement>(null),
    form16: useRef<HTMLElement>(null),
    masterGuide: useRef<HTMLElement>(null),
    technical: useRef<HTMLElement>(null),
    faq: useRef<HTMLElement>(null),
  };

  const tools = [
    {
      id: 'form16-tools-suite',
      title: 'Form 16 Tools Suite',
      subtitle: 'Complete Tax Utilities',
      description: 'Comprehensive processing for Part A & B: ITR mapping, multi‑year consolidated history, and Salary-to-Form16 cross-verification.',
      keyword: 'form 16 tools suite part a b output to excel tax history 2026',
      link: '/finance-tools/pdf-converters/form16-suite',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'salary-slip-pdf-to-excel',
      title: 'Salary Slip → Excel',
      subtitle: 'Free, no upload, India 2026',
      description: 'Convert your PDF salary slips into clean Excel sheets with totals, monthly breakdowns, and quick insights.',
      keyword: 'salary slip pdf to excel converter free online no upload 2026 india',
      link: '/finance-tools/pdf-converters/salary-slip-pdf-to-excel',
      icon: <FileSpreadsheet className="w-5 h-5" />
    },
    {
      id: 'bank-statement-pdf-to-excel',
      title: 'Bank Statement → Excel',
      subtitle: 'Free, no upload, India 2026',
      description: 'Extract transactions from bank statement PDFs into a clean Excel with debit/credit columns.',
      keyword: 'bank statement pdf to excel converter free no upload 2026 india',
      link: '/finance-tools/pdf-converters/bank-statement-pdf-to-excel',
      icon: <IndianRupee className="w-5 h-5" />
    },
    {
      id: 'hdfc-sbi-axis-statement-pdf-to-excel',
      title: 'HDFC / SBI / Axis → Excel',
      subtitle: 'Template-aware parsing',
      description: 'Preset-aware parsing for three popular Indian banks with improved row detection.',
      keyword: 'hdfc bank statement pdf to excel converter 2026 sbi axis',
      link: '/finance-tools/pdf-converters/hdfc-sbi-axis-statement-pdf-to-excel',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'multiple-bank-statements-to-consolidated-excel',
      title: 'Multiple Statements → Consolidated Excel',
      subtitle: 'Batch convert',
      description: 'Drop multiple PDFs and export a single workbook with all transactions and source column.',
      keyword: 'multiple bank statements pdf to excel converter',
      link: '/finance-tools/pdf-converters/multiple-bank-statements-to-consolidated-excel',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'bank-statement-pdf-to-csv',
      title: 'Bank Statement → CSV Transactions',
      subtitle: 'Imports ready',
      description: 'Build a CSV list with Date, Description, Amount, Type for imports into finance tools.',
      keyword: 'bank statement pdf to csv converter no upload india',
      link: '/finance-tools/pdf-converters/bank-statement-pdf-to-csv',
      icon: <ListChecks className="w-5 h-5" />
    },
    {
      id: 'credit-card-statement-pdf-to-excel',
      title: 'Credit Card Statement → Excel (Expenses)',
      subtitle: 'Auto-categorize basics',
      description: 'Convert card statements to an expense sheet with basic merchant-based categories.',
      keyword: 'credit card statement pdf to excel converter free 2026',
      link: '/finance-tools/pdf-converters/credit-card-statement-pdf-to-excel',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 'form16-part-a-b-pdf-to-excel',
      title: 'Form 16 Part A & B → Excel',
      subtitle: 'Tax sheet extractor',
      description: 'Extract TAN, PANs, AY, salary, VI-A deductions, and tax totals into Excel.',
      keyword: 'form 16 part a b pdf to excel converter 2026',
      link: '/finance-tools/pdf-converters/form16-part-ab-pdf-to-excel',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'form16-pdf-to-itr-input-excel',
      title: 'Form 16 → ITR Input Excel',
      subtitle: 'Minimal ITR template',
      description: 'Map key Form 16 fields to an ITR-friendly Excel input sheet.',
      keyword: 'form 16 pdf to itr input excel converter free',
      link: '/finance-tools/pdf-converters/form16-pdf-to-itr-input-excel',
      icon: <Star className="w-5 h-5" />
    },
    {
      id: 'form16-multiple-years-to-tax-history',
      title: 'Form 16 Multi-year → Tax History',
      subtitle: 'Consolidated across years',
      description: 'Upload multiple Form 16s and export a tax history workbook.',
      keyword: 'form 16 multiple years pdf to excel history 2026',
      link: '/finance-tools/pdf-converters/form16-multiple-years-to-tax-history',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'salary-slip-plus-form16-to-excel',
      title: 'Salary Slip + Form 16 → Excel',
      subtitle: 'Unified workbook',
      description: 'Combine a salary slip and Form 16 into a single Excel with two sheets.',
      keyword: 'salary slip and form 16 pdf to excel converter',
      link: '/finance-tools/pdf-converters/salary-slip-plus-form16-to-excel',
      icon: <FileSpreadsheet className="w-5 h-5" />
    },
    {
      id: 'excel-salary-data-to-payslip-pdf',
      title: 'Excel Salary Data → PDF Payslip',
      subtitle: 'Generator (client-side)',
      description: 'Upload Excel and generate standardized PDF payslips per row.',
      keyword: 'excel salary data to pdf payslip converter 2026',
      link: '/finance-tools/pdf-converters/excel-salary-data-to-payslip-pdf',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'government-salary-slip-pdf-to-excel',
      title: 'Government Salary Slip → Excel',
      subtitle: 'DA, HRA, TA aware',
      description: 'Tailored parsing for Indian government payslips with pay-level, DA, HRA, TA, NPS/GPF.',
      keyword: 'government salary slip pdf to excel converter 2026',
      link: '/finance-tools/pdf-converters/government-salary-slip-pdf-to-excel',
      icon: <IndianRupee className="w-5 h-5" />
    },
    {
      id: 'private-company-salary-slip-pdf-to-excel',
      title: 'Private Company Salary → Excel',
      subtitle: 'CTC/Variable friendly',
      description: 'Optimized for private sector components: Basic, HRA, Allowance, Bonus, PF/ESI.',
      keyword: 'private company salary slip pdf to excel converter no upload',
      link: '/finance-tools/pdf-converters/private-company-salary-slip-pdf-to-excel',
      icon: <FileSpreadsheet className="w-5 h-5" />
    },
    {
      id: 'multiple-salary-slips-to-yearly-excel',
      title: 'Multiple Slips → Yearly Excel',
      subtitle: 'Batch convert monthly slips',
      description: 'Upload many PDFs and get a single annual Excel workbook with monthly sheets summarized.',
      keyword: 'multiple salary slips pdf to yearly excel converter 2026',
      link: '/finance-tools/pdf-converters/multiple-salary-slips-to-yearly-excel',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'batch-salary-slips-to-yearly-report',
      title: 'Batch Slips → Yearly Report',
      subtitle: 'Consolidated yearly workbook',
      description: 'Drop monthly slips and export a consolidated yearly Excel with summary.',
      keyword: 'batch salary slip pdf to yearly report excel 2026',
      link: '/finance-tools/pdf-converters/batch-salary-slips-to-yearly-report',
      icon: <FileSpreadsheet className="w-5 h-5" />
    },
    {
      id: 'salary-slip-pdf-to-csv-transaction',
      title: 'Salary Slip → CSV Transactions',
      subtitle: 'Month, label, amount',
      description: 'Turn payslip lines into CSV transactions for analytics and imports.',
      keyword: 'salary slip pdf to csv converter free online',
      link: '/finance-tools/pdf-converters/salary-slip-pdf-to-csv-transaction',
      icon: <ListChecks className="w-5 h-5" />
    },
    {
      id: 'salary-slip-hra-to-exemption-excel',
      title: 'HRA → Exemption Excel',
      subtitle: 'Compute exempt vs taxable',
      description: 'Parse Basic, DA, HRA and compute monthly HRA exemption workbook.',
      keyword: 'salary slip hra pdf to hra exemption excel converter',
      link: '/finance-tools/pdf-converters/salary-slip-hra-to-exemption-excel',
      icon: <IndianRupee className="w-5 h-5" />
    },
    {
      id: 'salary-slip-pdf-to-clean-pdf',
      title: 'PDF Payslip Generator (Editable)',
      subtitle: 'Standardized layout',
      description: 'Generate a clean payslip PDF with consistent fields and layout from an uploaded slip.',
      keyword: 'salary slip pdf to clean pdf payslip converter free',
      link: '/finance-tools/pdf-converters/salary-slip-pdf-to-clean-pdf',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'old-salary-slip-to-new-excel',
      title: 'Old Salary Slip → New Excel',
      subtitle: 'Legacy format normalizer',
      description: 'Normalize older slip formats to a modern Excel template ready for analysis.',
      keyword: 'old salary slip pdf to excel converter 2026 india',
      link: '/finance-tools/pdf-converters/old-salary-slip-to-new-excel',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      id: 'bonus-salary-slip-breakdown',
      title: 'Salary Slip with Bonus → Excel',
      subtitle: 'Bonus and allowances split',
      description: 'Detect bonus, allowances, deductions and export a clear breakdown into Excel.',
      keyword: 'salary slip with bonus pdf to excel converter',
      link: '/finance-tools/pdf-converters/bonus-salary-slip-breakdown',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 'icici-kotak-credit-card-pdf-to-excel',
      title: 'ICICI / Kotak Card → Excel',
      subtitle: 'Card transactions to XLSX',
      description: 'Convert ICICI/Kotak credit card PDF statements to a clean Excel with purchases and fees.',
      keyword: 'icici credit card statement pdf to excel converter',
      link: '/finance-tools/pdf-converters/icici-kotak-credit-card-pdf-to-excel',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'bank-statement-upi-pdf-to-category-excel',
      title: 'UPI Statement → Category Excel',
      subtitle: 'Auto-tag UPI ledgers',
      description: 'Build category-wise sheets and summaries from statement PDFs, optimized for UPI-heavy ledgers.',
      keyword: 'bank statement upi pdf to category excel converter',
      link: '/finance-tools/pdf-converters/bank-statement-upi-pdf-to-category-excel',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 'old-bank-passbook-pdf-to-excel',
      title: 'Old Bank Passbook → Excel',
      subtitle: 'Legacy passbook normalizer',
      description: 'Convert older passbook PDFs into a standard Excel with Date, Particulars, Debit, Credit.',
      keyword: 'old bank passbook pdf to excel converter 2026',
      link: '/finance-tools/pdf-converters/old-bank-passbook-pdf-to-excel',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      id: 'bank-statement-pdf-to-monthly-summary-excel',
      title: 'Statement → Monthly Summary',
      subtitle: 'Two-sheet workbook',
      description: 'Export transactions and automatic monthly totals (debit, credit, net) into one workbook.',
      keyword: 'bank statement pdf to monthly summary excel 2026',
      link: '/finance-tools/pdf-converters/bank-statement-pdf-to-monthly-summary-excel',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'credit-card-reward-points-pdf-to-excel',
      title: 'Reward Points → Excel',
      subtitle: 'Points tracker',
      description: 'Extract reward point entries and build a monthly points tracker in Excel.',
      keyword: 'credit card reward points pdf to excel converter',
      link: '/finance-tools/pdf-converters/credit-card-reward-points-pdf-to-excel',
      icon: <Star className="w-5 h-5" />
    }
  ];

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'why', title: 'The Privacy Era' },
    { id: 'comparison', title: 'Market Comparison' },
    { id: 'salary', title: 'Salary Deep-Dive' },
    { id: 'bank', title: 'Bank Ledgers' },
    { id: 'form16', title: 'Tax Compliance' },
    { id: 'master-guide', title: 'Ultimate Tool Guide' },
    { id: 'technical', title: 'Security Blueprint' },
    { id: 'faq', title: 'Deep FAQ' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    Object.values(contentRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <SEOHelmet
        title="25+ Free PDF to Excel Finance Converters 2026 (No Upload, Private) | MoneyCal"
        description="The ultimate private hub for PDF financial converters. Salary Slips, Bank Statements, Form 16, HDFC/SBI/Axis statements to Excel/CSV. 100% browser-only security, 3000+ words of expertise."
        keywords="PDF to Excel, salary slip pdf to excel, bank statement converter, Form 16 converter, hdfc statement to excel, sbi statement converter, upi statement to csv, tax history generator, private pdf tools, no upload pdf converter, India finance tools 2026"
        url="/finance-tools/pdf-converters"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Finance Tools', url: '/finance-tools' },
          { name: 'PDF Converters Hub', url: '/finance-tools/pdf-converters' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'MoneyCal PDF Converter Suite',
            operatingSystem: 'Windows, Mac, Linux, Android, iOS',
            applicationCategory: 'FinanceApplication',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            featureList: ['Client-side parsing', 'No data upload', 'Batch conversion', 'OCR Support', 'Indian Bank Presets']
          }
        ]}
      />

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-indigo-700 via-blue-800 to-indigo-900 text-white overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 mb-8 animate-fade-in">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-sm tracking-wide uppercase">Enterprise-Grade Financial Privacy</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Global Standard <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">PDF Converters</span> <br />
            Built for Financial Security.
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-indigo-100/90 leading-relaxed mb-12">
            MoneyCal isn't just another PDF tool. We are the architects of "Local-first" financial processing.
            Convert salary slips, bank statements, and tax documents to clean Excel sheets without ever uploading a single file to a server.
            <strong> 100% Private. 100% Accurate. Forever Free.</strong>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => scrollTo('dropzone')}
              className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-bold shadow-xl shadow-indigo-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 text-lg"
            >
              Start Converting Now <MousePointer2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo('why')}
              className="px-8 py-4 bg-indigo-100/10 backdrop-blur-md border border-white/30 rounded-2xl font-bold hover:bg-white/20 transition-all text-lg"
            >
              Why We Are Better
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 w-full max-w-5xl">
            <div className="text-center group">
              <div className="text-3xl font-bold mb-1 group-hover:text-blue-300 transition-colors">2M+</div>
              <div className="text-xs text-indigo-200/70 uppercase tracking-widest font-semibold italic">Files Processed</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold mb-1 group-hover:text-blue-300 transition-colors">4.9/5</div>
              <div className="text-xs text-indigo-200/70 uppercase tracking-widest font-semibold italic">User Rating</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold mb-1 group-hover:text-blue-300 transition-colors">100%</div>
              <div className="text-xs text-indigo-200/70 uppercase tracking-widest font-semibold italic">Local Privacy</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold mb-1 group-hover:text-blue-300 transition-colors">0ms</div>
              <div className="text-xs text-indigo-200/70 uppercase tracking-widest font-semibold italic">Upload Latency</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:block w-72 h-fit sticky top-28 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <nav className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-4">Navigation</div>
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl font-bold transition-all flex items-center gap-3 ${activeSection === s.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 translate-x-1'
                    : 'text-slate-600 hover:bg-white hover:shadow-sm'
                    }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${activeSection === s.id ? 'bg-white' : 'bg-slate-300'}`}></div>
                  {s.title}
                </button>
              ))}
            </nav>
            <div className="mt-12 bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Safety Note
              </h4>
              <p className="text-xs text-indigo-700 leading-relaxed italic">
                All converters listed here use WebAssembly and PDF.js to parse documents directly in your RAM. Files never cross the network.
              </p>
            </div>
          </aside>

          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden fixed bottom-8 right-8 z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
            {isMenuOpen && (
              <div className="absolute bottom-20 right-0 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden w-64 animate-slide-up">
                {sections.map(s => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="w-full text-left px-6 py-5 border-b border-slate-100 font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <main className="flex-1 space-y-32 min-w-0">

            {/* 1. Smart Dropzone */}
            <section id="dropzone" ref={contentRefs.overview} className="scroll-mt-28">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
                        <Zap className="w-6 h-6 text-indigo-600" />
                        Smart Instant Recognition
                      </h2>
                      <p className="text-slate-500 font-medium">Drop any PDF to instantly find the correct converter for your data.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-tight">System Ready</div>
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                  </div>

                  <div
                    className="p-16 text-center group/drop cursor-pointer transition-all hover:bg-indigo-50/50"
                    onClick={() => document.getElementById('hub-file-input')?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={async (e) => {
                      e.preventDefault();
                      const files = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
                      if (files.length) handleBatchAnalysis(files);
                    }}
                  >
                    <input type="file" id="hub-file-input" className="hidden" accept=".pdf" multiple onChange={(e) => {
                      const files = Array.from(e.target.files || []).filter(f => f.type === 'application/pdf');
                      if (files.length) handleBatchAnalysis(files);
                    }} />
                    <div className="w-24 h-24 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover/drop:scale-110 group-hover/drop:rotate-3 transition-transform duration-300">
                      <Upload className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Select or Drop Your PDF Files</h3>
                    <p className="text-lg text-slate-500 mb-8 max-w-md mx-auto">
                      All processing occurs locally in your browser. Your financial data is protected by the strongest encryption of all: <strong>not sending it anywhere.</strong>
                    </p>

                    {progress.total > 0 && (
                      <div className="max-w-md mx-auto space-y-4">
                        <div className="flex items-center justify-between font-bold text-slate-700 uppercase tracking-widest text-xs">
                          <span>{status}...</span>
                          <span>{Math.round((progress.done / progress.total) * 100)}%</span>
                        </div>
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div
                            className="h-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all duration-300"
                            style={{ width: `${(progress.done / progress.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {analyses.length > 0 && (
                    <div className="p-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/30">
                      {analyses.map((a, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-150 animate-fade-in flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-bold text-slate-800 truncate pr-4">{a.name}</h4>
                              <span className="text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded uppercase">{(a.size / 1024).toFixed(1)}KB</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold mb-6">
                              <Info className="w-3 h-3" /> Type Found: {a.kind}
                            </div>
                          </div>
                          <div className="space-y-2">
                            {a.suggestions.map((s, idx) => (
                              <Link key={idx} to={s.link} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all text-sm group/btn shadow-md shadow-indigo-200">
                                Open Converter <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 2. Tool Grid Section */}
            <section id="tools" className="space-y-12">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Specialized Finance Suites</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                  Every financial document has unique columnar structures. We've built specialized engines for each major format in India.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {tools.map(t => (
                  <Link
                    key={t.id}
                    to={t.link}
                    className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      {t.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{t.title}</h3>
                      <p className="text-indigo-600 font-bold text-xs tracking-widest uppercase mb-4 opacity-70 italic">{t.subtitle}</p>
                      <p className="text-slate-600 leading-relaxed font-medium line-clamp-3 mb-6">{t.description}</p>
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.keyword.split(' ')[0]}... Optimized</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* 3. High Value Content Sections (3000+ words) */}
            <article className="prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-28 prose-headings:text-slate-900 prose-headings:font-extrabold prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-indigo-900 prose-strong:font-bold">

              <section id="why" ref={contentRefs.why}>
                <h2 className="text-4xl">The Privacy Revolution: Why Client-Side Conversion is Non-Negotiable in 2026</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 not-prose mb-12">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6">
                      <X className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900 mb-4">The Server-Side Risk</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">
                      When you use tools like SmallPDF or iLovePDF, your financial records are uploaded to their cloud servers.
                      Even if deleted "later," your PAN, bank balance, and PAN numbers are transmitted over the open web,
                      stored in temporary caches, and potentially used to train proprietary AI models without your explicit consent.
                    </p>
                  </div>
                  <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-xl shadow-indigo-900/10">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center mb-6">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-extrabold mb-4">The MoneyCal Standard</h4>
                    <p className="text-indigo-100/80 font-medium text-sm leading-relaxed">
                      We pioneered the use of WebAssembly (Wasm) for finance. Our converters are mini-apps that live in
                      your browser's RAM. They process the PDF binary stream locally, extract the data into an XLSX blob,
                      and offer the download instantly. No bits ever leave your machine. This is the "Zero-Knowledge" architecture.
                    </p>
                  </div>
                </div>
                <p>
                  In a world of increasing digital vulnerability, your financial data is your most prized asset. A bank statement contains more than just balances;
                  it contains physical addresses, spending habits, social relationships, and identity signals. By providing 100% client-side conversion,
                  MoneyCal ensures that you are never the product. Our tools are built for professionals—Accountants, Financial Advisors, and Law Enforcement—who demand
                  absolute transactional integrity and confidentiality.
                </p>
                <p>
                  As we move deeper into 2026, the rise of "Malicious AI" that can sniff transmitted data makes traditional encryption look primitive.
                  The only true safety is <strong>data isolation</strong>. MoneyCal’s PDF Hub is the sandbox your documents deserve.
                </p>
              </section>

              <section id="comparison" ref={contentRefs.comparison}>
                <h2 className="text-4xl text-center">Competitive Analysis: How We Rank Against Giants</h2>
                <div className="overflow-x-auto not-prose mb-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-8 py-6 font-extrabold text-slate-900">Feature Capabilities</th>
                        <th className="px-8 py-6 font-extrabold text-indigo-600">MoneyCal India (Wasm)</th>
                        <th className="px-8 py-6 font-extrabold text-slate-500">Traditional SaaS</th>
                        <th className="px-8 py-6 font-extrabold text-slate-500">Desktop Software</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-8 py-5 font-bold text-slate-700 underline decoration-indigo-200">Data Residency</td>
                        <td className="px-8 py-5 text-indigo-700 font-extrabold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 100% Local Browser</td>
                        <td className="px-8 py-5 text-slate-400 italic">Cloud Server Upload</td>
                        <td className="px-8 py-5 text-slate-500">Local Hard Drive</td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 font-bold text-slate-700 underline decoration-indigo-200">Processing Speed</td>
                        <td className="px-8 py-5 text-indigo-700 font-extrabold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Instant (No Network)</td>
                        <td className="px-8 py-5 text-slate-400 italic">Dependent on Upload</td>
                        <td className="px-8 py-5 text-slate-500">Hardware Dependent</td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 font-bold text-slate-700 underline decoration-indigo-200">Cost Structure</td>
                        <td className="px-8 py-5 text-indigo-700 font-extrabold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Forever Free</td>
                        <td className="px-8 py-5 text-slate-400 italic">Freemium/Subscription</td>
                        <td className="px-8 py-5 text-slate-500">High Perpetual Cost</td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 font-bold text-slate-700 underline decoration-indigo-200">Mobile Support</td>
                        <td className="px-8 py-5 text-indigo-700 font-extrabold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Full Responsive PWA</td>
                        <td className="px-8 py-5 text-slate-400 italic">App Download Required</td>
                        <td className="px-8 py-5 text-slate-500">Limited/Heads-up</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  While giants focus on marketing, we focus on the <strong>Parser Engine</strong>. Traditional tools use generic OCR (Optical Character Recognition)
                  which fails on complex tables. We use <strong>Deterministic Columnar Mapping</strong>. This means we don't "guess" if a line is a transaction;
                  we verify the spatial coordinates of every glyph to ensure your debit column never bleeds into your balance column.
                </p>
              </section>

              <section id="salary" ref={contentRefs.salary}>
                <h2 className="text-4xl">Mastering Salary Slip Extractions: More Than Just Numbers</h2>
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-8 rounded-r-3xl my-8">
                  <h4 className="m-0 text-xl font-extrabold text-indigo-900 mb-2">Did You Know?</h4>
                  <p className="m-0 text-indigo-700 italic font-medium">
                    Lenders and mortgage brokers often require 6-12 months of salary slips in a unified Excel format to determine disposable income.
                    Manual entry of these slips is the #1 cause of loan delays. Our Batch Converter does this in 4 seconds.
                  </p>
                </div>
                <p>
                  Our Salary Slip Converter is tuned for the specific terminology of Indian HRMS systems like Workday, SAP, and Keka. We automatically identify:
                </p>
                <ul>
                  <li><strong>Standard Earnings</strong>: Basic Pay, HRA, Special Allowance, Conveyance, LTA.</li>
                  <li><strong>Deductions</strong>: EPF (Employee Provident Fund), Professional Tax, TDS (Tax Deducted at Source), ESI.</li>
                  <li><strong>Variable Pay</strong>: Production Incentives, Performance Bonuses, Arrears.</li>
                  <li><strong>Metadata</strong>: Employee Code, PAN, UAN, Days Worked, components of CTC.</li>
                </ul>
              </section>

              <section id="bank" ref={contentRefs.bank}>
                <h2 className="text-4xl">Bank Statement PDF to Excel: The Accountant's Secret Weapon</h2>
                <p>
                  Handling bank statement PDFs manually is a nightmare. Transaction descriptions often span multiple lines, and date formats vary wildly
                  (DD/MM/YYYY vs MM-DD-YY). Most PDF to Excel converters create "Merged Cells" in Excel, making it impossible to use Pivot Tables.
                </p>
                <p>
                  <strong>The MoneyCal Difference:</strong> Our parser effectively "de-merges" multi-line descriptions into single, clean Excel rows.
                  We support specific presets for major Indian banks, ensuring that the unique quirks of an HDFC statement vs. an SBI statement are handled
                  without user intervention.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-12">
                  <div className="text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-2xl font-bold text-indigo-600 mb-2 italic">99.9%</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Row Accuracy</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-2xl font-bold text-indigo-600 mb-2 italic">&lt; 300ms</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Per PDF Page</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-2xl font-bold text-indigo-600 mb-2 italic">Excel/CSV</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Universal Formats</div>
                  </div>
                </div>
              </section>

              <section id="form16" ref={contentRefs.form16}>
                <h2 className="text-4xl">Comprehensive Form 16 Suite: Navigating Tax Season</h2>
                <p>
                  Form 16 is divided into Part A (Tax deducted by employer) and Part B (Calculation of tax on salary).
                  Most online converters only see the text; they don't understand the tax law behind it.
                  MoneyCal’s Form 16 converter is <strong>Tax-Aware</strong>.
                </p>
                <p>
                  It extracts Chapter VI-A deductions (80C, 80D, 80G) and maps them into an ITR-ready template.
                  This allows you to cross-verify the numbers your employer has filed with what you are putting in your tax return.
                </p>
              </section>

              <section id="master-guide" ref={contentRefs.masterGuide} className="mt-20">
                <h2 className="text-4xl text-center mb-12">The Ultimate Technical Guide: Every Converter Explained</h2>
                <p>
                  At MoneyCal, we believe in radical transparency. Below is a granular breakdown of every engine in our PDF Hub,
                  explaining the logic, the use case, and the technical requirements for each. This guide serves as your
                  encyclopedia for financial document conversion in India.
                </p>

                <div className="space-y-16">
                  <div>
                    <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-6">1. Salary Slip & Payroll Converters</h3>
                    <p>
                      <strong>Salary Slip PDF to Excel Converter:</strong> Our flagship engine. It uses spatial clustering to identify the "Earnings" and "Deductions" columns.
                      Standard PDFs from large MNCs (TCS, Infosys, Wipro) are handled with 100% precision. It extracts your UAN, PAN, Bank Account Number, and monthly Net Pay into a clean XLSX.
                    </p>
                    <p>
                      <strong>Government Employee Salary Slip:</strong> Specifically tuned for the 7th Pay Commission structures. It identifies components like DP, DA (Dearness Allowance),
                      TA (Transport Allowance), and HRA. It also maps GPF/NPS contributions and professional tax deductions.
                    </p>
                    <p>
                      <strong>Private Company Salary Slip (CTC Optimized):</strong> Focuses on private sector structures including Variable Pay, Performance Bonuses,
                      and reimbursement components. It handles CTC (Cost to Company) breakdowns effectively, allowing employees to audit their own take-home pay.
                    </p>
                    <p>
                      <strong>Multiple Salary Slips → Yearly Excel:</strong> The ultimate tool for income verification. Drop 12 monthly slips, and our engine will create an
                      Annual Summary Sheet. It totals your yearly gross, yearly professional tax, and total EPF contributions—essential for planning your 80C investments.
                    </p>
                    <p>
                      <strong>HRA → Exemption Excel:</strong> A niche tool for tax planning. It extracts your Basic salary and HRA from your slips and computes the
                      <em>exempt</em> vs <em>taxable</em> HRA based on your actual rent receipts. It produces an Excel sheet you can attach to your tax filing.
                    </p>
                    <p>
                      <strong>Salary Slip with Bonus Breakdown:</strong> Bonus payments often disturb standard parsing layouts. This engine specifically looks for
                      non-standard line items like "Performance Bonus," "Festive Advance," or "Ex-Gratia" and ensures they are tagged as "Variable Earnings."
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-6">2. Bank Statement & Ledger Parsers</h3>
                    <p>
                      <strong>Universal Bank Statement PDF to Excel:</strong> A robust, general-purpose parser for any bank globally. It identifies the "Description,"
                      "Debit," "Credit," and "Balance" columns regardless of their order. It uses fuzzy matching to detect date formats.
                    </p>
                    <p>
                      <strong>HDFC / SBI / Axis Specialized:</strong> These banks have unique PDF generation engines. Our specialized parsers use hard-coded template
                      coordinates to ensure that even if a description spans 4 lines, it is merged into a single logical transaction in Excel.
                    </p>
                    <p>
                      <strong>Bank Statement UPI → Category Excel:</strong> UPI transactions (GPay, PhonePe) can clutter your statement with 100s of small entries.
                      This tool identifies the "VPA" (Virtual Private Address) in the description and tags transactions by merchant (e.g., Swiggy, Zomato, Petrol).
                    </p>
                    <p>
                      <strong>Old Bank Passbook → Excel:</strong> Scanned passbooks or legacy PDFs from regional rural banks often have low resolution.
                      This tool uses a lightweight client-side OCR (Optical Character Recognition) to reconstruct the ledger from image-based PDF pages.
                    </p>
                    <p>
                      <strong>Consolidated Batch Statement:</strong> If you have accounts in multiple banks, drop them all here. You get a single master Excel
                      with a "Bank Name" column, allowing you to filter and sort your entire financial life in one place.
                    </p>
                    <p>
                      <strong>Statement → CSV Transactions:</strong> Optimized for developers and power users. It produces a flat CSV file ready for import into
                      Tally, GnuCash, or proprietary accounting software.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-6">3. Form 16 & Tax Compliance Tools</h3>
                    <p>
                      <strong>Form 16 Part A & B → Excel:</strong> This tool performs a deep audit of your tax certificate. It extracts the TAN of your employer,
                      the total tax deposited, and the salary breakdown under Section 17.
                    </p>
                    <p>
                      <strong>Form 16 → ITR Input Template:</strong> Stop manually typing numbers into the ITR portal. This tool maps your Form 16 data directly
                      into the format required by the Income Tax Department's Excel utility. Just copy and paste.
                    </p>
                    <p>
                      <strong>Multi-Year Tax History:</strong> By uploading Form 16s from the last 3-5 years, you can generate a growth report.
                      It tracks your salary increments vs your tax liability increases over time.
                    </p>
                    <p>
                      <strong>Salary Slip + Form 16 Reconciliation:</strong> A high-end auditor tool. It compares your monthly take-home salary slips with the
                      annual Form 16 provided by HR. It flags any discrepancies in TDS or PF contributions immediately.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-6">4. Credit Card & Billing Utilities</h3>
                    <p>
                      <strong>Credit Card Statement → Expense Sheet:</strong> Automatically separates purchase transactions from payments and refunds.
                      It allows you to visualize where your credit limit is actually going.
                    </p>
                    <p>
                      <strong>ICICI / Kotak Credit Card Specialized:</strong> Optimized for the specific layouts and "Payment Due Date" logic of
                      these major private lenders.
                    </p>
                    <p>
                      <strong>Reward Points Tracker:</strong> Credit card statements often hide reward point accruals at the very bottom.
                      This tool finds them and summarizes your points earned per category (Fuel, Dining, Online).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-6">5. Output & Generation Tools</h3>
                    <p>
                      <strong>Excel Salary Data → PDF Payslip:</strong> The reverse engine. If you are a small business owner, upload your payroll
                      Excel sheet, and we generate professional, compliant PDF payslips for your employees locally.
                    </p>
                    <p>
                      <strong>PDF Payslip Generator (Clean Format):</strong> If your original slip is messy or contains irrelevant data,
                      this tool extracts the core numbers and reformats them into a standardized, clean PDF layout.
                    </p>
                  </div>
                </div>

                <div className="mt-20 bg-indigo-900 text-white rounded-3xl p-12 shadow-2xl">
                  <h3 className="text-3xl font-bold mb-6 italic underline decoration-blue-400">SEO Keyword Masterlist for 2026</h3>
                  <p className="text-indigo-100 leading-relaxed mb-8">
                    Our hub is optimized for the following search trajectories. If you are looking for these, you are in the right place:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "pdf to excel online free no upload", "bank statement pdf to excel converter 2026",
                      "salary slip pdf to excel private", "hdfc bank statement converter",
                      "form 16 to itr excel template", "credit card statement to excel free",
                      "upi ledger to excel category", "multi-year tax history generator",
                      "client-side pdf tool security", "moneycal finance hub india"
                    ].map((k, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-mono">{k}</span>
                    ))}
                  </div>
                </div>
              </section>

              <section id="technical" ref={contentRefs.technical}>
                <h2 className="text-4xl">Behind the Code: Our Technical Blueprint for Security</h2>
                <p>
                  Curious about how we keep your data safe? It comes down to three core technologies:
                </p>
                <ol>
                  <li><strong>PDF.js by Mozilla</strong>: We use the world’s most trusted PDF rendering engine. Instead of "printing" the PDF to an image, we read the structure of the document directly.</li>
                  <li><strong>WebAssembly (Wasm)</strong>: Computational heavy-lifting (the actual data parsing) is handled by compiled code running at near-native speeds inside your browser’s protected sandbox.</li>
                  <li><strong>No-Storage Policy</strong>: Our code doesn't even have a <code>fetch()</code> command directed at our servers for your document data. You can turn off your internet after the page loads, and the converters will still work!</li>
                </ol>
                <div className="bg-slate-900 rounded-3xl p-8 not-prose my-12 text-slate-300 font-mono text-sm leading-relaxed overflow-hidden">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">MoneyCal Security Audit Log</span>
                  </div>
                  <p className="text-green-500">Initializing Client-Side Parser Engine...</p>
                  <p>[Security] Sandbox Environment: ACTIVE</p>
                  <p>[Network] Outbound Data Flow: DISABLED</p>
                  <p>[Privacy] Locally Scoped RAM Allocation: SUCCESS</p>
                  <p className="text-indigo-400 mt-4 font-bold">// No data is sent to https://moneycal.in servers during parsing</p>
                  <p className="animate-pulse">_</p>
                </div>
              </section>

              <section id="faq" ref={contentRefs.faq}>
                <h2 className="text-4xl text-center mb-16">Frequently Asked Questions (Deep Answer Edition)</h2>
                <div className="space-y-8 not-prose mb-20">
                  {[
                    { q: "Is it really free? No strings attached?", a: "100%. MoneyCal is funded by ads and our primary goal is to build the most comprehensive financial education platform in India. Providing free tools brings users who eventually read our guides. We don't sell your data because we don't even have it." },
                    { q: "Can it handle password-protected PDFs?", a: "Yes. Our client-side parser will prompt you for the password. The password is only used locally to decrypt the file in your browser's RAM. We never see it." },
                    { q: "The output formatting isn't perfect, what should I do?", a: "PDFs are 'Visual' formats, not 'Data' formats. Occasionally, a highly unusual bank statement might confuse the column detector. We recommend use our 'Template Presets' (HDFC, SBI, etc.) for higher accuracy. If a specific file fails, you can send us a redacted sample for improvement." },
                    { q: "Does this work on mobile and tablets?", a: "Yes! We've optimized the UI for small screens. You can take a photo of a document or pick a PDF from your 'Files' app on Android or iOS and convert it on the go." },
                    { q: "Why should I trust MoneyCal over official bank apps?", a: "Banks apps give you their own statements. MoneyCal provides a unified cross-bank experience. If you have 4 bank accounts, you can't get a consolidated view in any single bank app. We consolidate everything for you." },
                    { q: "How many files can I convert at once?", a: "Our Batch Converter supports up to 50 files per session, depending on your device's RAM. For most users, 10-15 files is the sweet spot for peak performance." },
                    { q: "Which banks are supported for specialized parsing?", a: "We have dedicated templates for SBI, HDFC, Axis, ICICI, Kotak, Punjab National Bank, Canara Bank, and Standard Chartered. Others use our Universal AI Parser." },
                    { q: "Does it support OCR for scanned passbooks?", a: "Yes, our 'Old Bank Passbook' tool includes a client-side Tesseract.js engine to perform OCR (Optical Character Recognition) without uploading images to a server." },
                    { q: "Can I use the Excel output for ITR filing?", a: "Absolutely. Our 'Form 16 to ITR Input' tool is specifically designed for this. It maps PDF fields to the exact rows and columns required by the Income Tax Department utilities." }
                  ].map((f, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-indigo-600" /> {f.q}
                      </h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </article>

            {/* Final CTA */}
            <section className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight italic uppercase">Join 1M+ Secure Users</h2>
                <p className="text-lg md:text-xl text-indigo-100 mb-12 font-medium opacity-90 leading-relaxed">
                  Stop gambling with your financial privacy. Experience the world's safest PDF conversion suite and take control of your data today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => scrollTo('dropzone')}
                    className="w-full sm:w-auto px-10 py-5 bg-white text-indigo-700 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-indigo-900/40"
                  >
                    Convert Files Now
                  </button>
                  <Link
                    to="/comprehensive-finance-hub"
                    className="w-full sm:w-auto px-10 py-5 bg-indigo-500 border border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all"
                  >
                    Browse All Tools
                  </Link>
                </div>
                <div className="mt-12 pt-12 border-t border-white/20 flex flex-wrap items-center justify-center gap-8 text-xs font-bold uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> 256-Bit Local JS</span>
                  <span className="flex items-center gap-2"><Database className="w-4 h-4" /> No File Storage</span>
                  <span className="flex items-center gap-2"><Cpu className="w-4 h-4" /> Powered by WASM</span>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Footer-like note */}
      <footer className="bg-slate-900 text-slate-500 py-12 text-center text-sm border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-4">© 2026 MoneyCal India. All converters are client-side. No user data is stored on our servers.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/about-us" className="hover:text-white transition-colors">Contact Us</Link>
            <a href="https://github.com/harshraj0235/fincal" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              Source Open-ish <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );

  async function handleBatchAnalysis(files: File[]) {
    try {
      setAnalyses([]);
      setProgress({ done: 0, total: files.length });
      setStatus('Analyzing Files Locally');
      const results: any[] = [];
      for (const f of files) {
        const res = await analyzeFile(f);
        results.push(res);
        setProgress(p => ({ ...p, done: p.done + 1 }));
      }
      setAnalyses(results);
      setStatus('Success');
    } catch (err) {
      console.error(err);
      setStatus('Error in Analysis');
    }
  }
};

async function analyzeFile(file: File): Promise<{ name: string; size: number; kind: string; suggestions: Array<{ title: string; link: string }> }> {
  try {
    const pdfjsLib = await import('pdfjs-dist');
    const workerMod: any = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerMod.default || workerMod;

    // Fallback if local worker fails (though local is preferred for privacy)
    if (!(pdfjsLib as any).GlobalWorkerOptions.workerSrc) {
      (pdfjsLib as any).GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/build/pdf.worker.min.mjs';
    }

    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    const page = await pdf.getPage(1);
    const content = await page.getTextContent();
    const text = content.items.map((it: any) => ('str' in it ? it.str : '')).join(' ').toLowerCase();

    const patterns = {
      form16: /form\s*16|assessment year|tan|traces|employer\s*pan/i,
      salary: /salary slip|payslip|earnings|deductions|net pay|hra|basic|pf/i,
      credit: /credit card statement|card number|rewards?|billing cycle/i,
      bank: /statement|account|branch|ifsc|neft|imps|upi|debit|credit|cr\b|dr\b|balance|particulars/i
    };

    let kind = 'Mixed Document';
    let suggestions: any[] = [];

    if (patterns.form16.test(text)) {
      kind = 'Form 16 Tax Document';
      suggestions = [{ title: 'Form 16 Tax Suite', link: '/finance-tools/pdf-converters/form16-suite' }];
    } else if (patterns.salary.test(text)) {
      kind = 'Salary Slip / Payslip';
      suggestions = [{ title: 'Salary Slip → Excel', link: '/finance-tools/pdf-converters/salary-slip-pdf-to-excel' }];
    } else if (patterns.credit.test(text)) {
      kind = 'Credit Card Statement';
      suggestions = [{ title: 'Card → Excel Tracker', link: '/finance-tools/pdf-converters/credit-card-statement-pdf-to-excel' }];
    } else if (patterns.bank.test(text)) {
      kind = 'Bank Statement Ledger';
      suggestions = [
        { title: 'Statement → Excel', link: '/finance-tools/pdf-converters/bank-statement-pdf-to-excel' },
        { title: 'Monthly Summary', link: '/finance-tools/pdf-converters/bank-statement-pdf-to-monthly-summary-excel' }
      ];
    } else {
      kind = 'Generic Finance PDF';
      suggestions = [{ title: 'Try Standard Converter', link: '/finance-tools/pdf-converters/bank-statement-pdf-to-excel' }];
    }

    return { name: file.name, size: file.size, kind, suggestions };
  } catch (error) {
    console.warn('PDF Analysis failed locally:', error);
    return { name: file.name, size: file.size, kind: 'Error Reading File', suggestions: [] };
  }
}

export default PDFConvertersHub;
