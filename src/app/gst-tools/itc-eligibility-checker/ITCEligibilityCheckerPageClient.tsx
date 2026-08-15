"use client";
import React from 'react';
import ITCEligibilityChecker from '@/calculators/ITCEligibilityChecker';


const ITCEligibilityCheckerPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <ITCEligibilityChecker />
      </div>
    </>
  );
};

export default ITCEligibilityCheckerPage;
