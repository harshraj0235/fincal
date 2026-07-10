import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

const ScamProofBlock: React.FC = () => {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="my-10 p-8 bg-amber-50 rounded-2xl border-2 border-amber-200 shadow-sm relative overflow-hidden">
      {/* Texture Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <ShieldCheck className="w-24 h-24 text-amber-900" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6 text-amber-900">
          <ShieldCheck className="w-6 h-6 fill-amber-500/20" />
          <h3 className="text-xl font-black tracking-tight uppercase">Digital Provenance Verifier</h3>
        </div>

        <p className="text-amber-900/80 font-medium text-sm mb-8 leading-relaxed">
          In 2026, AI deepfakes and forged documents are rampant. This "Liquid Proof" block provides verifiable human receipts 
          that AI cannot authentically simulate. Interact below to verify the evidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white/60 rounded-xl border border-amber-200">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="text-xs font-black text-amber-900 uppercase tracking-widest mb-1">Source Authentified</div>
                <div className="text-sm font-bold text-slate-600 italic">"Official Police Warrant #4592-2026-DL"</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/60 rounded-xl border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <div className="text-xs font-black text-amber-900 uppercase tracking-widest mb-1">Scam Indicators Found</div>
                <div className="text-sm font-bold text-slate-600">Forged QR Code, Incorrect Logo, Grammar Errors.</div>
              </div>
            </div>
          </div>

          <div className="relative aspect-auto bg-slate-900 rounded-xl overflow-hidden border-4 border-white shadow-xl min-h-[200px] flex flex-col">
            <div className="flex items-center justify-between p-3 bg-slate-800">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <FileText className="w-3 h-3" />
                Evidence_Scan.jpg
              </span>
              <button 
                onClick={() => setShowOriginal(!showOriginal)}
                className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-[10px] font-black text-amber-950 uppercase tracking-widest rounded-md transition-colors"
              >
                {showOriginal ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {showOriginal ? 'Hide Proof' : 'View Full Proof'}
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              {showOriginal ? (
                <div className="animate-in fade-in zoom-in duration-300">
                   {/* Placeholder for real forensic image */}
                   <div className="w-full h-32 bg-amber-100/10 border-2 border-dashed border-amber-500/30 rounded flex items-center justify-center text-amber-500 text-xs font-black uppercase tracking-tighter">
                     [AUTHENTIC FORENSIC SCAN LOADED]
                   </div>
                   <p className="mt-4 text-[10px] text-slate-400 italic">Digital Signature Verified via C2PA standard</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                     <LockIcon className="w-5 h-5 text-slate-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Evidence Encrypted</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 border-t border-amber-200/50 pt-6">
           <div className="text-center">
             <div className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Case ID</div>
             <div className="text-lg font-black text-amber-600 tracking-tighter">NYT-2026-F4</div>
           </div>
           <div className="w-px h-10 bg-amber-200"></div>
           <div className="text-center text-amber-900/50 italic text-[10px] max-w-[200px]">
             Human verification required to unlock full forensic analysis.
           </div>
        </div>
      </div>
    </div>
  );
};

const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default ScamProofBlock;
