"use client";
import React from 'react';
import GSTRefundChecker from '@/calculators/GSTRefundChecker';


const GSTRefundCheckerPage: React.FC = () => {
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <GSTRefundChecker />
      </div>
    </>
  );
};

export default GSTRefundCheckerPage;
