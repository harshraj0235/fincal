import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Award, Zap, Database, Globe, UserCheck } from 'lucide-react';
import { authorityData } from '../../data/silos/authorityData';

const AuthorityDashboard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/10">
      {/* Decorative pulse */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[80px] animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
              <Shield className="w-3 h-3" />
              E-E-A-T Verified
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Strategic Digital <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Authority Dashboard
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl">
              Tracking localized financial intelligence, government source integrity, 
              and human-first content provenance in the 2026 AI-driven landscape.
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-inner">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Trust Score
            </div>
          </div>
        </div>

        {/* Authority Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg mb-2">Government Data Sync</h4>
            <p className="text-sm text-slate-400">Real-time synthesis from NIC, BHUVAN, and Ministry portals.</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
              <Globe className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg mb-2">Localized Context</h4>
            <p className="text-sm text-slate-400">Depth-first coverage across 28 states and 8 Union territories.</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 text-green-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg mb-2">Expert Provenance</h4>
            <p className="text-sm text-slate-400">Mechanically verified human authorship for every strategy.</p>
          </div>
        </div>

        {/* Real-Time Live Feed */}
        <div className="bg-black/20 rounded-3xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              Live Integrity Feed
            </h4>
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
          </div>
          <div className="space-y-4">
            {authorityData.map((update, index) => (
              <div key={index} className="flex items-center gap-4 text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <span className="text-slate-500 font-mono text-xs">{update.timestamp}</span>
                <span className="text-slate-300">{update.event}</span>
                <span className="ml-auto flex items-center gap-1 text-green-400 text-xs font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  VERIFIED
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
