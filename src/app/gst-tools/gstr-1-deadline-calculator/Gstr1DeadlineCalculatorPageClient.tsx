"use client";
import React from 'react';
import Gstr1DeadlineCalculator from '@/calculators/Gstr1DeadlineCalculator';


const Gstr1DeadlineCalculatorPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Gstr1DeadlineCalculator />
        </div>
      </div>
    </>
  );
};

export default Gstr1DeadlineCalculatorPage;
export { Gstr1DeadlineCalculatorPage };
