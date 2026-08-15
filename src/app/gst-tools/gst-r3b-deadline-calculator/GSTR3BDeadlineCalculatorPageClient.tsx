"use client";
import React from 'react';
import GSTR3BDeadlineCalculator from '@/calculators/GSTR3BDeadlineCalculator';


const GSTR3BDeadlineCalculatorPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <GSTR3BDeadlineCalculator />
        </div>
      </div>
    </>
  );
};

export default GSTR3BDeadlineCalculatorPage;
export { GSTR3BDeadlineCalculatorPage };
