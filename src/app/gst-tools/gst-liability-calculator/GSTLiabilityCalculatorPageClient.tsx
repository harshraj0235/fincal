"use client";
import React from 'react';
import GSTLiabilityCalculator from '@/calculators/GSTLiabilityCalculator';


const GSTLiabilityCalculatorPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <GSTLiabilityCalculator />
        </div>
      </div>
    </>
  );
};

export default GSTLiabilityCalculatorPage;
export { GSTLiabilityCalculatorPage };
