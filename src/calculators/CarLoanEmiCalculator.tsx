import React, { useState, useMemo } from 'react';
import { Car, Calculator, TrendingUp, DollarSign } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const CarLoanEmiCalculator: React.FC = () => {
  const [carPrice, setCarPrice] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [loanTenure, setLoanTenure] = useState(5);

  const calculations = useMemo(() => {
    const loanAmount = carPrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - loanAmount;

    return {
      loanAmount,
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    };
  }, [carPrice, downPayment, interestRate, loanTenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <>
      <SEOHelmet
        title="Car Loan EMI Calculator 2025 India - Auto Loan Calculator | MoneyCal"
        description="Calculate car loan EMI with down payment. Compare new & used car loan rates. SBI, HDFC, ICICI car loan calculator 2025. Free auto loan EMI calculator."
        keywords="car loan EMI calculator, car loan calculator India, auto loan EMI, vehicle loan calculator, car finance calculator 2025"
        canonicalUrl="https://moneycal.in/calculators/car-loan-emi-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              🚗 Car Loan EMI Calculator
            </h1>
            <p className="text-xl text-gray-700">Calculate auto loan EMI with down payment planning</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Loan Inputs</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Car Price (On-Road)</label>
                  <input type="number" value={carPrice} onChange={(e) => setCarPrice(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl text-lg font-bold" />
                  <input type="range" min="300000" max="5000000" step="50000" value={carPrice} onChange={(e) => setCarPrice(Number(e.target.value))} className="w-full mt-2" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Down Payment</label>
                  <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl text-lg font-bold" />
                  <input type="range" min="0" max={carPrice * 0.5} step="10000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full mt-2" />
                  <p className="text-xs text-gray-600 mt-1">{Math.round((downPayment / carPrice) * 100)}% down payment</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Interest Rate (% p.a.)</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} step="0.1" className="w-full px-4 py-3 border-2 rounded-xl text-lg font-bold" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Loan Tenure (Years)</label>
                  <input type="number" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full px-4 py-3 border-2 rounded-xl text-lg font-bold" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Monthly EMI</h2>
                <div className="text-6xl font-black">{formatCurrency(calculations.emi)}</div>
                <p className="text-lg mt-2">Loan Amount: {formatCurrency(calculations.loanAmount)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(calculations.totalInterest)}</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <p className="text-sm text-gray-600 mb-1">Total Payment</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(calculations.totalAmount)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarLoanEmiCalculator;

