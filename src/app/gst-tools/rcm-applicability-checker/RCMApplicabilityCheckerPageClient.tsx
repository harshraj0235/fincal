"use client";
import React from 'react';
import RCMApplicabilityChecker from '@/calculators/RCMApplicabilityChecker';


const RCMApplicabilityCheckerPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <RCMApplicabilityChecker />
      </div>
    </>
  );
};

export default RCMApplicabilityCheckerPage;
