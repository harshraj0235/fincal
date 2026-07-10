import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { Users, Flag, Shield, ArrowRight, CheckCircle, Percent } from 'lucide-react';
import { scoreScheme, type Answers, type Scheme, type State } from '../lib/schemes/scoring';

const SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN',
    briefBenefit: '₹6000 yearly support for eligible farmers',
    applyUrl: 'https://pmkisan.gov.in/',
    rules: [
      { key: 'occupation', op: 'eq', value: 'farmer', weight: 30, description: 'Occupation must be farmer' },
      { key: 'incomeRange', op: 'in', value: ['lt2l', '2to5l'], weight: 20, description: 'Lower income preferred' },
      { key: 'state', op: 'in', value: ['uttar-pradesh','bihar','madhya-pradesh','maharashtra','rajasthan','karnataka'], weight: 10, description: 'Common states' }
    ]
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi',
    briefBenefit: 'Small savings scheme for girl child with tax benefits',
    applyUrl: 'https://www.indiapost.gov.in/',
    rules: [
      { key: 'hasGirlChild', op: 'bool', value: true, weight: 40, description: 'Girl child required' },
      { key: 'familyStatus', op: 'in', value: ['married_children'], weight: 20, description: 'Children in family' }
    ]
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat',
    briefBenefit: 'Health insurance coverage for eligible families',
    applyUrl: 'https://pmjay.gov.in/',
    rules: [
      { key: 'incomeRange', op: 'in', value: ['lt2l','2to5l'], weight: 25, description: 'Lower income' },
      { key: 'familyStatus', op: 'in', value: ['married','married_children','parents_dependent'], weight: 20, description: 'Family coverage' }
    ]
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma',
    briefBenefit: 'Support for traditional artisans and craftsmen',
    applyUrl: 'https://pmvishwakarma.gov.in/',
    rules: [
      { key: 'occupation', op: 'in', value: ['gig','salaried'], weight: 20, description: 'Working individuals' },
      { key: 'incomeRange', op: 'in', value: ['lt2l','2to5l','5to10l'], weight: 20, description: 'Income within range' }
    ]
  },
  {
    id: 'atal-pension',
    name: 'Atal Pension Yojana',
    briefBenefit: 'Pension scheme for unorganized sector and low-income workers',
    applyUrl: 'https://www.npscra.nsdl.co.in/schemes/atal-pension-yojana.php',
    rules: [
      { key: 'age', op: 'gte', value: 18, weight: 15, description: 'Minimum age 18' },
      { key: 'age', op: 'lte', value: 40, weight: 15, description: 'Maximum age 40' },
      { key: 'occupation', op: 'in', value: ['gig','salaried','housewife'], weight: 20, description: 'Unorganized/salaried eligible' }
    ]
  },
  {
    id: 'lakhpati-didi',
    name: 'Lakhpati Didi',
    briefBenefit: 'Women-centric livelihood and income programs',
    applyUrl: 'https://www.nrlms.gov.in/',
    rules: [
      { key: 'gender', op: 'eq', value: 'female', weight: 35, description: 'Women oriented' },
      { key: 'incomeRange', op: 'in', value: ['lt2l','2to5l'], weight: 20, description: 'Lower income focus' }
    ]
  }
];


export const SchemesFinder: React.FC = () => {
  const [step, setStep] = useState(0);
  const [minPct, setMinPct] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    age: 30,
    gender: 'male',
    incomeRange: '5to10l',
    occupation: 'salaried',
    familyStatus: 'single',
    state: 'maharashtra',
    hasGirlChild: false
  });
  const results = useMemo(() => {
    return SCHEMES.map(s => {
      const res = scoreScheme(answers, s);
      return { scheme: s, pct: res.pct, checklist: res.checklist };
    }).sort((a,b)=>b.pct - a.pct);
  }, [answers]);
  const progress = Math.round((Math.min(step, 4) / 4) * 100);
  const topPct = results.length ? results[0].pct : 0;
  const [rss, setRss] = useState<{ title: string; link: string; date?: string }[]>([]);
  useEffect(() => {
    const url = encodeURIComponent('https://news.google.com/rss/search?q=Ayushman+Bharat+OR+PM+KISAN+OR+PM+Vishwakarma+OR+Atal+Pension+Yojana&hl=en-IN&gl=IN&ceid=IN:en');
    fetch(`https://api.allorigins.win/raw?url=${url}`).then(r=>r.text()).then(xml=>{
      const doc = new window.DOMParser().parseFromString(xml, 'text/xml');
      const items = Array.from(doc.querySelectorAll('item')).slice(0, 6).map(i=>({
        title: i.querySelector('title')?.textContent || '',
        link: i.querySelector('link')?.textContent || '',
        date: i.querySelector('pubDate')?.textContent || ''
      }));
      setRss(items);
    }).catch(()=>setRss([]));
  }, []);
  return (
    <div className="space-y-6">
      <SEOHelmet
        title="Schemes Finder | MoneyCal India"
        description="Find matching government schemes based on simple questions and get eligibility and apply links."
        keywords="PM Kisan, Sukanya Samriddhi, Ayushman Bharat, PM Vishwakarma, Atal Pension Yojana, Lakhpati Didi"
        url="/schemes-finder"
        image="/images/calculator-default.jpg"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Schemes Finder', url: '/schemes-finder' }
        ]}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
          <Shield className="w-6 h-6 text-[--primary-600]" />
          Schemes Finder
        </h1>
        <Link to="/government-schemes" reloadDocument className="px-4 py-2 rounded bg-[--primary-600] hover:bg-[--primary-700] text-white text-sm">
          Browse Schemes
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-neutral-600" />
                <span>Step {step+1} of 6</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Flag className="w-4 h-4 text-neutral-600" />
                <span>India</span>
              </div>
            </div>
            <div className="mb-6">
              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-2 bg-[--primary-600]" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-neutral-600">
                <span>{progress}%</span>
                <div className="flex gap-2">
                  <span className={step>=0?'text-[--primary-700]':'text-neutral-500'}>Profile</span>
                  <span className={step>=1?'text-[--primary-700]':'text-neutral-500'}>Income & Job</span>
                  <span className={step>=2?'text-[--primary-700]':'text-neutral-500'}>Family</span>
                  <span className={step>=3?'text-[--primary-700]':'text-neutral-500'}>State</span>
                  <span className={step>=4?'text-[--primary-700]':'text-neutral-500'}>Matches</span>
                </div>
              </div>
            </div>
            {step === 0 && (
              <div className="space-y-4">
                <label className="text-sm font-medium text-neutral-700">Age</label>
                <input aria-label="Age" type="number" min={1} max={100} value={answers.age} onChange={(e)=>setAnswers(a=>({ ...a, age: Number(e.target.value) }))} className="input" />
                <label className="text-sm font-medium text-neutral-700">Gender</label>
                <div className="flex gap-2">
                  <button className={`px-3 py-2 rounded ${answers.gender==='male'?'bg-[--primary-50] text-[--primary-900] ring-1 ring-[--primary-200]':'bg-neutral-100 text-neutral-700'}`} onClick={()=>setAnswers(a=>({ ...a, gender: 'male' }))}>Male</button>
                  <button className={`px-3 py-2 rounded ${answers.gender==='female'?'bg-[--primary-50] text-[--primary-900] ring-1 ring-[--primary-200]':'bg-neutral-100 text-neutral-700'}`} onClick={()=>setAnswers(a=>({ ...a, gender: 'female' }))}>Female</button>
                  <button className={`px-3 py-2 rounded ${answers.gender==='other'?'bg-[--primary-50] text-[--primary-900] ring-1 ring-[--primary-200]':'bg-neutral-100 text-neutral-700'}`} onClick={()=>setAnswers(a=>({ ...a, gender: 'other' }))}>Other</button>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <label className="text-sm font-medium text-neutral-700">Income Range</label>
                <select aria-label="Income range" value={answers.incomeRange} onChange={(e)=>setAnswers(a=>({ ...a, incomeRange: e.target.value as any }))} className="input">
                  <option value="lt2l">Below ₹2L</option>
                  <option value="2to5l">₹2L–₹5L</option>
                  <option value="5to10l">₹5L–₹10L</option>
                  <option value="gt10l">Above ₹10L</option>
                </select>
                <label className="text-sm font-medium text-neutral-700">Occupation</label>
                <select aria-label="Occupation" value={answers.occupation} onChange={(e)=>setAnswers(a=>({ ...a, occupation: e.target.value as any }))} className="input">
                  <option value="salaried">Salaried</option>
                  <option value="farmer">Farmer</option>
                  <option value="gig">Gig</option>
                  <option value="housewife">Housewife</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <label className="text-sm font-medium text-neutral-700">Family Status</label>
                <select aria-label="Family status" value={answers.familyStatus} onChange={(e)=>setAnswers(a=>({ ...a, familyStatus: e.target.value as any }))} className="input">
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="married_children">Married with children</option>
                  <option value="parents_dependent">Parents dependent</option>
                </select>
                <div className="flex items-center gap-2">
                  <input id="girl-child" type="checkbox" checked={answers.hasGirlChild} onChange={(e)=>setAnswers(a=>({ ...a, hasGirlChild: e.target.checked }))} />
                  <label htmlFor="girl-child" className="text-sm text-neutral-700">Has girl child</label>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <label className="text-sm font-medium text-neutral-700">State</label>
                <select aria-label="State" value={answers.state} onChange={(e)=>setAnswers(a=>({ ...a, state: e.target.value as State }))} className="input">
                  <option value="maharashtra">Maharashtra</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="uttar-pradesh">Uttar Pradesh</option>
                  <option value="bihar">Bihar</option>
                  <option value="madhya-pradesh">Madhya Pradesh</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="telangana">Telangana</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="tamil-nadu">Tamil Nadu</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>
            )}
            {step >= 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                  <Percent className="w-5 h-5 text-[--primary-600]" />
                  Matches
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-neutral-700">Minimum match</label>
                    <input aria-label="Minimum match" type="range" min={0} max={100} value={minPct} onChange={(e)=>setMinPct(Number(e.target.value))} className="w-full" />
                  </div>
                  <div className="px-3 py-2 rounded bg-neutral-100 text-neutral-800 text-sm">Showing ≥ {minPct}%</div>
                </div>
                <div className="space-y-4">
                  {results.filter(r=>r.pct>=minPct).map(r => (
                    <div key={r.scheme.id} className="p-4 bg-neutral-50 rounded border border-neutral-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-base font-semibold text-neutral-900">{r.scheme.name}</div>
                          <div className="text-sm text-neutral-600">{r.scheme.briefBenefit}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {r.pct===topPct && <span className="px-2 py-1 rounded bg-[--success-50] text-[--success-700] text-xs">Best match</span>}
                          <div className={`text-xl font-bold ${r.pct>=75?'text-[--success-600]':r.pct>=50?'text-[--primary-700]':'text-neutral-600'}`}>{r.pct}%</div>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-1 text-sm">
                        {r.checklist.map((c, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className={`w-4 h-4 ${c.ok ? 'text-[--success-600]' : 'text-neutral-400'}`} />
                            <span className={c.ok ? 'text-neutral-800' : 'text-neutral-500'}>{c.text}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3">
                        <a href={r.scheme.applyUrl} target="_blank" rel="noreferrer" className="px-3 py-2 rounded bg-[--primary-600] hover:bg-[--primary-700] text-white text-sm inline-flex items-center gap-2">
                          <ArrowRight className="w-4 h-4" /> Apply now
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <button className="px-4 py-2 rounded bg-neutral-100 text-neutral-700" disabled={step===0} onClick={()=>setStep(s=>Math.max(0, s-1))}>Back</button>
              <button className="px-4 py-2 rounded bg-[--primary-600] text-white" onClick={()=>setStep(s=>Math.min(4, s+1))}>{step<4?'Next':'Refresh'}</button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-2">Tips</h3>
            <ul className="space-y-2 text-sm">
              <li>Adjust answers to refine matches</li>
              <li>Use official apply links to submit applications</li>
              <li>Explore Government Schemes for detailed guides</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-lg border border-neutral-200">
            <h4 className="text-sm font-semibold text-neutral-900 mb-3">Summary</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-neutral-100 text-neutral-800">Age: {answers.age}</span>
              <span className="px-2 py-1 rounded bg-neutral-100 text-neutral-800">Gender: {answers.gender}</span>
              <span className="px-2 py-1 rounded bg-neutral-100 text-neutral-800">Income: {answers.incomeRange}</span>
              <span className="px-2 py-1 rounded bg-neutral-100 text-neutral-800">Occupation: {answers.occupation}</span>
              <span className="px-2 py-1 rounded bg-neutral-100 text-neutral-800">Family: {answers.familyStatus}</span>
              <span className="px-2 py-1 rounded bg-neutral-100 text-neutral-800">State: {answers.state}</span>
              <span className="px-2 py-1 rounded bg-neutral-100 text-neutral-800">Girl child: {answers.hasGirlChild?'Yes':'No'}</span>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg border border-neutral-200">
            <h4 className="text-sm font-semibold text-neutral-900 mb-3">Latest Scheme Updates</h4>
            <ul className="space-y-2">
              {rss.length === 0 && <li className="text-xs text-neutral-500">No updates available</li>}
              {rss.map((i, idx)=>(
                <li key={idx} className="text-sm">
                  <a href={i.link} target="_blank" rel="noreferrer" className="text-[--primary-700] hover:underline">{i.title}</a>
                  {i.date && <div className="text-xs text-neutral-500">{new Date(i.date).toLocaleDateString()}</div>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemesFinder;
