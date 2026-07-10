import React, { useState } from 'react';
import { ShieldAlert, AlertCircle, PhoneCall, ShieldCheck, ChevronRight, X } from 'lucide-react';

const ScamDiagnosticTool: React.FC = () => {
  const [step, setStep] = useState(1);
  const [riskScore, setRiskScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const questions = [
    { q: "Is someone asking you to stay on a video call for 'Digital Arrest' or verification?", weight: 40 },
    { q: "Are they demanding immediate payment via UPI or Crypto to avoid legal action?", weight: 35 },
    { q: "Did you receive a link promising high returns (e.g., 200% in 1 day)?", weight: 30 },
    { q: "Is the person claiming to be from Trai/CBI/Police but calling from a mobile number?", weight: 25 },
    { q: "Are they asking for your Bank OTP or screen sharing access (AnyDesk/TeamViewer)?", weight: 45 }
  ];

  const handleAnswer = (isYes: boolean) => {
    const currentQ = questions[step - 1];
    if (isYes) setRiskScore(prev => prev + currentQ.weight);
    setAnswers([...answers, isYes]);
    
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setStep(0); // Result state
    }
  };

  const reset = () => {
    setStep(1);
    setRiskScore(0);
    setAnswers([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-red-50 overflow-hidden my-10">
      <div className="bg-red-600 p-5 text-white flex items-center gap-3">
        <ShieldAlert className="h-6 w-6" />
        <h2 className="font-bold text-lg">Instant Scam Diagnostic Portal (Ver. 2026)</h2>
      </div>

      <div className="p-6 sm:p-10 min-h-[300px] flex flex-col justify-center">
        {step > 0 ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-sm font-bold text-red-600 mb-2 uppercase tracking-wider">Step {step} of {questions.length}</div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-8 leading-tight">
              {questions[step - 1].q}
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => handleAnswer(true)}
                className="flex-1 bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                YES <ChevronRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleAnswer(false)}
                className="flex-1 bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
              >
                NO
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center animate-in zoom-in duration-500">
            <div className={`inline-flex p-4 rounded-full mb-6 ${riskScore > 50 ? 'bg-red-100' : 'bg-emerald-100'}`}>
              {riskScore > 50 ? <AlertCircle className="h-12 w-12 text-red-600" /> : <ShieldCheck className="h-12 w-12 text-emerald-600" />}
            </div>
            
            <h3 className="text-2xl font-black mb-2">
              {riskScore > 80 ? 'CRITICAL RISK: LIKELY A SCAM' : riskScore > 40 ? 'HIGH WARNING: POTENTIAL SCAM' : 'LOW RISK DETECTED'}
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Our diagnostic engine identifies patterns matching common 2026 financial cybercrimes in India.
            </p>

            <div className="bg-slate-900 text-white p-6 rounded-2xl mb-8 text-left">
              <div className="font-bold mb-4 flex items-center gap-2">
                 <PhoneCall className="h-4 w-4 text-red-400" /> Emergency Actions:
              </div>
              <ul className="space-y-3 text-sm opacity-90">
                <li className="flex gap-2"><span>1.</span> <strong>Dial 1930 immediately</strong> (Cyber Crime Helpline)</li>
                <li className="flex gap-2"><span>2.</span> Report on <strong>www.cybercrime.gov.in</strong></li>
                <li className="flex gap-2"><span>3.</span> Freeze your bank accounts via official app only</li>
              </ul>
            </div>

            <button onClick={reset} className="text-slate-500 font-bold hover:text-slate-800 flex items-center gap-2 mx-auto">
              <X className="h-4 w-4" /> Restart Diagnostic
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScamDiagnosticTool;
