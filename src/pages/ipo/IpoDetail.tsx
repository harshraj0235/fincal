import React, { useState, useEffect } from 'react';
import { useParams, Link, Link as RouterLink } from 'react-router-dom';
import { fetchIpoBySlug, allIpoData } from '../../services/ipoApi';
import { IpoDetails, IpoFinancial } from '../../types/ipo';
import SEOHelmet from '../../components/SEOHelmet';
import { ArrowLeft, TrendingUp, TrendingDown, ShieldAlert, BarChart3, AlertCircle, Calendar, CheckCircle, IndianRupee, Info, Target, Users, Building2 } from 'lucide-react';
import AlsoRead from '../../components/AlsoRead';

const IpoDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [ipo, setIpo] = useState<IpoDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadIpo = async () => {
            setLoading(true);
            if (slug) {
                const data = await fetchIpoBySlug(slug);
                setIpo(data);
            }
            setLoading(false);
        };
        loadIpo();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!ipo) {
        return (
            <>
                <SEOHelmet 
                    title="IPO Not Found - MoneyCal" 
                    description="The IPO you are looking for might have been removed or does not exist."
                    noIndex={true}
                />
                <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4 text-center">
                    <h1 className="text-3xl font-black text-slate-900 mb-4">IPO Not Found</h1>
                    <p className="text-slate-600 mb-8">The IPO you are looking for might have been removed or does not exist.</p>
                    <Link to="/ipo" reloadDocument className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                        Return to IPO Dashboard
                    </Link>
                </div>
            </>
        );
    }

    const isPremium = ipo.expectedGmp > 0;
    const gmpStatus = isPremium ? "पॉजिटिव (Positive)" : "नेगेटिव या फ्लैट (Negative/Flat)";
    const recommendation = ipo.expectedGmpPercentage >= 15 ? "मजबूत लिस्टिंग गेन की संभावना (Strong Listing Gains Expected)" : "सावधानी से निवेश करें (Invest Cautiously)";
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <>
            <SEOHelmet
                title={`${ipo.name} IPO Details 2025 - GMP Today ₹${ipo.expectedGmp}, Subscription Status, Review in Hindi | MoneyCal`}
                description={`${ipo.name} IPO: Live GMP ₹${ipo.expectedGmp} (${ipo.expectedGmpPercentage}%), Subscription ${ipo.subscriptionStatus.total}x, Price Band ${ipo.priceBand}, Lot Size ${ipo.lotSize}. Full expert review, allotment details & analysis in Hindi.`}
                keywords={`${ipo.name} IPO, ${ipo.name} IPO GMP today, ${ipo.name} IPO allotment status, ${ipo.name} IPO review Hindi, ${ipo.symbol} IPO subscription status, ${ipo.name} IPO listing date, IPO GMP today 2025`}
                url={`/ipo/${ipo.slug}`}
                structuredData={[{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": `${ipo.name} IPO Details - GMP, Subscription & Review in Hindi`,
                    "datePublished": ipo.openDate,
                    "dateModified": today,
                    "author": { "@type": "Organization", "name": "MoneyCal" },
                    "publisher": { "@type": "Organization", "name": "MoneyCal", "url": "https://moneycal.in" }
                }]}
                faqData={[
                    { question: `${ipo.name} IPO का GMP कितना है?`, answer: `${ipo.name} IPO का Grey Market Premium (GMP) आज ₹${ipo.expectedGmp} चल रहा है, जो लगभग ${ipo.expectedGmpPercentage}% लिस्टिंग प्रीमियम दर्शाता है।` },
                    { question: `${ipo.name} IPO ka Lot Size kya hai?`, answer: `${ipo.name} IPO का Lot Size ${ipo.lotSize} शेयर है। न्यूनतम निवेश राशि Price Band के ऊपरी सीमा पर आधारित होगी।` },
                    { question: `${ipo.name} IPO कब लिस्ट होगा?`, answer: `${ipo.name} IPO की Expected Listing Date ${ipo.listingDate} है। Listing BSE और NSE दोनों पर होगी।` },
                    { question: `क्या ${ipo.name} IPO में निवेश करना चाहिए?`, answer: `${ipo.name} IPO में GMP ${gmpStatus} है और Total Subscription ${ipo.subscriptionStatus.total}x है। ${recommendation}. हालांकि, अपना खुद का रिसर्च ज़रूर करें।` }
                ]}
            />

            <article className="min-h-screen bg-[#F8FAFC] pb-24" itemScope itemType="https://schema.org/Article">

                {/* Breadcrumb Navigation */}
                <nav className="bg-white border-b border-slate-200 sticky top-16 z-30" aria-label="Breadcrumb">
                    <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-sm">
                        <Link to="/" className="text-slate-400 hover:text-blue-600 transition-colors">Home</Link>
                        <span className="text-slate-300">/</span>
                        <Link to="/ipo" reloadDocument className="text-slate-400 hover:text-blue-600 transition-colors">IPO Dashboard</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-700 font-semibold truncate">{ipo.name}</span>
                    </div>
                </nav>

                {/* ─── Hero Header ─── */}
                <header className="bg-white border-b border-slate-200 pt-10 pb-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-widest rounded-md ${ipo.type === 'Mainboard' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                                {ipo.type} IPO
                            </span>
                            <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-widest rounded-md ${ipo.status === 'Open' ? 'bg-emerald-50 text-emerald-700' : ipo.status === 'Upcoming' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                {ipo.status}
                            </span>
                            <span className="px-2.5 py-1 text-xs font-medium text-slate-400 bg-slate-50 rounded-md">
                                Updated: {today}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-3" itemProp="headline">
                            {ipo.name} IPO — GMP, Review, Allotment and Analysis in Hindi
                        </h1>
                        <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-3xl" itemProp="description">
                            {ipo.name} IPO ({ipo.type}) की पूरी जानकारी हिंदी में — Live Grey Market Premium (GMP), Subscription Status, Price Band, Lot Size, Allotment Date, Financial Analysis और Expert Review सब एक जगह।
                        </p>

                        {/* Key Metrics Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold mb-1">
                                    <IndianRupee className="w-3.5 h-3.5" /> Issue Size
                                </div>
                                <div className="text-lg font-black text-slate-900">{ipo.issueSize}</div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold mb-1">
                                    <Target className="w-3.5 h-3.5" /> Price Band
                                </div>
                                <div className="text-lg font-black text-slate-900">{ipo.priceBand}</div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold mb-1">
                                    <Users className="w-3.5 h-3.5" /> Lot Size
                                </div>
                                <div className="text-lg font-black text-slate-900">{ipo.lotSize} Shares</div>
                            </div>
                            <div className={`rounded-2xl p-4 border ${isPremium ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                                <div className={`flex items-center gap-1.5 text-xs font-bold mb-1 ${isPremium ? 'text-emerald-700' : 'text-red-700'}`}>
                                    {isPremium ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />} Live GMP
                                </div>
                                <div className={`text-lg font-black ${isPremium ? 'text-emerald-800' : 'text-red-800'}`}>
                                    ₹{ipo.expectedGmp} <span className="text-sm">({ipo.expectedGmpPercentage}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ─── Featured Image ─── */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
                        <img
                            src={ipo.featuredImage || '/images/ipo-banner-default.png'}
                            alt={`${ipo.name} IPO Analysis and Details`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/images/ipo-banner-default.png';
                            }}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/60 to-transparent p-6 pt-12">
                            <span className="text-white/90 text-sm font-medium backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/20">
                                Exclusive Analysis: {ipo.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ─── Article Body ─── */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10" itemProp="articleBody">

                    {/* Table of Contents */}
                    <nav className="bg-white border border-slate-200 rounded-2xl p-6 mb-10" aria-label="Table of Contents">
                        <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-600" />
                            इस आर्टिकल में (Table of Contents)
                        </h2>
                        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm list-decimal list-inside text-slate-600">
                            <li><a href="#about" className="hover:text-blue-600 transition-colors">{ipo.name} कंपनी के बारे में</a></li>
                            <li><a href="#ipo-details" className="hover:text-blue-600 transition-colors">IPO की महत्वपूर्ण जानकारी</a></li>
                            <li><a href="#timeline" className="hover:text-blue-600 transition-colors">IPO Timeline और Dates</a></li>
                            <li><a href="#gmp" className="hover:text-blue-600 transition-colors">Grey Market Premium (GMP)</a></li>
                            <li><a href="#subscription" className="hover:text-blue-600 transition-colors">Subscription Status (Live)</a></li>
                            <li><a href="#financials" className="hover:text-blue-600 transition-colors">Financial Performance</a></li>
                            <li><a href="#swot" className="hover:text-blue-600 transition-colors">Strengths & Risks (SWOT)</a></li>
                            <li><a href="#apply" className="hover:text-blue-600 transition-colors">कैसे Apply करें?</a></li>
                            <li><a href="#verdict" className="hover:text-blue-600 transition-colors">Final Verdict</a></li>
                            <li><a href="#faq" className="hover:text-blue-600 transition-colors">अक्सर पूछे जाने वाले सवाल</a></li>
                        </ol>
                    </nav>

                    {/* Expert Alert Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex gap-4 mb-10">
                        <div className="shrink-0 mt-0.5">
                            <AlertCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-blue-900 font-bold text-sm mb-1">MoneyCal Expert View</h3>
                            <p className="text-blue-800 text-sm leading-relaxed">
                                {ipo.name} IPO का वर्तमान GMP <strong>₹{ipo.expectedGmp} ({ipo.expectedGmpPercentage}%)</strong> है और Total Subscription <strong>{ipo.subscriptionStatus.total}x</strong> है। हमारा प्रारंभिक आकलन: <strong>{recommendation}</strong>। विस्तृत विश्लेषण नीचे पढ़ें।
                            </p>
                        </div>
                    </div>

                    {/* Prose Content */}
                    <div className="prose prose-slate prose-lg max-w-none
                        prose-headings:font-black prose-headings:tracking-tight
                        prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:font-black
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-black
                        prose-p:text-slate-700 prose-p:leading-loose prose-p:mb-10
                        prose-li:text-slate-700 prose-li:leading-relaxed
                        prose-strong:text-slate-900 prose-strong:font-black
                        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    ">

                        {/* ── Section 1: About Company ── */}
                        <section id="about">
                            <h2 className="flex items-center font-black text-slate-900 sm:text-3xl text-2xl border-b-2 border-slate-200 pb-3 mt-14 mb-6">
                                <Building2 className="w-8 h-8 mr-3 text-blue-600 shrink-0" />
                                {ipo.name} — कंपनी के बारे में (Company Overview)
                            </h2>
                            <p>
                                भारतीय शेयर बाजार में निवेश करने वालों के लिए <strong>{ipo.name} IPO</strong> एक महत्वपूर्ण अवसर लेकर आया है। यह <strong>{ipo.type} कैटेगरी</strong> का IPO है जो इन दिनों बाजार में काफी चर्चा में है। किसी भी IPO में पैसे लगाने से पहले उस कंपनी का बिज़नेस मॉडल, उसकी ताकत और उसके जोखिम को समझना बेहद ज़रूरी होता है।
                            </p>
                            <p>
                                {ipo.companyDescription}
                            </p>

                            <h3>कंपनी की मुख्य विशेषताएं (Key Highlights)</h3>
                            <ul>
                                {ipo.aboutCompany.map((point: string, idx: number) => (
                                    <li key={idx}><strong>{point}</strong></li>
                                ))}
                            </ul>
                            <p>
                                कंपनी का मुख्य उद्देश्य इस IPO के ज़रिए जुटाई गई राशि (<strong>{ipo.issueSize}</strong>) का उपयोग अपने व्यापार के विस्तार, ऋण (Debt) चुकाने, कार्यशील पूंजी (Working Capital) बढ़ाने और सामान्य कॉर्पोरेट कार्यों (General Corporate Purposes) के लिए करना है।
                            </p>
                        </section>

                        {/* ── Section 2: IPO Details ── */}
                        <section id="ipo-details">
                            <h2 className="flex items-center font-black text-slate-900 sm:text-3xl text-2xl border-b-2 border-slate-200 pb-3 mt-14 mb-6">
                                <IndianRupee className="w-8 h-8 mr-3 text-blue-600 shrink-0" />
                                {ipo.name} IPO की पूरी जानकारी (Complete IPO Details)
                            </h2>
                            <p>
                                नीचे {ipo.name} IPO से जुड़ी सभी महत्वपूर्ण जानकारी (Price Band, Lot Size, Issue Size, Listing Exchange) एक टेबल में दी गई है। यह डेटा निवेश का निर्णय लेने में सबसे पहले काम आता है।
                            </p>
                        </section>

                        <div className="not-prose my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full text-left text-sm">
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="bg-slate-50"><th className="px-6 py-4 font-bold text-slate-800 w-1/2">IPO Name</th><td className="px-6 py-4 text-slate-700 font-semibold">{ipo.name}</td></tr>
                                    <tr><th className="px-6 py-4 font-bold text-slate-800">IPO Type</th><td className="px-6 py-4 text-slate-700">{ipo.type}</td></tr>
                                    <tr className="bg-slate-50"><th className="px-6 py-4 font-bold text-slate-800">Face Value</th><td className="px-6 py-4 text-slate-700">₹10 per share</td></tr>
                                    <tr><th className="px-6 py-4 font-bold text-slate-800">Price Band</th><td className="px-6 py-4 text-slate-700 font-semibold">{ipo.priceBand}</td></tr>
                                    <tr className="bg-slate-50"><th className="px-6 py-4 font-bold text-slate-800">Lot Size</th><td className="px-6 py-4 text-slate-700">{ipo.lotSize} Shares</td></tr>
                                    <tr><th className="px-6 py-4 font-bold text-slate-800">Total Issue Size</th><td className="px-6 py-4 text-slate-700 font-semibold">{ipo.issueSize}</td></tr>
                                    <tr className="bg-slate-50"><th className="px-6 py-4 font-bold text-slate-800">Listing On</th><td className="px-6 py-4 text-slate-700">BSE, NSE</td></tr>
                                    <tr><th className="px-6 py-4 font-bold text-slate-800">Registrar</th><td className="px-6 py-4 text-slate-700">{ipo.registrar}</td></tr>
                                </tbody>
                            </table>
                        </div>

                        {/* ── Share Reservation Section ── */}
                        {ipo.shareReservation && (
                            <>
                                <h3 className="text-xl font-bold mt-10 mb-4">शेयर रिजर्वेशन (Share Reservation)</h3>
                                <div className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                                            <tr>
                                                <th className="px-6 py-4 font-bold">Investor Category</th>
                                                <th className="px-6 py-4 font-bold">Shares Offered (Approx)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            <tr><th className="px-6 py-4 font-medium text-slate-800">QIB Shares Offered</th><td className="px-6 py-4 text-slate-700">{ipo.shareReservation.qib}</td></tr>
                                            <tr className="bg-slate-50"><th className="px-6 py-4 font-medium text-slate-800">NII (HNI) Shares Offered</th><td className="px-6 py-4 text-slate-700">{ipo.shareReservation.nii}</td></tr>
                                            <tr><th className="px-6 py-4 font-medium text-slate-800">Retail Shares Offered</th><td className="px-6 py-4 text-slate-700">{ipo.shareReservation.retail}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                        {/* ── Technical Analysis Snapshot ── */}
                        {ipo.technicalMetrics && (
                            <>
                                <h2 className="flex items-center font-black text-slate-900 sm:text-3xl text-2xl border-b-2 border-slate-200 pb-3 mt-14 mb-6">
                                    <BarChart3 className="w-8 h-8 mr-3 text-blue-600 shrink-0" />
                                    टेक्निकल एनालिसिस (Technical Snapshot)
                                </h2>
                                <p>
                                    किसी भी कंपनी के वैल्युएशन को समझने के लिए उसके <strong>P/E Ratio, EPS</strong> और <strong>ROCE</strong> जैसे मेट्रिक्स को देखना बहुत ज़रूरी होता है। ये आंकड़े कंपनी की लाभप्रदता और बाजार की उम्मीदों को दर्शाते हैं।
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                                    <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">P/E Ratio</div>
                                        <div className="text-2xl font-black text-slate-900">{ipo.technicalMetrics.peRatio}</div>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">EPS (₹)</div>
                                        <div className="text-2xl font-black text-slate-900">{ipo.technicalMetrics.eps}</div>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">ROCE (%)</div>
                                        <div className="text-2xl font-black text-slate-900">{ipo.technicalMetrics.roce}</div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── Section 3: Timeline ── */}
                        <section id="timeline">
                            <h2 className="flex items-center font-black text-slate-900 sm:text-3xl text-2xl border-b-2 border-slate-200 pb-3 mt-14 mb-6">
                                <Calendar className="w-8 h-8 mr-3 text-blue-600 shrink-0" />
                                {ipo.name} IPO Timeline और महत्वपूर्ण तिथियां (Key Dates)
                            </h2>
                            <p>
                                IPO में निवेश के लिए <strong>सही तारीखों</strong> की जानकारी सबसे ज़रूरी है। अगर आप Opening Date या Closing Date भूल गए, तो अवसर हाथ से निकल सकता है। नीचे {ipo.name} IPO की सभी अहम तिथियां दी गई हैं:
                            </p>
                        </section>

                        <div className="not-prose my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full text-left text-sm">
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="bg-slate-50">
                                        <th className="px-6 py-4 font-bold text-slate-800 w-1/2"><Calendar className="w-4 h-4 inline mr-2 text-slate-400" />IPO Open Date</th>
                                        <td className="px-6 py-4 text-slate-700 font-semibold">{ipo.openDate}</td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-slate-800"><Calendar className="w-4 h-4 inline mr-2 text-slate-400" />IPO Close Date</th>
                                        <td className="px-6 py-4 text-slate-700 font-semibold">{ipo.closeDate}</td>
                                    </tr>
                                    <tr className="bg-slate-50">
                                        <th className="px-6 py-4 font-bold text-slate-800"><CheckCircle className="w-4 h-4 inline mr-2 text-slate-400" />Basis of Allotment</th>
                                        <td className="px-6 py-4 text-slate-700">{ipo.allotmentDate}</td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-slate-800"><CheckCircle className="w-4 h-4 inline mr-2 text-slate-400" />Refund Initiation</th>
                                        <td className="px-6 py-4 text-slate-700">Allotment + 1 Business Day</td>
                                    </tr>
                                    <tr className="bg-emerald-50">
                                        <th className="px-6 py-4 font-bold text-emerald-800"><TrendingUp className="w-4 h-4 inline mr-2 text-emerald-600" />Expected Listing Date</th>
                                        <td className="px-6 py-4 text-emerald-800 font-black">{ipo.listingDate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* ── Promoter Holdings Section ── */}
                        {ipo.promoterHoldings && (
                            <>
                                <h3>प्रमोटर होल्डिंग (Promoter Holdings)</h3>
                                <p className="mb-4">कंपनी के प्रमोटरों की हिस्सेदारी यह दर्शाती है कि उनका कंपनी के भविष्य पर कितना भरोसा है।</p>
                                <div className="grid grid-cols-2 gap-4 my-6">
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Pre-Issue</div>
                                        <div className="text-xl font-bold text-slate-900">{ipo.promoterHoldings.preIssue}</div>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Post-Issue</div>
                                        <div className="text-xl font-bold text-slate-900">{ipo.promoterHoldings.postIssue}</div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── Objects of the Issue Section ── */}
                        {ipo.objectsOfIssue && (
                            <>
                                <h3>IPO लाने का उद्देश्य (Aim/Objects of the IPO)</h3>
                                <p>कंपनी इस IPO के ज़रिए जुटाए गए फंड का उपयोग निम्नलिखित कार्यों के लिए करेगी:</p>
                                <ul className="mb-8">
                                    {ipo.objectsOfIssue.map((obj: string, i: number) => (
                                        <li key={i}><strong>{obj}</strong></li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {/* ── Section 4: GMP ── */}
                        <section id="gmp">
                            <h2 className="flex items-center font-black text-slate-900 sm:text-3xl text-2xl border-b-2 border-slate-200 pb-3 mt-14 mb-6">
                                <TrendingUp className="w-8 h-8 mr-3 text-emerald-600 shrink-0" />
                                {ipo.name} IPO GMP Today — Grey Market Premium Analysis
                            </h2>
                            <p>
                                <strong>Grey Market Premium (GMP)</strong> वह अतिरिक्त रकम होती है जो निवेशक किसी IPO के शेयर के लिए उसकी तय कीमत (Issue Price) से ऊपर अनऑफिशियल मार्केट में देने को तैयार होते हैं। GMP को IPO के मार्केट सेंटिमेंट (Sentiment) का सबसे भरोसेमंद इंडिकेटर माना जाता है।
                            </p>

                            <h3>{ipo.name} IPO का आज का GMP क्या है?</h3>
                            <p>
                                वर्तमान में <strong>{ipo.name} IPO का Expected GMP ₹{ipo.expectedGmp}</strong> चल रहा है। Price Band (<strong>{ipo.priceBand}</strong>) को देखें तो यह लगभग <strong>{ipo.expectedGmpPercentage}% का Expected Listing Gain</strong> दर्शाता है। यह {gmpStatus} सेंटिमेंट को इंगित करता है।
                            </p>

                            <h3>GMP का अर्थ (What GMP Means for Investors)</h3>
                            <p>
                                अगर GMP पॉजिटिव है, तो इसका मतलब है कि बाजार को लगता है कि शेयर लिस्टिंग के दिन अपने Issue Price से ऊपर ट्रेड करेगा। हालांकि, GMP एक <strong>अनऑफिशियल इंडिकेटर</strong> है — यह 100% गारंटी नहीं देता। लिस्टिंग डे पर कई फैक्टर्स (जैसे मार्केट कंडीशन, ग्लोबल ट्रेंड) इसे प्रभावित कर सकते हैं।
                            </p>
                        </section>

                        {/* ── Section 5: Subscription ── */}
                        <section id="subscription">
                            <h2 className="flex items-center font-black text-slate-900 sm:text-3xl text-2xl border-b-2 border-slate-200 pb-3 mt-14 mb-6">
                                <BarChart3 className="w-8 h-8 mr-3 text-blue-600 shrink-0" />
                                {ipo.name} IPO Subscription Status (Live Data)
                            </h2>
                            <p>
                                IPO की सफलता का सबसे बड़ा संकेतक उसका <strong>Subscription Status</strong> होता है। ज़्यादा सब्सक्रिप्शन होने का मतलब है कि मांग (Demand) ज़्यादा है, जो आमतौर पर बेहतर लिस्टिंग का संकेत देता है। नीचे {ipo.name} IPO का कैटेगरी-वाइज़ सब्सक्रिप्शन डेटा दिया गया है:
                            </p>
                        </section>

                        {/* Subscription Data - Dark Card */}
                        <div className="not-prose my-8 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                                <BarChart3 className="w-5 h-5 text-blue-400" />
                                Live Subscription Data — {ipo.name} IPO
                            </h3>
                            <div className="space-y-5">
                                {[
                                    { label: 'QIB (Qualified Institutional Buyers)', value: ipo.subscriptionStatus.qib, color: 'bg-purple-500' },
                                    { label: 'NII / HNI (Non-Institutional Investors)', value: ipo.subscriptionStatus.nii, color: 'bg-blue-500' },
                                    { label: 'Retail Individual Investors (RII)', value: ipo.subscriptionStatus.retail, color: 'bg-emerald-500' },
                                ].map((cat) => (
                                    <div key={cat.label}>
                                        <div className="flex justify-between text-sm font-medium mb-2">
                                            <span className="text-slate-300">{cat.label}</span>
                                            <span className="font-bold text-white">{cat.value}x</span>
                                        </div>
                                        <div className="w-full bg-slate-800 rounded-full h-2.5">
                                            <div className={`${cat.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${Math.min(cat.value * 5, 100)}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-slate-700 mt-4">
                                    <div className="flex justify-between text-lg font-black text-white">
                                        <span>Total Subscription</span>
                                        <span className="text-emerald-400">{ipo.subscriptionStatus.total}x</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>
                            जैसा कि ऊपर दिए गए डेटा से स्पष्ट है, {ipo.subscriptionStatus.total > 5 ? `${ipo.name} IPO को बाजार से शानदार रिस्पॉन्स मिला है। ${ipo.subscriptionStatus.total}x का Overall Subscription बताता है कि डिमांड सप्लाई से काफी ज़्यादा है।` : `${ipo.name} IPO का ओवरऑल सब्सक्रिप्शन ${ipo.subscriptionStatus.total}x है। Retail Category में भागीदारी ${ipo.subscriptionStatus.retail}x रही है।`}
                        </p>

                        {/* ── Section 6: Financials ── */}
                        <section id="financials">
                            <h2 className="flex items-center font-black text-slate-900 sm:text-3xl text-2xl border-b-2 border-slate-200 pb-3 mt-14 mb-6">
                                <IndianRupee className="w-8 h-8 mr-3 text-blue-600 shrink-0" />
                                {ipo.name} — Financial Performance (वित्तीय प्रदर्शन)
                            </h2>
                            <p>
                                IPO की सफलता या विफलता का सबसे बड़ा कारण कंपनी का <strong>वित्तीय प्रदर्शन (Financial Performance)</strong> होता है। एक समझदार निवेशक सिर्फ कंपनी के विज़न पर नहीं, बल्कि उसकी <strong>Balance Sheet, Profit & Loss Statement</strong> और <strong>Cash Flow</strong> पर भरोसा करता है।
                            </p>
                        </section>

                        <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Financial Year</th>
                                        <th className="px-6 py-4 font-bold">Total Revenue</th>
                                        <th className="px-6 py-4 font-bold">Net Profit (PAT)</th>
                                        <th className="px-6 py-4 font-bold">Total Assets</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
                                    {ipo.financials.map((fin: IpoFinancial, idx: number) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-slate-900">{fin.year}</td>
                                            <td className="px-6 py-4">{fin.revenue}</td>
                                            <td className="px-6 py-4 text-emerald-600 font-bold">{fin.profit}</td>
                                            <td className="px-6 py-4">{fin.assets}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p>
                            ऊपर दिए गए डेटा से स्पष्ट है कि कंपनी का Revenue और Profit Margin किस दिशा में ट्रेंड कर रहा है। एक बढ़ता हुआ Revenue और Profit दर्शाता है कि कंपनी का बिज़नेस मॉडल मज़बूत है और यह <strong>Long-Term Wealth Creation</strong> का ज़रिया बन सकती है।
                        </p>

                        {/* ── Section 7: SWOT (Rebranded to Pros & Cons) ── */}
                        <section id="swot">
                            <h2 className="flex items-center font-black text-slate-900 sm:text-3xl text-2xl border-b-2 border-slate-200 pb-3 mt-14 mb-6">
                                <ShieldAlert className="w-8 h-8 mr-3 text-amber-600 shrink-0" />
                                {ipo.name} IPO Review: Pros & Cons (क्या खूबियां और क्या कमियां हैं?)
                            </h2>
                            <p>
                                निवेश एक दो-धारी तलवार (Double-Edged Sword) है। जहां एक ओर शानदार रिटर्न्स की संभावना होती है, वहीं दूसरी ओर पूंजी खोने का जोखिम भी बना रहता है। {ipo.name} IPO के मामले में Univest स्टाइल का विस्तृत 'Pros & Cons' विश्लेषण नीचे दिया गया है:
                            </p>
                        </section>

                        <div className="not-prose grid md:grid-cols-2 gap-5 my-8">
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                                <h3 className="text-emerald-800 font-black text-base mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" /> खूबियां (Pros)
                                </h3>
                                <ul className="space-y-3">
                                    {ipo.swotAnalysis.strengths.map((str: string, i: number) => (
                                        <li key={i} className="flex gap-2 text-sm text-emerald-900 font-medium leading-relaxed">
                                            <span className="text-emerald-500 shrink-0 mt-1">✓</span> {str}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
                                <h3 className="text-rose-800 font-black text-base mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" /> कमियां (Cons)
                                </h3>
                                <ul className="space-y-3">
                                    {ipo.swotAnalysis.weaknesses.map((weak: string, i: number) => (
                                        <li key={i} className="flex gap-2 text-sm text-rose-900 font-medium leading-relaxed">
                                            <span className="text-rose-500 shrink-0 mt-1">✗</span> {weak}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* ── Section 8: How to Apply ── */}
                        <section id="apply">
                            <h2 className="flex items-center font-black text-slate-900 sm:text-3xl text-2xl border-b-2 border-slate-200 pb-3 mt-14 mb-6">
                                <CheckCircle className="w-8 h-8 mr-3 text-blue-600 shrink-0" />
                                {ipo.name} IPO में कैसे Apply करें? (How to Apply)
                            </h2>
                            <p>
                                {ipo.name} IPO में निवेश करने के लिए आपके पास <strong>Demat Account</strong> और <strong>UPI ID (BHIM or Bank UPI)</strong> होना ज़रूरी है। नीचे Step-by-Step प्रक्रिया दी गई है:
                            </p>

                            <h3>ऑनलाइन Apply करने के Steps:</h3>
                            <ol>
                                <li><strong>अपने Broker App पर Login करें</strong> — Zerodha, Groww, Angel One, Upstox, या किसी भी SEBI Registered Broker का ऐप खोलें।</li>
                                <li><strong>IPO Section में जाएं</strong> — "IPO" या "Current IPO" सेक्शन में {ipo.name} IPO ढूंढें।</li>
                                <li><strong>Lot Quantity चुनें</strong> — Minimum 1 Lot ({ipo.lotSize} shares) सेलेक्ट करें।</li>
                                <li><strong>Price भरें</strong> — Cut-Off Price पर Apply करें (यह सबसे बेहतर तरीका है)।</li>
                                <li><strong>UPI ID डालें</strong> — अपना BHIM UPI ID (जैसे yourname@okhdfcbank) दर्ज करें।</li>
                                <li><strong>UPI Request Accept करें</strong> — अपने UPI App में जाकर Mandate Request को Approve करें।</li>
                                <li><strong>Confirm करें</strong> — Application submit हो जाएगी। Allotment Date ({ipo.allotmentDate}) पर रिज़ल्ट आएगा।</li>
                            </ol>

                            <h3>ASBA के ज़रिए Apply करना</h3>
                            <p>
                                ASBA (Application Supported by Blocked Amount) method में आपके Bank Account में पैसा Block होता है, कटता नहीं। Allotment होने पर ही पैसा कटता है। यह सबसे सुरक्षित तरीका है। आप अपने <strong>Net Banking Portal</strong> या <strong>Bank Branch</strong> से भी ASBA के ज़रिए IPO Apply कर सकते हैं।
                            </p>
                        </section>

                        {/* ── Custom Detailed Content Sections (For 2500+ words) ── */}
                        {ipo.contentSections && (
                            <section className="mt-12">
                                {ipo.contentSections.map((section: { title: string; content: string }, index: number) => (
                                    <div key={index} className="mb-12">
                                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 border-b border-slate-200 pb-3">
                                            {section.title}
                                        </h2>
                                        <div
                                            className="prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6 prose-li:mb-2 text-lg whitespace-pre-line"
                                            dangerouslySetInnerHTML={{ __html: section.content }}
                                        />
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* ── Section 9: Final Verdict ── */}
                        <section id="verdict">
                            <h2 className="flex items-center font-black text-slate-900 sm:text-3xl text-2xl border-b-2 border-slate-200 pb-3 mt-14 mb-6">
                                <Target className="w-8 h-8 mr-3 text-blue-600 shrink-0" />
                                Final Verdict — क्या {ipo.name} IPO में निवेश करना चाहिए?
                            </h2>
                            <p>
                                अगर हम {ipo.name} IPO के <strong>{gmpStatus} GMP (₹{ipo.expectedGmp})</strong>, <strong>कुल Subscription ({ipo.subscriptionStatus.total}x)</strong>, और कंपनी की Financial Performance को एक साथ देखें, तो यह बात साफ होती है कि <strong>{recommendation}</strong>।
                            </p>

                            <h3>Conservative Investors के लिए (Low Risk)</h3>
                            <p>
                                अगर आप कम जोखिम लेना चाहते हैं, तो Listing Day तक इंतज़ार करें। बाजार का रुझान देखकर शेयर खरीदने का निर्णय लें। IPO में अप्लाई करना और Secondary Market से शेयर खरीदना — दोनों अलग-अलग रणनीतियां हैं।
                            </p>

                            <h3>Listing Gain Seekers के लिए (High Risk)</h3>
                            <p>
                                अगर आपका उद्देश्य सिर्फ Listing Gain कमाना है, तो GMP (₹{ipo.expectedGmp}) और अंतिम दिन ({ipo.closeDate}) के Subscription Data दोनों को ध्यान में रखें। Retail Category में Cut-Off Price पर Apply करने से Allotment की संभावना बेहतर होती है।
                            </p>
                        </section>

                        {/* Verdict Box */}
                        <div className="not-prose my-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl">
                            <div className="text-center">
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">MoneyCal Expert Rating</div>
                                <div className="text-4xl font-black mb-3">
                                    {ipo.expectedGmpPercentage >= 20 ? '⭐⭐⭐⭐⭐' : ipo.expectedGmpPercentage >= 10 ? '⭐⭐⭐⭐' : ipo.expectedGmpPercentage >= 5 ? '⭐⭐⭐' : '⭐⭐'}
                                </div>
                                <div className="text-lg font-bold text-emerald-400 mb-1">{recommendation}</div>
                                <div className="text-sm text-slate-400">Based on GMP, Subscription, Financials & Market Conditions</div>
                            </div>
                        </div>


                        {/* Recommendation Feature: Also Read */}
                        <div className="mt-12">
                            <AlsoRead
                                items={allIpoData
                                    .filter(item => item.slug !== slug)
                                    .slice(0, 3)
                                    .map(relatedIpo => ({
                                        title: `${relatedIpo.name} IPO Review: GMP & Details`,
                                        link: `/ipo/${relatedIpo.slug}`
                                    }))
                                }
                            />
                        </div>

                        {/* Related IPOs */}
                        <div className="mt-16 pt-10 border-t border-slate-200">
                            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                                अन्य महत्वपूर्ण आईपीओ रिव्यू (Related IPO Reviews)
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {allIpoData
                                    .filter(item => item.slug !== slug)
                                    .slice(0, 6)
                                    .map(relatedIpo => (
                                        <RouterLink
                                            key={relatedIpo.id}
                                            to={`/ipo/${relatedIpo.slug}`}
                                            className="group bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
                                        >
                                            <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-tight">
                                                {relatedIpo.type} IPO
                                            </div>
                                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                {relatedIpo.name}
                                            </div>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-xs font-medium text-slate-500">GMP: ₹{relatedIpo.expectedGmp}</span>
                                                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                    रिव्यू पढ़ें <ArrowLeft className="w-3 h-3 rotate-180" />
                                                </span>
                                            </div>
                                        </RouterLink>
                                    ))}
                            </div>
                        </div>

                        {/* Related SEO Internal Links Wrapper */}
                        <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 my-10 not-prose">
                            <h4 className="text-xl font-black text-blue-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6" /> संबंधित लिंक्स (Important Links)
                            </h4>
                            <ul className="space-y-3 list-none pl-0 m-0">
                                <li><RouterLink to="/ipo" className="text-blue-700 hover:text-blue-900 font-bold hover:underline flex items-center gap-2">→ सभी आगामी आईपीओ देखें (Upcoming IPO Dashboard)</RouterLink></li>
                                <li><RouterLink to="/gold-rate" className="text-blue-700 hover:text-blue-900 font-bold hover:underline flex items-center gap-2">→ आज का गोल्ड रेट (Today's Gold Prices)</RouterLink></li>
                                <li><RouterLink to="/silver-rate" className="text-blue-700 hover:text-blue-900 font-bold hover:underline flex items-center gap-2">→ आज का सिल्वर रेट (Today's Silver Prices)</RouterLink></li>
                                <li><RouterLink to="/gold-tools/jewellery-price-estimator" className="text-blue-700 hover:text-blue-900 font-bold hover:underline flex items-center gap-2">→ गोल्ड ज्वेलरी प्राइस कैलकुलेटर (Gold Price Estimator)</RouterLink></li>
                            </ul>
                        </div>

                        {/* ── Section 10: FAQ ── */}
                        <section id="faq">
                            <h2>अक्सर पूछे जाने वाले सवाल (Frequently Asked Questions)</h2>

                            <h3>Q1: {ipo.name} IPO का GMP आज कितना है?</h3>
                            <p>
                                {ipo.name} IPO का Grey Market Premium (GMP) आज <strong>₹{ipo.expectedGmp}</strong> चल रहा है। यह Price Band के Upper End से लगभग <strong>{ipo.expectedGmpPercentage}% Premium</strong> दर्शाता है। GMP अनऑफिशियल होता है और लिस्टिंग से पहले बदल सकता है।
                            </p>

                            <h3>Q2: {ipo.name} IPO का Lot Size क्या है?</h3>
                            <p>
                                {ipo.name} IPO में <strong>1 Lot = {ipo.lotSize} Shares</strong> है। Retail Investors अधिकतम ₹2,00,000 तक के Application लगा सकते हैं। इससे ज़्यादा राशि HNI/NII कैटेगरी में आती है।
                            </p>

                            <h3>Q3: {ipo.name} IPO कब List होगा?</h3>
                            <p>
                                {ipo.name} IPO की <strong>Expected Listing Date {ipo.listingDate}</strong> है। Listing <strong>BSE (Bombay Stock Exchange)</strong> और <strong>NSE (National Stock Exchange)</strong> दोनों पर होगी।
                            </p>

                            <h3>Q4: क्या {ipo.name} IPO में निवेश करना Safe है?</h3>
                            <p>
                                शेयर बाजार में कोई भी निवेश 100% Safe नहीं होता। {ipo.name} IPO में <strong>GMP {gmpStatus}</strong> और <strong>Subscription {ipo.subscriptionStatus.total}x</strong> है, जो बाजार की मांग दिखाता है। फिर भी, <strong>DYOR (Do Your Own Research)</strong> या किसी SEBI Registered Advisor से सलाह ज़रूर लें।
                            </p>

                            <h3>Q5: Allotment Status कैसे Check करें?</h3>
                            <p>
                                {ipo.name} IPO Allotment Status चेक करने के लिए <strong>BSE IPO Status</strong> पोर्टल या <strong>KFintech / Link Intime</strong> (Registrar) की वेबसाइट पर जाएं। अपना PAN Number या Application Number डालकर Status देख सकते हैं। Allotment Date <strong>{ipo.allotmentDate}</strong> है।
                            </p>
                        </section>

                        {/* Disclaimer */}
                        <hr className="my-12" />

                        <section>
                            <p className="text-sm text-slate-500 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                <strong>⚠️ Disclaimer (अस्वीकरण):</strong> यह आर्टिकल केवल शैक्षिक और सूचनात्मक उद्देश्यों (Educational & Informational Purposes Only) के लिए लिखा गया है। MoneyCal एक SEBI-पंजीकृत वित्तीय सलाहकार (Registered Investment Advisor) नहीं है। शेयर बाजार और IPO में निवेश बाज़ार के जोखिमों (Market Risks) के अधीन है। किसी भी IPO में पैसे लगाने से पहले अपना खुद का रिसर्च (Do Your Own Research — DYOR) ज़रूर करें या अपने Certified Financial Advisor से सलाह लें। पिछला प्रदर्शन भविष्य के रिटर्न की गारंटी नहीं है।
                            </p>
                        </section>

                    </div>
                </div>
            </article>
        </>
    );
};

export default IpoDetail;
