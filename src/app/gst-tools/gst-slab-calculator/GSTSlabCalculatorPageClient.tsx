"use client";
import React from 'react';
import GSTSlabCalculator from '@/calculators/GSTSlabCalculator';


const GSTSlabCalculatorPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <GSTSlabCalculator />
        </div>
      </div>
    </>
  );
};

export default GSTSlabCalculatorPage;
export { GSTSlabCalculatorPage };
