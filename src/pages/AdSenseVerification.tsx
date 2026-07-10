import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Copy, ExternalLink, ShieldCheck, 
  FileCode, Terminal, Globe, ArrowLeft, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const AdSenseVerification: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'ads-txt' | 'code' | 'meta'>('ads-txt');

  const publisherId = 'pub-6815277662449747';
  const adsTxtContent = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;
  const metaTagContent = `<meta name="google-adsense-account" content="ca-${publisherId}">`;
  const scriptContent = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${publisherId}" crossorigin="anonymous"></script>`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const methods = [
    { id: 'ads-txt', name: 'Ads.txt snippet', icon: FileCode },
    { id: 'code', name: 'AdSense code snippet', icon: Terminal },
    { id: 'meta', name: 'Meta tag', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet 
        title="AdSense Site Verification | MoneyCal.in"
        description="Verify your site with AdSense to start showing ads and maximizing your revenue."
        url="/seo-tools/adsense-verification"
      />
      
      <div className="max-w-3xl mx-auto">
        <Link to="/seo-tools" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-red-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to SEO Tools
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          <div className="bg-red-600 px-8 py-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 w-32 h-32 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Select verification method:</h1>
              <p className="text-red-100 text-lg">Verification helps us confirm you're the site owner.</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {methods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id as any)}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedMethod === method.id 
                    ? 'border-red-600 bg-red-50 text-red-700 shadow-md transform scale-[1.02]' 
                    : 'border-slate-100 bg-white text-slate-600 hover:border-red-200 hover:bg-slate-50'
                  }`}
                >
                  <method.icon className={`w-8 h-8 mb-3 ${selectedMethod === method.id ? 'text-red-600' : 'text-slate-400'}`} />
                  <span className="font-semibold text-sm text-center">{method.name}</span>
                </button>
              ))}
            </div>

            {selectedMethod === 'ads-txt' && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    To get your site ready to show ads, copy and paste the text below into each ads.txt file and upload to your site's root directory. If you have an existing ads.txt file, just paste the text into each file. 
                    <a href="https://support.google.com/adsense/answer/7532444" target="_blank" rel="noopener noreferrer" className="ml-1 text-red-600 font-medium hover:underline inline-flex items-center">
                      Learn more <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </p>
                  
                  <div className="relative group">
                    <pre className="bg-slate-900 text-slate-100 p-5 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800 shadow-inner">
                      {adsTxtContent}
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(adsTxtContent, 'ads-txt')}
                      className="absolute top-3 right-3 p-2 rounded-md bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shadow-lg"
                    >
                      {copied === 'ads-txt' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-full mr-4">
                      <ShieldCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-green-900">Verification Steps Complete?</h3>
                      <p className="text-green-700 text-sm">Once published, AdSense will verify the file.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPublished(!published)}
                    className={`px-6 py-3 rounded-full font-bold transition-all shadow-lg ${
                      published 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-green-700 border border-green-300 hover:bg-green-100'
                    }`}
                  >
                    {published ? "I've published the ads.txt file ✅" : "I've published the ads.txt file"}
                  </button>
                </div>
              </motion.div>
            )}

            {selectedMethod === 'code' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                 <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Copy and paste the script below into the <code className="bg-slate-200 px-1 rounded text-red-700">&lt;head&gt;</code> tag of your site.
                  </p>
                  <div className="relative group">
                    <pre className="bg-slate-900 text-slate-100 p-5 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800 shadow-inner whitespace-pre-wrap">
                      {scriptContent}
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(scriptContent, 'code')}
                      className="absolute top-3 right-3 p-2 rounded-md bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shadow-lg"
                    >
                      {copied === 'code' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedMethod === 'meta' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                 <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Copy and paste this meta tag into your site's <code className="bg-slate-200 px-1 rounded text-red-700">&lt;head&gt;</code> section.
                  </p>
                  <div className="relative group">
                    <pre className="bg-slate-900 text-slate-100 p-5 rounded-lg font-mono text-sm overflow-x-auto border border-slate-800 shadow-inner">
                      {metaTagContent}
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(metaTagContent, 'meta')}
                      className="absolute top-3 right-3 p-2 rounded-md bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shadow-lg"
                    >
                      {copied === 'meta' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex justify-between items-center">
            <div className="text-slate-500 text-sm italic">
              MoneyCal AdSense Verification Assistant
            </div>
            <Link 
              to="/seo-tools"
              className="px-6 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg"
            >
              Done
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdSenseVerification;
