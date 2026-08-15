"use client";
import React from 'react';
import CompositionSchemeChecker from '@/calculators/CompositionSchemeChecker';


const CompositionSchemeCheckerPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <CompositionSchemeChecker />
      </div>
    </>
  );
};

export default CompositionSchemeCheckerPage;
