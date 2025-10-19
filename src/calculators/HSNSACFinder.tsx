import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Code, Tag, Filter, Download, ExternalLink, Info, CheckCircle, 
  AlertCircle, Package, Zap, TrendingUp, BookOpen, Target, Shield, 
  FileText, Layers, Award, Sparkles, ArrowRight, ChevronDown, ChevronUp,
  FileSpreadsheet, Grid, Clock, HelpCircle, BarChart3, Calculator,
  Briefcase, ShoppingCart, Building2, Truck
} from 'lucide-react';
import { hsnSacDatabase, searchHSNSAC, getAllCategories, getAllGSTRates, HSNSACItem } from '../data/hsnSacData';
import WhyChooseUs from '../components/WhyChooseUs';

export const HSNSACFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'All' | 'HSN' | 'SAC'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGSTRate, setSelectedGSTRate] = useState<string>('All');
  const [searchResults, setSearchResults] = useState<HSNSACItem[]>(hsnSacDatabase);
  const [categories, setCategories] = useState<string[]>([]);
  const [gstRates, setGstRates] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'finder' | 'guide' | 'learning'>('finder');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    setCategories(getAllCategories());
    setGstRates(getAllGSTRates());
  }, []);

  useEffect(() => {
    let results = searchHSNSAC(searchQuery);
    
    if (selectedType !== 'All') {
      results = results.filter(item => item.type === selectedType);
    }
    
    if (selectedCategory !== 'All') {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    if (selectedGSTRate !== 'All') {
      results = results.filter(item => item.gstRate === parseFloat(selectedGSTRate));
    }
    
    setSearchResults(results);
  }, [searchQuery, selectedType, selectedCategory, selectedGSTRate]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedCategory('All');
    setSelectedGSTRate('All');
  };

  const getRateColor = (rate: number) => {
    if (rate === 0) return 'bg-green-100 text-green-800';
    if (rate === 5) return 'bg-blue-100 text-blue-800';
    if (rate === 12) return 'bg-yellow-100 text-yellow-800';
    if (rate === 18) return 'bg-orange-100 text-orange-800';
    if (rate === 28) return 'bg-red-100 text-red-800';
    return 'bg-purple-100 text-purple-800';
  };

  const getRateBorderColor = (rate: number) => {
    if (rate === 0) return 'border-green-300';
    if (rate === 5) return 'border-blue-300';
    if (rate === 12) return 'border-yellow-300';
    if (rate === 18) return 'border-orange-300';
    if (rate === 28) return 'border-red-300';
    return 'border-purple-300';
  };

  const exportToCSV = () => {
    const csv = [
      ['Code', 'Type', 'Description', 'GST Rate', 'Category'],
      ...searchResults.map(item => [
        item.code,
        item.type,
        item.description,
        `${item.gstRate}%`,
        item.category
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hsn-sac-codes.csv';
    a.click();
  };

  const faqs = [
    {
      question: "What is HSN Code and SAC Code in GST? Complete Explanation 2025",
      answer: `<strong>HSN (Harmonized System of Nomenclature)</strong> is a 6-8 digit code used to classify goods under GST. <strong>SAC (Services Accounting Code)</strong> is a 6-digit code for classifying services.<br/><br/>
      <strong>Key Differences:</strong><br/>
      • HSN: For physical products/goods (e.g., 8517 for mobile phones)<br/>
      • SAC: For services only (e.g., 998314 for web design services)<br/>
      • HSN is globally standardized (used in 200+ countries)<br/>
      • SAC is India-specific classification<br/><br/>
      Both codes are mandatory on GST invoices based on business turnover. Use our <a href="https://moneycal.in/tools/gstr-1-deadline-calculator" class="text-blue-600 underline">GSTR-1 Calculator</a> for filing deadlines.`,
      keywords: "HSN code meaning, SAC code full form, difference between HSN and SAC, GST HSN code 2025"
    },
    {
      question: "How to find correct HSN/SAC code for my product or service?",
      answer: `<strong>Step-by-Step Method:</strong><br/><br/>
      <strong>1. Use Our Search Tool:</strong> Type product/service name in search box above - instant results!<br/>
      <strong>2. Browse by Category:</strong> Select category filter (e.g., Electronics, Food, IT Services)<br/>
      <strong>3. Check GST Rate:</strong> Filter by GST rate to narrow down options<br/>
      <strong>4. Official GST Portal:</strong> Visit <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">GST Portal <ExternalLink class="w-3 h-3 inline" /></a><br/>
      <strong>5. Consult Tax Professional:</strong> For ambiguous classifications<br/><br/>
      <strong>Pro Tip:</strong> Use the first 4 digits for general classification, 6 digits for specific items. Calculate GST using our <a href="https://moneycal.in/tools/gst-amount-calculator" class="text-blue-600 underline">GST Calculator</a>.`,
      keywords: "how to find HSN code, HSN code finder online, search SAC code, product HSN lookup"
    },
    {
      question: "Is HSN/SAC code mandatory on GST invoice in 2025? Latest Rules",
      answer: `<strong>Yes!</strong> HSN/SAC codes are mandatory based on your turnover:<br/><br/>
      <strong>Turnover-wise Requirements (FY 2024-25):</strong><br/>
      • <strong>Above ₹5 Crore:</strong> 6-digit HSN/SAC mandatory<br/>
      • <strong>₹1.5 to ₹5 Crore:</strong> 4-digit HSN/SAC mandatory<br/>
      • <strong>Below ₹1.5 Crore:</strong> Optional (but recommended)<br/>
      • <strong>Exports:</strong> 8-digit HSN mandatory (all turnovers)<br/><br/>
      <strong>Penalty for Wrong Code:</strong><br/>
      • Notice under Section 74 (wrong classification)<br/>
      • Interest on tax differential<br/>
      • Penalty up to 100% of tax amount<br/><br/>
      File correctly using our <a href="https://moneycal.in/tools/gstr-3b-deadline-calculator" class="text-blue-600 underline">GSTR-3B Calculator</a>.`,
      keywords: "HSN code mandatory 2025, GST invoice HSN requirement, 4 digit or 6 digit HSN, turnover wise HSN rules"
    },
    {
      question: "What are the GST rates for different HSN/SAC codes?",
      answer: `GST in India has <strong>5 tax slabs</strong> based on HSN/SAC classification:<br/><br/>
      <strong>0% GST (Nil Rate):</strong><br/>
      • Essential goods: Fresh vegetables, fruits, milk, grains<br/>
      • Educational services, healthcare<br/>
      • Example HSN: 0701 (Potatoes), 0401 (Fresh milk)<br/><br/>
      <strong>5% GST (Low Rate):</strong><br/>
      • Processed foods, tea, coffee, medicines<br/>
      • Transport services, small restaurants<br/>
      • Example HSN: 0402 (Milk powder), 0901 (Coffee)<br/><br/>
      <strong>12% GST (Standard Rate 1):</strong><br/>
      • Butter, ghee, mobile phones (below ₹25,000)<br/>
      • Business class air tickets<br/>
      • Example HSN: 0405 (Butter), 8517 (Phones)<br/><br/>
      <strong>18% GST (Standard Rate 2):</strong><br/>
      • Most goods & services (default rate)<br/>
      • IT services, hair oil, soaps<br/>
      • Example HSN: 8471 (Computers), SAC: 998314 (IT services)<br/><br/>
      <strong>28% GST (Highest Rate):</strong><br/>
      • Luxury items: Cars, tobacco, aerated drinks<br/>
      • Pan masala, luxury hotels<br/>
      • Example HSN: 8703 (Cars), 2106 (Soft drinks)<br/><br/>
      Use our <a href="https://moneycal.in/tools/gst-slab-calculator" class="text-blue-600 underline">GST Slab Calculator</a> for detailed breakup.`,
      keywords: "GST rate slab, HSN wise GST rate, 0% 5% 12% 18% 28% GST items, GST rate list 2025"
    },
    {
      question: "How to use HSN code for GST return filing? Step-by-step guide",
      answer: `<strong>Complete Filing Process:</strong><br/><br/>
      <strong>Step 1: Identify Correct Codes</strong><br/>
      • Use our finder tool to get accurate HSN/SAC codes<br/>
      • Maintain master list of all products/services you sell<br/>
      • Update codes when launching new products<br/><br/>
      <strong>Step 2: Invoice Generation</strong><br/>
      • Include HSN/SAC in every GST invoice<br/>
      • Mention 4 or 6 digits based on turnover<br/>
      • Use invoicing software with HSN auto-fill<br/><br/>
      <strong>Step 3: GSTR-1 Filing</strong><br/>
      • Table 12: HSN-wise summary of outward supplies<br/>
      • Group invoices by HSN code<br/>
      • Report quantity, value, taxable value, and tax amount<br/>
      • File before <a href="https://moneycal.in/tools/gstr-1-deadline-calculator" class="text-blue-600 underline">GSTR-1 deadline</a><br/><br/>
      <strong>Step 4: GSTR-3B Reconciliation</strong><br/>
      • Match HSN totals with GSTR-3B figures<br/>
      • Correct mismatches before final submission<br/><br/>
      <strong>Step 5: Annual Return (GSTR-9)</strong><br/>
      • Table 11: HSN-wise summary (annual)<br/>
      • Complete reconciliation required<br/><br/>
      <strong>Common Mistakes to Avoid:</strong><br/>
      • Using outdated HSN codes<br/>
      • Mixing HSN and SAC (goods vs services)<br/>
      • Wrong digit count (4 vs 6)<br/>
      • Incorrect GST rate mapping`,
      keywords: "HSN code in GSTR 1, how to file GST return, GSTR 1 Table 12, HSN summary filing"
    },
    {
      question: "What happens if I use wrong HSN/SAC code on invoice?",
      answer: `<strong>Consequences of Wrong HSN/SAC Code:</strong><br/><br/>
      <strong>1. GST Rate Mismatch:</strong><br/>
      • If wrong code leads to wrong GST rate charged<br/>
      • Tax department may issue demand notice<br/>
      • Pay differential tax + interest @ 18% per annum<br/><br/>
      <strong>2. ITC Denial to Buyer:</strong><br/>
      • Buyer's Input Tax Credit may be rejected<br/>
      • Creates liability for your customer<br/>
      • Damages business relationships<br/><br/>
      <strong>3. Penalties:</strong><br/>
      • Section 74: Penalty up to 100% of tax differential (for fraud)<br/>
      • Section 73: Penalty up to 10% (for genuine mistakes)<br/>
      • Example: If ₹10,000 tax short paid, penalty can be ₹1,000-₹10,000<br/><br/>
      <strong>4. GST Notices:</strong><br/>
      • SCN (Show Cause Notice) from department<br/>
      • Time-consuming explanation required<br/>
      • May lead to audit/investigation<br/><br/>
      <strong>How to Rectify:</strong><br/>
      • Issue credit note for wrong invoice<br/>
      • Issue fresh invoice with correct HSN<br/>
      • Report in next GSTR-1<br/>
      • Inform buyer immediately<br/><br/>
      <strong>Prevention:</strong> Use verified database like ours + calculate GST accurately with our <a href="https://moneycal.in/tools/gst-amount-calculator" class="text-blue-600 underline">GST Calculator</a>.`,
      keywords: "wrong HSN code penalty, HSN code mistake consequences, how to correct HSN code, GST notice for wrong HSN"
    },
    {
      question: "HSN code for mobile phones, laptops, and electronics in 2025",
      answer: `<strong>Complete Electronics HSN Codes List:</strong><br/><br/>
      <strong>Mobile Phones & Smartphones:</strong><br/>
      • HSN: <strong>8517</strong> (Telephonic apparatus)<br/>
      • GST Rate: 12% (below ₹25,000) or 18% (above ₹25,000)<br/>
      • Includes: Feature phones, smartphones, satellite phones<br/><br/>
      <strong>Laptops & Computers:</strong><br/>
      • HSN: <strong>8471</strong> (Automatic data processing machines)<br/>
      • GST Rate: 18%<br/>
      • Includes: Desktops, laptops, tablets, servers<br/><br/>
      <strong>Computer Accessories:</strong><br/>
      • Mouse, Keyboard: 8471 - 18% GST<br/>
      • Monitor: 8528 - 18% GST<br/>
      • Printer: 8443 - 18% GST<br/>
      • Webcam: 8525 - 18% GST<br/><br/>
      <strong>TV & Audio:</strong><br/>
      • LED TV: 8528 - 28% GST<br/>
      • Headphones: 8518 - 18% GST<br/>
      • Speakers: 8518 - 18% GST<br/><br/>
      <strong>Home Appliances:</strong><br/>
      • Refrigerator: 8418 - 28% GST<br/>
      • Air Conditioner: 8415 - 28% GST<br/>
      • Washing Machine: 8450 - 28% GST<br/>
      • Microwave: 8516 - 18% GST<br/><br/>
      Search any electronic item in our tool above for instant HSN code!`,
      keywords: "mobile phone HSN code, laptop HSN code 8471, electronics HSN codes, TV HSN code, computer HSN"
    },
    {
      question: "SAC codes for IT services, consulting, and professional services",
      answer: `<strong>Complete SAC Codes for Services:</strong><br/><br/>
      <strong>IT & Software Services:</strong><br/>
      • SAC: <strong>998314</strong> - Website design & development<br/>
      • SAC: <strong>998313</strong> - Software development<br/>
      • SAC: <strong>998315</strong> - Data processing services<br/>
      • SAC: <strong>998316</strong> - IT consulting<br/>
      • GST Rate: 18% (all IT services)<br/><br/>
      <strong>Consulting Services:</strong><br/>
      • SAC: <strong>998212</strong> - Management consulting<br/>
      • SAC: <strong>998213</strong> - Financial consulting<br/>
      • SAC: <strong>998214</strong> - Marketing consulting<br/>
      • GST Rate: 18%<br/><br/>
      <strong>Professional Services:</strong><br/>
      • Legal: 998211 - 18% GST<br/>
      • Accounting: 998221 - 18% GST<br/>
      • Architecture: 998231 - 18% GST<br/>
      • Engineering: 998232 - 18% GST<br/><br/>
      <strong>Digital Marketing:</strong><br/>
      • SAC: 998399 - Advertising services<br/>
      • GST Rate: 18%<br/>
      • Includes: SEO, social media, content marketing<br/><br/>
      <strong>Education & Training:</strong><br/>
      • SAC: 999293 - Training services<br/>
      • GST Rate: 18% (commercial) or 0% (academic institutions)<br/><br/>
      Use our <a href="https://moneycal.in/tools/reverse-gst-calculator" class="text-blue-600 underline">Reverse GST Calculator</a> to find base price from GST-inclusive amount.`,
      keywords: "SAC code for IT services, software development SAC, consulting SAC code, professional services SAC"
    },
    {
      question: "How to download complete HSN/SAC code list with GST rates PDF?",
      answer: `<strong>Multiple Ways to Get Complete HSN/SAC List:</strong><br/><br/>
      <strong>Method 1: Our Tool (Easiest)</strong><br/>
      • Use our finder above to search any product/service<br/>
      • Click "Export to CSV" button to download current results<br/>
      • Filter by category/GST rate before export<br/>
      • Import CSV into Excel for offline reference<br/><br/>
      <strong>Method 2: Official GST Portal</strong><br/>
      • Visit <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">GST India Portal</a><br/>
      • Go to "Services" > "Download HSN Code"<br/>
      • Get chapter-wise HSN codes (8-digit)<br/>
      • SAC codes available under "Services" section<br/><br/>
      <strong>Method 3: CBIC Website</strong><br/>
      • <a href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">CBIC Official Site</a><br/>
      • Download GST rate schedule PDFs<br/>
      • Includes all HSN with current rates<br/><br/>
      <strong>Method 4: Excel Database</strong><br/>
      • Download from unofficial sources (use with caution)<br/>
      • Verify codes before use in invoices<br/><br/>
      <strong>What You Get:</strong><br/>
      • Complete 6-8 digit HSN codes (goods)<br/>
      • Complete 6-digit SAC codes (services)<br/>
      • GST rate for each code<br/>
      • Description and examples<br/>
      • Effective date of rates<br/><br/>
      <strong>Update Frequency:</strong> GST rates change quarterly. Always use latest database. Bookmark our tool for real-time access!`,
      keywords: "HSN code PDF download, complete HSN list, SAC code list download, GST rate schedule PDF"
    },
    {
      question: "Export HSN codes: 8-digit requirement and customs classification",
      answer: `<strong>Special Rules for Export Invoices:</strong><br/><br/>
      <strong>8-Digit HSN Mandatory:</strong><br/>
      • All export invoices require 8-digit HSN (regardless of turnover)<br/>
      • Required for customs clearance<br/>
      • Used for export benefits/drawback calculation<br/><br/>
      <strong>How to Get 8-Digit HSN:</strong><br/>
      • Start with 6-digit from our database<br/>
      • Add 2 more digits for detailed classification<br/>
      • Example: 8517 (mobile phones) → 85171200 (smartphones)<br/>
      • Refer to ITC HS Codes 2022 (latest edition)<br/><br/>
      <strong>Export Benefits:</strong><br/>
      • Correct HSN ensures maximum duty drawback<br/>
      • Required for RoDTEP scheme benefits<br/>
      • Needed for MEIS/SEIS (if applicable)<br/><br/>
      <strong>Customs Issues:</strong><br/>
      • Wrong HSN can lead to shipment detention<br/>
      • May attract higher customs duty (import side)<br/>
      • Delays in clearance<br/><br/>
      <strong>Resources:</strong><br/>
      • DGFT website for ITC HS codes<br/>
      • Customs tariff book<br/>
      • Consult customs broker for ambiguous products<br/><br/>
      Calculate export GST using our <a href="https://moneycal.in/tools/gst-liability-calculator" class="text-blue-600 underline">GST Liability Calculator</a>.`,
      keywords: "8 digit HSN for export, export invoice HSN code, customs HSN classification, ITC HS code"
    }
  ];

  const learningContent = [
    {
      title: "Complete Guide to HSN Classification System",
      icon: BookOpen,
      content: `The Harmonized System of Nomenclature (HSN) is a globally accepted product classification system developed by the World Customs Organization (WCO). India adopted HSN for GST to align with international trade standards.

      <strong>HSN Structure:</strong>
      • First 2 digits: Chapter (e.g., 85 = Electrical machinery)
      • Next 2 digits: Heading (e.g., 8517 = Telephone apparatus)
      • Next 2 digits: Sub-heading (e.g., 851712 = Smartphones)
      • Last 2 digits: Tariff item (e.g., 85171200 = Specific smartphone type)

      <strong>Benefits of HSN System:</strong>
      • Uniform classification across 200+ countries
      • Simplifies international trade
      • Reduces tax evasion through standardization
      • Easy comparison of tax rates globally
      • Automated invoice generation
      • Faster GST return filing

      <strong>How India Uses HSN:</strong>
      India uses 8-digit HSN codes for customs (export/import) and 6-digit codes for domestic GST. Small businesses with turnover below ₹1.5 crore can use 4 digits, but 6 digits is recommended for clarity.`
    },
    {
      title: "Understanding SAC (Services Accounting Code)",
      icon: Layers,
      content: `SAC is a classification system specifically for services, introduced in India for GST implementation. Unlike HSN (which is global), SAC is an India-specific coding system.

      <strong>SAC Structure:</strong>
      • 6-digit code (e.g., 998314 for website design)
      • First 2 digits: Major service category
      • Next 2 digits: Service heading
      • Last 2 digits: Specific service type

      <strong>Major SAC Categories:</strong>
      • 99 = Services (prefix for all service codes)
      • 9982 = Business services
      • 9983 = IT & software services
      • 9984 = Telecommunication services
      • 9985 = Financial services
      • 9992 = Education & training
      • 9993 = Healthcare services
      • 9996 = Recreational services

      <strong>Common SAC Examples:</strong>
      • 998314 - Website design (18% GST)
      • 998313 - Software development (18% GST)
      • 998212 - Management consulting (18% GST)
      • 996511 - Restaurant services (5% GST)
      • 997212 - Courier services (18% GST)

      <strong>Why SAC Matters:</strong>
      Service providers must mention SAC on invoices based on their turnover (same rules as HSN). Correct SAC ensures proper GST rate application and avoids disputes with tax authorities.`
    },
    {
      title: "GST Rate Slabs Explained - Which Products Fall Where?",
      icon: BarChart3,
      content: `India's GST system has 5 main rate slabs. Understanding which products fall under which slab is crucial for compliance.

      <strong>0% GST (Nil-Rated Goods):</strong>
      • Essential food items: Vegetables, fruits, milk, bread
      • Educational services (by recognized institutions)
      • Healthcare services
      • Agricultural products: Seeds, grains, raw meat
      • Rationale: Keep essentials affordable for all citizens

      <strong>5% GST (Low Rate):</strong>
      • Processed foods: Milk powder, curd, cheese
      • Medicines and drugs
      • Domestic LPG, coal
      • Transport services (excluding AC)
      • Small restaurants (turnover < ₹1.5 crore)
      • Rationale: Semi-essential items

      <strong>12% GST (Standard Rate 1):</strong>
      • Butter, ghee, dry fruits
      • Mobile phones (below ₹25,000)
      • Business class air tickets
      • Computers and laptops (proposed reduction)
      • Rationale: Moderately necessary items

      <strong>18% GST (Standard Rate 2):</strong>
      • Most manufactured goods (default rate)
      • Hair oil, soaps, toothpaste
      • Capital goods, industrial machinery
      • IT services, consulting
      • Restaurants (AC with alcohol license)
      • Rationale: Standard taxation for most goods/services

      <strong>28% GST (Luxury & Sin Goods):</strong>
      • Luxury cars (above ₹10 lakh)
      • Tobacco products, cigarettes
      • Aerated drinks, energy drinks
      • Pan masala, gutka
      • High-end cosmetics
      • Premium hotels (room tariff > ₹7,500)
      • Rationale: Discourage consumption + revenue from luxury

      <strong>Cess (Additional Tax):</strong>
      On top of 28% GST, additional cess applies on:
      • Luxury cars: 1-22% cess
      • Tobacco: 5-290% cess
      • Coal: ₹400 per ton cess
      • Aerated drinks: 12% cess

      Use our HSN finder above to check GST rate for any specific product!`
    },
    {
      title: "How to File HSN Summary in GSTR-1: Step-by-Step",
      icon: FileText,
      content: `HSN summary in GSTR-1 (Table 12) is mandatory for businesses based on turnover. Here's the complete process:

      <strong>Who Must File HSN Summary?</strong>
      • All registered taxpayers filing GSTR-1
      • 4-digit HSN: Turnover ₹1.5-5 crore
      • 6-digit HSN: Turnover above ₹5 crore
      • Optional but recommended: Below ₹1.5 crore

      <strong>Step-by-Step Filing Process:</strong>

      <strong>Step 1: Prepare Data</strong>
      • Collect all invoices for the month/quarter
      • Group by HSN/SAC code
      • Calculate total quantity sold per HSN
      • Calculate total taxable value per HSN
      • Note the GST rate for each HSN

      <strong>Step 2: Login to GST Portal</strong>
      • Go to www.gst.gov.in
      • Login with GSTIN credentials
      • Navigate to Returns > GSTR-1

      <strong>Step 3: Fill Table 12 (HSN Summary)</strong>
      • Click "Table 12 - HSN Summary of Outward Supplies"
      • Select HSN code from dropdown or type manually
      • Enter Description (auto-filled usually)
      • Enter UQC (Unit Quantity Code) - e.g., NOS, KGS, LTR
      • Enter Total Quantity sold
      • Enter Total Taxable Value (before GST)
      • Enter Integrated Tax (IGST) if applicable
      • Enter Central Tax (CGST)
      • Enter State/UT Tax (SGST/UTGST)
      • Enter Cess (if applicable)
      • Click "Save"

      <strong>Step 4: Verify & Submit</strong>
      • Review all HSN entries
      • Cross-verify totals with other GSTR-1 tables
      • Check for arithmetic errors
      • Click "Submit" when satisfied

      <strong>Common Mistakes to Avoid:</strong>
      • Wrong digit count (using 4 when 6 required)
      • Incorrect UQC (using wrong unit)
      • Mismatched totals (HSN total ≠ Invoice total)
      • Missing HSN for high-value items
      • Using goods HSN for services (or vice versa)

      <strong>Pro Tips:</strong>
      • Use accounting software with HSN auto-summary
      • Maintain HSN master database
      • Regularly update HSN codes for new products
      • Reconcile HSN summary with GSTR-3B before filing

      Missed deadline? Check penalty using our <a href="https://moneycal.in/tools/gstr-1-deadline-calculator" class="text-blue-600 underline">GSTR-1 Calculator</a>.`
    },
    {
      title: "Real-World Business Scenarios: Choosing Right HSN/SAC",
      icon: Briefcase,
      content: `Let's understand HSN/SAC selection through practical business examples:

      <strong>Scenario 1: E-commerce Seller</strong>
      Business: Selling mobile accessories online
      Challenge: Multiple products with different HSN codes

      Products & HSN Codes:
      • Mobile back covers: HSN 3926 (Plastic articles) - 18% GST
      • Tempered glass: HSN 7007 (Safety glass) - 18% GST
      • Chargers: HSN 8504 (Electrical transformers) - 18% GST
      • Earphones: HSN 8518 (Audio equipment) - 18% GST
      • Mobile phones: HSN 8517 - 12%/18% GST based on price

      Solution: Maintain HSN master list in inventory system. Auto-populate on invoices.

      <strong>Scenario 2: Restaurant Owner</strong>
      Business: Running AC restaurant with bar license
      Challenge: Mixed supply of goods + services

      Classification:
      • Restaurant service (with alcohol): SAC 996334 - 18% GST
      • Restaurant service (without alcohol, AC): SAC 996331 - 5% GST
      • Home delivery: SAC 996331 - 5% GST
      • Outdoor catering: SAC 996332 - 18% GST

      Note: Cannot claim ITC on food inputs, but can on capital goods.

      <strong>Scenario 3: Software Company</strong>
      Business: Providing software development + cloud hosting
      Challenge: Multiple service types

      Services & SAC Codes:
      • Custom software development: SAC 998313 - 18% GST
      • Website design: SAC 998314 - 18% GST
      • Cloud hosting: SAC 997331 - 18% GST
      • IT consulting: SAC 998316 - 18% GST
      • Software training: SAC 999293 - 18% GST

      Export Services: 0% GST (with LUT) but SAC still mandatory.

      <strong>Scenario 4: Manufacturing Unit</strong>
      Business: Manufacturing plastic containers
      Challenge: Raw material vs finished goods classification

      Raw Materials (Purchases):
      • Plastic granules: HSN 3901 - 18% GST (can claim ITC)
      • Colorants: HSN 3204 - 18% GST (can claim ITC)
      • Packing boxes: HSN 4819 - 18% GST (can claim ITC)

      Finished Goods (Sales):
      • Food storage containers: HSN 3923 - 18% GST
      • Industrial containers: HSN 3925 - 18% GST

      ITC Calculation: Use <a href="https://moneycal.in/tools/itc-eligibility-checker" class="text-blue-600 underline">ITC Eligibility Checker</a>.

      <strong>Scenario 5: Freelance Consultant</strong>
      Business: Management consulting (sole proprietor)
      Turnover: ₹18 lakhs/year

      HSN Requirements:
      • Turnover below ₹1.5 crore: SAC optional on invoices
      • But still required in GSTR-1 Table 12
      • Use SAC 998212 - Management consulting (18% GST)

      Recommendation: Include SAC on all invoices to avoid future complications when business grows.

      <strong>Key Learnings:</strong>
      • Always classify at the time of business setup
      • Review HSN/SAC annually for new products
      • Consult CA for ambiguous cases
      • Use consistent codes across all platforms
      • Train accounts team on correct usage`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      {/* Premium Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-20 px-4"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
              <Package className="w-20 h-20" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            GST HSN & SAC Code Finder 2025-2026<br/>
            <span className="text-yellow-300">Free Online Search Tool with 1000+ Codes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-8 leading-relaxed">
            Instantly find correct HSN codes for goods and SAC codes for services. Complete database with GST rates, 
            descriptions, examples, and filing guidance. Perfect for GSTR-1, invoices, and GST returns.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>1000+ HSN/SAC Codes</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Instant Search</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>100% Accurate</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Export to CSV</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://www.gst.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-8 py-4 bg-white text-cyan-700 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
            >
              Official GST Portal <ExternalLink className="w-5 h-5 ml-2" />
            </motion.a>
            <motion.button
              onClick={exportToCSV}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all"
            >
              <Download className="w-5 h-5 mr-2" /> Download Database
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-wrap gap-2">
          {[
            { id: 'finder', label: 'HSN/SAC Finder', icon: Search },
            { id: 'guide', label: 'Complete Guide', icon: BookOpen },
            { id: 'learning', label: 'Learning Center', icon: Award }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 min-w-[160px] py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'finder' && (
            <motion.div
              key="finder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
                {/* Search Bar */}
                <div className="mb-6">
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    🔍 Search HSN/SAC Code by Product or Service Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type product name (e.g., 'mobile phone', 'laptop', 'consulting') or code (e.g., '8517')..."
                      className="w-full pl-14 pr-4 py-5 text-lg border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 transition-all"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    💡 <strong>Pro Tip:</strong> Search by product name, HSN code, SAC code, or category. 
                    Example: "mobile", "8517", "IT services", "dairy products"
                  </p>
                </div>

                {/* Filter Toggle Button */}
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  whileHover={{ scale: 1.02 }}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 mb-4"
                >
                  <Filter className="w-5 h-5" />
                  {showFilters ? 'Hide Filters' : 'Show Advanced Filters'}
                  {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </motion.button>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                        {/* Type Filter */}
                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">
                            Filter by Type
                          </label>
                          <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value as any)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                          >
                            <option value="All">All (HSN + SAC)</option>
                            <option value="HSN">HSN (Goods) Only</option>
                            <option value="SAC">SAC (Services) Only</option>
                          </select>
                        </div>

                        {/* Category Filter */}
                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">
                            Filter by Category
                          </label>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                          >
                            <option value="All">All Categories</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        {/* GST Rate Filter */}
                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">
                            Filter by GST Rate
                          </label>
                          <select
                            value={selectedGSTRate}
                            onChange={(e) => setSelectedGSTRate(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                          >
                            <option value="All">All GST Rates</option>
                            {gstRates.map((rate) => (
                              <option key={rate} value={rate}>{rate}% GST</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <button
                          onClick={clearFilters}
                          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                        >
                          Clear All Filters
                        </button>
                        <div className="text-sm text-gray-600">
                          Found <strong className="text-cyan-700 text-lg">{searchResults.length}</strong> results
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Results Count and Export */}
              {searchResults.length > 0 && (
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xl font-bold text-gray-900">
                    📊 Showing {searchResults.length} HSN/SAC Code{searchResults.length > 1 ? 's' : ''}
                  </div>
                  {searchResults.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={exportToCSV}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Export to CSV
                    </motion.button>
                  )}
                </div>
              )}

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <AnimatePresence>
                  {searchResults.map((item, index) => (
                    <motion.div
                      key={`${item.code}-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 ${getRateBorderColor(item.gstRate)}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className={`px-4 py-2 rounded-xl font-bold text-base ${
                            item.type === 'HSN' ? 'bg-cyan-100 text-cyan-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {item.type}
                          </div>
                          <div className="text-sm text-gray-600 font-medium">{item.category}</div>
                        </div>
                        <div className={`px-4 py-2 rounded-full font-bold text-base ${getRateColor(item.gstRate)}`}>
                          {item.gstRate}% GST
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center mb-3">
                          <Code className="w-5 h-5 text-cyan-700 mr-2" />
                          <span className="font-mono font-bold text-2xl text-cyan-800">{item.code}</span>
                        </div>
                        <h3 className="text-gray-900 font-bold text-lg mb-3 leading-tight">{item.description}</h3>
                        {item.examples && item.examples.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.examples.map((example, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                                {example}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-600 flex items-center font-medium">
                          <Tag className="w-4 h-4 mr-1" />
                          {item.type === 'HSN' ? 'For Goods' : 'For Services'}
                        </span>
                        <span className={`text-sm font-bold ${getRateColor(item.gstRate)}`}>
                          Rate: {item.gstRate}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* No Results */}
              {searchResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white rounded-2xl shadow-xl"
                >
                  <AlertCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">No HSN/SAC Codes Found</h3>
                  <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
                    Try adjusting your search or filters. You can search by product name, service name, or code number.
                    Our database includes 1000+ codes covering all major categories.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg"
                  >
                    Clear All Filters & Show All Codes
                  </button>
                </motion.div>
              )}

              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-6">
                  <Info className="w-8 h-8 mr-3 text-cyan-700" />
                  Understanding HSN & SAC Codes in GST
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                      <Code className="w-6 h-6 mr-2 text-cyan-700" />
                      What is HSN Code?
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      <strong>HSN (Harmonized System of Nomenclature)</strong> is a 6-8 digit internationally standardized 
                      system for classifying traded products. Developed by the World Customs Organization (WCO), 
                      India uses HSN codes for GST on all physical goods and products.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Purpose:</strong> Uniform classification of goods globally</li>
                      <li><strong>Usage:</strong> Mandatory on GST invoices (based on turnover)</li>
                      <li><strong>Structure:</strong> 2 digits (chapter) + 2 (heading) + 2 (sub-heading)</li>
                      <li><strong>GST Rates:</strong> Each HSN has specific GST rate (0%, 5%, 12%, 18%, 28%)</li>
                      <li><strong>Benefits:</strong> Simplifies tax filing, reduces errors, enables automation</li>
                    </ul>
                    <div className="mt-4 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                      <p className="text-sm text-cyan-900 font-medium">
                        <strong>Example:</strong> HSN 8517 = Telephone apparatus (includes smartphones, landlines)
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                      <Tag className="w-6 h-6 mr-2 text-purple-700" />
                      What is SAC Code?
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      <strong>SAC (Services Accounting Code)</strong> is a 6-digit classification system specifically for 
                      services under GST. Unlike HSN (global system), SAC is India-specific and covers all service categories 
                      from IT to hospitality.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Purpose:</strong> Classify services for GST taxation</li>
                      <li><strong>Usage:</strong> Required on all service invoices</li>
                      <li><strong>Structure:</strong> 6-digit code (e.g., 998314 for website design)</li>
                      <li><strong>GST Rates:</strong> Mostly 5%, 12%, 18% (few at 28%)</li>
                      <li><strong>Scope:</strong> Covers IT, consulting, transport, hospitality, education, healthcare</li>
                    </ul>
                    <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <p className="text-sm text-purple-900 font-medium">
                        <strong>Example:</strong> SAC 998313 = Software development services (18% GST)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                  <h4 className="font-bold text-lg text-cyan-900 mb-3">📋 Turnover-based HSN/SAC Requirements (FY 2024-25):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-gray-900">Above ₹5 Crore</p>
                          <p className="text-sm text-gray-600">6-digit HSN/SAC mandatory on all invoices</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-gray-900">₹1.5 to ₹5 Crore</p>
                          <p className="text-sm text-gray-600">4-digit HSN/SAC mandatory</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-purple-600 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-gray-900">Below ₹1.5 Crore</p>
                          <p className="text-sm text-gray-600">Optional (but recommended for clarity)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-cyan-900">
                    <strong>Note:</strong> For <strong>exports</strong>, 8-digit HSN is mandatory regardless of turnover. 
                    HSN summary in GSTR-1 (Table 12) is mandatory for all taxpayers based on above criteria.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Complete FAQs */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-4xl font-bold text-gray-900 flex items-center mb-6">
                  <HelpCircle className="w-10 h-10 mr-3 text-cyan-700" />
                  Complete HSN/SAC Guide - 10 Most Asked Questions (2025)
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                    >
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        className="w-full px-6 py-5 text-left flex items-start justify-between bg-gradient-to-r from-gray-50 to-blue-50 hover:from-cyan-50 hover:to-blue-100 transition-colors"
                      >
                        <div className="flex items-start flex-1 pr-4">
                          <span className="bg-cyan-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm">
                            {index + 1}
                          </span>
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">{faq.question}</h3>
                        </div>
                        {expandedFAQ === index ? (
                          <ChevronUp className="w-6 h-6 text-cyan-700 flex-shrink-0 mt-1" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFAQ === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-6 bg-white border-t-2 border-gray-100">
                              <div 
                                className="text-gray-700 leading-relaxed prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: faq.answer }} 
                              />
                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="text-xs font-semibold text-gray-600">🏷️ Related Keywords:</span>
                                {faq.keywords.split(', ').map((keyword, kidx) => (
                                  <span key={kidx} className="text-xs bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full font-medium">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Reference Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl shadow-2xl p-8"
                >
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Target className="w-7 h-7 mr-3" />
                    Quick HSN Examples
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>8517:</strong> Mobile phones, smartphones</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>8471:</strong> Computers, laptops, tablets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>0402:</strong> Milk powder, condensed milk</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>3004:</strong> Medicaments, medicines</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>8703:</strong> Motor cars, vehicles</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl shadow-2xl p-8"
                >
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Award className="w-7 h-7 mr-3" />
                    Quick SAC Examples
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>998314:</strong> Website design services</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>998313:</strong> Software development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>998212:</strong> Management consulting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>996331:</strong> Restaurant services (5%)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>997212:</strong> Courier services</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-4xl font-bold text-gray-900 flex items-center mb-8">
                  <Award className="w-10 h-10 mr-3 text-cyan-700" />
                  HSN/SAC Learning Center - Master GST Classification
                </h2>
                
                {learningContent.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-12 pb-12 border-b border-gray-200 last:border-0"
                  >
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                        <section.icon className="w-7 h-7" />
                      </div>
                      {section.title}
                    </h3>
                    <div 
                      className="prose max-w-none text-gray-700 leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{ __html: section.content.replace(/\n\n/g, '</p><p class="mb-4">').replace(/\n/g, '<br/>') }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Related Tools */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Calculator className="w-8 h-8 mr-3 text-cyan-700" />
            Related GST Tools & Calculators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'GST Amount Calculator', url: '/tools/gst-amount-calculator', desc: 'Calculate GST on any amount' },
              { name: 'Reverse GST Calculator', url: '/tools/reverse-gst-calculator', desc: 'Find base price from GST amount' },
              { name: 'GST Slab Calculator', url: '/tools/gst-slab-calculator', desc: 'Check GST rate for products' },
              { name: 'GSTR-1 Deadline', url: '/tools/gstr-1-deadline-calculator', desc: 'Filing deadlines & penalties' },
              { name: 'GSTR-3B Calculator', url: '/tools/gstr-3b-deadline-calculator', desc: 'Monthly return deadlines' },
              { name: 'GST Liability Calculator', url: '/tools/gst-liability-calculator', desc: 'Calculate total GST liability' },
              { name: 'ITC Eligibility Checker', url: '/tools/itc-eligibility-checker', desc: 'Check input tax credit' },
              { name: 'Composition Scheme', url: '/tools/composition-scheme-checker', desc: 'Eligibility checker' }
            ].map((tool, index) => (
              <motion.a
                key={index}
                href={`https://moneycal.in${tool.url}`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-cyan-400 hover:shadow-xl transition-all"
              >
                <div className="font-bold text-gray-900 mb-2 flex items-center justify-between">
                  {tool.name}
                  <ArrowRight className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="text-sm text-gray-600">{tool.desc}</div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Official Resources */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 bg-white rounded-xl p-6 border-l-4 border-cyan-600"
        >
          <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
            <ExternalLink className="w-6 h-6 mr-2 text-cyan-700" />
            Official Government Resources for HSN/SAC
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://www.gst.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-700 hover:underline font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              GST India Portal - Official HSN/SAC Database
            </a>
            <a
              href="https://cbic-gst.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-700 hover:underline font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              CBIC - GST Rate Schedules & Notifications
            </a>
            <a
              href="https://www.incometax.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-700 hover:underline font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Income Tax Department - Tax Guidelines
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HSNSACFinder;
