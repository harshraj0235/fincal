"use client";
import React from 'react';
import ReverseGSTCalculator from '@/calculators/ReverseGSTCalculator';


const ReverseGSTCalculatorPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <ReverseGSTCalculator />
        </div>
      </div>
    </>
  );
};

export default ReverseGSTCalculatorPage;
export { ReverseGSTCalculatorPage };
